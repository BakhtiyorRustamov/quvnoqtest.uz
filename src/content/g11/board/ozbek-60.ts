import type { BoardLesson } from './types';
import { OZG9 } from './ozbek-59';

/** Darslik: Adabiyot 11, II qism (2018), 4–34-betlar — «Abulfayzxon» fojiasi va u haqida. */
export const OZ_60: BoardLesson = {
  n: 60,
  label: '60',
  group: OZG9,
  title: '«Abulfayzxon» fojiasi',
  section: 'Adabiyot, 2-qism: «Abulfayzxon» — besh pardali fojia (1924) va u haqida',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "«Abulfayzxon» — Fitratning 1924-yilda chop etilgan besh pardali fojiasi. Unda XVIII asr Buxorosida ashtarxoniylar sulolasining tugashi va mangʻitlarning hokimiyatga kelishi tasvirlanadi. Asar Ulfat tilidan aytilgan «Podshohlik — qon bilan sugʻorilaturgʻon bir ogʻochdir» degan fikrga qurilgan: toj-taxt ishtiyoqi koʻzlarni koʻr qiladi. Drama shaxmat oʻyini bilan boshlanadi — bu qahramonlar kurashiga ramziy ishora. Hakimbiy Eron shohi Nodirshoh bilan yashirin til biriktiradi, oʻgʻli Rahimbiy xonni qamoqqa oladi; Ibrohimbiy esa haqiqat va xalq manfaati tarafida turadi, oxirida ramziy Xayol obrazi zulmni fosh etadi.",
      easy: "«Abulfayzxon» — Buxoro xonining fojiasi. Asar zulm va xiyonat oxir-oqibat inqirozga olib kelishini koʻrsatadi.",
      draw: [
        { t: 'title', text: 'Fojia qahramonlari' },
        { t: 'table', x: 4, y: 18, rows: [['obraz', 'asardagi oʻrni'], ['Abulfayzxon', 'zaif, kaltabin xon'], ['Hakimbiy', 'Nodirshoh bilan til biriktirgan'], ['Rahimbiy', 'xonni qamagan oʻgʻil'], ['Ibrohimbiy', 'haqiqat va xalq tarafdori'], ['Xayol', 'zulmni fosh etuvchi ramz']] },
        { t: 'text', x: 4, y: 58, text: '«Podshohlik — qon bilan sugʻorilaturgʻon', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 64, text: 'bir ogʻochdir.» (Ulfat)', size: 's', color: 'purple' }
      ],
      next: 'Savollarga oʻtamiz'
    }
  ],
  summary: [
    '«Abulfayzxon» (1924) — XVIII asr Buxorosida sulolalar almashinuvi haqidagi besh pardali fojia.',
    'Asar «podshohlik — qon bilan sugʻoriladigan daraxt» degan fikrga qurilgan: zulm va xiyonat inqirozga olib keladi.',
    'Hakimbiy va Rahimbiy — xiyonat, Ibrohimbiy — haqiqat, Xayol — zulmni fosh etuvchi ramziy obraz.'
  ],
  questions: [
    {
      id: 'oz60q1',
      prompt: '«Abulfayzxon» qaysi janrdagi asar?',
      hint: 'Besh pardali.',
      explanation: 'Fojia (tragediya).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['fojia', 'komediya', 'roman', 'doston'], answerIndex: 0 } }
    },
    {
      id: 'oz60q2',
      prompt: 'Asar necha pardadan iborat?',
      hint: 'Besh.',
      explanation: 'Besh pardali fojia.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'parda' } }
    },
    {
      id: 'oz60q3',
      prompt: 'Drama qanday voqea bilan boshlanadi?',
      hint: 'Mir Vafo va Qozi Nizom.',
      explanation: 'Shaxmat oʻyini bilan — qahramonlar kurashiga ramziy ishora.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['shaxmat oʻyini', 'toʻy marosimi', 'jang', 'ov'], answerIndex: 0 } }
    },
    {
      id: 'oz60q4',
      prompt: 'Obrazni asardagi oʻrni bilan juftlang.',
      hint: 'Xayol — ramz.',
      explanation: 'Hakimbiy — yashirin til biriktirgan; Ibrohimbiy — haqiqat tarafdori; Xayol — zulmni fosh etuvchi ramz.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Hakimbiy', right: 'dushman bilan til biriktirgan' },
            { left: 'Ibrohimbiy', right: 'haqiqat tarafdori' },
            { left: 'Xayol', right: 'zulmni fosh etuvchi ramz' }
          ]
        }
      }
    },
    {
      id: 'oz60q5',
      prompt: 'Hakimbiy qaysi shoh bilan yashirin til biriktiradi?',
      hint: 'Eron shohi.',
      explanation: 'Nodirshoh bilan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Nodirshoh', 'Abdulmoʻmin', 'Rizoqulixon', 'Shohdorxon'], answerIndex: 0 } }
    },
    {
      id: 'oz60q6',
      prompt: 'Ulfatning «podshohlik — qon bilan sugʻoriladigan daraxt» degan fikri nimani anglatadi?',
      hint: 'Toj-taxt ishtiyoqi.',
      explanation: 'Hokimiyat uchun kurash qon toʻkish va zulm bilan bogʻliq ekanini.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['hokimiyat kurashi qon va zulm bilan bogʻliq', 'podsholar bogʻbonlik qiladi', 'daraxt ekish savob', 'xon adolatli boʻladi'], answerIndex: 0 } }
    },
    {
      id: 'oz60q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tarixiy va toʻqima obrazlar.',
      explanation: 'Fitrat real tarixiy shaxslar bilan birga toʻqima va ramziy obrazlardan foydalangan; asar XVIII asr voqealariga asoslangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Asarda real tarixiy shaxslar bilan birga ramziy obrazlar ham bor.', value: true },
            { text: 'Fojia XVIII asr Buxorosi voqealariga asoslangan.', value: true },
            { text: 'Asar oxirida Abulfayzxon gʻalaba qozonadi.', value: false }
          ]
        }
      }
    }
  ]
};
