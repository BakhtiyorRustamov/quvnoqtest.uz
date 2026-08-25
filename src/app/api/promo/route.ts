import { NextRequest, NextResponse } from 'next/server';
import { getStore, isPaid, hasSupabase } from '@/lib/store';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { redeemPromo } from '@/lib/payments';
import { sameOrigin } from '@/lib/origin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Validates a promo code without granting access early. The code is applied when the
 * receipt is approved and the user still pays the monthly subscription amount. */
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'bad_origin' }, { status: 403 });
  if (!hasSupabase()) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  const ip = clientIp(req);
  if (!(await rateLimitStrict(`promo:${ip}`, 8, 3600))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const user = await getStore().getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const code = typeof body.code === 'string' ? body.code.trim().toUpperCase() : '';
  if (!code) return NextResponse.json({ error: 'invalid_code' }, { status: 400 });

  const result = await redeemPromo(code, user.id);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.error === 'server_error' ? 500 : 422 });
  }

  return NextResponse.json({
    ok: true,
    days: result.days,
    message: 'You’ll get 2 months for the price of 1',
    user: { ...user, isPaid: isPaid(user) }
  });
}
