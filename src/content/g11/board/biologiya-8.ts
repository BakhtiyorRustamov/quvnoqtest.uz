import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 8-§ (47–53-betlar) — quyosh spektri (UB, koʻrinadigan, IQ), fototropizm, fotonastiya, oʻsimlik va hayvonlarning yorugʻlikka koʻra guruhlari, fotoperiodizm. */
export const BIO_8: BoardLesson = {
  n: 8,
  label: '8',
  group: BOB2,
  title: 'Yorugʻlik — ekologik omil',
  section: '8-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Lola va qoqioʻt gullari ertalab ochilib, kechqurun yopiladi, namozshomgul esa aksincha — kechqurun ochiladi. Qushlar kuzda kun qisqarishini «sezib», issiq oʻlkalarga uchadi. Bularning barchasini yorugʻlik boshqaradi — Yerdagi hayotning asosiy energiya manbayi.",
      easy: "Gullar ochilishi, qushlar migratsiyasi — yorugʻlik taʼsiri.",
      draw: [
        { t: 'title', text: 'Yorugʻlik va hayot' },
        { t: 'icon', x: 16, y: 34, emoji: '🌷', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🕊️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['lola — kunduzi ochiladi', 'namozshomgul — kechqurun', 'kun qisqarsa — migratsiya'] }
      ],
      next: 'Quyosh spektri'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Quyosh nuri uch qismga boʻlinadi. Ultrabinafsha — 400 nanometrgacha: kam qismi ozon ekranidan oʻtadi, bakteriyalarni oʻldiradi, terida melanin va D vitamini hosil qiladi. Koʻrinadigan nurlar — 400–750 nanometr, Yerga yetgan nurning 50 foizi, fotosintez uchun. Infraqizil — 750 dan katta, 45 foizdan koʻp, issiqlik nurlari.",
      easy: "UB — D vitamini; koʻrinadigan — fotosintez; IQ — issiqlik.",
      draw: [
        { t: 'title', text: 'Quyosh spektri' },
        { t: 'table', x: 4, y: 20, rows: [['nurlar', 'λ, nm', 'ahamiyati'], ['ultrabinafsha', '< 400', 'D vitamini, melanin'], ['koʻrinadigan', '400–750', 'fotosintez'], ['infraqizil', '> 750', 'issiqlik']] }
      ],
      next: 'Oʻsimlik harakatlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yorugʻlik oʻsimlik harakatlarini boshqaradi. Fototropizm — organlarning yorugʻlik tomonga burilib oʻsishi: novda derazaga qarab egiladi. Fotonastiya — kun va tun almashinuvi bilan bogʻliq harakat: gullarning ochilib-yopilishi. Bir hujayrali organizmlarning yorugʻlik tomon harakati — fototaksis.",
      easy: "Fototropizm — yorugʻlikka oʻsish; fotonastiya — ochilib-yopilish; fototaksis — harakat.",
      draw: [
        { t: 'title', text: 'Yorugʻlikka javob' },
        { t: 'icon', x: 12, y: 40, emoji: '🌱', size: 'l' },
        { t: 'list', x: 26, y: 22, items: ['fototropizm — yorugʻlikka oʻsish', 'fotonastiya — gul ochilishi', 'fototaksis — hujayra harakati'] }
      ],
      next: 'Ekologik guruhlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻsimliklar: yorugʻsevar — ochiq joylarda, saksovul, qaragʻay, makkajoʻxori; soyaga chidamli — nastarin, lipa, binafsha; soyasevar — oʻrmon tagida va suv tubida, yoʻsin, qirqquloq, qizil suvoʻtlar. Hayvonlar: kunduzgi — asalari, quyon; kechqurungi — koʻrshapalak, may qoʻngʻizi; tungi — boʻri, ukki, suvarak.",
      easy: "Yorugʻsevar, soyaga chidamli, soyasevar; kunduzgi, kechqurungi, tungi.",
      draw: [
        { t: 'title', text: 'Yorugʻlikka koʻra guruhlar' },
        { t: 'table', x: 4, y: 20, rows: [['guruh', 'misol'], ['yorugʻsevar', 'saksovul, makkajoʻxori'], ['soyaga chidamli', 'nastarin, binafsha'], ['soyasevar', 'yoʻsin, qirqquloq']] },
        { t: 'text', x: 4, y: 58, text: 'hayvonlar: kunduzgi, kechqurungi, tungi', size: 's', color: 'purple' }
      ],
      next: 'Fotoperiodizm'
    },
    {
      kind: 'example',
      clear: true,
      say: "Kun uzunligi — fotoperiod. Organizmlarning kun uzunligiga javobi — fotoperiodizm. Uzun kun oʻsimliklari 13 soatdan uzun kunda gullaydi: kartoshka, sabzi, piyoz, karam. Qisqa kun oʻsimliklari 12 soatdan qisqa kunda: pomidor, bodring, gʻoʻza, xrizantema. Neytrallari kunga bogʻliq emas: noʻxat, qoqioʻt. Ekvatorda kun yil boʻyi 12 soat.",
      easy: "Uzun kun (≥ 13 soat) — kartoshka; qisqa kun (< 12) — pomidor; neytral — noʻxat.",
      draw: [
        { t: 'title', text: 'Fotoperiodizm' },
        { t: 'table', x: 4, y: 20, rows: [['guruh', 'kun', 'misol'], ['uzun kun', '≥ 13 soat', 'kartoshka, karam'], ['qisqa kun', '< 12 soat', 'pomidor, gʻoʻza'], ['neytral', 'farqsiz', 'noʻxat, qoqioʻt']] },
        { t: 'text', x: 4, y: 56, text: 'biologik soat — bioritmlarni boshqaradi', size: 's', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Quyosh spektri: ultrabinafsha (D vitamini, melanin, bakteritsid), koʻrinadigan (≈ 50 %, fotosintez), infraqizil (> 45 %, issiqlik).',
    'Oʻsimliklar: yorugʻsevar, soyaga chidamli, soyasevar; hayvonlar: kunduzgi, kechqurungi, tungi; fototropizm, fotonastiya, fototaksis.',
    'Fotoperiodizm — kun uzunligiga javob: uzun kun (≥ 13 soat), qisqa kun (< 12 soat) va neytral oʻsimliklar.'
  ],
  questions: [
    {
      id: 'b8q1',
      prompt: 'Oʻsimlikni fotoperiod guruhiga ajrating.',
      hint: 'Kartoshka — moʻtadil iqlim, uzun kun.',
      explanation: 'Uzun kun: kartoshka, sabzi, karam. Qisqa kun: pomidor, gʻoʻza, bodring. Neytral: noʻxat.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'u', label: 'Uzun kun' },
            { id: 'q', label: 'Qisqa kun' },
            { id: 'n', label: 'Neytral' }
          ],
          items: [
            { emoji: '', label: 'kartoshka', bin: 'u' },
            { emoji: '', label: 'karam', bin: 'u' },
            { emoji: '', label: 'pomidor', bin: 'q' },
            { emoji: '', label: 'gʻoʻza', bin: 'q' },
            { emoji: '', label: 'noʻxat', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'b8q2',
      prompt: 'Nur turini ahamiyati bilan juftlang.',
      hint: 'Infraqizil — issiqlik nurlari.',
      explanation: 'UB — D vitamini sintezi; koʻrinadigan — fotosintez; IQ — tanani isitadi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'ultrabinafsha', right: 'D vitamini sintezi' },
            { left: 'koʻrinadigan', right: 'fotosintez' },
            { left: 'infraqizil', right: 'tanani isitadi' }
          ]
        }
      }
    },
    {
      id: 'b8q3',
      prompt: 'Koʻrinadigan nurlarning toʻlqin uzunligi qanday?',
      hint: 'UB dan katta, IQ dan kichik.',
      explanation: '400–750 nm.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['30–400 nm', '400–750 nm', '750 nm dan katta', '1–30 nm'], answerIndex: 1 } }
    },
    {
      id: 'b8q4',
      prompt: 'Oʻsimlikni yorugʻlikka koʻra guruhiga ajrating.',
      hint: 'Qirqquloq — oʻrmon tagida.',
      explanation: 'Yorugʻsevar: saksovul, makkajoʻxori. Soyaga chidamli: nastarin, binafsha. Soyasevar: yoʻsin, qirqquloq.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'y', label: 'Yorugʻsevar' },
            { id: 'c', label: 'Soyaga chidamli' },
            { id: 's', label: 'Soyasevar' }
          ],
          items: [
            { emoji: '', label: 'saksovul', bin: 'y' },
            { emoji: '', label: 'makkajoʻxori', bin: 'y' },
            { emoji: '', label: 'nastarin', bin: 'c' },
            { emoji: '', label: 'binafsha', bin: 'c' },
            { emoji: '', label: 'yoʻsin', bin: 's' },
            { emoji: '', label: 'qirqquloq', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'b8q5',
      prompt: 'Gullarning kunduzi ochilib, kechqurun yopilishi qanday ataladi?',
      hint: 'Kun va tun almashinuvi bilan bogʻliq harakat.',
      explanation: 'Fotonastiya.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['fototropizm', 'fotonastiya', 'fototaksis', 'fotosintez'], answerIndex: 1 } }
    },
    {
      id: 'b8q6',
      prompt: 'Hayvonni faollik vaqti bilan juftlang.',
      hint: 'Koʻrshapalak — gʻira-shirada.',
      explanation: 'Asalari — kunduzgi; koʻrshapalak — kechqurungi; ukki — tungi.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'asalari' }, b: { label: 'kunduzgi' } },
            { a: { label: 'koʻrshapalak' }, b: { label: 'kechqurungi' } },
            { a: { label: 'ukki' }, b: { label: 'tungi' } }
          ]
        }
      }
    },
    {
      id: 'b8q7',
      prompt: 'Uzun kun oʻsimliklari necha soatlik kunda gullaydi?',
      hint: 'Yoz oylari.',
      explanation: '13 soat va undan uzun.',
      widget: { type: 'number_answer', props: { answer: 13, unit: 'soat' } }
    },
    {
      id: 'b8q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ekvatorda kun deyarli oʻzgarmaydi.',
      explanation: 'Ekvatorda kun ≈ 12 soat; fotoperiodizm yorugʻlik davriyligiga bogʻliq; qisqa toʻlqinli UB ozondan oʻtmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ekvatorda kun uzunligi yil boʻyi taxminan 12 soat.', value: true },
            { text: 'Qisqa toʻlqinli halokatli UB nurlar ozon ekranidan oʻtmaydi.', value: true },
            { text: 'Fotoperiodizm faqat yorugʻlik kuchiga bogʻliq.', value: false },
            { text: 'Yirtqich qushlar ranglarni yaxshi ajratadi.', value: false }
          ]
        }
      }
    }
  ]
};
