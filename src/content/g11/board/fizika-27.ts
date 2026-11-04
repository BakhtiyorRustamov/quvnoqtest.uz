import type { BoardLesson } from './types';
import { BOB4 } from './fizika-23';
import { seg, vec } from './phys';

/** Darslik: Fizika 11, 25-mavzu (91–95-betlar) — yorugʻlik interferensiyasi va difraksiyasi, difraksion panjara. */
export const FIZ_27: BoardLesson = {
  n: 27,
  label: '25',
  group: BOB4,
  title: 'Yorugʻlik interferensiyasi va difraksiyasi',
  section: '25-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Sovun pufagi yoki asfaltga toʻkilgan moy dogʻida kamalak ranglari jilolanadi. Kompakt diskka qarasangiz ham rangli yoʻllar koʻrinadi. Bu ranglar boʻyoqdan emas — yorugʻlik toʻlqinlari bir-birini kuchaytirib yoki susaytirib hosil qiladi. Bu hodisalar interferensiya va difraksiya deyiladi.",
      easy: "Sovun pufagi va diskdagi ranglar — yorugʻlik toʻlqinlarining hodisasi.",
      draw: [
        { t: 'title', text: 'Ranglar qayerdan?' },
        { t: 'icon', x: 16, y: 34, emoji: '🧼', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '💿', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['sovun pufagi', 'moy dogʻi', 'kompakt disk'] }
      ],
      next: 'Interferensiya sharti'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻlqinlar bir-biriga xalaqit bermay tarqaladi — superpozitsiya prinsipi. Chastotalari teng va fazalar farqi oʻzgarmas toʻlqinlar kogerent deyiladi. Ikki kogerent manbadan M nuqtagacha yoʻllar farqi delta d butun toʻlqin uzunliklariga teng boʻlsa, toʻlqinlar kuchayadi — maksimum. Yarim toʻlqinlarning toq soniga teng boʻlsa, susayadi — minimum.",
      easy: "Δd = kλ — maksimum; Δd = (2k+1)λ/2 — minimum.",
      draw: [
        { t: 'title', text: 'Kuchayish va susayish' },
        { t: 'point', id: 's1', x: 10, y: 28, label: 'S₁' },
        { t: 'point', id: 's2', x: 10, y: 54, label: 'S₂' },
        { t: 'point', id: 'm', x: 54, y: 40, label: 'M' },
        ...seg('d1', 10, 28, 54, 40, 'blue'),
        ...seg('d2', 10, 54, 54, 40, 'red'),
        { t: 'text', x: 30, y: 30, text: 'd₁', color: 'blue', size: 's' },
        { t: 'text', x: 30, y: 54, text: 'd₂', color: 'red', size: 's' },
        { t: 'list', x: 62, y: 28, items: ['Δd = d₂ − d₁', 'kλ → max', '(2k+1)λ/2 → min'] }
      ],
      next: 'Yorugʻlik interferensiyasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikki alohida lampa nuri kogerent boʻlmaydi, shuning uchun bitta manba nuri ikkiga ajratiladi. Yung 1801-yilda nurni ikki tirqishdan oʻtkazib, ekranda yorugʻ va qorongʻi polosalar oldi. Yupqa plyonkada nur ustki va ostki sirtdan qaytib, uchrashadi — sovun pufagi ranglari shundan. Linza va plastina orasidagi havo qatlamida esa Nyuton halqalari koʻrinadi.",
      easy: "Yung tajribasi, yupqa plyonka ranglari, Nyuton halqalari.",
      draw: [
        { t: 'title', text: 'Interferensiyani kuzatish' },
        { t: 'list', x: 6, y: 22, items: ['Yung (1801): ikki tirqish → polosalar', 'yupqa plyonka: ikki sirtdan qaytish', 'Nyuton halqalari (qorongʻi): r = √(mλR)', 'binafsha λ ≈ 0,42 μm, qizil ≈ 0,7 μm'] }
      ],
      next: 'Difraksiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻlqinning toʻsiqni aylanib oʻtishi difraksiya deyiladi; bunda yorugʻlik toʻgʻri chiziq boʻylab tarqalmaydi. Yorqin manzara uchun difraksion panjara ishlatiladi: shaffof plastinaga olmos bilan juda koʻp parallel chiziqlar tortilgan. Tirqish va toʻsiq enlarining yigʻindisi d — panjara doimiysi. Maksimumlar sharti: d sinus fi teng n lambda.",
      easy: "Difraksion panjara: d · sin φ = n · λ.",
      draw: [
        { t: 'title', text: 'Difraksion panjara' },
        ...seg('g1', 30, 22, 30, 26, 'ink'),
        ...seg('g2', 30, 29, 30, 33, 'ink'),
        ...seg('g3', 30, 36, 30, 40, 'ink'),
        ...seg('g4', 30, 43, 30, 47, 'ink'),
        ...seg('g5', 30, 50, 30, 54, 'ink'),
        ...vec('i1', 8, 31, 29, 31, 'red'),
        ...vec('i2', 8, 45, 29, 45, 'red'),
        ...vec('o0', 31, 38, 52, 38, 'orange'),
        ...vec('o1', 31, 38, 50, 26, 'orange'),
        ...vec('o2', 31, 38, 50, 50, 'orange'),
        { t: 'text', x: 38, y: 34, text: 'φ', size: 's' },
        { t: 'formula', x: 58, y: 34, text: 'd sin φ = n λ' },
        { t: 'text', x: 58, y: 50, text: 'd — panjara doimiysi', size: 's', color: 'purple' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Panjaraga 500 nanometrli nur tushmoqda, ikkinchi tartibli spektr 30 gradus burchak ostida koʻrindi. Panjara doimiysi: d teng n lambda boʻlinsin sinus fi — 2 karra 500 karra 10 ning minus 9 darajasi boʻlinsin 0,5, yaʼni 2 mikrometr.",
      easy: "d = nλ / sin φ = 2 · 500 nm / 0,5 = 2 μm.",
      draw: [
        { t: 'title', text: 'Panjara doimiysi' },
        { t: 'list', x: 6, y: 20, items: ['λ = 500 nm, n = 2', 'φ = 30°, sin 30° = 0,5'] },
        { t: 'formula', x: 6, y: 46, text: 'd = n λ / sin φ = 2 · 10⁻⁶ m' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Kogerent toʻlqinlarning uchrashib kuchayishi yoki susayishi — interferensiya: Δd = kλ (max), Δd = (2k+1)λ/2 (min).',
    'Yorugʻlik interferensiyasi: Yung tajribasi, yupqa plyonka ranglari, Nyuton halqalari.',
    'Toʻlqinning toʻsiqni aylanib oʻtishi — difraksiya; difraksion panjara: d·sin φ = n·λ.'
  ],
  questions: [
    {
      id: 'f27q1',
      prompt: '1 mm da 1000 ta shtrixi bor panjaraning doimiysi necha μm?',
      hint: 'd = 1 mm / 1000.',
      explanation: '10⁻³ / 1000 = 10⁻⁶ m = 1 μm.',
      widget: { type: 'number_answer', props: { answer: 1, unit: 'μm' } }
    },
    {
      id: 'f27q2',
      prompt: 'd = 2 μm panjarada birinchi tartibli maksimum 15° da koʻrindi. Toʻlqin uzunligi necha nm? (butun songacha)',
      hint: 'λ = d sin φ / n, sin 15° ≈ 0,259.',
      explanation: '2000 nm · 0,259 ≈ 518 nm.',
      widget: { type: 'number_answer', props: { answer: 518, tolerance: 2, unit: 'nm' } }
    },
    {
      id: 'f27q3',
      prompt: 'd = 1,1 μm panjaraga λ = 0,5 μm nur normal tushmoqda. Jami nechta maksimum kuzatiladi?',
      hint: 'sin φ ≤ 1 → n ≤ d/λ; ikki tomon va markaz.',
      explanation: 'd/λ = 2,2 → n = 0, ±1, ±2: jami 5 ta.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'f27q4',
      prompt: 'Nyuton halqalari: R = 5 m, λ = 400 nm, 4-halqa (r = √(mλR)). Radius necha mm? (0,01 gacha)',
      hint: 'r = √(4 · 4·10⁻⁷ · 5).',
      explanation: '√(8·10⁻⁶) ≈ 2,83·10⁻³ m.',
      widget: { type: 'number_answer', props: { answer: 2.83, tolerance: 0.03, unit: 'mm' } }
    },
    {
      id: 'f27q5',
      prompt: 'Yoʻl farqi 3,5λ ga teng. Bu nuqtada nima kuzatiladi?',
      hint: '3,5λ = 7 · λ/2.',
      explanation: 'Yarim toʻlqinlarning toq soni — minimum (susayish).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['maksimum', 'minimum', 'oʻzgarmaydi', 'ikki baravar kuchayish'], answerIndex: 1 } }
    },
    {
      id: 'f27q6',
      prompt: 'Nega bir xil ikkita lampa nuri interferensiya bermaydi?',
      hint: 'Kogerentlik sharti.',
      explanation: 'Ular kogerent emas — fazalar farqi tinmay oʻzgaradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Quvvati kichik', 'Kogerent emas', 'Rangi har xil', 'Ular juda uzoq'], answerIndex: 1 } }
    },
    {
      id: 'f27q7',
      prompt: 'Hodisalarni guruhlang.',
      hint: 'Toʻsiqni aylanib oʻtish — difraksiya.',
      explanation: 'Sovun pufagi, Nyuton halqalari, Yung polosalari — interferensiya; soya chetining xiraligi, panjara spektri — difraksiya.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'i', label: 'Interferensiya' },
            { id: 'd', label: 'Difraksiya' }
          ],
          items: [
            { emoji: '', label: 'sovun pufagi ranglari', bin: 'i' },
            { emoji: '', label: 'Nyuton halqalari', bin: 'i' },
            { emoji: '', label: 'nurning toʻsiqni aylanib oʻtishi', bin: 'd' },
            { emoji: '', label: 'soya chetining xira boʻlishi', bin: 'd' }
          ]
        }
      }
    },
    {
      id: 'f27q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Interferensiya — toʻlqin xossasi.',
      explanation: 'Interferensiya va difraksiya yorugʻlikning toʻlqin tabiatini tasdiqlaydi; kogerent manba bitta nurni ikkiga boʻlib olinadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Interferensiya va difraksiya yorugʻlikning toʻlqin tabiatini tasdiqlaydi.', value: true },
            { text: 'Kogerent nurlarni bitta manba nurini ikkiga boʻlib olish mumkin.', value: true },
            { text: 'Difraksiyada yorugʻlik qatʼiy toʻgʻri chiziq boʻylab tarqaladi.', value: false },
            { text: 'Yoʻl farqi butun toʻlqin uzunliklariga teng boʻlsa, minimum boʻladi.', value: false }
          ]
        }
      }
    }
  ]
};
