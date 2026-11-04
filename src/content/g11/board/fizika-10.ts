import type { BoardLesson } from './types';
import { BOB2 } from './fizika-8';

/** Darslik: Fizika 11, 9-mavzu (32–34-betlar) — moddalarning magnit xossalari. */
export const FIZ_10: BoardLesson = {
  n: 10,
  label: '9',
  group: BOB2,
  title: 'Moddalarning magnit xossalari',
  section: '9-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Magnitcha poʻlat muzlatkich eshigiga yopishadi, lekin alyuminiy qozonga ham, mis tangaga ham yopishmaydi. Nega? Moddalar magnit maydonga turlicha javob beradi: biri maydonni juda kuchaytiradi, boshqasi deyarli sezmaydi, uchinchisi hatto susaytiradi.",
      easy: "Moddalar magnit maydonga turlicha javob beradi.",
      draw: [
        { t: 'title', text: 'Nega hamma narsaga yopishmaydi?' },
        { t: 'icon', x: 16, y: 34, emoji: '🧲', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🍳', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['poʻlat — yopishadi', 'alyuminiy — yopishmaydi', 'mis — yopishmaydi'] }
      ],
      next: 'Magnit singdiruvchanlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Magnit maydonda magnitlanadigan moddalar magnetiklar deyiladi. Gʻaltak ichiga turli oʻzaklar kiritsak, maydon turlicha oʻzgaradi: B teng mu karra B nol. Bu yerda B nol — vakuumdagi induksiya, mu — muhitning magnit singdiruvchanligi. U muhitdagi maydon vakuumdagidan necha marta katta ekanini bildiradi.",
      easy: "B = μ·B₀; μ = B/B₀ — magnit singdiruvchanlik.",
      draw: [
        { t: 'title', text: 'Magnit singdiruvchanlik μ' },
        { t: 'formula', x: 6, y: 22, text: 'B = μ · B₀' },
        { t: 'formula', x: 6, y: 38, text: 'μ = B / B₀' },
        { t: 'list', x: 6, y: 52, items: ['B₀ — vakuumdagi induksiya', 'μ — faqat moddaga bogʻliq'] }
      ],
      next: 'Uch turdagi moddalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Moddalar uch turga boʻlinadi. Diamagnetiklarda mu birdan kichik — oltin, kumush, mis, rux; ular maydonni susaytiradi va magnitdan qochadi. Paramagnetiklarda mu birdan biroz katta — alyuminiy, platina, xrom, kislorod; maydonni ozgina kuchaytiradi. Ferromagnetiklarda mu birdan juda katta — temir, nikel, kobalt; maydonni kuchli oshiradi va magnitga tortiladi.",
      easy: "Dia: μ < 1. Para: μ > 1 (ozgina). Ferro: μ ≫ 1.",
      draw: [
        { t: 'title', text: 'Dia, para, ferro' },
        { t: 'text', x: 6, y: 26, text: 'diamagnetik: μ < 1', color: 'blue' },
        { t: 'text', x: 52, y: 26, text: 'mis, oltin, kumush', size: 's' },
        { t: 'text', x: 6, y: 42, text: 'paramagnetik: μ > 1', color: 'green' },
        { t: 'text', x: 52, y: 42, text: 'alyuminiy, platina', size: 's' },
        { t: 'text', x: 6, y: 58, text: 'ferromagnetik: μ ≫ 1', color: 'red' },
        { t: 'text', x: 52, y: 58, text: 'temir, nikel, kobalt', size: 's' }
      ],
      next: 'Qoʻllanilishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ferromagnetiklar tabiatda kam boʻlsa-da, texnikada juda muhim. Transformator, generator va elektrodvigatellarning oʻzaklari ferromagnit materialdan yasaladi — ular maydonni yuzlab marta kuchaytiradi. Elektromagnit kranlar ham temir oʻzak tufayli tonnalab yukni koʻtaradi.",
      easy: "Transformator, dvigatel, generator oʻzaklari — ferromagnetik.",
      draw: [
        { t: 'title', text: 'Ferromagnetiklar texnikada' },
        { t: 'icon', x: 16, y: 34, emoji: '⚙️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🏗️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['transformator oʻzagi', 'dvigatel va generator', 'elektromagnit kran'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Oʻzaksiz gʻaltakda induksiya 0,5 tesla. Ichiga mu teng 60 boʻlgan ferromagnit kiritildi. Yangi induksiya: 60 karra 0,5, yaʼni 30 tesla. Oʻzgarish: 30 minus 0,5, yaʼni 29,5 tesla.",
      easy: "B = 60 · 0,5 = 30 T; ΔB = 29,5 T.",
      draw: [
        { t: 'title', text: 'Oʻzak kiritilsa' },
        { t: 'list', x: 6, y: 20, items: ['B₀ = 0,5 T, μ = 60', 'B = 60 · 0,5 = 30 T'] },
        { t: 'formula', x: 6, y: 46, text: 'ΔB = 30 − 0,5 = 29,5 T' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Magnetiklar maydonda magnitlanadi: B = μ·B₀, μ — muhitning magnit singdiruvchanligi.',
    'Diamagnetik μ < 1 (mis, oltin), paramagnetik μ > 1 (alyuminiy, platina), ferromagnetik μ ≫ 1 (temir, nikel, kobalt).',
    'Ferromagnit oʻzaklar transformator, dvigatel va generatorlarda maydonni kuchaytiradi.'
  ],
  questions: [
    {
      id: 'f10q1',
      prompt: 'Oʻzaksiz gʻaltakda induksiya 25 mT. μ = 60 boʻlgan oʻzak kiritilsa, induksiya necha T boʻladi?',
      hint: 'B = μ · B₀.',
      explanation: '60 · 0,025 = 1,5 T.',
      widget: { type: 'number_answer', props: { answer: 1.5, tolerance: 0.01, unit: 'T' } }
    },
    {
      id: 'f10q2',
      prompt: 'Gʻaltakdagi induksiya 20 mT edi. Oʻzak kiritilgach, induksiya 180 mT ga oshdi (200 mT boʻldi). μ nimaga teng?',
      hint: 'μ = B / B₀.',
      explanation: '200 / 20 = 10.',
      widget: { type: 'number_answer', props: { answer: 10 } }
    },
    {
      id: 'f10q3',
      prompt: 'Radiusi 2 cm, 150 oʻramli gʻaltakdan 3 A tok oʻtmoqda. Ichiga μ = 20 boʻlgan oʻzak kiritilsa, induksiya necha T? (0,01 gacha)',
      hint: 'B₀ = μ₀ N I / (2R), keyin B = μ · B₀.',
      explanation: 'B₀ = 4π·10⁻⁷ · 150 · 3 / 0,04 ≈ 0,0141 T; B ≈ 20 · 0,0141 ≈ 0,28 T.',
      widget: { type: 'number_answer', props: { answer: 0.283, tolerance: 0.01, unit: 'T' } }
    },
    {
      id: 'f10q4',
      prompt: '80 mT induksiyali oʻzaksiz gʻaltakka μ = 25 boʻlgan oʻzak kiritildi. Induksiya necha T?',
      hint: 'B = μ · B₀.',
      explanation: '25 · 0,08 = 2 T.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'T' } }
    },
    {
      id: 'f10q5',
      prompt: 'Moddalarni turlarga ajrating.',
      hint: 'Temir guruhi — ferro.',
      explanation: 'Mis, oltin — dia; alyuminiy, platina — para; temir, nikel — ferro.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'd', label: 'Diamagnetik' },
            { id: 'p', label: 'Paramagnetik' },
            { id: 'f', label: 'Ferromagnetik' }
          ],
          items: [
            { emoji: '', label: 'mis', bin: 'd' },
            { emoji: '', label: 'oltin', bin: 'd' },
            { emoji: '', label: 'alyuminiy', bin: 'p' },
            { emoji: '', label: 'platina', bin: 'p' },
            { emoji: '', label: 'temir', bin: 'f' },
            { emoji: '', label: 'nikel', bin: 'f' }
          ]
        }
      }
    },
    {
      id: 'f10q6',
      prompt: 'Paramagnit moddalarning magnit singdiruvchanligi qanday?',
      hint: 'Birdan biroz katta.',
      explanation: 'Paramagnetiklarda μ > 1 (birdan biroz katta).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['μ > 1', 'μ ≫ 1', 'μ < 1', 'μ = 0'], answerIndex: 0 } }
    },
    {
      id: 'f10q7',
      prompt: 'Gʻaltakka kiritilgan ferromagnit oʻzak qanday vazifani bajaradi?',
      hint: 'μ ≫ 1.',
      explanation: 'Ferromagnit oʻzak magnit maydonni kuchaytiradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Magnit maydonni kuchaytiradi', 'Elektr maydonni kuchaytiradi', 'Magnit maydonni susaytiradi', 'Hech narsani oʻzgartirmaydi'], answerIndex: 0 } }
    },
    {
      id: 'f10q8',
      prompt: 'Qaysi biri ortiqcha?',
      hint: 'Uchtasi ferromagnetik.',
      explanation: 'Temir, nikel, kobalt — ferromagnetik; mis — diamagnetik.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'temir' }, { text: 'nikel' }, { text: 'mis', odd: true }, { text: 'kobalt' }] } }
    },
    {
      id: 'f10q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Diamagnetiklar maydonni susaytiradi.',
      explanation: 'Diamagnetiklar magnitdan qochadi; ferromagnetiklar tortiladi; μ faqat moddaga bogʻliq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Diamagnetik jism magnitga tortiladi.', value: false },
            { text: 'Ferromagnetik jism magnit maydonga tortiladi.', value: true },
            { text: 'Magnit singdiruvchanlik muhitning tabiatiga bogʻliq.', value: true },
            { text: 'Kislorod — ferromagnetik.', value: false }
          ]
        }
      }
    }
  ]
};
