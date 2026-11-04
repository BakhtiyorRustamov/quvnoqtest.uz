import type { BoardLesson } from './types';
import { BOB7 } from './kimyo-28';

/** Takrorlash (savollar): darslik, 7-bob (28–30-mavzular) — "Mavzuga doir masalalar" asosida. */
export const KIM_40: BoardLesson = {
  n: 40,
  label: '28–30',
  group: BOB7,
  title: 'Bobni takrorlash: oksidlanish-qaytarilish',
  section: '7-bob, 28–30',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r7k1',
      prompt: 'Kislotali muhitda MnO₄⁻ → Mn²⁺ yarim reaksiyasiga nechta H⁺ qoʻshiladi?',
      hint: '4 ta kislorod → 4H₂O.',
      explanation: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O: 8 ta.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'r7k2',
      prompt: 'KMnO₄ ishqoriy muhitda reaksiyaga kirishsa, eritma qaysi rangga kiradi?',
      hint: 'MnO₄²⁻.',
      explanation: 'Manganat ioni — yashil.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['rangsiz', 'qoʻngʻir', 'yashil', 'sariq'], answerIndex: 2 } }
    },
    {
      id: 'r7k3',
      prompt: '2KMnO₄ + 5Na₂O₂ + 8H₂SO₄ reaksiyasida 11,2 L (n.sh.) O₂ ajraldi. KMnO₄ massasi necha gramm?',
      hint: 'O₂ 0,5 mol → KMnO₄ 0,2 mol.',
      explanation: '0,2 · 158 = 31,6 g.',
      widget: { type: 'number_answer', props: { answer: 31.6, tolerance: 0.05, unit: 'g' } }
    },
    {
      id: 'r7k4',
      prompt: 'Kislotali muhitda 63,2 g KMnO₄ necha gramm FeSO₄ ni oksidlaydi?',
      hint: '63,2 / 31,6 = 2 ekv.',
      explanation: '2 · 152 = 304 g.',
      widget: { type: 'number_answer', props: { answer: 304, unit: 'g' } }
    },
    {
      id: 'r7k5',
      prompt: 'Ishqoriy muhitga oid qoidalarni belgilang.',
      hint: 'H⁺ — kislotada.',
      explanation: 'Ishqoriy muhitda O kam tomonga 2 marta koʻp OH⁻, qarshi tomonga H₂O qoʻshiladi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'O kam tomonga 2 marta koʻp OH⁻', correct: true },
            { label: 'qarshi tomonga H₂O', correct: true },
            { label: 'H kam tomonga H⁺' },
            { label: 'O kam tomonga H₂O, H kam tomonga H⁺' }
          ]
        }
      }
    }
  ]
};
