import type { BoardLesson } from './types';
import { OZG10 } from './ozbek-64';

/** Darslik: Adabiyot 11, II qism (2018), 120–151-betlar — Mustaqillik davri dramaturgiyasi; Erkin Aʼzam, «Tanho qayiq». */
export const OZ_66: BoardLesson = {
  n: 66,
  label: '66',
  group: OZG10,
  title: 'Dramaturgiya. «Tanho qayiq»',
  section: 'Adabiyot, 2-qism: Mustaqillik davri dramaturgiyasi; Erkin Aʼzam, «Tanho qayiq» — Orol bobodan dramatik rivoyat',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Oʻzbek dramaturgiyasining yuz yillik tarixi XX asr boshidagi jadid teatridan boshlanadi: «Padarkush» (Behbudiy), «Abulfayzxon» (Fitrat) shu davr namunalari. Drama janrlari: komediya — kulgi orqali, fojia — kuchli ziddiyat va achinish orqali, tragikomediya esa ikkalasini birlashtiradi (masalan, Sharof Boshbekovning «Temir xotin»i). Mustaqillik davri dramalarida milliy qadriyatlar, urf-odatlar va tarixiy shaxslar talqiniga alohida eʼtibor qaratildi. Erkin Aʼzamning «Tanho qayiq» asari — «Orol bobodan dramatik rivoyat»: qurib qolgan dengiz boʻyidagi ovulda qariya qayiqsoz Orol bobo hamon qayiq yasaydi, shogirdlari esa uning yoʻlini davom ettiradi. Final sahnada qayiq-tobut koʻk dengizi sari suzib ketadi — asar Orol fojiasi va ekologiya muammosini badiiy talqin qiladi.",
      easy: "«Tanho qayiq»da qurigan Orol boʻyidagi qayiqsoz chol haqida hikoya qilinadi. Asar ekologiya fojiasini koʻrsatadi.",
      draw: [
        { t: 'title', text: 'Drama janrlari' },
        { t: 'table', x: 4, y: 18, rows: [['janr', 'xususiyati', 'namuna'], ['komediya', 'kulgi, xarakter', '—'], ['fojia', 'kuchli ziddiyat', '«Abulfayzxon»'], ['tragikomediya', 'kulgi va qaygʻu', '«Temir xotin»'], ['dramatik rivoyat', 'ramz, afsona', '«Tanho qayiq»']] },
        { t: 'text', x: 4, y: 52, text: '«Tanho qayiq» mavzusi: Orol fojiasi, ekologiya', size: 's', color: 'purple' }
      ],
      next: 'Savollarga oʻtamiz'
    }
  ],
  summary: [
    'Oʻzbek dramaturgiyasi XX asr boshidagi jadid teatridan boshlanadi; janrlari — komediya, fojia, tragikomediya.',
    'Mustaqillik davri dramalarida milliy qadriyatlar, urf-odatlar va tarixiy shaxslar talqiniga eʼtibor kuchaydi.',
    'Erkin Aʼzamning «Tanho qayiq» dramatik rivoyatida qayiqsoz Orol bobo obrazi orqali Orol fojiasi koʻrsatiladi.'
  ],
  questions: [
    {
      id: 'oz66q1',
      prompt: '«Tanho qayiq» asarining muallifi kim?',
      hint: 'Oʻzbekiston xalq yozuvchisi, 1950-yilda tugʻilgan.',
      explanation: 'Erkin Aʼzam.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Erkin Aʼzam', 'Erkin Vohidov', 'Sharof Boshbekov', 'Abdulla Oripov'], answerIndex: 0 } }
    },
    {
      id: 'oz66q2',
      prompt: 'Asarning bosh qahramoni kim?',
      hint: 'Qayiqsoz qariya.',
      explanation: 'Orol bobo.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Orol bobo', 'Razzoq soʻfi', 'Ibrohimbiy', 'Nazrul Islom'], answerIndex: 0 } }
    },
    {
      id: 'oz66q3',
      prompt: 'Drama janrini xususiyati bilan juftlang.',
      hint: 'Tragikomediya — ikkisi birga.',
      explanation: 'Komediya — kulgi orqali; fojia — achinish uygʻotadi; tragikomediya — kulgi va qaygʻu birga.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'komediya', right: 'kulgi orqali ifoda' },
            { left: 'fojia', right: 'achinish uygʻotadi' },
            { left: 'tragikomediya', right: 'kulgi va qaygʻu birga' }
          ]
        }
      }
    },
    {
      id: 'oz66q4',
      prompt: '«Tanho qayiq» qaysi muammoni badiiy talqin qiladi?',
      hint: 'Dengiz qurigan.',
      explanation: 'Orol fojiasi — ekologiya muammosini.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Orol fojiasi, ekologiya', 'sulolalar kurashi', 'shahar qurilishi', 'kosmos sirlari'], answerIndex: 0 } }
    },
    {
      id: 'oz66q5',
      prompt: '«Padarkush» dramasining muallifi kim?',
      hint: 'Jadid maʼrifatchisi.',
      explanation: 'Mahmudxoʻja Behbudiy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Mahmudxoʻja Behbudiy', 'Fitrat', 'Choʻlpon', 'Hamza'], answerIndex: 0 } }
    },
    {
      id: 'oz66q6',
      prompt: 'Dramatik asarda obraz tabiati qaysi vositalar orqali ochiladi?',
      hint: 'Sahnaga xos.',
      explanation: 'Dialog va monolog, xatti-harakat, imo-ishora, sukut, yigʻi yoki kulgi orqali.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'dialog va monolog', correct: true },
            { label: 'xatti-harakat, imo-ishora', correct: true },
            { label: 'sukut, yigʻi yoki kulgi', correct: true },
            { label: 'faqat muallif bayoni' }
          ]
        }
      }
    },
    {
      id: 'oz66q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Final sahna.',
      explanation: 'Finalda qayiq-tobut koʻkka koʻtarilib, dengiz sari suzib ketadi; jadidlar teatrni «ibratxona» deb bilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Final sahnada qayiq-tobut koʻk dengizi sari suzib ketadi.', value: true },
            { text: 'Jadidlar teatr sahnasiga «ibratxona» sifatida qaragan.', value: true },
            { text: '«Temir xotin» — sof fojia janridagi asar.', value: false }
          ]
        }
      }
    }
  ]
};
