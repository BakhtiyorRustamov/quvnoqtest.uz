import type { BoardLesson } from './types';
import { OZG2 } from './ozbek-25';

/** Darslik: Ona tili 11, 2-qism (2020), 3-mavzu (10–13-betlar) — nutqda oʻzgaruvchi undoshlar: talaffuz va imlo nomuvofiqligi, soʻz oxiridagi jarangsizlanish. */
export const OZ_27: BoardLesson = {
  n: 27,
  label: '27',
  group: OZG2,
  title: 'Nutqda oʻzgaruvchi undoshlar',
  section: 'Ona tili, 2-qism: 3-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Agar hamma soʻz qanday aytilsa shunday yozilganida, bir soʻz turlicha yozilib, savodsizlik kuchayib ketardi. Shuning uchun ayrim undoshlarning talaffuzi va imlosi farq qiladi: «shanba» — «shamba», «pedagog» — «pedagok», «masxaraboz» — «masxaravoz» deb aytiladi. Ogʻzaki «ixtisod», «shoshilip», «ketti» soʻzlari yozuvda «iqtisod», «shoshilib», «ketdi» boʻladi. Soʻz oxiridagi jarangli undosh koʻpincha jarangsiz aytiladi: «daromad», «dard», «marvarid».",
      easy: "Undoshlar ham boshqacha aytiladi: «shamba», «ketti». Lekin yozamiz: shanba, ketdi.",
      draw: [
        { t: 'title', text: 'Oʻzgaruvchi undoshlar' },
        { t: 'table', x: 4, y: 18, rows: [['aytilishi', 'yozilishi'], ['shamba', 'shanba'], ['pedagok', 'pedagog'], ['ixtisod', 'iqtisod'], ['shoshilip', 'shoshilib'], ['ketti', 'ketdi']] }
      ],
      next: 'Mashqlarga oʻtamiz'
    }
  ],
  summary: [
    'Agar soʻzlar aytilganidek yozilsa, imlo tartibsiz boʻlib, savodsizlik kuchayardi.',
    'Ayrim undoshlar boshqacha aytiladi, lekin imlo qoidasi boʻyicha yoziladi: shanba, pedagog, iqtisod, ketdi.',
    'Soʻz oxiridagi jarangli undosh koʻpincha jarangsiz talaffuz qilinadi: daromad, dard, marvarid.'
  ],
  questions: [
    {
      id: 'oz27q1',
      prompt: 'Qaysi yozuv toʻgʻri?',
      hint: 'Haftaning oltinchi kuni.',
      explanation: '«Shanba» — «shamba» deb aytilsa ham, shunday yoziladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['shanba', 'shamba', 'shanbe', 'shampa'], answerIndex: 0 } }
    },
    {
      id: 'oz27q2',
      prompt: 'Aytilishini yozilishi bilan juftlang.',
      hint: 'Ketti — ketdi.',
      explanation: 'Ixtisod — iqtisod; shoshilip — shoshilib; ketti — ketdi; pedagok — pedagog.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«ixtisod»', right: 'iqtisod' },
            { left: '«shoshilip»', right: 'shoshilib' },
            { left: '«ketti»', right: 'ketdi' },
            { left: '«pedagok»', right: 'pedagog' }
          ]
        }
      }
    },
    {
      id: 'oz27q3',
      prompt: 'Nega hamma soʻz aytilganidek yozilmaydi?',
      hint: 'Har kim har xil aytadi.',
      explanation: 'Unda bir soʻz turlicha yozilib, imloni tartibga solib boʻlmas, savodsizlik kuchayardi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bir soʻz turlicha yozilib, imlo tartibsiz boʻlardi', 'harflar yetishmaydi', 'yozish qiyin boʻlardi', 'qoida shunchaki odat'], answerIndex: 0 } }
    },
    {
      id: 'oz27q4',
      prompt: 'Qaysi soʻzlarda oxirgi jarangli undosh jarangsiz aytiladi?',
      hint: 'd → t',
      explanation: 'Daromad, dard, marvarid — oxiridagi «d» «t»ga yaqin aytiladi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'daromad', correct: true },
            { label: 'dard', correct: true },
            { label: 'marvarid', correct: true },
            { label: 'savol' }
          ]
        }
      }
    },
    {
      id: 'oz27q5',
      prompt: '«Ketti», «shoshilip» kabi ogʻzaki talaffuz notoʻgʻrimi?',
      hint: 'Kitobdagi fikr.',
      explanation: 'Talaffuz notoʻgʻri emas, lekin yozuvda imlo qoidasiga koʻra «ketdi», «shoshilib» deb yoziladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['talaffuz notoʻgʻri emas, lekin yozuvda qoidaga amal qilinadi', 'ha, butunlay xato', 'yozuvda ham shunday yozish kerak', 'faqat sheʼrda mumkin'], answerIndex: 0 } }
    },
    {
      id: 'oz27q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Masxaraboz.',
      explanation: '«Masxaraboz» ogʻzaki nutqda «masxaravoz» deb aytiladi; yozuvda — masxaraboz.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Masxaraboz» soʻzi ogʻzaki nutqda «masxaravoz» deb aytilishi mumkin.', value: true },
            { text: 'Undoshlarning yozilishi imlo qoidalari va lugʻatlarda belgilangan.', value: true },
            { text: '«Pedagok» deb yozish toʻgʻri.', value: false }
          ]
        }
      }
    }
  ]
};
