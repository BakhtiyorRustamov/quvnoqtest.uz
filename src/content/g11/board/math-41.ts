import type { BoardLesson } from './types';

const PAR: [number, number][] = [[-3, 1], [-2.5, -0.75], [-2, -2], [-1.5, -2.75], [-1, -3], [-0.5, -2.75], [0, -2], [0.5, -0.75], [1, 1], [1.5, 3.25]];
const SQRT: [number, number][] = [[0, 0], [0.1, 0.316], [0.2, 0.447], [0.3, 0.548], [0.4, 0.632], [0.5, 0.707], [0.6, 0.775], [0.7, 0.837], [0.8, 0.894], [0.9, 0.949], [1, 1], [1.1, 1.049], [1.2, 1.095]];
const X2: [number, number][] = [[0, 0], [0.1, 0.01], [0.2, 0.04], [0.3, 0.09], [0.4, 0.16], [0.5, 0.25], [0.6, 0.36], [0.7, 0.49], [0.8, 0.64], [0.9, 0.81], [1, 1], [1.1, 1.21]];
const X22: [number, number][] = [[-0.3, 0.69], [-0.1, 0.21], [0.1, -0.19], [0.3, -0.51], [0.5, -0.75], [0.7, -0.91], [0.9, -0.99], [1.1, -0.99], [1.3, -0.91], [1.5, -0.75], [1.7, -0.51], [1.9, -0.19], [2.1, 0.21], [2.3, 0.69]];
const seg = (x: number, y0: number, y1: number): [number, number][] => [[x, y0], [x, y1]];

/** Darslik (2-qism): 47–50-mavzu (3–4-betlar) — yuzlarni integral yordamida hisoblash. */
export const MATH_41: BoardLesson = {
  n: 41,
  label: '47–48',
  part: 'algebra',
  qism: 2,
  title: 'Ikki chiziq orasidagi yuzani integral bilan topish',
  section: '47–50',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Bogʻda ikki yoʻlak bor: biri toʻgʻri, ikkinchisi egri. Ular ikki joyda kesishib, oʻrtada gulzor hosil qiladi. Bogʻbon qancha koʻchat kerakligini bilish uchun gulzor yuzini bilishi kerak. Bu shakl Ox oʻqiga tegmaydi — uni ikki chiziq chegaralaydi. Bugun shunday yuzalarni topamiz.",
      easy: "Ikki chiziq orasidagi gulzor yuzini topmoqchimiz. Shakl ikki chiziq bilan chegaralangan.",
      draw: [
        { t: 'title', text: 'Ikki yoʻlak orasidagi gulzor' },
        { t: 'icon', x: 10, y: 30, emoji: '🌷', size: 'l' },
        { t: 'axes', id: 'g', x: 28, y: 14, w: 64, h: 50, xmin: -3.2, xmax: 1.8, ymin: -3.3, ymax: 2.2, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: [[-3, -3], [1.8, 1.8]], color: 'blue' },
        { t: 'curve', axes: 'g', points: PAR, color: 'red' },
        { t: 'curve', axes: 'g', points: seg(-1.5, -2.75, -1.5), color: 'green', dashed: true },
        { t: 'curve', axes: 'g', points: seg(-1, -3, -1), color: 'green', dashed: true },
        { t: 'curve', axes: 'g', points: seg(-0.5, -2.75, -0.5), color: 'green', dashed: true },
        { t: 'curve', axes: 'g', points: seg(0, -2, 0), color: 'green', dashed: true },
        { t: 'curve', axes: 'g', points: seg(0.5, -0.75, 0.5), color: 'green', dashed: true }
      ],
      next: 'Qanday hisoblaymiz?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Shaklni yuqoridan f2, pastdan f1 grafigi chegaralasa, uning yuzi ikki egri chiziqli trapetsiya yuzlarining ayirmasiga teng. Shuning uchun S teng a dan b gacha f2 minus f1 ning integrali. Qadamlar: chiziqlarning kesishish nuqtalarini topamiz — ular a va b; qaysi grafik yuqorida ekanini aniqlaymiz; yuqoridagidan pastdagini ayirib integrallaymiz.",
      easy: "Yuqoridagi funksiyadan pastdagisini ayirib, kesishish nuqtalari orasida integrallaymiz.",
      draw: [
        { t: 'title', text: 'Formula' },
        { t: 'formula', x: 10, y: 20, text: 'S = ∫ₐᵇ (f₂(x) − f₁(x)) dx' },
        { t: 'list', x: 6, y: 36, items: ['1) kesishish nuqtalari: a, b', '2) qaysi grafik yuqorida (f₂ ≥ f₁)', '3) integrallash'] }
      ],
      next: 'Gulzor misoli'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 1-misol: y teng x va y teng x kvadrat plyus 2x minus 2. Tenglamani yechamiz: x kvadrat plyus 2x minus 2 teng x, bundan x teng minus 2 va x teng 1. Bu oraliqda toʻgʻri chiziq yuqorida. S teng minus 2 dan 1 gacha minus x kvadrat minus x plyus 2 ning integrali. Hisoblasak, 4,5 kvadrat birlik chiqadi.",
      easy: "Kesishish nuqtalari −2 va 1. Toʻgʻri chiziqdan parabolani ayirib integrallaymiz: 4,5.",
      draw: [
        { t: 'title', text: '1-misol' },
        { t: 'list', x: 6, y: 20, items: ['x² + 2x − 2 = x  →  x = −2, x = 1', 'yuqorida: y = x'] },
        { t: 'formula', x: 6, y: 40, text: 'S = ∫₋₂¹ (−x² − x + 2) dx = 4,5' },
        { t: 'box', id: 'r', x: 6, y: 54, w: 40, h: 11, text: 'S = 4,5 kv. birlik', color: 'green' }
      ],
      next: 'Yana bitta'
    },
    {
      kind: 'example',
      clear: true,
      say: "2-misol: y teng ildiz x va y teng x kvadrat. Ular 0 va 1 nuqtalarda kesishadi, bu oraliqda ildiz x yuqorida. S teng 0 dan 1 gacha ildiz x minus x kvadrat: uchdan ikki minus uchdan bir, yaʼni uchdan bir kvadrat birlik.",
      easy: "Ildiz x dan x kvadratni ayirib, 0 dan 1 gacha integrallaymiz: uchdan bir.",
      draw: [
        { t: 'title', text: '2-misol' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 44, h: 50, xmin: 0, xmax: 1.25, ymin: 0, ymax: 1.3, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: SQRT, color: 'blue' },
        { t: 'curve', axes: 'g', points: X2, color: 'red' },
        { t: 'curve', axes: 'g', points: seg(0.3, 0.09, 0.548), color: 'green', dashed: true },
        { t: 'curve', axes: 'g', points: seg(0.5, 0.25, 0.707), color: 'green', dashed: true },
        { t: 'curve', axes: 'g', points: seg(0.7, 0.49, 0.837), color: 'green', dashed: true },
        { t: 'formula', x: 54, y: 22, text: 'S = ∫₀¹ (√x − x²) dx' },
        { t: 'text', x: 56, y: 38, text: '= ⅔ − ⅓', size: 's' },
        { t: 'box', id: 'r', x: 54, y: 46, w: 30, h: 11, text: 'S = ⅓', color: 'green' }
      ],
      next: 'Parabola va toʻgʻri chiziq'
    },
    {
      kind: 'example',
      clear: true,
      say: "51-mashq: y teng minus x kvadrat plyus 4x parabola va (4; 0), (0; 4) nuqtalardan oʻtuvchi toʻgʻri chiziq. Toʻgʻri chiziq y teng 4 minus x. Kesishish: minus x kvadrat plyus 4x teng 4 minus x, bundan x teng 1 va x teng 4. Parabola yuqorida. S teng 1 dan 4 gacha minus x kvadrat plyus 5x minus 4 ning integrali, ya'ni 4,5.",
      easy: "Kesishish nuqtalari 1 va 4. Paraboladan toʻgʻri chiziqni ayirib integrallaymiz: 4,5.",
      draw: [
        { t: 'title', text: '51-mashq' },
        { t: 'list', x: 6, y: 20, items: ['toʻgʻri chiziq: y = 4 − x', '−x² + 4x = 4 − x  →  x = 1, x = 4'] },
        { t: 'formula', x: 6, y: 40, text: 'S = ∫₁⁴ (−x² + 5x − 4) dx = 4,5' }
      ],
      next: 'Ox dan pastda boʻlsa-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Shakl Ox oʻqidan pastda boʻlsa, integral manfiy chiqadi, yuza esa musbat. Masalan, y teng x kvadrat minus 2x va Ox oʻqi: 0 dan 2 gacha integral minus toʻrtdan uch. Demak, yuza toʻrtdan uch kvadrat birlik. Aslida bu ham oʻsha formula: yuqoridagi funksiya — Ox oʻqi, yaʼni y teng 0.",
      easy: "Pastda yotgan shakl uchun integral manfiy chiqadi — yuzani musbat olamiz.",
      draw: [
        { t: 'title', text: 'Ox dan pastda' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 46, h: 50, xmin: -0.4, xmax: 2.4, ymin: -1.2, ymax: 0.8, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: X22, color: 'red' },
        { t: 'curve', axes: 'g', points: seg(0.5, -0.75, 0), color: 'green', dashed: true },
        { t: 'curve', axes: 'g', points: seg(1, -1, 0), color: 'green', dashed: true },
        { t: 'curve', axes: 'g', points: seg(1.5, -0.75, 0), color: 'green', dashed: true },
        { t: 'formula', x: 56, y: 22, text: '∫₀² (x² − 2x) dx = −4/3' },
        { t: 'box', id: 'r', x: 56, y: 40, w: 34, h: 11, text: 'S = 4/3', color: 'green' },
        { t: 'text', x: 56, y: 60, text: 'S = ∫ (0 − f) dx', size: 's', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ikki chiziq orasidagi yuza: S = ∫ₐᵇ (f₂ − f₁) dx, f₂ — yuqoridagi funksiya.',
    'Chegaralar a va b — chiziqlarning kesishish nuqtalari.',
    'Ox dan pastdagi shakl uchun integral manfiy; yuza uning moduliga teng.'
  ],
  questions: [
    {
      id: 'p41q1',
      prompt: 'y = x va y = x² chiziqlar bilan chegaralangan shakl yuzini toping (0,01 aniqlikda).',
      hint: 'Kesishish: x = 0 va x = 1.',
      explanation: '∫₀¹ (x − x²) dx = ½ − ⅓ = 1/6 ≈ 0,17.',
      widget: { type: 'number_answer', props: { answer: 0.1667, tolerance: 0.01 } }
    },
    {
      id: 'p41q2',
      prompt: 'y = x² − 2x va y = 4 − x² chiziqlar bilan chegaralangan shakl yuzini toping.',
      hint: '2x² − 2x − 4 = 0 → x = −1, x = 2.',
      explanation: '∫₋₁² (−2x² + 2x + 4) dx = 9.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'p41q3',
      prompt: 'y = 1/x, y = 0, x = 1, x = 4 chiziqlar bilan chegaralangan shakl yuzi (0,01 aniqlikda)?',
      hint: '∫ dx/x = ln x.',
      explanation: 'ln 4 − ln 1 = ln 4 ≈ 1,39.',
      widget: { type: 'number_answer', props: { answer: 1.386, tolerance: 0.01 } }
    },
    {
      id: 'p41q4',
      prompt: 'y = 4 − x² parabola va Ox oʻqi bilan chegaralangan shakl yuzi (0,01 aniqlikda)?',
      hint: 'x = ±2. Funksiya juft.',
      explanation: '2·∫₀² (4 − x²) dx = 2·(8 − 8/3) = 32/3 ≈ 10,67.',
      widget: { type: 'number_answer', props: { answer: 10.667, tolerance: 0.01 } }
    },
    {
      id: 'p41q5',
      prompt: 'Yuzani topish qadamlarini tartiblang.',
      hint: 'Avval chegaralar.',
      explanation: 'Kesishish nuqtalari → yuqoridagi funksiya → integral tuzish → hisoblash.',
      widget: { type: 'step_order', props: { steps: ['Kesishish nuqtalarini toping', 'Qaysi grafik yuqorida ekanini aniqlang', 'S = ∫ₐᵇ (f₂ − f₁) dx ni yozing', 'Nyuton–Leybnis formulasi bilan hisoblang'] } }
    },
    {
      id: 'p41q6',
      prompt: '[0; 1] oraliqda qaysi funksiya yuqorida joylashgan?',
      hint: 'x = 0,25 ni qoʻyib koʻring.',
      explanation: 'x = 0,25 da √x = 0,5, x² = 0,0625. √x yuqorida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['y = √x', 'y = x²', 'ikkalasi teng', 'aniqlab boʻlmaydi'], answerIndex: 0 } }
    },
    {
      id: 'p41q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Yuza har doim musbat.',
      explanation: 'Yuza musbat; Ox dan pastda integral manfiy; chegaralar — kesishish nuqtalari; f₂ ≥ f₁ boʻlishi kerak.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Shakl Ox dan pastda boʻlsa, uning integrali manfiy chiqadi.', value: true },
            { text: 'Yuza manfiy boʻlishi mumkin.', value: false },
            { text: 'Integral chegaralari — chiziqlarning kesishish nuqtalari.', value: true },
            { text: 'Formulada pastdagi funksiyadan yuqoridagisi ayiriladi.', value: false }
          ]
        }
      }
    },
    {
      id: 'p41q8',
      prompt: 'Shakllarni yuzasi kichigidan kattasiga qarab tartiblang.',
      hint: 'Yuzalar: 1/6, 1/3, 4,5, 9.',
      explanation: 'y = x va x² → 1/6; √x va x² → 1/3; y = x va x² + 2x − 2 → 4,5; x² − 2x va 4 − x² → 9.',
      widget: { type: 'order_line', props: { items: [{ label: 'y = x, y = x²' }, { label: 'y = √x, y = x²' }, { label: 'y = x, y = x² + 2x − 2' }, { label: 'y = x² − 2x, y = 4 − x²' }] } }
    }
  ]
};
