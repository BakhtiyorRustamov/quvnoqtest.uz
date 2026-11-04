import type { BoardLesson } from './types';
import { UZ8 } from './tarix-17';

/** Darslik: Oʻzbekiston tarixi 11, 19-mavzu (120–123-betlar) — Rossiya, Xitoy va AQSh bilan munosabatlar: shartnomalar, strategik sheriklik, 2017-yilgi tashriflar. */
export const TARIX_19: BoardLesson = {
  n: 19,
  label: '19',
  group: UZ8,
  title: 'Rossiya, Xitoy va AQSh bilan munosabatlar',
  section: 'Oʻzbekiston tarixi, 19-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "2017-yilda Oʻzbekiston xorijiy davlatlar bilan 60 milliard dollarlik shartnomalar imzoladi — shuning 23 milliardi, yaʼni taxminan 35 foizi Xitoy bilan. Rossiyaga davlat tashrifi chogʻida esa 16 milliard dollarlik 55 ta hujjat imzolandi. Bu uch yirik davlat — Rossiya, Xitoy va AQSh — Oʻzbekistonning muhim hamkorlari. Har biri bilan munosabatlar mustaqillikning ilk yillaridan boshlangan.",
      easy: "2017: Xitoy bilan 23 mlrd $, Rossiya bilan 16 mlrd $ hujjatlar.",
      draw: [
        { t: 'title', text: '2017-yil kelishuvlari, mlrd $' },
        { t: 'bars', x: 6, y: 18, w: 56, h: 34, items: [{ label: 'Xitoy', value: 23 }, { label: 'Rossiya', value: 16 }] },
        { t: 'text', x: 66, y: 30, text: 'jami: 60 mlrd $', size: 's', color: 'purple' }
      ],
      next: 'Muhim sanalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Rossiya bilan 1992-yilda doʻstlik asoslari haqidagi shartnoma, 2004-yilda strategik sheriklik, 2005-yilda ittifoqchilik munosabatlari haqida shartnoma imzolandi. Xitoy Oʻzbekiston mustaqilligini 1991-yil 27-dekabrda tan oldi, diplomatik aloqalar 1992-yil yanvarda oʻrnatildi, 2012-yilda strategik sheriklik haqida bayonot qabul qilindi. AQSh bilan 1992-yilda diplomatik aloqa oʻrnatilib, Toshkentda AQSh elchixonasi ochildi; bugun ikki davlat strategik hamkorlar.",
      easy: "Rossiya: 2004 strategik sheriklik; Xitoy: 2012 strategik sheriklik; AQSh: 1992 elchixona.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['davlat', 'yil', 'voqea'], ['AQSh', '1992', 'elchixona ochildi'], ['Rossiya', '2004', 'strategik sheriklik'], ['Rossiya', '2005', 'ittifoqchilik shartnomasi'], ['Xitoy', '2012', 'strategik sheriklik']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Rossiya bilan doʻstlik (1992), strategik sheriklik (2004) va ittifoqchilik (2005) shartnomalari imzolandi; 2017-yildagi tashrifda 16 mlrd $ lik 55 hujjat.',
    'Xitoy mustaqillikni 1991-yil dekabrda tan oldi; 2012-yilda strategik sheriklik oʻrnatildi; 2017-yilda 23 mlrd $ lik 105 hujjat imzolandi.',
    'AQSh bilan 1992-yilda diplomatik aloqalar oʻrnatilib, Toshkentda elchixona ochildi; bugun ikki davlat strategik hamkorlar.'
  ],
  questions: [
    {
      id: 't19q1',
      prompt: 'Davlatni voqea bilan juftlang.',
      hint: 'Ittifoqchilik — Rossiya.',
      explanation: 'Rossiya — ittifoqchilik shartnomasi (2005); Xitoy — 2017-yilda 23 mlrd $ lik hujjatlar; AQSh — Toshkentda birinchi xorijiy elchixona (1992).',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Rossiya', right: 'ittifoqchilik shartnomasi (2005)' },
            { left: 'Xitoy', right: '23 mlrd $ lik hujjatlar (2017)' },
            { left: 'AQSh', right: 'Toshkentda ilk elchixona (1992)' }
          ]
        }
      }
    },
    {
      id: 't19q2',
      prompt: '2017-yilda Xitoy bilan necha milliard dollarlik hujjatlar imzolangan?',
      hint: 'Umumiy hajmning 35 %.',
      explanation: '23 mlrd $.',
      widget: { type: 'number_answer', props: { answer: 23, unit: 'mlrd $' } }
    },
    {
      id: 't19q3',
      prompt: 'Rossiya bilan shartnomalarni xronologik tartibda joylashtiring.',
      hint: 'Doʻstlik — eng birinchi.',
      explanation: 'Doʻstlik asoslari (1992) → strategik sheriklik (2004) → ittifoqchilik munosabatlari (2005) → strategik sheriklikni chuqurlashtirish deklaratsiyasi (2012).',
      widget: { type: 'order_line', props: { items: [{ label: 'doʻstlik asoslari shartnomasi' }, { label: 'strategik sheriklik shartnomasi' }, { label: 'ittifoqchilik munosabatlari shartnomasi' }, { label: 'sheriklikni chuqurlashtirish deklaratsiyasi' }] } }
    },
    {
      id: 't19q4',
      prompt: 'Xitoy Oʻzbekiston mustaqilligini qachon tan olgan?',
      hint: 'Mustaqillik yilining oxiri.',
      explanation: '1991-yil 27-dekabrda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1991-yil dekabrda', '1995-yilda', '2005-yilda', '2012-yilda'], answerIndex: 0 } }
    },
    {
      id: 't19q5',
      prompt: 'Oʻzbekiston bilan strategik sheriklik oʻrnatgan davlatlarni tanlang.',
      hint: 'Mavzudagi uch davlat.',
      explanation: 'Rossiya, Xitoy va AQSh — strategik hamkorlar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Rossiya', correct: true },
            { label: 'Xitoy', correct: true },
            { label: 'AQSh', correct: true },
            { label: 'Antarktida' }
          ]
        }
      }
    },
    {
      id: 't19q6',
      prompt: '2017-yilda Rossiyaga tashrif chogʻida nechta hujjat imzolangan?',
      hint: '16 mlrd $ lik.',
      explanation: '55 ta hujjat.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['5', '55', '105', '160'], answerIndex: 1 } }
    },
    {
      id: 't19q7',
      prompt: 'Shavkat Mirziyoyev AQSh Prezidenti Donald Tramp bilan ilk bor qayerda uchrashdi?',
      hint: 'Saudiya Arabistoni.',
      explanation: '2017-yil mayda Ar-Riyodda, AQSh va arab-musulmon davlatlari sammitida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Nyu-Yorkda', 'Ar-Riyodda', 'Moskvada', 'Pekinda'], answerIndex: 1 } }
    },
    {
      id: 't19q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'BMTda Registon maketi.',
      explanation: '2017-yilda BMT binosida Registon maydoni maketi oʻrnatildi; Toshkentda birinchi boʻlib AQSh elchixonasi ochilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'BMT binosida Registon maydonining maketi oʻrnatilgan.', value: true },
            { text: 'Toshkentda birinchi boʻlib AQSh elchixonasi ochilgan.', value: true },
            { text: 'Xitoy bilan diplomatik aloqalar 2010-yilda oʻrnatilgan.', value: false },
            { text: '2017-yildagi shartnomalarning eng kam ulushi Xitoyga toʻgʻri keladi.', value: false }
          ]
        }
      }
    }
  ]
};
