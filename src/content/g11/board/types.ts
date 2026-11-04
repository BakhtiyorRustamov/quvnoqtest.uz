import type { DrawOp } from '@/lib/lab/plan';
import type { CsAnim } from '@/components/g11/cs/types';

/**
 * Prepared grade-11 board lessons (written by hand from the textbook as a
 * reference: wording, numbers and drawings are our own).
 *
 * Flow: everyday hook → explanation steps on the board → worked example →
 * summary card → 10 interactive questions. Every step waits for the student
 * to press its reply button (drawn on the board); "Tushunmadim" shows `easy` instead.
 */

/** A character in a dialogue lesson. */
export type CastMember = {
  name: string;
  emoji: string;
  /** bubble / name colour */
  color: string;
  /** Azure neural voice used when the lesson audio is recorded (e.g. en-GB-RyanNeural) */
  azure: string;
  /** device-voice hints when there is no recording */
  accent?: string;
  gender?: 'm' | 'f';
};

export type DialogueLine = { who: string; text: string; /** Uzbek translation, shown on "Tushunmadim" */ uz: string };

/** How a dialogue scene looks: a messenger chat, a phone screen, a scene with speech bubbles, or a radio interview. */
export type SceneStyle = 'chat' | 'phone' | 'stage' | 'interview';

export type DialogueScene = {
  style: SceneStyle;
  /** where it happens, e.g. '🛍️ At a market in Tashkent' */
  place: string;
  lines: DialogueLine[];
  /** words to notice in this scene: highlighted in the bubbles, shown with the Uzbek meaning */
  words?: { en: string; uz: string }[];
};

export type LessonStep = {
  kind: 'hook' | 'explain' | 'example' | 'scene' | 'card' | 'anim';
  /** narration (read aloud, also shown as the caption); for a scene: a short line before the dialogue (may be empty) */
  say: string;
  /** simpler re-explanation for "Tushunmadim" (in `easyLang` if the lesson sets it) */
  easy: string;
  draw: DrawOp[];
  /** a dialogue instead of the board */
  scene?: DialogueScene;
  /** an animated computer-science picture instead of the board (Informatika) */
  anim?: CsAnim;
  /** small title on the animation window */
  animTitle?: string;
  /** start a fresh board for this step */
  clear?: boolean;
  /** reply button shown on the board when the step is drawn; moves on */
  next: string;
};

export type PracticeQuestion = {
  id: string;
  prompt: string;
  hint: string;
  /** shown after the question is solved */
  explanation: string;
  widget: { type: string; props: Record<string, unknown> };
};

export type BoardLesson = {
  /** stable id: the URL number and the audio folder (not shown to students) */
  n: number;
  /** what students see: the textbook topic number(s), e.g. "7–8" or, in geometry, "1.2–1.3" */
  label: string;
  /** textbook part: matematika — algebra numbers 1–46, geometry restarts at 1; a book shared by two grades (informatika) — which grade's part */
  part?: 'algebra' | 'geometriya' | 10 | 11;
  /** language of the narration and board (default "uz"). Non-Uzbek lessons are read by the device's free voice, not Gemini. */
  lang?: 'uz' | 'ru' | 'en' | 'kaa';
  /** language of the "Tushunmadim" text (default: same as lang) */
  easyLang?: 'uz' | 'ru' | 'en' | 'kaa';
  /** characters of a dialogue lesson; `narrator` reads `say` */
  cast?: Record<string, CastMember>;
  /** subject-page group for books split into chapters (fizika): e.g. { kicker: 'I bob', title: 'Magnit maydon' } */
  group?: { kicker: string; title: string };
  /** textbook volume ("1-qism" / "2-qism"); default 1 */
  qism?: 1 | 2;
  /** questions only (the book's "Masalalar yechish" / "Bobni takrorlash"): no board */
  revision?: boolean;
  title: string;
  /** textbook section this lesson is based on (reference only) */
  section: string;
  steps: LessonStep[];
  summary: string[];
  questions: PracticeQuestion[];
};

/** Text version of a lesson's narration; audio is only used when it matches. */
export function narrationKey(l: BoardLesson, track: 'main' | 'easy'): string {
  const text = l.steps
    .map((s) => (track === 'main' ? [s.say, ...(s.scene?.lines.map((x) => `${x.who}:${x.text}`) ?? [])].join('|') : s.easy))
    .join('\n');
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

export type AudioManifest = {
  voice: string;
  /** Gemini model, or "azure" for lessons recorded with Azure neural voices (one clip per step) */
  model: string;
  main?: { key: string; files: string[] };
  easy?: { key: string; files: string[] };
};

/** Public storage location of a lesson's audio (bucket "lesson-audio"). */
export const lessonAudioPrefix = (slug: string, n: number) => `g11/${slug}/${n}`;
