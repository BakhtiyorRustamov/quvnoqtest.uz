import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G2 } from './eng-cast';

/** Student's Book: Unit 5 “You made it!” (pp. 32–35) — verbs for making things, time adverbs, past simple and past continuous. */
export const ENG_7: BoardLesson = {
  n: 7,
  label: '7',
  lang: 'en',
  group: ENG_G2,
  easyLang: 'uz',
  title: 'You made it!',
  section: 'Unit 5',
  cast: {
    ...ENG_CAST,
    aunt: { name: 'Aunt Nodira', emoji: '', color: '#B83280', azure: '', gender: 'f' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Malika’s aunt Nodira has a small business. She makes bags from old clothes. Malika visits her workshop.',
      easy: 'Nodira opa eski kiyimlardan sumka tikadi. Design — loyihalamoq (chizmasini chizmoq), sew — tikmoq, recycle — qayta ishlamoq, decorate — bezamoq, customise — buyurtmachiga moslashtirmoq, fix/mend — tuzatmoq.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🧵 Aunt Nodira’s workshop',
        lines: [
          { who: 'malika', text: 'Wow, these bags are amazing! Did you make them all?', uz: 'Voy, bu sumkalar ajoyib! Hammasini siz qildingizmi?' },
          { who: 'aunt', text: 'Yes. First I design each bag on paper, then I sew it from old jeans.', uz: 'Ha. Avval har bir sumkani qogʻozda loyihalayman, keyin eski jinsidan tikaman.' },
          { who: 'malika', text: 'So you recycle old clothes!', uz: 'Demak, eski kiyimlarni qayta ishlaysiz!' },
          { who: 'aunt', text: 'Exactly. I decorate them with buttons, and I can customise a bag with your name.', uz: 'Aynan. Ularni tugmalar bilan bezayman, xohlasangiz sumkaga ismingizni yozib beraman.' },
          { who: 'aunt', text: 'And if a bag breaks, I mend it for free.', uz: 'Sumka yirtilsa, bepul tuzatib beraman.' }
        ],
        words: [
          { en: 'design', uz: 'loyihalamoq' },
          { en: 'sew', uz: 'tikmoq' },
          { en: 'recycle', uz: 'qayta ishlamoq' },
          { en: 'decorate', uz: 'bezamoq' },
          { en: 'customise', uz: 'moslashtirmoq' },
          { en: 'mend', uz: 'tuzatmoq' }
        ]
      },
      next: 'More making verbs'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Verbs for making things: create — make something new; design — plan it before making; sew — join cloth with a needle; decorate — make it look nicer; customise — change it for one person; fix and mend — repair; rebuild — build again; recycle — use old things again.',
      easy: 'create — yaratmoq, design — loyihalamoq, sew — tikmoq, decorate — bezamoq, customise — moslashtirmoq, fix / mend — tuzatmoq, rebuild — qayta qurmoq, recycle — qayta ishlamoq.',
      draw: [
        { t: 'title', text: 'Verbs for making things' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['verb', 'meaning'],
            ['design', 'plan before making'],
            ['sew', 'join cloth with a needle'],
            ['customise', 'change it for one person'],
            ['fix / mend', 'repair'],
            ['recycle', 'use old things again']
          ]
        }
      ],
      next: 'Now the grammar'
    },
    {
      kind: 'scene',
      say: 'Aunt Nodira tells Malika how her business started. Listen for two past tenses.',
      easy: 'Past continuous (was/were + -ing) — oʻtmishda davom etib turgan ish: I was working in an office. Past simple — shu payt sodir boʻlgan qisqa ish: when a friend asked me… When — qisqa ishdan oldin, while — uzoq ishdan oldin.',
      draw: [],
      scene: {
        style: 'chat',
        place: '☕ Tea break in the workshop',
        lines: [
          { who: 'malika', text: 'How did you start your business?', uz: 'Biznesingizni qanday boshlagansiz?' },
          { who: 'aunt', text: 'Five years ago I was working in an office. I was sewing bags just as a hobby.', uz: 'Besh yil oldin ofisda ishlardim. Sumka tikish shunchaki sevimli mashgʻulotim edi.' },
          { who: 'aunt', text: 'One day, while I was waiting for the bus, a woman asked about my bag.', uz: 'Bir kuni avtobus kutayotganimda bir ayol sumkam haqida soʻradi.' },
          { who: 'aunt', text: 'She ordered three bags immediately! Afterwards, more people called me.', uz: 'U darhol uchta sumka buyurtma qildi! Keyin boshqalar ham qoʻngʻiroq qila boshladi.' },
          { who: 'aunt', text: 'Eventually I left the office and opened this workshop.', uz: 'Oxir-oqibat ofisdan ketib, shu ustaxonani ochdim.' }
        ],
        words: [
          { en: 'was working', uz: 'ishlayotgan edim' },
          { en: 'while', uz: '…ayotganda' },
          { en: 'immediately', uz: 'darhol' },
          { en: 'afterwards', uz: 'keyin' },
          { en: 'eventually', uz: 'oxir-oqibat' }
        ]
      },
      next: 'Show me the rule'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Use the past continuous, was or were plus -ing, for a longer action in progress in the past: I was waiting for the bus. Use the past simple for a short action that interrupted it: a woman asked about my bag. Use while before the longer action and when before the shorter one. Time adverbs help to tell a story: at first, immediately, afterwards, meanwhile, eventually.',
      easy: 'Past continuous (was/were + -ing) — uzoq davom etgan ish; past simple — uni boʻlgan qisqa ish. While + uzoq ish; when + qisqa ish. Vaqt ravishlari: at first — dastlab, immediately — darhol, afterwards — soʻng, meanwhile — shu orada, eventually — oxir-oqibat.',
      draw: [
        { t: 'title', text: 'Past continuous + past simple' },
        { t: 'box', id: 'l', x: 4, y: 15, w: 60, h: 11, text: 'I was waiting for the bus…', color: 'blue' },
        { t: 'box', id: 's', x: 68, y: 15, w: 28, h: 11, text: '…she asked', color: 'orange' },
        { t: 'arrow', from: 'l', to: 's' },
        { t: 'text', x: 4, y: 38, text: 'while + long action · when + short action', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 48, text: 'at first → immediately → afterwards → eventually', size: 's', color: 'green' }
      ],
      next: 'Writing a story'
    },
    {
      kind: 'scene',
      say: 'Malika wants to write a story for the school magazine. Mr Collins explains what a good story needs.',
      easy: 'Yaxshi hikoya: qiziqarli boshlanish, voqealar tartib bilan, past simple va past continuous, vaqt ravishlari (at first, afterwards, eventually) va yaxshi yakun.',
      draw: [],
      scene: {
        style: 'interview',
        place: 'English club · writing a story',
        lines: [
          { who: 'narrator', text: 'A good story needs an interesting start. Set the scene: where were you, what were you doing?', uz: 'Yaxshi hikoyaga qiziqarli boshlanish kerak. Sahnani tasvirla: qayerda eding, nima qilayotgan eding?' },
          { who: 'malika', text: 'It was raining, and I was walking home from school…', uz: 'Yomgʻir yogʻayotgan edi, men maktabdan uyga qaytayotgan edim…' },
          { who: 'narrator', text: 'Perfect — past continuous for the background. Then the main events in the past simple.', uz: 'Zoʻr — fon uchun past continuous. Keyin asosiy voqealar past simple bilan.' },
          { who: 'malika', text: 'And time adverbs: at first, immediately, eventually.', uz: 'Va vaqt ravishlari: at first, immediately, eventually.' },
          { who: 'narrator', text: 'Yes, and finish with a strong ending. How did you feel?', uz: 'Ha, va kuchli yakun bilan tugat. Oʻzingni qanday his qilding?' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Making verbs: create, design, sew, decorate, customise, fix, mend, rebuild, recycle.',
    'Past continuous (was/were + -ing) — a longer action in the past: I was waiting for the bus.',
    'Past simple — a short action that interrupts it: …when a woman asked about my bag.',
    'while + long action, when + short action; time adverbs: at first, immediately, afterwards, meanwhile, eventually.',
    'A story: set the scene → events in order → a strong ending.'
  ],
  questions: [
    {
      id: 'e7q1',
      prompt: 'Match the verbs to their meanings.',
      hint: 'Remember Aunt Nodira’s workshop.',
      explanation: 'design — plan before making; sew — join cloth with a needle; mend — repair; recycle — use old things again.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'design' }, right: { label: 'plan before making' } },
            { left: { label: 'sew' }, right: { label: 'join cloth with a needle' } },
            { left: { label: 'mend' }, right: { label: 'repair' } },
            { left: { label: 'recycle' }, right: { label: 'use old things again' } }
          ]
        }
      }
    },
    {
      id: 'e7q2',
      prompt: 'Complete the sentence.',
      hint: 'A longer action in progress: was + -ing.',
      explanation: 'While I was waiting for the bus, a woman asked about my bag.',
      widget: { type: 'text_answer', props: { before: 'While I', after: 'for the bus, a woman asked about my bag.', answer: ['was waiting'], width: 11 } }
    },
    {
      id: 'e7q3',
      prompt: 'Choose the correct forms.',
      hint: 'Long action → past continuous; short action → past simple.',
      explanation: 'I was sewing a bag when the phone rang.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'I' }, { blank: 'was sewing' }, { text: 'a bag when the phone' }, { blank: 'rang' }, { text: '.' }],
          bank: ['was sewing', 'rang', 'sewed', 'was ringing']
        }
      }
    },
    {
      id: 'e7q4',
      prompt: 'Put the time adverbs in story order.',
      hint: 'Start with the beginning, end with the end.',
      explanation: 'at first → immediately → afterwards → eventually',
      widget: { type: 'step_order', props: { steps: ['at first', 'immediately', 'afterwards', 'eventually'] } }
    },
    {
      id: 'e7q5',
      prompt: 'True or false?',
      hint: 'How did Aunt Nodira’s business start?',
      explanation: 'She used to work in an office; a woman at the bus stop ordered three bags; she makes bags from old jeans.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Aunt Nodira was working in an office five years ago.', value: true },
            { text: 'A woman at the bus stop ordered three bags.', value: true },
            { text: 'She makes bags from new leather.', value: false },
            { text: 'She mends broken bags for free.', value: true }
          ]
        }
      }
    },
    {
      id: 'e7q6',
      prompt: 'Tap all the correct sentences.',
      hint: 'was/were + -ing for the long action.',
      explanation: 'Correct: “They were playing when it started to rain.”, “While she was cooking, I set the table.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'They were playing when it started to rain.', match: true },
            { id: 'b', text: 'While she cooking, I set the table.', match: false },
            { id: 'c', text: 'While she was cooking, I set the table.', match: true },
            { id: 'd', text: 'I was see him yesterday.', match: false }
          ]
        }
      }
    },
    {
      id: 'e7q7',
      prompt: 'Which verb means “change something for one person”?',
      hint: 'You can add your name to the bag.',
      explanation: 'customise — change something to make it suitable for a particular person.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['customise', 'rebuild', 'recycle', 'sew'], answerIndex: 0 } }
    },
    {
      id: 'e7q8',
      prompt: 'Put the words in order.',
      hint: 'Start with “It was raining”.',
      explanation: 'It was raining and I was walking home.',
      widget: { type: 'sentence_order', props: { words: ['It', 'was', 'raining', 'and', 'I', 'was', 'walking', 'home.'] } }
    }
  ]
};
