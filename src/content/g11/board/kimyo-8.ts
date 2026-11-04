import type { BoardLesson } from './types';
import { BOB2 } from './kimyo-5';
import { wave } from './phys';

/** Darslik: Umumiy kimyo 11, 8-mavzu (45–51-betlar) — normal sharoit, Mendeleyev–Klapeyron tenglamasi PV = nRT, R qiymatlari, masalalar. */
export const KIM_8: BoardLesson = {
  n: 8,
  label: '8',
  group: BOB2,
  title: 'Mendeleyev–Klapeyron tenglamasi',
  section: '8-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Qishda avtomobil shinasidagi bosim pasayib qoladi, yozda esa oshadi — havo qoʻshmasangiz ham. Issiq kunda shishirilgan shar yorilib ketishi mumkin. Gaz bosimi, hajmi va harorati bir-biri bilan bogʻliq. Bu bogʻlanishni bitta tenglama ifodalaydi.",
      easy: "Gazning bosimi, hajmi va harorati bogʻliq.",
      draw: [
        { t: 'title', text: 'Shina qishda va yozda' },
        { t: 'icon', x: 16, y: 34, emoji: '🚗', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🎈', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['sovuqda — bosim pasayadi', 'issiqda — bosim oshadi', 'P, V va T bogʻliq'] }
      ],
      next: 'Normal sharoit'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Normal sharoit — harorat 0 gradus Selsiy, yaʼni 273 kelvin, bosim 101,325 kilopaskal, yaʼni 1 atmosfera yoki 760 millimetr simob ustuni. Shu sharoitda 1 mol gaz 22,4 litr egallaydi. Lekin reaksiyalar har doim normal sharoitda bormaydi. Boshqa sharoitlar uchun ideal gaz tenglamasi — Mendeleyev–Klapeyron tenglamasi kerak.",
      easy: "N.sh.: 273 K, 101,325 kPa = 1 atm = 760 mm sim. ust.",
      draw: [
        { t: 'title', text: 'Normal sharoit' },
        { t: 'list', x: 4, y: 22, items: ['T = 0 °C = 273 K', 'P = 101,325 kPa = 1 atm = 760 mm sim. ust.', 'Vm = 22,4 L/mol'] },
        { t: 'formula', x: 4, y: 52, text: 'T (K) = t (°C) + 273' }
      ],
      next: 'Tenglama'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Mendeleyev–Klapeyron tenglamasi: P karra V teng n karra R karra T. Bosim kilopaskalda va hajm litrda boʻlsa, R teng 8,31. Bosim atmosferada boʻlsa, R teng 0,082. Harorat doim kelvinda olinadi. Modda miqdori n teng m boʻlinsin M boʻlgani uchun tenglamani P karra V karra M teng m karra R karra T koʻrinishida ham yozish mumkin.",
      easy: "PV = nRT; R = 8,31 (kPa·L) yoki 0,082 (atm·L); T — kelvinda.",
      draw: [
        { t: 'title', text: 'PV = nRT' },
        { t: 'formula', x: 4, y: 24, text: 'P V = n R T' },
        { t: 'formula', x: 4, y: 36, text: 'P V M = m R T' },
        { t: 'table', x: 4, y: 46, rows: [['P', 'V', 'R'], ['kPa', 'L', '8,31'], ['atm', 'L', '0,082']] },
        { t: 'axes', id: 'g', x: 56, y: 20, w: 38, h: 40, xmin: 0, xmax: 10, ymin: 0, ymax: 10, xlabel: 'V', ylabel: 'P' },
        { t: 'curve', axes: 'g', points: wave((v) => 8 / v, 0.85, 10, 50), color: 'red' },
        { t: 'text', x: 70, y: 66, text: 'T = const: P·V = const', size: 's', anchor: 'middle', color: 'red' }
      ],
      next: 'Nomaʼlum gaz'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tenglama nomaʼlum gazni aniqlashga ham yordam beradi. 207,75 kilopaskal bosim va 27 gradusda 42,5 gramm gaz 30 litr egallaydi. Avval modda miqdorini topamiz: n teng P V boʻlinsin R T — 207,75 karra 30 boʻlinsin 8,31 karra 300, yaʼni 2,5 mol. Molyar massa: 42,5 boʻlinsin 2,5 teng 17 g/mol. Bu ammiak NH3.",
      easy: "n = PV/RT = 2,5 mol; M = 42,5/2,5 = 17 → NH₃.",
      draw: [
        { t: 'title', text: 'Nomaʼlum gazni topamiz' },
        { t: 'list', x: 4, y: 20, items: ['P = 207,75 kPa, t = 27 °C, V = 30 L', 'm = 42,5 g'] },
        { t: 'formula', x: 4, y: 44, text: 'n = 207,75·30 / (8,31·300) = 2,5 mol' },
        { t: 'formula', x: 4, y: 56, text: 'M = 42,5 / 2,5 = 17 → NH₃' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "166,2 kilopaskal bosim va minus 73 gradusda 12,8 gramm kislorod qancha hajm egallaydi? Modda miqdori: 12,8 boʻlinsin 32 — 0,4 mol. Harorat: minus 73 qoʻshuv 273 — 200 kelvin. Hajm: V teng n R T boʻlinsin P — 0,4 karra 8,31 karra 200 boʻlinsin 166,2, yaʼni 4 litr.",
      easy: "n = 0,4 mol, T = 200 K, V = nRT/P = 4 L.",
      draw: [
        { t: 'title', text: 'Kislorod hajmi' },
        { t: 'list', x: 4, y: 20, items: ['n = 12,8 / 32 = 0,4 mol', 'T = −73 + 273 = 200 K'] },
        { t: 'formula', x: 4, y: 46, text: 'V = n R T / P = 0,4·8,31·200 / 166,2 = 4 L' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Normal sharoit: 273 K va 101,325 kPa (1 atm, 760 mm sim. ust.); T = t + 273.',
    'Mendeleyev–Klapeyron tenglamasi PV = nRT (yoki PVM = mRT); R = 8,31 (kPa·L) yoki 0,082 (atm·L).',
    'Tenglama orqali har qanday sharoitda hajm, bosim, harorat va nomaʼlum gazning molyar massasi topiladi.'
  ],
  questions: [
    {
      id: 'k8q1',
      prompt: '47 °C da 14 g is gazi CO 10 L hajmni egallashi uchun bosim necha kPa boʻlishi kerak? (0,1 gacha)',
      hint: 'n = 0,5 mol, T = 320 K, P = nRT/V.',
      explanation: '0,5 · 8,31 · 320 / 10 = 132,96 kPa.',
      widget: { type: 'number_answer', props: { answer: 132.96, tolerance: 0.1, unit: 'kPa' } }
    },
    {
      id: 'k8q2',
      prompt: '2 atm bosimda 1 mol CO₂ 12,3 L hajmni egallaydi. Harorat necha °C? (R = 0,082)',
      hint: 'T = PV / nR.',
      explanation: 'T = 2 · 12,3 / 0,082 = 300 K = 27 °C.',
      widget: { type: 'number_answer', props: { answer: 27, tolerance: 1, unit: '°C' } }
    },
    {
      id: 'k8q3',
      prompt: '300 kPa va 27 °C da 33,24 L vodorodda nechta molekula bor? (·10²³ ta)',
      hint: 'n = PV / RT.',
      explanation: 'n = 300·33,24 / (8,31·300) = 4 mol; 4 · 6,02·10²³ = 24,08·10²³.',
      widget: { type: 'number_answer', props: { answer: 24.08, tolerance: 0.05, unit: '·10²³ ta' } }
    },
    {
      id: 'k8q4',
      prompt: '30 °C da 4 g neon 5 L hajmni egallaydi. Bosim necha kPa? (butun songacha)',
      hint: 'n = 4/20 = 0,2 mol; T = 303 K.',
      explanation: '0,2 · 8,31 · 303 / 5 ≈ 100,7 kPa.',
      widget: { type: 'number_answer', props: { answer: 100.7, tolerance: 0.6, unit: 'kPa' } }
    },
    {
      id: 'k8q5',
      prompt: '166,2 kPa va 27 °C da 4 g nomaʼlum gaz 3,75 L hajmni egallaydi. Bu qaysi gaz?',
      hint: 'n = PV/RT, M = m/n.',
      explanation: 'n = 166,2·3,75 / (8,31·300) = 0,25 mol; M = 4/0,25 = 16 — metan CH₄.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['CH₄', 'NH₃', 'O₂', 'CO₂'], answerIndex: 0 } }
    },
    {
      id: 'k8q6',
      prompt: 'Bosim birligini mos R qiymati bilan juftlang.',
      hint: '8,31 : 101,325 ≈ 0,082.',
      explanation: 'kPa — 8,31; atm — 0,082; mm sim. ust. avval atm ga oʻtkaziladi (760 mm = 1 atm).',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'kPa', right: 'R = 8,31' },
            { left: 'atm', right: 'R = 0,082' },
            { left: '760 mm sim. ust.', right: '1 atm' }
          ]
        }
      }
    },
    {
      id: 'k8q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Kelvin shkalasi.',
      explanation: 'Tenglamada harorat kelvinda: T = t + 273; 27 °C = 300 K.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Tenglamada harorat ' },
            { blank: 'kelvinda' },
            { text: ' olinadi: 27 °C = ' },
            { blank: '300 K' },
            { text: '.' }
          ],
          bank: ['kelvinda', '300 K', 'selsiyda', '246 K']
        }
      }
    },
    {
      id: 'k8q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'T = const da P·V = const.',
      explanation: 'Oʻzgarmas haroratda bosim oshsa hajm kamayadi; normal sharoit 273 K; 1 atm = 101,325 kPa.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻzgarmas haroratda gaz bosimi oshsa, hajmi kamayadi.', value: true },
            { text: '1 atm = 101,325 kPa = 760 mm simob ustuni.', value: true },
            { text: 'PV = nRT tenglamasida haroratni Selsiyda olish kerak.', value: false },
            { text: 'Normal sharoitda harorat 25 °C.', value: false }
          ]
        }
      }
    }
  ]
};
