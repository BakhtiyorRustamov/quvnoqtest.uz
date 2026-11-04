import type { BoardLesson } from './types';
import { GEO10 } from './geografiya-31';

/** Darslik: Geografiya 10, 33-§ (147–151-betlar) — geoekologik muammo tushunchasi, turlari (sayyoraviy, regional, lokal), Orol muammosi, Oʻzbekistondagi lokal muammolar, yechimning ilmiy prinsiplari. */
export const GEO_33: BoardLesson = {
  n: 33,
  label: '33',
  group: GEO10,
  title: 'Oʻzbekistonning geoekologik muammolari',
  section: '33-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Geoekologik muammo — inson sogʻligi va xoʻjaligiga zarar yetkazadigan, inson bilan tabiat orasidagi muvozanatni buzadigan, tabiiy va antropogen omillar natijasida yuzaga kelgan jarayon va hodisalar. Tabiiy omillar — zilzila, sel, koʻchki, suv toshqini, kuchli shamol. Tarqalgan maydoniga koʻra muammolar uch guruhga boʻlinadi. Sayyoraviy — butun Yerga taʼsir qiladi: issiqxona samarasi va iqlim isishi, ozon tuynugi, okean sathining koʻtarilishi, choʻllashish; ularni barcha davlatlar birgalikda hal qilishi kerak. Regional — bir necha davlat hududini qamraydi; masalan, Orol va Orolboʻyi muammosi, uni havzadagi barcha davlatlar hamkorlikda hal etishi lozim. Lokal — bir mamlakatdagi kichik hududda inson faoliyati tufayli paydo boʻladi.",
      easy: "Muammolar: sayyoraviy (iqlim isishi, ozon tuynugi), regional (Orol), lokal (bitta hudud).",
      draw: [
        { t: 'title', text: 'Geoekologik muammo turlari' },
        { t: 'box', id: 's', x: 4, y: 20, w: 28, h: 16, text: 'Sayyoraviy: iqlim isishi', color: 'red' },
        { t: 'box', id: 'r', x: 36, y: 20, w: 28, h: 16, text: 'Regional: Orol', color: 'orange' },
        { t: 'box', id: 'l', x: 68, y: 20, w: 28, h: 16, text: 'Lokal: bitta hudud', color: 'green' },
        { t: 'arrow', from: 's', to: 'r' },
        { t: 'arrow', from: 'r', to: 'l' }
      ],
      next: 'Lokal muammolar va yechim'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻzbekistondagi lokal muammolar kelib chiqishiga koʻra guruhlanadi: yirik shahar va sanoat hududlarida havoning ifloslanishi; suvdan intensiv foydalanish — chuchuk suv tanqisligi, zovur suvlarining koʻllarda toʻplanishi; yerdan intensiv foydalanish — eroziya, shoʻrlanish, yaylovlarning buzilishi; konchilik chiqindilari; chorvani haddan tashqari boqish va daraxtlarni kesish; zaharli kimyoviy moddalar bilan ifloslanish. Muammolarni oʻrganishda uchta prinsip qoʻllaniladi: hududiy — muammoning tarqalish arealini aniqlaydi; geotizimli — hududning tabiiy tuzilishi va resurslarini koʻrsatadi; ekologik — tirik organizmlar va muhit munosabatini oʻrganadi. Yechim — buzilgan tabiiy muvozanatni imkon qadar tiklash; Orol muammosida birinchi navbatda havzaga yetarli va toza suv kelishini taʼminlash kerak.",
      easy: "Lokal muammolar: havo ifloslanishi, shoʻrlanish, eroziya, suv tanqisligi; prinsiplar: hududiy, geotizimli, ekologik.",
      draw: [
        { t: 'title', text: 'Oʻzbekistondagi lokal muammolar' },
        { t: 'list', x: 4, y: 18, items: ['havoning ifloslanishi (shaharlar)', 'chuchuk suv tanqisligi', 'eroziya va shoʻrlanish', 'yaylovlarning buzilishi', 'konchilik chiqindilari', 'zaharli kimyoviy moddalar'] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Geoekologik muammo — tabiiy va antropogen omillar tufayli inson va tabiat orasidagi muvozanatning buzilishi.',
    'Maydoniga koʻra muammolar sayyoraviy (iqlim isishi, ozon tuynugi), regional (Orol va Orolboʻyi) va lokal turlarga boʻlinadi.',
    'Muammolar hududiy, geotizimli va ekologik prinsiplar asosida oʻrganiladi; yechim — tabiiy muvozanatni imkon qadar tiklash va tabiat qonunlarini hisobga olish.'
  ],
  questions: [
    {
      id: 'g33q1',
      prompt: 'Muammoni turiga ajrating.',
      hint: 'Orol — regional.',
      explanation: 'Sayyoraviy — iqlim isishi, ozon tuynugi; regional — Orol va Orolboʻyi; lokal — bir tumandagi yerlarning shoʻrlanishi, shahar havosining ifloslanishi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 's', label: 'sayyoraviy' }, { id: 'r', label: 'regional' }, { id: 'l', label: 'lokal' }],
          items: [
            { emoji: '🌡️', label: 'iqlim isishi', bin: 's' },
            { emoji: '🕳️', label: 'ozon tuynugi', bin: 's' },
            { emoji: '🏜️', label: 'Orol va Orolboʻyi muammosi', bin: 'r' },
            { emoji: '🧂', label: 'bir tumandagi yerlarning shoʻrlanishi', bin: 'l' },
            { emoji: '🏭', label: 'zavod atrofidagi havo ifloslanishi', bin: 'l' }
          ]
        }
      }
    },
    {
      id: 'g33q2',
      prompt: 'Orol muammosi qaysi turdagi geoekologik muammo?',
      hint: 'Bir necha davlat.',
      explanation: 'Regional — Orol havzasidagi bir necha davlatga tegishli.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['regional', 'sayyoraviy', 'lokal', 'kosmik'], answerIndex: 0 } }
    },
    {
      id: 'g33q3',
      prompt: 'Geoekologik muammolarning tabiiy omillarini tanlang.',
      hint: 'Inson ishtirokisiz.',
      explanation: 'Zilzila, sel, koʻchki, suv toshqini — tabiiy omillar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'zilzila', correct: true },
            { label: 'sel', correct: true },
            { label: 'koʻchki', correct: true },
            { label: 'zavod chiqindilari' }
          ]
        }
      }
    },
    {
      id: 'g33q4',
      prompt: 'Prinsipni vazifasi bilan juftlang.',
      hint: 'Hududiy — areal.',
      explanation: 'Hududiy — tarqalish arealini aniqlaydi; geotizimli — tabiiy tuzilish va resurslarni koʻrsatadi; ekologik — organizm va muhit munosabatini oʻrganadi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'hududiy prinsip', right: 'tarqalish arealini aniqlaydi' },
            { left: 'geotizimli prinsip', right: 'tabiiy tuzilishni koʻrsatadi' },
            { left: 'ekologik prinsip', right: 'organizm va muhit munosabati' }
          ]
        }
      }
    },
    {
      id: 'g33q5',
      prompt: 'Orol muammosini hal qilishda birinchi navbatda nima zarur?',
      hint: 'Suv.',
      explanation: 'Havzaga yetarli miqdorda toza suv kelishini taʼminlash.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yetarli va toza suv kelishini taʼminlash', 'yangi kanallar qazib suvni olib ketish', 'paxta maydonlarini kengaytirish', 'qumlarni dengizga toʻkish'], answerIndex: 0 } }
    },
    {
      id: 'g33q6',
      prompt: 'Yerdan intensiv foydalanish bilan bogʻliq muammolarni tanlang.',
      hint: 'Tuproq.',
      explanation: 'Eroziya, shoʻrlanish, yaylovlarning buzilishi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'eroziya', correct: true },
            { label: 'shoʻrlanish', correct: true },
            { label: 'yaylovlarning buzilishi', correct: true },
            { label: 'ozon tuynugi' }
          ]
        }
      }
    },
    {
      id: 'g33q7',
      prompt: 'Sayyoraviy muammolarni qanday hal qilish mumkin?',
      hint: 'Hamma birga.',
      explanation: 'Barcha davlatlar birlashib, yagona dastur asosida harakat qilishi kerak.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['barcha davlatlar birgalikda, yagona dastur asosida', 'faqat bitta davlat kuchi bilan', 'ularni eʼtiborsiz qoldirib', 'faqat lokal choralar bilan'], answerIndex: 0 } }
    },
    {
      id: 'g33q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Muvozanatni asl holiga qaytarib boʻlmaydi.',
      explanation: 'Buzilgan muvozanatni dastlabki holatiga yaqinlashtirish mumkin, lekin toʻliq asl holiga qaytarib boʻlmaydi; lokal muammolarning yechimi nisbatan soddaroq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Lokal muammolar odatda inson xoʻjalik faoliyati bilan bogʻliq.', value: true },
            { text: 'Issiqxona samarasi — sayyoraviy geoekologik muammo.', value: true },
            { text: 'Buzilgan tabiiy muvozanatni toʻliq asl holiga qaytarish mumkin.', value: false },
            { text: 'Regional muammolar faqat bitta tumanni qamraydi.', value: false }
          ]
        }
      }
    }
  ]
};
