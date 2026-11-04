import type { BoardLesson } from './types';
import { UZ6 } from './tarix-12';

/** Takrorlash (savollar): Oʻzbekiston tarixi, VI bob (12–14-mavzular). */
export const TARIX_56: BoardLesson = {
  n: 56,
  label: '12–14',
  group: UZ6,
  title: 'Bobni takrorlash: ilm-fan, sport va yoshlar',
  section: 'Oʻzbekiston tarixi, VI bob, 12–14',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'ru6q1',
      prompt: 'Muassasa yoki tashkilotni sohasi bilan ajrating.',
      hint: 'OAK — ilm-fan.',
      explanation: 'Ilm-fan: OAK, Innovatsion rivojlanish vazirligi. Sport: Xalqaro kurash assotsiatsiyasi, Milliy Olimpiya qoʻmitasi. Yoshlar: «Umid» jamgʻarmasi, Yoshlar ittifoqi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'f', label: 'Ilm-fan' },
            { id: 's', label: 'Sport' },
            { id: 'y', label: 'Yoshlar' }
          ],
          items: [
            { emoji: '', label: 'Oliy attestatsiya komissiyasi', bin: 'f' },
            { emoji: '', label: 'Innovatsion rivojlanish vazirligi', bin: 'f' },
            { emoji: '', label: 'Xalqaro kurash assotsiatsiyasi', bin: 's' },
            { emoji: '', label: 'Milliy Olimpiya qoʻmitasi', bin: 's' },
            { emoji: '', label: '«Umid» jamgʻarmasi', bin: 'y' },
            { emoji: '', label: 'Oʻzbekiston yoshlar ittifoqi', bin: 'y' }
          ]
        }
      }
    },
    {
      id: 'ru6q2',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'OAK — 1992.',
      explanation: 'OAK (1992) → Xalqaro kurash assotsiatsiyasi (1998) → kurash Osiyo oʻyinlarida (2003) → Rio-2016.',
      widget: { type: 'order_line', props: { items: [{ label: 'Oliy attestatsiya komissiyasi' }, { label: 'Xalqaro kurash assotsiatsiyasi' }, { label: 'kurash Osiyo oʻyinlari dasturida' }, { label: 'Rio-de-Janeyro Olimpiadasi' }] } }
    },
    {
      id: 'ru6q3',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Yoshlar kuni — 30-iyun.',
      explanation: '30-iyun — Yoshlar kuni; 2017-yilda 32 yangi akademik saylandi; Xorazm Maʼmun akademiyasi 1997-yilda tiklangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '30-iyun — Yoshlar kuni.', value: true },
            { text: '2017-yilda Fanlar akademiyasiga 32 yangi akademik saylangan.', value: true },
            { text: 'Xorazm Maʼmun akademiyasi 2017-yilda tiklangan.', value: false }
          ]
        }
      }
    }
  ]
};
