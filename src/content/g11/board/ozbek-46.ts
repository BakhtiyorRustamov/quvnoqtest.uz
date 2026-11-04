import type { BoardLesson } from './types';
import { OZG7 } from './ozbek-43';

/** Darslik: Adabiyot 11, I qism (2018), 70–99-betlar — Yusuf Xos Hojib va «Qutadgʻu bilig»: toʻrt ramziy qahramon, gʻoya, badiiyat. */
export const OZ_46: BoardLesson = {
  n: 46,
  label: '46',
  group: OZG7,
  title: 'Yusuf Xos Hojib. «Qutadgʻu bilig»',
  section: 'Adabiyot, 1-qism: Yusuf Xos Hojib; «Qutadgʻu bilig» dostoni haqida',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Yusuf Xos Hojib XI asrda Bolasogʻunda tugʻilgan. «Qutadgʻu bilig» — turkiy yozma adabiyotdagi ilk yirik asar: olti ming olti yuz baytdan ortiq doston oʻn sakkiz oyda yozilib, Qashqarda tugatilgan va hukmdor Bugʻroxonga taqdim etilgan, buning evaziga muallif xos hojib lavozimini olgan. Asar toʻrt ramziy qahramon suhbatiga qurilgan: hukmdor Kuntugʻdi — Adolat, vazir Oytoʻldi — Davlat, uning oʻgʻli Oʻgdulmish — Aql, zohid Oʻzgʻurmish — Qanoat. Asosiy gʻoya: davlat adolat va aql bilan boshqarilishi kerak.",
      easy: "«Qutadgʻu bilig» — XI asr dostoni. Toʻrt qahramon: Adolat, Davlat, Aql, Qanoat. Gʻoya — davlatni adolat va aql bilan boshqarish.",
      draw: [
        { t: 'title', text: '«Qutadgʻu bilig» qahramonlari' },
        { t: 'table', x: 4, y: 18, rows: [['qahramon', 'kim', 'ramzi'], ['Kuntugʻdi', 'hukmdor (elig)', 'Adolat'], ['Oytoʻldi', 'vazir', 'Davlat'], ['Oʻgdulmish', 'vazir oʻgʻli', 'Aql'], ['Oʻzgʻurmish', 'zohid', 'Qanoat']] },
        { t: 'text', x: 4, y: 54, text: 'Biliglig beg erdi, uqushlugʻ, udugʻ,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 60, text: 'Esizka oʻt erdi, yagʻiqa yudugʻ.', size: 's', color: 'purple' }
      ],
      next: 'Mashqlarga oʻtamiz'
    }
  ],
  summary: [
    'Yusuf Xos Hojib (XI asr) — «Qutadgʻu bilig» muallifi; doston turkiy yozma adabiyotning ilk yirik asari, 6600 baytdan ortiq.',
    'Asar toʻrt ramziy qahramon suhbatiga qurilgan: Kuntugʻdi — Adolat, Oytoʻldi — Davlat, Oʻgdulmish — Aql, Oʻzgʻurmish — Qanoat.',
    'Asosiy gʻoya — davlatni adolat va aql bilan boshqarish; asar xalq ogʻzaki ijodi taʼsirini saqlagan obrazli tasvirlarga boy.'
  ],
  questions: [
    {
      id: 'oz46q1',
      prompt: 'Qahramonni ramzi bilan juftlang.',
      hint: 'Kun — hammaga birdek nur beradi.',
      explanation: 'Kuntugʻdi — Adolat; Oytoʻldi — Davlat; Oʻgdulmish — Aql; Oʻzgʻurmish — Qanoat.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Kuntugʻdi', right: 'Adolat' },
            { left: 'Oytoʻldi', right: 'Davlat' },
            { left: 'Oʻgdulmish', right: 'Aql' },
            { left: 'Oʻzgʻurmish', right: 'Qanoat' }
          ]
        }
      }
    },
    {
      id: 'oz46q2',
      prompt: '«Qutadgʻu bilig» necha oyda yozilgan?',
      hint: 'Bir yarim yil.',
      explanation: '18 oyda.',
      widget: { type: 'number_answer', props: { answer: 18, unit: 'oy' } }
    },
    {
      id: 'oz46q3',
      prompt: 'Asarning asosiy gʻoyasi qaysi?',
      hint: 'Kuntugʻdi va Oʻgdulmish.',
      explanation: 'Davlat adolat va aql bilan boshqarilishi kerak.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['davlat adolat va aql bilan boshqarilishi kerak', 'hukmdor faqat kuchga tayanishi kerak', 'dunyodan butunlay voz kechish kerak', 'boylik eng oliy qadriyat'], answerIndex: 0 } }
    },
    {
      id: 'oz46q4',
      prompt: 'Nega hukmdorga «Kuntugʻdi» nomi berilgan?',
      hint: 'Kun — quyosh.',
      explanation: 'Quyosh hammaga birdek nur va issiqlik beradi — adolat ham boy-kambagʻalni farqlamaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['quyosh hammaga birdek nur beradi — adolat ramzi', 'u kunduzi tugʻilgan', 'u faqat kunduzi ishlagan', 'u quyoshga sigʻingan'], answerIndex: 0 } }
    },
    {
      id: 'oz46q5',
      prompt: 'Yusuf Xos Hojib tilni nimaga oʻxshatadi va nima uchun?',
      hint: 'Qafasdagi yirtqich.',
      explanation: 'Tilni arslonga — behuda soʻz boshga balo boʻlishidan ogohlantirish uchun.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['arslonga — behuda soʻzdan ogohlantirish uchun', 'qushga — erkinlik uchun', 'gulga — goʻzallik uchun', 'suvga — tozalik uchun'], answerIndex: 0 } }
    },
    {
      id: 'oz46q6',
      prompt: 'Tushunchani shoir oʻxshatgan narsa bilan juftlang.',
      hint: 'Biri kuydiradi, biri undiradi.',
      explanation: 'Zulm — yonayotgan olov, adolat — oqib turgan suv.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'zulm', right: 'yonayotgan olov' },
            { left: 'adolat', right: 'oqib turgan suv' }
          ]
        }
      }
    },
    {
      id: 'oz46q7',
      prompt: 'Yusuf Xos Hojib asarini kimga taqdim etgan va qanday lavozim olgan?',
      hint: 'Asar nomi ham shu bilan bogʻliq.',
      explanation: 'Hukmdor Tavgʻach ulugʻ Bugʻroxonga; buning evaziga xos hojib lavozimini olgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Bugʻroxonga — xos hojib lavozimi', 'Amir Temurga — vazirlik', 'Husayn Boyqaroga — muhrdorlik', 'Mahmud Koshgʻariyga — ustozlik'], answerIndex: 0 } }
    },
    {
      id: 'oz46q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kiyik va soʻz.',
      explanation: 'Shoir turkcha soʻzlarni yovvoyi togʻ kiyigiga oʻxshatib, ularni avaylab «qoʻlga oʻrgatgan»; Oytoʻldining vafoti davlatning bebaqoligiga ishora.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Shoir turkcha soʻzlarni yovvoyi togʻ kiyigiga oʻxshatgan.', value: true },
            { text: 'Oytoʻldining vafoti davlatning bebaqoligiga ishora.', value: true },
            { text: '«Qutadgʻu bilig» nasriy qissa, sheʼriy qismi yoʻq.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz46q9',
      prompt: 'Asl baytda Kuntugʻdi qanday taʼriflanadi?',
      hint: 'Biliglig — bilimli.',
      explanation: 'Bilimli, zakovatli, hushyor bek; yomonlarga olov, yovga ofat.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bilimli va hushyor, yovga ofat', 'qoʻrqoq va dangasa', 'faqat boy va saxiy', 'sodda choʻpon'], answerIndex: 0 } }
    }
  ]
};
