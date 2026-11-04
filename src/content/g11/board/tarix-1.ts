import type { BoardLesson } from './types';

export const UZ1 = { kicker: 'Oʻzbekiston tarixi · I bob', title: 'Mustaqillik va ijtimoiy-siyosiy islohotlar' };

/** Darslik: Oʻzbekiston tarixi 11, 1-mavzu (5–10-betlar) — Mustaqillik Deklaratsiyasi, 1991-yil avgust voqealari, mustaqillik eʼlon qilinishi, Konstitutsiya, davlat ramzlari. */
export const TARIX_1: BoardLesson = {
  n: 1,
  label: '1',
  group: UZ1,
  title: 'Mustaqillikning qoʻlga kiritilishi',
  section: 'Oʻzbekiston tarixi, 1-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mustaqillik yoʻli bir kunda emas, bir necha bosqichda bosib oʻtildi. 1990-yil 20-iyunda Oliy Kengash Mustaqillik Deklaratsiyasini qabul qilib, birinchi qadamni qoʻydi. 1991-yil avgustida Moskvada davlat toʻntarishi boʻldi — Favqulodda holat davlat komiteti, GKChP, hokimiyatni egalladi. Oʻzbekiston rahbariyati GKChP hujjatlari respublikada amal qilmasligini eʼlon qildi, 31-avgustda esa Oliy Kengash davlat mustaqilligini eʼlon qildi. 1-sentabr Mustaqillik kuni deb belgilandi.",
      easy: "1990 — Deklaratsiya, 1991-yil 31-avgust — mustaqillik eʼlon qilindi, 1-sentabr — Mustaqillik kuni.",
      draw: [
        { t: 'title', text: 'Mustaqillik sari' },
        { t: 'icon', x: 14, y: 40, emoji: '🇺🇿', size: 'l' },
        { t: 'list', x: 30, y: 20, items: ['Mustaqillik Deklaratsiyasi', 'GKChP hujjatlari rad etildi', 'mustaqillik eʼlon qilindi', '1-sentabr — bayram'] }
      ],
      next: 'Muhim sanalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Mustaqillikdan keyin uni qonun bilan mustahkamlash kerak edi. 64 kishilik komissiya Konstitutsiya ustida ikki yarim yil ishladi, loyiha xalq muhokamasiga qoʻyilib, 6 mingdan ortiq taklif keldi. 1992-yil 8-dekabrda Konstitutsiya qabul qilindi. Davlat ramzlari ham yaratildi: bayroq 1991-yil 18-noyabrda, gerb 1992-yil 2-iyulda, madhiya 1992-yil 10-dekabrda qabul qilindi. Madhiya soʻzi shoir Abdulla Oripovniki, musiqasi bastakor Mutal Burhonovniki.",
      easy: "Konstitutsiya — 1992-yil 8-dekabr; bayroq, gerb, madhiya — 1991–1992.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['sana', 'voqea'], ['1990-yil 20-iyun', 'Mustaqillik Deklaratsiyasi'], ['1991-yil 31-avgust', 'mustaqillik eʼlon qilindi'], ['1991-yil 18-noyabr', 'Davlat bayrogʻi'], ['1992-yil 2-iyul', 'Davlat gerbi'], ['1992-yil 8-dekabr', 'Konstitutsiya']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1990-yil 20-iyunda Mustaqillik Deklaratsiyasi qabul qilindi; 1991-yil avgustdagi GKChP toʻntarishidan keyin 31-avgustda mustaqillik eʼlon qilindi.',
    '1-sentabr Mustaqillik kuni deb belgilandi; mustaqillik «Davlat mustaqilligi asoslari toʻgʻrisida»gi qonun bilan mustahkamlandi.',
    'Konstitutsiya 1992-yil 8-dekabrda qabul qilindi; bayroq (1991), gerb va madhiya (1992) qonunlari qabul qilindi — madhiya soʻzi A. Oripov, musiqasi M. Burhonovniki.'
  ],
  questions: [
    {
      id: 't1q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Deklaratsiya — eng birinchi.',
      explanation: 'Deklaratsiya (1990-yil iyun) → GKChP toʻntarishi (1991-yil avgust) → mustaqillik eʼloni (31-avgust) → Konstitutsiya (1992-yil dekabr).',
      widget: { type: 'order_line', props: { items: [{ label: 'Mustaqillik Deklaratsiyasi' }, { label: 'Moskvadagi toʻntarish (GKChP)' }, { label: 'mustaqillik eʼlon qilindi' }, { label: 'Konstitutsiya qabul qilindi' }] } }
    },
    {
      id: 't1q2',
      prompt: 'Sanani voqea bilan juftlang.',
      hint: 'Konstitutsiya kuni — dekabrda.',
      explanation: '1990-yil 20-iyun — Deklaratsiya; 1991-yil 31-avgust — mustaqillik eʼloni; 1992-yil 2-iyul — gerb; 1992-yil 8-dekabr — Konstitutsiya.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '1990-yil 20-iyun', right: 'Mustaqillik Deklaratsiyasi' },
            { left: '1991-yil 31-avgust', right: 'mustaqillik eʼloni' },
            { left: '1992-yil 2-iyul', right: 'Davlat gerbi' },
            { left: '1992-yil 8-dekabr', right: 'Konstitutsiya' }
          ]
        }
      }
    },
    {
      id: 't1q3',
      prompt: 'Oʻzbekiston Konstitutsiyasi qaysi yilda qabul qilingan?',
      hint: 'Mustaqillikdan bir yil oʻtib.',
      explanation: '1992-yil 8-dekabrda.',
      widget: { type: 'number_answer', props: { answer: 1992, unit: 'yil' } }
    },
    {
      id: 't1q4',
      prompt: 'GKChP nima edi?',
      hint: '1991-yil avgust, Moskva.',
      explanation: 'Favqulodda holat davlat komiteti — 1991-yil avgustda Moskvada hokimiyatni egallab, ittifoq respublikalarining mustaqilligiga yoʻl qoʻymaslikka uringan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Oʻzbekiston parlamenti', 'Favqulodda holat davlat komiteti', 'Konstitutsiya komissiyasi', 'xalqaro tashkilot'], answerIndex: 1 } }
    },
    {
      id: 't1q5',
      prompt: 'Davlat madhiyasi mualliflarini tanlang.',
      hint: 'Shoir va bastakor.',
      explanation: 'Soʻzi — shoir Abdulla Oripov, musiqasi — bastakor Mutal Burhonov.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Abdulla Oripov', correct: true },
            { label: 'Mutal Burhonov', correct: true },
            { label: 'Alisher Navoiy' },
            { label: 'Abdulla Qodiriy' }
          ]
        }
      }
    },
    {
      id: 't1q6',
      prompt: 'Davlat ramzlarini qabul qilinish tartibida joylashtiring.',
      hint: 'Avval bayroq.',
      explanation: 'Bayroq (1991-yil 18-noyabr) → gerb (1992-yil 2-iyul) → madhiya (1992-yil 10-dekabr).',
      widget: { type: 'order_line', props: { items: [{ label: 'Davlat bayrogʻi' }, { label: 'Davlat gerbi' }, { label: 'Davlat madhiyasi' }] } }
    },
    {
      id: 't1q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Bayram kuni.',
      explanation: 'Respublika «Oʻzbekiston Respublikasi» deb ataldi va 1-sentabr Mustaqillik kuni deb belgilandi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Oliy Kengash qarori bilan ' }, { blank: '1-sentabr' }, { text: ' Mustaqillik kuni, respublika esa «Oʻzbekiston ' }, { blank: 'Respublikasi' }, { text: '» deb ataldi.' }],
          bank: ['1-sentabr', 'Respublikasi', '8-dekabr', 'SSR']
        }
      }
    },
    {
      id: 't1q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Komissiya 64 kishidan iborat edi.',
      explanation: 'Konstitutsiya loyihasi xalq muhokamasiga qoʻyilib, 6 mingdan ortiq taklif tushdi; Deklaratsiya mustaqillikdan oldin, 1990-yilda qabul qilingan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Konstitutsiya loyihasi umumxalq muhokamasiga qoʻyilgan.', value: true },
            { text: 'Konstitutsiya loyihasini 64 kishilik komissiya tayyorlagan.', value: true },
            { text: 'Mustaqillik Deklaratsiyasi 1992-yilda qabul qilingan.', value: false },
            { text: 'Mustaqillik kuni 8-dekabrda nishonlanadi.', value: false }
          ]
        }
      }
    }
  ]
};
