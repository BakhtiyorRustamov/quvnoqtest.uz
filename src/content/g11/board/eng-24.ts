import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G4 } from './eng-cast';

/** Student's Book: Life skills “Giving presentations”. */
export const ENG_24: BoardLesson = {
  n: 24,
  label: '24',
  lang: 'en',
  group: ENG_G4,
  easyLang: 'uz',
  title: 'Life skills: Giving presentations',
  section: 'Life skills',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Malika has to give a presentation tomorrow, and she is nervous. Mr Collins gives her some advice.',
      easy: 'Malika ertaga taqdimot qilishi kerak va hayajonda. presentation — taqdimot, audience — tinglovchilar, slide — slayd, eye contact — koʻz bilan aloqa, rehearse — mashq qilmoq, nervous — hayajonlangan.',
      draw: [],
      scene: {
        style: 'chat',
        place: '🏫 After the lesson',
        lines: [
          { who: 'malika', text: 'I have to give a presentation about Samarkand tomorrow. I’m so nervous!', uz: 'Ertaga Samarqand haqida taqdimot qilishim kerak. Juda hayajondaman!' },
          { who: 'narrator', text: 'That’s normal. Rehearse it at home two or three times.', uz: 'Bu normal holat. Uyda ikki-uch marta mashq qil.' },
          { who: 'malika', text: 'Should I read from my slides?', uz: 'Slaydlardan oʻqiymi?' },
          { who: 'narrator', text: 'No. Put only a few words on each slide and look at your audience.', uz: 'Yoʻq. Har bir slaydga bir necha soʻz yoz va tinglovchilarga qara.' },
          { who: 'malika', text: 'Eye contact. Got it!', uz: 'Koʻz bilan aloqa. Tushundim!' }
        ],
        words: [
          { en: 'presentation', uz: 'taqdimot' },
          { en: 'rehearse', uz: 'mashq qilmoq' },
          { en: 'slide', uz: 'slayd' },
          { en: 'audience', uz: 'tinglovchilar' },
          { en: 'eye contact', uz: 'koʻz bilan aloqa' }
        ]
      },
      next: 'The structure'
    },
    {
      kind: 'card',
      clear: true,
      say: 'A good presentation has three parts. The introduction: greet the audience and say what you will talk about. The main part: two or three key points with examples. The conclusion: summarise and invite questions.',
      easy: 'Yaxshi taqdimot uch qismdan iborat: kirish — salomlashish va mavzuni aytish; asosiy qism — 2–3 ta asosiy fikr va misollar; xulosa — qisqacha yakun va savollarga taklif.',
      draw: [
        { t: 'title', text: 'Three parts' },
        { t: 'box', id: 'a', x: 2, y: 16, w: 30, h: 12, text: 'introduction', color: 'blue' },
        { t: 'box', id: 'b', x: 35, y: 16, w: 30, h: 12, text: 'main part', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 16, w: 30, h: 12, text: 'conclusion', color: 'purple' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 40, text: 'greet → 2–3 key points → summary and questions', size: 's', color: 'ink' }
      ],
      next: 'Signposting language'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Signposting phrases guide your audience. Today I’m going to talk about… First of all… Let’s move on to… For example… To sum up… Thank you for listening. Are there any questions?',
      easy: 'Yoʻnaltiruvchi iboralar: Today I’m going to talk about… — bugun … haqida gapiraman; First of all… — avvalo; Let’s move on to… — keyingisiga oʻtamiz; To sum up… — xulosa qilib; Are there any questions? — savollar bormi?',
      draw: [
        { t: 'title', text: 'Signposting' },
        { t: 'text', x: 4, y: 16, text: 'Today I’m going to talk about …', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 24, text: 'First of all …', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 32, text: 'Let’s move on to …', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 40, text: 'To sum up …', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 48, text: 'Are there any questions?', size: 's', color: 'orange' }
      ],
      next: 'Malika’s presentation'
    },
    {
      kind: 'scene',
      say: 'The next day Malika gives her presentation.',
      easy: 'Ertasi kuni Malika taqdimot qildi. Yoʻnaltiruvchi iboralarga eʼtibor bering.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🏫 Malika’s presentation',
        lines: [
          { who: 'malika', text: 'Good morning, everyone. Today I’m going to talk about Samarkand.', uz: 'Hammaga xayrli tong. Bugun men Samarqand haqida gapiraman.' },
          { who: 'malika', text: 'First of all, its history. The city is more than two thousand years old.', uz: 'Avvalo, uning tarixi. Shahar ikki ming yildan ortiq tarixga ega.' },
          { who: 'malika', text: 'Let’s move on to the Registan — three madrasahs on one square.', uz: 'Registonga oʻtamiz — bir maydondagi uchta madrasa.' },
          { who: 'malika', text: 'To sum up, Samarkand is a must-see city. Are there any questions?', uz: 'Xulosa qilib aytganda, Samarqand albatta koʻrish kerak boʻlgan shahar. Savollar bormi?' }
        ],
        words: [
          { en: 'First of all', uz: 'avvalo' },
          { en: 'Let’s move on to', uz: '…ga oʻtamiz' },
          { en: 'To sum up', uz: 'xulosa qilib' },
          { en: 'must-see', uz: 'albatta koʻrish kerak' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Prepare: rehearse, put only a few words on slides, make eye contact with the audience.',
    'Structure: introduction → main part with 2–3 key points → conclusion and questions.',
    'Signposting: Today I’m going to talk about…, First of all…, Let’s move on to…, To sum up…'
  ],
  questions: [
    {
      id: 'e24q1',
      prompt: 'Put the parts of a presentation in order.',
      hint: 'Start by greeting.',
      explanation: 'Greet and introduce the topic → key points → summary → questions.',
      widget: { type: 'step_order', props: { steps: ['Greet the audience and introduce the topic.', 'Give two or three key points.', 'Summarise the main ideas.', 'Invite questions.'] } }
    },
    {
      id: 'e24q2',
      prompt: 'Match the phrases to their purpose.',
      hint: 'To sum up = conclusion.',
      explanation: 'Today I’m going to talk about… — introduce; Let’s move on to… — change topic; To sum up… — conclude; Are there any questions? — invite questions.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Today I’m going to talk about…' }, right: { label: 'introduce the topic' } },
            { left: { label: 'Let’s move on to…' }, right: { label: 'change to the next point' } },
            { left: { label: 'To sum up…' }, right: { label: 'conclude' } },
            { left: { label: 'Are there any questions?' }, right: { label: 'invite questions' } }
          ]
        }
      }
    },
    {
      id: 'e24q3',
      prompt: 'Which is good advice?',
      hint: 'Look at the people, not the screen.',
      explanation: 'Make eye contact with your audience.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Make eye contact with your audience.', 'Read every word from your slides.', 'Put long paragraphs on each slide.', 'Never rehearse before.'], answerIndex: 0 } }
    },
    {
      id: 'e24q4',
      prompt: 'Complete the phrase.',
      hint: 'Before the first point.',
      explanation: 'First of all, its history.',
      widget: { type: 'text_answer', props: { before: '', after: 'of all, let’s look at its history.', answer: 'First', width: 6 } }
    },
    {
      id: 'e24q5',
      prompt: 'Sort the tips.',
      hint: 'Would a good speaker do this?',
      explanation: 'Do: rehearse, make eye contact, speak clearly. Don’t: read from slides, speak too fast, fill slides with text.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'do', label: 'do' }, { id: 'dont', label: 'don’t' }],
          tiles: [
            { id: 'a', label: 'rehearse at home', bin: 'do' },
            { id: 'b', label: 'make eye contact', bin: 'do' },
            { id: 'c', label: 'speak clearly', bin: 'do' },
            { id: 'd', label: 'read from your slides', bin: 'dont' },
            { id: 'e', label: 'speak too fast', bin: 'dont' },
            { id: 'f', label: 'fill slides with text', bin: 'dont' }
          ]
        }
      }
    },
    {
      id: 'e24q6',
      prompt: 'True or false?',
      hint: 'Remember Malika’s presentation.',
      explanation: 'It was about Samarkand; the city is over 2,000 years old; she invited questions at the end.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Malika’s presentation was about Samarkand.', value: true },
            { text: 'Mr Collins told her to read from her slides.', value: false },
            { text: 'She invited questions at the end.', value: true },
            { text: 'Samarkand is about 200 years old.', value: false }
          ]
        }
      }
    },
    {
      id: 'e24q7',
      prompt: 'Put the words in order.',
      hint: 'Start with “Thank you”.',
      explanation: 'Thank you for listening.',
      widget: { type: 'sentence_order', props: { words: ['Thank', 'you', 'for', 'listening.'] } }
    }
  ]
};
