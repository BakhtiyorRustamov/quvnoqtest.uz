import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

/** Magic-link landing: verifies the token, attaches/merges the account, then → dashboard. */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') ?? '';
  const store = getStore();
  const ok = token ? await store.claimMagicLink(token) : false;
  const dest = new URL(ok ? '/dashboard?claimed=1' : '/dashboard?claimed=0', req.nextUrl.origin);
  return NextResponse.redirect(dest);
}
