import type { BoardLesson } from './types';
import { OZG3 } from './ozbek-30';

/** Darslik: Ona tili 11, 2-qism (2020), 10-mavzu (34–38-betlar) — evfemizm va disfemizm; betaraf ifoda. */
export const OZ_32: BoardLesson = {
  n: 32,
  label: '32',
  group: OZG3,
  title: 'Evfemizm va disfemizm',
  section: 'Ona tili, 2-qism: 10-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Evfemizm — yunoncha «yumshoq gapirmoq» — fikrni kishi koʻngliga ogʻir botmaydigan qilib aytish vositasi. Masalan, «yomon boʻlibdi» oʻrniga «yaxshi boʻlmabdi», «kasal» oʻrniga «mazasi yoʻq» deyiladi. Turmush oʻrtogʻini ismi bilan emas, «dadasi», «oyisi» deb atash, sizlash ham evfemizmga kiradi. Disfemizm — «qoʻpol gapirmoq» — uning aksi: «rasvo boʻlibdi», «dard uribdi». Ikkalasining oʻrtasida betaraf ifoda turadi. Evfemizmni oʻrinli qoʻllash — madaniyat, disfemizmni koʻp ishlatish — madaniyatsizlik belgisi.",
      easy: "Evfemizm — yumshoq soʻz, disfemizm — qoʻpol soʻz, oʻrtada — oddiy soʻz.",
      draw: [
        { t: 'title', text: 'Yumshoq — betaraf — qoʻpol' },
        { t: 'table', x: 4, y: 18, rows: [['evfemizm', 'betaraf', 'disfemizm'], ['yaxshi boʻlmabdi', 'yomon boʻlibdi', 'rasvo boʻlibdi'], ['mazasi yoʻq', 'kasal', 'dard uribdi'], ['toʻladan kelgan', 'semiz', 'qoʻpol laqab']] }
      ],
      next: 'Qani, sinab koʻraylik'
    }
  ],
  summary: [
    'Evfemizm — fikrni koʻngilga ogʻir botmaydigan qilib ifodalash: «mazasi yoʻq», «yaxshi boʻlmabdi».',
    'Disfemizm — qoʻpol ifoda: «rasvo boʻlibdi», «dard uribdi»; ular oʻrtasida betaraf ifoda turadi.',
    'Evfemizmni oʻrinli qoʻllash madaniyatni, disfemizmni koʻp ishlatish madaniyatsizlikni koʻrsatadi.'
  ],
  questions: [
    {
      id: 'oz32q1',
      prompt: 'Ifodani turiga ajrating.',
      hint: '«Mazasi yoʻq» — yumshoq.',
      explanation: 'Evfemizm — mazasi yoʻq, yaxshi boʻlmabdi, toʻladan kelgan; disfemizm — rasvo boʻlibdi, dard uribdi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'e', label: 'evfemizm' }, { id: 'd', label: 'disfemizm' }],
          items: [
            { emoji: '🌤️', label: 'mazasi yoʻq', bin: 'e' },
            { emoji: '🍃', label: 'yaxshi boʻlmabdi', bin: 'e' },
            { emoji: '🧁', label: 'toʻladan kelgan', bin: 'e' },
            { emoji: '⛈️', label: 'rasvo boʻlibdi', bin: 'd' },
            { emoji: '🌩️', label: 'dard uribdi', bin: 'd' }
          ]
        }
      }
    },
    {
      id: 'oz32q2',
      prompt: '«Evfemizm» soʻzining asl maʼnosi nima?',
      hint: 'Yunoncha.',
      explanation: '«Yumshoq gapirmoq».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yumshoq gapirmoq', 'qoʻpol gapirmoq', 'tez gapirmoq', 'koʻp gapirmoq'], answerIndex: 0 } }
    },
    {
      id: 'oz32q3',
      prompt: '«Xato qilyapsiz!» fikrining eng yumshoq ifodasi qaysi?',
      hint: 'Ayblamaydigan.',
      explanation: '«Siz yanglishyapsiz» — eng yumshoq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Siz yanglishyapsiz.', 'Fikringiz mutlaqo notoʻgʻri.', 'Nooʻrin gapirmang.', 'Haqiqatdan juda uzoqlashyapsiz.'], answerIndex: 0 } }
    },
    {
      id: 'oz32q4',
      prompt: 'Ifodalarni yumshoqdan qoʻpolga qarab tartiblang.',
      hint: 'Avval evfemizm.',
      explanation: 'Yaxshi boʻlmabdi → yomon boʻlibdi → rasvo boʻlibdi.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'yaxshi boʻlmabdi' }, { label: 'yomon boʻlibdi' }, { label: 'rasvo boʻlibdi' }] }
      }
    },
    {
      id: 'oz32q5',
      prompt: 'Qaysilari evfemizmga misol boʻla oladi?',
      hint: 'Hurmat va yumshoqlik.',
      explanation: 'Sizlash, turmush oʻrtogʻini «dadasi» deb atash, «mazasi yoʻq» — evfemizm.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'kattalarni sizlash', correct: true },
            { label: 'turmush oʻrtogʻini «dadasi» deb atash', correct: true },
            { label: '«mazasi yoʻq» deyish', correct: true },
            { label: '«dard uribdi» deyish' }
          ]
        }
      }
    },
    {
      id: 'oz32q6',
      prompt: 'Soʻzni yumshoq muqobili bilan juftlang.',
      hint: 'Sergap — mahmadona emas…',
      explanation: 'Semiz — toʻladan kelgan; uylanmagan — boshi ochiq; kasal — mazasi yoʻq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'semiz', right: 'toʻladan kelgan' },
            { left: 'uylanmagan', right: 'boshi ochiq' },
            { left: 'kasal', right: 'mazasi yoʻq' }
          ]
        }
      }
    },
    {
      id: 'oz32q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Disfemizm koʻp — madaniyatsizlik.',
      explanation: 'Disfemizmni koʻp ishlatish madaniyatsizlik belgisi; evfemizm va disfemizm ikki chekkada, betaraf ifoda oʻrtada.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Disfemizmni koʻp qoʻllash madaniyatsizlik belgisi.', value: true },
            { text: 'Betaraf ifoda evfemizm va disfemizm oʻrtasida turadi.', value: true },
            { text: 'Evfemizm — qoʻpol gapirish usuli.', value: false }
          ]
        }
      }
    }
  ]
};
