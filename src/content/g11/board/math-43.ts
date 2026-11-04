import type { BoardLesson } from './types';

/** Darslik (2-qism): 47–50-mavzu (7–9-betlar) — kuch bajargan ish va bosib oʻtilgan yoʻl. */
export const MATH_43: BoardLesson = {
  n: 43,
  label: '50',
  part: 'algebra',
  qism: 2,
  title: 'Integral yordamida ish va yoʻlni hisoblash',
  section: '47–50',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Sport zalida prujinali espanderni torting: boshida oson, keyin tobora qiyinlashadi. Kuch oʻzgarib turibdi, shuning uchun ishni oddiy kuch karra yoʻl qilib hisoblab boʻlmaydi. Xuddi shunday, tezligi oʻzgarib turgan mashinaning yoʻlini ham tezlik karra vaqt bilan topib boʻlmaydi. Ikkalasini integral hal qiladi.",
      easy: "Kuch yoki tezlik oʻzgarib tursa, ish va yoʻl integral bilan topiladi.",
      draw: [
        { t: 'title', text: 'Espander' },
        { t: 'icon', x: 12, y: 30, emoji: '💪', size: 'l' },
        { t: 'list', x: 32, y: 22, items: ['kuch oʻzgaradi: F = F(x)', 'tezlik oʻzgaradi: v = v(t)'] },
        { t: 'box', id: 'b', x: 32, y: 46, w: 56, h: 12, text: 'A = F·s  ✗   →   integral ✓', color: 'orange' }
      ],
      next: 'Ish formulasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻzgaruvchi F(x) kuchning a dan b gacha bajargan ishi A teng a dan b gacha F(x) ning integrali. Geometrik maʼnosi: F(x) grafigi ostidagi yuza. Kuch oʻzgarmas boʻlsa, bu oddiy F karra s formulaga aylanadi.",
      easy: "Ish — kuch grafigi ostidagi yuza: A = ∫ F(x) dx.",
      draw: [
        { t: 'title', text: 'Oʻzgaruvchi kuch ishi' },
        { t: 'formula', x: 12, y: 22, text: 'A = ∫ₐᵇ F(x) dx' },
        { t: 'axes', id: 'g', x: 12, y: 34, w: 40, h: 30, xmin: 0, xmax: 4, ymin: 0, ymax: 4 },
        { t: 'curve', axes: 'g', points: [[0, 0.5], [1, 1.2], [2, 2], [3, 2.9], [3.8, 3.6]], color: 'red' },
        { t: 'text', x: 58, y: 48, text: 'yuza = ish', color: 'purple' }
      ],
      next: 'Prujina'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Guk qonuni: prujinani x ga siqish uchun kerak boʻlgan kuch F teng k karra x, bu yerda k — prujina bikrligi. Prujinani l ga siqishdagi ish: 0 dan l gacha kx ning integrali, yaʼni k karra l kvadrat boʻlinsin 2. Grafikda bu — uchburchak yuzi.",
      easy: "Prujina: F = kx, ish A = kl²/2 — uchburchak yuzi.",
      draw: [
        { t: 'title', text: 'Guk qonuni' },
        { t: 'formula', x: 8, y: 20, text: 'F = k·x' },
        { t: 'formula', x: 8, y: 34, text: 'A = ∫₀ˡ kx dx = kl²/2' },
        { t: 'axes', id: 'g', x: 58, y: 16, w: 36, h: 40, xmin: 0, xmax: 4, ymin: 0, ymax: 4, xlabel: 'x', ylabel: 'F' },
        { t: 'curve', axes: 'g', points: [[0, 0], [3.6, 3.6]], color: 'red' },
        { t: 'curve', axes: 'g', points: [[3, 0], [3, 3]], color: 'green', dashed: true }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi misol: prujinani 0,01 metr siqish uchun 10 nyuton kuch kerak. k teng 10 boʻlinsin 0,01, yaʼni 1000. Prujinani 0,09 metr siqish ishi: 1000 karra 0,09 kvadrat boʻlinsin 2, yaʼni 500 karra 0,0081 teng 4,05 joul.",
      easy: "k = 1000 N/m. Ish: 1000 · 0,09² / 2 = 4,05 J.",
      draw: [
        { t: 'title', text: 'Prujina misoli' },
        { t: 'list', x: 6, y: 20, items: ['10 N = k · 0,01  →  k = 1000', 'A = 1000 · 0,09²/2'] },
        { t: 'box', id: 'r', x: 6, y: 44, w: 36, h: 12, text: 'A = 4,05 J', color: 'green' }
      ],
      next: 'Yoʻl-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yoʻl tezlikning boshlangʻich funksiyasi: s shtrix teng v. Shuning uchun t1 dan t2 gacha bosib oʻtilgan yoʻl — v(t) ning integrali, tezlik grafigi ostidagi yuza. 57-mashq: poyezd qiyalikdan v teng 15 plyus 0,2t metr sekundiga tezlik bilan 20 sekund tushdi. Yoʻl: 15 karra 20 plyus 0,1 karra 400, yaʼni 340 metr.",
      easy: "Yoʻl — tezlik grafigi ostidagi yuza. Poyezd 20 sekundda 340 metr yurdi.",
      draw: [
        { t: 'title', text: 'Tezlikdan yoʻlga' },
        { t: 'formula', x: 8, y: 20, text: 's = ∫ v(t) dt  (t₁ dan t₂ gacha)' },
        { t: 'formula', x: 8, y: 36, text: '∫₀²⁰ (15 + 0,2t) dt = 300 + 40' },
        { t: 'box', id: 'r', x: 8, y: 50, w: 34, h: 11, text: 's = 340 m', color: 'green' },
        { t: 'icon', x: 78, y: 40, emoji: '🚆', size: 'l' }
      ],
      next: 'Tormozlanish'
    },
    {
      kind: 'example',
      clear: true,
      say: "Avtomobil tormoz bosdi, tezligi v teng 20 minus 2t metr sekundiga. U t teng 10 sekundda toʻxtaydi, chunki tezlik nolga aylanadi. Tormozlanish yoʻli: 0 dan 10 gacha 20 minus 2t ning integrali, yaʼni 200 minus 100 teng 100 metr. Grafikda bu — uchburchak yuzi: yarim karra 10 karra 20.",
      easy: "Toʻxtash vaqti 10 s, yoʻl — uchburchak yuzi: 100 m.",
      draw: [
        { t: 'title', text: 'Tormozlanish yoʻli' },
        { t: 'axes', id: 'g', x: 6, y: 14, w: 44, h: 48, xmin: 0, xmax: 11, ymin: 0, ymax: 22, xlabel: 't', ylabel: 'v' },
        { t: 'curve', axes: 'g', points: [[0, 20], [10, 0]], color: 'red' },
        { t: 'list', x: 54, y: 20, items: ['v = 20 − 2t = 0 → t = 10', 's = ∫₀¹⁰ (20 − 2t) dt'] },
        { t: 'box', id: 'r', x: 54, y: 46, w: 34, h: 11, text: 's = 100 m', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Oʻzgaruvchi kuch ishi: A = ∫ₐᵇ F(x) dx (kuch grafigi ostidagi yuza).',
    'Prujina (Guk qonuni): F = kx, A = kl²/2.',
    'Bosib oʻtilgan yoʻl: s = ∫ v(t) dt (tezlik grafigi ostidagi yuza).'
  ],
  questions: [
    {
      id: 'p43q1',
      prompt: '2 N kuch prujinani 1 sm ga siqadi. Prujinani 3 sm ga siqish uchun qancha ish sarflanadi (J)?',
      hint: 'k = 2 : 0,01 = 200 N/m.',
      explanation: 'A = 200 · 0,03²/2 = 0,09 J.',
      widget: { type: 'number_answer', props: { answer: 0.09, tolerance: 0.001, unit: 'J' } }
    },
    {
      id: 'p43q2',
      prompt: 'Bikrligi k = 500 N/m prujinani 0,2 m ga siqish ishi necha J?',
      hint: 'A = kl²/2.',
      explanation: '500 · 0,04 / 2 = 10 J.',
      widget: { type: 'number_answer', props: { answer: 10, unit: 'J' } }
    },
    {
      id: 'p43q3',
      prompt: 'Nuqta tezligi v(t) = 3t² m/s. t = 0 dan t = 2 gacha bosib oʻtilgan yoʻl (m)?',
      hint: '∫₀² 3t² dt = t³.',
      explanation: '2³ = 8 m.',
      widget: { type: 'number_answer', props: { answer: 8, unit: 'm' } }
    },
    {
      id: 'p43q4',
      prompt: 'v(t) = 4 + 2t m/s. Birinchi 3 sekundda bosib oʻtilgan yoʻl (m)?',
      hint: '4t + t².',
      explanation: '12 + 9 = 21 m.',
      widget: { type: 'number_answer', props: { answer: 21, unit: 'm' } }
    },
    {
      id: 'p43q5',
      prompt: 'Avtomobil tezligi v(t) = 30 − 3t m/s. U toʻxtaguncha qancha yoʻl bosadi (m)?',
      hint: 'Toʻxtash: t = 10 s.',
      explanation: '∫₀¹⁰ (30 − 3t) dt = 300 − 150 = 150 m.',
      widget: { type: 'number_answer', props: { answer: 150, unit: 'm' } }
    },
    {
      id: 'p43q6',
      prompt: 'Har bir yuzaga uning fizik maʼnosini moslang.',
      hint: 'Qaysi grafik ostidagi yuza?',
      explanation: 'v(t) ostidagi yuza — yoʻl; F(x) ostidagi yuza — ish; F = kx — Guk qonuni; s′(t) — tezlik.',
      widget: {
        type: 'match_pairs',
        props: { pairs: [{ left: 'v(t) grafigi ostidagi yuza', right: 'bosib oʻtilgan yoʻl' }, { left: 'F(x) grafigi ostidagi yuza', right: 'bajarilgan ish' }, { left: 'F = kx', right: 'Guk qonuni' }, { left: 's′(t)', right: 'tezlik' }] }
      }
    },
    {
      id: 'p43q7',
      prompt: 'Jism s(t) = 20t − 5t² (m) qonun bilan harakatlanmoqda. Tezligi 5 m/s boʻlganda u qanday balandlikda (m)?',
      hint: 'v = 20 − 10t = 5 → t = 1,5.',
      explanation: 's(1,5) = 30 − 11,25 = 18,75 m.',
      widget: { type: 'number_answer', props: { answer: 18.75, tolerance: 0.01, unit: 'm' } }
    },
    {
      id: 'p43q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oʻzgaruvchi kuch.',
      explanation: 'Oʻzgaruvchi kuch ishi integral bilan topiladi; prujina ishi kl²/2; yoʻl — tezlikning integrali; oʻzgarmas kuchda A = F·s.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Prujinani siqish ishi kl²/2 ga teng.', value: true },
            { text: 'Oʻzgaruvchi kuch ishini A = F·s bilan aniq hisoblash mumkin.', value: false },
            { text: 'Yoʻl — tezlikdan olingan integral.', value: true },
            { text: 'Prujinani 2 marta koʻp siqsak, ish ham 2 marta oshadi.', value: false }
          ]
        }
      }
    }
  ]
};
