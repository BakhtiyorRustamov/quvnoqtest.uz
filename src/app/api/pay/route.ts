import { NextResponse } from 'next/server';
import { getStore, isPaid } from '@/lib/store';

/** Dummy checkout success — "I PAID" sets paid_until = now() + 30 days (FR-CHK-2). */
export async function POST() {
  const store = getStore();
  let user = await store.getCurrent();
  if (!user) {
    user = await store.ensureUser({ grade: 1, locale: 'uz' });
  }
  const updated = await store.setPaid(30);
  if (!updated) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  return NextResponse.json({ user: { ...updated, isPaid: isPaid(updated) } });
}
