import type { BoardLesson } from './types';
import { cone, frustumCone } from './geo3d';

/** Darslik (2-qism): Geometriya, 11.3–11.4 (135–139-betlar) — kesik konus, uning sirti va hajmi. */
export const MATH_70: BoardLesson = {
  n: 70,
  label: '11.3–11.4',
  part: 'geometriya',
  qism: 2,
  title: 'Kesik konus: sirt va hajm',
  section: 'Geometriya, 11.3–11.4',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yogurt qutisi, chelak, gul tuvagi — pastdan tor, tepadan keng. Bunday shakl konusni asosiga parallel tekislik bilan kesganda hosil boʻladi va kesik konus deyiladi. Uni toʻgʻri burchakli trapetsiyaning kichik yon tomoni atrofida aylanishidan hosil boʻlgan jism deb ham qarash mumkin.",
      easy: "Konusning uchini parallel kesib tashlasak — kesik konus qoladi.",
      draw: [
        { t: 'title', text: 'Kesik konus' },
        ...cone('k', 26, 60, 18, 44),
        { t: 'ellipse', cx: 26, cy: 38, rx: 9, ry: 2.88, color: 'blue' },
        { t: 'icon', x: 70, y: 28, emoji: '🧁', size: 'l' },
        { t: 'list', x: 56, y: 44, items: ['ikki asos — doiralar', 'yon sirt'] }
      ],
      next: 'Elementlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kesik konusning ikki asosi — radiuslari r1 va r2 boʻlgan doiralar, ular orasidagi masofa — balandlik H, yon sirtdagi kesma — yasovchi l. Yon sirt: pi l karra r1 plyus r2. Toʻla sirt — yon sirt plyus ikkala asos yuzi: pi r1 kvadrat plyus pi r2 kvadrat.",
      easy: "S yon = π l (r₁ + r₂), S toʻla = S yon + π r₁² + π r₂².",
      draw: [
        { t: 'title', text: 'Yon va toʻla sirt' },
        ...frustumCone('f', 26, 58, 18, 9, 30),
        { t: 'line', from: 'fO1', to: 'fO2', dashed: true, color: 'red', label: 'H' },
        { t: 'line', from: 'fO1', to: 'fR1', color: 'blue', label: 'r₁' },
        { t: 'line', from: 'fO2', to: 'fR2', color: 'blue', label: 'r₂' },
        { t: 'formula', x: 52, y: 22, text: 'S yon = π l (r₁ + r₂)' },
        { t: 'list', x: 54, y: 38, items: ['S toʻla = S yon +', '+ π r₁² + π r₂²'] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Kesik konus asoslarining diametrlari 16 va 10, balandligi 4. Radiuslar 8 va 5. Yasovchi — oʻq kesim trapetsiyasining yon tomoni: ildiz ostida 4 kvadrat plyus 8 minus 5 ning kvadrati, yaʼni 5. Yon sirt: pi karra 5 karra 13, yaʼni 65 pi.",
      easy: "r₁ = 8, r₂ = 5, l = √(16 + 9) = 5, S yon = 65π.",
      draw: [
        { t: 'title', text: 'd₁ = 16, d₂ = 10, H = 4' },
        { t: 'list', x: 6, y: 20, items: ['r₁ = 8, r₂ = 5', 'l² = H² + (r₁ − r₂)² = 16 + 9', 'l = 5'] },
        { t: 'formula', x: 6, y: 48, text: 'S yon = π · 5 · 13 = 65π' }
      ],
      next: 'Hajm'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kesik konus hajmi kesik piramida kabi topiladi: V teng uchdan bir H, karra S1 plyus ildiz S1 S2 plyus S2. Radiuslar orqali: V teng uchdan bir pi H, karra r1 kvadrat plyus r1 r2 plyus r2 kvadrat.",
      easy: "V = ⅓ π H (r₁² + r₁r₂ + r₂²).",
      draw: [
        { t: 'title', text: 'Kesik konus hajmi' },
        { t: 'formula', x: 6, y: 22, text: 'V = ⅓ H (S₁ + √(S₁S₂) + S₂)' },
        { t: 'formula', x: 6, y: 40, text: 'V = ⅓ π H (r₁² + r₁r₂ + r₂²)' },
        { t: 'text', x: 6, y: 60, text: 'katta konus − kichik konus', color: 'purple' }
      ],
      next: 'Yogurt qutisi'
    },
    {
      kind: 'example',
      clear: true,
      say: "Yogurt qutisining katta asosi diametri 8, kichigi 6, balandligi 7,5 santimetr. Radiuslar 4 va 3. Hajm: uchdan bir pi karra 7,5 karra 16 plyus 12 plyus 9, yaʼni 2,5 pi karra 37 teng 92,5 pi, taxminan 290,6 kub santimetr — deyarli 300 millilitr.",
      easy: "V = ⅓ π · 7,5 · (16 + 12 + 9) = 92,5π ≈ 290,6 cm³.",
      draw: [
        { t: 'title', text: 'Yogurt qutisi' },
        ...frustumCone('y', 24, 58, 10, 13, 26, 'green'),
        { t: 'list', x: 48, y: 20, items: ['r₁ = 4, r₂ = 3, H = 7,5', '16 + 12 + 9 = 37'] },
        { t: 'formula', x: 48, y: 46, text: 'V = 92,5π ≈ 290,6 cm³' }
      ],
      next: 'Yana misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Asoslarining radiuslari 8 va 5, yasovchisi asos tekisligiga 45 gradus ostida ogʻgan. Radiuslar farqi 3, 45 gradusda balandlik ham 3. Hajm: uchdan bir pi karra 3 karra 64 plyus 40 plyus 25, yaʼni 129 pi.",
      easy: "H = r₁ − r₂ = 3; V = π (64 + 40 + 25) = 129π.",
      draw: [
        { t: 'title', text: 'r₁ = 8, r₂ = 5, 45°' },
        { t: 'list', x: 6, y: 20, items: ['45° → H = r₁ − r₂ = 3', 'r₁² + r₁r₂ + r₂² = 129'] },
        { t: 'formula', x: 6, y: 46, text: 'V = ⅓ π · 3 · 129 = 129π' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Kesik konus — konusning asosga parallel kesimdan pastki qismi; asoslari doiralar, l² = H² + (r₁ − r₂)².',
    'S yon = π l (r₁ + r₂), S toʻla = S yon + π r₁² + π r₂².',
    'V = ⅓ π H (r₁² + r₁r₂ + r₂²).'
  ],
  questions: [
    {
      id: 'g70q1',
      prompt: 'Kesik konus asoslarining radiuslari 12 cm va 8 cm, yasovchisi katta asosga 60° ostida ogʻgan. Yon sirti k·π. k = ?',
      hint: 'l = (12 − 8) / cos 60° = 8.',
      explanation: 'S yon = π · 8 · 20 = 160π.',
      widget: { type: 'number_answer', props: { answer: 160 } }
    },
    {
      id: 'g70q2',
      prompt: 'Asoslarining radiuslari 6 va 3, balandligi 4 boʻlgan kesik konus hajmi k·π. k = ?',
      hint: '⅓ · 4 · (36 + 18 + 9).',
      explanation: '⅓ · 4 · 63 = 84 → 84π.',
      widget: { type: 'number_answer', props: { answer: 84 } }
    },
    {
      id: 'g70q3',
      prompt: 'Konusning yon sirti 96π. Balandligining oʻrtasidan asosga parallel tekislik oʻtkazildi. Hosil boʻlgan kesik konusning yon sirti k·π. k = ?',
      hint: 'Kichik konus yon sirti (½)² · 96π.',
      explanation: '96π − 24π = 72π.',
      widget: { type: 'number_answer', props: { answer: 72 } }
    },
    {
      id: 'g70q4',
      prompt: 'Konusning yasovchisi 5, balandligi 4. Asosdan 2 masofada parallel tekislik bilan kesildi. Kesim yuzi k·π. k = ?',
      hint: 'r = 3; kesim uchdan 2 masofada, k = ½.',
      explanation: 'Kesim radiusi 1,5, yuzi 2,25π.',
      widget: { type: 'number_answer', props: { answer: 2.25, tolerance: 0.001 } }
    },
    {
      id: 'g70q5',
      prompt: 'Kesik konus asoslarining radiuslari 8 va 5, balandligi 4. Yasovchisini toping.',
      hint: 'l² = H² + (r₁ − r₂)².',
      explanation: 'l = √(16 + 9) = 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'g70q6',
      prompt: 'Formulani kattalik bilan moslang.',
      hint: 'Uchta formula — uch xil kattalik.',
      explanation: 'πl(r₁ + r₂) — yon sirt; ⅓πH(r₁² + r₁r₂ + r₂²) — hajm; πr₁² — katta asos yuzi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'π l (r₁ + r₂)', right: 'yon sirt' },
            { left: '⅓ π H (r₁² + r₁r₂ + r₂²)', right: 'hajm' },
            { left: 'π r₁²', right: 'katta asos yuzi' },
            { left: '√(H² + (r₁ − r₂)²)', right: 'yasovchi' }
          ]
        }
      }
    },
    {
      id: 'g70q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kesik konus qanday hosil boʻladi?',
      explanation: 'Toʻgʻri burchakli trapetsiyani kichik yon tomoni atrofida aylantirsak, kesik konus chiqadi; oʻq kesimi — teng yonli trapetsiya; r₂ = 0 da konus formulasi chiqadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kesik konus toʻgʻri burchakli trapetsiyaning kichik yon tomoni atrofida aylanishidan hosil boʻladi.', value: true },
            { text: 'Kesik konusning oʻq kesimi — toʻgʻri toʻrtburchak.', value: false },
            { text: 'r₂ = 0 boʻlsa, kesik konus hajmi formulasi konus hajmini beradi.', value: true },
            { text: 'Kesik konus hajmi π H (r₁² + r₂²) ga teng.', value: false }
          ]
        }
      }
    }
  ]
};
