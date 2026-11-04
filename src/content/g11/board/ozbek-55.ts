import type { BoardLesson } from './types';
import { OZG8 } from './ozbek-47';

/** Darslik: Adabiyot 11, I qism (2018), 173–180-betlar — Bobur ruboiylarida sheʼriy shakl; tuyuq; masnuʼ sheʼr. */
export const OZ_55: BoardLesson = {
  n: 55,
  label: '55',
  group: OZG8,
  title: 'Masnuʼ sheʼr va tuyuq',
  section: 'Adabiyot, 1-qism: Bobur ruboiy va tuyuqlarida shakl; masnuʼ sheʼr',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "«Masnuʼ» arabcha «sanʼatli, sersanʼat» degani: bunday sheʼrni ham gorizontal, ham vertikal oʻqish mumkin, shuning uchun u murabbaʼ (toʻrtburchak) deb ham ataladi. Boburning masnuʼ sheʼrida birinchi misra soʻzlari oxirgi misrada deyarli teskari tartibda takrorlanadi — bu katta mahorat belgisi. Bobur ruboiylaridan birida qofiya misra boshida keladi, qolgan soʻzlar radif boʻladi — bu bosh qofiya deyiladi. Tuyuq — qofiyasi shakldosh (omonim) soʻzlardan tuziladigan toʻrt misrali sheʼr; Bobur tuyuqlarida bir soʻzning turli maʼnolarini mohirona oʻynatadi. Ruboiyda uchinchi misra koʻpincha yakunlovchi fikrga tayanch boʻladi.",
      easy: "Masnuʼ sheʼrni ikki tomonga oʻqish mumkin. Tuyuqda qofiya shakldosh soʻzlardan tuziladi.",
      draw: [
        { t: 'title', text: 'Boburning masnuʼ sheʼri' },
        { t: 'table', x: 4, y: 18, rows: [['Yetti meni', 'oʻlturgali', 'oxir', 'hijron'], ['oʻlturgali', 'qoʻyma meni', 'qutqar', 'ey jon'], ['oxir', 'meni qutqar', 'bu firoq', 'asru yomon'], ['hijron', 'ey jon', 'asru yomon', 'oh-u figʻon']] },
        { t: 'text', x: 4, y: 46, text: 'satr = ustun: ikki yoʻnalishda bir xil oʻqiladi', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 56, text: 'Tuz oh, Zahiriddin Muhammad Bobur,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 62, text: 'Yuz oh, Zahiriddin Muhammad Bobur.', size: 's', color: 'purple' }
      ],
      next: 'Mashqlarga oʻtamiz'
    }
  ],
  summary: [
    'Masnuʼ («sanʼatli») sheʼrni gorizontal va vertikal oʻqish mumkin; u murabbaʼ deb ham ataladi.',
    'Bosh qofiyada qofiya misra boshida keladi; tuyuqda qofiya shakldosh soʻzlardan tuziladi.',
    'Bobur ruboiy, tuyuq va masnuʼ sheʼrlarida oʻzbek tilining ifoda imkoniyatlarini yuksak mahorat bilan koʻrsatgan.'
  ],
  questions: [
    {
      id: 'oz55q1',
      prompt: '«Masnuʼ» soʻzi nimani anglatadi?',
      hint: 'Arabcha.',
      explanation: '«Sanʼatli, sersanʼat».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['sanʼatli, sersanʼat', 'qisqa, loʻnda', 'qadimgi, eski', 'xalqona, sodda'], answerIndex: 0 } }
    },
    {
      id: 'oz55q2',
      prompt: 'Masnuʼ sheʼrning yana qanday nomlari bor?',
      hint: 'Toʻrtburchak.',
      explanation: 'Murabbaʼ (toʻrtburchak) va musoviyat tarafayn (ikki tomoni teng).',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'murabbaʼ', correct: true },
            { label: 'musoviyat tarafayn', correct: true },
            { label: 'marsiya' },
            { label: 'qasida' }
          ]
        }
      }
    },
    {
      id: 'oz55q3',
      prompt: 'Toʻrt misrali masnuʼ sheʼrda nechta katak (soʻz oʻrni) bor?',
      hint: '4 × 4.',
      explanation: '4 × 4 = 16.',
      widget: { type: 'number_answer', props: { answer: 16, unit: 'ta' } }
    },
    {
      id: 'oz55q4',
      prompt: 'Atamani izohi bilan juftlang.',
      hint: 'Tuyuq — omonim qofiya.',
      explanation: 'Tuyuq — qofiyasi shakldosh soʻzlar; bosh qofiya — misra boshida; radif — qofiyadan keyin takrorlanuvchi soʻz.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'tuyuq', right: 'qofiyasi shakldosh soʻzlar' },
            { left: 'bosh qofiya', right: 'qofiya misra boshida' },
            { left: 'radif', right: 'qofiyadan keyingi takror' }
          ]
        }
      }
    },
    {
      id: 'oz55q5',
      prompt: 'Tuyuq necha misradan iborat?',
      hint: 'Ruboiy kabi.',
      explanation: 'Toʻrt misradan.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'misra' } }
    },
    {
      id: 'oz55q6',
      prompt: 'Ruboiyda koʻpincha qaysi misra yakunlovchi fikrga tayanch boʻladi?',
      hint: 'Oxiridan oldingisi.',
      explanation: 'Uchinchi misra.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['uchinchi', 'birinchi', 'ikkinchi', 'hech biri'], answerIndex: 0 } }
    },
    {
      id: 'oz55q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Teskari takror.',
      explanation: 'Masnuʼ sheʼrda birinchi misra soʻzlari oxirgi misrada deyarli teskari tartibda keladi; tuyuq oʻzbek sheʼriyatiga xos.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Masnuʼ sheʼrda birinchi misra soʻzlari oxirgi misrada teskari tartibda keladi.', value: true },
            { text: 'Tuyuqda qofiya bir xil yoziladigan, lekin maʼnosi boshqa soʻzlardan tuziladi.', value: true },
            { text: 'Masnuʼ sheʼrni faqat bir yoʻnalishda oʻqish mumkin.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz55q8',
      prompt: 'Bobur ruboiyidagi bosh qofiyalarni belgilang.',
      hint: 'Misra boshida.',
      explanation: 'Tuz, yuz (va uz) — qofiya misra boshida; qolgan soʻzlar radif.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tuz', correct: true },
            { label: 'yuz', correct: true },
            { label: 'Bobur' },
            { label: 'Muhammad' }
          ]
        }
      }
    }
  ]
};
