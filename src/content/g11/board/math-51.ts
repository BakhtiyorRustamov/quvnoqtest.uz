import type { BoardLesson } from './types';

/** malaka toifasi — chastota */
const FREQ: [number, number][] = [[2, 3], [3, 5], [4, 6], [5, 5], [6, 1]];
/** poligon: har bir boʻgʻin alohida toʻgʻri chiziq (silliqlanmasin) */
const POLY: [number, number][][] = FREQ.slice(1).map((p, i) => [FREQ[i], p]);
/** gistogramma: [x; x + 1] asosli, balandligi chastotaga teng toʻgʻri toʻrtburchaklar */
const HIST: [number, number][][] = FREQ.flatMap(([x, h]) => [
  [[x, 0], [x, h]],
  [[x, h], [x + 1, h]],
  [[x + 1, h], [x + 1, 0]]
] as [number, number][][]);

/** Darslik (2-qism): 61–64-mavzu (40–44-betlar) — variatsion qator, chastotalar jadvali, poligon, gistogramma. */
export const MATH_51: BoardLesson = {
  n: 51,
  label: '63–64',
  part: 'algebra',
  qism: 2,
  title: 'Chastotalar jadvali, poligon va gistogramma',
  section: '61–64',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Iqtisodchi 20 nafar ishchining malaka toifasini yozib oldi: 4, 4, 3, 2, 5, 2, 3, 5 va hokazo. Bunday tartibsiz qatorga qarab hech narsa tushunib boʻlmaydi. Avval sonlarni oʻsish tartibida yozamiz: 2, 2, 2, 3, 3... Tartiblangan qator variatsion qator, uning har bir elementi esa varianta deyiladi.",
      easy: "Maʼlumotlarni oʻsish tartibida yozsak, variatsion qator hosil boʻladi.",
      draw: [
        { t: 'title', text: '20 nafar ishchi' },
        { t: 'text', x: 6, y: 22, text: '4; 4; 3; 2; 5; 2; 3; 5; 4; 3; 3; 2; 5; 4; 5; 4; 6; 3; 4; 5', size: 's' },
        { t: 'text', x: 6, y: 34, text: '↓ oʻsish tartibida', color: 'purple' },
        { t: 'text', x: 6, y: 46, text: '2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6', size: 's', color: 'blue' },
        { t: 'text', x: 6, y: 58, text: 'variatsion qator', color: 'green' }
      ],
      next: 'Chastotalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Har bir varianta necha marta uchragan bo‘lsa, shu son uning chastotasi deyiladi. 2 uch marta, 3 besh marta, 4 olti marta uchradi. Chastotani tanlanma hajmiga boʻlsak, nisbiy chastota chiqadi: 3 boʻlinsin 20 — 15 foiz. Barcha chastotalar yigʻindisi tanlanma hajmiga teng: 3 plyus 5 plyus 6 plyus 5 plyus 1 teng 20.",
      easy: "Chastota — necha marta uchragani. Nisbiy chastota = chastota : n.",
      draw: [
        { t: 'title', text: 'Chastotalar jadvali' },
        {
          t: 'table',
          x: 8,
          y: 18,
          rows: [
            ['toifa xᵢ', '2', '3', '4', '5', '6'],
            ['chastota nᵢ', '3', '5', '6', '5', '1'],
            ['nisbiy', '15%', '25%', '30%', '25%', '5%']
          ]
        },
        { t: 'formula', x: 8, y: 48, text: 'n = n₁ + n₂ + … + nₖ = 20' }
      ],
      next: 'Poligon'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi jadvalni rasmga aylantiramiz. Koordinatalar tekisligida (2; 3), (3; 5), (4; 6), (5; 5) va (6; 1) nuqtalarni belgilab, siniq chiziq bilan tutashtiramiz. Bu chastotalar poligoni. Uning eng baland nuqtasi eng koʻp uchragan variantani koʻrsatadi — 4-toifa.",
      easy: "(varianta; chastota) nuqtalarini siniq chiziq bilan tutashtiramiz — poligon.",
      draw: [
        { t: 'title', text: 'Chastotalar poligoni' },
        { t: 'axes', id: 'g', x: 8, y: 16, w: 56, h: 46, xmin: 0, xmax: 7.5, ymin: 0, ymax: 7, xlabel: 'toifa', ylabel: 'chastota' },
        ...POLY.map((points) => ({ t: 'curve' as const, axes: 'g', points, color: 'blue' as const })),
        ...FREQ.map(([x, y]) => ({ t: 'dot' as const, axes: 'g', x, y, color: 'blue' as const })),
        { t: 'text', x: 70, y: 30, text: 'eng baland: 4', color: 'green' }
      ],
      next: 'Gistogramma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gistogrammada esa abssissa oʻqida [2; 3], [3; 4] va hokazo kesmalarni asos qilib, balandligi chastotaga teng toʻgʻri toʻrtburchaklar yasaymiz. Ustunlar bir-biriga tegib turadi. Qaysi ustun baland boʻlsa, oʻsha qiymat koʻp uchragan.",
      easy: "Asosi — kesma, balandligi — chastota. Ustunlar yonma-yon turadi.",
      draw: [
        { t: 'title', text: 'Gistogramma' },
        { t: 'axes', id: 'g', x: 8, y: 16, w: 50, h: 46, xmin: 0, xmax: 7.5, ymin: 0, ymax: 7, xlabel: 'toifa', ylabel: 'chastota' },
        ...HIST.map((points) => ({ t: 'curve' as const, axes: 'g', points, color: 'orange' as const })),
        { t: 'list', x: 62, y: 26, items: ['asos — kesma', 'boʻyi — chastota'] }
      ],
      next: 'Oraliqlar bilan'
    },
    {
      kind: 'example',
      clear: true,
      say: "Qiymatlar koʻp va kam takrorlansa, ularni teng oraliqlarga guruhlaymiz. Odil maktab yonidan 15 daqiqada oʻtgan mashinalarni 30 kun sanadi. 0 dan 9 gacha — 1 kun, 10–19 — 5 kun, 20–29 — 10 kun, 30–39 — 9 kun, 40–49 — 4 kun, 50–59 — 1 kun. Eng koʻp kunlarda 20–29 ta mashina oʻtgan, uning nisbiy chastotasi 10 boʻlinsin 30, taxminan 0,333.",
      easy: "Oraliqlar boʻyicha sanaymiz: eng koʻp — 20–29 ta mashina (10 kun).",
      draw: [
        { t: 'title', text: 'Mashinalar soni (30 kun)' },
        {
          t: 'bars',
          x: 6,
          y: 18,
          w: 56,
          h: 38,
          items: [
            { label: '0–9', value: 1 },
            { label: '10–19', value: 5 },
            { label: '20–29', value: 10 },
            { label: '30–39', value: 9 },
            { label: '40–49', value: 4 },
            { label: '50–59', value: 1 }
          ],
          color: 'blue'
        },
        { t: 'list', x: 68, y: 24, items: ['jami: 30 kun', '20–29: 10/30 ≈ 0,333'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Variatsion qator — oʻsish tartibida yozilgan tanlanma; chastota — varianta necha marta uchragani.',
    'Nisbiy chastota = chastota : n; chastotalar yigʻindisi n ga teng.',
    'Poligon — (xᵢ; nᵢ) nuqtalarni tutashtiruvchi siniq chiziq; gistogramma — balandligi chastotaga teng ustunlar.'
  ],
  questions: [
    {
      id: 'p51q1',
      prompt: 'Futbol jamoasi oʻyinlarda kiritgan gollar: 2 0 1 4 0 1 2 1 1 0 3 1 3 0 1 1 6 2 1 3 1 2 0 2. 1 gol necha marta uchragan (chastotasi)?',
      hint: 'Har bir «1» ni sanang.',
      explanation: 'Birinchi 12 tasida 5 ta, keyingi 12 tasida 4 ta — jami 9.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'p51q2',
      prompt: 'Malaka toifalari jadvalida 4-toifaning chastotasi 6, tanlanma hajmi 20. Nisbiy chastotasi necha foiz?',
      hint: '6 : 20.',
      explanation: '6 : 20 = 0,3 = 30%.',
      widget: { type: 'number_answer', props: { answer: 30, unit: '%' } }
    },
    {
      id: 'p51q3',
      prompt: 'Chastotalar: 4, 12, 11, 3. Tanlanma hajmi nechaga teng?',
      hint: 'Chastotalarni qoʻshing.',
      explanation: '4 + 12 + 11 + 3 = 30.',
      widget: { type: 'number_answer', props: { answer: 30 } }
    },
    {
      id: 'p51q4',
      prompt: 'Samandar 30 kun avtobusdagi yoʻlovchilarni sanadi: 17 25 32 19 54 30 22 15 38 8 21 29 37 25 42 35 19 31 26 7 22 11 27 44 24 22 32 18 40 29. Necha kunda 10 nafardan kam yoʻlovchi boʻlgan?',
      hint: '10 dan kichik sonlarni toping.',
      explanation: '8 va 7 — 2 kun.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'p51q5',
      prompt: 'Ishlov berish bosqichlarini tartiblang.',
      hint: 'Avval tartiblaymiz, keyin sanaymiz, keyin chizamiz.',
      explanation: 'Variatsion qator → chastotalar jadvali → poligon yoki gistogramma.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['Maʼlumotlarni oʻsish tartibida yozish', 'Har bir variantaning chastotasini sanash', 'Chastotalar jadvalini tuzish', 'Poligon yoki gistogramma chizish']
        }
      }
    },
    {
      id: 'p51q6',
      prompt: 'Atamani maʼnosi bilan moslang.',
      hint: 'Poligon — siniq chiziq.',
      explanation: 'Varianta — tanlanma elementi; chastota — necha marta uchragani; poligon — siniq chiziq; gistogramma — ustunlar.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Varianta', right: 'tanlanmaning elementi' },
            { left: 'Chastota', right: 'necha marta uchragani' },
            { left: 'Poligon', right: 'nuqtalarni tutashtiruvchi siniq chiziq' },
            { left: 'Gistogramma', right: 'yonma-yon ustunlar' }
          ]
        }
      }
    },
    {
      id: 'p51q7',
      prompt: 'Mashinalar jadvalida (jami 30 kun) 30–39 oraliqning chastotasi 9. Nisbiy chastotasi?',
      hint: '9 : 30.',
      explanation: '9 : 30 = 0,3.',
      widget: { type: 'number_answer', props: { answer: 0.3, tolerance: 0.005 } }
    },
    {
      id: 'p51q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Nisbiy chastotalar yigʻindisi nechaga teng?',
      explanation: 'Chastotalar yigʻindisi n; nisbiy chastotalar yigʻindisi 1; gistogramma ustunlari bir-biriga tegib turadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Chastotalar yigʻindisi tanlanma hajmiga teng.', value: true },
            { text: 'Nisbiy chastotalar yigʻindisi 100 ga teng.', value: false },
            { text: 'Gistogrammada ustunlar balandligi chastotaga teng.', value: true },
            { text: 'Variatsion qator — maʼlumotlarning kamayish tartibidagi yozuvi.', value: false }
          ]
        }
      }
    }
  ]
};
