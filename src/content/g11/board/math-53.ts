import type { BoardLesson } from './types';

/** Darslik (2-qism): 65–67-mavzu (54–56-betlar) — chetlanish va standart chetlanish. */
export const MATH_53: BoardLesson = {
  n: 53,
  label: '67',
  part: 'algebra',
  qism: 2,
  title: 'Maʼlumotlarning tarqoqligi: standart chetlanish',
  section: '65–67',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ikki merganning natijalari: Alining ochkolari 4, 5, 5, 6, Valiniki 1, 3, 7, 9. Ikkalasining oʻrtachasi 5! Lekin Ali barqaror, Vali esa goh juda yaxshi, goh juda yomon otadi. Oʻrta qiymat buni koʻrsatmaydi. Maʼlumotlarning oʻrtacha atrofida qanchalik tarqoqligini oʻlchash uchun standart chetlanish kerak.",
      easy: "Oʻrtachalar bir xil, lekin tarqoqlik har xil. Uni standart chetlanish oʻlchaydi.",
      draw: [
        { t: 'title', text: 'Ikki mergan' },
        { t: 'axes', id: 'g', x: 8, y: 16, w: 60, h: 40, xmin: 0, xmax: 10.5, ymin: 0, ymax: 3 },
        { t: 'dot', axes: 'g', x: 4, y: 2, color: 'blue' },
        { t: 'dot', axes: 'g', x: 5, y: 2.2, color: 'blue' },
        { t: 'dot', axes: 'g', x: 5, y: 1.8, color: 'blue' },
        { t: 'dot', axes: 'g', x: 6, y: 2, color: 'blue' },
        { t: 'dot', axes: 'g', x: 1, y: 1, color: 'red' },
        { t: 'dot', axes: 'g', x: 3, y: 1, color: 'red' },
        { t: 'dot', axes: 'g', x: 7, y: 1, color: 'red' },
        { t: 'dot', axes: 'g', x: 9, y: 1, color: 'red' },
        { t: 'curve', axes: 'g', points: [[5, 0], [5, 2.8]], color: 'green', dashed: true },
        { t: 'list', x: 72, y: 24, items: ['Ali: 4, 5, 5, 6', 'Vali: 1, 3, 7, 9', 'x̄ = 5 ikkalasida'] }
      ],
      next: 'Formula'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Har bir qiymatning oʻrtachadan farqi x i minus x̄ — chetlanish. Ularning yigʻindisi doim 0, shuning uchun kvadratga oshiramiz. Kvadratlar yigʻindisini n ga boʻlamiz va oʻlchov birligi mos boʻlishi uchun ildizdan chiqaramiz. Natija — standart chetlanish, s n.",
      easy: "Chetlanishlarni kvadratga oshiramiz, oʻrtachasini olamiz va ildiz chiqaramiz.",
      draw: [
        { t: 'title', text: 'Standart chetlanish' },
        { t: 'formula', x: 6, y: 20, text: 'sₙ = √( ((x₁ − x̄)² + … + (xₙ − x̄)²) / n )' },
        { t: 'list', x: 6, y: 38, items: ['1) x̄ ni topamiz', '2) har bir (xᵢ − x̄)² ni hisoblaymiz', '3) qoʻshib, n ga boʻlamiz va √ chiqaramiz'] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "7-misol: 2, 5, 4, 6, 7, 5, 6 qatori. Oʻrta qiymat 35 boʻlinsin 7 teng 5. Chetlanishlar: minus 3, minus 1, 0, 0, 1, 1, 2. Ularning kvadratlari: 9, 1, 0, 0, 1, 1, 4, yigʻindisi 16. Standart chetlanish ildiz ostida 16 boʻlinsin 7, taxminan 1,51.",
      easy: "x̄ = 5, kvadratlar yigʻindisi 16, sₙ = √(16/7) ≈ 1,51.",
      draw: [
        { t: 'title', text: '2, 5, 4, 6, 7, 5, 6' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['xᵢ', '2', '4', '5', '5', '6', '6', '7'],
            ['xᵢ − x̄', '−3', '−1', '0', '0', '1', '1', '2'],
            ['(xᵢ − x̄)²', '9', '1', '0', '0', '1', '1', '4']
          ]
        },
        { t: 'formula', x: 6, y: 46, text: 'sₙ = √(16 / 7) ≈ 1,51' }
      ],
      next: 'Chastotalar bilan'
    },
    {
      kind: 'example',
      clear: true,
      say: "Agar qiymatlar chastotalari bilan berilsa, har bir kvadratni chastotasiga koʻpaytiramiz. 8-misol: qiymatlar 1, 2, 3, 4, chastotalari 20, 15, 10, 5. Oʻrta qiymat 100 boʻlinsin 50 teng 2. Kvadrat chetlanishlar 1, 0, 1, 4; chastotaga koʻpaytirsak 20, 0, 10, 20, yigʻindisi 50. Standart chetlanish ildiz ostida 50 boʻlinsin 50, yaʼni 1.",
      easy: "sₙ = √(Σnᵢ(xᵢ − x̄)² / n) = √(50/50) = 1.",
      draw: [
        { t: 'title', text: 'Chastotali jadval' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['xᵢ', '1', '2', '3', '4'],
            ['nᵢ', '20', '15', '10', '5'],
            ['(xᵢ − x̄)²', '1', '0', '1', '4'],
            ['nᵢ(xᵢ − x̄)²', '20', '0', '10', '20']
          ]
        },
        { t: 'formula', x: 60, y: 22, text: 'x̄ = 100 : 50 = 2' },
        { t: 'formula', x: 60, y: 40, text: 'sₙ = √(50 / 50) = 1' }
      ],
      next: 'Merganlarga qaytamiz'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Alining chetlanishlari minus 1, 0, 0, 1: kvadratlar yigʻindisi 2, standart chetlanish ildiz ostida 2 boʻlinsin 4, taxminan 0,71. Valiniki minus 4, minus 2, 2, 4: kvadratlar yigʻindisi 40, standart chetlanish ildiz ostida 10, taxminan 3,16. Standart chetlanish kichik — maʼlumotlar oʻrtacha atrofida zich, katta — tarqoq.",
      easy: "Ali: s ≈ 0,71 (barqaror). Vali: s ≈ 3,16 (tarqoq).",
      draw: [
        { t: 'title', text: 'Kim barqaror?' },
        {
          t: 'table',
          x: 8,
          y: 18,
          rows: [
            ['', 'x̄', 'Σ(xᵢ − x̄)²', 'sₙ'],
            ['Ali', '5', '2', '≈ 0,71'],
            ['Vali', '5', '40', '≈ 3,16']
          ]
        },
        { t: 'text', x: 8, y: 50, text: 's kichik → zich,  s katta → tarqoq', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Chetlanish xᵢ − x̄ — qiymatning oʻrtachadan farqi; chetlanishlar yigʻindisi 0.',
    'sₙ = √(Σ(xᵢ − x̄)² / n); chastotali jadvalda sₙ = √(Σnᵢ(xᵢ − x̄)² / n).',
    'Standart chetlanish kichik boʻlsa, maʼlumotlar oʻrtacha atrofida zich joylashgan.'
  ],
  questions: [
    {
      id: 'p53q1',
      prompt: '2, 4, 4, 4, 5, 5, 7, 9 qatorining standart chetlanishini toping.',
      hint: 'x̄ = 5; kvadratlar: 9, 1, 1, 1, 0, 0, 4, 16.',
      explanation: 'Yigʻindi 32, 32 : 8 = 4, √4 = 2.',
      widget: { type: 'number_answer', props: { answer: 2, tolerance: 0.01 } }
    },
    {
      id: 'p53q2',
      prompt: '7, 7, 7, 7 qatorining standart chetlanishi?',
      hint: 'Hamma qiymat oʻrtachaga teng.',
      explanation: 'Barcha chetlanishlar 0, sₙ = 0.',
      widget: { type: 'number_answer', props: { answer: 0 } }
    },
    {
      id: 'p53q3',
      prompt: '1 va 3 sonlaridan iborat qatorning standart chetlanishi?',
      hint: 'x̄ = 2, chetlanishlar −1 va 1.',
      explanation: '√((1 + 1) / 2) = 1.',
      widget: { type: 'number_answer', props: { answer: 1, tolerance: 0.01 } }
    },
    {
      id: 'p53q4',
      prompt: '3, 5, 7 qatorining standart chetlanishi (0,01 gacha)?',
      hint: 'x̄ = 5; kvadratlar 4, 0, 4.',
      explanation: '√(8/3) ≈ 1,63.',
      widget: { type: 'number_answer', props: { answer: 1.63, tolerance: 0.01 } }
    },
    {
      id: 'p53q5',
      prompt: 'Standart chetlanishni hisoblash bosqichlarini tartiblang.',
      hint: 'Avval oʻrtacha.',
      explanation: 'x̄ → chetlanishlar → kvadratlar → yigʻindi : n → ildiz.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['Oʻrta qiymat x̄ ni topish', 'Har bir xᵢ − x̄ chetlanishni topish', 'Chetlanishlarni kvadratga oshirish', 'Kvadratlar yigʻindisini n ga boʻlish', 'Natijadan kvadrat ildiz chiqarish']
        }
      }
    },
    {
      id: 'p53q6',
      prompt: 'Qiymatlar 1, 2, 3; chastotalari 1, 2, 1. Standart chetlanishni toping (0,01 gacha).',
      hint: 'x̄ = 2; Σnᵢ(xᵢ − x̄)² = 1 + 0 + 1.',
      explanation: '√(2/4) ≈ 0,71.',
      widget: { type: 'number_answer', props: { answer: 0.71, tolerance: 0.01 } }
    },
    {
      id: 'p53q7',
      prompt: 'Qaysi qatorning standart chetlanishi eng katta?',
      hint: 'Qaysi qator eng tarqoq?',
      explanation: '0, 10, 0, 10 qatorida qiymatlar oʻrtachadan 5 ga uzoqlashgan — eng tarqoq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['5, 5, 5, 5', '4, 5, 5, 6', '3, 5, 5, 7', '0, 10, 0, 10'], answerIndex: 3 } }
    },
    {
      id: 'p53q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Chetlanishlar yigʻindisini eslang.',
      explanation: 'Chetlanishlar yigʻindisi 0; sₙ manfiy boʻlmaydi; bir xil x̄ li qatorlar turlicha tarqoq boʻlishi mumkin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Chetlanishlar (xᵢ − x̄) yigʻindisi har doim 0 ga teng.', value: true },
            { text: 'Standart chetlanish manfiy boʻlishi mumkin.', value: false },
            { text: 'Oʻrta qiymatlari teng qatorlarning standart chetlanishlari har xil boʻlishi mumkin.', value: true },
            { text: 'sₙ katta boʻlsa, maʼlumotlar oʻrtacha atrofida zich joylashgan.', value: false }
          ]
        }
      }
    }
  ]
};
