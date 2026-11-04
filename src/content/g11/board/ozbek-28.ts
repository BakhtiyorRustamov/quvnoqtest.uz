import type { BoardLesson } from './types';
import { OZG2 } from './ozbek-25';

/** Darslik: Ona tili 11, 2-qism (2020), 5-mavzu (16–19-betlar) — urgʻu talaffuzi: oʻzlashmalar, urgʻuning koʻchishi, urgʻu olmaydigan yuklamalar, maʼno farqlovchi urgʻu. */
export const OZ_28: BoardLesson = {
  n: 28,
  label: '28',
  group: OZG2,
  title: 'Urgʻu talaffuzi',
  section: 'Ona tili, 2-qism: 5-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Oʻz soʻzlarimizning urgʻusi muammo tugʻdirmaydi, oʻzlashmalarda esa urgʻuni tinglab va lugʻat bilan oʻrganish kerak; urgʻuga rioya qilib gapirish — madaniy nutq belgisi. Urgʻu taʼsirida «diréktor» — «diréktr» kabi tovush tushishi boʻladi, lekin yozuvda aks etmaydi. Oʻzlashmaga urgʻu oladigan oʻzbekcha qoʻshimcha qoʻshilsa, urgʻu koʻchadi: «diréktor» — «direktorní». -mi, -chi, -ku, -dir, -gina kabi yuklamalar urgʻu olmaydi. Urgʻu maʼnoni ham farqlaydi: «olmá» — meva, «ólma» — olmagin.",
      easy: "Urgʻuni toʻgʻri qoʻyish — madaniy nutq. Qoʻshimcha qoʻshilsa urgʻu koʻchadi. Urgʻu maʼnoni oʻzgartiradi: olmá — ólma.",
      draw: [
        { t: 'title', text: 'Urgʻu' },
        { t: 'table', x: 4, y: 18, rows: [['holat', 'misol'], ['urgʻu koʻchadi', 'diréktor → direktorní'], ['urgʻu koʻchadi', 'métod → metodgá'], ['maʼno farqlaydi', 'olmá (meva) — ólma (feʼl)'], ['urgʻusiz yuklama', '-mi, -chi, -ku, -dir, -gina']] }
      ],
      next: 'Qani, sinab koʻraylik'
    }
  ],
  summary: [
    'Oʻzlashma soʻzlarning urgʻusini tinglash va lugʻat orqali oʻrganish kerak; urgʻuga rioya — madaniy nutq belgisi.',
    'Urgʻu oladigan oʻzbekcha qoʻshimcha qoʻshilganda urgʻu koʻchadi; -mi, -chi, -ku, -dir, -gina yuklamalari urgʻu olmaydi.',
    'Urgʻu maʼnoni farqlashi mumkin: olmá — ólma, osmá — ósma.'
  ],
  questions: [
    {
      id: 'oz28q1',
      prompt: '«Direktor» soʻziga «-ni» qoʻshilganda urgʻu qayerga tushadi?',
      hint: 'Oʻzbekcha qoʻshimcha urgʻu oladi.',
      explanation: 'Qoʻshimchaga: direktorní.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qoʻshimchaga: direktorní', 'birinchi boʻgʻinga: dírektorni', 'ikkinchi boʻgʻinga: diréktorni'], answerIndex: 0 } }
    },
    {
      id: 'oz28q2',
      prompt: 'Qaysi yuklamalar urgʻu olmaydi?',
      hint: 'Kitobdagi roʻyxat.',
      explanation: '-mi, -chi, -ku, -dir, -gina, -da, -oq urgʻu olmaydi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: '-mi', correct: true },
            { label: '-chi', correct: true },
            { label: '-ku', correct: true },
            { label: '-gina', correct: true }
          ]
        }
      }
    },
    {
      id: 'oz28q3',
      prompt: 'Qaysi qatorda soʻzlarning urgʻusi oxirgi boʻgʻinga tushmaydi?',
      hint: 'Hámisha, álbatta.',
      explanation: 'Hamisha, albatta, afsuski, hatto, kimdir — urgʻu oxirgi boʻgʻinda emas.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['hamisha, albatta, afsuski, hatto, kimdir', 'qalamdon, gʻallakor, yumshoq', 'muhokama, dengiz, iqbol', 'qariyb, oftob, kelgandir'], answerIndex: 0 } }
    },
    {
      id: 'oz28q4',
      prompt: 'Urgʻu oʻrniga koʻra maʼnoni juftlang.',
      hint: 'Olmá — meva.',
      explanation: 'Olmá — meva; ólma — «olmagin» (feʼl); osmá koʻprik — osilgan koʻprik; ósma — «osmagin».',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'olmá', right: 'meva' },
            { left: 'ólma', right: 'olmagin' },
            { left: 'ósma', right: 'osmagin' }
          ]
        }
      }
    },
    {
      id: 'oz28q5',
      prompt: 'Qaysi soʻzda urgʻu toʻgʻri belgilangan?',
      hint: 'Ikkinchi boʻgʻin.',
      explanation: 'Darslikdagi namunaga koʻra «parláment» — urgʻu ikkinchi boʻgʻinda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['parláment', 'párlament', 'parlamént'], answerIndex: 0 } }
    },
    {
      id: 'oz28q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oʻzbek tilida urgʻu har doim oxirida emas.',
      explanation: 'Oʻzbek tilida urgʻu koʻpincha oxirgi boʻgʻinda, lekin har doim emas; «direktr» kabi talaffuz yozuvda aks etmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Urgʻu taʼsiridagi «diréktr» talaffuzi yozuvda aks etmaydi.', value: true },
            { text: 'Oʻzbek tilida urgʻu faqat soʻzning oxirgi boʻgʻiniga tushadi.', value: false },
            { text: 'Oʻzlashma soʻz urgʻusini lugʻat yordamida oʻrganish mumkin.', value: true }
          ]
        }
      }
    }
  ]
};
