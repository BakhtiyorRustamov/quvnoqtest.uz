import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G1 } from './eng-cast';

/** Student's Book: Life Skills “Collaboration: Working as a team” (pp. 28–29). */
export const ENG_6: BoardLesson = {
  n: 6,
  label: '6',
  lang: 'en',
  group: ENG_G1,
  easyLang: 'uz',
  title: 'Life skills: Working as a team',
  section: 'Life Skills 1',
  cast: {
    ...ENG_CAST,
    dilnoza: { name: 'Dilnoza', emoji: '', color: '#6B46C1', azure: '', gender: 'f' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Mr Collins gives the class a project: plan a charity sports day. Malika, Timur and Dilnoza work as a team.',
      easy: 'Mr Collins sinfga loyiha berdi: xayriya sport kunini rejalashtirish. Malika, Timur va Dilnoza jamoa boʻlib ishlaydi. Avval maqsadni kelishib olishadi.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🏫 Project time',
        lines: [
          { who: 'narrator', text: 'Your task is to plan a charity sports day for the school. You have one week.', uz: 'Vazifangiz — maktab uchun xayriya sport kunini rejalashtirish. Bir hafta vaqtingiz bor.' },
          { who: 'dilnoza', text: 'OK, team. First, let’s agree on our goal. What do we want to achieve?', uz: 'Xoʻsh, jamoa. Avval maqsadni kelishib olaylik. Nimaga erishmoqchimiz?' },
          { who: 'timur', text: 'We want to raise money for the children’s hospital.', uz: 'Bolalar kasalxonasi uchun pul yigʻmoqchimiz.' },
          { who: 'malika', text: 'And we want everyone to have fun, not only the sporty students.', uz: 'Yana hamma maza qilishini xohlaymiz, faqat sportchi oʻquvchilar emas.' },
          { who: 'dilnoza', text: 'Great. So our goal is clear: raise money and include everyone.', uz: 'Zoʻr. Demak, maqsadimiz aniq: pul yigʻish va hammani jalb qilish.' }
        ],
        words: [
          { en: 'agree on', uz: 'kelishib olmoq' },
          { en: 'goal', uz: 'maqsad' },
          { en: 'achieve', uz: 'erishmoq' },
          { en: 'raise money', uz: 'pul yigʻmoq' }
        ]
      },
      next: 'How do good teams work?'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Good teams follow some simple steps. Agree on a clear goal. Share the tasks, so everyone has a role. Listen to every idea before you decide. Check your progress together. And if there is a problem, find a solution as a team, not alone.',
      easy: 'Yaxshi jamoa: 1) aniq maqsad, 2) vazifalarni taqsimlash — har kimning roli bor, 3) har bir gʻoyani tinglash, 4) natijani birga tekshirish, 5) muammoni birga hal qilish.',
      draw: [
        { t: 'title', text: 'Teamwork in 5 steps' },
        { t: 'box', id: 'a', x: 2, y: 16, w: 18, h: 12, text: 'clear goal', color: 'blue' },
        { t: 'box', id: 'b', x: 22, y: 16, w: 18, h: 12, text: 'share tasks', color: 'green' },
        { t: 'box', id: 'c', x: 42, y: 16, w: 18, h: 12, text: 'listen to all', color: 'orange' },
        { t: 'box', id: 'd', x: 62, y: 16, w: 18, h: 12, text: 'check progress', color: 'purple' },
        { t: 'box', id: 'e', x: 82, y: 16, w: 16, h: 12, text: 'solve together', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' },
        { t: 'arrow', from: 'd', to: 'e' }
      ],
      next: 'Sharing the tasks'
    },
    {
      kind: 'scene',
      say: 'Now the team shares the tasks. Listen to the useful phrases for suggesting and agreeing.',
      easy: 'Taklif qilish: Why don’t we…? / How about…? / I suggest… Rozilik: That’s a good idea. / I agree. Muloyim norozilik: I’m not sure about that. / Maybe, but…',
      draw: [],
      scene: {
        style: 'chat',
        place: '💬 Sharing the tasks',
        lines: [
          { who: 'timur', text: 'Why don’t I organise the football and the races? I know the coach.', uz: 'Futbol va yugurish musobaqalarini men tashkil qilsam-chi? Murabbiyni taniyman.' },
          { who: 'malika', text: 'That’s a good idea. How about I design the posters?', uz: 'Yaxshi fikr. Plakatlarni men chizsam-chi?' },
          { who: 'dilnoza', text: 'I agree. I suggest I deal with the money and the tickets.', uz: 'Roziman. Pul va chiptalar bilan men shugʻullanishni taklif qilaman.' },
          { who: 'timur', text: 'Should we charge 50,000 sum for a ticket?', uz: 'Chiptani 50 000 soʻmdan sotsakmi?' },
          { who: 'malika', text: 'I’m not sure about that. Maybe 10,000 is better, so everyone can come.', uz: 'Bunisiga ishonchim komil emas. Balki 10 000 yaxshiroqdir, hamma kela olsin.' }
        ],
        words: [
          { en: 'Why don’t I', uz: 'Men … qilsam-chi?' },
          { en: 'How about', uz: '… qilsak-chi?' },
          { en: 'I suggest', uz: 'taklif qilaman' },
          { en: 'I’m not sure about that', uz: 'bunga ishonchim komil emas' }
        ]
      },
      next: 'Show me the phrases'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Here are the phrases. To suggest: Why don’t we…? How about…? I suggest… To agree: That’s a good idea. I agree. To disagree politely: I’m not sure about that. Maybe, but… Notice: after how about we use the -ing form: How about designing the posters?',
      easy: 'Taklif: Why don’t we + feʼl? How about + -ing? I suggest … Rozilik: Good idea. I agree. Muloyim rad: I’m not sure about that. Maybe, but…',
      draw: [
        { t: 'title', text: 'Useful phrases' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['suggest', 'agree', 'disagree politely'],
            ['Why don’t we…?', 'Good idea!', 'I’m not sure…'],
            ['How about + -ing?', 'I agree.', 'Maybe, but…'],
            ['I suggest…', 'Sounds great.', 'What about…?']
          ]
        },
        { t: 'text', x: 6, y: 44, text: 'How about designing the posters?', size: 's', color: 'orange' }
      ],
      next: 'What if there’s a problem?'
    },
    {
      kind: 'scene',
      say: 'Two days later there is a problem. Watch how the team solves it.',
      easy: 'Muammo chiqdi: sport zali band. Jamoa bir-birini ayblamaydi, balki birga yechim qidiradi va hammaning fikrini soʻraydi.',
      draw: [],
      scene: {
        style: 'phone',
        place: '📱 Sports day team',
        lines: [
          { who: 'timur', text: 'Bad news: the sports hall is busy on Saturday.', uz: 'Yomon xabar: shanba kuni sport zali band.' },
          { who: 'malika', text: 'Oh no! What can we do? Let’s think together.', uz: 'Voy! Nima qilamiz? Keling, birga oʻylaylik.' },
          { who: 'dilnoza', text: 'How about using the school field? The weather will be sunny.', uz: 'Maktab maydonidan foydalansak-chi? Havo quyoshli boʻladi.' },
          { who: 'timur', text: 'Good idea. I’ll ask the head teacher today.', uz: 'Yaxshi fikr. Bugun direktordan soʻrayman.' },
          { who: 'malika', text: 'Great teamwork, everyone!', uz: 'Ajoyib jamoaviy ish, hammaga rahmat!' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'A good team agrees on a clear goal, shares the tasks, listens to every idea, checks progress and solves problems together.',
    'Suggest: Why don’t we…? How about + -ing? I suggest…',
    'Agree: That’s a good idea. I agree. Sounds great.',
    'Disagree politely: I’m not sure about that. Maybe, but…'
  ],
  questions: [
    {
      id: 'e6q1',
      prompt: 'Put the teamwork steps in order.',
      hint: 'Start with the goal.',
      explanation: 'Agree on a goal → share the tasks → check progress → celebrate the result.',
      widget: { type: 'step_order', props: { steps: ['agree on a goal', 'share the tasks', 'check progress', 'celebrate the result'] } }
    },
    {
      id: 'e6q2',
      prompt: 'Suggest, agree or disagree? Sort the phrases.',
      hint: 'A suggestion offers an idea.',
      explanation: 'Suggest: How about…? Why don’t we…? Agree: Good idea! I agree. Disagree: I’m not sure about that. Maybe, but…',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 's', label: 'suggest' },
            { id: 'a', label: 'agree' },
            { id: 'd', label: 'disagree' }
          ],
          tiles: [
            { id: 't1', label: 'How about…?', bin: 's' },
            { id: 't2', label: 'Good idea!', bin: 'a' },
            { id: 't3', label: 'I’m not sure about that.', bin: 'd' },
            { id: 't4', label: 'Why don’t we…?', bin: 's' },
            { id: 't5', label: 'I agree.', bin: 'a' },
            { id: 't6', label: 'Maybe, but…', bin: 'd' }
          ]
        }
      }
    },
    {
      id: 'e6q3',
      prompt: 'Complete the suggestion.',
      hint: 'After “How about” use the -ing form.',
      explanation: 'How about designing the posters?',
      widget: { type: 'text_answer', props: { before: 'How about', after: 'the posters?', answer: 'designing', width: 9 } }
    },
    {
      id: 'e6q4',
      prompt: 'Match each person to their task.',
      hint: 'Who knows the coach?',
      explanation: 'Timur — football and races; Malika — posters; Dilnoza — money and tickets.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Timur' }, right: { label: 'football and races' } },
            { left: { label: 'Malika' }, right: { label: 'posters' } },
            { left: { label: 'Dilnoza' }, right: { label: 'money and tickets' } }
          ]
        }
      }
    },
    {
      id: 'e6q5',
      prompt: 'True or false?',
      hint: 'Think about the problem with the hall.',
      explanation: 'The hall was busy; the team chose the school field; the goal was to raise money and include everyone.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'The sports hall was busy on Saturday.', value: true },
            { text: 'The team decided to cancel the sports day.', value: false },
            { text: 'Their goal was to raise money and include everyone.', value: true },
            { text: 'In a good team, one person makes all the decisions.', value: false }
          ]
        }
      }
    },
    {
      id: 'e6q6',
      prompt: 'Choose the most polite way to disagree.',
      hint: 'Be kind to your teammates.',
      explanation: '“I’m not sure about that. Maybe…” is polite; the others sound rude.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['I’m not sure about that. Maybe…', 'That’s a stupid idea.', 'No. Do what I say.', 'Whatever.'], answerIndex: 0 } }
    },
    {
      id: 'e6q7',
      prompt: 'Put the words in order.',
      hint: 'A suggestion with “Why don’t we”.',
      explanation: 'Why don’t we use the school field?',
      widget: { type: 'sentence_order', props: { words: ['Why', 'don’t', 'we', 'use', 'the', 'school', 'field?'] } }
    }
  ]
};
