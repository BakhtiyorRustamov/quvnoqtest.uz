import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 14-§ (81–86-betlar) — populatsiya, gomeostaz, populatsiya soni va dinamikasi, zichlik, jinsiy va yosh tarkibi, tugʻiluvchanlik va oʻlim. */
export const BIO_14: BoardLesson = {
  n: 14,
  label: '14',
  group: BOB2,
  title: 'Turning populatsion strukturasi',
  section: '14-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ichak tayoqchasi bakteriyasi bir martada atigi ikki avlod beradi, kumushsimon terak esa minglab urugʻ. Lekin bakteriya populatsiyasi teraknikidan ancha tez koʻpayadi — chunki u har 20 daqiqada boʻlinadi! Populatsiya soni qanday oʻzgaradi va nimaga bogʻliq?",
      easy: "Koʻpayish tezligi — avlod almashish tezligiga bogʻliq.",
      draw: [
        { t: 'title', text: 'Kim tez koʻpayadi?' },
        { t: 'icon', x: 16, y: 34, emoji: '🦠', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🌳', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['bakteriya — tez-tez boʻlinadi', 'terak — koʻp urugʻ, sekin', 'populus — xalq, aholi'] }
      ],
      next: 'Populatsiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Populatsiya — kelib chiqishi umumiy, oʻzaro erkin chatishib nasl beradigan, arealning maʼlum qismida uzoq yashaydigan va boshqa populatsiyalardan nisbatan ajralgan bir tur individlari yigʻindisi. U genofondga ega va sonini uzoq muddat bir xil saqlay oladi — bu populatsiya gomeostazi.",
      easy: "Populatsiya — erkin chatishadigan, alohidalashgan bir tur individlari; gomeostaz — sonni saqlash.",
      draw: [
        { t: 'title', text: 'Populatsiya' },
        { t: 'list', x: 4, y: 20, items: ['bir tur individlari', 'erkin chatishadi', 'boshqalaridan alohidalashgan', 'umumiy genofond'] },
        { t: 'text', x: 4, y: 58, text: 'gomeostaz — sonni barqaror saqlash', color: 'purple' }
      ],
      next: 'Soni va zichlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Populatsiya soni yuqori va quyi chegaraga ega. Yuqori chegaraga yetsa — oziq yetishmaydi, kasallik tarqaladi. Quyi chegaradan kamaysa — koʻpayish imkoni yoʻqoladi, populatsiya halok boʻladi; shuning uchun kam sonli populatsiyalar himoyaga muhtoj. Zichlik — maydon yoki hajm birligidagi organizmlar soni: 1 gektarda 100 daraxt, 1 kub metr suvda 5 million xlorella.",
      easy: "Soni: yuqori va quyi chegara; zichlik — birlik maydondagi soni.",
      draw: [
        { t: 'title', text: 'Soni va zichlik' },
        { t: 'list', x: 4, y: 20, items: ['yuqori chegara — oziq, kasallik', 'quyi chegara — yoʻqolish xavfi', 'zichlik = soni / maydon'] },
        { t: 'formula', x: 4, y: 50, text: '1 ga — 100 daraxt' },
        { t: 'formula', x: 4, y: 60, text: '1 m³ suv — 5 mln xlorella' }
      ],
      next: 'Dinamika'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sonning vaqt boʻyicha oʻzgarishi — dinamika yoki populatsiya toʻlqini. Davriy oʻzgarishlar: mavsumiy — pashsha, chivin, sichqonlar yozda koʻpayib, qishda kamayadi; bir necha yillik — tulki, boyqush; olma va oʻrik ikki yilda bir, kedr toʻrt yilda bir koʻp hosil beradi. Nodavriy — qurgʻoqchilik yoki gʻayritabiiy qishdan keyin zararkunandalar keskin koʻpayishi.",
      easy: "Davriy (mavsumiy, yillik) va nodavriy (favqulodda) oʻzgarishlar.",
      draw: [
        { t: 'title', text: 'Populatsiya toʻlqini' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 60, h: 34, xmin: 0, xmax: 12, ymin: 0, ymax: 1.2, xlabel: 'oy', ylabel: 'soni' },
        { t: 'curve', axes: 'g', points: [[0, 0.2], [2, 0.25], [4, 0.6], [6, 1], [8, 0.8], [10, 0.3], [12, 0.2]], color: 'blue' },
        { t: 'list', x: 72, y: 24, items: ['yoz — koʻp', 'qish — kam'] },
        { t: 'text', x: 8, y: 62, text: 'nodavriy: qurgʻoqchilik, gʻayritabiiy qish', size: 's', color: 'red' }
      ],
      next: 'Tarkibi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Jinsiy tarkib: tugʻilishda nisbat odatda 1 ga 1. Urgʻochilar 75 foiz boʻlsa — populatsiya oʻsadi, 50 foiz — barqaror, 25 foiz — kamayadi va himoyaga muhtoj. Yosh tarkibi uch guruh: predreproduktiv — yoshlar, reproduktiv — nasl beruvchilar, postreproduktiv — qarilar. Yosh piramidasining asosi keng — oʻsayotgan, tor — kamayayotgan populatsiya.",
      easy: "Urgʻochi koʻp — oʻsadi; yosh piramida asosi keng — oʻsadi, tor — kamayadi.",
      draw: [
        { t: 'title', text: 'Yosh piramidalari' },
        { t: 'point', id: 'a1', x: 6, y: 60, hide: true },
        { t: 'point', id: 'a2', x: 30, y: 60, hide: true },
        { t: 'point', id: 'a3', x: 18, y: 26, hide: true },
        { t: 'polygon', points: ['a1', 'a2', 'a3'], color: 'green' },
        { t: 'point', id: 'b1', x: 38, y: 60, hide: true },
        { t: 'point', id: 'b2', x: 58, y: 60, hide: true },
        { t: 'point', id: 'b3', x: 54, y: 26, hide: true },
        { t: 'point', id: 'b4', x: 42, y: 26, hide: true },
        { t: 'polygon', points: ['b1', 'b2', 'b3', 'b4'], color: 'blue' },
        { t: 'point', id: 'c1', x: 70, y: 60, hide: true },
        { t: 'point', id: 'c2', x: 82, y: 60, hide: true },
        { t: 'point', id: 'c3', x: 90, y: 30, hide: true },
        { t: 'point', id: 'c4', x: 62, y: 30, hide: true },
        { t: 'polygon', points: ['c1', 'c2', 'c3', 'c4'], color: 'red' },
        { t: 'text', x: 18, y: 66, text: 'oʻsuvchi', size: 's', anchor: 'middle' },
        { t: 'text', x: 48, y: 66, text: 'barqaror', size: 's', anchor: 'middle' },
        { t: 'text', x: 76, y: 66, text: 'kamayuvchi', size: 's', anchor: 'middle' }
      ],
      next: 'Tugʻilish va oʻlim'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tugʻiluvchanlik — vaqt birligida paydo boʻlgan organizmlar soni, oʻlim koʻrsatkichi — nobud boʻlganlar soni. Ular teng boʻlsa — populatsiya barqaror; tugʻilish koʻp — oʻsadi; oʻlim koʻp — qisqaradi va himoyaga muhtoj. Masalan, gʻizollarning bir populatsiyasida 160 yosh, 90 voyaga yetgan, 50 qari; ikkinchisida 80, 160 va 100. Birinchisi oʻsadi, ikkinchisi kamayadi.",
      easy: "Tugʻilish = oʻlim — barqaror; > — oʻsadi; < — qisqaradi.",
      draw: [
        { t: 'title', text: 'Tugʻilish va oʻlim' },
        { t: 'table', x: 4, y: 20, rows: [['nisbat', 'populatsiya'], ['tugʻilish = oʻlim', 'barqaror'], ['tugʻilish > oʻlim', 'oʻsuvchi'], ['tugʻilish < oʻlim', 'qisqaruvchi']] },
        { t: 'text', x: 4, y: 56, text: 'gʻizol: 160 / 90 / 50 → oʻsadi; 80 / 160 / 100 → kamayadi', size: 's', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Populatsiya — erkin chatishadigan, boshqa populatsiyalardan nisbatan ajralgan bir tur individlari; u sonini barqaror saqlaydi (gomeostaz).',
    'Populatsiya soni yuqori va quyi chegaraga ega; zichlik — birlik maydon yoki hajmdagi soni; dinamika davriy va nodavriy boʻladi.',
    'Jinsiy va yosh tarkibi, tugʻiluvchanlik va oʻlim nisbati populatsiya oʻsishi, barqarorligi yoki qisqarishini belgilaydi.'
  ],
  questions: [
    {
      id: 'b14q1',
      prompt: 'Nisbatni populatsiya holati bilan juftlang.',
      hint: 'Tugʻilish koʻp — oʻsadi.',
      explanation: 'Tugʻilish = oʻlim — barqaror; tugʻilish > oʻlim — oʻsuvchi; tugʻilish < oʻlim — qisqaruvchi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'tugʻilish = oʻlim', right: 'barqaror' },
            { left: 'tugʻilish > oʻlim', right: 'oʻsuvchi' },
            { left: 'tugʻilish < oʻlim', right: 'qisqaruvchi' }
          ]
        }
      }
    },
    {
      id: 'b14q2',
      prompt: 'Urgʻochilar 25 %, erkaklar 75 % boʻlgan populatsiya kelajagi qanday?',
      hint: 'Naslni urgʻochilar beradi.',
      explanation: 'Soni kamayadi — populatsiya himoyaga muhtoj.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tez oʻsadi', 'barqaror', 'kamayadi', 'oʻzgarmaydi'], answerIndex: 2 } }
    },
    {
      id: 'b14q3',
      prompt: 'Gʻizol populatsiyasida 80 yosh, 160 voyaga yetgan, 100 qari individ bor. Bu populatsiya…',
      hint: 'Yoshlar kam — piramida asosi tor.',
      explanation: 'Kamayib boradi — muhofaza choralari kerak.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻsib boradi', 'barqaror', 'kamayib boradi'], answerIndex: 2 } }
    },
    {
      id: 'b14q4',
      prompt: '2 gektar oʻrmonda 300 ta daraxt bor. Zichlik 1 gektarga nechta?',
      hint: 'Zichlik = soni / maydon.',
      explanation: '300 / 2 = 150 ta.',
      widget: { type: 'number_answer', props: { answer: 150, unit: 'ta/ga' } }
    },
    {
      id: 'b14q5',
      prompt: 'Yosh guruhini taʼrifi bilan juftlang.',
      hint: 'Pre- — oldin, post- — keyin.',
      explanation: 'Predreproduktiv — hali nasl bermaydigan yoshlar; reproduktiv — nasl beruvchi; postreproduktiv — nasl bermaydigan qarilar.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'predreproduktiv' }, b: { label: 'hali nasl bermaydigan yoshlar' } },
            { a: { label: 'reproduktiv' }, b: { label: 'nasl beruvchilar' } },
            { a: { label: 'postreproduktiv' }, b: { label: 'qari, nasl bermaydi' } }
          ]
        }
      }
    },
    {
      id: 'b14q6',
      prompt: 'Oʻzgarishni turi boʻyicha ajrating.',
      hint: 'Mavsum va yillar — davriy.',
      explanation: 'Davriy: chivinlarning yozda koʻpayishi, olmaning ikki yilda koʻp hosil berishi. Nodavriy: qurgʻoqchilikdan keyin zararkunanda koʻpayishi, gʻayritabiiy sovuq qishdagi qirilish.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'd', label: 'Davriy' },
            { id: 'n', label: 'Nodavriy' }
          ],
          items: [
            { emoji: '', label: 'chivinlarning yozda koʻpayishi', bin: 'd' },
            { emoji: '', label: 'olmaning ikki yilda bir koʻp hosili', bin: 'd' },
            { emoji: '', label: 'qurgʻoqchilikdan keyin zararkunanda', bin: 'n' },
            { emoji: '', label: 'gʻayritabiiy sovuq qishda qirilish', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'b14q7',
      prompt: 'Populatsiya oʻz sonini uzoq vaqt bir xil saqlashi qanday ataladi?',
      hint: 'Homoios — oʻxshash, stasis — turgʻun.',
      explanation: 'Populatsiya gomeostazi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['dinamika', 'gomeostaz', 'zichlik', 'migratsiya'], answerIndex: 1 } }
    },
    {
      id: 'b14q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kam sonli populatsiya xavf ostida.',
      explanation: 'Quyi chegaradan kamaysa populatsiya yoʻqoladi; tugʻilishda jins nisbati koʻpincha 1 : 1.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kam sonli populatsiyalar uzoq saqlanib qola olmaydi.', value: true },
            { text: 'Tugʻilishda jinslar nisbati koʻpincha 1 : 1.', value: true },
            { text: 'Populatsiya soni chegarasiz oʻsa oladi.', value: false },
            { text: 'Yosh piramidasining asosi tor boʻlsa, populatsiya oʻsadi.', value: false }
          ]
        }
      }
    }
  ]
};
