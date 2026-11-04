import type { BoardLesson } from './types';

export const GEO4 = { kicker: '4-bob', title: 'Amaliy geografik tadqiqotlar' };

/** Darslik: Geografiya 10, 13-§ (54–59-betlar) — endogen va ekzogen jarayonlar: nurash, eroziya, abraziya, deflyatsiya, sel, karst, surilma; antropogen jarayonlar (shoʻrlanish, irrigatsiya eroziyasi, Orol, Ohangaron surilmasi). */
export const GEO_13: BoardLesson = {
  n: 13,
  label: '13',
  group: GEO4,
  title: 'Tabiiy geografik jarayonlar',
  section: '13-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Tabiatdagi jarayonlar ichki va tashqi kuchlar taʼsirida yuzaga keladi. Yerning ichki — endogen kuchlari vulqonlar, zilzilalar va tektonik harakatlarni keltirib chiqaradi. Tashqi — ekzogen kuchlar esa Quyosh issiqligi, ogʻirlik kuchi, suv va organizmlar taʼsirida ishlaydi; ular keltirib chiqaradigan jarayonlar tabiiy geografik jarayonlar deyiladi. Nurash — harorat, suv, havo va organizmlar taʼsirida togʻ jinslarining yemirilishi; u fizik, kimyoviy va organik boʻladi. Eroziya — oqar suvlar taʼsirida yuvilish; Amudaryo qirgʻogʻini yuvib, eski Toʻrtkoʻl shahrini butunlay oqizib ketgan, buni mahalliy aholi «deygish» deydi. Abraziya — toʻlqinlar qirgʻoqni yemirishi, deflyatsiya — shamol jinslarni uchirishi.",
      easy: "Endogen (ichki) va ekzogen (tashqi) kuchlar; nurash, eroziya («deygish»), abraziya, deflyatsiya.",
      draw: [
        { t: 'title', text: 'Ekzogen jarayonlar' },
        { t: 'table', x: 4, y: 18, rows: [['jarayon', 'taʼsir etuvchi kuch'], ['nurash', 'harorat, suv, organizmlar'], ['eroziya', 'oqar suvlar'], ['abraziya', 'toʻlqinlar'], ['deflyatsiya', 'shamol'], ['surilma', 'ogʻirlik kuchi']] }
      ],
      next: 'Xavfli jarayonlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sel — togʻ soylaridan qisqa vaqtda katta tezlikda oqib keladigan tosh aralash loyqa oqim; jala natijasida paydo boʻladi. Karst — suvda yaxshi eriydigan ohaktosh, gips kabi jinslar erib, gʻor va oʻpirilmalar hosil boʻlishi. Surilma — togʻ jinslarining ogʻirlik kuchi taʼsirida yonbagʻir boʻylab sirpanib tushishi. Inson faoliyati ham yangi jarayonlarni keltirib chiqaradi: yer osti suvlari yuza joylarda bugʻlanish tufayli tuproq shoʻrlanadi; qiya yerlarni notoʻgʻri sugʻorish irrigatsiya eroziyasiga olib keladi; 1960-yildan Orol dengizi sathi pasaya boshladi va ochilib qolgan tubidan shamol tuz uchirmoqda; Ohangaron vodiysida yer ostida koʻmirni gazga aylantirish ulkan surilmaga sabab boʻlgan.",
      easy: "Sel, karst, surilma; inson taʼsiri: shoʻrlanish, irrigatsiya eroziyasi, Orol muammosi, Ohangaron surilmasi.",
      draw: [
        { t: 'title', text: 'Jarayonlar va sabablari' },
        { t: 'box', id: 't', x: 4, y: 22, w: 42, h: 10, text: 'tabiiy: sel, karst', color: 'blue' },
        { t: 'box', id: 'a', x: 54, y: 22, w: 42, h: 10, text: 'antropogen: shoʻrlanish', color: 'red' },
        { t: 'text', x: 4, y: 44, text: 'Orol sathi 1960-yildan pasaymoqda', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 52, text: 'Oldini olish: ihotazorlar, meʼyoriy sugʻorish', size: 's', color: 'green' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Endogen (ichki) kuchlar vulqon, zilzila va tektonik harakatlarni, ekzogen (tashqi) kuchlar esa nurash, eroziya, abraziya, deflyatsiya, sel, karst, surilma kabi tabiiy geografik jarayonlarni keltirib chiqaradi.',
    'Sel, surilma va karst xoʻjalikka katta zarar yetkazadi; bunday hududlarda qurilish uchun maxsus qoidalar ishlab chiqilgan.',
    'Inson faoliyati shoʻrlanish, irrigatsiya eroziyasi, yer choʻkishi kabi antropogen jarayonlarni keltirib chiqaradi; Orol va Ohangaron bunga misol.'
  ],
  questions: [
    {
      id: 'g13q1',
      prompt: 'Jarayonni uning taʼrifi bilan juftlang.',
      hint: 'Abraziya — toʻlqinlar.',
      explanation: 'Eroziya — oqar suvlar yuvishi; abraziya — toʻlqinlar qirgʻoqni yemirishi; deflyatsiya — shamol jinslarni uchirishi; karst — eriydigan jinslarda gʻorlar hosil boʻlishi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'eroziya', right: 'oqar suvlar taʼsirida yuvilish' },
            { left: 'abraziya', right: 'toʻlqinlar qirgʻoqni yemirishi' },
            { left: 'deflyatsiya', right: 'shamol jinslarni uchirishi' },
            { left: 'karst', right: 'eriydigan jinslarda gʻorlar hosil boʻlishi' }
          ]
        }
      }
    },
    {
      id: 'g13q2',
      prompt: 'Jarayonni keltirib chiqaradigan kuchga ajrating.',
      hint: 'Vulqon — ichki kuch.',
      explanation: 'Endogen — vulqon, zilzila, tektonik harakat; ekzogen — nurash, sel, deflyatsiya.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'n', label: 'endogen (ichki)' }, { id: 'e', label: 'ekzogen (tashqi)' }],
          items: [
            { emoji: '🌋', label: 'vulqon otilishi', bin: 'n' },
            { emoji: '📳', label: 'zilzila', bin: 'n' },
            { emoji: '⛰️', label: 'tektonik harakatlar', bin: 'n' },
            { emoji: '🪨', label: 'nurash', bin: 'e' },
            { emoji: '🌊', label: 'sel', bin: 'e' },
            { emoji: '💨', label: 'deflyatsiya', bin: 'e' }
          ]
        }
      }
    },
    {
      id: 'g13q3',
      prompt: 'Xorazm va Qoraqalpogʻistonda daryo qirgʻoqlarining yuvilishi qanday ataladi?',
      hint: 'Mahalliy soʻz.',
      explanation: '«Deygish».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«deygish»', '«sel»', '«karst»', '«adir»'], answerIndex: 0 } }
    },
    {
      id: 'g13q4',
      prompt: 'Nurashning uch turini tanlang.',
      hint: 'Fizik...',
      explanation: 'Fizik, kimyoviy va organik nurash.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'fizik', correct: true },
            { label: 'kimyoviy', correct: true },
            { label: 'organik', correct: true },
            { label: 'magnit' }
          ]
        }
      }
    },
    {
      id: 'g13q5',
      prompt: 'Orol dengizining sathi qaysi yildan keyin pasaya boshlagan?',
      hint: 'XX asr oʻrtasi.',
      explanation: '1960-yildan keyin.',
      widget: { type: 'number_answer', props: { answer: 1960, unit: 'yil' } }
    },
    {
      id: 'g13q6',
      prompt: 'Tuproq shoʻrlanishining sababi nima?',
      hint: 'Suv bugʻlanadi, tuz qoladi.',
      explanation: 'Yer osti suvlari yuza joylashganda ular bugʻlanadi va tarkibidagi tuzlar tuproqda qoladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yuza yer osti suvlarining bugʻlanishi', 'qor koʻp yogʻishi', 'oʻrmonlarning koʻpligi', 'shamolning yoʻqligi'], answerIndex: 0 } }
    },
    {
      id: 'g13q7',
      prompt: 'Antropogen jarayonlarni tanlang.',
      hint: 'Inson faoliyati natijasi.',
      explanation: 'Irrigatsiya eroziyasi, sugʻorish tufayli shoʻrlanish, kon qazish tufayli yer choʻkishi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'irrigatsiya eroziyasi', correct: true },
            { label: 'sugʻorish tufayli shoʻrlanish', correct: true },
            { label: 'kon qazish tufayli yer choʻkishi', correct: true },
            { label: 'vulqon otilishi' }
          ]
        }
      }
    },
    {
      id: 'g13q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Sel — jala natijasi.',
      explanation: 'Sellar togʻli joylarda jala natijasida paydo boʻladi; deflyatsiyaning oldini olish uchun daraxt va butalar ekiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sellar togʻli hududlarda jala natijasida paydo boʻladi.', value: true },
            { text: 'Deflyatsiyaga qarshi daraxt va butalar ekiladi.', value: true },
            { text: 'Fizik nurashda togʻ jinsining kimyoviy tarkibi oʻzgaradi.', value: false },
            { text: 'Karst faqat granit jinslarida rivojlanadi.', value: false }
          ]
        }
      }
    }
  ]
};
