import type { BoardLesson } from './types';
import { GEO3 } from './geografiya-10';

/** Darslik: Geografiya 10, 12-§ (50–54-betlar) — tabiatni muhofaza qilish, alohida muhofaza etiladigan hududlar (milliy bogʻ, qoʻriqxona, biosfera rezervati, buyurtmaxona, tabiat yodgorligi), geografik-ekologik tamoyillar. */
export const GEO_12: BoardLesson = {
  n: 12,
  label: '12',
  group: GEO3,
  title: 'Tabiatni muhofaza qilishning geografik asoslari',
  section: '12-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Tabiatni muhofaza qilish — tabiatni saqlash, uning mahsuldorligini asrash va boyliklaridan oqilona foydalanishga qaratilgan barcha tadbirlar. Buning ikki yoʻli bor: alohida muhofaza etiladigan hududlar ajratish va xoʻjalik faoliyati jarayonida tabiatni asrash. Alohida muhofaza etiladigan hududlar: milliy bogʻ — eng yirik shakl, Oʻzbekistonda Ugom–Chotqol va Zomin milliy bogʻlari bor; qoʻriqxona — har qanday xoʻjalik faoliyati taqiqlangan joy; biosfera rezervati — UNESKO dasturi asosida tabiat va barqaror iqtisodni birga saqlaydi, bizda Quyi Amudaryo biosfera rezervati tashkil etilgan; buyurtmaxona — ayrim resurslardan cheklangan foydalanishga ruxsat beriladi; tabiat yodgorliklari — gʻorlar, sharsharalar, noyob qoyalar.",
      easy: "Muhofaza shakllari: milliy bogʻ, qoʻriqxona (faoliyat taqiqlangan), biosfera rezervati, buyurtmaxona, tabiat yodgorligi.",
      draw: [
        { t: 'title', text: 'Muhofaza etiladigan hududlar' },
        { t: 'table', x: 4, y: 18, rows: [['shakl', 'xususiyati'], ['milliy bogʻ', 'eng yirik, zonalarga boʻlinadi'], ['qoʻriqxona', 'xoʻjalik faoliyati taqiqlangan'], ['biosfera rezervati', 'UNESKO, uch zona'], ['buyurtmaxona', 'cheklangan foydalanish'], ['tabiat yodgorligi', 'gʻor, sharshara, qoya']] }
      ],
      next: 'Tamoyillar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tabiatni muhofaza qilishda bir nechta geografik-ekologik tamoyilga amal qilinadi. Ekologik muvozanat tamoyili: jonli va jonsiz tabiat muvozanatda, birining buzilishi butun tizimni izdan chiqaradi. Ekologik tozalik tamoyili: chiqindilarni tabiatga tashlashdan oldin tozalash kerak. Meʼyoriy foydalanish tamoyili: resurslardan meʼyordan ortiq foydalanilsa, masalan, sugʻorishda suv isrof qilinsa, eroziya, botqoqlanish kabi muammolar paydo boʻladi. Axborotning toʻliqligi tamoyili: tabiatni yaxshi oʻrganmay turib oʻzgartirish katta zarar keltiradi — Orol muammosi bunga misol. Xilma-xillik tamoyili: bir xil ekinli dalalar kasallik va ob-havo oʻzgarishiga chidamsiz.",
      easy: "Tamoyillar: ekologik muvozanat, tozalik, meʼyoriy foydalanish, axborotning toʻliqligi, xilma-xillik.",
      draw: [
        { t: 'title', text: 'Geografik-ekologik tamoyillar' },
        { t: 'list', x: 4, y: 18, items: ['ekologik muvozanat', 'ekologik tozalik', 'meʼyoriy foydalanish', 'axborotning toʻliqligi', 'xilma-xillik'] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Tabiatni muhofaza qilish — tabiatni saqlash, mahsuldorligini asrash va resurslardan oqilona foydalanishga qaratilgan tadbirlar; asosiy vazifa — ifloslanishning oldini olish va isrofgarchilikka yoʻl qoʻymaslik.',
    'Alohida muhofaza etiladigan hududlar: milliy bogʻlar (Ugom–Chotqol, Zomin), qoʻriqxonalar, biosfera rezervatlari (Quyi Amudaryo), buyurtmaxonalar va tabiat yodgorliklari.',
    'Asosiy tamoyillar: ekologik muvozanat, ekologik tozalik, meʼyoriy foydalanish, axborotning toʻliqligi va xilma-xillik.'
  ],
  questions: [
    {
      id: 'g12q1',
      prompt: 'Muhofaza shaklini taʼrifi bilan juftlang.',
      hint: 'Qoʻriqxona — qatʼiy taqiq.',
      explanation: 'Qoʻriqxona — har qanday xoʻjalik faoliyati taqiqlangan; buyurtmaxona — cheklangan foydalanishga ruxsat; biosfera rezervati — UNESKO dasturi asosida; milliy bogʻ — eng yirik shakl.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'qoʻriqxona', right: 'xoʻjalik faoliyati butunlay taqiqlangan' },
            { left: 'buyurtmaxona', right: 'cheklangan foydalanishga ruxsat' },
            { left: 'biosfera rezervati', right: 'UNESKO «Inson va biosfera» dasturi' },
            { left: 'milliy bogʻ', right: 'muhofazaning eng yirik shakli' }
          ]
        }
      }
    },
    {
      id: 'g12q2',
      prompt: 'Oʻzbekistondagi milliy bogʻlarni tanlang.',
      hint: 'Togʻli hududlar.',
      explanation: 'Ugom–Chotqol va Zomin milliy bogʻlari.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Ugom–Chotqol', correct: true },
            { label: 'Zomin', correct: true },
            { label: 'Yelloustoun' },
            { label: 'Serengeti' }
          ]
        }
      }
    },
    {
      id: 'g12q3',
      prompt: 'Oʻzbekistonda qaysi biosfera rezervati tashkil etilgan?',
      hint: 'Amudaryoning quyi oqimi.',
      explanation: 'Quyi Amudaryo biosfera rezervati.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Quyi Amudaryo', 'Chimyon', 'Orol dengizi', 'Hisor'], answerIndex: 0 } }
    },
    {
      id: 'g12q4',
      prompt: 'Holatni u buzgan tamoyilga ajrating.',
      hint: 'Isrof — meʼyor buzilishi.',
      explanation: 'Meʼyoriy foydalanish — suvni isrof qilish, oʻrmonni ortiqcha kesish; ekologik tozalik — chiqindini tozalamay tashlash, zavod tutunini filtrsiz chiqarish.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'm', label: 'meʼyoriy foydalanish' }, { id: 't', label: 'ekologik tozalik' }],
          items: [
            { emoji: '🚿', label: 'sugʻorishda suvni isrof qilish', bin: 'm' },
            { emoji: '🪓', label: 'oʻrmonni meʼyordan ortiq kesish', bin: 'm' },
            { emoji: '🗑️', label: 'chiqindini tozalamay daryoga tashlash', bin: 't' },
            { emoji: '🏭', label: 'tutunni filtrsiz chiqarish', bin: 't' }
          ]
        }
      }
    },
    {
      id: 'g12q5',
      prompt: 'Biosfera rezervati hududi qaysi zonalarga ajratiladi?',
      hint: 'Uchta.',
      explanation: 'Qoʻriqlanadigan, bufer va oraliq zonalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'qoʻriqlanadigan zona', correct: true },
            { label: 'bufer zona', correct: true },
            { label: 'oraliq zona', correct: true },
            { label: 'sanoat zonasi' }
          ]
        }
      }
    },
    {
      id: 'g12q6',
      prompt: 'Darslikda axborotning toʻliqligi tamoyili buzilishiga qaysi muammo misol keltiriladi?',
      hint: 'Oʻzbekistondagi eng katta ekologik muammo.',
      explanation: 'Orol va Orolboʻyi muammolari.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Orol va Orolboʻyi muammolari', 'zilzilalar', 'vulqon otilishi', 'muzliklarning koʻpayishi'], answerIndex: 0 } }
    },
    {
      id: 'g12q7',
      prompt: 'Nima uchun bir xil ekinli dalalar (masalan, faqat paxta) xavfli?',
      hint: 'Xilma-xillik tamoyili.',
      explanation: 'Ozgina ob-havo oʻzgarishi yoki kasallik butun dalani birdaniga xarob qilishi mumkin.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kasallik yoki ob-havo ularni birdaniga xarob qilishi mumkin', 'ular juda koʻp suv bermaydi', 'ularni sugʻorib boʻlmaydi', 'ular hech qachon hosil bermaydi'], answerIndex: 0 } }
    },
    {
      id: 'g12q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Qoʻriqxona — ilmiy muassasa.',
      explanation: 'Qoʻriqxonalar ilmiy muassasalar hisoblanadi; buyurtmaxonalar vaqtincha ham boʻlishi mumkin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qoʻriqxonalar ilmiy muassasa hisoblanadi.', value: true },
            { text: 'Buyurtmaxonalar doimiy yoki vaqtincha boʻlishi mumkin.', value: true },
            { text: 'Qoʻriqxonada ov qilish va baliq tutishga ruxsat beriladi.', value: false },
            { text: 'Tabiat yodgorliklariga faqat sanoat korxonalari kiradi.', value: false }
          ]
        }
      }
    }
  ]
};
