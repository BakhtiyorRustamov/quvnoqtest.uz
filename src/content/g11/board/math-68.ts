import type { BoardLesson } from './types';
import { cone, sector } from './geo3d';

/** Darslik (2-qism): Geometriya, 11.1 (127–128-betlar) — konus, uning elementlari, yoyilmasi va sirti. */
export const MATH_68: BoardLesson = {
  n: 68,
  label: '11.1',
  part: 'geometriya',
  qism: 2,
  title: 'Konus va uning sirtini hisoblash',
  section: 'Geometriya, 11.1',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Vafli muzqaymoq stakanchasi, bayram qalpogʻi, yoʻl konusi — hammasi bir xil shaklda. Toʻgʻri burchakli uchburchakni bir kateti atrofida aylantirsak, xuddi shunday jism hosil boʻladi. U konus deyiladi. Bugun konusning elementlari va sirtini oʻrganamiz.",
      easy: "Toʻgʻri burchakli uchburchak kateti atrofida aylansa — konus hosil boʻladi.",
      draw: [
        { t: 'title', text: 'Atrofimizdagi konuslar' },
        { t: 'icon', x: 12, y: 30, emoji: '🍦', size: 'l' },
        { t: 'icon', x: 12, y: 54, emoji: '🥳', size: 'l' },
        ...cone('k', 50, 58, 14, 38, 'blue'),
        { t: 'line', from: 'kS', to: 'kO', dashed: true, color: 'red' },
        { t: 'line', from: 'kO', to: 'kR', color: 'red' },
        { t: 'text', x: 70, y: 30, text: 'uchburchak aylanadi', size: 's', color: 'red' }
      ],
      next: 'Elementlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Aylanish oʻqi boʻlgan katet — konusning oʻqi va balandligi H. Ikkinchi katet chizgan doira — asos, uning radiusi r. Gipotenuza — yasovchi l, u chizgan sirt — yon sirt. Pifagor teoremasi boʻyicha: l kvadrat teng r kvadrat plyus H kvadrat. Konusning oʻqi orqali kesim — teng yonli uchburchak, u oʻq kesim deyiladi.",
      easy: "H — balandlik, r — radius, l — yasovchi: l² = r² + H². Oʻq kesim — teng yonli uchburchak.",
      draw: [
        { t: 'title', text: 'Konus elementlari' },
        ...cone('k', 28, 58, 18, 38),
        { t: 'point', id: 'S', x: 28, y: 20, label: 'S' },
        { t: 'line', from: 'kS', to: 'kO', dashed: true, color: 'red', label: 'H' },
        { t: 'line', from: 'kO', to: 'kR', color: 'blue', label: 'r' },
        { t: 'line', from: 'kS', to: 'kR', color: 'green', label: 'l' },
        { t: 'formula', x: 56, y: 22, text: 'l² = r² + H²' },
        { t: 'list', x: 56, y: 38, items: ['oʻq kesim: teng yonli', 'asos: doira', 'S — konus uchi'] }
      ],
      next: 'Yoyilma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Konus yon sirtini yasovchi boʻylab kesib, tekislikka yoysak, doiraviy sektor hosil boʻladi. Sektor radiusi — yasovchi l, yoyi uzunligi — asos aylanasi 2 pi r. Sektor yuzi yarim yoy karra radius: yarim karra 2 pi r karra l, yaʼni pi r l. Demak, S yon teng pi r l, toʻla sirt — pi r karra r plyus l.",
      easy: "Yoyilma — sektor. S yon = πrl, S toʻla = πr(r + l).",
      draw: [
        { t: 'title', text: 'Yon sirt yoyilmasi' },
        ...sector('y', 24, 26, 26, 225, 315, 'blue'),
        { t: 'text', x: 24, y: 64, text: 'yoy = 2πr', anchor: 'middle', size: 's', color: 'blue' },
        { t: 'text', x: 14, y: 40, text: 'l', color: 'green' },
        { t: 'formula', x: 56, y: 22, text: 'S yon = π r l' },
        { t: 'formula', x: 56, y: 38, text: 'S toʻla = π r (r + l)' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Konus asosining diametri 12, yasovchisi 10. Radius 6. Yon sirt pi karra 6 karra 10, yaʼni 60 pi. Asos yuzi 36 pi. Toʻla sirt 96 pi, taxminan 301,6. Balandligi esa ildiz ostida 100 minus 36, yaʼni 8.",
      easy: "S yon = 60π, S toʻla = 96π ≈ 301,6; H = 8.",
      draw: [
        { t: 'title', text: 'd = 12, l = 10' },
        ...cone('k', 24, 58, 14, 34),
        { t: 'list', x: 50, y: 20, items: ['r = 6, H = √(100 − 36) = 8', 'S yon = π · 6 · 10 = 60π', 'S asos = 36π'] },
        { t: 'formula', x: 50, y: 48, text: 'S toʻla = 96π ≈ 301,6' }
      ],
      next: 'Sektor burchagi'
    },
    {
      kind: 'example',
      clear: true,
      say: "Yoyilma sektorining burchagi qancha? Sektor yoyi 2 pi r, butun aylana esa 2 pi l. Demak, burchak 360 gradus karra r boʻlinsin l. Radiusi 6, balandligi 8 boʻlgan konusda l teng 10, burchak 360 karra 6 boʻlinsin 10, yaʼni 216 gradus.",
      easy: "φ = 360° · r / l. r = 6, H = 8 → l = 10 → φ = 216°.",
      draw: [
        { t: 'title', text: 'Sektor burchagi' },
        { t: 'formula', x: 6, y: 22, text: 'φ = 360° · r / l' },
        { t: 'list', x: 6, y: 38, items: ['r = 6, H = 8 → l = 10', 'φ = 360° · 6/10 = 216°'] },
        ...sector('z', 76, 40, 16, 90, 306, 'purple')
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Konus — toʻgʻri burchakli uchburchakning kateti atrofida aylanishidan hosil boʻlgan jism; l² = r² + H².',
    'Oʻq kesim — teng yonli uchburchak; yon sirt yoyilmasi — radiusi l boʻlgan sektor, burchagi 360° · r/l.',
    'S yon = πrl, S toʻla = πr(r + l).'
  ],
  questions: [
    {
      id: 'g68q1',
      prompt: 'Konusning yasovchisi 13 cm, asos diametri 10 cm. Balandligini toping.',
      hint: 'r = 5.',
      explanation: 'H = √(169 − 25) = 12 cm.',
      widget: { type: 'number_answer', props: { answer: 12, unit: 'cm' } }
    },
    {
      id: 'g68q2',
      prompt: 'Konus asosining radiusi 16 cm, balandligi 12 cm. Yon sirti k·π cm². k = ?',
      hint: 'l = √(256 + 144) = 20.',
      explanation: 'S yon = π · 16 · 20 = 320π.',
      widget: { type: 'number_answer', props: { answer: 320 } }
    },
    {
      id: 'g68q3',
      prompt: 'Katetlari 12 cm va 16 cm boʻlgan toʻgʻri burchakli uchburchak kichik kateti atrofida aylanadi. Hosil boʻlgan konusning toʻla sirti k·π. k = ?',
      hint: 'r = 16, H = 12, l = 20.',
      explanation: 'πr(r + l) = π · 16 · 36 = 576π.',
      widget: { type: 'number_answer', props: { answer: 576 } }
    },
    {
      id: 'g68q4',
      prompt: 'Konus asosining radiusi 12, yasovchisi 40. Yoyilma sektorining burchagi necha gradus?',
      hint: '360° · r / l.',
      explanation: '360 · 12/40 = 108°.',
      widget: { type: 'number_answer', props: { answer: 108, unit: '°' } }
    },
    {
      id: 'g68q5',
      prompt: 'Konus asosining radiusi 4 cm, balandligi 6 cm. Yasovchisini toping (0,01 gacha).',
      hint: 'l = √(r² + H²).',
      explanation: 'l = √52 ≈ 7,21 cm.',
      widget: { type: 'number_answer', props: { answer: 7.211, tolerance: 0.01, unit: 'cm' } }
    },
    {
      id: 'g68q6',
      prompt: 'Konus elementini maʼnosi bilan moslang.',
      hint: 'Uchburchak aylanishini tasavvur qiling.',
      explanation: 'Oʻq — aylanish oʻqi boʻlgan katet; yasovchi — gipotenuza; asos — ikkinchi katet chizgan doira; oʻq kesim — teng yonli uchburchak.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Balandlik (oʻq)', right: 'aylanish oʻqidagi katet' },
            { left: 'Yasovchi', right: 'gipotenuza' },
            { left: 'Asos', right: 'ikkinchi katet chizgan doira' },
            { left: 'Oʻq kesim', right: 'teng yonli uchburchak' }
          ]
        }
      }
    },
    {
      id: 'g68q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Yoyilma — sektor.',
      explanation: 'S yon = πrl; S toʻla = πr(r + l).',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'S yon = ' }, { blank: 'πrl' }, { text: ',  S toʻla = πr(' }, { blank: 'r + l' }, { text: ')' }],
          bank: ['πrl', '2πrl', 'r + l', 'r + H']
        }
      }
    },
    {
      id: 'g68q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Simmetriyani eslang.',
      explanation: 'Oʻq orqali har bir tekislik — simmetriya tekisligi; konusning simmetriya markazi yoʻq; yasovchi har doim balandlikdan uzun.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Konusning oʻqi orqali oʻtgan har qanday tekislik uning simmetriya tekisligi.', value: true },
            { text: 'Konusning simmetriya markazi bor.', value: false },
            { text: 'Konusning yasovchisi uning balandligidan uzun.', value: true },
            { text: 'Konus yon sirtining yoyilmasi — toʻgʻri toʻrtburchak.', value: false }
          ]
        }
      }
    }
  ]
};
