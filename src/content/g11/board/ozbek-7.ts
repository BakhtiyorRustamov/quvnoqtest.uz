import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 33–35-betlar — aniqlik va badiiy nutq: obrazlilik, maʼno koʻchishi. */
export const OZ_7: BoardLesson = {
  n: 7,
  label: '7',
  group: OZG1,
  title: 'Nutqning aniqligi va badiiy nutq',
  section: 'Ona tili, 1-qism: «Nutqning aniqligi va badiiy nutq»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Badiiy nutqda aniqlik oʻziga xos koʻrinadi, chunki unda obrazlilik asosiy, vazifasi esa estetik taʼsir. Shuning uchun soʻzlar koʻchma va hatto yangi maʼno qirralarini oladi. Oddiy nutqda «Qor yonadi» desak, aniqlik buziladi — qor yonmaydi. Ammo «Qalovini topsang, qor yonar» maqolida fikr obrazli va mubolagʻali ifodalangan, bu yerda aniqlik buzilishi haqida gap boʻlmaydi.",
      easy: "Oddiy nutqda soʻz oʻz maʼnosida, badiiy nutqda koʻchma maʼnoda ham keladi — bu xato emas, goʻzallik.",
      draw: [
        { t: 'title', text: 'Oddiy va badiiy nutq' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'oddiy nutq', 'badiiy nutq'], ['maqsad', 'axborot', 'estetik taʼsir'], ['soʻz', 'oʻz maʼnosida', 'koʻchma maʼnoda'], ['«qor yonar»', 'xato', 'obrazli ifoda']] },
        { t: 'text', x: 4, y: 50, text: 'Qalovini topsang, qor yonar.', size: 's', color: 'purple' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Badiiy nutqda obrazlilik asosiy, vazifasi — estetik taʼsir.',
    'Badiiy nutqda soʻzlar koʻchma va yangi maʼno qirralarini olib, tasvirni yanada aniq va taʼsirli qiladi.',
    'Oddiy nutqda aniqlikni buzadigan ifoda badiiy nutqda goʻzal obrazga aylanishi mumkin.'
  ],
  questions: [
    {
      id: 'oz7q1',
      prompt: 'Badiiy nutqning asosiy vazifasi nima?',
      hint: 'Goʻzallik orqali taʼsir.',
      explanation: 'Estetik taʼsir etish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['estetik taʼsir etish', 'faqat axborot berish', 'qoidalarni sanab berish', 'raqamlarni hisoblash'], answerIndex: 0 } }
    },
    {
      id: 'oz7q2',
      prompt: 'Qaysi gaplarda soʻz koʻchma, obrazli maʼnoda kelgan?',
      hint: 'Tom maʼnoda boʻlishi mumkin emas.',
      explanation: '«Qor yonar», «bahor yashillik bilan yasanib keldi», «gʻururi kaltaklandi» — obrazli; «qor yogʻdi» — oddiy.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Qalovini topsang, qor yonar.', correct: true },
            { label: 'Bahor yashillik bilan yasanib keldi.', correct: true },
            { label: 'Uning gʻururi kaltaklandi.', correct: true },
            { label: 'Kecha qor yogʻdi.' }
          ]
        }
      }
    },
    {
      id: 'oz7q3',
      prompt: 'Nega «Qalovini topsang, qor yonar» maqolida aniqlik buzilgan hisoblanmaydi?',
      hint: 'Mubolagʻa.',
      explanation: 'Fikr obrazli va mubolagʻali ifodalangan — bu badiiy nutq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['fikr obrazli, mubolagʻali ifodalangan', 'qor rostdan yonadi', 'maqollarda qoida yoʻq', 'bu ilmiy gap'], answerIndex: 0 } }
    },
    {
      id: 'oz7q4',
      prompt: 'Nutq turini xususiyati bilan juftlang.',
      hint: 'Badiiy — obraz.',
      explanation: 'Oddiy nutq — soʻz oʻz maʼnosida; badiiy nutq — obrazlilik va maʼno koʻchishi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'oddiy nutq', right: 'soʻz oʻz maʼnosida' },
            { left: 'badiiy nutq', right: 'obrazlilik, maʼno koʻchishi' }
          ]
        }
      }
    },
    {
      id: 'oz7q5',
      prompt: '«Mum tishlamoq» iborasi nimani bildiradi?',
      hint: 'Ogʻziga tolqon solmoq.',
      explanation: 'Mutlaqo gapirmaslik, suhbatda qatnashmaslik.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['umuman gapirmaslik', 'shirinlik yemoq', 'tishni davolatmoq', 'koʻp gapirmoq'], answerIndex: 0 } }
    },
    {
      id: 'oz7q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '«Mazasi qochdi» ikki maʼnoli.',
      explanation: '«Mazasi qochdi» — sogʻligʻi yomonlashdi yoki ish yomonlashdi; badiiy nutqda soʻz yangi maʼno qirrasini olishi mumkin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Mazasi qochdi» iborasi «sogʻligʻi yomonlashdi» maʼnosini bildirishi mumkin.', value: true },
            { text: 'Badiiy nutqda soʻz yangi maʼno qirrasini olishi mumkin.', value: true },
            { text: 'Badiiy nutqda soʻzlar faqat oʻz maʼnosida qoʻllanadi.', value: false }
          ]
        }
      }
    }
  ]
};
