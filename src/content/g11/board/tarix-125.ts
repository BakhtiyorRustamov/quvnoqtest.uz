import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 25-mavzu (113–117-betlar) — Lotin Amerikasi: neoliberal islohotlar va inqirozlar (Meksika 1994, Argentina 2001), hindu xalqlari harakati, XXI asrdagi siyosiy jarayonlar, integratsiya, Braziliya va BRIKS. */
export const TARIX_125: BoardLesson = {
  n: 125,
  label: '25',
  group: JH2,
  title: '1991–2017-yillarda Lotin Amerikasi mamlakatlari',
  section: 'Jahon tarixi, 25-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "XX asr oxirida Lotin Amerikasida neoliberal model — davlatning iqtisodga aralashuvini kamaytirish yoʻli — oldinga chiqdi. Bu yoʻl Chilida muvaffaqiyatli boʻldi, lekin boshqa joylarda natija ziddiyatli chiqdi. 1994-yil dekabrda Meksikada moliyaviy inqiroz boshlandi: peso keskin tushdi, 20 ming korxona xonavayron boʻldi. Bu 1990-yillardagi inqirozlar zanjirining birinchisi edi. 2001-yilda Argentinada defolt — qarzlarni toʻlay olmaslik eʼlon qilindi; bu jahon tarixidagi eng yirik bankrotliklardan biri boʻlib, neoliberal tajribalarga nuqta qoʻydi. Norozilik kuchaydi, Kolumbiya va Peruda qurolli guruhlar faollashdi, hindu xalqlari oʻz yerlari va madaniyati uchun kurashni kuchaytirdi.",
      easy: "Neoliberal islohotlar → Meksika inqirozi (1994) → Argentina defolti (2001); norozilik va qurolli guruhlar.",
      draw: [
        { t: 'title', text: 'Neoliberal yoʻl' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'Chili: yutuq', color: 'green' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: '1994: Meksika', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: '2001: Argentina', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'Meksika: 20 ming korxona xonavayron boʻldi', size: 's' }
      ],
      next: 'XXI asr'
    },
    {
      kind: 'explain',
      clear: true,
      say: "XXI asr boshida Lotin Amerikasi ilk bor diktaturalarsiz rivojlanmoqda: deyarli barcha davlatlarda saylov orqali konstitutsiyaviy hukumatlar hokimiyatga keldi. Anʼanaviy partiyalarga ishonch kamayib, Braziliya, Peru, Venesuela, Ekvadorda yangi mustaqil nomzodlar gʻolib chiqdi. Kuba sotsialistik tizim yordami tugagach qiyinchiliklarga duch keldi. Mintaqada integratsiya kuchaymoqda — erkin savdo zonalari tuzilmoqda. Meksika 1994-yilda Shimoliy Amerika erkin savdo zonasiga kirdi, endi uning eksportining 80 foizi sanoat mahsulotlari. Braziliya, Meksika va Argentina — G-20 aʼzolari; Braziliya Xitoy, Hindiston, Rossiya va JAR bilan birga BRIKS aʼzosi, mintaqa yetakchisi boʻlishga intilmoqda.",
      easy: "Diktaturasiz rivojlanish; integratsiya; Meksika — erkin savdo zonasi (1994); Braziliya — BRIKS aʼzosi.",
      draw: [
        { t: 'title', text: 'Yirik davlatlar' },
        { t: 'table', x: 4, y: 18, rows: [['davlat', 'xususiyati'], ['Braziliya', 'BRIKS aʼzosi'], ['Meksika', '1994: erkin savdo zonasi'], ['Argentina', '2001: defolt'], ['Chili', 'barqaror rivojlanish']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Neoliberal islohotlar Lotin Amerikasida ziddiyatli natija berdi: Meksika (1994) va Argentina (2001) chuqur inqirozlarni boshdan kechirdi.',
    'Norozilik oʻsishi qurolli guruhlarning faollashuvi va hindu xalqlarining oʻz huquqlari uchun kurashiga olib keldi.',
    'XXI asrda mintaqa diktaturalarsiz, saylovlar orqali rivojlanmoqda; integratsiya kuchaymoqda, Braziliya BRIKS aʼzosi sifatida yetakchilikka intilmoqda.'
  ],
  questions: [
    {
      id: 'j25q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Meksika — 1994.',
      explanation: 'Meksika erkin savdo zonasiga kirdi va inqiroz boshlandi (1994) → Argentinada defolt (2001).',
      widget: { type: 'order_line', props: { items: [{ label: 'Meksika erkin savdo zonasiga kirdi' }, { label: 'Meksikada moliyaviy inqiroz' }, { label: 'Argentinada defolt' }] } }
    },
    {
      id: 'j25q2',
      prompt: '«Defolt» nima?',
      hint: 'Qarz.',
      explanation: 'Davlat yoki kompaniyaning qarzlarini toʻlay olmasligi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qarzlarni toʻlay olmaslik', 'yangi valyuta joriy etish', 'erkin savdo zonasi', 'saylov tizimi'], answerIndex: 0 } }
    },
    {
      id: 'j25q3',
      prompt: '1994-yilgi inqiroz paytida Meksikada nechta korxona xonavayron boʻlgan (ming)?',
      hint: 'Oʻndan koʻp.',
      explanation: '20 ming.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'ming' } }
    },
    {
      id: 'j25q4',
      prompt: 'BRIKS aʼzolarini tanlang.',
      hint: 'Besh davlat.',
      explanation: 'Braziliya, Rossiya, Hindiston, Xitoy, Janubiy Afrika Respublikasi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Braziliya', correct: true },
            { label: 'Rossiya', correct: true },
            { label: 'Hindiston', correct: true },
            { label: 'Xitoy', correct: true },
            { label: 'Meksika' }
          ]
        }
      }
    },
    {
      id: 'j25q5',
      prompt: 'Davlatni u bilan bogʻliq fakt bilan juftlang.',
      hint: 'Defolt — Argentina.',
      explanation: 'Argentina — 2001-yilgi defolt; Meksika — Shimoliy Amerika erkin savdo zonasi; Braziliya — BRIKS aʼzosi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Argentina', right: '2001-yilgi defolt' },
            { left: 'Meksika', right: 'Shimoliy Amerika erkin savdo zonasi' },
            { left: 'Braziliya', right: 'BRIKS aʼzosi' }
          ]
        }
      }
    },
    {
      id: 'j25q6',
      prompt: 'Hozir Meksika eksportining necha foizini sanoat mahsulotlari tashkil etadi?',
      hint: 'Ilgari asosiy eksport neft edi.',
      explanation: '80 %.',
      widget: { type: 'number_answer', props: { answer: 80, unit: '%' } }
    },
    {
      id: 'j25q7',
      prompt: 'XXI asr boshida Lotin Amerikasi siyosiy hayotining xususiyatlarini tanlang.',
      hint: 'Saylovlar.',
      explanation: 'Diktaturalarsiz rivojlanish, saylov orqali kelgan hukumatlar, anʼanaviy partiyalarga ishonchning kamayishi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'diktaturalarsiz rivojlanish', correct: true },
            { label: 'saylov orqali kelgan hukumatlar', correct: true },
            { label: 'anʼanaviy partiyalarga ishonchning kamayishi', correct: true },
            { label: 'harbiy xuntalarning koʻpayishi' }
          ]
        }
      }
    },
    {
      id: 'j25q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Chili — barqaror.',
      explanation: 'Chili barqaror rivojlanayotgan davlat; hindu xalqlari yer va madaniyat huquqlari uchun kurashmoqda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Chili mintaqada barqaror rivojlanayotgan davlatlardan biri.', value: true },
            { text: 'Hindu xalqlari yer va madaniyat huquqlari uchun kurashmoqda.', value: true },
            { text: 'Neoliberal islohotlar barcha mamlakatlarda faqat ijobiy natija bergan.', value: false },
            { text: 'Braziliya BRIKS tashkilotiga aʼzo emas.', value: false }
          ]
        }
      }
    }
  ]
};
