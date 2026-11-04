import type { BoardLesson } from './types';
import { BOB7 } from './fizika-39';

/** Takrorlash (savollar): darslik, VII bob (37–45-mavzular) — "7-mashq" va bob testi asosida. */
export const FIZ_52: BoardLesson = {
  n: 52,
  label: '37–45',
  group: BOB7,
  title: 'Bobni takrorlash: atom va yadro fizikasi',
  section: 'VII bob, 37–45',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r7f1',
      prompt: 'Azot-14 yadrosini protonlar va neytronlarga ajratish uchun kamida necha MeV kerak? m(H) = 1,00783 u, mₙ = 1,00866 u, m(¹⁴N) = 14,00307 u, 1 u = 931,5 MeV. (butun songacha)',
      hint: 'Δm = 7·1,00783 + 7·1,00866 − 14,00307.',
      explanation: 'Δm = 0,11236 u; E = 0,11236 · 931,5 ≈ 105 MeV.',
      widget: { type: 'number_answer', props: { answer: 104.7, tolerance: 1, unit: 'MeV' } }
    },
    {
      id: 'r7f2',
      prompt: 'Reaksiyani toʻldiring: X + ¹H → ³He + γ. X nima?',
      hint: 'A: X + 1 = 3, Z: X + 1 = 2.',
      explanation: 'A = 2, Z = 1 — deyteriy ²H.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['¹H', '²H (deyteriy)', '³H (tritiy)', '⁴He'], answerIndex: 1 } }
    },
    {
      id: 'r7f3',
      prompt: 'Erkin neytronning proton, pozitron va antineytrinoga boʻlinishiga qaysi saqlanish qonuni yoʻl qoʻymaydi?',
      hint: 'Zaryadlarni sanang: 0 → +1 +1 + 0.',
      explanation: 'Zaryadning saqlanish qonuni (proton ham, pozitron ham musbat).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['massaning', 'zaryadning', 'energiyaning', 'impulsning'], answerIndex: 1 } }
    },
    {
      id: 'r7f4',
      prompt: 'Azot-13 (Z = 7) pozitron chiqardi. Hosil boʻlgan yadroning zaryad soni nechaga teng?',
      hint: 'Pozitron +1 zaryadni olib ketadi, A oʻzgarmaydi.',
      explanation: '7 − 1 = 6 — uglerod-13.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'r7f5',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Lazer — majburiy nurlanish.',
      explanation: 'Lazer — kogerent nur manbayi; yarim yemirilish davri — yadrolarning yarmi parchalanadigan vaqt; kritik massa — zanjir reaksiyasi uchun eng kichik massa; annigilatsiya — zarra va antizarraning fotonlarga aylanishi.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'lazer' }, b: { label: 'kogerent nur manbayi' } },
            { a: { label: 'yarim yemirilish davri' }, b: { label: 'yadrolarning yarmi parchalanadigan vaqt' } },
            { a: { label: 'kritik massa' }, b: { label: 'zanjir reaksiyasi uchun eng kichik massa' } },
            { a: { label: 'annigilatsiya' }, b: { label: 'zarra + antizarra → fotonlar' } }
          ]
        }
      }
    }
  ]
};
