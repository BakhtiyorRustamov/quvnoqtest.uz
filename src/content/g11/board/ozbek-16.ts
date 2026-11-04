import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 68–71-betlar — joʻyalilik va uslublar; yozma va ogʻzaki nutq; badiiy asarda joʻyasizlikdan kulgi yaratish. */
export const OZ_16: BoardLesson = {
  n: 16,
  label: '16',
  group: OZG1,
  title: 'Joʻyalilik va uslublar',
  section: 'Ona tili, 1-qism: «Joʻyalilik va uslublar»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Har bir uslubning oʻziga xos soʻz, ibora va gap qoliplari bor. Bir uslubga xos birlikni boshqasiga koʻchirish joʻyalilikni buzadi: masalan, rasmiy «jamgʻarmoq» soʻzi bolalarning sovgʻa yigʻishi haqidagi jonli hikoyada oʻrinsiz. Yozma va ogʻzaki nutqning ham oʻz birliklari bor. Badiiy asarda esa yozuvchi joʻyasizlikni ataylab ishlatadi: qahramonning saviyasini koʻrsatish yoki kulgi yaratish uchun — masalan, Said Ahmadning «Mushtipar» hikoyasida er va xotinning odatdagi oʻrni almashtirib qoʻyilgan.",
      easy: "Har uslubning oʻz soʻzlari bor. Rasmiy soʻz jonli hikoyada begona. Yozuvchi buni ataylab kulgi uchun qiladi.",
      draw: [
        { t: 'title', text: 'Uslub va soʻz tanlash' },
        { t: 'table', x: 4, y: 18, rows: [['uslub', 'xos birliklar'], ['rasmiy', 'jamgʻarmoq, ijro etmoq'], ['soʻzlashuv', 'yigʻmoq, qilmoq'], ['ilmiy', 'atama, aniq taʼrif'], ['badiiy', 'obraz, koʻchma maʼno']] },
        { t: 'text', x: 4, y: 54, text: 'Uslubni aralashtirish — joʻyasizlik', size: 's', color: 'red' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Har bir nutq uslubining oʻziga xos birliklari bor; ularni boshqa uslubga koʻchirish joʻyalilikni buzadi.',
    'Yozma va ogʻzaki nutqning ham oʻziga xos birliklari va gap qoliplari bor.',
    'Badiiy asarda joʻyasizlik qahramon saviyasini koʻrsatish yoki kulgi yaratish uchun ataylab qoʻllanishi mumkin.'
  ],
  questions: [
    {
      id: 'oz16q1',
      prompt: '«Jamgʻarmoq» soʻzi koʻproq qaysi uslubga xos?',
      hint: 'Hujjat tili.',
      explanation: 'Rasmiy uslubga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['rasmiy', 'soʻzlashuv', 'badiiy', 'sheʼriy'], answerIndex: 0 } }
    },
    {
      id: 'oz16q2',
      prompt: 'Soʻz yoki iborani uslubiga ajrating.',
      hint: '«Ijro etmoq» — rasmiy.',
      explanation: 'Rasmiy — ijro etmoq, jamgʻarmoq, qaror qilindi; soʻzlashuv — yigʻmoq, zoʻr-da, qoyil.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'r', label: 'rasmiy' }, { id: 's', label: 'soʻzlashuv' }],
          items: [
            { emoji: '📑', label: 'ijro etmoq', bin: 'r' },
            { emoji: '🏦', label: 'jamgʻarmoq', bin: 'r' },
            { emoji: '🖋️', label: 'qaror qilindi', bin: 'r' },
            { emoji: '🧺', label: 'yigʻmoq', bin: 's' },
            { emoji: '💬', label: 'zoʻr-da!', bin: 's' },
            { emoji: '🎉', label: 'qoyil!', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'oz16q3',
      prompt: 'Said Ahmadning «Mushtipar» hikoyasida kulgi nimadan tugʻiladi?',
      hint: 'Teskari hikoya.',
      explanation: 'Er va xotinning odatdagi oʻrni ataylab almashtirilgan — joʻyasizlik kulgi yaratadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['er va xotinning oʻrni almashtirilgani', 'sheva soʻzlari', 'chet soʻzlar', 'uzun gaplar'], answerIndex: 0 } }
    },
    {
      id: 'oz16q4',
      prompt: 'Qabriston darvozasiga «Xush kelibsiz» deb yozilishi qanday xato?',
      hint: 'Vaziyatga mos emas.',
      explanation: 'Vaziyatga mutlaqo mos emas — joʻyalilik buzilgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['joʻyalilik buzilgan', 'imlo xatosi', 'tinish belgisi xatosi', 'xato yoʻq'], answerIndex: 0 } }
    },
    {
      id: 'oz16q5',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Yuragi toshib ketmoq — aytgisi keladi.',
      explanation: 'Yuragi orqasiga tortib ketmoq — qoʻrquv aralash qattiq hayajonlanmoq; yuragi toshib ketmoq — kechinmasini kimgadir aytish ehtiyoji.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'yuragi orqasiga tortib ketmoq', right: 'qoʻrquv aralash hayajonlanmoq' },
            { left: 'yuragi toshib ketmoq', right: 'dardini aytish ehtiyoji tugʻilmoq' }
          ]
        }
      }
    },
    {
      id: 'oz16q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Yozma va ogʻzaki farqli.',
      explanation: 'Yozma va ogʻzaki nutqning sharoiti va birliklari farq qiladi; badiiy asarda qahramonning joʻyasiz nutqi uning saviyasini koʻrsatishi mumkin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Yozma va ogʻzaki nutqning oʻziga xos birliklari bor.', value: true },
            { text: 'Qahramonning joʻyasiz nutqi uning madaniy saviyasini koʻrsatishi mumkin.', value: true },
            { text: 'Istalgan uslub birligini istalgan uslubda erkin ishlatish mumkin.', value: false }
          ]
        }
      }
    }
  ]
};
