import type { BoardLesson } from './types';

/** Darslik: 9.01 — bogʻlanishlar (1–1, 1–M, M–M), ER-diagramma, bogʻlanish yaxlitligi, maʼlumot kiritish formalari. */
export const INF_26: BoardLesson = {
  n: 26,
  label: '26',
  part: 10,
  title: 'Bogʻlanishlar va ER-diagramma',
  section: '9.01',
  steps: [
    {
      kind: 'hook',
      say: "Kutubxona bazasida uchta jadval: Oʻquvchilar, Kitoblar va Berilgan kitoblar. Ular qanday bogʻlangan? Bir oʻquvchi koʻp marta kitob oladi — demak, Oʻquvchilar va Berilganlar orasida «birga-koʻp» bogʻlanish. Bitta kitob ham vaqt oʻtishi bilan koʻp marta beriladi — yana «birga-koʻp». Buni chizma bilan koʻrsatish — ER-diagramma, yaʼni obyekt va bogʻlanishlar diagrammasi.",
      easy: "ER-diagramma — jadvallar va ular orasidagi bogʻlanishlar chizmasi. 1 — bitta, ∞ — koʻp.",
      draw: [],
      animTitle: 'Kutubxona ER-diagrammasi',
      anim: {
        type: 'erd',
        entities: [
          { id: 'o', name: 'Oʻquvchilar', fields: ['OquvchiID', 'Ism', 'Sinf'], key: 'OquvchiID', x: 2, y: 4 },
          { id: 'b', name: 'Berilgan', fields: ['BerishID', 'OquvchiID', 'KitobID', 'Sana'], key: 'BerishID', fk: ['OquvchiID', 'KitobID'], x: 36, y: 34 },
          { id: 'k', name: 'Kitoblar', fields: ['KitobID', 'Nomi', 'Muallif'], key: 'KitobID', x: 70, y: 4 }
        ],
        rels: [
          { from: 'o', to: 'b', kind: '1-M' },
          { from: 'k', to: 'b', kind: '1-M' }
        ]
      },
      next: 'Qanday bogʻlanishlar bor?'
    },
    {
      kind: 'explain',
      say: "Bogʻlanishlar uch xil. Birga-bir: bitta yozuvga ikkinchi jadvaldan faqat bitta yozuv mos keladi — har bir oʻquvchining bitta shkafi. Birga-koʻp: bitta yozuvga koʻp yozuv — bitta sinfda koʻp oʻquvchi. Bu eng koʻp uchraydigan bogʻlanish. Koʻpga-koʻp: har ikki tomonda koʻp — bir oʻquvchi koʻp toʻgarakka, bir toʻgarakda koʻp oʻquvchi.",
      easy: "1–1: oʻquvchi va uning shkafi. 1–M: sinf va oʻquvchilar. M–M: oʻquvchilar va toʻgaraklar.",
      draw: [],
      animTitle: 'Bogʻlanish turlari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '1️⃣', title: 'Birga-bir (1–1)', text: 'Oʻquvchi ➜ uning shkafi' },
          { icon: '🔱', title: 'Birga-koʻp (1–M)', text: 'Sinf ➜ koʻp oʻquvchi' },
          { icon: '🕸️', title: 'Koʻpga-koʻp (M–M)', text: 'Oʻquvchilar ⇄ toʻgaraklar' }
        ]
      },
      next: 'M–M qanday saqlanadi?'
    },
    {
      kind: 'example',
      say: "Bogʻlangan bazada koʻpga-koʻp bogʻlanishni toʻgʻridan-toʻgʻri saqlab boʻlmaydi. Uni oraliq jadval orqali ikkita birga-koʻp bogʻlanishga ajratamiz. Oʻquvchilar va Toʻgaraklar orasiga «Aʼzolik» jadvali qoʻyiladi: unda faqat Oʻquvchi ID va Toʻgarak ID. Har bir qator — «shu oʻquvchi shu toʻgarakda». Bu ikki maydon birga — murakkab kalit.",
      easy: "M–M ni oraliq jadval bilan ikkita 1–M ga boʻlamiz: Oʻquvchilar ➜ Aʼzolik ⬅ Toʻgaraklar.",
      draw: [],
      animTitle: 'M–M ➜ oraliq jadval',
      anim: {
        type: 'erd',
        entities: [
          { id: 'o', name: 'Oʻquvchilar', fields: ['OquvchiID', 'Ism'], key: 'OquvchiID', x: 2, y: 6 },
          { id: 'a', name: 'Aʼzolik', fields: ['OquvchiID', 'ToʻgarakID'], fk: ['OquvchiID', 'ToʻgarakID'], x: 36, y: 30 },
          { id: 't', name: 'Toʻgaraklar', fields: ['ToʻgarakID', 'Nomi', 'Kun'], key: 'ToʻgarakID', x: 70, y: 6 }
        ],
        rels: [
          { from: 'o', to: 'a', kind: '1-M' },
          { from: 't', to: 'a', kind: '1-M' }
        ]
      },
      next: 'Xato bogʻlanishdan qanday saqlanamiz?'
    },
    {
      kind: 'example',
      say: "Bogʻlanish yaxlitligi — tashqi kalit faqat mavjud yozuvga ishora qilishi kerak degan qoida. Kutubxonachi «U07 oʻquvchiga kitob berildi» deb yozmoqchi, lekin bunday oʻquvchi bazada yoʻq — tizim rad etadi. Kitobi qaytarilmagan oʻquvchini oʻchirib boʻlmaydi, aks holda «egasiz» yozuv qoladi. Kuzating: har bir kiritish tekshiriladi.",
      easy: "Tashqi kalit faqat mavjud yozuvga ishora qiladi. Yoʻq oʻquvchiga kitob berib boʻlmaydi, qarzdor oʻquvchini oʻchirib boʻlmaydi.",
      draw: [],
      animTitle: 'Bogʻlanish yaxlitligi',
      anim: {
        type: 'form',
        title: '📚 Kitob berish',
        fields: [
          { label: 'OquvchiID', value: 'U03', check: 'Oʻquvchilar jadvalida bormi', ok: true, note: 'bor — Malika, 10-A' },
          { label: 'KitobID', value: 'K002', check: 'Kitoblar jadvalida bormi', ok: true, note: 'bor — «Kecha va kunduz»' },
          { label: 'OquvchiID', value: 'U07', check: 'Oʻquvchilar jadvalida bormi', ok: false, note: 'bunday oʻquvchi yoʻq — rad etildi' },
          { label: 'Oʻchirish', value: 'U03', check: 'Berilgan kitobi bormi', ok: false, note: 'qarzi bor — oʻchirib boʻlmaydi' }
        ]
      },
      next: 'Maʼlumot qanday kiritiladi?'
    },
    {
      kind: 'explain',
      say: "Maʼlumotni qulay va xatosiz kiritish uchun forma yaratiladi. Yaxshi formada: har bir maydonning tushunarli yorligʻi; tanlov uchun ochiladigan roʻyxat — masalan, sinflar; ha yoki yoʻq uchun belgilash katagi; validatsiya qoidalari; oldingi, keyingi, saqlash tugmalari; va ortiqcha narsalarsiz, mantiqiy tartibdagi joylashuv. Hisobot esa aksincha — maʼlumotni chiroyli chop etish yoki koʻrsatish uchun.",
      easy: "Forma — maʼlumot kiritish oynasi: yorliqlar, roʻyxatlar, tugmalar va tekshiruvlar bilan. Hisobot — natijani koʻrsatish uchun.",
      draw: [],
      animTitle: 'Yaxshi forma',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🏷️', title: 'Yorliqlar', text: 'Har maydon nimani soʻrashi aniq' },
          { icon: '🔽', title: 'Ochiladigan roʻyxat', text: 'Sinf, toʻgarak — tanlab olinadi' },
          { icon: '☑️', title: 'Belgilash katagi', text: 'Ha / yoʻq qiymatlar uchun' },
          { icon: '✅', title: 'Validatsiya', text: 'Notoʻgʻri qiymat rad etiladi' },
          { icon: '⏭️', title: 'Tugmalar', text: 'Oldingi, keyingi, saqlash' },
          { icon: '📐', title: 'Tartib', text: 'Mantiqiy ketma-ketlik, ortiqchasiz' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Bogʻlanishlar: birga-bir (1–1), birga-koʻp (1–M), koʻpga-koʻp (M–M).',
    'ER-diagramma — jadvallar va bogʻlanishlar chizmasi: 1 — bitta, ∞ — koʻp.',
    'M–M bogʻlanish oraliq jadval orqali ikkita 1–M ga ajratiladi.',
    'Bogʻlanish yaxlitligi: tashqi kalit faqat mavjud yozuvga ishora qiladi.',
    'Forma — maʼlumot kiritish uchun (yorliq, roʻyxat, katak, validatsiya, tugmalar); hisobot — natijani koʻrsatish uchun.'
  ],
  questions: [
    {
      id: 'i26q1',
      prompt: 'Bogʻlanish turini aniqlang.',
      hint: 'Har ikki tomonda nechta?',
      explanation: 'Davlat va poytaxt — 1–1; sinf va oʻquvchilar — 1–M; oʻquvchilar va fanlar — M–M.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Davlat — poytaxt' }, right: { label: 'birga-bir' } },
            { left: { label: 'Sinf — oʻquvchilar' }, right: { label: 'birga-koʻp' } },
            { left: { label: 'Oʻquvchilar — fanlar' }, right: { label: 'koʻpga-koʻp' } }
          ]
        }
      }
    },
    {
      id: 'i26q2',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'M–M bevosita saqlanadimi?',
      explanation: 'M–M oraliq jadval orqali saqlanadi; tashqi kalit mavjud yozuvga ishora qiladi; 1–M eng koʻp uchraydi; forma — kiritish, hisobot — koʻrsatish uchun.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Koʻpga-koʻp bogʻlanish oraliq jadval orqali saqlanadi.', value: true },
            { text: 'Tashqi kalit bazada yoʻq yozuvga ishora qilishi mumkin.', value: false },
            { text: 'Birga-koʻp — eng koʻp uchraydigan bogʻlanish.', value: true },
            { text: 'Hisobot maʼlumot kiritish uchun ishlatiladi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i26q3',
      prompt: 'Bogʻlanish yaxlitligi qaysi amallarni rad etadi? Bosing.',
      hint: 'Mavjud boʻlmagan yozuvga ishora.',
      explanation: 'Yoʻq oʻquvchiga kitob berish va qarzdor oʻquvchini oʻchirish rad etiladi. Mavjud oʻquvchiga mavjud kitob berish va yangi oʻquvchi qoʻshish — ruxsat.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Bazada yoʻq oʻquvchiga kitob berish', match: true },
            { id: 'b', text: 'Kitobi qaytmagan oʻquvchini oʻchirish', match: true },
            { id: 'c', text: 'Mavjud oʻquvchiga mavjud kitobni berish', match: false },
            { id: 'd', text: 'Yangi oʻquvchini qoʻshish', match: false }
          ]
        }
      }
    },
    {
      id: 'i26q4',
      prompt: 'Oʻquvchilar va Toʻgaraklar orasidagi M–M uchun oraliq jadvalda qaysi maydonlar boʻladi?',
      hint: 'Ikkala jadvalning kalitlari.',
      explanation: 'OquvchiID va ToʻgarakID — ikkalasi birga murakkab kalit.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'OquvchiID', match: true },
            { id: 'b', text: 'ToʻgarakID', match: true },
            { id: 'c', text: 'Oʻquvchi telefoni', match: false },
            { id: 'd', text: 'Toʻgarak rahbari ismi', match: false }
          ]
        }
      }
    },
    {
      id: 'i26q5',
      prompt: 'ER-diagrammada «∞» belgisi nimani bildiradi? (Bir soʻz)',
      hint: '1 — bitta, ∞ — …',
      explanation: '∞ — «koʻp» tomoni.',
      widget: { type: 'text_answer', props: { answer: ['koʻp', "ko'p", 'ko‘p'], width: 6 } }
    },
    {
      id: 'i26q6',
      prompt: 'Forma elementini vazifasi bilan juftlang.',
      hint: 'Tanlov, ha/yoʻq, tushuntirish.',
      explanation: 'Ochiladigan roʻyxat — tayyor qiymatdan tanlash; belgilash katagi — ha/yoʻq; yorliq — maydon nomi; tugma — saqlash yoki keyingi yozuv.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Ochiladigan roʻyxat' }, right: { label: 'tayyor qiymatdan tanlash' } },
            { left: { label: 'Belgilash katagi' }, right: { label: 'ha yoki yoʻq' } },
            { left: { label: 'Yorliq' }, right: { label: 'maydon nimani soʻrashi' } },
            { left: { label: 'Tugma' }, right: { label: 'saqlash, keyingi yozuv' } }
          ]
        }
      }
    },
    {
      id: 'i26q7',
      prompt: 'Qaysi biri bogʻlanish turi emas?',
      hint: '1–1, 1–M, M–M.',
      explanation: 'Birga-bir, birga-koʻp, koʻpga-koʻp — bogʻlanish turlari. «Ichma-ich» — IF funksiyasiga tegishli.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Birga-bir' }, { text: 'Birga-koʻp' }, { text: 'Koʻpga-koʻp' }, { text: 'Ichma-ich', odd: true }] } }
    },
    {
      id: 'i26q8',
      prompt: 'Bitta sinfda 28 oʻquvchi, maktabda 15 sinf. Sinflar–Oʻquvchilar jadvallarida «koʻp» tomonda nechta yozuv?',
      hint: 'Oʻquvchilar soni.',
      explanation: '28 × 15 = 420 ta oʻquvchi yozuvi.',
      widget: { type: 'number_answer', props: { answer: 420, unit: 'yozuv' } }
    },
    {
      id: 'i26q9',
      prompt: 'Kitob berish jarayonini tartiblang.',
      hint: 'Avval tekshirish.',
      explanation: 'OquvchiID kiritiladi ➜ bazada borligi tekshiriladi ➜ KitobID kiritiladi va tekshiriladi ➜ yozuv saqlanadi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Formaga OquvchiID kiritiladi', 'Oʻquvchi bazada borligi tekshiriladi', 'KitobID kiritiladi va tekshiriladi', 'Berish yozuvi saqlanadi'] }
      }
    },
    {
      id: 'i26q10',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Kiritish va koʻrsatish.',
      explanation: 'Maʼlumot kiritish uchun forma, chop etish va koʻrsatish uchun hisobot ishlatiladi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Maʼlumot kiritish uchun' }, { blank: 'forma' }, { text: ', natijani chop etish uchun' }, { blank: 'hisobot' }, { text: 'ishlatiladi.' }],
          bank: ['forma', 'hisobot', 'kalit']
        }
      }
    }
  ]
};
