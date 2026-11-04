import type { BoardLesson } from './types';
import { OZG8 } from './ozbek-47';

/** Darslik: Adabiyot 11, I qism (2018), 113–116-betlar — Rabgʻuziy sheʼrlari: bahor vasfidagi ilk oʻzbek gʻazali, ramal vazni, taxallus. */
export const OZ_48: BoardLesson = {
  n: 48,
  label: '48',
  group: OZG8,
  title: 'Rabgʻuziy sheʼrlari',
  section: 'Adabiyot, 1-qism: «Kun hamalga kirdi…»; Rabgʻuziy sheʼrlari haqida',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Rabgʻuziy mohir nosirgina emas, noziktab shoir ham: «Qisasi Rabgʻuziy»da oʻnlab sheʼrlar bor. Bahor vasfiga bagʻishlangan birinchi oʻzbek gʻazali — «Kun hamalga kirdi ersa…» ham uning qalamiga mansub. Gʻazalda matlaʼdan maqtaʼgacha navroʻz — ilk bahor kuylanadi: qahraton qish ketib, olam jonlanadi, qushlar va hayvonlar harakatga keladi. Oʻzbek adabiyotida maqtaʼda taxallus qoʻllash ilk bor Rabgʻuziyda uchraydi. Gʻazal ramali musammani mahzuf vaznida — «foilotun» rukni asosida yozilgan; tasvirda jonlantirish, sifatlash va oʻxshatish asosiy oʻrin tutadi.",
      easy: "Rabgʻuziy bahor haqida birinchi oʻzbek gʻazalini yozgan. Maqtaʼda taxallusni ham u birinchi qoʻllagan.",
      draw: [
        { t: 'title', text: 'Ilk oʻzbek gʻazali' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'gʻazalda'], ['mavzu', 'navroʻz — ilk bahor'], ['vazn', 'ramali musammani mahzuf'], ['rukn', 'foilotun ×3 + foilun'], ['yangilik', 'maqtaʼda taxallus'], ['sanʼatlar', 'jonlantirish, sifatlash']] },
        { t: 'text', x: 4, y: 58, text: 'Kun hamalga kirdi ersa keldi olam navroʻzi,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 64, text: 'Kechdi bahman zamharir qish, qolmadi qori, buzi.', size: 's', color: 'purple' }
      ],
      next: 'Savollarga oʻtamiz'
    }
  ],
  summary: [
    'Rabgʻuziy — noziktab shoir ham; bahor vasfiga bagʻishlangan birinchi oʻzbek gʻazali uning qalamiga mansub.',
    'Gʻazalda navroʻz — ilk bahor kuylanadi; jonlantirish, sifatlash va oʻxshatish asosiy tasvir vositalari.',
    'Maqtaʼda taxallus qoʻllash oʻzbek adabiyotida ilk bor Rabgʻuziyda uchraydi; gʻazal ramali musammani mahzuf vaznida.'
  ],
  questions: [
    {
      id: 'oz48q1',
      prompt: 'Rabgʻuziy gʻazalining mavzusi nima?',
      hint: '«Olam navroʻzi».',
      explanation: 'Navroʻz — ilk bahor.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['navroʻz — ilk bahor', 'kuz xazonlari', 'jang manzarasi', 'ota-ona mehri'], answerIndex: 0 } }
    },
    {
      id: 'oz48q2',
      prompt: 'Oʻzbek adabiyotida maqtaʼda taxallusni ilk bor kim qoʻllagan?',
      hint: 'Bahor gʻazali muallifi.',
      explanation: 'Nosiruddin Rabgʻuziy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Rabgʻuziy', 'Navoiy', 'Bobur', 'Mashrab'], answerIndex: 0 } }
    },
    {
      id: 'oz48q3',
      prompt: 'Gʻazal atamasini izohi bilan juftlang.',
      hint: 'Matlaʼ — boshlanish.',
      explanation: 'Matlaʼ — gʻazalning birinchi bayti; maqtaʼ — soʻnggi bayti; taxallus — shoirning adabiy nomi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'matlaʼ', right: 'gʻazalning birinchi bayti' },
            { left: 'maqtaʼ', right: 'gʻazalning soʻnggi bayti' },
            { left: 'taxallus', right: 'shoirning adabiy nomi' }
          ]
        }
      }
    },
    {
      id: 'oz48q4',
      prompt: 'Gʻazal qaysi vaznda yozilgan?',
      hint: 'Foilotun.',
      explanation: 'Ramali musammani mahzuf — keyinchalik turkiy gʻazalda eng koʻp qoʻllangan vazn.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ramali musammani mahzuf', 'barmoq, 7 boʻgʻin', 'hazaj', 'erkin vazn'], answerIndex: 0 } }
    },
    {
      id: 'oz48q5',
      prompt: 'Gʻazalda bahor qanday tasvirlanadi?',
      hint: 'Yer va osmon.',
      explanation: 'Qish ketib olam jonlanadi, osmonda qushlar, yerda hayvonlar harakatga keladi, daraxtlarda qushlar sayraydi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'qahraton qish ketadi', correct: true },
            { label: 'osmonda qushlar koʻpayadi', correct: true },
            { label: 'yerda hayvonlar jonlanadi', correct: true },
            { label: 'barglar sargʻayib toʻkiladi' }
          ]
        }
      }
    },
    {
      id: 'oz48q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Mantiqiy ip.',
      explanation: 'Gʻazal baytlari bir mantiqiy ip — navroʻz bilan bogʻlangan; «Qisasi Rabgʻuziy»da oʻnlab sheʼrlar bor.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Gʻazalning barcha baytlari navroʻz mavzusi bilan bogʻlangan.', value: true },
            { text: '«Qisasi Rabgʻuziy»da nasr bilan birga oʻnlab sheʼrlar ham bor.', value: true },
            { text: 'Rabgʻuziy gʻazali barmoq vaznida yozilgan.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz48q7',
      prompt: 'Matlaʼdagi «Kun hamalga kirdi» nimani bildiradi?',
      hint: 'Hamal — mart.',
      explanation: 'Quyosh hamal (qoʻy) burjiga kirdi — yangi yil, bahor boshlandi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bahor kirdi, navroʻz keldi', 'kun botdi', 'qish boshlandi', 'yomgʻir yogʻdi'], answerIndex: 0 } }
    }
  ]
};
