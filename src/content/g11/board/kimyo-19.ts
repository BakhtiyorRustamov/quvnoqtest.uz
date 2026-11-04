import type { BoardLesson } from './types';
import { BOB4 } from './kimyo-12';

/** Darslik: Umumiy kimyo 11, 19-mavzu (88–92-betlar) — ekvivalent miqdori va normal konsentratsiya: Cn = n(ekv)/V. */
export const KIM_19: BoardLesson = {
  n: 19,
  label: '19',
  group: BOB4,
  title: 'Normal konsentratsiya',
  section: '19-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Kislotani ishqor bilan titrlashda laborantlar normal eritmalardan foydalanadi: teng hajmdagi bir xil normallikdagi kislota va ishqor bir-birini toʻliq neytrallaydi. Sababi — normal konsentratsiya ekvivalentlarni sanaydi, moddalar esa aynan ekvivalentlarda reaksiyaga kirishadi.",
      easy: "Normal konsentratsiya ekvivalentlarni sanaydi.",
      draw: [
        { t: 'title', text: 'Titrlash' },
        { t: 'icon', x: 16, y: 34, emoji: '🧪', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚖️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['kislota + ishqor', 'teng normallik, teng hajm', '→ toʻliq neytrallanadi'] }
      ],
      next: 'Ekvivalent miqdori'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Erigan moddaning ekvivalent miqdori — massasi boʻlinsin ekvivalent massasi: n ekv teng m boʻlinsin E, birligi g-ekv. Esingizda boʻlsa, kislota ekvivalenti — molyar massa boʻlinsin vodorodlar soni. 24,5 gramm H2SO4: E teng 98 boʻlinsin 2 — 49, n ekv teng 24,5 boʻlinsin 49 — 0,5 g-ekv.",
      easy: "n(ekv) = m / E. 24,5 g H₂SO₄ = 24,5/49 = 0,5 g-ekv.",
      draw: [
        { t: 'title', text: 'Ekvivalent miqdori' },
        { t: 'formula', x: 4, y: 24, text: 'n(ekv) = m / E' },
        { t: 'formula', x: 4, y: 38, text: 'E(H₂SO₄) = 98 / 2 = 49' },
        { t: 'formula', x: 4, y: 52, text: 'n(ekv) = 24,5 / 49 = 0,5 g-ekv' }
      ],
      next: 'Normal konsentratsiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Normal konsentratsiya Cn — 1 litr eritmadagi ekvivalentlar soni: Cn teng n ekv boʻlinsin V, birligi N — normal. Hajm litrda. Bundan n ekv teng Cn karra V, V teng n ekv boʻlinsin Cn. 5 litr eritmada 3 g-ekv HCl boʻlsa — 0,6 N. 9,8 gramm H2SO4 — 0,2 g-ekv; 0,2 N eritma hajmi 1 litr.",
      easy: "Cn = n(ekv)/V (N); 3/5 = 0,6 N.",
      draw: [
        { t: 'title', text: 'Cn = n(ekv) / V' },
        { t: 'formula', x: 4, y: 24, text: 'Cn = n(ekv) / V   (N)' },
        { t: 'formula', x: 4, y: 36, text: 'n(ekv) = Cn · V,   V = n(ekv) / Cn' },
        { t: 'formula', x: 4, y: 50, text: '3 g-ekv / 5 L = 0,6 N' },
        { t: 'formula', x: 4, y: 62, text: '0,2 g-ekv / 0,2 N = 1 L' }
      ],
      next: 'Zichlik bilan'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eritma massasi va zichligi berilsa, avval hajmni topamiz. 5000 gramm suvga 68,4 gramm Ba(OH)2 qoʻshildi, zichlik 1,267. Ba(OH)2 ekvivalenti: 171 boʻlinsin 2 — 85,5; n ekv teng 68,4 boʻlinsin 85,5 — 0,8. Eritma 5068,4 gramm, hajm 5068,4 boʻlinsin 1,267 — 4 litr. Cn teng 0,8 boʻlinsin 4 — 0,2 N.",
      easy: "E = 85,5; n(ekv) = 0,8; V = 4 L; Cn = 0,2 N.",
      draw: [
        { t: 'title', text: 'Bariy gidroksid eritmasi' },
        { t: 'formula', x: 4, y: 22, text: 'E = 171 / 2 = 85,5' },
        { t: 'formula', x: 4, y: 34, text: 'n(ekv) = 68,4 / 85,5 = 0,8' },
        { t: 'formula', x: 4, y: 46, text: 'V = 5068,4 / 1,267 ≈ 4000 mL = 4 L' },
        { t: 'formula', x: 4, y: 58, text: 'Cn = 0,8 / 4 = 0,2 N' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "12,6 gramm HNO3 dan 0,5 N eritma tayyorlash uchun qancha hajm kerak? HNO3 da bitta vodorod, ekvivalent 63. n ekv teng 12,6 boʻlinsin 63 — 0,2. Hajm: 0,2 boʻlinsin 0,5 — 0,4 litr.",
      easy: "n(ekv) = 0,2; V = 0,2/0,5 = 0,4 L.",
      draw: [
        { t: 'title', text: 'Qancha hajm?' },
        { t: 'formula', x: 4, y: 24, text: 'E(HNO₃) = 63 / 1 = 63' },
        { t: 'formula', x: 4, y: 38, text: 'n(ekv) = 12,6 / 63 = 0,2' },
        { t: 'formula', x: 4, y: 52, text: 'V = 0,2 / 0,5 = 0,4 L' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ekvivalent miqdori n(ekv) = m/E (g-ekv); E — moddaning ekvivalent massasi.',
    'Normal konsentratsiya Cn = n(ekv)/V — 1 L eritmadagi ekvivalentlar soni (N).',
    'n(ekv) = Cn·V, V = n(ekv)/Cn; massa va zichlik berilsa, avval V = m/ρ.'
  ],
  questions: [
    {
      id: 'k19q1',
      prompt: '20,8 g Al(OH)₃ da necha g-ekv bor? (M = 78)',
      hint: 'E = 78/3 = 26.',
      explanation: '20,8 / 26 = 0,8 g-ekv.',
      widget: { type: 'number_answer', props: { answer: 0.8, tolerance: 0.001, unit: 'g-ekv' } }
    },
    {
      id: 'k19q2',
      prompt: '6 L eritmada 3 g-ekv NaCl bor. Normal konsentratsiya qancha?',
      hint: '3 / 6.',
      explanation: '0,5 N.',
      widget: { type: 'number_answer', props: { answer: 0.5, tolerance: 0.001, unit: 'N' } }
    },
    {
      id: 'k19q3',
      prompt: '200 g suvga 98 g H₂SO₄ qoʻshildi (ρ = 1,192 g/mL). Normal konsentratsiya qancha?',
      hint: 'n(ekv) = 98/49 = 2; V = 298/1,192 = 250 mL.',
      explanation: '2 / 0,25 = 8 N.',
      widget: { type: 'number_answer', props: { answer: 8, tolerance: 0.05, unit: 'N' } }
    },
    {
      id: 'k19q4',
      prompt: '8,2 g H₂SO₃ dan 0,25 N eritma tayyorlash uchun necha litr kerak? (M = 82)',
      hint: 'E = 41; n(ekv) = 0,2.',
      explanation: '0,2 / 0,25 = 0,8 L.',
      widget: { type: 'number_answer', props: { answer: 0.8, tolerance: 0.001, unit: 'L' } }
    },
    {
      id: 'k19q5',
      prompt: '6,67 g Fe₂(SO₄)₃ da taxminan necha g-ekv bor? (M = 400)',
      hint: 'E = 400 / (2·3).',
      explanation: 'E ≈ 66,7; 6,67 / 66,7 ≈ 0,1 g-ekv.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0,1', '0,05', '0,3', '0,0167'], answerIndex: 0 } }
    },
    {
      id: 'k19q6',
      prompt: 'Moddani ekvivalent massasi bilan juftlang.',
      hint: 'Kislota — H soni, asos — OH soni.',
      explanation: 'H₂SO₄ — 49; Ba(OH)₂ — 85,5; HNO₃ — 63; Al(OH)₃ — 26.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'H₂SO₄' }, b: { label: '49' } },
            { a: { label: 'Ba(OH)₂' }, b: { label: '85,5' } },
            { a: { label: 'HNO₃' }, b: { label: '63' } },
            { a: { label: 'Al(OH)₃' }, b: { label: '26' } }
          ]
        }
      }
    },
    {
      id: 'k19q7',
      prompt: '1 L eritmada 2 g-ekv NH₄Cl bor. Bu qanday eritma?',
      hint: 'Cn = n(ekv)/V.',
      explanation: '2 N.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0,5 N', '1 N', '2 N', '4 N'], answerIndex: 2 } }
    },
    {
      id: 'k19q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'HCl uchun E = M.',
      explanation: 'Bir asosli kislota va bir kislotali asos uchun normallik molyarlikka teng; H₂SO₄ uchun Cn = 2Cm.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'HCl eritmasi uchun normal va molyar konsentratsiya teng.', value: true },
            { text: '1 M H₂SO₄ eritmasi 2 N ga teng.', value: true },
            { text: 'Normal konsentratsiyada hajm millilitrda olinadi.', value: false },
            { text: 'Ekvivalent miqdori = E / m.', value: false }
          ]
        }
      }
    }
  ]
};
