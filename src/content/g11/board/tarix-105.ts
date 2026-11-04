import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 5-mavzu (23–28-betlar) — Ukraina, Belarus va Moldova: mustaqillik, iqtisodiyot, siyosiy inqirozlar. */
export const TARIX_105: BoardLesson = {
  n: 105,
  label: '5',
  group: JH2,
  title: 'Ukraina, Belarus va Moldova',
  section: 'Jahon tarixi, 5-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ukraina 1991-yil 24-avgustda mustaqillikni eʼlon qildi, dekabrdagi referendumda aholining koʻpchiligi buni qoʻllab-quvvatladi va Leonid Kravchuk birinchi prezident boʻldi. 1996-yilda konstitutsiya qabul qilindi va milliy valyuta — grivna muomalaga kiritildi. Keyin bir qator siyosiy inqirozlar boʻldi: 2004-yilgi saylovdan keyingi namoyishlar, 2013-yilda Yevroittifoq bilan kelishuv imzolanmagach boshlangan «Yevromaydan». 2014-yilda P. Poroshenko prezident boʻldi; Qrim Rossiya tarkibiga kiritilgach va Donetsk, Lugansk viloyatlarida qurolli mojaro boshlangach, ikki davlat munosabatlari keskinlashdi. Minsk kelishuvlari mojaroni toʻxtata olmadi.",
      easy: "Ukraina: 1991 — mustaqillik; 1996 — konstitutsiya, grivna; 2013–2014 — «Yevromaydan», sharqda mojaro.",
      draw: [
        { t: 'title', text: 'Ukraina' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1991-yil 24-avgust', 'mustaqillik eʼlon qilindi'], ['1996', 'konstitutsiya, grivna'], ['2004', 'saylovdan keyingi namoyishlar'], ['2013–2014', '«Yevromaydan»'], ['2014–2015', 'Minsk kelishuvlari']] }
      ],
      next: 'Belarus va Moldova'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Belarusda 1994-yilda konstitutsiya qabul qilindi va Aleksandr Lukashenko prezident etib saylandi; referendumdan soʻng rus tili ham davlat tili boʻldi. Mustaqillik kuni — 3-iyul, 1944-yilda Minsk ozod qilingan kun. Belarus Rossiya bilan Ittifoq davlati tuzish haqida shartnoma imzoladi; 2000-yilga kelib ishlab chiqarish inqirozgacha boʻlgan darajadan oshdi, mamlakat sut mahsulotlari bilan mashhur. Moldova 1991-yil 27-avgustda mustaqil boʻldi, birinchi prezidenti Mircha Snegur. Dnestrboʻyida ayirmachilik mojarosi boʻldi. Moldova — agrar-industrial mamlakat; keyinroq saylovlarda Rossiya bilan yaqin aloqalar tarafdori Igor Dodon prezident boʻldi.",
      easy: "Belarus: 1994 — Lukashenko, Rossiya bilan Ittifoq davlati. Moldova: 1991-yil 27-avgust, Dnestrboʻyi mojarosi.",
      draw: [
        { t: 'title', text: 'Belarus va Moldova' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'Belarus', 'Moldova'], ['mustaqillik kuni', '3-iyul', '27-avgust'], ['ilk rahbar', 'A. Lukashenko', 'M. Snegur'], ['iqtisod', 'sanoat, sut', 'agrar'], ['muammo', 'Rossiya bilan', 'Dnestrboʻyi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Ukraina 1991-yil 24-avgustda mustaqil boʻldi (L. Kravchuk); 1996-yilda konstitutsiya va grivna; 2004 va 2013–2014-yillarda siyosiy inqirozlar.',
    '2014-yildan keyin Qrim va Donbass voqealari tufayli Ukraina–Rossiya munosabatlari keskinlashdi; Minsk kelishuvlari mojaroni toʻxtatmadi.',
    'Belarus (A. Lukashenko, 1994) Rossiya bilan Ittifoq davlati tuzdi va iqtisodiy oʻsishga erishdi; Moldova (1991-yil 27-avgust) Dnestrboʻyi mojarosini boshdan kechirdi.'
  ],
  questions: [
    {
      id: 'j5q1',
      prompt: 'Ukraina tarixidagi voqealarni tartiblang.',
      hint: 'Mustaqillik — birinchi.',
      explanation: 'Mustaqillik (1991) → konstitutsiya va grivna (1996) → 2004-yilgi namoyishlar → «Yevromaydan» (2013–2014) → Minsk-2 (2015).',
      widget: { type: 'order_line', props: { items: [{ label: 'mustaqillik eʼlon qilindi' }, { label: 'konstitutsiya va grivna' }, { label: '2004-yilgi namoyishlar' }, { label: '«Yevromaydan»' }, { label: 'Minsk-2 kelishuvi' }] } }
    },
    {
      id: 'j5q2',
      prompt: 'Davlatni uning rahbari bilan juftlang.',
      hint: 'Moldovaning ilk prezidenti — Snegur.',
      explanation: 'Ukraina — L. Kravchuk (birinchi prezident); Belarus — A. Lukashenko; Moldova — M. Snegur (birinchi prezident).',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Ukraina', right: 'L. Kravchuk' },
            { left: 'Belarus', right: 'A. Lukashenko' },
            { left: 'Moldova', right: 'M. Snegur' }
          ]
        }
      }
    },
    {
      id: 'j5q3',
      prompt: 'Ukrainada milliy valyuta — grivna qaysi yilda muomalaga kiritilgan?',
      hint: 'Konstitutsiya bilan bir yil.',
      explanation: '1996-yilda.',
      widget: { type: 'number_answer', props: { answer: 1996, unit: 'yil' } }
    },
    {
      id: 'j5q4',
      prompt: 'Faktni davlatga ajrating.',
      hint: 'Dnestrboʻyi — Moldova.',
      explanation: 'Ukraina — grivna, «Yevromaydan»; Belarus — Ittifoq davlati, sut mahsulotlari; Moldova — Dnestrboʻyi, agrar iqtisod.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'u', label: 'Ukraina' }, { id: 'b', label: 'Belarus' }, { id: 'm', label: 'Moldova' }],
          items: [
            { emoji: '💵', label: 'grivna', bin: 'u' },
            { emoji: '📣', label: '«Yevromaydan»', bin: 'u' },
            { emoji: '🤝', label: 'Rossiya bilan Ittifoq davlati', bin: 'b' },
            { emoji: '🥛', label: 'sut mahsulotlari eksporti', bin: 'b' },
            { emoji: '🌊', label: 'Dnestrboʻyi mojarosi', bin: 'm' },
            { emoji: '🍇', label: 'qishloq xoʻjaligiga asoslangan iqtisod', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'j5q5',
      prompt: 'Belarusda Mustaqillik kuni qachon nishonlanadi?',
      hint: 'Minsk ozod qilingan kun.',
      explanation: '3-iyulda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['24-avgust', '3-iyul', '27-avgust', '8-dekabr'], answerIndex: 1 } }
    },
    {
      id: 'j5q6',
      prompt: '2013-yilda Ukrainada siyosiy inqirozga nima sabab boʻldi?',
      hint: 'Yevroittifoq bilan hujjat.',
      explanation: 'Yevroittifoq bilan hamkorlik kelishuvini imzolashdan bosh tortilgani.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['grivnaning joriy qilinishi', 'YI bilan kelishuv imzolanmagani', 'yangi konstitutsiya', 'MDHga kirish'], answerIndex: 1 } }
    },
    {
      id: 'j5q7',
      prompt: 'Ukraina sharqidagi mojaroni hal qilish uchun imzolangan kelishuvlar qaysi shahar nomi bilan ataladi?',
      hint: 'Belarus poytaxti.',
      explanation: 'Minsk (2014 va 2015, «Minsk-2»).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Kiyev', 'Minsk', 'Kishinyov', 'Moskva'], answerIndex: 1 } }
    },
    {
      id: 'j5q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Belarusda ikki davlat tili.',
      explanation: 'Belarusda rus tili ham davlat tili maqomini olgan; Moldova 1991-yil 27-avgustda mustaqil boʻlgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Belarusda referendumdan keyin rus tili ham davlat tili boʻlgan.', value: true },
            { text: 'Moldova 1991-yil 27-avgustda mustaqillikni eʼlon qilgan.', value: true },
            { text: 'Moldova iqtisodiyoti asosan neft va gazga tayanadi.', value: false },
            { text: 'Minsk kelishuvlari Ukraina sharqidagi mojaroni butunlay toʻxtatgan.', value: false }
          ]
        }
      }
    }
  ]
};
