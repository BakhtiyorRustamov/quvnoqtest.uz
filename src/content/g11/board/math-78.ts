import type { BoardLesson } from './types';

/** Takrorlash (savollar): darslik 2-qism, Geometriya, 17 — stereometriyani takrorlashga doir test topshiriqlari (V bob). */
export const MATH_78: BoardLesson = {
  n: 78,
  label: '17',
  part: 'geometriya',
  qism: 2,
  title: 'Yakuniy takrorlash: stereometriya testlari',
  section: 'Geometriya, 17',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'g78q1',
      prompt: 'a(−3; 2; −1) va b(−4; 4; 1) vektorlar yigʻindisini toping.',
      hint: 'Mos koordinatalarni qoʻshing.',
      explanation: '(−7; 6; 0).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['(7; 6; 0)', '(−7; 6; 0)', '(12; 8; −1)', '(−7; 6; −1)'], answerIndex: 1 } }
    },
    {
      id: 'g78q2',
      prompt: 'M(3; −2; 0) va N(−1; 1; 12) nuqtalar orasidagi masofa?',
      hint: '√(16 + 9 + 144).',
      explanation: '√169 = 13.',
      widget: { type: 'number_answer', props: { answer: 13 } }
    },
    {
      id: 'g78q3',
      prompt: 'a(−1; 3; 2) va b(−2; 4; −3) vektorlarning skalar koʻpaytmasi?',
      hint: 'x₁x₂ + y₁y₂ + z₁z₂.',
      explanation: '2 + 12 − 6 = 8.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'g78q4',
      prompt: 'a(3x; 2; −1) va b(x; −2x; −1) perpendikular boʻladigan x qiymatlari?',
      hint: '3x² − 4x + 1 = 0.',
      explanation: 'x = 1 yoki x = 1/3.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1; 3', '−1; −1/3', '1; 1/3', '1; −1/3'], answerIndex: 2 } }
    },
    {
      id: 'g78q5',
      prompt: 'Kubning nechta simmetriya tekisligi bor?',
      hint: '3 ta yoqlarga parallel + 6 ta diagonal.',
      explanation: '9 ta.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'g78q6',
      prompt: 'Kub qirrasi 10% kamaytirilsa, hajmi taxminan necha foiz kamayadi?',
      hint: '0,9³ = 0,729.',
      explanation: '≈ 27%.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['10', '30', '33', '27'], answerIndex: 3 } }
    },
    {
      id: 'g78q7',
      prompt: 'Zalning uzunligi, eni va balandligi 5 : 3 : 1, uzunligi enidan 8 m koʻp. Zal hajmi (m³)?',
      hint: '5k − 3k = 8 → k = 4.',
      explanation: '20 · 12 · 4 = 960.',
      widget: { type: 'number_answer', props: { answer: 960, unit: 'm³' } }
    },
    {
      id: 'g78q8',
      prompt: '60 ta qirrasi boʻlgan prizmaning nechta yogʻi bor?',
      hint: 'n burchakli prizmada 3n qirra, n + 2 yoq.',
      explanation: 'n = 20 → 22 yoq.',
      widget: { type: 'number_answer', props: { answer: 22 } }
    },
    {
      id: 'g78q9',
      prompt: 'Uchburchakli toʻgʻri prizma asosining tomonlari 15, 20, 25, yon qirrasi asosning eng katta balandligiga teng. Hajmi?',
      hint: 'Asos — toʻgʻri burchakli, yuzi 150, eng katta balandlik 20 (katet).',
      explanation: 'V = 150 · 20 = 3000.',
      widget: { type: 'number_answer', props: { answer: 3000 } }
    },
    {
      id: 'g78q10',
      prompt: 'Silindr hajmi 120π, yon sirti 60π. Asos radiusi?',
      hint: 'πr²H : 2πrH = r/2.',
      explanation: 'r/2 = 2 → r = 4.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'g78q11',
      prompt: '28 ta qirrali piramidaning nechta yon yogʻi bor?',
      hint: 'n burchakli piramidada 2n qirra.',
      explanation: 'n = 14.',
      widget: { type: 'number_answer', props: { answer: 14 } }
    },
    {
      id: 'g78q12',
      prompt: 'Hajmi 1296 boʻlgan toʻrtburchakli muntazam piramida asosining tomoni 18. Yon sirtini toping.',
      hint: 'H = 3 · 1296 / 324 = 12, apofema √(144 + 81).',
      explanation: 'l = 15, S yon = ½ · 72 · 15 = 540.',
      widget: { type: 'number_answer', props: { answer: 540 } }
    },
    {
      id: 'g78q13',
      prompt: 'Piramida balandligi 8. Uchidan 4 masofadagi parallel kesim yuzi 27. Piramida hajmi?',
      hint: 'k = ½, asos yuzi 27 · 4.',
      explanation: 'S = 108, V = ⅓ · 108 · 8 = 288.',
      widget: { type: 'number_answer', props: { answer: 288 } }
    },
    {
      id: 'g78q14',
      prompt: 'Konusning yon sirti 60π, toʻla sirti 96π. Yasovchisini toping.',
      hint: 'πr² = 36π.',
      explanation: 'r = 6, πrl = 60π → l = 10.',
      widget: { type: 'number_answer', props: { answer: 10 } }
    },
    {
      id: 'g78q15',
      prompt: 'Konus hajmi 9π, yasovchisi asos tekisligi bilan 45°. Balandligini toping.',
      hint: 'r = H.',
      explanation: '⅓ π H³ = 9π → H = 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'g78q16',
      prompt: 'Konus balandligi 6. Asosdan 4 masofada parallel tekislik oʻtkazildi. Kesim yuzining asos yuziga nisbati?',
      hint: 'Uchdan masofa 2, k = ⅓.',
      explanation: '(⅓)² = 1/9.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1/3', '2/3', '4/9', '1/9'], answerIndex: 3 } }
    },
    {
      id: 'g78q17',
      prompt: 'Sharga ichki chizilgan konusning asosi sharning katta doirasi. Shar hajmi konus hajmidan necha marta katta?',
      hint: 'Konus: r = R, H = R.',
      explanation: '(4/3 πR³) : (⅓ πR³) = 4.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'g78q18',
      prompt: 'Kubga konus ichki chizilgan (asosi pastki yoqqa ichki chizilgan doira, uchi yuqori yoq markazida). Konus va kub hajmlari nisbati?',
      hint: 'r = a/2, H = a.',
      explanation: '⅓ π (a/2)² a : a³ = π/12.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['π/2', 'π/3', 'π/6', 'π/12'], answerIndex: 3 } }
    },
    {
      id: 'g78q19',
      prompt: 'Jism va hajm formulasini moslang.',
      hint: '⅓ — uchli jismlar.',
      explanation: 'Prizma SH; piramida ⅓SH; silindr πr²H; shar 4/3 πR³.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'prizma', right: 'S · H' },
            { left: 'piramida', right: '⅓ S · H' },
            { left: 'silindr', right: 'π r² H' },
            { left: 'shar', right: '4/3 π R³' }
          ]
        }
      }
    }
  ]
};
