import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 29–33-betlar — nutqning aniqligi; maʼnodosh va paronim soʻzlarni farqlash. */
export const OZ_6: BoardLesson = {
  n: 6,
  label: '6',
  group: OZG1,
  title: 'Nutqning aniqligi',
  section: 'Ona tili, 1-qism: «Nutqning aniqligi»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Aniqlik — soʻzning tildagi maʼnosiga toʻla mos qoʻllanishi, soʻz bilan u ifodalagan narsa orasidagi qatʼiy moslik. Aniq gapirish uchun voqelikni va soʻz maʼnolarini yaxshi bilish kerak. Masalan, merosni avlod emas, ajdod qoldiradi: avlod — keyingi nasl, ajdod — ota-bobolar. Shakldosh, maʼnodosh, koʻp maʼnoli soʻzlar va paronimlarning farqini bilmaslik aniqlikni buzadi.",
      easy: "Aniqlik — soʻzni oʻz maʼnosida ishlatish. Ajdod — oldingilar, avlod — keyingilar.",
      draw: [
        { t: 'title', text: 'Farqlab ishlating' },
        { t: 'table', x: 4, y: 18, rows: [['soʻz', 'maʼnosi'], ['ajdod', 'ota-bobolar, oldingi nasl'], ['avlod', 'keyingi nasl, zurriyot'], ['tavsif', 'narsaning soʻz bilan bayoni'], ['tasvir', 'surat, chizma, obrazli bayon'], ['chopmoq', 'qoʻl bilan: yer, goʻsht chopmoq'], ['yugurmoq', 'oyoq bilan harakat']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Aniqlik — soʻzning tildagi maʼnosiga va ifodalanayotgan narsaga qatʼiy mos qoʻllanishi.',
    'Aniq nutq uchun voqelikni va soʻz maʼnolarining nozikliklarini bilish zarur.',
    'Maʼnodosh, shakldosh, koʻp maʼnoli soʻzlar va paronimlarni farqlamaslik nutq aniqligini buzadi.'
  ],
  questions: [
    {
      id: 'oz6q1',
      prompt: 'Gapni toʻgʻri soʻz bilan toʻldiring: «… merosini oʻrganamiz.»',
      hint: 'Merosni oldingilar qoldiradi.',
      explanation: '«Ajdodlar merosi» — ota-bobolardan qolgan meros. «Avlod» keyingi naslni bildiradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Ajdodlar', 'Avlodlar'], answerIndex: 0 } }
    },
    {
      id: 'oz6q2',
      prompt: 'Soʻzni maʼnosi bilan juftlang.',
      hint: 'Tasvir — surat.',
      explanation: 'Tavsif — soʻz bilan bayon; tasvir — surat, chizma; chopmoq — qoʻl harakati; yugurmoq — oyoq harakati.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'tavsif', right: 'soʻz bilan bayon' },
            { left: 'tasvir', right: 'surat yoki chizma' },
            { left: 'chopmoq', right: 'qoʻl bilan urish harakati' },
            { left: 'yugurmoq', right: 'oyoq bilan tez yurish' }
          ]
        }
      }
    },
    {
      id: 'oz6q3',
      prompt: 'Soʻzlarni maʼnosiga koʻra ajrating.',
      hint: 'Surat — rasm; surʼat — tezlik.',
      explanation: 'Surat — rasm; surʼat — tezlik; asr — yuz yil; asir — tutqun.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'a', label: 'rasm yoki vaqt' }, { id: 'b', label: 'tezlik yoki tutqun' }],
          items: [
            { emoji: '🖼️', label: 'surat', bin: 'a' },
            { emoji: '⏳', label: 'asr', bin: 'a' },
            { emoji: '🏎️', label: 'surʼat', bin: 'b' },
            { emoji: '⛓️', label: 'asir', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'oz6q4',
      prompt: 'Aniqlik sifati nimaga asoslanadi?',
      hint: 'Soʻz va narsa.',
      explanation: 'Soʻzning tildagi maʼnosiga va ifodalanayotgan narsa-hodisaga qatʼiy mos qoʻllanishiga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['soʻzning maʼnosiga mos qoʻllanishiga', 'gapning uzunligiga', 'qofiyaga', 'ovoz balandligiga'], answerIndex: 0 } }
    },
    {
      id: 'oz6q5',
      prompt: '«Saboq» va «dars» haqidagi toʻgʻri fikrni tanlang.',
      hint: 'Ustozdan saboq olinadi.',
      explanation: '«Saboq» kengroq — ustozdan oʻrganish, hayotiy ibrat; «dars» esa maktab, oliygohdagi mashgʻulot.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['saboq — ustozdan oʻrganish, dars — mashgʻulot', 'ikkalasi mutlaqo bir xil', 'saboq — faqat sport mashgʻuloti', 'dars — faqat kitob nomi'], answerIndex: 0 } }
    },
    {
      id: 'oz6q6',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Tushida koʻrmaslik — hech qachon koʻrmaslik.',
      explanation: 'Yetti uxlab tushiga kirmaslik — mutlaqo kutmaslik; yetti uxlab tushida koʻrmaslik — hech qachon koʻrmaslik.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'yetti uxlab tushiga kirmaslik', right: 'mutlaqo kutmaslik' },
            { left: 'yetti uxlab tushida koʻrmaslik', right: 'hech qachon koʻrmaslik' }
          ]
        }
      }
    },
    {
      id: 'oz6q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Paronimlar talaffuzi yaqin.',
      explanation: 'Paronimlar shakli yaqin, maʼnosi har xil; «tansiq» — kamyob, sogʻinilgan, «tanqis» — yetishmaydigan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Paronimlarning talaffuzi yaqin, maʼnosi har xil.', value: true },
            { text: '«Tansiq» va «tanqis» bir xil maʼnoni bildiradi.', value: false },
            { text: 'Aniq nutq uchun voqelikni yaxshi bilish kerak.', value: true }
          ]
        }
      }
    }
  ]
};
