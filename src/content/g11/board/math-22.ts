import type { BoardLesson } from './types';

/** Darslik: 37–39-mavzu (80–82-betlar) — aniqmas integral. */
export const MATH_22: BoardLesson = {
  n: 22,
  label: "39",
  part: 'algebra',
  title: "Aniqmas integralni oʻrganish",
  section: '37–39',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ikki mashina katta yoʻlda bir xil 60 kilometr soatiga tezlik bilan ketyapti. Biri 0-kilometrdan, ikkinchisi 20-kilometrdan yoʻlga chiqqan. Tezliklari bir xil, lekin yoʻl formulalari har xil: 60t va 60t plyus 20. Tezlikni bilib, faqat boshlangʻich joyni bilmasak, javobga plyus C qoʻshamiz.",
      easy: "Tezlik bir xil, lekin boshlangʻich joy har xil. Shuning uchun javobda doim plyus C boʻladi.",
      draw: [
        { t: 'title', text: 'Bir xil tezlik' },
        { t: 'icon', x: 10, y: 26, emoji: '🚗', size: 'l' },
        { t: 'icon', x: 10, y: 48, emoji: '🚙', size: 'l' },
        { t: 'text', x: 26, y: 28, text: 's₁ = 60t' },
        { t: 'text', x: 26, y: 50, text: 's₂ = 60t + 20' },
        { t: 'box', id: 'v', x: 64, y: 32, w: 30, h: 12, text: 's′ = 60', color: 'green' },
        { t: 'text', x: 26, y: 64, text: 'Farqi — oʻzgarmas son', color: 'purple' }
      ],
      next: 'Buni qanday yozamiz?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "f(x) ning barcha boshlangʻich funksiyalari toʻplami F(x) plyus C — f(x) ning aniqmas integrali deyiladi va integral belgisi f(x) dx deb yoziladi. Integral belgisi choʻzilgan S harfiga oʻxshaydi. f(x) — integral ostidagi funksiya, f(x) dx — integral ostidagi ifoda, C — ixtiyoriy oʻzgarmas.",
      easy: "Aniqmas integral — barcha boshlangʻich funksiyalar: F(x) plyus C.",
      draw: [
        { t: 'title', text: 'Aniqmas integral' },
        { t: 'formula', x: 14, y: 22, text: '∫ f(x) dx = F(x) + C' },
        { t: 'list', x: 6, y: 40, items: ['∫ — integral belgisi', 'f(x) — integral ostidagi funksiya', 'C — ixtiyoriy oʻzgarmas son'] }
      ],
      next: 'Asosiy formulalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hosilalar jadvalini teskari oʻqib, asosiy formulalarni olamiz. x ning k darajasining integrali — x ning k plyus 1 darajasi boʻlinsin k plyus 1, k minus 1 ga teng boʻlmasa. 1 boʻlinsin x ning integrali — ln modul x. e ning x darajasi — oʻzi. a ning x darajasi — a ning x darajasi boʻlinsin ln a.",
      easy: "Daraja bittaga oshadi va yangi darajaga boʻlinadi. 1 boʻlinsin x uchun — ln modul x.",
      draw: [
        { t: 'title', text: 'Asosiy formulalar' },
        { t: 'list', x: 6, y: 20, items: ['∫ xᵏ dx = xᵏ⁺¹/(k + 1) + C,  k ≠ −1', '∫ dx/x = ln|x| + C', '∫ eˣ dx = eˣ + C', '∫ aˣ dx = aˣ/ln a + C'] },
        { t: 'text', x: 6, y: 58, text: 'Hosilalar jadvali — teskari tomonga', size: 's', color: 'purple' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Misollar: x beshinchi darajaning integrali — x oltinchi daraja boʻlinsin 6 plyus C. Ildiz x — bu x ning yarim darajasi, integrali x ning uch ikkinchi darajasi boʻlinsin uch ikkinchi, yaʼni uchdan ikki x ildiz x plyus C. Tekshirish oson: javobning hosilasini olsak, integral ostidagi funksiya chiqishi kerak.",
      easy: "Darajani bittaga oshiramiz va boʻlamiz. Javobni hosila olib tekshiramiz.",
      draw: [
        { t: 'title', text: 'Misollar' },
        { t: 'formula', x: 6, y: 20, text: '∫ x⁵ dx = x⁶/6 + C' },
        { t: 'formula', x: 6, y: 34, text: '∫ √x dx = ⅔·x√x + C' },
        { t: 'text', x: 6, y: 52, text: 'Tekshirish: (⅔·x^{3/2})′ = x^{1/2} = √x', size: 's', color: 'green' }
      ],
      next: 'ln|x| qayerdan?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "4-masala: nega ln modul x? x musbat boʻlsa, ln x ning hosilasi 1 boʻlinsin x. x manfiy boʻlsa, ln minus x ning hosilasi: 1 boʻlinsin minus x karra minus 1, yaʼni yana 1 boʻlinsin x. Ikkala holatni bitta yozuvga birlashtiramiz: ln modul x plyus C.",
      easy: "Musbat x uchun ln x, manfiy x uchun ln(−x). Birga — ln modul x.",
      draw: [
        { t: 'title', text: '∫ dx/x = ln|x| + C' },
        { t: 'list', x: 6, y: 20, items: ['x > 0:  (ln x)′ = 1/x', 'x < 0:  (ln(−x))′ = (−1)/(−x) = 1/x'] },
        { t: 'box', id: 'r', x: 6, y: 44, w: 50, h: 12, text: 'Ikkalasi: ln|x| + C', color: 'green' }
      ],
      next: 'Hosila va integral'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Differensiallash va integrallash — oʻzaro teskari amallar. Funksiyadan hosila olib, keyin integrallasak, oʻsha funksiya plyus C qaytadi. Integralning hosilasi esa integral ostidagi funksiyaning oʻzi. Shuning uchun har bir javobni hosila bilan tekshirish mumkin.",
      easy: "Integral va hosila bir-birini bekor qiladi. Javobni hosila bilan tekshiramiz.",
      draw: [
        { t: 'title', text: 'Teskari amallar' },
        { t: 'box', id: 'F', x: 8, y: 28, w: 30, h: 12, text: 'F(x) + C', color: 'blue' },
        { t: 'box', id: 'f', x: 62, y: 28, w: 30, h: 12, text: 'f(x)', color: 'green' },
        { t: 'arrow', from: 'F', to: 'f', label: 'hosila' },
        { t: 'text', x: 34, y: 54, text: '← integral', color: 'orange' },
        { t: 'text', x: 8, y: 64, text: '(∫ f(x) dx)′ = f(x)', size: 's', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    '∫ f(x) dx = F(x) + C — f(x) ning barcha boshlangʻich funksiyalari.',
    '∫ xᵏ dx = xᵏ⁺¹/(k + 1) + C (k ≠ −1),  ∫ dx/x = ln|x| + C,  ∫ eˣ dx = eˣ + C.',
    'Integrallash — differensiallashga teskari amal; javob hosila olib tekshiriladi.'
  ],
  questions: [
    {
      id: 'm22q1',
      prompt: '∫ x⁴ dx ni toping.',
      hint: 'Darajani bittaga oshiring va yangi darajaga boʻling.',
      explanation: '∫ x⁴ dx = x⁵/5 + C.',
      widget: { type: 'expression_answer', props: { answer: 'x^5/5', prefix: '∫ x⁴ dx =', plusC: true, keys: ['x', '^', '/', '(', ')', '+', 'C'] } }
    },
    {
      id: 'm22q2',
      prompt: '∫ dx/x² ni toping.',
      hint: '1/x² = x⁻². Darajani bittaga oshiring.',
      explanation: '∫ x⁻² dx = x⁻¹/(−1) + C = −1/x + C.',
      widget: { type: 'expression_answer', props: { answer: '-1/x', prefix: '∫ dx/x² =', plusC: true, keys: ['x', '/', '−', '(', ')', '+', 'C'] } }
    },
    {
      id: 'm22q3',
      prompt: '∫ 2ˣ dx ni toping.',
      hint: '∫ aˣ dx = aˣ/ln a + C.',
      explanation: '∫ 2ˣ dx = 2ˣ/ln 2 + C.',
      widget: { type: 'expression_answer', props: { answer: '2^x/ln(2)', prefix: '∫ 2ˣ dx =', plusC: true, keys: ['2', '^', 'x', '/', 'ln', '(', ')', 'C'] } }
    },
    {
      id: 'm22q4',
      prompt: 'Taʼrifni toʻldiring.',
      hint: 'Integral — barcha boshlangʻich funksiyalar.',
      explanation: '∫ f(x) dx = F(x) + C, bu yerda F′(x) = f(x).',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: '∫ f(x) dx = ' }, { blank: 'F(x)' }, { text: ' + ' }, { blank: 'C' }, { text: ', bu yerda F′(x) = ' }, { blank: 'f(x)' }, { text: '.' }],
          bank: ['F(x)', 'C', 'f(x)', 'f′(x)', 'x']
        }
      }
    },
    {
      id: 'm22q5',
      prompt: 'Kartalarni ochib, funksiyani uning integrali bilan juftlang.',
      hint: 'Oʻng tomondagining hosilasi chap tomondagiga teng.',
      explanation: '∫x⁴ = x⁵/5, ∫1/x = ln|x|, ∫eˣ = eˣ, ∫√x = ⅔x√x (+ C).',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'x⁴' }, b: { label: 'x⁵/5 + C' } },
            { a: { label: '1/x' }, b: { label: 'ln|x| + C' } },
            { a: { label: 'eˣ' }, b: { label: 'eˣ + C' } },
            { a: { label: '√x' }, b: { label: '⅔x√x + C' } }
          ]
        }
      }
    },
    {
      id: 'm22q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'k = −1 holini eslang.',
      explanation: 'Integralning hosilasi — integral ostidagi funksiya. ∫dx/x = ln|x| + C. Formula xᵏ⁺¹/(k + 1) k = −1 da ishlamaydi. Aniqmas integral — funksiyalar toʻplami.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '(∫ f(x) dx)′ = f(x).', value: true },
            { text: '∫ dx/x = ln|x| + C.', value: true },
            { text: '∫ x⁻¹ dx = x⁰/0 + C.', value: false },
            { text: 'Aniqmas integral — bitta funksiya.', value: false }
          ]
        }
      }
    },
    {
      id: 'm22q7',
      prompt: 'Topilgan integralni tekshirish qadamlarini tartiblang.',
      hint: 'Javobdan hosila olinadi.',
      explanation: 'Javobni yozamiz → hosilasini olamiz → integral ostidagi funksiya bilan solishtiramiz.',
      widget: { type: 'order_line', props: { items: [{ label: 'F(x) + C ni yozish' }, { label: 'Hosilasini olish' }, { label: 'f(x) bilan solishtirish' }] } }
    },
    {
      id: 'm22q8',
      prompt: 'F(x) = ∫ x³ dx va F(0) = 1. F(2) ni toping.',
      hint: 'F(x) = x⁴/4 + C, F(0) = C = 1.',
      explanation: 'F(x) = x⁴/4 + 1, F(2) = 4 + 1 = 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    }
  ]
};
