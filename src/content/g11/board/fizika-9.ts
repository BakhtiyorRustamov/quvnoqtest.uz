import type { BoardLesson } from './types';
import { BOB2 } from './fizika-8';
import { battery, coil, rect, seg } from './phys';

/** Darslik: Fizika 11, 8-mavzu (29–32-betlar) — oʻzinduksiya hodisasi, oʻzinduksiya EYuK, induktivlik. */
export const FIZ_9: BoardLesson = {
  n: 9,
  label: '8',
  group: BOB2,
  title: 'Oʻzinduksiya va induktivlik',
  section: '8-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ishlab turgan changyutgich vilkasini rozetkadan sugʻurganda, baʼzan kichik uchqun chaqnaydi. Tok bir zumda yoʻqolmoqchi boʻladi, lekin dvigatel gʻaltagi bunga qarshilik qiladi va oʻzida kuchlanish hosil qiladi. Bu hodisa oʻzinduksiya deyiladi.",
      easy: "Vilkani sugʻurganda uchqun — gʻaltak tok yoʻqolishiga qarshilik qiladi.",
      draw: [
        { t: 'title', text: 'Rozetkadagi uchqun' },
        { t: 'icon', x: 16, y: 34, emoji: '🔌', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '✨', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['tok birdan uziladi', 'gʻaltak qarshilik qiladi', 'uchqun chaqnaydi'] }
      ],
      next: 'Ikki lampa tajribasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikki bir xil lampani parallel ulaymiz: biri temir oʻzakli gʻaltak L orqali, ikkinchisi R qarshilik orqali. Kalit ulanganda R li lampa darhol yonadi, gʻaltakli lampa esa biroz kechikadi. Kalit uzilganda gʻaltakli lampa sekin xiralashib oʻchadi. Sababi: tok oʻzgarganda gʻaltakda unga qarshi oʻzinduksiya EYuK hosil boʻladi.",
      easy: "Gʻaltakli lampa kech yonadi va sekin oʻchadi — oʻzinduksiya.",
      draw: [
        { t: 'title', text: 'Ikki lampa' },
        ...seg('l1', 10, 30, 10, 62),
        ...seg('l2', 76, 30, 76, 62),
        ...seg('b1', 10, 62, 40, 62),
        ...battery('e', 40, 62),
        ...seg('b2', 42, 62, 76, 62),
        ...seg('t1', 10, 30, 22, 30),
        { t: 'icon', x: 26, y: 30, emoji: '💡', size: 's' },
        ...seg('t2', 30, 30, 45, 30),
        ...coil(46, 30, 4, 3, 3.5),
        ...seg('t3', 55, 30, 76, 30),
        { t: 'text', x: 49, y: 25, text: 'L', color: 'orange' },
        ...seg('m1', 10, 46, 22, 46),
        { t: 'icon', x: 26, y: 46, emoji: '💡', size: 's' },
        ...seg('m2', 30, 46, 44, 46),
        ...rect('r', 44, 43.5, 12, 5, 'blue'),
        ...seg('m3', 56, 46, 76, 46),
        { t: 'text', x: 48, y: 41, text: 'R', color: 'blue' },
        { t: 'text', x: 80, y: 31, text: 'kech', color: 'orange', size: 's' },
        { t: 'text', x: 80, y: 47, text: 'darhol', color: 'blue', size: 's' }
      ],
      next: 'Induktivlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gʻaltakdagi magnit oqimi tokka proporsional: F teng L karra I. L — induktivlik, u gʻaltak oʻlchamlari, oʻramlar soni va oʻzakka bogʻliq. Oʻzinduksiya EYuK: E teng minus L karra delta I boʻlinsin delta t. Tok 1 sekundda 1 amperga oʻzgarganda 1 volt EYuK hosil boʻlsa, induktivlik 1 henri.",
      easy: "Ф = L·I; E = −L·ΔI/Δt; 1 H = 1 V·s/A.",
      draw: [
        { t: 'title', text: 'Induktivlik L' },
        { t: 'formula', x: 6, y: 22, text: 'Ф = L · I' },
        { t: 'formula', x: 6, y: 38, text: 'E = − L · ΔI / Δt' },
        { t: 'list', x: 6, y: 52, items: ['1 H = 1 V · s / A (henri)', 'J. Henri sharafiga'] }
      ],
      next: 'Solenoid'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Uzun gʻaltak — solenoid. Uning induktivligi L teng mu nol mu N kvadrat S boʻlinsin l. Oʻramlar soni ikki marta oshsa, induktivlik toʻrt marta oshadi. Oʻzinduksiyani inersiyaga oʻxshatish mumkin: massa jism tezligi oʻzgarishiga qanday qarshilik qilsa, induktivlik tok oʻzgarishiga shunday qarshilik qiladi.",
      easy: "Solenoid: L = μ₀μN²S/l. Induktivlik — tokning «massasi».",
      draw: [
        { t: 'title', text: 'Solenoid va inersiya' },
        { t: 'formula', x: 6, y: 22, text: 'L = μ₀ · μ · N² · S / l' },
        { t: 'list', x: 6, y: 38, items: ['N ×2 → L ×4', 'temir oʻzak → L keskin oshadi', 'L — tokning «massasi»'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Gʻaltakdagi tok 0,2 sekundda noldan 3 amperga tekis oshganda 1,5 volt oʻzinduksiya EYuK hosil boʻldi. Induktivlik: L teng E karra delta t boʻlinsin delta I, yaʼni 1,5 karra 0,2 boʻlinsin 3 — 0,1 henri.",
      easy: "L = 1,5 · 0,2 / 3 = 0,1 H.",
      draw: [
        { t: 'title', text: 'Induktivlikni topamiz' },
        { t: 'list', x: 6, y: 20, items: ['ΔI = 3 A, Δt = 0,2 s', 'E = 1,5 V'] },
        { t: 'formula', x: 6, y: 46, text: 'L = E · Δt / ΔI = 0,1 H' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Konturdagi tok oʻzgarganda unda oʻzinduksiya EYuK hosil boʻladi: E = −L·ΔI/Δt.',
    'Oqim tokka proporsional: Ф = L·I; induktivlik birligi — henri (1 H = 1 V·s/A).',
    'Solenoid: L = μ₀μN²S/l. Induktivlik tok oʻzgarishiga massa kabi qarshilik qiladi.'
  ],
  questions: [
    {
      id: 'f9q1',
      prompt: 'Induktivligi 80 mH gʻaltakdan 0,6 A tok oʻtmoqda. Magnit oqimi necha mWb?',
      hint: 'Ф = L · I.',
      explanation: '0,08 · 0,6 = 0,048 Wb = 48 mWb.',
      widget: { type: 'number_answer', props: { answer: 48, unit: 'mWb' } }
    },
    {
      id: 'f9q2',
      prompt: 'Induktivligi 2 H gʻaltakda 36 V oʻzinduksiya EYuK hosil boʻlishi uchun tok qanday tezlikda oʻzgarishi kerak (A/s)?',
      hint: 'ΔI/Δt = E / L.',
      explanation: '36 / 2 = 18 A/s.',
      widget: { type: 'number_answer', props: { answer: 18, unit: 'A/s' } }
    },
    {
      id: 'f9q3',
      prompt: 'Gʻaltakdagi tok 0,4 s da 5 A ga oʻzgarganda 15 V oʻzinduksiya EYuK hosil boʻldi. Induktivlik necha H?',
      hint: 'L = E · Δt / ΔI.',
      explanation: '15 · 0,4 / 5 = 1,2 H.',
      widget: { type: 'number_answer', props: { answer: 1.2, tolerance: 0.01, unit: 'H' } }
    },
    {
      id: 'f9q4',
      prompt: '0,8 A tok oʻtganda gʻaltakdagi oqim 240 mWb. Induktivlik necha H?',
      hint: 'L = Ф / I.',
      explanation: '0,24 / 0,8 = 0,3 H.',
      widget: { type: 'number_answer', props: { answer: 0.3, tolerance: 0.01, unit: 'H' } }
    },
    {
      id: 'f9q5',
      prompt: 'Solenoidda 500 oʻram, kesim yuzi 10 cm², uzunligi 20 cm, oʻzaksiz (μ = 1). Induktivlik necha mH? (0,01 gacha)',
      hint: 'L = μ₀ N² S / l.',
      explanation: '4π·10⁻⁷ · 250000 · 0,001 / 0,2 ≈ 1,57·10⁻³ H.',
      widget: { type: 'number_answer', props: { answer: 1.57, tolerance: 0.01, unit: 'mH' } }
    },
    {
      id: 'f9q6',
      prompt: 'Kalit ulanganda gʻaltak orqali ulangan lampa nega kechikib yonadi?',
      hint: 'Tok oʻsayotganda gʻaltakda nima paydo boʻladi?',
      explanation: 'Tok oʻsayotganda gʻaltakda unga qarshi yoʻnalgan oʻzinduksiya EYuK hosil boʻladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Lampa buzuq', 'Gʻaltakda tokka qarshi oʻzinduksiya EYuK paydo boʻladi', 'Gʻaltak tokni toʻsib qoʻyadi', 'Batareya sekin zaryadlanadi'], answerIndex: 1 } }
    },
    {
      id: 'f9q7',
      prompt: 'Mexanika va elektr oʻxshashliklarini moslang.',
      hint: 'Induktivlik — massaga oʻxshaydi.',
      explanation: 'Massa ↔ induktivlik, tezlik ↔ tok kuchi, inersiya ↔ oʻzinduksiya.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'massa m', right: 'induktivlik L' },
            { left: 'tezlik v', right: 'tok kuchi I' },
            { left: 'inersiya', right: 'oʻzinduksiya' }
          ]
        }
      }
    },
    {
      id: 'f9q8',
      prompt: 'Solenoid induktivligini oshiradigan oʻzgarishlarni belgilang.',
      hint: 'L = μ₀μN²S/l.',
      explanation: 'Oʻramlar, yuza, oʻzak oshiradi; uzunlikni oshirish kamaytiradi; tok kuchi L ga taʼsir qilmaydi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'oʻramlar sonini oshirish', correct: true },
            { label: 'temir oʻzak kiritish', correct: true },
            { label: 'kesim yuzini oshirish', correct: true },
            { label: 'gʻaltakni choʻzish (l ni oshirish)' },
            { label: 'tok kuchini oshirish' }
          ]
        }
      }
    },
    {
      id: 'f9q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'E ~ ΔI/Δt.',
      explanation: 'EYuK tok oʻzgarish tezligiga proporsional; oʻzgarmas tokda oʻzinduksiya yoʻq; induktivlik birligi henri.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻzinduksiya EYuK tokning oʻzgarish tezligiga toʻgʻri proporsional.', value: true },
            { text: 'Oʻzgarmas tok oqib turganda ham oʻzinduksiya EYuK hosil boʻladi.', value: false },
            { text: 'Induktivlik birligi — henri.', value: true },
            { text: 'Oʻramlar soni 2 marta oshsa, solenoid induktivligi 2 marta oshadi.', value: false }
          ]
        }
      }
    }
  ]
};
