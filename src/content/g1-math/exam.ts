import type { L10n } from '@/lib/i18n-config';

/**
 * "Prezident maktabiga tayyorgarlik" — a 30-question, 60-minute practice exam
 * modelled on the Presidential School entrance test (which spans grades 1–4).
 * This bank ONLY uses grade-1 (topics 1–144) material. Every question is
 * regenerated with fresh random values on each attempt, so a child can keep
 * practising. Each question carries `reviewTopics` (topic numbers) so the
 * results screen can recommend exactly which lessons to revise.
 *
 * A question with an `imagePrompt` renders a labelled placeholder in the UI
 * (an AI-image brief) that can later be swapped for a real picture — the
 * question text is always self-contained so it stays answerable meanwhile.
 */

export const G1_MATH_EXAM_KEY = 'g1-math-exam';
export const EXAM_MINUTES = 60;
export const EXAM_COUNT = 30;

export const EXAM_TITLE: L10n = {
  uz: 'Prezident maktabiga tayyorgarlik',
  ru: 'Подготовка к Президентской школе',
  en: 'Presidential School preparation'
};

export const EXAM_INTRO: L10n = {
  uz: 'Haqiqiy Prezident maktabi kirish imtihoni 1–4-sinf mavzularini qamrab oladi. Bu — haqiqiy imtihon EMAS, balki faqat 1-sinf matematika mavzulari asosidagi tayyorgarlik testi. 30 ta savol, 60 daqiqa vaqt beriladi. Har safar sonlar oʻzgaradi — istagancha mashq qilishing mumkin. Test soʻngida qaysi darslarni takrorlash kerakligi tavsiya qilinadi.',
  ru: 'Настоящий вступительный экзамен Президентской школы охватывает темы 1–4 классов. Это НЕ настоящий экзамен, а лишь тренировочный тест по темам математики 1 класса. 30 вопросов, 60 минут. Числа меняются каждый раз — практикуйся сколько хочешь. В конце теста будет рекомендовано, какие уроки повторить.',
  en: 'The real Presidential School entrance exam covers grades 1–4. This is NOT the real exam — it is a practice test built only from grade-1 maths topics. 30 questions, 60 minutes. The numbers change every time, so you can keep practising. At the end it recommends which lessons to review.'
};

export type ExamQuestion = {
  id: string;
  prompt: L10n;
  choices: L10n[];
  answerIndex: number;
  reviewTopics: number[];
  /** Optional STANDARD illustration (value-independent, so one file serves every
   *  attempt). Numbers live only in the question text, never in the image. */
  image?: ExamImage;
};

export type ExamImage = { src: string; prompt: L10n };

/* ----------------------------- helpers ----------------------------- */
const R = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pickOne = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const N = (x: number | string): L10n => ({ uz: String(x), ru: String(x), en: String(x) });

function shuffle<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

/** Build 4 numeric options from a correct answer + distractors, padding to 4
 *  unique, non-negative values, then shuffling. Returns choices + answerIndex. */
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

/** Build 4 word options (L10n) from a correct choice + wrong choices. */
function wordOptions(correct: L10n, wrong: L10n[]): { choices: L10n[]; answerIndex: number } {
  const opts = shuffle([{ v: correct, ok: true }, ...wrong.map((v) => ({ v, ok: false }))].slice(0, 4));
  return { choices: opts.map((o) => o.v), answerIndex: opts.findIndex((o) => o.ok) };
}

const L = (uz: string, ru: string, en: string): L10n => ({ uz, ru, en });

/**
 * The complete set of STANDARD exam illustrations. Each is value-independent —
 * the numbers only ever appear in the question text — so you create just these
 * four pictures and they work for every randomized attempt.
 *
 * Drop the finished files at the `src` paths below (i.e. in `public/exam/`).
 * Until a file exists, the UI shows the prompt as a dashed placeholder.
 * The same list is written to `public/exam/IMAGE_PROMPTS.md` for reference.
 */
export const EXAM_IMAGES: Record<string, ExamImage> = {
  polygons: {
    src: '/exam/polygons.png',
    prompt: L(
      'Toʻrtta koʻpburchak yonma-yon: uchburchak (3 tomon), toʻrtburchak (4 tomon), beshburchak (5 tomon), oltiburchak (6 tomon). Har biri belgilangan, sodda rangli bolalar darsligi uslubida, oq fon.',
      'Четыре многоугольника в ряд: треугольник (3 стороны), четырёхугольник (4), пятиугольник (5), шестиугольник (6). Каждый подписан, простой цветной детский учебный стиль, белый фон.',
      'Four polygons in a row: triangle (3 sides), quadrilateral (4), pentagon (5), hexagon (6). Each labelled, simple colourful kids-textbook style, white background.'
    )
  },
  square: {
    src: '/exam/square.png',
    prompt: L(
      'Bitta kvadrat, har bir tomoni "a sm" deb belgilangan (raqamsiz), sodda darslik uslubida, oq fon.',
      'Один квадрат, каждая сторона подписана «a см» (без числа), простой учебный стиль, белый фон.',
      'A single square with each side labelled "a cm" (no number), simple textbook style, white background.'
    )
  },
  solids: {
    src: '/exam/solids.png',
    prompt: L(
      'Toʻrtta hajmli shakl yonma-yon: shar, kub, piramida, silindr. Har biri belgilangan, sodda hajmli koʻrinish, bolalar uslubida, oq fon.',
      'Четыре объёмные фигуры в ряд: шар, куб, пирамида, цилиндр. Каждая подписана, простой объёмный вид, детский стиль, белый фон.',
      'Four 3D shapes in a row: sphere, cube, pyramid, cylinder. Each labelled, simple solid look, kids style, white background.'
    )
  },
  brokenLine: {
    src: '/exam/broken-line.png',
    prompt: L(
      'Uch boʻlakli siniq (zigzag) chiziq, boʻlaklari a, b, d harflari bilan belgilangan (raqamsiz), sodda darslik uslubida, oq fon.',
      'Ломаная (зигзаг) из трёх звеньев, звенья подписаны буквами a, b, d (без чисел), простой учебный стиль, белый фон.',
      'A 3-segment broken (zig-zag) line with parts labelled a, b, d (letters, no numbers), simple textbook style, white background.'
    )
  }
};

/* --------------------------- question bank --------------------------- */
/** Each generator returns one fully-formed, randomized question. */
type Gen = () => ExamQuestion;

const GENERATORS: Gen[] = [
  // 1 — count the icons (emoji stands in for a picture)
  () => {
    const e = pickOne(['🍎', '⭐', '🐟', '🎈', '🌸', '🚗']);
    const n = R(4, 9);
    return {
      id: 'count',
      prompt: L(`${e.repeat(n)}\nNechta belgi bor?`, `${e.repeat(n)}\nСколько значков?`, `${e.repeat(n)}\nHow many icons?`),
      ...numOptions(n, [n + 1, n - 1, n + 2]),
      reviewTopics: [4, 9, 26]
    };
  },
  // 2 — next neighbour of a number
  () => {
    const n = R(11, 89);
    return {
      id: 'neighbor',
      prompt: L(`${n} sonining keyingi qoʻshnisi qaysi?`, `Какой сосед числа ${n} справа?`, `What is the next neighbour of ${n}?`),
      ...numOptions(n + 1, [n - 1, n + 2, n]),
      reviewTopics: [10]
    };
  },
  // 3 — comparison sign
  () => {
    const a = R(10, 98), b = R(10, 98);
    const correct = a > b ? '>' : a < b ? '<' : '=';
    const wrong = ['>', '<', '=', '≠'].filter((s) => s !== correct).slice(0, 3);
    return {
      id: 'compare',
      prompt: L(`Qaysi belgi toʻgʻri? ${a} ▢ ${b}`, `Какой знак верный? ${a} ▢ ${b}`, `Which sign is correct? ${a} ▢ ${b}`),
      ...wordOptions(N(correct), wrong.map(N)),
      reviewTopics: [13, 27, 49, 62]
    };
  },
  // 4 — addition within 20
  () => {
    const a = R(4, 12), b = R(3, 20 - a > 8 ? 8 : 20 - a);
    const s = a + b;
    return {
      id: 'add20',
      prompt: L(`Hisobla: ${a} + ${b} = ?`, `Вычисли: ${a} + ${b} = ?`, `Work it out: ${a} + ${b} = ?`),
      ...numOptions(s, [s + 1, s - 1, s + 2]),
      reviewTopics: [11, 52, 63]
    };
  },
  // 5 — subtraction within 20
  () => {
    const a = R(11, 20), b = R(3, 9);
    const s = a - b;
    return {
      id: 'sub20',
      prompt: L(`Hisobla: ${a} − ${b} = ?`, `Вычисли: ${a} − ${b} = ?`, `Work it out: ${a} − ${b} = ?`),
      ...numOptions(s, [s + 1, s - 1, s + 2]),
      reviewTopics: [12, 55, 66]
    };
  },
  // 6 — tens digit / place value
  () => {
    const n = R(21, 98);
    const tens = Math.floor(n / 10);
    return {
      id: 'tens',
      prompt: L(`${n} sonida nechta oʻnlik bor?`, `Сколько десятков в числе ${n}?`, `How many tens are in ${n}?`),
      ...numOptions(tens, [tens + 1, tens - 1, n % 10]),
      reviewTopics: [43, 61]
    };
  },
  // 7 — pick the even number
  () => {
    const even = R(2, 9) * 2;
    const odds = shuffle([1, 3, 5, 7, 9, 11, 13].map((x) => x)).slice(0, 3).map((x) => (x <= 19 ? x : x));
    return {
      id: 'even',
      prompt: L('Qaysi biri juft son?', 'Какое число чётное?', 'Which number is even?'),
      ...wordOptions(N(even), odds.map(N)),
      reviewTopics: [29, 48]
    };
  },
  // 8 — which row is in ascending order
  () => {
    const base = R(11, 40);
    const asc = [base, base + R(3, 6), base + R(9, 14)];
    const good = asc.join(', ');
    const bad = [
      [asc[2], asc[0], asc[1]].join(', '),
      [asc[1], asc[2], asc[0]].join(', '),
      [asc[2], asc[1], asc[0]].join(', ')
    ];
    return {
      id: 'order',
      prompt: L('Qaysi qatorda sonlar oʻsish tartibida?', 'В каком ряду числа по возрастанию?', 'Which row is in ascending order?'),
      ...wordOptions(N(good), bad.map(N)),
      reviewTopics: [28]
    };
  },
  // 9 — missing addend (equation)
  () => {
    const x = R(3, 15), a = R(3, 12);
    const b = x + a;
    return {
      id: 'addend',
      prompt: L(`Tenglamani yech: x + ${a} = ${b}. x = ?`, `Реши уравнение: x + ${a} = ${b}. x = ?`, `Solve: x + ${a} = ${b}. x = ?`),
      ...numOptions(x, [x + 1, x - 1, x + 2]),
      reviewTopics: [34, 137, 138]
    };
  },
  // 10 — missing subtrahend
  () => {
    const a = R(14, 20), x = R(3, 9);
    const b = a - x;
    return {
      id: 'subtrahend',
      prompt: L(`Tenglamani yech: ${a} − x = ${b}. x = ?`, `Реши уравнение: ${a} − x = ${b}. x = ?`, `Solve: ${a} − x = ${b}. x = ?`),
      ...numOptions(x, [x + 1, x - 1, x + 2]),
      reviewTopics: [36, 138, 139]
    };
  },
  // 11 — two-digit addition
  () => {
    const a = R(21, 54), b = R(13, 44 - (a % 10 > 5 ? 4 : 0));
    const s = a + b;
    return {
      id: 'add2d',
      prompt: L(`Hisobla: ${a} + ${b} = ?`, `Вычисли: ${a} + ${b} = ?`, `Work it out: ${a} + ${b} = ?`),
      ...numOptions(s, [s + 10, s - 1, s + 1]),
      reviewTopics: [63, 64, 65]
    };
  },
  // 12 — two-digit subtraction
  () => {
    const a = R(45, 98), b = R(13, 40);
    const s = a - b;
    return {
      id: 'sub2d',
      prompt: L(`Hisobla: ${a} − ${b} = ?`, `Вычисли: ${a} − ${b} = ?`, `Work it out: ${a} − ${b} = ?`),
      ...numOptions(s, [s + 10, s - 1, s + 1]),
      reviewTopics: [66, 67]
    };
  },
  // 13 — pick the round (multiple of 10) number
  () => {
    const round = R(2, 9) * 10;
    const notRound = new Set<number>();
    while (notRound.size < 3) {
      const w = R(11, 99);
      if (w % 10 !== 0) notRound.add(w);
    }
    return {
      id: 'round',
      prompt: L('Qaysi biri yaxlit son (10 ga karrali)?', 'Какое число круглое (кратное 10)?', 'Which is a round number (multiple of 10)?'),
      ...wordOptions(N(round), [...notRound].map(N)),
      reviewTopics: [58]
    };
  },
  // 14 — brackets / order of operations
  () => {
    const a = R(10, 30), b = R(5, 15), c = R(3, 12);
    const s = a + b - c;
    return {
      id: 'brackets',
      prompt: L(`Hisobla: (${a} + ${b}) − ${c} = ?`, `Вычисли: (${a} + ${b}) − ${c} = ?`, `Work it out: (${a} + ${b}) − ${c} = ?`),
      ...numOptions(s, [s + c, s - 1, s + 1]),
      reviewTopics: [50, 51, 73]
    };
  },
  // 15 — how many more (comparison word problem)
  () => {
    const a = R(20, 60), b = R(5, 19);
    const more = a, less = a - b;
    return {
      id: 'howmany',
      prompt: L(
        `Aliyda ${more} ta, Valida ${less} ta stiker bor. Aliyda nechta koʻp?`,
        `У Али ${more} наклеек, у Вали ${less}. На сколько у Али больше?`,
        `Ali has ${more} stickers, Vali has ${less}. How many more does Ali have?`
      ),
      ...numOptions(b, [b + 1, b - 1, b + 2]),
      reviewTopics: [86, 89, 90]
    };
  },
  // 16 — whole (sum) word problem
  () => {
    const a = R(12, 45), b = R(11, 40);
    return {
      id: 'whole',
      prompt: L(
        `${a} ta qizil va ${b} ta koʻk shar bor. Jami nechta shar?`,
        `${a} красных и ${b} синих шаров. Сколько всего шаров?`,
        `${a} red and ${b} blue balloons. How many balloons in all?`
      ),
      ...numOptions(a + b, [a + b + 1, a + b - 1, a + b + 10]),
      reviewTopics: [80, 77, 82]
    };
  },
  // 17 — part (remainder) word problem
  () => {
    const total = R(30, 90), gone = R(11, 25);
    return {
      id: 'part',
      prompt: L(
        `Savatda ${total} ta olma bor edi, ${gone} tasi olindi. Nechta qoldi?`,
        `В корзине было ${total} яблок, ${gone} взяли. Сколько осталось?`,
        `A basket had ${total} apples, ${gone} were taken. How many are left?`
      ),
      ...numOptions(total - gone, [total - gone + 1, total - gone - 1, total - gone + 10]),
      reviewTopics: [83, 84]
    };
  },
  // 18 — dm → cm conversion
  () => {
    const dm = R(2, 9);
    return {
      id: 'dm2cm',
      prompt: L(`${dm} dm necha santimetrga teng?`, `Сколько сантиметров в ${dm} дм?`, `How many centimetres are in ${dm} dm?`),
      ...numOptions(dm * 10, [dm * 10 + 10, dm * 10 - 10, dm]),
      reviewTopics: [101, 102]
    };
  },
  // 19 — mass (kg) addition
  () => {
    const a = R(6, 25), b = R(5, 20);
    return {
      id: 'kg',
      prompt: L(`Bir qopda ${a} kg, boshqasida ${b} kg un bor. Jami necha kg?`, `В одном мешке ${a} кг, в другом ${b} кг муки. Сколько всего кг?`, `One sack holds ${a} kg, another ${b} kg of flour. How many kg in all?`),
      ...numOptions(a + b, [a + b + 1, a + b - 1, a + b + 10]),
      reviewTopics: [104, 105]
    };
  },
  // 20 — volume (litre) addition
  () => {
    const a = R(4, 18), b = R(3, 15);
    return {
      id: 'litre',
      prompt: L(`Bir idishda ${a} litr, boshqasida ${b} litr suv bor. Jami necha litr?`, `В одном сосуде ${a} л, в другом ${b} л воды. Сколько всего литров?`, `One jug holds ${a} L, another ${b} L of water. How many litres in all?`),
      ...numOptions(a + b, [a + b + 1, a + b - 1, a + b + 10]),
      reviewTopics: [106, 107]
    };
  },
  // 21 — which length is longer
  () => {
    const a = R(20, 90), b = R(20, 90) + (Math.random() < 0.5 ? 0 : 0);
    const longer = Math.max(a, b) === a && a !== b ? a : Math.max(a, b);
    const A = a, B = a === b ? b + R(3, 8) : b;
    const bigger = Math.max(A, B);
    return {
      id: 'longer',
      prompt: L(`Qaysi uzunroq: ${A} cm yoki ${B} cm?`, `Что длиннее: ${A} см или ${B} см?`, `Which is longer: ${A} cm or ${B} cm?`),
      ...wordOptions(L(`${bigger} cm`, `${bigger} см`, `${bigger} cm`), [
        L(`${Math.min(A, B)} cm`, `${Math.min(A, B)} см`, `${Math.min(A, B)} cm`),
        L('Teng', 'Равны', 'Equal'),
        L('Aniqlab boʻlmaydi', 'Нельзя определить', "Can't tell")
      ]),
      reviewTopics: [108, 109]
    };
  },
  // 22 — number of sides of a named polygon
  () => {
    const shapes = [
      { uz: 'uchburchak', ru: 'треугольник', en: 'triangle', sides: 3 },
      { uz: 'toʻrtburchak', ru: 'четырёхугольник', en: 'quadrilateral', sides: 4 },
      { uz: 'beshburchak', ru: 'пятиугольник', en: 'pentagon', sides: 5 },
      { uz: 'oltiburchak', ru: 'шестиугольник', en: 'hexagon', sides: 6 }
    ];
    const s = pickOne(shapes);
    return {
      id: 'sides',
      prompt: L(`${s.uz.charAt(0).toUpperCase() + s.uz.slice(1)}ning nechta tomoni bor?`, `Сколько сторон у фигуры «${s.ru}»?`, `How many sides does a ${s.en} have?`),
      ...numOptions(s.sides, [s.sides + 1, s.sides - 1, s.sides + 2]),
      reviewTopics: [116, 119, 122],
      image: EXAM_IMAGES.polygons
    };
  },
  // 23 — perimeter of a square
  () => {
    const side = R(3, 12);
    return {
      id: 'perimeter',
      prompt: L(`Tomoni ${side} cm boʻlgan kvadratning perimetri necha cm?`, `Периметр квадрата со стороной ${side} см?`, `Perimeter of a square with side ${side} cm?`),
      ...numOptions(side * 4, [side * 3, side * 2, side * 4 + 2]),
      reviewTopics: [117, 118],
      image: EXAM_IMAGES.square
    };
  },
  // 24 — straight vs curved line (concept)
  () => {
    return {
      id: 'curved',
      prompt: L('Doira chizigʻi qanday chiziq?', 'Из какой линии состоит круг?', 'What kind of line makes a circle?'),
      ...wordOptions(L('Egri chiziq', 'Кривая линия', 'A curved line'), [
        L('Toʻgʻri chiziq', 'Прямая линия', 'A straight line'),
        L('Siniq chiziq', 'Ломаная линия', 'A broken line'),
        L('Nuqta', 'Точка', 'A point')
      ]),
      reviewTopics: [30, 31]
    };
  },
  // 25 — axes of symmetry of a square
  () => {
    return {
      id: 'symmetry',
      prompt: L('Kvadratning nechta simmetriya oʻqi bor?', 'Сколько осей симметрии у квадрата?', 'How many axes of symmetry does a square have?'),
      ...numOptions(4, [2, 1, 3]),
      reviewTopics: [126, 127]
    };
  },
  // 26 — which solid does a ball resemble
  () => {
    return {
      id: 'solid',
      prompt: L('Toʻp qaysi hajmli shaklga oʻxshaydi?', 'На какую объёмную фигуру похож мяч?', 'Which 3D shape is a ball like?'),
      ...wordOptions(L('Shar', 'Шар', 'Sphere'), [
        L('Kub', 'Куб', 'Cube'),
        L('Piramida', 'Пирамида', 'Pyramid'),
        L('Silindr', 'Цилиндр', 'Cylinder')
      ]),
      reviewTopics: [128],
      image: EXAM_IMAGES.solids
    };
  },
  // 27 — value of a Roman numeral
  () => {
    const map = [
      { r: 'IV', v: 4 },
      { r: 'VI', v: 6 },
      { r: 'VII', v: 7 },
      { r: 'IX', v: 9 },
      { r: 'XI', v: 11 },
      { r: 'VIII', v: 8 }
    ];
    const m = pickOne(map);
    return {
      id: 'roman',
      prompt: L(`${m.r} rim raqami qaysi songa teng?`, `Какому числу равна римская цифра ${m.r}?`, `Which number equals the Roman numeral ${m.r}?`),
      ...numOptions(m.v, [m.v + 1, m.v - 1, m.v + 2]),
      reviewTopics: [136]
    };
  },
  // 28 — evaluate a letter expression
  () => {
    const a = R(20, 50), m = R(5, 20);
    return {
      id: 'letterexpr',
      prompt: L(`a = ${a} boʻlsa, a + ${m} nechaga teng?`, `Если a = ${a}, чему равно a + ${m}?`, `If a = ${a}, what is a + ${m}?`),
      ...numOptions(a + m, [a + m + 1, a + m - 1, a + m + 10]),
      reviewTopics: [130, 131, 133]
    };
  },
  // 29 — value in an inequality range
  () => {
    const lo = R(20, 80);
    const hi = lo + R(3, 5);
    const mid = lo + Math.floor((hi - lo) / 2);
    return {
      id: 'range',
      prompt: L(`${lo} < x < ${hi} boʻlsa, x qaysi boʻla oladi?`, `Если ${lo} < x < ${hi}, чем может быть x?`, `If ${lo} < x < ${hi}, what can x be?`),
      ...numOptions(mid, [lo, hi, hi + 1]),
      reviewTopics: [135, 68]
    };
  },
  // 30 — total length of a broken line (3 parts)
  () => {
    const a = R(3, 12), b = R(3, 12), c = R(3, 12);
    const s = a + b + c;
    return {
      id: 'brokenline',
      prompt: L(
        `Siniq chiziq boʻlaklari ${a} cm, ${b} cm va ${c} cm. Umumiy uzunligi necha cm?`,
        `Звенья ломаной ${a} см, ${b} см и ${c} см. Какова общая длина?`,
        `A broken line has parts ${a} cm, ${b} cm and ${c} cm. What is its total length?`
      ),
      ...numOptions(s, [s + 1, s - 1, s + 2]),
      reviewTopics: [115, 31],
      image: EXAM_IMAGES.brokenLine
    };
  }
];

/** Build a fresh, randomized 30-question exam (question order shuffled too). */
export function buildG1MathExam(): ExamQuestion[] {
  return shuffle(GENERATORS).map((gen, i) => {
    const q = gen();
    return { ...q, id: `q${i + 1}-${q.id}` };
  });
}

/** Everything the generic ExamPlayer needs to run one exam. */
export type ExamConfig = {
  title: L10n;
  intro: L10n;
  minutes: number;
  count: number;
  build: () => ExamQuestion[];
  logoSrc: string;
  topicKey: string;
};

export const PRESIDENT_EXAM_CONFIG: ExamConfig = {
  title: EXAM_TITLE,
  intro: EXAM_INTRO,
  minutes: EXAM_MINUTES,
  count: EXAM_COUNT,
  build: buildG1MathExam,
  logoSrc: '/prezident-logo.png',
  topicKey: G1_MATH_EXAM_KEY
};
