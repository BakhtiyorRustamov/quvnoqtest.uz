import type { BoardLesson } from './types';

/** f(x) = 2x³ − 3x² − 12x + 3 (darslik, 1-misol) */
const F1: [number, number][] = [[-2.5, -17], [-2, -1], [-1.5, 7.5], [-1, 10], [-0.5, 8], [0, 3], [0.5, -3.5], [1, -10], [1.5, -15], [2, -17], [2.5, -14.5], [3, -6], [3.5, 10]];
/** f′(x) = x² − x − 2 = (x − 2)(x + 1) */
const D1: [number, number][] = [[-2.5, 6.75], [-2, 4], [-1.5, 1.75], [-1, 0], [-0.5, -1.25], [0, -2], [0.5, -2.25], [1, -2], [1.5, -1.25], [2, 0], [2.5, 1.75], [3, 4], [3.5, 6.75]];

/** Darslik: 18–21-mavzu (42–43-betlar) — funksiyaning oʻsishi va kamayishi. */
export const MATH_12: BoardLesson = {
  n: 12,
  label: "18",
  part: 'algebra',
  title: "Funksiya qachon oʻsadi, qachon kamayadi",
  section: '18–21',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Chimyon togʻiga piyoda yuryapsiz. Telefoningizdagi ilova balandlik grafigini chizib boryapti. Qayerda yoʻl yuqoriga koʻtarilyapti, qayerda pastga tushyapti? Matematikada buni funksiyaning oʻsishi va kamayishi deymiz. Hosila buni oldindan aytib beradi.",
      easy: "Yoʻl koʻtarilsa — balandlik oʻsadi, tushsa — kamayadi. Biz buni grafikka qaramasdan, faqat hosiladan bilishni oʻrganamiz.",
      draw: [
        { t: 'title', text: 'Togʻ yoʻli' },
        { t: 'icon', x: 13, y: 34, emoji: '⛰️', size: 'l' },
        { t: 'axes', id: 'h', x: 28, y: 15, w: 64, h: 40, xmin: 0, xmax: 10, ymin: 1, ymax: 3, xlabel: 'km', ylabel: 'balandlik' },
        { t: 'curve', axes: 'h', points: [[0, 1.2], [1, 1.4], [2, 1.8], [3, 2.3], [4, 2.65], [4.5, 2.7]], color: 'green' },
        { t: 'curve', axes: 'h', points: [[4.5, 2.7], [5, 2.65], [6, 2.3], [7, 2.0], [8, 1.9]], color: 'red' },
        { t: 'curve', axes: 'h', points: [[8, 1.9], [9, 2.1], [10, 2.5]], color: 'green' },
        { t: 'text', x: 30, y: 62, text: 'koʻtarilish — oʻsish', size: 's', color: 'green' },
        { t: 'text', x: 64, y: 62, text: 'tushish — kamayish', size: 's', color: 'red' }
      ],
      next: 'Hosila qanday aytadi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hosila — urinmaning qiyaligi. Agar biror oraliqda hosila musbat boʻlsa, urinmalar yuqoriga qarab ketadi va funksiya shu oraliqda oʻsadi. Hosila manfiy boʻlsa, urinmalar pastga qaraydi va funksiya kamayadi. Bular darslikdagi birinchi va ikkinchi teoremalar.",
      easy: "Hosila plyus — grafik koʻtariladi. Hosila minus — grafik tushadi. Hammasi shu.",
      draw: [
        { t: 'title', text: 'Hosila ishorasi' },
        { t: 'axes', id: 'u', x: 6, y: 16, w: 40, h: 34, xmin: 0, xmax: 4, ymin: 0, ymax: 4 },
        { t: 'curve', axes: 'u', points: [[0, 0.3], [1, 1.6], [2, 2.4], [3, 3], [4, 3.4]], color: 'green' },
        { t: 'curve', axes: 'u', points: [[0, 0.6], [2.5, 3.1]], color: 'ink', dashed: true },
        { t: 'axes', id: 'd', x: 54, y: 16, w: 40, h: 34, xmin: 0, xmax: 4, ymin: 0, ymax: 4 },
        { t: 'curve', axes: 'd', points: [[0, 3.6], [1, 2.2], [2, 1.4], [3, 1], [4, 0.8]], color: 'red' },
        { t: 'curve', axes: 'd', points: [[0, 3.3], [2.5, 0.55]], color: 'ink', dashed: true },
        { t: 'text', x: 6, y: 60, text: 'f′(x) > 0 → oʻsadi', color: 'green' },
        { t: 'text', x: 54, y: 60, text: 'f′(x) < 0 → kamayadi', color: 'red' }
      ],
      next: 'Qanday topamiz?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Darslikdagi birinchi misol: f(x) teng 2x kub minus 3x kvadrat minus 12x plyus 3. Hosilasi 6x kvadrat minus 6x minus 12, yaʼni 6 karra x minus 2 karra x plyus 1. Hosila minus 1 va 2 nuqtalarda nolga aylanadi. Bu nuqtalar son oʻqini uch oraliqqa ajratadi. Har bir oraliqda hosilaning ishorasini aniqlaymiz: plyus, minus, plyus. Bu oraliqlar usuli.",
      easy: "Hosila nolga teng boʻladigan nuqtalarni topib, son oʻqini boʻlaklarga ajratamiz. Har bir boʻlakdan bitta son olib, hosila ishorasini tekshiramiz.",
      draw: [
        { t: 'title', text: 'Oraliqlar usuli' },
        { t: 'text', x: 6, y: 19, text: 'f(x) = 2x³ − 3x² − 12x + 3', size: 's' },
        { t: 'formula', x: 8, y: 29, text: 'f′(x) = 6(x − 2)(x + 1)' },
        { t: 'point', id: 'L', x: 6, y: 46 },
        { t: 'point', id: 'R', x: 94, y: 46 },
        { t: 'line', from: 'L', to: 'R', color: 'ink', arrow: true },
        { t: 'point', id: 'P1', x: 35, y: 46, label: '−1' },
        { t: 'point', id: 'P2', x: 65, y: 46, label: '2' },
        { t: 'text', x: 18, y: 42, text: '+', size: 'l', color: 'green' },
        { t: 'text', x: 49, y: 42, text: '−', size: 'l', color: 'red' },
        { t: 'text', x: 80, y: 42, text: '+', size: 'l', color: 'green' },
        { t: 'text', x: 10, y: 56, text: 'oʻsadi', size: 's', color: 'green' },
        { t: 'text', x: 42, y: 56, text: 'kamayadi', size: 's', color: 'red' },
        { t: 'text', x: 74, y: 56, text: 'oʻsadi', size: 's', color: 'green' }
      ],
      next: 'Grafikda koʻraylik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Javob: minus cheksizlikdan minus 1 gacha va 2 dan plyus cheksizlikkacha funksiya oʻsadi, minus 1 dan 2 gacha esa kamayadi. Grafikda ham shuni koʻryapmiz: avval yuqoriga, keyin pastga, keyin yana yuqoriga.",
      easy: "Hosila plyus boʻlgan joyda grafik koʻtariladi, minus boʻlgan joyda tushadi. Grafik buni tasdiqlayapti.",
      draw: [
        { t: 'title', text: 'Grafik tasdiqlaydi' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 50, h: 52, xmin: -2.5, xmax: 4, ymin: -19, ymax: 12, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: F1.slice(0, 4), color: 'green' },
        { t: 'curve', axes: 'g', points: F1.slice(3, 10), color: 'red' },
        { t: 'curve', axes: 'g', points: F1.slice(9), color: 'green' },
        { t: 'text', x: 60, y: 24, text: '(−∞; −1): oʻsadi', size: 's', color: 'green' },
        { t: 'text', x: 60, y: 34, text: '(−1; 2): kamayadi', size: 's', color: 'red' },
        { t: 'text', x: 60, y: 44, text: '(2; +∞): oʻsadi', size: 's', color: 'green' }
      ],
      next: 'Yana bir misol!'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ikkinchi misol: f(x) teng x plyus 1 boʻlingan x ga. Bu funksiya x teng nolda aniqlanmagan. Hosilasi 1 minus 1 boʻlingan x kvadrat. U x ning moduli 1 dan katta boʻlganda musbat, 1 dan kichik boʻlganda manfiy. Demak, funksiya minus cheksizlikdan minus 1 gacha va 1 dan plyus cheksizlikkacha oʻsadi, minus 1 dan 0 gacha va 0 dan 1 gacha kamayadi.",
      easy: "Hosila 1 minus 1 boʻlingan x kvadrat. x katta boʻlsa, kasr kichkina, hosila musbat. x nolga yaqin boʻlsa, kasr katta, hosila manfiy. Nol nuqtaning oʻzi chiqarib tashlanadi.",
      draw: [
        { t: 'title', text: '2-misol' },
        { t: 'formula', x: 8, y: 22, text: 'f(x) = x + 1/x' },
        { t: 'list', x: 6, y: 34, items: ['f′(x) = 1 − 1/x²', 'f′ > 0:  (−∞; −1) va (1; +∞) — oʻsadi', 'f′ < 0:  (−1; 0) va (0; 1) — kamayadi'] },
        { t: 'text', x: 6, y: 62, text: 'x = 0 da funksiya aniqlanmagan!', color: 'red' }
      ],
      next: 'Tushundim!'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Baʼzan bizga funksiyaning oʻzi emas, hosilasining grafigi beriladi. Unda qoida oddiy: hosila grafigi Ox oʻqidan yuqorida boʻlgan joyda funksiya oʻsadi, pastda boʻlgan joyda kamayadi. Bu rasmda funksiya minus 1 gacha oʻsadi, minus 1 dan 2 gacha kamayadi, keyin yana oʻsadi.",
      easy: "Bu hosilaning grafigi. Ox dan yuqorisi — plyus, demak funksiya oʻsadi. Pasti — minus, funksiya kamayadi.",
      draw: [
        { t: 'title', text: 'Hosila grafigidan' },
        { t: 'axes', id: 'd', x: 6, y: 14, w: 50, h: 52, xmin: -2.5, xmax: 3.5, ymin: -3, ymax: 7, xlabel: 'x', ylabel: 'f′' },
        { t: 'curve', axes: 'd', points: D1, color: 'blue' },
        { t: 'dot', axes: 'd', x: -1, y: 0, color: 'ink' },
        { t: 'dot', axes: 'd', x: 2, y: 0, color: 'ink' },
        { t: 'text', x: 60, y: 22, text: 'Bu — f′(x) grafigi', size: 's', color: 'blue' },
        { t: 'text', x: 60, y: 32, text: 'Ox dan yuqorida →', size: 's', color: 'green' },
        { t: 'text', x: 60, y: 39, text: 'f oʻsadi', color: 'green' },
        { t: 'text', x: 60, y: 50, text: 'Ox dan pastda →', size: 's', color: 'red' },
        { t: 'text', x: 60, y: 57, text: 'f kamayadi', color: 'red' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'f′(x) > 0 boʻlgan oraliqda funksiya oʻsadi.',
    'f′(x) < 0 boʻlgan oraliqda funksiya kamayadi.',
    'Oraliqlar usuli: f′(x) ni topamiz, f′(x) = 0 ni yechamiz, har bir oraliqda f′ ishorasini aniqlaymiz.',
    'Hosila grafigi Ox dan yuqorida — funksiya oʻsadi, pastda — kamayadi.'
  ],
  questions: [
    {
      id: 'm12q1',
      prompt: 'Har bir funksiyani qutisiga joylang: butun son oʻqida oʻsadimi yoki kamayadimi?',
      hint: 'Hosilasining ishorasiga qarang: (kx + b)′ = k, (x³)′ = 3x² ≥ 0.',
      explanation: 'x/2 − 8, x³, 3x + 1 — oʻsadi. 2 − 9x, −x³, −5x + 2 — kamayadi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'up', label: 'Oʻsadi' },
            { id: 'down', label: 'Kamayadi' }
          ],
          items: [
            { emoji: '', label: 'x/2 − 8', bin: 'up' },
            { emoji: '', label: 'x³', bin: 'up' },
            { emoji: '', label: '3x + 1', bin: 'up' },
            { emoji: '', label: '2 − 9x', bin: 'down' },
            { emoji: '', label: '−x³', bin: 'down' },
            { emoji: '', label: '−5x + 2', bin: 'down' }
          ]
        }
      }
    },
    {
      id: 'm12q2',
      prompt: 'f(x) = x² − 2x + 4 funksiya (−∞; a] da kamayadi, [a; +∞) da oʻsadi. a = ?',
      hint: 'f′(x) = 2x − 2. Qayerda u ishorasini oʻzgartiradi?',
      explanation: '2x − 2 = 0 → x = 1. Chapda f′ < 0, oʻngda f′ > 0. a = 1.',
      widget: { type: 'number_answer', props: { answer: 1 } }
    },
    {
      id: 'm12q3',
      prompt: 'Qaysi funksiya uchun butun oraliqda f′(x) > 0?',
      hint: 'f′ > 0 — grafik doim koʻtariladi.',
      explanation: 'a) da grafik chapdan oʻngga doim koʻtariladi. b) — kamayadi, c) — avval oʻsib keyin kamayadi, d) — oʻzgarmas (f′ = 0).',
      widget: {
        type: 'graph_choose',
        props: {
          answer: 'a',
          graphs: [
            { id: 'a', graph: { xmin: 0, xmax: 4, ymin: 0, ymax: 5, curves: [{ points: [[0, 0.5], [1, 1.2], [2, 2.2], [3, 3.4], [4, 4.6]] }] } },
            { id: 'b', graph: { xmin: 0, xmax: 4, ymin: 0, ymax: 5, curves: [{ points: [[0, 4.5], [1, 3], [2, 2], [3, 1.4], [4, 1]] }] } },
            { id: 'c', graph: { xmin: 0, xmax: 4, ymin: 0, ymax: 5, curves: [{ points: [[0, 0.5], [1, 3], [2, 4], [3, 3], [4, 0.5]] }] } },
            { id: 'd', graph: { xmin: 0, xmax: 4, ymin: 0, ymax: 5, curves: [{ points: [[0, 2.5], [4, 2.5]] }] } }
          ]
        }
      }
    },
    {
      id: 'm12q4',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Har bir funksiyaning hosilasini toping va ishorasini tekshiring.',
      explanation: 'f′ < 0 — kamayadi. (x²)′ = 2x: x < 0 da kamayadi. (x³ − 27x)′ = 3x² − 27 < 0, agar |x| < 3. (−x² + 2x − 3)′ = −2x + 2 < 0, agar x > 1 — kamayadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'f′(x) < 0 boʻlgan oraliqda funksiya kamayadi.', value: true },
            { text: 'f(x) = x² butun son oʻqida oʻsadi.', value: false },
            { text: 'f(x) = x³ − 27x funksiya (−3; 3) oraliqda kamayadi.', value: true },
            { text: 'f(x) = −x² + 2x − 3 funksiya (1; +∞) oraliqda oʻsadi.', value: false }
          ]
        }
      }
    },
    {
      id: 'm12q5',
      prompt: 'Oraliqlar usulining bosqichlarini toʻgʻri tartibda bosing.',
      hint: 'Hammasi hosiladan boshlanadi.',
      explanation: 'f′(x) → f′(x) = 0 → oraliqlar → ishoralar → javob.',
      widget: {
        type: 'step_order',
        props: {
          steps: [
            'Hosilani toping: f′(x)',
            'f′(x) = 0 tenglamani yeching',
            'Topilgan nuqtalar bilan son oʻqini oraliqlarga ajrating',
            'Har bir oraliqda f′(x) ishorasini aniqlang',
            'Oʻsish (+) va kamayish (−) oraliqlarini yozing'
          ]
        }
      }
    },
    {
      id: 'm12q6',
      prompt: 'Bu — hosilaning grafigi. Funksiya oʻsishdan kamayishga oʻtadigan nuqtani bosing.',
      hint: 'Hosila plyusdan minusga oʻtadigan joyni qidiring.',
      explanation: 'x = −1 da f′ grafigi Ox ni yuqoridan pastga kesib oʻtadi: oʻsish tugab, kamayish boshlanadi.',
      widget: {
        type: 'graph_tap',
        props: { target: [-1, 0], radius: 0.35, only: 'x', graph: { xmin: -2.5, xmax: 3.5, ymin: -3, ymax: 7, xlabel: 'x', ylabel: 'f′', curves: [{ points: D1 }] } }
      }
    },
    {
      id: 'm12q7',
      prompt: 'f(x) = x³ − 27x funksiya (−a; a) oraliqda kamayadi. a = ?',
      hint: 'f′(x) = 3x² − 27 = 3(x − 3)(x + 3).',
      explanation: 'f′(x) < 0, agar −3 < x < 3. a = 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'm12q8',
      prompt: 'Har bir funksiyani u oʻsadigan oraliq bilan juftlang.',
      hint: 'Hosila qayerda musbat?',
      explanation: '(x²)′ = 2x > 0, agar x > 0. (−x²)′ = −2x > 0, agar x < 0. (x³)′ = 3x² — hamma joyda oʻsadi. ((x − 2)²)′ = 2(x − 2) > 0, agar x > 2.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'x²', right: '(0; +∞)' },
            { left: '−x²', right: '(−∞; 0)' },
            { left: 'x³', right: '(−∞; +∞)' },
            { left: '(x − 2)²', right: '(2; +∞)' }
          ]
        }
      }
    }
  ]
};
