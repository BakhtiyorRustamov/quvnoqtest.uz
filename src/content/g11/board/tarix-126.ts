import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 26-mavzu (118–123-betlar) — Afrika: Shimoliy Afrika (Misr, Liviya, Sudan), Tropik va Janubiy Afrikadagi demokratlashuv va mojarolar, demografik muammo. */
export const TARIX_126: BoardLesson = {
  n: 126,
  label: '26',
  group: JH2,
  title: '1991–2017-yillarda Afrika mamlakatlari',
  section: 'Jahon tarixi, 26-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Shimoliy Afrikaga Misr, Sudan, Liviya, Jazoir, Tunis, Marokash, Mavritaniya kiradi. Misr XX asr oxirida iqtisodiyot, qishloq xoʻjaligi va turizmda katta yutuqlarga erishib, arab dunyosida yetakchi rol oʻynadi. 2011-yilda ommaviy noroziliklar natijasida prezident Husni Muborak isteʼfoga chiqdi, saylovda «Musulmon birodarlar» tashkiloti nomzodi Muhammad Mursi gʻolib chiqdi; 2013-yilda u harbiylar tomonidan agʻdarildi va 2014-yilda Abdul Fattoh as-Sisi prezident etib saylandi. Liviyada M. Kaddafiy davrida neft daromadi aholini taʼminlagan edi; 2011-yilgi qoʻzgʻolon va NATO aralashuvidan keyin Kaddafiy oʻldirildi, ammo mamlakat fuqarolar urushiga botdi. Sudan esa mintaqaning eng qoloq davlati boʻlib qolmoqda.",
      easy: "Misr: 2011 — Muborak ketdi, 2013 — Mursi agʻdarildi, 2014 — as-Sisi. Liviya: 2011 — Kaddafiy agʻdarildi, keyin urush.",
      draw: [
        { t: 'title', text: 'Shimoliy Afrika' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['2011', 'Misr: H. Muborak ketdi'], ['2011', 'Liviya: Kaddafiy agʻdarildi'], ['2013', 'Misr: M. Mursi agʻdarildi'], ['2014', 'Misr: as-Sisi prezident']] }
      ],
      next: 'Tropik va Janubiy Afrika'
    },
    {
      kind: 'explain',
      clear: true,
      say: "«Sovuq urush» tugagach, Tropik va Janubiy Afrikada ikki blokning taʼsir uchun kurashi tugadi. Koʻp davlatlar bir partiyali tizimdan koʻp partiyali tizimga oʻtdi, Efiopiyada 1991-yilda Mengistu hukumati agʻdarildi. Ammo mintaqada ogʻir mojarolar ham boʻldi: Liberiya va Syerra-Leoneda fuqarolar urushlari, 1990-yillar oʻrtasida Ruandada tutsi va xutu xalqlari oʻrtasidagi genotsid, Kongo Demokratik Respublikasida 1997-yilda Mobutu rejimi agʻdarilgach davom etgan inqiroz. Qashshoqlik, korrupsiya, gender tengsizligi va bolalar mehnati katta muammo boʻlib qolmoqda. Eng katta muammo — demografik: BMT hisobiga koʻra 2050-yilga borib Afrika aholisi 2 milliardga yetadi.",
      easy: "Koʻp partiyali tizimga oʻtish; Ruanda genotsidi, Liberiya va Syerra-Leone urushlari; 2050 — 2 mlrd aholi.",
      draw: [
        { t: 'title', text: 'Afrika muammolari' },
        { t: 'list', x: 4, y: 18, items: ['etnik mojarolar', 'qashshoqlik', 'korrupsiya', 'aholining tez oʻsishi'] },
        { t: 'text', x: 55, y: 24, text: '2050-yil:', size: 's', color: 'red' },
        { t: 'text', x: 55, y: 32, text: '≈ 2 mlrd aholi', size: 's', color: 'red' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Misrda 2011-yilda H. Muborak isteʼfoga chiqdi, 2013-yilda M. Mursi agʻdarildi, 2014-yildan A. F. as-Sisi prezident; Liviyada Kaddafiy agʻdarilgach fuqarolar urushi boshlandi.',
    '«Sovuq urush» tugagach Tropik Afrikada koʻp partiyali tizimga oʻtish boshlandi, ammo Ruanda, Liberiya, Syerra-Leone va Kongoda ogʻir mojarolar boʻldi.',
    'Afrikaning asosiy muammolari — qashshoqlik, korrupsiya, gender tengsizligi va aholining tez oʻsishi (2050-yilga 2 mlrd).'
  ],
  questions: [
    {
      id: 'j26q1',
      prompt: 'Misrdagi voqealarni tartiblang.',
      hint: 'Muborak — birinchi.',
      explanation: 'H. Muborak isteʼfoga chiqdi (2011) → M. Mursi prezident → Mursi agʻdarildi (2013) → as-Sisi prezident (2014).',
      widget: { type: 'order_line', props: { items: [{ label: 'H. Muborak isteʼfoga chiqdi' }, { label: 'M. Mursi prezident boʻldi' }, { label: 'M. Mursi agʻdarildi' }, { label: 'A. F. as-Sisi prezident' }] } }
    },
    {
      id: 'j26q2',
      prompt: 'Faktni mintaqaga ajrating.',
      hint: 'Misr va Liviya — shimolda.',
      explanation: 'Shimoliy Afrika — Misr, Liviya, Sudan; Tropik va Janubiy Afrika — Ruanda, Liberiya, Kongo DR.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'n', label: 'Shimoliy Afrika' }, { id: 't', label: 'Tropik va Janubiy Afrika' }],
          items: [
            { emoji: '🏛️', label: 'Misr', bin: 'n' },
            { emoji: '🛢️', label: 'Liviya', bin: 'n' },
            { emoji: '🌾', label: 'Sudan', bin: 'n' },
            { emoji: '⛰️', label: 'Ruanda', bin: 't' },
            { emoji: '🌴', label: 'Liberiya', bin: 't' },
            { emoji: '🌳', label: 'Kongo DR', bin: 't' }
          ]
        }
      }
    },
    {
      id: 'j26q3',
      prompt: 'BMT hisobiga koʻra 2050-yilga borib Afrika aholisi necha milliardga yetadi?',
      hint: 'Birdan koʻp.',
      explanation: '2 milliard.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'mlrd' } }
    },
    {
      id: 'j26q4',
      prompt: '«Sovuq urush» tugagach Afrika davlatlarida qanday siyosiy oʻzgarish kuzatildi?',
      hint: 'Partiyalar.',
      explanation: 'Koʻpchilik bir partiyali tizimdan koʻp partiyali tizimga oʻtdi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['koʻp partiyali tizimga oʻtish', 'monarxiyaning tiklanishi', 'barcha davlatlarning birlashishi', 'mustamlakachilikka qaytish'], answerIndex: 0 } }
    },
    {
      id: 'j26q5',
      prompt: 'Ruandadagi genotsid qaysi xalqlar oʻrtasidagi kurash natijasida yuz bergan?',
      hint: 'Ikki xalq.',
      explanation: 'Tutsi va xutu xalqlari.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tutsi va xutu', 'arablar va berberlar', 'zulu va kosa', 'amxara va oromo'], answerIndex: 0 } }
    },
    {
      id: 'j26q6',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Gender — erkak va ayol.',
      explanation: 'Gender tengsizligi — erkak va ayollar imkoniyatlarining farqi; etno-konfessional mojaro — etnik va diniy ziddiyat qoʻshilishi; genotsid — xalqni yoʻq qilishga qaratilgan jinoyat.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'gender tengsizligi', right: 'erkak va ayollar imkoniyatlari farqi' },
            { left: 'etno-konfessional mojaro', right: 'etnik va diniy ziddiyat qoʻshilishi' },
            { left: 'genotsid', right: 'xalqni yoʻq qilishga qaratilgan jinoyat' }
          ]
        }
      }
    },
    {
      id: 'j26q7',
      prompt: 'Afrikaning XXI asrdagi asosiy muammolarini tanlang.',
      hint: 'Ijtimoiy va demografik.',
      explanation: 'Qashshoqlik, korrupsiya, gender tengsizligi, aholining tez oʻsishi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'qashshoqlik', correct: true },
            { label: 'korrupsiya', correct: true },
            { label: 'aholining tez oʻsishi', correct: true },
            { label: 'aholining keskin qarishi' }
          ]
        }
      }
    },
    {
      id: 'j26q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kaddafiy — 2011.',
      explanation: 'Kaddafiy 2011-yilda agʻdarilgan, shundan keyin Liviyada mojarolar davom etgan; 1997-yilda Kongo DRda Mobutu rejimi agʻdarilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kaddafiy agʻdarilgach Liviyada mojarolar davom etgan.', value: true },
            { text: '1997-yilda Kongo DRda Mobutu rejimi agʻdarilgan.', value: true },
            { text: 'Sudan Shimoliy Afrikaning eng rivojlangan sanoat davlati.', value: false },
            { text: 'Efiopiyadagi Mengistu hukumati hozir ham hokimiyatda.', value: false }
          ]
        }
      }
    }
  ]
};
