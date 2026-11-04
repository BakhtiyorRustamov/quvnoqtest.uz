import type { BoardLesson } from './types';

export const GEO1 = { kicker: '1-bob', title: 'Geografiya fani va uning tarixi' };

/** Darslik: Geografiya 10, 1-§ (3–6-betlar) — geografik qobiq, geografiya fanlari tizimi, tadqiqot usullari. */
export const GEO_1: BoardLesson = {
  n: 1,
  label: '1',
  group: GEO1,
  title: 'Geografiya fanlari tizimi',
  section: '1-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Geografiya nimani oʻrganadi? Uning asosiy obyekti — geografik qobiq. Bu Yerning toʻrt qobigʻi — qattiq litosfera, suv gidrosfera, havo atmosfera va hayot biosfera — tutashib, bir-biriga taʼsir qiladigan joyda paydo boʻlgan yaxlit tabiiy tizim. Aynan shu qobiq insoniyatning yashash muhiti va tabiiy boyliklar manbayi. Geografiya undagi tabiiy va ijtimoiy hodisalarni bir-biriga bogʻlab, maʼlum hudud va vaqtda oʻrganadi.",
      easy: "Geografiyaning obyekti — geografik qobiq: litosfera + gidrosfera + atmosfera + biosfera.",
      draw: [
        { t: 'title', text: 'Geografik qobiq' },
        { t: 'box', id: 'l', x: 4, y: 20, w: 20, h: 10, text: 'litosfera', color: 'orange' },
        { t: 'box', id: 'g', x: 28, y: 20, w: 20, h: 10, text: 'gidrosfera', color: 'blue' },
        { t: 'box', id: 'a', x: 52, y: 20, w: 20, h: 10, text: 'atmosfera', color: 'purple' },
        { t: 'box', id: 'b', x: 76, y: 20, w: 20, h: 10, text: 'biosfera', color: 'green' },
        { t: 'box', id: 'q', x: 30, y: 44, w: 40, h: 10, text: 'geografik qobiq', color: 'red' },
        { t: 'arrow', from: 'l', to: 'q' },
        { t: 'arrow', from: 'g', to: 'q' },
        { t: 'arrow', from: 'a', to: 'q' },
        { t: 'arrow', from: 'b', to: 'q' }
      ],
      next: 'Fanlar tizimi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Geografiya ikki katta tarmoqqa boʻlinadi. Tabiiy geografiya geografik qobiq va uning qismlarini oʻrganadi: geomorfologiya — relyefni, iqlimshunoslik — iqlimni, gidrologiya — suvlarni, glyatsiologiya — muzliklarni, biogeografiya — tirik organizmlar tarqalishini. Ijtimoiy-iqtisodiy geografiya esa aholi, shaharlar, sanoat, qishloq xoʻjaligi, transport va siyosiy jarayonlarni oʻrganadi. Kartografiya — xarita tuzish fani — alohida oʻrinda turadi. Asosiy tadqiqot usullari: ekspeditsiya, tasviriy, kartografik, statistik, qiyosiy usullar, hozir esa kompyuter modellashtirish va kosmik suratlar ham keng qoʻllanilmoqda.",
      easy: "Tabiiy geografiya (relyef, iqlim, suv) + ijtimoiy-iqtisodiy geografiya (aholi, xoʻjalik); kartografiya — xaritalar.",
      draw: [
        { t: 'title', text: 'Geografiya fanlari' },
        { t: 'table', x: 4, y: 18, rows: [['tabiiy geografiya', 'ijtimoiy-iqtisodiy'], ['geomorfologiya — relyef', 'aholi geografiyasi'], ['iqlimshunoslik — iqlim', 'shaharlar geografiyasi'], ['gidrologiya — suvlar', 'sanoat geografiyasi'], ['biogeografiya — tirik dunyo', 'siyosiy geografiya']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Geografiyaning oʻrganish obyekti — geografik qobiq: litosfera, gidrosfera, atmosfera va biosfera tutashgan yaxlit tabiiy tizim.',
    'Geografiya tabiiy geografiya va ijtimoiy-iqtisodiy geografiyaga boʻlinadi; ularning har biri koʻplab torroq fanlardan iborat, kartografiya alohida oʻrin tutadi.',
    'Zamonaviy geografiyaning asosiy vazifasi — tabiat va jamiyat munosabatlarini uygʻunlashtirish; u ekspeditsiya, kartografik, statistik va kosmik usullardan foydalanadi.'
  ],
  questions: [
    {
      id: 'g1q1',
      prompt: 'Geografiyaning asosiy oʻrganish obyekti nima?',
      hint: 'Toʻrt qobiq tutashgan joy.',
      explanation: 'Geografik qobiq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['geografik qobiq', 'faqat atmosfera', 'Yer yadrosi', 'Quyosh sistemasi'], answerIndex: 0 } }
    },
    {
      id: 'g1q2',
      prompt: 'Fanni u oʻrganadigan narsa bilan juftlang.',
      hint: 'Glyatsiologiya — muz.',
      explanation: 'Geomorfologiya — relyef; gidrologiya — suvlar; glyatsiologiya — qor va muzliklar; kartografiya — xaritalar.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'geomorfologiya', right: 'Yer yuzi relyefi' },
            { left: 'gidrologiya', right: 'suvlar' },
            { left: 'glyatsiologiya', right: 'qor va muzliklar' },
            { left: 'kartografiya', right: 'xaritalar tuzish' }
          ]
        }
      }
    },
    {
      id: 'g1q3',
      prompt: 'Fanni tarmogʻiga ajrating.',
      hint: 'Aholi — ijtimoiy.',
      explanation: 'Tabiiy — iqlimshunoslik, gidrologiya, biogeografiya; ijtimoiy-iqtisodiy — aholi, transport, sanoat geografiyasi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 't', label: 'tabiiy geografiya' }, { id: 'i', label: 'ijtimoiy-iqtisodiy geografiya' }],
          items: [
            { emoji: '🌦️', label: 'iqlimshunoslik', bin: 't' },
            { emoji: '💧', label: 'gidrologiya', bin: 't' },
            { emoji: '🌿', label: 'biogeografiya', bin: 't' },
            { emoji: '👨‍👩‍👧', label: 'aholi geografiyasi', bin: 'i' },
            { emoji: '🚆', label: 'transport geografiyasi', bin: 'i' },
            { emoji: '🏭', label: 'sanoat geografiyasi', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'g1q4',
      prompt: 'Geografik qobiqni tashkil etuvchi Yer qobiqlarini tanlang.',
      hint: 'Toʻrtta.',
      explanation: 'Litosfera, gidrosfera, atmosfera, biosfera.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'litosfera', correct: true },
            { label: 'gidrosfera', correct: true },
            { label: 'atmosfera', correct: true },
            { label: 'biosfera', correct: true },
            { label: 'yadro' }
          ]
        }
      }
    },
    {
      id: 'g1q5',
      prompt: '«Geografiya» soʻzi qadimgi yunon tilida qanday maʼno beradi?',
      hint: 'Yer + tasvir.',
      explanation: '«Yerning tasviri».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Yerning tasviri»', '«osmon ilmi»', '«suv haqidagi fan»', '«tosh oʻlchash»'], answerIndex: 0 } }
    },
    {
      id: 'g1q6',
      prompt: 'Geografiyadagi tadqiqot usullarini tanlang.',
      hint: 'Dala va xarita.',
      explanation: 'Ekspeditsiya, kartografik, statistik, qiyosiy, kosmik usullar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ekspeditsiya', correct: true },
            { label: 'kartografik', correct: true },
            { label: 'statistik', correct: true },
            { label: 'aerokosmik', correct: true },
            { label: 'faqat taxmin qilish' }
          ]
        }
      }
    },
    {
      id: 'g1q7',
      prompt: 'Zamonaviy geografiyaning eng asosiy vazifasi nima?',
      hint: 'Ikki tomon.',
      explanation: 'Tabiat va jamiyat oʻzaro munosabatlarini uygʻunlashtirish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tabiat va jamiyat munosabatlarini uygʻunlashtirish', 'faqat xarita chizish', 'faqat togʻlarni oʻlchash', 'yulduzlarni kuzatish'], answerIndex: 0 } }
    },
    {
      id: 'g1q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Toponimika — joy nomlari.',
      explanation: 'Tibbiy geografiya aholi salomatligiga taʼsir etuvchi omillarni oʻrganadi; geografiya tasvirlash bilan cheklanmay, sabablarini ham izlaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Tibbiy geografiya aholi salomatligiga taʼsir etuvchi omillarni oʻrganadi.', value: true },
            { text: 'Zamonaviy geografiya «Nima sababdan?» savoliga ham javob izlaydi.', value: true },
            { text: 'Geografiya faqat tabiatni oʻrganadi, aholini oʻrganmaydi.', value: false },
            { text: 'Biogeografiya Yer yuzi relyefini oʻrganadi.', value: false }
          ]
        }
      }
    }
  ]
};
