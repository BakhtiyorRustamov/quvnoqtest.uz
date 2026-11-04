import type { BoardLesson } from './types';
import { UZ1 } from './tarix-1';

/** Takrorlash (savollar): Oʻzbekiston tarixi, I bob (1–2-mavzular). */
export const TARIX_51: BoardLesson = {
  n: 51,
  label: '1–2',
  group: UZ1,
  title: 'Bobni takrorlash: mustaqillik va davlatchilik',
  section: 'Oʻzbekiston tarixi, I bob, 1–2',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'ru1q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Prezidentlik lavozimi — mustaqillikdan oldin.',
      explanation: 'Prezidentlik lavozimi (1990-yil mart) → Deklaratsiya (1990-yil iyun) → mustaqillik eʼloni (1991-yil avgust) → Konstitutsiya (1992-yil dekabr).',
      widget: { type: 'order_line', props: { items: [{ label: 'prezidentlik lavozimi joriy etildi' }, { label: 'Mustaqillik Deklaratsiyasi' }, { label: 'mustaqillik eʼlon qilindi' }, { label: 'Konstitutsiya qabul qilindi' }] } }
    },
    {
      id: 'ru1q2',
      prompt: 'Bayramni sanasi bilan juftlang.',
      hint: 'Konstitutsiya kuni — dekabrda.',
      explanation: 'Mustaqillik kuni — 1-sentabr; Konstitutsiya kuni — 8-dekabr; Vatan himoyachilari kuni — 14-yanvar.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Mustaqillik kuni', right: '1-sentabr' },
            { left: 'Konstitutsiya kuni', right: '8-dekabr' },
            { left: 'Vatan himoyachilari kuni', right: '14-yanvar' }
          ]
        }
      }
    },
    {
      id: 'ru1q3',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Qonunchilik palatasi — 150 deputat.',
      explanation: 'Qonunchilik palatasida 150 deputat bor; ikki palatali parlament 2005-yildan ishlaydi; madhiya 1992-yilda qabul qilingan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qonunchilik palatasida 150 deputat bor.', value: true },
            { text: 'Ikki palatali parlament 2005-yildan ishlaydi.', value: true },
            { text: 'Davlat madhiyasi 1990-yilda qabul qilingan.', value: false }
          ]
        }
      }
    }
  ]
};
