import type { BoardLesson } from './types';

/** Darslik: 19.01 — JavaScript: if…else, switch, massivlar (array), for va while sikllari. */
export const INF_47: BoardLesson = {
  n: 47,
  label: '47',
  part: 11,
  title: 'JavaScript: shartlar va sikllar',
  section: '19.01',
  steps: [
    {
      kind: 'hook',
      say: "Dastur vaziyatga qarab har xil ish qilishi kerak: ball yuqori boʻlsa — tabrik, past boʻlsa — maslahat. Buni shartli buyruq if bajaradi: qavs ichidagi shart rost boʻlsa, figurali qavs ichidagi kod bajariladi. else — aks holda bajariladigan qism. else if bilan bir nechta shartni ketma-ket tekshirish mumkin.",
      easy: "if (shart) { … } else { … } — shart rost boʻlsa birinchi qism, aks holda ikkinchisi.",
      draw: [],
      animTitle: 'if … else if … else',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['var ball = 74;', 'if (ball >= 86) {', '  baho = 5;', '} else if (ball >= 71) {', '  baho = 4;', '} else {', '  baho = 3;', '}', 'console.log(baho);'],
        trace: [
          { line: 1, vars: { ball: 74 } },
          { line: 2, out: '74 >= 86 ? false' },
          { line: 4, out: '74 >= 71 ? true' },
          { line: 5, vars: { baho: 4 } },
          { line: 9, out: '4' }
        ]
      },
      next: 'Variant koʻp boʻlsa-chi?'
    },
    {
      kind: 'explain',
      say: "Bitta oʻzgaruvchining aniq qiymatlariga qarab tanlash uchun switch qulay. Har bir case — bitta variant. Mos case topilgach, kod break gacha bajariladi; break boʻlmasa, keyingi case ham bajarilib ketadi. Hech biri mos kelmasa, default ishlaydi.",
      easy: "switch (kun) { case 1: … break; default: … } — aniq qiymatlar boʻyicha tanlash.",
      draw: [],
      animTitle: 'switch',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['var kun = 6;', 'switch (kun) {', '  case 6:', '  case 7:', '    t = "Dam olish";', '    break;', '  default:', '    t = "Ish kuni";', '}'],
        trace: [
          { line: 1, vars: { kun: 6 } },
          { line: 3, out: 'case 6 mos keldi' },
          { line: 5, vars: { t: '"Dam olish"' } },
          { line: 6, out: 'break — switch tugadi' }
        ]
      },
      next: 'Massiv nima?'
    },
    {
      kind: 'explain',
      say: "Massiv — array — bitta nom ostida koʻp qiymat saqlaydi. Elementlar kvadrat qavsda vergul bilan yoziladi. Har elementning indeksi bor va u noldan boshlanadi: birinchi element — nolinchi indeks. length — elementlar soni. push oxiriga yangi element qoʻshadi.",
      easy: "var a = [\"olma\", \"nok\"]; a[0] — \"olma\". length — soni, push — qoʻshish.",
      draw: [],
      animTitle: 'Massiv (array)',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['var f = ["olma", "nok", "uzum"];', 'console.log(f[0]);', 'console.log(f[2]);', 'f.push("anor");', 'console.log(f.length);'],
        trace: [
          { line: 1, vars: { f: '[olma, nok, uzum]' } },
          { line: 2, out: 'olma  ← indeks 0' },
          { line: 3, out: 'uzum  ← indeks 2' },
          { line: 4, vars: { f: '[olma, nok, uzum, anor]' } },
          { line: 5, out: '4' }
        ]
      },
      next: 'Qanday takrorlaymiz?'
    },
    {
      kind: 'explain',
      say: "Sikl — iteratsiya — kodni takrorlaydi. for siklida uch qism bor: boshlangʻich qiymat, davom etish sharti va qadam. i nol dan boshlanadi, i massiv uzunligidan kichik ekan, takrorlanadi va har safar i bittaga oshadi. Shunday qilib massivning har bir elementi navbatma-navbat chiqariladi.",
      easy: "for (var i = 0; i < n; i++) { … } — i = 0, 1, 2 … n−1 uchun takrorlanadi.",
      draw: [],
      animTitle: 'for sikli',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['var f = ["olma", "nok", "uzum"];', 'for (var i=0; i<f.length; i++) {', '  document.write(f[i] + " ");', '}'],
        trace: [
          { line: 1, vars: { f: '[olma, nok, uzum]' } },
          { line: 2, vars: { i: 0 } },
          { line: 3, page: 'olma' },
          { line: 2, vars: { i: 1 } },
          { line: 3, page: 'olma nok' },
          { line: 2, vars: { i: 2 } },
          { line: 3, page: 'olma nok uzum' },
          { line: 2, vars: { i: 3 }, out: '3 < 3 ? false — sikl tugadi' }
        ]
      },
      next: 'while nima?'
    },
    {
      kind: 'explain',
      say: "while sikli shart rost ekan takrorlanadi. Takrorlar soni oldindan nomaʼlum boʻlganda qulay: masalan, yigʻindi yuzdan oshguncha. Ichida shartni oʻzgartiradigan qadam boʻlishi shart, aks holda sikl cheksiz davom etadi. break siklni darhol toʻxtatadi.",
      easy: "while (shart) { … } — shart rost ekan takrorlanadi. Shartni oʻzgartirishni unutmang!",
      draw: [],
      animTitle: 'while sikli',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['var s = 0;', 'var n = 1;', 'while (s < 10) {', '  s = s + n;', '  n = n + 1;', '}', 'console.log(s, n);'],
        trace: [
          { line: 1, vars: { s: 0 } },
          { line: 2, vars: { n: 1 } },
          { line: 4, vars: { s: 1 } },
          { line: 5, vars: { n: 2 } },
          { line: 4, vars: { s: 3 } },
          { line: 5, vars: { n: 3 } },
          { line: 4, vars: { s: 6 } },
          { line: 5, vars: { n: 4 } },
          { line: 4, vars: { s: 10 } },
          { line: 5, vars: { n: 5 } },
          { line: 3, out: '10 < 10 ? false — chiqdi' },
          { line: 7, out: '10 5' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'if (shart) { … } else if (…) { … } else { … } — shartga qarab tanlash.',
    'switch aniq qiymatlar boʻyicha tanlaydi; har case dan keyin break; hech biri mos kelmasa — default.',
    'Massiv bitta nom ostida koʻp qiymat saqlaydi; indeks 0 dan boshlanadi; length — soni, push — qoʻshish.',
    'for (var i = 0; i < n; i++) — takrorlar soni maʼlum boʻlganda.',
    'while (shart) — shart rost ekan takrorlanadi; ichida shartni oʻzgartirish kerak, aks holda sikl cheksiz.'
  ],
  questions: [
    {
      id: 'i47q1',
      prompt: 'var f = ["qizil", "yashil", "koʻk", "sariq"]; f[2] nima?',
      hint: 'Indeks 0 dan boshlanadi.',
      explanation: 'f[0] — qizil, f[1] — yashil, f[2] — koʻk.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'koʻk', match: true },
            { id: 'b', text: 'yashil', match: false },
            { id: 'c', text: 'sariq', match: false }
          ]
        }
      }
    },
    {
      id: 'i47q2',
      prompt: 'for (var i = 1; i <= 5; i++) — sikl tanasi necha marta bajariladi?',
      hint: 'i = 1, 2, 3 …',
      explanation: 'i = 1, 2, 3, 4, 5 — 5 marta.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'marta' } }
    },
    {
      id: 'i47q3',
      prompt: 'var s = 0; for (var i = 1; i <= 4; i++) { s = s + i; } — oxirida s nechaga teng?',
      hint: '1 + 2 + 3 + 4',
      explanation: '1 + 2 + 3 + 4 = 10.',
      widget: { type: 'number_answer', props: { answer: 10 } }
    },
    {
      id: 'i47q4',
      prompt: 'var t = 30; if (t > 25) { x = "issiq"; } else if (t > 15) { x = "iliq"; } else { x = "sovuq"; } — x nima?',
      hint: 'Birinchi rost shart.',
      explanation: '30 > 25 — rost, shuning uchun x = "issiq"; qolgan shartlar tekshirilmaydi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'issiq', match: true },
            { id: 'b', text: 'iliq', match: false },
            { id: 'c', text: 'sovuq', match: false }
          ]
        }
      }
    },
    {
      id: 'i47q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'break, default, indeks.',
      explanation: 'break boʻlmasa keyingi case ham bajariladi; default — hech biri mos kelmasa; massiv indeksi 0 dan; while ichida shart oʻzgarmasa — cheksiz sikl.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'switch da break boʻlmasa, keyingi case ham bajarilishi mumkin.', value: true },
            { text: 'Massivning birinchi elementi indeksi 1.', value: false },
            { text: 'default — hech bir case mos kelmaganda bajariladi.', value: true },
            { text: 'while ichida shart oʻzgarmasa ham sikl albatta tugaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i47q6',
      prompt: 'var a = [3, 8, 1]; a.push(6); a.length nechaga teng?',
      hint: 'push bitta qoʻshadi.',
      explanation: '[3, 8, 1, 6] — 4 ta element.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'i47q7',
      prompt: 'Konstruksiyani vazifasi bilan juftlang.',
      hint: 'Tanlash yoki takrorlash.',
      explanation: 'if — shart boʻyicha tanlash; switch — aniq qiymatlar boʻyicha tanlash; for — maʼlum marta takrorlash; while — shart rost ekan takrorlash.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'if … else' }, right: { label: 'shart boʻyicha tanlash' } },
            { left: { label: 'switch' }, right: { label: 'aniq qiymatlar boʻyicha tanlash' } },
            { left: { label: 'for' }, right: { label: 'maʼlum marta takrorlash' } },
            { left: { label: 'while' }, right: { label: 'shart rost ekan takrorlash' } }
          ]
        }
      }
    },
    {
      id: 'i47q8',
      prompt: 'var n = 1; while (n < 50) { n = n * 2; } — oxirida n nechaga teng?',
      hint: '1, 2, 4, 8 …',
      explanation: '1 ➜ 2 ➜ 4 ➜ 8 ➜ 16 ➜ 32 ➜ 64; 64 < 50 emas — toʻxtaydi. n = 64.',
      widget: { type: 'number_answer', props: { answer: 64 } }
    },
    {
      id: 'i47q9',
      prompt: 'Massivdagi har bir elementni chiqaruvchi for sikli qismlarini tartiblang.',
      hint: 'for ( boshlanish ; shart ; qadam )',
      explanation: 'var i = 0 ➜ i < f.length ➜ i++ ➜ document.write(f[i]).',
      widget: { type: 'step_order', props: { steps: ['var i = 0', 'i < f.length', 'i++', 'document.write(f[i])'] } }
    },
    {
      id: 'i47q10',
      prompt: 'switch ichida case bajarilgandan keyin undan chiqish uchun yoziladigan kalit soʻz.',
      hint: 'Inglizcha «uzish».',
      explanation: 'break.',
      widget: { type: 'text_answer', props: { answer: ['break', 'break;'], width: 7 } }
    }
  ]
};
