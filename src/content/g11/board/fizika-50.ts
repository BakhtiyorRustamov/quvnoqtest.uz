import type { BoardLesson } from './types';
import { BOB5 } from './fizika-34';

/** Takrorlash (savollar): darslik, V bob (32–33-mavzular) — "5-mashq" asosida. */
export const FIZ_50: BoardLesson = {
  n: 50,
  label: '32–33',
  group: BOB5,
  title: 'Bobni takrorlash: nisbiylik nazariyasi',
  section: 'V bob, 32–33',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r5f1',
      prompt: 'Proton 240 000 km/s tezlikda harakatlanmoqda. Massasi tinchlikdagidan necha marta katta? (0,01 gacha)',
      hint: 'γ = 1/√(1 − v²/c²), v/c = 0,8.',
      explanation: '1 / 0,6 ≈ 1,67 marta.',
      widget: { type: 'number_answer', props: { answer: 1.67, tolerance: 0.01 } }
    },
    {
      id: 'r5f2',
      prompt: 'Harakatlanayotgan soat xususiy 5 s ichida 0,1 s ga kech qoldi. Tezligi c ning qancha qismi? (0,01 gacha)',
      hint: 'τ = τ₀ + 0,1 = τ₀ · γ.',
      explanation: 'γ = 5,1/5 = 1,02; β = √(1 − 1/1,02²) ≈ 0,2.',
      widget: { type: 'number_answer', props: { answer: 0.2, tolerance: 0.01, unit: 'c' } }
    },
    {
      id: 'r5f3',
      prompt: '20 kg azot 200 K ga isitildi (c = 1,05 kJ/(kg·K)). Massasi necha ·10⁻¹¹ kg ortdi? (0,1 gacha)',
      hint: 'Δm = c·m·ΔT / c².',
      explanation: '1050 · 20 · 200 / 9·10¹⁶ ≈ 4,7·10⁻¹¹ kg.',
      widget: { type: 'number_answer', props: { answer: 4.67, tolerance: 0.05, unit: '·10⁻¹¹ kg' } }
    },
    {
      id: 'r5f4',
      prompt: 'Maxsus nisbiylik nazariyasining ikkinchi postulati nima deydi?',
      hint: 'Yorugʻlik tezligi haqida.',
      explanation: 'Vakuumda yorugʻlik tezligi barcha inersial sanoq sistemalarida bir xil.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Yorugʻlik tezligi manbaga bogʻliq', 'Vakuumda yorugʻlik tezligi barcha inersial sistemalarda bir xil', 'Vaqt hamma joyda bir xil oʻtadi', 'Massa tezlikka bogʻliq emas'], answerIndex: 1 } }
    }
  ]
};
