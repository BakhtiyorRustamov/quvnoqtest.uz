import type { BoardLesson } from './types';

/** Darslik: 4.01–4.02 — elektron xavfsizlik: shaxsiy maʼlumotlar, phishing, pharming, smishing, vishing, zararli dasturlar. */
export const INF_12: BoardLesson = {
  n: 12,
  label: '12',
  part: 10,
  title: 'Elektron xavfsizlik va zararli dasturlar',
  section: '4.01–4.02',
  steps: [
    {
      kind: 'hook',
      say: "Telefoningizga SMS keldi: «Kartangiz bloklandi! Bir soat ichida ochmasangiz, pul yechib olinadi. Havolaga kiring». Shoshilmang! Keling, bu xabarni bandma-band tekshiramiz. Bunday firibgarlik xabarlari har kuni minglab odamlarga yuboriladi.",
      easy: "Bu SMS soxta: notanish raqam, qoʻrqitib shoshiltiradi, gʻalati havola va maxfiy kod soʻraydi. Haqiqiy bank bunday qilmaydi.",
      draw: [],
      animTitle: '📩 Shubhali SMS',
      anim: {
        type: 'form',
        title: '«Kartangiz bloklandi!»',
        fields: [
          { label: 'Yuboruvchi', value: '+44 7700 900123', check: 'Manba', ok: false, note: 'bank xorijiy shaxsiy raqamdan yozmaydi' },
          { label: 'Ohang', value: '«1 soat ichida!»', check: 'Shoshiltirish', ok: false, note: 'qoʻrqitib, oʻylashga vaqt bermaydi' },
          { label: 'Havola', value: 'bank-karta-yordam.top', check: 'Manzil', ok: false, note: 'bankning rasmiy sayti emas' },
          { label: 'Soʻrov', value: 'karta raqami + SMS kod', check: 'Maxfiylik', ok: false, note: 'bank hech qachon kod soʻramaydi' }
        ]
      },
      next: 'Bu nima deyiladi?'
    },
    {
      kind: 'explain',
      say: "Shaxsiy maʼlumot — sizni aniqlab beradigan har qanday maʼlumot: ism-familiya, manzil, telefon, tugʻilgan sana, maktab, rasm, joylashuv, karta raqami va parollar. Ular begona qoʻliga tushsa, sizning nomingizdan akkaunt ochish, pul oʻgʻirlash yoki sizni kuzatish mumkin. Shuning uchun ijtimoiy tarmoqlarda maxfiylik sozlamalarini yoqing, joylashuvni ochiq qoldirmang va notanishlarga maʼlumot bermang.",
      easy: "Shaxsiy maʼlumot — sizni topish yoki sizning nomingizdan ish qilish mumkin boʻlgan maʼlumot. Uni faqat ishonchli joyda va kerak boʻlganda bering.",
      draw: [],
      animTitle: 'Shaxsiy maʼlumotlar',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🪪', title: 'Ism va tugʻilgan sana', text: 'Akkaunt ochishda ishlatiladi' },
          { icon: '🏠', title: 'Manzil va maktab', text: 'Sizni topish mumkin' },
          { icon: '📍', title: 'Joylashuv', text: 'Qayerdaligingiz koʻrinadi' },
          { icon: '💳', title: 'Karta va SMS kod', text: 'Pul oʻgʻirlanishi mumkin' },
          { icon: '🔑', title: 'Parollar', text: 'Akkauntingiz egallanadi' },
          { icon: '🖼️', title: 'Rasmlar', text: 'Qayta ishlatilishi mumkin' }
        ]
      },
      next: 'Firibgarlik turlari'
    },
    {
      kind: 'explain',
      say: "Shaxsiy maʼlumotni aldab olishning toʻrt usuli bor. Phishing — bank yoki doʻkon nomidan soxta elektron xat yuborib, soxta saytga kiritish. Smishing — xuddi shu, lekin SMS orqali. Vishing — telefon qoʻngʻirogʻi: «Bank xavfsizlik xizmatidanman, kartangizdagi kodni ayting». Pharming esa eng ayyori: kompyuterga zararli kod oʻrnatilib, siz toʻgʻri manzilni yozsangiz ham soxta saytga yoʻnaltiriladi.",
      easy: "Phishing — soxta xat. Smishing — soxta SMS. Vishing — soxta qoʻngʻiroq. Pharming — toʻgʻri manzil yozsangiz ham soxta saytga olib boradi.",
      draw: [],
      animTitle: 'Toʻrt xil aldash',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '📧', title: 'Phishing', text: 'Soxta elektron xat va soxta sayt' },
          { icon: '📩', title: 'Smishing', text: 'Soxta SMS va havola' },
          { icon: '📞', title: 'Vishing', text: 'Soxta telefon qoʻngʻirogʻi' },
          { icon: '🧭', title: 'Pharming', text: 'Toʻgʻri manzil — soxta saytga yoʻnaltiriladi' }
        ]
      },
      next: 'Pharming qanday ishlaydi?'
    },
    {
      kind: 'example',
      say: "Pharmingni kuzatamiz. Siz brauzerga bankingiz manzilini toʻgʻri yozdingiz. Odatda brauzer manzilni haqiqiy bank serveriga olib boradi. Lekin kompyuterdagi zararli kod yoki buzilgan manzillar serveri soʻrovni soxta saytga burib yuboradi. Soxta sayt haqiqiysidan farq qilmaydi, siz esa parolni oʻgʻriga yozib berasiz. Himoya: manzil satridagi «https» va qulf belgisi, sertifikat egasini tekshirish va antivirus.",
      easy: "Manzil toʻgʻri, lekin yoʻl buzilgan: soʻrov soxta saytga ketadi. Shuning uchun har doim qulf belgisini va sertifikatni tekshiring.",
      draw: [],
      animTitle: 'Pharming',
      anim: {
        type: 'net',
        nodes: [
          { id: 'u', x: 12, y: 30, icon: '🧑‍💻', label: 'Siz' },
          { id: 'd', x: 45, y: 30, icon: '🧭', label: 'Manzillar serveri' },
          { id: 'b', x: 86, y: 14, icon: '🏦', label: 'Haqiqiy bank' },
          { id: 'f', x: 86, y: 46, icon: '🎭', label: 'Soxta sayt' }
        ],
        links: [
          ['u', 'd'],
          ['d', 'b'],
          ['d', 'f']
        ],
        packets: [
          { path: ['u', 'd', 'b'], label: 'odatda', color: '#22c55e' },
          { path: ['u', 'd', 'f'], label: 'pharming!', color: '#ef4444' },
          { path: ['u', 'f'], label: 'parol 🔑', color: '#ef4444' }
        ]
      },
      next: 'Zararli dasturlar-chi?'
    },
    {
      kind: 'explain',
      say: "Zararli dasturlar turlari. Virus — boshqa faylga yopishib, shu fayl ochilganda koʻpayadi. Chuvalchang, yaʼni worm — hech qanday faylsiz, tarmoq orqali oʻzi tarqaladi. Troyan — foydali oʻyin yoki dastur qiyofasida kiradi, ichida esa zarar keltiradi. Josus dastur — spyware — harakatlaringiz va parollaringizni yashirincha yozib, egasiga yuboradi. Adware — majburan reklama koʻrsatadi. Ransomware — fayllaringizni shifrlab, ochish uchun pul talab qiladi. Rootkit — yashirinib, buzgʻunchiga kompyuterni boshqarish huquqini beradi.",
      easy: "Virus — fayl bilan tarqaladi. Chuvalchang — tarmoq orqali oʻzi. Troyan — niqoblangan. Josus — kuzatadi. Adware — reklama. Ransomware — fayllarni qulflab, pul soʻraydi. Rootkit — yashirin boshqaruv.",
      draw: [],
      animTitle: 'Zararli dasturlar',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🦠', title: 'Virus', text: 'Faylga yopishadi, ochilganda koʻpayadi' },
          { icon: '🐛', title: 'Chuvalchang', text: 'Tarmoq orqali oʻzi tarqaladi' },
          { icon: '🐴', title: 'Troyan', text: 'Foydali dastur qiyofasida' },
          { icon: '🕵️', title: 'Spyware', text: 'Parol va harakatlarni yozadi' },
          { icon: '📢', title: 'Adware', text: 'Majburan reklama' },
          { icon: '🔒', title: 'Ransomware', text: 'Fayllarni shifrlab, pul soʻraydi' },
          { icon: '👻', title: 'Rootkit', text: 'Yashirin boshqaruv huquqi' }
        ]
      },
      next: 'Chuvalchang qanday tarqaladi?'
    },
    {
      kind: 'example',
      say: "Chuvalchang tarmoqqa kirgan birinchi kompyuterdan bir vaqtda qoʻshni kompyuterlarga oʻtadi, ulardan yana keyingilariga. Hech kim faylni ochmasa ham tarqalaveradi. Bir necha daqiqada butun maktab tarmogʻi zararlanishi va sekinlashishi mumkin. Shuning uchun operatsion tizim yangilanishlari va tarmoq devori, yaʼni firewall juda muhim.",
      easy: "Chuvalchang oʻzi koʻpayib, tarmoq boʻylab kompyuterdan kompyuterga oʻtadi. Yangilanishlar va firewall uni toʻxtatadi.",
      draw: [],
      animTitle: 'Chuvalchang tarqalishi',
      anim: {
        type: 'net',
        together: true,
        nodes: [
          { id: 'a', x: 14, y: 32, icon: '💻', label: 'Kompyuter 1' },
          { id: 'b', x: 46, y: 14, icon: '💻', label: 'Kompyuter 2' },
          { id: 'c', x: 46, y: 50, icon: '💻', label: 'Kompyuter 3' },
          { id: 'd', x: 84, y: 14, icon: '💻', label: 'Kompyuter 4' },
          { id: 'e', x: 84, y: 50, icon: '💻', label: 'Kompyuter 5' }
        ],
        links: [
          ['a', 'b'],
          ['a', 'c'],
          ['b', 'd'],
          ['c', 'e'],
          ['b', 'c']
        ],
        packets: [
          { path: ['a', 'b', 'd'], label: '🐛', color: '#ef4444' },
          { path: ['a', 'c', 'e'], label: '🐛', color: '#ef4444' },
          { path: ['a'], label: '🐛', color: '#ef4444' }
        ]
      },
      next: 'Qanday himoyalanamiz?'
    },
    {
      kind: 'explain',
      say: "Oʻzingizni himoya qilish qoidalari. Antivirus va operatsion tizimni doimo yangilab turing. Har bir akkauntga uzun va har xil parol qoʻying, ikki bosqichli tasdiqlashni yoqing. Notanish xat va SMS dagi havolalarni bosmang, ilovalarni faqat rasmiy doʻkondan oʻrnating. Karta va SMS kodini hech kimga aytmang. Muhim fayllarning zaxira nusxasini saqlang — ransomware dan eng yaxshi himoya shu.",
      easy: "Yangilang, kuchli parol qoʻying, shubhali havolani bosmang, kodni hech kimga aytmang va zaxira nusxa saqlang.",
      draw: [],
      animTitle: 'Himoya qoidalari',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🔄', title: 'Yangilash', text: 'Antivirus va OT doimo yangi' },
          { icon: '🔐', title: 'Kuchli parol + 2FA', text: 'Har akkauntga alohida parol' },
          { icon: '🚫', title: 'Shubhali havola', text: 'Bosmang, rasmiy ilovadan tekshiring' },
          { icon: '🤐', title: 'SMS kod', text: 'Hech kimga, hatto «bank»ka ham aytmang' },
          { icon: '💾', title: 'Zaxira nusxa', text: 'Ransomware dan eng yaxshi himoya' },
          { icon: '🧱', title: 'Firewall', text: 'Tarmoqdan kiruvchi hujumni toʻsadi' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Shaxsiy maʼlumot — sizni aniqlab beradigan maʼlumot; uni notanishlarga bermang, maxfiylik sozlamalarini yoqing.',
    'Phishing — soxta xat, smishing — soxta SMS, vishing — soxta qoʻngʻiroq, pharming — soxta saytga yoʻnaltirish.',
    'Zararli dasturlar: virus, chuvalchang, troyan, spyware, adware, ransomware, rootkit.',
    'Himoya: yangilanishlar, kuchli parol va 2FA, shubhali havolalarni bosmaslik, kodni aytmaslik, zaxira nusxa, firewall.'
  ],
  questions: [
    {
      id: 'i12q1',
      prompt: 'Holatni firibgarlik turi bilan juftlang.',
      hint: 'Xat, SMS, qoʻngʻiroq, yoʻnaltirish.',
      explanation: 'Soxta xat — phishing; soxta SMS — smishing; soxta qoʻngʻiroq — vishing; toʻgʻri manzil soxta saytga olib borsa — pharming.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: '«Bank»dan xat: «Parolni yangilang»' }, right: { label: 'phishing' } },
            { left: { label: 'SMS: «Yutuq! Havolaga kiring»' }, right: { label: 'smishing' } },
            { left: { label: 'Qoʻngʻiroq: «Kartadagi kodni ayting»' }, right: { label: 'vishing' } },
            { left: { label: 'Toʻgʻri manzil soxta saytni ochdi' }, right: { label: 'pharming' } }
          ]
        }
      }
    },
    {
      id: 'i12q2',
      prompt: 'Zararli dasturni taʼrifi bilan juftlang.',
      hint: 'Kim yopishadi, kim oʻzi yuradi?',
      explanation: 'Virus faylga yopishadi; chuvalchang tarmoqda oʻzi tarqaladi; troyan niqoblanadi; ransomware fayllarni shifrlab pul soʻraydi.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Virus' }, right: { label: 'faylga yopishib koʻpayadi' } },
            { left: { label: 'Chuvalchang' }, right: { label: 'tarmoq orqali oʻzi tarqaladi' } },
            { left: { label: 'Troyan' }, right: { label: 'foydali dastur qiyofasida kiradi' } },
            { left: { label: 'Ransomware' }, right: { label: 'fayllarni shifrlab pul soʻraydi' } }
          ]
        }
      }
    },
    {
      id: 'i12q3',
      prompt: 'Shubhali xabar belgilarini bosing.',
      hint: 'Firibgar nima qiladi?',
      explanation: 'Shoshiltirish, notanish havola, SMS kod soʻrash va katta yutuq vaʼdasi — firibgarlik belgilari. Rasmiy ilovadagi oddiy xabarnoma xavfsiz.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: '«1 soat ichida javob bering!»', match: true },
            { id: 'b', text: 'Notanish qisqa havola', match: true },
            { id: 'c', text: 'SMS kodni soʻrash', match: true },
            { id: 'd', text: '«Siz iPhone yutib oldingiz!»', match: true },
            { id: 'e', text: 'Bank ilovasining ichidagi xabarnoma', match: false }
          ]
        }
      }
    },
    {
      id: 'i12q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Chuvalchangga fayl ochish kerakmi?',
      explanation: 'Chuvalchang fayl ochilmasa ham tarqaladi; bank SMS kod soʻramaydi; zaxira nusxa ransomware dan himoya qiladi; pharmingda toʻgʻri manzil ham soxta saytga olib borishi mumkin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Chuvalchang tarqalishi uchun kimdir faylni ochishi shart.', value: false },
            { text: 'Haqiqiy bank xodimi hech qachon SMS kodni soʻramaydi.', value: true },
            { text: 'Zaxira nusxa ransomware zararini kamaytiradi.', value: true },
            { text: 'Manzilni toʻgʻri yozsangiz, pharming boʻlishi mumkin emas.', value: false }
          ]
        }
      }
    },
    {
      id: 'i12q5',
      prompt: 'Qaysi maʼlumotni ijtimoiy tarmoqda ochiq qoldirish xavfsizroq?',
      hint: 'Sizni topish yoki pulingizni olishga yordam bermaydigani.',
      explanation: 'Sevimli kitob — xavfsiz. Uy manzili, karta raqami va jonli joylashuv — xavfli.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Uy manzili' }, { text: 'Karta raqami' }, { text: 'Jonli joylashuv' }, { text: 'Sevimli kitobingiz', odd: true }] } }
    },
    {
      id: 'i12q6',
      prompt: 'Zararli dastur yoki himoya vositasi?',
      hint: 'Zarar keltiradimi yoki himoya qiladimi?',
      explanation: 'Spyware, adware, rootkit — zararli. Antivirus, firewall, zaxira nusxa — himoya.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'z', label: 'Zararli' },
            { id: 'h', label: 'Himoya' }
          ],
          tiles: [
            { id: 't1', label: 'Spyware', bin: 'z' },
            { id: 't2', label: 'Antivirus', bin: 'h' },
            { id: 't3', label: 'Adware', bin: 'z' },
            { id: 't4', label: 'Firewall', bin: 'h' },
            { id: 't5', label: 'Rootkit', bin: 'z' },
            { id: 't6', label: 'Zaxira nusxa', bin: 'h' }
          ]
        }
      }
    },
    {
      id: 'i12q7',
      prompt: '«Bank»dan qoʻngʻiroq: «Kartangizdagi kodni ayting». Toʻgʻri harakatlarni tartiblang.',
      hint: 'Avval toʻxtang.',
      explanation: 'Kodni aytmasdan suhbatni tugatasiz, bankning rasmiy raqamiga oʻzingiz qoʻngʻiroq qilasiz, holatni tekshirasiz va kerak boʻlsa kartani bloklaysiz.',
      widget: {
        type: 'step_order',
        props: { steps: ['Kodni aytmaysiz va suhbatni tugatasiz', 'Bankning rasmiy raqamini kartaning orqasidan topasiz', 'Bankka oʻzingiz qoʻngʻiroq qilasiz', 'Shubha boʻlsa, kartani bloklaysiz'] }
      }
    },
    {
      id: 'i12q8',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Niqoblangan va kuzatuvchi.',
      explanation: 'Bepul oʻyin qiyofasidagi zararli dastur — troyan; parollarni yashirincha yozuvchi — spyware.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: '«Bepul oʻyin» ichida yashiringan zararli dastur —' }, { blank: 'troyan' }, { text: '. Parollaringizni yashirincha yozib yuboradigani —' }, { blank: 'spyware' }, { text: '.' }],
          bank: ['troyan', 'spyware', 'adware', 'virus']
        }
      }
    },
    {
      id: 'i12q9',
      prompt: 'Qaysi parol eng ishonchli?',
      hint: 'Uzun, aralash belgilar, shaxsiy maʼlumotsiz.',
      explanation: '«Qovun!Bahor7#Kitob» — uzun, harf, raqam va belgilar aralash. Qolganlari qisqa yoki shaxsiy maʼlumotga asoslangan.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: '123456' }, { text: 'aziz2009' }, { text: 'qwerty' }, { text: 'Qovun!Bahor7#Kitob', odd: true }] } }
    },
    {
      id: 'i12q10',
      prompt: 'Fayllarni shifrlab, pul talab qiladigan zararli dastur nomini yozing.',
      hint: 'Ransom — toʻlov.',
      explanation: 'Ransomware — fayllarni shifrlab, ochish uchun toʻlov talab qiladi.',
      widget: { type: 'text_answer', props: { answer: ['ransomware'], width: 11 } }
    }
  ]
};
