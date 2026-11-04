import type { BoardLesson } from './types';
import { OZG9 } from './ozbek-59';

/** Darslik: Adabiyot 11, II qism (2018), 80–87-betlar — Rauf Parfi va uning sheʼrlari haqida. */
export const OZ_63: BoardLesson = {
  n: 63,
  label: '63',
  group: OZG9,
  title: 'Rauf Parfi sheʼrlari',
  section: 'Adabiyot, 2-qism: Rauf Parfi (1943–2005); «Tong otmoqda», «Yomgʻir yogʻar», «Yoz kechasi» va boshqa sheʼrlar haqida',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Rauf Parfi (Tursunali Parfiyev, 1943–2005) Toshkent viloyati Yangiyoʻl tumanida tugʻilgan; ilk toʻplami — «Karvon yoʻli» (1968). Sheʼrlarida inson erki, Vatan, Turkiston yodi, ona, muhabbat va tabiat mavzulari yetakchi; u Bayronning «Manfred» asari kabi koʻplab sheʼrlarni tarjima qilgan, 1999-yilda «Oʻzbekiston xalq shoiri» unvonini olgan. «Tong otmoqda»da quyosh zambarakka, nurlari oʻqlarga oʻxshatiladi, tong pokligi odamlar yuragiga koʻchadi. «Yomgʻir yogʻar»da bir misra olti marta takrorlanib, yomgʻir tovushini eshittirgandek boʻladi — bu takrir sanʼati. «Yoz kechasi»da dalalar insondek uxlaydi — jonlantirish (tashxis), chigirtkalar «ch» tovushi bilan kuylaydi — tovush takrori.",
      easy: "Rauf Parfi tabiat orqali inson qalbini kuylaydi. U takrir, jonlantirish, oʻxshatish sanʼatlaridan keng foydalanadi.",
      draw: [
        { t: 'title', text: 'Sheʼrlardagi sanʼatlar' },
        { t: 'table', x: 4, y: 18, rows: [['sheʼr', 'sanʼat'], ['«Tong otmoqda»', 'oʻxshatish: quyosh — zambarak'], ['«Yomgʻir yogʻar»', 'takrir: misra 6 marta'], ['«Yoz kechasi»', 'jonlantirish: dala uxlaydi'], ['«Yoz kechasi»', 'tovush takrori: «ch»']] }
      ],
      next: 'Qani, sinab koʻraylik'
    }
  ],
  summary: [
    'Rauf Parfi (1943–2005) — «Oʻzbekiston xalq shoiri»; ilk toʻplami «Karvon yoʻli» (1968), mohir tarjimon ham.',
    'Sheʼrlarida inson erki, Vatan, ona va tabiat mavzulari yetakchi; tabiat orqali qalb kechinmalari ifodalanadi.',
    'Asosiy sanʼatlar: oʻxshatish, takrir, jonlantirish (tashxis), tovush takrori, tazod.'
  ],
  questions: [
    {
      id: 'oz63q1',
      prompt: 'Rauf Parfining birinchi sheʼriy toʻplami qaysi?',
      hint: '1968-yil.',
      explanation: '«Karvon yoʻli».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Karvon yoʻli»', '«Sabr daraxti»', '«Sukunat»', '«Tavba»'], answerIndex: 0 } }
    },
    {
      id: 'oz63q2',
      prompt: '«Tong otmoqda» sheʼrida quyosh nimaga oʻxshatiladi?',
      hint: 'Nurlari — oʻqlar.',
      explanation: 'Zambarakka.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['zambarakka', 'oltin tangaga', 'olmaga', 'chiroqqa'], answerIndex: 0 } }
    },
    {
      id: 'oz63q3',
      prompt: '«Yomgʻir yogʻar» sheʼrida bosh misra necha marta takrorlanadi?',
      hint: 'Yomgʻir tovushi.',
      explanation: 'Olti marta.',
      widget: { type: 'number_answer', props: { answer: 6, unit: 'marta' } }
    },
    {
      id: 'oz63q4',
      prompt: 'Misolni sanʼati bilan juftlang.',
      hint: 'Dala uxlaydi — jonlantirish.',
      explanation: 'Dalalar uxlaydi — jonlantirish; quyosh — zambarak — oʻxshatish; misraning qayta-qayta kelishi — takrir.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'dalalar uxlaydi', right: 'jonlantirish' },
            { left: 'quyosh — zambarak', right: 'oʻxshatish' },
            { left: 'misra qayta-qayta keladi', right: 'takrir' }
          ]
        }
      }
    },
    {
      id: 'oz63q5',
      prompt: 'Rauf Parfi kimning «Manfred» asarini tarjima qilgan?',
      hint: 'Ingliz shoiri.',
      explanation: 'Bayronning.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Bayron', 'Chexov', 'Guntekin', 'Tvardovskiy'], answerIndex: 0 } }
    },
    {
      id: 'oz63q6',
      prompt: 'Rauf Parfi sheʼrlarida yetakchi mavzularni belgilang.',
      hint: 'Toʻrt mavzu.',
      explanation: 'Inson erki, Vatan, ona va tabiat.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'inson erki', correct: true },
            { label: 'Vatan', correct: true },
            { label: 'tabiat', correct: true },
            { label: 'kosmik sayohat' }
          ]
        }
      }
    },
    {
      id: 'oz63q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '1999-yil.',
      explanation: 'Unga 1999-yilda «Oʻzbekiston xalq shoiri» unvoni berilgan; uning sheʼrlari bir oʻqishda uqib olinadigan sodda sheʼrlar emas.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Rauf Parfiga «Oʻzbekiston xalq shoiri» unvoni berilgan.', value: true },
            { text: 'Rauf Parfi sheʼrlari bir oʻqishda toʻliq uqib olinadigan sodda sheʼrlar.', value: false },
            { text: '«Yoz kechasi» sheʼrida yoz yomgʻiri va tuproq hidi tasvirlangan.', value: true }
          ]
        }
      }
    }
  ]
};
