import type { BoardLesson } from './types';
import { OZG11 } from './ozbek-67';

/** Darslik: Adabiyot 11, II qism (2018), 164–195-betlar — Rashod Nuri Guntekin, «Choliqushi» romanidan parcha va u haqida. */
export const OZ_68: BoardLesson = {
  n: 68,
  label: '68',
  group: OZG11,
  title: 'Guntekin. «Choliqushi»',
  section: 'Adabiyot, 2-qism: Rashod Nuri Guntekin (1889–1956); «Choliqushi» romanidan parcha va u haqida',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Rashod Nuri Guntekin (1889–1956) — Istanbulda tugʻilgan mashhur turk yozuvchisi; «Sirli qoʻl», «Yashil tun» kabi romanlar muallifi. Uni dunyoga «Choliqushi» (1922) romani tanitgan; asarni Mirzakalon Ismoiliy oʻzbek tiliga tarjima qilgan (1959). Roman bosh qahramon Farida tilidan hikoya qilinadi: u ochiq koʻngil, toʻgʻrisoʻz, shoʻx va shijoatli qiz, daraxtdan daraxtga sakrab yurgani uchun «Choliqushi» laqabini olgan. Faridaning faqat bittasidan — xolasining oʻgʻli Komrondan tortinishi ularning muhabbati boshlanishiga ishora. Roman voqealari keyinroq Birinchi jahon urushi davridagi turk xalqi hayoti foniga koʻchadi.",
      easy: "«Choliqushi» — shoʻx va toʻgʻrisoʻz Farida haqidagi turk romani. Voqealar uning tilidan hikoya qilinadi.",
      draw: [
        { t: 'title', text: '«Choliqushi» qahramonlari' },
        { t: 'table', x: 4, y: 18, rows: [['obraz', 'romandagi oʻrni'], ['Farida', 'bosh qahramon, hikoyachi'], ['Komron', 'Faridaning xolavachchasi'], ['Mujgon', 'Faridaning sirdoshi'], ['Aleksi opa', 'fransuz tili muallimasi']] },
        { t: 'text', x: 4, y: 52, text: 'Roman: 1922 · oʻzbekcha tarjima: 1959', size: 's', color: 'purple' }
      ],
      next: 'Tayyorman!'
    }
  ],
  summary: [
    'Rashod Nuri Guntekin (1889–1956) — turk yozuvchisi; «Choliqushi» (1922) uni dunyoga tanitgan.',
    'Roman Farida tilidan hikoya qilinadi: u ochiq koʻngil, toʻgʻrisoʻz, shoʻx va shijoatli qiz.',
    'Farida va Komron munosabati romanning asosiy ishq-muhabbat yoʻnalishi; voqealar Birinchi jahon urushi davriga koʻchadi.'
  ],
  questions: [
    {
      id: 'oz68q1',
      prompt: '«Choliqushi» romani qachon yozilgan?',
      hint: 'XX asrning 20-yillari.',
      explanation: '1922-yilda.',
      widget: { type: 'number_answer', props: { answer: 1922, unit: 'yil' } }
    },
    {
      id: 'oz68q2',
      prompt: 'Romanda voqealar kimning tilidan bayon qilinadi?',
      hint: 'Bosh qahramon.',
      explanation: 'Faridaning tilidan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Farida', 'Komron', 'muallif', 'Aleksi opa'], answerIndex: 0 } }
    },
    {
      id: 'oz68q3',
      prompt: 'Personajni romandagi oʻrni bilan juftlang.',
      hint: 'Aleksi opa — muallima.',
      explanation: 'Farida — bosh qahramon; Komron — xolavachchasi; Aleksi opa — fransuz tili muallimasi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Farida', right: 'bosh qahramon' },
            { left: 'Komron', right: 'Faridaning xolavachchasi' },
            { left: 'Aleksi opa', right: 'fransuz tili muallimasi' }
          ]
        }
      }
    },
    {
      id: 'oz68q4',
      prompt: 'Farida xarakteriga xos xususiyatlarni belgilang.',
      hint: 'Shoʻx qiz.',
      explanation: 'Ochiq koʻngil, toʻgʻrisoʻz, shoʻx va shijoatli.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ochiq koʻngil', correct: true },
            { label: 'toʻgʻrisoʻz', correct: true },
            { label: 'shoʻx va shijoatli', correct: true },
            { label: 'qoʻrqoq va yolgʻonchi' }
          ]
        }
      }
    },
    {
      id: 'oz68q5',
      prompt: 'Romanni oʻzbek tiliga kim tarjima qilgan?',
      hint: '1959-yil.',
      explanation: 'Mirzakalon Ismoiliy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Mirzakalon Ismoiliy', 'Rauf Parfi', 'Erkin Vohidov', 'Choʻlpon'], answerIndex: 0 } }
    },
    {
      id: 'oz68q6',
      prompt: 'Farida bolalar orasida faqat kimdan tortinardi?',
      hint: 'Basima xolaning oʻgʻli.',
      explanation: 'Komrondan — bu ularning kelajakdagi muhabbatiga ishora.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Komrondan', 'Misheldan', 'Husayndan', 'Aleksi opadan'], answerIndex: 0 } }
    },
    {
      id: 'oz68q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tarixiy fon.',
      explanation: 'Roman voqealari Birinchi jahon urushi davri foniga koʻchadi; u faqat muhabbat haqida emas, xalq hayoti haqida ham.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Roman voqealari Birinchi jahon urushi davri foniga koʻchadi.', value: true },
            { text: 'Romanda oddiy xalqning turmushi ham haqqoniy yoritilgan.', value: true },
            { text: 'Guntekin rus yozuvchisi boʻlgan.', value: false }
          ]
        }
      }
    }
  ]
};
