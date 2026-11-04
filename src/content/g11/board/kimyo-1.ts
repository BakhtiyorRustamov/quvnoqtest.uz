import type { BoardLesson } from './types';
import { cells } from './chem';

export const BOB1 = { kicker: '1-bob', title: 'Atom va molekulalar tuzilishi. Davriy qonun' };

/** Darslik: Umumiy kimyo 11, 1-mavzu (4–11-betlar) — atom modellari, orbitallar, kvant sonlari, Pauli prinsipi, Klechkovskiy va Gund qoidalari. */
export const KIM_1: BoardLesson = {
  n: 1,
  label: '1',
  group: BOB1,
  title: 'Atom tuzilishi',
  section: '1-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Bayramda osmonda otashinlar turli rangda porlaydi: natriy tuzi sariq, mis — yashil, stronsiy — qizil rang beradi. Har bir element oʻz rangini chiqaradi, chunki atomlarida elektronlar turlicha joylashgan. Bugun elektronlar atomda qanday joylashishini oʻrganamiz.",
      easy: "Otashin ranglari atomdagi elektronlarga bogʻliq.",
      draw: [
        { t: 'title', text: 'Otashin ranglari' },
        { t: 'icon', x: 16, y: 34, emoji: '🎆', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚛️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['natriy — sariq', 'mis — yashil', 'stronsiy — qizil'] }
      ],
      next: 'Atom modellari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1911-yilda Rezerford planetar modelni taklif qildi: markazda musbat yadro, atrofida elektronlar aylanadi. Ammo bunday elektron energiyasini yoʻqotib, yadroga qulashi kerak edi. Bor elektron faqat maʼlum orbitalarda energiya yoʻqotmay harakatlanadi, deb tushuntirdi. Hozirgi kvant nazariyasiga koʻra elektron ham zarra, ham toʻlqin: u yadro atrofidagi fazoning maʼlum qismida — atom orbitalida boʻladi.",
      easy: "Rezerford → Bor → kvant nazariyasi: elektron orbitalda joylashadi.",
      draw: [
        { t: 'title', text: 'Atom modellari' },
        { t: 'ellipse', cx: 18, cy: 40, rx: 12, ry: 7, color: 'blue' },
        { t: 'ellipse', cx: 18, cy: 40, rx: 1.5, ry: 1.5, color: 'red' },
        { t: 'text', x: 18, y: 56, text: 'Rezerford, 1911', size: 's', anchor: 'middle' },
        { t: 'ellipse', cx: 50, cy: 40, rx: 5, ry: 5, color: 'blue' },
        { t: 'ellipse', cx: 50, cy: 40, rx: 10, ry: 10, color: 'blue' },
        { t: 'ellipse', cx: 50, cy: 40, rx: 1.5, ry: 1.5, color: 'red' },
        { t: 'text', x: 50, y: 56, text: 'Bor', size: 's', anchor: 'middle' },
        { t: 'ellipse', cx: 82, cy: 40, rx: 10, ry: 10, color: 'purple' },
        { t: 'ellipse', cx: 82, cy: 40, rx: 6, ry: 6, color: 'purple' },
        { t: 'ellipse', cx: 82, cy: 40, rx: 1.5, ry: 1.5, color: 'red' },
        { t: 'text', x: 82, y: 56, text: 'elektron bulut', size: 's', anchor: 'middle' }
      ],
      next: 'Orbitallar shakli'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Elektron boʻlishi ehtimoli 90 foiz boʻlgan fazo qismi — atom orbitali. Orbital shakllari turlicha: s-orbital — shar, p-orbital — gantel, d-orbital — ikkita kesishgan gantel. Orbital va orbita boshqa-boshqa narsa: elektron chiziq boʻylab aylanmaydi, bulut kabi joylashadi.",
      easy: "s — shar, p — gantel, d — ikkita gantel.",
      draw: [
        { t: 'title', text: 'Orbitallar shakli' },
        { t: 'ellipse', cx: 16, cy: 40, rx: 8, ry: 8, color: 'blue' },
        { t: 'text', x: 16, y: 58, text: 's — shar', size: 's', anchor: 'middle' },
        { t: 'ellipse', cx: 42, cy: 40, rx: 7, ry: 4, color: 'green' },
        { t: 'ellipse', cx: 56, cy: 40, rx: 7, ry: 4, color: 'green' },
        { t: 'text', x: 49, y: 58, text: 'p — gantel', size: 's', anchor: 'middle' },
        { t: 'ellipse', cx: 76, cy: 40, rx: 6, ry: 3, color: 'orange' },
        { t: 'ellipse', cx: 90, cy: 40, rx: 6, ry: 3, color: 'orange' },
        { t: 'ellipse', cx: 83, cy: 33, rx: 3, ry: 6, color: 'orange' },
        { t: 'ellipse', cx: 83, cy: 47, rx: 3, ry: 6, color: 'orange' },
        { t: 'text', x: 83, y: 60, text: 'd — 2 gantel', size: 's', anchor: 'middle' }
      ],
      next: 'Kvant sonlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Elektron holatini toʻrtta kvant soni tavsiflaydi. Bosh kvant soni n — energetik pogʻona: n ortgan sari elektron yadrodan uzoqlashadi. Orbital kvant soni l — orbital shakli, u 0 dan n minus 1 gacha: 0 — s, 1 — p, 2 — d, 3 — f. Magnit kvant soni m — orbitalning fazodagi yoʻnalishi, minus l dan plyus l gacha. Spin kvant soni plyus yoki minus yarim. Pogʻonachaga 2 karra 2l plyus 1, pogʻonaga 2n kvadrat elektron sigʻadi.",
      easy: "n — pogʻona, l — shakl, m — yoʻnalish, s — spin (±½). Pogʻonaga 2n² elektron.",
      draw: [
        { t: 'title', text: 'Toʻrt kvant soni' },
        { t: 'table', x: 4, y: 20, rows: [['l', '0', '1', '2', '3'], ['pogʻonacha', 's', 'p', 'd', 'f'], ['orbitallar', '1', '3', '5', '7'], ['elektronlar', '2', '6', '10', '14']] },
        { t: 'formula', x: 62, y: 26, text: 'N = 2 n²' },
        { t: 'formula', x: 62, y: 40, text: '2 (2l + 1)' },
        { t: 'list', x: 4, y: 56, items: ['n — pogʻona, m: −l … +l, spin ±½'] }
      ],
      next: 'Toʻlish qoidalari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Elektronlar uch qoida boʻyicha joylashadi. Pauli prinsipi: atomda toʻrttala kvant soni bir xil boʻlgan ikki elektron boʻlmaydi — bitta orbitalda ikkitadan ortiq elektron sigʻmaydi. Klechkovskiy qoidasi: avval n qoʻshuv l yigʻindisi kichik pogʻonacha toʻladi, teng boʻlsa — n kichigi. Shuning uchun 4s 3d dan oldin toʻladi. Gund qoidasi: bir xil energiyali orbitallarda elektronlar avval bittadan joylashadi.",
      easy: "Pauli — orbitalda 2 ta elektron; Klechkovskiy — n + l kichigi avval; Gund — avval bittadan.",
      draw: [
        { t: 'title', text: 'Pauli, Klechkovskiy, Gund' },
        { t: 'text', x: 4, y: 22, text: '1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s', size: 's' },
        ...cells('c1', 6, 32, ['↑↓'], '1s'),
        ...cells('c2', 16, 32, ['↑↓'], '2s'),
        ...cells('c3', 26, 32, ['↑', '↑', ''], '2p'),
        { t: 'text', x: 46, y: 36, text: 'C: 1s² 2s² 2p²', size: 's', color: 'purple' },
        ...cells('n1', 6, 50, ['↑↓'], '1s'),
        ...cells('n2', 16, 50, ['↑↓'], '2s'),
        ...cells('n3', 26, 50, ['↑', '↑', '↑'], '2p'),
        { t: 'text', x: 46, y: 54, text: 'N: 1s² 2s² 2p³ — Gund', size: 's', color: 'purple' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tartib raqami 25 boʻlgan element — marganesda nechta toq elektron bor? Elektron formula: 1s2, 2s2, 2p6, 3s2, 3p6, 4s2, 3d5. 3d pogʻonachada beshta orbital va beshta elektron — Gund qoidasiga koʻra hammasi bittadan joylashadi. Demak, 5 ta toq elektron.",
      easy: "Mn: …4s² 3d⁵ → 5 ta toq elektron.",
      draw: [
        { t: 'title', text: 'Mn da nechta toq elektron?' },
        { t: 'formula', x: 4, y: 24, text: 'Mn: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁵' },
        ...cells('m4', 10, 36, ['↑↓'], '4s'),
        ...cells('m3', 24, 36, ['↑', '↑', '↑', '↑', '↑'], '3d'),
        { t: 'text', x: 56, y: 41, text: '5 ta toq elektron', color: 'red' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Elektron yadro atrofida orbitalda joylashadi: s — shar, p — gantel, d — ikkita gantel shaklida.',
    'Toʻrt kvant soni: n (pogʻona), l (shakl, 0 … n−1), m (−l … +l), spin (±½); pogʻonaga 2n² elektron sigʻadi.',
    'Toʻlish qoidalari: Pauli (orbitalda 2 ta elektron), Klechkovskiy (n + l kichigi avval), Gund (avval bittadan).'
  ],
  questions: [
    {
      id: 'k1q1',
      prompt: 'Orbital kvant soni l = 2 boʻlgan pogʻonachaga eng koʻpi bilan nechta elektron sigʻadi?',
      hint: '2(2l + 1).',
      explanation: '2 · (2·2 + 1) = 10 ta (d-pogʻonacha).',
      widget: { type: 'number_answer', props: { answer: 10 } }
    },
    {
      id: 'k1q2',
      prompt: 'Uchinchi energetik pogʻonaga (n = 3) eng koʻpi bilan nechta elektron sigʻadi?',
      hint: 'N = 2n².',
      explanation: '2 · 3² = 18 ta.',
      widget: { type: 'number_answer', props: { answer: 18 } }
    },
    {
      id: 'k1q3',
      prompt: 'Tartib raqami 28 boʻlgan elementda (nikel) nechta toq elektron bor?',
      hint: '…4s² 3d⁸: beshta d-orbitalga 8 ta elektron.',
      explanation: '3d⁸: uchta orbital toʻla, ikkitasida bittadan — 2 ta toq elektron.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'k1q4',
      prompt: 'Tartib raqami 20 boʻlgan element (kalsiy) da nechta toʻlgan pogʻona va pogʻonacha bor?',
      hint: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s².',
      explanation: 'Toʻla pogʻonalar: 1 va 2 (2 ta); toʻla pogʻonachalar: 1s, 2s, 2p, 3s, 3p, 4s (6 ta).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['2 va 6', '2 va 7', '3 va 6', '2 va 8'], answerIndex: 0 } }
    },
    {
      id: 'k1q5',
      prompt: 'Pogʻonachalarni toʻlish tartibida joylang.',
      hint: 'n + l yigʻindisi kichigi avval.',
      explanation: 'n + l: 3p = 4, 4s = 4 (teng — n kichigi avval: 3p), 3d = 5, 4p = 5 (n kichigi avval: 3d).',
      widget: { type: 'order_line', props: { items: [{ label: '3p' }, { label: '4s' }, { label: '3d' }, { label: '4p' }] } }
    },
    {
      id: 'k1q6',
      prompt: 'Orbital kvant sonini orbital shakli bilan juftlang.',
      hint: 'l = 0 — s.',
      explanation: 'l = 0 — s (shar); l = 1 — p (gantel); l = 2 — d (ikkita gantel); l = 3 — f.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'l = 0', right: 's — shar' },
            { left: 'l = 1', right: 'p — gantel' },
            { left: 'l = 2', right: 'd — ikkita gantel' },
            { left: 'l = 3', right: 'f — murakkab shakl' }
          ]
        }
      }
    },
    {
      id: 'k1q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Pauli prinsipi.',
      explanation: 'Bitta orbitalda qarama-qarshi spinli ikkita elektron boʻlishi mumkin.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Pauli prinsipiga koʻra bitta orbitalda eng koʻpi bilan ' },
            { blank: 'ikkita' },
            { text: ' elektron boʻladi, ularning spinlari ' },
            { blank: 'qarama-qarshi' },
            { text: '.' }
          ],
          bank: ['ikkita', 'qarama-qarshi', 'uchta', 'bir xil']
        }
      }
    },
    {
      id: 'k1q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Klechkovskiy: 4s 3d dan oldin.',
      explanation: '4s 3d dan oldin toʻladi; Gund qoidasi — avval bittadan; orbital va orbita bir xil emas.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '4s pogʻonacha 3d dan oldin toʻladi.', value: true },
            { text: 'Azot atomida 2p da uchta toq elektron bor.', value: true },
            { text: 'Orbital — elektron aylanadigan aniq chiziq (orbita).', value: false },
            { text: 'p-pogʻonachada beshta orbital bor.', value: false }
          ]
        }
      }
    }
  ]
};
