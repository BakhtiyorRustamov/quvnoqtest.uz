import type { BoardLesson } from './types';

/** Darslik: 13.01 — bit tezligi, oʻtkazish polosasi, striming va bufer, paketli va kanalli kommutatsiya, protokollar (TCP/IP, HTTP, FTP, SMTP, POP, IMAP). */
export const INF_36: BoardLesson = {
  n: 36,
  label: '36',
  part: 11,
  title: 'Bit tezligi, oʻtkazish va protokollar',
  section: '13.01',
  steps: [
    {
      kind: 'hook',
      say: "Nega musiqa sekin internetda ham bemalol eshitiladi, 4K film esa qotib qoladi? Har xil maʼlumot har xil bit tezligi talab qiladi. Bit tezligi — bir soniyada uzatiladigan bitlar soni. Musiqaga soniyasiga taxminan 0,13 megabit yetadi, oddiy videoga 3, Full HD ga 5, 4K ga esa 25 megabit atrofida kerak.",
      easy: "Har bir xizmatga kerakli tezlik har xil: musiqa — juda oz, 4K video — juda koʻp.",
      draw: [],
      animTitle: 'Kerakli bit tezligi (Mbit/s, taxminan)',
      anim: { type: 'chart', kind: 'bar', labels: ['Musiqa', 'SD video', 'Full HD', '4K'], values: [0.13, 3, 5, 25], unit: 'Mbit/s' },
      next: 'Polosa kengligi nima?'
    },
    {
      kind: 'explain',
      say: "Oʻtkazish polosasi kengligi — liniya bir soniyada uzata oladigan eng koʻp maʼlumot: quvurning kengligi kabi. Bit tezligi esa hozir haqiqatda uzatilayotgan maʼlumot — quvurdan oqayotgan suv. Masalan, liniya 100 megabit, lekin uni oilada toʻrt kishi birga ishlatsa, har biriga kamroq tegadi. Optik tolaning polosasi juda keng, shuning uchun u bir vaqtda koʻp foydalanuvchiga xizmat qiladi.",
      easy: "Polosa — quvurning kengligi. Bit tezligi — quvurdan hozir oqayotgan suv. Foydalanuvchi koʻp boʻlsa, har biriga kam tegadi.",
      draw: [],
      animTitle: 'Polosa va bit tezligi',
      anim: {
        type: 'sheet',
        cols: ['Liniya, Mbit/s', 'Foydalanuvchi', 'Har biriga'],
        rows: [
          [100, 1, ''],
          [100, 4, ''],
          [100, 20, '']
        ],
        steps: [
          { cell: 'C2', formula: '=A2/B2', refs: ['A2', 'B2'], result: 100 },
          { cell: 'C3', formula: '=A3/B3', refs: ['A3', 'B3'], result: 25 },
          { cell: 'C4', formula: '=A4/B4', refs: ['A4', 'B4'], result: 5 }
        ]
      },
      next: 'Video nega qotadi?'
    },
    {
      kind: 'example',
      say: "Striming — faylni toʻliq yuklamasdan koʻrish yoki tinglash. Pleyer avval bir necha soniyalik kadrlarni buferga — vaqtinchalik xotiraga yuklaydi va shundan keyin ijro boshlaydi. Ijro paytida bufer orqadan toʻldirilib turiladi. Agar internet tezligi videoning bit tezligidan past boʻlsa, bufer boʻshab qoladi va video qotadi — aylanayotgan doirachani koʻrasiz.",
      easy: "Bufer — oldindan yuklangan zaxira. Internet sekin boʻlsa, zaxira tugaydi va video qotadi.",
      draw: [],
      animTitle: 'Striming va bufer',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🗄️', label: 'Server' },
          { icon: '📦', label: 'Paketlar' },
          { icon: '🧺', label: 'Bufer' },
          { icon: '▶️', label: 'Ijro' }
        ],
        items: [
          { texts: ['film, 5 Mbit/s', 'internet 20 Mbit/s', 'toʻlib turadi', 'silliq ✓'] },
          { texts: ['film, 5 Mbit/s', 'internet 2 Mbit/s', 'boʻshab qoladi', 'qotadi ⏳'] }
        ]
      },
      next: 'Paketlar qanday yuradi?'
    },
    {
      kind: 'example',
      say: "Internetda paketli kommutatsiya ishlatiladi: xabar mayda paketlarga boʻlinadi, har biri raqamlanadi va har xil yoʻl bilan ketishi mumkin. Routerlar har bir paketni oʻsha paytdagi eng boʻsh yoʻlga yuboradi. Qabul qiluvchida paketlar raqami boʻyicha qayta yigʻiladi, yoʻqolgani qayta soʻraladi. Eski telefon tarmogʻidagi kanalli kommutatsiyada esa suhbat davomida bitta yoʻl band qilib qoʻyilardi.",
      easy: "Xabar paketlarga boʻlinadi, har biri oʻz yoʻlidan ketadi, oxirida raqam boʻyicha yigʻiladi.",
      draw: [],
      animTitle: 'Paketli kommutatsiya',
      anim: {
        type: 'net',
        nodes: [
          { id: 'a', x: 8, y: 30, icon: '💻', label: 'Yuboruvchi' },
          { id: 'r1', x: 36, y: 10, icon: '🛣️', label: 'Router 1' },
          { id: 'r2', x: 36, y: 50, icon: '🛣️', label: 'Router 2' },
          { id: 'r3', x: 64, y: 30, icon: '🛣️', label: 'Router 3' },
          { id: 'b', x: 92, y: 30, icon: '🖥️', label: 'Qabul qiluvchi' }
        ],
        links: [
          ['a', 'r1'],
          ['a', 'r2'],
          ['r1', 'r3'],
          ['r2', 'r3'],
          ['r1', 'b'],
          ['r3', 'b']
        ],
        packets: [
          { path: ['a', 'r1', 'b'], label: '1/3', color: '#0ea5e9' },
          { path: ['a', 'r2', 'r3', 'b'], label: '2/3', color: '#8b5cf6' },
          { path: ['a', 'r1', 'r3', 'b'], label: '3/3', color: '#f59e0b' }
        ]
      },
      next: 'Bu qoidalar nima deyiladi?'
    },
    {
      kind: 'explain',
      say: "Qurilmalar bir-birini tushunishi uchun umumiy qoidalar — protokollar kerak. TCP/IP — internetning asosiy protokoli: TCP xabarni paketlarga boʻlib, yetib kelganini tekshiradi, IP esa paketni IP manzil boʻyicha yetkazadi. HTTP va HTTPS — veb-sahifalar uchun. FTP — fayllarni serverga yuklash va yuklab olish. SMTP — elektron xat yuborish. POP — xatni serverdan qurilmaga yuklab oladi, IMAP — xatlarni serverda saqlab, hamma qurilmada bir xil koʻrsatadi.",
      easy: "Protokol — aloqa qoidasi. TCP/IP — internet, HTTP — sahifalar, FTP — fayllar, SMTP — xat yuborish, POP va IMAP — xat olish.",
      draw: [],
      animTitle: 'Protokollar',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '📦', title: 'TCP/IP', text: 'Paketlarga boʻlish va yetkazish' },
          { icon: '🌐', title: 'HTTP / HTTPS', text: 'Veb-sahifalar (S — xavfsiz)' },
          { icon: '📁', title: 'FTP', text: 'Fayllarni yuklash va olish' },
          { icon: '📤', title: 'SMTP', text: 'Elektron xat yuborish' },
          { icon: '📥', title: 'POP', text: 'Xatni qurilmaga yuklab olish' },
          { icon: '🔄', title: 'IMAP', text: 'Xat serverda, hamma qurilmada bir xil' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Bit tezligi — bir soniyada uzatiladigan bitlar soni; polosa kengligi — liniyaning eng katta imkoniyati.',
    'Striming — toʻliq yuklamasdan ijro; bufer oldindan kadrlarni saqlaydi, tezlik past boʻlsa video qotadi.',
    'Paketli kommutatsiya: xabar raqamlangan paketlarga boʻlinadi, har xil yoʻldan borib, qayta yigʻiladi.',
    'Protokollar: TCP/IP (internet), HTTP/HTTPS (veb), FTP (fayllar), SMTP (xat yuborish), POP va IMAP (xat olish).'
  ],
  questions: [
    {
      id: 'i36q1',
      prompt: 'Protokolni vazifasi bilan juftlang.',
      hint: 'Veb, fayl, xat yuborish, xat olish.',
      explanation: 'HTTPS — xavfsiz veb-sahifalar; FTP — fayllar; SMTP — xat yuborish; IMAP — xatlarni serverda saqlab, sinxron koʻrsatish.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'HTTPS' }, right: { label: 'xavfsiz veb-sahifalar' } },
            { left: { label: 'FTP' }, right: { label: 'fayllarni serverga yuklash' } },
            { left: { label: 'SMTP' }, right: { label: 'elektron xat yuborish' } },
            { left: { label: 'IMAP' }, right: { label: 'xatlar serverda, hamma qurilmada bir xil' } }
          ]
        }
      }
    },
    {
      id: 'i36q2',
      prompt: 'Liniya 60 Mbit/s, uni 4 kishi bir xil ishlatyapti. Har biriga necha Mbit/s tegadi?',
      hint: '60 : 4',
      explanation: '60 : 4 = 15 Mbit/s.',
      widget: { type: 'number_answer', props: { answer: 15, unit: 'Mbit/s' } }
    },
    {
      id: 'i36q3',
      prompt: 'Video 5 Mbit/s talab qiladi. Qaysi internet tezliklarida u qotmasdan ijro etiladi?',
      hint: 'Tezlik ≥ 5 boʻlsin.',
      explanation: '8, 20 va 100 Mbit/s — yetarli. 2 va 4 Mbit/s — bufer boʻshab, video qotadi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: '8 Mbit/s', match: true },
            { id: 'b', text: '20 Mbit/s', match: true },
            { id: 'c', text: '100 Mbit/s', match: true },
            { id: 'd', text: '2 Mbit/s', match: false },
            { id: 'e', text: '4 Mbit/s', match: false }
          ]
        }
      }
    },
    {
      id: 'i36q4',
      prompt: 'Paketli kommutatsiya bosqichlarini tartiblang.',
      hint: 'Boʻlishdan yigʻishgacha.',
      explanation: 'Xabar paketlarga boʻlinadi ➜ raqamlanadi ➜ har xil yoʻldan yuboriladi ➜ raqam boʻyicha yigʻiladi.',
      widget: { type: 'step_order', props: { steps: ['Xabar paketlarga boʻlinadi', 'Har bir paket raqamlanadi', 'Paketlar har xil yoʻldan ketadi', 'Raqam boʻyicha qayta yigʻiladi'] } }
    },
    {
      id: 'i36q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'POP va IMAP farqi.',
      explanation: 'POP xatni qurilmaga yuklab oladi, IMAP serverda saqlaydi; bufer — vaqtinchalik xotira; paketlar har xil yoʻldan borishi mumkin; TCP yetib kelganini tekshiradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'IMAP xatlarni serverda saqlaydi, shuning uchun telefon va kompyuterda bir xil.', value: true },
            { text: 'Bufer — doimiy xotira.', value: false },
            { text: 'Bitta xabarning paketlari har xil yoʻldan borishi mumkin.', value: true },
            { text: 'TCP paketlar yetib kelganini tekshirmaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i36q6',
      prompt: 'Polosa kengligi yoki bit tezligi?',
      hint: 'Quvur kengligi yoki oqayotgan suv?',
      explanation: 'Liniyaning eng katta imkoniyati — polosa kengligi. Hozir haqiqatda uzatilayotgani — bit tezligi.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'p', label: 'Polosa kengligi' },
            { id: 'b', label: 'Bit tezligi' }
          ],
          tiles: [
            { id: 't1', label: 'Liniyaning eng katta imkoniyati', bin: 'p' },
            { id: 't2', label: 'Hozir uzatilayotgan maʼlumot', bin: 'b' },
            { id: 't3', label: '«Quvurning kengligi»', bin: 'p' },
            { id: 't4', label: '«Oqayotgan suv»', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'i36q7',
      prompt: 'Qaysi biri elektron pochta protokoli emas?',
      hint: 'Uchtasi xat bilan ishlaydi.',
      explanation: 'SMTP, POP, IMAP — pochta protokollari. FTP — fayllar uchun.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'SMTP' }, { text: 'POP' }, { text: 'IMAP' }, { text: 'FTP', odd: true }] } }
    },
    {
      id: 'i36q8',
      prompt: '8 000 megabitlik fayl 40 Mbit/s tezlikda necha soniyada yuklanadi?',
      hint: 'Hajmni tezlikka boʻling.',
      explanation: '8 000 : 40 = 200 soniya.',
      widget: { type: 'number_answer', props: { answer: 200, unit: 'soniya' } }
    },
    {
      id: 'i36q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'TCP va IP vazifasi.',
      explanation: 'TCP xabarni paketlarga boʻladi, IP esa paketni manzilga yetkazadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ blank: 'TCP' }, { text: 'xabarni paketlarga boʻladi va tekshiradi,' }, { blank: 'IP' }, { text: 'esa paketni manzil boʻyicha yetkazadi.' }],
          bank: ['TCP', 'IP', 'FTP']
        }
      }
    },
    {
      id: 'i36q10',
      prompt: 'Qurilmalar orasidagi aloqa qoidalari toʻplami nima deyiladi? (Bir soʻz)',
      hint: 'TCP/IP, HTTP …',
      explanation: 'Protokol.',
      widget: { type: 'text_answer', props: { answer: ['protokol', 'protokollar'], width: 10 } }
    }
  ]
};
