import type { BoardLesson } from './types';
import { BOB3 } from './fizika-13';
import { wave } from './phys';

/** Darslik: Fizika 11, 16-mavzu (57–59-betlar) — oʻzgaruvchan tok zanjiridagi induktiv gʻaltak, induktiv qarshilik. */
export const FIZ_18: BoardLesson = {
  n: 18,
  label: '16',
  group: BOB3,
  title: 'Oʻzgaruvchan tok zanjirida gʻaltak',
  section: '16-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Lampa va gʻaltakni ketma-ket ulab, avval oʻzgarmas, keyin xuddi shunday effektiv kuchlanishli oʻzgaruvchan manbaga ulaymiz. Ajablanarlisi, oʻzgaruvchan tokda lampa xiraroq yonadi! Gʻaltak oʻzgaruvchan tokka qoʻshimcha qarshilik koʻrsatayotganga oʻxshaydi. Bu qarshilik qayerdan keladi?",
      easy: "Gʻaltakli zanjirda oʻzgaruvchan tokda lampa xiraroq yonadi.",
      draw: [
        { t: 'title', text: 'Nega lampa xira?' },
        { t: 'icon', x: 16, y: 34, emoji: '💡', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🔌', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['oʻzgarmas tok — yorqin', 'oʻzgaruvchan tok — xira', 'sababchi — gʻaltak'] }
      ],
      next: 'Oʻzinduksiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gʻaltakdan i teng I max kosinus omega t tok oʻtsa, unda oʻzinduksiya EYuK E teng minus L i shtrix hosil boʻladi va tok oʻzgarishiga qarshilik qiladi. Qarshilik nol boʻlsa, gʻaltak uchlaridagi kuchlanish shu EYuKni muvozanatlaydi: u teng I max omega L kosinus omega t qoʻshuv pi ikkinchi.",
      easy: "Oʻzinduksiya EYuK tok oʻzgarishiga qarshilik qiladi: u = Iₘ ωL cos(ωt + π/2).",
      draw: [
        { t: 'title', text: 'Oʻzinduksiya qarshiligi' },
        { t: 'formula', x: 6, y: 22, text: 'i = Iₘ cos ωt' },
        { t: 'formula', x: 6, y: 36, text: 'E = − L · i′' },
        { t: 'formula', x: 6, y: 50, text: 'u = Iₘ ωL · cos(ωt + π/2)' }
      ],
      next: 'Faza siljishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Demak, gʻaltakda kuchlanish tokdan pi ikkinchi ga oldinda, boshqacha aytganda tok kuchlanishdan chorak davr orqada qoladi. Bu kondensatordagining teskarisi! Grafikda koʻk kuchlanish qizil tokdan oldin choʻqqiga chiqadi.",
      easy: "Gʻaltakda tok kuchlanishdan π/2 ga orqada.",
      draw: [
        { t: 'title', text: 'Tok π/2 ga orqada' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 56, h: 44, xmin: 0, xmax: 2, ymin: -1.3, ymax: 1.3, xlabel: 't / T', ylabel: 'u, i' },
        { t: 'curve', axes: 'g', points: wave((t) => Math.cos(2 * Math.PI * t), 0, 2), color: 'blue' },
        { t: 'curve', axes: 'g', points: wave((t) => 0.7 * Math.cos(2 * Math.PI * t - Math.PI / 2), 0, 2), color: 'red' },
        { t: 'list', x: 70, y: 26, items: ['u — koʻk', 'i — qizil', 'i orqada π/2'] }
      ],
      next: 'Induktiv qarshilik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kuchlanish amplitudasi U max teng I max karra omega L. Om qonuni bilan solishtirsak, X L teng omega L — induktiv qarshilik, u ham omlarda oʻlchanadi. Induktivlik va chastota qancha katta boʻlsa, induktiv qarshilik shuncha katta, tok esa kichik. Shuning uchun gʻaltak yuqori chastotalarni yaxshi oʻtkazmaydi.",
      easy: "XL = ωL = 2πνL; ν yoki L oshsa, XL oshadi.",
      draw: [
        { t: 'title', text: 'Induktiv qarshilik' },
        { t: 'formula', x: 4, y: 22, text: 'XL = ωL = 2πνL' },
        { t: 'formula', x: 4, y: 38, text: 'Iₘ = Uₘ / XL' },
        { t: 'axes', id: 'x', x: 50, y: 18, w: 44, h: 44, xmin: 0, xmax: 5, ymin: 0, ymax: 5, xlabel: 'ν', ylabel: 'XL' },
        { t: 'curve', axes: 'x', points: [[0, 0], [5, 4.6]], color: 'orange' },
        { t: 'text', x: 4, y: 56, text: 'ν ↑ → XL ↑', color: 'purple' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Chastotasi 10 kilogers zanjirga induktivligi 5 genri gʻaltak ulandi. Induktiv qarshilik: 2 pi karra 10000 karra 5, yaʼni 314000 om — 314 kiloom.",
      easy: "XL = 2π · 10⁴ · 5 = 314 kΩ.",
      draw: [
        { t: 'title', text: 'Induktiv qarshilikni topamiz' },
        { t: 'list', x: 6, y: 20, items: ['ν = 10 kHz = 10⁴ Hz', 'L = 5 H'] },
        { t: 'formula', x: 6, y: 46, text: 'XL = 2πνL = 314 000 Ω = 314 kΩ' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Gʻaltakdagi oʻzinduksiya EYuK oʻzgaruvchan tokka qarshilik koʻrsatadi.',
    'Gʻaltakda tok kuchlanishdan π/2 ga orqada (kuchlanish oldinda).',
    'Induktiv qarshilik XL = ωL = 2πνL; chastota va induktivlik oshsa, u oshadi: Iₘ = Uₘ/XL.'
  ],
  questions: [
    {
      id: 'f18q1',
      prompt: 'Gʻaltakka qoʻyilgan kuchlanish amplitudasi 157 V, tok amplitudasi 5 A, chastota 50 Hz. Induktivlik necha H?',
      hint: 'XL = Uₘ/Iₘ, L = XL/(2πν).',
      explanation: 'XL = 31,4 Ω; L = 31,4 / 314 = 0,1 H.',
      widget: { type: 'number_answer', props: { answer: 0.1, tolerance: 0.002, unit: 'H' } }
    },
    {
      id: 'f18q2',
      prompt: '50 Hz tarmoqqa 0,2 H gʻaltak ulandi. Induktiv qarshilik necha Ω? (0,1 gacha)',
      hint: 'XL = 2πνL.',
      explanation: '6,28 · 50 · 0,2 = 62,8 Ω.',
      widget: { type: 'number_answer', props: { answer: 62.8, tolerance: 0.1, unit: 'Ω' } }
    },
    {
      id: 'f18q3',
      prompt: 'Induktivligi 1 H gʻaltakka 50 Hz, amplitudasi 314 V kuchlanish berildi. Tok amplitudasi necha A?',
      hint: 'XL = 314 Ω.',
      explanation: 'Iₘ = 314 / 314 = 1 A.',
      widget: { type: 'number_answer', props: { answer: 1, tolerance: 0.01, unit: 'A' } }
    },
    {
      id: 'f18q4',
      prompt: 'Zanjirga faqat gʻaltak ulangan. Tok tebranishlari kuchlanishga nisbatan qanday?',
      hint: 'Kondensatordagining teskarisi.',
      explanation: 'Tok kuchlanishdan π/2 ga orqada.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['π/2 ga oldinda', 'π/2 ga orqada', 'π ga oldinda', 'bir xil fazada'], answerIndex: 1 } }
    },
    {
      id: 'f18q5',
      prompt: 'Element va undagi faza munosabatini moslang.',
      hint: 'R — bir fazada.',
      explanation: 'Rezistor — bir fazada; kondensator — tok oldinda; gʻaltak — tok orqada.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'rezistor R', right: 'u va i bir fazada' },
            { left: 'kondensator C', right: 'i π/2 ga oldinda' },
            { left: 'gʻaltak L', right: 'i π/2 ga orqada' }
          ]
        }
      }
    },
    {
      id: 'f18q6',
      prompt: 'Chastota oshganda qarshiligi qanday oʻzgaradi? Guruhlang.',
      hint: 'XL = ωL, XC = 1/(ωC).',
      explanation: 'XL oshadi, XC kamayadi, R oʻzgarmaydi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'u', label: 'Oshadi' },
            { id: 'd', label: 'Kamayadi' },
            { id: 's', label: 'Oʻzgarmaydi' }
          ],
          items: [
            { emoji: '', label: 'induktiv qarshilik XL', bin: 'u' },
            { emoji: '', label: 'sigʻim qarshilik XC', bin: 'd' },
            { emoji: '', label: 'aktiv qarshilik R', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'f18q7',
      prompt: 'Nega gʻaltakli zanjirda oʻzgaruvchan tokda lampa xiraroq yonadi?',
      hint: 'Oʻzgarmas tokda XL = 0.',
      explanation: 'Oʻzgaruvchan tokda oʻzinduksiya EYuK qoʻshimcha induktiv qarshilik hosil qiladi, tok kamayadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Gʻaltak qiziydi', 'Induktiv qarshilik qoʻshiladi', 'Kuchlanish kichik', 'Lampa buzilgan'], answerIndex: 1 } }
    },
    {
      id: 'f18q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'XL ~ ν.',
      explanation: 'XL chastotaga toʻgʻri proporsional; oʻzgarmas tokda XL = 0; induktiv qarshilik ham Ω da.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Chastota 3 marta oshsa, induktiv qarshilik 3 marta oshadi.', value: true },
            { text: 'Oʻzgarmas tok uchun ideal gʻaltakning induktiv qarshiligi nolga teng.', value: true },
            { text: 'Gʻaltak yuqori chastotali tokni oson oʻtkazadi.', value: false },
            { text: 'Induktiv qarshilik henrilarda oʻlchanadi.', value: false }
          ]
        }
      }
    }
  ]
};
