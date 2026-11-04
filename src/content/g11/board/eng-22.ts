import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G4 } from './eng-cast';

/** Student's Book: Unit 15 “City or country?” — the artificial and natural world, phrasal verbs, articles. */
export const ENG_22: BoardLesson = {
  n: 22,
  label: '22',
  lang: 'en',
  group: ENG_G4,
  easyLang: 'uz',
  title: 'City or country?',
  section: 'Unit 15',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Malika has grown up in Tashkent. Timur’s grandparents live in a village near Chimgan. They argue about where life is better.',
      easy: 'Shahar yoki qishloq? skyscraper — osmonoʻpar, traffic jam — tirbandlik, pollution — ifloslanish, field — dala, stream — soy, valley — vodiy, peaceful — osoyishta, crowded — gavjum.',
      draw: [],
      scene: {
        style: 'chat',
        place: '🌆 A park in Tashkent',
        lines: [
          { who: 'malika', text: 'I love the city — the metro, the cafés, the shopping centres.', uz: 'Men shaharni yaxshi koʻraman — metro, kafelar, savdo markazlari.' },
          { who: 'timur', text: 'But the traffic jams and the pollution! My grandparents’ village is so peaceful.', uz: 'Lekin tirbandlik va ifloslanish-chi! Buvamlarning qishlogʻi juda osoyishta.' },
          { who: 'malika', text: 'What is there to do in the village?', uz: 'Qishloqda nima qilsa boʻladi?' },
          { who: 'timur', text: 'You can walk through the fields, swim in a mountain stream, and look at the stars.', uz: 'Dalalar boʻylab yurish, togʻ soyida choʻmilish va yulduzlarni tomosha qilish mumkin.' },
          { who: 'malika', text: 'Sounds nice, but I’d miss my friends. The city is never boring.', uz: 'Yaxshi eshitiladi, lekin doʻstlarimni sogʻinardim. Shahar hech qachon zerikarli emas.' }
        ],
        words: [
          { en: 'traffic jam', uz: 'tirbandlik' },
          { en: 'pollution', uz: 'ifloslanish' },
          { en: 'peaceful', uz: 'osoyishta' },
          { en: 'field', uz: 'dala' },
          { en: 'stream', uz: 'soy' }
        ]
      },
      next: 'Phrasal verbs'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Phrasal verbs about places and life: grow up means become an adult; move out means leave your home; get around means travel from place to place; slow down means become less fast; settle down means start a calm life in one place; look forward to means wait with pleasure.',
      easy: 'grow up — ulgʻaymoq; move out — uydan koʻchib chiqmoq; get around — u yoqdan bu yoqqa yurmoq; slow down — sekinlashmoq; settle down — bir joyda tinch hayot boshlamoq; look forward to — intiqlik bilan kutmoq.',
      draw: [
        { t: 'title', text: 'Phrasal verbs' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['verb', 'meaning'],
            ['grow up', 'become an adult'],
            ['move out', 'leave your home'],
            ['get around', 'travel from place to place'],
            ['slow down', 'become less fast'],
            ['settle down', 'start a calm life']
          ]
        }
      ],
      next: 'Articles'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Articles. Use a or an for one thing mentioned for the first time: I saw a village. Use the for something already known or the only one: The village was beautiful. The sun, the moon. Use no article for general plurals and uncountable nouns: Cities are noisy. Pollution is a problem.',
      easy: 'a / an — birinchi marta tilga olingan bitta narsa: a village. the — maʼlum yoki yagona narsa: the village, the sun. Artiklsiz — umumiy maʼnodagi koʻplik va sanalmaydigan otlar: Cities are noisy. Pollution is a problem.',
      draw: [
        { t: 'title', text: 'a / an, the, no article' },
        { t: 'box', id: 'a', x: 2, y: 15, w: 30, h: 12, text: 'a / an: first time', color: 'blue' },
        { t: 'box', id: 'b', x: 35, y: 15, w: 30, h: 12, text: 'the: known, only', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 15, w: 30, h: 12, text: '— : in general', color: 'purple' },
        { t: 'text', x: 4, y: 38, text: 'I saw a village. The village was old.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 46, text: 'The sun is shining over the valley.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 54, text: 'Cities are noisy. Pollution is bad.', size: 's', color: 'ink' }
      ],
      next: 'Malika visits'
    },
    {
      kind: 'scene',
      say: 'A month later, Malika visits the village. Notice the articles and phrasal verbs.',
      easy: 'Bir oydan soʻng Malika qishloqqa bordi. Artikllar va frazali feʼllarga eʼtibor bering.',
      draw: [],
      scene: {
        style: 'chat',
        place: '🏞️ A village near Chimgan',
        lines: [
          { who: 'malika', text: 'There’s a river near the house. The river is so clean!', uz: 'Uy yonida daryo bor. Daryo juda toza!' },
          { who: 'timur', text: 'Life slows down here. Nobody is in a hurry.', uz: 'Bu yerda hayot sekinlashadi. Hech kim shoshmaydi.' },
          { who: 'malika', text: 'I can see why your grandparents settled down here.', uz: 'Buvangizlar nega bu yerda yashab qolganini tushunaman.' },
          { who: 'timur', text: 'And I’m looking forward to the plov tonight!', uz: 'Men esa bugun kechki oshni intiqlik bilan kutyapman!' }
        ],
        words: [
          { en: 'a river … the river', uz: 'bir daryo … shu daryo' },
          { en: 'slows down', uz: 'sekinlashadi' },
          { en: 'settled down', uz: 'oʻrnashib qoldi' },
          { en: 'looking forward to', uz: 'intiqlik bilan kutyapman' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'City words: skyscraper, traffic jam, pollution, crowded. Country words: field, stream, valley, peaceful.',
    'Phrasal verbs: grow up, move out, get around, slow down, settle down, look forward to.',
    'a / an — first mention; the — known or only one; no article — general plurals and uncountables.'
  ],
  questions: [
    {
      id: 'e22q1',
      prompt: 'Sort the words.',
      hint: 'Made by people or by nature?',
      explanation: 'City: skyscraper, traffic jam, shopping centre. Country: field, stream, valley.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'c', label: 'city' }, { id: 'n', label: 'country' }],
          tiles: [
            { id: 'a', label: 'skyscraper', bin: 'c' },
            { id: 'b', label: 'traffic jam', bin: 'c' },
            { id: 'c', label: 'shopping centre', bin: 'c' },
            { id: 'd', label: 'field', bin: 'n' },
            { id: 'e', label: 'stream', bin: 'n' },
            { id: 'f', label: 'valley', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'e22q2',
      prompt: 'Match the phrasal verbs to their meanings.',
      hint: 'grow up = become an adult.',
      explanation: 'grow up — become an adult; move out — leave your home; slow down — become less fast; settle down — start a calm life.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'grow up' }, right: { label: 'become an adult' } },
            { left: { label: 'move out' }, right: { label: 'leave your home' } },
            { left: { label: 'slow down' }, right: { label: 'become less fast' } },
            { left: { label: 'settle down' }, right: { label: 'start a calm life' } }
          ]
        }
      }
    },
    {
      id: 'e22q3',
      prompt: 'Complete with a phrasal verb.',
      hint: 'Wait with pleasure.',
      explanation: 'I’m looking forward to the holidays.',
      widget: { type: 'text_answer', props: { before: 'I’m looking', after: 'the holidays.', answer: ['forward to'], width: 10 } }
    },
    {
      id: 'e22q4',
      prompt: 'Complete with a, an or the.',
      hint: 'First mention → a; second mention → the.',
      explanation: 'There’s a river near the house. The river is very clean.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'There’s' }, { blank: 'a' }, { text: 'river near the house.' }, { blank: 'The' }, { text: 'river is very clean.' }],
          bank: ['a', 'The', 'an', 'A']
        }
      }
    },
    {
      id: 'e22q5',
      prompt: 'Choose the correct sentence.',
      hint: 'General statement, uncountable noun.',
      explanation: '“Pollution is a big problem in cities.” — no article before pollution in general.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Pollution is a big problem in cities.', 'The pollution is a big problem in the cities.', 'A pollution is big problem in cities.', 'Pollution is the big problem in a cities.'], answerIndex: 0 } }
    },
    {
      id: 'e22q6',
      prompt: 'True or false?',
      hint: 'Remember both dialogues.',
      explanation: 'Malika loves the city; the village is near Chimgan; Timur is looking forward to plov.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Malika prefers the city.', value: true },
            { text: 'Timur’s grandparents live in Tashkent.', value: false },
            { text: 'The river near the house is clean.', value: true },
            { text: 'Life is faster in the village.', value: false }
          ]
        }
      }
    },
    {
      id: 'e22q7',
      prompt: 'Which word is the odd one out?',
      hint: 'Three are positive about the country.',
      explanation: 'Peaceful, quiet and clean describe the village; crowded describes the city.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'peaceful' }, { text: 'quiet' }, { text: 'clean' }, { text: 'crowded', odd: true }] } }
    },
    {
      id: 'e22q8',
      prompt: 'Put the words in order.',
      hint: 'Start with “I grew”.',
      explanation: 'I grew up in a big city.',
      widget: { type: 'sentence_order', props: { words: ['I', 'grew', 'up', 'in', 'a', 'big', 'city.'] } }
    }
  ]
};
