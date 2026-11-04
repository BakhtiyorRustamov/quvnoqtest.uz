import type { BoardLesson } from './types';
import { UZ5 } from './tarix-10';

/** Takrorlash (savollar): Oʻzbekiston tarixi, V bob (10–11-mavzular). */
export const TARIX_55: BoardLesson = {
  n: 55,
  label: '10–11',
  group: UZ5,
  title: 'Bobni takrorlash: taʼlim islohotlari',
  section: 'Oʻzbekiston tarixi, V bob, 10–11',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'ru5q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Avval qonun.',
      explanation: 'Taʼlim qonuni (1992) → test orqali qabul (1994) → Kadrlar tayyorlash milliy dasturi (1997) → 11 yillik maktabga qaytish (2017).',
      widget: { type: 'order_line', props: { items: [{ label: '«Taʼlim toʻgʻrisida»gi qonun' }, { label: 'test orqali qabul' }, { label: 'Kadrlar tayyorlash milliy dasturi' }, { label: '11 yillik maktabga qaytish' }] } }
    },
    {
      id: 'ru5q2',
      prompt: 'Taʼlim bosqichini davomiyligi bilan juftlang.',
      hint: 'Magistratura — eng qisqa.',
      explanation: 'Umumiy oʻrta maktab (hozir) — 11 yil; bakalavriat — 4 yil; magistratura — 2 yil.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'umumiy oʻrta maktab', right: '11 yil' },
            { left: 'bakalavriat', right: '4 yil' },
            { left: 'magistratura', right: '2 yil' }
          ]
        }
      }
    },
    {
      id: 'ru5q3',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '1-oktabr.',
      explanation: '1-oktabr — Oʻqituvchilar va murabbiylar kuni; 2009-yildan 12 yillik majburiy taʼlim joriy etilgan edi; PhD va DSc 2017-yildan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1-oktabr — Oʻqituvchilar va murabbiylar kuni.', value: true },
            { text: '2009-yildan 12 yillik majburiy taʼlim joriy etilgan.', value: true },
            { text: 'PhD va DSc darajalari 1992-yilda joriy etilgan.', value: false }
          ]
        }
      }
    }
  ]
};
