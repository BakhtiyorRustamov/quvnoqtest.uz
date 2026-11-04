import type { BoardLesson } from './types';
import { BOB4 } from './fizika-23';
import { rect, vec } from './phys';

const block = (id: string, x: number, y: number, w: number, label: string, color: 'green' | 'purple' | 'orange' | 'blue' | 'red') => [
  ...rect(id, x, y, w, 9, color),
  { t: 'text' as const, x: x + w / 2, y: y + 6, text: label, anchor: 'middle' as const, size: 's' as const }
];

/** Darslik: Fizika 11, 24-mavzu (87–90-betlar) — telekoʻrsatuvlarning fizik asoslari; Toshkent — televideniye vatani. */
export const FIZ_26: BoardLesson = {
  n: 26,
  label: '24',
  group: BOB4,
  title: 'Televideniye asoslari. Toshkent — televideniye vatani',
  section: '24-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1928-yil 26-iyulda Toshkentda dunyoda birinchilardan boʻlib ekranda harakatlanayotgan odam tasviri koʻrsatildi. 4-avgustda esa Navoiy koʻchasidan oʻtayotgan tramvay tasviri uzatildi. Bu Boris Grabovskiy va hamkasblari yaratgan «telefot» apparati edi. Shuning uchun Toshkent televideniye vatani deb ataladi!",
      easy: "1928-yil, Toshkent: «telefot» birinchi harakatli tasvirni uzatdi.",
      draw: [
        { t: 'title', text: 'Toshkent — televideniye vatani' },
        { t: 'icon', x: 16, y: 34, emoji: '📺', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🚋', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['B. Grabovskiy, «telefot»', '1928-yil 26-iyul — odam tasviri', '4-avgust — tramvay tasviri'] }
      ],
      next: 'Teleuzatkich'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Radioda tovush mikrofon orqali elektr signalga aylansa, televideniyeda tasvirni videokamera elektr signalga aylantiradi. Signal kuchaytiriladi va modulyatorda generatorning yuqori chastotali tebranishiga qoʻshiladi. Ovoz uchun alohida radiouzatkich qismi bor. Ikkalasi birga antenna orqali tarqatiladi.",
      easy: "Videokamera → kuchaytirgich → modulyator (+generator) → antenna.",
      draw: [
        { t: 'title', text: 'Teleuzatkich' },
        ...block('v', 2, 26, 22, 'videokamera', 'blue'),
        ...block('k', 30, 26, 24, 'kuchaytirgich', 'green'),
        ...block('m', 60, 26, 22, 'modulyator', 'purple'),
        ...block('g', 60, 46, 22, 'generator', 'orange'),
        ...vec('a1', 24, 30.5, 30, 30.5, 'ink'),
        ...vec('a2', 54, 30.5, 60, 30.5, 'ink'),
        ...vec('a3', 71, 46, 71, 35, 'ink'),
        ...vec('a4', 82, 30.5, 92, 30.5, 'red'),
        { t: 'text', x: 84, y: 26, text: 'antenna', size: 's', color: 'red' }
      ],
      next: 'Telepriyomnik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Televizor antennasi signalni elektr tebranishga aylantiradi. Kirish konturi kerakli kanalni tanlaydi, kuchsiz signal kuchaytiriladi va detektorga beriladi. Detektor tasvir va ovoz signallarini ajratadi: tasvir ekranga, ovoz karnayga ketadi. Zamonaviy televizorlar rangli va masofadan boshqariladigan qilib yasaladi.",
      easy: "Antenna → kontur → kuchaytirgich → detektor → ekran va karnay.",
      draw: [
        { t: 'title', text: 'Telepriyomnik' },
        ...block('A', 2, 30, 18, 'antenna', 'red'),
        ...block('K', 24, 30, 18, 'kontur', 'orange'),
        ...block('U', 46, 30, 24, 'kuchaytirgich', 'green'),
        ...block('D', 74, 30, 20, 'detektor', 'purple'),
        ...vec('b1', 20, 34.5, 24, 34.5, 'ink'),
        ...vec('b2', 42, 34.5, 46, 34.5, 'ink'),
        ...vec('b3', 70, 34.5, 74, 34.5, 'ink'),
        ...vec('b4', 80, 39, 70, 52, 'blue'),
        ...vec('b5', 88, 39, 90, 52, 'blue'),
        { t: 'text', x: 60, y: 58, text: 'ekran', size: 's' },
        { t: 'text', x: 84, y: 58, text: 'karnay', size: 's' }
      ],
      next: 'Nega minoralar baland?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Telekoʻrsatuvlar 50 dan 230 megagersgacha chastotada uzatiladi. Bunday toʻlqinlar Yer sirti boʻylab egilmaydi, faqat antenna koʻrinib turgan masofagacha tarqaladi. Shuning uchun teleminoralar baland quriladi: Toshkent teleminorasi 375 metr! Juda uzoqqa koʻrsatuvlar sunʼiy yoʻldoshlar orqali uzatiladi.",
      easy: "50–230 MHz toʻlqinlar koʻrinish chegarasigacha boradi — minoralar baland.",
      draw: [
        { t: 'title', text: 'Teleminora' },
        { t: 'icon', x: 16, y: 36, emoji: '🗼', size: 'l' },
        { t: 'icon', x: 16, y: 60, emoji: '🛰️', size: 'm' },
        { t: 'list', x: 32, y: 26, items: ['ν = 50–230 MHz', 'faqat koʻrinish chegarasigacha', 'Toshkent minorasi — 375 m', 'uzoqqa — yoʻldosh orqali'] }
      ],
      next: 'Tarix'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tarix: 1911-yilda Rozing elektron nurli trubkada qoʻzgʻalmas tasvir oldi. 1925-yilda Grabovskiy, Popov va Piskunov «radiotelefot» uchun guvohnoma olishdi. 1928-yilda Toshkentda harakatli tasvir uzatildi. 1956-yilda Toshkentda televizion markaz ochildi, 1978–1985-yillarda 375 metrli teleminora qurildi.",
      easy: "1911 Rozing → 1925 patent → 1928 Toshkent → 1956 telemarkaz → 1985 minora.",
      draw: [
        { t: 'title', text: 'Televideniye tarixi' },
        {
          t: 'table',
          x: 6,
          y: 22,
          rows: [
            ['yil', 'voqea'],
            ['1911', 'Rozing: qoʻzgʻalmas tasvir'],
            ['1925', '«radiotelefot» guvohnomasi'],
            ['1928', 'Toshkent: harakatli tasvir'],
            ['1956', 'Toshkent telemarkazi'],
            ['1985', '375 m teleminora']
          ]
        }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Telekoʻrsatuv toʻlqin uzunliklari oraligʻini topaylik. 50 megagers uchun lambda teng 3 karra 10 ning 8 darajasi boʻlinsin 5 karra 10 ning 7 darajasi — 6 metr. 230 megagers uchun — taxminan 1,3 metr. Demak, teletoʻlqinlar metrli toʻlqinlar.",
      easy: "λ = c/ν: 50 MHz → 6 m, 230 MHz → 1,3 m.",
      draw: [
        { t: 'title', text: 'Teletoʻlqinlar uzunligi' },
        { t: 'formula', x: 6, y: 24, text: 'λ = c / ν' },
        { t: 'list', x: 6, y: 38, items: ['50 MHz → λ = 6 m', '230 MHz → λ ≈ 1,3 m', 'metrli toʻlqinlar'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Tasvirni videokamera elektr signalga aylantiradi; u yuqori chastotali tebranishga qoʻshilib (modulyatsiya) antennadan tarqatiladi.',
    'Televizorda kontur kanalni tanlaydi, detektor tasvir va ovozni ajratadi; teletoʻlqinlar (50–230 MHz) koʻrinish chegarasigacha tarqaladi.',
    '1928-yilda Toshkentda «telefot» yordamida birinchi harakatli tasvir uzatilgan — Toshkent televideniye vatani.'
  ],
  questions: [
    {
      id: 'f26q1',
      prompt: '100 MHz chastotali telekanal toʻlqin uzunligi necha m?',
      hint: 'λ = c / ν.',
      explanation: '3·10⁸ / 10⁸ = 3 m.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'm' } }
    },
    {
      id: 'f26q2',
      prompt: 'Toʻlqin uzunligi 1,5 m boʻlgan telesignal chastotasi necha MHz?',
      hint: 'ν = c / λ.',
      explanation: '3·10⁸ / 1,5 = 2·10⁸ Hz = 200 MHz.',
      widget: { type: 'number_answer', props: { answer: 200, unit: 'MHz' } }
    },
    {
      id: 'f26q3',
      prompt: 'Televideniye tarixidagi voqealarni vaqt boʻyicha tartiblang.',
      hint: 'Rozingdan boshlang.',
      explanation: '1911 Rozing → 1925 guvohnoma → 1928 Toshkent → 1956 telemarkaz.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'Rozing: qoʻzgʻalmas tasvir' }, { label: '«radiotelefot» guvohnomasi' }, { label: 'Toshkentda harakatli tasvir' }, { label: 'Toshkent telemarkazi ochildi' }] }
      }
    },
    {
      id: 'f26q4',
      prompt: 'Teleminoralar nega baland quriladi?',
      hint: 'Teletoʻlqinlar qanday tarqaladi?',
      explanation: 'Metrli toʻlqinlar faqat koʻrinish chegarasigacha tarqaladi; minora qancha baland boʻlsa, qamrov shuncha katta.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Chiroyli koʻrinishi uchun', 'Toʻlqin koʻrinish chegarasigacha tarqaladi', 'Yuqorida havo toza', 'Chastotani oshirish uchun'], answerIndex: 1 } }
    },
    {
      id: 'f26q5',
      prompt: 'Telekoʻrsatuvda tasvir nima yordamida elektr signalga aylanadi?',
      hint: 'Radioda bu ishni mikrofon qiladi.',
      explanation: 'Videokamera yordamida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['mikrofon', 'videokamera', 'detektor', 'antenna'], answerIndex: 1 } }
    },
    {
      id: 'f26q6',
      prompt: 'Blokni vazifasi bilan moslang.',
      hint: 'Detektor ajratadi.',
      explanation: 'Videokamera — tasvirni signalga; modulyator — tashuvchiga qoʻshish; kontur — kanal tanlash; detektor — tasvir va ovozni ajratish.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'videokamera', right: 'tasvir → elektr signal' },
            { left: 'modulyator', right: 'signalni tashuvchiga qoʻshadi' },
            { left: 'kirish konturi', right: 'kanalni tanlaydi' },
            { left: 'detektor', right: 'tasvir va ovozni ajratadi' }
          ]
        }
      }
    },
    {
      id: 'f26q7',
      prompt: 'Toshkentda harakatli tasvir birinchi marta qaysi yili koʻrsatilgan?',
      hint: '26-iyul.',
      explanation: '1928-yil 26-iyulda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1911', '1925', '1928', '1956'], answerIndex: 2 } }
    },
    {
      id: 'f26q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Teletoʻlqinlar Yer boʻylab egilmaydi.',
      explanation: 'Metrli toʻlqinlar Yer boʻylab egilmaydi; ovoz va tasvir birga tarqatiladi; uzoq masofaga yoʻldosh orqali.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Teletoʻlqinlar Yer sirti boʻylab egilib, istalgan masofaga yetadi.', value: false },
            { text: 'Ovoz va tasvir signallari birga antennaga beriladi.', value: true },
            { text: 'Juda uzoq masofaga koʻrsatuvlar yoʻldosh orqali uzatiladi.', value: true },
            { text: 'Toshkent teleminorasining balandligi 180 m.', value: false }
          ]
        }
      }
    }
  ]
};
