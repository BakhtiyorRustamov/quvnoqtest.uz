import type { BoardLesson } from './types';
import { BOB1 } from './fizika-1';
import { seg, vec } from './phys';

/** Darslik: Fizika 11, 5-mavzu (15–16-betlar) — tokli oʻtkazgichlarning oʻzaro taʼsir kuchi. */
export const FIZ_5: BoardLesson = {
  n: 5,
  label: '5',
  group: BOB1,
  title: 'Parallel tokli oʻtkazgichlarning oʻzaro taʼsiri',
  section: '5-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Elektr stansiyasi va katta podstansiyalarda yonma-yon turgan qalin mis shinalardan minglab amper tok oqadi. Ularni maxsus izolyatorlarga mahkam qotirib qoʻyishadi. Nega? Chunki tokli oʻtkazgichlar xuddi zaryadlar kabi bir-birini tortadi yoki itaradi. Qachon tortishini va kuch qanchaligini bugun aniqlaymiz.",
      easy: "Tokli simlar bir-birini tortadi yoki itaradi — shuning uchun shinalar mahkam qotiriladi.",
      draw: [
        { t: 'title', text: 'Nega shinalar qotiriladi?' },
        { t: 'icon', x: 16, y: 34, emoji: '🏭', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚡', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['yonma-yon qalin shinalar', 'minglab amper tok', 'simlar bir-biriga taʼsir qiladi'] }
      ],
      next: 'Tajriba'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikki elastik simni tik osib qoʻyamiz. Ulardan bir xil yoʻnalishda tok oʻtkazsak, simlar bir-biriga tortiladi. Toklar qarama-qarshi yoʻnalsa, simlar bir-biridan itariladi. Esda tuting: zaryadlarda bir xillari itarishadi, toklarda esa aksincha — bir xil yoʻnalganlari tortishadi.",
      easy: "Toklar bir yoʻnalishda — tortishadi. Qarama-qarshi — itarishadi.",
      draw: [
        { t: 'title', text: 'Tortishadimi, itarishadimi?' },
        ...vec('a1', 18, 58, 18, 24, 'red'),
        { t: 'text', x: 19.5, y: 25, text: 'I', color: 'red', size: 's' },
        ...vec('a2', 32, 58, 32, 24, 'red'),
        { t: 'text', x: 33.5, y: 25, text: 'I', color: 'red', size: 's' },
        ...vec('fa1', 18, 44, 23, 44, 'green'),
        ...vec('fa2', 32, 44, 27, 44, 'green'),
        { t: 'text', x: 11, y: 66, text: 'tortishadi', color: 'green' },
        ...vec('b1', 62, 58, 62, 24, 'red'),
        { t: 'text', x: 63.5, y: 25, text: 'I', color: 'red', size: 's' },
        ...vec('b2', 76, 24, 76, 58, 'red'),
        { t: 'text', x: 77.5, y: 57, text: 'I', color: 'red', size: 's' },
        ...vec('fb1', 62, 44, 56, 44, 'orange'),
        ...vec('fb2', 76, 44, 82, 44, 'orange'),
        { t: 'text', x: 57, y: 66, text: 'itarishadi', color: 'orange' }
      ],
      next: 'Kuch formulasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Birinchi tok ikkinchi sim turgan joyda B1 teng mu nol I1 boʻlinsin 2 pi d induksiya hosil qiladi. Ikkinchi simning delta l uzunlikdagi qismiga Amper kuchi taʼsir qiladi: F teng B1 I2 delta l. Ikkalasini birlashtirsak: F teng mu nol I1 I2 delta l boʻlinsin 2 pi d. Kuch toklar koʻpaytmasiga toʻgʻri, masofaga teskari proporsional.",
      easy: "F = μ₀ · I₁ · I₂ · Δl / (2π · d).",
      draw: [
        { t: 'title', text: 'Oʻzaro taʼsir kuchi' },
        ...vec('i1', 14, 60, 14, 22, 'red'),
        { t: 'text', x: 15.5, y: 24, text: 'I₁', color: 'red', size: 's' },
        ...vec('i2', 34, 60, 34, 22, 'red'),
        { t: 'text', x: 35.5, y: 24, text: 'I₂', color: 'red', size: 's' },
        ...vec('f1', 14, 40, 20, 40, 'green'),
        ...vec('f2', 34, 40, 28, 40, 'green'),
        ...seg('dd', 14, 64, 34, 64, 'purple', true),
        { t: 'text', x: 23, y: 62, text: 'd', color: 'purple', size: 's' },
        { t: 'list', x: 44, y: 22, items: ['B₁ = μ₀ I₁ / (2π d)', 'F = B₁ · I₂ · Δl'] },
        { t: 'formula', x: 44, y: 48, text: 'F = μ₀ I₁ I₂ Δl / (2π d)' }
      ],
      next: 'Amper birligi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Aynan shu hodisa asosida tok kuchining birligi — amper aniqlangan. Vakuumda bir-biridan 1 metr masofada turgan cheksiz uzun ingichka ikki parallel simdan bir xil tok oʻtib, har bir metr uzunlikka 2 karra 10 ning minus 7 darajasi nyuton kuch taʼsir qilsa, bu tok 1 amperga teng.",
      easy: "1 A: 1 m oraliqdagi simlarning har metriga 2·10⁻⁷ N kuch.",
      draw: [
        { t: 'title', text: 'Bir amper nima?' },
        { t: 'list', x: 6, y: 22, items: ['vakuum, ikki parallel sim', 'oraliq d = 1 m', 'har metrga F = 2 · 10⁻⁷ N', 'shunda I = 1 A'] },
        { t: 'formula', x: 6, y: 60, text: 'F / Δl = 2 · 10⁻⁷ · I₁ I₂ / d' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ikki simli oʻzgarmas tok liniyasida simlar orasi 1,6 metr, har biridan 40 amper tok oʻtmoqda. Har bir metrga taʼsir kuchi: F teng 2 karra 10 ning minus 7 darajasi karra 40 karra 40 boʻlinsin 1,6, yaʼni 2 karra 10 ning minus 4 darajasi nyuton.",
      easy: "F = 2·10⁻⁷ · 1600 / 1,6 = 2·10⁻⁴ N.",
      draw: [
        { t: 'title', text: 'Liniya simlari' },
        { t: 'list', x: 6, y: 20, items: ['d = 1,6 m', 'I₁ = I₂ = 40 A', 'Δl = 1 m'] },
        { t: 'formula', x: 6, y: 50, text: 'F = 2·10⁻⁷ · 40 · 40 / 1,6 = 2·10⁻⁴ N' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Bir xil yoʻnalgan toklar tortishadi, qarama-qarshi yoʻnalganlari itarishadi.',
    'Parallel simlar orasidagi kuch: F = μ₀·I₁·I₂·Δl / (2π·d).',
    '1 A — 1 m oraliqdagi parallel simlarning har metriga 2·10⁻⁷ N kuch beradigan tok.'
  ],
  questions: [
    {
      id: 'f5q1',
      prompt: 'Ikki simli liniyada simlar orasi 2 m, tok 50 A. Har bir metrga taʼsir kuchi necha mN?',
      hint: 'F = 2·10⁻⁷ · I² / d.',
      explanation: '2·10⁻⁷ · 2500 / 2 = 2,5·10⁻⁴ N = 0,25 mN.',
      widget: { type: 'number_answer', props: { answer: 0.25, tolerance: 0.005, unit: 'mN' } }
    },
    {
      id: 'f5q2',
      prompt: 'Orasi 10 cm boʻlgan parallel simlarning har biridan 10 A tok oʻtmoqda. 1 m uzunlikka taʼsir kuchi necha mN?',
      hint: 'd = 0,1 m.',
      explanation: '2·10⁻⁷ · 100 / 0,1 = 2·10⁻⁴ N = 0,2 mN.',
      widget: { type: 'number_answer', props: { answer: 0.2, tolerance: 0.005, unit: 'mN' } }
    },
    {
      id: 'f5q3',
      prompt: 'Qaysi holda ikki parallel sim bir-biriga tortiladi?',
      hint: 'Bir xil yoʻnalish — tortishish.',
      explanation: 'Toklar bir xil yoʻnalganda (↓↓) simlar tortishadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['↑↓', '↓↓', '↑ va tok yoʻq', '↓↑'], answerIndex: 1 } }
    },
    {
      id: 'f5q4',
      prompt: 'Simlar orasidagi masofa 2 marta oshirildi, ikkala tok ham 2 marta oshirildi. Kuch qanday oʻzgaradi?',
      hint: 'F ~ I₁·I₂ / d.',
      explanation: 'Surat 4 marta, maxraj 2 marta oshadi — kuch 2 marta oshadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻzgarmaydi', '2 marta oshadi', '4 marta oshadi', '2 marta kamayadi'], answerIndex: 1 } }
    },
    {
      id: 'f5q5',
      prompt: 'Simlar juftini guruhlarga ajrating.',
      hint: 'Yoʻnalishlarni solishtiring.',
      explanation: '↑↑ va ↓↓ — tortishadi; ↑↓ va ↓↑ — itarishadi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 't', label: 'Tortishadi' },
            { id: 'i', label: 'Itarishadi' }
          ],
          items: [
            { emoji: '', label: '↑ ↑', bin: 't' },
            { emoji: '', label: '↓ ↓', bin: 't' },
            { emoji: '', label: '↑ ↓', bin: 'i' },
            { emoji: '', label: '↓ ↑', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'f5q6',
      prompt: 'Oʻzaro taʼsir kuchini oshiradigan oʻzgarishlarni belgilang.',
      hint: 'F = μ₀ I₁ I₂ Δl / (2π d).',
      explanation: 'Toklarni yoki uzunlikni oshirish, masofani kamaytirish kuchni oshiradi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'I₁ ni oshirish', correct: true },
            { label: 'simlarni uzoqlashtirish' },
            { label: 'simlarni yaqinlashtirish', correct: true },
            { label: 'uzunroq qismni olish', correct: true },
            { label: 'I₂ ni kamaytirish' }
          ]
        }
      }
    },
    {
      id: 'f5q7',
      prompt: 'Juftlarni toping.',
      hint: 'Formulani ikki qismga boʻling.',
      explanation: 'B₁ = μ₀I₁/(2πd); F = B₁I₂Δl; μ₀ = 4π·10⁻⁷; 1 A da 1 m oraliqda — 2·10⁻⁷ N.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'B₁' }, b: { label: 'μ₀ I₁ / (2π d)' } },
            { a: { label: 'F₂' }, b: { label: 'B₁ · I₂ · Δl' } },
            { a: { label: 'μ₀' }, b: { label: '4π · 10⁻⁷ N/A²' } },
            { a: { label: '1 A, 1 m' }, b: { label: '2 · 10⁻⁷ N har metrga' } }
          ]
        }
      }
    },
    {
      id: 'f5q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Toklar zaryadlarning aksi.',
      explanation: 'Bir xil toklar tortishadi; kuch masofaga teskari proporsional; amper shu hodisa asosida aniqlangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bir xil yoʻnalgan toklar bir-biridan itariladi.', value: false },
            { text: 'Simlar orasidagi masofa oshsa, oʻzaro kuch kamayadi.', value: true },
            { text: 'Tok kuchi birligi amper parallel toklar taʼsiri asosida aniqlangan.', value: true },
            { text: 'Kuch faqat birinchi simdagi tokka bogʻliq.', value: false }
          ]
        }
      }
    }
  ]
};
