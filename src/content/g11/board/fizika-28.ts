import type { BoardLesson } from './types';
import { BOB4 } from './fizika-23';
import { seg, vec } from './phys';

/** Darslik: Fizika 11, 26-mavzu (96–97-betlar) — laboratoriya ishi: difraksion panjara yordamida yorugʻlik toʻlqin uzunligini aniqlash (namuna oʻlchashlar bilan). */
export const FIZ_28: BoardLesson = {
  n: 28,
  label: '26',
  group: BOB4,
  title: 'Laboratoriya: toʻlqin uzunligini panjara bilan aniqlash',
  section: '26-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Qizil yorugʻlik toʻlqinining uzunligi metrning milliondan bir qismidan ham kichik. Uni oddiy chizgʻich bilan oʻlchab boʻlarmikan? Ha — agar difraksion panjaradan foydalansak! Bugungi laboratoriya ishida aynan shuni qilamiz.",
      easy: "Panjara va chizgʻich bilan yorugʻlik toʻlqin uzunligini oʻlchaymiz.",
      draw: [
        { t: 'title', text: 'Ishning maqsadi' },
        { t: 'icon', x: 16, y: 34, emoji: '🌈', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '📏', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['λ ni panjara bilan aniqlash', 'qizil va binafsha nurlar', 'xatolikni hisoblash'] }
      ],
      next: 'Asboblar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kerakli asboblar: doimiysi yuzdan bir millimetr — 10 mikrometr boʻlgan difraksion panjara, yorugʻlik manbayi, oʻrtasida tirqishi va millimetrli shkalasi bor qora ekran, uzun chizgʻich. Panjara chizgʻichning bir uchida, tirqishli ekran ikkinchi qismida turadi. Panjara orqali tirqishga qarasak, ikki yonda rangli spektrlar koʻrinadi.",
      easy: "Panjara (d = 10 μm), manba, tirqishli shkala, chizgʻich.",
      draw: [
        { t: 'title', text: 'Qurilma' },
        ...seg('ruler', 8, 50, 78, 50, 'ink'),
        ...seg('screen', 8, 24, 8, 62, 'ink'),
        { t: 'text', x: 10, y: 22, text: 'tirqishli shkala', size: 's' },
        ...seg('grating', 78, 42, 78, 58, 'purple', true),
        { t: 'text', x: 70, y: 66, text: 'panjara', size: 's', color: 'purple' },
        { t: 'icon', x: 88, y: 50, emoji: '👁️', size: 's' },
        ...vec('y', 8, 50, 8, 32, 'red'),
        { t: 'text', x: 10, y: 40, text: 'y', color: 'red' },
        { t: 'text', x: 40, y: 56, text: 'x', color: 'blue' },
        ...seg('ray', 8, 32, 78, 50, 'orange', true),
        { t: 'text', x: 66, y: 46, text: 'φ', size: 's' }
      ],
      next: 'Formula'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tirqishdan tanlangan rangli chiziqqacha masofa y, panjaradan shkalagacha masofa x. y x dan ancha kichik boʻlgani uchun sinus fi taxminan tangens fi ga, yaʼni y boʻlinsin x ga teng. Panjara formulasidan: lambda teng d karra y boʻlinsin n karra x.",
      easy: "sin φ ≈ tg φ = y/x → λ = d·y / (n·x).",
      draw: [
        { t: 'title', text: 'Hisoblash formulasi' },
        { t: 'formula', x: 6, y: 22, text: 'd · sin φ = n · λ' },
        { t: 'formula', x: 6, y: 38, text: 'sin φ ≈ tg φ = y / x' },
        { t: 'formula', x: 6, y: 54, text: 'λ = d · y / (n · x)' }
      ],
      next: 'Natijalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Namuna natijalar: x teng 500 millimetr, d teng 10 mikrometr. Qizil nur uchun birinchi tartibda y 35 millimetr — lambda 700 nanometr. Ikkinchi tartibda y 71 — 710 nanometr, uchinchida 106 — 707 nanometr. Binafsha nur uchun birinchi tartibda y 21 millimetr — 420 nanometr.",
      easy: "Qizil: 700, 710, 707 nm. Binafsha: 420 nm.",
      draw: [
        { t: 'title', text: 'Oʻlchash natijalari (x = 500 mm)' },
        {
          t: 'table',
          x: 6,
          y: 22,
          rows: [
            ['nur', 'n', 'y, mm', 'λ, nm'],
            ['qizil', '1', '35', '700'],
            ['qizil', '2', '71', '710'],
            ['qizil', '3', '106', '707'],
            ['binafsha', '1', '21', '420']
          ]
        }
      ],
      next: 'Xatolik'
    },
    {
      kind: 'example',
      clear: true,
      say: "Qizil nur uchun oʻrtacha qiymat: 700, 710 va 707 ning oʻrtachasi — taxminan 706 nanometr. Absolyut xatoliklar: 6, 4 va 1 — oʻrtacha taxminan 4 nanometr. Nisbiy xatolik: 4 boʻlinsin 706 — taxminan 0,6 foiz. Natija juda aniq!",
      easy: "λ oʻrt ≈ 706 nm, Δλ ≈ 4 nm, ε ≈ 0,6 %.",
      draw: [
        { t: 'title', text: 'Oʻrtacha va xatolik' },
        { t: 'list', x: 6, y: 20, items: ['λ oʻrt = (700 + 710 + 707) / 3 ≈ 706 nm', 'Δλ = 6, 4, 1 → oʻrtacha ≈ 4 nm'] },
        { t: 'formula', x: 6, y: 48, text: 'ε = Δλ / λ oʻrt ≈ 0,6 %' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Yorugʻlik toʻlqin uzunligi difraksion panjara orqali λ = d·y / (n·x) formuladan topiladi (sin φ ≈ tg φ = y/x).',
    'Namuna oʻlchashlarda qizil nur uchun λ ≈ 706 nm, binafsha uchun ≈ 420 nm.',
    'Bir necha tartib boʻyicha oʻlchab, oʻrtacha qiymat va nisbiy xatolik hisoblanadi.'
  ],
  questions: [
    {
      id: 'f28q1',
      prompt: 'd = 10 μm, x = 400 mm, birinchi tartibda y = 24 mm. Toʻlqin uzunligi necha nm?',
      hint: 'λ = d·y/(n·x).',
      explanation: '10⁻⁵ · 0,024 / 0,4 = 6·10⁻⁷ m = 600 nm.',
      widget: { type: 'number_answer', props: { answer: 600, unit: 'nm' } }
    },
    {
      id: 'f28q2',
      prompt: 'Doimiysi 1/50 mm boʻlgan panjaraning d qiymati necha μm?',
      hint: '1 mm = 1000 μm.',
      explanation: '1000 / 50 = 20 μm.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'μm' } }
    },
    {
      id: 'f28q3',
      prompt: 'd = 20 μm, x = 500 mm, ikkinchi tartibli yashil chiziq y = 27,5 mm da. λ necha nm?',
      hint: 'n = 2.',
      explanation: '2·10⁻⁵ · 0,0275 / (2 · 0,5) = 5,5·10⁻⁷ m = 550 nm.',
      widget: { type: 'number_answer', props: { answer: 550, unit: 'nm' } }
    },
    {
      id: 'f28q4',
      prompt: 'Oʻlchangan qiymatlar: 600, 610, 605 nm. Oʻrtacha qiymat necha nm?',
      hint: 'Yigʻindini 3 ga boʻling.',
      explanation: '(600 + 610 + 605) / 3 = 605 nm.',
      widget: { type: 'number_answer', props: { answer: 605, unit: 'nm' } }
    },
    {
      id: 'f28q5',
      prompt: 'Oq yorugʻlikda difraksion manzara markazida nega oq polosa hosil boʻladi?',
      hint: 'n = 0 da φ = 0.',
      explanation: 'Nolinchi tartibda barcha ranglar bir joyga (φ = 0) tushadi va qoʻshilib oq rang beradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Panjara oq rangda', 'n = 0 da barcha ranglar bir joyga tushadi', 'Markazda yorugʻlik yoʻq', 'Faqat qizil nur oʻtadi'], answerIndex: 1 } }
    },
    {
      id: 'f28q6',
      prompt: 'Spektr tartibi oshgan sari oʻlchash aniqligi qanday oʻzgaradi?',
      hint: 'y katta boʻlsa, nisbiy xato kichik.',
      explanation: 'y kattalashadi, uni oʻlchashdagi nisbiy xato kamayadi — aniqlik oshadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Oshadi', 'Kamayadi', 'Oʻzgarmaydi', 'Faqat qizil nurda oshadi'], answerIndex: 0 } }
    },
    {
      id: 'f28q7',
      prompt: 'Ish bosqichlarini tartiblang.',
      hint: 'Avval qurilma yigʻiladi.',
      explanation: 'Qurilmani yigʻish → manbani yoqish → chiziqni shkala raqamiga keltirish → y va x ni oʻlchash → λ ni hisoblash.',
      widget: {
        type: 'step_order',
        props: { steps: ['Panjara va tirqishli shkalani chizgʻichga oʻrnatish', 'Yorugʻlik manbayini yoqish', 'Rangli chiziqni shkala raqamiga keltirish', 'y va x ni oʻlchash', 'λ = d·y/(n·x) ni hisoblash'] }
      }
    },
    {
      id: 'f28q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Qizil nur koʻproq buriladi.',
      explanation: 'Qizil nurning λ katta — u koʻproq buriladi (y katta); lazer bilan aniq chiziqlar koʻrinadi; sin φ ≈ tg φ faqat kichik burchakda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bir xil tartibda qizil chiziq binafshadan uzoqroqda koʻrinadi.', value: true },
            { text: 'sin φ ≈ tg φ yaqinlashuvi katta burchaklarda ham aniq.', value: false },
            { text: 'Lazer nurida rangli spektr emas, bir xil rangli chiziqlar koʻrinadi.', value: true }
          ]
        }
      }
    }
  ]
};
