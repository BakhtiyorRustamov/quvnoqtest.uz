import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Takrorlash (savollar): darslik, 2-bob (3–23-mavzular). */
export const BIO_46: BoardLesson = {
  n: 46,
  label: '3–23',
  group: BOB2,
  title: 'Bobni takrorlash: ekosistema darajasi',
  section: '2-bob, 3–23',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r2b1',
      prompt: 'Organizmni funksional guruhiga ajrating.',
      hint: 'Zamburugʻ — parchalovchi.',
      explanation: 'Produtsent: qayin, fitoplankton. Konsument: boʻri, chigirtka. Redutsent: chirituvchi bakteriya, mogʻor zamburugʻi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'p', label: 'Produtsent' },
            { id: 'c', label: 'Konsument' },
            { id: 'r', label: 'Redutsent' }
          ],
          items: [
            { emoji: '', label: 'qayin', bin: 'p' },
            { emoji: '', label: 'fitoplankton', bin: 'p' },
            { emoji: '', label: 'boʻri', bin: 'c' },
            { emoji: '', label: 'chigirtka', bin: 'c' },
            { emoji: '', label: 'chirituvchi bakteriya', bin: 'r' },
            { emoji: '', label: 'mogʻor zamburugʻi', bin: 'r' }
          ]
        }
      }
    },
    {
      id: 'r2b2',
      prompt: 'Oʻt → quyon → tulki zanjirida tulkilar biomassasi 50 kg. «10 % qoidasi» boʻyicha qancha oʻt kerak?',
      hint: '50 · 10 · 10.',
      explanation: 'Quyon 500 kg, oʻt 5000 kg.',
      widget: { type: 'number_answer', props: { answer: 5000, unit: 'kg' } }
    },
    {
      id: 'r2b3',
      prompt: 'Munosabatni belgisi bilan juftlang.',
      hint: 'Raqobat — ikkalasiga zarar.',
      explanation: 'Mutualizm (+ +), kommensalizm (+ 0), parazitizm (+ −), raqobat (− −).',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'mutualizm', right: '+ +' },
            { left: 'kommensalizm', right: '+ 0' },
            { left: 'parazitizm', right: '+ −' },
            { left: 'raqobat', right: '− −' }
          ]
        }
      }
    },
    {
      id: 'r2b4',
      prompt: 'Libixning minimum qonuni nimani bildiradi?',
      hint: 'Bochkaning eng past taxtasi.',
      explanation: 'Organizm hayotini optimumdan eng koʻp ogʻgan omil — cheklovchi omil belgilaydi.',
      widget: {
        type: 'mcq',
        props: { prompt: '', choices: ['eng koʻp omil hal qiladi', 'optimumdan eng koʻp ogʻgan omil cheklaydi', 'barcha omillar teng', 'faqat harorat muhim'], answerIndex: 1 }
      }
    },
    {
      id: 'r2b5',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Energiya piramidasi — doim toʻgʻri.',
      explanation: 'Energiya piramidasi teskari boʻlmaydi; ikkilamchi suksessiya tezroq; sunʼiy ekosistemalar oʻzini boshqarmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ikkilamchi suksessiya birlamchidan tezroq kechadi.', value: true },
            { text: 'Gomoyoterm hayvonlar tana haroratini doimiy saqlaydi.', value: true },
            { text: 'Energiya piramidasi teskari boʻlishi mumkin.', value: false },
            { text: 'Agroekosistema oʻzini oʻzi tiklay oladi.', value: false }
          ]
        }
      }
    }
  ]
};
