import type { BoardLesson } from './types';

export const OZG5 = { kicker: 'Ona tili · IV fasl', title: 'Grammatik va punktuatsion meʼyorlar' };

/** Darslik: Ona tili 11, 2-qism (2020), 16-mavzu (59–62-betlar) — ortiqcha qoʻshimchalar va nutqiy tejamkorlik. */
export const OZ_37: BoardLesson = {
  n: 37,
  label: '37',
  group: OZG5,
  title: 'Ortiqcha qoʻshimchalar',
  section: 'Ona tili, 2-qism: 16-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Ortiqcha qoʻshimcha nutq uchun «yuk» boʻlib, nutq madaniyatiga salbiy taʼsir qiladi. Masalan, «oʻnta oʻquvchilar» birikmasida koʻplik qoʻshimchasi ortiqcha — son koʻplikni bildirib turibdi; toʻgʻrisi «oʻnta oʻquvchi». «Qoʻllanib kelinmoqda» emas, «qoʻllanib kelmoqda» deyiladi. «Birisini», «oxirisida» oʻrniga «birini», «oxirida»; «adovatsizlik» emas, «adovat» deyish kerak. Qoʻshimcha ishlatishda ham nutqiy tejamkorlikka rioya qilinadi. Mumtoz sheʼrdagi «-gʻa», «-ka» kabi shakllar esa xato emas, davr meʼyori.",
      easy: "Ortiqcha qoʻshimcha qoʻshmang: «oʻnta oʻquvchilar» emas — «oʻnta oʻquvchi».",
      draw: [
        { t: 'title', text: 'Ortiqcha qoʻshimcha — yuk' },
        { t: 'table', x: 4, y: 18, rows: [['✗ ortiqcha', '✓ toʻgʻri'], ['oʻnta oʻquvchilar', 'oʻnta oʻquvchi'], ['qoʻllanib kelinmoqda', 'qoʻllanib kelmoqda'], ['birisini', 'birini'], ['oxirisida', 'oxirida'], ['betinimsiz', 'betinim']] }
      ],
      next: 'Savollarga oʻtamiz'
    }
  ],
  summary: [
    'Ortiqcha qoʻshimcha nutq uchun «yuk» hisoblanadi va nutq madaniyatiga zarar yetkazadi.',
    'Son bilan kelgan otga koʻplik qoʻshimchasi qoʻshilmaydi: oʻnta oʻquvchi.',
    'Qoʻshimcha qoʻllashda nutqiy tejamkorlikka rioya qilinadi; mumtoz sheʼrdagi eski shakllar xato hisoblanmaydi.'
  ],
  questions: [
    {
      id: 'oz37q1',
      prompt: 'Qaysi birikma toʻgʻri?',
      hint: 'Son koʻplikni bildiradi.',
      explanation: '«Oʻnta oʻquvchi» — «-lar» ortiqcha.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻnta oʻquvchi', 'oʻnta oʻquvchilar', 'oʻnta oʻquvchilari'], answerIndex: 0 } }
    },
    {
      id: 'oz37q2',
      prompt: 'Xatoli shaklni toʻgʻrisi bilan juftlang.',
      hint: 'Birisini — birini.',
      explanation: 'Birisini — birini; oxirisida — oxirida; olishuvisiga — olishuviga; betinimsiz — betinim.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'birisini', right: 'birini' },
            { left: 'oxirisida', right: 'oxirida' },
            { left: 'olishuvisiga', right: 'olishuviga' },
            { left: 'betinimsiz', right: 'betinim' }
          ]
        }
      }
    },
    {
      id: 'oz37q3',
      prompt: 'Qaysi shakl toʻgʻri?',
      hint: 'Ortiqcha -in-.',
      explanation: '«Qoʻllanib kelmoqda» — toʻgʻri.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qoʻllanib kelmoqda', 'qoʻllanib kelinmoqda'], answerIndex: 0 } }
    },
    {
      id: 'oz37q4',
      prompt: 'Qaysi soʻzlarda ortiqcha qoʻshimcha bor?',
      hint: 'Maʼno teskarisiga oʻgirilgan.',
      explanation: '«Adovatsizlik», «behurmatsizlik» — ortiqcha «-siz» maʼnoni buzadi; toʻgʻrisi «adovat», «behurmatlik».',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'adovatsizlik (adovat oʻrniga)', correct: true },
            { label: 'behurmatsizlik (behurmatlik oʻrniga)', correct: true },
            { label: 'mehribonlik' },
            { label: 'sadoqat' }
          ]
        }
      }
    },
    {
      id: 'oz37q5',
      prompt: 'Mumtoz sheʼrdagi «sanga», «koʻngluma» kabi shakllar haqida qaysi fikr toʻgʻri?',
      hint: 'Davr meʼyori.',
      explanation: 'Ular mumtoz sheʼriyat talabiga koʻra qoʻllangan, xato hisoblanmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['davr meʼyori, xato emas', 'imlo xatosi', 'ortiqcha qoʻshimcha', 'sheva soʻzi'], answerIndex: 0 } }
    },
    {
      id: 'oz37q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tejamkorlik.',
      explanation: 'Qoʻshimcha qoʻllashda tejamkorlik kerak; takror qoʻshimchalar nutqni ogʻirlashtiradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qoʻshimcha qoʻllashda ham nutqiy tejamkorlikka rioya qilinadi.', value: true },
            { text: 'Ortiqcha qoʻshimcha nutq uchun «yuk» hisoblanadi.', value: true },
            { text: 'Qoʻshimcha qancha koʻp boʻlsa, nutq shuncha chiroyli.', value: false }
          ]
        }
      }
    }
  ]
};
