import type { BoardLesson } from './types';
import { BOB6 } from './fizika-36';
import { vec, rect } from './phys';

/** Darslik: Fizika 11, 36-mavzu (142–145-betlar) — foton impulsi, yorugʻlik bosimi, fotoeffektning qoʻllanilishi. */
export const FIZ_38: BoardLesson = {
  n: 38,
  label: '36',
  group: BOB6,
  title: 'Yorugʻlik bosimi. Fotoeffektning qoʻllanilishi',
  section: '36-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Kometa Quyoshga yaqinlashganda uning dumi doim Quyoshga teskari tomonga choʻziladi. Buning sabablaridan biri — yorugʻlik bosimi. Ha, yorugʻlik jismni itaradi! Olimlar hatto quyosh yelkanli kosmik kemalarni ham sinab koʻrishgan.",
      easy: "Yorugʻlik jismga bosim beradi — kometa dumi Quyoshdan teskari.",
      draw: [
        { t: 'title', text: 'Yorugʻlik itaradi' },
        { t: 'icon', x: 16, y: 34, emoji: '☄️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⛵', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['kometa dumi — Quyoshdan teskari', 'quyosh yelkani', 'foton impulsga ega'] }
      ],
      next: 'Foton impulsi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Fotonning tinchlikdagi massasi nol boʻlsa ham, u impulsga ega: p teng h nu boʻlinsin c, yaʼni h boʻlinsin lambda. Foton qora sirtga yutilsa, impulsini toʻliq beradi. Koʻzgudan qaytsa, impulsi teskari yoʻnaladi va sirtga ikki baravar koʻp impuls beriladi: delta p teng 2 h nu boʻlinsin c.",
      easy: "p = hν/c = h/λ; koʻzguda Δp = 2p.",
      draw: [
        { t: 'title', text: 'Foton impulsi' },
        { t: 'formula', x: 4, y: 22, text: 'p = h ν / c = h / λ' },
        ...rect('a', 14, 36, 4, 24, 'ink'),
        ...vec('pa', 4, 48, 13, 48, 'orange', 'p'),
        { t: 'text', x: 10, y: 66, text: 'yutuvchi: Δp = p', size: 's', anchor: 'middle' },
        ...rect('m', 64, 36, 4, 24, 'blue'),
        ...vec('p1', 50, 44, 63, 44, 'orange', 'p'),
        ...vec('p2', 63, 52, 50, 52, 'red', 'p'),
        { t: 'text', x: 60, y: 66, text: 'koʻzgu: Δp = 2p', size: 's', anchor: 'middle' }
      ],
      next: 'Yorugʻlik bosimi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sirtga koʻp fotonlar tushganda ular bosim hosil qiladi. Yutuvchi sirt uchun p teng I boʻlinsin c, koʻzgu uchun 2 I boʻlinsin c, bunda I — yorugʻlik intensivligi, yaʼni 1 kvadrat metrga 1 sekundda tushadigan energiya. Bosim juda kichik. Uni birinchi boʻlib 1900-yilda Lebedev oʻlchagan — nazariya bilan 20 foiz farqli, 1923-yilda Gerlach 2 foiz aniqlikda tasdiqladi.",
      easy: "Yutuvchi: p = I/c; koʻzgu: p = 2I/c. Lebedev, 1900.",
      draw: [
        { t: 'title', text: 'Yorugʻlik bosimi' },
        { t: 'formula', x: 6, y: 24, text: 'yutuvchi:  p = I / c' },
        { t: 'formula', x: 6, y: 38, text: 'koʻzgu:  p = 2 I / c' },
        { t: 'list', x: 6, y: 50, items: ['Lebedev 1900 — 20 % aniqlik', 'Gerlach 1923 — 2 % aniqlik'] }
      ],
      next: 'Fotoelementlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Fotoeffekt texnikada keng qoʻllanadi. Fotorezistorning qarshiligi yorugʻlikda kamayadi — u avtomat chiroqlarda, eshiklarda ishlaydi. Quyosh batareyasi ichki fotoeffektga asoslangan kremniy p-n oʻtishdan iborat: bitta element taxminan 0,5 volt beradi, foydali ish koeffitsiyenti 11–22 foiz. Yorugʻlik diodlari esa aksincha — tokni yorugʻlikka aylantiradi.",
      easy: "Fotorezistor, quyosh batareyasi (0,5 V, FIK 11–22 %), yorugʻlik diodi.",
      draw: [
        { t: 'title', text: 'Fotoeffekt texnikada' },
        { t: 'icon', x: 12, y: 30, emoji: '💡', size: 'm' },
        { t: 'icon', x: 12, y: 44, emoji: '🔋', size: 'm' },
        { t: 'icon', x: 12, y: 58, emoji: '🚦', size: 'm' },
        { t: 'list', x: 22, y: 26, items: ['fotorezistor — avtomat chiroq', 'quyosh batareyasi: 0,5 V, FIK 11–22 %', 'yorugʻlik diodi — tok → yorugʻlik'] }
      ],
      next: 'Oʻzbekistonda'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻzbekistonda quyoshli kunlar koʻp, shuning uchun quyosh energetikasi muhim. Yarimoʻtkazgichli quyosh elementlari ustida akademik M. Saidov ilmiy maktabi ishlagan. 1993-yilda Toshkentda Fizika-Quyosh ilmiy-ishlab chiqarish birlashmasi tashkil etilgan.",
      easy: "Oʻzbekistonda quyosh energetikasi: M. Saidov, Fizika-Quyosh (1993).",
      draw: [
        { t: 'title', text: 'Quyosh energetikasi Oʻzbekistonda' },
        { t: 'icon', x: 14, y: 40, emoji: '☀️', size: 'l' },
        { t: 'list', x: 30, y: 28, items: ['quyoshli kunlar koʻp', 'akademik M. Saidov', '"Fizika-Quyosh" — 1993'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Intensivligi 600 vatt kvadrat metr boʻlgan yorugʻlik tik tushmoqda. Yutuvchi sirtga bosim: 600 boʻlinsin 3 karra 10 ning 8 darajasi, yaʼni 2 karra 10 ning minus 6 darajasi paskal. Koʻzguga esa ikki baravar — 4 karra 10 ning minus 6 darajasi paskal. Atmosfera bosimidan 25 milliard marta kichik!",
      easy: "p = I/c = 2·10⁻⁶ Pa; koʻzguda 4·10⁻⁶ Pa.",
      draw: [
        { t: 'title', text: 'Bosimni hisoblaymiz' },
        { t: 'list', x: 6, y: 20, items: ['I = 600 W/m²', 'c = 3 · 10⁸ m/s'] },
        { t: 'formula', x: 6, y: 44, text: 'p = I / c = 2 · 10⁻⁶ Pa' },
        { t: 'formula', x: 6, y: 56, text: 'koʻzgu: 2I / c = 4 · 10⁻⁶ Pa' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Foton impulsi p = hν/c = h/λ; koʻzgudan qaytganda sirtga 2p impuls beradi.',
    'Yorugʻlik bosimi: yutuvchi sirtda p = I/c, koʻzguda p = 2I/c; birinchi boʻlib Lebedev oʻlchagan (1900).',
    'Fotoeffekt qoʻllanilishi: fotorezistor, quyosh batareyalari (Si, ~0,5 V), yorugʻlik diodlari.'
  ],
  questions: [
    {
      id: 'f38q1',
      prompt: 'Toʻlqin uzunligi 500 nm boʻlgan fotonning impulsi necha ·10⁻²⁷ kg·m/s? (h = 6,6·10⁻³⁴ J·s, 0,01 gacha)',
      hint: 'p = h/λ.',
      explanation: '6,6·10⁻³⁴ / 5·10⁻⁷ = 1,32·10⁻²⁷ kg·m/s.',
      widget: { type: 'number_answer', props: { answer: 1.32, tolerance: 0.01, unit: '·10⁻²⁷ kg·m/s' } }
    },
    {
      id: 'f38q2',
      prompt: '100 cm² yuzaga minutiga 63 J yorugʻlik tushadi va toʻla qaytadi. Bosim necha ·10⁻⁷ Pa?',
      hint: 'I = E/(S·t), p = 2I/c.',
      explanation: 'I = 63/(0,01·60) = 105 W/m²; p = 2·105/3·10⁸ = 7·10⁻⁷ Pa.',
      widget: { type: 'number_answer', props: { answer: 7, tolerance: 0.05, unit: '·10⁻⁷ Pa' } }
    },
    {
      id: 'f38q3',
      prompt: 'Chastotasi 10¹⁶ Hz nur koʻzgudan toʻla qaytdi. Foton impulsi oʻzgarishi necha ·10⁻²⁶ kg·m/s? (h = 6,6·10⁻³⁴)',
      hint: 'Δp = 2hν/c.',
      explanation: '2·6,6·10⁻³⁴·10¹⁶ / 3·10⁸ = 4,4·10⁻²⁶ kg·m/s.',
      widget: { type: 'number_answer', props: { answer: 4.4, tolerance: 0.05, unit: '·10⁻²⁶ kg·m/s' } }
    },
    {
      id: 'f38q4',
      prompt: '200 W lampa λ = 1,2 μm nur chiqaradi. Bir sekundda nechta foton? (·10²¹ ta, 0,1 gacha)',
      hint: 'N = P·t / (hc/λ).',
      explanation: 'hc/λ ≈ 1,66·10⁻¹⁹ J; 200 / 1,66·10⁻¹⁹ ≈ 1,2·10²¹ ta.',
      widget: { type: 'number_answer', props: { answer: 1.2, tolerance: 0.05, unit: '·10²¹ ta' } }
    },
    {
      id: 'f38q5',
      prompt: 'Toʻla qaytaruvchi sirtga bosim toʻla yutuvchi sirtga nisbatan necha marta katta?',
      hint: 'Qaytganda impuls teskari yoʻnaladi.',
      explanation: '2 marta.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['teng', '2 marta', '4 marta', '2 marta kichik'], answerIndex: 1 } }
    },
    {
      id: 'f38q6',
      prompt: 'Birinchi foton energiyasi ikkinchisidan 2 marta katta. Impulslari nisbati qanday?',
      hint: 'p = E/c.',
      explanation: 'Impuls energiyaga proporsional — 2 marta katta.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['teng', '√2 marta katta', '2 marta katta', '4 marta katta'], answerIndex: 2 } }
    },
    {
      id: 'f38q7',
      prompt: 'Qurilmani ishlash prinsipi bilan juftlang.',
      hint: 'Diod — aksincha jarayon.',
      explanation: 'Fotorezistor — yorugʻlikda qarshilik kamayadi; quyosh batareyasi — yorugʻlik → tok (p-n); yorugʻlik diodi — tok → yorugʻlik.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'fotorezistor', right: 'yorugʻlikda qarshiligi kamayadi' },
            { left: 'quyosh batareyasi', right: 'yorugʻlik → elektr energiyasi' },
            { left: 'yorugʻlik diodi', right: 'tok → yorugʻlik' }
          ]
        }
      }
    },
    {
      id: 'f38q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Foton massasi nol boʻlsa ham impulsi bor.',
      explanation: 'Foton impulsga ega; toʻlqin uzunligi oshsa impuls kamayadi; Lebedev birinchi oʻlchagan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Tinchlikdagi massasi nol boʻlsa ham foton impulsga ega.', value: true },
            { text: 'Yorugʻlik bosimini birinchi boʻlib Lebedev oʻlchagan.', value: true },
            { text: 'Toʻlqin uzunligi oshsa, foton impulsi oshadi.', value: false },
            { text: 'Quyosh batareyasi tashqi fotoeffektga asoslangan.', value: false }
          ]
        }
      }
    }
  ]
};
