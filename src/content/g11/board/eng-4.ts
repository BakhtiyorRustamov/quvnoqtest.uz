import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G1 } from './eng-cast';

/** Student's Book: Unit 3 “Fun and games” (pp. 20–23) — sports phrases, suffixes -ist/-er/-or, present simple and continuous. */
export const ENG_4: BoardLesson = {
  n: 4,
  label: '4',
  lang: 'en',
  group: ENG_G1,
  easyLang: 'uz',
  title: 'Fun and games',
  section: 'Unit 3',
  cast: {
    ...ENG_CAST,
    coach: { name: 'Coach Rustam', emoji: '', color: '#C05621', azure: '', gender: 'm' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Timur’s football team has a big match on Saturday. Listen to Timur and his coach.',
      easy: 'Timurning futbol jamoasi shanba kuni katta oʻyin oʻynaydi. Murabbiy jamoani turnirga yozdirgan. Beat the other team — raqibni yengmoq, score a goal — gol urmoq, win a medal — medal yutmoq, lose a match — oʻyinda yutqazmoq.',
      draw: [],
      scene: {
        style: 'stage',
        place: '⚽ The school football pitch',
        lines: [
          { who: 'coach', text: 'Good news, Timur! I’ve entered our team in the city tournament.', uz: 'Yaxshi xabar, Timur! Jamoamizni shahar turniriga yozdirdim.' },
          { who: 'timur', text: 'Great! Do you think we can beat the other teams?', uz: 'Zoʻr! Sizningcha, boshqa jamoalarni yenga olamizmi?' },
          { who: 'coach', text: 'If we train hard, yes. You’re our best player — try to score a goal in every match.', uz: 'Qattiq mashq qilsak, ha. Sen eng yaxshi oʻyinchimizsan — har oʻyinda gol urishga harakat qil.' },
          { who: 'timur', text: 'And if we lose a match?', uz: 'Agar bitta oʻyinda yutqazsak-chi?' },
          { who: 'coach', text: 'Then we learn from it. Winning a medal isn’t everything. Don’t miss this opportunity to have fun!', uz: 'Unda undan saboq olamiz. Medal yutish hammasi emas. Bu imkoniyatni boy berma — maza qil!' }
        ],
        words: [
          { en: 'entered', uz: 'yozdirdi (musobaqaga)' },
          { en: 'beat', uz: 'yengmoq' },
          { en: 'score a goal', uz: 'gol urmoq' },
          { en: 'lose a match', uz: 'oʻyinda yutqazmoq' },
          { en: 'miss this opportunity', uz: 'imkoniyatni boy bermoq' }
        ]
      },
      next: 'Who takes part in sport?'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Many words for people in sport end in -er, -or or -ist. Someone who runs is a runner. Someone who swims is a swimmer. Someone who sails is a sailor. Someone who competes is a competitor. And a person in a canoe is a canoeist. People who watch are spectators.',
      easy: 'Sportchilarni bildiruvchi soʻzlar -er, -or, -ist bilan tugaydi: runner — yuguruvchi, swimmer — suzuvchi, sailor — dengizchi (yelkanli qayiqda), competitor — ishtirokchi, canoeist — kanoechi, spectator — tomoshabin.',
      draw: [
        { t: 'title', text: 'Suffixes: -er, -or, -ist' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['-er', '-or', '-ist'],
            ['runner', 'sailor', 'canoeist'],
            ['swimmer', 'competitor', 'cyclist'],
            ['climber', 'spectator', 'guitarist'],
            ['winner', 'actor', 'artist']
          ]
        },
        { t: 'text', x: 6, y: 50, text: 'swim → swimmer (double m!) · win → winner', size: 's', color: 'orange' }
      ],
      next: 'Now the grammar'
    },
    {
      kind: 'scene',
      say: 'Malika calls Timur on Saturday morning. Listen to the verbs: some are about habits, some about now.',
      easy: 'Present simple — odatlar va doimiy holatlar uchun: I train every day. Present continuous — hozir boʻlayotgan ish uchun: I’m warming up now. Signal soʻzlar: every day, usually, often (simple); now, at the moment, today (continuous).',
      draw: [],
      scene: {
        style: 'phone',
        place: '📱 Malika and Timur',
        lines: [
          { who: 'malika', text: 'Hi! What are you doing? Are you getting ready for the match?', uz: 'Salom! Nima qilyapsan? Oʻyinga tayyorlanyapsanmi?' },
          { who: 'timur', text: 'Yes, I’m warming up at the moment. I usually train for an hour before a game.', uz: 'Ha, hozir badan qizdiryapman. Odatda oʻyindan oldin bir soat mashq qilaman.' },
          { who: 'malika', text: 'Do you feel nervous?', uz: 'Hayajonlanyapsanmi?' },
          { who: 'timur', text: 'A bit. The other team often wins this tournament.', uz: 'Biroz. Raqib jamoa bu turnirda tez-tez gʻolib boʻladi.' },
          { who: 'malika', text: 'You’re playing really well this year. I’m sure you’ll be fine!', uz: 'Bu yil juda yaxshi oʻynayapsan. Ishonchim komil, hammasi yaxshi boʻladi!' }
        ],
        words: [
          { en: 'at the moment', uz: 'hozirgi paytda' },
          { en: 'usually', uz: 'odatda' },
          { en: 'often', uz: 'tez-tez' },
          { en: 'this year', uz: 'bu yil' }
        ]
      },
      next: 'Show me the rule'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Use the present simple for habits, routines and facts: I train every day. Use the present continuous for actions happening now or around now: I’m warming up at the moment. Some verbs, like know, like, want and believe, are state verbs. We don’t usually use them in the continuous: I know the answer, not I’m knowing.',
      easy: 'Present simple: odat, doimiy fakt (I train every day). Present continuous: hozir yoki shu kunlarda boʻlayotgan ish (I’m training now). Holat feʼllari (know, like, want, believe) odatda continuous shaklida ishlatilmaydi.',
      draw: [
        { t: 'title', text: 'Present simple vs continuous' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['', 'simple', 'continuous'],
            ['when?', 'habits, facts', 'now, these days'],
            ['example', 'I train daily.', 'I’m training now.'],
            ['signals', 'usually, often', 'now, at the moment']
          ]
        },
        { t: 'text', x: 4, y: 50, text: 'state verbs: know, like, want, believe', size: 's', color: 'orange' },
        { t: 'text', x: 4, y: 58, text: '✗ I’m knowing  ✓ I know', size: 's', color: 'red' }
      ],
      next: 'One more scene'
    },
    {
      kind: 'scene',
      say: 'After the match, Malika writes an online comment on the school sports page. Mr Collins gives her advice.',
      easy: 'Onlayn izoh yozishda: avval fikringizni ayting, keyin sababini tushuntiring, misol keltiring va doʻstona tonda yozing.',
      draw: [],
      scene: {
        style: 'interview',
        place: 'English club · writing an online comment',
        lines: [
          { who: 'malika', text: 'I want to write a comment about the match. How do I start?', uz: 'Oʻyin haqida izoh yozmoqchiman. Qanday boshlay?' },
          { who: 'narrator', text: 'Start with your opinion. For example: I think team sports are great for teenagers.', uz: 'Fikringdan boshla. Masalan: Menimcha, jamoaviy sport oʻsmirlar uchun juda foydali.' },
          { who: 'malika', text: 'Then I give a reason?', uz: 'Keyin sababini aytamanmi?' },
          { who: 'narrator', text: 'Yes, and an example. Our team lost the final, but everyone had a go and enjoyed it.', uz: 'Ha, va misol keltir. Jamoamiz finalda yutqazdi, lekin hamma harakat qildi va zavqlandi.' },
          { who: 'malika', text: 'So: opinion, reason, example — and a friendly tone!', uz: 'Demak: fikr, sabab, misol — va doʻstona ohang!' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Sports phrases: enter a tournament, beat the other team, score a goal, win a medal, lose a match, miss an opportunity, have a go.',
    'People in sport: runner, swimmer, winner (-er); sailor, competitor, spectator (-or); canoeist, cyclist (-ist).',
    'Present simple — habits and facts: I usually train for an hour.',
    'Present continuous — now: I’m warming up at the moment. State verbs (know, like, want) — not continuous.',
    'An online comment: opinion → reason → example, friendly tone.'
  ],
  questions: [
    {
      id: 'e4q1',
      prompt: 'Match the phrases to their meanings.',
      hint: 'Think about Timur’s football match.',
      explanation: 'beat the other team — do better than them; score a goal — get a point; enter a tournament — take part in it; miss an opportunity — not use a chance.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'beat the other team' }, right: { label: 'do better than them' } },
            { left: { label: 'score a goal' }, right: { label: 'get a point in football' } },
            { left: { label: 'enter a tournament' }, right: { label: 'take part in it' } },
            { left: { label: 'miss an opportunity' }, right: { label: 'not use a chance' } }
          ]
        }
      }
    },
    {
      id: 'e4q2',
      prompt: 'Make a word for the person.',
      hint: 'swim → swim + m + er',
      explanation: 'Someone who swims is a swimmer (double m).',
      widget: { type: 'text_answer', props: { before: 'Someone who swims is a', after: '.', answer: 'swimmer', width: 8 } }
    },
    {
      id: 'e4q3',
      prompt: 'Sort the words by their suffix.',
      hint: 'Say the words aloud.',
      explanation: '-er: runner, climber; -or: sailor, spectator; -ist: canoeist, cyclist.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'er', label: '-er' },
            { id: 'or', label: '-or' },
            { id: 'ist', label: '-ist' }
          ],
          tiles: [
            { id: 't1', label: 'runner', bin: 'er' },
            { id: 't2', label: 'sailor', bin: 'or' },
            { id: 't3', label: 'canoeist', bin: 'ist' },
            { id: 't4', label: 'climber', bin: 'er' },
            { id: 't5', label: 'spectator', bin: 'or' },
            { id: 't6', label: 'cyclist', bin: 'ist' }
          ]
        }
      }
    },
    {
      id: 'e4q4',
      prompt: 'Complete Timur’s message.',
      hint: '“At the moment” → continuous. “Usually” → simple.',
      explanation: 'I am warming up at the moment. I usually train for an hour.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'I' }, { blank: 'am warming' }, { text: 'up at the moment. I usually' }, { blank: 'train' }, { text: 'for an hour before a game.' }],
          bank: ['am warming', 'train', 'warm', 'am training']
        }
      }
    },
    {
      id: 'e4q5',
      prompt: 'Tap all the correct sentences.',
      hint: 'State verbs are not usually continuous.',
      explanation: 'Correct: “I know the rules.”, “She plays tennis every Sunday.”, “They’re playing now.” Wrong: “I’m knowing…”, “He is wanting…”.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'I know the rules.', match: true },
            { id: 'b', text: 'I’m knowing the rules.', match: false },
            { id: 'c', text: 'She plays tennis every Sunday.', match: true },
            { id: 'd', text: 'He is wanting a new ball.', match: false },
            { id: 'e', text: 'They’re playing now.', match: true }
          ]
        }
      }
    },
    {
      id: 'e4q6',
      prompt: 'True or false?',
      hint: 'Remember the dialogues.',
      explanation: 'The coach entered the team in a tournament; Timur usually trains for an hour; the coach says winning isn’t everything.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'The coach entered the team in the city tournament.', value: true },
            { text: 'Timur never trains before a game.', value: false },
            { text: 'The coach says winning a medal isn’t everything.', value: true },
            { text: 'An online comment should start with your opinion.', value: true }
          ]
        }
      }
    },
    {
      id: 'e4q7',
      prompt: 'Put the words in order.',
      hint: 'Start with “Our team”.',
      explanation: 'Our team is playing really well this year.',
      widget: { type: 'sentence_order', props: { words: ['Our', 'team', 'is', 'playing', 'really', 'well', 'this', 'year.'] } }
    },
    {
      id: 'e4q8',
      prompt: 'Which word is the odd one out? Three are people who take part.',
      hint: 'One person only watches.',
      explanation: 'A spectator watches; a runner, a swimmer and a competitor take part.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'runner' }, { text: 'swimmer' }, { text: 'competitor' }, { text: 'spectator', odd: true }] } }
    }
  ]
};
