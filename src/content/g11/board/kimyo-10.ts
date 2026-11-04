import type { BoardLesson } from './types';
import { BOB3 } from './kimyo-9';

/** Darslik: Umumiy kimyo 11, 10-mavzu (54–58-betlar) — dissotsilanish darajasi, ion almashinish reaksiyalari, toʻliq va qisqa ionli tenglamalar. */
export const KIM_10: BoardLesson = {
  n: 10,
  label: '10',
  group: BOB3,
  title: 'Dissotsilanish darajasi. Ionli tenglamalar',
  section: '10-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ikki xil eritmaning konsentratsiyasi bir xil, lekin biri tokni yaxshi oʻtkazadi, ikkinchisi — yomon. Gap shundaki, molekulalarning hammasi ham ionlarga ajralavermaydi. Qancha qismi ajralganini dissotsilanish darajasi koʻrsatadi.",
      easy: "Molekulalarning hammasi ham ionlarga ajralmaydi.",
      draw: [
        { t: 'title', text: 'Hammasi ajraladimi?' },
        { t: 'icon', x: 16, y: 34, emoji: '🔬', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '💡', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['NaCl — deyarli hammasi ionlarda', 'CH₃COOH — ozgina qismi', 'α — ajralgan ulush'] }
      ],
      next: 'Dissotsilanish darajasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Dissotsilanish darajasi alfa — ionlarga ajralgan molekulalar sonining umumiy molekulalar soniga nisbati: alfa teng n boʻlinsin N. Uni foizda ham ifodalaymiz. Alfa 3 foizdan kichik — kuchsiz, 3 dan 30 foizgacha — oʻrtacha, 30 foizdan katta — kuchli elektrolit. Alfa moddaning va erituvchining tabiatiga, konsentratsiya va haroratga bogʻliq.",
      easy: "α = n / N; < 3 % kuchsiz, 3–30 % oʻrtacha, > 30 % kuchli.",
      draw: [
        { t: 'title', text: 'Dissotsilanish darajasi' },
        { t: 'formula', x: 4, y: 24, text: 'α = n / N · 100 %' },
        { t: 'table', x: 4, y: 34, rows: [['α', 'elektrolit'], ['< 3 %', 'kuchsiz'], ['3–30 %', 'oʻrtacha'], ['> 30 %', 'kuchli']] },
        { t: 'list', x: 54, y: 38, items: ['bogʻliq:', 'tabiat, erituvchi', 'konsentratsiya, t'] }
      ],
      next: 'Ionli tenglamalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eritmalardagi reaksiyalar ionlar orasida boradi — ion almashinish reaksiyalari. Ionli tenglamada kuchli elektrolitlar ionlar holida yoziladi; choʻkma, gaz va kuchsiz elektrolitlar — molekula holida. Masalan, qoʻrgʻoshin nitrat va kaliy yodid: toʻliq ionli tenglamadan bir xil ionlarni qisqartirsak, qisqa ionli tenglama qoladi: Pb ikki plyus qoʻshuv 2 I minus — PbI2 choʻkma.",
      easy: "Kuchli elektrolit — ionlar; choʻkma, gaz, kuchsiz — molekula. Pb²⁺ + 2I⁻ → PbI₂↓.",
      draw: [
        { t: 'title', text: 'Choʻkma hosil boʻlishi' },
        { t: 'formula', x: 4, y: 22, text: 'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃' },
        { t: 'formula', x: 4, y: 33, text: 'Pb²⁺ + 2NO₃⁻ + 2K⁺ + 2I⁻ →' },
        { t: 'formula', x: 20, y: 42, text: '→ PbI₂↓ + 2K⁺ + 2NO₃⁻' },
        { t: 'formula', x: 4, y: 54, text: 'Pb²⁺ + 2I⁻ → PbI₂↓' },
        { t: 'text', x: 4, y: 65, text: 'molekulyar → toʻliq ionli → qisqa ionli', size: 's', color: 'purple' }
      ],
      next: 'Gaz va suv'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Reaksiya oxirigacha boradi, agar choʻkma, gaz yoki kam dissotsilanadigan modda hosil boʻlsa. Soda va xlorid kislota: karbonat ion va ikki vodorod ion — CO2 gazi va suv. Kislota va ishqor: vodorod ion va gidroksid ion — suv. Baʼzan bir vaqtda ham choʻkma, ham gaz, ham suv hosil boʻladi: bariy gidroksid va ammoniy sulfat.",
      easy: "CO₃²⁻ + 2H⁺ → CO₂↑ + H₂O; H⁺ + OH⁻ → H₂O.",
      draw: [
        { t: 'title', text: 'Gaz va suv hosil boʻlishi' },
        { t: 'formula', x: 4, y: 24, text: 'CO₃²⁻ + 2H⁺ → CO₂↑ + H₂O' },
        { t: 'formula', x: 4, y: 38, text: 'H⁺ + OH⁻ → H₂O' },
        { t: 'list', x: 4, y: 50, items: ['↓ choʻkma, ↑ gaz, H₂O — oxirigacha boradi'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Kalsiy xlorid eritmasida 50 ta dissotsilanmagan molekula bor, alfa 80 foiz. Nechta xlorid ion bor? Dissotsilanmaganlari 20 foiz — 50 ta, demak 80 foizi 200 ta molekula. Har bir CaCl2 ikkita xlorid ion beradi: 200 karra 2 — 400 ta ion.",
      easy: "20 % = 50 → 80 % = 200 molekula → 400 Cl⁻.",
      draw: [
        { t: 'title', text: 'Nechta Cl⁻ ion?' },
        { t: 'list', x: 4, y: 20, items: ['α = 80 % → ajralmagan 20 % = 50 ta', 'ajralgan: 50 · 80 / 20 = 200 ta'] },
        { t: 'formula', x: 4, y: 46, text: 'CaCl₂ → Ca²⁺ + 2Cl⁻' },
        { t: 'formula', x: 4, y: 58, text: '200 · 2 = 400 ta Cl⁻' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Dissotsilanish darajasi α = n/N; α < 3 % — kuchsiz, 3–30 % — oʻrtacha, > 30 % — kuchli elektrolit.',
    'Ionli tenglamada kuchli elektrolitlar ionlar holida, choʻkma, gaz va kuchsiz elektrolitlar molekula holida yoziladi.',
    'Ion almashinish reaksiyasi choʻkma, gaz yoki suv (kam dissotsilanadigan modda) hosil boʻlsa oxirigacha boradi.'
  ],
  questions: [
    {
      id: 'k10q1',
      prompt: 'Na₂SO₄ eritmasida 40 ta dissotsilanmagan molekula bor (α = 75 %). Nechta natriy ioni bor?',
      hint: '25 % = 40 ta.',
      explanation: 'Ajralgani 75 % = 120 ta molekula; 120 · 2 = 240 ta Na⁺.',
      widget: { type: 'number_answer', props: { answer: 240 } }
    },
    {
      id: 'k10q2',
      prompt: 'Cr₂(SO₄)₃ eritmasida 210 ta sulfat ion bor (α = 70 %). Nechta molekula dissotsilanmagan?',
      hint: 'Bitta molekula 3 ta SO₄²⁻ beradi.',
      explanation: 'Ajralgan: 210/3 = 70 ta (70 %); jami 100 ta; ajralmagan 30 ta.',
      widget: { type: 'number_answer', props: { answer: 30 } }
    },
    {
      id: 'k10q3',
      prompt: '2 L 0,1 M sirka kislota eritmasida (α = 2 %) nechta atsetat ion bor? (·10²¹ ta)',
      hint: 'n = 0,2 mol, ajralgani 2 %.',
      explanation: '0,2 · 0,02 = 0,004 mol; 0,004 · 6,02·10²³ = 2,408·10²¹.',
      widget: { type: 'number_answer', props: { answer: 2.408, tolerance: 0.01, unit: '·10²¹ ta' } }
    },
    {
      id: 'k10q4',
      prompt: '200 ta molekuladan 30 tasi ionlarga ajralgan. Bu qanday elektrolit?',
      hint: 'α = 30/200.',
      explanation: 'α = 15 % — oʻrtacha kuchli elektrolit.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kuchsiz', 'oʻrtacha', 'kuchli', 'noelektrolit'], answerIndex: 1 } }
    },
    {
      id: 'k10q5',
      prompt: 'H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O reaksiyasining qisqa ionli tenglamasi qaysi?',
      hint: 'Kam dissotsilanadigan modda — suv.',
      explanation: 'H⁺ + OH⁻ → H₂O.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['K⁺ + SO₄²⁻ → K₂SO₄', 'H⁺ + OH⁻ → H₂O', '2H⁺ + SO₄²⁻ → H₂SO₄', 'K⁺ + OH⁻ → KOH'], answerIndex: 1 } }
    },
    {
      id: 'k10q6',
      prompt: 'Reaksiyani oxirigacha borish sababi bilan juftlang.',
      hint: 'PbI₂ — choʻkma.',
      explanation: 'PbI₂ — choʻkma; CO₂ — gaz; H₂O — kam dissotsilanadigan modda.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Pb²⁺ + 2I⁻ → PbI₂', right: 'choʻkma' },
            { left: 'CO₃²⁻ + 2H⁺ → CO₂ + H₂O', right: 'gaz' },
            { left: 'H⁺ + OH⁻ → H₂O', right: 'kam dissotsilanadigan modda' }
          ]
        }
      }
    },
    {
      id: 'k10q7',
      prompt: 'Ionli tenglama tuzish bosqichlarini tartiblang.',
      hint: 'Avval molekulyar tenglama.',
      explanation: 'Molekulyar tenglama → kuchli elektrolitlarni ionlarga yozish → bir xil ionlarni qisqartirish → qisqa ionli tenglama.',
      widget: { type: 'step_order', props: { steps: ['Molekulyar tenglamani tenglashtirish', 'Kuchli elektrolitlarni ionlar holida yozish', 'Ikkala tomondagi bir xil ionlarni qisqartirish', 'Qisqa ionli tenglamani yozish'] } }
    },
    {
      id: 'k10q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Choʻkma ionlarga ajratib yozilmaydi.',
      explanation: 'α konsentratsiyaga bogʻliq; choʻkma molekula holida yoziladi; kuchsiz elektrolit α < 3 %.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Dissotsilanish darajasi eritma konsentratsiyasiga bogʻliq.', value: true },
            { text: 'Ionli tenglamada choʻkma molekula holida yoziladi.', value: true },
            { text: 'α = 50 % boʻlsa, elektrolit kuchsiz hisoblanadi.', value: false },
            { text: 'Ionli tenglamada gazlar ionlarga ajratib yoziladi.', value: false }
          ]
        }
      }
    }
  ]
};
