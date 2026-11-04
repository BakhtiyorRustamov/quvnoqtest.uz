import type { BoardLesson } from './types';

/** Darslik: 7–9-mavzu (25–26-betlar) — koʻpaytma va boʻlinmaning hosilasi, (tg x)′. */
export const MATH_8: BoardLesson = {
  n: 8,
  label: "9",
  part: 'algebra',
  title: "Koʻpaytma va boʻlinmadan hosila olish",
  section: '7–9',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Fermerning dalasi toʻgʻri toʻrtburchak shaklida: eni a, boʻyi b, yuzi a karra b. Har yili ikkala tomon ham biroz uzayadi. Yuza qanchaga ortadi? Oʻngda yangi chiziq qoʻshiladi: delta a karra b. Pastda: a karra delta b. Burchakda esa juda kichik boʻlakcha qoladi. Demak, yuza ikkala tomonning oʻzgarishidan oʻsadi. Koʻpaytmaning hosilasi ham xuddi shunday tuzilgan.",
      easy: "Dala ikki tomonga kengaydi. Qoʻshilgan yer — oʻngdagi va pastdagi ikki chiziq, burchakdagi boʻlakcha esa juda kichik. Ikkala oʻzgarishni ham hisobga olish kerak.",
      draw: [
        { t: 'title', text: 'Dala kengaymoqda' },
        { t: 'point', id: 'P1', x: 10, y: 18 },
        { t: 'point', id: 'P2', x: 50, y: 18 },
        { t: 'point', id: 'P3', x: 50, y: 48 },
        { t: 'point', id: 'P4', x: 10, y: 48 },
        { t: 'polygon', points: ['P1', 'P2', 'P3', 'P4'], color: 'blue', fill: true },
        { t: 'point', id: 'Q2', x: 58, y: 18 },
        { t: 'point', id: 'Q3', x: 58, y: 48 },
        { t: 'polygon', points: ['P2', 'Q2', 'Q3', 'P3'], color: 'orange', fill: true },
        { t: 'point', id: 'R1', x: 10, y: 54 },
        { t: 'point', id: 'R2', x: 50, y: 54 },
        { t: 'polygon', points: ['P4', 'P3', 'R2', 'R1'], color: 'green', fill: true },
        { t: 'point', id: 'R3', x: 58, y: 54 },
        { t: 'polygon', points: ['P3', 'Q3', 'R3', 'R2'], color: 'red', fill: true },
        { t: 'text', x: 23, y: 35, text: 'a · b' },
        { t: 'text', x: 61, y: 35, text: 'Δa · b', size: 's', color: 'orange' },
        { t: 'text', x: 20, y: 62, text: 'a · Δb', size: 's', color: 'green' },
        { t: 'text', x: 61, y: 60, text: 'Δa · Δb (juda kichik)', size: 's', color: 'red' }
      ],
      next: 'Formulasi qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Koʻpaytmaning hosilasi: f shtrix karra g plyus f karra g shtrix. Har safar bitta koʻpaytuvchi oʻzgaradi, ikkinchisi joyida qoladi, keyin ikkalasini qoʻshamiz. Diqqat qiling: koʻpaytmaning hosilasi hosilalar koʻpaytmasiga teng emas! Tekshiramiz: x karra x — bu x kvadrat, uning hosilasi 2x. Formula boʻyicha 1 karra x plyus x karra 1 — 2x. Toʻgʻri! Hosilalarni koʻpaytirsak esa 1 chiqardi — notoʻgʻri.",
      easy: "Ikki marta hisoblaymiz: avval birinchisining hosilasi karra ikkinchisi, keyin birinchisi karra ikkinchisining hosilasi. Ikkalasini qoʻshamiz.",
      draw: [
        { t: 'title', text: 'Koʻpaytmaning hosilasi' },
        { t: 'formula', x: 8, y: 26, text: '(f · g)′ = f′ · g + f · g′' },
        { t: 'box', id: 'w', x: 6, y: 35, w: 52, h: 11, text: 'Diqqat: (f · g)′ ≠ f′ · g′', color: 'red' },
        { t: 'text', x: 6, y: 56, text: 'Tekshiruv: (x · x)′ = (x²)′ = 2x', size: 's' },
        { t: 'text', x: 6, y: 63, text: '1 · x + x · 1 = 2x ✓,  lekin 1 · 1 = 1 ✗', size: 's', color: 'purple' }
      ],
      next: 'Misolda-chi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "Birga yechamiz: f(x) teng 2x plyus 4 karra 3x plyus 1. Birinchi qavsning hosilasi 2, ikkinchisiniki 3. Formula boʻyicha: 2 karra 3x plyus 1, plyus 2x plyus 4 karra 3. Qavslarni ochamiz: 6x plyus 2 plyus 6x plyus 12, yaʼni 12x plyus 14. Tekshirish uchun qavslarni oldindan ochsak ham, xuddi shu javob chiqadi.",
      easy: "Ikki qavs — ikki koʻpaytuvchi. Navbat bilan bittasining hosilasini olamiz: 2 karra ikkinchi qavs, plyus birinchi qavs karra 3. Natija 12x plyus 14.",
      draw: [
        { t: 'title', text: 'Misol' },
        { t: 'formula', x: 8, y: 22, text: 'f(x) = (2x + 4)(3x + 1)' },
        { t: 'list', x: 6, y: 34, items: ['f′ = 2 · (3x + 1) + (2x + 4) · 3', '= 6x + 2 + 6x + 12 = 12x + 14'] },
        { t: 'text', x: 6, y: 56, text: 'Tekshiramiz: 6x² + 14x + 4 → 12x + 14 ✓', size: 's', color: 'green' }
      ],
      next: 'Boʻlinma-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Boʻlinmaning hosilasi: f shtrix karra g minus f karra g shtrix, hammasi g kvadratga boʻlinadi. Albatta, g nolga teng boʻlmasligi kerak. Bu yerda tartib muhim: suratda avval f shtrix karra g, keyin minus f karra g shtrix. Ularning oʻrnini almashtirsak, ishora teskarisiga oʻzgaradi.",
      easy: "Suratga ikki koʻpaytma yoziladi va ular ayiriladi, maxrajga esa pastki funksiyaning kvadrati. Avval yuqoridagining hosilasi bilan boshlang.",
      draw: [
        { t: 'title', text: 'Boʻlinmaning hosilasi' },
        { t: 'formula', x: 8, y: 26, text: '(f / g)′ = (f′ · g − f · g′) / g²' },
        { t: 'text', x: 8, y: 36, text: 'g(x) ≠ 0', size: 's' },
        { t: 'box', id: 'o', x: 6, y: 44, w: 88, h: 11, text: 'Tartib muhim: avval f′ · g, keyin minus f · g′', color: 'orange' }
      ],
      next: 'Misol!'
    },
    {
      kind: 'example',
      clear: true,
      say: "Misol: f(x) teng x plyus 1, boʻlingan x minus 2 ga. Surat x plyus 1, uning hosilasi 1. Maxraj x minus 2, uning hosilasi ham 1. Formulaga qoʻyamiz: 1 karra x minus 2, minus x plyus 1 karra 1, hammasi x minus 2 ning kvadratiga boʻlinadi. Suratda x lar qisqarib, minus 3 qoladi. Javob: minus 3 boʻlingan x minus 2 ning kvadratiga.",
      easy: "Surat va maxrajning hosilasi 1 ga teng. Suratda x minus 2 dan x plyus 1 ni ayiramiz — minus 3 chiqadi. Maxrajda x minus 2 ning kvadrati qoladi.",
      draw: [
        { t: 'title', text: 'Misol' },
        { t: 'formula', x: 8, y: 22, text: 'f(x) = (x + 1) / (x − 2)' },
        { t: 'list', x: 6, y: 33, items: ['f = x + 1,  f′ = 1;    g = x − 2,  g′ = 1', 'f′(x) = (1 · (x − 2) − (x + 1) · 1) / (x − 2)²', '= (x − 2 − x − 1) / (x − 2)² = −3 / (x − 2)²'] },
        { t: 'box', id: 'r', x: 6, y: 54, w: 46, h: 11, text: 'f′(x) = −3 / (x − 2)²', color: 'green' }
      ],
      next: 'Trigonometriya-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Boʻlinma qoidasi bilan tangensning hosilasini ham topamiz. Tangens x — sinus x boʻlingan kosinus x ga. Suratda: kosinus x karra kosinus x minus sinus x karra minus sinus x, yaʼni kosinus kvadrat plyus sinus kvadrat. Bu esa 1 ga teng. Natija: 1 boʻlingan kosinus kvadrat x ga. Jadvaldagi formula aynan shu yerdan kelgan!",
      easy: "Tangens — sinusni kosinusga boʻlish. Boʻlinma qoidasini qoʻllasak, suratda kosinus kvadrat plyus sinus kvadrat chiqadi, bu doim 1. Shuning uchun javob 1 boʻlingan kosinus kvadratga.",
      draw: [
        { t: 'title', text: 'Tangensning hosilasi' },
        { t: 'formula', x: 8, y: 22, text: 'tg x = sin x / cos x' },
        { t: 'list', x: 6, y: 33, items: ['Surat: cos x · cos x − sin x · (−sin x)', '= cos²x + sin²x = 1', '(tg x)′ = 1 / cos²x'] },
        { t: 'box', id: 'g', x: 6, y: 56, w: 60, h: 10, text: 'Jadvaldagi formula shu yerdan!', color: 'green' }
      ],
      next: 'Zoʻr-ku!'
    }
  ],
  summary: [
    'Koʻpaytma: (f · g)′ = f′ · g + f · g′.',
    'Boʻlinma: (f / g)′ = (f′ · g − f · g′) / g²,  g ≠ 0.',
    'Diqqat: (f · g)′ ≠ f′ · g′ va (f / g)′ ≠ f′ / g′.',
    '(tg x)′ = 1 / cos²x — boʻlinma qoidasidan kelib chiqadi.'
  ],
  questions: [
    {
      id: 'm8q1',
      prompt: 'y = (x − 1)(x² − 5). y′ = ?',
      hint: 'f = x − 1, g = x² − 5. (f · g)′ = f′ · g + f · g′.',
      explanation: '1 · (x² − 5) + (x − 1) · 2x = x² − 5 + 2x² − 2x = 3x² − 2x − 5.',
      widget: { type: 'expression_answer', props: { answer: '3*x^2 - 2*x - 5', prefix: 'y′ =', keys: ['x', '²', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'm8q2',
      prompt: 'y = x² · sin x. y′ = ?',
      hint: '(x²)′ = 2x, (sin x)′ = cos x. Koʻpaytma qoidasini qoʻllang.',
      explanation: '2x · sin x + x² · cos x.',
      widget: { type: 'expression_answer', props: { answer: '2*x*sin(x) + x^2*cos(x)', prefix: 'y′ =', keys: ['x', '²', 'sin', 'cos', '(', ')', '+', '·'] } }
    },
    {
      id: 'm8q3',
      prompt: 'Koʻpaytma qoidasini toʻldiring.',
      hint: 'Har safar faqat bitta koʻpaytuvchining hosilasi olinadi.',
      explanation: '(f · g)′ = f′ · g + f · g′.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: '(f · g)′ = ' }, { blank: 'f′ · g' }, { text: ' + ' }, { blank: 'f · g′' }],
          bank: ['f′ · g', 'f · g′', 'f′ · g′', 'f / g']
        }
      }
    },
    {
      id: 'm8q4',
      prompt: 'f(x) = (x + 1) / (x − 2). f′(3) = ?',
      hint: 'Misolda topganimiz: f′(x) = −3 / (x − 2)².',
      explanation: 'f′(3) = −3 / (3 − 2)² = −3 / 1 = −3.',
      widget: { type: 'number_answer', props: { answer: -3 } }
    },
    {
      id: 'm8q5',
      prompt: 'y = (3x + 7) / (x − 5). y′ = ?',
      hint: 'f′ = 3, g′ = 1. Suratda 3(x − 5) − (3x + 7) ni soddalashtiring.',
      explanation: '(3(x − 5) − (3x + 7)) / (x − 5)² = (3x − 15 − 3x − 7) / (x − 5)² = −22 / (x − 5)².',
      widget: { type: 'expression_answer', props: { answer: '-22/(x-5)^2', prefix: 'y′ =', keys: ['x', '²', '(', ')', '/', '−'] } }
    },
    {
      id: 'm8q6',
      prompt: 'Qaysi hisoblashlar toʻgʻri? Hammasini belgilang.',
      hint: 'Shubha boʻlsa, qavslarni ochib tekshiring: x · x = x², x³ · x² = x⁵.',
      explanation: '(x · x)′ = 2x, (x³ · x²)′ = (x⁵)′ = 5x⁴, (1/x)′ = −1/x², (x/2)′ = 1/2 — toʻgʻri. Hosilalarni shunchaki koʻpaytirish notoʻgʻri.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { text: '(x · x)′ = 2x', match: true },
            { text: '(x · x)′ = 1 · 1 = 1', match: false },
            { text: '(x³ · x²)′ = 5x⁴', match: true },
            { text: '(sin x · cos x)′ = cos x · (−sin x)', match: false },
            { text: '(1/x)′ = −1/x²', match: true },
            { text: '(x/2)′ = 1/2', match: true }
          ]
        }
      }
    },
    {
      id: 'm8q7',
      prompt: 'Boʻlinmaning hosilasini topish bosqichlarini toʻgʻri tartibda bosing.',
      hint: 'Avval surat va maxrajni ajrating.',
      explanation: 'f va g ni ajratamiz → f′ va g′ ni topamiz → formulaga qoʻyamiz → suratni soddalashtiramiz.',
      widget: {
        type: 'step_order',
        props: { steps: ['Surat f va maxraj g ni ajrating', 'f′ va g′ ni toping', 'Formulaga qoʻying: (f′ · g − f · g′) / g²', 'Suratni soddalashtiring'] }
      }
    },
    {
      id: 'm8q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tekshiruvdagi (x · x)′ misolini eslang.',
      explanation: 'Koʻpaytmaning hosilasi hosilalar koʻpaytmasi emas. Maxrajda g² turadi. (tg x)′ = 1/cos²x. f′g va fg′ ning oʻrni almashsa, ishora oʻzgaradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Koʻpaytmaning hosilasi hosilalar koʻpaytmasiga teng.', value: false },
            { text: 'Boʻlinma qoidasida maxrajda g² turadi.', value: true },
            { text: '(tg x)′ = 1 / cos²x', value: true },
            { text: 'Boʻlinma qoidasida f′ · g va f · g′ ning oʻrnini almashtirish mumkin.', value: false }
          ]
        }
      }
    }
  ]
};
