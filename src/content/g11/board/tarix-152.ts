import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Takrorlash (savollar): Jahon tarixi, II bob (4–26-mavzular). */
export const TARIX_152: BoardLesson = {
  n: 152,
  label: '4–26',
  group: JH2,
  title: 'Bobni takrorlash: 1991–2017-yillarda dunyo mamlakatlari',
  section: 'Jahon tarixi, II bob, 4–26',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'rj2q1',
      prompt: 'Rahbarni davlati bilan juftlang.',
      hint: 'Merkel — Germaniya.',
      explanation: 'A. Merkel — Germaniya; Den Syaopin — Xitoy; N. Nazarboyev — Qozogʻiston; E. Bler — Buyuk Britaniya; N. Modi — Hindiston.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'A. Merkel', right: 'Germaniya' },
            { left: 'Den Syaopin', right: 'Xitoy' },
            { left: 'N. Nazarboyev', right: 'Qozogʻiston' },
            { left: 'E. Bler', right: 'Buyuk Britaniya' },
            { left: 'N. Modi', right: 'Hindiston' }
          ]
        }
      }
    },
    {
      id: 'rj2q2',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: '«Sahrodagi boʻron» — 1991.',
      explanation: '«Sahrodagi boʻron» (1991) → Yevrotunnel ochildi (1994) → Xitoy JSTga kirdi (2001) → Britaniyada YI referendumi (2016).',
      widget: { type: 'order_line', props: { items: [{ label: '«Sahrodagi boʻron»' }, { label: 'Yevrotunnel ochildi' }, { label: 'Xitoy JSTga kirdi' }, { label: 'Britaniyada YI referendumi' }] } }
    },
    {
      id: 'rj2q3',
      prompt: 'Hodisani nomi bilan juftlang.',
      hint: 'Gruziya — atirgul.',
      explanation: 'Gruziya, 2003 — «Atirgullar inqilobi»; Qirgʻiziston, 2005 — «Lolalar inqilobi»; Italiya, 1992 — «Halol qoʻllar»; arab mamlakatlari, 2011 — «Arab bahori».',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Gruziya, 2003', right: '«Atirgullar inqilobi»' },
            { left: 'Qirgʻiziston, 2005', right: '«Lolalar inqilobi»' },
            { left: 'Italiya, 1992', right: '«Halol qoʻllar»' },
            { left: 'arab mamlakatlari, 2011', right: '«Arab bahori»' }
          ]
        }
      }
    },
    {
      id: 'rj2q4',
      prompt: 'BRIKS aʼzolarini tanlang.',
      hint: 'Besh davlat.',
      explanation: 'Braziliya, Rossiya, Hindiston, Xitoy, JAR.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Braziliya', correct: true },
            { label: 'Rossiya', correct: true },
            { label: 'Hindiston', correct: true },
            { label: 'Xitoy', correct: true },
            { label: 'Germaniya' }
          ]
        }
      }
    },
    {
      id: 'rj2q5',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '2004 — Boltiqboʻyi.',
      explanation: 'Boltiqboʻyi davlatlari 2004-yilda NATO va YIga kirgan; 2015-yilda Eron yadroviy kelishuvi imzolangan; Yaponiya YIM boʻyicha 3-oʻrinda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Boltiqboʻyi davlatlari 2004-yilda NATO va YIga aʼzo boʻlgan.', value: true },
            { text: '2015-yilda Eron yadroviy dasturi boʻyicha kelishuv imzolangan.', value: true },
            { text: 'Yaponiya YIM boʻyicha dunyoda birinchi oʻrinda.', value: false },
            { text: 'Argentina 2001-yilda iqtisodiy rekord oʻsishga erishgan.', value: false }
          ]
        }
      }
    }
  ]
};
