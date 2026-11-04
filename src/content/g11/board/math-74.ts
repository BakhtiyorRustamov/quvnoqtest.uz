import type { BoardLesson } from './types';
import { cylinder, sector } from './geo3d';

/** Darslik (2-qism): Geometriya, 14.1 (155–156-betlar) — Kavalyeri prinsipi, sharning hajmi. */
export const MATH_74: BoardLesson = {
  n: 74,
  label: '14.1',
  part: 'geometriya',
  qism: 2,
  title: 'Sharning hajmini topish',
  section: 'Geometriya, 14.1',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Tangalar ustunini olaylik. Uni tekis qoʻysak ham, qiyshaytirib qoʻysak ham hajmi oʻzgarmaydi — chunki har bir qavat bir xil tanga. Bu oddiy kuzatish — Kavalyeri prinsipi: ikki jismni parallel tekisliklar bilan kesganda har doim teng yuzli kesimlar hosil boʻlsa, ularning hajmlari teng. Shu prinsip yordamida shar hajmini topamiz.",
      easy: "Kesimlari teng yuzli jismlarning hajmlari teng — Kavalyeri prinsipi.",
      draw: [
        { t: 'title', text: 'Kavalyeri prinsipi' },
        { t: 'icon', x: 14, y: 34, emoji: '📚', size: 'l' },
        ...cylinder('a', 34, 26, 8, 30, 'blue'),
        { t: 'point', id: 'b1', x: 52, y: 56, hide: true },
        { t: 'point', id: 'b2', x: 68, y: 56, hide: true },
        { t: 'point', id: 'b3', x: 78, y: 26, hide: true },
        { t: 'point', id: 'b4', x: 62, y: 26, hide: true },
        { t: 'polygon', points: ['b1', 'b2', 'b3', 'b4'], color: 'orange' },
        { t: 'text', x: 50, y: 64, text: 'kesimlar teng → hajmlar teng', anchor: 'middle', size: 's', color: 'green' }
      ],
      next: 'Yarim shar va silindr'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Radiusi R boʻlgan yarim shar va yonida radiusi R, balandligi R boʻlgan silindr turibdi. Silindrdan uchi pastki asos markazida boʻlgan konusni olib tashlaymiz. Asosdan x balandlikda kesamiz. Yarim shar kesimi — radiusi ildiz R kvadrat minus x kvadrat boʻlgan doira, yuzi pi karra R kvadrat minus x kvadrat. Ikkinchi jism kesimi — tashqi radiusi R, ichki radiusi x boʻlgan halqa, yuzi ham xuddi shunday!",
      easy: "Ikkala kesim yuzi π(R² − x²): yarim shar = silindr − konus.",
      draw: [
        { t: 'title', text: 'Teng kesimlar' },
        { t: 'ellipse', cx: 22, cy: 56, rx: 16, ry: 5, dashedBack: true, color: 'blue' },
        ...sector('hs', 22, 56, 16, 0, 180, 'blue'),
        ...cylinder('c', 66, 40, 16, 16, 'ink'),
        { t: 'point', id: 'cA', x: 66, y: 56, hide: true },
        { t: 'line', from: 'cA', to: 'ct0', color: 'red' },
        { t: 'line', from: 'cA', to: 'ct12', color: 'red' },
        { t: 'text', x: 22, y: 30, text: 'π(R² − x²)', anchor: 'middle', size: 's', color: 'blue' },
        { t: 'text', x: 66, y: 30, text: 'πR² − πx²', anchor: 'middle', size: 's', color: 'red' }
      ],
      next: 'Formula'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kavalyeri prinsipiga koʻra yarim shar hajmi silindr hajmi minus konus hajmiga teng: pi R kvadrat karra R minus uchdan bir pi R kvadrat karra R, yaʼni uchdan ikki pi R kub. Butun shar ikki marta katta: V teng uchdan toʻrt pi R kub.",
      easy: "V yarim shar = πR³ − ⅓πR³ = ⅔πR³. V shar = 4/3 πR³.",
      draw: [
        { t: 'title', text: 'Shar hajmi' },
        { t: 'list', x: 6, y: 20, items: ['V yarim = πR² · R − ⅓ πR² · R', 'V yarim = ⅔ π R³'] },
        { t: 'formula', x: 6, y: 44, text: 'V = 4/3 · π R³' },
        { t: 'ellipse', cx: 76, cy: 40, rx: 16, ry: 16, color: 'blue' },
        { t: 'ellipse', cx: 76, cy: 40, rx: 16, ry: 4.8, dashedBack: true, color: 'blue' }
      ],
      next: 'Misollar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Radiusi 3 boʻlgan shar hajmi: uchdan toʻrt pi karra 27, yaʼni 36 pi. Sharning diametrini 2 marta oshirsak, hajmi 2 kub, ya'ni 8 marta oshadi. Hajmi 8 kub metr boʻlgan kubga ichki chizilgan shar: kub qirrasi 2, shar radiusi 1, hajmi uchdan toʻrt pi, taxminan 4,19 kub metr.",
      easy: "R = 3 → 36π. Diametr 2 marta → hajm 8 marta. Kubdagi shar: 4/3 π ≈ 4,19.",
      draw: [
        { t: 'title', text: 'Hisoblaymiz' },
        { t: 'list', x: 6, y: 20, items: ['R = 3: V = 4/3 π · 27 = 36π', 'diametr ×2 → hajm ×8', 'kub V = 8: a = 2, R = 1, V shar ≈ 4,19'] }
      ],
      next: 'Arximed teoremasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Arximed oʻz qabriga shar ichki chizilgan silindr rasmini chizishni vasiyat qilgan. Uning kashfiyoti: shar hajmi unga tashqi chizilgan silindr hajmining uchdan ikki qismi. Silindr hajmi pi R kvadrat karra 2R, yaʼni 2 pi R kub, uning uchdan ikkisi — uchdan toʻrt pi R kub. Demak, shar hajmi 24 boʻlsa, silindr 36.",
      easy: "V shar = ⅔ V silindr (tashqi chizilgan). Shar 24 → silindr 36.",
      draw: [
        { t: 'title', text: 'Arximed teoremasi' },
        ...cylinder('s', 26, 24, 16, 32, 'ink'),
        { t: 'ellipse', cx: 26, cy: 40, rx: 16, ry: 16, color: 'blue' },
        { t: 'formula', x: 52, y: 24, text: 'V shar = ⅔ · V silindr' },
        { t: 'list', x: 52, y: 40, items: ['2πR³ · ⅔ = 4/3 πR³', 'shar 24 → silindr 36'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Kavalyeri prinsipi: parallel kesimlari teng yuzli jismlarning hajmlari teng.',
    'Shar hajmi V = 4/3 π R³; radius k marta oshsa, hajm k³ marta oshadi.',
    'Arximed: shar hajmi tashqi chizilgan silindr hajmining ⅔ qismi.'
  ],
  questions: [
    {
      id: 'g74q1',
      prompt: 'Diametri 2 marta kattalashtirilgan shar hajmi necha marta kattalashadi?',
      hint: 'k³.',
      explanation: '2³ = 8.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'g74q2',
      prompt: 'Radiusi 6 boʻlgan shar hajmi k·π. k = ?',
      hint: '4/3 · 216.',
      explanation: '288π.',
      widget: { type: 'number_answer', props: { answer: 288 } }
    },
    {
      id: 'g74q3',
      prompt: 'Shar markazidan 6 cm masofadagi kesim yuzi 64π cm². Shar hajmi k·π. k = ? (0,01 gacha)',
      hint: 'r = 8, R = 10.',
      explanation: 'V = 4/3 π · 1000 ≈ 1333,33π.',
      widget: { type: 'number_answer', props: { answer: 1333.33, tolerance: 0.02 } }
    },
    {
      id: 'g74q4',
      prompt: 'Silindr sharga tashqi chizilgan, shar hajmi 24. Silindr hajmi?',
      hint: 'V shar = ⅔ V silindr.',
      explanation: '24 · 3/2 = 36.',
      widget: { type: 'number_answer', props: { answer: 36 } }
    },
    {
      id: 'g74q5',
      prompt: 'Radiuslari 3, 4 va 5 boʻlgan mis sharlar eritilib, bitta shar quyildi. Uning radiusi?',
      hint: '27 + 64 + 125 = R³.',
      explanation: 'R³ = 216 → R = 6.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'g74q6',
      prompt: 'Radiusi 3 cm va 5 cm boʻlgan sharlar bir pallaga, radiusi 8 cm shar ikkinchi pallaga qoʻyildi (material bir xil). Qaysi palla ogʻir?',
      hint: '3³ + 5³ va 8³ ni solishtiring.',
      explanation: '27 + 125 = 152 < 512 — ikkinchi palla.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Birinchi palla (3 va 5 cm)', 'Ikkinchi palla (8 cm)', 'Teng', 'Aniqlab boʻlmaydi'], answerIndex: 1 } }
    },
    {
      id: 'g74q7',
      prompt: 'Balandligi diametriga teng silindr shaklidagi taxtadan eng katta shar yoʻnildi. Taxtaning necha foizi chiqitga ketdi? (0,1 gacha)',
      hint: 'Shar — silindrning ⅔ qismi.',
      explanation: '⅓ ≈ 33,3%.',
      widget: { type: 'number_answer', props: { answer: 33.33, tolerance: 0.1, unit: '%' } }
    },
    {
      id: 'g74q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'V = 4/3 πR³.',
      explanation: 'Kavalyeri prinsipi — teng kesimlar; yarim shar = silindr − konus; radius 3 marta → hajm 27 marta.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kavalyeri prinsipi: parallel kesimlari teng yuzli jismlar hajmlari teng.', value: true },
            { text: 'Radius 3 marta oshsa, shar hajmi 9 marta oshadi.', value: false },
            { text: 'Yarim shar hajmi silindr (R, R) hajmidan konus hajmini ayirganga teng.', value: true },
            { text: 'Shar hajmi tashqi chizilgan silindr hajmining yarmiga teng.', value: false }
          ]
        }
      }
    }
  ]
};
