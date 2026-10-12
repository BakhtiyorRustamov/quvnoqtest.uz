import 'server-only';
import { randomUUID } from 'node:crypto';
import { sbAdmin, RECEIPTS_BUCKET } from './supabaseAdmin';
import {
  checkReceipt,
  normaliseReceipt,
  hammingDistance,
  DHASH_MATCH_DISTANCE,
  FLAG_BELOW,
  type ReceiptVerdict
} from './receipt';

export { PRICE_UZS, SUBSCRIPTION_DAYS, CARDS, CARD_HOLDER, MAX_UPLOAD_BYTES, isCardTarget } from './pricing';
import { PRICE_UZS, SUBSCRIPTION_DAYS, isCardTarget } from './pricing';

export type SubmitResult =
  | {
      ok: true;
      paidUntil: string;
      flagged: boolean;
      paymentId: string;
      score: number;
      reasons: string[];
    }
  | {
      ok: false;
      error:
        | 'no_user'
        | 'account_disabled'
        | 'rate_limited'
        | 'bad_card'
        | 'not_a_receipt'
        | 'duplicate'
        | 'storage_failed'
        | 'server_error';
      /** reason codes from the automated check, for the UI hint */
      reasons?: string[];
      score?: number;
    };

/**
 * How many receipts may be submitted per user per day. Someone who genuinely
 * mis-uploads needs two or three tries; nobody needs twelve.
 */
const MAX_SUBMISSIONS_PER_DAY = 3;

/**
 * Looks for a receipt image that has been submitted before, by anyone.
 *
 * The realistic fraud here is not forgery — it is one real receipt screenshot
 * circulating in a class group chat. An exact-file match is caught by the
 * unique index on receipt_sha256; this catches the same picture after it has
 * been cropped, resized or recompressed.
 */
async function findDuplicate(
  verdict: ReceiptVerdict
): Promise<{ id: string; user_id: string; kind: 'exact' | 'similar' } | null> {
  const sb = sbAdmin();

  const { data: exact } = await sb
    .from('payments')
    .select('id, user_id')
    .eq('receipt_sha256', verdict.sha256)
    .limit(1)
    .maybeSingle();
  if (exact) return { id: exact.id, user_id: exact.user_id, kind: 'exact' };

  if (!verdict.dhash) return null;

  // Perceptual hashes cannot be compared in SQL, so scan recent ones. At this
  // product's scale (hundreds of payments a month) this stays cheap; if it ever
  // grows, move to a bit-sampled index or a pg_bktree extension.
  const { data: recent } = await sb
    .from('payments')
    .select('id, user_id, receipt_dhash')
    .not('receipt_dhash', 'is', null)
    .order('created_at', { ascending: false })
    .limit(5000);

  for (const row of recent ?? []) {
    if (hammingDistance(verdict.dhash, row.receipt_dhash as string) <= DHASH_MATCH_DISTANCE) {
      return { id: row.id, user_id: row.user_id, kind: 'similar' };
    }
  }
  return null;
}

/**
 * Handles a receipt upload end to end: validate, de-duplicate, store, unlock.
 *
 * Access is granted immediately on a passing check. This is intentional — the
 * money is verified later by reconciling monthly totals against the bank cards,
 * not by inspecting each image. Making a paying child wait for manual review
 * would cost far more than the occasional bad receipt does.
 */
export async function submitReceipt(params: {
  userId: string;
  disabledAt: string | null;
  cardTarget: string;
  file: Buffer;
  promoCode?: string;
  ip: string | null;
  userAgent: string | null;
}): Promise<SubmitResult> {
  const { userId, disabledAt, cardTarget, file, promoCode, ip, userAgent } = params;

  if (disabledAt) return { ok: false, error: 'account_disabled' };
  if (!isCardTarget(cardTarget)) return { ok: false, error: 'bad_card' };

  const sb = sbAdmin();

  // Per-user daily cap (the per-IP cap is applied in the route handler).
  const since = new Date(Date.now() - 24 * 3600_000).toISOString();
  const { count } = await sb
    .from('payments')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', since);
  if ((count ?? 0) >= MAX_SUBMISSIONS_PER_DAY) return { ok: false, error: 'rate_limited' };

  const verdict = await checkReceipt(file);
  if (!verdict.ok) {
    return { ok: false, error: 'not_a_receipt', reasons: verdict.reasons, score: verdict.score };
  }

  const dup = await findDuplicate(verdict);
  if (dup) return { ok: false, error: 'duplicate' };

  // Strip EXIF (camera photos can carry GPS) and normalise to JPEG.
  let normalised: Buffer;
  try {
    normalised = await normaliseReceipt(file);
  } catch {
    return { ok: false, error: 'not_a_receipt', reasons: ['undecodable'], score: 0 };
  }

  const paymentId = randomUUID();
  const path = `${userId}/${paymentId}.jpg`;
  const promoDays = await resolvePromoDays(userId, promoCode);
  const grantedDays = promoDays ?? SUBSCRIPTION_DAYS;

  const { error: upErr } = await sb.storage.from(RECEIPTS_BUCKET).upload(path, normalised, {
    contentType: 'image/jpeg',
    upsert: false
  });
  if (upErr) return { ok: false, error: 'storage_failed' };

  const { data: before } = await sb.from('users').select('paid_until').eq('id', userId).maybeSingle();
  const flagged = verdict.score < FLAG_BELOW;

  const { error: insErr } = await sb.from('payments').insert({
    id: paymentId,
    user_id: userId,
    amount: PRICE_UZS,
    card_target: cardTarget,
    receipt_path: path,
    receipt_mime: 'image/jpeg',
    receipt_bytes: normalised.length,
    receipt_sha256: verdict.sha256,
    receipt_dhash: verdict.dhash,
    check_score: verdict.score,
    check_reasons: { reasons: verdict.reasons, metrics: verdict.metrics },
    status: flagged ? 'needs_review' : 'auto_approved',
    granted_days: grantedDays,
    paid_until_before: before?.paid_until ?? null,
    ip,
    user_agent: userAgent?.slice(0, 300) ?? null
  });

  if (insErr) {
    // Unique violation on receipt_sha256 — another request won the race.
    await sb.storage.from(RECEIPTS_BUCKET).remove([path]);
    if ((insErr as { code?: string }).code === '23505') return { ok: false, error: 'duplicate' };
    return { ok: false, error: 'server_error' };
  }

  const { data: paidUntil, error: grantErr } = await sb.rpc('grant_days', {
    p_user: userId,
    p_days: grantedDays
  });
  if (grantErr) return { ok: false, error: 'server_error' };

  await sb.from('payments').update({ paid_until_after: paidUntil }).eq('id', paymentId);

  if (promoDays) {
    const promoKey = promoCode!.trim().toUpperCase();
    const { data: promoRow } = await sb
      .from('promo_codes')
      .select('used_count')
      .eq('code', promoKey)
      .maybeSingle();

    try {
      await sb.from('promo_redemptions').insert({
        code: promoKey,
        user_id: userId,
        days: promoDays
      });
      await sb.from('promo_codes').update({
        used_count: (promoRow?.used_count ?? 0) + 1
      }).eq('code', promoKey);
    } catch {
      /* Ignore duplicate/redemption races; access was already granted for this payment. */
    }
  }

  return {
    ok: true,
    paidUntil: paidUntil as string,
    flagged,
    paymentId,
    score: verdict.score,
    reasons: verdict.reasons
  };
}

async function resolvePromoDays(userId: string, promoCode?: string): Promise<number | null> {
  const code = promoCode?.trim().toUpperCase();
  if (!code) return null;

  const { data: promo, error } = await sbAdmin()
    .from('promo_codes')
    .select('code, days, max_uses, used_count, expires_at, disabled_at')
    .eq('code', code)
    .maybeSingle();

  if (error || !promo) return null;
  if (promo.disabled_at || (promo.expires_at && new Date(promo.expires_at).getTime() <= Date.now())) return null;
  if ((promo.used_count ?? 0) >= (promo.max_uses ?? 1)) return null;

  const { count: alreadyUsed } = await sbAdmin()
    .from('promo_redemptions')
    .select('id', { count: 'exact', head: true })
    .eq('code', code)
    .eq('user_id', userId);

  if ((alreadyUsed ?? 0) > 0) return null;
  return Number(promo.days ?? SUBSCRIPTION_DAYS);
}

/** Validates a promo code without granting access until the receipt is approved. */
export async function redeemPromo(
  code: string,
  userId: string
): Promise<{ ok: true; days: number } | { ok: false; error: string }> {
  const normalised = code.trim().toUpperCase().slice(0, 32);
  if (!/^[A-Z0-9-]{4,32}$/.test(normalised)) return { ok: false, error: 'invalid_code' };

  const { data: promo, error } = await sbAdmin()
    .from('promo_codes')
    .select('code, days, max_uses, used_count, expires_at, disabled_at')
    .eq('code', normalised)
    .maybeSingle();

  if (error || !promo) return { ok: false, error: 'invalid_code' };
  if (promo.disabled_at || (promo.expires_at && new Date(promo.expires_at).getTime() <= Date.now())) {
    return { ok: false, error: 'expired_code' };
  }
  if ((promo.used_count ?? 0) >= (promo.max_uses ?? 1)) return { ok: false, error: 'used_up' };

  const { count: alreadyUsed } = await sbAdmin()
    .from('promo_redemptions')
    .select('id', { count: 'exact', head: true })
    .eq('code', normalised)
    .eq('user_id', userId);

  if ((alreadyUsed ?? 0) > 0) return { ok: false, error: 'already_redeemed' };
  return { ok: true, days: Number(promo.days ?? SUBSCRIPTION_DAYS) };
}

/** Short-lived signed URL for viewing a receipt in the admin panel. */
export async function signedReceiptUrl(path: string, seconds = 60): Promise<string | null> {
  const { data } = await sbAdmin().storage.from(RECEIPTS_BUCKET).createSignedUrl(path, seconds);
  return data?.signedUrl ?? null;
}
