import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 19-mavzu (85–89-betlar) — Hindiston: N. Rao islohotlari, IT sohasi, A. B. Vajpai, M. Singx, N. Modi; demografik va ijtimoiy muammolar, tashqi siyosat. */
export const TARIX_119: BoardLesson = {
  n: 119,
  label: '19',
  group: JH2,
  title: '1991–2017-yillarda Hindiston Respublikasi',
  section: 'Jahon tarixi, 19-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1990-yillar boshida Hindiston iqtisodiyoti ogʻir ahvolda edi: oʻsish deyarli toʻxtadi, inflyatsiya va ishsizlik oshdi; 1991-yilda bosh vazir Rajiv Gandi terrorchi tomonidan oʻldirildi. Hokimiyatga kelgan Narasimxa Rao hukumati bozor islohotlarining yangi bosqichini boshladi: davlat sektori qisqardi, yirik korxonalar xususiylashtirildi, rupiya devalvatsiya qilindi, soliq islohoti oʻtkazildi. 1990-yillarda YIM bir necha barobar oshdi, 1992-yildan Hindiston gʻalla eksport qila boshladi. Kompyuter dasturlari eksporti yiliga milliardlab dollar keltirmoqda: dasturchilar soni boʻyicha Hindiston AQSHdan keyin ikkinchi oʻrinda.",
      easy: "1991 — N. Rao islohotlari: xususiylashtirish, devalvatsiya; 1992 — gʻalla eksporti; dasturchilar soni — 2-oʻrin.",
      draw: [
        { t: 'title', text: 'Rao islohotlari' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'xususiylashtirish', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'devalvatsiya', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'YIM oʻsishi', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'IT: dasturchilar soni — dunyoda 2-oʻrin', size: 's', color: 'blue' }
      ],
      next: 'Zamonaviy Hindiston'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1998-yilda bosh vazir boʻlgan Atal Bixari Vajpai davlat monopoliyalarini bekor qildi, soliqlarni pasaytirdi va saylov islohotlarini oʻtkazdi; 2000-yilda shimoli-gʻarbda uchta yangi shtat tuzildi. Ammo erkinlashuv yoshlar ishsizligini oshirdi va 2004-yilda Hindiston Milliy Kongressi gʻolib chiqib, hukumatni Manmoxan Singx boshqardi. 2014-yildan bosh vazir Narendra Modi islohotlarni davom ettirmoqda. Hindiston rivojlanishining hal qiluvchi omili — demokratik yoʻl. Muammolar ham katta: 2017-yil oxirida aholi 1 milliard 350 milliondan oshdi, 400 million kishi qashshoq, aholining qariyb uchdan biri savodsiz; etnik va diniy kelishmovchiliklar bor.",
      easy: "Vajpai (1998) → M. Singx (2004) → N. Modi (2014); aholi > 1,35 mlrd; asosiy muammo — demografiya va qashshoqlik.",
      draw: [
        { t: 'title', text: 'Bosh vazirlar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'bosh vazir'], ['1991', 'Narasimxa Rao'], ['1998', 'Atal Bixari Vajpai'], ['2004', 'Manmoxan Singx'], ['2014', 'Narendra Modi']] },
        { t: 'text', x: 4, y: 52, text: 'Aholi (2017): > 1 mlrd 350 mln', size: 's', color: 'red' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1991-yildan N. Rao hukumati bozor islohotlarini chuqurlashtirdi; 1990-yillarda YIM bir necha barobar oshdi, Hindiston gʻalla va kompyuter dasturlari eksportchisiga aylandi.',
    'A. B. Vajpai (1998) iqtisodni yanada erkinlashtirdi, M. Singx (2004) kambagʻallarni qoʻllashga eʼtibor berdi, 2014-yildan N. Modi islohotlarni davom ettirmoqda.',
    'Hindiston demokratik yoʻldan rivojlanmoqda va yetakchi davlatga aylanishni maqsad qilgan; asosiy muammolar — aholining tez oʻsishi, qashshoqlik, savodsizlik.'
  ],
  questions: [
    {
      id: 'j19q1',
      prompt: 'Bosh vazirlarni tartib boʻyicha joylashtiring.',
      hint: 'Rao — 1991.',
      explanation: 'N. Rao → A. B. Vajpai → M. Singx → N. Modi.',
      widget: { type: 'order_line', props: { items: [{ label: 'Narasimxa Rao' }, { label: 'Atal Bixari Vajpai' }, { label: 'Manmoxan Singx' }, { label: 'Narendra Modi' }] } }
    },
    {
      id: 'j19q2',
      prompt: 'N. Rao hukumati islohotlarini tanlang.',
      hint: 'Bozor islohotlari.',
      explanation: 'Davlat sektorini qisqartirish, xususiylashtirish, rupiya devalvatsiyasi, soliq islohoti.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'yirik korxonalarni xususiylashtirish', correct: true },
            { label: 'rupiya devalvatsiyasi', correct: true },
            { label: 'soliq islohoti', correct: true },
            { label: 'barcha korxonalarni davlatlashtirish' }
          ]
        }
      }
    },
    {
      id: 'j19q3',
      prompt: 'Hindiston gʻalla eksport qilishni qaysi yildan boshlagan?',
      hint: 'Rao islohotlaridan bir yil keyin.',
      explanation: '1992-yildan.',
      widget: { type: 'number_answer', props: { answer: 1992, unit: 'yil' } }
    },
    {
      id: 'j19q4',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Devalvatsiya — kurs pasayishi.',
      explanation: 'Devalvatsiya — milliy valyuta kursini pasaytirish; xususiylashtirish — davlat mulkini xususiyga berish; monopoliya — bir subyektning yakka hukmronligi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'devalvatsiya', right: 'milliy valyuta kursini pasaytirish' },
            { left: 'xususiylashtirish', right: 'davlat mulkini xususiyga berish' },
            { left: 'monopoliya', right: 'bozorda yakka hukmronlik' }
          ]
        }
      }
    },
    {
      id: 'j19q5',
      prompt: 'Kompyuter dasturchilari soni boʻyicha Hindiston dunyoda nechanchi oʻrinda?',
      hint: 'AQSHdan keyin.',
      explanation: 'Ikkinchi oʻrinda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['birinchi', 'ikkinchi', 'beshinchi', 'oʻninchi'], answerIndex: 1 } }
    },
    {
      id: 'j19q6',
      prompt: 'Zamonaviy Hindistonning ijtimoiy muammolarini tanlang.',
      hint: 'Aholi bilan bogʻliq.',
      explanation: 'Aholining tez oʻsishi, qashshoqlik, savodsizlik, etnik va diniy kelishmovchiliklar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'aholining tez oʻsishi', correct: true },
            { label: 'qashshoqlik', correct: true },
            { label: 'savodsizlik', correct: true },
            { label: 'aholining kamayishi' }
          ]
        }
      }
    },
    {
      id: 'j19q7',
      prompt: 'Darslikka koʻra Hindiston rivojlanishining hal qiluvchi omili nima?',
      hint: 'Siyosiy tizim.',
      explanation: 'Mamlakatning demokratik yoʻldan rivojlanishi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['demokratik yoʻl', 'neft zaxiralari', 'mustamlakalar', 'yagona partiya tizimi'], answerIndex: 0 } }
    },
    {
      id: 'j19q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Modi — 2014.',
      explanation: 'N. Modi 2014-yilda bosh vazir boʻlgan; Hindiston BMT Xavfsizlik Kengashining doimiy aʼzosi boʻlishga intilmoqda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'N. Modi 2014-yilda bosh vazir boʻlgan.', value: true },
            { text: 'Hindiston BMT Xavfsizlik Kengashining doimiy aʼzosi boʻlishga intilmoqda.', value: true },
            { text: 'Hindiston allaqachon BMT XKning doimiy aʼzosi.', value: false },
            { text: '2017-yilda Hindiston aholisi 500 million edi.', value: false }
          ]
        }
      }
    }
  ]
};
