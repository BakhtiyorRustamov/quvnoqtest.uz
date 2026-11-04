import type { BoardLesson } from './types';

/** Darslik: 11.08–11.17 — avtomatik tarjima, golografiya, kvant kriptografiyasi, robototexnika, QR kod, taqiladigan qurilmalar, ultra HD, koʻrishni yaxshilash, virtual reallik. */
export const INF_32: BoardLesson = {
  n: 32,
  label: '32',
  part: 11,
  title: 'Yangi texnologiyalar (2)',
  section: '11.08–11.17',
  steps: [
    {
      kind: 'hook',
      say: "Samarqandga kelgan yaponiyalik sayyoh oʻzbek tilini bilmaydi. U telefoniga yaponcha gapiradi, telefon esa oʻzbekcha aytib beradi: «Registon qayerda?». Sotuvchi oʻzbekcha javob beradi — telefon yaponchaga oʻgiradi. Bu avtomatik tarjima: nutqni tanish, matnga aylantirish, tarjima qilish va ovozga aylantirish — hammasi bir necha soniyada.",
      easy: "Avtomatik tarjima: gap ➜ matn ➜ boshqa tilga tarjima ➜ ovoz. Hammasi telefonning oʻzida, bir zumda.",
      draw: [],
      animTitle: 'Avtomatik ogʻzaki tarjima',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🎤', label: 'Nutq' },
          { icon: '📝', label: 'Matn' },
          { icon: '🌐', label: 'Tarjima' },
          { icon: '🔊', label: 'Ovoz' }
        ],
        items: [{ texts: ['🇯🇵 yaponcha savol', 'レギスタンはどこ？', 'Registon qayerda?', '🇺🇿 oʻzbekcha ovoz'] }],
        result: 'Tez va qulay, lekin maqol va hazilda adashishi mumkin'
      },
      next: 'Yana qanday texnologiyalar?'
    },
    {
      kind: 'explain',
      say: "Bir qancha yangi texnologiyalar. Robototexnika — zavodlarda payvandlash va yigʻish, omborlarda yuk tashish, kasalxonada jarrohlik robotlari, uyda robot changyutgich. QR kod — kvadrat shtrix-kod: shtrix-koddan koʻp maʼlumot sigʻadi — sayt manzili, toʻlov, Wi-Fi paroli. Taqiladigan qurilmalar — aqlli soat va bilaguzuk: yurak urishi, qadamlar va uyquni kuzatadi. Golografiya — havoda koʻrinadigan uch oʻlchamli tasvir va maʼlumotni hajm boʻylab saqlash.",
      easy: "Robotlar — zavod va kasalxonada. QR kod — koʻp maʼlumotli kvadrat kod. Aqlli soat — sogʻliqni kuzatadi. Golografiya — 3D tasvir.",
      draw: [],
      animTitle: 'Yangi texnologiyalar',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🤖', title: 'Robototexnika', text: 'Zavod, ombor, jarrohlik, uy' },
          { icon: '🔳', title: 'QR kod', text: 'Sayt, toʻlov, Wi-Fi paroli' },
          { icon: '⌚', title: 'Taqiladigan qurilmalar', text: 'Yurak urishi, qadamlar, uyqu' },
          { icon: '💠', title: 'Golografiya', text: 'Havoda 3D tasvir, hajmli xotira' }
        ]
      },
      next: 'Kvant kriptografiyasi-chi?'
    },
    {
      kind: 'example',
      say: "Kvant kriptografiyasi kalitni yorugʻlik zarrachalari — fotonlar bilan yuboradi. Fizika qonuniga koʻra, fotonni kuzatishning oʻzi uning holatini oʻzgartiradi. Shuning uchun agar kimdir yoʻlda kalitni ushlab qolishga urinsa, qabul qiluvchi buzilishni darhol sezadi va bu kalit tashlab yuboriladi. Bu bank va davlat aloqalari uchun juda kuchli himoya.",
      easy: "Kalit fotonlar bilan yuboriladi. Kimdir kuzatsa, fotonlar oʻzgaradi va oʻgʻri darhol aniqlanadi.",
      draw: [],
      animTitle: 'Kvant kriptografiyasi',
      anim: {
        type: 'net',
        nodes: [
          { id: 'a', x: 12, y: 24, icon: '🏦', label: 'Bank' },
          { id: 's', x: 50, y: 44, icon: '🕵️', label: 'Begona' },
          { id: 'b', x: 88, y: 24, icon: '🏢', label: 'Filial' }
        ],
        links: [
          ['a', 'b'],
          ['a', 's']
        ],
        packets: [
          { path: ['a', 's'], label: '✨ fotonlar', color: '#8b5cf6' },
          { path: ['s', 'b'], label: '⚠ holat oʻzgardi', color: '#ef4444' },
          { path: ['b', 'a'], label: 'Kalit buzildi — bekor', color: '#f59e0b' }
        ]
      },
      next: 'Ultra HD nima?'
    },
    {
      kind: 'example',
      say: "Ekranlar tobora aniqroq. HD — 1280 ga 720, taxminan 0,9 million piksel. Full HD — 1920 ga 1080, 2 million. Ultra HD yoki 4K — 3840 ga 2160, 8,3 million piksel — Full HD dan toʻrt marta koʻp. 8K da esa 33 milliondan ortiq. Piksel qancha koʻp boʻlsa, katta ekranda ham tasvir tiniq, lekin video fayllar ham shuncha katta boʻladi.",
      easy: "4K da Full HD dan 4 marta koʻp piksel: tasvir tiniqroq, lekin fayl kattaroq.",
      draw: [],
      animTitle: 'Piksellar soni (million)',
      anim: { type: 'chart', kind: 'bar', labels: ['HD', 'Full HD', '4K UHD', '8K'], values: [0.9, 2.1, 8.3, 33.2], unit: 'mln' },
      next: 'VR-chi?'
    },
    {
      kind: 'explain',
      say: "Virtual reallik — VR — foydalanuvchini toʻliq kompyuter yaratgan dunyoga olib kiradi: maxsus koʻzoynak koʻzni yopadi, bosh harakati sensorlar bilan kuzatiladi. Uchuvchilar, jarrohlar va oʻt oʻchiruvchilar mashqi, muzey va tarixiy joylarga virtual sayohat, oʻyinlar. AR esa haqiqiy dunyoni yopmaydi, faqat ustiga qatlam qoʻshadi. Koʻrishni yaxshilash texnologiyalari ham bor: zaif koʻruvchilar uchun tasvirni kattalashtiruvchi va rangini kuchaytiruvchi aqlli koʻzoynaklar.",
      easy: "VR — toʻliq virtual dunyo, koʻz yopiladi. AR — haqiqiy dunyo ustiga qoʻshimcha. Aqlli koʻzoynaklar zaif koʻruvchilarga yordam beradi.",
      draw: [],
      animTitle: 'VR va AR',
      anim: {
        type: 'compare',
        left: { icon: '🥽', title: 'Virtual reallik', items: ['Toʻliq virtual dunyo', 'Koʻz yopiladi', 'Bosh harakati kuzatiladi', 'Mashq, sayohat, oʻyin'] },
        right: { icon: '📱', title: 'Boyitilgan reallik', items: ['Haqiqiy dunyo koʻrinadi', 'Ustiga raqamli qatlam', 'Telefon yoki koʻzoynak', 'Navigatsiya, taʼlim, xarid'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Avtomatik tarjima: nutq ➜ matn ➜ tarjima ➜ ovoz; tez, lekin maqol va hazilda adashishi mumkin.',
    'Robototexnika, QR kod, taqiladigan qurilmalar, golografiya — kundalik hayotga kirib kelmoqda.',
    'Kvant kriptografiyasi fotonlar bilan kalit yuboradi: kuzatish izsiz qolmaydi.',
    'Ultra HD (4K) — 3840×2160, Full HD dan 4 marta koʻp piksel; 8K — yanada koʻp.',
    'VR — toʻliq virtual dunyo; AR — haqiqiy dunyo ustiga raqamli qatlam.'
  ],
  questions: [
    {
      id: 'i32q1',
      prompt: 'Texnologiyani qoʻllanishi bilan juftlang.',
      hint: 'Kim yoki nima uchun?',
      explanation: 'QR kod — toʻlov va sayt manzili; aqlli soat — yurak urishini kuzatish; jarrohlik roboti — aniq operatsiya; VR — uchuvchi mashqi.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'QR kod' }, right: { label: 'kassada telefon bilan toʻlov' } },
            { left: { label: 'Aqlli soat' }, right: { label: 'yurak urishini kuzatish' } },
            { left: { label: 'Jarrohlik roboti' }, right: { label: 'juda aniq operatsiya' } },
            { left: { label: 'Virtual reallik' }, right: { label: 'uchuvchining xavfsiz mashqi' } }
          ]
        }
      }
    },
    {
      id: 'i32q2',
      prompt: 'Avtomatik ogʻzaki tarjima bosqichlarini tartiblang.',
      hint: 'Ovozdan ovozgacha.',
      explanation: 'Nutq yoziladi ➜ matnga aylantiriladi ➜ tarjima qilinadi ➜ ovozga aylantiriladi.',
      widget: { type: 'step_order', props: { steps: ['Mikrofon nutqni yozib oladi', 'Nutq matnga aylantiriladi', 'Matn boshqa tilga tarjima qilinadi', 'Tarjima ovozga aylantiriladi'] } }
    },
    {
      id: 'i32q3',
      prompt: '3840 × 2160 ekranda necha piksel bor?',
      hint: 'Koʻpaytiring.',
      explanation: '3840 × 2160 = 8 294 400 piksel.',
      widget: { type: 'number_answer', props: { answer: 8294400, unit: 'piksel' } }
    },
    {
      id: 'i32q4',
      prompt: 'VR yoki AR?',
      hint: 'Haqiqiy dunyo koʻrinadimi?',
      explanation: 'Toʻliq yopiq koʻzoynak, virtual muzey, uchuvchi mashqi — VR. Kamerada yoʻl koʻrsatkich va xonada virtual divan — AR.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'v', label: 'VR' },
            { id: 'a', label: 'AR' }
          ],
          tiles: [
            { id: 't1', label: 'Koʻzni toʻliq yopuvchi koʻzoynak', bin: 'v' },
            { id: 't2', label: 'Kamerada yoʻl koʻrsatkich strelka', bin: 'a' },
            { id: 't3', label: 'Virtual muzey sayohati', bin: 'v' },
            { id: 't4', label: 'Xonaga virtual divan qoʻyib koʻrish', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'i32q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Fotonni kuzatish nima qiladi?',
      explanation: 'Kuzatish fotonni oʻzgartiradi; QR koʻproq maʼlumot saqlaydi; avtomatik tarjima maqollarda adashishi mumkin; 4K da piksel koʻp, fayl katta.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kvant kriptografiyasida kalitni yashirincha kuzatish sezilmaydi.', value: false },
            { text: 'QR kod oddiy shtrix-koddan koʻp maʼlumot saqlaydi.', value: true },
            { text: 'Avtomatik tarjima maqol va hazillarda adashishi mumkin.', value: true },
            { text: '4K video Full HD videodan kichikroq fayl boʻladi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i32q6',
      prompt: 'Taqiladigan qurilma nimalarni kuzatadi? Bosing.',
      hint: 'Aqlli soat va bilaguzuk.',
      explanation: 'Qadamlar, yurak urishi va uyqu. Xona harorati va kitob sahifalari — yoʻq.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Qadamlar soni', match: true },
            { id: 'b', text: 'Yurak urishi', match: true },
            { id: 'c', text: 'Uyqu sifati', match: true },
            { id: 'd', text: 'Kitob sahifalari', match: false }
          ]
        }
      }
    },
    {
      id: 'i32q7',
      prompt: 'Qaysi biri robot ishiga misol emas?',
      hint: 'Uchtasida mashina harakat qiladi.',
      explanation: 'Qogʻozga qoʻlda xat yozish — inson ishi. Zavodda payvandlash, omborda yuk tashish va changyutgich — robotlar.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Zavodda avtomobil payvandlash' }, { text: 'Omborda yuk tashish' }, { text: 'Robot changyutgich' }, { text: 'Qoʻlda xat yozish', odd: true }] } }
    },
    {
      id: 'i32q8',
      prompt: '4K da 8,3 mln, Full HD da taxminan 2,1 mln piksel. Taxminan necha marta koʻp?',
      hint: '8,3 : 2,1',
      explanation: '≈ 4 marta.',
      widget: { type: 'number_answer', props: { answer: 4, tolerance: 0.1, unit: 'marta' } }
    },
    {
      id: 'i32q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Yorugʻlik zarrachalari.',
      explanation: 'Kvant kriptografiyasida kalit fotonlar bilan yuboriladi; kuzatish ularning holatini oʻzgartiradi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Kvant kriptografiyasida kalit' }, { blank: 'fotonlar' }, { text: 'bilan yuboriladi. Ularni' }, { blank: 'kuzatish' }, { text: 'holatini oʻzgartiradi.' }],
          bank: ['fotonlar', 'kuzatish', 'kabellar']
        }
      }
    },
    {
      id: 'i32q10',
      prompt: 'Virtual reallikning qisqa nomi (2 harf).',
      hint: 'Virtual Reality',
      explanation: 'VR — Virtual Reality.',
      widget: { type: 'text_answer', props: { answer: 'VR', width: 4 } }
    }
  ]
};
