import type { BoardLesson } from './types';
import { BOB3 } from './biologiya-24';

/** Darslik: Biologiya 11, 25-§ (136–139-betlar) — biosfera chegaralari: atmosfera (troposfera, ozon qatlami), gidrosfera, litosfera. */
export const BIO_25: BoardLesson = {
  n: 25,
  label: '25',
  group: BOB3,
  title: 'Biosfera chegaralari',
  section: '25-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Hayot qayergacha yetadi? Bakteriya sporalari havo oqimi bilan oʻnlab kilometr balandga koʻtariladi, Mariana botigʻi tubida ham hayot bor, neft quduqlarida 3–4 kilometr chuqurlikda bakteriyalar topilgan. Biosfera chegaralari hayot uchun zarur sharoitlar bilan belgilanadi.",
      easy: "Hayot chegarasini sharoitlar belgilaydi: harorat, yorugʻlik, suv, gazlar.",
      draw: [
        { t: 'title', text: 'Hayot qayergacha?' },
        { t: 'icon', x: 16, y: 40, emoji: '🧭', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['yuqori — ozon qatlami', 'suvda — okean tubi', 'yer ostida — 3 km atrofi'] }
      ],
      next: 'Uch qobiq'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hayot uchun sharoit — qulay harorat, yorugʻlik, suv, kislorod, karbonat angidrid, minerallar — Yerning uch qobigʻi tutashgan joyda yuzaga keladi. Biosfera atmosferaning quyi qatlamini, gidrosferaning barcha qatlamlarini va litosferaning yuqori qatlamini oʻz ichiga oladi.",
      easy: "Atmosfera (quyi), gidrosfera (hammasi), litosfera (yuqori).",
      draw: [
        { t: 'title', text: 'Biosfera qobiqlari' },
        { t: 'table', x: 4, y: 20, rows: [['qobiq', 'biosferaga kiradi'], ['atmosfera', 'quyi qatlami'], ['gidrosfera', 'barcha qatlamlari'], ['litosfera', 'yuqori qatlami']] }
      ],
      next: 'Atmosfera'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Atmosfera: azot 78, kislorod 21, argon 1 dan kam, karbonat angidrid 0,04 foizga yaqin. Hayot asosan troposferada — qutblarda 8–10, ekvatorda 18–20 kilometrgacha; unda har 100 metrda harorat 0,6 gradusga pasayadi. Yuqori chegara — stratosferadagi ozon qatlami: ozon 20–22 kilometrda eng zich, ultrabinafsha nurlarning 99 foizini yutadi. Undan yuqorida hayot boʻlishi mumkin emas.",
      easy: "Troposfera — hayot; ozon qatlami (20–22 km) — yuqori chegara.",
      draw: [
        { t: 'title', text: 'Atmosfera chegarasi' },
        { t: 'bars', x: 6, y: 20, w: 46, h: 34, items: [{ label: 'troposfera', value: 10 }, { label: 'ozon', value: 22 }, { label: 'stratosfera', value: 50 }] },
        { t: 'list', x: 58, y: 24, items: ['km balandlik', 'ozon — 99 % UB', 'yutadi'] }
      ],
      next: 'Gidrosfera'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gidrosfera — Yerning suvli qobigʻi, yuzaning 70 foizi. Barcha suvning 96,4 foizi — dunyo okeani, 3 foizdan koʻprogʻi — chuchuk suv, uning uchdan ikkisi muzliklarda. Gidrosferaning barcha qatlamlarida hayot bor: jamoalar 10 kilometr chuqurlikkacha tarqalgan, eng chuqur joy — Mariana botigʻi, 11 kilometr. Oʻsimliklar faqat yorugʻlik yetadigan 300 metrgacha qatlamda.",
      easy: "Okean — 96,4 %; hayot butun chuqurlikda; oʻsimliklar — 300 m gacha.",
      draw: [
        { t: 'title', text: 'Gidrosfera' },
        { t: 'list', x: 4, y: 20, items: ['Yer yuzining 70 %', 'okean — barcha suvning 96,4 %', 'Mariana botigʻi — 11 km', 'oʻsimliklar — 300 m gacha'] }
      ],
      next: 'Litosfera'
    },
    {
      kind: 'example',
      clear: true,
      say: "Litosfera — Yerning qattiq qobigʻi. Koʻp organizmlar uning bir necha oʻn santimetrlik yuqori qatlamida — tuproqda yashaydi; krot, chuvalchanglar va ildizlar bir necha metrgacha kiradi. Chuqurlik ortgan sari har 100 metrda harorat 3 gradusga ortadi; taxminan 3 kilometrda +100 gradus — suv bugʻga aylanadi. Bu litosferadagi hayotning quyi chegarasi.",
      easy: "Har 100 m da +3 °C; ≈ 3 km da +100 °C — quyi chegara.",
      draw: [
        { t: 'title', text: 'Litosfera chegarasi' },
        { t: 'formula', x: 4, y: 24, text: 'har 100 m → +3 °C' },
        { t: 'formula', x: 4, y: 36, text: '≈ 3 km → +100 °C' },
        { t: 'text', x: 4, y: 50, text: 'hayotning koʻp qismi — tuproqda', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Biosfera atmosferaning quyi qatlami, gidrosferaning hamma qatlamlari va litosferaning yuqori qatlamini oʻz ichiga oladi.',
    'Yuqori chegara — ozon qatlami (20–22 km da eng zich, UB ning 99 % ini yutadi); hayot asosan troposferada.',
    'Gidrosferada hayot butun chuqurlikda (Mariana botigʻi — 11 km), oʻsimliklar 300 m gacha; litosferada quyi chegara ≈ 3 km (+100 °C).'
  ],
  questions: [
    {
      id: 'b25q1',
      prompt: 'Qobiqni biosferaga kiradigan qismi bilan juftlang.',
      hint: 'Suvda hayot hamma joyda.',
      explanation: 'Atmosfera — quyi qatlami; gidrosfera — barcha qatlamlari; litosfera — yuqori qatlami.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'atmosfera', right: 'quyi qatlami' },
            { left: 'gidrosfera', right: 'barcha qatlamlari' },
            { left: 'litosfera', right: 'yuqori qatlami' }
          ]
        }
      }
    },
    {
      id: 'b25q2',
      prompt: 'Biosferaning yuqori chegarasi nima?',
      hint: 'UB nurlardan himoya.',
      explanation: 'Ozon qatlami.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['troposfera', 'ozon qatlami', 'ekzosfera', 'bulutlar'], answerIndex: 1 } }
    },
    {
      id: 'b25q3',
      prompt: 'Litosferada chuqurlik 1 km ga ortsa, harorat necha gradusga ortadi?',
      hint: 'Har 100 m da +3 °C.',
      explanation: '10 · 3 = 30 °C.',
      widget: { type: 'number_answer', props: { answer: 30, unit: '°C' } }
    },
    {
      id: 'b25q4',
      prompt: 'Troposferada 2 km balandlikka koʻtarilganda harorat necha gradusga pasayadi?',
      hint: 'Har 100 m da 0,6 °C.',
      explanation: '20 · 0,6 = 12 °C.',
      widget: { type: 'number_answer', props: { answer: 12, tolerance: 0.01, unit: '°C' } }
    },
    {
      id: 'b25q5',
      prompt: 'Okeanda oʻsimliklar qaysi chuqurlikkacha tarqalgan?',
      hint: 'Yorugʻlik yetadigan qatlam.',
      explanation: '300 m gacha.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['30 m', '300 m', '3 km', '11 km'], answerIndex: 1 } }
    },
    {
      id: 'b25q6',
      prompt: 'Atmosfera qatlamlarini Yer yuzasidan yuqoriga tartiblang.',
      hint: 'Troposfera — eng pastki.',
      explanation: 'Troposfera → stratosfera → mezosfera → termosfera → ekzosfera.',
      widget: { type: 'order_line', props: { items: [{ label: 'troposfera' }, { label: 'stratosfera' }, { label: 'mezosfera' }, { label: 'termosfera' }, { label: 'ekzosfera' }] } }
    },
    {
      id: 'b25q7',
      prompt: 'Dunyo okeani Yerdagi barcha suvning necha foizini tashkil etadi?',
      hint: '96 dan koʻp.',
      explanation: '96,4 %.',
      widget: { type: 'number_answer', props: { answer: 96.4, tolerance: 0.05, unit: '%' } }
    },
    {
      id: 'b25q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Chuchuk suvning koʻp qismi muzda.',
      explanation: 'Chuchuk suvning 2/3 qismi muzliklarda; ozon qatlamidan yuqorida hayot yoʻq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Chuchuk suvning 2/3 qismi muzliklarda.', value: true },
            { text: 'Ozon qatlamidan yuqorida hayot boʻlishi mumkin emas.', value: true },
            { text: 'Troposfera balandligi hamma joyda bir xil.', value: false },
            { text: 'Litosferada chuqurlashgan sari harorat pasayadi.', value: false }
          ]
        }
      }
    }
  ]
};
