import { NextRequest, NextResponse } from 'next/server';
import { getStore, isPaid } from '@/lib/store';
import { clientIp, rateLimit } from '@/lib/rateLimit';

/** Silent registration (SRS §6.6.1) — fired when the demo starts. */
export async function POST(req: NextRequest) {
  // Anti-abuse: silent registration creates DB rows — brake mass fake signups.
  // Generous limit; a real visitor registers once per device.
  if (!rateLimit(`reg:${clientIp(req)}`, 30, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'too_many_requests' }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  const grade = Math.min(11, Math.max(1, Number(body.grade) || 1));
  const locale = ['uz', 'ru', 'en'].includes(body.locale) ? body.locale : 'uz';

  const store = getStore();
  const user = await store.ensureUser({ grade, locale });
  return NextResponse.json({ user: { ...user, isPaid: isPaid(user) } });
}
