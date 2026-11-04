import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G4 } from './eng-cast';

/** Student's Book: Unit 16 “Lights, camera, action!” — film vocabulary, reporting verbs, reported speech. */
export const ENG_23: BoardLesson = {
  n: 23,
  label: '23',
  lang: 'en',
  group: ENG_G4,
  easyLang: 'uz',
  title: 'Lights, camera, action!',
  section: 'Unit 16',
  cast: {
    ...ENG_CAST,
    director: { name: 'Director Aziz', emoji: '', color: '#553C9A', azure: '', gender: 'm' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'The class visits a film studio in Tashkent. A director talks about making a film.',
      easy: 'Sinf kinostudiyada. director — rejissyor, actor — aktyor, scene — sahna (koʻrinish), script — ssenariy, plot — syujet, special effects — maxsus effektlar, soundtrack — film musiqasi, review — taqriz.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🎬 Uzbekfilm studio',
        lines: [
          { who: 'director', text: 'Every film starts with a script. The plot must be interesting from the first scene.', uz: 'Har bir film ssenariydan boshlanadi. Syujet birinchi sahnadan qiziq boʻlishi kerak.' },
          { who: 'malika', text: 'How long does it take to film one scene?', uz: 'Bitta sahnani suratga olish qancha vaqt oladi?' },
          { who: 'director', text: 'Sometimes a whole day! The actors repeat it many times.', uz: 'Baʼzan butun kun! Aktyorlar uni koʻp marta takrorlaydi.' },
          { who: 'timur', text: 'Do you use special effects?', uz: 'Maxsus effektlardan foydalanasizmi?' },
          { who: 'director', text: 'Yes, but a good story is more important than effects.', uz: 'Ha, lekin yaxshi hikoya effektlardan muhimroq.' }
        ],
        words: [
          { en: 'script', uz: 'ssenariy' },
          { en: 'plot', uz: 'syujet' },
          { en: 'scene', uz: 'sahna' },
          { en: 'special effects', uz: 'maxsus effektlar' },
          { en: 'soundtrack', uz: 'film musiqasi' }
        ]
      },
      next: 'Reported speech'
    },
    {
      kind: 'card',
      clear: true,
      say: 'In reported speech we usually move the tense one step back. Present simple becomes past simple; present continuous becomes past continuous; will becomes would; can becomes could. Pronouns and time words change too: now becomes then, today becomes that day.',
      easy: 'Oʻzlashtirma gapda zamon bir pogʻona orqaga suriladi: present simple → past simple, present continuous → past continuous, will → would, can → could. Olmosh va vaqt soʻzlari ham oʻzgaradi: now → then, today → that day.',
      draw: [
        { t: 'title', text: 'Reported speech' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['direct', 'reported'],
            ['“I am tired.”', 'He said he was tired.'],
            ['“We are filming.”', 'They said they were filming.'],
            ['“I will help.”', 'She said she would help.'],
            ['“I can act.”', 'He said he could act.']
          ]
        }
      ],
      next: 'Reporting verbs'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Instead of said, we can use reporting verbs. Explain that: He explained that the script was important. Promise to: She promised to come. Advise someone to: The director advised us to watch old films. Ask someone to, and tell someone to: He told the actors to start.',
      easy: 'said oʻrniga: explain that — tushuntirmoq; promise to — vaʼda bermoq; advise someone to — maslahat bermoq; ask someone to — soʻramoq; tell someone to — buyurmoq. He told the actors to start.',
      draw: [
        { t: 'title', text: 'Reporting verbs' },
        { t: 'text', x: 4, y: 16, text: 'He explained that the plot was important.', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 24, text: 'She promised to come to the premiere.', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 32, text: 'He advised us to watch old films.', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 40, text: 'He told the actors to start.', size: 's', color: 'orange' },
        { t: 'text', x: 4, y: 50, text: 'promise / advise / tell + to + verb', size: 's', color: 'red' }
      ],
      next: 'Malika reports'
    },
    {
      kind: 'scene',
      say: 'Back at school, Malika tells Mr Collins about the visit using reported speech.',
      easy: 'Malika tashrif haqida oʻzlashtirma gap bilan gapirib beradi: The director said that… He advised us to…',
      draw: [],
      scene: {
        style: 'chat',
        place: '🏫 Next day at school',
        lines: [
          { who: 'malika', text: 'The director said that every film started with a script.', uz: 'Rejissyor har bir film ssenariydan boshlanishini aytdi.' },
          { who: 'narrator', text: 'Interesting! What else did he say?', uz: 'Qiziq! Yana nima dedi?' },
          { who: 'timur', text: 'He explained that a good story was more important than effects.', uz: 'U yaxshi hikoya effektlardan muhimroq ekanini tushuntirdi.' },
          { who: 'malika', text: 'And he advised us to make our own short film!', uz: 'Va bizga oʻz qisqa filmimizni suratga olishni maslahat berdi!' }
        ],
        words: [
          { en: 'said that', uz: '… deb aytdi' },
          { en: 'explained that', uz: '… deb tushuntirdi' },
          { en: 'advised us to', uz: 'bizga … maslahat berdi' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Film words: director, actor, script, plot, scene, special effects, soundtrack, review.',
    'Reported speech: move the tense back — am → was, will → would, can → could.',
    'Reporting verbs: explain that…, promise to…, advise / tell / ask someone to…'
  ],
  questions: [
    {
      id: 'e23q1',
      prompt: 'Match the film words to their meanings.',
      hint: 'A script is written.',
      explanation: 'script — the written words of a film; plot — the story; soundtrack — the music of a film; review — an opinion article about a film.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'script' }, right: { label: 'the written words of a film' } },
            { left: { label: 'plot' }, right: { label: 'the story' } },
            { left: { label: 'soundtrack' }, right: { label: 'the music of a film' } },
            { left: { label: 'review' }, right: { label: 'an opinion article' } }
          ]
        }
      }
    },
    {
      id: 'e23q2',
      prompt: 'Report the sentence: “I am tired.”',
      hint: 'am → was.',
      explanation: 'He said he was tired.',
      widget: { type: 'mcq', props: { prompt: 'He said he ___ tired.', choices: ['was', 'is', 'were', 'has been'], answerIndex: 0 } }
    },
    {
      id: 'e23q3',
      prompt: 'Report: “I will help.”',
      hint: 'will → would.',
      explanation: 'She said she would help.',
      widget: { type: 'text_answer', props: { before: 'She said she', after: 'help.', answer: 'would', width: 6 } }
    },
    {
      id: 'e23q4',
      prompt: 'Complete with reporting verbs.',
      hint: 'promise to / advise someone to.',
      explanation: 'She promised to come. The director advised us to watch old films.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'She' }, { blank: 'promised' }, { text: 'to come. The director' }, { blank: 'advised' }, { text: 'us to watch old films.' }],
          bank: ['promised', 'advised', 'said', 'explained']
        }
      }
    },
    {
      id: 'e23q5',
      prompt: 'Match direct and reported speech.',
      hint: 'Move each tense one step back.',
      explanation: '“I can act.” — He said he could act. “We are filming.” — They said they were filming. “I like it.” — She said she liked it.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: '“I can act.”' }, right: { label: 'He said he could act.' } },
            { left: { label: '“We are filming.”' }, right: { label: 'They said they were filming.' } },
            { left: { label: '“I like it.”' }, right: { label: 'She said she liked it.' } }
          ]
        }
      }
    },
    {
      id: 'e23q6',
      prompt: 'Tap all the correct sentences.',
      hint: 'tell + person + to.',
      explanation: 'Correct: “He told the actors to start.”, “She explained that the plot was simple.”, “They promised to call.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'He told the actors to start.', match: true },
            { id: 'b', text: 'She explained that the plot was simple.', match: true },
            { id: 'c', text: 'He said me that he was busy.', match: false },
            { id: 'd', text: 'They promised to call.', match: true },
            { id: 'e', text: 'She advised to us watch it.', match: false }
          ]
        }
      }
    },
    {
      id: 'e23q7',
      prompt: 'True or false?',
      hint: 'Remember the studio visit.',
      explanation: 'Every film starts with a script; one scene can take a whole day; the director thinks the story matters more than effects.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Every film starts with a script.', value: true },
            { text: 'One scene always takes five minutes.', value: false },
            { text: 'The director thinks effects matter most.', value: false },
            { text: 'He advised the students to make a short film.', value: true }
          ]
        }
      }
    },
    {
      id: 'e23q8',
      prompt: 'Put the words in order.',
      hint: 'Start with “The director said”.',
      explanation: 'The director said that the story was important.',
      widget: { type: 'sentence_order', props: { words: ['The', 'director', 'said', 'that', 'the', 'story', 'was', 'important.'] } }
    }
  ]
};
