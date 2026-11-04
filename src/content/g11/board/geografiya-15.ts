import type { BoardLesson } from './types';
import { GEO4 } from './geografiya-13';

/** Darslik: Geografiya 10, 15-§ (63–68-betlar) — geografik prognoz, uning muddatlari va miqyoslari (sayyoraviy, mintaqaviy, mahalliy), komponentlarning prognozli xossalari, Oʻzbekiston tabiat komplekslari prognozi. */
export const GEO_15: BoardLesson = {
  n: 15,
  label: '15',
  group: GEO4,
  title: 'Geografik prognoz',
  section: '15-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Inson faqat bugungi tabiat bilan emas, kelajakda nima oʻzgarishi bilan ham qiziqadi. Prognoz — biror hodisa yoki obyekt holatining oʻzgarishini oldindan koʻra bilish. Geografik prognoz esa tabiiy muhit va ishlab chiqarish majmualarining kelajakdagi oʻzgarish yoʻnalishlarini ilmiy asoslash. Prognoz bir nechta variantda tuziladi va eng maqbuli tanlanadi. Muddatiga koʻra: operativ — 1 oygacha, qisqa muddatli — 1 oydan 1 yilgacha, oʻrta muddatli — 1–5 yil, uzoq muddatli — 5–15 yil, juda uzoq muddatli — 15 yildan ortiq.",
      easy: "Geografik prognoz — kelajakdagi oʻzgarishlarni ilmiy asoslash; muddatlar: operativdan juda uzoq muddatligacha.",
      draw: [
        { t: 'title', text: 'Prognoz muddatlari' },
        { t: 'table', x: 4, y: 18, rows: [['prognoz', 'muddati'], ['operativ', '1 oygacha'], ['qisqa muddatli', '1 oy – 1 yil'], ['oʻrta muddatli', '1–5 yil'], ['uzoq muddatli', '5–15 yil'], ['juda uzoq muddatli', '15 yildan ortiq']] }
      ],
      next: 'Miqyoslar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Miqyosiga koʻra prognozlar uch xil. Sayyoraviy prognozlar butun insoniyatga taalluqli muammolarga bagʻishlanadi: havo ifloslanishi, ozon qatlamining yupqalanishi, «issiqxona samarasi», choʻllashish, toza ichimlik suvi tanqisligi. Mintaqaviy prognozlar bir nechta davlatga taalluqli hududlar uchun tuziladi: masalan, neft tashish va chiqindilar tufayli ifloslanayotgan Boltiq, Qora dengiz, Meksika qoʻltigʻi. Mahalliy prognozlar biror zavod, suv ombori yoki konning tabiatga taʼsirini oldindan baholaydi. Prognoz uchun komponentlarning xossalari muhim: botiqlar chiqindilarni toʻplaydi, tez oqar suv ifloslikni tez olib ketadi, ayrim oʻsimliklar zararli moddalarni yutadi.",
      easy: "Miqyoslar: sayyoraviy (global muammolar), mintaqaviy (bir nechta davlat), mahalliy (bitta inshoot).",
      draw: [
        { t: 'title', text: 'Prognoz miqyoslari' },
        { t: 'box', id: 's', x: 4, y: 22, w: 28, h: 10, text: 'sayyoraviy', color: 'purple' },
        { t: 'box', id: 'm', x: 36, y: 22, w: 28, h: 10, text: 'mintaqaviy', color: 'blue' },
        { t: 'box', id: 'h', x: 68, y: 22, w: 28, h: 10, text: 'mahalliy', color: 'green' },
        { t: 'arrow', from: 's', to: 'm' },
        { t: 'arrow', from: 'm', to: 'h' },
        { t: 'text', x: 4, y: 46, text: 'ozon qatlami · dengizlar · bitta zavod', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Geografik prognoz — tabiiy muhit va ishlab chiqarish majmualarining kelajakdagi oʻzgarishini ilmiy asoslash; u bir nechta variantda tuzilib, eng maqbuli tanlanadi.',
    'Muddatiga koʻra prognozlar operativ (1 oygacha), qisqa, oʻrta, uzoq (5–15 yil) va juda uzoq muddatli boʻladi.',
    'Miqyosiga koʻra ular sayyoraviy, mintaqaviy va mahalliy boʻladi; prognozda relyef, jinslar, suv, tuproq va oʻsimliklarning xossalari hisobga olinadi.'
  ],
  questions: [
    {
      id: 'g15q1',
      prompt: 'Prognoz turlarini muddati ortib borishi tartibida joylashtiring.',
      hint: 'Operativ — eng qisqa.',
      explanation: 'Operativ → qisqa muddatli → oʻrta muddatli → uzoq muddatli → juda uzoq muddatli.',
      widget: { type: 'order_line', props: { items: [{ label: 'operativ' }, { label: 'qisqa muddatli' }, { label: 'oʻrta muddatli' }, { label: 'uzoq muddatli' }, { label: 'juda uzoq muddatli' }] } }
    },
    {
      id: 'g15q2',
      prompt: 'Muammoni prognoz miqyosiga ajrating.',
      hint: 'Ozon — butun sayyora.',
      explanation: 'Sayyoraviy — ozon qatlami, issiqxona samarasi; mintaqaviy — Qora dengiz ifloslanishi, Boltiq dengizi; mahalliy — yangi zavodning taʼsiri, ochiq kon.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 's', label: 'sayyoraviy' }, { id: 'm', label: 'mintaqaviy' }, { id: 'h', label: 'mahalliy' }],
          items: [
            { emoji: '🌍', label: 'ozon qatlamining yupqalanishi', bin: 's' },
            { emoji: '🌡️', label: '«issiqxona samarasi»', bin: 's' },
            { emoji: '🌊', label: 'Qora dengizning ifloslanishi', bin: 'm' },
            { emoji: '🛢️', label: 'Boltiq dengizidagi neft dogʻlari', bin: 'm' },
            { emoji: '🏭', label: 'yangi zavodning atrofga taʼsiri', bin: 'h' },
            { emoji: '⛏️', label: 'ochiq usuldagi kon', bin: 'h' }
          ]
        }
      }
    },
    {
      id: 'g15q3',
      prompt: 'Uzoq muddatli prognoz necha yilgacha tuziladi?',
      hint: '5 yildan ... gacha.',
      explanation: '15 yilgacha.',
      widget: { type: 'number_answer', props: { answer: 15, unit: 'yil' } }
    },
    {
      id: 'g15q4',
      prompt: 'Komponentni uning prognozli xossasi bilan juftlang.',
      hint: 'Botiq — toʻplaydi.',
      explanation: 'Botiqlar — chiqindilarni toʻplaydi; tez oqar suv — ifloslikni tez olib ketadi; ayrim oʻsimliklar — zararli moddalarni yutadi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'relyef botiqlari', right: 'chiqindilarni toʻplaydi' },
            { left: 'tez oqar suv', right: 'ifloslikni tez olib ketadi' },
            { left: 'ayrim oʻsimliklar', right: 'zararli moddalarni yutadi' }
          ]
        }
      }
    },
    {
      id: 'g15q5',
      prompt: 'Prognoz deganda nima tushuniladi?',
      hint: 'Oldindan.',
      explanation: 'Hodisa yoki obyekt holatining oʻzgarishini oldindan koʻra bilish va ayta olish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻzgarishni oldindan koʻra bilish', 'oʻtmishni tasvirlash', 'xarita chizish', 'tuproqni yuvish'], answerIndex: 0 } }
    },
    {
      id: 'g15q6',
      prompt: 'Ochiq usulda kon qazilganda qanday oʻzgarishlar kutiladi?',
      hint: 'Mahalliy prognoz.',
      explanation: 'Botiq va tashlamalar hosil boʻladi, yer osti suvlari sathi pasayadi, surilma va oʻpirilmalar rivojlanadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'botiq va tashlamalar hosil boʻladi', correct: true },
            { label: 'yer osti suvlari sathi pasayadi', correct: true },
            { label: 'surilma va oʻpirilmalar rivojlanadi', correct: true },
            { label: 'yangi oʻrmon oʻz-oʻzidan oʻsadi' }
          ]
        }
      }
    },
    {
      id: 'g15q7',
      prompt: 'Oʻzbekistonda qaysi tabiat komplekslari inson taʼsirida eng kuchsiz oʻzgargan?',
      hint: 'Eng baland joylar.',
      explanation: 'Oʻrtacha va baland togʻlar tabiat komplekslari.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻrtacha va baland togʻlar', 'togʻoldi tekisliklari', 'sugʻoriladigan vohalar', 'delta tekisliklari'], answerIndex: 0 } }
    },
    {
      id: 'g15q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Variantlar.',
      explanation: 'Prognoz bir nechta variantda tuzilib, eng maqbuli tanlanadi; togʻoldi komplekslari kuchli oʻzgargan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Geografik prognoz bir nechta variantda tuzilib, eng maqbuli tanlanadi.', value: true },
            { text: 'Oʻzbekistonda togʻoldi tabiat komplekslari kuchli oʻzgargan.', value: true },
            { text: 'Operativ prognoz 15 yildan ortiq muddatga tuziladi.', value: false },
            { text: 'Mahalliy prognozlar butun sayyora muammolarini oʻrganadi.', value: false }
          ]
        }
      }
    }
  ]
};
