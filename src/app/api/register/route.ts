import { NextRequest, NextResponse } from 'next/server';
import { getStore, isPaid } from '@/lib/store';

/** Silent registration (SRS §6.6.1) — fired when the demo starts. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const grade = Math.min(11, Math.max(1, Number(body.grade) || 1));
  const locale = ['uz', 'ru', 'en'].includes(body.locale) ? body.locale : 'uz';

  const store = getStore();
  const user = await store.ensureUser({ grade, locale });
  return NextResponse.json({ user: { ...user, isPaid: isPaid(user) } });
}
