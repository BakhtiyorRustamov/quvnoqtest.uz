import type { BoardLesson } from './types';

const X2: [number, number][] = [[-1, 1], [-0.5, 0.25], [0, 0], [0.5, 0.25], [1, 1], [1.5, 2.25], [2, 4], [2.5, 6.25], [3, 9]];

/** Darslik: 13–14-mavzu (34–36-betlar) — funksiya grafigiga oʻtkazilgan urinma tenglamasi. */
export const MATH_10: BoardLesson = {
  n: 10,
  label: "13",
  part: 'algebra',
  title: "Grafikka urinma oʻtkazish va uning tenglamasi",
  section: '13–14',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Qishda muz qoplagan yoʻlda burilayotgan mashina sirpanib ketsa, u burilish boʻylab emas, toʻgʻriga ketadi — aynan oʻsha nuqtadagi urinma boʻylab. Bu chiziqni oldindan bilish haydovchi uchun juda muhim. Bugun urinma toʻgʻri chiziqning tenglamasini yozishni oʻrganamiz.",
      easy: "Sirpangan mashina burilmaydi, toʻgʻri ketadi. U ketadigan yoʻl — yoʻl egriligiga oʻsha joyda urinib oʻtgan toʻgʻri chiziq. Uning tenglamasini topamiz.",
      draw: [
        { t: 'title', text: 'Mashina qayerga ketadi?' },
        { t: 'icon', x: 14, y: 30, emoji: '🚗', size: 'l' },
        { t: 'axes', id: 'r', x: 34, y: 15, w: 58, h: 46, xmin: -1, xmax: 7, ymin: 0, ymax: 8, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'r', points: [[-1, 0.15], [0, 0], [1, 0.15], [2, 0.6], [3, 1.35], [4, 2.4], [5, 3.75], [6, 5.4], [7, 7.35]], color: 'ink' },
        { t: 'dot', axes: 'r', x: 4, y: 2.4, label: 'M', color: 'red' },
        { t: 'curve', axes: 'r', points: [[2, 0], [7, 6]], color: 'blue', dashed: true },
        { t: 'text', x: 6, y: 47, text: 'Sirpanchiq yoʻl:', size: 's' },
        { t: 'text', x: 6, y: 54, text: 'mashina urinma', size: 's', color: 'blue' },
        { t: 'text', x: 6, y: 61, text: 'boʻylab ketadi', size: 's', color: 'blue' }
      ],
      next: 'Tenglamasi qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Urinma — toʻgʻri chiziq, uning tenglamasi y teng kx plyus b. Hosilaning geometrik maʼnosiga koʻra burchak koeffitsiyent k teng f shtrix x nol. Urinma (x nol; f(x nol)) nuqtadan oʻtadi, shundan b ni topamiz: b teng f(x nol) minus f shtrix x nol karra x nol. Natijada urinma tenglamasi: y minus f(x nol) teng f shtrix x nol karra x minus x nol.",
      easy: "Toʻgʻri chiziq uchun ikki narsa kerak: qiyaligi va bitta nuqtasi. Qiyalik — hosila f shtrix x nol. Nuqta — grafikdagi (x nol; f(x nol)). Ikkalasini birlashtirsak, urinma tenglamasi chiqadi.",
      draw: [
        { t: 'title', text: 'Urinma tenglamasi' },
        { t: 'text', x: 6, y: 20, text: 'Urinma — toʻgʻri chiziq:  y = kx + b' },
        { t: 'text', x: 6, y: 28, text: 'Geometrik maʼno:  k = f′(x₀)', color: 'blue' },
        { t: 'text', x: 6, y: 36, text: 'Nuqta (x₀; f(x₀)) dan oʻtadi:', size: 's' },
        { t: 'formula', x: 8, y: 45, text: 'b = f(x₀) − f′(x₀) · x₀' },
        { t: 'formula', x: 8, y: 60, text: 'y − f(x₀) = f′(x₀)(x − x₀)' },
        { t: 'text', x: 76, y: 60, text: '(1)', color: 'green' }
      ],
      next: 'Uchta son kerak ekan'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Demak, urinma tenglamasini yozish uchun uchta ish qilamiz. Birinchi: funksiyaning x nol nuqtadagi qiymatini topamiz. Ikkinchi: hosilani va uning x nol dagi qiymatini topamiz. Uchinchi: topilganlarni formulaga qoʻyib, soddalashtiramiz.",
      easy: "Uch qadam: f(x nol), keyin f shtrix x nol, keyin formulaga qoʻyish. Har doim shu tartibda.",
      draw: [
        { t: 'title', text: 'Uch qadam' },
        { t: 'list', x: 6, y: 24, items: ['1) f(x₀) ni toping', '2) f′(x₀) ni toping', '3) formulaga qoʻying'] },
        { t: 'axes', id: 'g', x: 54, y: 16, w: 40, h: 40, xmin: 0, xmax: 4, ymin: 0, ymax: 6 },
        { t: 'curve', axes: 'g', points: [[0, 0.5], [1, 0.8], [2, 1.7], [3, 3.2], [4, 5.3]], color: 'red' },
        { t: 'dot', axes: 'g', x: 2.5, y: 2.375, label: 'M', color: 'ink' },
        { t: 'curve', axes: 'g', points: [[1, 0.125], [4, 4.625]], color: 'green' },
        { t: 'text', x: 56, y: 64, text: 'M(x₀; f(x₀))', size: 's' },
        { t: 'box', id: 'b', x: 6, y: 50, w: 42, h: 11, text: 'Har doim shu tartibda!', color: 'orange' }
      ],
      next: 'Misolda koʻraylik'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi birinchi misol: f(x) teng x kvadrat minus 5x, x nol teng 2. Funksiya qiymati: 4 minus 10, yaʼni minus 6. Hosila 2x minus 5, x nol da u minus 1. Formulaga qoʻyamiz: y plyus 6 teng minus 1 karra x minus 2. Soddalashtirsak: y teng minus x minus 4.",
      easy: "f(2) teng minus 6, f shtrix 2 teng minus 1. Bularni formulaga qoʻysak va qavsni ochsak, y teng minus x minus 4 chiqadi.",
      draw: [
        { t: 'title', text: '1-misol' },
        { t: 'text', x: 6, y: 20, text: 'f(x) = x² − 5x,   x₀ = 2' },
        { t: 'list', x: 6, y: 30, items: ['f(2) = 4 − 10 = −6', 'f′(x) = 2x − 5,  f′(2) = −1', 'y + 6 = −1 · (x − 2)'] },
        { t: 'box', id: 'r', x: 6, y: 52, w: 36, h: 10, text: 'y = −x − 4', color: 'green' },
        { t: 'axes', id: 'p', x: 60, y: 14, w: 36, h: 52, xmin: -1, xmax: 6, ymin: -10, ymax: 6 },
        { t: 'curve', axes: 'p', points: [[-1, 6], [0, 0], [1, -4], [2, -6], [2.5, -6.25], [3, -6], [4, -4], [5, 0], [6, 6]], color: 'red' },
        { t: 'dot', axes: 'p', x: 2, y: -6, color: 'ink' },
        { t: 'curve', axes: 'p', points: [[-1, -3], [6, -10]], color: 'green' }
      ],
      next: 'Yana bittasi!'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ikkinchi misol: f(x) teng x kub minus 2x kvadrat, x nol teng 1. Funksiya qiymati: 1 minus 2, yaʼni minus 1. Hosila 3x kvadrat minus 4x, x nol da 3 minus 4, yaʼni minus 1. Formulaga qoʻyamiz: y plyus 1 teng minus 1 karra x minus 1. Natija: y teng minus x. Qiziq, bu urinma koordinatalar boshidan oʻtadi!",
      easy: "f(1) teng minus 1, f shtrix 1 teng minus 1. Formulaga qoʻysak, y teng minus x qoladi.",
      draw: [
        { t: 'title', text: '2-misol' },
        { t: 'text', x: 6, y: 20, text: 'f(x) = x³ − 2x²,   x₀ = 1' },
        { t: 'list', x: 6, y: 30, items: ['f(1) = 1 − 2 = −1', 'f′(x) = 3x² − 4x,  f′(1) = −1', 'y + 1 = −1 · (x − 1)'] },
        { t: 'box', id: 'r', x: 6, y: 52, w: 30, h: 10, text: 'y = −x', color: 'green' },
        { t: 'axes', id: 'p', x: 60, y: 14, w: 36, h: 52, xmin: -1, xmax: 2.5, ymin: -3, ymax: 3.2 },
        { t: 'curve', axes: 'p', points: [[-1, -3], [-0.5, -0.625], [0, 0], [0.5, -0.375], [1, -1], [1.33, -1.185], [2, 0], [2.5, 3.125]], color: 'red' },
        { t: 'dot', axes: 'p', x: 1, y: -1, color: 'ink' },
        { t: 'curve', axes: 'p', points: [[-1, 1], [2.5, -2.5]], color: 'green' }
      ],
      next: 'Burchak-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Urinmaning qiyaligi uning Ox oʻqi bilan hosil qilgan burchagini ham beradi: f shtrix x nol teng tangens alfa. Masalan, f(x) teng x kvadratning yarmi, x nol teng 1. Hosila x ga teng, x nol da 1. Tangens alfa teng 1 boʻlsa, alfa 45 gradus. Urinma tenglamasi esa y teng x minus 0,5.",
      easy: "Hosila qancha katta boʻlsa, urinma shuncha tik turadi. Hosila 1 ga teng boʻlsa, burchak roppa-rosa 45 gradus.",
      draw: [
        { t: 'title', text: 'Urinma va burchak' },
        { t: 'axes', id: 'a', x: 6, y: 14, w: 46, h: 50, xmin: -1, xmax: 3, ymin: -1, ymax: 4.5, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'a', points: [[-1, 0.5], [0, 0], [1, 0.5], [2, 2], [2.5, 3.125], [3, 4.5]], color: 'red' },
        { t: 'dot', axes: 'a', x: 1, y: 0.5, color: 'ink' },
        { t: 'curve', axes: 'a', points: [[-0.5, -1], [3, 2.5]], color: 'green' },
        { t: 'dot', axes: 'a', x: 0.5, y: 0, label: 'α', color: 'orange' },
        { t: 'formula', x: 58, y: 24, text: 'f′(x₀) = tg α' },
        { t: 'text', x: 58, y: 36, text: 'f(x) = x²/2,  x₀ = 1', size: 's' },
        { t: 'text', x: 58, y: 43, text: 'f′(1) = 1 = tg α', size: 's' },
        { t: 'text', x: 58, y: 50, text: 'α = 45°', color: 'orange' },
        { t: 'text', x: 58, y: 60, text: 'Urinma: y = x − 0,5', size: 's', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Urinma tenglamasi: y − f(x₀) = f′(x₀)(x − x₀).',
    'Uch qadam: f(x₀) ni, f′(x₀) ni topamiz, keyin formulaga qoʻyamiz.',
    'f′(x₀) = tg α, bunda α — urinma va Ox oʻqining musbat yoʻnalishi orasidagi burchak.'
  ],
  questions: [
    {
      id: 'm10q1',
      prompt: 'f(x) = x², x₀ = 3. Urinma tenglamasini yozing.',
      hint: 'f(3) = 9, f′(x) = 2x, f′(3) = 6. Keyin y − 9 = 6(x − 3).',
      explanation: 'y − 9 = 6(x − 3) → y = 6x − 9.',
      widget: { type: 'expression_answer', props: { answer: '6*x - 9', prefix: 'y =', keys: ['x', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'm10q2',
      prompt: 'f(x) = x³ − 2x² grafigiga x₀ = 2 nuqtada oʻtkazilgan urinmaning burchak koeffitsiyenti nechaga teng?',
      hint: 'f′(x) = 3x² − 4x. x = 2 ni qoʻying.',
      explanation: 'f′(2) = 12 − 8 = 4.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'm10q3',
      prompt: 'f(x) = 2x² − 5x + 1, x₀ = 1. Urinma tenglamasini yozish bosqichlarini toʻgʻri tartibda bosing.',
      hint: 'Avval funksiya qiymati, keyin hosila.',
      explanation: 'f(1) = −2 → f′(x) = 4x − 5 → f′(1) = −1 → y + 2 = −(x − 1), yaʼni y = −x − 1.',
      widget: {
        type: 'step_order',
        props: { steps: ['f(1) = 2 − 5 + 1 = −2', 'f′(x) = 4x − 5', 'f′(1) = −1', 'y + 2 = −(x − 1), yaʼni y = −x − 1'] }
      }
    },
    {
      id: 'm10q4',
      prompt: 'f(x) = x² − 4x, x₀ = 1. Urinma tenglamasini yozing.',
      hint: 'f(1) = −3, f′(1) = 2 · 1 − 4 = −2.',
      explanation: 'y + 3 = −2(x − 1) → y = −2x − 1.',
      widget: { type: 'expression_answer', props: { answer: '-2*x - 1', prefix: 'y =', keys: ['x', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'm10q5',
      prompt: 'y = 2x − 1 toʻgʻri chiziq y = x² parabolaga qaysi nuqtada urinadi? Oʻsha nuqtani bosing.',
      hint: 'Urinish nuqtasida parabolaning hosilasi 2 ga teng: 2x = 2.',
      explanation: 'x = 1, y = 1. Bu nuqtada f′(1) = 2 — chiziqning qiyaligi bilan bir xil.',
      widget: {
        type: 'graph_tap',
        props: { target: [1, 1], radius: 0.4, graph: { xmin: -2, xmax: 3, ymin: -2, ymax: 6, xlabel: 'x', ylabel: 'y', curves: [{ points: X2 }, { points: [[-0.5, -2], [3, 5]], color: '#16a34a' }] } }
      }
    },
    {
      id: 'm10q6',
      prompt: 'Har bir funksiyani uning x₀ = 0 nuqtadagi urinmasi bilan juftlang.',
      hint: 'f(0) va f′(0) ni toping: (sin x)′ = cos x, (cos x)′ = −sin x.',
      explanation: 'sin x: f(0) = 0, f′(0) = 1 → y = x. cos x: f(0) = 1, f′(0) = 0 → y = 1. x²: y = 0. Toʻgʻri chiziqning urinmasi — oʻzi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'sin x', right: 'y = x' },
            { left: 'cos x', right: 'y = 1' },
            { left: 'x²', right: 'y = 0' },
            { left: '3x − 4', right: 'y = 3x − 4' }
          ]
        }
      }
    },
    {
      id: 'm10q7',
      prompt: 'f(x) = x³/3 grafigiga x₀ = 1 nuqtada urinma oʻtkazildi. U Ox oʻqi bilan necha gradusli burchak hosil qiladi?',
      hint: 'f′(x) = x². tg α = f′(1).',
      explanation: 'f′(1) = 1 = tg α → α = 45°.',
      widget: { type: 'number_answer', props: { answer: 45, unit: '°' } }
    },
    {
      id: 'm10q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Urinmaning burchak koeffitsiyenti — hosila.',
      explanation: 'Urinma (x₀; f(x₀)) dan oʻtadi. Burchak koeffitsiyenti f′(x₀), f(x₀) emas. f′(x₀) = 0 da urinma gorizontal. (x⁵)′ = 5x⁴: f(1) = 1, f′(1) = 5 → y = 5x − 4.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Urinma (x₀; f(x₀)) nuqtadan oʻtadi.', value: true },
            { text: 'Urinmaning burchak koeffitsiyenti f(x₀) ga teng.', value: false },
            { text: 'f′(x₀) = 0 boʻlsa, urinma gorizontal boʻladi.', value: true },
            { text: 'f(x) = x⁵ grafigiga x₀ = 1 da oʻtkazilgan urinma: y = 5x − 4.', value: true }
          ]
        }
      }
    }
  ]
};
