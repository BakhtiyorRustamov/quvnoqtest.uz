import type { BoardLesson } from './types';

/** f(x) = x³ − 3x (darslik, 6-misol) */
const F3: [number, number][] = [[-2.1, -2.961], [-1.8, -0.432], [-1.5, 1.125], [-1.2, 1.872], [-1, 2], [-0.6, 1.584], [-0.3, 0.873], [0, 0], [0.3, -0.873], [0.6, -1.584], [1, -2], [1.2, -1.872], [1.5, -1.125], [1.8, 0.432], [2.1, 2.961]];
/** f(x) = x⁴ − 2x² */
const F4: [number, number][] = [[-1.6, 1.434], [-1.5, 0.563], [-1.3, -0.524], [-1.2, -0.806], [-1, -1], [-0.8, -0.870], [-0.5, -0.438], [-0.25, -0.121], [0, 0], [0.25, -0.121], [0.5, -0.438], [0.8, -0.870], [1, -1], [1.2, -0.806], [1.3, -0.524], [1.5, 0.563], [1.6, 1.434]];

/** Darslik: 18–21-mavzu (45–48-betlar) — hosila yordamida funksiyani tekshirish va grafik yasash. */
export const MATH_15: BoardLesson = {
  n: 15,
  label: "21",
  part: 'algebra',
  title: "Hosila yordamida funksiyani tekshirib, grafik chizish",
  section: '18–21',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Velosipedda togʻ yoʻliga chiqishdan oldin yoʻl xaritasiga qaraysiz: qayerda chiqish, qayerda tushish, eng baland choʻqqi qayerda. Funksiya grafigi ham xuddi shunday xarita. Hosila bizga qayerda chiqish va qayerda tushish borligini aytadi, shuning uchun grafikni nuqtama-nuqta emas, aqlli chizamiz.",
      easy: "Yoʻl xaritasida chiqish, tushish va choʻqqilar bor. Grafik ham shunday. Hosila qayerda chiqish, qayerda tushish ekanini koʻrsatadi.",
      draw: [
        { t: 'title', text: 'Yoʻl xaritasi' },
        { t: 'icon', x: 10, y: 30, emoji: '🚲', size: 'l' },
        { t: 'axes', id: 'r', x: 26, y: 15, w: 68, h: 42, xmin: 0, xmax: 10, ymin: 0, ymax: 10, xlabel: 'km', ylabel: 'm' },
        { t: 'curve', axes: 'r', points: [[0, 2], [1, 3.5], [2, 6], [3, 7.5], [4, 6.5], [5, 4], [6, 3], [7, 4.5], [8, 7], [9, 8.8], [10, 9.3]], color: 'green' },
        { t: 'dot', axes: 'r', x: 3, y: 7.5, label: 'choʻqqi', color: 'red' },
        { t: 'dot', axes: 'r', x: 6, y: 3, label: 'chuqurlik', color: 'blue' },
        { t: 'text', x: 26, y: 66, text: 'Chiqish: f′ > 0,   tushish: f′ < 0', size: 's', color: 'purple' }
      ],
      next: 'Reja qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Funksiyani tekshirish rejasi oltita qadamdan iborat. Birinchi: aniqlanish sohasi. Ikkinchi: juft yoki toqligi — juft funksiya grafigi Oy oʻqiga, toq funksiya grafigi koordinata boshiga nisbatan simmetrik. Uchinchi: nollari, yaʼni grafik Ox oʻqini qayerda kesadi. Toʻrtinchi: hosila va statsionar nuqtalar. Beshinchi: oʻsish, kamayish oraliqlari va ekstremumlar. Oltinchi: topilgan nuqtalar boʻyicha grafikni chizamiz.",
      easy: "Avval soha, simmetriya va nollarni topamiz. Keyin hosila orqali chiqish-tushishlarni aniqlaymiz. Oxirida grafikni chizamiz.",
      draw: [
        { t: 'title', text: 'Tekshirish rejasi' },
        { t: 'list', x: 6, y: 20, items: ['1) Aniqlanish sohasi D(f)', '2) Juft yoki toqligi (simmetriya)', '3) Nollari: f(x) = 0', '4) f′(x) va statsionar nuqtalar', '5) Oʻsish, kamayish, ekstremumlar', '6) Nuqtalar boʻyicha grafik'] }
      ],
      next: 'Misolda koʻraylik'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi misol: f(x) teng x kub minus 3x. Aniqlanish sohasi — barcha haqiqiy sonlar. f(minus x) teng minus f(x), demak funksiya toq, grafigi koordinata boshiga nisbatan simmetrik. Nollari: x karra x kvadrat minus 3 teng 0, bundan x teng 0 va x teng plyus-minus ildiz 3, taxminan 1,73. Hosila 3x kvadrat minus 3, u x teng minus 1 va x teng 1 da nolga teng.",
      easy: "Funksiya toq, nollari 0 va plyus-minus ildiz 3. Hosila 3x kvadrat minus 3, statsionar nuqtalar minus 1 va 1.",
      draw: [
        { t: 'title', text: 'Misol: f(x) = x³ − 3x' },
        { t: 'list', x: 6, y: 20, items: ['D(f) = R', 'f(−x) = −f(x)  →  toq funksiya', 'Nollari: x = 0,  x = ±√3 ≈ ±1,73'] },
        { t: 'formula', x: 8, y: 48, text: 'f′(x) = 3x² − 3 = 0  →  x = ±1' }
      ],
      next: 'Endi ishoralar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Endi hosilaning ishoralarini jadvalga yozamiz. x minus 1 dan kichik boʻlsa, hosila musbat — funksiya oʻsadi. Minus 1 bilan 1 orasida hosila manfiy — funksiya kamayadi. x 1 dan katta boʻlsa, yana oʻsadi. Demak, x teng minus 1 da lokal maksimum: f(minus 1) teng 2. x teng 1 da lokal minimum: f(1) teng minus 2.",
      easy: "Plyus, minus, plyus. Oʻsadi, kamayadi, yana oʻsadi. Maksimum 2, minimum minus 2.",
      draw: [
        { t: 'title', text: 'Ishoralar jadvali' },
        {
          t: 'table',
          x: 8,
          y: 20,
          rows: [
            ['x', 'x < −1', '−1', '−1 < x < 1', '1', 'x > 1'],
            ['f′(x)', '+', '0', '−', '0', '+'],
            ['f(x)', 'oʻsadi', '2', 'kamayadi', '−2', 'oʻsadi']
          ]
        },
        { t: 'box', id: 'mx', x: 8, y: 44, w: 40, h: 11, text: 'max: f(−1) = 2', color: 'red' },
        { t: 'box', id: 'mn', x: 54, y: 44, w: 40, h: 11, text: 'min: f(1) = −2', color: 'blue' }
      ],
      next: 'Grafikni chizamiz'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi barcha nuqtalarni belgilaymiz: maksimum minus 1 va 2, minimum 1 va minus 2, nollar 0 va plyus-minus 1,73. Ularni silliq chiziq bilan tutashtiramiz. Grafik koordinata boshiga nisbatan simmetrik chiqdi — toq funksiya ekanini tasdiqlaydi.",
      easy: "Topilgan nuqtalarni belgilab, silliq chiziq bilan tutashtiramiz. Grafik simmetrik chiqdi.",
      draw: [
        { t: 'title', text: 'Grafik' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 52, h: 52, xmin: -2.5, xmax: 2.5, ymin: -3.2, ymax: 3.2, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: F3, color: 'red' },
        { t: 'dot', axes: 'g', x: -1, y: 2, label: 'max', color: 'red' },
        { t: 'dot', axes: 'g', x: 1, y: -2, label: 'min', color: 'blue' },
        { t: 'dot', axes: 'g', x: -1.73, y: 0, color: 'ink' },
        { t: 'dot', axes: 'g', x: 0, y: 0, color: 'ink' },
        { t: 'dot', axes: 'g', x: 1.73, y: 0, color: 'ink' },
        { t: 'text', x: 62, y: 26, text: 'max (−1; 2)', color: 'red' },
        { t: 'text', x: 62, y: 35, text: 'min (1; −2)', color: 'blue' },
        { t: 'text', x: 62, y: 46, text: 'nollar: 0; ±1,73', size: 's' },
        { t: 'text', x: 62, y: 55, text: 'O ga simmetrik', size: 's', color: 'purple' }
      ],
      next: 'Yana bittasi'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ikkinchi misol: f(x) teng x ning toʻrtinchi darajasi minus 2x kvadrat. f(minus x) teng f(x), demak funksiya juft va grafigi Oy oʻqiga nisbatan simmetrik. Nollari: 0 va plyus-minus ildiz 2. Hosila 4x kub minus 4x, yaʼni 4x karra x minus 1 karra x plyus 1. Statsionar nuqtalar: minus 1, 0 va 1. x teng 0 da maksimum 0, x teng plyus-minus 1 da minimum minus 1. Grafik W harfiga oʻxshaydi.",
      easy: "Funksiya juft, grafik Oy ga simmetrik. Statsionar nuqtalar minus 1, 0, 1. Oʻrtada maksimum 0, ikki chetda minimum minus 1.",
      draw: [
        { t: 'title', text: 'f(x) = x⁴ − 2x²' },
        { t: 'list', x: 6, y: 20, items: ['juft → Oy ga simmetrik', 'nollari: 0, ±√2', 'f′ = 4x(x − 1)(x + 1)', 'max: f(0) = 0', 'min: f(±1) = −1'] },
        { t: 'axes', id: 'w', x: 56, y: 14, w: 40, h: 50, xmin: -1.8, xmax: 1.8, ymin: -1.4, ymax: 1.6, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'w', points: F4, color: 'blue' },
        { t: 'dot', axes: 'w', x: 0, y: 0, label: 'max', color: 'red' },
        { t: 'dot', axes: 'w', x: -1, y: -1, label: 'min', color: 'blue' },
        { t: 'dot', axes: 'w', x: 1, y: -1, label: 'min', color: 'blue' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Reja: soha → juft-toqlik → nollar → f′ va statsionar nuqtalar → oʻsish-kamayish va ekstremumlar → grafik.',
    'Toq funksiya grafigi koordinata boshiga, juft funksiya grafigi Oy oʻqiga nisbatan simmetrik.',
    'f′ ishorasi + dan − ga oʻtsa maksimum, − dan + ga oʻtsa minimum.'
  ],
  questions: [
    {
      id: 'm15q1',
      prompt: 'f(x) = x³ − 12x funksiyaning lokal maksimumidagi qiymatini toping.',
      hint: 'f′(x) = 3x² − 12 = 0 → x = ±2. Maksimum chap tomondagi nuqtada.',
      explanation: 'f′ ishorasi x = −2 da + dan − ga oʻtadi. f(−2) = −8 + 24 = 16.',
      widget: { type: 'number_answer', props: { answer: 16 } }
    },
    {
      id: 'm15q2',
      prompt: 'Funksiyani tekshirish qadamlarini toʻgʻri tartibda bosing.',
      hint: 'Sohadan boshlanadi, grafik bilan tugaydi.',
      explanation: 'Soha → juft-toqlik → nollar → f′ va statsionar nuqtalar → oʻsish-kamayish → grafik.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['Aniqlanish sohasini toping', 'Juft yoki toqligini tekshiring', 'Nollarini toping', 'f′(x) va statsionar nuqtalarni toping', 'Oʻsish, kamayish va ekstremumlarni aniqlang', 'Grafikni chizing']
        }
      }
    },
    {
      id: 'm15q3',
      prompt: 'Qaysi grafik f(x) = x³ − 3x funksiyaning grafigi?',
      hint: 'Maksimum (−1; 2), minimum (1; −2).',
      explanation: 'Chapda tepalik (−1; 2), oʻngda chuqurlik (1; −2) — bu b grafik.',
      widget: {
        type: 'graph_choose',
        props: {
          answer: 'b',
          graphs: [
            { id: 'a', graph: { xmin: -2.5, xmax: 2.5, ymin: -3.2, ymax: 3.2, curves: [{ points: [[-1.4, -2.744], [-1, -1], [-0.5, -0.125], [0, 0], [0.5, 0.125], [1, 1], [1.4, 2.744]] }] } },
            { id: 'b', graph: { xmin: -2.5, xmax: 2.5, ymin: -3.2, ymax: 3.2, curves: [{ points: F3 }] } },
            { id: 'c', graph: { xmin: -2.5, xmax: 2.5, ymin: -3.2, ymax: 3.2, curves: [{ points: F3.map(([x, y]) => [x, -y] as [number, number]) }] } },
            { id: 'd', graph: { xmin: -2.5, xmax: 2.5, ymin: -3.2, ymax: 3.2, curves: [{ points: [[-2.1, 1.41], [-1.5, -0.75], [-1, -2], [0, -3], [1, -2], [1.5, -0.75], [2.1, 1.41]] }] } }
          ]
        }
      }
    },
    {
      id: 'm15q4',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Simmetriya va statsionar nuqta haqidagi qoidalarni eslang.',
      explanation: 'Toq — O ga, juft — Oy ga simmetrik. f′ > 0 da funksiya oʻsadi. y = x³ da x = 0 statsionar, lekin ekstremum emas.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Toq funksiya grafigi koordinata boshiga nisbatan simmetrik.', value: true },
            { text: 'Juft funksiya grafigi Oy oʻqiga nisbatan simmetrik.', value: true },
            { text: 'f′(x) > 0 boʻlgan oraliqda funksiya kamayadi.', value: false },
            { text: 'Har bir statsionar nuqtada ekstremum bor.', value: false }
          ]
        }
      }
    },
    {
      id: 'm15q5',
      prompt: 'f(x) = x⁴ − 2x² grafigida lokal maksimum nuqtasini bosing.',
      hint: 'Ikki chuqurlik orasidagi kichik tepalik.',
      explanation: 'x = 0 da f′ ishorasi + dan − ga oʻtadi: lokal maksimum (0; 0).',
      widget: {
        type: 'graph_tap',
        props: { target: [0, 0], radius: 0.25, graph: { xmin: -1.8, xmax: 1.8, ymin: -1.4, ymax: 1.6, xlabel: 'x', ylabel: 'y', curves: [{ points: F4 }] } }
      }
    },
    {
      id: 'm15q6',
      prompt: 'f(x) = x⁴ − 2x² funksiyaning nechta noli bor?',
      hint: 'x²(x² − 2) = 0.',
      explanation: 'x = 0, x = √2, x = −√2 — jami 3 ta.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'm15q7',
      prompt: 'Funksiyalarni guruhlarga ajrating.',
      hint: 'f(−x) ni hisoblang: f(x) ga tengmi, −f(x) gami yoki hech biriga emasmi?',
      explanation: 'x⁴ − 2x² va cos x — juft; x³ − 3x va sin x — toq; x² + x va x³ + 1 — juft ham, toq ham emas.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'j', label: 'Juft' },
            { id: 't', label: 'Toq' },
            { id: 'h', label: 'Hech biri' }
          ],
          items: [
            { emoji: '', label: 'x⁴ − 2x²', bin: 'j' },
            { emoji: '', label: 'cos x', bin: 'j' },
            { emoji: '', label: 'x³ − 3x', bin: 't' },
            { emoji: '', label: 'sin x', bin: 't' },
            { emoji: '', label: 'x² + x', bin: 'h' },
            { emoji: '', label: 'x³ + 1', bin: 'h' }
          ]
        }
      }
    },
    {
      id: 'm15q8',
      prompt: 'Gapni toʻldiring.',
      hint: 'Chiqishdan keyin tushish — tepalik.',
      explanation: 'f′ ishorasi + dan − ga oʻtsa — maksimum, − dan + ga oʻtsa — minimum.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'f′(x) ishorasi + dan − ga oʻtsa, bu nuqtada ' }, { blank: 'maksimum' }, { text: ', − dan + ga oʻtsa ' }, { blank: 'minimum' }, { text: ' boʻladi.' }],
          bank: ['maksimum', 'minimum', 'nol', 'uzilish']
        }
      }
    },
    {
      id: 'm15q9',
      prompt: 'Qaysi funksiya toq EMAS? Ortiqchasini bosing.',
      hint: 'f(−x) = −f(x) boʻlishi kerak.',
      explanation: 'x² + 1 da f(−x) = f(x) — u juft. Qolganlari toq.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'x³' }, { text: 'sin x' }, { text: 'x⁵ − x' }, { text: 'x² + 1', odd: true }] } }
    }
  ]
};
