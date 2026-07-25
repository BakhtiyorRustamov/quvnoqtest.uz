import { NextRequest, NextResponse } from 'next/server';
import { getStore, hasSupabase } from '@/lib/store';
import { sbAdmin } from '@/lib/supabaseAdmin';
import { sameOrigin } from '@/lib/origin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Dismisses one of the current user's notices. */
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'bad_origin' }, { status: 403 });
  if (!hasSupabase()) return NextResponse.json({ ok: true });

  const user = await getStore().getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const id = typeof body.id === 'string' && /^[0-9a-f-]{36}$/i.test(body.id) ? body.id : null;
  if (!id) return NextResponse.json({ error: 'bad_id' }, { status: 400 });

  // Scoped to the caller's own rows, so an id from another user does nothing.
  await sbAdmin()
    .from('user_notices')
    .update({ dismissed_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id);

  return NextResponse.json({ ok: true });
}
