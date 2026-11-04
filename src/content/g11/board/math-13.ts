import type { BoardLesson } from './types';

/** f(x) = x³ − 3x + 3 (darslik, 4-misol) */
const F4: [number, number][] = [[-2, 1], [-1.5, 4.125], [-1, 5], [-0.5, 4.375], [0, 3], [0.5, 1.625], [1, 1], [1.5, 1.875], [2, 5]];

/** Darslik: 18–21-mavzu (43–44-betlar) — statsionar nuqtalar, lokal maksimum va minimum. */
export const MATH_13: BoardLesson = {
  n: 13,
  label: "19",
  part: 'algebra',
  title: "Statsionar nuqtalar va lokal ekstremumlar",
  section: '18–21',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Toʻpni yuqoriga otdingiz. U koʻtarilib boradi, eng baland nuqtada bir lahza toʻxtagandek boʻladi, keyin pastga tushadi. Aynan shu eng baland nuqtada urinma gorizontal, yaʼni hosila nolga teng. Bugun shunday nuqtalarni topishni oʻrganamiz.",
      easy: "Toʻp eng tepada bir zum yuqoriga ham, pastga ham harakatlanmaydi. Shu joyda hosila nol. Bunday nuqtalar juda muhim.",
      draw: [
        { t: 'title', text: 'Eng baland nuqta' },
        { t: 'icon', x: 12, y: 34, emoji: '🏀', size: 'l' },
        { t: 'axes', id: 'h', x: 28, y: 15, w: 62, h: 44, xmin: 0, xmax: 2.2, ymin: 0, ymax: 6, xlabel: 't', ylabel: 'h' },
        { t: 'curve', axes: 'h', points: [[0, 0], [0.25, 2.19], [0.5, 3.75], [0.75, 4.69], [1, 5], [1.25, 4.69], [1.5, 3.75], [1.75, 2.19], [2, 0]], color: 'orange' },
        { t: 'dot', axes: 'h', x: 1, y: 5, label: 'eng tepa', color: 'red' },
        { t: 'curve', axes: 'h', points: [[0.5, 5], [1.5, 5]], color: 'green', dashed: true },
        { t: 'text', x: 30, y: 65, text: 'Urinma gorizontal: hosila = 0', size: 's', color: 'green' }
      ],
      next: 'Bu qanday nuqta?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Funksiyaning hosilasi nolga teng boʻladigan nuqtalar statsionar nuqtalar deyiladi. Masalan, f(x) teng 2x kub minus 3x kvadrat minus 12x plyus 3. Hosilasini nolga tenglaymiz: 6x kvadrat minus 6x minus 12 teng nol. Tenglamani yechsak, x teng minus 1 va x teng 2 chiqadi. Bu ikkalasi statsionar nuqtalar.",
      easy: "Statsionar nuqta — hosila nol boʻlgan joy. Topish uchun hosilani nolga tenglab, tenglamani yechamiz.",
      draw: [
        { t: 'title', text: 'Statsionar nuqtalar' },
        { t: 'box', id: 'd', x: 5, y: 15, w: 90, h: 11, text: 'f′(x) = 0 boʻladigan nuqtalar — statsionar nuqtalar', color: 'purple' },
        { t: 'text', x: 6, y: 36, text: 'f(x) = 2x³ − 3x² − 12x + 3', size: 's' },
        { t: 'formula', x: 8, y: 47, text: 'f′(x) = 6x² − 6x − 12 = 0' },
        { t: 'formula', x: 8, y: 60, text: 'x₁ = −1,   x₂ = 2' }
      ],
      next: 'Ular nima beradi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar x nol dan chapda hosila musbat, oʻngda manfiy boʻlsa, funksiya avval oʻsib, keyin kamayadi. Demak, x nol — lokal maksimum nuqtasi, xuddi tepalik choʻqqisi. Aksincha, chapda manfiy, oʻngda musbat boʻlsa — lokal minimum, xuddi chuqurlik tubi. Lokal maksimum va minimumlar birgalikda ekstremumlar deyiladi.",
      easy: "Plyusdan minusga — tepalik, yaʼni maksimum. Minusdan plyusga — chuqurlik, yaʼni minimum.",
      draw: [
        { t: 'title', text: 'Tepalik va chuqurlik' },
        { t: 'axes', id: 'l', x: 6, y: 16, w: 40, h: 36, xmin: 0, xmax: 4, ymin: 0, ymax: 4 },
        { t: 'curve', axes: 'l', points: [[0, 0.5], [1, 2.6], [2, 3.4], [3, 2.6], [4, 0.5]], color: 'red' },
        { t: 'dot', axes: 'l', x: 2, y: 3.4, color: 'ink' },
        { t: 'text', x: 12, y: 30, text: '+', size: 'l', color: 'green' },
        { t: 'text', x: 37, y: 30, text: '−', size: 'l', color: 'red' },
        { t: 'axes', id: 'r', x: 54, y: 16, w: 40, h: 36, xmin: 0, xmax: 4, ymin: 0, ymax: 4 },
        { t: 'curve', axes: 'r', points: [[0, 3.5], [1, 1.4], [2, 0.6], [3, 1.4], [4, 3.5]], color: 'blue' },
        { t: 'dot', axes: 'r', x: 2, y: 0.6, color: 'ink' },
        { t: 'text', x: 60, y: 30, text: '−', size: 'l', color: 'red' },
        { t: 'text', x: 85, y: 30, text: '+', size: 'l', color: 'green' },
        { t: 'text', x: 6, y: 61, text: 'Lokal maksimum: + → −', size: 's', color: 'red' },
        { t: 'text', x: 54, y: 61, text: 'Lokal minimum: − → +', size: 's', color: 'blue' }
      ],
      next: 'Misol!'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi misol: f(x) teng x kub minus 3x plyus 3. Hosilasi 3 karra x minus 1 karra x plyus 1, u minus 1 va 1 nuqtalarda nolga teng. Ishoralar: plyus, minus, plyus. Demak, x teng minus 1 — lokal maksimum, funksiya qiymati 5. x teng 1 — lokal minimum, qiymati 1.",
      easy: "Ikki statsionar nuqta: minus 1 va 1. Minus 1 da plyusdan minusga — maksimum. 1 da minusdan plyusga — minimum.",
      draw: [
        { t: 'title', text: 'Misol: f(x) = x³ − 3x + 3' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 46, h: 52, xmin: -2, xmax: 2.2, ymin: 0, ymax: 6, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: F4, color: 'red' },
        { t: 'dot', axes: 'g', x: -1, y: 5, label: 'max', color: 'ink' },
        { t: 'dot', axes: 'g', x: 1, y: 1, label: 'min', color: 'ink' },
        { t: 'text', x: 56, y: 22, text: 'f′(x) = 3(x − 1)(x + 1)', size: 's' },
        { t: 'text', x: 56, y: 31, text: 'Ishoralar:  +   −   +', size: 's' },
        { t: 'text', x: 56, y: 42, text: 'x = −1: max, f = 5', color: 'red' },
        { t: 'text', x: 56, y: 52, text: 'x = 1: min, f = 1', color: 'blue' }
      ],
      next: 'Har doim shundaymi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Diqqat: har bir statsionar nuqta ham ekstremum emas! f(x) teng x kub funksiyani olaylik. Uning hosilasi 3x kvadrat, x teng nolda u nolga teng. Lekin nolning chapida ham, oʻngida ham hosila musbat: funksiya toʻxtamay oʻsishda davom etadi. Shuning uchun ishorani albatta tekshirish kerak.",
      easy: "x kubda nol nuqtada urinma gorizontal, lekin u yerda na tepalik, na chuqurlik bor. Ikki tomonda ham plyus — funksiya shunchaki oʻsishda davom etadi.",
      draw: [
        { t: 'title', text: 'Diqqat: tuzoq!' },
        { t: 'axes', id: 'c', x: 6, y: 14, w: 46, h: 52, xmin: -1.6, xmax: 1.6, ymin: -3.5, ymax: 3.5, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'c', points: [[-1.5, -3.375], [-1, -1], [-0.5, -0.125], [0, 0], [0.5, 0.125], [1, 1], [1.5, 3.375]], color: 'red' },
        { t: 'dot', axes: 'c', x: 0, y: 0, color: 'ink' },
        { t: 'formula', x: 58, y: 24, text: 'f(x) = x³' },
        { t: 'text', x: 56, y: 35, text: 'f′(x) = 3x²,  f′(0) = 0', size: 's' },
        { t: 'text', x: 56, y: 43, text: 'Ishoralar:  +   +', size: 's' },
        { t: 'box', id: 'w', x: 56, y: 50, w: 40, h: 14, text: 'Statsionar, lekin ekstremum emas!', color: 'red' }
      ],
      next: 'Ishorani tekshiraman!'
    },
    {
      kind: 'example',
      clear: true,
      say: "Yana bitta tezkor misol: f(x) teng x kvadrat minus 6x plyus 5. Hosila 2x minus 6, u x teng 3 da nolga teng. Chapda manfiy, oʻngda musbat, demak x teng 3 — lokal minimum. Funksiyaning qiymati: 9 minus 18 plyus 5, yaʼni minus 4. Bu parabolaning uchi!",
      easy: "Hosila nolga teng: x teng 3. Minusdan plyusga — minimum. Qiymati minus 4.",
      draw: [
        { t: 'title', text: 'Tezkor misol' },
        { t: 'text', x: 6, y: 20, text: 'f(x) = x² − 6x + 5' },
        { t: 'list', x: 6, y: 31, items: ['f′(x) = 2x − 6 = 0', 'x = 3:   − → +', 'min:  f(3) = −4'] },
        { t: 'axes', id: 'p', x: 54, y: 14, w: 42, h: 52, xmin: -0.5, xmax: 6.5, ymin: -5, ymax: 6, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'p', points: [[-0.1, 5.61], [1, 0], [2, -3], [3, -4], [4, -3], [5, 0], [6.1, 5.61]], color: 'blue' },
        { t: 'dot', axes: 'p', x: 3, y: -4, label: 'min', color: 'ink' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'f′(x) = 0 boʻladigan nuqtalar — statsionar nuqtalar.',
    'Hosila ishorasi + dan − ga oʻtsa — lokal maksimum, − dan + ga oʻtsa — lokal minimum.',
    'Lokal maksimum va lokal minimumlar ekstremumlar deyiladi.',
    'Statsionar nuqta har doim ham ekstremum emas: f(x) = x³ da x = 0.'
  ],
  questions: [
    {
      id: 'm13q1',
      prompt: 'f(x) = 2x² − 3x + 1 funksiyaning statsionar nuqtasini toping.',
      hint: 'f′(x) = 4x − 3 = 0.',
      explanation: '4x − 3 = 0 → x = 3/4 = 0,75.',
      widget: { type: 'number_answer', props: { answer: 0.75, tolerance: 0.0005 } }
    },
    {
      id: 'm13q2',
      prompt: 'f(x) = 9x − x³/3. Musbat statsionar nuqta x = ?',
      hint: 'f′(x) = 9 − x².',
      explanation: '9 − x² = 0 → x = ±3. Musbati: 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'm13q3',
      prompt: 'Grafikda lokal minimum nuqtasini bosing.',
      hint: 'Chuqurlik tubini qidiring: chapda tushadi, oʻngda koʻtariladi.',
      explanation: 'f(x) = x³ − 3x + 3 uchun lokal minimum (1; 1) nuqtada.',
      widget: {
        type: 'graph_tap',
        props: { target: [1, 1], radius: 0.4, graph: { xmin: -2, xmax: 2.2, ymin: 0, ymax: 6, xlabel: 'x', ylabel: 'y', curves: [{ points: F4 }] } }
      }
    },
    {
      id: 'm13q4',
      prompt: 'Har bir holatni uning nomi bilan juftlang.',
      hint: 'Plyusdan minusga — tepalik.',
      explanation: '+ → − — lokal maksimum; − → + — lokal minimum; + → + — ekstremum yoʻq; f′(x₀) = 0 — statsionar nuqta.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'f′: + → −', right: 'lokal maksimum' },
            { left: 'f′: − → +', right: 'lokal minimum' },
            { left: 'f′: + → +', right: 'ekstremum yoʻq' },
            { left: 'f′(x₀) = 0', right: 'statsionar nuqta' }
          ]
        }
      }
    },
    {
      id: 'm13q5',
      prompt: 'f(x) = −x² + 4x + 1 funksiyaning lokal maksimum qiymatini toping.',
      hint: 'f′(x) = −2x + 4 = 0 → x = 2. Keyin f(2) ni hisoblang.',
      explanation: 'x = 2: + → −, maksimum. f(2) = −4 + 8 + 1 = 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'm13q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'x³ misolini eslang.',
      explanation: 'x³ da x = 0 statsionar, lekin ekstremum emas. x² da 0 — minimum. Maksimum va minimum — ekstremumlar.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Har bir statsionar nuqta ekstremum nuqtasi boʻladi.', value: false },
            { text: 'f(x) = x² funksiya uchun x = 0 — lokal minimum.', value: true },
            { text: 'Lokal maksimum va minimum birgalikda ekstremumlar deyiladi.', value: true },
            { text: 'f(x) = x³ funksiya uchun x = 0 — lokal maksimum.', value: false }
          ]
        }
      }
    },
    {
      id: 'm13q7',
      prompt: 'Qaysi funksiyalarning x = 0 da ekstremumi bor? Hammasini belgilang.',
      hint: 'Nol atrofida hosila ishorasini oʻzgartiradimi?',
      explanation: 'x², x⁴ — minimum; −x², cos x — maksimum. x³ va 5x da ekstremum yoʻq.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { text: 'x²', match: true },
            { text: 'x³', match: false },
            { text: '−x²', match: true },
            { text: 'x⁴', match: true },
            { text: '5x', match: false },
            { text: 'cos x', match: true }
          ]
        }
      }
    },
    {
      id: 'm13q8',
      prompt: 'Lokal ekstremumlarni topish bosqichlarini toʻgʻri tartibda bosing.',
      hint: 'Avval hosila, oxirida funksiya qiymatlari.',
      explanation: 'f′ → statsionar nuqtalar → ishoralar → max/min → qiymatlar.',
      widget: {
        type: 'step_order',
        props: {
          steps: [
            'f′(x) ni toping',
            'f′(x) = 0 dan statsionar nuqtalarni toping',
            'Har bir nuqta atrofida f′ ishorasini tekshiring',
            '+ → − maksimum, − → + minimum deb belgilang',
            'Shu nuqtalardagi funksiya qiymatlarini hisoblang'
          ]
        }
      }
    }
  ]
};
