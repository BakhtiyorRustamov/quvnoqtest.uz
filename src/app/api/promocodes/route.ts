import { NextRequest, NextResponse } from 'next/server';
import { formatPromoSummary, getPromoOffer, normalizePromoCode } from '@/lib/promo';

export async function GET(req: NextRequest) {
  const code = normalizePromoCode(req.nextUrl.searchParams.get('code'));
  const offer = await getPromoOffer(code);
  if (!offer) {
    return NextResponse.json({ valid: false, message: 'Promo code is invalid.' });
  }
  return NextResponse.json({ valid: true, offer, message: await formatPromoSummary(code) });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const code = normalizePromoCode(typeof body.code === 'string' ? body.code : '');
  const offer = await getPromoOffer(code);
  if (!offer) {
    return NextResponse.json({ valid: false, message: 'Promo code is invalid.' }, { status: 400 });
  }
  return NextResponse.json({ valid: true, offer, message: await formatPromoSummary(code) });
}
