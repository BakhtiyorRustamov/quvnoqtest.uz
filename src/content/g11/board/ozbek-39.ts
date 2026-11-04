import type { BoardLesson } from './types';
import { OZG5 } from './ozbek-37';

/** Darslik: Ona tili 11, 2-qism (2020), 18-mavzu (66–69-betlar) — nutqda shakl va mazmun mosligi: ixchamlik, gʻalizliklarni bartaraf etish. */
export const OZ_39: BoardLesson = {
  n: 39,
  label: '39',
  group: OZG5,
  title: 'Nutqda shakl va mazmun mosligi',
  section: 'Ona tili, 2-qism: 18-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Fikrni ixcham ifodalash — madaniy nutq belgisi. Shuning uchun, masalan, ilmiy matndagi soʻz va gaplar miqdorining yuqori chegarasi belgilanadi, quyi chegarasi esa koʻrsatilmaydi. Fikrni ortiqcha uzun yoki koʻp jumlalar bilan ifodalash koʻpincha ijobiy qabul qilinmaydi. Gaplarni ixchamlashtirish, matn mazmunini qisqa ifodalash va boshlangan jumlani mantiqan toʻgʻri davom ettirish — soʻzlovchi mahorati. Maqol shaklini buzish ham gʻalizlik: «Aqli koʻpni dov olmas, doʻsti koʻpni yov olmas».",
      easy: "Qisqa va aniq yozing. Uzun, chalkash gap — gʻalizlik.",
      draw: [
        { t: 'title', text: 'Ixcham va mos ifoda' },
        { t: 'text', x: 4, y: 22, text: '✗ Aqli koʻpni dov olmas, doʻsti koʻpni dushman olmas.', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 30, text: '✓ Aqli koʻpni dov olmas, doʻsti koʻpni yov olmas.', size: 's', color: 'green' },
        { t: 'box', id: 'a', x: 4, y: 40, w: 44, h: 12, text: 'Uzun, chalkash gap', color: 'red' },
        { t: 'box', id: 'b', x: 52, y: 40, w: 44, h: 12, text: 'Ixcham, aniq gap', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b', label: 'tahrir' }
      ],
      next: 'Mashqlarga oʻtamiz'
    }
  ],
  summary: [
    'Fikrni ixcham ifodalash madaniy nutq belgisi; ortiqcha uzun gap koʻpincha salbiy qabul qilinadi.',
    'Gaplarni ixchamlashtirish va matn mazmunini qisqa ifodalash — madaniy nutq mezonlaridan.',
    'Boshlangan jumlani mantiqan va usluban toʻgʻri davom ettirish soʻzlovchining mahoratidir.'
  ],
  questions: [
    {
      id: 'oz39q1',
      prompt: 'Maqolning toʻgʻri shaklini tanlang.',
      hint: 'Qofiya: dov — yov.',
      explanation: '«Aqli koʻpni dov olmas, doʻsti koʻpni yov olmas» — «dushman» soʻzi shaklni buzadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Aqli koʻpni dov olmas, doʻsti koʻpni yov olmas.', 'Aqli koʻpni dov olmas, doʻsti koʻpni dushman olmas.', 'Aqli koʻp dov olmas, doʻst koʻp yov olmas.'], answerIndex: 0 } }
    },
    {
      id: 'oz39q2',
      prompt: 'Qaysi gap ixchamroq va aniqroq?',
      hint: 'Qisqa, mazmun saqlangan.',
      explanation: '«Haqiqiy doʻst seni tubsizlikka tushirmaydi» — fikr ixcham ifodalangan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Haqiqiy doʻst seni tubsizlikka tushirmaydi.', 'Haqiqiy doʻst seni tubsizlikdan chiqarib oladigan inson emas, balki tubsizlikka tushib ketishingga yoʻl qoʻymaydigan insondir, deb aytish mumkin.'], answerIndex: 0 } }
    },
    {
      id: 'oz39q3',
      prompt: 'Ilmiy matnda nimaning yuqori chegarasi belgilanadi?',
      hint: 'Hajm.',
      explanation: 'Soʻz va gaplar miqdorining — quyi chegara koʻrsatilmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['soʻz va gaplar miqdorining', 'harflar balandligining', 'rasmlar sonining', 'tinish belgilarining'], answerIndex: 0 } }
    },
    {
      id: 'oz39q4',
      prompt: 'Maqoldagi xatoli soʻzni toʻgʻrisi bilan juftlang.',
      hint: 'Yod — yot (begona).',
      explanation: '«Yod oshingga qaraydi» emas — «Yot oshingga qaraydi, doʻst — boshingga».',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«Yod oshingga qaraydi…»', right: 'Yot oshingga qaraydi…' },
            { left: '«…doʻsti koʻpni dushman olmas»', right: '…doʻsti koʻpni yov olmas' }
          ]
        }
      }
    },
    {
      id: 'oz39q5',
      prompt: 'Madaniy nutq mezonlariga nimalar kiradi?',
      hint: 'Ixchamlik.',
      explanation: 'Gaplarni ixchamlashtirish, mazmunni qisqa ifodalash, jumlani toʻgʻri davom ettirish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'gaplarni ixchamlashtirish', correct: true },
            { label: 'mazmunni qisqa ifodalash', correct: true },
            { label: 'boshlangan jumlani toʻgʻri davom ettirish', correct: true },
            { label: 'bir fikrni koʻp marta qaytarish' }
          ]
        }
      }
    },
    {
      id: 'oz39q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Uzunlik — fazilat emas.',
      explanation: 'Fikrni koʻp jumla bilan choʻzish koʻpincha ijobiy qabul qilinmaydi; ixchamlik — madaniyat belgisi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Fikrni ixcham ifodalash madaniy nutq belgisi.', value: true },
            { text: 'Fikrni ortiqcha uzun gaplar bilan ifodalash har doim maqtovga sazovor.', value: false },
            { text: 'Boshlangan jumlani mantiqan davom ettirish mahorat talab qiladi.', value: true }
          ]
        }
      }
    }
  ]
};
