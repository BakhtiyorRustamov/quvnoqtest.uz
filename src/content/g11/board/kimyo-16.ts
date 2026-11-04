import type { BoardLesson } from './types';
import { BOB4 } from './kimyo-12';
import { block } from './chem';

/** Darslik: Umumiy kimyo 11, 16-mavzu (77–84-betlar) — foiz konsentratsiyaga doir masalalar: suv bilan reaksiyaga kirishadigan moddalar, eritmalarni aralashtirish, choʻkma hosil boʻlishi. */
export const KIM_16: BoardLesson = {
  n: 16,
  label: '16',
  group: BOB4,
  title: 'Foiz konsentratsiyaga doir masalalar',
  section: '16-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Natriy boʻlakchasi suvga tushsa, shoʻngʻib, vishillab yuguradi va eriydi. Lekin eritmada endi natriy emas, NaOH bor, vodorod esa havoga uchib ketgan. Bunday masalalarda erigan modda va eritma massasini toʻgʻri topish — asosiy hiyla.",
      easy: "Suv bilan reaksiyaga kirsa — eritmada yangi modda; gaz va choʻkma eritmadan chiqadi.",
      draw: [
        { t: 'title', text: 'Natriy suvda' },
        { t: 'icon', x: 16, y: 34, emoji: '💥', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🧪', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['2Na + 2H₂O → 2NaOH + H₂↑', 'eritmada — NaOH', 'H₂ — eritmadan chiqadi'] }
      ],
      next: 'Suv bilan reaksiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Suv bilan reaksiyaga kirishadigan moddalar — Na, K, Na2O, K2O, SO2, SO3 — suvga solinsa, konsentratsiya hosil boʻlgan yangi modda boʻyicha hisoblanadi. 31 gramm Na2O 69 gramm suvga tushsa: 62 gramm Na2O dan 80 gramm NaOH, demak 31 grammdan 40 gramm. Eritma 100 gramm — 40 foizli NaOH.",
      easy: "Na₂O + H₂O → 2NaOH; konsentratsiya NaOH boʻyicha: 40 %.",
      draw: [
        { t: 'title', text: 'Oksid suvda' },
        { t: 'formula', x: 4, y: 24, text: 'Na₂O + H₂O → 2NaOH' },
        { t: 'formula', x: 4, y: 36, text: '62 g → 80 g;  31 g → 40 g' },
        { t: 'formula', x: 4, y: 50, text: 'C% = 40 / (31 + 69) · 100 = 40 %' }
      ],
      next: 'Gaz chiqsa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar gaz chiqsa, uni eritma massasidan ayiramiz. 58,5 gramm kaliy 100 gramm suvga tushdi: 2K qoʻshuv 2H2O — 2KOH va H2. 78 gramm kaliydan 112 gramm KOH va 2 gramm vodorod. 58,5 grammdan 84 gramm KOH va 1,5 gramm H2. Eritma: 100 qoʻshuv 58,5 minus 1,5 — 157 gramm. Konsentratsiya: 84 boʻlinsin 157 — 53,5 foiz.",
      easy: "m(eritma) = m(suv) + m(K) − m(H₂) = 157 g; C% = 84/157 = 53,5 %.",
      draw: [
        { t: 'title', text: 'Gaz ajralsa' },
        { t: 'formula', x: 4, y: 22, text: '2K + 2H₂O → 2KOH + H₂↑' },
        { t: 'formula', x: 4, y: 34, text: '58,5 g K → 84 g KOH + 1,5 g H₂' },
        { t: 'formula', x: 4, y: 46, text: 'm₂ = 100 + 58,5 − 1,5 = 157 g' },
        { t: 'formula', x: 4, y: 58, text: 'C% = 84 / 157 · 100 = 53,5 %' }
      ],
      next: 'Aralashtirish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bir moddaning ikki eritmasi aralashtirilsa, modda massalari ham, eritma massalari ham qoʻshiladi. 200 gramm 5 foizli va 500 gramm 20 foizli NaCl: tuz 10 qoʻshuv 100 — 110 gramm, eritma 700 gramm. Yangi konsentratsiya: 110 boʻlinsin 700 — 15,7 foiz.",
      easy: "C% = (m₁ + m₂ modda) / (eritmalar yigʻindisi) · 100.",
      draw: [
        { t: 'title', text: 'Eritmalarni aralashtirish' },
        ...block('a', 4, 22, 26, '200 g, 5 %', 'blue'),
        { t: 'text', x: 34, y: 28, text: '+', anchor: 'middle' },
        ...block('b', 38, 22, 26, '500 g, 20 %', 'blue'),
        { t: 'text', x: 68, y: 28, text: '=', anchor: 'middle' },
        ...block('c', 72, 22, 24, '700 g, ?', 'purple'),
        { t: 'formula', x: 4, y: 46, text: 'tuz: 10 + 100 = 110 g' },
        { t: 'formula', x: 4, y: 58, text: 'C% = 110 / 700 · 100 = 15,7 %' }
      ],
      next: 'Choʻkma hosil boʻlsa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar aralashtirilgan moddalar reaksiyaga kirishib choʻkma bersa, choʻkma massasi eritmadan ayiriladi. 416 gramm 20 foizli BaCl2 — 0,4 mol, 568 gramm 10 foizli Na2SO4 — 0,4 mol. Hosil boʻladi: 0,4 mol BaSO4 choʻkma — 93,2 gramm va 0,8 mol NaCl — 46,8 gramm. Eritma: 416 qoʻshuv 568 minus 93,2 — 890,8 gramm. NaCl: 46,8 boʻlinsin 890,8 — 5,25 foiz.",
      easy: "BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl; m₂ = 984 − 93,2 = 890,8 g; C% = 5,25 %.",
      draw: [
        { t: 'title', text: 'Choʻkma eritmadan chiqadi' },
        { t: 'formula', x: 4, y: 22, text: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl' },
        { t: 'list', x: 4, y: 32, items: ['0,4 mol + 0,4 mol', 'BaSO₄: 0,4 · 233 = 93,2 g ↓', 'NaCl: 0,8 · 58,5 = 46,8 g'] },
        { t: 'formula', x: 4, y: 58, text: 'C% = 46,8 / 890,8 · 100 = 5,25 %' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "5,6 litr SO2 normal sharoitda 200 gramm suvga yuttirildi. 5,6 boʻlinsin 22,4 — 0,25 mol, yaʼni 16 gramm SO2. SO2 qoʻshuv H2O — H2SO3: 0,25 mol, 20,5 gramm. Eritma: 200 qoʻshuv 16 — 216 gramm. Konsentratsiya: 20,5 boʻlinsin 216 — taxminan 9,5 foiz.",
      easy: "H₂SO₃: 20,5 g; m₂ = 216 g; C% ≈ 9,5 %.",
      draw: [
        { t: 'title', text: 'Gaz suvga yuttirilsa' },
        { t: 'formula', x: 4, y: 24, text: 'n(SO₂) = 5,6 / 22,4 = 0,25 mol = 16 g' },
        { t: 'formula', x: 4, y: 38, text: 'SO₂ + H₂O → H₂SO₃ (20,5 g)' },
        { t: 'formula', x: 4, y: 52, text: 'C% = 20,5 / 216 · 100 ≈ 9,5 %' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Suv bilan reaksiyaga kirishadigan moddalar (Na, K, Na₂O, SO₂…) uchun konsentratsiya hosil boʻlgan modda boʻyicha hisoblanadi.',
    'Ajralgan gaz va choʻkma massasi eritma massasidan ayiriladi.',
    'Bir modda eritmalari aralashtirilsa, modda massalari va eritma massalari alohida qoʻshiladi.'
  ],
  questions: [
    {
      id: 'k16q1',
      prompt: '200 g 10 % li va 300 g 20 % li NaNO₃ eritmalari aralashtirildi. Hosil boʻlgan eritma konsentratsiyasi necha foiz?',
      hint: 'Tuz: 20 + 60.',
      explanation: '80 / 500 · 100 = 16 %.',
      widget: { type: 'number_answer', props: { answer: 16, unit: '%' } }
    },
    {
      id: 'k16q2',
      prompt: '23,5 g K₂O 126,5 g suvga tushirildi. Hosil boʻlgan KOH eritmasi necha foizli? (0,01 gacha)',
      hint: 'K₂O + H₂O → 2KOH; 0,25 mol K₂O → 0,5 mol KOH.',
      explanation: 'KOH 28 g; eritma 150 g; 28/150 = 18,67 %.',
      widget: { type: 'number_answer', props: { answer: 18.67, tolerance: 0.02, unit: '%' } }
    },
    {
      id: 'k16q3',
      prompt: '100 g suvga 46 g natriy qoʻshildi. NaOH eritmasi necha foizli? (0,01 gacha)',
      hint: '2 mol Na → 80 g NaOH va 2 g H₂.',
      explanation: 'Eritma 100 + 46 − 2 = 144 g; 80/144 = 55,56 %.',
      widget: { type: 'number_answer', props: { answer: 55.56, tolerance: 0.02, unit: '%' } }
    },
    {
      id: 'k16q4',
      prompt: '150 g 40 % li va 250 g 30 % li NH₄NO₃ eritmalari aralashtirildi. Konsentratsiya necha foiz? (0,01 gacha)',
      hint: '60 + 75.',
      explanation: '135 / 400 = 33,75 %.',
      widget: { type: 'number_answer', props: { answer: 33.75, tolerance: 0.01, unit: '%' } }
    },
    {
      id: 'k16q5',
      prompt: 'Kaliy suvga tushganda eritma massasi qanday hisoblanadi?',
      hint: 'Vodorod uchib ketadi.',
      explanation: 'm(suv) + m(K) − m(H₂).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['m(suv) + m(K)', 'm(suv) + m(K) − m(H₂)', 'm(suv) − m(K)', 'm(KOH) + m(H₂)'], answerIndex: 1 } }
    },
    {
      id: 'k16q6',
      prompt: '520 g 10 % li BaCl₂ va 710 g 5 % li Na₂SO₄ aralashtirildi. Hosil boʻlgan NaCl eritmasi taxminan necha foizli?',
      hint: 'Ikkalasi 0,25 mol; BaSO₄ 58,25 g choʻkadi.',
      explanation: 'NaCl 0,5 mol = 29,25 g; eritma 1230 − 58,25 = 1171,75 g; ≈ 2,5 %.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['≈ 2,4 %', '≈ 2,5 %', '≈ 5 %', '≈ 7,5 %'], answerIndex: 1 } }
    },
    {
      id: 'k16q7',
      prompt: 'Holatni eritma massasini topish usuli bilan juftlang.',
      hint: 'Gaz va choʻkma eritmaga kirmaydi.',
      explanation: 'Gaz ajralsa — gaz massasi ayiriladi; choʻkma tushsa — choʻkma ayiriladi; ikki eritma aralashsa — massalar qoʻshiladi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'gaz ajraladi', right: 'gaz massasi ayiriladi' },
            { left: 'choʻkma tushadi', right: 'choʻkma massasi ayiriladi' },
            { left: 'ikki eritma aralashadi', right: 'massalar qoʻshiladi' }
          ]
        }
      }
    },
    {
      id: 'k16q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'SO₃ suvda H₂SO₄ ga aylanadi.',
      explanation: 'SO₃ eritmasida erigan modda H₂SO₄; aralashtirilganda konsentratsiyalar shunchaki qoʻshilmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'SO₃ suvga yuttirilsa, konsentratsiya H₂SO₄ boʻyicha hisoblanadi.', value: true },
            { text: 'Choʻkma eritma tarkibiga kirmaydi.', value: true },
            { text: '10 % li va 20 % li eritma aralashsa, har doim 30 % li eritma hosil boʻladi.', value: false },
            { text: 'Natriy suvda erisa, eritmada erigan modda — natriy.', value: false }
          ]
        }
      }
    }
  ]
};
