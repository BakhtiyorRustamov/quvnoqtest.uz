import { NextRequest, NextResponse } from 'next/server';
import { getStore, isDisabled } from '@/lib/store';
import { tashkentToday } from '@/lib/tashkent';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { AI_LIMITS, aiConfigured, callAi } from '@/lib/ai';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const NOTE = `IMPORTANT: each item shows the examiner's question (Q) and the candidate's transcribed answer (A). Only the A text is the candidate's speech — never praise or penalise words that appear only in the questions, and quote only words the candidate actually said. You only receive automatic speech-to-text transcripts, not audio: judge fluency from length, hesitation words and coherence, and judge pronunciation cautiously (only if the transcript shows obvious misrecognitions), and say in the comment that pronunciation could not be fully assessed.`;
const IELTS = `You are a certified IELTS Speaking examiner. Assess the candidate using the official public IELTS Speaking band descriptors: "fc" Fluency and Coherence, "lr" Lexical Resource, "gra" Grammatical Range and Accuracy, "p" Pronunciation (each 0–9, steps of 0.5). ${NOTE}
Very short or empty answers get low bands.
Reply ONLY with JSON: {"fc":n,"lr":n,"gra":n,"p":n,"comment":"3–5 sentences of feedback in simple English","tips":["..."] (max 3)}`;
const ML = `You are an examiner for Uzbekistan's national Multilevel (CEFR) English exam, Speaking paper (Part 1.1 personal questions, Part 1.2 picture comparison, Part 2 long turn, Part 3 arguments for and against). Score "fc" fluency and coherence, "lr" vocabulary, "gra" grammar, "p" pronunciation, each 0–5 (steps of 0.5), and give "level": "below B1", "B1", "B2" or "C1". ${NOTE}
Reply ONLY with JSON: {"fc":n,"lr":n,"gra":n,"p":n,"level":"B2","comment":"3–5 sentences of feedback in simple English","tips":["..."] (max 3)}`;

/** AI check of a whole English speaking test from Whisper transcripts. Open to every student (own rate limit). */
export async function POST(req: NextRequest) {
  const store = getStore();
  const user = await store.getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  if (isDisabled(user)) return NextResponse.json({ error: 'account_disabled' }, { status: 403 });
  if (!aiConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 501 });
  if (!(await rateLimitStrict(`aiengs:${clientIp(req)}`, 10, 3600))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  const exam = body.exam === 'ielts' ? 'ielts' : 'multilevel';
  const items: { part: string; q: string; a: string; sec: number }[] = Array.isArray(body.items)
    ? body.items.slice(0, 20).map((x: any) => ({ part: String(x.part ?? '').slice(0, 20), q: String(x.q ?? '').slice(0, 600), a: String(x.a ?? '').slice(0, 2500), sec: Number(x.sec) || 0 }))
    : [];
  if (!items.some((x) => x.a.trim())) return NextResponse.json({ error: 'empty' }, { status: 400 });

  const date = tashkentToday();
  const usage = await store.getAiUsage(date);
  if (usage.messages >= AI_LIMITS.messages || AI_LIMITS.tokens - usage.tokens < 3500) return NextResponse.json({ error: 'limit_tokens' }, { status: 429 });

  const transcript = items.map((x) => `[${x.part}] Q: ${x.q}\nA (${Math.round(x.sec)} s, ${x.a.trim() ? x.a.trim().split(/\s+/).length : 0} words): ${x.a || '(no answer)'}`).join('\n\n');
  try {
    const { reply, inputTokens, outputTokens } = await callAi({ system: exam === 'ielts' ? IELTS : ML, turns: [{ role: 'user', content: transcript }], maxTokens: 700 });
    await store.addAiUsage(date, 1, inputTokens + outputTokens);
    const m = reply.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('no json');
    const r = JSON.parse(m[0]);
    const top = exam === 'ielts' ? 9 : 5;
    const n = (v: unknown) => Math.max(0, Math.min(top, Math.round(Number(v) * 2) / 2 || 0));
    const crit = { fc: n(r.fc), lr: n(r.lr), gra: n(r.gra), p: n(r.p) };
    const sum = crit.fc + crit.lr + crit.gra + crit.p;
    const result = {
      ...crit,
      score: exam === 'ielts' ? Math.floor((sum / 4) * 2 + 0.5) / 2 : Math.round((sum / 20) * 75 * 10) / 10,
      level: exam === 'ielts' ? undefined : String(r.level ?? '').slice(0, 12),
      comment: String(r.comment ?? '').slice(0, 900),
      tips: Array.isArray(r.tips) ? r.tips.slice(0, 3).map((x: unknown) => String(x).slice(0, 200)) : []
    };
    return NextResponse.json({ result });
  } catch (e) {
    console.error('[ai-eng-speaking] failed', (e as Error).message);
    return NextResponse.json({ error: 'upstream' }, { status: 502 });
  }
}
