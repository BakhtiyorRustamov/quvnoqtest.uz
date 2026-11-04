import type { BoardLesson } from './types';
import { BOB8 } from './kimyo-31';

/** Takrorlash (savollar): darslik, 8-bob (31–33-mavzular) — "Mavzuga doir masalalar" asosida. */
export const KIM_41: BoardLesson = {
  n: 41,
  label: '31–33',
  group: BOB8,
  title: 'Bobni takrorlash: elektroliz',
  section: '8-bob, 31–33',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r8k1',
      prompt: 'CuCl₂ eritmasi elektrolizida anodda nima ajraladi?',
      hint: 'Kislorodsiz qoldiq.',
      explanation: 'Xlor.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['O₂', 'Cl₂', 'H₂', 'Cu'], answerIndex: 1 } }
    },
    {
      id: 'r8k2',
      prompt: 'AgNO₃ eritmasidan 9,65 A tok 1000 s oʻtkazildi. Katodda necha gramm kumush ajraladi?',
      hint: 'n(ekv) = 0,1.',
      explanation: '0,1 · 108 = 10,8 g.',
      widget: { type: 'number_answer', props: { answer: 10.8, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'r8k3',
      prompt: '580 g 10 % li K₂SO₄ eritmasidan necha amper tok 193000 s oʻtkazilsa, tuz ulushi 14,5 % boʻladi?',
      hint: 'Eritma 400 g, 180 g suv = 20 ekv.',
      explanation: '20 · 96500 / 193000 = 10 A.',
      widget: { type: 'number_answer', props: { answer: 10, unit: 'A' } }
    },
    {
      id: 'r8k4',
      prompt: 'Eritmasi elektrolizida faqat suv parchalanadigan tuzlarni belgilang.',
      hint: 'Aktiv metall + kislorodli qoldiq.',
      explanation: 'K₂SO₄, NaNO₃, Na₂CO₃ — faqat suv; CuSO₄, NaCl — yoʻq.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'K₂SO₄', correct: true },
            { label: 'NaNO₃', correct: true },
            { label: 'Na₂CO₃', correct: true },
            { label: 'CuSO₄' },
            { label: 'NaCl' }
          ]
        }
      }
    },
    {
      id: 'r8k5',
      prompt: '70,4 g CdSO₄·nH₂O eritildi; kadmiyni toʻliq ajratish uchun 8 A tok 4825 s oʻtdi. n = ? (M(CdSO₄) = 208)',
      hint: '0,4 ekv → CdSO₄ 0,2 mol = 41,6 g.',
      explanation: 'Suv 28,8 g = 1,6 mol → n = 8.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    }
  ]
};
