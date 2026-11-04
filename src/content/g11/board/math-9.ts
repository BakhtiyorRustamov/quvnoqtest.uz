import type { BoardLesson } from './types';

/** Darslik: 10–12-mavzu (30–33-betlar) — murakkab funksiya va uning hosilasi. */
export const MATH_9: BoardLesson = {
  n: 9,
  label: "10–12",
  part: 'algebra',
  title: "Murakkab funksiyaning hosilasini oʻrganish",
  section: '10–12',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Velosiped pedalini bir marta aylantirsangiz, zanjir orqali gʻildirak 3 marta aylanadi. Gʻildirakning har bir aylanishi esa 2 metr yoʻl. Demak, pedalning bir aylanishi 3 karra 2, yaʼni 6 metr yoʻl beradi. Bir oʻzgarish ikkinchisini, u esa uchinchisini oʻzgartirsa, tezliklar koʻpaytiriladi. Bugun shu gʻoyani funksiyalarda koʻramiz.",
      easy: "Pedal gʻildirakni aylantiradi, gʻildirak esa velosipedni yurgizadi. Zanjirdagi har bir boʻgʻin oʻz koʻpaytuvchisini qoʻshadi: 3 karra 2 — 6.",
      draw: [
        { t: 'title', text: 'Velosiped zanjiri' },
        { t: 'icon', x: 12, y: 33, emoji: '🚲', size: 'l' },
        { t: 'box', id: 'p', x: 24, y: 18, w: 22, h: 11, text: 'Pedal: 1 marta', color: 'blue' },
        { t: 'box', id: 'w', x: 56, y: 18, w: 26, h: 11, text: 'Gʻildirak: 3 marta', color: 'orange' },
        { t: 'box', id: 'm', x: 52, y: 42, w: 40, h: 11, text: 'Yoʻl: 3 · 2 = 6 m', color: 'green' },
        { t: 'arrow', from: 'p', to: 'w', label: '× 3' },
        { t: 'arrow', from: 'w', to: 'm', label: '× 2 m' },
        { t: 'text', x: 6, y: 63, text: 'Tezliklar koʻpaytiriladi!', color: 'purple' }
      ],
      next: 'Bu qanday funksiya?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "y teng x kvadrat plyus 3x ning toʻrtinchi darajasi funksiyasini qaraylik. Agar g(x) teng x kvadrat plyus 3x va f(g) teng g ning toʻrtinchi darajasi desak, y teng f(g(x)) boʻladi. Avval ichki funksiya g hisoblanadi, keyin uning natijasiga tashqi funksiya f qoʻllanadi. Bunday funksiya murakkab funksiya deyiladi.",
      easy: "Murakkab funksiya — ikki bosqichli mashina: x avval g dan oʻtadi, chiqqan son esa f ga kiradi. g — ichki, f — tashqi funksiya.",
      draw: [
        { t: 'title', text: 'Murakkab funksiya' },
        { t: 'box', id: 'bx', x: 6, y: 22, w: 12, h: 10, text: 'x', color: 'blue' },
        { t: 'box', id: 'bg', x: 28, y: 22, w: 28, h: 10, text: 'g(x) = x² + 3x', color: 'orange' },
        { t: 'box', id: 'bf', x: 66, y: 22, w: 28, h: 10, text: 'f(g) = g⁴', color: 'green' },
        { t: 'arrow', from: 'bx', to: 'bg' },
        { t: 'arrow', from: 'bg', to: 'bf' },
        { t: 'text', x: 30, y: 39, text: 'ichki funksiya', size: 's', color: 'orange' },
        { t: 'text', x: 68, y: 39, text: 'tashqi funksiya', size: 's', color: 'green' },
        { t: 'formula', x: 8, y: 55, text: 'y = f(g(x)) = (x² + 3x)⁴' }
      ],
      next: 'Qiymatini hisoblaymiz'
    },
    {
      kind: 'explain',
      clear: true,
      say: "f(x) teng x kvadrat, g(x) teng x plyus 1 boʻlsin. f(g(2)) ni topamiz: avval ichki funksiya, g(2) teng 3, keyin f(3) teng 9. Endi teskari tartibda, g(f(2)): f(2) teng 4, g(4) teng 5. Javoblar har xil! Demak, murakkab funksiyada tartib muhim: doim avval ichkisini hisoblaymiz.",
      easy: "Qaysi funksiya ichkarida turgan boʻlsa, oʻsha birinchi ishlaydi. Tartibni almashtirsak, javob ham oʻzgaradi: 9 va 5.",
      draw: [
        { t: 'title', text: 'Tartib muhim' },
        { t: 'text', x: 6, y: 20, text: 'f(x) = x²,   g(x) = x + 1' },
        { t: 'list', x: 6, y: 32, items: ['f(g(2)) = f(3) = 9', 'g(f(2)) = g(4) = 5'] },
        { t: 'box', id: 'r', x: 6, y: 47, w: 50, h: 11, text: 'f(g(x)) ≠ g(f(x))', color: 'red' },
        { t: 'text', x: 62, y: 54, text: 'avval ichkisi!', size: 's', color: 'purple' }
      ],
      next: 'Hosilasi-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Murakkab funksiyaning hosilasi: f shtrix g(x) karra g shtrix x. Yaʼni avval tashqi funksiyaning hosilasini olamiz, ichini oʻzgartirmasdan qoldiramiz. Keyin uni ichki funksiyaning hosilasiga koʻpaytiramiz. Xuddi velosiped zanjiridagidek: avval 3 ga, keyin 2 ga koʻpaytirgan edik.",
      easy: "Ikki qadam: tashqi qobiqning hosilasini olamiz, ichidagi ifodaga tegmaymiz. Keyin ichidagi ifodaning hosilasiga koʻpaytiramiz.",
      draw: [
        { t: 'title', text: 'Murakkab funksiya hosilasi' },
        { t: 'formula', x: 8, y: 26, text: '(f(g(x)))′ = f′(g(x)) · g′(x)' },
        { t: 'box', id: 'r', x: 6, y: 35, w: 88, h: 12, text: 'tashqi funksiya hosilasi (ichi oʻzgarmaydi) × ichki funksiya hosilasi', color: 'green' },
        { t: 'icon', x: 86, y: 59, emoji: '🚲', size: 'm' },
        { t: 'text', x: 6, y: 61, text: 'Xuddi zanjirdagidek: × 3, keyin × 2', size: 's', color: 'purple' }
      ],
      next: 'Misolda koʻraylik'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi misol: h(x) teng x kub plyus 1 ning beshinchi darajasi, x nol teng 1 nuqtadagi hosilasi kerak. Ichki funksiya x kub plyus 1, uning hosilasi 3x kvadrat. Tashqi funksiya — beshinchi daraja, hosilasi 5 karra toʻrtinchi daraja. Demak, h shtrix teng 5 karra x kub plyus 1 ning toʻrtinchi darajasi, karra 3x kvadrat, yaʼni 15x kvadrat karra x kub plyus 1 ning toʻrtinchi darajasi. x teng 1 da: 15 karra 16, yaʼni 240.",
      easy: "Avval tashqi qism: 5 karra qavsning toʻrtinchi darajasi. Keyin qavs ichining hosilasi 3x kvadratga koʻpaytiramiz. x teng 1 ni qoʻysak, 15 karra 16 — 240.",
      draw: [
        { t: 'title', text: 'Misol' },
        { t: 'formula', x: 8, y: 22, text: 'h(x) = (x³ + 1)⁵,   x = 1' },
        { t: 'list', x: 6, y: 34, items: ['ichki: g = x³ + 1,   g′ = 3x²', 'h′ = 5(x³ + 1)⁴ · 3x² = 15x²(x³ + 1)⁴', 'h′(1) = 15 · 1 · 2⁴ = 15 · 16 = 240'] },
        { t: 'box', id: 'r', x: 6, y: 56, w: 36, h: 10, text: 'Javob: 240', color: 'green' }
      ],
      next: 'Yana bittasi!'
    },
    {
      kind: 'example',
      clear: true,
      say: "Koʻp uchraydigan holat: ichki funksiya kx plyus b. Unda ichkining hosilasi shunchaki k. Masalan, sinus 8x ning hosilasi: kosinus 8x karra 8, yaʼni 8 kosinus 8x. 3x minus 2 ning beshinchi darajasiniki: 5 karra 3x minus 2 ning toʻrtinchi darajasi, karra 3, yaʼni 15 karra 3x minus 2 ning toʻrtinchi darajasi.",
      easy: "Ichida kx plyus b boʻlsa, oxirida k ga koʻpaytirish kifoya. Sinus 8x dan 8 kosinus 8x chiqadi.",
      draw: [
        { t: 'title', text: 'Ichida kx + b boʻlsa' },
        { t: 'list', x: 6, y: 22, items: ['(sin 8x)′ = cos 8x · 8 = 8cos 8x', '((3x − 2)⁵)′ = 5(3x − 2)⁴ · 3 = 15(3x − 2)⁴'] },
        { t: 'box', id: 'r', x: 6, y: 40, w: 70, h: 12, text: '(f(kx + b))′ = k · f′(kx + b)', color: 'green' },
        { t: 'text', x: 6, y: 62, text: 'Ichki funksiya hosilasi — shunchaki k', size: 's', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'y = f(g(x)) — murakkab funksiya: g — ichki, f — tashqi funksiya.',
    'Tartib muhim: odatda f(g(x)) ≠ g(f(x)); avval ichki funksiya hisoblanadi.',
    'Murakkab funksiya hosilasi: (f(g(x)))′ = f′(g(x)) · g′(x).',
    'Xususan: ((kx + b)ⁿ)′ = n · k · (kx + b)ⁿ⁻¹,  (sin(kx + b))′ = k · cos(kx + b).'
  ],
  questions: [
    {
      id: 'm9q1',
      prompt: 'f(x) = x² − 1. f(f(2)) = ?',
      hint: 'Avval ichkisini: f(2) = 3. Keyin f(3) ni toping.',
      explanation: 'f(2) = 4 − 1 = 3; f(3) = 9 − 1 = 8.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'm9q2',
      prompt: 'f(x) = x², g(x) = x − 1. f(g(3)) = ?',
      hint: 'g(3) ni toping va natijani kvadratga koʻtaring.',
      explanation: 'g(3) = 2; f(2) = 4.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'm9q3',
      prompt: 'Har bir murakkab funksiyani uning ichki funksiyasi bilan juftlang.',
      hint: 'Ichki funksiya — qavs ichida, yoki sinus, kosinus, ildiz belgisi ostida turadi.',
      explanation: '(x² + 3x)⁴ → x² + 3x;  sin 5x → 5x;  √(4x − 5) → 4x − 5;  cos⁸x = (cos x)⁸ → cos x.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '(x² + 3x)⁴', right: 'x² + 3x' },
            { left: 'sin 5x', right: '5x' },
            { left: '√(4x − 5)', right: '4x − 5' },
            { left: 'cos⁸x', right: 'cos x' }
          ]
        }
      }
    },
    {
      id: 'm9q4',
      prompt: 'y = (3x − 2)⁵. y′ = ?',
      hint: 'Tashqi: 5( )⁴. Ichki funksiya 3x − 2 ning hosilasi 3.',
      explanation: '5(3x − 2)⁴ · 3 = 15(3x − 2)⁴.',
      widget: { type: 'expression_answer', props: { answer: '15*(3*x-2)^4', prefix: 'y′ =', keys: ['x', '^', '(', ')', '−', '·'] } }
    },
    {
      id: 'm9q5',
      prompt: 'y = sin 4x. y′ = ?',
      hint: '(sin t)′ = cos t, ichki funksiya 4x ning hosilasi 4.',
      explanation: 'cos 4x · 4 = 4cos 4x.',
      widget: { type: 'expression_answer', props: { answer: '4*cos(4*x)', prefix: 'y′ =', keys: ['x', 'sin', 'cos', '(', ')', '·'] } }
    },
    {
      id: 'm9q6',
      prompt: 'h(x) = (x² + 1)³. h′(1) = ?',
      hint: 'h′(x) = 3(x² + 1)² · 2x. Endi x = 1 ni qoʻying.',
      explanation: 'h′(x) = 6x(x² + 1)²; h′(1) = 6 · 1 · 2² = 24.',
      widget: { type: 'number_answer', props: { answer: 24 } }
    },
    {
      id: 'm9q7',
      prompt: 'y = (x³ + 1)⁵ ning hosilasini topish bosqichlarini toʻgʻri tartibda bosing.',
      hint: 'Avval ichki va tashqi funksiyani ajrating.',
      explanation: 'Ichki g = x³ + 1 → tashqi t⁵ → 5(x³ + 1)⁴ → · 3x².',
      widget: {
        type: 'step_order',
        props: {
          steps: [
            'Ichki funksiyani ajrating: g(x) = x³ + 1',
            'Tashqi funksiyani yozing: f(t) = t⁵',
            'Tashqi funksiya hosilasini ichi bilan yozing: 5(x³ + 1)⁴',
            'Ichki funksiya hosilasiga koʻpaytiring: · 3x²'
          ]
        }
      }
    },
    {
      id: 'm9q8',
      prompt: 'Har bir funksiyani qutisiga joylang: murakkabmi yoki oddiymi?',
      hint: 'Murakkab funksiyada bitta funksiyaning ichida boshqa ifoda turadi (masalan, sinus ostida 3x).',
      explanation: 'sin 3x, (2x + 1)⁵, √(x² + 1), cos² x — murakkab. x³, cos x, 5x + 2, √x — oddiy (jadvaldagi funksiya).',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'complex', label: 'Murakkab' },
            { id: 'simple', label: 'Oddiy' }
          ],
          items: [
            { emoji: '', label: 'sin 3x', bin: 'complex' },
            { emoji: '', label: '(2x + 1)⁵', bin: 'complex' },
            { emoji: '', label: '√(x² + 1)', bin: 'complex' },
            { emoji: '', label: 'cos² x', bin: 'complex' },
            { emoji: '', label: 'x³', bin: 'simple' },
            { emoji: '', label: 'cos x', bin: 'simple' },
            { emoji: '', label: '5x + 2', bin: 'simple' },
            { emoji: '', label: '√x', bin: 'simple' }
          ]
        }
      }
    },
    {
      id: 'm9q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ichki funksiya hosilasiga koʻpaytirishni unutmang.',
      explanation: '(sin 2x)′ = 2cos 2x. (x² + 1)³ da ichki funksiya x² + 1. f(g(x)) va g(f(x)) odatda har xil. ((5x + 1)²)′ = 2(5x + 1) · 5 = 10(5x + 1).',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '(sin 2x)′ = cos 2x', value: false },
            { text: '(x² + 1)³ funksiyada ichki funksiya — x² + 1.', value: true },
            { text: 'f(g(x)) va g(f(x)) har doim teng.', value: false },
            { text: '((5x + 1)²)′ = 10(5x + 1)', value: true }
          ]
        }
      }
    }
  ]
};
