import type { BoardLesson } from './types';

export const UZ4 = { kicker: 'Oʻzbekiston tarixi · IV bob', title: 'Etnik va konfessiyalararo munosabatlar' };

/** Darslik: Oʻzbekiston tarixi 11, 8-mavzu (61–64-betlar) — millatlararo totuvlik gʻoyasi, milliy-madaniy markazlar, Baynalmilal madaniyat markazi, bagʻrikenglik. */
export const TARIX_8: BoardLesson = {
  n: 8,
  label: '8',
  group: UZ4,
  title: 'Millatlararo munosabatlar va bagʻrikenglik',
  section: 'Oʻzbekiston tarixi, 8-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oʻzbekistonda 130 dan ortiq millat va elat vakillari yashaydi va ularning hammasi teng huquqli fuqarolardir — buni Konstitutsiya kafolatlaydi. Millatlararo totuvlik — turli xalqlarning oʻzaro hurmat va hamkorlikda tinch yashashi. Ikkinchi jahon urushi va qatagʻon yillarida koreyslar, nemislar, qrim-tatarlar va boshqa xalqlar shu yerda boshpana topgan, ularning avlodlari uchun Oʻzbekiston Vatanga aylangan. Navroʻz va Mustaqillik bayramlarini barcha millatlar birga nishonlaydi.",
      easy: "130 dan ortiq millat — teng huquqli fuqarolar; totuvlik — hurmat va hamkorlik.",
      draw: [
        { t: 'title', text: 'Yagona oila' },
        { t: 'icon', x: 14, y: 40, emoji: '🤝', size: 'l' },
        { t: 'list', x: 30, y: 20, items: ['130 dan ortiq millat', 'hamma — teng fuqaro', 'taʼlim 7 tilda', 'radio va TV 12 tilda'] }
      ],
      next: 'Muhim maʼlumotlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Turli millatlarning madaniyatini saqlash uchun milliy-madaniy markazlar ishlaydi: 1992-yilda ular 10 ta boʻlsa, bugun 138 ta. Ularni 1992-yilda tuzilgan Respublika Baynalmilal madaniyat markazi muvofiqlashtirgan; 2017-yil 19-maydagi farmon bilan uning negizida Millatlararo munosabatlar va xorijiy mamlakatlar bilan doʻstlik aloqalari qoʻmitasi tuzildi. Aholining taxminan 80 foizi oʻzbeklar, qolganlari tojik, rus, qozoq va boshqa millatlar. 16-noyabr — Xalqaro bagʻrikenglik kuni, 21-fevral — Xalqaro ona tili kuni.",
      easy: "Milliy-madaniy markazlar: 10 → 138; 2017 — Millatlararo munosabatlar qoʻmitasi.",
      draw: [
        { t: 'title', text: 'Milliy-madaniy markazlar' },
        { t: 'bars', x: 6, y: 18, w: 48, h: 34, items: [{ label: '1992', value: 10 }, { label: 'bugun', value: 138 }] },
        { t: 'text', x: 58, y: 26, text: '16.11 — bagʻrikenglik', size: 's', color: 'purple' },
        { t: 'text', x: 58, y: 36, text: '21.02 — ona tili kuni', size: 's', color: 'purple' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Oʻzbekistonda 130 dan ortiq millat vakillari teng huquqli fuqaro sifatida yashaydi; taʼlim 7 tilda, teleradio 12 tilda olib boriladi.',
    'Milliy-madaniy markazlar soni 10 tadan (1992) 138 taga yetdi; ularni Baynalmilal madaniyat markazi (1992), 2017-yildan Millatlararo munosabatlar qoʻmitasi muvofiqlashtiradi.',
    'Millatlararo totuvlik — tinchlik va barqarorlik asosi; 16-noyabr — Xalqaro bagʻrikenglik kuni.'
  ],
  questions: [
    {
      id: 't8q1',
      prompt: 'Oʻzbekistonda nechta milliy-madaniy markaz faoliyat yuritadi?',
      hint: '1992-yilda — 10 ta.',
      explanation: '138 ta.',
      widget: { type: 'number_answer', props: { answer: 138, unit: 'ta' } }
    },
    {
      id: 't8q2',
      prompt: 'Sanani bayram yoki kun bilan juftlang.',
      hint: 'Bagʻrikenglik — noyabrda.',
      explanation: '16-noyabr — Xalqaro bagʻrikenglik kuni; 21-fevral — Xalqaro ona tili kuni; 8-dekabr — Konstitutsiya kuni.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '16-noyabr', right: 'Xalqaro bagʻrikenglik kuni' },
            { left: '21-fevral', right: 'Xalqaro ona tili kuni' },
            { left: '8-dekabr', right: 'Konstitutsiya kuni' }
          ]
        }
      }
    },
    {
      id: 't8q3',
      prompt: 'Millatlararo totuvlik gʻoyasi nimani anglatadi?',
      hint: 'Hurmat va hamkorlik.',
      explanation: 'Barcha xalqlarning teng huquqlilik, oʻzaro hurmat va hamkorlik asosida tinch yashashini.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bir millatning ustunligini', 'barcha xalqlarning teng va tinch yashashini', 'chegaralarni yopishni', 'faqat bitta tilni'], answerIndex: 1 } }
    },
    {
      id: 't8q4',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Ilk markazlar — mustaqillikdan oldin.',
      explanation: 'Ilk milliy-madaniy markazlar (1989) → Baynalmilal madaniyat markazi (1992) → Millatlararo munosabatlar qoʻmitasi (2017).',
      widget: { type: 'order_line', props: { items: [{ label: 'ilk milliy-madaniy markazlar' }, { label: 'Baynalmilal madaniyat markazi' }, { label: 'Millatlararo munosabatlar qoʻmitasi' }] } }
    },
    {
      id: 't8q5',
      prompt: 'Oʻzbekistonda taʼlim beriladigan tillarni tanlang.',
      hint: 'Yetti til.',
      explanation: 'Oʻzbek, qoraqalpoq, rus, qozoq, turkman, tojik va qirgʻiz tillarida.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'qoraqalpoq', correct: true },
            { label: 'rus', correct: true },
            { label: 'tojik', correct: true },
            { label: 'qirgʻiz', correct: true },
            { label: 'nemis' }
          ]
        }
      }
    },
    {
      id: 't8q6',
      prompt: 'Bayramni xalq bilan juftlang.',
      hint: 'Sabantoʻy — tatarlarda.',
      explanation: '«Sabantoʻy» — tatarlar; «Maslennitsa» — ruslar; «Sayil» — uygʻurlar.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: '«Sabantoʻy»' }, b: { label: 'tatarlar' } },
            { a: { label: '«Maslennitsa»' }, b: { label: 'ruslar' } },
            { a: { label: '«Sayil»' }, b: { label: 'uygʻurlar' } }
          ]
        }
      }
    },
    {
      id: 't8q7',
      prompt: 'Oʻzbekistonda nechta millat va elat vakillari yashaydi?',
      hint: '100 dan koʻp.',
      explanation: '130 dan ortiq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['20 ga yaqin', '50 ga yaqin', '130 dan ortiq', '300 dan ortiq'], answerIndex: 2 } }
    },
    {
      id: 't8q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Konstitutsiyaning 8-moddasi.',
      explanation: 'Oʻzbekiston xalqini millatidan qatʼi nazar barcha fuqarolar tashkil etadi; teleradio 12 tilda efirga uzatiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻzbekiston xalqini millatidan qatʼi nazar barcha fuqarolar tashkil etadi.', value: true },
            { text: 'Teleradio koʻrsatuvlari 12 tilda efirga uzatiladi.', value: true },
            { text: 'Milliy-madaniy markazlar soni mustaqillik yillarida kamaygan.', value: false },
            { text: 'Navroʻzni faqat oʻzbeklar nishonlaydi.', value: false }
          ]
        }
      }
    }
  ]
};
