import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 100–104-betlar — ish qogʻozlari tili; bayonnoma va bayonnomadan koʻchirma (ikki mavzu bir darsda). */
export const OZ_24: BoardLesson = {
  n: 24,
  label: '24',
  group: OZG1,
  title: 'Bayonnoma va undan koʻchirma',
  section: 'Ona tili, 1-qism: «Ish qogʻozlari ustida ishlash. Bayonnoma», «Bayonnomadan koʻchirma»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Hujjat matni xolis, aniq, ixcham, loʻnda va mazmunan toʻliq boʻladi. Ish qogʻozlarida harakat nomlari va «tasdiqlansin», «eshitildi», «qaror qilindi» kabi majhul nisbatdagi feʼllar koʻp; soʻz tartibi odatdagicha, asosan darak va buyruq gaplar ishlatiladi. Bayonnoma — yigʻilishning borishi, chiqishlar va qarorlarni qayd etuvchi rasmiy hujjat; uni kotib yozadi, aniqligi uchun rais va kotib javob beradi. Har bir masala «ESHITILDI», «SOʻZGA CHIQDILAR», «QAROR QILINDI» qismlaridan iborat. Bayonnomadan koʻchirmada esa faqat kerakli masala va qaror olinadi.",
      easy: "Bayonnoma — majlis yozuvi: eshitildi → soʻzga chiqdilar → qaror qilindi. Koʻchirma — undan kerakli qism.",
      draw: [
        { t: 'title', text: 'Bayonnoma tuzilishi' },
        { t: 'box', id: 'k', x: 4, y: 18, w: 92, h: 8, text: 'KUN TARTIBI', color: 'purple' },
        { t: 'box', id: 'e', x: 4, y: 32, w: 28, h: 10, text: 'ESHITILDI', color: 'blue' },
        { t: 'box', id: 's', x: 36, y: 32, w: 28, h: 10, text: 'SOʻZGA CHIQDILAR', color: 'green' },
        { t: 'box', id: 'q', x: 68, y: 32, w: 28, h: 10, text: 'QAROR QILINDI', color: 'orange' },
        { t: 'arrow', from: 'e', to: 's' },
        { t: 'arrow', from: 's', to: 'q' },
        { t: 'text', x: 4, y: 52, text: 'Koʻchirma: KUN TARTIBI → ESHITILDI → QAROR QILINDI', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Hujjat matni xolis, aniq, ixcham, loʻnda va mazmunan toʻliq boʻladi; unda harakat nomlari va majhul nisbatdagi feʼllar koʻp.',
    'Bayonnoma yigʻilishning borishi va qarorlarini qayd etadi; har bir masala «ESHITILDI», «SOʻZGA CHIQDILAR», «QAROR QILINDI» qismlaridan iborat.',
    'Bayonnomadan koʻchirmaga faqat kerakli masala boʻyicha qism va qaror olinadi; u imzo va muhr bilan tasdiqlanadi.'
  ],
  questions: [
    {
      id: 'oz24q1',
      prompt: 'Bayonnoma matnidagi qismlarni tartib bilan joylang.',
      hint: 'Avval maʼruza eshitiladi.',
      explanation: 'KUN TARTIBI → ESHITILDI → SOʻZGA CHIQDILAR → QAROR QILINDI.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'KUN TARTIBI' }, { label: 'ESHITILDI' }, { label: 'SOʻZGA CHIQDILAR' }, { label: 'QAROR QILINDI' }] }
      }
    },
    {
      id: 'oz24q2',
      prompt: 'Bayonnomadagi maʼlumot aniqligi uchun kim javob beradi?',
      hint: 'Ikki kishi.',
      explanation: 'Majlis raisi va kotibi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['majlis raisi va kotibi', 'barcha qatnashchilar', 'faqat maʼruzachi', 'hech kim'], answerIndex: 0 } }
    },
    {
      id: 'oz24q3',
      prompt: 'Hujjat matniga qoʻyiladigan talablarni tanlang.',
      hint: 'Aniq va qisqa.',
      explanation: 'Xolislik, aniqlik, ixchamlik, loʻndalik, mazmuniy toʻliqlik. Obrazlilik — badiiy nutq talabi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'aniqlik', correct: true },
            { label: 'ixchamlik', correct: true },
            { label: 'xolislik', correct: true },
            { label: 'mazmuniy toʻliqlik', correct: true },
            { label: 'obrazlilik' },
            { label: 'kinoya' }
          ]
        }
      }
    },
    {
      id: 'oz24q4',
      prompt: 'Ish qogʻozlarida qaysi feʼl shakllari koʻp qoʻllanadi?',
      hint: 'Kim qilgani aytilmaydi.',
      explanation: 'Majhul nisbatdagi shakllar: tasdiqlansin, eshitildi, qaror qilindi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['majhul nisbat: tasdiqlansin, eshitildi', 'buyruq: kel, ket', 'kichraytirish shakllari', 'sheva shakllari'], answerIndex: 0 } }
    },
    {
      id: 'oz24q5',
      prompt: 'Hujjatlarda qaysi gap turlari asosan ishlatiladi?',
      hint: 'Xabar berish va buyurish.',
      explanation: 'Darak va buyruq gaplar; soʻroq va undov gaplar deyarli qoʻllanmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['darak va buyruq', 'soʻroq va undov', 'faqat undov', 'faqat soʻroq'], answerIndex: 0 } }
    },
    {
      id: 'oz24q6',
      prompt: 'Bayonnomadan koʻchirma qaysi qismlardan iborat?',
      hint: '«Soʻzga chiqdilar» shart emas.',
      explanation: 'KUN TARTIBI, ESHITILDI, QAROR QILINDI; imzo va muhr bilan tasdiqlanadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'KUN TARTIBI', correct: true },
            { label: 'ESHITILDI', correct: true },
            { label: 'QAROR QILINDI', correct: true },
            { label: 'barcha muhokamalar toʻliq matni' }
          ]
        }
      }
    },
    {
      id: 'oz24q7',
      prompt: 'Bayonnomada «kun tartibi» qanday yoziladi?',
      hint: 'Katta harflar.',
      explanation: 'Bosh kelishikda va katta harflar bilan: KUN TARTIBI; masalalar raqamlanib, har biri alohida satrdan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bosh kelishikda, katta harflar bilan', 'kichik harflar bilan, qavsda', 'faqat ogʻzaki aytiladi', 'oxirida, imzodan keyin'], answerIndex: 0 } }
    },
    {
      id: 'oz24q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Inversiya — badiiy usul.',
      explanation: 'Hujjatlarda gʻayriodatiy soʻz tartibi (inversiya) qoʻllanmaydi; bayonnomani kotib yozadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bayonnomani yozishni kotib tashkil qiladi.', value: true },
            { text: 'Hujjatlarda gʻayriodatiy soʻz tartibi (inversiya) qoʻllanmaydi.', value: true },
            { text: 'Bayonnomadan koʻchirma imzo va muhrsiz ham haqiqiy.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz24q9',
      prompt: '«Koʻrpasiga qarab oyoq uzatmoq» iborasi nimani bildiradi?',
      hint: 'Imkoniyat.',
      explanation: 'Imkoniyatini hisobga olib ish tutmoq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['imkoniyatiga qarab ish tutmoq', 'erta uxlamoq', 'dam olmoq', 'mehmon kutmoq'], answerIndex: 0 } }
    }
  ]
};
