import type { BoardLesson } from './types';

export const JH1 = { kicker: 'Jahon tarixi · I bob', title: 'XX asr oxiri – XXI asr boshida dunyo' };

/** Darslik: Jahon tarixi 11, 1-mavzu (4–8-betlar) — ikki qutbli dunyoning barham topishi, mintaqaviy mojarolar, koʻpqutbli dunyo, G-20, yangi xavf-xatarlar. */
export const TARIX_101: BoardLesson = {
  n: 101,
  label: '1',
  group: JH1,
  title: 'XX asr oxiri – XXI asr boshida xalqaro munosabatlar',
  section: 'Jahon tarixi, 1-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ikkinchi jahon urushidan keyin dunyo ikki blokka boʻlingan edi: AQSh boshchiligidagi kapitalistik va SSSR boshchiligidagi sotsialistik blok. 1990-yillar boshida Sharqiy Yevropada sotsializm barbod boʻldi, SSSR tarqaldi va «ikki qutbli dunyo» tugadi. Global urush xavfi kamaydi, lekin uning oʻrnini mintaqaviy mojarolar va «kichik urushlar» xavfi egalladi — sobiq Yugoslaviya, Yaqin Sharq, Afrikaning bir qator mamlakatlarida.",
      easy: "1990-yillar: SSSR tarqaldi, ikki qutbli dunyo tugadi; mintaqaviy mojarolar koʻpaydi.",
      draw: [
        { t: 'title', text: 'Dunyo qanday oʻzgardi' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'ikki qutbli dunyo', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'bir qutbli dunyo', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'koʻpqutbli dunyo', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: '1990-yillar → XXI asr boshi', size: 's' }
      ],
      next: 'Koʻpqutbli dunyo'
    },
    {
      kind: 'explain',
      clear: true,
      say: "SSSR tarqalgach, bir muddat AQSh yagona yetakchi davlat boʻlib qoldi. XXI asr boshida esa Xitoy, Hindiston, Braziliya, Turkiya kabi tez rivojlanayotgan davlatlar kuchaydi — koʻpqutbli dunyo shakllana boshladi. 2008–2009-yillardagi jahon moliyaviy inqirozidan keyin dunyo iqtisodiyotining 20 ta eng yirik mamlakatini birlashtirgan G-20 guruhi faollashdi: ularga jahon yalpi mahsulotining 80 foizi va aholining uchdan ikki qismi toʻgʻri keladi. Xalqaro terrorizm eng xavfli muammolardan biriga aylandi.",
      easy: "Koʻpqutbli dunyo; G-20 — jahon YIMning 80 %; terrorizm — katta xavf.",
      draw: [
        { t: 'title', text: 'G-20 ulushi, %' },
        { t: 'bars', x: 6, y: 18, w: 56, h: 34, items: [{ label: 'jahon YIM', value: 80 }, { label: 'aholi', value: 67 }] },
        { t: 'text', x: 66, y: 28, text: '2008–2009:', size: 's', color: 'red' },
        { t: 'text', x: 66, y: 36, text: 'moliyaviy inqiroz', size: 's', color: 'red' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1990-yillar boshida sotsialistik tizim barbod boʻldi, SSSR tarqaldi va ikki qutbli dunyo tugadi; global urush oʻrnini mintaqaviy mojarolar xavfi egalladi.',
    'XXI asr boshida Xitoy, Hindiston, Braziliya kabi davlatlar kuchayib, koʻpqutbli dunyo shakllana boshladi.',
    'G-20 jahon YIMning 80 % va aholining 2/3 qismini birlashtiradi; xalqaro terrorizm — eng xavfli global muammolardan biri.'
  ],
  questions: [
    {
      id: 'j1q1',
      prompt: 'Dunyo tuzilishi bosqichlarini tartiblang.',
      hint: 'Sovuq urush davri — birinchi.',
      explanation: 'Ikki qutbli dunyo (sovuq urush) → bir qutbli dunyo (1990-yillar) → koʻpqutbli dunyo (XXI asr).',
      widget: { type: 'order_line', props: { items: [{ label: 'ikki qutbli dunyo' }, { label: 'bir qutbli dunyo' }, { label: 'koʻpqutbli dunyo' }] } }
    },
    {
      id: 'j1q2',
      prompt: 'G-20 mamlakatlariga jahon yalpi ichki mahsulotining necha foizi toʻgʻri keladi?',
      hint: 'Toʻrtdan uch qismidan koʻp.',
      explanation: '80 %.',
      widget: { type: 'number_answer', props: { answer: 80, unit: '%' } }
    },
    {
      id: 'j1q3',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Integratsiya — birlashish.',
      explanation: 'Globallashuv — davlatlarning yaqinlashish jarayoni; koʻpqutbli dunyo — bir nechta teng markaz; uchinchi dunyo — sovuq urushda bloklarga kirmagan davlatlar.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'globallashuv', right: 'davlatlarning yaqinlashish jarayoni' },
            { left: 'koʻpqutbli dunyo', right: 'bir nechta teng kuch markazi' },
            { left: 'uchinchi dunyo', right: 'bloklarga kirmagan davlatlar' }
          ]
        }
      }
    },
    {
      id: 'j1q4',
      prompt: 'XXI asrda tez kuchaygan davlatlarni tanlang.',
      hint: 'Koʻpqutbli dunyo markazlari.',
      explanation: 'Xitoy, Hindiston, Braziliya, Turkiya va boshqalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Xitoy', correct: true },
            { label: 'Hindiston', correct: true },
            { label: 'Braziliya', correct: true },
            { label: 'Turkiya', correct: true },
            { label: 'SSSR' }
          ]
        }
      }
    },
    {
      id: 'j1q5',
      prompt: 'Ikki qutbli dunyo tugagach qaysi xavf kuchaydi?',
      hint: '«Kichik urushlar».',
      explanation: 'Mintaqaviy mojarolar va lokal urushlar xavfi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['jahon urushi', 'mintaqaviy mojarolar', 'muzlik davri', 'yangi blok tuzilishi'], answerIndex: 1 } }
    },
    {
      id: 'j1q6',
      prompt: 'Jahon moliyaviy inqirozi qaysi yillarda boʻlgan?',
      hint: 'XXI asrning birinchi oʻn yilligi oxiri.',
      explanation: '2008–2009-yillarda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1991–1992', '1997–1998', '2008–2009', '2014–2015'], answerIndex: 2 } }
    },
    {
      id: 'j1q7',
      prompt: 'Darslikka koʻra hozirgi davrning eng xavfli global muammosi qaysi?',
      hint: 'Butun dunyoga tahdid.',
      explanation: 'Xalqaro terrorizm.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['xalqaro terrorizm', 'turizm', 'sport', 'kosmos'], answerIndex: 0 } }
    },
    {
      id: 'j1q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Jahon tarixining uchinchi bosqichi — 1991-yildan.',
      explanation: 'Eng yangi davrning uchinchi bosqichi 1991-yildan boshlanadi; G-20 aholining 2/3 qismini birlashtiradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Jahon tarixi eng yangi davrining uchinchi bosqichi 1991-yildan boshlanadi.', value: true },
            { text: 'G-20 mamlakatlarida Yer aholisining 2/3 qismi yashaydi.', value: true },
            { text: 'SSSR tarqalgach global mojarolar butunlay yoʻqoldi.', value: false },
            { text: 'Koʻpqutbli dunyo 1950-yillarda shakllangan.', value: false }
          ]
        }
      }
    }
  ]
};
