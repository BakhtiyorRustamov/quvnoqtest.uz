import type { BoardLesson } from './types';
import { BOB6 } from './fizika-36';
import { wave } from './phys';

const photoI = (Is: number) => (U: number) => (U <= -1.5 ? 0 : Is * (1 - Math.exp(-(U + 1.5) / 0.8)));

/** Darslik: Fizika 11, 35-mavzu (137–141-betlar) — fotoelektrik effekt, Eynshteyn tenglamasi, fotonlar. */
export const FIZ_37: BoardLesson = {
  n: 37,
  label: '35',
  group: BOB6,
  title: 'Fotoeffekt. Fotonlar',
  section: '35-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Supermarketning avtomatik eshigi yaqinlashganingizda oʻzi ochiladi, koʻcha chiroqlari qorongʻi tushishi bilan oʻzi yonadi. Bu qurilmalarda yorugʻlik elektr tokini boshqaradi. Asosida yorugʻlik moddadan elektronlarni urib chiqarishi — fotoeffekt yotadi. Uni 1887-yilda Hertz kashf qilgan, Stoletov batafsil oʻrgangan.",
      easy: "Yorugʻlik moddadan elektron urib chiqaradi — fotoeffekt.",
      draw: [
        { t: 'title', text: 'Yorugʻlik tokni boshqaradi' },
        { t: 'icon', x: 16, y: 34, emoji: '🚪', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🌃', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['avtomatik eshik', 'oʻzi yonadigan chiroq', 'Hertz 1887, Stoletov'] }
      ],
      next: 'Tajriba'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Vakuumli ballonda katod va anod bor. Katod kvars oyna orqali yoritiladi, undan uchgan elektronlar anodga yetib, tok hosil qiladi. Grafikda: kuchlanish oshsa, tok oshib, toʻyinadi — barcha elektronlar anodga yetadi. Yorugʻlik oqimi koʻproq boʻlsa, toʻyinish toki katta. Teskari kuchlanish berilsa, ma'lum U yopuvchi da tok nolga tushadi: e karra U yopuvchi teng elektronning eng katta kinetik energiyasi.",
      easy: "Toʻyinish toki ~ yorugʻlik oqimi; eU yop = Ek max.",
      draw: [
        { t: 'title', text: 'Fototok va kuchlanish' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 58, h: 44, xmin: -2, xmax: 6, ymin: 0, ymax: 2.3, xlabel: 'U', ylabel: 'I' },
        { t: 'curve', axes: 'g', points: wave(photoI(1), -2, 6, 64), color: 'blue' },
        { t: 'curve', axes: 'g', points: wave(photoI(2), -2, 6, 64), color: 'red' },
        { t: 'list', x: 70, y: 24, items: ['qizil — koʻp nur', 'koʻk — kam nur', 'U yop — bir xil'] },
        { t: 'formula', x: 70, y: 52, text: 'eU yop = Eₖ max' }
      ],
      next: 'Fotoeffekt qonunlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tajribalardan uch qonun chiqdi. Birinchi: elektronlarning eng katta kinetik energiyasi yorugʻlik intensivligiga bogʻliq emas, chastota bilan chiziqli oshadi. Ikkinchi: har bir modda uchun fotoeffekt boshlanadigan eng kichik chastota bor — qizil chegara. Uchinchi: sekunddagi elektronlar soni yorugʻlik oqimiga proporsional. Fotoeffekt inersiyasiz — yorugʻlik tushishi bilan tok paydo boʻladi.",
      easy: "Eₖ ~ ν (intensivlikka bogʻliq emas); qizil chegara; elektronlar soni ~ oqim.",
      draw: [
        { t: 'title', text: 'Fotoeffekt qonunlari' },
        { t: 'list', x: 6, y: 22, items: ['1) Eₖ max — chastotaga bogʻliq', '2) qizil chegara νmin bor', '3) elektronlar soni ~ yorugʻlik oqimi', 'inersiyasiz hodisa'] }
      ],
      next: 'Eynshteyn tenglamasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1905-yilda Eynshteyn tushuntirdi: yorugʻlik porsiyalar — fotonlardan iborat. Foton bor energiyasini bitta elektronga beradi: bir qismi chiqish ishiga, qolgani kinetik energiyaga sarflanadi. h nu teng A qoʻshuv m v kvadrat boʻlinsin 2. Qizil chegarada h nu min teng A. Grafikda U yopuvchi chastota bilan toʻgʻri chiziq boʻylab oshadi, qiyaligi h boʻlinsin e.",
      easy: "hν = A + mv²/2; qizil chegara: hν min = A.",
      draw: [
        { t: 'title', text: 'Eynshteyn tenglamasi (1905)' },
        { t: 'formula', x: 4, y: 22, text: 'h ν = A + m v² / 2' },
        { t: 'formula', x: 4, y: 38, text: 'h ν min = A = h c / λ₀' },
        { t: 'axes', id: 'u', x: 52, y: 20, w: 42, h: 40, xmin: 0, xmax: 12, ymin: 0, ymax: 3.2, xlabel: 'ν, 10¹⁴ Hz', ylabel: 'U yop, V' },
        { t: 'curve', axes: 'u', points: [[5, 0], [12, 2.9]], color: 'red' },
        { t: 'dot', axes: 'u', x: 5, y: 0, label: 'νmin' }
      ],
      next: 'Fotonlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Foton energiyasi E teng h nu, u vakuumda c tezlikda harakatlanadi, tinchlikdagi massasi nol. Harakatdagi massasi m teng h nu boʻlinsin c kvadrat. Ichki fotoeffektda esa yarimoʻtkazgichdagi elektronlar erkinlashib, oʻtkazuvchanlik oshadi — fotorezistorlar shunga asoslangan. Yorugʻlik tarqalishda toʻlqin, modda bilan taʼsirlashganda zarra xossasini koʻrsatadi — korpuskulyar-toʻlqin dualizm.",
      easy: "Foton: E = hν, m₀ = 0. Yorugʻlik — ham toʻlqin, ham zarra.",
      draw: [
        { t: 'title', text: 'Foton va dualizm' },
        { t: 'formula', x: 6, y: 22, text: 'E = h ν,   m = h ν / c²' },
        { t: 'list', x: 6, y: 36, items: ['m₀ = 0, tezligi c', 'ichki fotoeffekt — fotorezistor', 'toʻlqin: interferensiya, difraksiya', 'zarra: fotoeffekt, bosim'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Metalldan chiqish ishi 7,6 karra 10 ning minus 19 darajasi joul, elektron kinetik energiyasi 4,5 karra 10 ning minus 20 darajasi joul. Yorugʻlik toʻlqin uzunligi: lambda teng h c boʻlinsin A qoʻshuv E kinetik — 6,6 karra 10 ning minus 34 darajasi karra 3 karra 10 ning 8 darajasi boʻlinsin 8,05 karra 10 ning minus 19 darajasi, taxminan 2,46 karra 10 ning minus 7 darajasi metr.",
      easy: "λ = hc/(A + Eₖ) ≈ 2,46·10⁻⁷ m.",
      draw: [
        { t: 'title', text: 'Toʻlqin uzunligini topamiz' },
        { t: 'list', x: 6, y: 20, items: ['A = 7,6 · 10⁻¹⁹ J', 'Eₖ = 0,45 · 10⁻¹⁹ J'] },
        { t: 'formula', x: 6, y: 46, text: 'λ = h c / (A + Eₖ) ≈ 2,46 · 10⁻⁷ m' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Fotoeffekt — yorugʻlik taʼsirida moddadan elektronlarning chiqishi; eU yop = Eₖ max.',
    'Qonunlar: Eₖ max chastotaga chiziqli bogʻliq, intensivlikka emas; qizil chegara mavjud; elektronlar soni ~ yorugʻlik oqimi.',
    'Eynshteyn tenglamasi hν = A + mv²/2; foton E = hν, m₀ = 0; yorugʻlik — korpuskulyar-toʻlqin dualizm.'
  ],
  questions: [
    {
      id: 'f37q1',
      prompt: 'Chiqish ishi 3,3·10⁻¹⁹ J. Fotoeffektning qizil chegarasi necha ·10¹⁴ Hz? (h = 6,6·10⁻³⁴ J·s)',
      hint: 'ν₀ = A / h.',
      explanation: '3,3·10⁻¹⁹ / 6,6·10⁻³⁴ = 5·10¹⁴ Hz.',
      widget: { type: 'number_answer', props: { answer: 5, tolerance: 0.05, unit: '·10¹⁴ Hz' } }
    },
    {
      id: 'f37q2',
      prompt: 'Chiqish ishi 3 eV, foton energiyasi 5 eV. Fotoelektronning eng katta kinetik energiyasi necha eV?',
      hint: 'Eₖ = hν − A.',
      explanation: '5 − 3 = 2 eV.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'eV' } }
    },
    {
      id: 'f37q3',
      prompt: 'Seziy katodga 600 nm nur tushmoqda, chiqish ishi 1,8 eV (h = 4,1·10⁻¹⁵ eV·s). Yopuvchi kuchlanish necha V? (0,01 gacha)',
      hint: 'hν = hc/λ, U = (hν − A)/e.',
      explanation: 'hν = 4,1·10⁻¹⁵ · 3·10⁸ / 6·10⁻⁷ = 2,05 eV; 2,05 − 1,8 = 0,25 V.',
      widget: { type: 'number_answer', props: { answer: 0.25, tolerance: 0.01, unit: 'V' } }
    },
    {
      id: 'f37q4',
      prompt: 'Nikel uchun chiqish ishi 5 eV. Qizil chegara toʻlqin uzunligi necha nm? (hc ≈ 1240 eV·nm)',
      hint: 'λ₀ = hc / A.',
      explanation: '1240 / 5 = 248 nm ≈ 2,5·10⁻⁷ m.',
      widget: { type: 'number_answer', props: { answer: 248, tolerance: 2, unit: 'nm' } }
    },
    {
      id: 'f37q5',
      prompt: 'Yorugʻlik intensivligi 4 marta kamaysa, chiqayotgan fotoelektronlar soni qanday oʻzgaradi?',
      hint: 'Uchinchi qonun.',
      explanation: '4 marta kamayadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['4 marta ortadi', '2 marta kamayadi', '4 marta kamayadi', 'oʻzgarmaydi'], answerIndex: 2 } }
    },
    {
      id: 'f37q6',
      prompt: 'Yorugʻlik oqimi (λ oʻzgarmas) 4 marta oshsa, fotoelektronlarning tezligi qanday oʻzgaradi?',
      hint: 'Eₖ intensivlikka bogʻliq emas.',
      explanation: 'Oʻzgarmaydi — faqat elektronlar soni oshadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻzgarmaydi', '4 marta ortadi', '2 marta ortadi', '4 marta kamayadi'], answerIndex: 0 } }
    },
    {
      id: 'f37q7',
      prompt: 'Eynshteyn tenglamasining qismlarini moslang.',
      hint: 'hν = A + Eₖ.',
      explanation: 'hν — foton energiyasi; A — chiqish ishi; mv²/2 — elektron kinetik energiyasi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'h ν', right: 'foton energiyasi' },
            { left: 'A', right: 'chiqish ishi' },
            { left: 'm v² / 2', right: 'elektron kinetik energiyasi' }
          ]
        }
      }
    },
    {
      id: 'f37q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Qizil chegaradan past chastotada fotoeffekt yoʻq.',
      explanation: 'ν < νmin da fotoeffekt boʻlmaydi; foton tinchlikdagi massasi nol; fotoeffekt inersiyasiz.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Chastota qizil chegaradan kichik boʻlsa, juda kuchli yorugʻlik ham fotoeffekt bermaydi.', value: true },
            { text: 'Fotonning tinchlikdagi massasi nolga teng.', value: true },
            { text: 'Yorugʻlik tushgandan bir necha sekund keyin fototok paydo boʻladi.', value: false },
            { text: 'Elektronning kinetik energiyasi yorugʻlik intensivligiga toʻgʻri proporsional.', value: false }
          ]
        }
      }
    }
  ]
};
