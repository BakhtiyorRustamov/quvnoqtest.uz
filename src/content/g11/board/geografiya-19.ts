import type { BoardLesson } from './types';
import { GEO5 } from './geografiya-17';

/** Darslik: Geografiya 10, 19-§ (79–82-betlar) — migratsiya turlari (tashqi va ichki, doimiy va vaqtincha), sabablari, asosiy xalqaro oqimlar, immigratsiya markazlari va muammolar. */
export const GEO_19: BoardLesson = {
  n: 19,
  label: '19',
  group: GEO5,
  title: 'Xalqaro migratsiya jarayonlari va muammolari',
  section: '19-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Migratsiya — aholining bir hududdan boshqasiga doimiy yoki vaqtincha koʻchishi; bitta shahar ichidagi koʻchish migratsiya hisoblanmaydi. Hududiga koʻra tashqi — boshqa davlatga va ichki — davlat ichida migratsiya boʻladi. Muddatiga koʻra doimiy va vaqtincha; vaqtinchasi mavsumiy — qishloq xoʻjalik ishlari uchun, vaxtali — uzoq konlarda ishlash uchun va mayatniksimon — har kuni yoki har hafta shaharga ishga, oʻqishga qatnash. Migratsiya sabablari iqtisodiy, oilaviy, etnik, diniy, siyosiy va ekologik boʻladi; eng koʻpi — iqtisodiy, yaʼni yaxshiroq ish va yashash sharoitini izlash.",
      easy: "Migratsiya — aholining koʻchishi: tashqi va ichki; doimiy va vaqtincha (mavsumiy, vaxtali, mayatniksimon).",
      draw: [
        { t: 'title', text: 'Migratsiya turlari' },
        { t: 'table', x: 4, y: 18, rows: [['mezon', 'turlari'], ['hududi', 'tashqi, ichki'], ['muddati', 'doimiy, vaqtincha'], ['vaqtinchasi', 'mavsumiy, vaxtali, mayatniksimon'], ['sababi', 'iqtisodiy, oilaviy, ekologik...']] }
      ],
      next: 'Oqimlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hozir eng katta migratsiya oqimi rivojlanayotgan mamlakatlardan rivojlangan mamlakatlarga yoʻnalgan. Eng koʻp immigrantni AQSH qabul qiladi — 45 milliondan ortiq. Yevropada Germaniya, Buyuk Britaniya va Fransiyada 7–10 milliondan immigrant yashaydi. Kanada, Avstraliya va Yangi Zelandiya ham koʻp migrant qabul qiladi. Fors qoʻltigʻidagi arab davlatlari, Janubiy Koreya, Singapur, Malayziya Hindiston, Pokiston, Bangladesh kabi mamlakatlardan millionlab ishchilarni jalb qilmoqda; MDHda oqimlar asosan Rossiyaga yoʻnalgan. Muammolar: majburiy migratsiya — urush hududlaridan qochish kuchaymoqda, mahalliy aholi bilan kelishmovchiliklar boʻladi, yuqori malakali mutaxassislarning ketishi esa ular chiqib ketgan mamlakatlar uchun zarar.",
      easy: "Asosiy oqim — rivojlangan davlatlarga: AQSH (45 mln+), Germaniya, Britaniya, Fransiya; Fors qoʻltigʻi davlatlari; MDHda — Rossiya.",
      draw: [
        { t: 'title', text: 'Immigrantlar soni, mln' },
        { t: 'bars', x: 6, y: 18, w: 60, h: 34, items: [{ label: 'AQSH', value: 45 }, { label: 'Germaniya', value: 10 }, { label: 'Britaniya', value: 9 }, { label: 'Fransiya', value: 8 }] },
        { t: 'text', x: 70, y: 28, text: 'Yevropa:', size: 's' },
        { t: 'text', x: 70, y: 36, text: '7–10 mln dan', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Migratsiya — aholining bir hududdan boshqasiga koʻchishi; u tashqi va ichki, doimiy va vaqtincha (mavsumiy, vaxtali, mayatniksimon) boʻladi; asosiy sabab — iqtisodiy.',
    'Asosiy oqim rivojlanayotgan mamlakatlardan rivojlangan mamlakatlarga yoʻnalgan: eng koʻp immigrantni AQSH qabul qiladi, Yevropada Germaniya, Britaniya va Fransiya yetakchi.',
    'Muammolar: majburiy migratsiyaning kuchayishi, mahalliy aholi bilan kelishmovchiliklar va malakali mutaxassislarning ketishi.'
  ],
  questions: [
    {
      id: 'g19q1',
      prompt: 'Migratsiya turini misol bilan juftlang.',
      hint: 'Mayatniksimon — har kuni.',
      explanation: 'Mavsumiy — qishloq xoʻjalik ishlariga borish; vaxtali — uzoq konda smenalab ishlash; mayatniksimon — har kuni shaharga ishga qatnash.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'mavsumiy', right: 'qishloq xoʻjalik ishlariga borish' },
            { left: 'vaxtali', right: 'uzoq konda smenalab ishlash' },
            { left: 'mayatniksimon', right: 'har kuni shaharga ishga qatnash' }
          ]
        }
      }
    },
    {
      id: 'g19q2',
      prompt: 'Eng koʻp immigrantni qaysi davlat qabul qiladi?',
      hint: '45 mln dan ortiq.',
      explanation: 'AQSH.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['AQSH', 'Xitoy', 'Braziliya', 'Hindiston'], answerIndex: 0 } }
    },
    {
      id: 'g19q3',
      prompt: 'Holatni migratsiya turiga ajrating.',
      hint: 'Tashqi — boshqa davlatga.',
      explanation: 'Tashqi — boshqa davlatga ishga ketish, xorijda oʻqishga koʻchish; ichki — viloyatdan poytaxtga koʻchish, qishloqdan tuman markaziga koʻchish.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 't', label: 'tashqi migratsiya' }, { id: 'i', label: 'ichki migratsiya' }],
          items: [
            { emoji: '✈️', label: 'boshqa davlatga ishga ketish', bin: 't' },
            { emoji: '🎓', label: 'xorijga oʻqishga koʻchish', bin: 't' },
            { emoji: '🏙️', label: 'viloyatdan poytaxtga koʻchish', bin: 'i' },
            { emoji: '🏡', label: 'qishloqdan tuman markaziga koʻchish', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'g19q4',
      prompt: 'Migratsiya sabablarini tanlang.',
      hint: 'Ish, oila, tabiat...',
      explanation: 'Iqtisodiy, oilaviy, siyosiy, ekologik va boshqa sabablar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'iqtisodiy', correct: true },
            { label: 'oilaviy', correct: true },
            { label: 'ekologik', correct: true },
            { label: 'siyosiy', correct: true }
          ]
        }
      }
    },
    {
      id: 'g19q5',
      prompt: 'AQSHdagi immigrantlar soni necha milliondan oshgan?',
      hint: 'Qirqdan koʻp.',
      explanation: '45 mln.',
      widget: { type: 'number_answer', props: { answer: 45, unit: 'mln' } }
    },
    {
      id: 'g19q6',
      prompt: 'MDH hududidagi yirik migratsiya oqimlari asosan qaysi davlatga yoʻnalgan?',
      hint: 'Eng katta MDH davlati.',
      explanation: 'Rossiyaga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Rossiya', 'Moldova', 'Armaniston', 'Tojikiston'], answerIndex: 0 } }
    },
    {
      id: 'g19q7',
      prompt: 'Malakali mutaxassislarning boshqa davlatga ketishi kim uchun salbiy?',
      hint: 'Ular chiqib ketgan joy.',
      explanation: 'Ular chiqib ketgan (emigratsiya oʻchogʻi) mamlakatlar uchun.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ular chiqib ketgan mamlakat uchun', 'ular borgan rivojlangan davlat uchun', 'hech kim uchun', 'faqat sayyohlar uchun'], answerIndex: 0 } }
    },
    {
      id: 'g19q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Bitta shahar ichida — migratsiya emas.',
      explanation: 'Bitta manzilgoh ichidagi koʻchish migratsiya hisoblanmaydi; rivojlangan davlatlarda migratsiya saldosi musbat.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bitta shahar ichida koʻchish migratsiya hisoblanmaydi.', value: true },
            { text: 'Rivojlangan davlatlarda migratsiya saldosi musbat.', value: true },
            { text: 'Migratsiyaning asosiy sababi — sport musobaqalari.', value: false },
            { text: 'Fors qoʻltigʻi davlatlari migrant ishchilarni deyarli qabul qilmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
