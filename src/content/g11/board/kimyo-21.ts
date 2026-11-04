import type { BoardLesson } from './types';
import { BOB4 } from './kimyo-12';

/** Darslik: Umumiy kimyo 11, 21-mavzu (94–97-betlar) — foiz va normal, molyar va normal konsentratsiya orasidagi bogʻlanish. */
export const KIM_21: BoardLesson = {
  n: 21,
  label: '21',
  group: BOB4,
  title: 'Foiz va normal konsentratsiya bogʻlanishi',
  section: '21-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oldingi darsda foizdan molyarga oʻtdik. Normal konsentratsiya bilan ham xuddi shunday — faqat molyar massa oʻrniga ekvivalent massa olinadi. Molyar va normal konsentratsiya orasida esa juda oddiy bogʻlanish bor.",
      easy: "M oʻrniga E — xuddi oldingi formula.",
      draw: [
        { t: 'title', text: 'Uch konsentratsiya — bir zanjir' },
        { t: 'icon', x: 16, y: 34, emoji: '🔗', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🧮', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['% ⇄ M', '% ⇄ N', 'M ⇄ N'] }
      ],
      next: 'Foiz va normal'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Foizdan normalga: Cn teng C foiz karra 10 karra ro boʻlinsin E, bunda E — ekvivalent massa. Normaldan foizga: C foiz teng Cn karra E boʻlinsin ro karra 10. 10 foizli, zichligi 1,23 boʻlgan H2SO3 eritmasi: E teng 82 boʻlinsin 2 — 41; Cn teng 10 karra 1,23 karra 10 boʻlinsin 41 — 3 N.",
      easy: "Cn = C%·10·ρ / E;  C% = Cn·E / (10·ρ).",
      draw: [
        { t: 'title', text: 'Foiz ⇄ normal' },
        { t: 'formula', x: 4, y: 24, text: 'Cn = C% · 10 · ρ / E' },
        { t: 'formula', x: 4, y: 36, text: 'C% = Cn · E / (10 · ρ)' },
        { t: 'formula', x: 4, y: 52, text: 'H₂SO₃: 10 · 1,23 · 10 / 41 = 3 N' }
      ],
      next: 'Normaldan foizga'
    },
    {
      kind: 'explain',
      clear: true,
      say: "4 normal, zichligi 1,306 g/mL boʻlgan H3PO4 eritmasining foiz konsentratsiyasini topamiz. Ekvivalent: 98 boʻlinsin 3 — 32,67. C foiz teng 4 karra 32,67 boʻlinsin 13,06 — 10 foiz. Formuladan zichlik va ekvivalent massani ham topish mumkin.",
      easy: "E(H₃PO₄) = 32,67; C% = 4·32,67/13,06 = 10 %.",
      draw: [
        { t: 'title', text: 'Normaldan foizga' },
        { t: 'formula', x: 4, y: 24, text: 'E(H₃PO₄) = 98 / 3 = 32,67' },
        { t: 'formula', x: 4, y: 38, text: 'C% = 4 · 32,67 / (1,306 · 10) = 10 %' },
        { t: 'formula', x: 4, y: 54, text: 'ρ = Cn · E / (C% · 10)' }
      ],
      next: 'Molyar va normal'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Molyar va normal konsentratsiya bogʻlanishi: Cn teng Cm karra kation valentligi karra kationlar soni. Na2SO4 da natriy bir valentli, ikkita: 1,5 M teng 3 N. Al(NO3)3 da alyuminiy uch valentli, bitta: 7,5 N teng 2,5 M. Kislotalar uchun koʻpaytuvchi — vodorodlar soni: 1 M H2SO4 teng 2 N.",
      easy: "Cn = Cm · Val(kat) · n(kat); Na₂SO₄: ×2; Al(NO₃)₃: ×3.",
      draw: [
        { t: 'title', text: 'Molyar ⇄ normal' },
        { t: 'formula', x: 4, y: 24, text: 'Cn = Cm · Val(kat) · n(kat)' },
        { t: 'table', x: 4, y: 34, rows: [['modda', 'koʻpaytuvchi', 'misol'], ['Na₂SO₄', '1 · 2 = 2', '1,5 M = 3 N'], ['Al(NO₃)₃', '3 · 1 = 3', '7,5 N = 2,5 M'], ['Al₂(SO₄)₃', '3 · 2 = 6', '1 M = 6 N']] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "28 foizli, zichligi 1,2 g/mL boʻlgan KOH eritmasining normal konsentratsiyasi qancha? KOH da bitta OH guruh, ekvivalent 56. Cn teng 28 karra 10 karra 1,2 boʻlinsin 56 — 6 N. KOH uchun normal va molyar konsentratsiya teng — 6 M.",
      easy: "Cn = 28·10·1,2/56 = 6 N = 6 M.",
      draw: [
        { t: 'title', text: 'KOH eritmasi' },
        { t: 'formula', x: 4, y: 24, text: 'E(KOH) = 56' },
        { t: 'formula', x: 4, y: 38, text: 'Cn = 28 · 10 · 1,2 / 56 = 6 N' },
        { t: 'text', x: 4, y: 54, text: 'bir kislotali asos: Cn = Cm', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Foizdan normalga: Cn = C%·10·ρ/E; normaldan foizga: C% = Cn·E/(10·ρ).',
    'Molyar va normal: Cn = Cm · (kation valentligi) · (kationlar soni); kislotalarda — vodorodlar soni.',
    'Bir asosli kislota va bir kislotali asos uchun Cn = Cm.'
  ],
  questions: [
    {
      id: 'k21q1',
      prompt: '2,5 M li Fe₂(SO₄)₃ eritmasining normal konsentratsiyasi qancha?',
      hint: 'Fe(III), ikkita: × 6.',
      explanation: '2,5 · 6 = 15 N.',
      widget: { type: 'number_answer', props: { answer: 15, unit: 'N' } }
    },
    {
      id: 'k21q2',
      prompt: '9 N li Al₂(SO₄)₃ eritmasining molyar konsentratsiyasi qancha?',
      hint: '9 / 6.',
      explanation: '1,5 M.',
      widget: { type: 'number_answer', props: { answer: 1.5, tolerance: 0.01, unit: 'M' } }
    },
    {
      id: 'k21q3',
      prompt: '4 N li (ρ = 1,25 g/mL) NaOH eritmasining foiz konsentratsiyasi qancha?',
      hint: '4·40/(1,25·10).',
      explanation: '12,8 %.',
      widget: { type: 'number_answer', props: { answer: 12.8, tolerance: 0.01, unit: '%' } }
    },
    {
      id: 'k21q4',
      prompt: '40 % li (ρ = 1,2 g/mL) Al(NO₃)₃ eritmasining normal konsentratsiyasi qancha? (M = 213, 0,01 gacha)',
      hint: 'E = 71.',
      explanation: '40·10·1,2/71 ≈ 6,76 N.',
      widget: { type: 'number_answer', props: { answer: 6.76, tolerance: 0.02, unit: 'N' } }
    },
    {
      id: 'k21q5',
      prompt: '5 M li CaCl₂ eritmasining normal konsentratsiyasi qancha?',
      hint: 'Ca(II), bitta.',
      explanation: '5 · 2 = 10 N.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['5 N', '2,5 N', '10 N', '15 N'], answerIndex: 2 } }
    },
    {
      id: 'k21q6',
      prompt: 'Moddani Cn/Cm koʻpaytuvchisi bilan juftlang.',
      hint: 'Kation valentligi × kationlar soni.',
      explanation: 'NaCl — 1; CaCl₂ — 2; Al(NO₃)₃ — 3; Al₂(SO₄)₃ — 6.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'NaCl', right: '1' },
            { left: 'CaCl₂', right: '2' },
            { left: 'Al(NO₃)₃', right: '3' },
            { left: 'Al₂(SO₄)₃', right: '6' }
          ]
        }
      }
    },
    {
      id: 'k21q7',
      prompt: '6 N li H₂SO₄ eritmasining molyar konsentratsiyasi qancha?',
      hint: 'Ikki asosli kislota.',
      explanation: '6 / 2 = 3 M.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['3 M', '6 M', '12 M', '2 M'], answerIndex: 0 } }
    },
    {
      id: 'k21q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Normal konsentratsiya molyardan kichik boʻlmaydi.',
      explanation: 'Cn ≥ Cm (koʻpaytuvchi ≥ 1); HCl uchun teng; Al₂(SO₄)₃ uchun 6 marta katta.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Normal konsentratsiya hech qachon molyardan kichik boʻlmaydi.', value: true },
            { text: '1 M Al₂(SO₄)₃ eritmasi 6 N ga teng.', value: true },
            { text: 'Foizdan normalga oʻtishda molyar massa olinadi.', value: false },
            { text: 'KOH uchun normal konsentratsiya molyarnikidan 2 marta katta.', value: false }
          ]
        }
      }
    }
  ]
};
