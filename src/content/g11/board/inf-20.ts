import type { BoardLesson } from './types';

/** Darslik: 8.01–8.02 — elektron jadval: kataklar, maʼlumot turlari, formulalar, nisbiy va absolyut havolalar, nomlangan katak, formatlash. */
export const INF_20: BoardLesson = {
  n: 20,
  label: '20',
  part: 10,
  title: 'Elektron jadval: katak va havolalar',
  section: '8.01–8.02',
  steps: [
    {
      kind: 'hook',
      say: "Doʻkon cheki: olma, non va sut. Har bir qatorda narxni soniga koʻpaytirib jamini topamiz, oxirida hammasini qoʻshamiz. Qoʻlda hisoblasak, xato qilish oson. Elektron jadvalda esa bir marta formula yozamiz — qolganini kompyuter hisoblaydi. Narx oʻzgarsa, jami ham oʻzi yangilanadi.",
      easy: "Elektron jadval — oʻzi hisoblaydigan jadval. Formulani bir marta yozasiz, sonlar oʻzgarsa, natija oʻzi yangilanadi.",
      draw: [],
      animTitle: 'Doʻkon cheki',
      anim: {
        type: 'sheet',
        cols: ['Mahsulot', 'Narx', 'Soni', 'Jami'],
        rows: [
          ['Olma (kg)', 18000, 2, ''],
          ['Non', 4000, 3, ''],
          ['Sut (l)', 12000, 1, ''],
          ['JAMI', '', '', '']
        ],
        steps: [
          { cell: 'D2', formula: '=B2*C2', refs: ['B2', 'C2'], result: 36000 },
          { cell: 'D3', formula: '=B3*C3', refs: ['B3', 'C3'], result: 12000 },
          { cell: 'D4', formula: '=B4*C4', refs: ['B4', 'C4'], result: 12000 },
          { cell: 'D5', formula: '=SUM(D2:D4)', refs: ['D2', 'D3', 'D4'], result: 60000 }
        ]
      },
      next: 'Bu qanday ishlaydi?'
    },
    {
      kind: 'explain',
      say: "Elektron jadval ustunlar va qatorlardan iborat. Ustunlar harf bilan — A, B, C, qatorlar raqam bilan belgilanadi. Ularning kesishmasi — katak, uning manzili, masalan, B3. Bir nechta katak — diapazon: D2:D4. Katakda turli maʼlumot turlari boʻladi: son, matn, sana, valyuta, foiz. Formula har doim tenglik belgisidan boshlanadi. Bitta fayl — kitob, uning ichidagi har bir jadval — varaq. Katta jadvalda sarlavha qatorini qotirib qoʻyish mumkin, shunda pastga aylantirsangiz ham u koʻrinib turadi.",
      easy: "Ustun — harf, qator — raqam, katak — ularning kesishmasi (B3). Formula = belgisidan boshlanadi.",
      draw: [],
      animTitle: 'Asosiy tushunchalar',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🔲', title: 'Katak', text: 'Ustun + qator: B3' },
          { icon: '▦', title: 'Diapazon', text: 'Bir nechta katak: D2:D4' },
          { icon: '🔢', title: 'Maʼlumot turlari', text: 'Son, matn, sana, valyuta, foiz' },
          { icon: '🟰', title: 'Formula', text: 'Har doim = bilan boshlanadi' },
          { icon: '📑', title: 'Kitob va varaq', text: 'Bitta faylda bir nechta varaq' },
          { icon: '📌', title: 'Qotirish', text: 'Sarlavha qatori doim koʻrinadi' }
        ]
      },
      next: 'Formulani nusxalasak-chi?'
    },
    {
      kind: 'explain',
      say: "D2 katakdagi «B2 qoʻshuv C2» formulasini pastga nusxalasak, D3 da u oʻzi «B3 qoʻshuv C3» ga aylanadi. Chunki bu nisbiy havola: formula «chapdagi ikki katakni qoʻsh» degan maʼnoni saqlaydi va har qatorda oʻz kataklarini oladi. Aynan shuning uchun bitta formulani yuzlab qatorga bir zumda nusxalash mumkin.",
      easy: "Nisbiy havola nusxalanganda «suriladi»: B2 pastda B3 ga, keyin B4 ga aylanadi.",
      draw: [],
      animTitle: 'Nisbiy havola',
      anim: {
        type: 'sheet',
        cols: ['Ism', 'Ball 1', 'Ball 2', 'Jami'],
        rows: [
          ['Aziz', 45, 38, ''],
          ['Malika', 40, 47, ''],
          ['Sardor', 36, 41, '']
        ],
        steps: [
          { cell: 'D2', formula: '=B2+C2', refs: ['B2', 'C2'], result: 83 },
          { cell: 'D3', formula: '=B3+C3  (nusxa)', refs: ['B3', 'C3'], result: 87 },
          { cell: 'D4', formula: '=B4+C4  (nusxa)', refs: ['B4', 'C4'], result: 77 }
        ]
      },
      next: 'Surilmasligi kerak boʻlsa-chi?'
    },
    {
      kind: 'example',
      say: "Baʼzan katak surilmasligi kerak. Masalan, hamma mahsulotga bir xil 10 foizlik chegirma, u B5 katakda turibdi. Formulada «dollar B dollar 5» deb yozamiz — dollar belgilari ustun va qatorni qotiradi. Bu absolyut havola: formulani qayerga nusxalasak ham, u doim B5 ni oladi. Narx esa nisbiy — har qatorda oʻzgaradi. Aralash havola ham bor: «dollar A 2» — faqat ustun qotgan, «B dollar 1» — faqat qator qotgan; koʻpaytirish jadvali shunday tuziladi.",
      easy: "Dollar belgisi — «qulf». $B$5 nusxalanganda ham B5 boʻlib qoladi. Hamma qator bitta chegirma katagidan foydalanadi.",
      draw: [],
      animTitle: 'Absolyut havola: $B$5',
      anim: {
        type: 'sheet',
        cols: ['Mahsulot', 'Narx', 'Chegirmada'],
        rows: [
          ['Olma', 20000, ''],
          ['Non', 4000, ''],
          ['Sut', 12000, ''],
          ['Chegirma, %', 10, '']
        ],
        steps: [
          { cell: 'C2', formula: '=B2*(1-$B$5/100)', refs: ['B2', 'B5'], result: 18000 },
          { cell: 'C3', formula: '=B3*(1-$B$5/100)', refs: ['B3', 'B5'], result: 3600 },
          { cell: 'C4', formula: '=B4*(1-$B$5/100)', refs: ['B4', 'B5'], result: 10800 }
        ]
      },
      next: 'Yana qulayliklar?'
    },
    {
      kind: 'explain',
      say: "Yana bir nechta qulaylik. Nomlangan katak: B5 ga «Chegirma» deb nom bersak, formulada B5 oʻrniga «Chegirma» soʻzi yoziladi — oʻqish oson va u ham absolyut. Formatlash: sonlar oʻngga, matn chapga tekislanadi; valyuta, foiz va sana formatlari. Shartli formatlash esa qiymatga qarab rangni oʻzi oʻzgartiradi: masalan, 50 balldan kami qizil, 90 dan koʻpi yashil boʻladi.",
      easy: "Katakka nom berish mumkin — formula tushunarli boʻladi. Shartli formatlash — qiymatga qarab katakni oʻzi boʻyaydi.",
      draw: [],
      animTitle: 'Nom va formatlash',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🏷️', title: 'Nomlangan katak', text: '=B2*(1-Chegirma/100) — oʻqish oson' },
          { icon: '↔️', title: 'Tekislash', text: 'Matn — chapga, son — oʻngga' },
          { icon: '💲', title: 'Son formatlari', text: 'Valyuta, foiz, sana, kasr' },
          { icon: '🚦', title: 'Shartli formatlash', text: '< 50 — qizil, > 90 — yashil' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Katak — ustun harfi va qator raqami kesishmasi (B3); diapazon — D2:D4; formula = bilan boshlanadi.',
    'Maʼlumot turlari: son, matn, sana, valyuta, foiz; bitta kitobda bir nechta varaq.',
    'Nisbiy havola (B2) nusxalanganda suriladi; absolyut havola ($B$5) surilmaydi; aralash: $A2, B$1.',
    'Nomlangan katak formulani tushunarli qiladi; shartli formatlash qiymatga qarab rang beradi.'
  ],
  questions: [
    {
      id: 'i20q1',
      prompt: 'D2 katakka B2 va C2 ni koʻpaytiruvchi formulani yozing.',
      hint: 'Formula = bilan boshlanadi, koʻpaytirish — *',
      explanation: '=B2*C2',
      widget: { type: 'text_answer', props: { before: 'D2:', answer: ['=B2*C2', '=C2*B2'], width: 10, formula: true } }
    },
    {
      id: 'i20q2',
      prompt: 'D2 da =B2*C2 turibdi. Uni D5 ga nusxalasak, formula qanday boʻladi?',
      hint: 'Nisbiy havola 3 qator pastga suriladi.',
      explanation: 'D2 dan D5 ga — 3 qator pastga: =B5*C5.',
      widget: { type: 'text_answer', props: { before: 'D5:', answer: '=B5*C5', width: 10, formula: true } }
    },
    {
      id: 'i20q3',
      prompt: 'C2 da =B2*$F$1 turibdi. C4 ga nusxalanganda formula qanday boʻladi?',
      hint: 'B2 suriladi, $F$1 — yoʻq.',
      explanation: 'Nisbiy B2 ➜ B4, absolyut $F$1 oʻzgarmaydi: =B4*$F$1.',
      widget: { type: 'text_answer', props: { before: 'C4:', answer: '=B4*$F$1', width: 12, formula: true } }
    },
    {
      id: 'i20q4',
      prompt: 'Havola turini juftlang.',
      hint: 'Dollar belgisi nimani qotiradi?',
      explanation: 'B2 — nisbiy; $B$2 — absolyut; $B2 — faqat ustun qotgan; B$2 — faqat qator qotgan.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'B2' }, right: { label: 'nisbiy' } },
            { left: { label: '$B$2' }, right: { label: 'absolyut' } },
            { left: { label: '$B2' }, right: { label: 'aralash: ustun qotgan' } },
            { left: { label: 'B$2' }, right: { label: 'aralash: qator qotgan' } }
          ]
        }
      }
    },
    {
      id: 'i20q5',
      prompt: 'Narx 12 000, chegirma 25 %. Chegirmadagi narx qancha? (=B2*(1-25/100))',
      hint: '12 000 ning 75 foizi.',
      explanation: '12 000 × 0,75 = 9 000.',
      widget: { type: 'number_answer', props: { answer: 9000, unit: 'soʻm' } }
    },
    {
      id: 'i20q6',
      prompt: 'Maʼlumot turini juftlang.',
      hint: 'Qanday koʻrinishda yozilgan?',
      explanation: '«Toshkent» — matn; 01.09.2025 — sana; 15 % — foiz; 25 000 soʻm — valyuta.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Toshkent' }, right: { label: 'matn' } },
            { left: { label: '01.09.2025' }, right: { label: 'sana' } },
            { left: { label: '15 %' }, right: { label: 'foiz' } },
            { left: { label: '25 000 soʻm' }, right: { label: 'valyuta' } }
          ]
        }
      }
    },
    {
      id: 'i20q7',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Formula qanday boshlanadi?',
      explanation: 'Formula = bilan boshlanadi; A1:A5 da 5 ta katak bor; sonlar odatda oʻngga tekislanadi; shartli formatlash rangni avtomatik oʻzgartiradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Formula = belgisi bilan boshlanadi.', value: true },
            { text: 'A1:A5 diapazonida 4 ta katak bor.', value: false },
            { text: 'Sonlar odatda katakning oʻng tomoniga tekislanadi.', value: true },
            { text: 'Shartli formatlashda rangni har safar qoʻlda oʻzgartirish kerak.', value: false }
          ]
        }
      }
    },
    {
      id: 'i20q8',
      prompt: 'B2:D4 diapazonida nechta katak bor?',
      hint: 'Ustunlar B, C, D; qatorlar 2, 3, 4.',
      explanation: '3 ustun × 3 qator = 9 ta katak.',
      widget: { type: 'number_answer', props: { answer: 9, unit: 'katak' } }
    },
    {
      id: 'i20q9',
      prompt: 'Qaysi formula toʻgʻri yozilgan?',
      hint: 'Boshida nima boʻlishi kerak?',
      explanation: '=B2+C2 — toʻgʻri. Qolganlarida = belgisi yoʻq yoki notoʻgʻri joyda.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'B2+C2' }, { text: 'B2+C2=' }, { text: 'SUM B2 C2' }, { text: '=B2+C2', odd: true }] } }
    },
    {
      id: 'i20q10',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Dollar belgisi.',
      explanation: 'Nusxalanganda suriladigan havola — nisbiy, surilmaydigan — absolyut.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Nusxalanganda suriladigan havola —' }, { blank: 'nisbiy' }, { text: ', $ belgisi bilan qotirilgani —' }, { blank: 'absolyut' }, { text: '.' }],
          bank: ['nisbiy', 'absolyut', 'nomlangan']
        }
      }
    }
  ]
};
