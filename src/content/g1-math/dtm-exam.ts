import type { L10n } from '@/lib/i18n-config';
import { EXAM_IMAGES, type ExamConfig, type ExamQuestion } from '@/content/g1-math/exam';

/**
 * "DTM ga tayyorgarlik" — a 30-question, 60-minute practice exam in the style of
 * the DTM (Davlat test markazi) admission tests. The real DTM tests target
 * grades 5–11 / university entry; this bank uses ONLY the grade-1 topics those
 * tests actually touch (even/odd, comparison, equations, inequalities, basic
 * geometry, measurement). Values regenerate every attempt; each question carries
 * `reviewTopics` so the results screen recommends which grade-1 lessons to revise.
 */

export const DTM_EXAM_KEY = 'g1-math-dtm';
export const DTM_MINUTES = 60;
export const DTM_COUNT = 30;

export const DTM_TITLE: L10n = {
  uz: 'DTM ga tayyorgarlik',
  ru: 'Подготовка к DTM',
  en: 'DTM preparation'
};

export const DTM_INTRO: L10n = {
  uz: 'DTM (Davlat test markazi) imtihonlari odatda 5–11-sinf va oliygohga kirish uchun boʻladi. Bu — haqiqiy DTM testi EMAS, balki DTM testlarida uchraydigan, 1-sinfda oʻrganilgan mavzular (juft-toq sonlar, taqqoslash, tenglamalar, tengsizliklar, geometriya, oʻlchov) asosidagi tayyorgarlik testi. 30 ta savol, 60 daqiqa. Har safar sonlar oʻzgaradi. Test soʻngida qaysi darslarni takrorlash kerakligi tavsiya qilinadi.',
  ru: 'Экзамены DTM (Государственного центра тестирования) обычно для 5–11 классов и поступления в вуз. Это НЕ настоящий тест DTM, а тренировочный тест по темам 1 класса, которые встречаются в тестах DTM (чётные/нечётные числа, сравнение, уравнения, неравенства, геометрия, измерения). 30 вопросов, 60 минут. Числа меняются каждый раз. В конце будет рекомендовано, какие уроки повторить.',
  en: 'DTM (State Test Centre) exams are usually for grades 5–11 and university entry. This is NOT a real DTM test — it is a practice test built from the grade-1 topics that appear in DTM tests (even/odd numbers, comparison, equations, inequalities, geometry, measurement). 30 questions, 60 minutes. The numbers change every time. At the end it recommends which lessons to review.'
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

/* --------------------------- question bank --------------------------- */
type Gen = () => ExamQuestion;

const GENERATORS: Gen[] = [
  // 1 — pick the even number
  () => {
    const even = R(5, 24) * 2;
    const odds = new Set<number>();
    while (odds.size < 3) {
      const w = R(11, 99);
      if (w % 2 === 1) odds.add(w);
    }
    return {
      id: 'even',
      prompt: L('Quyidagilardan qaysi biri juft son?', 'Какое из чисел чётное?', 'Which of these is an even number?'),
      ...wordOptions(N(even), [...odds].map(N)),
      reviewTopics: [29, 48]
    };
  },
  // 2 — pick the odd number
  () => {
    const odd = R(6, 24) * 2 + 1;
    const evens = new Set<number>();
    while (evens.size < 3) {
      const w = R(10, 98);
      if (w % 2 === 0) evens.add(w);
    }
    return {
      id: 'odd',
      prompt: L('Quyidagilardan qaysi biri toq son?', 'Какое из чисел нечётное?', 'Which of these is an odd number?'),
      ...wordOptions(N(odd), [...evens].map(N)),
      reviewTopics: [29, 48]
    };
  },
  // 3 — comparison sign
  () => {
    const a = R(20, 98), b = R(20, 98);
    const correct = a > b ? '>' : a < b ? '<' : '=';
    const wrong = ['>', '<', '=', '≠'].filter((s) => s !== correct).slice(0, 3);
    return {
      id: 'compare',
      prompt: L(`Toʻgʻri belgini tanlang: ${a} ▢ ${b}`, `Выберите верный знак: ${a} ▢ ${b}`, `Choose the correct sign: ${a} ▢ ${b}`),
      ...wordOptions(N(correct), wrong.map(N)),
      reviewTopics: [13, 27, 49]
    };
  },
  // 4 — biggest of four
  () => {
    const set = new Set<number>();
    while (set.size < 4) set.add(R(11, 99));
    const arr = [...set];
    const big = Math.max(...arr);
    return {
      id: 'biggest',
      prompt: L('Eng katta son qaysi?', 'Какое число самое большое?', 'Which number is the largest?'),
      ...wordOptions(N(big), arr.filter((x) => x !== big).map(N)),
      reviewTopics: [13, 27]
    };
  },
  // 5 — smallest of four
  () => {
    const set = new Set<number>();
    while (set.size < 4) set.add(R(11, 99));
    const arr = [...set];
    const small = Math.min(...arr);
    return {
      id: 'smallest',
      prompt: L('Eng kichik son qaysi?', 'Какое число самое маленькое?', 'Which number is the smallest?'),
      ...wordOptions(N(small), arr.filter((x) => x !== small).map(N)),
      reviewTopics: [13, 27]
    };
  },
  // 6 — unknown addend
  () => {
    const x = R(6, 30), a = R(10, 40);
    return {
      id: 'addend',
      prompt: L(`Tenglamani yeching: x + ${a} = ${x + a}. x = ?`, `Решите уравнение: x + ${a} = ${x + a}. x = ?`, `Solve: x + ${a} = ${x + a}. x = ?`),
      ...numOptions(x, [x + 1, x - 1, x + 10]),
      reviewTopics: [34, 137, 138]
    };
  },
  // 7 — unknown minuend
  () => {
    const x = R(30, 90), a = R(8, 25);
    return {
      id: 'minuend',
      prompt: L(`Tenglamani yeching: x − ${a} = ${x - a}. x = ?`, `Решите уравнение: x − ${a} = ${x - a}. x = ?`, `Solve: x − ${a} = ${x - a}. x = ?`),
      ...numOptions(x, [x + 1, x - 1, x - 10]),
      reviewTopics: [35, 138, 139]
    };
  },
  // 8 — unknown subtrahend
  () => {
    const a = R(40, 95), x = R(8, 30);
    return {
      id: 'subtrahend',
      prompt: L(`Tenglamani yeching: ${a} − x = ${a - x}. x = ?`, `Решите уравнение: ${a} − x = ${a - x}. x = ?`, `Solve: ${a} − x = ${a - x}. x = ?`),
      ...numOptions(x, [x + 1, x - 1, x + 10]),
      reviewTopics: [36, 138, 139]
    };
  },
  // 9 — word problem → equation (how many at first)
  () => {
    const start = R(120, 320), add = R(80, 260);
    return {
      id: 'hadbefore',
      prompt: L(
        `Qutiga ${add} dona shokolad solingach, jami ${start + add} dona boʻldi. Dastlab qutida nechta shokolad bor edi?`,
        `После добавления ${add} шоколадок в коробке стало ${start + add}. Сколько шоколадок было сначала?`,
        `After ${add} chocolates were added, the box held ${start + add}. How many were there at first?`
      ),
      ...numOptions(start, [start + 1, start - 1, start + add]),
      reviewTopics: [34, 140, 80]
    };
  },
  // 10 — word problem (how many left)
  () => {
    const total = R(40, 95), gone = R(12, 30);
    return {
      id: 'left',
      prompt: L(
        `Doʻkonda ${total} kg meva bor edi, ${gone} kg sotildi. Necha kg meva qoldi?`,
        `В магазине было ${total} кг фруктов, ${gone} кг продали. Сколько кг осталось?`,
        `A shop had ${total} kg of fruit, ${gone} kg was sold. How many kg are left?`
      ),
      ...numOptions(total - gone, [total - gone + 1, total - gone - 1, total - gone + 10]),
      reviewTopics: [83, 84, 12]
    };
  },
  // 11 — two-digit subtraction
  () => {
    const a = R(45, 98), b = R(13, 40);
    return {
      id: 'sub2d',
      prompt: L(`Hisoblang: ${a} − ${b}`, `Вычислите: ${a} − ${b}`, `Calculate: ${a} − ${b}`),
      ...numOptions(a - b, [a - b + 10, a - b - 1, a - b + 1]),
      reviewTopics: [66, 67]
    };
  },
  // 12 — two-digit addition
  () => {
    const a = R(21, 54), b = R(13, 44);
    return {
      id: 'add2d',
      prompt: L(`Hisoblang: ${a} + ${b}`, `Вычислите: ${a} + ${b}`, `Calculate: ${a} + ${b}`),
      ...numOptions(a + b, [a + b + 10, a + b - 1, a + b + 1]),
      reviewTopics: [63, 65]
    };
  },
  // 13 — previous neighbour
  () => {
    const n = R(12, 90);
    return {
      id: 'neighbor',
      prompt: L(`${n} sonining oldingi qoʻshnisi qaysi?`, `Какой сосед числа ${n} слева?`, `What is the previous neighbour of ${n}?`),
      ...numOptions(n - 1, [n + 1, n - 2, n]),
      reviewTopics: [10]
    };
  },
  // 14 — value in an inequality range
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
  // 15 — which inequality is true
  () => {
    const a = R(20, 60), b = a + R(2, 30);
    const correct = L(`${a} < ${b}`, `${a} < ${b}`, `${a} < ${b}`);
    return {
      id: 'trueineq',
      prompt: L('Qaysi tengsizlik toʻgʻri?', 'Какое неравенство верное?', 'Which inequality is true?'),
      ...wordOptions(correct, [N(`${b} < ${a}`), N(`${a} > ${b}`), N(`${a} = ${b}`)]),
      reviewTopics: [49, 68, 135]
    };
  },
  // 16 — ascending order row
  () => {
    const base = R(11, 40);
    const asc = [base, base + R(3, 6), base + R(9, 14)];
    return {
      id: 'order',
      prompt: L('Qaysi qatorda sonlar oʻsish tartibida?', 'В каком ряду числа по возрастанию?', 'Which row is in ascending order?'),
      ...wordOptions(N(asc.join(', ')), [N([asc[2], asc[0], asc[1]].join(', ')), N([asc[1], asc[2], asc[0]].join(', ')), N([asc[2], asc[1], asc[0]].join(', '))]),
      reviewTopics: [28]
    };
  },
  // 17 — tens digit / place value
  () => {
    const n = R(21, 98);
    return {
      id: 'tens',
      prompt: L(`${n} sonida nechta oʻnlik bor?`, `Сколько десятков в числе ${n}?`, `How many tens are in ${n}?`),
      ...numOptions(Math.floor(n / 10), [Math.floor(n / 10) + 1, Math.floor(n / 10) - 1, n % 10]),
      reviewTopics: [43, 61]
    };
  },
  // 18 — degrees in a right angle
  () => {
    return {
      id: 'rightangle',
      prompt: L('Toʻgʻri burchak necha gradusga teng?', 'Сколько градусов в прямом угле?', 'How many degrees are in a right angle?'),
      ...numOptions(90, [180, 45, 60]),
      reviewTopics: [121]
    };
  },
  // 19 — number of sides of a named polygon (with reference image)
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
      prompt: L(`«${s.uz}»ning nechta tomoni bor?`, `Сколько сторон у фигуры «${s.ru}»?`, `How many sides does a ${s.en} have?`),
      ...numOptions(s.sides, [s.sides + 1, s.sides - 1, s.sides + 2]),
      reviewTopics: [116, 119, 122],
      image: EXAM_IMAGES.polygons
    };
  },
  // 20 — equal sides of a square
  () => {
    return {
      id: 'squaresides',
      prompt: L('Kvadratning nechta teng tomoni bor?', 'Сколько равных сторон у квадрата?', 'How many equal sides does a square have?'),
      ...numOptions(4, [2, 3, 6]),
      reviewTopics: [119, 120]
    };
  },
  // 21 — perimeter of a square (with reference image)
  () => {
    const side = R(3, 12);
    return {
      id: 'sqperim',
      prompt: L(`Tomoni ${side} cm boʻlgan kvadratning perimetri necha cm?`, `Периметр квадрата со стороной ${side} см?`, `Perimeter of a square with side ${side} cm?`),
      ...numOptions(side * 4, [side * 3, side * 2, side * 4 + 2]),
      reviewTopics: [117, 118],
      image: EXAM_IMAGES.square
    };
  },
  // 22 — perimeter of a rectangle
  () => {
    const a = R(3, 12), b = R(3, 12);
    return {
      id: 'rectperim',
      prompt: L(
        `Tomonlari ${a} cm va ${b} cm boʻlgan toʻgʻri toʻrtburchakning perimetri necha cm?`,
        `Периметр прямоугольника со сторонами ${a} см и ${b} см?`,
        `Perimeter of a rectangle with sides ${a} cm and ${b} cm?`
      ),
      ...numOptions(2 * (a + b), [a + b, 2 * a + b, 2 * (a + b) + 2]),
      reviewTopics: [117, 118, 119]
    };
  },
  // 23 — total length of a broken line (with reference image)
  () => {
    const a = R(3, 12), b = R(3, 12), c = R(3, 12);
    return {
      id: 'brokenline',
      prompt: L(
        `Siniq chiziq boʻlaklari ${a} cm, ${b} cm va ${c} cm. Umumiy uzunligi necha cm?`,
        `Звенья ломаной ${a} см, ${b} см и ${c} см. Общая длина?`,
        `A broken line has parts ${a} cm, ${b} cm and ${c} cm. Total length?`
      ),
      ...numOptions(a + b + c, [a + b + c + 1, a + b + c - 1, a + b + c + 2]),
      reviewTopics: [115, 31],
      image: EXAM_IMAGES.brokenLine
    };
  },
  // 24 — litres added
  () => {
    const a = R(6, 25), b = R(5, 20);
    return {
      id: 'litre',
      prompt: L(`${a} litr va ${b} litr suv qoʻshildi. Jami necha litr?`, `Добавили ${a} л и ${b} л воды. Сколько всего литров?`, `${a} L and ${b} L of water were added. How many litres in all?`),
      ...numOptions(a + b, [a + b + 1, a + b - 1, a + b + 10]),
      reviewTopics: [106, 107]
    };
  },
  // 25 — which is a 3D (solid) shape (with reference image)
  () => {
    return {
      id: 'solid',
      prompt: L('Quyidagilardan qaysi biri hajmli shakl?', 'Какая из фигур объёмная?', 'Which of these is a 3D (solid) shape?'),
      ...wordOptions(L('Kub', 'Куб', 'Cube'), [
        L('Kvadrat', 'Квадрат', 'Square'),
        L('Uchburchak', 'Треугольник', 'Triangle'),
        L('Doira', 'Круг', 'Circle')
      ]),
      reviewTopics: [128],
      image: EXAM_IMAGES.solids
    };
  },
  // 26 — mass (kg) word problem
  () => {
    const total = R(50, 95), sold = R(15, 40);
    return {
      id: 'kg',
      prompt: L(
        `Sotuvchida ${total} kg kartoshka bor edi, ${sold} kg sotildi. Necha kg qoldi?`,
        `У продавца было ${total} кг картофеля, ${sold} кг продали. Сколько кг осталось?`,
        `A seller had ${total} kg of potatoes, ${sold} kg was sold. How many kg are left?`
      ),
      ...numOptions(total - sold, [total - sold + 1, total - sold - 1, total - sold + 10]),
      reviewTopics: [104, 105, 83]
    };
  },
  // 27 — brackets / order of operations
  () => {
    const a = R(10, 30), b = R(5, 15), c = R(3, 12);
    return {
      id: 'brackets',
      prompt: L(`Hisoblang: (${a} + ${b}) − ${c}`, `Вычислите: (${a} + ${b}) − ${c}`, `Calculate: (${a} + ${b}) − ${c}`),
      ...numOptions(a + b - c, [a + b + c, a + b - c + 1, a + b - c - 1]),
      reviewTopics: [50, 51, 73]
    };
  },
  // 28 — pick the round (multiple of 10) number
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
  // 29 — compare two sums
  () => {
    let a = R(11, 40), b = R(11, 40), c = R(11, 40), d = R(11, 40);
    while (a + b === c + d) d = R(11, 40);
    const bigger = a + b > c + d ? L(`${a} + ${b}`, `${a} + ${b}`, `${a} + ${b}`) : L(`${c} + ${d}`, `${c} + ${d}`, `${c} + ${d}`);
    const smaller = a + b > c + d ? L(`${c} + ${d}`, `${c} + ${d}`, `${c} + ${d}`) : L(`${a} + ${b}`, `${a} + ${b}`, `${a} + ${b}`);
    return {
      id: 'cmpsum',
      prompt: L(`Qaysi ifodaning qiymati katta? ${a} + ${b} yoki ${c} + ${d}?`, `Значение какого выражения больше? ${a} + ${b} или ${c} + ${d}?`, `Which expression is greater? ${a} + ${b} or ${c} + ${d}?`),
      ...wordOptions(bigger, [smaller, L('Teng', 'Равны', 'Equal'), L('Aniqlab boʻlmaydi', 'Нельзя определить', "Can't tell")]),
      reviewTopics: [132, 13]
    };
  },
  // 30 — dm → cm conversion
  () => {
    const dm = R(2, 9);
    return {
      id: 'dm2cm',
      prompt: L(`${dm} dm necha santimetrga teng?`, `Сколько сантиметров в ${dm} дм?`, `How many centimetres are in ${dm} dm?`),
      ...numOptions(dm * 10, [dm * 10 + 10, dm * 10 - 10, dm]),
      reviewTopics: [101, 102]
    };
  }
];

/** Build a fresh, randomized 30-question DTM practice exam. */
export function buildDtmExam(): ExamQuestion[] {
  return shuffle(GENERATORS).map((gen, i) => {
    const q = gen();
    return { ...q, id: `q${i + 1}-${q.id}` };
  });
}

export const DTM_EXAM_CONFIG: ExamConfig = {
  title: DTM_TITLE,
  intro: DTM_INTRO,
  minutes: DTM_MINUTES,
  count: DTM_COUNT,
  build: buildDtmExam,
  logoSrc: '/dtm-logo.png',
  topicKey: DTM_EXAM_KEY
};
