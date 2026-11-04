import type { BoardLesson } from './types';
import { UZ5 } from './tarix-10';

/** Darslik: Oʻzbekiston tarixi 11, 11-mavzu (75–80-betlar) — yangi universitetlar, test orqali qabul, bakalavriat va magistratura, xorijiy universitet filiallari, 2017-yilgi islohotlar, PhD va DSc. */
export const TARIX_11: BoardLesson = {
  n: 11,
  label: '11',
  group: UZ5,
  title: 'Oliy taʼlim va undan keyingi taʼlim',
  section: 'Oʻzbekiston tarixi, 11-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mustaqillikdan keyin oliy taʼlim ham yangilandi. 1992-yilda viloyatlardagi pedagogika institutlari negizida Andijon, Buxoro, Termiz, Urganch, Qarshi davlat universitetlari tuzildi, Jahon iqtisodiyoti va diplomatiya universiteti kabi yangi oliy oʻquv yurtlari ochildi. 1994-yilda Davlat test markazi tashkil etilib, oliy taʼlimga test orqali qabul joriy qilindi; 1996-yildan kontrakt toʻlovi kiritildi. 1997-yildan 4 yillik bakalavriat va 2 yillik magistraturadan iborat ikki bosqichli tizimga oʻtildi.",
      easy: "1994 — test orqali qabul; 1997 — bakalavriat (4 yil) + magistratura (2 yil).",
      draw: [
        { t: 'title', text: 'Oliy taʼlim' },
        { t: 'box', id: 'b', x: 6, y: 24, w: 38, h: 10, text: 'bakalavriat — 4 yil', color: 'blue' },
        { t: 'box', id: 'm', x: 56, y: 24, w: 38, h: 10, text: 'magistratura — 2 yil', color: 'green' },
        { t: 'arrow', from: 'b', to: 'm' },
        { t: 'text', x: 6, y: 50, text: '1994 — test orqali qabul', size: 's', color: 'purple' }
      ],
      next: 'Muhim sanalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toshkentda xorijiy universitetlarning filiallari ochildi: Vestminster universiteti (2002), Moskva davlat universiteti, Singapur menejmentni rivojlantirish instituti, Turin politexnika universiteti, Koreyaning Inha universiteti (2014) va boshqalar. 2017-yilga kelib 80 dan ortiq oliy oʻquv yurti ishlardi. 2017-yilda sirtqi taʼlim tiklandi, sanʼat va sport yoʻnalishlariga test oʻrniga ijodiy imtihon joriy etildi. 2017-yil 1-iyuldan ilmiy daraja ikki bosqichli boʻldi: falsafa doktori — PhD va fan doktori — DSc.",
      easy: "Xorijiy filiallar (2002–2014); 2017 — sirtqi taʼlim, PhD va DSc.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1994', 'Davlat test markazi'], ['1997', 'bakalavriat va magistratura'], ['2002', 'Vestminster filiali'], ['2014', 'Inha universiteti filiali'], ['2017', 'PhD va DSc, sirtqi taʼlim']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1992-yilda viloyatlarda yangi davlat universitetlari tuzildi; 1994-yildan Davlat test markazi orqali test asosida qabul, 1996-yildan kontrakt toʻlovi joriy etildi.',
    '1997-yildan oliy taʼlim ikki bosqichli: 4 yillik bakalavriat va 2 yillik magistratura; Toshkentda xorijiy universitetlarning filiallari ochildi.',
    '2017-yilda sirtqi taʼlim tiklandi, ijodiy yoʻnalishlarga test oʻrniga imtihon kiritildi, ilmiy darajalar PhD va DSc dan iborat boʻldi.'
  ],
  questions: [
    {
      id: 't11q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Test markazi — 1994.',
      explanation: 'Davlat test markazi (1994) → kontrakt toʻlovi (1996) → bakalavriat va magistratura (1997) → PhD va DSc (2017).',
      widget: { type: 'order_line', props: { items: [{ label: 'Davlat test markazi' }, { label: 'kontrakt toʻlovi' }, { label: 'bakalavriat va magistratura' }, { label: 'PhD va DSc tizimi' }] } }
    },
    {
      id: 't11q2',
      prompt: 'Bakalavriatda oʻqish necha yil davom etadi?',
      hint: 'Magistratura — 2 yil.',
      explanation: '4 yil.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'yil' } }
    },
    {
      id: 't11q3',
      prompt: 'Toshkentdagi xorijiy universitet filialini davlati bilan juftlang.',
      hint: 'Inha — Koreya.',
      explanation: 'Vestminster — Buyuk Britaniya; Turin politexnika — Italiya; Inha — Janubiy Koreya.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Vestminster universiteti', right: 'Buyuk Britaniya' },
            { left: 'Turin politexnika universiteti', right: 'Italiya' },
            { left: 'Inha universiteti', right: 'Janubiy Koreya' }
          ]
        }
      }
    },
    {
      id: 't11q4',
      prompt: 'Oliy taʼlimga test orqali qabul qaysi tashkilot tuzilgach joriy etildi?',
      hint: '1994-yil.',
      explanation: 'Davlat test markazi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Fanlar akademiyasi', 'Davlat test markazi', 'Xalq taʼlimi vazirligi', 'Oliy attestatsiya komissiyasi'], answerIndex: 1 } }
    },
    {
      id: 't11q5',
      prompt: '2017-yildagi oliy taʼlim islohotlarini tanlang.',
      hint: 'Sirtqi va ijodiy.',
      explanation: 'Sirtqi taʼlim tiklandi, sanʼat va sportga ijodiy imtihon kiritildi, PhD va DSc darajalari joriy etildi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'sirtqi taʼlim tiklandi', correct: true },
            { label: 'sanʼat va sportga ijodiy imtihon', correct: true },
            { label: 'PhD va DSc darajalari', correct: true },
            { label: 'test sinovlari butunlay bekor qilindi' }
          ]
        }
      }
    },
    {
      id: 't11q6',
      prompt: 'Ilmiy darajani taʼrifi bilan juftlang.',
      hint: 'PhD — birinchi bosqich.',
      explanation: 'PhD — falsafa doktori (tayanch doktorantura); DSc — fan doktori; bakalavr — oliy taʼlimning birinchi bosqichi.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'PhD' }, b: { label: 'falsafa doktori' } },
            { a: { label: 'DSc' }, b: { label: 'fan doktori' } },
            { a: { label: 'bakalavr' }, b: { label: 'oliy taʼlimning 1-bosqichi' } }
          ]
        }
      }
    },
    {
      id: 't11q7',
      prompt: '2017-yilga kelib mamlakatda nechta oliy oʻquv yurti bor edi?',
      hint: '19 universitet ham shu jumladan.',
      explanation: '80 dan ortiq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['20 ga yaqin', '46', '80 dan ortiq', '200 dan ortiq'], answerIndex: 2 } }
    },
    {
      id: 't11q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kontrakt — 1996.',
      explanation: 'Kontrakt toʻlovi 1996-yildan joriy etilgan; xorijiy universitet filiallari Toshkentda ochilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kontrakt-shartnoma asosida oʻqish 1996-yildan joriy etilgan.', value: true },
            { text: 'Toshkentda bir necha xorijiy universitet filiali ochilgan.', value: true },
            { text: 'Mustaqillikdan keyin oliy taʼlim 5 yillik boʻlib qoldi.', value: false },
            { text: 'Sirtqi taʼlim 2017-yilda bekor qilingan.', value: false }
          ]
        }
      }
    }
  ]
};
