import type { BoardLesson } from './types';
import { axes3, pt } from './geo3d';

const O: [number, number] = [26, 52];

/** Darslik: Geometriya, 1-mavzu (115–117-betlar) — ikki nuqta orasidagi masofa, sfera tenglamasi, kesma oʻrtasi. */
export const MATH_28: BoardLesson = {
  n: 28,
  label: "1.2–1.3",
  part: 'geometriya',
  title: "Nuqtalar orasidagi masofa, sfera va kesma oʻrtasi",
  section: 'Geometriya, 1',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Xonaning uzunligi 6 metr, eni 3 metr, balandligi 2 metr. Pastki burchakdan qarama-qarshi tepa burchakkacha arqon tortsak, uning uzunligi qancha? Bu fazodagi ikki nuqta orasidagi masofa. Javob: aniq 7 metr. Qanday topdik? Bugun shuni oʻrganamiz.",
      easy: "Xonaning bir burchagidan qarama-qarshi tepa burchagigacha masofa — 7 metr. Formulasini oʻrganamiz.",
      draw: [
        { t: 'title', text: 'Arqon uzunligi' },
        pt('a', [0, 0, 0], 'A', O, 6),
        pt('b', [3, 0, 0], undefined, O, 6),
        pt('c', [3, 6, 0], undefined, O, 6),
        pt('d', [0, 6, 0], undefined, O, 6),
        pt('e', [0, 0, 2], undefined, O, 6),
        pt('f', [3, 0, 2], undefined, O, 6),
        pt('g', [3, 6, 2], 'B', O, 6),
        pt('h', [0, 6, 2], undefined, O, 6),
        { t: 'polygon', points: ['b', 'c', 'g', 'f'], color: 'ink' },
        { t: 'polygon', points: ['e', 'f', 'g', 'h'], color: 'ink' },
        { t: 'line', from: 'a', to: 'b', dashed: true },
        { t: 'line', from: 'a', to: 'd', dashed: true },
        { t: 'line', from: 'a', to: 'e', dashed: true },
        { t: 'line', from: 'd', to: 'c' },
        { t: 'line', from: 'd', to: 'h' },
        { t: 'line', from: 'e', to: 'h' },
        { t: 'line', from: 'a', to: 'g', color: 'red', label: '?' },
        { t: 'list', x: 66, y: 20, items: ['uzunlik 6 m', 'eni 3 m', 'balandlik 2 m'] }
      ],
      next: 'Formulasi qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "A(x1; y1; z1) va B(x2; y2; z2) nuqtalar orasidagi masofa Pifagor teoremasini ikki marta qoʻllashdan kelib chiqadi: ildiz ostida x lar ayirmasining kvadrati plyus y lar ayirmasining kvadrati plyus z lar ayirmasining kvadrati. Bu toʻgʻri burchakli parallelepiped diagonalining formulasi bilan bir xil: ildiz a kvadrat plyus b kvadrat plyus c kvadrat. Xona uchun: ildiz 36 plyus 9 plyus 4, yaʼni ildiz 49 teng 7.",
      easy: "Masofa: koordinatalar ayirmalarining kvadratlarini qoʻshib, ildiz olamiz.",
      draw: [
        { t: 'title', text: 'Ikki nuqta orasidagi masofa' },
        { t: 'formula', x: 6, y: 20, text: 'AB = √((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²)' },
        { t: 'text', x: 6, y: 38, text: 'Parallelepiped diagonali: d = √(a² + b² + c²)', size: 's', color: 'blue' },
        { t: 'box', id: 'r', x: 6, y: 48, w: 56, h: 12, text: 'd = √(36 + 9 + 4) = √49 = 7', color: 'green' }
      ],
      next: 'Uchburchak misoli'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 2-masala: A(9; 3; minus 5), B(2; 10; minus 5), C(2; 3; 2) uchburchakning perimetrini toping. AB teng ildiz 49 plyus 49 teng 7 ildiz 2. AC va BC ham xuddi shunday 7 ildiz 2 chiqadi. Demak uchburchak teng tomonli, perimetri 21 ildiz 2.",
      easy: "Uchala tomon ham 7 ildiz 2 ga teng. Perimetr 21 ildiz 2.",
      draw: [
        { t: 'title', text: '2-masala' },
        { t: 'text', x: 6, y: 20, text: 'A(9; 3; −5),  B(2; 10; −5),  C(2; 3; 2)', size: 's' },
        { t: 'list', x: 6, y: 30, items: ['AB = √(49 + 49 + 0) = 7√2', 'AC = √(49 + 0 + 49) = 7√2', 'BC = √(0 + 49 + 49) = 7√2'] },
        { t: 'box', id: 'r', x: 6, y: 54, w: 48, h: 11, text: 'P = 21√2', color: 'green' },
        { t: 'text', x: 60, y: 60, text: 'teng tomonli!', color: 'purple' }
      ],
      next: 'Sfera-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Markazi A(a; b; c) nuqtada, radiusi R boʻlgan sfera — A dan R masofadagi barcha nuqtalar. Masofa formulasidan uning tenglamasi chiqadi: x minus a kvadrat plyus y minus b kvadrat plyus z minus c kvadrat teng R kvadrat. Masalan, markazi (1; 2; 4), radiusi 3 boʻlgan sfera: x minus 1 kvadrat plyus y minus 2 kvadrat plyus z minus 4 kvadrat teng 9. Shar uchun teng belgisi oʻrniga kichik yoki teng qoʻyiladi.",
      easy: "Sfera — markazdan R masofadagi nuqtalar. Tenglama: koordinatalar ayirmalari kvadratlari yigʻindisi R kvadratga teng.",
      draw: [
        { t: 'title', text: 'Sfera tenglamasi' },
        { t: 'point', id: 'c', x: 20, y: 48, label: 'A' },
        { t: 'circle', id: 's', center: 'c', r: 14, color: 'orange' },
        { t: 'point', id: 'm', x: 32, y: 41, label: 'M' },
        { t: 'line', from: 'c', to: 'm', label: 'R', color: 'red' },
        { t: 'formula', x: 6, y: 18, text: '(x − a)² + (y − b)² + (z − c)² = R²' },
        { t: 'text', x: 44, y: 40, text: 'markaz (1; 2; 4), R = 3:', size: 's' },
        { t: 'text', x: 44, y: 48, text: '(x − 1)² + (y − 2)² + (z − 4)² = 9', size: 's', color: 'green' },
        { t: 'text', x: 44, y: 60, text: 'shar: ≤ R²', size: 's', color: 'purple' }
      ],
      next: 'Kesmaning oʻrtasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "AB kesmaning oʻrtasi C(x; y; z) ning har bir koordinatasi uchlarining mos koordinatalari yigʻindisining yarmiga teng. Tekislikdagi formula bilan bir xil, faqat z ham qoʻshiladi. Kesmani lambda nisbatda boʻluvchi nuqta uchun ham formula bor: x teng x1 plyus lambda x2, boʻlinsin 1 plyus lambda.",
      easy: "Oʻrtaning har bir koordinatasi — uchlar koordinatalarining oʻrta arifmetigi.",
      draw: [
        { t: 'title', text: 'Kesma oʻrtasi' },
        { t: 'formula', x: 6, y: 20, text: 'x = (x₁ + x₂)/2,  y = (y₁ + y₂)/2,  z = (z₁ + z₂)/2' },
        { t: 'text', x: 6, y: 38, text: 'AP : PB = λ  →  x = (x₁ + λx₂)/(1 + λ)', size: 's', color: 'blue' },
        { t: 'point', id: 'a', x: 12, y: 56, label: 'A' },
        { t: 'point', id: 'b', x: 82, y: 56, label: 'B' },
        { t: 'point', id: 'c', x: 47, y: 56, label: 'C' },
        { t: 'line', from: 'a', to: 'b' }
      ],
      next: 'Parallelogrammmi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "3-masala: M(3; 6; 4), N(0; 2; 4), K(3; 2; 8), L(6; 6; 8) toʻrtburchak parallelogramm ekanini isbotlang. Diagonallar oʻrtalarini topamiz. MK ning oʻrtasi: (3; 4; 6). NL ning oʻrtasi ham (3; 4; 6). Diagonallar kesishish nuqtasida teng ikkiga boʻlinadi — demak, MNKL parallelogramm.",
      easy: "Ikkala diagonalning oʻrtasi bir xil nuqta — (3; 4; 6). Demak, parallelogramm.",
      draw: [
        { t: 'title', text: '3-masala' },
        { t: 'text', x: 6, y: 20, text: 'M(3; 6; 4), N(0; 2; 4), K(3; 2; 8), L(6; 6; 8)', size: 's' },
        { t: 'list', x: 6, y: 32, items: ['MK oʻrtasi: (3; 4; 6)', 'NL oʻrtasi: (3; 4; 6)'] },
        { t: 'box', id: 'r', x: 6, y: 50, w: 72, h: 12, text: 'Diagonallar teng ikkiga boʻlinadi → parallelogramm', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'AB = √((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²).',
    'Markazi (a; b; c), radiusi R sfera: (x − a)² + (y − b)² + (z − c)² = R².',
    'Kesma oʻrtasining koordinatalari — uchlari koordinatalarining yarim yigʻindisi.'
  ],
  questions: [
    {
      id: 'm28q1',
      prompt: 'A(1; 2; 3) va B(3; 5; 9) nuqtalar orasidagi masofani toping.',
      hint: '2² + 3² + 6².',
      explanation: '√(4 + 9 + 36) = √49 = 7.',
      widget: { type: 'number_answer', props: { answer: 7 } }
    },
    {
      id: 'm28q2',
      prompt: 'Koordinatalar boshidan (1; 4; 8) nuqtagacha masofa nechaga teng?',
      hint: '√(1 + 16 + 64).',
      explanation: '√81 = 9.',
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'm28q3',
      prompt: 'A(2; −4; 6) va B(8; 2; −2) kesma oʻrtasining ordinatasini (y) toping.',
      hint: '(−4 + 2)/2.',
      explanation: 'Oʻrta: (5; −1; 2). y = −1.',
      widget: { type: 'number_answer', props: { answer: -1 } }
    },
    {
      id: 'm28q4',
      prompt: 'Har bir sfera tenglamasiga uning markazi va radiusini moslang.',
      hint: 'Qavs ichidagi ishora markaz koordinatasiga teskari.',
      explanation: 'Markaz — qavslardagi sonlar teskari ishora bilan; R — oʻng tomonning ildizi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '(x − 1)² + (y − 2)² + (z − 4)² = 9', right: 'markaz (1; 2; 4), R = 3' },
            { left: 'x² + y² + z² = 25', right: 'markaz O, R = 5' },
            { left: '(x + 2)² + y² + (z − 1)² = 4', right: 'markaz (−2; 0; 1), R = 2' },
            { left: '(x − 3)² + (y + 1)² + z² = 16', right: 'markaz (3; −1; 0), R = 4' }
          ]
        }
      }
    },
    {
      id: 'm28q5',
      prompt: 'Oʻlchamlari 2, 3 va 6 boʻlgan toʻgʻri burchakli parallelepiped diagonalini toping.',
      hint: '√(a² + b² + c²).',
      explanation: '√(4 + 9 + 36) = 7.',
      widget: { type: 'number_answer', props: { answer: 7 } }
    },
    {
      id: 'm28q6',
      prompt: 'Nuqtalarni koordinatalar boshidan uzoqligiga qarab (yaqinidan uzogʻiga) tartiblang.',
      hint: 'Masofalar: 1, 3, 7, 9.',
      explanation: '(1; 0; 0) → 1, (1; 2; 2) → 3, (2; 3; 6) → 7, (1; 4; 8) → 9.',
      widget: { type: 'order_line', props: { items: [{ label: '(1; 0; 0)' }, { label: '(1; 2; 2)' }, { label: '(2; 3; 6)' }, { label: '(1; 4; 8)' }] } }
    },
    {
      id: 'm28q7',
      prompt: 'A(1; 2; 3) va B(2; 3; 1) uchun AB² ni toping.',
      hint: '1² + 1² + (−2)².',
      explanation: '1 + 1 + 4 = 6.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'm28q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Sfera va shar farqini eslang.',
      explanation: 'Shar tenglamasida ≤ boʻladi. x² + y² + z² = 25 sferaning radiusi 5. Diagonallar teng ikkiga boʻlinsa — parallelogramm.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'x² + y² + z² = 25 sferaning radiusi 25.', value: false },
            { text: 'Shar tenglamasida «≤» belgisi qatnashadi.', value: true },
            { text: 'Diagonallari kesishish nuqtasida teng ikkiga boʻlinadigan toʻrtburchak — parallelogramm.', value: true },
            { text: 'Kesma oʻrtasining z koordinatasi (z₁ − z₂)/2 ga teng.', value: false }
          ]
        }
      }
    }
  ]
};
