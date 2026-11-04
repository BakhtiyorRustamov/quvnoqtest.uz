import type { BoardLesson } from './types';

/** Darslik (2-qism): 59–60-mavzu (33–34-betlar) — guruhlashlar (binomial koeffitsiyentlar). */
export const MATH_48: BoardLesson = {
  n: 48,
  label: '59',
  part: 'algebra',
  qism: 2,
  title: 'Guruhlashlar: tartibsiz tanlash',
  section: '59–60',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Sinfda 30 nafar oʻquvchi bor, olimpiadaga 2 nafarini yuborish kerak. Birinchisini 30 usulda, ikkinchisini 29 usulda tanlaymiz — 870. Lekin Ali va Vali juftligi Vali va Ali juftligi bilan bir xil! Har bir juftlik ikki marta sanalgan, shuning uchun javob 870 boʻlinsin 2, yaʼni 435.",
      easy: "Jamoada tartib muhim emas: 30 · 29 ni 2 ga boʻlamiz — 435.",
      draw: [
        { t: 'title', text: 'Olimpiadaga 2 nafar' },
        { t: 'icon', x: 10, y: 30, emoji: '🏆', size: 'l' },
        { t: 'list', x: 30, y: 22, items: ['30 · 29 = 870 (tartib bilan)', '(Ali, Vali) = (Vali, Ali)'] },
        { t: 'box', id: 'r', x: 30, y: 46, w: 40, h: 12, text: '870 : 2 = 435', color: 'green' }
      ],
      next: 'Kesmalar va diagonallar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "n ta elementdan juftliklar soni n karra n minus 1 boʻlinsin 2. Shuning uchun tekislikdagi n ta nuqtani tutashtiruvchi kesmalar soni n karra n minus 1 boʻlinsin 2. Qavariq n burchakning diagonallari: barcha kesmalardan n ta tomonni ayiramiz — n karra n minus 3 boʻlinsin 2. Oltiburchakda 9 ta diagonal.",
      easy: "Juftliklar: n(n − 1)/2. Diagonallar: n(n − 3)/2.",
      draw: [
        { t: 'title', text: 'Juftliklar soni' },
        { t: 'formula', x: 6, y: 20, text: 'juftliklar: n(n − 1)/2' },
        { t: 'formula', x: 6, y: 34, text: 'diagonallar: n(n − 3)/2' },
        { t: 'point', id: 'a', x: 72, y: 20 },
        { t: 'point', id: 'b', x: 86, y: 28 },
        { t: 'point', id: 'c', x: 86, y: 44 },
        { t: 'point', id: 'd', x: 72, y: 52 },
        { t: 'point', id: 'e', x: 58, y: 44 },
        { t: 'point', id: 'f', x: 58, y: 28 },
        { t: 'polygon', points: ['a', 'b', 'c', 'd', 'e', 'f'], color: 'blue' },
        { t: 'line', from: 'a', to: 'c', color: 'red', dashed: true },
        { t: 'line', from: 'a', to: 'd', color: 'red', dashed: true },
        { t: 'line', from: 'a', to: 'e', color: 'red', dashed: true },
        { t: 'text', x: 6, y: 56, text: 'oltiburchak: 6·3/2 = 9', color: 'green' }
      ],
      next: 'Uch kishilik jamoa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "30 nafardan 3 kishilik jamoa: 30 karra 29 karra 28 ta tartiblangan uchlik. Lekin bitta jamoa 3 faktorial, yaʼni 6 marta sanaldi. Javob: 30 karra 29 karra 28 boʻlinsin 6 teng 4060. Umumiy formula — guruhlashlar soni: C n k teng n faktorial boʻlinsin k faktorial karra n minus k faktorial. U binomial koeffitsiyent deb ham ataladi.",
      easy: "Tartib bilan sanab, k! ga boʻlamiz: Cₙᵏ = n!/(k!(n − k)!).",
      draw: [
        { t: 'title', text: 'Guruhlashlar' },
        { t: 'formula', x: 6, y: 20, text: 'Cₙᵏ = n! / (k!·(n − k)!)' },
        { t: 'formula', x: 6, y: 36, text: 'C₃₀³ = 30·29·28 / 6 = 4060' },
        { t: 'text', x: 6, y: 56, text: 'tartib muhim emas → k! ga boʻlamiz', color: 'purple' }
      ],
      next: 'Misollar'
    },
    {
      kind: 'example',
      clear: true,
      say: "5-masala: 15 nafar duradgordan 3 nafarini tanlash: C 15 3 teng 15 karra 14 karra 13 boʻlinsin 6, yaʼni 455. 8-masala: 7 kishidan 3 kishilik guruh — C 7 3 teng 35, guruh rahbari ham tanlansa — 3 karra 35 teng 105. 5 ta kitobdan 3 tasini tanlash — C 5 3 teng 10.",
      easy: "C₁₅³ = 455, C₇³ = 35, rahbar bilan 105, C₅³ = 10.",
      draw: [
        { t: 'title', text: 'Misollar' },
        { t: 'list', x: 6, y: 20, items: ['C₁₅³ = 15·14·13 / 6 = 455', 'C₇³ = 35; rahbari bilan 3·35 = 105', 'C₅³ = 10'] }
      ],
      next: 'Xossasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Guruhlashlarning chiroyli xossasi: C n k teng C n n minus k. k tasini tanlash — qolgan n minus k tasini tashlab qoldirish bilan bir xil. Masalan, 100 elementli toʻplamning 40 elementli va 60 elementli qism toʻplamlari soni teng. Yana: C n 0 teng C n n teng 1, C n 1 teng n.",
      easy: "Cₙᵏ = Cₙⁿ⁻ᵏ: tanlash va tashlab qoldirish bir xil.",
      draw: [
        { t: 'title', text: 'Xossalar' },
        { t: 'list', x: 6, y: 20, items: ['Cₙᵏ = Cₙⁿ⁻ᵏ', 'Cₙ⁰ = Cₙⁿ = 1', 'Cₙ¹ = n'] },
        { t: 'text', x: 6, y: 50, text: 'C₁₀₀⁴⁰ = C₁₀₀⁶⁰', color: 'green' }
      ],
      next: 'Oʻrinlashtirishdan farqi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻrinlashtirish va guruhlash farqi — tartibda. Sardor va yordamchi — oʻrinlashtirish, A 11 2 teng 110. Ikki kishilik navbatchilar juftligi — guruhlash, C 11 2 teng 55. Har doim: A n k teng C n k karra k faktorial.",
      easy: "Tartib muhim — A, muhim emas — C. Aₙᵏ = Cₙᵏ · k!.",
      draw: [
        { t: 'title', text: 'A yoki C?' },
        {
          t: 'table',
          x: 8,
          y: 18,
          rows: [
            ['', 'tartib', 'misol'],
            ['Aₙᵏ', 'muhim', 'sardor va yordamchi: 110'],
            ['Cₙᵏ', 'muhim emas', 'ikki navbatchi: 55']
          ]
        },
        { t: 'formula', x: 8, y: 46, text: 'Aₙᵏ = Cₙᵏ · k!' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Guruhlash — tartib muhim boʻlmagan tanlov: Cₙᵏ = n!/(k!(n − k)!).',
    'Juftliklar soni n(n − 1)/2, qavariq n burchak diagonallari n(n − 3)/2.',
    'Cₙᵏ = Cₙⁿ⁻ᵏ, Aₙᵏ = Cₙᵏ · k!.'
  ],
  questions: [
    {
      id: 'p48q1',
      prompt: 'Shaxmat musobaqasida 18 ishtirokchi, har biri qolganlar bilan bittadan oʻynaydi. Nechta oʻyin oʻynaladi?',
      hint: 'C₁₈².',
      explanation: '18 · 17 / 2 = 153.',
      widget: { type: 'number_answer', props: { answer: 153 } }
    },
    {
      id: 'p48q2',
      prompt: '7 ta rangli boʻyoqdan 4 tasini necha usulda tanlash mumkin?',
      hint: 'C₇⁴ = C₇³.',
      explanation: '35.',
      widget: { type: 'number_answer', props: { answer: 35 } }
    },
    {
      id: 'p48q3',
      prompt: 'Qavariq oʻnburchakning nechta diagonali bor?',
      hint: 'n(n − 3)/2.',
      explanation: '10 · 7 / 2 = 35.',
      widget: { type: 'number_answer', props: { answer: 35 } }
    },
    {
      id: 'p48q4',
      prompt: '6 nafar aʼlochi uchun 4 ta konsert chiptasi bor. Chiptalarni necha usulda taqsimlash mumkin (har kimga bittadan)?',
      hint: 'Kim chipta oladi — tartib muhim emas.',
      explanation: 'C₆⁴ = 15.',
      widget: { type: 'number_answer', props: { answer: 15 } }
    },
    {
      id: 'p48q5',
      prompt: '3 ta oq, 2 ta qizil va 4 ta sariq atirguldan uchta guldan iborat guldastani necha usulda tuzish mumkin (gullar turlicha deb hisoblang)?',
      hint: 'Jami 9 ta guldan 3 tasi.',
      explanation: 'C₉³ = 84.',
      widget: { type: 'number_answer', props: { answer: 84 } }
    },
    {
      id: 'p48q6',
      prompt: 'Masalalarni ajrating: tartib muhimmi?',
      hint: 'Rollar bormi?',
      explanation: 'Rollar yoki oʻrinlar boʻlsa — oʻrinlashtirish; shunchaki guruh — guruhlash.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'a', label: 'Oʻrinlashtirish (A)' },
            { id: 'c', label: 'Guruhlash (C)' }
          ],
          items: [
            { emoji: '', label: 'sardor va yordamchi', bin: 'a' },
            { emoji: '', label: '1-, 2-, 3-oʻrin sovrindorlari', bin: 'a' },
            { emoji: '', label: 'uch rangli bayroq', bin: 'a' },
            { emoji: '', label: '3 kishilik jamoa', bin: 'c' },
            { emoji: '', label: '5 kitobdan 2 tasini olish', bin: 'c' },
            { emoji: '', label: 'shaxmatdagi oʻyinlar soni', bin: 'c' }
          ]
        }
      }
    },
    {
      id: 'p48q7',
      prompt: 'C₈³ ni hisoblang.',
      hint: '8 · 7 · 6 / 6.',
      explanation: '56.',
      widget: { type: 'number_answer', props: { answer: 56 } }
    },
    {
      id: 'p48q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Cₙᵏ = Cₙⁿ⁻ᵏ.',
      explanation: 'C₁₀₀⁴⁰ = C₁₀₀⁶⁰; Cₙ¹ = n; Aₙᵏ ≥ Cₙᵏ; Cₙ⁰ = 1.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '100 elementli toʻplamning 40 va 60 elementli qism toʻplamlari soni teng.', value: true },
            { text: 'Cₙ¹ = 1.', value: false },
            { text: 'Aₙᵏ = Cₙᵏ · k!.', value: true },
            { text: 'Guruhlashda tartib muhim.', value: false }
          ]
        }
      }
    }
  ]
};
