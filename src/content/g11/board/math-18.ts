import type { BoardLesson } from './types';

/** y = √x near x = 1 */
const SQ: [number, number][] = [[0, 0], [0.1, 0.316], [0.25, 0.5], [0.5, 0.707], [0.75, 0.866], [1, 1], [1.5, 1.225], [2, 1.414], [2.5, 1.581], [3, 1.732]];

/** Darslik: 26–28-mavzu (56–61-betlar) — taqribiy hisoblashlar. */
export const MATH_18: BoardLesson = {
  n: 18,
  label: "26–28",
  part: 'algebra',
  title: "Taqribiy hisoblashni oʻrganish",
  section: '26–28',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yer — shar, lekin hovlingizda turib qarasangiz, yer tekis koʻrinadi. Nega? Chunki kichik boʻlakda egri sirt deyarli tekislikka teng. Grafik bilan ham shunday: nuqta yaqinida egri chiziq deyarli urinmaga teng. Shu gʻoya bilan kalkulyatorsiz ildiz va sinuslarni hisoblaymiz.",
      easy: "Yaqindan qarasangiz, egri chiziq toʻgʻri chiziqqa oʻxshaydi. Shuning uchun grafikni urinma bilan almashtirish mumkin.",
      draw: [
        { t: 'title', text: 'Yer tekismi?' },
        { t: 'point', id: 'O', x: 30, y: 52 },
        { t: 'circle', id: 'e', center: 'O', r: 16, color: 'blue' },
        { t: 'point', id: 'L', x: 14, y: 36 },
        { t: 'point', id: 'R', x: 46, y: 36 },
        { t: 'line', from: 'L', to: 'R', color: 'green' },
        { t: 'icon', x: 30, y: 31, emoji: '🏠', size: 's' },
        { t: 'text', x: 54, y: 30, text: 'Kichik boʻlakda:', size: 's' },
        { t: 'text', x: 54, y: 38, text: 'egri ≈ toʻgʻri', color: 'green' },
        { t: 'text', x: 54, y: 50, text: 'grafik ≈ urinma', color: 'purple' }
      ],
      next: 'Formulasi qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "x nol nuqtadagi urinma tenglamasi: y teng f(x nol) plyus f shtrix x nol karra x minus x nol. x minus x nol ni delta x deb belgilasak, kichik orttirmalar formulasi hosil boʻladi: f(x nol plyus delta x) taxminan f(x nol) plyus f shtrix x nol karra delta x. x nol ni shunday tanlaymizki, f va hosila qiymatlari oson hisoblansin.",
      easy: "Funksiya qiymati taxminan: maʼlum qiymat plyus hosila karra kichik qadam. x nol ni qulay son qilib tanlaymiz.",
      draw: [
        { t: 'title', text: 'Kichik orttirmalar formulasi' },
        { t: 'axes', id: 'g', x: 6, y: 16, w: 44, h: 46, xmin: 0, xmax: 3, ymin: 0, ymax: 2 },
        { t: 'curve', axes: 'g', points: SQ, color: 'red' },
        { t: 'curve', axes: 'g', points: [[0, 0.5], [3, 2]], color: 'blue' },
        { t: 'dot', axes: 'g', x: 1, y: 1, label: 'x₀', color: 'ink' },
        { t: 'formula', x: 54, y: 24, text: 'f(x₀ + Δx) ≈' },
        { t: 'formula', x: 56, y: 36, text: 'f(x₀) + f′(x₀)·Δx' },
        { t: 'text', x: 54, y: 54, text: 'x₀ — qulay son', size: 's', color: 'purple' }
      ],
      next: 'Ildizdan boshlaymiz'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 2-misol: ildiz 1,02 ni hisoblaymiz. f(x) teng ildiz x, hosilasi 1 boʻlinsin 2 ildiz x. x nol teng 1 desak, f(1) teng 1, f shtrix 1 teng yarim, delta x teng 0,02. Formula boʻyicha: 1 plyus yarim karra 0,02, yaʼni 1,01. Kalkulyator 1,00995 beradi — juda yaqin!",
      easy: "Ildiz 1 ga teng, hosila yarim, qadam 0,02. Javob 1 plyus 0,01, yaʼni 1,01.",
      draw: [
        { t: 'title', text: '√1,02 = ?' },
        { t: 'list', x: 6, y: 20, items: ['f(x) = √x,   f′(x) = 1/(2√x)', 'x₀ = 1:  f(1) = 1,  f′(1) = 1/2', 'Δx = 0,02'] },
        { t: 'formula', x: 8, y: 46, text: '√1,02 ≈ 1 + ½·0,02 = 1,01' },
        { t: 'text', x: 10, y: 62, text: 'kalkulyator: 1,00995…', size: 's', color: 'green' }
      ],
      next: 'Murakkabroq funksiya'
    },
    {
      kind: 'example',
      clear: true,
      say: "1-misol: f(x) teng x ning yettinchi darajasi minus 2x oltinchi daraja plyus 3x kvadrat minus x plyus 3, x teng 2,02 da. x nol teng 2 olamiz: f(2) teng 13. Hosila 7x oltinchi daraja minus 12x beshinchi daraja plyus 6x minus 1, f shtrix 2 teng 75. Delta x teng 0,02. Javob: 13 plyus 75 karra 0,02, yaʼni 14,5. Aniq qiymat 14,58.",
      easy: "f(2) teng 13, hosila 75, qadam 0,02. 13 plyus 1,5 teng 14,5.",
      draw: [
        { t: 'title', text: 'f(2,02) = ?' },
        { t: 'text', x: 6, y: 20, text: 'f(x) = x⁷ − 2x⁶ + 3x² − x + 3', size: 's' },
        { t: 'list', x: 6, y: 30, items: ['x₀ = 2:  f(2) = 13', 'f′(x) = 7x⁶ − 12x⁵ + 6x − 1,  f′(2) = 75', 'Δx = 0,02'] },
        { t: 'box', id: 'r', x: 6, y: 54, w: 54, h: 11, text: 'f(2,02) ≈ 13 + 75·0,02 = 14,5', color: 'green' }
      ],
      next: 'Tayyor formulalar bormi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "x nol teng 0 boʻlsa, formula f(x) taxminan f(0) plyus f shtrix 0 karra x boʻladi. Undan x kichik boʻlganda tayyor formulalar chiqadi: 1 plyus x ning m darajasi taxminan 1 plyus mx, ildiz 1 plyus x taxminan 1 plyus x boʻlinsin 2, sin x va tangens x taxminan x, e ning x darajasi taxminan 1 plyus x. Masalan, 1 boʻlinsin 0,997 ning 30-darajasi: bu 1 minus 0,003 ning minus 30-darajasi, taxminan 1 plyus 0,09, yaʼni 1,09.",
      easy: "Kichik x uchun: 1 plyus x ning m darajasi taxminan 1 plyus mx; sin x taxminan x; e ning x darajasi taxminan 1 plyus x.",
      draw: [
        { t: 'title', text: 'x kichik boʻlsa' },
        { t: 'list', x: 6, y: 20, items: ['(1 + x)ᵐ ≈ 1 + mx', '√(1 + x) ≈ 1 + x/2', 'sin x ≈ x,   tg x ≈ x', 'eˣ ≈ 1 + x,   ln(1 + x) ≈ x'] },
        { t: 'formula', x: 8, y: 52, text: '1/0,997³⁰ = (1 − 0,003)^{−30} ≈ 1,09' }
      ],
      next: 'Sinus-chi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "4-misol: sinus 29 gradus. x nol teng 30 gradus, yaʼni pi boʻlinsin 6 olamiz: sinus 30 gradus yarim, kosinus 30 gradus ildiz 3 boʻlinsin 2. Delta x teng minus 1 gradus, radianda minus pi boʻlinsin 180. Javob: yarim minus ildiz 3 boʻlinsin 2 karra pi boʻlinsin 180, taxminan 0,4849. Kalkulyator ham 0,4848 beradi.",
      easy: "Sinus 30 gradusdan boshlaymiz — yarim. 1 gradus orqaga qadam qoʻyamiz. Javob taxminan 0,4849.",
      draw: [
        { t: 'title', text: 'sin 29° = ?' },
        { t: 'list', x: 6, y: 20, items: ['x₀ = 30° = π/6:  sin x₀ = 1/2', 'f′(x) = cos x,  cos 30° = √3/2', 'Δx = −1° = −π/180'] },
        { t: 'formula', x: 8, y: 46, text: 'sin 29° ≈ 1/2 − (√3/2)·(π/180)' },
        { t: 'box', id: 'r', x: 8, y: 54, w: 38, h: 11, text: '≈ 0,4849', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Kichik orttirmalar formulasi: f(x₀ + Δx) ≈ f(x₀) + f′(x₀)·Δx.',
    'x₀ shunday tanlanadiki, f(x₀) va f′(x₀) oson hisoblansin; x ga x₀ qancha yaqin boʻlsa, natija shuncha aniq.',
    'x kichik boʻlsa: (1 + x)ᵐ ≈ 1 + mx, sin x ≈ x, tg x ≈ x, eˣ ≈ 1 + x.'
  ],
  questions: [
    {
      id: 'm18q1',
      prompt: '1,002¹⁰⁰ ni taqribiy hisoblang.',
      hint: '(1 + x)ᵐ ≈ 1 + mx, bu yerda x = 0,002, m = 100.',
      explanation: '1 + 100 · 0,002 = 1,2.',
      widget: { type: 'number_answer', props: { answer: 1.2, tolerance: 0.001 } }
    },
    {
      id: 'm18q2',
      prompt: '√1,004 ni taqribiy hisoblang.',
      hint: '√(1 + x) ≈ 1 + x/2.',
      explanation: '1 + 0,004 / 2 = 1,002.',
      widget: { type: 'number_answer', props: { answer: 1.002, tolerance: 0.0001 } }
    },
    {
      id: 'm18q3',
      prompt: '√25,012 ni taqribiy hisoblang.',
      hint: 'x₀ = 25: f(25) = 5, f′(25) = 1/10, Δx = 0,012.',
      explanation: '5 + 0,012 / 10 = 5,0012.',
      widget: { type: 'number_answer', props: { answer: 5.0012, tolerance: 0.00005 } }
    },
    {
      id: 'm18q4',
      prompt: 'y = x³ funksiyaning x = 1,021 dagi taqribiy qiymatini toping.',
      hint: 'x₀ = 1, f′(1) = 3, Δx = 0,021.',
      explanation: '1 + 3 · 0,021 = 1,063.',
      widget: { type: 'number_answer', props: { answer: 1.063, tolerance: 0.0005 } }
    },
    {
      id: 'm18q5',
      prompt: 'y = x⁴ funksiyaning x = 0,998 dagi taqribiy qiymatini toping.',
      hint: 'x₀ = 1, f′(1) = 4, Δx = −0,002.',
      explanation: '1 + 4 · (−0,002) = 0,992.',
      widget: { type: 'number_answer', props: { answer: 0.992, tolerance: 0.0005 } }
    },
    {
      id: 'm18q6',
      prompt: 'x kichik boʻlganda har bir ifodaga uning taqribiy qiymatini moslang.',
      hint: 'f(x) ≈ f(0) + f′(0)·x.',
      explanation: 'tg x ≈ x, eˣ ≈ 1 + x, √(1 + x) ≈ 1 + x/2, (1 + x)ᵐ ≈ 1 + mx.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'tg x', right: 'x' },
            { left: 'eˣ', right: '1 + x' },
            { left: '√(1 + x)', right: '1 + x/2' },
            { left: '(1 + x)ᵐ', right: '1 + mx' }
          ]
        }
      }
    },
    {
      id: 'm18q7',
      prompt: 'Formulani toʻldiring.',
      hint: 'Urinma tenglamasini eslang.',
      explanation: 'f(x₀ + Δx) ≈ f(x₀) + f′(x₀)·Δx.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'f(x₀ + Δx) ≈ ' }, { blank: 'f(x₀)' }, { text: ' + ' }, { blank: 'f′(x₀)' }, { text: ' · ' }, { blank: 'Δx' }],
          bank: ['f(x₀)', 'f′(x₀)', 'Δx', 'x₀²', 'f′(Δx)']
        }
      }
    },
    {
      id: 'm18q8',
      prompt: 'ln 0,92 ni taqribiy hisoblang.',
      hint: 'ln(1 + x) ≈ x, bu yerda x = −0,08.',
      explanation: 'ln 0,92 = ln(1 − 0,08) ≈ −0,08.',
      widget: { type: 'number_answer', props: { answer: -0.08, tolerance: 0.001 } }
    },
    {
      id: 'm18q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Formula taqribiy — aniq emas.',
      explanation: 'x ga yaqin x₀ aniqroq natija beradi. Formula taqribiy. sin 31° ≈ 1/2 + (√3/2)(π/180) > 1/2.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'x nuqta x₀ ga qancha yaqin boʻlsa, natija shuncha aniq.', value: true },
            { text: 'Kichik orttirmalar formulasi aniq qiymat beradi.', value: false },
            { text: 'sin 31° ni hisoblashda x₀ = 30° olish qulay.', value: true },
            { text: 'sin 31° ning taqribiy qiymati 0,5 dan kichik.', value: false }
          ]
        }
      }
    },
    {
      id: 'm18q10',
      prompt: 'Qaysilarini hisoblashda x₀ = 1 olish qulay? Hammasini belgilab, Tekshirish ni bosing.',
      hint: 'Son 1 ga yaqinmi?',
      explanation: '√1,02, 1,003⁵ va 0,998⁴ — 1 ga yaqin. √25,01 uchun x₀ = 25, ∛8,01 uchun x₀ = 8, sin 31° uchun x₀ = 30° qulay.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: '√1,02', correct: true },
            { label: '1,003⁵', correct: true },
            { label: '0,998⁴', correct: true },
            { label: '√25,01' },
            { label: '∛8,01' },
            { label: 'sin 31°' }
          ]
        }
      }
    }
  ]
};
