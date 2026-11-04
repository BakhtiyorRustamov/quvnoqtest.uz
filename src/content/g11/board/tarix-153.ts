import type { BoardLesson } from './types';
import { JH3 } from './tarix-127';

/** Takrorlash (savollar): Jahon tarixi, III bob (27–29-mavzular). */
export const TARIX_153: BoardLesson = {
  n: 153,
  label: '27–29',
  group: JH3,
  title: 'Bobni takrorlash: yangi ming yillik muammolari',
  section: 'Jahon tarixi, III bob, 27–29',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'rj3q1',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Barqaror — kelajakni ham oʻylash.',
      explanation: 'Globallashuv — dunyoning yaqinlashuvi; ekstremizm — taqiqlangan usullar bilan maqsadga erishish; barqaror rivojlanish — kelajak avlodni ham hisobga olgan taraqqiyot; axborot jamiyati — industrialdan keyingi bosqich.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'globallashuv', right: 'dunyoning yaqinlashuvi' },
            { left: 'ekstremizm', right: 'taqiqlangan usullar bilan maqsadga erishish' },
            { left: 'barqaror rivojlanish', right: 'kelajak avlodni ham hisobga olish' },
            { left: 'axborot jamiyati', right: 'industrialdan keyingi bosqich' }
          ]
        }
      }
    },
    {
      id: 'rj3q2',
      prompt: 'Muammoni turiga ajrating.',
      hint: 'Orol — ekologik.',
      explanation: 'Ekologik — Orolning qurishi, iqlim oʻzgarishi; ijtimoiy — irqchilik, terrorizm.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'e', label: 'ekologik' }, { id: 's', label: 'ijtimoiy' }],
          items: [
            { emoji: '🏜️', label: 'Orol dengizining qurishi', bin: 'e' },
            { emoji: '🌡️', label: 'iqlim oʻzgarishi', bin: 'e' },
            { emoji: '✊', label: 'irqchilik', bin: 's' },
            { emoji: '⚠️', label: 'terrorizm', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'rj3q3',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Rio — 1992.',
      explanation: '1992-yilda Rio konferensiyasi barqaror rivojlanish dasturini qabul qilgan; XX asrda Yer aholisi 6 mlrd ga yetgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1992-yilgi Rio konferensiyasi barqaror rivojlanish dasturini qabul qilgan.', value: true },
            { text: 'XX asr oxirida Yer aholisi taxminan 6 milliardga yetgan.', value: true },
            { text: 'Koʻpmillatli davlatlarda etnik mojaro albatta boʻladi.', value: false }
          ]
        }
      }
    }
  ]
};
