import type { BoardLesson } from './types';

const PAR = (c: number): [number, number][] => [-2.4, -2, -1.6, -1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2, 1.6, 2, 2.4].map((x) => [x, Math.round((x * x / 2 + c) * 1000) / 1000]);
/** F(x) = x³/3 + 1 */
const X3: [number, number][] = [[-1.5, -0.125], [-1.1, 0.556], [-0.7, 0.886], [-0.3, 0.991], [0.1, 1], [0.5, 1.042], [0.9, 1.243], [1.3, 1.732], [1.7, 2.638], [2.1, 4.087], [2.5, 6.208], [2.9, 9.13], [3.2, 11.92]];

/** Darslik: 37–39-mavzu (79–82-betlar) — boshlangʻich funksiya. */
export const MATH_21: BoardLesson = {
  n: 21,
  label: "37–38",
  part: 'algebra',
  title: "Boshlangʻich funksiya bilan tanishuv",
  section: '37–39',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Taksining spidometri ishlayapti, lekin bosib oʻtilgan yoʻl hisoblagichi buzilgan. Haydovchi har lahzadagi tezlikni biladi. Shundan yoʻlni topa oladimi? Hosila yoʻldan tezlikni beradi. Bugun teskari ishni oʻrganamiz: tezlikdan yoʻlni, yaʼni hosiladan funksiyaning oʻzini topamiz.",
      easy: "Hosila yoʻldan tezlikni topadi. Bugun teskarisi: tezlik maʼlum, yoʻlni topamiz.",
      draw: [
        { t: 'title', text: 'Teskari masala' },
        { t: 'icon', x: 12, y: 30, emoji: '🚕', size: 'l' },
        { t: 'box', id: 's', x: 30, y: 22, w: 26, h: 12, text: 's(t) yoʻl', color: 'blue' },
        { t: 'box', id: 'v', x: 68, y: 22, w: 26, h: 12, text: 'v(t) tezlik', color: 'green' },
        { t: 'arrow', from: 's', to: 'v', label: 'hosila' },
        { t: 'box', id: 'q', x: 30, y: 46, w: 64, h: 12, text: 'v(t) maʼlum  →  s(t) = ?', color: 'orange' }
      ],
      next: 'Bu nima deyiladi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Taʼrif: agar oraliqdagi har bir x uchun F shtrix x teng f(x) boʻlsa, F(x) funksiya f(x) ning shu oraliqdagi boshlangʻich funksiyasi deyiladi. Masalan, v teng at boʻlsa, s teng at kvadrat boʻlinsin 2. x kvadratning boshlangʻich funksiyasi x kub boʻlinsin 3, chunki uning hosilasi x kvadrat. 1 boʻlinsin kosinus kvadrat x uchun — tangens x, 1 boʻlinsin x uchun — ln x.",
      easy: "Hosilasi f(x) ga teng boʻlgan funksiya F(x) — boshlangʻich funksiya. Hosilani teskari tomonga oʻqiymiz.",
      draw: [
        { t: 'title', text: 'Taʼrif' },
        { t: 'box', id: 'd', x: 6, y: 18, w: 88, h: 12, text: 'F′(x) = f(x)  →  F — boshlangʻich funksiya', color: 'blue' },
        {
          t: 'table',
          x: 14,
          y: 36,
          rows: [
            ['f(x)', 'F(x)'],
            ['at', 'at²/2'],
            ['x²', 'x³/3'],
            ['1/cos²x', 'tg x'],
            ['1/x  (x > 0)', 'ln x']
          ]
        }
      ],
      next: 'Bittami, koʻpmi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 1-masala: x toʻrtinchi daraja boʻlinsin 4, unga 17 qoʻshilgani va undan 25 ayirilgani — uchalasining hosilasi ham x kub. Chunki oʻzgarmas sonning hosilasi nolga teng. Demak, boshlangʻich funksiya bitta emas: F(x) plyus C koʻrinishidagi barcha funksiyalar, bu yerda C — ixtiyoriy oʻzgarmas son.",
      easy: "Oʻzgarmas sonning hosilasi nol. Shuning uchun F ga istalgan son qoʻshsak ham, u boshlangʻich funksiya boʻlib qoladi.",
      draw: [
        { t: 'title', text: 'Cheksiz koʻp!' },
        { t: 'list', x: 6, y: 20, items: ['(x⁴/4)′ = x³', '(x⁴/4 + 17)′ = x³', '(x⁴/4 − 25)′ = x³'] },
        { t: 'box', id: 'c', x: 6, y: 46, w: 62, h: 12, text: 'F(x) + C,  C — istalgan son', color: 'green' },
        { t: 'text', x: 72, y: 54, text: '(C)′ = 0', color: 'red' }
      ],
      next: 'Grafikda qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "y teng F(x) plyus C grafigi y teng F(x) grafigini Oy oʻqi boʻylab yuqoriga yoki pastga siljitishdan hosil boʻladi. Masalan, x boʻlinsin ikki kvadrat plyus C — bu bir xil parabolalar oilasi, faqat balandligi har xil. Har bir nuqtada ularning qiyaligi bir xil, chunki hosilasi bir xil — x.",
      easy: "C oʻzgarsa, grafik faqat yuqoriga yoki pastga suriladi. Shakli oʻzgarmaydi.",
      draw: [
        { t: 'title', text: 'Grafiklar oilasi' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 50, h: 52, xmin: -2.6, xmax: 2.6, ymin: -1.5, ymax: 5, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: PAR(-1), color: 'blue' },
        { t: 'curve', axes: 'g', points: PAR(0), color: 'green' },
        { t: 'curve', axes: 'g', points: PAR(1), color: 'orange' },
        { t: 'curve', axes: 'g', points: PAR(2), color: 'red' },
        { t: 'text', x: 60, y: 26, text: 'y = x²/2 + C' },
        { t: 'text', x: 60, y: 38, text: 'C = −1, 0, 1, 2', size: 's' },
        { t: 'text', x: 60, y: 50, text: 'Oy boʻylab siljiydi', size: 's', color: 'purple' }
      ],
      next: 'Bittasini qanday tanlaymiz?'
    },
    {
      kind: 'example',
      clear: true,
      say: "2-masala: f(x) teng x kvadrat funksiyaning grafigi A(3; 10) nuqtadan oʻtadigan boshlangʻich funksiyasini toping. Barcha boshlangʻich funksiyalar: x kub boʻlinsin 3 plyus C. x teng 3 da F teng 10 boʻlishi kerak: 9 plyus C teng 10, demak C teng 1. Javob: F(x) teng x kub boʻlinsin 3 plyus 1.",
      easy: "Nuqtaning koordinatalarini qoʻyamiz: 9 plyus C teng 10. C teng 1.",
      draw: [
        { t: 'title', text: '2-masala' },
        { t: 'list', x: 6, y: 20, items: ['f(x) = x²,  A(3; 10)', 'F(x) = x³/3 + C', 'F(3) = 9 + C = 10  →  C = 1'] },
        { t: 'box', id: 'r', x: 6, y: 50, w: 44, h: 11, text: 'F(x) = x³/3 + 1', color: 'green' },
        { t: 'axes', id: 'g', x: 60, y: 14, w: 36, h: 52, xmin: -1.6, xmax: 3.5, ymin: -1, ymax: 12, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: X3, color: 'red' },
        { t: 'dot', axes: 'g', x: 3, y: 10, label: 'A', color: 'blue' }
      ],
      next: 'Yana bittasi'
    },
    {
      kind: 'example',
      clear: true,
      say: "3-masala: f(x) teng kub ildiz x, grafik A(8; 15) nuqtadan oʻtsin. Barcha boshlangʻich funksiyalar: uchdan toʻrt karra x karra kub ildiz x plyus C. Tekshiramiz: hosilasi kub ildiz x. x teng 8 da: uchdan toʻrt karra 8 karra 2 teng 12, demak 12 plyus C teng 15, C teng 3.",
      easy: "F(8) teng 12 plyus C. U 15 ga teng boʻlishi uchun C teng 3.",
      draw: [
        { t: 'title', text: '3-masala' },
        { t: 'list', x: 6, y: 20, items: ['f(x) = ∛x,  A(8; 15)', 'F(x) = ¾·x·∛x + C', 'F(8) = ¾·8·2 + C = 12 + C', '12 + C = 15  →  C = 3'] },
        { t: 'box', id: 'r', x: 6, y: 52, w: 50, h: 11, text: 'F(x) = ¾·x·∛x + 3', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'F′(x) = f(x) boʻlsa, F(x) funksiya f(x) ning boshlangʻich funksiyasi.',
    'Boshlangʻich funksiyalar cheksiz koʻp: F(x) + C; grafiklari Oy boʻylab siljigan.',
    'Berilgan nuqtadan oʻtadiganini topish uchun nuqta koordinatalarini qoʻyib, C topiladi.'
  ],
  questions: [
    {
      id: 'm21q1',
      prompt: 'f(x) = 3x² funksiyaning boshlangʻich funksiyasini yozing (+ C yozish shart emas).',
      hint: 'Qaysi funksiyaning hosilasi 3x²?',
      explanation: '(x³)′ = 3x², demak F(x) = x³ + C.',
      widget: { type: 'expression_answer', props: { answer: 'x^3', prefix: 'F(x) =', plusC: true, keys: ['x', '²', '³', '+', '/', 'C'] } }
    },
    {
      id: 'm21q2',
      prompt: 'f(x) = cos x funksiyaning boshlangʻich funksiyasini yozing.',
      hint: 'Qaysi funksiyaning hosilasi cos x?',
      explanation: '(sin x)′ = cos x, demak F(x) = sin x + C.',
      widget: { type: 'expression_answer', props: { answer: 'sin(x)', prefix: 'F(x) =', plusC: true, keys: ['sin', 'cos', 'x', '−', '+', 'C'] } }
    },
    {
      id: 'm21q3',
      prompt: 'Qaysilari f(x) = 2x ning boshlangʻich funksiyasi? Hammasini belgilab, Tekshirish ni bosing.',
      hint: 'Har birining hosilasini toping.',
      explanation: 'x², x² + 7 va x² − 3 ning hosilasi 2x. 2 ning hosilasi 0, x² + x niki 2x + 1, 2x² niki 4x.',
      widget: {
        type: 'pick_many',
        props: { options: [{ label: 'x²', correct: true }, { label: 'x² + 7', correct: true }, { label: 'x² − 3', correct: true }, { label: '2' }, { label: 'x² + x' }, { label: '2x²' }] }
      }
    },
    {
      id: 'm21q4',
      prompt: 'f(x) = 2x funksiyaning grafigi A(1; 5) nuqtadan oʻtadigan boshlangʻich funksiyasi F(x) = x² + C. C ni toping.',
      hint: 'F(1) = 1 + C = 5.',
      explanation: '1 + C = 5 → C = 4.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'm21q5',
      prompt: 'Har bir funksiyaga uning boshlangʻich funksiyasini moslang.',
      hint: 'Oʻng tomondagining hosilasi chap tomondagiga teng boʻlishi kerak.',
      explanation: '(x⁴/4)′ = x³, (−cos x)′ = sin x, (eˣ)′ = eˣ, (ln x)′ = 1/x.',
      widget: {
        type: 'match_pairs',
        props: { pairs: [{ left: 'x³', right: 'x⁴/4' }, { left: 'sin x', right: '−cos x' }, { left: 'eˣ', right: 'eˣ' }, { left: '1/x', right: 'ln x' }] }
      }
    },
    {
      id: 'm21q6',
      prompt: 'f(x) = 2x + 3 funksiyaning A(1; 5) nuqtadan oʻtadigan boshlangʻich funksiyasi uchun F(2) ni toping.',
      hint: 'F(x) = x² + 3x + C, F(1) = 4 + C = 5.',
      explanation: 'C = 1, F(x) = x² + 3x + 1, F(2) = 4 + 6 + 1 = 11.',
      widget: { type: 'number_answer', props: { answer: 11 } }
    },
    {
      id: 'm21q7',
      prompt: 'Qaysi biri cos x ning boshlangʻich funksiyasi EMAS? Ortiqchasini bosing.',
      hint: 'Hosilasini oling.',
      explanation: '(−sin x)′ = −cos x. Qolganlarining hosilasi cos x.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'sin x' }, { text: 'sin x + 1' }, { text: 'sin x − 5' }, { text: '−sin x', odd: true }] } }
    },
    {
      id: 'm21q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oʻzgarmas sonning hosilasi nol.',
      explanation: 'Boshlangʻich funksiyalar cheksiz koʻp va bir-biridan oʻzgarmas songa farq qiladi; grafiklari Oy boʻylab siljigan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Funksiyaning boshlangʻich funksiyasi yagona.', value: false },
            { text: 'Ikki boshlangʻich funksiya oʻzgarmas songa farq qiladi.', value: true },
            { text: 'F(x) + C grafigi F(x) grafigini Oy boʻylab siljitishdan hosil boʻladi.', value: true },
            { text: 'Tezlik v(t) yoʻl s(t) ning boshlangʻich funksiyasi.', value: false }
          ]
        }
      }
    }
  ]
};
