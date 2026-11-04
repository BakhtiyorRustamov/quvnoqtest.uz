import type { BoardLesson } from './types';
import { BOB1 } from './biologiya-1';

/** Takrorlash (savollar): darslik, 1-bob (1–2-mavzular). */
export const BIO_45: BoardLesson = {
  n: 45,
  label: '1–2',
  group: BOB1,
  title: 'Bobni takrorlash: ekologiya va hayot',
  section: '1-bob, 1–2',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r1b1',
      prompt: 'Qaysi biri hayotning eng yuqori darajasi?',
      hint: 'Butun Yer qobigʻi.',
      explanation: 'Biosfera — barcha biogeotsenozlarni qamrab oladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['populatsiya', 'biogeotsenoz', 'biosfera', 'organizm'], answerIndex: 2 } }
    },
    {
      id: 'r1b2',
      prompt: 'Obyektni tuzilish darajasi bilan ajrating.',
      hint: 'Yurak — organ, organizm qismi.',
      explanation: 'Hujayra darajasi: xloroplast, yadro. Organizm: amyoba, quyon. Populatsiya: delfinlar toʻdasi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'h', label: 'Hujayra' },
            { id: 'o', label: 'Organizm' },
            { id: 'p', label: 'Populatsiya' }
          ],
          items: [
            { emoji: '', label: 'xloroplast', bin: 'h' },
            { emoji: '', label: 'yadro', bin: 'h' },
            { emoji: '', label: 'quyon', bin: 'o' },
            { emoji: '', label: 'amyoba', bin: 'o' },
            { emoji: '', label: 'delfinlar toʻdasi', bin: 'p' }
          ]
        }
      }
    },
    {
      id: 'r1b3',
      prompt: 'Jamoalar ekologiyasi qanday ataladi?',
      hint: 'Sin- — birga.',
      explanation: 'Sinekologiya.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['autekologiya', 'sinekologiya', 'demekologiya', 'global ekologiya'], answerIndex: 1 } }
    },
    {
      id: 'r1b4',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oikos — uy.',
      explanation: '«Ekologiya» — uy haqidagi fan; Tensli — ekotizim konsepsiyasi muallifi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Oikos» soʻzi «uy, boshpana» degan maʼnoni bildiradi.', value: true },
            { text: 'Ekotizim konsepsiyasini A. Tensli shakllantirgan.', value: true },
            { text: 'Akvarium — dala metodiga misol.', value: false }
          ]
        }
      }
    }
  ]
};
