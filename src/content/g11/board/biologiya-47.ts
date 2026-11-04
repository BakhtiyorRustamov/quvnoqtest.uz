import type { BoardLesson } from './types';
import { BOB3 } from './biologiya-24';

/** Takrorlash (savollar): darslik, 3-bob (24–34-mavzular). */
export const BIO_47: BoardLesson = {
  n: 47,
  label: '24–34',
  group: BOB3,
  title: 'Bobni takrorlash: biosfera darajasi',
  section: '3-bob, 24–34',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r3b1',
      prompt: 'Olimni hissasi bilan juftlang.',
      hint: 'Zyuss — atama, Lerua — noosfera.',
      explanation: 'Zyuss — «biosfera» atamasi (1875); Vernadskiy — biosfera taʼlimoti; Lerua — «noosfera» atamasi; Lamark — «hayot qobigʻi» gʻoyasi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'E. Zyuss', right: '«biosfera» atamasi' },
            { left: 'V. I. Vernadskiy', right: 'biosfera taʼlimoti' },
            { left: 'E. Lerua', right: '«noosfera» atamasi' },
            { left: 'J. B. Lamark', right: '«hayot qobigʻi» gʻoyasi' }
          ]
        }
      }
    },
    {
      id: 'r3b2',
      prompt: 'Jarayonni aylanish turiga ajrating.',
      hint: 'Biologik — organizmlar orqali.',
      explanation: 'Geologik: jinslar yemirilishi, okean tubida choʻkish. Biologik: fotosintez, redutsentlar parchalashi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'g', label: 'Geologik' },
            { id: 'b', label: 'Biologik' }
          ],
          items: [
            { emoji: '', label: 'togʻ jinslari yemirilishi', bin: 'g' },
            { emoji: '', label: 'okean tubida choʻkma', bin: 'g' },
            { emoji: '', label: 'fotosintez', bin: 'b' },
            { emoji: '', label: 'redutsentlar parchalashi', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'r3b3',
      prompt: 'Azot aylanishi bosqichlarini tartiblang.',
      hint: 'Havodagi N₂ dan boshlang.',
      explanation: 'Fiksatsiya (N₂ → NH₄⁺) → nitrifikatsiya (→ NO₃⁻) → oʻsimlik oqsili → ammonifikatsiya (oqsil → NH₃).',
      widget: { type: 'step_order', props: { steps: ['azot fiksatsiyasi', 'nitrifikatsiya', 'oʻsimlik oqsil sintezlaydi', 'ammonifikatsiya'] } }
    },
    {
      id: 'r3b4',
      prompt: 'Yer sayyorasining umumiy biomassasi taxminan necha milliard tonna (quruq modda)?',
      hint: 'Quruqlik 2420 + okean 3,2.',
      explanation: '≈ 2423 mlrd t.',
      widget: { type: 'number_answer', props: { answer: 2423, tolerance: 5, unit: 'mlrd t' } }
    },
    {
      id: 'r3b5',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ozon — 20–22 km.',
      explanation: 'Biosferaning yuqori chegarasi — ozon qatlami; noosfera — biosfera rivojlanishining oliy bosqichi; fosfor atmosferada yoʻq; qoʻriqxonada faqat ilmiy ish olib boriladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Biosferaning yuqori chegarasi — ozon qatlami.', value: true },
            { text: 'Noosfera — biosfera rivojlanishining oliy bosqichi.', value: true },
            { text: 'Fosforning asosiy manbayi — atmosfera.', value: false },
            { text: 'Qoʻriqxonada cheklangan ov qilishga ruxsat beriladi.', value: false }
          ]
        }
      }
    }
  ]
};
