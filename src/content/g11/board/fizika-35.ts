import type { BoardLesson } from './types';
import { BOB5 } from './fizika-34';
import { wave } from './phys';

/** Darslik: Fizika 11, 33-mavzu (128–130-betlar) — massaning tezlikka bogʻliqligi, relyativistik dinamika, massa va energiya bogʻliqligi. */
export const FIZ_35: BoardLesson = {
  n: 35,
  label: '33',
  group: BOB5,
  title: 'Massa va energiya: E = mc²',
  section: '33-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Quyosh har sekundda 4 milliard kilogrammdan ortiq massasini yoʻqotadi — u nurga aylanib, Yerni isitadi va yoritadi. Atom elektr stansiyasida ham bir necha gramm massa butun shaharni bir kun yoritadigan energiyaga aylanadi. Buni dunyodagi eng mashhur formula tushuntiradi: E teng m c kvadrat.",
      easy: "Quyosh massasi nurga aylanadi — E = mc².",
      draw: [
        { t: 'title', text: 'Eng mashhur formula' },
        { t: 'icon', x: 16, y: 34, emoji: '☀️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚛️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['Quyosh: 4·10⁹ kg/s', 'massa → energiya', 'E = m c²'] }
      ],
      next: 'Massa tezlikka bogʻliq'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Nyuton qonuni impuls orqali yozilsa, katta tezliklarda ham saqlanadi: F teng delta p boʻlinsin delta t. Faqat massa endi tezlikka bogʻliq: m teng m nol boʻlinsin ildiz ostida bir minus beta kvadrat, bunda m nol — tinchlikdagi massa. Kichik tezliklarda m deyarli m nol ga teng, yorugʻlik tezligiga yaqinlashganda esa cheksiz oshadi.",
      easy: "m = m₀ / √(1 − β²); v → c da massa cheksiz oshadi.",
      draw: [
        { t: 'title', text: 'Relyativistik massa' },
        { t: 'formula', x: 4, y: 22, text: 'm = m₀ / √(1 − v²/c²)' },
        { t: 'formula', x: 4, y: 38, text: 'F = Δp / Δt' },
        { t: 'axes', id: 'g', x: 50, y: 18, w: 44, h: 44, xmin: 0, xmax: 1, ymin: 0, ymax: 5, xlabel: 'v / c', ylabel: 'm / m₀' },
        { t: 'curve', axes: 'g', points: wave((b) => 1 / Math.sqrt(1 - b * b), 0, 0.98, 60), color: 'red' }
      ],
      next: 'Massa va energiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eynshteyn jismning toʻla energiyasini topdi: E teng m c kvadrat, yaʼni m nol c kvadrat boʻlinsin ildiz ostida bir minus beta kvadrat. Tinch turgan jism ham energiyaga ega: E nol teng m nol c kvadrat — tinchlikdagi energiya. Kinetik energiya — toʻla va tinchlikdagi energiyalar farqi. Energiya oʻzgarsa, massa ham oʻzgaradi: delta m teng delta E boʻlinsin c kvadrat.",
      easy: "E = mc², E₀ = m₀c², Eₖ = E − E₀, Δm = ΔE/c².",
      draw: [
        { t: 'title', text: 'Massa va energiya bogʻliqligi' },
        { t: 'formula', x: 6, y: 22, text: 'E = m c²,   E₀ = m₀ c²' },
        { t: 'formula', x: 6, y: 38, text: 'Eₖ = E − E₀ = m₀c² (γ − 1)' },
        { t: 'formula', x: 6, y: 54, text: 'Δm = ΔE / c²' },
        { t: 'text', x: 50, y: 56, text: 'γ = 1 / √(1 − β²)', size: 's', color: 'purple' }
      ],
      next: 'Massasiz zarralar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Energiya va impuls bogʻlanishi: E kvadrat teng m nol c kvadrat ning kvadrati qoʻshuv p c ning kvadrati. Agar tinchlikdagi massa nol boʻlsa, E teng p c — zarra energiya va impulsga ega boʻla oladi. Bunday zarra — masalan foton — tinch turmaydi, doim yorugʻlik tezligida harakatlanadi.",
      easy: "E² = (m₀c²)² + (pc)²; foton: m₀ = 0, E = pc.",
      draw: [
        { t: 'title', text: 'Energiya va impuls' },
        { t: 'formula', x: 6, y: 24, text: 'E² = (m₀c²)² + (p c)²' },
        { t: 'list', x: 6, y: 40, items: ['m₀ = 0 → E = p c', 'foton — massasiz zarra', 'doim c tezlikda'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Prujinaning bikrligi 20 kilonyuton metr, u 30 santimetrga choʻzildi. Massasi qanchaga ortadi? Energiya: k x kvadrat boʻlinsin 2 — 20000 karra 0,09 boʻlinsin 2, yaʼni 900 joul. Massa ortishi: 900 boʻlinsin 9 karra 10 ning 16 darajasi — 10 ning minus 14 darajasi kilogramm. Juda kichik — shuning uchun kundalik hayotda sezmaymiz.",
      easy: "ΔE = kx²/2 = 900 J; Δm = 900/(9·10¹⁶) = 10⁻¹⁴ kg.",
      draw: [
        { t: 'title', text: 'Choʻzilgan prujina massasi' },
        { t: 'list', x: 6, y: 20, items: ['k = 20 kN/m, x = 0,3 m', 'ΔE = k x² / 2 = 900 J'] },
        { t: 'formula', x: 6, y: 46, text: 'Δm = ΔE / c² = 10⁻¹⁴ kg' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Relyativistik massa m = m₀/√(1 − v²/c²); dinamika qonuni F = Δp/Δt koʻrinishida saqlanadi.',
    'Massa va energiya bogʻliqligi: E = mc², tinchlikdagi energiya E₀ = m₀c², Eₖ = E − E₀, Δm = ΔE/c².',
    'E² = (m₀c²)² + (pc)²; massasiz zarra (foton) uchun E = pc, u doim c tezlikda harakatlanadi.'
  ],
  questions: [
    {
      id: 'f35q1',
      prompt: 'Elektron 0,6c tezlikda harakatlanmoqda. Massasi tinchlikdagidan necha marta katta?',
      hint: 'γ = 1/√(1 − 0,36).',
      explanation: '1 / 0,8 = 1,25 marta.',
      widget: { type: 'number_answer', props: { answer: 1.25, tolerance: 0.001 } }
    },
    {
      id: 'f35q2',
      prompt: 'Quyosh nurlanish quvvati 3,78·10²⁶ W. U har sekundda necha milliard kg massa yoʻqotadi? (0,1 gacha)',
      hint: 'Δm = ΔE / c².',
      explanation: '3,78·10²⁶ / 9·10¹⁶ ≈ 4,2·10⁹ kg.',
      widget: { type: 'number_answer', props: { answer: 4.2, tolerance: 0.1, unit: 'mlrd kg' } }
    },
    {
      id: 'f35q3',
      prompt: '1 kg suv 81 K ga isitildi (c = 4200 J/(kg·K)). Massasi necha ·10⁻¹² kg ga ortadi? (0,01 gacha)',
      hint: 'ΔE = c m Δt, Δm = ΔE / c².',
      explanation: '4200 · 81 = 340 200 J; 340 200 / 9·10¹⁶ ≈ 3,78·10⁻¹² kg.',
      widget: { type: 'number_answer', props: { answer: 3.78, tolerance: 0.02, unit: '·10⁻¹² kg' } }
    },
    {
      id: 'f35q4',
      prompt: '0,6c tezlikdagi zarraning kinetik energiyasi tinchlikdagi energiyasidan necha marta kichik?',
      hint: 'Eₖ/E₀ = γ − 1.',
      explanation: 'γ − 1 = 0,25 → 4 marta kichik.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'f35q5',
      prompt: 'Zarraning kinetik energiyasi tinchlikdagi energiyasiga teng. Tezligi qancha?',
      hint: 'γ = 2.',
      explanation: '1 − β² = 1/4 → β = √3/2 ≈ 0,87.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['0,5c', '√3/2 · c ≈ 0,87c', '0,71c', '0,99c'], answerIndex: 1 } }
    },
    {
      id: 'f35q6',
      prompt: 'Qaysi biri koʻp energiyaga ega: 1 kg suv, 1 kg koʻmir yoki 1 kg benzin (toʻla energiya E = mc²)?',
      hint: 'Massalar teng.',
      explanation: 'Massalar teng boʻlgani uchun toʻla energiyalar ham teng.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['benzin', 'koʻmir', 'suv', 'hammasi teng'], answerIndex: 3 } }
    },
    {
      id: 'f35q7',
      prompt: 'Formulani nomi bilan juftlang.',
      hint: 'E₀ — tinchlikdagi.',
      explanation: 'E = mc² — toʻla energiya; E₀ = m₀c² — tinchlikdagi energiya; Eₖ = E − E₀ — kinetik; E = pc — foton.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'E = mc²' }, b: { label: 'toʻla energiya' } },
            { a: { label: 'E₀ = m₀c²' }, b: { label: 'tinchlikdagi energiya' } },
            { a: { label: 'Eₖ = E − E₀' }, b: { label: 'kinetik energiya' } },
            { a: { label: 'E = pc' }, b: { label: 'massasiz zarra' } }
          ]
        }
      }
    },
    {
      id: 'f35q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Foton tinch turmaydi.',
      explanation: 'Fotonning tinchlikdagi massasi nol; isitilgan jism massasi ortadi; massa c ga yaqinlashganda cheksiz oshadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Fotonning tinchlikdagi massasi nolga teng.', value: true },
            { text: 'Isitilgan jismning massasi (juda oz) ortadi.', value: true },
            { text: 'Jismni yorugʻlik tezligidan tezroq harakatlantirish mumkin.', value: false },
            { text: 'Tinch turgan jism energiyaga ega emas.', value: false }
          ]
        }
      }
    }
  ]
};
