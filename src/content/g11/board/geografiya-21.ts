import type { BoardLesson } from './types';
import { GEO6 } from './geografiya-20';

/** Darslik: Geografiya 10, 21-§ (85–90-betlar) — zamonaviy geosiyosiy markazlar (Yevropa, AQSH, Rossiya, Xitoy), integratsion uyushmalar: Yevropa Ittifoqi, MDH, Shanxay hamkorlik tashkiloti. */
export const GEO_21: BoardLesson = {
  n: 21,
  label: '21',
  group: GEO6,
  title: 'Zamonaviy geosiyosiy vaziyat va integratsion uyushmalar',
  section: '21-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "SSSR tarqalgach, ikki qutbli dunyo oʻrnida bir nechta geosiyosiy markaz shakllandi. Yevropa — urushdan keyin hamkorlikda tiklanib, dunyodagi eng kuchli integratsion uyushmalardan biri — Yevropa Ittifoqini tuzdi; hozir u migrantlar oqimi bilan bogʻliq muammolarga ham duch kelmoqda. AQSH 1776-yilda mustaqillikni eʼlon qilgan 13 ta shtatdan iborat edi, keyin hududini kengaytirib, jahonning eng kuchli davlatiga aylandi. Rossiya SSSR tarqalgach ichki muammolarni hal qilish va xalqaro mavqeini tiklashga intilmoqda. Xitoy Den Syaopin islohotlaridan keyin tez rivojlanib, jahon iqtisodiyotidagi ulushi va taʼsirini kengaytirmoqda.",
      easy: "Zamonaviy markazlar: Yevropa (YI), AQSH, Rossiya, Xitoy.",
      draw: [
        { t: 'title', text: 'Geosiyosiy markazlar' },
        { t: 'box', id: 'y', x: 2, y: 22, w: 22, h: 10, text: 'Yevropa', color: 'blue' },
        { t: 'box', id: 'a', x: 26, y: 22, w: 22, h: 10, text: 'AQSH', color: 'red' },
        { t: 'box', id: 'r', x: 50, y: 22, w: 22, h: 10, text: 'Rossiya', color: 'purple' },
        { t: 'box', id: 'x', x: 74, y: 22, w: 22, h: 10, text: 'Xitoy', color: 'orange' },
        { t: 'text', x: 4, y: 46, text: 'ikki qutbli dunyo → bir nechta markaz', size: 's' }
      ],
      next: 'Uyushmalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Globallashuv iqtisodiy integratsiyani — davlatlarning uzoq muddatli hamkorligini kuchaytirdi. Yevropa Ittifoqi 1951-yilda tuzilgan Yevropa koʻmir va poʻlat birlashmasidan boshlangan; unga Germaniya, Fransiya, Italiya, Belgiya, Niderlandiya va Lyuksemburg kirgan; keyin aʼzolar koʻpaydi, 2013-yilda Xorvatiya qoʻshildi, 2016-yilgi referendumda Buyuk Britaniya chiqishni tanladi. YI maqsadi — ichki chegarasiz yagona iqtisodiy makon va yagona valyuta. MDH 1991-yil dekabrda tuzilgan, Oʻzbekiston uning aʼzosi. Shanxay hamkorlik tashkiloti «Shanxay beshligi»dan oʻsib chiqqan: 2001-yilda Oʻzbekiston qoʻshilgach, hozirgi nomini oldi; 2017-yilda Hindiston va Pokiston aʼzo boʻldi. ShHT maqsadi — xavfsizlik, terrorizmga qarshi kurash va iqtisodiy hamkorlik.",
      easy: "Uyushmalar: YI (1951 — koʻmir va poʻlat birlashmasi), MDH (1991), ShHT (2001, Oʻzbekiston aʼzo).",
      draw: [
        { t: 'title', text: 'Integratsion uyushmalar' },
        { t: 'table', x: 4, y: 18, rows: [['uyushma', 'muhim sanalar'], ['Yevropa Ittifoqi', '1951 → 1967 → 2013'], ['MDH', '1991-yil dekabr'], ['ShHT', '1996 → 2001 → 2017']] },
        { t: 'text', x: 4, y: 50, text: 'Oʻzbekiston — MDH va ShHT aʼzosi', size: 's', color: 'blue' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'SSSR tarqalgach dunyoda bir nechta geosiyosiy markaz shakllandi: Yevropa, AQSH, Rossiya va Xitoy.',
    'Yevropa Ittifoqi 1951-yilgi koʻmir va poʻlat birlashmasidan oʻsib chiqqan; uning maqsadi — ichki chegarasiz yagona iqtisodiy makon va yagona valyuta.',
    'Oʻzbekiston MDH (1991) va Shanxay hamkorlik tashkiloti (2001) aʼzosi; ShHT xavfsizlik va iqtisodiy hamkorlikka qaratilgan, 2017-yilda Hindiston va Pokiston qoʻshilgan.'
  ],
  questions: [
    {
      id: 'g21q1',
      prompt: 'ShHT tarixidagi voqealarni tartiblang.',
      hint: '«Shanxay beshligi» — avval.',
      explanation: '«Shanxay beshligi» (1996) → Oʻzbekiston qoʻshildi, ShHT nomi (2001) → Hindiston va Pokiston aʼzo boʻldi (2017).',
      widget: { type: 'order_line', props: { items: [{ label: '«Shanxay beshligi» tuzildi' }, { label: 'Oʻzbekiston qoʻshilib, ShHT nomi olindi' }, { label: 'Hindiston va Pokiston aʼzo boʻldi' }] } }
    },
    {
      id: 'g21q2',
      prompt: 'Yevropa Ittifoqining boshlanishi qaysi birlashma bilan bogʻliq?',
      hint: '1951-yil.',
      explanation: 'Yevropa koʻmir va poʻlat birlashmasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Yevropa koʻmir va poʻlat birlashmasi', 'NATO', 'MDH', 'Shanxay beshligi'], answerIndex: 0 } }
    },
    {
      id: 'g21q3',
      prompt: 'Oʻzbekiston ShHTga qaysi yilda aʼzo boʻlgan?',
      hint: 'XXI asr boshi.',
      explanation: '2001-yilda.',
      widget: { type: 'number_answer', props: { answer: 2001, unit: 'yil' } }
    },
    {
      id: 'g21q4',
      prompt: 'Uyushmani uning maqsadi bilan juftlang.',
      hint: 'YI — yagona valyuta.',
      explanation: 'Yevropa Ittifoqi — yagona iqtisodiy makon va valyuta; ShHT — xavfsizlik va terrorizmga qarshi kurash; MDH — sobiq ittifoq respublikalari hamkorligi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Yevropa Ittifoqi', right: 'yagona iqtisodiy makon va valyuta' },
            { left: 'ShHT', right: 'xavfsizlik va terrorizmga qarshi kurash' },
            { left: 'MDH', right: 'sobiq respublikalar hamkorligi' }
          ]
        }
      }
    },
    {
      id: 'g21q5',
      prompt: '1951-yilgi birlashmaga kirgan davlatlarni tanlang.',
      hint: 'Oltita asoschi.',
      explanation: 'Germaniya, Fransiya, Italiya, Belgiya, Niderlandiya, Lyuksemburg.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Germaniya', correct: true },
            { label: 'Fransiya', correct: true },
            { label: 'Italiya', correct: true },
            { label: 'Belgiya', correct: true },
            { label: 'Buyuk Britaniya' }
          ]
        }
      }
    },
    {
      id: 'g21q6',
      prompt: 'Oʻzbekiston qaysi integratsion uyushmalar aʼzosi?',
      hint: 'Ikkitasi darslikda.',
      explanation: 'MDH va ShHT.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'MDH', correct: true },
            { label: 'ShHT', correct: true },
            { label: 'Yevropa Ittifoqi' },
            { label: 'NATO' }
          ]
        }
      }
    },
    {
      id: 'g21q7',
      prompt: 'Qaysi davlat 2016-yilgi referendumda Yevropa Ittifoqidan chiqishni tanlagan?',
      hint: 'Orol davlat.',
      explanation: 'Buyuk Britaniya.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Buyuk Britaniya', 'Fransiya', 'Xorvatiya', 'Polsha'], answerIndex: 0 } }
    },
    {
      id: 'g21q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'AQSH — 13 shtatdan boshlangan.',
      explanation: 'AQSH 1776-yilda 13 ta shtat sifatida mustaqillikni eʼlon qilgan; MDH 1991-yil dekabrda tuzilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'AQSH 1776-yilda 13 ta shtat sifatida mustaqillikni eʼlon qilgan.', value: true },
            { text: 'MDH 1991-yil dekabrda tuzilgan.', value: true },
            { text: 'Xorvatiya Yevropa Ittifoqining asoschilaridan biri.', value: false },
            { text: 'ShHT faqat sport masalalari bilan shugʻullanadi.', value: false }
          ]
        }
      }
    }
  ]
};
