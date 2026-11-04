import type { BoardLesson } from './types';

export const GEO2 = { kicker: '2-bob', title: 'Yer tabiati' };

/** Darslik: Geografiya 10, 3-§ (12–16-betlar) — Quyosh sistemasi, Quyosh va Oyning taʼsiri, Yerning shakli va oʻlchamlari, Yer harakatlarining geografik oqibatlari. */
export const GEO_3: BoardLesson = {
  n: 3,
  label: '3',
  group: GEO2,
  title: 'Yer tabiati rivojlanishining fazoviy omillari',
  section: '3-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yer — Quyosh sistemasidagi sayyoralardan biri. Quyosh sistemasi Quyosh, 8 ta sayyora, 160 dan ortiq yoʻldosh, minglab asteroid va kometalardan iborat; sistemaning 99 foizdan ortiq massasi Quyoshda. Quyosh radiatsiyasi Yer yuzasidagi issiqlikning asosiy manbayi. Oy — Yerning tabiiy yoʻldoshi, undan 384 ming km uzoqlikda, 27,32 sutkada Yer atrofida aylanadi. Quyosh va Oyning tortishi okeanlarda qalqish hodisasini keltirib chiqaradi. Yerning haqiqiy shakli — geoid, lekin oʻlchash qulay boʻlishi uchun u shar yoki ellips deb qabul qilinadi. Yer yuzasining maydoni 510 mln km², ekvator uzunligi qariyb 40 ming km.",
      easy: "Quyosh — asosiy issiqlik manbayi; Oy — 384 ming km; Yer shakli — geoid; maydoni 510 mln km².",
      draw: [
        { t: 'title', text: 'Yer — raqamlarda' },
        { t: 'table', x: 4, y: 18, rows: [['koʻrsatkich', 'qiymati'], ['Yer yuzasi maydoni', '510 mln km²'], ['ekvator uzunligi', '40 075,7 km'], ['Oygacha masofa', '384 ming km'], ['Oyning aylanishi', '27,32 sutka'], ['Quyosh diametri', '1,39 mln km']] }
      ],
      next: 'Yer harakatlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yer Quyosh atrofida ellips orbita boʻylab sekundiga oʻrtacha 29,8 km tezlikda 365 sutka 6 soatda aylanib chiqadi. Quyoshga eng yaqin nuqta — perigeliy, 147 mln km; eng uzoq nuqta — afeliy, 152 mln km. Buning oqibatlari: yil fasllari, kun va tun davomiyligining oʻzgarishi, Quyosh turish va tengkunlik kunlari. Yer oʻz oʻqi atrofida ham aylanadi, oʻqi orbita tekisligiga 66,5° ogʻgan, har soatda 15° ga buriladi. Buning oqibatlari: sutka, kun va tun almashinuvi, turli meridianlarda turlicha mahalliy vaqt va Koriolis kuchi — u harakatlanayotgan jismlarni Shimoliy yarimsharda oʻngga, Janubiy yarimsharda chapga ogʻdiradi.",
      easy: "Quyosh atrofida — 365 sutka 6 soat (fasllar); oʻz oʻqi atrofida — sutka, kun-tun, Koriolis kuchi.",
      draw: [
        { t: 'title', text: 'Yer harakatlari' },
        { t: 'table', x: 4, y: 18, rows: [['harakat', 'oqibati'], ['Quyosh atrofida', 'yil fasllari'], ['Quyosh atrofida', 'tengkunliklar'], ['oʻz oʻqi atrofida', 'kun va tun'], ['oʻz oʻqi atrofida', 'Koriolis kuchi']] },
        { t: 'text', x: 4, y: 54, text: 'Perigeliy 147 mln km · afeliy 152 mln km', size: 's', color: 'blue' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Quyosh sistemasining 99 % dan ortiq massasi Quyoshda; Quyosh radiatsiyasi Yerdagi issiqlikning asosiy manbayi, Oyning tortishi qalqish hodisasini keltirib chiqaradi.',
    'Yerning haqiqiy shakli — geoid; yuzasi 510 mln km²; sharsimon shakl geografik zonallikni yuzaga keltiradi.',
    'Quyosh atrofida aylanish yil fasllarini, oʻz oʻqi atrofida aylanish kun-tun almashinuvi va Koriolis kuchini keltirib chiqaradi.'
  ],
  questions: [
    {
      id: 'g3q1',
      prompt: 'Yerning haqiqiy shakli qanday ataladi?',
      hint: 'Hech bir geometrik shaklga oʻxshamaydi.',
      explanation: 'Geoid.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['geoid', 'kub', 'ideal shar', 'konus'], answerIndex: 0 } }
    },
    {
      id: 'g3q2',
      prompt: 'Yerdan Oygacha boʻlgan masofa necha ming km?',
      hint: 'Uch yuzdan koʻp.',
      explanation: '384 ming km.',
      widget: { type: 'number_answer', props: { answer: 384, unit: 'ming km' } }
    },
    {
      id: 'g3q3',
      prompt: 'Hodisani u kelib chiqadigan harakatga ajrating.',
      hint: 'Fasllar — Quyosh atrofida.',
      explanation: 'Quyosh atrofida — yil fasllari, tengkunliklar, Quyosh turish kunlari; oʻz oʻqi atrofida — kun-tun, mahalliy vaqt farqi, Koriolis kuchi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'q', label: 'Quyosh atrofida aylanish' }, { id: 'o', label: 'oʻz oʻqi atrofida aylanish' }],
          items: [
            { emoji: '🍂', label: 'yil fasllari', bin: 'q' },
            { emoji: '⚖️', label: 'bahorgi va kuzgi tengkunlik', bin: 'q' },
            { emoji: '☀️', label: 'Quyosh turish kunlari', bin: 'q' },
            { emoji: '🌙', label: 'kun va tun almashinuvi', bin: 'o' },
            { emoji: '🕐', label: 'mahalliy vaqt farqi', bin: 'o' },
            { emoji: '🌀', label: 'Koriolis kuchi', bin: 'o' }
          ]
        }
      }
    },
    {
      id: 'g3q4',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Perigeliy — yaqin.',
      explanation: 'Perigeliy — orbitaning Quyoshga eng yaqin nuqtasi; afeliy — eng uzoq nuqtasi; Koriolis kuchi — Yer aylanishining buruvchi kuchi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'perigeliy', right: 'Quyoshga eng yaqin nuqta' },
            { left: 'afeliy', right: 'Quyoshdan eng uzoq nuqta' },
            { left: 'Koriolis kuchi', right: 'aylanishning buruvchi kuchi' }
          ]
        }
      }
    },
    {
      id: 'g3q5',
      prompt: 'Yer oʻz oʻqi atrofida 1 soatda necha gradusga buriladi?',
      hint: '360 : 24.',
      explanation: '15°.',
      widget: { type: 'number_answer', props: { answer: 15, unit: '°' } }
    },
    {
      id: 'g3q6',
      prompt: 'Koriolis kuchi taʼsirida Shimoliy yarimsharda harakatlanayotgan jismlar qaysi tomonga ogʻadi?',
      hint: 'Janubiy yarimsharda — chapga.',
      explanation: 'Oʻngga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻngga', 'chapga', 'yuqoriga', 'ogʻmaydi'], answerIndex: 0 } }
    },
    {
      id: 'g3q7',
      prompt: 'Quyosh sistemasiga kiradigan osmon jismlarini tanlang.',
      hint: 'Quyosh atrofida aylanadi.',
      explanation: 'Sayyoralar, yoʻldoshlar, asteroidlar, kometalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'sayyoralar', correct: true },
            { label: 'yoʻldoshlar', correct: true },
            { label: 'asteroidlar', correct: true },
            { label: 'kometalar', correct: true },
            { label: 'boshqa galaktikalar' }
          ]
        }
      }
    },
    {
      id: 'g3q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oy — sovuq jism.',
      explanation: 'Oy oʻzidan yorugʻlik chiqarmaydi; Yerning sharsimonligi geografik zonallikka sabab boʻladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oy oʻzidan yorugʻlik chiqarmaydi, Quyosh nurini qaytaradi.', value: true },
            { text: 'Yerning sharsimon shakli geografik zonallikni yuzaga keltiradi.', value: true },
            { text: 'Yer Quyosh atrofida aniq 365 sutkada aylanadi.', value: false },
            { text: 'Perigeliyda Yer Quyoshdan eng uzoqda boʻladi.', value: false }
          ]
        }
      }
    }
  ]
};
