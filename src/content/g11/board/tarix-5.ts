import type { BoardLesson } from './types';

export const UZ3 = { kicker: 'Oʻzbekiston tarixi · III bob', title: 'Iqtisodiy islohotlar va ijtimoiy siyosat' };

/** Darslik: Oʻzbekiston tarixi 11, 5-mavzu (35–45-betlar) — «Oʻzbek modeli» va besh tamoyil, xususiylashtirish, milliy valuta soʻm, transport, avtomobilsozlik, agrar islohotlar. */
export const TARIX_5: BoardLesson = {
  n: 5,
  label: '5',
  group: UZ3,
  title: 'Oʻzbek modeli va iqtisodiy islohotlar',
  section: 'Oʻzbekiston tarixi, 5-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mustaqillikdan keyin Oʻzbekiston rejali sovet iqtisodiyotidan voz kechib, bozor iqtisodiyotiga oʻtishni tanladi. Har bir davlat oʻz yoʻlini topishi kerak, deb hisoblandi — bu yoʻl «Oʻzbek modeli» deb ataldi. Uning besh tamoyili: iqtisodning siyosatdan ustunligi, davlat — bosh islohotchi, qonun ustuvorligi, kuchli ijtimoiy siyosat va bozorga bosqichma-bosqich oʻtish. Davlat mulki asosan sotish yoʻli bilan xususiylashtirildi va mulkdorlar sinfi paydo boʻldi.",
      easy: "Oʻzbek modeli — bozorga oʻtishning besh tamoyili; davlat mulki xususiylashtirildi.",
      draw: [
        { t: 'title', text: 'Besh tamoyil' },
        { t: 'list', x: 4, y: 18, items: ['1. iqtisodning siyosatdan ustunligi', '2. davlat — bosh islohotchi', '3. qonun ustuvorligi', '4. kuchli ijtimoiy siyosat', '5. bosqichma-bosqich oʻtish'] }
      ],
      next: 'Muhim sanalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1991–1993-yillarda Oʻzbekiston hali rubl hududida edi. 1993-yil 1-noyabrda vaqtinchalik soʻm-kupon, 1994-yil 1-iyuldan esa milliy valuta — soʻm muomalaga kiritildi. Transport yangilandi: 1992-yilda «Oʻzbekiston havo yoʻllari», 1994-yilda «Oʻzbekiston temir yoʻllari» tuzildi; 2011-yildan tezyurar «Afrosiyob» poyezdi qatnaydi, 2016-yilda Qamchiq tunneli orqali Angren–Pop temir yoʻli ochildi. 1996-yilda Asakada Markaziy Osiyodagi birinchi avtomobil zavodi ishga tushdi. Qishloqda fermer xoʻjaliklari asosiy boʻgʻinga aylandi, gʻalla mustaqilligi taʼminlandi.",
      easy: "1994 — soʻm; 1996 — Asaka avtozavodi; 2011 — «Afrosiyob»; 2016 — Qamchiq tunneli.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1993', 'soʻm-kupon'], ['1994-yil 1-iyul', 'milliy valuta — soʻm'], ['1996', 'Asaka avtomobil zavodi'], ['2011', '«Afrosiyob» poyezdi'], ['2016', 'Angren–Pop, Qamchiq tunneli']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '«Oʻzbek modeli» — bozor iqtisodiyotiga oʻtishning oʻziga xos yoʻli, besh tamoyilga asoslangan; davlat mulki asosan sotish yoʻli bilan xususiylashtirildi.',
    'Soʻm-kupon 1993-yil noyabrda, milliy valuta soʻm 1994-yil 1-iyulda muomalaga kiritildi.',
    'Yangi transport (havo yoʻllari, temir yoʻllar, «Afrosiyob», Qamchiq tunneli), Asakadagi avtomobil zavodi (1996) va fermerlikka asoslangan agrar islohotlar amalga oshirildi.'
  ],
  questions: [
    {
      id: 't5q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Kupon soʻmdan oldin.',
      explanation: 'Soʻm-kupon (1993) → soʻm (1994) → Asaka avtozavodi (1996) → «Afrosiyob» poyezdi (2011).',
      widget: { type: 'order_line', props: { items: [{ label: 'soʻm-kupon' }, { label: 'milliy valuta soʻm' }, { label: 'Asaka avtomobil zavodi' }, { label: '«Afrosiyob» poyezdi' }] } }
    },
    {
      id: 't5q2',
      prompt: 'Milliy valuta — soʻm qaysi yilda muomalaga kiritilgan?',
      hint: '1-iyuldan.',
      explanation: '1994-yil 1-iyulda.',
      widget: { type: 'number_answer', props: { answer: 1994, unit: 'yil' } }
    },
    {
      id: 't5q3',
      prompt: '«Oʻzbek modeli» tamoyillarini tanlang.',
      hint: 'Beshtasidan toʻrttasi.',
      explanation: 'Iqtisodning siyosatdan ustunligi, davlat — bosh islohotchi, qonun ustuvorligi, kuchli ijtimoiy siyosat, bosqichma-bosqich oʻtish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'davlat — bosh islohotchi', correct: true },
            { label: 'qonun ustuvorligi', correct: true },
            { label: 'kuchli ijtimoiy siyosat', correct: true },
            { label: 'bozorga bosqichma-bosqich oʻtish', correct: true },
            { label: 'barcha narxlarni bir kunda erkinlashtirish' }
          ]
        }
      }
    },
    {
      id: 't5q4',
      prompt: 'Markaziy Osiyodagi birinchi avtomobil zavodi qayerda ishga tushgan?',
      hint: 'Andijon viloyati.',
      explanation: 'Asaka shahrida, 1996-yilda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Samarqandda', 'Asakada', 'Toshkentda', 'Navoiyda'], answerIndex: 1 } }
    },
    {
      id: 't5q5',
      prompt: 'Tashkilot yoki obyektni tuzilgan yili bilan juftlang.',
      hint: 'Havo yoʻllari — temir yoʻldan oldin.',
      explanation: '«Oʻzbekiston havo yoʻllari» — 1992; «Oʻzbekiston temir yoʻllari» — 1994; Qamchiq tunneli — 2016.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«Oʻzbekiston havo yoʻllari»', right: '1992' },
            { left: '«Oʻzbekiston temir yoʻllari»', right: '1994' },
            { left: 'Qamchiq tunneli', right: '2016' }
          ]
        }
      }
    },
    {
      id: 't5q6',
      prompt: 'Oʻzbekistonda davlat mulki asosan qanday usulda xususiylashtirildi?',
      hint: 'Chek usulidan voz kechildi.',
      explanation: 'Sotish yoʻli bilan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bepul cheklar bilan', 'sotish yoʻli bilan', 'musodara bilan', 'chet elga berish bilan'], answerIndex: 1 } }
    },
    {
      id: 't5q7',
      prompt: 'Agrar islohotlarning natijalarini tanlang.',
      hint: 'Qishloq xoʻjaligi.',
      explanation: 'Fermer xoʻjaliklari tuzildi, paxta yakkahokimligiga barham berildi, gʻalla mustaqilligi taʼminlandi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'fermer xoʻjaliklari tuzildi', correct: true },
            { label: 'gʻalla mustaqilligi taʼminlandi', correct: true },
            { label: 'paxta yakkahokimligiga barham berildi', correct: true },
            { label: 'barcha yer davlat xoʻjaligiga qaytarildi' }
          ]
        }
      }
    },
    {
      id: 't5q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Rubl hududi — 1991–1993.',
      explanation: '1991–1993-yillarda rubl muomalada edi; «Afrosiyob» — tezyurar poyezd.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1991–1993-yillarda Oʻzbekistonda rubl muomalada boʻlgan.', value: true },
            { text: '«Afrosiyob» — tezyurar yoʻlovchi poyezdi.', value: true },
            { text: 'Oʻzbekiston rejali iqtisodiyotni saqlab qolgan.', value: false },
            { text: 'Soʻm-kupon 2000-yilda kiritilgan.', value: false }
          ]
        }
      }
    }
  ]
};
