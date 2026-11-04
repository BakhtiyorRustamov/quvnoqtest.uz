import type { BoardLesson } from './types';
import { GEO10 } from './geografiya-31';

/** Darslik: Geografiya 10, 32-§ (141–146-betlar) — Oʻzbekistonning resurslari, aholisi, iqtisodiyot rivojlanish davrlari, sanoat, qishloq xoʻjaligi, transport, tashqi savdo va erkin iqtisodiy zonalar. */
export const GEO_32: BoardLesson = {
  n: 32,
  label: '32',
  group: GEO10,
  title: 'Ijtimoiy-iqtisodiy rivojlanish',
  section: '32-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oʻzbekiston boy tabiiy resurslarga ega: hududida 120 ga yaqin turdagi foydali qazilmalarning 2700 ga yaqin koni topilgan. Oltin, uran, mis, molibden zaxiralari boʻyicha mamlakat jahonda oldingi oʻrinlarda, tabiiy gaz zaxiralari ham katta; kaliy tuzlari va fosforitlar qazib olinadi. Yirik konlar asosan Navoiy, Toshkent, Qashqadaryo, Buxoro viloyatlari va Qoraqalpogʻistonda. Uzoq vegetatsiya davri va quyoshli kunlar paxtachilik, bogʻdorchilik, uzumchilik uchun qulay, lekin dehqonchilik sugʻorishga bogʻliq. Mustaqillikdan keyingi iqtisodiyot uch davrdan oʻtdi: 1991–1996 — eski xoʻjalik aloqalari uzilishi tufayli pasayish; 1997–2003 — barqarorlashuv va oʻsish boshlanishi; 2004-yildan — barqaror oʻsish.",
      easy: "120 turdagi qazilma, 2700 kon; oltin, uran, gaz; iqtisodiyot: pasayish → barqarorlashuv → oʻsish.",
      draw: [
        { t: 'title', text: 'Iqtisodiyot davrlari' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 28, h: 16, text: '1991–1996: pasayish', color: 'red' },
        { t: 'box', id: 'b', x: 36, y: 20, w: 28, h: 16, text: '1997–2003: barqarorlik', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 20, w: 28, h: 16, text: '2004-yildan: oʻsish', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' }
      ],
      next: 'Tarmoqlardagi oʻzgarishlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Iqtisodiyot tarkibi oʻzgardi: yalpi ichki mahsulotda sanoat ulushi oshdi, qishloq xoʻjaligi ulushi kamaydi. Sanoatda energetika, kimyo, rangli metallurgiya va mashinasozlik kuchaydi; 2016-yilda mashinasozlik sanoat mahsulotining qariyb beshdan birini berdi; avtomobilsozlik, kaliy oʻgʻitlari, farmatsevtika tarmoqlari paydo boʻldi. Qishloq xoʻjaligida paxta maydonlari qisqartirilib, gʻalla maydonlari kengaytirildi va don mustaqilligiga erishildi; sabzavot, meva, uzum yetishtirish koʻpaydi. Angren — Pop, Toshgʻuzor — Boysun — Qumqoʻrgʻon temir yoʻllari qurilib, yagona temir yoʻl tarmogʻi yaratildi; «Afrosiyob» tezyurar poyezdi qatnaydi. Eksportda paxta tolasining ulushi keskin kamayib, gaz, rangli metallar, oziq-ovqat va avtomobillar ulushi oshdi. Navoiy, Angren, Jizzax kabi erkin iqtisodiy zonalar tashkil etildi.",
      easy: "Sanoat ulushi oshdi, mashinasozlik yetakchi; don mustaqilligi; yagona temir yoʻl tarmogʻi; erkin iqtisodiy zonalar.",
      draw: [
        { t: 'title', text: 'Asosiy oʻzgarishlar' },
        { t: 'table', x: 4, y: 18, rows: [['soha', 'oʻzgarish'], ['sanoat', 'ulushi oshdi, avtomobilsozlik'], ['qishloq xoʻjaligi', 'don mustaqilligi'], ['transport', 'yagona temir yoʻl tarmogʻi'], ['eksport', 'paxta ulushi kamaydi'], ['EIZ', 'Navoiy, Angren, Jizzax']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Oʻzbekistonda 2700 ga yaqin foydali qazilma koni bor; oltin, uran, mis, molibden va tabiiy gaz zaxiralari katta; dehqonchilik sugʻorishga bogʻliq.',
    'Iqtisodiyot uch davrni bosib oʻtdi: pasayish (1991–1996), barqarorlashuv (1997–2003) va 2004-yildan oʻsish; sanoat ulushi oshib, mashinasozlik yetakchi tarmoqqa aylandi.',
    'Don mustaqilligiga erishildi, yagona temir yoʻl tarmogʻi yaratildi, eksport tarkibi xilma-xillashdi, erkin iqtisodiy zonalar tashkil etildi.'
  ],
  questions: [
    {
      id: 'g32q1',
      prompt: 'Iqtisodiyot davrlarini xronologik tartibda joylashtiring.',
      hint: 'Avval pasayish.',
      explanation: 'Pasayish (1991–1996) → barqarorlashuv (1997–2003) → barqaror oʻsish (2004-yildan).',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'iqtisodiy pasayish' }, { label: 'barqarorlashuv' }, { label: 'barqaror oʻsish' }] }
      }
    },
    {
      id: 'g32q2',
      prompt: 'Oʻzbekistonda taxminan nechta foydali qazilma koni topilgan?',
      hint: 'Ikki ming yetti yuz.',
      explanation: '2700 ga yaqin.',
      widget: { type: 'number_answer', props: { answer: 2700, unit: 'ta' } }
    },
    {
      id: 'g32q3',
      prompt: '1991–1996-yillardagi iqtisodiy pasayishning asosiy sababi nima?',
      hint: 'Sobiq Ittifoq.',
      explanation: 'Sobiq Ittifoq doirasidagi xoʻjalik aloqalarining uzilishi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['eski xoʻjalik aloqalarining uzilishi', 'qurgʻoqchilik', 'resurslarning tugashi', 'aholining kamayishi'], answerIndex: 0 } }
    },
    {
      id: 'g32q4',
      prompt: 'Oʻzbekistondagi erkin iqtisodiy zonalarni tanlang.',
      hint: 'Navoiy — birinchisi.',
      explanation: 'Navoiy, Angren, Jizzax, Urgut, Gʻijduvon, Qoʻqon, Hazorasp.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Navoiy', correct: true },
            { label: 'Angren', correct: true },
            { label: 'Jizzax', correct: true },
            { label: 'Chimyon' }
          ]
        }
      }
    },
    {
      id: 'g32q5',
      prompt: 'Qishloq xoʻjaligidagi islohotlar natijasida nimaga erishildi?',
      hint: 'Gʻalla.',
      explanation: 'Gʻalla maydonlari kengaytirilib, don mustaqilligiga erishildi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['don mustaqilligiga', 'paxta maydonlarining kengayishiga', 'sugʻorishdan voz kechishga', 'chorvachilikning yoʻqolishiga'], answerIndex: 0 } }
    },
    {
      id: 'g32q6',
      prompt: 'Temir yoʻlni u bogʻlagan hudud bilan juftlang.',
      hint: 'Angren — Pop — vodiy.',
      explanation: 'Angren — Pop — Fargʻona vodiysi; Toshgʻuzor — Boysun — Qumqoʻrgʻon — Surxondaryo; Uchquduq — Miskin — Nukus — Qoraqalpogʻiston va Xorazm.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Angren — Pop', right: 'Fargʻona vodiysi' },
            { left: 'Toshgʻuzor — Boysun — Qumqoʻrgʻon', right: 'Surxondaryo' },
            { left: 'Uchquduq — Miskin — Nukus', right: 'Qoraqalpogʻiston' }
          ]
        }
      }
    },
    {
      id: 'g32q7',
      prompt: 'Mustaqillik yillarida qaysi tarmoq sanoatda yetakchi oʻringa chiqdi?',
      hint: 'Avtomobillar.',
      explanation: 'Mashinasozlik — 2016-yilda sanoat mahsulotining qariyb beshdan biri.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['mashinasozlik', 'yengil sanoat', 'yogʻochsozlik', 'baliqchilik'], answerIndex: 0 } }
    },
    {
      id: 'g32q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Paxta ulushi kamaydi.',
      explanation: 'Eksportda paxta tolasining ulushi keskin kamaydi; YIMda sanoat ulushi oshdi, qishloq xoʻjaligi ulushi kamaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'YIMda sanoatning ulushi oshdi.', value: true },
            { text: '«Afrosiyob» — tezyurar poyezd.', value: true },
            { text: 'Eksportda paxta tolasining ulushi mustaqillik yillarida oshdi.', value: false },
            { text: 'Oʻzbekiston dehqonchiligi sugʻorishga deyarli bogʻliq emas.', value: false }
          ]
        }
      }
    }
  ]
};
