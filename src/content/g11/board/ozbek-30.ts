import type { BoardLesson } from './types';

export const OZG3 = { kicker: 'Ona tili · II fasl', title: 'Soʻz qoʻllash meʼyorlari' };

/** Darslik: Ona tili 11, 2-qism (2020), 8-mavzu (26–30-betlar) — nutqda oʻrinli va nooʻrin soʻzlar; soʻz tanlashdagi xato turlari. */
export const OZ_30: BoardLesson = {
  n: 30,
  label: '30',
  group: OZG3,
  title: 'Nutqda oʻrinli va nooʻrin soʻzlar',
  section: 'Ona tili, 2-qism: 8-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Soʻzni anglash, farqlash, tanlash va qoʻllash bilim, farosat va mantiqiy tafakkur talab qiladi. Masalan, «Kechirasiz, mening joyimga oʻtirib olibsiz» deyish qoʻpol eshitiladi; «Kechirasiz, bu joyni men band qilgan edim» deyish farosatdan darak beradi. «Ikki kishi talashib qolishibdi» oʻrniga «tortishib qolishibdi» deyish oʻrinli. Soʻz tanlashdagi xatolar toʻrt xil: soʻzni notoʻgʻri qoʻllash, oʻrinsiz takrorlash, ortiqcha qoʻllash va kerakli soʻzni tushirib qoldirish.",
      easy: "Soʻzni oʻylab tanlang: «joyimga oʻtirib olibsiz» emas, «bu joyni band qilgan edim».",
      draw: [
        { t: 'title', text: 'Oʻrinli soʻz tanlash' },
        { t: 'table', x: 4, y: 18, rows: [['nooʻrin', 'oʻrinli'], ['joyimga oʻtirib olibsiz', 'bu joyni band qilgan edim'], ['talashib qolishibdi', 'tortishib qolishibdi']] },
        { t: 'list', x: 4, y: 40, items: ['soʻzni notoʻgʻri qoʻllash', 'oʻrinsiz takror', 'ortiqcha soʻz', 'soʻzni tushirib qoldirish'] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Soʻzni anglash, tanlash va qoʻllash bilim, farosat va mantiqiy tafakkur talab qiladi.',
    'Bir maʼnoni bildiruvchi soʻzlardan tinglovchiga malol kelmaydiganini tanlash — madaniyat belgisi.',
    'Soʻz tanlashdagi xatolar: notoʻgʻri qoʻllash, oʻrinsiz takror, ortiqcha soʻz, soʻzni tushirib qoldirish.'
  ],
  questions: [
    {
      id: 'oz30q1',
      prompt: 'Qaysi gap oʻrinli va madaniy?',
      hint: 'Ayblovsiz.',
      explanation: '«Kechirasiz, bu joyni men band qilgan edim» — muloyim va farosatli.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Kechirasiz, bu joyni men band qilgan edim.', 'Kechirasiz, mening joyimga oʻtirib olibsiz.', 'Joyimdan turing!'], answerIndex: 0 } }
    },
    {
      id: 'oz30q2',
      prompt: 'Gapni toʻgʻri soʻz bilan toʻldiring: «Al-Xorazmiy kitobining dovrugʻi … oshib jahonga taraldi.»',
      hint: 'Yuz yillar.',
      explanation: '«Asrlar osha» — «asr» yuz yil; «asir» esa tutqun.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['asrlar', 'asirlar'], answerIndex: 0 } }
    },
    {
      id: 'oz30q3',
      prompt: 'Gapni toʻgʻri soʻz bilan toʻldiring: «Kopernik kitobidagi … bugungi olimlar uchun maktab boʻldi.»',
      hint: 'Isbot.',
      explanation: '«Dalillar» — isbotlar; «dadil» — qoʻrqmas.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['dalillar', 'dadillar'], answerIndex: 0 } }
    },
    {
      id: 'oz30q4',
      prompt: 'Gapni xato turiga ajrating.',
      hint: 'Bir soʻz ikki marta — takror.',
      explanation: '«Kutubxonamiz … kutubxonalardan biri» — oʻrinsiz takror; «bolalarga xos keladigan» — ortiqcha soʻz («xos»).',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 't', label: 'oʻrinsiz takror' }, { id: 'o', label: 'ortiqcha soʻz' }],
          items: [
            { emoji: '📚', label: 'Kutubxonamiz tarmoqqa ulangan kutubxonalardan biri.', bin: 't' },
            { emoji: '🔁', label: 'Kitob haqida kitobda kitobxonlar yozdi.', bin: 't' },
            { emoji: '➕', label: 'Bolalarga xos keladigan kitoblar chiqdi.', bin: 'o' },
            { emoji: '🗣️', label: 'U oʻz avtobiografiyasini oʻzi yozdi.', bin: 'o' }
          ]
        }
      }
    },
    {
      id: 'oz30q5',
      prompt: 'Soʻzni oʻrinli qoʻllash uchun nimalar kerak?',
      hint: 'Uchta sifat.',
      explanation: 'Bilim, farosat va mantiqiy tafakkur.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'bilim', correct: true },
            { label: 'farosat', correct: true },
            { label: 'mantiqiy tafakkur', correct: true },
            { label: 'baland ovoz' }
          ]
        }
      }
    },
    {
      id: 'oz30q6',
      prompt: 'Qatorga mos soʻzni tanlang: «fahm, farosat, did, …»',
      hint: 'Aql bilan bogʻliq.',
      explanation: '«Zehn» — fahm, farosat qatoriga kiradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['zehn', 'mashaqqat', 'piching', 'lavang'], answerIndex: 0 } }
    },
    {
      id: 'oz30q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Uslub ham muhim.',
      explanation: 'Oʻrinli soʻzni aniqlashda nutq uslubi ham hisobga olinadi; xato turlaridan biri — kerakli soʻzni tushirib qoldirish.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kerakli soʻzni tushirib qoldirish ham soʻz tanlash xatosi.', value: true },
            { text: 'Oʻrinli soʻzni tanlashda nutq uslubi hisobga olinadi.', value: true },
            { text: '«Talashib qolishibdi» va «tortishib qolishibdi» hamma vaziyatda bir xil.', value: false }
          ]
        }
      }
    }
  ]
};
