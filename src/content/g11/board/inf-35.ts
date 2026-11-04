import type { BoardLesson } from './types';

/** Darslik: 13.01 — tarmoq komponentlari: tarmoq kartasi, hub, switch, router, koʻprik, shlyuz, simsiz kirish nuqtasi; kabel va simsiz uzatish muhitlari. */
export const INF_35: BoardLesson = {
  n: 35,
  label: '35',
  part: 11,
  title: 'Tarmoq qurilmalari',
  section: '13.01',
  steps: [
    {
      kind: 'hook',
      say: "Kompyuter 1 printerga hujjat yubormoqda. Agar ular hub orqali ulangan boʻlsa, hub paketni hamma qurilmalarga birdan joʻnatadi — kimga kerak boʻlsa, oʻsha oladi, qolganlari tashlab yuboradi. Bu tarmoqni behuda band qiladi va xavfsiz emas. Kuzating: bitta paket toʻrt tomonga ketdi.",
      easy: "Hub — «baqiruvchi»: bitta xabarni hammaga aytadi. Tarmoq band boʻladi.",
      draw: [],
      animTitle: 'Hub: hammaga yuboradi',
      anim: {
        type: 'net',
        together: true,
        nodes: [
          { id: 'h', x: 50, y: 30, icon: '🔌', label: 'Hub' },
          { id: 'a', x: 12, y: 10, icon: '💻', label: 'Kompyuter 1' },
          { id: 'b', x: 12, y: 50, icon: '💻', label: 'Kompyuter 2' },
          { id: 'c', x: 88, y: 10, icon: '🖨️', label: 'Printer' },
          { id: 'd', x: 88, y: 50, icon: '💻', label: 'Kompyuter 3' }
        ],
        links: [
          ['a', 'h'],
          ['b', 'h'],
          ['c', 'h'],
          ['d', 'h']
        ],
        packets: [
          { path: ['a', 'h', 'c'], label: '📄', color: '#22c55e' },
          { path: ['a', 'h', 'b'], label: '📄', color: '#94a3b8' },
          { path: ['a', 'h', 'd'], label: '📄', color: '#94a3b8' }
        ]
      },
      next: 'Yaxshiroq qurilma bormi?'
    },
    {
      kind: 'example',
      say: "Switch, yaʼni kommutator aqlliroq. U har bir portga ulangan qurilmaning MAC manzilini eslab qoladi va paketni faqat kerakli qurilmaga yuboradi. Tarmoq kamroq band boʻladi, tezroq va xavfsizroq ishlaydi. Shuning uchun bugun lokal tarmoqlarda hub emas, switch ishlatiladi.",
      easy: "Switch — «pochtachi»: xatni faqat egasiga olib boradi, chunki har qurilmaning manzilini biladi.",
      draw: [],
      animTitle: 'Switch: faqat kerakli qurilmaga',
      anim: {
        type: 'net',
        nodes: [
          { id: 'h', x: 50, y: 30, icon: '🔀', label: 'Switch' },
          { id: 'a', x: 12, y: 10, icon: '💻', label: 'Kompyuter 1' },
          { id: 'b', x: 12, y: 50, icon: '💻', label: 'Kompyuter 2' },
          { id: 'c', x: 88, y: 10, icon: '🖨️', label: 'Printer' },
          { id: 'd', x: 88, y: 50, icon: '💻', label: 'Kompyuter 3' }
        ],
        links: [
          ['a', 'h'],
          ['b', 'h'],
          ['c', 'h'],
          ['d', 'h']
        ],
        packets: [
          { path: ['a', 'h', 'c'], label: '📄 printerga', color: '#22c55e' },
          { path: ['b', 'h', 'd'], label: '💬 3-kompyuterga', color: '#0ea5e9' }
        ]
      },
      next: 'Router nima qiladi?'
    },
    {
      kind: 'explain',
      say: "Boshqa qurilmalar. Tarmoq kartasi — har bir qurilmani tarmoqqa ulaydi va unga yagona MAC manzil beradi. Router — turli tarmoqlarni, masalan, uy tarmogʻini internet bilan bogʻlaydi va paketga eng yaxshi yoʻlni IP manzil boʻyicha tanlaydi. Koʻprik — bir xil turdagi ikki lokal tarmoqni birlashtiradi. Shlyuz — turli qoidalar, yaʼni protokollar bilan ishlaydigan tarmoqlarni bogʻlaydi. Simsiz kirish nuqtasi — qurilmalarni Wi-Fi orqali simli tarmoqqa ulaydi.",
      easy: "Tarmoq kartasi — ulash. Switch — LAN ichida. Router — tarmoqlar orasida. Koʻprik — ikki LAN. Shlyuz — turli protokollar. Kirish nuqtasi — Wi-Fi.",
      draw: [],
      animTitle: 'Tarmoq qurilmalari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🧩', title: 'Tarmoq kartasi', text: 'Ulanish, MAC manzil' },
          { icon: '🔀', title: 'Switch', text: 'LAN ichida faqat kerakli qurilmaga' },
          { icon: '🛣️', title: 'Router', text: 'Tarmoqlar orasida, IP boʻyicha yoʻl' },
          { icon: '🌉', title: 'Koʻprik', text: 'Ikki bir xil LAN ni ulaydi' },
          { icon: '🚪', title: 'Shlyuz', text: 'Turli protokolli tarmoqlar' },
          { icon: '📶', title: 'Kirish nuqtasi', text: 'Wi-Fi qurilmalarni ulaydi' }
        ]
      },
      next: 'Simlar-chi?'
    },
    {
      kind: 'explain',
      say: "Simli uzatish muhitlari. Oʻralgan juftlik — eng keng tarqalgan arzon tarmoq kabeli, lekin shovqinga sezgir va masofasi 100 metr atrofida. Koaksial kabel — yaxshiroq himoyalangan, kabel televideniyesida. Optik tola — maʼlumotni yorugʻlik bilan uzatadi: juda tez, uzoq masofaga, elektromagnit shovqin taʼsir qilmaydi va ulanib tinglash qiyin; lekin qimmat va oʻrnatish murakkab.",
      easy: "Oʻralgan juftlik — arzon, qisqa masofa. Koaksial — TV kabeli. Optik tola — yorugʻlik bilan, eng tez va uzoq, lekin qimmat.",
      draw: [],
      animTitle: 'Kabellar',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🧵', title: 'Oʻralgan juftlik', text: 'Arzon, ~100 m, shovqinga sezgir' },
          { icon: '📺', title: 'Koaksial', text: 'Yaxshi himoyalangan, kabel TV' },
          { icon: '💡', title: 'Optik tola', text: 'Yorugʻlik, juda tez, uzoq, qimmat' }
        ]
      },
      next: 'Simsiz-chi?'
    },
    {
      kind: 'explain',
      say: "Simsiz uzatish. Wi-Fi — uy va maktab tarmogʻi, tez, lekin devorlar signalni zaiflashtiradi va parol bilan himoyalash kerak. Bluetooth — qisqa masofada qurilmalarni juftlash: quloqchin, soat. Infraqizil — televizor pulti, toʻgʻri koʻrinish kerak. Mikrotoʻlqin va lazer — binolar orasida toʻgʻri chiziqda aloqa. Sunʼiy yoʻldosh — kabel yetmaydigan uzoq hududlar uchun. Afzalligi — sim tortish shart emas, harakatlanish mumkin; kamchiligi — toʻsiqlar, shovqin va xavfsizlik.",
      easy: "Wi-Fi — uy tarmogʻi. Bluetooth — yaqin qurilmalar. Infraqizil — pult. Sunʼiy yoʻldosh — uzoq joylar.",
      draw: [],
      animTitle: 'Simli va simsiz',
      anim: {
        type: 'compare',
        left: { icon: '🔌', title: 'Simli', items: ['Tez va barqaror', 'Xavfsizroq', 'Harakatlanib boʻlmaydi', 'Kabel tortish qimmat'] },
        right: { icon: '📡', title: 'Simsiz', items: ['Sim kerak emas', 'Harakatlanish mumkin', 'Devor va shovqin taʼsir qiladi', 'Parol va shifrlash shart'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Hub paketni hamma qurilmalarga yuboradi; switch esa MAC manzil boʻyicha faqat kerakli qurilmaga.',
    'Router turli tarmoqlarni bogʻlaydi va IP boʻyicha yoʻl tanlaydi; koʻprik — ikki LAN; shlyuz — turli protokollar; kirish nuqtasi — Wi-Fi.',
    'Tarmoq kartasi qurilmani ulaydi va unga MAC manzil beradi.',
    'Kabellar: oʻralgan juftlik (arzon), koaksial, optik tola (yorugʻlik, tez, uzoq).',
    'Simsiz: Wi-Fi, Bluetooth, infraqizil, mikrotoʻlqin, lazer, sunʼiy yoʻldosh.'
  ],
  questions: [
    {
      id: 'i35q1',
      prompt: 'Qurilmani vazifasi bilan juftlang.',
      hint: 'LAN ichida, tarmoqlar orasida, Wi-Fi…',
      explanation: 'Switch — LAN ichida kerakli qurilmaga; router — tarmoqlar orasida; kirish nuqtasi — Wi-Fi; shlyuz — turli protokolli tarmoqlar.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Switch' }, right: { label: 'paketni faqat kerakli qurilmaga' } },
            { left: { label: 'Router' }, right: { label: 'uy tarmogʻini internetga ulaydi' } },
            { left: { label: 'Kirish nuqtasi' }, right: { label: 'Wi-Fi qurilmalarni ulaydi' } },
            { left: { label: 'Shlyuz' }, right: { label: 'turli protokolli tarmoqlarni bogʻlaydi' } }
          ]
        }
      }
    },
    {
      id: 'i35q2',
      prompt: 'Hub yoki switch?',
      hint: 'Hammagami yoki keraklisigami?',
      explanation: 'Hub: hammaga yuboradi, tarmoq band, kam xavfsiz. Switch: MAC manzilni eslaydi, faqat kerakliga, tezroq.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'h', label: 'Hub' },
            { id: 's', label: 'Switch' }
          ],
          tiles: [
            { id: 't1', label: 'Paketni hammaga yuboradi', bin: 'h' },
            { id: 't2', label: 'MAC manzillarni eslab qoladi', bin: 's' },
            { id: 't3', label: 'Tarmoqni behuda band qiladi', bin: 'h' },
            { id: 't4', label: 'Faqat kerakli qurilmaga yuboradi', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'i35q3',
      prompt: 'Kabel turini xususiyati bilan juftlang.',
      hint: 'Arzon, TV, yorugʻlik.',
      explanation: 'Oʻralgan juftlik — arzon, ~100 m; koaksial — kabel TV; optik tola — yorugʻlik, juda tez.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Oʻralgan juftlik' }, right: { label: 'arzon, taxminan 100 m gacha' } },
            { left: { label: 'Koaksial' }, right: { label: 'kabel televideniyesi' } },
            { left: { label: 'Optik tola' }, right: { label: 'yorugʻlik bilan, juda tez va uzoq' } }
          ]
        }
      }
    },
    {
      id: 'i35q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Optik tolaga shovqin taʼsir qiladimi?',
      explanation: 'Optik tolaga elektromagnit shovqin taʼsir qilmaydi; infraqizil toʻgʻri koʻrinish talab qiladi; router IP boʻyicha yoʻl tanlaydi; Bluetooth qisqa masofali.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Optik tolaga elektromagnit shovqin kuchli taʼsir qiladi.', value: false },
            { text: 'Infraqizil aloqa uchun qurilmalar bir-birini «koʻrishi» kerak.', value: true },
            { text: 'Router paket uchun yoʻlni IP manzil boʻyicha tanlaydi.', value: true },
            { text: 'Bluetooth shaharlar orasidagi aloqa uchun.', value: false }
          ]
        }
      }
    },
    {
      id: 'i35q5',
      prompt: 'Vazifaga mos simsiz texnologiyani tanlang.',
      hint: 'Masofa va qurilma.',
      explanation: 'Quloqchin — Bluetooth; televizor pulti — infraqizil; uy noutbuki — Wi-Fi; togʻdagi qishloq — sunʼiy yoʻldosh.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Simsiz quloqchin' }, right: { label: 'Bluetooth' } },
            { left: { label: 'Televizor pulti' }, right: { label: 'infraqizil' } },
            { left: { label: 'Uydagi noutbuk internetga' }, right: { label: 'Wi-Fi' } },
            { left: { label: 'Togʻdagi uzoq qishloq' }, right: { label: 'sunʼiy yoʻldosh' } }
          ]
        }
      }
    },
    {
      id: 'i35q6',
      prompt: 'Hub orqali 1 kompyuter 5 ta boshqa qurilmali tarmoqqa bitta paket yubordi. Nechta qurilma paketni oladi?',
      hint: 'Hub hammaga yuboradi.',
      explanation: 'Hub paketni 5 ta qurilmaning hammasiga yuboradi (switch esa faqat 1 taga).',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'ta' } }
    },
    {
      id: 'i35q7',
      prompt: 'Simsiz tarmoqning kamchiliklarini bosing.',
      hint: 'Toʻsiq va xavfsizlik.',
      explanation: 'Devorlar signalni zaiflashtiradi, begona ulanishi mumkin, shovqin taʼsir qiladi. Harakatlanish imkoni — afzallik.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Devorlar signalni zaiflashtiradi', match: true },
            { id: 'b', text: 'Paroli boʻlmasa, begona ulanadi', match: true },
            { id: 'c', text: 'Boshqa qurilmalar shovqin beradi', match: true },
            { id: 'd', text: 'Xonada bemalol yurish mumkin', match: false }
          ]
        }
      }
    },
    {
      id: 'i35q8',
      prompt: 'Qaysi biri tarmoq qurilmasi emas?',
      hint: 'Uchtasi paket uzatadi.',
      explanation: 'Switch, router va kirish nuqtasi — tarmoq qurilmalari. Plotter — chiqarish qurilmasi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Switch' }, { text: 'Router' }, { text: 'Kirish nuqtasi' }, { text: 'Plotter', odd: true }] } }
    },
    {
      id: 'i35q9',
      prompt: 'Uy kompyuteridan saytga paket yoʻlini tartiblang.',
      hint: 'Kartadan internetgacha.',
      explanation: 'Tarmoq kartasi ➜ Wi-Fi kirish nuqtasi ➜ router ➜ internet ➜ veb-server.',
      widget: { type: 'step_order', props: { steps: ['Tarmoq kartasi', 'Wi-Fi kirish nuqtasi', 'Router', 'Internet', 'Veb-server'] } }
    },
    {
      id: 'i35q10',
      prompt: 'Tarmoq kartasiga beriladigan yagona apparat manzil qanday ataladi? (3 harf)',
      hint: 'Media Access Control',
      explanation: 'MAC manzil.',
      widget: { type: 'text_answer', props: { answer: 'MAC', after: 'manzil', width: 5 } }
    }
  ]
};
