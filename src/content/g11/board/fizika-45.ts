import type { BoardLesson } from './types';
import { BOB7 } from './fizika-39';

/** Darslik: Fizika 11, 43-mavzu (173–177-betlar) — elementar zarralar, antizarralar, annigilatsiya, fundamental taʼsirlashuvlar, kvarklar. */
export const FIZ_45: BoardLesson = {
  n: 45,
  label: '43',
  group: BOB7,
  title: 'Elementar zarralar',
  section: '43-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Shveytsariya va Fransiya chegarasida yer ostida 27 kilometrli halqa bor — Katta adron kollayderi. Unda protonlar deyarli yorugʻlik tezligida toʻqnashtiriladi. 2012-yil 4-iyulda aynan shu yerda Xiggs bozoni kashf qilingani eʼlon qilindi. Moddaning eng kichik «gʻishtchalari» nimalar?",
      easy: "Kollayderda zarralar toʻqnashtirilib, eng kichik gʻishtchalar izlanadi.",
      draw: [
        { t: 'title', text: 'Moddaning gʻishtchalari' },
        { t: 'icon', x: 16, y: 34, emoji: '🌀', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🔬', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['Katta adron kollayderi — 27 km', 'Xiggs bozoni — 2012', '300 dan ortiq zarra'] }
      ],
      next: 'Birinchi zarralar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Birinchi kashf qilingan elementar zarra — elektron: 1897-yilda Tomson katod nurlari elektronlar oqimi ekanini aniqladi. Foton zaryadsiz, tinchlikdagi massasi nol. Protonni 1919-yilda Rezerford topdi, neytronni 1932-yilda Chedvik. 1950-yillardan boshlab K-mezonlar, giperonlar, rezonanslar kashf qilindi. Hozir 300 dan ortiq zarra maʼlum, koʻpchiligi beqaror.",
      easy: "Elektron 1897, proton 1919, neytron 1932; hozir 300 dan ortiq zarra.",
      draw: [
        { t: 'title', text: 'Zarralar kashf qilinishi' },
        { t: 'table', x: 6, y: 22, rows: [['zarra', 'yil', 'kim'], ['elektron', '1897', 'Tomson'], ['proton', '1919', 'Rezerford'], ['neytron', '1932', 'Chedvik'], ['antiproton', '1955', '—']] },
        { t: 'text', x: 64, y: 40, text: 'K-mezonlar,', size: 's', color: 'purple' },
        { t: 'text', x: 64, y: 46, text: 'giperonlar,', size: 's', color: 'purple' },
        { t: 'text', x: 64, y: 52, text: 'rezonanslar…', size: 's', color: 'purple' }
      ],
      next: 'Antizarralar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Har bir zarraning antizarrasi bor: massasi va spini teng, zaryadi qarama-qarshi. Birinchi antizarra — pozitron, elektronning antizarrasi. Antiproton 1955-yilda, antineytron 1956-yilda olindi. Zarra va antizarra uchrashsa, ular fotonlarga aylanadi — annigilatsiya: elektron qoʻshuv pozitron, ikkita gamma-kvantga aylanadi. Teskari jarayon ham bor: energiyasi 1,02 megaelektronvoltdan katta gamma-kvant yadro yonida elektron-pozitron juftiga aylanadi.",
      easy: "Annigilatsiya: e⁻ + e⁺ → 2γ. Juft hosil boʻlishi: γ → e⁻ + e⁺ (Eγ > 1,02 MeV).",
      draw: [
        { t: 'title', text: 'Antizarralar va annigilatsiya' },
        { t: 'formula', x: 6, y: 24, text: 'e⁻ + e⁺ → 2 γ' },
        { t: 'formula', x: 6, y: 38, text: 'γ → e⁻ + e⁺,  Eγ > 2 m₀c² = 1,02 MeV' },
        { t: 'list', x: 6, y: 50, items: ['antizarra: massa teng, zaryad teskari', 'modda ⇄ maydon'] }
      ],
      next: 'Toʻrt taʼsirlashuv'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tabiatda toʻrt xil fundamental taʼsirlashuv bor: kuchli, elektromagnit, kuchsiz va gravitatsion. Adronlar — barionlar va mezonlar — hammasida qatnashadi. Leptonlar — elektron, myuon, neytrino — kuchli taʼsirlashuvda qatnashmaydi. Fotonlar elektromagnit va gravitatsion taʼsirlashuvda qatnashadi. Gravitonlar esa hali tasdiqlanmagan.",
      easy: "Kuchli, elektromagnit, kuchsiz, gravitatsion. Adronlar va leptonlar.",
      draw: [
        { t: 'title', text: 'Fundamental taʼsirlashuvlar' },
        { t: 'list', x: 6, y: 22, items: ['kuchli', 'elektromagnit', 'kuchsiz', 'gravitatsion'] },
        { t: 'table', x: 44, y: 22, rows: [['guruh', 'misollar'], ['adronlar', 'p, n, π-mezon'], ['leptonlar', 'e⁻, μ, ν'], ['foton', 'γ']] }
      ],
      next: 'Kvarklar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1964-yilda Gell-Man va Sveyg adronlar kvarklardan tashkil topgan degan gʻoyani aytishdi, keyin tajribalar buni tasdiqladi. Kvarklar oltita: u, d, s, c, b, t. u, c, t kvarklar zaryadi plyus uchdan ikki e, qolganlariniki minus uchdan bir e. Proton — ikkita u va bitta d kvarkdan, neytron — bitta u va ikkita d kvarkdan iborat.",
      easy: "Proton = uud (+1), neytron = udd (0). u: +2/3, d: −1/3.",
      draw: [
        { t: 'title', text: 'Kvarklar (1964)' },
        { t: 'list', x: 6, y: 22, items: ['6 ta: u, d, s, c, b, t', 'u, c, t: +2/3 e', 'd, s, b: −1/3 e'] },
        { t: 'formula', x: 6, y: 48, text: 'p = u u d:  2/3 + 2/3 − 1/3 = +1' },
        { t: 'formula', x: 6, y: 60, text: 'n = u d d:  2/3 − 1/3 − 1/3 = 0' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Pi-nol-mezon ikkita gamma-kvantga parchalandi. Uning massasi 264,3 elektron massasiga teng. Gamma-nurlanish chastotasi qancha? Energiya saqlanadi: m c kvadrat teng 2 h nu. Elektronning tinchlikdagi energiyasi 0,511 megaelektronvolt. nu teng 264,3 karra 0,511 karra 10 ning 6 darajasi boʻlinsin 2 karra 4,136 karra 10 ning minus 15 darajasi — taxminan 1,63 karra 10 ning 22 darajasi gers.",
      easy: "mπc² = 2hν → ν ≈ 1,63·10²² Hz.",
      draw: [
        { t: 'title', text: 'π⁰ → 2γ' },
        { t: 'list', x: 6, y: 20, items: ['mπ = 264,3 mₑ,  mₑc² = 0,511 MeV', 'h = 4,136 · 10⁻¹⁵ eV·s'] },
        { t: 'formula', x: 6, y: 44, text: 'mπ c² = 2 h ν' },
        { t: 'formula', x: 6, y: 56, text: 'ν = mπc² / (2h) ≈ 1,63 · 10²² Hz' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Birinchi elementar zarra — elektron (1897); hozir 300 dan ortiq zarra maʼlum, koʻpchiligi beqaror.',
    'Har bir zarraning antizarrasi bor; annigilatsiya e⁻ + e⁺ → 2γ va juft hosil boʻlishi modda va maydon bir-biriga aylanishini koʻrsatadi.',
    'Toʻrt fundamental taʼsirlashuv; adronlar kvarklardan iborat: proton — uud, neytron — udd.'
  ],
  questions: [
    {
      id: 'f45q1',
      prompt: 'Tinch turgan elektron va pozitron annigilatsiyalanib, ikkita bir xil foton hosil qildi. Har bir foton energiyasi necha MeV? (mₑc² = 0,511 MeV)',
      hint: 'Ikkala zarraning tinchlikdagi energiyasi ikkita fotonga boʻlinadi.',
      explanation: '2 · 0,511 / 2 = 0,511 MeV.',
      widget: { type: 'number_answer', props: { answer: 0.511, tolerance: 0.002, unit: 'MeV' } }
    },
    {
      id: 'f45q2',
      prompt: 'Elektron-pozitron jufti hosil boʻlishi uchun γ-kvant energiyasi kamida necha MeV boʻlishi kerak?',
      hint: '2m₀c².',
      explanation: '2 · 0,511 = 1,02 MeV.',
      widget: { type: 'number_answer', props: { answer: 1.02, tolerance: 0.01, unit: 'MeV' } }
    },
    {
      id: 'f45q3',
      prompt: 'Proton qanday kvarklardan tashkil topgan?',
      hint: 'Zaryad +1.',
      explanation: 'u, u, d: 2/3 + 2/3 − 1/3 = +1.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['u, u, d', 'u, d, d', 'u, d, c', 'd, c, s'], answerIndex: 0 } }
    },
    {
      id: 'f45q4',
      prompt: 'Yuqori energiyali foton ogʻir yadro yonida bir juft zarraga aylandi. Biri elektron. Ikkinchisi nima?',
      hint: 'Zaryad saqlanadi.',
      explanation: 'Pozitron — elektronning antizarrasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['proton', 'neytron', 'pozitron', 'neytrino'], answerIndex: 2 } }
    },
    {
      id: 'f45q5',
      prompt: 'Zarralarni guruhlarga ajrating.',
      hint: 'Leptonlar kuchli taʼsirlashuvda qatnashmaydi.',
      explanation: 'Leptonlar: elektron, myuon, neytrino. Adronlar: proton, neytron, π-mezon.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'l', label: 'Leptonlar' },
            { id: 'h', label: 'Adronlar' }
          ],
          items: [
            { emoji: '', label: 'elektron', bin: 'l' },
            { emoji: '', label: 'myuon', bin: 'l' },
            { emoji: '', label: 'neytrino', bin: 'l' },
            { emoji: '', label: 'proton', bin: 'h' },
            { emoji: '', label: 'neytron', bin: 'h' },
            { emoji: '', label: 'π-mezon', bin: 'h' }
          ]
        }
      }
    },
    {
      id: 'f45q6',
      prompt: 'Zarralarni kashf qilinish tartibida joylang.',
      hint: '1897, 1919, 1932, 1955.',
      explanation: 'Elektron → proton → neytron → antiproton.',
      widget: { type: 'order_line', props: { items: [{ label: 'elektron' }, { label: 'proton' }, { label: 'neytron' }, { label: 'antiproton' }] } }
    },
    {
      id: 'f45q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Antizarra — zaryadi teskari.',
      explanation: 'Antizarraning massasi zarranikiga teng, zaryadi esa qarama-qarshi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Antizarraning massasi zarranikiga ' },
            { blank: 'teng' },
            { text: ', elektr zaryadi esa ' },
            { blank: 'qarama-qarshi' },
            { text: '.' }
          ],
          bank: ['teng', 'qarama-qarshi', 'ikki marta katta', 'nolga teng']
        }
      }
    },
    {
      id: 'f45q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Neytron udd.',
      explanation: 'Neytron udd dan iborat; elektron birinchi kashf qilingan; leptonlar kuchli taʼsirlashuvda qatnashmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Birinchi kashf qilingan elementar zarra — elektron.', value: true },
            { text: 'Neytron bitta u va ikkita d kvarkdan iborat.', value: true },
            { text: 'Annigilatsiyada energiyaning saqlanish qonuni buziladi.', value: false },
            { text: 'Leptonlar kuchli taʼsirlashuvda qatnashadi.', value: false }
          ]
        }
      }
    }
  ]
};
