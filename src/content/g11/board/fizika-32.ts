import type { BoardLesson } from './types';
import { BOB4 } from './fizika-23';
import { seg, vec } from './phys';

/** Darslik: Fizika 11, 30-mavzu (110–114-betlar) — yorugʻlik oqimi, yorugʻlik kuchi, yoritilganlik qonunlari. */
export const FIZ_32: BoardLesson = {
  n: 32,
  label: '30',
  group: BOB4,
  title: 'Yorugʻlik oqimi, yorugʻlik kuchi, yoritilganlik',
  section: '30-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Kitobni lampaga yaqinlashtirsangiz, sahifa yorqinroq boʻladi, uzoqlashtirsangiz — xiralashadi. Sahifani qiyshaytirsangiz ham xiralashadi. Oʻquvchi stoli qancha yoritilishi kerakligi hatto meʼyorlarda belgilangan. Yorugʻlikni oʻlchaydigan fizika boʻlimi fotometriya deyiladi.",
      easy: "Lampaga yaqin — yorugʻ, uzoq yoki qiya — xira. Bu — fotometriya.",
      draw: [
        { t: 'title', text: 'Qancha yorugʻ?' },
        { t: 'icon', x: 16, y: 34, emoji: '💡', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '📖', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['yaqin — yorqin', 'uzoq — xira', 'qiya — xira'] }
      ],
      next: 'Energetik kattaliklar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Vaqt birligida sirtga tushayotgan yorugʻlik energiyasi — nurlanish oqimi, birligi vatt. Uni yuzaga boʻlsak, nurlanish intensivligi chiqadi, vatt boʻlinsin metr kvadrat. Nuqtaviy manbadan masofa oshgan sari intensivlik masofa kvadratiga teskari kamayadi. Toʻla fazoviy burchak 4 pi steradian.",
      easy: "Ф = W/t (W); I = Ф/S (W/m²); I ~ 1/R²; toʻla fazoviy burchak 4π sr.",
      draw: [
        { t: 'title', text: 'Nurlanish oqimi va intensivligi' },
        { t: 'formula', x: 6, y: 22, text: 'Фₑ = W / t   [W]' },
        { t: 'formula', x: 6, y: 36, text: 'I = Фₑ / S   [W/m²]' },
        { t: 'list', x: 6, y: 48, items: ['I₁ / I₂ = R₂² / R₁²', 'Ω = S₀ / R², toʻla Ω = 4π sr'] }
      ],
      next: 'Yorugʻlik kuchi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Koʻz sezadigan yorugʻlik uchun fotometrik kattaliklar ishlatiladi. Yorugʻlik oqimi lyumenda oʻlchanadi. Manbaning yorugʻlik kuchi — oqimning fazoviy burchakka nisbati: I teng F boʻlinsin omega, toʻla oqim uchun F teng 4 pi I. Yorugʻlik kuchining birligi kandela — SI ning asosiy birliklaridan biri. 1 lyumen — 1 kandelali manbadan 1 steradian ichida chiqqan oqim.",
      easy: "I = Ф/Ω (cd); toʻla oqim Ф = 4πI (lm).",
      draw: [
        { t: 'title', text: 'Yorugʻlik kuchi' },
        { t: 'formula', x: 6, y: 22, text: 'I = Ф / Ω   [cd]' },
        { t: 'formula', x: 6, y: 38, text: 'Ф = 4π · I   [lm]' },
        { t: 'list', x: 6, y: 50, items: ['kandela — SI asosiy birligi', '1 lm = 1 cd · 1 sr'] }
      ],
      next: 'Yoritilganlik qonuni'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yuza birligiga tushgan yorugʻlik oqimi — yoritilganlik: E teng F boʻlinsin S, birligi lyuks. Nuqtaviy manba uchun E teng I boʻlinsin R kvadrat. Nur yuzaga qiya, normal bilan fi burchak ostida tushsa: E teng I boʻlinsin R kvadrat karra kosinus fi. Bir nechta manba boʻlsa, yoritilganliklar qoʻshiladi.",
      easy: "E = Ф/S (lx); E = I·cos φ / R².",
      draw: [
        { t: 'title', text: 'Yoritilganlik qonuni' },
        { t: 'icon', x: 14, y: 26, emoji: '💡', size: 'm' },
        ...vec('ray', 16, 30, 36, 58, 'orange'),
        ...seg('tab', 6, 58, 60, 58, 'ink'),
        ...seg('nor', 36, 58, 36, 36, 'ink', true),
        { t: 'text', x: 32, y: 48, text: 'φ', size: 's' },
        { t: 'text', x: 18, y: 44, text: 'R', color: 'orange', size: 's' },
        { t: 'formula', x: 62, y: 28, text: 'E = Ф / S' },
        { t: 'formula', x: 62, y: 44, text: 'E = I cos φ / R²' }
      ],
      next: 'Ravshanlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yana bir kattalik — ravshanlik: yorugʻlik chiqayotgan yuza birligiga toʻgʻri keluvchi yorugʻlik kuchi, B teng I boʻlinsin S, birligi kandela boʻlinsin metr kvadrat. Masalan, tush paytidagi Quyosh ravshanligi milliardlab kandela boʻlinsin metr kvadrat, toʻlin Oy esa taxminan 2500.",
      easy: "Ravshanlik B = I/S (cd/m²).",
      draw: [
        { t: 'title', text: 'Ravshanlik' },
        { t: 'formula', x: 6, y: 22, text: 'B = I / S   [cd/m²]' },
        {
          t: 'table',
          x: 6,
          y: 34,
          rows: [
            ['manba', 'B, cd/m²'],
            ['tushdagi Quyosh', '1,65 · 10⁹'],
            ['toʻlin Oy', '2500'],
            ['kunduzgi osmon', '1500–4000']
          ]
        }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Nuqtaviy manbaning yorugʻlik kuchi 100 kandela. Toʻla yorugʻlik oqimi: F teng 4 pi karra I — 4 karra 3,14 karra 100, yaʼni 1256 lyumen. Undan 2 metr pastdagi stol tik yoritilsa, yoritilganlik 100 boʻlinsin 4 — 25 lyuks.",
      easy: "Ф = 4π · 100 = 1256 lm; E = 100/2² = 25 lx.",
      draw: [
        { t: 'title', text: 'Oqim va yoritilganlik' },
        { t: 'formula', x: 6, y: 24, text: 'Ф = 4π · 100 = 1256 lm' },
        { t: 'formula', x: 6, y: 42, text: 'E = I / R² = 100 / 4 = 25 lx' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Nurlanish oqimi Фₑ = W/t (W), intensivlik I = Фₑ/S (W/m²); nuqtaviy manbada I ~ 1/R².',
    'Yorugʻlik kuchi I = Ф/Ω (kandela); toʻla oqim Ф = 4πI (lyumen).',
    'Yoritilganlik E = Ф/S = I·cos φ / R² (lyuks); ravshanlik B = I/S (cd/m²).'
  ],
  questions: [
    {
      id: 'f32q1',
      prompt: 'Yuzi 5 cm² sirtga 0,02 lm oqim tik tushmoqda. Yoritilganlik necha lx?',
      hint: 'E = Ф/S.',
      explanation: '0,02 / 5·10⁻⁴ = 40 lx.',
      widget: { type: 'number_answer', props: { answer: 40, unit: 'lx' } }
    },
    {
      id: 'f32q2',
      prompt: 'Yorugʻlik kuchi 100 cd boʻlgan sharsimon yoritgichning toʻla oqimi necha lm? (butun songacha)',
      hint: 'Ф = 4πI.',
      explanation: '4 · 3,14 · 100 ≈ 1257 lm ≈ 1,26 klm.',
      widget: { type: 'number_answer', props: { answer: 1257, tolerance: 2, unit: 'lm' } }
    },
    {
      id: 'f32q3',
      prompt: '200 cd lampa nuri stolga normal bilan 45° burchak ostida tushib, 141 lx yoritilganlik beradi. Lampa stoldan necha m balandlikda? (0,01 gacha)',
      hint: 'R = h / cos 45°, E = I cos³45° / h².',
      explanation: 'h² = 200 · 0,354 / 141 ≈ 0,50 → h ≈ 0,71 m.',
      widget: { type: 'number_answer', props: { answer: 0.71, tolerance: 0.02, unit: 'm' } }
    },
    {
      id: 'f32q4',
      prompt: 'Quyoshning gorizontdan balandligi 30° dan 45° ga oshdi. Yer sirti yoritilganligi necha marta oshdi? (0,01 gacha)',
      hint: 'E ~ sin h (balandlik).',
      explanation: 'sin 45° / sin 30° = 0,707 / 0,5 ≈ 1,41.',
      widget: { type: 'number_answer', props: { answer: 1.41, tolerance: 0.02 } }
    },
    {
      id: 'f32q5',
      prompt: 'Manbadan masofa 3 marta oshirildi. Yoritilganlik qanday oʻzgaradi?',
      hint: 'E ~ 1/R².',
      explanation: '9 marta kamayadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['3 marta kamayadi', '9 marta kamayadi', '3 marta oshadi', 'oʻzgarmaydi'], answerIndex: 1 } }
    },
    {
      id: 'f32q6',
      prompt: 'Kattalikni birligi bilan moslang.',
      hint: 'Kandela — yorugʻlik kuchi.',
      explanation: 'Yorugʻlik oqimi — lm; yorugʻlik kuchi — cd; yoritilganlik — lx; ravshanlik — cd/m².',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'yorugʻlik oqimi', right: 'lm' },
            { left: 'yorugʻlik kuchi', right: 'cd' },
            { left: 'yoritilganlik', right: 'lx' },
            { left: 'ravshanlik', right: 'cd/m²' }
          ]
        }
      }
    },
    {
      id: 'f32q7',
      prompt: 'Fotometriyaning qaysi birligi SI ning asosiy birligi?',
      hint: 'Yorugʻlik kuchi birligi.',
      explanation: 'Kandela.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['lyumen', 'lyuks', 'kandela', 'steradian'], answerIndex: 2 } }
    },
    {
      id: 'f32q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'E = I cos φ / R².',
      explanation: 'Nur qiya tushsa, E kamayadi; manbalar yoritilganligi qoʻshiladi; toʻla fazoviy burchak 4π sr.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Nur qiyaroq tushsa, yoritilganlik kamayadi.', value: true },
            { text: 'Ikki manba yoritgan yuzaning yoritilganligi ular yoritilganliklari yigʻindisiga teng.', value: true },
            { text: 'Toʻla fazoviy burchak 2π steradian.', value: false },
            { text: 'Yoritilganlik manbagacha masofaga bogʻliq emas.', value: false }
          ]
        }
      }
    }
  ]
};
