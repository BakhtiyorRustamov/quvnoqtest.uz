import type { BoardLesson } from './types';
import { BOB4 } from './fizika-23';
import { seg, vec } from './phys';

/** Darslik: Fizika 11, 27-mavzu (98–103-betlar) — yorugʻlik dispersiyasi, spektrlar, spektral analiz. */
export const FIZ_29: BoardLesson = {
  n: 29,
  label: '27',
  group: BOB4,
  title: 'Yorugʻlik dispersiyasi. Spektral analiz',
  section: '27-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yomgʻirdan keyin osmonda kamalak paydo boʻladi, botayotgan Quyosh qizarib koʻrinadi. 1666-yilda Isaak Nyuton qorongʻi xonada quyosh nurini shisha prizmadan oʻtkazdi va devorda rang-barang yoʻl — spektrni koʻrdi. Oq yorugʻlik aslida ranglar aralashmasi ekan!",
      easy: "Prizma oq nurni ranglarga ajratadi — Nyuton, 1666-yil.",
      draw: [
        { t: 'title', text: 'Kamalak sirri' },
        { t: 'icon', x: 16, y: 34, emoji: '🌈', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🔺', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['Nyuton, 1666-yil', 'prizma + quyosh nuri', 'devorda spektr'] }
      ],
      next: 'Prizmada spektr'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Prizmadan oʻtgan oq nur yetti rangga ajraladi: qizil, zargʻaldoq, sariq, yashil, zangori, koʻk va binafsha. Qizil nur eng kam, binafsha eng koʻp sinadi. Ikkinchi teskari prizma ranglarni yana oq nurga yigʻadi. Bu hodisa yorugʻlik dispersiyasi deyiladi.",
      easy: "Qizil kam sinadi, binafsha koʻp. Bu — dispersiya.",
      draw: [
        { t: 'title', text: 'Prizmada dispersiya' },
        { t: 'point', id: 'p1', x: 30, y: 58, hide: true },
        { t: 'point', id: 'p2', x: 50, y: 22, hide: true },
        { t: 'point', id: 'p3', x: 70, y: 58, hide: true },
        { t: 'polygon', points: ['p1', 'p2', 'p3'], color: 'ink' },
        ...vec('w', 4, 46, 40, 42, 'ink'),
        { t: 'text', x: 4, y: 40, text: 'oq nur', size: 's' },
        ...seg('in', 40, 42, 61, 44, 'ink'),
        ...seg('r', 61, 44, 92, 34, 'red'),
        ...seg('o', 61, 44, 92, 39, 'orange'),
        ...seg('g', 61, 44, 92, 45, 'green'),
        ...seg('b', 61, 44, 92, 51, 'blue'),
        ...seg('v', 61, 44, 92, 57, 'purple'),
        { t: 'text', x: 84, y: 30, text: 'qizil', color: 'red', size: 's' },
        { t: 'text', x: 80, y: 64, text: 'binafsha', color: 'purple', size: 's' }
      ],
      next: 'Nega shunday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yorugʻlik rangi chastotasiga bogʻliq: qizil nurning toʻlqin uzunligi taxminan 760 nanometr, binafshaniki 380 nanometr. Muhitda turli ranglar turli tezlikda tarqaladi, masalan suvda qizil 228 ming, binafsha 227 ming kilometr sekund. Sinish koʻrsatkichi n teng c boʻlinsin v, demak u rangga bogʻliq. Sinish koʻrsatkichining toʻlqin uzunligiga bogʻliqligi ham dispersiya deyiladi. Vakuumda dispersiya yoʻq.",
      easy: "n = c/v rangga bogʻliq — shuning uchun ranglar turlicha sinadi.",
      draw: [
        { t: 'title', text: 'Dispersiya sababi' },
        { t: 'formula', x: 6, y: 22, text: 'n = c / v' },
        { t: 'list', x: 6, y: 36, items: ['qizil λ ≈ 760 nm, binafsha ≈ 380 nm', 'suvda: v qizil > v binafsha', 'vakuumda dispersiya yoʻq'] }
      ],
      next: 'Spektr turlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Qizdirilgan jismlar uch xil spektr beradi. Tutash spektr — qattiq, suyuq jismlar va zich gazlardan, masalan choʻgʻlanma lampadan. Polosali spektr — molekulalardan. Chiziqli spektr — alohida atomlardan. Oq nur sovuq gazdan oʻtsa, tutash spektr fonida qora chiziqlar paydo boʻladi — bu yutilish spektri: gaz qanday nurni chiqarsa, xuddi shunday nurni yutadi.",
      easy: "Tutash, polosali, chiziqli spektrlar; yutilish spektri — qora chiziqlar.",
      draw: [
        { t: 'title', text: 'Spektr turlari' },
        {
          t: 'table',
          x: 6,
          y: 22,
          rows: [
            ['spektr', 'manbasi'],
            ['tutash', 'qattiq, suyuq jism, zich gaz'],
            ['polosali', 'molekulalar'],
            ['chiziqli', 'alohida atomlar (siyrak gaz)'],
            ['yutilish', 'sovuq gaz orqali oq nur']
          ]
        }
      ],
      next: 'Spektral analiz'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Har bir kimyoviy elementning spektri barmoq izi kabi faqat oʻziga xos. Moddaning tarkibini spektri boʻyicha aniqlash spektral analiz deyiladi — buning uchun 10 ning minus 10 darajasi gramm modda yetarli! Spektral analiz bilan Quyosh va yulduzlar tarkibi aniqlangan. Geliy avval Quyoshda topilgan, nomi «quyoshli» degani. Ranglar haqida: qizil, yashil va zangori qoʻshilsa, oq rang chiqadi — ekranlar shunga asoslangan.",
      easy: "Har elementning spektri oʻziga xos — spektral analiz; geliy Quyoshda topilgan.",
      draw: [
        { t: 'title', text: 'Spektral analiz' },
        { t: 'icon', x: 14, y: 32, emoji: '🔭', size: 'l' },
        { t: 'list', x: 28, y: 24, items: ['har element — oʻz spektri', '10⁻¹⁰ g modda yetarli', 'geliy — avval Quyoshda', 'qizil + yashil + zangori = oq'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ikki tomoni radiusi 1 metrli linzaning sinish koʻrsatkichi qizil nur uchun 1,5, binafsha uchun 1,52. Fokus masofasi F teng R boʻlinsin 2 karra n minus 1. Qizil uchun 1 metr, binafsha uchun 1 boʻlinsin 1,04 — 0,962 metr. Farqi taxminan 3,8 santimetr.",
      easy: "F = R/(2(n − 1)): 1 m va 0,962 m, farq ≈ 3,8 cm.",
      draw: [
        { t: 'title', text: 'Rangli fokuslar' },
        { t: 'formula', x: 6, y: 22, text: 'F = R / (2(n − 1))' },
        { t: 'list', x: 6, y: 36, items: ['qizil: F = 1 / (2 · 0,5) = 1 m', 'binafsha: F = 1 / (2 · 0,52) ≈ 0,962 m'] },
        { t: 'formula', x: 6, y: 58, text: 'ΔF ≈ 3,8 cm' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Oq yorugʻlik prizmada yetti rangga ajraladi: qizil eng kam, binafsha eng koʻp sinadi — dispersiya.',
    'Sabab: sinish koʻrsatkichi n = c/v toʻlqin uzunligiga bogʻliq; vakuumda dispersiya yoʻq.',
    'Spektrlar: tutash, polosali, chiziqli, yutilish; har element spektri oʻziga xos — spektral analiz.'
  ],
  questions: [
    {
      id: 'f29q1',
      prompt: 'Suvning sinish koʻrsatkichi 1,33. Suvda yorugʻlik tezligi necha ming km/s? (butun songacha)',
      hint: 'v = c / n.',
      explanation: '300 000 / 1,33 ≈ 225 600 km/s ≈ 226 ming km/s.',
      widget: { type: 'number_answer', props: { answer: 225.6, tolerance: 1.5, unit: 'ming km/s' } }
    },
    {
      id: 'f29q2',
      prompt: 'Linza ikki tomoni R = 0,5 m, qizil nur uchun n = 1,5. Fokus masofasi necha m?',
      hint: 'F = R/(2(n − 1)).',
      explanation: '0,5 / (2 · 0,5) = 0,5 m.',
      widget: { type: 'number_answer', props: { answer: 0.5, tolerance: 0.001, unit: 'm' } }
    },
    {
      id: 'f29q3',
      prompt: 'Prizmada qaysi rang eng koʻp sinadi?',
      hint: 'Toʻlqin uzunligi eng kichigi.',
      explanation: 'Binafsha nur eng koʻp sinadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qizil', 'sariq', 'yashil', 'binafsha'], answerIndex: 3 } }
    },
    {
      id: 'f29q4',
      prompt: 'Spektr ranglarini toʻlqin uzunligi kamayishi tartibida joylang.',
      hint: 'Qizildan boshlang.',
      explanation: 'Qizil → zargʻaldoq → sariq → yashil → koʻk → binafsha.',
      widget: { type: 'order_line', props: { items: [{ label: 'qizil' }, { label: 'zargʻaldoq' }, { label: 'sariq' }, { label: 'yashil' }, { label: 'koʻk' }, { label: 'binafsha' }] } }
    },
    {
      id: 'f29q5',
      prompt: 'Manbani spektr turi bilan moslang.',
      hint: 'Alohida atomlar — chiziqlar.',
      explanation: 'Choʻgʻlanma lampa — tutash; siyrak atomar gaz — chiziqli; molekulalar — polosali.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'choʻgʻlanma lampa', right: 'tutash spektr' },
            { left: 'siyrak atomar gaz', right: 'chiziqli spektr' },
            { left: 'molekulalar', right: 'polosali spektr' }
          ]
        }
      }
    },
    {
      id: 'f29q6',
      prompt: 'Qizil va yashil yorugʻlik qoʻshilsa, qanday rang hosil boʻladi?',
      hint: 'Ekranlardagi rang qoʻshish.',
      explanation: 'Sariq rang.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qoramtir', 'sariq', 'havorang', 'koʻk'], answerIndex: 1 } }
    },
    {
      id: 'f29q7',
      prompt: 'Qaysi element avval Quyoshda spektral analiz yordamida topilgan?',
      hint: 'Nomi «quyoshli».',
      explanation: 'Geliy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['vodorod', 'geliy', 'seziy', 'rubidiy'], answerIndex: 1 } }
    },
    {
      id: 'f29q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Vakuumda hamma rang bir xil tezlikda.',
      explanation: 'Vakuumda dispersiya yoʻq; gaz qanday nur chiqarsa, shuni yutadi; muhitda qizil nur binafshadan tezroq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Vakuumda yorugʻlik dispersiyasi kuzatilmaydi.', value: true },
            { text: 'Gaz qizigan holda qanday chastotali nur chiqarsa, xuddi shunday nurni yutadi.', value: true },
            { text: 'Shishada binafsha nur qizildan tezroq tarqaladi.', value: false },
            { text: 'Oq rang — eng oddiy, bir rangli yorugʻlik.', value: false }
          ]
        }
      }
    }
  ]
};
