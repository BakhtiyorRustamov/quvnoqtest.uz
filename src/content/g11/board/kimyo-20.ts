import type { BoardLesson } from './types';
import { BOB4 } from './kimyo-12';

/** Darslik: Umumiy kimyo 11, 20-mavzu (92–94-betlar) — foiz va molyar konsentratsiya orasidagi bogʻlanish: Cm = C%·10·ρ/M. */
export const KIM_20: BoardLesson = {
  n: 20,
  label: '20',
  group: BOB4,
  title: 'Foiz va molyar konsentratsiya bogʻlanishi',
  section: '20-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Doʻkondan kelgan kislota shishasida «20 foiz, zichligi 1,14» deb yozilgan, laboratoriya ishida esa «2 M eritma oling» deyilgan. Bir konsentratsiyadan ikkinchisiga tez oʻtish uchun bitta qulay formula bor.",
      easy: "Foizdan molyarga va aksincha — bitta formula.",
      draw: [
        { t: 'title', text: 'Foizdan molyarga' },
        { t: 'icon', x: 16, y: 34, emoji: '🏷️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🔁', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['yorliqda — %, ρ', 'ishda — M', 'oʻtish formulasi'] }
      ],
      next: 'Formula'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1 litr, yaʼni 1000 mL eritmaning massasi 1000 karra ro gramm, undagi modda 1000 karra ro karra C foiz boʻlinsin 100, yaʼni 10 karra ro karra C foiz gramm. Uni M ga boʻlsak — mollar soni. Demak, Cm teng C foiz karra 10 karra ro boʻlinsin M. Teskari: C foiz teng Cm karra M boʻlinsin ro karra 10.",
      easy: "Cm = C%·10·ρ / M;  C% = Cm·M / (10·ρ).",
      draw: [
        { t: 'title', text: 'Oʻtish formulalari' },
        { t: 'formula', x: 4, y: 24, text: 'Cm = C% · 10 · ρ / M' },
        { t: 'formula', x: 4, y: 38, text: 'C% = Cm · M / (10 · ρ)' },
        { t: 'text', x: 4, y: 54, text: '1 L eritma: massa 1000ρ g, modda 10ρ·C% g', size: 's', color: 'purple' }
      ],
      next: 'Zichlik va M'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Formuladan zichlikni ham, nomaʼlum moddaning molyar massasini ham topish mumkin: ro teng Cm karra M boʻlinsin C foiz karra 10; M teng C foiz karra 10 karra ro boʻlinsin Cm. 20,2 foizli 2,5 M KNO3 eritmasining zichligi: 2,5 karra 101 boʻlinsin 202 — 1,25 g/mL.",
      easy: "ρ = Cm·M / (C%·10); M = C%·10·ρ / Cm.",
      draw: [
        { t: 'title', text: 'Zichlik va molyar massa' },
        { t: 'formula', x: 4, y: 24, text: 'ρ = Cm · M / (C% · 10)' },
        { t: 'formula', x: 4, y: 36, text: 'M = C% · 10 · ρ / Cm' },
        { t: 'formula', x: 4, y: 52, text: 'ρ(KNO₃) = 2,5 · 101 / 202 = 1,25 g/mL' }
      ],
      next: 'Nomaʼlum modda'
    },
    {
      kind: 'explain',
      clear: true,
      say: "16 foizli, zichligi 1,4 g/mL boʻlgan nomaʼlum modda eritmasi 4 M. Molyar massa: 16 karra 10 karra 1,4 boʻlinsin 4 — 56 g/mol. Bu KOH. Temir ham 56, lekin u suvda erimaydi.",
      easy: "M = 16·10·1,4/4 = 56 → KOH.",
      draw: [
        { t: 'title', text: 'Nomaʼlum modda' },
        { t: 'formula', x: 4, y: 26, text: 'M = 16 · 10 · 1,4 / 4 = 56 g/mol' },
        { t: 'text', x: 4, y: 42, text: 'KOH (Fe ham 56, lekin erimaydi)', color: 'red' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "20 foizli, zichligi 1,25 g/mL boʻlgan KOH eritmasining molyar konsentratsiyasi: 20 karra 1,25 karra 10 boʻlinsin 56 — taxminan 4,46 M. Teskari misol: 1,5 M, zichligi 1,26 boʻlgan HNO3 eritmasi: 1,5 karra 63 boʻlinsin 12,6 — 7,5 foiz.",
      easy: "KOH: 4,46 M; HNO₃: 7,5 %.",
      draw: [
        { t: 'title', text: 'Ikki tomonga' },
        { t: 'formula', x: 4, y: 24, text: 'Cm = 20 · 1,25 · 10 / 56 ≈ 4,46 M' },
        { t: 'formula', x: 4, y: 40, text: 'C% = 1,5 · 63 / (1,26 · 10) = 7,5 %' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Foizdan molyarga: Cm = C%·10·ρ/M; molyardan foizga: C% = Cm·M/(10·ρ).',
    'Zichlik: ρ = Cm·M/(C%·10); nomaʼlum modda molyar massasi: M = C%·10·ρ/Cm.',
    'Formula 1 L eritmaga asoslangan: massasi 1000ρ g, undagi modda 10·ρ·C% g.'
  ],
  questions: [
    {
      id: 'k20q1',
      prompt: '5 % li (ρ = 1,26 g/mL) HNO₃ eritmasining molyar konsentratsiyasi qancha?',
      hint: '5·10·1,26/63.',
      explanation: '1 M.',
      widget: { type: 'number_answer', props: { answer: 1, tolerance: 0.01, unit: 'M' } }
    },
    {
      id: 'k20q2',
      prompt: '40 % li (ρ = 1,225 g/mL) H₂SO₄ eritmasining molyar konsentratsiyasi qancha?',
      hint: '40·10·1,225/98.',
      explanation: '5 M.',
      widget: { type: 'number_answer', props: { answer: 5, tolerance: 0.01, unit: 'M' } }
    },
    {
      id: 'k20q3',
      prompt: '3 M li (ρ = 1,275 g/mL) NaNO₃ eritmasining foiz konsentratsiyasi qancha? (M = 85)',
      hint: '3·85/(1,275·10).',
      explanation: '20 %.',
      widget: { type: 'number_answer', props: { answer: 20, tolerance: 0.05, unit: '%' } }
    },
    {
      id: 'k20q4',
      prompt: 'NaNO₃ ning 17 % li eritmasi 2,5 M. Zichligi qancha?',
      hint: 'ρ = 2,5·85/(17·10).',
      explanation: '1,25 g/mL.',
      widget: { type: 'number_answer', props: { answer: 1.25, tolerance: 0.005, unit: 'g/mL' } }
    },
    {
      id: 'k20q5',
      prompt: '25 % li (ρ = 1,176 g/mL) nomaʼlum modda eritmasi 3 M. Erigan modda qaysi boʻlishi mumkin?',
      hint: 'M = 25·10·1,176/3.',
      explanation: 'M = 98 — H₂SO₄ yoki H₃PO₄.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['HNO₃', 'H₂SO₄ yoki H₃PO₄', 'NaOH', 'HCl'], answerIndex: 1 } }
    },
    {
      id: 'k20q6',
      prompt: 'Formulani topiladigan kattalik bilan juftlang.',
      hint: 'Cm = C%·10·ρ/M.',
      explanation: 'C%·10·ρ/M — Cm; Cm·M/(10ρ) — C%; Cm·M/(C%·10) — ρ; C%·10·ρ/Cm — M.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'C%·10·ρ / M' }, b: { label: 'molyar konsentratsiya' } },
            { a: { label: 'Cm·M / (10·ρ)' }, b: { label: 'foiz konsentratsiya' } },
            { a: { label: 'Cm·M / (C%·10)' }, b: { label: 'zichlik' } },
            { a: { label: 'C%·10·ρ / Cm' }, b: { label: 'molyar massa' } }
          ]
        }
      }
    },
    {
      id: 'k20q7',
      prompt: '0,5 M li (ρ = 1,19 g/mL) KBr eritmasining foiz konsentratsiyasi taxminan qancha? (M = 119)',
      hint: '0,5·119/11,9.',
      explanation: '5 %.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0,5 %', '5 %', '50 %', '11,9 %'], answerIndex: 1 } }
    },
    {
      id: 'k20q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Formula 1 L eritma uchun chiqarilgan.',
      explanation: 'Formulada ρ g/mL da; 10 koʻpaytuvchi 1000 mL va 100 % dan keladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Formulada zichlik g/mL da olinadi.', value: true },
            { text: '10 koʻpaytuvchisi 1000 mL ni 100 % ga boʻlishdan keladi.', value: true },
            { text: 'Foizdan molyarga oʻtishda zichlik kerak emas.', value: false },
            { text: 'Cm = C% · M / (10 · ρ).', value: false }
          ]
        }
      }
    }
  ]
};
