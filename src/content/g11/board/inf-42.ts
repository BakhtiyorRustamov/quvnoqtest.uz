import type { BoardLesson } from './types';

/** Darslik: 15.04–15.06 — oʻrnatish (implementatsiya usullari), hujjatlashtirish, baholash va texnik xizmat koʻrsatish. */
export const INF_42: BoardLesson = {
  n: 42,
  label: '42',
  part: 11,
  title: 'Joriy etish, hujjatlar va baholash',
  section: '15.04–15.06',
  steps: [
    {
      kind: 'hook',
      say: "Elektron jurnal tayyor va sinovdan oʻtdi. Endi eski qogʻoz jurnaldan yangisiga qanday oʻtamiz? Toʻrt usul bor. Ustma-ust usulda belgilangan kuni eskisi toʻxtaydi, yangisi boshlanadi. Parallel usulda bir muddat ikkalasi birga ishlaydi. Bosqichli usulda tizim qismma-qism almashtiriladi. Pilot usulda avval bitta boʻlim yangi tizimga oʻtadi, keyin qolganlar.",
      easy: "Ustma-ust — birdan. Parallel — ikkalasi birga. Bosqichli — qismma-qism. Pilot — avval bitta boʻlim.",
      draw: [],
      animTitle: 'Toʻrt joriy etish usuli',
      anim: {
        type: 'timeline',
        total: 10,
        unit: ' oy',
        done: '✓ Hamma joyda yangi tizim ishlayapti',
        tracks: [
          { label: 'Ustma-ust', icon: '', clips: [{ start: 0, dur: 4, label: 'Eski', color: '#94a3b8' }, { start: 4, dur: 6, label: 'Yangi', color: '#16a34a' }] },
          { label: 'Parallel', icon: '', clips: [{ start: 0, dur: 3, label: 'Eski', color: '#94a3b8' }, { start: 3, dur: 4, label: 'Eski + Yangi', color: '#d97706' }, { start: 7, dur: 3, label: 'Yangi', color: '#16a34a' }] },
          { label: 'Bosqichli', icon: '', clips: [{ start: 0, dur: 3, label: 'Eski', color: '#94a3b8' }, { start: 3, dur: 2, label: '1-qism', color: '#65a30d' }, { start: 5, dur: 2, label: '2-qism', color: '#4d7c0f' }, { start: 7, dur: 3, label: 'Yangi', color: '#16a34a' }] },
          { label: 'Pilot', icon: '', clips: [{ start: 0, dur: 3, label: 'Eski', color: '#94a3b8' }, { start: 3, dur: 4, label: '1 boʻlim', color: '#0891b2' }, { start: 7, dur: 3, label: 'Yangi', color: '#16a34a' }] }
        ]
      },
      next: 'Qaysi biri yaxshi?'
    },
    {
      kind: 'explain',
      say: "Ustma-ust usul eng tez va arzon: ikki tizimni birga yuritish kerak emas. Lekin yangi tizimda xato chiqsa, qaytadigan joy yoʻq — eski tizim allaqachon toʻxtagan. Parallel usul eng xavfsiz: yangi tizim buzilsa, eskisi ishlab turadi, natijalarni solishtirish ham mumkin. Ammo har bir maʼlumotni ikki marta kiritish kerak, xodimlar ikki hissa ishlaydi va xarajat koʻp.",
      easy: "Ustma-ust: tez, arzon, lekin xavfli. Parallel: xavfsiz, lekin ikki hissa ish va qimmat.",
      draw: [],
      animTitle: 'Ustma-ust va parallel',
      anim: {
        type: 'compare',
        left: { icon: '⚡', title: 'Ustma-ust', items: ['Eng tez va arzon', 'Bitta tizim yuritiladi', 'Xato chiqsa — qaytish yoʻq', 'Xodimlar darhol oʻrganishi kerak'] },
        right: { icon: '⇉', title: 'Parallel', items: ['Eng xavfsiz', 'Natijalarni solishtirish mumkin', 'Maʼlumot ikki marta kiritiladi', 'Qimmat, ikki hissa ish'] }
      },
      next: 'Bosqichli va pilot-chi?'
    },
    {
      kind: 'explain',
      say: "Bosqichli usul modulli katta tizimlarga mos: avval baholar moduli, keyin davomat moduli. Xato chiqsa, faqat oʻsha qism zarar koʻradi, lekin har bosqich muvaffaqiyatini kutish uchun jarayon choʻziladi. Pilot usulda bitta boʻlim yoki bitta maktab yangi tizimni sinaydi. Bu boʻlim xodimlari keyin boshqalarni oʻqitadi. Xato chiqsa, faqat bitta boʻlim zarar koʻradi, ammo pilot guruh uchun hamma narsa toʻliq ishlashi kerak.",
      easy: "Bosqichli — qism-qism, xato faqat bitta qismda. Pilot — bitta boʻlim sinaydi, keyin boshqalarni oʻrgatadi.",
      draw: [],
      animTitle: 'Bosqichli va pilot',
      anim: {
        type: 'compare',
        left: { icon: '🧩', title: 'Bosqichli', items: ['Qismma-qism almashtiriladi', 'Modulli tizimlarga mos', 'Xato faqat bitta qismda', 'Uzoq davom etadi'] },
        right: { icon: '🧭', title: 'Pilot', items: ['Avval bitta boʻlim', 'Bu boʻlim boshqalarni oʻrgatadi', 'Xato faqat shu boʻlimda', 'Qolganlar kutib turadi'] }
      },
      next: 'Hujjatlar nima uchun?'
    },
    {
      kind: 'explain',
      say: "Tizim bilan ikki xil hujjat beriladi. Texnik hujjat dasturchi va kelajakda xizmat koʻrsatadigan mutaxassis uchun: maʼlumotlar lugʻati, kod izohlari, validatsiya qoidalari, blok-sxemalar va ERD, sinov natijalari, oʻrnatish qoʻllanmasi. Foydalanuvchi hujjati oddiy foydalanuvchi uchun: tizimni ishga tushirish, maʼlumot kiritish, saqlash, chop etish, xato xabarlari va ulardan qanday chiqish, koʻp beriladigan savollar.",
      easy: "Texnik hujjat — dasturchi uchun: kod, maʼlumotlar lugʻati. Foydalanuvchi hujjati — oddiy odam uchun: qanday ishlatish.",
      draw: [],
      animTitle: 'Ikki xil hujjat',
      anim: {
        type: 'compare',
        left: { icon: '🛠️', title: 'Texnik hujjat', items: ['Maʼlumotlar lugʻati', 'Kod va makros izohlari', 'Validatsiya qoidalari, ERD', 'Sinov natijalari'] },
        right: { icon: '👤', title: 'Foydalanuvchi hujjati', items: ['Qanday ishga tushirish', 'Kiritish, saqlash, chop etish', 'Xato xabarlari va yechimi', 'Koʻp beriladigan savollar'] }
      },
      next: 'Baholash qanday boʻladi?'
    },
    {
      kind: 'explain',
      say: "Tizim oʻrnatilgach baholanadi. Tizim talablar spetsifikatsiyasidagi har bir talabni bajaryaptimi? Foydalanuvchilar fikri soʻraladi, eski va yangi tizim tezligi solishtiriladi. Bajarilmagan talablar va yangi gʻoyalar keyingi takomillashtirish uchun yozib qoʻyiladi.",
      easy: "Baholash: har bir talab bajarildimi? Foydalanuvchilar fikri va tezlik solishtiriladi.",
      draw: [],
      animTitle: 'Talablar bilan solishtirish',
      anim: {
        type: 'sheet',
        cols: ['Talab', 'Kerak', 'Haqiqatda', 'Bajarildimi'],
        rows: [
          ['Sahifa ochilishi, s', 3, 2, ''],
          ['Ota-onaga SMS', 'ha', 'ha', ''],
          ['Hisobot tayyorlash, min', 5, 9, '']
        ],
        steps: [
          { cell: 'D2', formula: '=IF(C2<=B2,"✓","✗")', refs: ['B2', 'C2'], result: '✓ bajarildi' },
          { cell: 'D3', formula: '=IF(C3=B3,"✓","✗")', refs: ['B3', 'C3'], result: '✓ bajarildi' },
          { cell: 'D4', formula: '=IF(C4<=B4,"✓","✗")', refs: ['B4', 'C4'], result: '✗ yaxshilash kerak' }
        ]
      },
      next: 'Texnik xizmat nima?'
    },
    {
      kind: 'explain',
      say: "Texnik xizmat koʻrsatish — ishlab turgan tizimga oʻzgartirish kiritish. Toʻrt turi bor. Korrektiv — topilgan xatoni tuzatish. Adaptiv — tizimni yangi qonun, yangi operatsion tizim yoki brauzerga moslashtirish. Perfektiv — tizim yaxshi ishlasa ham, uni tezroq yoki qulayroq qilish, yangi funksiya qoʻshish. Preventiv — muammoning oldini olish: diskni tekshirish, kulerni changdan tozalash, harorat va xotirani kuzatish.",
      easy: "Korrektiv — xatoni tuzatish. Adaptiv — oʻzgarishga moslash. Perfektiv — yaxshilash. Preventiv — oldini olish.",
      draw: [],
      animTitle: 'Texnik xizmat turlari',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🐞', title: 'Korrektiv', text: 'Topilgan xatoni tuzatish' },
          { icon: '🔄', title: 'Adaptiv', text: 'Yangi qonun, OT yoki brauzerga moslash' },
          { icon: '✨', title: 'Perfektiv', text: 'Tezroq, qulayroq, yangi funksiya' },
          { icon: '🛡️', title: 'Preventiv', text: 'Muammo boʻlmasdan oldini olish' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Joriy etish usullari: ustma-ust (birdan), parallel (ikkalasi birga), bosqichli (qismma-qism), pilot (avval bitta boʻlim).',
    'Ustma-ust — tez va arzon, lekin xavfli; parallel — xavfsiz, lekin qimmat va ikki hissa ish.',
    'Texnik hujjat — dasturchilar uchun; foydalanuvchi hujjati — tizimdan qanday foydalanish.',
    'Baholashda tizim talablar spetsifikatsiyasi bilan solishtiriladi, foydalanuvchilar fikri soʻraladi.',
    'Texnik xizmat: korrektiv (xato), adaptiv (moslash), perfektiv (yaxshilash), preventiv (oldini olish).'
  ],
  questions: [
    {
      id: 'i42q1',
      prompt: 'Vaziyatga mos joriy etish usulini juftlang.',
      hint: 'Xavf, vaqt va tuzilishga qarang.',
      explanation: 'Bank — xato boʻlmasligi kerak: parallel. Kichik doʻkon, tez va arzon: ustma-ust. Modulli katta tizim: bosqichli. Tarmoqli maktablar, avval bittasi: pilot.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Bank: xato mutlaqo boʻlmasligi kerak' }, right: { label: 'parallel' } },
            { left: { label: 'Kichik doʻkon: tez va arzon kerak' }, right: { label: 'ustma-ust' } },
            { left: { label: 'Modullarga boʻlingan katta tizim' }, right: { label: 'bosqichli' } },
            { left: { label: '20 ta filial, avval bittasida sinash' }, right: { label: 'pilot' } }
          ]
        }
      }
    },
    {
      id: 'i42q2',
      prompt: 'Texnik xizmat turini aniqlang.',
      hint: 'Xato, moslash, yaxshilash yoki oldini olish?',
      explanation: 'Hisobdagi xato — korrektiv; yangi soliq qonuni — adaptiv; tezroq qidiruv — perfektiv; diskni muntazam tekshirish — preventiv.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Ish haqi notoʻgʻri hisoblandi — tuzatildi' }, right: { label: 'korrektiv' } },
            { left: { label: 'Yangi soliq qonuniga moslashtirildi' }, right: { label: 'adaptiv' } },
            { left: { label: 'Qidiruv 2 marta tezlashtirildi' }, right: { label: 'perfektiv' } },
            { left: { label: 'Disk har hafta tekshiriladi' }, right: { label: 'preventiv' } }
          ]
        }
      }
    },
    {
      id: 'i42q3',
      prompt: 'Texnik yoki foydalanuvchi hujjati?',
      hint: 'Kim oʻqiydi?',
      explanation: 'Maʼlumotlar lugʻati va kod izohlari — texnik; chop etish tartibi va xato xabarlari yechimi — foydalanuvchi.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 't', label: 'Texnik' },
            { id: 'u', label: 'Foydalanuvchi' }
          ],
          tiles: [
            { id: 't1', label: 'Maʼlumotlar lugʻati', bin: 't' },
            { id: 't2', label: 'Hisobotni qanday chop etish', bin: 'u' },
            { id: 't3', label: 'Kod izohlari', bin: 't' },
            { id: 't4', label: 'Xato xabari chiqsa nima qilish', bin: 'u' },
            { id: 't5', label: 'Sinov natijalari', bin: 't' }
          ]
        }
      }
    },
    {
      id: 'i42q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Har usulning xavfi va narxi.',
      explanation: 'Parallel — xavfsiz, lekin qimmat; ustma-ustda qaytish yoʻq; pilotda bitta boʻlim sinaydi; perfektiv xizmat xatosiz tizimni ham yaxshilaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Parallel usulda maʼlumot ikkala tizimga kiritiladi.', value: true },
            { text: 'Ustma-ust usulda yangi tizim buzilsa, eski tizimga osongina qaytiladi.', value: false },
            { text: 'Pilot usulda avval faqat bitta boʻlim yangi tizimga oʻtadi.', value: true },
            { text: 'Perfektiv xizmat faqat xato topilganda bajariladi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i42q5',
      prompt: 'Parallel usulda 120 xodim har kuni 30 daqiqa qoʻshimcha ishlaydi. Kuniga jami necha soat qoʻshimcha ish?',
      hint: '120 × 30 daqiqa, soatga aylantiring.',
      explanation: '120 × 30 = 3600 daqiqa = 60 soat.',
      widget: { type: 'number_answer', props: { answer: 60, unit: 'soat' } }
    },
    {
      id: 'i42q6',
      prompt: 'Qaysi biri joriy etish usuli emas?',
      hint: 'Toʻrt usulni eslang.',
      explanation: 'Ustma-ust, parallel va pilot — joriy etish usullari. Soʻrovnoma — tahlil usuli.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Ustma-ust' }, { text: 'Parallel' }, { text: 'Pilot' }, { text: 'Soʻrovnoma', odd: true }] } }
    },
    {
      id: 'i42q7',
      prompt: 'Tizimni baholashda nimalar qilinadi? Bosing.',
      hint: 'Talablar va foydalanuvchilar.',
      explanation: 'Talablar bilan solishtirish, foydalanuvchilar fikri, tezlikni oʻlchash va kamchiliklarni yozish — baholash. Kodni yoʻq qilish — yoʻq.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Talablar spetsifikatsiyasi bilan solishtirish', match: true },
            { id: 'b', text: 'Foydalanuvchilar fikrini soʻrash', match: true },
            { id: 'c', text: 'Eski va yangi tizim tezligini solishtirish', match: true },
            { id: 'd', text: 'Kamchiliklarni keyingi versiya uchun yozish', match: true },
            { id: 'e', text: 'Dastur kodini oʻchirib tashlash', match: false }
          ]
        }
      }
    },
    {
      id: 'i42q8',
      prompt: 'Joriy etish usullarini xavfi kamidan koʻpiga tartiblang.',
      hint: 'Eski tizim qancha vaqt zaxirada qoladi?',
      explanation: 'Parallel (eski tizim toʻliq ishlaydi) ➜ pilot (faqat bitta boʻlim xavf ostida) ➜ ustma-ust (hamma birdan, qaytish yoʻq).',
      widget: { type: 'step_order', props: { steps: ['Parallel', 'Pilot', 'Ustma-ust'] } }
    },
    {
      id: 'i42q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Yangi brauzerga moslash va xatoni tuzatish.',
      explanation: 'Yangi brauzerga moslash — adaptiv; xatoni tuzatish — korrektiv.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Dasturni yangi brauzerga moslashtirish —' }, { blank: 'adaptiv' }, { text: 'xizmat. Topilgan xatoni tuzatish —' }, { blank: 'korrektiv' }, { text: 'xizmat.' }],
          bank: ['adaptiv', 'korrektiv', 'preventiv']
        }
      }
    },
    {
      id: 'i42q10',
      prompt: 'Eski va yangi tizim bir muddat birga ishlaydigan joriy etish usuli nomini yozing.',
      hint: 'Ikki chiziq yonma-yon.',
      explanation: 'Parallel.',
      widget: { type: 'text_answer', props: { answer: ['parallel'], width: 9 } }
    }
  ]
};
