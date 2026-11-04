import type { BoardLesson } from './types';
import { BOB4 } from './kimyo-12';

/** Darslik: Umumiy kimyo 11, 13-mavzu (65–70-betlar) — eruvchanlik koeffitsiyenti, eruvchanlikka harorat va bosim taʼsiri, toʻyingan, toʻyinmagan va oʻta toʻyingan eritmalar. */
export const KIM_13: BoardLesson = {
  n: 13,
  label: '13',
  group: BOB4,
  title: 'Eruvchanlik',
  section: '13-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Gazli ichimlik qopqogʻini ochsangiz, pufakchalar otilib chiqadi. Sovuq ichimlikda gaz uzoqroq saqlanadi, iliqida tez chiqib ketadi. Shakar esa aksincha — issiq choyda tez va koʻp eriydi. Moddalarning erish xususiyati — eruvchanlik — harorat va bosimga bogʻliq.",
      easy: "Gaz sovuqda yaxshi eriydi, shakar — issiqda.",
      draw: [
        { t: 'title', text: 'Gazli ichimlik' },
        { t: 'icon', x: 16, y: 34, emoji: '🥤', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '☕', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['ochilganda — gaz chiqadi', 'sovuqda gaz koʻp eriydi', 'shakar issiqda koʻp eriydi'] }
      ],
      next: 'Eruvchanlik koeffitsiyenti'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Moddaning 100 gramm erituvchida maʼlum haroratda eriy oladigan eng koʻp massasi — eruvchanlik koeffitsiyenti, S bilan belgilanadi. Masalan, osh tuzi uchun 20 gradusda S teng 36: 100 gramm suvda 36 gramm tuz eriydi. Moddalar uch guruhga boʻlinadi: yaxshi eriydigan — 10 grammdan koʻp, oz eriydigan — 1 grammdan kam, amalda erimaydigan — 0,01 gramm va undan kam.",
      easy: "S — 100 g suvda eriydigan eng koʻp massa. NaCl: S(20 °C) = 36.",
      draw: [
        { t: 'title', text: 'Eruvchanlik koeffitsiyenti' },
        { t: 'formula', x: 4, y: 24, text: 'S(20 °C, NaCl) = 36 g / 100 g suv' },
        { t: 'table', x: 4, y: 34, rows: [['guruh', '100 g suvda', 'misol'], ['yaxshi eriydigan', '> 10 g', 'KCl, shakar, HCl, NH₃'], ['oz eriydigan', '< 1 g', 'CaSO₄, CaCO₃, N₂'], ['amalda erimaydigan', '≤ 0,01 g', 'oltin, kumush, mis']] }
      ],
      next: 'Harorat taʼsiri'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Koʻpchilik qattiq moddalar eriganda issiqlik yutiladi, shuning uchun harorat ortishi bilan ularning eruvchanligi ortadi. Grafikda kaliy nitrat eruvchanligi isitilganda keskin oshadi, osh tuziniki esa deyarli oʻzgarmaydi. Gazlarning eruvchanligi esa harorat koʻtarilganda kamayadi — muzlatkichdan olingan suvda pufakchalar paydo boʻlishi shuning uchun.",
      easy: "Qattiq moddalar: T ↑ → S ↑. Gazlar: T ↑ → S ↓.",
      draw: [
        { t: 'title', text: 'Eruvchanlik egri chiziqlari' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 56, h: 44, xmin: 0, xmax: 80, ymin: 0, ymax: 180, xlabel: 't, °C', ylabel: 'S, g' },
        { t: 'curve', axes: 'g', points: [[0, 13], [20, 32], [40, 64], [60, 110], [80, 169]], color: 'red' },
        { t: 'curve', axes: 'g', points: [[0, 35.7], [20, 36], [40, 36.6], [60, 37.3], [80, 38.4]], color: 'blue' },
        { t: 'list', x: 68, y: 26, items: ['qizil — KNO₃', 'koʻk — NaCl'] },
        { t: 'text', x: 68, y: 50, text: 'gazlar: T ↑ → S ↓', size: 's', color: 'purple' }
      ],
      next: 'Bosim taʼsiri'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gazlar eruvchanligi bosimga toʻgʻri proporsional. Gʻavvos chuqurga tushgan sari bosim ortadi va qonida koʻproq gaz eriydi. Agar u juda tez koʻtarilsa, qondan ajralgan gaz pufakchalari tomirlarni tiqib qoʻyishi mumkin — shuning uchun sekin koʻtariladi. Gazli ichimliklar yuqori bosim va past haroratda tayyorlanadi; qopqoq ochilganda bosim kamayib, gaz ajraladi.",
      easy: "Gazlar: P ↑ → S ↑. Gʻavvos sekin koʻtariladi; ichimlik ochilganda gaz chiqadi.",
      draw: [
        { t: 'title', text: 'Bosim va gazlar eruvchanligi' },
        { t: 'icon', x: 14, y: 34, emoji: '🤿', size: 'l' },
        { t: 'list', x: 28, y: 26, items: ['chuqurda bosim ↑ → qonda gaz ↑', 'tez koʻtarilish — xavfli', 'ichimlik: yuqori P, past T'] },
        { t: 'formula', x: 4, y: 58, text: 'gazlar: S ~ P,  T ↑ → S ↓' }
      ],
      next: 'Toʻyingan eritma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Shu haroratda modda boshqa erimaydigan eritma — toʻyingan, yana eriy oladigan — toʻyinmagan. Ammoniy xlorid uchun S 20 gradusda 37,2, 30 gradusda 41,4. 100 gramm suvda 35 gramm eritsak — toʻyinmagan; yana 2,2 gramm qoʻshsak — toʻyingan. Ortiqcha 4,2 grammni 30 gradusgacha isitib eritib, ehtiyotkorlik bilan sovitsak — oʻta toʻyingan eritma hosil boʻladi. U beqaror: silkitilsa, ortiqcha tuz choʻkadi.",
      easy: "Toʻyinmagan → toʻyingan → oʻta toʻyingan (beqaror).",
      draw: [
        { t: 'title', text: 'NH₄Cl eritmalari' },
        { t: 'table', x: 4, y: 20, rows: [['100 g suvda, 20 °C', 'eritma'], ['35 g', 'toʻyinmagan'], ['37,2 g', 'toʻyingan'], ['41,4 g (30 °C dan sovitilgan)', 'oʻta toʻyingan']] },
        { t: 'list', x: 4, y: 52, items: ['S(20 °C) = 37,2;  S(30 °C) = 41,4', 'oʻta toʻyingan — silkitilsa choʻkma tushadi'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Osh tuzining 20 gradusdagi eruvchanligi 36. 250 gramm suvda eng koʻpi bilan qancha tuz eriydi va toʻyingan eritma massasi qancha? 100 gramm suvda 36 gramm boʻlsa, 250 grammda: 36 karra 2,5 — 90 gramm. Toʻyingan eritma massasi 250 qoʻshuv 90 — 340 gramm.",
      easy: "m(tuz) = 36 · 250/100 = 90 g; eritma 340 g.",
      draw: [
        { t: 'title', text: 'Qancha tuz eriydi?' },
        { t: 'formula', x: 4, y: 24, text: 'm = S · m(suv) / 100' },
        { t: 'formula', x: 4, y: 38, text: 'm = 36 · 250 / 100 = 90 g' },
        { t: 'formula', x: 4, y: 52, text: 'm(eritma) = 250 + 90 = 340 g' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Eruvchanlik koeffitsiyenti S — 100 g erituvchida maʼlum haroratda eriy oladigan eng koʻp modda massasi.',
    'Qattiq moddalar eruvchanligi harorat bilan ortadi; gazlar eruvchanligi harorat ortsa kamayadi, bosim ortsa ortadi.',
    'Eritmalar: toʻyinmagan, toʻyingan va oʻta toʻyingan (beqaror).'
  ],
  questions: [
    {
      id: 'k13q1',
      prompt: 'S(NH₄Cl, 20 °C) = 37,2. 100 g suvda 35 g NH₄Cl erigan. Eritma toʻyingan boʻlishi uchun yana necha gramm tuz qoʻshish kerak?',
      hint: '37,2 − 35.',
      explanation: '2,2 g.',
      widget: { type: 'number_answer', props: { answer: 2.2, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k13q2',
      prompt: 'S(NH₄Cl, 30 °C) = 41,4. 30 °C dagi toʻyingan eritma (100 g suv bilan) massasi necha gramm?',
      hint: '100 + 41,4.',
      explanation: '141,4 g.',
      widget: { type: 'number_answer', props: { answer: 141.4, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k13q3',
      prompt: 'S(KNO₃, 40 °C) ≈ 64. 50 g suvda eng koʻpi bilan necha gramm KNO₃ eriydi?',
      hint: '64 · 50 / 100.',
      explanation: '32 g.',
      widget: { type: 'number_answer', props: { answer: 32, unit: 'g' } }
    },
    {
      id: 'k13q4',
      prompt: 'Moddalarni eruvchanlik guruhiga ajrating.',
      hint: '> 10 g, < 1 g, ≤ 0,01 g.',
      explanation: 'Yaxshi: osh tuzi, shakar, HCl. Oz: BaSO₄, N₂. Amalda erimaydigan: oltin, kumush.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'g', label: 'Yaxshi eriydi' },
            { id: 'o', label: 'Oz eriydi' },
            { id: 'n', label: 'Amalda erimaydi' }
          ],
          items: [
            { emoji: '', label: 'osh tuzi', bin: 'g' },
            { emoji: '', label: 'shakar', bin: 'g' },
            { emoji: '', label: 'vodorod xlorid', bin: 'g' },
            { emoji: '', label: 'bariy sulfat', bin: 'o' },
            { emoji: '', label: 'azot', bin: 'o' },
            { emoji: '', label: 'oltin', bin: 'n' },
            { emoji: '', label: 'kumush', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'k13q5',
      prompt: 'Gazlarning suvda eruvchanligi qanday oʻzgaradi?',
      hint: 'Gazli ichimlik misoli.',
      explanation: 'Harorat ortsa kamayadi, bosim ortsa ortadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['T ↑ va P ↑ da ortadi', 'T ↑ da kamayadi, P ↑ da ortadi', 'T ↑ da ortadi, P ↑ da kamayadi', 'T va P ga bogʻliq emas'], answerIndex: 1 } }
    },
    {
      id: 'k13q6',
      prompt: 'Eritma turini taʼrifi bilan juftlang.',
      hint: 'Oʻta toʻyingan — beqaror.',
      explanation: 'Toʻyinmagan — yana eriy oladi; toʻyingan — boshqa erimaydi; oʻta toʻyingan — toʻyinganidan koʻp erigan, beqaror.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'toʻyinmagan', right: 'modda yana eriy oladi' },
            { left: 'toʻyingan', right: 'modda boshqa erimaydi' },
            { left: 'oʻta toʻyingan', right: 'meʼyordan koʻp erigan, beqaror' }
          ]
        }
      }
    },
    {
      id: 'k13q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Qattiq moddalar eriganda issiqlik...',
      explanation: 'Qattiq moddalarning eruvchanligi harorat ortishi bilan ortadi, chunki eriganda issiqlik yutiladi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Qattiq moddalarning eruvchanligi harorat ortishi bilan ' },
            { blank: 'ortadi' },
            { text: ', chunki eriganda issiqlik ' },
            { blank: 'yutiladi' },
            { text: '.' }
          ],
          bank: ['ortadi', 'yutiladi', 'kamayadi', 'ajraladi']
        }
      }
    },
    {
      id: 'k13q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oʻta toʻyingan eritma beqaror.',
      explanation: 'Gʻavvos sekin koʻtarilishi kerak; oʻta toʻyingan eritma silkitilsa choʻkma tushadi; NaCl eruvchanligi haroratga kam bogʻliq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻta toʻyingan eritma silkitilsa, ortiqcha modda choʻkadi.', value: true },
            { text: 'Osh tuzining eruvchanligi haroratga kam bogʻliq.', value: true },
            { text: 'Gazlar issiq suvda sovuq suvdagidan yaxshi eriydi.', value: false },
            { text: 'Eruvchanlik koeffitsiyenti 1 kg erituvchiga nisbatan olinadi.', value: false }
          ]
        }
      }
    }
  ]
};
