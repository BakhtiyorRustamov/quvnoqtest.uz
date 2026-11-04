import type { BoardLesson } from './types';
import { BOB3 } from './biologiya-24';

/** Darslik: Biologiya 11, 30-§ (154–162-betlar) — biogeokimyoviy sikl: uglerod, azot, kislorod, suv, fosfor va oltingugurt aylanishi. */
export const BIO_30: BoardLesson = {
  n: 30,
  label: '30',
  group: BOB3,
  title: 'Biogeokimyoviy sikl',
  section: '30-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Atmosferadagi uglerod taxminan 300 yilda, kislorod 2000 yilda toʻliq aylanib chiqadi, suvning biogeokimyoviy sikli esa 2 million yil davom etadi. Kimyoviy elementlarning muhitdan organizmlarga va yana muhitga oʻtishi — biogeokimyoviy sikl.",
      easy: "C — 300 yil, O₂ — 2000 yil, suv — 2 mln yil.",
      draw: [
        { t: 'title', text: 'Aylanish davri' },
        { t: 'table', x: 4, y: 20, rows: [['modda', 'davri'], ['uglerod (CO₂)', '300 yil'], ['kislorod', '2000 yil'], ['suv', '2 mln yil']] }
      ],
      next: 'Uglerod'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Uglerod aylanishi. Fotosintezda atmosferadagi CO₂ organik moddaga aylanadi, hayvonlar uni isteʼmol qiladi; nafas va chirishda CO₂ yana havoga qaytadi. Marjon va mollyuskalar skeletidan ohaktosh, oʻsimlik qoldiqlaridan koʻmir, neft, torf hosil boʻlib, uglerod uzoq vaqt aylanishdan chiqadi. Bugun yoqilgʻi yonishi atmosferaga ortiqcha CO₂ chiqarib, muvozanatni buzmoqda.",
      easy: "Fotosintez CO₂ ni oladi, nafas va chirish qaytaradi; yoqilgʻi — ortiqcha CO₂.",
      draw: [
        { t: 'title', text: 'Uglerod aylanishi' },
        { t: 'box', id: 'a', x: 32, y: 18, w: 34, h: 8, text: 'atmosferadagi CO₂', color: 'blue' },
        { t: 'box', id: 'p', x: 4, y: 40, w: 28, h: 8, text: 'oʻsimliklar', color: 'green' },
        { t: 'box', id: 'h', x: 36, y: 56, w: 26, h: 8, text: 'hayvonlar', color: 'orange' },
        { t: 'box', id: 'f', x: 68, y: 40, w: 28, h: 8, text: 'koʻmir, neft', color: 'ink' },
        { t: 'arrow', from: 'a', to: 'p', label: 'fotosintez' },
        { t: 'arrow', from: 'p', to: 'h' },
        { t: 'arrow', from: 'h', to: 'a', label: 'nafas' },
        { t: 'arrow', from: 'f', to: 'a', label: 'yonish' }
      ],
      next: 'Azot'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Azot asosan havoda N₂ holida, lekin koʻp organizmlar undan foydalana olmaydi. Uni chaqmoq va bakteriyalar bogʻlaydi: azotobakteriyalar va dukkaklilar ildizidagi tugunak bakteriyalar N₂ ni ammoniy tuzlariga aylantiradi — azot fiksatsiyasi. Chirituvchi bakteriyalar oqsilni ammiakkacha parchalaydi — ammonifikatsiya. Nitrifikatorlar ammiakni nitrit va nitratgacha oksidlaydi — nitrifikatsiya. Denitrifikatorlar nitratni N₂ ga qaytaradi — denitrifikatsiya.",
      easy: "Fiksatsiya → ammonifikatsiya → nitrifikatsiya → denitrifikatsiya.",
      draw: [
        { t: 'title', text: 'Azot aylanishi' },
        { t: 'box', id: 'n', x: 34, y: 16, w: 30, h: 7, text: 'havodagi N₂', color: 'blue' },
        { t: 'box', id: 'a', x: 4, y: 36, w: 26, h: 7, text: 'NH₄⁺', color: 'green' },
        { t: 'box', id: 'b', x: 36, y: 56, w: 26, h: 7, text: 'NO₂⁻, NO₃⁻', color: 'orange' },
        { t: 'box', id: 'o', x: 70, y: 36, w: 26, h: 7, text: 'oqsil', color: 'purple' },
        { t: 'arrow', from: 'n', to: 'a', label: 'fiksatsiya' },
        { t: 'arrow', from: 'a', to: 'b', label: 'nitrifikatsiya' },
        { t: 'arrow', from: 'b', to: 'o' },
        { t: 'arrow', from: 'o', to: 'a' },
        { t: 'arrow', from: 'b', to: 'n' }
      ],
      next: 'Kislorod va suv'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kislorodni yashil oʻsimliklar va sianobakteriyalar fotosintezda chiqaradi, organizmlar nafasda sarflaydi. Atmosferada ultrabinafsha nurlar taʼsirida O₂ dan ozon O₃ hosil boʻlib, ozon ekrani yuzaga keladi. Suv aylanishini quyosh energiyasi harakatlantiradi: okean va quruqlikdan bugʻlanish, oʻsimliklar transpiratsiyasi, bulutda kondensatsiya, yogʻin, daryo va yerosti suvlari orqali yana okeanga.",
      easy: "O₂ — fotosintezdan, ozonga aylanadi; suv — bugʻlanish, kondensatsiya, yogʻin.",
      draw: [
        { t: 'title', text: 'Suv aylanishi' },
        { t: 'box', id: 'o', x: 4, y: 52, w: 28, h: 8, text: 'okean', color: 'blue' },
        { t: 'box', id: 'b', x: 34, y: 18, w: 28, h: 8, text: 'bulut' },
        { t: 'box', id: 'q', x: 66, y: 52, w: 30, h: 8, text: 'quruqlik', color: 'green' },
        { t: 'arrow', from: 'o', to: 'b', label: 'bugʻlanish' },
        { t: 'arrow', from: 'b', to: 'q', label: 'yogʻin' },
        { t: 'arrow', from: 'q', to: 'o', label: 'daryolar' }
      ],
      next: 'Fosfor va oltingugurt'
    },
    {
      kind: 'example',
      clear: true,
      say: "Fosfor nuklein kislota, ATF, membrana, suyak va tish tarkibiga kiradi. U atmosferada yoʻq — manbayi togʻ jinslari; redutsentlar organik fosforni fosfatga aylantiradi, ildizlar uni oʻzlashtiradi. Oltingugurt oqsillarga kiradi: oʻsimliklar sulfatlarni oladi, chirishda H₂S hosil boʻladi, bakteriyalar uni yana sulfatga oksidlaydi. Oltingugurtli yoqilgʻi yonganda «kislotali yomgʻir» yogʻadi.",
      easy: "Fosfor — togʻ jinsidan (havoda yoʻq); oltingugurt — sulfat ↔ H₂S; kislotali yomgʻir.",
      draw: [
        { t: 'title', text: 'Fosfor va oltingugurt' },
        { t: 'table', x: 4, y: 20, rows: [['element', 'manba', 'muammo'], ['fosfor', 'togʻ jinslari', 'atmosferada yoʻq'], ['oltingugurt', 'sulfatlar', 'kislotali yomgʻir'], ['azot', 'havodagi N₂', 'ortiqcha oʻgʻit']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Biogeokimyoviy sikl — elementlarning muhitdan organizmlarga va yana muhitga oʻtishi; uglerod ≈ 300 yil, kislorod ≈ 2000 yil, suv ≈ 2 mln yilda aylanadi.',
    'Uglerod: fotosintez ↔ nafas va chirish, koʻmir va neftda uzoq saqlanadi; azot: fiksatsiya → ammonifikatsiya → nitrifikatsiya → denitrifikatsiya.',
    'Kislorod fotosintezdan, ozon ekranini hosil qiladi; suvni quyosh aylantiradi; fosfor togʻ jinslaridan, oltingugurt sulfat ↔ H₂S orqali aylanadi.'
  ],
  questions: [
    {
      id: 'b30q1',
      prompt: 'Azot aylanishi jarayonini taʼrifi bilan juftlang.',
      hint: 'Nitrifikatsiya — oksidlanish.',
      explanation: 'Fiksatsiya — N₂ ni bogʻlash; ammonifikatsiya — oqsildan ammiak; nitrifikatsiya — ammiakdan nitrat; denitrifikatsiya — nitratdan N₂.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'azot fiksatsiyasi', right: 'N₂ ni bogʻlash' },
            { left: 'ammonifikatsiya', right: 'oqsildan ammiak' },
            { left: 'nitrifikatsiya', right: 'ammiakdan nitrat' },
            { left: 'denitrifikatsiya', right: 'nitratdan N₂' }
          ]
        }
      }
    },
    {
      id: 'b30q2',
      prompt: 'Atmosferadagi uglerod (CO₂) necha yilda toʻliq aylanadi?',
      hint: 'Kisloroddan tezroq.',
      explanation: '≈ 300 yil.',
      widget: { type: 'number_answer', props: { answer: 300, unit: 'yil' } }
    },
    {
      id: 'b30q3',
      prompt: 'Qaysi element atmosferada uchramaydi, manbayi togʻ jinslari?',
      hint: 'ATF va suyak tarkibida.',
      explanation: 'Fosfor.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['azot', 'uglerod', 'fosfor', 'kislorod'], answerIndex: 2 } }
    },
    {
      id: 'b30q4',
      prompt: 'Suv aylanishi bosqichlarini tartiblang.',
      hint: 'Avval bugʻlanadi.',
      explanation: 'Bugʻlanish → kondensatsiya (bulut) → yogʻin → daryo va yerosti suvlari orqali okeanga.',
      widget: { type: 'step_order', props: { steps: ['okeandan bugʻlanish', 'bulutda kondensatsiya', 'yogʻin', 'daryolar orqali okeanga qaytish'] } }
    },
    {
      id: 'b30q5',
      prompt: 'Uglerodni uzoq vaqt aylanishdan chiqaradigan jarayonlarni belgilang.',
      hint: 'Qazilma boyliklar.',
      explanation: 'Ohaktosh, koʻmir, neft, torf hosil boʻlishi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ohaktosh hosil boʻlishi', correct: true },
            { label: 'koʻmir hosil boʻlishi', correct: true },
            { label: 'neft va torf hosil boʻlishi', correct: true },
            { label: 'nafas olish' },
            { label: 'yoqilgʻi yonishi' }
          ]
        }
      }
    },
    {
      id: 'b30q6',
      prompt: 'Havodagi azotni bogʻlay oladigan organizmlar qaysi?',
      hint: 'Dukkaklilar ildizida.',
      explanation: 'Tugunak bakteriyalar va azotobakteriyalar (sianobakteriyalar).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['zamburugʻlar', 'tugunak bakteriyalar', 'hasharotlar', 'baliqlar'], answerIndex: 1 } }
    },
    {
      id: 'b30q7',
      prompt: '«Kislotali yomgʻir» qaysi element aylanishining buzilishi bilan bogʻliq?',
      hint: 'SO₂ + suv → sulfat kislota.',
      explanation: 'Oltingugurt.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['fosfor', 'oltingugurt', 'kalsiy', 'temir'], answerIndex: 1 } }
    },
    {
      id: 'b30q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ozon — kisloroddan.',
      explanation: 'O₂ dan UB taʼsirida ozon hosil boʻladi; okeanlar oladigan yogʻindan koʻp suv bugʻlatadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ozon kisloroddan ultrabinafsha nurlar taʼsirida hosil boʻladi.', value: true },
            { text: 'Okeanlar yogʻindan oladiganidan koʻp suv bugʻlatadi.', value: true },
            { text: 'Koʻpchilik organizmlar havodagi N₂ ni bevosita oʻzlashtiradi.', value: false },
            { text: 'Suv aylanishini Yerning ichki issiqligi harakatlantiradi.', value: false }
          ]
        }
      }
    }
  ]
};
