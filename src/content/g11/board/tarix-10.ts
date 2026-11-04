import type { BoardLesson } from './types';

export const UZ5 = { kicker: 'Oʻzbekiston tarixi · V bob', title: 'Taʼlim islohotlari va kadrlar tayyorlash' };

/** Darslik: Oʻzbekiston tarixi 11, 10-mavzu (71–75-betlar) — 1992 va 1997-yilgi «Taʼlim toʻgʻrisida»gi qonunlar, Kadrlar tayyorlash milliy dasturi, kollej va litseylar, 2017-yilda 11 yillik taʼlimga qaytish, maktabgacha taʼlim. */
export const TARIX_10: BoardLesson = {
  n: 10,
  label: '10',
  group: UZ5,
  title: 'Umumiy va oʻrta maxsus taʼlim',
  section: 'Oʻzbekiston tarixi, 10-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Jamiyatni yuksaltirish uchun avvalo yaxshi taʼlim kerak. 1992-yil 2-iyulda «Taʼlim toʻgʻrisida»gi birinchi qonun qabul qilindi, 1997-yil 29-avgustda esa uning yangi tahriri va Kadrlar tayyorlash milliy dasturi tasdiqlandi. 1996–1997-oʻquv yilidan birinchi sinflar lotin alifbosida oʻqiy boshladi. Har kimga bilim olishda teng huquq kafolatlandi. 1997-yildan 1-oktabr — Oʻqituvchilar va murabbiylar kuni sifatida nishonlanadi.",
      easy: "1992 — Taʼlim qonuni; 1997 — yangi qonun va milliy dastur; 1-oktabr — Oʻqituvchilar kuni.",
      draw: [
        { t: 'title', text: 'Taʼlim qonunlari' },
        { t: 'icon', x: 14, y: 40, emoji: '🏫', size: 'l' },
        { t: 'list', x: 30, y: 20, items: ['1992 — Taʼlim toʻgʻrisida', '1997 — yangi tahrir', '1997 — Kadrlar dasturi', 'lotin alifbosi — 1996'] }
      ],
      next: 'Taʼlim tizimi oʻzgarishlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Milliy dastur boʻyicha 9 yillik maktabdan keyin oʻquvchilar uch yil kasb-hunar kolleji yoki akademik litseyda oʻqiydigan boʻldi: 1400 dan ortiq kollej va 200 ga yaqin litsey qurildi, 2009-yildan toʻliq 12 yillik majburiy taʼlim joriy etildi. Lekin bitiruvchilarni ish bilan taʼminlashda kutilgan natija boʻlmadi. Ota-onalar fikri inobatga olinib, 2017-yilda maktablarda yana 11 yillik taʼlim tiklandi. Shu yili Maktabgacha taʼlim vazirligi ham tuzildi.",
      easy: "9 + 3 (kollej, litsey) → 2009 — 12 yillik; 2017 — yana 11 yillik maktab.",
      draw: [
        { t: 'title', text: 'Taʼlim tizimi' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'oʻzgarish'], ['1992', '1–4, 5–9, 10–11-sinflar'], ['1997', '9 yil maktab + 3 yil kollej'], ['2009', '12 yillik majburiy taʼlim'], ['2017', 'yana 11 yillik maktab']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '«Taʼlim toʻgʻrisida»gi qonun 1992-yil 2-iyulda, yangi tahriri va Kadrlar tayyorlash milliy dasturi 1997-yil 29-avgustda qabul qilindi.',
    'Milliy dastur boʻyicha 9 yillik maktabdan keyin kasb-hunar kolleji yoki akademik litsey; 2009-yildan 12 yillik majburiy taʼlim joriy etildi.',
    '2017-yilda maktablarda 11 yillik taʼlim tiklandi va Maktabgacha taʼlim vazirligi tuzildi; 1-oktabr — Oʻqituvchilar va murabbiylar kuni.'
  ],
  questions: [
    {
      id: 't10q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Birinchi qonun — 1992.',
      explanation: 'Taʼlim qonuni (1992) → Kadrlar tayyorlash milliy dasturi (1997) → 12 yillik majburiy taʼlim (2009) → 11 yillik maktabga qaytish (2017).',
      widget: { type: 'order_line', props: { items: [{ label: '«Taʼlim toʻgʻrisida»gi qonun' }, { label: 'Kadrlar tayyorlash milliy dasturi' }, { label: '12 yillik majburiy taʼlim' }, { label: '11 yillik maktabga qaytish' }] } }
    },
    {
      id: 't10q2',
      prompt: 'Oʻqituvchilar va murabbiylar kuni qachon nishonlanadi?',
      hint: 'Kuz boshi.',
      explanation: '1-oktabr.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1-sentabr', '1-oktabr', '8-dekabr', '21-mart'], answerIndex: 1 } }
    },
    {
      id: 't10q3',
      prompt: 'Kadrlar tayyorlash milliy dasturi qaysi yilda qabul qilingan?',
      hint: 'Yangi Taʼlim qonuni bilan birga.',
      explanation: '1997-yil 29-avgustda.',
      widget: { type: 'number_answer', props: { answer: 1997, unit: 'yil' } }
    },
    {
      id: 't10q4',
      prompt: 'Taʼlim bosqichini sinflar bilan juftlang.',
      hint: '1992-yilgi qonun.',
      explanation: 'Boshlangʻich taʼlim — 1–4-sinf; asosiy maktab — 5–9-sinf; yuqori oʻrta maktab — 10–11-sinf.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'boshlangʻich taʼlim', right: '1–4-sinf' },
            { left: 'asosiy (tayanch) maktab', right: '5–9-sinf' },
            { left: 'yuqori oʻrta maktab', right: '10–11-sinf' }
          ]
        }
      }
    },
    {
      id: 't10q5',
      prompt: 'Lotin alifbosida oʻqitish qaysi oʻquv yilidan boshlangan?',
      hint: '1990-yillar oʻrtasi.',
      explanation: '1996–1997-oʻquv yilidan, birinchi sinflarda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1991–1992', '1996–1997', '2005–2006', '2017–2018'], answerIndex: 1 } }
    },
    {
      id: 't10q6',
      prompt: '2017-yilda 12 yillik taʼlimdan 11 yillik taʼlimga qaytish sabablarini tanlang.',
      hint: 'Ota-onalar fikri.',
      explanation: 'Islohotlar kutilgan natijani bermadi, kollej bitiruvchilari ishga joylashishi qoniqarsiz edi, ota-onalarning koʻpchiligi 11 yillik maktab tarafdori edi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'islohotlar kutilgan natijani bermadi', correct: true },
            { label: 'bitiruvchilarni ish bilan taʼminlash qoniqarsiz edi', correct: true },
            { label: 'ota-onalarning koʻpchiligi 11 yillikni xohladi', correct: true },
            { label: 'maktablar yetishmay qoldi' }
          ]
        }
      }
    },
    {
      id: 't10q7',
      prompt: 'Muassasani soni bilan juftlang.',
      hint: 'Kollejlar koʻproq.',
      explanation: 'Kasb-hunar kollejlari — 1400 dan ortiq; akademik litseylar — 200 ga yaqin; umumtaʼlim maktablari — 10 mingga yaqin.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'kasb-hunar kollejlari', right: '1400 dan ortiq' },
            { left: 'akademik litseylar', right: '200 ga yaqin' },
            { left: 'umumtaʼlim maktablari', right: '10 mingga yaqin' }
          ]
        }
      }
    },
    {
      id: 't10q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Vazirlik — 2017.',
      explanation: 'Maktabgacha taʼlim vazirligi 2017-yilda tuzildi; bilim olishda har kimga teng huquq kafolatlangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Maktabgacha taʼlim vazirligi 2017-yilda tuzilgan.', value: true },
            { text: 'Bilim olishda har kimga teng huquq kafolatlangan.', value: true },
            { text: '12 yillik taʼlim 1992-yilda joriy etilgan.', value: false },
            { text: 'Kollej bitiruvchilarini ish bilan taʼminlash toʻliq hal qilingan.', value: false }
          ]
        }
      }
    }
  ]
};
