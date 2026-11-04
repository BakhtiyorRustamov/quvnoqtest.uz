import type { BoardLesson } from './types';
import { OZG5 } from './ozbek-37';

/** Darslik: Ona tili 11, 2-qism (2020), 19-mavzu (69–74-betlar) — tinish belgilarini toʻgʻri qoʻllash: mazmunga taʼsiri, vergul oʻrni bilan maʼno oʻzgarishi. */
export const OZ_40: BoardLesson = {
  n: 40,
  label: '40',
  group: OZG5,
  title: 'Tinish belgilarini toʻgʻri qoʻllash',
  section: 'Ona tili, 2-qism: 19-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Tinish belgilari yozma nutqda gap mazmunidan kelib chiqib qoʻyiladi va gapning mazmuni hamda qurilishiga taʼsir qiladi; ular gap aniqligining sharti. Bitta vergulning oʻrni maʼnoni butunlay oʻzgartiradi: «Yigit, boshingdan baxt-u davlat yiroq ketmas» — yigitga murojaat; «Yigit boshingdan…» — «yigitlik boshing» maʼnosi. «Baxtli-taxtli boʻlgin, onang kabi baxtsiz boʻlma» va «Baxtli-taxtli boʻlgin onang kabi, baxtsiz boʻlma» gaplari ham bir-biriga zid.",
      easy: "Vergul joyini oʻzgartirsangiz, maʼno oʻzgaradi. Tinish belgisi — aniqlik sharti.",
      draw: [
        { t: 'title', text: 'Bir vergul — boshqa maʼno' },
        { t: 'text', x: 4, y: 22, text: 'Baxtli-taxtli boʻlgin, onang kabi baxtsiz boʻlma.', size: 's', color: 'blue' },
        { t: 'text', x: 8, y: 30, text: '→ onasi baxtsiz boʻlgan', size: 's' },
        { t: 'text', x: 4, y: 42, text: 'Baxtli-taxtli boʻlgin onang kabi, baxtsiz boʻlma.', size: 's', color: 'orange' },
        { t: 'text', x: 8, y: 50, text: '→ onasi baxtli boʻlgan', size: 's' }
      ],
      next: 'Qani, sinab koʻraylik'
    }
  ],
  summary: [
    'Tinish belgilari gap mazmunidan kelib chiqib qoʻyiladi.',
    'Ular gapning mazmuni va qurilishiga taʼsir qiladi, gap aniqligining sharti hisoblanadi.',
    'Vergulning oʻrni oʻzgarsa, gapning maʼnosi ham oʻzgarishi mumkin.'
  ],
  questions: [
    {
      id: 'oz40q1',
      prompt: '«Baxtli-taxtli boʻlgin onang kabi, baxtsiz boʻlma» gapida ona qanday boʻlgan?',
      hint: 'Vergul «onang kabi»dan keyin.',
      explanation: 'Baxtli — «onang kabi baxtli boʻl» maʼnosi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['baxtli', 'baxtsiz', 'aniq emas'], answerIndex: 0 } }
    },
    {
      id: 'oz40q2',
      prompt: 'Qaysi gapda yigitga murojaat qilinmoqda?',
      hint: 'Undalmadan keyin vergul.',
      explanation: '«Yigit, boshingdan…» — «yigit» undalma, vergul bilan ajratilgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Yigit, boshingdan baxt-u davlat yiroq ketmas.', 'Yigit boshingdan baxt-u davlat yiroq ketmas.'], answerIndex: 0 } }
    },
    {
      id: 'oz40q3',
      prompt: 'Tinish belgilari nimaga asoslanib qoʻyiladi?',
      hint: 'Maʼno.',
      explanation: 'Gap mazmunidan kelib chiqib.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['gap mazmuniga', 'gap uzunligiga', 'yozuvchining kayfiyatiga', 'soʻzlar soniga'], answerIndex: 0 } }
    },
    {
      id: 'oz40q4',
      prompt: 'Gapga qaysi tinish belgilari kerak: «Gadoy uning orqasidan qarab __ Baxtli boʻl __ __ dedi»?',
      hint: 'Koʻchirma gap.',
      explanation: 'Ikki nuqta, keyin koʻchirma gap: «Gadoy uning orqasidan qarab: – Baxtli boʻl! – dedi».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ikki nuqta, undov, tire', 'vergul, nuqta, vergul', 'nuqta, soʻroq, nuqta', 'qavs, nuqta, vergul'], answerIndex: 0 } }
    },
    {
      id: 'oz40q5',
      prompt: 'Qoʻshaloq holda ishlatiladigan tinish belgilarini tanlang.',
      hint: 'Ochiladi va yopiladi.',
      explanation: 'Qoʻshtirnoq va qavs juft holda ishlatiladi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'qoʻshtirnoq', correct: true },
            { label: 'qavs', correct: true },
            { label: 'nuqta' },
            { label: 'soʻroq belgisi' }
          ]
        }
      }
    },
    {
      id: 'oz40q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Aniqlik sharti.',
      explanation: 'Tinish belgilari gap aniqligining sharti; ular gap qurilishiga ham taʼsir qiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Tinish belgilari gap mazmuni aniqligining sharti.', value: true },
            { text: 'Vergulning oʻrni gap maʼnosiga taʼsir qilmaydi.', value: false },
            { text: 'Tinish belgilari gap qurilishiga taʼsir qiladi.', value: true }
          ]
        }
      }
    }
  ]
};
