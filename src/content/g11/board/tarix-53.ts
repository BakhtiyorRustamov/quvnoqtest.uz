import type { BoardLesson } from './types';
import { UZ3 } from './tarix-5';

/** Takrorlash (savollar): Oʻzbekiston tarixi, III bob (5–7-mavzular). */
export const TARIX_53: BoardLesson = {
  n: 53,
  label: '5–7',
  group: UZ3,
  title: 'Bobni takrorlash: iqtisodiyot va ijtimoiy siyosat',
  section: 'Oʻzbekiston tarixi, III bob, 5–7',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'ru3q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Soʻm — eng oldin.',
      explanation: 'Soʻm (1994) → Asaka avtozavodi (1996) → «Navoiy» erkin zonasi (2008) → valuta erkin almashtirilishi (2017).',
      widget: { type: 'order_line', props: { items: [{ label: 'milliy valuta soʻm' }, { label: 'Asaka avtomobil zavodi' }, { label: '«Navoiy» erkin zonasi' }, { label: 'valuta erkin almashtirildi' }] } }
    },
    {
      id: 'ru3q2',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Zona — imtiyozli hudud.',
      explanation: 'Xususiylashtirish — davlat mulkini xususiy mulkka aylantirish; erkin iqtisodiy zona — imtiyozli hudud; konvertatsiya — valutani erkin almashtirish.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'xususiylashtirish', right: 'davlat mulkini xususiyga aylantirish' },
            { left: 'erkin iqtisodiy zona', right: 'soliq imtiyozli hudud' },
            { left: 'konvertatsiya', right: 'valutani erkin almashtirish' }
          ]
        }
      }
    },
    {
      id: 'ru3q3',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '«Oʻzbek modeli» — 5 tamoyil.',
      explanation: '«Oʻzbek modeli» besh tamoyildan iborat; oʻrtacha umr 74 yoshga yetdi; soʻm 1994-yilda kiritilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Oʻzbek modeli» besh tamoyilga asoslangan.', value: true },
            { text: '2015-yilda oʻrtacha umr 74 yoshga yetgan.', value: true },
            { text: 'Milliy valuta soʻm 1991-yilda muomalaga kiritilgan.', value: false },
            { text: 'Erkin iqtisodiy zonalarda soliqlar oshiriladi.', value: false }
          ]
        }
      }
    }
  ]
};
