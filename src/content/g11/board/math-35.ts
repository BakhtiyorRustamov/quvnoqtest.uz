import type { BoardLesson } from './types';
import { cylinder } from './geo3d';

/** Darslik: Geometriya, 8-mavzu (172–174-betlar) — silindr va uning sirti. */
export const MATH_35: BoardLesson = {
  n: 35,
  label: "8.1",
  part: 'geometriya',
  title: "Silindr va uning sirtini hisoblash",
  section: 'Geometriya, 8',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Konserva bankasidan yorliqni ehtiyotlab koʻchirib oling va stol ustiga yoying. U qanday shaklga keldi? Toʻgʻri toʻrtburchakka! Uning bir tomoni — bankaning balandligi, ikkinchisi — asos aylanasining uzunligi. Demak, silindrning yon sirtini toʻgʻri toʻrtburchak yuzi kabi hisoblash mumkin.",
      easy: "Banka yorligʻi yoyilsa — toʻgʻri toʻrtburchak: boʻyi — balandlik, eni — aylana uzunligi.",
      draw: [
        { t: 'title', text: 'Banka yorligʻi' },
        ...cylinder('c', 22, 22, 12, 34, 'orange'),
        { t: 'point', id: 'r1', x: 46, y: 26, hide: true },
        { t: 'point', id: 'r2', x: 92, y: 26, hide: true },
        { t: 'point', id: 'r3', x: 92, y: 54, hide: true },
        { t: 'point', id: 'r4', x: 46, y: 54, hide: true },
        { t: 'polygon', points: ['r1', 'r2', 'r3', 'r4'], color: 'orange', fill: true },
        { t: 'text', x: 60, y: 62, text: '2πr', color: 'red' },
        { t: 'text', x: 93, y: 42, text: 'h', color: 'blue' }
      ],
      next: 'Silindr nima?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻgʻri toʻrtburchakni bir tomoni atrofida aylantirsak, silindr hosil boʻladi. Shu tomon — silindrning oʻqi. Qarama-qarshi tomon aylanib yon sirtni chizadi, u yasovchi deyiladi. Qolgan ikki tomon ikkita teng doira — asoslarni chizadi. Asoslar orasidagi masofa — balandlik, toʻgʻri silindrda u yasovchiga teng.",
      easy: "Toʻgʻri toʻrtburchak aylanib, silindr hosil qiladi: oʻq, yasovchi, ikkita asos.",
      draw: [
        { t: 'title', text: 'Silindr' },
        ...cylinder('s', 26, 20, 16, 38, 'blue'),
        { t: 'point', id: 'o1', x: 26, y: 20, label: 'O₁' },
        { t: 'point', id: 'o2', x: 26, y: 58, label: 'O' },
        { t: 'line', from: 'o1', to: 'o2', dashed: true },
        { t: 'line', from: 'o1', to: 'st0', color: 'red', label: 'r' },
        { t: 'list', x: 54, y: 22, items: ['OO₁ — oʻq', 'yasovchi l', 'asoslar — teng doiralar', 'toʻgʻri silindr: h = l'] }
      ],
      next: 'Oʻq kesimi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Silindrni oʻq orqali oʻtgan tekislik bilan kessak, toʻgʻri toʻrtburchak hosil boʻladi — bu oʻq kesimi. Uning bir tomoni asos diametri 2r, ikkinchisi balandlik h. Oʻqqa perpendikulyar kesim esa asosga teng doira. Darslikdagi 1-masala: oʻq kesimi yuzi Q boʻlgan kvadrat. Kvadrat tomoni ildiz Q — bu diametr. Asos yuzi pi karra ildiz Q boʻlinsin 2 ning kvadrati, yaʼni pi Q boʻlinsin 4.",
      easy: "Oʻq kesimi — toʻgʻri toʻrtburchak 2r × h. Kvadrat boʻlsa, tomoni diametrga teng.",
      draw: [
        { t: 'title', text: 'Oʻq kesimi' },
        ...cylinder('k', 24, 22, 14, 32),
        { t: 'point', id: 'a', x: 10, y: 22, hide: true },
        { t: 'point', id: 'b', x: 38, y: 22, hide: true },
        { t: 'point', id: 'c', x: 38, y: 54, hide: true },
        { t: 'point', id: 'd', x: 10, y: 54, hide: true },
        { t: 'polygon', points: ['a', 'b', 'c', 'd'], color: 'green', fill: true },
        { t: 'list', x: 50, y: 22, items: ['oʻq kesimi: 2r × h', 'kvadrat: 2r = h'] },
        { t: 'formula', x: 50, y: 44, text: 'S asos = π·(√Q/2)² = πQ/4' }
      ],
      next: 'Yon sirt formulasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi yorliqqa qaytamiz. Yon sirt yoyilmasi — toʻgʻri toʻrtburchak, eni aylana uzunligi 2 pi r, boʻyi yasovchi l. Shuning uchun S yon teng 2 pi r l. Toʻla sirt — yon sirt plyus ikkita asos: 2 pi r l plyus 2 pi r kvadrat, yaʼni 2 pi r karra l plyus r.",
      easy: "Yon sirt: 2πrl. Toʻla sirt: 2πr(l + r).",
      draw: [
        { t: 'title', text: 'Silindr sirti' },
        { t: 'formula', x: 10, y: 22, text: 'S yon = 2πrl' },
        { t: 'formula', x: 10, y: 38, text: 'S toʻla = 2πrl + 2πr² = 2πr(l + r)' },
        { t: 'text', x: 10, y: 58, text: 'yoyilma: toʻgʻri toʻrtburchak + 2 ta doira', size: 's', color: 'purple' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Apelsin sharbati idishi: radiusi 5 santimetr, balandligi 20 santimetr. Yon sirt — karton: 2 pi karra 5 karra 20 teng 200 pi, taxminan 628 kvadrat santimetr. Ikki asos — metall: 2 pi karra 25 teng 50 pi, taxminan 157. Toʻla sirt 250 pi, taxminan 785 kvadrat santimetr.",
      easy: "Yon sirt 200π ≈ 628, asoslar 50π ≈ 157, toʻla sirt 250π ≈ 785 sm².",
      draw: [
        { t: 'title', text: 'Sharbat idishi' },
        ...cylinder('j', 20, 20, 10, 36, 'orange'),
        { t: 'list', x: 40, y: 20, items: ['r = 5, l = 20', 'S yon = 2π·5·20 = 200π ≈ 628', '2·S asos = 2π·25 = 50π ≈ 157'] },
        { t: 'box', id: 'r', x: 40, y: 50, w: 48, h: 11, text: 'S toʻla = 250π ≈ 785 sm²', color: 'green' }
      ],
      next: 'Yana bitta'
    },
    {
      kind: 'example',
      clear: true,
      say: "Silindr asosining radiusi 3, balandligi 4. Oʻq kesimi — 6 ga 4 toʻgʻri toʻrtburchak, yuzi 24. Yon sirt 2 pi karra 3 karra 4 teng 24 pi. Toʻla sirt 2 pi karra 3 karra 4 plyus 3, yaʼni 42 pi.",
      easy: "r = 3, h = 4: oʻq kesimi 6 × 4, yon sirt 24π, toʻla sirt 42π.",
      draw: [
        { t: 'title', text: 'r = 3, h = 4' },
        { t: 'list', x: 6, y: 20, items: ['oʻq kesimi: 6 × 4, yuzi 24', 'S yon = 2π·3·4 = 24π', 'S toʻla = 2π·3·(4 + 3) = 42π'] },
        { t: 'box', id: 'r', x: 6, y: 50, w: 40, h: 11, text: 'S toʻla = 42π', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Silindr — toʻgʻri toʻrtburchakni bir tomoni atrofida aylantirishdan hosil boʻlgan jism; oʻq kesimi — 2r × h toʻgʻri toʻrtburchak.',
    'S yon = 2πrl (yoyilmasi — toʻgʻri toʻrtburchak).',
    'S toʻla = 2πr(l + r).'
  ],
  questions: [
    {
      id: 'm35q1',
      prompt: 'Silindr radiusi 3, yasovchisi 5. Yon sirti kπ koʻrinishida. k ni toping.',
      hint: 'S yon = 2πrl.',
      explanation: '2 · 3 · 5 = 30, S yon = 30π.',
      widget: { type: 'number_answer', props: { answer: 30 } }
    },
    {
      id: 'm35q2',
      prompt: 'Radiusi 2, balandligi 6 boʻlgan silindrning toʻla sirti kπ. k ni toping.',
      hint: '2πr(l + r).',
      explanation: '2 · 2 · (6 + 2) = 32 → 32π.',
      widget: { type: 'number_answer', props: { answer: 32 } }
    },
    {
      id: 'm35q3',
      prompt: 'Silindrning oʻq kesimi — tomoni 8 boʻlgan kvadrat. Asos radiusini toping.',
      hint: 'Kvadrat tomoni = diametr.',
      explanation: '2r = 8 → r = 4.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'm35q4',
      prompt: 'Radiusi 5, balandligi 10 silindrning oʻq kesimi yuzini toping.',
      hint: '2r · h.',
      explanation: '10 · 10 = 100.',
      widget: { type: 'number_answer', props: { answer: 100 } }
    },
    {
      id: 'm35q5',
      prompt: 'Silindr qismlarini ularning tavsifi bilan moslang.',
      hint: 'Toʻgʻri toʻrtburchak aylanishini tasavvur qiling.',
      explanation: 'Oʻq — aylanish oʻqi; yasovchi — yon sirtni chizuvchi kesma; asos — doira; oʻq kesimi — toʻgʻri toʻrtburchak.',
      widget: {
        type: 'match_pairs',
        props: { pairs: [{ left: 'Oʻq', right: 'aylanish chizigʻi' }, { left: 'Yasovchi', right: 'yon sirtni chizadi' }, { left: 'Asos', right: 'doira' }, { left: 'Oʻq kesimi', right: 'toʻgʻri toʻrtburchak' }] }
      }
    },
    {
      id: 'm35q6',
      prompt: 'Banka yorligʻi yoyilganda qanday shakl hosil boʻladi?',
      hint: 'Yon sirt yoyilmasi.',
      explanation: 'Silindr yon sirti yoyilmasi — toʻgʻri toʻrtburchak.',
      widget: { type: 'mcq', props: { prompt: 'Yon sirt yoyilmasi:', choices: ['Doira', 'Toʻgʻri toʻrtburchak', 'Uchburchak', 'Trapetsiya'], answerIndex: 1 } }
    },
    {
      id: 'm35q7',
      prompt: 'Gapni toʻldiring.',
      hint: 'Yon sirt formulasi.',
      explanation: 'S yon = 2πrl, S toʻla = S yon + 2πr².',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'S yon = ' }, { blank: '2πrl' }, { text: ',  S toʻla = S yon + ' }, { blank: '2πr²' }],
          bank: ['2πrl', '2πr²', 'πr²', 'πrl']
        }
      }
    },
    {
      id: 'm35q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Silindr xossalari.',
      explanation: 'Yasovchilar parallel va teng; asoslar teng doiralar; oʻqqa perpendikulyar kesim — doira; oʻq kesimi — toʻgʻri toʻrtburchak.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Silindrning yasovchilari parallel va teng.', value: true },
            { text: 'Silindrning oʻq kesimi — doira.', value: false },
            { text: 'Toʻgʻri silindrning balandligi yasovchisiga teng.', value: true },
            { text: 'Silindr asoslari har xil doiralar boʻlishi mumkin.', value: false }
          ]
        }
      }
    }
  ]
};
