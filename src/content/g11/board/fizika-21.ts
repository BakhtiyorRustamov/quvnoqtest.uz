import type { BoardLesson } from './types';
import { BOB3 } from './fizika-13';
import { wave } from './phys';

// sample circuit: L = 1 H, C = 2 μF, R = 600 Ω (coil with a core), U = 10 V
const L = 1, C = 2e-6, R = 600, U = 10;
const amp = (v: number) => {
  const w = 2 * Math.PI * v;
  const XL = w * L, XC = 1 / (w * C);
  const I = U / Math.hypot(R, XL - XC);
  return { UC: I * XC, UL: I * XL };
};

/** Darslik: Fizika 11, 19-mavzu (65–66-betlar) — laboratoriya ishi: oʻzgaruvchan tok zanjirida rezonansni oʻrganish (namuna oʻlchashlar bilan). */
export const FIZ_21: BoardLesson = {
  n: 21,
  label: '19',
  group: BOB3,
  title: 'Laboratoriya: rezonansni oʻrganish',
  section: '19-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Bugun laboratoriya ishi: rezonansni oʻz koʻzimiz bilan koʻramiz. Tovush generatori chastotasini sekin oshirib, kondensator va gʻaltakdagi kuchlanishlarni oʻlchaymiz. Ular tenglashgan chastota — rezonans chastotasi. Keyin uni Tomson formulasi bilan hisoblab, solishtiramiz.",
      easy: "Chastotani oshirib, UC = UL boʻlgan joyni topamiz — bu rezonans.",
      draw: [
        { t: 'title', text: 'Ishning maqsadi' },
        { t: 'icon', x: 16, y: 34, emoji: '🔬', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '📈', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['kuchlanishlar rezonansini kuzatish', 'UC va UL ni oʻlchash', 'ν rez ni hisob bilan solishtirish'] }
      ],
      next: 'Asboblar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kerakli asboblar: tovush generatori, temir oʻzakli gʻaltak — induktivligi 1 genri, sigʻimi 10 mikrofaradgacha oʻzgaradigan kondensatorlar batareyasi, ikkita multimetr, qarshiliklar va kalit. Zanjir ketma-ket yigʻiladi, multimetrlar kondensator va gʻaltakka parallel ulanadi. Biz sigʻimni 2 mikrofarad qilib olamiz.",
      easy: "Generator, L = 1 H gʻaltak, C = 2 μF, ikki multimetr.",
      draw: [
        { t: 'title', text: 'Asboblar va zanjir' },
        { t: 'list', x: 6, y: 22, items: ['tovush generatori (TG): 10 V', 'gʻaltak L = 1 H (temir oʻzakli)', 'kondensator C = 2 μF', 'ikkita multimetr (~V, 20 V)', 'kalit, simlar'] }
      ],
      next: 'Ishning bajarilishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ishning tartibi: generatorni 10 volt kuchlanishga qoʻyamiz. Chastotani pastdan boshlab sekin oshirib boramiz va har safar kondensator hamda gʻaltakdagi multimetr koʻrsatishlarini jadvalga yozamiz. Past chastotalarda U C katta, U L kichik. Ular tenglashgan joyda toʻxtab, yana bir oz oshirib koʻramiz.",
      easy: "Chastotani oshirib, UC va UL ni yozib boramiz.",
      draw: [
        { t: 'title', text: 'Tartib' },
        { t: 'list', x: 6, y: 22, items: ['1) TG: 10 V, past chastota', '2) UC va UL ni oʻlchash', '3) chastotani oshirish, takrorlash', '4) UC = UL boʻlgan ν ni topish', '5) grafik chizish'] }
      ],
      next: 'Natijalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Mana namuna natijalar. 60 gersda kondensatorda 11,8 volt, gʻaltakda 3,4 volt. Chastota oshgan sari U C kamayib, U L oshib boradi. Taxminan 112 gersda ikkalasi 11,8 voltdan — tenglashdi. Undan keyin U L kattaroq boʻlib qoladi.",
      easy: "≈ 112 Hz da UC = UL = 11,8 V.",
      draw: [
        { t: 'title', text: 'Oʻlchash natijalari' },
        {
          t: 'table',
          x: 6,
          y: 22,
          rows: [
            ['ν, Hz', 'UC, V', 'UL, V'],
            ['60', '11,8', '3,4'],
            ['80', '12,8', '6,5'],
            ['100', '12,8', '10,1'],
            ['112', '11,8', '11,8'],
            ['130', '9,7', '12,9'],
            ['150', '7,3', '12,9']
          ]
        }
      ],
      next: 'Grafik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Natijalarni grafikka tushiramiz: koʻk chiziq — kondensatordagi kuchlanish, toʻq sariq — gʻaltakdagi. Ular kesishgan nuqta rezonans chastotasini beradi: taxminan 112 gers.",
      easy: "Ikki chiziq kesishgan joy — rezonans chastotasi.",
      draw: [
        { t: 'title', text: 'UC va UL grafigi' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 58, h: 44, xmin: 40, xmax: 200, ymin: 0, ymax: 14, xlabel: 'ν, Hz', ylabel: 'U, V' },
        { t: 'curve', axes: 'g', points: wave((v) => amp(v).UC, 40, 200), color: 'blue' },
        { t: 'curve', axes: 'g', points: wave((v) => amp(v).UL, 40, 200), color: 'orange' },
        { t: 'list', x: 72, y: 26, items: ['UC — koʻk', 'UL — sariq', 'kesishish:', '≈ 112 Hz'] }
      ],
      next: 'Hisob bilan solishtiramiz'
    },
    {
      kind: 'example',
      clear: true,
      say: "Endi Tomson formulasi bilan hisoblaymiz: nu teng bir boʻlinsin 2 pi ildiz L C. L C teng 2 karra 10 ning minus 6 darajasi, ildizi 1,41 karra 10 ning minus 3 darajasi. Nu taxminan 112,5 gers — tajriba bilan juda yaxshi mos keladi!",
      easy: "ν = 1/(2π√(1 · 2·10⁻⁶)) ≈ 112,5 Hz — tajribaga mos.",
      draw: [
        { t: 'title', text: 'Nazariya va tajriba' },
        { t: 'formula', x: 6, y: 24, text: 'ν rez = 1 / (2π √(LC))' },
        { t: 'formula', x: 6, y: 40, text: '= 1 / (2π √(2 · 10⁻⁶)) ≈ 112,5 Hz' },
        { t: 'text', x: 6, y: 58, text: 'tajribada ≈ 112 Hz ✓', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Chastota oshgan sari kondensatordagi kuchlanish kamayadi, gʻaltakdagisi oshadi.',
    'UC = UL boʻlgan chastota — rezonans chastotasi; tajribada ≈ 112 Hz.',
    'Tomson formulasi ν = 1/(2π√LC) bilan hisoblangan qiymat tajribaga mos keladi.'
  ],
  questions: [
    {
      id: 'f21q1',
      prompt: 'Tajribada L = 1 H, C = 4 μF olinsa, rezonans chastotasi necha Hz boʻladi? (0,1 gacha)',
      hint: 'ν = 1/(2π√LC).',
      explanation: '√(4·10⁻⁶) = 2·10⁻³; ν = 1/(6,28 · 2·10⁻³) ≈ 79,6 Hz.',
      widget: { type: 'number_answer', props: { answer: 79.6, tolerance: 0.2, unit: 'Hz' } }
    },
    {
      id: 'f21q2',
      prompt: 'L = 1 H gʻaltak bilan rezonans 100 Hz da boʻlishi uchun qanday sigʻim kerak (μF)? (0,01 gacha)',
      hint: 'C = 1/(4π²ν²L).',
      explanation: '1 / (39,48 · 10⁴ · 1) ≈ 2,53·10⁻⁶ F.',
      widget: { type: 'number_answer', props: { answer: 2.53, tolerance: 0.02, unit: 'μF' } }
    },
    {
      id: 'f21q3',
      prompt: 'Rezonansda generator kuchlanishi 10 V, zanjirdagi tok 16,7 mA. Zanjirning aktiv qarshiligi necha Ω? (butun songacha)',
      hint: 'Rezonansda Z = R.',
      explanation: 'R = 10 / 0,0167 ≈ 600 Ω.',
      widget: { type: 'number_answer', props: { answer: 599, tolerance: 6, unit: 'Ω' } }
    },
    {
      id: 'f21q4',
      prompt: 'Past chastotalarda nega UC > UL?',
      hint: 'XC = 1/(ωC), XL = ωL.',
      explanation: 'Past chastotada sigʻim qarshilik katta, induktiv qarshilik kichik — kuchlanish kondensatorda koʻp tushadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Kondensator kattaroq', 'Past chastotada XC katta, XL kichik', 'Multimetr xato', 'Gʻaltakda tok yoʻq'], answerIndex: 1 } }
    },
    {
      id: 'f21q5',
      prompt: 'Gʻaltakka temir oʻzak chuqurroq kiritilsa, rezonans chastotasi qanday oʻzgaradi?',
      hint: 'Oʻzak L ni oshiradi.',
      explanation: 'L oshadi, ν = 1/(2π√LC) kamayadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Oshadi', 'Kamayadi', 'Oʻzgarmaydi', 'Rezonans yoʻqoladi'], answerIndex: 1 } }
    },
    {
      id: 'f21q6',
      prompt: 'Ish bosqichlarini tartiblang.',
      hint: 'Avval zanjir yigʻiladi.',
      explanation: 'Zanjir → TG ni sozlash → oʻlchash → chastotani oshirish → UC = UL ni topish → hisob bilan solishtirish.',
      widget: {
        type: 'step_order',
        props: { steps: ['Zanjirni sxema boʻyicha yigʻish', 'Generatorni 10 V ga sozlash', 'UC va UL ni oʻlchab yozish', 'Chastotani oshirib takrorlash', 'UC = UL boʻlgan chastotani topish', 'ν rez ni formula bilan solishtirish'] }
      }
    },
    {
      id: 'f21q7',
      prompt: 'Jadvalga koʻra 130 Hz da qaysi kuchlanish katta?',
      hint: 'Rezonansdan yuqorida.',
      explanation: 'Rezonansdan yuqori chastotada XL > XC, shuning uchun UL katta (12,9 V > 9,7 V).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['UC', 'UL', 'teng', 'ikkalasi nol'], answerIndex: 1 } }
    },
    {
      id: 'f21q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Rezonansda tok eng katta.',
      explanation: 'Rezonansda tok eng katta, UC = UL; sigʻim oshsa rezonans chastotasi kamayadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Rezonansda zanjirdagi tok eng katta boʻladi.', value: true },
            { text: 'Sigʻim oshirilsa, rezonans chastotasi oshadi.', value: false },
            { text: 'Rezonans chastotasida UC va UL tenglashadi.', value: true }
          ]
        }
      }
    }
  ]
};
