import type { BoardLesson } from './types';
import { BOB3 } from './biologiya-24';

/** Darslik: Biologiya 11, 28-§ (146–150-betlar) — biosfera biomassasi: quruqlik, dunyo okeani va tuproq biomassasi. */
export const BIO_28: BoardLesson = {
  n: 28,
  label: '28',
  group: BOB3,
  title: 'Biosfera biomassasi',
  section: '28-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Okean Yer yuzining uchdan ikki qismini egallaydi, lekin undagi tirik moddalar massasi quruqlikdagidan necha yuz marta kam! Yer sayyorasining umumiy biomassasi quruq modda hisobida taxminan 2423 milliard tonna, uning deyarli hammasi — quruqlikdagi yashil oʻsimliklar.",
      easy: "Yer biomassasi ≈ 2423 mlrd t, asosan quruqlik oʻsimliklari.",
      draw: [
        { t: 'title', text: 'Yer biomassasi' },
        { t: 'icon', x: 16, y: 40, emoji: '⚖️', size: 'l' },
        { t: 'formula', x: 32, y: 34, text: '≈ 2423 mlrd t' },
        { t: 'text', x: 32, y: 46, text: 'quruq modda hisobida', size: 's' }
      ],
      next: 'Quruqlik va okean'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Qitʼalarda: yashil oʻsimliklar 2400 milliard tonna — 99,2 foiz, hayvonlar va mikroorganizmlar 20 milliard — 0,8 foiz. Okeanda: oʻsimliklar atigi 0,2 milliard — 6,3 foiz, hayvonlar va mikroorganizmlar 3 milliard — 93,7 foiz. Demak quruqlikda oʻsimliklar, okeanda hayvonlar ustun; geterotroflar umumiy biomassaning taxminan 1 foizi.",
      easy: "Quruqlikda oʻsimlik 99 %, okeanda hayvon 94 %.",
      draw: [
        { t: 'title', text: 'Biomassa, mlrd t' },
        { t: 'table', x: 4, y: 20, rows: [['guruh', 'qitʼalar', 'okean'], ['oʻsimliklar', '2400 (99,2 %)', '0,2 (6,3 %)'], ['hayvon, mikrob', '20 (0,8 %)', '3,0 (93,7 %)'], ['jami', '2420', '3,2']] }
      ],
      next: 'Quruqlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Quruqlik biomassasi qutblardan ekvatorga tomon ortadi, oʻsimlik turlari ham koʻpayadi: tundrada 500 ga yaqin tur, dashtda 2000 ga yaqin, subtropik oʻrmonlarda 3000 dan koʻp, tropik oʻrmonlarda 8000 dan koʻp. Tropik oʻrmonlar — eng koʻp biomassa va eng mahsuldor quruqlik jamoalari. Hayvon turlari ham ekvator tomon koʻpayadi.",
      easy: "Ekvator tomon biomassa va turlar ortadi: tundra 500 → tropik 8000+.",
      draw: [
        { t: 'title', text: 'Oʻsimlik turlari soni' },
        { t: 'bars', x: 6, y: 18, w: 70, h: 38, items: [{ label: 'tundra', value: 500 }, { label: 'dasht', value: 2000 }, { label: 'subtropik', value: 3000 }, { label: 'tropik', value: 8000 }] }
      ],
      next: 'Okean'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Okeanda biomassa notekis, asosan yuza qatlamdagi planktonda. Biomassa kichik boʻlsa ham mahsuldorlik yuqori — plankton tez koʻpayadi va hayot sikli qisqa. Fotosintez 100 metrgacha qatlamda boradi; butun fotosintezning uchdan bir qismi okeanda. Moʻylovli kitlar faqat plankton yeydi. Qoldiqlar tubga choʻkib, ohak va boʻr qatlamlarini hosil qiladi — 100 million yil oldin dengiz boʻlgan Markaziy Osiyoda ham bunday konlar bor.",
      easy: "Okean: biomassa kichik, mahsuldorlik yuqori; fotosintezning 1/3 qismi.",
      draw: [
        { t: 'title', text: 'Dunyo okeani' },
        { t: 'list', x: 4, y: 20, items: ['biomassa — asosan plankton', 'fotosintez — 100 m gacha', 'fotosintezning 1/3 qismi', 'tubda — ohak, boʻr qatlamlari'] }
      ],
      next: 'Tuproq'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tuproq ham biogeotsenoz: unda ildizlar, mikroorganizmlar, chuvalchanglar, hasharot lichinkalari, koʻrsichqon va yumronqoziqlar yashaydi. Yomgʻir chuvalchanglari bir gektarda 25 tonna tuproqni ichagidan oʻtkazib, 0,5 santimetr qalinlikda unumdor tuproq hosil qiladi. Pestitsidlar tuproq organizmlarini qirib yuboradi — tuproqni asrash kerak.",
      easy: "Chuvalchanglar: 1 ga da 25 t tuproq, 0,5 sm unumdor qatlam.",
      draw: [
        { t: 'title', text: 'Tuproq biomassasi' },
        { t: 'icon', x: 12, y: 40, emoji: '🪱', size: 'l' },
        { t: 'formula', x: 26, y: 30, text: '1 ga: 25 t tuproq → 0,5 sm' },
        { t: 'text', x: 26, y: 44, text: 'xavf: pestitsidlar', color: 'red' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Yer biomassasi ≈ 2423 mlrd t (quruq modda); uning deyarli hammasi quruqlikda va asosan yashil oʻsimliklar.',
    'Quruqlikda oʻsimliklar (99 %), okeanda hayvonlar (≈ 94 %) ustun; quruqlik biomassasi va turlar soni qutbdan ekvatorga ortadi.',
    'Okean biomassasi kichik, ammo mahsuldorligi yuqori; tuproq biomassasi (chuvalchanglar, mikroblar) unumdorlikni yaratadi.'
  ],
  questions: [
    {
      id: 'b28q1',
      prompt: 'Biomassa ulushini joyi bilan juftlang.',
      hint: 'Okeanda hayvonlar koʻp.',
      explanation: 'Quruqlikdagi oʻsimliklar — 99,2 %; quruqlikdagi hayvonlar — 0,8 %; okeandagi oʻsimliklar — 6,3 %; okeandagi hayvonlar — 93,7 %.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'quruqlik oʻsimliklari', right: '99,2 %' },
            { left: 'quruqlik hayvonlari', right: '0,8 %' },
            { left: 'okean oʻsimliklari', right: '6,3 %' },
            { left: 'okean hayvonlari', right: '93,7 %' }
          ]
        }
      }
    },
    {
      id: 'b28q2',
      prompt: 'Yer sayyorasining umumiy biomassasi taxminan necha milliard tonna?',
      hint: '2400 dan biroz koʻp.',
      explanation: '≈ 2423 mlrd t.',
      widget: { type: 'number_answer', props: { answer: 2423, tolerance: 5, unit: 'mlrd t' } }
    },
    {
      id: 'b28q3',
      prompt: 'Biomlarni oʻsimlik turlari soni boʻyicha kamidan koʻpiga tartiblang.',
      hint: 'Ekvator tomon koʻpayadi.',
      explanation: 'Tundra (500) → dasht (2000) → subtropik oʻrmon (3000) → tropik oʻrmon (8000+).',
      widget: { type: 'order_line', props: { items: [{ label: 'tundra' }, { label: 'dasht' }, { label: 'subtropik oʻrmon' }, { label: 'tropik oʻrmon' }] } }
    },
    {
      id: 'b28q4',
      prompt: 'Butun fotosintezning qancha qismi okeanda boradi?',
      hint: 'Kasr.',
      explanation: '1/3 qismi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1/10', '1/3', '1/2', '9/10'], answerIndex: 1 } }
    },
    {
      id: 'b28q5',
      prompt: 'Nima uchun okean biomassasi kichik, lekin mahsuldorligi yuqori?',
      hint: 'Plankton.',
      explanation: 'Plankton tez koʻpayadi va hayot sikli qisqa.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['plankton tez koʻpayadi', 'okean sovuq', 'kitlar koʻp', 'suv shoʻr'], answerIndex: 0 } }
    },
    {
      id: 'b28q6',
      prompt: 'Yomgʻir chuvalchanglari 1 ga maydonda necha tonna tuproqni ichagidan oʻtkazadi?',
      hint: 'Darslikdagi raqam.',
      explanation: '25 t.',
      widget: { type: 'number_answer', props: { answer: 25, unit: 't' } }
    },
    {
      id: 'b28q7',
      prompt: 'Tuproq biomassasini tashkil etuvchilarni belgilang.',
      hint: 'Tuproqda yashovchilar.',
      explanation: 'Ildizlar, mikroorganizmlar, chuvalchanglar, hasharot lichinkalari.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'oʻsimlik ildizlari', correct: true },
            { label: 'mikroorganizmlar', correct: true },
            { label: 'yomgʻir chuvalchanglari', correct: true },
            { label: 'hasharot lichinkalari', correct: true },
            { label: 'kitlar' }
          ]
        }
      }
    },
    {
      id: 'b28q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Markaziy Osiyo bir vaqt dengiz boʻlgan.',
      explanation: 'Markaziy Osiyoda dengizdan qolgan ohak va boʻr konlari bor; quruqlik biomassasi okeannikidan ancha katta.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Markaziy Osiyoda qadimgi dengizdan qolgan ohak va boʻr konlari bor.', value: true },
            { text: 'Moʻylovli kitlar plankton bilan oziqlanadi.', value: true },
            { text: 'Okean biomassasi quruqlik biomassasidan katta.', value: false },
            { text: 'Quruqlik biomassasi ekvatordan qutbga tomon ortadi.', value: false }
          ]
        }
      }
    }
  ]
};
