import type { BoardLesson } from './types';
import { BOB4 } from './kimyo-12';
import { rect } from './phys';

/** Darslik: Umumiy kimyo 11, 18-mavzu (85–88-betlar) — molyar konsentratsiya: Cm = n/V, n = Cm·V, V = n/Cm. */
export const KIM_18: BoardLesson = {
  n: 18,
  label: '18',
  group: BOB4,
  title: 'Molyar konsentratsiya',
  section: '18-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Kimyogarlar reaksiyalarda moddalarni mollar bilan hisoblaydi. Shuning uchun ular uchun eng qulay konsentratsiya — 1 litr eritmada necha mol modda borligi. Laboratoriyadagi kolbalarda «0,1 M HCl», «2 M NaOH» degan yozuvlar shuni bildiradi.",
      easy: "Molyar konsentratsiya — 1 L eritmadagi mollar soni.",
      draw: [
        { t: 'title', text: '«0,1 M HCl»' },
        { t: 'icon', x: 16, y: 34, emoji: '⚗️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🏷️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['M — molyar', '1 L eritmadagi mollar', 'reaksiyalar mollarda'] }
      ],
      next: 'Taʼrif'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Molyar konsentratsiya Cm — 1 litr eritmadagi erigan modda miqdori: Cm teng n boʻlinsin V. Birligi mol/L yoki M — molyar. Hajm har doim litrda! Bundan: modda miqdori n teng Cm karra V, hajm V teng n boʻlinsin Cm. 0,75 mol NaNO3 dan 250 mL, yaʼni 0,25 L eritma tayyorlansa, Cm teng 3 M.",
      easy: "Cm = n/V (V — litrda); n = Cm·V; V = n/Cm.",
      draw: [
        { t: 'title', text: 'Cm = n / V' },
        ...rect('flask', 64, 30, 20, 26, 'blue'),
        { t: 'text', x: 74, y: 28, text: '1 L', size: 's', anchor: 'middle' },
        { t: 'text', x: 74, y: 46, text: 'n mol', size: 's', anchor: 'middle', color: 'red' },
        { t: 'formula', x: 4, y: 24, text: 'Cm = n / V   (mol/L, M)' },
        { t: 'formula', x: 4, y: 36, text: 'n = Cm · V,   V = n / Cm' },
        { t: 'formula', x: 4, y: 52, text: '0,75 mol / 0,25 L = 3 M' }
      ],
      next: 'Massa berilsa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar modda massasi berilsa, avval modda miqdorini topamiz: n teng m boʻlinsin M. Tarkibida 7,3 gramm HCl boʻlgan 0,1 M eritma hajmi: n teng 7,3 boʻlinsin 36,5 — 0,2 mol, V teng 0,2 boʻlinsin 0,1 — 2 litr. Teskari: 300 mL 2 M BaCl2 uchun 0,6 mol, yaʼni 0,6 karra 208 — 124,8 gramm tuz kerak.",
      easy: "n = m/M; V = n/Cm; m = Cm·V·M.",
      draw: [
        { t: 'title', text: 'Massadan va massaga' },
        { t: 'formula', x: 4, y: 24, text: 'n(HCl) = 7,3 / 36,5 = 0,2 mol' },
        { t: 'formula', x: 4, y: 36, text: 'V = 0,2 / 0,1 = 2 L' },
        { t: 'formula', x: 4, y: 52, text: 'm(BaCl₂) = 2 · 0,3 · 208 = 124,8 g' }
      ],
      next: 'Zichlik berilsa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eritma massasi va zichligi berilsa, avval hajmni topamiz: V teng m boʻlinsin ro — mL da chiqadi, 1000 ga boʻlib litrga oʻtkazamiz. 300 gramm suvga 36,5 gramm HCl qoʻshildi, zichlik 1,12. Modda 1 mol. Eritma 336,5 gramm, hajm 336,5 boʻlinsin 1,12 — 300 mL, yaʼni 0,3 L. Cm teng 1 boʻlinsin 0,3 — 3,33 M.",
      easy: "V = m/ρ (mL → L); Cm = 1/0,3 = 3,33 M.",
      draw: [
        { t: 'title', text: 'Massa va zichlikdan' },
        { t: 'formula', x: 4, y: 24, text: 'm₂ = 300 + 36,5 = 336,5 g' },
        { t: 'formula', x: 4, y: 36, text: 'V = 336,5 / 1,12 ≈ 300 mL = 0,3 L' },
        { t: 'formula', x: 4, y: 50, text: 'Cm = 1 / 0,3 = 3,33 M' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "1,25 mol CaCl2 dan 500 mL eritma tayyorlandi. Molyar konsentratsiya: 1,25 boʻlinsin 0,5 — 2,5 M. Bu eritmaning 200 mL ida qancha CaCl2 bor? n teng 2,5 karra 0,2 — 0,5 mol, massasi 0,5 karra 111 — 55,5 gramm.",
      easy: "Cm = 2,5 M; 200 mL da 0,5 mol = 55,5 g.",
      draw: [
        { t: 'title', text: 'CaCl₂ eritmasi' },
        { t: 'formula', x: 4, y: 24, text: 'Cm = 1,25 / 0,5 = 2,5 M' },
        { t: 'formula', x: 4, y: 38, text: 'n = 2,5 · 0,2 = 0,5 mol' },
        { t: 'formula', x: 4, y: 52, text: 'm = 0,5 · 111 = 55,5 g' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Molyar konsentratsiya Cm = n/V — 1 L eritmadagi mollar soni (mol/L, M); hajm litrda olinadi.',
    'n = Cm·V, V = n/Cm; massa berilsa n = m/M.',
    'Eritma massasi va zichligi berilsa, avval V = m/ρ ni topib, litrga oʻtkazamiz.'
  ],
  questions: [
    {
      id: 'k18q1',
      prompt: '0,75 mol NH₄Cl dan 750 mL eritma tayyorlandi. Molyar konsentratsiya qancha?',
      hint: '0,75 / 0,75.',
      explanation: '1 M.',
      widget: { type: 'number_answer', props: { answer: 1, unit: 'M' } }
    },
    {
      id: 'k18q2',
      prompt: '400 mL 3 M li NaCl eritmasi uchun necha gramm NaCl kerak?',
      hint: 'n = 1,2 mol; M = 58,5.',
      explanation: '1,2 · 58,5 = 70,2 g.',
      widget: { type: 'number_answer', props: { answer: 70.2, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k18q3',
      prompt: '200 mL 1,5 M li Na₂SO₄ eritmasida necha gramm tuz bor?',
      hint: 'n = 0,3 mol; M = 142.',
      explanation: '0,3 · 142 = 42,6 g.',
      widget: { type: 'number_answer', props: { answer: 42.6, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k18q4',
      prompt: '300 g suvga 147 g H₂SO₄ qoʻshildi, eritma zichligi 1,1175 g/mL. Molyar konsentratsiya qancha?',
      hint: 'n = 1,5 mol; V = 447 / 1,1175 = 400 mL.',
      explanation: '1,5 / 0,4 = 3,75 M.',
      widget: { type: 'number_answer', props: { answer: 3.75, tolerance: 0.01, unit: 'M' } }
    },
    {
      id: 'k18q5',
      prompt: 'Tarkibida 11,7 g NaCl boʻlgan 0,5 M li eritmaning hajmi qancha?',
      hint: 'n = 0,2 mol.',
      explanation: 'V = 0,2 / 0,5 = 0,4 L.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0,2 L', '0,4 L', '2 L', '4 L'], answerIndex: 1 } }
    },
    {
      id: 'k18q6',
      prompt: '250 g suvga 80 g NaOH qoʻshildi (ρ = 1,1 g/mL). Molyar konsentratsiya qancha?',
      hint: 'n = 2 mol; V = 330 / 1,1 = 300 mL.',
      explanation: '2 / 0,3 ≈ 6,67 M.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['2 M', '6,67 M', '8 M', '0,67 M'], answerIndex: 1 } }
    },
    {
      id: 'k18q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Hajm birligi.',
      explanation: 'Molyar konsentratsiyada hajm litrda; 2 M — 1 L da 2 mol.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Molyar konsentratsiyada hajm ' },
            { blank: 'litrda' },
            { text: ' olinadi: 2 M eritmaning 1 L ida ' },
            { blank: '2 mol' },
            { text: ' modda bor.' }
          ],
          bank: ['litrda', '2 mol', 'millilitrda', '2 g']
        }
      }
    },
    {
      id: 'k18q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'V — eritma hajmi, erituvchi emas.',
      explanation: 'Cm eritma hajmiga nisbatan; 500 mL 1 M eritmada 0,5 mol.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '500 mL 1 M eritmada 0,5 mol modda bor.', value: true },
            { text: 'Molyar konsentratsiya eritma hajmiga nisbatan hisoblanadi.', value: true },
            { text: '1 mol modda 1 L suvda eritilsa, aniq 1 M eritma hosil boʻladi.', value: false },
            { text: 'Cm = V / n.', value: false }
          ]
        }
      }
    }
  ]
};
