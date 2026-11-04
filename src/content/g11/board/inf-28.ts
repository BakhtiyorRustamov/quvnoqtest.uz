import type { BoardLesson } from './types';

/** Darslik: 9.01 — normallashtirish (1NF, 2NF, 3NF) va maʼlumotlar lugʻati. */
export const INF_28: BoardLesson = {
  n: 28,
  label: '28',
  part: 10,
  title: 'Normallashtirish va maʼlumotlar lugʻati',
  section: '9.01',
  steps: [
    {
      kind: 'hook',
      say: "Onlayn doʻkon buyurtmalarni shunday yozgan: bitta qatorda buyurtma raqami, mijoz ismi, telefoni va bir katakda vergul bilan bir nechta mahsulot. Muammo koʻp: «Non» sotib olganlarni qidirish qiyin, mijoz telefonini oʻzgartirsa, hamma buyurtmalarda tuzatish kerak. Bunday jadval normallashtirilmagan. Normallashtirish — jadvallarni bosqichma-bosqich toʻgʻri tuzish usuli.",
      easy: "Bitta katakda bir nechta qiymat va takrorlangan mijoz maʼlumoti — notoʻgʻri tuzilgan jadval. Normallashtirish uni tartibga soladi.",
      draw: [],
      animTitle: 'Normallashtirilmagan jadval',
      anim: {
        type: 'db',
        tables: [
          {
            name: 'Buyurtmalar',
            cols: ['BuyurtmaID', 'Mijoz', 'Telefon', 'Mahsulotlar'],
            rows: [['B1', 'Aziza', '90 111 22 33', 'Olma, Non, Sut'], ['B2', 'Bekzod', '93 444 55 66', 'Non'], ['B3', 'Aziza', '90 111 22 33', 'Sut, Anor']]
          }
        ],
        query: { table: 'Buyurtmalar', label: 'Muammo: takrorlanish va bir katakda koʻp qiymat', keep: [0, 2] }
      },
      next: 'Qanday tuzatamiz?'
    },
    {
      kind: 'explain',
      say: "Birinchi normal shakl — 1NF. Qoidalari: har bir katakda faqat bitta qiymat; takrorlanuvchi guruhlar yoʻq; har bir yozuvni birlamchi kalit aniqlaydi. Mahsulotlarni alohida qatorlarga ajratamiz: endi har bir qator — bitta buyurtmadagi bitta mahsulot. Kalit — buyurtma raqami va mahsulot birga, yaʼni murakkab kalit.",
      easy: "1NF: bir katak — bir qiymat. Har bir mahsulot alohida qatorga chiqadi, kalit — buyurtma + mahsulot.",
      draw: [],
      animTitle: '1NF',
      anim: {
        type: 'db',
        tables: [
          {
            name: 'Buyurtmalar (1NF)',
            cols: ['BuyurtmaID', 'Mahsulot', 'Mijoz', 'Telefon'],
            rows: [['B1', 'Olma', 'Aziza', '90 111 22 33'], ['B1', 'Non', 'Aziza', '90 111 22 33'], ['B1', 'Sut', 'Aziza', '90 111 22 33'], ['B2', 'Non', 'Bekzod', '93 444 55 66']]
          }
        ]
      },
      next: 'Lekin Aziza takrorlanyapti-ku?'
    },
    {
      kind: 'explain',
      say: "Toʻgʻri, 1NF da mijoz maʼlumoti hali takrorlanadi. Ikkinchi normal shakl — 2NF: jadval 1NF da boʻlishi va hech bir maydon murakkab kalitning faqat bir qismiga bogʻliq boʻlmasligi kerak. Mijoz va telefon faqat buyurtma raqamiga bogʻliq, mahsulotga emas. Shuning uchun jadvalni ikkiga ajratamiz: Buyurtmalar — buyurtma va mijoz; Buyurtma tarkibi — buyurtma va mahsulot.",
      easy: "2NF: kalitning faqat yarmiga bogʻliq maydonlarni alohida jadvalga chiqaramiz.",
      draw: [],
      animTitle: '2NF',
      anim: {
        type: 'erd',
        entities: [
          { id: 'b', name: 'Buyurtmalar', fields: ['BuyurtmaID', 'Mijoz', 'Telefon'], key: 'BuyurtmaID', x: 4, y: 6 },
          { id: 't', name: 'Buyurtma tarkibi', fields: ['BuyurtmaID', 'Mahsulot'], fk: ['BuyurtmaID'], x: 64, y: 6 }
        ],
        rels: [{ from: 'b', to: 't', kind: '1-M' }]
      },
      next: '3NF-chi?'
    },
    {
      kind: 'explain',
      say: "Uchinchi normal shakl — 3NF: jadval 2NF da boʻlishi va kalit boʻlmagan maydon boshqa kalit boʻlmagan maydonga bogʻliq boʻlmasligi kerak. Buyurtmalar jadvalida telefon buyurtmaga emas, mijozga bogʻliq. Aziza har buyurtmada yana yoziladi. Mijozlarni alohida jadvalga chiqaramiz — endi har bir mijoz bir marta yoziladi, buyurtmada esa faqat uning ID si turadi.",
      easy: "3NF: kalitga emas, boshqa maydonga bogʻliq maʼlumotni (telefon mijozga bogʻliq) alohida jadvalga chiqaramiz.",
      draw: [],
      animTitle: '3NF',
      anim: {
        type: 'erd',
        entities: [
          { id: 'm', name: 'Mijozlar', fields: ['MijozID', 'Ism', 'Telefon'], key: 'MijozID', x: 2, y: 4 },
          { id: 'b', name: 'Buyurtmalar', fields: ['BuyurtmaID', 'MijozID', 'Sana'], key: 'BuyurtmaID', fk: ['MijozID'], x: 36, y: 34 },
          { id: 't', name: 'Tarkib', fields: ['BuyurtmaID', 'Mahsulot', 'Soni'], fk: ['BuyurtmaID'], x: 70, y: 4 }
        ],
        rels: [
          { from: 'm', to: 'b', kind: '1-M' },
          { from: 'b', to: 't', kind: '1-M' }
        ]
      },
      next: 'Maʼlumotlar lugʻati nima?'
    },
    {
      kind: 'example',
      say: "Maʼlumotlar lugʻati — baza haqidagi maʼlumot: har bir jadval va maydonning tavsifi. Unda maydon nomi, maʼlumot turi, uzunligi, formati, validatsiya qoidasi, kalitmi yoki yoʻqmi va izoh yoziladi. Dasturchilar va yangi xodimlar bazani tushunishi, toʻgʻri ishlatishi uchun juda muhim.",
      easy: "Maʼlumotlar lugʻati — har bir maydonning «pasporti»: nomi, turi, uzunligi, qoidasi, izohi.",
      draw: [],
      animTitle: 'Maʼlumotlar lugʻati: Mijozlar',
      anim: {
        type: 'db',
        tables: [
          {
            name: 'Maʼlumotlar lugʻati',
            cols: ['Maydon', 'Turi', 'Uzunlik', 'Qoida', 'Kalit'],
            rows: [['MijozID', 'matn', 4, 'M + 3 raqam', 'birlamchi'], ['Ism', 'matn', 30, 'boʻsh emas', '—'], ['Telefon', 'matn', 12, '9 raqam', '—'], ['TugʻilganSana', 'sana', 10, 'KK.OO.YYYY', '—']]
          }
        ]
      },
      next: 'Foydasi va kamchiligi?'
    },
    {
      kind: 'explain',
      say: "Normallashtirishning afzalliklari: takrorlanish yoʻqoladi va joy tejaladi; maʼlumot bir joyda yangilanadi, shuning uchun qarama-qarshilik boʻlmaydi; bazani kengaytirish oson. Kamchiliklari: jadvallar koʻpayadi, soʻrovlar murakkablashadi va koʻp jadvalni birlashtirish katta bazalarda sekinroq ishlashi mumkin.",
      easy: "Yaxshi tomoni — takrorlanish yoʻq, yangilash oson. Yomon tomoni — jadvallar koʻp, soʻrovlar murakkab.",
      draw: [],
      animTitle: 'Afzallik va kamchilik',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Afzalliklari', items: ['Takrorlanish yoʻq', 'Joy tejaladi', 'Bir joyda yangilanadi', 'Kengaytirish oson'] },
        right: { icon: '👎', title: 'Kamchiliklari', items: ['Jadvallar koʻpayadi', 'Soʻrovlar murakkab', 'Birlashtirish sekinroq', 'Loyihalash vaqt oladi'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Normallashtirish — jadvallarni takrorlanishsiz va toʻgʻri bogʻliqlik bilan tuzish.',
    '1NF: bir katak — bir qiymat, takrorlanuvchi guruh yoʻq, birlamchi kalit bor.',
    '2NF: 1NF + hech bir maydon murakkab kalitning faqat bir qismiga bogʻliq emas.',
    '3NF: 2NF + kalit boʻlmagan maydon boshqa kalit boʻlmagan maydonga bogʻliq emas.',
    'Maʼlumotlar lugʻati: maydon nomi, turi, uzunligi, formati, validatsiya qoidasi, kaliti va izohi.'
  ],
  questions: [
    {
      id: 'i28q1',
      prompt: 'Normal shaklni qoidasi bilan juftlang.',
      hint: 'Bitta qiymat, kalitning qismi, boshqa maydon.',
      explanation: '1NF — bir katak bir qiymat; 2NF — kalitning faqat qismiga bogʻliqlik yoʻq; 3NF — kalit boʻlmagan maydonlar orasida bogʻliqlik yoʻq.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: '1NF' }, right: { label: 'bir katakda faqat bitta qiymat' } },
            { left: { label: '2NF' }, right: { label: 'kalitning yarmiga bogʻliq maydon yoʻq' } },
            { left: { label: '3NF' }, right: { label: 'maydon boshqa oddiy maydonga bogʻliq emas' } }
          ]
        }
      }
    },
    {
      id: 'i28q2',
      prompt: 'Normallashtirish bosqichlarini tartiblang.',
      hint: 'Normallashtirilmagandan 3NF gacha.',
      explanation: 'Normallashtirilmagan ➜ 1NF ➜ 2NF ➜ 3NF.',
      widget: { type: 'step_order', props: { steps: ['Normallashtirilmagan jadval', '1NF', '2NF', '3NF'] } }
    },
    {
      id: 'i28q3',
      prompt: 'Qaysi qator 1NF qoidasini buzadi?',
      hint: 'Bitta katakda bir nechta qiymat.',
      explanation: '«Telefonlar: 90 111…, 93 444…» — bir katakda ikki qiymat. Qolganlari bitta qiymatli.',
      widget: {
        type: 'odd_one_out',
        props: { tiles: [{ text: 'Ism: Aziza' }, { text: 'Sinf: 10-A' }, { text: 'Tugʻilgan yil: 2009' }, { text: 'Telefonlar: 90 111…, 93 444…', odd: true }] }
      }
    },
    {
      id: 'i28q4',
      prompt: 'Jadval: (OquvchiID, Ism, Sinf, SinfRahbari). SinfRahbari qaysi maydonga bogʻliq? (Bir soʻz)',
      hint: 'Rahbar oʻquvchiga emas, … ga bogʻliq.',
      explanation: 'Sinf rahbari sinfga bogʻliq — bu 3NF ni buzadi, Sinflar jadvaliga chiqariladi.',
      widget: { type: 'text_answer', props: { answer: ['Sinf', 'sinfga'], width: 7 } }
    },
    {
      id: 'i28q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Normallashtirish nimani kamaytiradi?',
      explanation: 'Normallashtirish takrorlanishni kamaytiradi; jadvallar soni koʻpayadi; 3NF jadvali 2NF qoidalariga ham mos; lugʻat maydonlarni tavsiflaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Normallashtirish maʼlumot takrorlanishini kamaytiradi.', value: true },
            { text: 'Normallashtirishdan keyin jadvallar soni kamayadi.', value: false },
            { text: '3NF dagi jadval 2NF qoidalariga ham mos keladi.', value: true },
            { text: 'Maʼlumotlar lugʻatida faqat jadval nomlari yoziladi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i28q6',
      prompt: 'Maʼlumotlar lugʻatida nimalar boʻladi? Bosing.',
      hint: 'Maydonning «pasporti».',
      explanation: 'Maydon nomi, turi, uzunligi va validatsiya qoidasi — lugʻatda. Mijozning parol va karta raqami — lugʻat maʼlumoti emas.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Maydon nomi', match: true },
            { id: 'b', text: 'Maʼlumot turi', match: true },
            { id: 'c', text: 'Uzunlik', match: true },
            { id: 'd', text: 'Validatsiya qoidasi', match: true },
            { id: 'e', text: 'Mijozning karta raqami', match: false }
          ]
        }
      }
    },
    {
      id: 'i28q7',
      prompt: 'Afzallik yoki kamchilik?',
      hint: 'Normallashtirishdan keyin nima oʻzgaradi?',
      explanation: 'Takrorlanish yoʻqligi, bir joyda yangilash — afzallik. Jadvallar koʻpligi va murakkab soʻrovlar — kamchilik.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'a', label: 'Afzallik' },
            { id: 'k', label: 'Kamchilik' }
          ],
          tiles: [
            { id: 't1', label: 'Takrorlanish yoʻq', bin: 'a' },
            { id: 't2', label: 'Jadvallar koʻpayadi', bin: 'k' },
            { id: 't3', label: 'Bir joyda yangilanadi', bin: 'a' },
            { id: 't4', label: 'Soʻrovlar murakkablashadi', bin: 'k' }
          ]
        }
      }
    },
    {
      id: 'i28q8',
      prompt: 'Buyurtma B1 da 3 ta mahsulot bor. 1NF ga keltirilganda B1 uchun nechta qator boʻladi?',
      hint: 'Har bir mahsulot — alohida qator.',
      explanation: '3 ta mahsulot — 3 ta qator.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'qator' } }
    },
    {
      id: 'i28q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: '3NF da mijozlar qayerga chiqadi?',
      explanation: '3NF da mijoz maʼlumoti alohida Mijozlar jadvalida, buyurtmada esa faqat MijozID — tashqi kalit.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Mijoz maʼlumotlari alohida' }, { blank: 'Mijozlar' }, { text: 'jadvaliga chiqariladi, Buyurtmalarda esa faqat MijozID —' }, { blank: 'tashqi' }, { text: 'kalit qoladi.' }],
          bank: ['Mijozlar', 'tashqi', 'birlamchi', 'Tarkib']
        }
      }
    },
    {
      id: 'i28q10',
      prompt: 'Baza maydonlari tavsiflangan hujjat nima deyiladi? (Ikki soʻz)',
      hint: 'Maʼlumotlar …',
      explanation: 'Maʼlumotlar lugʻati.',
      widget: { type: 'text_answer', props: { before: 'Maʼlumotlar', answer: ['lugʻati', "lug'ati", 'lug‘ati', 'lugʻat'], width: 8 } }
    }
  ]
};
