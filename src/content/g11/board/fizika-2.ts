import type { BoardLesson } from './types';
import { BOB1 } from './fizika-1';
import { rect, seg, vec } from './phys';

/** Darslik: Fizika 11, 2-mavzu (7–9-betlar) — magnit maydonning tokli ramkani aylantiruvchi momenti. */
export const FIZ_2: BoardLesson = {
  n: 2,
  label: '2',
  group: BOB1,
  title: 'Magnit maydonda tokli ramkaning aylanishi',
  section: '2-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ventilyator, changyutgich, elektr samokat — hammasida elektr dvigatel bor. Uning ichida magnit qutblari orasiga tokli sim ramka joylashtirilgan. Tok yoqilishi bilan ramka aylana boshlaydi. Nega? Bugun magnit maydon tokli ramkani qanday burishini aniqlaymiz.",
      easy: "Dvigatel ichida tokli ramka magnit maydonda aylanadi.",
      draw: [
        { t: 'title', text: 'Dvigatel nega aylanadi?' },
        { t: 'icon', x: 16, y: 34, emoji: '🔌', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚙️', size: 'l' },
        { t: 'list', x: 32, y: 26, items: ['magnit qutblari orasida ramka', 'ramkadan tok oʻtadi', 'ramka aylanadi'] }
      ],
      next: 'Amper kuchi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Magnit maydondagi tokli oʻtkazgichga Amper kuchi taʼsir qiladi: F teng I karra B karra l, agar oʻtkazgich induksiya chiziqlariga tik boʻlsa. Kuch yoʻnalishi chap qoʻl qoidasi bilan topiladi: induksiya chiziqlari kaftga kirsin, toʻrt barmoq tok yoʻnalishida boʻlsin, shunda 90 gradusga kerilgan bosh barmoq kuchni koʻrsatadi.",
      easy: "F = I · B · l. Yoʻnalishi — chap qoʻl qoidasi.",
      draw: [
        { t: 'title', text: 'Amper kuchi' },
        { t: 'formula', x: 6, y: 22, text: 'F = I · B · l' },
        { t: 'icon', x: 16, y: 46, emoji: '🤚', size: 'l' },
        { t: 'list', x: 30, y: 38, items: ['B — kaftga kiradi', '4 barmoq — tok yoʻnalishi', 'bosh barmoq — kuch F'] }
      ],
      next: 'Juft kuch'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ramkaning maydonga tik AB va CD tomonlaridan tok qarama-qarshi yoʻnalishda oqadi. Shuning uchun ularga teng, lekin qarama-qarshi Amper kuchlari taʼsir qiladi — bu juft kuch. Juft kuch ramkani OO′ oʻq atrofida buradi, xuddi ikki qoʻl bilan avtomobil rulini burganday.",
      easy: "Ramkaning ikki tomoniga qarama-qarshi kuchlar taʼsir qiladi — ramka buriladi.",
      draw: [
        { t: 'title', text: 'Juft kuch' },
        { t: 'text', x: 8, y: 44, text: 'N', color: 'red', size: 'l' },
        { t: 'text', x: 88, y: 44, text: 'S', color: 'blue', size: 'l' },
        ...rect('f', 32, 24, 30, 34, 'ink'),
        ...vec('B1', 14, 30, 26, 30, 'blue', 'B'),
        ...vec('Fa', 32, 34, 32, 20, 'red', 'F'),
        ...vec('Fb', 62, 48, 62, 62, 'red', 'F'),
        ...seg('ax', 47, 18, 47, 64, 'purple', true),
        { t: 'text', x: 49, y: 20, text: 'OO′', size: 's', color: 'purple' }
      ],
      next: 'Aylantiruvchi moment'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Juft kuchning aylantiruvchi momenti M teng I karra B karra S karra sinus alfa, bu yerda S — ramka yuzi, alfa — ramka normali bilan B orasidagi burchak. Normal B ga tik boʻlganda moment eng katta: M max teng I B S. Ramkada N ta oʻram boʻlsa, moment N marta katta. Bundan induksiyani ham topish mumkin: B teng M max boʻlinsin I S.",
      easy: "M = N · I · B · S · sin α; eng kattasi N I B S.",
      draw: [
        { t: 'title', text: 'Aylantiruvchi moment' },
        { t: 'formula', x: 6, y: 22, text: 'M = N · I · B · S · sin α' },
        { t: 'list', x: 6, y: 38, items: ['α = 90° → M max = N I B S', 'α = 0° → M = 0 (muvozanat)', 'B = M max / (N I S)'] }
      ],
      next: 'Qayerda ishlatiladi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Magnitoelektrik oʻlchov asboblari shu hodisaga asoslangan: kuchli magnit qutblari orasidagi ramkadan tok oʻtsa, u prujinalar qarshiligini yengib buriladi va strelka tok kuchini koʻrsatadi — bu ampermetr. Oʻzgarmas tok dvigatelida esa ramka toʻxtovsiz aylanadi.",
      easy: "Ampermetr strelkasi va dvigatel — tokli ramkaning burilishi.",
      draw: [
        { t: 'title', text: 'Qoʻllanilishi' },
        { t: 'icon', x: 16, y: 32, emoji: '🧭', size: 'l' },
        { t: 'icon', x: 16, y: 54, emoji: '🚗', size: 'l' },
        { t: 'list', x: 32, y: 26, items: ['ampermetr: burilish ~ tok kuchi', 'oʻzgarmas tok dvigateli', 'prujina ramkani nolga qaytaradi'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Yuzi 20 kvadrat santimetr, oʻramlari 100 ta boʻlgan ramkadan 2 amper tok oʻtganda eng katta moment 0,5 millinyuton metr boʻldi. Induksiya: B teng 0,0005 boʻlinsin 100 karra 2 karra 0,002, yaʼni 1,25 millitesla.",
      easy: "B = 0,5·10⁻³ / (100 · 2 · 2·10⁻³) = 1,25 mT.",
      draw: [
        { t: 'title', text: 'Induksiyani topamiz' },
        { t: 'list', x: 6, y: 20, items: ['S = 20 cm² = 2 · 10⁻³ m²', 'N = 100, I = 2 A', 'M max = 0,5 · 10⁻³ N·m'] },
        { t: 'formula', x: 6, y: 50, text: 'B = M max / (N I S) = 1,25 · 10⁻³ T' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Tokli oʻtkazgichga Amper kuchi F = I·B·l taʼsir qiladi; yoʻnalishi chap qoʻl qoidasi bilan topiladi.',
    'Tokli ramkaga juft kuch taʼsir qiladi: M = N·I·B·S·sin α, eng kattasi N·I·B·S.',
    'Ampermetrlar va oʻzgarmas tok dvigatellari shu hodisaga asoslangan.'
  ],
  questions: [
    {
      id: 'f2q1',
      prompt: 'Radiusi 10 cm boʻlgan halqa 20 mT induksiyali maydonda, undan 2 A tok oʻtmoqda. Eng katta aylantiruvchi moment necha mN·m? (0,01 gacha)',
      hint: 'M max = I · B · πr².',
      explanation: '2 · 0,02 · 3,14 · 0,01 ≈ 1,26 · 10⁻³ N·m.',
      widget: { type: 'number_answer', props: { answer: 1.257, tolerance: 0.01, unit: 'mN·m' } }
    },
    {
      id: 'f2q2',
      prompt: 'Eni 4 cm, boʻyi 8 cm ramka 2 T maydonda, undan 0,5 A tok oʻtmoqda. Eng katta moment necha mN·m?',
      hint: 'S = 0,04 · 0,08.',
      explanation: '0,5 · 2 · 0,0032 = 3,2 · 10⁻³ N·m.',
      widget: { type: 'number_answer', props: { answer: 3.2, tolerance: 0.01, unit: 'mN·m' } }
    },
    {
      id: 'f2q3',
      prompt: 'Uzunligi 25 cm oʻtkazgich 0,1 T maydon chiziqlariga tik joylashgan, unga 0,5 N kuch taʼsir qilmoqda. Tok kuchi necha A?',
      hint: 'I = F / (B l).',
      explanation: '0,5 / (0,1 · 0,25) = 20 A.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'A' } }
    },
    {
      id: 'f2q4',
      prompt: 'Ramka normali induksiya vektori bilan bir yoʻnalishda (α = 0°). Aylantiruvchi moment nimaga teng?',
      hint: 'sin 0° = 0.',
      explanation: 'M = 0 — ramka muvozanat holatida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Eng katta', 'Nolga teng', 'I·B·S/2', 'Aniqlab boʻlmaydi'], answerIndex: 1 } }
    },
    {
      id: 'f2q5',
      prompt: 'Chap qoʻl qoidasi: har bir barmoq nimani koʻrsatadi?',
      hint: 'Kaft — maydonga, barmoqlar — tokka.',
      explanation: 'Induksiya chiziqlari kaftga kiradi, 4 barmoq — tok, bosh barmoq — Amper kuchi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'kaft', right: 'B chiziqlari kiradi' },
            { left: 'toʻrt barmoq', right: 'tok yoʻnalishi' },
            { left: 'bosh barmoq', right: 'Amper kuchi' }
          ]
        }
      }
    },
    {
      id: 'f2q6',
      prompt: 'Momentni oshiradigan oʻzgarishlarni belgilang.',
      hint: 'M = N·I·B·S·sin α.',
      explanation: 'Tok, oʻramlar soni, yuza va induksiya oshsa, moment oshadi; α ni 90° dan 0° ga kamaytirsak, moment kamayadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tok kuchini oshirish', correct: true },
            { label: 'oʻramlar sonini oshirish', correct: true },
            { label: 'ramka yuzini oshirish', correct: true },
            { label: 'α ni 90° dan 0° ga kamaytirish' },
            { label: 'kuchliroq magnit olish', correct: true }
          ]
        }
      }
    },
    {
      id: 'f2q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Juft kuchni eslang.',
      explanation: 'Ramkaning qarama-qarshi tomonlariga teng va qarama-qarshi kuchlar taʼsir qiladi; tok yoʻnalishi oʻzgarsa, ramka teskari buriladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ramkaning qarama-qarshi tomonlariga taʼsir qiluvchi Amper kuchlari teng va qarama-qarshi.', value: true },
            { text: 'Tok yoʻnalishi teskarisiga oʻzgarsa ham, ramka avvalgi tomonga buriladi.', value: false },
            { text: 'Ampermetr strelkasining burilishi tok kuchiga proporsional.', value: true },
            { text: 'Aylantiruvchi moment ramka yuziga bogʻliq emas.', value: false }
          ]
        }
      }
    }
  ]
};
