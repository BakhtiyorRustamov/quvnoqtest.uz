import type { BoardLesson } from './types';
import { BOB3 } from './biologiya-24';

/** Darslik: Biologiya 11, 29-§ (150–154-betlar) — moddalarning geologik va biologik davriy aylanishi, biogen elementlar, biosfera barqarorligi mexanizmlari. */
export const BIO_29: BoardLesson = {
  n: 29,
  label: '29',
  group: BOB3,
  title: 'Modda va energiyaning davriy aylanishi',
  section: '29-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Sizning tanangizdagi uglerod atomi bir vaqtlar dinozavr suyagida, undan oldin esa qadimgi daraxt bargida boʻlgan boʻlishi mumkin. Yerdagi moddalar bir marta ishlatilib tugamaydi — ular qayta-qayta aylanadi. Shuning uchun biosfera milliardlab yil mavjud.",
      easy: "Moddalar qayta-qayta aylanadi — biosfera shuning uchun barqaror.",
      draw: [
        { t: 'title', text: 'Atomlar sayohati' },
        { t: 'icon', x: 16, y: 40, emoji: '♻️', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['barg → dinozavr → inson', 'moddalar qayta ishlatiladi', 'aylanish — barqarorlik asosi'] }
      ],
      next: 'Geologik aylanish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Geologik aylanish — abiotik omillar taʼsirida moddalar migratsiyasi. Quyosh, atmosfera va yogʻin togʻ jinslarini yemiradi, shamol nuratadi, suv okeanga oqizadi; ular tubda choʻkindi jinslar boʻlib toʻplanadi. Tektonik harakatlar bilan okean tubi koʻtarilib quruqlikka, quruqlik esa suv ostiga tushadi. Bu aylanish oʻn minglab, yuz minglab yil davom etadi.",
      easy: "Geologik aylanish — yemirilish, okeanga oqish, choʻkish, koʻtarilish.",
      draw: [
        { t: 'title', text: 'Geologik aylanish' },
        { t: 'box', id: 'a', x: 4, y: 24, w: 28, h: 8, text: 'togʻ jinslari' },
        { t: 'box', id: 'b', x: 36, y: 24, w: 26, h: 8, text: 'yemirilish' },
        { t: 'box', id: 'c', x: 66, y: 24, w: 30, h: 8, text: 'okean tubi', color: 'blue' },
        { t: 'box', id: 'd', x: 36, y: 44, w: 26, h: 8, text: 'koʻtarilish', color: 'orange' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' },
        { t: 'arrow', from: 'd', to: 'a' }
      ],
      next: 'Biologik aylanish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hayot paydo boʻlgach, geologik aylanish asosida biologik aylanish yuzaga keldi: produtsentlar fotosintezda anorganik moddalardan organik modda yasaydi, konsumentlar uni isteʼmol qiladi, redutsentlar yana anorganik moddagacha parchalaydi. Ikkala aylanish bir-biri bilan chambarchas bogʻlangan — birgalikda ular biogeokimyoviy aylanish deyiladi.",
      easy: "Biologik aylanish: produtsent → konsument → redutsent → yana produtsent.",
      draw: [
        { t: 'title', text: 'Biologik aylanish' },
        { t: 'box', id: 'p', x: 34, y: 18, w: 30, h: 8, text: 'produtsent', color: 'green' },
        { t: 'box', id: 'c', x: 62, y: 40, w: 30, h: 8, text: 'konsument', color: 'orange' },
        { t: 'box', id: 'r', x: 34, y: 58, w: 30, h: 8, text: 'redutsent', color: 'purple' },
        { t: 'box', id: 'm', x: 4, y: 40, w: 30, h: 8, text: 'mineral modda', color: 'blue' },
        { t: 'arrow', from: 'p', to: 'c' },
        { t: 'arrow', from: 'c', to: 'r' },
        { t: 'arrow', from: 'r', to: 'm' },
        { t: 'arrow', from: 'm', to: 'p' }
      ],
      next: 'Farqlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikki aylanish farqi: geologik aylanishning harakatlantiruvchi kuchi — suvning okean va quruqlik oʻrtasida aylanishi, biologikniki — organizmlarning oziqlanishi. Geologikda barcha elementlar, biologikda faqat biogen elementlar qatnashadi. Geologik — oʻn-yuz ming yillar, biologik — bir necha yildan yuz yilgacha. Biogen elementlar: C, H, O, N, S, P eng muhimi, yana Ca, K, Fe, Mg, Zn, I va boshqalar.",
      easy: "Geologik — barcha elementlar, uzoq; biologik — biogen elementlar, qisqa.",
      draw: [
        { t: 'title', text: 'Geologik va biologik' },
        { t: 'table', x: 4, y: 20, rows: [['jihat', 'geologik', 'biologik'], ['kuchi', 'suv aylanishi', 'oziqlanish'], ['elementlar', 'hammasi', 'biogen'], ['davomiyligi', 'yuz ming yillar', 'yillar, asrlar']] },
        { t: 'text', x: 4, y: 52, text: 'eng muhim biogen elementlar: C, H, O, N, S, P', size: 's', color: 'purple' }
      ],
      next: 'Barqarorlik'
    },
    {
      kind: 'example',
      clear: true,
      say: "Biosfera barqarorligining asosi — quyosh energiyasi va yashil oʻsimliklardagi xlorofill. Oʻsimliklar CO₂, suv va tuzlardan birlamchi mahsulot yaratadi; hayvonlar uni ikkilamchi mahsulotga aylantiradi va CO₂ chiqaradi; oʻlgan organizmlarni zamburugʻ va bakteriyalar mineral moddalargacha parchalaydi; bu moddalar yana fotosintezga qaytadi. Turlar xilma-xilligi va bir turning oʻrnini boshqasi toʻldira olishi ham barqarorlikni taʼminlaydi.",
      easy: "Quyosh + xlorofill → aylanish; xilma-xillik — barqarorlik.",
      draw: [
        { t: 'title', text: 'Barqarorlik asosi' },
        { t: 'icon', x: 12, y: 36, emoji: '☀️', size: 'l' },
        { t: 'list', x: 26, y: 22, items: ['quyosh energiyasi', 'xlorofill — fotosintez', 'redutsentlar — qaytarish', 'turlar xilma-xilligi'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Geologik aylanish — abiotik omillar taʼsirida jinslar yemirilishi, okeanga oqishi, choʻkishi va koʻtarilishi; yuz ming yillab davom etadi.',
    'Biologik aylanish — produtsent → konsument → redutsent → mineral modda; faqat biogen elementlar (eng muhimi C, H, O, N, S, P) qatnashadi.',
    'Ikkalasi birgalikda biogeokimyoviy aylanish; uning asosi — quyosh energiyasi va xlorofill, barqarorligi — turlar xilma-xilligi.'
  ],
  questions: [
    {
      id: 'b29q1',
      prompt: 'Xususiyatni aylanish turiga ajrating.',
      hint: 'Biologik — tirik organizmlar orqali.',
      explanation: 'Geologik: barcha elementlar, suv aylanishi kuchi, yuz ming yillar. Biologik: biogen elementlar, oziqlanish kuchi, yillar-asrlar.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'g', label: 'Geologik' },
            { id: 'b', label: 'Biologik' }
          ],
          items: [
            { emoji: '', label: 'barcha kimyoviy elementlar', bin: 'g' },
            { emoji: '', label: 'harakatlantiruvchi kuch — suv aylanishi', bin: 'g' },
            { emoji: '', label: 'yuz ming yillar davom etadi', bin: 'g' },
            { emoji: '', label: 'faqat biogen elementlar', bin: 'b' },
            { emoji: '', label: 'harakatlantiruvchi kuch — oziqlanish', bin: 'b' },
            { emoji: '', label: 'bir necha yildan asrgacha', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'b29q2',
      prompt: 'Biologik aylanish bosqichlarini tartiblang.',
      hint: 'Fotosintezdan boshlanadi.',
      explanation: 'Produtsent organik modda yasaydi → konsument isteʼmol qiladi → redutsent parchalaydi → mineral moddalar yana produtsentga.',
      widget: {
        type: 'step_order',
        props: { steps: ['produtsent organik modda yasaydi', 'konsument uni isteʼmol qiladi', 'redutsent qoldiqni parchalaydi', 'mineral modda yana produtsentga qaytadi'] }
      }
    },
    {
      id: 'b29q3',
      prompt: 'Eng muhim biogen elementlarni belgilang.',
      hint: 'Oltita element.',
      explanation: 'C, H, O, N, S, P.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'C', correct: true },
            { label: 'N', correct: true },
            { label: 'P', correct: true },
            { label: 'S', correct: true },
            { label: 'Au' },
            { label: 'Ne' }
          ]
        }
      }
    },
    {
      id: 'b29q4',
      prompt: 'Biologik va geologik aylanishlar birgalikda qanday ataladi?',
      hint: 'Bio + geo + kimyo.',
      explanation: 'Biogeokimyoviy aylanish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['suksessiya', 'biogeokimyoviy aylanish', 'fotosintez', 'gomeostaz'], answerIndex: 1 } }
    },
    {
      id: 'b29q5',
      prompt: 'Biologik aylanishning asosi nima?',
      hint: 'Energiya manbayi va pigment.',
      explanation: 'Quyosh energiyasi va yashil oʻsimliklardagi xlorofill.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['vulqonlar', 'quyosh energiyasi va xlorofill', 'shamol', 'Oyning tortishi'], answerIndex: 1 } }
    },
    {
      id: 'b29q6',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Hayvonlar — ikkilamchi.',
      explanation: 'Oʻsimliklar birlamchi mahsulot yaratadi, hayvonlar uni ikkilamchi mahsulotga aylantiradi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Oʻsimliklar ' }, { blank: 'birlamchi' }, { text: ' mahsulot yaratadi, hayvonlar uni ' }, { blank: 'ikkilamchi' }, { text: ' mahsulotga aylantiradi.' }],
          bank: ['birlamchi', 'ikkilamchi', 'geologik', 'abiogen']
        }
      }
    },
    {
      id: 'b29q7',
      prompt: 'Geologik aylanishda nima sodir boʻlmaydi?',
      hint: 'Geologik — abiotik.',
      explanation: 'Fotosintez — biologik aylanish jarayoni.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'jinslar yemirilishi' }, { text: 'okean tubida choʻkma' }, { text: 'fotosintez', odd: true }, { text: 'tektonik koʻtarilish' }] } }
    },
    {
      id: 'b29q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Biologik — qisqaroq.',
      explanation: 'Biologik aylanish geologikdan qisqa; redutsentlar elementlarni geologik aylanishga ham oʻtkazishi mumkin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Biologik aylanish geologik aylanishdan ancha qisqa.', value: true },
            { text: 'Ikki aylanish bir-biri bilan chambarchas bogʻliq.', value: true },
            { text: 'Biologik aylanishda Yer qobigʻidagi barcha elementlar qatnashadi.', value: false },
            { text: 'Geologik aylanish hayot paydo boʻlgandan keyin boshlangan.', value: false }
          ]
        }
      }
    }
  ]
};
