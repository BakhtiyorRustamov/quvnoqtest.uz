import type { BoardLesson } from './types';

export const OZG11 = { kicker: 'Adabiyot · VI', title: 'Jahon adabiyoti' };

/** Darslik: Adabiyot 11, II qism (2018), 152–163-betlar — Anton Pavlovich Chexov, «Garov» hikoyasi va u haqida. */
export const OZ_67: BoardLesson = {
  n: 67,
  label: '67',
  group: OZG11,
  title: 'Chexov. «Garov»',
  section: 'Adabiyot, 2-qism: Anton Pavlovich Chexov (1860–1904); «Garov» hikoyasi va u haqida',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Anton Pavlovich Chexov (1860–1904) — Taganrogda tugʻilgan rus yozuvchisi, kasbi shifokor; «Chayka», «Vanya amaki», «Olchazor» pyesalari va qisqa, teran hikoyalari bilan mashhur. «Garov» hikoyasida bir kechada oʻlim jazosi va umrbod qamoq haqida bahs boʻladi. Bankir ikki million tikadi, yigirma besh yoshli huquqshunos esa oʻn besh yil ixtiyoriy hibsda oʻtirishga rozi boʻladi. Yillar davomida u minglab kitob oʻqiydi; bankir esa boyligidan ayrilib, pulni saqlab qolish uchun mahbusni oʻldirishni niyat qiladi. Ammo mahbus yozgan maktubni oʻqiydi: unda mol-dunyo oʻtkinchi ekani aytilgan va u pulni rad etib, muddatdan besh soat oldin qochib, shartni ataylab buzadi.",
      easy: "«Garov»da bankir va huquqshunos oʻn besh yillik qamoq uchun garov oʻynaydi. Oxirida mahbus puldan voz kechadi.",
      draw: [
        { t: 'title', text: 'Garov sharti' },
        { t: 'box', id: 'b', x: 4, y: 22, w: 38, h: 14, text: 'bankir: 2 million tikadi', color: 'orange' },
        { t: 'box', id: 'h', x: 58, y: 22, w: 38, h: 14, text: 'huquqshunos: 15 yil hibs', color: 'blue' },
        { t: 'arrow', from: 'b', to: 'h' },
        { t: 'text', x: 4, y: 50, text: 'Yakun: mahbus pulni rad etadi,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 56, text: 'besh soat oldin qochib shartni buzadi', size: 's', color: 'purple' }
      ],
      next: 'Mashqlarga oʻtamiz'
    }
  ],
  summary: [
    'Chexov (1860–1904) — rus yozuvchisi va shifokor; qisqa hikoyalari va pyesalari bilan mashhur.',
    '«Garov»da bankir ikki million tikadi, yosh huquqshunos oʻn besh yil hibsda oʻtirishga rozi boʻladi.',
    'Mahbus mol-dunyo oʻtkinchi degan xulosaga kelib, puldan voz kechadi; hikoya hayot mazmuni va kitob qadri haqida.'
  ],
  questions: [
    {
      id: 'oz67q1',
      prompt: 'Huquqshunos necha yil hibsda oʻtirishga rozi boʻladi?',
      hint: 'Besh emas.',
      explanation: 'Oʻn besh yil.',
      widget: { type: 'number_answer', props: { answer: 15, unit: 'yil' } }
    },
    {
      id: 'oz67q2',
      prompt: 'Bankir garovga qancha pul tikadi?',
      hint: 'Million.',
      explanation: 'Ikki million.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ikki million', 'bir million', 'besh million', 'yuz ming'], answerIndex: 0 } }
    },
    {
      id: 'oz67q3',
      prompt: 'Garov qanday bahsdan kelib chiqadi?',
      hint: 'Kechadagi suhbat.',
      explanation: 'Oʻlim jazosi va umrbod qamoqning qaysi biri insoniyroq degan bahsdan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻlim jazosi va umrbod qamoq haqida', 'eng yaxshi kitob haqida', 'savdo foydasi haqida', 'sayohat haqida'], answerIndex: 0 } }
    },
    {
      id: 'oz67q4',
      prompt: 'Voqealarni tartib bilan joylang.',
      hint: 'Bahs — garov — maktub.',
      explanation: 'Kechadagi bahs → garov → oʻn besh yil mutolaa → maktub va qochish.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'kechadagi bahs' }, { label: 'garov boylanadi' }, { label: 'yillar mutolaada oʻtadi' }, { label: 'maktub va qochish' }] }
      }
    },
    {
      id: 'oz67q5',
      prompt: 'Mahbus muddatdan qancha oldin qochadi?',
      hint: 'Soat.',
      explanation: 'Besh soat oldin — shartni ataylab buzish uchun.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'soat' } }
    },
    {
      id: 'oz67q6',
      prompt: 'Maktubni oʻqigan bankir qanday holatga tushadi?',
      hint: 'Oʻzidan…',
      explanation: 'Hech qachon boʻlmaganidek oʻzidan nafratlanadi, koʻzlariga yosh oladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻzidan nafratlanadi', 'xursand boʻlib bayram qiladi', 'politsiyani chaqiradi', 'yana garov taklif qiladi'], answerIndex: 0 } }
    },
    {
      id: 'oz67q7',
      prompt: 'Chexov pyesalarini belgilang.',
      hint: 'Teatr asarlari.',
      explanation: '«Chayka», «Vanya amaki», «Olchazor» — Chexov pyesalari; «Choliqushi» — Guntekin romani.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: '«Chayka»', correct: true },
            { label: '«Vanya amaki»', correct: true },
            { label: '«Olchazor»', correct: true },
            { label: '«Choliqushi»' }
          ]
        }
      }
    },
    {
      id: 'oz67q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kasbi.',
      explanation: 'Chexov tibbiyot fakultetini tugatib shifokor boʻlib ishlagan; hikoyalarida kam soʻz bilan katta voqealarni tasvirlagan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Chexov kasbi boʻyicha shifokor boʻlgan.', value: true },
            { text: 'Chexov hikoyalari kam soʻz bilan katta maʼno berishi bilan ajralib turadi.', value: true },
            { text: '«Garov» oxirida mahbus ikki millionni olib ketadi.', value: false }
          ]
        }
      }
    }
  ]
};
