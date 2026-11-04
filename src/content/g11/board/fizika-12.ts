import type { BoardLesson } from './types';
import { BOB2 } from './fizika-8';

/** Takrorlash (savollar): darslik, II bob (7–10-mavzular) — "2-mashq", bob testi va xulosa jadvali asosida. */
export const FIZ_12: BoardLesson = {
  n: 12,
  label: '7–10',
  group: BOB2,
  title: 'Bobni takrorlash: elektromagnit induksiya',
  section: 'II bob, 7–10',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r2f1',
      prompt: '150 oʻramli gʻaltakda oqim 0,5 s da 15 mWb ga oʻzgardi. EYuK necha V?',
      hint: 'E = N · ΔФ / Δt.',
      explanation: '150 · 0,015 / 0,5 = 4,5 V.',
      widget: { type: 'number_answer', props: { answer: 4.5, tolerance: 0.01, unit: 'V' } }
    },
    {
      id: 'r2f2',
      prompt: 'Oqimning oʻzgarish tezligi 120 mWb/s boʻlganda gʻaltakda 30 V EYuK hosil boʻldi. Oʻramlar soni nechta?',
      hint: 'N = E / (ΔФ/Δt).',
      explanation: '30 / 0,12 = 250.',
      widget: { type: 'number_answer', props: { answer: 250 } }
    },
    {
      id: 'r2f3',
      prompt: '100 oʻramli gʻaltakda oqim 0,01 s da 2 mWb ga oʻzgardi. EYuK necha V?',
      hint: 'E = N · ΔФ / Δt.',
      explanation: '100 · 0,002 / 0,01 = 20 V.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'V' } }
    },
    {
      id: 'r2f4',
      prompt: 'Qarshiligi 2 Ω halqadagi oqim 0,1 s da 0,06 Wb ga oʻzgardi. Induksion tok necha A?',
      hint: 'E = ΔФ/Δt, I = E/R.',
      explanation: 'E = 0,6 V; I = 0,6 / 2 = 0,3 A.',
      widget: { type: 'number_answer', props: { answer: 0.3, tolerance: 0.01, unit: 'A' } }
    },
    {
      id: 'r2f5',
      prompt: 'Induktivligi 0,3 H gʻaltakda tok 0,2 s da 4 A ga oʻzgardi. Oʻzinduksiya EYuK necha V?',
      hint: 'E = L · ΔI / Δt.',
      explanation: '0,3 · 4 / 0,2 = 6 V.',
      widget: { type: 'number_answer', props: { answer: 6, unit: 'V' } }
    },
    {
      id: 'r2f6',
      prompt: 'Induktivligi 0,8 H, kesim yuzi 200 cm², 50 oʻramli gʻaltakdan 2 A tok oʻtmoqda. Ichidagi induksiya necha T?',
      hint: 'Bir oʻramdagi oqim L·I/N, B = Ф / S.',
      explanation: 'L·I = 1,6 Wb; bir oʻramda 1,6/50 = 0,032 Wb; B = 0,032 / 0,02 = 1,6 T.',
      widget: { type: 'number_answer', props: { answer: 1.6, tolerance: 0.01, unit: 'T' } }
    },
    {
      id: 'r2f7',
      prompt: 'Oʻzaksiz gʻaltakda induksiya 40 mT, oʻzak kiritilgach 2 T boʻldi. Oʻzakning μ si nechaga teng?',
      hint: 'μ = B / B₀.',
      explanation: '2 / 0,04 = 50.',
      widget: { type: 'number_answer', props: { answer: 50 } }
    },
    {
      id: 'r2f8',
      prompt: 'Induktivligi 0,5 H gʻaltakdan 2 A tok oʻtmoqda. Maydon energiyasi necha J?',
      hint: 'W = L I² / 2.',
      explanation: '0,5 · 4 / 2 = 1 J.',
      widget: { type: 'number_answer', props: { answer: 1, unit: 'J' } }
    },
    {
      id: 'r2f9',
      prompt: 'Induksiya EYuK birligini koʻrsating.',
      hint: 'E = ΔФ / Δt.',
      explanation: 'Wb/s = V.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['T/s', 'Wb/s', 'H', 'A/s'], answerIndex: 1 } }
    },
    {
      id: 'r2f10',
      prompt: 'Induksion tok yoʻnalishini aniqlash qoidasi kimning nomi bilan ataladi?',
      hint: 'Alyuminiy halqalar tajribasi.',
      explanation: 'Lens qoidasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Amper', 'Ersted', 'Maksvell', 'Lens'], answerIndex: 3 } }
    },
    {
      id: 'r2f11',
      prompt: 'Kattalikni birligi bilan moslang.',
      hint: 'Induktivlik — henri.',
      explanation: 'L — H, Ф — Wb, E — V, B — T.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'induktivlik L', right: 'H' },
            { left: 'magnit oqimi Ф', right: 'Wb' },
            { left: 'EYuK E', right: 'V' },
            { left: 'induksiya B', right: 'T' }
          ]
        }
      }
    },
    {
      id: 'r2f12',
      prompt: 'Juftlarni toping.',
      hint: 'Har bir hodisaning formulasi.',
      explanation: 'Faradey — −NΔФ/Δt; oʻzinduksiya — −LΔI/Δt; oqim — LI; energiya — LI²/2.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'Faradey qonuni' }, b: { label: 'E = −N ΔФ/Δt' } },
            { a: { label: 'Oʻzinduksiya EYuK' }, b: { label: 'E = −L ΔI/Δt' } },
            { a: { label: 'Gʻaltak oqimi' }, b: { label: 'Ф = L I' } },
            { a: { label: 'Maydon energiyasi' }, b: { label: 'W = L I²/2' } }
          ]
        }
      }
    },
    {
      id: 'r2f13',
      prompt: 'Moddalarni magnit singdiruvchanligi boʻyicha tartiblang: eng kichigidan eng kattasiga.',
      hint: 'Dia < para < ferro.',
      explanation: 'Mis (μ < 1) → alyuminiy (μ biroz > 1) → temir (μ ≫ 1).',
      widget: { type: 'order_line', props: { items: [{ label: 'mis' }, { label: 'alyuminiy' }, { label: 'temir' }] } }
    },
    {
      id: 'r2f14',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Bob xulosasini eslang.',
      explanation: 'Oqim oʻzgarsagina tok bor; Lens: oʻzgarishga qarshilik; ferromagnit oʻzak maydonni kuchaytiradi; 1 H = 1 V·s/A.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Magnit gʻaltak ichida tinch tursa ham induksion tok oqadi.', value: false },
            { text: 'Induksion tok oqim oʻzgarishiga qarshilik qiladi.', value: true },
            { text: 'Ferromagnit oʻzak gʻaltak maydonini kuchaytiradi.', value: true },
            { text: '1 H = 1 V · s / A.', value: true }
          ]
        }
      }
    }
  ]
};
