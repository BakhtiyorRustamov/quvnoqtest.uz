import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G4 } from './eng-cast';

/** Student's Book: Culture “Social media”. */
export const ENG_21: BoardLesson = {
  n: 21,
  label: '21',
  lang: 'en',
  group: ENG_G4,
  easyLang: 'uz',
  title: 'Culture: Social media',
  section: 'Culture 4',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Mr Collins asks the class how teenagers use social media around the world.',
      easy: 'Mr Collins dunyo boʻylab oʻsmirlar ijtimoiy tarmoqlardan qanday foydalanishini soʻraydi. screen time — ekran oldida oʻtkaziladigan vaqt, online — internetda, content — kontent (mazmun), influencer — taʼsir qiluvchi bloger.',
      draw: [],
      scene: {
        style: 'interview',
        place: '🏫 English lesson · social media',
        lines: [
          { who: 'narrator', text: 'Surveys show that many teenagers spend several hours online every day.', uz: 'Soʻrovlar koʻp oʻsmirlar har kuni bir necha soat internetda oʻtkazishini koʻrsatadi.' },
          { who: 'malika', text: 'Most of my friends use messaging apps more than anything else.', uz: 'Doʻstlarimning koʻpi hammadan koʻra messenjerlardan koʻproq foydalanadi.' },
          { who: 'timur', text: 'I watch short videos — mostly sport and science content.', uz: 'Men qisqa videolar koʻraman — asosan sport va fan haqida.' },
          { who: 'narrator', text: 'Social media helps us keep in touch and learn. But too much screen time can affect sleep and mood.', uz: 'Ijtimoiy tarmoqlar aloqada boʻlish va oʻrganishga yordam beradi. Lekin ekran oldida haddan tashqari koʻp vaqt uyqu va kayfiyatga taʼsir qilishi mumkin.' }
        ],
        words: [
          { en: 'survey', uz: 'soʻrovnoma' },
          { en: 'messaging apps', uz: 'messenjerlar' },
          { en: 'content', uz: 'kontent' },
          { en: 'screen time', uz: 'ekran vaqti' },
          { en: 'affect', uz: 'taʼsir qilmoq' }
        ]
      },
      next: 'Pros and cons'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Social media has advantages: keeping in touch with family far away, learning new skills, sharing creative work. It also has disadvantages: fake news, cyberbullying, less sleep, and comparing yourself with others.',
      easy: 'Afzalliklari: uzoqdagi oila bilan aloqa, yangi koʻnikmalar oʻrganish, ijodiy ishlarni ulashish. Kamchiliklari: yolgʻon xabarlar, kiberbulling (internetda haqorat), kam uyqu, oʻzini boshqalar bilan solishtirish.',
      draw: [
        { t: 'title', text: 'Social media: pros and cons' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 10, text: 'pros', color: 'green' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 10, text: 'cons', color: 'red' },
        { t: 'list', x: 6, y: 30, items: ['keep in touch', 'learn new skills', 'share creative work'], color: 'green' },
        { t: 'list', x: 54, y: 30, items: ['fake news', 'cyberbullying', 'less sleep'], color: 'red' }
      ],
      next: 'Stay safe online'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Some tips to stay safe and healthy online. Keep your profile private. Never share your password or home address. Check news before you share it. Don’t use your phone for an hour before bed. And be kind in comments — real people read them.',
      easy: 'Internetda xavfsiz boʻlish: profilni yopiq saqlang; parol va manzilni hech kimga bermang; xabarni ulashishdan oldin tekshiring; uxlashdan bir soat oldin telefonni qoʻying; izohlarda mehribon boʻling.',
      draw: [
        { t: 'title', text: 'Stay safe online' },
        { t: 'list', x: 6, y: 16, items: ['Keep your profile private.', 'Never share your password.', 'Check news before sharing.', 'No phone an hour before bed.', 'Be kind in comments.'], color: 'blue' }
      ],
      next: 'To the exercises'
    }
  ],
  summary: [
    'Teenagers spend a lot of time online: messaging apps, short videos, sharing photos.',
    'Pros: keeping in touch, learning, creativity. Cons: fake news, cyberbullying, less sleep.',
    'Stay safe: private profile, never share passwords, check news, be kind in comments.'
  ],
  questions: [
    {
      id: 'e21q1',
      prompt: 'Sort the ideas.',
      hint: 'Good or bad side?',
      explanation: 'Pros: keep in touch with family, learn new skills, share creative work. Cons: fake news, cyberbullying, less sleep.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'pro', label: 'pros' }, { id: 'con', label: 'cons' }],
          tiles: [
            { id: 'a', label: 'keep in touch with family', bin: 'pro' },
            { id: 'b', label: 'learn new skills', bin: 'pro' },
            { id: 'c', label: 'share creative work', bin: 'pro' },
            { id: 'd', label: 'fake news', bin: 'con' },
            { id: 'e', label: 'cyberbullying', bin: 'con' },
            { id: 'f', label: 'less sleep', bin: 'con' }
          ]
        }
      }
    },
    {
      id: 'e21q2',
      prompt: 'Match the words to their meanings.',
      hint: 'screen time = time with devices.',
      explanation: 'survey — questions asked to many people; screen time — time spent on devices; fake news — false information; affect — change or influence.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'survey' }, right: { label: 'questions asked to many people' } },
            { left: { label: 'screen time' }, right: { label: 'time spent on devices' } },
            { left: { label: 'fake news' }, right: { label: 'false information' } },
            { left: { label: 'affect' }, right: { label: 'change or influence' } }
          ]
        }
      }
    },
    {
      id: 'e21q3',
      prompt: 'Which is a good online safety tip?',
      hint: 'Protect your personal information.',
      explanation: 'Never share your password.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Never share your password.', 'Post your home address.', 'Share news without checking.', 'Accept all strangers as friends.'], answerIndex: 0 } }
    },
    {
      id: 'e21q4',
      prompt: 'True or false?',
      hint: 'Think about the lesson.',
      explanation: 'Too much screen time can affect sleep; you should check news before sharing; a private profile is safer.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Too much screen time can affect sleep.', value: true },
            { text: 'You should share news without checking it.', value: false },
            { text: 'A private profile is safer.', value: true },
            { text: 'Comments are never read by real people.', value: false }
          ]
        }
      }
    },
    {
      id: 'e21q5',
      prompt: 'Complete the tip.',
      hint: 'Kind, not rude.',
      explanation: 'Be kind in comments — real people read them.',
      widget: { type: 'text_answer', props: { before: 'Be', after: 'in comments — real people read them.', answer: 'kind', width: 5 } }
    },
    {
      id: 'e21q6',
      prompt: 'Put the words in order.',
      hint: 'Start with “Check”.',
      explanation: 'Check the news before you share it.',
      widget: { type: 'sentence_order', props: { words: ['Check', 'the', 'news', 'before', 'you', 'share', 'it.'] } }
    }
  ]
};
