import type { BoardLesson } from './types';
import { cuboid } from './geo3d';

/** Darslik: Geometriya, 5-mavzu (146–152-betlar) — koʻpyoqli burchaklar va koʻpyoqlar. */
export const MATH_32: BoardLesson = {
  n: 32,
  label: "5",
  part: 'geometriya',
  title: "Koʻpyoqli burchaklar va koʻpyoqlar bilan tanishuv",
  section: 'Geometriya, 5',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Sovgʻa qutisini oling va sanang: yoqlari 6 ta, uchlari 8 ta, qirralari 12 ta. Endi hisoblang: 6 plyus 8 minus 12 — 2 chiqdi. Uchburchakli piramida: 4 yoq, 4 uch, 6 qirra — yana 2! Bu tasodif emas, har qanday qavariq koʻpyoq uchun shunday. Bugun shu sirli qonunni oʻrganamiz.",
      easy: "Yoqlar plyus uchlar minus qirralar har doim 2 ga teng. Quti uchun: 6 + 8 − 12 = 2.",
      draw: [
        { t: 'title', text: 'Qutini sanaymiz' },
        ...cuboid('q', [3, 5, 3], [16, 54], 6, {}, 'orange'),
        { t: 'list', x: 62, y: 20, items: ['yoqlar: 6', 'uchlar: 8', 'qirralar: 12'] },
        { t: 'box', id: 'r', x: 60, y: 48, w: 34, h: 12, text: '6 + 8 − 12 = 2', color: 'green' }
      ],
      next: 'Avval burchaklar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kitobni yarim ochib qoʻying. Ikki varaq — ikkita yarimtekislik, muqova chizigʻi — ularning umumiy chegarasi. Bunday shakl ikkiyoqli burchak deyiladi: yarimtekisliklar — yoqlari, umumiy toʻgʻri chiziq — qirrasi. Qirraning bir nuqtasidan har bir yoqda qirraga perpendikulyar nur chiqarsak, ular orasidagi burchak — chiziqli burchak. Ikkiyoqli burchak shu chiziqli burchak bilan oʻlchanadi.",
      easy: "Yarim ochilgan kitob — ikkiyoqli burchak. Uni qirraga perpendikulyar nurlar orasidagi burchak bilan oʻlchaymiz.",
      draw: [
        { t: 'title', text: 'Ikkiyoqli burchak' },
        { t: 'icon', x: 10, y: 32, emoji: '📖', size: 'l' },
        { t: 'point', id: 'A', x: 40, y: 22, label: 'A' },
        { t: 'point', id: 'B', x: 40, y: 58, label: 'B' },
        { t: 'point', id: 'P', x: 40, y: 44, label: 'P' },
        { t: 'point', id: 'q1', x: 26, y: 50, hide: true },
        { t: 'point', id: 'q2', x: 26, y: 14, hide: true },
        { t: 'point', id: 'r1', x: 60, y: 54, hide: true },
        { t: 'point', id: 'r2', x: 60, y: 18, hide: true },
        { t: 'polygon', points: ['A', 'B', 'q1', 'q2'], color: 'blue' },
        { t: 'polygon', points: ['A', 'B', 'r1', 'r2'], color: 'green' },
        { t: 'point', id: 'Q', x: 30, y: 46, label: 'Q' },
        { t: 'point', id: 'R', x: 54, y: 47, label: 'R' },
        { t: 'line', from: 'P', to: 'Q', color: 'red' },
        { t: 'line', from: 'P', to: 'R', color: 'red' },
        { t: 'list', x: 64, y: 26, items: ['AB — qirra', '∠QPR — chiziqli', 'burchak'] }
      ],
      next: 'Uchyoqli burchak'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bir nuqtadan chiqqan uchta nur uchta tekis burchak hosil qiladi — bu uchyoqli burchak. Uning tekis burchaklari uchun uchburchak tengsizligiga oʻxshash qoida bor: istalgan ikkitasining yigʻindisi uchinchisidan katta. Va uchala tekis burchakning yigʻindisi 360 gradusdan kichik. Masalan, 30, 60 va 20 gradusli uchyoqli burchak mavjud emas, chunki 30 plyus 20 kichik 60 dan.",
      easy: "Ikki tekis burchak yigʻindisi uchinchisidan katta, uchalasining yigʻindisi 360 dan kichik.",
      draw: [
        { t: 'title', text: 'Uchyoqli burchak' },
        { t: 'point', id: 'S', x: 22, y: 16, label: 'S' },
        { t: 'point', id: 'a', x: 8, y: 58, hide: true },
        { t: 'point', id: 'b', x: 26, y: 62, hide: true },
        { t: 'point', id: 'c', x: 42, y: 54, hide: true },
        { t: 'line', from: 'S', to: 'a' },
        { t: 'line', from: 'S', to: 'b' },
        { t: 'line', from: 'S', to: 'c', dashed: true },
        { t: 'list', x: 50, y: 22, items: ['α + β > γ', 'α + γ > β', 'β + γ > α', 'α + β + γ < 360°'] },
        { t: 'text', x: 50, y: 60, text: '30°, 60°, 20° — mavjud emas', size: 's', color: 'red' }
      ],
      next: 'Koʻpyoqlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Koʻpyoq — yassi koʻpburchaklar bilan chegaralangan jism. Har qanday yogʻi yotgan tekislikning bir tomonida yotsa, u qavariq koʻpyoq. Yoqlar sonini Y, uchlar sonini U, qirralar sonini Q bilan belgilab, jadval tuzamiz. Uchburchakli piramida: 4, 4, 6. Toʻrtburchakli piramida: 5, 5, 8. Uchburchakli prizma: 5, 6, 9. n burchakli prizma: n plyus 2, 2n, 3n.",
      easy: "Har bir koʻpyoq uchun yoqlar, uchlar va qirralarni sanaymiz.",
      draw: [
        { t: 'title', text: 'Y, U, Q jadvali' },
        {
          t: 'table',
          x: 8,
          y: 18,
          rows: [
            ['koʻpyoq', 'Y', 'U', 'Q'],
            ['uchburchakli piramida', '4', '4', '6'],
            ['toʻrtburchakli piramida', '5', '5', '8'],
            ['uchburchakli prizma', '5', '6', '9'],
            ['n burchakli prizma', 'n + 2', '2n', '3n']
          ]
        }
      ],
      next: 'Eyler teoremasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1752-yilda Leonard Eyler isbotladi: har qanday qavariq koʻpyoq uchun Y plyus U minus Q teng 2. Natijalar: tekis burchaklar soni qirralar sonidan ikki marta koʻp va shuning uchun har doim juft. Eyler formulasi bilan nomaʼlum sonni topish oson: 8 ta uch va 12 ta qirra boʻlsa, yoqlar soni 6.",
      easy: "Eyler: Y + U − Q = 2. Ikki son maʼlum boʻlsa, uchinchisini topamiz.",
      draw: [
        { t: 'title', text: 'Eyler teoremasi' },
        { t: 'box', id: 'e', x: 14, y: 20, w: 60, h: 14, text: 'Y + U − Q = 2', color: 'blue' },
        { t: 'list', x: 8, y: 42, items: ['U = 8, Q = 12  →  Y = 2 + 12 − 8 = 6', 'tekis burchaklar soni = 2Q'] }
      ],
      next: 'Muntazam koʻpyoqlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yoqlari bir xil muntazam koʻpburchaklardan iborat va har bir uchidan bir xil sondagi qirra chiqadigan qavariq koʻpyoq muntazam koʻpyoq deyiladi. Ular faqat besh xil: tetraedr — 4 uchburchak, kub — 6 kvadrat, oktaedr — 8 uchburchak, dodekaedr — 12 beshburchak, ikosaedr — 20 uchburchak. Qadimgi yunonlar ularni Platon jismlari deb atagan.",
      easy: "Muntazam koʻpyoqlar faqat 5 ta: tetraedr, kub, oktaedr, dodekaedr, ikosaedr.",
      draw: [
        { t: 'title', text: 'Besh muntazam koʻpyoq' },
        {
          t: 'table',
          x: 8,
          y: 18,
          rows: [
            ['nomi', 'yoqlar', 'U', 'Q'],
            ['tetraedr', '4 uchburchak', '4', '6'],
            ['kub', '6 kvadrat', '8', '12'],
            ['oktaedr', '8 uchburchak', '6', '12'],
            ['dodekaedr', '12 beshburchak', '20', '30'],
            ['ikosaedr', '20 uchburchak', '12', '30']
          ]
        }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Ikkiyoqli burchak chiziqli burchagi bilan oʻlchanadi; uchyoqli burchakning tekis burchaklari yigʻindisi 360° dan kichik.',
    'Eyler teoremasi: har qanday qavariq koʻpyoq uchun Y + U − Q = 2.',
    'Muntazam koʻpyoqlar besh xil: tetraedr, kub, oktaedr, dodekaedr, ikosaedr.'
  ],
  questions: [
    {
      id: 'm32q1',
      prompt: 'Qavariq koʻpyoqning 8 ta uchi va 12 ta qirrasi bor. Uning nechta yogʻi bor?',
      hint: 'Y = 2 − U + Q.',
      explanation: 'Y = 2 − 8 + 12 = 6.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'm32q2',
      prompt: 'Uchlari soni 10 ta, yoqlari soni 7 ta boʻlgan koʻpyoqning nechta qirrasi bor?',
      hint: 'Q = Y + U − 2.',
      explanation: 'Q = 7 + 10 − 2 = 15.',
      widget: { type: 'number_answer', props: { answer: 15 } }
    },
    {
      id: 'm32q3',
      prompt: 'Ikkiyoqli burchak 52° ga teng. Unga qoʻshni ikkiyoqli burchak necha gradus?',
      hint: 'Qoʻshni burchaklar yigʻindisi 180°.',
      explanation: '180° − 52° = 128°.',
      widget: { type: 'number_answer', props: { answer: 128, unit: '°' } }
    },
    {
      id: 'm32q4',
      prompt: 'Har bir muntazam koʻpyoqqa uning yoqlarini moslang.',
      hint: 'Nomida yoqlar soni yashiringan: tetra — 4, okta — 8, dodeka — 12.',
      explanation: 'Tetraedr — 4 uchburchak, kub — 6 kvadrat, oktaedr — 8 uchburchak, dodekaedr — 12 beshburchak.',
      widget: {
        type: 'match_pairs',
        props: { pairs: [{ left: 'Tetraedr', right: '4 ta uchburchak' }, { left: 'Kub', right: '6 ta kvadrat' }, { left: 'Oktaedr', right: '8 ta uchburchak' }, { left: 'Dodekaedr', right: '12 ta beshburchak' }] }
      }
    },
    {
      id: 'm32q5',
      prompt: '5 burchakli prizmaning nechta qirrasi bor?',
      hint: 'n burchakli prizmada 3n qirra.',
      explanation: '3 · 5 = 15.',
      widget: { type: 'number_answer', props: { answer: 15 } }
    },
    {
      id: 'm32q6',
      prompt: 'Qaysi biri muntazam koʻpyoq emas? Ortiqchasini bosing.',
      hint: 'Muntazam koʻpyoqning barcha yoqlari bir xil.',
      explanation: 'Toʻrtburchakli piramidaning yoqlari har xil: kvadrat va uchburchaklar.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Tetraedr' }, { text: 'Kub' }, { text: 'Oktaedr' }, { text: 'Toʻrtburchakli piramida', odd: true }] } }
    },
    {
      id: 'm32q7',
      prompt: 'Koʻpyoqning 62 ta yogʻi va 120 ta uchi bor. Qirralari nechta?',
      hint: 'Q = Y + U − 2.',
      explanation: '62 + 120 − 2 = 180.',
      widget: { type: 'number_answer', props: { answer: 180 } }
    },
    {
      id: 'm32q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Platon jismlarini eslang.',
      explanation: 'Uchyoqli burchak tekis burchaklari yigʻindisi < 360°; ikosaedrning 20 yogʻi bor; muntazam koʻpyoqlar 5 xil; n burchakli prizmada 3n qirra.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Uchyoqli burchakning tekis burchaklari yigʻindisi 360° dan kichik.', value: true },
            { text: 'Ikosaedrning 20 ta yogʻi bor.', value: true },
            { text: 'Muntazam koʻpyoqlar 6 xil.', value: false },
            { text: 'Kubda Y + U − Q = 4.', value: false }
          ]
        }
      }
    }
  ]
};
