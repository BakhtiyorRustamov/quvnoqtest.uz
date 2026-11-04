import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G3 } from './eng-cast';

/** Student's Book: Unit 9 “The future is now” (pp. 54–57) — technology, enough/too/very, future forms, future continuous. */
export const ENG_13: BoardLesson = {
  n: 13,
  label: '13',
  lang: 'en',
  group: ENG_G3,
  easyLang: 'uz',
  title: 'The future is now',
  section: 'Unit 9',
  cast: {
    ...ENG_CAST,
    engineer: { name: 'Engineer Kamila', emoji: '', color: '#2C7A7B', azure: '', gender: 'f' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Malika and Timur visit a technology fair in Tashkent. An engineer shows them an electric car.',
      easy: 'Texnologiya koʻrgazmasida elektromobil. Charge — quvvatlamoq, plug in — rozetkaga ulamoq, power — quvvat, energiya, fuel — yoqilgʻi, display — ekran, invention — ixtiro, satellite — sunʼiy yoʻldosh, connection — ulanish.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🚗 A technology fair in Tashkent',
        lines: [
          { who: 'engineer', text: 'This car doesn’t use fuel. It runs on electric power.', uz: 'Bu mashina yoqilgʻi ishlatmaydi. U elektr quvvati bilan yuradi.' },
          { who: 'timur', text: 'How do you charge it?', uz: 'Uni qanday quvvatlaysiz?' },
          { who: 'engineer', text: 'You just plug it in at home, like a phone. Look at the display — it shows the battery.', uz: 'Uyda xuddi telefondek rozetkaga ulaysiz. Ekranga qarang — u batareyani koʻrsatadi.' },
          { who: 'malika', text: 'And the map? Does it need an internet connection?', uz: 'Xarita-chi? Unga internet ulanishi kerakmi?' },
          { who: 'engineer', text: 'It uses satellites. It’s a great invention for a cleaner city.', uz: 'U sunʼiy yoʻldoshlardan foydalanadi. Bu toza shahar uchun ajoyib ixtiro.' }
        ],
        words: [
          { en: 'fuel', uz: 'yoqilgʻi' },
          { en: 'power', uz: 'quvvat, energiya' },
          { en: 'charge', uz: 'quvvatlamoq' },
          { en: 'plug it in', uz: 'rozetkaga ulamoq' },
          { en: 'display', uz: 'ekran' },
          { en: 'satellites', uz: 'sunʼiy yoʻldoshlar' }
        ]
      },
      next: 'too, enough, very'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Too means more than is good: this car is too expensive for me. Enough means as much as we need: the battery is big enough for 400 kilometres. Not enough means less than we need: my phone isn’t fast enough. Very just makes an adjective stronger: it’s very quiet. Notice the word order: too and very go before the adjective, enough goes after it.',
      easy: 'Too — haddan tashqari (too expensive — juda qimmat, sotib ololmayman). Enough — yetarli (big enough). Not … enough — yetarli emas (not fast enough). Very — juda (very quiet). Tartib: too/very + sifat; sifat + enough.',
      draw: [
        { t: 'title', text: 'too · enough · very' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['word', 'example'],
            ['too + adj', 'It’s too expensive.'],
            ['adj + enough', 'It’s big enough.'],
            ['not + adj + enough', 'It isn’t fast enough.'],
            ['very + adj', 'It’s very quiet.']
          ]
        }
      ],
      next: 'Now the grammar'
    },
    {
      kind: 'scene',
      say: 'On the way home, Malika and Timur talk about their plans and predictions. Listen for different future forms.',
      easy: 'Kelajak: will — bashorat yoki shu zahoti qaror (I think cars will fly). Be going to — oldindan rejalashtirilgan niyat (I’m going to study engineering). Present continuous — kelishilgan uchrashuv (I’m meeting her on Friday). Future continuous (will be + -ing) — kelajakda maʼlum paytda davom etayotgan ish.',
      draw: [],
      scene: {
        style: 'chat',
        place: '🚇 On the metro',
        lines: [
          { who: 'malika', text: 'I think we will all drive electric cars in twenty years.', uz: 'Menimcha, yigirma yildan keyin hammamiz elektromobil haydaymiz.' },
          { who: 'timur', text: 'I’m going to study engineering. I want to build them!', uz: 'Men muhandislikni oʻqimoqchiman. Ularni yasashni xohlayman!' },
          { who: 'malika', text: 'Cool. I’m meeting Engineer Kamila again on Friday for my project.', uz: 'Zoʻr. Juma kuni loyiham uchun Kamila opa bilan yana uchrashaman.' },
          { who: 'timur', text: 'This time next year, I’ll be preparing for university exams.', uz: 'Kelasi yil shu paytda universitet imtihonlariga tayyorlanayotgan boʻlaman.' },
          { who: 'malika', text: 'Don’t worry, I’ll help you!', uz: 'Xavotir olma, men senga yordam beraman!' }
        ],
        words: [
          { en: 'will drive', uz: 'haydaymiz (bashorat)' },
          { en: 'I’m going to study', uz: 'oʻqimoqchiman (reja)' },
          { en: 'I’m meeting', uz: 'uchrashaman (kelishilgan)' },
          { en: 'I’ll be preparing', uz: 'tayyorlanayotgan boʻlaman' }
        ]
      },
      next: 'Show me the rule'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Future forms. Will for predictions and quick decisions or offers: cars will fly; I’ll help you. Be going to for plans and intentions: I’m going to study engineering. Present continuous for fixed arrangements with a time: I’m meeting her on Friday. Future continuous, will be plus -ing, for an action in progress at a time in the future: this time next year I’ll be preparing for exams.',
      easy: 'will — bashorat, taklif, tez qaror. be going to — reja, niyat. Present continuous — vaqti belgilangan kelishuv. will be + -ing — kelajakdagi aniq paytda davom etayotgan ish.',
      draw: [
        { t: 'title', text: 'Talking about the future' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['form', 'use', 'example'],
            ['will', 'prediction, offer', 'I’ll help you.'],
            ['be going to', 'plan', 'I’m going to study.'],
            ['present cont.', 'arrangement', 'I’m meeting her.'],
            ['will be + -ing', 'in progress', 'I’ll be studying.']
          ]
        }
      ],
      next: 'To the exercises'
    }
  ],
  summary: [
    'Technology: charge, plug in, power, fuel, display, connection, satellite, invention, experiment.',
    'too + adjective (too expensive); adjective + enough (big enough); not … enough; very + adjective.',
    'will — predictions and offers; be going to — plans; present continuous — arrangements.',
    'Future continuous (will be + -ing): This time next year I’ll be preparing for exams.'
  ],
  questions: [
    {
      id: 'e13q1',
      prompt: 'Match the technology words to their meanings.',
      hint: 'Remember the electric car.',
      explanation: 'fuel — something burned to give power; charge — put electricity into a battery; satellite — equipment in space that sends signals; invention — something created for the first time.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'fuel' }, right: { label: 'it is burned to give power' } },
            { left: { label: 'charge' }, right: { label: 'put electricity into a battery' } },
            { left: { label: 'satellite' }, right: { label: 'it sends signals from space' } },
            { left: { label: 'invention' }, right: { label: 'something new, created first' } }
          ]
        }
      }
    },
    {
      id: 'e13q2',
      prompt: 'Choose the correct word.',
      hint: 'I can’t buy it — the price is more than I can pay.',
      explanation: 'This car is too expensive for me.',
      widget: { type: 'mcq', props: { prompt: 'This car is ___ expensive for me. I can’t buy it.', choices: ['too', 'enough', 'very enough', 'not'], answerIndex: 0 } }
    },
    {
      id: 'e13q3',
      prompt: 'Complete the sentence.',
      hint: 'enough goes after the adjective.',
      explanation: 'The battery is big enough for 400 kilometres.',
      widget: { type: 'text_answer', props: { before: 'The battery is big', after: 'for 400 kilometres.', answer: 'enough', width: 7 } }
    },
    {
      id: 'e13q4',
      prompt: 'Match the sentences to their use.',
      hint: 'Plan, arrangement, prediction or offer?',
      explanation: 'Prediction: Cars will fly one day. Plan: I’m going to study engineering. Arrangement: I’m meeting her on Friday. Offer: I’ll help you!',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Cars will fly one day.' }, right: { label: 'prediction' } },
            { left: { label: 'I’m going to study engineering.' }, right: { label: 'plan' } },
            { left: { label: 'I’m meeting her on Friday.' }, right: { label: 'arrangement' } },
            { left: { label: 'I’ll help you!' }, right: { label: 'offer' } }
          ]
        }
      }
    },
    {
      id: 'e13q5',
      prompt: 'Complete with the future continuous.',
      hint: 'will be + -ing',
      explanation: 'This time next year, I will be preparing for university exams.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'This time next year, I' }, { blank: 'will be' }, { blank: 'preparing' }, { text: 'for university exams.' }],
          bank: ['will be', 'preparing', 'am', 'prepared']
        }
      }
    },
    {
      id: 'e13q6',
      prompt: 'True or false?',
      hint: 'Think about the fair and the metro.',
      explanation: 'The car runs on electric power; Timur is going to study engineering; the map uses satellites.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'The car at the fair uses a lot of fuel.', value: false },
            { text: 'Timur is going to study engineering.', value: true },
            { text: 'The car’s map uses satellites.', value: true },
            { text: '“Enough” goes before the adjective.', value: false }
          ]
        }
      }
    },
    {
      id: 'e13q7',
      prompt: 'Tap all the correct sentences.',
      hint: 'too/very before, enough after the adjective.',
      explanation: 'Correct: “My phone isn’t fast enough.”, “It’s very quiet.”, “I’m going to buy one.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'My phone isn’t fast enough.', match: true },
            { id: 'b', text: 'It’s enough big.', match: false },
            { id: 'c', text: 'It’s very quiet.', match: true },
            { id: 'd', text: 'I’m going to buy one.', match: true },
            { id: 'e', text: 'I will to help you.', match: false }
          ]
        }
      }
    },
    {
      id: 'e13q8',
      prompt: 'Put the words in order.',
      hint: 'A prediction with “will”.',
      explanation: 'I think we will all drive electric cars.',
      widget: { type: 'sentence_order', props: { words: ['I', 'think', 'we', 'will', 'all', 'drive', 'electric', 'cars.'] } }
    }
  ]
};
