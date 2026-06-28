import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@/lib/store';
import { mailerConfigured, sendMagicLinkEmail } from '@/lib/mailer';

/** Claim-by-email (SRS §6.6.2): create a magic link and deliver it. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }

  const store = getStore();
  const user = await store.getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });

  const created = await store.createMagicLink(email);
  if (!created) return NextResponse.json({ error: 'no_user' }, { status: 401 });

  const base = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  const link = `${base}/auth/claim?token=${encodeURIComponent(created.token)}`;

  if (mailerConfigured()) {
    const sent = await sendMagicLinkEmail(email, link);
    if (sent) return NextResponse.json({ sent: true });
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  if (store.mode === 'cookie') {
    // Demo mode without a mailer: the link only affects THIS device's own
    // cookie record, so it is safe to hand back directly.
    return NextResponse.json({ devLink: link });
  }

  // Supabase mode without a mailer: handing out the link would let anyone
  // claim any email's account — refuse instead.
  return NextResponse.json({ error: 'not_configured' }, { status: 501 });
}
