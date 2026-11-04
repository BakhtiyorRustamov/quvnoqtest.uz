import type { BoardLesson } from './types';
import { BOB5 } from './kimyo-22';

/** Takrorlash (savollar): darslik, 5-bob (22–24-mavzular) — "Mavzuga doir masalalar" asosida. */
export const KIM_38: BoardLesson = {
  n: 38,
  label: '22–24',
  group: BOB5,
  title: 'Bobni takrorlash: reaksiya tezligi',
  section: '5-bob, 22–24',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r5k1',
      prompt: '5 L idishda CH₄ 5 moldan 3 molgacha 120 s da kamaydi. Tezlik necha mol/(L·min)?',
      hint: 'Δn = 2 mol, t = 2 min.',
      explanation: '2 / (5 · 2) = 0,2 mol/(L·min).',
      widget: { type: 'number_answer', props: { answer: 0.2, tolerance: 0.001, unit: 'mol/(L·min)' } }
    },
    {
      id: 'r5k2',
      prompt: '20 °C da tezlik 3 mol/(L·min), γ = 3. 50 °C dagi tezlik qancha?',
      hint: '3³.',
      explanation: '3 · 27 = 81 mol/(L·min).',
      widget: { type: 'number_answer', props: { answer: 81, unit: 'mol/(L·min)' } }
    },
    {
      id: 'r5k3',
      prompt: '4NH₃ + 3O₂ → 2N₂ + 6H₂O sistemada bosim 2 marta oshirilsa, tezlik necha marta ortadi?',
      hint: '2⁴ · 2³.',
      explanation: '2⁷ = 128 marta.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['14', '64', '128', '256'], answerIndex: 2 } }
    },
    {
      id: 'r5k4',
      prompt: 'Qaysilari reaksiya tezligini oshiradi?',
      hint: 'Ingibitor — teskari.',
      explanation: 'Isitish, katalizator, maydalash va konsentratsiyani oshirish tezlatadi; ingibitor va sovitish sekinlatadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'haroratni oshirish', correct: true },
            { label: 'katalizator qoʻshish', correct: true },
            { label: 'qattiq moddani maydalash', correct: true },
            { label: 'ingibitor qoʻshish' },
            { label: 'sovitish' }
          ]
        }
      }
    },
    {
      id: 'r5k5',
      prompt: '2 L idishda 88 g CO₂ hosil boʻlishi 0,5 min davom etdi. Hosil boʻlish tezligi necha mol/(L·min)?',
      hint: '88 g = 2 mol.',
      explanation: '2 / (2 · 0,5) = 2 mol/(L·min).',
      widget: { type: 'number_answer', props: { answer: 2, tolerance: 0.01, unit: 'mol/(L·min)' } }
    }
  ]
};
