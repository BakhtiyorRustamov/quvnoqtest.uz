import type { BoardLesson } from './types';
import { OZG8 } from './ozbek-47';

/** Darslik: Adabiyot 11, I qism (2018), 131–151-betlar — «Saddi Iskandariy», XL–XLI boblar: yoshlik va qarilik; dostondagi hikmatlar. */
export const OZ_52: BoardLesson = {
  n: 52,
  label: '52',
  group: OZG8,
  title: 'Yoshlik va qarilik haqida',
  section: 'Adabiyot, 1-qism: «Saddi Iskandariy», XL–XLI boblar; «Saddi Iskandariy» hikmatlari',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "XL bobda yoshlik — mehnat va ezgu amallar fasli, qarilik esa kuch ketib, umr bogʻi kuzga kiradigan payt ekani taʼkidlanadi. Navoiy yoshlikni oʻyin-kulgi bilan behuda oʻtkazmaslikka, berilgan neʼmatlarning shukrini qilishga chaqiradi. XLI bobdagi hikoyatda gʻofil yigit dono qoʻshnisining nasihatlariga quloq solmay, yoshligini isrof qiladi va qariganda pushaymon boʻladi. Pir unga otasining hayoti ham yetarli ibrat boʻlishi mumkin edi, deydi: baxtli odam oʻzgalarning holidan ibrat oladi. Dostondagi hikmatlarda Vatan, himmat, adolat, ilm va safar haqida ham teran fikrlar bor.",
      easy: "Yoshlik — mehnat va ilm vaqti. Uni behuda oʻtkazgan odam qariganda pushaymon boʻladi.",
      draw: [
        { t: 'title', text: 'Ikki fasl' },
        { t: 'table', x: 4, y: 18, rows: [['yoshlik', 'qarilik'], ['bahor, kuch-quvvat', 'kuz, quvvat ketadi'], ['mehnat va ilm vaqti', 'ketish arafasi'], ['imkon koʻp', 'imkon kam'], ['toʻgʻri tanlov — baxt', 'kech pushaymon foydasiz']] },
        { t: 'text', x: 4, y: 54, text: 'Yigitlik erur qulluq etmak chogʻi,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 60, text: 'Qariliq erur chunki ketmak chogʻi.', size: 's', color: 'purple' }
      ],
      next: 'Boshladik!'
    }
  ],
  summary: [
    'Navoiy yoshlikni mehnat va ezgu amallar fasli, qarilikni esa kuch ketadigan kuz fasli deb taʼriflaydi.',
    'Gʻofil yigit hikoyati: nasihatni tinglamay yoshligini isrof qilgan odam qariganda pushaymon boʻladi.',
    'Xulosa: oqil kishi oʻzgalarning holidan ibrat oladi; dostonda Vatan, himmat, ilm haqida ham hikmatlar bor.'
  ],
  questions: [
    {
      id: 'oz52q1',
      prompt: 'Navoiy yoshlikni qanday davr deb biladi?',
      hint: 'Mehnat va toat.',
      explanation: 'Mehnat, ilm va ezgu amallar davri.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['mehnat va ezgu amallar davri', 'faqat dam olish davri', 'kech pushaymon davri', 'boylik toʻplash davri'], answerIndex: 0 } }
    },
    {
      id: 'oz52q2',
      prompt: 'Qarilik umr bogʻining qaysi fasliga oʻxshatiladi?',
      hint: 'Barglar toʻkiladi.',
      explanation: 'Kuz fasliga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kuz', 'bahor', 'yoz', 'qishning boshi'], answerIndex: 0 } }
    },
    {
      id: 'oz52q3',
      prompt: 'Gʻofil yigitning fikri qanday edi?',
      hint: 'U ibodatni keyinga qoldirgan.',
      explanation: 'Yoshlik — oʻyin-kulgi, mehnat va ibodat esa qarilikda qilinadi, deb oʻylagan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['mehnatni qarilikka qoldirish mumkin', 'yoshlikda koʻproq oʻqish kerak', 'qoʻshnining nasihati toʻgʻri', 'safar foydali'], answerIndex: 0 } }
    },
    {
      id: 'oz52q4',
      prompt: 'Yigitning otasi necha yoshda vafot etgan edi?',
      hint: 'Yuzdan oshgan.',
      explanation: '112 yoshda — pir shuni ibrat sifatida eslatadi.',
      widget: { type: 'number_answer', props: { answer: 112, unit: 'yosh' } }
    },
    {
      id: 'oz52q5',
      prompt: 'Hikoyatning xulosasi qaysi?',
      hint: 'Ibrat.',
      explanation: 'Oqil odam oʻzgalarning holidan ibrat oladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oqil odam oʻzgalar holidan ibrat oladi', 'nasihat qilish befoyda', 'qarilikda hamma narsa ulgurish mumkin', 'qoʻshni bilan bahslashmaslik kerak'], answerIndex: 0 } }
    },
    {
      id: 'oz52q6',
      prompt: 'Belgilarni yoshlik va qarilikka ajrating.',
      hint: 'Navoiy tasviri.',
      explanation: 'Kuch-quvvat va imkon yoshlikka; qaddi bukilish va koʻz xiralashuvi qarilikka xos.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'y', label: 'yoshlik' }, { id: 'q', label: 'qarilik' }],
          items: [
            { emoji: '🌱', label: 'kuch-quvvat toʻla', bin: 'y' },
            { emoji: '📚', label: 'ilm olish fursati', bin: 'y' },
            { emoji: '🍂', label: 'qaddi bukiladi', bin: 'q' },
            { emoji: '🌫️', label: 'koʻz oldi qorongʻilashadi', bin: 'q' }
          ]
        }
      }
    },
    {
      id: 'oz52q7',
      prompt: 'Personajni hikoyatdagi roli bilan juftlang.',
      hint: 'Nosih — nasihatgoʻy.',
      explanation: 'Gʻofil yigit — nasihatni tinglamagan; dono qoʻshni — nasihat bergan; pir — xulosa chiqargan.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'gʻofil yigit', right: 'nasihatni tinglamagan' },
            { left: 'dono qoʻshni', right: 'koʻp nasihat bergan' },
            { left: 'pir', right: 'ibrat haqida xulosa aytgan' }
          ]
        }
      }
    },
    {
      id: 'oz52q8',
      prompt: 'Baytda yigitlik va qarilik qanday zidlantiriladi?',
      hint: 'Qulluq va ketmak.',
      explanation: 'Yigitlik — mehnat va ibodat (qulluq) chogʻi, qarilik — dunyodan ketish chogʻi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yigitlik — mehnat, qarilik — ketish chogʻi', 'yigitlik — dam, qarilik — mehnat', 'ikkisi ham oʻyin chogʻi', 'ikkisi ham safar chogʻi'], answerIndex: 0 } }
    }
  ]
};
