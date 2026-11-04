import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 9-mavzu (44–47-betlar) — Gʻarbda integratsiya: Yevropa Ittifoqining kengayishi, Maastrixt, yevro, Brexit; YI va AQSH munosabatlari. */
export const TARIX_109: BoardLesson = {
  n: 109,
  label: '9',
  group: JH2,
  title: 'Gʻarbda integratsiya. Yevropa Ittifoqi va AQSH',
  section: 'Jahon tarixi, 9-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Gʻarbiy Yevropada kapital, tovarlar, xizmatlar va ishchi kuchining erkin harakati davlatlarni bir-biriga yaqinlashtirdi. 1993-yilda Maastrixt kelishuvlari kuchga kirib, yagona Yevropa fuqaroligi paydo boʻldi: YI fuqarolari vizasiz istalgan aʼzo davlatda yashay oladigan boʻldi. 1996-yilga kelib aʼzolar soni 15 taga yetdi, 2002-yilda Kopengagenda Polsha, Chexiya, Vengriya, Boltiqboʻyi davlatlari va boshqalar qabul qilindi. 2002-yilda yagona valyuta — yevro muomalaga kirdi. YI amalda konfederatsiyaga oʻxshash birlikka aylandi.",
      easy: "1993 — Maastrixt, yagona fuqarolik; 2002 — yevro va 10 ta yangi aʼzo.",
      draw: [
        { t: 'title', text: 'YI qanday kengaydi' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: '1993: Maastrixt', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: '1996: 15 aʼzo', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: '2002: yevro', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: '2002, Kopengagen — 10 ta yangi aʼzo', size: 's' }
      ],
      next: 'Muammolar va AQSH'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Keyingi yillarda YIda muammolar koʻpaydi. Gretsiya, Italiya, Ispaniyaning qarzlari juda katta boʻlib ketdi; 2015-yilda Gretsiya qarzini kreditorlar shartlari bilan toʻlay olmasligini eʼlon qildi. 2016-yil iyunda Buyuk Britaniyada referendum boʻlib, qatnashganlarning yarmidan koʻpi YIdan chiqish uchun ovoz berdi. 2017-yilda Kataloniyadagi referendumni Madrid tan olmadi. YI va AQSH munosabatlari 1990-yildagi Transatlantik xartiyaga tayanadi. Ular yaqin hamkor, ammo yondashuvlari farq qiladi: AQSH koʻproq kuchga, YI diplomatiyaga tayanadi; 2017-yilda AQSH Parij iqlim kelishuvidan chiqishini eʼlon qildi.",
      easy: "Muammolar: qarzlar (Gretsiya), Brexit (2016), Kataloniya (2017). YI–AQSH: Transatlantik xartiya (1990).",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1990', 'Transatlantik xartiya'], ['2015', 'Gretsiya qarz inqirozi'], ['2016-yil iyun', 'Britaniyada referendum'], ['2017', 'Kataloniya referendumi'], ['2017', 'AQSH Parij kelishuvidan chiqdi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1993-yilda Maastrixt kelishuvlari yagona Yevropa fuqaroligini berdi; 2002-yilda yevro joriy qilindi va YI 10 ta yangi aʼzo bilan kengaydi.',
    'Qarz inqirozi (Gretsiya, 2015), Buyuk Britaniyaning YIdan chiqish haqidagi referendumi (2016) va Kataloniya masalasi YIdagi muammolarni koʻrsatdi.',
    'YI va AQSH Transatlantik xartiya (1990) asosida yaqin hamkorlik qiladi, lekin xalqaro muammolarni hal qilishda yondashuvlari farq qiladi.'
  ],
  questions: [
    {
      id: 'j9q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Xartiya — 1990.',
      explanation: 'Transatlantik xartiya (1990) → Maastrixt kuchga kirdi (1993) → yevro joriy qilindi (2002) → Britaniyada referendum (2016).',
      widget: { type: 'order_line', props: { items: [{ label: 'Transatlantik xartiya' }, { label: 'Maastrixt kuchga kirdi' }, { label: 'yevro joriy qilindi' }, { label: 'Britaniyada YI referendumi' }] } }
    },
    {
      id: 'j9q2',
      prompt: 'Maastrixt kelishuvlari nimani taʼminladi?',
      hint: 'Fuqarolik.',
      explanation: 'Yagona Yevropa fuqaroligini.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yagona armiyani', 'yagona Yevropa fuqaroligini', 'NATOning tuzilishini', 'Berlin devorini'], answerIndex: 1 } }
    },
    {
      id: 'j9q3',
      prompt: '1996-yilga kelib YI aʼzolari soni nechtaga yetgan?',
      hint: 'Oʻndan koʻp.',
      explanation: '15 taga.',
      widget: { type: 'number_answer', props: { answer: 15, unit: 'ta' } }
    },
    {
      id: 'j9q4',
      prompt: '2002-yilda Kopengagenda YIga qabul qilingan davlatlarni tanlang.',
      hint: 'Sharqiy Yevropa va Boltiqboʻyi.',
      explanation: 'Polsha, Chexiya, Vengriya, Latviya va boshqalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Polsha', correct: true },
            { label: 'Chexiya', correct: true },
            { label: 'Vengriya', correct: true },
            { label: 'Latviya', correct: true },
            { label: 'Ukraina' }
          ]
        }
      }
    },
    {
      id: 'j9q5',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Subsidiya — yordam.',
      explanation: 'Integratsiya — birlashish; subsidiya — moliyaviy yordam; restrukturizatsiya — qarz shartlarini qayta koʻrish.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'integratsiya', right: 'davlatlarning birlashuvi' },
            { left: 'subsidiya', right: 'moliyaviy yordam' },
            { left: 'restrukturizatsiya', right: 'qarz shartlarini qayta koʻrish' }
          ]
        }
      }
    },
    {
      id: 'j9q6',
      prompt: 'YIdagi muammolarni koʻrsatgan voqealarni tanlang.',
      hint: 'Qarz, referendumlar.',
      explanation: 'Gretsiya qarz inqirozi, Britaniyadagi referendum, Kataloniya referendumi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Gretsiya qarz inqirozi', correct: true },
            { label: 'Britaniyadagi YI referendumi', correct: true },
            { label: 'Kataloniya referendumi', correct: true },
            { label: 'yevroning joriy qilinishi' }
          ]
        }
      }
    },
    {
      id: 'j9q7',
      prompt: 'YI va AQSH xalqaro mojarolarni hal qilishda qanday farqlanadi?',
      hint: 'Kuch va diplomatiya.',
      explanation: 'AQSH koʻproq kuchga, YI diplomatik yoʻllarga tayanadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ikkalasi faqat kuchga tayanadi', 'AQSH — kuchga, YI — diplomatiyaga', 'AQSH — diplomatiyaga, YI — kuchga', 'farq yoʻq'], answerIndex: 1 } }
    },
    {
      id: 'j9q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Britaniya yevroni qabul qilmagan.',
      explanation: 'Britaniya yevroga oʻtmagan; YI fuqarolari vizasiz yashay oladi; AQSH 2017-yilda Parij kelishuvidan chiqishini eʼlon qilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'YI fuqarolari Ittifoqning istalgan davlatida vizasiz yashay oladi.', value: true },
            { text: '2017-yilda AQSH Parij iqlim kelishuvidan chiqishini eʼlon qilgan.', value: true },
            { text: 'Buyuk Britaniya 2002-yilda yevroga oʻtgan.', value: false },
            { text: 'Madrid Kataloniya referendumi natijalarini tan olgan.', value: false }
          ]
        }
      }
    }
  ]
};
