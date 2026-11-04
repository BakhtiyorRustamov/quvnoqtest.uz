import type { BoardLesson } from './types';
import { GEO9 } from './geografiya-28';

/** Darslik: Geografiya 10, 30-§ (129–136-betlar) — Markaziy Osiyo: geografik va geosiyosiy oʻrni, tabiati va resurslari, aholisi, xoʻjaligi, integratsiya omillari. */
export const GEO_30: BoardLesson = {
  n: 30,
  label: '30',
  group: GEO9,
  title: 'Markaziy Osiyo mamlakatlari',
  section: '30-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Markaziy Osiyo — Yevrosiyo ichkarisidagi besh davlat: Qozogʻiston, Qirgʻiziston, Tojikiston, Turkmaniston va Oʻzbekiston; ular 1991-yildan mustaqil. Birortasi ham okeanga chiqmaydi. Qozogʻiston — dengizga chiqmaydigan davlatlar ichida maydoni eng kattasi. Oʻzbekistonning oʻziga xosligi: na oʻzi, na biror qoʻshnisi dengizga tutashmaydi — bunday holat dunyoda yana faqat Lixtenshteynda bor. Qozogʻiston va Turkmaniston Kaspiyga tutash, Qirgʻiziston va Tojikiston esa baland togʻlarda joylashgan. Mintaqaning afzalligi — tranzitlik: u Yevropa va Osiyoni bogʻlaydi, tarixda Buyuk Ipak yoʻli shu yerdan oʻtgan. Neft — Qozogʻiston va Turkmaniston, gaz — Turkmaniston, Oʻzbekiston va Qozogʻiston; oltin, uran, mis zaxiralari ham katta.",
      easy: "5 davlat, hammasi okeanga chiqmaydi; Oʻzbekiston — ikki karra ichki davlat; tranzit oʻrni, Buyuk Ipak yoʻli.",
      draw: [
        { t: 'title', text: 'Markaziy Osiyo' },
        { t: 'box', id: 'kz', x: 4, y: 20, w: 28, h: 10, text: 'Qozogʻiston', color: 'blue' },
        { t: 'box', id: 'uz', x: 36, y: 20, w: 28, h: 10, text: 'Oʻzbekiston', color: 'green' },
        { t: 'box', id: 'tm', x: 68, y: 20, w: 28, h: 10, text: 'Turkmaniston', color: 'orange' },
        { t: 'box', id: 'kg', x: 20, y: 36, w: 28, h: 10, text: 'Qirgʻiziston', color: 'purple' },
        { t: 'box', id: 'tj', x: 52, y: 36, w: 28, h: 10, text: 'Tojikiston', color: 'red' },
        { t: 'text', x: 4, y: 56, text: 'Hech biri okeanga chiqmaydi', size: 's' }
      ],
      next: 'Aholi va xoʻjalik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Iqlimi keskin kontinental va qurgʻoqchil, hududning katta qismi choʻl, chalachoʻl va dasht. Amudaryo, Sirdaryo kabi yirik daryolar transchegaraviy boʻlib, Tojikiston va Qirgʻiziston togʻlaridan boshlanadi, shuning uchun bu ikki davlat suv va gidroenergetikaga boy. Aholi daryo vodiylari va vohalarda zich; aholi soni boʻyicha Oʻzbekiston yetakchi, Qozogʻiston esa eng siyrak. Millioner shaharlar — Toshkent va Almati. Qozogʻiston, Oʻzbekiston va Turkmaniston — industrial-agrar, Tojikiston va Qirgʻiziston — agrar-industrial davlatlar. Qozogʻiston — neft, Turkmaniston — gaz, Oʻzbekiston — oltin, uran, avtomobilsozlik; Tojikiston va Qirgʻizistonda elektr energiyasining asosiy qismi GESlarda olinadi. Integratsiyaga umumiy daryolar, yagona transport tizimi, qardosh xalqlar va Orol kabi umumiy ekologik muammolar undaydi.",
      easy: "Suv — togʻli Tojikiston va Qirgʻizistonda; neft — Qozogʻiston, gaz — Turkmaniston; millioner shaharlar — Toshkent, Almati.",
      draw: [
        { t: 'title', text: 'Ixtisoslashuv' },
        { t: 'table', x: 4, y: 18, rows: [['davlat', 'asosiy tarmoqlar'], ['Qozogʻiston', 'neft, metallurgiya, don'], ['Oʻzbekiston', 'gaz, oltin, avto, paxta'], ['Turkmaniston', 'tabiiy gaz, paxta, otlar'], ['Tojikiston', 'GES, alyuminiy, paxta'], ['Qirgʻiziston', 'GES, oltin, chorvachilik']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Markaziy Osiyo — 5 ta mustaqil davlat, hech biri okeanga chiqmaydi; Oʻzbekiston va uning barcha qoʻshnilari dengizga tutashmaydi; mintaqaning afzalligi — tranzit oʻrni.',
    'Iqlimi keskin kontinental, suv resurslari notekis: togʻli Tojikiston va Qirgʻiziston suvga boy, tekislikdagi davlatlar suv tanqis.',
    'Qozogʻiston — neft, Turkmaniston — gaz, Oʻzbekiston — oltin, uran, avtomobilsozlik va paxta; mintaqa davlatlarini umumiy daryolar, transport va ekologik muammolar birlashtiradi.'
  ],
  questions: [
    {
      id: 'g30q1',
      prompt: 'Markaziy Osiyo davlatlarini tanlang.',
      hint: 'Beshta.',
      explanation: 'Qozogʻiston, Qirgʻiziston, Tojikiston, Turkmaniston, Oʻzbekiston.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Qozogʻiston', correct: true },
            { label: 'Turkmaniston', correct: true },
            { label: 'Tojikiston', correct: true },
            { label: 'Afgʻoniston' },
            { label: 'Mongoliya' }
          ]
        }
      }
    },
    {
      id: 'g30q2',
      prompt: 'Oʻzbekistondan tashqari, oʻzi ham, qoʻshnilari ham dengizga chiqmaydigan yana qaysi davlat bor?',
      hint: 'Gʻarbiy Yevropadagi mitti davlat.',
      explanation: 'Lixtenshteyn.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Lixtenshteyn', 'Shveysariya', 'Mongoliya', 'Avstriya'], answerIndex: 0 } }
    },
    {
      id: 'g30q3',
      prompt: 'Davlatni yetakchi resursi bilan juftlang.',
      hint: 'Turkmaniston — gaz.',
      explanation: 'Qozogʻiston — neft; Turkmaniston — tabiiy gaz; Tojikiston — gidroenergetika.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Qozogʻiston', right: 'neft' },
            { left: 'Turkmaniston', right: 'tabiiy gaz' },
            { left: 'Tojikiston', right: 'gidroenergetika' }
          ]
        }
      }
    },
    {
      id: 'g30q4',
      prompt: 'Davlatni iqtisodiyot turiga koʻra ajrating.',
      hint: 'Togʻli davlatlar — agrar-industrial.',
      explanation: 'Industrial-agrar — Qozogʻiston, Oʻzbekiston, Turkmaniston; agrar-industrial — Tojikiston, Qirgʻiziston.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'ia', label: 'industrial-agrar' }, { id: 'ai', label: 'agrar-industrial' }],
          items: [
            { emoji: '🛢️', label: 'Qozogʻiston', bin: 'ia' },
            { emoji: '🚗', label: 'Oʻzbekiston', bin: 'ia' },
            { emoji: '🔥', label: 'Turkmaniston', bin: 'ia' },
            { emoji: '⛰️', label: 'Tojikiston', bin: 'ai' },
            { emoji: '🐑', label: 'Qirgʻiziston', bin: 'ai' }
          ]
        }
      }
    },
    {
      id: 'g30q5',
      prompt: 'Nima uchun Tojikiston va Qirgʻiziston suv resurslariga boy?',
      hint: 'Daryolar qayerdan boshlanadi?',
      explanation: 'Yirik daryolar ularning togʻlaridan boshlanadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yirik daryolar ularning togʻlaridan boshlanadi', 'ular Kaspiyga tutash', 'ularda yogʻin choʻllarda koʻp', 'ular okeanga chiqadi'], answerIndex: 0 } }
    },
    {
      id: 'g30q6',
      prompt: 'Markaziy Osiyodagi millioner shaharlarni tanlang.',
      hint: 'Ikkita.',
      explanation: 'Toshkent va Almati.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Toshkent', correct: true },
            { label: 'Almati', correct: true },
            { label: 'Bishkek' },
            { label: 'Ashxobod' }
          ]
        }
      }
    },
    {
      id: 'g30q7',
      prompt: 'Markaziy Osiyo nechta davlatdan iborat?',
      hint: 'Sobiq ittifoqdosh respublikalar.',
      explanation: '5 ta.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'ta' } }
    },
    {
      id: 'g30q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Qozogʻiston — siyrak.',
      explanation: 'Aholi soni boʻyicha Oʻzbekiston yetakchi; Qozogʻiston aholisi eng siyrak joylashgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Aholi soni boʻyicha Markaziy Osiyoda Oʻzbekiston yetakchi.', value: true },
            { text: 'Buyuk Ipak yoʻli hozirgi Markaziy Osiyo hududidan oʻtgan.', value: true },
            { text: 'Qozogʻiston — mintaqada aholisi eng zich joylashgan davlat.', value: false },
            { text: 'Turkmaniston elektr energiyasining asosiy qismini GESlarda oladi.', value: false }
          ]
        }
      }
    }
  ]
};
