import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G1 } from './eng-cast';

/** Student's Book: Unit 2 “Best friends forever” (pp. 14–17) — personality adjectives, un-/dis-, -ing forms. */
export const ENG_2: BoardLesson = {
  n: 2,
  label: '2',
  lang: 'en',
  group: ENG_G1,
  easyLang: 'uz',
  title: 'Best friends forever',
  section: 'Unit 2',
  cast: {
    ...ENG_CAST,
    host: { name: 'Radio host', emoji: '', color: '#6B46C1', azure: 'en-GB-LibbyNeural', accent: 'en-GB', gender: 'f' },
    expert: { name: 'Dr Hayes', emoji: '', color: '#2C7A7B', azure: 'en-GB-ThomasNeural', accent: 'en-GB', gender: 'm' },
    aziz: { name: 'Aziz', emoji: '', color: '#C05621', azure: 'en-US-BrianNeural', accent: 'en-US', gender: 'm' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Today’s radio show is about friendship. Can online friends be real friends?',
      easy: 'Radioda doʻstlik haqida suhbat. Olim aytadi: onlayn doʻstlar ham yordam (support) bera oladi, kechasi ham. Lekin haqiqiy doʻstlar bilan birga xotiralar yaratamiz, quchoqlashamiz (hug) — bu ham muhim. Ikkalasi ham kerak.',
      draw: [],
      scene: {
        style: 'interview',
        place: 'Radio Tashkent Teen · “Friends”',
        lines: [
          { who: 'host', text: 'Dr Hayes, can an online friend be a good friend?', uz: 'Doktor Xeys, onlayn doʻst yaxshi doʻst boʻla oladimi?' },
          { who: 'expert', text: 'Yes! A good friend gives you honest advice and support. Online friends can do that too — even at night.', uz: 'Ha! Yaxshi doʻst halol maslahat va yordam beradi. Onlayn doʻstlar ham buni qila oladi — hatto kechasi ham.' },
          { who: 'host', text: 'So do we still need real friends?', uz: 'Demak, haqiqiy doʻstlar baribir kerakmi?' },
          { who: 'expert', text: 'We do. With real friends we create memories together. And hugging a friend makes us feel safe and happy.', uz: 'Kerak. Haqiqiy doʻstlar bilan birga xotiralar yaratamiz. Doʻstni quchoqlash esa bizni xotirjam va baxtli qiladi.' },
          { who: 'host', text: 'So both kinds of friends are great?', uz: 'Demak, ikkala turdagi doʻst ham zoʻrmi?' },
          { who: 'expert', text: 'Exactly. They just help us in different ways.', uz: 'Aynan shunday. Ular shunchaki bizga turli yoʻllar bilan yordam beradi.' }
        ],
        words: [
          { en: 'honest', uz: 'halol, rostgoʻy' },
          { en: 'support', uz: 'yordam, qoʻllab-quvvatlash' },
          { en: 'hugging', uz: 'quchoqlash' }
        ]
      },
      next: 'I agree'
    },
    {
      kind: 'scene',
      say: '',
      easy: 'Malika va Timur doʻstlar haqidagi testni yechishyapti. Reliable — ishonchli. Anxious — xavotirli. Generous — saxiy. Shy — uyatchan. Confident — oʻziga ishongan. Patient — sabrli.',
      draw: [],
      scene: {
        style: 'phone',
        place: '📝 Quiz: What kind of friend are you?',
        lines: [
          { who: 'timur', text: 'Question 1: “I always do what I promise.” That’s me — I’m reliable!', uz: '1-savol: “Har doim vaʼdamni bajaraman.” Bu men — men ishonchliman!' },
          { who: 'malika', text: 'True. And I’m a bit anxious when there are lots of people.', uz: 'Toʻgʻri. Men esa odam koʻp joyda biroz xavotirlanaman.' },
          { who: 'timur', text: 'But you’re very generous. You always share your snacks!', uz: 'Lekin sen juda saxiysan. Doim yeguliklaringni boʻlishasan!' },
          { who: 'malika', text: 'Haha. You’re confident, but not very patient.', uz: 'Ha-ha. Sen oʻzingga ishonasan, lekin unchalik sabrli emassan.' },
          { who: 'timur', text: 'OK, OK. I’m working on it!', uz: 'Xoʻp, xoʻp. Ustimda ishlayapman!' }
        ],
        words: [
          { en: 'reliable', uz: 'ishonchli' },
          { en: 'anxious', uz: 'xavotirli' },
          { en: 'generous', uz: 'saxiy' },
          { en: 'confident', uz: 'oʻziga ishongan' },
          { en: 'patient', uz: 'sabrli' }
        ]
      },
      next: 'Next'
    },
    {
      kind: 'card',
      clear: true,
      say: 'We can make opposites with prefixes. Un plus kind is unkind. Un plus reliable is unreliable. With many verbs we use dis: agree, disagree; like, dislike; appear, disappear.',
      easy: 'Teskari maʼno uchun old qoʻshimcha: un- (unkind — mehribon emas, unhappy — baxtsiz) va dis- (disagree — rozi emas, dislike — yoqtirmaslik, disappear — gʻoyib boʻlmoq). dis- koʻpincha feʼllarga qoʻshiladi.',
      draw: [
        { t: 'title', text: 'Opposites: un- / dis-' },
        { t: 'box', id: 'u', x: 4, y: 14, w: 44, h: 11, text: 'un-', color: 'blue' },
        { t: 'list', x: 6, y: 34, items: ['kind → unkind', 'lucky → unlucky', 'happy → unhappy', 'fair → unfair'], color: 'blue' },
        { t: 'box', id: 'd', x: 52, y: 14, w: 44, h: 11, text: 'dis- (often verbs)', color: 'orange' },
        { t: 'list', x: 54, y: 34, items: ['agree → disagree', 'like → dislike', 'appear → disappear'], color: 'orange' }
      ],
      next: 'Go on'
    },
    {
      kind: 'scene',
      say: 'A new student, Aziz, joins the class. Listen to how Malika and Aziz talk about themselves.',
      easy: 'Oʻzingiz haqingizda gapirganda faqat “yes / no” demang, qoʻshimcha maʼlumot qoʻshing: I like it because… (yoqadi, chunki…), I usually… (odatda…), I prefer… (afzal koʻraman…), I think… (menimcha…).',
      draw: [],
      scene: {
        style: 'stage',
        place: '🏫 First day in class 11B',
        lines: [
          { who: 'malika', text: 'Hi, I’m Malika. Where are you from?', uz: 'Salom, men Malikaman. Qayerdansan?' },
          { who: 'aziz', text: 'Hi! I’m Aziz. I’m from Samarkand. We moved here last month.', uz: 'Salom! Men Azizman. Samarqanddanman. Oʻtgan oy bu yerga koʻchib keldik.' },
          { who: 'malika', text: 'Do you enjoy studying English?', uz: 'Ingliz tilini oʻrganish senga yoqadimi?' },
          { who: 'aziz', text: 'Yes, I like it because I love films. I usually watch them in English.', uz: 'Ha, yoqadi, chunki kinolarni yaxshi koʻraman. Odatda ularni inglizcha koʻraman.' },
          { who: 'malika', text: 'Cool! I prefer music. I’m crazy about singing.', uz: 'Zoʻr! Men musiqani afzal koʻraman. Qoʻshiq aytishni juda yaxshi koʻraman.' },
          { who: 'aziz', text: 'Really? I think we’ll be good friends!', uz: 'Rostdanmi? Menimcha, yaxshi doʻst boʻlamiz!' }
        ],
        words: [
          { en: 'I like it because', uz: 'yoqadi, chunki' },
          { en: 'I usually', uz: 'odatda' },
          { en: 'I prefer', uz: 'afzal koʻraman' },
          { en: 'I think', uz: 'menimcha' }
        ]
      },
      next: 'What about grammar?'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Look at the -ing forms. After verbs like enjoy, love, hate, don’t mind and can’t stand we use the -ing form: I enjoy watching films. After an adjective and a preposition: I’m crazy about singing. And an -ing form can be the subject: Hugging is good for us.',
      easy: '-ing shakl qachon kerak: 1) enjoy, love, hate, don’t mind, can’t stand dan keyin: I enjoy reading. 2) sifat + predlogdan keyin: good at, afraid of, interested in, keen on: I’m good at drawing. 3) gapning boshida ega sifatida: Swimming is fun.',
      draw: [
        { t: 'title', text: '-ing forms' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['when?', 'example'],
            ['enjoy / love + -ing', 'I enjoy watching films.'],
            ['adj. + prep. + -ing', 'I’m crazy about singing.'],
            ['-ing as subject', 'Hugging is good for us.']
          ]
        },
        { t: 'text', x: 4, y: 52, text: 'good at · afraid of · interested in · keen on', size: 's', color: 'purple' }
      ],
      next: 'Practice!'
    }
  ],
  summary: [
    'Personality: reliable, anxious, generous, confident, patient, honest.',
    'Opposites: un- (unkind, unreliable) and dis- (disagree, dislike, disappear).',
    '-ing after enjoy, love, hate, don’t mind, can’t stand: I enjoy reading.',
    '-ing after adjective + preposition: good at, afraid of, interested in, keen on.',
    'Talking about yourself: I like it because…, I usually…, I prefer…, I think…'
  ],
  questions: [
    {
      id: 'e2q1',
      prompt: 'Match the adjectives to the people.',
      hint: 'Remember the quiz in the chat.',
      explanation: 'reliable — always does what he promises; generous — shares things; anxious — worried in crowds; patient — can wait calmly.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'reliable' }, right: { label: 'always does what he promises' } },
            { left: { label: 'generous' }, right: { label: 'shares her snacks' } },
            { left: { label: 'anxious' }, right: { label: 'feels worried in crowds' } },
            { left: { label: 'patient' }, right: { label: 'can wait calmly' } }
          ]
        }
      }
    },
    {
      id: 'e2q2',
      prompt: 'un- or dis-? Sort the words.',
      hint: 'dis- often goes with verbs: agree, like, appear.',
      explanation: 'un-: unkind, unlucky, unhappy. dis-: disagree, dislike, disappear.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'u', label: 'un-' },
            { id: 'd', label: 'dis-' }
          ],
          tiles: [
            { id: 'a', label: 'kind', bin: 'u' },
            { id: 'b', label: 'agree', bin: 'd' },
            { id: 'c', label: 'lucky', bin: 'u' },
            { id: 'd', label: 'like', bin: 'd' },
            { id: 'e', label: 'happy', bin: 'u' },
            { id: 'f', label: 'appear', bin: 'd' }
          ]
        }
      }
    },
    {
      id: 'e2q3',
      prompt: 'Write the opposite.',
      hint: 'Add a prefix to “reliable”.',
      explanation: 'reliable → unreliable.',
      widget: { type: 'text_answer', props: { before: 'He never keeps his promises. He’s', after: '.', answer: 'unreliable', width: 11 } }
    },
    {
      id: 'e2q4',
      prompt: 'Write the -ing form of the verb “watch”.',
      hint: 'After “enjoy” we use -ing.',
      explanation: 'Aziz enjoys watching films in English.',
      widget: { type: 'text_answer', props: { before: 'Aziz enjoys', after: 'films in English.', answer: 'watching', width: 9 } }
    },
    {
      id: 'e2q5',
      prompt: 'Complete with the right preposition.',
      hint: 'good at · afraid of · interested in',
      explanation: 'Jo is good at listening to people. Mike is afraid of losing his friends.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Jo is good' }, { blank: 'at' }, { text: 'listening to people. Mike is afraid' }, { blank: 'of' }, { text: 'losing his friends.' }],
          bank: ['at', 'of', 'in', 'on']
        }
      }
    },
    {
      id: 'e2q6',
      prompt: 'Tap all the correct sentences.',
      hint: 'After enjoy, love, good at… use -ing.',
      explanation: 'Correct: “I really enjoy visiting museums”, “Playing chess is fun”, “She is interested in making music”. Wrong: “I love go shopping”, “He is good at teach”.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'I really enjoy visiting museums.', match: true },
            { id: 'b', text: 'I love go shopping.', match: false },
            { id: 'c', text: 'Playing chess is fun.', match: true },
            { id: 'd', text: 'He is good at teach.', match: false },
            { id: 'e', text: 'She is interested in making music.', match: true }
          ]
        }
      }
    },
    {
      id: 'e2q7',
      prompt: 'Correct the sentence: “Play a musical instrument is fun.” Write the first word.',
      hint: 'The subject of the sentence is an -ing form.',
      explanation: 'Playing a musical instrument is fun.',
      widget: { type: 'text_answer', props: { after: 'a musical instrument is fun.', answer: 'playing', width: 9 } }
    },
    {
      id: 'e2q8',
      prompt: 'True or false? (the radio show)',
      hint: 'What did Dr Hayes say?',
      explanation: 'Online friends can support you at night. Real friends help us create memories. Both kinds of friends are good — in different ways.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Online friends can give support at night.', value: true },
            { text: 'Dr Hayes says we don’t need real friends.', value: false },
            { text: 'With real friends we create memories together.', value: true },
            { text: 'Only online friends are good for us.', value: false }
          ]
        }
      }
    },
    {
      id: 'e2q9',
      prompt: 'Put Aziz’s answer in order.',
      hint: 'Start with “I like it because…”.',
      explanation: 'I like it because I love films.',
      widget: { type: 'sentence_order', props: { words: ['I', 'like', 'it', 'because', 'I', 'love', 'films.'] } }
    },
    {
      id: 'e2q10',
      prompt: 'Tap the words that describe a good friend.',
      hint: 'Good qualities only.',
      explanation: 'honest, reliable and generous are good qualities. unkind and unreliable are not.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'honest', match: true },
            { id: 'b', text: 'unkind', match: false },
            { id: 'c', text: 'reliable', match: true },
            { id: 'd', text: 'unreliable', match: false },
            { id: 'e', text: 'generous', match: true }
          ]
        }
      }
    }
  ]
};
