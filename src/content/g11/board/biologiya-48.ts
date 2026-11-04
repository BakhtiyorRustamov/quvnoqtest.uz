import type { BoardLesson } from './types';
import { BOB4 } from './biologiya-35';

/** Takrorlash (savollar): darslik, 4-bob (35–44-mavzular). */
export const BIO_48: BoardLesson = {
  n: 48,
  label: '35–44',
  group: BOB4,
  title: 'Bobni takrorlash: organik olam filogenezi',
  section: '4-bob, 35–44',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'r4b1',
      prompt: 'Misolni evolutsiya yoʻnalishiga ajrating.',
      hint: 'Aromorfoz — umumiy yuksalish.',
      explanation: 'Aromorfoz: 4 kamerali yurak, urugʻ paydo boʻlishi. Idioadaptatsiya: elektr skatning elektr organi. Degeneratsiya: solityorda ichak yoʻqligi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'a', label: 'Aromorfoz' },
            { id: 'i', label: 'Idioadaptatsiya' },
            { id: 'd', label: 'Degeneratsiya' }
          ],
          items: [
            { emoji: '', label: '4 kamerali yurak', bin: 'a' },
            { emoji: '', label: 'urugʻ paydo boʻlishi', bin: 'a' },
            { emoji: '', label: 'elektr skatning elektr organi', bin: 'i' },
            { emoji: '', label: 'solityorda ichak yoʻqligi', bin: 'd' }
          ]
        }
      }
    },
    {
      id: 'r4b2',
      prompt: 'Organ yoki tipni hayvonlar guruhi bilan juftlang.',
      hint: 'Naysimon — xordalilar.',
      explanation: 'Diffuz nerv sistemasi — boʻshliqichlilar; malpigi naychalari — hasharotlar; alveolalar — sutemizuvchilar; naysimon nerv sistemasi — xordalilar.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'diffuz nerv sistemasi', right: 'boʻshliqichlilar' },
            { left: 'malpigi naychalari', right: 'hasharotlar' },
            { left: 'alveolali oʻpka', right: 'sutemizuvchilar' },
            { left: 'naysimon nerv sistemasi', right: 'xordalilar' }
          ]
        }
      }
    },
    {
      id: 'r4b3',
      prompt: 'Oʻsimlik guruhlarini paydo boʻlish tartibida joylashtiring.',
      hint: 'Silurdan yuragacha.',
      explanation: 'Psilofitlar → qirqquloqlar → ochiq urugʻlilar → yopiq urugʻlilar.',
      widget: { type: 'order_line', props: { items: [{ label: 'psilofitlar' }, { label: 'qirqquloqlar' }, { label: 'ochiq urugʻlilar' }, { label: 'yopiq urugʻlilar' }] } }
    },
    {
      id: 'r4b4',
      prompt: 'Suvda hamda quruqlikda yashovchilarning yuragi necha kamerali?',
      hint: 'Ikki boʻlmacha va bitta qorincha.',
      explanation: '3 kamerali.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'kamera' } }
    },
    {
      id: 'r4b5',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Chang naychasi — suvsiz urugʻlanish.',
      explanation: 'Chang naychasi suvga qaramlikni yoʻqotdi; oʻpka ilk bor amfibiyalarda; yoʻsinlarda gametofit ustun; reptiliyalar sovuqqonli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Chang naychasi urugʻlanish uchun suvga ehtiyojni yoʻqotgan.', value: true },
            { text: 'Oʻpka birinchi marta amfibiyalarda paydo boʻlgan.', value: true },
            { text: 'Yoʻsinlarda sporofit ustunlik qiladi.', value: false },
            { text: 'Sudralib yuruvchilar issiqqonli hayvonlar.', value: false }
          ]
        }
      }
    }
  ]
};
