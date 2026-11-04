import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 13-mavzu (60–64-betlar) — Fransiya: F. Mitteran va Yevropa integratsiyasi, J. Shirak, postindustrial jamiyat, N. Sarkozi, F. Olland, E. Makron. */
export const TARIX_113: BoardLesson = {
  n: 113,
  label: '13',
  group: JH2,
  title: '1991–2017-yillarda Fransiya',
  section: 'Jahon tarixi, 13-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1980–1990-yillar boshida Fransiyani sotsialistlar boshqargan, prezident Fransua Mitteran edi. U Germaniya bilan yaqinlashish va Gʻarbiy Yevropani birlashtirishni asosiy vazifa deb bildi; Fransiya Shengen kelishuvini imzolab, fuqarolar vizasiz va bojxona nazoratisiz chegaradan oʻtadigan hududni yaratishda qatnashdi. Ammo iqtisodiy oʻsish sust boʻlib, ishsizlik oshdi, 1993-yilgi parlament saylovida oʻng kuchlar katta gʻalaba qozondi. 1995-yilda prezident boʻlgan Jak Shirak ishsizlikka qarshi kurash va boy-kambagʻal tafovutini kamaytirishni asosiy vazifa deb eʼlon qildi; 1996-yildan iqtisodiy oʻsish tezlashdi.",
      easy: "Mitteran — Yevropa integratsiyasi, Shengen; 1993 — oʻng kuchlar gʻalabasi; 1995 — Shirak.",
      draw: [
        { t: 'title', text: 'Fransiya prezidentlari' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'prezident'], ['1981–1995', 'Fransua Mitteran'], ['1995', 'Jak Shirak'], ['2007', 'Nikolya Sarkozi'], ['2012', 'Fransua Olland'], ['2017', 'Emmanyuel Makron']] }
      ],
      next: 'Yangi Fransiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1990-yillarda Fransiyada postindustrial jamiyat shakllandi: shaharlarda osmonoʻpar binolar, soatiga 250–300 km tezlikdagi poyezdlar paydo boʻldi, 1994-yil mayda Angliya bilan birga qurilgan La-Mansh ostidagi tunnel — Yevrotunnel ochildi. Elektronika va informatika rivojlanib, koʻmir va metallurgiya tushkunlikka yuz tutdi. 2008–2009-yillardagi inqiroz iqtisodga salbiy taʼsir qildi. 2015-yil noyabrda Parijdagi terrorchilik hujumlarida yuzdan ortiq kishi halok boʻldi. 2017-yilgi saylovda «Olgʻa!» harakati vakili Emmanyuel Makron gʻolib chiqdi; ikkinchi turga chiqqan Marin Le Pen qariyb 34 % ovoz oldi.",
      easy: "Postindustrial jamiyat, Yevrotunnel (1994); 2015 — Parijdagi hujumlar; 2017 — Makron.",
      draw: [
        { t: 'title', text: 'Postindustrial Fransiya' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'tezyurar poyezd', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'Yevrotunnel, 1994', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'elektronika', color: 'orange' },
        { t: 'text', x: 4, y: 46, text: 'Pasaygan sohalar: koʻmir, metallurgiya', size: 's', color: 'red' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'F. Mitteran Fransiyani Germaniya bilan birga Gʻarbiy Yevropa integratsiyasining eng faol ishtirokchisiga aylantirdi (Shengen kelishuvi).',
    '1993-yilda oʻng kuchlar gʻalaba qozondi, 1995-yildan J. Shirak prezident; 1990-yillarda postindustrial jamiyat shakllandi, 1994-yilda Yevrotunnel ochildi.',
    'XXI asrda inqiroz, muhojirlar oqimi va terrorizm (Parij, 2015) muammolari kuchaydi; 2017-yilda E. Makron prezident etib saylandi.'
  ],
  questions: [
    {
      id: 'j13q1',
      prompt: 'Fransiya prezidentlarini tartib boʻyicha joylashtiring.',
      hint: 'Mitteran — birinchi.',
      explanation: 'F. Mitteran → J. Shirak → N. Sarkozi → F. Olland → E. Makron.',
      widget: { type: 'order_line', props: { items: [{ label: 'Fransua Mitteran' }, { label: 'Jak Shirak' }, { label: 'Nikolya Sarkozi' }, { label: 'Fransua Olland' }, { label: 'Emmanyuel Makron' }] } }
    },
    {
      id: 'j13q2',
      prompt: 'Shengen kelishuvi nimani taʼminlaydi?',
      hint: 'Chegaralar.',
      explanation: 'Aʼzo davlatlar fuqarolarining vizasiz va bojxona nazoratisiz chegaradan oʻtishini.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yagona armiyani', 'vizasiz va bojxonasiz oʻtishni', 'yagona soliqni', 'NATOga aʼzolikni'], answerIndex: 1 } }
    },
    {
      id: 'j13q3',
      prompt: 'La-Mansh boʻgʻozi ostidagi Yevrotunnel qaysi yilda ochilgan?',
      hint: '1990-yillar oʻrtasi.',
      explanation: '1994-yil mayda.',
      widget: { type: 'number_answer', props: { answer: 1994, unit: 'yil' } }
    },
    {
      id: 'j13q4',
      prompt: 'Sohani rivojlangan yoki pasaygan guruhga ajrating.',
      hint: 'Postindustrial jamiyat.',
      explanation: 'Rivojlandi — elektronika, informatika, tezyurar temiryoʻl; pasaydi — koʻmir qazib olish, metallurgiya.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'up', label: 'rivojlandi' }, { id: 'down', label: 'pasaydi' }],
          items: [
            { emoji: '💻', label: 'elektronika', bin: 'up' },
            { emoji: '🖥️', label: 'informatika', bin: 'up' },
            { emoji: '🚄', label: 'tezyurar temiryoʻl', bin: 'up' },
            { emoji: '⛏️', label: 'koʻmir qazib olish', bin: 'down' },
            { emoji: '🏭', label: 'metallurgiya', bin: 'down' }
          ]
        }
      }
    },
    {
      id: 'j13q5',
      prompt: 'Prezidentni u bilan bogʻliq fakt bilan juftlang.',
      hint: 'Makron — «Olgʻa!».',
      explanation: 'J. Shirak — ishsizlikka qarshi kurash; N. Sarkozi — «Xalq harakati uchun ittifoq»; E. Makron — «Olgʻa!» harakati.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'J. Shirak', right: 'ishsizlikka qarshi kurash' },
            { left: 'N. Sarkozi', right: '«Xalq harakati uchun ittifoq»' },
            { left: 'E. Makron', right: '«Olgʻa!» harakati' }
          ]
        }
      }
    },
    {
      id: 'j13q6',
      prompt: '2017-yilgi saylovda ikkinchi turga chiqqan Marin Le Pen taxminan necha foiz ovoz olgan?',
      hint: 'Uchdan birga yaqin.',
      explanation: 'Qariyb 34 %.',
      widget: { type: 'number_answer', props: { answer: 34, unit: '%' } }
    },
    {
      id: 'j13q7',
      prompt: 'XXI asrda Fransiyada ijtimoiy vaziyatni keskinlashtirgan omillarni tanlang.',
      hint: 'Inqiroz va xavfsizlik.',
      explanation: 'Moliyaviy inqiroz, muhojirlar oqimi, terrorchilik hujumlari.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: '2008–2009-yillardagi inqiroz', correct: true },
            { label: 'muhojirlar oqimi', correct: true },
            { label: 'terrorchilik hujumlari', correct: true },
            { label: 'Yevrotunnelning yopilishi' }
          ]
        }
      }
    },
    {
      id: 'j13q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '1993 — oʻng kuchlar.',
      explanation: '1993-yilda oʻng kuchlar parlamentda mutlaq koʻpchilikni olgan; Fransiya va Germaniya integratsiyaning eng faol ishtirokchilari boʻlgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1993-yilgi saylovda oʻng kuchlar parlamentda mutlaq koʻpchilikni olgan.', value: true },
            { text: 'Fransiya Germaniya bilan birga Yevropa integratsiyasining faol ishtirokchisi boʻlgan.', value: true },
            { text: 'Yevrotunnel Fransiya va Ispaniya oʻrtasida qurilgan.', value: false },
            { text: 'F. Olland 2017-yilda ikkinchi muddatga saylangan.', value: false }
          ]
        }
      }
    }
  ]
};
