import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G3 } from './eng-cast';

/** Student's Book: Unit 10 “Animals in danger” (pp. 58–61) — nature and wildlife, phrases with at, second conditional. */
export const ENG_14: BoardLesson = {
  n: 14,
  label: '14',
  lang: 'en',
  group: ENG_G3,
  easyLang: 'uz',
  title: 'Animals in danger',
  section: 'Unit 10',
  cast: {
    ...ENG_CAST,
    ranger: { name: 'Ranger Bekzod', emoji: '', color: '#2F855A', azure: '', gender: 'm' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'The class visits a nature reserve in the mountains. A ranger talks about the snow leopard.',
      easy: 'Sinf togʻdagi qoʻriqxonaga bordi. Endangered — yoʻqolib ketish xavfi ostidagi, habitat — yashash joyi, population — soni (aholi), hunting — ovchilik, environment — atrof-muhit, creature — jonzot, at risk — xavf ostida.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🏔️ A nature reserve in the mountains',
        lines: [
          { who: 'ranger', text: 'The snow leopard lives high in our mountains. It is an endangered animal.', uz: 'Qor qoploni togʻlarimizda baland joylarda yashaydi. U yoʻqolib ketish xavfi ostidagi hayvon.' },
          { who: 'malika', text: 'Why is it at risk?', uz: 'Nega u xavf ostida?' },
          { who: 'ranger', text: 'Humans are destroying its habitat, and in the past there was a lot of illegal hunting.', uz: 'Odamlar uning yashash joyini buzmoqda, oʻtmishda esa koʻp noqonuniy ov boʻlgan.' },
          { who: 'timur', text: 'How many snow leopards are there?', uz: 'Qancha qor qoploni bor?' },
          { who: 'ranger', text: 'The population is small, but at present it is growing slowly because we protect the environment here.', uz: 'Ularning soni kam, lekin hozir sekin oʻsmoqda, chunki biz bu yerda tabiatni himoya qilyapmiz.' }
        ],
        words: [
          { en: 'endangered', uz: 'yoʻqolish xavfidagi' },
          { en: 'at risk', uz: 'xavf ostida' },
          { en: 'habitat', uz: 'yashash joyi' },
          { en: 'hunting', uz: 'ovchilik' },
          { en: 'population', uz: 'soni, populyatsiya' },
          { en: 'at present', uz: 'hozirgi paytda' }
        ]
      },
      next: 'Phrases with at'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Phrases with at: at first means at the beginning; at least means not less than; at once means immediately or at the same time; at present means now; at risk means in danger; at long last means finally; and at its best means at the highest level.',
      easy: 'at first — dastlab; at least — kamida; at once — darhol / birdaniga; at present — hozirda; at risk — xavf ostida; at long last — nihoyat; at its best — eng yaxshi holatida.',
      draw: [
        { t: 'title', text: 'Phrases with at' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['phrase', 'meaning'],
            ['at first', 'at the beginning'],
            ['at least', 'not less than'],
            ['at present', 'now'],
            ['at risk', 'in danger'],
            ['at long last', 'finally']
          ]
        }
      ],
      next: 'Now the grammar'
    },
    {
      kind: 'scene',
      say: 'After the trip, Malika and Timur imagine how they could help. Listen to the second conditional.',
      easy: 'Ikkinchi shart gap — hozir yoki kelajakda real boʻlmagan, xayoliy holat: If I had a lot of money, I would buy land for animals. If + past simple, would + feʼl. I/he/she bilan koʻpincha were: If I were a ranger…',
      draw: [],
      scene: {
        style: 'chat',
        place: '🚌 On the way back',
        lines: [
          { who: 'malika', text: 'If I had a lot of money, I would buy land for the snow leopards.', uz: 'Koʻp pulim boʻlsa, qor qoplonlari uchun yer sotib olardim.' },
          { who: 'timur', text: 'If I were a ranger, I would work in the mountains every day.', uz: 'Agar men qoʻriqchi boʻlsam, har kuni togʻda ishlardim.' },
          { who: 'malika', text: 'What would you do if you saw a hunter?', uz: 'Agar ovchini koʻrsang, nima qilarding?' },
          { who: 'timur', text: 'I would call the police at once!', uz: 'Darhol politsiyaga qoʻngʻiroq qilardim!' },
          { who: 'malika', text: 'If more people knew about this, they would help too.', uz: 'Bu haqda koʻproq odam bilsa, ular ham yordam berardi.' }
        ],
        words: [
          { en: 'If I had', uz: 'agar menda … boʻlsa' },
          { en: 'I would buy', uz: 'sotib olardim' },
          { en: 'If I were', uz: 'agar men … boʻlsam' },
          { en: 'What would you do', uz: 'nima qilarding' }
        ]
      },
      next: 'Show me the rule'
    },
    {
      kind: 'card',
      clear: true,
      say: 'The second conditional is for imaginary or unlikely situations in the present or future. If plus past simple, then would plus the infinitive: If I had more time, I would volunteer. With I, he and she we often use were: If I were you, I would… The if-part can come first or second. Use a comma only when if comes first.',
      easy: 'Ikkinchi shart: If + past simple, would + feʼl. Xayoliy holat. If I were you… — maslahat. If gapning boshida kelsa, vergul qoʻyiladi: If I had time, I would help. / I would help if I had time.',
      draw: [
        { t: 'title', text: 'Second conditional' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 12, text: 'If + past simple', color: 'blue' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'would + verb', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'text', x: 4, y: 38, text: 'If I had money, I would buy land.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 46, text: 'If I were you, I would volunteer.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 56, text: 'comma only when if comes first', size: 's', color: 'orange' }
      ],
      next: 'To the exercises'
    }
  ],
  summary: [
    'Nature words: endangered, habitat, environment, population, hunting, creature, rainforest, jungle, landscape, crop.',
    'Phrases with at: at first, at least, at once, at present, at risk, at long last, at its best.',
    'Second conditional — imaginary situations: If + past simple, would + verb.',
    'If I were you, I would… — advice; use a comma when if comes first.'
  ],
  questions: [
    {
      id: 'e14q1',
      prompt: 'Match the words to their meanings.',
      hint: 'Remember the ranger’s talk.',
      explanation: 'endangered — may soon not exist; habitat — natural home of an animal; population — how many live in a place; hunting — chasing and killing animals.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'endangered' }, right: { label: 'may soon not exist' } },
            { left: { label: 'habitat' }, right: { label: 'the natural home of an animal' } },
            { left: { label: 'population' }, right: { label: 'how many live in a place' } },
            { left: { label: 'hunting' }, right: { label: 'chasing and killing animals' } }
          ]
        }
      }
    },
    {
      id: 'e14q2',
      prompt: 'Complete with a phrase with at.',
      hint: 'In danger.',
      explanation: 'The snow leopard is at risk because of hunting.',
      widget: { type: 'text_answer', props: { before: 'The snow leopard is', after: 'because of hunting.', answer: ['at risk'], width: 8 } }
    },
    {
      id: 'e14q3',
      prompt: 'Choose the correct form.',
      hint: 'If + past simple.',
      explanation: 'If I had more time, I would volunteer at the reserve.',
      widget: { type: 'mcq', props: { prompt: 'If I ___ more time, I would volunteer at the reserve.', choices: ['had', 'have', 'would have', 'will have'], answerIndex: 0 } }
    },
    {
      id: 'e14q4',
      prompt: 'Complete the second conditional.',
      hint: 'would + verb in the main part.',
      explanation: 'If more people knew about it, they would help.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'If more people' }, { blank: 'knew' }, { text: 'about it, they' }, { blank: 'would help' }, { text: '.' }],
          bank: ['knew', 'would help', 'know', 'helped']
        }
      }
    },
    {
      id: 'e14q5',
      prompt: 'Tap all the correct sentences.',
      hint: 'If-part: past simple. Main part: would.',
      explanation: 'Correct: “If I were you, I would go.”, “What would you do if you saw a bear?”, “I would help if I could.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'If I were you, I would go.', match: true },
            { id: 'b', text: 'If I would have money, I bought a car.', match: false },
            { id: 'c', text: 'What would you do if you saw a bear?', match: true },
            { id: 'd', text: 'I would help if I could.', match: true },
            { id: 'e', text: 'If she know, she would tell us.', match: false }
          ]
        }
      }
    },
    {
      id: 'e14q6',
      prompt: 'True or false?',
      hint: 'Think about the snow leopard.',
      explanation: 'The snow leopard is endangered; its population is growing slowly at present; Timur would call the police if he saw a hunter.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'The snow leopard is an endangered animal.', value: true },
            { text: 'Its population is very large.', value: false },
            { text: 'At present the population is growing slowly.', value: true },
            { text: 'Timur would call the police if he saw a hunter.', value: true }
          ]
        }
      }
    },
    {
      id: 'e14q7',
      prompt: 'Match the phrases with at to their meanings.',
      hint: 'at long last = finally.',
      explanation: 'at first — at the beginning; at least — not less than; at once — immediately; at long last — finally.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'at first' }, right: { label: 'at the beginning' } },
            { left: { label: 'at least' }, right: { label: 'not less than' } },
            { left: { label: 'at once' }, right: { label: 'immediately' } },
            { left: { label: 'at long last' }, right: { label: 'finally' } }
          ]
        }
      }
    },
    {
      id: 'e14q8',
      prompt: 'Put the words in order.',
      hint: 'Start with “If I were”.',
      explanation: 'If I were a ranger, I would protect animals.',
      widget: { type: 'sentence_order', props: { words: ['If', 'I', 'were', 'a', 'ranger,', 'I', 'would', 'protect', 'animals.'] } }
    }
  ]
};
