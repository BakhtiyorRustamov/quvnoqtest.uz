import type { BoardLesson } from './types';
import { BOB4 } from './fizika-23';
import { seg, wave } from './phys';

/** Darslik: Fizika 11, 31-mavzu (115–116-betlar) — laboratoriya ishi: yoritilganlikning yorugʻlik kuchiga bogʻliqligi (namuna oʻlchashlar bilan). */
export const FIZ_33: BoardLesson = {
  n: 33,
  label: '31',
  group: BOB4,
  title: 'Laboratoriya: yoritilganlik va yorugʻlik kuchi',
  section: '31-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Bugungi laboratoriya ishida lyuksmetr yordamida ikki narsani tekshiramiz: yoritilganlik manbaning yorugʻlik kuchiga toʻgʻri proporsionalmi, va masofa kvadratiga teskari proporsionalmi? Buning uchun ikki lampa va lyuksmetrdan foydalanamiz.",
      easy: "Lyuksmetr bilan E ~ I va E ~ 1/r² ni tekshiramiz.",
      draw: [
        { t: 'title', text: 'Ishning maqsadi' },
        { t: 'icon', x: 16, y: 34, emoji: '💡', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '📏', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['E ~ I ni tekshirish', 'E ~ 1/r² ni tekshirish', 'asbob — lyuksmetr'] }
      ],
      next: 'Qurilma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Qurilma: bir chiziqda 1-lampa, oʻrtada lyuksmetr fotoelementi, narida 2-lampa. 1-lampa kuchlanishi oʻzgaradigan manbaga, 2-lampa nominal kuchlanishga ulanadi — uning yorugʻlik kuchi maʼlum, 100 kandela. 1-lampagacha masofa r1 oʻzgarmas — 0,5 metr. 2-lampani surib, lyuksmetr bir xil koʻrsatadigan r2 masofani topamiz.",
      easy: "1-lampa (oʻzgaruvchan), lyuksmetr, 2-lampa (100 cd). r₁ = 0,5 m.",
      draw: [
        { t: 'title', text: 'Qurilma' },
        ...seg('rail', 6, 50, 94, 50, 'ink'),
        { t: 'icon', x: 10, y: 42, emoji: '💡', size: 'm' },
        { t: 'text', x: 6, y: 58, text: '1-lampa', size: 's' },
        { t: 'icon', x: 40, y: 42, emoji: '📟', size: 'm' },
        { t: 'text', x: 34, y: 58, text: 'lyuksmetr', size: 's' },
        { t: 'icon', x: 86, y: 42, emoji: '💡', size: 'm' },
        { t: 'text', x: 80, y: 58, text: '2-lampa', size: 's' },
        { t: 'text', x: 22, y: 64, text: 'r₁', color: 'blue' },
        { t: 'text', x: 62, y: 64, text: 'r₂', color: 'red' }
      ],
      next: 'Hisoblash'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikki lampa lyuksmetrni bir xil yoritsa, I1 boʻlinsin r1 kvadrat teng I2 boʻlinsin r2 kvadrat. Bundan 1-lampaning yorugʻlik kuchi: I1 teng I2 karra r1 kvadrat boʻlinsin r2 kvadrat. Yoritilganlik esa E teng I1 boʻlinsin r1 kvadrat. Kuchlanishni 40, 80, 120, 160 va 200 voltga oʻzgartirib, har safar oʻlchaymiz.",
      easy: "I₁ = I₂·r₁²/r₂², E = I₁/r₁².",
      draw: [
        { t: 'title', text: 'Formulalar' },
        { t: 'formula', x: 6, y: 22, text: 'I₁ / r₁² = I₂ / r₂²' },
        { t: 'formula', x: 6, y: 38, text: 'I₁ = I₂ · r₁² / r₂²' },
        { t: 'formula', x: 6, y: 54, text: 'E = I₁ / r₁²' }
      ],
      next: 'Natijalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Namuna natijalar: 40 voltda r2 teng 1,77 metr, demak I1 taxminan 8 kandela va E taxminan 32 lyuks. 200 voltda r2 0,51 metr — I1 taxminan 98 kandela, E taxminan 392 lyuks. Yorugʻlik kuchi necha marta oshsa, yoritilganlik ham shuncha marta oshdi.",
      easy: "I oshsa, E ham shuncha marta oshadi.",
      draw: [
        { t: 'title', text: 'Oʻlchash natijalari (r₁ = 0,5 m)' },
        {
          t: 'table',
          x: 6,
          y: 22,
          rows: [
            ['U, V', 'r₂, m', 'I₁, cd', 'E, lx'],
            ['40', '1,77', '8', '32'],
            ['80', '1,02', '24', '96'],
            ['120', '0,75', '45', '180'],
            ['160', '0,60', '70', '280'],
            ['200', '0,51', '98', '392']
          ]
        }
      ],
      next: 'Grafiklar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Chap grafik: E ning I ga bogʻliqligi — koordinata boshidan oʻtuvchi toʻgʻri chiziq, demak E yorugʻlik kuchiga toʻgʻri proporsional. Ikkinchi tajribada 100 kandelali lampadan masofani oʻzgartirdik: 0,5 metrda 400 lyuks, 1 metrda 100, 2 metrda 25. Oʻng grafik — giperbolasimon egri: masofa 2 marta oshsa, yoritilganlik 4 marta kamayadi.",
      easy: "E ~ I (toʻgʻri chiziq) va E ~ 1/r² (egri).",
      draw: [
        { t: 'title', text: 'E(I) va E(r) grafiklari' },
        { t: 'axes', id: 'a', x: 6, y: 18, w: 40, h: 42, xmin: 0, xmax: 100, ymin: 0, ymax: 420, xlabel: 'I, cd', ylabel: 'E, lx' },
        { t: 'curve', axes: 'a', points: [[0, 0], [100, 400]], color: 'blue' },
        { t: 'dot', axes: 'a', x: 8, y: 32 },
        { t: 'dot', axes: 'a', x: 45, y: 180 },
        { t: 'dot', axes: 'a', x: 98, y: 392 },
        { t: 'axes', id: 'b', x: 54, y: 18, w: 40, h: 42, xmin: 0, xmax: 2.2, ymin: 0, ymax: 420, xlabel: 'r, m', ylabel: 'E, lx' },
        { t: 'curve', axes: 'b', points: wave((r) => 100 / (r * r), 0.49, 2.2), color: 'red' }
      ],
      next: 'Xulosa'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tekshiramiz: 120 voltda r2 teng 0,75 metr. I1 teng 100 karra 0,25 boʻlinsin 0,5625 — taxminan 44 kandela. E teng 44 boʻlinsin 0,25 — taxminan 178 lyuks. Jadvalga mos! Xulosa: yoritilganlik yorugʻlik kuchiga toʻgʻri, masofa kvadratiga teskari proporsional.",
      easy: "I₁ = 100 · 0,25 / 0,5625 ≈ 44 cd, E ≈ 178 lx.",
      draw: [
        { t: 'title', text: 'Bitta qatorni tekshiramiz' },
        { t: 'formula', x: 6, y: 24, text: 'I₁ = 100 · 0,5² / 0,75² ≈ 44 cd' },
        { t: 'formula', x: 6, y: 40, text: 'E = 44 / 0,5² ≈ 178 lx' },
        { t: 'text', x: 6, y: 58, text: 'E ~ I,   E ~ 1 / r²  ✓', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ikki lampa bir xil yoritganda I₁/r₁² = I₂/r₂² — bundan nomaʼlum yorugʻlik kuchi topiladi.',
    'Tajriba: E(I) grafigi koordinata boshidan oʻtuvchi toʻgʻri chiziq — E ~ I.',
    'Masofa 2 marta oshsa, yoritilganlik 4 marta kamayadi — E ~ 1/r².'
  ],
  questions: [
    {
      id: 'f33q1',
      prompt: 'I₂ = 100 cd, r₁ = 0,5 m, tenglik r₂ = 1 m da topildi. 1-lampaning yorugʻlik kuchi necha cd?',
      hint: 'I₁ = I₂ · r₁² / r₂².',
      explanation: '100 · 0,25 / 1 = 25 cd.',
      widget: { type: 'number_answer', props: { answer: 25, unit: 'cd' } }
    },
    {
      id: 'f33q2',
      prompt: 'Yorugʻlik kuchi 25 cd lampadan 0,5 m masofadagi yoritilganlik necha lx?',
      hint: 'E = I / r².',
      explanation: '25 / 0,25 = 100 lx.',
      widget: { type: 'number_answer', props: { answer: 100, unit: 'lx' } }
    },
    {
      id: 'f33q3',
      prompt: '100 cd lampadan 1,5 m masofada yoritilganlik necha lx? (0,1 gacha)',
      hint: 'E = I / r².',
      explanation: '100 / 2,25 ≈ 44,4 lx.',
      widget: { type: 'number_answer', props: { answer: 44.4, tolerance: 0.1, unit: 'lx' } }
    },
    {
      id: 'f33q4',
      prompt: 'Lyuksmetr qanday kattalikni oʻlchaydi?',
      hint: 'Birligi lyuks.',
      explanation: 'Yoritilganlikni.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yorugʻlik kuchini', 'yoritilganlikni', 'yorugʻlik oqimini', 'ravshanlikni'], answerIndex: 1 } }
    },
    {
      id: 'f33q5',
      prompt: 'Tajribada 2-lampa qanday vazifani bajaradi?',
      hint: 'Uning yorugʻlik kuchi maʼlum.',
      explanation: 'Yorugʻlik kuchi maʼlum etalon — u bilan solishtirib 1-lampaning yorugʻlik kuchi topiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Xonani yoritadi', 'Etalon — solishtirish uchun', 'Lyuksmetrni isitadi', 'Kuchlanishni oʻlchaydi'], answerIndex: 1 } }
    },
    {
      id: 'f33q6',
      prompt: 'E(I) grafigi qanday koʻrinishda boʻladi?',
      hint: 'E = I / r², r oʻzgarmas.',
      explanation: 'Koordinata boshidan oʻtuvchi toʻgʻri chiziq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['parabola', 'koordinata boshidan oʻtuvchi toʻgʻri chiziq', 'gorizontal chiziq', 'giperbola'], answerIndex: 1 } }
    },
    {
      id: 'f33q7',
      prompt: 'Ish bosqichlarini tartiblang.',
      hint: 'Avval r₁ oʻlchanadi.',
      explanation: 'r₁ ni oʻlchash → 1-lampaga kuchlanish → E ni yozish → 2-lampani yoqib r₂ ni topish → I₁ ni hisoblash.',
      widget: {
        type: 'step_order',
        props: { steps: ['1-lampadan lyuksmetrgacha r₁ ni oʻlchash', '1-lampaga 40 V berib E ni yozish', '1-lampani oʻchirib, 2-lampani yoqish', 'Lyuksmetr E ni koʻrsatadigan r₂ ni topish', 'I₁ = I₂ r₁² / r₂² ni hisoblash'] }
      }
    },
    {
      id: 'f33q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Nuqtaviy manba — masofaga nisbatan kichik.',
      explanation: 'Lampa masofaga nisbatan kichik boʻlsa, nuqtaviy deb olinadi; kuchlanish oshsa, yorugʻlik kuchi oshadi; masofa 2 marta oshsa, E 4 marta kamayadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Lampa oʻlchami masofaga nisbatan kichik boʻlsa, uni nuqtaviy manba deb olish mumkin.', value: true },
            { text: 'Lampaga berilgan kuchlanish oshsa, uning yorugʻlik kuchi oshadi.', value: true },
            { text: 'Masofa 2 marta oshsa, yoritilganlik 2 marta kamayadi.', value: false }
          ]
        }
      }
    }
  ]
};
