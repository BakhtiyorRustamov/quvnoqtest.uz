import type { BoardLesson } from './types';

/** Darslik: 5–6-mavzu (19–23-betlar) — hosilaning fizik maʼnosi, taʼrif boʻyicha hosilani topish. */
export const MATH_6: BoardLesson = {
  n: 6,
  label: "6",
  part: 'algebra',
  title: "Hosila — oniy tezlik. Hosilani taʼrif boʻyicha topish",
  section: '5–6',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Velosipedda ketyapsiz, qoʻlingizdagi fitnes soat tezlikni koʻrsatib turibdi. U buni qanday biladi? Soat juda qisqa vaqtda bosilgan yoʻlni oʻlchab, vaqtga boʻladi: 1 soniyada 5,4 metr, 0,1 soniyada 0,51 metr, 0,01 soniyada 0,05 metr. Vaqt qanchalik qisqa boʻlsa, tezlik shunchalik aniq: sekundiga 5 metr. Bu hosilaning fizik maʼnosi.",
      easy: "Soat yoʻlni vaqtga boʻladi. Vaqt oraligʻi qisqargan sari javob aniqlashadi: 5,4, keyin 5,1, keyin 5. Shu «aynan hozirgi» tezlik hosila boʻladi.",
      draw: [
        { t: 'title', text: 'Soat tezlikni qanday biladi?' },
        { t: 'icon', x: 13, y: 32, emoji: '⌚', size: 'l' },
        {
          t: 'table',
          x: 26,
          y: 22,
          rows: [
            ['Δt', 'Δs', 'Δs : Δt'],
            ['1 s', '5,4 m', '5,4 m/s'],
            ['0,1 s', '0,51 m', '5,1 m/s'],
            ['0,01 s', '0,05 m', '5 m/s']
          ]
        },
        { t: 'text', x: 72, y: 32, text: 'Δt → 0', color: 'blue' },
        { t: 'text', x: 72, y: 39, text: 'aniq tezlik', size: 's' },
        { t: 'text', x: 26, y: 60, text: 'Vaqt qanchalik qisqa — tezlik shunchalik aniq', size: 's', color: 'purple' }
      ],
      next: 'Bu hosila-ku?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ha! Nuqta s teng s(t) qonun boʻyicha harakatlanyapti: s — metrlarda, t — soniyalarda. Kichik Δt vaqtdagi oʻrtacha tezlik: s(t plyus Δt) minus s(t), boʻlingan Δt ga. Δt nolga intilsa, oʻrtacha tezlik oniy tezlikka yaqinlashadi. Demak, oniy tezlik yoʻl funksiyasining hosilasi: v(t) teng s shtrix t. Umuman aytganda, hosila funksiyaning oʻzgarish tezligidir.",
      easy: "Oʻrtacha tezlik — yoʻlni vaqtga boʻlish. Vaqtni nolga yaqinlashtirsak, aynan shu ondagi tezlik chiqadi. U yoʻl funksiyasining hosilasi.",
      draw: [
        { t: 'title', text: 'Oniy tezlik' },
        { t: 'text', x: 6, y: 20, text: 's = s(t):  yoʻl s (m),  vaqt t (s)', size: 's' },
        { t: 'formula', x: 8, y: 31, text: 'v ≈ (s(t + Δt) − s(t)) / Δt' },
        { t: 'formula', x: 8, y: 44, text: 'v(t) = lim Δs / Δt = s′(t)' },
        { t: 'text', x: 25, y: 50, text: 'Δt → 0', size: 's' },
        { t: 'box', id: 'v', x: 6, y: 54, w: 60, h: 11, text: 'Oniy tezlik = yoʻl funksiyasining hosilasi', color: 'green' },
        { t: 'text', x: 70, y: 61, text: 'fizik maʼno', size: 's', color: 'purple' }
      ],
      next: 'Misolda koʻraylik'
    },
    {
      kind: 'example',
      clear: true,
      say: "Balkondan toʻp tushib ketdi. U t soniyada taxminan 5t kvadrat metr yoʻl bosadi. Ayirmali nisbatni tuzamiz: 5 karra t plyus h ning kvadrati minus 5t kvadrat, boʻlingan h ga. Soddalashtirsak, 10t plyus 5h chiqadi. h nolga intilsa, 10t qoladi. Demak, toʻpning tezligi v(t) teng 10t: ikkinchi soniyada u sekundiga 20 metr tezlikda tushyapti.",
      easy: "Yoʻl formulasi 5t kvadrat, uning hosilasi 10t. Bu tezlik formulasi. t oʻrniga 2 ni qoʻysak, 20 chiqadi: ikkinchi soniyada tezlik 20 m/s.",
      draw: [
        { t: 'title', text: 'Tushayotgan toʻp' },
        { t: 'icon', x: 88, y: 24, emoji: '⚽', size: 'm' },
        { t: 'formula', x: 8, y: 22, text: 's(t) = 5t²' },
        { t: 'list', x: 6, y: 34, items: ['(5(t + h)² − 5t²) / h = 10t + 5h', 'h → 0:  v(t) = 10t', 't = 2 s:  v = 20 m/s'] },
        { t: 'text', x: 6, y: 62, text: 'Tezlik vaqt oʻtgan sari ortib boradi', size: 's', color: 'purple' }
      ],
      next: 'Tezlik oʻzgarar ekan!'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar funksiya oʻzgarmasa, masalan f(x) teng 5 boʻlsa, uning orttirmasi doim nol: 5 minus 5. Nolni h ga boʻlsak ham nol. Demak, oʻzgarmas sonning hosilasi nolga teng. Turgan mashinani eslang: yoʻl oʻzgarmayapti — tezlik nol.",
      easy: "Funksiya oʻzgarmasa, uning oʻzgarish tezligi yoʻq, yaʼni nol. Grafigi gorizontal chiziq, qiyaligi ham nol.",
      draw: [
        { t: 'title', text: 'Oʻzgarmasning hosilasi' },
        { t: 'axes', id: 'c', x: 6, y: 15, w: 44, h: 44, xmin: 0, xmax: 5, ymin: 0, ymax: 8, xlabel: 't', ylabel: 's' },
        { t: 'curve', axes: 'c', points: [[0, 5], [5, 5]], color: 'blue' },
        { t: 'icon', x: 28, y: 25, emoji: '🚗', size: 's' },
        { t: 'text', x: 56, y: 22, text: 'f(x) = 5' },
        { t: 'text', x: 56, y: 30, text: 'f(x + h) − f(x) = 0', size: 's' },
        { t: 'formula', x: 58, y: 42, text: '(c)′ = 0' },
        { t: 'text', x: 56, y: 54, text: 'Turgan mashina:', size: 's' },
        { t: 'text', x: 56, y: 61, text: 's oʻzgarmas → v = 0', size: 's', color: 'purple' }
      ],
      next: 'Boshqa funksiyalar-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Xuddi shu usul bilan darslikda boshqa hosilalar ham topilgan. x kubning hosilasi 3x kvadrat, x ning toʻrtinchi darajasiniki 4x kub. 1 boʻlingan x ning hosilasi minus 1 boʻlingan x kvadrat, ildiz x niki esa 1 boʻlingan 2 ildiz x ga. Jadvalga yaxshilab qarang: qanday qonuniyatni koʻryapsiz?",
      easy: "Jadvalda funksiya va uning hosilasi yonma-yon yozilgan. Chap ustundagi daraja oʻng ustunda nima boʻlganiga eʼtibor bering.",
      draw: [
        { t: 'title', text: 'Taʼrif boʻyicha topilganlar' },
        {
          t: 'table',
          x: 8,
          y: 16,
          rows: [
            ['f(x)', 'f′(x)'],
            ['x²', '2x'],
            ['x³', '3x²'],
            ['x⁴', '4x³'],
            ['1/x', '−1/x²'],
            ['√x', '1/(2√x)']
          ]
        },
        { t: 'box', id: 'q', x: 42, y: 22, w: 50, h: 12, text: 'Qanday qonuniyatni koʻryapsiz?', color: 'orange' },
        { t: 'text', x: 44, y: 46, text: 'x³ → 3x²', color: 'blue' },
        { t: 'text', x: 44, y: 54, text: 'x⁴ → 4x³', color: 'blue' }
      ],
      next: 'Daraja tushyapti!'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻgʻri! Qonuniyat shunday: x ning n darajasining hosilasi n karra x ning n minus 1 darajasi. Daraja koeffitsiyent boʻlib oldinga tushadi, oʻzi esa bittaga kamayadi. Masalan, x ning beshinchi darajasining hosilasi 5x toʻrtinchi daraja. Bu qoida manfiy va kasr darajalar uchun ham ishlaydi: 1 boʻlingan x — bu x ning minus birinchi darajasi, ildiz x esa x ning yarim darajasi.",
      easy: "Darajani oldinga koʻchiramiz, darajadan bittani ayiramiz. x beshinchi daraja — 5 karra x toʻrtinchi daraja. Hammasi shu.",
      draw: [
        { t: 'title', text: 'Umumiy qoida' },
        { t: 'formula', x: 20, y: 25, text: '(xⁿ)′ = n · xⁿ⁻¹' },
        { t: 'list', x: 6, y: 38, items: ['(x⁵)′ = 5x⁴', '(x⁻¹)′ = −x⁻² = −1/x²', '(√x)′ = (x^{1/2})′ = ½ · x^{−1/2} = 1/(2√x)'] },
        { t: 'text', x: 6, y: 64, text: 'Daraja oldinga tushadi, oʻzi 1 ga kamayadi', size: 's', color: 'purple' }
      ],
      next: 'Endi sinab koʻraman!'
    }
  ],
  summary: [
    'Oniy tezlik — yoʻl funksiyasining hosilasi: v(t) = s′(t).',
    'Fizik maʼnosi: hosila — funksiyaning oʻzgarish tezligi.',
    'Oʻzgarmasning hosilasi nolga teng: (c)′ = 0.',
    '(x²)′ = 2x,  (x³)′ = 3x²,  (1/x)′ = −1/x²,  (√x)′ = 1/(2√x).',
    'Umumiy qoida: (xⁿ)′ = n · xⁿ⁻¹.'
  ],
  questions: [
    {
      id: 'm6q1',
      prompt: 'Nuqta s(t) = t² qonun boʻyicha harakatlanmoqda (s — metr, t — soniya). t = 5 s dagi tezligini toping.',
      hint: 'v(t) = s′(t), (t²)′ = 2t.',
      explanation: 'v(t) = 2t, v(5) = 2 · 5 = 10 m/s.',
      widget: { type: 'number_answer', props: { answer: 10, unit: 'm/s' } }
    },
    {
      id: 'm6q2',
      prompt: 'Har bir funksiyani uning hosilasi bilan juftlang.',
      hint: 'Oʻzgarmasning hosilasi 0; (xⁿ)′ = n · xⁿ⁻¹.',
      explanation: '(x³)′ = 3x², (7)′ = 0, (1/x)′ = −1/x², (√x)′ = 1/(2√x).',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'x³', right: '3x²' },
            { left: '7', right: '0' },
            { left: '1/x', right: '−1/x²' },
            { left: '√x', right: '1/(2√x)' }
          ]
        }
      }
    },
    {
      id: 'm6q3',
      prompt: '(x⁶)′ = ?',
      hint: 'Darajani oldinga tushiring, darajadan 1 ni ayiring.',
      explanation: '(x⁶)′ = 6x⁵.',
      widget: { type: 'expression_answer', props: { answer: '6*x^5', prefix: '(x⁶)′ =', keys: ['x', '^', '(', ')', '·'] } }
    },
    {
      id: 'm6q4',
      prompt: 'Taʼrif boʻyicha: f(x) = x³. Ayirmali nisbatni soddalashtiring: (f(x + h) − f(x)) / h = ?',
      hint: '(x + h)³ = x³ + 3x²h + 3xh² + h³.',
      explanation: '(x + h)³ − x³ = 3x²h + 3xh² + h³; h ga boʻlsak, 3x² + 3xh + h². h → 0 da 3x² qoladi.',
      widget: { type: 'expression_answer', props: { answer: '3*x^2 + 3*x*h + h^2', vars: ['x', 'h'], noFraction: true, prefix: '=', keys: ['x', 'h', '²', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'm6q5',
      prompt: 'Mashina avval tezlashdi, keyin bir xil tezlikda yurdi. Uning yoʻl grafigi s(t) qaysi?',
      hint: 'Tezlik — grafikning qiyaligi. Avval qiyalik ortadi, keyin oʻzgarmaydi.',
      explanation: 'a) da grafik avval tobora tik koʻtariladi (tezlashish), keyin toʻgʻri chiziq (bir xil tezlik). b) — doim bir xil tezlik, c) — sekinlashib toʻxtaydi, d) — mashina turibdi.',
      widget: {
        type: 'graph_choose',
        props: {
          answer: 'a',
          graphs: [
            { id: 'a', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 't', ylabel: 's', curves: [{ points: [[0, 0], [0.5, 0.125], [1, 0.5], [1.5, 1.125], [2, 2], [3, 4], [4, 6], [5, 8]] }] } },
            { id: 'b', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 't', ylabel: 's', curves: [{ points: [[0, 0], [5, 8]] }] } },
            { id: 'c', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 't', ylabel: 's', curves: [{ points: [[0, 0], [1, 3], [2, 5], [3, 6], [4, 6.3], [5, 6.35]] }] } },
            { id: 'd', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 't', ylabel: 's', curves: [{ points: [[0, 4], [5, 4]] }] } }
          ]
        }
      }
    },
    {
      id: 'm6q6',
      prompt: 'f(x) = 1/x. f′(2) = ?',
      hint: '(1/x)′ = −1/x². x oʻrniga 2 ni qoʻying.',
      explanation: 'f′(2) = −1/2² = −1/4 = −0,25.',
      widget: { type: 'number_answer', props: { answer: -0.25, tolerance: 0.0005 } }
    },
    {
      id: 'm6q7',
      prompt: 'Qaysi hisoblashlar toʻgʻri? Hammasini belgilang.',
      hint: '(xⁿ)′ = n · xⁿ⁻¹ va (c)′ = 0.',
      explanation: '(x²)′ = 2x, (x³)′ = 3x², (x⁵)′ = 5x⁴, (x)′ = 1 — toʻgʻri. (5)′ = 0, (1/x)′ = −1/x² — minus ishorasi kerak.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { text: '(x²)′ = 2x', match: true },
            { text: '(5)′ = 5', match: false },
            { text: '(x³)′ = 3x²', match: true },
            { text: '(x⁵)′ = 5x⁴', match: true },
            { text: '(1/x)′ = 1/x²', match: false },
            { text: '(x)′ = 1', match: true }
          ]
        }
      }
    },
    {
      id: 'm6q8',
      prompt: 'Darslikdagi 3-misolga koʻra (x³ − 7x + 5)′ = 3x² − 7. Nuqta s(t) = t³ − 7t + 5 qonun bilan harakatlanmoqda. t = 3 s dagi tezligi necha m/s?',
      hint: 'v(t) = 3t² − 7. t oʻrniga 3 ni qoʻying.',
      explanation: 'v(3) = 3 · 9 − 7 = 27 − 7 = 20 m/s.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'm/s' } }
    },
    {
      id: 'm6q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Fizik maʼno: hosila — oʻzgarish tezligi.',
      explanation: 'Turgan jismning yoʻli oʻzgarmaydi, tezligi 0. Hosila — oʻzgarish tezligi. (x⁴)′ = 4x³, 4x⁴ emas. (√x)′ = 1/(2√x).',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Turgan jismning tezligi 0, chunki uning yoʻli oʻzgarmaydi.', value: true },
            { text: 'Hosila funksiyaning oʻzgarish tezligini bildiradi.', value: true },
            { text: '(x⁴)′ = 4x⁴', value: false },
            { text: '(√x)′ = 1/(2√x)', value: true }
          ]
        }
      }
    }
  ]
};
