import type { BoardLesson } from './types';
import { GEO6 } from './geografiya-20';

/** Darslik: Geografiya 10, 22-§ (90–94-betlar) — insoniyatning global muammolari, ularning sabablari va oʻzaro bogʻliqligi; tinchlik va qurolsizlanish, qashshoqlik, oziq-ovqat, energetika muammolari. */
export const GEO_22: BoardLesson = {
  n: 22,
  label: '22',
  group: GEO6,
  title: 'Insoniyatning global muammolari',
  section: '22-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Global muammolar — butun insoniyatga taalluqli va hal qilish uchun barcha davlatlarning birgalikdagi harakatini talab qiladigan muammolar. Ular aholining tez oʻsishi, sanoatning jadal rivojlanishi, tabiiy muvozanatning buzilishi va davlatlar oʻrtasidagi ziddiyatlar natijasida paydo boʻldi. Asosiylari: tinchlik va xavfsizlik, ekologik muammo, qashshoqlik, demografik muammo, oziq-ovqat, energetika, xomashyo, Dunyo okeanidan foydalanish va kasalliklarga qarshi kurash. Ular bir-biriga bogʻliq: masalan, aholining tez oʻsishi oziq-ovqat tanqisligini kuchaytiradi, yangi energiya manbalari esa atrof-muhitga taʼsir qiladi.",
      easy: "Global muammolar — butun insoniyatga taalluqli; ular oʻzaro bogʻliq va birgalikda hal qilinadi.",
      draw: [
        { t: 'title', text: 'Global muammolar' },
        { t: 'list', x: 4, y: 18, items: ['tinchlik va xavfsizlik', 'ekologik muammo', 'qashshoqlik va oziq-ovqat', 'energetika va xomashyo', 'demografik muammo'] }
      ],
      next: 'Asosiy muammolar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eng universal muammo — tinchlikni saqlash va qurolsizlanish. XX asrdagi ikki jahon urushida 70 milliondan ortiq kishi halok boʻlgan. Qashshoqlik ham katta muammo: dunyoda 1,2 milliardga yaqin odam yetarli ovqatlana olmaydi, 800 milliondan ortiq kishi savodsiz. BMT roʻyxatidagi eng sust rivojlangan 48 ta davlatning 34 tasi Afrikada. Oziq-ovqat muammosini qishloq xoʻjaligi texnologiyalarini takomillashtirish va mehnat unumdorligini oshirish orqali hal qilish mumkin. Energetika muammosi — neft, gaz, koʻmir kabi tugaydigan manbalarning kamayishi; yechimi — energiyani tejash va quyosh, shamol, geotermal energiya kabi muqobil manbalarga oʻtish.",
      easy: "Tinchlik (ikki jahon urushi — 70 mln+ qurbon), qashshoqlik va ocharchilik (1,2 mlrd), energetika — muqobil manbalar.",
      draw: [
        { t: 'title', text: 'Raqamlarda' },
        { t: 'table', x: 4, y: 18, rows: [['koʻrsatkich', 'qiymat'], ['ocharchilikka duch kelganlar', '≈ 1,2 mlrd'], ['savodsizlar', '> 800 mln'], ['eng sust rivojlangan davlatlar', '48 (34 tasi Afrikada)'], ['ikki jahon urushi qurbonlari', '> 70 mln']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Global muammolar butun insoniyatga taalluqli; ular aholining tez oʻsishi, sanoat rivoji va tabiiy muvozanatning buzilishi tufayli paydo boʻlgan va oʻzaro bogʻliq.',
    'Eng universal muammo — tinchlik va qurolsizlanish; qashshoqlik va ocharchilik ham dolzarb: 1,2 mlrd ga yaqin odam yetarli ovqatlanmaydi.',
    'Oziq-ovqat muammosi qishloq xoʻjaligi texnologiyalari orqali, energetika muammosi esa energiyani tejash va muqobil manbalarga oʻtish orqali hal qilinadi.'
  ],
  questions: [
    {
      id: 'g22q1',
      prompt: 'Global muammolarni tanlang.',
      hint: 'Butun insoniyatga taalluqli.',
      explanation: 'Tinchlik va xavfsizlik, ekologik, oziq-ovqat, energetika muammolari va boshqalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tinchlik va xavfsizlik', correct: true },
            { label: 'ekologik muammo', correct: true },
            { label: 'oziq-ovqat muammosi', correct: true },
            { label: 'energetika muammosi', correct: true },
            { label: 'bitta maktabdagi taʼmir' }
          ]
        }
      }
    },
    {
      id: 'g22q2',
      prompt: 'Darslikka koʻra eng universal global muammo qaysi?',
      hint: 'Hal qilinmasa sivilizatsiya xavf ostida.',
      explanation: 'Tinchlikni saqlash va qurolsizlanish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tinchlik va qurolsizlanish', 'turizm', 'sport', 'moda'], answerIndex: 0 } }
    },
    {
      id: 'g22q3',
      prompt: 'Energiya manbaini turiga ajrating.',
      hint: 'Neft — tugaydi.',
      explanation: 'Tugaydigan — neft, tabiiy gaz, koʻmir; muqobil — quyosh, shamol, geotermal energiya.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 't', label: 'tugaydigan' }, { id: 'm', label: 'muqobil' }],
          items: [
            { emoji: '🛢️', label: 'neft', bin: 't' },
            { emoji: '🔥', label: 'tabiiy gaz', bin: 't' },
            { emoji: '⚫', label: 'koʻmir', bin: 't' },
            { emoji: '☀️', label: 'quyosh energiyasi', bin: 'm' },
            { emoji: '🌬️', label: 'shamol energiyasi', bin: 'm' },
            { emoji: '♨️', label: 'geotermal energiya', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'g22q4',
      prompt: 'XX asrdagi ikki jahon urushida necha milliondan ortiq kishi halok boʻlgan?',
      hint: 'Oltmishdan koʻp.',
      explanation: '70 mln dan ortiq.',
      widget: { type: 'number_answer', props: { answer: 70, unit: 'mln' } }
    },
    {
      id: 'g22q5',
      prompt: 'Muammoni uning yechimi bilan juftlang.',
      hint: 'Energetika — muqobil manbalar.',
      explanation: 'Energetika — muqobil manbalarga oʻtish va tejash; oziq-ovqat — qishloq xoʻjaligi texnologiyalarini takomillashtirish; savodsizlik — taʼlimni rivojlantirish.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'energetika muammosi', right: 'muqobil manbalar va tejash' },
            { left: 'oziq-ovqat muammosi', right: 'qishloq xoʻjaligi texnologiyalari' },
            { left: 'savodsizlik', right: 'taʼlimni rivojlantirish' }
          ]
        }
      }
    },
    {
      id: 'g22q6',
      prompt: 'BMTning eng sust rivojlangan davlatlar roʻyxatidagi 48 ta davlatning nechtasi Afrikada?',
      hint: 'Koʻpchiligi.',
      explanation: '34 tasi.',
      widget: { type: 'number_answer', props: { answer: 34, unit: 'ta' } }
    },
    {
      id: 'g22q7',
      prompt: 'Aholining tez oʻsishi qaysi muammoni bevosita kuchaytiradi?',
      hint: 'Ovqat yetmaydi.',
      explanation: 'Oziq-ovqat yetishmovchiligi va ocharchilikni.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oziq-ovqat tanqisligini', 'kosmos tadqiqotini', 'muzliklarning koʻpayishini', 'zilzilalarni'], answerIndex: 0 } }
    },
    {
      id: 'g22q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Muammolar bogʻliq.',
      explanation: 'Global muammolar oʻzaro bogʻliq, bittasini boshqalarisiz hal qilib boʻlmaydi; ularni hal qilish barcha davlatlarning birgalikdagi harakatini talab qiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Global muammolar oʻzaro bogʻliq.', value: true },
            { text: 'Global muammolarni hal qilish barcha davlatlarning birgalikdagi harakatini talab qiladi.', value: true },
            { text: 'Global muammolarni bitta davlat yolgʻiz oʻzi hal qila oladi.', value: false },
            { text: 'Neft va koʻmir hech qachon tugamaydigan manbalardir.', value: false }
          ]
        }
      }
    }
  ]
};
