import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G3 } from './eng-cast';

/** Student's Book: Life skills “Decision-making: Evaluating options”. */
export const ENG_18: BoardLesson = {
  n: 18,
  label: '18',
  lang: 'en',
  group: ENG_G3,
  easyLang: 'uz',
  title: 'Life skills: Evaluating options',
  section: 'Life skills',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Timur can’t decide what to do in the summer holidays. Malika helps him think it through.',
      easy: 'Timur yozgi taʼtilda nima qilishni hal qila olmayapti. option — variant, pros and cons — yaxshi va yomon tomonlar, advantage — afzallik, disadvantage — kamchilik, decide — qaror qilmoq.',
      draw: [],
      scene: {
        style: 'chat',
        place: '☕ After school',
        lines: [
          { who: 'timur', text: 'I have three options: a summer job, an English course, or a trip with my cousins.', uz: 'Mening uchta variantim bor: yozgi ish, ingliz tili kursi yoki amakivachchalarim bilan sayohat.' },
          { who: 'malika', text: 'Let’s think about the pros and cons of each one.', uz: 'Keling, har birining yaxshi va yomon tomonlarini oʻylab koʻramiz.' },
          { who: 'timur', text: 'The job pays money, but I’d have less free time.', uz: 'Ish pul toʻlaydi, lekin boʻsh vaqtim kamroq boʻlardi.' },
          { who: 'malika', text: 'The course would help with your exams. That’s a big advantage.', uz: 'Kurs imtihonlaringga yordam beradi. Bu katta afzallik.' },
          { who: 'timur', text: 'True. On the other hand, the trip would be more fun!', uz: 'Toʻgʻri. Boshqa tomondan, sayohat qiziqroq boʻlardi!' }
        ],
        words: [
          { en: 'option', uz: 'variant' },
          { en: 'pros and cons', uz: 'yaxshi va yomon tomonlar' },
          { en: 'advantage', uz: 'afzallik' },
          { en: 'on the other hand', uz: 'boshqa tomondan' }
        ]
      },
      next: 'How to decide'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Good decisions follow simple steps. One: list all your options. Two: write the pros and cons of each. Three: think about what matters most to you. Four: choose, and then check how it went.',
      easy: 'Qaror qabul qilish bosqichlari: 1) barcha variantlarni yozing; 2) har birining yaxshi va yomon tomonlarini yozing; 3) siz uchun eng muhimi nima — oʻylang; 4) tanlang va keyin natijani baholang.',
      draw: [
        { t: 'title', text: 'Four steps to decide' },
        { t: 'list', x: 6, y: 16, items: ['1 List your options.', '2 Write the pros and cons.', '3 Think what matters most.', '4 Choose — then review.'], color: 'blue' }
      ],
      next: 'Useful language'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Useful language for evaluating options: The main advantage is… The problem with this is… On the one hand… on the other hand… If I chose this, I would… All things considered, I think the best option is…',
      easy: 'Foydali iboralar: The main advantage is… — asosiy afzalligi…; The problem with this is… — muammosi…; On the one hand… on the other hand… — bir tomondan… boshqa tomondan…; All things considered… — hammasini hisobga olib…',
      draw: [
        { t: 'title', text: 'Useful language' },
        { t: 'text', x: 4, y: 16, text: 'The main advantage is …', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 24, text: 'The problem with this is …', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 32, text: 'On the one hand … on the other hand …', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 40, text: 'If I chose this, I would …', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 48, text: 'All things considered, the best is …', size: 's', color: 'orange' }
      ],
      next: 'Timur decides'
    },
    {
      kind: 'scene',
      say: 'Timur makes his decision.',
      easy: 'Timur hammasini hisobga olib qaror qildi: iyulda kurs, avgustda sayohat — ikki variantni birlashtirdi.',
      draw: [],
      scene: {
        style: 'chat',
        place: '☕ A week later',
        lines: [
          { who: 'timur', text: 'All things considered, I think the course is the best option.', uz: 'Hammasini hisobga olib, menimcha kurs eng yaxshi variant.' },
          { who: 'malika', text: 'What about the trip?', uz: 'Sayohat-chi?' },
          { who: 'timur', text: 'The course is in July, so I can go on the trip in August!', uz: 'Kurs iyulda, shuning uchun avgustda sayohatga bora olaman!' },
          { who: 'malika', text: 'Perfect. Sometimes you can combine two options.', uz: 'Ajoyib. Baʼzan ikki variantni birlashtirish mumkin.' }
        ],
        words: [
          { en: 'all things considered', uz: 'hammasini hisobga olib' },
          { en: 'combine', uz: 'birlashtirmoq' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'To decide well: list options, write pros and cons, think what matters most, choose and review.',
    'Useful phrases: The main advantage is…, The problem with this is…, On the one hand… on the other hand…',
    'All things considered, the best option is… — to give your final decision.'
  ],
  questions: [
    {
      id: 'e18q1',
      prompt: 'Put the decision steps in order.',
      hint: 'Start with your options.',
      explanation: 'List options → pros and cons → what matters most → choose and review.',
      widget: { type: 'step_order', props: { steps: ['List your options.', 'Write the pros and cons.', 'Think what matters most.', 'Choose and then review.'] } }
    },
    {
      id: 'e18q2',
      prompt: 'Match the words to their meanings.',
      hint: 'pros = good points.',
      explanation: 'option — a possible choice; advantage — a good point; disadvantage — a bad point; combine — put together.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'option' }, right: { label: 'a possible choice' } },
            { left: { label: 'advantage' }, right: { label: 'a good point' } },
            { left: { label: 'disadvantage' }, right: { label: 'a bad point' } },
            { left: { label: 'combine' }, right: { label: 'put together' } }
          ]
        }
      }
    },
    {
      id: 'e18q3',
      prompt: 'Sort the ideas about a summer job.',
      hint: 'Good or bad point?',
      explanation: 'Pros: earn money, get experience. Cons: less free time, tiring.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'pro', label: 'pros' }, { id: 'con', label: 'cons' }],
          tiles: [
            { id: 'a', label: 'earn money', bin: 'pro' },
            { id: 'b', label: 'get experience', bin: 'pro' },
            { id: 'c', label: 'less free time', bin: 'con' },
            { id: 'd', label: 'can be tiring', bin: 'con' }
          ]
        }
      }
    },
    {
      id: 'e18q4',
      prompt: 'Complete the phrase.',
      hint: 'On the one hand…',
      explanation: 'On the one hand it’s fun; on the other hand it’s expensive.',
      widget: { type: 'text_answer', props: { before: 'On the one hand it’s fun; on the', after: 'hand it’s expensive.', answer: 'other', width: 6 } }
    },
    {
      id: 'e18q5',
      prompt: 'Which phrase gives a final decision?',
      hint: 'After thinking about everything.',
      explanation: '“All things considered, …” introduces the final decision.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['All things considered, …', 'The problem with this is …', 'On the one hand …', 'The main advantage is …'], answerIndex: 0 } }
    },
    {
      id: 'e18q6',
      prompt: 'True or false?',
      hint: 'Remember Timur’s choice.',
      explanation: 'Timur had three options; he chose the course and the trip later; the job would leave less free time.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Timur had three options.', value: true },
            { text: 'Timur chose the summer job.', value: false },
            { text: 'He can go on the trip in August.', value: true },
            { text: 'The job would give him more free time.', value: false }
          ]
        }
      }
    },
    {
      id: 'e18q7',
      prompt: 'Put the words in order.',
      hint: 'Start with “The main”.',
      explanation: 'The main advantage is the price.',
      widget: { type: 'sentence_order', props: { words: ['The', 'main', 'advantage', 'is', 'the', 'price.'] } }
    }
  ]
};
