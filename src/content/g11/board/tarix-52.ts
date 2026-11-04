import type { BoardLesson } from './types';
import { UZ2 } from './tarix-3';

/** Takrorlash (savollar): Oʻzbekiston tarixi, II bob (3–4-mavzular). */
export const TARIX_52: BoardLesson = {
  n: 52,
  label: '3–4',
  group: UZ2,
  title: 'Bobni takrorlash: fuqarolik jamiyati',
  section: 'Oʻzbekiston tarixi, II bob, 3–4',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'ru2q1',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Oqsoqol — mahallada.',
      explanation: 'Hokim — joylardagi ijro hokimiyati rahbari; oqsoqol — fuqarolar yigʻini raisi; koʻppartiyaviylik — bir necha partiya faoliyati.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'hokim', right: 'joylardagi ijro rahbari' },
            { left: 'oqsoqol', right: 'fuqarolar yigʻini raisi' },
            { left: 'koʻppartiyaviylik', right: 'bir necha partiya faoliyati' }
          ]
        }
      }
    },
    {
      id: 'ru2q2',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Hokimlik — 1992.',
      explanation: 'Hokimlik joriy etildi (1992) → OʻzLiDeP (2003) → Konsepsiya (2010) → Harakatlar strategiyasi (2017).',
      widget: { type: 'order_line', props: { items: [{ label: 'hokimlik lavozimi joriy etildi' }, { label: 'OʻzLiDeP tuzildi' }, { label: 'olti qismli Konsepsiya' }, { label: 'Harakatlar strategiyasi' }] } }
    },
    {
      id: 'ru2q3',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Saylov yoshi — 18.',
      explanation: 'Ovoz berish 18 yoshdan; Harakatlar strategiyasi 5 yoʻnalishdan iborat; ilk partiya — XDP.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Saylovda 18 yoshdan ovoz berish mumkin.', value: true },
            { text: 'Harakatlar strategiyasi 5 yoʻnalishdan iborat.', value: true },
            { text: 'Mustaqillik davridagi ilk partiya — OʻzLiDeP.', value: false }
          ]
        }
      }
    }
  ]
};
