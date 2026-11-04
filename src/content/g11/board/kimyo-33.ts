import type { BoardLesson } from './types';
import { BOB8 } from './kimyo-31';

/** Darslik: Umumiy kimyo 11, 33-mavzu (149–154-betlar) — elektrolizga oid masalalar: tuz tugagach suv elektrolizi, aralashmalar, ionlarning zaryadsizlanish tartibi. */
export const KIM_33: BoardLesson = {
  n: 33,
  label: '33',
  group: BOB8,
  title: 'Elektrolizga oid masalalar',
  section: '33-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Murakkab elektroliz masalalarida ikkita savolga javob kerak: tok tuzga yetadimi yoki ortib qoladimi? Eritmada bir nechta metall boʻlsa, qaysi biri birinchi ajraladi? Ikkalasini ham ekvivalentlar hisobi hal qiladi.",
      easy: "Tok tuzga yetadimi? Qaysi metall birinchi?",
      draw: [
        { t: 'title', text: 'Ikki savol' },
        { t: 'icon', x: 16, y: 40, emoji: '🔋', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['tok ortsa — suv parchalanadi', 'passivroq metall — birinchi', 'n(ekv) = I · t / 96500'] }
      ],
      next: 'Tok ortib qolsa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Birinchi idishda 1 mol, ikkinchisida 2 mol CuSO₄; har biridan 4 faradey tok oʻtdi. 1 mol CuSO₄ uchun 2 F kerak: 64 gramm mis, qolgan 2 F suvni parchalab, katodda 2 gramm vodorod beradi — jami 66 gramm. Ikkinchi idishda 4 F toʻliq misga ketadi: 128 gramm.",
      easy: "1-idish: 64 g Cu + 2 g H₂ = 66 g; 2-idish: 128 g Cu.",
      draw: [
        { t: 'title', text: 'Tok ortib qolsa' },
        { t: 'table', x: 4, y: 20, rows: [['idish', 'CuSO₄', 'katodda'], ['1', '1 mol (2 F)', '64 g Cu + 2 g H₂'], ['2', '2 mol (4 F)', '128 g Cu']] },
        { t: 'text', x: 4, y: 54, text: 'tuz tugagach — suv elektrolizi', color: 'purple' }
      ],
      next: 'Aralashma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "73,3 gramm Na₂SO₄ va CdSO₄ aralashmasi eritildi; kadmiyni toʻliq ajratish uchun 2 amper tok 24125 sekund oʻtdi. Ekvivalent: 2 karra 24125 boʻlinsin 96500 — 0,5. Kadmiy: 0,5 karra 56 — 28 gramm, ya'ni 0,25 mol, CdSO₄ 52 gramm. Natriy sulfat elektrolizda ishtirok etmaydi: 73,3 minus 52 — 21,3 gramm.",
      easy: "0,5 ekv → Cd 28 g → CdSO₄ 52 g; Na₂SO₄ 21,3 g.",
      draw: [
        { t: 'title', text: 'Na₂SO₄ + CdSO₄' },
        { t: 'formula', x: 4, y: 22, text: 'n(ekv) = 2 · 24125 / 96500 = 0,5' },
        { t: 'formula', x: 4, y: 34, text: 'm(Cd) = 0,5 · 56 = 28 g → CdSO₄ 52 g' },
        { t: 'formula', x: 4, y: 46, text: 'm(Na₂SO₄) = 73,3 − 52 = 21,3 g' }
      ],
      next: 'Qaysi biri birinchi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eritmada Cu(NO₃)₂ va AgNO₃ boʻlsa, aktivlik qatorida oʻngroqda turgan kumush birinchi ajraladi, keyin mis. 300 ml 0,1 M AgNO₃ — 0,03 ekvivalent; 200 ml 0,1 M Cu(NO₃)₂ — 0,04 ekvivalent. 4 amper 965 sekund — 0,04 ekvivalent: 0,03 si kumushga, 0,01 i misga ketadi. Mis nitratdan 0,005 mol, ya'ni 0,94 gramm parchalanib, 2,82 gramm qoladi.",
      easy: "Avval Ag (0,03 ekv), keyin Cu (0,01 ekv); qoladi 2,82 g Cu(NO₃)₂.",
      draw: [
        { t: 'title', text: 'Avval kumush, keyin mis' },
        { t: 'formula', x: 4, y: 22, text: 'n(ekv) = 4 · 965 / 96500 = 0,04' },
        { t: 'list', x: 4, y: 32, items: ['Ag: 0,03 ekv (hammasi)', 'Cu: 0,04 − 0,03 = 0,01 ekv'] },
        { t: 'formula', x: 4, y: 56, text: 'Cu(NO₃)₂: 3,76 − 0,94 = 2,82 g qoladi' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "100 ml Cu(NO₃)₂ va AgNO₃ eritmasidan 0,8 amper 4825 sekund oʻtdi, 2,04 gramm metall ajraldi. Ekvivalent 0,04. Kumush x ekvivalent boʻlsin: 108x qoʻshuv 32 karra 0,04 minus x teng 2,04. 76x teng 0,76, x teng 0,01. Kumush 0,01 mol — 0,1 M; mis 0,03 ekvivalent — 0,015 mol, 0,15 M.",
      easy: "108x + 32(0,04 − x) = 2,04 → x = 0,01: AgNO₃ 0,1 M, Cu(NO₃)₂ 0,15 M.",
      draw: [
        { t: 'title', text: 'Ikki metall aralashmasi' },
        { t: 'formula', x: 4, y: 22, text: 'n(ekv) = 0,8 · 4825 / 96500 = 0,04' },
        { t: 'formula', x: 4, y: 34, text: '108x + 32(0,04 − x) = 2,04' },
        { t: 'formula', x: 4, y: 46, text: 'x = 0,01 → AgNO₃ 0,1 M' },
        { t: 'formula', x: 4, y: 58, text: 'Cu: 0,03 ekv = 0,015 mol → 0,15 M' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Tuz tugagach qolgan tok suvni parchalaydi: katodda vodorod ham ajraladi.',
    'Aralashmada elektrolizda qatnashmaydigan tuz (Na₂SO₄, K₂SO₄) massasi ayirma orqali topiladi.',
    'Bir nechta metall boʻlsa, aktivlik qatorida oʻngroqdagi (passivroq) metall birinchi ajraladi.'
  ],
  questions: [
    {
      id: 'k33q1',
      prompt: '2 mol CuSO₄ boʻlgan eritma orqali 6 F tok oʻtdi. Katodda jami necha gramm modda ajraladi?',
      hint: '4 F — mis, 2 F — vodorod.',
      explanation: '128 g Cu + 2 g H₂ = 130 g.',
      widget: { type: 'number_answer', props: { answer: 130, unit: 'g' } }
    },
    {
      id: 'k33q2',
      prompt: '2 mol AgNO₃ boʻlgan eritma orqali 4 F tok oʻtdi. Katodda jami necha gramm modda ajraladi?',
      hint: '2 F — kumush, 2 F — vodorod.',
      explanation: '216 g Ag + 2 g H₂ = 218 g.',
      widget: { type: 'number_answer', props: { answer: 218, unit: 'g' } }
    },
    {
      id: 'k33q3',
      prompt: '107 g K₂SO₄ va CuSO₄ aralashmasi eritildi; misni toʻliq ajratish uchun 5 A tok 4825 s oʻtdi. K₂SO₄ massasi necha gramm?',
      hint: '0,25 ekv → CuSO₄ 20 g.',
      explanation: '107 − 20 = 87 g.',
      widget: { type: 'number_answer', props: { answer: 87, unit: 'g' } }
    },
    {
      id: 'k33q4',
      prompt: '68,75 g Na₂SO₄ va AgNO₃ aralashmasi eritildi; kumushni toʻliq ajratish uchun 3 A tok 9650 s oʻtdi. Na₂SO₄ massasi necha gramm?',
      hint: '0,3 ekv → AgNO₃ 51 g.',
      explanation: '68,75 − 51 = 17,75 g.',
      widget: { type: 'number_answer', props: { answer: 17.75, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k33q5',
      prompt: '500 ml 0,1 M Cd(NO₃)₂ va 200 ml 0,5 M AgNO₃ aralashmasidan 5 A tok 2895 s oʻtdi. Eritmada qolgan tuz massasi necha gramm? (M(Cd(NO₃)₂) = 236)',
      hint: '0,15 ekv: 0,1 — Ag, 0,05 — Cd.',
      explanation: 'Cd(NO₃)₂ 0,05 − 0,025 = 0,025 mol · 236 = 5,9 g.',
      widget: { type: 'number_answer', props: { answer: 5.9, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k33q6',
      prompt: 'Cu(NO₃)₂, AgNO₃ va Zn(NO₃)₂ aralashmasi elektrolizida metallar qaysi tartibda ajraladi?',
      hint: 'Passivroq — birinchi.',
      explanation: 'Ag → Cu → Zn.',
      widget: { type: 'order_line', props: { items: [{ label: 'Ag' }, { label: 'Cu' }, { label: 'Zn' }] } }
    },
    {
      id: 'k33q7',
      prompt: 'CdSO₄ va AgNO₃ boʻlgan 500 ml eritmadan 5 A tok 15440 s oʻtib, jami 70,8 g metall ajraldi. AgNO₃ konsentratsiyasi necha mol/L?',
      hint: '0,8 ekv: 108x + 56(0,8 − x) = 70,8.',
      explanation: 'x = 0,5 mol Ag → 0,5 / 0,5 L = 1 M (CdSO₄ — 0,3 M).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0,3 M', '0,5 M', '1 M', '2 M'], answerIndex: 2 } }
    },
    {
      id: 'k33q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Na₂SO₄ eritmasida faqat suv parchalanadi.',
      explanation: 'Na₂SO₄ tuzi parchalanmaydi; tuz tugagach suv elektrolizi boshlanadi; kumush misdan oldin ajraladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'CuSO₄ tugagach, katodda vodorod ajrala boshlaydi.', value: true },
            { text: 'Kumush misdan oldin ajraladi.', value: true },
            { text: 'Na₂SO₄ elektrolizda parchalanib, natriy ajraladi.', value: false },
            { text: 'Aralashmada aktivroq metall birinchi ajraladi.', value: false }
          ]
        }
      }
    }
  ]
};
