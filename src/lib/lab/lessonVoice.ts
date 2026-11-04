import { Mp3Encoder } from '@breezystack/lamejs';
import { speakUz } from '@/lib/lab/speakUz';
import { DEFAULT_STYLE, geminiSpeak, readWav, wav } from '@/lib/lab/geminiTts';
import { boundaryTimes, heardPerClip, transcribeWords } from '@/lib/lab/align';
import { splitByText } from '@/lib/lab/audioSplit';
import { sbAdmin } from '@/lib/supabaseAdmin';
import { lessonAudioPrefix, narrationKey, type AudioManifest, type BoardLesson } from '@/content/g11/board/types';

export const LESSON_AUDIO_BUCKET = 'lesson-audio';
const BUCKET = LESSON_AUDIO_BUCKET;

const LANG_NAME: Record<string, string> = { uz: 'Uzbek', ru: 'Russian', en: 'English', kaa: 'Karakalpak' };

function mp3(pcm: Int16Array, rate: number): Buffer {
  const enc = new Mp3Encoder(1, rate, 48);
  const out: Uint8Array[] = [];
  for (let i = 0; i < pcm.length; i += 1152) {
    const b = enc.encodeBuffer(pcm.subarray(i, i + 1152));
    if (b.length) out.push(b);
  }
  out.push(enc.flush());
  return Buffer.concat(out.map((b) => Buffer.from(b)));
}

export async function readManifest(prefix: string): Promise<AudioManifest | null> {
  const { data } = await sbAdmin().storage.from(BUCKET).download(`${prefix}/manifest.json`);
  if (!data) return null;
  try {
    return JSON.parse(await data.text()) as AudioManifest;
  } catch {
    return null;
  }
}

/** Is this track recorded from exactly the current text? */
export function trackReady(m: AudioManifest | null, lesson: BoardLesson, track: 'main' | 'easy') {
  const t = m?.[track];
  return !!t && t.key === narrationKey(lesson, track) && t.files.length === lesson.steps.length;
}

/** The text read for one step, in the language of the track. */
function stepText(lesson: BoardLesson, i: number, track: 'main' | 'easy') {
  const st = lesson.steps[i];
  const lang = track === 'easy' ? (lesson.easyLang ?? lesson.lang ?? 'uz') : (lesson.lang ?? 'uz');
  const raw = track === 'easy' ? st.easy : [st.say, ...(st.scene?.lines.map((l) => l.text) ?? [])].filter(Boolean).join('\n');
  // read the maths the Uzbek way (f(x) → "ef iks"); captions keep the notation
  return lang === 'uz' ? speakUz(raw) : raw;
}

export type VoiceResult =
  | { ok: true; voice: string; model: string; ttsMs: number; recut: boolean; cutBy: string; clips: number[]; heard: unknown[]; pausesMs: unknown; driftPct: unknown }
  | { ok: false; error: string; status: number; seconds?: number };

/**
 * Voice one track of a lesson ("main" narration or the "Soddaroq" versions)
 * with ONE Gemini request, find where each step starts (speech recognition via
 * Groq Whisper, falling back to a text-length estimate), cut it into one clip
 * per step and store the MP3s + a manifest in the public "lesson-audio" bucket.
 * The whole recording is kept too, so `recut: true` re-cuts it without
 * spending another Gemini request. Works for Uzbek, Russian and English lessons.
 */
export async function voiceLessonTrack(
  slug: string,
  lesson: BoardLesson,
  track: 'main' | 'easy',
  opts: { recut?: boolean; voice?: string; model?: string; style?: string } = {}
): Promise<VoiceResult> {
  const sb = sbAdmin();
  const prefix = lessonAudioPrefix(slug, lesson.n);
  const key = narrationKey(lesson, track);
  const fullName = `${track}-full-${key}.wav`;
  const lang = track === 'easy' ? (lesson.easyLang ?? lesson.lang ?? 'uz') : (lesson.lang ?? 'uz');
  const paragraphs = lesson.steps.map((_, i) => stepText(lesson, i, track));
  const dialogue = track === 'main' && lesson.steps.some((s) => s.scene);

  let wavFile: Buffer;
  let voice: string;
  let model: string;
  let ttsMs = 0;
  if (opts.recut) {
    const { data } = await sb.storage.from(BUCKET).download(`${prefix}/${fullName}`);
    const m = await readManifest(prefix).catch(() => null);
    if (!data || !m) return { ok: false, error: 'no saved recording for this text — voice it first', status: 404 };
    wavFile = Buffer.from(await data.arrayBuffer());
    voice = m.voice;
    model = m.model;
  } else {
    // the other track of the lesson keeps the same voice
    const prevM = await readManifest(prefix).catch(() => null);
    const prevVoice = prevM && prevM.model !== 'azure' && !prevM.voice.startsWith('azure:') ? prevM.voice : undefined;
    const style =
      `${String(opts.style ?? '').trim() || DEFAULT_STYLE}. The text is in ${LANG_NAME[lang] ?? 'Uzbek'}` +
      (lang !== 'uz' ? ', read it with natural native pronunciation for school students learning the language' : '') +
      (dialogue ? '. Some paragraphs are short dialogues: give each speaker a slightly different voice, do not read speaker names' : '') +
      '. Read every paragraph completely, in order, and leave a clear pause of about two seconds between paragraphs.';
    const tts = await geminiSpeak({
      text: paragraphs.join('\n\n'),
      voice: opts.voice ?? prevVoice,
      model: opts.model,
      style,
      timeoutMs: 240_000
    });
    if (!tts.ok) return { ok: false, error: tts.error, status: 502 };
    wavFile = wav(tts.pcm, tts.rate);
    voice = tts.voice;
    model = tts.model;
    ttsMs = tts.ms;
  }
  const { pcm: raw, rate } = readWav(wavFile);
  // copy into an aligned buffer (the decoded bytes may start at an odd offset)
  const bytes = raw.length & ~1;
  const pcm = new Int16Array(raw.buffer.slice(raw.byteOffset, raw.byteOffset + bytes));

  // where does each step start? ask speech recognition; the text estimate fills gaps
  const asr = await transcribeWords(wavFile, lang === 'kaa' ? 'uz' : lang); // Whisper has no Karakalpak; Uzbek is the closest Latin-script model
  const hints = asr.ok ? boundaryTimes(paragraphs, asr.words) : undefined;
  const split = splitByText(pcm, rate, paragraphs, hints);
  if (!split.ok) {
    return {
      ok: false,
      error: `could not cut the audio into ${paragraphs.length} steps (${split.error}). Try again, or pick another voice.`,
      status: 422,
      seconds: Math.round(pcm.length / rate)
    };
  }

  const { data: bucket } = await sb.storage.getBucket(BUCKET);
  if (!bucket) {
    const { error } = await sb.storage.createBucket(BUCKET, { public: true });
    if (error && !/exists/i.test(error.message)) return { ok: false, error: `bucket: ${error.message}`, status: 500 };
  }

  // a new name on every save: browsers and the storage CDN cache clips for a year
  const version = Date.now().toString(36);
  const files: string[] = [];
  for (let i = 0; i < split.segments.length; i++) {
    const name = `${track}-${i + 1}-${key}-${version}.mp3`;
    const { error } = await sb.storage.from(BUCKET).upload(`${prefix}/${name}`, mp3(split.segments[i], rate), {
      contentType: 'audio/mpeg',
      upsert: true,
      cacheControl: '31536000'
    });
    if (error) return { ok: false, error: `upload ${name}: ${error.message}`, status: 500 };
    files.push(name);
  }
  if (!opts.recut) {
    const { error } = await sb.storage.from(BUCKET).upload(`${prefix}/${fullName}`, wavFile, {
      contentType: 'audio/wav',
      upsert: true,
      cacheControl: '60'
    });
    if (error) return { ok: false, error: `upload ${fullName}: ${error.message}`, status: 500 };
  }

  // one voice per lesson: the manifest records it so the other track can match
  const prev = (await readManifest(prefix).catch(() => null)) ?? { voice, model };
  const manifest: AudioManifest = { ...prev, voice, model, [track]: { key, files } };
  if (prev.voice && prev.voice !== voice) {
    // a different voice makes the other track inconsistent; drop it so it gets re-voiced
    delete manifest[track === 'main' ? 'easy' : 'main'];
  }
  const { error: mErr } = await sb.storage
    .from(BUCKET)
    .upload(`${prefix}/manifest.json`, Buffer.from(JSON.stringify(manifest, null, 2)), { contentType: 'application/json', upsert: true, cacheControl: '30' });
  if (mErr) return { ok: false, error: `manifest: ${mErr.message}`, status: 500 };

  // remove clips (and recordings) of older versions of this track
  const { data: listed } = await sb.storage.from(BUCKET).list(prefix, { limit: 200 });
  const stale = (listed ?? []).map((f) => f.name).filter((n) => n.startsWith(`${track}-`) && !files.includes(n) && n !== fullName && !n.endsWith('-lock.json'));
  if (stale.length) await sb.storage.from(BUCKET).remove(stale.map((n) => `${prefix}/${n}`));

  return {
    ok: true,
    voice,
    model,
    ttsMs,
    recut: !!opts.recut,
    cutBy: asr.ok
      ? `speech recognition (${asr.model}, ${hints?.filter((h) => h !== null).length ?? 0}/${paragraphs.length - 1} steps found)`
      : `text length only — ${asr.error}`,
    clips: split.segments.map((s) => Math.round((s.length / rate) * 10) / 10),
    heard: asr.ok ? heardPerClip(asr.words, split.boundsSec) : [],
    pausesMs: split.gapsMs,
    driftPct: split.driftPct
  };
}
