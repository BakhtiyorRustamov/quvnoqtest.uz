import type { BoardLesson } from './types';
import { BOB7 } from './kimyo-28';

/** Darslik: Umumiy kimyo 11, 29-mavzu (132–135-betlar) — KMnO₄ ning oksidlovchilik xossasi eritma muhitiga bogʻliqligi: kislotali, neytral, ishqoriy muhit. */
export const KIM_29: BoardLesson = {
  n: 29,
  label: '29',
  group: BOB7,
  title: 'Reaksiya mahsulotlarining muhitga bogʻliqligi',
  section: '29-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Uchta probirkaga bir xil pushti-siyohrang kaliy permanganat va natriy nitrit eritmasi quyamiz. Birinchisiga bir tomchi sulfat kislota, ikkinchisiga suv, uchinchisiga kaliy gidroksid qoʻshamiz. Natija uch xil: rangsiz eritma, qoʻngʻir choʻkma va yashil eritma! Moddalar bir xil — faqat muhit har xil.",
      easy: "Bir xil moddalar, uch xil muhit — uch xil rang.",
      draw: [
        { t: 'title', text: 'Uch probirka' },
        { t: 'icon', x: 16, y: 40, emoji: '🧪', size: 'l' },
        { t: 'table', x: 30, y: 24, rows: [['muhit', 'natija'], ['H₂SO₄', 'rangsiz'], ['H₂O', 'qoʻngʻir choʻkma'], ['KOH', 'yashil']] }
      ],
      next: 'Kislotali'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kislotali muhitda permanganat ioni 5 ta elektron olib, rangsiz Mn²⁺ ioniga qaytariladi. Nitrit ioni nitrat ioniga oksidlanadi. Elektronlarni tenglab: 2KMnO₄ qoʻshuv 5NaNO₂ qoʻshuv 3H₂SO₄ — 2MnSO₄ qoʻshuv 5NaNO₃ qoʻshuv K₂SO₄ qoʻshuv 3H₂O.",
      easy: "Kislotali: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (rangsiz).",
      draw: [
        { t: 'title', text: 'Kislotali muhit' },
        { t: 'formula', x: 4, y: 22, text: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O' },
        { t: 'formula', x: 4, y: 33, text: 'NO₂⁻ + H₂O − 2e⁻ → NO₃⁻ + 2H⁺' },
        { t: 'formula', x: 4, y: 48, text: '2KMnO₄ + 5NaNO₂ + 3H₂SO₄ →' },
        { t: 'formula', x: 10, y: 58, text: '2MnSO₄ + 5NaNO₃ + K₂SO₄ + 3H₂O' }
      ],
      next: 'Neytral'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Neytral muhitda permanganat 3 ta elektron olib, marganes(IV) oksidgacha qaytariladi — bu qoramtir-qoʻngʻir choʻkma. 2KMnO₄ qoʻshuv 3NaNO₂ qoʻshuv H₂O — 2MnO₂ qoʻshuv 3NaNO₃ qoʻshuv 2KOH. Eritmada ishqor hosil boʻladi.",
      easy: "Neytral: MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂↓ + 4OH⁻ (qoʻngʻir).",
      draw: [
        { t: 'title', text: 'Neytral muhit' },
        { t: 'formula', x: 4, y: 24, text: 'MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂↓ + 4OH⁻' },
        { t: 'formula', x: 4, y: 40, text: '2KMnO₄ + 3NaNO₂ + H₂O →' },
        { t: 'formula', x: 10, y: 50, text: '2MnO₂↓ + 3NaNO₃ + 2KOH' }
      ],
      next: 'Ishqoriy'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ishqoriy muhitda permanganat atigi 1 ta elektron olib, yashil rangli manganat ioni MnO₄²⁻ ga aylanadi. 2KMnO₄ qoʻshuv NaNO₂ qoʻshuv 2KOH — 2K₂MnO₄ qoʻshuv NaNO₃ qoʻshuv H₂O.",
      easy: "Ishqoriy: MnO₄⁻ + 1e⁻ → MnO₄²⁻ (yashil).",
      draw: [
        { t: 'title', text: 'Ishqoriy muhit' },
        { t: 'formula', x: 4, y: 24, text: 'MnO₄⁻ + 1e⁻ → MnO₄²⁻' },
        { t: 'formula', x: 4, y: 40, text: '2KMnO₄ + NaNO₂ + 2KOH →' },
        { t: 'formula', x: 10, y: 50, text: '2K₂MnO₄ + NaNO₃ + H₂O' }
      ],
      next: 'Xulosa jadvali'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Xulosa: permanganat kislotali muhitda eng kuchli oksidlovchi — 5 elektron oladi; neytralda oʻrtacha — 3 elektron; ishqoriyda eng kuchsiz — 1 elektron. Mahsulot rangi qaysi muhit boʻlganini koʻrsatib turadi.",
      easy: "H⁺: Mn²⁺ (5e⁻); H₂O: MnO₂ (3e⁻); OH⁻: MnO₄²⁻ (1e⁻).",
      draw: [
        { t: 'title', text: 'KMnO₄ — uch muhitda' },
        { t: 'table', x: 4, y: 20, rows: [['muhit', 'mahsulot', 'e⁻', 'rang'], ['kislotali', 'Mn²⁺', '5', 'rangsiz'], ['neytral', 'MnO₂', '3', 'qoʻngʻir'], ['ishqoriy', 'MnO₄²⁻', '1', 'yashil']] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Kaliy permanganat sulfat kislota ishtirokida natriy peroksid bilan reaksiyaga kirishib, normal sharoitda 5,6 litr kislorod ajraldi. KMnO₄ massasi? Mn 5 elektron oladi, peroksid ikki elektron beradi: 2KMnO₄ ga 5O₂. Kislorod 0,25 mol — permanganat 0,1 mol, ya'ni 15,8 gramm.",
      easy: "2KMnO₄ → 5O₂; O₂ 0,25 mol → KMnO₄ 0,1 mol = 15,8 g.",
      draw: [
        { t: 'title', text: 'Gazdan massaga' },
        { t: 'formula', x: 4, y: 22, text: '2KMnO₄ + 5Na₂O₂ + 8H₂SO₄ → 5O₂ + …' },
        { t: 'formula', x: 4, y: 36, text: 'n(O₂) = 5,6 / 22,4 = 0,25 mol' },
        { t: 'formula', x: 4, y: 48, text: 'n(KMnO₄) = 0,25 · 2 / 5 = 0,1 mol' },
        { t: 'formula', x: 4, y: 60, text: 'm = 0,1 · 158 = 15,8 g' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Kislotali muhitda MnO₄⁻ 5e⁻ olib rangsiz Mn²⁺ ga qaytariladi — eng kuchli oksidlovchi.',
    'Neytral muhitda 3e⁻ olib qoʻngʻir MnO₂ choʻkmasiga, ishqoriy muhitda 1e⁻ olib yashil MnO₄²⁻ ga aylanadi.',
    'Muhit reaksiya mahsulotlarini va moddalar nisbatini oʻzgartiradi.'
  ],
  questions: [
    {
      id: 'k29q1',
      prompt: 'Cr₂(SO₄)₃ KOH ishtirokida H₂O₂ bilan reaksiyaga kirishib, 19,4 g K₂CrO₄ hosil boʻldi. Oksidlovchi (H₂O₂) massasi necha gramm?',
      hint: 'Cr₂(SO₄)₃ + 3H₂O₂ + 10KOH → 2K₂CrO₄ + …',
      explanation: 'K₂CrO₄ 0,1 mol → H₂O₂ 0,15 mol · 34 = 5,1 g.',
      widget: { type: 'number_answer', props: { answer: 5.1, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k29q2',
      prompt: '204 g 5 % li H₂O₂ eritmasi ishqoriy muhitda AuCl₃ bilan reaksiyaga kirishdi. Necha gramm oltin hosil boʻladi?',
      hint: '2AuCl₃ + 3H₂O₂ + 6KOH → 2Au + 3O₂ + …',
      explanation: 'H₂O₂ 10,2 g = 0,3 mol → Au 0,2 mol · 197 = 39,4 g.',
      widget: { type: 'number_answer', props: { answer: 39.4, tolerance: 0.05, unit: 'g' } }
    },
    {
      id: 'k29q3',
      prompt: 'K₂Cr₂O₇ + FeSO₄ + H₂SO₄ reaksiyasida 1 mol oksidlovchi bilan necha mol qaytaruvchi reaksiyaga kirishadi?',
      hint: 'Cr₂O₇²⁻ 6 ta elektron oladi.',
      explanation: 'Har Fe²⁺ 1 ta elektron beradi: 6 mol.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['2', '6', '3', '12'], answerIndex: 1 } }
    },
    {
      id: 'k29q4',
      prompt: '200 g 36,5 % li HCl eritmasi KMnO₄ bilan oksidlandi. Qatnashgan KMnO₄ va hosil boʻlgan Cl₂ miqdori (mol)?',
      hint: '2KMnO₄ + 16HCl → … + 5Cl₂.',
      explanation: 'HCl 2 mol → KMnO₄ 0,25 mol, Cl₂ 0,625 mol.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0,2 va 0,5', '2 va 5', '0,25 va 0,625', '0,5 va 1,25'], answerIndex: 2 } }
    },
    {
      id: 'k29q5',
      prompt: 'Muhitni MnO₄⁻ ning mahsuloti bilan juftlang.',
      hint: 'Kislotada — eng koʻp elektron.',
      explanation: 'Kislotali — Mn²⁺; neytral — MnO₂; ishqoriy — MnO₄²⁻.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'kislotali', right: 'Mn²⁺' },
            { left: 'neytral', right: 'MnO₂' },
            { left: 'ishqoriy', right: 'MnO₄²⁻' }
          ]
        }
      }
    },
    {
      id: 'k29q6',
      prompt: 'Mahsulotni uning rangi bilan juftlang.',
      hint: 'Manganat — yashil.',
      explanation: 'MnO₄⁻ — pushti-siyohrang; Mn²⁺ — rangsiz; MnO₂ — qoʻngʻir; MnO₄²⁻ — yashil.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'MnO₄⁻' }, b: { label: 'pushti-siyohrang' } },
            { a: { label: 'Mn²⁺' }, b: { label: 'rangsiz' } },
            { a: { label: 'MnO₂' }, b: { label: 'qoʻngʻir choʻkma' } },
            { a: { label: 'MnO₄²⁻' }, b: { label: 'yashil' } }
          ]
        }
      }
    },
    {
      id: 'k29q7',
      prompt: 'Neytral muhitda MnO₄⁻ nechta elektron qabul qiladi?',
      hint: '+7 → +4.',
      explanation: '3 ta elektron.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'k29q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kislotada — eng kuchli.',
      explanation: 'KMnO₄ kislotali muhitda eng kuchli oksidlovchi; neytral muhitda eritmada KOH hosil boʻladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kislotali muhitda KMnO₄ eng kuchli oksidlovchi.', value: true },
            { text: 'Neytral muhitda reaksiyadan keyin eritmada ishqor hosil boʻladi.', value: true },
            { text: 'Ishqoriy muhitda MnO₄⁻ 5 ta elektron oladi.', value: false },
            { text: 'Mn²⁺ ioni eritmani yashil rangga boʻyaydi.', value: false }
          ]
        }
      }
    }
  ]
};
