import type { BoardLesson } from './types';

export const UZ7 = { kicker: 'Oʻzbekiston tarixi · VII bob', title: 'Maʼnaviy va madaniy taraqqiyot' };

/** Darslik: Oʻzbekiston tarixi 11, 15-mavzu (95–101-betlar) — tarixiy xotiraning tiklanishi, allomalar yubileylari, xotira kunlari, Navroʻz va diniy bayramlar, shaharlar yubileylari, maʼnaviyat targʻiboti. */
export const TARIX_15: BoardLesson = {
  n: 15,
  label: '15',
  group: UZ7,
  title: 'Maʼnaviy va tarixiy merosning tiklanishi',
  section: 'Oʻzbekiston tarixi, 15-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mustaqillik bilan birga xalq oʻz tarixini va ajdodlarini qayta kashf qildi. 1991-yilda Alisher Navoiy tavalludining 550 yilligi, 1994-yilda Mirzo Ulugʻbekning 600 yilligi — hatto YuNESKO qarorgohi Parijda, 1996-yilda Amir Temurning 660 yilligi keng nishonlandi; Toshkentda Temuriylar tarixi davlat muzeyi qurildi. Imom Buxoriy, Imom Termiziy, Ahmad al-Fargʻoniy kabi allomalarning yubileylari ham oʻtkazildi. Xiva va Buxoroning 2500 yilligi, Samarqandning 2750 yilligi nishonlandi.",
      easy: "1991 — Navoiy, 1994 — Ulugʻbek, 1996 — Amir Temur yubileylari.",
      draw: [
        { t: 'title', text: 'Ajdodlar xotirasi' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'yubiley'], ['1991', 'Alisher Navoiy — 550 yil'], ['1994', 'Mirzo Ulugʻbek — 600 yil'], ['1996', 'Amir Temur — 660 yil'], ['1997', 'Xiva va Buxoro — 2500 yil'], ['2007', 'Samarqand — 2750 yil']] }
      ],
      next: 'Qadriyatlar qaytdi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Xalq qadriyatlari ham qaytdi: 1991-yildan 21-mart — Navroʻz umumxalq bayrami, 1992-yildan Ramazon va Qurbon hayitlari dam olish kunlari boʻldi; 1990-yilda haj ziyorati uchun farmon chiqdi. Qurʼon 1992-yilda ilk bor oʻzbek tiliga tarjima qilindi. Mamlakatda uchta rasmiy xotira kuni bor: 9-may — Xotira va qadrlash kuni, 31-avgust — Qatagʻon qurbonlarini yod etish kuni, 2-sentabr — Birinchi Prezident Islom Karimov xotirasi kuni. 2016-yilda oʻzbek palovi YuNESKO nomoddiy meros roʻyxatiga kirdi.",
      easy: "21-mart — Navroʻz; xotira kunlari: 9-may, 31-avgust, 2-sentabr.",
      draw: [
        { t: 'title', text: 'Xotira kunlari' },
        { t: 'table', x: 4, y: 18, rows: [['sana', 'kun'], ['21-mart', 'Navroʻz bayrami'], ['9-may', 'Xotira va qadrlash kuni'], ['31-avgust', 'Qatagʻon qurbonlari xotirasi'], ['2-sentabr', 'I. Karimov xotirasi kuni']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Mustaqillik yillarida allomalar yubileylari nishonlandi: Navoiy (1991), Ulugʻbek (1994), Amir Temur (1996), shuningdek Imom Buxoriy, al-Fargʻoniy va boshqalar; qadimiy shaharlar yubileylari oʻtkazildi.',
    'Navroʻz (1991) va diniy hayitlar (1992) bayram qilindi, haj ziyorati tiklandi, Qurʼon oʻzbek tiliga tarjima qilindi.',
    'Uchta xotira kuni: 9-may, 31-avgust, 2-sentabr; Maʼnaviyat va maʼrifat markazi (1994, 2017-yilda qayta tashkil etilgan) maʼnaviy ishlarni muvofiqlashtiradi.'
  ],
  questions: [
    {
      id: 't15q1',
      prompt: 'Yubileyni yili bilan juftlang.',
      hint: 'Navoiy — mustaqillik yili.',
      explanation: 'Alisher Navoiy — 1991; Mirzo Ulugʻbek — 1994; Amir Temur — 1996.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Alisher Navoiyning 550 yilligi', right: '1991' },
            { left: 'Mirzo Ulugʻbekning 600 yilligi', right: '1994' },
            { left: 'Amir Temurning 660 yilligi', right: '1996' }
          ]
        }
      }
    },
    {
      id: 't15q2',
      prompt: 'Sanani xotira yoki bayram kuni bilan juftlang.',
      hint: '31-avgust — qatagʻon.',
      explanation: '21-mart — Navroʻz; 9-may — Xotira va qadrlash kuni; 31-avgust — Qatagʻon qurbonlarini yod etish kuni; 2-sentabr — I. Karimov xotirasi kuni.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: '21-mart' }, b: { label: 'Navroʻz' } },
            { a: { label: '9-may' }, b: { label: 'Xotira va qadrlash kuni' } },
            { a: { label: '31-avgust' }, b: { label: 'Qatagʻon qurbonlari xotirasi' } },
            { a: { label: '2-sentabr' }, b: { label: 'I. Karimov xotirasi kuni' } }
          ]
        }
      }
    },
    {
      id: 't15q3',
      prompt: 'Samarqand shahrining nechta yillik yubileyi 2007-yilda nishonlangan?',
      hint: '2700 dan biroz koʻp.',
      explanation: '2750 yillik.',
      widget: { type: 'number_answer', props: { answer: 2750, unit: 'yil' } }
    },
    {
      id: 't15q4',
      prompt: 'Navroʻz qaysi yildan umumxalq bayrami sifatida nishonlanadi?',
      hint: 'Mustaqillik yili.',
      explanation: '1991-yildan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1985', '1991', '2000', '2009'], answerIndex: 1 } }
    },
    {
      id: 't15q5',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Haj farmoni — mustaqillikdan oldin.',
      explanation: 'Haj farmoni (1990) → Navroʻz bayrami (1991) → Qurʼonning oʻzbekcha tarjimasi (1992) → palov YuNESKO roʻyxatida (2016).',
      widget: { type: 'order_line', props: { items: [{ label: 'haj ziyorati farmoni' }, { label: 'Navroʻz umumxalq bayrami' }, { label: 'Qurʼonning oʻzbekcha tarjimasi' }, { label: 'palov YuNESKO roʻyxatida' }] } }
    },
    {
      id: 't15q6',
      prompt: '1996-yilda Toshkentda qaysi muzey qurildi?',
      hint: 'Amir Temur yili.',
      explanation: 'Temuriylar tarixi davlat muzeyi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Qatagʻon qurbonlari muzeyi', 'Temuriylar tarixi davlat muzeyi', 'Arxeologiya muzeyi', 'Tabiat muzeyi'], answerIndex: 1 } }
    },
    {
      id: 't15q7',
      prompt: 'Yubileylari nishonlangan allomalarni tanlang.',
      hint: 'Darslikdagi nomlar.',
      explanation: 'Imom Buxoriy, Imom Termiziy, Ahmad al-Fargʻoniy, Bahouddin Naqshband va boshqalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Imom Buxoriy', correct: true },
            { label: 'Ahmad al-Fargʻoniy', correct: true },
            { label: 'Imom Termiziy', correct: true },
            { label: 'Bahouddin Naqshband', correct: true },
            { label: 'Isaak Nyuton' }
          ]
        }
      }
    },
    {
      id: 't15q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Palov — 2016.',
      explanation: 'Oʻzbek palovi 2016-yilda YuNESKO roʻyxatiga kirdi; Qurʼon oʻzbek tiliga ilk bor 1992-yilda tarjima qilindi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻzbek palovi YuNESKO nomoddiy madaniy meros roʻyxatiga kiritilgan.', value: true },
            { text: 'Qurʼon ilk bor 1992-yilda oʻzbek tiliga tarjima qilingan.', value: true },
            { text: 'Ramazon hayiti mustaqillik yillarida taqiqlangan.', value: false },
            { text: 'Ulugʻbek yubileyi faqat Toshkentda nishonlangan.', value: false }
          ]
        }
      }
    }
  ]
};
