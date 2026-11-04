import type { BoardLesson } from './types';
import { BOB1 } from './kimyo-1';

/** Takrorlash (savollar): darslik, 1-bob (1–4-mavzular) — "Mavzuga doir masalalar" asosida. */
export const KIM_34: BoardLesson = {
  n: 34,
  label: '1–4',
  group: BOB1,
  title: 'Bobni takrorlash: atom tuzilishi va davriy qonun',
  section: '1-bob, 1–4',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r1k1',
      prompt: 'Tartib raqami 36 boʻlgan elementda (kripton) nechta toʻlgan pogʻona va pogʻonacha bor?',
      hint: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶.',
      explanation: 'Toʻla pogʻonalar: 1, 2, 3 (3 ta); toʻla pogʻonachalar: 1s, 2s, 2p, 3s, 3p, 3d, 4s, 4p (8 ta).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['3 va 8', '3 va 7', '2 va 6', '3 va 6'], answerIndex: 0 } }
    },
    {
      id: 'r1k2',
      prompt: 'Molibden (Z = 42; …4d⁵ 5s¹) atomida nechta s-elektron bor?',
      hint: '1s, 2s, 3s, 4s, 5s.',
      explanation: '2 + 2 + 2 + 2 + 1 = 9 ta.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'r1k3',
      prompt: 'Izotop yadrosida 81 ta neytron bor, protonlar nuklonlarning 40,87 % ini tashkil etadi. Massa sonini toping.',
      hint: 'Z = 81 · 40,87 / 59,13.',
      explanation: 'Z = 56; A = 56 + 81 = 137.',
      widget: { type: 'number_answer', props: { answer: 137 } }
    },
    {
      id: 'r1k4',
      prompt: 'Kalsiy fosfat Ca₃(PO₄)₂ da nechtadan σ- va π-bogʻ bor?',
      hint: 'Har bir PO₄ da bitta P=O va uchta P−O−Ca.',
      explanation: 'Har bir PO₄: 4 ta P−O σ + 3 ta O−Ca = 7 σ, 1 π; ikkitasi: 14 σ va 2 π.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['7 va 1', '21 va 3', '14 va 2', '28 va 4'], answerIndex: 2 } }
    },
    {
      id: 'r1k5',
      prompt: 'Bogʻ qutbliligi ortib borish tartibida joylang.',
      hint: 'Si, P, S, Cl elektrmanfiyligi ortadi.',
      explanation: 'SiH₄ < PH₃ < H₂S < HCl.',
      widget: { type: 'order_line', props: { items: [{ label: 'SiH₄' }, { label: 'PH₃' }, { label: 'H₂S' }, { label: 'HCl' }] } }
    }
  ]
};
