import type { BoardLesson } from './types';

/** Darslik: 6.01 — tarmoqlar: LAN, WAN, VPN, kliyent-server, peer-to-peer, intranet, ekstranet. */
export const INF_15: BoardLesson = {
  n: 15,
  label: '15',
  part: 10,
  title: 'Tarmoqlar: LAN, WAN, VPN',
  section: '6.01',
  steps: [
    {
      kind: 'hook',
      say: "Informatika xonasida oʻn beshta kompyuter bor, lekin printer bitta. Shunga qaramay, har bir oʻquvchi oʻz kompyuteridan chop eta oladi, fayllarini maktab serveriga saqlaydi va internetga chiqadi. Chunki kompyuterlar tarmoqqa ulangan. Tarmoq — maʼlumot va resurslarni almashish uchun bogʻlangan ikki yoki undan ortiq qurilma.",
      easy: "Tarmoq — bir-biriga ulangan kompyuterlar. Ular bitta printer, bitta server va bitta internetni birga ishlatadi.",
      draw: [],
      animTitle: 'Maktab tarmogʻi',
      anim: {
        type: 'net',
        nodes: [
          { id: 'p1', x: 12, y: 14, icon: '💻', label: 'Kompyuter 1' },
          { id: 'p2', x: 12, y: 54, icon: '💻', label: 'Kompyuter 2' },
          { id: 'sw', x: 46, y: 34, icon: '🔀', label: 'Kommutator' },
          { id: 'pr', x: 84, y: 10, icon: '🖨️', label: 'Printer' },
          { id: 'sv', x: 84, y: 34, icon: '🗄️', label: 'Server' },
          { id: 'rt', x: 84, y: 58, icon: '🌐', label: 'Internet' }
        ],
        links: [
          ['p1', 'sw'],
          ['p2', 'sw'],
          ['sw', 'pr'],
          ['sw', 'sv'],
          ['sw', 'rt']
        ],
        packets: [
          { path: ['p1', 'sw', 'pr'], label: '📄 chop et', color: '#0ea5e9' },
          { path: ['p2', 'sw', 'sv'], label: '💾 saqla', color: '#8b5cf6' },
          { path: ['p1', 'sw', 'rt'], label: '🔎 qidiruv', color: '#22c55e' }
        ]
      },
      next: 'Tarmoq turlari?'
    },
    {
      kind: 'explain',
      say: "Tarmoqlar hajmiga koʻra farqlanadi. LAN — lokal tarmoq: bitta bino yoki maktab ichida, odatda kabel yoki Wi-Fi bilan, tez va tashkilotning oʻziga tegishli. WLAN — simsiz lokal tarmoq. WAN — global tarmoq: shaharlar va davlatlarni bogʻlaydi, masalan, bankning barcha filiallari. Eng katta WAN — internet. WAN odatda ijaraga olingan aloqa liniyalaridan foydalanadi va LAN dan sekinroq.",
      easy: "LAN — bitta binodagi tarmoq. WAN — shaharlar va davlatlar orasidagi katta tarmoq. Internet — eng katta WAN.",
      draw: [],
      animTitle: 'LAN va WAN',
      anim: {
        type: 'compare',
        left: { icon: '🏫', title: 'LAN', items: ['Bitta bino yoki hudud', 'Kabel yoki Wi-Fi (WLAN)', 'Juda tez', 'Tashkilotning oʻziniki'] },
        right: { icon: '🌍', title: 'WAN', items: ['Shahar va davlatlar', 'Ijaraga olingan liniyalar', 'Sekinroq', 'Eng kattasi — internet'] }
      },
      next: 'Tarmoq qanday tashkil qilinadi?'
    },
    {
      kind: 'explain',
      say: "Tarmoq ikki xil tuzilishi mumkin. Kliyent-server tarmogʻida markaziy server bor: u fayllarni saqlaydi, foydalanuvchilarni tekshiradi va zaxira nusxa oladi, kompyuterlar esa kliyent sifatida undan xizmat soʻraydi. Xavfsiz va boshqarish oson, lekin server qimmat va u buzilsa, hamma ishlamay qoladi. Peer-to-peer, yaʼni teng huquqli tarmoqda server yoʻq: har bir kompyuter fayllarini boshqalarga oʻzi ulashadi. Arzon va oson, lekin xavfsizlik va zaxira nusxa har bir kompyuterda alohida.",
      easy: "Kliyent-server — bitta «bosh» kompyuter hammaga xizmat qiladi. Peer-to-peer — hamma teng, har biri oʻzi ulashadi.",
      draw: [],
      animTitle: 'Kliyent-server va peer-to-peer',
      anim: {
        type: 'compare',
        left: { icon: '🗄️', title: 'Kliyent-server', items: ['Markaziy server bor', 'Xavfsizlik va zaxira markazda', 'Katta tarmoqlar uchun', 'Server qimmat; u buzilsa — hammasi toʻxtaydi'] },
        right: { icon: '🤝', title: 'Peer-to-peer', items: ['Server yoʻq, hamma teng', 'Har kim oʻzi ulashadi', 'Kichik tarmoqlar uchun', 'Arzon, lekin xavfsizlik zaifroq'] }
      },
      next: 'VPN nima?'
    },
    {
      kind: 'example',
      say: "Bank xodimi uydan ishlamoqda va idora tarmogʻidagi maxfiy fayllarga kirishi kerak. U VPN — virtual xususiy tarmoqdan foydalanadi. VPN internet ichida shifrlangan «tunnel» quradi: maʼlumot ochiq internet orqali ketsa ham, uni hech kim oʻqiy olmaydi va xodim xuddi idorada oʻtirgandek ishlaydi. Tunnel maxsus tunnellash protokoli va shifrlash yordamida yaratiladi.",
      easy: "VPN — internet ichidagi yopiq, shifrlangan yoʻl. Uydan idoraga xavfsiz ulanish uchun ishlatiladi.",
      draw: [],
      animTitle: 'VPN tunnel',
      anim: {
        type: 'net',
        nodes: [
          { id: 'h', x: 12, y: 26, icon: '🏠', label: 'Uyda xodim' },
          { id: 'i', x: 50, y: 26, icon: '🌐', label: 'Internet' },
          { id: 'o', x: 88, y: 26, icon: '🏦', label: 'Bank tarmogʻi' },
          { id: 's', x: 50, y: 50, icon: '🕵️', label: 'Begona' }
        ],
        links: [
          ['h', 'i'],
          ['i', 'o'],
          ['i', 's']
        ],
        packets: [
          { path: ['h', 'i', 'o'], label: '🔒 x7#kQ…', color: '#8b5cf6' },
          { path: ['i', 's'], label: '🔒 oʻqib boʻlmaydi', color: '#64748b' },
          { path: ['o', 'i', 'h'], label: '🔒 fayl', color: '#8b5cf6' }
        ]
      },
      next: 'Intranet nima?'
    },
    {
      kind: 'explain',
      say: "Yana uchta atama. Internet — hamma uchun ochiq global tarmoq. Intranet — tashkilotning ichki, yopiq tarmogʻi: unda faqat xodimlar uchun saytlar, hujjatlar va yangiliklar bor, masalan, maktabning ichki portali. Ekstranet — intranetning bir qismi, unga tashqi hamkorlar ham parol bilan kiradi: masalan, doʻkon yetkazib beruvchilarga buyurtmalarni koʻrish uchun ruxsat beradi.",
      easy: "Internet — hamma uchun. Intranet — faqat ichkaridagilar uchun. Ekstranet — ichkaridagilar va tanlangan hamkorlar uchun.",
      draw: [],
      animTitle: 'Kim kira oladi?',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🌐', label: 'Internet' },
          { icon: '🏢', label: 'Intranet' },
          { icon: '🤝', label: 'Ekstranet' }
        ],
        items: [{ texts: ['hamma', 'faqat xodimlar', 'xodimlar + hamkorlar'] }, { texts: ['ochiq saytlar', 'ichki portal', 'buyurtmalar sahifasi'] }]
      },
      next: 'Tarmoqning foydasi-chi?'
    },
    {
      kind: 'explain',
      say: "Tarmoqning afzalliklari: printer, fayllar va internetni birga ishlatish; markaziy zaxira nusxa va dasturlarni bir joydan yangilash; xodimlar oʻrtasida tez aloqa. Kamchiliklari: kabel, kommutator va server sotib olish qimmat; tarmoq administratori kerak; virus bir kompyuterdan boshqalariga tez tarqaladi; server yoki kommutator buzilsa, koʻp kishi ishlay olmaydi.",
      easy: "Yaxshi tomoni — hamma narsani birga ishlatish va oson boshqarish. Yomon tomoni — qimmat, mutaxassis kerak va virus tez tarqaladi.",
      draw: [],
      animTitle: 'Afzallik va kamchilik',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Afzalliklari', items: ['Printer va fayllar umumiy', 'Markaziy zaxira nusxa', 'Dasturlarni bir joydan yangilash', 'Tez aloqa'] },
        right: { icon: '👎', title: 'Kamchiliklari', items: ['Uskunalar qimmat', 'Administrator kerak', 'Virus tez tarqaladi', 'Server buzilsa — hamma toʻxtaydi'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Tarmoq — maʼlumot va resurslarni almashish uchun bogʻlangan qurilmalar.',
    'LAN — bitta bino (WLAN — simsiz); WAN — shahar va davlatlar; internet — eng katta WAN.',
    'Kliyent-server: markaziy server, xavfsiz, lekin qimmat; peer-to-peer: hamma teng, arzon, xavfsizlik zaifroq.',
    'VPN — internet ichidagi shifrlangan tunnel.',
    'Intranet — ichki tarmoq; ekstranet — hamkorlarga ham ochilgan qismi.'
  ],
  questions: [
    {
      id: 'i15q1',
      prompt: 'LAN yoki WAN?',
      hint: 'Bitta binomi yoki shaharlar orasimi?',
      explanation: 'Maktab xonasi va uy Wi-Fi — LAN. Bank filiallari, internet — WAN.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'l', label: 'LAN' },
            { id: 'w', label: 'WAN' }
          ],
          tiles: [
            { id: 't1', label: 'Maktab informatika xonasi', bin: 'l' },
            { id: 't2', label: 'Bankning viloyatlardagi filiallari', bin: 'w' },
            { id: 't3', label: 'Uydagi Wi-Fi', bin: 'l' },
            { id: 't4', label: 'Internet', bin: 'w' }
          ]
        }
      }
    },
    {
      id: 'i15q2',
      prompt: 'Kliyent-server yoki peer-to-peer?',
      hint: 'Markaziy server bormi?',
      explanation: 'Kliyent-server: markaziy server, markaziy zaxira, katta tashkilot. Peer-to-peer: server yoʻq, hamma teng, kichik tarmoq.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'c', label: 'Kliyent-server' },
            { id: 'p', label: 'Peer-to-peer' }
          ],
          tiles: [
            { id: 't1', label: 'Markaziy server bor', bin: 'c' },
            { id: 't2', label: 'Hamma kompyuterlar teng', bin: 'p' },
            { id: 't3', label: 'Zaxira nusxa markazda', bin: 'c' },
            { id: 't4', label: 'Har kim oʻzi ulashadi', bin: 'p' },
            { id: 't5', label: 'Katta tashkilot uchun', bin: 'c' },
            { id: 't6', label: 'Arzon, kichik ofis uchun', bin: 'p' }
          ]
        }
      }
    },
    {
      id: 'i15q3',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Ochiq, ichki, hamkorlar, tunnel.',
      explanation: 'Internet — hamma uchun; intranet — faqat xodimlar; ekstranet — hamkorlarga ham; VPN — shifrlangan tunnel.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Internet' }, right: { label: 'hamma uchun ochiq global tarmoq' } },
            { left: { label: 'Intranet' }, right: { label: 'faqat xodimlar uchun ichki tarmoq' } },
            { left: { label: 'Ekstranet' }, right: { label: 'hamkorlarga ham ochilgan qism' } },
            { left: { label: 'VPN' }, right: { label: 'internet ichida shifrlangan tunnel' } }
          ]
        }
      }
    },
    {
      id: 'i15q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Server buzilsa nima boʻladi?',
      explanation: 'Kliyent-serverda server buzilsa, kliyentlar ishlay olmaydi; WAN odatda LAN dan sekin; VPN maʼlumotni shifrlaydi; tarmoqda virus tezroq tarqaladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kliyent-server tarmogʻida server buzilsa, kliyentlar ham qiynaladi.', value: true },
            { text: 'WAN odatda LAN dan tezroq.', value: false },
            { text: 'VPN orqali yuborilgan maʼlumot shifrlanadi.', value: true },
            { text: 'Tarmoqda virus tarqalmaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i15q5',
      prompt: 'Holatga mos yechimni juftlang.',
      hint: 'Kim, qayerdan, kimga?',
      explanation: 'Uydan idoraga xavfsiz — VPN; 3 ta kompyuterli kichik ofis — peer-to-peer; 500 xodimli kompaniya — kliyent-server; yetkazib beruvchilar buyurtmani koʻradi — ekstranet.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Xodim uydan idora fayllariga kiradi' }, right: { label: 'VPN' } },
            { left: { label: '3 ta kompyuterli kichik ofis' }, right: { label: 'peer-to-peer' } },
            { left: { label: '500 xodimli kompaniya' }, right: { label: 'kliyent-server' } },
            { left: { label: 'Yetkazib beruvchilar buyurtmani koʻradi' }, right: { label: 'ekstranet' } }
          ]
        }
      }
    },
    {
      id: 'i15q6',
      prompt: 'Tarmoqning afzalliklarini bosing.',
      hint: 'Nimani birga ishlatish mumkin?',
      explanation: 'Umumiy printer, markaziy zaxira va dasturlarni bir joydan yangilash — afzallik. Virus tez tarqalishi va qimmat uskunalar — kamchilik.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Bitta printerni hamma ishlatadi', match: true },
            { id: 'b', text: 'Markaziy zaxira nusxa', match: true },
            { id: 'c', text: 'Dasturlarni bir joydan yangilash', match: true },
            { id: 'd', text: 'Virus tez tarqaladi', match: false },
            { id: 'e', text: 'Uskunalar qimmat', match: false }
          ]
        }
      }
    },
    {
      id: 'i15q7',
      prompt: 'Qaysi biri tarmoq turi emas?',
      hint: 'Uchtasi — tarmoq qisqartmasi.',
      explanation: 'LAN, WAN, WLAN — tarmoq turlari. CPU — protsessor.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'LAN' }, { text: 'WAN' }, { text: 'WLAN' }, { text: 'CPU', odd: true }] } }
    },
    {
      id: 'i15q8',
      prompt: 'Kompyuter 1 dan printerga chop etish soʻrovi yoʻlini tartiblang.',
      hint: 'Kommutator orqali.',
      explanation: 'Kompyuter soʻrov yuboradi ➜ kabel orqali kommutatorga keladi ➜ kommutator uni printerga yoʻnaltiradi ➜ printer chop etadi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Kompyuter 1 «Chop etish»ni yuboradi', 'Soʻrov kommutatorga keladi', 'Kommutator uni printerga yoʻnaltiradi', 'Printer sahifani chiqaradi'] }
      }
    },
    {
      id: 'i15q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Lokal va global.',
      explanation: 'Bitta binodagi tarmoq — LAN, davlatlarni bogʻlovchi — WAN.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Bitta binodagi tarmoq —' }, { blank: 'LAN' }, { text: ', davlatlarni bogʻlovchi tarmoq —' }, { blank: 'WAN' }, { text: '.' }],
          bank: ['LAN', 'WAN', 'VPN']
        }
      }
    },
    {
      id: 'i15q10',
      prompt: 'Virtual xususiy tarmoqning qisqa nomini yozing.',
      hint: 'Virtual Private Network',
      explanation: 'VPN — Virtual Private Network.',
      widget: { type: 'text_answer', props: { answer: 'VPN', width: 5 } }
    }
  ]
};
