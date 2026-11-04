import type { BoardLesson } from './types';
import { cylinder } from './geo3d';

/** Darslik: Geometriya, 8-mavzu (175–181-betlar) — silindrning hajmi. */
export const MATH_36: BoardLesson = {
  n: 36,
  label: "8.2",
  part: 'geometriya',
  title: "Silindr hajmini topish",
  section: 'Geometriya, 8',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Bir xil koʻrinadigan ikki stakan bor: biri ingichka va baland, ikkinchisi keng va past. Qaysi biriga koʻproq choy sigʻadi? Koʻz aldaydi! Javob radius va balandlikka bogʻliq, va radius kvadratda qatnashadi. Bugun silindr hajmini hisoblashni oʻrganamiz.",
      easy: "Qaysi stakanga koʻproq sigʻadi? Radius kvadratda qatnashadi, shuning uchun keng idish koʻproq oladi.",
      draw: [
        { t: 'title', text: 'Qaysiga koʻproq sigʻadi?' },
        ...cylinder('a', 22, 18, 7, 40, 'blue'),
        ...cylinder('b', 62, 34, 16, 22, 'orange'),
        { t: 'text', x: 14, y: 66, text: 'r = 3, h = 12', size: 's' },
        { t: 'text', x: 50, y: 66, text: 'r = 6, h = 4', size: 's' }
      ],
      next: 'Formula qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Silindrga ichki chizilgan muntazam prizma tomonlari sonini oshirib borsak, prizma silindrga tobora yaqinlashadi. Prizma hajmi asos yuzi karra balandlik edi. Chegarada asos — doira, yuzi pi r kvadrat. Shuning uchun silindrning hajmi asosi yuzi bilan yasovchisi koʻpaytmasiga teng: V teng pi r kvadrat h.",
      easy: "Silindr hajmi ham asos yuzi karra balandlik: V = πr²h.",
      draw: [
        { t: 'title', text: 'Silindr hajmi' },
        ...cylinder('c', 24, 22, 15, 34, 'green'),
        { t: 'box', id: 'f', x: 50, y: 24, w: 40, h: 14, text: 'V = πr²·h', color: 'blue' },
        { t: 'text', x: 50, y: 50, text: 'prizma tomonlari ko‘paysa', size: 's' },
        { t: 'text', x: 50, y: 58, text: '→ silindrga yaqinlashadi', size: 's', color: 'purple' }
      ],
      next: 'Stakanlarni solishtiramiz'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ingichka stakan: r teng 3, h teng 12. Hajm pi karra 9 karra 12 teng 108 pi. Keng stakan: r teng 6, h teng 4. Hajm pi karra 36 karra 4 teng 144 pi. Keng va past stakanga koʻproq sigʻadi, garchi u uch marta past boʻlsa ham.",
      easy: "108π va 144π — keng stakan yutdi.",
      draw: [
        { t: 'title', text: 'Solishtiramiz' },
        { t: 'list', x: 6, y: 20, items: ['V₁ = π·3²·12 = 108π', 'V₂ = π·6²·4 = 144π'] },
        { t: 'box', id: 'r', x: 6, y: 42, w: 50, h: 12, text: '144π > 108π', color: 'green' },
        { t: 'text', x: 6, y: 62, text: 'radius kvadratda qatnashadi!', color: 'red' }
      ],
      next: 'Sharbat idishi'
    },
    {
      kind: 'example',
      clear: true,
      say: "Oʻtgan darsdagi sharbat idishi: r teng 5 santimetr, h teng 20 santimetr. V teng pi karra 25 karra 20 teng 500 pi, taxminan 1571 kub santimetr, yaʼni qariyb 1,57 litr. Idishdagi suv sathi masalasi: suv sathi 16 santimetr. Uni diametri 2 marta kichik idishga quysak, asos yuzi 4 marta kichrayadi, demak sath 4 marta koʻtariladi — 64 santimetr.",
      easy: "500π ≈ 1571 sm³ ≈ 1,57 l. Diametr 2 marta kichik boʻlsa, suv sathi 4 marta baland.",
      draw: [
        { t: 'title', text: 'Idishlar' },
        { t: 'list', x: 6, y: 20, items: ['V = π·25·20 = 500π ≈ 1571 sm³', '≈ 1,57 litr'] },
        { t: 'text', x: 6, y: 44, text: 'd₂ = d₁/2  →  S₂ = S₁/4', color: 'blue' },
        { t: 'box', id: 'r', x: 6, y: 52, w: 52, h: 11, text: 'sath: 16 · 4 = 64 sm', color: 'green' }
      ],
      next: 'Oʻzgarsa-chi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "Birinchi silindr hajmi 12 kub metr. Ikkinchisining balandligi 3 marta katta, asos radiusi esa 2 marta kichik. Hajm h ga proporsional — 3 marta oshadi; r kvadratga proporsional — 4 marta kamayadi. Natija: 12 karra 3 boʻlinsin 4 teng 9 kub metr.",
      easy: "Balandlik 3 marta, radius kvadrati 4 marta kamayadi: 12 · 3 / 4 = 9.",
      draw: [
        { t: 'title', text: 'Hajm qanday oʻzgaradi?' },
        { t: 'list', x: 6, y: 20, items: ['h × 3  →  V × 3', 'r : 2  →  V : 4'] },
        { t: 'formula', x: 6, y: 42, text: 'V₂ = 12·3/4 = 9 m³' }
      ],
      next: 'Prizma va silindr'
    },
    {
      kind: 'example',
      clear: true,
      say: "Prizma va silindr birga ham uchraydi. Asos tomoni a boʻlgan kvadratli prizmaga ichki chizilgan silindr radiusi a ning yarmi. Masalan, asos radiusi 1 va balandligi 1 boʻlgan silindrga tashqi chizilgan kub: tomoni 2, balandligi 1, hajmi 4. Silindr hajmi esa pi — prizma hajmining taxminan 79 foizi.",
      easy: "Silindr kvadratli prizmaga ichki chizilsa, r = a/2. Kub hajmi 4, silindr hajmi π.",
      draw: [
        { t: 'title', text: 'Prizmaga ichki chizilgan silindr' },
        { t: 'list', x: 6, y: 20, items: ['r = 1, h = 1', 'prizma asosi: 2 × 2, V = 4', 'silindr: V = π ≈ 3,14'] },
        { t: 'box', id: 'r', x: 6, y: 50, w: 50, h: 11, text: 'π/4 ≈ 79%', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Silindr hajmi: V = πr²h (asos yuzi × balandlik).',
    'Hajm balandlikka proporsional, radiusning kvadratiga proporsional.',
    '1 l = 1000 sm³; idish diametri 2 marta kichik boʻlsa, oʻsha suvning sathi 4 marta baland.'
  ],
  questions: [
    {
      id: 'm36q1',
      prompt: 'Radiusi 2, balandligi 5 boʻlgan silindr hajmi kπ. k ni toping.',
      hint: 'V = πr²h.',
      explanation: '4 · 5 = 20 → 20π.',
      widget: { type: 'number_answer', props: { answer: 20 } }
    },
    {
      id: 'm36q2',
      prompt: 'Silindr hajmi 12 m³. Ikkinchi silindr balandligi 3 marta katta, radiusi 2 marta kichik. Ikkinchi silindr hajmi necha m³?',
      hint: '12 · 3 / 4.',
      explanation: '9 m³.',
      widget: { type: 'number_answer', props: { answer: 9, unit: 'm³' } }
    },
    {
      id: 'm36q3',
      prompt: 'Idishdagi suv sathi 16 sm. Suvni diametri 2 marta kichik idishga quyishdi. Yangi sath necha sm?',
      hint: 'Asos yuzi 4 marta kichik.',
      explanation: '16 · 4 = 64 sm.',
      widget: { type: 'number_answer', props: { answer: 64, unit: 'sm' } }
    },
    {
      id: 'm36q4',
      prompt: 'Silindr radiusi 2 marta oshirilsa, hajmi necha marta oshadi?',
      hint: 'V ~ r².',
      explanation: '2² = 4 marta.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'm36q5',
      prompt: 'Idishlarni hajmi kichigidan kattasiga qarab tartiblang.',
      hint: 'r²h ni hisoblang: 8, 18, 27, 36.',
      explanation: 'r = 2, h = 2 → 8π; r = 3, h = 2 → 18π; r = 3, h = 3 → 27π; r = 6, h = 1 → 36π.',
      widget: { type: 'order_line', props: { items: [{ label: 'r = 2, h = 2' }, { label: 'r = 3, h = 2' }, { label: 'r = 3, h = 3' }, { label: 'r = 6, h = 1' }] } }
    },
    {
      id: 'm36q6',
      prompt: 'Silindr hajmi 50π, radiusi 5. Balandligini toping.',
      hint: '25π · h = 50π.',
      explanation: 'h = 2.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'm36q7',
      prompt: 'Kartalarni ochib, har bir silindrni hajmi bilan juftlang.',
      hint: 'V = πr²h.',
      explanation: 'r = 1, h = 3 → 3π; r = 2, h = 1 → 4π; r = 3, h = 1 → 9π; r = 2, h = 3 → 12π.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'r = 1, h = 3' }, b: { label: '3π' } },
            { a: { label: 'r = 2, h = 1' }, b: { label: '4π' } },
            { a: { label: 'r = 3, h = 1' }, b: { label: '9π' } },
            { a: { label: 'r = 2, h = 3' }, b: { label: '12π' } }
          ]
        }
      }
    },
    {
      id: 'm36q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Hajm r² va h ga qanday bogʻliq?',
      explanation: 'V = πr²h; balandlik 2 marta oshsa hajm 2 marta; radius 2 marta oshsa — 4 marta; prizmaga ichki chizilgan silindr hajmi prizmanikidan kichik.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Silindr hajmi V = πr²h.', value: true },
            { text: 'Radius 2 marta oshsa, hajm 2 marta oshadi.', value: false },
            { text: 'Balandlik 3 marta oshsa, hajm 3 marta oshadi.', value: true },
            { text: 'Prizmaga ichki chizilgan silindr hajmi prizma hajmidan katta.', value: false }
          ]
        }
      }
    }
  ]
};
