import type { BoardLesson } from './types';
import { BOB7 } from './fizika-39';
import { seg, vec } from './phys';

/** Darslik: Fizika 11, 38-mavzu (156–160-betlar) — lazer: majburiy nurlanish, metastabil holat, yoqut lazeri, xossalari va qoʻllanilishi. */
export const FIZ_40: BoardLesson = {
  n: 40,
  label: '38',
  group: BOB7,
  title: 'Lazer va ularning turlari',
  section: '38-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Doʻkondagi shtrix-kod skaneri, koʻzni operatsiya qiladigan shifokor, metallni kesuvchi stanok, hatto Yerdan Oygacha masofani santimetr aniqlikda oʻlchash — bularning barchasida lazer ishlaydi. Oddiy chiroqdan lazer nimasi bilan farq qiladi?",
      easy: "Lazer — skanerda, tibbiyotda, kesishda, oʻlchashda.",
      draw: [
        { t: 'title', text: 'Lazer hamma joyda' },
        { t: 'icon', x: 16, y: 34, emoji: '🔦', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🌙', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['shtrix-kod skaneri', 'koʻz operatsiyasi', 'Yer–Oy masofasi'] }
      ],
      next: 'Lazer nima?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Lazer — juda aniq yoʻnaltirilgan kogerent yorugʻlik manbayi. Soʻz inglizcha Light Amplification by Stimulated Emission of Radiation — majburiy nurlanish yordamida yorugʻlikni kuchaytirish iborasining bosh harflaridan olingan. Birinchi kvant generatorlarini Basov, Proxorov va Tauns yaratgan, ular 1964-yilda Nobel mukofotini olishgan.",
      easy: "LASER — majburiy nurlanish bilan yorugʻlikni kuchaytirish. Basov, Proxorov, Tauns — Nobel 1964.",
      draw: [
        { t: 'title', text: 'LASER soʻzi' },
        { t: 'list', x: 6, y: 22, items: ['L — Light (yorugʻlik)', 'A — Amplification (kuchaytirish)', 'S — Stimulated (majburiy)', 'E — Emission (chiqarish)', 'R — Radiation (nurlanish)'] },
        { t: 'text', x: 6, y: 64, text: 'Basov, Proxorov, Tauns — Nobel 1964', size: 's', color: 'purple' }
      ],
      next: 'Spontan va majburiy'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Uygʻongan atom oʻz-oʻzidan asosiy holatga qaytib foton chiqarsa — bu spontan nurlanish, fotonlar tartibsiz, kogerent emas. Eynshteyn koʻrsatdi: yonidan oʻtayotgan foton atomni majburan oʻtkazishi mumkin. Shunda chiqqan foton dastlabkisi bilan bir xil: chastotasi, yoʻnalishi, fazasi va qutblanishi teng. Bitta foton ikkitaga aylanadi — yorugʻlik kuchayadi.",
      easy: "Spontan — oʻz-oʻzidan, tartibsiz. Majburiy — foton taʼsirida, egizak foton.",
      draw: [
        { t: 'title', text: 'Spontan va majburiy nurlanish' },
        ...seg('a2', 6, 30, 30, 30, 'ink'),
        ...seg('a1', 6, 52, 30, 52, 'ink'),
        ...vec('as', 18, 31, 18, 51, 'purple'),
        ...vec('af', 20, 42, 34, 42, 'orange', 'hν'),
        { t: 'text', x: 18, y: 62, text: 'spontan', size: 's', anchor: 'middle' },
        ...seg('b2', 52, 30, 76, 30, 'ink'),
        ...seg('b1', 52, 52, 76, 52, 'ink'),
        ...vec('bin', 40, 38, 58, 38, 'orange', 'hν'),
        ...vec('bs', 64, 31, 64, 51, 'purple'),
        ...vec('bo1', 70, 38, 90, 38, 'orange'),
        ...vec('bo2', 70, 44, 90, 44, 'orange'),
        { t: 'text', x: 64, y: 62, text: 'majburiy: 2 ta bir xil foton', size: 's', anchor: 'middle' }
      ],
      next: 'Yoqut lazeri'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yoqut kristali — aluminiy oksid, unda baʼzi atomlar oʻrnida xrom ionlari bor. Kuchli lampa yorugʻligi xrom atomlarini 1-sathdan 3-sathga koʻtaradi. U yerdan ular tezda nurlanishsiz 2-sathga — metastabil holatga tushadi va unda uzoq turadi. 2-sathda atomlar 1-sathdagidan koʻp toʻplanadi. Bitta foton oʻtishni boshlaydi — koʻchkisimon kuchayib, 0,6943 mikrometrli qizil lazer nuri chiqadi.",
      easy: "Yoqut: 1 → 3 (lampa), 3 → 2 (nurlanishsiz), 2 → 1 — lazer nuri, λ = 0,6943 μm.",
      draw: [
        { t: 'title', text: 'Yoqut lazeri: uch sath' },
        ...seg('r3', 10, 22, 50, 22, 'ink'),
        ...seg('r2', 30, 32, 70, 32, 'ink'),
        ...seg('r1', 10, 60, 70, 60, 'ink'),
        { t: 'text', x: 6, y: 23, text: '3', size: 's' },
        { t: 'text', x: 72, y: 33, text: '2 metastabil', size: 's' },
        { t: 'text', x: 6, y: 61, text: '1', size: 's' },
        ...vec('pump', 16, 59, 16, 23, 'green'),
        { t: 'text', x: 18, y: 44, text: 'lampa', size: 's', color: 'green' },
        ...vec('nr', 40, 23, 44, 31, 'ink'),
        ...vec('las', 56, 33, 56, 59, 'red'),
        { t: 'text', x: 58, y: 48, text: '0,6943 μm', size: 's', color: 'red' },
        { t: 'text', x: 74, y: 56, text: 'Al₂O₃ + Cr³⁺', size: 's', color: 'purple' }
      ],
      next: 'Xossalari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Lazer nuri yuqori darajada kogerent, juda monoxromatik — toʻlqin uzunliklari farqi 10 ning minus 11 darajasi metrdan oshmaydi. Intensivligi 10 ning 16 dan 20 darajasigacha vatt kvadrat metr. Yoyilishi juda kichik: Oyga yoʻnaltirilgan lazer 3 kilometrli dogʻ hosil qiladi, oddiy projektor esa 40 ming kilometrli maydonni yoritgan boʻlardi. Olmosda teshik ochish 24 soat oʻrniga 6–8 minut oladi.",
      easy: "Kogerent, monoxromatik (Δλ < 10⁻¹¹ m), juda kuchli, kam yoyiladi.",
      draw: [
        { t: 'title', text: 'Lazer nuri xossalari' },
        { t: 'list', x: 6, y: 22, items: ['kogerent — fazalar bir xil', 'monoxromatik: Δλ < 10⁻¹¹ m', 'intensivlik: 10¹⁶–10²⁰ W/m²', 'Oyda dogʻ — 3 km (projektor 40 000 km)'] },
        { t: 'text', x: 6, y: 62, text: 'olmosda teshik: 24 soat → 6–8 min', size: 's', color: 'red' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Yoqut lazeri fotonining energiyasini topamiz. Lambda teng 0,6943 mikrometr. E teng h c boʻlinsin lambda — 6,63 karra 10 ning minus 34 darajasi karra 3 karra 10 ning 8 darajasi boʻlinsin 6,943 karra 10 ning minus 7 darajasi, taxminan 2,86 karra 10 ning minus 19 darajasi joul, yaʼni taxminan 1,79 elektronvolt. 1 joullik impulsda 3,5 karra 10 ning 18 darajasi foton bor.",
      easy: "E = hc/λ ≈ 2,86·10⁻¹⁹ J ≈ 1,79 eV.",
      draw: [
        { t: 'title', text: 'Yoqut lazeri fotoni' },
        { t: 'list', x: 6, y: 20, items: ['λ = 0,6943 μm', 'h = 6,63 · 10⁻³⁴ J·s'] },
        { t: 'formula', x: 6, y: 44, text: 'E = h c / λ ≈ 2,86 · 10⁻¹⁹ J' },
        { t: 'formula', x: 6, y: 56, text: 'N = 1 J / E ≈ 3,5 · 10¹⁸' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Lazer — majburiy nurlanish yordamida yorugʻlikni kuchaytiruvchi kogerent nur manbayi (Basov, Proxorov, Tauns — Nobel 1964).',
    'Majburiy nurlanishda chiqqan foton dastlabkisi bilan bir xil chastota, yoʻnalish, faza va qutblanishga ega; metastabil holat atomlarni toʻplaydi.',
    'Lazer nuri: kogerent, monoxromatik, juda kuchli, kam yoyiladi; kesish, payvandlash, tibbiyot, oʻlchov, disklarda qoʻllanadi.'
  ],
  questions: [
    {
      id: 'f40q1',
      prompt: 'Toʻlqin uzunligi 663 nm boʻlgan lazer fotonining energiyasi necha ·10⁻¹⁹ J? (h = 6,63·10⁻³⁴ J·s)',
      hint: 'E = hc/λ.',
      explanation: '6,63·10⁻³⁴ · 3·10⁸ / 6,63·10⁻⁷ = 3·10⁻¹⁹ J.',
      widget: { type: 'number_answer', props: { answer: 3, tolerance: 0.02, unit: '·10⁻¹⁹ J' } }
    },
    {
      id: 'f40q2',
      prompt: 'Quvvati 3 mW, λ = 663 nm lazer sekundiga nechta foton chiqaradi? (·10¹⁵ ta)',
      hint: 'N = P / E, E = 3·10⁻¹⁹ J.',
      explanation: '3·10⁻³ / 3·10⁻¹⁹ = 10¹⁶ = 10·10¹⁵ ta.',
      widget: { type: 'number_answer', props: { answer: 10, tolerance: 0.1, unit: '·10¹⁵ ta' } }
    },
    {
      id: 'f40q3',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Light Amplification by Stimulated Emission of Radiation.',
      explanation: 'Lazer — majburiy nurlanish yordamida yorugʻlikni kuchaytirish.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Lazer — ' },
            { blank: 'majburiy' },
            { text: ' nurlanish yordamida yorugʻlikni ' },
            { blank: 'kuchaytirish' },
            { text: '.' }
          ],
          bank: ['majburiy', 'kuchaytirish', 'spontan', 'susaytirish']
        }
      }
    },
    {
      id: 'f40q4',
      prompt: 'Nurlanish turini xossasiga qarab ajrating.',
      hint: 'Majburiy — egizak fotonlar.',
      explanation: 'Spontan: oʻz-oʻzidan, kogerent emas (lampa). Majburiy: foton taʼsirida, kogerent (lazer).',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 's', label: 'Spontan' },
            { id: 'm', label: 'Majburiy' }
          ],
          items: [
            { emoji: '', label: 'oʻz-oʻzidan sodir boʻladi', bin: 's' },
            { emoji: '', label: 'fotonlar kogerent emas', bin: 's' },
            { emoji: '', label: 'oddiy lampa', bin: 's' },
            { emoji: '', label: 'tashqi foton taʼsirida', bin: 'm' },
            { emoji: '', label: 'egizak fotonlar', bin: 'm' },
            { emoji: '', label: 'lazer', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'f40q5',
      prompt: 'Yoqut lazerida jarayonlarni tartibga keltiring.',
      hint: 'Avval lampa.',
      explanation: 'Lampa 1→3 → nurlanishsiz 3→2 → 2-sathda toʻplanish → foton koʻchkisi 2→1.',
      widget: { type: 'step_order', props: { steps: ['Lampa xrom atomlarini 1→3 koʻtaradi', 'Atomlar nurlanishsiz 3→2 tushadi', 'Metastabil 2-sathda atomlar toʻplanadi', 'Bitta foton 2→1 koʻchkini boshlaydi', 'Kogerent lazer nuri chiqadi'] } }
    },
    {
      id: 'f40q6',
      prompt: 'Lazer nurining xossalarini tanlang.',
      hint: 'Toʻrttasi toʻgʻri.',
      explanation: 'Kogerent, monoxromatik, kuchli, kam yoyiladi. Tutash spektr va tartibsiz faza — oddiy lampaga xos.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'kogerent', correct: true },
            { label: 'monoxromatik', correct: true },
            { label: 'kam yoyiladi', correct: true },
            { label: 'juda katta intensivlik', correct: true },
            { label: 'tutash spektr' },
            { label: 'fazalari tartibsiz' }
          ]
        }
      }
    },
    {
      id: 'f40q7',
      prompt: 'Metastabil holat nima?',
      hint: 'Yoqutdagi 2-sath.',
      explanation: 'Atom uzoq vaqt tura oladigan uygʻongan holat.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['eng past energiyali holat', 'atom uzoq tura oladigan uygʻongan holat', 'ionlashgan holat', 'atom 10⁻¹⁰ s turadigan holat'], answerIndex: 1 } }
    },
    {
      id: 'f40q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Majburiy foton dastlabkisining nusxasi.',
      explanation: 'Yoqut lazeri qizil nur beradi; majburiy foton bir xil fazali; lazer nuri Oyda 3 km dogʻ hosil qiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Majburiy nurlanishda chiqqan foton dastlabkisi bilan bir xil fazaga ega.', value: true },
            { text: 'Yoqut lazeri qizil nur chiqaradi.', value: true },
            { text: 'Spontan nurlanish kogerent boʻladi.', value: false },
            { text: 'Lazer nuri oddiy projektor nuridan koʻproq yoyiladi.', value: false }
          ]
        }
      }
    }
  ]
};
