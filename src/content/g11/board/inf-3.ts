import type { BoardLesson } from './types';

/** Darslik: 1.04 — maʼlumotni kodlash: ikkilik kod, ASCII, rastr tasvir, RLE, siqish, tovush. */
export const INF_3: BoardLesson = {
  n: 3,
  label: '3',
  part: 10,
  title: 'Ikkilik kod, ASCII va siqish',
  section: '1.04',
  steps: [
    {
      kind: 'hook',
      say: "Kompyuter matnni ham, rasmni ham, musiqani ham bizdek koʻrmaydi. U faqat ikki holatni biladi: tok bor yoki yoʻq, yaʼni bir yoki nol. Bitta shunday belgi — bit, sakkiz bit — bir bayt. Har bir bitning oʻz qiymati bor: 128, 64, 32 va hokazo, oxirgisi — bir. 13 sonini yozish uchun 8, 4 va 1 ni yoqamiz: 8 qoʻshuv 4 qoʻshuv 1 — 13.",
      easy: "Bit — chiroq kabi: yoniq boʻlsa 1, oʻchiq boʻlsa 0. Sakkizta chiroq — bir bayt. Yoniq chiroqlarning qiymatlarini qoʻshsak, son chiqadi: 8 + 4 + 1 = 13.",
      draw: [],
      animTitle: '13 sonining ikkilik kodi',
      anim: { type: 'bits', number: 13 },
      next: 'Davom eting'
    },
    {
      kind: 'explain',
      say: "Matn ham son orqali saqlanadi. ASCII jadvalida har bir belgining oʻz raqami bor: katta A harfi — 65, kichik a — 97. Masalan, «UZ» soʻzi: U harfi — 85, Z harfi — 90. Kompyuter bu sonlarni ikkilik kodga aylantirib saqlaydi. Oddiy ASCII da 256 tagacha belgi bor. Oʻzbek, rus, xitoy harflari va emojilar uchun esa kattaroq jadval — Unicode ishlatiladi.",
      easy: "Har bir harfning raqami bor: A — 65, B — 66. Kompyuter raqamni bir va nollarga aylantiradi. Koʻp tillar va emojilar uchun Unicode degan katta jadval bor.",
      draw: [],
      animTitle: 'ASCII: harf ➜ son ➜ bitlar',
      anim: { type: 'bits', text: 'UZ' },
      next: 'Rasm-chi?'
    },
    {
      kind: 'explain',
      say: "Rasm — piksellar toʻri. Har bir pikselning rangi ham son bilan saqlanadi. Bir piksel uchun nechta bit ajratilgani rang chuqurligi deyiladi. 1 bit — faqat oq va qora. 8 bit — 256 xil rang. 24 bit — 16 milliondan ortiq rang. Bit qancha koʻp boʻlsa, rasm shuncha chiroyli, lekin fayl ham shuncha katta boʻladi.",
      easy: "Rasm mayda kvadratchalardan — piksellardan iborat. Har bir pikselga koʻproq bit bersak, koʻproq rang chiqadi, lekin fayl kattalashadi.",
      draw: [],
      animTitle: 'Rang chuqurligi',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '⬛', title: '1 bit', text: '2 rang: oq va qora (monoxrom)' },
          { icon: '🎨', title: '8 bit', text: '256 xil rang' },
          { icon: '🌈', title: '24 bit', text: '16 milliondan ortiq rang' }
        ]
      },
      next: 'Fayl katta boʻlsa-chi?'
    },
    {
      kind: 'example',
      say: "Fayl hajmini kamaytirish — siqish deyiladi. Eng oddiy usullardan biri — RLE, yaʼni ketma-ket takrorlarni sanash. Har bir pikselni alohida yozish oʻrniga «nechta va qaysi rang» deb yozamiz. Masalan, yonma-yon sakkizta qizil piksel — «8 qizil». Mana bu yurak rasmida qanday siqilishini kuzating.",
      easy: "Bir xil rangdagi piksellar ketma-ket kelsa, ularni bittalab yozmaymiz, «8 ta qizil» deb yozamiz. Shu bilan joy tejaladi.",
      draw: [],
      animTitle: 'RLE siqish',
      anim: { type: 'rle', rows: ['WRRWWRRW', 'RRRRRRRR', 'RRRRRRRR', 'WRRRRRRW', 'WWWRRWWW'] },
      next: 'Keyingisi'
    },
    {
      kind: 'explain',
      say: "Siqishning ikki turi bor. Yoʻqotishsiz siqishda fayl ochilganda asl holiga toʻliq qaytadi: ZIP arxivi, PNG rasmi, FLAC musiqasi. Yoʻqotishli siqishda koʻz va quloq sezmaydigan qismlar butunlay oʻchiriladi: JPG rasm, MP3 musiqa, MP4 video. Bunda fayl ancha kichrayadi, lekin sifat biroz pasayadi va asl holiga qaytarib boʻlmaydi.",
      easy: "Yoʻqotishsiz — hech narsa yoʻqolmaydi, xuddi chamadonni zichlab joylagandek. Yoʻqotishli — keraksiz deb hisoblangan qismlar tashlab yuboriladi: fayl kichik, lekin sifat biroz past.",
      draw: [],
      animTitle: 'Ikki xil siqish',
      anim: {
        type: 'compare',
        left: { icon: '📦', title: 'Yoʻqotishsiz', items: ['Asl holiga toʻliq qaytadi', 'Sifat oʻzgarmaydi', 'Fayl kamroq kichrayadi', 'ZIP, PNG, FLAC'] },
        right: { icon: '✂️', title: 'Yoʻqotishli', items: ['Baʼzi maʼlumot oʻchiriladi', 'Sifat biroz pasayadi', 'Fayl ancha kichrayadi', 'JPG, MP3, MP4'] }
      },
      next: 'Tovush qanday saqlanadi?'
    },
    {
      kind: 'example',
      say: "Tovush ham sonlarga aylanadi: mikrofon har soniyada koʻp marta tovush balandligini oʻlchaydi. Bu sempl tezligi deyiladi. CD sifatidagi musiqada soniyasiga 44 100 marta oʻlchanadi, oddiy telefon qoʻngʻirogʻiga 8 000 yetarli. Har bir oʻlchov uchun ajratilgan bitlar — bit chuqurligi, CD da 16 bit. Bit tezligi esa uchta sonni koʻpaytirib topiladi: sempl tezligi, bit chuqurligi va kanallar soni. CD uchun bu soniyasiga bir million 411 ming 200 bit.",
      easy: "Bit tezligi = sempl tezligi × bit chuqurligi × kanallar soni. CD: 44 100 × 16 × 2 = 1 411 200 bit har soniyada. Telefon: 8 000 × 8 × 1 = 64 000.",
      draw: [],
      animTitle: 'Bit tezligini hisoblaymiz',
      anim: {
        type: 'sheet',
        cols: ['Sempl, Hz', 'Bit', 'Kanal', 'Bit/s'],
        rows: [
          [44100, 16, 2, ''],
          [8000, 8, 1, '']
        ],
        steps: [
          { cell: 'D2', formula: '=A2*B2*C2', refs: ['A2', 'B2', 'C2'], result: 1411200 },
          { cell: 'D3', formula: '=A3*B3*C3', refs: ['A3', 'B3', 'C3'], result: 64000 }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Kompyuter hamma narsani bit (1 yoki 0) bilan saqlaydi; 8 bit = 1 bayt.',
    'ASCII da har bir belgining raqami bor (A = 65); koʻp tillar uchun Unicode.',
    'Rang chuqurligi: 1 bit — 2 rang, 8 bit — 256, 24 bit — 16 mln dan ortiq.',
    'RLE takrorlarni sanab siqadi; siqish yoʻqotishsiz (ZIP, PNG) yoki yoʻqotishli (JPG, MP3) boʻladi.',
    'Bit tezligi = sempl tezligi × bit chuqurligi × kanallar soni.'
  ],
  questions: [
    {
      id: 'i3q1',
      prompt: '13 sonini hosil qiling: kerakli bitlarni yoqing.',
      hint: '13 = 8 + 4 + 1',
      explanation: '13 = 8 + 4 + 1, shuning uchun 00001101.',
      widget: { type: 'bit_toggle', props: { target: 13 } }
    },
    {
      id: 'i3q2',
      prompt: 'Katta A harfining ASCII kodi 65. Uni bitlarda yozing.',
      hint: '65 = 64 + 1',
      explanation: '65 = 64 + 1, shuning uchun A harfi 01000001 boʻlib saqlanadi.',
      widget: { type: 'bit_toggle', props: { target: 65, char: 'A' } }
    },
    {
      id: 'i3q3',
      prompt: '00010110 ikkilik soni oʻnlikda nechaga teng?',
      hint: 'Yoniq bitlar: 16, 4 va 2.',
      explanation: '16 + 4 + 2 = 22.',
      widget: { type: 'number_answer', props: { answer: 22 } }
    },
    {
      id: 'i3q4',
      prompt: 'Qatorni RLE bilan siqing: W W W W B B B W W W (W — oq, B — qora). Har bir guruhni son va harf bilan yozing, masalan: 2W1B.',
      hint: 'Avval nechta oq, keyin nechta qora…',
      explanation: '4 ta oq, 3 ta qora, 3 ta oq: 4W3B3W.',
      widget: { type: 'text_answer', props: { before: 'RLE:', answer: ['4W3B3W', '4W 3B 3W', '4w3b3w'], width: 10 } }
    },
    {
      id: 'i3q5',
      prompt: 'CD musiqasi: sempl tezligi 44 100 Hz, 16 bit, 2 kanal. Bit tezligi soniyasiga necha bit?',
      hint: 'Uchta sonni koʻpaytiring.',
      explanation: '44 100 × 16 × 2 = 1 411 200 bit/s (taxminan 1411 kbit/s).',
      widget: { type: 'number_answer', props: { answer: 1411200, unit: 'bit/s' } }
    },
    {
      id: 'i3q6',
      prompt: 'Siqish turi boʻyicha ajrating.',
      hint: 'Asl holiga toʻliq qaytadimi?',
      explanation: 'ZIP, PNG, FLAC — yoʻqotishsiz. JPG, MP3, MP4 — yoʻqotishli.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'n', label: 'Yoʻqotishsiz' },
            { id: 'y', label: 'Yoʻqotishli' }
          ],
          tiles: [
            { id: 't1', label: 'ZIP', bin: 'n' },
            { id: 't2', label: 'JPG', bin: 'y' },
            { id: 't3', label: 'PNG', bin: 'n' },
            { id: 't4', label: 'MP3', bin: 'y' },
            { id: 't5', label: 'FLAC', bin: 'n' },
            { id: 't6', label: 'MP4', bin: 'y' }
          ]
        }
      }
    },
    {
      id: 'i3q7',
      prompt: 'Rang chuqurligini ranglar soni bilan juftlang.',
      hint: 'Har bir qoʻshimcha bit ranglar sonini ikki baravar oshiradi.',
      explanation: '1 bit — 2 rang, 8 bit — 256 rang, 24 bit — 16 milliondan ortiq rang.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: '1 bit' }, right: { label: '2 rang' } },
            { left: { label: '8 bit' }, right: { label: '256 rang' } },
            { left: { label: '24 bit' }, right: { label: '16 mln dan ortiq rang' } }
          ]
        }
      }
    },
    {
      id: 'i3q8',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Yoʻqotishli siqishda nima boʻladi?',
      explanation: 'Yoʻqotishli siqilgan fayl asl holiga qaytmaydi; bit chuqurligi oshsa sifat oshadi; Unicode ASCII dan koʻp belgini oʻz ichiga oladi; telefon qoʻngʻirogʻiga 8 kHz yetarli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'JPG faylni asl holiga toʻliq qaytarish mumkin.', value: false },
            { text: 'Bit chuqurligi oshsa, tovush sifati ham oshadi.', value: true },
            { text: 'Unicode ASCII ga qaraganda koʻproq belgini oʻz ichiga oladi.', value: true },
            { text: 'Telefon qoʻngʻirogʻi uchun 44,1 kHz sempl tezligi shart.', value: false }
          ]
        }
      }
    },
    {
      id: 'i3q9',
      prompt: 'Klaviaturada B tugmasi bosilgach nima sodir boʻladi? Tartiblang.',
      hint: 'Harf ➜ son ➜ bitlar.',
      explanation: 'Tugma bosiladi, ASCII kodi topiladi (66), u ikkilik kodga aylanadi va xotirada saqlanadi.',
      widget: {
        type: 'step_order',
        props: { steps: ['B tugmasi bosiladi', 'ASCII jadvalidan kodi topiladi: 66', 'Son ikkilik kodga aylanadi: 01000010', 'Bitlar xotirada saqlanadi'] }
      }
    },
    {
      id: 'i3q10',
      prompt: 'Bir baytda nechta bit bor?',
      hint: 'Sakkizta chiroq…',
      explanation: '1 bayt = 8 bit.',
      widget: { type: 'number_answer', props: { answer: 8, unit: 'bit' } }
    }
  ]
};
