import type { BoardLesson } from './types';

/** Nonning sovushi T = 25 + 75·(7/15)^{t/20} */
const BREAD: [number, number][] = [[0, 100], [10, 76.2], [20, 60], [30, 48.9], [40, 41.3], [50, 36.1], [60, 32.6], [71, 30], [80, 28.5], [90, 27.4]];
/** Choyning sovushi (hook) */
const TEA: [number, number][] = [[0, 90], [5, 67], [10, 52], [15, 41], [20, 34], [30, 27], [40, 23.5], [50, 21.8], [60, 20.9]];
/** Narx p = (p₀ − 10)e^{−t/10} + 10, p₀ = 40 */
const PRICE: [number, number][] = [[0, 40], [5, 28.2], [10, 21], [15, 16.7], [20, 14.1], [30, 11.5], [40, 10.5], [50, 10.2]];

/** Darslik: 29–32-mavzu (66–71-betlar) — hosila yordamida modellashtirish: sovish, sekinlashish, yemirilish, iqtisodiy modellar. */
export const MATH_20: BoardLesson = {
  n: 20,
  label: "31–32",
  part: 'algebra',
  title: "Hosila bilan modellashtirish: sovish va yemirilish",
  section: '29–32',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Issiq choy quyib, telefonga chalgʻidingiz. Oʻn daqiqada choy ancha sovidi, lekin keyingi oʻn daqiqada kamroq sovidi. Oxiri xona haroratiga tenglashib qoldi va undan pastga tushmadi. Nega avval tez, keyin sekin soviydi? Chunki sovish tezligi choy bilan xona harorati orasidagi farqqa bogʻliq.",
      easy: "Choy avval tez, keyin sekin soviydi va xona haroratida toʻxtaydi. Farq qancha katta boʻlsa, shuncha tez soviydi.",
      draw: [
        { t: 'title', text: 'Choy qanday soviydi?' },
        { t: 'icon', x: 10, y: 32, emoji: '☕', size: 'l' },
        { t: 'axes', id: 'c', x: 26, y: 14, w: 68, h: 46, xmin: 0, xmax: 62, ymin: 0, ymax: 100, xlabel: 'min', ylabel: '°C' },
        { t: 'curve', axes: 'c', points: [[0, 20], [62, 20]], color: 'ink', dashed: true },
        { t: 'curve', axes: 'c', points: TEA, color: 'red' },
        { t: 'dot', axes: 'c', x: 0, y: 90, color: 'red' },
        { t: 'text', x: 74, y: 45, text: 'xona 20°', size: 's' },
        { t: 'text', x: 26, y: 67, text: 'Avval tez, keyin sekin', color: 'purple' }
      ],
      next: 'Qonuni qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Jism harorati T(t), havo harorati tau boʻlsin. Sovish tezligi harorat farqiga proporsional: T shtrix teng minus k karra T minus tau. Minus ishora harorat pasayayotganini bildiradi. Bu differensial tenglamaning yechimi: T teng tau plyus T nol minus tau karra e ning at darajasi, bu yerda a manfiy son. Vaqt oʻtishi bilan e ning at darajasi nolga intiladi va T tau ga yaqinlashadi.",
      easy: "Farq qancha katta boʻlsa, shuncha tez soviydi. Yechim: harorat havo haroratiga yaqinlashib boradi.",
      draw: [
        { t: 'title', text: 'Sovish qonuni' },
        { t: 'formula', x: 8, y: 22, text: 'T′(t) = −k(T − τ)' },
        { t: 'text', x: 60, y: 28, text: 'tezlik ~ farq', size: 's', color: 'purple' },
        { t: 'formula', x: 8, y: 38, text: 'T(t) = τ + (T₀ − τ)·e^{at},  a < 0' },
        { t: 'text', x: 8, y: 58, text: 'Vaqt oʻtishi bilan T(t) → τ', color: 'green' }
      ],
      next: 'Non misoli'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 5-masala: tandirdan olingan non 20 minutda 100 gradusdan 60 gradusgacha soviydi, tashqarida 25 gradus. T teng 25 plyus 75 karra e ning at darajasi. T(20) teng 60 dan e ning 20a darajasi teng 7 boʻlinsin 15. Demak, T teng 25 plyus 75 karra 7 boʻlinsin 15 ning t boʻlinsin 20 darajasi. Non 30 gradusgacha qachon soviydi? Hisoblasak, taxminan 71 minut — 1 soat-u 11 minut.",
      easy: "Har 20 minutda farq 7 boʻlinsin 15 barobar kichrayadi. Non 30 gradusgacha taxminan 71 minutda soviydi.",
      draw: [
        { t: 'title', text: 'Tandir noni' },
        { t: 'text', x: 6, y: 20, text: 'T = 25 + 75·(7/15)^{t/20}', size: 's' },
        { t: 'list', x: 6, y: 30, items: ['T(0) = 100°', 'T(20) = 60°', 'T = 30°  →  t ≈ 71 min'] },
        { t: 'axes', id: 'b', x: 56, y: 14, w: 40, h: 50, xmin: 0, xmax: 92, ymin: 0, ymax: 105, xlabel: 't', ylabel: 'T' },
        { t: 'curve', axes: 'b', points: [[0, 25], [92, 25]], color: 'ink', dashed: true },
        { t: 'curve', axes: 'b', points: BREAD, color: 'orange' },
        { t: 'dot', axes: 'b', x: 20, y: 60, label: '60°', color: 'blue' },
        { t: 'dot', axes: 'b', x: 71, y: 30, label: '71 min', color: 'red' }
      ],
      next: 'Qayiq-chi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "6-masala: qayiq 20 kilometr soatiga tezlik bilan suzmoqda, motor ishdan chiqdi. Suvning qarshiligi tezlikka proporsional, shuning uchun tezlik ham eksponenta boʻyicha kamayadi. 40 sekunddan keyin tezlik 8, yaʼni 20 ning 0,4 qismi. Demak, har 40 sekundda tezlik 0,4 ga koʻpayadi. 2 minut — bu uchta 40 sekund: 20 karra 0,4 kub teng 1,28 kilometr soatiga.",
      easy: "Har 40 sekundda tezlik 0,4 barobar boʻladi: 20, 8, 3,2, 1,28. Ikki minutda 1,28 kilometr soatiga.",
      draw: [
        { t: 'title', text: 'Motor oʻchgan qayiq' },
        { t: 'icon', x: 82, y: 22, emoji: '🚤', size: 'l' },
        { t: 'formula', x: 6, y: 20, text: 'v(t) = 20·e^{−rt/m}' },
        {
          t: 'table',
          x: 8,
          y: 34,
          rows: [
            ['t', '0', '40 s', '80 s', '120 s'],
            ['v, km/soat', '20', '8', '3,2', '1,28']
          ]
        },
        { t: 'text', x: 8, y: 58, text: 'Har 40 s da × 0,4', color: 'purple' }
      ],
      next: 'Radioaktiv modda'
    },
    {
      kind: 'explain',
      clear: true,
      say: "7-masala: radioaktiv modda yemiriladi va yemirilish tezligi massaga proporsional: m shtrix teng minus alfa karra m. Yechimi m teng m nol karra e ning minus alfa karra t minus t nol darajasi. Masalan, radiy har 1600 yilda yarmiga kamayadi: 80 gramm boʻlsa, 1600 yildan keyin 40, 3200 yildan keyin 20 gramm qoladi.",
      easy: "Modda har doim bir xil vaqtda yarmiga kamayadi. Radiyda bu vaqt taxminan 1600 yil.",
      draw: [
        { t: 'title', text: 'Radioaktiv yemirilish' },
        { t: 'formula', x: 6, y: 22, text: 'm′(t) = −α · m(t)' },
        { t: 'text', x: 6, y: 38, text: 'm = m₀ · e^{−α(t − t₀)}', color: 'blue' },
        { t: 'bars', x: 56, y: 18, w: 38, h: 38, items: [{ label: '0', value: 80 }, { label: '1600', value: 40 }, { label: '3200', value: 20 }, { label: '4800', value: 10 }], color: 'orange' },
        { t: 'text', x: 6, y: 54, text: 'radiy: 1600 yilda yarmi', size: 's', color: 'purple' }
      ],
      next: 'Iqtisodda-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Iqtisodda ham shunday modellar bor. Fermer narx oʻzgarish tezligini kuzatadi. Talab va taklif tengligidan p shtrix teng minus p minus 10 boʻlinsin 10 tenglama chiqadi. Yechimi p teng p nol minus 10 karra e ning minus t boʻlinsin 10 darajasi plyus 10. Narx qanday boshlanmasin, vaqt oʻtishi bilan 10 ga yaqinlashadi — bu bozor muvozanati. Investitsiyada esa ishlab chiqarish Q shtrix teng kQ, yaʼni eksponenta boʻyicha oʻsadi.",
      easy: "Narx vaqt oʻtishi bilan muvozanat narxi 10 ga yaqinlashadi. Investitsiyada ishlab chiqarish eksponenta boʻyicha oʻsadi.",
      draw: [
        { t: 'title', text: 'Narx va investitsiya' },
        { t: 'text', x: 6, y: 20, text: 'p′ = −(p − 10)/10' },
        { t: 'text', x: 6, y: 30, text: 'p = (p₀ − 10)e^{−t/10} + 10', size: 's' },
        { t: 'text', x: 6, y: 42, text: 'p(t) → 10 (muvozanat)', color: 'green' },
        { t: 'text', x: 6, y: 56, text: 'Investitsiya: Q′ = kQ', color: 'blue' },
        { t: 'axes', id: 'p', x: 58, y: 14, w: 38, h: 50, xmin: 0, xmax: 52, ymin: 0, ymax: 45, xlabel: 't', ylabel: 'p' },
        { t: 'curve', axes: 'p', points: [[0, 10], [52, 10]], color: 'ink', dashed: true },
        { t: 'curve', axes: 'p', points: PRICE, color: 'green' },
        { t: 'dot', axes: 'p', x: 0, y: 40, color: 'ink' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Sovish qonuni: T′ = −k(T − τ), yechimi T = τ + (T₀ − τ)eᵃᵗ; harorat havo haroratiga yaqinlashadi.',
    'Radioaktiv yemirilish: m′ = −αm, massa teng vaqtlarda bir xil marta kamayadi.',
    'Iqtisodiy modellarda ham narx muvozanatga yaqinlashadi, ishlab chiqarish esa Q′ = kQ boʻyicha oʻsadi.'
  ],
  questions: [
    {
      id: 'm20q1',
      prompt: 'Choy 90°, xona 20°. Choy va xona harorati farqi har 10 minutda ikki barobar kamayadi. 20 minutdan keyin choy necha gradus boʻladi?',
      hint: 'Farq 70° → 35° → 17,5°.',
      explanation: 'T = 20 + 17,5 = 37,5°.',
      widget: { type: 'number_answer', props: { answer: 37.5, tolerance: 0.01, unit: '°C' } }
    },
    {
      id: 'm20q2',
      prompt: 'Qayiq tezligi 20 km/soat, har 40 sekundda u 0,4 barobar boʻladi. 80 sekunddan keyin tezlik qancha?',
      hint: '20 · 0,4 · 0,4.',
      explanation: '20 · 0,16 = 3,2 km/soat.',
      widget: { type: 'number_answer', props: { answer: 3.2, tolerance: 0.01, unit: 'km/soat' } }
    },
    {
      id: 'm20q3',
      prompt: 'Radiy har 1600 yilda yarmiga kamayadi. 80 g radiydan 3200 yildan keyin necha gramm qoladi?',
      hint: '3200 yil — ikkita 1600 yil.',
      explanation: '80 → 40 → 20 g.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'g' } }
    },
    {
      id: 'm20q4',
      prompt: 'Qaysi grafik 25° li xonada sovuyotgan jismni koʻrsatadi?',
      hint: 'Avval tez, keyin sekin kamayadi va 25° ga yaqinlashadi.',
      explanation: 'c grafik kamayib, 25° chizigʻiga yaqinlashadi va undan pastga tushmaydi.',
      widget: {
        type: 'graph_choose',
        props: {
          answer: 'c',
          graphs: [
            { id: 'a', graph: { xmin: 0, xmax: 92, ymin: 0, ymax: 105, xlabel: 't', ylabel: 'T', curves: [{ points: [[0, 100], [90, 10]] }] } },
            { id: 'b', graph: { xmin: 0, xmax: 92, ymin: 0, ymax: 105, xlabel: 't', ylabel: 'T', curves: [{ points: [[0, 25], [20, 40], [40, 60], [60, 76], [90, 95]] }] } },
            { id: 'c', graph: { xmin: 0, xmax: 92, ymin: 0, ymax: 105, xlabel: 't', ylabel: 'T', curves: [{ points: BREAD }, { points: [[0, 25], [92, 25]], dashed: true }] } },
            { id: 'd', graph: { xmin: 0, xmax: 92, ymin: 0, ymax: 105, xlabel: 't', ylabel: 'T', curves: [{ points: [[0, 100], [10, 60], [20, 36], [30, 22], [40, 13], [60, 5], [90, 1]] }, { points: [[0, 25], [92, 25]], dashed: true }] } }
          ]
        }
      }
    },
    {
      id: 'm20q5',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Sovish tezligi farqqa proporsional.',
      explanation: 'Farq eng katta boshida — sovish ham eng tez. Jism havodan sovuqroq boʻlib qolmaydi. Yemirilishda massa kamayadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sovish boshida eng tez boʻladi.', value: true },
            { text: 'Jism vaqt oʻtishi bilan havo haroratidan ham sovuqroq boʻladi.', value: false },
            { text: 'T′ harorat farqi T − τ ga proporsional.', value: true },
            { text: 'm = m₀e^(−αt) funksiya vaqt oʻtishi bilan oʻsadi (α > 0).', value: false }
          ]
        }
      }
    },
    {
      id: 'm20q6',
      prompt: 'Har bir jarayonga uning qonunini moslang.',
      hint: 'Qaysi biri qayerga yaqinlashadi?',
      explanation: 'Sovish — τ ga, narx — 10 ga yaqinlashadi; yemirilish — nolga intiladi; bakteriya — oʻsadi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Sovish', right: 'T = τ + (T₀ − τ)eᵃᵗ' },
            { left: 'Yemirilish', right: 'm = m₀e^(−αt)' },
            { left: 'Bakteriyalar', right: 'b = b₀eᵏᵗ' },
            { left: 'Bozor narxi', right: 'p = (p₀ − 10)e^(−t/10) + 10' }
          ]
        }
      }
    },
    {
      id: 'm20q7',
      prompt: 'p = (p₀ − 10)e^(−t/10) + 10 modelida uzoq vaqtdan keyin narx qaysi songa yaqinlashadi?',
      hint: 't oʻsganda e^(−t/10) nolga intiladi.',
      explanation: 'Birinchi had yoʻqoladi, narx 10 ga yaqinlashadi.',
      widget: { type: 'number_answer', props: { answer: 10 } }
    },
    {
      id: 'm20q8',
      prompt: 'Miqdorlarni guruhlarga ajrating: vaqt oʻtishi bilan oʻsadimi yoki kamayadimi?',
      hint: 'Daraja koʻrsatkichidagi ishora yoki asos 1 dan kattami?',
      explanation: 'e^(0,5t), 10·2ᵗ, 1,05ᵗ — oʻsadi; e^(−2t), 80·(1/2)ᵗ, 25 + 75e^(−t) — kamayadi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'up', label: 'Oʻsadi' },
            { id: 'down', label: 'Kamayadi' }
          ],
          items: [
            { emoji: '', label: 'e^(0,5t)', bin: 'up' },
            { emoji: '', label: '10·2ᵗ', bin: 'up' },
            { emoji: '', label: '1,05ᵗ', bin: 'up' },
            { emoji: '', label: 'e^(−2t)', bin: 'down' },
            { emoji: '', label: '80·(1/2)ᵗ', bin: 'down' },
            { emoji: '', label: '25 + 75e^(−t)', bin: 'down' }
          ]
        }
      }
    },
    {
      id: 'm20q9',
      prompt: 'Choy 20° li xonada soviyapti. Oʻlchangan haroratlarni vaqt boʻyicha tartiblang.',
      hint: 'Harorat kamayib, 20° ga yaqinlashadi.',
      explanation: '90° → 55° → 37,5° → 28° → 21°: farq har safar kamayadi.',
      widget: { type: 'order_line', props: { items: [{ label: '90°' }, { label: '55°' }, { label: '37,5°' }, { label: '28°' }, { label: '21°' }] } }
    }
  ]
};
