import type { BoardLesson } from './types';

export const GEO7 = { kicker: '7-bob', title: 'Yevropa va Amerika subregionlari' };

/** Darslik: Geografiya 10, 23-§ (94–101-betlar) — Yevropaning toʻrt subregioni: Shimoliy, Gʻarbiy, Janubiy va Sharqiy Yevropa — tabiati, aholisi, xoʻjaligi. */
export const GEO_23: BoardLesson = {
  n: 23,
  label: '23',
  group: GEO7,
  title: 'Yevropa subregionlari',
  section: '23-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yevropa — Yevrosiyo materigining gʻarbiy qismi, maydoni 10 mln km², siyosiy xaritasida Rossiya bilan birga 44 ta mustaqil davlat bor. U toʻrtta subregionga boʻlinadi. Shimoliy Yevropa — Skandinaviya davlatlari (Norvegiya, Shvetsiya, Daniya, Finlyandiya, Islandiya) va Boltiq davlatlari; Islandiya vulqon va geyzerlari bilan mashhur, Norvegiya Shimoliy dengizdan neft va gaz qazib oladi, Skandinaviya turmush darajasi boʻyicha dunyoda yetakchi. Gʻarbiy Yevropa — Germaniya, Fransiya, Buyuk Britaniya, Alp mamlakatlari (Avstriya, Shveytsariya, Lixtenshteyn) va «Benilyuks» (Belgiya, Niderlandiya, Lyuksemburg); bu eng zich va eng rivojlangan subregion, London, Parij, Berlin kabi jahon shaharlari shu yerda.",
      easy: "Yevropa: 10 mln km², 44 davlat, 4 subregion; Shimoliy — Skandinaviya va Boltiq; Gʻarbiy — eng rivojlangan.",
      draw: [
        { t: 'title', text: 'Yevropa subregionlari' },
        { t: 'table', x: 4, y: 18, rows: [['subregion', 'misollar'], ['Shimoliy', 'Norvegiya, Shvetsiya, Daniya'], ['Gʻarbiy', 'Germaniya, Fransiya, «Benilyuks»'], ['Janubiy', 'Italiya, Ispaniya, Gretsiya'], ['Sharqiy', 'Polsha, Chexiya, Vengriya']] }
      ],
      next: 'Janubiy va Sharqiy Yevropa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Janubiy Yevropa — Ispaniya, Portugaliya, Italiya, Gretsiya va «mitti» davlatlar: Andorra, San-Marino, Malta, Vatikan. U Yevropa sivilizatsiyasining beshigi — Gretsiya va Rim shu yerda rivojlangan. Hudud seysmik faol: Etna, Vezuviy, Stromboli vulqonlari shu yerda. Oʻrta dengiz iqlimi subtropik dehqonchilik — uzum, sitrus, zaytun va dengiz turizmi uchun qulay. Sharqiy Yevropa — Rossiya, Ukraina, Belarus, Moldova va Polsha, Chexiya, Vengriya, Ruminiya, Bolgariya, Bolqon davlatlari; ularning umumiy jihati — oʻtish iqtisodiyotidagi davlatlar ekani. Bu yerda aholi kamaymoqda, aholining koʻp qismi slavyan xalqlari; sanoat, metallurgiya, mashinasozlik va oziq-ovqat sanoati rivojlangan.",
      easy: "Janubiy — Oʻrta dengiz: vulqonlar, subtropik dehqonchilik, turizm; Sharqiy — oʻtish iqtisodiyoti, slavyan xalqlari, sanoat.",
      draw: [
        { t: 'title', text: 'Ixtisoslashuv' },
        { t: 'table', x: 4, y: 18, rows: [['subregion', 'asosiy tarmoqlar'], ['Shimoliy', 'oʻrmon, baliqchilik, kemasozlik'], ['Gʻarbiy', 'mashinasozlik, kimyo, moliya'], ['Janubiy', 'subtropik ekinlar, turizm'], ['Sharqiy', 'metallurgiya, mashinasozlik']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Yevropa maydoni 10 mln km², Rossiya bilan birga 44 ta davlat; u Shimoliy, Gʻarbiy, Janubiy va Sharqiy subregionlarga boʻlinadi.',
    'Shimoliy Yevropa (Skandinaviya va Boltiq) turmush darajasi yuqori; Gʻarbiy Yevropa eng rivojlangan va eng zich subregion, jahon shaharlari markazi.',
    'Janubiy Yevropa — Oʻrta dengiz sivilizatsiyasi beshigi, subtropik dehqonchilik va turizm markazi; Sharqiy Yevropa — oʻtish iqtisodiyotidagi, sanoati rivojlangan davlatlar.'
  ],
  questions: [
    {
      id: 'g23q1',
      prompt: 'Davlatni Yevropa subregioniga ajrating.',
      hint: 'Norvegiya — Shimoliy.',
      explanation: 'Shimoliy — Norvegiya, Finlyandiya; Gʻarbiy — Fransiya, Niderlandiya; Janubiy — Italiya, Gretsiya; Sharqiy — Polsha, Vengriya.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'n', label: 'Shimoliy' }, { id: 'w', label: 'Gʻarbiy' }, { id: 's', label: 'Janubiy' }, { id: 'e', label: 'Sharqiy' }],
          items: [
            { emoji: '🏔️', label: 'Norvegiya', bin: 'n' },
            { emoji: '🎅', label: 'Finlyandiya', bin: 'n' },
            { emoji: '🗼', label: 'Fransiya', bin: 'w' },
            { emoji: '🌷', label: 'Niderlandiya', bin: 'w' },
            { emoji: '🍕', label: 'Italiya', bin: 's' },
            { emoji: '🏛️', label: 'Gretsiya', bin: 's' },
            { emoji: '🏰', label: 'Polsha', bin: 'e' },
            { emoji: '🌉', label: 'Vengriya', bin: 'e' }
          ]
        }
      }
    },
    {
      id: 'g23q2',
      prompt: 'Yevropa siyosiy xaritasida (Rossiya bilan birga) nechta mustaqil davlat bor?',
      hint: 'Qirqdan koʻp.',
      explanation: '44 ta.',
      widget: { type: 'number_answer', props: { answer: 44, unit: 'ta' } }
    },
    {
      id: 'g23q3',
      prompt: '«Benilyuks» deb qaysi davlatlarga aytiladi?',
      hint: 'Uchta kichik davlat.',
      explanation: 'Belgiya, Niderlandiya va Lyuksemburg.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Belgiya, Niderlandiya, Lyuksemburg', 'Avstriya, Shveytsariya, Lixtenshteyn', 'Norvegiya, Shvetsiya, Daniya', 'Ispaniya, Portugaliya, Andorra'], answerIndex: 0 } }
    },
    {
      id: 'g23q4',
      prompt: 'Janubiy Yevropadagi vulqonlarni tanlang.',
      hint: 'Italiya.',
      explanation: 'Etna, Vezuviy, Stromboli.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Etna', correct: true },
            { label: 'Vezuviy', correct: true },
            { label: 'Stromboli', correct: true },
            { label: 'Kilimanjaro' }
          ]
        }
      }
    },
    {
      id: 'g23q5',
      prompt: 'Davlatni uning xususiyati bilan juftlang.',
      hint: 'Islandiya — geyzerlar.',
      explanation: 'Islandiya — vulqon va geyzerlar; Norvegiya — Shimoliy dengiz neft-gazi; Vatikan — mutlaq teokratik monarxiya; Finlyandiya — Santa-Klausning «qarorgohi».',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Islandiya', right: 'vulqon va geyzerlar' },
            { left: 'Norvegiya', right: 'Shimoliy dengiz neft-gazi' },
            { left: 'Vatikan', right: 'teokratik monarxiya' },
            { left: 'Finlyandiya', right: 'Santa-Klaus «qarorgohi»' }
          ]
        }
      }
    },
    {
      id: 'g23q6',
      prompt: 'Sharqiy Yevropa davlatlarining muhim umumiy jihati nima?',
      hint: 'Iqtisod.',
      explanation: 'Ular oʻtish iqtisodiyotidagi davlatlar blokiga mansub.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻtish iqtisodiyotidagi davlatlar', 'hammasi monarxiya', 'hammasi orol davlatlar', 'hammasi tropik iqlimda'], answerIndex: 0 } }
    },
    {
      id: 'g23q7',
      prompt: 'Alp mamlakatlarini tanlang.',
      hint: 'Uchta.',
      explanation: 'Avstriya, Shveytsariya, Lixtenshteyn.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Avstriya', correct: true },
            { label: 'Shveytsariya', correct: true },
            { label: 'Lixtenshteyn', correct: true },
            { label: 'Daniya' }
          ]
        }
      }
    },
    {
      id: 'g23q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'San-Marino — Italiya ichida.',
      explanation: 'San-Marino va Vatikan butunlay Italiya bilan oʻralgan anklav davlatlar; Gʻarbiy Yevropa — eng zich subregion.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'San-Marino va Vatikan butunlay Italiya hududi bilan oʻralgan.', value: true },
            { text: 'Gʻarbiy Yevropa — aholisi eng zich joylashgan subregion.', value: true },
            { text: 'Sharqiy Yevropada aholi tez koʻpaymoqda.', value: false },
            { text: 'Oʻrta dengiz iqlimida qish sovuq va qorli boʻladi.', value: false }
          ]
        }
      }
    }
  ]
};
