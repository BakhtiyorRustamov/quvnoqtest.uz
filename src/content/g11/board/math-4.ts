import type { BoardLesson } from './types';

/** Darslik: 3–4-mavzu (13–15-betlar) — limitlarni hisoblash, uzilish nuqtasi. */
export const MATH_4: BoardLesson = {
  n: 4,
  label: "4",
  part: 'algebra',
  title: "Limitlarni hisoblaymiz. Uzilish nuqtalari",
  section: '3–4',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Koʻprikni tasavvur qiling: uning oʻrtasida bitta taxta yetishmaydi. Chap tomondan ham, oʻng tomondan ham oʻsha joyga juda yaqin borish mumkin, faqat teshikning oʻzida turib boʻlmaydi. Funksiyalar grafigida ham shunday «teshik»lar boʻladi. Bugun ularda limitni qanday hisoblashni oʻrganamiz.",
      easy: "Teshikka ikki tomondan yaqinlashsa boʻladi, lekin ichiga qadam qoʻyib boʻlmaydi. Limit ham «yaqinlashish», shuning uchun teshik unga xalaqit bermaydi.",
      draw: [
        { t: 'title', text: 'Koʻprikdagi teshik' },
        { t: 'text', x: 50, y: 24, text: 'Chapdan ham, oʻngdan ham yetib kelamiz', anchor: 'middle' },
        { t: 'point', id: 'L', x: 8, y: 42 },
        { t: 'point', id: 'H1', x: 44, y: 42 },
        { t: 'point', id: 'H2', x: 56, y: 42 },
        { t: 'point', id: 'R', x: 92, y: 42 },
        { t: 'line', from: 'L', to: 'H1', color: 'blue' },
        { t: 'line', from: 'H2', to: 'R', color: 'blue' },
        { t: 'line', from: 'H1', to: 'H2', color: 'red', dashed: true },
        { t: 'icon', x: 20, y: 36, emoji: '🚶', size: 's' },
        { t: 'text', x: 50, y: 52, text: 'teshik', anchor: 'middle', size: 's', color: 'red' }
      ],
      next: "Qanday hisoblanadi?"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Koʻp hollarda limitni topish oson: x ning oʻrniga a ni qoʻyamiz. Masalan, x 2 ga intilganda x kvadrat plyus 1 ning limiti — 2 kvadrat plyus 1, yaʼni 5. Endi boshqa misol: x kvadrat plyus 2x, boʻlingan x ga, x nolga intilganda. Nolni qoʻysak, nol boʻlingan nol chiqadi. Bu aniqmaslik deyiladi — u javob emas, «ifodani soddalashtir» degan ishora.",
      easy: "Avval har doim sonni qoʻyib koʻramiz. Oddiy son chiqsa — tayyor javob. Nol boʻlingan nol chiqsa — demak ifodani oldin soddalashtirish kerak.",
      draw: [
        { t: 'title', text: 'Avval — qoʻyib koʻramiz' },
        { t: 'formula', x: 8, y: 21, text: 'lim (x→2) (x² + 1) = 2² + 1 = 5' },
        { t: 'text', x: 6, y: 30, text: 'Koʻphadlarda x oʻrniga sonni qoʻyish kifoya.', size: 's', color: 'green' },
        { t: 'formula', x: 8, y: 44, text: 'f(x) = (x² + 2x) / x,   x → 0' },
        { t: 'text', x: 6, y: 53, text: 'x = 0 qoʻysak:  0 / 0 ?', color: 'red' },
        { t: 'box', id: 'q', x: 54, y: 56, w: 42, h: 12, text: '0/0 — aniqmaslik: «soddalashtir» degan ishora', color: 'orange' }
      ],
      next: "Qanday soddalashtiramiz?"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Suratdagi x ni qavsdan tashqariga chiqaramiz: x karra x plyus 2. Endi kasrni x ga qisqartiramiz. Bu mumkin, chunki limitda x nolga teng emas, faqat yaqinlashadi. Qoladi: x plyus 2. Endi nolni bemalol qoʻyamiz: nol plyus 2 — 2. Limit 2 ga teng.",
      easy: "Surat va maxrajda bir xil x bor — ularni qisqartiramiz. Qolgan oddiy ifodaga nolni qoʻysak, 2 chiqadi.",
      draw: [
        { t: 'title', text: 'Soddalashtiramiz' },
        { t: 'formula', x: 8, y: 21, text: '(x² + 2x) / x = x(x + 2) / x' },
        { t: 'formula', x: 8, y: 34, text: '= x + 2,   chunki x ≠ 0' },
        { t: 'formula', x: 8, y: 48, text: 'lim (x→0) (x + 2) = 0 + 2 = 2' },
        { t: 'box', id: 'r', x: 6, y: 55, w: 50, h: 10, text: 'Javob: limit 2 ga teng', color: 'green' }
      ],
      next: "Grafikda qanday?"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Grafikda bu funksiya y teng x plyus 2 toʻgʻri chizigʻiga oʻxshaydi, faqat x teng nol da bitta nuqta «olib tashlangan» — u yerda teshik. Bu (0; 2) nuqta funksiyaning uzilish nuqtasi deyiladi. Funksiyaning oʻzi u yerda yoʻq, lekin ikki tomondan ham qiymatlar 2 ga intiladi. Limit 2 ga teng.",
      easy: "Chiziq butun, faqat bitta nuqtasi yoʻq. Oʻsha teshik — uzilish nuqtasi. Teshikka ikki tomondan yaqinlashsak ham 2 ga kelamiz.",
      draw: [
        { t: 'title', text: 'Uzilish nuqtasi' },
        { t: 'axes', id: 'u', x: 6, y: 13, w: 54, h: 50, xmin: -3, xmax: 3, ymin: -2, ymax: 6, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'u', points: [[-3, -1], [3, 5]], color: 'red' },
        { t: 'dot', axes: 'u', x: 0, y: 2, open: true },
        { t: 'text', x: 21, y: 36, text: '(0; 2)', size: 's', color: 'red' },
        { t: 'text', x: 65, y: 24, text: 'y = x + 2,', size: 's' },
        { t: 'text', x: 65, y: 30, text: 'lekin x ≠ 0', size: 's' },
        { t: 'box', id: 't', x: 64, y: 38, w: 34, h: 13, text: '(0; 2) — uzilish nuqtasi', color: 'purple' },
        { t: 'text', x: 64, y: 61, text: 'f(0) yoʻq, limit = 2', size: 's', color: 'green' }
      ],
      next: "Teshik — uzilish nuqtasi!"
    },
    {
      kind: 'example',
      clear: true,
      say: "Birga yechamiz: x 4 ga intilganda, x kvadrat minus 16, boʻlingan x minus 4 ga. 4 ni qoʻysak, nol boʻlingan nol chiqadi — demak soddalashtiramiz. x kvadrat minus 16 — bu x minus 4 karra x plyus 4. x minus 4 ga qisqartiramiz, x plyus 4 qoladi. Endi 4 ni qoʻyamiz: 8. Javob: 8.",
      easy: "Qisqa yoʻl: suratni ikki qavsga ajratamiz, maxrajdagi bilan bir xilini qisqartiramiz va qolganiga 4 ni qoʻyamiz. 4 plyus 4 — 8.",
      draw: [
        { t: 'title', text: 'Misol' },
        { t: 'formula', x: 8, y: 21, text: 'lim (x→4) (x² − 16) / (x − 4)' },
        {
          t: 'list',
          x: 6,
          y: 33,
          items: ['x = 4 qoʻysak: 0 / 0 → soddalashtiramiz', 'x² − 16 = (x − 4)(x + 4)', '(x − 4) ga qisqartiramiz: x + 4', 'x = 4 ni qoʻyamiz: 4 + 4 = 8']
        }
      ],
      next: "Yana bir holat bormi?"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi boshqa holat. Bu grafikda x 2 ga chapdan yaqinlashsa, funksiya 1 ga intiladi, oʻngdan yaqinlashsa — 3 ga. Ikki tomondan har xil sonlar chiqdi. Bunday holda x 2 ga intilganda limit mavjud emas. Limit boʻlishi uchun ikkala tomon bitta songa intilishi kerak.",
      easy: "Chap yoʻl 1 ga, oʻng yoʻl 3 ga olib boradi — ular uchrashmaydi. Ikki tomon bitta joyda uchrashmasa, limit yoʻq.",
      draw: [
        { t: 'title', text: 'Limit boʻlmasa' },
        { t: 'axes', id: 'j', x: 6, y: 13, w: 54, h: 50, xmin: 0, xmax: 4, ymin: 0, ymax: 5, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'j', points: [[0, 0.4], [1, 0.7], [2, 1]], color: 'blue' },
        { t: 'curve', axes: 'j', points: [[2, 3], [3, 3.5], [4, 3.8]], color: 'blue' },
        { t: 'dot', axes: 'j', x: 2, y: 1, open: true, color: 'blue' },
        { t: 'dot', axes: 'j', x: 2, y: 3, color: 'blue' },
        { t: 'text', x: 64, y: 24, text: 'chapdan: f(x) → 1', size: 's' },
        { t: 'text', x: 64, y: 31, text: 'oʻngdan: f(x) → 3', size: 's' },
        { t: 'box', id: 'no', x: 64, y: 39, w: 34, h: 16, text: '1 ≠ 3 — x → 2 da limit mavjud emas', color: 'red' }
      ],
      next: "Mashqlarga oʻtamiz"
    }
  ],
  summary: [
    "Koʻp funksiyalarda (masalan, koʻphadlarda) limitni topish uchun x oʻrniga a ni qoʻyish kifoya.",
    "0/0 chiqsa — bu aniqmaslik: ifodani soddalashtiring (koʻpaytuvchilarga ajrating, qisqartiring).",
    "x ≠ a boʻlgani uchun (x − a) ga qisqartirish mumkin.",
    "Grafikdagi «teshik» — uzilish nuqtasi; u yerda ham limit boʻlishi mumkin.",
    "Chapdan va oʻngdan turli sonlarga intilsa, limit mavjud emas."
  ],
  questions: [
    {
      id: 'm4q1',
      prompt: "lim (x→2) (3x² − x + 1) = ?",
      hint: "Bu koʻphad — x oʻrniga 2 ni qoʻying.",
      explanation: "3 · 4 − 2 + 1 = 11.",
      widget: { type: 'number_answer', props: { answer: 11 } }
    },
    {
      id: 'm4q2',
      prompt: "lim (x→0) (x² + 4x) / x = ?",
      hint: "Suratdan x ni qavsdan chiqaring va qisqartiring.",
      explanation: "x(x + 4) / x = x + 4 → 0 + 4 = 4.",
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'm4q3',
      prompt: "Ifodani soddalashtiring (x ≠ 5):  (x² − 25) / (x − 5)",
      hint: "x² − 25 = (x − 5)(x + 5).",
      explanation: "(x − 5)(x + 5) / (x − 5) = x + 5.",
      widget: { type: 'expression_answer', props: { answer: 'x + 5', noFraction: true, prefix: '=' } }
    },
    {
      id: 'm4q4',
      prompt: "lim (x→5) (x² − 25) / (x − 5) = ?",
      hint: "Oldingi savolda soddalashtirgan ifodaga 5 ni qoʻying.",
      explanation: "x + 5 → 5 + 5 = 10.",
      widget: { type: 'number_answer', props: { answer: 10 } }
    },
    {
      id: 'm4q5',
      prompt: "lim (h→0) (h² + 7h) / h = ?",
      hint: "Bu yerda oʻzgaruvchi h. Uni qavsdan chiqaring.",
      explanation: "h(h + 7) / h = h + 7 → 0 + 7 = 7.",
      widget: { type: 'number_answer', props: { answer: 7 } }
    },
    {
      id: 'm4q6',
      prompt: "Ifodani soddalashtiring (x ≠ 3):  (x² − 3x) / (x − 3)",
      hint: "Suratdan x ni qavsdan chiqaring.",
      explanation: "x(x − 3) / (x − 3) = x.",
      widget: { type: 'expression_answer', props: { answer: 'x', noFraction: true, prefix: '=' } }
    },
    {
      id: 'm4q7',
      prompt: "Grafikda funksiyaning uzilish nuqtasini bosing.",
      hint: "Boʻsh doiracha — olib tashlangan nuqta.",
      explanation: "Uzilish nuqtasi — (2; 1): u yerda funksiya aniqlanmagan, lekin limit 1 ga teng.",
      widget: {
        type: 'graph_tap',
        props: {
          target: [2, 1],
          radius: 0.8,
          graph: { xmin: -2, xmax: 4, ymin: -3, ymax: 4, xlabel: 'x', ylabel: 'y', curves: [{ points: [[-2, -3], [4, 3]] }], holes: [[2, 1]] }
        }
      }
    },
    {
      id: 'm4q8',
      prompt: "x → a da limit MAVJUD boʻlgan holatlarning hammasini bosing.",
      hint: "Limit bor boʻlishi uchun chapdan va oʻngdan bitta songa intilishi kerak.",
      explanation: "Ikki tomondan bitta songa intilsa — limit bor (teshik yoki nuqtadagi boshqa qiymat xalaqit bermaydi). Turli sonlarga intilsa yoki cheksiz oʻssa — limit yoʻq.",
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { text: 'Chapdan 3 ga, oʻngdan 3 ga', match: true },
            { text: 'Chapdan 2 ga, oʻngdan 5 ga', match: false },
            { text: 'Teshik bor, ikki tomondan 4 ga', match: true },
            { text: 'Ikki tomondan cheksiz oʻsadi', match: false },
            { text: 'f(a) = 7, lekin ikki tomondan 1 ga', match: true },
            { text: 'Chapdan 0 ga, oʻngdan 1 ga', match: false }
          ]
        }
      }
    },
    {
      id: 'm4q9',
      prompt: "Qaysi grafiklarda x → 3 da limit mavjud? (Bir nechtasi boʻlishi mumkin.)",
      hint: "Teshik va nuqtadagi qiymatga emas, ikki tomonga qarang.",
      explanation: "a), b) va d) da ikki tomondan 2 ga yaqinlashadi — limit 2. c) da chapdan 1 ga, oʻngdan 4 ga — limit yoʻq.",
      widget: {
        type: 'graph_choose',
        props: {
          answer: ['a', 'b', 'd'],
          graphs: [
            { id: 'a', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 6, curves: [{ points: [[0, 4], [1, 3.2], [2, 2.5], [3, 2], [4, 1.8], [5, 1.7]] }], dots: [[3, 2]], vlines: [3] } },
            { id: 'b', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 6, curves: [{ points: [[0, 4], [1, 3.2], [2, 2.5], [3, 2], [4, 1.8], [5, 1.7]] }], holes: [[3, 2]], vlines: [3] } },
            { id: 'c', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 6, curves: [{ points: [[0, 0.5], [1.5, 0.8], [3, 1]] }, { points: [[3, 4], [4, 4.3], [5, 4.5]] }], holes: [[3, 1]], dots: [[3, 4]], vlines: [3] } },
            { id: 'd', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 6, curves: [{ points: [[0, 4], [1, 3.2], [2, 2.5], [3, 2], [4, 1.8], [5, 1.7]] }], holes: [[3, 2]], dots: [[3, 4]], vlines: [3] } }
          ]
        }
      }
    },
    {
      id: 'm4q10',
      prompt: "lim (x→7) (x² − 49) / (x − 7) ni yechish bosqichlarini toʻgʻri tartibda bosing.",
      hint: "Avval sonni qoʻyib koʻramiz.",
      explanation: "0/0 chiqadi → suratni ajratamiz → qisqartiramiz → 7 ni qoʻyamiz: 14.",
      widget: {
        type: 'step_order',
        props: {
          steps: [
            'x = 7 ni qoʻyamiz: 0 / 0 chiqadi',
            'Suratni ajratamiz: (x − 7)(x + 7)',
            '(x − 7) ga qisqartiramiz: x + 7',
            'x = 7 ni qoʻyamiz: 7 + 7 = 14'
          ]
        }
      }
    }
  ]
};
