import type { BoardLesson } from './types';
import { axes3, pt } from './geo3d';

/** Darslik: Geometriya, 2-mavzu (122–125-betlar) — fazoda vektorlar va ular ustida amallar. */
export const MATH_29: BoardLesson = {
  n: 29,
  label: "2.1–2.3",
  part: 'geometriya',
  title: "Fazodagi vektorlar va ular ustida amallar",
  section: 'Geometriya, 2',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Dron uchun buyruq: 3 metr sharqqa, 4 metr shimolga va 12 metr yuqoriga. Bu uchta son yoʻnalish va masofani birga bildiradi — bu vektor (3; 4; 12). Dron boshlangʻich joyidan qancha uzoqlashadi? Ildiz 9 plyus 16 plyus 144, yaʼni ildiz 169 teng 13 metr.",
      easy: "Vektor — yoʻnalish va uzunlik. Dron vektori (3; 4; 12), uzunligi 13 metr.",
      draw: [
        { t: 'title', text: 'Dron buyrugʻi' },
        { t: 'icon', x: 12, y: 30, emoji: '🚁', size: 'l' },
        { t: 'list', x: 30, y: 22, items: ['3 m sharqqa', '4 m shimolga', '12 m yuqoriga'] },
        { t: 'box', id: 'v', x: 30, y: 46, w: 36, h: 12, text: 'a(3; 4; 12)', color: 'blue' },
        { t: 'text', x: 70, y: 54, text: '|a| = 13', color: 'green' }
      ],
      next: 'Vektor nima?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Fazoda vektor — yoʻnaltirilgan kesma. Boshi A(x1; y1; z1), oxiri B(x2; y2; z2) boʻlsa, AB vektorning koordinatalari oxiri minus boshi: x2 minus x1, y2 minus y1, z2 minus z1. Vektorning uzunligi — ildiz a1 kvadrat plyus a2 kvadrat plyus a3 kvadrat. Koordinatalari nol boʻlgan vektor — nol vektor.",
      easy: "Vektor koordinatalari: oxiri minus boshi. Uzunligi: koordinatalar kvadratlari yigʻindisining ildizi.",
      draw: [
        { t: 'title', text: 'Vektor koordinatalari' },
        ...axes3([3.5, 4, 4], [18, 58], 6),
        pt('A', [1, 2, 1], 'A', [18, 58], 6),
        pt('B', [0, 3.5, 3.5], 'B', [18, 58], 6),
        { t: 'line', from: 'A', to: 'B', arrow: true, color: 'red' },
        { t: 'text', x: 50, y: 20, text: 'AB koordinatalari:', size: 's' },
        { t: 'text', x: 50, y: 28, text: '(x₂ − x₁; y₂ − y₁; z₂ − z₁)', size: 's', color: 'blue' },
        { t: 'formula', x: 46, y: 38, text: '|a| = √(a₁² + a₂² + a₃²)' },
        { t: 'text', x: 50, y: 58, text: '0(0; 0; 0) — nol vektor', size: 's', color: 'purple' }
      ],
      next: 'Teng vektorlar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 1-masala: A(2; 7; minus 3), B(1; 0; 3), C(minus 3; minus 4; 5), D(minus 2; 3; minus 1). Qaysi vektorlar teng? AB teng 1 minus 2, 0 minus 7, 3 minus minus 3, yaʼni (minus 1; minus 7; 6). DC ham (minus 1; minus 7; 6). Teng vektorlarning koordinatalari teng, demak AB teng DC.",
      easy: "AB va DC ning koordinatalari bir xil: (−1; −7; 6). Demak, ular teng.",
      draw: [
        { t: 'title', text: '1-masala' },
        { t: 'text', x: 6, y: 20, text: 'A(2; 7; −3), B(1; 0; 3), C(−3; −4; 5), D(−2; 3; −1)', size: 's' },
        { t: 'list', x: 6, y: 32, items: ['AB = (1 − 2; 0 − 7; 3 + 3) = (−1; −7; 6)', 'DC = (−3 + 2; −4 − 3; 5 + 1) = (−1; −7; 6)'] },
        { t: 'box', id: 'r', x: 6, y: 52, w: 36, h: 11, text: 'AB = DC', color: 'green' }
      ],
      next: 'Qoʻshish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Vektorlarni qoʻshishda mos koordinatalar qoʻshiladi. Uchburchak qoidasi: AB plyus BC teng AC. Parallelogramm qoidasi: AB plyus AD teng AC. Fazoda yana parallelepiped qoidasi bor: bir tekislikda yotmagan uchta vektor yigʻindisi — parallelepipedning diagonali. Qoʻshish oʻrin almashtirish va guruhlash xossalariga ega.",
      easy: "Koordinatalarni qoʻshamiz. Geometrik: birining oxiriga ikkinchisini qoʻyamiz.",
      draw: [
        { t: 'title', text: 'Vektorlarni qoʻshish' },
        { t: 'formula', x: 6, y: 20, text: 'a + b = (a₁ + b₁; a₂ + b₂; a₃ + b₃)' },
        { t: 'point', id: 'A', x: 10, y: 60, label: 'A' },
        { t: 'point', id: 'B', x: 34, y: 42, label: 'B' },
        { t: 'point', id: 'C', x: 58, y: 56, label: 'C' },
        { t: 'line', from: 'A', to: 'B', arrow: true, color: 'blue' },
        { t: 'line', from: 'B', to: 'C', arrow: true, color: 'green' },
        { t: 'line', from: 'A', to: 'C', arrow: true, color: 'red' },
        { t: 'list', x: 64, y: 38, items: ['AB + BC = AC', 'a + b = b + a'] }
      ],
      next: 'Songa koʻpaytirish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Vektorni lambda songa koʻpaytirsak, har bir koordinata lambdaga koʻpayadi. Lambda musbat boʻlsa yoʻnalish saqlanadi, manfiy boʻlsa teskari boʻladi, uzunlik modul lambda marta oʻzgaradi. Bir toʻgʻri chiziqda yoki parallel chiziqlarda yotuvchi vektorlar kollinear deyiladi. Kollinear vektorlarning koordinatalari proporsional: a1 boʻlinsin b1 teng a2 boʻlinsin b2 teng a3 boʻlinsin b3.",
      easy: "Songa koʻpaytirish — har bir koordinatani koʻpaytirish. Kollinear vektorlarning koordinatalari proporsional.",
      draw: [
        { t: 'title', text: 'Songa koʻpaytirish' },
        { t: 'formula', x: 6, y: 20, text: 'λa = (λa₁; λa₂; λa₃)' },
        { t: 'text', x: 6, y: 36, text: 'kollinear:  a₁/b₁ = a₂/b₂ = a₃/b₃', color: 'blue' },
        { t: 'point', id: 'p', x: 10, y: 54 },
        { t: 'point', id: 'q', x: 30, y: 54, hide: true },
        { t: 'point', id: 'r', x: 44, y: 54 },
        { t: 'point', id: 's', x: 84, y: 54, hide: true },
        { t: 'line', from: 'p', to: 'q', arrow: true, color: 'green', label: 'a' },
        { t: 'line', from: 'r', to: 's', arrow: true, color: 'red', label: '2a' },
        { t: 'text', x: 6, y: 64, text: 'masalan: (1; 2; 3) va (2; 4; 6)', size: 's', color: 'purple' }
      ],
      next: 'Ortlar'
    },
    {
      kind: 'example',
      clear: true,
      say: "e1(1; 0; 0), e2(0; 1; 0), e3(0; 0; 1) — ortlar, yaʼni oʻqlar boʻyicha birlik vektorlar. Har qanday vektorni ular orqali yozish mumkin: a teng a1 e1 plyus a2 e2 plyus a3 e3. Darslikdagi 6-masala: a teng 2i plyus 3j minus 4k, b teng minus i minus j plyus 2k. Yigʻindi c teng i plyus 2j minus 2k, yaʼni (1; 2; minus 2), uzunligi ildiz 1 plyus 4 plyus 4, yaʼni 3.",
      easy: "Ortlar — oʻqlar boʻyicha birlik vektorlar. a + b = (1; 2; −2), uzunligi 3.",
      draw: [
        { t: 'title', text: 'Ortlar boʻyicha yoyish' },
        { t: 'formula', x: 6, y: 20, text: 'a = a₁e₁ + a₂e₂ + a₃e₃' },
        { t: 'list', x: 6, y: 34, items: ['a = 2i + 3j − 4k,  b = −i − j + 2k', 'c = a + b = i + 2j − 2k = (1; 2; −2)'] },
        { t: 'box', id: 'r', x: 6, y: 52, w: 46, h: 11, text: '|c| = √(1 + 4 + 4) = 3', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'AB vektor koordinatalari: oxiri koordinatalaridan boshi koordinatalarini ayiramiz; |a| = √(a₁² + a₂² + a₃²).',
    'Qoʻshish va songa koʻpaytirish koordinatalar boʻyicha bajariladi: a + b = (a₁ + b₁; …), λa = (λa₁; …).',
    'Kollinear vektorlarning koordinatalari proporsional; har qanday vektor ortlar boʻyicha yoyiladi.'
  ],
  questions: [
    {
      id: 'm29q1',
      prompt: 'a(2; −1; 2) vektorning uzunligini toping.',
      hint: '√(4 + 1 + 4).',
      explanation: '√9 = 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'm29q2',
      prompt: 'Dron vektori (3; 4; 12). Dron boshlangʻich joyidan necha metr uzoqlashdi?',
      hint: '√(9 + 16 + 144).',
      explanation: '√169 = 13 m.',
      widget: { type: 'number_answer', props: { answer: 13, unit: 'm' } }
    },
    {
      id: 'm29q3',
      prompt: 'A(1; 2; 3) va B(4; 0; 5) boʻlsa, AB vektor koordinatalarini toʻldiring.',
      hint: 'Oxiridan boshini ayiring.',
      explanation: 'AB = (4 − 1; 0 − 2; 5 − 3) = (3; −2; 2).',
      widget: {
        type: 'fill_blanks',
        props: { segments: [{ text: 'AB = (' }, { blank: '3' }, { text: '; ' }, { blank: '−2' }, { text: '; ' }, { blank: '2' }, { text: ')' }], bank: ['3', '−2', '2', '5', '−3'] }
      }
    },
    {
      id: 'm29q4',
      prompt: 'a(2; 1; 3) va b(−1; x; 2) vektorlarning uzunliklari teng. x ning musbat qiymatini toping.',
      hint: '4 + 1 + 9 = 1 + x² + 4.',
      explanation: '14 = 5 + x² → x² = 9 → x = 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'm29q5',
      prompt: 'Qaysi vektorlar a(1; 2; 3) bilan kollinear? Hammasini belgilab, Tekshirish ni bosing.',
      hint: 'Koordinatalar bir xil songa koʻpaytirilganmi?',
      explanation: '(2; 4; 6) = 2a, (−1; −2; −3) = −a, (3; 6; 9) = 3a. Qolganlari proporsional emas.',
      widget: {
        type: 'pick_many',
        props: { options: [{ label: '(2; 4; 6)', correct: true }, { label: '(−1; −2; −3)', correct: true }, { label: '(3; 6; 9)', correct: true }, { label: '(1; 2; 4)' }, { label: '(2; 1; 3)' }] }
      }
    },
    {
      id: 'm29q6',
      prompt: 'a(1; 3; −2) va b(0; 1; 4) boʻlsa, 2a − b vektorning ordinatasini (y) toping.',
      hint: '2 · 3 − 1.',
      explanation: '2a − b = (2; 5; −8), y = 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'm29q7',
      prompt: 'Qaysi tenglik notoʻgʻri? Ortiqchasini bosing.',
      hint: 'Uchburchak qoidasini eslang.',
      explanation: 'AB + BC = AC toʻgʻri; AB + AC = BC esa notoʻgʻri.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'AB + BC = AC' }, { text: 'a + b = b + a' }, { text: '(a + b) + c = a + (b + c)' }, { text: 'AB + AC = BC', odd: true }] } }
    },
    {
      id: 'm29q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Teng vektorlarning koordinatalari teng.',
      explanation: 'Teng vektorlar koordinatalari teng; λ < 0 da yoʻnalish teskari; nol vektorning yoʻnalishi aniqlanmaydi; −2a ning uzunligi 2|a|.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Teng vektorlarning mos koordinatalari teng.', value: true },
            { text: 'λ < 0 boʻlsa, λa vektor a bilan bir xil yoʻnalgan.', value: false },
            { text: '−2a vektorning uzunligi 2|a| ga teng.', value: true },
            { text: 'Nol vektorning uzunligi 1 ga teng.', value: false }
          ]
        }
      }
    }
  ]
};
