import type { BoardLesson } from './types';
import { UZ8 } from './tarix-17';

/** Darslik: Oʻzbekiston tarixi 11, 18-mavzu (113–119-betlar) — Markaziy Osiyo hamdoʻstligi, Orol muammosi boʻyicha uchrashuvlar, Qozogʻiston, Qirgʻiziston, Tojikiston, Turkmaniston bilan munosabatlar, 2017-yilgi yangi davr. */
export const TARIX_18: BoardLesson = {
  n: 18,
  label: '18',
  group: UZ8,
  title: 'Markaziy Osiyo mamlakatlari bilan hamkorlik',
  section: 'Oʻzbekiston tarixi, 18-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Markaziy Osiyodagi besh davlatni umumiy tarix, madaniyat, til va din birlashtiradi. 1993-yil yanvarda Toshkentda besh davlat rahbarlari uchrashib, Markaziy Osiyo hamdoʻstligiga asos soldi; keyingi yillarda Orol dengizi muammosi boʻyicha bir necha uchrashuv oʻtkazildi. 2017-yildan qoʻshnilar bilan munosabatlarda yangi davr boshlandi: Prezident Shavkat Mirziyoyevning birinchi xorijiy rasmiy tashrifi 2017-yil martda Turkmanistonga boʻldi, keyin Qozogʻiston, Qirgʻiziston va Tojikiston bilan oliy darajadagi uchrashuvlar boʻldi.",
      easy: "1993 — Markaziy Osiyo hamdoʻstligi; 2017 — qoʻshnilar bilan yangi davr.",
      draw: [
        { t: 'title', text: 'Besh qoʻshni' },
        { t: 'box', id: 'u', x: 36, y: 34, w: 28, h: 9, text: 'Oʻzbekiston', color: 'blue' },
        { t: 'box', id: 'q', x: 36, y: 16, w: 28, h: 8, text: 'Qozogʻiston', color: 'green' },
        { t: 'box', id: 'k', x: 70, y: 28, w: 26, h: 8, text: 'Qirgʻiziston', color: 'orange' },
        { t: 'box', id: 't', x: 70, y: 46, w: 26, h: 8, text: 'Tojikiston', color: 'purple' },
        { t: 'box', id: 'm', x: 4, y: 40, w: 28, h: 8, text: 'Turkmaniston', color: 'red' },
        { t: 'arrow', from: 'u', to: 'q' },
        { t: 'arrow', from: 'u', to: 'k' },
        { t: 'arrow', from: 'u', to: 't' },
        { t: 'arrow', from: 'u', to: 'm' }
      ],
      next: 'Muhim voqealar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Qozogʻiston bilan 1998-yilda abadiy doʻstlik shartnomasi, 2001-yilda chegara shartnomasi, 2013-yilda strategik sheriklik shartnomasi imzolandi. Qirgʻiziston bilan 2017-yilda chegaraning 85 foizi boʻyicha bitim tuzilib, 7 yil yopiq turgan postlar ochildi. Tojikiston bilan 2017-yilda 25 yillik tanaffusdan keyin Toshkent–Dushanbe aviaqatnovi tiklandi. Turkmaniston bilan 2017-yil martda strategik sheriklik shartnomasi imzolandi.",
      easy: "Qozogʻiston — 1998 abadiy doʻstlik; 2017 — Qirgʻiziston chegarasi, Dushanbe reysi, Turkmaniston sherikligi.",
      draw: [
        { t: 'title', text: 'Muhim voqealar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1993', 'Markaziy Osiyo hamdoʻstligi'], ['1998', 'Qozogʻiston: abadiy doʻstlik'], ['2017-yil mart', 'Turkmaniston: strategik sheriklik'], ['2017-yil aprel', 'Toshkent–Dushanbe reysi'], ['2017-yil sentabr', 'Qirgʻiziston: chegara bitimi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Markaziy Osiyo besh davlatini umumiy tarix, madaniyat, til va din birlashtiradi; 1993-yilda Toshkentda Markaziy Osiyo hamdoʻstligiga asos solindi.',
    'Qozogʻiston bilan abadiy doʻstlik (1998), chegara (2001) va strategik sheriklik (2013) shartnomalari imzolandi.',
    '2017-yildan yangi davr: ilk xorijiy tashrif — Turkmaniston, Qirgʻiziston bilan chegara bitimi va postlar ochilishi, Dushanbe bilan aviaqatnov tiklanishi.'
  ],
  questions: [
    {
      id: 't18q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Hamdoʻstlik — eng oldin.',
      explanation: 'Markaziy Osiyo hamdoʻstligi (1993) → Qozogʻiston bilan abadiy doʻstlik (1998) → Qozogʻiston bilan chegara shartnomasi (2001) → Turkmaniston bilan strategik sheriklik (2017).',
      widget: { type: 'order_line', props: { items: [{ label: 'Markaziy Osiyo hamdoʻstligi' }, { label: 'Qozogʻiston bilan abadiy doʻstlik' }, { label: 'Qozogʻiston bilan chegara shartnomasi' }, { label: 'Turkmaniston bilan strategik sheriklik' }] } }
    },
    {
      id: 't18q2',
      prompt: 'Davlatni 2017-yilgi voqea bilan juftlang.',
      hint: 'Reys — Dushanbe.',
      explanation: 'Turkmaniston — ilk xorijiy rasmiy tashrif; Tojikiston — aviaqatnov tiklandi; Qirgʻiziston — chegara postlari ochildi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Turkmaniston', right: 'Prezidentning ilk xorijiy tashrifi' },
            { left: 'Tojikiston', right: 'aviaqatnov tiklandi' },
            { left: 'Qirgʻiziston', right: 'chegara postlari ochildi' }
          ]
        }
      }
    },
    {
      id: 't18q3',
      prompt: 'Toshkent–Dushanbe aviaqatnovi necha yillik tanaffusdan keyin tiklandi?',
      hint: 'Chorak asr.',
      explanation: '25 yildan keyin, 2017-yil aprelda.',
      widget: { type: 'number_answer', props: { answer: 25, unit: 'yil' } }
    },
    {
      id: 't18q4',
      prompt: 'Markaziy Osiyo hamdoʻstligiga qaysi shaharda asos solingan?',
      hint: '1993-yil yanvar.',
      explanation: 'Toshkentda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Olmaotada', 'Toshkentda', 'Bishkekda', 'Ashxobodda'], answerIndex: 1 } }
    },
    {
      id: 't18q5',
      prompt: 'Markaziy Osiyo xalqlarini birlashtiradigan omillarni tanlang.',
      hint: 'Toʻrt omil.',
      explanation: 'Umumiy tarix, madaniyat, til va din.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'umumiy tarix', correct: true },
            { label: 'madaniyat', correct: true },
            { label: 'til', correct: true },
            { label: 'din', correct: true },
            { label: 'umumiy dengiz porti' }
          ]
        }
      }
    },
    {
      id: 't18q6',
      prompt: 'Davlat rahbarlarining Orol muammosiga bagʻishlangan uchrashuvlari qaysi shaharlarda boʻlgan?',
      hint: 'Qoraqalpogʻiston poytaxti ham.',
      explanation: 'Qizil Oʻrda, Nukus, Doshhovuz va boshqalarda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Parij va London', 'Qizil Oʻrda va Nukus', 'Moskva va Pekin', 'Tokio va Seul'], answerIndex: 1 } }
    },
    {
      id: 't18q7',
      prompt: '2010-yilda Qirgʻizistondagi voqealar paytida Oʻzbekiston qancha qochqinni qabul qildi?',
      hint: '100 mingdan ortiq.',
      explanation: '100 mingdan ortiq qochqinni.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1 mingga yaqin', '10 mingga yaqin', '100 mingdan ortiq', '1 milliondan ortiq'], answerIndex: 2 } }
    },
    {
      id: 't18q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Qozogʻistonda oʻzbeklar ham yashaydi.',
      explanation: 'Qozogʻistonda 550 mingga yaqin oʻzbek, Oʻzbekistonda bir millionga yaqin qozoq yashaydi; 2017-yilda Qirgʻiziston bilan chegaraning 85 % boʻyicha bitim tuzilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻzbekistonda bir millionga yaqin qozoq yashaydi.', value: true },
            { text: '2017-yilda Qirgʻiziston bilan chegaraning katta qismi boʻyicha bitim tuzildi.', value: true },
            { text: 'Prezidentning ilk xorijiy tashrifi AQShga boʻlgan.', value: false },
            { text: 'Markaziy Osiyo hamdoʻstligiga 2017-yilda asos solingan.', value: false }
          ]
        }
      }
    }
  ]
};
