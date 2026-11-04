import { NextRequest, NextResponse } from 'next/server';
import { labAllowed } from '@/lib/lab/server';
import { asProvider, chat } from '@/lib/lab/llm';
import { extractJson, type CheckProblem, type LabPlan } from '@/lib/lab/plan';
import { excerptBlock, searchBook } from '@/lib/lab/textbook';
import { BOOK_TEXT } from '@/lib/lab/books';

export const dynamic = 'force-dynamic';
export const maxDuration = 180;

/**
 * Fact check: a second model reviews a generated lesson for wrong facts,
 * maths errors, made-up words, drawings that don't match the narration, and
 * (with a book) anything that contradicts or goes beyond the textbook.
 */
export async function POST(req: NextRequest) {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const plan = body.plan as LabPlan | undefined;
  const topic = String(body.topic ?? '').slice(0, 300);
  if (!plan?.steps?.length) return NextResponse.json({ error: 'no plan' }, { status: 400 });

  const book = typeof body.book === 'string' ? BOOK_TEXT[body.book] : undefined;
  const hits = book ? searchBook(book, `${topic} ${plan.title}`) : [];

  // compact, human-readable version of the lesson for the reviewer
  const lesson = plan.steps
    .map((s, i) => {
      const board = s.draw
        .map((o) => {
          const r = o as Record<string, unknown>;
          return [r.text, r.label, r.emoji, Array.isArray(r.items) ? (r.items as string[]).join(', ') : null, Array.isArray(r.rows) ? (r.rows as string[][]).map((x) => x.join(' | ')).join(' / ') : null]
            .filter(Boolean)
            .join(' ');
        })
        .filter(Boolean)
        .join(' ; ');
      return `Step ${i + 1}\n  says: ${s.say}\n  board: ${board || '(drawing only)'}`;
    })
    .join('\n');

  const system = `You are a strict fact checker for a school learning app in Uzbekistan. Review the lesson below.
Report every real problem:
- wrong facts or wrong maths;
- words that do not exist or are used wrongly in the lesson language (e.g. a city named as an animal);
- the lesson misreading the topic;
- an emoji or picture that does not show what the text says;${hits.length ? '\n- anything that contradicts the textbook passages, or claims that are not in them.' : ''}
Do not report style preferences. If the lesson is correct, return an empty list.
Reply with ONE JSON object only:
{"verdict":"ok"|"problems","problems":[{"step":1,"quote":"exact words from the lesson","problem":"what is wrong","fix":"the correct version","severity":"error"|"warning"}]}
Write "problem" and "fix" in the same language as the lesson.`;
  const user = `TOPIC: ${topic}\n\nLESSON "${plan.title}":\n${lesson}${hits.length ? `\n\nTEXTBOOK PASSAGES:\n${excerptBlock(hits)}` : ''}`;

  const r = await chat({ provider: asProvider(body.provider), model: String(body.model ?? ''), system, user, json: true, maxTokens: 1500 });
  if (!r.ok) return NextResponse.json({ error: r.error, ms: r.ms }, { status: r.status });
  try {
    const out = extractJson(r.raw) as { verdict?: string; problems?: CheckProblem[] };
    const problems = (Array.isArray(out.problems) ? out.problems : []).slice(0, 15).map((p) => ({
      step: Number(p.step) || 0,
      quote: String(p.quote ?? '').slice(0, 200),
      problem: String(p.problem ?? '').slice(0, 400),
      fix: String(p.fix ?? '').slice(0, 300),
      severity: p.severity === 'warning' ? 'warning' : 'error'
    }));
    return NextResponse.json({ ms: r.ms, problems, withBook: hits.length > 0 });
  } catch (e) {
    return NextResponse.json({ error: `could not read the checker's reply: ${(e as Error).message}`, raw: r.raw, ms: r.ms }, { status: 502 });
  }
}
