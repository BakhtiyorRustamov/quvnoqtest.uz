import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 40–43-betlar — mantiqiylik va grammatik vositalar: soʻz tartibi, ikki xil tushunilish. */
export const OZ_9: BoardLesson = {
  n: 9,
  label: '9',
  group: OZG1,
  title: 'Mantiqiylik va grammatik vositalar',
  section: 'Ona tili, 1-qism: «Mantiqiylik va grammatik vositalar»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Nutqning mantiqiyligi koʻproq tilning morfologik va sintaktik sathi bilan bogʻliq. Har bir sintaktik birlikning gapda oʻz oʻrni bor, shuning uchun soʻz tartibi juda muhim. Tartib buzilsa, fikr notoʻgʻri yoki ikki xil tushuniladi. Masalan, «Loqaydlik tufayli koʻrsak ham, indamaymiz» gapidan «loqaydlik tufayli koʻrdik» degan maʼno chiqib qoladi; toʻgʻrisi — «Koʻrsak ham, loqaydlik tufayli indamaymiz».",
      easy: "Soʻzlarning gapdagi oʻrni maʼnoni belgilaydi. Tartib xato boʻlsa, gap ikki xil tushuniladi.",
      draw: [
        { t: 'title', text: 'Soʻz tartibi va mantiq' },
        { t: 'text', x: 4, y: 24, text: '✗ Loqaydlik tufayli koʻrsak ham, indamaymiz.', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 32, text: '   → «loqaydlik tufayli koʻrish» — mantiqsiz', size: 's' },
        { t: 'text', x: 4, y: 44, text: '✓ Koʻrsak ham, loqaydlik tufayli indamaymiz.', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 52, text: '   → «loqaydlik tufayli indamaslik» — toʻgʻri', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Mantiqiylik koʻproq tilning morfologik va sintaktik sathi bilan bogʻliq.',
    'Gapda soʻz tartibi tilning sintaktik tabiatiga mos boʻlishi kerak.',
    'Soʻz tartibidagi nuqson fikrning notoʻgʻri yoki ikki xil tushunilishiga olib keladi.'
  ],
  questions: [
    {
      id: 'oz9q1',
      prompt: 'Qaysi gapda soʻz tartibi toʻgʻri?',
      hint: '«Loqaydlik tufayli» «indamaymiz» ga tegishli.',
      explanation: '«Koʻrsak ham, loqaydlik tufayli indamaymiz» — fikr bir xil va toʻgʻri tushuniladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Koʻrsak ham, loqaydlik tufayli indamaymiz.', 'Loqaydlik tufayli koʻrsak ham, indamaymiz.'], answerIndex: 0 } }
    },
    {
      id: 'oz9q2',
      prompt: 'Nutq mantiqiyligi koʻproq tilning qaysi sathlari bilan bogʻliq?',
      hint: 'Qoʻshimchalar va gap qurilishi.',
      explanation: 'Morfologik va sintaktik sath bilan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['morfologik va sintaktik', 'fonetik va grafik', 'faqat leksik', 'faqat orfoepik'], answerIndex: 0 } }
    },
    {
      id: 'oz9q3',
      prompt: 'Soʻz tartibidagi nuqson nimaga olib keladi?',
      hint: 'Tinglovchi adashadi.',
      explanation: 'Fikr notoʻgʻri yoki ikki xil tushuniladi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'fikr notoʻgʻri tushuniladi', correct: true },
            { label: 'gap ikki xil tushuniladi', correct: true },
            { label: 'gap albatta chiroyliroq boʻladi' }
          ]
        }
      }
    },
    {
      id: 'oz9q4',
      prompt: 'Gapdagi soʻzlarni toʻgʻri tartibda joylang.',
      hint: 'Avval «koʻrsak ham».',
      explanation: 'Koʻrsak ham → loqaydlik tufayli → indamaymiz.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'Koʻrsak ham,' }, { label: 'loqaydlik tufayli' }, { label: 'indamaymiz.' }] }
      }
    },
    {
      id: 'oz9q5',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Tanobi qochmoq — juda xursand.',
      explanation: 'Ogʻzining tanobi qochmoq — behad sevinmoq; payiga tushmoq — zimdan taʼqib qilmoq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'ogʻzining tanobi qochmoq', right: 'behad sevinmoq' },
            { left: 'payiga tushmoq', right: 'zimdan taʼqib qilmoq' }
          ]
        }
      }
    },
    {
      id: 'oz9q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Sheʼrda tartib oʻzgaradi.',
      explanation: 'Sheʼriyatda soʻz tartibi badiiy maqsadda oʻzgartiriladi; oddiy gapda esa tartib mantiqqa xizmat qilishi kerak.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sheʼrda soʻz tartibi badiiy maqsadda oʻzgarishi mumkin.', value: true },
            { text: 'Har bir sintaktik birlikning gapda oʻz mantiqiy oʻrni bor.', value: true },
            { text: 'Soʻz tartibi gap maʼnosiga hech taʼsir qilmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
