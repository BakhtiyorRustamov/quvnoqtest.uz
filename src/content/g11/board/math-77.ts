import type { BoardLesson } from './types';

/** Takrorlash (savollar): darslik 2-qism, Geometriya, 16 — IV bob (sfera va shar) boʻyicha amaliy mashqlar, 4-test. */
export const MATH_77: BoardLesson = {
  n: 77,
  label: '16',
  part: 'geometriya',
  qism: 2,
  title: 'Takrorlash: sfera va shar',
  section: 'Geometriya, 16',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'g77q1',
      prompt: 'Radiusi 13 boʻlgan shar markazidan 10 masofada tekislik bilan kesildi. Kesim yuzi?',
      hint: 'r² = 169 − 100.',
      explanation: '69π.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['69π', '36π', '100π', '3'], answerIndex: 0 } }
    },
    {
      id: 'g77q2',
      prompt: 'Sfera sirtidagi uchta nuqta orasidagi masofalar 26, 24 va 10, sfera yuzi 900π. Bu nuqtalar tekisligidan markazgacha masofa?',
      hint: '10² + 24² = 26² — kesim aylanasi radiusi 13; R = 15.',
      explanation: 'd = √(225 − 169) = √56 = 2√14.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['2π√14', '2√14', '4√14', '56π'], answerIndex: 1 } }
    },
    {
      id: 'g77q3',
      prompt: 'Kubning ikki qoʻshni yogʻi markazlari orasidagi masofa 2√2. Kubga tashqi chizilgan shar sirti k·π. k = ?',
      hint: 'Bu masofa a/√2, demak a = 4; R = a√3/2.',
      explanation: 'R = 2√3, S = 4π · 12 = 48π.',
      widget: { type: 'number_answer', props: { answer: 48 } }
    },
    {
      id: 'g77q4',
      prompt: 'Kubga ichki chizilgan shar hajmi 85⅓π. Kubning toʻla sirtini toping.',
      hint: '4/3 π r³ = 256π/3 → r = 4.',
      explanation: 'a = 8, S = 6 · 64 = 384.',
      widget: { type: 'number_answer', props: { answer: 384 } }
    },
    {
      id: 'g77q5',
      prompt: 'Piramidaning toʻla sirti 60, unga ichki chizilgan shar radiusi 5. Hajmini toping.',
      hint: 'V = ⅓ · S · r.',
      explanation: '⅓ · 60 · 5 = 100.',
      widget: { type: 'number_answer', props: { answer: 100 } }
    },
    {
      id: 'g77q6',
      prompt: 'Oltiburchakli muntazam piramidaning apofemasi 5, asosiga tashqi chizilgan doira yuzi 12π. Ichki chizilgan shar radiusi?',
      hint: 'Asos tomoni 2√3, ichki aylana radiusi 3, H = 4; r = r₁H/(r₁ + l).',
      explanation: 'r = 3 · 4 / (3 + 5) = 1,5.',
      widget: { type: 'number_answer', props: { answer: 1.5, tolerance: 0.001 } }
    },
    {
      id: 'g77q7',
      prompt: 'Oʻq kesimi kvadrat boʻlgan silindrga radiusi 3 boʻlgan shar ichki chizilgan. Silindr va shar orasidagi jism hajmi k·π. k = ?',
      hint: 'V silindr = π · 9 · 6, V shar = 36π.',
      explanation: '54π − 36π = 18π.',
      widget: { type: 'number_answer', props: { answer: 18 } }
    },
    {
      id: 'g77q8',
      prompt: 'Silindrga shar ichki chizilgan, silindr hajmi 16π. Shar hajmi?',
      hint: 'πr² · 2r = 16π → r = 2.',
      explanation: '4/3 π · 8 = 32π/3.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['32π/3', '16π/3', '64π/3', '10⅓π'], answerIndex: 0 } }
    },
    {
      id: 'g77q9',
      prompt: 'Kesik konusga shar ichki chizilgan, asoslarining yuzlari 36π va 64π. Shar sirti k·π. k = ?',
      hint: 'r = 6, R = 8, l = 14, H² = 14² − 2².',
      explanation: 'H = √192 = 2ρ → ρ² = 48 → S = 192π.',
      widget: { type: 'number_answer', props: { answer: 192 } }
    },
    {
      id: 'g77q10',
      prompt: 'Radiusi 10 boʻlgan sferaga balandligi 18 boʻlgan konus ichki chizilgan. Konus hajmi k·π. k = ?',
      hint: 'r² = H(2R − H) = 36.',
      explanation: '⅓ · 36 · 18 = 216 → 216π.',
      widget: { type: 'number_answer', props: { answer: 216 } }
    },
    {
      id: 'g77q11',
      prompt: 'Yasovchisi 5, asos diametri 6 boʻlgan konusga ichki chizilgan shar sirti k·π. k = ?',
      hint: 'r = 3, H = 4, ρ = rH/(r + l).',
      explanation: 'ρ = 12/8 = 1,5, S = 4π · 2,25 = 9π.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'g77q12',
      prompt: 'Kesik konusga shar ichki chizilgan, asoslarining yuzlari π va 4π. Yon sirti k·π. k = ?',
      hint: 'r₁ = 1, r₂ = 2, l = r₁ + r₂.',
      explanation: 'l = 3, S yon = π · 3 · 3 = 9π.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'g77q13',
      prompt: 'Radiuslari 2, 3 va 4 boʻlgan metall sharlar eritilib, bitta shar quyildi. Uning hajmi k·π. k = ?',
      hint: '4/3 (8 + 27 + 64).',
      explanation: '4/3 · 99 = 132 → 132π.',
      widget: { type: 'number_answer', props: { answer: 132 } }
    },
    {
      id: 'g77q14',
      prompt: 'Radiusi 5 boʻlgan sharga balandligi 8 boʻlgan toʻrtburchakli muntazam prizma ichki chizilgan. Prizma hajmi?',
      hint: 'Asos diagonali 2√(25 − 16) = 6, a² = 18.',
      explanation: 'V = 18 · 8 = 144.',
      widget: { type: 'number_answer', props: { answer: 144 } }
    },
    {
      id: 'g77q15',
      prompt: 'Konus asosining yuzi 9π, yon sirti 15π. Ichki chizilgan sfera radiusi?',
      hint: 'r = 3, l = 5, H = 4.',
      explanation: 'ρ = 3 · 4 / (3 + 5) = 1,5.',
      widget: { type: 'number_answer', props: { answer: 1.5, tolerance: 0.001 } }
    },
    {
      id: 'g77q16',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Har birini tekshiring.',
      explanation: 'Radius 50% ortsa sirt 125% ortadi; diametr 3 marta ortsa boʻyoq 9 marta koʻp; yarim shar (R = 2) qatlami 11π/3.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sfera radiusi 50% orttirilsa, sirti 125% ga koʻpayadi.', value: true },
            { text: 'Shar diametri 3 marta orttirilsa, uni boʻyashga 3 marta koʻp boʻyoq kerak.', value: false },
            { text: 'Radiusi 2 boʻlgan yarim sharning balandligi oʻrtasidan kesilgan qatlami hajmi 11π/3.', value: true },
            { text: 'Hajmi 125 boʻlgan kubga ichki chizilgan shar sirti 125π.', value: false }
          ]
        }
      }
    }
  ]
};
