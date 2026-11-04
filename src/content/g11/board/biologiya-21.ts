import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 21-§ (117–122-betlar) — sunʼiy ekosistemalar: urbanoekosistema, agroekosistema (agrosenoz), monokultura, kosmik ekosistema; tabiiy va sunʼiy ekosistemalar qiyosi. */
export const BIO_21: BoardLesson = {
  n: 21,
  label: '21',
  group: BOB2,
  title: 'Sunʼiy ekosistemalar',
  section: '21-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Paxta dalasini bir yil qarovsiz qoldirsangiz nima boʻladi? Begona oʻtlar bosadi, zararkunandalar koʻpayadi va dala tez yoʻqoladi. Sunʼiy ekosistemalar oʻzini oʻzi boshqarmaydi va tiklay olmaydi — ular inson taʼsirisiz uzoq yasholmaydi.",
      easy: "Sunʼiy ekosistema insonsiz tez yoʻqoladi.",
      draw: [
        { t: 'title', text: 'Insonsiz yashay oladimi?' },
        { t: 'icon', x: 16, y: 40, emoji: '🌾', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['oʻzini boshqarmaydi', 'oʻzini tiklay olmaydi', 'qoʻshimcha energiya kerak'] }
      ],
      next: 'Shahar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Urbanoekosistema — shahar, shaharcha, qishloq: lotincha urbs — shahar. U tabiiy qismlar — havo, suv, oʻsimlik, hayvon va inson yaratgan qismlar — zavodlar, binolar, transportdan iborat. Shaharlarda karbonat angidrid, is gazi va shovqin koʻp. Shahar daraxtlari — terak, shumtol, akatsiya — havoni tozalaydi, chang ushlaydi, fitonsid chiqaradi.",
      easy: "Shahar — urbanoekosistema; daraxtlar havoni tozalaydi.",
      draw: [
        { t: 'title', text: 'Urbanoekosistema' },
        { t: 'icon', x: 12, y: 40, emoji: '🏙️', size: 'l' },
        { t: 'list', x: 26, y: 22, items: ['tabiiy: havo, suv, oʻsimlik', 'sunʼiy: zavod, bino, transport', 'muammo: CO, shovqin', 'daraxtlar — tabiiy filtr'] }
      ],
      next: 'Agroekosistema'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agroekosistema yoki agrosenoz — qishloq xoʻjaligi ekosistemasi: dala, bogʻ, tokzor, tomorqa. Uning asosini madaniy oʻsimliklar tashkil etadi; begona oʻtlar, mikroorganizmlar, tuproq hayvonlari ham bor. U quyosh energiyasidan tashqari oʻgʻit, sugʻorish, yoqilgʻi va texnika energiyasini oladi. Hosil ekosistemadan olib chiqiladi — shuning uchun moddalar aylanishi toʻliq emas.",
      easy: "Agrosenoz — dala, bogʻ; qoʻshimcha energiya oladi, hosil chiqib ketadi.",
      draw: [
        { t: 'title', text: 'Agroekosistema' },
        { t: 'box', id: 's', x: 4, y: 22, w: 28, h: 8, text: 'quyosh, oʻgʻit', color: 'orange' },
        { t: 'box', id: 'p', x: 36, y: 22, w: 26, h: 8, text: 'madaniy ekin', color: 'green' },
        { t: 'box', id: 'h', x: 68, y: 22, w: 28, h: 8, text: 'hosil → inson', color: 'red' },
        { t: 'arrow', from: 's', to: 'p' },
        { t: 'arrow', from: 'p', to: 'h' },
        { t: 'text', x: 4, y: 44, text: 'moddalar aylanishi toʻliq emas', color: 'purple' }
      ],
      next: 'Monokultura'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Katta maydonda yillab bitta ekin ekish — monokultura. Masalan, gʻoʻza monokulturasi tuproq strukturasini buzadi, shoʻrlanish va zararkunandalar koʻpayishiga olib keladi. Barqarorlik uchun almashlab ekish, hasharotxoʻr entomofaglar va changlatuvchi asalarilarni qoʻshish, biologik kurash usullari kerak.",
      easy: "Monokultura — tuproq buziladi; yechim — almashlab ekish, biologik kurash.",
      draw: [
        { t: 'title', text: 'Monokultura xavfi' },
        { t: 'list', x: 4, y: 20, items: ['− tuproq strukturasi buziladi', '− shoʻrlanish', '− zararkunandalar koʻpayadi'] },
        { t: 'list', x: 4, y: 44, items: ['+ almashlab ekish', '+ entomofaglar, asalarilar'] }
      ],
      next: 'Qiyos'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tabiiy va sunʼiy ekosistemalarni solishtiramiz. Tabiiyda turlar koʻp, tabiiy tanlanish ishlaydi, faqat quyosh energiyasi, tuproq unumdorligi ortadi, oʻzini boshqaradi. Sunʼiyda bir-ikki tur hukmron, sunʼiy tanlash, qoʻshimcha energiya kerak, tuproq unumdorligi pasayadi, doimiy nazorat talab etadi. Kosmik kema ham kichik sunʼiy ekosistema.",
      easy: "Tabiiy — xilma-xil, oʻzini boshqaradi; sunʼiy — sodda, nazorat kerak.",
      draw: [
        { t: 'title', text: 'Tabiiy va sunʼiy' },
        { t: 'table', x: 4, y: 20, rows: [['jihat', 'tabiiy', 'sunʼiy'], ['turlar', 'koʻp', 'bir-ikki'], ['tanlanish', 'tabiiy', 'sunʼiy'], ['energiya', 'quyosh', '+ qoʻshimcha'], ['tuproq', 'unumdorlashadi', 'kambagʻallashadi']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Sunʼiy ekosistemalar (urbano-, agro-, kosmik) inson yaratadi va boshqaradi; ular oʻzini boshqarmaydi va qoʻshimcha energiya talab qiladi.',
    'Agroekosistemada hosil olib chiqiladi, moddalar aylanishi toʻliq emas; monokultura tuproqni buzadi — almashlab ekish va biologik kurash kerak.',
    'Tabiiy ekosistemalar turlarga boy, oʻzini boshqaradi va tuproq unumdorligini oshiradi; sunʼiylari sodda va doimiy nazorat talab qiladi.'
  ],
  questions: [
    {
      id: 'b21q1',
      prompt: 'Sunʼiy ekosistemani turiga ajrating.',
      hint: 'Urbs — shahar, agros — dala.',
      explanation: 'Urbano: shahar, qishloq. Agro: bugʻdoyzor, olmazor, tokzor.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'u', label: 'Urbanoekosistema' },
            { id: 'a', label: 'Agroekosistema' }
          ],
          items: [
            { emoji: '', label: 'shahar', bin: 'u' },
            { emoji: '', label: 'qishloq', bin: 'u' },
            { emoji: '', label: 'bugʻdoyzor', bin: 'a' },
            { emoji: '', label: 'olmazor', bin: 'a' },
            { emoji: '', label: 'tokzor', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'b21q2',
      prompt: 'Xususiyatni ekosistema turiga ajrating.',
      hint: 'Sunʼiy — sodda.',
      explanation: 'Koʻp tur — tabiiy; bir-ikki tur — sunʼiy; faqat quyosh energiyasi — tabiiy; qoʻshimcha energiya — sunʼiy.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 't', label: 'Tabiiy' },
            { id: 's', label: 'Sunʼiy' }
          ],
          items: [
            { emoji: '', label: 'turlar xilma-xil', bin: 't' },
            { emoji: '', label: 'oʻzini oʻzi boshqaradi', bin: 't' },
            { emoji: '', label: 'tuproq unumdorlashadi', bin: 't' },
            { emoji: '', label: 'qoʻshimcha energiya kerak', bin: 's' },
            { emoji: '', label: 'sunʼiy tanlash', bin: 's' },
            { emoji: '', label: 'hosil olib chiqiladi', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'b21q3',
      prompt: 'Katta maydonda yillab bitta ekin ekish qanday ataladi?',
      hint: 'Mono — bitta.',
      explanation: 'Monokultura.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['almashlab ekish', 'monokultura', 'agrosenoz', 'suksessiya'], answerIndex: 1 } }
    },
    {
      id: 'b21q4',
      prompt: 'Agroekosistema barqarorligini oshirish yoʻllarini belgilang.',
      hint: 'Biologik usullar.',
      explanation: 'Almashlab ekish, entomofaglar va changlatuvchi asalarilarni qoʻshish, biologik kurash.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'almashlab ekish', correct: true },
            { label: 'entomofaglarni qoʻshish', correct: true },
            { label: 'changlatuvchi asalarilar', correct: true },
            { label: 'har yili bitta ekin ekish' },
            { label: 'pestitsidni koʻpaytirish' }
          ]
        }
      }
    },
    {
      id: 'b21q5',
      prompt: 'Nega agroekosistemada moddalar aylanishi toʻliq emas?',
      hint: 'Hosil qayerga ketadi?',
      explanation: 'Mahsulotning bir qismi inson ehtiyoji uchun ekosistemadan olib chiqiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['hosil olib chiqib ketiladi', 'quyosh tushmaydi', 'redutsentlar yoʻq', 'suv yoʻq'], answerIndex: 0 } }
    },
    {
      id: 'b21q6',
      prompt: 'Shahar oʻsimliklarining asosiy vazifasi nima?',
      hint: 'Organik modda emas.',
      explanation: 'Havo tarkibini meʼyorda saqlash: chang va zararli moddalarni ushlash, fitonsid chiqarish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['koʻp hosil berish', 'havoni tozalash', 'tuproqni shoʻrlantirish', 'hayvonlarni boqish'], answerIndex: 1 } }
    },
    {
      id: 'b21q7',
      prompt: 'Qaysi biri sunʼiy ekosistema emas?',
      hint: 'Uchtasini inson yaratgan.',
      explanation: 'Koʻl — tabiiy ekosistema.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'paxtazor' }, { text: 'kosmik kema' }, { text: 'koʻl', odd: true }, { text: 'tomorqa' }] } }
    },
    {
      id: 'b21q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Sunʼiy — nazorat kerak.',
      explanation: 'Akvarium — sunʼiy ekosistema modeli; gʻoʻza monokulturasi tuproqni shoʻrlantiradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Akvarium — sunʼiy ekosistemaning kichik modeli.', value: true },
            { text: 'Gʻoʻza monokulturasi tuproq shoʻrlanishiga olib keladi.', value: true },
            { text: 'Sunʼiy ekosistemalar oʻzini oʻzi tiklaydi.', value: false },
            { text: 'Agroekosistemalar faqat quyosh energiyasidan foydalanadi.', value: false }
          ]
        }
      }
    }
  ]
};
