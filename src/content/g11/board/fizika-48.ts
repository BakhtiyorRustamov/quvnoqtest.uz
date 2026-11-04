import type { BoardLesson } from './types';
import { BOB3 } from './fizika-13';

/** Takrorlash (savollar): darslik, III bob (11–20-mavzular) — "3-mashq" asosida. */
export const FIZ_48: BoardLesson = {
  n: 48,
  label: '11–20',
  group: BOB3,
  title: 'Bobni takrorlash: elektromagnit tebranishlar',
  section: 'III bob, 11–20',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r3f1',
      prompt: 'Konturda C = 8 pF, L = 0,5 mH, tokning maksimal qiymati 40 mA. Kondensatordagi maksimal kuchlanish necha V? (butun songacha)',
      hint: 'LI²/2 = CU²/2 → U = I·√(L/C).',
      explanation: '0,04 · √(0,5·10⁻³ / 8·10⁻¹²) ≈ 316 V.',
      widget: { type: 'number_answer', props: { answer: 316, tolerance: 3, unit: 'V' } }
    },
    {
      id: 'r3f2',
      prompt: 'Kontur gʻaltagining induktivligi 0,04 H, erkin tebranishlar chastotasi 800 Hz. Kondensator sigʻimi necha μF?',
      hint: 'C = 1 / (4π²ν²L).',
      explanation: '1 / (4 · 9,87 · 640 000 · 0,04) ≈ 1 μF.',
      widget: { type: 'number_answer', props: { answer: 1, tolerance: 0.03, unit: 'μF' } }
    },
    {
      id: 'r3f3',
      prompt: 'Gʻaltakdagi kuchlanish amplitudasi 157 V, tok amplitudasi 5 A, chastota 50 Hz. Induktivlik necha H?',
      hint: 'XL = U/I = ωL.',
      explanation: 'XL = 31,4 Ω; L = 31,4 / 314 = 0,1 H.',
      widget: { type: 'number_answer', props: { answer: 0.1, tolerance: 0.002, unit: 'H' } }
    },
    {
      id: 'r3f4',
      prompt: '400 Hz zanjirga 0,1 H gʻaltak ulangan. Rezonans boʻlishi uchun necha μF kondensator kerak? (0,1 gacha)',
      hint: 'XL = XC → C = 1/(ω²L).',
      explanation: 'ω = 2513 rad/s; C = 1 / (2513² · 0,1) ≈ 1,6 μF.',
      widget: { type: 'number_answer', props: { answer: 1.6, tolerance: 0.05, unit: 'μF' } }
    },
    {
      id: 'r3f5',
      prompt: 'Ketma-ket RLC zanjirda rezonans sharti qaysi?',
      hint: 'Reaktiv qarshiliklar bir-birini yoʻqotadi.',
      explanation: 'XL = XC — shunda Z = R va tok eng katta.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['R = XL', 'XL = XC', 'XC = 0', 'Z = XL + XC'], answerIndex: 1 } }
    }
  ]
};
