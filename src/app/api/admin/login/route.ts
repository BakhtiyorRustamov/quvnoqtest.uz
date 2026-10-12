import { NextRequest, NextResponse } from 'next/server';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { adminConfigured, audit, createAdminSession, destroyAdminSession, verifyPassword } from '@/lib/admin';
import { sameOrigin } from '@/lib/origin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Admin login. Rate limited hard — this is the only door to the panel. */
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'bad_origin' }, { status: 403 });
  if (!adminConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  const ip = clientIp(req);
  // 5 attempts per 15 minutes per IP, counted in the database so the limit
  // survives cold starts and applies across every serverless instance.
  if (!(await rateLimitStrict(`admin-login:${ip}`, 5, 900))) {
    await audit({ action: 'admin_login_rate_limited', ip });
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const password = typeof body.password === 'string' ? body.password : '';
  if (!password || password.length > 256) {
    return NextResponse.json({ error: 'invalid' }, { status: 401 });
  }

  const ok = await verifyPassword(password, process.env.ADMIN_PASSWORD_HASH!);
  if (!ok) {
    await audit({ action: 'admin_login_failed', ip });
    return NextResponse.json({ error: 'invalid' }, { status: 401 });
  }

  await createAdminSession({ ip, userAgent: req.headers.get('user-agent') });
  await audit({ action: 'admin_login', ip });
  return NextResponse.json({ ok: true });
}

/** Logout — revokes the session server-side, not just the cookie. */
export async function DELETE(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'bad_origin' }, { status: 403 });
  await destroyAdminSession();
  return NextResponse.json({ ok: true });
}
