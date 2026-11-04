import type { BoardLesson } from './types';
import { cone, cuboid } from './geo3d';

/** Darslik (2-qism): Geometriya, 13.2 (149–154-betlar) — sharga ichki va tashqi chizilgan koʻpyoqlar va aylanish jismlari. */
export const MATH_73: BoardLesson = {
  n: 73,
  label: '13.2',
  part: 'geometriya',
  qism: 2,
  title: 'Sharga ichki va tashqi chizilgan jismlar',
  section: 'Geometriya, 13.2',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Kub shaklidagi qutiga eng katta qancha toʻp sigʻadi? Toʻp qutining oltita devoriga tegib turadi — u kubga ichki chizilgan, diametri kub qirrasiga teng. Aksincha, kubni sharga joylasak, kubning sakkizta uchi sfera ustida yotadi — kub sharga ichki chizilgan, sharning diametri esa kubning diagonaliga teng.",
      easy: "Kubdagi shar: 2r = a. Shardagi kub: 2R = a√3.",
      draw: [
        { t: 'title', text: 'Kub va shar' },
        ...cuboid('k', [4, 4, 4], [20, 54], 7, {}, 'ink'),
        { t: 'ellipse', cx: 26.3, cy: 46.3, rx: 14, ry: 14, color: 'blue' },
        { t: 'list', x: 60, y: 22, items: ['ichki shar: r = a/2', 'tashqi shar: R = a√3/2', 'qirralarga urinuvchi: a√2/2'] }
      ],
      next: 'Taʼriflar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Koʻpyoqning barcha uchlari sfera ustida yotsa, koʻpyoq sharga ichki chizilgan, shar esa unga tashqi chizilgan deyiladi. Koʻpyoqning barcha yoqlari sferaga urinsa, koʻpyoq sharga tashqi chizilgan, shar esa unga ichki chizilgan. Har qanday uchburchakli piramidaga yagona ichki va yagona tashqi shar chizish mumkin. Toʻgʻri prizmaga tashqi shar chizish uchun asosiga tashqi aylana chizilishi kerak.",
      easy: "Uchlari sferada — koʻpyoq ichki chizilgan. Yoqlari sferaga urinadi — tashqi chizilgan.",
      draw: [
        { t: 'title', text: 'Ichki yoki tashqi?' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['koʻpyoq …', 'shar …'],
            ['uchlari sferada', 'tashqi chizilgan'],
            ['yoqlari sferaga urinadi', 'ichki chizilgan']
          ]
        },
        { t: 'list', x: 6, y: 46, items: ['uchburchakli piramida: har doim ikkalasi bor', 'muntazam piramida: markaz oʻqda yotadi'] }
      ],
      next: 'Silindr va shar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Silindrga shar ichki chizilgan boʻlsa, shar ikkala asosga va yon sirtga urinadi: silindrning oʻq kesimi kvadrat, H teng 2r, silindr radiusi shar radiusiga teng. Silindr sharga ichki chizilgan boʻlsa, ya'ni asoslarining aylanalari sferada yotsa, silindr oʻq kesimining diagonali shar diametriga teng: d teng 2R.",
      easy: "Shar silindr ichida: H = 2r, R = r. Silindr shar ichida: diagonal d = 2R.",
      draw: [
        { t: 'title', text: 'Silindr va shar' },
        { t: 'point', id: 'a', x: 8, y: 24, hide: true },
        { t: 'point', id: 'b', x: 40, y: 24, hide: true },
        { t: 'point', id: 'c', x: 40, y: 56, hide: true },
        { t: 'point', id: 'd', x: 8, y: 56, hide: true },
        { t: 'polygon', points: ['a', 'b', 'c', 'd'] },
        { t: 'ellipse', cx: 24, cy: 40, rx: 16, ry: 16, color: 'blue' },
        { t: 'text', x: 24, y: 64, text: 'oʻq kesim — kvadrat', anchor: 'middle', size: 's' },
        { t: 'list', x: 52, y: 22, items: ['shar silindr ichida:', 'H = 2r,  R = r', 'silindr shar ichida:', 'diagonal = 2R'] }
      ],
      next: 'Konus va shar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Konus sharga ichki chizilgan boʻlsa, ya'ni uchi va asos aylanasi sferada yotsa, yasovchi kvadrati 2 karra H karra R ga teng. Masalan, balandligi 3, asos radiusi 3 ildiz 3 boʻlgan konus: l kvadrat teng 9 plyus 27, yaʼni 36. Tashqi shar radiusi R teng 36 boʻlinsin 6, yaʼni 6.",
      easy: "Konus shar ichida: l² = 2HR. H = 3, r = 3√3 → l² = 36 → R = 6.",
      draw: [
        { t: 'title', text: 'Konus shar ichida' },
        { t: 'ellipse', cx: 26, cy: 40, rx: 20, ry: 20, color: 'blue' },
        ...cone('k', 26, 50, 17.3, 30, 'ink'),
        { t: 'formula', x: 52, y: 22, text: 'l² = 2 H R' },
        { t: 'list', x: 52, y: 38, items: ['l² = 3² + (3√3)² = 36', 'R = 36 / (2 · 3) = 6'] }
      ],
      next: 'Kesik konus va shar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Kesik konusga shar ichki chizilgan boʻlsa, oʻq kesimi — teng yonli trapetsiyaga aylana ichki chizilgan. Shuning uchun balandlik H teng 2r, yasovchi esa asoslar radiuslari yigʻindisiga teng: l teng R plyus r. Masalan, asoslarining radiuslari 4 va 9 boʻlsa, yasovchi 13, balandlik ildiz ostida 169 minus 25, yaʼni 12, shar radiusi 6.",
      easy: "Kesik konusdagi shar: H = 2r, l = R + r. R = 9, r = 4 → l = 13, H = 12, shar radiusi 6.",
      draw: [
        { t: 'title', text: 'Kesik konus va shar' },
        { t: 'point', id: 'a', x: 6, y: 52, hide: true },
        { t: 'point', id: 'b', x: 42, y: 52, hide: true },
        { t: 'point', id: 'c', x: 32, y: 28, hide: true },
        { t: 'point', id: 'd', x: 16, y: 28, hide: true },
        { t: 'polygon', points: ['a', 'b', 'c', 'd'] },
        { t: 'ellipse', cx: 24, cy: 40, rx: 12, ry: 12, color: 'blue' },
        { t: 'list', x: 52, y: 22, items: ['H = 2r', 'l = R + r', 'R = 9, r = 4: l = 13', 'H = √(13² − 5²) = 12'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Koʻpyoqning uchlari sferada — u sharga ichki chizilgan; yoqlari sferaga urinsa — tashqi chizilgan.',
    'Kub: ichki shar r = a/2, tashqi shar R = a√3/2. Silindrdagi shar: H = 2r; silindr shar ichida: diagonal 2R.',
    'Konus shar ichida: l² = 2HR. Kesik konusdagi shar: H = 2r, l = R + r.'
  ],
  questions: [
    {
      id: 'g73q1',
      prompt: 'Toʻla sirti 72 ga teng kubga tashqi chizilgan sharning radiusi?',
      hint: 'a² = 12, R = a√3/2.',
      explanation: 'a = 2√3, R = 2√3 · √3 / 2 = 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'g73q2',
      prompt: 'Sferaga tashqi chizilgan kub hajmi 216. Sfera radiusi?',
      hint: 'Sfera kubga ichki chizilgan: r = a/2.',
      explanation: 'a = 6, r = 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'g73q3',
      prompt: 'Birlik sharga (R = 1) tashqi chizilgan kubning hajmi?',
      hint: 'a = 2R.',
      explanation: 'a = 2, V = 8.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'g73q4',
      prompt: 'Qirrasi 8 boʻlgan kubning barcha uchlaridan oʻtuvchi sfera radiusi (0,01 gacha)?',
      hint: 'R = a√3/2.',
      explanation: 'R = 4√3 ≈ 6,93.',
      widget: { type: 'number_answer', props: { answer: 6.928, tolerance: 0.01 } }
    },
    {
      id: 'g73q5',
      prompt: 'Radiusi 5 boʻlgan sharga balandligi 4 boʻlgan konus ichki chizilgan. Konus hajmi k·π. k = ?',
      hint: 'l² = 2HR = 40, r² = l² − H² = 24.',
      explanation: 'V = ⅓ π · 24 · 4 = 32π.',
      widget: { type: 'number_answer', props: { answer: 32 } }
    },
    {
      id: 'g73q6',
      prompt: 'Piramida hajmi 25, unga ichki chizilgan shar radiusi 1,5. Toʻla sirtini toping.',
      hint: 'V = ⅓ · S toʻla · r.',
      explanation: 'S = 3 · 25 / 1,5 = 50.',
      widget: { type: 'number_answer', props: { answer: 50 } }
    },
    {
      id: 'g73q7',
      prompt: 'Kesik konusga shar ichki chizilgan, asoslarining radiuslari 2 va 8. Yasovchisini toping.',
      hint: 'l = R + r.',
      explanation: 'l = 10.',
      widget: { type: 'number_answer', props: { answer: 10 } }
    },
    {
      id: 'g73q8',
      prompt: 'Holatni munosabat bilan moslang.',
      hint: 'Har biri yuqorida koʻrilgan.',
      explanation: 'Kubdagi shar — r = a/2; shardagi kub — R = a√3/2; silindrdagi shar — H = 2r; shardagi konus — l² = 2HR.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'shar kub ichida', right: 'r = a/2' },
            { left: 'kub shar ichida', right: 'R = a√3/2' },
            { left: 'shar silindr ichida', right: 'H = 2r' },
            { left: 'konus shar ichida', right: 'l² = 2HR' }
          ]
        }
      }
    },
    {
      id: 'g73q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Taʼriflarni eslang.',
      explanation: 'Har qanday uchburchakli piramidaga tashqi shar chiziladi; har qanday silindrga ichki shar chizib boʻlmaydi (oʻq kesimi kvadrat boʻlishi kerak); har qanday konusga ichki shar chiziladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Har qanday uchburchakli piramidaga tashqi shar chizish mumkin.', value: true },
            { text: 'Har qanday silindrga ichki shar chizish mumkin.', value: false },
            { text: 'Har qanday konusga ichki shar chizish mumkin.', value: true },
            { text: 'Koʻpyoq sharga ichki chizilgan boʻlsa, uning yoqlari sferaga urinadi.', value: false }
          ]
        }
      }
    }
  ]
};
