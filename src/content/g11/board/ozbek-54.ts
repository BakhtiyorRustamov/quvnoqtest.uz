import type { BoardLesson } from './types';
import { OZG8 } from './ozbek-47';

/** Darslik: Adabiyot 11, I qism (2018), 161–175-betlar — Bobur lirikasi: gʻazal va ruboiylar. */
export const OZ_54: BoardLesson = {
  n: 54,
  label: '54',
  group: OZG8,
  title: 'Bobur lirikasi',
  section: 'Adabiyot, 1-qism: Bobur gʻazallari va ruboiylari; Bobur lirikasi',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Bobur lirikasida gʻazal va ruboiy yetakchi oʻrin tutadi; gʻazallarining koʻpi 5–6 baytli. U sheʼr tilini soddalashtirib, ogʻzaki nutqqa yaqinlashtirgan: qofiyalari koʻpincha feʼllardan tuzilgan. «Xazon yaprogʻi yangligʻ» gʻazalida ayriliq kuz bilan bogʻlanadi — mumtoz sheʼrda visol bahor, hijron esa xazon timsoli; unda tanosub sanʼati yorqin. Navoiydan keyin gʻazalni ijtimoiy ohanglar bilan boyitgan shoir ham Boburdir: koʻp sheʼrlari hasbi hol — oʻz hayoti haqida. Ruboiylarida Vatan sogʻinchi, gʻurbat, hijron mavzulari, mardlik va ezgulikka daʼvat yetakchi.",
      easy: "Bobur gʻazal va ruboiylarida oʻz hayotini, Vatan sogʻinchini sodda va samimiy tilda yozgan.",
      draw: [
        { t: 'title', text: 'Bobur lirikasi belgilari' },
        { t: 'list', x: 6, y: 18, items: ['sodda, ogʻzaki nutqqa yaqin til', 'hasbi hol — oʻz hayoti haqida', 'Vatan sogʻinchi, gʻurbat, hijron'] },
        { t: 'text', x: 4, y: 54, text: 'Xazon yaprogʻi yangligʻ gul yuzung hajrida sargʻardim,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 60, text: 'Koʻrub rahm aylagil, ey lolarux, bu chehrayi zardim.', size: 's', color: 'purple' }
      ],
      next: 'Savollarga oʻtamiz'
    }
  ],
  summary: [
    'Bobur lirikasida gʻazal va ruboiy yetakchi; tili sodda, ogʻzaki nutqqa yaqin, qofiyalari koʻpincha feʼllar.',
    '«Xazon yaprogʻi yangligʻ» gʻazalida ayriliq kuz timsoli orqali beriladi, tanosub sanʼati yorqin.',
    'Sheʼrlari koʻpincha hasbi hol: Vatan sogʻinchi, gʻurbat, mardlik va ezgulikka daʼvat yetakchi.'
  ],
  questions: [
    {
      id: 'oz54q1',
      prompt: 'Bobur lirikasida qaysi janrlar yetakchi?',
      hint: 'Ikki janr.',
      explanation: 'Gʻazal va ruboiy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['gʻazal va ruboiy', 'doston va qasida', 'marsiya va qoʻshiq', 'masal va hikoya'], answerIndex: 0 } }
    },
    {
      id: 'oz54q2',
      prompt: 'Bobur gʻazallarining katta qismi necha baytdan iborat?',
      hint: 'Besh yoki olti.',
      explanation: 'Gʻazallarining katta qismi 5–6 baytli.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['5–6 bayt', '12–15 bayt', '2–3 bayt', '20 baytdan ortiq'], answerIndex: 0 } }
    },
    {
      id: 'oz54q3',
      prompt: '«Xazon yaprogʻi yangligʻ» gʻazalida ayriliq qaysi fasl bilan bogʻlanadi?',
      hint: 'Xazon.',
      explanation: 'Kuz bilan — mumtoz sheʼrda visol bahor, hijron kuz timsoli.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kuz', 'bahor', 'yoz', 'qish'], answerIndex: 0 } }
    },
    {
      id: 'oz54q4',
      prompt: '«Hasbi hol» nimani anglatadi?',
      hint: 'Shoirning oʻzi haqida.',
      explanation: 'Shoirning oʻz hayoti va kechinmalari haqidagi sheʼr.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['shoirning oʻz hayoti haqidagi sheʼr', 'tabiat tasviri', 'boshqa shoirga javob', 'tarixiy voqea bayoni'], answerIndex: 0 } }
    },
    {
      id: 'oz54q5',
      prompt: 'Bobur sheʼr tilini nima qilgan?',
      hint: 'Feʼl qofiyalar.',
      explanation: 'Soddalashtirib, ogʻzaki nutqqa yaqinlashtirgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['soddalashtirib, ogʻzaki nutqqa yaqinlashtirgan', 'arab soʻzlari bilan murakkablashtirgan', 'faqat forsiyga oʻtkazgan', 'qofiyadan voz kechgan'], answerIndex: 0 } }
    },
    {
      id: 'oz54q6',
      prompt: 'Bobur ruboiylaridagi mavzularni belgilang.',
      hint: 'Uzoq yurtda yozilgan.',
      explanation: 'Vatan sogʻinchi, gʻurbat va hijron, mardlik, yaxshilikka daʼvat.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Vatan sogʻinchi', correct: true },
            { label: 'gʻurbat va hijron', correct: true },
            { label: 'yaxshilikka daʼvat', correct: true },
            { label: 'zamonaviy texnika' }
          ]
        }
      }
    },
    {
      id: 'oz54q7',
      prompt: 'Timsolni maʼnosi bilan juftlang.',
      hint: 'Mumtoz sheʼr.',
      explanation: 'Bahor — visol, shodlik; xazon — ayriliq; gurbat — yurtdan uzoqlik.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'bahor', right: 'visol va shodlik' },
            { left: 'xazon yaprogʻi', right: 'ayriliq, sargʻayish' },
            { left: 'gʻurbat', right: 'yurtdan uzoqlik' }
          ]
        }
      }
    },
    {
      id: 'oz54q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Navoiydan keyin.',
      explanation: 'Navoiydan keyin gʻazalni ijtimoiy ohanglar bilan boyitgan Bobur; lirikasida hayotsevarlik ustun.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Navoiydan keyin gʻazalni ijtimoiy ohanglar bilan boyitgan shoir — Bobur.', value: true },
            { text: 'Bobur lirikasida hayotsevarlik va ertangi kunga ishonch ustun.', value: true },
            { text: 'Bobur sheʼrlarida tushkunlik va taslimchilik yetakchi.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz54q9',
      prompt: 'Matlaʼda «lolarux» deb kim ataladi?',
      hint: 'Lola yuzli.',
      explanation: 'Yor — oshiq undan rahm qilishni soʻraydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yor (mahbuba)', 'shoirning oʻzi', 'bogʻbon', 'podsho'], answerIndex: 0 } }
    }
  ]
};
