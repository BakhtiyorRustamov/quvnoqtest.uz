import type { BoardLesson } from './types';

/** S(x) = x(50 − x) */
const S50: [number, number][] = [[0, 0], [5, 225], [10, 400], [15, 525], [20, 600], [25, 625], [30, 600], [35, 525], [40, 400], [45, 225], [50, 0]];

/** Darslik: 22–25-mavzu (49–51-betlar) — geometrik mazmunli ekstremal masalalar. */
export const MATH_16: BoardLesson = {
  n: 16,
  label: "22–23",
  part: 'algebra',
  title: "Geometrik masalalarda eng yaxshi oʻlchamni topish",
  section: '22–25',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Bobongiz tovuqlar uchun toʻrtburchak katak qurmoqchi va unda 40 metr sim toʻr bor. Tomonlarini 15 va 5 qilsa, yuza 75 kvadrat metr. 12 va 8 qilsa — 96. 10 va 10 qilsa — 100! Sim bir xil, lekin joy har xil. Eng katta joyni qanday topamiz? Hosila yordam beradi.",
      easy: "Sim uzunligi bir xil — 40 metr. Lekin tomonlarga qarab yuza har xil chiqadi. Eng kattasini hosila bilan topamiz.",
      draw: [
        { t: 'title', text: '40 m sim toʻr' },
        { t: 'icon', x: 10, y: 30, emoji: '🐔', size: 'l' },
        {
          t: 'table',
          x: 24,
          y: 20,
          rows: [
            ['tomonlar', 'yuza'],
            ['15 × 5', '75 m²'],
            ['12 × 8', '96 m²'],
            ['10 × 10', '100 m²']
          ]
        },
        { t: 'bars', x: 58, y: 18, w: 36, h: 34, items: [{ label: '15×5', value: 75 }, { label: '12×8', value: 96 }, { label: '10×10', value: 100 }], color: 'green' },
        { t: 'text', x: 24, y: 64, text: 'Qaysi oʻlcham eng katta joy beradi?', color: 'purple' }
      ],
      next: 'Qanday hisoblaymiz?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bunday masalalar ekstremal masalalar deyiladi. Yechish yoʻli: birinchi, nomaʼlum kattalikni x deb belgilaymiz. Ikkinchi, eng katta yoki eng kichik boʻlishi kerak boʻlgan kattalikni x orqali funksiya qilib yozamiz. Uchinchi, x qaysi oraliqda oʻzgarishini aniqlaymiz. Toʻrtinchi, hosilani nolga tenglab statsionar nuqtani topamiz. Beshinchi, tekshirib, javobni yozamiz.",
      easy: "x ni tanlaymiz, kerakli kattalikni f(x) qilib yozamiz, hosilasini nolga tenglaymiz va javobni tekshiramiz.",
      draw: [
        { t: 'title', text: 'Yechish yoʻli' },
        { t: 'list', x: 6, y: 20, items: ['1) Nomaʼlumni x deb belgilang', '2) Kattalikni f(x) koʻrinishida yozing', '3) x ning oraligʻini aniqlang', '4) f′(x) = 0 dan statsionar nuqtani toping', '5) Tekshiring va javobni yozing'] }
      ],
      next: '1-masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 1-masala: 100 metr panjara bilan toʻgʻri toʻrtburchak yer oʻralmoqda. Bir tomon x boʻlsa, ikkinchisi 50 minus x. Yuza S(x) teng x karra 50 minus x, yaʼni 50x minus x kvadrat, x 0 dan 50 gacha. Hosila 50 minus 2x, u x teng 25 da nolga teng. Demak, ikkala tomon 25 metr — kvadrat, yuza 625 kvadrat metr.",
      easy: "Bir tomon x, ikkinchisi 50 minus x. Yuza x karra 50 minus x. Hosila nolga teng boʻladigan joy x teng 25. Kvadrat chiqadi, yuza 625.",
      draw: [
        { t: 'title', text: '1-masala: 100 m panjara' },
        { t: 'point', id: 'A', x: 8, y: 48 },
        { t: 'point', id: 'B', x: 38, y: 48 },
        { t: 'point', id: 'C', x: 38, y: 26 },
        { t: 'point', id: 'D', x: 8, y: 26 },
        { t: 'polygon', points: ['A', 'B', 'C', 'D'], color: 'green' },
        { t: 'text', x: 20, y: 55, text: 'x', color: 'blue' },
        { t: 'text', x: 40, y: 39, text: '50 − x', size: 's', color: 'blue' },
        { t: 'formula', x: 52, y: 22, text: 'S(x) = x(50 − x)' },
        { t: 'formula', x: 52, y: 34, text: 'S′(x) = 50 − 2x = 0' },
        { t: 'text', x: 54, y: 48, text: 'x = 25 m', color: 'red' },
        { t: 'box', id: 'r', x: 50, y: 53, w: 44, h: 11, text: '25 × 25, S = 625 m²', color: 'green' }
      ],
      next: 'Grafikda-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "S(x) funksiya grafigi — pastga qaragan parabola. x teng 0 va x teng 50 da yuza nolga teng: toʻrtburchak chiziqqa aylanib qoladi. Oʻrtada, x teng 25 da, parabola choʻqqisi — eng katta yuza 625. Shu sabab perimetri berilgan toʻrtburchaklar ichida kvadratning yuzasi eng katta.",
      easy: "Chetlarda yuza nol, oʻrtada eng katta — 625. Perimetr bir xil boʻlsa, kvadrat eng koʻp joy oladi.",
      draw: [
        { t: 'title', text: 'S(x) grafigi' },
        { t: 'axes', id: 's', x: 6, y: 14, w: 56, h: 50, xmin: 0, xmax: 55, ymin: 0, ymax: 700, xlabel: 'x', ylabel: 'S' },
        { t: 'curve', axes: 's', points: S50, color: 'red' },
        { t: 'dot', axes: 's', x: 25, y: 625, label: 'max 625', color: 'green' },
        { t: 'dot', axes: 's', x: 0, y: 0, color: 'ink' },
        { t: 'dot', axes: 's', x: 50, y: 0, color: 'ink' },
        { t: 'text', x: 66, y: 28, text: 'Perimetr bir xil:', size: 's' },
        { t: 'text', x: 66, y: 36, text: 'kvadrat — eng', color: 'green' },
        { t: 'text', x: 66, y: 44, text: 'katta yuza', color: 'green' }
      ],
      next: 'Endi quti yasaymiz'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tomoni 120 santimetr boʻlgan kvadrat kartondan usti ochiq quti yasaymiz. Burchaklaridan tomoni x boʻlgan kvadratchalar kesib, chetlarini bukamiz. Qutining tubi 120 minus 2x, balandligi x. Hajm V(x) teng x karra 120 minus 2x ning kvadrati, x 0 dan 60 gacha. Hosila 120 minus 2x karra 120 minus 6x. Oraliqda u faqat x teng 20 da nolga teng. Hajm 20 karra 80 kvadrat, yaʼni 128 ming kub santimetr.",
      easy: "Burchaklardan x santimetrli kvadratchalar kesamiz. Hajm x karra 120 minus 2x kvadrat. Eng katta hajm x teng 20 da.",
      draw: [
        { t: 'title', text: 'Usti ochiq quti' },
        { t: 'point', id: 'a1', x: 8, y: 20 },
        { t: 'point', id: 'a2', x: 44, y: 20 },
        { t: 'point', id: 'a3', x: 44, y: 56 },
        { t: 'point', id: 'a4', x: 8, y: 56 },
        { t: 'polygon', points: ['a1', 'a2', 'a3', 'a4'], color: 'ink' },
        { t: 'point', id: 'b1', x: 16, y: 28 },
        { t: 'point', id: 'b2', x: 36, y: 28 },
        { t: 'point', id: 'b3', x: 36, y: 48 },
        { t: 'point', id: 'b4', x: 16, y: 48 },
        { t: 'polygon', points: ['b1', 'b2', 'b3', 'b4'], color: 'blue', fill: true },
        { t: 'point', id: 'c1', x: 16, y: 20 },
        { t: 'point', id: 'c2', x: 8, y: 28 },
        { t: 'point', id: 'c3', x: 36, y: 20 },
        { t: 'point', id: 'c4', x: 44, y: 28 },
        { t: 'point', id: 'c5', x: 44, y: 48 },
        { t: 'point', id: 'c6', x: 36, y: 56 },
        { t: 'point', id: 'c7', x: 16, y: 56 },
        { t: 'point', id: 'c8', x: 8, y: 48 },
        { t: 'line', from: 'c1', to: 'b1', color: 'red', dashed: true },
        { t: 'line', from: 'c2', to: 'b1', color: 'red', dashed: true },
        { t: 'line', from: 'c3', to: 'b2', color: 'red', dashed: true },
        { t: 'line', from: 'c4', to: 'b2', color: 'red', dashed: true },
        { t: 'line', from: 'c5', to: 'b3', color: 'red', dashed: true },
        { t: 'line', from: 'c6', to: 'b3', color: 'red', dashed: true },
        { t: 'line', from: 'c7', to: 'b4', color: 'red', dashed: true },
        { t: 'line', from: 'c8', to: 'b4', color: 'red', dashed: true },
        { t: 'text', x: 10, y: 17, text: 'x', size: 's', color: 'red' },
        { t: 'text', x: 18, y: 63, text: '120 sm', size: 's' },
        { t: 'formula', x: 50, y: 20, text: 'V = x(120 − 2x)²' },
        { t: 'text', x: 52, y: 34, text: 'V′ = (120 − 2x)(120 − 6x)', size: 's' },
        { t: 'text', x: 52, y: 43, text: 'V′ = 0  →  x = 20', color: 'red' },
        { t: 'box', id: 'v', x: 50, y: 50, w: 44, h: 11, text: 'V = 20 · 80² = 128 000', color: 'green' }
      ],
      next: 'Panjarani tejaymiz'
    },
    {
      kind: 'example',
      clear: true,
      say: "Teskari masala: maydonning yuzi 6400 kvadrat metr. Uni oʻrash uchun eng kam panjara qancha? Bir tomon x boʻlsa, ikkinchisi 6400 boʻlinsin x. Perimetr P(x) teng 2 karra x plyus 6400 boʻlinsin x. Hosila 2 karra 1 minus 6400 boʻlinsin x kvadrat. U x teng 80 da nolga teng. Yana kvadrat chiqdi: 80 ga 80, panjara 320 metr.",
      easy: "Yuza berilgan, eng kam panjara kerak. Bu safar ham javob kvadrat: 80 ga 80, panjara 320 metr.",
      draw: [
        { t: 'title', text: 'Yuza 6400 m²' },
        { t: 'formula', x: 8, y: 20, text: 'P(x) = 2(x + 6400/x)' },
        { t: 'formula', x: 8, y: 33, text: 'P′(x) = 2(1 − 6400/x²) = 0' },
        { t: 'text', x: 10, y: 47, text: 'x² = 6400  →  x = 80 m', color: 'red' },
        { t: 'box', id: 'p', x: 8, y: 53, w: 52, h: 11, text: '80 × 80, P = 320 m', color: 'green' },
        { t: 'icon', x: 78, y: 36, emoji: '🌾', size: 'l' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ekstremal masalada kattalik x orqali f(x) funksiya qilib yoziladi va uning oraliqdagi eng katta yoki eng kichik qiymati topiladi.',
    'Perimetri berilgan toʻgʻri toʻrtburchaklar ichida kvadratning yuzasi eng katta.',
    'Yuzasi berilgan toʻgʻri toʻrtburchaklar ichida kvadratning perimetri eng kichik.'
  ],
  questions: [
    {
      id: 'm16q1',
      prompt: '300 m panjara bilan toʻgʻri toʻrtburchak yer oʻralmoqda. Eng koʻpi bilan necha m² yer oʻrash mumkin?',
      hint: 'Eng katta yuza kvadratda: tomon 300 : 4.',
      explanation: 'Tomon 75 m, yuza 75² = 5625 m².',
      widget: { type: 'number_answer', props: { answer: 5625, unit: 'm²' } }
    },
    {
      id: 'm16q2',
      prompt: '480 m panjara bilan eng koʻpi bilan necha m² toʻgʻri toʻrtburchak yer oʻrash mumkin?',
      hint: 'Tomon 480 : 4 = 120.',
      explanation: '120² = 14 400 m².',
      widget: { type: 'number_answer', props: { answer: 14400, unit: 'm²' } }
    },
    {
      id: 'm16q3',
      prompt: 'Tomoni 60 sm kvadrat kartondan usti ochiq quti yasaladi. Hajm eng katta boʻlishi uchun burchaklardan kesiladigan kvadratchaning tomoni necha sm boʻlishi kerak?',
      hint: 'V = x(60 − 2x)², V′ = (60 − 2x)(60 − 6x).',
      explanation: 'V′ = 0: x = 30 (hajm 0) yoki x = 10. Javob: 10 sm.',
      widget: { type: 'number_answer', props: { answer: 10, unit: 'sm' } }
    },
    {
      id: 'm16q4',
      prompt: 'Ekstremal masalani yechish qadamlarini toʻgʻri tartibda bosing.',
      hint: 'Avval x ni tanlang, oxirida javob.',
      explanation: 'x → f(x) → oraliq → f′(x) = 0 → tekshirish va javob.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['Nomaʼlumni x deb belgilang', 'Kattalikni f(x) koʻrinishida yozing', 'x ning oraligʻini aniqlang', 'f′(x) = 0 tenglamani yeching', 'Tekshiring va javobni yozing']
        }
      }
    },
    {
      id: 'm16q5',
      prompt: 'Yigʻindisi 20 ga teng ikki musbat sonning koʻpaytmasi eng koʻpi bilan nechaga teng boʻlishi mumkin?',
      hint: 'P(x) = x(20 − x), P′ = 20 − 2x.',
      explanation: 'x = 10, koʻpaytma 10 · 10 = 100.',
      widget: { type: 'number_answer', props: { answer: 100 } }
    },
    {
      id: 'm16q6',
      prompt: 'S(x) = x(50 − x) grafigida yuza eng katta boʻladigan nuqtani bosing.',
      hint: 'Parabola choʻqqisi.',
      explanation: 'x = 25 da S = 625 — eng katta yuza.',
      widget: {
        type: 'graph_tap',
        props: { target: [25, 625], radius: 3, only: 'x', graph: { xmin: 0, xmax: 55, ymin: 0, ymax: 700, xlabel: 'x', ylabel: 'S', curves: [{ points: S50 }] } }
      }
    },
    {
      id: 'm16q7',
      prompt: 'Har bir masalaga mos funksiyani tanlang.',
      hint: 'Perimetr berilsa — yuzani, yuza berilsa — perimetrni yozamiz.',
      explanation: 'Perimetr 40: S = x(20 − x). Yuza 100: P = 2(x + 100/x). Yigʻindi 10: x(10 − x). Karton 30 sm: V = x(30 − 2x)².',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Perimetr 40 m, yuza eng katta', right: 'S = x(20 − x)' },
            { left: 'Yuza 100 m², panjara eng kam', right: 'P = 2(x + 100/x)' },
            { left: 'Yigʻindi 10, koʻpaytma eng katta', right: 'x(10 − x)' },
            { left: '30 sm karton, quti hajmi', right: 'V = x(30 − 2x)²' }
          ]
        }
      }
    },
    {
      id: 'm16q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kvadrat haqidagi ikki xulosani eslang.',
      explanation: 'Perimetr bir xil — kvadrat yuzasi eng katta; yuza bir xil — kvadrat perimetri eng kichik. Quti masalasida x < 60 boʻlishi shart.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Perimetri bir xil toʻrtburchaklardan kvadratning yuzasi eng katta.', value: true },
            { text: 'Yuzasi bir xil toʻrtburchaklardan kvadratning perimetri eng katta.', value: false },
            { text: '120 sm kartondan quti masalasida x 0 dan 60 gacha oʻzgaradi.', value: true },
            { text: 'Ekstremal masalada x ning oraligʻini aniqlash shart emas.', value: false }
          ]
        }
      }
    },
    {
      id: 'm16q9',
      prompt: 'Perimetri 40 m boʻlgan toʻrtburchaklarni yuzasi kichigidan kattasiga qarab tartiblang.',
      hint: 'Yuzalar: 36, 75, 96, 100 m².',
      explanation: '18 × 2 = 36, 15 × 5 = 75, 12 × 8 = 96, 10 × 10 = 100. Kvadrat — eng katta.',
      widget: { type: 'order_line', props: { items: [{ label: '18 × 2' }, { label: '15 × 5' }, { label: '12 × 8' }, { label: '10 × 10' }] } }
    }
  ]
};
