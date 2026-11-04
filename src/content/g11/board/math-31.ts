import type { BoardLesson } from './types';

/** Darslik: Geometriya, 3-mavzu (133–139-betlar) — fazoda almashtirishlar va oʻxshashlik. */
export const MATH_31: BoardLesson = {
  n: 31,
  label: "3",
  part: 'geometriya',
  title: "Fazodagi almashtirishlar va oʻxshash shakllar",
  section: 'Geometriya, 3',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Qurilishda minorali kran relslar boʻylab 40 metr suriladi. Kranning har bir nuqtasi — ilmoq ham, kabina ham — bir xil yoʻnalishda aynan 40 metr siljiydi. Shakli ham, oʻlchami ham oʻzgarmaydi. Bu parallel koʻchirish — fazoviy almashtirishlarning eng soddasi.",
      easy: "Kranning hamma nuqtasi bir xil yoʻnalishda bir xil masofaga siljiydi. Bu — parallel koʻchirish.",
      draw: [
        { t: 'title', text: 'Kran surilmoqda' },
        { t: 'icon', x: 14, y: 34, emoji: '🏗️', size: 'l' },
        { t: 'icon', x: 70, y: 34, emoji: '🏗️', size: 'l' },
        { t: 'point', id: 'a', x: 26, y: 52, hide: true },
        { t: 'point', id: 'b', x: 66, y: 52, hide: true },
        { t: 'line', from: 'a', to: 'b', arrow: true, color: 'red', label: '40 m' },
        { t: 'text', x: 20, y: 66, text: 'Har bir nuqta bir xil vektor boʻyicha', color: 'purple' }
      ],
      next: 'Bu qanday yoziladi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Nuqtalar orasidagi masofani saqlaydigan almashtirish harakat deyiladi. Harakatda kesma teng kesmaga, burchak teng burchakka oʻtadi. Parallel koʻchirishda KP vektor (a; b; c) boʻyicha har bir X(x; y; z) nuqta X1(x plyus a; y plyus b; z plyus c) ga oʻtadi. 1-masala: P(minus 2; 4; 6) nuqta p(3; 2; 5) vektor boʻyicha (1; 6; 11) ga oʻtadi.",
      easy: "Parallel koʻchirishda har bir koordinataga vektorning mos koordinatasi qoʻshiladi.",
      draw: [
        { t: 'title', text: 'Parallel koʻchirish' },
        { t: 'formula', x: 6, y: 20, text: 'x₁ = x + a,  y₁ = y + b,  z₁ = z + c' },
        { t: 'text', x: 6, y: 38, text: 'P(−2; 4; 6),  p(3; 2; 5)' },
        { t: 'box', id: 'r', x: 6, y: 46, w: 48, h: 12, text: 'P₁(1; 6; 11)', color: 'green' },
        { t: 'text', x: 60, y: 54, text: 'harakat: masofa saqlanadi', size: 's', color: 'purple' }
      ],
      next: 'Simmetriyalar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Markaziy simmetriya: O nuqta A A1 kesmaning oʻrtasi boʻlsa, A va A1 O ga nisbatan simmetrik. 2-masala: O(2; 4; 6) ga nisbatan A(1; 2; 3) qayerga oʻtadi? Oʻrta formulasi: 2 teng x plyus 1 boʻlinsin 2, demak x teng 3. Xuddi shunday y teng 6, z teng 9. A1(3; 6; 9). Qisqa usul: A1 teng 2O minus A.",
      easy: "O — oʻrta nuqta. A1 = 2O − A = (3; 6; 9).",
      draw: [
        { t: 'title', text: 'Markaziy simmetriya' },
        { t: 'point', id: 'A', x: 12, y: 56, label: 'A(1; 2; 3)' },
        { t: 'point', id: 'O', x: 42, y: 40, label: 'O(2; 4; 6)' },
        { t: 'point', id: 'B', x: 72, y: 24, label: 'A₁(3; 6; 9)' },
        { t: 'line', from: 'A', to: 'B', dashed: true },
        { t: 'formula', x: 54, y: 52, text: 'A₁ = 2·O − A' }
      ],
      next: 'Oyna-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tekislikka nisbatan simmetriya — oyna. A va A1 nuqtalar, agar tekislik A A1 kesmaga perpendikulyar boʻlib, uni teng ikkiga boʻlsa, simmetrik. Toʻgʻri chiziqqa nisbatan burish: nuqta chiziq atrofida phi burchakka aylanadi. 180 gradusga burish — toʻgʻri chiziqqa nisbatan simmetriya. Bularning barchasi harakatlardir.",
      easy: "Oyna — tekislikka nisbatan simmetriya. Oʻq atrofida burish ham harakat.",
      draw: [
        { t: 'title', text: 'Oyna va burish' },
        { t: 'icon', x: 14, y: 34, emoji: '🔄', size: 'l' },
        { t: 'list', x: 30, y: 20, items: ['tekislikka nisbatan simmetriya — oyna', 'oʻq atrofida φ burchakka burish', '180° burish — oʻqqa nisbatan simmetriya'] },
        { t: 'box', id: 'h', x: 30, y: 50, w: 50, h: 12, text: 'Hammasi — harakat', color: 'green' }
      ],
      next: 'Koordinatalarda'
    },
    {
      kind: 'explain',
      clear: true,
      say: "(x; y; z) nuqtaga simmetrik nuqtalarning koordinatalari. Oxy tekisligiga nisbatan faqat z ishorasini oʻzgartiradi. Ox oʻqiga nisbatan esa y va z ning ishorasi oʻzgaradi. O nuqtaga nisbatan — uchalasi ham. Qoida: simmetriya elementida yotgan koordinatalar saqlanadi, qolganlari ishorasini oʻzgartiradi.",
      easy: "Tekislik yoki oʻqda boʻlgan koordinata saqlanadi, qolganlari ishorasini almashtiradi.",
      draw: [
        { t: 'title', text: '(x; y; z) ga simmetrik nuqta' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['nisbatan', 'nuqta'],
            ['Oxy', '(x; y; −z)'],
            ['Oyz', '(−x; y; z)'],
            ['Ox oʻqi', '(x; −y; −z)'],
            ['O nuqta', '(−x; −y; −z)']
          ]
        },
        { t: 'text', x: 62, y: 30, text: 'elementdagi', size: 's' },
        { t: 'text', x: 62, y: 38, text: 'koordinata saqlanadi', size: 's', color: 'green' }
      ],
      next: 'Oʻxshashlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gomotetiya: O markaz va k koeffitsiyent berilgan. Har bir X nuqta O X1 teng k karra O X shartini qanoatlantiruvchi X1 ga oʻtadi. Masofalar k marta oʻzgaradi, shakl esa oʻzgarmaydi — bu oʻxshashlik. Matryoshkalar bir-biriga oʻxshash. k teng 1 boʻlsa shakl oʻziga, k teng minus 1 boʻlsa markaziy simmetriya hosil boʻladi.",
      easy: "Gomotetiyada oʻlcham k marta oʻzgaradi, shakl oʻzgarmaydi. Matryoshkalar — oʻxshash shakllar.",
      draw: [
        { t: 'title', text: 'Gomotetiya va oʻxshashlik' },
        { t: 'icon', x: 10, y: 32, emoji: '🎎', size: 'l' },
        { t: 'icon', x: 26, y: 34, emoji: '🎎', size: 'm' },
        { t: 'formula', x: 40, y: 20, text: 'OX₁ = k · OX' },
        { t: 'list', x: 40, y: 34, items: ['masofalar k marta oʻzgaradi', 'k = 1: oʻziga oʻtadi', 'k = −1: markaziy simmetriya'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Harakat — masofani saqlaydigan almashtirish: parallel koʻchirish, markaziy simmetriya, tekislikka nisbatan simmetriya, burish.',
    'Parallel koʻchirish: (x + a; y + b; z + c); O ga nisbatan simmetriya: A₁ = 2·O − A.',
    'Gomotetiyada OX₁ = k·OX: masofalar k marta oʻzgaradi, shakl oʻxshash qoladi.'
  ],
  questions: [
    {
      id: 'm31q1',
      prompt: 'p(−2; 1; 4) vektor boʻyicha parallel koʻchirishda (3; −2; 3) nuqta qaysi nuqtaga oʻtadi? Applikatasini (z) yozing.',
      hint: '3 + 4.',
      explanation: '(1; −1; 7), z = 7.',
      widget: { type: 'number_answer', props: { answer: 7 } }
    },
    {
      id: 'm31q2',
      prompt: 'O(−2; 3; −1) nuqtaga nisbatan markaziy simmetriyada A(4; 2; −3) qaysi nuqtaga oʻtadi? Abssissasini (x) yozing.',
      hint: 'A₁ = 2·O − A.',
      explanation: 'A₁ = (−4 − 4; 6 − 2; −2 + 3) = (−8; 4; 1). x = −8.',
      widget: { type: 'number_answer', props: { answer: -8 } }
    },
    {
      id: 'm31q3',
      prompt: '(1; 2; 3) nuqtaga simmetrik nuqtalarni moslang.',
      hint: 'Simmetriya elementidagi koordinata saqlanadi.',
      explanation: 'Oxy → (1; 2; −3), Oyz → (−1; 2; 3), Ox → (1; −2; −3), O → (−1; −2; −3).',
      widget: {
        type: 'match_pairs',
        props: { pairs: [{ left: 'Oxy tekisligiga nisbatan', right: '(1; 2; −3)' }, { left: 'Oyz tekisligiga nisbatan', right: '(−1; 2; 3)' }, { left: 'Ox oʻqiga nisbatan', right: '(1; −2; −3)' }, { left: 'O nuqtaga nisbatan', right: '(−1; −2; −3)' }] }
      }
    },
    {
      id: 'm31q4',
      prompt: 'Almashtirishlarni guruhlang: harakatmi yoki yoʻq?',
      hint: 'Harakat masofani saqlaydi.',
      explanation: 'Parallel koʻchirish, simmetriyalar va burish — harakat. k ≠ ±1 gomotetiya masofani oʻzgartiradi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'h', label: 'Harakat' },
            { id: 'n', label: 'Harakat emas' }
          ],
          items: [
            { emoji: '', label: 'Parallel koʻchirish', bin: 'h' },
            { emoji: '', label: 'Markaziy simmetriya', bin: 'h' },
            { emoji: '', label: 'Tekislikka nisbatan simmetriya', bin: 'h' },
            { emoji: '', label: 'Oʻq atrofida burish', bin: 'h' },
            { emoji: '', label: 'Gomotetiya, k = 2', bin: 'n' },
            { emoji: '', label: 'Gomotetiya, k = ½', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'm31q5',
      prompt: 'Parallel koʻchirishda A(4; 2; −8) nuqta (3; 7; −5) nuqtaga oʻtdi. Koʻchirish vektorining ordinatasini (y) toping.',
      hint: '7 − 2.',
      explanation: 'Vektor (−1; 5; 3), y = 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'm31q6',
      prompt: 'k = 3 koeffitsiyentli gomotetiyada 4 sm li kesma necha sm li kesmaga oʻtadi?',
      hint: 'Masofalar k marta oʻzgaradi.',
      explanation: '4 · 3 = 12 sm.',
      widget: { type: 'number_answer', props: { answer: 12, unit: 'sm' } }
    },
    {
      id: 'm31q7',
      prompt: 'Qaysi biri harakat emas? Ortiqchasini bosing.',
      hint: 'Qaysi biri oʻlchamni oʻzgartiradi?',
      explanation: 'k = 2 gomotetiya masofalarni 2 marta oshiradi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Parallel koʻchirish' }, { text: '180° burish' }, { text: 'Markaziy simmetriya' }, { text: 'Gomotetiya (k = 2)', odd: true }] } }
    },
    {
      id: 'm31q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'k = −1 holini eslang.',
      explanation: 'Harakat masofani saqlaydi; k = −1 gomotetiya — markaziy simmetriya; oʻxshashlikda shakl saqlanadi, oʻlcham oʻzgaradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Harakat nuqtalar orasidagi masofani saqlaydi.', value: true },
            { text: 'k = −1 boʻlgan gomotetiya — markaziy simmetriya.', value: true },
            { text: 'Oʻxshashlik almashtirishida shaklning koʻrinishi oʻzgaradi.', value: false },
            { text: 'Oxy ga nisbatan simmetriyada x koordinata ishorasini oʻzgartiradi.', value: false }
          ]
        }
      }
    }
  ]
};
