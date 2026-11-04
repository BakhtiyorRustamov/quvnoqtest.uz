import type { BoardLesson } from './types';

/** Darslik: 1.05 — maʼlumotlarning toʻgʻriligini tekshirish: validatsiya va verifikatsiya. */
export const INF_5: BoardLesson = {
  n: 5,
  label: '5',
  part: 10,
  title: 'Validatsiya va verifikatsiya',
  section: '1.05',
  steps: [
    {
      kind: 'hook',
      say: "Olimpiadaga roʻyxatdan oʻtish formasi. Oʻquvchi shoshib toʻldirdi va «Yuborish»ni bosdi. Dastur har bir maydonni oʻz qoidasi bilan tekshiradi: ism boʻsh qolmaganmi, yosh 10 bilan 18 orasidami, telefon raqami toʻliqmi, elektron pochtada kuchukcha belgisi bormi. Kuzatamiz.",
      easy: "Forma toʻldirilganda dastur har bir qatorni qoidaga solishtiradi. Qoidaga mos kelmasa, qizil xabar chiqaradi va qayta yozishni soʻraydi.",
      draw: [],
      animTitle: 'Roʻyxatdan oʻtish formasi',
      anim: {
        type: 'form',
        title: '🏆 Olimpiada anketasi',
        fields: [
          { label: 'Ism', value: '', check: 'Mavjudlik', ok: false, note: 'maydon boʻsh qolmasligi kerak' },
          { label: 'Yosh', value: '160', check: 'Diapazon', ok: false, note: '10 dan 18 gacha boʻlishi kerak' },
          { label: 'Telefon', value: '90 123 45', check: 'Uzunlik', ok: false, note: '9 ta raqam boʻlishi kerak' },
          { label: 'E-pochta', value: 'aziz.mail.uz', check: 'Format', ok: false, note: '@ belgisi yoʻq' },
          { label: 'Sinf', value: '10', check: 'Tur', ok: true, note: 'butun son — toʻgʻri' }
        ]
      },
      next: 'Bu qanday ishlaydi?'
    },
    {
      kind: 'explain',
      say: "Bu — validatsiya: kiritilayotgan maʼlumot belgilangan qoidalarga mos kelishini tekshirish. Asosiy turlari: mavjudlik — maydon boʻsh emasmi; diapazon — qiymat quyi va yuqori chegara orasidami; cheklov — faqat bitta chegara, masalan, yosh kamida 6; tur — son kerak joyda harf yoʻqmi; uzunlik — belgilar soni toʻgʻrimi; format — andozaga mosmi, masalan, sana kun nuqta oy nuqta yil koʻrinishida; tekshiruv raqami — kod oxiridagi maxsus raqam.",
      easy: "Validatsiya — qoidaga solishtirish. Boʻshmi? Chegara ichidami? Sonmi? Uzunligi toʻgʻrimi? Andozaga mosmi? Har biri — alohida tekshiruv.",
      draw: [],
      animTitle: 'Validatsiya turlari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '❗', title: 'Mavjudlik', text: 'Maydon boʻsh emas' },
          { icon: '↔️', title: 'Diapazon', text: 'Quyi va yuqori chegara: 10–18' },
          { icon: '⬆️', title: 'Cheklov', text: 'Bitta chegara: kamida 6' },
          { icon: '🔤', title: 'Tur', text: 'Son kerak — harf emas' },
          { icon: '📏', title: 'Uzunlik', text: 'Telefon — 9 ta raqam' },
          { icon: '🧩', title: 'Format', text: 'Sana: KK.OO.YYYY' },
          { icon: '🔢', title: 'Tekshiruv raqami', text: 'Kod oxiridagi hisoblangan raqam' }
        ]
      },
      next: 'Tekshiruv raqami nima?'
    },
    {
      kind: 'example',
      say: "Tekshiruv raqami shtrix-kodlar va karta raqamlarida ishlatiladi. Kodning oxirgi raqami boshqa raqamlardan hisoblab topiladi. Oddiy misol: 3528 kodi raqamlarining yigʻindisi 18, oxirgi raqami 8 — u tekshiruv raqami sifatida oxiriga qoʻshiladi: 35288. Agar kassir bitta raqamni xato kiritsa, kompyuter qayta hisoblaydi, natija mos kelmaydi va xato darhol aniqlanadi. Haqiqiy shtrix-kodlarda hisoblash murakkabroq, lekin gʻoya xuddi shu.",
      easy: "Kod raqamlarini qoʻshamiz: 3 + 5 + 2 + 8 = 18. Oxirgi raqam 8 ni kod oxiriga yozamiz. Kimdir raqamni adashtirsa, yigʻindi oʻzgaradi va xato topiladi.",
      draw: [],
      animTitle: 'Tekshiruv raqamini hisoblash',
      anim: {
        type: 'code',
        lang: 'pseudo',
        lines: ['kod ← "3528"', 'yigʻindi ← 0', 'har bir raqam r uchun:', '    yigʻindi ← yigʻindi + r', 'tekshiruv ← yigʻindi mod 10', 'chiqar(kod + tekshiruv)'],
        trace: [
          { line: 1, vars: { kod: '3528' } },
          { line: 2, vars: { 'yigʻindi': 0 } },
          { line: 4, vars: { r: 3, 'yigʻindi': 3 } },
          { line: 4, vars: { r: 5, 'yigʻindi': 8 } },
          { line: 4, vars: { r: 2, 'yigʻindi': 10 } },
          { line: 4, vars: { r: 8, 'yigʻindi': 18 } },
          { line: 5, vars: { tekshiruv: 8 } },
          { line: 6, out: '35288' }
        ]
      },
      next: 'Davom eting'
    },
    {
      kind: 'explain',
      say: "Muhim narsa: validatsiya maʼlumot toʻgʻri ekanini kafolatlamaydi. «a@b.c» format tekshiruvidan oʻtadi, lekin bunday pochta yoʻq. Shuning uchun verifikatsiya ham kerak: kiritilgan maʼlumot asl manbaga mos kelishini tekshirish. Ikki usuli bor. Vizual tekshirish — kiritilganini asl hujjat bilan koʻz bilan solishtirish. Ikki marta kiritish — maʼlumot ikki marta kiritiladi va kompyuter ikkalasini solishtiradi, masalan, yangi parolni takrorlab yozish.",
      easy: "Validatsiya — «qoidaga mosmi?». Verifikatsiya — «asl hujjatdagidek kiritildimi?». Birinchisi qoida bilan, ikkinchisi asl manba bilan solishtiradi.",
      draw: [],
      animTitle: 'Validatsiya va verifikatsiya',
      anim: {
        type: 'compare',
        left: { icon: '📐', title: 'Validatsiya', items: ['Qoidaga mosmi?', 'Kompyuter avtomatik tekshiradi', 'Mavjudlik, diapazon, format…', 'Toʻgʻrilikni kafolatlamaydi'] },
        right: { icon: '🪞', title: 'Verifikatsiya', items: ['Asl manbaga mosmi?', 'Vizual tekshirish', 'Ikki marta kiritish', 'Koʻchirishdagi xatoni topadi'] }
      },
      next: 'Misol koʻrsating'
    },
    {
      kind: 'example',
      say: "Operator qogʻoz anketalarni kompyuterga kiritmoqda. Vizual tekshirishda u ekrandagini qogʻoz bilan solishtiradi. «Karimov» — mos. «Toshkent» oʻrniga «Tashkent» yozib qoʻyibdi — mos emas! Bu soʻz ham validatsiyadan oʻtgan edi: maydon boʻsh emas, faqat harflar. Lekin asl hujjatga mos kelmadi — buni faqat verifikatsiya topdi.",
      easy: "Kiritilgan soʻz qoidaga mos edi, lekin anketadagi soʻz boshqacha. Buni koʻz bilan solishtirish — vizual tekshirish orqali topdik.",
      draw: [],
      animTitle: 'Vizual tekshirish',
      anim: {
        type: 'flow',
        stations: [
          { icon: '📄', label: 'Qogʻoz anketa' },
          { icon: '⌨️', label: 'Kiritildi' },
          { icon: '👀', label: 'Solishtirish' }
        ],
        items: [
          { texts: ['Karimov', 'Karimov', '✅ mos'] },
          { texts: ['Toshkent', 'Tashkent', '❌ mos emas'] },
          { texts: ['2009', '2009', '✅ mos'] }
        ],
        result: 'Validatsiya + verifikatsiya = kamroq xato'
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Validatsiya — maʼlumot qoidalarga mosligini tekshirish: mavjudlik, diapazon, cheklov, tur, uzunlik, format, tekshiruv raqami.',
    'Validatsiya maʼlumot toʻgʻri ekanini kafolatlamaydi.',
    'Verifikatsiya — kiritilgan maʼlumot asl manbaga mosligini tekshirish: vizual tekshirish, ikki marta kiritish.',
    'Ikkalasi birga ishlatilsa, xato maʼlumot kiritilish ehtimoli kamayadi.'
  ],
  questions: [
    {
      id: 'i5q1',
      prompt: 'Qoidani tekshiruv turi bilan juftlang.',
      hint: 'Boʻsh, chegara, belgilar soni, andoza.',
      explanation: 'Boʻsh emas — mavjudlik; 10–18 — diapazon; 9 ta raqam — uzunlik; KK.OO.YYYY — format.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Ism boʻsh qolmasin' }, right: { label: 'mavjudlik' } },
            { left: { label: 'Yosh 10 dan 18 gacha' }, right: { label: 'diapazon' } },
            { left: { label: 'Telefon — 9 ta raqam' }, right: { label: 'uzunlik' } },
            { left: { label: 'Sana: 05.09.2025 koʻrinishida' }, right: { label: 'format' } }
          ]
        }
      }
    },
    {
      id: 'i5q2',
      prompt: 'Validatsiya yoki verifikatsiya?',
      hint: 'Qoida bilanmi yoki asl hujjat bilanmi?',
      explanation: 'Qoidaga solishtirish — validatsiya. Asl manbaga solishtirish (vizual tekshirish, ikki marta kiritish) — verifikatsiya.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'v', label: 'Validatsiya' },
            { id: 'f', label: 'Verifikatsiya' }
          ],
          tiles: [
            { id: 't1', label: 'Diapazon tekshiruvi', bin: 'v' },
            { id: 't2', label: 'Parolni ikki marta yozish', bin: 'f' },
            { id: 't3', label: 'Format tekshiruvi', bin: 'v' },
            { id: 't4', label: 'Ekranni qogʻoz bilan solishtirish', bin: 'f' },
            { id: 't5', label: 'Tekshiruv raqami', bin: 'v' },
            { id: 't6', label: 'Mavjudlik tekshiruvi', bin: 'v' }
          ]
        }
      }
    },
    {
      id: 'i5q3',
      prompt: 'Diapazon qoidasi: yosh 10 dan 18 gacha (ikkalasi ham kiradi). Qaysi qiymatlar oʻtadi?',
      hint: 'Chegaralar ham ruxsat etilgan.',
      explanation: '10, 15 va 18 — oʻtadi. 9 va 19 chegaradan tashqarida.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: '9', match: false },
            { id: 'b', text: '10', match: true },
            { id: 'c', text: '15', match: true },
            { id: 'd', text: '18', match: true },
            { id: 'e', text: '19', match: false }
          ]
        }
      }
    },
    {
      id: 'i5q4',
      prompt: 'Tekshiruv raqamini toping: kod 4126, qoida — raqamlar yigʻindisining oxirgi raqami.',
      hint: '4 + 1 + 2 + 6 = ?',
      explanation: '4 + 1 + 2 + 6 = 13, oxirgi raqami 3. Toʻliq kod: 41263.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'i5q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Validatsiya nimani kafolatlaydi?',
      explanation: 'Validatsiyadan oʻtgan maʼlumot ham xato boʻlishi mumkin; diapazonda ikki chegara, cheklovda bitta; ikki marta kiritish — verifikatsiya; verifikatsiya asl manbaga solishtiradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Validatsiyadan oʻtgan maʼlumot har doim toʻgʻri.', value: false },
            { text: 'Cheklov tekshiruvida faqat bitta chegara boʻladi.', value: true },
            { text: 'Ikki marta kiritish — validatsiya usuli.', value: false },
            { text: 'Verifikatsiya maʼlumotni asl manba bilan solishtiradi.', value: true }
          ]
        }
      }
    },
    {
      id: 'i5q6',
      prompt: 'Qaysi biri validatsiya tekshiruvi emas?',
      hint: 'Bittasi asl manba bilan solishtiradi.',
      explanation: 'Vizual tekshirish — verifikatsiya usuli. Qolganlari validatsiya.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Mavjudlik' }, { text: 'Uzunlik' }, { text: 'Format' }, { text: 'Vizual tekshirish', odd: true }] } }
    },
    {
      id: 'i5q7',
      prompt: 'Format qoidasi: «matn@matn.matn». Qaysi yozuvlar oʻtadi?',
      hint: '@ dan oldin va keyin matn, keyin nuqta.',
      explanation: 'aziz@mail.uz va a@b.c oʻtadi. Lekin a@b.c haqiqiy pochta emas — validatsiya toʻgʻrilikni kafolatlamaydi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'aziz@mail.uz', match: true },
            { id: 'b', text: 'a@b.c', match: true },
            { id: 'c', text: 'aziz.mail.uz', match: false },
            { id: 'd', text: '@mail.uz', match: false },
            { id: 'e', text: 'aziz@', match: false }
          ]
        }
      }
    },
    {
      id: 'i5q8',
      prompt: 'Validatsiya jarayonini tartiblang.',
      hint: 'Kiritishdan qabul qilishgacha.',
      explanation: 'Maʼlumot kiritiladi ➜ qoida bilan tekshiriladi ➜ mos kelmasa xabar chiqadi ➜ foydalanuvchi tuzatadi ➜ maʼlumot qabul qilinadi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Maʼlumot kiritiladi', 'Qoida bilan tekshiriladi', 'Mos kelmasa — xato haqida xabar', 'Foydalanuvchi tuzatadi', 'Maʼlumot qabul qilinadi'] }
      }
    },
    {
      id: 'i5q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Qoida yoki asl manba?',
      explanation: 'Qoidaga mosligini — validatsiya, asl manbaga mosligini — verifikatsiya tekshiradi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Maʼlumot qoidaga mosligini' }, { blank: 'validatsiya' }, { text: ', asl manbaga mosligini esa' }, { blank: 'verifikatsiya' }, { text: 'tekshiradi.' }],
          bank: ['validatsiya', 'verifikatsiya', 'shifrlash']
        }
      }
    },
    {
      id: 'i5q10',
      prompt: 'Tekshiruv turini yozing.',
      hint: 'Belgilar soni.',
      explanation: 'Belgilar soni tekshirilsa — uzunlik tekshiruvi.',
      widget: { type: 'text_answer', props: { before: 'Telefon raqami 9 ta raqamdan iboratmi? —', after: 'tekshiruvi.', answer: 'uzunlik', width: 9 } }
    }
  ]
};
