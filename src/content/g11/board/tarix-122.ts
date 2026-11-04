import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 22-mavzu (98–103-betlar) — Pokiston va Afgʻoniston: hukumatlar almashinuvi, P. Musharraf, iqtisod; Afgʻonistondagi urushlar, tolibonlar, 2001-yildan keyingi davr. */
export const TARIX_122: BoardLesson = {
  n: 122,
  label: '22',
  group: JH2,
  title: 'Pokiston va Afgʻoniston',
  section: 'Jahon tarixi, 22-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1990-yillarda Pokistonda hukumatlar tez-tez almashdi: Benazir Bxutto va Navoz Sharif hukumatlari korrupsiya ayblovlari bilan bir necha bor isteʼfoga chiqarildi. 1999-yil kuzida harbiy toʻntarish natijasida general Parvez Musharraf hokimiyatga keldi. 2001-yil 11-sentabrdan keyin Pokiston AQSH boshchiligidagi terrorizmga qarshi koalitsiyaga qoʻshildi, bu esa mamlakat ichida qarshiliklarga sabab boʻldi va Musharraf isteʼfoga chiqdi. 2008-yilda A. A. Zardariy prezident, 2013-yildan N. Sharif yana bosh vazir boʻldi. Pokiston — agrar-industrial mamlakat; toʻqimachilik, teri, sport buyumlari va gilam eksport qiladi. 2016-yilda Toshkentdagi ShHT sammitida Pokistonni tashkilotga qabul qilish haqida hujjat imzolandi.",
      easy: "Pokiston: Bxutto va Sharif → 1999 — Musharraf → 2008 — Zardariy; 2016 — ShHTga qabul hujjati.",
      draw: [
        { t: 'title', text: 'Pokiston' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1990-yillar', 'Bxutto va Sharif almashdi'], ['1999', 'P. Musharraf hokimiyatda'], ['2008', 'A. A. Zardariy prezident'], ['2013', 'N. Sharif bosh vazir'], ['2016', 'ShHT, Toshkent sammiti']] }
      ],
      next: 'Afgʻoniston'
    },
    {
      kind: 'explain',
      clear: true,
      say: "SSSR tarqalgach Afgʻonistonda vaziyat ogʻirlashdi: 1992-yilda Kobulga mujohidlar kirdi, ammo ular oʻrtasidagi kelishmovchilik yangi urushga aylandi. 1994-yilda tolibonlar harakati paydo boʻldi va 1996-yil sentabrda Kobulni egalladi. Ularning hukmronligi davrida Bomiyondagi V asrga oid Budda haykallari buzib tashlandi, mamlakatda xalqaro terrorchilar, jumladan Usoma bin Lodin oʻrnashdi; BMT sanksiyalar eʼlon qildi. 2001-yil 11-sentabrdan keyin tolibonlar hukumati agʻdarildi va mamlakatga xalqaro kuchlar joylashtirildi. 2002-yilda Loyya jirgada Homid Karzay prezident boʻldi, 2004-yilda qayta saylandi, 2014-yildan Ashraf Gʻani prezident. Mustahkam tinchlik hali oʻrnatilmadi.",
      easy: "Afgʻoniston: 1992 — mujohidlar; 1996 — tolibonlar; 2001 — xalqaro kuchlar; Karzay (2002), Gʻani (2014).",
      draw: [
        { t: 'title', text: 'Afgʻoniston' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: '1992: mujohidlar', color: 'orange' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: '1996: tolibonlar', color: 'red' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: '2002: Karzay', color: 'blue' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: '2014 — Ashraf Gʻani prezident', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Pokistonda 1990-yillarda hukumatlar korrupsiya ayblovlari bilan tez almashdi; 1999-yildan P. Musharraf boshqardi, 2001-yildan keyin Pokiston terrorizmga qarshi koalitsiyaga qoʻshildi.',
    'Afgʻonistonda SSSR tarqalgach mujohidlar oʻrtasida urush boshlandi; 1996-yildan tolibonlar hukmronligi xalqaro yakkalanish va sanksiyalarga olib keldi.',
    '2001-yildan keyin tolibonlar hukumati agʻdarildi; H. Karzay (2002, 2004) va A. Gʻani (2014) davrida ham mustahkam tinchlik oʻrnatilmadi.'
  ],
  questions: [
    {
      id: 'j22q1',
      prompt: 'Afgʻoniston tarixidagi voqealarni tartiblang.',
      hint: 'Mujohidlar — 1992.',
      explanation: 'Kobulga mujohidlar kirdi (1992) → tolibonlar Kobulni egalladi (1996) → xalqaro kuchlar joylashdi (2001) → Karzay prezident (2002) → Gʻani prezident (2014).',
      widget: { type: 'order_line', props: { items: [{ label: 'Kobulga mujohidlar kirdi' }, { label: 'tolibonlar Kobulni egalladi' }, { label: 'xalqaro kuchlar joylashdi' }, { label: 'H. Karzay prezident' }, { label: 'A. Gʻani prezident' }] } }
    },
    {
      id: 'j22q2',
      prompt: 'Faktni davlatga ajrating.',
      hint: 'Loyya jirga — Afgʻoniston.',
      explanation: 'Pokiston — P. Musharraf, ShHTga qabul hujjati, gilam eksporti; Afgʻoniston — Loyya jirga, Bomiyon haykallari, H. Karzay.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'p', label: 'Pokiston' }, { id: 'a', label: 'Afgʻoniston' }],
          items: [
            { emoji: '🎖️', label: 'P. Musharraf', bin: 'p' },
            { emoji: '🤝', label: 'ShHTga qabul hujjati (2016)', bin: 'p' },
            { emoji: '🧶', label: 'gilam eksporti', bin: 'p' },
            { emoji: '🏛️', label: 'Loyya jirga', bin: 'a' },
            { emoji: '🗿', label: 'Bomiyon haykallari', bin: 'a' },
            { emoji: '👤', label: 'H. Karzay', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'j22q3',
      prompt: 'Tolibonlar Kobulni qaysi yilda egallagan?',
      hint: 'Harakat 1994-yilda paydo boʻlgan.',
      explanation: '1996-yil sentabrda.',
      widget: { type: 'number_answer', props: { answer: 1996, unit: 'yil' } }
    },
    {
      id: 'j22q4',
      prompt: '«Loyya jirga» nima?',
      hint: 'Oqsoqollar.',
      explanation: 'Afgʻon qabilalari saylaydigan umumafgʻon oqsoqollar kengashi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['harbiy qoʻmondonlik', 'umumafgʻon oqsoqollar kengashi', 'siyosiy partiya', 'xalqaro tashkilot'], answerIndex: 1 } }
    },
    {
      id: 'j22q5',
      prompt: '1999-yilda Pokistonda harbiy toʻntarish natijasida kim hokimiyatga keldi?',
      hint: 'General.',
      explanation: 'Parvez Musharraf.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Benazir Bxutto', 'Parvez Musharraf', 'Navoz Sharif', 'A. A. Zardariy'], answerIndex: 1 } }
    },
    {
      id: 'j22q6',
      prompt: 'Pokistonning asosiy eksport mahsulotlarini tanlang.',
      hint: 'Yengil sanoat.',
      explanation: 'Toʻqimachilik, teri mahsulotlari, sport buyumlari, gilamlar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'toʻqimachilik', correct: true },
            { label: 'teri mahsulotlari', correct: true },
            { label: 'sport buyumlari', correct: true },
            { label: 'kosmik raketalar' }
          ]
        }
      }
    },
    {
      id: 'j22q7',
      prompt: 'Rahbarni davlati bilan juftlang.',
      hint: 'Gʻani — Afgʻoniston.',
      explanation: 'B. Bxutto — Pokiston bosh vaziri; A. Gʻani — Afgʻoniston prezidenti; A. A. Zardariy — Pokiston prezidenti.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'B. Bxutto', right: 'Pokiston bosh vaziri' },
            { left: 'A. Gʻani', right: 'Afgʻoniston prezidenti' },
            { left: 'A. A. Zardariy', right: 'Pokiston prezidenti' }
          ]
        }
      }
    },
    {
      id: 'j22q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '2003 — Afgʻoniston konstitutsiyasi.',
      explanation: '2003-yilgi Afgʻoniston konstitutsiyasi prezidentlik boshqaruvi va ikki palatali parlamentni joriy etgan; tolibonlar davrida BMT sanksiyalar eʼlon qilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '2003-yilgi konstitutsiya Afgʻonistonda ikki palatali parlamentni joriy etgan.', value: true },
            { text: 'Tolibonlar hukmronligi davrida BMT Afgʻonistonga sanksiyalar eʼlon qilgan.', value: true },
            { text: 'Mujohidlar Kobulni egallagach Afgʻonistonda tinchlik oʻrnatildi.', value: false },
            { text: 'Pokiston terrorizmga qarshi koalitsiyaga qoʻshilmagan.', value: false }
          ]
        }
      }
    }
  ]
};
