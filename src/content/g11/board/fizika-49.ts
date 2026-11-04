import type { BoardLesson } from './types';
import { BOB4 } from './fizika-23';

/** Takrorlash (savollar): darslik, IV bob (21–31-mavzular) — "4-mashq" asosida. */
export const FIZ_49: BoardLesson = {
  n: 49,
  label: '21–31',
  group: BOB4,
  title: 'Bobni takrorlash: elektromagnit toʻlqinlar va optika',
  section: 'IV bob, 21–31',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r4f1',
      prompt: 'Toʻlqin uzunligi 300 m radiotoʻlqin 10 kHz tovushning bir davrida necha marta tebranadi?',
      hint: 'ν = c/λ, keyin ν / ν tovush.',
      explanation: 'ν = 10⁶ Hz; 10⁶ / 10⁴ = 100 marta.',
      widget: { type: 'number_answer', props: { answer: 100 } }
    },
    {
      id: 'r4f2',
      prompt: 'Chastotasi 15 MHz toʻlqin 30 davr davomida necha metr tarqaladi?',
      hint: 'λ = c/ν, s = 30λ.',
      explanation: 'λ = 20 m; 30 · 20 = 600 m.',
      widget: { type: 'number_answer', props: { answer: 600, unit: 'm' } }
    },
    {
      id: 'r4f3',
      prompt: 'Kontur: L = 1 mH, ketma-ket ulangan 500 pF va 200 pF kondensatorlar. Qaysi toʻlqin uzunligiga moslangan? (butun songacha, m)',
      hint: 'C = C₁C₂/(C₁+C₂), λ = 2πc√(LC).',
      explanation: 'C ≈ 143 pF; λ = 2π · 3·10⁸ · √(10⁻³ · 1,43·10⁻¹⁰) ≈ 712 m.',
      widget: { type: 'number_answer', props: { answer: 712, tolerance: 5, unit: 'm' } }
    },
    {
      id: 'r4f4',
      prompt: '200 cd lampa nuri stolga 45° ostida tushib, 141 lx yoritilganlik beradi. Lampa stoldan necha metr balandda? (0,1 gacha)',
      hint: 'E = I·cos α / r², h = r·cos α.',
      explanation: 'r² = 200 · 0,707 / 141 ≈ 1 → r = 1 m; h = 0,7 m.',
      widget: { type: 'number_answer', props: { answer: 0.7, tolerance: 0.02, unit: 'm' } }
    },
    {
      id: 'r4f5',
      prompt: 'Nurlanishlarni toʻlqin uzunligi kamayishi tartibida joylang.',
      hint: 'Radiotoʻlqin eng uzun.',
      explanation: 'Radio → infraqizil → koʻrinadigan → ultrabinafsha → rentgen.',
      widget: { type: 'order_line', props: { items: [{ label: 'radiotoʻlqin' }, { label: 'infraqizil' }, { label: 'koʻrinadigan' }, { label: 'ultrabinafsha' }, { label: 'rentgen' }] } }
    }
  ]
};
