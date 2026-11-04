import type { BoardLesson } from './types';
import { BOB2 } from './kimyo-5';

/** Darslik: Umumiy kimyo 11, 7-mavzu (39–45-betlar) — element, ion, oksid, kislota, asos va tuz ekvivalenti, ekvivalentlik qonuni, ekvivalent hajm. */
export const KIM_7: BoardLesson = {
  n: 7,
  label: '7',
  group: BOB2,
  title: 'Ekvivalent',
  section: '7-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oshqozon kislotasi koʻpayib, jigʻildon qaynasa, shifokor antatsid — asos tutgan dori beradi. Dori kislotani toʻliq neytrallashi uchun uning miqdori kislotaga teng qiymatli boʻlishi kerak. Moddalar aynan shunday — teng qiymatli, yaʼni ekvivalent miqdorlarda reaksiyaga kirishadi.",
      easy: "Moddalar ekvivalent (teng qiymatli) miqdorlarda reaksiyaga kirishadi.",
      draw: [
        { t: 'title', text: 'Teng qiymatli miqdor' },
        { t: 'icon', x: 16, y: 34, emoji: '💊', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚖️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['kislota + asos', 'teng qiymatli miqdorda', 'ekvivalent — «teng qiymatli»'] }
      ],
      next: 'Element ekvivalenti'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Element ekvivalenti — 1 massa qism vodorod yoki 8 massa qism kislorod bilan qoldiqsiz birikadigan massa. U atom massasini valentlikka boʻlib topiladi: E teng A boʻlinsin V. Kislorod: 16 boʻlinsin 2 — 8. Vodorod — 1. Valentlik oʻzgarsa, ekvivalent ham oʻzgaradi: SO2 da oltingugurt 32 boʻlinsin 4 — 8, SO3 da 32 boʻlinsin 6 — 5,33.",
      easy: "E = A / V. O: 8, H: 1, S (SO₂): 8, S (SO₃): 5,33.",
      draw: [
        { t: 'title', text: 'Element ekvivalenti' },
        { t: 'formula', x: 4, y: 24, text: 'E = A / V' },
        { t: 'table', x: 4, y: 34, rows: [['element', 'A', 'V', 'E'], ['O', '16', '2', '8'], ['H', '1', '1', '1'], ['S (SO₂)', '32', '4', '8'], ['S (SO₃)', '32', '6', '5,33'], ['N (N₂)', '14', '3', '4,67']] }
      ],
      next: 'Birikmalar ekvivalenti'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ion ekvivalenti — molyar massa boʻlinsin zaryad: karbonat ion 60 boʻlinsin 2 — 30. Oksid: molyar massa boʻlinsin element indeksi va valentligi koʻpaytmasiga: Al2O3 — 102 boʻlinsin 6, yaʼni 17. Kislota: molyar massa boʻlinsin almashinadigan vodorodlar soni: H2SO4 — 49. Asos: boʻlinsin OH guruhlar soni: kalsiy gidroksid — 37. Tuz: boʻlinsin metall indeksi va valentligi koʻpaytmasi: Al2(SO4)3 — 342 boʻlinsin 6, yaʼni 57.",
      easy: "Oksid va tuz: M/(n·V); kislota: M/n(H); asos: M/n(OH); ion: M/z.",
      draw: [
        { t: 'title', text: 'Birikmalar ekvivalenti' },
        { t: 'table', x: 4, y: 20, rows: [['tur', 'formula', 'misol'], ['ion', 'M / z', 'CO₃²⁻: 60/2 = 30'], ['oksid', 'M / (n·V)', 'Al₂O₃: 102/6 = 17'], ['kislota', 'M / n(H)', 'H₂SO₄: 98/2 = 49'], ['asos', 'M / n(OH)', 'Ca(OH)₂: 74/2 = 37'], ['tuz', 'M / (n·V)', 'Al₂(SO₄)₃: 342/6 = 57']] }
      ],
      next: 'Ekvivalentlik qonuni'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ekvivalentlik qonuni: moddalar oʻz ekvivalentlariga mos miqdorlarda reaksiyaga kirishadi — massalar nisbati ekvivalentlar nisbatiga teng: m1 boʻlinsin m2 teng E1 boʻlinsin E2. Gazlar uchun ekvivalent hajm ham bor: vodorodning ekvivalent massasi 1 gramm normal sharoitda 11,2 litr, kislorodniki 8 gramm — 5,6 litr hajm egallaydi.",
      easy: "m₁/m₂ = E₁/E₂. Ekvivalent hajm: H₂ — 11,2 L, O₂ — 5,6 L.",
      draw: [
        { t: 'title', text: 'Ekvivalentlik qonuni' },
        { t: 'formula', x: 4, y: 26, text: 'm₁ / m₂ = E₁ / E₂' },
        { t: 'list', x: 4, y: 40, items: ['Vₑ(H₂) = 22,4 / 2 = 11,2 L', 'Vₑ(O₂) = 22,4 / 4 = 5,6 L'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "54 gramm nomaʼlum metallni oksidlash uchun 48 gramm kislorod sarflandi. Metallni topamiz. Ekvivalentlik qonuni: E metall teng 54 karra 8 boʻlinsin 48 — 9. Endi A teng E karra V: valentlik 1 boʻlsa 9 — bunday metall yoʻq, 2 boʻlsa 18 — yoʻq, 3 boʻlsa 27 — bu alyuminiy!",
      easy: "E = 54·8/48 = 9; A = 9·3 = 27 → Al.",
      draw: [
        { t: 'title', text: 'Nomaʼlum metall' },
        { t: 'formula', x: 4, y: 24, text: 'E = 54 · 8 / 48 = 9' },
        { t: 'table', x: 4, y: 34, rows: [['V', 'A = E·V', 'metall'], ['1', '9', 'yoʻq'], ['2', '18', 'yoʻq'], ['3', '27', 'Al ✓']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Element ekvivalenti E = A/V — 1 qism vodorod yoki 8 qism kislorod bilan birikadigan massa.',
    'Ion: M/z; oksid va tuz: M/(n·V); kislota: M/n(H); asos: M/n(OH).',
    'Ekvivalentlik qonuni m₁/m₂ = E₁/E₂; ekvivalent hajm: H₂ — 11,2 L, O₂ — 5,6 L.'
  ],
  questions: [
    {
      id: 'k7q1',
      prompt: 'Fosfat kislota H₃PO₄ ning ekvivalenti qancha? (M = 98, 0,01 gacha)',
      hint: 'M / 3.',
      explanation: '98 / 3 ≈ 32,67.',
      widget: { type: 'number_answer', props: { answer: 32.67, tolerance: 0.01 } }
    },
    {
      id: 'k7q2',
      prompt: '20 g NaOH 24,5 g nomaʼlum kislota bilan qoldiqsiz reaksiyaga kirishdi. Kislotaning ekvivalenti qancha?',
      hint: 'E(NaOH) = 40; E = 24,5 · 40 / 20.',
      explanation: '49 (masalan, H₂SO₄).',
      widget: { type: 'number_answer', props: { answer: 49 } }
    },
    {
      id: 'k7q3',
      prompt: '15 g metall karbonat parchalanib, 8,4 g oksid hosil boʻldi. Metallning ekvivalenti qancha?',
      hint: '15/(x + 30) = 8,4/(x + 8).',
      explanation: '15x + 120 = 8,4x + 252 → x = 20 (kalsiy).',
      widget: { type: 'number_answer', props: { answer: 20 } }
    },
    {
      id: 'k7q4',
      prompt: '0,24 g metall yondirilganda 112 mL (n.sh.) kislorod sarflandi. Metallning ekvivalenti qancha?',
      hint: 'Vₑ(O₂) = 5600 mL.',
      explanation: 'E = 0,24 · 5600 / 112 = 12 (magniy).',
      widget: { type: 'number_answer', props: { answer: 12 } }
    },
    {
      id: 'k7q5',
      prompt: 'Al₂(SO₄)₃ ning ekvivalenti qancha? (M = 342)',
      hint: 'M / (2 · 3).',
      explanation: '342 / 6 = 57.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['114', '57', '171', '38'], answerIndex: 1 } }
    },
    {
      id: 'k7q6',
      prompt: 'Moddani ekvivalenti bilan juftlang.',
      hint: 'Asos — OH soni.',
      explanation: 'Ca(OH)₂ — 37; CaO — 28; H₂SO₄ — 49; CO₃²⁻ — 30.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'Ca(OH)₂' }, b: { label: '37' } },
            { a: { label: 'CaO' }, b: { label: '28' } },
            { a: { label: 'H₂SO₄' }, b: { label: '49' } },
            { a: { label: 'CO₃²⁻' }, b: { label: '30' } }
          ]
        }
      }
    },
    {
      id: 'k7q7',
      prompt: 'Kislorodning ekvivalent hajmi (n.sh.) qancha?',
      hint: '8 g O₂ hajmi.',
      explanation: '22,4 · 8 / 32 = 5,6 L.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['22,4 L', '11,2 L', '5,6 L', '2,8 L'], answerIndex: 2 } }
    },
    {
      id: 'k7q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ekvivalent valentlikka bogʻliq.',
      explanation: 'Oltingugurt ekvivalenti SO₂ va SO₃ da turlicha; vodorod ekvivalenti 1; kislota ekvivalenti almashinadigan H soniga bogʻliq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Elementning ekvivalenti uning valentligiga bogʻliq.', value: true },
            { text: 'Vodorodning ekvivalent massasi 1 ga teng.', value: true },
            { text: 'SO₂ va SO₃ da oltingugurtning ekvivalenti bir xil.', value: false },
            { text: 'Asos ekvivalenti metall atomlari soniga boʻlib topiladi.', value: false }
          ]
        }
      }
    }
  ]
};
