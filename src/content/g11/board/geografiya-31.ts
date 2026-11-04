import type { BoardLesson } from './types';

export const GEO10 = { kicker: '10-bob', title: 'Oʻzbekiston Respublikasi' };

/** Darslik: Geografiya 10, 31-§ (137–140-betlar) — Oʻzbekistonning geografik oʻrni, chegaralari, mikro-, mezo- va makroiqtisodiy geografik oʻrni, siyosiy geografik oʻrni va geosiyosiy muammolar. */
export const GEO_31: BoardLesson = {
  n: 31,
  label: '31',
  group: GEO10,
  title: 'Oʻzbekistonning geosiyosiy oʻrni',
  section: '31-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oʻzbekiston 1992-yil 2-martda BMT ga aʼzo boʻlgan. U Markaziy Osiyoning deyarli qoq oʻrtasida joylashgan: hududi gʻarbdan sharqqa 1425 km, shimoldan janubga 930 km choʻzilgan. Eng baland nuqtasi — Hisor tizmasidagi Hazrat Sulton choʻqqisi (4643 m), eng past nuqtasi — Mingbuloq botigʻi (dengiz sathidan 12 m past). Davlat chegarasining umumiy uzunligi 6221 km; eng uzun chegara Qozogʻiston bilan — umumiy uzunlikning qariyb uchdan biri; undan keyin Turkmaniston, Tojikiston, Qirgʻiziston, eng qisqasi — Afgʻoniston bilan (137 km). Oʻzbekiston mintaqaning barcha davlatlari bilan chegaradosh — shu tufayli u ular orasida bogʻlovchi halqa vazifasini oʻtaydi.",
      easy: "BMT ga 1992-yilda kirgan; 1425 × 930 km; Hazrat Sulton 4643 m; chegara 6221 km, eng uzuni — Qozogʻiston bilan.",
      draw: [
        { t: 'title', text: 'Chegaralar (darslik)' },
        { t: 'bars', x: 4, y: 18, w: 90, h: 44, items: [{ label: 'Qozogʻiston', value: 2203 }, { label: 'Turkmaniston', value: 1721 }, { label: 'Tojikiston', value: 1161 }, { label: 'Qirgʻiziston', value: 1069 }, { label: 'Afgʻoniston', value: 137 }] },
        { t: 'text', x: 4, y: 68, text: 'Jami 6221 km', size: 's', color: 'blue' }
      ],
      next: 'Geografik oʻrin turlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Iqtisodiy geografik oʻrin uch darajada baholanadi. Mikro oʻrin — qoʻshnilarga nisbatan — juda qulay: Oʻzbekiston barcha qoʻshnilari bilan avtomobil, temir yoʻl va quvurlar orqali bogʻlangan. Mezo oʻrin — yaqin mintaqalarga nisbatan, masalan Rossiya, Kavkaz, Eron, Afgʻoniston — oʻrtacha qulay. Makro oʻrin — butun dunyoga nisbatan — noqulay, chunki dengizga chiqish uchun kamida ikki davlat hududidan oʻtish kerak. Siyosiy geografik jihatdan Oʻzbekiston Yevrosiyoning ichki qismi — Xartlend bilan dengizga yaqin Rimlend tutashgan hududda joylashgan. Hal qilinishi kerak boʻlgan masalalar: transchegaraviy daryolar, eksklavlar — davlatning asosiy hududidan ajralib qolgan yerlar va chegaralarni aniqlashtirish — delimitatsiya. Oʻzbekiston MDH va SHHT faoliyatida qatnashadi.",
      easy: "Mikro oʻrin — qulay, mezo — oʻrtacha, makro — noqulay (dengizga chiqish uchun 2 davlatdan oʻtish kerak).",
      draw: [
        { t: 'title', text: 'Iqtisodiy geografik oʻrin' },
        { t: 'box', id: 'mi', x: 4, y: 20, w: 28, h: 14, text: 'Mikro: qulay', color: 'green' },
        { t: 'box', id: 'me', x: 36, y: 20, w: 28, h: 14, text: 'Mezo: oʻrtacha', color: 'orange' },
        { t: 'box', id: 'ma', x: 68, y: 20, w: 28, h: 14, text: 'Makro: noqulay', color: 'red' },
        { t: 'arrow', from: 'mi', to: 'me' },
        { t: 'arrow', from: 'me', to: 'ma' },
        { t: 'text', x: 4, y: 46, text: 'Xartlend va Rimlend tutashgan hudud', size: 's', color: 'purple' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Oʻzbekiston Markaziy Osiyoning markazida; BMT ga 1992-yilda aʼzo boʻlgan; chegarasi 6221 km, eng uzun chegara — Qozogʻiston bilan.',
    'Mikroiqtisodiy geografik oʻrin qulay, mezo oʻrin oʻrtacha, makro oʻrin noqulay — dengizga chiqish uchun kamida ikki davlatdan oʻtish kerak.',
    'Siyosiy jihatdan Oʻzbekiston Xartlend va Rimlend tutashgan hududda; transchegaraviy daryolar, eksklavlar va delimitatsiya — hal etilishi kerak boʻlgan masalalar.'
  ],
  questions: [
    {
      id: 'g31q1',
      prompt: 'Oʻzbekiston qaysi davlat bilan eng uzun chegaraga ega?',
      hint: 'Shimolda.',
      explanation: 'Qozogʻiston — umumiy chegaraning qariyb uchdan biri.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Qozogʻiston', 'Turkmaniston', 'Tojikiston', 'Afgʻoniston'], answerIndex: 0 } }
    },
    {
      id: 'g31q2',
      prompt: 'Oʻzbekiston BMT ga qaysi yilda aʼzo boʻlgan?',
      hint: 'Mustaqillikdan keyingi yil.',
      explanation: '1992-yil 2-mart.',
      widget: { type: 'number_answer', props: { answer: 1992, unit: 'yil' } }
    },
    {
      id: 'g31q3',
      prompt: 'Geografik oʻrin turini bahosi bilan juftlang.',
      hint: 'Makro — noqulay.',
      explanation: 'Mikro — qulay; mezo — oʻrtacha qulay; makro — noqulay.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'mikro oʻrin', right: 'qulay' },
            { left: 'mezo oʻrin', right: 'oʻrtacha' },
            { left: 'makro oʻrin', right: 'noqulay' }
          ]
        }
      }
    },
    {
      id: 'g31q4',
      prompt: 'Oʻzbekistonning eng baland nuqtasi qaysi?',
      hint: 'Hisor tizmasida.',
      explanation: 'Hazrat Sulton choʻqqisi — 4643 m.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Hazrat Sulton choʻqqisi', 'Mingbuloq botigʻi', 'Chimyon', 'Katta Chimyon'], answerIndex: 0 } }
    },
    {
      id: 'g31q5',
      prompt: 'Qoʻshnilarni chegara uzunligi boʻyicha uzunidan qisqasiga tartiblang.',
      hint: 'Afgʻoniston — eng qisqa.',
      explanation: 'Qozogʻiston → Turkmaniston → Tojikiston → Qirgʻiziston → Afgʻoniston.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'Qozogʻiston' }, { label: 'Turkmaniston' }, { label: 'Tojikiston' }, { label: 'Qirgʻiziston' }, { label: 'Afgʻoniston' }] }
      }
    },
    {
      id: 'g31q6',
      prompt: '«Eksklav» nima?',
      hint: 'Ajralib qolgan yer.',
      explanation: 'Davlat hududining asosiy qismidan boshqa davlat hududi bilan ajralib turgan yer.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['asosiy hududdan boshqa davlat hududi bilan ajralgan yer', 'chegarani aniqlashtirish', 'erkin iqtisodiy zona', 'transchegaraviy daryo'], answerIndex: 0 } }
    },
    {
      id: 'g31q7',
      prompt: 'Oʻzbekiston makroiqtisodiy geografik oʻrnining noqulayligi sababi nima?',
      hint: 'Dengiz.',
      explanation: 'Dengizga chiqish uchun kamida ikki davlat hududidan oʻtish kerak.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['dengizga chiqish uchun kamida 2 davlatdan oʻtish kerak', 'qoʻshnilari kam', 'hududi juda kichik', 'togʻlar yoʻqligi'], answerIndex: 0 } }
    },
    {
      id: 'g31q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Delimitatsiya — chegara.',
      explanation: 'Delimitatsiya — chegara chizigʻini aniqlashtirish; Oʻzbekiston Markaziy Osiyoning barcha davlatlari bilan chegaradosh.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Delimitatsiya — chegara chizigʻini aniqlashtirib mustahkamlash.', value: true },
            { text: 'Oʻzbekiston Markaziy Osiyoning barcha davlatlari bilan chegaradosh.', value: true },
            { text: 'Oʻzbekistonning eng past nuqtasi — Hazrat Sulton choʻqqisi.', value: false },
            { text: 'Oʻzbekiston Kaspiy dengiziga tutashgan.', value: false }
          ]
        }
      }
    }
  ]
};
