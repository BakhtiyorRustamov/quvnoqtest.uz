import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G2 } from './eng-cast';

/** Student's Book: Unit 6 “Take care of yourself” (pp. 36–39) — health verbs, some/any/every/no words, modals of obligation and advice. */
export const ENG_8: BoardLesson = {
  n: 8,
  label: '8',
  lang: 'en',
  group: ENG_G2,
  easyLang: 'uz',
  title: 'Take care of yourself',
  section: 'Unit 6',
  cast: {
    ...ENG_CAST,
    nurse: { name: 'School nurse', emoji: '', color: '#2C7A7B', azure: '', gender: 'f' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Timur doesn’t feel well. He goes to the school nurse.',
      easy: 'Timurning tobi yoʻq, maktab hamshirasiga bordi. Cough — yoʻtalmoq, ache — ogʻrimoq, yawn — esnamoq, breathe — nafas olmoq, blow your nose — burun qoqmoq, recover — tuzalmoq.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🩺 The school nurse’s room',
        lines: [
          { who: 'nurse', text: 'Hello, Timur. What’s the matter?', uz: 'Salom, Timur. Nima boʻldi?' },
          { who: 'timur', text: 'My head aches, and I keep coughing. I can’t stop yawning in class either.', uz: 'Boshim ogʻriyapti va tinmay yoʻtalyapman. Darsda esnashdan ham toʻxtay olmayapman.' },
          { who: 'nurse', text: 'Can you breathe normally? Take a deep breath… Good.', uz: 'Normal nafas ola olyapsanmi? Chuqur nafas ol… Yaxshi.' },
          { who: 'nurse', text: 'It’s just a cold. Blow your nose, drink warm tea and get some sleep.', uz: 'Bu shunchaki shamollash. Burningni qoq, iliq choy ich va yaxshilab uxla.' },
          { who: 'nurse', text: 'You’ll recover in a few days.', uz: 'Bir necha kunda tuzalib ketasan.' }
        ],
        words: [
          { en: 'aches', uz: 'ogʻriydi' },
          { en: 'coughing', uz: 'yoʻtalish' },
          { en: 'yawning', uz: 'esnash' },
          { en: 'breathe', uz: 'nafas olmoq' },
          { en: 'Blow your nose', uz: 'burningni qoq' },
          { en: 'recover', uz: 'tuzalmoq' }
        ]
      },
      next: 'More health verbs'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Health verbs: your head can ache; you cough when you have a cold; you yawn when you are tired; you blink your eyes; your heart beats; if you cut your finger, it bleeds; you can burn your hand on a hot pan; and if you injure your leg, you need time to recover.',
      easy: 'ache — ogʻrimoq, cough — yoʻtalmoq, yawn — esnamoq, blink — koʻz qisib-ochmoq, beat — (yurak) urmoq, cut — kesib olmoq, bleed — qon oqmoq, burn — kuydirmoq, injure — jarohatlamoq, recover — tuzalmoq.',
      draw: [
        { t: 'title', text: 'Health verbs' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['verb', 'example'],
            ['ache', 'My head aches.'],
            ['cough', 'I have a cold, I cough.'],
            ['bleed', 'My finger is bleeding.'],
            ['injure', 'He injured his knee.'],
            ['recover', 'She recovered quickly.']
          ]
        }
      ],
      next: 'Now the grammar'
    },
    {
      kind: 'scene',
      say: 'Back in class, Mr Collins talks about screens at bedtime. Listen to must, have to, should and don’t have to.',
      easy: 'Must / have to — majburiyat (shart). Mustn’t — taqiq (mumkin emas). Don’t have to — shart emas. Should — maslahat (kerak boʻlardi).',
      draw: [],
      scene: {
        style: 'chat',
        place: '📵 Screens at bedtime',
        lines: [
          { who: 'narrator', text: 'Light from phones keeps your brain awake. You should stop using screens an hour before bed.', uz: 'Telefon nuri miyani uygʻoq tutadi. Uxlashdan bir soat oldin ekranlardan foydalanishni toʻxtatishingiz kerak.' },
          { who: 'malika', text: 'But I have to check my messages for homework!', uz: 'Lekin uy vazifasi uchun xabarlarimni tekshirishim shart!' },
          { who: 'narrator', text: 'Then check them early. You don’t have to answer every message at night.', uz: 'Unda erta tekshir. Kechasi har bir xabarga javob berish shart emas.' },
          { who: 'timur', text: 'In my brother’s dorm, students mustn’t use phones after ten.', uz: 'Akamning yotoqxonasida talabalar soat oʻndan keyin telefon ishlatishi mumkin emas.' },
          { who: 'narrator', text: 'That’s a strict rule, but teenagers must sleep at least eight hours.', uz: 'Bu qattiq qoida, lekin oʻsmirlar kamida sakkiz soat uxlashi shart.' }
        ],
        words: [
          { en: 'should', uz: '…ish kerak (maslahat)' },
          { en: 'have to', uz: 'majbur' },
          { en: 'don’t have to', uz: 'shart emas' },
          { en: 'mustn’t', uz: 'mumkin emas' },
          { en: 'must', uz: 'shart' }
        ]
      },
      next: 'Show me the rule'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Must and have to show obligation: you must sleep eight hours, I have to go to school. Mustn’t means it is not allowed: you mustn’t use phones after ten. Don’t have to means it is not necessary: you don’t have to answer every message. Should gives advice: you should stop using screens before bed. And remember words with some, any, every and no: someone, anything, everybody, nowhere.',
      easy: 'must / have to — shart; mustn’t — mumkin emas (taqiq); don’t have to — shart emas; should — maslahat. Diqqat: mustn’t va don’t have to — maʼnosi har xil! Shuningdek: someone — kimdir, anything — biror narsa, everybody — hamma, nowhere — hech qayerda.',
      draw: [
        { t: 'title', text: 'Obligation and advice' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['modal', 'meaning'],
            ['must / have to', 'it is necessary'],
            ['mustn’t', 'it is not allowed'],
            ['don’t have to', 'it is not necessary'],
            ['should', 'it is a good idea']
          ]
        },
        { t: 'text', x: 6, y: 50, text: 'mustn’t ≠ don’t have to!', size: 's', color: 'red' },
        { t: 'text', x: 6, y: 58, text: 'someone · anything · everybody · nowhere', size: 's', color: 'purple' }
      ],
      next: 'Giving advice'
    },
    {
      kind: 'scene',
      say: 'Malika and Timur discuss how to stay healthy during exams. Listen to how they discuss options.',
      easy: 'Variantlarni muhokama qilish: What about…? / That’s a good idea because… / I think … is better. Imtihon paytida sogʻlom qolish: uyqu, sport, sogʻlom ovqat.',
      draw: [],
      scene: {
        style: 'phone',
        place: '📱 Exam week',
        lines: [
          { who: 'malika', text: 'Exams start next week. What should we do to stay healthy?', uz: 'Imtihonlar keyingi hafta boshlanadi. Sogʻlom qolish uchun nima qilishimiz kerak?' },
          { who: 'timur', text: 'What about going for a run every morning?', uz: 'Har kuni ertalab yugurishga chiqsak-chi?' },
          { who: 'malika', text: 'That’s a good idea because exercise helps you think.', uz: 'Yaxshi fikr, chunki sport fikrlashga yordam beradi.' },
          { who: 'timur', text: 'And we mustn’t study all night. Everybody needs sleep.', uz: 'Va tun boʻyi oʻqimasligimiz kerak. Hammaga uyqu kerak.' },
          { who: 'malika', text: 'I agree. I think a good sleep is better than an extra hour of study.', uz: 'Roziman. Menimcha, yaxshi uyqu qoʻshimcha bir soat oʻqishdan yaxshiroq.' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Health verbs: ache, cough, yawn, blink, breathe, bleed, burn, cut, injure, recover, blow your nose.',
    'must / have to — necessary; mustn’t — not allowed; don’t have to — not necessary; should — advice.',
    'mustn’t and don’t have to are different!',
    'some/any/every/no words: someone, anything, everybody, nowhere.',
    'Discussing options: What about…? That’s a good idea because… I think … is better.'
  ],
  questions: [
    {
      id: 'e8q1',
      prompt: 'Match the verbs to the situations.',
      hint: 'What happens when you are tired? When you have a cold?',
      explanation: 'yawn — when you are tired; cough — when you have a cold; bleed — when you cut your finger; recover — when you get better.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'yawn' }, right: { label: 'when you are tired' } },
            { left: { label: 'cough' }, right: { label: 'when you have a cold' } },
            { left: { label: 'bleed' }, right: { label: 'when you cut your finger' } },
            { left: { label: 'recover' }, right: { label: 'when you get better' } }
          ]
        }
      }
    },
    {
      id: 'e8q2',
      prompt: 'Choose the correct modal.',
      hint: 'It is not necessary → don’t have to.',
      explanation: 'It’s Sunday, so you don’t have to get up early.',
      widget: { type: 'mcq', props: { prompt: 'It’s Sunday, so you ___ get up early.', choices: ['don’t have to', 'mustn’t', 'must', 'should'], answerIndex: 0 } }
    },
    {
      id: 'e8q3',
      prompt: 'Choose the correct modal.',
      hint: 'It is not allowed → mustn’t.',
      explanation: 'You mustn’t use your phone during the exam.',
      widget: { type: 'mcq', props: { prompt: 'You ___ use your phone during the exam.', choices: ['mustn’t', 'don’t have to', 'should', 'have to'], answerIndex: 0 } }
    },
    {
      id: 'e8q4',
      prompt: 'Sort the sentences by meaning.',
      hint: 'Necessary, not allowed, or advice?',
      explanation: 'Necessary: You must wear a seat belt. Not allowed: You mustn’t run by the pool. Advice: You should drink more water.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'n', label: 'necessary' },
            { id: 'x', label: 'not allowed' },
            { id: 'a', label: 'advice' }
          ],
          tiles: [
            { id: 't1', label: 'You must wear a seat belt.', bin: 'n' },
            { id: 't2', label: 'You mustn’t run by the pool.', bin: 'x' },
            { id: 't3', label: 'You should drink more water.', bin: 'a' },
            { id: 't4', label: 'I have to go to school.', bin: 'n' },
            { id: 't5', label: 'You mustn’t cheat.', bin: 'x' },
            { id: 't6', label: 'You should go to bed earlier.', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'e8q5',
      prompt: 'Complete with a word with every/some/no.',
      hint: 'All people = every + body.',
      explanation: 'Everybody needs sleep.',
      widget: { type: 'text_answer', props: { after: 'needs sleep.', answer: ['everybody', 'everyone'], width: 9 } }
    },
    {
      id: 'e8q6',
      prompt: 'True or false?',
      hint: 'Think about the nurse’s advice and Mr Collins’ talk.',
      explanation: 'Timur has a cold; Mr Collins says to stop screens an hour before bed; teenagers must sleep at least eight hours.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'The nurse says Timur has a cold.', value: true },
            { text: 'Mr Collins says you should use your phone in bed.', value: false },
            { text: 'Teenagers must sleep at least eight hours.', value: true },
            { text: '“Don’t have to” means “not allowed”.', value: false }
          ]
        }
      }
    },
    {
      id: 'e8q7',
      prompt: 'Complete the advice.',
      hint: 'Advice → should.',
      explanation: 'You should stop using screens an hour before bed.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'You' }, { blank: 'should' }, { text: 'stop using screens an hour before bed, but you' }, { blank: 'don’t have to' }, { text: 'answer every message at night.' }],
          bank: ['should', 'don’t have to', 'mustn’t', 'must not']
        }
      }
    },
    {
      id: 'e8q8',
      prompt: 'Put the words in order.',
      hint: 'A suggestion: What about…?',
      explanation: 'What about going for a run every morning?',
      widget: { type: 'sentence_order', props: { words: ['What', 'about', 'going', 'for', 'a', 'run', 'every', 'morning?'] } }
    }
  ]
};
