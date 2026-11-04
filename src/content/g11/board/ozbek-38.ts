import type { BoardLesson } from './types';
import { OZG5 } from './ozbek-37';

/** Darslik: Ona tili 11, 2-qism (2020), 17-mavzu (63–66-betlar) — qoʻshimchalar tanlovi: variantlar, omonimlik, kelishiklar sinonimiyasi. */
export const OZ_38: BoardLesson = {
  n: 38,
  label: '38',
  group: OZG5,
  title: 'Qoʻshimchalar tanlovi',
  section: 'Ona tili, 2-qism: 17-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Bir qoʻshimcha turli koʻrinishda boʻlishi mumkin: joʻnalish kelishigining -ga, -ka, -qa, -gʻa, -a shakllari, chiqish kelishigining -dan, -din shakllari. Ular qoʻshimchaning variantlari deyiladi va har birining oʻz oʻrni bor — oʻrinli variantni tanlash nutq madaniyati belgisi. Variantlikni omonimlikdan farqlash kerak. Baʼzan turli kelishiklar sinonim boʻladi: «kelganiga xursand» — «kelganidan xursand», «gapingizga tushunmadim» — «gapingizni tushunmadim».",
      easy: "Qoʻshimchaning bir necha shakli boʻladi (-ga, -ka, -qa). Oʻrniga mosini tanlang.",
      draw: [
        { t: 'title', text: 'Qoʻshimcha variantlari' },
        { t: 'table', x: 4, y: 18, rows: [['kelishik', 'variantlar'], ['joʻnalish', '-ga, -ka, -qa, -gʻa, -a'], ['chiqish', '-dan, -din']] },
        { t: 'text', x: 4, y: 40, text: 'Sinonim kelishiklar:', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 48, text: 'kelganiga xursand = kelganidan xursand', size: 's' },
        { t: 'text', x: 4, y: 56, text: 'gapingizga tushunmadim = gapingizni tushunmadim', size: 's' }
      ],
      next: 'Tayyorman!'
    }
  ],
  summary: [
    'Bir qoʻshimchaning turli koʻrinishlari uning variantlari deyiladi: -ga, -ka, -qa; -dan, -din.',
    'Oʻrinli variantni tanlash nutq madaniyati belgisi; variantlikni omonimlikdan farqlash kerak.',
    'Baʼzi vaziyatlarda kelishiklar sinonim boʻladi: kelganiga — kelganidan xursand.'
  ],
  questions: [
    {
      id: 'oz38q1',
      prompt: 'Joʻnalish kelishigining variantlarini tanlang.',
      hint: 'Qayerga?',
      explanation: '-ga, -ka, -qa, -gʻa — joʻnalish kelishigi variantlari; -dan — chiqish kelishigi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: '-ga', correct: true },
            { label: '-ka', correct: true },
            { label: '-qa', correct: true },
            { label: '-dan' }
          ]
        }
      }
    },
    {
      id: 'oz38q2',
      prompt: 'Sinonim kelishik shakllarini juftlang.',
      hint: 'Maʼno bir xil.',
      explanation: 'Kelganiga xursand — kelganidan xursand; gapingizga tushunmadim — gapingizni tushunmadim.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'kelganiga xursand', right: 'kelganidan xursand' },
            { left: 'gapingizga tushunmadim', right: 'gapingizni tushunmadim' }
          ]
        }
      }
    },
    {
      id: 'oz38q3',
      prompt: 'Qaysi gapda kelishik variantlari sabab maʼnosini bildiradi?',
      hint: 'Nega xursand?',
      explanation: '«Yetib kelganingga (kelganingdan) xursand boʻldim» — sabab maʼnosi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Oʻz vaqtida yetib kelganingga xursand boʻldim.', 'Sifatli mahsulotni bizning doʻkondan topasiz.', 'Daryolardan kechib boraman.'], answerIndex: 0 } }
    },
    {
      id: 'oz38q4',
      prompt: 'Gapni toʻgʻri qoʻshimcha bilan toʻldiring: «Bugun biznikiga mehmon kelishini opamning telefonda aytayotgani… bilib oldim.»',
      hint: 'Qayerdan bildim?',
      explanation: '«-dan» — «aytayotganidan bilib oldim».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['-dan', '-da', '-ga'], answerIndex: 0 } }
    },
    {
      id: 'oz38q5',
      prompt: '«Malol kelmasa, eshikni narigi tomonidan yopsalar» gapida buyruq qanday ifodalangan?',
      hint: 'Hurmatli shakl, lekin…',
      explanation: 'Kinoya bilan — hurmat shakli ostida «chiqib keting» degan buyruq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kinoya bilan', 'qatʼiy buyruq bilan', 'iltimos bilan, samimiy', 'savol bilan'], answerIndex: 0 } }
    },
    {
      id: 'oz38q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Variant va omonim farqi.',
      explanation: 'Variantlar bir qoʻshimchaning koʻrinishlari; omonim qoʻshimchalar esa shakli bir, vazifasi boshqa — ularni farqlash kerak.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qoʻshimcha variantlarini omonimlikdan farqlash kerak.', value: true },
            { text: 'Har bir variantning oʻz qoʻllanish oʻrni bor.', value: true },
            { text: '-dan va -din — har xil kelishiklarning qoʻshimchalari.', value: false }
          ]
        }
      }
    }
  ]
};
