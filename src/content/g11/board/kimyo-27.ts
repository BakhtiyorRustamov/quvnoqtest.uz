import type { BoardLesson } from './types';
import { BOB6 } from './kimyo-25';

/** Darslik: Umumiy kimyo 11, 27-mavzu (121–124-betlar) — kimyoviy muvozanatga oid masalalar: boshlangʻich, sarflangan, muvozanat jadvali; K orqali konsentratsiyani topish. */
export const KIM_27: BoardLesson = {
  n: 27,
  label: '27',
  group: BOB6,
  title: 'Kimyoviy muvozanatga oid masalalar',
  section: '27-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Muvozanat masalalarining sirli kaliti — uch qatorli jadval: boshlangʻich konsentratsiya, sarflangan yoki hosil boʻlgan miqdor va muvozanat konsentratsiyasi. Boshlangʻich minus sarflangan teng muvozanat. Sarflanganlar esa reaksiya koeffitsiyentlariga proporsional.",
      easy: "Boshlangʻich − sarflangan = muvozanat; nisbat — koeffitsiyentlar boʻyicha.",
      draw: [
        { t: 'title', text: 'Uch qatorli jadval' },
        { t: 'icon', x: 16, y: 40, emoji: '📋', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['boshlangʻich', '− sarflangan (koeffitsiyentlar)', '= muvozanat'] }
      ],
      next: 'Boshlangʻichni topish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "4HCl qoʻshuv O2 ⇄ 2Cl2 qoʻshuv 2H2O. Muvozanatda HCl 0,7, O2 0,6, suv 0,4 mol/L. Suv 0,4 hosil boʻlgan boʻlsa, koeffitsiyentlar boʻyicha HCl 0,8, kislorod 0,2 sarflangan. Boshlangʻich: HCl 0,7 qoʻshuv 0,8 — 1,5, kislorod 0,6 qoʻshuv 0,2 — 0,8 mol/L.",
      easy: "H₂O 0,4 → HCl 0,8 va O₂ 0,2 sarflangan; boshlangʻich 1,5 va 0,8.",
      draw: [
        { t: 'title', text: '4HCl + O₂ ⇄ 2Cl₂ + 2H₂O' },
        { t: 'table', x: 4, y: 20, rows: [['mol/L', 'HCl', 'O₂', 'H₂O'], ['boshlangʻich', '1,5', '0,8', '0'], ['sarflangan', '0,8', '0,2', '+0,4'], ['muvozanat', '0,7', '0,6', '0,4']] },
        { t: 'text', x: 4, y: 62, text: '8 L da: HCl 12 mol, O₂ 6,4 mol', size: 's', color: 'purple' }
      ],
      next: 'K orqali topish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar K va boshqa konsentratsiyalar maʼlum boʻlsa, nomaʼlumni K ifodasidan topamiz. 4HCl qoʻshuv O2 reaksiyasida K teng 1, HCl 1, Cl2 3, suv 3 mol/L. K teng Cl2 kvadrat karra suv kvadrat boʻlinsin HCl toʻrtinchi daraja karra O2: 1 teng 9 karra 9 boʻlinsin O2. Demak O2 teng 81 mol/L.",
      easy: "1 = 3²·3² / (1⁴·[O₂]) → [O₂] = 81 mol/L.",
      draw: [
        { t: 'title', text: 'K orqali topish' },
        { t: 'formula', x: 4, y: 24, text: 'K = [Cl₂]² · [H₂O]² / ([HCl]⁴ · [O₂])' },
        { t: 'formula', x: 4, y: 38, text: '1 = 3² · 3² / (1⁴ · [O₂])' },
        { t: 'formula', x: 4, y: 52, text: '[O₂] = 81 mol/L' }
      ],
      next: 'Nomaʼlum x'
    },
    {
      kind: 'explain',
      clear: true,
      say: "SO2 qoʻshuv NO2 ⇄ SO3 qoʻshuv NO, K teng 1, boshlangʻich SO2 6, NO2 7 mol/L. x mol/L reaksiyaga kirsin. Muvozanatda: SO2 6 minus x, NO2 7 minus x, SO3 va NO — x dan. K teng x kvadrat boʻlinsin 6 minus x karra 7 minus x teng 1. Ochsak: 42 minus 13x teng 0, x teng 42 boʻlinsin 13 — taxminan 3,23. SO2 muvozanatda taxminan 2,77 mol/L.",
      easy: "x² = (6 − x)(7 − x) → x = 42/13 ≈ 3,23; [SO₂] ≈ 2,77.",
      draw: [
        { t: 'title', text: 'Nomaʼlum x bilan' },
        { t: 'formula', x: 4, y: 22, text: 'SO₂ + NO₂ ⇄ SO₃ + NO,  K = 1' },
        { t: 'table', x: 4, y: 30, rows: [['mol/L', 'SO₂', 'NO₂', 'SO₃, NO'], ['boshida', '6', '7', '0'], ['muvozanat', '6 − x', '7 − x', 'x']] },
        { t: 'formula', x: 4, y: 58, text: 'x² = (6 − x)(7 − x) → x ≈ 3,23' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "CO qoʻshuv 3H2 ⇄ CH4 qoʻshuv H2O. Muvozanatda CO 0,9, H2 0,7, metan va suv 0,4 dan mol/L. Metan 0,4 hosil boʻldi — demak CO 0,4, vodorod 3 karra 0,4 — 1,2 sarflandi. Boshlangʻich: CO 1,3, vodorod 1,9 mol/L.",
      easy: "CH₄ 0,4 → CO 0,4, H₂ 1,2 sarflangan; boshlangʻich 1,3 va 1,9.",
      draw: [
        { t: 'title', text: 'CO + 3H₂ ⇄ CH₄ + H₂O' },
        { t: 'table', x: 4, y: 20, rows: [['mol/L', 'CO', 'H₂', 'CH₄'], ['boshlangʻich', '1,3', '1,9', '0'], ['sarflangan', '0,4', '1,2', '+0,4'], ['muvozanat', '0,9', '0,7', '0,4']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Jadval: boshlangʻich − sarflangan = muvozanat; sarflanganlar koeffitsiyentlarga proporsional.',
    'K va boshqa konsentratsiyalar maʼlum boʻlsa, nomaʼlum K ifodasidan topiladi.',
    'Boshlangʻich konsentratsiyalardan muvozanatni topishda sarflangan miqdorni x deb olib, K tenglamasini yechamiz.'
  ],
  questions: [
    {
      id: 'k27q1',
      prompt: 'SO₂ + NO₂ ⇄ SO₃ + NO, K = 1, muvozanatda [SO₂] = 4, [SO₃] = 3, [NO] = 3 mol/L. [NO₂] = ?',
      hint: '3·3 / (4·x) = 1.',
      explanation: '9 / 4 = 2,25 mol/L.',
      widget: { type: 'number_answer', props: { answer: 2.25, tolerance: 0.001, unit: 'mol/L' } }
    },
    {
      id: 'k27q2',
      prompt: 'CO₂ + H₂ ⇄ CO + H₂O, K = 1, [CO₂] = 12, [CO] = 6, [H₂O] = 6 mol/L. [H₂] = ?',
      hint: '36 / (12·x) = 1.',
      explanation: '36 / 12 = 3 mol/L.',
      widget: { type: 'number_answer', props: { answer: 3, tolerance: 0.001, unit: 'mol/L' } }
    },
    {
      id: 'k27q3',
      prompt: 'CO + H₂O ⇄ CO₂ + H₂, K = 1, boshlangʻich [CO] = 6, [H₂O] = 8 mol/L. Muvozanatdagi [CO] taxminan qancha?',
      hint: 'x² = (6 − x)(8 − x) → x = 48/14.',
      explanation: 'x ≈ 3,43; [CO] ≈ 2,6, [H₂O] ≈ 4,6 mol/L.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['≈ 2,6 mol/L', '≈ 3,4 mol/L', '≈ 4,6 mol/L', '≈ 1,3 mol/L'], answerIndex: 0 } }
    },
    {
      id: 'k27q4',
      prompt: 'N₂ + 3H₂ ⇄ 2NH₃, muvozanatda [N₂] = 2, [H₂] = 3, [NH₃] = 2 mol/L. Boshlangʻich [H₂] = ?',
      hint: 'NH₃ 2 hosil boʻldi → H₂ 3 sarflangan.',
      explanation: '3 + 3 = 6 mol/L.',
      widget: { type: 'number_answer', props: { answer: 6, tolerance: 0.001, unit: 'mol/L' } }
    },
    {
      id: 'k27q5',
      prompt: 'Oldingi masalada boshlangʻich [N₂] = ?',
      hint: 'NH₃ 2 → N₂ 1 sarflangan.',
      explanation: '2 + 1 = 3 mol/L.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['2 mol/L', '3 mol/L', '4 mol/L', '1 mol/L'], answerIndex: 1 } }
    },
    {
      id: 'k27q6',
      prompt: 'Muvozanat masalasini yechish tartibini tiklang.',
      hint: 'Avval reaksiya tenglamasi.',
      explanation: 'Tenglama → jadval → sarflanganlarni koeffitsiyent boʻyicha topish → hisoblash.',
      widget: {
        type: 'step_order',
        props: { steps: ['reaksiya tenglamasini yozish', 'boshlangʻich / sarflangan / muvozanat jadvalini tuzish', 'sarflanganlarni koeffitsiyentlar boʻyicha topish', 'nomaʼlumni hisoblash'] }
      }
    },
    {
      id: 'k27q7',
      prompt: 'Boʻsh joylarni toʻldiring: CO + 3H₂ ⇄ CH₄ + H₂O da 0,5 mol/L CH₄ hosil boʻlsa…',
      hint: 'Koeffitsiyentlar 1 : 3 : 1.',
      explanation: 'CO 0,5, H₂ 1,5 mol/L sarflanadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'CO ' }, { blank: '0,5' }, { text: ' mol/L, H₂ ' }, { blank: '1,5' }, { text: ' mol/L sarflanadi.' }],
          bank: ['0,5', '1,5', '0,17', '3']
        }
      }
    },
    {
      id: 'k27q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Muvozanat = boshlangʻich − sarflangan.',
      explanation: 'Boshlangʻich moddalar uchun: muvozanat = boshlangʻich − sarflangan; mahsulot uchun: hosil boʻlgan miqdor.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sarflangan miqdorlar reaksiya koeffitsiyentlariga proporsional.', value: true },
            { text: 'Boshlangʻich = muvozanat + sarflangan.', value: true },
            { text: 'Muvozanatda barcha moddalar konsentratsiyasi teng boʻladi.', value: false },
            { text: 'K ifodasiga boshlangʻich konsentratsiyalar qoʻyiladi.', value: false }
          ]
        }
      }
    }
  ]
};
