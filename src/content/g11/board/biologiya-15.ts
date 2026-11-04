import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';
import { rect } from './phys';

/** Darslik: Biologiya 11, 15-§ (86–93-betlar) — biotsenoz tur tarkibi, dominant va noyob turlar, vertikal yaruslilik, gorizontal mozaiklik, organizmlarning tarqalish xillari, etologik struktura. */
export const BIO_15: BoardLesson = {
  n: 15,
  label: '15',
  group: BOB2,
  title: 'Populatsion struktura (davomi)',
  section: '15-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Tropik oʻrmonda bir necha ming tur yashaydi, tundrada esa asosan yoʻsin va lishayniklar. Sharoit qancha qulay boʻlsa, turlar shuncha koʻp, biotsenoz shuncha barqaror. Biotsenozdagi turlar qanday joylashadi va bir-biri bilan qanday yashaydi?",
      easy: "Qulay sharoit — koʻp tur — barqaror biotsenoz.",
      draw: [
        { t: 'title', text: 'Tur boyligi' },
        { t: 'icon', x: 16, y: 34, emoji: '🌴', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '❄️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['tropik oʻrmon — minglab tur', 'tundra — yoʻsin, lishaynik', 'koʻp tur — barqarorlik'] }
      ],
      next: 'Dominantlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Son jihatdan eng koʻp va biotopning katta qismini egallagan turlar — dominantlar; ular biotsenozga nom beradi: qaragʻayzor, archazor. Subdominantlar — koʻp, lekin dominantlardan kam. Kam sonli turlar ahyon-ahyonda uchraydi, noyob turlar — juda kam. Kam sonli va noyob turlar himoyaga olinadi, Qizil kitobga kiritiladi.",
      easy: "Dominant → subdominant → kam sonli → noyob (Qizil kitob).",
      draw: [
        { t: 'title', text: 'Dominantlik darajasi' },
        { t: 'bars', x: 6, y: 20, w: 60, h: 36, items: [{ label: 'dominant', value: 60 }, { label: 'subdominant', value: 25 }, { label: 'kam sonli', value: 10 }, { label: 'noyob', value: 3 }] },
        { t: 'text', x: 70, y: 30, text: 'noyob →', size: 's', color: 'red' },
        { t: 'text', x: 70, y: 38, text: 'Qizil kitob', size: 's', color: 'red' }
      ],
      next: 'Yaruslar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Biotsenozning vertikal strukturasi — yaruslilik. Bargli oʻrmonda: 1-yarus — baland yorugʻsevar daraxtlar: eman, terak; 2-yarus — pastroq daraxtlar: yovvoyi olma, nok; 3-yarus — butalar; 4-yarus — baland oʻtlar; 5-yarus — past oʻtlar va yoʻsinlar. Hayvonlar ham yaruslarga taqsimlanadi. Yaruslilik raqobatni kamaytirib, quyosh energiyasidan toʻliq foydalanadi.",
      easy: "Daraxtlar → past daraxtlar → butalar → oʻtlar → yoʻsinlar.",
      draw: [
        { t: 'title', text: 'Oʻrmon yaruslari' },
        ...rect('y1', 6, 20, 10, 42, 'green'),
        ...rect('y2', 20, 30, 10, 32, 'green'),
        ...rect('y3', 34, 42, 10, 20, 'green'),
        ...rect('y4', 48, 50, 10, 12, 'green'),
        ...rect('y5', 62, 56, 10, 6, 'green'),
        { t: 'list', x: 76, y: 22, items: ['1 daraxt', '2 daraxt', '3 buta', '4 oʻt', '5 yoʻsin'] }
      ],
      next: 'Tarqalish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gorizontal tarqalish uch xil. Bir tekis — kuchli raqobatda: quyuq oʻrmonda daraxtlar bir-biridan shox-shabba kengligicha uzoqda. Tasodifiy — sharoit bir xil boʻlganda. Guruhli — eng keng tarqalgan: ogʻir mevalar daraxt yoniga tushadi, bugʻdoyiq ildizpoyasi bilan guruh hosil qiladi; hayvonlar gala, poda, koloniya boʻlib yashaydi.",
      easy: "Bir tekis, tasodifiy, guruhli (eng koʻp).",
      draw: [
        { t: 'title', text: 'Tarqalish xillari' },
        { t: 'icon', x: 10, y: 30, emoji: '🌲', size: 's' },
        { t: 'icon', x: 20, y: 30, emoji: '🌲', size: 's' },
        { t: 'icon', x: 10, y: 42, emoji: '🌲', size: 's' },
        { t: 'icon', x: 20, y: 42, emoji: '🌲', size: 's' },
        { t: 'icon', x: 40, y: 28, emoji: '🌲', size: 's' },
        { t: 'icon', x: 52, y: 38, emoji: '🌲', size: 's' },
        { t: 'icon', x: 43, y: 46, emoji: '🌲', size: 's' },
        { t: 'icon', x: 72, y: 32, emoji: '🌲', size: 's' },
        { t: 'icon', x: 77, y: 36, emoji: '🌲', size: 's' },
        { t: 'icon', x: 73, y: 41, emoji: '🌲', size: 's' },
        { t: 'text', x: 15, y: 58, text: 'bir tekis', size: 's', anchor: 'middle' },
        { t: 'text', x: 46, y: 58, text: 'tasodifiy', size: 's', anchor: 'middle' },
        { t: 'text', x: 75, y: 58, text: 'guruhli', size: 's', anchor: 'middle' }
      ],
      next: 'Etologik struktura'
    },
    {
      kind: 'example',
      clear: true,
      say: "Etologik struktura — individlar orasidagi munosabatlar tizimi, faqat hayvonlarga xos. Tulki yakka yashaydi. Sherlar oilasi — prayd: erkak, bir necha urgʻochi va bolalar; ular hududini himoya qiladi. Boʻrilar — toʻda, qatʼiy tartib. Poda — eng kuchli boshchilik qiladi: zebralar oldida qari urgʻochi, oxirida boshliq erkak. Koloniyalar: pingvinlar, chumoli va arilarda vazifalar taqsimlangan.",
      easy: "Yakka (tulki), oila (sher), toʻda (boʻri), poda (zebra), koloniya (chumoli).",
      draw: [
        { t: 'title', text: 'Etologik guruhlar' },
        { t: 'table', x: 4, y: 20, rows: [['guruh', 'misol'], ['yakka', 'tulki'], ['oila (prayd)', 'sherlar'], ['toʻda', 'boʻrilar'], ['poda', 'zebra, kiyik'], ['koloniya', 'pingvin, chumoli']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Biotsenozni dominant turlar belgilaydi; subdominant, kam sonli va noyob turlar ham bor — noyoblari Qizil kitobga kiritiladi.',
    'Vertikal struktura — yaruslilik (daraxtlar → butalar → oʻtlar → yoʻsinlar); gorizontal tarqalish — bir tekis, tasodifiy, guruhli.',
    'Etologik struktura faqat hayvonlarga xos: yakka, oila, toʻda, poda, koloniya.'
  ],
  questions: [
    {
      id: 'b15q1',
      prompt: 'Bargli oʻrmon yaruslarini yuqoridan pastga tartiblang.',
      hint: 'Eng baland — yorugʻsevar daraxtlar.',
      explanation: 'Baland daraxtlar → past daraxtlar → butalar → baland oʻtlar → past oʻtlar va yoʻsinlar.',
      widget: { type: 'order_line', props: { items: [{ label: 'eman, terak' }, { label: 'yovvoyi olma, nok' }, { label: 'butalar' }, { label: 'baland oʻtlar' }, { label: 'yoʻsinlar' }] } }
    },
    {
      id: 'b15q2',
      prompt: 'Hayvonni etologik guruhi bilan juftlang.',
      hint: 'Sherlar — prayd.',
      explanation: 'Tulki — yakka; sher — oila; boʻri — toʻda; chumoli — koloniya.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'tulki', right: 'yakka' },
            { left: 'sher', right: 'oila' },
            { left: 'boʻri', right: 'toʻda' },
            { left: 'chumoli', right: 'koloniya' }
          ]
        }
      }
    },
    {
      id: 'b15q3',
      prompt: 'Biotsenozga nom beradigan turlar qanday ataladi?',
      hint: 'Qaragʻayzor — qaragʻay.',
      explanation: 'Dominant turlar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['noyob', 'dominant', 'subdominant', 'kam sonli'], answerIndex: 1 } }
    },
    {
      id: 'b15q4',
      prompt: 'Tabiatda eng koʻp uchraydigan tarqalish xili qaysi?',
      hint: 'Gala, poda, koloniya.',
      explanation: 'Guruhli tarqalish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bir tekis', 'tasodifiy', 'guruhli'], answerIndex: 2 } }
    },
    {
      id: 'b15q5',
      prompt: 'Guruh hosil qiladigan organizmlarni belgilang.',
      hint: 'Ildizpoya bilan koʻpayuvchilar va gala hayvonlar.',
      explanation: 'Bugʻdoyiq, beda, boʻri, goʻngqargʻa guruh hosil qiladi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'bugʻdoyiq', correct: true },
            { label: 'boʻri', correct: true },
            { label: 'goʻngqargʻa', correct: true },
            { label: 'beda', correct: true },
            { label: 'tulki' }
          ]
        }
      }
    },
    {
      id: 'b15q6',
      prompt: 'Yaruslilikning ahamiyati nimada?',
      hint: 'Turli balandlik — turli yorugʻlik.',
      explanation: 'Raqobatni kamaytiradi va quyosh energiyasidan toʻliq foydalanadi.',
      widget: {
        type: 'mcq',
        props: { prompt: '', choices: ['raqobatni kamaytirib, resurslardan toʻliq foydalanish', 'turlar sonini kamaytirish', 'oʻrmonni chiroyli qilish', 'tuproqni quritish'], answerIndex: 0 }
      }
    },
    {
      id: 'b15q7',
      prompt: 'Turni dominantlik darajasi boʻyicha koʻpidan kamiga tartiblang.',
      hint: 'Noyob — eng kam.',
      explanation: 'Dominant → subdominant → kam sonli → noyob.',
      widget: { type: 'order_line', props: { items: [{ label: 'dominant' }, { label: 'subdominant' }, { label: 'kam sonli' }, { label: 'noyob' }] } }
    },
    {
      id: 'b15q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Etologik struktura — xulq-atvor.',
      explanation: 'Etologik struktura faqat hayvonlarda; zebralar podasi oldida qari urgʻochi yuradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Etologik struktura faqat hayvonlarga xos.', value: true },
            { text: 'Zebralar podasida oldinda qari urgʻochi yuradi.', value: true },
            { text: 'Tundrada turlar xilma-xilligi tropik oʻrmondan yuqori.', value: false },
            { text: 'Dominant turlarni Qizil kitobga kiritish shart.', value: false }
          ]
        }
      }
    }
  ]
};
