import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 43–48-betlar — mantiqiylik va matn kompozitsiyasi: bogʻlilikning uch turi, insho tuzilishi, badiiy nutqda alogizm. */
export const OZ_10: BoardLesson = {
  n: 10,
  label: '10',
  group: OZG1,
  title: 'Mantiqiylik va matn kompozitsiyasi',
  section: 'Ona tili, 1-qism: «Mantiqiylik va matn kompozitsiyasi»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Matndagi gaplar bir-biri bilan bogʻlangan boʻladi — buni bogʻli nutq deymiz. Bogʻlilikning uch turi bor: mazmuniy bogʻlilik leksik takror, koʻrsatish va uchinchi shaxs olmoshlari orqali; mantiqiy bogʻlilik «demak», «xullas», «ammo», «lekin» kabi vositalar orqali; kompozitsion bogʻlilik esa «qayd etish lozimki», «taʼkidlash joizki» kabi qurilmalar orqali yuzaga keladi. Matnning aniq kompozitsiyasi ham kerak: insho kirish, asosiy qism va xulosadan iborat.",
      easy: "Matn gaplari bir-biriga bogʻlanadi. Insho — kirish, asosiy qism, xulosa.",
      draw: [
        { t: 'title', text: 'Matnda bogʻlilik' },
        { t: 'table', x: 4, y: 18, rows: [['bogʻlilik turi', 'vositalar'], ['mazmuniy', 'takror, koʻrsatish, u/ular'], ['mantiqiy', 'demak, xullas, ammo, lekin'], ['kompozitsion', 'qayd etish lozimki, aniqki']] },
        { t: 'box', id: 'k', x: 4, y: 48, w: 28, h: 10, text: 'kirish', color: 'blue' },
        { t: 'box', id: 'a', x: 36, y: 48, w: 28, h: 10, text: 'asosiy qism', color: 'green' },
        { t: 'box', id: 'x', x: 68, y: 48, w: 28, h: 10, text: 'xulosa', color: 'orange' },
        { t: 'arrow', from: 'k', to: 'a' },
        { t: 'arrow', from: 'a', to: 'x' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Matndagi gaplar mazmuniy, mantiqiy va kompozitsion jihatdan bogʻlanadi.',
    'Mantiqiy matn aniq kompozitsiyaga ega boʻladi: masalan, insho kirish, asosiy qism va xulosadan iborat.',
    'Badiiy nutqda mantiqsizlik (alogizm) ataylab obrazli ifoda sifatida qoʻllanishi mumkin.'
  ],
  questions: [
    {
      id: 'oz10q1',
      prompt: 'Vositani bogʻlilik turiga ajrating.',
      hint: '«Demak» — mantiqiy.',
      explanation: 'Mantiqiy — demak, xullas, lekin; kompozitsion — qayd etish lozimki, taʼkidlash joizki; mazmuniy — leksik takror, u/ular olmoshlari.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'z', label: 'mazmuniy' }, { id: 'm', label: 'mantiqiy' }, { id: 'k', label: 'kompozitsion' }],
          items: [
            { emoji: '🔁', label: 'leksik takror', bin: 'z' },
            { emoji: '➡️', label: 'u, ular olmoshlari', bin: 'z' },
            { emoji: '🔗', label: 'demak', bin: 'm' },
            { emoji: '🧩', label: 'lekin', bin: 'm' },
            { emoji: '📌', label: 'qayd etish lozimki', bin: 'k' },
            { emoji: '📍', label: 'taʼkidlash joizki', bin: 'k' }
          ]
        }
      }
    },
    {
      id: 'oz10q2',
      prompt: 'Insho qismlarini tartib bilan joylang.',
      hint: 'Avval mavzu bilan tanishtiriladi.',
      explanation: 'Kirish → asosiy qism → xulosa.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'kirish' }, { label: 'asosiy qism' }, { label: 'xulosa' }] }
      }
    },
    {
      id: 'oz10q3',
      prompt: 'Inshoning qaysi qismida «qissadan hissa» chiqariladi?',
      hint: 'Yakun.',
      explanation: 'Xulosada fikrlarga yakun yasaladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['xulosada', 'kirishda', 'asosiy qismda', 'sarlavhada'], answerIndex: 0 } }
    },
    {
      id: 'oz10q4',
      prompt: '«Koʻplar ogʻizlari bilan ham tinglardilar» gapi qachon oʻrinli?',
      hint: 'Tinglash quroli — quloq.',
      explanation: 'Oddiy nutqda mantiqsiz, ammo badiiy asarda hayrat va chorasizlik obrazini chizadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['badiiy asarda obrazli ifoda sifatida', 'ilmiy maqolada', 'rasmiy hujjatda', 'hech qachon'], answerIndex: 0 } }
    },
    {
      id: 'oz10q5',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Sirkasi suv koʻtarmaydi — tanqidga chidamaydi.',
      explanation: 'Podadan oldin chang chiqarmoq — vaqtidan ilgari hovliqib gapirmoq; sirkasi suv koʻtarmaydigan — tanqidga chidamaydigan.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'podadan oldin chang chiqarmoq', right: 'vaqtidan oldin hovliqib gapirmoq' },
            { left: 'sirkasi suv koʻtarmaydigan', right: 'tanqidga chidamaydigan' }
          ]
        }
      }
    },
    {
      id: 'oz10q6',
      prompt: '«Qalami oʻtkir» kishi qanday?',
      hint: 'Qalam — yozish.',
      explanation: 'Fikrini taʼsirchan qilib yoza oladigan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['fikrini taʼsirchan yozadigan', 'qalamni oʻtkir qilib yoʻnadigan', 'koʻp qalam yigʻadigan', 'chiroyli chizadigan'], answerIndex: 0 } }
    },
    {
      id: 'oz10q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '«Biri togʻdan, biri bogʻdan».',
      explanation: 'Mantiqli matn tartibsiz fikrlardan iborat boʻlmaydi; abzaslarga notoʻgʻri ajratish mantiqqa zarar yetkazadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Mantiqli matn «biri togʻdan, biri bogʻdan» fikrlardan iborat boʻlmaydi.', value: true },
            { text: 'Matnni abzaslarga notoʻgʻri ajratish mantiqiylikka zarar yetkazadi.', value: true },
            { text: '«Ammo», «lekin» kompozitsion bogʻlilik vositalari hisoblanadi.', value: false }
          ]
        }
      }
    }
  ]
};
