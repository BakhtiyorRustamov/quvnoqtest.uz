import type { BoardLesson } from './types';
import { UZ7 } from './tarix-15';

/** Takrorlash (savollar): Oʻzbekiston tarixi, VII bob (15–16-mavzular). */
export const TARIX_57: BoardLesson = {
  n: 57,
  label: '15–16',
  group: UZ7,
  title: 'Bobni takrorlash: maʼnaviyat va madaniyat',
  section: 'Oʻzbekiston tarixi, VII bob, 15–16',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'ru7q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Navoiy yubileyi — 1991.',
      explanation: 'Navoiy yubileyi (1991) → Amir Temur yili (1996) → Shashmaqom YuNESKOda (2008) → palov YuNESKOda (2016).',
      widget: { type: 'order_line', props: { items: [{ label: 'Navoiyning 550 yilligi' }, { label: 'Amir Temur yili' }, { label: 'Shashmaqom YuNESKO roʻyxatida' }, { label: 'palov YuNESKO roʻyxatida' }] } }
    },
    {
      id: 'ru7q2',
      prompt: 'Merosni turiga ajrating.',
      hint: 'Nomoddiy — urf-odat, sanʼat.',
      explanation: 'Nomoddiy meros: Shashmaqom, Askiya, Navroʻz. Moddiy obidalar: Registon, Temuriylar muzeyi binosi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'n', label: 'Nomoddiy meros' },
            { id: 'm', label: 'Moddiy obida' }
          ],
          items: [
            { emoji: '', label: 'Shashmaqom', bin: 'n' },
            { emoji: '', label: 'Askiya', bin: 'n' },
            { emoji: '', label: 'Navroʻz', bin: 'n' },
            { emoji: '', label: 'Registon ansambli', bin: 'm' },
            { emoji: '', label: 'Temuriylar tarixi muzeyi binosi', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'ru7q3',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '21-mart.',
      explanation: 'Navroʻz 21-martda nishonlanadi; «Sharq taronalari» Samarqandda oʻtadi; 9-may — Xotira va qadrlash kuni.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Navroʻz 21-martda nishonlanadi.', value: true },
            { text: '«Sharq taronalari» festivali Samarqandda oʻtkaziladi.', value: true },
            { text: '9-may — Mustaqillik kuni.', value: false }
          ]
        }
      }
    }
  ]
};
