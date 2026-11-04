import type { BoardLesson } from './types';
import { JH1 } from './tarix-101';

/** Takrorlash (savollar): Jahon tarixi, I bob (1–3-mavzular). */
export const TARIX_151: BoardLesson = {
  n: 151,
  label: '1–3',
  group: JH1,
  title: 'Bobni takrorlash: dunyo XX asr oxirida',
  section: 'Jahon tarixi, I bob, 1–3',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'rj1q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Devor — 1989.',
      explanation: 'Berlin devori quladi (1989) → Germaniya birlashdi (1990) → SSSR tarqaldi, MDH tuzildi (1991) → Chexiya va Slovakiya ajraldi (1993).',
      widget: { type: 'order_line', props: { items: [{ label: 'Berlin devori quladi' }, { label: 'Germaniya birlashdi' }, { label: 'SSSR tarqaldi, MDH tuzildi' }, { label: 'Chexiya va Slovakiya ajraldi' }] } }
    },
    {
      id: 'rj1q2',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: '«Rangli inqilob» — norozilik namoyishlari.',
      explanation: 'Ikki qutbli dunyo — ikki blok qarama-qarshiligi; «rangli inqilob» — namoyishlar natijasida hokimiyat almashinuvi; etnik mojaro — turli etnik guruhlar toʻqnashuvi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'ikki qutbli dunyo', right: 'ikki blok qarama-qarshiligi' },
            { left: '«rangli inqilob»', right: 'namoyishlar orqali hokimiyat almashinuvi' },
            { left: 'etnik mojaro', right: 'etnik guruhlar toʻqnashuvi' }
          ]
        }
      }
    },
    {
      id: 'rj1q3',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'G-20 — 80 %.',
      explanation: 'G-20 jahon YIMning 80 % ini beradi; MDH 1991-yil dekabrda tuzilgan; Yugoslaviya mojarolar bilan tarqalgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'G-20 mamlakatlari jahon YIMning 80 % ini beradi.', value: true },
            { text: 'MDH 1991-yil dekabrda tuzilgan.', value: true },
            { text: 'Yugoslaviya hech qanday mojarosiz boʻlingan.', value: false }
          ]
        }
      }
    }
  ]
};
