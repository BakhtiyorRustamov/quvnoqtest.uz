import { NextRequest, NextResponse } from 'next/server';
import { getStore, isDisabled } from '@/lib/store';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { sbAdmin, supabaseConfigured } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

const PAGE_RE = /^[a-z0-9/_-]{1,120}$/;
type Row = { id: number; author: string; body: string; created_at: string; user_id: string };

/** Lesson comments: GET ?page=g11/matematika/3 → latest 50; POST {page, body}; DELETE ?id= (own comment). */
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') ?? '';
  if (!PAGE_RE.test(page) || !supabaseConfigured()) return NextResponse.json({ comments: [] });
  const me = await getStore().getCurrent().catch(() => null);
  const { data } = await sbAdmin()
    .from('lesson_comments')
    .select('id, author, body, created_at, user_id')
    .eq('page', page)
    .eq('hidden', false)
    .order('created_at', { ascending: false })
    .limit(50);
  const comments = ((data ?? []) as Row[]).map((r) => ({ id: r.id, author: r.author, body: r.body, at: r.created_at, mine: !!me && r.user_id === me.id }));
  return NextResponse.json({ comments });
}

export async function POST(req: NextRequest) {
  const user = await getStore().getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  if (isDisabled(user)) return NextResponse.json({ error: 'account_disabled' }, { status: 403 });
  if (!supabaseConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 501 });
  if (!(await rateLimitStrict(`comment:${clientIp(req)}`, 10, 3600))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  const b = await req.json().catch(() => ({}));
  const page = String(b.page ?? '');
  const body = String(b.body ?? '').replace(/\s+\n/g, '\n').trim().slice(0, 1000);
  if (!PAGE_RE.test(page) || body.length < 2) return NextResponse.json({ error: 'empty' }, { status: 400 });
  if (/(https?:\/\/|www\.|t\.me\/|@\w{4,})/i.test(body)) return NextResponse.json({ error: 'links' }, { status: 400 });
  const author = (user.name?.trim() || '').slice(0, 60);
  const { data, error } = await sbAdmin().from('lesson_comments').insert({ page, user_id: user.id, author, body }).select('id, author, body, created_at').single();
  if (error || !data) return NextResponse.json({ error: 'db' }, { status: 500 });
  return NextResponse.json({ comment: { id: data.id, author: data.author, body: data.body, at: data.created_at, mine: true } });
}

export async function DELETE(req: NextRequest) {
  const user = await getStore().getCurrent();
  const id = Number(req.nextUrl.searchParams.get('id'));
  if (!user || !id || !supabaseConfigured()) return NextResponse.json({ error: 'bad' }, { status: 400 });
  await sbAdmin().from('lesson_comments').update({ hidden: true }).eq('id', id).eq('user_id', user.id);
  return NextResponse.json({ ok: true });
}
