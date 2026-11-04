import type { BoardLesson } from './types';
import { GEO7 } from './geografiya-23';

/** Darslik: Geografiya 10, 25-§ (107–111-betlar) — Vest-Indiya: arxipelaglari, davlatlari, tabiati, aholisi va xoʻjaligi. */
export const GEO_25: BoardLesson = {
  n: 25,
  label: '25',
  group: GEO7,
  title: 'Karib havzasi orol mamlakatlari',
  section: '25-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Karib dengizi orollarini Kolumb 1492-yilda birinchi boʻlib ochgan va ularni Hindiston deb oʻylab, Vest-Indiya — «Gʻarbiy Hindiston» deb atagan. Vest-Indiya uchta arxipelagdan iborat: Katta Antil orollari — Kuba, Gaiti, Yamayka, Puerto-Riko; Kichik Antil orollari va Bagama orollari. Umumiy maydoni qariyb 245 ming km², uning katta qismini Katta Antil orollari egallaydi. Bu yerda 13 ta mustaqil davlat bor: Kuba, Gaiti, Dominikana Respublikasi, Yamayka, Bagama orollari, Barbados, Trinidad va Tobago va boshqa «mitti» davlatlar; bundan tashqari, Britaniya, Fransiya, Niderlandiya va AQSHga qarashli hududlar ham bor. Eng katta davlat — Kuba.",
      easy: "Vest-Indiya: Katta Antil, Kichik Antil va Bagama orollari; 13 ta davlat; eng kattasi — Kuba.",
      draw: [
        { t: 'title', text: 'Vest-Indiya arxipelaglari' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'Katta Antil', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'Kichik Antil', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'Bagama orollari', color: 'orange' },
        { t: 'text', x: 4, y: 46, text: 'Kuba, Gaiti, Yamayka, Puerto-Riko — Katta Antil', size: 's' }
      ],
      next: 'Tabiat va xoʻjalik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Orollar Karib va Shimoliy Amerika litosfera plitalari chegarasida joylashgani uchun kuchli zilzilalar boʻlib turadi, Kichik Antil orollarida harakatdagi vulqonlar koʻp. Iqlimi tropik, passat shamollari tufayli yumshoq va nam; tropik qish — noyabrdan maygacha — eng qulay sayyohlik mavsumi, ammo kuchli dovullar tez-tez boʻladi. Foydali qazilmalar: boksit (Yamayka), nikel va kobalt (Kuba), neft (Trinidad va Tobago); Trinidadda tabiiy asfalt koʻli bor. Aholi qariyb 43 mln. Xoʻjalik turizm, tropik ekinlar, konchilik va moliya xizmatlariga ixtisoslashgan. Rivojlanish darajasi turlicha: Barbados va Bagama orollari peshqadam, Gaiti esa eng qoloq.",
      easy: "Zilzila va dovullar; boksit, nikel, neft; xoʻjalik — turizm va tropik ekinlar; Barbados yetakchi, Gaiti eng qoloq.",
      draw: [
        { t: 'title', text: 'Davlatlar va resurslar' },
        { t: 'table', x: 4, y: 18, rows: [['davlat', 'xususiyati'], ['Kuba', 'nikel, kobalt; eng katta'], ['Yamayka', 'boksit'], ['Trinidad va Tobago', 'neft, asfalt koʻli'], ['Bagama orollari', 'turizm, moliya']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Vest-Indiya — Kolumb 1492-yilda ochgan Karib orollari; u Katta Antil, Kichik Antil va Bagama orollaridan iborat, 13 ta mustaqil davlat bor, eng kattasi — Kuba.',
    'Orollar plitalar chegarasida joylashgani uchun zilzila va vulqonlar koʻp; tropik iqlim turizm uchun qulay, ammo dovullar tez-tez boʻladi.',
    'Xoʻjalik turizm, tropik ekinlar, konchilik (boksit, nikel, neft) va moliya xizmatlariga ixtisoslashgan; Barbados va Bagama orollari peshqadam, Gaiti eng qoloq.'
  ],
  questions: [
    {
      id: 'g25q1',
      prompt: '«Vest-Indiya» nomi qanday maʼno beradi?',
      hint: 'Kolumb xatosi.',
      explanation: '«Gʻarbiy Hindiston».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Gʻarbiy Hindiston»', '«Janubiy orollar»', '«Yangi Ispaniya»', '«Sharqiy dengiz»'], answerIndex: 0 } }
    },
    {
      id: 'g25q2',
      prompt: 'Vest-Indiyada nechta mustaqil davlat bor?',
      hint: 'Oʻndan koʻp.',
      explanation: '13 ta.',
      widget: { type: 'number_answer', props: { answer: 13, unit: 'ta' } }
    },
    {
      id: 'g25q3',
      prompt: 'Katta Antil orollariga kiradigan orollarni tanlang.',
      hint: 'Eng yiriklari.',
      explanation: 'Kuba, Gaiti, Yamayka, Puerto-Riko.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Kuba', correct: true },
            { label: 'Gaiti', correct: true },
            { label: 'Yamayka', correct: true },
            { label: 'Puerto-Riko', correct: true },
            { label: 'Islandiya' }
          ]
        }
      }
    },
    {
      id: 'g25q4',
      prompt: 'Davlatni resursi bilan juftlang.',
      hint: 'Yamayka — boksit.',
      explanation: 'Yamayka — boksit; Kuba — nikel va kobalt; Trinidad va Tobago — neft va asfalt.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Yamayka', right: 'boksit' },
            { left: 'Kuba', right: 'nikel va kobalt' },
            { left: 'Trinidad va Tobago', right: 'neft va tabiiy asfalt' }
          ]
        }
      }
    },
    {
      id: 'g25q5',
      prompt: 'Davlatni rivojlanish darajasiga ajrating.',
      hint: 'Gaiti — eng qoloq.',
      explanation: 'Peshqadam — Barbados, Bagama orollari; eng qoloq — Gaiti, Dominika.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'h', label: 'peshqadam' }, { id: 'l', label: 'eng qoloq' }],
          items: [
            { emoji: '🏝️', label: 'Barbados', bin: 'h' },
            { emoji: '🏖️', label: 'Bagama orollari', bin: 'h' },
            { emoji: '🏚️', label: 'Gaiti', bin: 'l' },
            { emoji: '🌿', label: 'Dominika', bin: 'l' }
          ]
        }
      }
    },
    {
      id: 'g25q6',
      prompt: 'Vest-Indiyada eng qulay sayyohlik mavsumi qaysi?',
      hint: 'Iliq va quruq.',
      explanation: 'Tropik qish — noyabr oxiridan maygacha.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tropik qish (noyabr–may)', 'jazirama yoz (may–noyabr)', 'faqat avgust', 'yil boʻyi bir xil'], answerIndex: 0 } }
    },
    {
      id: 'g25q7',
      prompt: 'Vest-Indiya xoʻjaligining asosiy tarmoqlarini tanlang.',
      hint: 'Dengiz, quyosh, ekinlar.',
      explanation: 'Turizm, tropik ekinlar, konchilik, moliya-bank xizmatlari.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'turizm', correct: true },
            { label: 'tropik ekinlar', correct: true },
            { label: 'konchilik', correct: true },
            { label: 'bugʻdoy monokulturasi' }
          ]
        }
      }
    },
    {
      id: 'g25q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Plitalar chegarasi.',
      explanation: 'Vest-Indiya plitalar chegarasida, shuning uchun zilzilalar boʻladi; Gaitida davlat tili fransuz tili.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Vest-Indiyada kuchli zilzilalar boʻlib turadi.', value: true },
            { text: 'Gaitida davlat tili — fransuz tili.', value: true },
            { text: 'Vest-Indiya iqlimi moʻtadil va sovuq.', value: false },
            { text: 'Kuba Vest-Indiyadagi eng kichik davlat.', value: false }
          ]
        }
      }
    }
  ]
};
