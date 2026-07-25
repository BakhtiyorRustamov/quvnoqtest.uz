import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@/lib/store';
import { getLesson } from '@/content';

export async function GET() {
  const store = getStore();
  const progress = await store.listProgress();
  return NextResponse.json({ progress });
}

/** Practice-exam result keys (not lessons): topicKey → subject + question count. */
const EXAM_TOTALS: Record<string, { subjectKey: string; total: number }> = {
  'g1-math-exam': { subjectKey: 'g1-math', total: 30 },
  'g1-math-dtm': { subjectKey: 'g1-math', total: 30 },
  'g1-ona-dtm': { subjectKey: 'g1-ona', total: 20 },
  'g1-oqish-dtm': { subjectKey: 'g1-oqish', total: 20 },
  'g1-fikr-exam': { subjectKey: 'g1-fikr', total: 10 }
};

/** Marks a topic completed with a score (FR-QZ-10). */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const topicKey = String(body.topicKey ?? '');
  const lesson = getLesson(topicKey);
  const exam = EXAM_TOTALS[topicKey];
  if (!lesson && !exam) return NextResponse.json({ error: 'unknown_topic' }, { status: 400 });

  const total = lesson ? lesson.items.length : exam!.total;
  const score = Math.min(total, Math.max(0, Number(body.score) || 0));
  const answers: boolean[] = Array.isArray(body.answers)
    ? body.answers.slice(0, total).map(Boolean)
    : [];

  const store = getStore();
  const user = await store.getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });

  await store.saveProgress({ subjectKey: lesson ? lesson.subjectKey : exam!.subjectKey, topicKey, score, answers });
  return NextResponse.json({ ok: true });
}
