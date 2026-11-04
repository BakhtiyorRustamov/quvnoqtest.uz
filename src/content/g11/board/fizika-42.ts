import type { BoardLesson } from './types';
import { BOB7 } from './fizika-39';
import { rect, seg, battery, fieldMarks } from './phys';

/** Darslik: Fizika 11, 40-mavzu (164–167-betlar) — radioaktiv nurlanish va zarralarni qayd qilish usullari. */
export const FIZ_42: BoardLesson = {
  n: 42,
  label: '40',
  group: BOB7,
  title: 'Zarralarni qayd qilish usullari',
  section: '40-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Elektron, proton yoki alfa-zarra shunchalik kichikki, ularni hech qanday mikroskopda koʻrib boʻlmaydi. Shunday boʻlsa-da, fiziklar ularni sanaydi, tezligini va zaryadini oʻlchaydi. Qanday qilib? Zarra oʻtgan joyda iz qoldiradi yoki signal beradi — xuddi qordagi oyoq izlari kabi.",
      easy: "Zarrani koʻrib boʻlmaydi, lekin izini va signalini qayd qilish mumkin.",
      draw: [
        { t: 'title', text: 'Koʻrinmasni koʻrish' },
        { t: 'icon', x: 16, y: 34, emoji: '👣', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '📟', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['zarra — iz (trek) qoldiradi', 'yoki elektr signal beradi', 'sanash, tezlik, zaryad'] }
      ],
      next: 'Geyger hisoblagichi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Geyger–Myuller hisoblagichi gazning ionlashishiga asoslangan. Ichki devori metall bilan qoplangan shisha naycha — katod, oʻqi boʻylab ingichka sim — anod, ichida siyrak gaz. Zarra uchib kirib, gazni ionlaydi, razryad boshlanadi va qisqa tok impulsi hosil boʻladi. Hisoblagich sekundiga 10 minggacha zarrani qayd qila oladi.",
      easy: "Geyger hisoblagichi: zarra gazni ionlaydi → tok impulsi.",
      draw: [
        { t: 'title', text: 'Geyger–Myuller hisoblagichi' },
        ...rect('tube', 10, 26, 50, 16, 'blue'),
        ...seg('wire', 8, 34, 62, 34, 'red'),
        { t: 'text', x: 35, y: 24, text: 'katod (devor)', size: 's', anchor: 'middle', color: 'blue' },
        { t: 'text', x: 64, y: 35, text: 'anod (sim)', size: 's', color: 'red' },
        ...battery('b', 30, 56),
        ...seg('w1', 10, 42, 10, 56, 'ink'),
        ...seg('w2', 10, 56, 30, 56, 'ink'),
        ...seg('w3', 32, 56, 62, 56, 'ink'),
        ...seg('w4', 62, 56, 62, 34, 'ink'),
        { t: 'text', x: 72, y: 50, text: '10⁴ zarra/s', size: 's', color: 'purple' }
      ],
      next: 'Sintillyatsiya va pufakli kamera'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sintillyatsion hisoblagichda zarra maxsus moddaga urilib, kichik yorugʻlik chaqnashini hosil qiladi. Alfa-zarra birinchi marta 1903-yilda aynan shu usulda qayd qilingan. Pufakli kamerada qizdirilgan suyuqlikda zarra izi boʻylab bugʻ pufakchalari paydo boʻladi. Uni kashf qilgani uchun Gleyzer 1960-yilda Nobel mukofotini olgan.",
      easy: "Sintillyatsiya — chaqnash (1903). Pufakli kamera — pufakchalar izi (Gleyzer, Nobel 1960).",
      draw: [
        { t: 'title', text: 'Chaqnash va pufakchalar' },
        { t: 'icon', x: 14, y: 32, emoji: '✨', size: 'l' },
        { t: 'list', x: 26, y: 26, items: ['sintillyatsion hisoblagich', 'α-zarra — 1903-yil'] },
        { t: 'icon', x: 14, y: 54, emoji: '🧪', size: 'l' },
        { t: 'list', x: 26, y: 48, items: ['pufakli kamera', 'Gleyzer — Nobel 1960'] }
      ],
      next: 'Vilson kamerasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Vilson kamerasi 1911-yilda yaratilgan. Unda oʻta toʻyingan bugʻ bor: zarra yoʻlida hosil boʻlgan ionlarda tuman tomchilari paydo boʻlib, iz — trek koʻrinadi. Alfa-zarra gazni kuchli ionlaydi — izi qalin va qisqa; beta-zarra izi ingichka. Gamma-nurni faqat u urib chiqargan elektronlar izi orqali koʻrish mumkin. Kamera magnit maydonga qoʻyilsa, izlar egiladi va zarralarning zaryadi va tezligini aniqlash mumkin.",
      easy: "Vilson kamerasi (1911): α — qalin iz, β — ingichka, γ — faqat elektronlar orqali.",
      draw: [
        { t: 'title', text: 'Vilson kamerasi (1911)' },
        ...fieldMarks(8, 22, 5, 4, 10, true, 'blue'),
        { t: 'text', x: 54, y: 66, text: 'B ⊗ — izlar egiladi', size: 's', anchor: 'middle', color: 'blue' },
        { t: 'table', x: 60, y: 22, rows: [['zarra', 'iz'], ['α', 'qalin, qisqa'], ['β', 'ingichka'], ['γ', 'elektronlar orqali']] },
        { t: 'text', x: 6, y: 66, text: 'fotoemulsiya — Misovskiy 1927', size: 's', color: 'purple' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Vilson kamerasida elektron induksiyasi 8,5 millitesla boʻlgan maydonda radiusi 4 santimetr aylana chizdi. Tezligi qancha? Lorens kuchi markazga intilma kuchga teng: e v B teng m v kvadrat boʻlinsin R. Demak v teng e B R boʻlinsin m — 1,6 karra 10 ning minus 19 darajasi karra 8,5 karra 10 ning minus 3 darajasi karra 0,04 boʻlinsin 9,1 karra 10 ning minus 31 darajasi, taxminan 6 karra 10 ning 7 darajasi metr sekund.",
      easy: "evB = mv²/R → v = eBR/m ≈ 6·10⁷ m/s.",
      draw: [
        { t: 'title', text: 'Iz boʻyicha tezlik' },
        { t: 'list', x: 6, y: 20, items: ['R = 4 cm, B = 8,5 mT', 'mₑ = 9,1 · 10⁻³¹ kg'] },
        { t: 'formula', x: 6, y: 42, text: 'e v B = m v² / R' },
        { t: 'formula', x: 6, y: 56, text: 'v = e B R / m ≈ 6 · 10⁷ m/s' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Geyger–Myuller hisoblagichi gazning ionlashishiga asoslangan — har bir zarra tok impulsi beradi.',
    'Sintillyatsion hisoblagich — chaqnashlar; pufakli kamera, Vilson kamerasi, fotoemulsiya — zarra izini (trekini) koʻrsatadi.',
    'Magnit maydonda iz egriligidan zarra tezligi topiladi: R = mv/(eB).'
  ],
  questions: [
    {
      id: 'f42q1',
      prompt: 'Elektron 8,5 mT maydonda 4 cm radiusli iz chizdi. Tezligi necha ·10⁷ m/s? (mₑ = 9,1·10⁻³¹ kg, 0,1 gacha)',
      hint: 'v = eBR/m.',
      explanation: '1,6·10⁻¹⁹ · 8,5·10⁻³ · 0,04 / 9,1·10⁻³¹ ≈ 6·10⁷ m/s.',
      widget: { type: 'number_answer', props: { answer: 5.98, tolerance: 0.1, unit: '·10⁷ m/s' } }
    },
    {
      id: 'f42q2',
      prompt: 'Elektron tezligi 2 marta kamaysa (B oʻzgarmas), izi radiusi necha marta oʻzgaradi?',
      hint: 'R = mv/(eB).',
      explanation: 'R ~ v — 2 marta kichrayadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['2 marta kichrayadi', '2 marta kattalashadi', '4 marta kichrayadi', 'oʻzgarmaydi'], answerIndex: 0 } }
    },
    {
      id: 'f42q3',
      prompt: 'Asbobni ishlash prinsipi bilan juftlang.',
      hint: 'Geyger — gaz.',
      explanation: 'Geyger — gaz ionlashishi; sintillyatsion — chaqnash; pufakli kamera — qaynayotgan suyuqlik; Vilson — oʻta toʻyingan bugʻ.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Geyger hisoblagichi', right: 'gazning ionlashishi' },
            { left: 'sintillyatsion hisoblagich', right: 'yorugʻlik chaqnashi' },
            { left: 'pufakli kamera', right: 'qizdirilgan suyuqlik' },
            { left: 'Vilson kamerasi', right: 'oʻta toʻyingan bugʻ' }
          ]
        }
      }
    },
    {
      id: 'f42q4',
      prompt: 'Yaqinida radioaktiv preparat boʻlmasa ham, Geyger hisoblagichi zarralarni qayd qilaveradi. Nega?',
      hint: 'Osmondan keladi.',
      explanation: 'Hisoblagich kosmik nurlarni qayd etadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['asbob buzilgan', 'kosmik nurlarni qayd etadi', 'havo elektronlari', 'yorugʻlik taʼsiri'], answerIndex: 1 } }
    },
    {
      id: 'f42q5',
      prompt: 'Vilson kamerasida qalin va qisqa iz qaysi zarraniki?',
      hint: 'Gazni eng kuchli ionlaydi.',
      explanation: 'α-zarra.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['α-zarra', 'β-zarra', 'γ-kvant', 'neytrino'], answerIndex: 0 } }
    },
    {
      id: 'f42q6',
      prompt: 'Asboblarni turiga qarab ajrating.',
      hint: 'Iz koʻrsatadimi yoki sanaydimi?',
      explanation: 'Iz: Vilson, pufakli kamera, fotoemulsiya. Sanash: Geyger, sintillyatsion.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 't', label: 'Iz koʻrsatadi' },
            { id: 'c', label: 'Sanaydi' }
          ],
          items: [
            { emoji: '', label: 'Vilson kamerasi', bin: 't' },
            { emoji: '', label: 'pufakli kamera', bin: 't' },
            { emoji: '', label: 'fotoemulsiya', bin: 't' },
            { emoji: '', label: 'Geyger hisoblagichi', bin: 'c' },
            { emoji: '', label: 'sintillyatsion hisoblagich', bin: 'c' }
          ]
        }
      }
    },
    {
      id: 'f42q7',
      prompt: 'Usullarni paydo boʻlish tartibida joylang.',
      hint: '1903, 1911, 1927, keyin pufakli kamera.',
      explanation: 'Sintillyatsiya (1903) → Vilson (1911) → fotoemulsiya (1927) → pufakli kamera.',
      widget: { type: 'order_line', props: { items: [{ label: 'sintillyatsiya' }, { label: 'Vilson kamerasi' }, { label: 'fotoemulsiya' }, { label: 'pufakli kamera' }] } }
    },
    {
      id: 'f42q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'γ zaryadsiz.',
      explanation: 'γ-kvant oʻzi iz qoldirmaydi; magnit maydon izlarni egadi; Geyger hisoblagichi gazli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Magnit maydonda zaryadli zarra izi egiladi.', value: true },
            { text: 'Geyger hisoblagichi gazning ionlashishiga asoslangan.', value: true },
            { text: 'γ-kvant Vilson kamerasida qalin iz qoldiradi.', value: false },
            { text: 'Fotoemulsiya usuli zarralarni faqat sanaydi, izini koʻrsatmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
