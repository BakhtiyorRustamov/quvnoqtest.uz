import type { BoardLesson } from './types';
import { BOB3 } from './biologiya-24';

/** Darslik: Biologiya 11, 33-§ (171–175-betlar) — inson biosfera omili sifatida: taʼsir usullari, tiklanadigan va tiklanmaydigan boyliklar, oʻrmonlar, Orol, issiqxona taʼsiri, oqilona foydalanish. */
export const BIO_33: BoardLesson = {
  n: 33,
  label: '33',
  group: BOB3,
  title: 'Inson biosfera omili sifatida',
  section: '33-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "XVIII asr boshida Yerda taxminan 600 million kishi yashardi, bugun esa 7,5 milliarddan oshdi. Aholi qancha koʻp boʻlsa, biosferadan shuncha koʻp modda va energiya olinadi — inson faoliyati sayyoraning qiyofasini tobora kuchliroq oʻzgartirmoqda.",
      easy: "600 mln → 7,5 mlrd kishi; taʼsir ham kuchaymoqda.",
      draw: [
        { t: 'title', text: 'Yer aholisi' },
        { t: 'bars', x: 6, y: 18, w: 60, h: 38, items: [{ label: 'XVIII asr', value: 0.6 }, { label: 'hozir', value: 7.5 }] },
        { t: 'text', x: 70, y: 40, text: 'mlrd kishi', size: 's' }
      ],
      next: 'Taʼsir usullari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Inson taʼsiri: shaharlar, sanoat va qishloq xoʻjaligi uchun tabiiy biogeotsenozlarni tubdan oʻzgartirish; suv, havo va tuproqni chiqindilar bilan ifloslantirish; oʻrmonlarni kesish; yovvoyi hayvonlarni qirish. Polietilen va plastmassa kabi sunʼiy moddalarni hatto bakteriya va zamburugʻlar ham parchalay olmaydi — ular biosferada toʻplanadi. Turlarning yoʻqolish surʼati oldingidan bir necha baravar yuqori.",
      easy: "Biogeotsenozlar buzilishi, ifloslanish, plastik toʻplanishi, turlar yoʻqolishi.",
      draw: [
        { t: 'title', text: 'Salbiy taʼsirlar' },
        { t: 'list', x: 4, y: 20, items: ['biogeotsenozlar buzilishi', 'suv, havo, tuproq ifloslanishi', 'oʻrmonlar kesilishi', 'plastik — parchalanmaydi', 'turlar yoʻqolishi'] }
      ],
      next: 'Boyliklar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tabiiy boyliklar ikkiga boʻlinadi. Tugamaydiganlari — quyosh, shamol, dengiz toʻlqinlari energiyasi, atmosfera havosi. Tugaydiganlaridan oʻrnini toʻldirish mumkin boʻlganlari — oʻsimlik va hayvonot dunyosi, tuproq unumdorligi; oʻrnini toʻldirib boʻlmaydiganlari — foydali qazilmalar va yashash makoni.",
      easy: "Tiklanadigan: oʻsimlik, hayvon, tuproq; tiklanmaydigan: qazilmalar.",
      draw: [
        { t: 'title', text: 'Tabiiy boyliklar' },
        { t: 'table', x: 4, y: 20, rows: [['tugamaydigan', 'tiklanadigan', 'tiklanmaydigan'], ['quyosh, shamol', 'oʻsimliklar', 'foydali qazilmalar'], ['toʻlqin energiyasi', 'hayvonlar', 'yashash makoni'], ['atmosfera havosi', 'tuproq unumdorligi', '—']] }
      ],
      next: 'Oʻrmonlar va Orol'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Dastlab quruqlikning kamida 70 foizi oʻrmon edi, hozir uchdan bir qismidan kami. Oʻrmon kesilsa suv rejimi buziladi: yerosti suvlari kamayadi, daryolar sayozlashadi, tuproq yuviladi va shamolda nuraydi, zararkunandalar koʻpayadi. Amudaryo va Sirdaryo suvining katta qismi paxta va sholiga yoʻnaltirilgach, Orol dengizi toraydi, shoʻrligi oshdi, iqlim quruqlashdi, koʻp turlar yoʻqoldi.",
      easy: "Oʻrmon 70 % → 1/3 dan kam; Orol fojiasi — suvni sugʻorishga olish.",
      draw: [
        { t: 'title', text: 'Oʻrmon qoplami, %' },
        { t: 'bars', x: 6, y: 18, w: 50, h: 34, items: [{ label: 'dastlab', value: 70 }, { label: 'hozir', value: 30 }] },
        { t: 'text', x: 60, y: 30, text: 'Orol:', color: 'blue' },
        { t: 'text', x: 60, y: 40, text: 'shoʻrlanish', size: 's' },
        { t: 'text', x: 60, y: 48, text: 'iqlim quruqlashdi', size: 's' }
      ],
      next: 'Issiqxona taʼsiri'
    },
    {
      kind: 'example',
      clear: true,
      say: "Sanoat atmosferaga koʻp CO₂ chiqaradi, oʻsimliklar uning hammasini fotosintezga jalb eta olmaydi. Gaz toʻplanib, issiqxona taʼsirini keltirib chiqaradi: harorat oshadi, Arktika va Antarktika muzliklari eriydi, okean sathi koʻtarilishi kutilmoqda. Yechim — tabiatdan oqilona foydalanish: kamchiqindili va chiqindisiz texnologiyalar, zararkunandalarga qarshi biologik usullar, quyosh, shamol, toʻlqin energiyasi, bioyoqilgʻi.",
      easy: "CO₂ → issiqxona taʼsiri → muzlar erishi; yechim — oqilona foydalanish.",
      draw: [
        { t: 'title', text: 'Issiqxona taʼsiri' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 28, h: 8, text: 'ortiqcha CO₂', color: 'ink' },
        { t: 'box', id: 'b', x: 36, y: 20, w: 28, h: 8, text: 'isish', color: 'red' },
        { t: 'box', id: 'c', x: 68, y: 20, w: 28, h: 8, text: 'muzlar erishi', color: 'blue' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'list', x: 4, y: 40, items: ['chiqindisiz texnologiya', 'quyosh, shamol energiyasi', 'biologik kurash usullari'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Aholi 600 mln dan 7,5 mlrd ga oʻsdi; inson biogeotsenozlarni buzadi, muhitni ifloslantiradi, turlarni yoʻq qiladi, plastik biosferada toʻplanadi.',
    'Boyliklar: tugamaydigan (quyosh, shamol), tiklanadigan (oʻsimlik, hayvon, tuproq) va tiklanmaydigan (foydali qazilmalar).',
    'Oʻrmonlar kesilishi va Orol fojiasi — notoʻgʻri foydalanish oqibati; CO₂ issiqxona taʼsirini keltiradi; yechim — tabiatdan oqilona foydalanish.'
  ],
  questions: [
    {
      id: 'b33q1',
      prompt: 'Tabiiy boylikni guruhiga ajrating.',
      hint: 'Qazilmalar qayta paydo boʻlmaydi.',
      explanation: 'Tugamaydigan: quyosh, shamol energiyasi. Tiklanadigan: oʻrmon, tuproq unumdorligi. Tiklanmaydigan: neft, koʻmir.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'u', label: 'Tugamaydigan' },
            { id: 't', label: 'Tiklanadigan' },
            { id: 'n', label: 'Tiklanmaydigan' }
          ],
          items: [
            { emoji: '', label: 'quyosh energiyasi', bin: 'u' },
            { emoji: '', label: 'shamol energiyasi', bin: 'u' },
            { emoji: '', label: 'oʻrmon', bin: 't' },
            { emoji: '', label: 'tuproq unumdorligi', bin: 't' },
            { emoji: '', label: 'neft', bin: 'n' },
            { emoji: '', label: 'koʻmir', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'b33q2',
      prompt: 'Biosfera evolutsiyasining dastlabki bosqichlarida quruqlikning kamida necha foizi oʻrmon bilan qoplangan edi?',
      hint: 'Hozir — uchdan birdan kam.',
      explanation: 'Kamida 70 %.',
      widget: { type: 'number_answer', props: { answer: 70, unit: '%' } }
    },
    {
      id: 'b33q3',
      prompt: 'Oʻrmon kesilishi oqibatlarini tanlang.',
      hint: 'Suv rejimi buziladi.',
      explanation: 'Yerosti suvlari kamayadi, daryolar sayozlashadi, tuproq yemiriladi, zararkunandalar koʻpayadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'yerosti suvlari kamayadi', correct: true },
            { label: 'daryolar sayozlashadi', correct: true },
            { label: 'tuproq yemiriladi', correct: true },
            { label: 'zararkunandalar koʻpayadi', correct: true },
            { label: 'havo changdan yaxshi tozalanadi' }
          ]
        }
      }
    },
    {
      id: 'b33q4',
      prompt: 'Issiqxona taʼsiri zanjirini tartiblang.',
      hint: 'Sababdan oqibatga.',
      explanation: 'Sanoat CO₂ chiqaradi → gaz atmosferada toʻplanadi → harorat oshadi → muzliklar eriydi.',
      widget: { type: 'step_order', props: { steps: ['sanoat koʻp CO₂ chiqaradi', 'CO₂ atmosferada toʻplanadi', 'Yer harorati oshadi', 'qutb muzliklari eriydi'] } }
    },
    {
      id: 'b33q5',
      prompt: 'Orol dengizining qurishiga asosiy sabab nima?',
      hint: 'Amudaryo va Sirdaryo.',
      explanation: 'Daryolar suvining katta qismi paxta va sholi maydonlarini sugʻorishga yoʻnaltirilgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['zilzilalar', 'daryo suvlarining sugʻorishga olinishi', 'muzliklar erishi', 'vulqonlar'], answerIndex: 1 } }
    },
    {
      id: 'b33q6',
      prompt: 'Nima uchun polietilen va plastmassa biosferada toʻplanadi?',
      hint: 'Redutsentlar.',
      explanation: 'Ularni bakteriyalar va zamburugʻlar parchalay olmaydi — biologik aylanishga jalb etilmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ular juda ogʻir', 'redutsentlar ularni parchalay olmaydi', 'ular suvda eriydi', 'oʻsimliklar ularni yutadi'], answerIndex: 1 } }
    },
    {
      id: 'b33q7',
      prompt: 'Qaysi biri tabiatdan oqilona foydalanish usuli emas?',
      hint: 'Uchtasi muhitni asraydi.',
      explanation: 'Oʻrmonlarni yoppasiga kesish oqilona foydalanish emas.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'chiqindisiz texnologiya' }, { text: 'shamol energiyasi' }, { text: 'biologik kurash usuli' }, { text: 'oʻrmonni yoppasiga kesish', odd: true }] } }
    },
    {
      id: 'b33q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Inson taʼsiri ijobiy ham boʻlishi mumkin.',
      explanation: 'Inson taʼsiri ijobiy ham, salbiy ham boʻlishi mumkin; kamchiqindili texnologiya xomashyodan toʻliq foydalanadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Inson taʼsiri ijobiy ham, salbiy ham boʻlishi mumkin.', value: true },
            { text: 'Kamchiqindili texnologiya xomashyo va chiqindilardan toʻliq foydalanadi.', value: true },
            { text: 'Foydali qazilmalar tiklanadigan boylikka kiradi.', value: false },
            { text: 'Hozir turlar yoʻqolish surʼati oldingidan past.', value: false }
          ]
        }
      }
    }
  ]
};
