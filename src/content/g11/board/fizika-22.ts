import type { BoardLesson } from './types';
import { BOB3 } from './fizika-13';
import { wave } from './phys';

/** Darslik: Fizika 11, 20-mavzu (66–69-betlar) — oʻzgaruvchan tokning ishi va quvvati, quvvat koeffitsiyenti. */
export const FIZ_22: BoardLesson = {
  n: 22,
  label: '20',
  group: BOB3,
  title: 'Oʻzgaruvchan tok quvvati. Quvvat koeffitsiyenti',
  section: '20-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Zavodlarda yuzlab elektr dvigatel ishlaydi. Ular katta induktiv qarshilikka ega va tarmoqdan olgan energiyaning bir qismini qaytarib beraveradi. Shu sababli zavodlar maxsus kondensatorlar oʻrnatadi, aks holda simlar behuda qiziydi. Bugun oʻzgaruvchan tok quvvati va quvvat koeffitsiyenti — kosinus fi bilan tanishamiz.",
      easy: "Dvigatellar energiyani qaytarib turadi — cos φ muhim.",
      draw: [
        { t: 'title', text: 'Zavod va kondensatorlar' },
        { t: 'icon', x: 16, y: 34, emoji: '🏭', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚙️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['koʻp dvigatel — katta XL', 'energiya ortga qaytadi', 'simlar behuda qiziydi'] }
      ],
      next: 'Oniy quvvat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oniy quvvat p teng u karra i. Kuchlanish U max kosinus omega t, tok esa fi ga siljigan: I max kosinus omega t qoʻshuv fi. Ikki kosinus koʻpaytmasi formulasidan p teng U max I max boʻlinsin 2, karra kosinus fi qoʻshuv kosinus 2 omega t qoʻshuv fi. Ikkinchi had bir davrda oʻrtacha nolga teng.",
      easy: "p = u·i = (Uₘ Iₘ/2)·[cos φ + cos(2ωt + φ)].",
      draw: [
        { t: 'title', text: 'Oniy quvvat' },
        { t: 'formula', x: 6, y: 22, text: 'p = Uₘ Iₘ cos ωt · cos(ωt + φ)' },
        { t: 'formula', x: 6, y: 40, text: 'p = (Uₘ Iₘ/2)·[cos φ + cos(2ωt + φ)]' },
        { t: 'text', x: 6, y: 56, text: 'ikkinchi had oʻrtacha 0', color: 'purple' }
      ],
      next: 'Faqat gʻaltak boʻlsa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Zanjirda faqat gʻaltak boʻlsa, fi teng pi ikkinchi. Grafikda yashil chiziq — quvvat: chorak davr musbat, energiya gʻaltak maydoniga beriladi; keyingi chorak manfiy, energiya tarmoqqa qaytadi. Oʻrtacha quvvat nolga teng — tok bor, lekin foydali ish yoʻq!",
      easy: "φ = π/2: quvvat goh musbat, goh manfiy — oʻrtacha nol.",
      draw: [
        { t: 'title', text: 'φ = π/2 da quvvat' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 58, h: 44, xmin: 0, xmax: 2, ymin: -1.2, ymax: 1.2, xlabel: 't / T', ylabel: 'u, i, p' },
        { t: 'curve', axes: 'g', points: wave((t) => Math.cos(2 * Math.PI * t), 0, 2), color: 'blue' },
        { t: 'curve', axes: 'g', points: wave((t) => 0.7 * Math.cos(2 * Math.PI * t - Math.PI / 2), 0, 2), color: 'red' },
        { t: 'curve', axes: 'g', points: wave((t) => Math.cos(2 * Math.PI * t) * Math.cos(2 * Math.PI * t - Math.PI / 2), 0, 2, 96), color: 'green' },
        { t: 'list', x: 72, y: 26, items: ['u — koʻk', 'i — qizil', 'p — yashil', 'p oʻrt = 0'] }
      ],
      next: 'Oʻrtacha quvvat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻrtacha quvvat: P teng U max I max boʻlinsin 2 karra kosinus fi, effektiv qiymatlarda P teng U karra I karra kosinus fi. Ish: A teng U I t kosinus fi. Kosinus fi — quvvat koeffitsiyenti. Reaktiv qarshilik yoʻq boʻlsa, kosinus fi teng 1, quvvat oʻzgarmas tokdagidek. Faqat reaktiv qarshilik boʻlsa, kosinus fi nol — quvvat ham nol.",
      easy: "P = U·I·cos φ, A = U·I·t·cos φ; cos φ — quvvat koeffitsiyenti.",
      draw: [
        { t: 'title', text: 'Quvvat koeffitsiyenti' },
        { t: 'formula', x: 6, y: 22, text: 'P = U · I · cos φ' },
        { t: 'formula', x: 6, y: 36, text: 'A = U · I · t · cos φ' },
        { t: 'formula', x: 6, y: 50, text: 'cos φ = R / Z' },
        { t: 'list', x: 52, y: 22, items: ['faqat R: cos φ = 1', 'faqat L yoki C: cos φ = 0', 'talab: cos φ ≥ 0,85'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Induktivligi 0,5 genri, qarshiligi 100 om gʻaltak va 10 mikrofarad kondensator u teng 300 sinus 200 pi t manbaga ulangan. Omega 628: X L teng 314 om, X C teng 159 om, farqi 155. Z teng ildiz ostida 100 kvadrat qoʻshuv 155 kvadrat — 184 om. Kosinus fi teng 100 boʻlinsin 184 — 0,54. Quvvat: U max kvadrat boʻlinsin 2Z karra kosinus fi — taxminan 132 vatt.",
      easy: "Z ≈ 184 Ω, cos φ ≈ 0,54, P = Uₘ²/(2Z)·cos φ ≈ 132 W.",
      draw: [
        { t: 'title', text: 'Quvvatni topamiz' },
        { t: 'list', x: 6, y: 20, items: ['XL = 314 Ω, XC ≈ 159 Ω', 'Z = √(100² + 155²) ≈ 184 Ω', 'cos φ = 100 / 184 ≈ 0,54'] },
        { t: 'formula', x: 6, y: 54, text: 'P = Uₘ² / (2Z) · cos φ ≈ 132 W' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Oʻzgaruvchan tokning oʻrtacha quvvati P = U·I·cos φ, ishi A = U·I·t·cos φ (U, I — effektiv qiymatlar).',
    'cos φ = R/Z — quvvat koeffitsiyenti; faqat reaktiv qarshilikli zanjirda oʻrtacha quvvat nol.',
    'Kichik cos φ da energiya simlarni behuda qizdiradi; uni kompensatsiya kondensatorlari oshiradi.'
  ],
  questions: [
    {
      id: 'f22q1',
      prompt: 'Dvigatel 220 V tarmoqdan 5 A tok oladi, cos φ = 0,8. Quvvati necha W?',
      hint: 'P = U·I·cos φ.',
      explanation: '220 · 5 · 0,8 = 880 W.',
      widget: { type: 'number_answer', props: { answer: 880, unit: 'W' } }
    },
    {
      id: 'f22q2',
      prompt: 'Oʻsha dvigatel 2 soat ishlasa, necha kWh energiya sarflaydi?',
      hint: 'A = P · t.',
      explanation: '0,88 kW · 2 h = 1,76 kWh.',
      widget: { type: 'number_answer', props: { answer: 1.76, tolerance: 0.01, unit: 'kWh' } }
    },
    {
      id: 'f22q3',
      prompt: 'Zanjirda R = 60 Ω, toʻla qarshilik Z = 100 Ω. Quvvat koeffitsiyenti nechaga teng?',
      hint: 'cos φ = R/Z.',
      explanation: '60 / 100 = 0,6.',
      widget: { type: 'number_answer', props: { answer: 0.6, tolerance: 0.001 } }
    },
    {
      id: 'f22q4',
      prompt: 'Uₘ = 100 V, Iₘ = 2 A, φ = 60°. Oʻrtacha quvvat necha W?',
      hint: 'P = Uₘ Iₘ/2 · cos φ.',
      explanation: '100 · 2 / 2 · 0,5 = 50 W.',
      widget: { type: 'number_answer', props: { answer: 50, unit: 'W' } }
    },
    {
      id: 'f22q5',
      prompt: 'Zanjirga faqat ideal gʻaltak ulangan. Oʻrtacha quvvat qanday?',
      hint: 'cos 90° = 0.',
      explanation: 'φ = π/2, cos φ = 0, oʻrtacha quvvat nolga teng.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['U · I', 'U · I / 2', 'nolga teng', 'cheksiz katta'], answerIndex: 2 } }
    },
    {
      id: 'f22q6',
      prompt: 'Zavodlarda cos φ ni oshirish uchun nima qilinadi?',
      hint: 'Induktiv qarshilikni nima kompensatsiya qiladi?',
      explanation: 'Tarmoqqa kompensatsiya qiluvchi kondensatorlar ulanadi va dvigatellar yuksiz ishlatilmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Qoʻshimcha gʻaltaklar ulanadi', 'Kompensatsiya kondensatorlari ulanadi', 'Kuchlanish kamaytiriladi', 'Dvigatellar yuksiz ishlatiladi'], answerIndex: 1 } }
    },
    {
      id: 'f22q7',
      prompt: 'Zanjir turini cos φ bilan moslang.',
      hint: 'cos φ = R/Z.',
      explanation: 'Faqat R — 1; faqat L yoki C — 0; RLC — 0 dan 1 gacha.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'faqat rezistor', right: 'cos φ = 1' },
            { left: 'faqat gʻaltak', right: 'cos φ = 0' },
            { left: 'R, L, C aralash', right: '0 < cos φ < 1' }
          ]
        }
      }
    },
    {
      id: 'f22q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Energiya ortga qaytadi.',
      explanation: 'φ ≠ 0 da energiyaning bir qismi tarmoqqa qaytadi; past cos φ simlarni qizdiradi; cos φ < 0,85 li qurilmalarga ruxsat berilmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Faza siljishi boʻlsa, energiyaning bir qismi tarmoqqa qaytib turadi.', value: true },
            { text: 'cos φ qanchalik kichik boʻlsa, shunchalik yaxshi.', value: false },
            { text: 'Elektr dvigatellari quvvat koeffitsiyentini kamaytiradi.', value: true },
            { text: 'Oʻrtacha quvvat tok va kuchlanishning amplitudalari koʻpaytmasiga teng.', value: false }
          ]
        }
      }
    }
  ]
};
