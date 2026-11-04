import type { BoardLesson } from './types';
import { ellipse } from './geo3d';

const SQ4: [number, number][] = [[0, 0], [0.5, 0.707], [1, 1], [1.5, 1.225], [2, 1.414], [2.5, 1.581], [3, 1.732], [3.5, 1.871], [4, 2]];
const SIN: [number, number][] = [[0, 0], [0.262, 0.259], [0.524, 0.5], [0.785, 0.707], [1.047, 0.866], [1.309, 0.966], [1.571, 1], [1.833, 0.966], [2.094, 0.866], [2.356, 0.707], [2.618, 0.5], [2.88, 0.259], [3.142, 0]];

/** Darslik (2-qism): 47–50-mavzu (4–7-betlar) — aylanish jismlarining hajmi. */
export const MATH_42: BoardLesson = {
  n: 42,
  label: '49',
  part: 'algebra',
  qism: 2,
  title: 'Aylanish jismlarining hajmini hisoblash',
  section: '47–50',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Kulol charxda loydan koʻza yasaydi. Charx aylanadi, kulolning qoʻli esa koʻzaning chetini — egri chiziqni chizadi. Aylanish natijasida hajmli jism paydo boʻladi. Koʻzaga qancha suv sigʻadi? Egri chiziq maʼlum boʻlsa, hajmni integral bilan topish mumkin.",
      easy: "Egri chiziq oʻq atrofida aylansa, hajmli jism hosil boʻladi. Uning hajmini integral bilan topamiz.",
      draw: [
        { t: 'title', text: 'Kulol charxi' },
        { t: 'icon', x: 12, y: 30, emoji: '🏺', size: 'l' },
        { t: 'axes', id: 'g', x: 30, y: 16, w: 62, h: 46, xmin: 0, xmax: 4.4, ymin: -2.3, ymax: 2.3, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: SQ4, color: 'red' },
        { t: 'curve', axes: 'g', points: SQ4.map(([x, y]) => [x, -y] as [number, number]), color: 'red', dashed: true },
        ellipse(86.4, 39, 4, 20, { color: 'blue' }),
        { t: 'text', x: 32, y: 68, text: 'Aylanadi → jism hosil boʻladi', size: 's', color: 'purple' }
      ],
      next: 'Formula qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Egri chiziqli trapetsiyani Ox oʻqi atrofida aylantiramiz. x nuqtadagi kesim — radiusi f(x) boʻlgan doira, yuzi pi f(x) kvadrat. Bunday yupqa doiralarni qoʻshib chiqsak, hajm chiqadi: V teng pi karra a dan b gacha f(x) kvadrat ning integrali.",
      easy: "Har bir kesim — doira, yuzi pi f kvadrat. Ularni integral bilan yigʻamiz.",
      draw: [
        { t: 'title', text: 'Ox atrofida aylanish' },
        { t: 'formula', x: 12, y: 22, text: 'V = π ∫ₐᵇ f²(x) dx' },
        { t: 'text', x: 12, y: 40, text: 'kesim — doira, yuzi πf²(x)', color: 'blue' },
        ellipse(80, 46, 4, 13, { color: 'orange' }),
        { t: 'text', x: 12, y: 56, text: 'yupqa disklar yigʻindisi', size: 's', color: 'purple' }
      ],
      next: 'Konus hajmi'
    },
    {
      kind: 'example',
      clear: true,
      say: "Konus hajmini chiqaramiz. Balandligi H, asos radiusi R. OA toʻgʻri chiziq tenglamasi y teng R boʻlinsin H karra x. Formula boʻyicha V teng pi karra 0 dan H gacha R kvadrat boʻlinsin H kvadrat karra x kvadrat. Integral H kub boʻlinsin 3. Natija: V teng uchdan bir pi R kvadrat H.",
      easy: "Toʻgʻri chiziq aylanib, konus chizadi. Integral bilan uchdan bir pi R kvadrat H chiqadi.",
      draw: [
        { t: 'title', text: 'Konus hajmi' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 44, h: 50, xmin: 0, xmax: 4.4, ymin: -2.3, ymax: 2.3, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: [[0, 0], [4, 2]], color: 'red' },
        { t: 'curve', axes: 'g', points: [[0, 0], [4, -2]], color: 'red', dashed: true },
        ellipse(46, 39, 4, 20, { color: 'blue' }),
        { t: 'text', x: 54, y: 20, text: 'y = (R/H)·x', color: 'blue' },
        { t: 'formula', x: 54, y: 30, text: 'V = π∫₀ᴴ (R²/H²)x² dx' },
        { t: 'box', id: 'r', x: 54, y: 46, w: 38, h: 12, text: 'V = ⅓πR²H', color: 'green' }
      ],
      next: 'Shar va boshqalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Xuddi shu yoʻl bilan boshqa jismlarning hajmi chiqadi. Kesik konus: pi boʻlinsin 3 karra H karra R kvadrat plyus Rr plyus r kvadrat. Shar: aylana yarmini aylantirib, toʻrtdan uch pi R kub. Shar segmenti: uchdan bir pi H kvadrat karra 3R minus H. Silindr: y teng R gorizontal chiziq aylanadi — pi R kvadrat H.",
      easy: "Funksiyani tanlab, kesik konus, shar, segment va silindr hajmlarini olamiz.",
      draw: [
        { t: 'title', text: 'Hajm formulalari' },
        {
          t: 'table',
          x: 8,
          y: 18,
          rows: [
            ['jism', 'aylanuvchi chiziq', 'hajm'],
            ['silindr', 'y = R', 'πR²H'],
            ['kesik konus', 'kesma', '(π/3)H(R² + Rr + r²)'],
            ['shar', 'yarim aylana', '(4/3)πR³'],
            ['shar segmenti', 'aylana yoyi', '(π/3)H²(3R − H)']
          ]
        }
      ],
      next: 'Misollar'
    },
    {
      kind: 'example',
      clear: true,
      say: "55-mashq: y teng sinus x, x 0 dan pi gacha, Ox atrofida aylanadi. V teng pi karra sinus kvadrat x ning integrali. Sinus kvadrat x teng yarim karra 1 minus kosinus 2x, integral pi boʻlinsin 2. V teng pi kvadrat boʻlinsin 2. 56-mashq: y teng ildiz x, x 1 dan 4 gacha. V teng pi karra x ning integrali, yaʼni pi karra 16 minus 1 boʻlinsin 2, 7,5 pi.",
      easy: "Sinus uchun V = π²/2, ildiz x uchun V = 7,5π.",
      draw: [
        { t: 'title', text: 'Mashqlar' },
        { t: 'axes', id: 'g', x: 56, y: 14, w: 40, h: 34, xmin: 0, xmax: 3.4, ymin: 0, ymax: 1.2 },
        { t: 'curve', axes: 'g', points: SIN, color: 'red' },
        { t: 'list', x: 6, y: 20, items: ['y = sin x, [0; π]:', 'V = π∫ sin²x dx = π²/2', 'y = √x, [1; 4]:', 'V = π∫₁⁴ x dx = 7,5π'] }
      ],
      next: 'Oy atrofida-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Egri chiziqli trapetsiya Oy oʻqi atrofida aylansa, boshqa formula ishlatiladi: V teng 2 pi karra a dan b gacha x karra f(x) ning integrali. Bu yerda jism yupqa silindrik qatlamlardan yigʻiladi. Darslikda shu formula bilan konus va shar hajmi ham qayta chiqarilgan — natija bir xil.",
      easy: "Oy atrofida aylanishda: V = 2π ∫ x·f(x) dx.",
      draw: [
        { t: 'title', text: 'Oy atrofida aylanish' },
        { t: 'formula', x: 12, y: 22, text: 'V = 2π ∫ₐᵇ x·f(x) dx' },
        { t: 'text', x: 12, y: 40, text: 'yupqa silindrik qatlamlar', color: 'blue' },
        { t: 'text', x: 12, y: 54, text: 'konus: V = ⅓πR²H — yana shu natija', size: 's', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ox atrofida aylanish: V = π ∫ₐᵇ f²(x) dx.',
    'Oy atrofida aylanish: V = 2π ∫ₐᵇ x·f(x) dx.',
    'Shu formulalardan konus (⅓πR²H), shar (4/3·πR³), silindr (πR²H) hajmlari chiqadi.'
  ],
  questions: [
    {
      id: 'p42q1',
      prompt: 'y = √x, 0 ≤ x ≤ 4 grafigi Ox atrofida aylanadi. Hajm kπ. k ni toping.',
      hint: 'V = π∫₀⁴ x dx.',
      explanation: 'π · 16/2 = 8π.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'p42q2',
      prompt: 'y = x, 0 ≤ x ≤ 3 kesma Ox atrofida aylanadi (konus). Hajm kπ. k ni toping.',
      hint: 'V = π∫₀³ x² dx.',
      explanation: 'π · 27/3 = 9π. Tekshirish: ⅓π·3²·3 = 9π.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'p42q3',
      prompt: 'y = 2, 0 ≤ x ≤ 5 kesma Ox atrofida aylanadi. Hajm kπ. k ni toping.',
      hint: 'Silindr: R = 2, H = 5.',
      explanation: 'π · 4 · 5 = 20π.',
      widget: { type: 'number_answer', props: { answer: 20 } }
    },
    {
      id: 'p42q4',
      prompt: 'y = sin x, 0 ≤ x ≤ π grafigi Ox atrofida aylanadi. Hajmni toping (0,01 aniqlikda).',
      hint: 'V = π²/2.',
      explanation: 'π²/2 ≈ 4,93.',
      widget: { type: 'number_answer', props: { answer: 4.935, tolerance: 0.01 } }
    },
    {
      id: 'p42q5',
      prompt: 'Har bir jismga hajm formulasini moslang.',
      hint: 'Integral bilan chiqarilgan formulalar.',
      explanation: 'Konus — ⅓πR²H; shar — 4/3·πR³; silindr — πR²H; kesik konus — (π/3)H(R² + Rr + r²).',
      widget: {
        type: 'match_pairs',
        props: { pairs: [{ left: 'Konus', right: '⅓πR²H' }, { left: 'Shar', right: '(4/3)πR³' }, { left: 'Silindr', right: 'πR²H' }, { left: 'Kesik konus', right: '(π/3)H(R² + Rr + r²)' }] }
      }
    },
    {
      id: 'p42q6',
      prompt: 'y = −x² + 4, 0 ≤ x ≤ 2 grafigi Ox atrofida aylanadi. Hajm kπ. k ni toping (0,01 aniqlikda).',
      hint: '∫₀² (x⁴ − 8x² + 16) dx.',
      explanation: '32/5 − 64/3 + 32 = 256/15 ≈ 17,07.',
      widget: { type: 'number_answer', props: { answer: 17.067, tolerance: 0.01 } }
    },
    {
      id: 'p42q7',
      prompt: 'Oy oʻqi atrofida aylanishdagi hajm formulasi qaysi?',
      hint: 'Silindrik qatlamlar: 2πx · f(x) · dx.',
      explanation: 'V = 2π ∫ₐᵇ x·f(x) dx.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['V = π∫ f²(x) dx', 'V = 2π∫ x·f(x) dx', 'V = ∫ f(x) dx', 'V = π∫ x² dx'], answerIndex: 1 } }
    },
    {
      id: 'p42q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kesim — doira.',
      explanation: 'Ox atrofida kesim — radiusi f(x) doira; formula f² ni oʻz ichiga oladi; y = R chiziq silindr beradi; shar hajmi 4/3·πR³.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ox atrofida aylanishda x nuqtadagi kesim — radiusi f(x) boʻlgan doira.', value: true },
            { text: 'Ox atrofidagi hajm formulasi V = π∫ f(x) dx.', value: false },
            { text: 'y = R gorizontal kesma aylanib silindr hosil qiladi.', value: true },
            { text: 'Shar hajmi πR³.', value: false }
          ]
        }
      }
    }
  ]
};
