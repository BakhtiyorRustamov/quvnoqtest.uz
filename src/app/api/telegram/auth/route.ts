import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateInitData, telegramConfigured, signParentSession, PARENT_COOKIE_NAME } from '@/lib/telegram';
import { parentsConfigured, upsertTelegramParent } from '@/lib/parents';
import { clientIp, rateLimit } from '@/lib/rateLimit';

/**
 * Telegram Mini App sign-in for parents: the parents page posts
 * window.Telegram.WebApp.initData; we validate it against the bot token and
 * create/refresh a parent-type user, then set a signed session cookie.
 */
export async function POST(req: NextRequest) {
  if (!rateLimit(`tga:${clientIp(req)}`, 30, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'too_many_requests' }, { status: 429 });
  }
  if (!telegramConfigured() || !parentsConfigured()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 501 });
  }

  const body = await req.json().catch(() => ({}));
  const tg = validateInitData(String(body.initData ?? ''));
  if (!tg) return NextResponse.json({ error: 'invalid_init_data' }, { status: 401 });

  const parent = await upsertTelegramParent(tg);
  (await cookies()).set(PARENT_COOKIE_NAME, signParentSession(parent.id), {
    httpOnly: true,
    sameSite: 'none', // the mini app runs inside Telegram's webview
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 365
  });
  return NextResponse.json({ ok: true, parent: { name: parent.name } });
}
