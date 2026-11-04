import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 15-mavzu (68–72-betlar) — Osiyo, Afrika va Lotin Amerikasi: modernizatsiya muammolari, Janubiy Osiyo yoʻli, ekstremizm xavfi, Lotin Amerikasidagi «soʻl burilish». */
export const TARIX_115: BoardLesson = {
  n: 115,
  label: '15',
  group: JH2,
  title: 'Osiyo, Afrika va Lotin Amerikasi taraqqiyoti',
  section: 'Jahon tarixi, 15-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "XX asr oxirida Osiyo, Afrika va Lotin Amerikasida modernizatsiya — jamiyatni yangilash muammolari chuqurlashdi. SSSR tarqalgach, undan yordam olib turgan Vyetnam, Laos, Angola, Mozambik, Kuba, Nikaragua kabi davlatlar ogʻir ahvolga tushdi va rivojlanishning boshqa yoʻllarini izladi. Yana bir muammo — demografik: Yer aholisi oʻsishining asosiy qismi rivojlanayotgan mamlakatlarga toʻgʻri keladi, boy va kambagʻallar daromadidagi farq katta. Janubiy Osiyo mamlakatlari — Hindiston, Pokiston, Indoneziya va boshqalar — ehtiyotkor islohotlar, barqarorlik va chet el sarmoyasini jalb qilish yoʻlini tanladi; ammo kattalarning qariyb yarmi hali ham savodsiz.",
      easy: "Modernizatsiya muammolari: SSSR yordami tugadi, aholi tez oʻsmoqda; Janubiy Osiyo — ehtiyotkor islohotlar.",
      draw: [
        { t: 'title', text: 'Modernizatsiya muammolari' },
        { t: 'list', x: 4, y: 18, items: ['SSSR yordamining tugashi', 'aholining tez oʻsishi', 'boy va kambagʻal farqi', 'savodsizlik'] }
      ],
      next: 'Islom dunyosi va Lotin Amerikasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Islom dunyosi ham modernizatsiyaning murakkab bosqichini boshdan kechirmoqda. Dinni niqob qilib, terrorni tanlagan ekstremistik guruhlar butun dunyo tinchligiga tahdid solmoqda. XXI asr boshida Iroq va Liviyada hokimiyat tashqi harbiy aralashuv bilan agʻdarilgach, mintaqada beqarorlik kuchaydi va ISHID kabi terrorchi tashkilotlar paydo boʻldi. Darslik haqiqiy dinni uning nomidan terror uyushtirayotganlardan ajrata bilish, islomning tinchliksevar din ekanini koʻrsatish muhimligini taʼkidlaydi. Lotin Amerikasida 1990-yillardagi neoliberal islohotlardan keyin saylov orqali soʻl hukumatlar hokimiyatga keldi — bu «soʻl burilish» deb ataldi; mintaqa ilk bor diktaturalarsiz rivojlanmoqda.",
      easy: "Islom dunyosi — ekstremizm xavfi, islom — tinchliksevar din; Lotin Amerikasi — «soʻl burilish», diktaturasiz rivojlanish.",
      draw: [
        { t: 'title', text: 'Uch mintaqa' },
        { t: 'table', x: 4, y: 18, rows: [['mintaqa', 'asosiy jihat'], ['Janubiy Osiyo', 'ehtiyotkor islohotlar'], ['Islom dunyosi', 'ekstremizmga qarshi kurash'], ['Lotin Amerikasi', '«soʻl burilish»']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'SSSR tarqalgach, uning yordamiga tayangan Osiyo, Afrika va Lotin Amerikasi davlatlari ogʻir ahvolga tushib, rivojlanishning boshqa yoʻllarini izladi.',
    'Janubiy Osiyo davlatlari barqarorlik, davlat sarmoyasi va chet el kapitali asosida ehtiyotkor modernizatsiya yoʻlini tanladi; savodsizlik va qashshoqlik saqlanmoqda.',
    'Islom dunyosida dinni niqob qilgan ekstremizm katta xavf; Lotin Amerikasida «soʻl burilish» boʻlib, mintaqa diktaturalarsiz rivojlanmoqda.'
  ],
  questions: [
    {
      id: 'j15q1',
      prompt: 'Rivojlanayotgan mamlakatlardagi modernizatsiya muammolarini tanlang.',
      hint: 'Aholi va daromad.',
      explanation: 'Aholining tez oʻsishi, boy va kambagʻallar orasidagi katta farq, savodsizlik.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'aholining tez oʻsishi', correct: true },
            { label: 'daromadlardagi katta farq', correct: true },
            { label: 'savodsizlik', correct: true },
            { label: 'aholining keskin qarishi' }
          ]
        }
      }
    },
    {
      id: 'j15q2',
      prompt: 'Mintaqani uning asosiy jihati bilan juftlang.',
      hint: 'Lotin Amerikasi — «soʻl burilish».',
      explanation: 'Janubiy Osiyo — ehtiyotkor islohotlar; Lotin Amerikasi — «soʻl burilish»; islom dunyosi — ekstremizmga qarshi kurash.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Janubiy Osiyo', right: 'ehtiyotkor islohotlar' },
            { left: 'Lotin Amerikasi', right: '«soʻl burilish»' },
            { left: 'islom dunyosi', right: 'ekstremizmga qarshi kurash' }
          ]
        }
      }
    },
    {
      id: 'j15q3',
      prompt: 'SSSR yordamiga tayangan davlatlarni tanlang.',
      hint: 'Sotsialistik yoʻnalishdagi davlatlar.',
      explanation: 'Vyetnam, Kuba, Angola, Nikaragua va boshqalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Vyetnam', correct: true },
            { label: 'Kuba', correct: true },
            { label: 'Angola', correct: true },
            { label: 'Nikaragua', correct: true },
            { label: 'Kanada' }
          ]
        }
      }
    },
    {
      id: 'j15q4',
      prompt: 'Lotin Amerikasida saylov orqali soʻl hukumatlarning hokimiyatga kelishi qanday nom olgan?',
      hint: 'Yoʻnalish oʻzgarishi.',
      explanation: '«Soʻl burilish».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«yashil inqilob»', '«soʻl burilish»', '«qayta qurish»', '«shok terapiyasi»'], answerIndex: 1 } }
    },
    {
      id: 'j15q5',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Neoliberal — davlat aralashuvi kamayadi.',
      explanation: 'Modernizatsiya — jamiyatni yangilash; neoliberal islohot — davlat aralashuvini kamaytirish; neokonservatizm — anʼanaviy qadriyatlarni saqlash.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'modernizatsiya', right: 'jamiyatni yangilash' },
            { left: 'neoliberal islohot', right: 'davlat aralashuvini kamaytirish' },
            { left: 'neokonservatizm', right: 'anʼanaviy qadriyatlarni saqlash' }
          ]
        }
      }
    },
    {
      id: 'j15q6',
      prompt: 'Janubiy Osiyo mamlakatlarida kattalarning qancha qismi hali savodsiz?',
      hint: 'Kasr.',
      explanation: 'Qariyb yarmi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻndan biri', 'qariyb yarmi', 'deyarli hech kim', 'toʻrtdan uch qismi'], answerIndex: 1 } }
    },
    {
      id: 'j15q7',
      prompt: 'Janubiy Osiyo modernizatsiya strategiyasining asoslarini tanlang.',
      hint: 'Davlat va chet el kapitali.',
      explanation: 'Davlat sarmoyasini istiqbolli sohalarga yoʻnaltirish, ichki bozorni himoya qilish, chet el kapitalini jalb qilish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'davlat sarmoyasi istiqbolli sohalarga', correct: true },
            { label: 'ichki bozorni himoya qilish', correct: true },
            { label: 'chet el kapitalini jalb qilish', correct: true },
            { label: 'barcha islohotlardan voz kechish' }
          ]
        }
      }
    },
    {
      id: 'j15q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Islom — tinchliksevar din.',
      explanation: 'Darslik islomning tinchliksevar din ekanini taʼkidlaydi; Lotin Amerikasi ilk bor diktaturalarsiz rivojlanmoqda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Haqiqiy dinni uning nomidan terror uyushtirayotganlardan ajratish muhim.', value: true },
            { text: 'XX asr oxiridan Lotin Amerikasi ilk bor diktaturalarsiz rivojlanmoqda.', value: true },
            { text: 'Yer aholisi oʻsishining asosiy qismi rivojlangan mamlakatlarga toʻgʻri keladi.', value: false },
            { text: 'SSSR tarqalgach, uning yordamiga tayangan davlatlar boyib ketdi.', value: false }
          ]
        }
      }
    }
  ]
};
