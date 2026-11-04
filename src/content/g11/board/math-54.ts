import type { BoardLesson } from './types';

/** granata uloqtirish: (yosh; uzoqlik) */
const THROW: [number, number][] = [[12, 20], [16, 35], [16, 23], [18, 38], [13, 27], [19, 47], [11, 18], [10, 15], [20, 50], [17, 33], [15, 22], [13, 20]];
/** boʻy va vazn (15 nafar yigit) */
const BODY: [number, number][] = [[167, 62], [169, 67], [179, 70], [178, 72], [177, 70], [175, 69], [171, 63], [181, 80], [174, 73], [175, 66], [180, 75], [174, 70], [172, 67], [178, 74], [171, 66]];
const POS: [number, number][] = [[1, 1.4], [2, 2.1], [3, 2.6], [4, 4.2], [5, 4.6], [6, 5.8], [2.5, 3], [4.5, 3.8]];
const NEG: [number, number][] = [[1, 5.6], [2, 5.1], [3, 4], [4, 3.5], [5, 2.1], [6, 1.4], [2.5, 4.8], [4.5, 2.6]];
const NONE: [number, number][] = [[1, 3], [2, 5.5], [3, 1.5], [4, 4.5], [5, 2.5], [6, 5], [2.5, 2.2], [4.5, 1.2], [3.5, 3.8]];
const dots = (axes: string, pts: [number, number][], color: 'blue' | 'red' | 'green' | 'purple' | 'orange') =>
  pts.map(([x, y]) => ({ t: 'dot' as const, axes, x, y, color }));

/** Darslik (2-qism): 68–70-mavzu (57–62-betlar) — sochilish diagrammasi, bogʻlanish yoʻnalishi va kuchi. */
export const MATH_54: BoardLesson = {
  n: 54,
  label: '68–69',
  part: 'algebra',
  qism: 2,
  title: 'Sochilish diagrammasi: ikki kattalik bogʻliqmi?',
  section: '68–70',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Boʻyi baland odam ogʻirroq boʻladimi? 15 nafar yigitning boʻyi va vazni oʻlchandi. Har bir yigitni bitta nuqta qilib belgilaymiz: abssissa — boʻy, ordinata — vazn. Bunday rasm sochilish diagrammasi deyiladi. Qatʼiy qonun yoʻq: bir xil boʻyli yigitlar turlicha vaznda. Ammo umuman olganda, boʻy oshsa, vazn ham oshadi.",
      easy: "Har bir odam — bitta nuqta (boʻy; vazn). Umuman, boʻy oshsa, vazn ham oshadi.",
      draw: [
        { t: 'title', text: 'Boʻy va vazn' },
        { t: 'axes', id: 'g', x: 8, y: 16, w: 56, h: 46, xmin: 165, xmax: 183, ymin: 58, ymax: 82, xlabel: 'boʻy', ylabel: 'vazn' },
        ...dots('g', BODY, 'blue'),
        { t: 'list', x: 68, y: 24, items: ['1 odam = 1 nuqta', 'qatʼiy qonun yoʻq', 'lekin umuman ↗'] }
      ],
      next: 'Yana bir misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Maktab musobaqasida yosh sportchilar granata uloqtirdi. Nuqtalar: abssissa — yosh, ordinata — uloqtirish masofasi. Ikkita 13 yashar va ikkita 16 yashar sportchi turlicha natija koʻrsatdi, lekin umumiy manzara aniq: yosh kattaroq boʻlsa, natija ham yuqoriroq. Sochilish diagrammasi bogʻlanishning taxminiy xarakterini koʻrsatadi.",
      easy: "Umuman olganda, yoshi kattaroq sportchi uzoqroq uloqtiradi.",
      draw: [
        { t: 'title', text: 'Granata uloqtirish' },
        { t: 'axes', id: 'g', x: 8, y: 16, w: 56, h: 46, xmin: 9, xmax: 21, ymin: 10, ymax: 52, xlabel: 'yosh', ylabel: 'm' },
        ...dots('g', THROW, 'orange'),
        { t: 'list', x: 68, y: 26, items: ['yosh ↑', 'masofa ↑'], color: 'green' }
      ],
      next: 'Bogʻlanish yoʻnalishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bogʻlanish yoʻnalishi uch xil boʻladi. Musbat: bir kattalik oʻssa, ikkinchisi ham oʻsadi — nuqtalar yuqoriga koʻtariladi. Manfiy: biri oʻssa, ikkinchisi kamayadi — nuqtalar pastga tushadi. Uchinchisi — bogʻlanish yoʻq, nuqtalar tartibsiz sochilgan, masalan tana harorati va qon bosimi.",
      easy: "Musbat ↗, manfiy ↘, bogʻlanish yoʻq — tartibsiz.",
      draw: [
        { t: 'title', text: 'Uch xil yoʻnalish' },
        { t: 'axes', id: 'a', x: 5, y: 20, w: 27, h: 30, xmin: 0, xmax: 7, ymin: 0, ymax: 7 },
        ...dots('a', POS, 'green'),
        { t: 'axes', id: 'b', x: 37, y: 20, w: 27, h: 30, xmin: 0, xmax: 7, ymin: 0, ymax: 7 },
        ...dots('b', NEG, 'red'),
        { t: 'axes', id: 'c', x: 69, y: 20, w: 27, h: 30, xmin: 0, xmax: 7, ymin: 0, ymax: 7 },
        ...dots('c', NONE, 'purple'),
        { t: 'text', x: 18, y: 60, text: 'musbat', color: 'green', anchor: 'middle' },
        { t: 'text', x: 50, y: 60, text: 'manfiy', color: 'red', anchor: 'middle' },
        { t: 'text', x: 82, y: 60, text: 'yoʻq', color: 'purple', anchor: 'middle' }
      ],
      next: 'Kuchli yoki sust?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Nuqtalar qandaydir toʻgʻri chiziq yaqinida zich joylashsa, bogʻlanish chiziqli va kuchli deyiladi — bunda bir kattalikka qarab ikkinchisini oldindan aytish, yaʼni prognoz qilish mumkin. Nuqtalar chiziq atrofida keng tarqalsa, bogʻlanish sust: prognoz ishonchsiz.",
      easy: "Nuqtalar chiziqqa yaqin — kuchli bogʻlanish. Keng tarqalgan — sust.",
      draw: [
        { t: 'title', text: 'Kuchli va sust bogʻlanish' },
        { t: 'axes', id: 'a', x: 6, y: 18, w: 38, h: 36, xmin: 0, xmax: 7, ymin: 0, ymax: 7 },
        { t: 'curve', axes: 'a', points: [[0.5, 0.8], [6.5, 6.4]], color: 'blue', dashed: true },
        ...dots('a', [[1, 1.4], [2, 2], [3, 3.2], [4, 3.8], [5, 5.1], [6, 5.8], [1.5, 1.6], [3.5, 3.3], [5.5, 5.4]], 'green'),
        { t: 'axes', id: 'b', x: 54, y: 18, w: 38, h: 36, xmin: 0, xmax: 7, ymin: 0, ymax: 7 },
        { t: 'curve', axes: 'b', points: [[0.5, 0.8], [6.5, 6.4]], color: 'blue', dashed: true },
        ...dots('b', [[1, 3], [2, 0.8], [3, 4.8], [4, 2.2], [5, 6.4], [6, 3.8], [1.5, 2.4], [3.5, 1.6], [5.5, 5.6]], 'orange'),
        { t: 'text', x: 25, y: 63, text: 'kuchli', color: 'green', anchor: 'middle' },
        { t: 'text', x: 73, y: 63, text: 'sust', color: 'orange', anchor: 'middle' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Oʻquvchilarning ona tili va matematika test natijalarini qaraylik: ona tili 64, 67, 69, 70, 73, 74, 77, 82, 84, 85; matematika esa 85, 82, 80, 82, 72, 71, 70, 71, 62, 66. Ona tili bali oshgan sari matematika bali kamaymoqda — bu manfiy bogʻlanish, va u ancha kuchli.",
      easy: "Ona tili ↑, matematika ↓ — manfiy bogʻlanish.",
      draw: [
        { t: 'title', text: 'Ona tili va matematika' },
        { t: 'axes', id: 'g', x: 8, y: 16, w: 56, h: 46, xmin: 60, xmax: 88, ymin: 58, ymax: 88, xlabel: 'ona tili', ylabel: 'mat.' },
        ...dots('g', [[64, 85], [67, 82], [69, 80], [70, 82], [73, 72], [74, 71], [77, 70], [82, 71], [84, 62], [85, 66]], 'red'),
        { t: 'list', x: 68, y: 24, items: ['nuqtalar ↘', 'manfiy bogʻlanish'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Sochilish diagrammasi — (xᵢ; yᵢ) juftliklarni nuqtalar bilan tasvirlash.',
    'Bogʻlanish musbat (↗), manfiy (↘) yoki umuman yoʻq boʻlishi mumkin.',
    'Nuqtalar toʻgʻri chiziqqa qancha yaqin boʻlsa, chiziqli bogʻlanish shuncha kuchli.'
  ],
  questions: [
    {
      id: 'p54q1',
      prompt: 'Qaysi juftliklarda musbat bogʻlanish kutiladi? Hammasini belgilang.',
      hint: 'Biri oʻssa, ikkinchisi ham oʻsadimi?',
      explanation: 'Boʻy–vazn, yosh–uloqtirish masofasi, tayyorlanish vaqti–test bali: musbat. Mashina yoshi–narxi: manfiy. Poyabzal oʻlchami–matematika bahosi: bogʻlanish yoʻq.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'boʻy va vazn', correct: true },
            { label: 'sportchi yoshi va uloqtirish masofasi', correct: true },
            { label: 'mashina yoshi va narxi' },
            { label: 'tayyorlanish vaqti va test bali', correct: true },
            { label: 'poyabzal oʻlchami va matematika bahosi' }
          ]
        }
      }
    },
    {
      id: 'p54q2',
      prompt: 'Juftliklarni bogʻlanish turi boʻyicha ajrating.',
      hint: 'Biri oʻssa, ikkinchisi nima boʻladi?',
      explanation: 'Oʻgʻit va oʻsish, harorat va muzqaymoq savdosi — musbat; sportchi vazni va tezligi, yugurish vaqti va sakrash uzunligi — manfiy.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'p', label: 'Musbat' },
            { id: 'm', label: 'Manfiy' }
          ],
          items: [
            { emoji: '', label: 'oʻgʻit miqdori va gʻoʻza oʻsishi', bin: 'p' },
            { emoji: '', label: 'havo harorati va muzqaymoq savdosi', bin: 'p' },
            { emoji: '', label: 'boʻy va vazn', bin: 'p' },
            { emoji: '', label: 'sportchi vazni va maksimal tezligi', bin: 'm' },
            { emoji: '', label: '60 m yugurish vaqti va sakrash uzunligi', bin: 'm' },
            { emoji: '', label: 'maosh va ishdan ketganlar soni', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'p54q3',
      prompt: 'Sochilish diagrammasida har bir nuqta nimani bildiradi?',
      hint: 'Bitta obyekt uchun ikkita oʻlchov.',
      explanation: 'Har bir nuqta — bitta obyekt (masalan, odam) uchun ikki kattalik juftligi (boʻy; vazn).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Bitta kattalikning chastotasi', 'Bitta obyektning ikki kattaligi (x; y)', 'Ikki qatorning oʻrta qiymatlari', 'Oraliqning oʻrtasi'], answerIndex: 1 } }
    },
    {
      id: 'p54q4',
      prompt: 'Granata uloqtirish jadvalida 20 yoshli sportchi 50 m, 10 yoshli sportchi 15 m uloqtirdi. Ular orasidagi farq necha metr?',
      hint: '50 − 15.',
      explanation: '35 m. Bu katta farq yosh bilan musbat bogʻlanishni tasdiqlaydi.',
      widget: { type: 'number_answer', props: { answer: 35, unit: 'm' } }
    },
    {
      id: 'p54q5',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Sochilish diagrammasi qatʼiy qonun koʻrsatadimi?',
      explanation: 'Diagramma bogʻlanishning taxminiy xarakterini koʻrsatadi; nuqtalar chiziqqa yaqin boʻlsa — kuchli; tartibsiz boʻlsa — bogʻlanish yoʻq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sochilish diagrammasi bogʻlanishning taxminiy xarakterini koʻrsatadi.', value: true },
            { text: 'Manfiy bogʻlanishda bir kattalik oʻssa, ikkinchisi ham oʻsadi.', value: false },
            { text: 'Nuqtalar toʻgʻri chiziq yaqinida zich boʻlsa, bogʻlanish kuchli.', value: true },
            { text: 'Tana harorati va qon bosimi kuchli musbat bogʻlangan.', value: false }
          ]
        }
      }
    },
    {
      id: 'p54q6',
      prompt: 'Atamani maʼnosi bilan moslang.',
      hint: 'Prognoz — oldindan aytish.',
      explanation: 'Musbat — birga oʻsadi; manfiy — biri oʻssa, biri kamayadi; bogʻlanish yoʻq — tartibsiz; kuchli — chiziqqa yaqin.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Musbat bogʻlanish', right: 'ikkalasi birga oʻsadi' },
            { left: 'Manfiy bogʻlanish', right: 'biri oʻssa, biri kamayadi' },
            { left: 'Bogʻlanish yoʻq', right: 'nuqtalar tartibsiz' },
            { left: 'Kuchli bogʻlanish', right: 'nuqtalar chiziqqa yaqin' }
          ]
        }
      }
    },
    {
      id: 'p54q7',
      prompt: 'Ortiqchasini toping (qolganlari musbat bogʻlanish).',
      hint: 'Qaysi juftlikda biri oʻssa, biri kamayadi?',
      explanation: 'Mashina yoshi oshsa, narxi tushadi — manfiy bogʻlanish.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'boʻy — vazn' }, { text: 'oʻgʻit — hosil' }, { text: 'mashina yoshi — narxi', odd: true }, { text: 'mashq vaqti — natija' }] } }
    }
  ]
};
