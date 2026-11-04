import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 10-mavzu (48–51-betlar) — AQSH: iqtisodiy rivojlanish, 2008–2009-yillar inqirozi, prezidentlar va tashqi siyosat. */
export const TARIX_110: BoardLesson = {
  n: 110,
  label: '10',
  group: JH2,
  title: '1991–2017-yillarda Amerika Qoʻshma Shtatlari',
  section: 'Jahon tarixi, 10-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1990-yillar boshidagi qisqa turgʻunlikdan keyin AQSH iqtisodiyoti 1992-yil bahoridan yana tez oʻsa boshladi. Bill Klinton davrida ishsizlik va inflyatsiya pasaydi, ikkinchi muddatda ijtimoiy sohaga katta eʼtibor berildi. XXI asr boshida AQSH texnik taraqqiyotning asosiy manbayiga aylandi: dunyoda yangi texnologiyalarga sarflanadigan mablagʻning uchdan bir qismi unga toʻgʻri keladi. Ammo 2007–2008-yillarda AQSH moliya sektorida boshlangan inqiroz 2009-yilda global retsessiyaga aylandi: jahon YIM urushdan keyin ilk bor kamaydi, dunyoda ishsizlar 200 millionga yaqinlashdi. Uni faqat 1930-yillardagi Buyuk depressiya bilan solishtirish mumkin.",
      easy: "1990-yillar — oʻsish (Klinton); XXI asr — texnologiyalar yetakchisi; 2008–2009 — global inqiroz.",
      draw: [
        { t: 'title', text: 'AQSH iqtisodiyoti' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: '1992: oʻsish', color: 'green' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'texnologiyalar', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: '2008: inqiroz', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'Yangi texnologiya xarajatlarining 1/3 — AQSH', size: 's' },
        { t: 'text', x: 4, y: 54, text: '2009: dunyoda ≈ 200 mln ishsiz', size: 's', color: 'red' }
      ],
      next: 'Prezidentlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "AQSHda ikki asosiy partiya — respublikachilar va demokratlar — hokimiyatda almashib turdi. 1992-yilda demokrat Bill Klinton respublikachi Jorj Bushni yengdi va 1996-yilda qayta saylandi. 2000-yilda respublikachi kichik Jorj Bush prezident boʻldi. 2008-yilda demokrat Barak Obama saylandi; uning ikkinchi muddatida Iroq va Suriyadagi vaziyat, terrorizm xavfi kabi muammolar koʻpaydi. 2016-yilgi saylovda respublikachi Donald Tramp Xillari Klintonni yengdi. AQSH tashqi siyosatda faqat harbiy emas, sanoat, savdo, moliya, ilm-fan va madaniyat vositalaridan ham foydalanadi.",
      easy: "Klinton (1992) → kichik Bush (2000) → Obama (2008) → Tramp (2016).",
      draw: [
        { t: 'title', text: 'AQSH prezidentlari' },
        { t: 'table', x: 4, y: 18, rows: [['saylangan yil', 'prezident', 'partiya'], ['1992, 1996', 'Bill Klinton', 'demokrat'], ['2000, 2004', 'kichik Jorj Bush', 'respublikachi'], ['2008, 2012', 'Barak Obama', 'demokrat'], ['2016', 'Donald Tramp', 'respublikachi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1990-yillarda B. Klinton davrida AQSH iqtisodiyoti oʻsdi, ishsizlik va inflyatsiya pasaydi; XXI asr boshida AQSH texnik taraqqiyot yetakchisiga aylandi.',
    '2007–2008-yillarda AQSHda boshlangan moliyaviy inqiroz 2009-yilda global retsessiyaga aylandi — Buyuk depressiyadan keyingi eng ogʻir inqiroz.',
    'Prezidentlar: B. Klinton (1992), kichik J. Bush (2000), B. Obama (2008), D. Tramp (2016); AQSH tashqi siyosatda iqtisodiy, ilmiy va madaniy vositalardan ham foydalanadi.'
  ],
  questions: [
    {
      id: 'j10q1',
      prompt: 'AQSH prezidentlarini tartib boʻyicha joylashtiring.',
      hint: 'Klinton — 1992.',
      explanation: 'B. Klinton → kichik J. Bush → B. Obama → D. Tramp.',
      widget: { type: 'order_line', props: { items: [{ label: 'Bill Klinton' }, { label: 'kichik Jorj Bush' }, { label: 'Barak Obama' }, { label: 'Donald Tramp' }] } }
    },
    {
      id: 'j10q2',
      prompt: 'Prezidentni partiyasiga ajrating.',
      hint: 'Obama — demokrat.',
      explanation: 'Demokratlar — Klinton, Obama; respublikachilar — kichik Bush, Tramp.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'd', label: 'demokrat' }, { id: 'r', label: 'respublikachi' }],
          items: [
            { emoji: '🫏', label: 'Bill Klinton', bin: 'd' },
            { emoji: '🫏', label: 'Barak Obama', bin: 'd' },
            { emoji: '🐘', label: 'kichik Jorj Bush', bin: 'r' },
            { emoji: '🐘', label: 'Donald Tramp', bin: 'r' }
          ]
        }
      }
    },
    {
      id: 'j10q3',
      prompt: '2009-yilda dunyoda ishsizlar soni taxminan necha millionga yetgan?',
      hint: 'Ikki yuzga yaqin.',
      explanation: '200 millionga yaqin.',
      widget: { type: 'number_answer', props: { answer: 200, unit: 'mln' } }
    },
    {
      id: 'j10q4',
      prompt: '2008–2009-yillardagi inqirozni darslik qaysi inqiroz bilan solishtiradi?',
      hint: '1930-yillar.',
      explanation: 'Buyuk depressiya bilan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Buyuk depressiya', '1973-yil neft inqirozi', '1997-yil Osiyo inqirozi', '1991-yil avgust inqirozi'], answerIndex: 0 } }
    },
    {
      id: 'j10q5',
      prompt: 'Dunyoda yangi texnologiyalarga sarflanadigan xarajatlarning qancha qismi AQSHga toʻgʻri keladi?',
      hint: 'Kasr.',
      explanation: 'Uchdan bir qismi (1/3).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1/10', '1/3', '1/2', '3/4'], answerIndex: 1 } }
    },
    {
      id: 'j10q6',
      prompt: 'AQSH tashqi siyosatda foydalanadigan vositalarni tanlang.',
      hint: 'Faqat harbiy emas.',
      explanation: 'Harbiy, sanoat, savdo, moliyaviy, ilmiy-texnik va madaniy vositalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'harbiy', correct: true },
            { label: 'savdo va moliya', correct: true },
            { label: 'ilmiy-texnik', correct: true },
            { label: 'madaniy', correct: true }
          ]
        }
      }
    },
    {
      id: 'j10q7',
      prompt: 'Saylov yilini prezident bilan juftlang.',
      hint: '2016 — Tramp.',
      explanation: '1992 — B. Klinton; 2008 — B. Obama; 2016 — D. Tramp.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '1992', right: 'Bill Klinton' },
            { left: '2008', right: 'Barak Obama' },
            { left: '2016', right: 'Donald Tramp' }
          ]
        }
      }
    },
    {
      id: 'j10q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Klinton — ijtimoiy soha.',
      explanation: 'Klintonning ikkinchi muddatida ijtimoiy sohaga katta eʼtibor berilgan; inqiroz AQSH moliya sektorida boshlangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'B. Klintonning ikkinchi muddatida ijtimoiy sohaga katta eʼtibor berilgan.', value: true },
            { text: '2008-yilgi inqiroz AQSH moliya sektorida boshlangan.', value: true },
            { text: '2016-yilgi saylovda Xillari Klinton gʻolib chiqqan.', value: false },
            { text: 'AQSH iqtisodiyoti 2009-yildayoq toʻliq tiklangan.', value: false }
          ]
        }
      }
    }
  ]
};
