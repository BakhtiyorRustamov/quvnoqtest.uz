import type { BoardLesson } from './types';
import { BOB6 } from './kimyo-25';

/** Takrorlash (savollar): darslik, 6-bob (25–27-mavzular) — "Mavzuga doir masalalar" asosida. */
export const KIM_39: BoardLesson = {
  n: 39,
  label: '25–27',
  group: BOB6,
  title: 'Bobni takrorlash: kimyoviy muvozanat',
  section: '6-bob, 25–27',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r6k1',
      prompt: 'A + 2B ⇄ C + D, muvozanatda [A] = 0,4, [B] = 0,5, [C] = 0,25, [D] = 0,8 mol/L. K = ?',
      hint: '0,2 / 0,1.',
      explanation: '0,25 · 0,8 / (0,4 · 0,25) = 2.',
      widget: { type: 'number_answer', props: { answer: 2, tolerance: 0.001 } }
    },
    {
      id: 'r6k2',
      prompt: 'N₂ + 3H₂ ⇄ 2NH₃ + Q. Ammiak unumini oshirish uchun qaysilari kerak?',
      hint: 'Ekzotermik, 4 → 2 mol.',
      explanation: 'Bosimni oshirish, haroratni pasaytirish, NH₃ ni chiqarib turish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'bosimni oshirish', correct: true },
            { label: 'haroratni pasaytirish', correct: true },
            { label: 'NH₃ ni chiqarib turish', correct: true },
            { label: 'bosimni kamaytirish' },
            { label: 'katalizator qoʻshish' }
          ]
        }
      }
    },
    {
      id: 'r6k3',
      prompt: '4HCl + O₂ ⇄ 2Cl₂ + 2H₂O, 8 L idish. Muvozanatda [HCl] = 0,7, [O₂] = 0,6, [H₂O] = 0,4 mol/L. Boshlangʻich HCl necha mol?',
      hint: 'Boshlangʻich [HCl] = 1,5 mol/L.',
      explanation: '1,5 · 8 = 12 mol.',
      widget: { type: 'number_answer', props: { answer: 12, tolerance: 0.01, unit: 'mol' } }
    },
    {
      id: 'r6k4',
      prompt: 'Qaytmas reaksiya belgisi qaysi?',
      hint: 'Mahsulot sistemadan chiqib ketadi.',
      explanation: 'Choʻkma tushishi (yoki gaz chiqishi, suv hosil boʻlishi, koʻp issiqlik).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['katalizator ishlatilishi', 'choʻkma tushishi', 'gazlar orasida borishi', 'issiqlik yutilishi'], answerIndex: 1 } }
    },
    {
      id: 'r6k5',
      prompt: 'Taʼsirni muvozanat siljishi bilan juftlang (2SO₂ + O₂ ⇄ 2SO₃ + Q).',
      hint: 'Ekzotermik, 3 → 2 mol.',
      explanation: 'Bosim ↑ — oʻngga; harorat ↑ — chapga; katalizator — siljimaydi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'bosim ↑', right: 'oʻngga' },
            { left: 'harorat ↑', right: 'chapga' },
            { left: 'katalizator', right: 'siljimaydi' }
          ]
        }
      }
    }
  ]
};
