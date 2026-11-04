import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 36–39-betlar — nutqning mantiqiyligi; Navoiy, Lutfiy va Husayn Boyqaro rivoyati; Forobiyning grammatika va mantiq haqidagi fikri. */
export const OZ_8: BoardLesson = {
  n: 8,
  label: '8',
  group: OZG1,
  title: 'Nutqning mantiqiyligi',
  section: 'Ona tili, 1-qism: «Nutqning mantiqiyligi»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Mantiqiylik — soʻzlar va gaplar orasidagi mazmuniy va grammatik bogʻlanishlarning fikr mohiyatiga va uning rivojiga qatʼiy mosligi. Forobiy grammatikani tilning, mantiqni esa aqlning oʻlchovi deb bilgan. Mantiqiy gapirish uchun mavzuni yaxshi bilish va soʻzlarning maʼnosini hisobga olish kerak. Masalan, «Traktor va mashinalar yelday uchadi» gapi mantiqsiz: mashina tez yurishi mumkin, traktor esa yelday ucholmaydi.",
      easy: "Mantiqiy nutq — gaplar fikrga mos, bir-biriga zid emas. «Traktor yelday uchadi» — mantiqsiz.",
      draw: [
        { t: 'title', text: 'Mantiqiylik' },
        { t: 'box', id: 'g', x: 4, y: 20, w: 44, h: 14, text: 'Grammatika — til oʻlchovi', color: 'blue' },
        { t: 'box', id: 'm', x: 52, y: 20, w: 44, h: 14, text: 'Mantiq — aql oʻlchovi', color: 'green' },
        { t: 'text', x: 4, y: 42, text: '(Forobiy fikri)', size: 's' },
        { t: 'text', x: 4, y: 52, text: '✗ Traktor va mashinalar yelday uchadi.', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 59, text: '✓ Mashinalar yelday uchadi.', size: 's', color: 'green' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Mantiqiylik — soʻz va gaplar orasidagi bogʻlanishlarning fikr mohiyatiga qatʼiy mosligi.',
    'Forobiy grammatikani til, mantiqni aql oʻlchovi deb bilgan; har qanday sogʻlom nutq ikkalasiga tayanadi.',
    'Mantiqiy gapirish uchun mavzuni va soʻzlarning maʼnosini yaxshi bilish kerak.'
  ],
  questions: [
    {
      id: 'oz8q1',
      prompt: 'Qaysi gap mantiqan toʻgʻri?',
      hint: 'Traktor tez yurmaydi.',
      explanation: '«Mashinalar yelday uchadi» — mantiqan toʻgʻri; traktorni «yelday uchadi» deb boʻlmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Mashinalar yelday uchadi.', 'Traktor va mashinalar yelday uchadi.', 'Traktor yelday uchadi.'], answerIndex: 0 } }
    },
    {
      id: 'oz8q2',
      prompt: 'Grammatika va mantiqni «til» va «aql» oʻlchovi deb bilgan alloma kim?',
      hint: '«Ikkinchi muallim».',
      explanation: 'Abu Nasr Forobiy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Abu Nasr Forobiy', 'Alisher Navoiy', 'Mahmud Koshgʻariy', 'Abdulla Avloniy'], answerIndex: 0 } }
    },
    {
      id: 'oz8q3',
      prompt: 'Rivoyatda yomgʻir ipini ushlab yiqilmay qolgan goʻzal haqidagi oʻxshatishni kim mantiqsiz deb topgan?',
      hint: 'Shoh va shoir.',
      explanation: 'Husayn Boyqaro: yuqoridan tushayotgan yomgʻir ipi yiqilayotgan kishiga tayanch boʻlolmaydi, degan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Husayn Boyqaro', 'Lutfiy', 'Amir Xusrav Dehlaviy', 'Bobur'], answerIndex: 0 } }
    },
    {
      id: 'oz8q4',
      prompt: 'Mantiqiy nutq tuzish uchun nima kerak?',
      hint: 'Mavzu va soʻz.',
      explanation: 'Mavzuni atroflicha bilish, mantiq qoidalarini bilish, soʻzlarning maʼnosi va bogʻlanishini hisobga olish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'mavzuni yaxshi bilish', correct: true },
            { label: 'soʻz maʼnolarini bilish', correct: true },
            { label: 'mantiq qoidalarini bilish', correct: true },
            { label: 'iloji boricha uzun gapirish' }
          ]
        }
      }
    },
    {
      id: 'oz8q5',
      prompt: 'Gapda qanday mantiqiy xato bor: «Qish. Yanvar havosi juda sovuq. Laylakqor yogʻyapti.»?',
      hint: 'Laylakqor qachon yogʻadi?',
      explanation: 'Laylakqor — bahorda, laylaklar kelganda yogʻadigan qor; qahraton yanvarga mos emas.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['laylakqor yanvarda yogʻmaydi — u bahor qori', 'xato yoʻq', 'yanvar yozgi oy', 'qor sovuqda yogʻmaydi'], answerIndex: 0 } }
    },
    {
      id: 'oz8q6',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Bolta urmoq — zarba.',
      explanation: 'Nogʻorasiga oʻynamoq — birovning izmi bilan ish koʻrmoq; oyogʻiga bolta urmoq — mavqeyidan mahrum qiluvchi zarba bermoq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'nogʻorasiga oʻynamoq', right: 'birovning izmi bilan ish koʻrmoq' },
            { left: 'oyogʻiga bolta urmoq', right: 'mavqeyidan mahrum qilmoq' }
          ]
        }
      }
    },
    {
      id: 'oz8q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Mantiq va grammatika — tayanch.',
      explanation: 'Mantiq va grammatika har qanday nutqning tayanchi; soʻzning maʼnosiga eʼtiborsizlik mantiqni buzadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Mantiq va grammatika har qanday nutqning tayanchi.', value: true },
            { text: 'Soʻz maʼnosiga eʼtiborsizlik mantiqiylikni buzishi mumkin.', value: true },
            { text: 'Mantiqiylik faqat matematikaga tegishli, nutqqa emas.', value: false }
          ]
        }
      }
    }
  ]
};
