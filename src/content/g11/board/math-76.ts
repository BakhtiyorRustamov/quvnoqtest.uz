import type { BoardLesson } from './types';

/** Darslik (2-qism): Geometriya, 15 (165–170-betlar) — sfera sirtining yuzi. */
export const MATH_76: BoardLesson = {
  n: 76,
  label: '15',
  part: 'geometriya',
  qism: 2,
  title: 'Sfera sirtining yuzini hisoblash',
  section: 'Geometriya, 15',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Radiusi 10 santimetr boʻlgan futbol toʻpini tikish uchun qancha teri kerak? Sferani tekislikka yoyib boʻlmaydi — silindr yoki konus kabi yoyilmasi yoʻq. Lekin Arximed ajoyib javob topgan: sfera yuzi uning toʻrtta katta doirasi yuziga teng!",
      easy: "Sfera yuzi = 4 ta katta doira yuzi.",
      draw: [
        { t: 'title', text: 'Toʻp uchun teri' },
        { t: 'icon', x: 14, y: 34, emoji: '⚽', size: 'l' },
        { t: 'ellipse', cx: 46, cy: 42, rx: 16, ry: 16, color: 'blue' },
        { t: 'ellipse', cx: 46, cy: 42, rx: 16, ry: 4.8, dashedBack: true, color: 'blue' },
        { t: 'formula', x: 68, y: 24, text: 'S = 4 π R²' },
        { t: 'text', x: 68, y: 44, text: '= 4 × πR²', color: 'green' }
      ],
      next: 'Nega 4πR²?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sferaga yoqlari juda kichik koʻpburchaklardan iborat koʻpyoqni tashqi chizamiz. Uning hajmi — uchi shar markazida, balandligi R boʻlgan piramidalar hajmlari yigʻindisi: uchdan bir S shtrix karra R. Yoqlarni cheksiz kichraytirsak, bu hajm shar hajmiga, S shtrix esa sfera yuziga yaqinlashadi: uchdan bir S R teng uchdan toʻrt pi R kub, bundan S teng 4 pi R kvadrat.",
      easy: "⅓ · S · R = 4/3 πR³ → S = 4πR².",
      draw: [
        { t: 'title', text: 'Keltirib chiqarish' },
        { t: 'list', x: 6, y: 20, items: ['koʻpyoq = mayda piramidalar', 'V ≈ ⅓ · S · R', '⅓ S R = 4/3 π R³'] },
        { t: 'formula', x: 6, y: 50, text: 'S = 4 π R²' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Radiusi 4 santimetr boʻlgan shar: sirti 4 pi karra 16, yaʼni 64 pi kvadrat santimetr; hajmi uchdan toʻrt pi karra 64, taxminan 268. Futbol toʻpi: R teng 10, sirti 400 pi, taxminan 1257 kvadrat santimetr; 10 foiz chiqitni hisobga olsak, taxminan 1382 kvadrat santimetr teri kerak.",
      easy: "R = 4: S = 64π. Toʻp R = 10: S ≈ 1257 cm², chiqit bilan ≈ 1382 cm².",
      draw: [
        { t: 'title', text: 'Hisoblaymiz' },
        { t: 'list', x: 6, y: 20, items: ['R = 4: S = 64π, V = 256π/3', 'toʻp R = 10: S = 400π ≈ 1257 cm²', '+10% chiqit: ≈ 1382 cm²'] }
      ],
      next: 'Sferik segment'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Shar segmentining egri sirti — sferik segment — yuzi 2 pi R h, bu yerda h — segment balandligi. h teng 2R boʻlsa, butun sfera 4 pi R kvadrat chiqadi. Yana bir foydali natija: R radiusli sharga tashqi chizilgan koʻpyoq hajmi uchdan bir S karra R, S — uning toʻla sirti.",
      easy: "Sferik segment: S = 2πRh. Sharga tashqi koʻpyoq: V = ⅓ S R.",
      draw: [
        { t: 'title', text: 'Sferik segment' },
        { t: 'ellipse', cx: 26, cy: 42, rx: 18, ry: 18, color: 'ink' },
        { t: 'ellipse', cx: 26, cy: 32, rx: 15, ry: 4.5, dashedBack: true, color: 'blue' },
        { t: 'formula', x: 52, y: 24, text: 'S = 2 π R h' },
        { t: 'formula', x: 52, y: 42, text: 'V koʻpyoq = ⅓ S R' }
      ],
      next: 'Oʻxshash sferalar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Radius k marta oshsa, sirt k kvadrat, hajm k kub marta oshadi. Mars diametri Yernikidan ikki marta kichik — sirti 4 marta kichik. Sharning hajmi 27 marta katta boʻlsa, radiusi 3 marta, sirti esa 9 marta katta. Pufak sirti 9 foiz oshsa, radiusi ildiz 1,09, yaʼni taxminan 4,4 foiz uzayadi.",
      easy: "Sirt k², hajm k³. Hajm 27 marta → sirt 9 marta.",
      draw: [
        { t: 'title', text: 'Radius, sirt, hajm' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['radius', 'sirt', 'hajm'],
            ['× 2', '× 4', '× 8'],
            ['× 3', '× 9', '× 27'],
            ['× k', '× k²', '× k³']
          ]
        },
        { t: 'icon', x: 82, y: 36, emoji: '🪐', size: 'l' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Sfera yuzi S = 4πR² — toʻrtta katta doira yuziga teng.',
    'Sferik segment yuzi 2πRh; sharning hajmi V = ⅓ S R.',
    'Radius k marta oshsa, sirt k², hajm k³ marta oshadi.'
  ],
  questions: [
    {
      id: 'g76q1',
      prompt: 'Sharning katta doirasi yuzi 3. Shar sirtining yuzini toping.',
      hint: 'S = 4 · πR².',
      explanation: '4 · 3 = 12.',
      widget: { type: 'number_answer', props: { answer: 12 } }
    },
    {
      id: 'g76q2',
      prompt: 'Sfera radiusi 3 marta kattalashtirilsa, uning sirti necha marta kattalashadi?',
      hint: 'k².',
      explanation: '9.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'g76q3',
      prompt: 'Shar tekislik bilan hajmlari 720π va 252π boʻlgan boʻlaklarga boʻlindi. Shar sirti k·π. k = ?',
      hint: '4/3 R³ = 972 → R = 9.',
      explanation: 'S = 4π · 81 = 324π.',
      widget: { type: 'number_answer', props: { answer: 324 } }
    },
    {
      id: 'g76q4',
      prompt: 'Sferaning radiusi 50% orttirilsa, sirti necha foiz koʻpayadi?',
      hint: '1,5² = 2,25.',
      explanation: '125%.',
      widget: { type: 'number_answer', props: { answer: 125, unit: '%' } }
    },
    {
      id: 'g76q5',
      prompt: 'Hajmi 125 boʻlgan kubga ichki chizilgan shar sirti k·π. k = ?',
      hint: 'a = 5, r = 2,5.',
      explanation: '4 · 6,25 = 25 → 25π.',
      widget: { type: 'number_answer', props: { answer: 25 } }
    },
    {
      id: 'g76q6',
      prompt: 'Radiusi 2 cm boʻlgan sharlarning nechtasidan radiusi 6 cm boʻlgan shar quyish mumkin?',
      hint: '(6/2)³.',
      explanation: '27 ta.',
      widget: { type: 'number_answer', props: { answer: 27 } }
    },
    {
      id: 'g76q7',
      prompt: 'Birinchi shar hajmi ikkinchisinikidan 27 marta katta. Sirti necha marta katta?',
      hint: 'k = 3.',
      explanation: '9 marta.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'g76q8',
      prompt: 'Sharni boʻyash uchun 100 g boʻyoq ketdi. Diametri 3 marta oshsa, qancha boʻyoq kerak?',
      hint: 'Sirt 9 marta oshadi.',
      explanation: '900 g.',
      widget: { type: 'number_answer', props: { answer: 900, unit: 'g' } }
    },
    {
      id: 'g76q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'S = 4πR², V = ⅓ S R.',
      explanation: 'Sfera = 4 katta doira; V = ⅓ S R; sferik segment 2πRh; sferaning tekis yoyilmasi yoʻq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sfera yuzi toʻrtta katta doira yuziga teng.', value: true },
            { text: 'Sferani silindr kabi tekislikka yoyib boʻladi.', value: false },
            { text: 'Shar hajmi V = ⅓ · S · R, S — sfera yuzi.', value: true },
            { text: 'Sferik segment yuzi π R h.', value: false }
          ]
        }
      }
    }
  ]
};
