import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 16-mavzu (72–76-betlar) — Xitoy Xalq Respublikasi: Den Syaopin islohotlari, maxsus iqtisodiy zonalar, JST, «Xitoy orzusi», ijtimoiy-ekologik muammolar, tashqi siyosat. */
export const TARIX_116: BoardLesson = {
  n: 116,
  label: '16',
  group: JH2,
  title: '1991–2017-yillarda Xitoy Xalq Respublikasi',
  section: 'Jahon tarixi, 16-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "SSSR tarqalgach, Xitoy eng yirik sotsialistik davlat boʻlib qoldi; hokimiyat Xitoy Kommunistik partiyasi qoʻlida. 1989-yilda Tyananmen maydonidagi namoyish bostirilgach, Gʻarb sanksiyalar eʼlon qildi, ammo islohotlar davom ettirildi. «Islohotlar otasi» Den Syaopin 1992-yilda janubiy viloyatlarga safari chogʻida islohotlarni toʻxtatib boʻlmasligini taʼkidladi. Jamoa xoʻjaliklari tugatildi, dehqonlar hosilni erkin bozorda sota boshladi, qirgʻoqboʻyi hududlarida chet el investorlari uchun maxsus iqtisodiy zonalar ochildi. Natijada XX asrning soʻnggi 20 yilida Xitoy YIMi olti martadan koʻproq oshdi, 2001-yilda Xitoy Jahon savdo tashkilotiga kirdi va «dunyoning eng yirik fabrikasi»ga aylandi.",
      easy: "Den Syaopin islohotlari, maxsus iqtisodiy zonalar → YIM 6 martadan koʻp oʻsdi; 2001 — JST.",
      draw: [
        { t: 'title', text: 'Xitoy islohotlari' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'erkin bozor', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'iqtisodiy zonalar', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: '2001: JST', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'XX asr oxirgi 20 yili: YIM × 6 dan koʻp', size: 's', color: 'blue' }
      ],
      next: '«Xitoy orzusi»'
    },
    {
      kind: 'explain',
      clear: true,
      say: "2012-yildan Xitoyni Si Szinpin boshqarmoqda. «Xitoy orzusi» gʻoyasi ikki bosqichni koʻzda tutadi: partiyaning 100 yilligiga — 2021-yilga «oʻrtacha farovonlik», respublikaning 100 yilligiga — 2049-yilga rivojlangan davlatlar qatoriga chiqish. Tez oʻsish muammolarni ham keltirdi: boy va kambagʻal, shahar va qishloq, sharq va gʻarb orasidagi farq oshdi, «bitta oila — bitta farzand» siyosati tufayli aholi tez qarimoqda, shaharlarda havo, qishloqlarda suv ifloslangan. Tashqi siyosatda Xitoy BMT Xavfsizlik Kengashining doimiy aʼzosi; AQSH — asosiy savdo hamkori, ammo Osiyo-Tinch okean mintaqasida ular oʻrtasida raqobat bor.",
      easy: "«Xitoy orzusi»: 2021 — oʻrtacha farovonlik, 2049 — rivojlangan davlat. Muammolar: tafovut, qarish, ekologiya.",
      draw: [
        { t: 'title', text: '«Xitoy orzusi»' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: '2012: Si Szinpin', color: 'red' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: '2021: farovonlik', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: '2049: rivojlangan', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'Muammolar: tafovut, qarish, ekologiya', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Den Syaopin boshlagan islohotlar — erkin bozor, maxsus iqtisodiy zonalar, chet el sarmoyasi — Xitoy YIMini XX asr oxirgi 20 yilida olti martadan koʻproq oshirdi.',
    '2001-yilda Xitoy JSTga kirib «dunyo fabrikasi»ga aylandi; 2012-yildan Si Szinpin «Xitoy orzusi» gʻoyasini ilgari surmoqda (2021 va 2049-yillar maqsadlari).',
    'Muammolar: daromadlar tafovuti, aholining qarishi, ekologiya; tashqi siyosatda Xitoy BMT XKning doimiy aʼzosi, AQSH bilan ham hamkor, ham raqib.'
  ],
  questions: [
    {
      id: 'j16q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Janubga safar — 1992.',
      explanation: 'Den Syaopinning janubga safari (1992) → Den Syaopin vafoti (1997) → JSTga aʼzolik (2001) → Si Szinpin rahbar (2012).',
      widget: { type: 'order_line', props: { items: [{ label: 'Den Syaopinning janubga safari' }, { label: 'Den Syaopin vafot etdi' }, { label: 'Xitoy JSTga kirdi' }, { label: 'Si Szinpin rahbar boʻldi' }] } }
    },
    {
      id: 'j16q2',
      prompt: 'Xitoyda kim «islohotlar otasi» deb ataladi?',
      hint: '1997-yilda vafot etgan.',
      explanation: 'Den Syaopin.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Mao Szedun', 'Den Syaopin', 'Si Szinpin', 'Xu Szintao'], answerIndex: 1 } }
    },
    {
      id: 'j16q3',
      prompt: 'Xitoy Jahon savdo tashkilotiga qaysi yilda aʼzo boʻlgan?',
      hint: 'XXI asrning birinchi yili.',
      explanation: '2001-yilda.',
      widget: { type: 'number_answer', props: { answer: 2001, unit: 'yil' } }
    },
    {
      id: 'j16q4',
      prompt: '«Xitoy orzusi» bosqichlarini maqsadlari bilan juftlang.',
      hint: '2049 — respublika 100 yilligi.',
      explanation: '2021 — «oʻrtacha farovonlik»; 2049 — rivojlangan davlatlar qatoriga chiqish.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '2021-yil', right: '«oʻrtacha farovonlik»' },
            { left: '2049-yil', right: 'rivojlangan davlatlar qatori' }
          ]
        }
      }
    },
    {
      id: 'j16q5',
      prompt: 'Den Syaopin islohotlariga kiradigan choralarni tanlang.',
      hint: 'Bozor va sarmoya.',
      explanation: 'Jamoa xoʻjaliklarini tugatish, hosilni erkin bozorda sotish, maxsus iqtisodiy zonalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'jamoa xoʻjaliklarini tugatish', correct: true },
            { label: 'hosilni erkin bozorda sotish', correct: true },
            { label: 'maxsus iqtisodiy zonalar', correct: true },
            { label: 'chet el sarmoyasini taqiqlash' }
          ]
        }
      }
    },
    {
      id: 'j16q6',
      prompt: 'XXI asr boshidagi Xitoy muammolarini tanlang.',
      hint: 'Ijtimoiy va ekologik.',
      explanation: 'Daromadlar tafovuti, aholining qarishi, havo va suvning ifloslanishi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'boy va kambagʻal tafovuti', correct: true },
            { label: 'aholining tez qarishi', correct: true },
            { label: 'havo va suvning ifloslanishi', correct: true },
            { label: 'sanoatning yoʻqligi' }
          ]
        }
      }
    },
    {
      id: 'j16q7',
      prompt: 'XX asrning soʻnggi 20 yilida Xitoy YIMi necha martadan koʻproq oshgan?',
      hint: 'Beshdan koʻp.',
      explanation: 'Olti martadan koʻproq.',
      widget: { type: 'number_answer', props: { answer: 6, unit: 'marta' } }
    },
    {
      id: 'j16q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'BMT XK doimiy aʼzosi.',
      explanation: 'Xitoy BMT Xavfsizlik Kengashining doimiy aʼzosi; AQSH Xitoyning asosiy savdo hamkori.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Xitoy BMT Xavfsizlik Kengashining doimiy aʼzosi.', value: true },
            { text: 'AQSH Xitoyning asosiy savdo hamkorlaridan biri.', value: true },
            { text: '«Bitta oila — bitta farzand» siyosati aholini yoshartirgan.', value: false },
            { text: 'SSSR tarqalgach Xitoyda ham kommunistik partiya hokimiyatdan ketgan.', value: false }
          ]
        }
      }
    }
  ]
};
