import type { BoardLesson } from './types';
import { UZ6 } from './tarix-12';

/** Darslik: Oʻzbekiston tarixi 11, 14-mavzu (90–95-betlar) — yoshlar tashkilotlari («Yoshlar ittifoqi» → «Kamolot» → Oʻzbekiston yoshlar ittifoqi), yoshlar siyosati qonunlari, «Umid» jamgʻarmasi, «Zulfiya» mukofoti, Temurbeklar va Al-Xorazmiy maktablari. */
export const TARIX_14: BoardLesson = {
  n: 14,
  label: '14',
  group: UZ6,
  title: 'Oʻzbekistonda yoshlar siyosati',
  section: 'Oʻzbekiston tarixi, 14-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oʻzbekiston aholisining 60 foizdan koʻprogʻi 30 yoshgacha boʻlgan yoshlar. Shuning uchun yoshlar siyosati davlatning ustuvor vazifalaridan biri boʻldi. Yoshlar tashkiloti bir necha marta oʻzgardi: mustaqillikdan keyin «Yoshlar ittifoqi» tuzildi, 1996-yilda uning oʻrniga «Kamolot» jamgʻarmasi, 2001-yilda «Kamolot» yoshlar ijtimoiy harakati, 2017-yil 30-iyunda esa Oʻzbekiston yoshlar ittifoqi tashkil etildi. 30-iyun — Yoshlar kuni.",
      easy: "Yoshlar — aholining 60 % dan koʻpi; tashkilot: Ittifoq → «Kamolot» → Yoshlar ittifoqi (2017).",
      draw: [
        { t: 'title', text: 'Yoshlar tashkiloti' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 28, h: 10, text: '«Yoshlar ittifoqi»', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 20, w: 28, h: 10, text: '«Kamolot» (1996)', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 20, w: 28, h: 10, text: 'YoIH (2001)', color: 'orange' },
        { t: 'box', id: 'd', x: 52, y: 42, w: 44, h: 10, text: 'Yoshlar ittifoqi (2017)', color: 'purple' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' }
      ],
      next: 'Qonunlar va imtiyozlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yoshlar siyosatining asoslari haqidagi birinchi qonun 1991-yil noyabrda, «Yoshlarga oid davlat siyosati toʻgʻrisida»gi yangi qonun 2016-yilda qabul qilindi; unga koʻra 30 yoshgacha boʻlganlar yoshlar hisoblanadi. 1997-yilda iqtidorli yoshlarni chet elda oʻqitish uchun «Umid» jamgʻarmasi, 1999-yilda qizlar uchun «Zulfiya» mukofoti taʼsis etildi. 2017-yilda harbiy litseylarga «Temurbeklar maktabi» nomi berildi, «Mard oʻgʻlon» mukofoti va Muhammad al-Xorazmiy nomidagi maktab tashkil etildi.",
      easy: "1991 va 2016 — yoshlar qonunlari; 1997 — «Umid»; 1999 — «Zulfiya»; 2017 — Temurbeklar maktabi.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1991', 'yoshlar siyosati qonuni'], ['1997', '«Umid» jamgʻarmasi'], ['1999', '«Zulfiya» mukofoti'], ['2016', 'yangi yoshlar qonuni'], ['2017', 'Temurbeklar maktabi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Yoshlar aholining 60 % dan koʻprogʻini tashkil qiladi; 2016-yilgi qonunga koʻra 30 yoshgacha boʻlganlar — yoshlar.',
    'Yoshlar tashkiloti: «Yoshlar ittifoqi» → «Kamolot» jamgʻarmasi (1996) → «Kamolot» YoIH (2001) → Oʻzbekiston yoshlar ittifoqi (2017); 30-iyun — Yoshlar kuni.',
    '«Umid» jamgʻarmasi (1997), «Zulfiya» mukofoti (1999), Temurbeklar maktabi, «Mard oʻgʻlon» mukofoti va Al-Xorazmiy maktabi (2017) yoshlarni qoʻllab-quvvatlaydi.'
  ],
  questions: [
    {
      id: 't14q1',
      prompt: 'Yoshlar tashkilotlarini xronologik tartibda joylashtiring.',
      hint: 'Ittifoq — birinchi.',
      explanation: '«Yoshlar ittifoqi» → «Kamolot» jamgʻarmasi (1996) → «Kamolot» YoIH (2001) → Oʻzbekiston yoshlar ittifoqi (2017).',
      widget: { type: 'order_line', props: { items: [{ label: '«Yoshlar ittifoqi»' }, { label: '«Kamolot» jamgʻarmasi' }, { label: '«Kamolot» yoshlar ijtimoiy harakati' }, { label: 'Oʻzbekiston yoshlar ittifoqi' }] } }
    },
    {
      id: 't14q2',
      prompt: '2016-yilgi qonunga koʻra necha yoshgacha boʻlganlar yoshlar hisoblanadi?',
      hint: 'Aholining 60 % dan koʻpi.',
      explanation: '30 yoshgacha.',
      widget: { type: 'number_answer', props: { answer: 30, unit: 'yosh' } }
    },
    {
      id: 't14q3',
      prompt: 'Yoshlar kuni qachon nishonlanadi?',
      hint: '2017-yildagi qurultoy kuni.',
      explanation: '30-iyun.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1-iyun', '30-iyun', '1-sentabr', '1-oktabr'], answerIndex: 1 } }
    },
    {
      id: 't14q4',
      prompt: 'Mukofot yoki jamgʻarmani maqsadi bilan juftlang.',
      hint: '«Umid» — chet elda oʻqish.',
      explanation: '«Umid» — iqtidorli yoshlarni chet elda oʻqitish; «Zulfiya» — iqtidorli qizlar; «Mard oʻgʻlon» — yigitlarni ragʻbatlantirish.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«Umid» jamgʻarmasi', right: 'chet elda oʻqish' },
            { left: '«Zulfiya» mukofoti', right: 'iqtidorli qizlar' },
            { left: '«Mard oʻgʻlon» mukofoti', right: 'yigitlarni ragʻbatlantirish' }
          ]
        }
      }
    },
    {
      id: 't14q5',
      prompt: '2017-yilda harbiy akademik litseylarga qanday nom berildi?',
      hint: 'Amir Temur.',
      explanation: '«Temurbeklar maktabi».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Barkamol avlod»', '«Temurbeklar maktabi»', '«Kamolot»', '«Umid nihollari»'], answerIndex: 1 } }
    },
    {
      id: 't14q6',
      prompt: 'Sanani voqea bilan juftlang.',
      hint: '«Zulfiya» — 1999.',
      explanation: '1997 — «Umid» jamgʻarmasi; 1999 — «Zulfiya» mukofoti; 2017 — Oʻzbekiston yoshlar ittifoqi.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: '1997' }, b: { label: '«Umid» jamgʻarmasi' } },
            { a: { label: '1999' }, b: { label: '«Zulfiya» mukofoti' } },
            { a: { label: '2017' }, b: { label: 'Yoshlar ittifoqi' } }
          ]
        }
      }
    },
    {
      id: 't14q7',
      prompt: 'Muhammad al-Xorazmiy nomidagi maktab qaysi yoʻnalishga ixtisoslashgan?',
      hint: 'Kompyuter.',
      explanation: 'Axborot-kommunikatsiya texnologiyalari fanlarini chuqur oʻqitishga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['sport', 'axborot-kommunikatsiya texnologiyalari', 'musiqa', 'qishloq xoʻjaligi'], answerIndex: 1 } }
    },
    {
      id: 't14q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Harbiy xizmatdan keyin imtiyoz.',
      explanation: 'Muddatli harbiy xizmatni oʻtaganlarga oliy taʼlimga kirishda qoʻshimcha ball beriladi; 2008-yil «Yoshlar yili» deb eʼlon qilingan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Harbiy xizmatni oʻtaganlarga oliy taʼlimga kirishda qoʻshimcha ball beriladi.', value: true },
            { text: '2008-yil «Yoshlar yili» deb eʼlon qilingan.', value: true },
            { text: 'Yoshlar aholining 10 % ini tashkil qiladi.', value: false },
            { text: '«Kamolot» tashkiloti hozir ham faoliyat yuritadi.', value: false }
          ]
        }
      }
    }
  ]
};
