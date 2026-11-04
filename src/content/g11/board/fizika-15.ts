import type { BoardLesson } from './types';
import { BOB3 } from './fizika-13';
import { rect, seg, vec } from './phys';

/** Darslik: Fizika 11, 13-mavzu (48–50-betlar) — tranzistorli elektromagnit tebranishlar generatori, avtotebranishlar. */
export const FIZ_15: BoardLesson = {
  n: 15,
  label: '13',
  group: BOB3,
  title: 'Tranzistorli generator. Avtotebranishlar',
  section: '13-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Radiostansiya kechayu kunduz toʻxtovsiz efirga chiqadi, uning signali bir lahza ham soʻnmaydi. Lekin oddiy kontur tebranishlari tezda soʻnadi-ku! Demak, kimdir konturga energiyani aynan kerakli paytda, sekundiga millionlab marta qoʻshib turishi kerak. Bu vazifani tranzistor bajaradi.",
      easy: "Soʻnmas tebranish uchun konturga energiya qoʻshib turish kerak — tranzistor.",
      draw: [
        { t: 'title', text: 'Signal nega soʻnmaydi?' },
        { t: 'icon', x: 16, y: 34, emoji: '📡', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🔋', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['kontur tebranishi soʻnadi', 'energiya qoʻshib turish kerak', 'sekundiga million marta'] }
      ],
      next: 'Uzib-ulagich muammosi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Konturdagi simlar qarshiligi tufayli energiya issiqlikka aylanadi. Tebranish soʻnmasligi uchun batareyani konturga davriy ravishda, kondensator qoplamasining ishorasi batareya qutbiga mos kelgan paytdagina ulash kerak. Chastota 1 megagers boʻlsa, sekundiga million marta uzib-ulash kerak — buni hech qanday mexanik kalit uddalay olmaydi.",
      easy: "1 MHz da sekundiga million marta ulash kerak — mexanik kalit uddalamaydi.",
      draw: [
        { t: 'title', text: 'Qachon ulash kerak?' },
        { t: 'list', x: 6, y: 24, items: ['qarshilik → energiya issiqlikka', 'batareyani oʻz vaqtida ulash kerak', 'ν = 1 MHz → 10⁶ marta / s', 'mexanik kalit — juda sekin'] }
      ],
      next: 'Tranzistor — kalit'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tranzistor elektron kalit vazifasini bajaradi. Bazaga manfiy, emitterga musbat kuchlanish berilsa, tranzistor ochiq — tok oʻtadi. Qutblar almashtirilsa, tranzistor yopiq — tok oʻtmaydi. U bunday ochilib-yopilishni sekundiga millionlab marta bajara oladi.",
      easy: "Tranzistor — tez ishlaydigan elektron kalit.",
      draw: [
        { t: 'title', text: 'Tranzistor — elektron kalit' },
        { t: 'text', x: 6, y: 30, text: 'baza (−), emitter (+)', color: 'green' },
        { t: 'text', x: 60, y: 30, text: '→ ochiq', color: 'green' },
        { t: 'text', x: 6, y: 46, text: 'baza (+), emitter (−)', color: 'red' },
        { t: 'text', x: 60, y: 46, text: '→ yopiq', color: 'red' },
        { t: 'text', x: 6, y: 60, text: 'millionlab marta / s', color: 'purple', size: 's' }
      ],
      next: 'Generator sxemasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Generatorda LC kontur batareyaga tranzistor orqali ulanadi. Kontur gʻaltagi yonidagi kichik Lb gʻaltakda oʻzaro induksiya EYuK hosil boʻladi va u tranzistorni ochib-yopadi. Shunday qilib, konturning oʻzi tranzistorni boshqaradi — bu teskari bogʻlanish. Tebranish soʻnmasligi uchun kirish va chiqish kuchlanishlari 180 gradusga farq qilishi kerak.",
      easy: "Lb gʻaltak orqali kontur tranzistorni boshqaradi — teskari bogʻlanish.",
      draw: [
        { t: 'title', text: 'Generator sxemasi' },
        ...rect('a', 4, 26, 22, 10, 'green'),
        { t: 'text', x: 15, y: 32.6, text: 'batareya', anchor: 'middle', size: 's' },
        ...rect('b', 36, 26, 24, 10, 'purple'),
        { t: 'text', x: 48, y: 32.6, text: 'tranzistor', anchor: 'middle', size: 's' },
        ...rect('c', 70, 26, 24, 10, 'orange'),
        { t: 'text', x: 82, y: 32.6, text: 'LC kontur', anchor: 'middle', size: 's' },
        ...vec('ab', 26, 31, 36, 31, 'ink'),
        ...vec('bc', 60, 31, 70, 31, 'ink'),
        ...seg('f1', 82, 36, 82, 50, 'red'),
        ...seg('f2', 82, 50, 48, 50, 'red'),
        ...vec('f3', 48, 50, 48, 36, 'red'),
        { t: 'text', x: 40, y: 58, text: 'Lb — teskari bogʻlanish', color: 'red', size: 's' }
      ],
      next: 'Avtotebranishlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Generatorda soʻnmas avtotebranishlar hosil boʻladi. Ular majburiy tebranishlardan farq qiladi: tashqi davriy taʼsir kerak emas, energiya manbayi tizimning oʻzida va uni qachon berishni tizim oʻzi boshqaradi. Har qanday avtotebranish tizimi uch qismdan iborat: energiya manbayi, tebranish tizimi va elektron kalit. Ular radioaloqa, televideniye, kompyuterlar va tibbiyotda ishlatiladi.",
      easy: "Avtotebranish: manba + tebranish tizimi + kalit; tashqi taʼsir kerak emas.",
      draw: [
        { t: 'title', text: 'Avtotebranish tizimi' },
        { t: 'list', x: 6, y: 24, items: ['energiya manbayi', 'tebranish tizimi (LC)', 'elektron kalit (tranzistor)'] },
        { t: 'icon', x: 70, y: 32, emoji: '📺', size: 'l' },
        { t: 'icon', x: 86, y: 32, emoji: '💻', size: 'l' },
        { t: 'text', x: 6, y: 58, text: 'tashqi davriy taʼsir kerak emas', color: 'purple' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Generator konturida gʻaltak induktivligi 2 mikrogenri, kondensator sigʻimi 50 pikofarad. Generator chastotasi Tomson formulasidan: L C teng 10 ning minus 16 darajasi, ildizi 10 ning minus 8 darajasi. Nu teng 1 boʻlinsin 2 pi karra 10 ning minus 8 darajasi — taxminan 15,9 megagers.",
      easy: "ν = 1/(2π√LC) = 1/(2π·10⁻⁸) ≈ 15,9 MHz.",
      draw: [
        { t: 'title', text: 'Generator chastotasi' },
        { t: 'list', x: 6, y: 20, items: ['L = 2 μH, C = 50 pF', 'LC = 10⁻¹⁶ s², √LC = 10⁻⁸ s'] },
        { t: 'formula', x: 6, y: 46, text: 'ν = 1 / (2π √LC) ≈ 15,9 MHz' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Real konturda tebranishlar soʻnadi; soʻnmasligi uchun energiyani oʻz vaqtida qoʻshib turish kerak.',
    'Tranzistor — tez elektron kalit; Lb gʻaltak orqali kontur uni boshqaradi (teskari bogʻlanish, 180° faza farqi).',
    'Avtotebranish tizimi: energiya manbayi, tebranish tizimi, elektron kalit; chastota Tomson formulasidan.'
  ],
  questions: [
    {
      id: 'f15q1',
      prompt: 'Generator konturida L = 0,1 mH, C = 100 pF. Chastota necha MHz? (0,01 gacha)',
      hint: 'ν = 1 / (2π√LC).',
      explanation: '√(10⁻⁴ · 10⁻¹⁰) = 10⁻⁷; ν = 1 / (2π · 10⁻⁷) ≈ 1,59 MHz.',
      widget: { type: 'number_answer', props: { answer: 1.59, tolerance: 0.01, unit: 'MHz' } }
    },
    {
      id: 'f15q2',
      prompt: 'Teskari bogʻlanish tebranishlarni soʻndirmasligi uchun kirish va chiqish kuchlanishlari fazasi necha gradusga farq qilishi kerak?',
      hint: 'Qarama-qarshi fazada.',
      explanation: '180°.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['60°', '90°', '180°', '270°'], answerIndex: 2 } }
    },
    {
      id: 'f15q3',
      prompt: 'Tranzistorli generatorda teskari bogʻlanish qaysi element orqali amalga oshadi?',
      hint: 'Kontur gʻaltagi yonidagi kichik gʻaltak.',
      explanation: 'Lb bogʻlanish gʻaltagi orqali.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['L gʻaltak', 'C kondensator', 'Lb gʻaltak', 'batareya'], answerIndex: 2 } }
    },
    {
      id: 'f15q4',
      prompt: 'Real konturdagi erkin tebranishlar nega soʻnadi?',
      hint: 'Simlar qiziydi.',
      explanation: 'Simlar qarshiligi tufayli elektr energiyasi issiqlikka aylanadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Kondensator teshiladi', 'Qarshilik tufayli energiya issiqlikka aylanadi', 'Gʻaltak magnitlanib qoladi', 'Zaryad yoʻqoladi'], answerIndex: 1 } }
    },
    {
      id: 'f15q5',
      prompt: 'Avtotebranish tizimining asosiy qismlarini belgilang.',
      hint: 'Uchta qism.',
      explanation: 'Energiya manbayi, tebranish tizimi, elektron kalit.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'energiya manbayi', correct: true },
            { label: 'tebranish tizimi', correct: true },
            { label: 'elektron kalit', correct: true },
            { label: 'tashqi davriy kuch' },
            { label: 'mexanik uzib-ulagich' }
          ]
        }
      }
    },
    {
      id: 'f15q6',
      prompt: 'Generatordagi jarayonni tartiblang.',
      hint: 'Avval tok oʻsadi.',
      explanation: 'L dagi tok oʻsadi → Lb da EYuK → tranzistor ochiladi, C zaryadlanadi → tok oʻsishi toʻxtaydi, tranzistor yopiladi → C konturda tebranadi.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['L gʻaltakdagi tok oʻsa boshlaydi', 'Lb da oʻzaro induksiya EYuK hosil boʻladi', 'Tranzistor ochiladi, C zaryadlanadi', 'Tok oʻsishdan toʻxtaydi, tranzistor yopiladi', 'C konturda tebranish hosil qiladi']
        }
      }
    },
    {
      id: 'f15q7',
      prompt: 'Avtotebranishning majburiy tebranishdan asosiy farqi nimada?',
      hint: 'Tashqi taʼsir.',
      explanation: 'Avtotebranishda tashqi davriy taʼsir kerak emas — energiya berishni tizimning oʻzi boshqaradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Chastotasi kichik', 'Tashqi davriy taʼsir kerak emas', 'Ular soʻnuvchi', 'Faqat mexanik tizimlarda boʻladi'], answerIndex: 1 } }
    },
    {
      id: 'f15q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tranzistor ochilishini kim boshqaradi?',
      explanation: 'Tranzistorni konturning oʻzi (Lb orqali) boshqaradi; generator chastotasi Tomson formulasidan; mexanik kalit 1 MHz ga yetolmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Tranzistorning ochilib-yopilishini konturdagi tebranishlarning oʻzi boshqaradi.', value: true },
            { text: 'Generator chastotasi T = 2π√(LC) formulasi bilan aniqlanadi.', value: true },
            { text: 'Mexanik kalit sekundiga million marta bemalol uzib-ulay oladi.', value: false },
            { text: 'Avtotebranishlar soʻnuvchi tebranishlardir.', value: false }
          ]
        }
      }
    }
  ]
};
