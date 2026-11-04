import type { BoardLesson } from './types';

export const UZ2 = { kicker: 'Oʻzbekiston tarixi · II bob', title: 'Fuqarolik jamiyatining shakllanishi' };

/** Darslik: Oʻzbekiston tarixi 11, 3-mavzu (22–29-betlar) — mahalliy hokimiyat, fuqarolarning oʻzini oʻzi boshqarishi (mahalla), saylov tizimi, koʻppartiyaviylik. */
export const TARIX_3: BoardLesson = {
  n: 3,
  label: '3',
  group: UZ2,
  title: 'Fuqarolik jamiyati gʻoyasining rivojlanishi',
  section: 'Oʻzbekiston tarixi, 3-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Fuqarolik jamiyati — odamlar davlat ishlarida faol qatnashadigan jamiyat. Joylarda ikki xil hokimiyat bor: vakillik organi — xalq deputatlari Kengashlari va ijro organi — hokimlar; hokimlik lavozimi 1992-yil 4-yanvardagi qonun bilan joriy etildi. Mahallalarda esa fuqarolar yigʻini ishlaydi, u rais — oqsoqol va maslahatchilarni saylaydi. Saylovda 18 yoshdan ovoz berish mumkin; Prezidentlikka 35 yoshdan, Oliy Majlisga 25 yoshdan, mahalliy Kengashlarga 21 yoshdan saylanish mumkin.",
      easy: "Joylarda: Kengash va hokim; mahallada — fuqarolar yigʻini; saylov yoshi — 18.",
      draw: [
        { t: 'title', text: 'Mahalliy hokimiyat' },
        { t: 'box', id: 'k', x: 4, y: 20, w: 44, h: 9, text: 'xalq deputatlari Kengashi', color: 'blue' },
        { t: 'box', id: 'h', x: 52, y: 20, w: 44, h: 9, text: 'hokim va hokimlik', color: 'green' },
        { t: 'box', id: 'm', x: 26, y: 42, w: 48, h: 9, text: 'mahalla — fuqarolar yigʻini', color: 'orange' },
        { t: 'text', x: 4, y: 62, text: 'saylash — 18 yoshdan', size: 's', color: 'purple' }
      ],
      next: 'Siyosiy partiyalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Demokratiyada bir necha partiya erkin faoliyat yuritadi — bu koʻppartiyaviylik. Mustaqillik yillaridagi ilk partiya — Xalq demokratik partiyasi, 1991-yil noyabrda tuzilgan. Keyin «Vatan taraqqiyoti» (1992), «Adolat» sotsial-demokratik partiyasi va «Milliy tiklanish» (1995), Liberal-demokratik partiya — OʻzLiDeP (2003) paydo boʻldi. Baʼzi partiyalar keyin birlashdi. 2008-yilda Ekologik harakat tuzilib, Qonunchilik palatasidan 15 oʻrin oldi. Saylovlarni Markaziy saylov komissiyasi tashkil etadi.",
      easy: "XDP (1991), Adolat va Milliy tiklanish (1995), OʻzLiDeP (2003), Ekologik harakat (2008).",
      draw: [
        { t: 'title', text: 'Partiyalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'partiya'], ['1991', 'Xalq demokratik partiyasi'], ['1995', '«Adolat», «Milliy tiklanish»'], ['2003', 'OʻzLiDeP'], ['2008', 'Ekologik harakat']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Mahalliy hokimiyat — vakillik organi (xalq deputatlari Kengashlari) va ijro organi (hokimlar); hokimlik 1992-yildan joriy etildi.',
    'Mahallalarda fuqarolar yigʻini oʻzini oʻzi boshqaradi va oqsoqolni saylaydi; saylash huquqi 18 yoshdan, Prezidentlikka nomzod — 35 yoshdan.',
    'Koʻppartiyaviylik: XDP (1991) — ilk partiya, keyin «Vatan taraqqiyoti», «Adolat», «Milliy tiklanish», OʻzLiDeP; 2008-yilda Ekologik harakat tuzildi.'
  ],
  questions: [
    {
      id: 't3q1',
      prompt: 'Partiyalarni tashkil topish tartibida joylashtiring.',
      hint: 'XDP — birinchi.',
      explanation: 'XDP (1991) → «Adolat» (1995) → OʻzLiDeP (2003) → Ekologik harakat (2008).',
      widget: { type: 'order_line', props: { items: [{ label: 'Xalq demokratik partiyasi' }, { label: '«Adolat» SDP' }, { label: 'OʻzLiDeP' }, { label: 'Ekologik harakat' }] } }
    },
    {
      id: 't3q2',
      prompt: 'Lavozimni saylanish yoshi bilan juftlang.',
      hint: 'Eng kattasi — Prezident.',
      explanation: 'Prezident — 35 yosh; Oliy Majlis deputati — 25 yosh; mahalliy Kengash deputati — 21 yosh.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Prezident', right: '35 yosh' },
            { left: 'Oliy Majlis deputati', right: '25 yosh' },
            { left: 'mahalliy Kengash deputati', right: '21 yosh' }
          ]
        }
      }
    },
    {
      id: 't3q3',
      prompt: 'Necha yoshdan saylovda ovoz berish mumkin?',
      hint: 'Voyaga yetish yoshi.',
      explanation: '18 yoshdan.',
      widget: { type: 'number_answer', props: { answer: 18, unit: 'yosh' } }
    },
    {
      id: 't3q4',
      prompt: 'Organni mahalliy hokimiyat turiga ajrating.',
      hint: 'Vakillik — saylanadi, ijro — boshqaradi.',
      explanation: 'Vakillik: viloyat va tuman Kengashlari. Ijro: viloyat hokimligi, tuman hokimligi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'v', label: 'Vakillik' },
            { id: 'i', label: 'Ijro' }
          ],
          items: [
            { emoji: '', label: 'viloyat Kengashi', bin: 'v' },
            { emoji: '', label: 'tuman Kengashi', bin: 'v' },
            { emoji: '', label: 'viloyat hokimligi', bin: 'i' },
            { emoji: '', label: 'tuman hokimligi', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 't3q5',
      prompt: 'Mustaqillik davridagi ilk siyosiy partiya qaysi?',
      hint: '1991-yil noyabr.',
      explanation: 'Oʻzbekiston Xalq demokratik partiyasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['OʻzLiDeP', 'Xalq demokratik partiyasi', '«Adolat»', 'Ekologik harakat'], answerIndex: 1 } }
    },
    {
      id: 't3q6',
      prompt: 'Mahalladagi fuqarolar yigʻini kimni saylaydi?',
      hint: 'Ikki yarim yilga.',
      explanation: 'Raisni (oqsoqolni) va uning maslahatchilarini.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['hokimni', 'raisni (oqsoqolni)', 'senatorni', 'sudyani'], answerIndex: 1 } }
    },
    {
      id: 't3q7',
      prompt: 'Saylovlarni qaysi organ tashkil etadi?',
      hint: '2014-yildan doimiy organ.',
      explanation: 'Markaziy saylov komissiyasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Vazirlar Mahkamasi', 'Markaziy saylov komissiyasi', 'Oliy sud', 'hokimlik'], answerIndex: 1 } }
    },
    {
      id: 't3q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ekologik harakat 15 oʻrin olgan.',
      explanation: '2008-yil qonuniga koʻra Ekologik harakat 15 deputatlik oʻrnini olgan; viloyat hokimini Prezident tayinlaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ekologik harakatga Qonunchilik palatasida 15 oʻrin berilgan.', value: true },
            { text: 'Viloyat hokimini Prezident tayinlaydi.', value: true },
            { text: 'Koʻppartiyaviylik — faqat bitta partiyaning faoliyati.', value: false },
            { text: 'Hokimlik lavozimi 2005-yilda joriy etilgan.', value: false }
          ]
        }
      }
    }
  ]
};
