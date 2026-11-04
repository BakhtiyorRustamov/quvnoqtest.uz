import { NextRequest, NextResponse } from 'next/server';
import { labAllowed } from '@/lib/lab/server';
import { sbAdmin, supabaseConfigured } from '@/lib/supabaseAdmin';
import { BOARD_LESSONS, getBoardLesson } from '@/content/g11/board';
import { lessonAudioPrefix, narrationKey } from '@/content/g11/board/types';
import { LESSON_AUDIO_BUCKET as BUCKET, readManifest, voiceLessonTrack } from '@/lib/lab/lessonVoice';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** Status of every prepared lesson's audio (does it exist, does it match the current text?). */
export async function GET() {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  if (!supabaseConfigured()) return NextResponse.json({ error: 'Supabase not configured' }, { status: 501 });
  // revision lessons are questions only: nothing to voice
  const lessons = Object.entries(BOARD_LESSONS).flatMap(([slug, list]) => list.filter((l) => l.steps.length).map((l) => ({ slug, l })));
  const status = async ({ slug, l }: (typeof lessons)[number]) => {
    const prefix = lessonAudioPrefix(slug, l.n);
    const [m, { data: listed }] = await Promise.all([readManifest(prefix).catch(() => null), sbAdmin().storage.from(BUCKET).list(prefix, { limit: 200 })]);
    const names = new Set((listed ?? []).map((f) => f.name));
    return {
      slug,
      n: l.n,
      title: `${l.part === 'geometriya' ? 'G ' : ''}${l.label}. ${l.title}`,
      section: l.group ? `${l.group.kicker} — ${l.group.title}` : l.part === 'geometriya' ? 'Geometriya' : l.part === 'algebra' ? 'Algebra' : '',
      steps: l.steps.length,
      provider: 'gemini',
      voice: m?.voice ?? null,
      main: m?.main ? (m.main.key === narrationKey(l, 'main') ? 'ok' : 'outdated') : 'none',
      easy: m?.easy ? (m.easy.key === narrationKey(l, 'easy') ? 'ok' : 'outdated') : 'none',
      // a saved full recording of the current text can be re-cut for free
      recut: {
        main: names.has(`main-full-${narrationKey(l, 'main')}.wav`),
        easy: names.has(`easy-full-${narrationKey(l, 'easy')}.wav`)
      }
    };
  };
  // a few lessons at a time: much faster than one by one, gentle on Storage
  const rows = [];
  for (let i = 0; i < lessons.length; i += 12) rows.push(...(await Promise.all(lessons.slice(i, i + 12).map(status))));
  return NextResponse.json({ lessons: rows });
}

/** Voice one track of a lesson with Gemini (Uzbek, Russian and English lessons alike). */
export async function POST(req: NextRequest) {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  if (!supabaseConfigured()) return NextResponse.json({ error: 'Supabase not configured' }, { status: 501 });
  const body = await req.json().catch(() => ({}));
  const slug = String(body.slug ?? '');
  const lesson = getBoardLesson(slug, Number(body.n));
  const track: 'main' | 'easy' = body.track === 'easy' ? 'easy' : 'main';
  if (!lesson) return NextResponse.json({ error: 'unknown lesson' }, { status: 400 });
  const r = await voiceLessonTrack(slug, lesson, track, { recut: !!body.recut, voice: body.voice, model: body.model, style: body.style });
  if (!r.ok) return NextResponse.json({ error: r.error, seconds: r.seconds }, { status: r.status });
  return NextResponse.json(r);
}
