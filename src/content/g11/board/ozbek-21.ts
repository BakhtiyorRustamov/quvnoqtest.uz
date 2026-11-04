import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 87–91-betlar — ifodalilik va oʻxshatishlar: toʻrt unsur, erkin va turgʻun oʻxshatishlar. */
export const OZ_21: BoardLesson = {
  n: 21,
  label: '21',
  group: OZG1,
  title: 'Ifodalilik va oʻxshatishlar',
  section: 'Ona tili, 1-qism: «Ifodalilik va oʻxshatishlar»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Oʻxshatish toʻrt unsurdan iborat: oʻxshatiladigan narsa, oʻxshatish etaloni, oʻxshatish asosi va shakliy koʻrsatkich. «Yigit musichadek beozor» oʻxshatishida yigit — oʻxshatiladigan narsa, musicha — etalon, beozor — asos, -dek qoʻshimchasi — koʻrsatkich. Oʻxshatishlar ikki xil: erkin oʻxshatishni yozuvchi oʻzi yaratadi, u kutilmagan va ohorli boʻladi; turgʻun oʻxshatishlar esa xalq tilida urfga kirgan, masalan «otning qashqasiday maʼlum», «baqadek qotib qoldi».",
      easy: "Oʻxshatish: kim/nima + nimaga + qaysi belgisi + -dek. Erkin — yozuvchiniki, turgʻun — xalqniki.",
      draw: [
        { t: 'title', text: 'Oʻxshatishning 4 unsuri' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 22, h: 12, text: 'yigit', color: 'blue' },
        { t: 'box', id: 'b', x: 28, y: 20, w: 22, h: 12, text: 'musicha', color: 'green' },
        { t: 'box', id: 'c', x: 52, y: 20, w: 22, h: 12, text: '-dek', color: 'orange' },
        { t: 'box', id: 'd', x: 76, y: 20, w: 22, h: 12, text: 'beozor', color: 'purple' },
        { t: 'list', x: 4, y: 38, items: ['yigit — oʻxshatiladigan narsa', 'musicha — etalon', '-dek — shakliy koʻrsatkich', 'beozor — oʻxshatish asosi'] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Oʻxshatish toʻrt unsurdan iborat: oʻxshatiladigan narsa, etalon, asos va shakliy koʻrsatkich.',
    'Erkin oʻxshatishni ijodkor yaratadi; u kutilmagan va ohorli boʻladi.',
    'Turgʻun oʻxshatishlar xalq tilida urfga kirib, tayyor iboralar kabi qoʻllanadi.'
  ],
  questions: [
    {
      id: 'oz21q1',
      prompt: '«Yigit musichadek beozor» oʻxshatishining unsurlarini juftlang.',
      hint: 'Musicha — etalon.',
      explanation: 'Yigit — oʻxshatiladigan narsa; musicha — etalon; beozor — asos; -dek — shakliy koʻrsatkich.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'yigit', right: 'oʻxshatiladigan narsa' },
            { left: 'musicha', right: 'oʻxshatish etaloni' },
            { left: 'beozor', right: 'oʻxshatish asosi' },
            { left: '-dek', right: 'shakliy koʻrsatkich' }
          ]
        }
      }
    },
    {
      id: 'oz21q2',
      prompt: 'Oʻxshatishni turiga ajrating.',
      hint: 'Xalqda urf boʻlgani — turgʻun.',
      explanation: 'Turgʻun — otning qashqasiday maʼlum, baqadek qotib qoldi, oʻqday uchdi; erkin — yozuvchi yangi yaratgan oʻxshatishlar.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 't', label: 'turgʻun' }, { id: 'e', label: 'erkin' }],
          items: [
            { emoji: '🐎', label: 'otning qashqasiday maʼlum', bin: 't' },
            { emoji: '🐸', label: 'baqadek qotib qoldi', bin: 't' },
            { emoji: '🏹', label: 'oʻqday uchib ketdi', bin: 't' },
            { emoji: '🌾', label: 'egatlardagi suvlar maydalab oʻrilgan sochlardek', bin: 'e' },
            { emoji: '❄️', label: 'qor oyoq ostida gʻirchillama etik singari ovoz berardi', bin: 'e' }
          ]
        }
      }
    },
    {
      id: 'oz21q3',
      prompt: 'Oʻxshatish nechta unsurdan iborat?',
      hint: 'Narsa, etalon, asos, koʻrsatkich.',
      explanation: '4 ta.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'ta' } }
    },
    {
      id: 'oz21q4',
      prompt: '«Koʻchalari oʻqday toʻgʻri» oʻxshatishida «oʻqday» nimani bildiradi?',
      hint: 'Egri emas.',
      explanation: 'Toʻgʻri, adil — egri boʻlmagan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['toʻgʻri, egri emas', 'juda tez', 'juda xavfli', 'juda uzun'], answerIndex: 0 } }
    },
    {
      id: 'oz21q5',
      prompt: 'Erkin oʻxshatishning xususiyatlarini tanlang.',
      hint: 'Yozuvchi yaratadi.',
      explanation: 'Yozuvchi yaratadi, kutilmagan va ohorli boʻladi; xalqda urfga kirgani — turgʻun.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ijodkor yaratadi', correct: true },
            { label: 'kutilmagan, ohorli', correct: true },
            { label: 'xalq tilida qotib qolgan' }
          ]
        }
      }
    },
    {
      id: 'oz21q6',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Qoʻltigʻiga suv purkamoq — gijgijlamoq.',
      explanation: 'Qoʻltigʻiga suv purkamoq — oʻchakishtirmoq; hasratidan chang chiqmoq — juda norozilik bildirmoq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'qoʻltigʻiga suv purkamoq', right: 'gijgijlamoq' },
            { left: 'hasratidan chang chiqmoq', right: 'qattiq norozilik bildirmoq' }
          ]
        }
      }
    },
    {
      id: 'oz21q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Turgʻun oʻxshatish — tayyor birlik.',
      explanation: 'Turgʻun oʻxshatishlar frazeologik birliklar kabi tayyor holda qoʻllanadi; erkin oʻxshatish yozuvchi mahoratini koʻrsatadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Turgʻun oʻxshatishlar tayyor iboralar kabi nutqqa kiritiladi.', value: true },
            { text: 'Erkin oʻxshatish yozuvchi mahoratini koʻrsatadi.', value: true },
            { text: 'Oʻxshatishda shakliy koʻrsatkich hech qachon boʻlmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
