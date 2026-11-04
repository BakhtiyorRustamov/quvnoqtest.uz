import type { BoardLesson } from './types';
import { UZ8 } from './tarix-17';

/** Takrorlash (savollar): Oʻzbekiston tarixi, VIII bob (17–20-mavzular). */
export const TARIX_58: BoardLesson = {
  n: 58,
  label: '17–20',
  group: UZ8,
  title: 'Bobni takrorlash: tashqi siyosat',
  section: 'Oʻzbekiston tarixi, VIII bob, 17–20',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'ru8q1',
      prompt: 'Davlatni hamkorlik dalili bilan juftlang.',
      hint: 'Navoiy haykali — Yaponiya.',
      explanation: 'Turkmaniston — 2017-yilgi ilk xorijiy tashrif; Xitoy — 23 mlrd $ lik hujjatlar; Yaponiya — Tokioda Navoiy haykali; Qozogʻiston — abadiy doʻstlik shartnomasi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Turkmaniston', right: '2017-yilgi ilk xorijiy tashrif' },
            { left: 'Xitoy', right: '23 mlrd $ lik hujjatlar' },
            { left: 'Yaponiya', right: 'Tokioda Navoiy haykali' },
            { left: 'Qozogʻiston', right: 'abadiy doʻstlik shartnomasi' }
          ]
        }
      }
    },
    {
      id: 'ru8q2',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: '1993 — hamdoʻstlik.',
      explanation: 'Markaziy Osiyo hamdoʻstligi (1993) → tashqi siyosat prinsiplari qonuni (1996) → Rossiya bilan strategik sheriklik (2004) → Tashqi siyosiy faoliyat konsepsiyasi (2012).',
      widget: { type: 'order_line', props: { items: [{ label: 'Markaziy Osiyo hamdoʻstligi' }, { label: 'tashqi siyosat prinsiplari qonuni' }, { label: 'Rossiya bilan strategik sheriklik' }, { label: 'Tashqi siyosiy faoliyat konsepsiyasi' }] } }
    },
    {
      id: 'ru8q3',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '133 davlat.',
      explanation: 'Oʻzbekiston 133 davlat bilan diplomatik munosabat oʻrnatgan; harbiy bloklarga qoʻshilmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻzbekiston 133 davlat bilan diplomatik munosabat oʻrnatgan.', value: true },
            { text: 'Oʻzbekiston harbiy-siyosiy bloklarga qoʻshilmaydi.', value: true },
            { text: 'Oʻzbekiston dengiz bilan chegaradosh.', value: false }
          ]
        }
      }
    }
  ]
};
