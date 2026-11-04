import type { BoardLesson } from './types';
import type { DrawOp } from '@/lib/lab/plan';

/** Shar konturi va gorizontal kesim (y = cy − (R − h)) — segment ajratadi. */
function ballCut(cx: number, cy: number, r: number, h: number): DrawOp[] {
  const y = cy - (r - h);
  const half = Math.sqrt(r * r - (r - h) * (r - h));
  return [
    { t: 'ellipse', cx, cy, rx: r, ry: r, color: 'ink' },
    { t: 'ellipse', cx, cy: +y.toFixed(2), rx: +half.toFixed(2), ry: +(half * 0.3).toFixed(2), dashedBack: true, color: 'blue' },
    { t: 'point', id: 'O', x: cx, y: cy, label: 'O' },
    { t: 'point', id: 'T', x: cx, y: cy - r, hide: true },
    { t: 'point', id: 'K', x: cx, y: +y.toFixed(2), hide: true },
    { t: 'line', from: 'T', to: 'K', color: 'red', label: 'h' }
  ];
}

/** Darslik (2-qism): Geometriya, 14.2 (156–164-betlar) — shar halqasi, segmenti, sektori va kamari hajmi. */
export const MATH_75: BoardLesson = {
  n: 75,
  label: '14.2',
  part: 'geometriya',
  qism: 2,
  title: 'Shar boʻlaklari va ularning hajmi',
  section: 'Geometriya, 14.2',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Tarvuzni pichoq bilan kessangiz, bir boʻlagi kichik, biri katta boʻladi — bular shar segmentlari. Uchburchak boʻlak kessangiz — shar sektori. Tarvuz poʻchogʻi esa ichma-ich ikki shar orasidagi qatlam — shar halqasi. Bugun shu boʻlaklar hajmini topamiz. Eng oddiysi — halqa: katta shar hajmidan kichigini ayiramiz.",
      easy: "Halqa: V = 4/3 π (R³ − r³). Masalan, 7 va 5: 4/3 π · 218.",
      draw: [
        { t: 'title', text: 'Tarvuz boʻlaklari' },
        { t: 'icon', x: 12, y: 32, emoji: '🍉', size: 'l' },
        { t: 'ellipse', cx: 46, cy: 42, rx: 18, ry: 18, color: 'green' },
        { t: 'ellipse', cx: 46, cy: 42, rx: 13, ry: 13, color: 'red' },
        { t: 'formula', x: 68, y: 24, text: 'V = 4/3 π (R³ − r³)' },
        { t: 'text', x: 68, y: 44, text: 'shar halqasi', color: 'green' }
      ],
      next: 'Shar segmenti'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sharni markazdan oʻtmaydigan tekislik bilan kessak, ikki boʻlak — shar segmentlari hosil boʻladi. Kesimdagi doira — segment asosi, asosga perpendikular radiusning segment ichidagi qismi — balandlik h. Segment hajmi: uchdan bir pi h kvadrat, karra 3R minus h.",
      easy: "Segment: V = ⅓ π h² (3R − h).",
      draw: [
        { t: 'title', text: 'Shar segmenti' },
        ...ballCut(26, 42, 20, 8),
        { t: 'formula', x: 52, y: 24, text: 'V = ⅓ π h² (3R − h)' },
        { t: 'list', x: 52, y: 40, items: ['h — segment balandligi', 'R — shar radiusi'] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Radiusi 5, balandligi 3 boʻlgan segment: uchdan bir pi karra 9 karra 15 minus 3, yaʼni 3 pi karra 12 teng 36 pi. Diametri 6 va 12 ga boʻlingan shar: radius 9, kichik segment h teng 6: uchdan bir pi karra 36 karra 21, yaʼni 252 pi. Butun shar 972 pi, katta qism 720 pi.",
      easy: "R = 5, h = 3 → 36π. R = 9, h = 6 → 252π, qolgani 720π.",
      draw: [
        { t: 'title', text: 'Segment hajmi' },
        { t: 'list', x: 6, y: 20, items: ['R = 5, h = 3: ⅓π · 9 · 12 = 36π', 'R = 9, h = 6: ⅓π · 36 · 21 = 252π', 'V shar = 972π → 972π − 252π = 720π'] }
      ],
      next: 'Shar sektori'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Shar sektori — segment va uchi shar markazida, asosi segment asosi boʻlgan konus birgalikda. Uning hajmi: uchdan ikki pi R kvadrat h, bu yerda h — segment balandligi. Masalan, R teng 3, h teng 1: uchdan ikki pi karra 9, yaʼni 6 pi.",
      easy: "Sektor: V = ⅔ π R² h. R = 3, h = 1 → 6π.",
      draw: [
        { t: 'title', text: 'Shar sektori' },
        ...ballCut(26, 42, 20, 8),
        { t: 'point', id: 'L', x: 10, y: 30, hide: true },
        { t: 'point', id: 'R', x: 42, y: 30, hide: true },
        { t: 'line', from: 'O', to: 'L', color: 'purple' },
        { t: 'line', from: 'O', to: 'R', color: 'purple' },
        { t: 'formula', x: 52, y: 24, text: 'V = ⅔ π R² h' },
        { t: 'list', x: 52, y: 40, items: ['segment + konus', 'R = 3, h = 1: 6π'] }
      ],
      next: 'Shar kamari'
    },
    {
      kind: 'example',
      clear: true,
      say: "Shar kamari — ikki parallel tekislik orasidagi qism. Hajmini sharning yoki yarim sharning hajmidan segmentlarni ayirib topamiz. Radiusi 2 boʻlgan yarim sharni balandligining oʻrtasidan asosga parallel kesamiz. Yuqoridagi segment: h teng 1, hajmi uchdan bir pi karra 1 karra 6 minus 1, yaʼni besh uchdan pi. Yarim shar uchdan oʻn olti pi. Kamar: oʻn bir uchdan pi.",
      easy: "Kamar = yarim shar − segment = 16π/3 − 5π/3 = 11π/3.",
      draw: [
        { t: 'title', text: 'Shar kamari' },
        { t: 'list', x: 6, y: 20, items: ['V yarim shar = ⅔ π · 8 = 16π/3', 'segment (h = 1): ⅓π · 1 · 5 = 5π/3'] },
        { t: 'formula', x: 6, y: 46, text: 'V kamar = 11π/3' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Shar halqasi: V = 4/3 π (R³ − r³).',
    'Shar segmenti: V = ⅓ π h² (3R − h); shar sektori: V = ⅔ π R² h.',
    'Shar kamari hajmi — shar hajmidan segmentlar hajmlarini ayirib topiladi.'
  ],
  questions: [
    {
      id: 'g75q1',
      prompt: 'Ichki radiusi 5 cm, tashqi radiusi 7 cm boʻlgan shar halqasining hajmi k·π. k = ? (0,01 gacha)',
      hint: '4/3 (343 − 125).',
      explanation: '4/3 · 218 ≈ 290,67.',
      widget: { type: 'number_answer', props: { answer: 290.67, tolerance: 0.02 } }
    },
    {
      id: 'g75q2',
      prompt: 'Radiusi 3 cm, balandligi 1 cm boʻlgan shar sektorining hajmi k·π. k = ?',
      hint: '⅔ · 9 · 1.',
      explanation: '6π.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'g75q3',
      prompt: 'Radiusi 5 boʻlgan shar markazidan 3 masofada tekislik bilan kesildi. Kichik boʻlak hajmi k·π. k = ? (0,01 gacha)',
      hint: 'h = 5 − 3 = 2.',
      explanation: '⅓ · 4 · 13 = 52/3 ≈ 17,33.',
      widget: { type: 'number_answer', props: { answer: 17.33, tolerance: 0.01 } }
    },
    {
      id: 'g75q4',
      prompt: 'Kovak shar devorining hajmi 252π cm³, devor qalinligi 3 cm. Tashqi sharning radiusini toping.',
      hint: 'R³ − (R − 3)³ = 189.',
      explanation: '9R² − 27R + 27 = 189 → R² − 3R − 18 = 0 → R = 6.',
      widget: { type: 'number_answer', props: { answer: 6, unit: 'cm' } }
    },
    {
      id: 'g75q5',
      prompt: 'Radiusi 20 cm boʻlgan tarvuz poʻchogʻining qalinligi 2 cm. Tarvuz hajmining necha foizi poʻchoq? (0,1 gacha)',
      hint: '1 − (18/20)³.',
      explanation: '1 − 0,729 = 0,271 → 27,1%.',
      widget: { type: 'number_answer', props: { answer: 27.1, tolerance: 0.05, unit: '%' } }
    },
    {
      id: 'g75q6',
      prompt: 'Shar sektori asosining radiusi 60 cm, shar radiusi 75 cm. Sektor hajmi k·π. k = ?',
      hint: 'h = 75 − √(75² − 60²) = 30.',
      explanation: '⅔ · 5625 · 30 = 112 500.',
      widget: { type: 'number_answer', props: { answer: 112500 } }
    },
    {
      id: 'g75q7',
      prompt: 'Shar boʻlagini hajm formulasi bilan moslang.',
      hint: 'Sektor — ⅔, segment — ⅓.',
      explanation: 'Halqa — 4/3 π(R³ − r³); segment — ⅓πh²(3R − h); sektor — ⅔πR²h; shar — 4/3 πR³.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'shar halqasi', right: '4/3 π (R³ − r³)' },
            { left: 'shar segmenti', right: '⅓ π h² (3R − h)' },
            { left: 'shar sektori', right: '⅔ π R² h' },
            { left: 'butun shar', right: '4/3 π R³' }
          ]
        }
      }
    },
    {
      id: 'g75q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Taʼriflarni eslang.',
      explanation: 'Sektor = segment + konus; h = R boʻlsa segment — yarim shar; kamar — ikki parallel tekislik orasida.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Shar sektori — segment va uchi markazda boʻlgan konus birlashmasi.', value: true },
            { text: 'h = R boʻlsa, segment formulasi butun shar hajmini beradi.', value: false },
            { text: 'Shar kamari ikki parallel tekislik orasidagi boʻlak.', value: true },
            { text: 'Segmentning balandligi shar radiusidan katta boʻla olmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
