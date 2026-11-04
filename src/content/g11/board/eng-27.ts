import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G5 } from './eng-cast';

/** Student's Book: Culture “Fan culture”. */
export const ENG_27: BoardLesson = {
  n: 27,
  label: '27',
  lang: 'en',
  group: ENG_G5,
  easyLang: 'uz',
  title: 'Culture: Fan culture',
  section: 'Culture 5',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Mr Collins talks about fans and fan clubs around the world.',
      easy: 'Mr Collins dunyo boʻylab muxlislar va muxlislar klublari haqida gapiradi. fan — muxlis, fan club — muxlislar klubi, supporter — tarafdor (sportda), autograph — dastxat, merchandise — mahsulotlar (futbolka, kepka), loyal — sodiq.',
      draw: [],
      scene: {
        style: 'interview',
        place: '🏫 English lesson · fan culture',
        lines: [
          { who: 'narrator', text: 'Fans have existed for a long time. In the 1800s, readers waited at the docks for the next part of a Dickens novel.', uz: 'Muxlislar azaldan bor. 1800-yillarda kitobxonlar Dikkens romanining keyingi qismini portda kutishgan.' },
          { who: 'malika', text: 'Today fans wait online for new songs or episodes!', uz: 'Bugun muxlislar yangi qoʻshiq yoki seriyalarni internetda kutishadi!' },
          { who: 'timur', text: 'Football supporters are the most loyal fans. They travel to every match.', uz: 'Futbol tarafdorlari eng sodiq muxlislar. Ular har bir oʻyinga borishadi.' },
          { who: 'narrator', text: 'Fan clubs organise meetings, collect merchandise and even raise money for charity.', uz: 'Muxlislar klublari uchrashuvlar uyushtiradi, mahsulotlar yigʻadi va hatto xayriya uchun pul toʻplaydi.' }
        ],
        words: [
          { en: 'fan club', uz: 'muxlislar klubi' },
          { en: 'supporter', uz: 'tarafdor' },
          { en: 'loyal', uz: 'sodiq' },
          { en: 'merchandise', uz: 'mahsulotlar' },
          { en: 'charity', uz: 'xayriya' }
        ]
      },
      next: 'Positive and negative'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Being a fan can be positive: you make friends with the same interests, you feel part of a community, and fan clubs often do charity work. But it can be negative too: spending too much money, following a celebrity’s private life, or being rude to fans of a different team.',
      easy: 'Muxlis boʻlishning ijobiy tomoni: qiziqishlari bir xil doʻstlar, jamoaga mansublik hissi, xayriya. Salbiy tomoni: ortiqcha pul sarflash, mashhurning shaxsiy hayotini kuzatish, boshqa jamoa muxlislariga qoʻpollik.',
      draw: [
        { t: 'title', text: 'Being a fan' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 10, text: 'positive', color: 'green' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 10, text: 'negative', color: 'red' },
        { t: 'list', x: 6, y: 30, items: ['new friends', 'a community', 'charity work'], color: 'green' },
        { t: 'list', x: 54, y: 30, items: ['too much money', 'private lives', 'rude to rivals'], color: 'red' }
      ],
      next: 'Fans in Uzbekistan'
    },
    {
      kind: 'scene',
      say: 'Timur talks about football fans in Uzbekistan.',
      easy: 'Timur Oʻzbekistondagi futbol muxlislari haqida gapiradi: stadionlar toʻladi, milliy terma jamoa muvaffaqiyatlari butun mamlakatni birlashtiradi.',
      draw: [],
      scene: {
        style: 'chat',
        place: '🏟️ Talking about football',
        lines: [
          { who: 'timur', text: 'When the national team plays, the whole country watches together.', uz: 'Terma jamoa oʻynaganda butun mamlakat birga tomosha qiladi.' },
          { who: 'malika', text: 'I remember people celebrating in the streets after a big win.', uz: 'Katta gʻalabadan keyin odamlar koʻchalarda bayram qilganini eslayman.' },
          { who: 'timur', text: 'That’s the best part of fan culture — it brings people together.', uz: 'Muxlislik madaniyatining eng yaxshi tomoni shu — u odamlarni birlashtiradi.' },
          { who: 'narrator', text: 'As long as fans respect each other, of course.', uz: 'Albatta, muxlislar bir-birini hurmat qilsa.' }
        ],
        words: [
          { en: 'national team', uz: 'terma jamoa' },
          { en: 'celebrate', uz: 'bayram qilmoq' },
          { en: 'bring together', uz: 'birlashtirmoq' },
          { en: 'respect', uz: 'hurmat qilmoq' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Fan words: fan club, supporter, loyal, autograph, merchandise, charity.',
    'Positive: friends, community, charity. Negative: spending too much, following private lives, rudeness.',
    'Sport brings people together — as long as fans respect each other.'
  ],
  questions: [
    {
      id: 'e27q1',
      prompt: 'Match the words to their meanings.',
      hint: 'loyal = always supports.',
      explanation: 'supporter — a fan of a sports team; loyal — always supports; merchandise — T-shirts, caps and other products; autograph — a famous person’s signature.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'supporter' }, right: { label: 'a fan of a sports team' } },
            { left: { label: 'loyal' }, right: { label: 'always supports' } },
            { left: { label: 'merchandise' }, right: { label: 'T-shirts, caps and products' } },
            { left: { label: 'autograph' }, right: { label: 'a famous person’s signature' } }
          ]
        }
      }
    },
    {
      id: 'e27q2',
      prompt: 'Sort the ideas.',
      hint: 'Good or bad side of being a fan?',
      explanation: 'Positive: new friends, charity work, a community. Negative: spending too much, being rude to rivals, following private lives.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'p', label: 'positive' }, { id: 'n', label: 'negative' }],
          tiles: [
            { id: 'a', label: 'making new friends', bin: 'p' },
            { id: 'b', label: 'charity work', bin: 'p' },
            { id: 'c', label: 'feeling part of a community', bin: 'p' },
            { id: 'd', label: 'spending too much money', bin: 'n' },
            { id: 'e', label: 'being rude to rivals', bin: 'n' },
            { id: 'f', label: 'following private lives', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'e27q3',
      prompt: 'What did readers wait for in the 1800s?',
      hint: 'A famous English writer.',
      explanation: 'They waited for the next part of a Dickens novel.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['the next part of a Dickens novel', 'a new film', 'a football match', 'a pop concert'], answerIndex: 0 } }
    },
    {
      id: 'e27q4',
      prompt: 'True or false?',
      hint: 'Remember the lesson.',
      explanation: 'Fan clubs can raise money for charity; fans have existed for a long time; fan culture can bring people together.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Fan clubs sometimes raise money for charity.', value: true },
            { text: 'Fans first appeared with the internet.', value: false },
            { text: 'Fan culture can bring people together.', value: true },
            { text: 'Being rude to other fans is part of good fan culture.', value: false }
          ]
        }
      }
    },
    {
      id: 'e27q5',
      prompt: 'Complete the sentence.',
      hint: 'Join people.',
      explanation: 'Sport brings people together.',
      widget: { type: 'text_answer', props: { before: 'Sport brings people', after: '.', answer: 'together', width: 9 } }
    },
    {
      id: 'e27q6',
      prompt: 'Put the words in order.',
      hint: 'Start with “Football supporters”.',
      explanation: 'Football supporters are very loyal fans.',
      widget: { type: 'sentence_order', props: { words: ['Football', 'supporters', 'are', 'very', 'loyal', 'fans.'] } }
    }
  ]
};
