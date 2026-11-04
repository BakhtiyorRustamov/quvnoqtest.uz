import type { BoardLesson } from './types';
import { BOB7 } from './fizika-39';
import { rect, vec } from './phys';

const cell = (id: string, x: number, label: string, color: 'ink' | 'red' | 'blue' | 'green') => [
  ...rect(id, x, 34, 14, 12, color),
  { t: 'text' as const, x: x + 7, y: 42, text: label, anchor: 'middle' as const, size: 's' as const }
];

/** Darslik: Fizika 11, 42-mavzu (170–173-betlar) — yadro reaksiyalari, saqlanish qonunlari, Bor nazariyasi, siljish qoidasi (α, β, γ). */
export const FIZ_44: BoardLesson = {
  n: 44,
  label: '42',
  group: BOB7,
  title: 'Yadro reaksiyalari. Siljish qoidasi',
  section: '42-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oʻrta asr alkimyogarlari qoʻrgʻoshinni oltinga aylantirishni orzu qilishgan, lekin uddalay olishmagan. Kimyoviy reaksiyada element oʻzgarmaydi. Yadro reaksiyasida esa bir element boshqasiga aylanadi! 1919-yilda Rezerford birinchi marta azotni kislorodga aylantirgan.",
      easy: "Yadro reaksiyasida bir element boshqasiga aylanadi.",
      draw: [
        { t: 'title', text: 'Alkimyogarlar orzusi' },
        { t: 'icon', x: 16, y: 34, emoji: '⚗️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚛️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['kimyoda — element oʻzgarmaydi', 'yadroda — element oʻzgaradi', 'azot → kislorod (1919)'] }
      ],
      next: 'Saqlanish qonunlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yadro reaksiyasi — yadrolarning bir-biri yoki zarralar bilan taʼsirlashib, boshqa yadrolarga aylanishi. Unda elektr zaryadi, nuklonlar soni, energiya, impuls va impuls momenti saqlanadi. Energiya ajraladigan reaksiyalar ekzotermik, yutiladiganlari endotermik. Masalan, litiy-7 ga proton urilsa, ikkita geliy yadrosi hosil boʻladi va 7,3 megaelektronvolt energiya ajraladi.",
      easy: "Saqlanadi: zaryad, nuklonlar soni, energiya, impuls. Ekzo- va endotermik reaksiyalar.",
      draw: [
        { t: 'title', text: 'Yadro reaksiyasida saqlanadi' },
        { t: 'list', x: 6, y: 22, items: ['elektr zaryadi', 'nuklonlar soni', 'energiya va impuls', 'impuls momenti'] },
        { t: 'formula', x: 6, y: 52, text: '⁷Li + ¹H → ⁴He + ⁴He + 7,3 MeV' }
      ],
      next: 'Bor nazariyasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bor nazariyasiga koʻra reaksiya ikki bosqichda boradi. Avval nishon yadro A uchib kelgan zarra a ni yutib, uygʻongan oraliq yadro C ni hosil qiladi. Keyin C yadro parchalanib, zarra b va yangi yadro B hosil boʻladi: A qoʻshuv a, C ga, C esa b qoʻshuv B ga aylanadi.",
      easy: "A + a → C → b + B (oraliq yadro C).",
      draw: [
        { t: 'title', text: 'Bor nazariyasi: oraliq yadro' },
        { t: 'formula', x: 10, y: 30, text: 'A + a  →  C*  →  b + B' },
        { t: 'list', x: 6, y: 44, items: ['A — nishon yadro, a — zarra', 'C* — uygʻongan oraliq yadro', 'b + B — mahsulotlar'] }
      ],
      next: 'Siljish qoidasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Alfa-yemirilishda yadro massa sonini 4 ga, zaryadini 2 ga yoʻqotadi — element davriy sistemada ikki katak chapga siljiydi. Beta-yemirilishda yadrodan elektron chiqadi: massa soni oʻzgarmaydi, zaryad 1 ga ortadi — bir katak oʻngga siljiydi. Bu siljish qoidasi. Gamma-nurlanishni 1900-yilda Villar kashf qilgan; uygʻongan yadro foton chiqaradi, A ham Z ham oʻzgarmaydi.",
      easy: "α: A − 4, Z − 2 (2 katak chapga). β: Z + 1 (1 katak oʻngga). γ: oʻzgarmaydi.",
      draw: [
        { t: 'title', text: 'Siljish qoidasi' },
        ...cell('c1', 10, 'Z − 2', 'red'),
        ...cell('c2', 26, 'Z − 1', 'ink'),
        ...cell('c3', 42, 'Z', 'ink'),
        ...cell('c4', 58, 'Z + 1', 'blue'),
        ...vec('va', 48, 32, 18, 32, 'red', 'α'),
        ...vec('vb', 50, 50, 64, 50, 'blue', 'β'),
        { t: 'formula', x: 4, y: 60, text: 'α: A − 4,  Z − 2     β: Z + 1' },
        { t: 'text', x: 76, y: 42, text: 'γ: oʻzgarmas', size: 's', color: 'green' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Azot-14 ga alfa-zarra urildi, proton va noma'lum yadro X hosil boʻldi. Nuklonlar soni: 14 qoʻshuv 4 teng 18, proton 1 ni olsa, X ning massa soni 17. Zaryad: 7 qoʻshuv 2 teng 9, minus 1 — 8. Z teng 8 — kislorod. Demak X — kislorod-17. Bu Rezerford amalga oshirgan birinchi sunʼiy yadro reaksiyasi.",
      easy: "¹⁴N + ⁴He → ¹⁷O + ¹H.",
      draw: [
        { t: 'title', text: 'Nomaʼlum yadroni topamiz' },
        { t: 'formula', x: 6, y: 22, text: '¹⁴N + ⁴He → X + ¹H' },
        { t: 'formula', x: 6, y: 36, text: 'A: 14 + 4 − 1 = 17' },
        { t: 'formula', x: 6, y: 48, text: 'Z: 7 + 2 − 1 = 8  → O' },
        { t: 'text', x: 6, y: 62, text: 'X = ¹⁷O', color: 'red' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Yadro reaksiyalarida zaryad, nuklonlar soni, energiya, impuls va impuls momenti saqlanadi; reaksiyalar ekzotermik yoki endotermik boʻladi.',
    'Bor nazariyasi: A + a → C → b + B — reaksiya oraliq uygʻongan yadro orqali boradi.',
    'Siljish qoidasi: α — A − 4, Z − 2 (2 katak chapga); β — Z + 1 (1 katak oʻngga); γ — A va Z oʻzgarmaydi.'
  ],
  questions: [
    {
      id: 'f44q1',
      prompt: 'Radon-222 (Z = 86) α-zarra chiqardi. Hosil boʻlgan yadroning massa soni nechaga teng?',
      hint: 'A − 4.',
      explanation: '222 − 4 = 218 (poloniy-218, Z = 84).',
      widget: { type: 'number_answer', props: { answer: 218 } }
    },
    {
      id: 'f44q2',
      prompt: 'Kobalt-60 (Z = 27) β-zarra chiqardi. Hosil boʻlgan yadroning zaryad soni nechaga teng?',
      hint: 'Z + 1.',
      explanation: '27 + 1 = 28 — nikel-60.',
      widget: { type: 'number_answer', props: { answer: 28 } }
    },
    {
      id: 'f44q3',
      prompt: 'Reaksiyani toʻldiring: ²H + γ → X + ¹n. X nima?',
      hint: 'A: 2 = A + 1, Z: 1 = Z + 0.',
      explanation: 'A = 1, Z = 1 — proton ¹H.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['proton ¹H', 'neytron', 'elektron', '³He'], answerIndex: 0 } }
    },
    {
      id: 'f44q4',
      prompt: 'γ-kvant chiqarganda yadroning massa soni va zaryad soni qanday oʻzgaradi?',
      hint: 'Foton zaryadsiz va massasiz.',
      explanation: 'Oʻzgarmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['A − 4, Z − 2', 'Z + 1', 'oʻzgarmaydi', 'A − 1'], answerIndex: 2 } }
    },
    {
      id: 'f44q5',
      prompt: 'Yemirilish turini oʻzgarish bilan juftlang.',
      hint: 'α — ikki katak chapga.',
      explanation: 'α — A − 4, Z − 2; β — Z + 1, A oʻzgarmaydi; γ — oʻzgarmaydi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'α-yemirilish', right: 'A − 4, Z − 2' },
            { left: 'β-yemirilish', right: 'Z + 1, A oʻzgarmaydi' },
            { left: 'γ-nurlanish', right: 'A va Z oʻzgarmaydi' }
          ]
        }
      }
    },
    {
      id: 'f44q6',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Siljish qoidasi.',
      explanation: 'α-yemirilishda element 2 katak chapga, β-yemirilishda 1 katak oʻngga siljiydi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'α-yemirilishda element ikki katak ' },
            { blank: 'chapga' },
            { text: ', β-yemirilishda bir katak ' },
            { blank: 'oʻngga' },
            { text: ' siljiydi.' }
          ],
          bank: ['chapga', 'oʻngga', 'yuqoriga', 'pastga']
        }
      }
    },
    {
      id: 'f44q7',
      prompt: 'Bor nazariyasi boʻyicha reaksiya bosqichlarini tartiblang.',
      hint: 'Avval yutish, keyin parchalanish.',
      explanation: 'Zarra yadroga yaqinlashadi → yutiladi → oraliq yadro C uygʻonadi → C parchalanadi → b va B hosil boʻladi.',
      widget: { type: 'step_order', props: { steps: ['Zarra a nishon yadro A ga uchib keladi', 'A zarrani yutadi', 'Uygʻongan oraliq yadro C hosil boʻladi', 'C parchalanadi', 'Zarra b va yadro B hosil boʻladi'] } }
    },
    {
      id: 'f44q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Energiya ajralsa — ekzotermik.',
      explanation: '⁷Li + p reaksiyasi energiya ajratadi; nuklonlar soni saqlanadi; β-yemirilishda A oʻzgarmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Yadro reaksiyasida nuklonlar soni saqlanadi.', value: true },
            { text: '⁷Li + ¹H → 2 ⁴He reaksiyasi ekzotermik.', value: true },
            { text: 'β-yemirilishda massa soni 1 ga kamayadi.', value: false },
            { text: 'Energiya yutiladigan reaksiyalar ekzotermik deyiladi.', value: false }
          ]
        }
      }
    }
  ]
};
