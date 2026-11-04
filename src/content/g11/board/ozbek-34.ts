import type { BoardLesson } from './types';

export const OZG4 = { kicker: 'Ona tili · III fasl', title: 'Barqaror birikmalar' };

/** Darslik: Ona tili 11, 2-qism (2020), 13-mavzu (48–50-betlar) — soʻz va ibora teng emas: iboraning boʻyoqdorligi, sinonim, antonim va omonim iboralar. */
export const OZ_34: BoardLesson = {
  n: 34,
  label: '34',
  group: OZG4,
  title: 'Soʻz va ibora teng emas',
  section: 'Ona tili, 2-qism: 13-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Soʻzlar uslubiy boʻyoqli yoki boʻyoqsiz boʻladi, iboralar esa har doim boʻyoqdor. Ibora tushuncha jihatidan soʻzga teng, lekin boʻyoqdorligi tufayli bu tenglik buziladi — shuning uchun iborani har doim ham soʻz bilan almashtirib boʻlmaydi. Iboraning boshqa tilda aynan muqobili boʻlmaydi, oʻzlashma ibora ham boʻlmaydi. Iboralar ham sinonim, antonim va omonim boʻladi: «yerga urmoq» — «koʻkka koʻtarmoq» zid; «dam berildi» — dam olishga ruxsat yoki gʻildirakka havo.",
      easy: "Ibora — doim taʼsirli. «Xursand boʻldi» va «doʻppisini osmonga otdi» bir xil emas.",
      draw: [
        { t: 'title', text: 'Soʻz va ibora' },
        { t: 'table', x: 4, y: 18, rows: [['soʻz', 'ibora'], ['xursand boʻlmoq', 'doʻppisini osmonga otmoq'], ['juda charchamoq', 'qora terga botmoq'], ['tez', 'koʻz ochib yumguncha']] },
        { t: 'text', x: 4, y: 46, text: 'zid iboralar: yerga urmoq — koʻkka koʻtarmoq', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 54, text: 'zid iboralar: yuragi keng — yuragi tor', size: 's', color: 'purple' }
      ],
      next: 'Tayyorman!'
    }
  ],
  summary: [
    'Soʻzlar boʻyoqli yoki boʻyoqsiz boʻladi, iboralar esa doim boʻyoqdor — shuning uchun ular soʻzga toʻla teng emas.',
    'Iboraning boshqa tilda aynan muqobili yoʻq, oʻzlashma ibora boʻlmaydi.',
    'Iboralar sinonim (koʻz ochib yumguncha — hash-pash deguncha), antonim (yuragi keng — yuragi tor) va omonim boʻladi.'
  ],
  questions: [
    {
      id: 'oz34q1',
      prompt: 'Soʻz va iborani juftlang.',
      hint: 'Doʻppisini osmonga otmoq — juda xursand.',
      explanation: 'Xursand boʻlmoq — doʻppisini osmonga otmoq; juda charchamoq — qora terga botmoq; tez — koʻz ochib yumguncha.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'xursand boʻlmoq', right: 'doʻppisini osmonga otmoq' },
            { left: 'juda charchamoq', right: 'qora terga botmoq' },
            { left: 'tez', right: 'koʻz ochib yumguncha' }
          ]
        }
      }
    },
    {
      id: 'oz34q2',
      prompt: 'Iborani nima uchun har doim soʻz bilan almashtirib boʻlmaydi?',
      hint: 'Boʻyoq.',
      explanation: 'Ibora doim boʻyoqdor — soʻz bu taʼsirni bermaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ibora doim boʻyoqdor', 'ibora uzunroq', 'ibora chet tildan kelgan', 'ibora rasmiy'], answerIndex: 0 } }
    },
    {
      id: 'oz34q3',
      prompt: 'Zid maʼnoli iboralarni juftlang.',
      hint: 'Keng — tor.',
      explanation: 'Yerga urmoq — koʻkka koʻtarmoq; yuragi keng — yuragi tor; jagʻi tinmadi — ogʻziga mum solgan.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'yerga urmoq', right: 'koʻkka koʻtarmoq' },
            { left: 'yuragi keng', right: 'yuragi tor' },
            { left: 'jagʻi tinmadi', right: 'ogʻziga mum solgan' }
          ]
        }
      }
    },
    {
      id: 'oz34q4',
      prompt: '«Askarlarga dam berildi» va «Ballonga dam berildi» gaplaridagi iboralar qanday?',
      hint: 'Shakli bir, maʼnosi boshqa.',
      explanation: 'Omonim iboralar: biri — dam olishga ruxsat, ikkinchisi — havo yuborish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['omonim', 'sinonim', 'antonim', 'bir xil maʼnoli'], answerIndex: 0 } }
    },
    {
      id: 'oz34q5',
      prompt: 'Iboralar haqidagi toʻgʻri fikrlarni tanlang.',
      hint: 'Kitobdagi nazariya.',
      explanation: 'Ibora doim boʻyoqdor, oʻzlashma ibora boʻlmaydi, koʻp qoʻllash nutqiy salohiyatni koʻrsatadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ibora doim boʻyoqdor', correct: true },
            { label: 'oʻzlashma ibora boʻlmaydi', correct: true },
            { label: 'iboralarni koʻp qoʻllash — nutqiy salohiyat belgisi', correct: true },
            { label: 'har bir iboraning ingliz tilida aynan muqobili bor' }
          ]
        }
      }
    },
    {
      id: 'oz34q6',
      prompt: '«Nomi ulugʻ, suprasi quruq» iborasi kim haqida aytiladi?',
      hint: 'Supra — xamir yoyiladigan dasturxon.',
      explanation: 'Nomi baland, lekin aslida hech narsasi yoʻq kishi haqida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['nomi baland, lekin hech narsasi yoʻq kishi', 'juda boy kishi', 'novvoy', 'kamtar olim'], answerIndex: 0 } }
    }
  ]
};
