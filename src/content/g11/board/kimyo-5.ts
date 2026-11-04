import type { BoardLesson } from './types';

export const BOB2 = { kicker: '2-bob', title: 'Modda miqdori' };

/** Darslik: Umumiy kimyo 11, 5-mavzu (31–34-betlar) — mol, molyar massa, massaning saqlanish qonuni, tarkibning doimiylik qonuni. */
export const KIM_5: BoardLesson = {
  n: 5,
  label: '5',
  group: BOB2,
  title: 'Modda miqdori',
  section: '5-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Bir qoshiq suvda — taxminan 18 grammda — 600 sekstillion, yaʼni 6 karra 10 ning 23 darajasi molekula bor. Agar ularni bittadan sekundiga sanasangiz, Koinot yoshidan million marta koʻp vaqt ketadi! Shuning uchun kimyogarlar zarrachalarni donalab emas, «mol» bilan sanaydi.",
      easy: "18 g suvda 6·10²³ molekula — buni bir mol deyiladi.",
      draw: [
        { t: 'title', text: 'Bir qoshiq suv' },
        { t: 'icon', x: 16, y: 34, emoji: '🥄', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '💧', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['18 g suv = 1 mol', '6,02 · 10²³ molekula', 'donalab sanab boʻlmaydi'] }
      ],
      next: 'Mol nima?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bir xil element atomlaridan tuzilgan moddalar — oddiy moddalar, turli elementlardan — murakkab moddalar. Modda miqdori mol bilan oʻlchanadi. Bir mol — 6,02 karra 10 ning 23 darajasi zarracha — molekula, atom yoki ion saqlagan miqdor. Bu son Avogadro soni. Kichikroq birliklar ham bor: 1 kilomol — 1000 mol, 1 millimol — 0,001 mol.",
      easy: "1 mol = 6,02·10²³ zarracha (Avogadro soni).",
      draw: [
        { t: 'title', text: 'Mol' },
        { t: 'formula', x: 4, y: 24, text: '1 mol = 6,02 · 10²³ zarracha' },
        { t: 'list', x: 4, y: 38, items: ['oddiy modda: O₂, Fe, S', 'murakkab modda: H₂O, FeS', '1 kmol = 1000 mol, 1 mmol = 0,001 mol'] }
      ],
      next: 'Molyar massa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Molyar massa — bir mol moddaning massasi, g/mol da. U son jihatdan nisbiy molekulyar massaga teng: suv 18, temir 56, temir sulfid 88 g/mol. Modda miqdori n teng massa m boʻlinsin molyar massa M. Masalan, 28 gramm KOH: 28 boʻlinsin 56, yaʼni 0,5 mol.",
      easy: "n = m / M. 28 g KOH = 28/56 = 0,5 mol.",
      draw: [
        { t: 'title', text: 'Molyar massa' },
        { t: 'formula', x: 4, y: 24, text: 'n = m / M      m = n · M' },
        { t: 'table', x: 4, y: 34, rows: [['modda', 'M, g/mol'], ['H₂O', '18'], ['Fe', '56'], ['FeS', '88'], ['KOH', '56']] },
        { t: 'formula', x: 50, y: 44, text: '28 g / 56 = 0,5 mol' }
      ],
      next: 'Massaning saqlanishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Reaksiyada atomlar yoʻqolmaydi va yoʻqdan paydo boʻlmaydi, faqat qayta guruhlanadi. Shuning uchun reaksiyaga kirgan moddalar massasi hosil boʻlgan moddalar massasiga teng — massaning saqlanish qonuni. 56 gramm temir va 32 gramm oltingugurtdan 88 gramm temir sulfid hosil boʻladi. Tarkibning doimiylik qonuni: toza birikma qanday olinmasin, tarkibi oʻzgarmaydi — CO2 da 27,27 foiz uglerod.",
      easy: "Massa saqlanadi: Fe + S → FeS, 56 + 32 = 88. Birikma tarkibi doimiy.",
      draw: [
        { t: 'title', text: 'Saqlanish va doimiylik' },
        { t: 'formula', x: 4, y: 24, text: 'Fe   +   S   →   FeS' },
        { t: 'formula', x: 4, y: 36, text: '56 g + 32 g = 88 g' },
        { t: 'formula', x: 4, y: 54, text: 'CO₂:  C 12/44 = 27,27 %,  O 72,73 %' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Bitta kumush atomining massasini topamiz. Kumushning molyar massasi 108 g/mol, bir molda 6,02 karra 10 ning 23 darajasi atom. Bitta atom: 108 boʻlinsin 6,02 karra 10 ning 23 darajasi, taxminan 1,79 karra 10 ning minus 22 darajasi gramm. Juda kichik!",
      easy: "m(Ag) = 108 / 6,02·10²³ ≈ 1,79·10⁻²² g.",
      draw: [
        { t: 'title', text: 'Bitta atom massasi' },
        { t: 'list', x: 4, y: 20, items: ['M(Ag) = 108 g/mol', 'Nₐ = 6,02 · 10²³'] },
        { t: 'formula', x: 4, y: 46, text: 'm = 108 / 6,02·10²³ ≈ 1,79 · 10⁻²² g' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Modda miqdori mol bilan oʻlchanadi: 1 mol = 6,02·10²³ zarracha (Avogadro soni).',
    'Molyar massa — 1 mol massasi (g/mol); n = m / M, m = n · M.',
    'Massaning saqlanish qonuni va tarkibning doimiylik qonuni: CO₂ da doim 27,27 % uglerod.'
  ],
  questions: [
    {
      id: 'k5q1',
      prompt: '5 mol azot N₂ ning massasi necha gramm?',
      hint: 'M(N₂) = 28 g/mol.',
      explanation: '5 · 28 = 140 g.',
      widget: { type: 'number_answer', props: { answer: 140, unit: 'g' } }
    },
    {
      id: 'k5q2',
      prompt: '128 g misda necha mol modda bor? (Ar(Cu) = 64)',
      hint: 'n = m / M.',
      explanation: '128 / 64 = 2 mol.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'mol' } }
    },
    {
      id: 'k5q3',
      prompt: '17 g kumush nitrat AgNO₃ necha mol? (M = 170 g/mol)',
      hint: '17 / 170.',
      explanation: '0,1 mol.',
      widget: { type: 'number_answer', props: { answer: 0.1, tolerance: 0.001, unit: 'mol' } }
    },
    {
      id: 'k5q4',
      prompt: 'Bitta mis atomining massasi necha ·10⁻²² g? (Ar(Cu) = 64, 0,01 gacha)',
      hint: '64 / 6,02·10²³.',
      explanation: '≈ 1,06·10⁻²² g.',
      widget: { type: 'number_answer', props: { answer: 1.06, tolerance: 0.01, unit: '·10⁻²² g' } }
    },
    {
      id: 'k5q5',
      prompt: '120,2 g bariy fosfat Ba₃(PO₄)₂ necha mol? (M = 601 g/mol)',
      hint: 'n = m / M.',
      explanation: '120,2 / 601 = 0,2 mol.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0,1 mol', '0,2 mol', '0,5 mol', '2 mol'], answerIndex: 1 } }
    },
    {
      id: 'k5q6',
      prompt: 'Kattalikni birligi bilan juftlang.',
      hint: 'Molyar massa — g/mol.',
      explanation: 'Modda miqdori — mol; massa — g; molyar massa — g/mol; Avogadro soni — 1/mol.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'modda miqdori n', right: 'mol' },
            { left: 'massa m', right: 'g' },
            { left: 'molyar massa M', right: 'g/mol' },
            { left: 'Avogadro soni Nₐ', right: 'mol⁻¹' }
          ]
        }
      }
    },
    {
      id: 'k5q7',
      prompt: 'Moddalarni oddiy va murakkabga ajrating.',
      hint: 'Bir xil atomlar — oddiy.',
      explanation: 'Oddiy: O₂, Fe, S₈. Murakkab: H₂O, FeS, CO₂.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'o', label: 'Oddiy' },
            { id: 'm', label: 'Murakkab' }
          ],
          items: [
            { emoji: '', label: 'O₂', bin: 'o' },
            { emoji: '', label: 'Fe', bin: 'o' },
            { emoji: '', label: 'S₈', bin: 'o' },
            { emoji: '', label: 'H₂O', bin: 'm' },
            { emoji: '', label: 'FeS', bin: 'm' },
            { emoji: '', label: 'CO₂', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'k5q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Atomlar reaksiyada saqlanadi.',
      explanation: 'Massa saqlanadi; 1 mol suv 18 g; massa va modda miqdori turli tushunchalar.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Reaksiyada atomlar faqat qayta guruhlanadi, massa saqlanadi.', value: true },
            { text: '1 mol suvning massasi 18 g.', value: true },
            { text: 'Massa va modda miqdori — bir xil tushuncha.', value: false },
            { text: 'Birikmaning tarkibi olinish usuliga qarab oʻzgaradi.', value: false }
          ]
        }
      }
    }
  ]
};
