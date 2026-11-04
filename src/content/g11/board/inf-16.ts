import type { BoardLesson } from './types';

/** Darslik: 6.02–6.05 — internet va Butunjahon oʻrgimchak toʻri (WWW), internetda muloqot, mobil tarmoqlar. */
export const INF_16: BoardLesson = {
  n: 16,
  label: '16',
  part: 10,
  title: 'Internet va WWW, mobil aloqa',
  section: '6.02–6.05',
  steps: [
    {
      kind: 'hook',
      say: "Brauzerga «kitob.uz» deb yozib, Enter ni bosdingiz. Bir soniyada nima sodir boʻladi? Avval brauzer manzillar serveridan — DNS dan — bu saytning raqamli IP manzilini soʻraydi. Keyin oʻsha IP manzildagi veb-serverga soʻrov yuboradi. Server sahifani qaytaradi va brauzer uni chizib beradi.",
      easy: "Brauzer avval saytning raqamli manzilini DNS dan soʻraydi, keyin oʻsha serverdan sahifani oladi va koʻrsatadi.",
      draw: [],
      animTitle: 'Sayt qanday ochiladi',
      anim: {
        type: 'net',
        nodes: [
          { id: 'b', x: 12, y: 26, icon: '🌐', label: 'Brauzer' },
          { id: 'd', x: 50, y: 8, icon: '📒', label: 'DNS' },
          { id: 's', x: 88, y: 26, icon: '🗄️', label: 'Veb-server' }
        ],
        links: [
          ['b', 'd'],
          ['b', 's']
        ],
        packets: [
          { path: ['b', 'd'], label: 'kitob.uz ?', color: '#64748b' },
          { path: ['d', 'b'], label: 'IP: 203.0.113.7', color: '#8b5cf6' },
          { path: ['b', 's'], label: 'sahifani bering', color: '#0ea5e9' },
          { path: ['s', 'b'], label: '📄 HTML sahifa', color: '#22c55e' }
        ]
      },
      next: 'Internet va WWW farqi?'
    },
    {
      kind: 'explain',
      say: "Koʻpchilik internet va WWW ni bir narsa deb oʻylaydi, lekin ular farq qiladi. Internet — butun dunyodagi kompyuterlarni bogʻlaydigan jismoniy tarmoq: kabellar, routerlar, serverlar. Uning oʻzida axborot yoʻq, u — infratuzilma. Butunjahon oʻrgimchak toʻri, yaʼni WWW — internet ustida ishlaydigan veb-sahifalar, rasmlar va videolar tizimi. Biz unga brauzer orqali kiramiz. Elektron pochta, messenjerlar va onlayn oʻyinlar ham internetdan foydalanadi, lekin ular WWW emas.",
      easy: "Internet — yoʻllar. WWW — shu yoʻllardagi «uylar», yaʼni saytlar. Pochta va messenjerlar ham shu yoʻllardan yuradi, lekin ular sayt emas.",
      draw: [],
      animTitle: 'Internet va WWW',
      anim: {
        type: 'compare',
        left: { icon: '🛣️', title: 'Internet', items: ['Jismoniy global tarmoq', 'Kabel, router, server', 'Oʻzida axborot yoʻq', 'Pochta, oʻyin, WWW — hammasi ustida'] },
        right: { icon: '🕸️', title: 'WWW', items: ['Veb-sahifalar tizimi', 'Giperhavolalar bilan bogʻlangan', 'Brauzer orqali ochiladi', '1989-yil, Tim Berners-Li, CERN'] }
      },
      next: 'Veb-manzil qanday tuzilgan?'
    },
    {
      kind: 'explain',
      say: "Veb-sahifa manzili — URL. Masalan, «https://www.kitob.uz/darslar/informatika». Birinchi qism — protokol: https — xavfsiz uzatish qoidasi. Keyin domen nomi: www.kitob.uz — qaysi server. Oxiri — yoʻl: serverdagi aniq sahifa. Sahifalar bir-biriga giperhavolalar bilan bogʻlangan: havolani bossangiz, boshqa sahifa yoki boshqa sayt ochiladi.",
      easy: "URL uch qismdan iborat: protokol (https), domen (kitob.uz) va yoʻl (/darslar/informatika).",
      draw: [],
      animTitle: 'URL qismlari',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🔐', label: 'Protokol' },
          { icon: '🏷️', label: 'Domen' },
          { icon: '📂', label: 'Yoʻl' }
        ],
        items: [{ texts: ['https://', 'www.kitob.uz', '/darslar/informatika'] }],
        result: 'Giperhavola bosilsa — boshqa URL ochiladi'
      },
      next: 'Internetda muloqot-chi?'
    },
    {
      kind: 'explain',
      say: "Internet muloqot uchun ham ishlatiladi. Tezkor xabarlar — matnni real vaqtda yuborish: messenjerlar va ijtimoiy tarmoqlardagi chatlar. VoIP — internet orqali ovozli qoʻngʻiroq: ovoz raqamga aylanib, paketlarda yuboriladi; tashkilot ichida bepul, lekin tarmoq band boʻlsa, ovoz uzilib qolishi mumkin. Elektron pochta — xat va fayllar yuborish. Yangiliklar xizmatlari esa siz tanlagan mavzular boʻyicha xabarnoma yuboradi.",
      easy: "Messenjer — tezkor yozishma. VoIP — internet orqali qoʻngʻiroq. Pochta — xatlar. Yangiliklar ilovasi — siz tanlagan xabarlar.",
      draw: [],
      animTitle: 'Internetda muloqot',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '💬', title: 'Tezkor xabarlar', text: 'Real vaqtda matn, fayl, stiker' },
          { icon: '📞', title: 'VoIP', text: 'Internet orqali qoʻngʻiroq; tarmoq band boʻlsa — uziladi' },
          { icon: '✉️', title: 'Elektron pochta', text: 'Xat va ilova fayllar' },
          { icon: '📰', title: 'Yangiliklar xizmati', text: 'Tanlangan mavzular boʻyicha xabarnoma' }
        ]
      },
      next: 'Mobil tarmoq qanday ishlaydi?'
    },
    {
      kind: 'example',
      say: "Mobil tarmoq — radio orqali ishlaydigan simsiz global tarmoq. Hudud kichik qismlarga — uyalarga boʻlingan, har bir uyada bazaviy stansiya, yaʼni minora bor. Avtobusda ketayotib gaplashsangiz, telefon bir uyadan keyingisiga oʻtadi va aloqa uzilmaydi — minoralar suhbatni bir-biriga uzatib beradi. Minoradan uzoqlashgan sari signal zaiflashadi.",
      easy: "Shahar uyalarga boʻlingan, har birida minora. Siz yursangiz, telefon bir minoradan keyingisiga «oʻtadi» va aloqa davom etadi.",
      draw: [],
      animTitle: 'Uyadan uyaga',
      anim: {
        type: 'net',
        nodes: [
          { id: 't1', x: 14, y: 22, icon: '📡', label: '1-uya' },
          { id: 't2', x: 50, y: 22, icon: '📡', label: '2-uya' },
          { id: 't3', x: 86, y: 22, icon: '📡', label: '3-uya' }
        ],
        links: [
          ['t1', 't2'],
          ['t2', 't3']
        ],
        packets: [{ path: ['t1', 't2', 't3'], label: '📱 qoʻngʻiroq davom etyapti', color: '#0ea5e9' }]
      },
      next: 'Avlodlar-chi?'
    },
    {
      kind: 'explain',
      say: "Mobil tarmoqlarning avlodlari bor. 1G — analog, faqat ovoz. 2G — raqamli: qoʻngʻiroq va SMS, internet juda sekin. 3G — mobil internet va videoqoʻngʻiroq. 4G — tez internet, video tomosha qilish odatiy holga aylandi. 5G — eng yangi avlod: yanada tez va kechikishi juda kam, aqlli qurilmalar va onlayn oʻyinlar uchun qulay. Afzalligi — har joyda aloqa; kamchiligi — minoradan uzoqda signal zaif, binolar va togʻlar toʻsadi.",
      easy: "1G — ovoz, 2G — SMS, 3G — internet, 4G — tez video, 5G — eng tez va kechikishsiz. Uzoqda yoki togʻda signal zaiflashadi.",
      draw: [],
      animTitle: 'Mobil tarmoq avlodlari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '1️⃣', title: '1G', text: 'Analog, faqat ovoz' },
          { icon: '2️⃣', title: '2G', text: 'Raqamli qoʻngʻiroq va SMS' },
          { icon: '3️⃣', title: '3G', text: 'Mobil internet, videoqoʻngʻiroq' },
          { icon: '4️⃣', title: '4G', text: 'Tez internet, video tomosha' },
          { icon: '5️⃣', title: '5G', text: 'Eng tez, kechikish juda kam' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Internet — jismoniy global tarmoq (infratuzilma); WWW — uning ustidagi veb-sahifalar tizimi.',
    'WWW ni 1989-yilda Tim Berners-Li CERN da taklif qilgan; sahifalar giperhavolalar bilan bogʻlangan.',
    'URL: protokol (https) + domen (kitob.uz) + yoʻl; DNS domenni IP manzilga aylantiradi.',
    'Muloqot: tezkor xabarlar, VoIP, elektron pochta, yangiliklar xizmatlari.',
    'Mobil tarmoq uyalarga boʻlingan; avlodlar: 1G ➜ 2G ➜ 3G ➜ 4G ➜ 5G.'
  ],
  questions: [
    {
      id: 'i16q1',
      prompt: 'Internet yoki WWW?',
      hint: 'Jismoniy tarmoqmi yoki sahifalar tizimimi?',
      explanation: 'Kabellar, routerlar, global tarmoq — internet. Veb-sahifalar, giperhavolalar, brauzerda ochiladigan saytlar — WWW.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'i', label: 'Internet' },
            { id: 'w', label: 'WWW' }
          ],
          tiles: [
            { id: 't1', label: 'Kabellar va routerlar', bin: 'i' },
            { id: 't2', label: 'Veb-sahifalar', bin: 'w' },
            { id: 't3', label: 'Jismoniy global tarmoq', bin: 'i' },
            { id: 't4', label: 'Giperhavolalar', bin: 'w' },
            { id: 't5', label: 'Oʻzida axborot saqlamaydi', bin: 'i' },
            { id: 't6', label: 'Brauzer orqali ochiladi', bin: 'w' }
          ]
        }
      }
    },
    {
      id: 'i16q2',
      prompt: 'URL qismlarini juftlang: https://www.kitob.uz/darslar',
      hint: 'Qoida, server, sahifa.',
      explanation: 'https — protokol; www.kitob.uz — domen; /darslar — yoʻl (sahifa).',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'https://' }, right: { label: 'protokol' } },
            { left: { label: 'www.kitob.uz' }, right: { label: 'domen nomi' } },
            { left: { label: '/darslar' }, right: { label: 'serverdagi yoʻl' } }
          ]
        }
      }
    },
    {
      id: 'i16q3',
      prompt: 'Sayt ochilish bosqichlarini tartiblang.',
      hint: 'Avval raqamli manzil kerak.',
      explanation: 'Manzil yoziladi ➜ DNS dan IP soʻraladi ➜ IP olinadi ➜ veb-serverga soʻrov ➜ sahifa qaytadi va koʻrsatiladi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Brauzerga manzil yoziladi', 'DNS dan IP manzil soʻraladi', 'DNS IP manzilni qaytaradi', 'Veb-serverga soʻrov yuboriladi', 'Sahifa qaytib, ekranda chiziladi'] }
      }
    },
    {
      id: 'i16q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Elektron pochta WWW mi?',
      explanation: 'Elektron pochta internetdan foydalanadi, lekin WWW emas; WWW ni Tim Berners-Li yaratgan; VoIP tarmoq band boʻlsa sifatini yoʻqotadi; 2G da internet juda sekin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Elektron pochta — WWW ning bir qismi.', value: false },
            { text: 'WWW gʻoyasini Tim Berners-Li taklif qilgan.', value: true },
            { text: 'Tarmoq band boʻlsa, VoIP ovozi uzilishi mumkin.', value: true },
            { text: '2G tarmogʻida video tomosha qilish juda qulay.', value: false }
          ]
        }
      }
    },
    {
      id: 'i16q5',
      prompt: 'Avlodni asosiy imkoniyati bilan juftlang.',
      hint: 'Ovozdan videogacha.',
      explanation: '1G — analog ovoz; 2G — SMS; 3G — mobil internet; 4G — tez video.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: '1G' }, right: { label: 'analog ovoz' } },
            { left: { label: '2G' }, right: { label: 'raqamli qoʻngʻiroq va SMS' } },
            { left: { label: '3G' }, right: { label: 'mobil internet' } },
            { left: { label: '4G' }, right: { label: 'tez internet, video' } }
          ]
        }
      }
    },
    {
      id: 'i16q6',
      prompt: 'Qaysilari internet orqali muloqot usuli? Bosing.',
      hint: 'Paketlar internetdan yuradi.',
      explanation: 'Messenjer, VoIP qoʻngʻiroq va elektron pochta — internet orqali. Qogʻoz xat va oddiy radio — internet emas.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Messenjerdagi chat', match: true },
            { id: 'b', text: 'VoIP qoʻngʻiroq', match: true },
            { id: 'c', text: 'Elektron pochta', match: true },
            { id: 'd', text: 'Pochta orqali qogʻoz xat', match: false },
            { id: 'e', text: 'FM radio', match: false }
          ]
        }
      }
    },
    {
      id: 'i16q7',
      prompt: 'Qaysi biri brauzer emas?',
      hint: 'Uchtasi veb-sahifalarni ochadi.',
      explanation: 'Chrome, Firefox, Safari — brauzerlar. DNS — domen nomlarini IP ga aylantiruvchi tizim.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Chrome' }, { text: 'Firefox' }, { text: 'Safari' }, { text: 'DNS', odd: true }] } }
    },
    {
      id: 'i16q8',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Yoʻllar va uylar.',
      explanation: 'Internet — jismoniy tarmoq, WWW — uning ustidagi sahifalar tizimi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Jismoniy global tarmoq —' }, { blank: 'internet' }, { text: ', uning ustidagi veb-sahifalar tizimi —' }, { blank: 'WWW' }, { text: '.' }],
          bank: ['internet', 'WWW', 'intranet']
        }
      }
    },
    {
      id: 'i16q9',
      prompt: 'Mobil tarmoqning kamchiliklarini bosing.',
      hint: 'Signal qayerda zaiflashadi?',
      explanation: 'Minoradan uzoqda va togʻ yoki binolar ortida signal zaif, aloqa uzilishi mumkin. Har joyda aloqa va yurganda gaplashish — afzalliklar.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Minoradan uzoqda signal zaif', match: true },
            { id: 'b', text: 'Togʻ va binolar signalni toʻsadi', match: true },
            { id: 'c', text: 'Yurib ketayotib gaplashish mumkin', match: false },
            { id: 'd', text: 'Deyarli hamma joyda aloqa bor', match: false }
          ]
        }
      }
    },
    {
      id: 'i16q10',
      prompt: 'Domen nomini IP manzilga aylantiruvchi tizimning qisqa nomini yozing.',
      hint: 'Domain Name System',
      explanation: 'DNS — Domain Name System, internetning «telefon kitobi».',
      widget: { type: 'text_answer', props: { answer: 'DNS', width: 5 } }
    }
  ]
};
