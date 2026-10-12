import type { L10n } from '@/lib/i18n-config';
import type { ExamQuestion } from '@/content/g1-math/exam';

/**
 * Grade 11 "Sinov testi" — DUMMY content (Lorem Ipsum) so the flow can be
 * reviewed before real questions are written. Same shape as the grade-1 exams.
 */
export const G11_DIAG_COUNT = 45;
export const G11_DIAG_MINUTES = 60;

export const G11_DIAG_TITLE: L10n = { uz: 'Sinov testi', ru: 'Пробный тест', en: 'Practice test' };

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

/** 45 placeholder questions (stable text; the "correct" option is index i % 4). */
export function buildG11Diagnostic(slug: string): ExamQuestion[] {
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
      reviewTopics: []
    };
  });
}
