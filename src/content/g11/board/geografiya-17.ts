import type { BoardLesson } from './types';

export const GEO5 = { kicker: '5-bob', title: 'Dunyo aholisi' };

/** Darslik: Geografiya 10, 17-§ (72–76-betlar) — dunyo aholisining oʻsishi, demografik portlash, demografik oʻtish bosqichlari, mintaqalar boʻyicha koʻrsatkichlar, demografik siyosat. */
export const GEO_17: BoardLesson = {
  n: 17,
  label: '17',
  group: GEO5,
  title: 'Dunyo aholisi va zamonaviy demografik vaziyat',
  section: '17-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "XIX asrgacha dunyo aholisi juda sekin oʻsdi va 1820-yilga kelib 1 milliardga yetdi. 2 milliardga yetishi uchun 107 yil kerak boʻldi — 1927-yil. Keyin oʻsish keskin tezlashdi: 1960-yilda 3 milliard, 1975-yilda 4, 1987-yilda 5, 1999-yilda 6, 2011-yilda 7 milliard, 2017-yilda esa qariyb 7,5 milliard. Aholining bunday keskin koʻpayishi demografik portlash deyiladi. Uning sababi — turmush darajasi va tibbiyotning rivojlanishi tufayli oʻlimning kamayishi, umr davomiyligining oʻsishi.",
      easy: "1 mlrd (1820) → 7 mlrd (2011); keskin oʻsish — demografik portlash, sababi oʻlimning kamayishi.",
      draw: [
        { t: 'title', text: 'Dunyo aholisi, mlrd' },
        { t: 'bars', x: 6, y: 18, w: 80, h: 34, items: [{ label: '1820', value: 1 }, { label: '1927', value: 2 }, { label: '1960', value: 3 }, { label: '1987', value: 5 }, { label: '2011', value: 7 }] }
      ],
      next: 'Demografik oʻtish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Demografik oʻtish nazariyasiga koʻra jamiyat toʻrt bosqichdan oʻtadi. Birinchisida tugʻilish ham, oʻlim ham juda yuqori — «anʼanaviy turgʻunlik». Ikkinchisida oʻlim keskin kamayadi — demografik portlash. Uchinchisida tugʻilish ham pasaya boshlaydi: shaharlashuv, taʼlim va turmush tarzi oʻzgaradi. Toʻrtinchisida ikkala koʻrsatkich past — «zamonaviy barqarorlik»; baʼzan aholi kamayadi — depopulyatsiya. Rivojlangan davlatlar toʻrtinchi bosqichda, koʻpchilik rivojlanayotgan davlatlar uchinchisida, Afrikaning koʻp mamlakatlari ikkinchisidan uchinchisiga oʻtmoqda. Davlatning aholi oʻsishiga taʼsir qilish choralari demografik siyosat deyiladi: baʼzi davlatlar oʻsishni kamaytirishga, Yevropa davlatlari esa koʻpaytirishga harakat qilmoqda.",
      easy: "Demografik oʻtish: anʼanaviy turgʻunlik → portlash → tugʻilish pasayadi → zamonaviy barqarorlik.",
      draw: [
        { t: 'title', text: 'Tabiiy koʻpayish, ‰ (2016)' },
        { t: 'bars', x: 6, y: 18, w: 70, h: 34, items: [{ label: 'Afrika', value: 26 }, { label: 'Osiyo', value: 11 }, { label: 'Lotin Amerikasi', value: 11 }, { label: 'Yevropa', value: 0 }] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Dunyo aholisi 1820-yilda 1 mlrd ga yetgan, XIX–XX asrlarda oʻsish keskin tezlashib (demografik portlash), 2011-yilda 7 mlrd, 2017-yilda qariyb 7,5 mlrd boʻldi.',
    'Demografik oʻtish toʻrt bosqichdan iborat: anʼanaviy turgʻunlik, demografik portlash, tugʻilishning pasayishi va zamonaviy barqarorlik.',
    'Hozir aholi asosan rivojlanayotgan mamlakatlar hisobiga koʻpaymoqda (Afrikada tabiiy koʻpayish eng yuqori); davlatlar demografik siyosat orqali oʻsishni kamaytirish yoki koʻpaytirishga harakat qiladi.'
  ],
  questions: [
    {
      id: 'g17q1',
      prompt: 'Dunyo aholisi milliardlarga yetgan yillarni tartiblang.',
      hint: '1 mlrd — 1820.',
      explanation: '1 mlrd (1820) → 2 mlrd (1927) → 3 mlrd (1960) → 6 mlrd (1999) → 7 mlrd (2011).',
      widget: { type: 'order_line', props: { items: [{ label: '1 mlrd' }, { label: '2 mlrd' }, { label: '3 mlrd' }, { label: '6 mlrd' }, { label: '7 mlrd' }] } }
    },
    {
      id: 'g17q2',
      prompt: 'Dunyo aholisi 1 milliarddan 2 milliardga yetishi uchun necha yil kerak boʻlgan?',
      hint: '1820 dan 1927 gacha.',
      explanation: '107 yil.',
      widget: { type: 'number_answer', props: { answer: 107, unit: 'yil' } }
    },
    {
      id: 'g17q3',
      prompt: 'Demografik oʻtish bosqichlarini tartiblang.',
      hint: 'Avval ikkalasi yuqori.',
      explanation: 'Anʼanaviy turgʻunlik → demografik portlash → tugʻilishning pasayishi → zamonaviy barqarorlik.',
      widget: { type: 'order_line', props: { items: [{ label: 'anʼanaviy turgʻunlik' }, { label: 'demografik portlash' }, { label: 'tugʻilishning pasayishi' }, { label: 'zamonaviy barqarorlik' }] } }
    },
    {
      id: 'g17q4',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Depopulyatsiya — kamayish.',
      explanation: 'Demografik portlash — aholining keskin koʻpayishi; depopulyatsiya — aholining tabiiy kamayishi; demografik siyosat — davlatning aholi oʻsishiga taʼsir qilish choralari.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'demografik portlash', right: 'aholining keskin koʻpayishi' },
            { left: 'depopulyatsiya', right: 'aholining tabiiy kamayishi' },
            { left: 'demografik siyosat', right: 'davlatning aholi oʻsishiga taʼsiri' }
          ]
        }
      }
    },
    {
      id: 'g17q5',
      prompt: 'Qaysi qitʼada aholining tabiiy koʻpayishi eng yuqori?',
      hint: 'Har 1000 kishiga 26.',
      explanation: 'Afrikada.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Afrika', 'Yevropa', 'Shimoliy Amerika', 'Avstraliya'], answerIndex: 0 } }
    },
    {
      id: 'g17q6',
      prompt: 'Demografik portlashning sabablarini tanlang.',
      hint: 'Oʻlim kamaydi.',
      explanation: 'Turmush darajasining oshishi, tibbiyotning rivojlanishi, oʻlimning kamayishi, umr davomiyligining oʻsishi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tibbiyotning rivojlanishi', correct: true },
            { label: 'oʻlimning kamayishi', correct: true },
            { label: 'turmush darajasining oshishi', correct: true },
            { label: 'urushlarning koʻpayishi' }
          ]
        }
      }
    },
    {
      id: 'g17q7',
      prompt: 'Mamlakatni demografik oʻtish bosqichiga ajrating.',
      hint: 'Yaponiya — oxirgi bosqich.',
      explanation: '4-bosqich — Yaponiya, Kanada, Avstraliya; 2–3-bosqich — Malavi, Uganda, Niger.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'a', label: '4-bosqich (barqarorlik)' }, { id: 'b', label: '2–3-bosqich' }],
          items: [
            { emoji: '🗾', label: 'Yaponiya', bin: 'a' },
            { emoji: '🍁', label: 'Kanada', bin: 'a' },
            { emoji: '🦘', label: 'Avstraliya', bin: 'a' },
            { emoji: '🌍', label: 'Malavi', bin: 'b' },
            { emoji: '🌍', label: 'Uganda', bin: 'b' },
            { emoji: '🌍', label: 'Niger', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'g17q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '97 % — rivojlanayotgan mamlakatlar.',
      explanation: 'Dunyo aholisi oʻsishining 97 % i rivojlanayotgan mamlakatlarga toʻgʻri keladi; Yevropaning ayrim davlatlarida aholi kamaymoqda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Dunyo aholisi oʻsishining asosiy qismi rivojlanayotgan mamlakatlarga toʻgʻri keladi.', value: true },
            { text: 'Yevropaning ayrim davlatlarida aholining tabiiy kamayishi kuzatilmoqda.', value: true },
            { text: 'Dunyo aholisi 1820-yildayoq 7 milliard edi.', value: false },
            { text: 'Afrikada tabiiy koʻpayish Yevropadagidan past.', value: false }
          ]
        }
      }
    }
  ]
};
