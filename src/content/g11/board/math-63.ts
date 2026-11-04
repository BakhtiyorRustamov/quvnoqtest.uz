import type { BoardLesson } from './types';

/** Takrorlash (savollar): darslik 2-qism, IV bob, 86–93 — algebra va analiz asoslarini takrorlash. */
export const MATH_63: BoardLesson = {
  n: 63,
  label: '86–93',
  part: 'algebra',
  qism: 2,
  title: 'Takrorlash: algebra va analiz asoslari',
  section: '86–93',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'p63q1',
      prompt: 'a ning qanday qiymatida (5 − a)x = a − 5 tenglamaning ildizlari cheksiz koʻp boʻladi?',
      hint: '0 · x = 0 boʻlishi kerak.',
      explanation: 'a = 5 da 0 · x = 0 — istalgan x ildiz.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'p63q2',
      prompt: '2x + 5y = 12, 3x − 4y = −5 sistemaning yechimi (x; y) boʻlsa, x² + y² ni toping.',
      hint: 'Avval x va y ni qoʻshish usuli bilan toping.',
      explanation: 'x = 1, y = 2, x² + y² = 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'p63q3',
      prompt: 'x² ≤ 2 tengsizlikning nechta butun yechimi bor?',
      hint: '−√2 ≤ x ≤ √2.',
      explanation: '−1, 0, 1 — 3 ta.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'p63q4',
      prompt: '2, 5, 8, … arifmetik progressiyaning dastlabki 15 ta hadi yigʻindisini toping.',
      hint: 'a₁₅ = 2 + 14 · 3 = 44.',
      explanation: 'S₁₅ = (2 + 44) · 15 / 2 = 345.',
      widget: { type: 'number_answer', props: { answer: 345 } }
    },
    {
      id: 'p63q5',
      prompt: 'Ikki xonali, 3 ga karrali barcha sonlar yigʻindisini toping.',
      hint: '12, 15, …, 99 — 30 ta had.',
      explanation: '(12 + 99) · 30 / 2 = 1665.',
      widget: { type: 'number_answer', props: { answer: 1665 } }
    },
    {
      id: 'p63q6',
      prompt: '1 + 1/2 + 1/4 + … cheksiz kamayuvchi geometrik progressiya yigʻindisi?',
      hint: 'S = b₁ / (1 − q).',
      explanation: '1 / (1 − 1/2) = 2.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'p63q7',
      prompt: 'Savdogar 100 000 000 soʻmni yillik 14% foyda bilan bankka qoʻyib, 148 154 400 soʻm oldi. Necha yilga qoʻyilgan?',
      hint: '1,14ⁿ = 1,481544.',
      explanation: '1,14³ = 1,481544 → 3 yil.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'yil' } }
    },
    {
      id: 'p63q8',
      prompt: 'Qiymatlarni oʻsish tartibida joylashtiring.',
      hint: 'cos 180° = −1, sin 30° = 0,5, cos 30° ≈ 0,87, sin 90° = 1.',
      explanation: 'cos 180° < sin 30° < cos 30° < sin 90°.',
      widget: { type: 'order_line', props: { items: [{ label: 'cos 180°' }, { label: 'sin 30°' }, { label: 'cos 30°' }, { label: 'sin 90°' }] } }
    },
    {
      id: 'p63q9',
      prompt: 'Logarifmni qiymati bilan moslang.',
      hint: 'a^(logₐ b) = b; logₐ aᵏ = k.',
      explanation: 'log₂ 8 = 3; log₃ 9 = 2; 6^(log₆ 50) = 50; lg 0,1 = −1.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'log₂ 8', right: '3' },
            { left: 'log₃ 9', right: '2' },
            { left: '6^(log₆ 50)', right: '50' },
            { left: 'lg 0,1', right: '−1' }
          ]
        }
      }
    },
    {
      id: 'p63q10',
      prompt: 'y = 4x³ − 2x² + x − 5 funksiyaning hosilasini toping.',
      hint: '(xⁿ)′ = n xⁿ⁻¹.',
      explanation: "y′ = 12x² − 4x + 1.",
      widget: { type: 'expression_answer', props: { answer: '12*x^2 - 4*x + 1', prefix: "y′ =", keys: ['x', '^', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'p63q11',
      prompt: 'y = 2x³ − 9x² + 12x − 8 funksiyaning maksimum qiymatini toping.',
      hint: 'y′ = 6(x − 1)(x − 2); x = 1 da maksimum.',
      explanation: 'y(1) = 2 − 9 + 12 − 8 = −3 (x = 2 da minimum −4).',
      widget: { type: 'number_answer', props: { answer: -3 } }
    },
    {
      id: 'p63q12',
      prompt: 'y = 2x² − 5x + 4 grafigiga x = 3 abssissali nuqtada oʻtkazilgan urinma tenglamasini yozing.',
      hint: 'y(3) = 7, y′ = 4x − 5, y′(3) = 7.',
      explanation: 'y − 7 = 7(x − 3) → y = 7x − 14.',
      widget: { type: 'expression_answer', props: { answer: '7*x - 14', prefix: 'y =', keys: ['x', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'p63q13',
      prompt: 'y = x², y = 0, x = 2 chiziqlar bilan chegaralangan shakl yuzini toping (0,01 gacha).',
      hint: '∫₀² x² dx.',
      explanation: 'x³/3 |₀² = 8/3 ≈ 2,67.',
      widget: { type: 'number_answer', props: { answer: 2.667, tolerance: 0.01 } }
    },
    {
      id: 'p63q14',
      prompt: '∫ sin x dx ni 0 dan π gacha hisoblang.',
      hint: '−cos x.',
      explanation: '−cos π + cos 0 = 2.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'p63q15',
      prompt: 'Ikkita kub tashlanib, ikki xonali son hosil qilindi. Uning raqamlari yigʻindisi 4 ga boʻlinish ehtimolligi?',
      hint: 'Yigʻindi 4, 8 yoki 12: 3 + 5 + 1 ta juftlik.',
      explanation: '9/36 = 0,25.',
      widget: { type: 'number_answer', props: { answer: 0.25, tolerance: 0.001 } }
    },
    {
      id: 'p63q16',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Har birini tekshiring.',
      explanation: 'x² − 7x + 10 < 0 yechimi (2; 5); sin x = 1,5 yechimga ega emas; log₆ 7 > log₇ 6; ∫₋₂² x³ dx = 0.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'x² − 7x + 10 < 0 tengsizlikning yechimi (2; 5).', value: true },
            { text: 'sin x = 1,5 tenglama cheksiz koʻp yechimga ega.', value: false },
            { text: 'log₆ 7 > log₇ 6.', value: true },
            { text: '∫ x³ dx (−2 dan 2 gacha) = 8.', value: false }
          ]
        }
      }
    }
  ]
};
