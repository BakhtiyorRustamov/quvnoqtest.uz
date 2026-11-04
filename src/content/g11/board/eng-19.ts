import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G4 } from './eng-cast';

/** Student's Book: Unit 13 “#NoFilter” — social media vocabulary, phrases with in, the passive and modal passives. */
export const ENG_19: BoardLesson = {
  n: 19,
  label: '19',
  lang: 'en',
  group: ENG_G4,
  easyLang: 'uz',
  title: '#NoFilter',
  section: 'Unit 13',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Malika shows Timur a photo she wants to post. Listen for social media words.',
      easy: 'Malika ijtimoiy tarmoqqa rasm joylamoqchi. post — joylamoq / post, share — ulashmoq, follower — obunachi, comment — izoh, like — layk, filter — filtr, profile — profil, upload — yuklamoq.',
      draw: [],
      scene: {
        style: 'chat',
        place: '📱 In the school canteen',
        lines: [
          { who: 'malika', text: 'Look at this photo of the sunset. Should I use a filter before I post it?', uz: 'Bu quyosh botishi rasmiga qara. Joylashdan oldin filtr ishlataymi?' },
          { who: 'timur', text: 'No filter! It looks great as it is.', uz: 'Filtrsiz! U shundoq ham ajoyib.' },
          { who: 'malika', text: 'My last photo was liked by two hundred people.', uz: 'Oxirgi rasmimni ikki yuz kishi layk qildi.' },
          { who: 'timur', text: 'Be careful — photos can be shared by anyone, even strangers.', uz: 'Ehtiyot boʻl — rasmlarni har kim, hatto notanish odamlar ham ulashishi mumkin.' },
          { who: 'malika', text: 'You’re right. My profile is private, so only my followers can see it.', uz: 'Haqsan. Profilim yopiq, shuning uchun uni faqat obunachilarim koʻra oladi.' }
        ],
        words: [
          { en: 'post', uz: 'joylamoq' },
          { en: 'share', uz: 'ulashmoq' },
          { en: 'follower', uz: 'obunachi' },
          { en: 'profile', uz: 'profil' },
          { en: 'stranger', uz: 'notanish odam' }
        ]
      },
      next: 'Phrases with in'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Phrases with in: in public means where everyone can see; in private means secretly or alone; in touch means in contact; in fact means actually; in danger means at risk; in common means shared by two people.',
      easy: 'in public — hammaning oldida; in private — yolgʻiz, maxfiy; in touch — aloqada; in fact — aslida; in danger — xavf ostida; in common — umumiy.',
      draw: [
        { t: 'title', text: 'Phrases with in' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['phrase', 'meaning'],
            ['in public', 'where everyone can see'],
            ['in private', 'alone, secretly'],
            ['in touch', 'in contact'],
            ['in fact', 'actually'],
            ['in common', 'shared by both']
          ]
        }
      ],
      next: 'Now the grammar'
    },
    {
      kind: 'card',
      clear: true,
      say: 'The passive is be plus the past participle. We use it when the action is more important than who does it. Present: Millions of photos are uploaded every day. Past: The photo was liked by two hundred people. Use by to say who did the action.',
      easy: 'Majhul nisbat: be + V3. Harakat bajaruvchidan muhimroq boʻlganda. Present: Photos are uploaded every day. Past: The photo was liked by 200 people. Kim bajargani — by bilan.',
      draw: [
        { t: 'title', text: 'The passive: be + V3' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 12, text: 'am / is / are + V3', color: 'blue' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'was / were + V3', color: 'purple' },
        { t: 'text', x: 4, y: 38, text: 'Photos are uploaded every second.', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 46, text: 'The video was watched by millions.', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 56, text: 'by + person who did it', size: 's', color: 'orange' }
      ],
      next: 'Modal passives'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Modal passives are a modal verb plus be plus the past participle: can be shared, must be protected, should be checked, might be seen. Your password must be kept secret. Information online should be checked carefully.',
      easy: 'Modal majhul: modal feʼl + be + V3. can be shared — ulashilishi mumkin; must be protected — himoya qilinishi shart; should be checked — tekshirilishi kerak.',
      draw: [
        { t: 'title', text: 'Modal + be + V3' },
        { t: 'box', id: 'a', x: 20, y: 15, w: 60, h: 12, text: 'can / must / should + be + V3', color: 'green' },
        { t: 'text', x: 4, y: 38, text: 'Photos can be shared by anyone.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 46, text: 'Your password must be kept secret.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 54, text: 'News should be checked carefully.', size: 's', color: 'ink' }
      ],
      next: 'To the exercises'
    }
  ],
  summary: [
    'Social media words: post, share, upload, follower, comment, profile, filter.',
    'Phrases with in: in public, in private, in touch, in fact, in danger, in common.',
    'The passive: be + past participle — Photos are uploaded / The video was watched.',
    'Modal passives: can / must / should + be + past participle.'
  ],
  questions: [
    {
      id: 'e19q1',
      prompt: 'Match the words to their meanings.',
      hint: 'A follower follows you.',
      explanation: 'upload — put a file online; follower — a person who sees your posts; comment — a short written reply; stranger — a person you don’t know.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'upload' }, right: { label: 'put a file online' } },
            { left: { label: 'follower' }, right: { label: 'a person who sees your posts' } },
            { left: { label: 'comment' }, right: { label: 'a short written reply' } },
            { left: { label: 'stranger' }, right: { label: 'a person you don’t know' } }
          ]
        }
      }
    },
    {
      id: 'e19q2',
      prompt: 'Complete with a phrase with in.',
      hint: 'We still write to each other.',
      explanation: 'We moved to different cities, but we keep in touch online.',
      widget: { type: 'text_answer', props: { before: 'We moved to different cities, but we keep', after: 'online.', answer: ['in touch'], width: 8 } }
    },
    {
      id: 'e19q3',
      prompt: 'Choose the passive form.',
      hint: 'Past passive: was / were + V3.',
      explanation: 'The video was watched by two million people.',
      widget: { type: 'mcq', props: { prompt: 'The video ___ by two million people.', choices: ['was watched', 'watched', 'is watching', 'has watch'], answerIndex: 0 } }
    },
    {
      id: 'e19q4',
      prompt: 'Complete with the present passive.',
      hint: 'are + V3 of upload.',
      explanation: 'Millions of photos are uploaded every day.',
      widget: { type: 'text_answer', props: { before: 'Millions of photos', after: 'every day.', answer: ['are uploaded'], width: 11 } }
    },
    {
      id: 'e19q5',
      prompt: 'Complete the modal passives.',
      hint: 'modal + be + V3.',
      explanation: 'Your password must be kept secret. Photos can be shared by anyone.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Your password must' }, { blank: 'be kept' }, { text: 'secret. Photos can' }, { blank: 'be shared' }, { text: 'by anyone.' }],
          bank: ['be kept', 'be shared', 'keep', 'shared']
        }
      }
    },
    {
      id: 'e19q6',
      prompt: 'Tap all the correct passive sentences.',
      hint: 'Look for be + V3.',
      explanation: 'Correct: “The post was deleted.”, “Comments should be checked.”, “The app is used by teenagers.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'The post was deleted.', match: true },
            { id: 'b', text: 'Comments should be checked.', match: true },
            { id: 'c', text: 'The photo was took by Malika.', match: false },
            { id: 'd', text: 'The app is used by teenagers.', match: true },
            { id: 'e', text: 'News must checked.', match: false }
          ]
        }
      }
    },
    {
      id: 'e19q7',
      prompt: 'True or false?',
      hint: 'Remember the canteen dialogue.',
      explanation: 'Timur said “No filter!”; Malika’s profile is private; her last photo got 200 likes.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Timur wanted Malika to use a filter.', value: false },
            { text: 'Malika’s profile is private.', value: true },
            { text: 'Her last photo was liked by 200 people.', value: true },
            { text: 'Only strangers can see her photos.', value: false }
          ]
        }
      }
    },
    {
      id: 'e19q8',
      prompt: 'Put the words in order.',
      hint: 'Start with “Information”.',
      explanation: 'Information online should be checked carefully.',
      widget: { type: 'sentence_order', props: { words: ['Information', 'online', 'should', 'be', 'checked', 'carefully.'] } }
    }
  ]
};
