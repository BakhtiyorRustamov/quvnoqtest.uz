import type { BoardLesson } from './types';
import type { DrawOp } from '@/lib/lab/plan';
import { pt, type V3 } from './geo3d';

const O: [number, number] = [20, 54];
const S = 7;
const P = (id: string, p: V3, label?: string, hide?: boolean) => pt(id, p, label, O, S, hide);

/** Toʻrtburchakli piramida (asos tomoni 4, balandlik 5,5) va uning oʻrtasidan oʻtgan parallel kesim. */
function cutPyramid(): DrawOp[] {
  const h = 2.75;
  return [
    P('A', [4, 0, 0], 'A'), P('B', [4, 4, 0], 'B'), P('C', [0, 4, 0], 'C'), P('D', [0, 0, 0], 'D'), P('S', [2, 2, 5.5], 'S'),
    P('A1', [3, 1, h]), P('B1', [3, 3, h]), P('C1', [1, 3, h]), P('D1', [1, 1, h]),
    { t: 'line', from: 'A', to: 'B' }, { t: 'line', from: 'B', to: 'C' },
    { t: 'line', from: 'A', to: 'D', dashed: true }, { t: 'line', from: 'D', to: 'C', dashed: true },
    { t: 'line', from: 'S', to: 'A' }, { t: 'line', from: 'S', to: 'B' }, { t: 'line', from: 'S', to: 'C' }, { t: 'line', from: 'S', to: 'D', dashed: true },
    { t: 'line', from: 'A1', to: 'B1', color: 'blue' }, { t: 'line', from: 'B1', to: 'C1', color: 'blue' },
    { t: 'line', from: 'C1', to: 'D1', color: 'blue', dashed: true }, { t: 'line', from: 'D1', to: 'A1', color: 'blue', dashed: true }
  ];
}

/** Darslik (2-qism): Geometriya, 10.4–10.5 (124–126-betlar) — kesik piramida hajmi, oʻxshash jismlarning hajmlari. */
export const MATH_67: BoardLesson = {
  n: 67,
  label: '10.4–10.5',
  part: 'geometriya',
  qism: 2,
  title: 'Kesik piramida hajmi va oʻxshash jismlar',
  section: 'Geometriya, 10.4–10.5',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Kesik piramida shaklidagi tuvakka qancha tuproq sigʻadi? Uni butun piramidagacha toʻldiramiz: kesik piramida — katta piramidadan kichik piramidani olib tashlaganda qolgan qism. Demak, uning hajmi ikki piramida hajmlarining ayirmasi: V teng V1 minus V2.",
      easy: "Kesik piramida = katta piramida − kichik piramida.",
      draw: [
        { t: 'title', text: 'Katta minus kichik' },
        ...cutPyramid(),
        { t: 'formula', x: 58, y: 24, text: 'V = V₁ − V₂' },
        { t: 'list', x: 58, y: 40, items: ['V₁ — butun piramida', 'V₂ — kichik piramida'] }
      ],
      next: 'Formula'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ayirmani hisoblab, oʻxshashlikdan foydalansak, chiroyli formula chiqadi. Balandligi H, asoslarining yuzlari Q1 va Q2 boʻlgan kesik piramidaning hajmi: V teng uchdan bir H, karra Q1 plyus ildiz Q1 Q2 plyus Q2. Agar Q2 nolga teng boʻlsa, piramida formulasi, Q1 teng Q2 boʻlsa, prizma formulasi hosil boʻladi.",
      easy: "V = ⅓ H (Q₁ + √(Q₁Q₂) + Q₂).",
      draw: [
        { t: 'title', text: 'Kesik piramida hajmi' },
        { t: 'formula', x: 6, y: 22, text: 'V = ⅓ · H · (Q₁ + √(Q₁Q₂) + Q₂)' },
        { t: 'list', x: 6, y: 40, items: ['Q₂ = 0 → piramida: ⅓ Q₁H', 'Q₁ = Q₂ = Q → prizma: QH'] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Asoslarining yuzlari 18 va 8 kvadrat detsimetr, balandligi 6 detsimetr boʻlgan kesik piramidaning hajmi. Ildiz ostida 18 karra 8, yaʼni ildiz 144 teng 12. V teng uchdan bir karra 6 karra 18 plyus 12 plyus 8, yaʼni 2 karra 38 teng 76 kub detsimetr.",
      easy: "√(18 · 8) = 12, V = ⅓ · 6 · (18 + 12 + 8) = 76 dm³.",
      draw: [
        { t: 'title', text: 'Q₁ = 18, Q₂ = 8, H = 6' },
        { t: 'list', x: 6, y: 20, items: ['√(Q₁Q₂) = √144 = 12', 'Q₁ + √(Q₁Q₂) + Q₂ = 38'] },
        { t: 'formula', x: 6, y: 44, text: 'V = ⅓ · 6 · 38 = 76 dm³' }
      ],
      next: 'Oʻxshash jismlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻxshash jismlarning chiziqli oʻlchamlari k marta farq qilsa, yuzlari k kvadrat marta, hajmlari esa k kub marta farq qiladi. Teorema: ikki oʻxshash jism hajmlarining nisbati mos chiziqli oʻlchamlari nisbatining kubiga teng. Masalan, qirralari 2 marta katta kub hajmi 8 marta katta.",
      easy: "V₁ / V = k³. Oʻlchamlar 2 marta → hajm 8 marta.",
      draw: [
        { t: 'title', text: 'Oʻxshash jismlar' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['', 'nisbat'],
            ['uzunlik', 'k'],
            ['yuza', 'k²'],
            ['hajm', 'k³']
          ]
        },
        { t: 'list', x: 50, y: 22, items: ['k = 2 → hajm 8 marta', 'k = 3 → hajm 27 marta', 'model 1 : 10 → hajm 1 : 1000'] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Piramida balandligining oʻrtasidan asosga parallel tekislik oʻtkazildi. U qanday nisbatda hajmni boʻladi? Kesilgan kichik piramida berilganiga oʻxshash, k teng bir ikkinchi. Hajmi sakkizdan bir qism. Qolgan kesik piramida — sakkizdan yetti. Demak, hajm 1 ga 7 nisbatda boʻlinadi.",
      easy: "k = ½ → kichik piramida 1/8, kesik qismi 7/8: nisbat 1 : 7.",
      draw: [
        { t: 'title', text: 'Balandlik oʻrtasidan' },
        ...cutPyramid(),
        { t: 'list', x: 58, y: 20, items: ['k = ½', 'kichik: (½)³ = ⅛', 'kesik qism: ⅞'] },
        { t: 'formula', x: 58, y: 48, text: '1 : 7' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Kesik piramida hajmi: V = ⅓ H (Q₁ + √(Q₁Q₂) + Q₂).',
    'Oʻxshash jismlar: uzunliklar k, yuzalar k², hajmlar k³ marta farq qiladi.',
    'Balandlik oʻrtasidan oʻtgan parallel kesim piramida hajmini 1 : 7 nisbatda boʻladi.'
  ],
  questions: [
    {
      id: 'g67q1',
      prompt: 'Asoslarining yuzlari 50 va 8, balandligi 3 boʻlgan kesik piramida hajmini toping.',
      hint: '√(50 · 8) = 20.',
      explanation: 'V = ⅓ · 3 · (50 + 20 + 8) = 78.',
      widget: { type: 'number_answer', props: { answer: 78 } }
    },
    {
      id: 'g67q2',
      prompt: 'Toʻrtburchakli muntazam kesik piramida asoslarining tomonlari 6 va 3, balandligi 4. Hajmini toping.',
      hint: 'Q₁ = 36, Q₂ = 9, √(Q₁Q₂) = 18.',
      explanation: 'V = ⅓ · 4 · (36 + 18 + 9) = 84.',
      widget: { type: 'number_answer', props: { answer: 84 } }
    },
    {
      id: 'g67q3',
      prompt: 'Ikki oʻxshash piramida balandliklari 2 : 5 nisbatda. Kichigining hajmi 16. Kattasining hajmi?',
      hint: 'Hajmlar nisbati (5/2)³.',
      explanation: '16 · 125/8 = 250.',
      widget: { type: 'number_answer', props: { answer: 250 } }
    },
    {
      id: 'g67q4',
      prompt: 'Piramida balandligining oʻrtasidan parallel tekislik oʻtkazildi. Kichik piramida hajmining butun piramida hajmiga nisbati?',
      hint: '(½)³.',
      explanation: '1/8 = 0,125.',
      widget: { type: 'number_answer', props: { answer: 0.125, tolerance: 0.001 } }
    },
    {
      id: 'g67q5',
      prompt: 'Hajmi 24 boʻlgan piramida balandligining oʻrtasidan parallel kesildi. Hosil boʻlgan kesik piramida hajmi?',
      hint: 'Kichik piramida 24/8.',
      explanation: '24 − 3 = 21.',
      widget: { type: 'number_answer', props: { answer: 21 } }
    },
    {
      id: 'g67q6',
      prompt: 'Uzunlik nisbati k ga mos nisbatlarni moslang.',
      hint: 'Uzunlik — k, yuza — k², hajm — k³.',
      explanation: 'k = 2: yuza 4, hajm 8; k = 3: yuza 9, hajm 27.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'k = 2, yuzalar' }, b: { label: '4 marta' } },
            { a: { label: 'k = 2, hajmlar' }, b: { label: '8 marta' } },
            { a: { label: 'k = 3, yuzalar' }, b: { label: '9 marta' } },
            { a: { label: 'k = 3, hajmlar' }, b: { label: '27 marta' } }
          ]
        }
      }
    },
    {
      id: 'g67q7',
      prompt: 'Kesik piramida hajmini topish bosqichlarini tartiblang.',
      hint: 'Avval yuzlar.',
      explanation: 'Q₁, Q₂ → √(Q₁Q₂) → yigʻindi → ⅓ H ga koʻpaytirish.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['Asoslar yuzlari Q₁ va Q₂ ni topish', '√(Q₁Q₂) ni hisoblash', 'Q₁ + √(Q₁Q₂) + Q₂ ni qoʻshish', 'Natijani ⅓ H ga koʻpaytirish']
        }
      }
    },
    {
      id: 'g67q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Hajmlar k³ marta.',
      explanation: 'Model 1:100 da hajm 1 000 000 marta kichik; Q₁ = Q₂ da formula prizmanikiga aylanadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻxshash jismlar hajmlari nisbati chiziqli oʻlchamlar nisbatining kubiga teng.', value: true },
            { text: '1 : 100 masshtabli modelning hajmi asl jismnikidan 100 marta kichik.', value: false },
            { text: 'Q₁ = Q₂ boʻlsa, kesik piramida formulasi prizma hajmini beradi.', value: true },
            { text: 'Kesik piramida hajmi ⅓ H (Q₁ + Q₂) ga teng.', value: false }
          ]
        }
      }
    }
  ]
};
