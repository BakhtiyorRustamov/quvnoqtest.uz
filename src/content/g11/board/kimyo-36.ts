import type { BoardLesson } from './types';
import { BOB3 } from './kimyo-9';

/** Takrorlash (savollar): darslik, 3-bob (9–11-mavzular) — "Mavzuga doir masalalar" va testlar asosida. */
export const KIM_36: BoardLesson = {
  n: 36,
  label: '9–11',
  group: BOB3,
  title: 'Bobni takrorlash: elektrolitlar va gidroliz',
  section: '3-bob, 9–11',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r3k1',
      prompt: '1 L 0,5 M sirka kislota eritmasida (α = 0,2 %) nechta atsetat ion bor? (·10²⁰ ta)',
      hint: 'n = 0,5 mol; ajralgani 0,2 %.',
      explanation: '0,5 · 0,002 = 0,001 mol; 0,001 · 6,02·10²³ = 6,02·10²⁰.',
      widget: { type: 'number_answer', props: { answer: 6.02, tolerance: 0.01, unit: '·10²⁰ ta' } }
    },
    {
      id: 'r3k2',
      prompt: '300 mL 0,5 M chumoli kislota HCOOH eritmasida (α = 0,1 %) nechta formiat ion bor? (·10¹⁹ ta)',
      hint: 'n = 0,15 mol; ajralgani 0,1 %.',
      explanation: '0,15 · 0,001 = 1,5·10⁻⁴ mol; · 6,02·10²³ = 9,03·10¹⁹.',
      widget: { type: 'number_answer', props: { answer: 9.03, tolerance: 0.02, unit: '·10¹⁹ ta' } }
    },
    {
      id: 'r3k3',
      prompt: 'Qaysi tuzlar ham kation, ham anion boʻyicha gidrolizlanadi?',
      hint: 'Kuchsiz asos + kuchsiz kislota.',
      explanation: 'Ammoniy atsetat va ammoniy karbonat — NH₄OH va kuchsiz kislota tuzlari.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['natriy sulfat, kaliy xlorid', 'ammoniy atsetat, ammoniy karbonat', 'litiy nitrat, natriy sulfat', 'kaliy xlorid, ammoniy atsetat'], answerIndex: 1 } }
    },
    {
      id: 'r3k4',
      prompt: 'Suvda eritilganda neytral muhit hosil qiladigan moddalarni tanlang.',
      hint: 'Kuchli kislota va kuchli asos tuzlari.',
      explanation: 'NaNO₃, CaCl₂, Li₂SO₄ — neytral; NaHCO₃ — ishqoriy; ZnSO₄ — kislotali.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'natriy nitrat', correct: true },
            { label: 'kalsiy xlorid', correct: true },
            { label: 'litiy sulfat', correct: true },
            { label: 'natriy gidrokarbonat' },
            { label: 'rux sulfat' }
          ]
        }
      }
    },
    {
      id: 'r3k5',
      prompt: 'Qisqa ionli tenglamasi Ba²⁺ + SO₄²⁻ → BaSO₄↓ boʻlgan reaksiyani tanlang.',
      hint: 'Ikkala modda kuchli elektrolit boʻlsin.',
      explanation: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['BaCl₂ + Na₂SO₄', 'BaCO₃ + H₂SO₄', 'Ba + H₂SO₄', 'BaO + SO₃'], answerIndex: 0 } }
    }
  ]
};
