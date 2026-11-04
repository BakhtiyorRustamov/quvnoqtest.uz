import type { BoardLesson } from './types';

export const UZ6 = { kicker: 'Oʻzbekiston tarixi · VI bob', title: 'Ilm-fan va sportning rivojlanishi' };

/** Darslik: Oʻzbekiston tarixi 11, 12-mavzu (81–85-betlar) — Oliy attestatsiya komissiyasi, Xorazm Maʼmun akademiyasi, innovatsion yarmarkalar, fan va taʼlim integratsiyasi, 2017-yilgi islohotlar. */
export const TARIX_12: BoardLesson = {
  n: 12,
  label: '12',
  group: UZ6,
  title: 'Oʻzbekistonda ilm-fan',
  section: 'Oʻzbekiston tarixi, 12-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mustaqillikdan keyin ilm-fanni ham yangi sharoitga moslash kerak edi. 1992-yilda ilmiy kadrlar tayyorlashni boshqaradigan Oliy attestatsiya komissiyasi — OAK tuzildi va olimlar xorijga tajriba oshirishga yuborila boshlandi. 1997-yilda qadimgi Xorazm Maʼmun akademiyasi qayta tiklandi. 2000-yilda Sharqshunoslik instituti qoʻlyozmalar fondi YuNESKO madaniy merosi roʻyxatiga kiritildi. 2008-yildan Toshkentda innovatsion gʻoyalar yarmarkasi oʻtkazilib, unda minglab ishlanmalar namoyish etildi.",
      easy: "1992 — OAK; 1997 — Xorazm Maʼmun akademiyasi; 2008 — innovatsion yarmarka.",
      draw: [
        { t: 'title', text: 'Ilm-fan yangilanishi' },
        { t: 'icon', x: 14, y: 40, emoji: '🔬', size: 'l' },
        { t: 'list', x: 30, y: 20, items: ['1992 — OAK', '1997 — Maʼmun akademiyasi', '2000 — qoʻlyozmalar YuNESKOda', '2008 — innovatsion yarmarka'] }
      ],
      next: 'Islohotlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "2012-yildan fan va taʼlimni yaqinlashtirish uchun Fanlar akademiyasining bir qancha institutlari universitetlarga oʻtkazildi. 2013-yildan bir bosqichli doktorantura joriy etildi, lekin u xalqaro standartlarga mos kelmagani uchun 2017-yilda ikki bosqichli tizimga — PhD va DSc ga qaytildi. 2017-yilda 9 ta ilmiy muassasa Fanlar akademiyasiga qaytarildi va Innovatsion rivojlanish vazirligi tuzildi. 22 yillik tanaffusdan keyin, 2017-yil dekabrda Fanlar akademiyasiga 32 nafar yangi akademik saylandi.",
      easy: "2017 — PhD va DSc, Innovatsion rivojlanish vazirligi, 32 yangi akademik.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1992', 'Oliy attestatsiya komissiyasi'], ['2006', 'Fan va texnologiyalar qoʻmitasi'], ['2012', 'institutlar universitetlarga'], ['2017', 'Innovatsion rivojlanish vazirligi'], ['2017-yil dekabr', '32 yangi akademik']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1992-yilda Oliy attestatsiya komissiyasi tuzildi; 1997-yilda Xorazm Maʼmun akademiyasi tiklandi; 2000-yilda Sharqshunoslik instituti qoʻlyozmalari YuNESKO roʻyxatiga kirdi.',
    '2008-yildan innovatsion gʻoyalar yarmarkasi oʻtkaziladi; 2012-yildan fan va taʼlim integratsiyasi kuchaytirildi.',
    '2017-yilda PhD va DSc tizimi, Innovatsion rivojlanish vazirligi joriy etildi; 22 yillik tanaffusdan soʻng 32 yangi akademik saylandi.'
  ],
  questions: [
    {
      id: 't12q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'OAK — birinchi.',
      explanation: 'OAK (1992) → Xorazm Maʼmun akademiyasi tiklandi (1997) → innovatsion yarmarka (2008) → Innovatsion rivojlanish vazirligi (2017).',
      widget: { type: 'order_line', props: { items: [{ label: 'Oliy attestatsiya komissiyasi' }, { label: 'Xorazm Maʼmun akademiyasi tiklandi' }, { label: 'ilk innovatsion yarmarka' }, { label: 'Innovatsion rivojlanish vazirligi' }] } }
    },
    {
      id: 't12q2',
      prompt: '2017-yil dekabrda Fanlar akademiyasiga nechta yangi haqiqiy aʼzo tasdiqlandi?',
      hint: '22 yillik tanaffusdan soʻng.',
      explanation: '32 nafar.',
      widget: { type: 'number_answer', props: { answer: 32, unit: 'nafar' } }
    },
    {
      id: 't12q3',
      prompt: 'Qaysi qadimiy akademiya 1997-yilda qayta tiklandi?',
      hint: 'Xorazm.',
      explanation: 'Xorazm Maʼmun akademiyasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Ulugʻbek akademiyasi', 'Xorazm Maʼmun akademiyasi', 'Bayt ul-hikma', 'Navoiy akademiyasi'], answerIndex: 1 } }
    },
    {
      id: 't12q4',
      prompt: 'Sanani voqea bilan juftlang.',
      hint: 'YuNESKO — 2000.',
      explanation: '1992 — OAK; 2000 — qoʻlyozmalar fondi YuNESKO roʻyxatida; 2008 — innovatsion yarmarka.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '1992', right: 'Oliy attestatsiya komissiyasi' },
            { left: '2000', right: 'qoʻlyozmalar YuNESKO roʻyxatida' },
            { left: '2008', right: 'innovatsion gʻoyalar yarmarkasi' }
          ]
        }
      }
    },
    {
      id: 't12q5',
      prompt: '2017-yilda nima uchun bir bosqichli doktoranturadan voz kechildi?',
      hint: 'Xalqaro standart.',
      explanation: 'U xalqaro ilm-fan standartlariga toʻla mos kelmagan va ilmiy salohiyat tushib ketgan edi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['xalqaro standartlarga mos emasdi', 'juda qimmat edi', 'olimlar koʻpayib ketdi', 'universitetlar yopildi'], answerIndex: 0 } }
    },
    {
      id: 't12q6',
      prompt: '2017-yilgi ilm-fan islohotlarini tanlang.',
      hint: 'Vazirlik va akademiklar.',
      explanation: 'Innovatsion rivojlanish vazirligi tuzildi, PhD va DSc tizimiga oʻtildi, 9 muassasa Fanlar akademiyasiga qaytarildi, yangi akademiklar saylandi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Innovatsion rivojlanish vazirligi', correct: true },
            { label: 'PhD va DSc tizimi', correct: true },
            { label: '32 yangi akademik', correct: true },
            { label: 'Fanlar akademiyasi tugatildi' }
          ]
        }
      }
    },
    {
      id: 't12q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Fan va taʼlim.',
      explanation: 'Fan va taʼlim integratsiyasi uchun akademiya institutlari universitetlarga oʻtkazildi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: '2012-yildan fan va taʼlim ' }, { blank: 'integratsiyasi' }, { text: ' uchun Fanlar akademiyasining baʼzi institutlari ' }, { blank: 'universitetlarga' }, { text: ' oʻtkazildi.' }],
          bank: ['integratsiyasi', 'universitetlarga', 'zavodlarga', 'xususiylashtirilishi']
        }
      }
    },
    {
      id: 't12q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Akademiklar saylovi — 1995 va 2017.',
      explanation: 'Akademiklar saylovi 1995-yildan 2017-yilgacha oʻtkazilmagan; olimlar xorijga tajriba oshirishga yuborila boshlagan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1995–2017-yillarda akademiklar saylovi oʻtkazilmagan.', value: true },
            { text: 'Mustaqillikdan keyin olimlar xorijga tajriba oshirishga yuborila boshladi.', value: true },
            { text: 'Oliy attestatsiya komissiyasi 2017-yilda tuzilgan.', value: false },
            { text: 'Qoʻlyozmalar fondi YuNESKO roʻyxatidan chiqarilgan.', value: false }
          ]
        }
      }
    }
  ]
};
