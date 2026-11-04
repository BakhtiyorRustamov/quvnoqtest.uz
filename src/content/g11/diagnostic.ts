import type { L10n } from '@/lib/i18n-config';
import type { ExamQuestion } from '@/content/g1-math/exam';
import { G11_FILLED_LESSONS } from './lessons';
import { BOARD_LESSONS } from './board';
import { buildMathExam, MATH_EXAM_MINUTES } from './exam/matematika';
import { buildPhysicsExam, PHYS_EXAM_MINUTES } from './exam/fizika';
import { buildChemExam, CHEM_EXAM_MINUTES } from './exam/kimyo';
import { buildBioExam, BIO_EXAM_MINUTES } from './exam/biologiya';
import { buildHistExam, HIST_EXAM_MINUTES } from './exam/tarix';
import { buildUzbExam, UZB_EXAM_MINUTES } from './exam/onatili';
import { buildRusExam, RUS_EXAM_MINUTES } from './exam/rus';
import { buildKaaExam, KAA_EXAM_MINUTES } from './exam/qoraqalpoq';
import { buildInfExam, INF_EXAM_MINUTES } from './exam/informatika';
import { buildGeoExam, GEO_EXAM_MINUTES } from './exam/geografiya';

/**
 * Grade 11 practice test ("Testni boshlash") — DUMMY content (Lorem Ipsum) so the flow can be
 * reviewed before real questions are written. Same shape as the grade-1 exams.
 */
export const G11_DIAG_COUNT = 45;
export const G11_DIAG_MINUTES = 60;

export const G11_DIAG_TITLE: L10n = { uz: 'Testni boshlash', ru: 'Начать тест', en: 'Start the test' };

export const G11_DIAG_INTRO: L10n = {
  uz: 'Bu sinov (namuna) test: savollar hozircha Lorem Ipsum matnidan iborat. Har bir savol ostidagi daftarda qalam bilan ishlashingiz mumkin.',
  ru: 'Это пробный (демо) тест: вопросы пока состоят из текста Lorem Ipsum. В тетради под каждым вопросом можно писать ручкой.',
  en: 'This is a sample (dummy) test: the questions are Lorem Ipsum for now. You can work things out with the pen in the notebook under each question.'
};

const LOREM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa',
  'Nisi ut aliquip ex ea commodo consequat, cillum dolore eu fugiat',
  'Curabitur pretium tincidunt lacus, nulla gravida orci a odio',
  'Integer in mauris eu nibh euismod gravida, duis ac tellus et risus'
];
const WORDS = ['lorem', 'ipsum', 'dolor', 'amet', 'tempor', 'magna', 'veniam', 'nostrud', 'labore', 'culpa', 'fugiat', 'gravida'];

const same = (s: string): L10n => ({ uz: s, ru: s, en: s });

/** A test question plus its worked explanation (shown in the results review). */
export type G11Question = ExamQuestion & {
  explanation: L10n;
  /** the lesson (topic) that covers this question (0 = none) */
  lessonN: number;
  /** open task (Milliy sertifikat 36–45): typed answers for parts a and b; choices stay empty */
  parts?: { label: string; prompt: L10n; answer: string }[];
  /** matching task (33–35): the six shared options A–F */
  match?: boolean;
  /** generated SVG drawing (geometry figure, graph or circuit) shown under the text */
  figure?: string;
  /** essay (Ona tili 45): answer = [text, score 0–10, AI feedback JSON]; scored by /api/ai/essay */
  essay?: boolean;
};

/** A student's answer: chosen option, typed part answers (open task), or nothing. */
export type G11Answer = number | string[] | null;

/** subjects whose test is a real, freshly generated variant */
export const hasRealExam = (slug: string) => slug === 'matematika' || slug === 'fizika' || slug === 'kimyo' || slug === 'biologiya' || slug === 'tarix' || slug === 'ozbek-tili' || slug === 'rus-tili' || slug === 'qoraqalpoq-tili' || slug === 'informatika' || slug === 'geografiya';

/** A test for the subject: real generated variant for maths, the placeholder for the rest. */
export function buildG11Exam(slug: string): G11Question[] {
  if (slug === 'matematika') return buildMathExam();
  if (slug === 'fizika') return buildPhysicsExam();
  if (slug === 'kimyo') return buildChemExam();
  if (slug === 'biologiya') return buildBioExam();
  if (slug === 'tarix') return buildHistExam();
  if (slug === 'ozbek-tili') return buildUzbExam();
  if (slug === 'rus-tili') return buildRusExam();
  if (slug === 'qoraqalpoq-tili') return buildKaaExam();
  if (slug === 'informatika') return buildInfExam();
  if (slug === 'geografiya') return buildGeoExam();
  return buildG11Diagnostic(slug);
}
export const g11ExamMinutes = (slug: string) => (slug === 'matematika' ? MATH_EXAM_MINUTES : slug === 'fizika' ? PHYS_EXAM_MINUTES : slug === 'kimyo' ? CHEM_EXAM_MINUTES : slug === 'biologiya' ? BIO_EXAM_MINUTES : slug === 'tarix' ? HIST_EXAM_MINUTES : slug === 'ozbek-tili' ? UZB_EXAM_MINUTES : slug === 'rus-tili' ? RUS_EXAM_MINUTES : slug === 'qoraqalpoq-tili' ? KAA_EXAM_MINUTES : slug === 'informatika' ? INF_EXAM_MINUTES : slug === 'geografiya' ? GEO_EXAM_MINUTES : G11_DIAG_MINUTES);

/** typed answer → number (accepts 1,5 · 1.5 · −2 · 3/4 · 33 1/3) */
function parseAns(s: string): number | null {
  const t = s.trim().replace(/[−–]/g, '-').replace(',', '.').replace(/\s+/g, ' ');
  const mixed = t.match(/^(-?\d+) (\d+)\/(\d+)$/);
  if (mixed) return Number(mixed[1]) + Math.sign(Number(mixed[1]) || 1) * (Number(mixed[2]) / Number(mixed[3]));
  const f = t.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (f) return Number(f[1]) / Number(f[2]);
  return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : null;
}
export function partCorrect(typed: string | undefined, answer: string): boolean {
  if (!typed) return false;
  const a = parseAns(typed);
  const b = parseAns(answer);
  if (a !== null && b !== null) return Math.abs(a - b) < 1e-6;
  // text answer: ignore case, apostrophe variants, punctuation; "A / B" lists alternatives;
  // a single long word of a multi-word answer (e.g. a surname) is also accepted
  const norm = (s: string) =>
    s.toLowerCase().replace(/[ʻʼ‘’`´']/g, "'").replace(/[«»"“”.,;:!?()-]/g, ' ').replace(/\s+/g, ' ').trim();
  const t = norm(typed);
  if (!t) return false;
  return answer.split(' / ').some((alt) => {
    const n = norm(alt);
    if (n === t || (n.includes(' ') && t.length >= 5 && n.split(' ').includes(t))) return true;
    // a one-word answer written with extra words or an ending: «olmosh» ← «kishilik olmoshi», «feʼl» ← «feʼl bilan»
    if (!n.includes(' ')) {
      return t.split(' ').some((w) => w === n || (n.length >= 4 && w.startsWith(n) && w.length <= n.length + 4));
    }
    return false;
  });
}
export const ESSAY_MAX = 10;
/** points of one question: 1 for a closed task, one per correct part for an open task */
export function questionPoints(q: G11Question, a: G11Answer): { got: number; max: number } {
  if (q.essay) {
    const v = Array.isArray(a) ? Number(a[1]) : 0;
    return { got: Number.isFinite(v) ? v : 0, max: ESSAY_MAX };
  }
  if (q.parts) {
    const typed = Array.isArray(a) ? a : [];
    return { got: q.parts.filter((p, i) => partCorrect(typed[i], p.answer)).length, max: q.parts.length };
  }
  return { got: a === q.answerIndex ? 1 : 0, max: 1 };
}
export const isAnswered = (a: G11Answer) => (Array.isArray(a) ? a.some((x) => x && x.trim()) : a !== null && a !== undefined);
export function g11Score(questions: G11Question[], answers: G11Answer[]) {
  let score = 0;
  let total = 0;
  questions.forEach((q, i) => {
    const p = questionPoints(q, answers[i] ?? null);
    score += p.got;
    total += p.max;
  });
  return { score, total };
}
/** rough Milliy sertifikat estimate (the real exam uses the Rasch model) */
export function certEstimate(score: number, total: number): { ball: number; level: string } {
  const ball = Math.round((score / Math.max(1, total)) * 75 * 10) / 10;
  const level = ball >= 70 ? 'A+' : ball >= 65 ? 'A' : ball >= 60 ? 'B+' : ball >= 55 ? 'B' : ball >= 50 ? 'C+' : ball >= 46 ? 'C' : '—';
  return { ball, level };
}

/** Placeholder question→lesson link: a stable pseudo-random pick among the
 *  lessons that have content (until real questions carry their own topic). */
function lessonFor(slug: string, i: number): number {
  let h = 2166136261;
  for (const ch of `${slug}:${i}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  // subjects with prepared lessons link only to those
  return (Math.abs(h) % (BOARD_LESSONS[slug]?.length || G11_FILLED_LESSONS)) + 1;
}

const EXPLAIN = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.'
];

/** 45 placeholder questions (stable text; the "correct" option is index i % 4). */
export function buildG11Diagnostic(slug: string): G11Question[] {
  return Array.from({ length: G11_DIAG_COUNT }, (_, i) => {
    const sentence = LOREM[i % LOREM.length];
    const choices = [0, 1, 2, 3].map((k) => {
      const a = WORDS[(i + k * 3) % WORDS.length];
      const b = WORDS[(i * 2 + k * 5 + 1) % WORDS.length];
      return same(`${a} ${b}`);
    });
    return {
      id: `g11-${slug}-diag-${i + 1}`,
      prompt: same(`${sentence}?`),
      choices,
      answerIndex: i % 4,
      reviewTopics: [],
      explanation: same(EXPLAIN[i % EXPLAIN.length]),
      lessonN: lessonFor(slug, i)
    };
  });
}
