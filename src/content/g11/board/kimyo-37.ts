import type { BoardLesson } from './types';
import { BOB4 } from './kimyo-12';

/** Takrorlash (savollar): darslik, 4-bob (12–21-mavzular) — "Mavzuga doir masalalar" asosida. */
export const KIM_37: BoardLesson = {
  n: 37,
  label: '12–21',
  group: BOB4,
  title: 'Bobni takrorlash: eritmalar',
  section: '4-bob, 12–21',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r4k1',
      prompt: '100 °C dagi 408 g KBr toʻyingan eritmasi 25 °C gacha sovitildi. Necha gramm tuz kristallanadi? S(25 °C) = 66, S(100 °C) = 104.',
      hint: '204 g eritmadan 38 g.',
      explanation: '408 / 204 = 2; 2 · (104 − 66) = 76 g.',
      widget: { type: 'number_answer', props: { answer: 76, unit: 'g' } }
    },
    {
      id: 'r4k2',
      prompt: '280 g suvda necha gramm KBr eritilsa, 30 % li eritma hosil boʻladi?',
      hint: '70 g suvga 30 g tuz.',
      explanation: '280 · 30 / 70 = 120 g.',
      widget: { type: 'number_answer', props: { answer: 120, unit: 'g' } }
    },
    {
      id: 'r4k3',
      prompt: '425 g 20 % li AgNO₃ va 195 g 15 % li NaCl eritmalari aralashtirildi. AgCl choʻkmasi necha gramm? (0,01 gacha)',
      hint: 'AgNO₃ 0,5 mol, NaCl 0,5 mol.',
      explanation: 'AgNO₃ 85 g = 0,5 mol; NaCl 29,25 g = 0,5 mol; AgCl 0,5 · 143,5 = 71,75 g.',
      widget: { type: 'number_answer', props: { answer: 71.75, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'r4k4',
      prompt: '25 % li (ρ = 1,25 g/mL) NH₄NO₃ eritmasining normal konsentratsiyasi taxminan qancha? (M = 80)',
      hint: 'NH₄⁺ — bir valentli: E = 80.',
      explanation: '25 · 10 · 1,25 / 80 ≈ 3,9 N.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['≈ 1,95 N', '≈ 3,9 N', '≈ 7,8 N', '≈ 39 N'], answerIndex: 1 } }
    },
    {
      id: 'r4k5',
      prompt: 'Konsentratsiyani uning taʼrifi bilan juftlang.',
      hint: 'Foiz — 100 g eritmaga.',
      explanation: 'Foiz — 100 g eritmadagi modda grammlari; molyar — 1 L dagi mollar; normal — 1 L dagi ekvivalentlar; eruvchanlik — 100 g suvdagi eng koʻp modda.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'C%' }, b: { label: '100 g eritmadagi modda, g' } },
            { a: { label: 'Cm' }, b: { label: '1 L eritmadagi mollar' } },
            { a: { label: 'Cn' }, b: { label: '1 L eritmadagi ekvivalentlar' } },
            { a: { label: 'S' }, b: { label: '100 g suvda eng koʻp modda' } }
          ]
        }
      }
    }
  ]
};
