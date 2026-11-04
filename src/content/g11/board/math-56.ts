import type { BoardLesson } from './types';

/** Darslik (2-qism): 71–73-mavzu (68–71-betlar) — tajriba, tasodifiy, muqarrar va ro‘y berishi mumkin bo‘lmagan hodisalar. */
export const MATH_56: BoardLesson = {
  n: 56,
  label: '71',
  part: 'algebra',
  qism: 2,
  title: 'Tasodifiy hodisalar bilan tanishuv',
  section: '71–73',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ob-havo maʼlumotida «ertaga yomgʻir yogʻishi mumkin» deyishadi. Yomgʻir albatta yogʻadi demayapti, yogʻmasligi ham mumkin. Futbolda 11 metrlik jarima tepilyapti: toʻp darvozaga kiradimi? Oldindan aniq aytolmaymiz. Bunday vaziyatlarni matematika qanday oʻrganadi? Bugun tasodifiy hodisalar bilan tanishamiz.",
      easy: "Natijasini oldindan aniq aytib boʻlmaydigan vaziyatlar — tasodifiy.",
      draw: [
        { t: 'title', text: 'Albatta boʻladimi?' },
        { t: 'icon', x: 14, y: 30, emoji: '🌧️', size: 'l' },
        { t: 'icon', x: 14, y: 52, emoji: '⚽', size: 'l' },
        { t: 'list', x: 30, y: 26, items: ['«ertaga yomgʻir yogʻishi mumkin»', 'penaltida toʻp kiradimi?', 'natijani oldindan bilmaymiz'] }
      ],
      next: 'Tajriba nima?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ehtimollar nazariyasida tajriba degan tushuncha bor: tanga tashlash, kub tashlash, xaltadan qaramasdan shar olish. Tajriba bir xil sharoitda istalgancha takrorlanishi mumkin. Tanga — gerb yoki raqam. Kub — 1 dan 6 gacha raqam. Xaltada 5 ta yashil va 5 ta oq shar boʻlsa, ikkala rang chiqishi imkoniyati bir xil — bunday hodisalar teng imkoniyatli deyiladi.",
      easy: "Tanga, kub, xaltadan shar olish — tajribalar. Imkoniyati bir xil hodisalar — teng imkoniyatli.",
      draw: [
        { t: 'title', text: 'Tajribalar' },
        { t: 'ellipse', cx: 14, cy: 26, rx: 5, ry: 5, color: 'orange' },
        { t: 'text', x: 14, y: 28, text: 'G', anchor: 'middle', color: 'orange' },
        { t: 'icon', x: 14, y: 42, emoji: '🎲', size: 'l' },
        { t: 'icon', x: 14, y: 58, emoji: '👜', size: 'l' },
        { t: 'text', x: 28, y: 28, text: 'tanga: gerb (G) yoki raqam (R)' },
        { t: 'text', x: 28, y: 44, text: 'kub: 1, 2, 3, 4, 5, 6' },
        { t: 'text', x: 28, y: 60, text: 'xalta: 5 yashil, 5 oq shar' }
      ],
      next: 'Hodisa turlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tajribada roʻy berishi ham, roʻy bermasligi ham mumkin boʻlgan hodisa tasodifiy hodisa deyiladi: kubda 5 chiqishi. Har gal albatta roʻy beradigan hodisa muqarrar hodisa, U harfi bilan belgilanadi: kubda 1 dan 6 gacha biror raqam chiqishi. Hech qachon roʻy bermaydigan hodisa — roʻy berishi mumkin boʻlmagan hodisa, V harfi bilan: kubda 7 chiqishi.",
      easy: "Tasodifiy — boʻlishi ham, boʻlmasligi ham mumkin. Muqarrar (U) — doim. Mumkin emas (V) — hech qachon.",
      draw: [
        { t: 'title', text: 'Uch xil hodisa' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['hodisa', 'maʼnosi', 'kub misolida'],
            ['tasodifiy (A, B, …)', 'goh boʻladi, goh yoʻq', '5 chiqadi'],
            ['muqarrar (U)', 'doim boʻladi', '1…6 dan biri'],
            ['mumkin emas (V)', 'hech qachon', '7 chiqadi']
          ]
        }
      ],
      next: 'Barcha imkoniyatlar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ikkita tanga baravar tashlansa, qanday imkoniyatlar bor? Gerb-gerb, gerb-raqam, raqam-gerb, raqam-raqam — 4 ta. Uch marta tashlansa, har safar imkoniyat ikki baravar oshadi: 8 ta. Ikkita kub tashlansa, 6 karra 6, yaʼni 36 ta sonlar juftligi boʻladi.",
      easy: "2 tanga — 4 imkoniyat, 3 tanga — 8, 2 kub — 36.",
      draw: [
        { t: 'title', text: 'Barcha imkoniyatlarni yozamiz' },
        { t: 'list', x: 6, y: 20, items: ['2 tanga: GG, GR, RG, RR → 4', '3 tanga: 2 · 2 · 2 = 8', '2 kub: 6 · 6 = 36 juftlik'] },
        { t: 'icon', x: 84, y: 30, emoji: '🎲', size: 'l' }
      ],
      next: 'Kim merganroq?'
    },
    {
      kind: 'example',
      clear: true,
      say: "Maʼmura 30 ta otgan toʻpidan 20 tasini, Manzura 28 tadan 18 tasini savatga tushirdi. Kim merganroq? Tushganlar sonini emas, ulushini solishtiramiz: 20 boʻlinsin 30 taxminan 0,67, 18 boʻlinsin 28 taxminan 0,64. Maʼmura biroz merganroq. Hodisaning roʻy berish imkonini son bilan oʻlchash — keyingi darsimiz mavzusi, ehtimollik.",
      easy: "20/30 ≈ 0,67 > 18/28 ≈ 0,64 — Maʼmura merganroq.",
      draw: [
        { t: 'title', text: 'Maʼmura yoki Manzura?' },
        { t: 'icon', x: 14, y: 34, emoji: '🏀', size: 'l' },
        { t: 'list', x: 30, y: 24, items: ['Maʼmura: 20 : 30 ≈ 0,67', 'Manzura: 18 : 28 ≈ 0,64'] },
        { t: 'text', x: 30, y: 50, text: 'ulushini solishtiramiz!', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Tajriba bir xil sharoitda takrorlanadi; natijasini oldindan aniq aytib boʻlmaydi.',
    'Tasodifiy hodisa roʻy berishi ham, bermasligi ham mumkin; muqarrar hodisa (U) doim roʻy beradi; V hech qachon roʻy bermaydi.',
    'Imkoniyatlari bir xil hodisalar teng imkoniyatli deyiladi.'
  ],
  questions: [
    {
      id: 'p56q1',
      prompt: 'Hodisalarni turlarga ajrating.',
      hint: 'Doim boʻladimi, hech qachonmi yoki goh-goh?',
      explanation: 'Quyosh Sharqdan chiqishi, payshanbadan keyin juma — muqarrar; kubda 9 chiqishi, dushanbadan keyin chorshanba — mumkin emas; lotereya yutishi, 10-martda yomgʻir — tasodifiy.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 't', label: 'Tasodifiy' },
            { id: 'u', label: 'Muqarrar' },
            { id: 'v', label: 'Mumkin emas' }
          ],
          items: [
            { emoji: '', label: 'lotereya chiptasi yutuqli', bin: 't' },
            { emoji: '', label: '10-mart kuni Fargʻonada yomgʻir', bin: 't' },
            { emoji: '', label: 'Quyosh Sharqdan chiqadi', bin: 'u' },
            { emoji: '', label: 'payshanbadan soʻng juma keladi', bin: 'u' },
            { emoji: '', label: 'kub tashlanganda 9 chiqadi', bin: 'v' },
            { emoji: '', label: 'dushanbadan soʻng chorshanba keladi', bin: 'v' }
          ]
        }
      }
    },
    {
      id: 'p56q2',
      prompt: 'Tanga 3 marta tashlandi. Nechta turli imkoniyat (masalan, GRG) bor?',
      hint: 'Har safar 2 imkoniyat.',
      explanation: '2 · 2 · 2 = 8: GGG, GGR, GRG, GRR, RGG, RGR, RRG, RRR.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'p56q3',
      prompt: 'Ikkita kub baravar tashlandi. Nechta turli sonlar juftligi chiqishi mumkin?',
      hint: 'Koʻpaytirish qoidasi.',
      explanation: '6 · 6 = 36.',
      widget: { type: 'number_answer', props: { answer: 36 } }
    },
    {
      id: 'p56q4',
      prompt: 'Ikkita kub tashlanganda raqamlar yigʻindisi eng koʻpi bilan nechaga teng boʻlishi mumkin?',
      hint: '6 + 6.',
      explanation: 'Yigʻindi 2 dan 12 gacha boʻladi; eng kattasi 12.',
      widget: { type: 'number_answer', props: { answer: 12 } }
    },
    {
      id: 'p56q5',
      prompt: 'Qaysi juftlikda hodisalar teng imkoniyatli?',
      hint: 'Imkoniyatlar soni bir xilmi?',
      explanation: 'Kubda juft (2, 4, 6) va toq (1, 3, 5) raqamlar — 3 tadan, teng imkoniyatli.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Kubda 5 chiqishi va 5 chiqmasligi', 'Kubda juft va toq raqam chiqishi', 'Qishda va yozda qor yogʻishi', '9 oq va 1 qora shardan oq va qora olish'], answerIndex: 1 } }
    },
    {
      id: 'p56q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Taʼriflarni eslang.',
      explanation: 'Muqarrar hodisa doim roʻy beradi; kubda 0 chiqishi mumkin emas; tajriba takrorlanishi mumkin; tanga — teng imkoniyatli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Muqarrar hodisa har bir tajribada albatta roʻy beradi.', value: true },
            { text: 'Kub tashlanganda 0 chiqishi — tasodifiy hodisa.', value: false },
            { text: 'Tanga tashlanganda gerb va raqam chiqishi teng imkoniyatli.', value: true },
            { text: 'Tajribani faqat bir marta oʻtkazish mumkin.', value: false }
          ]
        }
      }
    },
    {
      id: 'p56q7',
      prompt: 'Ortiqchasini toping (qolganlari tasodifiy hodisa).',
      hint: 'Qaysi biri doim roʻy beradi?',
      explanation: 'Kubda 1–6 dan biror raqam chiqishi — muqarrar hodisa.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'kubda 6 chiqadi' }, { text: 'tangada gerb tushadi' }, { text: 'kubda 1–6 dan biri chiqadi', odd: true }, { text: 'xaltadan oq shar chiqadi' }] } }
    },
    {
      id: 'p56q8',
      prompt: '2, 3, 4 raqamlaridan (takrorlamasdan) nechta uch xonali son tuzish mumkin?',
      hint: '3!.',
      explanation: '3 · 2 · 1 = 6: 234, 243, 324, 342, 423, 432.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    }
  ]
};
