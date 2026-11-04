import type { BoardLesson } from './types';
import { OZG7 } from './ozbek-43';

/** Darslik: Adabiyot 11, I qism (2018), 61–65-betlar — «Alp Er Toʻnga marsiyasi» va marsiya janri haqida tushuncha. */
export const OZ_44: BoardLesson = {
  n: 44,
  label: '44',
  group: OZG7,
  title: '«Alp Er Toʻnga marsiyasi»',
  section: 'Adabiyot, 1-qism: «Alp Er Toʻnga marsiyasi»; marsiya haqida tushuncha',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Marsiya — biror kishining vafoti munosabati bilan gʻam, hasrat va qaygʻuni ifodalagan lirik sheʼr yoki qoʻshiq. «Devonu lugʻot at-turk»da saqlangan «Alp Er Toʻnga marsiyasi» — bu janrning bizgacha yetib kelgan eng qadimiy namunalaridan. Alp Er Toʻnga — turklarning qadimiy qahramoni, Afrosiyob nomi bilan ham tanilgan «beklar begi». Marsiyada uning oʻlimi oʻrnini toʻldirib boʻlmaydigan yoʻqotish sifatida tasvirlanadi: xalq boʻridek uladi, beklarning yuzi sargʻayadi, fazilat egalari kamayadi. Sheʼr murabbaʼ shaklida, barmoq vaznida — har misra yetti boʻgʻin, turoqlar 4+3.",
      easy: "Marsiya — vafot etgan kishiga bagʻishlangan qaygʻuli sheʼr. Alp Er Toʻnga marsiyasi — eng qadimgilaridan biri.",
      draw: [
        { t: 'title', text: 'Alp Er Toʻnga marsiyasi' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'maʼlumot'], ['janr', 'marsiya'], ['qahramon', 'Alp Er Toʻnga (Afrosiyob)'], ['shakl', 'murabbaʼ — 4 misrali band'], ['qofiya', 'a-a-a-b'], ['vazn', 'barmoq: 7 boʻgʻin, 4+3']] },
        { t: 'text', x: 4, y: 58, text: 'Alp Er Toʻnga oʻldimu? Esiz, ajun qaldumu?', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 64, text: 'Oʻzlak oʻchin aldumu? Emdi yurak yirtulur.', size: 's', color: 'purple' }
      ],
      next: 'Qani, sinab koʻraylik'
    }
  ],
  summary: [
    'Marsiya — kishining vafoti munosabati bilan gʻam va qaygʻuni ifodalovchi lirik sheʼr.',
    '«Alp Er Toʻnga marsiyasi» — janrning eng qadimiy namunalaridan; unda xalq qahramoni Afrosiyobning oʻlimi katta fojia sifatida tasvirlanadi.',
    'Marsiya murabbaʼ shaklida (a-a-a-b), barmoq vaznida: har misra 7 boʻgʻin, turoqlar 4+3.'
  ],
  questions: [
    {
      id: 'oz44q1',
      prompt: 'Marsiya qanday sheʼr?',
      hint: 'Qaygʻu.',
      explanation: 'Kishining vafoti munosabati bilan gʻam va hasratni ifodalovchi sheʼr.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['vafot etgan kishiga bagʻishlangan qaygʻuli sheʼr', 'bahor haqidagi sheʼr', 'kulgili sheʼr', 'ikki narsaning bahsi'], answerIndex: 0 } }
    },
    {
      id: 'oz44q2',
      prompt: 'Alp Er Toʻnga yana qanday nom bilan tanilgan?',
      hint: 'Yusuf Xos Hojib yozgan.',
      explanation: 'Afrosiyob.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Afrosiyob', 'Siyovush', 'Rustam', 'Goʻroʻgʻli'], answerIndex: 0 } }
    },
    {
      id: 'oz44q3',
      prompt: 'Marsiyaning har bir misrasi necha boʻgʻindan iborat?',
      hint: '4 + 3.',
      explanation: '7 boʻgʻin.',
      widget: { type: 'number_answer', props: { answer: 7, unit: 'boʻgʻin' } }
    },
    {
      id: 'oz44q4',
      prompt: 'Marsiyada xalq qaygʻusi qanday tasvirlangan?',
      hint: 'Tashqi koʻrinish va harakat.',
      explanation: 'Xalq boʻridek uladi, yoqa yirtib yigʻlaydi, beklarning yuzi sargʻayadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'xalq boʻridek uladi', correct: true },
            { label: 'yoqa yirtib yigʻlaydi', correct: true },
            { label: 'beklarning yuzi sargʻayadi', correct: true },
            { label: 'bayram qilinadi' }
          ]
        }
      }
    },
    {
      id: 'oz44q5',
      prompt: 'Atamani izohi bilan juftlang.',
      hint: 'Murabbaʼ — toʻrtlik.',
      explanation: 'Murabbaʼ — 4 misrali bandlardan iborat sheʼr; barmoq — boʻgʻin sanogʻiga asoslangan vazn; turoq — misradagi boʻgʻinlar guruhi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'murabbaʼ', right: '4 misrali bandlar' },
            { left: 'barmoq', right: 'boʻgʻinlar soniga asoslangan vazn' },
            { left: 'turoq', right: 'misradagi boʻgʻinlar guruhi' }
          ]
        }
      }
    },
    {
      id: 'oz44q6',
      prompt: 'Marsiyaga koʻra Alp Er Toʻnganing oʻlimidan keyin nima boʻldi?',
      hint: 'Yovuzlar…',
      explanation: 'Yovuz va yaramaslar bosh koʻtardi, fazilat egalari kamaydi, odob zaiflashdi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yovuzlar koʻpayib, fazilat egalari kamaydi', 'xalq yanada boyib ketdi', 'hech narsa oʻzgarmadi', 'yangi shahar qurildi'], answerIndex: 0 } }
    },
    {
      id: 'oz44q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ogʻzaki ijod.',
      explanation: 'Marsiya ogʻzaki ijod mahsuli; keyingi davrlarda marsiyalar gʻazal, muxammas kabi shakllarda ham yozilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Alp Er Toʻnga marsiyasi — ogʻzaki ijod mahsuli.', value: true },
            { text: 'Keyingi davrlarda marsiyalar gʻazal, muxammas shakllarida ham yozilgan.', value: true },
            { text: 'Alp Er Toʻnga marsiyasi aruz vaznida.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz44q8',
      prompt: 'Band boshidagi soʻroqlar qanday ohang beradi?',
      hint: 'Javob kutilmaydi.',
      explanation: 'Ritorik soʻroqlar chuqur qaygʻu va iztirobni kuchaytiradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qaygʻu va iztirob', 'quvonch', 'hazil', 'buyruq'], answerIndex: 0 } }
    }
  ]
};
