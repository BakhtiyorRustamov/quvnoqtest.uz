import type { BoardLesson } from './types';
import { barMagnet, rect, vec } from './phys';

export const BOB1 = { kicker: 'I bob', title: 'Magnit maydon' };

/** Darslik: Fizika 11, 1-mavzu (4–6-betlar) — magnit maydon, magnit induksiyasi, magnit oqimi. */
export const FIZ_1: BoardLesson = {
  n: 1,
  label: '1',
  group: BOB1,
  title: 'Magnit maydon va uni tavsiflovchi kattaliklar',
  section: '1-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Muzlatkich eshigidagi magnitcha tushib ketmaydi, kompas strelkasi doim shimolni koʻrsatadi. Ikkala holda ham jismlar bir-biriga tegmasdan taʼsir qiladi. Demak, magnit atrofida koʻzga koʻrinmas maydon bor — u magnit maydon deyiladi. Magnit maydonni uzoq vaqt saqlaydigan jismlar doimiy magnitlar deb ataladi.",
      easy: "Magnit atrofida koʻrinmas maydon bor — magnit maydon. U tegmasdan taʼsir qiladi.",
      draw: [
        { t: 'title', text: 'Koʻrinmas maydon' },
        { t: 'icon', x: 16, y: 32, emoji: '🧲', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🧭', size: 'l' },
        { t: 'list', x: 32, y: 26, items: ['magnit temirni tortadi', 'kompas shimolni koʻrsatadi', 'tegmasdan taʼsir — maydon'] }
      ],
      next: 'Magnit qutblari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻgʻri magnitni temir qirindilariga yaqinlashtirsak, ular faqat ikki uchiga yopishadi. Magnit taʼsiri eng kuchli joylar — qutblar: shimoliy N va janubiy S. Ikki magnitni yaqinlashtirsak, bir xil qutblar itarishadi, har xil qutblar tortishadi.",
      easy: "Har bir magnitda N va S qutb bor. Bir xillari itarishadi, har xillari tortishadi.",
      draw: [
        { t: 'title', text: 'Qutblar' },
        ...barMagnet('a', 6, 22, 24, 7),
        ...barMagnet('b', 36, 22, 24, 7),
        { t: 'text', x: 70, y: 27, text: 'tortishadi', color: 'green' },
        ...barMagnet('c', 6, 44, 24, 7),
        ...barMagnet('d', 36, 44, 24, 7, true),
        { t: 'text', x: 70, y: 49, text: 'itarishadi', color: 'red' }
      ],
      next: 'Kuch chiziqlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Magnit ustiga karton qoʻyib, temir kukuni sepsak, kukun egri chiziqlar boʻylab joylashadi — bular magnit maydon kuch chiziqlari. Ular shartli ravishda shimoliy qutbdan chiqib, janubiy qutbga kiradi va magnit ichidan davom etib, yopiq boʻladi. Kuch chiziqlari yopiq boʻlgan maydon uyurmaviy maydon deyiladi. Elektr maydon chiziqlari esa zaryadlarda boshlanib tugaydi.",
      easy: "Kuch chiziqlari N dan chiqib S ga kiradi va yopiq — magnit maydon uyurmaviy.",
      draw: [
        { t: 'title', text: 'Kuch chiziqlari' },
        ...barMagnet('m', 25, 38, 30, 8),
        { t: 'ellipse', cx: 40, cy: 42, rx: 15, ry: 9, color: 'blue' },
        { t: 'ellipse', cx: 40, cy: 42, rx: 15, ry: 16, color: 'blue' },
        { t: 'ellipse', cx: 40, cy: 42, rx: 15, ry: 23, color: 'blue' },
        ...vec('t1', 38, 33, 42, 33, 'blue'),
        ...vec('t2', 38, 26, 42, 26, 'blue'),
        { t: 'list', x: 64, y: 24, items: ['N → S (tashqarida)', 'yopiq chiziqlar', 'uyurmaviy maydon'] }
      ],
      next: 'Magnit induksiyasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Maydonning biror nuqtadagi kuch xarakteristikasi — magnit induksiyasi, B harfi bilan belgilanadigan vektor kattalik. Uning yoʻnalishi kuch chiziqlariga urinma boʻylab. Birligi — Nikola Tesla sharafiga tesla, T. Masalan, Yerning magnit maydoni taxminan 50 mikrotesla, oddiy doimiy magnitniki — oʻndan bir teslalar atrofida.",
      easy: "Magnit induksiyasi B — vektor, birligi tesla (T).",
      draw: [
        { t: 'title', text: 'Magnit induksiyasi B' },
        { t: 'formula', x: 6, y: 22, text: 'B — vektor,  [B] = 1 T (tesla)' },
        {
          t: 'table',
          x: 6,
          y: 36,
          rows: [
            ['manba', 'B'],
            ['Yer maydoni', '≈ 50 μT'],
            ['doimiy magnit', '≈ 0,1 T'],
            ['tibbiy tomograf', '1,5–3 T']
          ]
        }
      ],
      next: 'Magnit oqimi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sirtni qancha kuch chizigʻi kesib oʻtishini magnit oqimi koʻrsatadi. Oqim Ф teng B karra S karra kosinus alfa, bu yerda alfa — sirtga oʻtkazilgan normal bilan B orasidagi burchak. Oqim — skalyar kattalik, birligi veber: 1 Wb teng 1 T karra 1 m kvadrat. Chiziqlar sirtga tik tushsa, oqim eng katta, sirt boʻylab ketsa — nol.",
      easy: "Ф = B · S · cos α. Birligi veber (Wb).",
      draw: [
        { t: 'title', text: 'Magnit oqimi Ф' },
        ...rect('s', 12, 34, 26, 18, 'ink'),
        ...vec('b1', 8, 24, 20, 38, 'blue', 'B'),
        ...vec('b2', 20, 24, 32, 38, 'blue'),
        ...vec('n', 25, 43, 25, 22, 'red', 'n'),
        { t: 'text', x: 27, y: 32, text: 'α', color: 'purple' },
        { t: 'formula', x: 50, y: 24, text: 'Ф = B · S · cos α' },
        { t: 'list', x: 50, y: 40, items: ['[Ф] = 1 Wb = 1 T · m²', 'α = 0° → Ф eng katta', 'α = 90° → Ф = 0'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Induksiyasi 20 millitesla boʻlgan maydon chiziqlari 4 ga 3 santimetrli ramkaga normal bilan 60 gradus hosil qilib tushmoqda. Yuz 0,04 karra 0,03, yaʼni 0,0012 kvadrat metr. Oqim: 0,02 karra 0,0012 karra 0,5, yaʼni 12 mikroveber.",
      easy: "Ф = 0,02 · 0,0012 · cos 60° = 1,2 · 10⁻⁵ Wb.",
      draw: [
        { t: 'title', text: 'Ramkadan oʻtgan oqim' },
        { t: 'list', x: 6, y: 20, items: ['B = 20 mT = 0,02 T', 'S = 0,04 · 0,03 = 0,0012 m²', 'α = 60°, cos 60° = 0,5'] },
        { t: 'formula', x: 6, y: 50, text: 'Ф = 0,02 · 0,0012 · 0,5 = 1,2 · 10⁻⁵ Wb' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Magnit maydon magnitlar va tokli oʻtkazgichlar atrofida boʻladi; qutblar N va S, bir xillari itarishadi.',
    'Kuch chiziqlari N dan chiqib S ga kiradi va yopiq — magnit maydon uyurmaviy.',
    'Magnit induksiyasi B — vektor, birligi tesla; magnit oqimi Ф = B·S·cos α, birligi veber.'
  ],
  questions: [
    {
      id: 'f1q1',
      prompt: 'Radiusi 4 cm boʻlgan halqa 0,5 T induksiyali maydon chiziqlariga tik joylashgan. Halqadan oʻtayotgan magnit oqimi necha mWb? (0,01 gacha)',
      hint: 'S = πr², cos 0° = 1.',
      explanation: 'S = 3,14 · 0,0016 ≈ 0,00503 m², Ф = 0,5 · 0,00503 ≈ 2,51 mWb.',
      widget: { type: 'number_answer', props: { answer: 2.513, tolerance: 0.01, unit: 'mWb' } }
    },
    {
      id: 'f1q2',
      prompt: 'Induksiyasi 4 T boʻlgan maydonda yuzi 250 cm² ramkadan 87 mWb oqim oʻtmoqda. Normal bilan B orasidagi burchak taxminan necha gradus?',
      hint: 'cos α = Ф / (B · S).',
      explanation: 'cos α = 0,087 / (4 · 0,025) = 0,87 → α ≈ 30°.',
      widget: { type: 'number_answer', props: { answer: 30, tolerance: 1, unit: '°' } }
    },
    {
      id: 'f1q3',
      prompt: 'Kattalikni birligi bilan moslang.',
      hint: 'Tesla va Veber — olimlar sharafiga.',
      explanation: 'B — tesla, Ф — veber, S — m², 1 Wb = 1 T · m².',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'magnit induksiyasi B', right: 'T (tesla)' },
            { left: 'magnit oqimi Ф', right: 'Wb (veber)' },
            { left: 'yuza S', right: 'm²' },
            { left: '1 Wb', right: '1 T · m²' }
          ]
        }
      }
    },
    {
      id: 'f1q4',
      prompt: 'Qaysi moddalarni magnit kuchli tortadi?',
      hint: 'Temir va unga oʻxshash metallar.',
      explanation: 'Temir, nikel, kobalt kuchli tortiladi; mis, alyuminiy, yogʻoch, shisha deyarli tortilmaydi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'y', label: 'Tortadi' },
            { id: 'n', label: 'Deyarli tortmaydi' }
          ],
          items: [
            { emoji: '', label: 'temir mix', bin: 'y' },
            { emoji: '', label: 'nikel tanga', bin: 'y' },
            { emoji: '', label: 'kobalt', bin: 'y' },
            { emoji: '', label: 'mis sim', bin: 'n' },
            { emoji: '', label: 'alyuminiy qoshiq', bin: 'n' },
            { emoji: '', label: 'yogʻoch qalam', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'f1q5',
      prompt: 'Ramka magnit maydonda shunday buralganki, induksiya chiziqlari ramka tekisligi boʻylab ketadi (α = 90°). Oqim nimaga teng?',
      hint: 'cos 90° = 0.',
      explanation: 'Chiziqlar sirtni kesib oʻtmaydi — Ф = 0.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Eng katta', 'Nolga teng', 'B · S ga teng', 'B · S / 2 ga teng'], answerIndex: 1 } }
    },
    {
      id: 'f1q6',
      prompt: 'Induksiyasi 50 mT boʻlgan maydon chiziqlari sirt tekisligiga 30° burchak ostida tushmoqda. B ning sirtga normal tashkil etuvchisi necha mT?',
      hint: 'Tekislikka nisbatan burchak 30° → normal tashkil etuvchi B · sin 30°.',
      explanation: '50 · 0,5 = 25 mT.',
      widget: { type: 'number_answer', props: { answer: 25, unit: 'mT' } }
    },
    {
      id: 'f1q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kuch chiziqlarining yoʻnalishini eslang.',
      explanation: 'Chiziqlar N dan chiqib S ga kiradi va yopiq; magnit maydon uyurmaviy; oqim skalyar, induksiya vektor.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Magnit kuch chiziqlari magnit tashqarisida N qutbdan chiqib, S qutbga kiradi.', value: true },
            { text: 'Magnit oqimi vektor kattalik.', value: false },
            { text: 'Kuch chiziqlari yopiq maydon uyurmaviy maydon deyiladi.', value: true },
            { text: 'Ikki magnitning bir xil qutblari bir-birini tortadi.', value: false }
          ]
        }
      }
    },
    {
      id: 'f1q8',
      prompt: 'Ortiqchasini toping.',
      hint: 'Uchtasi magnit maydonga oid kattalik yoki birlik.',
      explanation: 'Volt — kuchlanish birligi, magnit maydonga oid emas.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'tesla' }, { text: 'veber' }, { text: 'volt', odd: true }, { text: 'magnit induksiyasi' }] } }
    }
  ]
};
