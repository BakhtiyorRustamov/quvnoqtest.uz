import type { BoardLesson } from './types';
import { BOB2 } from './kimyo-5';

/** Takrorlash (savollar): darslik, 2-bob (5–8-mavzular) — "Mavzuga doir masalalar" asosida. */
export const KIM_35: BoardLesson = {
  n: 35,
  label: '5–8',
  group: BOB2,
  title: 'Bobni takrorlash: modda miqdori',
  section: '2-bob, 5–8',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r2k1',
      prompt: '20 g argonda nechta atom bor? (·10²³ ta)',
      hint: 'n = 20 / 40.',
      explanation: 'n = 0,5 mol; 0,5 · 6,02·10²³ = 3,01·10²³.',
      widget: { type: 'number_answer', props: { answer: 3.01, tolerance: 0.01, unit: '·10²³ ta' } }
    },
    {
      id: 'r2k2',
      prompt: 'Geliyga nisbatan zichligi 4,5 boʻlgan gazning vodorodga nisbatan zichligi qancha?',
      hint: 'M = 4 · 4,5.',
      explanation: 'M = 18; D(H₂) = 18 / 2 = 9.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'r2k3',
      prompt: 'Tarkibida 4,214·10²³ ta kislorod atomi boʻlgan Na₂SO₄ ning massasi necha gramm? (0,01 gacha)',
      hint: 'n(O) = 0,7 mol; har bir Na₂SO₄ da 4 ta O.',
      explanation: 'n(Na₂SO₄) = 0,7 / 4 = 0,175 mol; m = 0,175 · 142 = 24,85 g.',
      widget: { type: 'number_answer', props: { answer: 24.85, tolerance: 0.02, unit: 'g' } }
    },
    {
      id: 'r2k4',
      prompt: 'Suyultirilgan sulfat kislotada 1,68 g metall erib, 4,56 g sulfat hosil boʻldi. Metallning ekvivalenti qancha?',
      hint: 'm(SO₄) = 4,56 − 1,68; E(SO₄²⁻) = 48.',
      explanation: 'm(SO₄) = 2,88 g; E = 1,68 · 48 / 2,88 = 28 (temir, II).',
      widget: { type: 'number_answer', props: { answer: 28 } }
    },
    {
      id: 'r2k5',
      prompt: '103,4 kPa va −23 °C da 10 g argon necha litr hajmni egallaydi? (butun songacha)',
      hint: 'n = 0,25 mol, T = 250 K.',
      explanation: 'V = 0,25 · 8,31 · 250 / 103,4 ≈ 5 L.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['2,5 L', '5 L', '5,6 L', '10 L'], answerIndex: 1 } }
    }
  ]
};
