import { NextRequest, NextResponse } from 'next/server';
import { getStore, isPaid, hasSupabase } from '@/lib/store';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { sbAdmin } from '@/lib/supabaseAdmin';
import { submitReceipt, MAX_UPLOAD_BYTES } from '@/lib/payments';
import { alertDuplicateReceipt, alertFlaggedReceipt } from '@/lib/adminNotify';
import { sameOrigin } from '@/lib/origin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Receipt submission (replaces the old dummy `POST /api/pay`, which granted a
 * free month to anyone who called it).
 *
 * multipart/form-data: `receipt` (image), `card` ('humo' | 'visa_uzum').
 */
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: 'bad_origin' }, { status: 403 });
  }
  if (!hasSupabase()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const ip = clientIp(req);
  // Uploads cost storage and CPU, so this is one of the endpoints that uses the
  // cross-instance limiter rather than the per-process one.
  if (!(await rateLimitStrict(`pay:${ip}`, 10, 3600))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const user = await getStore().getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });

  // Reject an oversized body before reading it into memory.
  const declared = Number(req.headers.get('content-length') ?? 0);
  if (declared && declared > MAX_UPLOAD_BYTES + 64 * 1024) {
    return NextResponse.json({ error: 'file_too_large' }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const card = String(form.get('card') ?? '');
  const promoCode = String(form.get('promo') ?? '').trim().toUpperCase();
  const file = form.get('receipt');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'no_file' }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: 'file_too_large' }, { status: 413 });
  }

  const buf = Buffer.from(await file.arrayBuffer());

  const { data: row } = await sbAdmin()
    .from('users')
    .select('disabled_at, public_id, name')
    .eq('id', user.id)
    .maybeSingle();

  const result = await submitReceipt({
    userId: user.id,
    disabledAt: row?.disabled_at ?? null,
    cardTarget: card,
    file: buf,
    promoCode: promoCode || undefined,
    ip,
    userAgent: req.headers.get('user-agent')
  });

  if (!result.ok) {
    if (result.error === 'duplicate') {
      await alertDuplicateReceipt({ publicId: row?.public_id ?? user.publicId, name: row?.name ?? null });
      return NextResponse.json({ error: 'duplicate' }, { status: 409 });
    }
    const status =
      result.error === 'no_user' || result.error === 'account_disabled'
        ? 403
        : result.error === 'rate_limited'
          ? 429
          : result.error === 'server_error' || result.error === 'storage_failed'
            ? 500
            : 422;
    return NextResponse.json(
      { error: result.error, reasons: result.reasons, score: result.score },
      { status }
    );
  }

  if (result.flagged) {
    await alertFlaggedReceipt({
      publicId: row?.public_id ?? user.publicId,
      name: row?.name ?? null,
      score: result.score,
      reasons: result.reasons,
      cardTarget: card
    });
  }

  const fresh = await getStore().getCurrent();
  return NextResponse.json({
    ok: true,
    user: fresh ? { ...fresh, isPaid: isPaid(fresh) } : null,
    paidUntil: result.paidUntil
  });
}
