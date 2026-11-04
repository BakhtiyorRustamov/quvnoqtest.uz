import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 93–96-betlar — nutq texnikasi: ovoz sifati, nafas, diksiya, surʼat; Demosfen haqida rivoyat, tez aytishlar. */
export const OZ_22: BoardLesson = {
  n: 22,
  label: '22',
  group: OZG1,
  title: 'Nutq madaniyati va nutq texnikasi',
  section: 'Ona tili, 1-qism: «Nutq madaniyati va nutq texnikasi»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Nutq texnikasi — jonli, ovozli nutqni toʻgʻri hosil qilish koʻnikmalari. U ovoz sifati, toʻgʻri nafas olish, tovushlarni aniq talaffuz qilish — diksiya va nutq surʼatini qamraydi. Nafas zoʻriqishsiz olinadi, tekis va uzoqroq chiqariladi, chunki tovush aynan nafas chiqarishda hosil boʻladi. Xirqiroq yoki chiyildoq ovoz tinglovchini charchatadi. Qadimgi yunon notigʻi Demosfen ogʻziga mayda tosh solib mashq qilib, talaffuzidagi nuqsonlarni yenggan; diksiyani tez aytishlar ham charxlaydi.",
      easy: "Nutq texnikasi — yaxshi ovoz, toʻgʻri nafas, aniq talaffuz va mos tezlik.",
      draw: [
        { t: 'title', text: 'Nutq texnikasi' },
        { t: 'box', id: 'o', x: 4, y: 20, w: 22, h: 12, text: 'ovoz sifati', color: 'blue' },
        { t: 'box', id: 'n', x: 28, y: 20, w: 22, h: 12, text: 'nafas', color: 'green' },
        { t: 'box', id: 'd', x: 52, y: 20, w: 22, h: 12, text: 'diksiya', color: 'orange' },
        { t: 'box', id: 's', x: 76, y: 20, w: 22, h: 12, text: 'surʼat', color: 'purple' },
        { t: 'text', x: 4, y: 44, text: 'Tez ayting:', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 52, text: 'Oq choynakka koʻk qopqoq, koʻk choynakka oq qopqoq.', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Nutq texnikasi — ovoz sifati, toʻgʻri nafas, aniq diksiya va mos surʼatni qamrovchi koʻnikmalar.',
    'Nafas zoʻriqishsiz olinadi, tekis va uzoq chiqariladi: tovush nafas chiqarishda hosil boʻladi.',
    'Diksiyani muntazam mashq va tez aytishlar bilan yaxshilash mumkin.'
  ],
  questions: [
    {
      id: 'oz22q1',
      prompt: 'Diksiya nima?',
      hint: 'Talaffuz.',
      explanation: 'Tovush va tovush birikmalarini aniq talaffuz qilish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tovushlarni aniq talaffuz qilish', 'baland ovozda gapirish', 'tez yozish', 'soʻz yodlash'], answerIndex: 0 } }
    },
    {
      id: 'oz22q2',
      prompt: 'Tovush nafasning qaysi bosqichida hosil boʻladi?',
      hint: 'Havo chiqayotganda.',
      explanation: 'Nafas chiqarishda — shuning uchun u tekis va uzoq boʻlishi kerak.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['nafas chiqarishda', 'nafas olishda', 'nafasni toʻxtatganda'], answerIndex: 0 } }
    },
    {
      id: 'oz22q3',
      prompt: 'Nutq texnikasiga nimalar kiradi?',
      hint: 'Toʻrtta asosiy.',
      explanation: 'Ovoz sifati, nafas, diksiya, surʼat.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ovoz sifati', correct: true },
            { label: 'toʻgʻri nafas olish', correct: true },
            { label: 'diksiya', correct: true },
            { label: 'nutq surʼati', correct: true },
            { label: 'qoʻl yozuvi' }
          ]
        }
      }
    },
    {
      id: 'oz22q4',
      prompt: 'Demosfen talaffuzini yaxshilash uchun nima qilgan?',
      hint: 'Ogʻzida…',
      explanation: 'Ogʻziga mayda tosh solib sheʼr va matnlar oʻqigan, tepalikka yugurib nafasini chiniqtirgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ogʻziga mayda tosh solib mashq qilgan', 'umuman gapirmay qoʻygan', 'faqat yozma nutq bilan shugʻullangan', 'qoʻshiq aytishni tashlagan'], answerIndex: 0 } }
    },
    {
      id: 'oz22q5',
      prompt: 'Qaysi ovozlar tinglovchi qulogʻini qiynaydi?',
      hint: 'Yoqimsiz ovozlar.',
      explanation: 'Xirqiroq, chiyildoq, shangʻiroq ovozlar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'xirqiroq', correct: true },
            { label: 'chiyildoq', correct: true },
            { label: 'shangʻiroq', correct: true },
            { label: 'mayin va ravon' }
          ]
        }
      }
    },
    {
      id: 'oz22q6',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: '«Ha-hu» deguncha — tezda.',
      explanation: '«Ha-hu» deguncha — juda qisqa muddatda; hushi boshidan uchmoq — esankiramoq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«ha-hu» deguncha', right: 'juda tez' },
            { left: 'hushi boshidan uchmoq', right: 'esankiramoq' }
          ]
        }
      }
    },
    {
      id: 'oz22q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ovoz — nutq quroli.',
      explanation: 'Soʻz bilan ishlaydigan kishi uchun sifatli ovoz hal qiluvchi; keraksiz shoshib gapirish nutqni tushunarsiz qiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Asosiy quroli nutq boʻlgan kishi uchun ovoz sifati juda muhim.', value: true },
            { text: 'Keraksiz shoshib gapirish nutqni tushunarsiz qiladi.', value: true },
            { text: 'Nutq texnikasini mashq bilan oʻzgartirib boʻlmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
