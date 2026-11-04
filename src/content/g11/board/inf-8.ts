import type { BoardLesson } from './types';

/** Darslik: 2.02–2.04 — tizimli va amaliy dasturiy taʼminot, operatsion tizim, drayverlar, utilitlar, buyurtma va tayyor dasturlar. */
export const INF_8: BoardLesson = {
  n: 8,
  label: '8',
  part: 10,
  title: 'Dasturiy taʼminot va operatsion tizim',
  section: '2.02–2.04',
  steps: [
    {
      kind: 'hook',
      say: "Yangi telefonni yoqdingiz. Ilovalar hali ochilmagan, lekin ekranda soat, batareya va tarmoq belgisi bor, tugmalar ishlaydi. Bularning hammasini operatsion tizim boshqaradi. U apparat bilan dasturlar orasidagi «boshqaruvchi»: siz «Chop etish»ni bossangiz, buyruq ilovadan operatsion tizimga, undan drayver orqali printerga boradi.",
      easy: "Operatsion tizim — vositachi. Ilova «chop et» deydi, operatsion tizim buyruqni drayverga beradi, drayver esa printerga uning tilida tushuntiradi.",
      draw: [],
      animTitle: 'Buyruq qanday yetib boradi',
      anim: {
        type: 'flow',
        stations: [
          { icon: '📝', label: 'Ilova' },
          { icon: '🪟', label: 'Operatsion tizim' },
          { icon: '🔧', label: 'Drayver' },
          { icon: '🖨️', label: 'Printer' }
        ],
        items: [{ texts: ['«Chop etish»', 'umumiy buyruq', 'printer tilidagi buyruq', '📄 chiqdi'] }],
        result: 'Drayver har bir qurilma modeliga moslab tarjima qiladi'
      },
      next: 'Davom eting'
    },
    {
      kind: 'explain',
      say: "Dasturiy taʼminot — kompyuterga koʻrsatma beradigan dasturlar. Ular ikki guruhga boʻlinadi. Tizimli dasturlar kompyuterning oʻzini ishlatadi va unga xizmat koʻrsatadi: operatsion tizim, qurilma drayverlari, utilitlar, kompilyator va interpretatorlar. Amaliy dasturlar esa foydalanuvchining ishini bajaradi: matn muharriri, elektron jadval, brauzer, oʻyinlar, foto va video muharrirlar.",
      easy: "Tizimli dastur — kompyuter uchun ishlaydi. Amaliy dastur — siz uchun ishlaydi: yozish, hisoblash, rasm chizish, oʻyin.",
      draw: [],
      animTitle: 'Ikki guruh dasturlar',
      anim: {
        type: 'compare',
        left: { icon: '⚙️', title: 'Tizimli', items: ['Operatsion tizim', 'Qurilma drayverlari', 'Utilitlar', 'Kompilyator, interpretator'] },
        right: { icon: '🧑‍💻', title: 'Amaliy', items: ['Matn muharriri', 'Elektron jadval', 'Veb-brauzer', 'Oʻyin, foto va video muharrir'] }
      },
      next: 'OT nima qiladi?'
    },
    {
      kind: 'explain',
      say: "Operatsion tizim kompyuter yoqilganda BIOS dan keyin birinchi ishga tushadi. Uning vazifalari: dasturlarga xotira ajratadi; har bir ishlab turgan vazifaga protsessor vaqtini taqsimlaydi; klaviatura va sichqoncha bosilishiga javob beradi; ekran va printerga maʼlumot yuboradi; fayllarni ochadi va saqlaydi; xato boʻlsa xabar beradi; foydalanuvchilar kirishi va xavfsizligini boshqaradi. Misollar: Windows, macOS, Linux, Android, iOS.",
      easy: "Operatsion tizim — kompyuterning boshqaruvchisi: xotirani, protsessorni, fayllarni va qurilmalarni taqsimlaydi va nazorat qiladi.",
      draw: [],
      animTitle: 'Operatsion tizim vazifalari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🧠', title: 'Xotira', text: 'Dasturlarga RAM ajratadi' },
          { icon: '⏱️', title: 'Protsessor', text: 'Vazifalarga vaqt taqsimlaydi' },
          { icon: '⌨️', title: 'Qurilmalar', text: 'Kiritish va chiqarishni boshqaradi' },
          { icon: '📁', title: 'Fayllar', text: 'Ochadi, saqlaydi, yopadi' },
          { icon: '⚠️', title: 'Xabarlar', text: 'Xato va holat haqida' },
          { icon: '🔐', title: 'Xavfsizlik', text: 'Foydalanuvchi kirishi' }
        ]
      },
      next: 'Utilitlar-chi?'
    },
    {
      kind: 'example',
      say: "Utilitlar kompyuterga xizmat koʻrsatadigan kichik tizimli dasturlar: antivirus, zaxira nusxa yaratish, fayllarni siqish, diskni formatlash va defragmentatsiya. Defragmentatsiyani koʻraylik. Qattiq diskda fayllar vaqt oʻtishi bilan boʻlak-boʻlak boʻlib, turli joylarga sochilib ketadi va disk ularni sekin oʻqiydi. Defragmentatsiya boʻlaklarni joyini almashtirib, har bir faylni bir joyga yigʻadi.",
      easy: "Fayl boʻlaklari diskda tarqalib ketgan. Defragmentatsiya ularni xuddi kitob javonini tartiblagandek, yonma-yon qilib qoʻyadi. Natijada fayl tezroq ochiladi.",
      draw: [],
      animTitle: 'Defragmentatsiya',
      anim: { type: 'defrag', blocks: 'A.BAC.BA.CB..A.C', files: { A: 'referat.docx', B: 'rasm.jpg', C: 'musiqa.mp3' } },
      next: 'Boshqa utilitlar?'
    },
    {
      kind: 'explain',
      say: "Boshqa utilitlar ham muhim. Antivirus fayllarni maʼlum viruslar roʻyxati bilan solishtiradi va shubhali dasturlarni karantinga oladi. Zaxira nusxa dasturi fayllarni boshqa joyga muntazam koʻchiradi. Siqish dasturi fayl hajmini kamaytiradi. Formatlash diskni yangi ishlatish uchun tayyorlaydi va undagi hamma maʼlumotni oʻchiradi. Tozalash dasturi keraksiz vaqtinchalik fayllarni olib tashlaydi.",
      easy: "Antivirus — himoya. Zaxira — nusxa saqlaydi. Siqish — hajmni kichraytiradi. Formatlash — diskni tozalab tayyorlaydi. Tozalash — keraksiz fayllarni oʻchiradi.",
      draw: [],
      animTitle: 'Utilitlar',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🛡️', title: 'Antivirus', text: 'Viruslar roʻyxati bilan solishtiradi, karantinga oladi' },
          { icon: '💾', title: 'Zaxira nusxa', text: 'Fayllarni muntazam boshqa joyga koʻchiradi' },
          { icon: '🗜️', title: 'Siqish', text: 'Fayl hajmini kamaytiradi' },
          { icon: '🧹', title: 'Formatlash', text: 'Diskni tayyorlaydi — hammasi oʻchadi' }
        ]
      },
      next: 'Davom eting'
    },
    {
      kind: 'explain',
      say: "Dastur sotib olishda ikki yoʻl bor. Tayyor dastur — hamma uchun yozilgan, darhol sotib olib ishlatsa boʻladi, arzon, chunki xarajat minglab mijozlar orasida boʻlinadi; xatolari tez topilib tuzatiladi. Lekin baʼzi kerakli funksiyalar boʻlmasligi va keraksizlari koʻp boʻlishi mumkin. Buyurtma dastur — aynan bir tashkilot talabiga moslab yoziladi, mavjud tizimlarga mos keladi, lekin qimmat, uzoq vaqt kutish kerak va dastlab xatolar koʻproq uchraydi.",
      easy: "Tayyor dastur — doʻkondagi tayyor kiyim: arzon va darhol olasiz, lekin hammaga bir xil. Buyurtma dastur — tikuvchiga tiktirilgan kiyim: aynan sizga mos, lekin qimmat va kutish kerak.",
      draw: [],
      animTitle: 'Tayyor yoki buyurtma',
      anim: {
        type: 'compare',
        left: { icon: '📦', title: 'Tayyor', items: ['Darhol ishlatish mumkin', 'Arzon', 'Xatolar tez tuzatiladi', 'Keraksiz funksiyalar koʻp', 'Talabga toʻliq mos emas'] },
        right: { icon: '✂️', title: 'Buyurtma', items: ['Aynan talabga mos', 'Mavjud tizimga moslanadi', 'Qimmat', 'Uzoq kutish', 'Dastlab xatolar koʻproq'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Tizimli dasturlar kompyuterni ishlatadi: OT, drayverlar, utilitlar, kompilyator, interpretator.',
    'Amaliy dasturlar foydalanuvchi ishini bajaradi: matn, jadval, brauzer, oʻyin, muharrirlar.',
    'OT: xotira va protsessor vaqtini taqsimlaydi, qurilmalar, fayllar, xatolar va xavfsizlikni boshqaradi.',
    'Utilitlar: antivirus, zaxira nusxa, siqish, formatlash, defragmentatsiya.',
    'Tayyor dastur — arzon va tez; buyurtma dastur — talabga mos, lekin qimmat va uzoq.'
  ],
  questions: [
    {
      id: 'i8q1',
      prompt: 'Tizimli yoki amaliy dastur?',
      hint: 'Kompyuter uchunmi yoki foydalanuvchi uchunmi?',
      explanation: 'OT, drayver, antivirus — tizimli. Brauzer, elektron jadval, video muharrir — amaliy.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 's', label: 'Tizimli' },
            { id: 'a', label: 'Amaliy' }
          ],
          tiles: [
            { id: 't1', label: 'Android', bin: 's' },
            { id: 't2', label: 'Veb-brauzer', bin: 'a' },
            { id: 't3', label: 'Printer drayveri', bin: 's' },
            { id: 't4', label: 'Elektron jadval', bin: 'a' },
            { id: 't5', label: 'Antivirus', bin: 's' },
            { id: 't6', label: 'Video muharrir', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'i8q2',
      prompt: 'Utilitni vazifasi bilan juftlang.',
      hint: 'Himoya, nusxa, hajm, tartib.',
      explanation: 'Antivirus — zararli dasturlarni topadi; zaxira — nusxa saqlaydi; siqish — hajmni kamaytiradi; defragmentatsiya — fayl boʻlaklarini yigʻadi.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Antivirus' }, right: { label: 'zararli dasturlarni topadi' } },
            { left: { label: 'Zaxira nusxa' }, right: { label: 'fayllar nusxasini saqlaydi' } },
            { left: { label: 'Siqish' }, right: { label: 'fayl hajmini kamaytiradi' } },
            { left: { label: 'Defragmentatsiya' }, right: { label: 'fayl boʻlaklarini bir joyga yigʻadi' } }
          ]
        }
      }
    },
    {
      id: 'i8q3',
      prompt: 'Qaysilari operatsion tizim vazifasi? Bosing.',
      hint: 'Boshqaruvchi nimalarni taqsimlaydi?',
      explanation: 'OT xotira, protsessor vaqti, fayllar va xavfsizlikni boshqaradi. Referat yozish va video montaj — amaliy dasturlar ishi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Dasturlarga xotira ajratish', match: true },
            { id: 'b', text: 'Protsessor vaqtini taqsimlash', match: true },
            { id: 'c', text: 'Foydalanuvchi kirishini nazorat qilish', match: true },
            { id: 'd', text: 'Referat matnini yozish', match: false },
            { id: 'e', text: 'Videoga musiqa qoʻshish', match: false }
          ]
        }
      }
    },
    {
      id: 'i8q4',
      prompt: 'Tayyor yoki buyurtma dastur xususiyati?',
      hint: 'Kim uchun yozilgan?',
      explanation: 'Tayyor: darhol, arzon, keraksiz funksiyalar. Buyurtma: talabga mos, qimmat, uzoq kutish.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 't', label: 'Tayyor' },
            { id: 'b', label: 'Buyurtma' }
          ],
          tiles: [
            { id: 't1', label: 'Darhol ishlatish mumkin', bin: 't' },
            { id: 't2', label: 'Aynan talabga mos', bin: 'b' },
            { id: 't3', label: 'Arzon', bin: 't' },
            { id: 't4', label: 'Qimmat va uzoq kutish', bin: 'b' },
            { id: 't5', label: 'Keraksiz funksiyalar koʻp', bin: 't' },
            { id: 't6', label: 'Mavjud tizimga moslab yoziladi', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'i8q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Formatlash nima qiladi?',
      explanation: 'Formatlash maʼlumotni oʻchiradi; drayver qurilmani OT bilan bogʻlaydi; defragmentatsiya faylni bir joyga yigʻadi; OT BIOS dan keyin ishga tushadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Formatlash diskdagi fayllarni saqlab qoladi.', value: false },
            { text: 'Drayver OT ga qurilma bilan «gaplashish»ga yordam beradi.', value: true },
            { text: 'Defragmentatsiyadan keyin fayl boʻlaklari bir joyda turadi.', value: true },
            { text: 'Operatsion tizim BIOS dan oldin ishga tushadi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i8q6',
      prompt: 'Qaysi biri operatsion tizim emas?',
      hint: 'Uchtasi telefon yoki kompyuterni boshqaradi.',
      explanation: 'Windows, Linux va iOS — operatsion tizimlar. Excel — amaliy dastur (elektron jadval).',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Windows' }, { text: 'Linux' }, { text: 'iOS' }, { text: 'Excel', odd: true }] } }
    },
    {
      id: 'i8q7',
      prompt: '«Chop etish» buyrugʻining yoʻlini tartiblang.',
      hint: 'Ilovadan printergacha.',
      explanation: 'Ilova ➜ operatsion tizim ➜ drayver ➜ printer.',
      widget: { type: 'step_order', props: { steps: ['Foydalanuvchi ilovada «Chop etish»ni bosadi', 'Ilova OT ga umumiy buyruq beradi', 'Drayver buyruqni printer tiliga oʻgiradi', 'Printer sahifani chiqaradi'] } }
    },
    {
      id: 'i8q8',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Tayyor kiyim va tikuvchi.',
      explanation: 'Hammaga birdek sotiladigani — tayyor dastur, tashkilot talabiga moslab yozilgani — buyurtma dastur.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Doʻkondan sotib olinib darhol ishlatiladigan dastur —' }, { blank: 'tayyor' }, { text: ', bitta tashkilot uchun maxsus yozilgani —' }, { blank: 'buyurtma' }, { text: 'dastur.' }],
          bank: ['tayyor', 'buyurtma', 'tizimli']
        }
      }
    },
    {
      id: 'i8q9',
      prompt: 'Diskdagi qator: A B A B (A — bitta fayl, B — boshqa fayl). Defragmentatsiyadan keyin A fayli nechta boʻlakdan iborat boʻladi?',
      hint: 'Har bir fayl bir joyga yigʻiladi.',
      explanation: 'Defragmentatsiyadan keyin: A A B B — A fayli bitta yaxlit boʻlak.',
      widget: { type: 'number_answer', props: { answer: 1, unit: 'boʻlak' } }
    },
    {
      id: 'i8q10',
      prompt: 'Qurilma bilan OT orasidagi «tarjimon» dastur nomini yozing.',
      hint: 'Har bir printer modeliga oʻzining …',
      explanation: 'Drayver — qurilmaga maxsus koʻrsatmalar yuboradigan dastur.',
      widget: { type: 'text_answer', props: { before: 'Qurilma', answer: ['drayver', 'drayveri'], width: 8 } }
    }
  ]
};
