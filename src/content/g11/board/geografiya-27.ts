import type { BoardLesson } from './types';
import { GEO8 } from './geografiya-26';

/** Darslik: Geografiya 10, 27-§ (115–118-betlar) — Okeaniya: tarkibi (Melaneziya, Polineziya, Mikroneziya), orollar turlari, iqlimi, resurslari, aholisi, xoʻjaligi, Yangi Zelandiya. */
export const GEO_27: BoardLesson = {
  n: 27,
  label: '27',
  group: GEO8,
  title: 'Okeaniya davlatlari',
  section: '27-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Okeaniya — Tinch okeanining janubi-gʻarbiy va markaziy qismidagi orollar guruhi; umumiy maydoni 1,26 mln km², aholisi 11 mln dan ortiq. Bu yerda 40 ga yaqin davlat va hudud bor, ulardan 13 tasi mustaqil. Okeaniya uch qismga boʻlinadi: Melaneziya, Polineziya va Mikroneziya. Kelib chiqishiga koʻra orollar kontinental — Yangi Zelandiya, Yangi Gvineya, Yangi Kaledoniya; ular hududning 87 foizini egallaydi; marjon orollari — atollar va vulqon orollari boʻladi. Iqlimi asosan issiq va nam, yillik yogʻin 1500–4000 mm. Resurslar: nikel (Yangi Kaledoniya), mis va oltin (Papua — Yangi Gvineya), fosfat (Nauru).",
      easy: "Okeaniya: Melaneziya, Polineziya, Mikroneziya; 13 mustaqil davlat; orollar — kontinental, marjon (atoll), vulqon.",
      draw: [
        { t: 'title', text: 'Okeaniya qismlari' },
        { t: 'box', id: 'm', x: 4, y: 22, w: 28, h: 10, text: 'Melaneziya', color: 'green' },
        { t: 'box', id: 'p', x: 36, y: 22, w: 28, h: 10, text: 'Polineziya', color: 'blue' },
        { t: 'box', id: 'k', x: 68, y: 22, w: 28, h: 10, text: 'Mikroneziya', color: 'orange' },
        { t: 'text', x: 4, y: 46, text: 'Orollar: kontinental · marjon (atoll) · vulqon', size: 's' }
      ],
      next: 'Aholi va xoʻjalik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Okeaniya aholisi asosan polineziyaliklar, melaneziyaliklar, mikroneziyaliklar va papuaslar; muloqotda koʻproq ingliz va fransuz tillari ishlatiladi. Koʻp davlatlarning aholisi kam, iqtisodiyotini resurslar tanqisligi va orollar orasidagi aloqa qiyinligi cheklaydi. Asosiy soha — qishloq xoʻjaligi: kokos palmasi, shakarqamish, ananas, banan, kofe, kakao yetishtiriladi; Okeaniya jahondagi kopra — quritilgan kokos eksportining qariyb 10 foizini beradi. Baliqchilik va turizm rivojlanmoqda — Fidji, Solomon orollari. Eng rivojlangan davlat — Yangi Zelandiya: ikkita yirik va 700 dan ortiq kichik oroldan iborat, sut chorvachiligi, qoʻychilik, bogʻdorchilik va sanoati rivojlangan; yagona millioner shahri — Oklend.",
      easy: "Aholi kam; qishloq xoʻjaligi — kokos, ananas, banan; turizm — Fidji; eng rivojlangan — Yangi Zelandiya (Oklend).",
      draw: [
        { t: 'title', text: 'Yangi Zelandiya' },
        { t: 'list', x: 4, y: 18, items: ['2 yirik va 700+ kichik orol', 'sut chorvachiligi va qoʻychilik', 'bogʻdorchilik va uzumchilik', 'yagona millioner shahar — Oklend'] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Okeaniya — Tinch okeanidagi orollar guruhi (1,26 mln km², 11 mln dan ortiq aholi); u Melaneziya, Polineziya va Mikroneziyaga boʻlinadi, 13 ta mustaqil davlat bor.',
    'Orollar kontinental, marjon (atoll) va vulqon orollaridan iborat; nikel, mis, oltin va fosfat qazib olinadi.',
    'Asosiy soha — eksportbop qishloq xoʻjaligi (kokos, ananas, banan), baliqchilik va turizm; eng rivojlangan davlat — Yangi Zelandiya.'
  ],
  questions: [
    {
      id: 'g27q1',
      prompt: 'Okeaniyaning uch qismini tanlang.',
      hint: '«-neziya».',
      explanation: 'Melaneziya, Polineziya, Mikroneziya.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Melaneziya', correct: true },
            { label: 'Polineziya', correct: true },
            { label: 'Mikroneziya', correct: true },
            { label: 'Indoneziya' }
          ]
        }
      }
    },
    {
      id: 'g27q2',
      prompt: 'Okeaniyada nechta mustaqil davlat bor?',
      hint: 'Oʻndan koʻp.',
      explanation: '13 ta.',
      widget: { type: 'number_answer', props: { answer: 13, unit: 'ta' } }
    },
    {
      id: 'g27q3',
      prompt: 'Orolni kelib chiqish turiga ajrating.',
      hint: 'Yangi Zelandiya — kontinental.',
      explanation: 'Kontinental — Yangi Zelandiya, Yangi Gvineya, Yangi Kaledoniya; marjon orollari — atollar.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'k', label: 'kontinental' }, { id: 'm', label: 'marjon (atoll)' }],
          items: [
            { emoji: '🏔️', label: 'Yangi Zelandiya', bin: 'k' },
            { emoji: '🌳', label: 'Yangi Gvineya', bin: 'k' },
            { emoji: '⛏️', label: 'Yangi Kaledoniya', bin: 'k' },
            { emoji: '🪸', label: 'halqasimon marjon atoli', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'g27q4',
      prompt: 'Hududni resursi bilan juftlang.',
      hint: 'Nauru — fosfat.',
      explanation: 'Yangi Kaledoniya — nikel; Papua — Yangi Gvineya — mis va oltin; Nauru — fosfat.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Yangi Kaledoniya', right: 'nikel' },
            { left: 'Papua — Yangi Gvineya', right: 'mis va oltin' },
            { left: 'Nauru', right: 'fosfat' }
          ]
        }
      }
    },
    {
      id: 'g27q5',
      prompt: 'Okeaniyaning eng rivojlangan davlati qaysi?',
      hint: 'Oklend shahri.',
      explanation: 'Yangi Zelandiya.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Yangi Zelandiya', 'Nauru', 'Tonga', 'Kiribati'], answerIndex: 0 } }
    },
    {
      id: 'g27q6',
      prompt: '«Kopra» nima?',
      hint: 'Kokos.',
      explanation: 'Quritilgan kokos.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['quritilgan kokos', 'marjon turi', 'vulqon jinsi', 'baliq turi'], answerIndex: 0 } }
    },
    {
      id: 'g27q7',
      prompt: 'Okeaniyada yetishtiriladigan eksport ekinlarini tanlang.',
      hint: 'Tropik ekinlar.',
      explanation: 'Kokos palmasi, ananas, banan, shakarqamish, kakao.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'kokos palmasi', correct: true },
            { label: 'ananas', correct: true },
            { label: 'banan', correct: true },
            { label: 'kartoshka' }
          ]
        }
      }
    },
    {
      id: 'g27q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kontinental orollar — 87 %.',
      explanation: 'Kontinental orollar Okeaniya hududining 87 % ini egallaydi; muloqotda ingliz va fransuz tillari keng ishlatiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kontinental orollar Okeaniya hududining katta qismini egallaydi.', value: true },
            { text: 'Okeaniyada muloqotda ingliz va fransuz tillari keng ishlatiladi.', value: true },
            { text: 'Okeaniya Atlantika okeanida joylashgan.', value: false },
            { text: 'Atollardagi tuproqlar juda unumdor va suvni yaxshi saqlaydi.', value: false }
          ]
        }
      }
    }
  ]
};
