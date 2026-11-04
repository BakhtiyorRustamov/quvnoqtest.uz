import type { BoardLesson } from './types';
import { BOB5 } from './kimyo-22';
import { wave } from './phys';

// energy profile: start 3, end 1.5, hump of height h at x = 5
const profile = (h: number) => (x: number) => 3 + (1.5 - 3) / (1 + Math.exp(-(x - 5) * 1.6)) + h * Math.exp(-((x - 5) ** 2) / 2);

/** Darslik: Umumiy kimyo 11, 23-mavzu (104–109-betlar) — bosim va hajm taʼsiri, Vant-Goff qoidasi, katalizator, faollanish energiyasi, fermentlar, ingibitorlar. */
export const KIM_23: BoardLesson = {
  n: 23,
  label: '23',
  group: BOB5,
  title: 'Tezlikka bosim, harorat va katalizator taʼsiri',
  section: '23-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Muzlatkichda ovqat sekin buziladi, xamirturush xamirni oshiradi, zamonaviy avtomobilning chiqindi trubkasida platina katalizatori zararli gazlarni yoqib yuboradi. Bularning barchasi — reaksiya tezligini boshqarish: haroratni pasaytirish, ferment yoki katalizator qoʻshish.",
      easy: "Harorat va katalizator reaksiya tezligini boshqaradi.",
      draw: [
        { t: 'title', text: 'Tezlikni boshqarish' },
        { t: 'icon', x: 16, y: 34, emoji: '🧊', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🍞', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['muzlatkich — sekinlashadi', 'xamirturush — ferment', 'avtomobil katalizatori — Pt'] }
      ],
      next: 'Bosim va hajm'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yopiq sistemada hajm necha marta kamaysa, bosim va barcha gazlar konsentratsiyasi shuncha marta ortadi. 2CO qoʻshuv O2 reaksiyasida hajm 3 marta kamaysa: v teng k karra CO kvadrat karra O2 boʻlgani uchun tezlik 3 ning kvadrati karra 3 — 27 marta ortadi. Umumiy qoida: bosim n marta ortsa, tezlik n ning darajasi gaz koeffitsiyentlari yigʻindisiga teng marta ortadi.",
      easy: "Bosim n marta ↑ → tezlik nᵃ⁺ᵇ marta ↑. 2CO + O₂: 3³ = 27.",
      draw: [
        { t: 'title', text: 'Bosim va hajm taʼsiri' },
        { t: 'formula', x: 4, y: 24, text: '2CO + O₂ → 2CO₂:  v = k[CO]²[O₂]' },
        { t: 'formula', x: 4, y: 38, text: 'V : 3 → [ ] · 3 → v · 3² · 3 = 27 marta' },
        { t: 'formula', x: 4, y: 52, text: 'v₂ / v₁ = nᵃ⁺ᵇ' }
      ],
      next: 'Harorat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Vant-Goff qoidasi: harorat har 10 gradusga oshganda reaksiya tezligi 2–4 marta ortadi. Bu son — harorat koeffitsiyenti gamma. Formula: v2 teng v1 karra gamma ning t2 minus t1, boʻlinsin 10 darajasi. Harorat pasaysa, tezlik xuddi shuncha marta kamayadi.",
      easy: "v₂ = v₁ · γ^((t₂ − t₁)/10), γ = 2–4.",
      draw: [
        { t: 'title', text: 'Vant-Goff qoidasi' },
        { t: 'formula', x: 4, y: 24, text: 'v₂ = v₁ · γ ^ ((t₂ − t₁) / 10)' },
        { t: 'list', x: 4, y: 36, items: ['γ — harorat koeffitsiyenti (2–4)', 'har 10 °C da γ marta'] },
        { t: 'formula', x: 4, y: 58, text: 'γ = 4, +20 °C:  4² = 16 marta' }
      ],
      next: 'Katalizator'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Reaksiya uchun molekulalar faol holatga oʻtishi kerak. Bunga kerakli energiya — faollanish energiyasi: grafikdagi «tepalik». Katalizator bu tepalikni pasaytiradi, reaksiya tezlashadi, oʻzi esa sarflanmaydi. Vodorod peroksidga marganes dioksid kukuni qoʻshilsa, kislorod shiddat bilan ajraladi. Tezlikni sekinlatuvchi moddalar — ingibitorlar.",
      easy: "Katalizator faollanish energiyasini pasaytiradi, sarflanmaydi. Ingibitor — sekinlatadi.",
      draw: [
        { t: 'title', text: 'Faollanish energiyasi' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 46, h: 38, xmin: 0, xmax: 10, ymin: 0, ymax: 7, xlabel: 'reaksiya yoʻli', ylabel: 'E' },
        { t: 'curve', axes: 'g', points: wave(profile(3.2), 0, 10, 60), color: 'red' },
        { t: 'curve', axes: 'g', points: wave(profile(1.4), 0, 10, 60), color: 'green', dashed: true },
        { t: 'text', x: 8, y: 64, text: 'qizil — katalizatorsiz, yashil — katalizator bilan', size: 's' },
        { t: 'formula', x: 58, y: 30, text: '2H₂O₂ → 2H₂O + O₂' },
        { t: 'text', x: 58, y: 40, text: 'MnO₂ — katalizator', size: 's', color: 'green' }
      ],
      next: 'Fermentlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oqsil tabiatli biologik katalizatorlar — fermentlar. Xamirturush fermenti shakarni karbonat angidrid va spirtga parchalaydi, pufakchalar xamirni oshiradi. Goʻsht, sabzi yoki kartoshkadagi katalaza fermenti vodorod peroksidni parchalaydi, lekin qaynatilgan boʻlakda reaksiya bormaydi — ferment issiqlikda buziladi. Xulosa: tezlik modda tabiati, konsentratsiya, bosim, harorat, katalizator va sirt yuzasiga bogʻliq.",
      easy: "Fermentlar — biologik katalizatorlar, qizdirishga chidamsiz.",
      draw: [
        { t: 'title', text: 'Fermentlar' },
        { t: 'icon', x: 12, y: 30, emoji: '🍞', size: 'm' },
        { t: 'icon', x: 12, y: 46, emoji: '🥕', size: 'm' },
        { t: 'list', x: 22, y: 26, items: ['xamirturush — xamir oshadi', 'katalaza — H₂O₂ ni parchalaydi', 'qaynatilsa — ferment buziladi'] },
        { t: 'text', x: 4, y: 62, text: 'tezlikka: tabiat, C, P, t, katalizator, sirt', size: 's', color: 'purple' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "60 gradusda reaksiya tezligi 1,5 mol/L·min, harorat koeffitsiyenti 2. 90 gradusdagi tezlik qancha? Farq 30 gradus, daraja 30 boʻlinsin 10 — 3. Tezlik 2 ning kubi — 8 marta ortadi: 1,5 karra 8 — 12 mol/L·min.",
      easy: "(90 − 60)/10 = 3; v = 1,5 · 2³ = 12 mol/(L·min).",
      draw: [
        { t: 'title', text: 'Isitganda tezlik' },
        { t: 'formula', x: 4, y: 24, text: '(90 − 60) / 10 = 3' },
        { t: 'formula', x: 4, y: 38, text: 'v₂ = 1,5 · 2³ = 12 mol/(L·min)' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Hajm n marta kamaysa (bosim n marta ortsa), tezlik n ning gaz koeffitsiyentlari yigʻindisi darajasicha ortadi.',
    'Vant-Goff qoidasi: v₂ = v₁·γ^((t₂ − t₁)/10), γ = 2–4.',
    'Katalizator faollanish energiyasini pasaytirib reaksiyani tezlatadi va sarflanmaydi; fermentlar — biologik katalizatorlar, ingibitorlar — sekinlatadi.'
  ],
  questions: [
    {
      id: 'k23q1',
      prompt: '40 °C da tezlik 2,5 mol/(L·min), γ = 3. 60 °C dagi tezlik qancha?',
      hint: '3².',
      explanation: '2,5 · 9 = 22,5 mol/(L·min).',
      widget: { type: 'number_answer', props: { answer: 22.5, tolerance: 0.01, unit: 'mol/(L·min)' } }
    },
    {
      id: 'k23q2',
      prompt: '40 °C da tezlik 5 mol/(L·min), γ = 5. 20 °C dagi tezlik qancha?',
      hint: 'Harorat 20 °C ga pasaydi: 5² marta kamayadi.',
      explanation: '5 / 25 = 0,2 mol/(L·min).',
      widget: { type: 'number_answer', props: { answer: 0.2, tolerance: 0.001, unit: 'mol/(L·min)' } }
    },
    {
      id: 'k23q3',
      prompt: '4HCl + O₂ → 2Cl₂ + 2H₂O sistemada bosim 2 marta oshirilsa, toʻgʻri reaksiya tezligi necha marta ortadi?',
      hint: '2⁴ · 2¹.',
      explanation: '2⁵ = 32 marta.',
      widget: { type: 'number_answer', props: { answer: 32 } }
    },
    {
      id: 'k23q4',
      prompt: 'CH₄ + 2O₂ → CO₂ + 2H₂O sistemada bosim 4 marta oshirilsa, tezlik necha marta ortadi?',
      hint: '4¹ · 4².',
      explanation: '4³ = 64 marta.',
      widget: { type: 'number_answer', props: { answer: 64 } }
    },
    {
      id: 'k23q5',
      prompt: 'Katalizator reaksiyani qanday tezlatadi?',
      hint: 'Grafikdagi tepalik.',
      explanation: 'Faollanish energiyasini pasaytiradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['haroratni oshiradi', 'faollanish energiyasini pasaytiradi', 'konsentratsiyani oshiradi', 'reaksiyada sarflanib, energiya beradi'], answerIndex: 1 } }
    },
    {
      id: 'k23q6',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Ingibitor — teskari taʼsir.',
      explanation: 'Katalizator — tezlatadi, sarflanmaydi; ingibitor — sekinlatadi; ferment — oqsil tabiatli katalizator; faollanish energiyasi — faol holatga oʻtish uchun energiya.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'katalizator' }, b: { label: 'tezlatadi, sarflanmaydi' } },
            { a: { label: 'ingibitor' }, b: { label: 'sekinlatadi' } },
            { a: { label: 'ferment' }, b: { label: 'biologik katalizator' } },
            { a: { label: 'faollanish energiyasi' }, b: { label: 'faol holatga oʻtish energiyasi' } }
          ]
        }
      }
    },
    {
      id: 'k23q7',
      prompt: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O, k = 2, konsentratsiyalar 1 mol/L. Bosim 3 marta oshirilsa, tezlik nechaga teng boʻladi?',
      hint: 'v = 2 · 3 · 3⁵.',
      explanation: '2 · 3⁶ = 1458.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['18', '486', '1458', '729'], answerIndex: 2 } }
    },
    {
      id: 'k23q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ferment qizdirishga chidamsiz.',
      explanation: 'Katalizator sarflanmaydi; qaynatilgan kartoshkada katalaza ishlamaydi; harorat pasaysa tezlik kamayadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Katalizator reaksiya oxirida oʻzgarmay qoladi.', value: true },
            { text: 'Qaynatilgan kartoshka H₂O₂ ni parchalamaydi.', value: true },
            { text: 'Harorat 10 °C ga pasaysa, tezlik 2–4 marta ortadi.', value: false },
            { text: 'Qattiq moddalar konsentratsiyasi bosim oʻzgarganda ortadi.', value: false }
          ]
        }
      }
    }
  ]
};
