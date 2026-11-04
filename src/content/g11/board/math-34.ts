import type { BoardLesson } from './types';
import { cuboid, pt } from './geo3d';

const O: [number, number] = [20, 58];

/** Darslik: Geometriya, 7-mavzu (161–165-betlar) — prizmaning hajmi. */
export const MATH_34: BoardLesson = {
  n: 34,
  label: "7",
  part: 'geometriya',
  title: "Prizma hajmini topish",
  section: 'Geometriya, 7',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Akvarium sotib oldingiz: uzunligi 50, eni 30, balandligi 40 santimetr. Unga necha litr suv sigʻadi? 50 karra 30 karra 40 teng 60 ming kub santimetr. 1 litr — 1000 kub santimetr, demak 60 litr. Bugun har qanday prizmaning hajmini topishni oʻrganamiz.",
      easy: "Akvarium hajmi: 50 · 30 · 40 = 60 000 sm³ = 60 litr.",
      draw: [
        { t: 'title', text: 'Akvariumga necha litr?' },
        ...cuboid('a', [2.5, 6, 4], [14, 60], 6, {}, 'blue'),
        { t: 'icon', x: 36, y: 40, emoji: '🐟', size: 'm' },
        { t: 'formula', x: 58, y: 22, text: 'V = 50·30·40' },
        { t: 'text', x: 58, y: 38, text: '= 60 000 sm³', color: 'blue' },
        { t: 'box', id: 'r', x: 58, y: 46, w: 34, h: 11, text: '60 litr', color: 'green' }
      ],
      next: 'Formula qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻgʻri burchakli parallelepipedning hajmi uning uchta oʻlchami koʻpaytmasiga teng: V teng a karra b karra c. Buni birlik kubchalar bilan tasavvur qilish oson: pastki qatlamda a karra b ta kubcha, bunday qatlamlar c ta. a karra b — asos yuzi, c — balandlik. Demak, V teng S karra h.",
      easy: "Hajm: uzunlik · eni · balandlik. Yoki asos yuzi · balandlik.",
      draw: [
        { t: 'title', text: 'Parallelepiped hajmi' },
        ...cuboid('c', [2, 4, 3], [18, 58], 7, {}, 'orange'),
        { t: 'formula', x: 58, y: 22, text: 'V = a·b·c' },
        { t: 'formula', x: 58, y: 38, text: 'V = S asos · h' },
        { t: 'text', x: 58, y: 56, text: '4·2 kubcha × 3 qatlam = 24', size: 's', color: 'purple' }
      ],
      next: 'Har qanday prizma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bu formula har qanday prizma uchun toʻgʻri: prizmaning hajmi asosining yuzi bilan balandligining koʻpaytmasiga teng. Toʻgʻri burchakli uchburchakli prizmani ikkita qoʻshib, parallelepiped hosil qilamiz — shuning uchun uning hajmi parallelepipedning yarmi. Har qanday prizmani esa uchburchakli prizmalarga boʻlish mumkin.",
      easy: "Har qanday prizma: V = S asos · h.",
      draw: [
        { t: 'title', text: 'Har qanday prizma' },
        pt('A', [3, 0, 0], undefined, O, 6),
        pt('B', [3, 5, 0], undefined, O, 6),
        pt('C', [0, 0, 0], undefined, O, 6),
        pt('A1', [3, 0, 5], undefined, O, 6),
        pt('B1', [3, 5, 5], undefined, O, 6),
        pt('C1', [0, 0, 5], undefined, O, 6),
        { t: 'line', from: 'A', to: 'B' },
        { t: 'line', from: 'A', to: 'C', dashed: true },
        { t: 'line', from: 'B', to: 'C', dashed: true },
        { t: 'line', from: 'C', to: 'C1', dashed: true },
        { t: 'line', from: 'A', to: 'A1' },
        { t: 'line', from: 'B', to: 'B1' },
        { t: 'polygon', points: ['A1', 'B1', 'C1'], color: 'green' },
        { t: 'box', id: 'f', x: 58, y: 24, w: 36, h: 14, text: 'V = S · h', color: 'blue' },
        { t: 'text', x: 58, y: 50, text: '2 ta uchburchakli prizma', size: 's' },
        { t: 'text', x: 58, y: 58, text: '= parallelepiped', size: 's', color: 'purple' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Toʻgʻri prizmaning asosi — katetlari 6 va 8 boʻlgan toʻgʻri burchakli uchburchak, balandligi 5. Asos yuzi yarim karra 6 karra 8 teng 24. Hajm 24 karra 5 teng 120. Gipotenuza 10 boʻlgani uchun yon sirt ham oson: perimetr 24, yon sirt 24 karra 5 teng 120.",
      easy: "Asos yuzi 24, hajm 24 · 5 = 120.",
      draw: [
        { t: 'title', text: 'Uchburchakli prizma' },
        { t: 'list', x: 6, y: 20, items: ['katetlar 6 va 8, h = 5', 'S asos = ½·6·8 = 24', 'V = 24·5 = 120'] },
        { t: 'box', id: 'r', x: 6, y: 48, w: 30, h: 11, text: 'V = 120', color: 'green' }
      ],
      next: 'Kub misoli'
    },
    {
      kind: 'example',
      clear: true,
      say: "Kubning qirralarini 1 birlik orttirilsa, uning hajmi 19 birlikka ortadi. Kubning qirrasini toping. a plyus 1 ning kubi minus a kub teng 19. Qavslarni ochsak: 3a kvadrat plyus 3a plyus 1 teng 19, yaʼni a kvadrat plyus a minus 6 teng 0. Musbat ildiz a teng 2. Tekshiramiz: 27 minus 8 teng 19.",
      easy: "(a + 1)³ − a³ = 19 dan a = 2. Tekshirish: 27 − 8 = 19.",
      draw: [
        { t: 'title', text: 'Kub qirrasi' },
        { t: 'formula', x: 6, y: 20, text: '(a + 1)³ − a³ = 19' },
        { t: 'list', x: 6, y: 34, items: ['3a² + 3a + 1 = 19', 'a² + a − 6 = 0  →  a = 2'] },
        { t: 'box', id: 'r', x: 6, y: 52, w: 46, h: 11, text: 'tekshirish: 27 − 8 = 19', color: 'green' }
      ],
      next: 'Ogʻma parallelepiped'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 1-masala: toʻgʻri parallelepiped asosining tomonlari a va b, ular 30 gradus burchak tashkil qiladi, yon sirt S. Yon sirt 2 karra a plyus b karra h, demak h teng S boʻlinsin 2 karra a plyus b. Asos yuzi a karra b karra sinus 30, yaʼni ab boʻlinsin 2. Hajm: ab S boʻlinsin 4 karra a plyus b.",
      easy: "Balandlikni yon sirtdan, asos yuzini sinus orqali topib, koʻpaytiramiz.",
      draw: [
        { t: 'title', text: '1-masala' },
        { t: 'list', x: 6, y: 20, items: ['S = 2(a + b)·h  →  h = S/(2(a + b))', 'S asos = ab·sin 30° = ab/2'] },
        { t: 'formula', x: 6, y: 44, text: 'V = abS / (4(a + b))' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Toʻgʻri burchakli parallelepiped: V = a·b·c.',
    'Har qanday prizma: V = S asos · h.',
    '1 litr = 1000 sm³ = 1 dm³.'
  ],
  questions: [
    {
      id: 'm34q1',
      prompt: 'Akvarium 60 × 40 × 50 sm. Unga necha litr suv sigʻadi?',
      hint: '1 l = 1000 sm³.',
      explanation: '120 000 sm³ = 120 l.',
      widget: { type: 'number_answer', props: { answer: 120, unit: 'l' } }
    },
    {
      id: 'm34q2',
      prompt: 'Parallelepiped yogʻining yuzi 12, unga perpendikulyar qirra 12. Hajmini toping.',
      hint: 'V = S·h.',
      explanation: '12 · 12 = 144.',
      widget: { type: 'number_answer', props: { answer: 144 } }
    },
    {
      id: 'm34q3',
      prompt: 'Parallelepiped hajmi 60, bir yogʻining yuzi 12. Shu yoqqa perpendikulyar qirrani toping.',
      hint: 'h = V/S.',
      explanation: '60 : 12 = 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'm34q4',
      prompt: 'Qirralari 4, 6 va 9 boʻlgan parallelepipedga tengdosh (hajmi teng) kubning qirrasini toping.',
      hint: '4·6·9 = 216.',
      explanation: '∛216 = 6.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'm34q5',
      prompt: 'Kubning hajmi 8. Uning toʻla sirtini toping.',
      hint: 'Avval qirrani toping.',
      explanation: 'a = 2, S = 6·4 = 24.',
      widget: { type: 'number_answer', props: { answer: 24 } }
    },
    {
      id: 'm34q6',
      prompt: 'Muntazam toʻrtburchakli prizmaning asos tomoni 3, balandligi 7. Hajmini toping.',
      hint: 'S asos = 9.',
      explanation: '9 · 7 = 63.',
      widget: { type: 'number_answer', props: { answer: 63 } }
    },
    {
      id: 'm34q7',
      prompt: 'Jismlarni hajmi kichigidan kattasiga qarab tartiblang.',
      hint: 'Har birining hajmini hisoblang: 8, 24, 60, 125.',
      explanation: 'Kub 2 → 8; 2×3×4 → 24; 3×4×5 → 60; kub 5 → 125.',
      widget: { type: 'order_line', props: { items: [{ label: 'kub, a = 2' }, { label: '2 × 3 × 4' }, { label: '3 × 4 × 5' }, { label: 'kub, a = 5' }] } }
    },
    {
      id: 'm34q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Hajm qanday oʻzgaradi?',
      explanation: 'V = S·h har qanday prizma uchun; qirra 2 marta oshsa, kub hajmi 8 marta oshadi; 1 l = 1000 sm³.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Har qanday prizmaning hajmi V = S·h.', value: true },
            { text: 'Kubning qirrasi 2 marta oshsa, hajmi 2 marta oshadi.', value: false },
            { text: '1 litr = 1000 sm³.', value: true },
            { text: 'Ogʻma prizma hajmini hisoblashda yon qirra uzunligi balandlik oʻrnida olinadi.', value: false }
          ]
        }
      }
    }
  ]
};
