import type { L10n } from '@/lib/i18n-config';
import type { ExamConfig, ExamQuestion } from '@/content/g1-math/exam';

/**
 * "Fikrlash qobiliyatini baholash — 3-test" — a THIRD grade-1 thinking-skills
 * practice test. It mixes two things test 1 and 2 did not combine:
 *   • DRAWN figure questions — hand-made SVG variants in /public/exam/fikrlash/
 *     (t3-*.svg): visual analogies (big→small), odd-colour-out, count the wheels,
 *     and a balance where the lower pan is heavier. Each has a fixed answer that
 *     travels with the picture (the generator picks a random variant).
 *   • GENERATIVE value questions — the NUMBERS are randomized on every attempt
 *     and the answer is computed from them, so the test truly changes each time.
 *     These stay reasoning items (compare, order, parity, pattern, "between") —
 *     not arithmetic drills (that's what the Matematika subject is for).
 */

export const G1_FIKR3_EXAM_KEY = 'g1-fikr-exam-3';
export const FIKR3_MINUTES = 20;
export const FIKR3_COUNT = 10;

export const FIKR3_TITLE: L10n = {
  uz: 'Fikrlash qobiliyatini baholash 3-test',
  ru: 'Оценка мышления — тест 3',
  en: 'Thinking assessment — test 3'
};

export const FIKR3_INTRO: L10n = {
  uz: 'Uchinchi mashq testi. Bu yerda rasmli mantiq savollari (oʻxshatishlar, ortiqcha rang, tarozi, sanash) va sonli mantiq savollari birga keladi. Sonlar har safar oʻzgaradi, shuning uchun test har doim yangi boʻladi. 10 ta savol, 20 daqiqa.',
  ru: 'Третий тренировочный тест. Здесь вместе идут вопросы с картинками (аналогии, лишний цвет, весы, счёт) и числовые логические вопросы. Числа меняются каждый раз, поэтому тест всегда новый. 10 вопросов, 20 минут.',
  en: 'A third practice test. It combines picture-logic questions (analogies, odd colour, a balance, counting) with number-logic questions. The numbers change every time, so the test is always new. 10 questions, 20 minutes.'
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

/** 4 numeric options: correct + distractors, padded to 4 unique non-negatives. */
function numOptions(answer: number, distractors: number[]): { choices: L10n[]; answerIndex: number } {
  const vals: number[] = [answer];
  for (const d of distractors) if (!vals.includes(d) && d >= 0) vals.push(d);
  let k = 1;
  while (vals.length < 4 && k < 60) {
    for (const cand of [answer + k, answer - k]) if (vals.length < 4 && cand >= 0 && !vals.includes(cand)) vals.push(cand);
    k++;
  }
  const picked = shuffle(vals.slice(0, 4));
  return { choices: picked.map(N), answerIndex: picked.indexOf(answer) };
}

/** 4 word options from a correct L10n + up to 3 wrong. */
function wordOptions(correct: L10n, wrong: L10n[]): { choices: L10n[]; answerIndex: number } {
  const opts = shuffle([{ v: correct, ok: true }, ...wrong.slice(0, 3).map((v) => ({ v, ok: false }))]);
  return { choices: opts.map((o) => o.v), answerIndex: opts.findIndex((o) => o.ok) };
}

const img = (file: string, uz: string, ru: string, en: string) => ({ src: `/exam/fikrlash/${file}`, prompt: L(uz, ru, en) });

const SHAPE = {
  circle: L('Doira', 'Круг', 'Circle'),
  square: L('Kvadrat', 'Квадрат', 'Square'),
  triangle: L('Uchburchak', 'Треугольник', 'Triangle'),
  star: L('Yulduzcha', 'Звёздочка', 'Star')
};
const COLOR = {
  blue: L('Koʻk', 'Синий', 'Blue'),
  red: L('Qizil', 'Красный', 'Red'),
  green: L('Yashil', 'Зелёный', 'Green'),
  yellow: L('Sariq', 'Жёлтый', 'Yellow'),
  orange: L('Olovrang', 'Оранжевый', 'Orange')
};
const CANT = L('Aniqlab boʻlmaydi', 'Нельзя определить', "Can't tell");
const KID = ['Aziz', 'Bobur', 'Karim', 'Dilshod', 'Sardor', 'Jasur', 'Malika', 'Nodira', 'Lola', 'Zarina'];
const pickKids = (n: number) => shuffle(KID).slice(0, n);

/* --------------------------- question bank --------------------------- */
type Gen = () => ExamQuestion;

const GENERATORS: Gen[] = [
  // 1 — DRAWN visual analogy: big → small; answer is the bottom shape (small)
  () => {
    const v = pickOne([
      { f: 't3-analogy-1.svg', ans: SHAPE.square, wrong: [SHAPE.circle, SHAPE.triangle, SHAPE.star] },
      { f: 't3-analogy-2.svg', ans: SHAPE.triangle, wrong: [SHAPE.circle, SHAPE.square, SHAPE.star] },
      { f: 't3-analogy-3.svg', ans: SHAPE.circle, wrong: [SHAPE.square, SHAPE.triangle, SHAPE.star] }
    ]);
    return {
      id: 'analogy',
      prompt: L(
        'Yuqoridagi juftlik qoidasiga koʻra, «?» oʻrniga qaysi shakl mos keladi?',
        'По правилу верхней пары, какая фигура подходит вместо «?»',
        'Following the rule of the top pair, which shape fits in place of “?”'
      ),
      ...wordOptions(v.ans, v.wrong),
      reviewTopics: [],
      image: img(v.f, 'Ikki juft shakl: kattadan kichikka', 'Две пары фигур: от большой к маленькой', 'Two pairs of shapes: big to small')
    };
  },
  // 2 — DRAWN odd colour out
  () => {
    const v = pickOne([
      { f: 't3-oddcolor-1.svg', ans: COLOR.red, wrong: [COLOR.blue, COLOR.green, COLOR.yellow] },
      { f: 't3-oddcolor-2.svg', ans: COLOR.yellow, wrong: [COLOR.green, COLOR.blue, COLOR.red] },
      { f: 't3-oddcolor-3.svg', ans: COLOR.blue, wrong: [COLOR.orange, COLOR.green, COLOR.red] }
    ]);
    return {
      id: 'oddcolor',
      prompt: L('Qaysi doiraning rangi boshqalardan farq qiladi?', 'Какой круг отличается по цвету?', 'Which circle is a different colour?'),
      ...wordOptions(v.ans, v.wrong),
      reviewTopics: [],
      image: img(v.f, 'Toʻrtta doira, bittasi boshqa rangda', 'Четыре круга, один другого цвета', 'Four circles, one a different colour')
    };
  },
  // 3 — DRAWN count the wheels on the train
  () => {
    const v = pickOne([
      { f: 't3-train-1.svg', ans: 6 },
      { f: 't3-train-2.svg', ans: 4 }
    ]);
    return {
      id: 'wheels',
      prompt: L('Poyezdda jami nechta gʻildirak (doira) bor?', 'Сколько всего колёс (кругов) у поезда?', 'How many wheels (circles) does the train have in total?'),
      ...numOptions(v.ans, [v.ans + 1, v.ans - 1, v.ans + 2]),
      reviewTopics: [],
      image: img(v.f, 'Kvadrat vagonlar va doira gʻildiraklardan poyezd', 'Поезд из квадратных вагонов и круглых колёс', 'A train of square cars and round wheels')
    };
  },
  // 4 — DRAWN balance: the lower pan is heavier
  () => {
    const v = pickOne([
      { f: 't3-balance-1.svg', ans: COLOR.blue, other: COLOR.red },
      { f: 't3-balance-2.svg', ans: COLOR.red, other: COLOR.blue }
    ]);
    return {
      id: 'balance',
      prompt: L(
        'Tarozida qaysi shar ogʻirroq? (Pastga bosgan tomon ogʻirroq.)',
        'Какой шар тяжелее на весах? (Тяжелее тот, что опустился.)',
        'Which ball is heavier on the balance? (The lower pan is heavier.)'
      ),
      ...wordOptions(v.ans, [v.other, L('Teng', 'Одинаково', 'Equal'), CANT]),
      reviewTopics: [],
      image: img(v.f, 'Ikki sharli tarozi, bir tomoni pastga bosgan', 'Весы с двумя шарами, одна сторона ниже', 'A balance with two balls, one side lower')
    };
  },
  // 5 — GENERATIVE: oldest / youngest of three (values change)
  () => {
    const [a, b, c] = pickKids(3);
    const ages = shuffle([R(6, 8), R(9, 10), R(11, 12)]);
    const trio = [{ n: a, v: ages[0] }, { n: b, v: ages[1] }, { n: c, v: ages[2] }];
    const oldest = Math.random() < 0.5;
    const target = trio.reduce((p, x) => (oldest ? x.v > p.v : x.v < p.v) ? x : p);
    const others = trio.filter((x) => x.n !== target.n);
    return {
      id: 'oldest',
      prompt: L(
        `${a} ${trio[0].v} yosh, ${b} ${trio[1].v} yosh, ${c} ${trio[2].v} yosh. Kim eng ${oldest ? 'katta' : 'kichik'}?`,
        `${a} ${trio[0].v} лет, ${b} ${trio[1].v} лет, ${c} ${trio[2].v} лет. Кто ${oldest ? 'старший' : 'младший'}?`,
        `${a} is ${trio[0].v}, ${b} is ${trio[1].v}, ${c} is ${trio[2].v}. Who is the ${oldest ? 'oldest' : 'youngest'}?`
      ),
      ...wordOptions(N(target.n), [N(others[0].n), N(others[1].n), CANT]),
      reviewTopics: []
    };
  },
  // 6 — GENERATIVE: who has more / fewer
  () => {
    const [a, b] = pickKids(2);
    let x = R(3, 15), y = R(3, 15);
    while (x === y) y = R(3, 15);
    const more = Math.random() < 0.5;
    const ans = (more ? x > y : x < y) ? a : b;
    const item = pickOne([L('yongʻoq', 'орехов', 'nuts'), L('stiker', 'наклеек', 'stickers'), L('olma', 'яблок', 'apples'), L('qalam', 'карандашей', 'pencils')]);
    return {
      id: 'more',
      prompt: L(
        `${a}da ${x} ta ${item.uz}, ${b}da ${y} ta ${item.uz} bor. Kimda ${more ? 'koʻp' : 'kam'}?`,
        `У ${a} ${x} ${item.ru}, у ${b} ${y} ${item.ru}. У кого ${more ? 'больше' : 'меньше'}?`,
        `${a} has ${x} ${item.en}, ${b} has ${y} ${item.en}. Who has ${more ? 'more' : 'fewer'}?`
      ),
      ...wordOptions(N(ans), [N(ans === a ? b : a), L('Teng', 'Поровну', 'Equal'), CANT]),
      reviewTopics: []
    };
  },
  // 7 — GENERATIVE: which is cheaper / pricier
  () => {
    const items = shuffle([L('Olma', 'Яблоко', 'An apple'), L('Muzqaymoq', 'Мороженое', 'Ice cream'), L('Non', 'Хлеб', 'Bread'), L('Qalam', 'Карандаш', 'A pencil')]);
    const [i1, i2] = items;
    let p1 = R(2, 9) * 100, p2 = R(2, 9) * 100;
    while (p1 === p2) p2 = R(2, 9) * 100;
    const cheaper = Math.random() < 0.5;
    const ans = (cheaper ? p1 < p2 : p1 > p2) ? i1 : i2;
    return {
      id: 'price',
      prompt: L(
        `${i1.uz} ${p1} soʻm, ${i2.uz} ${p2} soʻm. Qaysi biri ${cheaper ? 'arzon' : 'qimmat'}?`,
        `${i1.ru} ${p1} сум, ${i2.ru} ${p2} сум. Что ${cheaper ? 'дешевле' : 'дороже'}?`,
        `${i1.en} costs ${p1}, ${i2.en} costs ${p2}. Which is ${cheaper ? 'cheaper' : 'more expensive'}?`
      ),
      ...wordOptions(ans, [ans === i1 ? i2 : i1, L('Bir xil', 'Одинаково', 'The same'), CANT]),
      reviewTopics: []
    };
  },
  // 8 — GENERATIVE: can N be shared equally between 2 kids? (parity reasoning)
  () => {
    const n = R(4, 14);
    const even = n % 2 === 0;
    const thing = pickOne([L('olma', 'яблок', 'apples'), L('shakolad', 'конфет', 'sweets'), L('yongʻoq', 'орехов', 'nuts')]);
    return {
      id: 'parity',
      prompt: L(
        `Savatda ${n} ta ${thing.uz} bor. Ularni 2 bolaga teng boʻlish mumkinmi?`,
        `В корзине ${n} ${thing.ru}. Можно ли разделить их поровну между 2 детьми?`,
        `A basket has ${n} ${thing.en}. Can they be shared equally between 2 children?`
      ),
      ...wordOptions(
        even ? L('Ha, teng boʻlinadi', 'Да, поровну', 'Yes, equally')
             : L('Yoʻq, teng boʻlinmaydi', 'Нет, не поровну', 'No, not equally'),
        [
          even ? L('Yoʻq, teng boʻlinmaydi', 'Нет, не поровну', 'No, not equally')
               : L('Ha, teng boʻlinadi', 'Да, поровну', 'Yes, equally'),
          L('Faqat bitta bolaga', 'Только одному', 'Only to one'),
          CANT
        ]
      ),
      reviewTopics: []
    };
  },
  // 9 — GENERATIVE: continue / fill the number pattern
  () => {
    const step = pickOne([2, 3, 5, 10]);
    const start = step === 10 ? R(1, 5) * 10 : R(1, 6);
    const seq = [start, start + step, start + 2 * step, start + 3 * step];
    const hideAt = pickOne([1, 2]); // hide the 2nd or 3rd term
    const answer = seq[hideAt];
    const shown = seq.map((x, i) => (i === hideAt ? '?' : String(x)));
    return {
      id: 'numpat',
      prompt: L(
        `Qonuniyatni top: ${shown.join(', ')}. «?» oʻrniga qaysi son keladi?`,
        `Найди закономерность: ${shown.join(', ')}. Какое число вместо «?»`,
        `Find the pattern: ${shown.join(', ')}. Which number goes in place of “?”`
      ),
      ...numOptions(answer, [answer + step, answer - step, answer + 1]),
      reviewTopics: []
    };
  },
  // 10 — GENERATIVE: odd-parity-out (two even + one odd, or vice-versa)
  () => {
    const oddIsAnswer = Math.random() < 0.5; // the different-parity number is the answer
    const pool = new Set<number>();
    // two of one parity + one of the other
    const majEven = Math.random() < 0.5;
    while (pool.size < 2) {
      const v = majEven ? R(1, 9) * 2 : R(1, 9) * 2 - 1;
      pool.add(v);
    }
    let diff = majEven ? R(1, 9) * 2 - 1 : R(1, 9) * 2;
    while (pool.has(diff)) diff = majEven ? R(1, 9) * 2 - 1 : R(1, 9) * 2;
    const majority = [...pool];
    const nums = shuffle([...majority, diff]);
    void oddIsAnswer;
    return {
      id: 'parityout',
      prompt: L(
        `Qaysi son boshqalardan farq qiladi (juft yoki toqligi boʻyicha)? ${nums.join(', ')}`,
        `Какое число отличается (по чётности)? ${nums.join(', ')}`,
        `Which number is different (by even/odd)? ${nums.join(', ')}`
      ),
      ...wordOptions(N(diff), [N(majority[0]), N(majority[1]), CANT]),
      reviewTopics: []
    };
  },
  // 11 — GENERATIVE: which value is BETWEEN the other two
  () => {
    const set = new Set<number>();
    while (set.size < 3) set.add(R(1, 20));
    const arr = [...set].sort((a, b) => a - b);
    const [lo, mid, hi] = arr;
    return {
      id: 'between',
      prompt: L(
        `Qaysi son qiymati boʻyicha oʻrtada turadi? ${shuffle(arr).join(', ')}`,
        `Какое число стоит посередине по величине? ${shuffle(arr).join(', ')}`,
        `Which number is in the middle by value? ${shuffle(arr).join(', ')}`
      ),
      ...wordOptions(N(mid), [N(lo), N(hi), CANT]),
      reviewTopics: []
    };
  }
];

/** Build a fresh test: a random subset of the bank, shuffled, options reshuffled. */
export function buildG1Fikr3Exam(): ExamQuestion[] {
  return shuffle(GENERATORS)
    .slice(0, FIKR3_COUNT)
    .map((gen, i) => {
      const q = gen();
      return { ...q, id: `q${i + 1}-${q.id}` };
    });
}

export const FIKR3_EXAM_CONFIG: ExamConfig = {
  title: FIKR3_TITLE,
  intro: FIKR3_INTRO,
  minutes: FIKR3_MINUTES,
  count: FIKR3_COUNT,
  build: buildG1Fikr3Exam,
  logoSrc: '/prezident-logo.png',
  topicKey: G1_FIKR3_EXAM_KEY
};
