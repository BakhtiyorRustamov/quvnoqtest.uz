import type { BoardLesson } from './types';
import { BOB4 } from './kimyo-12';
import { block } from './chem';

/** Darslik: Umumiy kimyo 11, 17-mavzu (84–85-betlar) — foiz konsentratsiya, eritma massasi, hajmi va zichligi orasidagi bogʻlanish. */
export const KIM_17: BoardLesson = {
  n: 17,
  label: '17',
  group: BOB4,
  title: 'Foiz konsentratsiya, massa, hajm va zichlik',
  section: '17-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Laboratoriyada eritmani tarozida emas, oʻlchov silindrida — hajm bilan oʻlchash qulay. Lekin foiz konsentratsiya massaga asoslangan. Hajmni massaga oʻtkazish uchun eritmaning zichligi kerak.",
      easy: "Hajmni massaga oʻtkazish uchun zichlik kerak.",
      draw: [
        { t: 'title', text: 'Silindr va tarozi' },
        { t: 'icon', x: 16, y: 34, emoji: '🧪', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚖️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['hajm — mL', 'massa — g', 'bogʻlovchi — zichlik ρ'] }
      ],
      next: 'Zichlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eritma zichligi ro — eritma massasining hajmiga nisbati: ro teng m boʻlinsin V, odatda g/mL da. Bundan massa m teng V karra ro, hajm V teng m boʻlinsin ro. Masalan, 200 mL eritma zichligi 1,12 g/mL boʻlsa, massasi 224 gramm.",
      easy: "ρ = m/V; m = V·ρ; V = m/ρ.",
      draw: [
        { t: 'title', text: 'Zichlik' },
        { t: 'formula', x: 4, y: 24, text: 'ρ = m / V' },
        ...block('m', 66, 18, 24, 'm', 'red'),
        ...block('v', 60, 30, 18, 'V', 'blue'),
        ...block('r', 78, 30, 18, 'ρ', 'purple'),
        { t: 'formula', x: 4, y: 40, text: 'm = V · ρ,   V = m / ρ' },
        { t: 'formula', x: 4, y: 54, text: '200 mL · 1,12 g/mL = 224 g' }
      ],
      next: 'Foizni topish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hajm va zichlik berilganda, avval eritma massasini topamiz, keyin foiz formulasini qoʻllaymiz. 200 mL, zichligi 1,12 g/mL boʻlgan eritmada 44,8 gramm KOH bor. Eritma massasi 224 gramm, konsentratsiya 44,8 boʻlinsin 224 — 20 foiz.",
      easy: "m₂ = V·ρ → C% = m₁/m₂·100: 44,8/224 = 20 %.",
      draw: [
        { t: 'title', text: 'Hajmdan foizga' },
        { t: 'formula', x: 4, y: 24, text: 'm₂ = 200 · 1,12 = 224 g' },
        { t: 'formula', x: 4, y: 38, text: 'C% = 44,8 / 224 · 100 = 20 %' },
        { t: 'text', x: 4, y: 54, text: 'avval massa, keyin foiz', color: 'purple' }
      ],
      next: 'Moddani topish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Teskari masala: 177,5 mL, zichligi 1,2 g/mL boʻlgan 40 foizli Na2SO4 eritmasida qancha tuz bor? Eritma massasi: 177,5 karra 1,2 — 213 gramm. Tuz: 213 karra 40 boʻlinsin 100 — 85,2 gramm. Umumiy formula: m1 teng V karra ro karra C foiz boʻlinsin 100.",
      easy: "m₁ = V·ρ·C%/100 = 177,5·1,2·0,4 = 85,2 g.",
      draw: [
        { t: 'title', text: 'Erigan modda massasi' },
        { t: 'formula', x: 4, y: 24, text: 'm₁ = V · ρ · C% / 100' },
        { t: 'formula', x: 4, y: 38, text: 'm₂ = 177,5 · 1,2 = 213 g' },
        { t: 'formula', x: 4, y: 52, text: 'm₁ = 213 · 0,4 = 85,2 g' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tarkibida 49 gramm H2SO4 boʻlgan 160 mL eritmaning zichligi 1,15 g/mL. Foiz konsentratsiya qancha? Massa: 160 karra 1,15 — 184 gramm. Konsentratsiya: 49 boʻlinsin 184, karra 100 — taxminan 26,6 foiz.",
      easy: "m₂ = 184 g; C% = 49/184 ≈ 26,6 %.",
      draw: [
        { t: 'title', text: 'Sulfat kislota eritmasi' },
        { t: 'formula', x: 4, y: 24, text: 'm₂ = 160 · 1,15 = 184 g' },
        { t: 'formula', x: 4, y: 38, text: 'C% = 49 / 184 · 100 ≈ 26,6 %' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Zichlik ρ = m/V (g/mL); m = V·ρ, V = m/ρ.',
    'Hajm va zichlik berilsa, avval eritma massasini topib, keyin C% = m₁/m₂·100 ni qoʻllaymiz.',
    'Erigan modda massasi: m₁ = V·ρ·C%/100.'
  ],
  questions: [
    {
      id: 'k17q1',
      prompt: 'Tarkibida 80 g NaOH boʻlgan 300 mL eritmaning zichligi 1,12 g/mL. Foiz konsentratsiya necha? (0,1 gacha)',
      hint: 'm₂ = 336 g.',
      explanation: '80 / 336 · 100 ≈ 23,8 %.',
      widget: { type: 'number_answer', props: { answer: 23.8, tolerance: 0.1, unit: '%' } }
    },
    {
      id: 'k17q2',
      prompt: '200 mL (ρ = 1,25 g/mL) 25 % li AgNO₃ eritmasida necha gramm tuz bor?',
      hint: 'm₂ = 250 g.',
      explanation: '250 · 0,25 = 62,5 g.',
      widget: { type: 'number_answer', props: { answer: 62.5, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k17q3',
      prompt: '240 mL (ρ = 1,125 g/mL) 15 % li (NH₄)₂SO₄ eritmasida necha gramm tuz bor?',
      hint: 'm₂ = 270 g.',
      explanation: '270 · 0,15 = 40,5 g.',
      widget: { type: 'number_answer', props: { answer: 40.5, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k17q4',
      prompt: '300 g eritmaning zichligi 1,2 g/mL. Hajmi necha mL?',
      hint: 'V = m / ρ.',
      explanation: '300 / 1,2 = 250 mL.',
      widget: { type: 'number_answer', props: { answer: 250, unit: 'mL' } }
    },
    {
      id: 'k17q5',
      prompt: 'Eritma hajmi va zichligi maʼlum. Foiz konsentratsiyani topish uchun avval nimani hisoblash kerak?',
      hint: 'Foiz — massaga nisbatan.',
      explanation: 'Eritma massasini: m = V·ρ.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['molyar massani', 'eritma massasini', 'erituvchi hajmini', 'modda miqdorini'], answerIndex: 1 } }
    },
    {
      id: 'k17q6',
      prompt: 'Formulani topiladigan kattalik bilan juftlang.',
      hint: 'ρ = m/V.',
      explanation: 'm/V — zichlik; V·ρ — massa; m/ρ — hajm.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'm / V', right: 'zichlik' },
            { left: 'V · ρ', right: 'eritma massasi' },
            { left: 'm / ρ', right: 'eritma hajmi' }
          ]
        }
      }
    },
    {
      id: 'k17q7',
      prompt: 'Hajmdan foiz konsentratsiyani topish bosqichlarini tartiblang.',
      hint: 'Avval massa.',
      explanation: 'V va ρ → m₂ = V·ρ → C% = m₁/m₂·100.',
      widget: { type: 'step_order', props: { steps: ['Eritma hajmi va zichligini yozish', 'Eritma massasi: m₂ = V · ρ', 'Foiz: C% = m₁ / m₂ · 100'] } }
    },
    {
      id: 'k17q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Zichlik g/mL.',
      explanation: 'Konsentrlangan eritma zichligi suvnikidan katta; zichlik 1,2 g/mL boʻlsa, 1 L ning massasi 1200 g.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Zichligi 1,2 g/mL boʻlgan 1 L eritmaning massasi 1200 g.', value: true },
            { text: 'Tuz eritmasi qanchalik konsentrlangan boʻlsa, zichligi shunchalik katta.', value: true },
            { text: 'Foiz konsentratsiyani topishda eritma hajmini toʻgʻridan-toʻgʻri massa oʻrniga qoʻyish mumkin.', value: false },
            { text: 'm = V / ρ.', value: false }
          ]
        }
      }
    }
  ]
};
