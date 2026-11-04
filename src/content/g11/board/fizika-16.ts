import type { BoardLesson } from './types';
import { BOB3 } from './fizika-13';
import { seg, vec, wave } from './phys';

/** Darslik: Fizika 11, 14-mavzu (51–54-betlar) — oʻzgaruvchan tok zanjiridagi aktiv qarshilik, effektiv qiymatlar. */
export const FIZ_16: BoardLesson = {
  n: 16,
  label: '14',
  group: BOB3,
  title: 'Oʻzgaruvchan tok zanjirida aktiv qarshilik',
  section: '14-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Uydagi rozetkada tok yoʻnalishi sekundiga 100 marta oʻzgaradi, chastotasi 50 gers. Demak, choʻgʻlanma lampa sekundiga 100 marta oʻchib-yonadi! Biz buni sezmaymiz, chunki koʻz sekundiga 16–20 tadan tez oʻzgarishni ilgʻamaydi. Bunday tokning quvvatini qanday hisoblaymiz? Bugun shuni oʻrganamiz.",
      easy: "50 Hz da lampa sekundiga 100 marta oʻchib-yonadi — koʻz sezmaydi.",
      draw: [
        { t: 'title', text: 'Lampa miltillaydimi?' },
        { t: 'icon', x: 16, y: 34, emoji: '💡', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '👁️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['chastota 50 Hz', '100 marta oʻchib-yonadi', 'koʻz sezmaydi'] }
      ],
      next: 'Vektor diagramma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻzgaruvchan kattalikni aylanuvchi vektor bilan tasvirlash qulay. Uzunligi I max boʻlgan vektor soat strelkasiga teskari aylanadi, bir marta aylanish vaqti — tok davriga teng. Vektorning vertikal oʻqdagi proyeksiyasi tokning oniy qiymatini beradi.",
      easy: "Aylanuvchi vektorning proyeksiyasi — oniy qiymat.",
      draw: [
        { t: 'title', text: 'Aylanuvchi vektor' },
        { t: 'ellipse', cx: 24, cy: 44, rx: 13, ry: 13, color: 'blue' },
        ...seg('ax', 24, 28, 24, 60, 'ink'),
        ...seg('ay', 8, 44, 40, 44, 'ink'),
        ...vec('Im', 24, 44, 34, 35.6, 'red'),
        { t: 'text', x: 35, y: 33, text: 'Iₘ', color: 'red', size: 's' },
        ...seg('pr', 34, 35.6, 24, 35.6, 'purple', true),
        { t: 'text', x: 18, y: 36, text: 'i', color: 'purple' },
        { t: 'text', x: 28, y: 42, text: 'ωt', size: 's' },
        { t: 'list', x: 48, y: 28, items: ['vektor uzunligi — Iₘ', 'bir aylanish — davr T', 'proyeksiya — oniy i'] }
      ],
      next: 'Aktiv qarshilik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Dazmol, lampa, isitgichdagi qarshilik aktiv qarshilik deyiladi: unda elektr energiyasi toʻliq issiqlik yoki yorugʻlikka aylanadi. Kuchlanish u teng U max kosinus omega t boʻlsa, Om qonunidan tok i teng I max kosinus omega t, bunda I max teng U max boʻlinsin R. Kuchlanish va tok bir xil fazada tebranadi.",
      easy: "Aktiv qarshilikda u va i bir fazada: Iₘ = Uₘ / R.",
      draw: [
        { t: 'title', text: 'Aktiv qarshilikda u va i' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 56, h: 44, xmin: 0, xmax: 2, ymin: -1.3, ymax: 1.3, xlabel: 't / T', ylabel: 'u, i' },
        { t: 'curve', axes: 'g', points: wave((t) => Math.cos(2 * Math.PI * t), 0, 2), color: 'blue' },
        { t: 'curve', axes: 'g', points: wave((t) => 0.55 * Math.cos(2 * Math.PI * t), 0, 2), color: 'red' },
        { t: 'list', x: 70, y: 26, items: ['u — koʻk', 'i — qizil', 'faza farqi 0', 'Iₘ = Uₘ / R'] }
      ],
      next: 'Quvvat va effektiv qiymat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oniy quvvat P teng i karra u, yaʼni P max karra kosinus kvadrat omega t — u doim musbat, lekin oʻzgarib turadi. Shuning uchun effektiv qiymat kiritiladi: oʻzgaruvchan tok aktiv qarshilikda qancha issiqlik chiqarsa, xuddi shuncha issiqlik chiqaradigan oʻzgarmas tok. I ef teng I max boʻlinsin ildiz 2, U ef teng U max boʻlinsin ildiz 2. Oʻrtacha quvvat: I max U max boʻlinsin 2.",
      easy: "I_ef = Iₘ/√2, U_ef = Uₘ/√2; P = Iₘ·Uₘ/2.",
      draw: [
        { t: 'title', text: 'Effektiv qiymatlar' },
        { t: 'formula', x: 6, y: 22, text: 'P = Pₘ · cos² ωt ≥ 0' },
        { t: 'formula', x: 6, y: 38, text: 'I ef = Iₘ / √2,   U ef = Uₘ / √2' },
        { t: 'formula', x: 6, y: 54, text: 'P oʻrt = Iₘ Uₘ / 2 = I ef · U ef' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Amplitudasi 30 volt boʻlgan oʻzgaruvchan kuchlanishga rezistor ulandi, tok amplitudasi 2 amper. Rezistordagi oʻrtacha quvvat: 2 karra 30 boʻlinsin 2, yaʼni 30 vatt.",
      easy: "P = 2 · 30 / 2 = 30 W.",
      draw: [
        { t: 'title', text: 'Oʻrtacha quvvat' },
        { t: 'list', x: 6, y: 20, items: ['Uₘ = 30 V', 'Iₘ = 2 A'] },
        { t: 'formula', x: 6, y: 46, text: 'P = Iₘ Uₘ / 2 = 30 W' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Oʻzgaruvchan kattalikni aylanuvchi vektor bilan tasvirlash mumkin: proyeksiya — oniy qiymat.',
    'Aktiv qarshilikda kuchlanish va tok bir fazada: i = Iₘ cos ωt, Iₘ = Uₘ / R.',
    'Effektiv qiymatlar: I_ef = Iₘ/√2, U_ef = Uₘ/√2; oʻrtacha quvvat P = Iₘ·Uₘ/2.'
  ],
  questions: [
    {
      id: 'f16q1',
      prompt: 'Tok i = 8,5 sin(628t + 0,325) qonuni bilan oʻzgaradi. Tokning effektiv qiymati necha A? (0,01 gacha)',
      hint: 'I_ef = Iₘ / √2.',
      explanation: '8,5 / 1,414 ≈ 6,01 A.',
      widget: { type: 'number_answer', props: { answer: 6.01, tolerance: 0.03, unit: 'A' } }
    },
    {
      id: 'f16q2',
      prompt: 'Oʻsha tokning (ω = 628 rad/s) chastotasi necha Hz?',
      hint: 'ν = ω / 2π.',
      explanation: '628 / 6,28 = 100 Hz.',
      widget: { type: 'number_answer', props: { answer: 100, tolerance: 0.5, unit: 'Hz' } }
    },
    {
      id: 'f16q3',
      prompt: 'Tarmoqdagi kuchlanish amplitudasi 311 V. Effektiv kuchlanish necha V? (butun songacha)',
      hint: 'U_ef = Uₘ / √2.',
      explanation: '311 / 1,414 ≈ 220 V.',
      widget: { type: 'number_answer', props: { answer: 220, tolerance: 1, unit: 'V' } }
    },
    {
      id: 'f16q4',
      prompt: 'Effektiv kuchlanishi 220 V tarmoqqa 110 Ω li isitgich ulandi. Oʻrtacha quvvat necha W?',
      hint: 'P = U_ef² / R.',
      explanation: '220² / 110 = 440 W.',
      widget: { type: 'number_answer', props: { answer: 440, unit: 'W' } }
    },
    {
      id: 'f16q5',
      prompt: 'Aktiv qarshilikda kuchlanish va tok orasidagi faza siljishi qancha?',
      hint: 'Grafiklar bir vaqtda maksimumga yetadi.',
      explanation: 'Faza farqi nolga teng — bir xil fazada.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0', 'π/2', 'π', '2π'], answerIndex: 0 } }
    },
    {
      id: 'f16q6',
      prompt: 'Nega 50 Hz tarmoqdagi lampa miltillashini sezmaymiz?',
      hint: 'Koʻz necha marta / s ilgʻaydi?',
      explanation: 'Lampa sekundiga 100 marta oʻchib-yonadi, koʻz esa 16–20 tadan tezini ilgʻamaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Lampa umuman oʻchmaydi', 'Koʻz tez oʻzgarishni ilgʻamaydi', 'Tok oʻzgarmas', 'Lampa juda yorqin'], answerIndex: 1 } }
    },
    {
      id: 'f16q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Effektiv qiymatning taʼrifi.',
      explanation: 'Effektiv qiymat — aktiv qarshilikda shuncha issiqlik chiqaradigan oʻzgarmas tok; Iₘ ni √2 ga boʻlamiz.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Tokning effektiv qiymati — aktiv qarshilikda xuddi shuncha ' },
            { blank: 'issiqlik' },
            { text: ' chiqaradigan oʻzgarmas tok. U amplitudani ' },
            { blank: '√2' },
            { text: ' ga boʻlib topiladi.' }
          ],
          bank: ['issiqlik', '√2', 'yorugʻlik', '2']
        }
      }
    },
    {
      id: 'f16q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'cos² doim musbat.',
      explanation: 'Oniy quvvat manfiy boʻlmaydi; aktiv qarshilikda energiya toʻliq issiqlikka aylanadi; effektiv qiymat amplitudadan kichik.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Aktiv qarshilikda oniy quvvat hech qachon manfiy boʻlmaydi.', value: true },
            { text: 'Effektiv qiymat amplituda qiymatidan katta.', value: false },
            { text: 'Aktiv qarshilikda elektr energiya toʻliq boshqa turga aylanadi.', value: true },
            { text: 'Aylanuvchi vektorning gorizontal proyeksiyasi oniy qiymatni beradi.', value: false }
          ]
        }
      }
    }
  ]
};
