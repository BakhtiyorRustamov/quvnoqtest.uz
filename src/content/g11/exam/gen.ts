import type { L10n } from '@/lib/i18n-config';
import type { G11Question } from '../diagnostic';

/** Shared helpers for the generated Milliy sertifikat tests (fizika, …). */
export const R = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = <T,>(a: readonly T[]): T => a[Math.floor(Math.random() * a.length)];
export function shuffle<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}
export const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const MINUS = '−';
/** number → text with decimal comma and real minus (rounded to 4 significant decimals) */
export function num(x: number): string {
  const r = Math.round(x * 10000) / 10000;
  return (r < 0 ? MINUS : '') + String(Math.abs(r)).replace('.', ',');
}
export function fr(n: number, d: number): string {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d) || 1;
  n /= g;
  d /= g;
  return d === 1 ? num(n) : `${n < 0 ? MINUS : ''}${Math.abs(n)}/${d}`;
}

export type Q = {
  text: string;
  choices?: string[];
  answer?: number;
  parts?: [string, string][];
  explain: string;
  lesson?: number;
  match?: boolean;
  fig?: string;
  /** essay task (checked by the AI) */
  essay?: boolean;
};
/** figure for the question being generated: templates set fig.cur, tryGen attaches it */
export const fig: { cur?: string } = {};

export function mc(text: string, correct: string, wrong: string[], explain: string, lesson = 0): Q {
  const w = Array.from(new Set(wrong.filter((x) => x !== correct)));
  if (w.length < 3) throw new Error('few distractors');
  const choices = shuffle([correct, ...shuffle(w).slice(0, 3)]);
  return { text, choices, answer: choices.indexOf(correct), explain, lesson };
}
/** numeric MCQ: wrong answers from common slips (×2, ÷2, ±10%, …) */
export function mcn(text: string, x: number, explain: string, lesson = 0, extra: number[] = []): Q {
  const cands = [...extra, x * 2, x / 2, x * 1.5, x + Math.max(1, Math.abs(x) * 0.2), x - Math.max(1, Math.abs(x) * 0.2), x * 4, x / 4, x * 3]
    .filter((v) => (v > 0 || x <= 0) && Math.abs(v * 100 - Math.round(v * 100)) < 1e-9)
    .map(num);
  return mc(text, num(x), cands, explain, lesson);
}
export const open = (text: string, a: [string, string | number], b: [string, string | number], explain: string, lesson = 0): Q => ({
  text,
  parts: [
    [a[0], typeof a[1] === 'number' ? num(a[1]) : a[1]],
    [b[0], typeof b[1] === 'number' ? num(b[1]) : b[1]]
  ],
  explain,
  lesson
});

/** open task with any number of parts (1 = short answer, 3–4 = written task) */
export const openN = (text: string, parts: [string, string | number][], explain: string, lesson = 0): Q => ({
  text,
  parts: parts.map(([p, a]) => [p, typeof a === 'number' ? num(a) : a] as [string, string]),
  explain,
  lesson
});

export function tryGen(gen: () => Q): Q {
  for (let i = 0; i < 40; i++) {
    try {
      fig.cur = undefined;
      const q = gen();
      if (fig.cur) q.fig = fig.cur;
      fig.cur = undefined;
      return q;
    } catch {
      /* rejected parameters — draw again */
    }
  }
  throw new Error('generator failed');
}
export const fromPool = (pool: (() => Q)[]) => tryGen(() => pick(pool)());
export function tryBlock(gen: () => Q[]): Q[] {
  for (let i = 0; i < 40; i++) {
    try {
      fig.cur = undefined;
      return gen();
    } catch {
      /* again */
    }
  }
  throw new Error('block failed');
}

const tidy = (t: string) => t.replace(/(^|[\s(=;:,[])-(\d)/g, '$1−$2').replace(/(\d)\.(\d)/g, '$1,$2');
const same = (s: string): L10n => {
  const v = tidy(s);
  return { uz: v, ru: v, en: v };
};
export function toQuestions(list: Q[], prefix: string): G11Question[] {
  const stamp = Date.now().toString(36);
  return list.map((q, i) => ({
    id: `${prefix}-${stamp}-${i + 1}`,
    prompt: same(q.text),
    choices: (q.choices ?? []).map(same),
    answerIndex: q.answer ?? -1,
    reviewTopics: [],
    explanation: same(q.explain),
    lessonN: q.lesson ?? 0,
    ...(q.parts ? { parts: q.parts.map(([p, a], k) => ({ label: String.fromCharCode(97 + k), prompt: same(p), answer: a })) } : {}),
    ...(q.match ? { match: true } : {}),
    ...(q.fig ? { figure: q.fig } : {}),
    ...(q.essay ? { essay: true } : {})
  }));
}
/** shared-stem matching block: 3 questions, 6 options (3 answers + 3 distractors) */
export function matchBlock(stem: string, header: string, asks: [string, string, string][], extra: string[], lesson = 0): Q[] {
  const answers = asks.map((a) => a[1]);
  const pool = Array.from(new Set(extra.filter((e) => !answers.includes(e))));
  if (new Set(answers).size < 3 || pool.length < 3) throw new Error('match');
  const choices = shuffle([...answers, ...shuffle(pool).slice(0, 3)]);
  return asks.map(([q, a, e]) => ({ text: `${header} ${stem}\n\n${q}`, choices, answer: choices.indexOf(a), explain: e, match: true, lesson, fig: fig.cur }));
}
