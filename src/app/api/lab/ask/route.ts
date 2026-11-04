import { NextRequest, NextResponse } from 'next/server';
import { labAllowed } from '@/lib/lab/server';
import { asProvider, chat } from '@/lib/lab/llm';
import { LAB_LANG } from '@/lib/lab/plan';
import { excerptBlock, searchBook } from '@/lib/lab/textbook';
import { BOOK_TEXT } from '@/lib/lab/books';

export const dynamic = 'force-dynamic';
export const maxDuration = 180;

/**
 * Textbook Q&A (RAG): find the passages that match the question and let the
 * model answer only from them, citing pages. Nothing is stored.
 */
export async function POST(req: NextRequest) {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const question = String(body.question ?? '').trim().slice(0, 400);
  const lang = ['uz', 'ru', 'en'].includes(body.lang) ? body.lang : 'uz';
  const book = BOOK_TEXT[String(body.book ?? '')];
  if (!question) return NextResponse.json({ error: 'empty question' }, { status: 400 });
  if (!book) return NextResponse.json({ error: 'unknown book' }, { status: 400 });

  const hits = searchBook(book, question);
  const used = hits.map((h) => ({ id: h.id, page: h.page, heading: h.heading, text: h.text }));
  if (!hits.length) {
    return NextResponse.json({ answer: null, notFound: true, excerpts: [], ms: 0 });
  }

  const system = `You are a patient school teacher. Answer the student's question using ONLY the textbook passages given.
Rules:
- Use the textbook's definitions, notation and examples. Do not add facts that are not in the passages.
- If the passages do not contain the answer, say so plainly (in one sentence) instead of guessing.
- Keep it short and clear for a school student: 2–6 sentences, then a worked example from the passages if there is one.
- After each fact, cite its page in brackets like (9-bet).
- Write formulas in plain Unicode (x², →, ≠, ≈, ·).
- Answer in ${LAB_LANG[lang] ?? LAB_LANG.uz}.`;
  const user = `TEXTBOOK PASSAGES:\n${excerptBlock(hits)}\n\nSTUDENT'S QUESTION: ${question}`;

  const r = await chat({ provider: asProvider(body.provider), model: String(body.model ?? ''), system, user, maxTokens: 1200 });
  if (!r.ok) return NextResponse.json({ error: r.error, ms: r.ms, excerpts: used }, { status: r.status });
  return NextResponse.json({ answer: r.raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim(), ms: r.ms, usage: r.usage, excerpts: used });
}
