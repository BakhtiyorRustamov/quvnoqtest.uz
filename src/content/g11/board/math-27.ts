import type { BoardLesson } from './types';
import { axes3, boxTo, pt } from './geo3d';

/** Darslik: Geometriya, 1-mavzu (113–114-betlar) — fazoda dekart koordinatalar sistemasi. */
export const MATH_27: BoardLesson = {
  n: 27,
  label: "1.1",
  part: 'geometriya',
  title: "Fazoda koordinatalar sistemasini oʻrganish",
  section: 'Geometriya, 1',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Xonada dron uchib yuribdi. Doʻstingizga uning qayerdaligini aytish uchun nechta son kerak? Devor boʻylab necha metr, ikkinchi devor boʻylab necha metr va poldan qancha balandda. Uchta son! Tekislikda nuqtaga ikkita koordinata yetardi, fazoda esa uchta kerak.",
      easy: "Fazoda nuqtaning oʻrnini aytish uchun uchta son kerak: uzunlik, eni va balandlik.",
      draw: [
        { t: 'title', text: 'Dron qayerda?' },
        { t: 'icon', x: 12, y: 30, emoji: '🚁', size: 'l' },
        { t: 'list', x: 32, y: 22, items: ['x — birinchi devor boʻylab', 'y — ikkinchi devor boʻylab', 'z — poldan balandlik'] },
        { t: 'box', id: 'b', x: 32, y: 50, w: 50, h: 12, text: 'Dron: (2; 3; 1,5)', color: 'green' }
      ],
      next: 'Oʻqlar qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "O nuqtada kesishuvchi va oʻzaro perpendikulyar uchta toʻgʻri chiziq — Ox, Oy va Oz — fazoda dekart koordinatalar sistemasini tashkil qiladi. O — koordinatalar boshi. Ox — abssissalar oʻqi, Oy — ordinatalar oʻqi, Oz — applikatalar oʻqi.",
      easy: "Uchta perpendikulyar oʻq: Ox, Oy, Oz. Ular O nuqtada kesishadi.",
      draw: [
        { t: 'title', text: 'Uchta oʻq' },
        ...axes3([4, 5, 4], [30, 50]),
        { t: 'list', x: 64, y: 24, items: ['Ox — abssissa', 'Oy — ordinata', 'Oz — applikata'] },
        { t: 'text', x: 64, y: 62, text: 'oʻqlar oʻzaro ⊥', size: 's', color: 'purple' }
      ],
      next: 'Tekisliklar-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Har ikki oʻq orqali bitta tekislik oʻtadi: Oxy, Oyz va Oxz — koordinata tekisliklari. Bu uchta tekislik fazoni 8 ta boʻlakka boʻladi, ular oktantalar deyiladi. Birinchi oktantada uchala koordinata ham musbat.",
      easy: "Uchta koordinata tekisligi fazoni 8 ta oktantaga boʻladi.",
      draw: [
        { t: 'title', text: 'Tekisliklar va oktantalar' },
        { t: 'list', x: 6, y: 20, items: ['Oxy tekisligi:  z = 0', 'Oyz tekisligi:  x = 0', 'Oxz tekisligi:  y = 0'] },
        { t: 'box', id: 'o', x: 6, y: 46, w: 56, h: 12, text: 'Fazo = 8 ta oktanta', color: 'orange' },
        { t: 'text', x: 66, y: 54, text: '1-oktanta: x, y, z > 0', size: 's', color: 'green' }
      ],
      next: 'Nuqtani qanday yasaymiz?'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 1-masala: A(2; 3; 4) nuqtani yasang. Ox boʻylab 2 birlik, Oy boʻylab 3 birlik olamiz. Ulardan oʻqlarga parallel chiziqlar oʻtkazib, Oxy tekisligida A1(2; 3; 0) nuqtani topamiz. A1 dan Oz ga parallel ravishda 4 birlik yuqoriga chiqamiz — bu A nuqta.",
      easy: "Avval polda (2; 3) nuqtani topamiz, keyin 4 birlik yuqoriga chiqamiz.",
      draw: [
        { t: 'title', text: 'A(2; 3; 4)' },
        ...axes3([4, 5, 5], [30, 52], 7),
        pt('A', [2, 3, 4], 'A', [30, 52], 7),
        ...boxTo('A', [2, 3, 4], [30, 52], 7),
        { t: 'list', x: 64, y: 22, items: ['x = 2', 'y = 3', 'A₁(2; 3; 0)', 'z = 4  →  A'] }
      ],
      next: 'Yana nuqtalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Nuqta qayerda yotishini koordinatalari aytib beradi. A(0; 5; 0) — Oy oʻqida, chunki ikki koordinatasi nol. B(4; 0; 0) — Ox oʻqida. M(0; 5; 4) — Oyz tekisligida, chunki x teng 0. K(2; 3; 4) — birinchi oktantada. P(minus 2; 3; minus 4) — boshqa oktantada.",
      easy: "Ikkita nol — oʻqda, bitta nol — tekislikda, nol yoʻq — oktantada.",
      draw: [
        { t: 'title', text: 'Nuqta qayerda?' },
        {
          t: 'table',
          x: 10,
          y: 18,
          rows: [
            ['nuqta', 'qayerda'],
            ['A(0; 5; 0)', 'Oy oʻqida'],
            ['B(4; 0; 0)', 'Ox oʻqida'],
            ['M(0; 5; 4)', 'Oyz tekisligida'],
            ['K(2; 3; 4)', '1-oktantada']
          ]
        },
        { t: 'text', x: 10, y: 58, text: 'ikkita nol → oʻq,  bitta nol → tekislik', size: 's', color: 'purple' }
      ],
      next: 'Proyeksiyalar'
    },
    {
      kind: 'example',
      clear: true,
      say: "A(3; 2; 4) nuqtaning koordinata tekisliklaridagi proyeksiyalari: Oxy ga — z ni nolga almashtiramiz: (3; 2; 0). Oyz ga — x ni nolga: (0; 2; 4). Oxz ga — y ni nolga: (3; 0; 4). Nuqtadan Oxy tekisligigacha masofa esa modul z, yaʼni 4.",
      easy: "Proyeksiyada tegishli koordinatani nolga almashtiramiz.",
      draw: [
        { t: 'title', text: 'Proyeksiyalar' },
        ...axes3([4.5, 4, 5], [28, 52], 7),
        pt('A', [3, 2, 4], 'A', [28, 52], 7),
        ...boxTo('A', [3, 2, 4], [28, 52], 7),
        { t: 'list', x: 60, y: 20, items: ['Oxy: (3; 2; 0)', 'Oyz: (0; 2; 4)', 'Oxz: (3; 0; 4)'] },
        { t: 'text', x: 62, y: 62, text: 'Oxy gacha masofa = 4', size: 's', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Fazoda nuqta uchta koordinata bilan beriladi: A(x; y; z) — abssissa, ordinata, applikata.',
    'Koordinata tekisliklari Oxy, Oyz, Oxz fazoni 8 ta oktantaga boʻladi.',
    'Ikkita koordinata nol — nuqta oʻqda; bitta nol — koordinata tekisligida.'
  ],
  questions: [
    {
      id: 'm27q1',
      prompt: 'Nuqtalarni joylashuviga koʻra guruhlang.',
      hint: 'Nechta koordinata nolga teng?',
      explanation: 'Ikkita nol — oʻqda; bitta nol — tekislikda; nol yoʻq — oktantada.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'o', label: 'Oʻqda' },
            { id: 't', label: 'Tekislikda' },
            { id: 'k', label: 'Oktantada' }
          ],
          items: [
            { emoji: '', label: '(0; 3; 0)', bin: 'o' },
            { emoji: '', label: '(5; 0; 0)', bin: 'o' },
            { emoji: '', label: '(2; 0; 7)', bin: 't' },
            { emoji: '', label: '(0; −1; 4)', bin: 't' },
            { emoji: '', label: '(6; 3; 1)', bin: 'k' },
            { emoji: '', label: '(−1; 2; −3)', bin: 'k' }
          ]
        }
      }
    },
    {
      id: 'm27q2',
      prompt: 'A(3; −5; 2) nuqtaning applikatasi nechaga teng?',
      hint: 'Applikata — uchinchi koordinata.',
      explanation: 'z = 2.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'm27q3',
      prompt: 'A(3; 2; 4) nuqtaning proyeksiyalarini moslang.',
      hint: 'Tekislikka kirmagan koordinata nolga aylanadi.',
      explanation: 'Oxy → (3; 2; 0), Oyz → (0; 2; 4), Oxz → (3; 0; 4), Oz oʻqi → (0; 0; 4).',
      widget: {
        type: 'match_pairs',
        props: { pairs: [{ left: 'Oxy tekisligiga', right: '(3; 2; 0)' }, { left: 'Oyz tekisligiga', right: '(0; 2; 4)' }, { left: 'Oxz tekisligiga', right: '(3; 0; 4)' }, { left: 'Oz oʻqiga', right: '(0; 0; 4)' }] }
      }
    },
    {
      id: 'm27q4',
      prompt: 'Koordinata tekisliklari fazoni nechta oktantaga boʻladi?',
      hint: 'Tekislikdagi choraklarni ikki qavat qilib tasavvur qiling.',
      explanation: '4 ta chorak tepada va 4 ta pastda — 8 ta oktanta.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'm27q5',
      prompt: 'Qaysi nuqta Oyz tekisligida yotmaydi? Ortiqchasini bosing.',
      hint: 'Oyz tekisligida x = 0.',
      explanation: '(4; 0; 1) da x = 4 ≠ 0.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: '(0; 2; 5)' }, { text: '(0; −1; 3)' }, { text: '(0; 0; 7)' }, { text: '(4; 0; 1)', odd: true }] } }
    },
    {
      id: 'm27q6',
      prompt: 'A(2; −3; 5) nuqtadan Oxy tekisligigacha boʻlgan masofani toping.',
      hint: 'Oxy dan masofa — |z|.',
      explanation: '|5| = 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'm27q7',
      prompt: 'Gapni toʻldiring.',
      hint: 'Oʻqlarning nomlari.',
      explanation: 'x — abssissa, y — ordinata, z — applikata.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'A(x; y; z) nuqtada x — ' }, { blank: 'abssissa' }, { text: ', y — ' }, { blank: 'ordinata' }, { text: ', z — ' }, { blank: 'applikata' }, { text: '.' }],
          bank: ['abssissa', 'ordinata', 'applikata', 'oktanta']
        }
      }
    },
    {
      id: 'm27q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oʻqdagi nuqtaning ikki koordinatasi nol.',
      explanation: 'Oʻqlar oʻzaro perpendikulyar. Ox dagi nuqtada y = z = 0. Oxy da z = 0. (1; 2; 3) birinchi oktantada.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Koordinata oʻqlari oʻzaro perpendikulyar.', value: true },
            { text: 'Ox oʻqidagi nuqtada y = 0 va z = 0.', value: true },
            { text: 'Oxy tekisligidagi nuqtada x = 0.', value: false },
            { text: '(1; 2; 3) nuqta birinchi oktantada yotadi.', value: true }
          ]
        }
      }
    }
  ]
};
