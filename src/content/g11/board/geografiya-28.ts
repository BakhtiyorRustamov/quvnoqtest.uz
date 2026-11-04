import type { BoardLesson } from './types';

export const GEO9 = { kicker: '9-bob', title: 'Osiyo subregionlari' };

/** Darslik: Geografiya 10, 28-§ (119–123-betlar) — Osiyo subregionlari; Janubi-gʻarbiy Osiyo xoʻjaligi; Janubiy Osiyo: oʻrni, tabiati, resurslari, aholisi, xoʻjaligi. */
export const GEO_28: BoardLesson = {
  n: 28,
  label: '28',
  group: GEO9,
  title: 'Janubi-gʻarbiy va Janubiy Osiyo',
  section: '28-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Osiyo — eng yirik qitʼa: maydoni 43 mln km² dan ortiq, aholisi jahon aholisining qariyb 60 foizi. Siyosiy xaritasida 47 ta mustaqil davlat bor. Qitʼa beshta subregionga boʻlinadi: Janubi-gʻarbiy, Janubiy, Sharqiy, Janubi-sharqiy va Markaziy Osiyo. Janubi-gʻarbiy Osiyoda aholi soni boʻyicha Turkiya, Eron, Afgʻoniston, Iroq va Saudiya Arabistoni yetakchi. Fors koʻrfazi davlatlari neft qazib olish bilan mashhur; Turkiya va Eronda mashinasozlik va metallurgiya rivojlangan. Qishloq xoʻjaligida sugʻorma dehqonchilik ustun: bugʻdoy, arpa; Oʻrta dengiz boʻyida zaytun, uzum, sitrus mevalar. Chorvachilikda Turkiya angor echkisi, Arabiston yarimoroli tuyachilik, Eron va Afgʻoniston qorakoʻlchilikka ixtisoslashgan.",
      easy: "Osiyo: 47 davlat, 5 subregion. Janubi-gʻarbiy Osiyo — Fors koʻrfazi nefti, zaytun, tuyachilik, qorakoʻlchilik.",
      draw: [
        { t: 'title', text: 'Osiyo subregionlari' },
        { t: 'list', x: 4, y: 18, items: ['Janubi-gʻarbiy Osiyo', 'Janubiy Osiyo', 'Sharqiy Osiyo', 'Janubi-sharqiy Osiyo', 'Markaziy Osiyo'] },
        { t: 'text', x: 4, y: 62, text: 'Fors koʻrfazi — neft; Turkiya — angor echkisi', size: 's', color: 'orange' }
      ],
      next: 'Janubiy Osiyo'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Janubiy Osiyo — Hindiston yarimoroli, Hind-Gang tekisligi va Shri-Lanka, Maldiv kabi orollar; bu yerda 7 ta davlat joylashgan, ulardan faqat Butan monarxiya. Shimolda Himolay va Qoraqurum togʻlari oʻrab turadi, hudud janubga — Maldiv orollari tomon pasayadi. Iqlimi musson: nam yoz va quruq qish. Hind, Gang, Braxmaputra daryolari, unumdor allyuvial va regur tuproqlar bor; qora metall rudalari zaxiralari katta. Aholisi jahon aholisining chorak qismi, zichligi juda yuqori, ammo urbanizatsiya past. Dinlar: induizm (Hindiston, Nepal), islom (Pokiston, Bangladesh, Maldiv), buddizm (Butan, Shri-Lanka). Janubiy Osiyo sholi yetishtiradi; Hindiston va Shri-Lanka jahon choyining qariyb 40 foizini beradi; jut, ziravorlar ham mashhur.",
      easy: "Janubiy Osiyo: 7 davlat, musson iqlimi, aholi juda zich; sholi, choy (Hindiston, Shri-Lanka), jut, ziravorlar.",
      draw: [
        { t: 'title', text: 'Janubiy Osiyo' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'tavsif'], ['davlatlar', '7 ta (Butan — monarxiya)'], ['iqlim', 'musson: nam yoz, quruq qish'], ['daryolar', 'Hind, Gang, Braxmaputra'], ['tuproq', 'allyuvial va regur'], ['ekinlar', 'sholi, choy, jut, ziravor']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Osiyo — eng yirik qitʼa, 47 ta mustaqil davlat; u Janubi-gʻarbiy, Janubiy, Sharqiy, Janubi-sharqiy va Markaziy Osiyoga boʻlinadi.',
    'Janubi-gʻarbiy Osiyo — Fors koʻrfazi nefti, Turkiya va Eron sanoati, sugʻorma dehqonchilik, zaytun, tuyachilik va qorakoʻlchilik.',
    'Janubiy Osiyo — 7 davlat, musson iqlimi, juda zich aholi; sholi, choy, jut va ziravorlar yetishtiriladi.'
  ],
  questions: [
    {
      id: 'g28q1',
      prompt: 'Osiyo nechta subregionga boʻlinadi?',
      hint: 'Barmoqlar soni.',
      explanation: '5 ta: Janubi-gʻarbiy, Janubiy, Sharqiy, Janubi-sharqiy, Markaziy.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'ta' } }
    },
    {
      id: 'g28q2',
      prompt: 'Davlatni ixtisoslashuvi bilan juftlang.',
      hint: 'Turkiya — angor.',
      explanation: 'Turkiya — angor echkisi; Eron — qorakoʻlchilik; Saudiya Arabistoni — neft va tuyachilik.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Turkiya', right: 'angor echkisi' },
            { left: 'Eron', right: 'qorakoʻlchilik' },
            { left: 'Saudiya Arabistoni', right: 'neft va tuyachilik' }
          ]
        }
      }
    },
    {
      id: 'g28q3',
      prompt: 'Janubiy Osiyoga xos iqlim turi qaysi?',
      hint: 'Nam yoz, quruq qish.',
      explanation: 'Musson iqlimi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['musson', 'Oʻrta dengiz', 'arktika', 'keskin kontinental'], answerIndex: 0 } }
    },
    {
      id: 'g28q4',
      prompt: 'Davlatni asosiy diniga koʻra ajrating.',
      hint: 'Butan — buddizm.',
      explanation: 'Induizm — Hindiston, Nepal; islom — Pokiston, Bangladesh; buddizm — Butan, Shri-Lanka.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'h', label: 'induizm' }, { id: 'i', label: 'islom' }, { id: 'b', label: 'buddizm' }],
          items: [
            { emoji: '🛕', label: 'Nepal', bin: 'h' },
            { emoji: '🐘', label: 'Hindiston', bin: 'h' },
            { emoji: '🕌', label: 'Pokiston', bin: 'i' },
            { emoji: '🌾', label: 'Bangladesh', bin: 'i' },
            { emoji: '🏔️', label: 'Butan', bin: 'b' },
            { emoji: '🍵', label: 'Shri-Lanka', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'g28q5',
      prompt: 'Janubiy Osiyodagi yagona monarxiya qaysi?',
      hint: 'Himolayda, qirollik.',
      explanation: 'Butan Qirolligi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Butan', 'Nepal', 'Pokiston', 'Maldiv'], answerIndex: 0 } }
    },
    {
      id: 'g28q6',
      prompt: 'Janubiy Osiyoning yirik daryolarini tanlang.',
      hint: 'Uchtasi.',
      explanation: 'Hind, Gang, Braxmaputra.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Hind', correct: true },
            { label: 'Gang', correct: true },
            { label: 'Braxmaputra', correct: true },
            { label: 'Mekong' }
          ]
        }
      }
    },
    {
      id: 'g28q7',
      prompt: 'Jahon choy hosilining qariyb 40 foizini qaysi ikki davlat beradi?',
      hint: 'Janubiy Osiyo.',
      explanation: 'Hindiston va Shri-Lanka.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Hindiston va Shri-Lanka', 'Nepal va Butan', 'Eron va Turkiya', 'Pokiston va Maldiv'], answerIndex: 0 } }
    },
    {
      id: 'g28q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Urbanizatsiya past.',
      explanation: 'Janubiy Osiyo aholisi juda zich, lekin urbanizatsiya darajasi past; regur — unumdor tuproq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Janubiy Osiyo aholisi juda zich joylashgan.', value: true },
            { text: 'Regur — Janubiy Osiyoning unumdor tuprogʻi.', value: true },
            { text: 'Janubiy Osiyo dunyoning eng urbanizatsiyalashgan mintaqasi.', value: false },
            { text: 'Janubiy Osiyoni shimolda Alp togʻlari oʻrab turadi.', value: false }
          ]
        }
      }
    }
  ]
};
