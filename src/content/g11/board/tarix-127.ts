import type { BoardLesson } from './types';

export const JH3 = { kicker: 'Jahon tarixi · III bob', title: 'Yangi ming yillikda jahon sivilizatsiyasi muammolari' };

/** Darslik: Jahon tarixi 11, 27-mavzu (124–129-betlar) — globallashuv muammolari, ekstremizm va terrorizm, tabiiy resurslar va ekologik xavflar, Orol dengizi. */
export const TARIX_127: BoardLesson = {
  n: 127,
  label: '27',
  group: JH3,
  title: 'Globallashuv muammolari va global xavf-xatarlar',
  section: 'Jahon tarixi, 27-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Globallashuv — dunyo iqtisodiyoti, siyosati va madaniyatining birlashib, bir-biriga yaqinlashish jarayoni. Iqtisodiyot globallashgani sababli yuksalishlar ham, inqirozlar ham butun dunyoga tarqaladi; zamonaviy axborot tizimlari kapitalni juda tez harakatlantiradi. Madaniyatda globallashuv ziddiyatli: Internet, sayyohlik, kino va kitoblar xalqlarni yaqinlashtiradi, ammo sifatsiz «ommaviy madaniyat» milliy madaniyatlarga xavf solishi mumkin. Eng katta xavflardan biri — ekstremizm va terrorizm. Ekstremizm — maqsadga qonunda taqiqlangan, zoʻravon usullar bilan erishishga urinish; terrorizm uning eng xavfli shakli. Dinni niqob qilgan «Al-Qoida» va ISHID kabi tashkilotlar yoshlarni, ayniqsa Internet orqali, oʻz domiga tortishga urinmoqda.",
      easy: "Globallashuv — dunyoning yaqinlashuvi; xavflar: ommaviy madaniyat, ekstremizm va terrorizm.",
      draw: [
        { t: 'title', text: 'Globallashuv' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'iqtisodiy', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'siyosiy', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'madaniy', color: 'green' },
        { t: 'text', x: 4, y: 46, text: 'Xavf: ekstremizm → terrorizm', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 54, text: 'Himoya: bilim va ogohlik', size: 's', color: 'blue' }
      ],
      next: 'Ekologik xavflar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Insonning ishlab chiqarish faoliyati biosferaga tobora koʻproq zarar yetkazmoqda. Ozon qatlami yemirilmoqda, atmosferaga chiqarilayotgan gazlar global iqlim oʻzgarishini boshlab berdi: Yerdagi oʻrtacha harorat oshib bormoqda, kelajakda muzliklar erishi va okean sathining koʻtarilishi qirgʻoqboʻyi shaharlarini suv bosishiga olib kelishi mumkin. Oʻzbekiston uchun eng katta ekologik muammo — Orol dengizi: soʻnggi qirq yilda u keskin qisqardi, suvining 90 foizdan ortigʻi qurib, shoʻrligi oʻnlab marta oshdi. Bu Orolboʻyi aholisi salomatligi va tabiatiga jiddiy zarar yetkazmoqda. Bunday muammolarni hal qilish uchun butun insoniyatning hamkorligi zarur.",
      easy: "Ekologik xavflar: ozon qatlami, iqlim oʻzgarishi; Orol dengizining 90 % dan ortigʻi qurigan.",
      draw: [
        { t: 'title', text: 'Ekologik xavflar' },
        { t: 'list', x: 4, y: 18, items: ['ozon qatlamining yemirilishi', 'global iqlim oʻzgarishi', 'muzliklarning erishi', 'Orol dengizi fojiasi'] },
        { t: 'text', x: 60, y: 24, text: 'Orol:', size: 's', color: 'red' },
        { t: 'text', x: 60, y: 32, text: '> 90 % qurigan', size: 's', color: 'red' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Globallashuv — iqtisodiy, siyosiy va madaniy yaqinlashuv jarayoni; u imkoniyatlar bilan birga inqirozlarning tez tarqalishi va milliy madaniyatlarga xavf kabi muammolarni keltiradi.',
    'Ekstremizm — maqsadga taqiqlangan, zoʻravon usullar bilan erishish; uning eng xavfli shakli — terrorizm, dinni niqob qilgan guruhlar ayniqsa yoshlarni nishonga oladi.',
    'Ekologik xavflar — ozon qatlamining yemirilishi, iqlim oʻzgarishi; Oʻzbekiston uchun eng katta muammo — Orol dengizining qurishi.'
  ],
  questions: [
    {
      id: 'j27q1',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Terrorizm — ekstremizmning eng xavfli shakli.',
      explanation: 'Globallashuv — dunyoning yaqinlashuvi; ekstremizm — maqsadga taqiqlangan usullar bilan erishish; terrorizm — qoʻrqitish va zoʻravonlik orqali taʼsir oʻtkazish; unifikatsiya — bitta tizimga keltirish.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'globallashuv', right: 'dunyoning yaqinlashuv jarayoni' },
            { left: 'ekstremizm', right: 'taqiqlangan usullar bilan maqsadga erishish' },
            { left: 'terrorizm', right: 'qoʻrqitish va zoʻravonlik orqali taʼsir' },
            { left: 'unifikatsiya', right: 'bitta tizimga keltirish' }
          ]
        }
      }
    },
    {
      id: 'j27q2',
      prompt: 'Darslikka koʻra ekstremizmning eng xavfli shakli qaysi?',
      hint: 'Qoʻrqitish.',
      explanation: 'Terrorizm.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['terrorizm', 'globallashuv', 'urbanizatsiya', 'integratsiya'], answerIndex: 0 } }
    },
    {
      id: 'j27q3',
      prompt: 'Orol dengizining necha foizdan ortigʻi qurigan?',
      hint: 'Deyarli butunlay.',
      explanation: '90 % dan ortigʻi.',
      widget: { type: 'number_answer', props: { answer: 90, unit: '%' } }
    },
    {
      id: 'j27q4',
      prompt: 'Muammoni turiga ajrating.',
      hint: 'Ozon — ekologik.',
      explanation: 'Ekologik — ozon qatlami, iqlim oʻzgarishi, Orol; ijtimoiy-siyosiy — terrorizm, ekstremizm.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'e', label: 'ekologik' }, { id: 's', label: 'ijtimoiy-siyosiy' }],
          items: [
            { emoji: '🌍', label: 'ozon qatlamining yemirilishi', bin: 'e' },
            { emoji: '🌡️', label: 'global iqlim oʻzgarishi', bin: 'e' },
            { emoji: '🏜️', label: 'Orol dengizining qurishi', bin: 'e' },
            { emoji: '⚠️', label: 'terrorizm', bin: 's' },
            { emoji: '🚫', label: 'ekstremizm', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'j27q5',
      prompt: 'Global iqlim oʻzgarishining kutilayotgan oqibatlarini tanlang.',
      hint: 'Muz va okean.',
      explanation: 'Muzliklarning erishi, okean sathining koʻtarilishi, qirgʻoqboʻyi yerlarini suv bosishi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'muzliklarning erishi', correct: true },
            { label: 'okean sathining koʻtarilishi', correct: true },
            { label: 'qirgʻoqboʻyi shaharlarni suv bosishi', correct: true },
            { label: 'Yer haroratining pasayishi' }
          ]
        }
      }
    },
    {
      id: 'j27q6',
      prompt: 'Madaniy globallashuvning salbiy tomoni sifatida darslik nimani keltiradi?',
      hint: 'Sifatsiz mahsulotlar.',
      explanation: 'Milliy madaniyatlarga xavf soladigan «ommaviy madaniyat»ni.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«ommaviy madaniyat»', 'xalqaro sayyohlik', 'kitob nashri', 'muzeylar'], answerIndex: 0 } }
    },
    {
      id: 'j27q7',
      prompt: 'Ekstremistik gʻoyalardan himoyalanishga yordam beradigan narsalarni tanlang.',
      hint: 'Bilim.',
      explanation: 'Bilim, tanqidiy fikrlash, ishonchli manbalardan foydalanish xavfni tushunishga yordam beradi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'bilim va maʼrifat', correct: true },
            { label: 'tanqidiy fikrlash', correct: true },
            { label: 'ishonchli manbalardan foydalanish', correct: true },
            { label: 'har qanday xabarga koʻr-koʻrona ishonish' }
          ]
        }
      }
    },
    {
      id: 'j27q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Globallashuv — inqirozlar ham tarqaladi.',
      explanation: 'Globallashuv tufayli inqirozlar butun dunyoga tarqaladi; global muammolarni hal qilish xalqaro hamkorlikni talab qiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Globallashuv tufayli iqtisodiy inqirozlar butun dunyoga tez tarqaladi.', value: true },
            { text: 'Global muammolarni hal qilish insoniyatdan hamkorlikni talab qiladi.', value: true },
            { text: 'Orol dengizining suv hajmi soʻnggi yillarda koʻpaygan.', value: false },
            { text: 'Ozon qatlami Yerni hech narsadan himoya qilmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
