import type { BoardLesson } from './types';

/** Darslik: 7.03 — maʼlumotlarni qayta ishlash tizimlari: paketli, onlayn (tezkor), real vaqt; asosiy va tranzaksiya fayllari. */
export const INF_19: BoardLesson = {
  n: 19,
  label: '19',
  part: 10,
  title: 'Maʼlumotlarni qayta ishlash tizimlari',
  section: '7.03',
  steps: [
    {
      kind: 'hook',
      say: "Kompaniya oy boʻyi mijozlar buyurtmalarini yozib boradi, lekin har bir buyurtma bilan asosiy faylni darhol yangilamaydi. Oy oxirida, kechasi, hamma buyurtmalar bir paket qilib bir yoʻla qayta ishlanadi. Bu — paketli qayta ishlash. Ikki faylni koʻramiz: asosiy fayl — mijozlar haqida doimiy maʼlumot, tranzaksiya fayli — davr ichidagi oʻzgarishlar.",
      easy: "Asosiy faylda mijozlar roʻyxati, tranzaksiya faylida esa oy davomidagi buyurtmalar. Oy oxirida ikkalasi birlashtiriladi.",
      draw: [],
      animTitle: 'Asosiy va tranzaksiya fayli',
      anim: {
        type: 'db',
        tables: [
          { name: 'Asosiy fayl', key: 'ID', cols: ['ID', 'Mijoz', 'Jami, soʻm'], rows: [[101, 'Aziza', 250000], [102, 'Bekzod', 90000], [103, 'Dilnoza', 400000]] },
          { name: 'Tranzaksiyalar', cols: ['ID', 'Summa'], rows: [[103, 60000], [101, 30000], [103, 15000]] }
        ],
        links: [{ from: ['Tranzaksiyalar', 'ID'], to: ['Asosiy fayl', 'ID'] }],
        query: { table: 'Tranzaksiyalar', label: 'Tranzaksiyalar ID boʻyicha saralanadi', keep: [0, 1, 2] }
      },
      next: 'Keyin nima boʻladi?'
    },
    {
      kind: 'explain',
      say: "Paketli jarayon bosqichlari. Avval tranzaksiyalar validatsiyadan oʻtadi. Keyin ular asosiy fayl bilan bir xil tartibda — mijoz ID si boʻyicha saralanadi. Soʻng kompyuter ikkala faylni boshidan oxirigacha oʻqib chiqib, har bir mijozning jamini yangilaydi va yangi asosiy fayl yaratadi. Eski asosiy fayl oʻchirilmaydi — u zaxira nusxa sifatida saqlanadi. Hisob-fakturalar ham shu vaqtda chop etiladi.",
      easy: "Tekshirish ➜ saralash ➜ birlashtirish ➜ yangi asosiy fayl. Eski fayl zaxira boʻlib qoladi.",
      draw: [],
      animTitle: 'Paketli qayta ishlash',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🧾', label: 'Tranzaksiyalar' },
          { icon: '✅', label: 'Validatsiya' },
          { icon: '🔃', label: 'Saralash' },
          { icon: '🗂️', label: 'Yangi asosiy fayl' }
        ],
        items: [
          { texts: ['103: +60 000', 'toʻgʻri', '101: +30 000', 'Aziza: 280 000'] },
          { texts: ['101: +30 000', 'toʻgʻri', '103: +60 000', 'Bekzod: 90 000'] },
          { texts: ['103: +15 000', 'toʻgʻri', '103: +15 000', 'Dilnoza: 475 000'] }
        ],
        result: 'Eski asosiy fayl — zaxira nusxa'
      },
      next: 'Qayerda ishlatiladi?'
    },
    {
      kind: 'explain',
      say: "Paketli qayta ishlash koʻp maʼlumotni odamsiz, kompyuter boʻsh paytda — masalan, kechasi — bajarish uchun qulay: ish haqi hisoblash, oylik kommunal toʻlov kvitansiyalari, bank koʻchirmalari. Afzalliklari: tez va arzon, operator kerak emas, zaxira nusxa avtomatik qoladi. Kamchiligi: asosiy fayl faqat davr oxirida yangilanadi, shuning uchun oraliqda maʼlumot eskirgan boʻladi, xato esa keyingi paketgacha qolishi mumkin.",
      easy: "Paketli usul — koʻp ishni bir yoʻla, kechasi bajarish. Arzon va tez, lekin maʼlumot faqat davr oxirida yangilanadi.",
      draw: [],
      animTitle: 'Paketli: afzallik va kamchilik',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Afzalliklari', items: ['Katta hajm, tez', 'Kechasi, odamsiz ishlaydi', 'Zaxira nusxa qoladi', 'Ish haqi, kvitansiyalar'] },
        right: { icon: '👎', title: 'Kamchiliklari', items: ['Fayl faqat davr oxirida yangilanadi', 'Oraliqda maʼlumot eskirgan', 'Xato keyingi paketgacha qoladi', 'Darhol javob kerak joyga mos emas'] }
      },
      next: 'Darhol kerak boʻlsa-chi?'
    },
    {
      kind: 'example',
      say: "Onlayn, yaʼni tezkor qayta ishlashda har bir tranzaksiya darhol bajariladi va asosiy fayl shu zahoti yangilanadi. Masalan, poyezd chiptasini band qilish. Aziz va Malika bir vaqtda 3A joyni tanlashdi. Avval Azizning soʻrovi keldi — tizim joyni u uchun band qildi va yozuvni qulfladi. Bir soniyadan keyin kelgan Malikaning soʻroviga tizim «joy band» deb javob berdi. Shu tufayli bitta joy ikki marta sotilmaydi.",
      easy: "Onlayn tizim har bir buyurtmani darhol bajaradi. Kim birinchi boʻlsa — joy uniki, ikkinchisiga «band» deyiladi.",
      draw: [],
      animTitle: 'Chipta band qilish',
      anim: {
        type: 'net',
        nodes: [
          { id: 'a', x: 12, y: 12, icon: '🧑', label: 'Aziz' },
          { id: 'm', x: 12, y: 46, icon: '👩', label: 'Malika' },
          { id: 's', x: 82, y: 29, icon: '🚆', label: 'Chipta tizimi' }
        ],
        links: [
          ['a', 's'],
          ['m', 's']
        ],
        packets: [
          { path: ['a', 's'], label: '3A joy?', color: '#0ea5e9' },
          { path: ['s', 'a'], label: '✓ sizniki', color: '#22c55e' },
          { path: ['m', 's'], label: '3A joy?', color: '#f59e0b' },
          { path: ['s', 'm'], label: '✗ band', color: '#ef4444' }
        ]
      },
      next: 'Real vaqt-chi?'
    },
    {
      kind: 'explain',
      say: "Real vaqt rejimidagi qayta ishlash yanada tez: kirish maʼlumoti shunchalik tez qayta ishlanadiki, natija keyingi kirishga taʼsir qila oladi. Bu boshqaruv tizimlarida ishlatiladi: avtopilot, svetofor, issiqxona, avtomobildagi tormoz tizimi. Onlayn tizimda bir-ikki soniya kutish mumkin, real vaqt tizimida esa kechikish xavfli.",
      easy: "Onlayn — darhol, lekin bir oz kutsa boʻladi (chipta, bank). Real vaqt — bir zumda, kechikish mumkin emas (avtopilot, tormoz).",
      draw: [],
      animTitle: 'Uch xil qayta ishlash',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '📦', title: 'Paketli', text: 'Davr oxirida bir yoʻla: ish haqi, kvitansiyalar' },
          { icon: '🖱️', title: 'Onlayn (tezkor)', text: 'Har bir tranzaksiya darhol: chipta, bank kartasi' },
          { icon: '⚡', title: 'Real vaqt', text: 'Bir zumda, natija keyingi kirishga taʼsir qiladi: avtopilot, svetofor' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Asosiy fayl — doimiy maʼlumot (mijozlar); tranzaksiya fayli — davr ichidagi oʻzgarishlar (buyurtmalar).',
    'Paketli qayta ishlash: validatsiya ➜ tranzaksiyalarni saralash ➜ asosiy fayl bilan birlashtirish ➜ yangi asosiy fayl; eski fayl — zaxira.',
    'Paketli: katta hajm, odamsiz, arzon; lekin maʼlumot faqat davr oxirida yangilanadi.',
    'Onlayn: har bir tranzaksiya darhol bajariladi, yozuv qulflanadi (chipta, bank).',
    'Real vaqt: natija bir zumda chiqib, keyingi kirishga taʼsir qiladi (avtopilot, svetofor).'
  ],
  questions: [
    {
      id: 'i19q1',
      prompt: 'Qaysi qayta ishlash turi mos?',
      hint: 'Bir yoʻlami, darhol mi yoki bir zumdami?',
      explanation: 'Ish haqi — paketli; samolyot chiptasi — onlayn; avtopilot — real vaqt; oylik gaz kvitansiyasi — paketli.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Oylik ish haqi hisoblash' }, right: { label: 'paketli' } },
            { left: { label: 'Samolyot chiptasini band qilish' }, right: { label: 'onlayn' } },
            { left: { label: 'Samolyot avtopiloti' }, right: { label: 'real vaqt' } }
          ]
        }
      }
    },
    {
      id: 'i19q2',
      prompt: 'Asosiy fayl yoki tranzaksiya fayli?',
      hint: 'Doimiy maʼlumotmi yoki oʻzgarishmi?',
      explanation: 'Mijoz ismi, manzili va ID si — asosiy fayl. Bugungi buyurtma va toʻlov — tranzaksiya fayli.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'a', label: 'Asosiy fayl' },
            { id: 't', label: 'Tranzaksiya' }
          ],
          tiles: [
            { id: 't1', label: 'Mijozning ismi va manzili', bin: 'a' },
            { id: 't2', label: 'Bugungi buyurtma', bin: 't' },
            { id: 't3', label: 'Xodimning soatbay stavkasi', bin: 'a' },
            { id: 't4', label: 'Bu hafta ishlangan soatlar', bin: 't' }
          ]
        }
      }
    },
    {
      id: 'i19q3',
      prompt: 'Paketli qayta ishlash bosqichlarini tartiblang.',
      hint: 'Avval tekshirish, oxirida yangi fayl.',
      explanation: 'Tranzaksiyalar yigʻiladi ➜ validatsiya ➜ asosiy fayl tartibida saralanadi ➜ birlashtiriladi ➜ yangi asosiy fayl yaratiladi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Tranzaksiyalar yigʻiladi', 'Tranzaksiyalar validatsiyadan oʻtadi', 'ID boʻyicha saralanadi', 'Asosiy fayl bilan birlashtiriladi', 'Yangi asosiy fayl yaratiladi'] }
      }
    },
    {
      id: 'i19q4',
      prompt: 'Aziza asosiy faylda 250 000 soʻm. Bu oy tranzaksiyalari: 30 000 va 45 000. Yangi asosiy faylda qancha boʻladi?',
      hint: 'Hammasini qoʻshing.',
      explanation: '250 000 + 30 000 + 45 000 = 325 000 soʻm.',
      widget: { type: 'number_answer', props: { answer: 325000, unit: 'soʻm' } }
    },
    {
      id: 'i19q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Eski asosiy fayl nima boʻladi?',
      explanation: 'Eski asosiy fayl zaxira boʻlib qoladi; paketli tizimda fayl davr oxirida yangilanadi; onlayn tizim yozuvni qulflaydi; real vaqt tizimida kechikish xavfli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Paketli jarayondan keyin eski asosiy fayl oʻchirib tashlanadi.', value: false },
            { text: 'Paketli tizimda asosiy fayl faqat davr oxirida yangilanadi.', value: true },
            { text: 'Onlayn tizim bitta joyni ikki kishiga sotmaslik uchun yozuvni qulflaydi.', value: true },
            { text: 'Real vaqt tizimida bir necha daqiqa kechikish muammo emas.', value: false }
          ]
        }
      }
    },
    {
      id: 'i19q6',
      prompt: 'Paketli qayta ishlashning afzalliklarini bosing.',
      hint: 'Kechasi, odamsiz…',
      explanation: 'Katta hajm, operator kerak emasligi va avtomatik zaxira — afzallik. Darhol yangilanish va bir zumda javob — onlayn va real vaqt tizimlari xususiyati.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Katta hajmni tez bajaradi', match: true },
            { id: 'b', text: 'Operator kerak emas', match: true },
            { id: 'c', text: 'Eski fayl zaxira boʻlib qoladi', match: true },
            { id: 'd', text: 'Maʼlumot har soniyada yangilanadi', match: false },
            { id: 'e', text: 'Avtopilot uchun mos', match: false }
          ]
        }
      }
    },
    {
      id: 'i19q7',
      prompt: 'Qaysi biri real vaqt tizimi emas?',
      hint: 'Uchtasida kechikish xavfli.',
      explanation: 'Oylik kvitansiya — paketli. Svetofor, tormoz tizimi va avtopilot — real vaqt.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Svetofor boshqaruvi' }, { text: 'Avtomobil tormoz tizimi' }, { text: 'Avtopilot' }, { text: 'Oylik gaz kvitansiyasi', odd: true }] } }
    },
    {
      id: 'i19q8',
      prompt: 'Tranzaksiyalarni asosiy fayl tartibida saralash uchun ID larni kichigidan kattasiga tartiblang.',
      hint: 'Oʻsish tartibi.',
      explanation: '101, 102, 103, 105 — oʻsish tartibi.',
      widget: { type: 'step_order', props: { steps: ['101', '102', '103', '105'] } }
    },
    {
      id: 'i19q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Doimiy va oʻzgaruvchi.',
      explanation: 'Doimiy maʼlumot asosiy faylda, davr ichidagi oʻzgarishlar tranzaksiya faylida saqlanadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Mijozlar haqidagi doimiy maʼlumot' }, { blank: 'asosiy' }, { text: 'faylda, oy davomidagi buyurtmalar esa' }, { blank: 'tranzaksiya' }, { text: 'faylida.' }],
          bank: ['asosiy', 'tranzaksiya', 'zaxira']
        }
      }
    },
    {
      id: 'i19q10',
      prompt: 'Bitta joy ikki marta sotilmasligi uchun onlayn tizim yozuvni nima qiladi? (Bir soʻz)',
      hint: 'Eshikni … qoʻyadi.',
      explanation: 'Yozuv qulflanadi — birinchi foydalanuvchi tugatmaguncha boshqasi uni oʻzgartira olmaydi.',
      widget: { type: 'text_answer', props: { before: 'Yozuvni', answer: ['qulflaydi', 'qulflash', 'qulf'], width: 10 } }
    }
  ]
};
