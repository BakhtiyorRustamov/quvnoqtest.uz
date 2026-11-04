import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 16–18-betlar — madaniy nutqning kommunikativ sifatlari, nutq madaniyatining ikki bosqichi. */
export const OZ_3: BoardLesson = {
  n: 3,
  label: '3',
  group: OZG1,
  title: 'Madaniy nutqning asosiy sifatlari',
  section: 'Ona tili, 1-qism: «Madaniy nutq va uni shakllantiruvchi asosiy sifatlar»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Har qanday nutqning maqsadi tinglovchiga axborot va kayfiyat yetkazib, unga taʼsir qilishdir. Buning uchun nutq madaniy boʻlishi kerak. Madaniy nutqning yetti asosiy sifati bor: toʻgʻrilik, aniqlik, mantiqiylik, ifodalilik, boylik, soflik va joʻyalilik. Toʻgʻrilik — nutq madaniyatining birinchi bosqichi; qolgan sifatlarni ham mujassam etish esa ikkinchi, oliy bosqich.",
      easy: "Madaniy nutqning 7 sifati bor. Avval toʻgʻri gapirish, keyin qolgan sifatlar.",
      draw: [
        { t: 'title', text: 'Madaniy nutqning 7 sifati' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 28, h: 14, text: '1-bosqich: toʻgʻrilik', color: 'green' },
        { t: 'box', id: 'b', x: 44, y: 20, w: 52, h: 14, text: '2-bosqich: oliy sifatlar', color: 'purple' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'list', x: 44, y: 38, items: ['aniqlik', 'mantiqiylik', 'ifodalilik', 'boylik', 'soflik', 'joʻyalilik'] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Nutqning maqsadi — axborot va kayfiyatni yetkazib, tinglovchiga taʼsir qilish.',
    'Madaniy nutqning sifatlari: toʻgʻrilik, aniqlik, mantiqiylik, ifodalilik, boylik, soflik, joʻyalilik.',
    'Toʻgʻrilik — nutq madaniyatining birinchi bosqichi, qolgan sifatlarni ham egallash — oliy bosqich.'
  ],
  questions: [
    {
      id: 'oz3q1',
      prompt: 'Madaniy nutqning sifatlarini tanlang.',
      hint: 'Yetti sifat bor.',
      explanation: 'Toʻgʻrilik, aniqlik, mantiqiylik, ifodalilik, boylik, soflik, joʻyalilik. Tezlik va balandlik bunga kirmaydi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'aniqlik', correct: true },
            { label: 'soflik', correct: true },
            { label: 'joʻyalilik', correct: true },
            { label: 'mantiqiylik', correct: true },
            { label: 'tezlik' },
            { label: 'baland ovoz' }
          ]
        }
      }
    },
    {
      id: 'oz3q2',
      prompt: 'Madaniy nutqning nechta asosiy sifati bor?',
      hint: 'Haftada nechta kun boʻlsa, shuncha.',
      explanation: '7 ta.',
      widget: { type: 'number_answer', props: { answer: 7, unit: 'ta' } }
    },
    {
      id: 'oz3q3',
      prompt: 'Nutq madaniyatining birinchi bosqichi qaysi sifat?',
      hint: 'Boshqa sifatlarning poydevori.',
      explanation: 'Toʻgʻrilik — usiz boshqa sifatlar yuzaga kelmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['toʻgʻrilik', 'boylik', 'ifodalilik', 'joʻyalilik'], answerIndex: 0 } }
    },
    {
      id: 'oz3q4',
      prompt: 'Maqolning toʻgʻri shaklini tanlang.',
      hint: 'Mehmon otadan ham aziz deyiladi.',
      explanation: 'Asl shakli «Mehmon otangdan aziz». «Otangdek» deb oʻzgartirish maqolning maʼnosini buzadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Mehmon otangdan aziz', 'Mehmon otangdek aziz', 'Mehmon otang kabi aziz', 'Mehmon otangday aziz'], answerIndex: 0 } }
    },
    {
      id: 'oz3q5',
      prompt: '«Xonim», «begim» soʻzlaridagi -im qismi aslida nima?',
      hint: 'Qadimgi turkiy «uma».',
      explanation: 'Qadimgi turkiy tildagi «uma» — «ona» soʻzining ixchamlashgan shakli: xonim — «xon ona».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«ona» maʼnosidagi soʻz', 'egalik qoʻshimchasi', 'koʻplik qoʻshimchasi', 'kichraytirish qoʻshimchasi'], answerIndex: 0 } }
    },
    {
      id: 'oz3q6',
      prompt: 'Qaysi shakl toʻgʻri: «hayratomiz» yoki «hayratomuz»?',
      hint: '-omiz — «aralash», -omuz — «oʻrgatar».',
      explanation: '«Hayratomiz» — hayrat aralash; «-omuz» esa «oʻrgatuvchi» maʼnosini beradi (ibratomuz).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['hayratomiz', 'hayratomuz'], answerIndex: 0 } }
    },
    {
      id: 'oz3q7',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Istarasi issiq — yoqimli.',
      explanation: 'Istarasi issiq — xush koʻrinishli; ipidan ignasigacha — butun tafsiloti bilan.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'istarasi issiq', right: 'yoqimli, jozibador' },
            { left: 'ipidan ignasigacha', right: 'butun tafsiloti bilan' }
          ]
        }
      }
    }
  ]
};
