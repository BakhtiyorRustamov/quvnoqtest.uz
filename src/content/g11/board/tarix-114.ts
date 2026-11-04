import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 14-mavzu (64–67-betlar) — Italiya: postindustrial jamiyat, «Halol qoʻllar» kampaniyasi, partiya tizimining yangilanishi, XXI asrdagi iqtisod. */
export const TARIX_114: BoardLesson = {
  n: 114,
  label: '14',
  group: JH2,
  title: '1991–2017-yillarda Italiya',
  section: 'Jahon tarixi, 14-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Italiyada 1980-yillardan ishlab chiqarishga kompyuter boshqaruvi va robotlar joriy etildi, bu jarayonda kichik korxonalar oldinda bordi; xizmat koʻrsatish sohasi tez oʻsdi. Siyosatda esa hukumatlarning tez-tez almashishi, korrupsiya va mafiya taʼsiri katta muammo edi. 1992-yil fevralda «Halol qoʻllar» kampaniyasi boshlandi: yirik partiyalar rahbarlari, vazirlar va deputatlar orasida poraxoʻrlik holatlari fosh etildi, ikki yilda uch mingga yaqin kishi qamoqqa olindi. 1993-yilgi referendumda aholi proporsional saylov tizimidan voz kechdi. Eski partiyalar tarqalib, «Olgʻa, Italiya!», «Shimol ligasi» kabi yangi kuchlar maydonga chiqdi.",
      easy: "1992 — «Halol qoʻllar»: korrupsiyaga qarshi kurash; 1993 — referendum; eski partiyalar tarqaldi.",
      draw: [
        { t: 'title', text: '«Halol qoʻllar»' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: '1992: tergov', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'eski partiyalar', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'yangi partiyalar', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: '2 yilda ≈ 3 000 kishi qamoqqa olindi', size: 's', color: 'red' }
      ],
      next: 'XXI asr'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1994-yilda Silvio Berluskoni hukumat tuzdi, ammo yil oxirida isteʼfoga chiqdi. 1996-yildan soʻl markazchilar koalitsiyasi hokimiyatda boʻldi, bosh vazirlar Romano Prodi va Massimo DʼAlema almashdi. XX asr oxiri — XXI asr boshida inflyatsiya va ishsizlik kamaydi, yoshlar tadbirkorligi qoʻllab-quvvatlandi: 1998-yilning oʻzida 12 ming kichik va oʻrta korxona ochildi. Ammo YIM oʻsishi beqaror, davlat qarzi esa YIMning 130 foiziga yetdi. 2014-yildan bosh vazir Matteo Renzi soliqlarni pasaytirish va taʼlim islohotini boshladi. Italiya turizm, bank ishi va axborot texnologiyalarini rivojlantirishga intilmoqda.",
      easy: "1994 — Berluskoni; 1996 — soʻl markazchilar; qarz — YIMning 130 %; 2014 — M. Renzi.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1992', '«Halol qoʻllar» boshlandi'], ['1993', 'saylov tizimi referendumi'], ['1994', 'S. Berluskoni hukumati'], ['1998', '12 ming yangi korxona'], ['2014', 'M. Renzi bosh vazir']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Italiyada postindustrial jamiyat 1980-yillarda shakllandi; siyosatning muammolari — hukumatlarning tez almashishi, korrupsiya va mafiya.',
    '1992-yildan «Halol qoʻllar» kampaniyasi poraxoʻrlikni fosh etdi; eski partiyalar tarqalib, yangi kuchlar maydonga chiqdi, 1993-yilda saylov tizimi oʻzgartirildi.',
    'XXI asrda inflyatsiya va ishsizlik kamaydi, ammo YIM oʻsishi beqaror va davlat qarzi juda katta (YIMning 130 %).'
  ],
  questions: [
    {
      id: 'j14q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: '«Halol qoʻllar» — birinchi.',
      explanation: '«Halol qoʻllar» (1992) → saylov tizimi referendumi (1993) → Berluskoni hukumati (1994) → M. Renzi bosh vazir (2014).',
      widget: { type: 'order_line', props: { items: [{ label: '«Halol qoʻllar» kampaniyasi' }, { label: 'saylov tizimi referendumi' }, { label: 'Berluskoni hukumati' }, { label: 'M. Renzi bosh vazir' }] } }
    },
    {
      id: 'j14q2',
      prompt: '«Halol qoʻllar» kampaniyasi nimaga qarshi qaratilgan edi?',
      hint: 'Pora.',
      explanation: 'Hokimiyat va partiyalardagi korrupsiyaga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['muhojirlikka', 'korrupsiyaga', 'inflyatsiyaga', 'NATOga'], answerIndex: 1 } }
    },
    {
      id: 'j14q3',
      prompt: 'Italiyaning davlat qarzi YIMga nisbatan necha foizni tashkil etadi?',
      hint: 'YIMdan ham katta.',
      explanation: '130 %.',
      widget: { type: 'number_answer', props: { answer: 130, unit: '%' } }
    },
    {
      id: 'j14q4',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Proporsional — ovozlarga mos.',
      explanation: 'Proporsional saylov tizimi — oʻrinlar ovozlarga mos boʻlinadi; neofashizm — fashistik tashkilotlarning davomchilari; postindustrial jamiyat — xizmat va texnologiyalar ustun.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'proporsional saylov tizimi', right: 'oʻrinlar ovozlarga mos boʻlinadi' },
            { left: 'neofashizm', right: 'fashistik tashkilotlar davomchisi' },
            { left: 'postindustrial jamiyat', right: 'xizmat va texnologiyalar ustun' }
          ]
        }
      }
    },
    {
      id: 'j14q5',
      prompt: '1994-yilgi saylovda oldinga chiqqan yangi siyosiy kuchlarni tanlang.',
      hint: 'Eski partiyalar emas.',
      explanation: '«Olgʻa, Italiya!», «Shimol ligasi», «Milliy alyans».',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: '«Olgʻa, Italiya!»', correct: true },
            { label: '«Shimol ligasi»', correct: true },
            { label: '«Milliy alyans»', correct: true },
            { label: 'Italiya kommunistik partiyasi' }
          ]
        }
      }
    },
    {
      id: 'j14q6',
      prompt: '1994-yilda hukumat tuzgan, ammo oʻsha yil oxirida isteʼfoga chiqqan siyosatchi kim?',
      hint: '«Olgʻa, Italiya!» yetakchisi.',
      explanation: 'Silvio Berluskoni.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Romano Prodi', 'Silvio Berluskoni', 'Matteo Renzi', 'Massimo DʼAlema'], answerIndex: 1 } }
    },
    {
      id: 'j14q7',
      prompt: '1998-yilda Italiyada nechta kichik va oʻrta korxona yaratilgan (ming)?',
      hint: 'Oʻndan koʻp.',
      explanation: '12 ming.',
      widget: { type: 'number_answer', props: { answer: 12, unit: 'ming' } }
    },
    {
      id: 'j14q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '1993 — referendum.',
      explanation: '1993-yilgi referendumda aholi proporsional tizimdan voz kechgan; Italiya yuqori texnologik mahsulotlarda yetakchilardan ortda qolmoqda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1993-yilgi referendumda aholi proporsional saylov tizimidan voz kechgan.', value: true },
            { text: 'Italiya yuqori texnologik mahsulotlar ishlab chiqarishda yetakchilardan ortda qolmoqda.', value: true },
            { text: 'Italiyada hukumatlar juda kam almashgan.', value: false },
            { text: 'Italiya kommunistik partiyasi 2010-yilda tuzilgan.', value: false }
          ]
        }
      }
    }
  ]
};
