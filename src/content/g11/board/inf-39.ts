import type { BoardLesson } from './types';

/** Darslik: 14.04–14.08 — kritik yoʻl tahlili, Gantt diagrammasi, falokatdan keyin tiklanish, prototiplash, CAD/CAM. */
export const INF_39: BoardLesson = {
  n: 39,
  label: '39',
  part: 11,
  title: 'Gantt, kritik yoʻl va CAD/CAM',
  section: '14.04–14.08',
  steps: [
    {
      kind: 'hook',
      say: "Loyihada baʼzi vazifalar bir-biriga bogʻliq: robotni yigʻmasdan uni sinab boʻlmaydi. Kritik yoʻl tahlili — CPA — eng uzun bogʻliq vazifalar zanjirini topadi. Bu zanjirdagi vazifalar kritik: ulardan birortasi bir kun kechiksa, butun loyiha bir kun kechikadi. Kritik boʻlmagan vazifada esa zaxira vaqt bor. Gantt diagrammasi vazifalarni vaqt oʻqida gorizontal ustunlar bilan koʻrsatadi.",
      easy: "Kritik yoʻl — eng uzun zanjir. Undagi vazifa kechiksa, butun loyiha kechikadi.",
      draw: [],
      animTitle: 'Gantt diagrammasi va kritik yoʻl',
      anim: {
        type: 'gantt',
        unit: 'kun',
        tasks: [
          { id: 'A', label: 'A: Reja tuzish', start: 0, dur: 3, critical: true },
          { id: 'B', label: 'B: Afisha', start: 3, dur: 2 },
          { id: 'C', label: 'C: Robot yigʻish', start: 3, dur: 4, critical: true },
          { id: 'D', label: 'D: Sinov', start: 7, dur: 2, critical: true }
        ]
      },
      next: 'Qanday hisoblanadi?'
    },
    {
      kind: 'explain',
      say: "Hisoblash: A uch kun. B va C ikkalasi A dan keyin boshlanadi. B ikki kun, C toʻrt kun. D esa C dan keyin, ikki kun. Yoʻllar: A, B — besh kun; A, C, D — toʻqqiz kun. Eng uzuni toʻqqiz kun — bu loyihaning eng qisqa muddati, A, C, D esa kritik yoʻl. B ning zaxira vaqti toʻqqiz minus besh — toʻrt kun: u toʻrt kungacha kechiksa ham, loyiha muddati oʻzgarmaydi.",
      easy: "A+C+D = 3+4+2 = 9 kun — kritik yoʻl. A+B = 5 kun, demak B da 4 kun zaxira bor.",
      draw: [],
      animTitle: 'Yoʻllarni hisoblash',
      anim: {
        type: 'sheet',
        cols: ['Yoʻl', 'Vazifalar', 'Kunlar', 'Jami'],
        rows: [
          ['1-yoʻl', 'A ➜ B', '3 + 2', ''],
          ['2-yoʻl', 'A ➜ C ➜ D', '3 + 4 + 2', ''],
          ['B zaxirasi', '', '', '']
        ],
        steps: [
          { cell: 'D2', formula: '=3+2', refs: ['C2'], result: 5 },
          { cell: 'D3', formula: '=3+4+2', refs: ['C3'], result: '9 ⚑ kritik' },
          { cell: 'D4', formula: '=D3-D2', refs: ['D2', 'D3'], result: '4 kun' }
        ]
      },
      next: 'Falokat boʻlsa-chi?'
    },
    {
      kind: 'explain',
      say: "Baʼzan falokat yuz beradi: elektr uziladi, suv bosadi, yongʻin chiqadi, maʼlumot oʻgʻirlanadi yoki zararli dastur tushadi. Shuning uchun falokatdan keyingi tiklanish rejasi tuziladi. Avval xavf baholanadi: xavf teng imkoniyat koʻpaytirilgan taʼsirga. Qaysi xavf eng katta boʻlsa, unga birinchi tayyorlaniladi. Rejada zaxira nusxalarni tiklash, apparatni almashtirish va dasturlarni qayta oʻrnatish yoziladi, reja esa muntazam sinovdan oʻtkaziladi.",
      easy: "Xavf = imkoniyat × taʼsir. Eng katta xavfga birinchi tayyorlanamiz. Reja sinab koʻriladi.",
      draw: [],
      animTitle: 'Xavfni baholash',
      anim: {
        type: 'sheet',
        cols: ['Xavf', 'Imkoniyat (1–5)', 'Taʼsir (1–5)', 'Xavf darajasi'],
        rows: [
          ['Elektr uzilishi', 4, 3, ''],
          ['Yongʻin', 1, 5, ''],
          ['Zararli dastur', 3, 4, '']
        ],
        steps: [
          { cell: 'D2', formula: '=B2*C2', refs: ['B2', 'C2'], result: 12 },
          { cell: 'D3', formula: '=B3*C3', refs: ['B3', 'C3'], result: 5 },
          { cell: 'D4', formula: '=B4*C4', refs: ['B4', 'C4'], result: 12 }
        ]
      },
      next: 'Reja nimadan iborat?'
    },
    {
      kind: 'explain',
      say: "Tiklanish rejasida ikki muhim vaqt bor. Tiklanish nuqtasi maqsadi — qaysi paytdagi maʼlumot tiklanishi kerak, yaʼni qancha maʼlumot yoʻqotishga chidash mumkin; shunga qarab zaxira nusxa qanchalik tez-tez olinadi. Tiklanishning maqsadli vaqti — tizim qancha vaqtda yana ishlashi kerak. Parolni biladigan kamida ikki kishi boʻlishi yoki uni seyfda saqlash ham reja qismi.",
      easy: "Zaxira nusxa ➜ falokat ➜ tiklash ➜ tekshirish. Reja oldindan sinab koʻriladi.",
      draw: [],
      animTitle: 'Falokatdan keyin tiklanish',
      anim: {
        type: 'flow',
        stations: [
          { icon: '💾', label: 'Zaxira nusxa' },
          { icon: '🔥', label: 'Falokat' },
          { icon: '♻️', label: 'Tiklash' }
        ],
        items: [
          { texts: ['har kuni 22:00 da', 'server ishdan chiqdi', 'nusxadan tiklandi'] },
          { texts: ['boshqa binoda saqlanadi', 'apparat almashtiriladi', 'dasturlar qayta oʻrnatildi'] },
          { texts: ['sinov: oyiga bir marta', 'xodimlarga xabar', 'fayllar ochilishi tekshirildi'] }
        ],
        result: 'Ish qisqa vaqtda tiklandi'
      },
      next: 'Prototip nima?'
    },
    {
      kind: 'explain',
      say: "Prototip — tayyor tizimdan oldin yaratiladigan maket. Mijoz uni sinab koʻradi va fikr bildiradi, xatolar arzon paytda tuzatiladi. Evolyutsion prototip bosqichma-bosqich yaxshilanadi va oxirida haqiqiy tizimga aylanadi. Bir martalik, yaʼni tezkor prototip faqat talablarni aniqlash uchun tez yasaladi, keyin tashlab yuboriladi. Kamchiligi: talablarni tahlil qilishda shoshilish va foydalanuvchi har safar yangi xususiyat soʻrab qolishi mumkin.",
      easy: "Evolyutsion prototip — yaxshilanib, tayyor tizimga aylanadi. Bir martalik — sinab koʻriladi va tashlanadi.",
      draw: [],
      animTitle: 'Prototip turlari',
      anim: {
        type: 'compare',
        left: { icon: '🌱', title: 'Evolyutsion', items: ['Har safar yaxshilanadi', 'Har versiya ishlaydi', 'Oxirida tayyor tizim', 'Takroriy (iterativ)'] },
        right: { icon: '🗑️', title: 'Bir martalik (tezkor)', items: ['Tez yasaladi', 'Faqat talablarni bilish uchun', 'Keyin tashlab yuboriladi', 'Tizim yangidan yoziladi'] }
      },
      next: 'CAD/CAM nima?'
    },
    {
      kind: 'explain',
      say: "CAD — kompyuter yordamida loyihalash: muhandis detalning chizmasi va uch oʻlchamli modelini kompyuterda yaratadi, oʻlchamni oʻzgartirish va sinab koʻrish oson. CAM — kompyuter yordamida ishlab chiqarish: CAD fayli stanok, lazerli kesgich yoki uch oʻlchamli printer uchun buyruqlarga aylantiriladi va detal avtomatik tayyorlanadi. Natijada mahsulot aniq, tez va bir xil sifatda chiqadi.",
      easy: "CAD — kompyuterda chizish. CAM — chizma boʻyicha stanok detal yasaydi.",
      draw: [],
      animTitle: 'CAD dan CAM ga',
      anim: {
        type: 'flow',
        stations: [
          { icon: '📐', label: 'CAD: loyiha' },
          { icon: '💾', label: 'Buyruqlar fayli' },
          { icon: '🏭', label: 'CAM: stanok' }
        ],
        items: [
          { texts: ['3D model chiziladi', 'oʻlcham: 40 × 20 mm', 'detal kesiladi'] },
          { texts: ['sinov: mustahkamlik', 'asbob yoʻli hisoblanadi', '1000 ta bir xil detal'] }
        ],
        result: 'Aniq, tez, bir xil sifat'
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Kritik yoʻl — bogʻliq vazifalarning eng uzun zanjiri; uning uzunligi loyihaning eng qisqa muddati.',
    'Kritik vazifa kechiksa, butun loyiha kechikadi; boshqa vazifalarda zaxira vaqt bor.',
    'Gantt diagrammasi vazifalarni vaqt oʻqida gorizontal ustunlar bilan koʻrsatadi.',
    'Falokatdan keyingi tiklanish: xavf = imkoniyat × taʼsir; zaxira nusxa, tiklash rejasi va uni sinash.',
    'Prototip: evolyutsion (tayyor tizimga aylanadi) va bir martalik (tashlab yuboriladi).',
    'CAD — kompyuterda loyihalash, CAM — kompyuter boshqaradigan ishlab chiqarish.'
  ],
  questions: [
    {
      id: 'i39q1',
      prompt: 'A — 2 kun, B (A dan keyin) — 3 kun, C (A dan keyin) — 5 kun, D (C dan keyin) — 1 kun. Loyiha eng kamida necha kun davom etadi?',
      hint: 'Eng uzun yoʻlni toping.',
      explanation: 'A ➜ B = 5, A ➜ C ➜ D = 2 + 5 + 1 = 8. Eng uzuni 8 kun.',
      widget: { type: 'number_answer', props: { answer: 8, unit: 'kun' } }
    },
    {
      id: 'i39q2',
      prompt: 'Oldingi masalada B vazifaning zaxira vaqti necha kun?',
      hint: '8 − (A + B)',
      explanation: '8 − (2 + 3) = 3 kun.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'kun' } }
    },
    {
      id: 'i39q3',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Kritik vazifada zaxira yoʻq.',
      explanation: 'Kritik vazifa kechiksa, loyiha kechikadi; zaxirali vazifa biroz kechiksa muddat oʻzgarmaydi; Gantt — gorizontal ustunlar; bir martalik prototip tashlab yuboriladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kritik yoʻldagi vazifa kechiksa, butun loyiha kechikadi.', value: true },
            { text: 'Zaxira vaqti bor vazifa biroz kechiksa ham, loyiha muddati oʻzgarmaydi.', value: true },
            { text: 'Gantt diagrammasida vazifalar aylana sektorlar bilan koʻrsatiladi.', value: false },
            { text: 'Bir martalik prototip oxirida tayyor tizimga aylanadi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i39q4',
      prompt: 'Xavfning imkoniyati 4, taʼsiri 5. Xavf darajasi qancha?',
      hint: 'Imkoniyat × taʼsir',
      explanation: '4 × 5 = 20.',
      widget: { type: 'number_answer', props: { answer: 20 } }
    },
    {
      id: 'i39q5',
      prompt: 'Qaysi biri falokat (xavf) emas?',
      hint: 'Ishni toʻxtatib qoʻyadigan hodisalar.',
      explanation: 'Elektr uzilishi, suv toshqini va zararli dastur — xavflar. Gantt diagrammasi — rejalashtirish vositasi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Elektr uzilishi' }, { text: 'Suv toshqini' }, { text: 'Zararli dastur' }, { text: 'Gantt diagrammasi', odd: true }] } }
    },
    {
      id: 'i39q6',
      prompt: 'Evolyutsion yoki bir martalik prototip?',
      hint: 'Saqlanadimi yoki tashlanadimi?',
      explanation: 'Bosqichma-bosqich yaxshilanib tayyor tizimga aylanish — evolyutsion; tez yasalib, talablar aniqlangach tashlanishi — bir martalik.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'e', label: 'Evolyutsion' },
            { id: 't', label: 'Bir martalik' }
          ],
          tiles: [
            { id: 't1', label: 'Tayyor tizimga aylanadi', bin: 'e' },
            { id: 't2', label: 'Keyin tashlab yuboriladi', bin: 't' },
            { id: 't3', label: 'Har versiya oldingisidan yaxshi', bin: 'e' },
            { id: 't4', label: 'Faqat talablarni aniqlash uchun', bin: 't' }
          ]
        }
      }
    },
    {
      id: 'i39q7',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'D — design, M — manufacture.',
      explanation: 'CAD — kompyuterda loyihalash; CAM — kompyuter boshqaradigan ishlab chiqarish; CPA — kritik yoʻl tahlili; prototip — tizim maketi.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'CAD' }, right: { label: 'kompyuterda loyihalash' } },
            { left: { label: 'CAM' }, right: { label: 'kompyuter bilan ishlab chiqarish' } },
            { left: { label: 'CPA' }, right: { label: 'kritik yoʻl tahlili' } },
            { left: { label: 'Prototip' }, right: { label: 'tizimning maketi' } }
          ]
        }
      }
    },
    {
      id: 'i39q8',
      prompt: 'Falokatdan keyingi tiklanish rejasiga kiradiganlarni bosing.',
      hint: 'Maʼlumot, apparat, dastur, sinov.',
      explanation: 'Zaxira nusxadan tiklash, apparatni almashtirish, dasturlarni qayta oʻrnatish va rejani sinash — rejaga kiradi. Afisha chizish — kirmaydi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Zaxira nusxadan tiklash', match: true },
            { id: 'b', text: 'Apparatni almashtirish', match: true },
            { id: 'c', text: 'Dasturlarni qayta oʻrnatish', match: true },
            { id: 'd', text: 'Rejani muntazam sinash', match: true },
            { id: 'e', text: 'Tadbir afishasini chizish', match: false }
          ]
        }
      }
    },
    {
      id: 'i39q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Eng uzun zanjir.',
      explanation: 'Eng uzun bogʻliq vazifalar zanjiri — kritik yoʻl; xavf = imkoniyat × taʼsir.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Eng uzun bogʻliq vazifalar zanjiri —' }, { blank: 'kritik' }, { text: 'yoʻl. Xavf = imkoniyat ×' }, { blank: 'taʼsir' }, { text: '.' }],
          bank: ['kritik', 'taʼsir', 'zaxira']
        }
      }
    },
    {
      id: 'i39q10',
      prompt: 'Kompyuterda loyihalangan detal boʻyicha stanokni boshqarib ishlab chiqarish qisqartmasini yozing.',
      hint: 'Computer-aided manufacture.',
      explanation: 'CAM.',
      widget: { type: 'text_answer', props: { answer: ['CAM'], width: 5 } }
    }
  ]
};
