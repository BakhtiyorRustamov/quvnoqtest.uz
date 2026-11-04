import type { BoardLesson } from './types';

/** y = 9 − x² (darvoza ravogʻi) */
const ARCH: [number, number][] = [[-3, 0], [-2.6, 2.24], [-2.2, 4.16], [-1.8, 5.76], [-1.4, 7.04], [-1, 8], [-0.6, 8.64], [-0.2, 8.96], [0, 9], [0.2, 8.96], [0.6, 8.64], [1, 8], [1.4, 7.04], [1.8, 5.76], [2.2, 4.16], [2.6, 2.24], [3, 0]];
const COS: [number, number][] = [[-2.2, -0.589], [-1.833, -0.26], [-1.571, 0], [-1.1, 0.454], [-0.733, 0.743], [-0.367, 0.934], [0, 1], [0.367, 0.934], [0.733, 0.743], [1.1, 0.454], [1.571, 0], [1.833, -0.26], [2.2, -0.589]];
const SQ: [number, number][] = [[0, 0], [0.2, 0.04], [0.4, 0.16], [0.6, 0.36], [0.8, 0.64], [1, 1], [1.2, 1.44]];
const vline = (x: number, y0: number, y1: number): [number, number][] => [[x, y0], [x, y1]];

/** Darslik: 44–46-mavzu (99–104-betlar) — Nyuton–Leybnis formulasi, aniq integral xossalari, yuzalarni hisoblash. */
export const MATH_26: BoardLesson = {
  n: 26,
  label: "46",
  part: 'algebra',
  title: "Nyuton–Leybnis formulasi va yuzalarni hisoblash",
  section: '44–46',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Usta eski uyning ravoqli darvozasiga oyna qoʻymoqchi. Ravoq parabola shaklida: eni 6 desimetr, balandligi 9 desimetr. Qancha oyna kerak? Toʻgʻri toʻrtburchak boʻlsa 54 boʻlardi, lekin ravoq undan kichik. Javobni dars oxirida integral bilan topamiz.",
      easy: "Ravoq shaklidagi oynaning yuzasini integral bilan hisoblaymiz.",
      draw: [
        { t: 'title', text: 'Ravoqli oyna' },
        { t: 'icon', x: 10, y: 30, emoji: '🏛️', size: 'l' },
        { t: 'axes', id: 'g', x: 28, y: 14, w: 62, h: 48, xmin: -3.6, xmax: 3.6, ymin: 0, ymax: 10, xlabel: 'dm', ylabel: 'dm' },
        { t: 'curve', axes: 'g', points: ARCH, color: 'blue' },
        { t: 'text', x: 50, y: 67, text: 'y = 9 − x²', color: 'purple' }
      ],
      next: 'Avval mashq qilamiz'
    },
    {
      kind: 'example',
      clear: true,
      say: "2-misol: y teng kosinus x grafigi va minus pi ikkidan pi ikkigacha boʻlgan kesma bilan chegaralangan yuza. Kosinusning boshlangʻich funksiyasi sinus x. S teng sinus pi ikki minus sinus minus pi ikki, yaʼni 1 minus minus 1, 2 kvadrat birlik.",
      easy: "Sinus pi ikki minus sinus minus pi ikki: 1 minus minus 1 teng 2.",
      draw: [
        { t: 'title', text: 'Kosinus ostidagi yuza' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 50, h: 50, xmin: -2.4, xmax: 2.4, ymin: -0.8, ymax: 1.3, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: COS, color: 'red' },
        { t: 'curve', axes: 'g', points: vline(-1.1, 0, 0.454), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(-0.55, 0, 0.853), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(0, 0, 1), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(0.55, 0, 0.853), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(1.1, 0, 0.454), color: 'blue', dashed: true },
        { t: 'text', x: 60, y: 24, text: 'S = sin x |  (−π/2; π/2)', size: 's' },
        { t: 'text', x: 60, y: 34, text: '= 1 − (−1)', size: 's' },
        { t: 'box', id: 'r', x: 60, y: 42, w: 34, h: 11, text: 'S = 2', color: 'green' }
      ],
      next: 'Manfiy qismi boʻlsa-chi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "3-misol: kosinus x ning 0 dan pi gacha aniq integrali: sinus pi minus sinus 0, yaʼni 0. Nega nol? Chunki grafikning yarmi Ox dan yuqorida, yarmi pastda, ular bir-birini yoʻqotadi. Demak, aniq integral har doim ham yuza emas. 4-misol: 2x kvadrat minus 3x plyus 4 ning minus 1 dan 2 gacha integrali 13,5 ga teng.",
      easy: "Ox dan pastdagi qism manfiy hisoblanadi, shuning uchun integral nol chiqishi mumkin.",
      draw: [
        { t: 'title', text: 'Integral va yuza' },
        { t: 'formula', x: 6, y: 20, text: '∫ cos x dx (0 dan π gacha) = 0' },
        { t: 'text', x: 6, y: 36, text: 'yuqori va pastki qismlar teng', size: 's', color: 'purple' },
        { t: 'formula', x: 6, y: 46, text: '∫₋₁² (2x² − 3x + 4) dx = 13,5' }
      ],
      next: 'Xossalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Aniq integralning xossalari. Bir: chegaralari teng boʻlsa, integral nolga teng. Ikki: chegaralar oʻrnini almashtirsak, ishora oʻzgaradi. Uch: a dan b gacha integral a dan c gacha va c dan b gacha integrallar yigʻindisiga teng. Toʻrt: juft funksiya uchun minus a dan a gacha integral 0 dan a gacha integralning ikki baravariga teng. Besh: f nomanfiy boʻlsa, integral ham nomanfiy.",
      easy: "Chegaralar teng — nol; almashtirsak — ishora oʻzgaradi; boʻlaklarga boʻlish mumkin; juft funksiyada yarmini ikkilaymiz.",
      draw: [
        { t: 'title', text: 'Xossalar' },
        { t: 'list', x: 6, y: 18, items: ['1) ∫ₐᵃ f dx = 0', '2) chegaralar almashsa, ishora oʻzgaradi', '3) ∫ₐᵇ = (a dan c gacha) + (c dan b gacha)', '4) juft f:  ∫₋ₐᵃ f dx = 2·∫₀ᵃ f dx', '5) f ≥ 0  →  ∫ₐᵇ f dx ≥ 0'] }
      ],
      next: 'Ravoqqa qaytamiz'
    },
    {
      kind: 'example',
      clear: true,
      say: "Endi ravoq. y teng 9 minus x kvadrat Ox oʻqini x teng minus 3 va x teng 3 da kesadi. Funksiya juft, shuning uchun S teng 2 karra 0 dan 3 gacha 9 minus x kvadrat. Boshlangʻich funksiya 9x minus x kub boʻlinsin 3. 3 da: 27 minus 9 teng 18. S teng 36 kvadrat desimetr — toʻgʻri toʻrtburchakning uchdan ikki qismi.",
      easy: "Juft funksiya: yarmini hisoblab ikkilaymiz. 18 karra 2 teng 36 kvadrat desimetr.",
      draw: [
        { t: 'title', text: 'Ravoq yuzi' },
        { t: 'list', x: 6, y: 20, items: ['9 − x² = 0  →  x = ±3', 'S = 2·∫₀³ (9 − x²) dx', '= 2·(9x − x³/3) |₀³ = 2·18'] },
        { t: 'box', id: 'r', x: 6, y: 50, w: 44, h: 12, text: 'S = 36 dm²', color: 'green' },
        { t: 'axes', id: 'g', x: 58, y: 16, w: 38, h: 44, xmin: -3.5, xmax: 3.5, ymin: 0, ymax: 10 },
        { t: 'curve', axes: 'g', points: ARCH, color: 'blue' },
        { t: 'curve', axes: 'g', points: vline(-2, 0, 5), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(-1, 0, 8), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(0, 0, 9), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(1, 0, 8), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(2, 0, 5), color: 'blue', dashed: true }
      ],
      next: 'Ikki chiziq orasida-chi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ikki chiziq orasidagi yuza: yuqoridagi funksiyadan pastdagini ayirib integrallaymiz. y teng x va y teng x kvadrat 0 va 1 nuqtalarda kesishadi, bu oraliqda y teng x yuqorida. S teng 0 dan 1 gacha x minus x kvadrat: yarim minus uchdan bir, yaʼni oltidan bir.",
      easy: "Yuqoridagidan pastdagini ayiramiz va integrallaymiz: yarim minus uchdan bir teng oltidan bir.",
      draw: [
        { t: 'title', text: 'Ikki chiziq orasida' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 46, h: 50, xmin: 0, xmax: 1.3, ymin: 0, ymax: 1.4, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: [[0, 0], [1.25, 1.25]], color: 'green' },
        { t: 'curve', axes: 'g', points: SQ, color: 'red' },
        { t: 'curve', axes: 'g', points: vline(0.3, 0.09, 0.3), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(0.5, 0.25, 0.5), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(0.7, 0.49, 0.7), color: 'blue', dashed: true },
        { t: 'formula', x: 56, y: 20, text: 'S = ∫ₐᵇ (f − g) dx' },
        { t: 'text', x: 56, y: 36, text: '∫₀¹ (x − x²) dx', size: 's' },
        { t: 'text', x: 56, y: 44, text: '= ½ − ⅓', size: 's' },
        { t: 'box', id: 'r', x: 56, y: 50, w: 30, h: 11, text: 'S = 1/6', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Egri chiziqli trapetsiya yuzi S = ∫ₐᵇ f(x) dx (f ≥ 0); Ox dan pastdagi qism integralda manfiy hisoblanadi.',
    'Xossalar: chegaralar teng — 0; chegaralar almashsa — ishora oʻzgaradi; integralni oraliq nuqtada boʻlaklarga boʻlish mumkin; juft funksiyada 2·∫₀ᵃ.',
    'Ikki chiziq orasidagi yuza: S = ∫ₐᵇ (f − g) dx, f — yuqoridagi funksiya.'
  ],
  questions: [
    {
      id: 'm26q1',
      prompt: '∫ sin x dx ni 0 dan π gacha hisoblang.',
      hint: 'F(x) = −cos x.',
      explanation: '−cos π − (−cos 0) = 1 + 1 = 2.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'm26q2',
      prompt: 'Ox oʻqi, x = −1, x = 2 toʻgʻri chiziqlar va y = 9 − x² parabola bilan chegaralangan shakl yuzini toping.',
      hint: 'F(x) = 9x − x³/3. F(2) − F(−1).',
      explanation: 'F(2) = 18 − 8/3, F(−1) = −9 + 1/3. Ayirma: 27 − 3 = 24.',
      widget: { type: 'number_answer', props: { answer: 24 } }
    },
    {
      id: 'm26q3',
      prompt: '∫ x³ dx ni −2 dan 2 gacha hisoblang.',
      hint: 'x³ — toq funksiya.',
      explanation: 'x⁴/4: 4 − 4 = 0. Toq funksiyaning simmetrik oraliqdagi integrali 0.',
      widget: { type: 'number_answer', props: { answer: 0 } }
    },
    {
      id: 'm26q4',
      prompt: '∫₀² x dx = 2 va ∫₂⁵ x dx = 10,5. ∫₀⁵ x dx nechaga teng?',
      hint: 'Additivlik xossasi.',
      explanation: '2 + 10,5 = 12,5. Tekshirish: 25/2 = 12,5.',
      widget: { type: 'number_answer', props: { answer: 12.5, tolerance: 0.001 } }
    },
    {
      id: 'm26q5',
      prompt: 'Qaysi integral nolga teng EMAS? Ortiqchasini bosing.',
      hint: 'Ox dan yuqori va pastki qismlar teng boʻlsa, integral 0.',
      explanation: '∫ sin x dx (0 dan π gacha) = 2. Qolganlari 0.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: '∫₋₁¹ x dx' }, { text: '∫₋₂² x³ dx' }, { text: '∫ cos x dx, 0 … π' }, { text: '∫ sin x dx, 0 … π', odd: true }] } }
    },
    {
      id: 'm26q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Xossalarni eslang.',
      explanation: 'Chegaralar teng — 0; almashsa ishora oʻzgaradi; juft funksiyada 2·∫₀ᵃ; aniq integral har doim ham yuza emas.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '∫ₐᵃ f(x) dx = 0.', value: true },
            { text: 'Chegaralar oʻrni almashsa, integral oʻzgarmaydi.', value: false },
            { text: 'Juft f uchun ∫₋ₐᵃ f dx = 2·∫₀ᵃ f dx.', value: true },
            { text: 'Aniq integral har doim shakl yuziga teng.', value: false }
          ]
        }
      }
    },
    {
      id: 'm26q7',
      prompt: 'y = x² va y = x chiziqlar orasidagi yuzani toping (oʻnli kasr, 0,01 aniqlikda).',
      hint: '∫₀¹ (x − x²) dx.',
      explanation: '½ − ⅓ = 1/6 ≈ 0,17.',
      widget: { type: 'number_answer', props: { answer: 0.1667, tolerance: 0.01 } }
    },
    {
      id: 'm26q8',
      prompt: 'Yuzani hisoblash qadamlarini tartiblang.',
      hint: 'Avval chegaralar.',
      explanation: 'Kesishish nuqtalari → qaysi funksiya yuqorida → integral tuzish → Nyuton–Leybnis.',
      widget: {
        type: 'step_order',
        props: { steps: ['Kesishish nuqtalarini (chegaralarni) toping', 'Qaysi funksiya yuqorida ekanini aniqlang', 'S = ∫ₐᵇ (f − g) dx ni tuzing', 'Nyuton–Leybnis formulasi bilan hisoblang'] }
      }
    }
  ]
};
