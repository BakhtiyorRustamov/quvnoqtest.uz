import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 73–76-betlar — nutqning ifodaliligi; uslublarning unga ehtiyoji; ifodalilik manbalari. */
export const OZ_17: BoardLesson = {
  n: 17,
  label: '17',
  group: OZG1,
  title: 'Nutqning ifodaliligi',
  section: 'Ona tili, 1-qism: «Nutqning ifodaliligi»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Ifodali nutq shakli va mazmuni bilan tinglovchi diqqatini tortadi. Bu sifat til vositalarini ifoda maqsadiga toʻla mos tanlashdan tugʻiladi. Uslublarning ifodalilikka ehtiyoji har xil: rasmiy hujjatlarda unga kam eʼtibor beriladi, ilmiy uslubda oʻrni bilan kerak, badiiy nutqda esa u zaruriy sifat. Ifodalilik manbalari tilning barcha sathlarida bor: tovushlar — masalan, sheʼrda bir tovushning takrori, soʻzlar, qoʻshimchalar, gap qurilishi va ohang.",
      easy: "Ifodali nutq — diqqatni tortadigan, taʼsirli nutq. Badiiy asarda u eng zarur.",
      draw: [
        { t: 'title', text: 'Ifodalilik va uslublar' },
        { t: 'text', x: 4, y: 20, text: 'Ifodalilikka ehtiyoj:', size: 's' },
        { t: 'box', id: 'r', x: 4, y: 26, w: 18, h: 10, text: 'rasmiy', color: 'blue' },
        { t: 'box', id: 'i', x: 25, y: 26, w: 18, h: 10, text: 'ilmiy', color: 'green' },
        { t: 'box', id: 'b', x: 46, y: 26, w: 18, h: 10, text: 'badiiy', color: 'purple' },
        { t: 'arrow', from: 'r', to: 'i' },
        { t: 'arrow', from: 'i', to: 'b' },
        { t: 'text', x: 4, y: 44, text: 'kam → oʻrni bilan → zarur', size: 's', color: 'purple' },
        { t: 'list', x: 68, y: 20, items: ['tovush', 'soʻz', 'qoʻshimcha', 'gap', 'ohang'] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Ifodalilik — til vositalarini ifoda maqsadiga toʻla mos tanlash orqali nutqning diqqatni tortishi.',
    'Rasmiy uslubda ifodalilikka kam, ilmiy uslubda oʻrni bilan eʼtibor beriladi; badiiy nutqda u zaruriy sifat.',
    'Ifodalilik manbalari: tovushlar, soʻzlar, morfologik shakllar, gap qurilishi, ohang.'
  ],
  questions: [
    {
      id: 'oz17q1',
      prompt: 'Ifodalilik qaysi uslubning zaruriy sifati?',
      hint: 'Sheʼr, hikoya.',
      explanation: 'Badiiy uslubning.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['badiiy', 'rasmiy', 'idoraviy', 'ilmiy'], answerIndex: 0 } }
    },
    {
      id: 'oz17q2',
      prompt: 'Qaysi soʻz yoki ibora ifodaliroq?',
      hint: 'Hurmat va obraz.',
      explanation: '«Qadam ranjida qildi» — «keldi»dan koʻra hurmatli va ifodali.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qadam ranjida qildi', 'keldi'], answerIndex: 0 } }
    },
    {
      id: 'oz17q3',
      prompt: 'Ifodalilik manbalarini tanlang.',
      hint: 'Tilning barcha sathlari.',
      explanation: 'Tovush, soʻz, qoʻshimcha, gap qurilishi va ohang — barchasi ifodalilik manbai.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tovushlar takrori', correct: true },
            { label: 'soʻz tanlash', correct: true },
            { label: 'ohang', correct: true },
            { label: 'gap qurilishi', correct: true }
          ]
        }
      }
    },
    {
      id: 'oz17q4',
      prompt: 'Sheʼrda «qaro qoshing, qalam qoshing…» kabi qatorlarda nima ifodalilik yaratadi?',
      hint: 'Bir tovush.',
      explanation: '«q» tovushining takrori — fonetik vosita.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bir tovushning takrori', 'chet soʻzlar', 'raqamlar', 'idoraviy iboralar'], answerIndex: 0 } }
    },
    {
      id: 'oz17q5',
      prompt: 'Uslubni ifodalilikka ehtiyoji boʻyicha kamidan koʻpiga tartiblang.',
      hint: 'Rasmiy — eng kam.',
      explanation: 'Rasmiy → ilmiy → badiiy.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'rasmiy' }, { label: 'ilmiy' }, { label: 'badiiy' }] }
      }
    },
    {
      id: 'oz17q6',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Qora terga botmoq — juda terlamoq.',
      explanation: 'Qildan qiyiq axtarmoq — aybsiz odamdan ayb qidirmoq; qora terga botmoq — zoʻr berib moʻl terlamoq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'qildan qiyiq axtarmoq', right: 'aybsiz odamdan ayb qidirmoq' },
            { left: 'qora terga botmoq', right: 'zoʻr berib qattiq terlamoq' }
          ]
        }
      }
    },
    {
      id: 'oz17q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ifodalilik til vositasini tanlashdan.',
      explanation: 'Ifodalilik til vositasini maqsadga mos tanlashdan tugʻiladi; rasmiy hujjatda ifodalilikka kam eʼtibor beriladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ifodalilik til vositalarini maqsadga mos tanlashdan tugʻiladi.', value: true },
            { text: 'Rasmiy hujjatlarda ifodalilikka kam eʼtibor beriladi.', value: true },
            { text: 'Ifodalilik faqat soʻz tanlash bilan bogʻliq, ohangning taʼsiri yoʻq.', value: false }
          ]
        }
      }
    }
  ]
};
