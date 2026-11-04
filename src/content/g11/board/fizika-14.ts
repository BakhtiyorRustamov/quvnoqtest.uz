import type { BoardLesson } from './types';
import { BOB3 } from './fizika-13';
import { wave } from './phys';

/** Darslik: Fizika 11, 12-mavzu (45–48-betlar) — tebranishlarni grafik tasvirlash, soʻnuvchi elektromagnit tebranishlar. */
export const FIZ_14: BoardLesson = {
  n: 14,
  label: '12',
  group: BOB3,
  title: 'Tebranishlar grafigi. Soʻnuvchi tebranishlar',
  section: '12-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Gitara torini chertsangiz, ovoz avval baland, keyin asta-sekin pasayib, tinadi. Argʻimchoq ham itarilmasa, oxiri toʻxtaydi. Real tebranish konturida ham shunday: tebranishlar sekin-asta soʻnadi. Bugun tebranishlarni grafikda tasvirlaymiz va nega ular soʻnishini bilib olamiz.",
      easy: "Tor ovozi asta tinadi — real tebranishlar soʻnadi.",
      draw: [
        { t: 'title', text: 'Nega ovoz tinadi?' },
        { t: 'icon', x: 16, y: 34, emoji: '🎸', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🎠', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['avval baland ovoz', 'keyin asta pasayadi', 'oxiri tinadi — soʻnish'] }
      ],
      next: 'Garmonik tebranish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tashqi taʼsirsiz paydo boʻladigan tebranishlar erkin tebranishlar deyiladi. Konturda zaryad q teng q max karra kosinus 2 pi nu t qonuni bilan oʻzgaradi. Kuchlanish ham xuddi shunday: U teng U max kosinus. Tok esa sinus boʻyicha oʻzgaradi. Sinus yoki kosinus boʻyicha oʻzgarish garmonik tebranish, eng katta qiymat esa amplituda deyiladi.",
      easy: "q = qₘ cos 2πνt, U = Uₘ cos 2πνt, I = Iₘ sin 2πνt.",
      draw: [
        { t: 'title', text: 'Garmonik tebranishlar' },
        { t: 'formula', x: 6, y: 22, text: 'q = qₘ · cos 2πνt' },
        { t: 'formula', x: 6, y: 36, text: 'U = Uₘ · cos 2πνt' },
        { t: 'formula', x: 6, y: 50, text: 'I = Iₘ · sin 2πνt' },
        { t: 'text', x: 56, y: 36, text: 'qₘ, Uₘ, Iₘ — amplituda', color: 'purple', size: 's' }
      ],
      next: 'Grafiklar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Grafikda koʻk chiziq — zaryad, qizil — tok. Zaryad eng katta boʻlgan paytda tok nolga teng, tok eng katta boʻlganda zaryad nol. Tok tebranishlari zaryaddan chorak davr, yaʼni pi ikkinchi fazaga siljigan. Zaryad va kuchlanish esa bir xil fazada oʻzgaradi.",
      easy: "q max → I = 0. Tok zaryaddan π/2 ga siljigan.",
      draw: [
        { t: 'title', text: 'Zaryad va tok grafigi' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 58, h: 44, xmin: 0, xmax: 2, ymin: -1.3, ymax: 1.3, xlabel: 't / T', ylabel: 'q, i' },
        { t: 'curve', axes: 'g', points: wave((t) => Math.cos(2 * Math.PI * t), 0, 2), color: 'blue' },
        { t: 'curve', axes: 'g', points: wave((t) => Math.sin(2 * Math.PI * t), 0, 2), color: 'red' },
        { t: 'list', x: 72, y: 26, items: ['q — koʻk', 'i — qizil', 'siljish π/2'] }
      ],
      next: 'Soʻnuvchi tebranishlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Real konturda simlarning qarshiligi R noldan katta. Tok oʻtganda energiyaning bir qismi Q teng I kvadrat R t issiqlikka aylanadi va amplituda kamayib boradi. Bunday tebranishlar soʻnuvchi tebranishlar deyiladi. Qarshilik qancha katta boʻlsa, tebranishlar shuncha tez soʻnadi. Soʻnuvchi tebranishlar garmonik emas.",
      easy: "Qarshilik energiyani issiqlikka aylantiradi — amplituda kamayadi.",
      draw: [
        { t: 'title', text: 'Soʻnuvchi tebranishlar' },
        { t: 'axes', id: 's', x: 8, y: 18, w: 58, h: 44, xmin: 0, xmax: 4, ymin: -1.2, ymax: 1.2, xlabel: 't', ylabel: 'q' },
        { t: 'curve', axes: 's', points: wave((t) => Math.exp(-0.45 * t) * Math.cos(2 * Math.PI * t), 0, 4, 96), color: 'blue' },
        { t: 'list', x: 72, y: 26, items: ['R > 0', 'Q = I² R t', 'amplituda ↓'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Konturda kuchlanish amplitudasi 100 volt, chastota 5 megagers. Qancha vaqtdan keyin kuchlanish 71 volt boʻladi? Kosinus omega t teng 0,71, demak omega t teng pi toʻrtinchi, yaʼni t teng davrning sakkizdan biri. Davr 1 boʻlinsin 5 million — 200 nanosekund, sakkizdan biri 25 nanosekund.",
      easy: "cos ωt = 0,71 → t = T/8 = 200 ns / 8 = 25 ns.",
      draw: [
        { t: 'title', text: 'Kuchlanish qachon 71 V?' },
        { t: 'list', x: 6, y: 20, items: ['Uₘ = 100 V, ν = 5 MHz', 'cos ωt = 0,71 → ωt = π/4', 'T = 1/ν = 200 ns'] },
        { t: 'formula', x: 6, y: 54, text: 't = T / 8 = 25 ns' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Erkin tebranishlarda q = qₘcos2πνt, U = Uₘcos2πνt, I = Iₘsin2πνt — garmonik tebranishlar.',
    'Zaryad va kuchlanish bir fazada; tok zaryaddan π/2 ga siljigan: q max boʻlganda I = 0.',
    'Real konturda qarshilik tufayli energiya issiqlikka aylanadi — tebranishlar soʻnadi.'
  ],
  questions: [
    {
      id: 'f14q1',
      prompt: 'Kondensator zaryadi q = 10⁻³ · cos 100πt (C) qonuni bilan oʻzgarmoqda. Tebranish chastotasi necha Hz?',
      hint: 'ω = 2πν = 100π.',
      explanation: 'ν = 100π / 2π = 50 Hz.',
      widget: { type: 'number_answer', props: { answer: 50, unit: 'Hz' } }
    },
    {
      id: 'f14q2',
      prompt: 'Zaryad q = 10⁻³ · cos 1000t (C) qonuni bilan oʻzgarmoqda. Tok amplitudasi necha A?',
      hint: 'Iₘ = qₘ · ω.',
      explanation: '10⁻³ · 1000 = 1 A.',
      widget: { type: 'number_answer', props: { answer: 1, unit: 'A' } }
    },
    {
      id: 'f14q3',
      prompt: 'Konturda C = 2,5 μF, L = 1 H. Zaryad tebranishlarining siklik chastotasi ω necha rad/s? (butun songacha)',
      hint: 'ω = 1 / √(LC).',
      explanation: '1 / √(2,5·10⁻⁶) ≈ 632 rad/s.',
      widget: { type: 'number_answer', props: { answer: 632, tolerance: 3, unit: 'rad/s' } }
    },
    {
      id: 'f14q4',
      prompt: 'Zaryadlangan 0,5 μF kondensator 5 mH gʻaltakka ulandi. Necha μs dan keyin elektr va magnit energiyalar birinchi marta tenglashadi? (butun songacha)',
      hint: 'Energiyalar T/8 da tenglashadi.',
      explanation: 'T = 2π√(2,5·10⁻⁹) ≈ 314 μs; T/8 ≈ 39 μs.',
      widget: { type: 'number_answer', props: { answer: 39.3, tolerance: 1, unit: 'μs' } }
    },
    {
      id: 'f14q5',
      prompt: 'Qarshiligi 50 Ω zanjirda kuchlanish amplitudasi 100 V, chastota 100 Hz. Tok tenglamasi qaysi?',
      hint: 'Iₘ = Uₘ / R, ω = 2πν.',
      explanation: 'Iₘ = 2 A, ω = 200π: i = 2 cos 200πt.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['i = 2 cos 200πt', 'i = 2 cos 100πt', 'i = 5000 cos 200πt', 'i = 0,5 cos 200πt'], answerIndex: 0 } }
    },
    {
      id: 'f14q6',
      prompt: 'Qaysi tebranishlar soʻnuvchi?',
      hint: 'Qayerda qarshilik bor?',
      explanation: 'Real konturda qarshilik bor — tebranishlar soʻnadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Garmonik tebranishlar', 'Ideal konturdagi tebranishlar', 'Real konturdagi tebranishlar', 'Hammasi'], answerIndex: 2 } }
    },
    {
      id: 'f14q7',
      prompt: 'Kondensator zaryadi eng katta boʻlgan paytda konturdagi tok qanday?',
      hint: 'Grafikni eslang.',
      explanation: 'Zaryad maksimal boʻlganda tok nolga teng.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Eng katta', 'Nolga teng', 'Amplitudaning yarmi', 'Teskari yoʻnalishda eng katta'], answerIndex: 1 } }
    },
    {
      id: 'f14q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Zaryad va kuchlanish bir fazada.',
      explanation: 'q va U bir fazada; qarshilik oshsa soʻnish tezlashadi; soʻnuvchi tebranish garmonik emas.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Zaryad va kuchlanish bir xil fazada oʻzgaradi.', value: true },
            { text: 'Kontur qarshiligi oshsa, tebranishlar sekinroq soʻnadi.', value: false },
            { text: 'Soʻnuvchi tebranishlar garmonik emas.', value: true },
            { text: 'Amplituda — tebranayotgan kattalikning eng katta qiymati.', value: true }
          ]
        }
      }
    }
  ]
};
