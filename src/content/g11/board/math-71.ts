import type { BoardLesson } from './types';

/** Takrorlash (savollar): darslik 2-qism, Geometriya, 12 — III bob (piramida va konus) boʻyicha amaliy mashqlar, 3-test. */
export const MATH_71: BoardLesson = {
  n: 71,
  label: '12',
  part: 'geometriya',
  qism: 2,
  title: 'Takrorlash: piramida va konus',
  section: 'Geometriya, 12',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'g71q1',
      prompt: 'Toʻrtburchakli muntazam piramidaning balandligi 6 cm, apofemasi 6,5 cm. Asosining perimetrini toping.',
      hint: 'Yarim tomon √(6,5² − 6²).',
      explanation: 'Yarim tomon 2,5, tomon 5, perimetr 20 cm.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['10 cm', '12 cm', '24 cm', '20 cm'], answerIndex: 3 } }
    },
    {
      id: 'g71q2',
      prompt: 'Muntazam piramida yon sirti 96, asos perimetri 24. Apofemasini toping.',
      hint: 'S yon = ½ P l.',
      explanation: 'l = 2 · 96 / 24 = 8.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'g71q3',
      prompt: 'Uchburchakli muntazam piramidaning balandligi 4, asosining balandligi 4,5. Yon qirrasini toping.',
      hint: 'Tashqi aylana radiusi — asos balandligining ⅔ qismi.',
      explanation: 'R = 3, yon qirra √(16 + 9) = 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'g71q4',
      prompt: 'Muntazam oltiburchakli piramida asosining tomoni 6, yon qirrasi 10. Balandligini toping.',
      hint: 'Muntazam oltiburchakda R = a.',
      explanation: 'H = √(100 − 36) = 8.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'g71q5',
      prompt: 'Muntazam piramidaning yon sirti 24, asos yuzi 12. Yon yoq bilan asos orasidagi burchak?',
      hint: 'S asos = S yon · cos φ.',
      explanation: 'cos φ = 0,5 → φ = 60°.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['30°', '45°', '60°', '35°'], answerIndex: 2 } }
    },
    {
      id: 'g71q6',
      prompt: 'Toʻrtburchakli muntazam piramida asosining tomoni 4 marta kattalashtirildi, balandligi 4 marta kichiklashtirildi. Yangi hajm eskisidan necha marta katta?',
      hint: 'Asos yuzi 16 marta, balandlik ¼.',
      explanation: '16 · ¼ = 4 marta.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'g71q7',
      prompt: 'Toʻrtburchakli muntazam piramidaning hajmi 48, balandligi 4. Yon sirtini toping.',
      hint: 'S asos = 36, a = 6, apofema √(16 + 9).',
      explanation: 'l = 5, S yon = ½ · 24 · 5 = 60.',
      widget: { type: 'number_answer', props: { answer: 60 } }
    },
    {
      id: 'g71q8',
      prompt: 'SABC piramidaning SBC yon yogʻi yuzi 60, A uchidan bu yoqqacha masofa 8. Hajmini toping.',
      hint: 'SBC ni asos deb oling.',
      explanation: 'V = ⅓ · 60 · 8 = 160.',
      widget: { type: 'number_answer', props: { answer: 160 } }
    },
    {
      id: 'g71q9',
      prompt: 'Toʻrtburchakli muntazam piramidaning balandligi 9, diagonal kesimining yuzi 36. Hajmini toping.',
      hint: '½ · d · 9 = 36 → d = 8; S asos = d²/2.',
      explanation: 'S asos = 32, V = ⅓ · 32 · 9 = 96.',
      widget: { type: 'number_answer', props: { answer: 96 } }
    },
    {
      id: 'g71q10',
      prompt: 'Kesik piramida asoslarining yuzlari 96 va 24, butun piramida balandligi 16. Kesik piramida hajmini toping.',
      hint: 'k = √(24/96) = ½, kesik qism balandligi 8.',
      explanation: 'V = ⅓ · 8 · (96 + 48 + 24) = 448.',
      widget: { type: 'number_answer', props: { answer: 448 } }
    },
    {
      id: 'g71q11',
      prompt: 'Konusning yasovchisi 12, u asos tekisligi bilan 60° burchak hosil qiladi. Asos radiusini toping.',
      hint: 'r = l · cos 60°.',
      explanation: 'r = 6.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'g71q12',
      prompt: 'Konus yon sirti yoyilmasining uchidagi burchak 30°. Yasovchining asos radiusiga nisbati?',
      hint: 'φ = 360° · r / l.',
      explanation: 'l / r = 360 / 30 = 12.',
      widget: { type: 'number_answer', props: { answer: 12 } }
    },
    {
      id: 'g71q13',
      prompt: 'Konusning oʻq kesimi yuzi 8, asos radiusi 2. Yon sirti?',
      hint: '½ · 4 · H = 8 → H = 4; l = √20.',
      explanation: 'S yon = π · 2 · 2√5 = 4√5π.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['6π', '4√5π', '5√5π', '5π'], answerIndex: 1 } }
    },
    {
      id: 'g71q14',
      prompt: 'Konus asosining radiusi 6, yasovchisi asos tekisligi bilan 30° burchak tashkil etadi. Asos markazidan yasovchigacha masofa?',
      hint: 'Toʻgʻri burchakli uchburchakda r · sin 30°.',
      explanation: 'd = 6 · ½ = 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'g71q15',
      prompt: 'Formulani jism bilan moslang.',
      hint: '⅓ — piramida va konus.',
      explanation: 'Piramida ⅓SH; konus ⅓πr²H; kesik konus ⅓πH(r₁² + r₁r₂ + r₂²); konus yon sirti πrl.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '⅓ S H', right: 'piramida hajmi' },
            { left: '⅓ π r² H', right: 'konus hajmi' },
            { left: '⅓ π H (r₁² + r₁r₂ + r₂²)', right: 'kesik konus hajmi' },
            { left: 'π r l', right: 'konus yon sirti' }
          ]
        }
      }
    },
    {
      id: 'g71q16',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Har birini tekshiring.',
      explanation: 'Kubdagi oktaedr ⅙ a³; yon yoqlari teng ogʻgan piramidaga faqat ichki aylana chiziladigan asos (romb, kvadrat) mos; r = 6, H = 8 da yoyilma burchagi 216°.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qirrasi 1 boʻlgan kub yoqlari markazlaridan hosil boʻlgan oktaedr hajmi 1/6.', value: true },
            { text: 'Ixtiyoriy parallelogramm barcha yon yoqlari bir xil ogʻgan piramidaning asosi boʻla oladi.', value: false },
            { text: 'r = 6, H = 8 boʻlgan konus yoyilmasining burchagi 216°.', value: true },
            { text: 'Konus balandligi 2 marta oshsa, hajmi 8 marta oshadi.', value: false }
          ]
        }
      }
    }
  ]
};
