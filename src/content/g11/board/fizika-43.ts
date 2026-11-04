import type { BoardLesson } from './types';
import { BOB7 } from './fizika-39';
import { seg, fieldMarks, wave, rect } from './phys';

/** Polyline through board points. */
const path = (id: string, pts: [number, number][], color: 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'ink') =>
  pts.slice(1).flatMap((p, i) => seg(`${id}${i}`, pts[i][0], pts[i][1], p[0], p[1], color));

// α — sekin egiladi, β — kuchli teskari tomonga, γ — toʻgʻri
const arc = (k: number, y1: number) => wave((y) => 30 + k * (62 - y) ** 2, 62, y1, 14).map(([y, x]) => [x, y] as [number, number]);

/** Darslik: Fizika 11, 41-mavzu (168–171-betlar) — radioaktivlik, α, β, γ nurlanish, radioaktiv yemirilish qonuni, aktivlik, radioaktiv oilalar. */
export const FIZ_43: BoardLesson = {
  n: 43,
  label: '41',
  group: BOB7,
  title: 'Radioaktivlik. Radioaktiv yemirilish qonuni',
  section: '41-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Arxeologlar topilgan suyak yoki yogʻochning necha ming yillik ekanini qanday biladi? Ular undagi radioaktiv uglerod-14 qancha qolganini oʻlchaydi. Radioaktiv yadrolar xuddi soat kabi bir maromda parchalanadi. Bu hodisani 1896-yilda Bekkerel tasodifan kashf qilgan.",
      easy: "Radioaktiv yadrolar soatdek bir maromda parchalanadi — yoshni aniqlash mumkin.",
      draw: [
        { t: 'title', text: 'Atom soati' },
        { t: 'icon', x: 16, y: 34, emoji: '🦴', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⏳', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['uglerod-14 usuli', 'parchalanish — bir maromda', 'Bekkerel, 1896'] }
      ],
      next: 'Uch xil nurlanish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bekkerel uran tuzlari koʻrinmas nur chiqarishini topdi. Keyin Kyuri er-xotinlar poloniy va radiyni kashf qilishdi. Radioaktiv nurlanish magnit maydonda uchga ajraladi: alfa-nurlar — geliy yadrolari, musbat, sal egiladi; beta-nurlar — elektronlar, teskari tomonga kuchli egiladi; gamma-nurlar — fotonlar, umuman ogʻmaydi. Tabiiy radioaktivlikka bosim, temperatura, maydonlar taʼsir qilmaydi.",
      easy: "α — He yadrolari, β — elektronlar, γ — fotonlar; magnit maydonda ajraladi.",
      draw: [
        { t: 'title', text: 'α, β, γ magnit maydonda' },
        ...fieldMarks(12, 22, 6, 4, 8, true, 'blue'),
        ...rect('src', 26, 62, 8, 4, 'ink'),
        ...path('a', arc(-0.006, 20), 'red'),
        ...path('b', arc(0.012, 28), 'blue'),
        ...seg('g', 30, 62, 30, 20, 'green'),
        { t: 'text', x: 18, y: 18, text: 'α', color: 'red' },
        { t: 'text', x: 31, y: 17, text: 'γ', color: 'green' },
        { t: 'text', x: 46, y: 27, text: 'β', color: 'blue' },
        { t: 'list', x: 62, y: 30, items: ['α — ⁴He, +2e', 'β — elektron, −e', 'γ — foton, 0'] }
      ],
      next: 'Yemirilish qonuni'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yadrolar tasodifiy parchalanadi, lekin koʻp yadrolar uchun qonun aniq: N teng N nol karra e ning minus lambda t darajasi. Yarim yemirilish davri T — yadrolarning yarmi parchalanadigan vaqt: T teng ln 2 boʻlinsin lambda, yaʼni 0,693 boʻlinsin lambda. Har T vaqtda qolgan yadrolar yarmiga kamayadi: N teng N nol karra 2 ning minus t boʻlinsin T darajasi.",
      easy: "N = N₀·2^(−t/T); T = 0,693/λ.",
      draw: [
        { t: 'title', text: 'Radioaktiv yemirilish qonuni' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 54, h: 44, xmin: 0, xmax: 4.2, ymin: 0, ymax: 1.1, xlabel: 't / T', ylabel: 'N / N₀' },
        { t: 'curve', axes: 'g', points: wave((x) => 2 ** -x, 0, 4.2, 60), color: 'red' },
        { t: 'dot', axes: 'g', x: 1, y: 0.5, label: '1/2' },
        { t: 'dot', axes: 'g', x: 2, y: 0.25, label: '1/4' },
        { t: 'dot', axes: 'g', x: 3, y: 0.125, label: '1/8' },
        { t: 'formula', x: 66, y: 26, text: 'N = N₀ e^(−λt)' },
        { t: 'formula', x: 66, y: 40, text: 'T = 0,693 / λ' }
      ],
      next: 'Aktivlik va oilalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Aktivlik — 1 sekunddagi parchalanishlar soni. SI birligi bekkerel: 1 sekundda 1 parchalanish. Eski birlik kyuri: 1 kyuri teng 3,7 karra 10 ning 10 darajasi bekkerel. Tartib raqami 83 dan katta barcha elementlar radioaktiv. Ular toʻrtta oilaga birlashadi: uran-238 qoʻrgʻoshin-206 bilan, toriy-232 qoʻrgʻoshin-208 bilan, aktiniy-235 qoʻrgʻoshin-207 bilan, neptuniy-237 vismut-209 bilan tugaydi.",
      easy: "Aktivlik: 1 Bk = 1 parchalanish/s; 1 Ci = 3,7·10¹⁰ Bk. Z > 83 — radioaktiv, 4 oila.",
      draw: [
        { t: 'title', text: 'Aktivlik va radioaktiv oilalar' },
        { t: 'formula', x: 6, y: 22, text: '1 Ci = 3,7 · 10¹⁰ Bk' },
        { t: 'table', x: 6, y: 32, rows: [['boshlanishi', 'oxiri'], ['²³⁸U', '²⁰⁶Pb'], ['²³²Th', '²⁰⁸Pb'], ['²³⁵Ac', '²⁰⁷Pb'], ['²³⁷Np', '²⁰⁹Bi']] },
        { t: 'text', x: 60, y: 40, text: 'Z > 83 —', size: 's', color: 'red' },
        { t: 'text', x: 60, y: 46, text: 'hammasi radioaktiv', size: 's', color: 'red' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Uran-233 nechta alfa-zarra chiqarib, simob-209 ga aylanadi? Har bir alfa-yemirilish massa sonini 4 ga, zaryadni 2 ga kamaytiradi. Massa soni 233 dan 209 gacha, yaʼni 24 ga kamaydi — 24 boʻlinsin 4, 6 ta alfa-zarra. Tekshiramiz: zaryad 92 minus 12 teng 80 — bu simob. Toʻgʻri!",
      easy: "(233 − 209)/4 = 6 ta α; 92 − 2·6 = 80 — simob.",
      draw: [
        { t: 'title', text: 'Nechta α-yemirilish?' },
        { t: 'formula', x: 6, y: 22, text: '²³³U → ²⁰⁹Hg' },
        { t: 'formula', x: 6, y: 36, text: 'n = (233 − 209) / 4 = 6' },
        { t: 'formula', x: 6, y: 50, text: 'Z: 92 − 2·6 = 80 ✓' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Radioaktivlik (Bekkerel, 1896): α — geliy yadrolari, β — elektronlar, γ — fotonlar; magnit maydonda ajraladi.',
    'Yemirilish qonuni N = N₀e^(−λt) = N₀·2^(−t/T); yarim yemirilish davri T = 0,693/λ.',
    'Aktivlik birligi — bekkerel, 1 Ci = 3,7·10¹⁰ Bk; Z > 83 elementlar toʻrtta radioaktiv oilaga birlashadi.'
  ],
  questions: [
    {
      id: 'f43q1',
      prompt: 'Yarim yemirilish davri 2 sutka. 6 sutkadan keyin moddaning necha foizi qoladi?',
      hint: '6 sutka = 3T.',
      explanation: '(1/2)³ = 1/8 = 12,5 %.',
      widget: { type: 'number_answer', props: { answer: 12.5, tolerance: 0.01, unit: '%' } }
    },
    {
      id: 'f43q2',
      prompt: 'Elementning aktivligi 8 kunda 4 marta kamaydi. Yarim yemirilish davri necha kun?',
      hint: '4 = 2².',
      explanation: '8 kunda 2 ta yarim davr — T = 4 kun.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'kun' } }
    },
    {
      id: 'f43q3',
      prompt: 'Yemirilish doimiysi λ = 0,0693 s⁻¹. Yarim yemirilish davri necha sekund?',
      hint: 'T = 0,693/λ.',
      explanation: '0,693 / 0,0693 = 10 s.',
      widget: { type: 'number_answer', props: { answer: 10, tolerance: 0.01, unit: 's' } }
    },
    {
      id: 'f43q4',
      prompt: 'Toriy-232 nechta α-zarra chiqarib qoʻrgʻoshin-208 ga aylanadi (β-yemirilishlarni ham hisobga olgan holda α soni)?',
      hint: 'Massa sonini faqat α oʻzgartiradi.',
      explanation: '(232 − 208)/4 = 6 ta α.',
      widget: { type: 'number_answer', props: { answer: 6, unit: 'ta' } }
    },
    {
      id: 'f43q5',
      prompt: 'Nurlanish turini xossasiga qarab ajrating.',
      hint: 'γ — zaryadsiz.',
      explanation: 'α — geliy yadrosi, musbat; β — elektron, manfiy; γ — foton, ogʻmaydi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'a', label: 'α' },
            { id: 'b', label: 'β' },
            { id: 'g', label: 'γ' }
          ],
          items: [
            { emoji: '', label: 'geliy yadrosi', bin: 'a' },
            { emoji: '', label: 'zaryadi +2e', bin: 'a' },
            { emoji: '', label: 'elektronlar oqimi', bin: 'b' },
            { emoji: '', label: 'zaryadi −e', bin: 'b' },
            { emoji: '', label: 'foton', bin: 'g' },
            { emoji: '', label: 'magnit maydonda ogʻmaydi', bin: 'g' }
          ]
        }
      }
    },
    {
      id: 'f43q6',
      prompt: '1 kyuri necha bekkerelga teng?',
      hint: 'Eski birlik.',
      explanation: '1 Ci = 3,7·10¹⁰ Bk.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['10¹⁰ Bk', '3,7·10¹⁰ Bk', '3,7·10⁸ Bk', '1 Bk'], answerIndex: 1 } }
    },
    {
      id: 'f43q7',
      prompt: 'Radioaktiv oilaning boshini oxiri bilan juftlang.',
      hint: 'Neptuniy oilasi vismut bilan tugaydi.',
      explanation: '²³⁸U → ²⁰⁶Pb, ²³²Th → ²⁰⁸Pb, ²³⁵Ac → ²⁰⁷Pb, ²³⁷Np → ²⁰⁹Bi.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'uran-238' }, b: { label: 'qoʻrgʻoshin-206' } },
            { a: { label: 'toriy-232' }, b: { label: 'qoʻrgʻoshin-208' } },
            { a: { label: 'aktiniy-235' }, b: { label: 'qoʻrgʻoshin-207' } },
            { a: { label: 'neptuniy-237' }, b: { label: 'vismut-209' } }
          ]
        }
      }
    },
    {
      id: 'f43q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tabiiy radioaktivlikka tashqi sharoit taʼsir qilmaydi.',
      explanation: 'Isitish yemirilishni tezlashtirmaydi; har T da yarmi qoladi; radiyni Kyurilar kashf qilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Poloniy va radiyni Kyuri er-xotinlar kashf qilgan.', value: true },
            { text: 'Ikki yarim yemirilish davridan keyin yadrolarning 1/4 qismi qoladi.', value: true },
            { text: 'Moddani qizdirsak, radioaktiv yemirilish tezlashadi.', value: false },
            { text: 'Ikki yarim yemirilish davrida barcha yadrolar parchalanadi.', value: false }
          ]
        }
      }
    }
  ]
};
