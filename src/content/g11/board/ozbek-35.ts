import type { BoardLesson } from './types';
import { OZG4 } from './ozbek-34';

/** Darslik: Ona tili 11, 2-qism (2020), 14-mavzu (51–55-betlar) — maqolni oʻrinli qoʻllash: maqol janr va til birligi sifatida, bir-birini inkor etuvchi maqollar. */
export const OZ_35: BoardLesson = {
  n: 35,
  label: '35',
  group: OZG4,
  title: 'Maqolni oʻrinli qoʻllash',
  section: 'Ona tili, 2-qism: 14-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Maqol — xalq ogʻzaki ijodi janri va ayni paytda til birligi. U ixcham, mazmunli va taʼsirchan ifoda. Maqollar muayyan nutq vaziyatiga xos, shuning uchun baʼzan bir-birini inkor etadi: «Yaxshilik qil, umidvor boʻl» — «Yaxshilik qil — unut». Maqol evfemizm vazifasini ham bajaradi: achchiq gapni yumshatib, ibrat tarzida yetkazadi. Maqolni oʻrinli ishlatish nutqni bezaydi, oʻrinsiz ishlatish esa kulgili qiladi.",
      easy: "Maqol — qisqa, dono gap. Har maqolning oʻz oʻrni bor; baʼzi maqollar bir-biriga zid.",
      draw: [
        { t: 'title', text: 'Maqol: janr va til birligi' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 44, h: 12, text: 'Yaxshilik qil, umidvor boʻl', color: 'green' },
        { t: 'box', id: 'b', x: 52, y: 20, w: 44, h: 12, text: 'Yaxshilik qil — unut', color: 'blue' },
        { t: 'text', x: 4, y: 42, text: 'Har biri oʻz vaziyatida toʻgʻri', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 52, text: 'Tekin boʻlsa, mix yut — Tekin tomoq tish sindirar', size: 's' }
      ],
      next: 'Mashqlarga oʻtamiz'
    }
  ],
  summary: [
    'Maqol — xalq ogʻzaki ijodi janri va til birligi: ixcham, mazmunli, taʼsirchan ifoda.',
    'Maqollar muayyan vaziyatga xos boʻlgani uchun baʼzan bir-birini inkor etadi.',
    'Maqol evfemizm vazifasini ham bajaradi; uni vaziyatga mos qoʻllash kerak.'
  ],
  questions: [
    {
      id: 'oz35q1',
      prompt: 'Bir-birini inkor etuvchi maqollarni juftlang.',
      hint: 'Tekin — mix yut / tish sindirar.',
      explanation: 'Tekin boʻlsa, mix yut — Tekin tomoq tish sindirar; Gap bilan kerilma, ish bilan keril — Ish bilganga bir tanga, gap bilganga ming tanga.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Tekin boʻlsa, mix yut.', right: 'Tekin tomoq tish sindirar.' },
            { left: 'Gap bilan kerilma, ish bilan keril.', right: 'Ish bilganga bir tanga, gap bilganga ming tanga.' },
            { left: 'Yaxshilik qil, umidvor boʻl.', right: 'Yaxshilik qil — unut.' }
          ]
        }
      }
    },
    {
      id: 'oz35q2',
      prompt: 'Maqol nima?',
      hint: 'Ikki tomoni bor.',
      explanation: 'Xalq ogʻzaki ijodi janri va ayni paytda til birligi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ham janr, ham til birligi', 'faqat sheʼr turi', 'faqat ibora', 'yozuvchi asari'], answerIndex: 0 } }
    },
    {
      id: 'oz35q3',
      prompt: 'Maqolni izohi bilan juftlang.',
      hint: 'Qoʻshni ol.',
      explanation: '«Hovli olma, qoʻshni ol» — yaxshi qoʻshni muhim; «Yolgʻiz daraxt oʻrmon boʻlmas» — birlikda kuch; «Qari bilganni pari bilmas» — tajriba qadri.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Hovli olma, qoʻshni ol.', right: 'yaxshi qoʻshni hovlidan muhim' },
            { left: 'Yolgʻiz daraxt oʻrmon boʻlmas.', right: 'birlikda kuch bor' },
            { left: 'Qari bilganni pari bilmas.', right: 'tajriba qadrli' }
          ]
        }
      }
    },
    {
      id: 'oz35q4',
      prompt: 'Nega maqollar baʼzan bir-biriga zid boʻladi?',
      hint: 'Vaziyat.',
      explanation: 'Har biri muayyan nutq vaziyatiga xos.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['har biri oʻz vaziyatiga xos', 'biri notoʻgʻri', 'turli tillardan olingan', 'tasodifan'], answerIndex: 0 } }
    },
    {
      id: 'oz35q5',
      prompt: 'Maqolning xususiyatlarini tanlang.',
      hint: 'Qisqa va taʼsirli.',
      explanation: 'Ixcham, mazmunli, taʼsirchan; evfemizm vazifasini ham bajaradi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ixcham', correct: true },
            { label: 'taʼsirchan', correct: true },
            { label: 'evfemizm vazifasini bajara oladi', correct: true },
            { label: 'har doim uzun va murakkab' }
          ]
        }
      }
    },
    {
      id: 'oz35q6',
      prompt: 'Yolgʻiz yurishni yoqtiradigan doʻstingizga qaysi maqol mos?',
      hint: 'Birlik haqida.',
      explanation: '«Yolgʻiz otning changi chiqmas, changi chiqsa ham dongʻi chiqmas» — yolgʻiz harakat samarasiz.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Yolgʻiz otning changi chiqmas.', 'Tekin boʻlsa, mix yut.', 'Qari bilganni pari bilmas.', 'Sabr tagi — sariq oltin.'], answerIndex: 0 } }
    }
  ]
};
