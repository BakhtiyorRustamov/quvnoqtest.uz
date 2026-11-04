import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G5 } from './eng-cast';

/** Student's Book: Life skills “Managing stress”. */
export const ENG_30: BoardLesson = {
  n: 30,
  label: '30',
  lang: 'en',
  group: ENG_G5,
  easyLang: 'uz',
  title: 'Life skills: Managing stress',
  section: 'Life skills',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Final exams are coming. Timur feels stressed, and Malika tries to help.',
      easy: 'Bitiruv imtihonlari yaqin. Timur stressda. stress — zoʻriqish, stressed — zoʻriqqan, pressure — bosim, relax — dam olmoq, cope with — uddalamoq, schedule — jadval, break — tanaffus.',
      draw: [],
      scene: {
        style: 'chat',
        place: '📚 The library',
        lines: [
          { who: 'timur', text: 'I have five exams in two weeks. I can’t sleep and I can’t concentrate.', uz: 'Ikki haftada beshta imtihonim bor. Uxlay olmayapman, diqqatimni jamlay olmayapman.' },
          { who: 'malika', text: 'That sounds stressful. Have you made a study schedule?', uz: 'Bu juda zoʻriqtiruvchi. Oʻqish jadvalini tuzdingmi?' },
          { who: 'timur', text: 'Not really. I just study all night.', uz: 'Unchalik emas. Shunchaki tun boʻyi oʻqiyman.' },
          { who: 'malika', text: 'That’s the problem! You need breaks and sleep to cope with the pressure.', uz: 'Muammo shu-da! Bosimni uddalash uchun tanaffus va uyqu kerak.' }
        ],
        words: [
          { en: 'stressful', uz: 'zoʻriqtiruvchi' },
          { en: 'concentrate', uz: 'diqqatni jamlamoq' },
          { en: 'schedule', uz: 'jadval' },
          { en: 'cope with', uz: 'uddalamoq' },
          { en: 'pressure', uz: 'bosim' }
        ]
      },
      next: 'Signs of stress'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Stress is normal before exams, but too much stress is not healthy. Common signs: problems sleeping, headaches, feeling tired or worried, and difficulty concentrating.',
      easy: 'Imtihon oldidan stress normal, lekin haddan tashqari stress zararli. Belgilari: uyqu muammolari, bosh ogʻrigʻi, charchoq yoki xavotir, diqqatni jamlay olmaslik.',
      draw: [
        { t: 'title', text: 'Signs of stress' },
        { t: 'list', x: 6, y: 16, items: ['problems sleeping', 'headaches', 'feeling tired or worried', 'difficulty concentrating'], color: 'red' }
      ],
      next: 'How to cope'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Ways to cope with stress. Make a realistic schedule. Take a short break every hour. Get enough sleep. Do some exercise — even a short walk helps. Talk to someone you trust. And remember: one exam does not decide your whole life.',
      easy: 'Stressni yengish yoʻllari: real jadval tuzing; har soatda qisqa tanaffus qiling; yetarlicha uxlang; jismoniy mashq qiling — qisqa sayr ham yordam beradi; ishonchli odam bilan gaplashing; bitta imtihon butun hayotingizni hal qilmaydi.',
      draw: [
        { t: 'title', text: 'How to cope' },
        { t: 'list', x: 6, y: 16, items: ['Make a realistic schedule.', 'Take a break every hour.', 'Get enough sleep.', 'Go for a short walk.', 'Talk to someone you trust.'], color: 'green' }
      ],
      next: 'A week later'
    },
    {
      kind: 'scene',
      say: 'A week later Timur feels better.',
      easy: 'Bir haftadan keyin Timur oʻzini yaxshiroq his qilyapti: jadval tuzdi, tanaffus qiladi, yaxshi uxlaydi.',
      draw: [],
      scene: {
        style: 'chat',
        place: '📚 The library, a week later',
        lines: [
          { who: 'timur', text: 'I made a schedule. Now I study for fifty minutes and then take a ten-minute break.', uz: 'Jadval tuzdim. Endi ellik daqiqa oʻqiyman, keyin oʻn daqiqa tanaffus qilaman.' },
          { who: 'malika', text: 'And are you sleeping better?', uz: 'Yaxshiroq uxlayapsanmi?' },
          { who: 'timur', text: 'Much better. I also go for a walk with my dog every evening.', uz: 'Ancha yaxshi. Har kuni kechqurun itim bilan sayr ham qilaman.' },
          { who: 'malika', text: 'Great! You’re ready for the exams — good luck!', uz: 'Zoʻr! Imtihonlarga tayyorsan — omad!' }
        ],
        words: [
          { en: 'take a break', uz: 'tanaffus qilmoq' },
          { en: 'go for a walk', uz: 'sayr qilmoq' },
          { en: 'Good luck!', uz: 'Omad!' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Stress words: stress, stressful, pressure, relax, concentrate, cope with.',
    'Signs: problems sleeping, headaches, feeling worried, difficulty concentrating.',
    'Cope: a realistic schedule, regular breaks, enough sleep, exercise, talking to someone you trust.'
  ],
  questions: [
    {
      id: 'e30q1',
      prompt: 'Sort the ideas.',
      hint: 'Does it help or make it worse?',
      explanation: 'Helpful: regular breaks, enough sleep, a short walk. Not helpful: studying all night, skipping meals, no breaks.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'h', label: 'helpful' }, { id: 'n', label: 'not helpful' }],
          tiles: [
            { id: 'a', label: 'regular breaks', bin: 'h' },
            { id: 'b', label: 'enough sleep', bin: 'h' },
            { id: 'c', label: 'a short walk', bin: 'h' },
            { id: 'd', label: 'studying all night', bin: 'n' },
            { id: 'e', label: 'skipping meals', bin: 'n' },
            { id: 'f', label: 'never stopping', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'e30q2',
      prompt: 'Match the words to their meanings.',
      hint: 'cope with = deal with successfully.',
      explanation: 'cope with — deal with successfully; concentrate — give all your attention; schedule — a plan of times; pressure — a feeling that you must do a lot.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'cope with' }, right: { label: 'deal with successfully' } },
            { left: { label: 'concentrate' }, right: { label: 'give all your attention' } },
            { left: { label: 'schedule' }, right: { label: 'a plan of times' } },
            { left: { label: 'pressure' }, right: { label: 'a feeling you must do a lot' } }
          ]
        }
      }
    },
    {
      id: 'e30q3',
      prompt: 'Which is a sign of stress?',
      hint: 'Think about sleep.',
      explanation: 'Problems sleeping can be a sign of stress.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['problems sleeping', 'feeling calm', 'enjoying a walk', 'laughing with friends'], answerIndex: 0 } }
    },
    {
      id: 'e30q4',
      prompt: 'Complete the advice.',
      hint: 'A short rest.',
      explanation: 'Take a short break every hour.',
      widget: { type: 'text_answer', props: { before: 'Take a short', after: 'every hour.', answer: 'break', width: 6 } }
    },
    {
      id: 'e30q5',
      prompt: 'True or false?',
      hint: 'Remember Timur’s story.',
      explanation: 'At first Timur studied all night; later he made a schedule and slept better.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'At first Timur studied all night.', value: true },
            { text: 'Timur now studies for three hours without a break.', value: false },
            { text: 'He goes for a walk every evening.', value: true },
            { text: 'He is still sleeping badly.', value: false }
          ]
        }
      }
    },
    {
      id: 'e30q6',
      prompt: 'Put the words in order.',
      hint: 'Start with “You need”.',
      explanation: 'You need breaks and sleep to cope with stress.',
      widget: { type: 'sentence_order', props: { words: ['You', 'need', 'breaks', 'and', 'sleep', 'to', 'cope', 'with', 'stress.'] } }
    }
  ]
};
