import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 18-mavzu (81–84-betlar) — Janubi-Sharqiy Osiyo: Vyetnam, Kambodja, Laos islohotlari; Malayziya, Indoneziya, Filippin; «Osiyo yoʻlbarslari». */
export const TARIX_118: BoardLesson = {
  n: 118,
  label: '18',
  group: JH2,
  title: 'Janubi-Sharqiy Osiyo mamlakatlari',
  section: 'Jahon tarixi, 18-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Janubi-Sharqiy Osiyoga Vyetnam, Kambodja, Laos, Myanma, Tailand, Malayziya, Bruney, Sharqiy Timor, Indoneziya va Filippin kiradi — ularda yarim milliarddan ortiq odam yashaydi. Sotsialistik yoʻlni tanlagan Vyetnam, Kambodja va Laos 1990-yillar boshida eng kambagʻal davlatlar qatorida edi va islohotlarga majbur boʻldi. 1991-yilda Vyetnamda erkin tadbirkorlikka ruxsat berildi, dehqonlar yerga uzoq muddat egalik qilish huquqini oldi; asr oxirida iqtisod yiliga 9 foiz oʻsdi, Vyetnam sholi eksporti boʻyicha dunyoda ikkinchi oʻringa chiqdi. Kambodjada BMT yordamida saylovlar tayyorlandi, 1999-yilda u ASEANga kirdi. Laosda 1991-yilda konstitutsiya qabul qilindi, 1999-yilda mamlakat ilk bor oʻzini sholi bilan taʼminladi.",
      easy: "Vyetnam (1991 — islohotlar, 9 % oʻsish, sholi eksporti), Kambodja (ASEAN, 1999), Laos (1991 — konstitutsiya).",
      draw: [
        { t: 'title', text: 'Sobiq sotsialistik davlatlar' },
        { t: 'table', x: 4, y: 18, rows: [['davlat', 'islohot', 'natija'], ['Vyetnam', 'tadbirkorlik', '9 % oʻsish'], ['Kambodja', 'BMT, saylov', 'ASEAN, 1999'], ['Laos', 'konstitutsiya', 'sholi yetarli']] }
      ],
      next: 'Yangi industrial davlatlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Malayziya tez iqtisodiy oʻsish tufayli ichki siyosiy inqirozni yengdi; Mahatxir Muhammad boshchiligidagi partiya 1995-yilda gʻalaba qozondi, mamlakat 2020-yilgacha rivojlangan industrial davlatga aylanishni maqsad qildi. Indoneziyaga 1990-yillar oxiridagi «Osiyo inqirozi» qattiq taʼsir qildi, norozilik natijasida prezident Suxarto isteʼfoga chiqdi; 2014-yildan prezident Joko Vidodo. Filippin elektron va kimyo sanoati mahsulotlari boʻyicha yirik ishlab chiqaruvchiga aylandi. Janubiy Koreya, Tayvan, Singapur va Gonkong tez modernizatsiya tufayli «Osiyo yoʻlbarslari» — «yangi industrial davlatlar» deb ataladi: ularda kemasozlik, avtomobilsozlik, yuqori texnologiyalar va robotlashtirish rivojlangan.",
      easy: "Malayziya — tez oʻsish; Indoneziya — inqiroz va Suxartoning isteʼfosi; «Osiyo yoʻlbarslari» — Koreya, Tayvan, Singapur, Gonkong.",
      draw: [
        { t: 'title', text: '«Osiyo yoʻlbarslari»' },
        { t: 'list', x: 4, y: 18, items: ['Janubiy Koreya', 'Tayvan', 'Singapur', 'Gonkong'] },
        { t: 'text', x: 50, y: 22, text: 'kemasozlik', size: 's' },
        { t: 'text', x: 50, y: 30, text: 'avtomobilsozlik', size: 's' },
        { t: 'text', x: 50, y: 38, text: 'robotlashtirish', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Vyetnam, Kambodja va Laos 1990-yillarda bozor islohotlarini oʻtkazdi; Vyetnam yiliga 9 % oʻsib, sholi eksporti boʻyicha dunyoda 2-oʻringa chiqdi.',
    'Malayziya tez oʻsib industrial davlat boʻlishga intilmoqda; Indoneziyada «Osiyo inqirozi» Suxartoning isteʼfosiga olib keldi.',
    'Janubiy Koreya, Tayvan, Singapur va Gonkong — «Osiyo yoʻlbarslari»: yuqori texnologiyalar va robotlashtirishda dunyoning ilgʻorlari.'
  ],
  questions: [
    {
      id: 'j18q1',
      prompt: '«Osiyo yoʻlbarslari»ni tanlang.',
      hint: 'Toʻrtta.',
      explanation: 'Janubiy Koreya, Tayvan, Singapur, Gonkong.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Janubiy Koreya', correct: true },
            { label: 'Tayvan', correct: true },
            { label: 'Singapur', correct: true },
            { label: 'Gonkong', correct: true },
            { label: 'Laos' }
          ]
        }
      }
    },
    {
      id: 'j18q2',
      prompt: 'Faktni davlatga ajrating.',
      hint: 'Suxarto — Indoneziya.',
      explanation: 'Vyetnam — sholi eksporti, 1991-yilgi islohotlar; Indoneziya — Suxartoning isteʼfosi, J. Vidodo; Malayziya — Mahatxir Muhammad, 2020-yil dasturi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'v', label: 'Vyetnam' }, { id: 'i', label: 'Indoneziya' }, { id: 'm', label: 'Malayziya' }],
          items: [
            { emoji: '🌾', label: 'sholi eksporti — dunyoda 2-oʻrin', bin: 'v' },
            { emoji: '📜', label: '1991: erkin tadbirkorlik', bin: 'v' },
            { emoji: '👤', label: 'Suxartoning isteʼfosi', bin: 'i' },
            { emoji: '🗳️', label: 'Joko Vidodo prezident', bin: 'i' },
            { emoji: '🏭', label: '2020-yilgacha industrial davlat', bin: 'm' },
            { emoji: '👔', label: 'Mahatxir Muhammad', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'j18q3',
      prompt: 'XX asr oxirida Vyetnam iqtisodiyoti yiliga necha foiz oʻsgan?',
      hint: 'Oʻnga yaqin.',
      explanation: '9 %.',
      widget: { type: 'number_answer', props: { answer: 9, unit: '%' } }
    },
    {
      id: 'j18q4',
      prompt: 'Kambodja ASEANga qaysi yilda teng huquqli aʼzo boʻlgan?',
      hint: 'XX asr oxiri.',
      explanation: '1999-yilda.',
      widget: { type: 'number_answer', props: { answer: 1999, unit: 'yil' } }
    },
    {
      id: 'j18q5',
      prompt: '1991-yildagi Vyetnam islohotlari nimaga ruxsat berdi?',
      hint: 'Tadbirkorlik.',
      explanation: 'Erkin tadbirkorlikka va dehqonlarning yerga uzoq muddat egalik qilishiga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['erkin tadbirkorlikka', 'koʻp partiyaviylikka', 'yadro quroliga', 'SSSRga qoʻshilishga'], answerIndex: 0 } }
    },
    {
      id: 'j18q6',
      prompt: '1990-yillar oxiridagi «Osiyo inqirozi»dan keyin qaysi davlat prezidenti isteʼfoga chiqishga majbur boʻlgan?',
      hint: 'Indoneziya.',
      explanation: 'Suxarto.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Suxarto', 'Mahatxir Muhammad', 'Fidel Ramos', 'Joko Vidodo'], answerIndex: 0 } }
    },
    {
      id: 'j18q7',
      prompt: '«Yangi industrial davlatlar»da rivojlangan sohalarni tanlang.',
      hint: 'Sanoat va texnologiya.',
      explanation: 'Kemasozlik, avtomobilsozlik, neftni qayta ishlash, yuqori texnologiyalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'kemasozlik', correct: true },
            { label: 'avtomobilsozlik', correct: true },
            { label: 'robotlashtirish', correct: true },
            { label: 'koʻchmanchi chorvachilik' }
          ]
        }
      }
    },
    {
      id: 'j18q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Laos — 1999, sholi.',
      explanation: 'Laos 1999-yilda ilk bor oʻzini sholi bilan taʼminlagan; JSHO davlatlarida yarim milliarddan ortiq aholi yashaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Laos 1999-yilda ilk bor oʻzini sholi bilan taʼminlagan.', value: true },
            { text: 'Janubi-Sharqiy Osiyoda yarim milliarddan ortiq aholi yashaydi.', value: true },
            { text: 'Vyetnam 1990-yillar boshida dunyoning eng boy davlatlaridan biri edi.', value: false },
            { text: 'Singapur «Osiyo yoʻlbarslari» qatoriga kirmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
