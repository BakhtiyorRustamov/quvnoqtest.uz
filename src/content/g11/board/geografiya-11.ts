import type { BoardLesson } from './types';
import { GEO3 } from './geografiya-10';

/** Darslik: Geografiya 10, 11-§ (45–50-betlar) — antropogen taʼsir va antropogen landshaftlar, F. N. Milkov va A. G. Isachenko tasniflari, madaniy landshaftlar, buzilgan yerlar, geotextizimlar. */
export const GEO_11: BoardLesson = {
  n: 11,
  label: '11',
  group: GEO3,
  title: 'Antropogen landshaftlar',
  section: '11-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Insonning xoʻjalik faoliyati tabiatga koʻrsatadigan taʼsir antropogen taʼsir deyiladi. Uning natijasida oʻzgargan landshaftlar antropogen landshaftlar deb ataladi. Taʼsir koʻpincha kutilmagan oqibatlarga ham olib keladi: suv ombori qurilsa atrofdagi yerlarni suv bosishi, yer osti suvlari koʻp olinsa yer yuzasi choʻkishi mumkin. F. N. Milkov antropogen landshaftlarni 8 sinfga ajratgan: qishloq xoʻjalik, sanoat, chiziqli-yoʻl, oʻrmon, suv, rekreatsion, seliteb — yaʼni shahar va qishloqlar — hamda belligerativ, yaʼni qalʼa va istehkomlar landshaftlari.",
      easy: "Antropogen landshaft — inson taʼsirida oʻzgargan landshaft; Milkov 8 sinfga ajratgan.",
      draw: [
        { t: 'title', text: 'Antropogen landshaft sinflari' },
        { t: 'table', x: 4, y: 18, rows: [['sinf', 'misol'], ['qishloq xoʻjalik', 'dalalar, bogʻlar'], ['sanoat', 'karyerlar, tashlamalar'], ['chiziqli-yoʻl', 'yoʻllar, quvurlar'], ['suv', 'suv omborlari, kanallar'], ['seliteb', 'shahar va qishloqlar']] }
      ],
      next: 'Madaniy va buzilgan'
    },
    {
      kind: 'explain',
      clear: true,
      say: "A. G. Isachenko landshaftlarni oʻzgarish darajasiga koʻra toʻrt guruhga boʻlgan: shartli oʻzgartirilmagan — masalan, baland togʻ muzliklari va qoʻriqxonalar; kuchsiz oʻzgartirilgan — ovchilik, baliqchilik taʼsiridagi joylar; kuchli oʻzgartirilgan — karyerlar, kon chiqindilari; madaniy landshaftlar — ilmiy asosda oqilona oʻzgartirilgan bogʻlar, paxtazorlar. Oʻzbekiston vohalari — madaniy landshaftlarning yorqin namunasi: ularda aholining qariyb 9/10 qismi yashaydi va sugʻoriladigan yerlar qishloq xoʻjaligi mahsulotining qariyb 9/10 qismini beradi. Buzilgan yerlar esa xoʻjalik qiymatini yoʻqotgan hududlar. Texnika va tabiat birlashgan tizimlar — suv omborlari, kanallar, zavodlar atrofi — geotextizimlar deyiladi.",
      easy: "Isachenko: oʻzgartirilmagan → kuchsiz → kuchli oʻzgartirilgan → madaniy; vohalar — madaniy landshaft; geotextizim = texnika + tabiat.",
      draw: [
        { t: 'title', text: 'Vohalar — madaniy landshaft' },
        { t: 'bars', x: 6, y: 18, w: 50, h: 34, items: [{ label: 'yer fondi', value: 10 }, { label: 'aholi', value: 90 }, { label: 'mahsulot', value: 90 }] },
        { t: 'text', x: 60, y: 26, text: 'vohalarning', size: 's' },
        { t: 'text', x: 60, y: 34, text: 'ulushi, %', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Antropogen landshaftlar — inson xoʻjalik faoliyati taʼsirida oʻzgargan geotizimlar; F. N. Milkov ularni 8 sinfga ajratgan (qishloq xoʻjalik, sanoat, chiziqli-yoʻl, suv, seliteb va boshqalar).',
    'A. G. Isachenko oʻzgarish darajasiga koʻra toʻrt guruhni ajratgan; madaniy landshaftlar ilmiy asosda oqilona oʻzgartiriladi, Oʻzbekiston vohalari bunga misol.',
    'Buzilgan yerlar xoʻjalik qiymatini yoʻqotgan hududlar; texnika va tabiat birlashgan tizimlar geotextizimlar deyiladi.'
  ],
  questions: [
    {
      id: 'g11q1',
      prompt: 'Isachenko guruhlarini oʻzgarish darajasi ortib borishi tartibida joylashtiring.',
      hint: 'Avval — oʻzgartirilmagan.',
      explanation: 'Shartli oʻzgartirilmagan → kuchsiz oʻzgartirilgan → kuchli oʻzgartirilgan.',
      widget: { type: 'order_line', props: { items: [{ label: 'shartli oʻzgartirilmagan' }, { label: 'kuchsiz oʻzgartirilgan' }, { label: 'kuchli oʻzgartirilgan' }] } }
    },
    {
      id: 'g11q2',
      prompt: 'Landshaftni Milkov sinfiga ajrating.',
      hint: 'Seliteb — aholi punktlari.',
      explanation: 'Sanoat — karyer, terrikon; suv — suv ombori, kanal; seliteb — shahar, qishloq.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 's', label: 'sanoat' }, { id: 'v', label: 'suv' }, { id: 'l', label: 'seliteb' }],
          items: [
            { emoji: '⛏️', label: 'karyer', bin: 's' },
            { emoji: '⛰️', label: 'terrikon (chiqindi uyumi)', bin: 's' },
            { emoji: '🌊', label: 'suv ombori', bin: 'v' },
            { emoji: '🚣', label: 'kanal', bin: 'v' },
            { emoji: '🏙️', label: 'shahar', bin: 'l' },
            { emoji: '🏡', label: 'qishloq', bin: 'l' }
          ]
        }
      }
    },
    {
      id: 'g11q3',
      prompt: 'Oʻzbekiston vohalarida respublika aholisining qancha qismi yashaydi?',
      hint: 'Deyarli hammasi.',
      explanation: 'Qariyb 9/10 qismi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qariyb 9/10', 'yarmi', '1/10', '1/3'], answerIndex: 0 } }
    },
    {
      id: 'g11q4',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Geotextizim — texnika + tabiat.',
      explanation: 'Madaniy landshaft — ilmiy asosda oqilona oʻzgartirilgan; buzilgan yerlar — xoʻjalik qiymatini yoʻqotgan; geotextizim — tabiat va texnika birlashgan tizim.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'madaniy landshaft', right: 'ilmiy asosda oqilona oʻzgartirilgan' },
            { left: 'buzilgan yerlar', right: 'xoʻjalik qiymatini yoʻqotgan' },
            { left: 'geotextizim', right: 'tabiat va texnika birlashgan tizim' }
          ]
        }
      }
    },
    {
      id: 'g11q5',
      prompt: 'F. N. Milkov antropogen landshaftlarni nechta sinfga ajratgan?',
      hint: 'Oltidan koʻp.',
      explanation: '8 ta sinfga.',
      widget: { type: 'number_answer', props: { answer: 8, unit: 'ta' } }
    },
    {
      id: 'g11q6',
      prompt: 'Madaniy landshaftlarga xos ikki asosiy sifatni tanlang.',
      hint: 'Inson uchun qulaylik va foyda.',
      explanation: 'Yashash uchun qulay va sogʻlom muhit; yuqori mahsuldorlik va samaradorlik.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'yashash uchun qulay va sogʻlom muhit', correct: true },
            { label: 'yuqori mahsuldorlik va samaradorlik', correct: true },
            { label: 'tuproq va suvning ifloslanishi' },
            { label: 'yoqimsiz manzara' }
          ]
        }
      }
    },
    {
      id: 'g11q7',
      prompt: 'Qaysi biri geotextizimga misol boʻladi?',
      hint: 'Texnika + landshaft.',
      explanation: 'Suv ombori va uning atrofidagi landshaft.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['suv ombori va atrofidagi landshaft', 'baland togʻ muzligi', 'qoʻriqxonadagi oʻrmon', 'okean tubidagi chuqurlik'], answerIndex: 0 } }
    },
    {
      id: 'g11q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kanal ham daryodek yemiradi.',
      explanation: 'Kanallar daryolar kabi qirgʻoq va tubini yemiradi; buzilgan yerlarni tiklash katta mablagʻ talab qiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kanallar ham daryolar kabi qirgʻoq va tubini yemiradi.', value: true },
            { text: 'Buzilgan yerlarni qayta tiklash katta mablagʻ talab qiladi.', value: true },
            { text: 'Inson butun boshli yangi landshaftlarni yoʻqdan yarata oladi.', value: false },
            { text: 'Qoʻriqxonalar kuchli oʻzgartirilgan landshaftlarga kiradi.', value: false }
          ]
        }
      }
    }
  ]
};
