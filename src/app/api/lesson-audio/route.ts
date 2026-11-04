import { NextRequest, NextResponse, after } from 'next/server';
import { sbAdmin, supabaseConfigured } from '@/lib/supabaseAdmin';
import { googleKey } from '@/lib/lab/server';
import { getBoardLesson } from '@/content/g11/board';
import { lessonAudioPrefix } from '@/content/g11/board/types';
import { LESSON_AUDIO_BUCKET as BUCKET, readManifest, trackReady, voiceLessonTrack } from '@/lib/lab/lessonVoice';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** a voicing that started less than this long ago is still running */
const LOCK_MS = 6 * 60_000;

/**
 * Students' "voice this lesson" request: when a lesson (or its "Soddaroq"
 * track) has no audio made from the current text, voice it once with Gemini
 * in the background. A lock file stops parallel requests from voicing the
 * same track twice; once the manifest matches, nothing more is spent.
 */
export async function POST(req: NextRequest) {
  if (!supabaseConfigured() || !googleKey()) return NextResponse.json({ status: 'off' });
  const body = await req.json().catch(() => ({}));
  const slug = String(body.slug ?? '');
  const lesson = getBoardLesson(slug, Number(body.n));
  const track: 'main' | 'easy' = body.track === 'easy' ? 'easy' : 'main';
  if (!lesson || !lesson.steps.length) return NextResponse.json({ error: 'unknown lesson' }, { status: 400 });

  const prefix = lessonAudioPrefix(slug, lesson.n);
  if (trackReady(await readManifest(prefix).catch(() => null), lesson, track)) return NextResponse.json({ status: 'ready' });

  const sb = sbAdmin();
  const lockPath = `${prefix}/${track}-lock.json`;
  const { data: lock } = await sb.storage.from(BUCKET).download(lockPath);
  if (lock) {
    const at = Number(JSON.parse(await lock.text().catch(() => '{}')).at ?? 0);
    if (Date.now() - at < LOCK_MS) return NextResponse.json({ status: 'pending' });
  }
  await sb.storage.from(BUCKET).upload(lockPath, Buffer.from(JSON.stringify({ at: Date.now() })), { contentType: 'application/json', upsert: true, cacheControl: '0' });

  after(async () => {
    try {
      const r = await voiceLessonTrack(slug, lesson, track);
      if (!r.ok) console.error(`[lesson-audio] ${slug} ${lesson.n} ${track}: ${r.error}`);
    } finally {
      await sb.storage.from(BUCKET).remove([lockPath]);
    }
  });
  return NextResponse.json({ status: 'started' });
}
