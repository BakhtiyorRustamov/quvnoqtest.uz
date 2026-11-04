import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';
import { rect } from './phys';

/** Darslik: Biologiya 11, 18-§ (102–106-betlar) va 2-laboratoriya — «10 % qoidasi» (Lindeman), ekologik piramida qoidasi (Elton), sonlar, biomassa va energiya piramidalari, piramidaga oid masalalar. */
export const BIO_18: BoardLesson = {
  n: 18,
  label: '18',
  group: BOB2,
  title: 'Ekologik piramida. Biomassa va energiya',
  section: '18-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Nega dunyoda yoʻlbarslar kam, chigirtkalar esa son-sanoqsiz? Nega oziq zanjiri oltita boʻgʻindan oshmaydi? Javob — har bir boʻgʻinda energiyaning katta qismi yoʻqoladi.",
      easy: "Har boʻgʻinda energiya yoʻqoladi — yirtqichlar kam.",
      draw: [
        { t: 'title', text: 'Nega yirtqichlar kam?' },
        { t: 'icon', x: 16, y: 34, emoji: '🐅', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🦗', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['yoʻlbarslar — kam', 'chigirtkalar — juda koʻp', 'zanjir — 6 boʻgʻingacha'] }
      ],
      next: '10 % qoidasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Isteʼmol qilingan oziqning hammasi hazm boʻlmaydi — 12 dan 75 foizgacha oʻzlashtiriladi. Oʻzlashtirilganining koʻp qismi nafas, harakat, issiqlik saqlashga sarflanadi. Natijada har bir trofik darajadan keyingisiga energiyaning faqat 10 foizi oʻtadi, 90 foizi yoʻqoladi. Amerikalik olim R. Lindeman buni «10 foiz qoidasi» deb atagan.",
      easy: "Har darajadan keyingisiga 10 % oʻtadi (Lindeman).",
      draw: [
        { t: 'title', text: '10 % qoidasi' },
        { t: 'box', id: 'a', x: 2, y: 26, w: 22, h: 8, text: '1000 kJ', color: 'green' },
        { t: 'box', id: 'b', x: 27, y: 26, w: 22, h: 8, text: '100 kJ' },
        { t: 'box', id: 'c', x: 52, y: 26, w: 22, h: 8, text: '10 kJ' },
        { t: 'box', id: 'd', x: 77, y: 26, w: 20, h: 8, text: '1 kJ', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' },
        { t: 'text', x: 4, y: 46, text: 'produtsent → I → II → III tartib', size: 's' },
        { t: 'text', x: 4, y: 58, text: 'R. Lindeman — «10 % qoidasi»', color: 'blue' }
      ],
      next: 'Piramida'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Har bir trofik darajadagi energiya, biomassa yoki individlar sonini toʻgʻri toʻrtburchaklar bilan tasvirlab ustma-ust qoʻysak — ekologik piramida hosil boʻladi. Bu qoidani 1927-yilda Ch. Elton aniqlagan. Piramida asosida produtsentlar, tepasida yirik yirtqichlar. Yuqoriga chiqqan sari individlar kamayadi, tana esa kattalashadi.",
      easy: "Ekologik piramida (Elton, 1927): asos keng — produtsentlar.",
      draw: [
        { t: 'title', text: 'Ekologik piramida' },
        ...rect('p1', 10, 56, 60, 7, 'green'),
        ...rect('p2', 22, 49, 36, 7, 'orange'),
        ...rect('p3', 31, 42, 18, 7, 'orange'),
        ...rect('p4', 36, 35, 8, 7, 'red'),
        { t: 'text', x: 74, y: 61, text: '1000 kg', size: 's' },
        { t: 'text', x: 74, y: 54, text: '100 kg', size: 's' },
        { t: 'text', x: 74, y: 47, text: '10 kg', size: 's' },
        { t: 'text', x: 74, y: 40, text: '1 kg', size: 's' },
        { t: 'text', x: 4, y: 26, text: 'Ch. Elton, 1927', color: 'blue' }
      ],
      next: 'Uch xil piramida'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Uch xil piramida bor. Sonlar piramidasi — individlar soni; oʻrmonda u teskari boʻlishi mumkin: bitta daraxtda minglab hasharot. Biomassa piramidasi — quruq massa; suvda teskari: fitoplankton biomassasi zooplanktondan kam, chunki u kichik va tez yangilanadi. Energiya piramidasi har doim toʻgʻri shaklda — u energiya oqimini, ya'ni ekotizim ishlashini toʻliq koʻrsatadi.",
      easy: "Sonlar va biomassa — teskari boʻlishi mumkin; energiya — har doim toʻgʻri.",
      draw: [
        { t: 'title', text: 'Uch xil piramida' },
        { t: 'table', x: 4, y: 20, rows: [['piramida', 'nimani koʻrsatadi', 'teskari?'], ['sonlar', 'individlar soni', 'oʻrmonda'], ['biomassa', 'quruq massa', 'suvda'], ['energiya', 'energiya oqimi', 'hech qachon']] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Masala: fitoplankton — qisqichbaqasimonlar — baliqlar — vidra zanjirida vidraning massasi 8 kilogramm. Har bir pastki darajada 10 marta koʻp: baliqlar 80, qisqichbaqasimonlar 800, fitoplankton 8000 kilogramm. Umumiy biomassa: 8888 kilogramm.",
      easy: "8 → 80 → 800 → 8000 kg; jami 8888 kg.",
      draw: [
        { t: 'title', text: 'Vidra uchun qancha kerak?' },
        { t: 'table', x: 4, y: 20, rows: [['daraja', 'massa'], ['vidra', '8 kg'], ['baliqlar', '80 kg'], ['qisqichbaqasimonlar', '800 kg'], ['fitoplankton', '8000 kg']] },
        { t: 'formula', x: 4, y: 58, text: 'jami: 8888 kg' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    '«10 % qoidasi» (Lindeman): har trofik darajadan keyingisiga energiya va moddaning ≈ 10 % i oʻtadi, 90 % i hayotiy jarayonlarga sarflanadi.',
    'Ekologik piramida (Elton, 1927): asosi keng — produtsentlar, tepasi tor — yirik yirtqichlar; oziq zanjiri 6 boʻgʻindan oshmaydi.',
    'Sonlar piramidasi (oʻrmonda) va biomassa piramidasi (suvda) teskari boʻlishi mumkin, energiya piramidasi esa doim toʻgʻri.'
  ],
  questions: [
    {
      id: 'b18q1',
      prompt: 'Oʻsimlik — quyon — tulki zanjirida oʻsimlik biomassasi 100 t. Bir tulki 10 kg boʻlsa, populatsiyada nechta tulki boʻla oladi?',
      hint: 'Tulkilar jami 1 t = 1000 kg.',
      explanation: '100 t → 10 t → 1 t = 1000 kg; 1000 / 10 = 100 ta.',
      widget: { type: 'number_answer', props: { answer: 100, unit: 'ta' } }
    },
    {
      id: 'b18q2',
      prompt: '300 kg li tulen uchun (fitoplankton → mayda baliq → yirtqich baliq → tulen) qancha fitoplankton kerak?',
      hint: 'Uch marta 10 ga koʻpaytiring.',
      explanation: '300 → 3000 → 30 000 → 300 000 kg.',
      widget: { type: 'number_answer', props: { answer: 300000, unit: 'kg' } }
    },
    {
      id: 'b18q3',
      prompt: 'Sebarga → kapalak → baqa → ilon zanjirida ilonning massasi yozda 0,2 kg ga ortdi. Qancha sebarga sarflangan?',
      hint: '0,2 · 10 · 10 · 10.',
      explanation: 'Baqa 2 kg, kapalak 20 kg, sebarga 200 kg.',
      widget: { type: 'number_answer', props: { answer: 200, unit: 'kg' } }
    },
    {
      id: 'b18q4',
      prompt: 'Piramida turini xususiyati bilan juftlang.',
      hint: 'Energiya — doim toʻgʻri.',
      explanation: 'Sonlar — oʻrmonda teskari; biomassa — suvda teskari; energiya — doim toʻgʻri shaklda.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'sonlar piramidasi', right: 'oʻrmonda teskari' },
            { left: 'biomassa piramidasi', right: 'suvda teskari' },
            { left: 'energiya piramidasi', right: 'doim toʻgʻri' }
          ]
        }
      }
    },
    {
      id: 'b18q5',
      prompt: '«10 % qoidasi»ni kim taʼriflagan?',
      hint: 'Amerikalik ekolog.',
      explanation: 'R. Lindeman.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Ch. Elton', 'R. Lindeman', 'V. I. Vernadskiy', 'Yu. Libix'], answerIndex: 1 } }
    },
    {
      id: 'b18q6',
      prompt: 'Ona koʻrshapalakning ikki bolasi sut bilan boqilib, har biri 1 g dan 4,5 g gacha oʻsdi. Ona necha gramm hasharot yegan?',
      hint: 'Ikkalasi jami 7 g ortgan.',
      explanation: '2 · 3,5 = 7 g; 7 · 10 = 70 g hasharot.',
      widget: { type: 'number_answer', props: { answer: 70, unit: 'g' } }
    },
    {
      id: 'b18q7',
      prompt: 'Nega oziq zanjiri odatda 6 boʻgʻindan oshmaydi?',
      hint: 'Har boʻgʻinda 90 % yoʻqoladi.',
      explanation: 'Energiya har boʻgʻinda 10 marta kamayadi va tez tugaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['energiya tez tugaydi', 'yirtqichlar koʻp', 'oʻsimliklar kam', 'redutsentlar yoʻq'], answerIndex: 0 } }
    },
    {
      id: 'b18q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oziq hammasi hazm boʻlmaydi.',
      explanation: 'Oziqning 12–75 % i oʻzlashtiriladi; piramida tepasiga chiqqan sari tana oʻlchami ortadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Piramida tepasiga chiqqan sari individlar soni kamayib, tana oʻlchami ortadi.', value: true },
            { text: 'Oziqning hammasi ham oʻzlashtirilmaydi.', value: true },
            { text: 'Energiya piramidasi teskari boʻlishi mumkin.', value: false },
            { text: 'Har darajadan keyingisiga energiyaning 90 % i oʻtadi.', value: false }
          ]
        }
      }
    }
  ]
};
