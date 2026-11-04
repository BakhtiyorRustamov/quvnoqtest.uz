import type { BoardLesson } from './types';
import { OZG8 } from './ozbek-47';

/** Darslik: Adabiyot 11, I qism (2018), 181–183-betlar — Boborahim Mashrab: hayoti va ijodi. */
export const OZ_56: BoardLesson = {
  n: 56,
  label: '56',
  group: OZG8,
  title: 'Boborahim Mashrab',
  section: 'Adabiyot, 1-qism: Boborahim Mashrab (1640–1711) — hayot yoʻli va ijodi',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Boborahim Mashrab (1640–1711) Namanganda boʻzchi kosib oilasida tugʻilgan; otasi erta vafot etib, onasi Bibi Salima ip yigirib oilani boqqan. U Mullo Bozor Oxunddan taʼlim olgan, soʻng 7–8 yil Qashqarda Ofoq Xoja huzurida muridlik qilgan. Mashrab «otashnafas shoir» nomini olgan; xalq orasida navoiyxonlik kabi mashrabxonlik ham keng tarqalgan. U ikki tilda ijod qilgan, gʻazal va murabbaʼlari, shuningdek muxammas, mustazod, musaddas janrlarida yozgan. Mashrab oʻzbek tasavvuf adabiyotini yangi bosqichga koʻtargan: tili sodda va jonli, maqol va iboralarga boy, koʻp sheʼrlari sahli mumtane — oson koʻrinib, takrorlab boʻlmas sanʼat namunasi.",
      easy: "Mashrab — namanganlik «otashnafas shoir». Uning sodda, xalqona sheʼrlari tez yodlanib, qoʻshiq qilib aytilgan.",
      draw: [
        { t: 'title', text: 'Mashrab ijodi' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'maʼlumot'], ['yashagan yillari', '1640–1711'], ['tugʻilgan joyi', 'Namangan'], ['laqabi', '«otashnafas shoir»'], ['asosiy janrlar', 'gʻazal, murabbaʼ'], ['yoʻnalishi', 'tasavvuf, ijtimoiy ohang']] },
        { t: 'text', x: 4, y: 58, text: 'Koʻnglimni berdim bir bevafoga,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 64, text: 'Kuydi yuragim jabru jafoga.', size: 's', color: 'purple' }
      ],
      next: 'Tayyorman!'
    }
  ],
  summary: [
    'Mashrab (1640–1711) — Namanganda boʻzchi oilasida tugʻilgan, «otashnafas shoir» nomini olgan.',
    'U gʻazal va murabbaʼlari bilan mashhur; muxammas, mustazod, musaddas janrlarida ham yozgan.',
    'Mashrab oʻzbek tasavvuf adabiyotini yangi bosqichga koʻtargan; tili sodda, xalqona, sahli mumtane namunasi.'
  ],
  questions: [
    {
      id: 'oz56q1',
      prompt: 'Mashrab qayerda tugʻilgan?',
      hint: 'Fargʻona vodiysi.',
      explanation: 'Namanganda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Namangan', 'Hirot', 'Qoʻqon', 'Xorazm'], answerIndex: 0 } }
    },
    {
      id: 'oz56q2',
      prompt: 'Mashrab qanday laqab bilan shuhrat qozongan?',
      hint: 'Olov nafasli.',
      explanation: '«Otashnafas shoir».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['otashnafas shoir', 'malik ul-kalom', 'sulton ul-ulamo', 'shoh ul-mulk'], answerIndex: 0 } }
    },
    {
      id: 'oz56q3',
      prompt: 'Mashrab Ofoq Xoja huzurida necha yil muridlik qilgan (eng koʻp)?',
      hint: '7–8 yil.',
      explanation: '7–8 yil; eng koʻpi — 8.',
      widget: { type: 'number_answer', props: { answer: 8, unit: 'yil' } }
    },
    {
      id: 'oz56q4',
      prompt: 'Mashrab shuhratini ayniqsa qaysi janrlar oshirgan?',
      hint: 'Toʻrt misrali bandlar ham.',
      explanation: 'Gʻazal va murabbaʼlar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['gʻazal va murabbaʼ', 'doston va qissa', 'tuyuq va qitʼa', 'marsiya va noma'], answerIndex: 0 } }
    },
    {
      id: 'oz56q5',
      prompt: '«Sahli mumtane» nima?',
      hint: 'Oson koʻrinadi.',
      explanation: 'Oson va sodda koʻrinadigan, ammo takrorlab boʻlmaydigan sheʼriy sanʼat.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['sodda koʻrinadigan, ammo takrorlanmas sanʼat', 'murakkab arabiy iboralar', 'qofiyasiz sheʼr', 'ikki tilda yozilgan sheʼr'], answerIndex: 0 } }
    },
    {
      id: 'oz56q6',
      prompt: 'Mashrab sheʼrlari tilining xususiyatlarini belgilang.',
      hint: 'Xalqona.',
      explanation: 'Sodda va jonli, oʻzbekona soʻzlarga, maqol va iboralarga boy.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'sodda va jonli', correct: true },
            { label: 'maqol va iboralarga boy', correct: true },
            { label: 'xalqona ifodalar koʻp', correct: true },
            { label: 'faqat saroy ahliga tushunarli' }
          ]
        }
      }
    },
    {
      id: 'oz56q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Asarlar qanday yetib kelgan.',
      explanation: 'Asarlari asosan «Devoni Mashrab» kabi qissalar va bayozlar orqali yetib kelgan; ayrim misralari aruzga ham, barmoqqa ham mos.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Mashrab asarlari xalq orasida qoʻlyozma va toshbosma qissalar orqali tarqalgan.', value: true },
            { text: 'Mashrabning ayrim misralari ham aruz, ham barmoq talablariga javob beradi.', value: true },
            { text: 'Mashrab faqat saroy sheʼriyati anʼanasida ijod qilgan.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz56q8',
      prompt: 'Bu misralarning har biri necha boʻgʻindan iborat?',
      hint: '5 + 5.',
      explanation: 'Har misra 10 boʻgʻin (5+5) — barmoqqa ham, aruzga ham mos.',
      widget: { type: 'number_answer', props: { answer: 10, unit: 'boʻgʻin' } }
    }
  ]
};
