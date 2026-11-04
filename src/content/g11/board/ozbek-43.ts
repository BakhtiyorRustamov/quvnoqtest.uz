import type { BoardLesson } from './types';

export const OZG7 = { kicker: 'Adabiyot · II', title: 'Qadimgi turkiy adabiyot' };

/** Darslik: Adabiyot 11, I qism (2018), 52–60-betlar — Mahmud Koshgʻariy hayoti, «Devonu lugʻot at-turk» va undagi adabiy parchalar. */
export const OZ_43: BoardLesson = {
  n: 43,
  label: '43',
  group: OZG7,
  title: 'Mahmud Koshgʻariy. «Devonu lugʻot at-turk»',
  section: 'Adabiyot, 1-qism: Mahmud Koshgʻariy; «Devonu lugʻot at-turk» asari haqida',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Mahmud Koshgʻariy XI asrda, Qoraxoniylar davrida yashagan qomusiy olim. U turkiy til grammatikasini ishlab chiqqan va turkcha-arabcha lugʻatning ilk namunasini yaratgan. «Devonu lugʻot at-turk» 1072-yilda yozila boshlab, 1074-yilda tugatilgan; unda turkiy soʻzlar arab tilida izohlanib, misol sifatida xalq sheʼrlari, maqollar keltirilgan. Asardagi parchalar asosan toʻrtliklar — muallif ularni «qoʻshugʻ» deb ataydi, koʻpi a-a-a-b qofiyali va barmoq vaznida. «Qish va Bahor» — munozara janrining eng qadimgi namunasi.",
      easy: "Koshgʻariy — XI asr olimi. «Devonu lugʻot at-turk» — turkiy soʻzlar lugʻati, unda qadimgi sheʼr va maqollar bor.",
      draw: [
        { t: 'title', text: '«Devonu lugʻot at-turk»' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'maʼlumot'], ['muallif', 'Mahmud Koshgʻariy (XI asr)'], ['yozilgan', '1072–1074 yillar'], ['mazmuni', 'turkiy soʻzlar arabcha izohi'], ['sheʼrlar', 'toʻrtliklar, a-a-a-b, barmoq'], ['eng qadimgi munozara', '«Qish va Bahor»']] },
        { t: 'text', x: 4, y: 58, text: 'Yigitlarig ishlatu, yigʻach yemish irgʻatu,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 64, text: 'Qulan, keyik avlatu, bazram qilip avnalim.', size: 's', color: 'purple' }
      ],
      next: 'Tayyorman!'
    }
  ],
  summary: [
    'Mahmud Koshgʻariy — XI asr qomusiy olimi, turkiy grammatika va turkcha-arabcha lugʻatning ilk muallifi.',
    '«Devonu lugʻot at-turk» (1072–1074) — turkiy soʻzlar izohi; unda qadimgi xalq sheʼrlari, maqollar, rivoyatlar saqlangan.',
    'Asardagi sheʼrlar asosan toʻrtliklar (qoʻshugʻ), barmoq vaznida; «Qish va Bahor» — munozara janrining eng qadimgi namunasi.'
  ],
  questions: [
    {
      id: 'oz43q1',
      prompt: '«Devonu lugʻot at-turk» qaysi yillarda yozilgan?',
      hint: 'XI asr, 70-yillar.',
      explanation: '1072-yilda boshlanib, 1074-yilda tugatilgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1072–1074', '1469–1470', '992–995', '1206–1210'], answerIndex: 0 } }
    },
    {
      id: 'oz43q2',
      prompt: 'Mahmud Koshgʻariy qaysi davlat davrida yashagan?',
      hint: 'XI asr turkiy davlat.',
      explanation: 'Qoraxoniylar davlati davrida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Qoraxoniylar', 'Temuriylar', 'Shayboniylar', 'Somoniylar'], answerIndex: 0 } }
    },
    {
      id: 'oz43q3',
      prompt: 'Nega Mahmud Koshgʻariy «qomusiy olim» deyiladi?',
      hint: 'Koʻp fanlar.',
      explanation: '«Devon»da u geograf, tarixchi, tilshunos, folklorshunos, etnograf sifatida namoyon boʻladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['koʻp fanlar boʻyicha bilimdon boʻlgani uchun', 'faqat sheʼr yozgani uchun', 'podsho boʻlgani uchun', 'faqat arab tilini bilgani uchun'], answerIndex: 0 } }
    },
    {
      id: 'oz43q4',
      prompt: '«Devon»dagi atamani izohi bilan juftlang.',
      hint: 'Qoʻshugʻ — sheʼr, qoʻshiq.',
      explanation: 'Qoʻshugʻ — sheʼr, qasida, qoʻshiq; yir (ir) — kuy, sheʼr; munozara — bahs asosidagi janr.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'qoʻshugʻ', right: 'sheʼr, qasida, qoʻshiq' },
            { left: 'yir (ir)', right: 'kuy, maqom' },
            { left: 'munozara', right: 'qahramonlar bahsiga qurilgan janr' }
          ]
        }
      }
    },
    {
      id: 'oz43q5',
      prompt: '«Qish va Bahor» munozarasida qaysi tasvir vositasi asosiy oʻrin tutadi?',
      hint: 'Fasllar «tilga kiradi».',
      explanation: 'Jonlantirish — fasllarga insonga xos xususiyatlar beriladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['jonlantirish', 'kinoya', 'mubolagʻa', 'tajnis'], answerIndex: 0 } }
    },
    {
      id: 'oz43q6',
      prompt: '«Devon»dagi toʻrtliklarning asosiy qofiya tartibi qaysi?',
      hint: 'Uch misra bir xil.',
      explanation: 'a-a-a-b.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['a-a-a-b', 'a-b-a-b', 'a-a-b-b', 'a-b-b-a'], answerIndex: 0 } }
    },
    {
      id: 'oz43q7',
      prompt: '«Devon»dagi sheʼrlarning mavzularini tanlang.',
      hint: 'Hayot manzaralari.',
      explanation: 'Vatan va yurt muhabbati, bahodirlar, tabiat, mehnat, ishq-muhabbat — barchasi bor.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'vatan va yurt muhabbati', correct: true },
            { label: 'tabiat manzaralari', correct: true },
            { label: 'mehnat va ovchilik', correct: true },
            { label: 'ishq-muhabbat', correct: true }
          ]
        }
      }
    },
    {
      id: 'oz43q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Barmoq vazni.',
      explanation: '«Devon»dagi sheʼrlar asosan barmoq vaznida; ularning koʻpi xalq ogʻzaki ijodi mahsuli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Devon»dagi sheʼrlar asosan barmoq vaznida.', value: true },
            { text: '«Devon»dagi sheʼriy parchalarning asosiy qismi xalq ogʻzaki ijodi mahsuli.', value: true },
            { text: 'Koshgʻariy «Devon»ni faqat arab soʻzlari uchun yozgan.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz43q9',
      prompt: 'Asl matndagi toʻrtlikda nima tasvirlangan?',
      hint: 'Qulon, kiyik.',
      explanation: 'Yigitlar daraxt mevasini qoqadi, qulon va kiyik ovlanib bayram qilinadi — ov va bayram manzarasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ov va bayram manzarasi', 'qishki boʻron', 'jang maydoni', 'savdo karvoni'], answerIndex: 0 } }
    }
  ]
};
