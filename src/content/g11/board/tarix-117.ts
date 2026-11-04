import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 17-mavzu (77–80-betlar) — Yaponiya: 1990-yillardagi iqtisod, R. Xasimotoning «olti islohoti», XXI asrdagi rivojlanish, 2011-yilgi zilzila, tashqi siyosat. */
export const TARIX_117: BoardLesson = {
  n: 117,
  label: '17',
  group: JH2,
  title: '1991–2017-yillarda Yaponiya',
  section: 'Jahon tarixi, 17-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1990-yillarda Yaponiya iqtisodiyotida davlatning ulushi kamaydi, asosiy «eksport» chet elga kapital chiqarish boʻldi: xorijdagi yapon sarmoyalari 1 trillion dollardan oshdi. Dunyodagi videoapparaturaning 90 foizi, sanoat robotlarining uchdan ikki qismi Yaponiyada ishlab chiqarilardi. 1997–1998-yillardagi «Osiyo inqirozi» qiyinchilik tugʻdirdi, ammo iqtisodiyot chidamli chiqdi. Siyosatda bir necha koalitsion hukumatdan keyin 1996-yilda Liberal-demokratik partiya yana hukumat tuzdi; bosh vazir Ryutaro Xasimoto soliq, taʼlim, ijtimoiy taʼminot, boshqaruv va boshqa sohalarda «olti islohot»ni eʼlon qildi.",
      easy: "Kapital eksporti > 1 trln $; videotexnikaning 90 %, robotlarning 2/3 qismi; 1996 — Xasimotoning «olti islohoti».",
      draw: [
        { t: 'title', text: 'Jahon ishlab chiqarishidagi ulush, %' },
        { t: 'bars', x: 6, y: 18, w: 50, h: 34, items: [{ label: 'videotexnika', value: 90 }, { label: 'sanoat robotlari', value: 67 }] },
        { t: 'text', x: 60, y: 26, text: '1990-yillar', size: 's' },
        { t: 'text', x: 60, y: 36, text: 'xorijiy sarmoya', size: 's', color: 'blue' },
        { t: 'text', x: 60, y: 44, text: '> 1 trln $', size: 's', color: 'blue' }
      ],
      next: 'XXI asrda Yaponiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "XXI asr boshida Yaponiya barqaror rivojlanmoqda: kemasozlik va traktorsozlik boʻyicha dunyoda birinchi, poʻlat, televizor va avtomobil ishlab chiqarishda yetakchilardan; YIM boʻyicha AQSH va Xitoydan keyin uchinchi oʻrinda. Orollardan iborat mamlakat tabiat ofatlariga koʻp duch keladi: 2011-yil martdagi zilziladan keyin minglab kishi halok boʻldi, 300 mingdan ortiq kishi boshpanasiz qoldi, Fukusima-1 atom elektr stansiyasi shikastlandi. Siyosatda LDP yetakchiligini saqladi: 2001-yildan Junitiro Koidzumi, 2012-yildan Sindzo Abe hukumatni boshqardi. Tashqi siyosatda AQSH — eng yaqin hamkor, Xitoy bilan munosabatlar murakkab.",
      easy: "YIM boʻyicha 3-oʻrin; 2011 — zilzila va Fukusima; Koidzumi (2001), Abe (2012); AQSH — asosiy hamkor.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1996', 'Xasimoto: «olti islohot»'], ['1997–1998', '«Osiyo inqirozi»'], ['2001', 'J. Koidzumi bosh vazir'], ['2011-yil mart', 'zilzila, Fukusima-1'], ['2012', 'S. Abe bosh vazir']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1990-yillarda Yaponiya kapital eksportchisiga aylandi (xorijda > 1 trln $), videotexnika va robotlar ishlab chiqarishda yetakchi boʻldi; «Osiyo inqirozi»ga bardosh berdi.',
    'Siyosatda LDP yetakchiligini saqladi: R. Xasimoto (1996, «olti islohot»), J. Koidzumi (2001), S. Abe (2012).',
    'XXI asrda Yaponiya YIM boʻyicha dunyoda 3-oʻrinda; 2011-yilgi zilzila va Fukusima avariyasi katta zarar keltirdi; AQSH — eng yaqin hamkor.'
  ],
  questions: [
    {
      id: 'j17q1',
      prompt: 'Bosh vazirlarni tartib boʻyicha joylashtiring.',
      hint: 'Xasimoto — 1996.',
      explanation: 'R. Xasimoto (1996) → K. Obuti → J. Koidzumi (2001) → S. Abe (2012).',
      widget: { type: 'order_line', props: { items: [{ label: 'Ryutaro Xasimoto' }, { label: 'Keydzo Obuti' }, { label: 'Junitiro Koidzumi' }, { label: 'Sindzo Abe' }] } }
    },
    {
      id: 'j17q2',
      prompt: '1990-yillarda dunyoda ishlab chiqarilgan videoapparaturaning necha foizi Yaponiyaga toʻgʻri kelgan?',
      hint: 'Deyarli hammasi.',
      explanation: '90 %.',
      widget: { type: 'number_answer', props: { answer: 90, unit: '%' } }
    },
    {
      id: 'j17q3',
      prompt: 'XXI asr boshida Yaponiya YIM boʻyicha dunyoda nechanchi oʻrinda?',
      hint: 'AQSH va Xitoydan keyin.',
      explanation: 'Uchinchi oʻrinda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['birinchi', 'ikkinchi', 'uchinchi', 'oʻninchi'], answerIndex: 2 } }
    },
    {
      id: 'j17q4',
      prompt: 'R. Xasimotoning «olti islohoti»ga kirgan sohalarni tanlang.',
      hint: 'Soliq, taʼlim...',
      explanation: 'Soliq, taʼlim, ijtimoiy taʼminot, iqtisodiyotda davlat boshqaruvini kamaytirish va boshqalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'soliq', correct: true },
            { label: 'taʼlim', correct: true },
            { label: 'ijtimoiy taʼminot', correct: true },
            { label: 'armiyani koʻpaytirish' }
          ]
        }
      }
    },
    {
      id: 'j17q5',
      prompt: '2011-yilgi zilzila natijasida qaysi atom elektr stansiyasi shikastlangan?',
      hint: 'Xonsyu oroli.',
      explanation: 'Fukusima-1.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Chernobil', 'Fukusima-1', 'Xirosima', 'Nagasaki'], answerIndex: 1 } }
    },
    {
      id: 'j17q6',
      prompt: 'Sohani Yaponiyaning dunyodagi oʻrni bilan juftlang.',
      hint: 'Kemasozlik — birinchi.',
      explanation: 'Kemasozlik — dunyoda 1-oʻrin; sanoat robotlari — jahonning 2/3 qismi (1990-yillar); YIM — 3-oʻrin.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'kemasozlik', right: 'dunyoda 1-oʻrin' },
            { left: 'sanoat robotlari', right: 'jahonning 2/3 qismi' },
            { left: 'YIM hajmi', right: 'dunyoda 3-oʻrin' }
          ]
        }
      }
    },
    {
      id: 'j17q7',
      prompt: 'Yaponiya tashqi siyosatida qaysi davlat eng yaqin hamkor hisoblanadi?',
      hint: 'Ikkinchi jahon urushidan beri.',
      explanation: 'AQSH.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Xitoy', 'AQSH', 'Shimoliy Koreya', 'Rossiya'], answerIndex: 1 } }
    },
    {
      id: 'j17q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'LDP — yetakchi partiya.',
      explanation: 'LDP 1990–2010-yillarda yetakchiligini asosan saqlagan; xorijdagi yapon sarmoyalari 1 trln dollardan oshgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Liberal-demokratik partiya Yaponiya siyosatida yetakchiligini saqlagan.', value: true },
            { text: 'Yaponiyaning xorijdagi sarmoyalari 1 trillion dollardan oshgan.', value: true },
            { text: 'Yaponiya tabiat ofatlariga kam duch keladi.', value: false },
            { text: 'Yaponiya va Xitoy munosabatlarida hech qanday muammo yoʻq.', value: false }
          ]
        }
      }
    }
  ]
};
