import type { BoardLesson } from './types';
import { BOB4 } from './kimyo-12';
import { block } from './chem';

/** Darslik: Umumiy kimyo 11, 15-mavzu (73–77-betlar) — eritma konsentratsiyasi, foiz konsentratsiya va uning formulalari. */
export const KIM_15: BoardLesson = {
  n: 15,
  label: '15',
  group: BOB4,
  title: 'Eritma konsentratsiyasi. Foiz konsentratsiya',
  section: '15-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Dorixonada «9 foizli sirka», «3 foizli vodorod peroksid», «0,9 foizli fiziologik eritma» yozuvlarini koʻrasiz. Bu foizlar eritmada qancha modda borligini aniq aytadi. «Quyuq» yoki «suyuq» degan soʻzlar esa aniq maʼlumot bermaydi. Eritma tarkibini aniq ifodalash — konsentratsiya.",
      easy: "Foizlar eritmada qancha modda borligini aniq koʻrsatadi.",
      draw: [
        { t: 'title', text: 'Yorliqdagi foizlar' },
        { t: 'icon', x: 16, y: 34, emoji: '🧴', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '💉', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['sirka — 9 %', 'vodorod peroksid — 3 %', 'fiziologik eritma — 0,9 % NaCl'] }
      ],
      next: 'Konsentratsiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eritma konsentratsiyasi — maʼlum massa yoki hajmdagi eritmada erigan modda miqdori. Konsentrlangan eritmada modda koʻp, zichligi katta; suyultirilganda xossalari suvga yaqin. Aniq ifodalashning uch usulini oʻrganamiz: foiz, molyar va normal konsentratsiya.",
      easy: "Konsentratsiya: foiz, molyar, normal.",
      draw: [
        { t: 'title', text: 'Konsentratsiyani ifodalash' },
        ...block('p', 4, 26, 28, 'foiz, %', 'red'),
        ...block('m', 36, 26, 28, 'molyar, M', 'blue'),
        ...block('n', 68, 26, 28, 'normal, N', 'purple'),
        { t: 'list', x: 4, y: 48, items: ['konsentrlangan — modda koʻp, zichlik katta', 'suyultirilgan — suvga yaqin'] }
      ],
      next: 'Foiz konsentratsiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Foiz konsentratsiya — 100 gramm eritmada necha gramm erigan modda borligi. 15 foizli shakar eritmasi: 100 grammida 15 gramm shakar va 85 gramm suv. Formula: C foiz teng erigan modda massasi m1 boʻlinsin eritma massasi m2, karra 100. Eritma massasi — erigan modda va erituvchi massalari yigʻindisi.",
      easy: "C% = m₁ / m₂ · 100 %; m₂ = m(modda) + m(suv).",
      draw: [
        { t: 'title', text: 'Foiz konsentratsiya' },
        { t: 'formula', x: 4, y: 24, text: 'C% = m₁ / m₂ · 100 %' },
        { t: 'formula', x: 4, y: 38, text: 'm₂ = m₁ + m(erituvchi)' },
        { t: 'text', x: 4, y: 54, text: '15 %: 100 g eritmada 15 g shakar + 85 g suv', size: 's', color: 'purple' }
      ],
      next: 'Formulaning uch shakli'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Formuladan istalgan kattalikni topamiz. Erigan modda massasi: m1 teng C foiz karra m2 boʻlinsin 100. Eritma massasi: m2 teng m1 karra 100 boʻlinsin C foiz. Masalan, 30 foizli KBr eritmasidan 500 gramm tayyorlash uchun 150 gramm tuz va 350 gramm suv kerak. Modda miqdori berilsa, avval massasini topamiz: m teng n karra M.",
      easy: "m₁ = C%·m₂/100; m₂ = m₁·100/C%; m = n·M.",
      draw: [
        { t: 'title', text: 'Formulaning uch shakli' },
        { t: 'formula', x: 4, y: 22, text: 'm₁ = C% · m₂ / 100' },
        { t: 'formula', x: 4, y: 34, text: 'm₂ = m₁ · 100 / C%' },
        { t: 'formula', x: 4, y: 48, text: '30 %, 500 g: KBr 150 g + suv 350 g' },
        { t: 'formula', x: 4, y: 60, text: 'm = n · M' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "0,5 mol Na2CO3 97 gramm suvda eritildi. Foiz konsentratsiyani topamiz. Massa: 0,5 karra 106 — 53 gramm. Eritma: 53 qoʻshuv 97 — 150 gramm. Konsentratsiya: 53 boʻlinsin 150, karra 100 — 35,33 foiz.",
      easy: "m = 53 g; m₂ = 150 g; C% = 35,33 %.",
      draw: [
        { t: 'title', text: 'Soda eritmasi' },
        { t: 'formula', x: 4, y: 24, text: 'm(Na₂CO₃) = 0,5 · 106 = 53 g' },
        { t: 'formula', x: 4, y: 38, text: 'm₂ = 53 + 97 = 150 g' },
        { t: 'formula', x: 4, y: 52, text: 'C% = 53 / 150 · 100 = 35,33 %' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Konsentratsiya — eritmadagi erigan modda miqdori; foiz, molyar va normal usullarda ifodalanadi.',
    'Foiz konsentratsiya C% = m₁/m₂ · 100 % — 100 g eritmadagi modda grammlari.',
    'm₁ = C%·m₂/100, m₂ = m₁·100/C%, m₂ = m₁ + m(erituvchi); modda miqdori berilsa m = n·M.'
  ],
  questions: [
    {
      id: 'k15q1',
      prompt: '25 g NaCl 100 g suvda eritildi. Foiz konsentratsiya qancha?',
      hint: '25 / 125.',
      explanation: '20 %.',
      widget: { type: 'number_answer', props: { answer: 20, unit: '%' } }
    },
    {
      id: 'k15q2',
      prompt: '36 g NaCl ni necha gramm suvda eritsak, 25 % li eritma hosil boʻladi?',
      hint: 'm₂ = 36 · 100 / 25.',
      explanation: 'm₂ = 144 g; suv = 144 − 36 = 108 g.',
      widget: { type: 'number_answer', props: { answer: 108, unit: 'g' } }
    },
    {
      id: 'k15q3',
      prompt: '450 g suvda necha gramm K₂SO₄ eritilsa, 10 % li eritma hosil boʻladi?',
      hint: '10 % — 90 g suvga 10 g tuz.',
      explanation: '450 · 10 / 90 = 50 g.',
      widget: { type: 'number_answer', props: { answer: 50, unit: 'g' } }
    },
    {
      id: 'k15q4',
      prompt: '0,25 mol Na₂SO₄ 164,5 g suvda eritildi. Foiz konsentratsiya qancha? (M = 142)',
      hint: 'm = 35,5 g.',
      explanation: '35,5 / 200 · 100 = 17,75 %.',
      widget: { type: 'number_answer', props: { answer: 17.75, tolerance: 0.01, unit: '%' } }
    },
    {
      id: 'k15q5',
      prompt: '10 % li KNO₃ eritmasidan 250 g tayyorlash uchun qancha tuz va suv kerak?',
      hint: 'm₁ = 10 · 250 / 100.',
      explanation: '25 g tuz va 225 g suv.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['10 g va 240 g', '25 g va 225 g', '25 g va 250 g', '50 g va 200 g'], answerIndex: 1 } }
    },
    {
      id: 'k15q6',
      prompt: 'Formulani topiladigan kattalik bilan juftlang.',
      hint: 'C% = m₁/m₂ · 100.',
      explanation: 'C% = m₁/m₂·100; m₁ = C%·m₂/100; m₂ = m₁·100/C%.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'm₁ / m₂ · 100' }, b: { label: 'foiz konsentratsiya' } },
            { a: { label: 'C% · m₂ / 100' }, b: { label: 'erigan modda massasi' } },
            { a: { label: 'm₁ · 100 / C%' }, b: { label: 'eritma massasi' } },
            { a: { label: 'm₂ − m₁' }, b: { label: 'erituvchi massasi' } }
          ]
        }
      }
    },
    {
      id: 'k15q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: '20 % li eritma.',
      explanation: '200 g 20 % li eritmada 40 g modda va 160 g suv bor.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: '200 g 20 % li eritmada ' },
            { blank: '40 g' },
            { text: ' modda va ' },
            { blank: '160 g' },
            { text: ' suv bor.' }
          ],
          bank: ['40 g', '160 g', '20 g', '180 g']
        }
      }
    },
    {
      id: 'k15q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Foiz — eritma massasiga nisbatan.',
      explanation: 'Foiz eritma massasiga nisbatan; 100 g suvda 10 g tuz — 9,09 %, 10 % emas.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Foiz konsentratsiya eritma massasiga nisbatan hisoblanadi.', value: true },
            { text: '15 % li eritmaning 100 grammida 85 g erituvchi bor.', value: true },
            { text: '100 g suvda 10 g tuz eritilsa, 10 % li eritma hosil boʻladi.', value: false },
            { text: '«Konsentrlangan» soʻzi eritma tarkibini aniq ifodalaydi.', value: false }
          ]
        }
      }
    }
  ]
};
