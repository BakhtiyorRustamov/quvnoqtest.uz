import type { BoardLesson } from './types';
import { OZG8 } from './ozbek-47';

/** Darslik: Adabiyot 11, I qism (2018), 116–122-betlar — Xondamir, «Makorim ul-axloq»dan parchalar. */
export const OZ_49: BoardLesson = {
  n: 49,
  label: '49',
  group: OZG8,
  title: 'Xondamir. «Makorim ul-axloq»',
  section: 'Adabiyot, 1-qism: «Makorim ul-axloq»dan parchalar — Alisher Navoiy siymosi',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Gʻiyosiddin Xondamir (1473/76–1534) — tarixchi va adib, Alisher Navoiy haqida bir necha kitob yozgan. «Makorim ul-axloq» («Yaxshi xulqlar») 1501-yilda forsiy tilda yozilgan va Navoiyning hayoti, faoliyati va fazilatlariga bagʻishlangan. Asar debocha, muqaddima, oʻn maqsad (bob) va xotimadan iborat. Parchalarda Navoiyning bolalikdan ilmga chanqoqligi, madrasa va xonaqohlar qurdirgani, Lutfiyning uning isteʼdodiga yuksak baho bergani hikoya qilinadi. Hikoyatlar uning chumolini ham ranjitmaslikka intilgan rahmdilligi va saxiyligini koʻrsatadi.",
      easy: "Xondamir Navoiyning yaxshi xulqlari haqida kitob yozgan. Unda Navoiyning ilmi, saxiyligi va rahmdilligi hikoya qilinadi.",
      draw: [
        { t: 'title', text: '«Makorim ul-axloq»' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'maʼlumot'], ['muallif', 'Gʻiyosiddin Xondamir'], ['yozilgan', '1501-yil, forsiy tilda'], ['qahramon', 'Alisher Navoiy'], ['tuzilishi', 'debocha, muqaddima, 10 bob'], ['asosiy gʻoya', 'ilm, saxiylik, rahmdillik']] },
        { t: 'text', x: 4, y: 58, text: 'Orazin yopqoch koʻzumdin sochilur har lahza yosh,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 64, text: 'Boʻylakim, paydo boʻlur yulduz nihon boʻlgʻoch quyosh.', size: 's', color: 'purple' }
      ],
      next: 'Mashqlarga oʻtamiz'
    }
  ],
  summary: [
    'Xondamir — tarixchi va adib; «Makorim ul-axloq» (1501) Navoiyning hayoti va fazilatlariga bagʻishlangan.',
    'Asar debocha, muqaddima, oʻn maqsad (bob) va xotimadan iborat.',
    'Parchalarda Navoiyning ilmga chanqoqligi, bunyodkorligi, saxiyligi va rahmdilligi koʻrsatiladi.'
  ],
  questions: [
    {
      id: 'oz49q1',
      prompt: '«Makorim ul-axloq» kim haqida?',
      hint: 'Hirotlik buyuk shoir.',
      explanation: 'Alisher Navoiyning hayoti, faoliyati va fazilatlari haqida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Alisher Navoiy', 'Husayn Boyqaro', 'Bobur', 'Lutfiy'], answerIndex: 0 } }
    },
    {
      id: 'oz49q2',
      prompt: 'Asar nechanchi yilda yozilgan?',
      hint: 'XVI asrning birinchi yili.',
      explanation: '1501-yilda.',
      widget: { type: 'number_answer', props: { answer: 1501, unit: 'yil' } }
    },
    {
      id: 'oz49q3',
      prompt: 'Asar nomining maʼnosi qaysi?',
      hint: 'Axloq soʻzi bor.',
      explanation: '«Makorim ul-axloq» — «Yaxshi xulqlar».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Yaxshi xulqlar', 'Shohlar tarixi', 'Bilim kitobi', 'Sheʼrlar toʻplami'], answerIndex: 0 } }
    },
    {
      id: 'oz49q4',
      prompt: 'Lutfiy Navoiyning bir gʻazalini eshitib nima degan?',
      hint: 'Almashtirish.',
      explanation: 'Oʻzining oʻn-oʻn ikki ming baytli gʻazallarini shu birgina gʻazalga almashtirishga rozi ekanini aytgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['barcha gʻazallarini shu gʻazalga almashtirishga rozi', 'gʻazalni zaif deb topgan', 'unga vazn oʻrgatishni vaʼda qilgan', 'gʻazalni forsiyga tarjima qilgan'], answerIndex: 0 } }
    },
    {
      id: 'oz49q5',
      prompt: 'Chumoli hikoyati Navoiyning qaysi xislatini koʻrsatadi?',
      hint: 'Jonivorni uyasiga qaytargan.',
      explanation: 'Rahmdillik — kichik jonivorga ham ozor yetkazmaslik.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['rahmdillik', 'shijoat', 'ziyraklik', 'mehmondoʻstlik'], answerIndex: 0 } }
    },
    {
      id: 'oz49q6',
      prompt: 'Navoiy Sabzavordagi gʻallasini nima qilgan?',
      hint: 'Shahzoda haqqiga duo.',
      explanation: 'Hammasini shahzoda Muhammad Muhsin Mirzoga tortiq qilgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['hammasini shahzodaga tortiq qilgan', 'qimmat narxda sotgan', 'qarzga bergan', 'omborda saqlab qoʻygan'], answerIndex: 0 } }
    },
    {
      id: 'oz49q7',
      prompt: 'Asar qismlarini tartib bilan joylang.',
      hint: 'Boshi — debocha.',
      explanation: 'Debocha → muqaddima → oʻn maqsad → xotima.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'debocha' }, { label: 'muqaddima' }, { label: 'oʻn maqsad (bob)' }, { label: 'xotima' }] }
      }
    },
    {
      id: 'oz49q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Marvdagi madrasa.',
      explanation: 'Marvdagi madrasa «Xusraviya» deb atalgan; Hirotda «Ixlosiya» madrasasi va «Xalosiya» xonaqohi qurilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Navoiy Marvda «Xusraviya» madrasasini qurdirgan.', value: true },
            { text: '«Ixlosiya» madrasasiga turli yurtlardan talabalar kelgan.', value: true },
            { text: '«Makorim ul-axloq» turkiy tilda yozilgan doston.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz49q9',
      prompt: 'Navoiy matlaʼsida koʻz yoshi nimaga oʻxshatilgan?',
      hint: 'Quyosh yashiringanda…',
      explanation: 'Yor yuzini yopsa koʻz yoshi sochiladi — quyosh botgach yulduzlar paydo boʻlganidek.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['quyosh botgach chiqqan yulduzlarga', 'bahor yomgʻiriga', 'daryo toshqiniga', 'tong shabnamiga'], answerIndex: 0 } }
    }
  ]
};
