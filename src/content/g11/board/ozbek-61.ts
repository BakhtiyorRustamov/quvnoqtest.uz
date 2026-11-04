import type { BoardLesson } from './types';
import { OZG9 } from './ozbek-59';

/** Darslik: Adabiyot 11, II qism (2018), 35–62-betlar — Abdulhamid Choʻlpon, «Kecha va kunduz» romani («Kecha»dan parcha). */
export const OZ_61: BoardLesson = {
  n: 61,
  label: '61',
  group: OZG9,
  title: 'Choʻlpon. «Kecha va kunduz»',
  section: 'Adabiyot, 2-qism: Abdulhamid Choʻlpon (1898–1938); «Kecha va kunduz» romani va undan parcha haqida',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Abdulhamid Choʻlpon (1898–1938) — shoir, nosir va dramaturg; «Qurvoni jaholat», «Qor qoʻynida lola», «Oydin kechalarda» kabi hikoyalar ham yozgan. «Kecha va kunduz» romani ikki qismli qilib rejalashtirilgan, birinchi qismi — «Kecha» 1936-yilda bosilgan, ikkinchisining taqdiri nomaʼlum. Roman XX asr boshidagi Turkiston hayotini, mahalliy amaldorlarning qilmishlarini koʻrsatadi; bosh qahramon — oʻn besh yoshli Zebi. Asar «Hamal keldi — amal keldi» maqoli bilan boshlanadi va bahor uygʻonishi shoirona tasvirlanadi. Zebining otasi Razzoq soʻfi — tund, qattiqqoʻl, ziqna odam; uning qorongʻi tabiati bahor va yoshlik quvonchiga qarama-qarshi qoʻyiladi.",
      easy: "«Kecha va kunduz»da Zebi ismli qizning taqdiri hikoya qilinadi. Bahor quvonchi otasi Razzoq soʻfining tundligiga qarshi qoʻyiladi.",
      draw: [
        { t: 'title', text: '«Kecha»dagi qarama-qarshilik' },
        { t: 'box', id: 'b', x: 4, y: 22, w: 42, h: 14, text: 'bahor, yoshlik: Zebi, Saltanat', color: 'green' },
        { t: 'box', id: 'r', x: 54, y: 22, w: 42, h: 14, text: 'tundlik: Razzoq soʻfi', color: 'red' },
        { t: 'arrow', from: 'b', to: 'r' },
        { t: 'text', x: 4, y: 50, text: 'Epigraf: «Hamal keldi, amal keldi»', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 58, text: '«Kecha» — 1936-yil, romanning 1-qismi', size: 's', color: 'ink' }
      ],
      next: 'Mashqlarga oʻtamiz'
    }
  ],
  summary: [
    'Choʻlpon (1898–1938) — shoir, nosir, dramaturg; «Kecha va kunduz»ning birinchi qismi «Kecha» 1936-yilda bosilgan.',
    'Roman XX asr boshidagi Turkiston hayotini aks ettiradi; bosh qahramon — Zebi.',
    'Bahor uygʻonishi va yoshlik quvonchi Razzoq soʻfining tund, qattiqqoʻl tabiatiga qarama-qarshi qoʻyiladi.'
  ],
  questions: [
    {
      id: 'oz61q1',
      prompt: '«Kecha» romani qachon bosilgan?',
      hint: '30-yillar.',
      explanation: '1936-yilda.',
      widget: { type: 'number_answer', props: { answer: 1936, unit: 'yil' } }
    },
    {
      id: 'oz61q2',
      prompt: 'Romanning bosh qahramoni kim?',
      hint: 'Oʻn besh yoshli qiz.',
      explanation: 'Zebi (Zebinisa).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Zebi', 'Kumush', 'Raʼno', 'Farida'], answerIndex: 0 } }
    },
    {
      id: 'oz61q3',
      prompt: 'Roman qaysi epigraf bilan boshlanadi?',
      hint: 'Xalq maqoli.',
      explanation: '«Hamal keldi, amal keldi» — bahorning birinchi oyi, uygʻonish fasli.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Hamal keldi, amal keldi', 'Mehnat bekor ketmaydi', 'Uma kelsa, qut kelar', 'Vatan — ona'], answerIndex: 0 } }
    },
    {
      id: 'oz61q4',
      prompt: 'Razzoq soʻfiga xos belgilarni belgilang.',
      hint: '«Hovva-hovva» va «yoʻq, yoʻq».',
      explanation: 'U tund, kamgap, ziqna; kuchlilarga «hovva» deydi, kuchsizlarni inkor etadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tund va xoʻmraygan', correct: true },
            { label: 'kamgap va ziqna', correct: true },
            { label: 'kuchlilar oldida «hovva» deydi', correct: true },
            { label: 'quvnoq va saxiy' }
          ]
        }
      }
    },
    {
      id: 'oz61q5',
      prompt: 'Personajni romandagi roli bilan juftlang.',
      hint: 'Saltanat — dugona.',
      explanation: 'Zebi — bosh qahramon; Saltanat — Zebining dugonasi; Razzoq soʻfi — Zebining otasi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Zebi', right: 'bosh qahramon' },
            { left: 'Saltanat', right: 'Zebining dugonasi' },
            { left: 'Razzoq soʻfi', right: 'Zebining otasi' }
          ]
        }
      }
    },
    {
      id: 'oz61q6',
      prompt: 'Soʻfi qizining safarga borishiga qanday shart qoʻyadi?',
      hint: 'Ovoz.',
      explanation: 'Nomahramlarga ovozini eshittirib ashula aytmasin, deydi — bu keyingi voqealar uchun muhim detal.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ashula aytmasin', 'kechqurun qaytsin', 'kitob olib ketsin', 'otasi bilan borsin'], answerIndex: 0 } }
    },
    {
      id: 'oz61q7',
      prompt: 'Ruxsat tegishini adib qaysi obrazli ibora bilan ifodalaydi?',
      hint: 'Qush va qafas.',
      explanation: '«Qafasning darichasi ochildi».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Qafasning darichasi ochildi', 'Tong otdi', 'Bahor keldi', 'Yoʻl ochildi'], answerIndex: 0 } }
    },
    {
      id: 'oz61q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ikki qism.',
      explanation: 'Roman ikki qismli rejalashtirilgan, ikkinchi qismining taqdiri nomaʼlum; Choʻlpon oy, quyosh, yulduz timsollaridan koʻp foydalangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Romanning ikkinchi qismi — «Kunduz»ning taqdiri nomaʼlum.', value: true },
            { text: 'Choʻlpon oy, quyosh, yulduz kabi timsollardan unumli foydalangan.', value: true },
            { text: 'Roman Amir Temur davrida kechadi.', value: false }
          ]
        }
      }
    }
  ]
};
