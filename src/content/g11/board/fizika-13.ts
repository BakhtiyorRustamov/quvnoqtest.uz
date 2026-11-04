import type { BoardLesson } from './types';
import { capacitor, seg, vcoil } from './phys';

export const BOB3 = { kicker: 'III bob', title: 'Elektromagnit tebranishlar' };

/** Darslik: Fizika 11, 11-mavzu (42–45-betlar) — erkin elektromagnit tebranishlar, tebranish konturi, konturda energiyaning oʻzgarishi. */
export const FIZ_13: BoardLesson = {
  n: 13,
  label: '11',
  group: BOB3,
  title: 'Tebranish konturi va undagi energiya',
  section: '11-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Radioning murvatini burab, kerakli toʻlqinni topasiz. Telefoningiz esa bir vaqtda minglab signallar ichidan aynan sizga kelganini ajratadi. Buning yuragida oddiy zanjir turadi: kondensator va gʻaltak. Ularda zaryad va tok sekundiga millionlab marta oʻzgarib turadi — bu elektromagnit tebranishlar.",
      easy: "Radio va telefon ichida kondensator va gʻaltak — elektromagnit tebranishlar.",
      draw: [
        { t: 'title', text: 'Radio toʻlqinni qanday tutadi?' },
        { t: 'icon', x: 16, y: 34, emoji: '📻', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '📱', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['kondensator + gʻaltak', 'zaryad va tok tebranadi', 'sekundiga millionlab marta'] }
      ],
      next: 'Tebranish konturi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kondensatorni batareyadan zaryadlab, keyin gʻaltakka ulaymiz. Kondensator gʻaltak orqali razryadlanadi, tok asta-sekin oshadi va gʻaltakda magnit maydon hosil boʻladi. Kondensator boʻshagach, oʻzinduksiya tokni davom ettiradi va kondensatorni teskari ishorada zaryadlaydi. Jarayon takrorlanaveradi. L va C dan iborat bu berk zanjir tebranish konturi deyiladi.",
      easy: "L va C dan iborat berk zanjir — tebranish konturi.",
      draw: [
        { t: 'title', text: 'Tebranish konturi' },
        ...seg('t', 20, 26, 60, 26),
        ...seg('b', 20, 58, 60, 58),
        ...seg('l1', 20, 26, 20, 40.5),
        ...capacitor('c', 20, 42),
        ...seg('l2', 20, 43.5, 20, 58),
        ...seg('r1', 60, 26, 60, 33),
        ...vcoil(60, 35, 5, 3),
        ...seg('r2', 60, 49, 60, 58),
        { t: 'text', x: 8, y: 44, text: 'C', color: 'blue' },
        { t: 'text', x: 66, y: 44, text: 'L', color: 'orange' },
        { t: 'text', x: 27, y: 40, text: '+', color: 'red', size: 's' },
        { t: 'text', x: 27, y: 47, text: '−', color: 'blue', size: 's' },
        { t: 'list', x: 72, y: 30, items: ['C → L', 'L → C', '…'] }
      ],
      next: 'Bir davr ichida'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bir davr ichida nima boʻladi? Boshida kondensator toʻla zaryadlangan, tok nol — energiya elektr maydonda. Chorak davrdan keyin zaryad nol, tok eng katta — energiya magnit maydonda. Yarim davrda kondensator teskari zaryadlangan, tok yana nol. Uch chorakda tok teskari yoʻnalishda eng katta. Bir davrdan soʻng hammasi boshiga qaytadi.",
      easy: "0: q max; T/4: I max; T/2: −q max; 3T/4: −I max.",
      draw: [
        { t: 'title', text: 'Bir davr ichida' },
        {
          t: 'table',
          x: 6,
          y: 24,
          rows: [
            ['t', 'zaryad q', 'tok I', 'energiya'],
            ['0', 'q max', '0', 'elektr'],
            ['T/4', '0', 'I max', 'magnit'],
            ['T/2', '−q max', '0', 'elektr'],
            ['3T/4', '0', '−I max', 'magnit']
          ]
        }
      ],
      next: 'Tomson formulasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tebranish davrini ingliz fizigi Tomson topgan: T teng 2 pi ildiz ostida L C. Chastota esa bir boʻlinsin T. Ideal konturda energiya sarflanmaydi: istalgan paytda elektr va magnit energiyalar yigʻindisi oʻzgarmas: q kvadrat boʻlinsin 2C qoʻshuv L i kvadrat boʻlinsin 2, bu esa q max kvadrat boʻlinsin 2C ga yoki L I max kvadrat boʻlinsin 2 ga teng.",
      easy: "T = 2π√(LC); W = q²/2C + Li²/2 = const.",
      draw: [
        { t: 'title', text: 'Davr va energiya' },
        { t: 'formula', x: 6, y: 22, text: 'T = 2π √(L C),   ν = 1 / T' },
        { t: 'formula', x: 6, y: 40, text: 'W = q² / 2C + L i² / 2 = const' },
        { t: 'list', x: 6, y: 54, items: ['= qₘ² / 2C = L Iₘ² / 2'] }
      ],
      next: 'Mayatnikka oʻxshashlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Konturdagi tebranishlar prujinali mayatnikka juda oʻxshaydi. Zaryad — koordinataga, tok — tezlikka, induktivlik — massaga, sigʻimga teskari kattalik — prujina bikrligiga mos keladi. Elektr maydon energiyasi potensial energiyaga, magnit maydon energiyasi kinetik energiyaga oʻxshaydi.",
      easy: "q ↔ x, i ↔ v, L ↔ m, 1/C ↔ k.",
      draw: [
        { t: 'title', text: 'Mexanika ↔ elektr' },
        {
          t: 'table',
          x: 6,
          y: 24,
          rows: [
            ['mayatnik', 'kontur'],
            ['x — koordinata', 'q — zaryad'],
            ['v — tezlik', 'i — tok'],
            ['m — massa', 'L — induktivlik'],
            ['k — bikrlik', '1/C'],
            ['m v² / 2', 'L i² / 2']
          ]
        }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Konturda sigʻim 10 ning minus 5 darajasi farad, induktivlik 0,4 henri, kondensatordagi eng katta kuchlanish 2 volt. Davr: 2 pi ildiz ostida 0,4 karra 10 ning minus 5 darajasi, yaʼni taxminan 0,0126 sekund. Eng katta energiya: C U kvadrat boʻlinsin 2 — 20 mikrojoul.",
      easy: "T ≈ 0,0126 s; W = CU²/2 = 20 μJ.",
      draw: [
        { t: 'title', text: 'Davr va energiyani topamiz' },
        { t: 'list', x: 6, y: 20, items: ['C = 10⁻⁵ F, L = 0,4 H', 'U max = 2 V'] },
        { t: 'formula', x: 6, y: 42, text: 'T = 2π √(0,4 · 10⁻⁵) ≈ 0,0126 s' },
        { t: 'formula', x: 6, y: 58, text: 'W = C U² / 2 = 20 μJ' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'L va C dan iborat berk zanjir — tebranish konturi; unda erkin elektromagnit tebranishlar hosil boʻladi.',
    'Tomson formulasi: T = 2π√(LC); ideal konturda W = q²/2C + Li²/2 = const.',
    'Oʻxshashlik: q ↔ x, i ↔ v, L ↔ m, 1/C ↔ k; elektr energiya ↔ potensial, magnit ↔ kinetik.'
  ],
  questions: [
    {
      id: 'f13q1',
      prompt: 'Konturda C = 8 pF, L = 0,5 mH, gʻaltakdagi eng katta tok 40 mA. Kondensatordagi eng katta kuchlanish necha V? (butun songacha)',
      hint: 'L Iₘ² / 2 = C Uₘ² / 2 → Uₘ = Iₘ √(L/C).',
      explanation: '√(0,5·10⁻³ / 8·10⁻¹²) ≈ 7906; 0,04 · 7906 ≈ 316 V.',
      widget: { type: 'number_answer', props: { answer: 316, tolerance: 3, unit: 'V' } }
    },
    {
      id: 'f13q2',
      prompt: 'Ideal konturda L = 0,2 H, C = 20 μF. Kuchlanish 1 V boʻlganda tok 0,01 A edi. Eng katta tok necha mA? (butun songacha)',
      hint: 'W = CU²/2 + Li²/2 = L Iₘ²/2.',
      explanation: 'W = 10⁻⁵ + 10⁻⁵ = 2·10⁻⁵ J; Iₘ = √(2W/L) = √(2·10⁻⁴) ≈ 0,014 A = 14 mA.',
      widget: { type: 'number_answer', props: { answer: 14.1, tolerance: 0.4, unit: 'mA' } }
    },
    {
      id: 'f13q3',
      prompt: 'Gʻaltak induktivligi 0,04 H, erkin tebranishlar chastotasi 800 Hz. Kondensator sigʻimi necha μF? (0,01 gacha)',
      hint: 'C = 1 / (4π² ν² L).',
      explanation: '1 / (39,5 · 640000 · 0,04) ≈ 0,99·10⁻⁶ F ≈ 1 μF.',
      widget: { type: 'number_answer', props: { answer: 0.99, tolerance: 0.02, unit: 'μF' } }
    },
    {
      id: 'f13q4',
      prompt: 'Sigʻimi 50 pF kondensatorli konturning erkin tebranishlar chastotasi 10 MHz. Induktivlik necha μH? (0,1 gacha)',
      hint: 'L = 1 / (4π² ν² C).',
      explanation: '1 / (39,5 · 10¹⁴ · 5·10⁻¹¹) ≈ 5,1·10⁻⁶ H.',
      widget: { type: 'number_answer', props: { answer: 5.07, tolerance: 0.08, unit: 'μH' } }
    },
    {
      id: 'f13q5',
      prompt: 'Ideal konturda kondensator sigʻimi 9 marta kamaytirildi. Tebranish chastotasi qanday oʻzgaradi?',
      hint: 'ν ~ 1/√C.',
      explanation: '√9 = 3, chastota 3 marta ortadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['3 marta kamayadi', '3 marta ortadi', '9 marta kamayadi', '9 marta ortadi'], answerIndex: 1 } }
    },
    {
      id: 'f13q6',
      prompt: 'Ideal konturda elektr energiyaning eng katta qiymati 2 mJ, magnit energiyaniki ham 2 mJ. Toʻla energiya qanday?',
      hint: 'Energiya bir turdan ikkinchisiga oʻtadi.',
      explanation: 'Toʻla energiya oʻzgarmaydi va 2 mJ ga teng: u goh elektr, goh magnit shaklda boʻladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0 dan 2 mJ gacha oʻzgaradi', '0 dan 4 mJ gacha oʻzgaradi', 'oʻzgarmaydi va 2 mJ', 'oʻzgarmaydi va 4 mJ'], answerIndex: 2 } }
    },
    {
      id: 'f13q7',
      prompt: 'Mexanik va elektr kattaliklarni moslang.',
      hint: 'Massa ↔ induktivlik.',
      explanation: 'x ↔ q, v ↔ i, m ↔ L, k ↔ 1/C.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'koordinata x', right: 'zaryad q' },
            { left: 'tezlik v', right: 'tok i' },
            { left: 'massa m', right: 'induktivlik L' },
            { left: 'bikrlik k', right: '1/C' }
          ]
        }
      }
    },
    {
      id: 'f13q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Chorak davrda zaryad nol.',
      explanation: 'T/4 da zaryad nol, tok eng katta; L oshsa davr oshadi; ideal konturda tebranish soʻnmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Chorak davrda kondensator zaryadi nolga, tok esa eng kattaga teng.', value: true },
            { text: 'Induktivlik oshsa, tebranish davri kamayadi.', value: false },
            { text: 'Ideal konturda tebranishlar soʻnmaydi.', value: true },
            { text: 'Kondensator toʻla zaryadlanganda energiya gʻaltakning magnit maydonida boʻladi.', value: false }
          ]
        }
      }
    }
  ]
};
