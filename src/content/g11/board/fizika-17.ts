import type { BoardLesson } from './types';
import { BOB3 } from './fizika-13';
import { wave } from './phys';

/** Darslik: Fizika 11, 15-mavzu (55–56-betlar) — oʻzgaruvchan tok zanjiridagi kondensator, sigʻim qarshilik. */
export const FIZ_17: BoardLesson = {
  n: 17,
  label: '15',
  group: BOB3,
  title: 'Oʻzgaruvchan tok zanjirida kondensator',
  section: '15-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yaxshi karnay ichida ikki xil dinamik bor: kattasi past tovushlarni, kichigi — tvitter — baland tovushlarni chiqaradi. Tvitter oldiga oddiy kondensator qoʻyiladi va u faqat yuqori chastotali signalni oʻtkazadi. Nega kondensator oʻzgarmas tokni oʻtkazmaydi-yu, oʻzgaruvchan tokni oʻtkazadi? Bugun shuni bilib olamiz.",
      easy: "Kondensator oʻzgarmas tokni oʻtkazmaydi, oʻzgaruvchan tokni oʻtkazadi.",
      draw: [
        { t: 'title', text: 'Karnaydagi kondensator' },
        { t: 'icon', x: 16, y: 34, emoji: '🔊', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🎵', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['katta dinamik — past tovush', 'tvitter — baland tovush', 'kondensator chastotani ajratadi'] }
      ],
      next: 'Tajriba'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kondensator qoplamalari orasida dielektrik bor, shuning uchun oʻzgarmas tok undan oʻtmaydi — lampa yonmaydi. Oʻzgaruvchan kuchlanishga ulasak, lampa yonadi. Aslida zaryadlar dielektrikdan oʻtmaydi: kondensator har yarim davrda qayta-qayta zaryadlanib, razryadlanadi va simlarda tok yuradi.",
      easy: "Oʻzgarmas tok — oʻtmaydi; oʻzgaruvchan tok — kondensator qayta zaryadlanadi, tok yuradi.",
      draw: [
        { t: 'title', text: 'Oʻzgarmas va oʻzgaruvchan tok' },
        { t: 'text', x: 6, y: 30, text: 'oʻzgarmas tok + C', color: 'blue' },
        { t: 'text', x: 56, y: 30, text: '→ lampa yonmaydi', color: 'blue' },
        { t: 'text', x: 6, y: 46, text: 'oʻzgaruvchan tok + C', color: 'red' },
        { t: 'text', x: 56, y: 46, text: '→ lampa yonadi', color: 'red' },
        { t: 'text', x: 6, y: 60, text: 'C qayta-qayta zaryadlanadi', color: 'purple', size: 's' }
      ],
      next: 'Faza siljishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kondensatorga u teng U max kosinus omega t kuchlanish berilsa, zaryad q teng C u. Tok — zaryadning hosilasi: i teng U max C omega kosinus omega t qoʻshuv pi ikkinchi. Demak, kondensatorda tok kuchlanishdan chorak davr, yaʼni pi ikkinchi ga oldinda boradi. Grafikda qizil tok koʻk kuchlanishdan oldin choʻqqiga chiqadi.",
      easy: "Kondensatorda tok kuchlanishdan π/2 ga oldinda.",
      draw: [
        { t: 'title', text: 'Tok π/2 ga oldinda' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 56, h: 44, xmin: 0, xmax: 2, ymin: -1.3, ymax: 1.3, xlabel: 't / T', ylabel: 'u, i' },
        { t: 'curve', axes: 'g', points: wave((t) => Math.cos(2 * Math.PI * t), 0, 2), color: 'blue' },
        { t: 'curve', axes: 'g', points: wave((t) => 0.7 * Math.cos(2 * Math.PI * t + Math.PI / 2), 0, 2), color: 'red' },
        { t: 'list', x: 70, y: 26, items: ['u — koʻk', 'i — qizil', 'i oldinda π/2'] }
      ],
      next: 'Sigʻim qarshilik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tok amplitudasi I max teng U max boʻlinsin X C, bunda X C teng bir boʻlinsin omega C — sigʻim qarshilik. U ham omlarda oʻlchanadi. Sigʻim va chastota qancha katta boʻlsa, sigʻim qarshilik shuncha kichik va tok shuncha katta. Shuning uchun kondensator yuqori chastotani yaxshi oʻtkazadi.",
      easy: "XC = 1/(ωC) = 1/(2πνC); ν yoki C oshsa, XC kamayadi.",
      draw: [
        { t: 'title', text: 'Sigʻim qarshilik' },
        { t: 'formula', x: 4, y: 22, text: 'XC = 1 / (ωC)' },
        { t: 'formula', x: 4, y: 38, text: 'Iₘ = Uₘ / XC' },
        { t: 'axes', id: 'x', x: 50, y: 18, w: 44, h: 44, xmin: 0, xmax: 5, ymin: 0, ymax: 5, xlabel: 'ν', ylabel: 'XC' },
        { t: 'curve', axes: 'x', points: wave((v) => 1 / v, 0.22, 5), color: 'blue' },
        { t: 'text', x: 4, y: 56, text: 'ν ↑ → XC ↓', color: 'purple' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "50 gersli tarmoqqa 50 mikrofaradli kondensator ulandi. Sigʻim qarshilik: bir boʻlinsin 2 pi karra 50 karra 50 karra 10 ning minus 6 darajasi — taxminan 63,7 om.",
      easy: "XC = 1/(2π · 50 · 50·10⁻⁶) ≈ 63,7 Ω.",
      draw: [
        { t: 'title', text: 'Sigʻim qarshilikni topamiz' },
        { t: 'list', x: 6, y: 20, items: ['ν = 50 Hz', 'C = 50 μF = 50 · 10⁻⁶ F'] },
        { t: 'formula', x: 6, y: 46, text: 'XC = 1 / (2πνC) ≈ 63,7 Ω' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Kondensator oʻzgarmas tokni oʻtkazmaydi, oʻzgaruvchan tokda esa qayta-qayta zaryadlanib, zanjirda tok yuradi.',
    'Kondensatorda tok kuchlanishdan π/2 ga oldinda boradi.',
    'Sigʻim qarshilik XC = 1/(ωC); chastota va sigʻim oshsa, u kamayadi: Iₘ = Uₘ/XC.'
  ],
  questions: [
    {
      id: 'f17q1',
      prompt: 'Chastotasi 1 kHz zanjirga 10 μF kondensator ulandi. Sigʻim qarshilik necha Ω? (0,1 gacha)',
      hint: 'XC = 1/(2πνC).',
      explanation: '1 / (6,28 · 1000 · 10⁻⁵) ≈ 15,9 Ω.',
      widget: { type: 'number_answer', props: { answer: 15.9, tolerance: 0.1, unit: 'Ω' } }
    },
    {
      id: 'f17q2',
      prompt: 'Kondensatordagi tok i = 0,03 cos(314t + 1,57), eng katta kuchlanish 60 V. Sigʻim necha μF? (0,01 gacha)',
      hint: 'XC = Uₘ/Iₘ, C = 1/(ω XC).',
      explanation: 'XC = 60/0,03 = 2000 Ω; C = 1/(314 · 2000) ≈ 1,59·10⁻⁶ F.',
      widget: { type: 'number_answer', props: { answer: 1.59, tolerance: 0.03, unit: 'μF' } }
    },
    {
      id: 'f17q3',
      prompt: 'Kuchlanish amplitudasi 100 V, sigʻim qarshilik 50 Ω. Tok amplitudasi necha A?',
      hint: 'Iₘ = Uₘ / XC.',
      explanation: '100 / 50 = 2 A.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'A' } }
    },
    {
      id: 'f17q4',
      prompt: 'Kondensatorda tok va kuchlanish fazalari qanday bogʻlangan?',
      hint: 'i = q′.',
      explanation: 'Tok kuchlanishdan π/2 ga oldinda boradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Bir xil fazada', 'Tok π/2 ga oldinda', 'Tok π/2 ga orqada', 'Tok π ga oldinda'], answerIndex: 1 } }
    },
    {
      id: 'f17q5',
      prompt: 'Tok chastotasi 2 marta oshirildi. Sigʻim qarshilik qanday oʻzgaradi?',
      hint: 'XC ~ 1/ν.',
      explanation: '2 marta kamayadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['2 marta oshadi', '2 marta kamayadi', '4 marta kamayadi', 'oʻzgarmaydi'], answerIndex: 1 } }
    },
    {
      id: 'f17q6',
      prompt: 'Nega kondensatordan oʻzgarmas tok oʻtmaydi?',
      hint: 'Qoplamalar orasida nima bor?',
      explanation: 'Qoplamalar orasida dielektrik bor; oʻzgarmas tokda kondensator bir marta zaryadlanadi va tok toʻxtaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Qoplamalar orasida dielektrik bor', 'Sigʻim juda katta', 'Oʻzgarmas tok kuchsiz', 'Kondensator qiziydi'], answerIndex: 0 } }
    },
    {
      id: 'f17q7',
      prompt: 'Sigʻim qarshilikni kamaytiradigan oʻzgarishlarni belgilang.',
      hint: 'XC = 1/(2πνC).',
      explanation: 'Chastotani yoki sigʻimni oshirish XC ni kamaytiradi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'chastotani oshirish', correct: true },
            { label: 'sigʻimni oshirish', correct: true },
            { label: 'chastotani kamaytirish' },
            { label: 'sigʻimi kichikroq kondensator olish' }
          ]
        }
      }
    },
    {
      id: 'f17q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'XC omlarda oʻlchanadi.',
      explanation: 'XC — Ω da; yuqori chastotali tok oson oʻtadi; zaryadlar dielektrikdan oʻtmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sigʻim qarshilik omlarda oʻlchanadi.', value: true },
            { text: 'Kondensator yuqori chastotali tokni yaxshiroq oʻtkazadi.', value: true },
            { text: 'Oʻzgaruvchan tokda zaryadlar dielektrik orqali oʻtib ketadi.', value: false },
            { text: 'Sigʻim oshsa, sigʻim qarshilik ham oshadi.', value: false }
          ]
        }
      }
    }
  ]
};
