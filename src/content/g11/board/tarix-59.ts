import type { BoardLesson } from './types';
import { UZ9 } from './tarix-21';

/** Takrorlash (savollar): Oʻzbekiston tarixi, IX bob (21–22-mavzular). */
export const TARIX_59: BoardLesson = {
  n: 59,
  label: '21–22',
  group: UZ9,
  title: 'Bobni takrorlash: koʻp tomonlama hamkorlik',
  section: 'Oʻzbekiston tarixi, IX bob, 21–22',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'ru9q1',
      prompt: 'Tashkilotni Oʻzbekiston aʼzo boʻlgan yil bilan juftlang.',
      hint: 'MDH — 1991.',
      explanation: 'MDH — 1991; BMT — 1992; YuNESKO — 1993; ShHT — 2001.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'MDH', right: '1991' },
            { left: 'BMT', right: '1992' },
            { left: 'YuNESKO', right: '1993' },
            { left: 'ShHT', right: '2001' }
          ]
        }
      }
    },
    {
      id: 'ru9q2',
      prompt: 'Tashabbusni maqsadi bilan juftlang.',
      hint: '«6+2» — Afgʻoniston.',
      explanation: '«6+2» guruhi — Afgʻonistonda tinchlik; Orolni qutqarish jamgʻarmasi — ekologiya; yadrosiz zona — xavfsizlik.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: '«6+2» guruhi' }, b: { label: 'Afgʻonistonda tinchlik' } },
            { a: { label: 'Orolni qutqarish jamgʻarmasi' }, b: { label: 'ekologiya' } },
            { a: { label: 'yadrosiz zona' }, b: { label: 'xavfsizlik' } }
          ]
        }
      }
    },
    {
      id: 'ru9q3',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'ShHT — Pekin.',
      explanation: 'ShHT shtab-kvartirasi Pekinda; Oʻzbekiston 1992-yilda BMTga aʼzo boʻlgan; MDH Minskda tuzilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'ShHTning shtab-kvartirasi Pekinda joylashgan.', value: true },
            { text: 'Oʻzbekiston 1992-yilda BMTga aʼzo boʻlgan.', value: true },
            { text: 'MDHga Toshkentda asos solingan.', value: false }
          ]
        }
      }
    }
  ]
};
