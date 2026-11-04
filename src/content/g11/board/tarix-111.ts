import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 11-mavzu (52–55-betlar) — Germaniya: birlashish, G. Shryoder islohotlari, «Merkel davri», qochoqlar muammosi. */
export const TARIX_111: BoardLesson = {
  n: 111,
  label: '11',
  group: JH2,
  title: '1991–2017-yillarda Germaniya Federativ Respublikasi',
  section: 'Jahon tarixi, 11-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1990-yil 3-oktabrda yagona Germaniya davlati tashkil topgani eʼlon qilindi. Endi sobiq GDRning iqtisodiy qoloqligini bartaraf etish kerak edi, bozor mexanizmlarini joriy etishni asosan GFR moliyalashtirdi. 1990-yillarda Germaniya dunyoning yetakchi iqtisodiyotlaridan biri boʻlib qoldi, kuchli ijtimoiy siyosat yuritildi, lekin ishsizlik juda oshdi. 1998-yilgi saylovda sotsial-demokratlar gʻolib chiqdi va Gerxard Shryoder hukumati islohotlarni boshladi: kichik va oʻrta biznesni qoʻllab-quvvatlash, ishsizlikni kamaytirish, pensiya, tibbiyot va ijtimoiy sugʻurta tizimini isloh qilish.",
      easy: "1990-yil 3-oktabr — Germaniya birlashdi; 1998 — G. Shryoder islohotlari.",
      draw: [
        { t: 'title', text: 'Birlashgan Germaniya' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: '1990: birlashish', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'Shryoder, 1998', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'Merkel, 2005', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'Muammo: sharqiy yerlarning qoloqligi, ishsizlik', size: 's' }
      ],
      next: '«Merkel davri»'
    },
    {
      kind: 'explain',
      clear: true,
      say: "XXI asr boshida Germaniya Yevropaning eng kuchli iqtisodiyotiga ega boʻlib, YIM boʻyicha AQSH va Yaponiyadan keyin dunyoda uchinchi oʻrinni egalladi. 2005-yil noyabrda Angela Merkel federal kansler boʻldi — Germaniya tarixidagi birinchi ayol kansler. «Merkel davri»da Germaniya Yevropa Ittifoqining yetakchi davlatiga aylandi. 2008–2009-yillardagi inqiroz iqtisodga zarar yetkazdi, oʻsish faqat 2014-yilga kelib tiklandi. 2014-yildan Germaniya Rossiyaga qarshi sanksiyalarni qoʻllab-quvvatladi. 2015-yildan Suriya va boshqa mamlakatlardan kelgan qochoqlar muammosi kuchaydi, 2017-yilgi saylovda Merkel boshchiligidagi blok 33 % ovoz oldi.",
      easy: "2005 — Merkel, birinchi ayol kansler; Germaniya — YI yetakchisi; 2015 — qochoqlar muammosi.",
      draw: [
        { t: 'title', text: 'YIM boʻyicha oʻrin (XXI asr boshi)' },
        { t: 'table', x: 4, y: 18, rows: [['oʻrin', 'mamlakat'], ['1', 'AQSH'], ['2', 'Yaponiya'], ['3', 'Germaniya']] },
        { t: 'text', x: 4, y: 52, text: '2005 — A. Merkel birinchi ayol kansler', size: 's', color: 'blue' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1990-yil 3-oktabrda Germaniya birlashdi; sharqiy yerlarni rivojlantirishni asosan GFR moliyalashtirdi, 1990-yillarda ishsizlik yuqori boʻldi.',
    '1998-yildan G. Shryoder hukumati biznes, pensiya, tibbiyot va ijtimoiy sugʻurta sohalarida islohotlar oʻtkazdi.',
    '2005-yildan A. Merkel — birinchi ayol kansler; «Merkel davri»da Germaniya YIning yetakchisiga aylandi, keyin qochoqlar muammosi uning obroʻsiga taʼsir qildi.'
  ],
  questions: [
    {
      id: 'j11q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Birlashish — birinchi.',
      explanation: 'Germaniya birlashdi (1990) → Shryoder hukumati (1998) → Merkel kansler (2005) → qochoqlar muammosi (2015).',
      widget: { type: 'order_line', props: { items: [{ label: 'Germaniya birlashdi' }, { label: 'G. Shryoder hukumati' }, { label: 'A. Merkel kansler boʻldi' }, { label: 'qochoqlar muammosi kuchaydi' }] } }
    },
    {
      id: 'j11q2',
      prompt: 'Yagona Germaniya qaysi kuni tashkil topgani eʼlon qilingan?',
      hint: 'Kuz oyi.',
      explanation: '1990-yil 3-oktabrda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1989-yil 9-noyabr', '1990-yil 3-oktabr', '1991-yil 8-dekabr', '1993-yil 1-yanvar'], answerIndex: 1 } }
    },
    {
      id: 'j11q3',
      prompt: 'XXI asr boshida Germaniya YIM boʻyicha dunyoda nechanchi oʻrinda edi?',
      hint: 'AQSH va Yaponiyadan keyin.',
      explanation: 'Uchinchi oʻrinda.',
      widget: { type: 'number_answer', props: { answer: 3, unit: '-oʻrin' } }
    },
    {
      id: 'j11q4',
      prompt: 'Siyosatchini uning faoliyati bilan juftlang.',
      hint: 'Merkel — birinchi ayol kansler.',
      explanation: 'G. Shryoder — 1998-yildan islohotlar; A. Merkel — birinchi ayol kansler; sotsial-demokratlar — 1998-yilgi saylov gʻoliblari.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'G. Shryoder', right: 'ijtimoiy soha islohotlari' },
            { left: 'A. Merkel', right: 'birinchi ayol kansler' },
            { left: 'GSDP', right: '1998-yilgi saylov gʻolibi' }
          ]
        }
      }
    },
    {
      id: 'j11q5',
      prompt: 'G. Shryoder islohotlarining maqsadlarini tanlang.',
      hint: 'Biznes va ijtimoiy soha.',
      explanation: 'Kichik va oʻrta biznesni qoʻllab-quvvatlash, ishsizlikni kamaytirish, pensiya va tibbiyotni isloh qilish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'kichik va oʻrta biznesni qoʻllash', correct: true },
            { label: 'ishsizlikni kamaytirish', correct: true },
            { label: 'pensiya tizimini isloh qilish', correct: true },
            { label: 'Germaniyani qayta boʻlish' }
          ]
        }
      }
    },
    {
      id: 'j11q6',
      prompt: '2015-yildan keyin A. Merkel obroʻsining pasayishiga asosan nima sabab boʻldi?',
      hint: 'Suriyadagi urush oqibati.',
      explanation: 'Qochoqlar muammosi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qochoqlar muammosi', 'yevroning bekor qilinishi', 'NATOdan chiqish', 'Berlin devori'], answerIndex: 0 } }
    },
    {
      id: 'j11q7',
      prompt: '2017-yilgi saylovda Merkel boshchiligidagi koalitsiya necha foiz ovoz olgan?',
      hint: 'Uchdan birga yaqin.',
      explanation: '33 %.',
      widget: { type: 'number_answer', props: { answer: 33, unit: '%' } }
    },
    {
      id: 'j11q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Inqirozdan tiklanish — 2014.',
      explanation: 'Germaniya oʻsishi 2014-yilga kelib inqirozdan oldingi darajaga yetgan; 2014-yildan Rossiyaga qarshi sanksiyalarni qoʻllab-quvvatlagan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Germaniyaning iqtisodiy oʻsishi 2014-yilga kelib inqirozdan oldingi darajaga yetgan.', value: true },
            { text: '2014-yildan Germaniya Rossiyaga qarshi sanksiyalarni qoʻllab-quvvatlagan.', value: true },
            { text: 'Sobiq GDRni rivojlantirish xorijiy kreditlar hisobiga amalga oshirilgan.', value: false },
            { text: '1990-yillarda Germaniyada ishsizlik juda past boʻlgan.', value: false }
          ]
        }
      }
    }
  ]
};
