import type { BoardLesson } from './types';

export const BOB5 = { kicker: 'V bob', title: 'Nisbiylik nazariyasi' };

/** Darslik: Fizika 11, 32-mavzu (124–128-betlar) — maxsus nisbiylik nazariyasi asoslari, tezliklarni qoʻshishning relyativistik qonuni. */
export const FIZ_34: BoardLesson = {
  n: 34,
  label: '32',
  group: BOB5,
  title: 'Maxsus nisbiylik nazariyasi asoslari',
  section: '32-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Poyezdda 100 kilometr soat tezlikda ketyapsiz va oldinga fonar yoqdingiz. Yerdagi odam uchun yorugʻlik tezligi c qoʻshuv 100 boʻladimi? Yoʻq! Tajriba koʻrsatadiki, yorugʻlik tezligi har qanday kuzatuvchi uchun bir xil. Bu oddiy hayotiy tasavvurlarimizni buzadi. 1905-yilda Albert Eynshteyn bu jumboqni hal qilib, nisbiylik nazariyasini yaratdi.",
      easy: "Yorugʻlik tezligi har bir kuzatuvchi uchun bir xil — Eynshteyn, 1905.",
      draw: [
        { t: 'title', text: 'Yorugʻlik jumbogʻi' },
        { t: 'icon', x: 16, y: 34, emoji: '🚄', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🔦', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['c + v emas!', 'yorugʻlik tezligi doim c', 'Eynshteyn, 1905-yil'] }
      ],
      next: 'Galiley almashtirishlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Klassik mexanikada Galiley almashtirishlari ishlatiladi: x teng x shtrix qoʻshuv v t, vaqt esa hamma uchun bir xil: t teng t shtrix. Tezliklar oddiy qoʻshiladi: v x teng v x shtrix qoʻshuv v. Nyuton qonunlari barcha inersial sistemalarda bir xil. Lekin Maykelson va Morli tajribasi yorugʻlik tezligi sistema harakatiga bogʻliq emasligini koʻrsatdi — Galiley formulasi bunga zid!",
      easy: "Galiley: x = x′ + vt, t = t′, tezliklar qoʻshiladi. Yorugʻlik bunga boʻysunmaydi.",
      draw: [
        { t: 'title', text: 'Galiley almashtirishlari' },
        { t: 'formula', x: 6, y: 22, text: 'x = x′ + v t,   t = t′' },
        { t: 'formula', x: 6, y: 38, text: 'vₓ = vₓ′ + v' },
        { t: 'text', x: 6, y: 56, text: 'Maykelson–Morli: c — oʻzgarmas!', color: 'red' }
      ],
      next: 'Eynshteyn postulatlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eynshteyn ikkita postulatga tayandi. Birinchi: yorugʻlikning vakuumdagi tezligi barcha inersial sistemalarda bir xil va manba hamda asbob harakatiga bogʻliq emas. Ikkinchi — nisbiylik tamoyili: barcha fizik qonunlar barcha inersial sistemalarda bir xil koʻrinishga ega. Galiley almashtirishlari oʻrniga Lorens almashtirishlari ishlatiladi; kichik tezliklarda ular Galileynikiga aylanadi.",
      easy: "1) c hamma uchun bir xil. 2) Fizik qonunlar barcha inersial sistemalarda bir xil.",
      draw: [
        { t: 'title', text: 'Eynshteyn postulatlari' },
        { t: 'text', x: 6, y: 28, text: '1) c — barcha sistemalarda bir xil', color: 'blue' },
        { t: 'text', x: 6, y: 42, text: '2) qonunlar — hamma joyda bir xil', color: 'green' },
        { t: 'text', x: 6, y: 58, text: 'Lorens almashtirishlari (β = v / c)', color: 'purple', size: 's' }
      ],
      next: 'Vaqt va uzunlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Lorens almashtirishlaridan hayratlanarli natijalar chiqadi. Harakatdagi soat sekin yuradi: tau teng tau nol boʻlinsin ildiz ostida bir minus beta kvadrat — vaqtning sekinlashishi. Harakat yoʻnalishida jism uzunligi qisqaradi: l teng l nol karra ildiz ostida bir minus beta kvadrat — Lorens qisqarishi. Bu effektlar faqat yorugʻlikka yaqin tezliklarda sezilarli.",
      easy: "τ = τ₀ / √(1 − β²) (vaqt sekinlashadi), l = l₀√(1 − β²) (uzunlik qisqaradi).",
      draw: [
        { t: 'title', text: 'Vaqt va uzunlik nisbiyligi' },
        { t: 'formula', x: 6, y: 22, text: 'τ = τ₀ / √(1 − β²)' },
        { t: 'formula', x: 6, y: 38, text: 'l = l₀ · √(1 − β²)' },
        { t: 'list', x: 6, y: 50, items: ['β = v / c', 'v ≪ c → effektlar sezilmaydi'] }
      ],
      next: 'Tezliklarni qoʻshish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tezliklarni qoʻshishning relyativistik qonuni: v2 teng v1 qoʻshuv v boʻlinsin bir qoʻshuv v1 karra v boʻlinsin c kvadrat. Kichik tezliklarda maxraj birga yaqin va oddiy qoʻshish chiqadi. Agar v1 teng c boʻlsa, natija yana c — yorugʻlik tezligidan oshib boʻlmaydi!",
      easy: "v₂ = (v₁ + v) / (1 + v₁v/c²); c bilan har qanday tezlik qoʻshilsa, yana c.",
      draw: [
        { t: 'title', text: 'Tezliklarni qoʻshish' },
        { t: 'formula', x: 6, y: 24, text: 'v₂ = (v₁ + v) / (1 + v₁ v / c²)' },
        { t: 'list', x: 6, y: 40, items: ['v ≪ c → v₂ ≈ v₁ + v', 'v₁ = c → v₂ = c'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ikki kosmik kema Yerdan qarama-qarshi tomonlarga har biri 0,5 c tezlikda uchmoqda. Birinchisining ikkinchisiga nisbatan tezligi qancha? Klassik javob c boʻlar edi. Relyativistik: 0,5 c qoʻshuv 0,5 c boʻlinsin bir qoʻshuv 0,25 — c boʻlinsin 1,25, yaʼni 0,8 c.",
      easy: "v = (0,5c + 0,5c)/(1 + 0,25) = 0,8c.",
      draw: [
        { t: 'title', text: 'Ikki kema' },
        { t: 'icon', x: 20, y: 30, emoji: '🚀', size: 'm' },
        { t: 'icon', x: 80, y: 30, emoji: '🚀', size: 'm' },
        { t: 'text', x: 42, y: 32, text: '← 0,5c   0,5c →', size: 's' },
        { t: 'formula', x: 6, y: 52, text: 'v = (0,5c + 0,5c) / (1 + 0,25) = 0,8c' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Klassik Galiley almashtirishlari yorugʻlik tezligining doimiyligiga zid keladi (Maykelson–Morli tajribasi).',
    'Eynshteyn postulatlari: c barcha inersial sistemalarda bir xil; fizik qonunlar barcha inersial sistemalarda bir xil.',
    'Natijalar: τ = τ₀/√(1 − β²), l = l₀√(1 − β²), v₂ = (v₁ + v)/(1 + v₁v/c²).'
  ],
  questions: [
    {
      id: 'f34q1',
      prompt: 'Tinch holdagi uzunligi 1 m sterjen 0,6c tezlikda harakatlanmoqda. Uning uzunligi necha cm?',
      hint: 'l = l₀√(1 − β²).',
      explanation: '√(1 − 0,36) = 0,8; 100 · 0,8 = 80 cm.',
      widget: { type: 'number_answer', props: { answer: 80, unit: 'cm' } }
    },
    {
      id: 'f34q2',
      prompt: 'Jism 2,4·10⁸ m/s tezlikda harakatlanmoqda. Harakat yoʻnalishida uzunligi necha foizga kamayadi?',
      hint: 'β = 0,8.',
      explanation: '√(1 − 0,64) = 0,6 → 40 % ga kamayadi.',
      widget: { type: 'number_answer', props: { answer: 40, unit: '%' } }
    },
    {
      id: 'f34q3',
      prompt: '0,99c tezlikdagi kemada Yerda 70 yil oʻtganda necha yil oʻtadi? (butun songacha)',
      hint: 'τ₀ = τ · √(1 − β²).',
      explanation: '70 · √(1 − 0,9801) ≈ 70 · 0,141 ≈ 10 yil.',
      widget: { type: 'number_answer', props: { answer: 9.9, tolerance: 0.5, unit: 'yil' } }
    },
    {
      id: 'f34q4',
      prompt: 'Ikki zarra bir-biriga qarab har biri 5/8 c tezlikda harakatlanmoqda. Nisbiy tezlik c ning qanday qismi? (0,01 gacha)',
      hint: 'v = 2u / (1 + u²/c²).',
      explanation: '1,25 / (1 + 0,390625) ≈ 0,90c.',
      widget: { type: 'number_answer', props: { answer: 0.9, tolerance: 0.01, unit: 'c' } }
    },
    {
      id: 'f34q5',
      prompt: 'Jismning boʻylama oʻlchami 20 % ga kamaydi. Uning tezligi qancha?',
      hint: '√(1 − β²) = 0,8.',
      explanation: 'β² = 0,36 → β = 0,6, v = 0,6c.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0,2c', '0,6c', '0,4c', '0,7c'], answerIndex: 1 } }
    },
    {
      id: 'f34q6',
      prompt: 'Yorugʻlik tezligiga har qanday tezlik relyativistik qoʻshilsa, natija qanday boʻladi?',
      hint: 'v₁ = c ni formulaga qoʻying.',
      explanation: 'Yana c — yorugʻlik tezligidan oshib boʻlmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['c dan katta', 'c ga teng', 'c dan kichik', 'nolga teng'], answerIndex: 1 } }
    },
    {
      id: 'f34q7',
      prompt: 'Formulani hodisa bilan moslang.',
      hint: 'Vaqt choʻziladi, uzunlik qisqaradi.',
      explanation: 'τ₀/√(1 − β²) — vaqt sekinlashishi; l₀√(1 − β²) — Lorens qisqarishi; x′ + vt — Galiley almashtirishi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'τ = τ₀ / √(1 − β²)', right: 'vaqt sekinlashishi' },
            { left: 'l = l₀ √(1 − β²)', right: 'uzunlik qisqarishi' },
            { left: 'x = x′ + vt', right: 'Galiley almashtirishi' }
          ]
        }
      }
    },
    {
      id: 'f34q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Nisbiylik nazariyasi Nyutonni rad etmaydi.',
      explanation: 'Kichik tezliklarda Nyuton mexanikasi toʻgʻri; c manbaga bogʻliq emas; harakatdagi soat sekin yuradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Nisbiylik nazariyasi Nyuton mexanikasini butunlay rad etadi.', value: false },
            { text: 'Yorugʻlik tezligi manba harakatiga bogʻliq emas.', value: true },
            { text: 'Harakatdagi soat qoʻzgʻalmas soatga nisbatan sekin yuradi.', value: true },
            { text: 'Harakat yoʻnalishida jism uzunligi ortadi.', value: false }
          ]
        }
      }
    }
  ]
};
