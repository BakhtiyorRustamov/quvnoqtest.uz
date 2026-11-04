import type { BoardLesson } from './types';

/** Darslik: 12.08–12.16 — ijtimoiy tarmoqlar, masofadan ishlash, texnologiyalar jamiyatda, sportda, tibbiyotda va ishlab chiqarishda. */
export const INF_34: BoardLesson = {
  n: 34,
  label: '34',
  part: 11,
  title: 'Ijtimoiy tarmoqlar va masofaviy ish',
  section: '12.08–12.16',
  steps: [
    {
      kind: 'hook',
      say: "Aziz maktab tadbiri haqida post joylashtirdi. Uni uchta doʻsti ulashdi, ularning doʻstlari ham ulashdi — bir soatda minglab odam koʻrdi. Ijtimoiy tarmoqlar odamlar bir-biri bilan bogʻlanadigan, maʼlumot va fikr almashadigan onlayn xizmatlar. Ular axborotni juda tez tarqatadi — yaxshisini ham, yolgʻonini ham.",
      easy: "Ijtimoiy tarmoqda post doʻstdan doʻstga ulashilib, bir zumda minglab odamga yetadi.",
      draw: [],
      animTitle: 'Post qanday tarqaladi',
      anim: {
        type: 'net',
        together: true,
        nodes: [
          { id: 'a', x: 12, y: 30, icon: '🧑', label: 'Aziz' },
          { id: 'b', x: 44, y: 10, icon: '👩', label: 'Malika' },
          { id: 'c', x: 44, y: 30, icon: '🧑', label: 'Sardor' },
          { id: 'd', x: 44, y: 50, icon: '👩', label: 'Dilnoza' },
          { id: 'e', x: 84, y: 10, icon: '👥', label: '300 kishi' },
          { id: 'f', x: 84, y: 30, icon: '👥', label: '500 kishi' },
          { id: 'g', x: 84, y: 50, icon: '👥', label: '800 kishi' }
        ],
        links: [
          ['a', 'b'],
          ['a', 'c'],
          ['a', 'd'],
          ['b', 'e'],
          ['c', 'f'],
          ['d', 'g']
        ],
        packets: [
          { path: ['a', 'b', 'e'], label: '📣', color: '#0ea5e9' },
          { path: ['a', 'c', 'f'], label: '📣', color: '#0ea5e9' },
          { path: ['a', 'd', 'g'], label: '📣', color: '#0ea5e9' }
        ]
      },
      next: 'Foyda va zarari?'
    },
    {
      kind: 'explain',
      say: "Ijtimoiy tarmoqlar ijtimoiy hayotni oʻzgartirdi. Yaxshi tomoni: uzoqdagi qarindosh va doʻstlar bilan aloqa, qiziqish guruhlari, tadbirlarni tez tashkil qilish, kichik biznes uchun arzon reklama. Salbiy tomoni: yolgʻon xabarlar tez tarqaladi, kiberbulling, shaxsiy maʼlumot oshkor boʻlishi, vaqt va diqqatni oʻgʻirlash, «layklar»ga qaram boʻlish. Tashkilotlar ham ijtimoiy tarmoqdagi maʼlumotlardan marketing va tahlil uchun foydalanadi.",
      easy: "Yaxshisi — aloqa, guruhlar, arzon reklama. Yomoni — yolgʻon xabar, haqorat, maxfiylik va vaqt yoʻqotish.",
      draw: [],
      animTitle: 'Ijtimoiy tarmoqlar',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Ijobiy', items: ['Uzoqdagilar bilan aloqa', 'Qiziqish guruhlari', 'Tadbirlarni tez tashkil qilish', 'Kichik biznesga arzon reklama'] },
        right: { icon: '👎', title: 'Salbiy', items: ['Yolgʻon xabarlar', 'Kiberbulling', 'Shaxsiy maʼlumot oshkor boʻladi', 'Vaqt va diqqat yoʻqotish'] }
      },
      next: 'Masofadan ishlash-chi?'
    },
    {
      kind: 'explain',
      say: "Masofadan ishlash — xodim idoraga bormay, uydan yoki boshqa joydan internet orqali ishlashi: elektron pochta, videokonferensiya, bulutdagi umumiy hujjatlar va VPN yordamida. Xodim uchun: yoʻl vaqti va xarajati yoʻq, jadval moslashuvchan, oila bilan koʻproq vaqt. Lekin yolgʻizlik, ish va uy chegarasi yoʻqolishi, uyda qulay ish joyi kerakligi. Ish beruvchi uchun: idora ijarasi tejaladi, butun mamlakatdan mutaxassis olish mumkin; lekin nazorat qiyin va maʼlumot xavfsizligi muammosi.",
      easy: "Uydan ishlash: yoʻl va vaqt tejaladi, lekin yolgʻizlik va nazorat qiyinligi bor.",
      draw: [],
      animTitle: 'Masofadan ishlash',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🧑‍💻', title: 'Xodim: +', text: 'Yoʻl yoʻq, moslashuvchan jadval, oila bilan vaqt' },
          { icon: '😔', title: 'Xodim: −', text: 'Yolgʻizlik, ish-uy chegarasi yoʻqoladi' },
          { icon: '🏢', title: 'Ish beruvchi: +', text: 'Ijara tejaladi, hamma joydan mutaxassis' },
          { icon: '🔐', title: 'Ish beruvchi: −', text: 'Nazorat qiyin, maʼlumot xavfsizligi' }
        ]
      },
      next: 'Texnologiyalar boshqa sohalarda?'
    },
    {
      kind: 'explain',
      say: "Texnologiyalar har sohani oʻzgartirdi. Sportda: video hakam, toʻp chiziqdan oʻtganini aniqlovchi kameralar, sportchining yurak urishi va tezligini oʻlchovchi sensorlar. Tibbiyotda: masofaviy shifokor maslahati — teletibbiyot, jarrohlik robotlari, 3D chop etilgan protezlar, elektron tibbiy karta. Ishlab chiqarishda: robotlashtirilgan liniyalar, kompyuterda loyihalash va ishlab chiqarish, sensorlar bilan sifat nazorati.",
      easy: "Sport — video hakam va sensorlar. Tibbiyot — teletibbiyot va robotlar. Zavod — robotlar va kompyuter nazorati.",
      draw: [],
      animTitle: 'Texnologiyalar sohalarda',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '⚽', title: 'Sport', text: 'Video hakam, chiziq kameralari, sensorli forma' },
          { icon: '🩺', title: 'Tibbiyot', text: 'Teletibbiyot, jarrohlik roboti, elektron karta' },
          { icon: '🏭', title: 'Ishlab chiqarish', text: 'Robot liniyalar, CAD/CAM, sifat sensorlari' }
        ]
      },
      next: 'Jamiyatga taʼsiri?'
    },
    {
      kind: 'example',
      say: "Yangi texnologiyalar jamiyatga ikki tomonlama taʼsir qiladi. Baʼzi kasblar kamayadi: kassir, ombor ishchisi, tarjimon. Yangi kasblar paydo boʻladi: dasturchi, maʼlumot tahlilchisi, robot texnigi, kiberxavfsizlik mutaxassisi. Shuning uchun umr boʻyi oʻqish va raqamli koʻnikmalar juda muhim. Kuzating: qaysi ish qaysi yangi kasbga oʻzgaradi.",
      easy: "Baʼzi ishlarni mashinalar oladi, lekin yangi kasblar paydo boʻladi. Doim yangi narsa oʻrganish kerak.",
      draw: [],
      animTitle: 'Kasblar oʻzgarmoqda',
      anim: {
        type: 'flow',
        stations: [
          { icon: '📉', label: 'Kamayayotgan ish' },
          { icon: '🔁', label: 'Texnologiya' },
          { icon: '📈', label: 'Yangi kasb' }
        ],
        items: [
          { texts: ['kassir', 'oʻzi toʻlash kassasi', 'tizim texnigi'] },
          { texts: ['ombor ishchisi', 'ombor robotlari', 'robot operatori'] },
          { texts: ['qogʻoz arxivchi', 'bulutli baza', 'maʼlumot tahlilchisi'] }
        ],
        result: 'Raqamli koʻnikma — yangi ish imkoniyati'
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Ijtimoiy tarmoqlar aloqa va maʼlumot almashishni tezlashtirdi, lekin yolgʻon xabar, kiberbulling va maxfiylik muammolari bor.',
    'Masofadan ishlash: xodim uchun yoʻl va vaqt tejaladi, ammo yolgʻizlik; ish beruvchi uchun ijara tejaladi, ammo nazorat va xavfsizlik qiyin.',
    'Sportda video hakam va sensorlar, tibbiyotda teletibbiyot va robotlar, ishlab chiqarishda robot liniyalar va CAD/CAM.',
    'Texnologiya baʼzi kasblarni kamaytiradi va yangi kasblar yaratadi — raqamli koʻnikma muhim.'
  ],
  questions: [
    {
      id: 'i34q1',
      prompt: 'Ijtimoiy tarmoqlar: ijobiy yoki salbiy taʼsir?',
      hint: 'Yordam beradimi yoki zarar keltiradimi?',
      explanation: 'Uzoqdagilar bilan aloqa, guruhlar, arzon reklama — ijobiy. Yolgʻon xabar, kiberbulling, maʼlumot oshkorligi — salbiy.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'p', label: 'Ijobiy' },
            { id: 'n', label: 'Salbiy' }
          ],
          tiles: [
            { id: 't1', label: 'Chet eldagi akam bilan aloqa', bin: 'p' },
            { id: 't2', label: 'Yolgʻon xabarlar tez tarqaladi', bin: 'n' },
            { id: 't3', label: 'Qiziqish guruhlari', bin: 'p' },
            { id: 't4', label: 'Kiberbulling', bin: 'n' },
            { id: 't5', label: 'Kichik biznes uchun arzon reklama', bin: 'p' },
            { id: 't6', label: 'Shaxsiy maʼlumot oshkor boʻlishi', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'i34q2',
      prompt: 'Masofadan ishlash: kimga taʼsir qiladi?',
      hint: 'Xodim yoki ish beruvchi.',
      explanation: 'Yoʻl vaqti yoʻqligi va yolgʻizlik — xodim. Ijara tejalishi va nazorat qiyinligi — ish beruvchi.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Yoʻlga vaqt ketmaydi' }, right: { label: 'xodim uchun afzallik' } },
            { left: { label: 'Hamkasblarsiz yolgʻizlik' }, right: { label: 'xodim uchun kamchilik' } },
            { left: { label: 'Idora ijarasi tejaladi' }, right: { label: 'ish beruvchi uchun afzallik' } },
            { left: { label: 'Ishni nazorat qilish qiyin' }, right: { label: 'ish beruvchi uchun kamchilik' } }
          ]
        }
      }
    },
    {
      id: 'i34q3',
      prompt: 'Texnologiyani sohasi bilan juftlang.',
      hint: 'Sport, tibbiyot, zavod.',
      explanation: 'Video hakam — sport; teletibbiyot — tibbiyot; robot liniya — ishlab chiqarish.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Video hakam' }, right: { label: 'sport' } },
            { left: { label: 'Teletibbiyot' }, right: { label: 'tibbiyot' } },
            { left: { label: 'Robotlashtirilgan liniya' }, right: { label: 'ishlab chiqarish' } }
          ]
        }
      }
    },
    {
      id: 'i34q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Masofadan ishlash uchun nima kerak?',
      explanation: 'Masofaviy ish uchun internet, VPN va bulut kerak; yolgʻon xabar ham tez tarqaladi; texnologiya yangi kasblar ham yaratadi; teletibbiyot — masofaviy maslahat.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Masofadan ishlashda VPN va bulutli hujjatlar ishlatiladi.', value: true },
            { text: 'Ijtimoiy tarmoqda faqat toʻgʻri xabarlar tarqaladi.', value: false },
            { text: 'Texnologiyalar faqat ish oʻrinlarini yoʻqotadi.', value: false },
            { text: 'Teletibbiyot — shifokor bilan masofaviy maslahat.', value: true }
          ]
        }
      }
    },
    {
      id: 'i34q5',
      prompt: 'Post 3 ta doʻstga, har bir doʻstdan yana 3 kishiga, ulardan yana 3 tadan ulashildi. 3-bosqichda nechta yangi kishi koʻradi?',
      hint: '3 × 3 × 3',
      explanation: '3 × 3 × 3 = 27 kishi.',
      widget: { type: 'number_answer', props: { answer: 27, unit: 'kishi' } }
    },
    {
      id: 'i34q6',
      prompt: 'Ijtimoiy tarmoqda xavfsiz boʻlish qoidalarini bosing.',
      hint: 'Maxfiylik va tekshirish.',
      explanation: 'Profilni yopish, xabarni manbadan tekshirish va haqoratni xabar qilish — toʻgʻri. Uy manzilini yozish va notanishga parol berish — xavfli.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Profilni faqat doʻstlarga ochish', match: true },
            { id: 'b', text: 'Xabarni rasmiy manbadan tekshirish', match: true },
            { id: 'c', text: 'Haqoratni platformaga xabar qilish', match: true },
            { id: 'd', text: 'Uy manzilini ochiq yozish', match: false },
            { id: 'e', text: 'Notanishga parolni aytish', match: false }
          ]
        }
      }
    },
    {
      id: 'i34q7',
      prompt: 'Qaysi biri masofaviy ish vositasi emas?',
      hint: 'Uchtasi internet orqali ishlaydi.',
      explanation: 'Videokonferensiya, VPN va bulutli hujjatlar — vositalar. Qogʻoz davomat jurnali — idorada ishlatiladi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Videokonferensiya' }, { text: 'VPN' }, { text: 'Bulutli hujjatlar' }, { text: 'Qogʻoz davomat jurnali', odd: true }] } }
    },
    {
      id: 'i34q8',
      prompt: 'Xodim har kuni ishga 45 daqiqa borib, 45 daqiqa qaytadi. Uydan ishlasa, 5 ish kunida necha soat tejaydi?',
      hint: 'Kuniga 90 daqiqa.',
      explanation: '90 × 5 = 450 daqiqa = 7,5 soat.',
      widget: { type: 'number_answer', props: { answer: 7.5, tolerance: 0.01, unit: 'soat' } }
    },
    {
      id: 'i34q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Oʻzgarayotgan kasblar.',
      explanation: 'Ombor robotlari ombor ishchisi ishini bajaradi, lekin robot operatori kasbi paydo boʻladi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Ombor' }, { blank: 'robotlari' }, { text: 'paydo boʻlgach, yangi kasb — robot' }, { blank: 'operatori' }, { text: 'kerak boʻldi.' }],
          bank: ['robotlari', 'operatori', 'kassiri']
        }
      }
    },
    {
      id: 'i34q10',
      prompt: 'Shifokorning masofaviy maslahati qanday ataladi? (Bir soʻz)',
      hint: 'Tele…',
      explanation: 'Teletibbiyot.',
      widget: { type: 'text_answer', props: { answer: ['teletibbiyot', 'telemeditsina'], width: 13 } }
    }
  ]
};
