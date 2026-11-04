import type { BoardLesson } from './types';

export const UZ9 = { kicker: 'Oʻzbekiston tarixi · IX bob', title: 'Koʻp tomonlama hamkorlik' };

/** Darslik: Oʻzbekiston tarixi 11, 21-mavzu (129–135-betlar) — BMTga aʼzolik va tashabbuslar, YuNESKO bilan hamkorlik, «6+2» guruhi va Afgʻoniston, Orol muammosi va transchegaraviy daryolar. */
export const TARIX_21: BoardLesson = {
  n: 21,
  label: '21',
  group: UZ9,
  title: 'BMT doirasidagi faoliyat va tinchlikparvar siyosat',
  section: 'Oʻzbekiston tarixi, 21-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1992-yil 2-martda Oʻzbekiston Birlashgan Millatlar Tashkilotiga qabul qilinib, jahon hamjamiyatining teng huquqli aʼzosi boʻldi. 1993-yilda Islom Karimov BMT minbaridan ilk bor soʻzlab, Markaziy Osiyoni yadro qurolidan xoli zona deb eʼlon qilish va Orol muammosi boʻyicha maxsus komissiya tuzishni taklif qildi. Shavkat Mirziyoyev 2017-yilda BMTning 72-sessiyasida soʻzlab, yoshlar huquqlari konvensiyasi va «Maʼrifat va diniy bagʻrikenglik» rezolyutsiyasini taklif qildi, Orol xaritasini koʻrsatdi.",
      easy: "1992 — BMTga aʼzolik; 1993 va 2017 — BMT minbaridan muhim takliflar.",
      draw: [
        { t: 'title', text: 'Oʻzbekiston va BMT' },
        { t: 'icon', x: 14, y: 40, emoji: '🇺🇳', size: 'l' },
        { t: 'list', x: 30, y: 20, items: ['1992 — BMTga aʼzolik', '1993 — yadrosiz zona taklifi', '1993 — YuNESKOga aʼzolik', '2017 — 72-sessiyada nutq'] }
      ],
      next: 'Tinchlik va ekologiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1997-yilda Oʻzbekiston Afgʻoniston muammosini muzokaralar orqali hal qilish uchun «6+2» guruhini taklif qildi — Afgʻonistonning olti qoʻshnisi hamda AQSh va Rossiya; 1999-yilda Toshkentda bu guruh uchrashuvi oʻtdi. Oʻzbekiston Afgʻonistonda birinchi zamonaviy temir yoʻl — Hayraton–Mozori Sharif yoʻlini qurib, 2010-yilda ishga tushirdi. 1993-yilda Markaziy Osiyoning besh davlati Orolni qutqarish xalqaro jamgʻarmasini tuzdi. Amudaryo va Sirdaryo kabi transchegaraviy daryolardan adolatli foydalanish ham muhim masala.",
      easy: "1997 — «6+2» guruhi; 2010 — Afgʻonistonda temir yoʻl; 1993 — Orolni qutqarish jamgʻarmasi.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1992-yil 2-mart', 'BMTga aʼzo boʻldi'], ['1993', 'Orolni qutqarish jamgʻarmasi'], ['1997', '«6+2» guruhi taklifi'], ['2010', 'Hayraton–Mozori Sharif yoʻli'], ['2017', 'BMT 72-sessiyasida nutq']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Oʻzbekiston 1992-yil 2-martda BMTga, 1993-yil oktabrda YuNESKOga aʼzo boʻldi; 1993-yilda Toshkentda BMT vakolatxonasi ochildi.',
    'BMT minbaridan Markaziy Osiyoni yadrosiz zona qilish, Orolni qutqarish (1993), yoshlar huquqlari konvensiyasi va «Maʼrifat va diniy bagʻrikenglik» rezolyutsiyasi (2017) taklif qilindi.',
    'Afgʻoniston uchun «6+2» guruhi (1997) taklif etildi, Hayraton–Mozori Sharif temir yoʻli (2010) qurildi; Orolni qutqarish xalqaro jamgʻarmasi (1993) tuzildi.'
  ],
  questions: [
    {
      id: 't21q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'BMTga aʼzolik — birinchi.',
      explanation: 'BMTga aʼzolik (1992) → YuNESKOga aʼzolik (1993) → «6+2» guruhi (1997) → Hayraton–Mozori Sharif temir yoʻli (2010).',
      widget: { type: 'order_line', props: { items: [{ label: 'BMTga aʼzolik' }, { label: 'YuNESKOga aʼzolik' }, { label: '«6+2» guruhi taklifi' }, { label: 'Hayraton–Mozori Sharif temir yoʻli' }] } }
    },
    {
      id: 't21q2',
      prompt: 'Oʻzbekiston BMTga qaysi yilda qabul qilingan?',
      hint: '2-mart.',
      explanation: '1992-yil 2-martda.',
      widget: { type: 'number_answer', props: { answer: 1992, unit: 'yil' } }
    },
    {
      id: 't21q3',
      prompt: '«6+2» guruhi qaysi davlat muammosini hal qilish uchun taklif qilingan?',
      hint: 'Janubiy qoʻshni.',
      explanation: 'Afgʻoniston.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Tojikiston', 'Afgʻoniston', 'Eron', 'Pokiston'], answerIndex: 1 } }
    },
    {
      id: 't21q4',
      prompt: '«6+2» guruhidagi «+2» qaysi davlatlar?',
      hint: 'Ikki yirik davlat.',
      explanation: 'AQSh va Rossiya.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Xitoy va Hindiston', 'AQSh va Rossiya', 'Turkiya va Eron', 'Yaponiya va Koreya'], answerIndex: 1 } }
    },
    {
      id: 't21q5',
      prompt: 'Oʻzbekistonning BMT minbaridagi takliflarini tanlang.',
      hint: 'Yadro, Orol, yoshlar.',
      explanation: 'Markaziy Osiyoni yadrosiz zona qilish, Orol boʻyicha komissiya, yoshlar huquqlari konvensiyasi, «Maʼrifat va diniy bagʻrikenglik» rezolyutsiyasi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Markaziy Osiyoni yadrosiz zona qilish', correct: true },
            { label: 'Orol muammosi boʻyicha komissiya', correct: true },
            { label: 'yoshlar huquqlari konvensiyasi', correct: true },
            { label: '«Maʼrifat va diniy bagʻrikenglik» rezolyutsiyasi', correct: true },
            { label: 'BMTni tarqatib yuborish' }
          ]
        }
      }
    },
    {
      id: 't21q6',
      prompt: 'Prezident va BMT Bosh Assambleyasidagi ilk nutqini juftlang.',
      hint: '48-sessiya — 1993.',
      explanation: 'Islom Karimov — 1993-yil, 48-sessiya; Shavkat Mirziyoyev — 2017-yil, 72-sessiya.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Islom Karimov', right: '1993-yil, 48-sessiya' },
            { left: 'Shavkat Mirziyoyev', right: '2017-yil, 72-sessiya' }
          ]
        }
      }
    },
    {
      id: 't21q7',
      prompt: 'Markaziy Osiyoning ikki asosiy transchegaraviy daryosi qaysilar?',
      hint: 'Orolga quyiladi.',
      explanation: 'Amudaryo va Sirdaryo.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Volga va Don', 'Amudaryo va Sirdaryo', 'Ili va Chu', 'Nil va Furot'], answerIndex: 1 } }
    },
    {
      id: 't21q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Afgʻonistondagi ilk temir yoʻl.',
      explanation: 'Afgʻonistondagi birinchi zamonaviy temir yoʻlni Oʻzbekiston qurgan; Orolni qutqarish jamgʻarmasini besh davlat tuzgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Afgʻonistondagi birinchi zamonaviy temir yoʻlni Oʻzbekiston qurgan.', value: true },
            { text: 'Orolni qutqarish xalqaro jamgʻarmasini Markaziy Osiyoning besh davlati tuzgan.', value: true },
            { text: 'Oʻzbekiston YuNESKOga 2017-yilda aʼzo boʻlgan.', value: false },
            { text: '«6+2» guruhi uchrashuvi Parijda boʻlib oʻtgan.', value: false }
          ]
        }
      }
    }
  ]
};
