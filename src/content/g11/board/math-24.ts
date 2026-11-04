import type { BoardLesson } from './types';

/** Darslik: 40–43-mavzu (88–95-betlar) — integrallash usullari: almashtirish, ayniyatlar, boʻlaklab integrallash. */
export const MATH_24: BoardLesson = {
  n: 24,
  label: "42–43",
  part: 'algebra',
  title: "Integrallash usullarini oʻrganish",
  section: '40–43',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Sinfda Muhammadali ismli bola bor, lekin hamma uni qisqa qilib Ali deydi. Uzun ismni qisqa laqab bilan almashtirsak, gapirish osonlashadi. Integralda ham shunday: murakkab boʻlakni bitta harf, masalan u bilan almashtirsak, integral jadvaldagi oddiy koʻrinishga keladi.",
      easy: "Uzun ifodani qisqa harf bilan almashtiramiz — integral osonlashadi.",
      draw: [
        { t: 'title', text: 'Uzun ism — qisqa laqab' },
        { t: 'box', id: 'a', x: 6, y: 22, w: 36, h: 12, text: 'Muhammadali', color: 'blue' },
        { t: 'box', id: 'b', x: 62, y: 22, w: 30, h: 12, text: 'Ali', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'box', id: 'c', x: 6, y: 46, w: 36, h: 12, text: 'x² + 8', color: 'blue' },
        { t: 'box', id: 'd', x: 62, y: 46, w: 30, h: 12, text: 'u', color: 'green' },
        { t: 'arrow', from: 'c', to: 'd' }
      ],
      next: 'Misolda koʻraylik'
    },
    {
      kind: 'example',
      clear: true,
      say: "3-misol: x dx boʻlinsin x kvadrat plyus 8. x kvadrat plyus 8 ni u desak, du teng 2x dx, demak x dx teng yarim du. Integral yarim karra du boʻlinsin u ga aylanadi — bu jadvaldagi ln modul u. Javob: yarim ln x kvadrat plyus 8 plyus C. Hosila olib tekshirsak, x boʻlinsin x kvadrat plyus 8 chiqadi.",
      easy: "u teng x kvadrat plyus 8. Integral du boʻlinsin u ga aylanadi, javob — yarim ln(x² + 8).",
      draw: [
        { t: 'title', text: 'Oʻzgaruvchini almashtirish' },
        { t: 'formula', x: 6, y: 20, text: '∫ x dx/(x² + 8)' },
        { t: 'list', x: 6, y: 34, items: ['u = x² + 8,  du = 2x dx', '= ½·∫ du/u = ½·ln|u| + C'] },
        { t: 'box', id: 'r', x: 6, y: 52, w: 46, h: 11, text: '½·ln(x² + 8) + C', color: 'green' }
      ],
      next: 'Yana bittasi'
    },
    {
      kind: 'example',
      clear: true,
      say: "4-misol: e ning sinus x darajasi karra kosinus x dx. sinus x ni t desak, dt teng kosinus x dx. Integral e ning t darajasi dt boʻladi, javobi e ning t darajasi. Orqaga qaytamiz: e ning sinus x darajasi plyus C. Belgi: ichki funksiyaning hosilasi integralda koʻpaytuvchi boʻlib turibdi.",
      easy: "sin x ni t deymiz, cos x dx — uning differensiali. Javob: e ning sin x darajasi.",
      draw: [
        { t: 'title', text: '4-misol' },
        { t: 'formula', x: 6, y: 20, text: '∫ e^{sin x}·cos x dx' },
        { t: 'list', x: 6, y: 34, items: ['t = sin x,  dt = cos x dx', '= ∫ eᵗ dt = eᵗ + C'] },
        { t: 'box', id: 'r', x: 6, y: 52, w: 40, h: 11, text: 'e^{sin x} + C', color: 'green' },
        { t: 'text', x: 52, y: 58, text: 'ichki funksiya hosilasi bor!', size: 's', color: 'purple' }
      ],
      next: 'Trigonometriya-chi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ba'zan trigonometrik ayniyat yordam beradi. 9-misol: sinus kvadrat 2x. Ayniyat: 2 sinus kvadrat 2x teng 1 minus kosinus 4x. Shunda integral yarim karra 1 minus kosinus 4x boʻladi: x boʻlinsin 2 minus sinus 4x boʻlinsin 8 plyus C. Koʻpaytma ham yigʻindiga aylantiriladi: 2 sinus 5x kosinus 3x teng sinus 8x plyus sinus 2x.",
      easy: "Daraja va koʻpaytmani ayniyat bilan yigʻindiga aylantiramiz, keyin jadval boʻyicha integrallaymiz.",
      draw: [
        { t: 'title', text: 'Ayniyatlar yordamida' },
        { t: 'text', x: 6, y: 20, text: '2sin²2x = 1 − cos 4x', color: 'blue' },
        { t: 'formula', x: 6, y: 30, text: '∫ sin²2x dx = x/2 − sin 4x/8 + C' },
        { t: 'text', x: 6, y: 50, text: '2sin 5x·cos 3x = sin 8x + sin 2x', color: 'blue' },
        { t: 'text', x: 6, y: 60, text: 'koʻpaytma → yigʻindi', size: 's', color: 'purple' }
      ],
      next: 'Kasr boʻlsa-chi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "7-misol: 1 boʻlinsin x kvadrat minus 5x plyus 6. Maxrajni koʻpaytuvchilarga ajratamiz: x minus 2 karra x minus 3. Keyin kasrni ikkita oddiy kasrga boʻlamiz: 1 boʻlinsin x minus 3 minus 1 boʻlinsin x minus 2. Har biri ln beradi. Javob: ln modul x minus 3 boʻlinsin x minus 2 plyus C.",
      easy: "Kasrni ikkita oddiy kasrga boʻlamiz, har biri ln beradi.",
      draw: [
        { t: 'title', text: 'Kasrni ajratish' },
        { t: 'formula', x: 6, y: 20, text: '1/(x² − 5x + 6) = 1/(x − 3) − 1/(x − 2)' },
        { t: 'list', x: 6, y: 36, items: ['∫ = ln|x − 3| − ln|x − 2| + C'] },
        { t: 'box', id: 'r', x: 6, y: 48, w: 50, h: 12, text: 'ln|(x − 3)/(x − 2)| + C', color: 'green' }
      ],
      next: 'Koʻpaytma boʻlsa-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Boʻlaklab integrallash formulasi: f karra g shtrix ning integrali teng f karra g minus g karra f shtrix ning integrali. 1-misol: x karra e ning x darajasi. f teng x, g shtrix teng e ning x darajasi. Shunda integral x karra e ning x darajasi minus e ning x darajasi, yaʼni e ning x darajasi karra x minus 1 plyus C. Xuddi shunday ln x ning integrali — x ln x minus x plyus C.",
      easy: "Bir koʻpaytuvchini hosila, ikkinchisini integral qilamiz. x ni f deb olsak, u yoʻqolib ketadi.",
      draw: [
        { t: 'title', text: 'Boʻlaklab integrallash' },
        { t: 'box', id: 'f', x: 6, y: 18, w: 88, h: 12, text: '∫ f·g′ dx = f·g − ∫ g·f′ dx', color: 'blue' },
        { t: 'formula', x: 6, y: 38, text: '∫ x·eˣ dx = eˣ(x − 1) + C' },
        { t: 'formula', x: 6, y: 52, text: '∫ ln x dx = x·ln x − x + C' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Oʻzgaruvchini almashtirish: ichki funksiyani u deb olamiz; uning hosilasi integralda koʻpaytuvchi boʻlib tursa qulay.',
    'Trigonometrik ayniyatlar va kasrni oddiy kasrlarga ajratish integralni jadvalga keltiradi.',
    'Boʻlaklab integrallash: ∫ f·g′ dx = f·g − ∫ g·f′ dx.'
  ],
  questions: [
    {
      id: 'm24q1',
      prompt: '∫ 2x(x² + 1)³ dx ni toping.',
      hint: 'u = x² + 1, du = 2x dx.',
      explanation: '∫ u³ du = u⁴/4 + C = (x² + 1)⁴/4 + C.',
      widget: { type: 'expression_answer', props: { answer: '(x^2+1)^4/4', prefix: '=', plusC: true, keys: ['x', '²', '(', ')', '^', '/', 'C'] } }
    },
    {
      id: 'm24q2',
      prompt: '∫ sin⁴x · cos x dx ni toping.',
      hint: 't = sin x, dt = cos x dx.',
      explanation: '∫ t⁴ dt = t⁵/5 + C = sin⁵x/5 + C.',
      widget: { type: 'expression_answer', props: { answer: 'sin(x)^5/5', prefix: '=', plusC: true, keys: ['sin', 'x', '(', ')', '^', '/', 'C'] } }
    },
    {
      id: 'm24q3',
      prompt: '∫ x·cos x dx ni boʻlaklab integrallang.',
      hint: 'f = x, g′ = cos x → g = sin x.',
      explanation: 'x·sin x − ∫ sin x dx = x·sin x + cos x + C.',
      widget: { type: 'expression_answer', props: { answer: 'x*sin(x)+cos(x)', prefix: '=', plusC: true, keys: ['x', 'sin', 'cos', '·', '+', '−', 'C'] } }
    },
    {
      id: 'm24q4',
      prompt: 'Har bir integralga qulay usulni moslang.',
      hint: 'Koʻpaytma — boʻlaklab, ichki funksiya hosilasi bor — almashtirish.',
      explanation: 'x·eˣ — boʻlaklab; 2x/(x² + 1) — almashtirish; sin²x — ayniyat; 1/((x − 1)(x − 2)) — kasrlarga ajratish.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '∫ x·eˣ dx', right: 'boʻlaklab integrallash' },
            { left: '∫ 2x dx/(x² + 1)', right: 'oʻzgaruvchini almashtirish' },
            { left: '∫ sin²x dx', right: 'trigonometrik ayniyat' },
            { left: '∫ dx/((x − 1)(x − 2))', right: 'oddiy kasrlarga ajratish' }
          ]
        }
      }
    },
    {
      id: 'm24q5',
      prompt: 'Oʻzgaruvchini almashtirish qadamlarini tartiblang.',
      hint: 'Oxirida eski oʻzgaruvchiga qaytamiz.',
      explanation: 'u ni tanlash → du ni topish → integralni u orqali yozish → integrallash → x ga qaytish.',
      widget: {
        type: 'step_order',
        props: { steps: ['Yangi oʻzgaruvchi u ni tanlang', 'du ni toping', 'Integralni u orqali yozing', 'Jadval boʻyicha integrallang', 'u oʻrniga x li ifodani qaytaring'] }
      }
    },
    {
      id: 'm24q6',
      prompt: 'Boʻlaklab integrallash formulasini toʻldiring.',
      hint: 'Bir koʻpaytuvchi hosila, ikkinchisi integral boʻladi.',
      explanation: '∫ f·g′ dx = f·g − ∫ g·f′ dx.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: '∫ f·g′ dx = ' }, { blank: 'f·g' }, { text: ' − ∫ ' }, { blank: 'g·f′' }, { text: ' dx' }],
          bank: ['f·g', 'g·f′', 'f′·g′', 'f + g']
        }
      }
    },
    {
      id: 'm24q7',
      prompt: '∫ ln x dx ni toping.',
      hint: 'f = ln x, g′ = 1.',
      explanation: 'x·ln x − ∫ x · (1/x) dx = x·ln x − x + C.',
      widget: { type: 'expression_answer', props: { answer: 'x*ln(x)-x', prefix: '=', plusC: true, keys: ['x', 'ln', '(', ')', '·', '−', 'C'] } }
    },
    {
      id: 'm24q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Javoblarning hosilasini olib koʻring.',
      explanation: '(eˣ(x − 1))′ = x·eˣ ✓; (½ln(x² + 8))′ = x/(x² + 8) ✓; sin²x ning integrali −cos²x emas; 1/(x² − 5x + 6) = 1/(x − 3) − 1/(x − 2) ✓.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '∫ x·eˣ dx = eˣ(x − 1) + C.', value: true },
            { text: '∫ x dx/(x² + 8) = ½·ln(x² + 8) + C.', value: true },
            { text: '∫ sin²x dx = −cos²x + C.', value: false },
            { text: '1/(x² − 5x + 6) = 1/(x − 3) − 1/(x − 2).', value: true }
          ]
        }
      }
    }
  ]
};
