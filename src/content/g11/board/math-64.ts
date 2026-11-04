import type { BoardLesson } from './types';
import type { DrawOp } from '@/lib/lab/plan';
import { pt, type V3 } from './geo3d';

/** Toʻrtburchakli muntazam piramida SABCD (asos tomoni 4, balandlik h); A, B — oldingi uchlar, D — orqa (koʻrinmas) uch. */
function pyramid(o: [number, number], s: number, h = 5, extra: { apothem?: boolean; height?: boolean } = {}): DrawOp[] {
  const P = (id: string, p: V3, label?: string, hide?: boolean) => pt(id, p, label, o, s, hide);
  const ops: DrawOp[] = [
    P('A', [4, 0, 0], 'A'),
    P('B', [4, 4, 0], 'B'),
    P('C', [0, 4, 0], 'C'),
    P('D', [0, 0, 0], 'D'),
    P('S', [2, 2, h], 'S'),
    { t: 'line', from: 'A', to: 'B' },
    { t: 'line', from: 'B', to: 'C' },
    { t: 'line', from: 'A', to: 'D', dashed: true },
    { t: 'line', from: 'D', to: 'C', dashed: true },
    { t: 'line', from: 'S', to: 'A' },
    { t: 'line', from: 'S', to: 'B' },
    { t: 'line', from: 'S', to: 'C' },
    { t: 'line', from: 'S', to: 'D', dashed: true }
  ];
  if (extra.height) ops.push(P('O', [2, 2, 0], 'O'), { t: 'line', from: 'S', to: 'O', dashed: true, color: 'red', label: 'H' });
  if (extra.apothem) ops.push(P('M', [4, 2, 0], 'M'), { t: 'line', from: 'S', to: 'M', color: 'blue', label: 'l' });
  return ops;
}

/** Darslik (2-qism): Geometriya, 10.1 (113–117-betlar) — piramida, muntazam piramida, apofema, yon va toʻla sirt. */
export const MATH_64: BoardLesson = {
  n: 64,
  label: '10.1',
  part: 'geometriya',
  qism: 2,
  title: 'Piramida va uning sirtini hisoblash',
  section: 'Geometriya, 10.1',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Misrdagi Xeops piramidasi 4500 yildan beri turibdi. Uning asosi tomoni 230 metr boʻlgan kvadrat, balandligi 147 metr. Toʻrtta yon yogʻi uchburchaklar boʻlib, ular bitta uchda uchrashadi. Bunday jism piramida deyiladi. Bugun piramidaning elementlari va sirtini oʻrganamiz.",
      easy: "Asosi kvadrat, yon yoqlari bir uchda uchrashadigan uchburchaklar — piramida.",
      draw: [
        { t: 'title', text: 'Xeops piramidasi' },
        ...pyramid([18, 54], 6, 5.5),
        { t: 'list', x: 56, y: 22, items: ['asos tomoni: 230 m', 'balandligi: 147 m', '4 ta yon yoq — uchburchak'] }
      ],
      next: 'Elementlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bitta yogʻi koʻpburchak, qolgan yoqlari umumiy uchga ega uchburchaklar boʻlgan koʻpyoq piramida deyiladi. Koʻpburchak — asos, uchburchaklar — yon yoqlar, ularning tomonlari — qirralar, umumiy nuqta S — piramidaning uchi. Uchdan asos tekisligiga tushirilgan perpendikular SO — balandlik. Asos uchburchak boʻlsa, piramida tetraedr deb ham ataladi.",
      easy: "Asos, yon yoqlar, qirralar, uchi S va balandlik SO.",
      draw: [
        { t: 'title', text: 'Piramida elementlari' },
        ...pyramid([18, 54], 6, 5.5, { height: true }),
        { t: 'list', x: 56, y: 20, items: ['asos: ABCD', 'yon yoq: SAB, SBC, …', 'yon qirra: SA, SB, …', 'uchi: S, balandlik: SO'] }
      ],
      next: 'Muntazam piramida'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Asosi muntazam koʻpburchak boʻlib, balandligi asos markaziga tushadigan piramida muntazam piramida deyiladi. Uning yon qirralari, yon yoqlari teng. Yon yogʻining uchdan tushirilgan balandligi SM — apofema. Muntazam piramida yon sirti — asos yarim perimetri bilan apofema koʻpaytmasi: S yon teng yarim P karra l. Toʻla sirt — yon sirt plyus asos yuzi.",
      easy: "Apofema — yon yoq balandligi. S yon = ½ P l, S toʻla = S yon + S asos.",
      draw: [
        { t: 'title', text: 'Muntazam piramida' },
        ...pyramid([18, 54], 6, 5.5, { height: true, apothem: true }),
        { t: 'formula', x: 56, y: 22, text: 'S yon = ½ · P · l' },
        { t: 'formula', x: 56, y: 38, text: 'S toʻla = S yon + S asos' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Muntazam toʻrtburchakli piramida asosining tomoni 10 santimetr, apofemasi 6 santimetr. Perimetr 40, yon sirt yarim karra 40 karra 6, yaʼni 120 kvadrat santimetr. Asos yuzi 100, toʻla sirt 220 kvadrat santimetr.",
      easy: "S yon = ½ · 40 · 6 = 120, S toʻla = 120 + 100 = 220 cm².",
      draw: [
        { t: 'title', text: 'a = 10, l = 6' },
        ...pyramid([18, 54], 6, 5.5, { apothem: true }),
        { t: 'list', x: 56, y: 20, items: ['P = 4 · 10 = 40', 'S yon = ½ · 40 · 6 = 120', 'S asos = 100'] },
        { t: 'formula', x: 56, y: 48, text: 'S toʻla = 220 cm²' }
      ],
      next: 'Balandlik qayerga tushadi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "Agar barcha yon qirralar teng boʻlsa, balandlik asosga tashqi chizilgan aylana markaziga tushadi. 1-masala: asos tomonlari 6, 8 va 10 — bu toʻgʻri burchakli uchburchak, tashqi aylana markazi gipotenuza oʻrtasida, radiusi 5. Balandlik 4 boʻlsa, yon qirra ildiz ostida 4 kvadrat plyus 5 kvadrat, yaʼni ildiz 41.",
      easy: "Yon qirralar teng → balandlik tashqi aylana markaziga tushadi: l = √(4² + 5²) = √41.",
      draw: [
        { t: 'title', text: 'Yon qirralar teng' },
        { t: 'point', id: 'a', x: 10, y: 60 },
        { t: 'point', id: 'b', x: 46, y: 60 },
        { t: 'point', id: 'c', x: 34, y: 48 },
        { t: 'point', id: 'o', x: 28, y: 60, label: 'O' },
        { t: 'point', id: 's', x: 28, y: 22, label: 'S' },
        { t: 'polygon', points: ['a', 'b', 'c'] },
        { t: 'line', from: 's', to: 'a' },
        { t: 'line', from: 's', to: 'b' },
        { t: 'line', from: 's', to: 'c' },
        { t: 'line', from: 's', to: 'o', dashed: true, color: 'red', label: '4' },
        { t: 'list', x: 54, y: 22, items: ['asos: 6, 8, 10', '6² + 8² = 10² — toʻgʻri burchakli', 'O — gipotenuza oʻrtasi, R = 5', 'l² = 4² + 5² = 41'] },
        { t: 'formula', x: 54, y: 54, text: 'l = √41' }
      ],
      next: 'Proyeksiya teoremasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar piramida asosidagi barcha ikki yoqli burchaklar φ ga teng boʻlsa, balandlik asosga ichki chizilgan aylana markaziga tushadi va asos yuzi yon sirtning proyeksiyasi boʻladi: S asos teng S yon karra kosinus φ. Masalan, φ teng 60 gradus, asos yuzi 48 boʻlsa, yon sirt 48 boʻlinsin 0,5, yaʼni 96.",
      easy: "S asos = S yon · cos φ. φ = 60°, S asos = 48 → S yon = 96.",
      draw: [
        { t: 'title', text: 'S asos = S yon · cos φ' },
        { t: 'formula', x: 6, y: 20, text: 'S asos = S yon · cos φ' },
        { t: 'list', x: 6, y: 36, items: ['barcha ikki yoqli burchaklar φ', 'balandlik — ichki aylana markaziga', 'φ = 60°: S yon = 48 : 0,5 = 96'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Piramida: asos — koʻpburchak, yon yoqlar — umumiy uchli uchburchaklar; balandlik — uchdan asos tekisligiga perpendikular.',
    'Muntazam piramida: asos muntazam, balandlik markazga tushadi; apofema — yon yoq balandligi; S yon = ½ P l.',
    'S toʻla = S yon + S asos; ikki yoqli burchaklar φ ga teng boʻlsa, S asos = S yon · cos φ.'
  ],
  questions: [
    {
      id: 'g64q1',
      prompt: 'Muntazam toʻrtburchakli piramida asosining tomoni 6 cm, apofemasi 5 cm. Yon sirtini toping.',
      hint: '½ · P · l.',
      explanation: '½ · 24 · 5 = 60 cm².',
      widget: { type: 'number_answer', props: { answer: 60, unit: 'cm²' } }
    },
    {
      id: 'g64q2',
      prompt: 'Shu piramidaning (a = 6, l = 5) toʻla sirtini toping.',
      hint: 'S yon + a².',
      explanation: '60 + 36 = 96 cm².',
      widget: { type: 'number_answer', props: { answer: 96, unit: 'cm²' } }
    },
    {
      id: 'g64q3',
      prompt: 'Uchburchakli muntazam piramidaning balandligi 1 cm, asos tomoni 6 cm. Apofemasini toping.',
      hint: 'Ichki aylana radiusi r = a/(2√3) = √3.',
      explanation: 'l = √(1 + 3) = 2 cm.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'cm' } }
    },
    {
      id: 'g64q4',
      prompt: 'Piramidaning asosi 6 × 8 cm toʻgʻri toʻrtburchak, har bir yon qirrasi 13 cm. Balandligini toping.',
      hint: 'Balandlik diagonallar kesishgan nuqtaga tushadi; yarim diagonal 5.',
      explanation: 'H = √(13² − 5²) = 12 cm.',
      widget: { type: 'number_answer', props: { answer: 12, unit: 'cm' } }
    },
    {
      id: 'g64q5',
      prompt: 'Muntazam toʻrtburchakli piramidaning balandligi 12 cm, asos tomoni 16 cm. Apofemasini toping (0,1 gacha).',
      hint: 'Markazdan tomongacha masofa 8.',
      explanation: 'l = √(12² + 8²) = √208 ≈ 14,4 cm.',
      widget: { type: 'number_answer', props: { answer: 14.42, tolerance: 0.06, unit: 'cm' } }
    },
    {
      id: 'g64q6',
      prompt: 'Piramida asosidagi barcha ikki yoqli burchaklar 60°, asos yuzi 48 cm². Yon sirtini toping.',
      hint: 'S yon = S asos / cos φ.',
      explanation: '48 / 0,5 = 96 cm².',
      widget: { type: 'number_answer', props: { answer: 96, unit: 'cm²' } }
    },
    {
      id: 'g64q7',
      prompt: 'Atamani maʼnosi bilan moslang.',
      hint: 'Apofema — yon yoqqa tegishli.',
      explanation: 'Balandlik — uchdan asosga perpendikular; apofema — yon yoq balandligi; tetraedr — uchburchakli piramida; muntazam — asos muntazam, balandlik markazga.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Balandlik', right: 'uchdan asos tekisligiga perpendikular' },
            { left: 'Apofema', right: 'muntazam piramida yon yogʻining balandligi' },
            { left: 'Tetraedr', right: 'uchburchakli piramida' },
            { left: 'Muntazam piramida', right: 'asos muntazam, balandlik markazga tushadi' }
          ]
        }
      }
    },
    {
      id: 'g64q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Muntazam piramida xossalarini eslang.',
      explanation: 'Muntazam piramidaning yon qirralari teng; balandlik asos tashqarisiga tushishi mumkin; yon qirralar teng boʻlsa, balandlik tashqi aylana markaziga tushadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Muntazam piramidaning barcha yon qirralari teng.', value: true },
            { text: 'Piramida balandligi har doim asos ichiga tushadi.', value: false },
            { text: 'Yon qirralar teng boʻlsa, balandlik asosga tashqi chizilgan aylana markaziga tushadi.', value: true },
            { text: 'Piramidaning toʻla sirti yon sirtidan kichik.', value: false }
          ]
        }
      }
    }
  ]
};
