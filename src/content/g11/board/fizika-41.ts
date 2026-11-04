import type { BoardLesson } from './types';
import { BOB7 } from './fizika-39';
import { wave } from './phys';

// solishtirma bogʻlanish energiyasi (taxminiy shakl), MeV
const eb = (A: number) => 8.7 * (1 - Math.exp(-A / 12)) - (A > 60 ? 0.0058 * (A - 60) : 0);

/** Darslik: Fizika 11, 39-mavzu (160–163-betlar) — atom yadrosining tarkibi, izotoplar, yadro kattaligi, massa defekti, bogʻlanish energiyasi. */
export const FIZ_41: BoardLesson = {
  n: 41,
  label: '39',
  group: BOB7,
  title: 'Atom yadrosining tuzilishi. Bogʻlanish energiyasi',
  section: '39-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Agar atomni futbol stadioni kattaligigacha kattalashtirsak, yadro uning markazidagi noʻxatdek boʻlib qoladi. Shunga qaramay, atom massasining deyarli hammasi shu noʻxatda! Yadro nimadan iborat va uni nima bir butun ushlab turadi?",
      easy: "Yadro juda kichik, lekin atom massasining deyarli hammasi unda.",
      draw: [
        { t: 'title', text: 'Stadion va noʻxat' },
        { t: 'icon', x: 16, y: 34, emoji: '🏟️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🟢', size: 'm' },
        { t: 'list', x: 32, y: 28, items: ['atom: ~10⁻¹⁰ m', 'yadro: 10⁻¹⁴–10⁻¹⁵ m', 'massaning ~99,9 % — yadroda'] }
      ],
      next: 'Yadro tarkibi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ivanenko va Geyzenberg modeliga koʻra yadro protonlar va neytronlardan iborat, ular birgalikda nuklonlar deyiladi. Proton 1919-yilda kashf qilingan, massasi elektronnikidan 1836 marta katta. Neytron zaryadsiz, uni 1932-yilda Chedvik kashf qilgan. A — massa soni, nuklonlar soni; Z — zaryad soni, protonlar soni; neytronlar soni N teng A minus Z.",
      easy: "Yadro = Z proton + N neytron; A = Z + N.",
      draw: [
        { t: 'title', text: 'Yadro tarkibi' },
        { t: 'formula', x: 6, y: 22, text: 'A = Z + N' },
        { t: 'table', x: 6, y: 32, rows: [['zarra', 'zaryad', 'massa, kg'], ['proton p', '+e', '1,6726·10⁻²⁷'], ['neytron n', '0', '1,6749·10⁻²⁷']] },
        { t: 'list', x: 6, y: 54, items: ['proton — 1919, neytron — Chedvik 1932', 'mₚ ≈ 1836 mₑ'] }
      ],
      next: 'Izotoplar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Protonlar soni bir xil, neytronlar soni turlicha boʻlgan yadrolar izotoplar deyiladi — masalan vodorod, deyteriy va tritiy. Massa soni bir xil, zaryadi turlicha yadrolar — izobarlar. Yadro radiusi R teng R nol karra A ning uchdan bir darajasi, R nol 1,2 dan 1,7 femtometrgacha. Barcha yadrolarda zichlik deyarli bir xil va ulkan — taxminan 2 karra 10 ning 17 darajasi kilogramm kub metr.",
      easy: "Izotop — Z bir xil, N har xil. R = R₀·∛A. Zichlik ~2·10¹⁷ kg/m³.",
      draw: [
        { t: 'title', text: 'Izotoplar va yadro kattaligi' },
        { t: 'list', x: 6, y: 22, items: ['izotoplar: ¹H, ²H, ³H (Z = 1)', 'izobarlar: A bir xil, Z har xil'] },
        { t: 'formula', x: 6, y: 42, text: 'R = R₀ · ∛A,  R₀ = 1,2–1,7 fm' },
        { t: 'text', x: 6, y: 58, text: 'ρ ≈ 2 · 10¹⁷ kg/m³ — barcha yadrolarda', size: 's', color: 'red' }
      ],
      next: 'Massa defekti'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yadro massasi uni tashkil etgan nuklonlar massalari yigʻindisidan kichik ekan! Bu farq massa defekti: delta m teng Z karra m p qoʻshuv A minus Z karra m n minus yadro massasi. Bu massa energiyaga aylangan: bogʻlanish energiyasi E teng delta m c kvadrat. Yadroni nuklonlarga ajratish uchun aynan shuncha energiya kerak. 1 atom massa birligi 931,5 megaelektronvoltga mos keladi.",
      easy: "Δm = Zmₚ + (A−Z)mₙ − m ya; E bog = Δm·c²; 1 u → 931,5 MeV.",
      draw: [
        { t: 'title', text: 'Massa defekti' },
        { t: 'formula', x: 4, y: 24, text: 'Δm = Z mₚ + (A − Z) mₙ − m ya' },
        { t: 'formula', x: 4, y: 40, text: 'E bog = Δm c²' },
        { t: 'formula', x: 4, y: 54, text: '1 u · c² = 931,5 MeV' }
      ],
      next: 'Solishtirma bogʻlanish energiyasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yadrolar barqarorligini solishtirish uchun bitta nuklonga toʻgʻri keladigan energiya olinadi: E sol teng E bog boʻlinsin A. Grafikda oʻrtadagi yadrolar, masalan temir, eng barqaror — 8,7 megaelektronvolt atrofida. Uranda 7,6, deyteriyda esa atigi 1,1. Shuning uchun energiyani ikki yoʻl bilan olish mumkin: yengil yadrolarni sintez qilish va ogʻir yadrolarni boʻlish.",
      easy: "E sol = E bog/A; oʻrtada ~8,7 MeV — eng barqaror. Sintez va boʻlinish.",
      draw: [
        { t: 'title', text: 'E sol — massa soniga bogʻliq' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 60, h: 42, xmin: 0, xmax: 250, ymin: 0, ymax: 10, xlabel: 'A', ylabel: 'E sol, MeV' },
        { t: 'curve', axes: 'g', points: wave(eb, 2, 240, 80), color: 'blue' },
        { t: 'dot', axes: 'g', x: 56, y: eb(56), label: 'Fe' },
        { t: 'dot', axes: 'g', x: 238, y: eb(238), label: 'U' },
        { t: 'list', x: 72, y: 24, items: ['sintez ←', '→ boʻlinish', 'Fe ≈ 8,7', 'U ≈ 7,6'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Natriy-23 va ftor-19 yadrolari tarkibini aniqlaymiz. Natriyda Z teng 11, demak 11 proton; neytronlar N teng 23 minus 11, yaʼni 12. Ftorda Z teng 9 — 9 proton, neytronlar 19 minus 9, yaʼni 10 ta.",
      easy: "Na-23: 11 p, 12 n. F-19: 9 p, 10 n.",
      draw: [
        { t: 'title', text: 'Yadro tarkibini topamiz' },
        { t: 'formula', x: 6, y: 24, text: '²³Na:  Z = 11,  N = 23 − 11 = 12' },
        { t: 'formula', x: 6, y: 40, text: '¹⁹F:  Z = 9,  N = 19 − 9 = 10' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Yadro proton va neytronlardan (nuklonlardan) iborat: A = Z + N; izotoplarda Z bir xil, N har xil.',
    'Yadro radiusi R = R₀·∛A, zichlik barcha yadrolarda bir xil va ulkan.',
    'Massa defekti Δm = Zmₚ + (A−Z)mₙ − m ya; bogʻlanish energiyasi E = Δm·c²; E sol oʻrta yadrolarda eng katta (~8,7 MeV).'
  ],
  questions: [
    {
      id: 'f41q1',
      prompt: 'Uran-238 (Z = 92) yadrosida nechta neytron bor?',
      hint: 'N = A − Z.',
      explanation: '238 − 92 = 146 ta neytron.',
      widget: { type: 'number_answer', props: { answer: 146 } }
    },
    {
      id: 'f41q2',
      prompt: 'Litiy-7 (Z = 3) uchun solishtirma bogʻlanish energiyasi necha MeV? m(H) = 1,00783 u, mₙ = 1,00866 u, m(⁷Li) = 7,01600 u; 1 u = 931,5 MeV. (0,1 gacha)',
      hint: 'Δm = 3·1,00783 + 4·1,00866 − 7,01600.',
      explanation: 'Δm = 0,04213 u; E = 39,2 MeV; E/7 ≈ 5,6 MeV.',
      widget: { type: 'number_answer', props: { answer: 5.6, tolerance: 0.1, unit: 'MeV' } }
    },
    {
      id: 'f41q3',
      prompt: 'Aluminiy-27 yadrosining radiusi necha fm? (R₀ = 1,2 fm)',
      hint: '∛27 = 3.',
      explanation: '1,2 · 3 = 3,6 fm.',
      widget: { type: 'number_answer', props: { answer: 3.6, tolerance: 0.01, unit: 'fm' } }
    },
    {
      id: 'f41q4',
      prompt: 'Qaysi yadro eng barqaror?',
      hint: 'E sol eng katta — davriy sistema oʻrtasida.',
      explanation: 'Temir-56 (≈ 8,7 MeV/nuklon).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['deyteriy ²H', 'temir ⁵⁶Fe', 'uran ²³⁸U', 'geliy-3'], answerIndex: 1 } }
    },
    {
      id: 'f41q5',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Izotop — Z bir xil.',
      explanation: 'Izotop — Z bir xil, N har xil; izobar — A bir xil; nuklon — proton yoki neytron; massa defekti — massa yetishmovchiligi.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'izotoplar' }, b: { label: 'Z bir xil, N har xil' } },
            { a: { label: 'izobarlar' }, b: { label: 'A bir xil, Z har xil' } },
            { a: { label: 'nuklon' }, b: { label: 'proton yoki neytron' } },
            { a: { label: 'massa defekti' }, b: { label: 'massa yetishmovchiligi' } }
          ]
        }
      }
    },
    {
      id: 'f41q6',
      prompt: 'Qaysi biri yadro tarkibiga kirmaydi?',
      hint: 'Elektron yadro atrofida.',
      explanation: 'Elektron — atom qobigʻida, yadroda emas.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'proton' }, { text: 'neytron' }, { text: 'elektron', odd: true }, { text: 'nuklon' }] } }
    },
    {
      id: 'f41q7',
      prompt: 'Uran-238 tarkibi qanday?',
      hint: 'Z = 92.',
      explanation: '92 proton, 146 neytron.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['92 proton, 238 neytron', '92 neytron, 146 proton', '92 proton, 146 neytron', '238 proton, 92 neytron'], answerIndex: 2 } }
    },
    {
      id: 'f41q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Yadro massasi nuklonlar yigʻindisidan kichik.',
      explanation: 'Massa defekti musbat; izotoplar kimyoviy jihatdan bir xil; neytron zaryadsiz.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Yadro massasi uni tashkil etgan nuklonlar massalari yigʻindisidan kichik.', value: true },
            { text: 'Neytron zaryadsiz zarra.', value: true },
            { text: 'Izotoplarda protonlar soni turlicha.', value: false },
            { text: 'Ogʻir yadrolarda solishtirma bogʻlanish energiyasi eng katta.', value: false }
          ]
        }
      }
    }
  ]
};
