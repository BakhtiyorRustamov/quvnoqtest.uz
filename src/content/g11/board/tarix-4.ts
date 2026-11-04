import type { BoardLesson } from './types';
import { UZ2 } from './tarix-3';

/** Darslik: Oʻzbekiston tarixi 11, 4-mavzu (30–34-betlar) — «Kuchli davlatdan kuchli jamiyat sari», 2010-yilgi Konsepsiya, xalq bilan muloqot, 2017–2021-yillar Harakatlar strategiyasi. */
export const TARIX_4: BoardLesson = {
  n: 4,
  label: '4',
  group: UZ2,
  title: 'Fuqarolik jamiyati rivojlanishining bosqichlari',
  section: 'Oʻzbekiston tarixi, 4-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "2000-yillardan boshlab asosiy shior «Kuchli davlatdan — kuchli jamiyat sari» boʻldi: davlat vazifalarining bir qismi asta-sekin jamiyatga, nodavlat tashkilotlarga oʻtishi kerak edi. 2010-yil noyabrda Islom Karimov olti qismdan iborat Konsepsiyani eʼlon qildi: hokimiyatni demokratlashtirish, sud tizimi, soʻz erkinligi, saylov qonunchiligi, fuqarolik jamiyati va bozor iqtisodiyoti. Bugun mamlakatda 9 mingdan ortiq nodavlat notijorat tashkiloti ishlaydi.",
      easy: "Shior: «Kuchli davlatdan — kuchli jamiyat sari»; 2010 — olti qismli Konsepsiya.",
      draw: [
        { t: 'title', text: 'Kuchli jamiyat sari' },
        { t: 'box', id: 'd', x: 6, y: 26, w: 36, h: 10, text: 'kuchli davlat', color: 'blue' },
        { t: 'box', id: 'j', x: 58, y: 26, w: 36, h: 10, text: 'kuchli jamiyat', color: 'green' },
        { t: 'arrow', from: 'd', to: 'j' },
        { t: 'text', x: 6, y: 50, text: '9 mingdan ortiq nodavlat tashkilot', size: 's', color: 'purple' }
      ],
      next: 'Xalq bilan muloqot'
    },
    {
      kind: 'explain',
      clear: true,
      say: "2016-yil sentabrda Bosh vazirning virtual qabulxonasi ochildi — odamlar murojaatini internet orqali yubora boshladi. 2016-yil dekabrdagi farmon bilan barcha hududlarda Xalq qabulxonalari tuzildi. 2017-yil «Xalq bilan muloqot va inson manfaatlari yili» deb eʼlon qilindi. 2017-yil 7-fevralda 2017–2021-yillar uchun beshta ustuvor yoʻnalishdan iborat Harakatlar strategiyasi tasdiqlandi: davlat qurilishi, qonun ustuvorligi va sud, iqtisodiyot, ijtimoiy soha, xavfsizlik va tashqi siyosat.",
      easy: "2016 — virtual va Xalq qabulxonalari; 2017 — 5 yoʻnalishli Harakatlar strategiyasi.",
      draw: [
        { t: 'title', text: 'Xalq bilan muloqot' },
        { t: 'table', x: 4, y: 18, rows: [['sana', 'voqea'], ['2010-yil noyabr', 'olti qismli Konsepsiya'], ['2016-yil sentabr', 'virtual qabulxona'], ['2016-yil dekabr', 'Xalq qabulxonalari'], ['2017-yil 7-fevral', 'Harakatlar strategiyasi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '2000-yillardagi asosiy shior — «Kuchli davlatdan — kuchli jamiyat sari»; davlat vazifalarining bir qismi jamiyatga oʻtadi.',
    '2010-yil noyabrdagi Konsepsiya olti qismdan iborat; mamlakatda 9 mingdan ortiq nodavlat notijorat tashkiloti ishlaydi.',
    '2016-yilda virtual va Xalq qabulxonalari ochildi; 2017-yil 7-fevralda 2017–2021-yillar uchun beshta ustuvor yoʻnalishli Harakatlar strategiyasi tasdiqlandi.'
  ],
  questions: [
    {
      id: 't4q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Konsepsiya — eng oldin.',
      explanation: 'Konsepsiya (2010) → virtual qabulxona (2016-yil sentabr) → Xalq qabulxonalari (2016-yil dekabr) → Harakatlar strategiyasi (2017-yil fevral).',
      widget: { type: 'order_line', props: { items: [{ label: 'olti qismli Konsepsiya' }, { label: 'virtual qabulxona' }, { label: 'Xalq qabulxonalari' }, { label: 'Harakatlar strategiyasi' }] } }
    },
    {
      id: 't4q2',
      prompt: 'Harakatlar strategiyasida nechta ustuvor yoʻnalish bor?',
      hint: 'Har biri oʻz rangiga ega.',
      explanation: '5 ta ustuvor yoʻnalish.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'ta' } }
    },
    {
      id: 't4q3',
      prompt: 'Harakatlar strategiyasining yoʻnalishlarini tanlang.',
      hint: 'Beshtadan toʻrttasi berilgan.',
      explanation: 'Davlat va jamiyat qurilishi, qonun ustuvorligi va sud, iqtisodiyot, ijtimoiy soha, xavfsizlik va tashqi siyosat.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'qonun ustuvorligi va sud-huquq tizimi', correct: true },
            { label: 'iqtisodiyotni rivojlantirish', correct: true },
            { label: 'ijtimoiy sohani rivojlantirish', correct: true },
            { label: 'xavfsizlik va tashqi siyosat', correct: true },
            { label: 'kosmosni oʻzlashtirish' }
          ]
        }
      }
    },
    {
      id: 't4q4',
      prompt: '2017-yil qanday nom bilan eʼlon qilingan?',
      hint: 'Muloqot.',
      explanation: '«Xalq bilan muloqot va inson manfaatlari yili».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Sogʻlom ona va bola yili»', '«Xalq bilan muloqot va inson manfaatlari yili»', '«Yoshlar yili»', '«Faol tadbirkorlik yili»'], answerIndex: 1 } }
    },
    {
      id: 't4q5',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Shior.',
      explanation: '«Kuchli davlatdan — kuchli jamiyat sari».',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: '«Kuchli ' }, { blank: 'davlatdan' }, { text: ' — kuchli ' }, { blank: 'jamiyat' }, { text: ' sari».' }],
          bank: ['davlatdan', 'jamiyat', 'iqtisod', 'armiya']
        }
      }
    },
    {
      id: 't4q6',
      prompt: '2010-yilgi Konsepsiya nechta qismdan iborat?',
      hint: 'Hokimiyat, sud, axborot, saylov, jamiyat, iqtisod.',
      explanation: '6 qism.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['3', '5', '6', '9'], answerIndex: 2 } }
    },
    {
      id: 't4q7',
      prompt: 'Sanani voqea bilan juftlang.',
      hint: 'Strategiya — fevralda.',
      explanation: '2010-yil noyabr — Konsepsiya; 2016-yil sentabr — virtual qabulxona; 2017-yil 7-fevral — Harakatlar strategiyasi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '2010-yil noyabr', right: 'Konsepsiya' },
            { left: '2016-yil sentabr', right: 'virtual qabulxona' },
            { left: '2017-yil 7-fevral', right: 'Harakatlar strategiyasi' }
          ]
        }
      }
    },
    {
      id: 't4q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Qabulxonalar hamma hududda.',
      explanation: 'Xalq qabulxonalari barcha hududlarda tuzildi; Harakatlar strategiyasi 2017–2021-yillarga moʻljallangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Xalq qabulxonalari barcha hududlarda tashkil etilgan.', value: true },
            { text: 'Harakatlar strategiyasi 2017–2021-yillarga moʻljallangan.', value: true },
            { text: 'Virtual qabulxona 2000-yilda ochilgan.', value: false },
            { text: 'Mamlakatda nodavlat tashkilotlar yoʻq.', value: false }
          ]
        }
      }
    }
  ]
};
