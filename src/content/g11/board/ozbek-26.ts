import type { BoardLesson } from './types';
import { OZG2 } from './ozbek-25';

/** Darslik: Ona tili 11, 2-qism (2020), 2-mavzu (7–9-betlar) — nutqda oʻzgaruvchi unlilar: talaffuz va imlo nomuvofiqligi. */
export const OZ_26: BoardLesson = {
  n: 26,
  label: '26',
  group: OZG2,
  title: 'Nutqda oʻzgaruvchi unlilar',
  section: 'Ona tili, 2-qism: 2-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Adabiy tilda ogʻzaki va yozma nutq meʼyorlari farqlanadi. Ogʻzaki nutqda baʼzi unlilar yozilganidan boshqacha aytiladi: «kompyuter» — «kampyuter», «kino» — «kiyno». Baʼzi unlilar esa aytilganidek yozilmaydi: «boho» deb aytsak ham «baho», «partret» emas «portret» deb yozamiz. Lekin «vahshiy», «falokat», «ravshan» soʻzlarini «voxshiy», «polakat», «rovshan» deb aytish ham, shunday yozish ham notoʻgʻri. Ikkilanganda talaffuz va imlo lugʻatlariga qaraladi.",
      easy: "Baʼzi unlilar boshqacha aytiladi, lekin yozuvda qoida boʻyicha. Shubha boʻlsa — lugʻatga qarang.",
      draw: [
        { t: 'title', text: 'Oʻzgaruvchi unlilar' },
        { t: 'table', x: 4, y: 18, rows: [['aytilishi', 'yozilishi'], ['kampyuter', 'kompyuter'], ['boho', 'baho'], ['unuqqan', 'uniqqan'], ['partret', 'portret']] },
        { t: 'text', x: 4, y: 52, text: '✗ voxshiy, polakat, rovshan', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 60, text: '✓ vahshiy, falokat, ravshan', size: 's', color: 'green' }
      ],
      next: 'Tayyorman!'
    }
  ],
  summary: [
    'Adabiy tilning ogʻzaki va yozma nutq meʼyorlari farqlanadi.',
    'Baʼzi unlilar boshqacha aytiladi, lekin yozuvda imlo qoidasiga koʻra yoziladi: baho, uniqqan, portret.',
    'Talaffuz yoki imloda ikkilanganda «Oʻzbek tilining talaffuz lugʻati» va «imlo lugʻati»ga tayaniladi.'
  ],
  questions: [
    {
      id: 'oz26q1',
      prompt: 'Qaysi yozuv toʻgʻri?',
      hint: 'Rassom chizgan surat.',
      explanation: '«Portret» deb yoziladi; «partret» — ogʻzaki talaffuz.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['portret', 'partret', 'portiret', 'partiret'], answerIndex: 0 } }
    },
    {
      id: 'oz26q2',
      prompt: 'Qaysi talaffuz notoʻgʻri?',
      hint: 'Uchta soʻz — kitobda alohida aytilgan.',
      explanation: '«Voxshiy», «polakat», «rovshan» deb aytish notoʻgʻri; toʻgʻrisi — vahshiy, falokat, ravshan.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'voxshiy', correct: true },
            { label: 'polakat', correct: true },
            { label: 'rovshan', correct: true },
            { label: 'ravshan' }
          ]
        }
      }
    },
    {
      id: 'oz26q3',
      prompt: 'Aytilishini yozilishi bilan juftlang.',
      hint: 'Boho — baho.',
      explanation: 'Boho — baho; unuqqan — uniqqan; kampyuter — kompyuter.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«boho»', right: 'baho' },
            { left: '«unuqqan»', right: 'uniqqan' },
            { left: '«kampyuter»', right: 'kompyuter' }
          ]
        }
      }
    },
    {
      id: 'oz26q4',
      prompt: 'Talaffuz yoki imloda ikkilansak, nimaga tayanamiz?',
      hint: 'Ikki lugʻat.',
      explanation: '«Oʻzbek tilining talaffuz lugʻati» va «Oʻzbek tilining imlo lugʻati»ga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['talaffuz va imlo lugʻatlariga', 'doʻstimizning fikriga', 'shevaga', 'ijtimoiy tarmoqlarga'], answerIndex: 0 } }
    },
    {
      id: 'oz26q5',
      prompt: '«Mumkin», «muhim» soʻzlarida ikkinchi boʻgʻindagi «i» qanday aytiladi?',
      hint: 'Lablangan unli taʼsiri.',
      explanation: '«u»ga moyil aytiladi, lekin «i» deb yoziladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«u»ga moyil', '«a»ga moyil', 'umuman aytilmaydi', '«o»ga moyil'], answerIndex: 0 } }
    },
    {
      id: 'oz26q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '«Aldoqchi tovushlar».',
      explanation: 'Aytilganidek yozilmaydigan unlilar «aldoqchi tovushlar» deb ataladi; ogʻzaki va yozma meʼyor farqlanadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ogʻzaki va yozma nutq meʼyorlari farqlanadi.', value: true },
            { text: 'Aytilganidek yozilmaydigan unlilar «aldoqchi tovushlar» deb yuritiladi.', value: true },
            { text: 'Har bir soʻzni qanday aytsak, shunday yozish kerak.', value: false }
          ]
        }
      }
    }
  ]
};
