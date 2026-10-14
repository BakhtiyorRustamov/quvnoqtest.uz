import type { L10n } from '@/lib/i18n-config';
import type { ExamQuestion } from '@/content/g1-math/exam';
import { G11_FILLED_LESSONS } from './lessons';

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
  /** the lesson (topic) that covers this question */
  lessonN: number;
};

/** Placeholder question→lesson link: a stable pseudo-random pick among the
 *  lessons that have content (until real questions carry their own topic). */
function lessonFor(slug: string, i: number): number {
  let h = 2166136261;
  for (const ch of `${slug}:${i}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (Math.abs(h) % G11_FILLED_LESSONS) + 1;
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
