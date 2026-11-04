import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 6-§ (30–39-betlar) — quruqlik-havo muhiti, shamol, tuproq muhiti va gumus, tuproq hayvonlarining moslanishlari, tirik organizm yashash muhiti sifatida, parazitlar. */
export const BIO_6: BoardLesson = {
  n: 6,
  label: '6',
  group: BOB2,
  title: 'Quruqlik-havo, tuproq va organizm muhiti',
  section: '6-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Quruqlikdagi eng katta hayvon — fil, massasi 5 tonnagacha. Dengizdagi koʻk kit esa 150 tonnaga yetadi! Sabab — havo zichligi kichik, u tanani koʻtarib turmaydi. Shuning uchun quruqlik hayvonlarida kuchli skelet, oʻsimliklarda mexanik toʻqima rivojlangan.",
      easy: "Havo tayanch boʻlmaydi — quruqlik hayvonlari kichikroq.",
      draw: [
        { t: 'title', text: 'Fil va kit' },
        { t: 'icon', x: 16, y: 34, emoji: '🐘', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🐋', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['fil — 5 t gacha', 'kit — 150 t gacha', 'havo tayanch emas'] }
      ],
      next: 'Havo'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Havo tarkibi deyarli doimiy: 78 foiz azot, 21 foiz kislorod, 1 foiz inert gazlar, 0,03 foiz karbonat angidrid. Atmosfera kislorodi 2,5 milliard yil oldin fotosintez tufayli paydo boʻlgan. Quruqlikda yorugʻlik kuchli, harorat va namlik keskin oʻzgaradi, shamol esa oʻsimliklarni changlatadi — anemofillar, urugʻlarni tarqatadi — anemoxorlar.",
      easy: "Havo: N₂ 78 %, O₂ 21 %, CO₂ 0,03 %; shamol changlatadi va tarqatadi.",
      draw: [
        { t: 'title', text: 'Quruqlik-havo muhiti' },
        { t: 'bars', x: 6, y: 20, w: 50, h: 34, items: [{ label: 'N₂', value: 78 }, { label: 'O₂', value: 21 }, { label: 'inert', value: 1 }] },
        { t: 'list', x: 62, y: 24, items: ['anemofil', 'anemoxor', 'shamol'] }
      ],
      next: 'Tuproq'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tuproq — Yer poʻstining gʻovak, unumdor yuza qatlami. Unda zichlik katta, yorugʻlik yoʻq, harorat kam oʻzgaradi, kislorod kam, karbonat angidrid koʻp. Tuproqda yashovchilar — edafobiontlar. Organik qoldiqlar parchalanib, gumus — chirindi hosil boʻladi: gumus qancha koʻp, tuproq shuncha unumdor. Koʻp oʻsimliklar zamburugʻ bilan mikoriza hosil qiladi.",
      easy: "Tuproq: qorongʻi, zich, CO₂ koʻp; gumus — unumdorlik; edafobiontlar.",
      draw: [
        { t: 'title', text: 'Tuproq muhiti' },
        { t: 'list', x: 4, y: 20, items: ['zich, yorugʻlik yoʻq', 'harorat barqaror', 'O₂ kam, CO₂ koʻp'] },
        { t: 'formula', x: 4, y: 46, text: 'qoldiqlar → gumus → unumdorlik' },
        { t: 'text', x: 4, y: 58, text: 'edafobiontlar, mikoriza', size: 's', color: 'green' }
      ],
      next: 'Tuproq hayvonlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tuproq hayvonlarining tanasi ixcham, terisi pishiq yoki shilimshiq, koʻzlari rivojlanmagan. Krot va buzoqbosh kuraksimon oyoqlari bilan tuproqni qazib yoʻl ochadi. Yomgʻir chuvalchangi gidrostatik skeleti va tukchalari bilan tuproq zarralarini surib harakatlanadi. Hasharot lichinkalari va koʻpoyoqlilar tirnoqlari bilan.",
      easy: "Krot — kurak oyoq, chuvalchang — gidrostatik skelet, koʻpoyoq — tirnoq.",
      draw: [
        { t: 'title', text: 'Tuproqqa moslanish' },
        { t: 'table', x: 4, y: 20, rows: [['hayvon', 'moslanish'], ['krot, buzoqbosh', 'kuraksimon oyoq'], ['yomgʻir chuvalchangi', 'gidrostatik skelet'], ['koʻpoyoq', 'tirnoqlar']] }
      ],
      next: 'Organizm muhit'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tirik organizm ham muhit: unda parazit va simbiontlar yashaydi, tanasi muhit boʻlgan organizm — xoʻjayin. Ektoparazitlar tashqarida yashaydi: bit, burga, kana. Endoparazitlar ichkarida: askarida, bezgak plazmodiysi, tasmasimon chuvalchang. Parazitlarda harakat va hazm organlari soddalashgan, yopishish aʼzolari bor, nasli juda koʻp, hayot siklida xoʻjayin almashadi.",
      easy: "Ekto — tashqarida (burga), endo — ichkarida (askarida); tana soddalashgan, nasli koʻp.",
      draw: [
        { t: 'title', text: 'Parazitlar' },
        { t: 'table', x: 4, y: 20, rows: [['tur', 'qayerda', 'misol'], ['ektoparazit', 'tashqarida', 'bit, burga, kana'], ['endoparazit', 'ichkarida', 'askarida, plazmodiy']] },
        { t: 'list', x: 4, y: 46, items: ['organlar soddalashgan', 'soʻrgʻich, ilmoqlar', 'nasli juda koʻp'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Quruqlik-havo muhitida havo zichligi kichik, yorugʻlik kuchli, harorat va namlik keskin oʻzgaradi; shamol changlatadi va urugʻlarni tarqatadi.',
    'Tuproq zich, qorongʻi, CO₂ ga boy; gumus unumdorlikni belgilaydi; tuproq hayvonlarida kurak oyoq, gidrostatik skelet, tirnoqlar.',
    'Tirik organizm — parazit va simbiontlar muhiti; ekto- va endoparazitlarda organlar soddalashgan, nasl koʻp, xoʻjayin almashadi.'
  ],
  questions: [
    {
      id: 'b6q1',
      prompt: 'Havoda kislorod necha foizni tashkil qiladi? (butun songacha)',
      hint: 'Azot — 78 %.',
      explanation: '20,9 % ≈ 21 %.',
      widget: { type: 'number_answer', props: { answer: 21, tolerance: 0.5, unit: '%' } }
    },
    {
      id: 'b6q2',
      prompt: 'Tuproq hayvonini moslanishi bilan juftlang.',
      hint: 'Krot — qazuvchi.',
      explanation: 'Krot — kuraksimon oyoq; yomgʻir chuvalchangi — gidrostatik skelet; koʻpoyoq — tirnoqlar.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'krot', right: 'kuraksimon oyoq' },
            { left: 'yomgʻir chuvalchangi', right: 'gidrostatik skelet' },
            { left: 'koʻpoyoq', right: 'tirnoqlar' }
          ]
        }
      }
    },
    {
      id: 'b6q3',
      prompt: 'Parazitni guruhiga ajrating.',
      hint: 'Burga — tashqarida.',
      explanation: 'Ekto: bit, burga, kana. Endo: askarida, plazmodiy, solityor.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'ec', label: 'Ektoparazit' },
            { id: 'en', label: 'Endoparazit' }
          ],
          items: [
            { emoji: '', label: 'bit', bin: 'ec' },
            { emoji: '', label: 'burga', bin: 'ec' },
            { emoji: '', label: 'kana', bin: 'ec' },
            { emoji: '', label: 'askarida', bin: 'en' },
            { emoji: '', label: 'bezgak plazmodiysi', bin: 'en' },
            { emoji: '', label: 'solityor', bin: 'en' }
          ]
        }
      }
    },
    {
      id: 'b6q4',
      prompt: 'Tuproq unumdorligini nima belgilaydi?',
      hint: 'Organik qoldiqlarning oxirgi mahsuloti.',
      explanation: 'Gumus (chirindi) miqdori.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qum miqdori', 'gumus miqdori', 'tosh miqdori', 'tuproq rangi'], answerIndex: 1 } }
    },
    {
      id: 'b6q5',
      prompt: 'Tuproq muhitiga xos xususiyatlarni belgilang.',
      hint: 'Tuproq ichi qorongʻi.',
      explanation: 'Yorugʻlik yoʻq, zichlik katta, harorat kam oʻzgaradi, CO₂ koʻp.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'yorugʻlik yoʻq', correct: true },
            { label: 'zichlik katta', correct: true },
            { label: 'CO₂ koʻp', correct: true },
            { label: 'harorat keskin oʻzgaradi' },
            { label: 'kislorod juda koʻp' }
          ]
        }
      }
    },
    {
      id: 'b6q6',
      prompt: 'Shamol yordamida changlanadigan oʻsimliklar qanday ataladi?',
      hint: 'Anemos — shamol, filiya — yaxshi koʻraman.',
      explanation: 'Anemofil oʻsimliklar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['anemoxor', 'anemofil', 'gidrofit', 'edafobiont'], answerIndex: 1 } }
    },
    {
      id: 'b6q7',
      prompt: 'Parazit hayotiga moslanishlardan boʻlmaganini toping.',
      hint: 'Parazitlar soddalashgan.',
      explanation: 'Murakkab sezgi organlari parazitlarda soddalashgan; qolganlari parazitlarga xos.',
      widget: {
        type: 'odd_one_out',
        props: { tiles: [{ text: 'soʻrgʻichlar' }, { text: 'nasli koʻp' }, { text: 'murakkab sezgi organlari', odd: true }, { text: 'xoʻjayin almashinuvi' }] }
      }
    },
    {
      id: 'b6q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oraliq xoʻjayin — parazitning boshqa organizmi.',
      explanation: 'Xoʻjayin almashinishi xoʻjayin halokatining oldini oladi; qoramol tasmasimon chuvalchangida hazm tizimi yoʻq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qoramol tasmasimon chuvalchangida hazm tizimi butunlay yoʻqolgan.', value: true },
            { text: 'Atmosfera kislorodi fotosintez natijasida paydo boʻlgan.', value: true },
            { text: 'Tuproq hayvonlarining koʻzlari yaxshi rivojlangan.', value: false },
            { text: 'Havo quruqlik organizmlari uchun tayanch vazifasini bajaradi.', value: false }
          ]
        }
      }
    }
  ]
};
