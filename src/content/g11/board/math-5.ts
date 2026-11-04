import type { BoardLesson } from './types';

const X2: [number, number][] = [[-1, 1], [-0.5, 0.25], [0, 0], [0.5, 0.25], [1, 1], [1.5, 2.25], [2, 4], [2.5, 6.25], [3, 9], [3.2, 10.24]];
const HILL: [number, number][] = [[0, 0], [0.5, 1.75], [1, 3], [1.5, 3.75], [2, 4], [2.5, 3.75], [3, 3], [3.5, 1.75], [4, 0]];

/** Darslik: 5–6-mavzu (16–18-betlar) — hosila, urinmaning burchak koeffitsiyenti (geometrik maʼnosi). */
export const MATH_5: BoardLesson = {
  n: 5,
  label: "5",
  part: 'algebra',
  title: "Hosila va urinmaning qiyaligi",
  section: '5–6',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Velosipedda tepalikka chiqyapsiz. Yoʻlning boshi yotiq, oʻrtasi juda tik, oxiri yana yotiq. Butun yoʻlning oʻrtacha tikligi — bitta son. Lekin aynan shu turgan joyingiz qanchalik tik? Bitta nuqtadagi tiklikni oʻlchash uchun matematikada hosila bor. Bugun shu bilan tanishamiz.",
      easy: "Tepalikning har bir joyi har xil tik: qayerdadir pedal oson, qayerdadir qiyin. Bitta nuqtadagi tiklikni bilmoqchimiz. Buning uchun hosila kerak boʻladi.",
      draw: [
        { t: 'title', text: 'Yoʻl qanchalik tik?' },
        { t: 'icon', x: 14, y: 44, emoji: '🚴', size: 'l' },
        { t: 'axes', id: 'h', x: 30, y: 15, w: 62, h: 38, xmin: 0, xmax: 10, ymin: 0, ymax: 6, xlabel: 'yoʻl', ylabel: 'balandlik' },
        { t: 'curve', axes: 'h', points: [[0, 0.4], [2, 0.8], [4, 2.2], [6, 4.3], [8, 5.4], [10, 5.7]], color: 'green' },
        { t: 'dot', axes: 'h', x: 1, y: 0.6, label: 'yotiq', color: 'blue' },
        { t: 'dot', axes: 'h', x: 5, y: 3.25, label: 'tik', color: 'red' },
        { t: 'dot', axes: 'h', x: 9, y: 5.6, label: 'yotiq', color: 'blue' },
        { t: 'text', x: 30, y: 64, text: 'Har bir nuqtada tiklik har xil', size: 's', color: 'purple' }
      ],
      next: 'Qanday oʻlchanadi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻtgan darsni eslaymiz. y teng x kvadrat grafigida A va B nuqtalarni olamiz. Ular orqali oʻtgan AB toʻgʻri chiziq kesuvchi deyiladi. B nuqta egri chiziq boʻylab A ga yaqinlashsa, kesuvchi A nuqtadagi urinmaga intiladi. Kesuvchining burchak koeffitsiyenti ham urinmaning burchak koeffitsiyentiga yaqinlashadi.",
      easy: "Kesuvchi grafikni ikki nuqtada kesib oʻtadi. B nuqtani A tomon surib boramiz. Oxirida chiziq grafikka faqat A nuqtada tegib turadi — bu urinma.",
      draw: [
        { t: 'title', text: 'Kesuvchi va urinma' },
        { t: 'axes', id: 'p', x: 6, y: 14, w: 48, h: 50, xmin: -1, xmax: 3.5, ymin: -1, ymax: 10, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'p', points: X2, color: 'red' },
        { t: 'dot', axes: 'p', id: 'A', x: 1, y: 1, label: 'A', color: 'ink' },
        { t: 'dot', axes: 'p', id: 'B', x: 2.5, y: 6.25, label: 'B', color: 'blue' },
        { t: 'line', from: 'A', to: 'B', color: 'blue' },
        { t: 'curve', axes: 'p', points: [[-0.5, -2], [3.5, 6]], color: 'green' },
        { t: 'text', x: 58, y: 22, text: 'AB — kesuvchi', color: 'blue' },
        { t: 'text', x: 58, y: 31, text: 'B → A boʻlsa:', size: 's' },
        { t: 'text', x: 58, y: 38, text: 'kesuvchi → urinma', size: 's' },
        { t: 'text', x: 58, y: 47, text: 'k(AB) → k(urinma)', size: 's', color: 'purple' },
        { t: 'text', x: 58, y: 60, text: 'urinma', color: 'green' }
      ],
      next: 'Koeffitsiyentichi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Darslikdagi birinchi misol: y teng x kvadrat grafigiga A(1; 1) nuqtada urinma oʻtkazamiz. Grafikdagi ixtiyoriy B nuqta (x; x kvadrat) boʻlsin. AB ning burchak koeffitsiyenti: x kvadrat minus 1, boʻlingan x minus 1 ga. Suratni koʻpaytuvchilarga ajratamiz va qisqartiramiz: x plyus 1 qoladi. x 1 ga intilganda bu 2 ga intiladi. Demak, urinmaning burchak koeffitsiyenti 2.",
      easy: "AB qiyaligi x plyus 1 ga teng chiqdi. B nuqta A ga yaqinlashsa, x ham 1 ga yaqinlashadi. 1 plyus 1 — 2. Urinmaning qiyaligi 2.",
      draw: [
        { t: 'title', text: 'A(1; 1) dagi urinma' },
        { t: 'text', x: 6, y: 21, text: 'B(x; x²) — grafikdagi nuqta', size: 's' },
        { t: 'formula', x: 8, y: 32, text: 'k = (x² − 1) / (x − 1)' },
        { t: 'formula', x: 8, y: 44, text: '= (x − 1)(x + 1) / (x − 1)' },
        { t: 'formula', x: 8, y: 56, text: '= x + 1' },
        { t: 'box', id: 'k2', x: 56, y: 50, w: 38, h: 13, text: 'x → 1 da k → 1 + 1 = 2', color: 'green' }
      ],
      next: 'Har qanday nuqtada-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi istalgan funksiya va istalgan nuqtani olamiz. A nuqta (x; f(x)), B nuqta (x plyus h; f(x plyus h)). AB kesuvchining burchak koeffitsiyenti — ayirmali nisbat: f(x plyus h) minus f(x), boʻlingan h ga. h nolga intilsa, B nuqta A ga yaqinlashadi va kesuvchi urinmaga aylanadi.",
      easy: "h — A dan B gacha boʻlgan qadam. Qadamni kichraytirib boramiz. Qadam nolga yaqinlashganda kesuvchi urinmaga aylanadi va uning qiyaligi urinmaning qiyaligiga teng boʻladi.",
      draw: [
        { t: 'title', text: 'Istalgan nuqtada' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 46, h: 50, xmin: 0, xmax: 4, ymin: 0, ymax: 7.5, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: [[0, 0.6], [0.5, 0.7], [1, 1], [1.5, 1.5], [2, 2.2], [2.5, 3.1], [3, 4.2], [3.5, 5.5], [4, 7]], color: 'red' },
        { t: 'dot', axes: 'g', id: 'A', x: 1.2, y: 1.176, label: 'A', color: 'ink' },
        { t: 'dot', axes: 'g', id: 'B', x: 3, y: 4.2, label: 'B', color: 'blue' },
        { t: 'line', from: 'A', to: 'B', color: 'blue' },
        { t: 'curve', axes: 'g', points: [[0, 0.024], [4, 3.864]], color: 'green', dashed: true },
        { t: 'text', x: 58, y: 20, text: 'A(x; f(x))', size: 's' },
        { t: 'text', x: 58, y: 27, text: 'B(x + h; f(x + h))', size: 's' },
        { t: 'text', x: 58, y: 37, text: 'AB qiyaligi:', size: 's', color: 'blue' },
        { t: 'text', x: 58, y: 44, text: '(f(x + h) − f(x)) / h', size: 's' },
        { t: 'text', x: 58, y: 56, text: 'h → 0 da B → A', size: 's', color: 'purple' },
        { t: 'text', x: 58, y: 63, text: 'kesuvchi → urinma', size: 's', color: 'green' }
      ],
      next: 'Demak, limit!'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Mana shu limit yangi funksiyani beradi. Uni f(x) funksiyaning hosilasi deymiz va f shtrix x deb belgilaymiz. Boshqa belgilash ham bor: dy boʻlingan dx ga. Hosilani topish amali differensiallash deyiladi. Hosilaning x nuqtadagi qiymati shu nuqtadagi urinmaning burchak koeffitsiyentiga teng. Bu hosilaning geometrik maʼnosi.",
      easy: "Hosila — qadam nolga intilgandagi qiyalik. Uni f shtrix x deb yozamiz. Hosila har bir nuqtada grafik qanchalik tik ekanini aytib beradi.",
      draw: [
        { t: 'title', text: 'Hosila taʼrifi' },
        { t: 'box', id: 'd', x: 5, y: 15, w: 90, h: 12, text: 'y = f(x) funksiyaning hosilasi — h → 0 da ayirmali nisbatning limiti', color: 'purple' },
        { t: 'formula', x: 7, y: 38, text: 'f′(x) = lim (f(x + h) − f(x)) / h' },
        { t: 'text', x: 25, y: 44, text: 'h → 0', size: 's' },
        { t: 'text', x: 6, y: 54, text: 'Belgilash: f′(x) yoki dy/dx' },
        { t: 'text', x: 6, y: 62, text: 'Hosilani topish — differensiallash', size: 's', color: 'purple' }
      ],
      next: 'Geometrik maʼno!'
    },
    {
      kind: 'example',
      clear: true,
      say: "Birga yechamiz: f(x) teng x kvadrat funksiyaning hosilasini taʼrif boʻyicha topamiz. Orttirma: x plyus h ning kvadrati minus x kvadrat, bu 2 x h plyus h kvadrat. Uni h ga boʻlamiz: 2x plyus h. h nolga intilganda 2x qoladi. Demak, x kvadratning hosilasi 2x. x teng 1 da urinmaning qiyaligi 2 — oldingi misoldagidek. x teng 3 da esa 6.",
      easy: "Uch qadam: orttirmani topamiz, h ga boʻlamiz, h oʻrniga nol qoʻyamiz. Javob: 2x. Shu formula har bir nuqtadagi qiyalikni beradi.",
      draw: [
        { t: 'title', text: 'Misol: (x²)′ = ?' },
        { t: 'list', x: 6, y: 22, items: ['(x + h)² − x² = 2xh + h²', '(2xh + h²) / h = 2x + h', 'h → 0:  f′(x) = 2x'] },
        { t: 'box', id: 'r', x: 6, y: 44, w: 44, h: 11, text: '(x²)′ = 2x', color: 'green' },
        { t: 'text', x: 58, y: 47, text: 'x = 1 → k = 2', size: 's' },
        { t: 'text', x: 58, y: 54, text: 'x = 3 → k = 6', size: 's' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'B nuqta A ga yaqinlashganda AB kesuvchi A nuqtadagi urinmaga, uning burchak koeffitsiyenti esa urinmanikiga intiladi.',
    'Hosila: f′(x) = lim (h→0) (f(x + h) − f(x)) / h. Belgilash: f′(x) yoki dy/dx.',
    'Hosilani topish amali differensiallash deyiladi.',
    'Geometrik maʼnosi: f′(x₀) — x₀ nuqtadagi urinmaning burchak koeffitsiyenti.',
    '(x²)′ = 2x.'
  ],
  questions: [
    {
      id: 'm5q1',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Hosilani topish amalining nomini va hosilaning geometrik maʼnosini eslang.',
      explanation: 'Hosilani topish — differensiallash. f′(x₀) — x₀ nuqtadagi urinmaning burchak koeffitsiyenti.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Hosilani topish amali ' }, { blank: 'differensiallash' }, { text: ' deyiladi. f′(x₀) — x₀ nuqtadagi ' }, { blank: 'urinma' }, { text: 'ning burchak koeffitsiyenti.' }],
          bank: ['differensiallash', 'urinma', 'kesuvchi', 'limit']
        }
      }
    },
    {
      id: 'm5q2',
      prompt: 'f(x) = x². Grafikning A(3; 9) nuqtasiga oʻtkazilgan urinmaning burchak koeffitsiyenti nechaga teng?',
      hint: 'f′(x) = 2x formulasiga x = 3 ni qoʻying.',
      explanation: 'f′(3) = 2 · 3 = 6.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'm5q3',
      prompt: 'Grafikning qaysi nuqtasida urinma gorizontal (burchak koeffitsiyenti 0)? Oʻsha nuqtani bosing.',
      hint: 'Gorizontal urinma — tepalikning eng baland joyida.',
      explanation: 'Eng yuqori nuqta (2; 4) da grafik na koʻtariladi, na tushadi — urinma gorizontal, f′(2) = 0.',
      widget: {
        type: 'graph_tap',
        props: { target: [2, 4], radius: 0.5, graph: { xmin: -0.5, xmax: 4.5, ymin: -1, ymax: 5, xlabel: 'x', ylabel: 'y', curves: [{ points: HILL }] } }
      }
    },
    {
      id: 'm5q4',
      prompt: 'f(x) = x². A(1; 1) va B(4; 16) nuqtalardan oʻtgan kesuvchining burchak koeffitsiyenti nechaga teng?',
      hint: 'Burchak koeffitsiyenti = (y₂ − y₁) / (x₂ − x₁).',
      explanation: '(16 − 1) / (4 − 1) = 15 / 3 = 5. Bu urinmaniki (2) dan katta: B hali A dan uzoqda.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'm5q5',
      prompt: 'Taʼrif boʻyicha: f(x) = 3x² uchun ayirmali nisbatni soddalashtiring. (f(x + h) − f(x)) / h = ?',
      hint: '3(x + h)² − 3x² = 6xh + 3h². Endi h ga boʻling.',
      explanation: '3(x + h)² − 3x² = 6xh + 3h²; h ga boʻlsak, 6x + 3h.',
      widget: { type: 'expression_answer', props: { answer: '6*x + 3*h', vars: ['x', 'h'], noFraction: true, prefix: '=', keys: ['x', 'h', '²', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'm5q6',
      prompt: 'Oldingi savol davomi: h → 0 da limitni toping. f(x) = 3x² boʻlsa, f′(x) = ?',
      hint: '6x + 3h ifodada h oʻrniga 0 qoʻying.',
      explanation: 'h → 0 da 6x + 3h → 6x. Demak, (3x²)′ = 6x.',
      widget: { type: 'expression_answer', props: { answer: '6*x', prefix: 'f′(x) =' } }
    },
    {
      id: 'm5q7',
      prompt: 'Qaysi rasmda A(1; 1) nuqtadagi urinma toʻgʻri chizilgan?',
      hint: 'Urinma grafikka A nuqtada faqat tegib oʻtadi va uning qiyaligi f′(1) = 2.',
      explanation: 'a) y = 2x − 1 — urinma (qiyaligi 2). b) grafikni ikkinchi marta kesadi — bu kesuvchi. c) va d) qiyaliklari 0 va −2, ular grafikni kesib oʻtadi.',
      widget: {
        type: 'graph_choose',
        props: {
          answer: 'a',
          graphs: [
            { id: 'a', graph: { xmin: -1, xmax: 3, ymin: -3, ymax: 9, curves: [{ points: X2 }, { points: [[-0.5, -2], [3, 5]], color: '#16a34a' }], dots: [[1, 1]] } },
            { id: 'b', graph: { xmin: -1, xmax: 3, ymin: -3, ymax: 9, curves: [{ points: X2 }, { points: [[-0.33, -3], [3, 7]], color: '#16a34a' }], dots: [[1, 1]] } },
            { id: 'c', graph: { xmin: -1, xmax: 3, ymin: -3, ymax: 9, curves: [{ points: X2 }, { points: [[-1, 1], [3, 1]], color: '#16a34a' }], dots: [[1, 1]] } },
            { id: 'd', graph: { xmin: -1, xmax: 3, ymin: -3, ymax: 9, curves: [{ points: X2 }, { points: [[-1, 5], [3, -3]], color: '#16a34a' }], dots: [[1, 1]] } }
          ]
        }
      }
    },
    {
      id: 'm5q8',
      prompt: 'Taʼrif boʻyicha hosila topish bosqichlarini toʻgʻri tartibda bosing.',
      hint: 'Avval funksiyaning yangi qiymatini yozing.',
      explanation: 'f(x + h) → orttirma f(x + h) − f(x) → h ga boʻlish → h → 0 da limit.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['f(x + h) ni yozing', 'f(x + h) − f(x) orttirmani soddalashtiring', 'Orttirmani h ga boʻling', 'h → 0 da limitni toping']
        }
      }
    },
    {
      id: 'm5q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Taʼrif va (x²)′ = 2x formulasini eslang.',
      explanation: 'Kesuvchi grafikni ikki nuqtada kesadi. Hosila — ayirmali nisbatning limiti. (x²)′ = 2x, x emas. f′(x₀) — urinmaning burchak koeffitsiyenti.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kesuvchi grafikni ikki nuqtada kesib oʻtadi.', value: true },
            { text: 'Hosila — h → 0 dagi ayirmali nisbatning limiti.', value: true },
            { text: '(x²)′ = x', value: false },
            { text: 'f′(x₀) — x₀ nuqtadagi urinmaning burchak koeffitsiyenti.', value: true }
          ]
        }
      }
    }
  ]
};
