import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 6-mavzu (29–33-betlar) — Boltiqboʻyi davlatlari: mustaqillik, NATO va YIga aʼzolik, «Boltiq yoʻlbarslari», etnik va demografik muammolar. */
export const TARIX_106: BoardLesson = {
  n: 106,
  label: '6',
  group: JH2,
  title: 'Boltiqboʻyi davlatlari',
  section: 'Jahon tarixi, 6-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Boltiqboʻyi davlatlari — Latviya, Litva va Estoniya — mustaqillik uchun SSSRdan oldinroq harakat boshlagan. 1988-yilda Latviya va Estoniyada «Xalq fronti», Litvada «Sayudis» harakati tuzildi. Estoniya 1988-yil 16-noyabrda suverenitet deklaratsiyasini qabul qildi, Litva 1990-yil 11-martda, Latviya esa 4-mayda mustaqillikni eʼlon qildi. Vilnyusda 1991-yil 13-yanvarda televizion minorani himoya qilgan 14 namoyishchi halok boʻldi. Mustaqil boʻlgach, uchala davlat ham 2004-yilda NATO va Yevropa Ittifoqiga aʼzo boʻldi.",
      easy: "1988 — harakatlar tuzildi; 1990 — Litva va Latviya mustaqil; 2004 — NATO va YIga aʼzolik.",
      draw: [
        { t: 'title', text: 'Mustaqillik sari' },
        { t: 'table', x: 4, y: 18, rows: [['davlat', 'harakat', 'mustaqillik'], ['Latviya', '«Xalq fronti»', '1990, 4-may'], ['Litva', '«Sayudis»', '1990, 11-mart'], ['Estoniya', '«Xalq fronti»', '1988: suverenitet']] },
        { t: 'text', x: 4, y: 54, text: '2004 — uchalasi NATO va YIga kirdi', size: 's', color: 'blue' }
      ],
      next: 'Yutuq va muammolar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gʻarb investitsiyalari tufayli bu davlatlar tez rivojlanib, «Boltiq yoʻlbarslari» deb ataldi. Ammo 2008–2009-yillardagi inqiroz ularga qattiq zarba berdi: Litvada ishsizlik 20 foizga yaqinlashdi, koʻp odamlar ish izlab Gʻarbga ketdi, Latviya aholisi 400 ming kishiga kamaydi. Yana bir muammo — etnik masala: Latviya va Estoniyada sovet davrida koʻchib kelgan rusiyzabon aholiga fuqarolik berilmadi; Litvada esa aholining 90 foizga yaqini litvaliklar boʻlgani uchun hammaga fuqarolik berildi. Uchala davlat ham yevro hududiga kirgan.",
      easy: "«Boltiq yoʻlbarslari» → 2008 inqiroz → ishsizlik, emigratsiya; fuqarolik masalasi.",
      draw: [
        { t: 'title', text: 'Rivojlanish yoʻli' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'Gʻarb sarmoyasi', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'Boltiq yoʻlbarslari', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: '2008: inqiroz', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'Latviya aholisi −400 ming', size: 's' },
        { t: 'text', x: 4, y: 54, text: 'Litvada ishsizlik ≈ 20 %', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Latviya, Litva va Estoniya 1988–1990-yillarda xalq harakatlari orqali mustaqillik sari bordi; 2004-yilda NATO va YIga aʼzo boʻldi.',
    'Tez iqtisodiy oʻsish ularga «Boltiq yoʻlbarslari» nomini berdi, ammo 2008–2009-yillardagi inqiroz ishsizlik va ommaviy emigratsiyaga olib keldi.',
    'Latviya va Estoniyada rusiyzabon aholining fuqarolik masalasi millatlararo munosabatlarni murakkablashtirdi; Litvada hammaga fuqarolik berildi.'
  ],
  questions: [
    {
      id: 'j6q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Estoniya deklaratsiyasi — 1988.',
      explanation: 'Estoniya suverenitet deklaratsiyasi (1988) → Litva mustaqilligi (1990-yil mart) → Latviya mustaqilligi (1990-yil may) → NATO va YIga aʼzolik (2004).',
      widget: { type: 'order_line', props: { items: [{ label: 'Estoniya suverenitet deklaratsiyasi' }, { label: 'Litva mustaqilligi' }, { label: 'Latviya mustaqilligi' }, { label: 'NATO va YIga aʼzolik' }] } }
    },
    {
      id: 'j6q2',
      prompt: 'Davlatni mustaqillik harakati bilan juftlang.',
      hint: '«Sayudis» — «Harakat».',
      explanation: 'Litva — «Sayudis»; Latviya — Latviya Xalq fronti; Estoniya — Estoniya «Xalq fronti».',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Litva', right: '«Sayudis»' },
            { left: 'Latviya', right: 'Latviya Xalq fronti' },
            { left: 'Estoniya', right: 'Estoniya Xalq fronti' }
          ]
        }
      }
    },
    {
      id: 'j6q3',
      prompt: 'Boltiqboʻyi davlatlari NATO va Yevropa Ittifoqiga qaysi yilda aʼzo boʻlgan?',
      hint: 'XXI asr boshi.',
      explanation: '2004-yilda.',
      widget: { type: 'number_answer', props: { answer: 2004, unit: 'yil' } }
    },
    {
      id: 'j6q4',
      prompt: 'Tez rivojlangani uchun Boltiqboʻyi davlatlari qanday nom olgan?',
      hint: 'Yirtqich hayvon.',
      explanation: '«Boltiq yoʻlbarslari».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Boltiq burgutlari»', '«Boltiq yoʻlbarslari»', '«Shimol arslonlari»', '«Yevropa ajdarlari»'], answerIndex: 1 } }
    },
    {
      id: 'j6q5',
      prompt: 'Qaysi davlatda mustaqillikdan keyin barcha aholiga, millatidan qatʼi nazar, fuqarolik berilgan?',
      hint: 'Aholining 90 % ga yaqini mahalliy millat.',
      explanation: 'Litvada.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Latviya', 'Estoniya', 'Litva', 'hech birida'], answerIndex: 2 } }
    },
    {
      id: 'j6q6',
      prompt: '2008–2009-yillardagi inqirozning Boltiqboʻyiga taʼsirini tanlang.',
      hint: 'Ish va aholi.',
      explanation: 'Ishsizlik oshdi, koʻp odamlar Gʻarbga ketdi, aholi kamaydi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ishsizlik oshdi', correct: true },
            { label: 'aholi Gʻarbga ketdi', correct: true },
            { label: 'aholi soni kamaydi', correct: true },
            { label: 'NATOdan chiqishdi' }
          ]
        }
      }
    },
    {
      id: 'j6q7',
      prompt: 'Litva 1990-yil 11-martda mustaqillikni eʼlon qilgan. Latviya qaysi kuni eʼlon qilgan?',
      hint: 'Bahor oxiri.',
      explanation: '1990-yil 4-mayda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1990-yil 4-may', '1991-yil 13-yanvar', '1988-yil 16-noyabr', '2004-yil 1-may'], answerIndex: 0 } }
    },
    {
      id: 'j6q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Yevro — umumiy pul.',
      explanation: 'Uchala davlat yevro hududiga kirgan; Latviyada rusiyzabon aholi taxminan 30 % ni tashkil etadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Boltiqboʻyi davlatlarining barchasi yevro hududiga kirgan.', value: true },
            { text: 'Latviyada rusiyzabon aholi taxminan 30 % ni tashkil qiladi.', value: true },
            { text: 'Boltiqboʻyi davlatlari MDHga aʼzo boʻlgan.', value: false },
            { text: '2008-yilgi inqiroz Boltiqboʻyiga deyarli taʼsir qilmagan.', value: false }
          ]
        }
      }
    }
  ]
};
