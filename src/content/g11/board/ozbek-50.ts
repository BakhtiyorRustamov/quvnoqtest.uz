import type { BoardLesson } from './types';
import { OZG8 } from './ozbek-47';

/** Darslik: Adabiyot 11, I qism (2018), 152–157-betlar — «Saddi Iskandariy» dostoni haqida; «Xamsa» jadvali. */
export const OZ_50: BoardLesson = {
  n: 50,
  label: '50',
  group: OZG8,
  title: '«Saddi Iskandariy» dostoni',
  section: 'Adabiyot, 1-qism: «Saddi Iskandariy» dostoni haqida; «Xamsa» dostonlari',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "«Saddi Iskandariy» (1485) — «Xamsa»ning beshinchi, yakunlovchi va eng yirik dostoni: 89 bob, 7215 bayt. Asosiy qismdagi har bir mavzu toʻrt boʻgʻinda yoritiladi: Iskandarning sarguzashti, shu mavzudagi mulohazalar, hikoyat va Iskandar bilan hakimlar suhbatidagi hikmatlar. Dostonda himmat, adolat, toʻgʻrilik, yoshlik, safar kabi 18 mavzu bor; u jangnoma emas, falsafiy-taʼlimiy asar. Iskandar adolatli podsho, mohir sarkarda va olimlarni eʼzozlovchi hukmdor sifatida koʻrsatiladi. «Xamsa» turkiy tilda birinchi marta yaratilgan va qisqa muddatda — 1483–1485-yillarda yozilgan.",
      easy: "«Saddi Iskandariy» — «Xamsa»ning oxirgi va eng katta dostoni. Unda Iskandar adolatli va bilimli podsho sifatida tasvirlanadi.",
      draw: [
        { t: 'title', text: 'Dostondagi bir mavzu tuzilishi' },
        { t: 'box', id: 's', x: 4, y: 24, w: 20, h: 12, text: 'sarguzasht', color: 'blue' },
        { t: 'box', id: 'm', x: 28, y: 24, w: 20, h: 12, text: 'mulohaza', color: 'green' },
        { t: 'box', id: 'h', x: 52, y: 24, w: 20, h: 12, text: 'hikoyat', color: 'orange' },
        { t: 'box', id: 'k', x: 76, y: 24, w: 20, h: 12, text: 'hikmat', color: 'purple' },
        { t: 'arrow', from: 's', to: 'm' },
        { t: 'arrow', from: 'm', to: 'h' },
        { t: 'arrow', from: 'h', to: 'k' },
        { t: 'text', x: 4, y: 64, text: '89 bob · 7215 bayt · 1485-yil', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 46, text: 'Qayu ishni taʼlim qilgʻon zamon,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 52, text: 'Eshitmak hamon erdi – bilmak hamon.', size: 's', color: 'purple' }
      ],
      next: 'Tayyorman!'
    }
  ],
  summary: [
    '«Saddi Iskandariy» (1485) — «Xamsa»ning yakunlovchi va eng yirik dostoni: 89 bob, 7215 bayt.',
    'Har bir mavzu sarguzasht, mulohaza, hikoyat va hikmat boʻgʻinlarida yoritiladi; doston falsafiy-taʼlimiy asar.',
    'Iskandar adolatli podsho, mohir sarkarda va olimlarni eʼzozlovchi hukmdor sifatida tasvirlanadi.'
  ],
  questions: [
    {
      id: 'oz50q1',
      prompt: '«Saddi Iskandariy» «Xamsa»ning nechanchi dostoni?',
      hint: 'Yakunlovchisi.',
      explanation: 'Beshinchi — yakunlovchi doston.',
      widget: { type: 'number_answer', props: { answer: 5, unit: '-doston' } }
    },
    {
      id: 'oz50q2',
      prompt: 'Doston necha bobdan iborat?',
      hint: 'Xamsaning eng uzuni.',
      explanation: '89 bobdan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['89', '63', '54', '38'], answerIndex: 0 } }
    },
    {
      id: 'oz50q3',
      prompt: '«Xamsa» dostonlarini yozilish tartibida joylang.',
      hint: '«Hayrat ul-abror» birinchi.',
      explanation: '«Hayrat ul-abror» → «Farhod va Shirin» → «Layli va Majnun» → «Sabʼai sayyor» → «Saddi Iskandariy».',
      widget: {
        type: 'order_line',
        props: { items: [{ label: '«Hayrat ul-abror»' }, { label: '«Farhod va Shirin»' }, { label: '«Layli va Majnun»' }, { label: '«Sabʼai sayyor»' }, { label: '«Saddi Iskandariy»' }] }
      }
    },
    {
      id: 'oz50q4',
      prompt: 'Asosiy qismdagi mavzu boʻgʻinlarini tartib bilan joylang.',
      hint: 'Avval voqea, oxirida hikmat.',
      explanation: 'Sarguzasht → mulohaza → hikoyat → hikmat.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'Iskandar sarguzashti' }, { label: 'mavzuga oid mulohaza' }, { label: 'hikoyat' }, { label: 'hakimlar hikmati' }] }
      }
    },
    {
      id: 'oz50q5',
      prompt: 'Doro yuborgan chavgon va koptokni Iskandar qanday talqin qiladi?',
      hint: 'Yer yumaloq.',
      explanation: 'Koptok — yumaloq yer yuzi, chavgon — uni boshqarish ramzi, deb javob beradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yer yuzi va uni boshqarish ramzi', 'bolalik oʻyinchogʻi', 'sulh belgisi', 'boj toʻlash buyrugʻi'], answerIndex: 0 } }
    },
    {
      id: 'oz50q6',
      prompt: 'Kakliklar voqeasidan Iskandar nega xursand boʻladi?',
      hint: 'Kuchli kuchsizga zugʻum qildi.',
      explanation: 'Zulm qilgan katta kaklikni burgut olib ketadi — zolim jazosini topishini koʻrib, gʻalabaga ishonadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['zolim jazosini topishini koʻrdi', 'ovga chiqish fursati keldi', 'kakliklar tinchlandi', 'burgutni oʻzi qoʻlga oldi'], answerIndex: 0 } }
    },
    {
      id: 'oz50q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Jangnoma emas.',
      explanation: 'Doston falsafiy-taʼlimiy asar; «Xamsa» turkiy tilda birinchi marta yaratilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Saddi Iskandariy» — asosan jang tasviridan iborat jangnoma.', value: false },
            { text: '«Xamsa» turkiy tilda birinchi marta yaratilgan.', value: true },
            { text: 'Iskandar safarlarida olimlarni oʻzi bilan olib yuradi.', value: true }
          ]
        }
      }
    },
    {
      id: 'oz50q8',
      prompt: '«Eshitmak hamon erdi – bilmak hamon» misrasi Iskandarning qaysi xislatini koʻrsatadi?',
      hint: 'Eshitishi bilan…',
      explanation: 'Har bir ilmni eshitishi bilanoq oʻzlashtirib olgan — ilmga chanqoqligi va zehni.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ilmni tez oʻzlashtirishi', 'jangovarligi', 'boyligi', 'sehrgarligi'], answerIndex: 0 } }
    }
  ]
};
