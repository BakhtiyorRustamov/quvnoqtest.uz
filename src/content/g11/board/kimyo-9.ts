import type { BoardLesson } from './types';
import { rect, seg, battery } from './phys';

export const BOB3 = { kicker: '3-bob', title: 'Elektrolitlar. Dissotsilanish. Gidroliz' };

/** Darslik: Umumiy kimyo 11, 9-mavzu (51–54-betlar) — Arrenius nazariyasi, elektrolit va noelektrolitlar, kuchli va kuchsiz elektrolitlar. */
export const KIM_9: BoardLesson = {
  n: 9,
  label: '9',
  group: BOB3,
  title: 'Kuchli va kuchsiz elektrolitlar',
  section: '9-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Sportchilar mashgʻulotdan keyin «elektrolitli» ichimlik ichadi — terlaganda yoʻqotilgan tuzlar ionlarini tiklash uchun. Nam qoʻl bilan elektr asbobiga tegish xavfli, chunki suvdagi tuzlar tok oʻtkazadi. Toza distillangan suv esa tokni deyarli oʻtkazmaydi. Nega?",
      easy: "Tuz eritmalari tok oʻtkazadi, toza suv — deyarli yoʻq.",
      draw: [
        { t: 'title', text: 'Elektrolitli ichimlik' },
        { t: 'icon', x: 16, y: 34, emoji: '🥤', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚡', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['ter bilan ionlar chiqadi', 'tuzli suv — tok oʻtkazadi', 'distillangan suv — deyarli yoʻq'] }
      ],
      next: 'Arrenius nazariyasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1887-yilda Arrenius elektrolitik dissotsiatsiya nazariyasini yaratdi. Elektrolit suvda eriganda yoki suyuqlantirilganda ionlarga ajraladi — bu dissotsiatsiya. Tok taʼsirida musbat ionlar katodga, manfiy ionlar anodga harakatlanadi, shuning uchun ular kationlar va anionlar deyiladi. Dissotsiatsiya qaytar jarayon: ionlar qayta birikib molekula hosil qilishi mumkin — assotsiatsiya.",
      easy: "Elektrolit ionlarga ajraladi: kationlar katodga, anionlar anodga.",
      draw: [
        { t: 'title', text: 'Arrenius nazariyasi (1887)' },
        { t: 'formula', x: 4, y: 24, text: 'NaCl ⇄ Na⁺ + Cl⁻' },
        { t: 'list', x: 4, y: 36, items: ['kation (+) → katod (−)', 'anion (−) → anod (+)', 'jarayon qaytar: dissotsiatsiya ⇄ assotsiatsiya'] }
      ],
      next: 'Tajriba'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Asbobda ikki elektrod eritmaga tushirilgan, zanjirda lampochka bor. Osh tuzi, NaOH, HCl eritmalarida lampochka yorugʻ yonadi. Sirka kislota yoki ammoniy gidroksid eritmasida — xira, ular suyultirilgan sari yorugʻroq yonadi. Shakar eritmasi va distillangan suvda lampochka umuman yonmaydi. Eritmasi yoki suyuqlanmasi tok oʻtkazadigan moddalar — elektrolitlar, oʻtkazmaydiganlar — noelektrolitlar.",
      easy: "Lampochka: NaCl — yorugʻ, sirka kislota — xira, shakar — yonmaydi.",
      draw: [
        { t: 'title', text: 'Eritma tok oʻtkazadimi?' },
        ...rect('beaker', 14, 40, 26, 22, 'blue'),
        ...seg('e1', 20, 30, 20, 56, 'ink'),
        ...seg('e2', 34, 30, 34, 56, 'ink'),
        ...seg('w1', 20, 30, 20, 22, 'ink'),
        ...seg('w2', 20, 22, 25, 22, 'ink'),
        ...battery('b', 26, 22),
        ...seg('w3', 28, 22, 34, 22, 'ink'),
        ...seg('w4', 34, 22, 34, 30, 'ink'),
        { t: 'icon', x: 42, y: 24, emoji: '💡', size: 's' },
        { t: 'table', x: 52, y: 22, rows: [['eritma', 'lampochka'], ['NaCl, HCl', 'yorugʻ'], ['CH₃COOH', 'xira'], ['shakar, suv', 'yonmaydi']] }
      ],
      next: 'Kuchli va kuchsiz'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kuchli elektrolitlar: kuchli kislotalar — H2SO4, HCl, HNO3, HClO4, HBr, HI; ishqorlar — I A va II A guruh gidroksidlari, berilliy va magniydan tashqari; suvda yaxshi eriydigan tuzlar. Kuchsiz elektrolitlar: H2CO3, H2S, H2SO3, HF, HCN, organik kislotalar, NH4OH, erimaydigan asoslar va suv. Kislorodli kislota HnEOm uchun qoida: m minus n 2 ga teng yoki katta boʻlsa — kuchli, kichik boʻlsa — kuchsiz.",
      easy: "Kuchli: H₂SO₄, HCl, HNO₃, ishqorlar, eruvchan tuzlar. Kuchsiz: H₂CO₃, H₂S, HF, NH₄OH. Qoida: m − n ≥ 2 — kuchli.",
      draw: [
        { t: 'title', text: 'Kuchli va kuchsiz elektrolitlar' },
        { t: 'table', x: 4, y: 20, rows: [['kuchli', 'kuchsiz'], ['H₂SO₄, HCl, HNO₃', 'H₂CO₃, H₂S, HF'], ['NaOH, KOH, Ba(OH)₂', 'NH₄OH, Fe(OH)₃'], ['eruvchan tuzlar', 'organik kislotalar, suv']] },
        { t: 'formula', x: 4, y: 52, text: 'HₙEOₘ:  m − n ≥ 2 → kuchli' },
        { t: 'text', x: 4, y: 64, text: 'H₂SO₄: 4 − 2 = 2 ✓;  H₂CO₃: 3 − 2 = 1', size: 's', color: 'purple' }
      ],
      next: 'Noelektrolitlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Noelektrolitlar — eritmasi yoki suyuqlanmasi tok oʻtkazmaydigan moddalar: qutbsiz kovalent bogʻli moddalar, metan, karbonat angidrid, shakar, spirtlar, distillangan suv. Elektrolitlar kristall holatda ham tokni yomon oʻtkazadi — ionlar faqat eritmada yoki suyuqlanmada erkin harakatlanadi.",
      easy: "Noelektrolitlar: shakar, spirt, metan, distillangan suv.",
      draw: [
        { t: 'title', text: 'Noelektrolitlar' },
        { t: 'icon', x: 14, y: 36, emoji: '🍬', size: 'l' },
        { t: 'list', x: 28, y: 28, items: ['shakar, spirtlar', 'metan, CO₂', 'distillangan suv', 'qattiq tuz ham tok oʻtkazmaydi'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Bitta ammoniy dixromat va uchta vismut nitrat molekulasi dissotsilanganda nechta ion hosil boʻladi? Ammoniy dixromat ikkita ammoniy va bitta dixromat ionini beradi — 3 ta ion. Bitta vismut nitrat — bitta Bi uch plyus va uchta nitrat — 4 ta ion, uchtasi — 12 ta. Jami 15 ta ion.",
      easy: "(NH₄)₂Cr₂O₇ → 3 ion; 3 Bi(NO₃)₃ → 12 ion; jami 15.",
      draw: [
        { t: 'title', text: 'Nechta ion?' },
        { t: 'formula', x: 4, y: 24, text: '(NH₄)₂Cr₂O₇ → 2NH₄⁺ + Cr₂O₇²⁻   (3)' },
        { t: 'formula', x: 4, y: 38, text: '3Bi(NO₃)₃ → 3Bi³⁺ + 9NO₃⁻   (12)' },
        { t: 'text', x: 4, y: 54, text: 'jami: 3 + 12 = 15 ta ion', color: 'red' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Arrenius nazariyasi: elektrolitlar eritmada ionlarga ajraladi; kationlar katodga, anionlar anodga boradi; jarayon qaytar.',
    'Kuchli elektrolitlar: kuchli kislotalar, ishqorlar, eruvchan tuzlar; kuchsiz: H₂CO₃, H₂S, HF, NH₄OH, organik kislotalar, suv.',
    'Kislorodli kislotalar uchun qoida: m − n ≥ 2 — kuchli; noelektrolitlar: shakar, spirt, metan.'
  ],
  questions: [
    {
      id: 'k9q1',
      prompt: 'Bitta Al₂(SO₄)₃ molekulasi toʻliq dissotsilanganda nechta ion hosil boʻladi?',
      hint: '2Al³⁺ + 3SO₄²⁻.',
      explanation: '2 + 3 = 5 ta ion.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'k9q2',
      prompt: 'Ikkita K₃PO₄ molekulasi dissotsilanganda nechta ion hosil boʻladi?',
      hint: 'Bittasi: 3K⁺ + PO₄³⁻.',
      explanation: '2 · 4 = 8 ta ion.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'k9q3',
      prompt: 'Moddalarni guruhlarga ajrating.',
      hint: 'Shakar ionlarga ajralmaydi.',
      explanation: 'Kuchli: HCl, NaOH, KNO₃. Kuchsiz: CH₃COOH, NH₄OH. Noelektrolit: shakar, spirt.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 's', label: 'Kuchli' },
            { id: 'w', label: 'Kuchsiz' },
            { id: 'n', label: 'Noelektrolit' }
          ],
          items: [
            { emoji: '', label: 'HCl', bin: 's' },
            { emoji: '', label: 'NaOH', bin: 's' },
            { emoji: '', label: 'KNO₃', bin: 's' },
            { emoji: '', label: 'CH₃COOH', bin: 'w' },
            { emoji: '', label: 'NH₄OH', bin: 'w' },
            { emoji: '', label: 'shakar', bin: 'n' },
            { emoji: '', label: 'etil spirti', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'k9q4',
      prompt: 'm − n qoidasiga koʻra qaysi kislota kuchli?',
      hint: 'HₙEOₘ: m − n ≥ 2.',
      explanation: 'HClO₄: 4 − 1 = 3 ≥ 2 — kuchli. H₂CO₃: 1, H₂SO₃: 1, H₃PO₄: 1.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['H₂CO₃', 'H₂SO₃', 'HClO₄', 'H₃PO₄'], answerIndex: 2 } }
    },
    {
      id: 'k9q5',
      prompt: 'Kuchsiz elektrolitlarni tanlang.',
      hint: 'Uchtasi kuchsiz.',
      explanation: 'HF, HNO₂ va NH₄OH — kuchsiz; K₂CO₃ va (NH₄)₂SO₄ — eruvchan tuzlar, kuchli.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'vodorod ftorid HF', correct: true },
            { label: 'nitrit kislota HNO₂', correct: true },
            { label: 'ammoniy gidroksid NH₄OH', correct: true },
            { label: 'kaliy karbonat K₂CO₃' },
            { label: 'ammoniy sulfat (NH₄)₂SO₄' }
          ]
        }
      }
    },
    {
      id: 'k9q6',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Qarama-qarshi zaryadlar tortishadi.',
      explanation: 'Musbat ionlar (kationlar) katodga, manfiy ionlar (anionlar) anodga boradi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Tok taʼsirida kationlar ' },
            { blank: 'katodga' },
            { text: ', anionlar esa ' },
            { blank: 'anodga' },
            { text: ' harakatlanadi.' }
          ],
          bank: ['katodga', 'anodga', 'yuqoriga', 'pastga']
        }
      }
    },
    {
      id: 'k9q7',
      prompt: 'Qaysi qatorda faqat kuchli elektrolitlar bor?',
      hint: 'Erimaydigan asos va kuchsiz kislotalar yoʻq boʻlsin.',
      explanation: 'CaCl₂, HNO₃, CuSO₄ — hammasi kuchli.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['CaCl₂, HNO₃, CuSO₄', 'NaCl, HF, Zn(OH)₂', 'H₂SO₃, NH₄OH, H₂CO₃', 'Al(OH)₃, NH₄OH, NaOH'], answerIndex: 0 } }
    },
    {
      id: 'k9q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kristallda ionlar harakatlanmaydi.',
      explanation: 'Dissotsiatsiya qaytar; qattiq NaCl tok oʻtkazmaydi; distillangan suv — noelektrolit deyarli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Elektrolitik dissotsiatsiya qaytar jarayon.', value: true },
            { text: 'Kuchsiz elektrolit eritmasi suyultirilsa, yaxshiroq tok oʻtkazadi.', value: true },
            { text: 'Quruq osh tuzi kristali tokni yaxshi oʻtkazadi.', value: false },
            { text: 'Shakar eritmasi kuchli elektrolit.', value: false }
          ]
        }
      }
    }
  ]
};
