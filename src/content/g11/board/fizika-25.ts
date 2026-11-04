import type { BoardLesson } from './types';
import { BOB4 } from './fizika-23';
import { rect, vec } from './phys';

const block = (id: string, x: number, y: number, w: number, label: string, color: 'green' | 'purple' | 'orange' | 'blue' | 'red') => [
  ...rect(id, x, y, w, 9, color),
  { t: 'text' as const, x: x + w / 2, y: y + 6, text: label, anchor: 'middle' as const, size: 's' as const }
];

/** Darslik: Fizika 11, 23-mavzu (83–87-betlar) — radioaloqaning fizik asoslari, eng sodda radio, radiolokatsiya. */
export const FIZ_25: BoardLesson = {
  n: 25,
  label: '23',
  group: BOB4,
  title: 'Radioaloqa va radiolokatsiya',
  section: '23-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Qadimda xabarlarni karvonlar, kaptarlar va choparlar eltgan — haftalab, baʼzan yoʻlda yoʻqolib ham ketgan. 1895-yil 7-mayda Aleksandr Popov elektromagnit toʻlqinlar yordamida xabar yuborib, uni qabul qilishni namoyish qildi. Shu kundan radioaloqa davri boshlandi. Radio qanday ishlaydi?",
      easy: "1895-yil 7-may: Popov radioaloqani namoyish qildi.",
      draw: [
        { t: 'title', text: 'Kaptardan radiogacha' },
        { t: 'icon', x: 16, y: 34, emoji: '🕊️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '📻', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['karvon, kaptar — sekin', 'radio — yorugʻlik tezligida', 'Popov, 1895-yil 7-may'] }
      ],
      next: 'Kogerer va Popov'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻlqinni sezish uchun Branli kogererni ixtiro qildi: ichida temir kukuni boʻlgan shisha naycha. Toʻlqin kelganda kukunlar yopishib, qarshilik 100 marta kamayadi va zanjirdan tok oʻtadi. Popov qoʻngʻiroq bolgʻachasi bilan kogererni silkitib turishni oʻylab topdi. 1899-yilda radioaloqa 20 kilometrga, 1901-yilda 150 kilometrga yetdi. Italiyada Markoni ham shunday qurilma yaratdi.",
      easy: "Kogerer toʻlqinni sezadi; Popov va Markoni radioni ixtiro qildi.",
      draw: [
        { t: 'title', text: 'Birinchi radio' },
        { t: 'list', x: 6, y: 22, items: ['kogerer — temir kukunli naycha', 'toʻlqin kelsa: R 100 marta ↓', '1899: 20 km, 1901: 150 km', 'Popov va Markoni'] }
      ],
      next: 'Modulyatsiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Past chastotali toʻlqin kam energiya tashiydi va uzoqqa bormaydi, yaqin stansiyalar esa aralashib ketadi. Shuning uchun yuqori chastotali tashuvchi tebranish ishlatiladi. Mikrofon tovushni elektr tebranishga aylantiradi, modulyator uni generatorning yuqori chastotali tebranishiga qoʻshadi — bu modulyatsiya. Modulyatsiyalangan tebranish antenna orqali tarqatiladi.",
      easy: "Tovush yuqori chastotali tebranishga qoʻshiladi — modulyatsiya.",
      draw: [
        { t: 'title', text: 'Radiouzatkich' },
        ...block('m', 4, 24, 20, 'mikrofon', 'blue'),
        ...block('g', 4, 46, 20, 'generator', 'green'),
        ...block('d', 36, 35, 24, 'modulyator', 'purple'),
        ...block('a', 72, 35, 22, 'antenna', 'red'),
        ...vec('m1', 24, 28.5, 36, 37, 'ink'),
        ...vec('g1', 24, 50.5, 36, 42, 'ink'),
        ...vec('d1', 60, 39.5, 72, 39.5, 'ink')
      ],
      next: 'Eng sodda radio'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eng sodda radiopriyomnik: antenna toʻlqinni ushlaydi, gʻaltak va oʻzgaruvchan sigʻimli kondensatordan iborat kirish konturi kerakli stansiyaga rezonans orqali sozlanadi. Diod detektor yuqori chastotali tebranishdan tovush signalini ajratadi — bu demodulyatsiya. Yuqori chastota kondensator orqali ketadi, tovush esa telefon karnayiga.",
      easy: "Antenna → LC kontur (tanlash) → diod (ajratish) → telefon.",
      draw: [
        { t: 'title', text: 'Detektorli priyomnik' },
        ...block('A', 2, 32, 18, 'antenna', 'red'),
        ...block('K', 26, 32, 20, 'LC kontur', 'orange'),
        ...block('D', 52, 32, 16, 'diod', 'purple'),
        ...block('T', 74, 32, 20, 'telefon', 'blue'),
        ...vec('x1', 20, 36.5, 26, 36.5, 'ink'),
        ...vec('x2', 46, 36.5, 52, 36.5, 'ink'),
        ...vec('x3', 68, 36.5, 74, 36.5, 'ink'),
        { t: 'list', x: 6, y: 52, items: ['kontur — stansiyani tanlaydi (rezonans)', 'diod — tovushni ajratadi (detektor)'] }
      ],
      next: 'Radiolokatsiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Radiolokatsiyada toʻlqinning qaytishidan foydalaniladi. Radar qisqa impuls yuboradi, u samolyotga urilib qaytadi. Borib-kelish vaqti delta t ni oʻlchab, masofani topamiz: l teng c karra delta t boʻlinsin 2 — chunki toʻlqin ikki marta yoʻl bosadi. Radar bilan Oy, Venera, Mars va Yupitergacha masofalar ham aniq oʻlchangan.",
      easy: "l = c·Δt / 2.",
      draw: [
        { t: 'title', text: 'Radiolokator' },
        { t: 'icon', x: 14, y: 44, emoji: '📡', size: 'l' },
        { t: 'icon', x: 82, y: 28, emoji: '✈️', size: 'm' },
        ...vec('go', 22, 40, 76, 30, 'red'),
        ...vec('back', 76, 36, 22, 46, 'blue'),
        { t: 'formula', x: 30, y: 60, text: 'l = c · Δt / 2' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Radiolokator 15 santimetrli toʻlqinda ishlaydi, sekundiga 4000 impuls chiqaradi, har bir impuls 2 mikrosekund davom etadi. Bir impulsdagi tebranishlar soni: t karra c boʻlinsin lambda — 2 karra 10 ning minus 6 darajasi karra 3 karra 10 ning 8 darajasi boʻlinsin 0,15, yaʼni 4000 ta. Eng uzoq koʻrish masofasi: keyingi impulsgacha toʻlqin borib kelishi kerak — c boʻlinsin 2n, taxminan 37,5 kilometr.",
      easy: "N = tc/λ = 4000; L max ≈ c/(2n) = 37,5 km.",
      draw: [
        { t: 'title', text: 'Radar impulsi' },
        { t: 'list', x: 6, y: 20, items: ['λ = 15 cm, n = 4000 /s', 'impuls t = 2 μs', 'N = t c / λ = 4000'] },
        { t: 'formula', x: 6, y: 54, text: 'L max ≈ c / (2n) = 37,5 km' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Radioaloqa — elektromagnit toʻlqinlar orqali xabar almashish; Popov 1895-yil 7-mayda namoyish qilgan.',
    'Uzatkichda tovush yuqori chastotali tebranishga qoʻshiladi (modulyatsiya); priyomnikda LC kontur stansiyani tanlaydi, diod tovushni ajratadi (detektorlash).',
    'Radiolokatsiya toʻlqin qaytishiga asoslangan: l = c·Δt/2.'
  ],
  questions: [
    {
      id: 'f25q1',
      prompt: 'Radar signali obyektga borib, 400 μs dan keyin qaytdi. Obyekt necha km uzoqlikda?',
      hint: 'l = c·Δt/2.',
      explanation: '3·10⁸ · 4·10⁻⁴ / 2 = 6·10⁴ m = 60 km.',
      widget: { type: 'number_answer', props: { answer: 60, unit: 'km' } }
    },
    {
      id: 'f25q2',
      prompt: 'Uzunligi 300 m toʻlqinda tovushning (10 kHz) bir davri davomida necha marta tebranish boʻladi?',
      hint: 'ν = c/λ, keyin ν / ν_tovush.',
      explanation: 'ν = 10⁶ Hz; 10⁶ / 10⁴ = 100.',
      widget: { type: 'number_answer', props: { answer: 100 } }
    },
    {
      id: 'f25q3',
      prompt: 'Radiolokator sekundiga 2000 impuls yuboradi. Eng uzoq «koʻrish» masofasi necha km?',
      hint: 'L = c / (2n).',
      explanation: '3·10⁸ / 4000 = 75 000 m = 75 km.',
      widget: { type: 'number_answer', props: { answer: 75, unit: 'km' } }
    },
    {
      id: 'f25q4',
      prompt: 'Priyomnikda signal yoʻlini tartiblang.',
      hint: 'Avval toʻlqinni ushlash kerak.',
      explanation: 'Antenna → kirish konturi → detektor (diod) → telefon.',
      widget: {
        type: 'step_order',
        props: { steps: ['Antenna toʻlqinni ushlaydi', 'LC kontur kerakli stansiyani tanlaydi', 'Diod tovush signalini ajratadi', 'Telefon tovush chiqaradi'] }
      }
    },
    {
      id: 'f25q5',
      prompt: 'Eng sodda priyomnikda kondensator sigʻimi 4 marta kamaytirildi. Qabul qilinadigan toʻlqin uzunligi qanday oʻzgaradi?',
      hint: 'λ = 2πc√(LC).',
      explanation: '√4 = 2 marta kamayadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['4 marta kamayadi', '2 marta kamayadi', '2 marta oshadi', 'oʻzgarmaydi'], answerIndex: 1 } }
    },
    {
      id: 'f25q6',
      prompt: 'Nega radioaloqada yuqori chastotali tebranishlar ishlatiladi?',
      hint: 'W ~ ν⁴.',
      explanation: 'Yuqori chastotali toʻlqin koʻproq energiya tashiydi va stansiyalar aralashib ketmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Ular arzonroq', 'Koʻp energiya tashiydi, stansiyalar aralashmaydi', 'Ular sekinroq tarqaladi', 'Antennasiz ishlaydi'], answerIndex: 1 } }
    },
    {
      id: 'f25q7',
      prompt: 'Blokni vazifasi bilan juftlang.',
      hint: 'Modulyator qoʻshadi, detektor ajratadi.',
      explanation: 'Mikrofon — tovushni elektr signalga; modulyator — qoʻshish; kirish konturi — tanlash; detektor — ajratish.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'mikrofon' }, b: { label: 'tovush → elektr signal' } },
            { a: { label: 'modulyator' }, b: { label: 'tovushni tashuvchiga qoʻshadi' } },
            { a: { label: 'kirish konturi' }, b: { label: 'stansiyani tanlaydi' } },
            { a: { label: 'detektor' }, b: { label: 'tovushni ajratadi' } }
          ]
        }
      }
    },
    {
      id: 'f25q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Radar qaytishga asoslangan.',
      explanation: 'Radar toʻlqin qaytishidan foydalanadi; kogerer qarshiligi toʻlqin kelganda kamayadi; demodulyatsiya priyomnikda boʻladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Radiolokatsiya elektromagnit toʻlqinlarning qaytishiga asoslangan.', value: true },
            { text: 'Toʻlqin kelganda kogerer qarshiligi oshib ketadi.', value: false },
            { text: 'Demodulyatsiya radiouzatkichda amalga oshiriladi.', value: false },
            { text: 'Radar bilan sayyoralargacha masofa oʻlchangan.', value: true }
          ]
        }
      }
    }
  ]
};
