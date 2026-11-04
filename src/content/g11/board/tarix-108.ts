import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 8-mavzu (38–43-betlar) — Markaziy Osiyo davlatlari: Qozogʻiston, Turkmaniston, Tojikiston, Qirgʻiziston. */
export const TARIX_108: BoardLesson = {
  n: 108,
  label: '8',
  group: JH2,
  title: 'Markaziy Osiyo davlatlari',
  section: 'Jahon tarixi, 8-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oʻzbekistondan tashqari Markaziy Osiyoga Qozogʻiston, Turkmaniston, Tojikiston va Qirgʻiziston kiradi. Qozogʻiston 1991-yil 16-dekabrda mustaqil boʻldi, Nursulton Nazarboyev birinchi prezident etib saylandi. 1993-yilda milliy valyuta — tenge joriy qilindi, poytaxt Aqmolaga koʻchirildi va u 1998-yildan Ostona deb ataldi. Iqtisodiyotning tayanchi — neft, gaz va metallurgiya. Turkmaniston 1991-yil oktabrdagi referendumda mustaqillikni tanladi; Saparmurod Niyozov 1999-yildan umrbod davlat boshligʻi boʻldi, 2006-yilda vafotidan keyin Gurbanguli Berdimuhamedov prezident boʻldi. Mamlakat gaz qazib chiqarish hisobiga rivojlanmoqda.",
      easy: "Qozogʻiston: Nazarboyev, tenge, Ostona, neft. Turkmaniston: Niyozov → Berdimuhamedov, gaz.",
      draw: [
        { t: 'title', text: 'Qozogʻiston va Turkmaniston' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'Qozogʻiston', 'Turkmaniston'], ['mustaqillik', '1991, dekabr', '1991, oktabr'], ['rahbar', 'N. Nazarboyev', 'S. Niyozov'], ['keyin', '—', 'Berdimuhamedov'], ['boylik', 'neft, metallar', 'tabiiy gaz']] }
      ],
      next: 'Tojikiston va Qirgʻiziston'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tojikiston 1991-yil 9-sentabrda mustaqillikni eʼlon qildi, ammo tez orada ogʻir fuqarolar urushiga duch keldi; urush koʻp qurbonlar va iqtisodiy vayronalarga olib keldi. Qirgʻiziston 1991-yil 31-avgustda mustaqil boʻldi, birinchi prezident Asqar Akayev 15 yil boshqardi. 2005-yildagi «Lolalar inqilobi» uni hokimiyatdan agʻdardi, 2010-yilgi «Aprel inqilobi» esa K. Bakiyevni. Shu yili iyunda Oʻsh va Jalolobodda oʻzbek jamoalariga qarshi qonli voqealar boʻldi. Keyin A. Atambayev, 2017-yildan S. Jeenbekov prezident boʻldi. 2017-yilda Oʻzbekiston va Qirgʻiziston prezidentlarining tashriflari munosabatlarni keskin yaxshiladi.",
      easy: "Tojikiston — fuqarolar urushi. Qirgʻiziston: Akayev → 2005 «Lolalar» → 2010 «Aprel» → Atambayev → Jeenbekov.",
      draw: [
        { t: 'title', text: 'Qirgʻizistonda hokimiyat' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 28, h: 10, text: 'A. Akayev', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 20, w: 28, h: 10, text: 'K. Bakiyev', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 20, w: 28, h: 10, text: 'A. Atambayev', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b', label: '2005' },
        { t: 'arrow', from: 'b', to: 'c', label: '2010' },
        { t: 'text', x: 4, y: 44, text: '2005 — «Lolalar inqilobi»', size: 's' },
        { t: 'text', x: 4, y: 52, text: '2010 — «Aprel inqilobi»', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Qozogʻiston (N. Nazarboyev) neft, gaz va metallurgiya hisobiga tez rivojlandi; 1993-yilda tenge joriy etildi, poytaxt Ostonaga koʻchirildi.',
    'Turkmanistonda S. Niyozov umrbod hukmdor boʻldi, 2006-yildan G. Berdimuhamedov; Tojikiston mustaqillikning ilk yillarida fuqarolar urushini boshdan kechirdi.',
    'Qirgʻizistonda 2005 va 2010-yillarda ikki marta hokimiyat agʻdarildi; 2017-yilda Oʻzbekiston bilan munosabatlar keskin yaxshilandi.'
  ],
  questions: [
    {
      id: 'j8q1',
      prompt: 'Davlatni birinchi rahbari bilan juftlang.',
      hint: 'Akayev — Qirgʻiziston.',
      explanation: 'Qozogʻiston — N. Nazarboyev; Turkmaniston — S. Niyozov; Qirgʻiziston — A. Akayev.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Qozogʻiston', right: 'N. Nazarboyev' },
            { left: 'Turkmaniston', right: 'S. Niyozov' },
            { left: 'Qirgʻiziston', right: 'A. Akayev' }
          ]
        }
      }
    },
    {
      id: 'j8q2',
      prompt: 'Qirgʻizistondagi voqealarni tartiblang.',
      hint: 'Mustaqillik — 1991.',
      explanation: 'Mustaqillik (1991) → «Lolalar inqilobi» (2005) → «Aprel inqilobi» (2010) → S. Jeenbekov prezident (2017).',
      widget: { type: 'order_line', props: { items: [{ label: 'mustaqillik eʼlon qilindi' }, { label: '«Lolalar inqilobi»' }, { label: '«Aprel inqilobi»' }, { label: 'S. Jeenbekov prezident' }] } }
    },
    {
      id: 'j8q3',
      prompt: 'Qozogʻistonning milliy valyutasi qanday ataladi?',
      hint: '1993-yil noyabrda joriy qilingan.',
      explanation: 'Tenge.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['soʻm', 'tenge', 'manat', 'somoniy'], answerIndex: 1 } }
    },
    {
      id: 'j8q4',
      prompt: 'Faktni davlatga ajrating.',
      hint: '«Ruhnoma» — Turkmaniston.',
      explanation: 'Qozogʻiston — tenge, Ostona; Turkmaniston — «Ruhnoma», gaz; Qirgʻiziston — «Lolalar inqilobi», oltin qazib olish.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'q', label: 'Qozogʻiston' }, { id: 't', label: 'Turkmaniston' }, { id: 'k', label: 'Qirgʻiziston' }],
          items: [
            { emoji: '🏙️', label: 'poytaxt Ostonaga koʻchirildi', bin: 'q' },
            { emoji: '💴', label: 'tenge', bin: 'q' },
            { emoji: '📕', label: '«Ruhnoma» kitobi', bin: 't' },
            { emoji: '🔥', label: 'gaz qazib chiqarish', bin: 't' },
            { emoji: '🌷', label: '«Lolalar inqilobi»', bin: 'k' },
            { emoji: '🥇', label: 'oltin qazib olish', bin: 'k' }
          ]
        }
      }
    },
    {
      id: 'j8q5',
      prompt: 'Qozogʻistonning yangi poytaxti 1998-yildan qanday nom bilan atalgan?',
      hint: 'Avval Aqmola edi.',
      explanation: 'Ostona.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Olmaota', 'Ostona', 'Qaragʻanda', 'Chimkent'], answerIndex: 1 } }
    },
    {
      id: 'j8q6',
      prompt: 'Mustaqillikning dastlabki yillarida fuqarolar urushini boshdan kechirgan davlat qaysi?',
      hint: '1991-yil 9-sentabrda mustaqil boʻlgan.',
      explanation: 'Tojikiston.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Qozogʻiston', 'Turkmaniston', 'Tojikiston', 'Qirgʻiziston'], answerIndex: 2 } }
    },
    {
      id: 'j8q7',
      prompt: 'S. Niyozov vafot etgan yilni kiriting.',
      hint: 'Undan keyin Berdimuhamedov prezident boʻlgan.',
      explanation: '2006-yil.',
      widget: { type: 'number_answer', props: { answer: 2006, unit: 'yil' } }
    },
    {
      id: 'j8q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '2017 — yaxshi qoʻshnichilik.',
      explanation: 'Qozogʻiston iqtisodiyoti neft, gaz va metallurgiyaga tayanadi; 2017-yilgi tashriflar Oʻzbekiston–Qirgʻiziston munosabatlarini yaxshiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qozogʻiston iqtisodiyoti asosan neft, gaz va metallurgiyaga tayanadi.', value: true },
            { text: '2017-yilgi tashriflar Oʻzbekiston va Qirgʻiziston munosabatlarini yaxshiladi.', value: true },
            { text: 'Turkmaniston MDHga hech qachon aʼzo boʻlmagan.', value: false },
            { text: 'A. Akayev Qirgʻizistonni 30 yil boshqargan.', value: false }
          ]
        }
      }
    }
  ]
};
