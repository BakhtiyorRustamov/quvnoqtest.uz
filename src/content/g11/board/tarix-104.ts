import type { BoardLesson } from './types';

export const JH2 = { kicker: 'Jahon tarixi · II bob', title: '1991–2017-yillarda dunyo mamlakatlari' };

/** Darslik: Jahon tarixi 11, 4-mavzu (19–23-betlar) — Rossiya Federatsiyasi: Gaydar islohotlari, 1993-yil konstitutsiyasi, millatlararo munosabatlar, XXI asrdagi tashqi siyosat. */
export const TARIX_104: BoardLesson = {
  n: 104,
  label: '4',
  group: JH2,
  title: '1991–2017-yillarda Rossiya Federatsiyasi',
  section: 'Jahon tarixi, 4-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "SSSR tarqalgach, Rossiyada iqtisodiy islohotlarni Bosh vazir Yegor Gaydar boshladi. 1992-yil 1-yanvardan narxlar erkin qoʻyib yuborildi va keskin oshdi — bu «shok terapiyasi» deb ataldi. Ishlab chiqarish pasaydi, oilalar daromadining asosiy qismi oziq-ovqatga ketdi, 1999-yilga kelib tashqi qarz 130 milliard dollardan oshdi. Siyosatda ham keskinlik boʻldi: 1993-yilda prezident B. Yelsin bilan Oliy Sovet oʻrtasidagi toʻqnashuvdan keyin dekabrda yangi konstitutsiya qabul qilindi, Federatsiya Kengashi va Davlat Dumasi saylandi — sovet hokimiyat tizimi tugadi.",
      easy: "1992 — narxlar erkin; 1993 — yangi konstitutsiya, Davlat Dumasi; tashqi qarz 130 mlrd $.",
      draw: [
        { t: 'title', text: '1990-yillar: islohotlar' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: '1992: erkin narxlar', color: 'orange' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: '1993: konstitutsiya', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'Davlat Dumasi', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: '1999: tashqi qarz > 130 mlrd $', size: 's', color: 'red' }
      ],
      next: 'Federatsiya va XXI asr'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Rossiya — koʻpmillatli davlat. 1992-yil martda markaz bilan hududlar vakolatlarini belgilovchi Federativ shartnoma imzolandi; Tatariston 1994-yilda alohida shartnoma tuzdi, Checheniston bilan esa ogʻir urush boʻldi. 1999-yil dekabrda Yelsin isteʼfoga chiqdi, 2000-yil martda Vladimir Putin prezident etib saylandi va kuchli davlat hokimiyati yoʻlini tutdi. 2008-yilda Janubiy Osetiya atrofida Rossiya–Gruziya harbiy mojarosi boʻldi. 2014-yilda Qrimda oʻtkazilgan referendumdan keyin u Rossiya tarkibiga kiritildi; 2015-yildan Rossiya Suriyada terrorchi guruhlarga qarshi harbiy amaliyotlarda qatnashmoqda.",
      easy: "1992 — Federativ shartnoma; 2000 — Putin; 2008 — Gruziya bilan mojaro; 2014 — Qrim; 2015 — Suriya.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1992-yil mart', 'Federativ shartnoma'], ['2000-yil mart', 'V. Putin prezident'], ['2008-yil avgust', 'Gruziya bilan mojaro'], ['2014-yil mart', 'Qrimdagi referendum'], ['2015-yil sentabr', 'Suriyadagi amaliyot']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Y. Gaydar boshlagan «shok terapiyasi» (1992-yildan erkin narxlar) ogʻir kechdi: ishlab chiqarish pasaydi, tashqi qarz 130 mlrd dollardan oshdi.',
    '1993-yil dekabrda yangi konstitutsiya qabul qilinib, Federatsiya Kengashi va Davlat Dumasi saylandi — sovet hokimiyat tizimi tugadi.',
    '2000-yildan V. Putin kuchli davlat hokimiyati yoʻlini tutdi; 2008-yil Gruziya bilan mojaro, 2014-yil Qrim voqealari, 2015-yildan Suriyadagi amaliyot.'
  ],
  questions: [
    {
      id: 'j4q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Erkin narxlar — birinchi.',
      explanation: 'Narxlar erkin qoʻyildi (1992) → yangi konstitutsiya (1993) → Putin prezident (2000) → Gruziya bilan mojaro (2008) → Qrim voqealari (2014).',
      widget: { type: 'order_line', props: { items: [{ label: 'narxlar erkin qoʻyildi' }, { label: 'yangi konstitutsiya' }, { label: 'V. Putin prezident' }, { label: 'Gruziya bilan mojaro' }, { label: 'Qrim voqealari' }] } }
    },
    {
      id: 'j4q2',
      prompt: 'Rossiyadagi iqtisodiy islohotlarning «arxitektori» kim boʻlgan?',
      hint: 'Bosh vazir.',
      explanation: 'Yegor Gaydar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Y. Gaydar', 'M. Shaymiyev', 'V. Putin', 'L. Kravchuk'], answerIndex: 0 } }
    },
    {
      id: 'j4q3',
      prompt: '1999-yilga kelib Rossiyaning tashqi qarzi necha milliard dollardan oshgan?',
      hint: 'Yuzdan ortiq.',
      explanation: '130 mlrd dollardan.',
      widget: { type: 'number_answer', props: { answer: 130, unit: 'mlrd $' } }
    },
    {
      id: 'j4q4',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Duma — parlament palatasi.',
      explanation: '«Shok terapiyasi» — keskin iqtisodiy islohotlar; Davlat Dumasi — parlamentning quyi palatasi; Federativ shartnoma — markaz va hududlar vakolatlarini belgilaydi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«shok terapiyasi»', right: 'keskin iqtisodiy islohotlar' },
            { left: 'Davlat Dumasi', right: 'parlament palatasi' },
            { left: 'Federativ shartnoma', right: 'markaz va hudud vakolatlari' }
          ]
        }
      }
    },
    {
      id: 'j4q5',
      prompt: '1990-yillardagi iqtisodiy islohotlar oqibatlarini tanlang.',
      hint: 'Ogʻir kechdi.',
      explanation: 'Ishlab chiqarish pasaydi, narxlar oshdi, ishsizlik va tashqi qarz koʻpaydi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ishlab chiqarish pasaydi', correct: true },
            { label: 'narxlar keskin oshdi', correct: true },
            { label: 'tashqi qarz koʻpaydi', correct: true },
            { label: 'aholi tez koʻpaydi' }
          ]
        }
      }
    },
    {
      id: 'j4q6',
      prompt: 'Qaysi respublika 1994-yilda markaz bilan vakolatlarni taqsimlash haqida alohida shartnoma imzolagan?',
      hint: 'Prezidenti M. Shaymiyev.',
      explanation: 'Tatariston.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Yoqutiston', 'Tatariston', 'Checheniston', 'Boshqirdiston'], answerIndex: 1 } }
    },
    {
      id: 'j4q7',
      prompt: 'Sanani voqea bilan juftlang.',
      hint: 'Suriya — 2015.',
      explanation: '1993 — yangi konstitutsiya; 2008 — Gruziya bilan mojaro; 2015 — Suriyadagi harbiy amaliyot.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '1993', right: 'yangi konstitutsiya' },
            { left: '2008', right: 'Gruziya bilan mojaro' },
            { left: '2015', right: 'Suriyadagi amaliyot' }
          ]
        }
      }
    },
    {
      id: 'j4q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Duma saylovlari — 1993.',
      explanation: '1993-yil Duma saylovlari ilk bor partiya roʻyxatlari boʻyicha oʻtgan; Putin 2000-yil martda saylangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1993-yil Davlat Dumasiga saylovlar ilk bor partiya roʻyxatlari boʻyicha oʻtgan.', value: true },
            { text: 'V. Putin 2000-yil martda prezident etib saylangan.', value: true },
            { text: 'Federativ shartnomani barcha subyektlar, jumladan Checheniston ham imzolagan.', value: false },
            { text: '1990-yillardagi islohotlar oson va tez natija bergan.', value: false }
          ]
        }
      }
    }
  ]
};
