import type { BoardLesson } from './types';
import { OZG7 } from './ozbek-43';

/** Darslik: Adabiyot 11, I qism (2018), 66–69-betlar — «Devonu lugʻot at-turk»dagi qadimgi maqollar va ularning mavzulari. */
export const OZ_45: BoardLesson = {
  n: 45,
  label: '45',
  group: OZG7,
  title: 'Qadimgi maqollar',
  section: 'Adabiyot, 1-qism: Qadimgi maqollar; qadimgi maqollar haqida',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "«Devonu lugʻot at-turk»da koʻplab qadimgi turkiy maqollar saqlangan. Ular mavzusi va tuzilishiga koʻra xilma-xil: vatanparvarlik, adolat, mehnatsevarlik, bilim, mardlik, mehmondoʻstlik ulugʻlanadi, salbiy xislatlar qoralanadi. «Qut belgusi — bilig», yaʼni «Bilim — baxt belgisi»; «Uma kelsa, qut kelar» — «Mehmon kelsa, baraka keladi»; «Emgak ekinda qolmas» — «Mehnat bekor ketmaydi». Bu maqollar sodda, ixcham va loʻnda boʻlib, bugun ham tarbiyaviy ahamiyatini yoʻqotmagan.",
      easy: "Koshgʻariy toʻplagan qadimgi maqollar: «Bilim — baxt belgisi», «Mehnat bekor ketmaydi».",
      draw: [
        { t: 'title', text: 'Qadimgi maqollar' },
        { t: 'table', x: 4, y: 18, rows: [['qadimgi shakli', 'hozirgi maʼnosi'], ['Qut belgusi — bilig', 'Bilim — baxt belgisi'], ['Uma kelsa, qut kelar', 'Mehmon kelsa, qut kelar'], ['Emgak ekinda qolmas', 'Mehnat bekor ketmaydi'], ['Ardam boshi — til', 'Fazilat boshi — tilda']] },
        { t: 'text', x: 4, y: 54, text: 'Alin arslan tutar, kuchin sichgʻan tutmas.', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 60, text: '(Hiyla bilan arslon tutar, kuch bilan sichqon tutmas.)', size: 's', color: 'ink' }
      ],
      next: 'Boshladik!'
    }
  ],
  summary: [
    '«Devonu lugʻot at-turk»da mavzusi va tuzilishi xilma-xil boʻlgan qadimgi maqollar saqlangan.',
    'Ularda vatanparvarlik, mehnat, bilim, mardlik, mehmondoʻstlik ulugʻlanadi, salbiy xislatlar qoralanadi.',
    'Qadimgi maqollar sodda, ixcham va loʻnda; ular bugun ham tarbiyaviy va badiiy ahamiyatga ega.'
  ],
  questions: [
    {
      id: 'oz45q1',
      prompt: 'Qadimgi maqolni hozirgi maʼnosi bilan juftlang.',
      hint: 'Bilig — bilim.',
      explanation: 'Qut belgusi — bilig: bilim — baxt belgisi; Uma kelsa, qut kelar: mehmon kelsa, baraka keladi; Emgak ekinda qolmas: mehnat bekor ketmaydi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Qut belgusi — bilig', right: 'Bilim — baxt belgisi' },
            { left: 'Uma kelsa, qut kelar', right: 'Mehmon kelsa, baraka keladi' },
            { left: 'Emgak ekinda qolmas', right: 'Mehnat bekor ketmaydi' }
          ]
        }
      }
    },
    {
      id: 'oz45q2',
      prompt: '«Kur oʻgʻli kuvaz boʻlur» maqolidagi «kur» soʻzi nimani bildiradi?',
      hint: 'Goʻroʻgʻli nomini eslang.',
      explanation: '«Kur» — alp, botir, mard: «Botirning farzandi magʻrur boʻladi».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['alp, botir', 'koʻr', 'qabr', 'qush'], answerIndex: 0 } }
    },
    {
      id: 'oz45q3',
      prompt: '«Hiyla-tadbir bilan arslonni tutish mumkin, zoʻrlik bilan sichqonni ham tutib boʻlmaydi» maqoli nimaga undaydi?',
      hint: 'Aql yoki kuch?',
      explanation: 'Aql va tadbirni kuchdan ustun qoʻyishga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['aql va tadbirga tayanishga', 'faqat kuch ishlatishga', 'ovchilikka', 'sichqonlardan qoʻrqishga'], answerIndex: 0 } }
    },
    {
      id: 'oz45q4',
      prompt: 'Qadimgi maqollarda qaysi fazilatlar ulugʻlanadi?',
      hint: 'Bir nechta.',
      explanation: 'Mehnatsevarlik, mehmondoʻstlik, bilim, mardlik — barchasi ulugʻlanadi; dangasalik qoralanadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'mehnatsevarlik', correct: true },
            { label: 'mehmondoʻstlik', correct: true },
            { label: 'bilim', correct: true },
            { label: 'dangasalik' }
          ]
        }
      }
    },
    {
      id: 'oz45q5',
      prompt: '«Kengashlik bilik uzlashur, kengashsiz bilik oʻprashur» maqolining maʼnosi qaysi?',
      hint: 'Kengash — maslahat.',
      explanation: 'Maslahatli ish yaxshilanib boradi, maslahatsiz ish buziladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['maslahatli ish yaxshilanadi, maslahatsizi buziladi', 'bilim kerak emas', 'yolgʻiz ishlash afzal', 'ish tez bitishi kerak'], answerIndex: 0 } }
    },
    {
      id: 'oz45q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Bugun ham.',
      explanation: 'Qadimgi maqollarning koʻpi bugun ham qisman oʻzgargan holda ishlatiladi; ular ixcham va loʻnda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qadimgi maqollarning baʼzilari hozir ham qisman oʻzgargan holda ishlatiladi.', value: true },
            { text: 'Qadimgi maqollar ixcham va loʻnda boʻlgani uchun oson yodda qoladi.', value: true },
            { text: 'Qadimgi maqollarda faqat tabiat tasvirlangan.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz45q7',
      prompt: '«Alin arslan tutar, kuchin sichgʻan tutmas» maqolining maʼnosi qaysi?',
      hint: 'Al — hiyla, tadbir.',
      explanation: 'Aql-tadbir bilan arslonni ham tutish mumkin, zoʻrlik bilan sichqonni ham tutib boʻlmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tadbir kuchdan ustun', 'kuch hamma narsani hal qiladi', 'arslon sichqondan qoʻrqadi', 'ov qilish zararli'], answerIndex: 0 } }
    }
  ]
};
