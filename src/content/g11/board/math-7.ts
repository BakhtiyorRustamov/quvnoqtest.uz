import type { BoardLesson } from './types';

/** Darslik: 7–9-mavzu (24, 27–29-betlar) — yigʻindi, ayirma, oʻzgarmas koʻpaytuvchi qoidalari, hosilalar jadvali. */
export const MATH_7: BoardLesson = {
  n: 7,
  label: "7–8",
  part: 'algebra',
  title: "Hosila olish qoidalari va hosilalar jadvali",
  section: '7–9',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Metroda eskalatorda turibsiz, lekin yana yuqoriga yuryapsiz. Eskalator sekundiga 0,5 metr tezlikda harakatlanadi, siz esa unga nisbatan sekundiga 1 metr. Yerga nisbatan tezligingiz qancha? 0,5 plyus 1, yaʼni 1,5 metr sekundiga. Tezliklar shunchaki qoʻshiladi. Hosila ham xuddi shunday ishlaydi.",
      easy: "Eskalator sizni olib ketyapti, siz ham yuryapsiz. Ikkala harakat qoʻshiladi: 0,5 plyus 1 — 1,5. Yigʻindining tezligi — tezliklar yigʻindisi.",
      draw: [
        { t: 'title', text: 'Eskalatorda yurish' },
        { t: 'icon', x: 12, y: 34, emoji: '🚶', size: 'l' },
        { t: 'box', id: 'e', x: 24, y: 18, w: 30, h: 11, text: 'Eskalator: 0,5 m/s', color: 'blue' },
        { t: 'box', id: 'm', x: 24, y: 40, w: 30, h: 11, text: 'Siz: 1 m/s', color: 'orange' },
        { t: 'box', id: 'j', x: 64, y: 28, w: 32, h: 13, text: 'Jami: 0,5 + 1 = 1,5 m/s', color: 'green' },
        { t: 'arrow', from: 'e', to: 'j' },
        { t: 'arrow', from: 'm', to: 'j' },
        { t: 'text', x: 24, y: 63, text: 'Tezliklar qoʻshiladi!', color: 'purple' }
      ],
      next: 'Hosilada ham shundaymi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ha! Agar f va g funksiyalarning har biri hosilaga ega boʻlsa, yigʻindining hosilasi hosilalar yigʻindisiga teng. Ayirmaning hosilasi esa hosilalar ayirmasiga teng. Masalan, x kub plyus x kvadratning hosilasi: 3x kvadrat plyus 2x.",
      easy: "Har bir qoʻshiluvchining hosilasini alohida topib, keyin qoʻshamiz yoki ayiramiz. x kubdan 3x kvadrat, x kvadratdan 2x chiqadi.",
      draw: [
        { t: 'title', text: 'Yigʻindi va ayirma' },
        { t: 'formula', x: 8, y: 24, text: '(f + g)′ = f′ + g′' },
        { t: 'text', x: 60, y: 24, text: '1-qoida', size: 's', color: 'blue' },
        { t: 'formula', x: 8, y: 37, text: '(f − g)′ = f′ − g′' },
        { t: 'text', x: 60, y: 37, text: '2-qoida', size: 's', color: 'blue' },
        { t: 'text', x: 6, y: 51, text: 'Misol:', size: 's' },
        { t: 'formula', x: 8, y: 61, text: '(x³ + x²)′ = 3x² + 2x' }
      ],
      next: 'Koeffitsiyent-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bitta daftar narxi 500 soʻmga oshsa, 7 ta daftar 7 marta koʻp, yaʼni 3500 soʻmga qimmatlashadi. Hosilada ham shunday: oʻzgarmas koʻpaytuvchini hosila belgisidan tashqariga chiqarish mumkin. c karra f funksiyaning hosilasi c karra f ning hosilasiga teng. Masalan, 7x kubning hosilasi: 7 karra 3x kvadrat, yaʼni 21x kvadrat.",
      easy: "Oldidagi son shunchaki kutib turadi: avval x kubning hosilasini topamiz, keyin 7 ga koʻpaytiramiz. 7 karra 3x kvadrat — 21x kvadrat.",
      draw: [
        { t: 'title', text: 'Oʻzgarmas koʻpaytuvchi' },
        { t: 'formula', x: 8, y: 24, text: '(c · f)′ = c · f′' },
        { t: 'text', x: 52, y: 24, text: 'c — oʻzgarmas son', size: 's' },
        { t: 'formula', x: 8, y: 38, text: '(7x³)′ = 7 · 3x² = 21x²' },
        { t: 'icon', x: 12, y: 57, emoji: '📒', size: 'm' },
        { t: 'text', x: 22, y: 55, text: '1 daftar: +500 soʻm', size: 's' },
        { t: 'text', x: 22, y: 62, text: '7 daftar: +3500 soʻm', size: 's', color: 'purple' }
      ],
      next: 'Tushundim!'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hisoblashni tezlashtirish uchun hosilalar jadvalidan foydalanamiz. Oʻzgarmasning hosilasi nol, kx plyus b niki k. x ning p darajasiniki p karra x ning p minus 1 darajasi. Sinus x ning hosilasi kosinus x, kosinus x niki esa minus sinus x. Tangens x ning hosilasi 1 boʻlingan kosinus kvadrat x ga.",
      easy: "Jadval — tayyor javoblar roʻyxati. Har safar limit hisoblamaslik uchun shu jadvaldan olamiz. Ayniqsa sinus va kosinusni yodlab oling.",
      draw: [
        { t: 'title', text: 'Hosilalar jadvali' },
        {
          t: 'table',
          x: 8,
          y: 15,
          rows: [
            ['Funksiya', 'Hosila'],
            ['c', '0'],
            ['kx + b', 'k'],
            ['xᵖ', 'p · xᵖ⁻¹'],
            ['sin x', 'cos x'],
            ['cos x', '−sin x'],
            ['tg x', '1 / cos²x']
          ]
        },
        { t: 'icon', x: 76, y: 30, emoji: '📋', size: 'l' },
        { t: 'text', x: 56, y: 52, text: 'Yodlab oling!', color: 'purple' }
      ],
      next: 'Endi birlashtiramiz'
    },
    {
      kind: 'example',
      clear: true,
      say: "Birga yechamiz: f(x) teng 7x kub minus 5x kvadrat plyus 4. Har bir qoʻshiluvchining hosilasini alohida olamiz. 7x kubniki 21x kvadrat. 5x kvadratniki 10x. 4 niki esa nol. Javob: 21x kvadrat minus 10x.",
      easy: "Uchta boʻlak: 7x kub, 5x kvadrat va 4. Har biridan hosila olamiz: 21x kvadrat, 10x va nol. Ishoralarini saqlab yozamiz.",
      draw: [
        { t: 'title', text: '1-misol' },
        { t: 'formula', x: 8, y: 22, text: 'f(x) = 7x³ − 5x² + 4' },
        { t: 'list', x: 6, y: 34, items: ['(7x³)′ = 7 · 3x² = 21x²', '(5x²)′ = 5 · 2x = 10x', '(4)′ = 0'] },
        { t: 'box', id: 'r', x: 6, y: 54, w: 56, h: 11, text: 'f′(x) = 21x² − 10x', color: 'green' }
      ],
      next: 'Yana bittasi!'
    },
    {
      kind: 'example',
      clear: true,
      say: "Endi trigonometrik funksiya: f(x) teng 2 sinus x minus 3 kosinus x plyus x. 2 sinus x ning hosilasi 2 kosinus x. 3 kosinus x niki minus 3 sinus x, oldidagi minus bilan plyus boʻladi. x ning hosilasi 1. Natija: 2 kosinus x plyus 3 sinus x plyus 1. x teng nolda bu 3 ga teng.",
      easy: "Jadvaldan: sinus — kosinusga, kosinus — minus sinusga aylanadi. Minus karra minus — plyus. Oxirida x ning hosilasi 1 qoʻshiladi.",
      draw: [
        { t: 'title', text: '2-misol' },
        { t: 'formula', x: 8, y: 22, text: 'f(x) = 2sin x − 3cos x + x' },
        { t: 'list', x: 6, y: 34, items: ['(2sin x)′ = 2cos x', '(3cos x)′ = −3sin x', '(x)′ = 1'] },
        { t: 'box', id: 'r', x: 6, y: 54, w: 68, h: 11, text: 'f′(x) = 2cos x + 3sin x + 1', color: 'green' },
        { t: 'text', x: 78, y: 61, text: 'f′(0) = 3', size: 's', color: 'purple' }
      ],
      next: 'Oʻzim yechaman!'
    }
  ],
  summary: [
    '(f + g)′ = f′ + g′,   (f − g)′ = f′ − g′.',
    'Oʻzgarmas koʻpaytuvchi hosila belgisidan chiqadi: (c · f)′ = c · f′.',
    'Jadval: (c)′ = 0,  (kx + b)′ = k,  (xᵖ)′ = p · xᵖ⁻¹.',
    '(sin x)′ = cos x,  (cos x)′ = −sin x,  (tg x)′ = 1/cos²x.'
  ],
  questions: [
    {
      id: 'm7q1',
      prompt: 'y = x⁴ − x² + x. y′ = ?',
      hint: 'Har bir qoʻshiluvchining hosilasini alohida toping.',
      explanation: '(x⁴)′ − (x²)′ + (x)′ = 4x³ − 2x + 1.',
      widget: { type: 'expression_answer', props: { answer: '4*x^3 - 2*x + 1', prefix: 'y′ =', keys: ['x', '^', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'm7q2',
      prompt: 'y = 2x³ − 4x² + 5. y′ = ?',
      hint: 'Oʻzgarmas koʻpaytuvchilarni chiqaring, 5 ning hosilasi 0.',
      explanation: '2 · 3x² − 4 · 2x + 0 = 6x² − 8x.',
      widget: { type: 'expression_answer', props: { answer: '6*x^2 - 8*x', prefix: 'y′ =', keys: ['x', '²', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'm7q3',
      prompt: 'f(x) = x² + 5x − 3. f′(1) = ?',
      hint: 'Avval f′(x) ni toping, keyin x = 1 ni qoʻying.',
      explanation: 'f′(x) = 2x + 5, f′(1) = 2 + 5 = 7.',
      widget: { type: 'number_answer', props: { answer: 7 } }
    },
    {
      id: 'm7q4',
      prompt: 'Har bir funksiyani uning hosilasi bilan juftlang.',
      hint: 'Jadvalni eslang: sinus → kosinus, kosinus → minus sinus.',
      explanation: '(sin x)′ = cos x, (cos x)′ = −sin x, (3x + 7)′ = 3, (x⁵)′ = 5x⁴.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'sin x', right: 'cos x' },
            { left: 'cos x', right: '−sin x' },
            { left: '3x + 7', right: '3' },
            { left: 'x⁵', right: '5x⁴' }
          ]
        }
      }
    },
    {
      id: 'm7q5',
      prompt: 'Har bir funksiyani qutisiga joylang: hosilasi 0 ga tengmi yoki yoʻqmi?',
      hint: 'x qatnashmagan son — oʻzgarmas. π, √3 va lg 2 ham shunchaki sonlar.',
      explanation: '7, π, √3, lg 2 — oʻzgarmas sonlar, hosilasi 0. x, x², sin x, 2x + 1 — oʻzgaradi, hosilasi 0 emas.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'zero', label: 'Hosilasi 0' },
            { id: 'nonzero', label: 'Hosilasi 0 emas' }
          ],
          items: [
            { emoji: '', label: '7', bin: 'zero' },
            { emoji: '', label: 'π', bin: 'zero' },
            { emoji: '', label: '√3', bin: 'zero' },
            { emoji: '', label: 'lg 2', bin: 'zero' },
            { emoji: '', label: 'x²', bin: 'nonzero' },
            { emoji: '', label: 'sin x', bin: 'nonzero' },
            { emoji: '', label: '2x + 1', bin: 'nonzero' },
            { emoji: '', label: 'x', bin: 'nonzero' }
          ]
        }
      }
    },
    {
      id: 'm7q6',
      prompt: 'Nuqta s(t) = t³ − 2t² + t qonun boʻyicha harakatlanmoqda (metr, soniya). t = 5 s dagi tezligi necha m/s?',
      hint: 'v(t) = s′(t) = 3t² − 4t + 1.',
      explanation: 'v(5) = 3 · 25 − 4 · 5 + 1 = 75 − 20 + 1 = 56 m/s.',
      widget: { type: 'number_answer', props: { answer: 56, unit: 'm/s' } }
    },
    {
      id: 'm7q7',
      prompt: 'y = 2sin x + 3x². y′ = ?',
      hint: '(sin x)′ = cos x, (x²)′ = 2x.',
      explanation: '2 · cos x + 3 · 2x = 2cos x + 6x.',
      widget: { type: 'expression_answer', props: { answer: '2*cos(x) + 6*x', prefix: 'y′ =', keys: ['x', 'sin', 'cos', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'm7q8',
      prompt: 'f(x) = 7x³ − 5x² + 4 ning hosilasini topish bosqichlarini toʻgʻri tartibda bosing.',
      hint: 'Avval funksiyani boʻlaklarga ajrating.',
      explanation: 'Qoʻshiluvchilarga ajratamiz → koeffitsiyentlarni chiqaramiz → jadvaldan olamiz → javobni yozamiz.',
      widget: {
        type: 'step_order',
        props: {
          steps: [
            'Qoʻshiluvchilarga ajrating: 7x³, 5x², 4',
            'Koeffitsiyentlarni chiqaring: 7 · (x³)′ va 5 · (x²)′',
            'Jadvaldan: (x³)′ = 3x², (x²)′ = 2x, (4)′ = 0',
            'Javob: 21x² − 10x'
          ]
        }
      }
    },
    {
      id: 'm7q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Koeffitsiyentni koʻpaytirishni unutmang; kosinusning hosilasida minus bor.',
      explanation: '(x³ + x)′ = 3x² + 1 — toʻgʻri. (5x²)′ = 10x, 5x emas. (cos x)′ = −sin x. (c · f)′ = c · f′ — toʻgʻri.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '(x³ + x)′ = 3x² + 1', value: true },
            { text: '(5x²)′ = 5x', value: false },
            { text: '(cos x)′ = sin x', value: false },
            { text: '(c · f)′ = c · f′, bunda c — oʻzgarmas', value: true }
          ]
        }
      }
    }
  ]
};
