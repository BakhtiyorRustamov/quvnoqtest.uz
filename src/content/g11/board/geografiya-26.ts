import type { BoardLesson } from './types';

export const GEO8 = { kicker: '8-bob', title: 'Afrika subregionlari. Okeaniya davlatlari' };

/** Darslik: Geografiya 10, 26-§ (111–115-betlar) — Afrikaning besh subregioni: Shimoliy, Gʻarbiy, Markaziy, Sharqiy, Janubiy — tabiati, resurslari, xoʻjaligi va muammolari. */
export const GEO_26: BoardLesson = {
  n: 26,
  label: '26',
  group: GEO8,
  title: 'Afrika subregionlari',
  section: '26-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Afrika — maydoni 30 mln km² dan ortiq, 54 ta mustaqil davlat joylashgan qitʼa. U tabiiy resurslarga boy, ammo koʻp davlatlarning rivojlanish darajasi past. Afrika besh subregionga boʻlinadi. Shimoliy Afrika Oʻrta va Qizil dengizlar hamda Atlantika okeaniga chiqadi; subtropik iqlimda paxta, zaytun, uzum yetishtiriladi, neft, gaz va fosforit qaziladi, Suvaysh kanali shu yerda; aholisining koʻpchiligi arab tilida soʻzlashadi; Misr va Jazoir peshqadam. Gʻarbiy Afrika Sahroi Kabir va Gvineya qoʻltigʻi orasida; bu yerda qitʼaning eng koʻp aholili davlati — Nigeriya; kakao, kofe, yeryongʻoq kabi eksport ekinlari va konchilik rivojlangan.",
      easy: "Afrika: 30 mln km², 54 davlat, 5 subregion; Shimoliy — arab davlatlari, Suvaysh kanali; Gʻarbiy — Nigeriya, kakao.",
      draw: [
        { t: 'title', text: 'Afrika subregionlari' },
        { t: 'table', x: 4, y: 18, rows: [['subregion', 'aholi, mln (darslik)'], ['Shimoliy', '218'], ['Gʻarbiy', '341'], ['Sharqiy', '379'], ['Markaziy', '142'], ['Janubiy', '61']] }
      ],
      next: 'Qolgan subregionlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Markaziy Afrika nam ekvatorial oʻrmonlar va savannalarda joylashgan; u olmos, mis, kobalt, marganes kabi mineral resurslar boʻyicha dunyoda oldingi oʻrinlarda, oʻrmon resurslari ham boy; aholisi asosan bantu xalqlari. Sharqiy Afrika Hind okeaniga chiqadi, mineral resurslarga nisbatan kambagʻal, shuning uchun kofe, choy, ziravorlar kabi tropik ekinlar va milliy bogʻlar turizmi rivojlangan; Keniya peshqadam. Janubiy Afrika mineral resurslarga boy; Janubiy Afrika Respublikasi qitʼaning iqtisodiy jihatdan eng rivojlangan davlati. Afrikaning muammolari: qashshoqlik, savodsizlik, mustamlaka davrida etnik omil hisobga olinmay chizilgan chegaralar va choʻllashish.",
      easy: "Markaziy — olmos, mis, kobalt, oʻrmon; Sharqiy — kofe, choy, turizm (Keniya); Janubiy — JAR, qitʼadagi eng rivojlangan.",
      draw: [
        { t: 'title', text: 'Ixtisoslashuv' },
        { t: 'table', x: 4, y: 18, rows: [['subregion', 'asosiy tarmoqlar'], ['Shimoliy', 'neft, gaz, Suvaysh kanali'], ['Gʻarbiy', 'kakao, kofe, konchilik'], ['Markaziy', 'olmos, mis, oʻrmon'], ['Sharqiy', 'choy, kofe, turizm'], ['Janubiy', 'konchilik, sanoat (JAR)']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Afrika maydoni 30 mln km² dan ortiq, 54 ta mustaqil davlat bor; u Shimoliy, Gʻarbiy, Markaziy, Sharqiy va Janubiy subregionlarga boʻlinadi.',
    'Shimoliy Afrika — arab davlatlari, neft-gaz va Suvaysh kanali; Gʻarbiy — Nigeriya va eksport ekinlari; Markaziy — mineral va oʻrmon resurslari; Sharqiy — tropik ekinlar va turizm; Janubiy — JAR, qitʼaning eng rivojlangan davlati.',
    'Afrikaning muammolari: qashshoqlik, savodsizlik, etnik omil hisobga olinmagan chegaralar va choʻllashish.'
  ],
  questions: [
    {
      id: 'g26q1',
      prompt: 'Davlatni Afrika subregioniga ajrating.',
      hint: 'Misr — Shimoliy.',
      explanation: 'Shimoliy — Misr, Jazoir; Gʻarbiy — Nigeriya; Sharqiy — Keniya; Janubiy — JAR.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'n', label: 'Shimoliy' }, { id: 'w', label: 'Gʻarbiy' }, { id: 'e', label: 'Sharqiy' }, { id: 's', label: 'Janubiy' }],
          items: [
            { emoji: '🏜️', label: 'Misr', bin: 'n' },
            { emoji: '🌴', label: 'Jazoir', bin: 'n' },
            { emoji: '🍫', label: 'Nigeriya', bin: 'w' },
            { emoji: '🦒', label: 'Keniya', bin: 'e' },
            { emoji: '💎', label: 'Janubiy Afrika Respublikasi', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'g26q2',
      prompt: 'Afrikada nechta mustaqil davlat bor?',
      hint: 'Ellikdan koʻp.',
      explanation: '54 ta.',
      widget: { type: 'number_answer', props: { answer: 54, unit: 'ta' } }
    },
    {
      id: 'g26q3',
      prompt: 'Afrikaning iqtisodiy jihatdan eng rivojlangan davlati qaysi?',
      hint: 'Janubda.',
      explanation: 'Janubiy Afrika Respublikasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Janubiy Afrika Respublikasi', 'Chad', 'Mali', 'Somali'], answerIndex: 0 } }
    },
    {
      id: 'g26q4',
      prompt: 'Subregionni xususiyati bilan juftlang.',
      hint: 'Sharqiy — turizm.',
      explanation: 'Shimoliy — Suvaysh kanali; Markaziy — olmos va kobalt; Sharqiy — milliy bogʻlar turizmi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Shimoliy Afrika', right: 'Suvaysh kanali' },
            { left: 'Markaziy Afrika', right: 'olmos va kobalt' },
            { left: 'Sharqiy Afrika', right: 'milliy bogʻlar turizmi' }
          ]
        }
      }
    },
    {
      id: 'g26q5',
      prompt: 'Afrikadagi qitʼaning eng koʻp aholili davlati qaysi?',
      hint: 'Gʻarbiy Afrika.',
      explanation: 'Nigeriya.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Nigeriya', 'Misr', 'Keniya', 'Liviya'], answerIndex: 0 } }
    },
    {
      id: 'g26q6',
      prompt: 'Afrikaning asosiy muammolarini tanlang.',
      hint: 'Ijtimoiy va ekologik.',
      explanation: 'Qashshoqlik, savodsizlik, etnik omil hisobga olinmagan chegaralar, choʻllashish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'qashshoqlik', correct: true },
            { label: 'savodsizlik', correct: true },
            { label: 'choʻllashish', correct: true },
            { label: 'muzliklarning koʻpayishi' }
          ]
        }
      }
    },
    {
      id: 'g26q7',
      prompt: 'Nima uchun Sharqiy Afrikada qishloq xoʻjaligi va turizm asosiy tarmoq?',
      hint: 'Resurslar.',
      explanation: 'Chunki subregion mineral resurslarga nisbatan kambagʻal.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['mineral resurslarga kambagʻalligi uchun', 'okeanga chiqa olmagani uchun', 'iqlimi sovuq boʻlgani uchun', 'aholisi yoʻqligi uchun'], answerIndex: 0 } }
    },
    {
      id: 'g26q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Bantu — Markaziy Afrika.',
      explanation: 'Markaziy Afrika aholisi asosan bantu xalqlari; Shimoliy Afrika aholisining koʻpchiligi arab tilida soʻzlashadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Markaziy Afrika aholisi asosan bantu xalqlaridan iborat.', value: true },
            { text: 'Shimoliy Afrika aholisining koʻpchiligi arab tilida soʻzlashadi.', value: true },
            { text: 'Afrika tabiiy resurslarga juda kambagʻal qitʼa.', value: false },
            { text: 'Sharqiy Afrika Tinch okeaniga chiqadi.', value: false }
          ]
        }
      }
    }
  ]
};
