import type { BoardLesson } from './types';
import { BOB3 } from './fizika-13';
import { coil, meter, rect, seg, vec } from './phys';

/** Darslik: Fizika 11, 17-mavzu (59–62-betlar) — R, L, C ketma-ket ulangan oʻzgaruvchan tok zanjiri uchun Om qonuni. */
export const FIZ_19: BoardLesson = {
  n: 19,
  label: '17',
  group: BOB3,
  title: 'RLC zanjiri uchun Om qonuni',
  section: '17-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Kir yuvish mashinasida isitgich ham, dvigatel gʻaltagi ham, kondensator ham bor. Ular birga ulanganda zanjirdagi tokni qanday hisoblaymiz? Qarshiliklarni oddiygina qoʻshib boʻlmaydi, chunki har birida kuchlanish tokka nisbatan turlicha siljigan. Bugun oʻzgaruvchan tok uchun Om qonunini chiqaramiz.",
      easy: "R, L va C birga boʻlsa, qarshiliklar oddiy qoʻshilmaydi.",
      draw: [
        { t: 'title', text: 'Uchalasi birga' },
        { t: 'icon', x: 16, y: 34, emoji: '🧺', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚡', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['isitgich — R', 'dvigatel gʻaltagi — L', 'kondensator — C'] }
      ],
      next: 'Zanjir'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Rezistor, gʻaltak va kondensatorni ketma-ket ulab, oʻzgaruvchan kuchlanish beramiz. Ketma-ket ulanganda tok hamma joyda bir xil: i teng I max kosinus omega t. Umumiy kuchlanish esa uchta kuchlanishning vektor yigʻindisi: U R, U L va U C.",
      easy: "Ketma-ket: tok bir xil, kuchlanishlar vektor kabi qoʻshiladi.",
      draw: [
        { t: 'title', text: 'Ketma-ket RLC zanjiri' },
        ...seg('a', 8, 34, 16, 34),
        ...rect('r', 16, 31, 12, 6, 'blue'),
        ...seg('b', 28, 34, 36, 34),
        ...coil(37, 34, 4, 3, 4),
        ...seg('c', 47, 34, 58, 34),
        ...seg('p1', 58, 29, 58, 39),
        ...seg('p2', 61, 29, 61, 39),
        ...seg('d', 61, 34, 88, 34),
        ...seg('e', 88, 34, 88, 58),
        ...seg('f', 88, 58, 54, 58),
        ...meter(50, 58, '~'),
        ...seg('g', 46, 58, 8, 58),
        ...seg('h', 8, 58, 8, 34),
        { t: 'text', x: 20, y: 28, text: 'R', color: 'blue' },
        { t: 'text', x: 40, y: 27, text: 'L', color: 'orange' },
        { t: 'text', x: 58, y: 26, text: 'C' },
        { t: 'text', x: 62, y: 66, text: 'u = Uₘ cos ωt', size: 's' }
      ],
      next: 'Vektor diagramma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tok vektorini gorizontal chizamiz. Rezistordagi kuchlanish tok bilan bir yoʻnalishda. Gʻaltakdagi U L tepaga, kondensatordagi U C pastga — ular qarama-qarshi, natijasi U L minus U C. Umumiy kuchlanish — toʻgʻri burchakli uchburchak gipotenuzasi: U kvadrat teng U R kvadrat qoʻshuv U L minus U C ning kvadrati. Tok va kuchlanish orasidagi burchak — fi.",
      easy: "U² = UR² + (UL − UC)²; φ — tok va kuchlanish orasidagi burchak.",
      draw: [
        { t: 'title', text: 'Vektor diagramma' },
        ...vec('ur', 10, 52, 40, 52, 'blue'),
        { t: 'text', x: 22, y: 58, text: 'UR', color: 'blue', size: 's' },
        ...vec('ulc', 40, 52, 40, 28, 'purple'),
        { t: 'text', x: 42, y: 40, text: 'UL − UC', color: 'purple', size: 's' },
        ...vec('u', 10, 52, 40, 28, 'red'),
        { t: 'text', x: 18, y: 38, text: 'U', color: 'red' },
        { t: 'text', x: 15, y: 50, text: 'φ', size: 's' },
        { t: 'list', x: 60, y: 26, items: ['UR = I · R', 'UL = I · XL', 'UC = I · XC'] }
      ],
      next: 'Toʻla qarshilik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kuchlanishlar oʻrniga I karra qarshiliklarni qoʻysak, Om qonuni chiqadi: I max teng U max boʻlinsin Z, bunda Z teng ildiz ostida R kvadrat qoʻshuv X L minus X C ning kvadrati — toʻla qarshilik. Faza farqi: tangens fi teng X L minus X C boʻlinsin R. Muhimi: energiya faqat aktiv qarshilikda issiqlikka aylanadi, reaktiv qarshiliklarda esa elektr va magnit energiya bir-biriga oʻtib turadi.",
      easy: "Iₘ = Uₘ/Z, Z = √(R² + (XL − XC)²), tg φ = (XL − XC)/R.",
      draw: [
        { t: 'title', text: 'Om qonuni' },
        { t: 'formula', x: 6, y: 22, text: 'Z = √(R² + (XL − XC)²)' },
        { t: 'formula', x: 6, y: 38, text: 'Iₘ = Uₘ / Z' },
        { t: 'formula', x: 6, y: 52, text: 'tg φ = (XL − XC) / R' },
        { t: 'text', x: 56, y: 40, text: 'issiqlik — faqat R da', color: 'green', size: 's' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Manba: U max 120 volt, 100 gers. Zanjirda R 200 om, C 5 mikrofarad, L 400 millihenri. X L teng 2 pi karra 100 karra 0,4 — 251 om. X C teng bir boʻlinsin 2 pi karra 100 karra 5 karra 10 ning minus 6 darajasi — 318 om. Z teng ildiz ostida 200 kvadrat qoʻshuv 67 kvadrat — taxminan 211 om. Tok: 120 boʻlinsin 211 — 0,57 amper.",
      easy: "XL ≈ 251 Ω, XC ≈ 318 Ω, Z ≈ 211 Ω, Iₘ ≈ 0,57 A.",
      draw: [
        { t: 'title', text: 'Tokni topamiz' },
        { t: 'list', x: 6, y: 20, items: ['XL = 2π · 100 · 0,4 ≈ 251 Ω', 'XC = 1/(2π · 100 · 5·10⁻⁶) ≈ 318 Ω', 'Z = √(200² + 67²) ≈ 211 Ω'] },
        { t: 'formula', x: 6, y: 54, text: 'Iₘ = 120 / 211 ≈ 0,57 A' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ketma-ket RLC zanjirida tok bir xil, kuchlanishlar vektor kabi qoʻshiladi: U² = UR² + (UL − UC)².',
    'Om qonuni: Iₘ = Uₘ/Z, toʻla qarshilik Z = √(R² + (XL − XC)²), tg φ = (XL − XC)/R.',
    'Energiya faqat aktiv qarshilikda ajraladi; reaktiv qarshiliklarda u bir turdan ikkinchisiga oʻtib turadi.'
  ],
  questions: [
    {
      id: 'f19q1',
      prompt: 'R = 30 Ω, XL = 80 Ω, XC = 40 Ω ketma-ket ulangan. Toʻla qarshilik necha Ω?',
      hint: 'Z = √(R² + (XL − XC)²).',
      explanation: '√(900 + 1600) = 50 Ω.',
      widget: { type: 'number_answer', props: { answer: 50, unit: 'Ω' } }
    },
    {
      id: 'f19q2',
      prompt: 'Oʻsha zanjirga amplitudasi 100 V kuchlanish berildi. Tok amplitudasi necha A?',
      hint: 'Iₘ = Uₘ / Z.',
      explanation: '100 / 50 = 2 A.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'A' } }
    },
    {
      id: 'f19q3',
      prompt: 'Oʻsha zanjirda tok va kuchlanish orasidagi faza farqi necha gradus? (butun songacha)',
      hint: 'tg φ = (XL − XC)/R.',
      explanation: 'tg φ = 40/30 ≈ 1,33; φ ≈ 53°.',
      widget: { type: 'number_answer', props: { answer: 53.1, tolerance: 1, unit: '°' } }
    },
    {
      id: 'f19q4',
      prompt: 'Effektiv kuchlanish 127 V zanjirga L = 0,16 H, R = 2 Ω va C = 64 μF ketma-ket ulangan, chastota 200 Hz. Effektiv tok necha A? (0,01 gacha)',
      hint: 'XL = 2πνL, XC = 1/(2πνC), I = U/Z.',
      explanation: 'XL ≈ 201 Ω, XC ≈ 12,4 Ω, Z ≈ 188,7 Ω; I ≈ 127/188,7 ≈ 0,67 A.',
      widget: { type: 'number_answer', props: { answer: 0.673, tolerance: 0.01, unit: 'A' } }
    },
    {
      id: 'f19q5',
      prompt: 'RLC zanjirida elektr energiya qaysi elementda issiqlikka aylanadi?',
      hint: 'Aktiv qarshilik.',
      explanation: 'Faqat rezistorda (aktiv qarshilikda).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Faqat gʻaltakda', 'Faqat kondensatorda', 'Faqat rezistorda', 'Uchalasida teng'], answerIndex: 2 } }
    },
    {
      id: 'f19q6',
      prompt: 'Vektor diagrammada UL va UC vektorlari qanday yoʻnalgan?',
      hint: 'Biri tokdan oldinda, biri orqada.',
      explanation: 'Ular qarama-qarshi yoʻnalgan: UL tepaga, UC pastga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Bir yoʻnalishda', 'Qarama-qarshi', 'Oʻzaro tik', 'Tok bilan bir yoʻnalishda'], answerIndex: 1 } }
    },
    {
      id: 'f19q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Ketma-ket ulanishda nima bir xil?',
      explanation: 'Ketma-ket zanjirda tok bir xil; umumiy kuchlanish vektor yigʻindi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Ketma-ket ulangan R, L, C dan bir xil ' },
            { blank: 'tok' },
            { text: ' oʻtadi, umumiy kuchlanish esa kuchlanishlarning ' },
            { blank: 'vektor' },
            { text: ' yigʻindisiga teng.' }
          ],
          bank: ['tok', 'vektor', 'kuchlanish', 'arifmetik']
        }
      }
    },
    {
      id: 'f19q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Z ≥ R.',
      explanation: 'Z hech qachon R dan kichik emas; XL = XC da φ = 0; reaktiv qarshilikda energiya ajralmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Toʻla qarshilik aktiv qarshilikdan kichik boʻlishi mumkin.', value: false },
            { text: 'XL = XC boʻlsa, tok va kuchlanish bir fazada boʻladi.', value: true },
            { text: 'Reaktiv qarshiliklarda energiya issiqlikka aylanmaydi.', value: true },
            { text: 'Toʻla qarshilik R + XL + XC ga teng.', value: false }
          ]
        }
      }
    }
  ]
};
