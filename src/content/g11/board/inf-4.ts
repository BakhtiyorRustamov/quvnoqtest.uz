import type { BoardLesson } from './types';

/** Darslik: 1.04 — shifrlash: Sezar shifri, simmetrik va asimmetrik shifrlash, SSL/TLS, HTTPS, disk va elektron pochta. */
export const INF_4: BoardLesson = {
  n: 4,
  label: '4',
  part: 10,
  title: 'Shifrlash: kalitlar va HTTPS',
  section: '1.04',
  steps: [
    {
      kind: 'hook',
      say: "Kafedagi bepul Wi-Fi ga ulanib, ijtimoiy tarmoqqa parolingizni kiritdingiz. Agar maʼlumot shifrlanmagan boʻlsa, oʻsha tarmoqda oʻtirgan va maxsus dasturi bor har qanday odam parolingizni oʻqiy oladi. Shifrlash aynan shundan himoya qiladi: maʼlumot ushlab olinsa ham, kalitsiz uni tushunib boʻlmaydi.",
      easy: "Shifrlanmagan maʼlumot ochiq xatga oʻxshaydi: yoʻlda kim ushlasa, oʻqiydi. Shifrlangan maʼlumotni esa kalitsiz hech kim tushunolmaydi.",
      draw: [],
      animTitle: 'Ochiq Wi-Fi',
      anim: {
        type: 'net',
        together: true,
        nodes: [
          { id: 'me', x: 12, y: 30, icon: '📱', label: 'Siz' },
          { id: 'wifi', x: 45, y: 30, icon: '📶', label: 'Kafe Wi-Fi' },
          { id: 'srv', x: 86, y: 14, icon: '🖥️', label: 'Sayt' },
          { id: 'spy', x: 86, y: 48, icon: '🕵️', label: 'Begona' }
        ],
        links: [
          ['me', 'wifi'],
          ['wifi', 'srv'],
          ['wifi', 'spy']
        ],
        packets: [
          { path: ['me', 'wifi', 'srv'], label: 'parol: 1234', color: '#0ea5e9' },
          { path: ['me', 'wifi', 'spy'], label: 'parol: 1234', color: '#ef4444' }
        ]
      },
      next: 'Qanday himoyalanamiz?'
    },
    {
      kind: 'explain',
      say: "Shifrlash — maʼlumotni kalitsiz oʻqib boʻlmaydigan koʻrinishga keltirish. Uni ochish — deshifrlash deyiladi. Eng qadimgi usullardan biri — Sezar shifri. Har bir harf alifboda bir xil sonli oʻringa suriladi. Kalit — uchta boʻlsa, A harfi D ga, B harfi E ga aylanadi. «SALOM» soʻzi «VDORP» boʻladi.",
      easy: "Sezar shifri: har bir harfni alifboda 3 ta oldinga suramiz. S dan keyingi uchinchi harf — V, A dan keyingi uchinchi harf — D. Shunday qilib SALOM — VDORP.",
      draw: [],
      animTitle: 'Sezar shifri, kalit = 3',
      anim: { type: 'cipher', mode: 'caesar', plain: 'SALOM', shift: 3 },
      next: 'Zamonaviy usullar-chi?'
    },
    {
      kind: 'explain',
      say: "Simmetrik shifrlashda yuboruvchi ham, qabul qiluvchi ham bitta umumiy maxfiy kalitdan foydalanadi: shu kalit bilan yopiladi va shu kalit bilan ochiladi. Bu tez ishlaydi. Muammosi — kalitni oldindan xavfsiz yetkazish kerak: kalit yoʻlda oʻgʻirlansa, barcha xabarlar ochiladi. Bugun eng mashhur simmetrik standart — AES, uning kaliti 256 bitgacha boʻladi.",
      easy: "Simmetrik — bitta kalit, ikkita nusxasi: biri yuboruvchida, biri qabul qiluvchida. Kalit oʻgʻirlansa, hammasi ochiladi.",
      draw: [],
      animTitle: 'Simmetrik shifrlash',
      anim: { type: 'cipher', mode: 'symmetric', message: 'Uchrashuv 17:00 da', secret: 'x9#Qa!7Lp2@vK' },
      next: 'Kalit oʻgʻirlansa-chi?'
    },
    {
      kind: 'explain',
      say: "Asimmetrik shifrlash bu muammoni ikki kalit bilan hal qiladi. Qabul qiluvchida ochiq kalit va yopiq, yaʼni shaxsiy kalit bor. Ochiq kalitni hamma koʻrishi mumkin — u bilan faqat qulflash mumkin. Ochish uchun esa faqat egasida turadigan yopiq kalit kerak. Masalan, Aziz Nodiraning ochiq kaliti bilan xabarni shifrlaydi, uni faqat Nodira oʻz yopiq kaliti bilan ocha oladi. Bu usul xavfsizroq, lekin sekinroq ishlaydi.",
      easy: "Ochiq kalit — hammaga tarqatilgan ochiq qulf: xohlagan odam xatni qulflay oladi. Lekin qulfni ochadigan kalit faqat egasida. Shuning uchun yoʻlda ushlangan xat ochilmaydi.",
      draw: [],
      animTitle: 'Asimmetrik shifrlash',
      anim: { type: 'cipher', mode: 'asymmetric', message: 'Kartam: 8600…', secret: 'Zq7!m0#Rt5@cW' },
      next: 'Bu qayerda ishlatiladi?'
    },
    {
      kind: 'example',
      say: "Bank saytiga kirganingizda manzil «https» bilan boshlanadi va qulf belgisi chiqadi. Orqada shunday jarayon boradi. Brauzer saytdan raqamli sertifikat soʻraydi. Sayt sertifikatni va unda ochiq kalitini yuboradi. Brauzer yangi simmetrik kalit yaratib, uni saytning ochiq kaliti bilan shifrlab joʻnatadi. Sayt uni yopiq kaliti bilan ochadi. Endi ikkalasida bir xil simmetrik kalit bor va qolgan barcha maʼlumot tez simmetrik shifrlash bilan almashinadi. Bu SSL, yangi nomi — TLS protokoli.",
      easy: "HTTPS ikki usulni birlashtiradi: avval asimmetrik usul bilan maxfiy kalitni xavfsiz almashadi, keyin shu kalit bilan tez simmetrik shifrlashda gaplashadi.",
      draw: [],
      animTitle: 'https:// — orqada nima boʻladi',
      anim: {
        type: 'net',
        nodes: [
          { id: 'b', x: 14, y: 28, icon: '🌐', label: 'Brauzer' },
          { id: 's', x: 86, y: 28, icon: '🏦', label: 'Bank sayti' }
        ],
        links: [['b', 's']],
        packets: [
          { path: ['b', 's'], label: '1. Sertifikat?', color: '#64748b' },
          { path: ['s', 'b'], label: '2. 📜 + 🔓', color: '#8b5cf6' },
          { path: ['b', 's'], label: '3. 🔑 shifrlangan', color: '#f59e0b' },
          { path: ['s', 'b'], label: '4. 🔒 maʼlumot', color: '#22c55e' }
        ]
      },
      next: 'Yana qayerda?'
    },
    {
      kind: 'explain',
      say: "Shifrlash boshqa joylarda ham ishlaydi. Diskni toʻliq shifrlashda qattiq disk yoki fleshkadagi har bir bit shifrlanadi — qurilma yoʻqolsa ham maʼlumotni oʻqib boʻlmaydi. Wi-Fi routerlar parol bilan tarmoqni yopadi va havodagi maʼlumotni shifrlaydi. Elektron pochta ham asimmetrik usulda shifrlanishi mumkin, bunda ilova fayllar ham shifrlanadi. Esda tuting: shifrlash maʼlumot oʻgʻirlanishini toʻxtatmaydi, faqat oʻgʻirlangan maʼlumotni tushunarsiz qiladi.",
      easy: "Fleshka, disk, Wi-Fi va pochta — hammasi shifrlanadi. Shifrlash oʻgʻrini toʻxtatmaydi, lekin oʻgʻri olgan narsasini oʻqiy olmaydi.",
      draw: [],
      animTitle: 'Shifrlash qayerda',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '💾', title: 'Disk va fleshka', text: 'Har bir bit shifrlanadi: yoʻqolsa ham oʻqib boʻlmaydi.' },
          { icon: '📶', title: 'Wi-Fi', text: 'Parolsiz kirib boʻlmaydi, havodagi maʼlumot shifrlangan.' },
          { icon: '✉️', title: 'Elektron pochta', text: 'Asimmetrik usul, ilova fayllar ham shifrlanadi.' },
          { icon: '⚠️', title: 'Esda tuting', text: 'Oʻgʻirlikni toʻxtatmaydi — faqat tushunarsiz qiladi.' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Shifrlash — maʼlumotni kalitsiz oʻqib boʻlmaydigan holga keltirish; ochish — deshifrlash.',
    'Sezar shifri: har bir harf alifboda kalit soniga suriladi (kalit 3: SALOM ➜ VDORP).',
    'Simmetrik: bitta umumiy kalit, tez; kalitni yetkazish xavfli. Masalan, AES.',
    'Asimmetrik: ochiq kalit qulflaydi, yopiq kalit ochadi; xavfsiz, lekin sekinroq.',
    'HTTPS (SSL/TLS): sertifikat + asimmetrik usulda kalit almashinuvi, soʻng simmetrik shifrlash.'
  ],
  questions: [
    {
      id: 'i4q1',
      prompt: 'Sezar shifri, kalit = 3. «KITOB» soʻzini shifrlang.',
      hint: 'Har bir harfni 3 ta oldinga suring: K ➜ N …',
      explanation: 'K ➜ N, I ➜ L, T ➜ W, O ➜ R, B ➜ E: NLWRE.',
      widget: { type: 'text_answer', props: { before: 'KITOB ➜', answer: 'NLWRE', width: 7 } }
    },
    {
      id: 'i4q2',
      prompt: 'Sezar shifri, kalit = 4. «AIPP HSRI» xabarini oching (inglizcha ikki soʻz).',
      hint: 'Har bir harfni 4 ta orqaga suring: A ➜ W …',
      explanation: 'A ➜ W, I ➜ E, P ➜ L, P ➜ L; H ➜ D, S ➜ O, R ➜ N, I ➜ E: WELL DONE.',
      widget: { type: 'text_answer', props: { before: 'AIPP HSRI ➜', answer: 'WELL DONE', width: 10 } }
    },
    {
      id: 'i4q3',
      prompt: 'Sezar shifrida A harfi D ga aylandi. Kalit nechaga teng?',
      hint: 'A, B, C, D — nechta qadam?',
      explanation: 'A dan D gacha 3 ta qadam: kalit = 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'i4q4',
      prompt: 'Simmetrik yoki asimmetrik? Ajrating.',
      hint: 'Nechta kalit ishlatiladi?',
      explanation: 'Simmetrik: bitta umumiy kalit, tez, kalit yoʻlda oʻgʻirlanishi mumkin. Asimmetrik: ochiq va yopiq kalit, sekinroq, kalitni yashirin yetkazish shart emas.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 's', label: 'Simmetrik' },
            { id: 'a', label: 'Asimmetrik' }
          ],
          tiles: [
            { id: 't1', label: 'Bitta umumiy kalit', bin: 's' },
            { id: 't2', label: 'Ochiq va yopiq kalit', bin: 'a' },
            { id: 't3', label: 'Tezroq ishlaydi', bin: 's' },
            { id: 't4', label: 'Sekinroq ishlaydi', bin: 'a' },
            { id: 't5', label: 'Kalitni oldindan yetkazish kerak', bin: 's' },
            { id: 't6', label: 'Ochiq kalitni hamma koʻrsa ham boʻladi', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'i4q5',
      prompt: 'HTTPS ulanish bosqichlarini tartiblang.',
      hint: 'Avval sertifikat, oxirida maʼlumot.',
      explanation: 'Brauzer sertifikat soʻraydi ➜ sayt sertifikat va ochiq kalitni yuboradi ➜ brauzer simmetrik kalitni shifrlab joʻnatadi ➜ sayt uni yopiq kaliti bilan ochadi ➜ maʼlumot simmetrik shifrlanib almashinadi.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['Brauzer sertifikat soʻraydi', 'Sayt sertifikat va ochiq kalitini yuboradi', 'Brauzer yangi simmetrik kalitni shifrlab yuboradi', 'Sayt uni yopiq kaliti bilan ochadi', 'Maʼlumot simmetrik kalit bilan almashinadi']
        }
      }
    },
    {
      id: 'i4q6',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Shifrlash nimani qila oladi va nimani qilolmaydi?',
      explanation: 'Shifrlash oʻgʻirlikni toʻxtatmaydi; ochiq kalit bilan ochib boʻlmaydi; TLS — SSL ning yangi varianti; AES — simmetrik standart.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Shifrlash maʼlumot oʻgʻirlanishining oldini oladi.', value: false },
            { text: 'Ochiq kalit bilan shifrlangan xabarni ochiq kalit bilan ochish mumkin.', value: false },
            { text: 'TLS protokoli SSL oʻrnini egallagan.', value: true },
            { text: 'AES — simmetrik shifrlash standarti.', value: true }
          ]
        }
      }
    },
    {
      id: 'i4q7',
      prompt: 'Saytga bank kartasi raqamini kiritishdan oldin nimalarga qarash kerak? Toʻgʻrilarini bosing.',
      hint: 'Xavfsiz ulanish belgilari.',
      explanation: 'Manzil https:// bilan boshlanishi, qulf belgisi va sertifikat aynan shu saytga tegishli boʻlishi kerak. Rang va reklama xavfsizlikni bildirmaydi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Manzil https:// bilan boshlanadi', match: true },
            { id: 'b', text: 'Manzil satrida qulf belgisi bor', match: true },
            { id: 'c', text: 'Sertifikat shu saytga tegishli', match: true },
            { id: 'd', text: 'Sayt chiroyli va rangli', match: false },
            { id: 'e', text: 'Sahifada reklama koʻp', match: false }
          ]
        }
      }
    },
    {
      id: 'i4q8',
      prompt: 'Qaysi biri shifrlashga aloqador emas?',
      hint: 'Uchtasi xavfsizlik standarti.',
      explanation: 'SSL, TLS va AES — shifrlash standartlari. JPG — rasm formati.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'SSL' }, { text: 'TLS' }, { text: 'AES' }, { text: 'JPG', odd: true }] } }
    },
    {
      id: 'i4q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Qaysi kalit qulflaydi, qaysi kalit ochadi?',
      explanation: 'Asimmetrik usulda xabar qabul qiluvchining ochiq kaliti bilan shifrlanadi va faqat uning yopiq (shaxsiy) kaliti bilan ochiladi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Aziz xabarni Nodiraning' }, { blank: 'ochiq' }, { text: 'kaliti bilan shifrlaydi. Uni faqat Nodiraning' }, { blank: 'yopiq' }, { text: 'kaliti ochadi.' }],
          bank: ['ochiq', 'yopiq', 'umumiy']
        }
      }
    },
    {
      id: 'i4q10',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Deshifrlash — teskari jarayon.',
      explanation: 'Shifrlash — yopish; deshifrlash — ochish; sertifikat — sayt egasi va ochiq kalitni tasdiqlaydi; HTTPS — xavfsiz veb protokol.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Shifrlash' }, right: { label: 'kalitsiz oʻqib boʻlmaydigan holga keltirish' } },
            { left: { label: 'Deshifrlash' }, right: { label: 'shifrlangan maʼlumotni ochish' } },
            { left: { label: 'Raqamli sertifikat' }, right: { label: 'sayt va uning ochiq kalitini tasdiqlaydi' } },
            { left: { label: 'HTTPS' }, right: { label: 'xavfsiz veb-sahifalar protokoli' } }
          ]
        }
      }
    }
  ]
};
