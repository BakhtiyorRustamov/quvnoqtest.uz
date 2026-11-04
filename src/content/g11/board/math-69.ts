import type { BoardLesson } from './types';
import { cone, cylinder } from './geo3d';

/** Darslik (2-qism): Geometriya, 11.2 (128–134-betlar) — konusning hajmi, aylanish jismlari. */
export const MATH_69: BoardLesson = {
  n: 69,
  label: '11.2',
  part: 'geometriya',
  qism: 2,
  title: 'Konusning hajmini topish',
  section: 'Geometriya, 11.2',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Konus shaklidagi idishga 12 santimetr balandlikda suv quyilgan. Uni asosining radiusi xuddi shunday boʻlgan silindrga quysak, suv sathi qancha boʻladi? Javob — 4 santimetr! Chunki konus hajmi bir xil asos va balandlikdagi silindr hajmining uchdan biri, xuddi piramida va prizma kabi.",
      easy: "Konus — bir xil asos va balandlikdagi silindrning uchdan biri.",
      draw: [
        { t: 'title', text: 'Suvni quyamiz' },
        ...cone('k', 22, 60, 12, 36, 'blue'),
        ...cylinder('c', 66, 24, 12, 36, 'ink'),
        { t: 'text', x: 22, y: 66, text: 'H = 12', anchor: 'middle', size: 's' },
        { t: 'text', x: 66, y: 66, text: 'sath = 4', anchor: 'middle', size: 's', color: 'blue' }
      ],
      next: 'Formula'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Konusga ichki va tashqi piramidalar chizamiz. Ichki piramida hajmi konusnikidan kichik, tashqisiniki katta. Asos tomonlari sonini oshirgan sari ikkala hajm bir-biriga yaqinlashadi va asos yuzi doira yuziga intiladi. Natijada: V teng uchdan bir S asos karra H, yaʼni uchdan bir pi r kvadrat H.",
      easy: "V = ⅓ · S asos · H = ⅓ π r² H.",
      draw: [
        { t: 'title', text: 'Konus hajmi' },
        ...cone('k', 24, 58, 16, 36),
        { t: 'line', from: 'kS', to: 'kO', dashed: true, color: 'red', label: 'H' },
        { t: 'line', from: 'kO', to: 'kR', color: 'blue', label: 'r' },
        { t: 'formula', x: 50, y: 24, text: 'V = ⅓ π r² H' },
        { t: 'list', x: 50, y: 40, items: ['ichki piramida < konus', 'konus < tashqi piramida'] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Radiusi 6, balandligi 8 boʻlgan konusning hajmi: uchdan bir pi karra 36 karra 8, yaʼni 96 pi, taxminan 301,6. Agar silindrdan xuddi shunday konus oʻyib olinsa, qolgan jism hajmi: pi karra 36 karra 8, yaʼni 288 pi, minus 96 pi — 192 pi.",
      easy: "V konus = 96π. Silindr minus konus = 288π − 96π = 192π.",
      draw: [
        { t: 'title', text: 'r = 6, H = 8' },
        ...cylinder('c', 24, 22, 14, 36),
        { t: 'point', id: 'ap', x: 24, y: 22, hide: true },
        { t: 'line', from: 'ap', to: 'cb0', color: 'red', dashed: true },
        { t: 'line', from: 'ap', to: 'cb12', color: 'red', dashed: true },
        { t: 'list', x: 50, y: 20, items: ['V konus = ⅓ π · 36 · 8 = 96π', 'V silindr = π · 36 · 8 = 288π'] },
        { t: 'formula', x: 50, y: 48, text: '288π − 96π = 192π' }
      ],
      next: 'Aylanish jismlari'
    },
    {
      kind: 'example',
      clear: true,
      say: "Uchlari (0; 0), (5; 0) va (0; 9) nuqtalarda boʻlgan toʻgʻri burchakli uchburchakni Ox oʻqi atrofida aylantirsak, radiusi 9, balandligi 5 boʻlgan konus hosil boʻladi: hajmi uchdan bir pi karra 81 karra 5, yaʼni 135 pi. Oy oʻqi atrofida esa radius 5, balandlik 9: uchdan bir pi karra 25 karra 9, yaʼni 75 pi. Qaysi katet atrofida aylantirish muhim!",
      easy: "Ox atrofida: 135π, Oy atrofida: 75π.",
      draw: [
        { t: 'title', text: 'Qaysi oʻq atrofida?' },
        { t: 'axes', id: 'g', x: 6, y: 16, w: 36, h: 46, xmin: -1, xmax: 7, ymin: -1, ymax: 10 },
        { t: 'curve', axes: 'g', points: [[0, 0], [5, 0]], color: 'blue' },
        { t: 'curve', axes: 'g', points: [[5, 0], [0, 9]], color: 'blue' },
        { t: 'curve', axes: 'g', points: [[0, 9], [0, 0]], color: 'blue' },
        { t: 'list', x: 50, y: 22, items: ['Ox: r = 9, H = 5 → 135π', 'Oy: r = 5, H = 9 → 75π'] }
      ],
      next: 'Oʻxshash konuslar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Konusni asosiga parallel tekislik bilan kessak, oʻxshash kichik konus hosil boʻladi. Yuzlar nisbati k kvadrat, hajmlar nisbati k kub. Masalan, kichik konusning balandligi kattasinikidan ikki marta kichik boʻlsa, hajmi sakkiz marta kichik.",
      easy: "Oʻxshash konuslar: S₁/S = k², V₁/V = k³. k = ½ → hajm ⅛.",
      draw: [
        { t: 'title', text: 'Oʻxshash konuslar' },
        ...cone('k', 24, 60, 16, 40),
        { t: 'ellipse', cx: 24, cy: 40, rx: 8, ry: 2.56, color: 'blue' },
        { t: 'formula', x: 50, y: 22, text: 'V₁ / V = k³' },
        { t: 'list', x: 50, y: 38, items: ['k = ½ → V₁ = V/8', 'k = ⅓ → V₁ = V/27'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Konus hajmi: V = ⅓ S asos H = ⅓ π r² H — bir xil asos va balandlikdagi silindrning uchdan biri.',
    'Toʻgʻri burchakli uchburchak kateti atrofida aylansa, konus hosil boʻladi: radius — ikkinchi katet.',
    'Parallel kesim oʻxshash konus ajratadi: V₁/V = k³.'
  ],
  questions: [
    {
      id: 'g69q1',
      prompt: 'Konusning balandligi 12, oʻq kesimining perimetri 36. Hajmi k·π. k = ?',
      hint: '2l + 2r = 36, l² = r² + 144.',
      explanation: 'l = 18 − r → 324 − 36r = 144 → r = 5. V = ⅓ π · 25 · 12 = 100π.',
      widget: { type: 'number_answer', props: { answer: 100 } }
    },
    {
      id: 'g69q2',
      prompt: 'Konusning yasovchisi 6, u asos tekisligi bilan 30° burchak hosil qiladi. Hajmi k·π. k = ?',
      hint: 'H = 6 · sin 30° = 3, r = 6 · cos 30° = 3√3.',
      explanation: 'V = ⅓ π · 27 · 3 = 27π.',
      widget: { type: 'number_answer', props: { answer: 27 } }
    },
    {
      id: 'g69q3',
      prompt: 'Konus shaklidagi idishda suv sathi 12 cm. Suv shunday radiusli silindrga quyilsa, sath necha cm boʻladi?',
      hint: '⅓ π r² · 12 = π r² · h.',
      explanation: 'h = 4 cm.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'cm' } }
    },
    {
      id: 'g69q4',
      prompt: 'Konusga balandligi konusnikidan 2 marta kichik silindr ichki chizilgan. Konus hajmi 48. Silindr hajmini toping.',
      hint: 'Silindr radiusi r/2, balandligi H/2; π r² H = 144.',
      explanation: 'V = π (r/2)² (H/2) = π r² H / 8 = 18.',
      widget: { type: 'number_answer', props: { answer: 18 } }
    },
    {
      id: 'g69q5',
      prompt: 'Kichik konusning uchi katta konus asosining markazida, balandligi esa ikki marta kichik (asoslari parallel, yasovchilari ustma-ust). Katta konus hajmi kichiginikidan necha marta katta?',
      hint: 'k = ½.',
      explanation: '(2)³ = 8 marta.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'g69q6',
      prompt: 'Uchlari (0; 0), (6; 0), (6; 4) boʻlgan uchburchak Ox oʻqi atrofida aylantirildi. Hosil boʻlgan konus hajmi k·π. k = ?',
      hint: 'Radius 4, balandlik 6.',
      explanation: '⅓ π · 16 · 6 = 32π.',
      widget: { type: 'number_answer', props: { answer: 32 } }
    },
    {
      id: 'g69q7',
      prompt: 'Konus hajmlarini kichigidan kattasiga tartiblang.',
      hint: 'V = ⅓ π r² H.',
      explanation: 'r=1,H=3: π; r=2,H=3: 4π; r=3,H=2: 6π; r=3,H=4: 12π.',
      widget: { type: 'order_line', props: { items: [{ label: 'r = 1, H = 3' }, { label: 'r = 2, H = 3' }, { label: 'r = 3, H = 2' }, { label: 'r = 3, H = 4' }] } }
    },
    {
      id: 'g69q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'V = ⅓ π r² H.',
      explanation: 'Radius 2 marta oshsa hajm 4 marta; balandlik 2 marta oshsa 2 marta; konus = ⅓ silindr.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Konus radiusi 2 marta oshsa, hajmi 4 marta oshadi.', value: true },
            { text: 'Konus balandligi 2 marta oshsa, hajmi 4 marta oshadi.', value: false },
            { text: 'Asosi va balandligi bir xil silindr hajmi konusnikidan 3 marta katta.', value: true },
            { text: 'Konus hajmi π r² H ga teng.', value: false }
          ]
        }
      }
    }
  ]
};
