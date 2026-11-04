import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G5 } from './eng-cast';

/** Student's Book: Unit 18 “We love celebs!” — feelings and qualities, prepositions and conjunctions, have something done. */
export const ENG_26: BoardLesson = {
  n: 26,
  label: '26',
  lang: 'en',
  group: ENG_G5,
  easyLang: 'uz',
  title: 'We love celebs!',
  section: 'Unit 18',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Malika and Timur talk about famous people they admire. Listen for words about feelings and qualities.',
      easy: 'Mashhur insonlar haqida suhbat. admire — qoyil qolmoq, talented — isteʼdodli, generous — saxiy, confident — oʻziga ishongan, humble — kamtar, determined — qatʼiyatli, inspire — ilhomlantirmoq, proud — faxrlanuvchi.',
      draw: [],
      scene: {
        style: 'chat',
        place: '☕ In a café',
        lines: [
          { who: 'malika', text: 'I really admire athletes who win medals for Uzbekistan. They’re so determined.', uz: 'Oʻzbekiston uchun medal yutgan sportchilarga juda qoyil qolaman. Ular juda qatʼiyatli.' },
          { who: 'timur', text: 'Me too. Despite all the pressure, they stay humble.', uz: 'Men ham. Shuncha bosimga qaramay, ular kamtar boʻlib qoladi.' },
          { who: 'malika', text: 'And some celebrities are very generous — they help children’s hospitals.', uz: 'Baʼzi mashhurlar esa juda saxiy — bolalar shifoxonalariga yordam beradi.' },
          { who: 'timur', text: 'That’s what makes them inspiring, not just being talented.', uz: 'Ularni ilhomlantiruvchi qiladigan narsa shu, faqat isteʼdod emas.' }
        ],
        words: [
          { en: 'admire', uz: 'qoyil qolmoq' },
          { en: 'determined', uz: 'qatʼiyatli' },
          { en: 'humble', uz: 'kamtar' },
          { en: 'generous', uz: 'saxiy' },
          { en: 'inspiring', uz: 'ilhomlantiruvchi' }
        ]
      },
      next: 'Linking words'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Linking words for contrast and reason. Although and even though are followed by a clause: Although she is famous, she is humble. Despite and in spite of are followed by a noun or an ing form: Despite the pressure, they stay calm. Because is followed by a clause; because of by a noun.',
      easy: 'although / even though + gap (ega + kesim): Although she is famous, she is humble. despite / in spite of + ot yoki -ing: Despite the pressure… because + gap; because of + ot: because of the rain.',
      draw: [
        { t: 'title', text: 'Linking words' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 12, text: 'although + clause', color: 'blue' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'despite + noun / -ing', color: 'green' },
        { t: 'text', x: 4, y: 38, text: 'Although she is famous, she is humble.', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 46, text: 'Despite the pressure, they stay calm.', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 56, text: 'because + clause / because of + noun', size: 's', color: 'orange' }
      ],
      next: 'Have something done'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Have something done means someone else does a job for you. Have plus object plus past participle. The singer had her hair cut. I’m having my photo taken tomorrow. We can also use get in informal English: I got my phone repaired.',
      easy: 'have + narsa + V3 — ishni boshqa birov siz uchun qiladi. The singer had her hair cut — xonanda sochini oldirdi (oʻzi kesmadi). I’m having my photo taken. Soʻzlashuvda get: I got my phone repaired.',
      draw: [
        { t: 'title', text: 'have + object + V3' },
        { t: 'box', id: 'a', x: 20, y: 15, w: 60, h: 12, text: 'have + something + V3', color: 'purple' },
        { t: 'text', x: 4, y: 38, text: 'She had her hair cut.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 46, text: 'I’m having my photo taken tomorrow.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 54, text: 'I got my phone repaired.', size: 's', color: 'ink' }
      ],
      next: 'A star’s day'
    },
    {
      kind: 'scene',
      say: 'Timur reads about a pop star’s busy day before a concert.',
      easy: 'Timur bir estrada yulduzining konsert oldidan kunini oʻqiydi. have something done ga eʼtibor bering.',
      draw: [],
      scene: {
        style: 'chat',
        place: '📱 Reading a celebrity article',
        lines: [
          { who: 'timur', text: 'Listen: “Before the concert, she had her hair styled and her costume made.”', uz: 'Eshit: “Konsert oldidan u sochini turmaklatdi va kostyumini tiktirdi.”' },
          { who: 'malika', text: 'She doesn’t do anything herself!', uz: 'U hech narsani oʻzi qilmaydi-ku!' },
          { who: 'timur', text: '“Even though she was tired, she sang for two hours.”', uz: '“Charchagan boʻlsa ham, u ikki soat kuyladi.”' },
          { who: 'malika', text: 'OK, I’m impressed. That’s determined!', uz: 'Mayli, taʼsirlandim. Bu qatʼiyat!' }
        ],
        words: [
          { en: 'had her hair styled', uz: 'sochini turmaklatdi' },
          { en: 'costume', uz: 'kostyum' },
          { en: 'even though', uz: '… boʻlsa ham' },
          { en: 'impressed', uz: 'taʼsirlangan' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Qualities: talented, generous, confident, humble, determined, inspiring; admire, be proud of.',
    'although / even though + clause; despite / in spite of + noun or -ing; because vs because of.',
    'have something done: have + object + past participle — someone else does it for you.'
  ],
  questions: [
    {
      id: 'e26q1',
      prompt: 'Match the adjectives to their meanings.',
      hint: 'humble = not proud of yourself.',
      explanation: 'generous — likes giving; humble — doesn’t think they are better than others; determined — doesn’t give up; confident — believes in yourself.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'generous' }, right: { label: 'likes giving to others' } },
            { left: { label: 'humble' }, right: { label: 'doesn’t feel better than others' } },
            { left: { label: 'determined' }, right: { label: 'doesn’t give up' } },
            { left: { label: 'confident' }, right: { label: 'believes in yourself' } }
          ]
        }
      }
    },
    {
      id: 'e26q2',
      prompt: 'Choose the correct linking word.',
      hint: 'A noun follows.',
      explanation: 'Despite the pressure, they stay humble.',
      widget: { type: 'mcq', props: { prompt: '___ the pressure, they stay humble.', choices: ['Despite', 'Although', 'Even though', 'Because'], answerIndex: 0 } }
    },
    {
      id: 'e26q3',
      prompt: 'Complete with although or despite.',
      hint: 'clause → although; noun → despite.',
      explanation: 'Although she was tired, she sang. Despite the rain, the concert continued.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ blank: 'Although' }, { text: 'she was tired, she sang.' }, { blank: 'Despite' }, { text: 'the rain, the concert continued.' }],
          bank: ['Although', 'Despite', 'Because of']
        }
      }
    },
    {
      id: 'e26q4',
      prompt: 'Complete with have something done.',
      hint: 'had + her hair + V3.',
      explanation: 'The singer had her hair cut yesterday.',
      widget: { type: 'text_answer', props: { before: 'The singer had her hair', after: 'yesterday.', answer: 'cut', width: 5 } }
    },
    {
      id: 'e26q5',
      prompt: 'Who did the action? Choose the right meaning.',
      hint: 'have + object + V3.',
      explanation: '“I had my phone repaired” means someone else repaired it for me.',
      widget: { type: 'mcq', props: { prompt: 'I had my phone repaired.', choices: ['Someone repaired it for me.', 'I repaired it myself.', 'I broke my phone.', 'I sold my phone.'], answerIndex: 0 } }
    },
    {
      id: 'e26q6',
      prompt: 'Tap all the correct sentences.',
      hint: 'despite + noun; although + clause.',
      explanation: 'Correct: “Although he’s rich, he’s humble.”, “She had her photo taken.”, “Despite being famous, she walks to work.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Although he’s rich, he’s humble.', match: true },
            { id: 'b', text: 'Despite she is famous, she is kind.', match: false },
            { id: 'c', text: 'She had her photo taken.', match: true },
            { id: 'd', text: 'Despite being famous, she walks to work.', match: true },
            { id: 'e', text: 'He had cut his hair by a barber.', match: false }
          ]
        }
      }
    },
    {
      id: 'e26q7',
      prompt: 'True or false?',
      hint: 'Remember the article.',
      explanation: 'The singer had her hair styled; she sang for two hours even though she was tired.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'The singer styled her own hair.', value: false },
            { text: 'She sang for two hours.', value: true },
            { text: 'She was tired before the concert.', value: true },
            { text: 'Malika admires athletes who are determined.', value: true }
          ]
        }
      }
    },
    {
      id: 'e26q8',
      prompt: 'Put the words in order.',
      hint: 'Start with “I’m having”.',
      explanation: 'I’m having my photo taken tomorrow.',
      widget: { type: 'sentence_order', props: { words: ['I’m', 'having', 'my', 'photo', 'taken', 'tomorrow.'] } }
    }
  ]
};
