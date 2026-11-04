import type { BoardLesson } from './types';
import { OZG10 } from './ozbek-64';

/** Darslik: Adabiyot 11, II qism (2018), 105–119-betlar — Mustaqillik davri nasri; Muhammad Ali, «Sohibqiron oʻylari». */
export const OZ_65: BoardLesson = {
  n: 65,
  label: '65',
  group: OZG10,
  title: 'Mustaqillik davri nasri',
  section: 'Adabiyot, 2-qism: Mustaqillik davri nasri; Muhammad Ali, «Sohibqiron oʻylari» («Ulugʻ saltanat» epopeyasidan)',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Istiqlol yillarida tarixiy va zamonaviy mavzuda romanlar, qissa va hikoyalar yozildi; yangi yoʻnalishlar va yosh adiblar paydo boʻldi. Bu davr nasrida insoniy qadriyatlar, milliy urf-odatlar, tarixiy shaxslar hayotining badiiy talqini, inson va tabiat munosabati yetakchi mavzular boʻldi. Muhammad Alining «Ulugʻ saltanat» epopeyasi toʻrtinchi kitobidan olingan «Sohibqiron oʻylari» parchasida Amir Temur Egridir koʻli sohilida dam olar ekan, oʻtmishni oʻylaydi. U sakson yoshli chol daraxt ekayotganini koʻrib, unga havas qilgani va hamyon inʼom etganini eslaydi. Chol «daraxtimni ekiboq mevasini totib turibman» deb kuladi; Sohibqiron oʻz niholi — valiahd Muhammad Sultonni shu daraxtga qiyoslaydi.",
      easy: "Mustaqillik davri nasrida tarixiy mavzular koʻpaydi. «Sohibqiron oʻylari»da Amir Temur kelajakka ishonch haqida oʻylaydi.",
      draw: [
        { t: 'title', text: '«Sohibqiron oʻylari»' },
        { t: 'box', id: 'c', x: 4, y: 22, w: 28, h: 14, text: 'chol nihol ekadi', color: 'green' },
        { t: 'box', id: 'h', x: 36, y: 22, w: 28, h: 14, text: 'Temur hamyon beradi', color: 'orange' },
        { t: 'box', id: 'm', x: 68, y: 22, w: 28, h: 14, text: 'nihol — valiahd shahzoda', color: 'blue' },
        { t: 'arrow', from: 'c', to: 'h' },
        { t: 'arrow', from: 'h', to: 'm' },
        { t: 'text', x: 4, y: 50, text: 'Gʻoya: ertangi kunga umid va ishonch', size: 's', color: 'purple' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Mustaqillik davri nasrida tarixiy va zamonaviy mavzudagi romanlar, qissa va hikoyalar yaratildi.',
    'Yetakchi mavzular: insoniy qadriyatlar, milliy urf-odatlar, tarixiy shaxslar, inson va tabiat.',
    '«Sohibqiron oʻylari»da nihol ekayotgan chol voqeasi orqali kelajakka umid va ishonch gʻoyasi beriladi.'
  ],
  questions: [
    {
      id: 'oz65q1',
      prompt: '«Sohibqiron oʻylari» qaysi asardan olingan?',
      hint: 'Epopeya.',
      explanation: 'Muhammad Alining «Ulugʻ saltanat» epopeyasi toʻrtinchi kitobidan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Ulugʻ saltanat»', '«Kecha va kunduz»', '«Oʻtkan kunlar»', '«Tanho qayiq»'], answerIndex: 0 } }
    },
    {
      id: 'oz65q2',
      prompt: 'Parchada Amir Temur qaysi koʻl sohilida dam oladi?',
      hint: 'Kichik Osiyoda.',
      explanation: 'Egridir koʻli sohilida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Egridir koʻli', 'Issiqkoʻl', 'Orol dengizi', 'Aydarkoʻl'], answerIndex: 0 } }
    },
    {
      id: 'oz65q3',
      prompt: 'Daraxt ekayotgan chol taxminan necha yoshda edi?',
      hint: 'Sakson.',
      explanation: 'Sakson yoshlarda.',
      widget: { type: 'number_answer', props: { answer: 80, unit: 'yosh' } }
    },
    {
      id: 'oz65q4',
      prompt: 'Voqealarni tartib bilan joylang.',
      hint: 'Avval chol, oxirida shahzoda.',
      explanation: 'Chol nihol ekadi → Temur unga hamyon beradi → chol «mevasini totib turibman» deydi → Temur nihol bilan valiahdni qiyoslaydi.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'chol nihol ekadi' }, { label: 'Temur hamyon beradi' }, { label: 'chol mevasini totdim deydi' }, { label: 'nihol — valiahd shahzoda' }] }
      }
    },
    {
      id: 'oz65q5',
      prompt: 'Amir Temur oʻz «nihol»i deb kimni ataydi?',
      hint: 'Valiahd.',
      explanation: 'Valiahd shahzoda Muhammad Sultonni.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Muhammad Sulton', 'Ulugʻbek', 'Xalil Sulton', 'Umar Mirzo'], answerIndex: 0 } }
    },
    {
      id: 'oz65q6',
      prompt: 'Mustaqillik davri nasrining yetakchi mavzularini belgilang.',
      hint: 'Toʻrt mavzu.',
      explanation: 'Insoniy qadriyatlar, milliy urf-odatlar, tarixiy shaxslar talqini, inson va tabiat.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'insoniy qadriyatlar', correct: true },
            { label: 'tarixiy shaxslar hayoti', correct: true },
            { label: 'inson va tabiat', correct: true },
            { label: 'faqat sayohatnomalar' }
          ]
        }
      }
    },
    {
      id: 'oz65q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Vaqt argʻumogʻi.',
      explanation: 'Parcha zamonni chavandozsiz argʻumoqqa oʻxshatish bilan boshlanadi; chol voqeasi kelajakka ishonch ramzi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Parcha vaqtni chavandozsiz uchqur argʻumoqqa oʻxshatish bilan boshlanadi.', value: true },
            { text: 'Chol voqeasi ertangi kunga umid ramzi sifatida beriladi.', value: true },
            { text: 'Parchada Amir Temur Hindistonni hali koʻrmagan.', value: false }
          ]
        }
      }
    }
  ]
};
