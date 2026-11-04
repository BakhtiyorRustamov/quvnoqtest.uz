import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 83–87-betlar — ifodalilik va kinoya: zid maʼno, ohang va qoʻshtirnoq; enantiosemik soʻzlar. */
export const OZ_20: BoardLesson = {
  n: 20,
  label: '20',
  group: OZG1,
  title: 'Ifodalilik va kinoya',
  section: 'Ona tili, 1-qism: «Ifodalilik va kinoya»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Kinoyada soʻz yoki ibora oʻz maʼnosiga mutlaqo qarama-qarshi maʼnoda ishlatiladi. U soʻzlovchining kesatiq, piching, istehzoli munosabatini bildiradi. Kinoya nutq vaziyati, kontekst va ohang orqali anglashiladi. Masalan, oʻqituvchi kasal boʻlib darsga kelmagani haqidagi «xushxabar» aslida «shumxabar» maʼnosida. Ogʻzaki nutqda kinoyaviy soʻz oʻziga xos ohang bilan aytiladi, yozuvda esa koʻpincha qoʻshtirnoqqa olinadi.",
      easy: "Kinoya — teskari maʼnoda gapirish: «Barakalla, juda «aqlli» ish qilibsan!»",
      draw: [
        { t: 'title', text: 'Kinoya — teskari maʼno' },
        { t: 'table', x: 4, y: 18, rows: [['soʻz', 'kinoyada'], ['«xushxabar»', 'shumxabar'], ['«dono»', 'aqlsiz'], ['«kamtarin»', 'maqtanchoq'], ['«sharofati bilan»', 'kasofati bilan']] },
        { t: 'text', x: 4, y: 52, text: 'Yozuvda — qoʻshtirnoq, ogʻzaki — ohang', size: 's', color: 'purple' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Kinoyada soʻz yoki ibora oʻz maʼnosiga zid maʼnoda qoʻllanadi va kesatiq, istehzo ifodalaydi.',
    'Kinoyaviy maʼno vaziyat, kontekst va ohang orqali anglashiladi.',
    'Ogʻzaki nutqda kinoya ohang bilan, yozuvda koʻpincha qoʻshtirnoq bilan ajratiladi.'
  ],
  questions: [
    {
      id: 'oz20q1',
      prompt: 'Kinoyada soʻz qanday maʼnoda qoʻllanadi?',
      hint: 'Teskari.',
      explanation: 'Oʻz maʼnosiga qarama-qarshi maʼnoda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻz maʼnosiga zid maʼnoda', 'oʻz maʼnosida', 'oʻxshashlik asosida', 'butun–boʻlak asosida'], answerIndex: 0 } }
    },
    {
      id: 'oz20q2',
      prompt: 'Qaysi gapda soʻz kinoya bilan qoʻllangan?',
      hint: 'Qoʻshtirnoq va kesatiq.',
      explanation: '«Dono» qoʻshtirnoqda va kesatiq ohangida — aslida «aqlsiz» maʼnosida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Hayotdan faqat nuqson izlaydigan «dono»lar ham bor.', 'Kampir juda dono ayol edi.', 'Donolar maslahati foydali.'], answerIndex: 0 } }
    },
    {
      id: 'oz20q3',
      prompt: 'Kinoya yozuvda koʻpincha qanday belgilanadi?',
      hint: 'Belgi.',
      explanation: 'Qoʻshtirnoq bilan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qoʻshtirnoq bilan', 'qavs bilan', 'nuqta bilan', 'katta harf bilan'], answerIndex: 0 } }
    },
    {
      id: 'oz20q4',
      prompt: 'Kinoyaviy maʼnoni anglashga nimalar yordam beradi?',
      hint: 'Uchta omil.',
      explanation: 'Nutq vaziyati, kontekst va ohang.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'nutq vaziyati', correct: true },
            { label: 'kontekst', correct: true },
            { label: 'ohang', correct: true },
            { label: 'soʻzning harflar soni' }
          ]
        }
      }
    },
    {
      id: 'oz20q5',
      prompt: 'Soʻzni kinoyaviy maʼnosi bilan juftlang.',
      hint: '«Husnixat» — xunuk yozuv.',
      explanation: '«Husnixat» — badxat; «xushboʻylik» — badboʻylik; «kamtarin» — maqtanchoq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«husnixat»', right: 'xunuk yozuv' },
            { left: '«xushboʻylik»', right: 'qoʻlansa hid' },
            { left: '«kamtarin»', right: 'maqtanchoq' }
          ]
        }
      }
    },
    {
      id: 'oz20q6',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Qoʻli kalta — imkoni cheklangan.',
      explanation: 'Qoʻli kalta — imkoniyati cheklangan; qoʻlini sovuq suvga urmaslik — ogʻir mehnat qilmaslik.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'qoʻli kalta', right: 'imkoniyati cheklangan' },
            { left: 'qoʻlini sovuq suvga urmaslik', right: 'ogʻir ish qilmaslik' }
          ]
        }
      }
    },
    {
      id: 'oz20q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kinoya — istehzo.',
      explanation: 'Kinoya istehzo, piching ifodalaydi va tez diqqatni tortadi; har doim ham qoʻshtirnoq qoʻyilavermaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kinoya soʻzlovchining istehzoli munosabatini bildiradi.', value: true },
            { text: 'Kinoyada maʼno zidligi diqqatni darhol tortadi.', value: true },
            { text: 'Kinoya faqat maqtash uchun ishlatiladi.', value: false }
          ]
        }
      }
    }
  ]
};
