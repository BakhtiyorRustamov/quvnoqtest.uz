import type { BoardLesson } from './types';
import { BOB2 } from './fizika-8';
import { seg, vec } from './phys';

/** Darslik: Fizika 11, 10-mavzu (35–36-betlar) — magnit maydon energiyasi. */
export const FIZ_11: BoardLesson = {
  n: 11,
  label: '10',
  group: BOB2,
  title: 'Magnit maydon energiyasi',
  section: '10-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Metall chiqindilar omborida kran ilgagi oʻrniga katta disk osilgan. Tok yoqilishi bilan u tonnalab temir-tersakni koʻtaradi, tok oʻchsa — tashlab yuboradi. Demak, tokli gʻaltak atrofidagi magnit maydon energiya saqlaydi va ish bajara oladi. Bu energiyani hisoblashni oʻrganamiz.",
      easy: "Elektromagnit kran: tokli gʻaltak maydoni energiya saqlaydi.",
      draw: [
        { t: 'title', text: 'Elektromagnit kran' },
        { t: 'icon', x: 16, y: 34, emoji: '🏗️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🧲', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['tok yoqildi — yuk koʻtarildi', 'tok oʻchdi — yuk tushdi', 'maydonda energiya bor'] }
      ],
      next: 'Ф–I grafigi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gʻaltakdagi tokni reostat bilan noldan I gacha tekis oshiramiz. Oqim F teng L I tokka proporsional, grafigi — toʻgʻri chiziq. Maydonni hosil qilishga sarflangan ish grafik ostidagi uchburchak yuziga teng: A teng I karra F boʻlinsin 2.",
      easy: "Ф = L·I — toʻgʻri chiziq. Ish = uchburchak yuzi = I·Ф/2.",
      draw: [
        { t: 'title', text: 'Ish — uchburchak yuzi' },
        ...vec('x', 10, 60, 52, 60, 'ink'),
        ...vec('y', 10, 60, 10, 20, 'ink'),
        { t: 'text', x: 53, y: 63, text: 'I', size: 's' },
        { t: 'text', x: 5, y: 22, text: 'Ф', size: 's' },
        ...seg('g', 10, 60, 44, 28, 'blue'),
        ...seg('h1', 44, 28, 44, 60, 'blue', true),
        ...seg('h2', 10, 28, 44, 28, 'blue', true),
        { t: 'text', x: 42, y: 65, text: 'I₀', size: 's' },
        { t: 'text', x: 2, y: 30, text: 'Ф₀', size: 's' },
        { t: 'formula', x: 58, y: 34, text: 'A = I · Ф / 2' }
      ],
      next: 'Energiya formulasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Energiya saqlanish qonuniga koʻra, maydon energiyasi shu ishga teng. F oʻrniga L I ni qoʻysak: W teng L I kvadrat boʻlinsin 2. Uni kinetik energiya m v kvadrat boʻlinsin 2 bilan solishtiring: induktivlik massaga, tok tezlikka oʻxshaydi.",
      easy: "W = L·I²/2 = I·Ф/2 — xuddi Ek = m·v²/2.",
      draw: [
        { t: 'title', text: 'Maydon energiyasi' },
        { t: 'formula', x: 6, y: 22, text: 'W = I · Ф / 2 = L · I² / 2' },
        { t: 'list', x: 6, y: 38, items: ['Eₖ = m · v² / 2', 'L ↔ m, I ↔ v', 'I ×2 → W ×4'] }
      ],
      next: 'Elektromagnit'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Elektromagnitning asosi — solenoid. Ichiga ferromagnit oʻzak kiritilsa, induktivlik keskin oshadi, maydon va uning energiyasi ham kuchayadi. Shu sababli elektromagnit kranlar ogʻir yuklarni bemalol koʻtaradi.",
      easy: "Temir oʻzak L ni oshiradi — elektromagnit kuchli boʻladi.",
      draw: [
        { t: 'title', text: 'Elektromagnit' },
        { t: 'list', x: 6, y: 24, items: ['solenoid + temir oʻzak', 'L keskin oshadi', 'W = L I² / 2 ham oshadi', 'kran ogʻir yukni koʻtaradi'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Induktivligi 0,2 henri gʻaltakda maydon energiyasi 4 millijoul boʻlishi uchun qancha tok kerak? I teng ildiz ostida 2 W boʻlinsin L: 2 karra 0,004 boʻlinsin 0,2 — 0,04, ildizi 0,2 amper.",
      easy: "I = √(2W/L) = √(0,008/0,2) = 0,2 A.",
      draw: [
        { t: 'title', text: 'Tokni topamiz' },
        { t: 'list', x: 6, y: 20, items: ['W = 4 mJ = 0,004 J', 'L = 0,2 H'] },
        { t: 'formula', x: 6, y: 46, text: 'I = √(2W / L) = √0,04 = 0,2 A' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Tokli gʻaltak maydoni energiyaga ega: W = L·I²/2 = I·Ф/2.',
    'Bu ish Ф–I grafigi ostidagi uchburchak yuziga teng.',
    'Induktivlik massaga, tok tezlikka oʻxshaydi; temir oʻzak L ni va energiyani oshiradi.'
  ],
  questions: [
    {
      id: 'f11q1',
      prompt: 'Induktivligi 30 mH gʻaltakdan 0,8 A tok oʻtmoqda. Maydon energiyasi necha mJ?',
      hint: 'W = L I² / 2.',
      explanation: '0,03 · 0,64 / 2 = 0,0096 J = 9,6 mJ.',
      widget: { type: 'number_answer', props: { answer: 9.6, tolerance: 0.05, unit: 'mJ' } }
    },
    {
      id: 'f11q2',
      prompt: '2 A tok oʻtganda gʻaltak maydon energiyasi 40 mJ. Induktivlik necha mH?',
      hint: 'L = 2W / I².',
      explanation: '2 · 0,04 / 4 = 0,02 H = 20 mH.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'mH' } }
    },
    {
      id: 'f11q3',
      prompt: 'Solenoiddan 2,5 A tok oʻtganda unda 0,8 mWb oqim hosil boʻldi. Maydon energiyasi necha mJ?',
      hint: 'W = I · Ф / 2.',
      explanation: '2,5 · 0,0008 / 2 = 0,001 J = 1 mJ.',
      widget: { type: 'number_answer', props: { answer: 1, tolerance: 0.01, unit: 'mJ' } }
    },
    {
      id: 'f11q4',
      prompt: 'Induktivligi 5 mH gʻaltakdan 0,4 A tok oʻtmoqda. Energiya necha mJ?',
      hint: 'W = L I² / 2.',
      explanation: '0,005 · 0,16 / 2 = 0,0004 J = 0,4 mJ.',
      widget: { type: 'number_answer', props: { answer: 0.4, tolerance: 0.01, unit: 'mJ' } }
    },
    {
      id: 'f11q5',
      prompt: 'Gʻaltakdagi tok 2 marta oshirildi. Maydon energiyasi qanday oʻzgaradi?',
      hint: 'W ~ I².',
      explanation: '2² = 4 marta oshadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['2 marta oshadi', '4 marta oshadi', 'oʻzgarmaydi', '2 marta kamayadi'], answerIndex: 1 } }
    },
    {
      id: 'f11q6',
      prompt: 'Energiya formulalarini moslang.',
      hint: 'Ikkalasida ham «yarim».',
      explanation: 'Kinetik — mv²/2; magnit maydon — LI²/2; grafik orqali — IФ/2.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'kinetik energiya', right: 'm v² / 2' },
            { left: 'magnit maydon energiyasi', right: 'L I² / 2' },
            { left: 'Ф–I grafigi ostidagi yuza', right: 'I Ф / 2' }
          ]
        }
      }
    },
    {
      id: 'f11q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Grafik — toʻgʻri chiziq.',
      explanation: 'Ish uchburchak yuziga teng; temir oʻzak induktivlikni oshiradi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Maydonni hosil qilish ishi Ф–I grafigi ostidagi ' },
            { blank: 'uchburchak' },
            { text: ' yuziga teng. Temir oʻzak gʻaltakning ' },
            { blank: 'induktivligi' },
            { text: 'ni keskin oshiradi.' }
          ],
          bank: ['uchburchak', 'induktivligi', 'toʻrtburchak', 'qarshiligi']
        }
      }
    },
    {
      id: 'f11q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'W = L I² / 2.',
      explanation: 'Energiya induktivlikka toʻgʻri proporsional; tok nol boʻlsa energiya ham nol.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Induktivlik 3 marta oshsa (tok oʻzgarmasa), energiya 3 marta oshadi.', value: true },
            { text: 'Gʻaltakdan tok oʻtmasa ham uning maydoni energiyaga ega.', value: false },
            { text: 'Elektromagnit kran magnit maydon energiyasidan foydalanadi.', value: true }
          ]
        }
      }
    }
  ]
};
