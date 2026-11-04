import type { BoardLesson } from './types';
import { BOB7 } from './kimyo-28';

/** Darslik: Umumiy kimyo 11, 30-mavzu (135–138-betlar) — oksidlanish-qaytarilish reaksiyalarida oksidlovchi va qaytaruvchining ekvivalent massasi, ekvivalentlar qonuni bilan hisoblash. */
export const KIM_30: BoardLesson = {
  n: 30,
  label: '30',
  group: BOB7,
  title: 'Oksidlovchi va qaytaruvchining ekvivalenti',
  section: '30-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Murakkab oksidlanish-qaytarilish tenglamasini tenglashtirmasdan turib ham mahsulot massasini topish mumkinmi? Ha — ekvivalent massalar yordamida. Buning uchun faqat har bir moddaning bir moli nechta elektron berishi yoki olishini bilish kifoya.",
      easy: "Tenglamasiz hisoblash — ekvivalent massa orqali.",
      draw: [
        { t: 'title', text: 'Tenglamasiz hisob' },
        { t: 'icon', x: 16, y: 40, emoji: '🧮', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['1 mol nechta e⁻ oladi/beradi?', 'E = M / n(e⁻)', 'm₁ / m₂ = E₁ / E₂'] }
      ],
      next: 'Formula'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oksidlovchining ekvivalent massasi — molyar massasi boʻlinsin uning bir moli qabul qilgan elektronlar soni. Qaytaruvchiniki — molyar massa boʻlinsin bir mol bergan elektronlar soni. K₂Cr₂O₇ ning bir moli 6 ta elektron oladi: 294 boʻlinsin 6 — 49. Kaliy yodidning bir moli 1 ta elektron beradi: E teng 166.",
      easy: "E = M / n(e⁻); E(K₂Cr₂O₇) = 294/6 = 49; E(KI) = 166.",
      draw: [
        { t: 'title', text: 'Ekvivalent massa' },
        { t: 'formula', x: 4, y: 24, text: 'E = M / n(e⁻)' },
        { t: 'formula', x: 4, y: 38, text: 'Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O' },
        { t: 'formula', x: 4, y: 50, text: 'E(K₂Cr₂O₇) = 294 / 6 = 49' },
        { t: 'formula', x: 4, y: 60, text: 'E(KI) = 166 / 1 = 166' }
      ],
      next: 'Permanganat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "FeSO₄ va KMnO₄ ning sulfat kislotali muhitdagi reaksiyasi. Mn⁺⁷ 5 ta elektron olib Mn²⁺ ga oʻtadi: E teng 158 boʻlinsin 5 — 31,6. Har bir Fe²⁺ bitta elektron beradi: E teng 152. Hosil boʻlgan MnSO₄ ham 5 elektronga toʻgʻri keladi: 151 boʻlinsin 5 — 30,2.",
      easy: "E(KMnO₄) = 31,6; E(FeSO₄) = 152; E(MnSO₄) = 30,2.",
      draw: [
        { t: 'title', text: 'FeSO₄ + KMnO₄ + H₂SO₄' },
        { t: 'table', x: 4, y: 20, rows: [['modda', 'M', 'e⁻', 'E'], ['KMnO₄', '158', '5', '31,6'], ['FeSO₄', '152', '1', '152'], ['MnSO₄', '151', '5', '30,2']] }
      ],
      next: 'Muhit muhim'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ekvivalent massa reaksiyaga bogʻliq. Permanganat kislotali muhitda 5 elektron oladi — E teng 31,6; neytral muhitda 3 elektron — 52,67; ishqoriy muhitda 1 elektron — 158. Shuning uchun avval muhit va mahsulotni aniqlash kerak.",
      easy: "E(KMnO₄): kislotali 31,6; neytral 52,67; ishqoriy 158.",
      draw: [
        { t: 'title', text: 'Muhit muhim' },
        { t: 'list', x: 4, y: 22, items: ['kislotali: 158 / 5 = 31,6', 'neytral: 158 / 3 ≈ 52,67', 'ishqoriy: 158 / 1 = 158'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Shu reaksiyada 30,4 gramm FeSO₄ qatnashdi. Necha gramm MnSO₄ hosil boʻladi? Ekvivalentlar qonuni: massalar nisbati ekvivalentlar nisbatiga teng. 30,4 boʻlinsin x teng 152 boʻlinsin 30,2; x teng 6,04 gramm. Tenglamani tenglab tekshirsak ham shu javob chiqadi.",
      easy: "30,4 / x = 152 / 30,2 → x = 6,04 g.",
      draw: [
        { t: 'title', text: 'Ekvivalentlar qonuni' },
        { t: 'formula', x: 4, y: 24, text: 'm(FeSO₄) / m(MnSO₄) = E(FeSO₄) / E(MnSO₄)' },
        { t: 'formula', x: 4, y: 38, text: '30,4 / x = 152 / 30,2' },
        { t: 'formula', x: 4, y: 52, text: 'x = 30,4 · 30,2 / 152 = 6,04 g' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Oksidlovchi yoki qaytaruvchining ekvivalent massasi E = M / n(e⁻), n — bir mol olgan yoki bergan elektronlar soni.',
    'Ekvivalent massa reaksiyaga va muhitga bogʻliq: KMnO₄ uchun 31,6 (kislotali), 52,67 (neytral), 158 (ishqoriy).',
    'Ekvivalentlar qonuni m₁/m₂ = E₁/E₂ massani tenglamasiz topish imkonini beradi.'
  ],
  questions: [
    {
      id: 'k30q1',
      prompt: 'K₂Cr₂O₇ sulfat kislota ishtirokida metanol bilan reaksiyaga kirishib, 27,6 g chumoli kislota (HCOOH) hosil boʻldi. Oksidlovchi massasi necha gramm?',
      hint: 'C: −2 → +2, 4 ta elektron; E(HCOOH) = 46/4.',
      explanation: '27,6 / 11,5 = 2,4 ekv; 2,4 · 49 = 117,6 g.',
      widget: { type: 'number_answer', props: { answer: 117.6, tolerance: 0.1, unit: 'g' } }
    },
    {
      id: 'k30q2',
      prompt: '27,65 g KMnO₄ boʻlgan eritmadan sulfat kislota ishtirokida 27,2 g H₂S oʻtkazildi. Necha gramm oltingugurt hosil boʻladi?',
      hint: 'KMnO₄ 0,875 ekv, H₂S 1,6 ekv — kam boʻlgani boʻyicha.',
      explanation: '0,875 ekv · E(S) 16 = 14 g.',
      widget: { type: 'number_answer', props: { answer: 14, tolerance: 0.05, unit: 'g' } }
    },
    {
      id: 'k30q3',
      prompt: 'KI sulfat kislota ishtirokida Na₂O₂ bilan reaksiyaga kirishib, 7,62 g I₂ ajraldi. Oksidlovchi (Na₂O₂) massasi necha gramm?',
      hint: 'E(I₂) = 127, E(Na₂O₂) = 39.',
      explanation: '7,62 / 127 = 0,06 ekv; 0,06 · 39 = 2,34 g.',
      widget: { type: 'number_answer', props: { answer: 2.34, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k30q4',
      prompt: 'KMnO₄ sulfat kislota ishtirokida natriy oksalat bilan reaksiyaga kirishib, 22 g CO₂ hosil boʻldi. KMnO₄ massasi necha gramm?',
      hint: 'Har CO₂ ga 1 elektron: 0,5 ekv.',
      explanation: '0,5 · 31,6 = 15,8 g.',
      widget: { type: 'number_answer', props: { answer: 15.8, tolerance: 0.05, unit: 'g' } }
    },
    {
      id: 'k30q5',
      prompt: 'Kislotali muhitda K₂Cr₂O₇ ning ekvivalent massasi qancha? (M = 294)',
      hint: '6 ta elektron.',
      explanation: '294 / 6 = 49.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['294', '147', '98', '49'], answerIndex: 3 } }
    },
    {
      id: 'k30q6',
      prompt: 'Moddani ekvivalent massasi bilan juftlang (kislotali muhit).',
      hint: 'E = M / n(e⁻).',
      explanation: 'KMnO₄ — 31,6; K₂Cr₂O₇ — 49; FeSO₄ — 152; MnSO₄ — 30,2.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'KMnO₄', right: '31,6' },
            { left: 'K₂Cr₂O₇', right: '49' },
            { left: 'FeSO₄', right: '152' },
            { left: 'MnSO₄', right: '30,2' }
          ]
        }
      }
    },
    {
      id: 'k30q7',
      prompt: 'Neytral muhitda (MnO₂ gacha) KMnO₄ ning ekvivalent massasi qancha? (0,01 gacha)',
      hint: '3 ta elektron.',
      explanation: '158 / 3 ≈ 52,67.',
      widget: { type: 'number_answer', props: { answer: 52.67, tolerance: 0.02 } }
    },
    {
      id: 'k30q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'E elektronlar soniga bogʻliq.',
      explanation: 'Ekvivalent massa muhitga bogʻliq; ekvivalentlar qonuni tenglamasiz hisoblash imkonini beradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'KMnO₄ ning ekvivalent massasi muhitga bogʻliq.', value: true },
            { text: 'Ekvivalent massa bilan tenglamani yozmasdan hisoblash mumkin.', value: true },
            { text: 'Oksidlovchining ekvivalenti M ni bergan elektronlar soniga boʻlib topiladi.', value: false },
            { text: 'KI ning ekvivalent massasi 83 ga teng.', value: false }
          ]
        }
      }
    }
  ]
};
