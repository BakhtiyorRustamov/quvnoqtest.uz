import type { BoardLesson } from './types';

/** Darslik: 8.02 — funksiyalar (SUM, AVERAGE, MIN, MAX, COUNT, ROUND, COUNTIF, SUMIF), IF va ichma-ich IF. */
export const INF_21: BoardLesson = {
  n: 21,
  label: '21',
  part: 10,
  title: 'Elektron jadval: funksiyalar va IF',
  section: '8.02',
  steps: [
    {
      kind: 'hook',
      say: "Sinfdagi test natijalari jadvalda. Oʻqituvchi bir zumda bilmoqchi: ballar yigʻindisi, oʻrtacha ball, eng yuqori va eng past ball. Har birini qoʻlda hisoblash shart emas — buning uchun tayyor funksiyalar bor: SUM, AVERAGE, MAX va MIN.",
      easy: "Funksiya — tayyor hisoblash buyrugʻi. SUM qoʻshadi, AVERAGE oʻrtachani, MAX eng kattasini, MIN eng kichigini topadi.",
      draw: [],
      animTitle: 'Test natijalari',
      anim: {
        type: 'sheet',
        cols: ['Ism', 'Ball', 'Hisob', 'Natija'],
        rows: [
          ['Aziz', 72, 'Yigʻindi', ''],
          ['Malika', 95, 'Oʻrtacha', ''],
          ['Sardor', 48, 'Eng yuqori', ''],
          ['Dilnoza', 85, 'Eng past', '']
        ],
        steps: [
          { cell: 'D2', formula: '=SUM(B2:B5)', refs: ['B2', 'B3', 'B4', 'B5'], result: 300 },
          { cell: 'D3', formula: '=AVERAGE(B2:B5)', refs: ['B2', 'B3', 'B4', 'B5'], result: 75 },
          { cell: 'D4', formula: '=MAX(B2:B5)', refs: ['B3'], result: 95 },
          { cell: 'D5', formula: '=MIN(B2:B5)', refs: ['B4'], result: 48 }
        ]
      },
      next: 'Yana qanday funksiyalar bor?'
    },
    {
      kind: 'explain',
      say: "Koʻp ishlatiladigan funksiyalar. SUM — yigʻindi. AVERAGE — oʻrtacha. MAX va MIN — eng katta va eng kichik. COUNT — sonli kataklar soni. COUNTIF — shartga mos kataklar soni, masalan, 70 dan yuqori ballar nechta. SUMIF — shartga mos qiymatlar yigʻindisi. ROUND — yaxlitlash, masalan, ROUND(3,456; 1) — 3,5. Funksiya nomidan keyin qavs ichida argumentlar — diapazon yoki shart yoziladi.",
      easy: "SUM — qoʻshadi, AVERAGE — oʻrtacha, COUNT — sanaydi, COUNTIF — shart bilan sanaydi, SUMIF — shart bilan qoʻshadi, ROUND — yaxlitlaydi.",
      draw: [],
      animTitle: 'Funksiyalar',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '➕', title: 'SUM', text: 'Yigʻindi: =SUM(B2:B5)' },
          { icon: '➗', title: 'AVERAGE', text: 'Oʻrtacha qiymat' },
          { icon: '⬆️', title: 'MAX / MIN', text: 'Eng katta / eng kichik' },
          { icon: '🔢', title: 'COUNT', text: 'Sonli kataklar soni' },
          { icon: '🎯', title: 'COUNTIF / SUMIF', text: 'Shart bilan sanash / qoʻshish' },
          { icon: '🔘', title: 'ROUND', text: 'Yaxlitlash: 3,456 ➜ 3,5' }
        ]
      },
      next: 'Shart qanday yoziladi?'
    },
    {
      kind: 'example',
      say: "IF funksiyasi shartni tekshiradi va ikki javobdan birini qaytaradi. Uch qismi bor: shart, shart toʻgʻri boʻlsa nima chiqadi, notoʻgʻri boʻlsa nima chiqadi. Masalan: agar ball 56 dan katta yoki teng boʻlsa — «Oʻtdi», aks holda — «Qayta topshiradi». Formulani bir marta yozib, hamma qatorga nusxalaymiz.",
      easy: "IF — «agar … boʻlsa, unda …, aks holda …». Ball 56 va undan yuqori — «Oʻtdi», past — «Qayta topshiradi».",
      draw: [],
      animTitle: 'IF funksiyasi',
      anim: {
        type: 'sheet',
        cols: ['Ism', 'Ball', 'Natija'],
        rows: [
          ['Aziz', 72, ''],
          ['Sardor', 48, ''],
          ['Malika', 95, '']
        ],
        steps: [
          { cell: 'C2', formula: '=IF(B2>=56,"Oʻtdi","Qayta topshiradi")', refs: ['B2'], result: 'Oʻtdi' },
          { cell: 'C3', formula: '=IF(B3>=56,"Oʻtdi","Qayta topshiradi")', refs: ['B3'], result: 'Qayta topshiradi' },
          { cell: 'C4', formula: '=IF(B4>=56,"Oʻtdi","Qayta topshiradi")', refs: ['B4'], result: 'Oʻtdi' }
        ]
      },
      next: 'Baho qoʻyish kerak boʻlsa-chi?'
    },
    {
      kind: 'example',
      say: "Bir nechta variant boʻlsa, IF ichiga yana IF yoziladi — bu ichma-ich IF. Baho qoʻyamiz: 86 va undan yuqori — 5, 71 dan — 4, 56 dan — 3, qolgani — 2. Kompyuter shartlarni yuqoridan pastga tekshiradi. 78 ball uchun: 86 dan kattami? Yoʻq. 71 dan kattami? Ha — demak, 4. Birinchi toʻgʻri shartda toʻxtaydi.",
      easy: "Ichma-ich IF — savollar zanjiri. 78: 86 dan kattami? Yoʻq. 71 dan kattami? Ha. Baho — 4.",
      draw: [],
      animTitle: 'Ichma-ich IF: 78 ball',
      anim: {
        type: 'tree',
        nodes: [
          { id: 'r', label: 'Ball ≥ 86?' },
          { id: 'a', parent: 'r', edge: 'ha', label: 'Baho 5' },
          { id: 'b', parent: 'r', edge: 'yoʻq', label: 'Ball ≥ 71?' },
          { id: 'b1', parent: 'b', edge: 'ha', label: 'Baho 4' },
          { id: 'b2', parent: 'b', edge: 'yoʻq', label: 'Ball ≥ 56?' },
          { id: 'c1', parent: 'b2', edge: 'ha', label: 'Baho 3' },
          { id: 'c2', parent: 'b2', edge: 'yoʻq', label: 'Baho 2' }
        ],
        path: ['r', 'b', 'b1']
      },
      next: 'COUNTIF ni koʻrsating'
    },
    {
      kind: 'example',
      say: "COUNTIF va SUMIF shart bilan ishlaydi. Doʻkonda savdo jadvali: mahsulot turi va summa. COUNTIF bilan «meva» turidagi savdolar nechta ekanini, SUMIF bilan esa faqat mevalardan qancha pul tushganini topamiz. Shart qoʻshtirnoq ichida yoziladi.",
      easy: "COUNTIF — shartga mos nechta? SUMIF — shartga mos qiymatlar yigʻindisi qancha?",
      draw: [],
      animTitle: 'COUNTIF va SUMIF',
      anim: {
        type: 'sheet',
        cols: ['Tur', 'Summa', 'Hisob', 'Natija'],
        rows: [
          ['meva', 30000, 'Mevalar soni', ''],
          ['non', 8000, 'Mevalardan tushum', ''],
          ['meva', 22000, '', ''],
          ['sut', 12000, '', '']
        ],
        steps: [
          { cell: 'D2', formula: '=COUNTIF(A2:A5,"meva")', refs: ['A2', 'A4'], result: 2 },
          { cell: 'D3', formula: '=SUMIF(A2:A5,"meva",B2:B5)', refs: ['B2', 'B4'], result: 52000 }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Funksiyalar: SUM, AVERAGE, MAX, MIN, COUNT, ROUND; argumentlar qavs ichida: =SUM(B2:B5).',
    'IF(shart; toʻgʻri boʻlsa; notoʻgʻri boʻlsa) — shartga qarab ikki javobdan birini qaytaradi.',
    'Ichma-ich IF bir nechta variantni yuqoridan pastga tekshiradi va birinchi toʻgʻri shartda toʻxtaydi.',
    'COUNTIF — shartga mos kataklar soni; SUMIF — shartga mos qiymatlar yigʻindisi.'
  ],
  questions: [
    {
      id: 'i21q1',
      prompt: 'Vazifani funksiya bilan juftlang.',
      hint: 'Qoʻshish, oʻrtacha, eng katta, sanash.',
      explanation: 'Yigʻindi — SUM; oʻrtacha — AVERAGE; eng katta — MAX; sonlar soni — COUNT.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Ballar yigʻindisi' }, right: { label: 'SUM' } },
            { left: { label: 'Oʻrtacha ball' }, right: { label: 'AVERAGE' } },
            { left: { label: 'Eng yuqori ball' }, right: { label: 'MAX' } },
            { left: { label: 'Nechta ball kiritilgan' }, right: { label: 'COUNT' } }
          ]
        }
      }
    },
    {
      id: 'i21q2',
      prompt: 'B2:B6 da ballar: 40, 60, 80, 90, 30. =AVERAGE(B2:B6) natijasi?',
      hint: 'Yigʻindini 5 ga boʻling.',
      explanation: '(40 + 60 + 80 + 90 + 30) : 5 = 300 : 5 = 60.',
      widget: { type: 'number_answer', props: { answer: 60 } }
    },
    {
      id: 'i21q3',
      prompt: 'Ballar: 40, 60, 80, 90, 30. =COUNTIF(B2:B6,">=60") natijasi?',
      hint: '60 va undan kattalarni sanang.',
      explanation: '60, 80, 90 — uchta.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'i21q4',
      prompt: 'B2 dagi ball 50 dan katta boʻlsa «Ha», aks holda «Yoʻq» chiqaradigan formulani yozing.',
      hint: '=IF(shart,"…","…")',
      explanation: '=IF(B2>50,"Ha","Yoʻq")',
      widget: { type: 'text_answer', props: { before: 'C2:', answer: ['=IF(B2>50,"Ha","Yoʻq")', '=IF(B2>50,"Ha","Yo\'q")', '=IF(B2>50,"Ha","Yo‘q")'], width: 22, formula: true } }
    },
    {
      id: 'i21q5',
      prompt: 'Ichma-ich IF: ≥86 — 5, ≥71 — 4, ≥56 — 3, aks holda 2. 70 ball qanday baho oladi?',
      hint: '70 ≥ 71 mi?',
      explanation: '70 < 86, 70 < 71, 70 ≥ 56 — baho 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'i21q6',
      prompt: '=ROUND(7,846;1) natijasi?',
      hint: 'Verguldan keyin bitta raqam qoldiring.',
      explanation: '7,846 ➜ 7,8 (ikkinchi raqam 4 < 5, yuqoriga oshmaydi).',
      widget: { type: 'number_answer', props: { answer: 7.8, tolerance: 0.001 } }
    },
    {
      id: 'i21q7',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'IF nechta qismdan iborat?',
      explanation: 'IF uch qismli; ichma-ich IF birinchi toʻgʻri shartda toʻxtaydi; SUMIF shart bilan qoʻshadi; COUNT matnli kataklarni sanamaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'IF funksiyasi uch qismdan iborat: shart, toʻgʻri, notoʻgʻri.', value: true },
            { text: 'Ichma-ich IF birinchi toʻgʻri shartda toʻxtaydi.', value: true },
            { text: 'SUMIF shartga mos kataklarni sanaydi.', value: false },
            { text: 'COUNT matn yozilgan kataklarni ham sanaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i21q8',
      prompt: 'Turlar: meva, non, meva, sut; summalar: 30 000, 8 000, 22 000, 12 000. =SUMIF(A2:A5,"meva",B2:B5) natijasi?',
      hint: 'Faqat mevalar summasi.',
      explanation: '30 000 + 22 000 = 52 000.',
      widget: { type: 'number_answer', props: { answer: 52000 } }
    },
    {
      id: 'i21q9',
      prompt: 'Qaysi biri funksiya emas?',
      hint: 'Uchtasi hisoblaydi.',
      explanation: 'SUM, AVERAGE, COUNTIF — funksiyalar. $B$2 — absolyut havola.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'SUM' }, { text: 'AVERAGE' }, { text: 'COUNTIF' }, { text: '$B$2', odd: true }] } }
    },
    {
      id: 'i21q10',
      prompt: 'B2:B10 dagi eng kichik qiymatni topuvchi formulani yozing.',
      hint: 'MAX ning teskarisi.',
      explanation: '=MIN(B2:B10)',
      widget: { type: 'text_answer', props: { answer: '=MIN(B2:B10)', width: 14, formula: true } }
    }
  ]
};
