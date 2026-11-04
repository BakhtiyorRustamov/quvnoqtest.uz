import type { BoardLesson } from './types';
import { BOB3 } from './biologiya-24';

/** Darslik: Biologiya 11, 27-§ (142–146-betlar) — tirik moddaning xususiyatlari va funksiyalari: energetik, konsentratsiyalash, destruktiv, muhit yaratish, gaz almashinish, oksidlanish-qaytarilish, transport. */
export const BIO_27: BoardLesson = {
  n: 27,
  label: '27',
  group: BOB3,
  title: 'Tirik moddaning xususiyatlari va funksiyalari',
  section: '27-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Daryo, muzlik, qor koʻchkisi — barcha jonsiz narsalar tepadan pastga harakatlanadi. Losos baliqlari esa daryo boʻylab oqimga qarshi yuqoriga suzadi, qushlar tortishish kuchini yengib uchadi. Faqat tirik modda moddalarni pastdan yuqoriga va okeandan quruqlikka olib chiqa oladi.",
      easy: "Tirik modda moddalarni tortishishga qarshi tashiydi.",
      draw: [
        { t: 'title', text: 'Oqimga qarshi' },
        { t: 'icon', x: 16, y: 34, emoji: '🐟', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🦅', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['jonsiz — tepadan pastga', 'tirik — pastdan yuqoriga', 'faol va passiv harakat'] }
      ],
      next: 'Xususiyatlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tirik moddaning xususiyatlari: harakat, oʻsish va koʻpayish orqali tez tarqalib, barcha boʻshliqlarni egallaydi; kimyoviy reaksiyalari fermentlar tufayli tez va tartibli; evolutsion yuksaladi va muhitga moslashadi; kimyoviy bogʻlarida quyosh energiyasini toʻplaydi; xilma-xil va avlodlar almashib yangilanadi; individ — populatsiya — biotsenoz tarzida tuzilgan.",
      easy: "Tarqaladi, tez reaksiyalar, moslashadi, energiya toʻplaydi, yangilanadi.",
      draw: [
        { t: 'title', text: 'Tirik modda xususiyatlari' },
        { t: 'list', x: 4, y: 20, items: ['tez tarqaladi', 'fermentli tez reaksiyalar', 'evolutsiya va moslanish', 'quyosh energiyasini toʻplaydi', 'avlodlar almashib yangilanadi'] }
      ],
      next: 'Funksiyalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tirik moddaning funksiyalari. Energetik — quyosh energiyasini organik modda bogʻlariga aylantirish va oziq zanjiri boʻylab uzatish; uning bir qismi torf, neft, koʻmir boʻlib toʻplanadi. Konsentratsiyalash — ayrim elementlarni toʻplash: hayvon skeletlaridan ohaktosh, diatom suvoʻtlarda kremniy, qoʻngʻir suvoʻtlarda yod, umurtqalilar skeletida fosfor.",
      easy: "Energetik — quyosh energiyasi; konsentratsiyalash — kalsiy, kremniy, yod, fosfor toʻplash.",
      draw: [
        { t: 'title', text: 'Energetik va konsentratsiyalash' },
        { t: 'table', x: 4, y: 20, rows: [['kim', 'nima toʻplaydi'], ['mollyuska, marjon', 'kalsiy — ohaktosh'], ['diatom suvoʻt', 'kremniy'], ['qoʻngʻir suvoʻt', 'yod'], ['umurtqalilar', 'fosfor']] }
      ],
      next: 'Yana funksiyalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Destruktiv — oʻlik organizmlarni parchalab minerallashtirish va togʻ jinslarini yemirish: bakteriyalar, zamburugʻlar, lishayniklar. Muhit yaratish — atmosfera va okean tarkibini oʻzgartirish, choʻkindi jinslar va tuproq hosil qilish. Gaz almashinish — fotosintezda kislorod, nafasda karbonat angidrid, bakteriyalar metan chiqaradi. Oksidlanish-qaytarilish — fotosintezda CO₂ qaytariladi, nafasda uglevodlar oksidlanadi.",
      easy: "Destruktiv, muhit yaratish, gaz almashinish, oksidlanish-qaytarilish.",
      draw: [
        { t: 'title', text: 'Boshqa funksiyalar' },
        { t: 'table', x: 4, y: 20, rows: [['funksiya', 'misol'], ['destruktiv', 'lishaynik toshni yemiradi'], ['muhit yaratish', 'tuproq hosil qilish'], ['gaz almashinish', 'fotosintezda O₂'], ['oksidlanish-qaytarilish', 'temir bakteriyalari']] }
      ],
      next: 'Transport'
    },
    {
      kind: 'example',
      clear: true,
      say: "Transport funksiyasi — moddalarni tortishish kuchiga qarshi va gorizontal yoʻnalishda koʻchirish. Baliqlar dengizdan daryoga, qushlar janubdan shimolga uchib, moddalarni olib boradi. Vernadskiy buni atomlarning biogen migratsiyasi deb atagan. Shunday qilib, tirik modda biosferadagi barcha jarayonlarda qatnashadi.",
      easy: "Transport — atomlarning biogen migratsiyasi.",
      draw: [
        { t: 'title', text: 'Yetti funksiya' },
        { t: 'list', x: 4, y: 20, items: ['energetik', 'konsentratsiyalash', 'destruktiv', 'muhit yaratish', 'gaz almashinish', 'oksidlanish-qaytarilish', 'transport'] },
        { t: 'text', x: 54, y: 40, text: 'biogen migratsiya', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Tirik modda tez tarqaladi, fermentli reaksiyalari tez, evolutsiyalanadi va moslashadi, quyosh energiyasini toʻplaydi, avlodlar almashib yangilanadi.',
    'Funksiyalari: energetik, konsentratsiyalash (kalsiy, kremniy, yod, fosfor), destruktiv, muhit yaratish, gaz almashinish, oksidlanish-qaytarilish, transport.',
    'Transport funksiyasi — moddalarni tortishishga qarshi koʻchirish, atomlarning biogen migratsiyasi (Vernadskiy).'
  ],
  questions: [
    {
      id: 'b27q1',
      prompt: 'Misolni funksiya bilan juftlang.',
      hint: 'Lishaynik toshni yemiradi.',
      explanation: 'Fotosintezda O₂ ajralishi — gaz almashinish; lishaynik toshni yemirishi — destruktiv; qoʻngʻir suvoʻtda yod — konsentratsiyalash; baliqlar daryoga koʻtarilishi — transport.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'fotosintezda O₂ ajralishi', right: 'gaz almashinish' },
            { left: 'lishaynik toshni yemiradi', right: 'destruktiv' },
            { left: 'qoʻngʻir suvoʻtda yod', right: 'konsentratsiyalash' },
            { left: 'baliqlar daryoga koʻtariladi', right: 'transport' }
          ]
        }
      }
    },
    {
      id: 'b27q2',
      prompt: 'Organizmni u toʻplaydigan element bilan juftlang.',
      hint: 'Diatom — kremniy.',
      explanation: 'Diatom suvoʻt — kremniy; qoʻngʻir suvoʻt — yod; mollyuska — kalsiy; umurtqalilar skeleti — fosfor.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'diatom suvoʻt' }, b: { label: 'kremniy' } },
            { a: { label: 'qoʻngʻir suvoʻt' }, b: { label: 'yod' } },
            { a: { label: 'mollyuska chigʻanogʻi' }, b: { label: 'kalsiy' } },
            { a: { label: 'umurtqalilar skeleti' }, b: { label: 'fosfor' } }
          ]
        }
      }
    },
    {
      id: 'b27q3',
      prompt: 'Tirik moddaning nechta funksiyasi farqlanadi (darslik boʻyicha)?',
      hint: 'Energetikdan transportgacha.',
      explanation: '7 ta.',
      widget: { type: 'number_answer', props: { answer: 7 } }
    },
    {
      id: 'b27q4',
      prompt: 'Atomlarning tirik modda yordamida koʻchishini Vernadskiy qanday atagan?',
      hint: 'Bios + migratsiya.',
      explanation: 'Atomlarning biogen migratsiyasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['suksessiya', 'biogen migratsiya', 'gomeostaz', 'fotosintez'], answerIndex: 1 } }
    },
    {
      id: 'b27q5',
      prompt: 'Tirik moddaning xususiyatlarini belgilang.',
      hint: 'Tirik — oʻsadi va moslashadi.',
      explanation: 'Tez tarqaladi, moslashadi, quyosh energiyasini toʻplaydi, evolutsiyalanadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'muhitda tez tarqaladi', correct: true },
            { label: 'muhitga moslashadi', correct: true },
            { label: 'quyosh energiyasini toʻplaydi', correct: true },
            { label: 'faqat tepadan pastga harakatlanadi' }
          ]
        }
      }
    },
    {
      id: 'b27q6',
      prompt: 'Torf, neft va koʻmir toʻplanishi qaysi funksiya bilan bogʻliq?',
      hint: 'Quyosh energiyasi saqlanadi.',
      explanation: 'Energetik funksiya.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['energetik', 'transport', 'gaz almashinish', 'destruktiv'], answerIndex: 0 } }
    },
    {
      id: 'b27q7',
      prompt: 'Fotosintez va nafas qaysi funksiyaga misol boʻladi (moddalar oksidlanadi va qaytariladi)?',
      hint: 'CO₂ uglevodgacha qaytariladi.',
      explanation: 'Oksidlanish-qaytarilish funksiyasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['transport', 'oksidlanish-qaytarilish', 'konsentratsiyalash', 'destruktiv'], answerIndex: 1 } }
    },
    {
      id: 'b27q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ohaktosh konlari — skelet qoldiqlari.',
      explanation: 'Ohaktosh konlari hayvonlar skeletidan; metan bakteriyalar tomonidan hosil boʻladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ohaktosh konlari hayvonlarning ohakli skeleti qoldiqlaridan.', value: true },
            { text: 'Yer ostidagi metanni bakteriyalar hosil qiladi.', value: true },
            { text: 'Jonsiz moddalar oʻz-oʻzidan pastdan yuqoriga koʻtariladi.', value: false },
            { text: 'Tirik moddada metallardan eng koʻpi temir.', value: false }
          ]
        }
      }
    }
  ]
};
