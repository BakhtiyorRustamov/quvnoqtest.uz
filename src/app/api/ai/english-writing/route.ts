import { NextRequest, NextResponse } from 'next/server';
import { getStore, isDisabled } from '@/lib/store';
import { tashkentToday } from '@/lib/tashkent';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { AI_LIMITS, aiConfigured, callAi } from '@/lib/ai';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const IELTS = `You are a certified IELTS Academic Writing examiner. Assess the candidate's response strictly using the official public IELTS band descriptors.
Criteria (each a band 0–9 in steps of 0.5):
- "ta": Task Achievement (Task 1: accurate overview, key features, comparisons, data used correctly) or Task Response (Task 2: position, ideas, development);
- "cc": Coherence and Cohesion;
- "lr": Lexical Resource;
- "gra": Grammatical Range and Accuracy.
Penalise responses under the minimum word count (Task 1: 150, Task 2: 250) in "ta". Off-topic or memorised text: low bands.
Reply ONLY with JSON: {"ta":n,"cc":n,"lr":n,"gra":n,"band":n,"comment":"3–5 sentences of feedback in simple English","tips":["...","..."] (max 3),"errors":["mistake → correction"] (max 5)}`;

const ML = `You are an examiner for Uzbekistan's national Multilevel (CEFR) English exam, Writing paper.
Task 1 is an email/letter (about 150 words): check that every bullet point is covered, the format and register (formal/informal) are right.
Task 2 is an essay (at least 250 words): check position, argument development, organisation.
Score four criteria from 0 to 5 each (steps of 0.5): "ta" task fulfilment, "cc" organisation and cohesion, "lr" vocabulary, "gra" grammar and accuracy.
Also give "level": one of "below B1", "B1", "B2", "C1". Penalise responses far below the word count in "ta".
Reply ONLY with JSON: {"ta":n,"cc":n,"lr":n,"gra":n,"level":"B2","comment":"3–5 sentences of feedback in simple English","tips":["..."] (max 3),"errors":["mistake → correction"] (max 5)}`;

/** AI check of one English writing task (IELTS Academic / Multilevel). Open to every student (own rate limit). */
export async function POST(req: NextRequest) {
  const store = getStore();
  const user = await store.getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  if (isDisabled(user)) return NextResponse.json({ error: 'account_disabled' }, { status: 403 });
  if (!aiConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 501 });
  if (!(await rateLimitStrict(`aiengw:${clientIp(req)}`, 20, 3600))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  const exam = body.exam === 'ielts' ? 'ielts' : 'multilevel';
  const task = String(body.task ?? '').slice(0, 1500);
  const chart = String(body.chart ?? '').slice(0, 1200);
  const text = String(body.text ?? '').trim().slice(0, 6000);
  if (!text) return NextResponse.json({ error: 'empty' }, { status: 400 });
  const words = text.split(/\s+/).length;

  const date = tashkentToday();
  const usage = await store.getAiUsage(date);
  if (usage.messages >= AI_LIMITS.messages || AI_LIMITS.tokens - usage.tokens < 3000) return NextResponse.json({ error: 'limit_tokens' }, { status: 429 });

  try {
    const { reply, inputTokens, outputTokens } = await callAi({
      system: exam === 'ielts' ? IELTS : ML,
      turns: [{ role: 'user', content: `TASK:\n${task}\n${chart ? `\nCHART DATA: ${chart}\n` : ''}\nWORD COUNT: ${words}\n\nCANDIDATE'S RESPONSE:\n${text}` }],
      maxTokens: 800
    });
    await store.addAiUsage(date, 1, inputTokens + outputTokens);
    const m = reply.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('no json');
    const r = JSON.parse(m[0]);
    const top = exam === 'ielts' ? 9 : 5;
    const n = (v: unknown) => Math.max(0, Math.min(top, Math.round(Number(v) * 2) / 2 || 0));
    const crit = { ta: n(r.ta), cc: n(r.cc), lr: n(r.lr), gra: n(r.gra) };
    const avg = (crit.ta + crit.cc + crit.lr + crit.gra) / 4;
    const result = {
      words,
      ...crit,
      // IELTS: task band (nearest half); Multilevel: 0–75 scale from the 0–20 criteria total
      score: exam === 'ielts' ? Math.floor(avg * 2 + 0.5) / 2 : Math.round(((crit.ta + crit.cc + crit.lr + crit.gra) / 20) * 75 * 10) / 10,
      level: exam === 'ielts' ? undefined : String(r.level ?? '').slice(0, 12),
      comment: String(r.comment ?? '').slice(0, 900),
      tips: Array.isArray(r.tips) ? r.tips.slice(0, 3).map((x: unknown) => String(x).slice(0, 200)) : [],
      errors: Array.isArray(r.errors) ? r.errors.slice(0, 5).map((x: unknown) => String(x).slice(0, 140)) : []
    };
    return NextResponse.json({ result });
  } catch (e) {
    console.error('[ai-eng-writing] failed', (e as Error).message);
    return NextResponse.json({ error: 'upstream' }, { status: 502 });
  }
}
