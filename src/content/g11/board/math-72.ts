import type { BoardLesson } from './types';
import type { DrawOp } from '@/lib/lab/plan';

/** Shar: kontur aylana va ekvator (orqa yarmi punktir). */
function ball(cx: number, cy: number, r: number, color: 'ink' | 'blue' | 'green' | 'red' | 'orange' | 'purple' = 'ink'): DrawOp[] {
  return [
    { t: 'ellipse', cx, cy, rx: r, ry: r, color },
    { t: 'ellipse', cx, cy, rx: r, ry: +(r * 0.3).toFixed(2), dashedBack: true, color },
    { t: 'point', id: 'O', x: cx, y: cy, label: 'O' }
  ];
}

/** Darslik (2-qism): Geometriya, 13.1 (146–149-betlar) — shar va sfera, sfera tenglamasi, sharning kesimlari, urinma tekislik. */
export const MATH_72: BoardLesson = {
  n: 72,
  label: '13.1',
  part: 'geometriya',
  qism: 2,
  title: 'Shar va sfera, sharning kesimlari',
  section: 'Geometriya, 13.1',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Futbol toʻpi, tarvuz, Yer shari — hammasi dumaloq. Matematikada bunday jism shar deyiladi: u berilgan nuqtadan, ya'ni markazdan, radiusdan katta boʻlmagan masofadagi barcha nuqtalardan iborat. Sharning chegarasi — sirti esa sfera deyiladi. Yarim doirani diametri atrofida aylantirsak ham shar hosil boʻladi.",
      easy: "Shar — markazdan R gacha boʻlgan barcha nuqtalar; uning sirti — sfera.",
      draw: [
        { t: 'title', text: 'Shar va sfera' },
        { t: 'icon', x: 12, y: 30, emoji: '⚽', size: 'l' },
        { t: 'icon', x: 12, y: 54, emoji: '🌍', size: 'l' },
        ...ball(48, 42, 18, 'blue'),
        { t: 'point', id: 'M', x: 66, y: 42, label: 'M' },
        { t: 'line', from: 'O', to: 'M', color: 'red', label: 'R' },
        { t: 'list', x: 72, y: 24, items: ['shar: OM ≤ R', 'sfera: OM = R'] }
      ],
      next: 'Sfera tenglamasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Markazi A(a; b; c) nuqtada, radiusi R boʻlgan sferaning har bir nuqtasi M(x; y; z) uchun AM teng R. Masofa formulasidan sfera tenglamasi chiqadi: x minus a ning kvadrati plyus y minus b ning kvadrati plyus z minus c ning kvadrati teng R kvadrat. Markaz koordinatalar boshida boʻlsa: x kvadrat plyus y kvadrat plyus z kvadrat teng R kvadrat. Shar uchun esa tenglik oʻrniga «kichik yoki teng».",
      easy: "(x − a)² + (y − b)² + (z − c)² = R². Shar uchun ≤.",
      draw: [
        { t: 'title', text: 'Sfera tenglamasi' },
        { t: 'formula', x: 6, y: 22, text: '(x − a)² + (y − b)² + (z − c)² = R²' },
        { t: 'list', x: 6, y: 40, items: ['markaz (0; 0; 0): x² + y² + z² = R²', 'misol: (x + 1)² + (y − 2)² + (z − 1)² = 25', '→ markaz (−1; 2; 1), R = 5'] }
      ],
      next: 'Kesimlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sharni tekislik bilan kessak, kesimda doira hosil boʻladi. Markazdan tekislikkacha masofa d boʻlsin. d katta R boʻlsa, umumiy nuqta yoʻq. d teng R boʻlsa, tekislik sharga urinadi. d kichik R boʻlsa, kesim — radiusi ildiz ostida R kvadrat minus d kvadrat boʻlgan doira. Markazdan oʻtgan kesim eng katta — u katta doira deyiladi.",
      easy: "d < R: kesim — doira, r = √(R² − d²). d = R — urinadi. d > R — kesishmaydi.",
      draw: [
        { t: 'title', text: 'Sharning kesimi' },
        ...ball(26, 42, 20),
        { t: 'ellipse', cx: 26, cy: 32, rx: 17.32, ry: 5.2, color: 'blue' },
        { t: 'point', id: 'K', x: 26, y: 32, label: 'K' },
        { t: 'point', id: 'P', x: 43.32, y: 32 },
        { t: 'line', from: 'O', to: 'K', dashed: true, color: 'red', label: 'd' },
        { t: 'line', from: 'K', to: 'P', color: 'blue', label: 'r' },
        { t: 'line', from: 'O', to: 'P', color: 'green', label: 'R' },
        { t: 'formula', x: 52, y: 22, text: 'r = √(R² − d²)' },
        { t: 'list', x: 52, y: 38, items: ['d > R: kesishmaydi', 'd = R: urinadi', 'd < R: doira'] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Shar radiusining oʻrtasidan unga perpendikular tekislik oʻtkazildi. d teng yarim R, kesim radiusi kvadrati R kvadrat minus chorak R kvadrat, yaʼni toʻrtdan uch R kvadrat. Kesim yuzi katta doira yuzining toʻrtdan uch qismi. Yana: radiusi 13 boʻlgan sferani markazdan 5 masofada kessak, kesim radiusi 12, yuzi 144 pi.",
      easy: "d = R/2 → kesim yuzi ¾ katta doira. R = 13, d = 5 → r = 12, S = 144π.",
      draw: [
        { t: 'title', text: 'Kesim yuzi' },
        { t: 'list', x: 6, y: 20, items: ['d = R/2: r² = R² − R²/4 = ¾R²', 'S kesim : S katta doira = 3 : 4'] },
        { t: 'list', x: 6, y: 42, items: ['R = 13, d = 5: r = √(169 − 25) = 12', 'S = 144π'] }
      ],
      next: 'Urinma tekislik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sfera nuqtasi B dan oʻtkazilgan radiusga perpendikular tekislik — urinma tekislik. Shar bilan uning bitta umumiy nuqtasi bor. Masalan, radiusi 20 boʻlgan sharga urinma tekislikda yotgan A nuqta markazdan 25 masofada. OB perpendikular AB, demak AB teng ildiz ostida 625 minus 400, yaʼni 15.",
      easy: "Urinma tekislik radiusga perpendikular. OA = 25, OB = 20 → AB = 15.",
      draw: [
        { t: 'title', text: 'Urinma tekislik' },
        ...ball(28, 34, 16),
        { t: 'point', id: 'B', x: 28, y: 50, label: 'B' },
        { t: 'point', id: 'A', x: 46, y: 50, label: 'A' },
        { t: 'point', id: 'p1', x: 6, y: 58, hide: true },
        { t: 'point', id: 'p2', x: 56, y: 58, hide: true },
        { t: 'point', id: 'p3', x: 62, y: 48, hide: true },
        { t: 'point', id: 'p4', x: 12, y: 48, hide: true },
        { t: 'polygon', points: ['p1', 'p2', 'p3', 'p4'], color: 'purple' },
        { t: 'line', from: 'O', to: 'B', color: 'red', label: '20' },
        { t: 'line', from: 'O', to: 'A', color: 'green', label: '25' },
        { t: 'line', from: 'B', to: 'A', color: 'blue' },
        { t: 'formula', x: 66, y: 24, text: 'AB = 15' }
      ],
      next: 'Ikki sfera'
    },
    {
      kind: 'example',
      clear: true,
      say: "Radiuslari 15 va 20 boʻlgan ikki shar markazlari orasidagi masofa 25. Sirtlar aylana boʻylab kesishadi. Markazlar va kesishish nuqtasi 15, 20, 25 tomonli toʻgʻri burchakli uchburchak hosil qiladi. Aylana radiusi — uning gipotenuzaga tushirilgan balandligi: 15 karra 20 boʻlinsin 25, yaʼni 12. Aylana uzunligi 24 pi.",
      easy: "15 · 20 / 25 = 12 — kesishish aylanasi radiusi; uzunligi 24π.",
      draw: [
        { t: 'title', text: 'Ikki sfera kesishadi' },
        { t: 'ellipse', cx: 24, cy: 42, rx: 12, ry: 12, color: 'blue' },
        { t: 'ellipse', cx: 44, cy: 42, rx: 16, ry: 16, color: 'red' },
        { t: 'point', id: 'O1', x: 24, y: 42, label: 'O₁' },
        { t: 'point', id: 'O2', x: 44, y: 42, label: 'O₂' },
        { t: 'point', id: 'X', x: 31.2, y: 32.4, label: 'X' },
        { t: 'line', from: 'O1', to: 'O2', label: '25' },
        { t: 'line', from: 'O1', to: 'X', color: 'blue' },
        { t: 'line', from: 'O2', to: 'X', color: 'red' },
        { t: 'list', x: 64, y: 24, items: ['15² + 20² = 25²', 'r = 15 · 20 / 25 = 12', 'C = 2π · 12 = 24π'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Shar — markazdan R gacha masofadagi nuqtalar; sfera tenglamasi (x − a)² + (y − b)² + (z − c)² = R².',
    'Tekislik kesimi — doira, r = √(R² − d²); markazdan oʻtgani — katta doira.',
    'Urinma tekislik urinish nuqtasidagi radiusga perpendikular va shar bilan bitta umumiy nuqtaga ega.'
  ],
  questions: [
    {
      id: 'g72q1',
      prompt: 'Sharning radiusi 10, tekislik bilan kesimi yuzi 64π. Markazdan kesim tekisligigacha masofa?',
      hint: 'r = 8.',
      explanation: 'd = √(100 − 64) = 6.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'g72q2',
      prompt: '(x + 1)² + (y − 2)² + (z − 1)² = 25 sferaning radiusi?',
      hint: 'R² = 25.',
      explanation: 'R = 5, markaz (−1; 2; 1).',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'g72q3',
      prompt: 'Sferaning markazi C(3; −2; 1), K(2; −1; −3) nuqta unga tegishli. R² ni toping.',
      hint: 'R² = CK².',
      explanation: '1 + 1 + 16 = 18.',
      widget: { type: 'number_answer', props: { answer: 18 } }
    },
    {
      id: 'g72q4',
      prompt: 'K nuqtadan sferagacha eng qisqa masofa 6 cm, eng uzoq masofa 16 cm (K tashqarida). Katta doira yuzi k·π. k = ?',
      hint: 'Diametr 16 − 6.',
      explanation: 'R = 5, S = 25π.',
      widget: { type: 'number_answer', props: { answer: 25 } }
    },
    {
      id: 'g72q5',
      prompt: 'M nuqtadan sharning sirtigacha eng qisqa masofa 6, markazigacha 15. M dan oʻtkazilgan urinma MN uzunligi?',
      hint: 'R = 15 − 6.',
      explanation: 'MN = √(225 − 81) = 12.',
      widget: { type: 'number_answer', props: { answer: 12 } }
    },
    {
      id: 'g72q6',
      prompt: 'Shar katta doirasining yuzi 25π. Markazdan qanday masofada oʻtkazilgan tekislik yuzi 9π boʻlgan kesim beradi?',
      hint: 'R = 5, r = 3.',
      explanation: 'd = √(25 − 9) = 4.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'g72q7',
      prompt: 'Sferaning radiusi 60% uzaytirilsa, oʻq kesimi (katta doira) yuzi necha foiz koʻpayadi?',
      hint: '1,6² = 2,56.',
      explanation: '2,56 − 1 = 1,56 → 156%.',
      widget: { type: 'number_answer', props: { answer: 156, unit: '%' } }
    },
    {
      id: 'g72q8',
      prompt: 'Tekislik va shar holatini d va R munosabati bilan moslang.',
      hint: 'd — markazdan tekislikkacha masofa.',
      explanation: 'd > R — umumiy nuqta yoʻq; d = R — urinadi; d < R — doira boʻylab kesadi; d = 0 — katta doira.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'd > R', right: 'umumiy nuqta yoʻq' },
            { left: 'd = R', right: 'tekislik urinadi' },
            { left: 'd < R', right: 'kesim — doira' },
            { left: 'd = 0', right: 'katta doira' }
          ]
        }
      }
    },
    {
      id: 'g72q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Simmetriyani eslang.',
      explanation: 'Shar markazi — simmetriya markazi; har bir diametr tekisligi — simmetriya tekisligi; sfera va toʻgʻri chiziq 0, 1 yoki 2 umumiy nuqtaga ega.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sharning markazi uning simmetriya markazi.', value: true },
            { text: 'Sfera va toʻgʻri chiziq 3 ta umumiy nuqtaga ega boʻlishi mumkin.', value: false },
            { text: 'Sharning har qanday tekislik bilan kesimi — doira (yoki bitta nuqta).', value: true },
            { text: 'Urinma tekislik urinish nuqtasidagi radiusga parallel.', value: false }
          ]
        }
      }
    }
  ]
};
