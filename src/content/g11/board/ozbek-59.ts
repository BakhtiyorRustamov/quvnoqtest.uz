import type { BoardLesson } from './types';

export const OZG9 = { kicker: 'Adabiyot · IV', title: 'XX asr oʻzbek adabiyoti' };

/** Darslik: Adabiyot 11, II qism (2018), 3-bet — Abdurauf Fitrat: hayoti va ijodi. */
export const OZ_59: BoardLesson = {
  n: 59,
  label: '59',
  group: OZG9,
  title: 'Abdurauf Fitrat',
  section: 'Adabiyot, 2-qism: Abdurauf Fitrat (1886–1938) — hayoti va ijodi',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Abdurauf Fitrat 1886-yilda Buxoroda tugʻilgan; eski maktab va Mirarab madrasasida, soʻng Istanbulda tahsil olgan. U yerda «Munozara», «Hind sayyohi bayonoti» nasriy asarlari va «Sayha» («Chorlov») sheʼriy toʻplami chop etilgan. 1917–1918-yillarda Samarqanddagi «Hurriyat» gazetasiga muharrirlik qilgan; uning tashabbusi bilan 70 nafar iqtidorli yosh Germaniyaga oʻqishga yuborilgan. Leningrad dorilfununida professor boʻlgan, «Abulfayzxon», «Bedil», «Qiyomat» kabi asarlarni yozgan. Fitrat «Adabiyot qoidalari» darsligi, «Sarf», «Nahv» kitoblari va «Shashmaqom» haqidagi tadqiqotlar muallifi; 1937-yilda asossiz ayblov bilan qamalib, 1938-yilda qatl etilgan, mustaqillik yillarida ijodi qayta oʻrganildi.",
      easy: "Fitrat — buxorolik adib, olim va maʼrifatparvar. U drama, sheʼr, darslik va musiqa haqida asarlar yozgan.",
      draw: [
        { t: 'title', text: 'Fitrat merosi' },
        { t: 'table', x: 4, y: 18, rows: [['soha', 'asarlari'], ['nasr', '«Munozara», «Hind sayyohi…»'], ['sheʼriyat', '«Sayha» («Chorlov»)'], ['drama', '«Abulfayzxon»'], ['tilshunoslik', '«Sarf», «Nahv»'], ['musiqa', '«Shashmaqom»']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Abdurauf Fitrat (1886–1938) — buxorolik adib, olim va maʼrifatparvar; Istanbulda tahsil olgan.',
    'Uning merosi nasr, sheʼriyat, drama, tilshunoslik («Sarf», «Nahv») va musiqashunoslikni («Shashmaqom») qamrab oladi.',
    'Fitrat 1938-yilda asossiz ayblov bilan qatl etilgan; ijodi mustaqillik yillarida keng ommaga qayta yetkazildi.'
  ],
  questions: [
    {
      id: 'oz59q1',
      prompt: 'Fitrat qayerda tugʻilgan?',
      hint: 'Mirarab madrasasi shu shaharda.',
      explanation: 'Buxoroda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Buxoro', 'Samarqand', 'Toshkent', 'Qoʻqon'], answerIndex: 0 } }
    },
    {
      id: 'oz59q2',
      prompt: 'Fitrat XX asr boshida qaysi shaharda tahsil olgan?',
      hint: 'Turkiya.',
      explanation: 'Istanbulda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Istanbul', 'Qohira', 'Moskva', 'Dehli'], answerIndex: 0 } }
    },
    {
      id: 'oz59q3',
      prompt: 'Fitrat tashabbusi bilan nechta yosh Germaniyaga oʻqishga yuborilgan?',
      hint: 'Yetmish.',
      explanation: '70 nafar turkistonlik iqtidorli yosh.',
      widget: { type: 'number_answer', props: { answer: 70, unit: 'nafar' } }
    },
    {
      id: 'oz59q4',
      prompt: 'Asarni sohasi bilan juftlang.',
      hint: '«Sarf» — grammatika.',
      explanation: '«Sayha» — sheʼriy toʻplam; «Sarf» — tilshunoslik; «Shashmaqom» — musiqashunoslik; «Abulfayzxon» — drama.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«Sayha»', right: 'sheʼriy toʻplam' },
            { left: '«Sarf»', right: 'tilshunoslik' },
            { left: '«Shashmaqom»', right: 'musiqashunoslik' },
            { left: '«Abulfayzxon»', right: 'drama' }
          ]
        }
      }
    },
    {
      id: 'oz59q5',
      prompt: '«Sayha» soʻzining maʼnosi qaysi?',
      hint: 'Qavs ichida berilgan.',
      explanation: '«Chorlov».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Chorlov', 'Sukunat', 'Bahor', 'Qissa'], answerIndex: 0 } }
    },
    {
      id: 'oz59q6',
      prompt: 'Fitrat qaysi gazetaga muharrirlik qilgan?',
      hint: 'Samarqandda chiqqan.',
      explanation: '«Hurriyat» gazetasiga (1917–1918).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Hurriyat»', '«Turkiston»', '«Sadoi Fargʻona»', '«Oyina»'], answerIndex: 0 } }
    },
    {
      id: 'oz59q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Leningrad dorilfununi.',
      explanation: 'Fitrat Leningrad dorilfununida professor boʻlgan va maktablar uchun «Adabiyot qoidalari» darsligini yozgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Fitrat Leningrad dorilfununida professor boʻlgan.', value: true },
            { text: 'Fitrat maktablar uchun «Adabiyot qoidalari» darsligini yozgan.', value: true },
            { text: 'Fitrat faqat sheʼr yozgan, ilmiy asari yoʻq.', value: false }
          ]
        }
      }
    }
  ]
};
