import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G1 } from './eng-cast';

/** Student's Book: Unit 4 “Extreme weather” (pp. 24–27) — extreme weather, phrasal verbs, past simple, used to. */
export const ENG_5: BoardLesson = {
  n: 5,
  label: '5',
  lang: 'en',
  group: ENG_G1,
  easyLang: 'uz',
  title: 'Extreme weather',
  section: 'Unit 4',
  cast: {
    ...ENG_CAST,
    reporter: { name: 'Weather reporter', emoji: '', color: '#2C7A7B', azure: '', gender: 'f' },
    grandpa: { name: 'Grandpa Akmal', emoji: '', color: '#975A16', azure: '', gender: 'm' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Timur is watching the weather news. A big storm is coming.',
      easy: 'Ob-havo xabarlari: kuchli boʻron kelyapti. Flood — suv toshqini, lightning — chaqmoq, pour — sharillab yogʻmoq, blow — (shamol) esmoq, tornado — quyun, earthquake — zilzila, snowstorm — qor boʻroni.',
      draw: [],
      scene: {
        style: 'interview',
        place: '📺 Evening weather news',
        lines: [
          { who: 'reporter', text: 'Tonight a strong wind will blow from the west, and the rain will pour all night.', uz: 'Bugun kechasi gʻarbdan kuchli shamol esadi va tun boʻyi jala quyadi.' },
          { who: 'reporter', text: 'There may be thunder and lightning in the mountains.', uz: 'Togʻlarda momaqaldiroq va chaqmoq boʻlishi mumkin.' },
          { who: 'reporter', text: 'The water in the rivers will rise, so there is a danger of floods.', uz: 'Daryolarda suv koʻtariladi, shuning uchun toshqin xavfi bor.' },
          { who: 'timur', text: 'Wow, that sounds serious. Is it like a tornado?', uz: 'Voy, jiddiy ekan. Bu quyunga oʻxshaydimi?' },
          { who: 'reporter', text: 'No, but please stay at home, and don’t walk near the river.', uz: 'Yoʻq, lekin iltimos uyda qoling va daryo yonida yurmang.' }
        ],
        words: [
          { en: 'blow', uz: 'esmoq (shamol)' },
          { en: 'pour', uz: 'jala quymoq' },
          { en: 'lightning', uz: 'chaqmoq' },
          { en: 'rise', uz: 'koʻtarilmoq' },
          { en: 'floods', uz: 'suv toshqinlari' }
        ]
      },
      next: 'More weather words'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Extreme weather words: a flood is too much water on dry land. An earthquake makes the ground shake. A tornado is a very strong wind that turns in a circle. A snowstorm brings a lot of snow. Some phrasal verbs too: the wind can blow trees away, firefighters put out a fire, and after a storm the sky clears up and the sun comes out.',
      easy: 'Flood — toshqin, earthquake — zilzila (yer silkinadi — shake), tornado — quyun, snowstorm — qor boʻroni. Phrasal verbs: blow away — uchirib ketmoq, put out — oʻchirmoq (olovni), clear up — ochilmoq (havo), come out — chiqmoq (quyosh), burn down — yonib ketmoq, fall down — qulab tushmoq.',
      draw: [
        { t: 'title', text: 'Extreme weather' },
        { t: 'box', id: 'f', x: 4, y: 14, w: 22, h: 11, text: 'flood 🌊', color: 'blue' },
        { t: 'box', id: 'e', x: 28, y: 14, w: 22, h: 11, text: 'earthquake', color: 'orange' },
        { t: 'box', id: 't', x: 52, y: 14, w: 22, h: 11, text: 'tornado 🌪️', color: 'purple' },
        { t: 'box', id: 's', x: 76, y: 14, w: 22, h: 11, text: 'snowstorm', color: 'green' },
        {
          t: 'table',
          x: 6,
          y: 32,
          rows: [
            ['phrasal verb', 'meaning'],
            ['put out (a fire)', 'stop it burning'],
            ['clear up', 'rain and clouds go away'],
            ['come out (the sun)', 'appear in the sky']
          ]
        }
      ],
      next: 'Now the grammar'
    },
    {
      kind: 'scene',
      say: 'Timur visits his grandpa in the village. Grandpa talks about the winters of his childhood.',
      easy: 'Past simple — oʻtmishda bir marta boʻlgan ish: In 1969 the river flooded. Used to — oʻtmishdagi odat yoki holat, hozir yoʻq: We used to have snow every winter. Inkor: didn’t use to. Soʻroq: Did you use to…?',
      draw: [],
      scene: {
        style: 'stage',
        place: '🏡 Grandpa’s house in the village',
        lines: [
          { who: 'grandpa', text: 'When I was young, we used to have much colder winters.', uz: 'Yoshligimda qishlar ancha sovuqroq boʻlardi.' },
          { who: 'timur', text: 'Did you use to play in the snow every day?', uz: 'Har kuni qorda oʻynarmidingiz?' },
          { who: 'grandpa', text: 'Yes! And one winter there was a terrible snowstorm. It lasted three days.', uz: 'Ha! Bir qishda dahshatli qor boʻroni boʻldi. Uch kun davom etdi.' },
          { who: 'timur', text: 'What did you do?', uz: 'Nima qildingiz?' },
          { who: 'grandpa', text: 'We stayed inside, and my father told us stories. We didn’t use to have television then.', uz: 'Uyda qoldik, otam bizga ertak aytib berdi. U paytlarda televizorimiz yoʻq edi.' }
        ],
        words: [
          { en: 'used to have', uz: '…ga ega edik (odatda)' },
          { en: 'Did you use to', uz: '…armidingiz?' },
          { en: 'didn’t use to', uz: '…mas edi' },
          { en: 'lasted', uz: 'davom etdi' }
        ]
      },
      next: 'Show me the rule'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Use the past simple for finished actions at a definite time in the past: there was a snowstorm, we stayed inside. Use used to for past habits and states that are not true now: we used to have colder winters. In negatives and questions, say use to without d: we didn’t use to have TV; did you use to play outside?',
      easy: 'Past simple: tugagan ish, aniq vaqtda (we stayed inside). Used to: oʻtmishdagi odat, hozir yoʻq (we used to play). Inkor va soʻroqda — use to (d harfisiz): didn’t use to, did you use to?',
      draw: [
        { t: 'title', text: 'Past simple and used to' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['', 'past simple', 'used to'],
            ['meaning', 'one finished action', 'old habit or state'],
            ['+', 'It snowed a lot.', 'We used to ski.'],
            ['−', 'It didn’t snow.', 'We didn’t use to ski.'],
            ['?', 'Did it snow?', 'Did you use to ski?']
          ]
        },
        { t: 'text', x: 4, y: 56, text: '−/? : use to (no d!)', size: 's', color: 'orange' }
      ],
      next: 'Talk about the past'
    },
    {
      kind: 'scene',
      say: 'In class, the students talk about past experiences. Mr Collins helps Malika tell her story.',
      easy: 'Oʻtmishdagi tajriba haqida gapirganda: qachon va qayerda boʻlganini ayting, nima boʻlganini ketma-ket aytib bering, his-tuygʻularingizni qoʻshing. First, then, after that, in the end — bogʻlovchi soʻzlar.',
      draw: [],
      scene: {
        style: 'chat',
        place: '🏫 Speaking practice',
        lines: [
          { who: 'narrator', text: 'Malika, have you ever been in extreme weather?', uz: 'Malika, hech kuchli ob-havoga duch kelganmisan?' },
          { who: 'malika', text: 'Yes. Two years ago we were in the mountains, and suddenly it started to pour.', uz: 'Ha. Ikki yil oldin togʻda edik, birdan jala quya boshladi.' },
          { who: 'narrator', text: 'Good start: when and where. What happened then?', uz: 'Yaxshi boshlanish: qachon va qayerda. Keyin nima boʻldi?' },
          { who: 'malika', text: 'First we ran to a café. Then the rain stopped, and in the end the sun came out. I was so relieved!', uz: 'Avval kafega yugurdik. Keyin yomgʻir toʻxtadi, oxirida quyosh chiqdi. Juda yengil tortdim!' },
          { who: 'narrator', text: 'Excellent — clear order, linking words and your feelings.', uz: 'Aʼlo — aniq tartib, bogʻlovchi soʻzlar va his-tuygʻular.' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Extreme weather: flood, earthquake, tornado, snowstorm, lightning; the rain pours, the wind blows, the water rises.',
    'Phrasal verbs: blow away, burn down, clear up, come out, fall down, put out.',
    'Past simple — finished actions: There was a snowstorm. We stayed inside.',
    'used to — past habits and states: We used to have colder winters. −/?: didn’t use to, did you use to.',
    'Telling a story: when and where → events in order (first, then, in the end) → feelings.'
  ],
  questions: [
    {
      id: 'e5q1',
      prompt: 'Match the weather words to the meanings.',
      hint: 'Remember the weather news.',
      explanation: 'flood — too much water on dry land; earthquake — the ground shakes; tornado — a strong wind that turns in a circle; lightning — a flash of light in a storm.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'flood' }, right: { label: 'too much water on dry land' } },
            { left: { label: 'earthquake' }, right: { label: 'the ground shakes' } },
            { left: { label: 'tornado' }, right: { label: 'a wind that turns in a circle' } },
            { left: { label: 'lightning' }, right: { label: 'a flash of light in a storm' } }
          ]
        }
      }
    },
    {
      id: 'e5q2',
      prompt: 'Complete the sentences with phrasal verbs.',
      hint: 'What do firefighters do? What does the sun do after rain?',
      explanation: 'The firefighters put out the fire. After the storm the sky cleared up.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'The firefighters' }, { blank: 'put out' }, { text: 'the fire. After the storm the sky' }, { blank: 'cleared up' }, { text: '.' }],
          bank: ['put out', 'cleared up', 'blew away', 'fell down']
        }
      }
    },
    {
      id: 'e5q3',
      prompt: 'Complete with the correct form.',
      hint: 'A past habit → used to.',
      explanation: 'When I was little, I used to walk to school.',
      widget: { type: 'text_answer', props: { before: 'When I was little, I', after: 'walk to school.', answer: ['used to'], width: 8 } }
    },
    {
      id: 'e5q4',
      prompt: 'Tap all the correct sentences.',
      hint: 'In questions and negatives: use to (no d).',
      explanation: 'Correct: “We didn’t use to have TV.”, “Did you use to play outside?”, “There was a flood in 1998.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'We didn’t use to have TV.', match: true },
            { id: 'b', text: 'We didn’t used to have TV.', match: false },
            { id: 'c', text: 'Did you use to play outside?', match: true },
            { id: 'd', text: 'There was a flood in 1998.', match: true },
            { id: 'e', text: 'Did it snowed last week?', match: false }
          ]
        }
      }
    },
    {
      id: 'e5q5',
      prompt: 'True or false?',
      hint: 'Think about Grandpa Akmal’s story.',
      explanation: 'Winters used to be colder; the snowstorm lasted three days; they didn’t use to have television.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Grandpa says winters used to be colder.', value: true },
            { text: 'The snowstorm lasted three weeks.', value: false },
            { text: 'They used to watch TV every evening.', value: false },
            { text: 'During the storm Grandpa’s father told stories.', value: true }
          ]
        }
      }
    },
    {
      id: 'e5q6',
      prompt: 'Past habit or one finished action? Sort the sentences.',
      hint: 'Used to = a habit; past simple with a date = one action.',
      explanation: 'Habit: We used to ski every winter; She used to live by the sea. One action: It snowed on 5 March; The river flooded last spring.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'h', label: 'past habit' },
            { id: 'o', label: 'one action' }
          ],
          tiles: [
            { id: 't1', label: 'We used to ski every winter.', bin: 'h' },
            { id: 't2', label: 'It snowed on 5 March.', bin: 'o' },
            { id: 't3', label: 'She used to live by the sea.', bin: 'h' },
            { id: 't4', label: 'The river flooded last spring.', bin: 'o' }
          ]
        }
      }
    },
    {
      id: 'e5q7',
      prompt: 'Put the story in order.',
      hint: 'First → then → in the end.',
      explanation: 'It started to pour. First we ran to a café. Then the rain stopped. In the end the sun came out.',
      widget: { type: 'step_order', props: { steps: ['It started to pour.', 'First we ran to a café.', 'Then the rain stopped.', 'In the end the sun came out.'] } }
    },
    {
      id: 'e5q8',
      prompt: 'Which word is the odd one out?',
      hint: 'Three are kinds of extreme weather.',
      explanation: 'Flood, tornado and snowstorm are extreme weather; sunshine is not.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'flood' }, { text: 'tornado' }, { text: 'snowstorm' }, { text: 'sunshine', odd: true }] } }
    }
  ]
};
