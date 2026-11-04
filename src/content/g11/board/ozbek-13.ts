import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 57–60-betlar — nutqning boyligi: rang-baranglik, takrordan qochish, soʻz zaxirasi. */
export const OZ_13: BoardLesson = {
  n: 13,
  label: '13',
  group: OZG1,
  title: 'Nutqning boyligi',
  section: 'Ona tili, 1-qism: «Nutqning boyligi»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Boy nutq — soʻzlar, maʼnolar, iboralar, ohang va gap qoliplaridan xilma-xil foydalanilgan nutq. Bir til unsuri qancha kam takrorlansa, nutq shuncha boy; bir xil soʻz va ifodalar koʻp qaytarilsa, nutq kambagʻal va taʼsirsiz boʻladi. Boy nutq tuzish uchun bir tushunchaga turli birliklarni tanlash, buning uchun esa yetarli soʻz zaxirasiga ega boʻlish kerak. Boylik ayniqsa badiiy uslubda muhim.",
      easy: "Boy nutq — rang-barang nutq. Bir soʻzni qayta-qayta takrorlamang, maʼnodoshini toping.",
      draw: [
        { t: 'title', text: 'Boy va kambagʻal nutq' },
        { t: 'text', x: 4, y: 24, text: '✗ bor kuchi bilan… bor kuchim bilan… bor kuchi bilan', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 34, text: '✓ bor kuchi bilan… jon-jahdi bilan… zoʻr berib', size: 's', color: 'green' },
        { t: 'box', id: 'k', x: 4, y: 46, w: 44, h: 12, text: 'Takror koʻp — kambagʻal', color: 'red' },
        { t: 'box', id: 'b', x: 52, y: 46, w: 44, h: 12, text: 'Xilma-xil — boy', color: 'green' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Nutqning boyligi undagi til unsurlarining xilma-xilligi bilan oʻlchanadi.',
    'Bir xil unsur koʻp takrorlangan nutq kambagʻal va taʼsirsiz boʻladi.',
    'Boy nutq uchun keng soʻz zaxirasi va bir fikrni turli yoʻl bilan ifodalash malakasi kerak.'
  ],
  questions: [
    {
      id: 'oz13q1',
      prompt: 'Nutqning boyligi nima bilan oʻlchanadi?',
      hint: 'Rang-baranglik.',
      explanation: 'Qoʻllangan til birliklarining xilma-xilligi bilan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['til birliklarining xilma-xilligi bilan', 'gaplarning uzunligi bilan', 'chet soʻzlar soni bilan', 'ovoz balandligi bilan'], answerIndex: 0 } }
    },
    {
      id: 'oz13q2',
      prompt: 'Qaysi ifodalar «bor kuchi bilan» birikmasining maʼnodoshi boʻla oladi?',
      hint: 'Juda kuch bilan.',
      explanation: 'Jon-jahdi bilan, zoʻr berib, butun kuchini toʻplab — maʼnodosh; «sekin-asta» — zid maʼnoli.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'jon-jahdi bilan', correct: true },
            { label: 'zoʻr berib', correct: true },
            { label: 'butun kuchini toʻplab', correct: true },
            { label: 'sekin-asta' }
          ]
        }
      }
    },
    {
      id: 'oz13q3',
      prompt: 'Qaysi holda nutq kambagʻal hisoblanadi?',
      hint: 'Takror.',
      explanation: 'Bir xil til unsuri koʻp takrorlanganda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bir xil soʻz va ifodalar koʻp takrorlanganda', 'maʼnodoshlar ishlatilganda', 'iboralar qoʻllanganda', 'gap qoliplari turlicha boʻlganda'], answerIndex: 0 } }
    },
    {
      id: 'oz13q4',
      prompt: 'Nutq boyligi qaysi uslubda alohida oʻrin tutadi?',
      hint: 'Tasvir quvvati.',
      explanation: 'Badiiy uslubda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['badiiy', 'rasmiy', 'ilmiy', 'idoraviy'], answerIndex: 0 } }
    },
    {
      id: 'oz13q5',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Ep bilmaslik — yarashmaydi deb bilmoq.',
      explanation: 'Ep bilmaslik — noloyiq ish deb bilmoq; esi ketmoq — holdan toymoq yoki qayta-qayta mehr koʻrsatmoq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'ep bilmaslik', right: 'noloyiq ish deb bilmoq' },
            { left: 'esi ketmoq', right: 'holdan toymoq' }
          ]
        }
      }
    },
    {
      id: 'oz13q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Soʻz zaxirasi — imkoniyat.',
      explanation: 'Soʻz zaxirasi qancha boy boʻlsa, mos ifodani tanlash imkoni shuncha koʻp; boy nutq ifodalar bir xilligidan qochadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Soʻz zaxirasi boy kishi mos ifodani osonroq tanlaydi.', value: true },
            { text: 'Boy nutq ifodalarning bir xilligidan qochadi.', value: true },
            { text: 'Bir soʻzni koʻp takrorlash nutqni boyitadi.', value: false }
          ]
        }
      }
    }
  ]
};
