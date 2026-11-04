import type { BoardLesson } from './types';
import type { DrawOp } from '@/lib/lab/plan';
import { pt, type V3 } from './geo3d';

const O: [number, number] = [20, 54];
const S = 7;
const P = (id: string, p: V3, label?: string, hide?: boolean) => pt(id, p, label, O, S, hide);

/** Pastki asos ABCD (tomoni 4, z = 0), yuqori asos A₁B₁C₁D₁ (tomoni 2, z = h). */
function frustum(h: number, opts: { apex?: boolean; apothem?: boolean; diagonal?: boolean } = {}): DrawOp[] {
  const ops: DrawOp[] = [
    P('A', [4, 0, 0], 'A'), P('B', [4, 4, 0], 'B'), P('C', [0, 4, 0], 'C'), P('D', [0, 0, 0], 'D'),
    P('A1', [3, 1, h], 'A₁'), P('B1', [3, 3, h], 'B₁'), P('C1', [1, 3, h], 'C₁'), P('D1', [1, 1, h], 'D₁'),
    { t: 'line', from: 'A', to: 'B' }, { t: 'line', from: 'B', to: 'C' },
    { t: 'line', from: 'A', to: 'D', dashed: true }, { t: 'line', from: 'D', to: 'C', dashed: true },
    { t: 'line', from: 'A1', to: 'B1', color: 'blue' }, { t: 'line', from: 'B1', to: 'C1', color: 'blue' },
    { t: 'line', from: 'C1', to: 'D1', color: 'blue' }, { t: 'line', from: 'D1', to: 'A1', color: 'blue' },
    { t: 'line', from: 'A', to: 'A1' }, { t: 'line', from: 'B', to: 'B1' }, { t: 'line', from: 'C', to: 'C1' },
    { t: 'line', from: 'D', to: 'D1', dashed: true }
  ];
  if (opts.apex) {
    ops.push(P('S', [2, 2, 2 * h], 'S'));
    ops.push({ t: 'line', from: 'A1', to: 'S', dashed: true }, { t: 'line', from: 'B1', to: 'S', dashed: true }, { t: 'line', from: 'C1', to: 'S', dashed: true }, { t: 'line', from: 'D1', to: 'S', dashed: true });
  }
  if (opts.apothem) ops.push(P('M', [4, 2, 0], 'M'), P('M1', [3, 2, h], 'M₁'), { t: 'line', from: 'M', to: 'M1', color: 'red', label: 'l' });
  if (opts.diagonal) ops.push({ t: 'line', from: 'A', to: 'C1', color: 'red', label: 'd' });
  return ops;
}

/** Darslik (2-qism): Geometriya, 10.2 (117–120-betlar) — piramidaning parallel kesimi, kesik piramida, uning yon sirti. */
export const MATH_65: BoardLesson = {
  n: 65,
  label: '10.2',
  part: 'geometriya',
  qism: 2,
  title: 'Kesik piramida va uning sirti',
  section: 'Geometriya, 10.2',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Piramidaning uchini asosiga parallel qilib kesib tashlasak, qanday jism qoladi? Pastda katta kvadrat, tepada kichik kvadrat, yon tomonlari esa trapetsiyalar. Stol chirogʻining abajuri, ayrim gul tuvaklari xuddi shunday. Bu jism kesik piramida deyiladi.",
      easy: "Piramidaning uchi parallel tekislik bilan kesilsa — kesik piramida qoladi.",
      draw: [
        { t: 'title', text: 'Uchini kesamiz' },
        ...frustum(2.75, { apex: true }),
        { t: 'list', x: 56, y: 22, items: ['pastda — katta asos', 'tepada — kichik asos', 'yon yoqlar — trapetsiyalar'] }
      ],
      next: 'Oʻxshash piramida'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Piramidani asosiga parallel tekislik bilan kessak, yuqorida berilgan piramidaga oʻxshash kichik piramida hosil boʻladi. Oʻxshashlik koeffitsiyenti k teng a1 boʻlinsin a, teng H1 boʻlinsin H. Kesim yuzi esa asos yuzining k kvadrat qismi: S1 boʻlinsin S teng k kvadrat.",
      easy: "Parallel kesim oʻxshash piramida ajratadi: a₁/a = H₁/H = k, S₁/S = k².",
      draw: [
        { t: 'title', text: 'Parallel kesim' },
        ...frustum(2.75, { apex: true }),
        { t: 'formula', x: 56, y: 22, text: 'a₁ / a = H₁ / H = k' },
        { t: 'formula', x: 56, y: 38, text: 'S₁ / S = k²' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Piramidaning yon qirrasi uchta teng qismga boʻlinib, boʻlinish nuqtalaridan asosga parallel tekisliklar oʻtkazildi. Asos yuzi 360 kvadrat santimetr. Kesimlar asosga uchdan bir va uchdan ikki koeffitsiyent bilan oʻxshash, yuzlari nisbati toʻqqizdan bir va toʻqqizdan toʻrt. Demak, kesimlar yuzi 40 va 160 kvadrat santimetr.",
      easy: "k = 1/3 va 2/3 → yuzlar 360 · 1/9 = 40 va 360 · 4/9 = 160.",
      draw: [
        { t: 'title', text: 'Uch teng qism' },
        { t: 'list', x: 6, y: 20, items: ['k₁ = 1/3: S₁ = 360 · 1/9 = 40', 'k₂ = 2/3: S₂ = 360 · 4/9 = 160'] },
        { t: 'formula', x: 6, y: 44, text: 'Javob: 40 cm² va 160 cm²' }
      ],
      next: 'Kesik piramida'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kesik piramidaning parallel yoqlari ABCD va A1B1C1D1 — asoslari, ular oʻxshash koʻpburchaklar. Yon yoqlari trapetsiyalar. Asoslar orasidagi masofa — balandlik. Muntazam piramidadan hosil boʻlsa — muntazam kesik piramida, uning yon yogʻi balandligi MM1 — apofema. Yon sirti: asoslar perimetrlari yigʻindisining yarmi karra apofema.",
      easy: "Muntazam kesik piramida: S yon = ½ (P₁ + P₂) · l.",
      draw: [
        { t: 'title', text: 'Muntazam kesik piramida' },
        ...frustum(3, { apothem: true }),
        { t: 'formula', x: 56, y: 22, text: 'S yon = ½ (P₁ + P₂) · l' },
        { t: 'list', x: 56, y: 38, items: ['asoslar — oʻxshash', 'yon yoqlar — trapetsiya', 'MM₁ — apofema'] }
      ],
      next: 'Hisoblaymiz'
    },
    {
      kind: 'example',
      clear: true,
      say: "Toʻrtburchakli muntazam kesik piramida asoslarining tomonlari 12 va 36, apofemasi 6. Bitta yon yogʻi — asoslari 12 va 36, balandligi 6 boʻlgan trapetsiya: yuzi 12 plyus 36 boʻlinsin 2, karra 6, yaʼni 144. Yon sirt — toʻrtta trapetsiya, 576. Formula bilan: yarim karra 48 plyus 144, karra 6 — xuddi shu 576.",
      easy: "Bitta yoq: (12 + 36)/2 · 6 = 144. Yon sirt: 4 · 144 = 576.",
      draw: [
        { t: 'title', text: 'a = 36, b = 12, l = 6' },
        { t: 'list', x: 6, y: 20, items: ['bitta yoq: (12 + 36)/2 · 6 = 144', 'S yon = 4 · 144 = 576', '½ (144 + 48) · 6 = 576'] },
        { t: 'icon', x: 84, y: 34, emoji: '📐', size: 'l' }
      ],
      next: 'Balandlikni topish'
    },
    {
      kind: 'example',
      clear: true,
      say: "Asoslarining tomonlari 14 va 10, diagonali 18 boʻlgan muntazam kesik piramidaning balandligi? Diagonal kesim — teng yonli trapetsiya, asoslari 14 ildiz 2 va 10 ildiz 2. Diagonal AC1 ning asosdagi proyeksiyasi ularning yarim yigʻindisi, yaʼni 12 ildiz 2. Balandlik ildiz ostida 18 kvadrat minus 288, yaʼni ildiz 36, teng 6.",
      easy: "Proyeksiya (14√2 + 10√2)/2 = 12√2; H = √(18² − 288) = 6.",
      draw: [
        { t: 'title', text: 'Diagonaldan balandlik' },
        ...frustum(3, { diagonal: true }),
        { t: 'list', x: 56, y: 20, items: ['proyeksiya: 12√2', 'H² = 18² − (12√2)²', 'H² = 324 − 288 = 36'] },
        { t: 'formula', x: 56, y: 48, text: 'H = 6' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Asosga parallel kesim oʻxshash piramida ajratadi: a₁/a = H₁/H = k, S₁/S = k².',
    'Kesik piramida asoslari oʻxshash koʻpburchaklar, yon yoqlari trapetsiyalar; balandlik — asoslar orasidagi masofa.',
    'Muntazam kesik piramida: S yon = ½ (P₁ + P₂) · l, l — apofema.'
  ],
  questions: [
    {
      id: 'g65q1',
      prompt: 'Toʻrtburchakli muntazam kesik piramida asoslarining tomonlari 6 cm va 8 cm, bitta yon yogʻining yuzi 84 cm². Apofemasini toping.',
      hint: '(6 + 8)/2 · l = 84.',
      explanation: '7l = 84 → l = 12 cm.',
      widget: { type: 'number_answer', props: { answer: 12, unit: 'cm' } }
    },
    {
      id: 'g65q2',
      prompt: 'Asoslarining tomonlari 24 cm va 40 cm, balandligi 16 cm boʻlgan toʻrtburchakli muntazam kesik piramidaning diagonalini toping.',
      hint: 'Proyeksiya (24√2 + 40√2)/2 = 32√2.',
      explanation: 'd = √(16² + 2048) = √2304 = 48 cm.',
      widget: { type: 'number_answer', props: { answer: 48, unit: 'cm' } }
    },
    {
      id: 'g65q3',
      prompt: 'Asoslarining tomonlari 4 cm va 8 cm, diagonali 12 cm boʻlgan toʻrtburchakli muntazam kesik piramidaning balandligini toping (0,01 gacha).',
      hint: 'Proyeksiya 6√2, uning kvadrati 72.',
      explanation: 'H = √(144 − 72) = √72 ≈ 8,49 cm.',
      widget: { type: 'number_answer', props: { answer: 8.485, tolerance: 0.01, unit: 'cm' } }
    },
    {
      id: 'g65q4',
      prompt: 'Piramida asosining yuzi 40 cm², asosga parallel kesim yuzi 10 cm², piramida balandligi 8 cm. Hosil boʻlgan kesik piramida balandligi?',
      hint: 'k² = 10/40, k = 1/2.',
      explanation: 'Kichik piramida balandligi 4, kesik piramida balandligi 8 − 4 = 4 cm.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'cm' } }
    },
    {
      id: 'g65q5',
      prompt: 'Piramida asosining yuzi 144 cm², kesik piramida yuqori asosining yuzi 16 cm², kesik piramida balandligi 4 cm. Butun piramida balandligi?',
      hint: 'k = √(16/144) = 1/3; kesik qism balandligi (2/3)H.',
      explanation: '(2/3)H = 4 → H = 6 cm.',
      widget: { type: 'number_answer', props: { answer: 6, unit: 'cm' } }
    },
    {
      id: 'g65q6',
      prompt: 'Asoslarining tomonlari 8 va 2, balandligi 4 boʻlgan toʻrtburchakli muntazam kesik piramidaning toʻla sirtini toping.',
      hint: 'Apofema √(4² + 3²) = 5.',
      explanation: 'S yon = ½(32 + 8) · 5 = 100; S toʻla = 100 + 64 + 4 = 168.',
      widget: { type: 'number_answer', props: { answer: 168 } }
    },
    {
      id: 'g65q7',
      prompt: 'Formulalardagi boʻsh joylarni toʻldiring.',
      hint: 'Yuzlar — koeffitsiyent kvadrati.',
      explanation: 'S₁/S = k²; S yon = ½(P₁ + P₂) · l.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Parallel kesimda S₁ / S = ' }, { blank: 'k²' }, { text: '. Muntazam kesik piramida: S yon = ½ (' }, { blank: 'P₁ + P₂' }, { text: ') · l.' }],
          bank: ['k²', 'k', 'k³', 'P₁ + P₂', 'P₁ · P₂']
        }
      }
    },
    {
      id: 'g65q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kesik piramida yoqlarini eslang.',
      explanation: 'Asoslar oʻxshash (lekin teng emas); yon yoqlar trapetsiya; kesim yuzi k² marta.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kesik piramidaning yon yoqlari trapetsiyalar.', value: true },
            { text: 'Kesik piramidaning asoslari teng koʻpburchaklar.', value: false },
            { text: 'Piramida balandligining oʻrtasidan oʻtgan parallel kesim yuzi asos yuzining choragiga teng.', value: true },
            { text: 'Parallel kesim yuzi asos yuzining k marta qismiga teng.', value: false }
          ]
        }
      }
    }
  ]
};
