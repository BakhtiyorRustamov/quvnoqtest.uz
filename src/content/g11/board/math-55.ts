import type { BoardLesson } from './types';

/** Darslik (2-qism): 68–70-mavzu (63–67-betlar) — korrelyatsiya koeffitsiyenti. */
export const MATH_55: BoardLesson = {
  n: 55,
  label: '70',
  part: 'algebra',
  qism: 2,
  title: 'Korrelyatsiya koeffitsiyenti: bogʻlanishni son bilan oʻlchash',
  section: '68–70',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Fermer toʻrtta gʻoʻzaga 1, 2, 4 va 5 gramm oʻgʻit soldi. Ularning kunlik oʻsishi 3, 3, 6 va 8 millimetr boʻldi. Diagrammada nuqtalar deyarli toʻgʻri chiziqda yotibdi. Lekin «deyarli» qanchalik? Bogʻlanish kuchini bitta son bilan ifodalash mumkin — bu korrelyatsiya koeffitsiyenti r.",
      easy: "Bogʻlanish kuchini bitta son — korrelyatsiya koeffitsiyenti r — koʻrsatadi.",
      draw: [
        { t: 'title', text: 'Oʻgʻit va oʻsish' },
        { t: 'axes', id: 'g', x: 8, y: 16, w: 50, h: 46, xmin: 0, xmax: 6, ymin: 0, ymax: 9, xlabel: 'oʻgʻit, g', ylabel: 'mm' },
        { t: 'dot', axes: 'g', x: 1, y: 3, color: 'green' },
        { t: 'dot', axes: 'g', x: 2, y: 3, color: 'green' },
        { t: 'dot', axes: 'g', x: 4, y: 6, color: 'green' },
        { t: 'dot', axes: 'g', x: 5, y: 8, color: 'green' },
        { t: 'table', x: 64, y: 20, rows: [['x', 'y'], ['1', '3'], ['2', '3'], ['4', '6'], ['5', '8']] }
      ],
      next: 'Formula'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Korrelyatsiya koeffitsiyenti formulasi: suratda x minus x̄ ning y minus ȳ ga koʻpaytmalari yigʻindisi, maxrajda esa x chetlanishlari kvadratlari yigʻindisi bilan y chetlanishlari kvadratlari yigʻindisi koʻpaytmasining ildizi. r doim minus 1 dan 1 gacha. Ishorasi yoʻnalishni, moduli kuchini koʻrsatadi.",
      easy: "r ∈ [−1; 1]. Ishora — yoʻnalish, kattaligi — kuch.",
      draw: [
        { t: 'title', text: 'Korrelyatsiya koeffitsiyenti' },
        { t: 'formula', x: 6, y: 20, text: 'r = Σ(x − x̄)(y − ȳ) / √( Σ(x − x̄)² · Σ(y − ȳ)² )' },
        { t: 'list', x: 6, y: 38, items: ['−1 ≤ r ≤ 1', 'r > 0 — musbat, r < 0 — manfiy', 'r = ±1 — nuqtalar bitta chiziqda'] }
      ],
      next: 'Hisoblaymiz'
    },
    {
      kind: 'example',
      clear: true,
      say: "x ning oʻrtachasi 12 boʻlinsin 4 teng 3, y ning oʻrtachasi 20 boʻlinsin 4 teng 5. Chetlanishlar jadvalini tuzamiz. Koʻpaytmalar yigʻindisi 13, x chetlanishlari kvadratlari yigʻindisi 10, y niki 18. r teng 13 boʻlinsin ildiz ostida 10 karra 18, taxminan 0,969. Bu juda kuchli musbat bogʻlanish.",
      easy: "r = 13 / √(10 · 18) ≈ 0,969 — juda kuchli musbat bogʻlanish.",
      draw: [
        { t: 'title', text: 'x̄ = 3, ȳ = 5' },
        {
          t: 'table',
          x: 6,
          y: 16,
          rows: [
            ['x − x̄', 'y − ȳ', 'koʻpaytma', '(x − x̄)²', '(y − ȳ)²'],
            ['−2', '−2', '4', '4', '4'],
            ['−1', '−2', '2', '1', '4'],
            ['1', '1', '1', '1', '1'],
            ['2', '3', '6', '4', '9']
          ]
        },
        { t: 'formula', x: 6, y: 54, text: 'r = 13 / √(10 · 18) ≈ 0,969' }
      ],
      next: 'r ni qanday oʻqiymiz?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "r ning modulini shkala bilan baholaymiz: 0,87 dan katta boʻlsa — kuchli bogʻlanish, 0,5 dan 0,87 gacha — oʻrtacha, 0,5 dan kichik — sust, 0 ga yaqin boʻlsa — chiziqli bogʻlanish deyarli yoʻq. Sportchilarning vazni va maksimal tezligi uchun r taxminan minus 0,813 — oʻrtacha manfiy bogʻlanish: ogʻirroq sportchi odatda sekinroq yuguradi.",
      easy: "|r| > 0,87 — kuchli, 0,5…0,87 — oʻrtacha, < 0,5 — sust.",
      draw: [
        { t: 'title', text: 'r shkalasi' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['|r|', 'bogʻlanish'],
            ['0,87 … 1', 'kuchli'],
            ['0,5 … 0,87', 'oʻrtacha'],
            ['0 … 0,5', 'sust'],
            ['≈ 0', 'deyarli yoʻq']
          ]
        },
        { t: 'list', x: 56, y: 22, items: ['vazn — tezlik:', 'r ≈ −0,813', 'oʻrtacha manfiy'] }
      ],
      next: 'Yana misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "5 ta firmada oylik maosh 1000, 1500, 2000, 2500 va 3000 ming soʻm, bir yilda ishdan ketganlar esa 60, 35, 20, 20 va 15 nafar. Maosh oshgan sari ketuvchilar kamaymoqda — r manfiy chiqadi. Hisoblasak, r taxminan minus 0,9 — kuchli manfiy bogʻlanish. Xulosa: yaxshi maosh xodimlarni ushlab qoladi.",
      easy: "Maosh ↑ → ketuvchilar ↓: r ≈ −0,9, kuchli manfiy.",
      draw: [
        { t: 'title', text: 'Maosh va ishdan ketish' },
        { t: 'axes', id: 'g', x: 8, y: 16, w: 50, h: 46, xmin: 500, xmax: 3300, ymin: 0, ymax: 65, xlabel: 'maosh', ylabel: 'nafar' },
        { t: 'dot', axes: 'g', x: 1000, y: 60, color: 'red' },
        { t: 'dot', axes: 'g', x: 1500, y: 35, color: 'red' },
        { t: 'dot', axes: 'g', x: 2000, y: 20, color: 'red' },
        { t: 'dot', axes: 'g', x: 2500, y: 20, color: 'red' },
        { t: 'dot', axes: 'g', x: 3000, y: 15, color: 'red' },
        { t: 'list', x: 64, y: 24, items: ['r ≈ −0,9', 'kuchli manfiy'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'r = Σ(x − x̄)(y − ȳ) / √(Σ(x − x̄)² · Σ(y − ȳ)²); −1 ≤ r ≤ 1.',
    'r > 0 — musbat, r < 0 — manfiy bogʻlanish; r = ±1 — nuqtalar bitta toʻgʻri chiziqda.',
    '|r| qancha 1 ga yaqin boʻlsa, chiziqli bogʻlanish shuncha kuchli.'
  ],
  questions: [
    {
      id: 'p55q1',
      prompt: 'x: 1, 2, 3 va y: 2, 4, 6 qatorlari uchun r nechaga teng?',
      hint: 'Nuqtalar bitta toʻgʻri chiziqda yotadi va oʻsadi.',
      explanation: 'y = 2x — nuqtalar oʻsuvchi toʻgʻri chiziqda, r = 1.',
      widget: { type: 'number_answer', props: { answer: 1, tolerance: 0.001 } }
    },
    {
      id: 'p55q2',
      prompt: 'x: 1, 2, 3 va y: 3, 2, 1 qatorlari uchun r nechaga teng?',
      hint: 'Nuqtalar kamayuvchi toʻgʻri chiziqda.',
      explanation: 'r = −1.',
      widget: { type: 'number_answer', props: { answer: -1, tolerance: 0.001 } }
    },
    {
      id: 'p55q3',
      prompt: 'Bolalar yoshi: 2, 5, 7, 5, 8; shifokorga tashriflar: 10, 6, 5, 4, 3. Σ(x − x̄)(y − ȳ) = −22,2; Σ(x − x̄)² = 21,2; Σ(y − ȳ)² = 29,2. r ni toping (0,01 gacha).',
      hint: 'r = −22,2 / √(21,2 · 29,2).',
      explanation: '√(21,2 · 29,2) ≈ 24,88; r ≈ −0,89 — kuchli manfiy bogʻlanish.',
      widget: { type: 'number_answer', props: { answer: -0.89, tolerance: 0.01 } }
    },
    {
      id: 'p55q4',
      prompt: 'r qiymatini bogʻlanish turi bilan moslang.',
      hint: 'Ishora — yoʻnalish, modul — kuch.',
      explanation: '0,95 — kuchli musbat; −0,7 — oʻrtacha manfiy; 0,3 — sust musbat; −0,95 — kuchli manfiy.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'r = 0,95', right: 'kuchli musbat' },
            { left: 'r = −0,7', right: 'oʻrtacha manfiy' },
            { left: 'r = 0,3', right: 'sust musbat' },
            { left: 'r = −0,95', right: 'kuchli manfiy' }
          ]
        }
      }
    },
    {
      id: 'p55q5',
      prompt: 'Qaysi r qiymati boʻlishi mumkin emas?',
      hint: 'r doim [−1; 1] kesmada.',
      explanation: '1,2 > 1 — korrelyatsiya koeffitsiyenti bunday boʻlmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['−0,98', '0', '1,2', '0,5'], answerIndex: 2 } }
    },
    {
      id: 'p55q6',
      prompt: 'r qiymatlarini kichigidan kattasiga tartiblang.',
      hint: 'Manfiylar avval.',
      explanation: '−0,9 < −0,4 < 0,1 < 0,8.',
      widget: { type: 'order_line', props: { items: [{ label: '−0,9' }, { label: '−0,4' }, { label: '0,1' }, { label: '0,8' }] } }
    },
    {
      id: 'p55q7',
      prompt: 'Maosh (ming soʻm): 1000, 1500, 2000, 2500, 3000; ishdan ketganlar: 60, 35, 20, 20, 15 nafar. Ishdan ketgan xodimlarning oʻrtacha maoshi qancha boʻlgan (ming soʻm)?',
      hint: 'Har bir maoshni ketganlar soniga koʻpaytiring, yigʻindini 150 ga boʻling.',
      explanation: '(60 000 + 52 500 + 40 000 + 50 000 + 45 000) : 150 = 247 500 : 150 = 1650.',
      widget: { type: 'number_answer', props: { answer: 1650 } }
    },
    {
      id: 'p55q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'r ishorasi va moduli nimani bildiradi?',
      explanation: 'r < 0 — manfiy bogʻlanish; r = 0 — chiziqli bogʻlanish yoʻq; |r| 1 ga yaqin — kuchli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'r < 0 boʻlsa, bogʻlanish manfiy.', value: true },
            { text: 'r = −0,95 sust bogʻlanishni bildiradi.', value: false },
            { text: 'r = 1 boʻlsa, barcha nuqtalar bitta oʻsuvchi toʻgʻri chiziqda yotadi.', value: true },
            { text: 'r ning qiymati 1 dan katta boʻlishi mumkin.', value: false }
          ]
        }
      }
    }
  ]
};
