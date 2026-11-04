import type { BoardLesson } from './types';

export const UZ8 = { kicker: 'Oʻzbekiston tarixi · VIII bob', title: 'Tashqi siyosat va ikki tomonlama munosabatlar' };

/** Darslik: Oʻzbekiston tarixi 11, 17-mavzu (109–113-betlar) — geosiyosiy holat (qulay va noqulay omillar), tashqi siyosat asoslari, 2012-yilgi Konsepsiya, tamoyillar. */
export const TARIX_17: BoardLesson = {
  n: 17,
  label: '17',
  group: UZ8,
  title: 'Tashqi siyosatning shakllanishi va yoʻnalishlari',
  section: 'Oʻzbekiston tarixi, 17-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oʻzbekiston Markaziy Osiyoning qoq markazida joylashgan: qadimda bu yerdan Buyuk Ipak yoʻli oʻtgan, bugun ham Yevropadan Osiyoga boradigan yoʻllar shu hududdan oʻtadi. U beshta davlat bilan chegaradosh, yerosti boyliklari juda koʻp. Lekin noqulayliklar ham bor: Oʻzbekiston dengizga chiqa olmaydi va dengiz portlaridan eng uzoqda joylashgan davlatlardan biri, suv resurslari cheklangan, Orol fojiasi va Afgʻonistondagi beqarorlik xavf tugʻdiradi.",
      easy: "Qulay: markaziy joylashuv, Ipak yoʻli, boyliklar; noqulay: dengizga chiqa olmaydi, suv kam.",
      draw: [
        { t: 'title', text: 'Geosiyosiy holat' },
        { t: 'table', x: 4, y: 18, rows: [['qulay', 'noqulay'], ['Markaziy Osiyo markazi', 'dengizga chiqish yoʻq'], ['Buyuk Ipak yoʻli', 'suv resurslari cheklangan'], ['boy yerosti boyliklari', 'Orol fojiasi'], ['transport tuguni', 'Afgʻonistondagi beqarorlik']] }
      ],
      next: 'Tamoyillar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Mustaqillik yillarida Oʻzbekiston 133 davlat bilan diplomatik munosabat oʻrnatdi, Toshkentda 45 ta elchixona ishlaydi. 1996-yilda tashqi siyosatning asosiy prinsiplari haqidagi qonun, 2012-yilda Tashqi siyosiy faoliyat konsepsiyasi qabul qilindi. Asosiy tamoyillar: davlatlarning teng huquqliligi, kuch ishlatmaslik, chegaralar daxlsizligi, nizolarni tinch hal qilish, ichki ishlarga aralashmaslik. Konsepsiyaga koʻra Oʻzbekiston harbiy-siyosiy bloklarga qoʻshilmaydi va oʻz hududida xorijiy harbiy bazalarga yoʻl qoʻymaydi.",
      easy: "133 davlat bilan aloqa; 1996 — qonun, 2012 — Konsepsiya; harbiy bloklarga qoʻshilmaslik.",
      draw: [
        { t: 'title', text: 'Tashqi siyosat tamoyillari' },
        { t: 'list', x: 4, y: 18, items: ['teng huquqlilik', 'kuch ishlatmaslik', 'chegaralar daxlsizligi', 'nizolarni tinch hal qilish', 'ichki ishlarga aralashmaslik'] },
        { t: 'text', x: 4, y: 62, text: 'harbiy bloklarga qoʻshilmaydi, xorijiy bazalar yoʻq', size: 's', color: 'red' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Oʻzbekiston Markaziy Osiyo markazida, Buyuk Ipak yoʻli ustida joylashgan, boyliklarga ega; noqulayliklari — dengizga chiqa olmasligi, suv tanqisligi, Orol fojiasi, Afgʻonistondagi beqarorlik.',
    '133 davlat bilan diplomatik munosabat oʻrnatildi; 1996-yilda tashqi siyosat prinsiplari qonuni, 2012-yilda Tashqi siyosiy faoliyat konsepsiyasi qabul qilindi.',
    'Tamoyillar: teng huquqlilik, kuch ishlatmaslik, chegaralar daxlsizligi, nizolarni tinch hal qilish, ichki ishlarga aralashmaslik; harbiy bloklarga qoʻshilmaslik.'
  ],
  questions: [
    {
      id: 't17q1',
      prompt: 'Omilni geosiyosiy holat turiga ajrating.',
      hint: 'Dengiz — noqulaylik.',
      explanation: 'Qulay: markaziy joylashuv, Buyuk Ipak yoʻli, boy boyliklar. Noqulay: dengizga chiqa olmaslik, suv tanqisligi, Orol fojiasi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'q', label: 'Qulay' },
            { id: 'n', label: 'Noqulay' }
          ],
          items: [
            { emoji: '', label: 'Markaziy Osiyo markazida', bin: 'q' },
            { emoji: '', label: 'Buyuk Ipak yoʻli', bin: 'q' },
            { emoji: '', label: 'boy yerosti boyliklari', bin: 'q' },
            { emoji: '', label: 'dengizga chiqa olmaydi', bin: 'n' },
            { emoji: '', label: 'suv resurslari cheklangan', bin: 'n' },
            { emoji: '', label: 'Orol fojiasi', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 't17q2',
      prompt: 'Oʻzbekiston nechta davlat bilan diplomatik munosabat oʻrnatgan?',
      hint: '130 dan biroz koʻp.',
      explanation: '133 davlat.',
      widget: { type: 'number_answer', props: { answer: 133, unit: 'davlat' } }
    },
    {
      id: 't17q3',
      prompt: 'Tashqi siyosat tamoyillarini tanlang.',
      hint: 'Konstitutsiyaning 17-moddasi.',
      explanation: 'Teng huquqlilik, kuch ishlatmaslik, chegaralar daxlsizligi, nizolarni tinch hal qilish, ichki ishlarga aralashmaslik.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'kuch ishlatmaslik', correct: true },
            { label: 'chegaralar daxlsizligi', correct: true },
            { label: 'ichki ishlarga aralashmaslik', correct: true },
            { label: 'nizolarni tinch hal qilish', correct: true },
            { label: 'harbiy bloklarga qoʻshilish' }
          ]
        }
      }
    },
    {
      id: 't17q4',
      prompt: 'Tashqi siyosiy faoliyat konsepsiyasi qaysi yilda eʼlon qilingan?',
      hint: 'Qonundan 16 yil keyin.',
      explanation: '2012-yil sentabrda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1992', '1996', '2012', '2017'], answerIndex: 2 } }
    },
    {
      id: 't17q5',
      prompt: 'Hujjatni yili bilan juftlang.',
      hint: 'Qonun — 1996.',
      explanation: 'Tashqi ishlar vazirligi faoliyati qarori — 1992; tashqi siyosat prinsiplari qonuni — 1996; Konsepsiya — 2012.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Tashqi ishlar vazirligi haqidagi qaror', right: '1992' },
            { left: 'tashqi siyosat prinsiplari qonuni', right: '1996' },
            { left: 'Tashqi siyosiy faoliyat konsepsiyasi', right: '2012' }
          ]
        }
      }
    },
    {
      id: 't17q6',
      prompt: 'Konsepsiyaga koʻra Oʻzbekiston nimaga yoʻl qoʻymaydi?',
      hint: 'Harbiy.',
      explanation: 'Oʻz hududida xorijiy davlatlarning harbiy bazalari joylashtirilishiga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['xorijiy elchixonalarga', 'xorijiy harbiy bazalarga', 'xalqaro savdoga', 'turizmga'], answerIndex: 1 } }
    },
    {
      id: 't17q7',
      prompt: 'Konsepsiyada Markaziy Osiyo muammolari haqida qanday fikr bildirilgan?',
      hint: 'Tashqi kuchlar.',
      explanation: 'Mintaqa muammolari tashqi kuchlarning aralashuvisiz, mintaqa davlatlarining oʻzlari tomonidan hal etilishi kerak.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yirik davlatlar hal qilishi kerak', 'mintaqa davlatlarining oʻzlari hal qilishi kerak', 'hal qilish shart emas', 'faqat BMT hal qiladi'], answerIndex: 1 } }
    },
    {
      id: 't17q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Toshkentda 45 elchixona.',
      explanation: 'Toshkentda 45 ta xorijiy elchixona ishlaydi; Oʻzbekiston dengizga chiqa olmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Toshkentda 45 ta xorijiy davlat elchixonasi ishlaydi.', value: true },
            { text: 'Oʻzbekiston bevosita dengizga chiqa olmaydi.', value: true },
            { text: 'Oʻzbekiston harbiy-siyosiy bloklarga aʼzo boʻlishni maqsad qilgan.', value: false },
            { text: 'Oʻzbekiston faqat ikkita davlat bilan chegaradosh.', value: false }
          ]
        }
      }
    }
  ]
};
