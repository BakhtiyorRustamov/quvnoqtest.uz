import type { BoardLesson } from './types';

export const BOB7 = { kicker: '7-bob', title: 'Oksidlanish-qaytarilish reaksiyalari' };

/** Darslik: Umumiy kimyo 11, 28-mavzu (127–132-betlar) — oksidlanish-qaytarilish reaksiyalarini yarim reaksiya (ion-elektron) usulida tenglashtirish: kislotali va ishqoriy muhit. */
export const KIM_28: BoardLesson = {
  n: 28,
  label: '28',
  group: BOB7,
  title: 'Yarim reaksiya usuli bilan tenglashtirish',
  section: '28-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "8-sinfda reaksiyalarni elektron balans usulida tenglashtirgan edik: N⁺⁵ uchta elektron olib N⁺² ga oʻtadi, deymiz. Lekin eritmada N⁺⁵ degan ion yoʻq — u yerda nitrat ioni NO₃⁻ suzib yuradi. Yarim reaksiya usuli eritmada haqiqatan bor zarrachalar bilan ishlaydi: ionlar, suv molekulalari, H⁺ yoki OH⁻ ionlari.",
      easy: "Yarim reaksiya usuli — eritmadagi haqiqiy ionlar bilan tenglashtirish.",
      draw: [
        { t: 'title', text: 'Haqiqiy ionlar bilan' },
        { t: 'icon', x: 16, y: 34, emoji: '⚖️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '💧', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['N⁺⁵ emas — NO₃⁻', 'yordamchilar: H₂O, H⁺, OH⁻', 'har yarim reaksiya alohida'] }
      ],
      next: 'Kislotali muhit'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kislotali muhitda qoida: kislorod kam tomonga suv qoʻshamiz, vodorod kam tomonga H⁺ ionlari. Keyin zaryadlarni elektronlar bilan tenglaymiz. Nitrat ioni NO ga qaytariladi: oʻngga 2 ta suv, chapga 4 ta H⁺. Chapda zaryad +3, oʻngda 0 — chapga 3 elektron qoʻshamiz.",
      easy: "Kislotali: O kam tomonga H₂O, H kam tomonga H⁺, keyin e⁻.",
      draw: [
        { t: 'title', text: 'Kislotali muhit' },
        { t: 'list', x: 4, y: 20, items: ['O kam tomonga — H₂O', 'H kam tomonga — H⁺', 'zaryadni — e⁻ bilan'] },
        { t: 'formula', x: 4, y: 46, text: 'NO₃⁻ → NO' },
        { t: 'formula', x: 4, y: 58, text: 'NO₃⁻ + 4H⁺ + 3e⁻ → NO + 2H₂O' }
      ],
      next: 'Qaytaruvchi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "As₂S₃ eritmada ionlarga ajralmaydi, u butun holda yoziladi. U arsenat va sulfat ionlariga oksidlanadi. Oʻngda 20 ta kislorod — chapga 20 ta suv. Chapda 40 ta vodorod — oʻngga 40 ta H⁺. Chapda zaryad 0, oʻngda +28: demak As₂S₃ 28 ta elektron beradi.",
      easy: "As₂S₃ + 20H₂O − 28e⁻ → 2AsO₄³⁻ + 3SO₄²⁻ + 40H⁺.",
      draw: [
        { t: 'title', text: 'Qaytaruvchi: As₂S₃' },
        { t: 'formula', x: 4, y: 24, text: 'As₂S₃ → 2AsO₄³⁻ + 3SO₄²⁻' },
        { t: 'formula', x: 4, y: 36, text: 'As₂S₃ + 20H₂O → 2AsO₄³⁻ + 3SO₄²⁻ + 40H⁺' },
        { t: 'text', x: 4, y: 50, text: 'zaryad: chapda 0, oʻngda +28', color: 'purple' },
        { t: 'formula', x: 4, y: 60, text: 'As₂S₃ + 20H₂O − 28e⁻ → …' }
      ],
      next: 'Birlashtirish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Elektronlar soni teng boʻlishi kerak: oksidlovchi 3 ta oladi, qaytaruvchi 28 ta beradi. Eng kichik umumiy karrali 84: nitrat yarim reaksiyasini 28 ga, As₂S₃ nikini 3 ga koʻpaytiramiz. Qoʻshib, suv va H⁺ larni qisqartirsak, molekulyar tenglama chiqadi.",
      easy: "3 va 28 → 84: NO₃⁻ × 28, As₂S₃ × 3.",
      draw: [
        { t: 'title', text: 'Birlashtirish' },
        { t: 'table', x: 4, y: 20, rows: [['yarim reaksiya', 'e⁻', '×'], ['NO₃⁻ → NO', '+3', '28'], ['As₂S₃ → …', '−28', '3']] },
        { t: 'formula', x: 4, y: 52, text: '3As₂S₃ + 28HNO₃ + 4H₂O →' },
        { t: 'formula', x: 18, y: 62, text: '6H₃AsO₄ + 9H₂SO₄ + 28NO' }
      ],
      next: 'Ishqoriy muhit'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ishqoriy muhitda kislorod kam tomonga kerakligidan ikki marta koʻp OH⁻ ionlari, qarshi tomonga esa suv qoʻshiladi. Xlorat ioni xlorid ioniga qaytariladi: ClO₃⁻ qoʻshuv 3H₂O qoʻshuv 6 elektron — Cl⁻ qoʻshuv 6OH⁻. Mn₃O₄ esa 10 ta elektron berib, manganat ionlariga oʻtadi.",
      easy: "Ishqoriy: O kam tomonga 2× OH⁻, qarshi tomonga H₂O.",
      draw: [
        { t: 'title', text: 'Ishqoriy muhit' },
        { t: 'list', x: 4, y: 20, items: ['O kam tomonga — 2 marta koʻp OH⁻', 'qarshi tomonga — H₂O'] },
        { t: 'formula', x: 4, y: 40, text: 'ClO₃⁻ + 3H₂O + 6e⁻ → Cl⁻ + 6OH⁻' },
        { t: 'formula', x: 4, y: 52, text: 'Mn₃O₄ + 16OH⁻ − 10e⁻ → 3MnO₄²⁻ + 8H₂O' }
      ],
      next: 'Natija'
    },
    {
      kind: 'example',
      clear: true,
      say: "6 va 10 elektronlar uchun umumiy karrali 30: xlorat yarim reaksiyasini 5 ga, Mn₃O₄ nikini 3 ga koʻpaytiramiz. Suv va gidroksidlarni qisqartirsak: 3Mn₃O₄ qoʻshuv 5KClO₃ qoʻshuv 18KOH — 9K₂MnO₄ qoʻshuv 5KCl qoʻshuv 9H₂O. Kaliy, kislorod va vodorod ikki tomonda teng.",
      easy: "×5 va ×3: 3Mn₃O₄ + 5KClO₃ + 18KOH → 9K₂MnO₄ + 5KCl + 9H₂O.",
      draw: [
        { t: 'title', text: 'Ishqoriy muhitda natija' },
        { t: 'formula', x: 4, y: 24, text: '6e⁻ × 5 = 10e⁻ × 3 = 30e⁻' },
        { t: 'formula', x: 4, y: 38, text: '3Mn₃O₄ + 5KClO₃ + 18KOH →' },
        { t: 'formula', x: 18, y: 48, text: '9K₂MnO₄ + 5KCl + 9H₂O' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Yarim reaksiya usulida eritmada haqiqatan bor ionlar va molekulalar yoziladi; kuchsiz elektrolit va choʻkmalar butun holda.',
    'Kislotali muhit: O kam tomonga H₂O, H kam tomonga H⁺; ishqoriy muhit: O kam tomonga 2 marta koʻp OH⁻, qarshi tomonga H₂O.',
    'Zaryadlar elektronlar bilan tenglanadi, ikki yarim reaksiyadagi elektronlar umumiy karraliga keltirilib qoʻshiladi.'
  ],
  questions: [
    {
      id: 'k28q1',
      prompt: 'PbO₂ + MnSO₄ + HNO₃ → HMnO₄ + PbSO₄ + Pb(NO₃)₂ + H₂O. Chap tomon koeffitsiyentlari yigʻindisi nechaga teng?',
      hint: 'Pb: +4 → +2 (2e⁻), Mn: +2 → +7 (5e⁻).',
      explanation: '5PbO₂ + 2MnSO₄ + 6HNO₃ → 2HMnO₄ + 2PbSO₄ + 3Pb(NO₃)₂ + 2H₂O; 5 + 2 + 6 = 13.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['22', '9', '21', '13'], answerIndex: 3 } }
    },
    {
      id: 'k28q2',
      prompt: 'As₂S₃ + HNO₃ → H₃AsO₄ + SO₂ + NO₂ + H₂O. Oʻng tomon koeffitsiyentlari yigʻindisi nechaga teng?',
      hint: 'As₂S₃ 22 ta elektron beradi.',
      explanation: 'As₂S₃ + 22HNO₃ → 2H₃AsO₄ + 3SO₂ + 22NO₂ + 8H₂O; 2 + 3 + 22 + 8 = 35.',
      widget: { type: 'number_answer', props: { answer: 35 } }
    },
    {
      id: 'k28q3',
      prompt: 'H₂O₂ + CrCl₃ + KOH → K₂CrO₄ + KCl + H₂O. Barcha koeffitsiyentlar yigʻindisi nechaga teng?',
      hint: '3H₂O₂ + 2CrCl₃ + 10KOH.',
      explanation: '3H₂O₂ + 2CrCl₃ + 10KOH → 2K₂CrO₄ + 6KCl + 8H₂O; yigʻindi 31.',
      widget: { type: 'number_answer', props: { answer: 31 } }
    },
    {
      id: 'k28q4',
      prompt: 'KMnO₄ + H₂O₂ + KOH → K₂MnO₄ + O₂ + H₂O. Chap tomon koeffitsiyentlari yigʻindisi nechaga teng?',
      hint: 'Mn: 1e⁻ oladi, H₂O₂: 2e⁻ beradi.',
      explanation: '2KMnO₄ + H₂O₂ + 2KOH → 2K₂MnO₄ + O₂ + 2H₂O; 2 + 1 + 2 = 5.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['5', '10', '7', '6'], answerIndex: 0 } }
    },
    {
      id: 'k28q5',
      prompt: 'NO₃⁻ + 4H⁺ + …e⁻ → NO + 2H₂O. Nechta elektron qoʻshiladi?',
      hint: 'Chapda zaryad +3, oʻngda 0.',
      explanation: '3 ta elektron.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'k28q6',
      prompt: 'Qoidani muhit bilan juftlang.',
      hint: 'H⁺ — kislota belgisi.',
      explanation: 'Kislotali: O kam tomonga H₂O, H kam tomonga H⁺. Ishqoriy: O kam tomonga 2 marta koʻp OH⁻, qarshi tomonga H₂O.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'a', label: 'Kislotali' },
            { id: 'b', label: 'Ishqoriy' }
          ],
          items: [
            { emoji: '', label: 'H kam tomonga H⁺', bin: 'a' },
            { emoji: '', label: 'O kam tomonga H₂O', bin: 'a' },
            { emoji: '', label: 'O kam tomonga 2× OH⁻', bin: 'b' },
            { emoji: '', label: 'ClO₃⁻ + 3H₂O + 6e⁻ → Cl⁻ + 6OH⁻', bin: 'b' },
            { emoji: '', label: 'NO₃⁻ + 4H⁺ + 3e⁻ → NO + 2H₂O', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'k28q7',
      prompt: 'Yarim reaksiya usuli tartibini tiklang.',
      hint: 'Avval atomlar, keyin zaryad.',
      explanation: 'Zarrachalarni yozish → kislorodni tenglash → vodorodni tenglash → zaryadni elektron bilan tenglash → elektronlarni tenglab qoʻshish.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['oksidlovchi va qaytaruvchi zarrachalarini yozish', 'kislorodni tenglash', 'vodorodni tenglash', 'zaryadni elektronlar bilan tenglash', 'elektronlarni tenglab, qoʻshish']
        }
      }
    },
    {
      id: 'k28q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'As₂S₃ — dissotsilanmaydi.',
      explanation: 'As₂S₃ butun yoziladi; HNO₃ — NO₃⁻ va H⁺ holda; ishqoriy muhitda H⁺ yozilmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'As₂S₃ yarim reaksiyada butun holda yoziladi.', value: true },
            { text: 'Ikki yarim reaksiyadagi elektronlar soni tenglashtiriladi.', value: true },
            { text: 'Ishqoriy muhitda vodorodni H⁺ bilan tenglaymiz.', value: false },
            { text: 'Yarim reaksiyada N⁺⁵ ioni yoziladi.', value: false }
          ]
        }
      }
    }
  ]
};
