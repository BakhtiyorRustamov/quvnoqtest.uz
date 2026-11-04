import type { BoardLesson } from './types';
import { UZ1 } from './tarix-1';

/** Darslik: Oʻzbekiston tarixi 11, 2-mavzu (11–21-betlar) — prezidentlik instituti, Oliy Majlis, Vazirlar Mahkamasi, sud hokimiyati, Qurolli Kuchlar. */
export const TARIX_2: BoardLesson = {
  n: 2,
  label: '2',
  group: UZ1,
  title: 'Milliy davlatchilikning shakllanishi',
  section: 'Oʻzbekiston tarixi, 2-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mustaqil davlatga yangi boshqaruv tizimi kerak edi. 1990-yil 24-martda prezidentlik lavozimi joriy etildi. Davlat hokimiyati uch tarmoqqa boʻlindi: qonun chiqaruvchi — Oliy Majlis, ijro etuvchi — Vazirlar Mahkamasi va sud hokimiyati; Prezident ularning ishini muvofiqlashtiradi. 1991-yil 29-dekabrda ilk muqobil prezidentlik saylovi oʻtib, Islom Karimov saylandi. 2016-yil sentabrda u vafot etgach, dekabr saylovida Shavkat Mirziyoyev Prezident boʻldi.",
      easy: "Prezident + uch hokimiyat: Oliy Majlis, Vazirlar Mahkamasi, sud.",
      draw: [
        { t: 'title', text: 'Hokimiyatlar boʻlinishi' },
        { t: 'box', id: 'p', x: 34, y: 16, w: 32, h: 8, text: 'Prezident', color: 'purple' },
        { t: 'box', id: 'q', x: 4, y: 40, w: 28, h: 9, text: 'Oliy Majlis', color: 'blue' },
        { t: 'box', id: 'v', x: 36, y: 40, w: 28, h: 9, text: 'Vazirlar Mahkamasi', color: 'green' },
        { t: 'box', id: 's', x: 68, y: 40, w: 28, h: 9, text: 'sud', color: 'orange' },
        { t: 'arrow', from: 'p', to: 'q' },
        { t: 'arrow', from: 'p', to: 'v' },
        { t: 'arrow', from: 'p', to: 's' }
      ],
      next: 'Parlament va qoʻshin'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Parlament uch davrni bosib oʻtdi: 1990–1994-yillarda 150 deputatli Oliy Kengash, 1995–2004-yillarda 250 deputatli bir palatali Oliy Majlis, 2005-yildan esa ikki palatali parlament — 150 deputatli Qonunchilik palatasi va 100 aʼzoli Senat. Qurolli Kuchlar ham yaratildi: 1991-yil 6-sentabrda Mudofaa ishlari vazirligi tuzildi, 1992-yil 14-yanvarda respublika hududidagi harbiy qismlar Oʻzbekiston tasarrufiga olindi — bu kun Vatan himoyachilari kuni boʻldi. 2008-yildan oʻlim jazosi bekor qilindi.",
      easy: "Parlament: 1990 — Oliy Kengash, 1995 — Oliy Majlis, 2005 — ikki palata; 14-yanvar — Vatan himoyachilari kuni.",
      draw: [
        { t: 'title', text: 'Parlament va qoʻshin' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1990–1994', 'Oliy Kengash, 150 deputat'], ['1995–2004', 'Oliy Majlis, 250 deputat'], ['2005-yildan', 'ikki palata: 150 + 100'], ['1992-yil 14-yanvar', 'Qurolli Kuchlar'], ['2008-yil', 'oʻlim jazosi bekor']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Prezidentlik lavozimi 1990-yil 24-martda joriy etildi; davlat hokimiyati qonun chiqaruvchi, ijro etuvchi va sud hokimiyatlariga boʻlindi.',
    'Parlament: Oliy Kengash (1990–1994), bir palatali Oliy Majlis (1995–2004), 2005-yildan ikki palatali — Qonunchilik palatasi (150) va Senat (100).',
    'Mudofaa vazirligi 1991-yil 6-sentabrda tuzildi; 14-yanvar — Vatan himoyachilari kuni; 2008-yildan oʻlim jazosi bekor qilindi.'
  ],
  questions: [
    {
      id: 't2q1',
      prompt: 'Organni hokimiyat tarmogʻi bilan juftlang.',
      hint: 'Hukumat — ijro.',
      explanation: 'Oliy Majlis — qonun chiqaruvchi; Vazirlar Mahkamasi — ijro etuvchi; Oliy sud — sud hokimiyati.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Oliy Majlis', right: 'qonun chiqaruvchi' },
            { left: 'Vazirlar Mahkamasi', right: 'ijro etuvchi' },
            { left: 'Oliy sud', right: 'sud hokimiyati' }
          ]
        }
      }
    },
    {
      id: 't2q2',
      prompt: 'Parlament bosqichlarini tartiblang.',
      hint: 'Avval Oliy Kengash.',
      explanation: 'Oliy Kengash (1990–1994) → bir palatali Oliy Majlis (1995–2004) → ikki palatali Oliy Majlis (2005-yildan).',
      widget: { type: 'order_line', props: { items: [{ label: 'Oliy Kengash' }, { label: 'bir palatali Oliy Majlis' }, { label: 'ikki palatali Oliy Majlis' }] } }
    },
    {
      id: 't2q3',
      prompt: 'Senatda nechta senator faoliyat koʻrsatadi?',
      hint: '84 saylanadi + 16 tayinlanadi.',
      explanation: '100 senator.',
      widget: { type: 'number_answer', props: { answer: 100, unit: 'senator' } }
    },
    {
      id: 't2q4',
      prompt: 'Vatan himoyachilari kuni qachon nishonlanadi?',
      hint: 'Harbiy qismlar respublika tasarrufiga olingan kun.',
      explanation: '14-yanvar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1-sentabr', '14-yanvar', '8-dekabr', '9-may'], answerIndex: 1 } }
    },
    {
      id: 't2q5',
      prompt: 'Sanani voqea bilan juftlang.',
      hint: 'Mudofaa vazirligi — mustaqillikdan bir haftadan soʻng.',
      explanation: '1990-yil 24-mart — prezidentlik lavozimi; 1991-yil 6-sentabr — Mudofaa ishlari vazirligi; 2005-yil — ikki palatali parlament; 2008-yil — oʻlim jazosi bekor qilindi.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: '1990-yil 24-mart' }, b: { label: 'prezidentlik lavozimi' } },
            { a: { label: '1991-yil 6-sentabr' }, b: { label: 'Mudofaa vazirligi' } },
            { a: { label: '2005-yil' }, b: { label: 'ikki palatali parlament' } },
            { a: { label: '2008-yil' }, b: { label: 'oʻlim jazosi bekor' } }
          ]
        }
      }
    },
    {
      id: 't2q6',
      prompt: 'Oliy Majlisning ikki palatasini tanlang.',
      hint: 'Quyi va yuqori palata.',
      explanation: 'Qonunchilik palatasi (quyi) va Senat (yuqori).',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Qonunchilik palatasi', correct: true },
            { label: 'Senat', correct: true },
            { label: 'Vazirlar Mahkamasi' },
            { label: 'Konstitutsiyaviy sud' }
          ]
        }
      }
    },
    {
      id: 't2q7',
      prompt: 'Uch hokimiyat faoliyatini kim muvofiqlashtiradi?',
      hint: 'Davlat rahbari.',
      explanation: 'Prezident.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Bosh vazir', 'Prezident', 'Senat raisi', 'Oliy sud raisi'], answerIndex: 1 } }
    },
    {
      id: 't2q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ilk saylov muqobil boʻlgan.',
      explanation: '1991-yil 29-dekabrdagi saylov ikki nomzod bilan oʻtgan; Prezident — Qurolli Kuchlar Oliy Bosh Qoʻmondoni.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1991-yil dekabrdagi prezidentlik saylovida ikki nomzod qatnashgan.', value: true },
            { text: 'Prezident Qurolli Kuchlarning Oliy Bosh Qoʻmondoni.', value: true },
            { text: 'Ikki palatali parlament 1991-yilda ish boshlagan.', value: false },
            { text: 'Oʻlim jazosi hozir ham amalda.', value: false }
          ]
        }
      }
    }
  ]
};
