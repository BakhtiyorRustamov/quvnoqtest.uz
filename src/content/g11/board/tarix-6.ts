import type { BoardLesson } from './types';
import { UZ3 } from './tarix-5';

/** Darslik: Oʻzbekiston tarixi 11, 6-mavzu (46–51-betlar) — modernizatsiya, kichik biznes rivojining bosqichlari, erkin iqtisodiy zonalar, soliq tizimi, valuta erkinlashtirilishi. */
export const TARIX_6: BoardLesson = {
  n: 6,
  label: '6',
  group: UZ3,
  title: 'Ishlab chiqarish va jahon iqtisodiyotiga integratsiya',
  section: 'Oʻzbekiston tarixi, 6-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "2000-yillardan iqtisodiyotda davlat aralashuvi kamaytirilib, tadbirkorlikka yoʻl ochildi. Kichik biznes toʻrt bosqichda rivojlandi: 1991–1996 — xususiylashtirish va kichik mulkdorlar; 1996–2000 — keng xususiylashtirish va ilk xususiy banklar; 2000–2016 — tadbirkorlik erkinligi kafolatlari; 2016-yildan — jadal rivojlanish va tekshiruvlarga moratoriy. Kichik korxonalar uchun yagona soliq 10 foizdan 5 foizgacha tushirildi.",
      easy: "Kichik biznes 4 bosqichda rivojlandi; yagona soliq 10 % dan 5 % ga tushdi.",
      draw: [
        { t: 'title', text: 'Kichik biznes bosqichlari' },
        { t: 'table', x: 4, y: 18, rows: [['bosqich', 'mazmuni'], ['1991–1996', 'kichik mulkdorlar'], ['1996–2000', 'keng xususiylashtirish'], ['2000–2016', 'tadbirkorlik kafolatlari'], ['2016-yildan', 'jadal rivojlanish']] }
      ],
      next: 'Erkin zonalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Chet el sarmoyasini jalb qilish uchun erkin iqtisodiy zonalar tuzildi: bunday hududda korxonalar 3 yildan 7 yilgacha soliq va bojdan ozod qilinadi. 1996-yilda bu haqda qonun qabul qilindi, 2008-yilda «Navoiy» zonasi va xalqaro logistika markazi, 2013-yilda «Jizzax» va «Angren» zonalari tuzildi; 2018-yilga kelib 14 ta zona ishlardi. 2017-yil 5-sentabrdan valuta cheklovlarsiz almashtirila boshlandi — bu soʻmning erkin konvertatsiyasi yoʻlidagi muhim qadam boʻldi.",
      easy: "Erkin zonalar — soliq imtiyozlari; 2008 «Navoiy»; 2017-yil 5-sentabr — valuta erkin almashtiriladi.",
      draw: [
        { t: 'title', text: 'Erkin iqtisodiy zonalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1996', 'erkin zonalar qonuni'], ['2008', '«Navoiy» zonasi'], ['2013', '«Jizzax», «Angren»'], ['2017-yil 5-sentabr', 'valuta erkin almashtiriladi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '2000-yillardan iqtisodiyotda davlat aralashuvi kamaytirilib, import oʻrnini bosuvchi ishlab chiqarish va mahalliylashtirish dasturlari amalga oshirildi.',
    'Kichik biznes toʻrt bosqichda rivojlandi (1991–1996, 1996–2000, 2000–2016, 2016-yildan); yagona soliq 10 % dan 5 % gacha kamaytirildi.',
    'Erkin iqtisodiy zonalar («Navoiy» — 2008, «Jizzax», «Angren» — 2013) imtiyozlar beradi; 2017-yil 5-sentabrdan valuta erkin almashtirila boshlandi.'
  ],
  questions: [
    {
      id: 't6q1',
      prompt: 'Kichik biznes rivoji bosqichlarini tartiblang.',
      hint: 'Avval xususiylashtirish.',
      explanation: 'Kichik mulkdorlar (1991–1996) → keng xususiylashtirish (1996–2000) → tadbirkorlik kafolatlari (2000–2016) → jadal rivojlanish (2016-yildan).',
      widget: { type: 'step_order', props: { steps: ['kichik mulkdorlar sinfi shakllandi', 'keng xususiylashtirish va ilk xususiy banklar', 'tadbirkorlik erkinligi kafolatlari', 'jadal rivojlanish, tekshiruvlarga moratoriy'] } }
    },
    {
      id: 't6q2',
      prompt: 'Erkin iqtisodiy zonani tuzilgan yili bilan juftlang.',
      hint: 'Navoiy — birinchi.',
      explanation: '«Navoiy» — 2008; «Jizzax» — 2013; «Urgut», «Qoʻqon» — 2016.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«Navoiy»', right: '2008' },
            { left: '«Jizzax»', right: '2013' },
            { left: '«Urgut»', right: '2016' }
          ]
        }
      }
    },
    {
      id: 't6q3',
      prompt: 'Kichik korxonalar uchun yagona soliq oxir-oqibat necha foizga tushirilgan?',
      hint: '10 → 8 → 7 → ?',
      explanation: '5 foizga.',
      widget: { type: 'number_answer', props: { answer: 5, unit: '%' } }
    },
    {
      id: 't6q4',
      prompt: 'Erkin iqtisodiy zonaning asosiy maqsadi nima?',
      hint: 'Sarmoya.',
      explanation: 'Imtiyozlar bilan mahalliy va chet el kapitali, yangi texnologiyalarni jalb qilish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['chet el sarmoyasini jalb qilish', 'soliqlarni oshirish', 'importni taqiqlash', 'qishloq xoʻjaligini yopish'], answerIndex: 0 } }
    },
    {
      id: 't6q5',
      prompt: '2017-yil 5-sentabrdan qanday oʻzgarish boʻldi?',
      hint: 'Valuta.',
      explanation: 'Yuridik va jismoniy shaxslar xorijiy valutani cheklovlarsiz almashtira boshladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['soʻm-kupon kiritildi', 'valuta erkin almashtirila boshlandi', 'yangi Konstitutsiya qabul qilindi', 'rubl qaytarildi'], answerIndex: 1 } }
    },
    {
      id: 't6q6',
      prompt: 'Erkin iqtisodiy zonalarda korxonalar necha yilgacha soliq va bojdan ozod qilinadi?',
      hint: '3 yildan boshlab.',
      explanation: 'Sarmoya miqdoriga qarab 3 yildan 7 yilgacha.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1 yilgacha', '7 yilgacha', '20 yilgacha', 'umrbod'], answerIndex: 1 } }
    },
    {
      id: 't6q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Konvertatsiya.',
      explanation: 'Valuta erkin almashtirilishi soʻmni konvertatsiya qilish yoʻlidagi muhim qadam boʻldi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: '2017-yildan ' }, { blank: 'valuta' }, { text: ' erkin almashtirila boshlandi — bu soʻmning ' }, { blank: 'konvertatsiyasi' }, { text: ' yoʻlidagi muhim qadam.' }],
          bank: ['valuta', 'konvertatsiyasi', 'paxta', 'xususiylashtirilishi']
        }
      }
    },
    {
      id: 't6q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '1996 — paxta inqirozi.',
      explanation: '1996-yilgi jahon paxta inqirozi eksport daromadini kamaytirdi; 2018-yilga kelib 14 ta erkin zona ishlagan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1996-yilgi paxta inqirozi eksport daromadlarini kamaytirgan.', value: true },
            { text: '2018-yilga kelib mamlakatda 14 ta erkin iqtisodiy zona ishlagan.', value: true },
            { text: 'Erkin iqtisodiy zonalar soliqlarni oshirish uchun tuzilgan.', value: false },
            { text: 'Kichik biznes faqat 2016-yildan rivojlana boshlagan.', value: false }
          ]
        }
      }
    }
  ]
};
