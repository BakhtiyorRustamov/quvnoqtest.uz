import { NextRequest, NextResponse } from 'next/server';
import { getStore, isPaid, type UserRecord } from '@/lib/store';

export async function GET() {
  const store = getStore();
  const user = await store.getCurrent();
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({ user: { ...user, isPaid: isPaid(user) } });
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
