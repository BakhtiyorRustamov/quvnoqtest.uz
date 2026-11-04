import type { BoardLesson } from './types';

/** Eksponensial oʻsish N = e^{0,5t} */
const EXP: [number, number][] = [[0, 1], [1, 1.65], [2, 2.72], [3, 4.48], [4, 7.39], [4.5, 9.49]];
/** Logistik egri chiziq, toʻyinish N = 8 */
const LOG: [number, number][] = [[0, 1], [1, 1.9], [2, 3.3], [3, 4.9], [4, 6.2], [5, 7.1], [6, 7.6], [7, 7.85], [8, 7.95], [9, 8]];
/** Chiziqli oʻsish */
const LIN: [number, number][] = [[0, 1], [9, 8.2]];
/** Kamayish */
const DEC: [number, number][] = [[0, 8], [1, 5.6], [2, 3.9], [3, 2.7], [4, 1.9], [6, 0.9], [9, 0.35]];

/** Darslik: 29–32-mavzu (62–65-betlar) — hosila yordamida modellashtirish: oʻsish modellari. */
export const MATH_19: BoardLesson = {
  n: 19,
  label: "29–30",
  part: 'algebra',
  title: "Hosila bilan modellashtirish: oʻsish jarayonlari",
  section: '29–32',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Uyda qatiq ivitganmisiz? Sutga ozgina qatiq qoʻshasiz, ertalab butun idish qatiqqa aylanadi. Sababi — bakteriyalar. Har bir bakteriya maʼlum vaqtdan keyin ikkiga boʻlinadi: 1, 2, 4, 8, 16… Bakteriya qancha koʻp boʻlsa, ular shuncha tez koʻpayadi. Bu jarayonni hosila yordamida tenglama qilib yozamiz.",
      easy: "Bakteriyalar har safar ikki barobar koʻpayadi. Qancha koʻp boʻlsa, shuncha tez koʻpayadi.",
      draw: [
        { t: 'title', text: 'Qatiq qanday ivadi?' },
        { t: 'icon', x: 10, y: 32, emoji: '🥛', size: 'l' },
        { t: 'bars', x: 26, y: 16, w: 66, h: 38, items: [{ label: '0 soat', value: 1 }, { label: '1', value: 2 }, { label: '2', value: 4 }, { label: '3', value: 8 }, { label: '4', value: 16 }], color: 'green' },
        { t: 'text', x: 26, y: 64, text: 'Har soatda ikki barobar!', color: 'purple' }
      ],
      next: 'Tenglamasi qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "b(t) — t vaqtdagi bakteriyalar soni. Hosilaning maʼnosiga koʻra, koʻpayish tezligi b shtrix t ga teng. Bizning farazimiz: koʻpayish tezligi bakteriyalar soniga proporsional, yaʼni b shtrix teng k karra b. Bu tenglamani b teng b nol karra e ning kt darajasi funksiyasi qanoatlantiradi: uning hosilasi k karra b nol karra e ning kt darajasi, yaʼni yana k karra b.",
      easy: "Tezlik soniga proporsional: b shtrix teng k karra b. Yechimi — eksponenta: b teng b nol karra e ning kt darajasi.",
      draw: [
        { t: 'title', text: 'Koʻpayish tezligi' },
        { t: 'formula', x: 8, y: 22, text: 'b′(t) = k · b(t)' },
        { t: 'text', x: 60, y: 28, text: 'tezlik ~ son', size: 's', color: 'purple' },
        { t: 'formula', x: 8, y: 38, text: 'b(t) = b₀ · e^{kt}' },
        { t: 'text', x: 8, y: 56, text: 'Tekshiramiz: (b₀e^{kt})′ = k·b₀e^{kt} = k·b(t)', size: 's', color: 'green' }
      ],
      next: 'Sonlar bilan'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 1-masala: boshida 10 million bakteriya bor, bir soatdan keyin 20 million. b(1) teng 10 karra e ning k darajasi teng 20, demak e ning k darajasi 2, k teng ln 2. Shunda b(t) teng 10 karra 2 ning t darajasi million. 2 soatda 40, 3 soatda 80 million. Bu 10-sinfdagi natija bilan bir xil chiqdi.",
      easy: "Har soatda ikki barobar: 10, 20, 40, 80 million. Formula: 10 karra 2 ning t darajasi.",
      draw: [
        { t: 'title', text: '1-masala: bakteriyalar' },
        { t: 'list', x: 6, y: 20, items: ['b₀ = 10 mln,  b(1) = 20 mln', '10·e^{k} = 20  →  e^{k} = 2,  k = ln 2'] },
        { t: 'formula', x: 8, y: 38, text: 'b(t) = 10 · 2^{t}  (mln)' },
        {
          t: 'table',
          x: 8,
          y: 50,
          rows: [
            ['t, soat', '0', '1', '2', '3'],
            ['b, mln', '10', '20', '40', '80']
          ]
        }
      ],
      next: 'Odamlar ham shundaymi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "18-asrda ingliz olimi Tomas Maltus aholi soni uchun ham xuddi shunday tenglama yozdi: N shtrix teng k karra N. Yechimi N teng N nol karra e ning k karra t minus t nol darajasi — eksponensial oʻsish. Grafik tobora tikroq koʻtariladi. Maltus aholi shunday oʻsib, oziq-ovqat yetmay qoladi, deb «bashorat» qilgan.",
      easy: "Maltus modeli: aholi ham eksponenta boʻyicha oʻsadi. Grafik tobora tik koʻtariladi.",
      draw: [
        { t: 'title', text: 'Maltus modeli' },
        { t: 'formula', x: 6, y: 22, text: 'N′(t) = k · N(t)' },
        { t: 'text', x: 6, y: 38, text: 'N = N₀ · e^{k(t − t₀)}', color: 'blue' },
        { t: 'text', x: 6, y: 50, text: 'eksponensial oʻsish', size: 's', color: 'purple' },
        { t: 'axes', id: 'e', x: 56, y: 14, w: 40, h: 50, xmin: 0, xmax: 5, ymin: 0, ymax: 10, xlabel: 't', ylabel: 'N' },
        { t: 'curve', axes: 'e', points: EXP, color: 'red' },
        { t: 'dot', axes: 'e', x: 0, y: 1, label: 'N₀', color: 'ink' }
      ],
      next: 'Cheksiz oʻsadimi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Aslida resurslar cheklangan: joy, ovqat, suv. Ferxyulst populyatsiyadagi ichki kurashni hisobga oldi: N shtrix teng aN minus bN kvadrat. N kichik boʻlsa, oʻsish deyarli eksponensial. N katta boʻlganda bN kvadrat had oʻsishni sekinlashtiradi va N(t) a boʻlinsin b soniga yaqinlashadi. Bu hodisa toʻyinish, egri chiziq esa logistik egri chiziq deyiladi.",
      easy: "Resurs cheklangan boʻlsa, oʻsish sekinlashadi va son maʼlum chegaraga yaqinlashadi. Bu — toʻyinish.",
      draw: [
        { t: 'title', text: 'Logistik egri chiziq' },
        { t: 'formula', x: 6, y: 22, text: 'N′ = aN − bN²' },
        { t: 'text', x: 6, y: 38, text: 'N(t) → a/b', color: 'red' },
        { t: 'text', x: 6, y: 50, text: 'toʻyinish', color: 'purple' },
        { t: 'axes', id: 'l', x: 50, y: 14, w: 46, h: 50, xmin: 0, xmax: 9.5, ymin: 0, ymax: 10, xlabel: 't', ylabel: 'N' },
        { t: 'curve', axes: 'l', points: [[0, 8], [9.5, 8]], color: 'ink', dashed: true },
        { t: 'curve', axes: 'l', points: LOG, color: 'blue' },
        { t: 'dot', axes: 'l', x: 0, y: 8, label: 'a/b', color: 'red' }
      ],
      next: 'Bu qanday tenglama?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Funksiyani uning hosilasi bilan bogʻlovchi tenglama differensial tenglama deyiladi. Yuqoridagilarning barchasi shunday tenglamalar. Yana bir misol — reklama. N ta xaridor bor, x(t) tasi mahsulot haqida biladi. Xabar tarqalish tezligi biladiganlarga ham, bilmaydiganlarga ham proporsional: x shtrix teng kx karra N minus x. Vaqt oʻtishi bilan deyarli hamma xabardor boʻladi — x(t) N ga yaqinlashadi.",
      easy: "Funksiya va uning hosilasini bogʻlovchi tenglama — differensial tenglama. Reklamada xabar tarqalib, oxiri hamma biladi.",
      draw: [
        { t: 'title', text: 'Differensial tenglama' },
        { t: 'box', id: 'd', x: 6, y: 18, w: 60, h: 12, text: 'y′ = F(x; y)', color: 'blue' },
        { t: 'icon', x: 82, y: 26, emoji: '📢', size: 'l' },
        { t: 'text', x: 6, y: 42, text: 'Reklama:  x′ = kx(N − x)' },
        { t: 'text', x: 6, y: 52, text: 'x — xabardor xaridorlar soni', size: 's' },
        { t: 'text', x: 6, y: 62, text: 'Vaqt oʻtishi bilan x(t) → N', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Koʻpayish tezligi miqdorga proporsional boʻlsa: b′ = kb, yechimi b = b₀eᵏᵗ (eksponensial oʻsish).',
    'Resurs cheklangan boʻlsa: N′ = aN − bN², N(t) a/b ga yaqinlashadi (toʻyinish, logistik egri chiziq).',
    'Funksiyani uning hosilasi bilan bogʻlovchi tenglama differensial tenglama deyiladi.'
  ],
  questions: [
    {
      id: 'm19q1',
      prompt: 'Boshida 10 mln bakteriya bor, har soatda ularning soni ikki barobar ortadi. 3 soatdan keyin necha million boʻladi?',
      hint: 'b(t) = 10 · 2ᵗ.',
      explanation: '10 · 2³ = 80 mln.',
      widget: { type: 'number_answer', props: { answer: 80, unit: 'mln' } }
    },
    {
      id: 'm19q2',
      prompt: 'Oʻsha bakteriyalar: b(t) = 10 · 2ᵗ mln. Necha soatdan keyin 160 mln boʻladi?',
      hint: '2ᵗ = 16.',
      explanation: '2ᵗ = 16 → t = 4 soat.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'soat' } }
    },
    {
      id: 'm19q3',
      prompt: 'b(t) = 10·e^(0,5t) boʻlsa, boshlangʻich paytdagi koʻpayish tezligi b′(0) nechaga teng?',
      hint: 'b′ = k · b, bu yerda k = 0,5, b(0) = 10.',
      explanation: 'b′(0) = 0,5 · 10 = 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'm19q4',
      prompt: 'Qaysi grafik logistik egri chiziq (toʻyinish)?',
      hint: 'Avval tez oʻsadi, keyin bir chegaraga yaqinlashadi.',
      explanation: 'b grafik oʻsib, gorizontal chiziqqa yaqinlashadi — bu toʻyinish.',
      widget: {
        type: 'graph_choose',
        props: {
          answer: 'b',
          graphs: [
            { id: 'a', graph: { xmin: 0, xmax: 9.5, ymin: 0, ymax: 10, xlabel: 't', ylabel: 'N', curves: [{ points: [[0, 1], [2, 1.65], [4, 2.72], [6, 4.48], [8, 7.39], [9, 9.49]] }] } },
            { id: 'b', graph: { xmin: 0, xmax: 9.5, ymin: 0, ymax: 10, xlabel: 't', ylabel: 'N', curves: [{ points: LOG }, { points: [[0, 8], [9.5, 8]], dashed: true }] } },
            { id: 'c', graph: { xmin: 0, xmax: 9.5, ymin: 0, ymax: 10, xlabel: 't', ylabel: 'N', curves: [{ points: LIN }] } },
            { id: 'd', graph: { xmin: 0, xmax: 9.5, ymin: 0, ymax: 10, xlabel: 't', ylabel: 'N', curves: [{ points: DEC }] } }
          ]
        }
      }
    },
    {
      id: 'm19q5',
      prompt: 'Har bir tenglamaga mos jarayonni tanlang.',
      hint: 'Minus ishora — kamayish, bN² — cheklov.',
      explanation: 'b′ = kb — eksponensial oʻsish; N′ = aN − bN² — toʻyinish; m′ = −αm — yemirilish; x′ = kx(N − x) — reklama.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'b′ = kb', right: 'eksponensial oʻsish' },
            { left: 'N′ = aN − bN²', right: 'logistik egri chiziq' },
            { left: 'm′ = −αm', right: 'radioaktiv yemirilish' },
            { left: 'x′ = kx(N − x)', right: 'reklama tarqalishi' }
          ]
        }
      }
    },
    {
      id: 'm19q6',
      prompt: 'Gapni toʻldiring.',
      hint: 'Logistik modeldagi chegara son.',
      explanation: 'N(t) a/b ga yaqinlashadi; bu hodisa toʻyinish deyiladi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Logistik modelda N(t) vaqt oʻtishi bilan ' }, { blank: 'a/b' }, { text: ' soniga yaqinlashadi. Bu hodisa ' }, { blank: 'toʻyinish' }, { text: ' deyiladi.' }],
          bank: ['a/b', 'toʻyinish', 'N₀', 'portlash']
        }
      }
    },
    {
      id: 'm19q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Maltus va Ferxyulst modellarini solishtiring.',
      explanation: 'b₀eᵏᵗ tenglamani qanoatlantiradi; logistik modelda oʻsish cheklangan; Maltus modeli eksponensial; differensial tenglama funksiyani hosilasi bilan bogʻlaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'b = b₀eᵏᵗ funksiya b′ = kb tenglamani qanoatlantiradi.', value: true },
            { text: 'Logistik modelda son cheksiz oʻsadi.', value: false },
            { text: 'Maltus modeli eksponensial oʻsishni bildiradi.', value: true },
            { text: 'Differensial tenglama funksiyani uning hosilasi bilan bogʻlaydi.', value: true }
          ]
        }
      }
    },
    {
      id: 'm19q8',
      prompt: 'Boshida 3 mln bakteriya bor, har soatda soni 3 barobar ortadi. 2 soatdan keyin necha million?',
      hint: 'b(t) = 3 · 3ᵗ.',
      explanation: '3 · 3² = 27 mln.',
      widget: { type: 'number_answer', props: { answer: 27, unit: 'mln' } }
    },
    {
      id: 'm19q9',
      prompt: 'Qaysi tenglama oʻsishni emas, kamayishni bildiradi? Ortiqchasini bosing.',
      hint: 'Ishoraga qarang.',
      explanation: 'm′ = −αm — yemirilish (kamayish). Qolganlari eksponensial oʻsish.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'b′ = kb' }, { text: 'N′ = kN' }, { text: 'Q′ = kQ' }, { text: 'm′ = −αm', odd: true }] } }
    }
  ]
};
