import type { BoardLesson } from './types';
import { GEO2 } from './geografiya-3';

/** Darslik: Geografiya 10, 9-§ (36–40-betlar) — geotizim tushunchasi (V. B. Sochava), ochiq va yopiq geotizimlar, sayyoraviy, regional va topologik darajalar, landshaft, joy, urochishe, fatsiya. */
export const GEO_9: BoardLesson = {
  n: 9,
  label: '9',
  group: GEO2,
  title: 'Geotizimlar va ularning pogʻonasimonligi',
  section: '9-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Quyi sinflarda «tabiiy kompleks» degan tushunchani oʻrgangansiz. 1963-yilda akademik V. B. Sochava bundan aniqroq tushuncha — geotizimni fanga kiritdi. Geotizim — komponentlari bir-biri bilan tizimli bogʻlangan, modda va energiya almashinuvi orqali yaxlit boʻlgan hudud. U tabiiy, inson tomonidan biroz oʻzgartirilgan yoki kuchli oʻzgartirilgan boʻlishi mumkin. Modda va energiya almashinuviga koʻra geotizimlar ikki xil: yopiq — almashinuv chegaradan chiqmaydi, masalan, geografik qobiq; ochiq — almashinuv chegaradan tashqariga chiqadi, masalan, landshaftlar.",
      easy: "Geotizim (V. B. Sochava, 1963) — yaxlit hududiy tizim; yopiq (geografik qobiq) va ochiq (landshaft) turlari.",
      draw: [
        { t: 'title', text: 'Geotizim turlari' },
        { t: 'box', id: 'y', x: 4, y: 22, w: 42, h: 10, text: 'yopiq: geografik qobiq', color: 'blue' },
        { t: 'box', id: 'o', x: 54, y: 22, w: 42, h: 10, text: 'ochiq: landshaft', color: 'green' },
        { t: 'text', x: 4, y: 46, text: 'Tushunchani 1963-yilda V. B. Sochava kiritgan', size: 's' }
      ],
      next: 'Pogʻonalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Geotizimlar kattaligiga koʻra uch darajaga boʻlinadi. Sayyoraviy — geografik qobiq, eng katta va murakkab geotizim. Regional — materiklar, oʻlkalar, zonalar, provinsiyalar, okruglar, rayonlar. Topologik, yaʼni mahalliy — landshaft, joy, urochishe va fatsiya. Ular «matryoshka» kabi pogʻonasimon joylashgan: kattasi ichida kichiklari. Landshaft — bir xil geologik tuzilish, relyef va iqlimga ega yaxlit geotizim. U joylardan, joylar urochishelardan, urochishelar esa fatsiyalardan iborat. Fatsiya — eng kichik va eng oddiy geotizim, masalan, jarlikning tubi; inson taʼsiri birinchi boʻlib aynan fatsiyalarda seziladi.",
      easy: "Darajalar: sayyoraviy → regional → topologik; landshaft → joy → urochishe → fatsiya (eng kichigi).",
      draw: [
        { t: 'title', text: 'Topologik geotizimlar' },
        { t: 'box', id: 'l', x: 2, y: 22, w: 22, h: 10, text: 'landshaft', color: 'blue' },
        { t: 'box', id: 'j', x: 26, y: 22, w: 22, h: 10, text: 'joy', color: 'green' },
        { t: 'box', id: 'u', x: 50, y: 22, w: 22, h: 10, text: 'urochishe', color: 'orange' },
        { t: 'box', id: 'f', x: 74, y: 22, w: 22, h: 10, text: 'fatsiya', color: 'red' },
        { t: 'arrow', from: 'l', to: 'j' },
        { t: 'arrow', from: 'j', to: 'u' },
        { t: 'arrow', from: 'u', to: 'f' },
        { t: 'text', x: 4, y: 46, text: 'kattadan kichikka: har biri keyingisini oʻz ichiga oladi', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Geotizim — komponentlari tizimli bogʻlangan, modda va energiya almashinuvi orqali yaxlit hududiy tizim; tushunchani 1963-yilda V. B. Sochava kiritgan.',
    'Geotizimlar yopiq (geografik qobiq) va ochiq (landshaftlar) boʻladi; kattaligiga koʻra sayyoraviy, regional va topologik darajalarga boʻlinadi.',
    'Topologik geotizimlar: landshaft → joy → urochishe → fatsiya; fatsiya eng kichik va inson taʼsiriga eng tez beriluvchan geotizim.'
  ],
  questions: [
    {
      id: 'g9q1',
      prompt: 'Topologik geotizimlarni kattadan kichikka tartiblang.',
      hint: 'Eng kichigi — fatsiya.',
      explanation: 'Landshaft → joy → urochishe → fatsiya.',
      widget: { type: 'order_line', props: { items: [{ label: 'landshaft' }, { label: 'joy' }, { label: 'urochishe' }, { label: 'fatsiya' }] } }
    },
    {
      id: 'g9q2',
      prompt: 'Geotizim tushunchasini fanga kim kiritgan?',
      hint: 'Akademik, 1963-yil.',
      explanation: 'V. B. Sochava.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['V. B. Sochava', 'V. V. Dokuchayev', 'A. Gumboldt', 'K. Z. Zokirov'], answerIndex: 0 } }
    },
    {
      id: 'g9q3',
      prompt: 'Geotizimni darajasiga ajrating.',
      hint: 'Materik — regional.',
      explanation: 'Sayyoraviy — geografik qobiq; regional — materik, tabiat zonasi, provinsiya; topologik — landshaft, fatsiya.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 's', label: 'sayyoraviy' }, { id: 'r', label: 'regional' }, { id: 't', label: 'topologik' }],
          items: [
            { emoji: '🌍', label: 'geografik qobiq', bin: 's' },
            { emoji: '🗺️', label: 'materik', bin: 'r' },
            { emoji: '🌾', label: 'tabiat zonasi', bin: 'r' },
            { emoji: '📍', label: 'provinsiya', bin: 'r' },
            { emoji: '🏞️', label: 'landshaft', bin: 't' },
            { emoji: '🔎', label: 'fatsiya', bin: 't' }
          ]
        }
      }
    },
    {
      id: 'g9q4',
      prompt: 'Geotizimni turi bilan juftlang.',
      hint: 'Geografik qobiq — yopiq.',
      explanation: 'Geografik qobiq — yopiq geotizim; landshaft — ochiq geotizim; fatsiya — eng kichik geotizim.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'geografik qobiq', right: 'yopiq geotizim' },
            { left: 'landshaft', right: 'ochiq geotizim' },
            { left: 'fatsiya', right: 'eng kichik geotizim' }
          ]
        }
      }
    },
    {
      id: 'g9q5',
      prompt: 'Geotizim tushunchasi fanga qaysi yilda kiritilgan?',
      hint: 'XX asr oʻrtasi.',
      explanation: '1963-yilda.',
      widget: { type: 'number_answer', props: { answer: 1963, unit: 'yil' } }
    },
    {
      id: 'g9q6',
      prompt: 'Inson xoʻjalik faoliyatining taʼsiri birinchi navbatda qaysi geotizimda seziladi?',
      hint: 'Eng moʻrt.',
      explanation: 'Fatsiyada.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['fatsiya', 'materik', 'geografik qobiq', 'tabiat zonasi'], answerIndex: 0 } }
    },
    {
      id: 'g9q7',
      prompt: 'Landshaftni bir butun qiladigan belgilarni tanlang.',
      hint: 'Bir xil...',
      explanation: 'Bir xil geologik tuzilish, bitta relyef turi, bir xil iqlim.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'bir xil geologik tuzilish', correct: true },
            { label: 'bitta relyef turi', correct: true },
            { label: 'bir xil iqlim', correct: true },
            { label: 'bir xil davlat chegarasi' }
          ]
        }
      }
    },
    {
      id: 'g9q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '«Landshaft» — nemischa soʻz.',
      explanation: '«Landshaft» nemischa soʻz, manzara maʼnosini beradi; inson taʼsiri toʻxtasa, fatsiya avvalgi holatiga qaytishga intiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Landshaft» — nemischa soʻz, «manzara» maʼnosini beradi.', value: true },
            { text: 'Inson taʼsiri toʻxtasa, fatsiya avvalgi holatiga qaytishga intiladi.', value: true },
            { text: 'Geografik qobiq — eng kichik geotizim.', value: false },
            { text: 'Landshaftlar qoʻshni landshaftlar bilan modda almashmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
