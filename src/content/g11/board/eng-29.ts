import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G5 } from './eng-cast';

/** Student's Book: Unit 20 “Making plans” — hopes and dreams, phrasal verbs, verbs with two objects. */
export const ENG_29: BoardLesson = {
  n: 29,
  label: '29',
  lang: 'en',
  group: ENG_G5,
  easyLang: 'uz',
  title: 'Making plans',
  section: 'Unit 20',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'It’s the last month of school. Malika and Timur talk about their hopes and dreams.',
      easy: 'Maktabning soʻnggi oyi. ambition — orzu-maqsad, goal — maqsad, achieve — erishmoq, dream of — orzu qilmoq, hope to — umid qilmoq, career — kasb yoʻli, university — universitet, gap year — taʼlim oraligʻidagi bir yil tanaffus.',
      draw: [],
      scene: {
        style: 'chat',
        place: '🎓 The school garden',
        lines: [
          { who: 'malika', text: 'I can’t believe school is nearly over. What are your plans?', uz: 'Maktab deyarli tugaganiga ishonolmayman. Rejalaring qanday?' },
          { who: 'timur', text: 'My ambition is to become an engineer. I hope to get into university in Tashkent.', uz: 'Mening maqsadim muhandis boʻlish. Toshkentdagi universitetga kirishga umid qilaman.' },
          { who: 'malika', text: 'I dream of studying design. One day I want to set up my own studio.', uz: 'Men dizayn oʻqishni orzu qilaman. Bir kun oʻz studiyamni ochmoqchiman.' },
          { who: 'timur', text: 'You’ll achieve it — you never give up!', uz: 'Erishasan — sen hech qachon taslim boʻlmaysan!' }
        ],
        words: [
          { en: 'ambition', uz: 'maqsad, orzu' },
          { en: 'hope to', uz: 'umid qilmoq' },
          { en: 'dream of', uz: 'orzu qilmoq' },
          { en: 'achieve', uz: 'erishmoq' },
          { en: 'set up', uz: 'tashkil qilmoq, ochmoq' }
        ]
      },
      next: 'Phrasal verbs'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Phrasal verbs for plans: set up means start a business; give up means stop trying; carry on means continue; work out means find a solution; come up with means think of an idea; look into means find out more about.',
      easy: 'set up — (biznes) ochmoq; give up — taslim boʻlmoq; carry on — davom etmoq; work out — yechim topmoq; come up with — (gʻoya) oʻylab topmoq; look into — oʻrganib chiqmoq.',
      draw: [
        { t: 'title', text: 'Phrasal verbs for plans' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['verb', 'meaning'],
            ['set up', 'start a business'],
            ['give up', 'stop trying'],
            ['carry on', 'continue'],
            ['come up with', 'think of an idea'],
            ['look into', 'find out more about']
          ]
        }
      ],
      next: 'Verbs with two objects'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Some verbs have two objects: a person and a thing. Give, send, show, lend, offer, buy, tell. Two patterns: My parents gave me a laptop. Or: My parents gave a laptop to me. With buy and make we use for: She bought a present for her teacher.',
      easy: 'Baʼzi feʼllar ikki toʻldiruvchi oladi — kishi va narsa: give, send, show, lend, offer, buy, tell. Ikki xil: gave me a laptop / gave a laptop to me. buy va make bilan for: bought a present for her teacher.',
      draw: [
        { t: 'title', text: 'Verbs with two objects' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 12, text: 'verb + person + thing', color: 'blue' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'verb + thing + to / for', color: 'green' },
        { t: 'text', x: 4, y: 38, text: 'They gave me a laptop.', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 46, text: 'They gave a laptop to me.', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 54, text: 'She bought a present for her teacher.', size: 's', color: 'green' }
      ],
      next: 'Graduation day'
    },
    {
      kind: 'scene',
      say: 'On graduation day, Malika and Timur say goodbye to Mr Collins.',
      easy: 'Bitiruv kuni Malika va Timur Mr Collins bilan xayrlashadi. Ikki toʻldiruvchili feʼllarga eʼtibor bering.',
      draw: [],
      scene: {
        style: 'chat',
        place: '🎓 Graduation day',
        lines: [
          { who: 'malika', text: 'Mr Collins, we bought a present for you. Thank you for everything!', uz: 'Mr Collins, siz uchun sovgʻa oldik. Hamma narsa uchun rahmat!' },
          { who: 'narrator', text: 'How kind! Promise to send me a message from university.', uz: 'Qanday yoqimli! Universitetdan menga xabar yuborishga vaʼda beringlar.' },
          { who: 'timur', text: 'We will. You taught us so much English!', uz: 'Albatta. Siz bizga juda koʻp ingliz tili oʻrgatdingiz!' },
          { who: 'narrator', text: 'Carry on reading in English, and never give up on your dreams.', uz: 'Inglizcha oʻqishni davom ettiringlar va orzularingizdan hech qachon voz kechmanglar.' }
        ],
        words: [
          { en: 'bought a present for you', uz: 'siz uchun sovgʻa oldik' },
          { en: 'send me a message', uz: 'menga xabar yuboring' },
          { en: 'taught us', uz: 'bizga oʻrgatdingiz' },
          { en: 'give up on', uz: 'voz kechmoq' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Hopes and dreams: ambition, goal, achieve, dream of, hope to, career, gap year.',
    'Phrasal verbs: set up, give up, carry on, work out, come up with, look into.',
    'Two objects: give me a laptop / give a laptop to me; buy something for someone.'
  ],
  questions: [
    {
      id: 'e29q1',
      prompt: 'Match the phrasal verbs to their meanings.',
      hint: 'carry on = continue.',
      explanation: 'set up — start a business; give up — stop trying; carry on — continue; come up with — think of an idea.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'set up' }, right: { label: 'start a business' } },
            { left: { label: 'give up' }, right: { label: 'stop trying' } },
            { left: { label: 'carry on' }, right: { label: 'continue' } },
            { left: { label: 'come up with' }, right: { label: 'think of an idea' } }
          ]
        }
      }
    },
    {
      id: 'e29q2',
      prompt: 'Complete with a phrasal verb.',
      hint: 'Open your own studio.',
      explanation: 'One day I want to set up my own studio.',
      widget: { type: 'text_answer', props: { before: 'One day I want to', after: 'my own studio.', answer: ['set up'], width: 7 } }
    },
    {
      id: 'e29q3',
      prompt: 'Choose the correct sentence.',
      hint: 'give + person + thing, or give + thing + to + person.',
      explanation: '“My parents gave me a laptop.” is correct.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['My parents gave me a laptop.', 'My parents gave to me a laptop.', 'My parents gave a laptop me.', 'My parents gave for me a laptop.'], answerIndex: 0 } }
    },
    {
      id: 'e29q4',
      prompt: 'Complete with to or for.',
      hint: 'buy → for; send → to.',
      explanation: 'We bought a present for Mr Collins. I’ll send a message to him.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'We bought a present' }, { blank: 'for' }, { text: 'Mr Collins. I’ll send a message' }, { blank: 'to' }, { text: 'him.' }],
          bank: ['for', 'to']
        }
      }
    },
    {
      id: 'e29q5',
      prompt: 'Tap all the correct sentences.',
      hint: 'Check the word order.',
      explanation: 'Correct: “Can you lend me your pen?”, “She showed the photos to us.”, “He told us a story.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Can you lend me your pen?', match: true },
            { id: 'b', text: 'She showed the photos to us.', match: true },
            { id: 'c', text: 'He told to us a story.', match: false },
            { id: 'd', text: 'He told us a story.', match: true },
            { id: 'e', text: 'I bought to my mum flowers.', match: false }
          ]
        }
      }
    },
    {
      id: 'e29q6',
      prompt: 'True or false?',
      hint: 'Remember their plans.',
      explanation: 'Timur wants to be an engineer; Malika dreams of studying design; they bought a present for Mr Collins.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Timur’s ambition is to become an engineer.', value: true },
            { text: 'Malika wants to work in a bank.', value: false },
            { text: 'They bought a present for Mr Collins.', value: true },
            { text: 'Mr Collins told them to give up English.', value: false }
          ]
        }
      }
    },
    {
      id: 'e29q7',
      prompt: 'Match the words to their meanings.',
      hint: 'achieve = succeed in doing.',
      explanation: 'ambition — a strong wish for the future; achieve — succeed in doing; career — the jobs you do in your life; gap year — a year off between school and university.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'ambition' }, right: { label: 'a strong wish for the future' } },
            { left: { label: 'achieve' }, right: { label: 'succeed in doing' } },
            { left: { label: 'career' }, right: { label: 'the jobs you do in your life' } },
            { left: { label: 'gap year' }, right: { label: 'a year off before university' } }
          ]
        }
      }
    },
    {
      id: 'e29q8',
      prompt: 'Put the words in order.',
      hint: 'Start with “I hope”.',
      explanation: 'I hope to get into university.',
      widget: { type: 'sentence_order', props: { words: ['I', 'hope', 'to', 'get', 'into', 'university.'] } }
    }
  ]
};
