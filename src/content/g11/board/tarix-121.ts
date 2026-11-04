import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 21-mavzu (94–98-betlar) — Eron Islom Respublikasi: M. Hotamiy islohotlari, AQSH bilan munosabatlar, M. Ahmadinajod, H. Ruhoniy va 2015-yilgi yadroviy kelishuv, yutuq va muammolar. */
export const TARIX_121: BoardLesson = {
  n: 121,
  label: '21',
  group: JH2,
  title: '1991–2017-yillarda Eron Islom Respublikasi',
  section: 'Jahon tarixi, 21-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1990-yillar boshida Eron iqtisodi barqarorlashdi, mamlakat jahon sport va madaniyat maydoniga qaytdi. Xalqaro yakkalanishdan chiqish uchun islohotlar zarur edi: 1997-yilda islohotchi Muhammad Hotamiy prezident boʻlib, ochiq va bagʻrikeng jamiyat qurish, Gʻarb bilan munosabatlarni yaxshilashni eʼlon qildi, ammo konservatorlarning qattiq qarshiligiga uchradi. 2001-yil 11-sentabrdan keyin AQSH Eronni terrorizmni qoʻllab-quvvatlashda, keyinroq yashirin yadro quroli yaratishda aybladi; 2002-yilda prezident J. Bush uni «yovuzlik oʻqi» davlatlari qatoriga qoʻshdi. 2005-yilda prezident boʻlgan konservator Mahmud Ahmadinajod liberal islohotlarni toʻxtatdi.",
      easy: "Hotamiy (1997) — islohotlar; 2002 — AQSH bilan keskinlik; Ahmadinajod (2005) — islohotlar toʻxtadi.",
      draw: [
        { t: 'title', text: 'Eron prezidentlari' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'Hotamiy, 1997', color: 'green' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'Ahmadinajod, 2005', color: 'red' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'Ruhoniy, 2013', color: 'blue' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'islohotchi → konservator → islohotchi', size: 's' }
      ],
      next: 'Yadroviy kelishuv'
    },
    {
      kind: 'explain',
      clear: true,
      say: "2009-yilgi saylovda Ahmadinajod yana gʻolib chiqdi, muxolifat natijani tan olmay namoyishlar oʻtkazdi. 2013-yilda Hasan Ruhoniy prezident etib saylandi. Oʻn yildan ortiq muzokaralardan soʻng 2015-yil iyulda Eron va oltita davlat — AQSH, Rossiya, Xitoy, Buyuk Britaniya, Fransiya, Germaniya — yadroviy dastur boʻyicha kelishuv imzoladi: Eron boyitilgan uran ishlab chiqarishni cheklaydi, evaziga sanksiyalar bosqichma-bosqich olib tashlanadi. Bugungi Eron — Oʻrta Sharqning yirik industrial davlati: 2009-yilda «Umid» sunʼiy yoʻldoshini uchirdi, taʼlim va fan rivojlangan, aholining yarmi 30 yoshdan kichik. Dolzarb muammolar — ishsizlik va inflyatsiya.",
      easy: "2013 — Ruhoniy; 2015 — yadroviy kelishuv (6 davlat bilan); yutuqlar — sanoat, kosmos; muammolar — ishsizlik, inflyatsiya.",
      draw: [
        { t: 'title', text: 'Bugungi Eron' },
        { t: 'table', x: 4, y: 18, rows: [['yutuqlar', 'muammolar'], ['yirik industrial davlat', 'ishsizlik'], ['2009: «Umid» yoʻldoshi', 'inflyatsiya'], ['taʼlim va fan', 'sanksiyalar taʼsiri']] },
        { t: 'text', x: 4, y: 50, text: '2015-yil iyul — yadroviy kelishuv', size: 's', color: 'blue' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1997-yilda prezident boʻlgan M. Hotamiy islohotlar va Gʻarb bilan yaqinlashishni boshladi, ammo konservatorlarning qarshiligiga uchradi.',
    '2001-yildan keyin AQSH bilan munosabatlar keskinlashdi; 2005-yildan M. Ahmadinajod liberal islohotlarni toʻxtatdi.',
    '2013-yildan H. Ruhoniy prezident; 2015-yilda olti davlat bilan yadroviy kelishuv imzolanib, sanksiyalarni olib tashlash boshlandi.'
  ],
  questions: [
    {
      id: 'j21q1',
      prompt: 'Eron prezidentlarini tartib boʻyicha joylashtiring.',
      hint: 'Hotamiy — 1997.',
      explanation: 'M. Hotamiy → M. Ahmadinajod → H. Ruhoniy.',
      widget: { type: 'order_line', props: { items: [{ label: 'Muhammad Hotamiy' }, { label: 'Mahmud Ahmadinajod' }, { label: 'Hasan Ruhoniy' }] } }
    },
    {
      id: 'j21q2',
      prompt: 'Prezidentni uning siyosiy yoʻnalishiga ajrating.',
      hint: 'Ahmadinajod — konservator.',
      explanation: 'Islohotchilar — Hotamiy, Ruhoniy; konservator — Ahmadinajod.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'i', label: 'islohotchi' }, { id: 'k', label: 'konservator' }],
          items: [
            { emoji: '👤', label: 'M. Hotamiy', bin: 'i' },
            { emoji: '👤', label: 'H. Ruhoniy', bin: 'i' },
            { emoji: '👤', label: 'M. Ahmadinajod', bin: 'k' }
          ]
        }
      }
    },
    {
      id: 'j21q3',
      prompt: 'Eron yadroviy dasturi boʻyicha kelishuv qaysi yilda imzolangan?',
      hint: 'Ruhoniy davri.',
      explanation: '2015-yil iyulda.',
      widget: { type: 'number_answer', props: { answer: 2015, unit: 'yil' } }
    },
    {
      id: 'j21q4',
      prompt: '2015-yilgi kelishuvni Eron bilan imzolagan davlatlarni tanlang.',
      hint: 'Oltita davlat.',
      explanation: 'AQSH, Rossiya, Xitoy, Buyuk Britaniya, Fransiya, Germaniya.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'AQSH', correct: true },
            { label: 'Rossiya', correct: true },
            { label: 'Xitoy', correct: true },
            { label: 'Germaniya', correct: true },
            { label: 'Hindiston' }
          ]
        }
      }
    },
    {
      id: 'j21q5',
      prompt: 'Yadroviy kelishuvga koʻra Eron nima evaziga uran boyitishni cheklaydi?',
      hint: 'Iqtisodiy cheklovlar.',
      explanation: 'Sanksiyalarning bosqichma-bosqich olib tashlanishi evaziga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yangi hududlar evaziga', 'sanksiyalar olib tashlanishi evaziga', 'BMT XKga aʼzolik evaziga', 'harbiy yordam evaziga'], answerIndex: 1 } }
    },
    {
      id: 'j21q6',
      prompt: 'Sanani voqea bilan juftlang.',
      hint: '2009 — «Umid».',
      explanation: '1997 — Hotamiy prezident; 2009 — «Umid» yoʻldoshi uchirildi; 2013 — Ruhoniy prezident.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '1997', right: 'Hotamiy prezident' },
            { left: '2009', right: '«Umid» yoʻldoshi uchirildi' },
            { left: '2013', right: 'Ruhoniy prezident' }
          ]
        }
      }
    },
    {
      id: 'j21q7',
      prompt: 'Zamonaviy Eronning eng dolzarb muammolari qaysilar?',
      hint: 'Iqtisodiy.',
      explanation: 'Ishsizlik va yuqori inflyatsiya.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ishsizlik va inflyatsiya', 'savodsizlik va ocharchilik', 'aholining qarishi', 'sanoatning yoʻqligi'], answerIndex: 0 } }
    },
    {
      id: 'j21q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Yoshlar mamlakati.',
      explanation: 'Eron aholisining yarmi 30 yoshdan kichik; Hotamiy islohotlari konservatorlar qarshiligiga uchragan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Eron aholisining yarmi 30 yoshdan kichik.', value: true },
            { text: 'M. Hotamiy islohotlari konservatorlarning qarshiligiga uchragan.', value: true },
            { text: 'M. Ahmadinajod liberal islohotlarni kengaytirgan.', value: false },
            { text: 'Eron hali birorta ham sunʼiy yoʻldosh uchirmagan.', value: false }
          ]
        }
      }
    }
  ]
};
