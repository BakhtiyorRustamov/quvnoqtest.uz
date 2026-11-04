import type { BoardLesson } from './types';
import { BOB4 } from './biologiya-35';

/** Darslik: Biologiya 11, 36-§ (187–190-betlar) — oʻsimliklar filogenezi, vegetativ organlar evolutsiyasi: suvoʻtlardan yopiq urugʻlilargacha. */
export const BIO_36: BoardLesson = {
  n: 36,
  label: '36',
  group: BOB4,
  title: 'Oʻsimliklar va vegetativ organlar filogenezi',
  section: '36-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Qishda yoqiladigan toshkoʻmir — 300 million yil avval oʻsgan ulkan qirqquloqlar qoldigʻi. Ular kislorodsiz botqoqqa tushib, chirimay toshkoʻmirga aylangan. Oʻsimliklar dunyosi bir hujayrali suvoʻtlardan gulli oʻsimliklargacha uzoq yoʻl bosib oʻtgan — bu oʻsimliklar filogenezi.",
      easy: "Toshkoʻmir — qadimgi qirqquloqlar; oʻsimliklar suvoʻtdan gulgacha rivojlangan.",
      draw: [
        { t: 'title', text: 'Toshkoʻmir sirlari' },
        { t: 'icon', x: 16, y: 40, emoji: '🌿', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['ulkan qirqquloqlar', 'kislorodsiz muhit', 'chirimagan → toshkoʻmir'] }
      ],
      next: 'Vegetativ organlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yuksak oʻsimlik organlari ikki guruh: oʻsish va rivojlanishni taʼminlaydigan vegetativ organlar — ildiz, poya, barg va ularning shakli oʻzgarganlari; koʻpayishni taʼminlaydigan generativ organlar. Arxey oxirida fotosintezlovchi bakteriyalar va koʻk-yashil suvoʻtlar, proterozoyda haqiqiy oʻsimliklar — yashil va qizil suvoʻtlar paydo boʻlgan. Bir hujayralidan koʻp hujayrali suvoʻtlarga oʻtish — yirik aromorfoz.",
      easy: "Vegetativ — ildiz, poya, barg; proterozoyda suvoʻtlar, koʻp hujayralilik — aromorfoz.",
      draw: [
        { t: 'title', text: 'Oʻsimlik organlari' },
        { t: 'box', id: 'v', x: 4, y: 22, w: 44, h: 10, text: 'vegetativ: ildiz, poya, barg', color: 'green' },
        { t: 'box', id: 'g', x: 52, y: 22, w: 44, h: 10, text: 'generativ: koʻpayish', color: 'purple' },
        { t: 'text', x: 4, y: 46, text: 'oʻsish va rivojlanish', size: 's' },
        { t: 'text', x: 52, y: 46, text: 'keyingi avlod', size: 's' }
      ],
      next: 'Quruqlikka chiqish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Suv havzalari qisqarganda suvoʻtlar quruqlikda qolib ketdi. Yangi muammolar: qurib qolish, tuproqdan suv shimish, mexanik tayanch, sporalarni saqlash. Natijada dastlab qoplovchi toʻqima, keyin oʻtkazuvchi va mexanik toʻqimalar, ikki asosiy vegetativ organ — ildiz va bargli novda shakllandi. Silur davrida ilk quruqlik oʻsimliklari — psilofitlar paydo boʻldi; quruqlikka chiqish — yirik aromorfoz.",
      easy: "Quruqlik: qoplovchi, oʻtkazuvchi, mexanik toʻqima; silurda psilofitlar.",
      draw: [
        { t: 'title', text: 'Quruqlik muammolari' },
        { t: 'table', x: 4, y: 18, rows: [['muammo', 'yechim'], ['qurib qolish', 'qoplovchi toʻqima'], ['suv tashish', 'oʻtkazuvchi toʻqima'], ['shamol, ogʻirlik', 'mexanik toʻqima'], ['suv shimish', 'ildiz']] }
      ],
      next: 'Paleozoy'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Devonda yoʻsinlar, plaunlar, qirqboʻgʻimlar va qirqquloqlar paydo boʻldi. Yoʻsinlar sodda: rizoid, poyasida oʻtkazuvchi toʻqima yoʻq. Kalamitlar — qadimgi qirqboʻgʻimlar 25 metrgacha boʻlgan. Nam va issiq toshkoʻmir davrida ulkan qirqquloqlar hukmron boʻldi, urugʻli qirqquloqlar va ochiq urugʻlilar paydo boʻldi — urugʻ paydo boʻlishi yirik aromorfoz. Quruq va sovuq perm davrida ulkan qirqquloqlar qirilib ketdi.",
      easy: "Devon — yoʻsin, qirqquloq; toshkoʻmir — ulkan qirqquloqlar, urugʻ; perm — qirilish.",
      draw: [
        { t: 'title', text: 'Paleozoy oʻsimliklari' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 28, h: 9, text: 'silur: psilofitlar', color: 'green' },
        { t: 'box', id: 'b', x: 36, y: 20, w: 28, h: 9, text: 'devon: yoʻsinlar', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 20, w: 28, h: 9, text: 'toshkoʻmir: urugʻ', color: 'orange' },
        { t: 'box', id: 'd', x: 68, y: 42, w: 28, h: 9, text: 'perm: qirilish', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' }
      ],
      next: 'Mezozoy'
    },
    {
      kind: 'example',
      clear: true,
      say: "Triasda ochiq urugʻlilar hukmron boʻldi: qaragʻay, kedr, pixta, velvichiya, sagovnik, gingko biloba hozir ham saqlangan. Yura davrida ilk yopiq urugʻlilar paydo boʻldi, boʻr davri oʻrtasidan ular hukmronlik qila boshladi. Idioadaptatsiya natijasida bir, ikki va koʻp yillik oʻtlar, butalar va daraxtlar vujudga keldi; ular orasida umumiy degeneratsiyaga uchragan parazit oʻsimliklar ham bor.",
      easy: "Trias — ochiq urugʻlilar; yura — ilk yopiq urugʻlilar; boʻr — ularning hukmronligi.",
      draw: [
        { t: 'title', text: 'Mezozoy va undan keyin' },
        { t: 'table', x: 4, y: 18, rows: [['davr', 'oʻzgarish'], ['trias', 'ochiq urugʻlilar hukmron'], ['yura', 'ilk yopiq urugʻlilar'], ['boʻr', 'yopiq urugʻlilar hukmron']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Vegetativ organlar — ildiz, poya, barg; proterozoyda suvoʻtlar paydo boʻldi, bir hujayralidan koʻp hujayraliga oʻtish — aromorfoz.',
    'Quruqlikka chiqish qoplovchi, oʻtkazuvchi, mexanik toʻqimalar, ildiz va bargli novdani shakllantirdi; silurda psilofitlar paydo boʻldi.',
    'Devon — yoʻsin, plaun, qirqboʻgʻim, qirqquloq; toshkoʻmir — ulkan qirqquloqlar va urugʻ; trias — ochiq urugʻlilar; yura — ilk yopiq urugʻlilar, boʻrdan ular hukmron.'
  ],
  questions: [
    {
      id: 'b36q1',
      prompt: 'Oʻsimlik guruhlarini paydo boʻlish tartibida joylashtiring.',
      hint: 'Suvoʻtlar — eng qadimgi.',
      explanation: 'Suvoʻtlar → psilofitlar → qirqquloqlar → ochiq urugʻlilar → yopiq urugʻlilar.',
      widget: { type: 'order_line', props: { items: [{ label: 'suvoʻtlar' }, { label: 'psilofitlar' }, { label: 'qirqquloqlar' }, { label: 'ochiq urugʻlilar' }, { label: 'yopiq urugʻlilar' }] } }
    },
    {
      id: 'b36q2',
      prompt: 'Quruqlik muammosini uni hal qilgan toʻqima yoki organ bilan juftlang.',
      hint: 'Mexanik — tayanch.',
      explanation: 'Qurib qolish — qoplovchi toʻqima; moddalar tashish — oʻtkazuvchi toʻqima; shamolga chidash — mexanik toʻqima; tuproqdan suv shimish — ildiz.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'qurib qolish', right: 'qoplovchi toʻqima' },
            { left: 'moddalarni tashish', right: 'oʻtkazuvchi toʻqima' },
            { left: 'shamolga chidash', right: 'mexanik toʻqima' },
            { left: 'tuproqdan suv shimish', right: 'ildiz' }
          ]
        }
      }
    },
    {
      id: 'b36q3',
      prompt: 'Davrni undagi oʻsimliklar bilan juftlang.',
      hint: 'Toshkoʻmir — ulkan qirqquloqlar.',
      explanation: 'Silur — psilofitlar; toshkoʻmir — ulkan qirqquloqlar; trias — ochiq urugʻlilar hukmron; yura — ilk yopiq urugʻlilar.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'silur' }, b: { label: 'psilofitlar' } },
            { a: { label: 'toshkoʻmir' }, b: { label: 'ulkan qirqquloqlar' } },
            { a: { label: 'trias' }, b: { label: 'ochiq urugʻlilar hukmron' } },
            { a: { label: 'yura' }, b: { label: 'ilk yopiq urugʻlilar' } }
          ]
        }
      }
    },
    {
      id: 'b36q4',
      prompt: 'Qadimgi qirqboʻgʻimlar — kalamitlarning boʻyi necha metrgacha yetgan?',
      hint: 'Darslikdagi raqam.',
      explanation: '25 m gacha.',
      widget: { type: 'number_answer', props: { answer: 25, unit: 'm' } }
    },
    {
      id: 'b36q5',
      prompt: 'Nima uchun qirqquloqlar qoldigʻi chirimay toshkoʻmirga aylangan?',
      hint: 'Chirituvchilar.',
      explanation: 'Qoldiqlar kislorodsiz (anaerob) muhitga tushgan, chirituvchi bakteriyalar boʻlmagan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['muhit juda issiq boʻlgan', 'kislorodsiz muhitda chirituvchilar boʻlmagan', 'ular muzlab qolgan', 'ularni hayvonlar yemagan'], answerIndex: 1 } }
    },
    {
      id: 'b36q6',
      prompt: 'Hozirgacha saqlangan ochiq urugʻlilarni tanlang.',
      hint: 'Kordait va bennetit qirilib ketgan.',
      explanation: 'Qaragʻay, kedr, gingko biloba, velvichiya saqlangan; kordait qirilib ketgan.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'qaragʻay', correct: true },
            { label: 'kedr', correct: true },
            { label: 'gingko biloba', correct: true },
            { label: 'velvichiya', correct: true },
            { label: 'kordait' }
          ]
        }
      }
    },
    {
      id: 'b36q7',
      prompt: 'Yoʻsinlarning sodda tuzilishga ega ekanini nima koʻrsatadi?',
      hint: 'Poyasida nima yoʻq?',
      explanation: 'Barglari bir qavat hujayradan iborat, poyasida oʻtkazuvchi toʻqima yoʻq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ularda gul bor', 'poyasida oʻtkazuvchi toʻqima yoʻq', 'ular 25 m boʻladi', 'ular urugʻdan koʻpayadi'], answerIndex: 1 } }
    },
    {
      id: 'b36q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Perm — quruq va sovuq.',
      explanation: 'Perm davrining quruq va sovuq iqlimi ulkan qirqquloqlarni qirib yubordi; parazit oʻsimliklar — umumiy degeneratsiya misoli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Perm davrining quruq va sovuq iqlimi ulkan qirqquloqlarni qirib yuborgan.', value: true },
            { text: 'Parazit oʻsimliklar — umumiy degeneratsiya misoli.', value: true },
            { text: 'Proterozoyda oʻsimliklar quruqlikda keng tarqalgan.', value: false },
            { text: 'Yopiq urugʻlilar paleozoyning kembriy davrida hukmron boʻlgan.', value: false }
          ]
        }
      }
    }
  ]
};
