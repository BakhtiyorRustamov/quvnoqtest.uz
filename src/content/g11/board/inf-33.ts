import type { BoardLesson } from './types';

/** Darslik: 12.01–12.07 — elektron tijorat, onlayn xarid, internet-banking, elektron pul oʻtkazmalari, zaxiralarni avtomatik nazorat qilish, raqamli valyuta, maʼlumotlarning intellektual tahlili. */
export const INF_33: BoardLesson = {
  n: 33,
  label: '33',
  part: 11,
  title: 'Elektron tijorat va raqamli valyuta',
  section: '12.01–12.07',
  steps: [
    {
      kind: 'hook',
      say: "Malika telefonda onlayn doʻkondan krossovka tanladi, savatga qoʻshdi, manzilini yozdi va karta bilan toʻladi. Pul bankdan doʻkonga elektron oʻtdi, ombor tizimi qoldiqni bittaga kamaytirdi, kuryerga buyurtma ketdi. Ertasi kuni krossovka eshik oldida. Bu elektron tijorat — internet orqali savdo.",
      easy: "Elektron tijorat — internet orqali sotib olish va sotish: tanlash, toʻlash, yetkazib berish.",
      draw: [],
      animTitle: 'Onlayn xarid',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🛒', label: 'Tanlash' },
          { icon: '💳', label: 'Toʻlov' },
          { icon: '📦', label: 'Ombor' },
          { icon: '🚚', label: 'Yetkazish' }
        ],
        items: [{ texts: ['krossovka, 38-oʻlcham', 'karta: 450 000 soʻm', 'qoldiq: 12 ➜ 11', 'ertaga eshik oldida'] }],
        result: 'Hammasi avtomatik, odam faqat qadoqlaydi va olib boradi'
      },
      next: 'Afzalliklari nimada?'
    },
    {
      kind: 'explain',
      say: "Onlayn xaridning xaridor uchun afzalliklari: uydan chiqmasdan, kecha-kunduz xarid; narxlarni oson solishtirish; boshqa shahar va davlatdan tovar. Kamchiliklari: tovarni ushlab koʻrib boʻlmaydi, yetkazishni kutish, firibgar saytlar, karta maʼlumotlari xavfi. Doʻkon uchun: ijara va sotuvchi xarajati kam, butun mamlakatga sotish mumkin; lekin raqobat kuchli va sayt xavfsizligi qimmat.",
      easy: "Xaridor uchun — qulay va tanlov koʻp, lekin ushlab koʻrib boʻlmaydi. Doʻkon uchun — xarajat kam, lekin raqobat kuchli.",
      draw: [],
      animTitle: 'Onlayn xarid: afzallik va kamchilik',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Afzalliklari', items: ['24 soat, uydan chiqmasdan', 'Narxlarni solishtirish oson', 'Tanlov katta', 'Doʻkon xarajati kam'] },
        right: { icon: '👎', title: 'Kamchiliklari', items: ['Ushlab koʻrib boʻlmaydi', 'Yetkazishni kutish', 'Firibgar saytlar', 'Karta maʼlumotlari xavfi'] }
      },
      next: 'Pul qanday oʻtadi?'
    },
    {
      kind: 'example',
      say: "Elektron pul oʻtkazmasida naqd pul ishlatilmaydi: bir hisobdan boshqasiga raqamli yozuv oʻzgaradi. Kassada kartani terminalga tekkizasiz. Terminal soʻrovni bankka yuboradi, bank hisobda pul borligini va PIN-kodni tekshiradi, keyin doʻkon hisobiga oʻtkazishni tasdiqlaydi. Internet-banking esa bu ishlarni telefon ilovasidan qilish imkonini beradi: kommunal toʻlov, pul oʻtkazish, hisob koʻchirmasi.",
      easy: "Karta ➜ terminal ➜ bank tekshiradi ➜ doʻkonga pul oʻtadi. Hammasi bir necha soniyada.",
      draw: [],
      animTitle: 'Karta bilan toʻlov',
      anim: {
        type: 'net',
        nodes: [
          { id: 'k', x: 12, y: 26, icon: '💳', label: 'Karta + terminal' },
          { id: 'b', x: 50, y: 8, icon: '🏦', label: 'Xaridor banki' },
          { id: 'd', x: 88, y: 26, icon: '🏪', label: 'Doʻkon hisobi' }
        ],
        links: [
          ['k', 'b'],
          ['b', 'd']
        ],
        packets: [
          { path: ['k', 'b'], label: '45 000 soʻm?', color: '#0ea5e9' },
          { path: ['b', 'k'], label: '✓ pul bor, PIN toʻgʻri', color: '#22c55e' },
          { path: ['b', 'd'], label: '+45 000 soʻm', color: '#8b5cf6' }
        ]
      },
      next: 'Ombor qanday biladi?'
    },
    {
      kind: 'example',
      say: "Zaxiralarni avtomatik nazorat qilish: har bir sotuvda shtrix-kod oʻqiladi va bazadagi qoldiq kamayadi. Har mahsulotning qayta buyurtma darajasi bor. Qoldiq shu darajaga tushsa, tizim yetkazib beruvchiga avtomatik buyurtma yuboradi. Jadvalda koʻring: sut qoldigʻi 8, daraja 10 — buyurtma ketdi; non 40 ta — hali yetarli.",
      easy: "Har sotuvda qoldiq kamayadi. Belgilangan darajadan tushsa — tizim oʻzi buyurtma beradi.",
      draw: [],
      animTitle: 'Avtomatik buyurtma',
      anim: {
        type: 'sheet',
        cols: ['Mahsulot', 'Qoldiq', 'Daraja', 'Holat'],
        rows: [
          ['Sut', 8, 10, ''],
          ['Non', 40, 25, ''],
          ['Tuxum', 25, 30, '']
        ],
        steps: [
          { cell: 'D2', formula: '=IF(B2<=C2,"Buyurtma","Yetarli")', refs: ['B2', 'C2'], result: 'Buyurtma 📦' },
          { cell: 'D3', formula: '=IF(B3<=C3,"Buyurtma","Yetarli")', refs: ['B3', 'C3'], result: 'Yetarli' },
          { cell: 'D4', formula: '=IF(B4<=C4,"Buyurtma","Yetarli")', refs: ['B4', 'C4'], result: 'Buyurtma 📦' }
        ]
      },
      next: 'Raqamli valyuta nima?'
    },
    {
      kind: 'explain',
      say: "Raqamli valyuta faqat elektron koʻrinishda mavjud boʻlgan pul. Kriptovalyutalar, masalan, bitkoin, hech bir markaziy bank tomonidan chiqarilmaydi: tranzaksiyalar koʻp kompyuterlarda saqlanadigan umumiy daftar — blokcheynda yoziladi va shifrlash bilan himoyalanadi. Afzalliklari: xalqaro oʻtkazma tez va vositachisiz. Kamchiliklari: narxi keskin oʻzgaradi, xato oʻtkazmani qaytarib boʻlmaydi, firibgarlik va qonun bilan cheklovlar. Baʼzi davlatlar markaziy bank raqamli valyutasini ham sinab koʻrmoqda.",
      easy: "Raqamli valyuta — faqat elektron pul. Kriptovalyuta blokcheynda yoziladi, tez, lekin narxi beqaror va xavfli.",
      draw: [],
      animTitle: 'Raqamli valyuta',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Afzalliklari', items: ['Xalqaro oʻtkazma tez', 'Vositachisiz', 'Shifrlash bilan himoya', '24 soat ishlaydi'] },
        right: { icon: '👎', title: 'Kamchiliklari', items: ['Narxi keskin oʻzgaradi', 'Xato oʻtkazma qaytmaydi', 'Firibgarlik xavfi', 'Qonuniy cheklovlar'] }
      },
      next: 'Maʼlumotlarni tahlil qilish-chi?'
    },
    {
      kind: 'example',
      say: "Maʼlumotlarning intellektual tahlili — katta hajmdagi maʼlumotdan yashirin qonuniyatlarni topish. Supermarket million chekni tahlil qilib, «non olganlarning koʻpi sut ham oladi» degan qonuniyatni topdi va ularni yaqin javonga qoʻydi. Banklar shu usul bilan gʻalati toʻlovlarni — mumkin boʻlgan firibgarlikni aniqlaydi. Lekin bu shaxsiy maʼlumotlardan foydalanish bilan bogʻliq, shuning uchun maxfiylik qoidalariga rioya qilish kerak.",
      easy: "Koʻp maʼlumotdan qonuniyat topish: «non olgan sut ham oladi». Foydali, lekin maxfiylikni saqlash kerak.",
      draw: [],
      animTitle: 'Qonuniyatni topish',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🧾', label: 'Maʼlumot' },
          { icon: '⛏️', label: 'Tahlil' },
          { icon: '💡', label: 'Qonuniyat' },
          { icon: '🎯', label: 'Qaror' }
        ],
        items: [
          { texts: ['1 000 000 ta chek', 'birga sotilganlar', 'non ➜ sut (70 %)', 'yaqin javonga qoʻyish'] },
          { texts: ['karta toʻlovlari', 'odatiy xatti-harakat', '3 ta davlatda 1 soatda', 'kartani bloklash'] }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Elektron tijorat — internet orqali savdo: tanlash, onlayn toʻlov, avtomatik ombor, yetkazish.',
    'Elektron pul oʻtkazmasi: karta ➜ terminal ➜ bank tekshiruvi ➜ doʻkon hisobi; internet-banking — ilovadan.',
    'Zaxiralar nazorati: qoldiq qayta buyurtma darajasiga tushsa, avtomatik buyurtma.',
    'Raqamli valyuta — faqat elektron pul; kriptovalyuta blokcheynda yoziladi, tez, lekin beqaror va xavfli.',
    'Maʼlumotlarning intellektual tahlili katta maʼlumotdan qonuniyat topadi; maxfiylikka rioya qilish shart.'
  ],
  questions: [
    {
      id: 'i33q1',
      prompt: 'Onlayn xarid bosqichlarini tartiblang.',
      hint: 'Tanlashdan olishgacha.',
      explanation: 'Tovar tanlanadi ➜ savatga qoʻshiladi ➜ toʻlov ➜ ombor qoldigʻi kamayadi ➜ yetkazib beriladi.',
      widget: { type: 'step_order', props: { steps: ['Tovarni tanlash', 'Savatga qoʻshish', 'Karta bilan toʻlash', 'Ombor qoldigʻi kamayadi', 'Kuryer yetkazib beradi'] } }
    },
    {
      id: 'i33q2',
      prompt: 'Qoldiq 12, qayta buyurtma darajasi 15. Tizim nima qiladi? (Bir soʻz: buyurtma yoki kutadi)',
      hint: '12 ≤ 15 mi?',
      explanation: '12 ≤ 15 — avtomatik buyurtma beriladi.',
      widget: { type: 'text_answer', props: { answer: ['buyurtma', 'buyurtma beradi'], width: 10 } }
    },
    {
      id: 'i33q3',
      prompt: 'Onlayn xarid: xaridor uchun afzallik yoki kamchilik?',
      hint: 'Qulaymi yoki xavflimi?',
      explanation: '24 soat, narx solishtirish, katta tanlov — afzallik. Ushlab koʻrolmaslik, kutish, firibgar sayt — kamchilik.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'a', label: 'Afzallik' },
            { id: 'k', label: 'Kamchilik' }
          ],
          tiles: [
            { id: 't1', label: '24 soat xarid', bin: 'a' },
            { id: 't2', label: 'Tovarni ushlab koʻrib boʻlmaydi', bin: 'k' },
            { id: 't3', label: 'Narxlarni solishtirish oson', bin: 'a' },
            { id: 't4', label: 'Firibgar saytlar', bin: 'k' },
            { id: 't5', label: 'Katta tanlov', bin: 'a' },
            { id: 't6', label: 'Yetkazishni kutish', bin: 'k' }
          ]
        }
      }
    },
    {
      id: 'i33q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Kriptovalyutani kim chiqaradi?',
      explanation: 'Kriptovalyutani markaziy bank chiqarmaydi; elektron oʻtkazmada naqd pul ishlatilmaydi; kripto narxi beqaror; intellektual tahlilda maxfiylik muhim.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bitkoinni markaziy bank chiqaradi.', value: false },
            { text: 'Elektron pul oʻtkazmasida naqd pul ishlatilmaydi.', value: true },
            { text: 'Kriptovalyuta narxi juda barqaror.', value: false },
            { text: 'Maʼlumot tahlilida shaxsiy maʼlumot maxfiyligi muhim.', value: true }
          ]
        }
      }
    },
    {
      id: 'i33q5',
      prompt: 'Karta bilan toʻlov yoʻlini tartiblang.',
      hint: 'Terminaldan doʻkon hisobigacha.',
      explanation: 'Karta terminalga tekkiziladi ➜ soʻrov bankka ➜ bank pul va PIN ni tekshiradi ➜ doʻkon hisobiga oʻtkaziladi.',
      widget: { type: 'step_order', props: { steps: ['Karta terminalga tekkiziladi', 'Soʻrov bankka yuboriladi', 'Bank pul va PIN-kodni tekshiradi', 'Pul doʻkon hisobiga oʻtadi'] } }
    },
    {
      id: 'i33q6',
      prompt: 'Maʼlumotlarning intellektual tahliliga misollarni bosing.',
      hint: 'Koʻp maʼlumotdan qonuniyat.',
      explanation: 'Birga sotiladigan mahsulotlar, gʻalati toʻlovlarni aniqlash va film tavsiyasi — intellektual tahlil. Bitta chekni chop etish — oddiy amal.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Birga sotiladigan mahsulotlarni topish', match: true },
            { id: 'b', text: 'Gʻalati karta toʻlovlarini aniqlash', match: true },
            { id: 'c', text: 'Siz yoqtirishi mumkin boʻlgan film tavsiyasi', match: true },
            { id: 'd', text: 'Bitta chekni chop etish', match: false }
          ]
        }
      }
    },
    {
      id: 'i33q7',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Savdo, pul, daftar, qonuniyat.',
      explanation: 'Elektron tijorat — internet savdosi; elektron oʻtkazma — hisobdan hisobga; blokcheyn — umumiy taqsimlangan daftar; intellektual tahlil — qonuniyat topish.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Elektron tijorat' }, right: { label: 'internet orqali savdo' } },
            { left: { label: 'Elektron oʻtkazma' }, right: { label: 'pulning hisobdan hisobga oʻtishi' } },
            { left: { label: 'Blokcheyn' }, right: { label: 'koʻp kompyuterdagi umumiy daftar' } },
            { left: { label: 'Intellektual tahlil' }, right: { label: 'katta maʼlumotdan qonuniyat topish' } }
          ]
        }
      }
    },
    {
      id: 'i33q8',
      prompt: 'Kuniga 6 ta sut sotiladi, qoldiq 30. Qayta buyurtma darajasi 12. Necha kundan keyin buyurtma ketadi?',
      hint: '30 dan 12 gacha nechta kun?',
      explanation: '30 − 12 = 18, 18 : 6 = 3 kun.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'kun' } }
    },
    {
      id: 'i33q9',
      prompt: 'Qaysi biri elektron tijorat emas?',
      hint: 'Uchtasi internet orqali.',
      explanation: 'Bozorda naqd pulga sabzi olish — oddiy savdo. Qolganlari internet orqali.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Onlayn doʻkondan kitob' }, { text: 'Ilovada taksi chaqirish va toʻlash' }, { text: 'Onlayn kino chiptasi' }, { text: 'Bozorda naqd pulga sabzi', odd: true }] } }
    },
    {
      id: 'i33q10',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Qoldiq va daraja.',
      explanation: 'Qoldiq qayta buyurtma darajasiga tushsa, tizim yetkazib beruvchiga avtomatik buyurtma yuboradi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Qoldiq qayta buyurtma' }, { blank: 'darajasiga' }, { text: 'tushsa, tizim' }, { blank: 'avtomatik' }, { text: 'buyurtma yuboradi.' }],
          bank: ['darajasiga', 'avtomatik', 'qoʻlda']
        }
      }
    }
  ]
};
