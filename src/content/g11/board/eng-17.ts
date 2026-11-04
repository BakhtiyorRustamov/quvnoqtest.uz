import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G3 } from './eng-cast';

/** Student's Book: Unit 12 “Getting around” (pp. 68–71) — travel vocabulary, phrases with on, need to / needn't / had to, let and make. */
export const ENG_17: BoardLesson = {
  n: 17,
  label: '17',
  lang: 'en',
  group: ENG_G3,
  easyLang: 'uz',
  title: 'Getting around',
  section: 'Unit 12',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Malika and Timur plan a trip from Tashkent to Samarkand. Listen for travel words and phrases with on.',
      easy: 'Toshkentdan Samarqandga sayohat rejasi. platform — perron, ticket — chipta, journey — safar, delay — kechikish, passenger — yoʻlovchi. on time — oʻz vaqtida, on foot — piyoda, on board — bortda (poyezd ichida), on purpose — ataylab, on sale — sotuvda.',
      draw: [],
      scene: {
        style: 'chat',
        place: '🚉 Tashkent railway station',
        lines: [
          { who: 'malika', text: 'The fast train leaves from platform 3. Is it on time?', uz: 'Tezyurar poyezd 3-perrondan joʻnaydi. U oʻz vaqtidami?' },
          { who: 'timur', text: 'Yes, no delay today. The journey takes about two hours.', uz: 'Ha, bugun kechikish yoʻq. Safar taxminan ikki soat davom etadi.' },
          { who: 'malika', text: 'Do we need to print our tickets?', uz: 'Chiptalarimizni chop etishimiz kerakmi?' },
          { who: 'timur', text: 'No, we needn’t. We can show them on the phone.', uz: 'Yoʻq, shart emas. Telefonda koʻrsatsak boʻladi.' },
          { who: 'malika', text: 'Good. In Samarkand we can go to the Registan on foot.', uz: 'Yaxshi. Samarqandda Registonga piyoda borsak boʻladi.' }
        ],
        words: [
          { en: 'platform', uz: 'perron' },
          { en: 'on time', uz: 'oʻz vaqtida' },
          { en: 'delay', uz: 'kechikish' },
          { en: 'journey', uz: 'safar' },
          { en: 'on foot', uz: 'piyoda' }
        ]
      },
      next: 'Phrases with on'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Phrases with on: on time means at the right time; on foot means walking; on board means on a train, plane or ship; on purpose means deliberately; on sale means available to buy; on the way means during the journey.',
      easy: 'on time — oʻz vaqtida; on foot — piyoda; on board — bortda; on purpose — ataylab; on sale — sotuvda; on the way — yoʻlda.',
      draw: [
        { t: 'title', text: 'Phrases with on' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['phrase', 'meaning'],
            ['on time', 'at the right time'],
            ['on foot', 'walking'],
            ['on board', 'on a train or plane'],
            ['on purpose', 'deliberately'],
            ['on the way', 'during the journey']
          ]
        }
      ],
      next: 'Need to, needn’t, had to'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Need to means it is necessary: We need to buy tickets. Needn’t or don’t need to means it is not necessary: You needn’t print them. Had to is the past of must and have to: Yesterday we had to wait an hour. Didn’t need to means it was not necessary in the past.',
      easy: 'need to — kerak; needn’t / don’t need to — shart emas; had to — kerak edi (must / have to oʻtgan zamoni); didn’t need to — oʻtmishda shart emas edi.',
      draw: [
        { t: 'title', text: 'Necessity' },
        { t: 'box', id: 'a', x: 2, y: 16, w: 30, h: 12, text: 'need to: necessary', color: 'green' },
        { t: 'box', id: 'b', x: 35, y: 16, w: 30, h: 12, text: 'needn’t: not needed', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 16, w: 30, h: 12, text: 'had to: past', color: 'orange' },
        { t: 'text', x: 4, y: 40, text: 'We need to be at the station by nine.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 48, text: 'You needn’t bring food — there’s a café.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 56, text: 'Last time we had to stand all the way.', size: 's', color: 'ink' }
      ],
      next: 'Let and make'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Let and make are followed by an object and the infinitive without to. Let means allow: My parents let me travel alone. Make means force: The guard made us show our tickets. Be careful: we say let me go, not let me to go.',
      easy: 'let + kishi + feʼl (to siz) — ruxsat bermoq: My parents let me travel alone. make + kishi + feʼl (to siz) — majbur qilmoq: The guard made us show our tickets. “let me to go” — xato!',
      draw: [
        { t: 'title', text: 'Let and make' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 12, text: 'let = allow', color: 'green' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'make = force', color: 'red' },
        { t: 'text', x: 4, y: 38, text: 'They let me travel alone.', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 46, text: 'The guard made us show our tickets.', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 56, text: 'no to: let me go (not let me to go)', size: 's', color: 'orange' }
      ],
      next: 'To the exercises'
    }
  ],
  summary: [
    'Travel words: platform, ticket, journey, delay, passenger, timetable.',
    'Phrases with on: on time, on foot, on board, on purpose, on sale, on the way.',
    'need to — necessary; needn’t — not necessary; had to — necessary in the past.',
    'let (allow) and make (force) + object + verb without to.'
  ],
  questions: [
    {
      id: 'e17q1',
      prompt: 'Match the phrases with on to their meanings.',
      hint: 'on foot = walking.',
      explanation: 'on time — at the right time; on foot — walking; on board — on a train or plane; on purpose — deliberately.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'on time' }, right: { label: 'at the right time' } },
            { left: { label: 'on foot' }, right: { label: 'walking' } },
            { left: { label: 'on board' }, right: { label: 'on a train or plane' } },
            { left: { label: 'on purpose' }, right: { label: 'deliberately' } }
          ]
        }
      }
    },
    {
      id: 'e17q2',
      prompt: 'Complete with a phrase with on.',
      hint: 'Not late.',
      explanation: 'The train left on time — there was no delay.',
      widget: { type: 'text_answer', props: { before: 'The train left', after: '— there was no delay.', answer: ['on time'], width: 8 } }
    },
    {
      id: 'e17q3',
      prompt: 'Choose the correct answer.',
      hint: 'It is not necessary.',
      explanation: 'You needn’t print the tickets — you can show them on your phone.',
      widget: { type: 'mcq', props: { prompt: 'You ___ print the tickets — you can show them on your phone.', choices: ['needn’t', 'need to', 'had to', 'must'], answerIndex: 0 } }
    },
    {
      id: 'e17q4',
      prompt: 'Complete about the past.',
      hint: 'Past of have to.',
      explanation: 'Last time the train was full, so we had to stand.',
      widget: { type: 'text_answer', props: { before: 'Last time the train was full, so we', after: 'stand.', answer: ['had to'], width: 7 } }
    },
    {
      id: 'e17q5',
      prompt: 'Complete with let or make.',
      hint: 'allow → let, force → make.',
      explanation: 'My parents let me travel alone. The guard made us show our tickets.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'My parents' }, { blank: 'let' }, { text: 'me travel alone. The guard' }, { blank: 'made' }, { text: 'us show our tickets.' }],
          bank: ['let', 'made', 'allowed', 'forced']
        }
      }
    },
    {
      id: 'e17q6',
      prompt: 'Tap all the correct sentences.',
      hint: 'No to after let / make.',
      explanation: 'Correct: “They let me go.”, “She made him wait.”, “We didn’t need to hurry.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'They let me go.', match: true },
            { id: 'b', text: 'She made him to wait.', match: false },
            { id: 'c', text: 'She made him wait.', match: true },
            { id: 'd', text: 'We didn’t need to hurry.', match: true },
            { id: 'e', text: 'Let me to help you.', match: false }
          ]
        }
      }
    },
    {
      id: 'e17q7',
      prompt: 'True or false?',
      hint: 'Remember the station dialogue.',
      explanation: 'The train was on time; they needn’t print tickets; they will walk to the Registan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'The train had a long delay.', value: false },
            { text: 'They needn’t print their tickets.', value: true },
            { text: 'The journey takes about two hours.', value: true },
            { text: 'They will go to the Registan by taxi.', value: false }
          ]
        }
      }
    },
    {
      id: 'e17q8',
      prompt: 'Put the words in order.',
      hint: 'Start with “My parents”.',
      explanation: 'My parents let me travel alone.',
      widget: { type: 'sentence_order', props: { words: ['My', 'parents', 'let', 'me', 'travel', 'alone.'] } }
    }
  ]
};
