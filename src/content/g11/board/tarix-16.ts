import type { BoardLesson } from './types';
import { UZ7 } from './tarix-15';

/** Darslik: Oʻzbekiston tarixi 11, 16-mavzu (102–108-betlar) — teatrlar va maʼnaviyat maskanlari, musiqa va raqs, festivallar, YuNESKO nomoddiy merosi, tasviriy sanʼat, kino, adabiyot, muzeylar. */
export const TARIX_16: BoardLesson = {
  n: 16,
  label: '16',
  group: UZ7,
  title: 'Madaniyat va sanʼat',
  section: 'Oʻzbekiston tarixi, 16-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mustaqillik yillarida madaniy hayot jonlandi. Yangi teatrlar, qoʻgʻirchoq teatrlari ochildi, 2001-yilda Oʻzbek akademik drama teatriga «Milliy teatr» maqomi berildi, 2015-yilda Navoiy nomidagi katta teatr qayta taʼmirlanib ochildi. «Turkiston» saroyi (1993), «Oʻzbekiston» xalqaro forumlar saroyi (2009), Milliy kutubxona (2011) qurildi. 1997-yildan Samarqandda har ikki yilda «Sharq taronalari» xalqaro musiqa festivali oʻtkaziladi. Muzeylar soni 73 tadan 450 ga yaqinlashdi.",
      easy: "Yangi teatrlar va saroylar; «Sharq taronalari» (1997); muzeylar 73 → 450.",
      draw: [
        { t: 'title', text: 'Muzeylar soni' },
        { t: 'bars', x: 6, y: 18, w: 48, h: 34, items: [{ label: '1991–1994', value: 73 }, { label: '2017', value: 450 }] },
        { t: 'text', x: 58, y: 26, text: '«Sharq taronalari»', size: 's', color: 'purple' },
        { t: 'text', x: 58, y: 34, text: 'Samarqand, 1997-yildan', size: 's' }
      ],
      next: 'YuNESKO va sanʼat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻzbek madaniyatining bir qancha durdonalari YuNESKO nomoddiy madaniy meros roʻyxatiga kirdi: Shashmaqom va Boysun madaniy muhiti (2008), Navroʻz va Katta ashula (2009), Askiya (2014). 1997-yilda Badiiy akademiya tuzildi, xalq hunarmandlari soliqdan ozod qilindi. 2004-yilda «Oʻzbekkino» milliy agentligi tashkil etildi. Adabiyotda Abdulla Oripov, Erkin Vohidov, Said Ahmad, Muhammad Yusuf kabi ijodkorlar mustaqillik davri adabiyotining yetakchilari boʻldi; 2017-yildan «Yosh kitobxon» tanlovi oʻtkaziladi.",
      easy: "YuNESKO: Shashmaqom, Navroʻz, Katta ashula, Askiya; 2004 — «Oʻzbekkino».",
      draw: [
        { t: 'title', text: 'YuNESKO roʻyxatida' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'meros'], ['2008', 'Shashmaqom, Boysun muhiti'], ['2009', 'Navroʻz, Katta ashula'], ['2014', 'Askiya'], ['2016', 'oʻzbek palovi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Yangi teatrlar, «Turkiston» saroyi, «Oʻzbekiston» forumlar saroyi, Milliy kutubxona qurildi; Navoiy nomidagi katta teatr 2015-yilda qayta ochildi.',
    '«Sharq taronalari» festivali (1997-yildan) xalqaro ahamiyat kasb etdi; Shashmaqom, Navroʻz, Katta ashula, Askiya YuNESKO nomoddiy merosi roʻyxatiga kirdi.',
    'Badiiy akademiya (1997), «Oʻzbekkino» (2004) tuzildi; muzeylar soni 73 tadan 450 ga yaqinlashdi; adabiyotda mustaqillik, Vatan, tarixiy shaxslar mavzulari yetakchi boʻldi.'
  ],
  questions: [
    {
      id: 't16q1',
      prompt: 'YuNESKO roʻyxatiga kirgan merosni yili bilan juftlang.',
      hint: 'Askiya — eng keyin.',
      explanation: 'Shashmaqom — 2008; Navroʻz — 2009; Askiya — 2014.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Shashmaqom', right: '2008' },
            { left: 'Navroʻz', right: '2009' },
            { left: 'Askiya', right: '2014' }
          ]
        }
      }
    },
    {
      id: 't16q2',
      prompt: '«Sharq taronalari» xalqaro musiqa festivali qaysi shaharda oʻtkaziladi?',
      hint: 'Registon.',
      explanation: 'Samarqandda, har ikki yilda bir marta.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Buxoroda', 'Samarqandda', 'Xivada', 'Toshkentda'], answerIndex: 1 } }
    },
    {
      id: 't16q3',
      prompt: '2017-yilda Oʻzbekistonda nechtaga yaqin muzey faoliyat yuritgan?',
      hint: '1991–1994-yillarda — 73.',
      explanation: '450 ga yaqin.',
      widget: { type: 'number_answer', props: { answer: 450, tolerance: 10, unit: 'ta' } }
    },
    {
      id: 't16q4',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: '«Turkiston» — birinchi.',
      explanation: '«Turkiston» saroyi (1993) → «Sharq taronalari» (1997) → «Oʻzbekkino» (2004) → Navoiy teatri qayta ochildi (2015).',
      widget: { type: 'order_line', props: { items: [{ label: '«Turkiston» saroyi' }, { label: '«Sharq taronalari» festivali' }, { label: '«Oʻzbekkino» agentligi' }, { label: 'Navoiy teatri qayta ochildi' }] } }
    },
    {
      id: 't16q5',
      prompt: 'Mustaqillik davri adabiyotining yetakchi ijodkorlarini tanlang.',
      hint: 'Oʻzbekiston qahramonlari.',
      explanation: 'Said Ahmad, Abdulla Oripov, Erkin Vohidov, Muhammad Yusuf.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Abdulla Oripov', correct: true },
            { label: 'Erkin Vohidov', correct: true },
            { label: 'Said Ahmad', correct: true },
            { label: 'Muhammad Yusuf', correct: true },
            { label: 'Lev Tolstoy' }
          ]
        }
      }
    },
    {
      id: 't16q6',
      prompt: 'Muassasani sohasi bilan juftlang.',
      hint: '«Oʻzbekkino» — kino.',
      explanation: '«Oʻzbekkino» — kino; Badiiy akademiya — tasviriy sanʼat; «Oʻzbekraqs» — raqs.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: '«Oʻzbekkino»' }, b: { label: 'kino' } },
            { a: { label: 'Badiiy akademiya' }, b: { label: 'tasviriy sanʼat' } },
            { a: { label: '«Oʻzbekraqs»' }, b: { label: 'raqs' } }
          ]
        }
      }
    },
    {
      id: 't16q7',
      prompt: '2001-yilda Oʻzbek davlat akademik drama teatriga qanday maqom berildi?',
      hint: 'Butun xalqniki.',
      explanation: '«Milliy teatr» maqomi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Xalqaro teatr»', '«Milliy teatr»', '«Bolalar teatri»', '«Harbiy teatr»'], answerIndex: 1 } }
    },
    {
      id: 't16q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Hunarmandlar soliqdan ozod.',
      explanation: 'Xalq hunarmandlari daromad soligʻidan ozod qilingan; 2017-yildan «Yosh kitobxon» tanlovi oʻtkaziladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Xalq hunarmandlari daromad soligʻidan ozod qilingan.', value: true },
            { text: '2017-yildan «Yosh kitobxon» tanlovi oʻtkaziladi.', value: true },
            { text: 'Mustaqillik yillarida muzeylar soni kamaygan.', value: false },
            { text: 'Shashmaqom YuNESKO roʻyxatiga kirmagan.', value: false }
          ]
        }
      }
    }
  ]
};
