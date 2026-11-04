import type { BoardLesson } from './types';
import { BOB3 } from './biologiya-24';

/** Darslik: Biologiya 11, 26-§ (139–142-betlar) — Vernadskiy boʻyicha biosfera moddalarining yetti guruhi: tirik, qattiq (notirik), biogen, biogen-abiogen (biokos), radioaktiv, tarqoq atomlar, kosmik. */
export const BIO_26: BoardLesson = {
  n: 26,
  label: '26',
  group: BOB3,
  title: 'Biosferaning tarkibi',
  section: '26-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Olmos va marmar, koʻmir va ohaktosh, tuproq va meteorit — bularning barchasi biosfera tarkibiga kiradi, lekin kelib chiqishi har xil. Vernadskiy biosfera moddalarini kelib chiqishiga koʻra yetti guruhga ajratgan.",
      easy: "Biosfera moddalari — kelib chiqishiga koʻra 7 guruh.",
      draw: [
        { t: 'title', text: 'Biosfera nimadan iborat?' },
        { t: 'icon', x: 16, y: 34, emoji: '💎', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '☄️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['olmos, marmar', 'koʻmir, ohaktosh', 'tuproq, meteorit'] }
      ],
      next: 'Tirik modda'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tirik modda — biosferadagi barcha tirik organizmlar: produtsentlar, konsumentlar, redutsentlar. Bu atamani Vernadskiy kiritgan. U shunday degan: «Yer yuzida, pirovard natijasi jihatidan, tirik organizmlardan koʻra qudratliroq kuch yoʻq». Tirik modda oʻsadi, koʻpayadi, tarqaladi va sayyora qiyofasini oʻzgartiradi.",
      easy: "Tirik modda — barcha organizmlar; eng qudratli kuch (Vernadskiy).",
      draw: [
        { t: 'title', text: 'Tirik modda' },
        { t: 'icon', x: 12, y: 30, emoji: '🌿', size: 'm' },
        { t: 'icon', x: 24, y: 30, emoji: '🐾', size: 'm' },
        { t: 'icon', x: 36, y: 30, emoji: '🍄', size: 'm' },
        { t: 'icon', x: 48, y: 30, emoji: '🦠', size: 'm' },
        { t: 'text', x: 4, y: 48, text: '«tirik organizmlardan qudratliroq kuch yoʻq»', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 58, text: 'V. I. Vernadskiy', size: 's', color: 'blue' }
      ],
      next: 'Yetti guruh'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Qolgan guruhlar. Qattiq moddalar — hayotga bogʻliq boʻlmagan holda hosil boʻlgan minerallar va togʻ jinslari: olmos, kvars, granit, marmar. Biogen moddalar — organizmlar faoliyati yoki qoldiqlaridan: neft, toshkoʻmir, ohaktosh, atmosfera gazlari. Biogen-abiogen moddalar — ikkalasidan birga: tuproq, suv havzasi tubi. Yana radioaktiv moddalar, tarqoq atomlar va kosmik moddalar — meteorit, kosmik chang.",
      easy: "Tirik, qattiq, biogen, biogen-abiogen, radioaktiv, tarqoq atom, kosmik.",
      draw: [
        { t: 'title', text: 'Yetti guruh' },
        { t: 'table', x: 4, y: 20, rows: [['guruh', 'misol'], ['tirik', 'organizmlar'], ['qattiq', 'olmos, granit'], ['biogen', 'neft, koʻmir'], ['biogen-abiogen', 'tuproq'], ['kosmik', 'meteorit']] },
        { t: 'text', x: 4, y: 64, text: '+ radioaktiv moddalar, tarqoq atomlar', size: 's' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Toshkoʻmir qayerdan paydo boʻlgan? Millionlab yil oldin oʻsgan qirqquloqsimon oʻsimliklar qoldiqlaridan — demak u biogen modda. Granit esa vulqon va togʻ jarayonlarida hayotsiz hosil boʻlgan — qattiq modda. Tuproq — togʻ jinsi yemirilishi va organizmlar faoliyatining birgalikdagi mahsuli — biogen-abiogen modda.",
      easy: "Koʻmir — biogen, granit — qattiq, tuproq — biogen-abiogen.",
      draw: [
        { t: 'title', text: 'Qaysi guruhga?' },
        { t: 'list', x: 4, y: 22, items: ['koʻmir — biogen', 'granit — qattiq', 'tuproq — biogen-abiogen', 'meteorit — kosmik'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Vernadskiy biosfera moddalarini kelib chiqishiga koʻra yetti guruhga ajratgan.',
    'Tirik modda — barcha organizmlar; qattiq — hayotsiz hosil boʻlgan (granit, olmos); biogen — organizmlardan (neft, koʻmir, ohaktosh).',
    'Biogen-abiogen (tuproq, suv tubi), radioaktiv moddalar, tarqoq atomlar va kosmik moddalar (meteoritlar).'
  ],
  questions: [
    {
      id: 'b26q1',
      prompt: 'Moddani guruhiga ajrating.',
      hint: 'Koʻmir — oʻsimlik qoldigʻi.',
      explanation: 'Qattiq: granit, olmos. Biogen: neft, toshkoʻmir, ohaktosh. Biogen-abiogen: tuproq.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'q', label: 'Qattiq' },
            { id: 'b', label: 'Biogen' },
            { id: 'ba', label: 'Biogen-abiogen' }
          ],
          items: [
            { emoji: '', label: 'granit', bin: 'q' },
            { emoji: '', label: 'olmos', bin: 'q' },
            { emoji: '', label: 'neft', bin: 'b' },
            { emoji: '', label: 'toshkoʻmir', bin: 'b' },
            { emoji: '', label: 'ohaktosh', bin: 'b' },
            { emoji: '', label: 'tuproq', bin: 'ba' }
          ]
        }
      }
    },
    {
      id: 'b26q2',
      prompt: 'Vernadskiy biosfera moddalarini nechta guruhga ajratgan?',
      hint: 'Haftadagi kunlar soni.',
      explanation: '7 ta guruh.',
      widget: { type: 'number_answer', props: { answer: 7 } }
    },
    {
      id: 'b26q3',
      prompt: 'Meteorit va kosmik chang qaysi guruhga kiradi?',
      hint: 'Koinotdan keladi.',
      explanation: 'Kosmik moddalar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['biogen', 'kosmik', 'qattiq', 'tirik'], answerIndex: 1 } }
    },
    {
      id: 'b26q4',
      prompt: '«Tirik modda» atamasini kim kiritgan?',
      hint: 'Biosfera taʼlimoti muallifi.',
      explanation: 'V. I. Vernadskiy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['E. Zyuss', 'V. I. Vernadskiy', 'Ch. Darvin', 'J. B. Lamark'], answerIndex: 1 } }
    },
    {
      id: 'b26q5',
      prompt: 'Guruhni taʼrifi bilan juftlang.',
      hint: 'Biogen — hayotdan.',
      explanation: 'Tirik — barcha organizmlar; qattiq — hayotsiz hosil boʻlgan; biogen — organizmlar faoliyatidan; biogen-abiogen — ikkalasidan.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'tirik modda' }, b: { label: 'barcha organizmlar' } },
            { a: { label: 'qattiq modda' }, b: { label: 'hayotsiz hosil boʻlgan' } },
            { a: { label: 'biogen modda' }, b: { label: 'organizm qoldigʻidan' } },
            { a: { label: 'biogen-abiogen' }, b: { label: 'ikkala jarayondan' } }
          ]
        }
      }
    },
    {
      id: 'b26q6',
      prompt: 'Biogen moddalarni belgilang.',
      hint: 'Organizmlar faoliyati mahsuli.',
      explanation: 'Neft, toshkoʻmir, ohaktosh, torf, atmosfera gazlari — biogen.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'neft', correct: true },
            { label: 'toshkoʻmir', correct: true },
            { label: 'torf', correct: true },
            { label: 'granit' },
            { label: 'meteorit' }
          ]
        }
      }
    },
    {
      id: 'b26q7',
      prompt: 'Qaysi biri qattiq (abiogen) modda emas?',
      hint: 'Uchtasi hayotsiz hosil boʻlgan.',
      explanation: 'Ohaktosh — biogen (organizm skeletlari qoldigʻi).',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'granit' }, { text: 'kvars' }, { text: 'ohaktosh', odd: true }, { text: 'marmar' }] } }
    },
    {
      id: 'b26q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tuproq — ikki jarayon natijasi.',
      explanation: 'Tuproq biogen-abiogen; tirik modda sayyora qiyofasini oʻzgartiradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Tuproq biogen va abiogen jarayonlar natijasida hosil boʻladi.', value: true },
            { text: 'Tirik modda sayyora qiyofasini oʻzgartiruvchi omil.', value: true },
            { text: 'Neft — kosmik modda.', value: false },
            { text: 'Olmos tirik organizmlar faoliyatidan hosil boʻlgan.', value: false }
          ]
        }
      }
    }
  ]
};
