import type { BoardLesson } from './types';

/** Darslik: 2.01 — kiritish, chiqarish va xotira qurilmalari: skaner, OCR, OMR, MICR, shtrix-kod, printerlar, plotter. */
export const INF_7: BoardLesson = {
  n: 7,
  label: '7',
  part: 10,
  title: 'Kiritish va chiqarish qurilmalari',
  section: '2.01',
  steps: [
    {
      kind: 'hook',
      say: "Imtihondan keyin minglab javob varaqlari bir kunda tekshiriladi. Qanday qilib? Varaqlar maxsus qurilmadan oʻtadi: u boʻyalgan kataklarni yorugʻlik bilan topadi, dastur ularni toʻgʻri javoblar bilan solishtiradi va natijani chop etadi. Bu qurilma — OMR, belgini optik oʻquvchi qurilma.",
      easy: "OMR qurilmasi varaqdagi qora boʻyalgan doirachalarni koʻradi. Kompyuter ularni toʻgʻri javoblar bilan solishtirib, ball qoʻyadi. Odam bitta-bitta tekshirib oʻtirmaydi.",
      draw: [],
      animTitle: 'Test varagʻi qanday tekshiriladi',
      anim: {
        type: 'flow',
        stations: [
          { icon: '📝', label: 'Javob varagʻi' },
          { icon: '🔦', label: 'OMR oʻqiydi' },
          { icon: '🖥️', label: 'Solishtirish' },
          { icon: '🖨️', label: 'Natija' }
        ],
        items: [
          { texts: ['1-savol: ● B', 'B', 'B = B ✓', '+1 ball'] },
          { texts: ['2-savol: ● D', 'D', 'D ≠ A ✗', '0 ball'] },
          { texts: ['3-savol: ● C', 'C', 'C = C ✓', '+1 ball'] }
        ],
        result: 'Kiritish ➜ qayta ishlash ➜ chiqarish'
      },
      next: 'Boshqa qurilmalar-chi?'
    },
    {
      kind: 'explain',
      say: "Kiritish qurilmalari maʼlumotni kompyuterga yuboradi. Klaviatura va sichqoncha bilan sizga tanish. Sensorli ekran ham kiritish, ham chiqarish qurilmasi. Mikrofon — tovushni, kamera va veb-kamera — tasvirni kiritadi. Skaner qogʻoz hujjatni rasmga aylantiradi. Shtrix-kod va QR-kod oʻquvchi kassada mahsulot kodini bir zumda kiritadi.",
      easy: "Kiritish — kompyuterga nimadir berish: harf, ovoz, rasm yoki kod. Klaviatura, mikrofon, kamera, skaner, shtrix-kod oʻquvchi — hammasi kiritish qurilmalari.",
      draw: [],
      animTitle: 'Kiritish qurilmalari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '⌨️', title: 'Klaviatura', text: 'Harf va buyruqlar' },
          { icon: '📱', title: 'Sensorli ekran', text: 'Kiritish ham, chiqarish ham' },
          { icon: '🎤', title: 'Mikrofon', text: 'Ovoz va tovush' },
          { icon: '📷', title: 'Kamera', text: 'Rasm va video' },
          { icon: '🖨️', title: 'Skaner', text: 'Qogʻozdan rasm oladi' },
          { icon: '🏷️', title: 'Shtrix-kod oʻquvchi', text: 'Mahsulot kodini oʻqiydi' }
        ]
      },
      next: 'OCR, MICR nima?'
    },
    {
      kind: 'explain',
      say: "Uchta qisqartmani farqlaymiz. OCR — belgini optik aniqlash: skanerlangan rasmdagi harflarni tanib, tahrirlanadigan matnga aylantiradi. OMR — faqat belgi qoʻyilgan joyni aniqlaydi, test varaqlari uchun juda mos, lekin harflarni oʻqiy olmaydi. MICR — bank cheklari pastidagi magnitli siyoh bilan yozilgan raqamlarni oʻqiydi, juda aniq ishlaydi.",
      easy: "OCR — rasmdagi yozuvni matnga aylantiradi. OMR — qayer boʻyalganini aniqlaydi. MICR — magnitli siyohdagi raqamlarni oʻqiydi.",
      draw: [],
      animTitle: 'OCR: rasm ➜ matn',
      anim: {
        type: 'flow',
        stations: [
          { icon: '📄', label: 'Qogʻoz' },
          { icon: '🖨️', label: 'Skaner' },
          { icon: '🔤', label: 'OCR dasturi' }
        ],
        items: [
          { texts: ['Maʼlumotnoma', 'rasm (piksellar)', 'tahrirlanadigan matn'] },
          { texts: ['Chek raqami 0012', 'rasm (piksellar)', '«0012» — qidirsa boʻladi'] }
        ],
        result: 'Endi matnni tahrirlash va qidirish mumkin'
      },
      next: 'Chiqarish qurilmalari-chi?'
    },
    {
      kind: 'explain',
      say: "Chiqarish qurilmalari natijani bizga yetkazadi: monitor, karnay, proyektor va printerlar. Printerlar turlicha. Lazer printer eng tez, har bir sahifasi arzon tushadi — ofis va maktab uchun. Purkovchi, yaʼni struyli printer arzon sotiladi va rangli fotosuratni yaxshi chiqaradi, lekin siyoh qimmat. Matritsali printer shovqinli va sifati past, ammo bir urishda bir nechta nusxa chiqaradi — kassalar va chekka mos. Plotter esa A0 kabi katta varaqlarga chizma va xarita chiqaradi.",
      easy: "Koʻp sahifa tez kerak — lazer. Rangli rasm — purkovchi. Bir necha nusxali chek — matritsali. Katta chizma — plotter.",
      draw: [],
      animTitle: 'Printerlar',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '⚡', title: 'Lazer', text: 'Eng tez, sahifasi arzon — ofis va maktab' },
          { icon: '💧', title: 'Purkovchi (struyli)', text: 'Arzon, rangli foto yaxshi, siyoh qimmat' },
          { icon: '🧾', title: 'Matritsali', text: 'Shovqinli, lekin bir nechta nusxa — chek' },
          { icon: '📐', title: 'Plotter', text: 'Katta varaqlar: chizma, xarita' }
        ]
      },
      next: 'Qanday tanlaymiz?'
    },
    {
      kind: 'example',
      say: "Qurilmani vazifaga qarab tanlaymiz. Arxitektor A1 oʻlchamdagi uy chizmasini rangli chiqarishi kerak — plotter. Kutubxona eski kitoblarni elektron matnga aylantirmoqchi — skaner bilan OCR. Doʻkon kassasi mahsulotni tez kiritishi kerak — shtrix-kod oʻquvchi. Bank cheklarni tez va aniq oʻqishi kerak — MICR.",
      easy: "Avval vazifani oʻqiymiz, keyin eng mos qurilmani tanlaymiz: katta chizma — plotter, kitobdan matn — OCR, kassa — shtrix-kod, bank cheki — MICR.",
      draw: [],
      animTitle: 'Vazifa ➜ qurilma',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🎯', label: 'Vazifa' },
          { icon: '🛠️', label: 'Qurilma' }
        ],
        items: [
          { texts: ['A1 uy chizmasi', 'Plotter'] },
          { texts: ['Kitobni matnga aylantirish', 'Skaner + OCR'] },
          { texts: ['Kassada mahsulot kiritish', 'Shtrix-kod oʻquvchi'] },
          { texts: ['Bank chekini oʻqish', 'MICR'] }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Kiritish qurilmalari: klaviatura, sichqoncha, sensorli ekran, mikrofon, kamera, skaner, shtrix-kod oʻquvchi.',
    'OCR — rasmdagi harflarni matnga aylantiradi; OMR — belgilangan joyni aniqlaydi; MICR — magnitli siyohni oʻqiydi.',
    'Chiqarish qurilmalari: monitor, karnay, proyektor, printer, plotter.',
    'Lazer — tez va arzon sahifa; purkovchi — rangli foto; matritsali — koʻp nusxali chek; plotter — katta chizma.'
  ],
  questions: [
    {
      id: 'i7q1',
      prompt: 'Kiritish yoki chiqarish qurilmasi?',
      hint: 'Maʼlumot kompyuterga kiryaptimi yoki chiqyaptimi?',
      explanation: 'Mikrofon, skaner, shtrix-kod oʻquvchi — kiritish. Karnay, proyektor, plotter — chiqarish.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'k', label: 'Kiritish' },
            { id: 'c', label: 'Chiqarish' }
          ],
          tiles: [
            { id: 't1', label: 'Mikrofon', bin: 'k' },
            { id: 't2', label: 'Karnay', bin: 'c' },
            { id: 't3', label: 'Skaner', bin: 'k' },
            { id: 't4', label: 'Proyektor', bin: 'c' },
            { id: 't5', label: 'Shtrix-kod oʻquvchi', bin: 'k' },
            { id: 't6', label: 'Plotter', bin: 'c' }
          ]
        }
      }
    },
    {
      id: 'i7q2',
      prompt: 'Qisqartmani vazifasi bilan juftlang.',
      hint: 'Optik belgi, optik matn, magnit siyoh.',
      explanation: 'OCR — rasmdagi harflarni matnga; OMR — test varagʻidagi belgilarni; MICR — chekdagi magnitli raqamlarni oʻqiydi.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'OCR' }, right: { label: 'rasmdagi harflarni matnga aylantiradi' } },
            { left: { label: 'OMR' }, right: { label: 'test varagʻidagi belgilarni topadi' } },
            { left: { label: 'MICR' }, right: { label: 'chekdagi magnitli raqamlarni oʻqiydi' } }
          ]
        }
      }
    },
    {
      id: 'i7q3',
      prompt: 'Vazifaga eng mos printerni tanlang.',
      hint: 'Tezlik, rang, nusxa, oʻlcham.',
      explanation: 'Maktabda yuzlab sahifa — lazer; oilaviy rangli foto — purkovchi; ikki nusxali kassa cheki — matritsali; A0 xarita — plotter.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Maktabda 500 sahifa test' }, right: { label: 'lazer' } },
            { left: { label: 'Oilaviy rangli fotosurat' }, right: { label: 'purkovchi' } },
            { left: { label: 'Ikki nusxali kassa cheki' }, right: { label: 'matritsali' } },
            { left: { label: 'A0 oʻlchamdagi xarita' }, right: { label: 'plotter' } }
          ]
        }
      }
    },
    {
      id: 'i7q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'OMR harflarni oʻqiy oladimi?',
      explanation: 'OMR faqat belgi joyini aniqlaydi; sensorli ekran ham kiritish, ham chiqarish; MICR OCR dan aniqroq; lazer printer purkovchidan tezroq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'OMR qoʻlda yozilgan soʻzlarni oʻqiy oladi.', value: false },
            { text: 'Sensorli ekran ham kiritish, ham chiqarish qurilmasi.', value: true },
            { text: 'MICR OCR ga qaraganda aniqroq ishlaydi.', value: true },
            { text: 'Purkovchi printer lazer printerdan tezroq.', value: false }
          ]
        }
      }
    },
    {
      id: 'i7q5',
      prompt: 'Qaysi biri kiritish qurilmasi emas?',
      hint: 'Bittasi natijani chiqaradi.',
      explanation: 'Karnay — chiqarish qurilmasi. Veb-kamera, mikrofon va skaner — kiritish.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Veb-kamera' }, { text: 'Mikrofon' }, { text: 'Skaner' }, { text: 'Karnay', odd: true }] } }
    },
    {
      id: 'i7q6',
      prompt: 'OMR bilan imtihon tekshirish bosqichlarini tartiblang.',
      hint: 'Varaqdan natijagacha.',
      explanation: 'Varaq skanerlanadi ➜ belgilar aniqlanadi ➜ toʻgʻri javoblar bilan solishtiriladi ➜ ball hisoblanadi ➜ natija chop etiladi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Javob varagʻi qurilmaga solinadi', 'OMR boʻyalgan kataklarni aniqlaydi', 'Javoblar kalit bilan solishtiriladi', 'Ball hisoblanadi', 'Natija chop etiladi'] }
      }
    },
    {
      id: 'i7q7',
      prompt: 'Lazer printerning afzalliklarini bosing.',
      hint: 'Ofis va maktab nega uni tanlaydi?',
      explanation: 'Lazer printer tez va har sahifasi arzon, sifati yuqori. Bir urishda bir nechta nusxa — matritsali printer xususiyati; eng arzon sotib olinadigani — purkovchi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Juda tez chop etadi', match: true },
            { id: 'b', text: 'Har bir sahifa arzon tushadi', match: true },
            { id: 'c', text: 'Matn sifati yuqori', match: true },
            { id: 'd', text: 'Bir urishda bir nechta nusxa', match: false },
            { id: 'e', text: 'Sotib olish eng arzon', match: false }
          ]
        }
      }
    },
    {
      id: 'i7q8',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Kitob, kassa.',
      explanation: 'Kitob sahifasini matnga aylantirish uchun skaner va OCR, kassada mahsulot kodini kiritish uchun shtrix-kod oʻquvchi ishlatiladi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Kitob sahifasini tahrirlanadigan matnga' }, { blank: 'OCR' }, { text: 'aylantiradi. Kassada mahsulot kodini' }, { blank: 'shtrix-kod' }, { text: 'oʻquvchi kiritadi.' }],
          bank: ['OCR', 'shtrix-kod', 'OMR', 'plotter']
        }
      }
    },
    {
      id: 'i7q9',
      prompt: 'Qurilmalarni guruhlang: kiritish, chiqarish yoki ikkalasi.',
      hint: 'Sensorli ekranda nima sodir boʻladi?',
      explanation: 'Sensorli ekran va interaktiv doska ham kiritadi, ham chiqaradi. Skaner — kiritish, monitor — chiqarish.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'k', label: 'Kiritish' },
            { id: 'c', label: 'Chiqarish' },
            { id: 'i', label: 'Ikkalasi' }
          ],
          tiles: [
            { id: 't1', label: 'Skaner', bin: 'k' },
            { id: 't2', label: 'Monitor', bin: 'c' },
            { id: 't3', label: 'Sensorli ekran', bin: 'i' },
            { id: 't4', label: 'Interaktiv doska', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'i7q10',
      prompt: 'Katta varaqlarga chizma chiqaradigan qurilmani yozing.',
      hint: 'A0, A1 varaqlar uchun.',
      explanation: 'Plotter — arxitektura chizmalari va katta xaritalar uchun.',
      widget: { type: 'text_answer', props: { before: 'A0 varaqqa chizma chiqaradi —', answer: 'plotter', width: 8 } }
    }
  ]
};
