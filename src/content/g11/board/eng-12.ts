import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G2 } from './eng-cast';

/** Student's Book: Life Skills “Creativity and innovation: Creative writing” (pp. 50–51). */
export const ENG_12: BoardLesson = {
  n: 12,
  label: '12',
  lang: 'en',
  group: ENG_G2,
  easyLang: 'uz',
  title: 'Life skills: Creative writing',
  section: 'Life Skills 2',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'The school magazine has a creative writing competition. Malika doesn’t know where to start.',
      easy: 'Maktab jurnalida ijodiy yozuv tanlovi bor. Malika qayerdan boshlashni bilmaydi. Mr Collins gʻoya topish usulini koʻrsatadi: brainstorm — miyaga kelgan hamma gʻoyani yozib olish.',
      draw: [],
      scene: {
        style: 'chat',
        place: '📝 The school library',
        lines: [
          { who: 'malika', text: 'I want to enter the writing competition, but I have no ideas!', uz: 'Yozuv tanloviga qatnashmoqchiman, lekin hech gʻoyam yoʻq!' },
          { who: 'narrator', text: 'Let’s brainstorm. Write down every idea that comes into your head. Don’t judge them yet.', uz: 'Keling, gʻoyalarni yigʻamiz. Boshingga kelgan har bir gʻoyani yoz. Hozircha ularni baholama.' },
          { who: 'malika', text: 'A lost key… a talking cat… a girl who can stop time…', uz: 'Yoʻqolgan kalit… gapiradigan mushuk… vaqtni toʻxtata oladigan qiz…' },
          { who: 'narrator', text: 'Great! Now ask “What if?”. What if the girl stops time during an exam?', uz: 'Zoʻr! Endi “Agar…-chi?” deb soʻra. Agar qiz imtihon paytida vaqtni toʻxtatsa-chi?' },
          { who: 'malika', text: 'Oh, I like that! She has to choose: cheat or be honest.', uz: 'Oh, bu menga yoqdi! U tanlashi kerak: aldash yoki halol boʻlish.' }
        ],
        words: [
          { en: 'brainstorm', uz: 'gʻoyalar yigʻish' },
          { en: 'judge', uz: 'baholamoq' },
          { en: 'What if', uz: 'Agar … boʻlsa-chi?' },
          { en: 'honest', uz: 'halol' }
        ]
      },
      next: 'How do I build a story?'
    },
    {
      kind: 'card',
      clear: true,
      say: 'A good story has a clear shape. The beginning introduces the main character and the setting. Then comes a problem. The middle shows how the character tries to solve it, and the tension grows. The climax is the most exciting moment. The ending shows what happened and how the character changed.',
      easy: 'Hikoya tuzilishi: boshlanish (qahramon va joy), muammo, oʻrta qism (qahramon harakat qiladi, keskinlik oshadi), kulminatsiya (eng qiziq lahza), yakun (nima boʻldi, qahramon qanday oʻzgardi).',
      draw: [
        { t: 'title', text: 'The shape of a story' },
        { t: 'box', id: 'a', x: 2, y: 40, w: 18, h: 11, text: 'beginning', color: 'blue' },
        { t: 'box', id: 'b', x: 22, y: 30, w: 18, h: 11, text: 'problem', color: 'orange' },
        { t: 'box', id: 'c', x: 42, y: 20, w: 18, h: 11, text: 'middle', color: 'purple' },
        { t: 'box', id: 'd', x: 62, y: 12, w: 18, h: 11, text: 'climax', color: 'red' },
        { t: 'box', id: 'e', x: 82, y: 30, w: 16, h: 11, text: 'ending', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' },
        { t: 'arrow', from: 'd', to: 'e' }
      ],
      next: 'Make it come alive'
    },
    {
      kind: 'scene',
      say: 'Malika reads her first sentence. Mr Collins shows her how to make it more interesting.',
      easy: 'Hikoyani jonlantirish: “show, don’t tell” — his-tuygʻuni toʻgʻridan aytmang, harakat orqali koʻrsating. Beshta sezgi (koʻrish, eshitish, hid, taʼm, teginish) va jonli feʼllar ishlating.',
      draw: [],
      scene: {
        style: 'interview',
        place: 'English club · show, don’t tell',
        lines: [
          { who: 'malika', text: 'My first sentence is: “Zarina was nervous before the exam.”', uz: 'Birinchi gapim: “Zarina imtihon oldidan hayajonlangan edi.”' },
          { who: 'narrator', text: 'Try “show, don’t tell”. What does a nervous person do?', uz: '“Ayt emas, koʻrsat” usulini sinab koʻr. Hayajonlangan odam nima qiladi?' },
          { who: 'malika', text: '“Zarina’s hands were shaking, and she could hear her heart beating.”', uz: '“Zarinaning qoʻllari titrar, yuragining urishini eshitardi.”' },
          { who: 'narrator', text: 'Much better! You used the senses and strong verbs. The reader feels it too.', uz: 'Ancha yaxshi! Sezgilar va kuchli feʼllardan foydalanding. Oʻquvchi ham buni his qiladi.' }
        ]
      },
      next: 'Show me the tips'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Tips for creative writing. Brainstorm, then ask “What if?”. Plan the shape: beginning, problem, climax, ending. Show, don’t tell. Use the five senses and strong verbs: instead of “walked” say “rushed” or “crept”. Use direct speech to bring characters to life. And always read your story again and improve it.',
      easy: 'Maslahatlar: gʻoyalar yigʻing, “What if?” deb soʻrang; tuzilmani rejalashtiring; koʻrsating, aytmang; beshta sezgi va kuchli feʼllar (walked oʻrniga rushed, crept); toʻgʻridan-toʻgʻri nutq; qayta oʻqib, yaxshilang.',
      draw: [
        { t: 'title', text: 'Creative writing tips' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['tell (weak)', 'show (strong)'],
            ['She was nervous.', 'Her hands were shaking.'],
            ['He was happy.', 'He couldn’t stop smiling.'],
            ['He walked fast.', 'He rushed down the street.']
          ]
        },
        { t: 'text', x: 6, y: 44, text: 'senses · strong verbs · direct speech · edit!', size: 's', color: 'purple' }
      ],
      next: 'To the exercises'
    }
  ],
  summary: [
    'Find ideas: brainstorm and ask “What if?”.',
    'Story shape: beginning → problem → middle → climax → ending.',
    'Show, don’t tell: “Her hands were shaking” instead of “She was nervous”.',
    'Use the five senses, strong verbs and direct speech; read your story again and improve it.'
  ],
  questions: [
    {
      id: 'e12q1',
      prompt: 'Put the parts of a story in order.',
      hint: 'The climax is the most exciting moment.',
      explanation: 'beginning → problem → climax → ending',
      widget: { type: 'step_order', props: { steps: ['beginning', 'problem', 'climax', 'ending'] } }
    },
    {
      id: 'e12q2',
      prompt: 'Show or tell? Sort the sentences.',
      hint: '“Show” describes actions and senses.',
      explanation: 'Tell: She was sad. He was scared. Show: Tears ran down her face. His legs were shaking.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 't', label: 'tell' },
            { id: 's', label: 'show' }
          ],
          tiles: [
            { id: 't1', label: 'She was sad.', bin: 't' },
            { id: 't2', label: 'Tears ran down her face.', bin: 's' },
            { id: 't3', label: 'He was scared.', bin: 't' },
            { id: 't4', label: 'His legs were shaking.', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'e12q3',
      prompt: 'Choose a stronger verb for “walked quickly”.',
      hint: 'Moving very fast.',
      explanation: '“Rushed” is a strong verb that means “walked or ran very quickly”.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['rushed', 'went', 'was', 'did'], answerIndex: 0 } }
    },
    {
      id: 'e12q4',
      prompt: 'Complete the question that helps you find ideas.',
      hint: 'Two words: “What …?”',
      explanation: 'Ask “What if…?” to turn an idea into a story.',
      widget: { type: 'text_answer', props: { before: 'What', after: 'the girl stops time during an exam?', answer: 'if', width: 4 } }
    },
    {
      id: 'e12q5',
      prompt: 'True or false?',
      hint: 'Think about Mr Collins’ advice.',
      explanation: 'When you brainstorm, you don’t judge ideas; the climax is the most exciting moment; you should edit your story.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'When you brainstorm, you judge every idea immediately.', value: false },
            { text: 'The climax is the most exciting moment of the story.', value: true },
            { text: 'Good writers read their story again and improve it.', value: true },
            { text: '“Show, don’t tell” means writing only about feelings.', value: false }
          ]
        }
      }
    },
    {
      id: 'e12q6',
      prompt: 'Match the senses to the examples.',
      hint: 'Which part of the body?',
      explanation: 'sight — the bright blue sky; sound — the bell rang loudly; smell — fresh bread; touch — the cold, wet stone.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'sight' }, right: { label: 'the bright blue sky' } },
            { left: { label: 'sound' }, right: { label: 'the bell rang loudly' } },
            { left: { label: 'smell' }, right: { label: 'fresh bread from the oven' } },
            { left: { label: 'touch' }, right: { label: 'the cold, wet stone' } }
          ]
        }
      }
    }
  ]
};
