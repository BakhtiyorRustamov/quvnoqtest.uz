import type { BoardLesson } from './types';
import type { DrawOp } from '@/lib/lab/plan';
import { cuboid, pt, type V3 } from './geo3d';

/** Kub ichidagi piramida: asosi — pastki yoq, uchi — yuqori yoqning markazi. */
function prismAndPyramid(o: [number, number], s: number): DrawOp[] {
  const P = (id: string, p: V3, label?: string, hide?: boolean) => pt(id, p, label, o, s, hide);
  return [
    ...cuboid('k', [4, 4, 4], o, s, {}, 'ink'),
    P('T', [2, 2, 4], 'S'),
    { t: 'line', from: 'T', to: 'k100', color: 'red' },
    { t: 'line', from: 'T', to: 'k110', color: 'red' },
    { t: 'line', from: 'T', to: 'k010', color: 'red' },
    { t: 'line', from: 'T', to: 'k000', color: 'red', dashed: true }
  ];
}

/** Darslik (2-qism): Geometriya, 10.3 (120–124-betlar) — piramidaning hajmi. */
export const MATH_66: BoardLesson = {
  n: 66,
  label: '10.3',
  part: 'geometriya',
  qism: 2,
  title: 'Piramidaning hajmini topish',
  section: 'Geometriya, 10.3',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Asosi va balandligi bir xil boʻlgan prizma va piramida shaklidagi ikkita idish olaylik. Piramidani qum bilan toʻldirib, prizmaga toʻkamiz. Necha marta toʻkkanda prizma toʻladi? Aynan uch marta! Demak, piramida hajmi prizma hajmining uchdan biri.",
      easy: "Bir xil asos va balandlikda piramida prizmaning uchdan biri.",
      draw: [
        { t: 'title', text: 'Qum bilan tajriba' },
        ...prismAndPyramid([20, 54], 7),
        { t: 'list', x: 58, y: 22, items: ['asos va balandlik bir xil', '3 ta piramida = 1 ta prizma'] },
        { t: 'formula', x: 58, y: 46, text: 'V pir = ⅓ V priz' }
      ],
      next: 'Teorema'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Teorema: piramidaning hajmi asos yuzi bilan balandligi koʻpaytmasining uchdan biriga teng: V teng uchdan bir S asos karra H. Isboti: uchburchakli piramidani shunday asos va balandlikdagi prizmagacha toʻldiramiz. Prizma uchta piramidaga boʻlinadi, ularning hajmlari teng — har biri prizmaning uchdan biri. Ixtiyoriy piramidani esa uchburchakli piramidalarga ajratamiz.",
      easy: "V = ⅓ · S asos · H. Prizma teng hajmli 3 ta piramidaga boʻlinadi.",
      draw: [
        { t: 'title', text: 'V = ⅓ · S asos · H' },
        { t: 'point', id: 'A', x: 10, y: 60, label: 'A' },
        { t: 'point', id: 'B', x: 40, y: 60, label: 'B' },
        { t: 'point', id: 'C', x: 24, y: 52, label: 'C' },
        { t: 'point', id: 'A1', x: 10, y: 24, label: 'O' },
        { t: 'point', id: 'B1', x: 40, y: 24, label: 'B₁' },
        { t: 'point', id: 'C1', x: 24, y: 16, label: 'C₁' },
        { t: 'line', from: 'A', to: 'B' },
        { t: 'line', from: 'A', to: 'C', dashed: true },
        { t: 'line', from: 'C', to: 'B', dashed: true },
        { t: 'line', from: 'A', to: 'A1' },
        { t: 'line', from: 'B', to: 'B1' },
        { t: 'line', from: 'C', to: 'C1', dashed: true },
        { t: 'polygon', points: ['A1', 'B1', 'C1'] },
        { t: 'line', from: 'A1', to: 'B', color: 'red' },
        { t: 'line', from: 'A1', to: 'C', color: 'red', dashed: true },
        { t: 'line', from: 'B1', to: 'C', color: 'blue', dashed: true },
        { t: 'formula', x: 54, y: 22, text: 'V = ⅓ · S asos · H' },
        { t: 'list', x: 54, y: 40, items: ['prizma = 3 ta piramida', 'hajmlari teng'] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Xeops piramidasi — muntazam toʻrtburchakli piramida, asos tomoni 230 metr, balandligi 147 metr. Asos yuzi 230 kvadrat, yaʼni 52 900 kvadrat metr. Hajmi: uchdan bir karra 52 900 karra 147, bu 2 million 592 ming 100 kub metr!",
      easy: "V = ⅓ · 230² · 147 = 2 592 100 m³.",
      draw: [
        { t: 'title', text: 'Xeops piramidasi hajmi' },
        { t: 'list', x: 6, y: 20, items: ['S asos = 230² = 52 900 m²', 'H = 147 m'] },
        { t: 'formula', x: 6, y: 42, text: 'V = ⅓ · 52 900 · 147 = 2 592 100 m³' }
      ],
      next: 'Kub ichida'
    },
    {
      kind: 'example',
      clear: true,
      say: "Kub ichidagi piramidalar. Asosi kubning bir yogʻi, uchi qarama-qarshi yoqda boʻlgan piramidaning hajmi uchdan bir a kub. Kubning bir uchidan chiqqan uchta qirraning oxirlari orqali tekislik oʻtkazsak, burchakdan uchburchakli piramida kesiladi: asosi yarim a kvadrat, balandligi a — hajmi oltidan bir a kub. Qirra 6 boʻlsa: 36, qolgan katta boʻlak 216 minus 36, yaʼni 180.",
      easy: "Kub burchagidan kesilgan piramida: V = a³/6. a = 6: 36, qolgani 180.",
      draw: [
        { t: 'title', text: 'Kub burchagi' },
        ...cuboid('c', [4, 4, 4], [20, 54], 7, {}, 'ink'),
        { t: 'polygon', points: ['c100', 'c010', 'c111'], color: 'red' },
        { t: 'list', x: 58, y: 20, items: ['asos: ½ a²,  H = a', 'V = ⅓ · ½ a² · a = a³/6', 'a = 6: V = 36'] }
      ],
      next: 'Prizma va piramida'
    },
    {
      kind: 'example',
      clear: true,
      say: "ABCA1B1C1 prizmaning hajmi 48. C1ABC piramida prizma bilan bir xil asos ABC va bir xil balandlikka ega, shuning uchun uning hajmi uchdan bir karra 48, yaʼni 16. Aksincha, parallelepipeddan ajratilgan B1ABCD piramida hajmi 12 boʻlsa, parallelepiped hajmi 3 karra 12, yaʼni 36.",
      easy: "Asos va balandlik umumiy: V pir = ⅓ V priz. 48 → 16; 12 → 36.",
      draw: [
        { t: 'title', text: 'Umumiy asos va balandlik' },
        { t: 'list', x: 6, y: 20, items: ['V priz = 48 → V(C₁ABC) = 16', 'V(B₁ABCD) = 12 → V par = 36'] },
        { t: 'formula', x: 6, y: 44, text: 'V pir = ⅓ · V priz' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Piramidaning hajmi: V = ⅓ · S asos · H.',
    'Asosi va balandligi bir xil boʻlsa, piramida hajmi prizma hajmining uchdan biri.',
    'Kub burchagidan kesilgan uchburchakli piramida hajmi a³/6.'
  ],
  questions: [
    {
      id: 'g66q1',
      prompt: 'Muntazam toʻrtburchakli piramida asosining tomoni 6, balandligi 4. Hajmini toping.',
      hint: '⅓ · 36 · 4.',
      explanation: 'V = 48.',
      widget: { type: 'number_answer', props: { answer: 48 } }
    },
    {
      id: 'g66q2',
      prompt: 'Muntazam toʻrtburchakli piramidaning balandligi 3, yon qirrasi 5. Hajmini toping.',
      hint: 'Yarim diagonal √(25 − 9) = 4, diagonal 8, asos yuzi d²/2.',
      explanation: 'S asos = 64/2 = 32, V = ⅓ · 32 · 3 = 32.',
      widget: { type: 'number_answer', props: { answer: 32 } }
    },
    {
      id: 'g66q3',
      prompt: 'Prizma hajmi 87. Asosi va balandligi shu prizmaniki bilan bir xil piramida hajmi?',
      hint: '⅓ · 87.',
      explanation: '29.',
      widget: { type: 'number_answer', props: { answer: 29 } }
    },
    {
      id: 'g66q4',
      prompt: 'Kub yoqlarining markazlari oktaedr uchlari. Oktaedr hajmi 12. Kub hajmini toping.',
      hint: 'Oktaedr — ikkita piramida; uning hajmi a³/6.',
      explanation: 'a³/6 = 12 → a³ = 72.',
      widget: { type: 'number_answer', props: { answer: 72 } }
    },
    {
      id: 'g66q5',
      prompt: 'Qirrasi 6 ga teng kubdan bir uchiga tutash uchta uchidan oʻtgan tekislik burchakni kesib oldi. Katta boʻlakning hajmi?',
      hint: 'Kichik boʻlak a³/6.',
      explanation: '216 − 36 = 180.',
      widget: { type: 'number_answer', props: { answer: 180 } }
    },
    {
      id: 'g66q6',
      prompt: 'Xeops piramidasining hajmi necha million kub metr (0,01 gacha)?',
      hint: '⅓ · 230² · 147.',
      explanation: '2 592 100 m³ ≈ 2,59 mln m³.',
      widget: { type: 'number_answer', props: { answer: 2.59, tolerance: 0.01, unit: 'mln m³' } }
    },
    {
      id: 'g66q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Piramida va prizmani solishtiring.',
      explanation: 'V pir = ⅓ S H; prizma — S H.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Piramida hajmi V = ' }, { blank: '⅓' }, { text: ' · S asos · H. Shunday asos va balandlikdagi prizma hajmi piramidanikidan ' }, { blank: '3' }, { text: ' marta katta.' }],
          bank: ['⅓', '½', '3', '2']
        }
      }
    },
    {
      id: 'g66q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'V = ⅓ S H.',
      explanation: 'Balandlik 2 marta oshsa, hajm 2 marta oshadi; asos tomoni 2 marta oshsa, 4 marta; asos va balandligi teng piramidalar hajmi teng.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Asos yuzlari va balandliklari teng piramidalarning hajmlari teng.', value: true },
            { text: 'Piramida balandligi 2 marta oshsa, hajmi 4 marta oshadi.', value: false },
            { text: 'Muntazam toʻrtburchakli piramida asos tomoni 2 marta oshsa, hajmi 4 marta oshadi.', value: true },
            { text: 'Piramida hajmi asos yuzi bilan balandlik koʻpaytmasiga teng.', value: false }
          ]
        }
      }
    }
  ]
};
