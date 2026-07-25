import { NextRequest, NextResponse } from 'next/server';
import { getStore, isPaid, hasSupabase } from '@/lib/store';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { redeemPromo } from '@/lib/payments';
import { sameOrigin } from '@/lib/origin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Redeems a promo code (admin-generated free access: teachers, testers, refunds). */
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'bad_origin' }, { status: 403 });
  if (!hasSupabase()) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  // Tight limit: codes are short, so this endpoint is brute-forceable.
  const ip = clientIp(req);
  if (!(await rateLimitStrict(`promo:${ip}`, 8, 3600))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const user = await getStore().getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const code = typeof body.code === 'string' ? body.code : '';
  if (!code) return NextResponse.json({ error: 'invalid_code' }, { status: 400 });

  const result = await redeemPromo(code, user.id);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.error === 'server_error' ? 500 : 422 });
  }

  const fresh = await getStore().getCurrent();
  return NextResponse.json({
    ok: true,
    days: result.days,
    user: fresh ? { ...fresh, isPaid: isPaid(fresh) } : null
  });
}
