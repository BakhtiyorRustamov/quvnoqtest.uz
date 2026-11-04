import type { BoardLesson } from './types';

/** Darslik: 40–43-mavzu (86–88-betlar) — integrallar jadvali, integrallashning sodda qoidalari. */
export const MATH_23: BoardLesson = {
  n: 23,
  label: "40–41",
  part: 'algebra',
  title: "Integrallar jadvali va sodda qoidalar",
  section: '40–43',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Boshlangʻich sinfda karra jadvalini yodlagansiz. Endi 7 karra 8 ni har safar qoʻshib hisoblamaysiz — darhol 56 deysiz. Integrallar uchun ham shunday jadval bor. Uni bilsangiz, koʻp integrallarni bir zumda yozasiz.",
      easy: "Karra jadvali hisobni tezlashtiradi. Integrallar jadvali ham xuddi shunday.",
      draw: [
        { t: 'title', text: 'Jadval — tezlik' },
        { t: 'icon', x: 12, y: 30, emoji: '📋', size: 'l' },
        { t: 'box', id: 'a', x: 30, y: 22, w: 30, h: 12, text: '7 × 8 = 56', color: 'blue' },
        { t: 'box', id: 'b', x: 30, y: 42, w: 46, h: 12, text: '∫ cos x dx = sin x + C', color: 'green' },
        { t: 'text', x: 30, y: 64, text: 'Yodda boʻlsa — bir zumda!', color: 'purple' }
      ],
      next: 'Jadvalni koʻraylik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Jadvalning birinchi qismi: x ning p darajasi, 1 boʻlinsin x, e ning x darajasi, sinus va kosinus. Diqqat: sinus x ning integrali minus kosinus x, chunki minus kosinusning hosilasi sinus.",
      easy: "Sinus integralida minus ishora chiqadi: minus kosinus x.",
      draw: [
        { t: 'title', text: 'Jadval (1)' },
        {
          t: 'table',
          x: 14,
          y: 18,
          rows: [
            ['f(x)', '∫ f(x) dx'],
            ['xᵖ, p ≠ −1', 'xᵖ⁺¹/(p + 1) + C'],
            ['1/x', 'ln|x| + C'],
            ['eˣ', 'eˣ + C'],
            ['sin x', '−cos x + C'],
            ['cos x', 'sin x + C']
          ]
        }
      ],
      next: 'Davomi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikkinchi qism: 1 boʻlinsin kosinus kvadrat x — tangens x, 1 boʻlinsin sinus kvadrat x — minus kotangens x, a ning x darajasi — a ning x darajasi boʻlinsin ln a, 1 boʻlinsin 1 plyus x kvadrat — arktangens x. Va juda foydali qoida: f(kx plyus b) ning integrali — 1 boʻlinsin k karra F(kx plyus b).",
      easy: "Ichida kx plyus b boʻlsa, oddiy javobni yozib, k ga boʻlamiz.",
      draw: [
        { t: 'title', text: 'Jadval (2)' },
        {
          t: 'table',
          x: 14,
          y: 18,
          rows: [
            ['f(x)', '∫ f(x) dx'],
            ['1/cos²x', 'tg x + C'],
            ['1/sin²x', '−ctg x + C'],
            ['aˣ', 'aˣ/ln a + C'],
            ['1/(1 + x²)', 'arctg x + C']
          ]
        },
        { t: 'box', id: 'k', x: 6, y: 52, w: 88, h: 12, text: '∫ f(kx + b) dx = (1/k)·F(kx + b) + C', color: 'orange' }
      ],
      next: 'Qoidalar-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikki sodda qoida. Birinchi: oʻzgarmas koʻpaytuvchini integral belgisidan tashqariga chiqarish mumkin. Ikkinchi: yigʻindining integrali integrallar yigʻindisiga teng. Darslikdagi 2-misol: 8x yettinchi daraja plyus 2 kosinus 2x ning integrali. 8 karra x sakkizinchi daraja boʻlinsin 8, yaʼni x sakkizinchi daraja. 2 karra yarim sinus 2x, yaʼni sinus 2x. Javob: x sakkizinchi daraja plyus sinus 2x plyus C.",
      easy: "Sonni tashqariga chiqaramiz, yigʻindini boʻlib integrallaymiz.",
      draw: [
        { t: 'title', text: 'Ikki qoida' },
        { t: 'list', x: 6, y: 20, items: ['1) ∫ a·f(x) dx = a·∫ f(x) dx', '2) ∫ (f ± g) dx = ∫ f dx ± ∫ g dx'] },
        { t: 'formula', x: 6, y: 42, text: '∫ (8x⁷ + 2cos 2x) dx = x⁸ + sin 2x + C' }
      ],
      next: 'Yana misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "1-misol: 5 sinus 3x plyus 2 ning integrali. 5 ni tashqariga chiqaramiz. Sinus 3x plyus 2 ning integrali jadvalga koʻra: minus uchdan bir kosinus 3x plyus 2. Javob: minus besh uchdan kosinus 3x plyus 2 plyus C.",
      easy: "Sinus integrali minus kosinus, k teng 3 ga boʻlamiz, 5 ga koʻpaytiramiz.",
      draw: [
        { t: 'title', text: '1-misol' },
        { t: 'formula', x: 6, y: 20, text: '∫ 5 sin(3x + 2) dx' },
        { t: 'list', x: 6, y: 34, items: ['= 5·∫ sin(3x + 2) dx', '= 5·(−⅓)·cos(3x + 2) + C'] },
        { t: 'box', id: 'r', x: 6, y: 52, w: 52, h: 11, text: '−(5/3)·cos(3x + 2) + C', color: 'green' }
      ],
      next: 'kx + b qoidasi'
    },
    {
      kind: 'example',
      clear: true,
      say: "kx plyus b qoidasiga yana ikki misol. 1 boʻlinsin 5x minus 8 ning integrali: beshdan bir ln modul 5x minus 8 plyus C. e ning 2x plyus 3 darajasi: yarim e ning 2x plyus 3 darajasi plyus C. Har doim oddiy javobni yozib, x oldidagi songa boʻlamiz.",
      easy: "Oddiy javobni yozamiz va x oldidagi songa boʻlamiz.",
      draw: [
        { t: 'title', text: '∫ f(kx + b) dx' },
        { t: 'formula', x: 6, y: 20, text: '∫ dx/(5x − 8) = (1/5)·ln|5x − 8| + C' },
        { t: 'formula', x: 6, y: 36, text: '∫ e^{2x + 3} dx = ½·e^{2x + 3} + C' },
        { t: 'text', x: 6, y: 56, text: 'k ga boʻlishni unutmang!', color: 'red' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Integrallar jadvalini bilish koʻp integrallarni darhol yozish imkonini beradi.',
    '∫ a·f dx = a·∫ f dx;  ∫ (f ± g) dx = ∫ f dx ± ∫ g dx.',
    '∫ f(kx + b) dx = (1/k)·F(kx + b) + C.'
  ],
  questions: [
    {
      id: 'm23q1',
      prompt: '∫ (3x² + 4x) dx ni toping.',
      hint: 'Har bir hadni alohida integrallang.',
      explanation: '∫ 3x² dx = x³, ∫ 4x dx = 2x². Javob: x³ + 2x² + C.',
      widget: { type: 'expression_answer', props: { answer: 'x^3+2*x^2', prefix: '=', plusC: true, keys: ['x', '²', '³', '+', '−', 'C'] } }
    },
    {
      id: 'm23q2',
      prompt: '∫ cos 5x dx ni toping.',
      hint: 'sin 5x ni yozib, 5 ga boʻling.',
      explanation: '∫ cos 5x dx = (1/5)·sin 5x + C.',
      widget: { type: 'expression_answer', props: { answer: 'sin(5*x)/5', prefix: '=', plusC: true, keys: ['sin', 'cos', 'x', '(', ')', '/', 'C'] } }
    },
    {
      id: 'm23q3',
      prompt: '∫ e³ˣ dx ni toping.',
      hint: 'eˣ jadvali va k = 3.',
      explanation: '∫ e³ˣ dx = (1/3)·e³ˣ + C.',
      widget: { type: 'expression_answer', props: { answer: 'e^(3*x)/3', prefix: '=', plusC: true, keys: ['e', '^', '(', ')', 'x', '/', 'C'] } }
    },
    {
      id: 'm23q4',
      prompt: '∫ (2x − 1)³ dx ni toping.',
      hint: 'u⁴/4 ni yozib, k = 2 ga boʻling.',
      explanation: '∫ (2x − 1)³ dx = (2x − 1)⁴/8 + C.',
      widget: { type: 'expression_answer', props: { answer: '(2*x-1)^4/8', prefix: '=', plusC: true, keys: ['x', '(', ')', '^', '/', '−', 'C'] } }
    },
    {
      id: 'm23q5',
      prompt: 'Jadvaldan: har bir funksiyaga uning integralini moslang.',
      hint: 'Jadvalning ikkinchi qismini eslang.',
      explanation: '1/cos²x → tg x, 1/sin²x → −ctg x, 1/(1 + x²) → arctg x, aˣ → aˣ/ln a.',
      widget: {
        type: 'match_pairs',
        props: { pairs: [{ left: '1/cos²x', right: 'tg x + C' }, { left: '1/sin²x', right: '−ctg x + C' }, { left: '1/(1 + x²)', right: 'arctg x + C' }, { left: 'aˣ', right: 'aˣ/ln a + C' }] }
      }
    },
    {
      id: 'm23q6',
      prompt: 'Qaysilari ∫ sin 3x dx ning qiymati boʻlishi mumkin? Hammasini belgilab, Tekshirish ni bosing.',
      hint: '−⅓cos 3x ga istalgan son qoʻshish mumkin.',
      explanation: '−⅓cos 3x, −⅓cos 3x + 5 va −⅓cos 3x − 2 toʻgʻri. ⅓cos 3x da ishora, −3cos 3x da koeffitsiyent xato.',
      widget: {
        type: 'pick_many',
        props: { options: [{ label: '−⅓cos 3x', correct: true }, { label: '−⅓cos 3x + 5', correct: true }, { label: '⅓cos 3x' }, { label: '−3cos 3x' }, { label: '−⅓cos 3x − 2', correct: true }] }
      }
    },
    {
      id: 'm23q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Koʻpaytmaning integrali uchun oddiy qoida yoʻq.',
      explanation: 'Yigʻindi va oʻzgarmas koʻpaytuvchi qoidalari bor; koʻpaytma uchun bunday qoida yoʻq. ∫ sin x dx = −cos x + C.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '∫ (f + g) dx = ∫ f dx + ∫ g dx.', value: true },
            { text: '∫ f·g dx = ∫ f dx · ∫ g dx.', value: false },
            { text: '∫ 5f(x) dx = 5∫ f(x) dx.', value: true },
            { text: '∫ sin x dx = cos x + C.', value: false }
          ]
        }
      }
    },
    {
      id: 'm23q8',
      prompt: 'F(x) = ∫ (4x³ + 2x) dx va F(0) = 0. F(1) ni toping.',
      hint: 'F(x) = x⁴ + x² + C, C = 0.',
      explanation: 'F(1) = 1 + 1 = 2.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    }
  ]
};
