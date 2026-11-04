import type { BoardLesson } from './types';
import { BOB1 } from './fizika-1';

/** Takrorlash (savollar): darslik, I bob (1–6-mavzular) — "1-mashq", bob testi va xulosa jadvali asosida. */
export const FIZ_7: BoardLesson = {
  n: 7,
  label: '1–6',
  group: BOB1,
  title: 'Bobni takrorlash: magnit maydon',
  section: 'I bob, 1–6',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r1f1',
      prompt: 'Yuzi 250 cm² ramka 4 T maydonda, undan oʻtayotgan oqim 87 mWb. B vektori bilan ramka normali orasidagi burchak necha gradus? (butun songacha)',
      hint: 'cos α = Ф / (B · S).',
      explanation: 'cos α = 0,087 / (4 · 0,025) = 0,87, α ≈ 30°.',
      widget: { type: 'number_answer', props: { answer: 30, tolerance: 1, unit: '°' } }
    },
    {
      id: 'r1f2',
      prompt: '50 mT maydon chiziqlari sirt tekisligiga 30° burchak ostida tushmoqda. Induksiyaning sirtga normal tashkil etuvchisi necha mT?',
      hint: 'Bₙ = B · sin 30°.',
      explanation: '50 · 0,5 = 25 mT.',
      widget: { type: 'number_answer', props: { answer: 25, unit: 'mT' } }
    },
    {
      id: 'r1f3',
      prompt: 'Yuzi 50 cm² ramka 0,2 T maydonda, B bilan normal orasidagi burchak 60°. Magnit oqimi necha mWb?',
      hint: 'Ф = B · S · cos α.',
      explanation: '0,2 · 0,005 · 0,5 = 5·10⁻⁴ Wb = 0,5 mWb.',
      widget: { type: 'number_answer', props: { answer: 0.5, tolerance: 0.01, unit: 'mWb' } }
    },
    {
      id: 'r1f4',
      prompt: 'Toʻgʻri simdan 10 A tok oʻtmoqda. Undan 5 cm uzoqlikdagi induksiya necha μT?',
      hint: 'B = 2·10⁻⁷ · I / d.',
      explanation: '2·10⁻⁷ · 10 / 0,05 = 4·10⁻⁵ T = 40 μT.',
      widget: { type: 'number_answer', props: { answer: 40, unit: 'μT' } }
    },
    {
      id: 'r1f5',
      prompt: '0,1 T maydon chiziqlariga tik uzunligi 10 cm oʻtkazgichdan 2 A tok oʻtmoqda. Amper kuchi necha mN?',
      hint: 'F = I · B · l.',
      explanation: '2 · 0,1 · 0,1 = 0,02 N = 20 mN.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'mN' } }
    },
    {
      id: 'r1f6',
      prompt: '50 oʻramli, yuzi 10 cm² ramkadan 0,5 A tok oʻtmoqda, maydon 0,4 T. Eng katta aylantiruvchi moment necha mN·m?',
      hint: 'M = N · I · B · S.',
      explanation: '50 · 0,5 · 0,4 · 0,001 = 0,01 N·m = 10 mN·m.',
      widget: { type: 'number_answer', props: { answer: 10, unit: 'mN·m' } }
    },
    {
      id: 'r1f7',
      prompt: 'Oʻtkazgichdan 3 A tok oʻtmoqda, u surilganda kesib oʻtgan oqim 6 mWb. Ish necha mJ?',
      hint: 'A = I · ΔФ.',
      explanation: '3 · 6 = 18 mJ.',
      widget: { type: 'number_answer', props: { answer: 18, unit: 'mJ' } }
    },
    {
      id: 'r1f8',
      prompt: 'Orasi 20 cm parallel simlardan 5 A va 8 A tok oʻtmoqda. 0,5 m uzunlikka taʼsir kuchi necha μN?',
      hint: 'F = 2·10⁻⁷ · I₁I₂ · Δl / d.',
      explanation: '2·10⁻⁷ · 40 · 0,5 / 0,2 = 2·10⁻⁵ N = 20 μN.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'μN' } }
    },
    {
      id: 'r1f9',
      prompt: 'Proton 0,5 T maydonga tik 10⁶ m/s tezlikda kirdi (mₚ = 1,67·10⁻²⁷ kg). Aylana radiusi necha cm? (0,1 gacha)',
      hint: 'R = m v / (q B).',
      explanation: '1,67·10⁻²⁷ · 10⁶ / (1,6·10⁻¹⁹ · 0,5) ≈ 0,021 m = 2,1 cm.',
      widget: { type: 'number_answer', props: { answer: 2.09, tolerance: 0.06, unit: 'cm' } }
    },
    {
      id: 'r1f10',
      prompt: 'Kattalikni birligi bilan moslang.',
      hint: 'Oqim — veber.',
      explanation: 'Ф — Wb, B — T, M — N·m, Lorens kuchi — N.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'magnit oqimi Ф', right: 'Wb' },
            { left: 'induksiya B', right: 'T' },
            { left: 'aylantiruvchi moment M', right: 'N·m' },
            { left: 'Lorens kuchi', right: 'N' }
          ]
        }
      }
    },
    {
      id: 'r1f11',
      prompt: 'Kuchlarni guruhlarga ajrating.',
      hint: 'Qaysi kuch doim tezlikka tik?',
      explanation: 'Lorens kuchi tezlikka tik boʻlgani uchun ish bajarmaydi; qolganlari ish bajarishi mumkin.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'y', label: 'Ish bajaradi' },
            { id: 'n', label: 'Ish bajarmaydi' }
          ],
          items: [
            { emoji: '', label: 'Amper kuchi', bin: 'y' },
            { emoji: '', label: 'Lorens kuchi', bin: 'n' },
            { emoji: '', label: 'Kulon kuchi', bin: 'y' },
            { emoji: '', label: 'ishqalanish kuchi', bin: 'y' }
          ]
        }
      }
    },
    {
      id: 'r1f12',
      prompt: 'Chap qoʻl qoidasi bilan qaysi kuchlarning yoʻnalishi topiladi?',
      hint: 'Ikkalasi ham magnit maydon kuchi.',
      explanation: 'Amper kuchi ham, Lorens kuchi ham chap qoʻl qoidasi bilan topiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Faqat Amper kuchi', 'Faqat Lorens kuchi', 'Amper va Lorens kuchlari', 'Kulon kuchi'], answerIndex: 2 } }
    },
    {
      id: 'r1f13',
      prompt: 'Elektr tokining magnit taʼsiri tok qaysi muhitdan oʻtganda kuzatiladi?',
      hint: 'Ersted tajribasi faqat metallarga xosmi?',
      explanation: 'Tok qayerda oqmasin — metall, elektrolit, gaz yoki vakuum — atrofida magnit maydon hosil boʻladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Faqat metallardan', 'Faqat elektrolitlardan', 'Faqat vakuumda', 'Istalgan muhitda'], answerIndex: 3 } }
    },
    {
      id: 'r1f14',
      prompt: 'Qaysi biri ortiqcha?',
      hint: 'Uchtasi magnit maydon kattaliklari.',
      explanation: 'Tesla, veber va μ₀ — magnit kattaliklar; kulon — zaryad birligi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'tesla' }, { text: 'veber' }, { text: 'kulon', odd: true }, { text: 'μ₀ = 4π·10⁻⁷ N/A²' }] } }
    },
    {
      id: 'r1f15',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Bob xulosasini eslang.',
      explanation: 'Kuch chiziqlari N dan chiqib S ga kiradi va yopiq; toʻgʻri tok induksiyasi masofaga teskari proporsional; aylanish davri tezlikka bogʻliq emas.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Magnit kuch chiziqlari shimoliy qutbdan chiqib janubiy qutbga kiradi.', value: true },
            { text: 'Toʻgʻri tokdan uzoqlashgan sari induksiya ortadi.', value: false },
            { text: 'Zarraning aylanish davri uning tezligiga bogʻliq emas.', value: true },
            { text: 'Qarama-qarshi yoʻnalgan toklar bir-biriga tortiladi.', value: false }
          ]
        }
      }
    }
  ]
};
