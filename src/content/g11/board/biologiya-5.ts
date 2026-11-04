import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';
import { seg } from './phys';

/** Darslik: Biologiya 11, 5-§ (23–30-betlar) — yashash muhiti, adaptatsiya, toʻrt yashash muhiti, suv muhiti xususiyatlari, gidrofitlar, plankton, nekton, bentos. */
export const BIO_5: BoardLesson = {
  n: 5,
  label: '5',
  group: BOB2,
  title: 'Yashash muhiti. Suv muhiti',
  section: '5-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Baliqning suyri tanasi suvda oson harakatlanishga, kaktus poyasi va aloy barglari esa suv toʻplashga moslashgan. Organizmning muayyan muhitda yashashi va koʻpayishini taʼminlovchi belgilar — adaptatsiya, ya'ni moslanish deyiladi.",
      easy: "Adaptatsiya — muhitga moslanish belgilari.",
      draw: [
        { t: 'title', text: 'Moslanish' },
        { t: 'icon', x: 16, y: 34, emoji: '🐟', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🌵', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['baliq — suyri tana', 'kaktus — suv toʻplaydi', 'adaptatsiya — moslanish'] }
      ],
      next: 'Toʻrt muhit'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yer yuzida toʻrt xil yashash muhiti bor: suv, quruqlik-havo, tuproq va tirik organizm muhiti — u parazit va simbiontlar uchun. Hayot dastlab suvda paydo boʻlgan, keyin quruqlikka chiqqan, organizmlar faoliyati bilan tuproq hosil boʻlgan. Organizm va muhit birligi qonunini V. I. Vernadskiy kashf etgan.",
      easy: "Suv, quruqlik-havo, tuproq, tirik organizm — toʻrt muhit.",
      draw: [
        { t: 'title', text: 'Toʻrt yashash muhiti' },
        { t: 'icon', x: 12, y: 30, emoji: '🌊', size: 'm' },
        { t: 'icon', x: 52, y: 30, emoji: '🦅', size: 'm' },
        { t: 'icon', x: 12, y: 52, emoji: '🪱', size: 'm' },
        { t: 'icon', x: 52, y: 52, emoji: '🦠', size: 'm' },
        { t: 'text', x: 20, y: 32, text: 'suv' },
        { t: 'text', x: 60, y: 32, text: 'quruqlik-havo' },
        { t: 'text', x: 20, y: 54, text: 'tuproq' },
        { t: 'text', x: 60, y: 54, text: 'tirik organizm' }
      ],
      next: 'Suv xususiyatlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Suv — eng keng tarqalgan muhit, unda yashovchilar gidrobiontlar deyiladi. Suv zichligi havodan 700 marta katta — u tayanch boʻladi. Issiqlik sigʻimi katta: havo 10 gradusga isisa, suv atigi 1 gradusga isiydi, chuqurlikda harorat +4 gradus atrofida. Lekin suvda kislorod va yorugʻlik kam.",
      easy: "Zichlik ×700, harorat barqaror (+4 °C chuqurda), kislorod va yorugʻlik kam.",
      draw: [
        { t: 'title', text: 'Suv muhiti' },
        { t: 'list', x: 4, y: 20, items: ['zichlik — havodan 700 marta katta', 'havo +10 °C → suv +1 °C', 'chuqurlikda ≈ +4 °C', 'kislorod va yorugʻlik kam'] },
        { t: 'text', x: 4, y: 58, text: 'kislorod manbayi — suv oʻsimliklari fotosintezi', size: 's', color: 'blue' }
      ],
      next: 'Suv oʻsimliklari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Shoʻr suvlarda faqat suvoʻtlar oʻsadi: sayozda yashil, chuqurroqda qoʻngʻir, eng chuqurda qizil suvoʻtlar — qoʻshimcha pigmentlar kam yorugʻlikni ushlaydi. Suvdagi yuksak oʻsimliklar — gidrofitlar: mexanik toʻqima va ildizi kuchsiz, elodeyada ildiz yoʻq, organlarida havoli toʻqima — aerenxima bor.",
      easy: "Yashil — sayoz, qoʻngʻir — chuqurroq, qizil — eng chuqur; gidrofitlarda aerenxima.",
      draw: [
        { t: 'title', text: 'Suvoʻtlar qatlamlari' },
        ...seg('s0', 6, 24, 60, 24, 'blue'),
        { t: 'text', x: 8, y: 32, text: 'yashil suvoʻtlar', color: 'green' },
        { t: 'text', x: 8, y: 44, text: 'qoʻngʻir suvoʻtlar', color: 'orange' },
        { t: 'text', x: 8, y: 56, text: 'qizil suvoʻtlar', color: 'red' },
        ...seg('s1', 6, 62, 60, 62, 'ink'),
        { t: 'list', x: 64, y: 30, items: ['gidrofitlar', 'aerenxima', 'ildiz kuchsiz'] }
      ],
      next: 'Hayvon guruhlari'
    },
    {
      kind: 'example',
      clear: true,
      say: "Suv hayvonlari uch ekologik guruhga boʻlinadi. Plankton — oqim bilan suzib yuruvchilar: sodda hayvonlar, mayda qisqichbaqasimonlar, baliq chavoqlari. Nekton — oqimga qarshi faol suzuvchilar: baliqlar, kitlar, osminoglar. Bentos — suv tubida yashovchilar: molluskalar, krab, zuluk, kambala.",
      easy: "Plankton — oqim bilan, nekton — faol suzadi, bentos — tubda.",
      draw: [
        { t: 'title', text: 'Plankton, nekton, bentos' },
        { t: 'table', x: 4, y: 20, rows: [['guruh', 'qayerda', 'misol'], ['plankton', 'oqim bilan', 'dafniya, meduza'], ['nekton', 'faol suzadi', 'baliq, kit'], ['bentos', 'suv tubida', 'krab, kambala']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Adaptatsiya — organizmning muayyan muhitda yashashi va koʻpayishini taʼminlovchi belgilar; toʻrt muhit: suv, quruqlik-havo, tuproq, tirik organizm.',
    'Suv zich (havodan 700 marta), harorati barqaror, lekin kislorod va yorugʻlik kam; suvoʻtlar chuqurlik boʻyicha yashil → qoʻngʻir → qizil.',
    'Suv hayvonlari: plankton (oqim bilan), nekton (faol suzuvchi), bentos (suv tubida).'
  ],
  questions: [
    {
      id: 'b5q1',
      prompt: 'Hayvonni ekologik guruhiga ajrating.',
      hint: 'Kambala — suv tubida.',
      explanation: 'Plankton: dafniya, meduza. Nekton: choʻrtan, osminog. Bentos: kambala, krab.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'p', label: 'Plankton' },
            { id: 'n', label: 'Nekton' },
            { id: 'b', label: 'Bentos' }
          ],
          items: [
            { emoji: '', label: 'dafniya', bin: 'p' },
            { emoji: '', label: 'meduza', bin: 'p' },
            { emoji: '', label: 'choʻrtan', bin: 'n' },
            { emoji: '', label: 'osminog', bin: 'n' },
            { emoji: '', label: 'kambala', bin: 'b' },
            { emoji: '', label: 'krab', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'b5q2',
      prompt: 'Suvning zichligi havonikidan necha marta katta?',
      hint: 'Shuning uchun suv tayanch boʻladi.',
      explanation: 'Taxminan 700 marta.',
      widget: { type: 'number_answer', props: { answer: 700, unit: 'marta' } }
    },
    {
      id: 'b5q3',
      prompt: 'Suvoʻtlarni sayozdan chuqurga qarab tartiblang.',
      hint: 'Qizil — eng chuqurda.',
      explanation: 'Yashil → qoʻngʻir → qizil.',
      widget: { type: 'order_line', props: { items: [{ label: 'yashil suvoʻtlar' }, { label: 'qoʻngʻir suvoʻtlar' }, { label: 'qizil suvoʻtlar' }] } }
    },
    {
      id: 'b5q4',
      prompt: 'Suv havzasi chuqurligida harorat taxminan qancha?',
      hint: 'Suv eng zich boʻlgan harorat.',
      explanation: '+4 °C atrofida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0 °C', '+4 °C', '+15 °C', '−10 °C'], answerIndex: 1 } }
    },
    {
      id: 'b5q5',
      prompt: 'Gidrofitlarga xos belgilarni belgilang.',
      hint: 'Suv tayanch boʻladi.',
      explanation: 'Mexanik toʻqima va ildiz kuchsiz, ildiz tukchalari yoʻq, aerenxima rivojlangan.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'mexanik toʻqima kuchsiz', correct: true },
            { label: 'aerenxima — havoli toʻqima', correct: true },
            { label: 'ildiz tukchalari yoʻq', correct: true },
            { label: 'qalin poʻstloq' },
            { label: 'kuchli ildiz tizimi' }
          ]
        }
      }
    },
    {
      id: 'b5q6',
      prompt: 'Suvdagi kislorodning asosiy manbayi nima?',
      hint: 'Bir qismi atmosferadan ham keladi.',
      explanation: 'Suv oʻsimliklarining fotosintezi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['baliqlarning nafasi', 'suv oʻsimliklari fotosintezi', 'tuproq', 'vulqonlar'], answerIndex: 1 } }
    },
    {
      id: 'b5q7',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Gidro- — suv.',
      explanation: 'Gidrobiont — suvda yashovchi organizm; gidrofit — suvdagi yuksak oʻsimlik; adaptatsiya — moslanish; nekton — faol suzuvchilar.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'gidrobiont' }, b: { label: 'suvda yashovchi organizm' } },
            { a: { label: 'gidrofit' }, b: { label: 'suvdagi yuksak oʻsimlik' } },
            { a: { label: 'adaptatsiya' }, b: { label: 'moslanish' } },
            { a: { label: 'nekton' }, b: { label: 'faol suzuvchilar' } }
          ]
        }
      }
    },
    {
      id: 'b5q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Suv issiqlikni sekin oʻzgartiradi.',
      explanation: 'Havo 10 °C isisa suv 1 °C isiydi; hayot dastlab suvda paydo boʻlgan; suvda kislorod kam.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Hayot dastlab suv muhitida paydo boʻlgan.', value: true },
            { text: 'Havo 10 °C isisa, suv taxminan 1 °C isiydi.', value: true },
            { text: 'Suvda kislorod havodagidan koʻp.', value: false },
            { text: 'Shoʻr suvlarda gulli oʻsimliklar keng tarqalgan.', value: false }
          ]
        }
      }
    }
  ]
};
