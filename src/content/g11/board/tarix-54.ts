import type { BoardLesson } from './types';
import { UZ4 } from './tarix-8';

/** Takrorlash (savollar): Oʻzbekiston tarixi, IV bob (8–9-mavzular). */
export const TARIX_54: BoardLesson = {
  n: 54,
  label: '8–9',
  group: UZ4,
  title: 'Bobni takrorlash: millatlar va dinlar',
  section: 'Oʻzbekiston tarixi, IV bob, 8–9',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'ru4q1',
      prompt: 'Sonni maʼlumot bilan juftlang.',
      hint: '16 — konfessiyalar.',
      explanation: '130 dan ortiq — millatlar; 138 — milliy-madaniy markazlar; 16 — diniy konfessiyalar.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '130 dan ortiq', right: 'millat va elatlar' },
            { left: '138', right: 'milliy-madaniy markazlar' },
            { left: '16', right: 'diniy konfessiyalar' }
          ]
        }
      }
    },
    {
      id: 'ru4q2',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: '1991 dan boshlang.',
      explanation: 'Vijdon erkinligi qonuni (1991) → Baynalmilal madaniyat markazi (1992) → «Islom madaniyati poytaxti» (2007) → Millatlararo munosabatlar qoʻmitasi (2017).',
      widget: { type: 'order_line', props: { items: [{ label: 'Vijdon erkinligi qonuni' }, { label: 'Baynalmilal madaniyat markazi' }, { label: '«Islom madaniyati poytaxti»' }, { label: 'Millatlararo munosabatlar qoʻmitasi' }] } }
    },
    {
      id: 'ru4q3',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Bagʻrikenglik kuni — 16-noyabr.',
      explanation: 'Xalqaro bagʻrikenglik kuni 16-noyabrda; vijdon erkinligi Konstitutsiyada kafolatlangan; taʼlim 7 tilda olib boriladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Xalqaro bagʻrikenglik kuni 16-noyabrda nishonlanadi.', value: true },
            { text: 'Vijdon erkinligi Konstitutsiyada kafolatlangan.', value: true },
            { text: 'Oʻzbekistonda taʼlim faqat bitta tilda olib boriladi.', value: false }
          ]
        }
      }
    }
  ]
};
