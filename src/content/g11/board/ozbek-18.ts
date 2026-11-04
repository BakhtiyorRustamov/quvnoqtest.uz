import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 76–79-betlar — ifodalilik va ibora: iboralarning soʻzdan ustunligi, qoʻllanish oʻrni. */
export const OZ_18: BoardLesson = {
  n: 18,
  label: '18',
  group: OZG1,
  title: 'Ifodalilik va ibora',
  section: 'Ona tili, 1-qism: «Ifodalilik va ibora»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Frazeologik iboralar maʼnodosh soʻzlarga qaraganda ancha ifodali. Birinchidan, ular maʼnoni kuchliroq darajada beradi; ikkinchidan, ularda obraz yorqin aks etadi. Masalan, «kutmagan» oʻrniga «yetti uxlab tushiga kirmagan», «albatta» oʻrniga «turgan gap» desak, nutq jonlanadi. Iboralar xalqning hayotiy tajribasidan chiqqan obrazli xulosalardir. Ular asosan badiiy uslubda yashaydi, ilmiy va rasmiy uslubda deyarli qoʻllanmaydi.",
      easy: "Ibora — soʻzdan kuchliroq va obrazliroq. «Juda xursand» — «boshi osmonga yetdi».",
      draw: [
        { t: 'title', text: 'Soʻz va ibora' },
        { t: 'table', x: 4, y: 18, rows: [['soʻz', 'ibora'], ['kutmagan', 'yetti uxlab tushiga kirmagan'], ['albatta', 'turgan gap'], ['hech qachon', 'ikki dunyoda ham'], ['yashirin', 'yeng ichida'], ['juda xursand', 'boshi osmonga yetdi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Iboralar maʼnodosh soʻzlarga nisbatan maʼnoni kuchliroq ifodalaydi va obrazli boʻladi.',
    'Iboralar — xalq hayotiy tajribasidan chiqargan obrazli xulosalar.',
    'Iboralar asosan badiiy uslubda qoʻllanadi; ilmiy va rasmiy uslubda deyarli ishlatilmaydi.'
  ],
  questions: [
    {
      id: 'oz18q1',
      prompt: 'Soʻzni maʼnodosh iborasi bilan juftlang.',
      hint: 'Yashirin — yeng ichida.',
      explanation: 'Albatta — turgan gap; hech qachon — ikki dunyoda ham; yashirin — yeng ichida; oʻtaketgan — uchiga chiqqan.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'albatta', right: 'turgan gap' },
            { left: 'hech qachon', right: 'ikki dunyoda ham' },
            { left: 'yashirin', right: 'yeng ichida' },
            { left: 'oʻtaketgan', right: 'uchiga chiqqan' }
          ]
        }
      }
    },
    {
      id: 'oz18q2',
      prompt: 'Iboralar soʻzlardan qaysi jihatlari bilan ustun?',
      hint: 'Ikki jihat.',
      explanation: 'Maʼnoni kuchliroq darajada beradi va obrazli boʻladi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'maʼnoni kuchliroq ifodalaydi', correct: true },
            { label: 'obrazli boʻladi', correct: true },
            { label: 'har doim qisqaroq boʻladi' },
            { label: 'rasmiy hujjatga mos keladi' }
          ]
        }
      }
    },
    {
      id: 'oz18q3',
      prompt: 'Iboralar qaysi uslubda deyarli qoʻllanmaydi?',
      hint: 'Hujjat va ilm.',
      explanation: 'Ilmiy va rasmiy uslublarda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ilmiy va rasmiy', 'badiiy', 'soʻzlashuv', 'publitsistik'], answerIndex: 0 } }
    },
    {
      id: 'oz18q4',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Igna ustida — bezovta.',
      explanation: 'Ignaday narsani tuyaday qilmoq — boʻrttirmoq; igna ustida oʻtirmoq — bezovta boʻlmoq; qoʻy ogʻzidan choʻp olmagan — juda yuvosh.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'ignaday narsani tuyaday qilmoq', right: 'boʻrttirmoq' },
            { left: 'igna ustida oʻtirmoq', right: 'bezovta boʻlmoq' },
            { left: 'qoʻy ogʻzidan choʻp olmagan', right: 'juda yuvosh' }
          ]
        }
      }
    },
    {
      id: 'oz18q5',
      prompt: 'Qaysi gap ifodaliroq?',
      hint: 'Obraz bor.',
      explanation: '«Boshim osmonga yetdi» — «xursand boʻldim»dan koʻra kuchli va obrazli.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Boshim osmonga yetdi.', 'Xursand boʻldim.'], answerIndex: 0 } }
    },
    {
      id: 'oz18q6',
      prompt: 'Said Ahmad hikoyasidagi qahramon «chuchvarani xom sanaysan» iborasini qanday tushunadi va bu nimaga olib keladi?',
      hint: 'Toʻgʻri maʼno.',
      explanation: 'Iborani tom maʼnoda tushunib, chuchvara yemasligini aytadi — kulgi shundan tugʻiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tom maʼnoda tushunadi — kulgi tugʻiladi', 'toʻgʻri tushunadi', 'umuman eshitmaydi', 'tarjima qiladi'], answerIndex: 0 } }
    },
    {
      id: 'oz18q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Iboralar xalq tajribasidan.',
      explanation: 'Iboralar xalqning hayotiy tajribasidan chiqqan obrazli xulosalar; deyarli barchasi ekspressiv.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Iboralar xalq tajribasidan chiqqan obrazli xulosalardir.', value: true },
            { text: 'Iboralarning deyarli barchasi ekspressiv va obrazli.', value: true },
            { text: 'Ilmiy maqolada iboralar eng koʻp ishlatiladi.', value: false }
          ]
        }
      }
    }
  ]
};
