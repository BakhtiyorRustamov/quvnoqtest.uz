import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { isAdmin, audit } from '@/lib/admin';
import { sbAdmin } from '@/lib/supabaseAdmin';
import { clientIp } from '@/lib/rateLimit';
import { sameOrigin } from '@/lib/origin';
import { notifyUserRejected } from '@/lib/userNotify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * All admin mutations. One endpoint keeps authorisation, auditing and origin
 * checking in a single place instead of repeated across a dozen routes.
 */
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'bad_origin' }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorised' }, { status: 401 });

  const ip = clientIp(req);
  const body = await req.json().catch(() => ({}));
  const action = String(body.action ?? '');
  const sb = sbAdmin();

  const days = (v: unknown, fallback = 30) => {
    const n = Number(v);
    return Number.isFinite(n) && n >= 1 && n <= 3650 ? Math.floor(n) : fallback;
  };
  const uuid = (v: unknown): string | null =>
    typeof v === 'string' && /^[0-9a-f-]{36}$/i.test(v) ? v : null;

  try {
    switch (action) {
      /* ------------------------------ payments ----------------------------- */
      case 'payment.approve': {
        const id = uuid(body.paymentId);
        if (!id) return bad('bad_id');
        await sb
          .from('payments')
          .update({
            status: 'approved',
            reviewed_by: 'admin',
            reviewed_at: new Date().toISOString(),
            admin_note: str(body.note, 500)
          })
          .eq('id', id);
        await audit({ action: 'payment.approve', targetType: 'payment', targetId: id, ip });
        return NextResponse.json({ ok: true });
      }

      case 'payment.reject': {
        const id = uuid(body.paymentId);
        if (!id) return bad('bad_id');

        const { data: pay } = await sb
          .from('payments')
          .select('id, user_id, paid_until_before, status')
          .eq('id', id)
          .maybeSingle();
        if (!pay) return bad('not_found', 404);

        await sb
          .from('payments')
          .update({
            status: 'rejected',
            reviewed_by: 'admin',
            reviewed_at: new Date().toISOString(),
            admin_note: str(body.note, 500)
          })
          .eq('id', id);

        // Revocation is opt-in: rejecting a receipt notifies the user by
        // default and only rolls their access back when explicitly asked.
        if (body.revoke === true) {
          await sb.rpc('set_paid_until', {
            p_user: pay.user_id,
            p_until: pay.paid_until_before
          });
        }
        if (body.strike === true) {
          const { data: u } = await sb.from('users').select('strikes').eq('id', pay.user_id).maybeSingle();
          await sb
            .from('users')
            .update({ strikes: (u?.strikes ?? 0) + 1 })
            .eq('id', pay.user_id);
        }

        await notifyUserRejected(pay.user_id, str(body.note, 300));
        await audit({
          action: 'payment.reject',
          targetType: 'payment',
          targetId: id,
          detail: { revoke: body.revoke === true, strike: body.strike === true },
          ip
        });
        return NextResponse.json({ ok: true });
      }

      /* ------------------------------- users ------------------------------- */
      case 'user.extend': {
        const id = uuid(body.userId);
        if (!id) return bad('bad_id');
        const n = days(body.days);
        const { data } = await sb.rpc('grant_days', { p_user: id, p_days: n });
        await audit({ action: 'user.extend', targetType: 'user', targetId: id, detail: { days: n }, ip });
        return NextResponse.json({ ok: true, paidUntil: data });
      }

      case 'user.setExpiry': {
        const id = uuid(body.userId);
        if (!id) return bad('bad_id');
        const until = body.until === null ? null : String(body.until ?? '');
        if (until !== null && Number.isNaN(Date.parse(until))) return bad('bad_date');
        const { data } = await sb.rpc('set_paid_until', { p_user: id, p_until: until });
        await audit({ action: 'user.setExpiry', targetType: 'user', targetId: id, detail: { until }, ip });
        return NextResponse.json({ ok: true, paidUntil: data });
      }

      case 'user.disable': {
        const id = uuid(body.userId);
        if (!id) return bad('bad_id');
        await sb
          .from('users')
          .update({ disabled_at: new Date().toISOString(), disabled_reason: str(body.reason, 200) })
          .eq('id', id);
        await audit({ action: 'user.disable', targetType: 'user', targetId: id, detail: { reason: str(body.reason, 200) }, ip });
        return NextResponse.json({ ok: true });
      }

      case 'user.enable': {
        const id = uuid(body.userId);
        if (!id) return bad('bad_id');
        await sb.from('users').update({ disabled_at: null, disabled_reason: null }).eq('id', id);
        await audit({ action: 'user.enable', targetType: 'user', targetId: id, ip });
        return NextResponse.json({ ok: true });
      }

      case 'user.resetStrikes': {
        const id = uuid(body.userId);
        if (!id) return bad('bad_id');
        await sb.from('users').update({ strikes: 0 }).eq('id', id);
        await audit({ action: 'user.resetStrikes', targetType: 'user', targetId: id, ip });
        return NextResponse.json({ ok: true });
      }

      /* ------------------------------- promos ------------------------------ */
      case 'promo.create': {
        const n = days(body.days);
        const maxUses = Math.min(1000, Math.max(1, Number(body.maxUses) || 1));
        const code =
          str(body.code, 32)?.toUpperCase().replace(/[^A-Z0-9-]/g, '') ||
          `QT-${randomBytes(4).toString('hex').toUpperCase()}`;

        const { error } = await sb.from('promo_codes').insert({
          code,
          days: n,
          max_uses: maxUses,
          note: str(body.note, 200),
          expires_at: body.expiresAt ? new Date(String(body.expiresAt)).toISOString() : null,
          created_by: 'admin'
        });
        if (error) return bad('duplicate_code', 409);

        await audit({ action: 'promo.create', targetType: 'promo', targetId: code, detail: { days: n, maxUses }, ip });
        return NextResponse.json({ ok: true, code });
      }

      case 'promo.disable': {
        const code = str(body.code, 32);
        if (!code) return bad('bad_code');
        await sb.from('promo_codes').update({ disabled_at: new Date().toISOString() }).eq('code', code);
        await audit({ action: 'promo.disable', targetType: 'promo', targetId: code, ip });
        return NextResponse.json({ ok: true });
      }

      default:
        return bad('unknown_action');
    }
  } catch (err) {
    console.error('[admin/action]', action, err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

function str(v: unknown, max: number): string | null {
  return typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null;
}
