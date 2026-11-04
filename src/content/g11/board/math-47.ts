import type { BoardLesson } from './types';

/** Darslik (2-qism): 57–58-mavzu (29–32-betlar) — takrorli va takrorsiz oʻrinlashtirishlar, oʻrin almashtirishlar. */
export const MATH_47: BoardLesson = {
  n: 47,
  label: '58',
  part: 'algebra',
  qism: 2,
  title: 'Oʻrinlashtirishlar va oʻrin almashtirishlar',
  section: '57–58',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Futbol jamoasida 11 nafar oʻyinchi. Murabbiy sardor va uning yordamchisini tayinlamoqchi. Sardor 11 kishidan biri, yordamchi esa qolgan 10 kishidan biri. Jami 11 karra 10, yaʼni 110 usul. Bu yerda tartib muhim: Ali sardor, Vali yordamchi — Vali sardor, Ali yordamchi boʻlganidan farq qiladi.",
      easy: "Sardor 11 usulda, yordamchi 10 usulda: 110. Tartib muhim.",
      draw: [
        { t: 'title', text: 'Sardor va yordamchi' },
        { t: 'icon', x: 10, y: 30, emoji: '⚽', size: 'l' },
        { t: 'list', x: 30, y: 22, items: ['sardor: 11 usul', 'yordamchi: 10 usul', '2-yordamchi: 9 usul'] },
        { t: 'box', id: 'r', x: 30, y: 50, w: 50, h: 12, text: '11·10 = 110,  11·10·9 = 990', color: 'green' }
      ],
      next: 'Takrorli tanlov'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Xonada 5 ta chiroq bor, har biri yonadi yoki yonmaydi. Har bir chiroqda 2 ta imkoniyat, jami 2 karra 2 karra 2 karra 2 karra 2, yaʼni 2 ning 5-darajasi teng 32 usul. Umuman, n ta elementli toʻplamning qism toʻplamlari soni 2 ning n-darajasiga teng: har bir element yo kiradi, yo kirmaydi.",
      easy: "Har bir chiroq 2 holatda: 2⁵ = 32. n elementli toʻplamning 2ⁿ ta qism toʻplami bor.",
      draw: [
        { t: 'title', text: '5 ta chiroq' },
        { t: 'icon', x: 8, y: 22, emoji: '💡', size: 'm' },
        { t: 'icon', x: 20, y: 22, emoji: '💡', size: 'm' },
        { t: 'icon', x: 32, y: 22, emoji: '💡', size: 'm' },
        { t: 'icon', x: 44, y: 22, emoji: '💡', size: 'm' },
        { t: 'icon', x: 56, y: 22, emoji: '💡', size: 'm' },
        { t: 'formula', x: 8, y: 40, text: '2 · 2 · 2 · 2 · 2 = 2⁵ = 32' },
        { t: 'text', x: 8, y: 58, text: 'qism toʻplamlar soni: 2ⁿ', color: 'purple' }
      ],
      next: 'Takrorsiz oʻrinlashtirish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "n ta elementdan k tasini tanlab, tartib bilan qoʻyish — takrorsiz oʻrinlashtirish deyiladi. Birinchi oʻringa n usul, ikkinchisiga n minus 1, va hokazo, k-oʻringa n minus k plyus 1 usul. Demak, A n k teng n karra n minus 1 karra ... karra n minus k plyus 1. Masalan, barcha raqamlari har xil yetti xonali telefon raqamlari: 10 karra 9 karra ... karra 4.",
      easy: "Tartib bilan tanlash: n · (n − 1) · … — k ta koʻpaytuvchi.",
      draw: [
        { t: 'title', text: 'Takrorsiz oʻrinlashtirish' },
        { t: 'formula', x: 6, y: 20, text: 'Aₙᵏ = n(n − 1)(n − 2)…(n − k + 1)' },
        { t: 'list', x: 6, y: 36, items: ['A₁₁² = 11·10 = 110', 'A₅³ = 5·4·3 = 60', 'telefon: 10·9·8·7·6·5·4'] }
      ],
      next: 'Takrorli boʻlsa-chi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar elementlar takrorlanishi mumkin boʻlsa, har bir oʻringa yana n usul qoladi — takrorli oʻrinlashtirishlar soni n ning k-darajasi. 14-masala: faqat toq raqamlardan iborat «chiroyli» toʻrt xonali sonlar: 5 ning 4-darajasi, yaʼni 625 ta.",
      easy: "Takrorlanishi mumkin boʻlsa: nᵏ. Toq raqamli toʻrt xonali sonlar 5⁴ = 625.",
      draw: [
        { t: 'title', text: 'Takrorli oʻrinlashtirish' },
        { t: 'formula', x: 6, y: 22, text: 'n · n · … · n = nᵏ' },
        { t: 'list', x: 6, y: 42, items: ['«chiroyli» sonlar: 5·5·5·5 = 625', 'raqamlar: 1, 3, 5, 7, 9'] }
      ],
      next: 'Hammasini qatorga'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hamma elementni bir qatorga terish — oʻrin almashtirish. Qizil, qora, koʻk va yashil sharlarni 4 karra 3 karra 2 karra 1 usulda terish mumkin. 1 dan n gacha sonlar koʻpaytmasi n faktorial deyiladi va n undov belgisi bilan yoziladi. 7 nafar oʻquvchi navbatga 7 faktorial, yaʼni 5040 usulda turishi mumkin.",
      easy: "n ta narsani qatorga terish: n! = 1 · 2 · … · n. 7! = 5040.",
      draw: [
        { t: 'title', text: 'Oʻrin almashtirish: n!' },
        { t: 'formula', x: 6, y: 20, text: 'n! = 1 · 2 · 3 · … · n' },
        {
          t: 'table',
          x: 8,
          y: 34,
          rows: [
            ['n', '3', '4', '5', '6', '7'],
            ['n!', '6', '24', '120', '720', '5040']
          ]
        }
      ],
      next: 'Farqini eslab qolamiz'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Xulosa. Tartib muhim, takrorlanmaydi — A n k. Tartib muhim, takrorlanishi mumkin — n ning k-darajasi. Hammasi qatorga teriladi — n faktorial. Oltita rangdan uch rangli bayroq: 6 karra 5 karra 4 teng 120. Toʻrtta chiroq: 2 ning 4-darajasi teng 16.",
      easy: "Uchta formula: Aₙᵏ, nᵏ va n!.",
      draw: [
        { t: 'title', text: 'Qaysi formula?' },
        {
          t: 'table',
          x: 8,
          y: 18,
          rows: [
            ['holat', 'formula', 'misol'],
            ['tartib bor, takror yoʻq', 'Aₙᵏ', 'bayroq: 6·5·4 = 120'],
            ['tartib bor, takror bor', 'nᵏ', '4 chiroq: 2⁴ = 16'],
            ['hammasi qatorga', 'n!', '5 kitob: 120']
          ]
        }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Takrorsiz oʻrinlashtirish: Aₙᵏ = n(n − 1)…(n − k + 1).',
    'Takrorli oʻrinlashtirish: nᵏ; n elementli toʻplamning qism toʻplamlari soni 2ⁿ.',
    'Oʻrin almashtirish: n! = 1 · 2 · … · n.'
  ],
  questions: [
    {
      id: 'p47q1',
      prompt: '4 ta chiroqli xonani necha usulda yoritish mumkin (har biri yonadi yoki yonmaydi)?',
      hint: '2⁴.',
      explanation: '16 usul.',
      widget: { type: 'number_answer', props: { answer: 16 } }
    },
    {
      id: 'p47q2',
      prompt: 'A₆² ni hisoblang.',
      hint: '6 · 5.',
      explanation: '30.',
      widget: { type: 'number_answer', props: { answer: 30 } }
    },
    {
      id: 'p47q3',
      prompt: '6 nafar kishi navbatga necha usulda turishi mumkin?',
      hint: '6!.',
      explanation: '720.',
      widget: { type: 'number_answer', props: { answer: 720 } }
    },
    {
      id: 'p47q4',
      prompt: '6 xil rangli matodan uch rangli (gorizontal yoʻlli) bayroqni necha usulda tikish mumkin?',
      hint: 'Ranglar takrorlanmaydi, tartib muhim.',
      explanation: 'A₆³ = 6 · 5 · 4 = 120.',
      widget: { type: 'number_answer', props: { answer: 120 } }
    },
    {
      id: 'p47q5',
      prompt: '1, 2, 3, 4, 5 raqamlaridan (takrorlanishi mumkin) nechta uch xonali son tuzish mumkin?',
      hint: 'nᵏ.',
      explanation: '5³ = 125.',
      widget: { type: 'number_answer', props: { answer: 125 } }
    },
    {
      id: 'p47q6',
      prompt: 'Faktoriallarni qiymati boʻyicha tartiblang.',
      hint: '3! = 6, 4! = 24, 5! = 120, 6! = 720.',
      explanation: '3! < 4! < 5! < 6!.',
      widget: { type: 'order_line', props: { items: [{ label: '3!' }, { label: '4!' }, { label: '5!' }, { label: '6!' }] } }
    },
    {
      id: 'p47q7',
      prompt: 'Har bir masalaga formulani moslang.',
      hint: 'Tartib va takror bormi?',
      explanation: 'Navbat — n!; chiroqlar — 2ⁿ; sardor va yordamchi — Aₙ²; toq raqamli sonlar — 5ᵏ.',
      widget: {
        type: 'match_pairs',
        props: { pairs: [{ left: '7 oʻquvchi navbatda', right: '7!' }, { left: '5 chiroq', right: '2⁵' }, { left: 'sardor va yordamchi (11 kishi)', right: 'A₁₁²' }, { left: 'toq raqamli 4 xonali sonlar', right: '5⁴' }] }
      }
    },
    {
      id: 'p47q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Faktorial taʼrifini eslang.',
      explanation: '5! = 120; Aₙⁿ = n!; 10 elementli toʻplamning qism toʻplamlari 1024 ta; oʻrinlashtirishda tartib muhim.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '5! = 120.', value: true },
            { text: 'Oʻrinlashtirishda tartib muhim emas.', value: false },
            { text: '10 elementli toʻplamning 1024 ta qism toʻplami bor.', value: true },
            { text: 'A₄² = 16.', value: false }
          ]
        }
      }
    }
  ]
};
