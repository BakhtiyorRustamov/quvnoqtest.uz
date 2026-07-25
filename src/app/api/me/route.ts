import { NextRequest, NextResponse } from 'next/server';
import { getStore, isPaid, isActive, isDisabled, hasSupabase, type UserRecord } from '@/lib/store';
import { getOpenNotices } from '@/lib/userNotify';

export async function GET() {
  const store = getStore();
  const user = await store.getCurrent();
  if (!user) return NextResponse.json({ user: null });

  // Admin-generated messages (e.g. a rejected receipt) ride along with the
  // profile fetch the app already makes on every page load.
  const notices = hasSupabase() ? await getOpenNotices(user.id).catch(() => []) : [];
  // `isPaid` here reports *effective* access, so a disabled account loses its
  // paid UI immediately rather than showing unlocked content it cannot open.
  return NextResponse.json({
    user: { ...user, isPaid: isActive(user), subscriptionPaid: isPaid(user), isDisabled: isDisabled(user) },
    notices
  });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const patch: Partial<Pick<UserRecord, 'grade' | 'locale' | 'name' | 'phone'>> = {};
  if (body.grade !== undefined) patch.grade = Math.min(11, Math.max(1, Number(body.grade) || 1));
  if (typeof body.locale === 'string' && ['uz', 'ru', 'en'].includes(body.locale)) patch.locale = body.locale;
  if (typeof body.name === 'string') patch.name = body.name.slice(0, 120) || null;
  if (typeof body.phone === 'string') patch.phone = body.phone.slice(0, 32) || null;

  const store = getStore();
  const user = await store.updateUser(patch);
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  return NextResponse.json({ user: { ...user, isPaid: isPaid(user) } });
}
