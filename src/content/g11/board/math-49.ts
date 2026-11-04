import type { BoardLesson } from './types';

/** Darslik (2-qism): 59–60-mavzu (35–36-betlar) — Nyuton binomi, binomial koeffitsiyentlarning xossalari. */
export const MATH_49: BoardLesson = {
  n: 49,
  label: '60',
  part: 'algebra',
  qism: 2,
  title: 'Nyuton binomi va Paskal uchburchagi',
  section: '59–60',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "(a plyus b) kvadrat va kubni yoddan bilasiz. (a plyus b) ning 10-darajasini-chi? Qavslarni oʻnta marta ochish uzoq ish. Ammo koeffitsiyentlarda ajoyib qonuniyat bor: 1, 2, 1; 1, 3, 3, 1; 1, 4, 6, 4, 1... Bu sonlar guruhlashlar soni ekan! Bugun ixtiyoriy darajani bir zumda yozishni oʻrganamiz.",
      easy: "Koeffitsiyentlarda qonuniyat bor — ular guruhlashlar soni.",
      draw: [
        { t: 'title', text: '(a + b)ⁿ = ?' },
        { t: 'list', x: 6, y: 20, items: ['(a + b)² = a² + 2ab + b²', '(a + b)³ = a³ + 3a²b + 3ab² + b³', '(a + b)¹⁰ = ???'] }
      ],
      next: 'Qonuniyatni koʻramiz'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Koeffitsiyentlarni qatorlarga yozamiz. Har bir qatorning chetlarida 1, ichidagi har bir son esa tepasidagi ikki son yigʻindisi. Bu Paskal uchburchagi. 4-qator: 1, 4, 6, 4, 1. 5-qator: 1, 5, 10, 10, 5, 1.",
      easy: "Chetlarda 1, ichida — tepadagi ikki son yigʻindisi.",
      draw: [
        { t: 'title', text: 'Paskal uchburchagi' },
        { t: 'text', x: 50, y: 20, text: '1', anchor: 'middle' },
        { t: 'text', x: 50, y: 28, text: '1  1', anchor: 'middle' },
        { t: 'text', x: 50, y: 36, text: '1  2  1', anchor: 'middle' },
        { t: 'text', x: 50, y: 44, text: '1  3  3  1', anchor: 'middle' },
        { t: 'text', x: 50, y: 52, text: '1  4  6  4  1', anchor: 'middle', color: 'blue' },
        { t: 'text', x: 50, y: 60, text: '1  5  10  10  5  1', anchor: 'middle', color: 'red' }
      ],
      next: 'Umumiy formula'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Nyuton binomi formulasi: (a plyus b) ning n-darajasi teng C n 0 a ning n darajasi plyus C n 1 a ning n minus 1 darajasi b plyus ... plyus C n n b ning n darajasi. a ning darajasi bittadan kamayadi, b niki bittadan oshadi, koeffitsiyentlar — binomial koeffitsiyentlar. Hadlar soni n plyus 1.",
      easy: "a ning darajasi kamayadi, b niki oshadi, koeffitsiyentlar Cₙᵏ.",
      draw: [
        { t: 'title', text: 'Nyuton binomi' },
        { t: 'formula', x: 4, y: 20, text: '(a + b)ⁿ = Cₙ⁰aⁿ + Cₙ¹aⁿ⁻¹b + … + Cₙⁿbⁿ' },
        { t: 'list', x: 6, y: 38, items: ['k-had: Cₙᵏ·aⁿ⁻ᵏ·bᵏ', 'hadlar soni: n + 1'] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "(a plyus b) ning 4-darajasi: a toʻrtinchi daraja plyus 4a kub b plyus 6a kvadrat b kvadrat plyus 4ab kub plyus b toʻrtinchi daraja. (x plyus 1) ning 6-darajasida x toʻrtinchi daraja oldidagi koeffitsiyent C 6 2 teng 15. (a minus 2) ning 6-darajasida ozod had minus 2 ning 6-darajasi, yaʼni 64.",
      easy: "(a + b)⁴ koeffitsiyentlari 1, 4, 6, 4, 1. (x + 1)⁶ da x⁴ oldida 15.",
      draw: [
        { t: 'title', text: 'Misollar' },
        { t: 'formula', x: 4, y: 20, text: '(a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴' },
        { t: 'list', x: 6, y: 36, items: ['(x + 1)⁶: x⁴ oldida C₆² = 15', '(a − 2)⁶: ozod had (−2)⁶ = 64'] }
      ],
      next: 'Xossalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Birinchi xossa: a teng b teng 1 desak, barcha binomial koeffitsiyentlar yigʻindisi 2 ning n darajasi chiqadi. Shuning uchun n elementli toʻplamning 2 ning n darajasi ta qism toʻplami bor. Ikkinchi xossa: a teng 1, b teng minus 1 desak, ishorasi almashib keladigan yigʻindi 0. Demak, juft va toq oʻrindagilar yigʻindilari teng, har biri 2 ning n minus 1 darajasi.",
      easy: "Barcha koeffitsiyentlar yigʻindisi 2ⁿ. Juft va toq oʻrindagilar teng — 2ⁿ⁻¹ dan.",
      draw: [
        { t: 'title', text: 'Xossalar' },
        { t: 'list', x: 6, y: 20, items: ['Cₙ⁰ + Cₙ¹ + … + Cₙⁿ = 2ⁿ', 'Cₙ⁰ − Cₙ¹ + Cₙ² − … = 0', 'Cₙ⁰ + Cₙ² + … = Cₙ¹ + Cₙ³ + … = 2ⁿ⁻¹'] },
        { t: 'text', x: 6, y: 56, text: 'n = 4: 1 + 4 + 6 + 4 + 1 = 16 = 2⁴', size: 's', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    '(a + b)ⁿ = Cₙ⁰aⁿ + Cₙ¹aⁿ⁻¹b + … + Cₙⁿbⁿ; hadlar soni n + 1.',
    'Paskal uchburchagi: chetlarda 1, ichida — tepadagi ikki son yigʻindisi.',
    'Koeffitsiyentlar yigʻindisi 2ⁿ; juft va toq oʻrindagilar yigʻindilari teng.'
  ],
  questions: [
    {
      id: 'p49q1',
      prompt: '(a + b)⁴ yoyilmasida a²b² oldidagi koeffitsiyent?',
      hint: 'C₄².',
      explanation: '6.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'p49q2',
      prompt: '(a + b)⁵ yoyilmasida a³b² oldidagi koeffitsiyent?',
      hint: 'C₅².',
      explanation: '10.',
      widget: { type: 'number_answer', props: { answer: 10 } }
    },
    {
      id: 'p49q3',
      prompt: '(a + b)⁷ yoyilmasidagi barcha koeffitsiyentlar yigʻindisi?',
      hint: '2ⁿ.',
      explanation: '2⁷ = 128.',
      widget: { type: 'number_answer', props: { answer: 128 } }
    },
    {
      id: 'p49q4',
      prompt: '(x + 1)⁶ yoyilmasida x⁴ oldidagi koeffitsiyent?',
      hint: 'C₆⁴ = C₆².',
      explanation: '15.',
      widget: { type: 'number_answer', props: { answer: 15 } }
    },
    {
      id: 'p49q5',
      prompt: '(a + b)¹⁰ yoyilmasida nechta had bor?',
      hint: 'n + 1.',
      explanation: '11.',
      widget: { type: 'number_answer', props: { answer: 11 } }
    },
    {
      id: 'p49q6',
      prompt: '(a − 2)⁶ yoyilmasining ozod hadi (a qatnashmagan had)?',
      hint: '(−2)⁶.',
      explanation: '64.',
      widget: { type: 'number_answer', props: { answer: 64 } }
    },
    {
      id: 'p49q7',
      prompt: 'Qaysi sonlar Paskal uchburchagining 6-qatorida (1, 6, …) uchraydi? Hammasini belgilab, Tekshirish ni bosing.',
      hint: '5-qator: 1, 5, 10, 10, 5, 1. Qoʻshni sonlarni qoʻshing.',
      explanation: '6-qator: 1, 6, 15, 20, 15, 6, 1. 10 va 12 yoʻq.',
      widget: { type: 'pick_many', props: { options: [{ label: '6', correct: true }, { label: '15', correct: true }, { label: '20', correct: true }, { label: '10' }, { label: '12' }] } }
    },
    {
      id: 'p49q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'a = b = 1 va a = 1, b = −1 ni qoʻyib koʻring.',
      explanation: 'Yigʻindi 2ⁿ; ishorasi almashadigan yigʻindi 0; chetlarda 1; hadlar soni n + 1.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Cₙ⁰ + Cₙ¹ + … + Cₙⁿ = 2ⁿ.', value: true },
            { text: '(a + b)ⁿ yoyilmasida n ta had bor.', value: false },
            { text: 'Paskal uchburchagining har bir qatori 1 bilan boshlanadi va tugaydi.', value: true },
            { text: 'Cₙ⁰ − Cₙ¹ + Cₙ² − … = 1.', value: false }
          ]
        }
      }
    }
  ]
};
