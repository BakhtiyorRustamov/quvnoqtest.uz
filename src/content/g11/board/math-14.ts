import type { BoardLesson } from './types';

/** f(x) = x³ + 4,5x² − 9 on [−4; 2] (darslik, 5-misol) */
const F5: [number, number][] = [[-4, -1], [-3.5, 3.25], [-3, 4.5], [-2.5, 3.5], [-2, 1], [-1.5, -2.25], [-1, -5.5], [-0.5, -8], [0, -9], [0.5, -7.75], [1, -3.5], [1.5, 4.5], [2, 17]];
/** f(x) = x³ − 3x on [−1,5; 2] */
const F3: [number, number][] = [[-1.5, 1.125], [-1, 2], [-0.5, 1.375], [0, 0], [0.5, -1.375], [1, -2], [1.5, -1.125], [2, 2]];

/** Darslik: 18–21-mavzu (44–45-betlar) — kesmada funksiyaning eng katta va eng kichik qiymati. */
export const MATH_14: BoardLesson = {
  n: 14,
  label: "20",
  part: 'algebra',
  title: "Kesmadagi eng katta va eng kichik qiymatni topish",
  section: '18–21',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Kun boʻyi havo harorati oʻzgarib turadi. Soat 6 dan 20 gacha boʻlgan vaqtda eng issiq payt soat 15 da boʻldi — bu oraliqning ichida. Eng sovuq payt esa soat 6 da, yaʼni oraliqning chetida. Demak, eng katta va eng kichik qiymat oraliq ichida ham, chetida ham boʻlishi mumkin.",
      easy: "Eng issiq payt — kunning oʻrtasida, eng sovuq — ertalab, oraliqning boshida. Shuning uchun oraliq uchlarini ham tekshirish kerak.",
      draw: [
        { t: 'title', text: 'Kunlik harorat' },
        { t: 'icon', x: 12, y: 32, emoji: '☀️', size: 'l' },
        { t: 'axes', id: 't', x: 28, y: 15, w: 64, h: 44, xmin: 5, xmax: 21, ymin: 10, ymax: 30, xlabel: 'soat', ylabel: '°C' },
        { t: 'curve', axes: 't', points: [[6, 12], [8, 14], [10, 19], [12, 24], [14, 27], [15, 27.5], [16, 27], [18, 24], [20, 20]], color: 'orange' },
        { t: 'dot', axes: 't', x: 15, y: 27.5, label: 'eng issiq', color: 'red' },
        { t: 'dot', axes: 't', x: 6, y: 12, label: 'eng sovuq', color: 'blue' },
        { t: 'text', x: 30, y: 66, text: 'Ichida ham, chetida ham boʻlishi mumkin', size: 's', color: 'purple' }
      ],
      next: 'Qanday topiladi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kesmada eng katta qiymatni topish qoidasi shunday. Birinchi: funksiyaning shu oraliq ichidagi barcha statsionar nuqtalarini topamiz. Ikkinchi: funksiyaning statsionar nuqtalardagi va kesma uchlari a va b dagi qiymatlarini hisoblaymiz. Uchinchi: bu sonlarning eng kattasi — eng katta qiymat, eng kichigi — eng kichik qiymat. Uchlarni unutmang!",
      easy: "Ikki xil nomzod bor: statsionar nuqtalar va kesma uchlari. Hammasida funksiya qiymatini hisoblab, solishtiramiz.",
      draw: [
        { t: 'title', text: 'Qoida' },
        { t: 'list', x: 6, y: 22, items: ['1) (a; b) dagi statsionar nuqtalarni toping', '2) ularda va a, b uchlarida qiymatlarni hisoblang', '3) eng kattasi va eng kichigini tanlang'] },
        { t: 'axes', id: 'g', x: 6, y: 44, w: 44, h: 22, xmin: 0, xmax: 4, ymin: 0, ymax: 4 },
        { t: 'curve', axes: 'g', points: [[0, 1], [1, 3], [1.5, 3.3], [2, 3], [3, 1.6], [4, 2.2]], color: 'red' },
        { t: 'dot', axes: 'g', x: 0, y: 1, label: 'a', color: 'blue' },
        { t: 'dot', axes: 'g', x: 4, y: 2.2, label: 'b', color: 'blue' },
        { t: 'dot', axes: 'g', x: 1.5, y: 3.3, color: 'ink' },
        { t: 'box', id: 'u', x: 56, y: 48, w: 38, h: 12, text: 'Uchlarni unutmang!', color: 'orange' }
      ],
      next: 'Misolda koʻraylik'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi misol: f(x) teng x kub plyus 4,5x kvadrat minus 9, kesma minus 4 dan 2 gacha. Hosila 3x karra x plyus 3, u x teng 0 va x teng minus 3 da nolga teng. Ikkalasi ham kesma ichida. Endi toʻrtta qiymatni hisoblaymiz: f(minus 4) teng minus 1, f(minus 3) teng 4,5, f(0) teng minus 9, f(2) teng 17. Eng kattasi 17, eng kichigi minus 9.",
      easy: "Toʻrtta nomzod: ikkita statsionar nuqta va ikkita uch. Qiymatlar: minus 1, 4,5, minus 9 va 17. Eng kattasi 17, eng kichigi minus 9.",
      draw: [
        { t: 'title', text: 'Misol' },
        { t: 'text', x: 6, y: 20, text: 'f(x) = x³ + 4,5x² − 9,   [−4; 2]' },
        { t: 'formula', x: 8, y: 31, text: 'f′(x) = 3x(x + 3) = 0  →  x = 0, x = −3' },
        {
          t: 'table',
          x: 8,
          y: 38,
          rows: [
            ['x', '−4', '−3', '0', '2'],
            ['f(x)', '−1', '4,5', '−9', '17']
          ]
        },
        { t: 'box', id: 'r', x: 6, y: 54, w: 62, h: 11, text: 'eng katta: 17,   eng kichik: −9', color: 'green' }
      ],
      next: 'Grafikda-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Grafikka qarang. x teng minus 3 da lokal maksimum bor, lekin u bor-yoʻgʻi 4,5. Kesma uchida, x teng 2 da, funksiya 17 gacha koʻtariladi. Shuning uchun lokal maksimum har doim ham eng katta qiymat boʻlavermaydi — uchlarni ham tekshirish shart.",
      easy: "Kichkina tepalik 4,5 da, lekin oʻng uchda grafik 17 gacha chiqib ketgan. Eng katta qiymat — uchida.",
      draw: [
        { t: 'title', text: 'Grafikda' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 50, h: 52, xmin: -4.5, xmax: 2.5, ymin: -10, ymax: 18, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: F5, color: 'red' },
        { t: 'dot', axes: 'g', x: 2, y: 17, label: 'eng katta', color: 'green' },
        { t: 'dot', axes: 'g', x: 0, y: -9, label: 'eng kichik', color: 'blue' },
        { t: 'dot', axes: 'g', x: -3, y: 4.5, label: 'lokal max', color: 'orange' },
        { t: 'text', x: 60, y: 26, text: 'Lokal maksimum (4,5)', size: 's', color: 'orange' },
        { t: 'text', x: 60, y: 33, text: 'eng katta qiymat emas!', size: 's', color: 'orange' },
        { t: 'text', x: 60, y: 46, text: 'Eng katta qiymat —', size: 's', color: 'green' },
        { t: 'text', x: 60, y: 53, text: 'uchida: x = 2', size: 's', color: 'green' }
      ],
      next: 'Muhim ekan!'
    },
    {
      kind: 'example',
      clear: true,
      say: "Yana bir misol: f(x) teng x kvadrat minus 4x plyus 3, kesma 0 dan 3 gacha. Hosila 2x minus 4, u x teng 2 da nolga teng, bu nuqta kesma ichida. Uchta qiymat: f(0) teng 3, f(2) teng minus 1, f(3) teng 0. Eng katta qiymat 3, eng kichik qiymat minus 1.",
      easy: "Nomzodlar: 0, 2 va 3. Qiymatlar: 3, minus 1 va 0. Eng kattasi 3, eng kichigi minus 1.",
      draw: [
        { t: 'title', text: '2-misol' },
        { t: 'text', x: 6, y: 20, text: 'f(x) = x² − 4x + 3,   [0; 3]' },
        { t: 'list', x: 6, y: 31, items: ['f′(x) = 2x − 4 = 0  →  x = 2', 'f(0) = 3,  f(2) = −1,  f(3) = 0', 'max = 3,  min = −1'] },
        { t: 'axes', id: 'p', x: 62, y: 14, w: 34, h: 50, xmin: -0.5, xmax: 3.5, ymin: -1.5, ymax: 3.5 },
        { t: 'curve', axes: 'p', points: [[0, 3], [0.5, 1.25], [1, 0], [1.5, -0.75], [2, -1], [2.5, -0.75], [3, 0]], color: 'blue' },
        { t: 'dot', axes: 'p', x: 0, y: 3, label: 'max', color: 'green' },
        { t: 'dot', axes: 'p', x: 2, y: -1, label: 'min', color: 'red' },
        { t: 'dot', axes: 'p', x: 3, y: 0, color: 'ink' }
      ],
      next: 'Kesma boshqacha boʻlsa-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi oʻsha funksiyani 3 dan 5 gacha boʻlgan kesmada qaraylik. Statsionar nuqta x teng 2 bu kesmaga kirmaydi, shuning uchun uni hisobga olmaymiz. Faqat uchlar qoladi: f(3) teng 0, f(5) teng 8. Eng kichik qiymat 0, eng katta qiymat 8.",
      easy: "x teng 2 kesmadan tashqarida — uni tashlab yuboramiz. Faqat ikki uchni solishtiramiz: 0 va 8.",
      draw: [
        { t: 'title', text: 'Kesmadan tashqarida' },
        { t: 'axes', id: 'p', x: 6, y: 14, w: 46, h: 52, xmin: -0.5, xmax: 5.5, ymin: -2, ymax: 9, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'p', points: [[0, 3], [1, 0], [2, -1], [3, 0]], color: 'ink', dashed: true },
        { t: 'curve', axes: 'p', points: [[3, 0], [3.5, 1.25], [4, 3], [4.5, 5.25], [5, 8]], color: 'blue' },
        { t: 'dot', axes: 'p', x: 2, y: -1, label: 'kesmada emas', color: 'ink' },
        { t: 'dot', axes: 'p', x: 3, y: 0, label: 'min', color: 'red' },
        { t: 'dot', axes: 'p', x: 5, y: 8, label: 'max', color: 'green' },
        { t: 'text', x: 58, y: 22, text: 'f(x) = x² − 4x + 3', size: 's' },
        { t: 'text', x: 58, y: 29, text: 'kesma [3; 5]', size: 's' },
        { t: 'text', x: 58, y: 40, text: 'x = 2 ∉ [3; 5]', color: 'red' },
        { t: 'text', x: 58, y: 47, text: 'hisobga olinmaydi', size: 's', color: 'red' },
        { t: 'text', x: 58, y: 58, text: 'min = 0,  max = 8', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Kesmada eng katta va eng kichik qiymatni topish uchun statsionar nuqtalardagi va kesma uchlaridagi qiymatlar solishtiriladi.',
    'Kesmadan tashqaridagi statsionar nuqtalar hisobga olinmaydi.',
    'Lokal maksimum har doim ham eng katta qiymat emas — uchlarni albatta tekshiring.'
  ],
  questions: [
    {
      id: 'm14q1',
      prompt: 'f(x) = x² − 6x + 1 funksiyaning [0; 5] kesmadagi eng kichik qiymatini toping.',
      hint: 'f′(x) = 2x − 6 = 0 → x = 3. f(0), f(3), f(5) ni solishtiring.',
      explanation: 'f(0) = 1, f(3) = 9 − 18 + 1 = −8, f(5) = 25 − 30 + 1 = −4. Eng kichigi −8.',
      widget: { type: 'number_answer', props: { answer: -8 } }
    },
    {
      id: 'm14q2',
      prompt: 'Oʻsha funksiya: f(x) = x² − 6x + 1, [0; 5]. Eng katta qiymat?',
      hint: 'Oldingi savoldagi uchta qiymatdan eng kattasini oling.',
      explanation: '1, −8, −4 dan eng kattasi 1 (x = 0 da, kesma uchida).',
      widget: { type: 'number_answer', props: { answer: 1 } }
    },
    {
      id: 'm14q3',
      prompt: 'Kesmada eng katta va eng kichik qiymatni topish bosqichlarini toʻgʻri tartibda bosing.',
      hint: 'Hosiladan boshlang, oxirida solishtiring.',
      explanation: 'f′ → statsionar nuqtalar → kesmadagilarini tanlash → qiymatlar → solishtirish.',
      widget: {
        type: 'step_order',
        props: {
          steps: [
            'f′(x) ni toping',
            'f′(x) = 0 dan statsionar nuqtalarni toping',
            'Faqat kesma ichidagilarini qoldiring',
            'Ularda va kesma uchlarida f(x) ni hisoblang',
            'Eng katta va eng kichik sonni tanlang'
          ]
        }
      }
    },
    {
      id: 'm14q4',
      prompt: 'f(x) = x³ − 3x funksiyaning [0; 2] kesmadagi eng katta qiymatini toping.',
      hint: 'f′(x) = 3x² − 3 = 0 → x = ±1. Kesmaga faqat x = 1 kiradi.',
      explanation: 'f(0) = 0, f(1) = −2, f(2) = 8 − 6 = 2. Eng kattasi 2.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'm14q5',
      prompt: 'Grafikda f(x) = x³ − 3x funksiyaning [−1,5; 2] kesmadagi eng kichik qiymati nuqtasini bosing.',
      hint: 'Grafikning eng past nuqtasini qidiring — chetlarini ham koʻring.',
      explanation: 'Eng past nuqta (1; −2): bu lokal minimum va kesmadagi eng kichik qiymat.',
      widget: {
        type: 'graph_tap',
        props: { target: [1, -2], radius: 0.35, graph: { xmin: -2, xmax: 2.5, ymin: -3, ymax: 3, xlabel: 'x', ylabel: 'y', curves: [{ points: F3 }], dots: [[-1.5, 1.125], [2, 2]] } }
      }
    },
    {
      id: 'm14q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Uchlarni va kesmadan tashqaridagi nuqtalarni eslang.',
      explanation: 'Eng katta qiymat uchda ham boʻlishi mumkin. Uchlar albatta hisoblanadi. Tashqaridagi nuqta hisobga olinmaydi. Lokal maksimum eng katta qiymatdan kichik boʻlishi mumkin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Eng katta qiymat faqat statsionar nuqtada boʻladi.', value: false },
            { text: 'Kesma uchlaridagi qiymatlarni ham hisoblash kerak.', value: true },
            { text: 'Kesmadan tashqaridagi statsionar nuqta hisobga olinmaydi.', value: true },
            { text: 'Lokal maksimum har doim eng katta qiymatga teng.', value: false }
          ]
        }
      }
    },
    {
      id: 'm14q7',
      prompt: 'f(x) = x³ − 3x funksiyaning [0; 3] kesmadagi eng katta qiymatini topish uchun qaysi nuqtalarni tekshirish kerak? Hammasini belgilang.',
      hint: 'Statsionar nuqtalar x = ±1. Kesma uchlari 0 va 3.',
      explanation: 'x = 0 va x = 3 — uchlar, x = 1 — kesmadagi statsionar nuqta. x = −1 va x = −3 kesmadan tashqarida, x = 2 statsionar ham, uch ham emas.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { text: 'x = 0', match: true },
            { text: 'x = 1', match: true },
            { text: 'x = −1', match: false },
            { text: 'x = 3', match: true },
            { text: 'x = 2', match: false },
            { text: 'x = −3', match: false }
          ]
        }
      }
    }
  ]
};
