import type { BoardLesson } from './types';
import { GEO5 } from './geografiya-17';

/** Darslik: Geografiya 10, 18-§ (76–79-betlar) — urbanizatsiya, uning oʻsishi va bosqichlari (shakllanayotgan, rivojlangan, yetuk), suburbanizatsiya, rurbanizatsiya, global shaharlar, muammolar. */
export const GEO_18: BoardLesson = {
  n: 18,
  label: '18',
  group: GEO5,
  title: 'Urbanizatsiya jarayoni',
  section: '18-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Urbanizatsiya — shaharlar va shahar aholisining oʻsishi, shahar turmush tarzining keng tarqalishi. Shaharlar qadimda hunarmandchilik, savdo va boshqaruv markazlari sifatida paydo boʻlgan: Bobil, Afina, Rim, Iskandariya, Samarqand (Marokand) kabi. Ammo jadal shaharlashuv faqat XIX asrda sanoat inqilobi bilan Yevropada boshlandi. 1800-yilda insoniyatning taxminan 3 foizi shaharda yashagan boʻlsa, 1900-yilda 14, 1950-yilda 29 foiz boʻldi; 2010-yilga kelib shaharliklar ulushi 50 foizdan oshdi va hozir 54 foizni tashkil etadi.",
      easy: "Urbanizatsiya — shaharlarning oʻsishi; shaharliklar ulushi: 3 % (1800) → 54 % (hozir).",
      draw: [
        { t: 'title', text: 'Shahar aholisi ulushi, %' },
        { t: 'bars', x: 6, y: 18, w: 80, h: 34, items: [{ label: '1800', value: 3 }, { label: '1900', value: 14 }, { label: '1950', value: 29 }, { label: '1990', value: 45 }, { label: 'hozir', value: 54 }] }
      ],
      next: 'Bosqichlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Urbanizatsiya uch bosqichdan oʻtadi. Shakllanayotgan bosqichda shaharliklar 50 foizdan kam, yangi shaharlar paydo boʻladi; baʼzan «soxta» urbanizatsiya — qishloqdan kelganlar shahar chekkalarida zich joylashadi; Osiyo va Afrikaning koʻp davlatlari shu bosqichda. Rivojlangan bosqichda shaharliklar 50 foizdan oshadi, millioner shaharlar va aglomeratsiyalar oʻsadi. Yetuk bosqichda aholi shahar markazidan atrofga koʻchadi — suburbanizatsiya, qishloqlar esa amalda shaharlashadi — rurbanizatsiya; bu AQSH, Kanada, Yaponiya, Avstraliya va Yevropaning rivojlangan davlatlariga xos. Nyu-York, London, Tokio, Shanxay, Parij, Singapur kabi taʼsiri butun dunyoga yoyilgan shaharlar global shaharlar deyiladi.",
      easy: "Bosqichlar: shakllanayotgan → rivojlangan → yetuk (suburbanizatsiya, rurbanizatsiya); global shaharlar — Nyu-York, London, Tokio.",
      draw: [
        { t: 'title', text: 'Urbanizatsiya bosqichlari' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'shakllanayotgan', color: 'orange' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'rivojlangan', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'yetuk', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: '< 50 % · > 50 %, millionerlar · suburbanizatsiya', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Urbanizatsiya — shaharlar va shahar aholisining oʻsishi; jadal shaharlashuv XIX asrda sanoat inqilobi bilan boshlangan, hozir shaharliklar dunyo aholisining 54 % ini tashkil etadi.',
    'Urbanizatsiya shakllanayotgan, rivojlangan va yetuk bosqichlardan oʻtadi; yetuk bosqichda suburbanizatsiya va rurbanizatsiya kuzatiladi.',
    'Global shaharlar (Nyu-York, London, Tokio va boshqalar) taʼsiri butun dunyoga yoyiladi; urbanizatsiya ekologik, transport, ijtimoiy muammolarni ham keltirib chiqaradi.'
  ],
  questions: [
    {
      id: 'g18q1',
      prompt: 'Urbanizatsiya bosqichlarini tartiblang.',
      hint: 'Yetuk — oxirgisi.',
      explanation: 'Shakllanayotgan → rivojlangan → yetuk.',
      widget: { type: 'order_line', props: { items: [{ label: 'shakllanayotgan' }, { label: 'rivojlangan' }, { label: 'yetuk' }] } }
    },
    {
      id: 'g18q2',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Suburbanizatsiya — shahar atrofiga.',
      explanation: 'Suburbanizatsiya — aholining shahar markazidan atrofga koʻchishi; rurbanizatsiya — qishloqlarning shaharlashuvi; «soxta» urbanizatsiya — shahar chekkalarida kambagʻal aholining zichlashuvi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'suburbanizatsiya', right: 'markazdan shahar atrofiga koʻchish' },
            { left: 'rurbanizatsiya', right: 'qishloqlarning shaharlashuvi' },
            { left: '«soxta» urbanizatsiya', right: 'shahar chekkasining zichlashuvi' }
          ]
        }
      }
    },
    {
      id: 'g18q3',
      prompt: 'Hozir dunyo aholisining necha foizi shaharlarda yashaydi?',
      hint: 'Yarmidan koʻp.',
      explanation: '54 %.',
      widget: { type: 'number_answer', props: { answer: 54, unit: '%' } }
    },
    {
      id: 'g18q4',
      prompt: 'Global shaharlarni tanlang.',
      hint: 'Dunyo moliya markazlari.',
      explanation: 'Nyu-York, London, Tokio, Shanxay va boshqalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Nyu-York', correct: true },
            { label: 'London', correct: true },
            { label: 'Tokio', correct: true },
            { label: 'Shanxay', correct: true },
            { label: 'kichik qishloq' }
          ]
        }
      }
    },
    {
      id: 'g18q5',
      prompt: 'Mintaqani urbanizatsiya darajasiga ajrating (2016).',
      hint: 'Afrika — eng past.',
      explanation: '70 % dan yuqori — Shimoliy Amerika (81 %), Lotin Amerikasi (80 %), Yevropa (74 %); 50 % dan past — Osiyo (48 %), Afrika (41 %).',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'h', label: '70 % dan yuqori' }, { id: 'l', label: '50 % dan past' }],
          items: [
            { emoji: '🗽', label: 'Shimoliy Amerika', bin: 'h' },
            { emoji: '🌎', label: 'Lotin Amerikasi', bin: 'h' },
            { emoji: '🏰', label: 'Yevropa', bin: 'h' },
            { emoji: '🌏', label: 'Osiyo', bin: 'l' },
            { emoji: '🌍', label: 'Afrika', bin: 'l' }
          ]
        }
      }
    },
    {
      id: 'g18q6',
      prompt: 'Jadal urbanizatsiya qachon va nima sababdan boshlangan?',
      hint: 'Zavodlar.',
      explanation: 'XIX asrda Yevropada sanoat inqilobi natijasida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['XIX asrda sanoat inqilobi natijasida', 'antik davrda', 'XXI asrda internet tufayli', 'oʻrta asrlarda vabo tufayli'], answerIndex: 0 } }
    },
    {
      id: 'g18q7',
      prompt: 'Urbanizatsiya bilan bogʻliq muammolarni tanlang.',
      hint: 'Katta shahar tashvishlari.',
      explanation: 'Atrof-muhitga bosim, suv taʼminotidagi kamchiliklar, transportning tiqilishi, jinoyatchilikning ortishi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'atrof-muhitga bosim', correct: true },
            { label: 'transport tiqilishi', correct: true },
            { label: 'suv taʼminotidagi kamchiliklar', correct: true },
            { label: 'shaharlarda aholining yoʻqligi' }
          ]
        }
      }
    },
    {
      id: 'g18q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '2010 — 50 % dan oshdi.',
      explanation: '2010-yilda shaharliklar ulushi 50 % dan oshgan; Osiyoda dunyo aholisining qariyb 60 % i yashaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '2010-yilga kelib shaharliklar ulushi 50 % dan oshgan.', value: true },
            { text: 'Osiyoda dunyo aholisining qariyb 60 % i yashaydi.', value: true },
            { text: '1800-yilda insoniyatning yarmi shaharda yashagan.', value: false },
            { text: 'Yetuk bosqichda yangi shaharlar eng tez paydo boʻladi.', value: false }
          ]
        }
      }
    }
  ]
};
