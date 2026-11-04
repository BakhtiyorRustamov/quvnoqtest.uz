import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G2 } from './eng-cast';

/** Student's Book: Unit 7 “Sound check” (pp. 42–45) — music, word families, present perfect and past simple. */
export const ENG_10: BoardLesson = {
  n: 10,
  label: '10',
  lang: 'en',
  group: ENG_G2,
  easyLang: 'uz',
  title: 'Sound check',
  section: 'Unit 7',
  cast: {
    ...ENG_CAST,
    sardor: { name: 'Sardor', emoji: '', color: '#6B46C1', azure: '', gender: 'm' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Timur’s cousin Sardor plays guitar in a band. Malika and Timur visit him at the studio.',
      easy: 'Sardor guruhda gitara chaladi. Studio — studiya, gig — konsert (kichik), live — jonli ijro, lyrics — qoʻshiq soʻzlari, music video — klip, sound technician — ovoz muhandisi, festival — festival.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🎸 A recording studio in Tashkent',
        lines: [
          { who: 'sardor', text: 'Welcome to our studio! We’re recording our first song today.', uz: 'Studiyamizga xush kelibsiz! Bugun birinchi qoʻshigʻimizni yozyapmiz.' },
          { who: 'malika', text: 'Who wrote the lyrics?', uz: 'Qoʻshiq soʻzlarini kim yozgan?' },
          { who: 'sardor', text: 'I did. And the sound technician helps us with the production.', uz: 'Men. Ovoz muhandisi esa ishlab chiqarishda yordam beradi.' },
          { who: 'timur', text: 'Are you going to make a music video too?', uz: 'Klip ham suratga olasizmi?' },
          { who: 'sardor', text: 'Yes! And next month we’re playing a live gig at a music festival.', uz: 'Ha! Keyingi oy musiqa festivalida jonli konsert beramiz.' }
        ],
        words: [
          { en: 'studio', uz: 'studiya' },
          { en: 'lyrics', uz: 'qoʻshiq soʻzlari' },
          { en: 'sound technician', uz: 'ovoz muhandisi' },
          { en: 'music video', uz: 'klip' },
          { en: 'live gig', uz: 'jonli konsert' },
          { en: 'festival', uz: 'festival' }
        ]
      },
      next: 'Word families'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Word families help you learn many words at once. From perform we get performance and performer. From entertain — entertainer, entertaining and entertainment. From music — musical and musician. From achieve — achievement. From advertise — advertisement.',
      easy: 'Soʻz oilalari: perform (ijro etmoq) → performance (ijro), performer (ijrochi). Entertain (koʻngil ochmoq) → entertainer, entertaining, entertainment. Music → musical, musician. Achieve → achievement (yutuq). Advertise → advertisement (reklama).',
      draw: [
        { t: 'title', text: 'Word families' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['verb', 'noun (thing)', 'noun (person)'],
            ['perform', 'performance', 'performer'],
            ['entertain', 'entertainment', 'entertainer'],
            ['—', 'music', 'musician'],
            ['achieve', 'achievement', '—']
          ]
        },
        { t: 'text', x: 4, y: 50, text: '-ment · -ance · -er · -ian', size: 's', color: 'purple' }
      ],
      next: 'Now the grammar'
    },
    {
      kind: 'scene',
      say: 'Malika interviews Sardor for the school blog. Listen: some answers are about experience, some about a finished time.',
      easy: 'Present perfect (have/has + V3) — hayotiy tajriba yoki natija hozir muhim: I’ve played at three festivals. Past simple — aniq oʻtgan vaqt: We played in Samarkand last summer. Signal soʻzlar: ever, never, just, already, yet — present perfect; yesterday, last year, in 2023 — past simple.',
      draw: [],
      scene: {
        style: 'interview',
        place: '🎙️ School blog interview',
        lines: [
          { who: 'malika', text: 'Have you ever played at a big festival?', uz: 'Hech katta festivalda chalganmisiz?' },
          { who: 'sardor', text: 'Yes, I’ve played at three festivals. We played in Samarkand last summer.', uz: 'Ha, uchta festivalda chalganman. Oʻtgan yozda Samarqandda chaldik.' },
          { who: 'malika', text: 'Have you finished your album yet?', uz: 'Albomingizni tugatdingizmi?' },
          { who: 'sardor', text: 'Not yet. We’ve just recorded the first song, and we’ve already written five more.', uz: 'Hali yoʻq. Birinchi qoʻshiqni hozirgina yozdik, yana beshtasini allaqachon yozib qoʻyganmiz.' },
          { who: 'sardor', text: 'I’ve never been so excited!', uz: 'Hech qachon bunchalik hayajonlanmaganman!' }
        ],
        words: [
          { en: 'Have you ever', uz: 'Hech … ganmisiz?' },
          { en: 'last summer', uz: 'oʻtgan yoz' },
          { en: 'yet', uz: 'hali (soʻroq/inkor)' },
          { en: 'just', uz: 'hozirgina' },
          { en: 'already', uz: 'allaqachon' },
          { en: 'never', uz: 'hech qachon' }
        ]
      },
      next: 'Show me the rule'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Use the present perfect, have or has plus the past participle, for experiences and for recent actions with a result now: I’ve played at three festivals. We’ve just recorded a song. Use it with ever, never, just, already and yet. Use the past simple when you say when it happened: we played in Samarkand last summer.',
      easy: 'Present perfect: have/has + V3 — tajriba yoki yangi natija (ever, never, just, already, yet). Past simple: aniq vaqt aytilsa (yesterday, last summer, in 2020). ✗ I’ve played there last year. ✓ I played there last year.',
      draw: [
        { t: 'title', text: 'Present perfect vs past simple' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['', 'present perfect', 'past simple'],
            ['form', 'have + played', 'played'],
            ['when?', 'not said', 'last summer, in 2023'],
            ['words', 'ever, just, yet', 'yesterday, ago']
          ]
        },
        { t: 'text', x: 4, y: 44, text: '✗ I’ve played there last year.', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 52, text: '✓ I played there last year.', size: 's', color: 'green' }
      ],
      next: 'Writing an email'
    },
    {
      kind: 'scene',
      say: 'Timur wants to email Sardor to ask for festival tickets. Mr Collins helps him plan the email.',
      easy: 'Doʻstga email: salomlashish (Hi Sardor,), sabab (I’m writing to…), savollar, yakun (Hope to hear from you soon! Best wishes,). Norasmiy uslub — qisqartmalar mumkin: I’m, I’ve.',
      draw: [],
      scene: {
        style: 'chat',
        place: '✉️ Planning an email',
        lines: [
          { who: 'timur', text: 'How should I start the email to my cousin?', uz: 'Amakivachchamga emailni qanday boshlay?' },
          { who: 'narrator', text: 'It’s informal, so “Hi Sardor,” is fine. Then say why you’re writing.', uz: 'Bu norasmiy, shuning uchun “Hi Sardor,” yetarli. Keyin nega yozayotganingni ayt.' },
          { who: 'timur', text: 'I’m writing to ask about tickets for your festival gig.', uz: 'Festivaldagi konsertingiz chiptalari haqida soʻrash uchun yozyapman.' },
          { who: 'narrator', text: 'Good. Ask your questions clearly, then finish: “Hope to hear from you soon. Best wishes, Timur.”', uz: 'Yaxshi. Savollaringni aniq ber, keyin tugat: “Tez orada javob kutaman. Eng yaxshi tilaklar bilan, Timur.”' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Music words: studio, lyrics, gig, live, festival, music video, sound technician, musician, DJ.',
    'Word families: perform → performance, performer; entertain → entertainment, entertainer; music → musician; achieve → achievement.',
    'Present perfect (have/has + V3) — experience or recent result: I’ve played at three festivals. We’ve just recorded a song.',
    'Past simple — when the time is said: We played in Samarkand last summer.',
    'An informal email: Hi…, I’m writing to…, questions, Hope to hear from you soon. Best wishes,'
  ],
  questions: [
    {
      id: 'e10q1',
      prompt: 'Match the music words to their meanings.',
      hint: 'Remember the studio.',
      explanation: 'lyrics — the words of a song; gig — a pop or rock concert; studio — a room for recording; live — with an audience.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'lyrics' }, right: { label: 'the words of a song' } },
            { left: { label: 'gig' }, right: { label: 'a pop or rock concert' } },
            { left: { label: 'studio' }, right: { label: 'a room for recording' } },
            { left: { label: 'live' }, right: { label: 'played for an audience' } }
          ]
        }
      }
    },
    {
      id: 'e10q2',
      prompt: 'Complete with a word from the same family.',
      hint: 'A person who performs.',
      explanation: 'perform → performer (a person).',
      widget: { type: 'text_answer', props: { before: 'She is a brilliant', after: '— everyone loves her shows.', answer: 'performer', width: 10 } }
    },
    {
      id: 'e10q3',
      prompt: 'Thing or person? Sort the nouns.',
      hint: 'Words for people often end in -er or -ian.',
      explanation: 'Thing: performance, entertainment, achievement. Person: performer, entertainer, musician.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 't', label: 'thing' },
            { id: 'p', label: 'person' }
          ],
          tiles: [
            { id: 't1', label: 'performance', bin: 't' },
            { id: 't2', label: 'performer', bin: 'p' },
            { id: 't3', label: 'entertainment', bin: 't' },
            { id: 't4', label: 'musician', bin: 'p' },
            { id: 't5', label: 'achievement', bin: 't' },
            { id: 't6', label: 'entertainer', bin: 'p' }
          ]
        }
      }
    },
    {
      id: 'e10q4',
      prompt: 'Choose the correct form.',
      hint: '“Last summer” → past simple.',
      explanation: 'We played in Samarkand last summer.',
      widget: { type: 'mcq', props: { prompt: 'We ___ in Samarkand last summer.', choices: ['played', 'have played', 'has played', 'are playing'], answerIndex: 0 } }
    },
    {
      id: 'e10q5',
      prompt: 'Complete Sardor’s answer.',
      hint: 'have + past participle; “just” and “already” go between.',
      explanation: 'We’ve just recorded the first song, and we’ve already written five more.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'We have just' }, { blank: 'recorded' }, { text: 'the first song, and we have already' }, { blank: 'written' }, { text: 'five more.' }],
          bank: ['recorded', 'written', 'record', 'wrote']
        }
      }
    },
    {
      id: 'e10q6',
      prompt: 'Tap all the correct sentences.',
      hint: 'No present perfect with a finished time.',
      explanation: 'Correct: “Have you ever been to a festival?”, “I haven’t finished it yet.”, “I saw them in 2023.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Have you ever been to a festival?', match: true },
            { id: 'b', text: 'I’ve seen them last week.', match: false },
            { id: 'c', text: 'I haven’t finished it yet.', match: true },
            { id: 'd', text: 'I saw them in 2023.', match: true },
            { id: 'e', text: 'She has went to the concert.', match: false }
          ]
        }
      }
    },
    {
      id: 'e10q7',
      prompt: 'True or false?',
      hint: 'Think about Sardor’s band.',
      explanation: 'Sardor wrote the lyrics; the album isn’t finished yet; they’re playing at a festival next month.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sardor wrote the lyrics himself.', value: true },
            { text: 'The band has already finished the album.', value: false },
            { text: 'They are playing at a festival next month.', value: true },
            { text: 'An informal email can start with “Hi Sardor,”.', value: true }
          ]
        }
      }
    },
    {
      id: 'e10q8',
      prompt: 'Put the words in order.',
      hint: 'A present perfect question with “ever”.',
      explanation: 'Have you ever played at a festival?',
      widget: { type: 'sentence_order', props: { words: ['Have', 'you', 'ever', 'played', 'at', 'a', 'festival?'] } }
    }
  ]
};
