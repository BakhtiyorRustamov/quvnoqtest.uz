import type { L10n } from '@/lib/i18n-config';
import type { ExamConfig, ExamQuestion } from '@/content/g1-math/exam';

/**
 * "Fikrlash qobiliyati mashqlari" — a 10-question, 20-minute practice test
 * modelled on the Presidential School "Fikrlash Qobiliyatini baholash"
 * assessment (critical thinking + problem solving), scaled down to grade 1.
 *
 * Question styles follow the official UCLES sample booklet (logic chains,
 * if–then reasoning, odd-one-out, patterns) but with grade-1 words, numbers
 * and pictures. Picture questions use fixed-answer SVG VARIANTS: the figure
 * and its answer travel together, and each attempt draws a random variant,
 * so the test still changes every time.
 *
 * SVG figures live in /public/exam/fikrlash/ (see the kid-exam-figures skill
 * for the drawing conventions used to produce them).
 */

export const G1_FIKR_EXAM_KEY = 'g1-fikr-exam';
export const FIKR_MINUTES = 20;
export const FIKR_COUNT = 10;

export const FIKR_TITLE: L10n = {
  uz: 'Fikrlash qobiliyati mashqlari',
  ru: 'Упражнения на мышление',
  en: 'Thinking skills practice'
};

/** Title of THIS test (test 1) — distinct from the subject name above. */
export const FIKR_TEST1_TITLE: L10n = {
  uz: 'Fikrlash qobiliyatini baholash 1-test',
  ru: 'Оценка мышления — тест 1',
  en: 'Thinking assessment — test 1'
};

export const FIKR_INTRO: L10n = {
  uz: 'Prezident maktablari kirish sinovida Fikrlash qobiliyati alohida baholanadi. Bu — haqiqiy imtihon EMAS, balki 1-sinf boʻyicha soddalashtirilgan mashq maydoni. 10 ta savol, 20 daqiqa vaqt beriladi. Savollar mantiq, qonuniyat va shakllar haqida. Har safar savollar oʻzgaradi — istagancha mashq qilishing mumkin.',
  ru: 'На вступительном экзамене Президентской школы отдельно оценивается мышление. Это НЕ настоящий экзамен, а тренировочная площадка, упрощённая до 1 класса. 10 вопросов, 20 минут. Вопросы — о логике, закономерностях и фигурах. Задания меняются каждый раз — практикуйся сколько хочешь.',
  en: 'The Presidential School entrance test assesses thinking skills separately. This is NOT the real exam — it is a practice area simplified to grade 1. 10 questions, 20 minutes, about logic, patterns and shapes. The questions change every time, so keep practising.'
};

/* ----------------------------- helpers ----------------------------- */
const R = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pickOne = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const N = (x: number | string): L10n => ({ uz: String(x), ru: String(x), en: String(x) });
const L = (uz: string, ru: string, en: string): L10n => ({ uz, ru, en });

function shuffle<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

function numOptions(answer: number, distractors: number[]): { choices: L10n[]; answerIndex: number } {
  const vals: number[] = [answer];
  for (const d of distractors) if (!vals.includes(d) && d >= 0) vals.push(d);
  let k = 1;
  while (vals.length < 4 && k < 60) {
    for (const cand of [answer + k, answer - k]) {
      if (vals.length < 4 && cand >= 0 && !vals.includes(cand)) vals.push(cand);
    }
    k++;
  }
  const picked = shuffle(vals.slice(0, 4));
  return { choices: picked.map(N), answerIndex: picked.indexOf(answer) };
}

function wordOptions(correct: L10n, wrong: L10n[]): { choices: L10n[]; answerIndex: number } {
  const opts = shuffle([{ v: correct, ok: true }, ...wrong.map((v) => ({ v, ok: false }))].slice(0, 4));
  return { choices: opts.map((o) => o.v), answerIndex: opts.findIndex((o) => o.ok) };
}

/** picture helper — the alt/prompt doubles as the AI-image brief fallback */
const img = (file: string, uz: string, ru: string, en: string) => ({
  src: `/exam/fikrlash/${file}`,
  prompt: L(uz, ru, en)
});

/* shape-name option sets */
const SHAPE = {
  circle: L('Doira', 'Круг', 'Circle'),
  square: L('Kvadrat', 'Квадрат', 'Square'),
  triangle: L('Uchburchak', 'Треугольник', 'Triangle'),
  star: L('Yulduzcha', 'Звёздочка', 'Star')
};

const KID_NAMES = ['Aziz', 'Bobur', 'Karim', 'Dilshod', 'Malika', 'Zara', 'Lola', 'Sardor'];
const pickNames = (n: number) => shuffle(KID_NAMES).slice(0, n);

/* --------------------------- question bank --------------------------- */
type Gen = () => ExamQuestion;

const GENERATORS: Gen[] = [
  // 1 — continue the shape pattern (SVG variants, answer = shape name)
  () => {
    const v = pickOne([
      { f: 'pattern-1.svg', ans: SHAPE.square, wrong: [SHAPE.circle, SHAPE.triangle, SHAPE.star] },
      { f: 'pattern-2.svg', ans: SHAPE.triangle, wrong: [SHAPE.circle, SHAPE.square, SHAPE.star] },
      { f: 'pattern-3.svg', ans: SHAPE.triangle, wrong: [SHAPE.circle, SHAPE.square, SHAPE.star] }
    ]);
    return {
      id: 'pattern',
      prompt: L(
        'Shakllar qonuniyat bilan joylashgan. «?» oʻrniga qaysi shakl keladi?',
        'Фигуры стоят по закономерности. Какая фигура должна быть вместо «?»',
        'The shapes follow a pattern. Which shape goes in place of the “?”'
      ),
      ...wordOptions(v.ans, v.wrong),
      reviewTopics: [],
      image: img(v.f, 'Shakllar qatori va soʻroq belgisi', 'Ряд фигур со знаком вопроса', 'A row of shapes with a question mark')
    };
  },
  // 2 — how many triangles in the figure (SVG variants)
  () => {
    const v = pickOne([
      { f: 'triangles-1.svg', ans: 3 },
      { f: 'triangles-2.svg', ans: 2 },
      { f: 'triangles-3.svg', ans: 2 }
    ]);
    return {
      id: 'counttri',
      prompt: L('Rasmda nechta uchburchak bor?', 'Сколько треугольников на рисунке?', 'How many triangles are in the picture?'),
      ...numOptions(v.ans, [v.ans + 1, v.ans - 1, v.ans + 2]),
      reviewTopics: [],
      image: img(v.f, 'Uchburchaklar yashiringan shakl', 'Фигура со скрытыми треугольниками', 'A figure with hidden triangles')
    };
  },
  // 3 — how many squares in the figure (SVG variants; 2×2 grid hides the big one)
  () => {
    const v = pickOne([
      { f: 'squares-1.svg', ans: 5 },
      { f: 'squares-2.svg', ans: 3 }
    ]);
    return {
      id: 'countsq',
      prompt: L('Rasmda nechta kvadrat bor?', 'Сколько квадратов на рисунке?', 'How many squares are in the picture?'),
      ...numOptions(v.ans, [v.ans - 1, v.ans + 1, v.ans - 2]),
      reviewTopics: [],
      image: img(v.f, 'Kvadratlar yashiringan shakl', 'Фигура со скрытыми квадратами', 'A figure with hidden squares')
    };
  },
  // 4 — odd one out (SVG variants, answer = shape name)
  () => {
    const v = pickOne([
      { f: 'odd-1.svg', ans: SHAPE.triangle, wrong: [SHAPE.circle, SHAPE.square, SHAPE.star] },
      { f: 'odd-2.svg', ans: SHAPE.circle, wrong: [SHAPE.square, SHAPE.triangle, SHAPE.star] },
      { f: 'odd-3.svg', ans: SHAPE.square, wrong: [SHAPE.triangle, SHAPE.circle, SHAPE.star] }
    ]);
    return {
      id: 'oddone',
      prompt: L('Qaysi shakl ortiqcha?', 'Какая фигура лишняя?', 'Which shape is the odd one out?'),
      ...wordOptions(v.ans, v.wrong),
      reviewTopics: [],
      image: img(v.f, 'Toʻrtta shakl, bittasi boshqacha', 'Четыре фигуры, одна отличается', 'Four shapes, one is different')
    };
  },
  // 5 — count a shape inside the house picture
  () => {
    const v = pickOne([
      { ans: 1, what: L('uchburchak', 'треугольников', 'triangles') },
      { ans: 2, what: L('doira', 'кругов', 'circles') },
      { ans: 2, what: L('toʻrtburchak', 'четырёхугольников', 'rectangles') }
    ]);
    return {
      id: 'house',
      prompt: L(
        `Rasmdagi uyda nechta ${v.what.uz} bor?`,
        `Сколько ${v.what.ru} в домике на рисунке?`,
        `How many ${v.what.en} are in the house picture?`
      ),
      ...numOptions(v.ans, [v.ans + 1, v.ans + 2, v.ans - 1]),
      reviewTopics: [],
      image: img('house.svg', 'Shakllardan yasalgan uy', 'Домик из фигур', 'A house built from shapes')
    };
  },
  // 6 — transitive comparison (taller / shorter)
  () => {
    const [a, b, c] = pickNames(3);
    const tallest = Math.random() < 0.5;
    return {
      id: 'taller',
      prompt: L(
        `${a} ${b}dan baland, ${b} esa ${c}dan baland. Kim eng ${tallest ? 'baland' : 'past'}?`,
        `${a} выше, чем ${b}, а ${b} выше, чем ${c}. Кто самый ${tallest ? 'высокий' : 'низкий'}?`,
        `${a} is taller than ${b}, and ${b} is taller than ${c}. Who is the ${tallest ? 'tallest' : 'shortest'}?`
      ),
      ...wordOptions(N(tallest ? a : c), [N(tallest ? c : a), N(b), L('Aniqlab boʻlmaydi', 'Нельзя определить', "Can't tell")]),
      reviewTopics: []
    };
  },
  // 7 — if–then reasoning (like the coach question, grade-1 size)
  () => {
    const [a, b] = pickNames(2);
    return {
      id: 'ifthen',
      prompt: L(
        `Murabbiy: «Agar ${a} oʻynamasa, ${b} oʻynaydi». ${a} bugun oʻynamadi. Kim oʻynaydi?`,
        `Тренер: «Если ${a} не играет, играет ${b}». Сегодня ${a} не играл. Кто играет?`,
        `The coach says: “If ${a} does not play, ${b} plays.” Today ${a} did not play. Who plays?`
      ),
      ...wordOptions(N(b), [N(a), L('Hech kim', 'Никто', 'Nobody'), L('Ikkalasi ham', 'Оба', 'Both')]),
      reviewTopics: []
    };
  },
  // 8 — continue the number pattern
  () => {
    const step = pickOne([2, 5, 10]);
    const start = step === 10 ? 10 : R(1, 6);
    const seq = [start, start + step, start + 2 * step, start + 3 * step];
    const next = start + 4 * step;
    return {
      id: 'numseq',
      prompt: L(
        `Qonuniyatni davom ettir: ${seq.join(', ')}, … Keyingi son qaysi?`,
        `Продолжи закономерность: ${seq.join(', ')}, … Какое число следующее?`,
        `Continue the pattern: ${seq.join(', ')}, … What number comes next?`
      ),
      ...numOptions(next, [next + step, next - step, next + 1]),
      reviewTopics: []
    };
  },
  // 9 — days of the week reasoning
  () => {
    const days = [
      L('dushanba', 'понедельник', 'Monday'),
      L('seshanba', 'вторник', 'Tuesday'),
      L('chorshanba', 'среда', 'Wednesday'),
      L('payshanba', 'четверг', 'Thursday'),
      L('juma', 'пятница', 'Friday'),
      L('shanba', 'суббота', 'Saturday'),
      L('yakshanba', 'воскресенье', 'Sunday')
    ];
    const i = R(0, 6);
    const tomorrow = Math.random() < 0.5;
    const ansIdx = (i + (tomorrow ? 1 : 6)) % 7;
    const wrong = [days[(ansIdx + 1) % 7], days[(ansIdx + 5) % 7], days[(ansIdx + 3) % 7]];
    return {
      id: 'weekday',
      prompt: L(
        `Bugun ${days[i].uz}. ${tomorrow ? 'Ertaga' : 'Kecha'} qaysi kun ${tomorrow ? 'boʻladi' : 'edi'}?`,
        `Сегодня ${days[i].ru}. Какой день ${tomorrow ? 'будет завтра' : 'был вчера'}?`,
        `Today is ${days[i].en}. What day ${tomorrow ? 'is tomorrow' : 'was yesterday'}?`
      ),
      ...wordOptions(days[ansIdx], wrong),
      reviewTopics: []
    };
  },
  // 10 — transitive weight (fruits)
  () => {
    const heaviest = Math.random() < 0.5;
    return {
      id: 'weight',
      prompt: L(
        `Tarvuz qovundan ogʻir, qovun esa olmadan ogʻir. Qaysi biri eng ${heaviest ? 'ogʻir' : 'yengil'}?`,
        `Арбуз тяжелее дыни, а дыня тяжелее яблока. Что самое ${heaviest ? 'тяжёлое' : 'лёгкое'}?`,
        `A watermelon is heavier than a melon, and a melon is heavier than an apple. Which is the ${heaviest ? 'heaviest' : 'lightest'}?`
      ),
      ...wordOptions(
        heaviest ? L('Tarvuz', 'Арбуз', 'Watermelon') : L('Olma', 'Яблоко', 'Apple'),
        [
          heaviest ? L('Olma', 'Яблоко', 'Apple') : L('Tarvuz', 'Арбуз', 'Watermelon'),
          L('Qovun', 'Дыня', 'Melon'),
          L('Aniqlab boʻlmaydi', 'Нельзя определить', "Can't tell")
        ]
      ),
      reviewTopics: []
    };
  }
];

/** Build a fresh, randomized 10-question thinking-skills test. */
export function buildG1FikrExam(): ExamQuestion[] {
  return shuffle(GENERATORS).map((gen, i) => {
    const q = gen();
    return { ...q, id: `q${i + 1}-${q.id}` };
  });
}

export const FIKR_EXAM_CONFIG: ExamConfig = {
  title: FIKR_TEST1_TITLE,
  intro: FIKR_INTRO,
  minutes: FIKR_MINUTES,
  count: FIKR_COUNT,
  build: buildG1FikrExam,
  logoSrc: '/prezident-logo.png',
  topicKey: G1_FIKR_EXAM_KEY
};
