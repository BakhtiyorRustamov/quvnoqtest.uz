import { NextRequest, NextResponse } from 'next/server';
import { getPromoOffer } from '@/lib/promo';
import { getStore, isPaid } from '@/lib/store';

/** Dummy checkout success — "I PAID" sets paid_until = now() + 30 days (FR-CHK-2). */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const promo = typeof body.promoCode === 'string' ? await getPromoOffer(body.promoCode) : null;

  if (body.promoCode && !promo) {
    return NextResponse.json({ error: 'invalid_promo_code' }, { status: 400 });
  }

  const store = getStore();
  let user = await store.getCurrent();
  if (!user) {
    user = await store.ensureUser({ grade: 1, locale: 'uz' });
  }
  const days = promo ? promo.months * 30 : 30;
  const updated = await store.setPaid(days);
  if (!updated) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  return NextResponse.json({
    user: { ...updated, isPaid: isPaid(updated) },
    promo: promo ? { code: promo.code, months: promo.months, billedMonths: promo.billedMonths } : null
  });
}
