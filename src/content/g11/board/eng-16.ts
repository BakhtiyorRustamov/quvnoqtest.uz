import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G3 } from './eng-cast';

/** Student's Book: Unit 11 “Off to school” (pp. 64–67) — school vocabulary, compound nouns, past perfect. */
export const ENG_16: BoardLesson = {
  n: 16,
  label: '16',
  lang: 'en',
  group: ENG_G3,
  easyLang: 'uz',
  title: 'Off to school',
  section: 'Unit 11',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Timur arrives late on the first day of term. Listen for school words.',
      easy: 'Timur oʻquv choragining birinchi kuni kechikdi. timetable — dars jadvali, term — chorak, subject — fan, homework — uy vazifasi, uniform — forma, break — tanaffus, head teacher — maktab direktori, classmate — sinfdosh.',
      draw: [],
      scene: {
        style: 'chat',
        place: '🏫 The school corridor',
        lines: [
          { who: 'timur', text: 'Sorry I’m late! When I arrived, the lesson had already started.', uz: 'Kechirasiz, kechikdim! Kelganimda dars allaqachon boshlangan edi.' },
          { who: 'malika', text: 'Don’t worry. Have you seen the new timetable?', uz: 'Xavotir olma. Yangi dars jadvalini koʻrdingmi?' },
          { who: 'timur', text: 'No. I had left my phone at home, so I couldn’t check.', uz: 'Yoʻq. Telefonimni uyda qoldirgan edim, shuning uchun tekshira olmadim.' },
          { who: 'malika', text: 'We have maths first, then a break, then English.', uz: 'Birinchi matematika, keyin tanaffus, keyin ingliz tili.' },
          { who: 'timur', text: 'Great. And I did my homework yesterday!', uz: 'Zoʻr. Uy vazifamni esa kecha qilib qoʻydim!' }
        ],
        words: [
          { en: 'timetable', uz: 'dars jadvali' },
          { en: 'break', uz: 'tanaffus' },
          { en: 'term', uz: 'chorak' },
          { en: 'classmate', uz: 'sinfdosh' },
          { en: 'had already started', uz: 'allaqachon boshlangan edi' }
        ]
      },
      next: 'Compound nouns'
    },
    {
      kind: 'card',
      clear: true,
      say: 'A compound noun is made from two words. Some are written as one word: classroom, homework, timetable, classmate. Some are written as two words: head teacher, school bag, exam results, sports hall.',
      easy: 'Qoʻshma ot — ikki soʻzdan tuzilgan ot. Baʼzilari qoʻshib yoziladi: classroom, homework, timetable. Baʼzilari ajratib yoziladi: head teacher, school bag, sports hall.',
      draw: [
        { t: 'title', text: 'Compound nouns' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 12, text: 'one word', color: 'blue' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'two words', color: 'green' },
        { t: 'list', x: 6, y: 34, items: ['classroom', 'homework', 'timetable', 'classmate'], color: 'blue' },
        { t: 'list', x: 54, y: 34, items: ['head teacher', 'school bag', 'sports hall', 'exam results'], color: 'green' }
      ],
      next: 'Now the grammar'
    },
    {
      kind: 'card',
      clear: true,
      say: 'The past perfect is had plus the past participle. We use it for an action that happened before another action in the past. When I arrived, the lesson had already started — first the lesson started, then I arrived. Common words: already, just, never, by the time, before.',
      easy: 'Past perfect: had + V3. Oʻtmishdagi bir harakatdan OLDIN boʻlgan harakat. When I arrived, the lesson had already started — avval dars boshlandi, keyin men keldim. Koʻp ishlatiladi: already, just, never, by the time, before.',
      draw: [
        { t: 'title', text: 'Past perfect: had + V3' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 40, h: 12, text: '1 lesson had started', color: 'purple' },
        { t: 'box', id: 'b', x: 56, y: 15, w: 40, h: 12, text: '2 I arrived', color: 'orange' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'text', x: 4, y: 38, text: 'I had left my phone at home.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 46, text: 'She hadn’t done her homework.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 54, text: 'Had you finished before the bell?', size: 's', color: 'ink' }
      ],
      next: 'Past simple or past perfect?'
    },
    {
      kind: 'scene',
      say: 'Malika tells her grandmother about the exam. Notice the order of events.',
      easy: 'Ikki harakatni solishtiring: By the time the exam started, I had revised everything. Avval takrorladim (past perfect), keyin imtihon boshlandi (past simple).',
      draw: [],
      scene: {
        style: 'chat',
        place: '🏠 At home in the evening',
        lines: [
          { who: 'malika', text: 'By the time the exam started, I had revised everything.', uz: 'Imtihon boshlanguncha hammasini takrorlab boʻlgan edim.' },
          { who: 'timur', text: 'Lucky you! I hadn’t slept well, so I felt tired.', uz: 'Omading bor! Men yaxshi uxlamagan edim, shuning uchun charchagan edim.' },
          { who: 'malika', text: 'Had you ever taken an exam like that before?', uz: 'Avval hech shunaqa imtihon topshirganmiding?' },
          { who: 'timur', text: 'No, never. But the results were good!', uz: 'Yoʻq, hech qachon. Lekin natijalar yaxshi chiqdi!' }
        ],
        words: [
          { en: 'by the time', uz: '…guncha' },
          { en: 'revise', uz: 'takrorlamoq' },
          { en: 'hadn’t slept', uz: 'uxlamagan edim' },
          { en: 'results', uz: 'natijalar' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'School words: timetable, term, subject, homework, uniform, break, head teacher, classmate.',
    'Compound nouns: one word (classroom, homework) or two words (head teacher, sports hall).',
    'Past perfect: had + past participle — an action before another past action.',
    'By the time / already / before often go with the past perfect.'
  ],
  questions: [
    {
      id: 'e16q1',
      prompt: 'Make compound nouns.',
      hint: 'class + room = classroom.',
      explanation: 'class — room; head — teacher; home — work; sports — hall.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'class' }, right: { label: 'room' } },
            { left: { label: 'head' }, right: { label: 'teacher' } },
            { left: { label: 'home' }, right: { label: 'work' } },
            { left: { label: 'sports' }, right: { label: 'hall' } }
          ]
        }
      }
    },
    {
      id: 'e16q2',
      prompt: 'Sort the compound nouns.',
      hint: 'Is it written together?',
      explanation: 'One word: classroom, timetable, classmate. Two words: head teacher, school bag, exam results.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'one', label: 'one word' }, { id: 'two', label: 'two words' }],
          tiles: [
            { id: 'a', label: 'classroom', bin: 'one' },
            { id: 'b', label: 'timetable', bin: 'one' },
            { id: 'c', label: 'classmate', bin: 'one' },
            { id: 'd', label: 'head teacher', bin: 'two' },
            { id: 'e', label: 'school bag', bin: 'two' },
            { id: 'f', label: 'exam results', bin: 'two' }
          ]
        }
      }
    },
    {
      id: 'e16q3',
      prompt: 'Choose the correct form.',
      hint: 'Which happened first?',
      explanation: 'When I arrived, the lesson had already started.',
      widget: { type: 'mcq', props: { prompt: 'When I arrived, the lesson ___ already ___.', choices: ['had … started', 'has … started', 'was … starting', 'did … start'], answerIndex: 0 } }
    },
    {
      id: 'e16q4',
      prompt: 'Complete with the past perfect.',
      hint: 'had + V3 of leave.',
      explanation: 'I couldn’t call you because I had left my phone at home.',
      widget: { type: 'text_answer', props: { before: 'I couldn’t call you because I', after: 'my phone at home.', answer: ['had left'], width: 9 } }
    },
    {
      id: 'e16q5',
      prompt: 'Complete the sentence.',
      hint: 'First revise, then the exam.',
      explanation: 'By the time the exam started, I had revised everything.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'By the time the exam' }, { blank: 'started' }, { text: ', I' }, { blank: 'had revised' }, { text: 'everything.' }],
          bank: ['started', 'had revised', 'had started', 'revised']
        }
      }
    },
    {
      id: 'e16q6',
      prompt: 'True or false?',
      hint: 'Think about Timur’s morning.',
      explanation: 'Timur was late; he had left his phone at home; he did his homework yesterday.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Timur arrived after the lesson had started.', value: true },
            { text: 'Timur had his phone with him.', value: false },
            { text: 'After maths there is a break.', value: true },
            { text: 'Timur hadn’t done his homework.', value: false }
          ]
        }
      }
    },
    {
      id: 'e16q7',
      prompt: 'Put the events in order (first → last).',
      hint: 'Past perfect shows the earlier action.',
      explanation: '“She had studied hard, so she passed the exam, and then she celebrated.”',
      widget: { type: 'step_order', props: { steps: ['She studied hard.', 'She took the exam.', 'She got good results.', 'She celebrated with friends.'] } }
    },
    {
      id: 'e16q8',
      prompt: 'Put the words in order.',
      hint: 'Start with “I had never”.',
      explanation: 'I had never taken an exam like that.',
      widget: { type: 'sentence_order', props: { words: ['I', 'had', 'never', 'taken', 'an', 'exam', 'like', 'that.'] } }
    }
  ]
};
