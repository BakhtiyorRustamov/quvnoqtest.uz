import { NextRequest, NextResponse } from 'next/server';
import { labAllowed } from '@/lib/lab/server';
import { asProvider, chat } from '@/lib/lab/llm';
import { checkPlan, extractJson, planSystemPrompt, planUserPrompt } from '@/lib/lab/plan';
import { excerptBlock, searchBook } from '@/lib/lab/textbook';
import { BOOK_TEXT } from '@/lib/lab/books';

export const dynamic = 'force-dynamic';
export const maxDuration = 180; // free-tier Gemma can take over a minute

/**
 * Generate a board-lesson plan with one model and report how it went:
 * time, tokens, whether the JSON was valid, and what the checker had to drop.
 * With `book` set, the plan is built only from the matching textbook passages.
 */
export async function POST(req: NextRequest) {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const topic = String(body.topic ?? '').trim();
  const lang = ['uz', 'ru', 'en'].includes(body.lang) ? body.lang : 'uz';
  if (!topic) return NextResponse.json({ error: 'empty topic' }, { status: 400 });

  const book = typeof body.book === 'string' ? BOOK_TEXT[body.book] : undefined;
  const hits = book ? searchBook(book, topic) : [];
  const excerpts = book ? excerptBlock(hits) : undefined;

  const r = await chat({
    provider: asProvider(body.provider),
    model: String(body.model ?? ''),
    system: planSystemPrompt(lang),
    user: planUserPrompt(topic, excerpts),
    json: true
  });
  const used = hits.map((h) => ({ id: h.id, page: h.page, heading: h.heading }));
  if (!r.ok) return NextResponse.json({ error: r.error, ms: r.ms, excerpts: used }, { status: r.status });

  let parsed: unknown = null;
  let parseError: string | null = null;
  try {
    parsed = extractJson(r.raw);
  } catch (e) {
    parseError = (e as Error).message;
  }
  const { plan, issues } = parsed ? checkPlan(parsed) : { plan: null, issues: [] as string[] };
  return NextResponse.json({ model: body.model, provider: body.provider, ms: r.ms, usage: r.usage, raw: r.raw, parseError, issues, plan, excerpts: used });
}
