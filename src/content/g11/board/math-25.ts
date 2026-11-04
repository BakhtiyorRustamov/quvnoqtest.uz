import type { BoardLesson } from './types';

/** y = 1,5 + 0,8·sin 1,3x + 0,15x — "kanal qirgʻogʻi" */
const PLOT: [number, number][] = [[0, 1.5], [0.5, 2.059], [1, 2.421], [1.5, 2.468], [2, 2.212], [2.5, 1.788], [3, 1.4], [3.5, 1.236], [4, 1.393], [4.5, 1.839], [5, 2.422], [5.5, 2.935], [6, 3.199]];
/** 4 ta toʻgʻri toʻrtburchak (integral yigʻindi) — har bir kesma alohida, toʻgʻri chiziq boʻlib chizilsin */
const HEIGHTS = [2.468, 1.788, 1.236, 1.839];
const STEPS: [number, number][][] = HEIGHTS.flatMap((h, i) => [
  [[1 + i, 0], [1 + i, h]],
  [[1 + i, h], [2 + i, h]],
  [[2 + i, h], [2 + i, 0]]
] as [number, number][][]);
const X2: [number, number][] = [[0, 0], [0.5, 0.25], [1, 1], [1.5, 2.25], [2, 4], [2.5, 6.25], [3, 9], [3.5, 12.25], [4, 16], [4.3, 18.49]];
const vline = (x: number, y: number): [number, number][] => [[x, 0], [x, y]];

/** Darslik: 44–46-mavzu (96–99-betlar) — egri chiziqli trapetsiya, aniq integral. */
export const MATH_25: BoardLesson = {
  n: 25,
  label: "44–45",
  part: 'algebra',
  title: "Egri chiziqli trapetsiya va aniq integral",
  section: '44–46',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Fermerning yer maydoni toʻrt tomondan chegaralangan: pastda toʻgʻri yoʻl, ikki yonda toʻgʻri ariqlar, tepada esa egri-bugri kanal qirgʻogʻi. Toʻgʻri toʻrtburchak boʻlganida yuzani boʻyini eniga koʻpaytirib topardik. Egri tomon boʻlsa-chi? Bugun shunday yuzani integral bilan topamiz.",
      easy: "Uch tomoni toʻgʻri, bitta tomoni egri. Bunday yuzani integral topadi.",
      draw: [
        { t: 'title', text: 'Egri qirgʻoqli dala' },
        { t: 'icon', x: 10, y: 30, emoji: '🌾', size: 'l' },
        { t: 'axes', id: 'g', x: 26, y: 14, w: 68, h: 46, xmin: 0, xmax: 6, ymin: 0, ymax: 3.5, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: PLOT, color: 'blue' },
        { t: 'curve', axes: 'g', points: vline(1, 2.421), color: 'green' },
        { t: 'curve', axes: 'g', points: vline(5, 2.422), color: 'green' },
        { t: 'text', x: 26, y: 67, text: 'Yuzasi qancha?', color: 'purple' }
      ],
      next: 'Bu shakl nima deyiladi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yuqoridan y teng f(x) grafigi, pastdan a dan b gacha boʻlgan kesma, yon tomonlardan x teng a va x teng b toʻgʻri chiziqlar bilan chegaralangan shakl egri chiziqli trapetsiya deyiladi. a dan b gacha boʻlgan kesma uning asosi. Bu yerda f(x) musbat va uzluksiz deb olinadi.",
      easy: "Tepada grafik, pastda Ox oʻqi, yonlarda ikki vertikal chiziq — egri chiziqli trapetsiya.",
      draw: [
        { t: 'title', text: 'Egri chiziqli trapetsiya' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 52, h: 50, xmin: 0, xmax: 6, ymin: 0, ymax: 3.5, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: PLOT, color: 'red' },
        { t: 'curve', axes: 'g', points: vline(1, 2.421), color: 'ink' },
        { t: 'curve', axes: 'g', points: vline(5, 2.422), color: 'ink' },
        { t: 'dot', axes: 'g', x: 1, y: 0, label: 'a', color: 'blue' },
        { t: 'dot', axes: 'g', x: 5, y: 0, label: 'b', color: 'blue' },
        { t: 'list', x: 62, y: 22, items: ['tepada: y = f(x)', 'yonda: x = a, x = b', 'pastda: Ox oʻqi'] }
      ],
      next: 'Yuzani qanday hisoblaymiz?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Birinchi gʻoya: shaklni ingichka toʻgʻri toʻrtburchaklarga boʻlamiz. Har birining eni delta x, boʻyi f ning biror nuqtadagi qiymati. Ularning yigʻindisi — integral yigʻindi — yuzaga taxminan teng. Toʻrtburchaklar qancha koʻp va ingichka boʻlsa, yigʻindi haqiqiy yuzaga shuncha yaqin.",
      easy: "Shaklni ustunchalarga boʻlib, yuzalarini qoʻshamiz. Ustunchalar ingichkalashsa, javob aniqlashadi.",
      draw: [
        { t: 'title', text: 'Integral yigʻindi' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 52, h: 50, xmin: 0, xmax: 6, ymin: 0, ymax: 3.5, xlabel: 'x', ylabel: 'y' },
        ...STEPS.map((points) => ({ t: 'curve' as const, axes: 'g', points, color: 'blue' as const })),
        { t: 'curve', axes: 'g', points: PLOT, color: 'red' },
        { t: 'formula', x: 62, y: 22, text: 'S ≈ Σ f(ξₖ)·Δxₖ' },
        { t: 'text', x: 62, y: 42, text: 'Koʻproq ustun →', size: 's' },
        { t: 'text', x: 62, y: 50, text: 'aniqroq yuza', color: 'green' }
      ],
      next: 'Aniq formula bormi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikkinchi gʻoya: S(x) deb a dan x gacha boʻlgan yuzani belgilaymiz. x ni kichik h ga surganda yuza taxminan f(x) karra h ga oshadi. Bundan S shtrix x teng f(x) — yuza funksiyasi f ning boshlangʻich funksiyasi ekan! S(a) teng 0 boʻlgani uchun butun yuza S teng F(b) minus F(a), bu yerda F — istalgan boshlangʻich funksiya.",
      easy: "Yuza funksiyasining hosilasi f(x) ga teng. Shuning uchun yuza: F(b) minus F(a).",
      draw: [
        { t: 'title', text: 'Yuza va boshlangʻich funksiya' },
        { t: 'list', x: 6, y: 20, items: ['S(x + h) − S(x) ≈ f(x)·h', 'S′(x) = f(x)', 'S(a) = 0'] },
        { t: 'box', id: 'r', x: 6, y: 48, w: 52, h: 12, text: 'S = F(b) − F(a)', color: 'green' }
      ],
      next: 'Aniq integral'
    },
    {
      kind: 'explain',
      clear: true,
      say: "F(b) minus F(a) ayirma f(x) funksiyaning a dan b gacha aniq integrali deyiladi va integral belgisining pastiga a, tepasiga b yozib belgilanadi. Bu Nyuton–Leybnis formulasi. Hisoblashda qisqa yozuv ishlatiladi: F(x) va chiziqcha, pastida a, tepasida b. Aniqmas integral — funksiyalar, aniq integral esa — son.",
      easy: "Aniq integral — bitta son: F(b) minus F(a). Aniqmas integral esa funksiyalar toʻplami.",
      draw: [
        { t: 'title', text: 'Nyuton–Leybnis formulasi' },
        { t: 'formula', x: 10, y: 22, text: '∫ₐᵇ f(x) dx = F(b) − F(a)' },
        { t: 'text', x: 10, y: 40, text: 'Qisqa yozuv:  F(x) |ₐᵇ', color: 'blue' },
        { t: 'text', x: 10, y: 54, text: 'Aniq integral — son!', color: 'red' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "1-misol: y teng x kvadrat, x teng 1 va x teng 4 chiziqlar hamda Ox oʻqi bilan chegaralangan shaklning yuzi. S teng 1 dan 4 gacha x kvadrat dx. Boshlangʻich funksiya x kub boʻlinsin 3. S teng 64 boʻlinsin 3 minus 1 boʻlinsin 3, yaʼni 63 boʻlinsin 3, 21 kvadrat birlik.",
      easy: "x kub boʻlinsin 3 ni 4 va 1 da hisoblab ayiramiz: 63 boʻlinsin 3 teng 21.",
      draw: [
        { t: 'title', text: '1-misol' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 40, h: 52, xmin: 0, xmax: 4.5, ymin: 0, ymax: 18, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: X2, color: 'red' },
        { t: 'curve', axes: 'g', points: vline(1, 1), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(1.5, 2.25), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(2, 4), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(2.5, 6.25), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(3, 9), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(3.5, 12.25), color: 'blue', dashed: true },
        { t: 'curve', axes: 'g', points: vline(4, 16), color: 'blue' },
        { t: 'formula', x: 52, y: 20, text: 'S = ∫₁⁴ x² dx' },
        { t: 'text', x: 52, y: 36, text: '= x³/3 |₁⁴ = (64 − 1)/3', size: 's' },
        { t: 'box', id: 'r', x: 52, y: 46, w: 40, h: 11, text: 'S = 21 kv. birlik', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Egri chiziqli trapetsiya: tepadan y = f(x), yonlardan x = a, x = b, pastdan Ox oʻqi bilan chegaralangan shakl.',
    'Uning yuzi S = F(b) − F(a), bu yerda F — f ning boshlangʻich funksiyasi.',
    'Nyuton–Leybnis formulasi: ∫ₐᵇ f(x) dx = F(b) − F(a). Aniq integral — son.'
  ],
  questions: [
    {
      id: 'm25q1',
      prompt: '∫ 3x² dx ni 0 dan 2 gacha hisoblang.',
      hint: 'F(x) = x³. F(2) − F(0).',
      explanation: '8 − 0 = 8.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'm25q2',
      prompt: '∫ 2x dx ni 0 dan 3 gacha hisoblang.',
      hint: 'F(x) = x².',
      explanation: '9 − 0 = 9.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'm25q3',
      prompt: '∫ dx/x² ni 1 dan 2 gacha hisoblang (oʻnli kasrda).',
      hint: 'F(x) = −1/x.',
      explanation: '−1/2 − (−1) = 0,5.',
      widget: { type: 'number_answer', props: { answer: 0.5, tolerance: 0.001 } }
    },
    {
      id: 'm25q4',
      prompt: 'Nyuton–Leybnis formulasi bilan hisoblash qadamlarini tartiblang.',
      hint: 'Avval boshlangʻich funksiya.',
      explanation: 'F(x) ni topish → F(b) → F(a) → F(b) − F(a).',
      widget: {
        type: 'step_order',
        props: { steps: ['Boshlangʻich funksiya F(x) ni toping', 'F(b) ni hisoblang', 'F(a) ni hisoblang', 'F(b) − F(a) ni toping'] }
      }
    },
    {
      id: 'm25q5',
      prompt: 'y = x toʻgʻri chiziq, x = 4 va Ox oʻqi bilan chegaralangan uchburchak yuzini integral bilan toping.',
      hint: '∫ x dx 0 dan 4 gacha.',
      explanation: 'x²/2 |₀⁴ = 8. Tekshirish: uchburchak ½ · 4 · 4 = 8.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'm25q6',
      prompt: 'Formulani toʻldiring.',
      hint: 'Yuqori chegaradan quyi chegara ayiriladi.',
      explanation: '∫ₐᵇ f(x) dx = F(b) − F(a).',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: '∫ₐᵇ f(x) dx = ' }, { blank: 'F(b)' }, { text: ' − ' }, { blank: 'F(a)' }],
          bank: ['F(b)', 'F(a)', 'f(b)', 'f(a)', 'C']
        }
      }
    },
    {
      id: 'm25q7',
      prompt: 'Integrallarni qiymati kichigidan kattasiga qarab tartiblang.',
      hint: 'Har birini hisoblang: 0,5; 1; 2; 9.',
      explanation: '∫₀¹ x dx = 0,5;  ∫₀¹ 1 dx = 1;  ∫₀² x dx = 2;  ∫₀³ x² dx = 9.',
      widget: { type: 'order_line', props: { items: [{ label: '∫₀¹ x dx' }, { label: '∫₀¹ 1 dx' }, { label: '∫₀² x dx' }, { label: '∫₀³ x² dx' }] } }
    },
    {
      id: 'm25q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Aniq va aniqmas integralni farqlang.',
      explanation: 'Aniq integral — son, C ga bogʻliq emas; aniqmas — funksiyalar toʻplami. Ustunlar koʻpaysa, yigʻindi yuzaga yaqinlashadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Aniq integral — son.', value: true },
            { text: 'Aniq integral qiymati C ga bogʻliq.', value: false },
            { text: 'Ustunlar soni ortsa, integral yigʻindi yuzaga yaqinlashadi.', value: true },
            { text: 'Aniqmas integral ham bitta son.', value: false }
          ]
        }
      }
    }
  ]
};
