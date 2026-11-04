import type { BoardLesson } from './types';

/** Darslik: 9.01 — soʻrovlar: statik va dinamik (parametrli), shartlar, oraliq, shablonlar, VA/YOKI/EMAS, hisoblanadigan maydon, umumlashtirish, hisobotlar. */
export const INF_27: BoardLesson = {
  n: 27,
  label: '27',
  part: 10,
  title: 'Soʻrovlar va hisobotlar',
  section: '9.01',
  steps: [
    {
      kind: 'hook',
      say: "Doʻkon bazasida yuzlab mahsulot bor. Menejer soʻraydi: «Narxi 20 mingdan arzon va omborda qolgan mevalarni koʻrsat». Bu — soʻrov. Soʻrov bazadan faqat shartga mos yozuvlarni tanlab oladi, qolganlari joyida qoladi.",
      easy: "Soʻrov — bazaga savol: «shu shartga mos yozuvlarni koʻrsat». Natijada faqat mos qatorlar chiqadi.",
      draw: [],
      animTitle: 'Soʻrov: meva VA narx < 20 000',
      anim: {
        type: 'db',
        tables: [
          {
            name: 'Mahsulotlar',
            key: 'Kod',
            cols: ['Kod', 'Nomi', 'Turi', 'Narx', 'Qoldiq'],
            rows: [['M1', 'Olma', 'meva', 18000, 40], ['M2', 'Non', 'non', 4000, 120], ['M3', 'Anor', 'meva', 25000, 15], ['M4', 'Banan', 'meva', 19000, 0], ['M5', 'Uzum', 'meva', 16000, 22]]
          }
        ],
        query: { table: 'Mahsulotlar', label: 'Turi = "meva" VA Narx < 20000 VA Qoldiq > 0', keep: [0, 4] }
      },
      next: 'Shartlar qanday yoziladi?'
    },
    {
      kind: 'explain',
      say: "Soʻrov shartlari. Tenglik: Turi teng «meva». Taqqoslash: Narx 20 000 dan kichik. Oraliq: narx 10 000 bilan 20 000 orasida. Shablon: «A*» — A bilan boshlanadigan nomlar, yulduzcha — istalgan belgilar. Mantiqiy amallar: VA — hamma shart bajarilsin, YOKI — bittasi yetarli, EMAS — shartni inkor qiladi: «Turi EMAS non».",
      easy: "Shartlar: teng, katta, kichik, oraliq, shablon (A*) va VA, YOKI, EMAS bilan bogʻlash.",
      draw: [],
      animTitle: 'Soʻrov shartlari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🟰', title: 'Tenglik', text: 'Turi = "meva"' },
          { icon: '↕️', title: 'Taqqoslash', text: 'Narx < 20000' },
          { icon: '↔️', title: 'Oraliq', text: 'Narx 10000 dan 20000 gacha' },
          { icon: '✳️', title: 'Shablon', text: 'Nomi = "A*"' },
          { icon: '🔗', title: 'VA / YOKI', text: 'Hamma shart / bittasi' },
          { icon: '🚫', title: 'EMAS', text: 'Turi EMAS "non"' }
        ]
      },
      next: 'Statik va dinamik nima?'
    },
    {
      kind: 'example',
      say: "Statik soʻrovda shart oldindan yozib qoʻyiladi va har safar bir xil natija beradi: «faqat mevalar». Dinamik, yaʼni parametrli soʻrov esa ishga tushganda foydalanuvchidan qiymat soʻraydi: «Qaysi turni koʻrsatay?». Bugun «non» deb yozsa — nonlar, ertaga «sut» desa — sut mahsulotlari. Bitta soʻrov — koʻp vazifa.",
      easy: "Statik — shart doim bir xil. Dinamik — har safar foydalanuvchidan qiymat soʻraydi.",
      draw: [],
      animTitle: 'Parametrli soʻrov',
      anim: {
        type: 'flow',
        stations: [
          { icon: '❓', label: 'Soʻrov soʻraydi' },
          { icon: '⌨️', label: 'Foydalanuvchi' },
          { icon: '📋', label: 'Natija' }
        ],
        items: [
          { texts: ['Qaysi tur?', 'non', 'Non (1 ta)'] },
          { texts: ['Qaysi tur?', 'meva', 'Olma, Anor, Banan, Uzum'] }
        ],
        result: 'Bitta soʻrov — har xil natija'
      },
      next: 'Hisoblash mumkinmi?'
    },
    {
      kind: 'example',
      say: "Soʻrovda yangi, hisoblanadigan maydon yaratish mumkin: «Qiymat = Narx × Qoldiq» — har bir mahsulot omborda qancha pul turadi. Umumlashtirish esa yozuvlarni guruhlab hisoblaydi: har bir tur boʻyicha mahsulotlar soni va jami qoldiq. Bu jadvalda koʻrsatilganidek natija beradi.",
      easy: "Hisoblanadigan maydon — formula bilan yangi ustun. Umumlashtirish — guruhlab sanash va qoʻshish.",
      draw: [],
      animTitle: 'Tur boʻyicha umumlashtirish',
      anim: {
        type: 'sheet',
        cols: ['Turi', 'Mahsulotlar soni', 'Jami qoldiq'],
        rows: [
          ['meva', '', ''],
          ['non', '', '']
        ],
        steps: [
          { cell: 'B2', formula: 'COUNT(Kod) WHERE Turi="meva"', refs: ['A2'], result: 4 },
          { cell: 'C2', formula: 'SUM(Qoldiq) WHERE Turi="meva"', refs: ['A2'], result: 77 },
          { cell: 'B3', formula: 'COUNT(Kod) WHERE Turi="non"', refs: ['A3'], result: 1 },
          { cell: 'C3', formula: 'SUM(Qoldiq) WHERE Turi="non"', refs: ['A3'], result: 120 }
        ]
      },
      next: 'Natijani qanday chiqaramiz?'
    },
    {
      kind: 'explain',
      say: "Soʻrov natijasi hisobotda chiroyli koʻrsatiladi. Hisobotda sarlavha, sana, guruhlar boʻyicha boʻlimlar, jami va oʻrtacha qiymatlar boʻladi va uni chop etish yoki PDF ga saqlash mumkin. Maʼlumotni CSV kabi format orqali elektron jadvalga eksport qilish yoki boshqa manbadan bazaga import qilish ham mumkin.",
      easy: "Hisobot — soʻrov natijasining tartibli, chop etishga tayyor koʻrinishi: sarlavha, guruhlar va jami bilan.",
      draw: [],
      animTitle: 'Hisobot tarkibi',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🏷️', title: 'Sarlavha va sana', text: '«Ombor qoldigʻi, 30.10.2026»' },
          { icon: '🗂️', title: 'Guruhlar', text: 'Tur boʻyicha boʻlimlar' },
          { icon: '🧮', title: 'Yakunlar', text: 'Jami, oʻrtacha, soni' },
          { icon: '🖨️', title: 'Chiqarish', text: 'Chop etish, PDF, CSV eksport' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Soʻrov bazadan faqat shartga mos yozuvlarni tanlaydi.',
    'Shartlar: =, <, >, oraliq, shablon (A*), VA, YOKI, EMAS.',
    'Statik soʻrov — shart oldindan yozilgan; dinamik (parametrli) — qiymatni foydalanuvchidan soʻraydi.',
    'Hisoblanadigan maydon — formula bilan yangi ustun; umumlashtirish — guruhlab sanash va qoʻshish.',
    'Hisobot — natijani tartibli koʻrsatish va chop etish; import/eksport — CSV kabi formatlar orqali.'
  ],
  questions: [
    {
      id: 'i27q1',
      prompt: 'Mahsulotlar: Olma (meva, 18 000), Non (non, 4 000), Anor (meva, 25 000), Uzum (meva, 16 000). Soʻrov: Turi = "meva" VA Narx < 20 000. Natijani bosing.',
      hint: 'Ikkala shart bajarilsin.',
      explanation: 'Olma va Uzum — meva va 20 000 dan arzon. Anor qimmat, Non meva emas.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Olma', match: true },
            { id: 'b', text: 'Uzum', match: true },
            { id: 'c', text: 'Anor', match: false },
            { id: 'd', text: 'Non', match: false }
          ]
        }
      }
    },
    {
      id: 'i27q2',
      prompt: 'Xuddi shu mahsulotlar. Soʻrov: Turi = "non" YOKI Narx > 20 000. Natijani bosing.',
      hint: 'Bitta shart yetarli.',
      explanation: 'Non (turi non) va Anor (25 000 > 20 000).',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Non', match: true },
            { id: 'b', text: 'Anor', match: true },
            { id: 'c', text: 'Olma', match: false },
            { id: 'd', text: 'Uzum', match: false }
          ]
        }
      }
    },
    {
      id: 'i27q3',
      prompt: 'Statik yoki dinamik soʻrov?',
      hint: 'Qiymatni foydalanuvchidan soʻraydimi?',
      explanation: '«Faqat mevalar» va «10-A sinf» — statik. «Qaysi sinf?» va «Qaysi sanadan?» deb soʻraydigan — dinamik.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 's', label: 'Statik' },
            { id: 'd', label: 'Dinamik' }
          ],
          tiles: [
            { id: 't1', label: 'Har doim faqat mevalar', bin: 's' },
            { id: 't2', label: '«Qaysi sinf?» deb soʻraydi', bin: 'd' },
            { id: 't3', label: 'Har doim 10-A sinf', bin: 's' },
            { id: 't4', label: '«Qaysi sanadan?» deb soʻraydi', bin: 'd' }
          ]
        }
      }
    },
    {
      id: 'i27q4',
      prompt: 'Shartni maʼnosi bilan juftlang.',
      hint: 'Yulduzcha va EMAS.',
      explanation: '"A*" — A bilan boshlanadi; EMAS "non" — nondan boshqa hammasi; 10000 dan 20000 gacha — oraliq; < 5 — 5 dan kam.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Nomi = "A*"' }, right: { label: 'A bilan boshlanadi' } },
            { left: { label: 'Turi EMAS "non"' }, right: { label: 'nondan boshqa hammasi' } },
            { left: { label: 'Narx 10000 dan 20000 gacha' }, right: { label: 'oraliq' } },
            { left: { label: 'Qoldiq < 5' }, right: { label: '5 dan kam qolganlar' } }
          ]
        }
      }
    },
    {
      id: 'i27q5',
      prompt: 'Hisoblanadigan maydon: Qiymat = Narx × Qoldiq. Olma: narx 18 000, qoldiq 40. Qiymat?',
      hint: 'Koʻpaytiring.',
      explanation: '18 000 × 40 = 720 000 soʻm.',
      widget: { type: 'number_answer', props: { answer: 720000, unit: 'soʻm' } }
    },
    {
      id: 'i27q6',
      prompt: 'Qoldiqlar: meva — 40, 15, 0, 22. Mevalar boʻyicha jami qoldiq qancha?',
      hint: 'SUM(Qoldiq) WHERE Turi="meva"',
      explanation: '40 + 15 + 0 + 22 = 77.',
      widget: { type: 'number_answer', props: { answer: 77 } }
    },
    {
      id: 'i27q7',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Soʻrov yozuvlarni oʻchiradimi?',
      explanation: 'Soʻrov faqat tanlaydi; VA da hamma shart kerak; parametrli soʻrov foydalanuvchidan soʻraydi; hisobot chop etish uchun.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Soʻrov shartga mos kelmagan yozuvlarni bazadan oʻchiradi.', value: false },
            { text: 'VA bilan bogʻlangan shartlarning hammasi bajarilishi kerak.', value: true },
            { text: 'Parametrli soʻrov qiymatni ishga tushganda soʻraydi.', value: true },
            { text: 'Hisobot faqat maʼlumot kiritish uchun ishlatiladi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i27q8',
      prompt: 'Qaysi biri hisobot elementi emas?',
      hint: 'Uchtasi chop etiladigan hujjatda boʻladi.',
      explanation: 'Sarlavha, guruhlar va jami — hisobot elementlari. Ochiladigan roʻyxat — forma elementi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Sarlavha' }, { text: 'Guruhlar' }, { text: 'Jami qiymat' }, { text: 'Ochiladigan roʻyxat', odd: true }] } }
    },
    {
      id: 'i27q9',
      prompt: 'Soʻrovdan hisobotgacha bosqichlarni tartiblang.',
      hint: 'Shartdan chop etishgacha.',
      explanation: 'Shart yoziladi ➜ soʻrov ishga tushadi ➜ natija guruhlanadi va jamlanadi ➜ hisobot chop etiladi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Soʻrov sharti yoziladi', 'Soʻrov ishga tushiriladi', 'Natija guruhlanib jamlanadi', 'Hisobot chop etiladi'] }
      }
    },
    {
      id: 'i27q10',
      prompt: '«S» harfi bilan boshlanadigan nomlar uchun shablonni yozing.',
      hint: 'Yulduzcha — istalgan belgilar.',
      explanation: 'S* — S bilan boshlanib, keyin istalgan belgilar.',
      widget: { type: 'text_answer', props: { before: 'Nomi =', answer: ['S*', '"S*"'], width: 6, formula: true } }
    }
  ]
};
