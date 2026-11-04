import type { BoardLesson } from './types';
import { BOB3 } from './biologiya-24';

/** Darslik: Biologiya 11, 34-§ (175–182-betlar) — tabiatni muhofaza qilish: xalqaro tashkilotlar, «Qizil kitob», muhofaza etiladigan hududlar, Oʻzbekiston qoʻriqxonalari. */
export const BIO_34: BoardLesson = {
  n: 34,
  label: '34',
  group: BOB3,
  title: 'Oʻsimlik va hayvonot olamini muhofaza qilish',
  section: '34-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mavrikiy orolidagi uchmaydigan dront qushi XVIII asrda, Shimoliy Amerikadagi millionlab sayyor kaptarlar XIX asr oxirida, Yevropadagi yovvoyi qoramol — tur XVIII asr boshida butunlay qirib tashlandi. Bunday yoʻqotishlar takrorlanmasligi uchun tabiatni muhofaza qilish kerak.",
      easy: "Dront, sayyor kaptar, tur — inson qirib yuborgan turlar.",
      draw: [
        { t: 'title', text: 'Yoʻqolgan turlar' },
        { t: 'icon', x: 14, y: 40, emoji: '🦤', size: 'l' },
        { t: 'list', x: 30, y: 22, items: ['dront — XVIII asr', 'sayyor kaptar — XIX asr', 'tur (yovvoyi qoramol)', 'junli karkidon — 10 ming yil'] }
      ],
      next: 'Xalqaro hamkorlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tabiatni muhofaza qilish — hayotni saqlash, boyliklardan oqilona foydalanish va tiklash uchun xalqaro, davlat va mintaqaviy tadbirlar majmuyi; asosiy vazifasi — turlar xilma-xilligi va genofondni saqlash. 1948-yil Tabiatni muhofaza qilish Xalqaro Ittifoqi, 1961-yil WWF tuzilgan. 1992-yil Rio-de-Janeyroda 179 mamlakat biologik xilma-xillik toʻgʻrisidagi Konvensiyani imzolagan. 22-may — Xalqaro bioxilma-xillik kuni.",
      easy: "1948 — TMQXI, 1961 — WWF, 1992 — Rio konvensiyasi, 22-may — bioxilma-xillik kuni.",
      draw: [
        { t: 'title', text: 'Xalqaro hamkorlik' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1948', 'TMQ Xalqaro Ittifoqi'], ['1961', 'WWF jamgʻarmasi'], ['1966', 'xalqaro «Qizil kitob»'], ['1992', 'Rio konvensiyasi']] }
      ],
      next: 'Qizil kitob'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Birinchi xalqaro «Qizil kitob» 1966-yilda chiqdi. Oʻzbekiston «Qizil kitob»i 1979-yil taʼsis etilgan: 1983-yilgi hayvonlar qismiga 63 tur umurtqali, 1984-yilgi oʻsimliklar qismiga 163 tur kiritilgan. Turlar 4 guruhga boʻlinadi: yoʻqolish arafasidagi, yoʻqolib borayotgan, kamyob va soni qisqarib borayotgan. Areali tiklangan turlar kitobdan chiqariladi.",
      easy: "Oʻzbekiston: 63 tur hayvon (1983), 163 tur oʻsimlik (1984); 4 guruh.",
      draw: [
        { t: 'title', text: '«Qizil kitob» guruhlari' },
        { t: 'list', x: 4, y: 20, items: ['1 — yoʻqolish arafasida', '2 — yoʻqolib borayotgan', '3 — kamyob', '4 — soni qisqarayotgan'] },
        { t: 'text', x: 4, y: 58, text: 'Oʻzbekiston: 63 hayvon, 163 oʻsimlik turi', size: 's', color: 'red' }
      ],
      next: 'Muhofaza hududlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Qoʻriqxona — butun tabiat majmuyi xoʻjalik faoliyatidan umrbod chiqarilgan hudud, unda faqat ilmiy tadqiqot olib boriladi. Zakaznik — buyurtma qoʻriqxona, cheklangan foydalanishga ruxsat bor, odatda maʼlum muddatga tashkil etiladi. Milliy bogʻ — bir qismi tashrif buyuruvchilar uchun ochiq. Tabiat yodgorliklari — sharshara, koʻl, qadimiy daraxt kabi alohida obyektlar. Botanika va zoologiya bogʻlari noyob turlarni koʻpaytiradi.",
      easy: "Qoʻriqxona — faqat ilm; zakaznik — cheklangan foydalanish; milliy bogʻ — tashrif ochiq.",
      draw: [
        { t: 'title', text: 'Muhofaza hududlari' },
        { t: 'table', x: 4, y: 20, rows: [['hudud', 'foydalanish'], ['qoʻriqxona', 'faqat ilmiy tadqiqot'], ['zakaznik', 'cheklangan, muddatli'], ['milliy bogʻ', 'qismi tashrifga ochiq'], ['tabiat yodgorligi', 'alohida obyekt']] }
      ],
      next: 'Oʻzbekiston qoʻriqxonalari'
    },
    {
      kind: 'example',
      clear: true,
      say: "Oʻzbekiston qoʻriqxonalari: Hisor — 250 dan ortiq umurtqali, Tyanshan qoʻngʻir ayigʻi, qor qoploni, oq lola; Zomin — 700 ga yaqin oʻsimlik turi; Qizilqum — Buxoro bugʻusi va jayron; Surxon — 500 dan ortiq oʻsimlik, Buxoro qoʻyi; Zarafshon — toʻqay ekotizimi; Kitob — paleontologik topilmalar; Chotqol biosfera qoʻriqxonasi — endemik tur va qor barsi.",
      easy: "Hisor, Zomin, Qizilqum, Surxon, Zarafshon, Kitob, Chotqol.",
      draw: [
        { t: 'title', text: 'Oʻzbekiston qoʻriqxonalari' },
        { t: 'table', x: 4, y: 18, rows: [['qoʻriqxona', 'xususiyati'], ['Hisor', 'qor qoploni, oq lola'], ['Qizilqum', 'Buxoro bugʻusi'], ['Kitob', 'paleontologik topilmalar'], ['Chotqol', 'biosfera, qor barsi']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Tabiatni muhofaza qilishning asosiy vazifasi — turlar xilma-xilligi va genofondni saqlash; TMQXI (1948), WWF (1961), Rio konvensiyasi (1992).',
    '«Qizil kitob» (xalqaro — 1966, Oʻzbekiston — 1979) turlarni 4 guruhga boʻladi; Oʻzbekistonda 63 hayvon va 163 oʻsimlik turi kiritilgan edi.',
    'Muhofaza hududlari: qoʻriqxona (faqat ilm), zakaznik (cheklangan foydalanish), milliy bogʻ (tashrifga ochiq), tabiat yodgorliklari.'
  ],
  questions: [
    {
      id: 'b34q1',
      prompt: 'Hududni undagi tartib bilan juftlang.',
      hint: 'Qoʻriqxona — eng qatʼiy.',
      explanation: 'Qoʻriqxona — faqat ilmiy tadqiqot; zakaznik — cheklangan foydalanish; milliy bogʻ — qismi tashrifga ochiq; tabiat yodgorligi — alohida obyekt.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'qoʻriqxona', right: 'faqat ilmiy tadqiqot' },
            { left: 'zakaznik', right: 'cheklangan foydalanish' },
            { left: 'milliy bogʻ', right: 'qismi tashrifga ochiq' },
            { left: 'tabiat yodgorligi', right: 'sharshara, qadimiy daraxt' }
          ]
        }
      }
    },
    {
      id: 'b34q2',
      prompt: 'Oʻzbekiston «Qizil kitob»ining 1984-yilgi nashriga necha tur oʻsimlik kiritilgan?',
      hint: 'Hayvonlar — 63.',
      explanation: '163 tur.',
      widget: { type: 'number_answer', props: { answer: 163, unit: 'tur' } }
    },
    {
      id: 'b34q3',
      prompt: 'Voqealarni xronologik tartiblang.',
      hint: '1948 dan boshlang.',
      explanation: 'TMQXI (1948) → WWF (1961) → xalqaro «Qizil kitob» (1966) → Rio konvensiyasi (1992).',
      widget: { type: 'order_line', props: { items: [{ label: 'TMQ Xalqaro Ittifoqi' }, { label: 'WWF' }, { label: 'xalqaro «Qizil kitob»' }, { label: 'Rio konvensiyasi' }] } }
    },
    {
      id: 'b34q4',
      prompt: 'Inson tomonidan qirib yuborilgan hayvonlarni tanlang.',
      hint: 'Darslikdagi misollar.',
      explanation: 'Dront, sayyor kaptar, tur, qopchiqli boʻri.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'dront (dodo)', correct: true },
            { label: 'sayyor kaptar', correct: true },
            { label: 'tur (yovvoyi qoramol)', correct: true },
            { label: 'qopchiqli boʻri', correct: true },
            { label: 'jayron' }
          ]
        }
      }
    },
    {
      id: 'b34q5',
      prompt: 'Xalqaro bioxilma-xillik kuni qachon nishonlanadi?',
      hint: 'Bahor oxiri.',
      explanation: 'Har yili 22-may.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['22-mart', '5-iyun', '22-may', '1-oktabr'], answerIndex: 2 } }
    },
    {
      id: 'b34q6',
      prompt: 'Qoʻriqxonani xususiyati bilan juftlang.',
      hint: 'Kitob — qazilma qoldiqlar.',
      explanation: 'Kitob — paleontologik topilmalar; Qizilqum — Buxoro bugʻusi; Chotqol — biosfera qoʻriqxonasi; Zarafshon — toʻqay.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'Kitob' }, b: { label: 'paleontologik topilmalar' } },
            { a: { label: 'Qizilqum' }, b: { label: 'Buxoro bugʻusi' } },
            { a: { label: 'Chotqol' }, b: { label: 'biosfera qoʻriqxonasi' } },
            { a: { label: 'Zarafshon' }, b: { label: 'dasht-toʻqay' } }
          ]
        }
      }
    },
    {
      id: 'b34q7',
      prompt: 'Tabiatni muhofaza qilishning asosiy vazifasi nima?',
      hint: 'Genofond.',
      explanation: 'Oʻsimlik va hayvon turlarining xilma-xilligi va genofondini saqlab qolish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qazilma qazib olish', 'turlar xilma-xilligi va genofondni saqlash', 'ovchilikni rivojlantirish', 'shaharlar qurish'], answerIndex: 1 } }
    },
    {
      id: 'b34q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '«Qizil kitob» davriy nashr.',
      explanation: 'Soni tiklangan turlar «Qizil kitob»dan chiqariladi; qoʻriqxonada xoʻjalik faoliyati taqiqlangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Areali tiklangan turlar «Qizil kitob»dan chiqariladi.', value: true },
            { text: 'Zakazniklar odatda maʼlum muddatga tashkil etiladi.', value: true },
            { text: 'Qoʻriqxonada ov qilish va mol boqishga ruxsat beriladi.', value: false },
            { text: 'Milliy bogʻ butunlay odamlar uchun yopiq.', value: false }
          ]
        }
      }
    }
  ]
};
