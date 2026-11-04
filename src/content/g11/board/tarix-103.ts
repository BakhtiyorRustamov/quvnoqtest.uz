import type { BoardLesson } from './types';
import { JH1 } from './tarix-101';

/** Darslik: Jahon tarixi 11, 3-mavzu (15–18-betlar) — SSSRning tarqalishi, MDH tuzilishi, mustaqil davlatlardagi siyosiy va iqtisodiy muammolar, Rossiya va MDH. */
export const TARIX_103: BoardLesson = {
  n: 103,
  label: '3',
  group: JH1,
  title: 'Sovet davlatining parchalanishi',
  section: 'Jahon tarixi, 3-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1991-yil oxirida barcha sovet respublikalari SSSR tarkibidan chiqqanini eʼlon qildi. 8-dekabrda Rossiya, Ukraina va Belarus rahbarlari SSSR tugaganini va Mustaqil Davlatlar Hamdoʻstligi — MDH tuzilganini maʼlum qildi. Ashxoboddagi uchrashuvda Markaziy Osiyo respublikalari MDHga teng taʼsischi sifatida qoʻshilishini bildirdi, Olmaotada esa SSSR xalqaro huquq subyekti sifatida tugaganini tasdiqlovchi deklaratsiya qabul qilindi. 25-dekabrda Mixail Gorbachyov SSSR prezidentligidan ketdi.",
      easy: "1991-yil dekabr: 8 — MDH, 21 — Olmaota, 25 — Gorbachyov ketdi.",
      draw: [
        { t: 'title', text: '1991-yil dekabr' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: '8-dekabr: MDH', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'Olmaota: 21-dekabr', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'Gorbachyov ketdi', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'Boltiqboʻyi davlatlari MDHga kirmadi', size: 's' }
      ],
      next: 'Keyingi muammolar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "SSSR tarqalgach, yangi davlatlar oldida muammolar paydo boʻldi: koʻp joyda demokratik tizim qiyin shakllandi, eski iqtisodiy aloqalar uzildi. Rossiyadan tashqarida qolgan ruslar masalasi ham dolzarb boʻldi. Rossiyada 1999-yil oxirida B. Yelsin vakolatlarini V. Putinga topshirdi, 2000-yilda Putin prezident etib saylandi. 2014-yilda Ukrainadagi hokimiyat almashinuvi va Qrim atrofidagi voqealardan keyin Gʻarb Rossiyaga sanksiyalar eʼlon qildi va u G-8 dan chiqarildi. 2000-yillardan MDH davlatlari yaxshi iqtisodiy oʻsishni koʻrsatmoqda.",
      easy: "Muammolar: demokratiya, uzilgan aloqalar; 2000 — Putin; 2014 — sanksiyalar.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1991-yil dekabr', 'MDH tuzildi'], ['2000', 'V. Putin prezident'], ['2008', 'Gruziya MDHdan chiqdi'], ['2014', 'Rossiyaga sanksiyalar']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1991-yil 8-dekabrda Rossiya, Ukraina va Belarus SSSR tugaganini va MDH tuzilganini eʼlon qildi; 25-dekabrda Gorbachyov isteʼfoga chiqdi.',
    'Boltiqboʻyi davlatlaridan tashqari barcha sobiq sovet respublikalari MDHga kirdi; Gruziya 2008-yilda chiqdi.',
    'Yangi davlatlarda demokratiya qiyin shakllandi, iqtisodiy aloqalar uzildi; Rossiyada 2000-yildan Putin prezident, 2014-yildan Gʻarb sanksiyalari.'
  ],
  questions: [
    {
      id: 'j3q1',
      prompt: '1991-yil dekabridagi voqealarni tartiblang.',
      hint: '8-dekabr — birinchi.',
      explanation: 'MDH tuzilgani eʼlon qilindi (8-dekabr) → Olmaota deklaratsiyasi (21-dekabr) → Gorbachyov vakolatlarini topshirdi (25-dekabr).',
      widget: { type: 'order_line', props: { items: [{ label: 'MDH tuzilgani eʼlon qilindi' }, { label: 'Olmaota deklaratsiyasi' }, { label: 'Gorbachyov isteʼfoga chiqdi' }] } }
    },
    {
      id: 'j3q2',
      prompt: 'MDHni dastlab qaysi uch davlat rahbarlari eʼlon qilgan?',
      hint: 'Slavyan respublikalari.',
      explanation: 'Rossiya, Ukraina va Belarus.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Rossiya, Ukraina, Belarus', 'Oʻzbekiston, Qozogʻiston, Qirgʻiziston', 'Latviya, Litva, Estoniya', 'Gruziya, Armaniston, Ozarbayjon'], answerIndex: 0 } }
    },
    {
      id: 'j3q3',
      prompt: 'V. Putin birinchi marta qaysi yilda prezident etib saylangan?',
      hint: 'Yangi asr boshi.',
      explanation: '2000-yil martda.',
      widget: { type: 'number_answer', props: { answer: 2000, unit: 'yil' } }
    },
    {
      id: 'j3q4',
      prompt: 'MDHga kirmagan sobiq sovet respublikalarini tanlang.',
      hint: 'Boltiqboʻyi.',
      explanation: 'Latviya, Litva, Estoniya.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Latviya', correct: true },
            { label: 'Litva', correct: true },
            { label: 'Estoniya', correct: true },
            { label: 'Oʻzbekiston' },
            { label: 'Qozogʻiston' }
          ]
        }
      }
    },
    {
      id: 'j3q5',
      prompt: 'Sanani voqea bilan juftlang.',
      hint: 'Gruziya — 2008.',
      explanation: '1991 — MDH tuzildi; 2014 — Rossiyaga sanksiyalar eʼlon qilindi; 2008 — Gruziya MDHdan chiqdi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '1991', right: 'MDH tuzildi' },
            { left: '2014', right: 'Rossiyaga sanksiyalar' },
            { left: '2008', right: 'Gruziya MDHdan chiqdi' }
          ]
        }
      }
    },
    {
      id: 'j3q6',
      prompt: 'SSSR tarqalgandan keyingi muammolarni tanlang.',
      hint: 'Siyosat va iqtisod.',
      explanation: 'Demokratik tizimning qiyin shakllanishi, eski iqtisodiy aloqalarning uzilishi, chet elda qolgan ruslar masalasi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'demokratiyaning qiyin shakllanishi', correct: true },
            { label: 'iqtisodiy aloqalarning uzilishi', correct: true },
            { label: 'chegaradan tashqarida qolgan aholi', correct: true },
            { label: 'barcha muammolarning yoʻqolishi' }
          ]
        }
      }
    },
    {
      id: 'j3q7',
      prompt: '2014-yildan keyin Rossiya qaysi guruhdan chiqarildi?',
      hint: '«Katta sakkizlik».',
      explanation: 'G-8 dan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['BMT', 'G-8', 'ShHT', 'MDH'], answerIndex: 1 } }
    },
    {
      id: 'j3q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Yelsin → Putin.',
      explanation: '1999-yil oxirida Yelsin vakolatlarini Putinga topshirgan; MDH sobiq respublikalar aloqalarini saqlashda muhim rol oʻynagan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1999-yil oxirida B. Yelsin vakolatlarini V. Putinga topshirgan.', value: true },
            { text: 'MDH sobiq respublikalar oʻrtasidagi aloqalarni saqlashga yordam bergan.', value: true },
            { text: 'Boltiqboʻyi davlatlari MDHning taʼsischilari boʻlgan.', value: false },
            { text: 'SSSR 1995-yilda tarqalgan.', value: false }
          ]
        }
      }
    }
  ]
};
