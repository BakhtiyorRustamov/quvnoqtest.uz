import type { BoardLesson } from './types';

export const OZG8 = { kicker: 'Adabiyot · III', title: 'Oʻzbek mumtoz adabiyoti' };

/** Darslik: Adabiyot 11, I qism (2018), 100–113-betlar — Nosiruddin Rabgʻuziy va «Qisasi Rabgʻuziy». */
export const OZ_47: BoardLesson = {
  n: 47,
  label: '47',
  group: OZG8,
  title: 'Rabgʻuziy. «Qisasi Rabgʻuziy»',
  section: 'Adabiyot, 1-qism: Nosiruddin Rabgʻuziy; «Qisasi Rabgʻuziy» asari haqida',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Nosiruddin Rabgʻuziy XIII asr oxiri — XIV asr boshlarida Xorazmning Raboti Oʻgʻuz degan joyida yashagan; otasi Burhoniddin shu yerning qozisi boʻlgan. «Qisasi Rabgʻuziy» 1309–1310-yillarda Nosiruddin Toʻqboʻgʻabekning topshirigʻi bilan yozilgan. Asar paygʻambarlar haqidagi qissalardan iborat va oʻzbek nasrining eng qadimiy namunalaridan biri. Qissalar ildizi «Qurʼon», hadislar, tarixiy manbalar va xalq ogʻzaki ijodiga borib taqaladi. Oʻzbek nasrida dialoglarni ilk bor keng qoʻllagan ham Rabgʻuziy; hikoyatlarida halollik, til odobi, insonparvarlik ulugʻlanadi.",
      easy: "Rabgʻuziy — XIV asr adibi. «Qisasi Rabgʻuziy» — paygʻambarlar haqidagi qissalar, eng qadimgi oʻzbek nasri.",
      draw: [
        { t: 'title', text: '«Qisasi Rabgʻuziy»' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'maʼlumot'], ['muallif', 'Nosiruddin Rabgʻuziy'], ['yozilgan', '1309–1310 yillar'], ['buyurtmachi', 'Nosiruddin Toʻqboʻgʻabek'], ['mazmuni', 'paygʻambarlar haqida qissalar'], ['yangilik', 'nasrda dialoglar']] },
        { t: 'text', x: 4, y: 58, text: '«Qoʻyda tildin, yurakdin yaxshiroq yoʻq. Agar yovuz', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 64, text: 'ersa tildin, yurakdin yovuzroq yoʻq.»', size: 's', color: 'purple' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Nosiruddin Rabgʻuziy — XIII asr oxiri — XIV asr boshlarida yashagan xorazmlik adib.',
    '«Qisasi Rabgʻuziy» (1309–1310) — paygʻambarlar haqidagi qissalar; oʻzbek nasrining eng qadimiy namunalaridan.',
    'Rabgʻuziy nasrda dialoglarni ilk bor keng qoʻllagan; hikoyatlarida halollik, til odobi va insonparvarlik ulugʻlanadi.'
  ],
  questions: [
    {
      id: 'oz47q1',
      prompt: '«Qisasi Rabgʻuziy» qachon yozilgan?',
      hint: 'XIV asr boshi.',
      explanation: '1309–1310-yillarda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1309–1310', '1072–1074', '1501', '1069–1070'], answerIndex: 0 } }
    },
    {
      id: 'oz47q2',
      prompt: 'Asar kimning topshirigʻi bilan yozilgan?',
      hint: 'Muqaddimada madh etilgan bek.',
      explanation: 'Nosiruddin Toʻqboʻgʻabek.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Nosiruddin Toʻqboʻgʻabek', 'Bugʻroxon', 'Husayn Boyqaro', 'Amir Temur'], answerIndex: 0 } }
    },
    {
      id: 'oz47q3',
      prompt: 'Qissalar ildizi nimalarga borib taqaladi?',
      hint: 'Toʻrt manba.',
      explanation: '«Qurʼon», hadislar, tarixiy manbalar va xalq ogʻzaki ijodiga.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: '«Qurʼon»', correct: true },
            { label: 'hadislar', correct: true },
            { label: 'tarixiy manbalar', correct: true },
            { label: 'xalq ogʻzaki ijodi', correct: true }
          ]
        }
      }
    },
    {
      id: 'oz47q4',
      prompt: '«Luqmon va uning xojasi» hikoyatida Luqmon qoʻyning qaysi aʼzolarini eng yaxshi ham, eng yomon ham deydi?',
      hint: 'Soʻz va qalb.',
      explanation: 'Til va yurak — ular yaxshi boʻlsa eng yaxshi, yomon boʻlsa eng yomon.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['til va yurak', 'koʻz va quloq', 'oyoq va qoʻl', 'bosh va dum'], answerIndex: 0 } }
    },
    {
      id: 'oz47q5',
      prompt: 'Dovud haqidagi hikoyat nimaga undaydi?',
      hint: 'Temirchilik hunari.',
      explanation: 'Halollikka, oʻz mehnati bilan kun koʻrishga, zulm qilmaslikka.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['halol mehnat bilan kun koʻrishga', 'boylik toʻplashga', 'safarga chiqishga', 'jang qilishga'], answerIndex: 0 } }
    },
    {
      id: 'oz47q6',
      prompt: 'Rabgʻuziy oʻzbek nasrida qaysi yangilikni ilk bor keng qoʻllagan?',
      hint: 'Qahramonlar gaplashadi.',
      explanation: 'Dialoglarni.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['dialoglarni', 'roman shaklini', 'qofiyasiz sheʼrni', 'drama janrini'], answerIndex: 0 } }
    },
    {
      id: 'oz47q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Latifa taʼsiri.',
      explanation: 'Hikoyatlarda latifa janriga xos hozirjavoblik va loʻndalik bor; Rabgʻuziyning boshqa asarlari haqida maʼlumot yoʻq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Hikoyatlarda latifa janriga xos hozirjavoblik va loʻndalik seziladi.', value: true },
            { text: 'Rabgʻuziyning boshqa asarlari haqida maʼlumot saqlanmagan.', value: true },
            { text: '«Qisasi Rabgʻuziy» toʻliq sheʼriy doston.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz47q8',
      prompt: 'Luqmon javobida qaysi badiiy usul asosiy?',
      hint: 'Yaxshi — yovuz.',
      explanation: 'Tazod (qarshilantirish): til va yurak ham eng yaxshi, ham eng yomon boʻlishi mumkin.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tazod — qarshilantirish', 'mubolagʻa', 'tuyuq', 'masnuʼ'], answerIndex: 0 } }
    }
  ]
};
