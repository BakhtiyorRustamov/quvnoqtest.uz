import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 51–54-betlar — soflik va badiiy nutq: sheva, chet soʻz, dagʻal va parazit soʻzlarning badiiy vazifasi; idoraviy til tanqidi. */
export const OZ_12: BoardLesson = {
  n: 12,
  label: '12',
  group: OZG1,
  title: 'Nutqning sofligi va badiiy nutq',
  section: 'Ona tili, 1-qism: «Nutqning sofligi va badiiy nutq»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Badiiy asarda «nosof» unsurlar ataylab, maqsad bilan ishlatilishi mumkin. Sheva soʻzlari qahramonning qayerlik ekanini, chet soʻzlar uning saviyasini, dagʻal soʻzlar ichki dunyosini, «haligi», «innaykeyin» kabi parazit soʻzlar esa hayajoni yoki nutqi zaif ekanini koʻrsatadi. Idoraviy qolip iboralar faqat rasmiy uslubga xos; badiiy asarda ular qahramonni kinoya qilish uchungina keladi. Abdulla Qahhor «yaxshi ovqat yedim» oʻrniga «sifatli ovqatlandim» deydigan quruq idoraviy tilni qattiq tanqid qilgan.",
      easy: "Yozuvchi sheva yoki «haligi» soʻzini ataylab qoʻshadi — qahramonni tasvirlash uchun.",
      draw: [
        { t: 'title', text: 'Badiiy asarda nima uchun?' },
        { t: 'table', x: 4, y: 18, rows: [['unsur', 'badiiy vazifasi'], ['sheva soʻzi', 'qahramon qayerlik ekani'], ['chet soʻz', 'milliy mansublik, saviya'], ['dagʻal soʻz', 'ichki dunyo, tarbiya'], ['parazit soʻz', 'hayajon, nutqi zaifligi'], ['idoraviy ibora', 'kinoya qilish']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Badiiy nutqda sheva, chet, dagʻal va parazit soʻzlar qahramonni tasvirlash uchun ataylab qoʻllanishi mumkin.',
    'Idoraviy qolip iboralar rasmiy uslubga xos; badiiy asarda faqat kinoya maqsadida oʻrinli.',
    'Jonli soʻz oʻrniga quruq idoraviy iboralarni qoʻllash nutqni zerikarli va jonsiz qiladi.'
  ],
  questions: [
    {
      id: 'oz12q1',
      prompt: 'Unsurni badiiy vazifasi bilan juftlang.',
      hint: 'Sheva — hudud.',
      explanation: 'Sheva — qahramonning hududiy mansubligi; parazit soʻz — hayajon yoki nutqning zaifligi; idoraviy ibora — kinoya.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'sheva soʻzi', right: 'qahramon qayerlik ekani' },
            { left: 'parazit soʻz', right: 'hayajon yoki zaif nutq' },
            { left: 'idoraviy ibora', right: 'kinoya qilish' }
          ]
        }
      }
    },
    {
      id: 'oz12q2',
      prompt: 'Idoraviy qolip iboralar qaysi uslubga xos?',
      hint: 'Hujjatlar.',
      explanation: 'Rasmiy uslubga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['rasmiy', 'soʻzlashuv', 'badiiy', 'publitsistik'], answerIndex: 0 } }
    },
    {
      id: 'oz12q3',
      prompt: 'Abdulla Qahhor qaysi ifodani jonsiz idoraviy til namunasi deb tanqid qilgan?',
      hint: 'Ovqat haqida.',
      explanation: '«Sifatli ovqatlandim» — «yaxshi ovqat yedim» oʻrniga qoʻllanadigan quruq ifoda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«sifatli ovqatlandim»', '«yaxshi ovqat yedim»', '«mazali ekan»', '«rahmat, toʻydim»'], answerIndex: 0 } }
    },
    {
      id: 'oz12q4',
      prompt: '«Juringlar!», «kepqolganman» kabi soʻzlar badiiy asarda nimaga xizmat qiladi?',
      hint: 'Sheva.',
      explanation: 'Qahramonning muayyan hududga mansubligini koʻrsatadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qahramonning hududiy mansubligini koʻrsatadi', 'imlo xatosi', 'ilmiy atama', 'rasmiy uslub belgisi'], answerIndex: 0 } }
    },
    {
      id: 'oz12q5',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Xamirdan qil sugʻurganday — oson.',
      explanation: 'Xamirdan qil sugʻurganday — osonlik bilan; xamir uchidan patir — katta narsaning kichik boshlangʻich qismi; tishi oʻtmaydi — kuchi yetmaydi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'xamirdan qil sugʻurganday', right: 'hech qiyinchiliksiz' },
            { left: 'xamir uchidan patir', right: 'katta ishning kichik boshlanishi' },
            { left: 'tishi oʻtmaydi', right: 'kuchi yetmaydi, uddalay olmaydi' }
          ]
        }
      }
    },
    {
      id: 'oz12q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Maqsadsiz ishlatish oʻrinsiz.',
      explanation: 'Badiiy asarda ham idoraviy iboralarni maqsadsiz ishlatish oʻrinsiz; dagʻal soʻz qahramon tarbiyasini boʻrttirib koʻrsatishi mumkin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Dagʻal soʻz badiiy asarda qahramonning tarbiyasini boʻrttirib koʻrsatishi mumkin.', value: true },
            { text: 'Badiiy asarda idoraviy iboralarni maqsadsiz ishlatish oʻrinsiz.', value: true },
            { text: 'Badiiy asarda sheva soʻzi doimo xato hisoblanadi.', value: false }
          ]
        }
      }
    }
  ]
};
