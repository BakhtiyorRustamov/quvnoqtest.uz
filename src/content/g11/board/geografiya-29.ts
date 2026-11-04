import type { BoardLesson } from './types';
import { GEO9 } from './geografiya-28';

/** Darslik: Geografiya 10, 29-§ (124–128-betlar) — Sharqiy Osiyo (5 davlat) va Janubi-sharqiy Osiyo (11 davlat): oʻrni, tabiati, resurslari, aholisi, xoʻjaligi. */
export const GEO_29: BoardLesson = {
  n: 29,
  label: '29',
  group: GEO9,
  title: 'Sharqiy va Janubi-sharqiy Osiyo',
  section: '29-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Sharqiy Osiyo — maydoni 11,8 mln km², aholisi 1,5 mlrd dan ortiq; jahon yalpi mahsulotining chorakdan koʻprogʻini beradi. Bu yerda 5 ta davlat bor va ular bir-biriga deyarli oʻxshamaydi: bozor iqtisodiyotini qoʻllayotgan Xitoy — aholi soni boʻyicha yirik va maydoni boʻyicha jahonda uchinchi; yopiq siyosat yurituvchi KXDR; yagona monarxiya va postindustrial davlat — Yaponiya; yangi sanoatlashgan Koreya Respublikasi; iqtisodiyoti nisbatan kam rivojlangan Mongoliya. Mongoliyadan boshqa hammasi Tinch okeaniga chiqadi, lekin hudud seysmik zonada. Yaponiya va Koreya Respublikasida tugʻilish past, keksalar ulushi oshmoqda. Xitoy, Yaponiya va Koreya Respublikasi kemasozlik, avtomobilsozlik, elektronika va metallurgiyada jahonda yetakchi.",
      easy: "Sharqiy Osiyo: Xitoy, Yaponiya, Koreya Respublikasi, KXDR, Mongoliya; yetakchi sanoat — elektronika, avtomobil, kema.",
      draw: [
        { t: 'title', text: 'Sharqiy Osiyo davlatlari' },
        { t: 'table', x: 4, y: 18, rows: [['davlat', 'xususiyati'], ['Xitoy', 'eng koʻp aholi, ulkan sanoat'], ['Yaponiya', 'monarxiya, postindustrial'], ['Koreya Respublikasi', 'yangi sanoatlashgan'], ['KXDR', 'yopiq siyosat'], ['Mongoliya', 'chorvachilik, siyrak aholi']] }
      ],
      next: 'Janubi-sharqiy Osiyo'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Janubi-sharqiy Osiyo — Hindixitoy yarimoroli va Malay arxipelagi; 11 ta davlat, aholisi 630 mln ga yaqin. Vyetnam, Kambodja, Laos, Myanma, Tailand, Malayziya — yarimorol davlatlari; Indoneziya, Filippin, Singapur, Bruney, Sharqiy Timor — orol davlatlari. Faqat Laos dengizga chiqmaydi. Mintaqa Hind va Tinch okeanlari orasida, muhim dengiz yoʻllari ustida. Iqlimi ekvatorial va subekvatorial, hududning 42 foizi oʻrmon; Mekong, Iravadi daryolari bor. Qalay-volfram belbogʻi tufayli qalay zaxirasi boʻyicha jahonda birinchi. Singapur, Tailand, Malayziya — yangi sanoatlashgan davlatlar; Bruney neft eksport qiladi. Qishloq xoʻjaligida sholi asosiy ekin, geveya, kofe, ziravorlar ham yetishtiriladi.",
      easy: "Janubi-sharqiy Osiyo: 11 davlat, faqat Laos dengizga chiqmaydi; qalay, sholi, geveya; Singapur — yangi sanoatlashgan.",
      draw: [
        { t: 'title', text: 'Janubi-sharqiy Osiyo' },
        { t: 'box', id: 'y', x: 4, y: 20, w: 44, h: 16, text: 'Yarimorol: Vyetnam, Tailand, Laos…', color: 'green' },
        { t: 'box', id: 'o', x: 52, y: 20, w: 44, h: 16, text: 'Orol: Indoneziya, Filippin…', color: 'blue' },
        { t: 'text', x: 4, y: 48, text: 'Qalay zaxirasi — jahonda 1-oʻrin', size: 's', color: 'orange' },
        { t: 'text', x: 4, y: 56, text: 'Asosiy ekin — sholi; geveya — kauchuk uchun', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Sharqiy Osiyoda 5 ta bir-biriga oʻxshamagan davlat bor: Xitoy, Yaponiya, Koreya Respublikasi, KXDR va Mongoliya; mintaqa jahon yalpi mahsulotining chorakdan koʻprogʻini beradi.',
    'Janubi-sharqiy Osiyo — 11 davlat (yarimorol va orol davlatlari), faqat Laos dengizga chiqmaydi; qalay zaxirasi boʻyicha jahonda birinchi.',
    'Singapur, Tailand, Malayziya — yangi sanoatlashgan davlatlar; qishloq xoʻjaligida sholi, geveya, ziravorlar yetishtiriladi.'
  ],
  questions: [
    {
      id: 'g29q1',
      prompt: 'Davlatni subregioniga ajrating.',
      hint: 'Mongoliya — Sharqiy.',
      explanation: 'Sharqiy Osiyo — Yaponiya, Mongoliya, Xitoy; Janubi-sharqiy — Vyetnam, Indoneziya, Tailand.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'e', label: 'Sharqiy Osiyo' }, { id: 'se', label: 'Janubi-sharqiy Osiyo' }],
          items: [
            { emoji: '🗾', label: 'Yaponiya', bin: 'e' },
            { emoji: '🐎', label: 'Mongoliya', bin: 'e' },
            { emoji: '🐼', label: 'Xitoy', bin: 'e' },
            { emoji: '🌾', label: 'Vyetnam', bin: 'se' },
            { emoji: '🌋', label: 'Indoneziya', bin: 'se' },
            { emoji: '🐘', label: 'Tailand', bin: 'se' }
          ]
        }
      }
    },
    {
      id: 'g29q2',
      prompt: 'Janubi-sharqiy Osiyoning qaysi davlati dengizga chiqmaydi?',
      hint: 'Hindixitoy ichkarisida.',
      explanation: 'Laos.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Laos', 'Vyetnam', 'Kambodja', 'Myanma'], answerIndex: 0 } }
    },
    {
      id: 'g29q3',
      prompt: 'Janubi-sharqiy Osiyoda nechta davlat bor?',
      hint: 'Oʻndan bitta koʻp.',
      explanation: '11 ta.',
      widget: { type: 'number_answer', props: { answer: 11, unit: 'ta' } }
    },
    {
      id: 'g29q4',
      prompt: 'Davlatni poytaxti bilan juftlang.',
      hint: 'Tailand — Bangkok.',
      explanation: 'Vyetnam — Xanoy; Tailand — Bangkok; Malayziya — Kuala-Lumpur; Laos — Vyentyan.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Vyetnam', right: 'Xanoy' },
            { left: 'Tailand', right: 'Bangkok' },
            { left: 'Malayziya', right: 'Kuala-Lumpur' },
            { left: 'Laos', right: 'Vyentyan' }
          ]
        }
      }
    },
    {
      id: 'g29q5',
      prompt: 'Janubi-sharqiy Osiyo qaysi metall zaxirasi boʻyicha jahonda birinchi?',
      hint: 'Qalay-volfram belbogʻi.',
      explanation: 'Qalay.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qalay', 'temir', 'nikel', 'platina'], answerIndex: 0 } }
    },
    {
      id: 'g29q6',
      prompt: 'Yangi sanoatlashgan davlatlarni tanlang.',
      hint: 'Uchtasi Janubi-sharqiy Osiyoda, biri Sharqiyda.',
      explanation: 'Singapur, Tailand, Malayziya va Koreya Respublikasi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Singapur', correct: true },
            { label: 'Malayziya', correct: true },
            { label: 'Koreya Respublikasi', correct: true },
            { label: 'Mongoliya' },
            { label: 'Laos' }
          ]
        }
      }
    },
    {
      id: 'g29q7',
      prompt: 'Sharqiy Osiyodagi yagona monarxiya qaysi?',
      hint: 'Imperator.',
      explanation: 'Yaponiya.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Yaponiya', 'Xitoy', 'Mongoliya', 'Koreya Respublikasi'], answerIndex: 0 } }
    },
    {
      id: 'g29q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Geveya — kauchuk.',
      explanation: 'Geveyadan tabiiy kauchuk olinadi; Yaponiya va Koreya Respublikasida keksalar ulushi oshmoqda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Geveyadan tabiiy kauchuk olinadi.', value: true },
            { text: 'Yaponiyada keksa aholining ulushi oshib bormoqda.', value: true },
            { text: 'Mongoliya Tinch okeaniga bevosita chiqadi.', value: false },
            { text: 'Janubi-sharqiy Osiyoda asosiy ekin — bugʻdoy.', value: false }
          ]
        }
      }
    }
  ]
};
