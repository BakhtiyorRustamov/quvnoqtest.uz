import type { BoardLesson } from './types';
import { BOB6 } from './fizika-36';

/** Takrorlash (savollar): darslik, VI bob (34–36-mavzular) — "6-mashq" va bob testi asosida. */
export const FIZ_51: BoardLesson = {
  n: 51,
  label: '34–36',
  group: BOB6,
  title: 'Bobni takrorlash: kvant fizikasi',
  section: 'VI bob, 34–36',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r6f1',
      prompt: 'Mis sharchaga 0,165 μm nur tushmoqda, chiqish ishi 4,5 eV (h = 4,1·10⁻¹⁵ eV·s). Sharcha necha voltgacha zaryadlanadi? (0,01 gacha)',
      hint: 'eφ = hc/λ − A.',
      explanation: 'hc/λ ≈ 7,45 eV; 7,45 − 4,5 = 2,95 V.',
      widget: { type: 'number_answer', props: { answer: 2.95, tolerance: 0.02, unit: 'V' } }
    },
    {
      id: 'r6f2',
      prompt: 'Foton energiyasi 4,4·10⁻¹⁹ J, muhitdagi toʻlqin uzunligi 3·10⁻⁷ m. Muhitning sindirish koʻrsatkichi? (h = 6,6·10⁻³⁴)',
      hint: 'λ₀ = hc/E, n = λ₀/λ.',
      explanation: 'λ₀ = 4,5·10⁻⁷ m; n = 4,5/3 = 1,5.',
      widget: { type: 'number_answer', props: { answer: 1.5, tolerance: 0.01 } }
    },
    {
      id: 'r6f3',
      prompt: 'Foton massasi elektronning tinchlikdagi massasiga teng boʻlishi uchun energiyasi qancha boʻlishi kerak?',
      hint: 'E = mₑc².',
      explanation: '≈ 0,51 MeV.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['13,6 eV', '0,51 MeV', '931,5 MeV', '1,6 J'], answerIndex: 1 } }
    },
    {
      id: 'r6f4',
      prompt: 'Olimni kashfiyoti bilan juftlang.',
      hint: 'Lebedev — bosim.',
      explanation: 'Plank — kvant gipotezasi; Eynshteyn — fotoeffekt tenglamasi; Stoletov — fotoeffekt qonunlari; Lebedev — yorugʻlik bosimi.',
      widget: { type: 'memory_match', props: { pairs: [{ a: { label: 'Plank' }, b: { label: 'kvant gipotezasi' } }, { a: { label: 'Eynshteyn' }, b: { label: 'fotoeffekt tenglamasi' } }, { a: { label: 'Stoletov' }, b: { label: 'fotoeffekt qonunlari' } }, { a: { label: 'Lebedev' }, b: { label: 'yorugʻlik bosimi' } }] } }
    }
  ]
};
