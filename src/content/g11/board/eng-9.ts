import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G2 } from './eng-cast';

/** Student's Book: Culture “Sports in Canada” (pp. 40–41). */
export const ENG_9: BoardLesson = {
  n: 9,
  label: '9',
  lang: 'en',
  group: ENG_G2,
  easyLang: 'uz',
  title: 'Culture: Sports in Canada',
  section: 'Culture 2',
  cast: {
    ...ENG_CAST,
    liam: { name: 'Liam', emoji: '', color: '#C53030', azure: '', gender: 'm' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Timur has a video call with Liam, a student from Toronto, Canada. They talk about sport.',
      easy: 'Timur Kanadadagi doʻsti Liam bilan videoqoʻngʻiroq qilyapti. Kanadada ikkita milliy sport bor: qishda — xokkey, yozda — lakross.',
      draw: [],
      scene: {
        style: 'chat',
        place: '💻 Video call: Tashkent — Toronto',
        lines: [
          { who: 'timur', text: 'Hi Liam! What’s the most popular sport in Canada?', uz: 'Salom, Liam! Kanadada eng mashhur sport qaysi?' },
          { who: 'liam', text: 'Ice hockey, definitely! It’s our national winter sport.', uz: 'Albatta, xokkey! U bizning milliy qishki sportimiz.' },
          { who: 'timur', text: 'National winter sport? Is there a summer one too?', uz: 'Milliy qishki sport? Yozgisi ham bormi?' },
          { who: 'liam', text: 'Yes, lacrosse. Players use a stick with a net to catch and throw a small ball.', uz: 'Ha, lakross. Oʻyinchilar toʻrli tayoq bilan kichik toʻpni ushlaydi va otadi.' },
          { who: 'liam', text: 'In winter many kids play hockey outdoors, on frozen lakes and ponds.', uz: 'Qishda koʻp bolalar muzlagan koʻl va hovuzlarda ochiq havoda xokkey oʻynaydi.' }
        ],
        words: [
          { en: 'ice hockey', uz: 'xokkey' },
          { en: 'national', uz: 'milliy' },
          { en: 'lacrosse', uz: 'lakross' },
          { en: 'frozen lakes', uz: 'muzlagan koʻllar' }
        ]
      },
      next: 'Tell me more'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Canada has two official national sports: ice hockey in winter and lacrosse in summer. Lacrosse is a very old game: it comes from the First Nations, the original people of North America. Canadians also love curling, skiing and Canadian football, which is a little different from American football.',
      easy: 'Kanadaning ikkita rasmiy milliy sporti bor: qishda xokkey, yozda lakross. Lakross juda qadimiy oʻyin — Shimoliy Amerikaning tub aholisidan kelib chiqqan. Kanadaliklar kerling, changʻi va Kanada futbolini ham yaxshi koʻradi.',
      draw: [
        { t: 'title', text: 'Sport in Canada' },
        { t: 'box', id: 'w', x: 4, y: 15, w: 42, h: 12, text: 'winter: ice hockey 🏒', color: 'blue' },
        { t: 'box', id: 's', x: 54, y: 15, w: 42, h: 12, text: 'summer: lacrosse 🥍', color: 'green' },
        { t: 'list', x: 6, y: 36, items: ['lacrosse — from the First Nations', 'also: curling, skiing', 'Canadian football'] }
      ],
      next: 'And in Uzbekistan?'
    },
    {
      kind: 'scene',
      say: 'Now Liam asks Timur about sport in Uzbekistan.',
      easy: 'Liam Oʻzbekistondagi sport haqida soʻrayapti. Timur kurash, futbol va boks haqida gapiradi. Kurash — oʻzbek milliy kurashi, u butun dunyoda mashhur.',
      draw: [],
      scene: {
        style: 'chat',
        place: '💻 Video call: Tashkent — Toronto',
        lines: [
          { who: 'liam', text: 'What about Uzbekistan? Do you have a national sport?', uz: 'Oʻzbekistonda-chi? Milliy sportingiz bormi?' },
          { who: 'timur', text: 'Yes, kurash. It’s a kind of traditional wrestling, and now people do it all over the world.', uz: 'Ha, kurash. Bu anʼanaviy kurash turi, hozir uni butun dunyoda shugʻullanishadi.' },
          { who: 'liam', text: 'Cool! Is football popular too?', uz: 'Zoʻr! Futbol ham mashhurmi?' },
          { who: 'timur', text: 'Very! And our boxers have won many Olympic medals.', uz: 'Juda! Bokschilarimiz koʻplab Olimpiada medallarini yutgan.' },
          { who: 'liam', text: 'Maybe one day you can teach me kurash, and I can teach you hockey!', uz: 'Balki bir kun sen menga kurash oʻrgatasan, men senga xokkey!' }
        ],
        words: [
          { en: 'traditional', uz: 'anʼanaviy' },
          { en: 'wrestling', uz: 'kurash' },
          { en: 'all over the world', uz: 'butun dunyoda' },
          { en: 'Olympic medals', uz: 'Olimpiada medallari' }
        ]
      },
      next: 'Compare the two countries'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Let’s compare. In Canada the national sports are ice hockey and lacrosse; in Uzbekistan it is kurash. Both countries love football. Canada is famous for winter sports because the winters are long and cold. Uzbekistan is famous for wrestling and boxing.',
      easy: 'Taqqoslash: Kanada — xokkey va lakross, qishki sport turlari; Oʻzbekiston — kurash, boks. Ikkala davlatda ham futbol sevimli.',
      draw: [
        { t: 'title', text: 'Canada and Uzbekistan' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['', 'Canada', 'Uzbekistan'],
            ['national sport', 'hockey, lacrosse', 'kurash'],
            ['also popular', 'curling, skiing', 'boxing'],
            ['both love', 'football', 'football']
          ]
        }
      ],
      next: 'To the exercises'
    }
  ],
  summary: [
    'Canada has two national sports: ice hockey (winter) and lacrosse (summer).',
    'Lacrosse comes from the First Nations; players use a stick with a net.',
    'Canadians also enjoy curling, skiing and Canadian football; kids play hockey on frozen lakes.',
    'Uzbekistan’s national sport is kurash, a kind of traditional wrestling; football and boxing are also popular.'
  ],
  questions: [
    {
      id: 'e9q1',
      prompt: 'What is Canada’s national winter sport?',
      hint: 'It is played on ice.',
      explanation: 'Ice hockey is Canada’s national winter sport.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ice hockey', 'lacrosse', 'kurash', 'basketball'], answerIndex: 0 } }
    },
    {
      id: 'e9q2',
      prompt: 'Complete the sentence.',
      hint: 'The summer national sport of Canada.',
      explanation: 'Canada’s national summer sport is lacrosse.',
      widget: { type: 'text_answer', props: { before: 'Canada’s national summer sport is', after: '.', answer: 'lacrosse', width: 9 } }
    },
    {
      id: 'e9q3',
      prompt: 'Canada or Uzbekistan? Sort the sports.',
      hint: 'Remember the comparison table.',
      explanation: 'Canada: ice hockey, lacrosse, curling. Uzbekistan: kurash, boxing.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'c', label: 'Canada' },
            { id: 'u', label: 'Uzbekistan' }
          ],
          tiles: [
            { id: 't1', label: 'ice hockey', bin: 'c' },
            { id: 't2', label: 'kurash', bin: 'u' },
            { id: 't3', label: 'lacrosse', bin: 'c' },
            { id: 't4', label: 'boxing medals', bin: 'u' },
            { id: 't5', label: 'curling', bin: 'c' }
          ]
        }
      }
    },
    {
      id: 'e9q4',
      prompt: 'True or false?',
      hint: 'Think about Liam’s answers.',
      explanation: 'Lacrosse comes from the First Nations; kids play hockey on frozen lakes; kurash is a kind of wrestling.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Lacrosse comes from the First Nations.', value: true },
            { text: 'In winter, many Canadian kids play hockey on frozen lakes.', value: true },
            { text: 'Kurash is a kind of swimming.', value: false },
            { text: 'Football is popular only in Canada.', value: false }
          ]
        }
      }
    },
    {
      id: 'e9q5',
      prompt: 'Match the words to their meanings.',
      hint: 'Think about the video call.',
      explanation: 'national — of the whole country; traditional — old and typical; frozen — turned to ice; wrestling — a fight on the ground with rules.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'national' }, right: { label: 'of the whole country' } },
            { left: { label: 'traditional' }, right: { label: 'old and typical' } },
            { left: { label: 'frozen' }, right: { label: 'turned to ice' } },
            { left: { label: 'wrestling' }, right: { label: 'a sport where two people fight with rules' } }
          ]
        }
      }
    },
    {
      id: 'e9q6',
      prompt: 'What do lacrosse players use?',
      hint: 'It catches the ball.',
      explanation: 'Lacrosse players use a stick with a net to catch and throw a small ball.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['a stick with a net', 'a racket and a shuttlecock', 'big gloves', 'a bat and a big ball'], answerIndex: 0 } }
    },
    {
      id: 'e9q7',
      prompt: 'Put the words in order.',
      hint: 'Start with “Ice hockey”.',
      explanation: 'Ice hockey is our national winter sport.',
      widget: { type: 'sentence_order', props: { words: ['Ice', 'hockey', 'is', 'our', 'national', 'winter', 'sport.'] } }
    }
  ]
};
