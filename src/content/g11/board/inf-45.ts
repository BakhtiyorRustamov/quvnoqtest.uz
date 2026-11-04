import type { BoardLesson } from './types';

/** Darslik: 18-bob — elektron xatlarni birlashtirish (mail merge): master hujjat, manba fayl, maydonlar, prompt, filtr, IF…THEN…ELSE. */
export const INF_45: BoardLesson = {
  n: 45,
  label: '45',
  part: 11,
  title: 'Ommaviy xat (mail merge)',
  section: '18.01–18.02',
  steps: [
    {
      kind: 'hook',
      say: "Maktab 300 nafar ota-onaga taklifnoma yubormoqchi. Har biriga ismini yozib, 300 ta xatni qoʻlda terish — kunlar ishi. Elektron xatlarni birlashtirish, yaʼni mail merge, buni bir necha soniyada qiladi: bitta master hujjat yoziladi, ism va manzil oʻrniga maydonlar qoʻyiladi, maʼlumotlar esa manba fayldan avtomatik olinadi. Har bir yozuv uchun alohida xat chiqadi.",
      easy: "Master hujjat + manba fayl = har bir odamga alohida xat.",
      draw: [],
      animTitle: 'Xatlarni birlashtirish',
      anim: {
        type: 'merge',
        template: 'Hurmatli «Ism» «Familiya»!\nSizni 15-mayda «Sinf» sinf ota-onalar yigʻilishiga taklif qilamiz.',
        cols: ['Ism', 'Familiya', 'Sinf'],
        rows: [
          ['Dilnoza', 'Karimova', '11-A'],
          ['Jasur', 'Toʻxtayev', '11-B'],
          ['Malika', 'Rahimova', '10-A']
        ]
      },
      next: 'Qismlarini tushuntiring'
    },
    {
      kind: 'explain',
      say: "Master hujjat — hamma uchun umumiy xat: tashkilot blankasi, sana, matn va boʻsh joylar. Manba fayl — maʼlumotlar: ism, familiya, manzil, elektron pochta. Manba fayl maʼlumotlar bazasi jadvali yoki soʻrovi, elektron jadval, matn muharriri jadvali, vergul bilan ajratilgan CSV fayl yoki pochta kontaktlari boʻlishi mumkin. Maydon — maʼlumot turkumi: «Ism», «Manzil». Master hujjat manba faylga biriktiriladi va maydonlar kerakli joylarga qoʻyiladi.",
      easy: "Master hujjat — umumiy xat. Manba fayl — ismlar roʻyxati. Maydon — «Ism» kabi boʻsh joy.",
      draw: [],
      animTitle: 'Mail merge qismlari',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🗂️', label: 'Manba fayl' },
          { icon: '📄', label: 'Master hujjat' },
          { icon: '📬', label: 'Natija' }
        ],
        items: [
          { texts: ['Ism: Dilnoza', 'Hurmatli «Ism»!', 'Hurmatli Dilnoza!'] },
          { texts: ['Manzil: Chilonzor 5', '«Manzil»', 'Chilonzor 5'] },
          { texts: ['E-pochta: d@maktab.uz', 'yuborish: e-pochtaga', '✉️ d@maktab.uz ga ketdi'] }
        ],
        result: 'Har yozuvga bitta xat'
      },
      next: 'Faqat baʼzilarga yuborsak-chi?'
    },
    {
      kind: 'explain',
      say: "Manba faylda minglab yozuv boʻlishi mumkin, lekin xat hammaga kerak emas. Filtr kerakli yozuvlarni shart boʻyicha tanlaydi: masalan, faqat 11-sinf oʻquvchilari ota-onalariga. Qabul qiluvchilar roʻyxatida faqat filtrdan oʻtganlar qoladi va xat faqat ularga yuboriladi.",
      easy: "Filtr: faqat shartga mos odamlarga xat. Masalan, Sinf = 11-A.",
      draw: [],
      animTitle: 'Filtr bilan birlashtirish',
      anim: {
        type: 'merge',
        template: 'Hurmatli «Ism»! «Sinf» sinf bitiruv kechasi 25-mayda boʻladi.',
        cols: ['Ism', 'Sinf'],
        rows: [
          ['Dilnoza', '11-A'],
          ['Sardor', '10-B'],
          ['Jasur', '11-B'],
          ['Malika', '10-A']
        ],
        keep: [0, 2],
        filter: 'Sinf 11 bilan boshlanadi'
      },
      next: 'Prompt nima?'
    },
    {
      kind: 'explain',
      say: "Baʼzi maʼlumot manba faylda boʻlmaydi va har safar oʻzgaradi: masalan, xatni imzolaydigan oʻqituvchining ismi. Buning uchun prompt qoʻyiladi — birlashtirish paytida dastur foydalanuvchidan soʻraydi. Fill-In bitta joyga javob qoʻyadi. Ask javobni xatchoʻp — bookmark — da saqlaydi, shuning uchun uni hujjatning bir necha joyiga qoʻyish mumkin.",
      easy: "Prompt — birlashtirish paytida savol. Fill-In — bir joyga, Ask — bir necha joyga.",
      draw: [],
      animTitle: 'Fill-In va Ask',
      anim: {
        type: 'compare',
        left: { icon: '❓', title: 'Fill-In', items: ['Birlashtirishda savol beradi', 'Javob bitta joyga qoʻyiladi', 'Masalan: imzolovchi ismi', '«Bir marta soʻrash» oʻchsa — har xatga'] },
        right: { icon: '🔖', title: 'Ask', items: ['Javob xatchoʻpda saqlanadi', 'Bir necha joyga qoʻyiladi', 'Masalan: javob muddati', 'Xatchoʻpga havola orqali'] }
      },
      next: 'Shartli matn-chi?'
    },
    {
      kind: 'explain',
      say: "IF…THEN…ELSE qoidasi manba fayldagi qiymatga qarab turli matn qoʻyadi. Masalan: agar «Toʻlov» maydoni «toʻlangan» boʻlsa — «Rahmat, toʻlovingiz qabul qilindi», aks holda — «Iltimos, 1-iyungacha toʻlang». Shunday qilib, bitta master hujjatdan har xil mazmundagi xatlar chiqadi.",
      easy: "IF: shart bajarilsa bitta matn, bajarilmasa boshqa matn.",
      draw: [],
      animTitle: 'IF…THEN…ELSE qoidasi',
      anim: {
        type: 'sheet',
        cols: ['Ism', 'Toʻlov', 'Xatdagi gap'],
        rows: [
          ['Dilnoza', 'toʻlangan', ''],
          ['Jasur', 'yoʻq', ''],
          ['Malika', 'toʻlangan', '']
        ],
        steps: [
          { cell: 'C2', formula: 'IF «Toʻlov» = "toʻlangan"', refs: ['B2'], result: 'Rahmat!' },
          { cell: 'C3', formula: 'IF «Toʻlov» = "toʻlangan"', refs: ['B3'], result: '1-iyungacha toʻlang' },
          { cell: 'C4', formula: 'IF «Toʻlov» = "toʻlangan"', refs: ['B4'], result: 'Rahmat!' }
        ]
      },
      next: 'Birlashtirish bosqichlari?'
    },
    {
      kind: 'explain',
      say: "Toʻliq jarayon: master hujjatni yaratish, uni manba faylga biriktirish, maydonlarni kerakli joylarga qoʻyish, kerak boʻlsa filtr, prompt va IF qoidalarini qoʻshish, natijani oldindan koʻrib tekshirish va nihoyat birlashtirish — chop etish yoki har bir qabul qiluvchining elektron pochtasiga yuborish.",
      easy: "Master hujjat ➜ manba fayl ➜ maydonlar ➜ filtr ➜ tekshirish ➜ birlashtirish.",
      draw: [],
      animTitle: 'Birlashtirish bosqichlari',
      anim: {
        type: 'cycle',
        center: 'Mail merge',
        stages: [
          { icon: '📄', label: 'Master hujjat' },
          { icon: '🔗', label: 'Manba faylga biriktirish' },
          { icon: '🏷️', label: 'Maydonlarni qoʻyish' },
          { icon: '🔎', label: 'Filtr, prompt, IF' },
          { icon: '👀', label: 'Oldindan koʻrish' },
          { icon: '📬', label: 'Chop etish / yuborish' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Mail merge — manba fayldagi maʼlumotlarni master hujjatga avtomatik qoʻyib, har bir yozuvga alohida xat yaratish.',
    'Master hujjat — umumiy xat; manba fayl — maʼlumotlar (jadval, soʻrov, elektron jadval, CSV, kontaktlar); maydon — «Ism» kabi joy.',
    'Filtr faqat shartga mos yozuvlarga xat yuboradi.',
    'Prompt birlashtirish paytida soʻraydi: Fill-In — bir joyga, Ask — xatchoʻp orqali bir necha joyga.',
    'IF…THEN…ELSE maydon qiymatiga qarab turli matn qoʻyadi.'
  ],
  questions: [
    {
      id: 'i45q1',
      prompt: 'Mail merge bosqichlarini tartiblang.',
      hint: 'Avval xat, oxirida yuborish.',
      explanation: 'Master hujjat ➜ manba faylga biriktirish ➜ maydonlarni qoʻyish ➜ oldindan koʻrish ➜ birlashtirish.',
      widget: { type: 'step_order', props: { steps: ['Master hujjatni yaratish', 'Manba faylga biriktirish', 'Maydonlarni qoʻyish', 'Oldindan koʻrib tekshirish', 'Birlashtirish va yuborish'] } }
    },
    {
      id: 'i45q2',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Umumiy xat, maʼlumotlar, boʻsh joy, tanlash.',
      explanation: 'Master hujjat — umumiy xat; manba fayl — maʼlumotlar; maydon — maʼlumot turkumi; filtr — yozuvlarni shart boʻyicha tanlash.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Master hujjat' }, right: { label: 'hamma uchun umumiy xat' } },
            { left: { label: 'Manba fayl' }, right: { label: 'ismlar va manzillar' } },
            { left: { label: 'Maydon' }, right: { label: '«Ism» kabi maʼlumot turkumi' } },
            { left: { label: 'Filtr' }, right: { label: 'yozuvlarni shart boʻyicha tanlash' } }
          ]
        }
      }
    },
    {
      id: 'i45q3',
      prompt: 'Manba faylda 450 yozuv bor, filtrdan 120 tasi oʻtdi. Nechta xat chiqadi?',
      hint: 'Faqat filtrdan oʻtganlarga.',
      explanation: '120 ta xat.',
      widget: { type: 'number_answer', props: { answer: 120, unit: 'ta' } }
    },
    {
      id: 'i45q4',
      prompt: 'Manba fayl boʻla oladiganlarni bosing.',
      hint: 'Jadval koʻrinishidagi maʼlumotlar.',
      explanation: 'Maʼlumotlar bazasi jadvali, elektron jadval, CSV fayl va pochta kontaktlari — manba fayl boʻladi. MP3 qoʻshiq — yoʻq.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Maʼlumotlar bazasi jadvali', match: true },
            { id: 'b', text: 'Elektron jadval', match: true },
            { id: 'c', text: 'CSV fayl', match: true },
            { id: 'd', text: 'Pochta kontaktlari', match: true },
            { id: 'e', text: 'MP3 qoʻshiq', match: false }
          ]
        }
      }
    },
    {
      id: 'i45q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Ask — xatchoʻp.',
      explanation: 'Ask javobni xatchoʻpda saqlaydi; Fill-In birlashtirishda soʻraydi; filtrdan oʻtmaganlarga xat bormaydi; mail merge elektron pochtaga ham yuboradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ask prompt javobni xatchoʻpda saqlaydi.', value: true },
            { text: 'Fill-In birlashtirish paytida foydalanuvchidan soʻraydi.', value: true },
            { text: 'Filtrdan oʻtmagan yozuvlarga ham xat yuboriladi.', value: false },
            { text: 'Mail merge faqat qogʻozga chop eta oladi, e-pochtaga yubora olmaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i45q6',
      prompt: 'IF «Ball» >= 80 THEN «Tabriklaymiz» ELSE «Qayta topshiring». Ball = 74. Xatda nima yoziladi?',
      hint: '74 ≥ 80 mi?',
      explanation: '74 < 80, shart bajarilmaydi — ELSE qismi: «Qayta topshiring».',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Qayta topshiring', match: true },
            { id: 'b', text: 'Tabriklaymiz', match: false },
            { id: 'c', text: 'Hech narsa', match: false }
          ]
        }
      }
    },
    {
      id: 'i45q7',
      prompt: 'Qaysi biri mail merge atamasi emas?',
      hint: 'Uchtasi xatlarni birlashtirishda ishlatiladi.',
      explanation: 'Maydon, filtr va Fill-In — mail merge atamalari. Keyfreym — animatsiya atamasi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Maydon' }, { text: 'Filtr' }, { text: 'Fill-In' }, { text: 'Keyfreym', odd: true }] } }
    },
    {
      id: 'i45q8',
      prompt: 'Fill-In yoki Ask?',
      hint: 'Javob bir joyga yoki koʻp joyga?',
      explanation: 'Bir joyga qoʻyiladigan javob — Fill-In; xatchoʻpda saqlanib, bir necha joyga qoʻyiladigan — Ask.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'f', label: 'Fill-In' },
            { id: 'a', label: 'Ask' }
          ],
          tiles: [
            { id: 't1', label: 'Javob bitta joyga qoʻyiladi', bin: 'f' },
            { id: 't2', label: 'Javob xatchoʻpda saqlanadi', bin: 'a' },
            { id: 't3', label: 'Javob hujjatning 3 joyida kerak', bin: 'a' },
            { id: 't4', label: 'Faqat imzo ostiga ism', bin: 'f' }
          ]
        }
      }
    },
    {
      id: 'i45q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Umumiy xat va maʼlumotlar fayli.',
      explanation: 'Hamma uchun umumiy xat — master hujjat; ism va manzillar — manba faylda.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Hamma uchun umumiy xat —' }, { blank: 'master' }, { text: 'hujjat. Ism va manzillar' }, { blank: 'manba' }, { text: 'faylda saqlanadi.' }],
          bank: ['master', 'manba', 'niqob']
        }
      }
    },
    {
      id: 'i45q10',
      prompt: 'Elektron xatlarni birlashtirishning inglizcha nomini yozing (ikki soʻz).',
      hint: 'Mail …',
      explanation: 'Mail merge.',
      widget: { type: 'text_answer', props: { answer: ['mail merge', 'mailmerge'], width: 11 } }
    }
  ]
};
