import type { BoardLesson } from './types';

/** Darslik (2-qism): 71–73-mavzu (71–77-betlar) — ehtimollikning klassik va statistik taʼriflari. */
export const MATH_57: BoardLesson = {
  n: 57,
  label: '72–73',
  part: 'algebra',
  qism: 2,
  title: 'Ehtimollik: klassik va statistik taʼrif',
  section: '71–73',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Xaltada 10 ta shar bor: 9 tasi oq, 1 tasi qora. Qaramasdan bittasini olamiz. Qaysi rang chiqishi imkoniyati koʻproq? Albatta, oq! Barcha imkoniyatlar 10 ta, shundan 9 tasi oq shar chiqishiga qulaylik tugʻdiradi. Ishonchimizni 9 boʻlinsin 10 soni bilan oʻlchash tabiiy.",
      easy: "10 ta imkoniyatdan 9 tasi oq — oq chiqishiga ishonch 9/10.",
      draw: [
        { t: 'title', text: '9 oq, 1 qora' },
        { t: 'icon', x: 14, y: 34, emoji: '👜', size: 'l' },
        { t: 'list', x: 30, y: 22, items: ['barcha imkoniyatlar: 10', 'oq chiqishiga qulay: 9'] },
        { t: 'formula', x: 30, y: 44, text: 'P(oq) = 9/10' }
      ],
      next: 'Taʼrif'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tajribaning barcha teng imkoniyatli natijalari n ta, ulardan k tasi A hodisaga qulaylik tugʻdirsin. U holda A hodisaning ehtimolligi P(A) teng k boʻlinsin n. Bu ehtimollikning klassik taʼrifi. Muqarrar hodisada k teng n, ehtimollik 1. Mumkin boʻlmagan hodisada k teng 0, ehtimollik 0. Demak, har doim 0 dan 1 gacha.",
      easy: "P(A) = qulay imkoniyatlar : barcha imkoniyatlar. 0 ≤ P(A) ≤ 1.",
      draw: [
        { t: 'title', text: 'Klassik taʼrif' },
        { t: 'formula', x: 6, y: 20, text: 'P(A) = k / n' },
        { t: 'list', x: 6, y: 36, items: ['k — qulay imkoniyatlar soni', 'n — barcha imkoniyatlar soni', 'P(U) = 1,  P(V) = 0,  0 ≤ P(A) ≤ 1'] }
      ],
      next: 'Misollar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tanga tashlanganda gerb chiqishi: n teng 2, k teng 1, ehtimollik bir ikkinchi. Kubda juft raqam: 2, 4, 6 — 3 ta qulay, 6 ta barcha, ehtimollik bir ikkinchi. Idishda 10 ta oq va 20 ta koʻk shar: oq chiqishi 10 boʻlinsin 30, yaʼni bir uchinchi, koʻk — uchdan ikki.",
      easy: "P(gerb) = 1/2, P(juft) = 3/6 = 1/2, P(oq) = 10/30 = 1/3.",
      draw: [
        { t: 'title', text: 'Hisoblaymiz' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['tajriba', 'hodisa', 'k / n', 'P'],
            ['tanga', 'gerb', '1 / 2', '0,5'],
            ['kub', 'juft raqam', '3 / 6', '0,5'],
            ['10 oq, 20 koʻk', 'oq shar', '10 / 30', '1/3'],
            ['10 oq, 20 koʻk', 'koʻk shar', '20 / 30', '2/3']
          ]
        }
      ],
      next: 'Ikkita kub'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ikkita kub tashlanganda 36 ta teng imkoniyatli juftlik bor. Yigʻindi 2 boʻlishi uchun faqat bitta: 1 va 1. Yigʻindi 7 boʻlishi uchun esa 6 ta: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1. Shuning uchun 7 eng koʻp chiqadi: ehtimolligi 6 boʻlinsin 36, yaʼni oltidan bir.",
      easy: "Yigʻindi 7 — 6 ta usul: P = 6/36 = 1/6. Yigʻindi 2 — 1/36.",
      draw: [
        { t: 'title', text: 'Ikki kub yigʻindisi' },
        {
          t: 'bars',
          x: 6,
          y: 18,
          w: 62,
          h: 36,
          items: [
            { label: '2', value: 1 }, { label: '3', value: 2 }, { label: '4', value: 3 }, { label: '5', value: 4 }, { label: '6', value: 5 }, { label: '7', value: 6 },
            { label: '8', value: 5 }, { label: '9', value: 4 }, { label: '10', value: 3 }, { label: '11', value: 2 }, { label: '12', value: 1 }
          ],
          color: 'purple'
        },
        { t: 'list', x: 72, y: 24, items: ['jami: 36', 'P(7) = 6/36', 'P(2) = 1/36'] }
      ],
      next: 'Tajribada-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gerb chiqish ehtimolligi bir ikkinchi degani — 100 tashlashda aniq 50 ta gerb chiqadi, degani emas. Olimlar tangani minglab marta tashlagan: Byuffon 4040 martada 2048 ta gerb, chastota 0,5069; Pirson 24 ming martada 12012 ta, chastota 0,5005. Tajribalar soni oshgan sari chastota bir ikkinchiga yaqinlashadi. Shunday topilgan son statistik ehtimollik deyiladi.",
      easy: "Koʻp tajribada chastota μ/n ehtimollikka yaqinlashadi — statistik ehtimollik.",
      draw: [
        { t: 'title', text: 'Statistik ehtimollik' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['kim', 'n', 'μ (gerb)', 'μ / n'],
            ['Byuffon', '4040', '2048', '0,5069'],
            ['Pirson', '12000', '6019', '0,5016'],
            ['Pirson', '24000', '12012', '0,5005']
          ]
        },
        { t: 'formula', x: 6, y: 52, text: 'μ / n ≈ p  (n katta boʻlsa)' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Klassik taʼrif: P(A) = k/n — qulay imkoniyatlar soni : barcha teng imkoniyatli natijalar soni.',
    'P(U) = 1, P(V) = 0, istalgan hodisa uchun 0 ≤ P(A) ≤ 1.',
    'Koʻp tajribada chastota μ/n ehtimollikka yaqinlashadi — statistik ehtimollik.'
  ],
  questions: [
    {
      id: 'p57q1',
      prompt: '1000 ta mahsulotdan 20 tasi yaroqsiz. Tavakkaliga olingan mahsulot yaroqsiz boʻlish ehtimolligi necha foiz?',
      hint: '20/1000.',
      explanation: '20/1000 = 0,02 = 2%.',
      widget: { type: 'number_answer', props: { answer: 2, unit: '%' } }
    },
    {
      id: 'p57q2',
      prompt: 'Savatda 30 ta olma va 20 ta nok bor. Tavakkaliga olingan meva nok boʻlish ehtimolligi?',
      hint: '20/50.',
      explanation: '20/50 = 0,4.',
      widget: { type: 'number_answer', props: { answer: 0.4, tolerance: 0.001 } }
    },
    {
      id: 'p57q3',
      prompt: 'Idishda 1 dan 15 gacha raqamlangan 15 ta shar bor. Olingan shardagi son 3 ga boʻlinish ehtimolligi (0,01 gacha)?',
      hint: '3, 6, 9, 12, 15.',
      explanation: '5/15 = 1/3 ≈ 0,33.',
      widget: { type: 'number_answer', props: { answer: 0.333, tolerance: 0.005 } }
    },
    {
      id: 'p57q4',
      prompt: 'Ikkita kub tashlandi. Raqamlar yigʻindisi 7 boʻlish ehtimolligi (0,001 gacha)?',
      hint: '6 ta qulay juftlik, 36 ta barcha.',
      explanation: '6/36 = 1/6 ≈ 0,167.',
      widget: { type: 'number_answer', props: { answer: 0.1667, tolerance: 0.001 } }
    },
    {
      id: 'p57q5',
      prompt: 'Hamidulla 50 ta variantdan 5 tasini yechishni bilmaydi. Unga tushgan variantni bilish ehtimolligi necha foiz?',
      hint: 'Biladigan variantlar: 45.',
      explanation: '45/50 = 0,9 = 90%.',
      widget: { type: 'number_answer', props: { answer: 90, unit: '%' } }
    },
    {
      id: 'p57q6',
      prompt: 'Kub yoqlari oq yoki yashilga boʻyalgan. Oq yoq chiqish ehtimolligi 1/3. Nechta yoq oq?',
      hint: 'k/6 = 1/3.',
      explanation: 'k = 2: 2 ta oq, 4 ta yashil yoq.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'p57q7',
      prompt: 'Ehtimolliklarni kichigidan kattasiga tartiblang (kub bir marta tashlanadi).',
      hint: 'Har birida qulay imkoniyatlarni sanang.',
      explanation: '7 chiqishi — 0; 6 chiqishi — 1/6; juft chiqishi — 1/2; 1…6 dan biri — 1.',
      widget: { type: 'order_line', props: { items: [{ label: '7 chiqishi' }, { label: '6 chiqishi' }, { label: 'juft raqam chiqishi' }, { label: '1–6 dan biri chiqishi' }] } }
    },
    {
      id: 'p57q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Statistik ehtimollikni eslang.',
      explanation: '150 ta chipta yutuqni kafolatlamaydi; P(A) 1 dan katta boʻlmaydi; koʻp tajribada chastota ehtimollikka yaqin; oldingi yutuq keyingisiga taʼsir qilmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Har 150 chiptadan biri yutuqli» boʻlsa, 150 ta chipta olgan odam albatta yutadi.', value: false },
            { text: 'Tanga koʻp marta tashlansa, gerblar ulushi 0,5 ga yaqin boʻladi.', value: true },
            { text: 'Ehtimollik 1,5 ga teng boʻlishi mumkin.', value: false },
            { text: 'Muqarrar hodisaning ehtimolligi 1 ga teng.', value: true }
          ]
        }
      }
    }
  ]
};
