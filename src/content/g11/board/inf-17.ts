import type { BoardLesson } from './types';

/** Darslik: 6.06 — video va veb-konferensiya: uskunalar, sozlash, tarmoqdan foydalanish, hayotga taʼsiri. */
export const INF_17: BoardLesson = {
  n: 17,
  label: '17',
  part: 10,
  title: 'Video va veb-konferensiya',
  section: '6.06',
  steps: [
    {
      kind: 'hook',
      say: "Toshkentdagi oʻqituvchi Nukus, Termiz va Andijondagi oʻquvchilarga bir vaqtda dars bermoqda. Hamma bir-birini koʻradi va eshitadi. Kamera tasvirni oladi, dastur uni siqib, mayda paketlarga boʻladi, paketlar internet orqali uchadi va qabul qiluvchida yana tasvirga yigʻiladi — hammasi bir soniyaning ulushida.",
      easy: "Kamera va mikrofon yozadi, dastur siqib paketlarga boʻladi, internet yetkazadi, qabul qiluvchida yana video boʻlib yigʻiladi.",
      draw: [],
      animTitle: 'Video qanday yetib boradi',
      anim: {
        type: 'flow',
        stations: [
          { icon: '📷', label: 'Kamera, mikrofon' },
          { icon: '🗜️', label: 'Siqish' },
          { icon: '📦', label: 'Paketlar' },
          { icon: '🖥️', label: 'Qabul qiluvchi' }
        ],
        items: [{ texts: ['tasvir + ovoz', 'hajm 50 marta kichik', 'internet orqali', 'yigʻilib, ochiladi'] }],
        result: 'Paketli kommutatsiya — video ham oddiy maʼlumotdek uzatiladi'
      },
      next: 'Nimalar kerak?'
    },
    {
      kind: 'explain',
      say: "Videokonferensiya uchun kerak: kompyuter yoki noutbuk, veb-kamera, mikrofon, monitor, karnay yoki quloqchin, internetga ulanish va videokonferensiya dasturi. Smartfon va planshetlarda bularning hammasi bitta qurilmada bor. Foydalanuvchi xizmatda roʻyxatdan oʻtadi, boshqa ishtirokchini tanlab qoʻngʻiroq qiladi.",
      easy: "Kamera, mikrofon, ekran, karnay, internet va dastur. Telefonda hammasi tayyor.",
      draw: [],
      animTitle: 'Uskunalar',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '💻', title: 'Kompyuter', text: 'yoki noutbuk, planshet' },
          { icon: '📷', title: 'Veb-kamera', text: 'tasvirni oladi' },
          { icon: '🎤', title: 'Mikrofon', text: 'ovozni oladi' },
          { icon: '🖥️', title: 'Monitor', text: 'boshqalarni koʻrsatadi' },
          { icon: '🎧', title: 'Karnay', text: 'yoki quloqchin' },
          { icon: '🌐', title: 'Internet + dastur', text: 'ulanish va boshqarish' }
        ]
      },
      next: 'Veb-konferensiya-chi?'
    },
    {
      kind: 'explain',
      say: "Videokonferensiya — ikki tomonlama: hamma bir-birini koʻradi va eshitadi, masalan, ish yigʻilishi. Veb-konferensiya koʻpincha bir tomonlama: bitta maʼruzachi koʻp tinglovchiga uzatadi — vebinar, universitet maʼruzasi, mahsulot taqdimoti. Tinglovchiga kamera shart emas, ular chat orqali savol beradi. Veb-konferensiyaga taklif havola va kirish kodi bilan yuboriladi — kod begonalarni kiritmaydi.",
      easy: "Video — hamma bir-birini koʻradi. Veb — bitta odam koʻpchilikka koʻrsatadi, boshqalar chatda yozadi. Kirish kodi begonalarni toʻsadi.",
      draw: [],
      animTitle: 'Video va veb-konferensiya',
      anim: {
        type: 'compare',
        left: { icon: '👥', title: 'Videokonferensiya', items: ['Ikki tomonlama', 'Hamma kamera va mikrofonda', 'Ish yigʻilishi, oilaviy qoʻngʻiroq', 'Kichik guruhlar'] },
        right: { icon: '📢', title: 'Veb-konferensiya', items: ['Koʻpincha bir tomonlama', 'Tinglovchiga kamera shart emas', 'Vebinar, maʼruza, taqdimot', 'Havola va kirish kodi bilan'] }
      },
      next: 'Boshlashdan oldin nima qilinadi?'
    },
    {
      kind: 'example',
      say: "Konferensiyadan oldin tekshiruv qilinadi. Internet barqaror va yetarli tezlikdami? Mikrofon ovozni yaxshi uzatyaptimi — dastur ichida yozib, eshitib koʻrish mumkin. Kamera toʻgʻri joylashganmi va tasvir boshqalarga koʻrinyaptimi? Agar hujjat koʻrsatilsa — u oldindan yuklanganmi va ekran ulashish ishlayaptimi?",
      easy: "Boshlashdan oldin: internet, mikrofon, kamera va koʻrsatiladigan hujjatlarni tekshirib oling.",
      draw: [],
      animTitle: 'Konferensiya oldidan tekshiruv',
      anim: {
        type: 'form',
        title: '🎥 Ulanishdan oldin',
        fields: [
          { label: 'Internet', value: '25 Mbit/s, barqaror', check: 'Tezlik', ok: true, note: 'video uchun yetarli' },
          { label: 'Mikrofon', value: 'ovoz juda past', check: 'Ovoz', ok: false, note: 'sozlamada balandlikni oshiring' },
          { label: 'Kamera', value: 'faqat shift koʻrinyapti', check: 'Tasvir', ok: false, note: 'kamerani yuz balandligiga qoʻying' },
          { label: 'Taqdimot', value: 'oldindan yuklangan', check: 'Hujjat', ok: true, note: 'ekran ulashish tayyor' }
        ]
      },
      next: 'Tezlik qanchalik muhim?'
    },
    {
      kind: 'explain',
      say: "Video juda koʻp maʼlumot, shuning uchun tezlik muhim. Sifat qancha yuqori boʻlsa, shuncha tez aloqa kerak. Uy internetining koʻpchiligi asimmetrik: yuklab olish tezligi yuborish tezligidan ancha katta, chunki odamlar odatda koʻproq yuklab oladi. Videokonferensiyada esa siz ham tasvir yuborasiz — yuborish tezligi past boʻlsa, sizning tasviringiz qotib qoladi. Tashkilot ichida LAN, tashqarida esa WAN yoki internet ishlatiladi.",
      easy: "Video koʻp joy egallaydi. Internet yuklab olishda tez, yuborishda sekinroq boʻladi — shuning uchun baʼzan sizning tasviringiz qotadi.",
      draw: [],
      animTitle: 'Yuklab olish va yuborish',
      anim: {
        type: 'sheet',
        cols: ['Yoʻnalish', 'Mbit/s', 'Video oqim'],
        rows: [
          ['Yuklab olish', 50, ''],
          ['Yuborish', 2, '']
        ],
        steps: [
          { cell: 'C2', formula: '=IF(B2>=4,"HD ✓","past ✗")', refs: ['B2'], result: 'HD ✓' },
          { cell: 'C3', formula: '=IF(B3>=4,"HD ✓","past ✗")', refs: ['B3'], result: 'past ✗' }
        ]
      },
      next: 'Hayotga taʼsiri?'
    },
    {
      kind: 'explain',
      say: "Konferensiyalar hayotimizni oʻzgartirdi. Afzalliklari: safar xarajati va vaqt tejaladi, uzoqdagi mutaxassis bilan maslahatlashish mumkin, masofaviy taʼlim va ish imkoniyati paydo boʻldi, oila aʼzolari uzoqda boʻlsa ham koʻrishib turadi. Kamchiliklari: internet sekin boʻlsa tasvir va ovoz uziladi, turli vaqt mintaqalari noqulay, jonli muloqot va imo-ishoralar kamroq seziladi, xavfsizlik — begona kirib qolishi mumkin.",
      easy: "Yaxshi tomoni — yoʻl va pul tejaladi, uzoqdagilar bilan koʻrishamiz. Yomon tomoni — internet uzilsa qiyin, jonli muloqot oʻrnini toʻliq bosmaydi.",
      draw: [],
      animTitle: 'Afzallik va kamchilik',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Afzalliklari', items: ['Safar vaqti va puli tejaladi', 'Uzoqdagi mutaxassis bilan maslahat', 'Masofaviy taʼlim va ish', 'Oila bilan aloqa'] },
        right: { icon: '👎', title: 'Kamchiliklari', items: ['Sekin internetda uziladi', 'Vaqt mintaqalari farqi', 'Jonli muloqot kamroq', 'Begona kirib qolish xavfi'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Videokonferensiya — ikki tomonlama, hamma koʻradi va eshitadi; veb-konferensiya — koʻpincha bir tomonlama (vebinar).',
    'Kerak: kompyuter, veb-kamera, mikrofon, monitor, karnay, internet va dastur.',
    'Oldindan tekshiruv: internet, mikrofon, kamera, hujjatlar; veb-konferensiyaga havola va kirish kodi bilan kiriladi.',
    'Video paketlarga boʻlinib uzatiladi; yuqori sifat uchun yuqori tezlik, ayniqsa yuborish tezligi kerak.',
    'Afzallik: vaqt va pul tejash, masofaviy ish va taʼlim; kamchilik: uzilishlar, vaqt mintaqalari, jonli muloqot kamligi.'
  ],
  questions: [
    {
      id: 'i17q1',
      prompt: 'Videokonferensiya yoki veb-konferensiya?',
      hint: 'Ikki tomonlamami yoki bitta maʼruzachimi?',
      explanation: 'Jamoa yigʻilishi va oilaviy qoʻngʻiroq — video. Vebinar, onlayn maʼruza va mahsulot taqdimoti — veb.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'v', label: 'Video' },
            { id: 'w', label: 'Veb' }
          ],
          tiles: [
            { id: 't1', label: 'Jamoa yigʻilishi', bin: 'v' },
            { id: 't2', label: '500 kishilik vebinar', bin: 'w' },
            { id: 't3', label: 'Bobom bilan videoqoʻngʻiroq', bin: 'v' },
            { id: 't4', label: 'Universitet onlayn maʼruzasi', bin: 'w' }
          ]
        }
      }
    },
    {
      id: 'i17q2',
      prompt: 'Qurilmani vazifasi bilan juftlang.',
      hint: 'Kim oladi, kim koʻrsatadi?',
      explanation: 'Veb-kamera — tasvirni oladi; mikrofon — ovozni; monitor — boshqalarni koʻrsatadi; karnay — ovozni eshittiradi.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Veb-kamera' }, right: { label: 'tasvirni oladi' } },
            { left: { label: 'Mikrofon' }, right: { label: 'ovozni oladi' } },
            { left: { label: 'Monitor' }, right: { label: 'boshqa ishtirokchini koʻrsatadi' } },
            { left: { label: 'Karnay' }, right: { label: 'ovozni eshittiradi' } }
          ]
        }
      }
    },
    {
      id: 'i17q3',
      prompt: 'Video qanday uzatiladi? Tartiblang.',
      hint: 'Kameradan ekrangacha.',
      explanation: 'Kamera oladi ➜ dastur siqadi ➜ paketlarga boʻlinadi ➜ internet orqali yuboriladi ➜ qabul qiluvchida yigʻilib ochiladi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Kamera va mikrofon tasvir va ovozni oladi', 'Dastur maʼlumotni siqadi', 'Maʼlumot paketlarga boʻlinadi', 'Paketlar internet orqali yuboriladi', 'Qabul qiluvchida yigʻilib ochiladi'] }
      }
    },
    {
      id: 'i17q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Asimmetrik internet nimani bildiradi?',
      explanation: 'Uy internetida yuklab olish odatda yuborishdan tez; veb-konferensiya tinglovchisiga kamera shart emas; kirish kodi begonalarni toʻsadi; yuqori sifatga koʻproq tezlik kerak.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Uy internetida yuborish tezligi odatda yuklab olishdan katta.', value: false },
            { text: 'Vebinar tinglovchisiga veb-kamera shart emas.', value: true },
            { text: 'Kirish kodi begona odamlar kirishining oldini oladi.', value: true },
            { text: 'Video sifati oshsa, kerakli tezlik kamayadi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i17q5',
      prompt: 'Konferensiyadan oldin nimalarni tekshirish kerak? Bosing.',
      hint: 'Texnik tayyorgarlik.',
      explanation: 'Internet, mikrofon, kamera va hujjatlar tekshiriladi. Kiyim rangi va devor qogʻozi texnik tekshiruv emas.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Internet barqarorligi', match: true },
            { id: 'b', text: 'Mikrofon ovozi', match: true },
            { id: 'c', text: 'Kamera joylashuvi', match: true },
            { id: 'd', text: 'Taqdimot yuklanganmi', match: true },
            { id: 'e', text: 'Devor qogʻozining rangi', match: false }
          ]
        }
      }
    },
    {
      id: 'i17q6',
      prompt: 'Afzallik yoki kamchilik?',
      hint: 'Kompaniya va xodim nuqtai nazaridan.',
      explanation: 'Safar xarajati kamayishi va masofaviy taʼlim — afzallik. Internet uzilishi va vaqt mintaqalari farqi — kamchilik.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'a', label: 'Afzallik' },
            { id: 'k', label: 'Kamchilik' }
          ],
          tiles: [
            { id: 't1', label: 'Safar xarajati kamayadi', bin: 'a' },
            { id: 't2', label: 'Internet uzilsa — tasvir qotadi', bin: 'k' },
            { id: 't3', label: 'Masofaviy taʼlim mumkin', bin: 'a' },
            { id: 't4', label: 'Vaqt mintaqalari farqi', bin: 'k' }
          ]
        }
      }
    },
    {
      id: 'i17q7',
      prompt: 'Yuklab olish 60 Mbit/s, yuborish esa undan 20 marta sekin. Yuborish tezligi necha Mbit/s?',
      hint: '60 ni 20 ga boʻling.',
      explanation: '60 : 20 = 3 Mbit/s — shuning uchun sizning tasviringiz qotishi mumkin.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'Mbit/s' } }
    },
    {
      id: 'i17q8',
      prompt: 'Qaysi biri videokonferensiya uchun shart emas?',
      hint: 'Uchtasi tasvir va ovoz bilan bogʻliq.',
      explanation: 'Printer kerak emas. Kamera, mikrofon va internet shart.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Veb-kamera' }, { text: 'Mikrofon' }, { text: 'Internet' }, { text: 'Printer', odd: true }] } }
    },
    {
      id: 'i17q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Ikki tomonlama va bir tomonlama.',
      explanation: 'Hamma bir-birini koʻradigan — videokonferensiya, bitta maʼruzachi koʻpchilikka uzatadigan — veb-konferensiya (vebinar).',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Hamma bir-birini koʻradigan aloqa —' }, { blank: 'videokonferensiya' }, { text: ', bitta maʼruzachi koʻpchilikka uzatadigani —' }, { blank: 'vebinar' }, { text: '.' }],
          bank: ['videokonferensiya', 'vebinar', 'VPN']
        }
      }
    },
    {
      id: 'i17q10',
      prompt: 'Veb-konferensiyaga begonalar kirmasligi uchun taklif bilan birga nima yuboriladi? (Ikki soʻz)',
      hint: 'Kirish …',
      explanation: 'Kirish kodi (parol) — faqat taklif qilinganlar kira oladi.',
      widget: { type: 'text_answer', props: { before: 'Kirish', answer: ['kodi', 'kod', 'paroli', 'parol'], width: 7 } }
    }
  ]
};
