import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 20-mavzu (90–94-betlar) — Turkiya: T. Oʻzol va S. Demirel, dunyoviylik va siyosiy islom, R. T. Erdoʻgʻon, iqtisodiy rivojlanish, 2016-yilgi toʻntarishga urinish, tashqi siyosat. */
export const TARIX_120: BoardLesson = {
  n: 120,
  label: '20',
  group: JH2,
  title: '1991–2017-yillarda Turkiya Respublikasi',
  section: 'Jahon tarixi, 20-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1989-yilda islohotchi Turgʻut Oʻzol Turkiya prezidenti boʻldi, partiyalar faoliyati uchun yengilliklar yaratildi. Otaturk davridan beri dunyoviy yoʻlning kafolatchisi hisoblangan armiya ogohlantirishlariga qaramay, diniy partiyalarning taʼsiri oshib bordi. 1993-yilda Oʻzol vafot etib, Sulaymon Demirel prezident boʻldi. 1995-yilgi saylovda N. Erbakan boshchiligidagi «Refah» partiyasi eng koʻp ovoz oldi. Kurd ishchi partiyasi bilan qurolli mojaro ham dolzarb muammo edi. 2002-yilda Rejep Tayyip Erdoʻgʻon boshchiligidagi Adolat va taraqqiyot partiyasi gʻolib chiqdi, 2003-yilda Erdoʻgʻon bosh vazir boʻldi. Iqtisod tez oʻsdi, Turkiya G-20 aʼzosiga aylandi.",
      easy: "Oʻzol (1989) → Demirel (1993) → 2002 — Adolat va taraqqiyot partiyasi; Erdoʻgʻon (2003); Turkiya — G-20 aʼzosi.",
      draw: [
        { t: 'title', text: 'Turkiya rahbarlari' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1989', 'T. Oʻzol prezident'], ['1993', 'S. Demirel prezident'], ['2002', 'ATP saylovda gʻolib'], ['2003', 'R. T. Erdoʻgʻon bosh vazir'], ['2014', 'Erdoʻgʻon prezident']] }
      ],
      next: 'XXI asrda Turkiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1990-yillarda Turkiya eksportining asosiy qismini sanoat mahsulotlari tashkil qildi va ular Yevropa mahsulotlari bilan raqobatlasha boshladi; ammo korrupsiya va 2000-yillar boshidagi moliyaviy inqiroz lirani qadrsizlantirdi. 2014-yilda Erdoʻgʻon xalq tomonidan bevosita saylangan birinchi prezident boʻldi. 2016-yilda bir guruh harbiylar davlat toʻntarishiga urindi, ammo aholi koʻchalarga chiqdi va isyon bostirildi; keyin armiya va davlat apparatida keng tozalash oʻtkazildi. 2017-yil aprelda referendum natijasida prezidentlik boshqaruvi joriy qilindi. 2015-yilda Rossiya samolyoti urib tushirilgach munosabatlar keskinlashdi, 2016-yildan esa ikki davlat yana yaqinlashdi.",
      easy: "2014 — Erdoʻgʻon prezident; 2016 — toʻntarishga urinish bostirildi; 2017 — prezidentlik boshqaruvi.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: '2014: saylov', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: '2016: isyon', color: 'red' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: '2017: referendum', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'Natija: prezidentlik boshqaruvi', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1990-yillarda Turkiyada dunyoviy kuchlar (armiya) va diniy partiyalar oʻrtasidagi munosabat asosiy siyosiy masala boʻldi; Kurd muammosi ham dolzarb edi.',
    '2002-yildan R. T. Erdoʻgʻon boshchiligidagi Adolat va taraqqiyot partiyasi hokimiyatda; Turkiya tez rivojlanib, G-20 aʼzosiga aylandi.',
    '2014-yilda Erdoʻgʻon bevosita saylangan birinchi prezident boʻldi; 2016-yilgi toʻntarishga urinish bostirildi, 2017-yilda prezidentlik boshqaruvi joriy etildi.'
  ],
  questions: [
    {
      id: 'j20q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Oʻzol — 1989.',
      explanation: 'Oʻzol prezident (1989) → ATP gʻalabasi (2002) → Erdoʻgʻon prezident (2014) → toʻntarishga urinish (2016) → referendum (2017).',
      widget: { type: 'order_line', props: { items: [{ label: 'T. Oʻzol prezident' }, { label: 'ATP saylovda gʻolib' }, { label: 'Erdoʻgʻon prezident' }, { label: 'toʻntarishga urinish' }, { label: 'prezidentlik boshqaruvi referendumi' }] } }
    },
    {
      id: 'j20q2',
      prompt: 'Turkiyada dunyoviy yoʻlning kafolatchisi deb kim hisoblanib kelgan?',
      hint: 'Otaturk davridan beri.',
      explanation: 'Armiya rahbariyati.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['armiya', 'diniy partiyalar', 'kasaba uyushmalari', 'chet el banklari'], answerIndex: 0 } }
    },
    {
      id: 'j20q3',
      prompt: 'R. T. Erdoʻgʻon xalq tomonidan bevosita saylangan birinchi prezident qaysi yilda boʻlgan?',
      hint: 'Bosh vazirlikdan keyin.',
      explanation: '2014-yilda.',
      widget: { type: 'number_answer', props: { answer: 2014, unit: 'yil' } }
    },
    {
      id: 'j20q4',
      prompt: 'Siyosatchini u bilan bogʻliq fakt bilan juftlang.',
      hint: '«Refah» — Erbakan.',
      explanation: 'T. Oʻzol — 1989-yilda prezident; N. Erbakan — «Refah» partiyasi; R. T. Erdoʻgʻon — Adolat va taraqqiyot partiyasi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'T. Oʻzol', right: '1989-yilda prezident' },
            { left: 'N. Erbakan', right: '«Refah» partiyasi' },
            { left: 'R. T. Erdoʻgʻon', right: 'Adolat va taraqqiyot partiyasi' }
          ]
        }
      }
    },
    {
      id: 'j20q5',
      prompt: '2017-yil apreldagi referendum natijasida Turkiyada nima joriy qilindi?',
      hint: 'Boshqaruv shakli.',
      explanation: 'Prezidentlik boshqaruvi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['monarxiya', 'prezidentlik boshqaruvi', 'harbiy boshqaruv', 'federatsiya'], answerIndex: 1 } }
    },
    {
      id: 'j20q6',
      prompt: 'Turkiya iqtisodiy rivojlanishidagi yutuq va muammolarni ajrating.',
      hint: 'Korrupsiya — muammo.',
      explanation: 'Yutuq — raqobatbardosh sanoat, G-20 aʼzoligi; muammo — korrupsiya, liraning qadrsizlanishi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'y', label: 'yutuq' }, { id: 'm', label: 'muammo' }],
          items: [
            { emoji: '🏭', label: 'raqobatbardosh sanoat mahsulotlari', bin: 'y' },
            { emoji: '🌐', label: 'G-20 aʼzoligi', bin: 'y' },
            { emoji: '💸', label: 'korrupsiya', bin: 'm' },
            { emoji: '📉', label: 'liraning qadrsizlanishi', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'j20q7',
      prompt: '1993-yilda T. Oʻzoldan keyin Turkiya prezidenti kim boʻldi?',
      hint: 'Tajribali siyosatchi.',
      explanation: 'Sulaymon Demirel.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Sulaymon Demirel', 'Abdulloh Gul', 'N. Erbakan', 'R. T. Erdoʻgʻon'], answerIndex: 0 } }
    },
    {
      id: 'j20q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '2016 — aholi koʻchaga chiqdi.',
      explanation: '2016-yilgi toʻntarishga urinish bostirilgan; 2015-yilgi samolyot voqeasi Rossiya bilan munosabatlarni keskinlashtirgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '2016-yilgi davlat toʻntarishiga urinish bostirilgan.', value: true },
            { text: '2015-yilgi samolyot voqeasi Turkiya–Rossiya munosabatlarini keskinlashtirgan.', value: true },
            { text: 'Turkiya G-20 aʼzosi emas.', value: false },
            { text: '2002-yilgi saylovda «Refah» partiyasi gʻolib chiqqan.', value: false }
          ]
        }
      }
    }
  ]
};
