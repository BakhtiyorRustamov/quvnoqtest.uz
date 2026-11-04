import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 97–99-betlar — nutq texnikasida urgʻu, toʻxtam (pauza) va intonatsiya. */
export const OZ_23: BoardLesson = {
  n: 23,
  label: '23',
  group: OZG1,
  title: 'Urgʻu va toʻxtam (pauza)',
  section: 'Ona tili, 1-qism: «Nutq texnikasida urgʻu va toʻxtam (pauza)»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Nutq ohangi urgʻu, toʻxtam va intonatsiyadan tarkib topadi. Urgʻu ikki xil: soʻz urgʻusi va gap urgʻusi; gapdagi mantiqan muhim boʻlak gap urgʻusi bilan taʼkidlanadi. Notoʻgʻri toʻxtam fikrni buzadi: «Hovliga ikki / bolali ayol kirdi» desak — ikki ayol, «Hovliga ikki bolali / ayol kirdi» desak — bitta ayol. Intonatsiya gapning darak, soʻroq yoki his-hayajon ekanini koʻrsatadi.",
      easy: "Urgʻu — muhim soʻzni taʼkidlash, pauza — toʻgʻri joyda toʻxtash, ohang — gap turini bildirish.",
      draw: [
        { t: 'title', text: 'Toʻxtam maʼnoni oʻzgartiradi' },
        { t: 'text', x: 4, y: 22, text: 'Hovliga ikki / bolali ayol kirdi.', size: 's', color: 'blue' },
        { t: 'text', x: 8, y: 30, text: '→ ikkita ayol, har birining bolasi bor', size: 's' },
        { t: 'text', x: 4, y: 42, text: 'Hovliga ikki bolali / ayol kirdi.', size: 's', color: 'orange' },
        { t: 'text', x: 8, y: 50, text: '→ bitta ayol, ikkita bolasi bor', size: 's' },
        { t: 'text', x: 4, y: 62, text: 'olma (meva) — olma (feʼl: «olmagin»)', size: 's', color: 'green' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Nutq ohangi urgʻu, toʻxtam (pauza) va intonatsiyadan tarkib topadi.',
    'Urgʻu soʻz urgʻusi va gap urgʻusiga boʻlinadi; gap urgʻusi mantiqan muhim boʻlakni taʼkidlaydi.',
    'Notoʻgʻri toʻxtam fikrni yanglish anglatadi; intonatsiya gapning mazmuniy-hissiy turini koʻrsatadi.'
  ],
  questions: [
    {
      id: 'oz23q1',
      prompt: '«Hovliga ikki / bolali ayol kirdi» (pauza «ikki»dan keyin) gapida nechta ayol bor?',
      hint: '«Ikki» ayolga tegishli.',
      explanation: 'Ikkita ayol — har birining bolasi bor.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'ta' } }
    },
    {
      id: 'oz23q2',
      prompt: '«Hovliga ikki bolali / ayol kirdi» gapida nechta ayol bor?',
      hint: '«Ikki» bolaga tegishli.',
      explanation: 'Bitta ayol — uning ikkita bolasi bor.',
      widget: { type: 'number_answer', props: { answer: 1, unit: 'ta' } }
    },
    {
      id: 'oz23q3',
      prompt: 'Urgʻuning qanday turlari bor?',
      hint: 'Ikki xil.',
      explanation: 'Soʻz urgʻusi va gap urgʻusi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['soʻz urgʻusi va gap urgʻusi', 'yozma va ogʻzaki urgʻu', 'qisqa va uzun urgʻu', 'baland va past urgʻu'], answerIndex: 0 } }
    },
    {
      id: 'oz23q4',
      prompt: 'Gapni ohangiga koʻra turiga ajrating.',
      hint: 'Belgiga qarang.',
      explanation: 'Darak — nuqta; soʻroq — soʻroq belgisi; his-hayajon — undov belgisi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'd', label: 'darak' }, { id: 's', label: 'soʻroq' }, { id: 'h', label: 'his-hayajon' }],
          items: [
            { emoji: '📖', label: 'Ona ertak aytib berdi.', bin: 'd' },
            { emoji: '❓', label: 'Ona ertak aytib berdi?', bin: 's' },
            { emoji: '❗', label: 'Ona ertak aytib berdi!', bin: 'h' }
          ]
        }
      }
    },
    {
      id: 'oz23q5',
      prompt: 'Gap urgʻusi nimani taʼkidlaydi?',
      hint: 'Eng muhim boʻlak.',
      explanation: 'Gapdagi mantiqan muhim boʻlakni.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['mantiqan muhim boʻlakni', 'birinchi soʻzni', 'eng uzun soʻzni', 'tinish belgisini'], answerIndex: 0 } }
    },
    {
      id: 'oz23q6',
      prompt: 'Nutq ohangini tashkil etuvchi unsurlarni tanlang.',
      hint: 'Uchta.',
      explanation: 'Urgʻu, toʻxtam (pauza), mazmuniy-hissiy intonatsiya.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'urgʻu', correct: true },
            { label: 'toʻxtam (pauza)', correct: true },
            { label: 'intonatsiya', correct: true },
            { label: 'imlo' }
          ]
        }
      }
    },
    {
      id: 'oz23q7',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Labi labiga tegmaydi — tez gapiradi.',
      explanation: 'Labi labiga tegmaydi — juda tez va koʻp gapirmoq; labini tishlamoq — nima deyishini bilmay qolmoq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'labi labiga tegmaydi', right: 'juda tez va koʻp gapiradi' },
            { left: 'labini tishlamoq', right: 'nima deyishni bilmay qolmoq' }
          ]
        }
      }
    }
  ]
};
