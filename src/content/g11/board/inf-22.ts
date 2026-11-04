import type { BoardLesson } from './types';

/** Darslik: 8.02 — qidiruv funksiyalari (VLOOKUP, HLOOKUP, MATCH), validatsiya qoidalari va sinov rejasi. */
export const INF_22: BoardLesson = {
  n: 22,
  label: '22',
  part: 10,
  title: 'Elektron jadval: qidiruv va tekshiruv',
  section: '8.02',
  steps: [
    {
      kind: 'hook',
      say: "Kassir mahsulot kodini kiritadi — A103 — va narx oʻzi chiqadi. Qanday? Narxlar roʻyxatidan kod boʻyicha qidiriladi. Buning uchun VLOOKUP funksiyasi bor: u jadvalning birinchi ustunidan qiymatni topadi va oʻsha qatordagi kerakli ustundan javobni qaytaradi.",
      easy: "VLOOKUP — jadvaldan qidiruvchi. Kodni birinchi ustundan topadi va yonidagi narxni beradi.",
      draw: [],
      animTitle: 'Kod boʻyicha narx',
      anim: {
        type: 'sheet',
        cols: ['Kod', 'Mahsulot', 'Narx'],
        rows: [
          ['A101', 'Olma', 18000],
          ['A102', 'Non', 4000],
          ['A103', 'Sut', 12000],
          ['Qidiruv:', 'A103', '']
        ],
        steps: [{ cell: 'C5', formula: '=VLOOKUP(B5,A2:C4,3,FALSE)', refs: ['B5', 'A4', 'C4'], result: 12000 }]
      },
      next: 'Qanday yoziladi?'
    },
    {
      kind: 'explain',
      say: "VLOOKUP toʻrt qismdan iborat. Birinchi — nima qidiramiz: B5 dagi kod. Ikkinchi — qayerdan: A2 dan C4 gacha jadval, qidiruv faqat uning birinchi ustunida boʻladi. Uchinchi — nechanchi ustundan javob olamiz: 3 — narx ustuni. Toʻrtinchi — FALSE: faqat aniq moslik. HLOOKUP xuddi shunday, lekin jadval gorizontal, qidiruv birinchi qatorda. MATCH esa qiymat nechanchi oʻrinda turganini qaytaradi.",
      easy: "VLOOKUP(nima, qayerdan, nechanchi ustun, FALSE). HLOOKUP — yotiq jadval uchun. MATCH — oʻrnini topadi.",
      draw: [],
      animTitle: 'VLOOKUP qismlari',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🔎', label: 'Nima?' },
          { icon: '▦', label: 'Qayerdan?' },
          { icon: '#️⃣', label: 'Ustun' },
          { icon: '🎯', label: 'Moslik' }
        ],
        items: [{ texts: ['B5 (A103)', 'A2:C4', '3 — narx', 'FALSE — aniq'] }],
        result: '=VLOOKUP(B5, A2:C4, 3, FALSE) ➜ 12 000'
      },
      next: 'TRUE nima qiladi?'
    },
    {
      kind: 'example',
      say: "Toʻrtinchi qism TRUE boʻlsa — taxminiy moslik: aniq qiymat boʻlmasa, undan kichik eng yaqin qiymat olinadi. Bu chegaralar jadvali uchun juda qulay. Chap ustunda ballar chegarasi: 0, 56, 71, 86, yonida baho. 78 ball jadvalda yoʻq, lekin 71 dan katta va 86 dan kichik — demak, 71 qatori olinadi va baho 4. Bunda birinchi ustun oʻsish tartibida boʻlishi shart.",
      easy: "TRUE — «eng yaqin kichigini ol». 78 uchun 71 qatori olinadi — baho 4. Ichma-ich IF dan ancha qisqa.",
      draw: [],
      animTitle: 'Taxminiy qidiruv: 78 ball',
      anim: {
        type: 'sheet',
        cols: ['Chegara', 'Baho', 'Ball', 'Baho?'],
        rows: [
          [0, 2, 78, ''],
          [56, 3, '', ''],
          [71, 4, '', ''],
          [86, 5, '', '']
        ],
        steps: [{ cell: 'D2', formula: '=VLOOKUP(C2,A2:B5,2,TRUE)', refs: ['C2', 'A4', 'B4'], result: 4 }]
      },
      next: 'Xato kiritishdan qanday himoyalanamiz?'
    },
    {
      kind: 'explain',
      say: "Elektron jadvalda ham validatsiya qoidalari qoʻyiladi. Masalan, baho katagiga faqat 0 dan 100 gacha butun son, sinf katagiga faqat roʻyxatdagi qiymat — ochiladigan roʻyxat orqali. Kirish xabari foydalanuvchiga nima yozish kerakligini aytadi, xato xabari esa notoʻgʻri qiymatni rad etadi. Kuzating: qoida har bir kiritilgan qiymatni tekshiradi.",
      easy: "Validatsiya qoidasi notoʻgʻri qiymatni katakka kiritishga yoʻl qoʻymaydi: 0–100 dan tashqarisi, harf yoki roʻyxatda yoʻq qiymat rad etiladi.",
      draw: [],
      animTitle: 'Baho katagi: 0–100 butun son',
      anim: {
        type: 'form',
        title: '✅ Validatsiya qoidasi',
        fields: [
          { label: 'Kiritildi', value: '87', check: 'Butun son, 0–100', ok: true, note: 'qabul qilindi' },
          { label: 'Kiritildi', value: '105', check: 'Diapazon', ok: false, note: '100 dan katta — rad etildi' },
          { label: 'Kiritildi', value: 'besh', check: 'Tur', ok: false, note: 'son emas — rad etildi' },
          { label: 'Sinf', value: '10-B', check: 'Roʻyxat', ok: true, note: 'roʻyxatda bor' }
        ]
      },
      next: 'Qoidani qanday sinaymiz?'
    },
    {
      kind: 'example',
      say: "Qoidani sinash uchun sinov rejasi tuziladi. Unda uch xil maʼlumot boʻladi. Normal — qabul qilinishi kerak boʻlgan oddiy qiymat: 45. Chegaraviy, yaʼni ekstremal — eng chekka toʻgʻri qiymatlar: 0 va 100. Notoʻgʻri, yaʼni anormal — rad etilishi kerak boʻlganlar: minus 5, 150 yoki matn. Har biri uchun kutilgan natija yoziladi va haqiqiy natija bilan solishtiriladi.",
      easy: "Sinov rejasi: oddiy qiymat (45), chekka qiymatlar (0 va 100) va notoʻgʻri qiymatlar (−5, 150). Har birida kutilgan va haqiqiy natija solishtiriladi.",
      draw: [],
      animTitle: 'Sinov rejasi',
      anim: {
        type: 'sheet',
        cols: ['Qiymat', 'Turi', 'Kutilgan', 'Natija'],
        rows: [
          [45, 'normal', 'qabul', ''],
          [100, 'chegaraviy', 'qabul', ''],
          [-5, 'notoʻgʻri', 'rad', ''],
          ['abc', 'notoʻgʻri', 'rad', '']
        ],
        steps: [
          { cell: 'D2', formula: 'sinov: 45', refs: ['A2'], result: 'qabul ✓' },
          { cell: 'D3', formula: 'sinov: 100', refs: ['A3'], result: 'qabul ✓' },
          { cell: 'D4', formula: 'sinov: −5', refs: ['A4'], result: 'rad ✓' },
          { cell: 'D5', formula: 'sinov: abc', refs: ['A5'], result: 'rad ✓' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'VLOOKUP(nima; qayerdan; ustun raqami; FALSE/TRUE) — jadvalning birinchi ustunidan qidiradi.',
    'FALSE — aniq moslik; TRUE — taxminiy (eng yaqin kichik qiymat, ustun oʻsish tartibida).',
    'HLOOKUP — gorizontal jadvalda qidiradi; MATCH — qiymatning oʻrnini qaytaradi.',
    'Validatsiya qoidalari: diapazon, tur, roʻyxat; kirish va xato xabarlari.',
    'Sinov rejasi: normal, chegaraviy (ekstremal) va notoʻgʻri (anormal) maʼlumotlar, kutilgan va haqiqiy natija.'
  ],
  questions: [
    {
      id: 'i22q1',
      prompt: 'VLOOKUP qismlarini juftlang: =VLOOKUP(B5,A2:C4,3,FALSE)',
      hint: 'Nima, qayerdan, qaysi ustun, qanday moslik.',
      explanation: 'B5 — qidiriladigan qiymat; A2:C4 — jadval; 3 — javob ustuni; FALSE — aniq moslik.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'B5' }, right: { label: 'qidiriladigan qiymat' } },
            { left: { label: 'A2:C4' }, right: { label: 'qidiruv jadvali' } },
            { left: { label: '3' }, right: { label: 'javob olinadigan ustun' } },
            { left: { label: 'FALSE' }, right: { label: 'faqat aniq moslik' } }
          ]
        }
      }
    },
    {
      id: 'i22q2',
      prompt: 'Jadval: A101 Olma 18 000; A102 Non 4 000; A103 Sut 12 000. =VLOOKUP("A102",A2:C4,3,FALSE) natijasi?',
      hint: 'A102 qatoridagi 3-ustun.',
      explanation: 'A102 — Non, narxi 4 000.',
      widget: { type: 'number_answer', props: { answer: 4000 } }
    },
    {
      id: 'i22q3',
      prompt: 'Xuddi shu jadvalda 2-ustundan javob olsak, =VLOOKUP("A103",A2:C4,2,FALSE) nima qaytaradi?',
      hint: '2-ustun — mahsulot nomi.',
      explanation: 'A103 qatori, 2-ustun — Sut.',
      widget: { type: 'text_answer', props: { answer: 'Sut', width: 6 } }
    },
    {
      id: 'i22q4',
      prompt: 'Chegaralar: 0 — 2, 56 — 3, 71 — 4, 86 — 5. TRUE bilan 90 ball qanday baho oladi?',
      hint: '90 dan kichik eng yaqin chegara.',
      explanation: '90 ≥ 86 — baho 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'i22q5',
      prompt: 'Qoida: butun son, 1 dan 10 gacha. Sinov maʼlumotlarini turlarga ajrating.',
      hint: 'Oddiy, chekka yoki notoʻgʻri?',
      explanation: '5 — normal; 1 va 10 — chegaraviy; 0 va «besh» — notoʻgʻri.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'n', label: 'Normal' },
            { id: 'e', label: 'Chegaraviy' },
            { id: 'a', label: 'Notoʻgʻri' }
          ],
          tiles: [
            { id: 't1', label: '5', bin: 'n' },
            { id: 't2', label: '1', bin: 'e' },
            { id: 't3', label: '10', bin: 'e' },
            { id: 't4', label: '0', bin: 'a' },
            { id: 't5', label: 'besh', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'i22q6',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'TRUE bilan qidirganda ustun qanday boʻlishi kerak?',
      explanation: 'TRUE uchun birinchi ustun oʻsish tartibida boʻlishi shart; VLOOKUP birinchi ustundan qidiradi; HLOOKUP gorizontal; sinov rejasida kutilgan natija oldindan yoziladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'TRUE bilan qidirishda birinchi ustun oʻsish tartibida boʻlishi kerak.', value: true },
            { text: 'VLOOKUP jadvalning oxirgi ustunidan qidiradi.', value: false },
            { text: 'HLOOKUP gorizontal jadvalda qidiradi.', value: true },
            { text: 'Sinov rejasida kutilgan natija sinovdan keyin yoziladi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i22q7',
      prompt: 'Qoida: 0 dan 100 gacha butun son. Qaysi qiymatlar qabul qilinadi?',
      hint: 'Chegaralar ham kiradi.',
      explanation: '0, 57 va 100 — qabul. 101 va 7,5 — rad etiladi (diapazondan tashqari / butun emas).',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: '0', match: true },
            { id: 'b', text: '57', match: true },
            { id: 'c', text: '100', match: true },
            { id: 'd', text: '101', match: false },
            { id: 'e', text: '7,5', match: false }
          ]
        }
      }
    },
    {
      id: 'i22q8',
      prompt: 'Qaysi biri qidiruv funksiyasi emas?',
      hint: 'Uchtasi jadvaldan qiymat topadi.',
      explanation: 'VLOOKUP, HLOOKUP, MATCH — qidiruv. ROUND — yaxlitlash.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'VLOOKUP' }, { text: 'HLOOKUP' }, { text: 'MATCH' }, { text: 'ROUND', odd: true }] } }
    },
    {
      id: 'i22q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Aniq yoki taxminiy.',
      explanation: 'Mahsulot kodi uchun aniq moslik — FALSE, baho chegaralari uchun taxminiy — TRUE.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Mahsulot kodini qidirishda' }, { blank: 'FALSE' }, { text: ', baho chegaralarida esa' }, { blank: 'TRUE' }, { text: 'ishlatiladi.' }],
          bank: ['FALSE', 'TRUE', 'SUM']
        }
      }
    },
    {
      id: 'i22q10',
      prompt: 'A101 kodini A2:C4 jadvaldan topib, 3-ustundagi narxni aniq moslik bilan qaytaruvchi formulani yozing.',
      hint: '=VLOOKUP("A101",…,…,…)',
      explanation: '=VLOOKUP("A101",A2:C4,3,FALSE)',
      widget: { type: 'text_answer', props: { answer: ['=VLOOKUP("A101",A2:C4,3,FALSE)', '=VLOOKUP("A101",A2:C4,3,0)'], width: 28, formula: true } }
    }
  ]
};
