import type { BoardLesson } from './types';

export const OZG6 = { kicker: 'Adabiyot · I', title: 'Xalq ogʻzaki ijodi' };

/** Darslik: Adabiyot 11, I qism (B. Toʻxliyev va b., 2018), 8–51-betlar — «Goʻroʻgʻlining tugʻilishi» dostoni (Poʻlkan shoir varianti) va u haqida. */
export const OZ_42: BoardLesson = {
  n: 42,
  label: '42',
  group: OZG6,
  title: '«Goʻroʻgʻlining tugʻilishi» dostoni',
  section: 'Adabiyot, 1-qism: «Goʻroʻgʻlining tugʻilishi» va doston haqida',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Oʻzbek dostonchiligida «Goʻroʻgʻli» turkumi katta oʻrin tutadi — unda oltmishdan ortiq doston bor. «Goʻroʻgʻlining tugʻilishi» — turkumning ilk dostoni; darslikda Poʻlkan shoir varianti berilgan. Zargar yurti podshosi Shohdorxonning bosqini tufayli qahramonning ota-onasi — Ravshan va Bibi Hilol musofirchilikda yashaydi. Goʻroʻgʻli goʻrda tugʻiladi; uni Xizr va chiltanlar asraydi. Bu gʻayritabiiy tugʻilish uning kelajakdagi favqulodda kuchiga ishora. U voyaga yetib, el-yurt shaʼnini tiklaydi; doimiy hamrohi — Gʻirot oti.",
      easy: "Goʻroʻgʻli goʻrda tugʻilgan botir. Uni Xizr va chiltanlar asragan, oti — Gʻirot. Doston — «Goʻroʻgʻli» turkumining birinchisi.",
      draw: [
        { t: 'title', text: '«Goʻroʻgʻlining tugʻilishi»' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'dostonda'], ['turkum', '60 dan ortiq doston'], ['variant', 'Poʻlkan shoir (1874–1941)'], ['ota-onasi', 'Ravshan va Bibi Hilol'], ['homiylari', 'Xizr va chiltanlar'], ['oti', 'Gʻirot']] }
      ],
      next: 'Savollarga oʻtamiz'
    }
  ],
  summary: [
    '«Goʻroʻgʻlining tugʻilishi» — 60 dan ortiq dostonni oʻz ichiga olgan «Goʻroʻgʻli» turkumining ilk dostoni; darslikda Poʻlkan shoir varianti berilgan.',
    'Qahramonning goʻrda tugʻilishi, Xizr va chiltanlar homiyligi — uning favqulodda kuch va aql egasi boʻlishiga ishora.',
    'Doston xalq tarixi, jangovar oʻtmishi va milliy qadriyatlarini badiiy aks ettirgan boy merosdir.'
  ],
  questions: [
    {
      id: 'oz42q1',
      prompt: '«Goʻroʻgʻli» turkumida nechtadan ortiq doston bor?',
      hint: 'Oltmish.',
      explanation: 'Oltmishdan ortiq doston.',
      widget: { type: 'number_answer', props: { answer: 60, unit: 'ta' } }
    },
    {
      id: 'oz42q2',
      prompt: 'Dostondagi qahramonni roli bilan juftlang.',
      hint: 'Shohdorxon — bosqinchi.',
      explanation: 'Shohdorxon — bosqinchi podsho; Odilxon — Goʻroʻgʻlining odil bobosi; Bibi Hilol — onasi; Gʻirot — oti.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Shohdorxon', right: 'bosqinchi podsho' },
            { left: 'Odilxon', right: 'Goʻroʻgʻlining odil bobosi' },
            { left: 'Bibi Hilol', right: 'Goʻroʻgʻlining onasi' },
            { left: 'Gʻirot', right: 'qahramonning oti' }
          ]
        }
      }
    },
    {
      id: 'oz42q3',
      prompt: 'Darslikda dostonning qaysi baxshi varianti berilgan?',
      hint: '1874–1941.',
      explanation: 'Poʻlkan shoir (Muhammad Jomurot oʻgʻli) varianti.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Poʻlkan shoir', 'Fozil Yoʻldosh oʻgʻli', 'Ergash Jumanbulbul oʻgʻli', 'Islom shoir'], answerIndex: 0 } }
    },
    {
      id: 'oz42q4',
      prompt: 'Goʻroʻgʻlining gʻayritabiiy tugʻilishi nimaga ishora?',
      hint: 'Kelajak.',
      explanation: 'Uning kelajakda favqulodda kuch-qudrat va aql-idrok egasi boʻlishiga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['favqulodda kuch va aql egasi boʻlishiga', 'uning kasal boʻlishiga', 'shoh boʻlmasligiga', 'yurtni tark etishiga'], answerIndex: 0 } }
    },
    {
      id: 'oz42q5',
      prompt: '«Goʻroʻgʻli» nomining qaysi talqinlari darslikda keltirilgan?',
      hint: 'Uch xil oʻzak.',
      explanation: '«Goʻr»da tugʻilgan; «koʻr» otaning farzandi; «kur» — alp, botir, mard.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'goʻrda (qabrda) tugʻilgan', correct: true },
            { label: 'koʻr otaning farzandi', correct: true },
            { label: '«kur» — alp, botir', correct: true },
            { label: '«goʻzal yigit»' }
          ]
        }
      }
    },
    {
      id: 'oz42q6',
      prompt: 'Xalq dostonlarida Xizr va chiltanlar qanday vazifa bajaradi?',
      hint: 'Rahnamolar.',
      explanation: 'Qahramonga homiylik va rahnamolik qilib, uni elga xizmat qilishga oʻrgatadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qahramonga homiylik va rahnamolik qiladi', 'qahramonga dushmanlik qiladi', 'faqat kuzatib turadi', 'podshoga xizmat qiladi'], answerIndex: 0 } }
    },
    {
      id: 'oz42q7',
      prompt: 'Rayhon arab kim edi?',
      hint: 'Shirvon.',
      explanation: 'Shirvon yurtining kuchli, jasur podshosi; Xoljuvonni olib qochadi, Goʻroʻgʻli esa uning qizi Zaydinoyni togʻasi Ahmadbekka olib keladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Shirvon yurtining podshosi', 'Goʻroʻgʻlining otasi', 'baxshi', 'Zargar yurtining vaziri'], answerIndex: 0 } }
    },
    {
      id: 'oz42q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ot — doimiy hamroh.',
      explanation: 'Xalq dostonlarida qahramon doim oti bilan birga: Alpomishning Boychibori, Goʻroʻgʻlining Gʻiroti.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Xalq dostonlarida qahramon doim oti bilan birga namoyon boʻladi.', value: true },
            { text: 'Alpomishning oti — Boychibor.', value: true },
            { text: '«Goʻroʻgʻlining tugʻilishi» turkumning eng soʻnggi dostoni.', value: false }
          ]
        }
      }
    }
  ]
};
