import type { BoardLesson } from './types';

const X2: [number, number][] = [[-2.5, 6.25], [-2, 4], [-1.5, 2.25], [-1, 1], [-0.5, 0.25], [0, 0], [0.5, 0.25], [1, 1], [1.5, 2.25], [2, 4], [2.5, 6.25], [3, 9]];

/** Darslik: 13–14-mavzu (35–37-betlar) — berilgan chiziqqa parallel urinma, normal tenglamasi. */
export const MATH_11: BoardLesson = {
  n: 11,
  label: "14",
  part: 'algebra',
  title: "Parallel urinma va normal tenglamasini oʻrganish",
  section: '13–14',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Velosiped gʻildiragiga qarang. Yer gʻildirakka faqat bitta nuqtada tegib turadi — yer chizigʻi gʻildirakka urinma. Shu nuqtaga tushgan kegay esa yerga perpendikulyar. Urinmaga perpendikulyar boʻlgan bunday chiziq normal deyiladi. Bugun ikki narsani oʻrganamiz: berilgan chiziqqa parallel urinmani topish va normal tenglamasini yozish.",
      easy: "Yer — gʻildirakka urinma, pastki kegay — normal. Ular bir-biriga 90 gradus ostida turadi.",
      draw: [
        { t: 'title', text: 'Gʻildirak va yer' },
        { t: 'point', id: 'O', x: 30, y: 38 },
        { t: 'circle', id: 'c', center: 'O', r: 18, color: 'ink' },
        { t: 'pointOn', id: 'B', circle: 'c', angle: 270 },
        { t: 'pointOn', id: 'S1', circle: 'c', angle: 30 },
        { t: 'pointOn', id: 'S2', circle: 'c', angle: 150 },
        { t: 'line', from: 'O', to: 'S1', color: 'ink' },
        { t: 'line', from: 'O', to: 'S2', color: 'ink' },
        { t: 'line', from: 'O', to: 'B', color: 'blue' },
        { t: 'point', id: 'G1', x: 6, y: 56 },
        { t: 'point', id: 'G2', x: 56, y: 56 },
        { t: 'line', from: 'G1', to: 'G2', color: 'green' },
        { t: 'text', x: 62, y: 26, text: 'Yer — urinma', color: 'green' },
        { t: 'text', x: 62, y: 36, text: 'Kegay — normal', color: 'blue' },
        { t: 'text', x: 62, y: 48, text: 'Ular perpendikulyar:', size: 's' },
        { t: 'text', x: 62, y: 55, text: '90°', color: 'purple' }
      ],
      next: 'Avval parallel urinma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Parallel toʻgʻri chiziqlarning burchak koeffitsiyentlari teng. Demak, urinma y teng kx plyus b toʻgʻri chiziqqa parallel boʻlsa, f shtrix x nol teng k boʻladi. Shu tenglamadan urinish nuqtasining abssissasini, yaʼni x nol ni topamiz.",
      easy: "Parallel chiziqlar bir xil qiyalikda yotadi. Shuning uchun hosilani berilgan chiziqning qiyaligiga tenglaymiz va x nol ni topamiz.",
      draw: [
        { t: 'title', text: 'Parallel urinma' },
        { t: 'axes', id: 'a', x: 6, y: 14, w: 48, h: 52, xmin: -0.5, xmax: 4.5, ymin: -1.5, ymax: 8, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'a', points: [[-0.5, 5.75], [0, 4], [1, 2], [1.5, 1.75], [2, 2], [2.5, 2.75], [3, 4], [4, 8]], color: 'red' },
        { t: 'curve', axes: 'a', points: [[0, -1], [4, 7]], color: 'blue' },
        { t: 'curve', axes: 'a', points: [[1, -0.25], [4, 5.75]], color: 'green' },
        { t: 'dot', axes: 'a', x: 2.5, y: 2.75, color: 'ink' },
        { t: 'text', x: 58, y: 22, text: 'Parallel chiziqlar —', size: 's' },
        { t: 'text', x: 58, y: 29, text: 'bir xil qiyalik', size: 's' },
        { t: 'formula', x: 60, y: 42, text: 'f′(x₀) = k' },
        { t: 'text', x: 58, y: 55, text: 'koʻk: y = 2x − 1', size: 's', color: 'blue' },
        { t: 'text', x: 58, y: 62, text: 'yashil: urinma', size: 's', color: 'green' }
      ],
      next: 'Misolda-chi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi misol: f(x) teng x kvadrat minus 3x plyus 4 uchun y teng 2x minus 1 ga parallel urinmani topamiz. Hosila 2x minus 3. Uni 2 ga tenglaymiz: 2x nol minus 3 teng 2, bundan x nol teng 2,5. Funksiya qiymati: 6,25 minus 7,5 plyus 4, yaʼni 2,75. Urinma: y minus 2,75 teng 2 karra x minus 2,5, yaʼni y teng 2x minus 2,25.",
      easy: "Hosila 2 ga teng boʻladigan nuqtani topdik: x nol teng 2,5. Keyin oʻtgan darsdagi uch qadamni bajardik.",
      draw: [
        { t: 'title', text: 'Misol' },
        { t: 'text', x: 6, y: 20, text: 'f(x) = x² − 3x + 4,   y = 2x − 1 ga parallel' },
        { t: 'list', x: 6, y: 31, items: ['f′(x) = 2x − 3', '2x₀ − 3 = 2   →   x₀ = 2,5', 'f(2,5) = 6,25 − 7,5 + 4 = 2,75', 'y − 2,75 = 2(x − 2,5)'] },
        { t: 'box', id: 'r', x: 6, y: 58, w: 44, h: 10, text: 'y = 2x − 2,25', color: 'green' }
      ],
      next: 'Endi normal!'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Urinish nuqtasida urinmaga perpendikulyar boʻlgan toʻgʻri chiziq normal deyiladi. Perpendikulyar chiziqlar burchak koeffitsiyentlarining koʻpaytmasi minus 1 ga teng. Urinmaniki f shtrix x nol boʻlsa, normalniki minus 1 boʻlingan f shtrix x nol ga. Shundan normal tenglamasi kelib chiqadi.",
      easy: "Normal urinmaga tik turadi. Uning qiyaligi urinma qiyaligining teskarisi, ishorasi ham teskari: 2 boʻlsa, normalniki minus yarim.",
      draw: [
        { t: 'title', text: 'Normal' },
        { t: 'axes', id: 'a', x: 6, y: 14, w: 42, h: 38, xmin: -1.5, xmax: 3, ymin: -1, ymax: 6, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'a', points: X2.slice(2, 11), color: 'red' },
        { t: 'dot', axes: 'a', x: 1, y: 1, label: 'A', color: 'ink' },
        { t: 'curve', axes: 'a', points: [[-0.5, -2], [3, 5]], color: 'green' },
        { t: 'curve', axes: 'a', points: [[-1.5, 2.25], [3, 0]], color: 'blue' },
        { t: 'text', x: 54, y: 20, text: 'urinma: k = 2', color: 'green' },
        { t: 'text', x: 54, y: 29, text: 'normal: k = −1/2', color: 'blue' },
        { t: 'text', x: 54, y: 39, text: '2 · (−1/2) = −1', color: 'purple' },
        { t: 'text', x: 54, y: 47, text: 'perpendikulyar!', size: 's' },
        { t: 'formula', x: 8, y: 62, text: 'y − f(x₀) = −1/f′(x₀) · (x − x₀)' }
      ],
      next: 'Misol!'
    },
    {
      kind: 'example',
      clear: true,
      say: "Misol: f(x) teng x ning beshinchi darajasi, x nol teng 1. Funksiya qiymati 1, hosila 5x toʻrtinchi daraja, x nol da 5. Normalning burchak koeffitsiyenti minus beshdan bir. Normal: y minus 1 teng minus beshdan bir karra x minus 1, yaʼni y teng minus x boʻlingan 5 plyus 6 boʻlingan 5. Shu nuqtadagi urinma esa y teng 5x minus 4. Tekshiramiz: 5 karra minus beshdan bir — minus 1. Toʻgʻri!",
      easy: "Urinmaning qiyaligi 5. Normalniki — minus beshdan bir. Nuqta (1; 1). Shu ikki maʼlumotdan normal tenglamasini yozamiz.",
      draw: [
        { t: 'title', text: 'Misol' },
        { t: 'text', x: 6, y: 20, text: 'f(x) = x⁵,   x₀ = 1' },
        { t: 'list', x: 6, y: 31, items: ['f(1) = 1,   f′(x) = 5x⁴,   f′(1) = 5', 'Normal: y − 1 = −(1/5)(x − 1)', 'y = −x/5 + 6/5'] },
        { t: 'text', x: 6, y: 58, text: 'Urinma: y = 5x − 4;   5 · (−1/5) = −1 ✓', size: 's', color: 'green' }
      ],
      next: 'Qiziq-ku!'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Darslikdagi qiziq fakt: y teng x kvadrat parabolaga x nol nuqtada oʻtkazilgan urinma Ox oʻqini aynan x nol ning yarmida kesadi. Masalan, x nol teng 2 boʻlsa, urinma (1; 0) nuqtadan oʻtadi. Shuning uchun parabolaga urinmani chizish juda oson: A nuqtani x nol ning yarmi bilan tutashtirsangiz boʻldi.",
      easy: "y teng x kvadrat uchun urinma Ox ni x nol ning yarmida kesadi. A(2; 4) uchun bu (1; 0) nuqta. Ikki nuqtani tutashtirsak — urinma tayyor.",
      draw: [
        { t: 'title', text: 'Urinmani chizish siri' },
        { t: 'axes', id: 'a', x: 6, y: 14, w: 46, h: 52, xmin: -1, xmax: 3, ymin: -1, ymax: 9, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'a', points: X2.slice(3), color: 'red' },
        { t: 'curve', axes: 'a', points: [[0.75, -1], [2.5, 6]], color: 'green' },
        { t: 'dot', axes: 'a', x: 2, y: 4, label: 'A(2; 4)', color: 'ink' },
        { t: 'dot', axes: 'a', x: 1, y: 0, label: '(1; 0)', color: 'orange' },
        { t: 'text', x: 58, y: 22, text: 'y = x² uchun:', size: 's' },
        { t: 'text', x: 58, y: 29, text: 'urinma Ox ni x₀/2 da', size: 's' },
        { t: 'text', x: 58, y: 36, text: 'kesib oʻtadi', size: 's' },
        { t: 'text', x: 58, y: 48, text: 'x₀ = 2  →  (1; 0)', color: 'orange' },
        { t: 'text', x: 58, y: 58, text: 'y = 4x − 4', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Urinma y = kx + b ga parallel boʻlsa: f′(x₀) = k.',
    'Normal — urinish nuqtasida urinmaga perpendikulyar toʻgʻri chiziq.',
    'Normal tenglamasi: y − f(x₀) = −1/f′(x₀) · (x − x₀).',
    'Urinma va normal burchak koeffitsiyentlarining koʻpaytmasi −1 ga teng.'
  ],
  questions: [
    {
      id: 'm11q1',
      prompt: 'f(x) = x² + 2x. Grafikning qaysi nuqtasida urinma y = 6x + 1 ga parallel? x₀ = ?',
      hint: 'f′(x) = 2x + 2. Uni 6 ga tenglang.',
      explanation: '2x₀ + 2 = 6 → x₀ = 2.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'm11q2',
      prompt: 'Oldingi savol davomi: f(x) = x² + 2x grafigiga x₀ = 2 da oʻtkazilgan urinma tenglamasi?',
      hint: 'f(2) = 8, burchak koeffitsiyenti 6.',
      explanation: 'y − 8 = 6(x − 2) → y = 6x − 4.',
      widget: { type: 'expression_answer', props: { answer: '6*x - 4', prefix: 'y =', keys: ['x', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'm11q3',
      prompt: 'Urinmaning burchak koeffitsiyenti 4 ga teng. Shu nuqtadagi normalning burchak koeffitsiyenti nechaga teng?',
      hint: 'Koʻpaytmasi −1 boʻlishi kerak.',
      explanation: '4 · k = −1 → k = −1/4 = −0,25.',
      widget: { type: 'number_answer', props: { answer: -0.25, tolerance: 0.0005 } }
    },
    {
      id: 'm11q4',
      prompt: 'f(x) = x² grafigiga x₀ = 1 nuqtada oʻtkazilgan normal tenglamasini yozing.',
      hint: 'f(1) = 1, f′(1) = 2, normalning qiyaligi −1/2.',
      explanation: 'y − 1 = −(1/2)(x − 1) → y = −x/2 + 3/2.',
      widget: { type: 'expression_answer', props: { answer: '-x/2 + 3/2', prefix: 'y =', keys: ['x', '(', ')', '/', '+', '−'] } }
    },
    {
      id: 'm11q5',
      prompt: 'Qaysi juftliklar perpendikulyar? Hammasini belgilang.',
      hint: 'Burchak koeffitsiyentlarini koʻpaytiring: −1 chiqishi kerak.',
      explanation: '2 · (−1/2), −4 · (1/4), 1 · (−1), (1/3) · (−3) — hammasi −1. 3 va 3 — parallel. 5 · (−5) = −25.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { text: 'y = 2x va y = −x/2', match: true },
            { text: 'y = 3x + 1 va y = 3x − 5', match: false },
            { text: 'y = −4x va y = x/4', match: true },
            { text: 'y = x va y = −x', match: true },
            { text: 'y = 5x va y = −5x', match: false },
            { text: 'y = x/3 + 2 va y = −3x', match: true }
          ]
        }
      }
    },
    {
      id: 'm11q6',
      prompt: 'Har bir toʻgʻri chiziqni qutisiga joylang: y = 2x + 1 ga parallelmi yoki perpendikulyarmi?',
      hint: 'Parallel — qiyalik 2. Perpendikulyar — qiyalik −1/2.',
      explanation: 'y = 2x − 7, y = 2x, y = 2x + 10 — parallel. y = −x/2 + 4, y = −0,5x, y = −x/2 — perpendikulyar.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'par', label: 'Parallel' },
            { id: 'perp', label: 'Perpendikulyar' }
          ],
          items: [
            { emoji: '', label: 'y = 2x − 7', bin: 'par' },
            { emoji: '', label: 'y = 2x', bin: 'par' },
            { emoji: '', label: 'y = 2x + 10', bin: 'par' },
            { emoji: '', label: 'y = −x/2 + 4', bin: 'perp' },
            { emoji: '', label: 'y = −0,5x', bin: 'perp' },
            { emoji: '', label: 'y = −x/2', bin: 'perp' }
          ]
        }
      }
    },
    {
      id: 'm11q7',
      prompt: 'y = x² grafigida urinma y = −2x toʻgʻri chiziqqa parallel boʻladigan nuqtani bosing.',
      hint: 'f′(x) = 2x = −2.',
      explanation: 'x = −1, y = 1. Bu nuqtada qiyalik −2.',
      widget: {
        type: 'graph_tap',
        props: { target: [-1, 1], radius: 0.4, graph: { xmin: -2.5, xmax: 2.5, ymin: -1, ymax: 6.5, xlabel: 'x', ylabel: 'y', curves: [{ points: X2.slice(0, 11) }, { points: [[-2.5, 5], [0.5, -1]], color: '#2563eb', dashed: true }] } }
      }
    },
    {
      id: 'm11q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Normal urinmaga perpendikulyar; y = x² urinmasi Ox ni x₀/2 da kesadi.',
      explanation: 'Parallel chiziqlarda qiyaliklar teng. Normal urinmaga perpendikulyar, parallel emas. f′(x₀) = 5 → normal qiyaligi −1/5. x₀ = 4 → 4/2 = 2.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Parallel toʻgʻri chiziqlarning burchak koeffitsiyentlari teng.', value: true },
            { text: 'Normal urinmaga parallel boʻladi.', value: false },
            { text: 'f′(x₀) = 5 boʻlsa, normalning burchak koeffitsiyenti −1/5.', value: true },
            { text: 'y = x² ga x₀ = 4 da oʻtkazilgan urinma Ox ni x = 2 da kesadi.', value: true }
          ]
        }
      }
    }
  ]
};
