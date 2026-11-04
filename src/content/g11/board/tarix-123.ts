import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 23-mavzu (104–108-betlar) — Suriya va Iroq: H. va B. Asad, «Arab bahori» va fuqarolar urushi, ISHID; Saddam Husayn, «Sahrodagi boʻron», 2003-yilgi urush va undan keyingi beqarorlik. */
export const TARIX_123: BoardLesson = {
  n: 123,
  label: '23',
  group: JH2,
  title: 'Suriya va Iroq',
  section: 'Jahon tarixi, 23-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Suriyani 1970-yildan 2000-yilgacha Hafiz Asad boshqardi; neft va gaz konlari ishga tushirildi, ammo 1990-yillarda iqtisodda turgʻunlik boshlandi. 2000-yilda hokimiyatga uning oʻgʻli Bashar Asad keldi: u qoʻshinlarni Livandan olib chiqdi, savdo va moliyani erkinlashtirishga urindi, lekin qishloqlarda ishsizlik oshdi. 2011-yilda «Arab bahori» toʻlqini Suriyaga yetib keldi: hukumatga qarshi chiqishlar fuqarolar urushiga aylandi. Unda hukumat armiyasi, muxolifat guruhlari, kurd otryadlari va ISHID kabi terrorchi tashkilotlar qatnashdi; 2014-yildan AQSH boshchiligidagi koalitsiya, 2015-yildan Rossiya ham harbiy amaliyot oʻtkazdi. 2017-yil sentabrgacha 4 milliondan ortiq kishi mamlakatni tark etdi.",
      easy: "Suriya: H. Asad (1970–2000) → B. Asad; 2011 — «Arab bahori» va fuqarolar urushi; 4 mln dan ortiq qochoq.",
      draw: [
        { t: 'title', text: 'Suriya' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'H. Asad, 1970', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'B. Asad, 2000', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: '2011: urush', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: '2017: 4 mln dan ortiq kishi mamlakatni tark etdi', size: 's', color: 'red' }
      ],
      next: 'Iroq'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Iroqda 1979-yildan Saddam Husayn prezident edi. 1980-yilda Iroq Eronga qarshi uzoq urush boshladi, 1990-yilda Quvaytni bosib oldi. BMT talabi bajarilmagach, 1991-yil yanvarda AQSH boshchiligidagi xalqaro kuchlar «Sahrodagi boʻron» amaliyoti bilan Quvaytni ozod qildi. Keyin Husayn BMT inspektorlarini mamlakatdan chiqarib yubordi. 2003-yilda AQSH va Buyuk Britaniya qoʻshinlari Bagʻdodga kirdi, Husayn hukumati quladi, uning oʻzi qoʻlga olindi va keyinroq qatl etildi. Ammo tinchlik oʻrnatilmadi: terrorchilik avj oldi. 2005-yilgi konstitutsiya Iroqni federativ respublika deb eʼlon qildi. 2014-yilda ISHID Iroq va Suriya hududlarida «xalifalik» eʼlon qildi.",
      easy: "Iroq: 1990 — Quvayt bosib olindi; 1991 — «Sahrodagi boʻron»; 2003 — Husayn hukumati quladi; keyin beqarorlik va ISHID.",
      draw: [
        { t: 'title', text: 'Iroq' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1980', 'Eron–Iroq urushi'], ['1990', 'Quvayt bosib olindi'], ['1991-yil yanvar', '«Sahrodagi boʻron»'], ['2003', 'Husayn hukumati quladi'], ['2005', 'yangi konstitutsiya']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Suriyada 2000-yildan B. Asad hokimiyatda; 2011-yilda «Arab bahori»dan keyin boshlangan fuqarolar urushi koʻplab xalqaro kuchlarni jalb qildi, millionlab odamlar qochoq boʻldi.',
    'Iroq 1990-yilda Quvaytni bosib oldi; 1991-yilda «Sahrodagi boʻron» amaliyoti bilan Quvayt ozod qilindi.',
    '2003-yilda S. Husayn hukumati agʻdarildi, ammo Iroqda tinchlik oʻrnatilmadi; terrorchilik kuchaydi va 2014-yilda ISHID paydo boʻldi.'
  ],
  questions: [
    {
      id: 'j23q1',
      prompt: 'Iroq tarixidagi voqealarni tartiblang.',
      hint: 'Eron bilan urush — birinchi.',
      explanation: 'Eron–Iroq urushi (1980) → Quvayt bosib olindi (1990) → «Sahrodagi boʻron» (1991) → Husayn hukumati quladi (2003).',
      widget: { type: 'order_line', props: { items: [{ label: 'Eron–Iroq urushi boshlandi' }, { label: 'Quvayt bosib olindi' }, { label: '«Sahrodagi boʻron»' }, { label: 'Husayn hukumati quladi' }] } }
    },
    {
      id: 'j23q2',
      prompt: 'Quvaytni ozod qilish boʻyicha 1991-yilgi amaliyot qanday nomlangan?',
      hint: 'Choʻl va shamol.',
      explanation: '«Sahrodagi boʻron».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Sahrodagi boʻron»', '«Arab bahori»', '«Halol qoʻllar»', '«Juma inqilobi»'], answerIndex: 0 } }
    },
    {
      id: 'j23q3',
      prompt: 'Suriyada fuqarolar urushi qaysi yilda boshlangan?',
      hint: '«Arab bahori».',
      explanation: '2011-yilda.',
      widget: { type: 'number_answer', props: { answer: 2011, unit: 'yil' } }
    },
    {
      id: 'j23q4',
      prompt: 'Faktni davlatga ajrating.',
      hint: 'Asadlar — Suriya.',
      explanation: 'Suriya — H. Asad, B. Asad, «Arab bahori»; Iroq — Saddam Husayn, Quvayt, 2005-yilgi federativ konstitutsiya.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 's', label: 'Suriya' }, { id: 'i', label: 'Iroq' }],
          items: [
            { emoji: '👤', label: 'Bashar Asad', bin: 's' },
            { emoji: '🌸', label: '«Arab bahori» (2011)', bin: 's' },
            { emoji: '🪖', label: 'qoʻshinlar Livandan chiqarildi', bin: 's' },
            { emoji: '👤', label: 'Saddam Husayn', bin: 'i' },
            { emoji: '🛢️', label: 'Quvaytni bosib olish', bin: 'i' },
            { emoji: '📜', label: '2005: federativ respublika', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'j23q5',
      prompt: 'Suriya mojarosida qatnashgan yoki manfaati bor kuchlarni tanlang.',
      hint: 'Ichki va tashqi.',
      explanation: 'Hukumat armiyasi, muxolifat, kurd otryadlari, terrorchi guruhlar, AQSH, Rossiya, Turkiya, Eron va boshqalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'hukumat armiyasi', correct: true },
            { label: 'kurd otryadlari', correct: true },
            { label: 'AQSH boshchiligidagi koalitsiya', correct: true },
            { label: 'Rossiya', correct: true },
            { label: 'Yaponiya armiyasi' }
          ]
        }
      }
    },
    {
      id: 'j23q6',
      prompt: '2017-yil sentabrgacha Suriyani taxminan necha million kishi tark etgan?',
      hint: 'Uchdan koʻp.',
      explanation: '4 milliondan ortiq.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'mln' } }
    },
    {
      id: 'j23q7',
      prompt: 'Sanani voqea bilan juftlang.',
      hint: '2014 — ISHID.',
      explanation: '2000 — B. Asad hokimiyatga keldi; 2003 — Husayn hukumati quladi; 2014 — ISHID «xalifalik» eʼlon qildi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '2000', right: 'B. Asad hokimiyatda' },
            { left: '2003', right: 'Husayn hukumati quladi' },
            { left: '2014', right: 'ISHID «xalifalik» eʼlon qildi' }
          ]
        }
      }
    },
    {
      id: 'j23q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Husayn agʻdarilgach.',
      explanation: 'Husayn agʻdarilgach Iroqda tinchlik oʻrnatilmagan; 2005-yilgi konstitutsiya Iroqni federativ respublika deb eʼlon qilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '2005-yilgi konstitutsiya Iroqni federativ respublika deb eʼlon qilgan.', value: true },
            { text: '2003-yildan keyin Iroqda terrorchilik kuchaygan.', value: true },
            { text: 'S. Husayn agʻdarilgach Iroqda darhol barqaror tinchlik oʻrnatildi.', value: false },
            { text: 'Iroq 1990-yilda Eronni bosib olgan.', value: false }
          ]
        }
      }
    }
  ]
};
