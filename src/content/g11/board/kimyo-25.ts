import type { BoardLesson } from './types';
import { wave } from './phys';

export const BOB6 = { kicker: '6-bob', title: 'Kimyoviy muvozanat' };

/** Darslik: Umumiy kimyo 11, 25-mavzu (113–117-betlar) — qaytar va qaytmas reaksiyalar, kimyoviy muvozanat, muvozanat konstantasi. */
export const KIM_25: BoardLesson = {
  n: 25,
  label: '25',
  group: BOB6,
  title: 'Qaytar reaksiyalar va kimyoviy muvozanat',
  section: '25-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Azot va vodoroddan ammiak hosil boʻladi, lekin shu sharoitda ammiakning bir qismi yana azot va vodorodga parchalanadi. Ikki tomonga baravar boradigan bunday reaksiyalar qaytar reaksiyalar deyiladi va ikki yoʻnalishli strelka bilan yoziladi.",
      easy: "Qaytar reaksiya ikki tomonga boradi: ⇄.",
      draw: [
        { t: 'title', text: 'Ikki tomonga' },
        { t: 'icon', x: 16, y: 40, emoji: '🔄', size: 'l' },
        { t: 'formula', x: 32, y: 34, text: 'N₂ + 3H₂ ⇄ 2NH₃' },
        { t: 'list', x: 32, y: 46, items: ['→ toʻgʻri reaksiya', '← teskari reaksiya'] }
      ],
      next: 'Qaytmas reaksiyalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Reaksiya oxirigacha bir tomonga borsa — qaytmas. Bunga uch belgi bor: choʻkma tushadi yoki gaz ajralib chiqib ketadi, kam dissotsilanadigan suv hosil boʻladi, yoki juda koʻp issiqlik ajraladi. Masalan, magniy yonganda 602,5 kJ issiqlik chiqadi.",
      easy: "Qaytmas: choʻkma/gaz, suv, koʻp issiqlik.",
      draw: [
        { t: 'title', text: 'Qaytmas reaksiyalar' },
        { t: 'formula', x: 4, y: 22, text: 'BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl' },
        { t: 'formula', x: 4, y: 33, text: 'NaOH + HCl → NaCl + H₂O' },
        { t: 'formula', x: 4, y: 44, text: '2Mg + O₂ → 2MgO,  ΔH = −602,5 kJ' },
        { t: 'list', x: 4, y: 54, items: ['choʻkma yoki gaz chiqib ketadi', 'suv hosil boʻladi, koʻp issiqlik'] }
      ],
      next: 'Muvozanat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Qaytar reaksiya boshida toʻgʻri reaksiya tez, teskarisi esa nolga teng. Boshlangʻich moddalar kamaygan sari toʻgʻri reaksiya sekinlashadi, mahsulot koʻpaygan sari teskarisi tezlashadi. Ikkala tezlik tenglashgan holat — kimyoviy muvozanat. Muvozanat dinamik: reaksiyalar toʻxtamaydi, faqat konsentratsiyalar oʻzgarmay qoladi.",
      easy: "Muvozanat: v toʻgʻri = v teskari; dinamik holat.",
      draw: [
        { t: 'title', text: 'Kimyoviy muvozanat' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 50, h: 44, xmin: 0, xmax: 10, ymin: 0, ymax: 5, xlabel: 't', ylabel: 'v' },
        { t: 'curve', axes: 'g', points: wave((t) => 2 + 2.6 * Math.exp(-0.5 * t), 0, 10, 40), color: 'red' },
        { t: 'curve', axes: 'g', points: wave((t) => 2 * (1 - Math.exp(-0.5 * t)), 0, 10, 40), color: 'blue' },
        { t: 'list', x: 62, y: 26, items: ['qizil — toʻgʻri', 'koʻk — teskari'] },
        { t: 'text', x: 62, y: 50, text: 'v→ = v←', color: 'purple' }
      ],
      next: 'Muvozanat konstantasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "aA qoʻshuv bB qaytar reaksiyasi cC qoʻshuv dD uchun muvozanat konstantasi: mahsulotlar muvozanat konsentratsiyalari koeffitsiyent darajalari koʻpaytmasi boʻlinsin boshlangʻich moddalarniki. K teng k1 boʻlinsin k2. K faqat haroratga bogʻliq, konsentratsiyaga bogʻliq emas. K katta boʻlsa, muvozanatda mahsulot koʻp.",
      easy: "K = [C]ᶜ[D]ᵈ / ([A]ᵃ[B]ᵇ) = k₁/k₂; faqat haroratga bogʻliq.",
      draw: [
        { t: 'title', text: 'Muvozanat konstantasi' },
        { t: 'formula', x: 4, y: 24, text: 'aA + bB ⇄ cC + dD' },
        { t: 'formula', x: 4, y: 36, text: 'K = [C]ᶜ · [D]ᵈ / ([A]ᵃ · [B]ᵇ) = k₁ / k₂' },
        { t: 'list', x: 4, y: 48, items: ['K faqat haroratga bogʻliq', 'K katta — mahsulot koʻp'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "A qoʻshuv 2B qaytar reaksiyasi C qoʻshuv D. Muvozanatda A 0,4, B 0,5, C 0,25, D 0,8 mol/L. K teng 0,25 karra 0,8 boʻlinsin 0,4 karra 0,5 kvadrat: 0,2 boʻlinsin 0,1 — 2. Teskari masala: 2A qoʻshuv B ⇄ C, K teng 1, A 0,5, B 0,2 boʻlsa, C teng 1 karra 0,25 karra 0,2 — 0,05 mol/L.",
      easy: "K = 0,25·0,8/(0,4·0,5²) = 2;  [C] = K·[A]²·[B].",
      draw: [
        { t: 'title', text: 'K ni hisoblash' },
        { t: 'formula', x: 4, y: 22, text: 'A + 2B ⇄ C + D' },
        { t: 'formula', x: 4, y: 34, text: 'K = 0,25 · 0,8 / (0,4 · 0,5²) = 2' },
        { t: 'formula', x: 4, y: 48, text: '2A + B ⇄ C,  K = 1' },
        { t: 'formula', x: 4, y: 58, text: '[C] = 1 · 0,5² · 0,2 = 0,05 mol/L' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Qaytar reaksiyalar ikki tomonga boradi (⇄); choʻkma, gaz, suv yoki koʻp issiqlik ajralsa — reaksiya qaytmas.',
    'Kimyoviy muvozanat — toʻgʻri va teskari reaksiya tezliklari teng boʻlgan dinamik holat.',
    'K = [C]ᶜ[D]ᵈ/([A]ᵃ[B]ᵇ) = k₁/k₂; K faqat haroratga bogʻliq.'
  ],
  questions: [
    {
      id: 'k25q1',
      prompt: 'A + B ⇄ C + D, muvozanatda [A] = 0,25, [B] = 0,4, [C] = 0,2, [D] = 0,5 mol/L. K = ?',
      hint: '0,1 / 0,1.',
      explanation: '0,2 · 0,5 / (0,25 · 0,4) = 1.',
      widget: { type: 'number_answer', props: { answer: 1, tolerance: 0.001 } }
    },
    {
      id: 'k25q2',
      prompt: 'A + B ⇄ C, K = 2, [A] = 0,4, [B] = 0,25 mol/L. [C] = ?',
      hint: '[C] = K·[A]·[B].',
      explanation: '2 · 0,4 · 0,25 = 0,2 mol/L.',
      widget: { type: 'number_answer', props: { answer: 0.2, tolerance: 0.001, unit: 'mol/L' } }
    },
    {
      id: 'k25q3',
      prompt: 'A + 2B ⇄ C, K = 1, [A] = 0,5, [B] = 2 mol/L. [C] = ?',
      hint: '0,5 · 2².',
      explanation: '1 · 0,5 · 4 = 2 mol/L.',
      widget: { type: 'number_answer', props: { answer: 2, tolerance: 0.001, unit: 'mol/L' } }
    },
    {
      id: 'k25q4',
      prompt: '2A + B ⇄ C, K = 0,1, [A] = 1,5, [B] = 3 mol/L. [C] = ?',
      hint: '0,1 · 1,5² · 3.',
      explanation: '0,1 · 2,25 · 3 = 0,675 mol/L.',
      widget: { type: 'number_answer', props: { answer: 0.675, tolerance: 0.001, unit: 'mol/L' } }
    },
    {
      id: 'k25q5',
      prompt: 'Muvozanat holatida qaysi gap toʻgʻri?',
      hint: 'Dinamik muvozanat.',
      explanation: 'Toʻgʻri va teskari reaksiya tezliklari teng, reaksiyalar toʻxtamaydi.',
      widget: {
        type: 'mcq',
        props: { prompt: '', choices: ['ikkala reaksiya toʻxtaydi', 'toʻgʻri va teskari reaksiya tezliklari teng', 'teskari reaksiya 2 marta tez', 'barcha moddalar konsentratsiyasi teng'], answerIndex: 1 }
      }
    },
    {
      id: 'k25q6',
      prompt: 'Reaksiyalarni qaytar va qaytmasga ajrating.',
      hint: 'Choʻkma, suv, koʻp issiqlik — qaytmas.',
      explanation: 'Qaytar: N₂ + 3H₂ ⇄ 2NH₃, 2SO₂ + O₂ ⇄ 2SO₃. Qaytmas: BaSO₄ choʻkmasi, neytrallanish, magniy yonishi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'r', label: 'Qaytar' },
            { id: 'i', label: 'Qaytmas' }
          ],
          items: [
            { emoji: '', label: 'N₂ + 3H₂ ⇄ 2NH₃', bin: 'r' },
            { emoji: '', label: '2SO₂ + O₂ ⇄ 2SO₃', bin: 'r' },
            { emoji: '', label: 'BaCl₂ + H₂SO₄ → BaSO₄↓', bin: 'i' },
            { emoji: '', label: 'NaOH + HCl → NaCl + H₂O', bin: 'i' },
            { emoji: '', label: '2Mg + O₂ → 2MgO', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'k25q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'K = k₁/k₂.',
      explanation: 'K toʻgʻri va teskari reaksiya tezlik konstantalari nisbatiga teng va faqat haroratga bogʻliq.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'K = k₁ / ' }, { blank: 'k₂' }, { text: '; muvozanat konstantasi faqat ' }, { blank: 'haroratga' }, { text: ' bogʻliq.' }],
          bank: ['k₂', 'haroratga', 'konsentratsiyaga', 'k₁']
        }
      }
    },
    {
      id: 'k25q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Muvozanat — dinamik.',
      explanation: 'Muvozanatda konsentratsiyalar oʻzgarmaydi, lekin reaksiyalar davom etadi; K katta — mahsulot koʻp.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Muvozanatda moddalar konsentratsiyasi oʻzgarmaydi.', value: true },
            { text: 'K katta boʻlsa, muvozanatda mahsulotlar koʻp.', value: true },
            { text: 'Muvozanat holatida reaksiyalar butunlay toʻxtaydi.', value: false },
            { text: 'Konsentratsiya oʻzgarsa, K ham oʻzgaradi.', value: false }
          ]
        }
      }
    }
  ]
};
