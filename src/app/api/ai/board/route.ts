import { NextRequest, NextResponse } from 'next/server';
import { getStore, isActive, isDisabled } from '@/lib/store';
import { tashkentToday } from '@/lib/tashkent';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { AI_LIMITS, FREE_AI_KEY } from '@/lib/ai';
import { aiBoardConfigured, makeAiBoard } from '@/lib/aiBoard';
import { sbAdmin, supabaseConfigured } from '@/lib/supabaseAdmin';

const isVideoKey = (req: NextRequest) => !!process.env.VIDEO_SECRET && req.headers.get('x-video-key') === process.env.VIDEO_SECRET;

/** Keep every Mufassal answer as a video candidate (reviewed before anything is posted). */
function queueVideo(question: string, lesson: unknown, lang: string, model: string) {
  if (!supabaseConfigured()) return;
  void sbAdmin().from('board_videos').insert({ question, lesson, lang, model }).then(({ error }) => error && console.error('[board-video-queue]', error.message));
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Rough token cost of one board explanation, for pre-send gating. */
const BOARD_TOKENS = 3500;

/**
 * AI tutor "explain on the board": same user, rate limit and quota rules as
 * /api/ai (one board = one message + its tokens).
 */
export async function POST(req: NextRequest) {
  if (isVideoKey(req)) {
    const b = await req.json().catch(() => ({}));
    const q = String(b.question ?? '').trim().slice(0, 500);
    if (!q) return NextResponse.json({ error: 'empty' }, { status: 400 });
    const lang = ['uz', 'ru', 'en'].includes(b.lang) ? b.lang : 'uz';
    try {
      const { lesson, model } = await makeAiBoard({ question: q, lang, grade: 11 });
      return NextResponse.json({ lesson, model });
    } catch (e) {
      return NextResponse.json({ error: (e as Error).message }, { status: 502 });
    }
  }
  const store = getStore();
  const user = await store.getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  if (isDisabled(user)) return NextResponse.json({ error: 'account_disabled' }, { status: 403 });
  if (!aiBoardConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 501 });
  if (!(await rateLimitStrict(`aiboard:${clientIp(req)}`, 15, 3600))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const question = String(body.question ?? '').trim().slice(0, 500);
  const context = typeof body.context === 'string' ? body.context.slice(0, 900) : undefined;
  if (!question) return NextResponse.json({ error: 'empty' }, { status: 400 });

  const paid = isActive(user);
  const date = paid ? tashkentToday() : FREE_AI_KEY;
  const usage = await store.getAiUsage(date);
  if (usage.messages >= AI_LIMITS.messages) return NextResponse.json({ error: 'limit_messages', usage, limits: AI_LIMITS }, { status: 429 });
  if (AI_LIMITS.tokens - usage.tokens < BOARD_TOKENS) return NextResponse.json({ error: 'limit_tokens', usage, limits: AI_LIMITS }, { status: 429 });

  const lang = ['uz', 'ru', 'en'].includes(user.locale) ? user.locale : 'uz';
  try {
    const { lesson, model, tokens, errors } = await makeAiBoard({ question, context, lang, grade: user.grade || 11, voice: body.voice === true });
    await store.addAiUsage(date, 1, tokens);
    queueVideo(question, lesson, lang, model);
    console.log(JSON.stringify({ evt: 'ai_board', user: user.publicId, date, model, tokens, failed: errors }));
    return NextResponse.json({ lesson, model, ...(process.env.NODE_ENV === 'development' && errors.length && { failed: errors }), usage: { messages: usage.messages + 1, tokens: usage.tokens + tokens }, limits: AI_LIMITS });
  } catch (e) {
    const spent = (e as { tokens?: number }).tokens ?? 0;
    if (spent) await store.addAiUsage(date, 0, spent);
    console.error('[ai-board] failed', (e as Error).message);
    return NextResponse.json({ error: 'upstream' }, { status: 502 });
  }
}
