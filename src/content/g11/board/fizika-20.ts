import type { BoardLesson } from './types';
import { BOB3 } from './fizika-13';
import { wave } from './phys';

const res = (R: number) => (w: number) => 1 / Math.sqrt(R * R + (w - 1 / w) ** 2);

/** Darslik: Fizika 11, 18-mavzu (62–64-betlar) — oʻzgaruvchan tok zanjirida rezonans hodisasi. */
export const FIZ_20: BoardLesson = {
  n: 20,
  label: '18',
  group: BOB3,
  title: 'Oʻzgaruvchan tok zanjirida rezonans',
  section: '18-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Efirda bir vaqtning oʻzida oʻnlab radiostansiyalar eshittirish beradi, signallarning hammasi antennaga keladi. Murvatni burasangiz, bitta stansiya aniq eshitiladi, qolganlari esa yoʻq. Radio qanday qilib kerakli stansiyani tanlaydi? Javob — rezonans hodisasida.",
      easy: "Radio murvati kerakli stansiyani tanlaydi — bu rezonans.",
      draw: [
        { t: 'title', text: 'Radio stansiyani tanlaydi' },
        { t: 'icon', x: 16, y: 34, emoji: '📻', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🎚️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['antennaga koʻp signal keladi', 'murvat — kondensator sigʻimi', 'bitta stansiya kuchayadi'] }
      ],
      next: 'Rezonans sharti'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻla qarshilik Z teng ildiz ostida R kvadrat qoʻshuv X L minus X C ning kvadrati. Agar X L teng X C boʻlsa, qavs nolga aylanadi va Z eng kichik — R ga teng boʻladi. Tok esa eng katta: U max boʻlinsin R. Bu rezonans. Shart: omega L teng bir boʻlinsin omega C, yaʼni omega teng bir boʻlinsin ildiz L C — tashqi chastota konturning xususiy chastotasiga teng.",
      easy: "XL = XC → Z = R (eng kichik), Iₘ = Uₘ/R (eng katta). ω = 1/√(LC).",
      draw: [
        { t: 'title', text: 'Rezonans sharti' },
        { t: 'formula', x: 6, y: 22, text: 'XL = XC  →  Z = R' },
        { t: 'formula', x: 6, y: 38, text: 'Iₘ = Uₘ / R — eng katta' },
        { t: 'formula', x: 6, y: 54, text: 'ω rez = 1 / √(LC) = ω₀' }
      ],
      next: 'Rezonans egri chizigʻi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tashqi chastotani oshirib borsak, tok amplitudasi oʻsadi, omega nol da eng kattaga yetadi, keyin yana kamayadi. Bu grafik rezonans egri chizigʻi deyiladi. Qarshilik qancha kichik boʻlsa, choʻqqi shuncha baland va oʻtkir: qizil — kichik R, koʻk — oʻrtacha, yashil — katta R. Katta qarshilikda rezonans deyarli sezilmaydi.",
      easy: "Iₘ chastotada ω₀ da eng katta; R kichik — choʻqqi oʻtkir.",
      draw: [
        { t: 'title', text: 'Rezonans egri chizigʻi' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 58, h: 44, xmin: 0, xmax: 3, ymin: 0, ymax: 4.3, xlabel: 'ω / ω₀', ylabel: 'I max' },
        { t: 'curve', axes: 'g', points: wave(res(0.25), 0.15, 3, 120), color: 'red' },
        { t: 'curve', axes: 'g', points: wave(res(0.5), 0.15, 3, 120), color: 'blue' },
        { t: 'curve', axes: 'g', points: wave(res(1), 0.15, 3, 120), color: 'green' },
        { t: 'list', x: 72, y: 26, items: ['R₁ < R₂ < R₃', 'qizil — R₁', 'yashil — R₃'] }
      ],
      next: 'Kuchlanishlar rezonansi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Rezonansda tok keskin oshgani uchun gʻaltak va kondensatordagi kuchlanishlar ham oshadi: U L teng U C teng U max boʻlinsin R karra ildiz ostida L boʻlinsin C. Ular manba kuchlanishidan ham ancha katta boʻlishi mumkin — bu kuchlanishlar rezonansi. Radiolarda bu foydali, lekin elektr qurilmalarida kondensator yoki gʻaltakni teshib yuborishi mumkin.",
      easy: "Rezonansda UL = UC manba kuchlanishidan katta boʻlishi mumkin.",
      draw: [
        { t: 'title', text: 'Kuchlanishlar rezonansi' },
        { t: 'formula', x: 6, y: 22, text: 'UL = UC = (Uₘ / R) · √(L / C)' },
        { t: 'list', x: 6, y: 38, items: ['UL, UC > Uₘ boʻlishi mumkin', 'radio — kerakli stansiya', 'xavf — elektr teshilish'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "50 gersli zanjirda 100 millihenrili gʻaltak bor. Qanday sigʻimda rezonans boʻladi? C teng bir boʻlinsin 4 pi kvadrat nu kvadrat L: 4 karra 9,86 karra 2500 karra 0,1 — taxminan 9860, demak C taxminan 0,0001 farad, yaʼni 100 mikrofarad.",
      easy: "C = 1/(4π²ν²L) ≈ 101 μF ≈ 100 μF.",
      draw: [
        { t: 'title', text: 'Rezonans sigʻimi' },
        { t: 'list', x: 6, y: 20, items: ['ν = 50 Hz, L = 0,1 H', 'ωL = 1/(ωC)'] },
        { t: 'formula', x: 6, y: 46, text: 'C = 1 / (4π² ν² L) ≈ 101 μF' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Rezonansda XL = XC: toʻla qarshilik eng kichik (Z = R), tok eng katta (Iₘ = Uₘ/R).',
    'Shart: ω = 1/√(LC) — tashqi chastota konturning xususiy chastotasiga teng.',
    'Kuchlanishlar rezonansida UL = UC manbadan katta boʻlishi mumkin; radiolarda foydali, qurilmalarda xavfli.'
  ],
  questions: [
    {
      id: 'f20q1',
      prompt: '400 Hz zanjirga 0,1 H gʻaltak ulangan. Qanday sigʻimda rezonans boʻladi (μF)? (0,01 gacha)',
      hint: 'C = 1/(4π²ν²L).',
      explanation: '1 / (39,5 · 160000 · 0,1) ≈ 1,58·10⁻⁶ F.',
      widget: { type: 'number_answer', props: { answer: 1.58, tolerance: 0.03, unit: 'μF' } }
    },
    {
      id: 'f20q2',
      prompt: 'L = 10 mH, C = 1 μF. Rezonans chastotasi necha Hz? (butun songacha)',
      hint: 'ν = 1/(2π√LC).',
      explanation: '√(10⁻⁸) = 10⁻⁴; ν = 1/(6,28·10⁻⁴) ≈ 1592 Hz.',
      widget: { type: 'number_answer', props: { answer: 1592, tolerance: 5, unit: 'Hz' } }
    },
    {
      id: 'f20q3',
      prompt: 'Rezonansda Uₘ = 10 V, R = 5 Ω. Tok amplitudasi necha A?',
      hint: 'Rezonansda Z = R.',
      explanation: '10 / 5 = 2 A.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'A' } }
    },
    {
      id: 'f20q4',
      prompt: 'Rezonansda Uₘ = 10 V, R = 10 Ω, L = 0,1 H, C = 10 μF. Gʻaltakdagi kuchlanish amplitudasi necha V?',
      hint: 'UL = (Uₘ/R)·√(L/C).',
      explanation: '√(0,1 / 10⁻⁵) = 100; UL = 1 · 100 = 100 V — manbadan 10 marta katta!',
      widget: { type: 'number_answer', props: { answer: 100, unit: 'V' } }
    },
    {
      id: 'f20q5',
      prompt: 'Rezonans paytida RLC zanjirining toʻla qarshiligi qanday?',
      hint: 'XL − XC = 0.',
      explanation: 'Z = R — aktiv qarshilikka teng.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['R dan katta', 'R ga teng', 'R dan kichik', 'nolga teng'], answerIndex: 1 } }
    },
    {
      id: 'f20q6',
      prompt: 'Aktiv qarshilik oshsa, rezonans egri chizigʻi qanday oʻzgaradi?',
      hint: 'Iₘ max = Uₘ/R.',
      explanation: 'Choʻqqi pasayadi va yoyilib ketadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Choʻqqi balandlashadi', 'Choʻqqi pasayadi va yoyiladi', 'Choʻqqi boshqa chastotaga siljiydi', 'Oʻzgarmaydi'], answerIndex: 1 } }
    },
    {
      id: 'f20q7',
      prompt: 'Radiopriyomnik kerakli stansiyani qanday tanlaydi?',
      hint: 'Konturning xususiy chastotasi.',
      explanation: 'Kontur sigʻimi (yoki induktivligi) oʻzgartirilib, xususiy chastota stansiya chastotasiga tenglashtiriladi — rezonans.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Antenna uzunligini oʻzgartiradi', 'Kontur xususiy chastotasini stansiya chastotasiga tenglaydi', 'Ovoz balandligini oshiradi', 'Batareya kuchlanishini oʻzgartiradi'], answerIndex: 1 } }
    },
    {
      id: 'f20q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Rezonansda tok va kuchlanish bir fazada.',
      explanation: 'Rezonansda φ = 0; UL manbadan katta boʻlishi mumkin; R katta boʻlsa rezonans deyarli sezilmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Rezonansda tok va umumiy kuchlanish bir fazada tebranadi.', value: true },
            { text: 'Rezonansda gʻaltakdagi kuchlanish manba kuchlanishidan katta boʻla olmaydi.', value: false },
            { text: 'Aktiv qarshilik juda katta boʻlsa, rezonans amalda kuzatilmaydi.', value: true },
            { text: 'Rezonans uchun tashqi chastota xususiy chastotadan 2 marta katta boʻlishi kerak.', value: false }
          ]
        }
      }
    }
  ]
};
