import type { L10n } from '@/lib/i18n-config';
import { BOARD_LESSONS, getBoardLesson } from './board';
import { INF_PLAN } from './board/inf-plan';

/**
 * Grade 11 lessons — DUMMY placeholders. Every subject has 50 lessons; only the
 * first G11_FILLED_LESSONS have (Lorem Ipsum) content, the rest are titles only.
 */
export const G11_LESSON_COUNT = 50;
export const G11_FILLED_LESSONS = 5;

const TITLES = [
  'Lorem ipsum dolor sit amet',
  'Consectetur adipiscing elit',
  'Sed do eiusmod tempor',
  'Incididunt ut labore et dolore',
  'Magna aliqua ut enim',
  'Ad minim veniam',
  'Quis nostrud exercitation',
  'Ullamco laboris nisi',
  'Aliquip ex ea commodo',
  'Duis aute irure dolor'
];

const same = (s: string): L10n => ({ uz: s, ru: s, en: s });

export type G11Lesson = {
  /** id used in the URL */
  n: number;
  /** number shown to students (textbook topic numbers, e.g. "7–8"); defaults to n */
  label?: string;
  /** textbook part: "Algebra" / "Geometriya" headings (matematika); for a textbook shared by two grades (Informatika), the grade */
  part?: 'algebra' | 'geometriya' | 10 | 11;
  /** textbook volume (1 or 2) */
  qism?: 1 | 2;
  /** chapter group heading (fizika), replaces the qism/part heading */
  group?: { kicker: string; title: string };
  title: L10n;
  /** paragraphs; empty = title-only placeholder */
  body: { heading?: L10n; text: L10n }[];
  /** short check-yourself quiz at the end of the lesson */
  quiz: G11LessonQuiz[];
  /** a prepared board lesson exists for this subject + lesson (see ./board) */
  board?: boolean;
};

export type G11LessonQuiz = { prompt: L10n; choices: L10n[]; answerIndex: number; explanation: L10n };

const LOREM_QUIZ: G11LessonQuiz[] = [
  {
    prompt: same('Lorem ipsum dolor sit amet, consectetur adipiscing elit?'),
    choices: [same('Lorem ipsum'), same('Dolor sit'), same('Amet consectetur'), same('Adipiscing elit')],
    answerIndex: 1,
    explanation: same('Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  },
  {
    prompt: same('Ut enim ad minim veniam, quis nostrud exercitation?'),
    choices: [same('Ullamco laboris'), same('Nisi ut aliquip'), same('Ex ea commodo'), same('Consequat duis')],
    answerIndex: 2,
    explanation: same('Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.')
  },
  {
    prompt: same('Excepteur sint occaecat cupidatat non proident?'),
    choices: [same('Sunt in culpa'), same('Qui officia'), same('Deserunt mollit'), same('Anim id est')],
    answerIndex: 0,
    explanation: same('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.')
  },
  {
    prompt: same('Nemo enim ipsam voluptatem quia voluptas sit aspernatur?'),
    choices: [same('Aut odit'), same('Aut fugit'), same('Sed quia'), same('Consequuntur magni')],
    answerIndex: 3,
    explanation: same('Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.')
  }
];

const LOREM_BODY: G11Lesson['body'] = [
  {
    text: same(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    )
  },
  {
    heading: same('Lorem ipsum dolor'),
    text: same(
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    )
  },
  {
    heading: same('Sed ut perspiciatis'),
    text: same(
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    )
  },
  {
    heading: same('Nemo enim ipsam'),
    text: same(
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.'
    )
  }
];

export const G11_LESSONS: G11Lesson[] = Array.from({ length: G11_LESSON_COUNT }, (_, i) => ({
  n: i + 1,
  title: same(TITLES[i % TITLES.length]),
  body: i < G11_FILLED_LESSONS ? LOREM_BODY : [],
  quiz: i < G11_FILLED_LESSONS ? LOREM_QUIZ : []
}));

/** The lesson list of one subject: prepared board lessons replace the placeholders. */
export function g11LessonsFor(slug: string): G11Lesson[] {
  const real = BOARD_LESSONS[slug] ?? [];
  if (slug === 'informatika') {
    // planned list of the two-grade textbook; written lessons become links
    return INF_PLAN.map((p) => {
      const b = real.find((r) => r.n === p.n);
      return { n: p.n, label: b?.label, title: same(b?.title ?? p.title), body: [], quiz: [], board: !!b, part: p.part };
    });
  }
  if (!real.length) return G11_LESSONS;
  // prepared subjects: exactly the prepared lessons, in textbook order
  return real.map((b) => ({ n: b.n, label: b.label, part: b.part, qism: b.qism ?? 1, group: b.group, title: same(b.title), body: [], quiz: [], board: true }));
}

export function getG11Lesson(n: number, slug?: string): G11Lesson | undefined {
  return (slug ? g11LessonsFor(slug) : G11_LESSONS).find((l) => l.n === n);
}

/** The number students see for a lesson. */
export const g11LessonLabel = (l: Pick<G11Lesson, 'n' | 'label'>) => l.label ?? String(l.n);

export const hasG11Content = (l: G11Lesson) => l.body.length > 0 || !!l.board;
export { getBoardLesson };

export const g11LessonHref = (slug: string, n: number) => `/lesson/g11/${slug}/${n}`;
