import type { BoardLesson } from './types';

/** p(x) = −x² + 100x (ming soʻm) */
const P100: [number, number][] = [[0, 0], [10, 900], [20, 1600], [30, 2100], [40, 2400], [50, 2500], [60, 2400], [70, 2100], [80, 1600], [90, 900], [100, 0]];
/** a(t) = −t² + 6t */
const A6: [number, number][] = [[0, 0], [1, 5], [2, 8], [3, 9], [4, 8], [5, 5], [6, 0]];

/** Darslik: 22–25-mavzu (51–55-betlar) — fizik va iqtisodiy mazmunli ekstremal masalalar. */
export const MATH_17: BoardLesson = {
  n: 17,
  label: "24–25",
  part: 'algebra',
  title: "Fizika va iqtisoddagi eng katta va eng kichik qiymatlar",
  section: '22–25',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Karima koʻylak tikadi. Koʻproq tiksa, koʻproq pul topadimi? Har doim emas: material qimmatlashadi, vaqt yetmaydi, sifat tushadi. Bir oyda x ta koʻylak tiksa, daromadi p(x) teng minus x kvadrat plyus 100x ming soʻm. Qachon daromad eng katta? Bugun fizika va iqtisoddagi shunday savollarni hosila bilan yechamiz.",
      easy: "Juda kam tiksa — daromad kam, juda koʻp tiksa — xarajat oshib ketadi. Eng yaxshi son bor, uni hosila topadi.",
      draw: [
        { t: 'title', text: 'Karimaning daromadi' },
        { t: 'icon', x: 10, y: 30, emoji: '👗', size: 'l' },
        { t: 'formula', x: 26, y: 22, text: 'p(x) = −x² + 100x' },
        { t: 'text', x: 28, y: 38, text: 'x — bir oyda tikilgan koʻylaklar soni', size: 's' },
        { t: 'text', x: 28, y: 46, text: 'p — daromad, ming soʻm', size: 's' },
        { t: 'text', x: 28, y: 60, text: 'Nechta tiksa, daromad eng katta?', color: 'purple' }
      ],
      next: 'Avval fizika'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Fizikadan eslaymiz: yoʻl s(t) dan olingan hosila — tezlik, tezlikdan olingan hosila — tezlanish. Demak, tezlik eng katta yoki eng kichik boʻladigan vaqtni topish uchun tezlanishni nolga tenglaymiz. Tezlanish eng katta boʻladigan vaqtni topish uchun esa tezlanishning hosilasini nolga tenglaymiz.",
      easy: "Yoʻl, tezlik, tezlanish — har biri oldingisining hosilasi. Eng katta yoki eng kichik qiymat uchun keyingisini nolga tenglaymiz.",
      draw: [
        { t: 'title', text: 'Yoʻl → tezlik → tezlanish' },
        { t: 'box', id: 's', x: 6, y: 24, w: 24, h: 12, text: 's(t) yoʻl', color: 'blue' },
        { t: 'box', id: 'v', x: 38, y: 24, w: 24, h: 12, text: 'v(t) = s′(t)', color: 'green' },
        { t: 'box', id: 'a', x: 70, y: 24, w: 26, h: 12, text: 'a(t) = v′(t)', color: 'orange' },
        { t: 'arrow', from: 's', to: 'v', label: 'hosila' },
        { t: 'arrow', from: 'v', to: 'a', label: 'hosila' },
        { t: 'list', x: 6, y: 48, items: ['v eng katta / kichik  →  a(t) = 0', 'a eng katta  →  a′(t) = 0'] }
      ],
      next: '3-masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 3-masala: moddiy nuqta s(t) teng minus t ning toʻrtinchi darajasi boʻlinsin 12 plyus t kub qonuniyat bilan harakatlanmoqda. Tezlik v teng minus t kub boʻlinsin 3 plyus 3t kvadrat. Tezlanish a teng minus t kvadrat plyus 6t. Uning hosilasi minus 2t plyus 6, u t teng 3 da nolga teng — tezlanish eng katta. Shu paytdagi tezlik v(3) teng 18 metr sekundiga, bosib oʻtilgan yoʻl s(3) teng 20,25 metr.",
      easy: "Tezlanish minus t kvadrat plyus 6t. Uning eng katta qiymati t teng 3 da. Unda tezlik 18, yoʻl 20,25 metr.",
      draw: [
        { t: 'title', text: '3-masala' },
        { t: 'text', x: 6, y: 20, text: 's(t) = −t⁴/12 + t³' },
        { t: 'list', x: 6, y: 30, items: ['v(t) = −t³/3 + 3t²', 'a(t) = −t² + 6t', 'a′(t) = −2t + 6 = 0  →  t₀ = 3 s', 'v(3) = 18 m/s,   s(3) = 20,25 m'] },
        { t: 'axes', id: 'a', x: 66, y: 16, w: 30, h: 40, xmin: 0, xmax: 6.5, ymin: 0, ymax: 10, xlabel: 't', ylabel: 'a' },
        { t: 'curve', axes: 'a', points: A6, color: 'orange' },
        { t: 'dot', axes: 'a', x: 3, y: 9, label: 'max', color: 'red' }
      ],
      next: 'Eng kichik tezlik-chi?'
    },
    {
      kind: 'example',
      clear: true,
      say: "4-masala: s(t) teng t kub boʻlinsin 3 minus t kvadrat plyus 4t plyus 50. Tezlik v teng t kvadrat minus 2t plyus 4. Tezlanish a teng 2t minus 2, u t teng 1 da nolga teng. t 1 dan kichik boʻlsa tezlanish manfiy — tezlik kamayadi, keyin musbat — tezlik oshadi. Demak, t teng 1 sekundda tezlik eng kichik, shu payt tezlanish 0, yoʻl esa 53 butun uchdan bir metr.",
      easy: "Tezlik avval kamayadi, keyin oshadi. Eng kichik tezlik t teng 1 da. Tezlanish u paytda nolga teng.",
      draw: [
        { t: 'title', text: '4-masala' },
        { t: 'text', x: 6, y: 20, text: 's(t) = t³/3 − t² + 4t + 50' },
        { t: 'list', x: 6, y: 30, items: ['v(t) = t² − 2t + 4', 'a(t) = 2t − 2 = 0  →  t₀ = 1 s', 'a(1) = 0 m/s²', 's(1) = 53⅓ m'] },
        { t: 'box', id: 'k', x: 54, y: 56, w: 40, h: 10, text: 'eng kichik tezlik: 3 m/s', color: 'blue' }
      ],
      next: 'Havo shari'
    },
    {
      kind: 'example',
      clear: true,
      say: "5-masala: havo shariga V(t) teng 2t kub minus 3t kvadrat plyus 10t plyus 2 kub metr havo purkalmoqda, t minutlarda. Boshida, t teng 0 da, hajm 2 kub metr. t teng 8 da hajm 914 kub metr. Purkash tezligi — hajmning hosilasi: V′(t) teng 6t kvadrat minus 6t plyus 10. t teng 4 da u 82 kub metr minutiga teng.",
      easy: "Purkash tezligi — hajmning hosilasi. 4-minutda u 82 kub metr minutiga teng.",
      draw: [
        { t: 'title', text: '5-masala: havo shari' },
        { t: 'icon', x: 82, y: 30, emoji: '🎈', size: 'l' },
        { t: 'text', x: 6, y: 20, text: 'V(t) = 2t³ − 3t² + 10t + 2' },
        { t: 'list', x: 6, y: 30, items: ['V(0) = 2 m³', 'V(8) = 1024 − 192 + 80 + 2 = 914 m³', 'V′(t) = 6t² − 6t + 10'] },
        { t: 'box', id: 'r', x: 6, y: 54, w: 56, h: 11, text: 'V′(4) = 96 − 24 + 10 = 82 m³/min', color: 'green' }
      ],
      next: 'Endi daromad'
    },
    {
      kind: 'example',
      clear: true,
      say: "Endi Karimaga qaytamiz. p(x) teng minus x kvadrat plyus 100x. Hosila minus 2x plyus 100, u x teng 50 da nolga teng. 50 gacha hosila musbat — daromad oshadi, keyin manfiy — kamayadi. Demak, 50 ta koʻylak tikish kerak. Eng katta daromad p(50) teng 2500 ming soʻm, yaʼni 2 million 500 ming soʻm.",
      easy: "Hosila x teng 50 da nolga teng. 50 ta koʻylak — eng katta daromad: 2 million 500 ming soʻm.",
      draw: [
        { t: 'title', text: '6-masala: daromad' },
        { t: 'formula', x: 6, y: 20, text: 'p′(x) = −2x + 100 = 0' },
        { t: 'text', x: 8, y: 34, text: 'x = 50 ta koʻylak', color: 'red' },
        { t: 'text', x: 8, y: 43, text: 'p(50) = 2500 ming soʻm', color: 'green' },
        { t: 'axes', id: 'p', x: 54, y: 14, w: 42, h: 50, xmin: 0, xmax: 105, ymin: 0, ymax: 2800, xlabel: 'x', ylabel: 'p' },
        { t: 'curve', axes: 'p', points: P100, color: 'green' },
        { t: 'dot', axes: 'p', x: 50, y: 2500, label: 'max', color: 'red' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Tezlik — yoʻlning hosilasi, tezlanish — tezlikning hosilasi.',
    'Tezlik eng katta yoki eng kichik boʻlgan paytda tezlanish nolga teng; tezlanish eng katta boʻlgan paytda a′(t) = 0.',
    'Daromad funksiyasining hosilasi nolga teng boʻlgan nuqtada (ishora + dan − ga oʻtsa) daromad eng katta.'
  ],
  questions: [
    {
      id: 'm17q1',
      prompt: 'Moddiy nuqta s(t) = −t⁴/4 + 5t³ qonuniyat bilan harakatlanmoqda. Tezlanish eng katta boʻladigan vaqt t₀ ni toping (s).',
      hint: 'v = −t³ + 15t², a = −3t² + 30t, a′ = −6t + 30.',
      explanation: 'a′(t) = −6t + 30 = 0 → t₀ = 5 s.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 's' } }
    },
    {
      id: 'm17q2',
      prompt: 'Oʻsha nuqta: s(t) = −t⁴/4 + 5t³. t₀ = 5 s dagi oniy tezlikni toping.',
      hint: 'v(t) = −t³ + 15t².',
      explanation: 'v(5) = −125 + 375 = 250 m/s.',
      widget: { type: 'number_answer', props: { answer: 250, unit: 'm/s' } }
    },
    {
      id: 'm17q3',
      prompt: 's(t) = t³/9 − 2t² + 40t + 50. Tezlik eng kichik boʻladigan vaqtni toping (s).',
      hint: 'v = t²/3 − 4t + 40, a = 2t/3 − 4.',
      explanation: 'a(t) = 2t/3 − 4 = 0 → t₀ = 6 s.',
      widget: { type: 'number_answer', props: { answer: 6, unit: 's' } }
    },
    {
      id: 'm17q4',
      prompt: 'Havo shariga V(t) = 5t³ + 3t² + 2t + 4 (m³) havo purkalmoqda. t = 5 minutdagi purkash tezligini toping (m³/min).',
      hint: 'V′(t) = 15t² + 6t + 2.',
      explanation: 'V′(5) = 375 + 30 + 2 = 407 m³/min.',
      widget: { type: 'number_answer', props: { answer: 407, unit: 'm³/min' } }
    },
    {
      id: 'm17q5',
      prompt: 'Muslima bir oyda x ta shim tiksa, p(x) = −2x² + 120x ming soʻm daromad qiladi. Daromad eng katta boʻlishi uchun nechta shim tikishi kerak?',
      hint: 'p′(x) = −4x + 120.',
      explanation: 'p′ = 0 → x = 30 ta.',
      widget: { type: 'number_answer', props: { answer: 30 } }
    },
    {
      id: 'm17q6',
      prompt: 'Muxlisa x ta yubka tiksa, p(x) = −3x² + 96x ming soʻm daromad qiladi. Eng katta daromad necha ming soʻm?',
      hint: 'p′(x) = −6x + 96 = 0 → x = 16.',
      explanation: 'p(16) = −768 + 1536 = 768 ming soʻm.',
      widget: { type: 'number_answer', props: { answer: 768, unit: 'ming soʻm' } }
    },
    {
      id: 'm17q7',
      prompt: 'Har bir hosilaga uning maʼnosini moslang.',
      hint: 'Hosila — oʻzgarish tezligi.',
      explanation: 's′ — tezlik, v′ — tezlanish, V′ — purkash tezligi, p′ = 0 — eng katta daromad nuqtasi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 's′(t)', right: 'tezlik' },
            { left: 'v′(t)', right: 'tezlanish' },
            { left: 'V′(t)', right: 'havo purkash tezligi' },
            { left: 'p′(x) = 0', right: 'eng katta daromad nuqtasi' }
          ]
        }
      }
    },
    {
      id: 'm17q8',
      prompt: 'Grafikda Karimaning daromadi eng katta boʻladigan nuqtani bosing.',
      hint: 'Parabola choʻqqisi.',
      explanation: 'x = 50 ta koʻylakda daromad 2500 ming soʻm — eng katta.',
      widget: {
        type: 'graph_tap',
        props: { target: [50, 2500], radius: 6, only: 'x', graph: { xmin: 0, xmax: 105, ymin: 0, ymax: 2800, xlabel: 'x', ylabel: 'p', curves: [{ points: P100 }] } }
      }
    },
    {
      id: 'm17q9',
      prompt: 'Kartalarni ochib, har bir yoʻl formulasini uning tezligi bilan juftlang.',
      hint: 'Tezlik — yoʻlning hosilasi.',
      explanation: '(t²)′ = 2t, (t³)′ = 3t², (5t)′ = 5, (t² + t)′ = 2t + 1.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 's = t²' }, b: { label: 'v = 2t' } },
            { a: { label: 's = t³' }, b: { label: 'v = 3t²' } },
            { a: { label: 's = 5t' }, b: { label: 'v = 5' } },
            { a: { label: 's = t² + t' }, b: { label: 'v = 2t + 1' } }
          ]
        }
      }
    }
  ]
};
