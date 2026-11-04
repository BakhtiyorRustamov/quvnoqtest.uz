import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G5 } from './eng-cast';

/** Student's Book: Unit 19 “The world of work” — work tasks, as and like, different types of clause. */
export const ENG_28: BoardLesson = {
  n: 28,
  label: '28',
  lang: 'en',
  group: ENG_G5,
  easyLang: 'uz',
  title: 'The world of work',
  section: 'Unit 19',
  cast: {
    ...ENG_CAST,
    manager: { name: 'Manager Nodira', emoji: '', color: '#2C7A7B', azure: '', gender: 'f' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Malika has a work experience week at an IT company in Tashkent. The manager explains her tasks.',
      easy: 'Malika IT kompaniyasida bir haftalik amaliyotda. deal with — hal qilmoq, attend a meeting — majlisda qatnashmoq, meet a deadline — muddatda bajarmoq, be in charge of — masʼul boʻlmoq, colleague — hamkasb, salary — maosh, apply for — ariza bermoq.',
      draw: [],
      scene: {
        style: 'stage',
        place: '💻 An IT company office',
        lines: [
          { who: 'manager', text: 'Welcome! This week you’ll work as an assistant in our design team.', uz: 'Xush kelibsiz! Bu hafta siz dizayn jamoamizda yordamchi sifatida ishlaysiz.' },
          { who: 'malika', text: 'What will I do?', uz: 'Men nima qilaman?' },
          { who: 'manager', text: 'You’ll attend meetings, deal with emails and help your colleagues meet a deadline.', uz: 'Majlislarda qatnashasiz, xatlarni koʻrib chiqasiz va hamkasblaringizga muddatga ulgurishda yordam berasiz.' },
          { who: 'malika', text: 'Who is in charge of the team?', uz: 'Jamoaga kim masʼul?' },
          { who: 'manager', text: 'I am. Like everyone here, I started as an intern.', uz: 'Men. Bu yerdagi hamma kabi, men ham amaliyotchi boʻlib boshlaganman.' }
        ],
        words: [
          { en: 'attend a meeting', uz: 'majlisda qatnashmoq' },
          { en: 'deal with', uz: 'hal qilmoq' },
          { en: 'meet a deadline', uz: 'muddatga ulgurmoq' },
          { en: 'be in charge of', uz: 'masʼul boʻlmoq' },
          { en: 'colleague', uz: 'hamkasb' }
        ]
      },
      next: 'As or like?'
    },
    {
      kind: 'card',
      clear: true,
      say: 'As and like. Use as for a job or role — what someone really is: She works as a designer. Use like to compare — similar to: He talks like a manager, but he is an intern. Like plus noun means similar to; as plus noun means in the role of.',
      easy: 'as — kasb yoki rol (haqiqatda shunday): She works as a designer. like — oʻxshatish (aslida emas): He talks like a manager. like + ot = …ga oʻxshab; as + ot = … sifatida.',
      draw: [
        { t: 'title', text: 'as or like?' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 12, text: 'as = role, job', color: 'blue' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'like = similar to', color: 'green' },
        { t: 'text', x: 4, y: 38, text: 'She works as a designer.', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 46, text: 'He talks like a manager.', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 56, text: 'As your boss, I say yes. (I am the boss)', size: 's', color: 'orange' }
      ],
      next: 'Types of clause'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Clauses can do different jobs. A time clause: When I finish school, I’ll apply for a job. A reason clause: I chose IT because I love computers. A purpose clause: I’m saving money so that I can study abroad. A result clause: The work was so interesting that I stayed late.',
      easy: 'Ergash gap turlari: payt — When I finish school…; sabab — because I love computers; maqsad — so that I can study; natija — so interesting that I stayed late.',
      draw: [
        { t: 'title', text: 'Types of clause' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['type', 'linking words'],
            ['time', 'when, after, before'],
            ['reason', 'because, as, since'],
            ['purpose', 'so that, in order to'],
            ['result', 'so … that, such … that']
          ]
        }
      ],
      next: 'End of the week'
    },
    {
      kind: 'scene',
      say: 'On Friday Malika talks about her week.',
      easy: 'Juma kuni Malika haftasi haqida gapiradi. Ergash gaplarga eʼtibor bering.',
      draw: [],
      scene: {
        style: 'chat',
        place: '💻 Friday afternoon',
        lines: [
          { who: 'manager', text: 'So, how was your week?', uz: 'Xoʻsh, haftangiz qanday oʻtdi?' },
          { who: 'malika', text: 'It was so interesting that I didn’t want to go home!', uz: 'Shunchalik qiziq boʻldiki, uyga ketgim kelmadi!' },
          { who: 'manager', text: 'You worked like a real professional.', uz: 'Siz haqiqiy mutaxassis kabi ishladingiz.' },
          { who: 'malika', text: 'Thank you. When I finish school, I’ll apply for a job as a designer.', uz: 'Rahmat. Maktabni bitirgach, dizayner lavozimiga ariza beraman.' }
        ],
        words: [
          { en: 'so interesting that', uz: 'shunchalik qiziqki' },
          { en: 'like a real professional', uz: 'haqiqiy mutaxassis kabi' },
          { en: 'apply for a job', uz: 'ishga ariza bermoq' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Work phrases: attend a meeting, deal with, meet a deadline, be in charge of, apply for, colleague, salary.',
    'as — a real role or job; like — similar to (a comparison).',
    'Clauses: time (when), reason (because), purpose (so that), result (so … that).'
  ],
  questions: [
    {
      id: 'e28q1',
      prompt: 'Match the phrases to their meanings.',
      hint: 'A deadline is a time limit.',
      explanation: 'meet a deadline — finish on time; be in charge of — be responsible for; deal with — handle; colleague — a person you work with.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'meet a deadline' }, right: { label: 'finish on time' } },
            { left: { label: 'be in charge of' }, right: { label: 'be responsible for' } },
            { left: { label: 'deal with' }, right: { label: 'handle' } },
            { left: { label: 'colleague' }, right: { label: 'a person you work with' } }
          ]
        }
      }
    },
    {
      id: 'e28q2',
      prompt: 'Choose as or like.',
      hint: 'It is her real job.',
      explanation: 'She works as a designer.',
      widget: { type: 'mcq', props: { prompt: 'She works ___ a designer.', choices: ['as', 'like', 'such', 'than'], answerIndex: 0 } }
    },
    {
      id: 'e28q3',
      prompt: 'Complete with as or like.',
      hint: 'role → as; similar → like.',
      explanation: 'He is an intern, but he talks like a manager. I worked as an assistant.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'He is an intern, but he talks' }, { blank: 'like' }, { text: 'a manager. I worked' }, { blank: 'as' }, { text: 'an assistant.' }],
          bank: ['like', 'as']
        }
      }
    },
    {
      id: 'e28q4',
      prompt: 'Match the clauses to their type.',
      hint: 'so that = purpose.',
      explanation: 'When I finish school — time; because I love computers — reason; so that I can study abroad — purpose; so interesting that I stayed — result.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'When I finish school' }, right: { label: 'time' } },
            { left: { label: 'because I love computers' }, right: { label: 'reason' } },
            { left: { label: 'so that I can study abroad' }, right: { label: 'purpose' } },
            { left: { label: 'so busy that I stayed late' }, right: { label: 'result' } }
          ]
        }
      }
    },
    {
      id: 'e28q5',
      prompt: 'Complete the result clause.',
      hint: 'so + adjective + that.',
      explanation: 'The work was so interesting that I stayed late.',
      widget: { type: 'text_answer', props: { before: 'The work was so interesting', after: 'I stayed late.', answer: 'that', width: 5 } }
    },
    {
      id: 'e28q6',
      prompt: 'True or false?',
      hint: 'Remember Malika’s week.',
      explanation: 'Malika worked as an assistant; the manager started as an intern; Malika wants to be a designer.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Malika worked as an assistant in the design team.', value: true },
            { text: 'The manager started as an intern.', value: true },
            { text: 'Malika found the week boring.', value: false },
            { text: 'Malika wants to apply for a job as a designer.', value: true }
          ]
        }
      }
    },
    {
      id: 'e28q7',
      prompt: 'Put the words in order.',
      hint: 'Start with “I’m saving”.',
      explanation: 'I’m saving money so that I can study abroad.',
      widget: { type: 'sentence_order', props: { words: ['I’m', 'saving', 'money', 'so', 'that', 'I', 'can', 'study', 'abroad.'] } }
    }
  ]
};
