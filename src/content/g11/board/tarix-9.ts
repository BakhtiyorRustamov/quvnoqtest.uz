import type { BoardLesson } from './types';
import { UZ4 } from './tarix-8';

/** Darslik: Oʻzbekiston tarixi 11, 9-mavzu (65–70-betlar) — vijdon erkinligi, Din ishlari qoʻmitasi, 16 konfessiya, diniy bagʻrikenglik tamoyillari, diniy taʼlim va markazlar. */
export const TARIX_9: BoardLesson = {
  n: 9,
  label: '9',
  group: UZ4,
  title: 'Konfessiyalararo munosabatlar',
  section: 'Oʻzbekiston tarixi, 9-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Sovet davrida Oʻzbekistonda atigi 89 ta masjid va 2 ta madrasa bor edi. Mustaqillikdan keyin vijdon erkinligi kafolatlandi: Konstitutsiyaning 31-moddasiga koʻra har kim xohlagan dinga eʼtiqod qilishi yoki hech qaysi dinga eʼtiqod qilmasligi mumkin, dinni majburan singdirish taqiqlanadi. Din davlatdan ajratilgan, lekin xalqdan ajratilmagan. Bugun mamlakatda 16 ta diniy konfessiya — islom, pravoslav, katolik, yahudiy, buddaviy va boshqalar — totuv faoliyat yuritadi.",
      easy: "Vijdon erkinligi kafolatlangan; 16 konfessiya totuv yashaydi.",
      draw: [
        { t: 'title', text: 'Vijdon erkinligi' },
        { t: 'icon', x: 14, y: 40, emoji: '🕌', size: 'l' },
        { t: 'list', x: 30, y: 20, items: ['dinni tanlash erkin', 'majburlash taqiqlanadi', 'din davlatdan ajratilgan', '16 ta konfessiya'] }
      ],
      next: 'Muhim sanalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1991-yilda «Vijdon erkinligi va diniy tashkilotlar toʻgʻrisida»gi qonun qabul qilindi, 1998-yilda uning yangi tahriri chiqdi; unda bir dindagi odamlarni boshqa dinga oʻtkazishga urinish — prozelitizm va missionerlik taqiqlandi. 1992-yilda Din ishlari boʻyicha qoʻmita tuzildi. 1999-yilda Toshkent Islom universiteti ochildi. 2007-yilda AYSESKO Toshkentni «Islom madaniyati poytaxti» deb eʼlon qildi. 2017-yilda Samarqandda Imom Buxoriy xalqaro ilmiy-tadqiqot markazi, Toshkentda Islom madaniyati markazi va Islom akademiyasi tuzildi.",
      easy: "1991 — qonun; 1992 — Din ishlari qoʻmitasi; 1999 — Islom universiteti; 2007 — Islom madaniyati poytaxti.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1991', 'Vijdon erkinligi qonuni'], ['1992', 'Din ishlari qoʻmitasi'], ['1999', 'Toshkent Islom universiteti'], ['2007', 'Islom madaniyati poytaxti'], ['2017', 'Imom Buxoriy markazi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Konstitutsiyaning 31-moddasi vijdon erkinligini kafolatlaydi; din davlatdan ajratilgan, majburan singdirish va missionerlik taqiqlangan.',
    '1991-yilda (1998-yilda yangi tahrirda) vijdon erkinligi qonuni qabul qilindi, 1992-yilda Din ishlari qoʻmitasi tuzildi; 16 konfessiya totuv faoliyat yuritadi.',
    'Toshkent Islom universiteti (1999), «Islom madaniyati poytaxti» (2007), Imom Buxoriy markazi va Islom akademiyasi (2017) diniy maʼrifatga xizmat qiladi.'
  ],
  questions: [
    {
      id: 't9q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Qonun — eng birinchi.',
      explanation: 'Vijdon erkinligi qonuni (1991) → Din ishlari qoʻmitasi (1992) → Islom universiteti (1999) → «Islom madaniyati poytaxti» (2007).',
      widget: { type: 'order_line', props: { items: [{ label: 'Vijdon erkinligi qonuni' }, { label: 'Din ishlari qoʻmitasi' }, { label: 'Toshkent Islom universiteti' }, { label: '«Islom madaniyati poytaxti»' }] } }
    },
    {
      id: 't9q2',
      prompt: 'Oʻzbekistonda nechta diniy konfessiya faoliyat yuritadi?',
      hint: 'Ikki xonali son.',
      explanation: '16 ta.',
      widget: { type: 'number_answer', props: { answer: 16, unit: 'ta' } }
    },
    {
      id: 't9q3',
      prompt: 'Konstitutsiyaning 31-moddasi nimani kafolatlaydi?',
      hint: 'Vijdon.',
      explanation: 'Vijdon erkinligini: har kim xohlagan dinga eʼtiqod qilishi yoki qilmasligi mumkin.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['saylov huquqini', 'vijdon erkinligini', 'mulk huquqini', 'taʼlim olishni'], answerIndex: 1 } }
    },
    {
      id: 't9q4',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Konfessiya — eʼtiqod.',
      explanation: 'Konfessiya — diniy eʼtiqod, mazhab; prozelitizm — boshqa dindagilarni oʻz diniga oʻtkazishga urinish; tolerantlik — bagʻrikenglik.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'konfessiya', right: 'diniy eʼtiqod, mazhab' },
            { left: 'prozelitizm', right: 'boshqa dinga oʻtkazishga urinish' },
            { left: 'tolerantlik', right: 'bagʻrikenglik' }
          ]
        }
      }
    },
    {
      id: 't9q5',
      prompt: 'Qonunga koʻra taqiqlangan harakatlarni tanlang.',
      hint: 'Majburlash.',
      explanation: 'Dinni majburan singdirish, prozelitizm va missionerlik taqiqlangan.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'dinni majburan singdirish', correct: true },
            { label: 'prozelitizm', correct: true },
            { label: 'missionerlik faoliyati', correct: true },
            { label: 'diniy bayramlarni nishonlash' }
          ]
        }
      }
    },
    {
      id: 't9q6',
      prompt: '2007-yilda Toshkent qanday nomga sazovor boʻldi?',
      hint: 'AYSESKO qarori.',
      explanation: '«Islom madaniyati poytaxti».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Turkiy dunyo poytaxti»', '«Islom madaniyati poytaxti»', '«Yevropa madaniyati poytaxti»', '«Sport poytaxti»'], answerIndex: 1 } }
    },
    {
      id: 't9q7',
      prompt: 'Muassasani joylashgan shahriga ajrating.',
      hint: 'Imom Buxoriy — Samarqand.',
      explanation: 'Imom Buxoriy xalqaro ilmiy-tadqiqot markazi — Samarqand; Islom madaniyati markazi — Toshkent; Minor masjidi — Toshkent.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 's', label: 'Samarqand' },
            { id: 't', label: 'Toshkent' }
          ],
          items: [
            { emoji: '', label: 'Imom Buxoriy markazi', bin: 's' },
            { emoji: '', label: 'Islom madaniyati markazi', bin: 't' },
            { emoji: '', label: 'Minor masjidi', bin: 't' },
            { emoji: '', label: 'Islom universiteti', bin: 't' }
          ]
        }
      }
    },
    {
      id: 't9q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Din va davlat.',
      explanation: 'Din davlatdan ajratilgan, lekin xalqdan ajratilmagan; sovet davrida masjidlar juda kam edi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻzbekistonda din davlatdan ajratilgan.', value: true },
            { text: 'Sovet davrida masjidlar soni juda kam boʻlgan.', value: true },
            { text: 'Qonun missionerlik faoliyatini ragʻbatlantiradi.', value: false },
            { text: 'Oʻzbekistonda faqat bitta din faoliyat yuritadi.', value: false }
          ]
        }
      }
    }
  ]
};
