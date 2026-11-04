import type { BoardLesson } from './types';

/** Darslik: 13.02–13.03 — tarmoq xavfsizligi: ruxsatsiz kirish, himoya choralari, maʼlumotlarni himoya qilish; sunʼiy yoʻldosh aloqasi va GPS. */
export const INF_37: BoardLesson = {
  n: 37,
  label: '37',
  part: 11,
  title: 'Tarmoq xavfsizligi va GPS',
  section: '13.02–13.03',
  steps: [
    {
      kind: 'hook',
      say: "Maktab tarmogʻiga internetdan har soniyada yuzlab paket keladi. Ular orasida oddiy sahifalar ham, buzgʻunchining kirishga urinishi ham bor. Tarmoq chegarasida fayervol — tarmoq devori — turadi. U har bir paketni qoidalar bilan tekshiradi: ruxsat etilganini oʻtkazadi, shubhalisini toʻsadi.",
      easy: "Fayervol — tarmoq darvozasidagi qorovul: yaxshi paketni kiritadi, xavflisini toʻxtatadi.",
      draw: [],
      animTitle: 'Fayervol paketlarni tekshiradi',
      anim: {
        type: 'net',
        nodes: [
          { id: 'i', x: 10, y: 28, icon: '🌐', label: 'Internet' },
          { id: 'f', x: 50, y: 28, icon: '🧱', label: 'Fayervol' },
          { id: 's', x: 90, y: 14, icon: '🏫', label: 'Maktab tarmogʻi' },
          { id: 'x', x: 50, y: 52, icon: '🚫', label: 'Toʻsildi' }
        ],
        links: [
          ['i', 'f'],
          ['f', 's'],
          ['f', 'x']
        ],
        packets: [
          { path: ['i', 'f', 's'], label: '✓ dars sahifasi', color: '#22c55e' },
          { path: ['i', 'f', 'x'], label: '✗ parol tanlash', color: '#ef4444' },
          { path: ['i', 'f', 's'], label: '✓ elektron xat', color: '#22c55e' },
          { path: ['i', 'f', 'x'], label: '✗ zararli fayl', color: '#ef4444' }
        ]
      },
      next: 'Qanday xavflar bor?'
    },
    {
      kind: 'explain',
      say: "Tarmoqdagi asosiy xavflar. Ruxsatsiz kirish — xaker zaif parolni topib, tarmoqqa kiradi va maʼlumotni oʻqiydi, oʻzgartiradi yoki oʻchiradi. Zararli dasturlar: viruslar, tarmoqda oʻzi tarqaladigan chuvalchanglar, troyanlar, bosilgan tugmalarni yozib oluvchi keylogger. Xizmatni ishdan chiqarish hujumi — serverga minglab soxta soʻrov yuborib, uni haqiqiy foydalanuvchilar uchun ishlamaydigan qilish.",
      easy: "Xavflar: begona kirishi, zararli dasturlar va serverni soxta soʻrovlar bilan toʻldirib ishdan chiqarish.",
      draw: [],
      animTitle: 'Tarmoq xavflari',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🕵️', title: 'Ruxsatsiz kirish', text: 'Zaif parol orqali buzib kirish' },
          { icon: '🐛', title: 'Zararli dasturlar', text: 'Virus, chuvalchang, troyan' },
          { icon: '⌨️', title: 'Keylogger', text: 'Bosilgan tugmalarni yozib oladi' },
          { icon: '🌊', title: 'Xizmatni ishdan chiqarish', text: 'Serverni soxta soʻrovlar bilan toʻldirish' }
        ]
      },
      next: 'Qanday himoyalanamiz?'
    },
    {
      kind: 'explain',
      say: "Himoya choralari. Autentifikatsiya — foydalanuvchi kimligini tekshirish: parol, biometrika va ikki bosqichli tasdiqlash — parol va telefonga kelgan kod. Kirish huquqlari — har kim faqat oʻziga kerakli maʼlumotni koʻradi: oʻquvchi baholarini koʻradi, lekin oʻzgartira olmaydi. Fayervol va proksi-server — trafikni nazorat qiladi. Shifrlash — ushlangan maʼlumotni tushunarsiz qiladi. Antivirus va yangilanishlar, muntazam zaxira nusxa va xodimlarni oʻqitish ham shart.",
      easy: "Kimligini tekshirish, huquqlarni cheklash, fayervol, shifrlash, antivirus, zaxira va oʻqitish.",
      draw: [],
      animTitle: 'Himoya choralari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🔐', title: 'Autentifikatsiya', text: 'Parol, biometrika, 2 bosqich' },
          { icon: '🗝️', title: 'Kirish huquqlari', text: 'Faqat kerakli maʼlumot' },
          { icon: '🧱', title: 'Fayervol, proksi', text: 'Trafikni nazorat qiladi' },
          { icon: '🔒', title: 'Shifrlash', text: 'Ushlangan maʼlumot tushunarsiz' },
          { icon: '🛡️', title: 'Antivirus', text: 'Yangilab turiladi' },
          { icon: '💾', title: 'Zaxira nusxa', text: 'Muntazam, boshqa joyda' }
        ]
      },
      next: 'Maʼlumotlarni himoya qilish qonuni?'
    },
    {
      kind: 'explain',
      say: "Koʻp davlatlarda, jumladan Oʻzbekistonda ham, shaxsga doir maʼlumotlarni himoya qilish toʻgʻrisida qonun bor. Uning asosiy tamoyillari: maʼlumot faqat aniq maqsad uchun va egasining roziligi bilan yigʻiladi; faqat kerakli maʼlumot olinadi; maʼlumot aniq va yangilangan boʻlishi kerak; keragidan ortiq saqlanmaydi; xavfsiz saqlanadi; egasi oʻz maʼlumotini koʻrish va tuzattirish huquqiga ega.",
      easy: "Shaxsiy maʼlumot rozilik bilan, aniq maqsad uchun, faqat keraklicha yigʻiladi va xavfsiz saqlanadi.",
      draw: [],
      animTitle: 'Maʼlumotlarni himoya qilish tamoyillari',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '✍️', title: 'Rozilik va maqsad', text: 'Egasining roziligi, aniq maqsad' },
          { icon: '✂️', title: 'Faqat keraklisi', text: 'Ortiqcha maʼlumot yigʻilmaydi' },
          { icon: '🎯', title: 'Aniq va yangi', text: 'Xatolar tuzatiladi' },
          { icon: '⏳', title: 'Muddat', text: 'Keragidan ortiq saqlanmaydi' },
          { icon: '🔒', title: 'Xavfsizlik', text: 'Begonadan himoyalangan' },
          { icon: '👁️', title: 'Egasining huquqi', text: 'Koʻrish va tuzattirish' }
        ]
      },
      next: 'Sunʼiy yoʻldoshlar-chi?'
    },
    {
      kind: 'explain',
      say: "Sunʼiy yoʻldoshlar uch xil orbitada aylanadi. Past orbita — 500 dan 1500 kilometrgacha: signal tez yetadi, lekin butun Yerni qamrash uchun koʻp yoʻldosh kerak; sunʼiy yoʻldosh interneti shunday ishlaydi. Oʻrta orbita — taxminan 5 dan 12 ming kilometrgacha: navigatsiya yoʻldoshlari, jumladan GPS. Geostatsionar orbita — 35 800 kilometr: yoʻldosh Yer bilan birga aylanib, osmonda bir joyda turadi; televideniye va ob-havo uchun; uchtasi deyarli butun Yerni qamraydi, lekin signal kechikishi koʻproq.",
      easy: "Past orbita — yaqin va tez, lekin koʻp yoʻldosh kerak. Oʻrta — GPS. Geostatsionar — uzoq, bir joyda turadi, televideniye uchun.",
      draw: [],
      animTitle: 'Orbitalar',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🛰️', title: 'Past (LEO)', text: '500–1500 km · tez · koʻp yoʻldosh · internet' },
          { icon: '📡', title: 'Oʻrta (MEO)', text: '≈5 000–12 500 km · navigatsiya, GPS' },
          { icon: '🌍', title: 'Geostatsionar (GEO)', text: '35 800 km · bir joyda · TV, ob-havo' }
        ]
      },
      next: 'GPS qanday ishlaydi?'
    },
    {
      kind: 'example',
      say: "GPS qabul qilgich — telefoningiz — bir nechta yoʻldoshdan signal oladi. Har bir signalda yuborilgan aniq vaqt bor. Signal qancha vaqtda kelganidan har bir yoʻldoshgacha masofa hisoblanadi. Uchta masofa nuqtani aniqlaydi, toʻrtinchi yoʻldosh esa soat xatosini tuzatadi. Shuning uchun aniq joylashuv uchun kamida toʻrtta yoʻldosh kerak. Navigator xarita bilan solishtirib, yoʻl koʻrsatadi.",
      easy: "Telefon kamida 4 ta yoʻldoshdan signal olib, masofalarni hisoblaydi va qayerdaligingizni topadi.",
      draw: [],
      animTitle: 'GPS joylashuvni aniqlaydi',
      anim: {
        type: 'net',
        together: true,
        nodes: [
          { id: 's1', x: 12, y: 12, icon: '🛰️', label: '1-yoʻldosh' },
          { id: 's2', x: 38, y: 5, icon: '🛰️', label: '2-yoʻldosh' },
          { id: 's3', x: 64, y: 5, icon: '🛰️', label: '3-yoʻldosh' },
          { id: 's4', x: 88, y: 12, icon: '🛰️', label: '4-yoʻldosh' },
          { id: 'p', x: 50, y: 48, icon: '📱', label: 'Siz: 41,31° N, 69,28° E' }
        ],
        links: [
          ['s1', 'p'],
          ['s2', 'p'],
          ['s3', 'p'],
          ['s4', 'p']
        ],
        packets: [
          { path: ['s1', 'p'], label: '⏱', color: '#0ea5e9' },
          { path: ['s2', 'p'], label: '⏱', color: '#0ea5e9' },
          { path: ['s3', 'p'], label: '⏱', color: '#0ea5e9' },
          { path: ['s4', 'p'], label: '⏱', color: '#0ea5e9' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Xavflar: ruxsatsiz kirish (xaker), zararli dasturlar, keylogger, xizmatni ishdan chiqarish hujumi.',
    'Himoya: autentifikatsiya (parol, biometrika, 2 bosqich), kirish huquqlari, fayervol, proksi, shifrlash, antivirus, zaxira.',
    'Maʼlumotlarni himoya qilish: rozilik, aniq maqsad, faqat keraklisi, aniqlik, muddat, xavfsizlik, egasining huquqlari.',
    'Orbitalar: past (LEO), oʻrta (MEO, GPS), geostatsionar (GEO, 35 800 km).',
    'GPS kamida 4 ta yoʻldosh signalining kelish vaqtidan masofalarni hisoblab, joylashuvni topadi.'
  ],
  questions: [
    {
      id: 'i37q1',
      prompt: 'Himoya chorasini xavf bilan juftlang.',
      hint: 'Har bir chora nimadan himoya qiladi?',
      explanation: 'Ikki bosqichli tasdiqlash — oʻgʻirlangan parol; fayervol — tashqi hujum; shifrlash — ushlab qolingan maʼlumot; zaxira nusxa — oʻchirilgan yoki shifrlangan fayllar.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Ikki bosqichli tasdiqlash' }, right: { label: 'oʻgʻirlangan parol' } },
            { left: { label: 'Fayervol' }, right: { label: 'tashqaridan ruxsatsiz ulanish' } },
            { left: { label: 'Shifrlash' }, right: { label: 'yoʻlda ushlangan maʼlumot' } },
            { left: { label: 'Zaxira nusxa' }, right: { label: 'oʻchirilgan yoki qulflangan fayllar' } }
          ]
        }
      }
    },
    {
      id: 'i37q2',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'GPS uchun nechta yoʻldosh kerak?',
      explanation: 'GPS uchun kamida 4 yoʻldosh; geostatsionar yoʻldosh osmonda bir joyda turadi; past orbitada global qamrov uchun koʻp yoʻldosh kerak; maʼlumot egasining roziligi bilan yigʻiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Aniq GPS joylashuvi uchun bitta yoʻldosh yetarli.', value: false },
            { text: 'Geostatsionar yoʻldosh Yerdan qaraganda bir joyda turadi.', value: true },
            { text: 'Past orbitada butun Yerni qamrash uchun koʻp yoʻldosh kerak.', value: true },
            { text: 'Shaxsiy maʼlumotni roziliksiz istalgancha yigʻish mumkin.', value: false }
          ]
        }
      }
    },
    {
      id: 'i37q3',
      prompt: 'Orbitani xususiyati bilan juftlang.',
      hint: 'Balandlik va vazifa.',
      explanation: 'Past — 500–1500 km, sunʼiy yoʻldosh interneti; oʻrta — GPS; geostatsionar — 35 800 km, televideniye.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Past orbita (LEO)' }, right: { label: '500–1500 km, sunʼiy yoʻldosh interneti' } },
            { left: { label: 'Oʻrta orbita (MEO)' }, right: { label: 'GPS navigatsiya' } },
            { left: { label: 'Geostatsionar (GEO)' }, right: { label: '35 800 km, televideniye' } }
          ]
        }
      }
    },
    {
      id: 'i37q4',
      prompt: 'Maʼlumotlarni himoya qilish tamoyillariga mos holatlarni bosing.',
      hint: 'Rozilik, keraklisi, xavfsizlik.',
      explanation: 'Rozilik soʻrash, faqat kerakli maydonlar, xavfsiz saqlash — toʻgʻri. Maʼlumotni roziliksiz sotish va abadiy saqlash — buzilish.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Roʻyxatdan oʻtishda rozilik soʻrash', match: true },
            { id: 'b', text: 'Faqat kerakli maydonlarni yigʻish', match: true },
            { id: 'c', text: 'Maʼlumotni shifrlab saqlash', match: true },
            { id: 'd', text: 'Mijozlar roʻyxatini roziliksiz sotish', match: false },
            { id: 'e', text: 'Keraksiz maʼlumotni abadiy saqlash', match: false }
          ]
        }
      }
    },
    {
      id: 'i37q5',
      prompt: 'Signal yoʻldoshdan 0,07 soniyada yetib keldi. Yorugʻlik tezligi ≈ 300 000 km/s. Masofa necha km?',
      hint: 'Masofa = tezlik × vaqt.',
      explanation: '300 000 × 0,07 = 21 000 km.',
      widget: { type: 'number_answer', props: { answer: 21000, unit: 'km' } }
    },
    {
      id: 'i37q6',
      prompt: 'Xavf yoki himoya?',
      hint: 'Zarar keltiradimi?',
      explanation: 'Keylogger, xizmatni ishdan chiqarish, zaif parol — xavf. Fayervol, autentifikatsiya, kirish huquqlari — himoya.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'x', label: 'Xavf' },
            { id: 'h', label: 'Himoya' }
          ],
          tiles: [
            { id: 't1', label: 'Keylogger', bin: 'x' },
            { id: 't2', label: 'Fayervol', bin: 'h' },
            { id: 't3', label: 'Xizmatni ishdan chiqarish hujumi', bin: 'x' },
            { id: 't4', label: 'Autentifikatsiya', bin: 'h' },
            { id: 't5', label: 'Zaif parol', bin: 'x' },
            { id: 't6', label: 'Kirish huquqlari', bin: 'h' }
          ]
        }
      }
    },
    {
      id: 'i37q7',
      prompt: 'GPS ishlash bosqichlarini tartiblang.',
      hint: 'Signaldan xaritagacha.',
      explanation: 'Yoʻldoshlar vaqtli signal yuboradi ➜ telefon kelish vaqtini oʻlchaydi ➜ masofalar hisoblanadi ➜ joylashuv topilib xaritada koʻrsatiladi.',
      widget: { type: 'step_order', props: { steps: ['Yoʻldoshlar vaqt yozilgan signal yuboradi', 'Telefon signalning kelish vaqtini oʻlchaydi', 'Har bir yoʻldoshgacha masofa hisoblanadi', 'Joylashuv xaritada koʻrsatiladi'] } }
    },
    {
      id: 'i37q8',
      prompt: 'Qaysi biri autentifikatsiya usuli emas?',
      hint: 'Uchtasi kimligingizni tekshiradi.',
      explanation: 'Parol, barmoq izi, SMS kod — autentifikatsiya. Defragmentatsiya — disk utiliti.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Parol' }, { text: 'Barmoq izi' }, { text: 'SMS kod' }, { text: 'Defragmentatsiya', odd: true }] } }
    },
    {
      id: 'i37q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Parol + telefon kodi.',
      explanation: 'Parol va telefonga kelgan kod birga — ikki bosqichli autentifikatsiya.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Parol va telefonga kelgan' }, { blank: 'kod' }, { text: 'birga ishlatilsa — ikki' }, { blank: 'bosqichli' }, { text: 'autentifikatsiya.' }],
          bank: ['kod', 'bosqichli', 'orbitali']
        }
      }
    },
    {
      id: 'i37q10',
      prompt: 'Aniq GPS joylashuvi uchun kamida nechta yoʻldosh kerak?',
      hint: '3 ta masofa + soat tuzatish.',
      explanation: 'Kamida 4 ta.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'ta' } }
    }
  ]
};
