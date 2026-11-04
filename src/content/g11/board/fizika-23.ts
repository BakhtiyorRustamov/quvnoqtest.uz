import type { BoardLesson } from './types';
import { capacitor, seg, wave } from './phys';

export const BOB4 = { kicker: 'IV bob', title: 'Elektromagnit toʻlqinlar va toʻlqin optikasi' };

/** Darslik: Fizika 11, 21-mavzu (76–78-betlar) — elektromagnit tebranishlarning tarqalishi, elektromagnit toʻlqin tezligi. */
export const FIZ_23: BoardLesson = {
  n: 23,
  label: '21',
  group: BOB4,
  title: 'Elektromagnit toʻlqinlar va ularning tezligi',
  section: '21-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Toshkentdan Nyu-Yorkdagi doʻstingizga qoʻngʻiroq qilsangiz, ovozingiz sekundning kichik bir qismida yetib boradi. Xabarni hech qanday sim emas, fazoda tarqaladigan elektromagnit toʻlqinlar eltadi. Ular sekundiga 300 ming kilometr tezlikda uchadi! Bu toʻlqinlar qanday paydo boʻladi?",
      easy: "Telefon signalini elektromagnit toʻlqinlar 300 000 km/s tezlikda eltadi.",
      draw: [
        { t: 'title', text: 'Ovoz qanday yetib boradi?' },
        { t: 'icon', x: 16, y: 34, emoji: '📞', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🌍', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['simsiz aloqa', 'elektromagnit toʻlqinlar', '300 000 km/s'] }
      ],
      next: 'Maksvell gipotezasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Faradey tajribalarini oʻrgangan Maksvell xulosa qildi: magnit maydonning har qanday oʻzgarishi atrofida uyurmaviy elektr maydon hosil qiladi. U simmetriya gʻoyasini ham ilgari surdi: elektr maydonning oʻzgarishi ham atrofida uyurmaviy magnit maydon hosil qiladi. Shunday qilib, ular bir-birini tugʻdirib, fazoda tarqaladi — elektromagnit toʻlqin.",
      easy: "Oʻzgaruvchan B → elektr maydon; oʻzgaruvchan E → magnit maydon. Birga — toʻlqin.",
      draw: [
        { t: 'title', text: 'Maksvell gipotezasi (1864)' },
        { t: 'text', x: 6, y: 28, text: 'oʻzgaruvchan B  →  uyurmaviy E', color: 'blue' },
        { t: 'text', x: 6, y: 42, text: 'oʻzgaruvchan E  →  uyurmaviy B', color: 'red' },
        { t: 'text', x: 6, y: 58, text: 'bir-birini tugʻdiradi → toʻlqin', color: 'purple' }
      ],
      next: 'Hertz tajribasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Maksvell gipotezasini u vafot etganidan oʻn yil keyin, 1886–1889-yillarda Genrix Hertz tasdiqladi. U ikki sharcha orasida kichik havo tirqishi boʻlgan vibrator yasadi. Yuqori kuchlanishda tirqishda uchqun chaqnaydi va yuqori chastotali tebranishlar paydo boʻladi. Bir necha metr naridagi ikkinchi, manbaga ulanmagan vibratorda ham uchqun chiqdi — toʻlqin yetib bordi!",
      easy: "Hertz: birinchi vibratorda uchqun → ikkinchisida ham uchqun. Toʻlqin bor!",
      draw: [
        { t: 'title', text: 'Hertz vibratori' },
        { t: 'ellipse', cx: 12, cy: 40, rx: 4, ry: 4, color: 'ink' },
        ...seg('r1', 16, 40, 22, 40),
        ...seg('r2', 26, 40, 32, 40),
        { t: 'ellipse', cx: 36, cy: 40, rx: 4, ry: 4, color: 'ink' },
        { t: 'icon', x: 24, y: 33, emoji: '⚡', size: 's' },
        { t: 'text', x: 46, y: 41, text: '~ ~ ~ →', color: 'purple' },
        { t: 'ellipse', cx: 72, cy: 40, rx: 3, ry: 3, color: 'ink' },
        ...seg('r3', 75, 40, 81, 40),
        { t: 'ellipse', cx: 87, cy: 40, rx: 3, ry: 3, color: 'ink' },
        { t: 'text', x: 6, y: 58, text: 'uzatkich', size: 's' },
        { t: 'text', x: 70, y: 58, text: 'qabul qilgich', size: 's' }
      ],
      next: 'Ochiq kontur'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yopiq tebranish konturidan toʻlqin deyarli tarqalmaydi: maydon kondensator ichida qoladi. Kondensator qoplamalarini bir-biridan uzoqlashtira borsak, kuch chiziqlari tashqariga chiqadi. Qoplamalar biri tepaga, biri pastga ketsa — bu ochiq tebranish konturi, yaʼni antenna. Undan toʻlqinlar fazoga toʻla tarqaladi. Toʻlqinning tarqalishi nurlanish deyiladi.",
      easy: "Kondensator qoplamalari ochilsa — antenna, toʻlqin fazoga tarqaladi.",
      draw: [
        { t: 'title', text: 'Yopiqdan ochiq konturga' },
        ...capacitor('c1', 14, 40, 8, 3),
        { t: 'text', x: 8, y: 54, text: 'yopiq', size: 's' },
        ...seg('a1', 38, 34, 46, 34),
        ...seg('a2', 38, 46, 46, 46),
        { t: 'text', x: 36, y: 54, text: 'ochilmoqda', size: 's' },
        ...seg('b1', 76, 22, 76, 37),
        ...seg('b2', 76, 43, 76, 58),
        { t: 'text', x: 72, y: 64, text: 'antenna', size: 's', color: 'red' },
        { t: 'text', x: 82, y: 41, text: '~', color: 'purple' }
      ],
      next: 'Toʻlqin tezligi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Elektromagnit toʻlqinda elektr maydon E va magnit maydon B oʻzaro tik joylashib, davriy tebranadi. Hertz vibrator chastotasi va toʻlqin uzunligini oʻlchab, tezlikni v teng lambda karra nu formuladan hisobladi. U yorugʻlik tezligiga — sekundiga 300 ming kilometrga teng chiqdi.",
      easy: "c = λ·ν = 3·10⁸ m/s — yorugʻlik tezligi.",
      draw: [
        { t: 'title', text: 'Toʻlqin tezligi' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 54, h: 38, xmin: 0, xmax: 2, ymin: -1.2, ymax: 1.2, xlabel: 'x / λ', ylabel: 'E, B' },
        { t: 'curve', axes: 'g', points: wave((x) => Math.sin(2 * Math.PI * x), 0, 2), color: 'red' },
        { t: 'curve', axes: 'g', points: wave((x) => 0.5 * Math.sin(2 * Math.PI * x), 0, 2), color: 'blue', dashed: true },
        { t: 'formula', x: 66, y: 28, text: 'c = λ · ν' },
        { t: 'text', x: 66, y: 44, text: '= 3·10⁸ m/s', color: 'green' },
        { t: 'text', x: 8, y: 66, text: 'E — qizil, B — koʻk (E ⊥ B)', size: 's' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ochiq konturdagi tok i teng 0,3 sinus 5 karra 10 ning 5 darajasi pi t qonuni bilan oʻzgaradi. Toʻlqin uzunligi qancha? Omega teng 5 karra 10 ning 5 darajasi pi, demak nu teng omega boʻlinsin 2 pi — 2,5 karra 10 ning 5 darajasi gers. Lambda teng c boʻlinsin nu: 3 karra 10 ning 8 darajasi boʻlinsin 2,5 karra 10 ning 5 darajasi — 1200 metr.",
      easy: "ν = 2,5·10⁵ Hz, λ = c/ν = 1200 m.",
      draw: [
        { t: 'title', text: 'Toʻlqin uzunligini topamiz' },
        { t: 'list', x: 6, y: 20, items: ['ω = 5 · 10⁵ π rad/s', 'ν = ω / 2π = 2,5 · 10⁵ Hz'] },
        { t: 'formula', x: 6, y: 46, text: 'λ = c / ν = 3·10⁸ / 2,5·10⁵ = 1200 m' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Maksvell: oʻzgaruvchan magnit maydon elektr maydonni, oʻzgaruvchan elektr maydon magnit maydonni hosil qiladi — ular birga toʻlqin boʻlib tarqaladi.',
    'Hertz (1886–1889) vibrator yordamida elektromagnit toʻlqinlarni tajribada hosil qildi; ochiq tebranish konturi — antenna.',
    'Elektromagnit toʻlqin tezligi c = λ·ν = 3·10⁸ m/s — yorugʻlik tezligiga teng.'
  ],
  questions: [
    {
      id: 'f23q1',
      prompt: 'Chastotasi 100 MHz boʻlgan radiotoʻlqinning uzunligi necha m?',
      hint: 'λ = c / ν.',
      explanation: '3·10⁸ / 10⁸ = 3 m.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'm' } }
    },
    {
      id: 'f23q2',
      prompt: 'Chastotasi 15 MHz toʻlqin 30 davrga teng vaqtda qancha masofaga tarqaladi (m)?',
      hint: 'Bir davrda toʻlqin λ masofani oʻtadi.',
      explanation: 'λ = 3·10⁸ / 1,5·10⁷ = 20 m; 30 · 20 = 600 m.',
      widget: { type: 'number_answer', props: { answer: 600, unit: 'm' } }
    },
    {
      id: 'f23q3',
      prompt: 'Kontur gʻaltagi 1 mH, ketma-ket ulangan 500 pF va 200 pF kondensatorlar bor. Kontur qaysi toʻlqin uzunligiga sozlangan (m)? (butun songacha)',
      hint: 'C = C₁C₂/(C₁+C₂), λ = 2πc√(LC).',
      explanation: 'C ≈ 143 pF; λ = 2π · 3·10⁸ · √(10⁻³ · 1,43·10⁻¹⁰) ≈ 712 m.',
      widget: { type: 'number_answer', props: { answer: 712, tolerance: 5, unit: 'm' } }
    },
    {
      id: 'f23q4',
      prompt: 'Elektromagnit toʻlqinlarni birinchi boʻlib tajribada kim hosil qilgan?',
      hint: '1886–1889-yillar.',
      explanation: 'Genrix Hertz.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Maksvell', 'Faradey', 'Hertz', 'Popov'], answerIndex: 2 } }
    },
    {
      id: 'f23q5',
      prompt: 'Nega yopiq tebranish konturi toʻlqinni yaxshi nurlantirmaydi?',
      hint: 'Elektr maydon qayerda?',
      explanation: 'Elektr maydon kondensator qoplamalari orasida qamalib qoladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Chastota juda katta', 'Maydon kondensator ichida qamalib qoladi', 'Gʻaltak toʻlqinni yutadi', 'Tok juda kichik'], answerIndex: 1 } }
    },
    {
      id: 'f23q6',
      prompt: 'Juftlarni moslang.',
      hint: 'Maksvell gipotezasi.',
      explanation: 'Oʻzgaruvchan B — uyurmaviy E; oʻzgaruvchan E — uyurmaviy B; ochiq kontur — antenna.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'oʻzgaruvchan magnit maydon', right: 'uyurmaviy elektr maydon' },
            { left: 'oʻzgaruvchan elektr maydon', right: 'uyurmaviy magnit maydon' },
            { left: 'ochiq tebranish konturi', right: 'antenna' }
          ]
        }
      }
    },
    {
      id: 'f23q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'c = λν.',
      explanation: 'Elektromagnit toʻlqin tezligi yorugʻlik tezligiga teng; toʻlqinning tarqalishi nurlanish deyiladi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Elektromagnit toʻlqinning tezligi ' },
            { blank: 'yorugʻlik' },
            { text: ' tezligiga teng. Toʻlqinning tarqalishi ' },
            { blank: 'nurlanish' },
            { text: ' deb ham ataladi.' }
          ],
          bank: ['yorugʻlik', 'nurlanish', 'tovush', 'induksiya']
        }
      }
    },
    {
      id: 'f23q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'E va B qanday joylashgan?',
      explanation: 'E va B oʻzaro tik; toʻlqin vakuumda ham tarqaladi; Hertz Maksvelldan keyin tasdiqladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Elektromagnit toʻlqinda E va B vektorlari oʻzaro tik.', value: true },
            { text: 'Elektromagnit toʻlqinlar vakuumda tarqala olmaydi.', value: false },
            { text: 'Hertz tajribasida ikkinchi vibrator manbaga ulanmagan edi.', value: true },
            { text: 'Chastota oshsa, toʻlqin uzunligi ham oshadi.', value: false }
          ]
        }
      }
    }
  ]
};
