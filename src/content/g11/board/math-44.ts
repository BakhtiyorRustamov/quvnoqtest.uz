import type { BoardLesson } from './types';

const LAKE: [number, number][] = [[0, 2], [0.5, 2.601], [1, 2.895], [1.5, 2.785], [2, 2.447], [2.5, 2.213], [3, 2.345], [3.5, 2.854], [4, 3.496], [4.5, 3.938], [5, 3.979]];
const E: [number, number][] = [[0, 1], [0.1, 0.99], [0.2, 0.961], [0.3, 0.914], [0.4, 0.852], [0.5, 0.779], [0.6, 0.698], [0.7, 0.613], [0.8, 0.527], [0.9, 0.445], [1, 0.368]];
const f = (x: number) => 2 + 0.6 * Math.sin(1.7 * x) + 0.3 * x;
/** chap uchli toʻgʻri toʻrtburchaklar (5 ta) — har bir kesma alohida toʻgʻri chiziq */
const RECTS: [number, number][][] = [0, 1, 2, 3, 4].flatMap((i) => {
  const h = +f(i).toFixed(3);
  return [
    [[i, 0], [i, h]],
    [[i, h], [i + 1, h]],
    [[i + 1, h], [i + 1, 0]]
  ] as [number, number][][];
});
/** trapetsiyalar: uchlari grafikda */
const TRAPS: [number, number][][] = [0, 1, 2, 3, 4].flatMap((i) => {
  const a = +f(i).toFixed(3);
  const b = +f(i + 1).toFixed(3);
  return [
    [[i, 0], [i, a]],
    [[i, a], [i + 1, b]],
    [[i + 1, b], [i + 1, 0]]
  ] as [number, number][][];
});

/** Darslik (2-qism): 51-mavzu (10–13-betlar) — taqribiy integrallash. */
export const MATH_44: BoardLesson = {
  n: 44,
  label: '51',
  part: 'algebra',
  qism: 2,
  title: 'Integralni taqribiy hisoblash usullari',
  section: '51',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Xaritada koʻlning qirgʻogʻi egri-bugri. Uning yuzini qanday topamiz? Koʻlni ingichka tasmalarga boʻlib, har birini toʻgʻri toʻrtburchak deb hisoblaymiz va qoʻshamiz. Integralda ham shunday: boshlangʻich funksiyani topib boʻlmasa, yuzani taqribiy hisoblaymiz.",
      easy: "Boshlangʻich funksiya topilmasa, yuzani boʻlaklarga boʻlib taxminan hisoblaymiz.",
      draw: [
        { t: 'title', text: 'Koʻl yuzi' },
        { t: 'icon', x: 12, y: 30, emoji: '🗺️', size: 'l' },
        { t: 'axes', id: 'g', x: 30, y: 14, w: 62, h: 48, xmin: 0, xmax: 5.3, ymin: 0, ymax: 4.3 },
        { t: 'curve', axes: 'g', points: LAKE, color: 'blue' },
        ...RECTS.map((points) => ({ t: 'curve' as const, axes: 'g', points, color: 'orange' as const }))
      ],
      next: 'Toʻgʻri toʻrtburchaklar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "a dan b gacha kesmani n ta teng boʻlakka boʻlamiz, har birining uzunligi delta x teng b minus a boʻlinsin n. Har bir boʻlakda balandligi chap uchdagi qiymat boʻlgan toʻgʻri toʻrtburchak olamiz. Yuzalar yigʻindisi: b minus a boʻlinsin n karra f(a) plyus f(x1) plyus ... plyus f(x n minus 1). Bu toʻgʻri toʻrtburchaklar formulasi.",
      easy: "Har bir boʻlakda chap uchdagi balandlikni olib, yuzalarni qoʻshamiz.",
      draw: [
        { t: 'title', text: 'Toʻgʻri toʻrtburchaklar formulasi' },
        { t: 'formula', x: 6, y: 20, text: '∫ₐᵇ f dx ≈ (b − a)/n · (f(a) + f(x₁) + … + f(xₙ₋₁))' },
        { t: 'list', x: 6, y: 38, items: ['Δx = (b − a)/n', 'balandlik — chap uchdagi qiymat', 'oʻng uch yoki oʻrta nuqta ham boʻladi'] }
      ],
      next: 'Trapetsiyalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Aniqroq usul: grafikdagi qoʻshni nuqtalarni toʻgʻri chiziq bilan tutashtiramiz — har bir boʻlak trapetsiyaga aylanadi. Trapetsiyalar yuzalari yigʻindisi: b minus a boʻlinsin n karra f(a) plyus f(b) boʻlinsin 2 plyus ichki nuqtalardagi qiymatlar yigʻindisi. Bu trapetsiyalar formulasi.",
      easy: "Toʻrtburchak oʻrniga trapetsiya olamiz — natija aniqroq chiqadi.",
      draw: [
        { t: 'title', text: 'Trapetsiyalar formulasi' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 44, h: 48, xmin: 0, xmax: 5.3, ymin: 0, ymax: 4.3 },
        { t: 'curve', axes: 'g', points: LAKE, color: 'blue' },
        ...TRAPS.map((points) => ({ t: 'curve' as const, axes: 'g', points, color: 'green' as const })),
        { t: 'formula', x: 54, y: 22, text: '(b − a)/n · ((f(a) + f(b))/2' },
        { t: 'text', x: 56, y: 36, text: '+ f(x₁) + … + f(xₙ₋₁))', size: 's' },
        { t: 'text', x: 56, y: 52, text: 'aniqroq natija', color: 'green' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 1-misol: e ning minus x kvadrat darajasi integrali, 0 dan 1 gacha. Bu funksiyaning boshlangʻich funksiyasini topib boʻlmaydi. Kesmani 5 ga boʻlamiz, qadam 0,2. Toʻgʻri toʻrtburchaklar formulasi taxminan 0,887, trapetsiyalar formulasi 0,744 beradi. Aniq qiymat 0,7468 — trapetsiyalar ancha yaqin.",
      easy: "5 ta boʻlakda: toʻrtburchaklar 0,887, trapetsiyalar 0,744. Aniq qiymat 0,747.",
      draw: [
        { t: 'title', text: '∫₀¹ e^{−x²} dx' },
        { t: 'axes', id: 'g', x: 56, y: 14, w: 40, h: 34, xmin: 0, xmax: 1.05, ymin: 0, ymax: 1.1 },
        { t: 'curve', axes: 'g', points: E, color: 'red' },
        { t: 'list', x: 6, y: 20, items: ['Δx = 0,2', 'toʻrtburchaklar: ≈ 0,887', 'trapetsiyalar: ≈ 0,744', 'aniq: 0,7468'] }
      ],
      next: 'π ni topamiz'
    },
    {
      kind: 'example',
      clear: true,
      say: "2-misol: 1 boʻlinsin 1 plyus x kvadrat ning integrali, 0 dan 1 gacha. Kesmani 10 ga boʻlib, har bir boʻlakning oʻrtasidagi qiymatni olamiz. Yigʻindi 7,8561, qadamga koʻpaytirsak 0,7856. Aniq qiymat esa arktangens 1, yaʼni pi boʻlinsin 4, 0,7854. Xato bor-yoʻgʻi 0,0002! Shunday qilib, pi ni ham taqribiy integrallash bilan topish mumkin.",
      easy: "Oʻrta nuqtalar usuli 0,7856 berdi, aniq qiymat π/4 = 0,7854.",
      draw: [
        { t: 'title', text: '∫₀¹ dx/(1 + x²) = π/4' },
        { t: 'list', x: 6, y: 20, items: ['n = 10, oʻrta nuqtalar', 'yigʻindi: 7,8561', '0,1 · 7,8561 ≈ 0,7856'] },
        { t: 'box', id: 'r', x: 6, y: 48, w: 48, h: 12, text: 'π/4 ≈ 0,7854, xato 0,0002', color: 'green' }
      ],
      next: 'Kichik misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Oddiy misolda solishtiraylik: x kvadrat ning 0 dan 2 gacha integrali, n teng 2, qadam 1. Chap uchlar: 0 plyus 1 teng 1. Oʻng uchlar: 1 plyus 4 teng 5. Oʻrta nuqtalar: 0,25 plyus 2,25 teng 2,5. Trapetsiyalar: 0 plyus 4 boʻlinsin 2 plyus 1 teng 3. Aniq qiymat 8 boʻlinsin 3, taxminan 2,67.",
      easy: "x² uchun 0 dan 2 gacha: chap 1, oʻng 5, oʻrta 2,5, trapetsiya 3; aniq 2,67.",
      draw: [
        { t: 'title', text: 'Usullarni solishtiramiz' },
        {
          t: 'table',
          x: 10,
          y: 18,
          rows: [
            ['usul', 'natija'],
            ['chap uchlar', '1'],
            ['oʻng uchlar', '5'],
            ['oʻrta nuqtalar', '2,5'],
            ['trapetsiyalar', '3'],
            ['aniq: 8/3', '≈ 2,67']
          ]
        }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Boshlangʻich funksiya topilmasa, integral taqribiy hisoblanadi: kesma n ta teng boʻlakka boʻlinadi, Δx = (b − a)/n.',
    'Toʻgʻri toʻrtburchaklar formulasi (chap, oʻng uch yoki oʻrta nuqta) va trapetsiyalar formulasi.',
    'Boʻlaklar koʻpaysa, natija aniqroq; oʻrta nuqta va trapetsiyalar odatda aniqroq.'
  ],
  questions: [
    {
      id: 'p44q1',
      prompt: '∫₀² x² dx ni n = 2 boʻlakda chap uchlar formulasi bilan hisoblang.',
      hint: 'Δx = 1. f(0) + f(1).',
      explanation: '1 · (0 + 1) = 1.',
      widget: { type: 'number_answer', props: { answer: 1 } }
    },
    {
      id: 'p44q2',
      prompt: 'Oʻsha integral, n = 2, trapetsiyalar formulasi bilan?',
      hint: '1 · ((f(0) + f(2))/2 + f(1)).',
      explanation: '(0 + 4)/2 + 1 = 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'p44q3',
      prompt: 'Oʻsha integral, n = 2, oʻrta nuqtalar formulasi bilan?',
      hint: 'f(0,5) + f(1,5).',
      explanation: '0,25 + 2,25 = 2,5.',
      widget: { type: 'number_answer', props: { answer: 2.5, tolerance: 0.001 } }
    },
    {
      id: 'p44q4',
      prompt: '[1; 3] kesma n = 4 boʻlakka boʻlindi. Δx nechaga teng?',
      hint: '(b − a)/n.',
      explanation: '(3 − 1)/4 = 0,5.',
      widget: { type: 'number_answer', props: { answer: 0.5, tolerance: 0.001 } }
    },
    {
      id: 'p44q5',
      prompt: '∫₀² x² dx ning natijalarini aniq qiymat (8/3) ga yaqinligi boʻyicha tartiblang: eng yaqinidan eng uzogʻigacha.',
      hint: 'Farqlar: 0,17; 0,33; 1,67; 2,33.',
      explanation: 'Oʻrta (2,5) → trapetsiya (3) → chap (1) → oʻng (5).',
      widget: { type: 'order_line', props: { items: [{ label: 'oʻrta nuqtalar: 2,5' }, { label: 'trapetsiyalar: 3' }, { label: 'chap uchlar: 1' }, { label: 'oʻng uchlar: 5' }] } }
    },
    {
      id: 'p44q6',
      prompt: 'Taqribiy integrallash qadamlarini tartiblang.',
      hint: 'Avval qadamni topamiz.',
      explanation: 'Δx ni topish → boʻlinish nuqtalari → funksiya qiymatlari → formula boʻyicha yigʻish.',
      widget: { type: 'step_order', props: { steps: ['Δx = (b − a)/n ni toping', 'Boʻlinish nuqtalarini yozing', 'Ulardagi f(x) qiymatlarini hisoblang', 'Formula boʻyicha yigʻindini toping'] } }
    },
    {
      id: 'p44q7',
      prompt: 'Har bir usulga uning boʻlagidagi shaklni moslang.',
      hint: 'Grafikni nima bilan almashtiramiz?',
      explanation: 'Chap/oʻng uch — toʻgʻri toʻrtburchak; trapetsiyalar — trapetsiya; oʻrta nuqta — toʻgʻri toʻrtburchak (oʻrtadagi balandlik).',
      widget: {
        type: 'match_pairs',
        props: { pairs: [{ left: 'Chap uchlar', right: 'balandlik f(xₖ)' }, { left: 'Oʻng uchlar', right: 'balandlik f(xₖ₊₁)' }, { left: 'Oʻrta nuqtalar', right: 'balandlik — oʻrtadagi qiymat' }, { left: 'Trapetsiyalar', right: 'asoslari f(xₖ) va f(xₖ₊₁)' }] }
      }
    },
    {
      id: 'p44q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'e^{−x²} misolini eslang.',
      explanation: 'e^{−x²} ning boshlangʻich funksiyasi elementar emas; n oshsa aniqlik oshadi; trapetsiya odatda toʻrtburchakdan aniq; π/4 ni ham taqribiy topish mumkin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Boʻlaklar soni oshsa, natija aniqroq boʻladi.', value: true },
            { text: 'Taqribiy formulalar faqat boshlangʻich funksiya maʼlum boʻlganda ishlaydi.', value: false },
            { text: '∫₀¹ dx/(1 + x²) = π/4.', value: true },
            { text: 'Trapetsiyalar formulasi har doim aniq javob beradi.', value: false }
          ]
        }
      }
    }
  ]
};
