import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 79–82-betlar — ifodalilik va koʻchimlar: metafora, metonimiya, sinekdoxa. */
export const OZ_19: BoardLesson = {
  n: 19,
  label: '19',
  group: OZG1,
  title: 'Ifodalilik va koʻchimlar',
  section: 'Ona tili, 1-qism: «Ifodalilik va koʻchimlar»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Soʻzni koʻchma maʼnoda ishlatish ifodalilikning tuganmas manbai. Koʻchimlarda ikki narsa qiyoslanadi va biri nomi ikkinchisiga koʻchiriladi. Metafora — oʻxshashlik asosida: qozonning qulogʻi. Metonimiya — aloqadorlik asosida: «Dasturxonga qarang!» deganda taom nazarda tutiladi. Sinekdoxa — butun va boʻlak munosabati asosida: «tirnoqqa zor» — farzandga zor. Metafora qancha yangi boʻlsa, shuncha ifodali.",
      easy: "Koʻchim — soʻzning maʼnosi boshqa narsaga koʻchishi: oʻxshashlik (metafora), aloqa (metonimiya), boʻlak–butun (sinekdoxa).",
      draw: [
        { t: 'title', text: 'Koʻchim turlari' },
        { t: 'table', x: 4, y: 18, rows: [['koʻchim', 'asos', 'misol'], ['metafora', 'oʻxshashlik', 'qozon qulogʻi'], ['metonimiya', 'aloqadorlik', 'dasturxonga…'], ['sinekdoxa', 'butun–boʻlak', 'tirnoqqa zor']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Koʻchimlarda ikki narsa orasidagi munosabat asosida biri nomi ikkinchisiga koʻchiriladi.',
    'Metafora — oʻxshashlik, metonimiya — aloqadorlik, sinekdoxa — butun va boʻlak munosabati asosida.',
    'Yangi, ishlatilmagan metafora nutqni ayniqsa ifodali qiladi.'
  ],
  questions: [
    {
      id: 'oz19q1',
      prompt: 'Misolni koʻchim turiga ajrating.',
      hint: 'Tirnoq — farzand (boʻlak — butun).',
      explanation: 'Metafora — qozonning qulogʻi, choynakning burni; metonimiya — dasturxonga qarang, butun shahar uxlayapti; sinekdoxa — tirnoqqa zor.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'm', label: 'metafora' }, { id: 'n', label: 'metonimiya' }, { id: 's', label: 'sinekdoxa' }],
          items: [
            { emoji: '🍲', label: 'qozonning qulogʻi', bin: 'm' },
            { emoji: '🫖', label: 'choynakning burni', bin: 'm' },
            { emoji: '🍽️', label: 'Dasturxonga qarang!', bin: 'n' },
            { emoji: '🌃', label: 'Butun shahar uxlayapti.', bin: 'n' },
            { emoji: '🍼', label: 'U tirnoqqa zor.', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'oz19q2',
      prompt: 'Metafora nima asosida yuzaga keladi?',
      hint: 'Quloq — qozon qulogʻi.',
      explanation: 'Narsalar orasidagi oʻxshashlik asosida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻxshashlik', 'aloqadorlik', 'butun–boʻlak', 'zid maʼno'], answerIndex: 0 } }
    },
    {
      id: 'oz19q3',
      prompt: '«Tirnoqqa zor» birikmasida «tirnoq» qanday maʼnoda?',
      hint: 'Sinekdoxa.',
      explanation: '«Farzand» maʼnosida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['farzand', 'qoʻl barmogʻi', 'kichik narsa', 'pul'], answerIndex: 0 } }
    },
    {
      id: 'oz19q4',
      prompt: 'Koʻchimni asosi bilan juftlang.',
      hint: 'Metonimiya — aloqa.',
      explanation: 'Metafora — oʻxshashlik; metonimiya — aloqadorlik; sinekdoxa — butun va boʻlak.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'metafora', right: 'oʻxshashlik' },
            { left: 'metonimiya', right: 'aloqadorlik' },
            { left: 'sinekdoxa', right: 'butun va boʻlak' }
          ]
        }
      }
    },
    {
      id: 'oz19q5',
      prompt: 'Sheʼrda «lochin» soʻzi koʻpincha kimni bildiradi?',
      hint: 'Chaqqon, botir.',
      explanation: 'Botir, chaqqon yigitni — oʻxshashlik asosidagi koʻchim.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['botir, chaqqon yigitni', 'oddiy qushni', 'qishni', 'kitobni'], answerIndex: 0 } }
    },
    {
      id: 'oz19q6',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Aravani quruq olib qochmoq — maqtanchoqlik.',
      explanation: 'Aravani quruq olib qochmoq — uddalay olmaydigan ish haqida maqtanmoq; qoʻy ogʻzidan choʻp olmagan — juda beozor.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'aravani quruq olib qochmoq', right: 'uddasidan chiqmasdan maqtanmoq' },
            { left: 'qoʻy ogʻzidan choʻp olmagan', right: 'juda beozor, moʻmin' }
          ]
        }
      }
    },
    {
      id: 'oz19q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Doimiy metafora.',
      explanation: '«Qozon qulogʻi» kabi metaforalar tilda doimiy nomga aylangan; yangi metafora ifodaliroq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Qozon qulogʻi» — tilda doimiylashgan metafora.', value: true },
            { text: 'Metafora qancha yangi boʻlsa, shuncha ifodali.', value: true },
            { text: 'Koʻchimlarda hech qanday qiyoslash boʻlmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
