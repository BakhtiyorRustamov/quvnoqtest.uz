import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G4 } from './eng-cast';

/** Student's Book: Unit 14 “Let's cook!” — cooking verbs, transitive and intransitive verbs, relative clauses. */
export const ENG_20: BoardLesson = {
  n: 20,
  label: '20',
  lang: 'en',
  group: ENG_G4,
  easyLang: 'uz',
  title: 'Let’s cook!',
  section: 'Unit 14',
  cast: {
    ...ENG_CAST,
    chef: { name: 'Chef Dilnoza', emoji: '', color: '#C05621', azure: '', gender: 'f' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'The class visits a cooking school. Chef Dilnoza shows them how to make plov.',
      easy: 'Sinf oshpazlik maktabida. chop — toʻgʻramoq, fry — qovurmoq, boil — qaynatmoq, stir — aralashtirmoq, add — qoʻshmoq, pour — quymoq, bake — pishirmoq (pechda), slice — tilimlamoq.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🍳 A cooking school in Tashkent',
        lines: [
          { who: 'chef', text: 'First, chop the onions and slice the carrots into long thin strips.', uz: 'Avval piyozni toʻgʻrang va sabzini uzun ingichka qilib tilimlang.' },
          { who: 'chef', text: 'Then fry the meat in hot oil in the kazan.', uz: 'Keyin goʻshtni qozonda qaynoq yogʻda qovuring.' },
          { who: 'malika', text: 'When do we add the rice?', uz: 'Guruchni qachon qoʻshamiz?' },
          { who: 'chef', text: 'After the carrots. Pour in water, but don’t stir the rice!', uz: 'Sabzidan keyin. Suv quying, lekin guruchni aralashtirmang!' },
          { who: 'timur', text: 'The water is boiling already!', uz: 'Suv allaqachon qaynayapti!' }
        ],
        words: [
          { en: 'chop', uz: 'toʻgʻramoq' },
          { en: 'slice', uz: 'tilimlamoq' },
          { en: 'fry', uz: 'qovurmoq' },
          { en: 'stir', uz: 'aralashtirmoq' },
          { en: 'pour', uz: 'quymoq' },
          { en: 'boil', uz: 'qaynamoq' }
        ]
      },
      next: 'Transitive or intransitive?'
    },
    {
      kind: 'card',
      clear: true,
      say: 'A transitive verb needs an object: chop the onions, add the rice. An intransitive verb has no object: The water is boiling. The cake rose. Some verbs can be both: I boil the water — transitive; The water boils — intransitive.',
      easy: 'Oʻtimli feʼl toʻldiruvchi talab qiladi: chop the onions. Oʻtimsiz feʼl toʻldiruvchisiz: The water is boiling. Baʼzi feʼllar ikkalasi ham boʻladi: I boil the water / The water boils.',
      draw: [
        { t: 'title', text: 'Transitive and intransitive' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 12, text: 'verb + object', color: 'blue' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'verb, no object', color: 'green' },
        { t: 'text', x: 6, y: 36, text: 'Chop the onions.', size: 's', color: 'blue' },
        { t: 'text', x: 54, y: 36, text: 'The water boils.', size: 's', color: 'green' },
        { t: 'text', x: 6, y: 50, text: 'both: I boil the water / The water boils.', size: 's', color: 'orange' }
      ],
      next: 'Relative clauses'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Defining relative clauses give necessary information, with no commas: The chef who taught us is famous. Use who for people, which or that for things, where for places, whose for possession. Non-defining clauses add extra information between commas, and we cannot use that: Plov, which is our national dish, is cooked in a kazan.',
      easy: 'Aniqlovchi ergash gap — zarur maʼlumot, vergulsiz: The chef who taught us is famous. who — odam, which/that — narsa, where — joy, whose — egalik. Qoʻshimcha maʼlumot — vergul bilan, that ishlatilmaydi: Plov, which is our national dish, …',
      draw: [
        { t: 'title', text: 'Relative clauses' },
        { t: 'box', id: 'a', x: 2, y: 15, w: 22, h: 10, text: 'who: people', color: 'blue' },
        { t: 'box', id: 'b', x: 26, y: 15, w: 22, h: 10, text: 'which: things', color: 'green' },
        { t: 'box', id: 'c', x: 50, y: 15, w: 22, h: 10, text: 'where: places', color: 'purple' },
        { t: 'box', id: 'd', x: 74, y: 15, w: 24, h: 10, text: 'whose: owner', color: 'orange' },
        { t: 'text', x: 4, y: 36, text: 'The chef who taught us is famous.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 44, text: 'Plov, which is our national dish, …', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 54, text: 'extra information: commas, no that', size: 's', color: 'red' }
      ],
      next: 'At the table'
    },
    {
      kind: 'scene',
      say: 'The plov is ready. Listen to the relative clauses.',
      easy: 'Osh tayyor. Ergash gaplarga eʼtibor bering: the kazan which we used, the market where we bought, the friend whose mother…',
      draw: [],
      scene: {
        style: 'chat',
        place: '🍽️ At the table',
        lines: [
          { who: 'timur', text: 'This is the best plov that I have ever tasted!', uz: 'Bu men tatib koʻrgan eng mazali osh!' },
          { who: 'chef', text: 'The rice, which comes from Khorezm, is very good quality.', uz: 'Xorazmdan keltirilgan guruch juda sifatli.' },
          { who: 'malika', text: 'Is that the market where you buy your spices?', uz: 'Ziravorlaringizni oʻsha bozordan olasizmi?' },
          { who: 'chef', text: 'Yes, Chorsu — the market where every cook in Tashkent goes.', uz: 'Ha, Chorsu — Toshkentdagi har bir oshpaz boradigan bozor.' }
        ],
        words: [
          { en: 'the best … that I have ever', uz: 'men koʻrgan eng …' },
          { en: 'which comes from', uz: '…dan keltirilgan' },
          { en: 'the market where', uz: '… boradigan bozor' },
          { en: 'spices', uz: 'ziravorlar' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Cooking verbs: chop, slice, fry, boil, stir, add, pour, bake.',
    'Transitive verbs need an object (chop the onions); intransitive verbs don’t (the water boils).',
    'Relative pronouns: who (people), which / that (things), where (places), whose (possession).',
    'Non-defining clauses add extra information between commas and never use that.'
  ],
  questions: [
    {
      id: 'e20q1',
      prompt: 'Match the cooking verbs to their meanings.',
      hint: 'Think about the plov recipe.',
      explanation: 'chop — cut into small pieces; fry — cook in hot oil; stir — mix with a spoon; pour — make a liquid flow.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'chop' }, right: { label: 'cut into small pieces' } },
            { left: { label: 'fry' }, right: { label: 'cook in hot oil' } },
            { left: { label: 'stir' }, right: { label: 'mix with a spoon' } },
            { left: { label: 'pour' }, right: { label: 'make a liquid flow' } }
          ]
        }
      }
    },
    {
      id: 'e20q2',
      prompt: 'Sort the sentences.',
      hint: 'Is there an object after the verb?',
      explanation: 'Transitive: Chop the onions. Add the rice. Intransitive: The water is boiling. The bread rose.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 't', label: 'transitive' }, { id: 'i', label: 'intransitive' }],
          tiles: [
            { id: 'a', label: 'Chop the onions.', bin: 't' },
            { id: 'b', label: 'Add the rice.', bin: 't' },
            { id: 'c', label: 'The water is boiling.', bin: 'i' },
            { id: 'd', label: 'The bread rose.', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'e20q3',
      prompt: 'Choose the correct relative pronoun.',
      hint: 'A person.',
      explanation: 'The chef who taught us is famous.',
      widget: { type: 'mcq', props: { prompt: 'The chef ___ taught us is famous.', choices: ['who', 'which', 'where', 'whose'], answerIndex: 0 } }
    },
    {
      id: 'e20q4',
      prompt: 'Complete with who, which, where or whose.',
      hint: 'place → where, possession → whose.',
      explanation: 'Chorsu is the market where cooks buy spices. Aziz is the boy whose mother is a chef.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Chorsu is the market' }, { blank: 'where' }, { text: 'cooks buy spices. Aziz is the boy' }, { blank: 'whose' }, { text: 'mother is a chef.' }],
          bank: ['where', 'whose', 'who', 'which']
        }
      }
    },
    {
      id: 'e20q5',
      prompt: 'Tap all the correct sentences.',
      hint: 'No that after a comma.',
      explanation: 'Correct: “Plov, which is our national dish, is delicious.”, “This is the kazan that we used.”, “The girl who cooked it is my sister.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Plov, which is our national dish, is delicious.', match: true },
            { id: 'b', text: 'Plov, that is our national dish, is delicious.', match: false },
            { id: 'c', text: 'This is the kazan that we used.', match: true },
            { id: 'd', text: 'The girl who cooked it is my sister.', match: true },
            { id: 'e', text: 'The man which sells spices is kind.', match: false }
          ]
        }
      }
    },
    {
      id: 'e20q6',
      prompt: 'Put the plov steps in order.',
      hint: 'Rice goes in near the end.',
      explanation: 'Chop the vegetables → fry the meat → add the carrots → add the rice and water.',
      widget: { type: 'step_order', props: { steps: ['Chop the onions and carrots.', 'Fry the meat in hot oil.', 'Add the carrots.', 'Add the rice and pour in water.'] } }
    },
    {
      id: 'e20q7',
      prompt: 'Complete the sentence.',
      hint: 'Extra information about a thing.',
      explanation: 'The rice, which comes from Khorezm, is very good.',
      widget: { type: 'text_answer', props: { before: 'The rice,', after: 'comes from Khorezm, is very good.', answer: 'which', width: 6 } }
    },
    {
      id: 'e20q8',
      prompt: 'Put the words in order.',
      hint: 'Start with “This is the best”.',
      explanation: 'This is the best plov that I have ever tasted.',
      widget: { type: 'sentence_order', props: { words: ['This', 'is', 'the', 'best', 'plov', 'that', 'I', 'have', 'ever', 'tasted.'] } }
    }
  ]
};
