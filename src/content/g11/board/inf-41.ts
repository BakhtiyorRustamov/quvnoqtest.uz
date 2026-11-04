import type { BoardLesson } from './types';

/** Darslik: 15.02–15.03 — loyihalash (DFD, blok-sxema, kiritish shakli, validatsiya), ishlab chiqish va sinov. */
export const INF_41: BoardLesson = {
  n: 41,
  label: '41',
  part: 11,
  title: 'Loyihalash va testlash',
  section: '15.02–15.03',
  steps: [
    {
      kind: 'hook',
      say: "Tahlildan keyin loyihalash boshlanadi. Avval maʼlumot tizim ichida qanday harakatlanishi chiziladi — bu maʼlumotlar oqimi diagrammasi, qisqasi DFD. Unda tashqi obyekt, masalan oʻqituvchi; jarayon, masalan baho qoʻyish; va maʼlumotlar ombori boʻladi. Maʼlumot bir ombordan boshqasiga toʻgʻridan-toʻgʻri oʻtmaydi — oʻrtada albatta jarayon turadi.",
      easy: "DFD: kim beradi ➜ qanday jarayon ➜ qayerda saqlanadi.",
      draw: [],
      animTitle: 'Maʼlumotlar oqimi (DFD)',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🧑‍🏫', label: 'Tashqi obyekt' },
          { icon: '⚙️', label: 'Jarayon' },
          { icon: '🗄️', label: 'Maʼlumotlar ombori' }
        ],
        items: [
          { texts: ['Oʻqituvchi: baho 5', 'Baho qoʻyish', 'Baholar jadvali'] },
          { texts: ['Oʻquvchi: ID 1024', 'Davomatni belgilash', 'Davomat jadvali'] }
        ],
        result: 'Ombordan omborga faqat jarayon orqali'
      },
      next: 'Yana nima loyihalanadi?'
    },
    {
      kind: 'explain',
      say: "Loyihalovchi yana kiritish shakllarini, chiqish hisobotlarini va fayl tuzilmasini — har bir maydonning nomi, turi va uzunligini — chizadi. Har maydon uchun validatsiya qoidasi tanlanadi: diapazon, tur, uzunlik, format, mavjudlik. Masalan, baho 1 dan 5 gacha boʻlishi, sana kun-oy-yil formatida boʻlishi kerak. Validatsiya maʼlumot toʻgʻriligini emas, balki maqbulligini tekshiradi.",
      easy: "Har maydonga qoida: baho 1–5, sana — sana formatida, ism — boʻsh emas.",
      draw: [],
      animTitle: 'Kiritish shakli va validatsiya',
      anim: {
        type: 'form',
        title: 'Baho qoʻyish',
        fields: [
          { label: 'Oʻquvchi ID', value: '1024', check: 'mavjudlik', ok: true, note: 'boʻsh emas' },
          { label: 'Sana', value: '31/02/2026', check: 'format va sana', ok: false, note: 'fevralda 31 kun yoʻq' },
          { label: 'Baho', value: '7', check: 'diapazon 1–5', ok: false, note: '7 > 5' },
          { label: 'Fan', value: 'Informatika', check: 'roʻyxatdan', ok: true, note: 'roʻyxatda bor' }
        ]
      },
      next: 'Qanday sinaymiz?'
    },
    {
      kind: 'explain',
      say: "Dastur yozilgach sinovdan oʻtkaziladi. Sinov uchun uch xil maʼlumot olinadi. Normal maʼlumot qoidaga toʻgʻri keladi va qabul qilinishi kerak: baho 3. Noodatiy maʼlumot qoidaga toʻgʻri kelmaydi va rad etilishi kerak: baho 7 yoki «a». Kritik, yaʼni chegaraviy maʼlumot qabul chegarasining aynan oʻzida: baho 1 va 5. Chegara ichidagi 1 va 5 qabul qilinadi, uning tashqarisidagi 0 va 6 rad etiladi.",
      easy: "Normal — qabul (3). Chegaraviy — chekkada (1, 5). Noodatiy — rad (7, «a»).",
      draw: [],
      animTitle: 'Sinov maʼlumotlari: baho 1–5',
      anim: {
        type: 'sheet',
        cols: ['Kiritilgan', 'Turi', 'Kutilgan', 'Natija'],
        rows: [
          [3, 'normal', 'qabul', ''],
          [5, 'chegaraviy', 'qabul', ''],
          [6, 'noodatiy', 'rad', ''],
          ['a', 'noodatiy', 'rad', '']
        ],
        steps: [
          { cell: 'D2', formula: '=AND(A2>=1,A2<=5)', refs: ['A2'], result: '✓ qabul' },
          { cell: 'D3', formula: '=AND(A3>=1,A3<=5)', refs: ['A3'], result: '✓ qabul' },
          { cell: 'D4', formula: '=AND(A4>=1,A4<=5)', refs: ['A4'], result: '✓ rad etildi' },
          { cell: 'D5', formula: '=ISNUMBER(A5)', refs: ['A5'], result: '✓ rad etildi' }
        ]
      },
      next: 'Sinov rejasi nima?'
    },
    {
      kind: 'explain',
      say: "Sinov rejasi — har bir sinovning roʻyxati: nima sinaladi, qaysi maʼlumot kiritiladi, qanday natija kutiladi, haqiqiy natija qanday chiqdi va sinovdan oʻtdimi. Kutilgan va haqiqiy natija farq qilsa, xato tuzatiladi va sinov qayta oʻtkaziladi — bu takroriy sinov. Reja oldindan yoziladi, shunda hech bir holat esdan chiqmaydi.",
      easy: "Sinov rejasi: nima sinaladi ➜ maʼlumot ➜ kutilgan ➜ haqiqiy ➜ oʻtdimi.",
      draw: [],
      animTitle: 'Sinov rejasi',
      anim: {
        type: 'sheet',
        cols: ['Sinov', 'Kutilgan', 'Haqiqiy', 'Oʻtdimi'],
        rows: [
          ['Baho 4', 'saqlandi', 'saqlandi', ''],
          ['Baho 0', 'xato xabari', 'saqlandi', ''],
          ['Boʻsh maydon', 'xato xabari', 'xato xabari', '']
        ],
        steps: [
          { cell: 'D2', formula: '=B2=C2', refs: ['B2', 'C2'], result: '✓' },
          { cell: 'D3', formula: '=B3=C3', refs: ['B3', 'C3'], result: '✗ tuzat' },
          { cell: 'D4', formula: '=B4=C4', refs: ['B4', 'C4'], result: '✓' }
        ]
      },
      next: 'Sinov turlari?'
    },
    {
      kind: 'explain',
      say: "Sinov turlari. Qora quti, yaʼni funksional sinovda faqat kirish va chiqish tekshiriladi, kod koʻrilmaydi. Oq quti, yaʼni tizimli sinovda kodning har bir yoʻli va mantigʻi tekshiriladi. Alfa sinovni ishlab chiquvchi kompaniya ichida oʻtkazadi. Beta sinovda dastur tanlangan haqiqiy foydalanuvchilarga real maʼlumot bilan beriladi; topilgan xatolar yakuniy versiyagacha tuzatiladi.",
      easy: "Qora quti — faqat kirish va chiqish. Oq quti — kod ichi. Alfa — kompaniya ichida. Beta — haqiqiy foydalanuvchilar.",
      draw: [],
      animTitle: 'Sinov turlari',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '⬛', title: 'Qora quti', text: 'Kirish ➜ chiqish; kod koʻrilmaydi' },
          { icon: '⬜', title: 'Oq quti', text: 'Kodning har yoʻli va mantigʻi' },
          { icon: '🏢', title: 'Alfa sinov', text: 'Kompaniya ichida, sinov maʼlumoti bilan' },
          { icon: '👥', title: 'Beta sinov', text: 'Haqiqiy foydalanuvchilar, real maʼlumot' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'DFD maʼlumot harakatini koʻrsatadi: tashqi obyekt, jarayon, maʼlumotlar ombori; ombordan omborga faqat jarayon orqali.',
    'Loyihalashda kiritish shakllari, hisobotlar, fayl tuzilmasi va validatsiya qoidalari tanlanadi.',
    'Sinov maʼlumotlari: normal (qabul), chegaraviy/kritik (chegarada), noodatiy (rad).',
    'Sinov rejasi: sinov, maʼlumot, kutilgan va haqiqiy natija; farq boʻlsa — tuzatish va qayta sinash.',
    'Qora quti — kirish/chiqish, oq quti — kod ichi; alfa — kompaniya ichida, beta — haqiqiy foydalanuvchilar.'
  ],
  questions: [
    {
      id: 'i41q1',
      prompt: 'Yosh maydoni 12 dan 18 gacha qabul qiladi. Sinov maʼlumotini turi bilan joylang.',
      hint: 'Chegaraning oʻzi — chegaraviy.',
      explanation: '15 — normal; 12 va 18 — chegaraviy; 25 va «oʻn» — noodatiy.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'n', label: 'Normal' },
            { id: 'e', label: 'Chegaraviy' },
            { id: 'a', label: 'Noodatiy' }
          ],
          tiles: [
            { id: 't1', label: '15', bin: 'n' },
            { id: 't2', label: '12', bin: 'e' },
            { id: 't3', label: '18', bin: 'e' },
            { id: 't4', label: '25', bin: 'a' },
            { id: 't5', label: '«oʻn»', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'i41q2',
      prompt: 'Baho 1–5 diapazonida. Qabul qilinadigan eng katta chegaraviy qiymat nechchi?',
      hint: 'Diapazonning yuqori chegarasi.',
      explanation: '5 — chegaraning aynan oʻzi va u qabul qilinadi.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'i41q3',
      prompt: 'DFD elementini taʼrifi bilan juftlang.',
      hint: 'Kim, nima qiladi, qayerda saqlanadi.',
      explanation: 'Tashqi obyekt — maʼlumot beruvchi/oluvchi; jarayon — maʼlumotni qayta ishlaydi; ombor — saqlaydi; oqim — maʼlumot harakati.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Tashqi obyekt' }, right: { label: 'maʼlumot beruvchi yoki oluvchi' } },
            { left: { label: 'Jarayon' }, right: { label: 'maʼlumotni qayta ishlaydi' } },
            { left: { label: 'Maʼlumotlar ombori' }, right: { label: 'maʼlumotni saqlaydi' } },
            { left: { label: 'Maʼlumotlar oqimi' }, right: { label: 'maʼlumot harakati (strelka)' } }
          ]
        }
      }
    },
    {
      id: 'i41q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Qora quti ichini koʻrmaydi.',
      explanation: 'Qora quti — faqat kirish va chiqish; beta — haqiqiy foydalanuvchilar; ombordan omborga toʻgʻridan-toʻgʻri oʻtmaydi; noodatiy maʼlumot rad etilishi kerak.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qora quti sinovida dastur kodi qatorma-qator tekshiriladi.', value: false },
            { text: 'Beta sinovda dasturni haqiqiy foydalanuvchilar sinaydi.', value: true },
            { text: 'DFD da maʼlumot bir ombordan boshqasiga jarayonsiz oʻtishi mumkin.', value: false },
            { text: 'Noodatiy sinov maʼlumoti tizim tomonidan rad etilishi kerak.', value: true }
          ]
        }
      }
    },
    {
      id: 'i41q5',
      prompt: 'Sinov rejasi qatorida boʻlishi kerak boʻlgan ustunlarni bosing.',
      hint: 'Nima, qanday, nima kutiladi, nima chiqdi.',
      explanation: 'Sinov maqsadi, maʼlumot, kutilgan natija va haqiqiy natija. Dasturchining tugʻilgan kuni kerak emas.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Nima sinaladi', match: true },
            { id: 'b', text: 'Sinov maʼlumoti', match: true },
            { id: 'c', text: 'Kutilgan natija', match: true },
            { id: 'd', text: 'Haqiqiy natija', match: true },
            { id: 'e', text: 'Dasturchining tugʻilgan kuni', match: false }
          ]
        }
      }
    },
    {
      id: 'i41q6',
      prompt: 'Qaysi biri sinov maʼlumoti turi emas?',
      hint: 'Uchta tur bor.',
      explanation: 'Normal, chegaraviy va noodatiy — sinov maʼlumoti turlari. Pilot — joriy etish usuli.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Normal' }, { text: 'Chegaraviy' }, { text: 'Noodatiy' }, { text: 'Pilot', odd: true }] } }
    },
    {
      id: 'i41q7',
      prompt: 'Alfa yoki beta sinov?',
      hint: 'Kim sinaydi?',
      explanation: 'Kompaniya ichida va sinov maʼlumoti bilan — alfa; tanlangan mijozlar va real maʼlumot — beta.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'a', label: 'Alfa' },
            { id: 'b', label: 'Beta' }
          ],
          tiles: [
            { id: 't1', label: 'Kompaniya xodimlari sinaydi', bin: 'a' },
            { id: 't2', label: 'Tanlangan mijozlar sinaydi', bin: 'b' },
            { id: 't3', label: 'Sinov maʼlumotlari bilan', bin: 'a' },
            { id: 't4', label: 'Real maʼlumotlar bilan', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'i41q8',
      prompt: 'Parol uzunligi 8 dan 20 belgigacha. Noodatiy (rad etiladigan) eng uzun chegaradan 1 ta ortiq uzunlik nechchi?',
      hint: '20 + 1',
      explanation: '21 belgili parol rad etilishi kerak.',
      widget: { type: 'number_answer', props: { answer: 21, unit: 'belgi' } }
    },
    {
      id: 'i41q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Rangli qutilar.',
      explanation: 'Faqat kirish va chiqishni tekshirish — qora quti; kod ichini tekshirish — oq quti.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Faqat kirish va chiqish tekshirilsa —' }, { blank: 'qora' }, { text: 'quti sinovi. Kodning har yoʻli tekshirilsa —' }, { blank: 'oq' }, { text: 'quti sinovi.' }],
          bank: ['qora', 'oq', 'beta']
        }
      }
    },
    {
      id: 'i41q10',
      prompt: 'Maʼlumotlar oqimi diagrammasining inglizcha qisqartmasini yozing.',
      hint: 'Data Flow Diagram.',
      explanation: 'DFD.',
      widget: { type: 'text_answer', props: { answer: ['DFD'], width: 5 } }
    }
  ]
};
