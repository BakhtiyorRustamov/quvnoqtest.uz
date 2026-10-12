import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, getAdminPasswordHash, isAdminSessionValid } from '@/lib/admin';
import { getPromoCatalog, normalizePromoCode, upsertPromoCode } from '@/lib/promo';

function requireAdminCookie(req: NextRequest): boolean {
  const cookieHeader = req.headers.get('cookie') ?? '';
  const match = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE}=`));
  const cookie = match ? decodeURIComponent(match.slice(ADMIN_COOKIE.length + 1)) : '';
  return isAdminSessionValid(cookie) && !!getAdminPasswordHash();
}

export async function GET(req: NextRequest) {
  if (!requireAdminCookie(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ codes: await getPromoCatalog() });
}

export async function POST(req: NextRequest) {
  if (!requireAdminCookie(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const rawCode = typeof body.code === 'string' ? body.code : '';
  const code = normalizePromoCode(rawCode);

  if (!code || !/^[a-z0-9-]+$/.test(code)) {
    return NextResponse.json({ error: 'invalid_code' }, { status: 400 });
  }

  const months = Number(body.months ?? 2) || 2;
  const billedMonths = Number(body.billedMonths ?? 1) || 1;
  const promo = await upsertPromoCode({
    code,
    months,
    billedMonths,
    active: body.active ?? true,
    label: typeof body.label === 'string' ? body.label : `2 months for the price of 1`
  });

  return NextResponse.json({ promo });
}
