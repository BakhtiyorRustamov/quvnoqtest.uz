import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G5 } from './eng-cast';

/** Student's Book: Unit 17 “Getting the message” — communication verbs, fairly / pretty / quite / reasonably, reported questions. */
export const ENG_25: BoardLesson = {
  n: 25,
  label: '25',
  lang: 'en',
  group: ENG_G5,
  easyLang: 'uz',
  title: 'Getting the message',
  section: 'Unit 17',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Timur and Malika talk about a misunderstanding in their class chat. Listen for communication verbs.',
      easy: 'Sinf chatida tushunmovchilik boʻldi. argue — bahslashmoq, whisper — pichirlamoq, shout — baqirmoq, complain — shikoyat qilmoq, apologise — uzr soʻramoq, persuade — koʻndirmoq, mention — tilga olmoq, gossip — gʻiybat qilmoq.',
      draw: [],
      scene: {
        style: 'chat',
        place: '💬 After school',
        lines: [
          { who: 'malika', text: 'Did you see the class chat? Aziz and Lola were arguing again.', uz: 'Sinf chatini koʻrdingmi? Aziz bilan Lola yana bahslashayotgan edi.' },
          { who: 'timur', text: 'Yes. Lola complained that nobody had mentioned her idea.', uz: 'Ha. Lola hech kim uning gʻoyasini tilga olmaganidan shikoyat qildi.' },
          { who: 'malika', text: 'Messages are pretty easy to misunderstand. You can’t hear the tone.', uz: 'Xabarlarni notoʻgʻri tushunish ancha oson. Ohangni eshitib boʻlmaydi.' },
          { who: 'timur', text: 'In the end Aziz apologised. He persuaded her to meet and talk.', uz: 'Oxiri Aziz uzr soʻradi. U Lolani uchrashib gaplashishga koʻndirdi.' },
          { who: 'malika', text: 'Good. Talking face to face is usually better.', uz: 'Yaxshi. Yuzma-yuz gaplashish odatda yaxshiroq.' }
        ],
        words: [
          { en: 'argue', uz: 'bahslashmoq' },
          { en: 'complain', uz: 'shikoyat qilmoq' },
          { en: 'mention', uz: 'tilga olmoq' },
          { en: 'apologise', uz: 'uzr soʻramoq' },
          { en: 'persuade', uz: 'koʻndirmoq' }
        ]
      },
      next: 'Fairly, pretty, quite'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Fairly, pretty, quite and reasonably make an adjective weaker than very. Fairly and reasonably are a little weaker; pretty is informal; quite can be similar. The chat was pretty busy. The test was fairly easy. The price is reasonably good. Remember: quite a long message — quite comes before a.',
      easy: 'fairly, pretty, quite, reasonably — “ancha, birmuncha” maʼnosida, very dan kuchsizroq. pretty — soʻzlashuvda. The test was fairly easy. quite + a + sifat + ot: quite a long message.',
      draw: [
        { t: 'title', text: 'Weaker than very' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 28, h: 10, text: 'a little', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 15, w: 28, h: 10, text: 'fairly / quite', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 15, w: 28, h: 10, text: 'very', color: 'red' },
        { t: 'text', x: 4, y: 36, text: 'The test was fairly easy.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 44, text: 'Messages are pretty easy to misread.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 54, text: 'quite a long message (quite + a)', size: 's', color: 'orange' }
      ],
      next: 'Reported questions'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Reported questions use normal word order — no question form and no question mark. Yes or no questions use if or whether: “Are you angry?” — She asked if I was angry. Wh-questions keep the question word: “Why did you write that?” — He asked me why I had written that.',
      easy: 'Oʻzlashtirma soʻroq gapda soʻz tartibi oddiy darak gapdagidek, soʻroq belgisi yoʻq. Ha/yoʻq savollar — if / whether: She asked if I was angry. Wh-savollar — soʻroq soʻzi saqlanadi: He asked me why I had written that.',
      draw: [
        { t: 'title', text: 'Reported questions' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['direct', 'reported'],
            ['“Are you angry?”', 'She asked if I was angry.'],
            ['“Where do you live?”', 'He asked where I lived.'],
            ['“Can you help?”', 'She asked if I could help.']
          ]
        },
        { t: 'text', x: 6, y: 46, text: 'no do / does / did, no question mark', size: 's', color: 'red' }
      ],
      next: 'Timur reports'
    },
    {
      kind: 'scene',
      say: 'Timur tells Malika about his conversation with Aziz.',
      easy: 'Timur Aziz bilan suhbatini oʻzlashtirma savollar bilan aytib beradi: He asked me if…, I asked him why…',
      draw: [],
      scene: {
        style: 'chat',
        place: '💬 The next day',
        lines: [
          { who: 'timur', text: 'Aziz asked me if Lola was still angry.', uz: 'Aziz mendan Lola hali ham jahldami, deb soʻradi.' },
          { who: 'malika', text: 'What did you say?', uz: 'Sen nima deding?' },
          { who: 'timur', text: 'I said I didn’t know. Then I asked him why he had written that message.', uz: 'Bilmayman dedim. Keyin undan nega u xabarni yozganini soʻradim.' },
          { who: 'malika', text: 'And?', uz: 'Xoʻsh?' },
          { who: 'timur', text: 'He said it was a joke, but it was quite a rude joke.', uz: 'U hazil ekanini aytdi, lekin bu ancha qoʻpol hazil edi.' }
        ],
        words: [
          { en: 'asked me if', uz: 'mendan … -mi deb soʻradi' },
          { en: 'asked him why', uz: 'undan nega … deb soʻradim' },
          { en: 'rude', uz: 'qoʻpol' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Communication verbs: argue, complain, mention, apologise, persuade, whisper, shout, gossip.',
    'fairly / pretty / quite / reasonably — weaker than very; quite a + adjective + noun.',
    'Reported questions: normal word order; if / whether for yes-no questions; no question mark.'
  ],
  questions: [
    {
      id: 'e25q1',
      prompt: 'Match the verbs to their meanings.',
      hint: 'apologise = say sorry.',
      explanation: 'apologise — say sorry; complain — say you are unhappy; persuade — make someone agree; whisper — speak very quietly.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'apologise' }, right: { label: 'say sorry' } },
            { left: { label: 'complain' }, right: { label: 'say you are unhappy' } },
            { left: { label: 'persuade' }, right: { label: 'make someone agree' } },
            { left: { label: 'whisper' }, right: { label: 'speak very quietly' } }
          ]
        }
      }
    },
    {
      id: 'e25q2',
      prompt: 'Choose the correct word order.',
      hint: 'quite comes before a.',
      explanation: 'It was quite a long message.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['It was quite a long message.', 'It was a quite long message.', 'It was long quite a message.', 'It was a long quite message.'], answerIndex: 0 } }
    },
    {
      id: 'e25q3',
      prompt: 'Report the question: “Are you angry?”',
      hint: 'Use if + normal word order.',
      explanation: 'She asked if I was angry.',
      widget: { type: 'mcq', props: { prompt: 'She asked ___.', choices: ['if I was angry', 'was I angry', 'if was I angry', 'are you angry'], answerIndex: 0 } }
    },
    {
      id: 'e25q4',
      prompt: 'Complete the reported question.',
      hint: '“Where do you live?” → no do.',
      explanation: 'He asked me where I lived.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'He asked me' }, { blank: 'where' }, { text: 'I' }, { blank: 'lived' }, { text: '.' }],
          bank: ['where', 'lived', 'did', 'live']
        }
      }
    },
    {
      id: 'e25q5',
      prompt: 'Tap all the correct reported questions.',
      hint: 'No do/did, no question mark.',
      explanation: 'Correct: “She asked if I could help.”, “He asked why I was late.”, “They asked whether we were ready.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'She asked if I could help.', match: true },
            { id: 'b', text: 'He asked why was I late.', match: false },
            { id: 'c', text: 'He asked why I was late.', match: true },
            { id: 'd', text: 'They asked whether we were ready.', match: true },
            { id: 'e', text: 'She asked where did I live?', match: false }
          ]
        }
      }
    },
    {
      id: 'e25q6',
      prompt: 'True or false?',
      hint: 'Remember the chat story.',
      explanation: 'Lola complained; Aziz apologised; Timur thought the joke was quite rude.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Lola complained that nobody mentioned her idea.', value: true },
            { text: 'Aziz never apologised.', value: false },
            { text: 'Malika thinks messages are easy to misunderstand.', value: true },
            { text: 'Timur thought Aziz’s joke was very kind.', value: false }
          ]
        }
      }
    },
    {
      id: 'e25q7',
      prompt: 'Complete the sentence.',
      hint: 'Make someone agree.',
      explanation: 'Aziz persuaded Lola to meet and talk.',
      widget: { type: 'text_answer', props: { before: 'Aziz', after: 'Lola to meet and talk.', answer: 'persuaded', width: 10 } }
    },
    {
      id: 'e25q8',
      prompt: 'Put the words in order.',
      hint: 'Start with “She asked”.',
      explanation: 'She asked me if I was free.',
      widget: { type: 'sentence_order', props: { words: ['She', 'asked', 'me', 'if', 'I', 'was', 'free.'] } }
    }
  ]
};
