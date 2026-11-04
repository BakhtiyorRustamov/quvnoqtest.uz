import type { BoardLesson } from './types';
import { UZ3 } from './tarix-5';

/** Darslik: Oʻzbekiston tarixi 11, 7-mavzu (52–60-betlar) — mustaqillik arafasidagi ijtimoiy ahvol, ijtimoiy himoya yoʻnalishlari, bolali oilalar, keksalar, ona va bola salomatligi, uy-joy qurilishi. */
export const TARIX_7: BoardLesson = {
  n: 7,
  label: '7',
  group: UZ3,
  title: 'Ijtimoiy siyosat va uning bosqichlari',
  section: 'Oʻzbekiston tarixi, 7-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mustaqillik arafasida ijtimoiy ahvol ogʻir edi: aholi tez koʻpayardi, ish joylari yetishmasdi, qishloq aholisining faqat yarmi ichimlik suvi, 17 foizigina tabiiy gaz bilan taʼminlangan, maktab va kasalxonalarning 60 foizi yaroqsiz binolarda edi. Shuning uchun aholini ijtimoiy himoyalash davlat siyosatining bosh yoʻnalishi qilib belgilandi. Uning uch yoʻnalishi: daromadlarni narxlarga moslab oshirish, ichki bozorni himoya qilish va kam taʼminlanganlarni qoʻllab-quvvatlash.",
      easy: "Ahvol ogʻir edi; ijtimoiy himoyaning 3 yoʻnalishi: daromad, ichki bozor, kam taʼminlanganlar.",
      draw: [
        { t: 'title', text: 'Ijtimoiy himoya' },
        { t: 'list', x: 4, y: 20, items: ['daromadlarni oshirish', 'ichki bozorni himoya qilish', 'kam taʼminlanganlarga yordam'] },
        { t: 'text', x: 4, y: 52, text: 'qishloqda: suv ≈ 50 %, gaz — 17 %', size: 's', color: 'red' }
      ],
      next: 'Natijalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1994-yil sentabrdan bolali oilalarga nafaqa mahalla orqali beriladigan boʻldi. 1997-yildan birinchi sinf oʻquvchilariga bepul oʻquv anjomlari beriladi. Yillar nomlari ham ijtimoiy vazifalarni koʻrsatdi: 2007 — «Ijtimoiy himoya yili», 2015 — «Keksalarni eʼzozlash yili», 2016 — «Sogʻlom ona va sogʻlom bola yili». Oʻrtacha umr 1990-yildagi 67 yoshdan 2015-yilda 74 yoshga yetdi. Qishloqlarda namunaviy uylar qurilib, 2018-yil boshida aholi 32,65 million kishiga yetdi.",
      easy: "1994 — nafaqa mahalla orqali; umr 67 → 74 yosh; aholi 32,65 mln (2018).",
      draw: [
        { t: 'title', text: 'Oʻrtacha umr, yosh' },
        { t: 'bars', x: 6, y: 18, w: 50, h: 36, items: [{ label: '1990', value: 67 }, { label: '2015', value: 74 }] },
        { t: 'list', x: 60, y: 22, items: ['2007 — himoya', '2015 — keksalar', '2016 — ona-bola'] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Mustaqillik arafasida ijtimoiy ahvol ogʻir edi: ish joylari, ichimlik suvi, gaz, maktab va kasalxonalar yetishmasdi.',
    'Ijtimoiy himoyaning uch yoʻnalishi: daromadlarni oshirish, ichki bozorni himoya qilish, kam taʼminlanganlarni qoʻllab-quvvatlash; 1994-yildan nafaqalar mahalla orqali beriladi.',
    'Keksalar, ona va bola salomatligi, uy-joy qurilishiga eʼtibor berildi; oʻrtacha umr 67 yoshdan (1990) 74 yoshga (2015) uzaydi.'
  ],
  questions: [
    {
      id: 't7q1',
      prompt: 'Yilni uning nomi bilan juftlang.',
      hint: '2016 — ona va bola.',
      explanation: '2007 — «Ijtimoiy himoya yili»; 2015 — «Keksalarni eʼzozlash yili»; 2016 — «Sogʻlom ona va sogʻlom bola yili».',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '2007', right: '«Ijtimoiy himoya yili»' },
            { left: '2015', right: '«Keksalarni eʼzozlash yili»' },
            { left: '2016', right: '«Sogʻlom ona va sogʻlom bola yili»' }
          ]
        }
      }
    },
    {
      id: 't7q2',
      prompt: '2015-yilda Oʻzbekistonda oʻrtacha umr koʻrish necha yoshni tashkil etgan?',
      hint: '1990-yilda — 67.',
      explanation: '74 yosh.',
      widget: { type: 'number_answer', props: { answer: 74, unit: 'yosh' } }
    },
    {
      id: 't7q3',
      prompt: 'Ijtimoiy himoyaning yoʻnalishlarini tanlang.',
      hint: 'Uchta yoʻnalish.',
      explanation: 'Daromadlarni oshirish, ichki isteʼmol bozorini himoya qilish, kam taʼminlanganlarni qoʻllab-quvvatlash.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'daromadlarni narxlarga moslab oshirish', correct: true },
            { label: 'ichki bozorni himoya qilish', correct: true },
            { label: 'kam taʼminlanganlarni qoʻllab-quvvatlash', correct: true },
            { label: 'pensiyalarni bekor qilish' }
          ]
        }
      }
    },
    {
      id: 't7q4',
      prompt: '1994-yildan bolali oilalarga nafaqa qayerda tayinlanadigan boʻldi?',
      hint: 'Odamlarga eng yaqin tuzilma.',
      explanation: 'Mahalla fuqarolar yigʻinlarida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['vazirlikda', 'mahalla fuqarolar yigʻinida', 'bankda', 'maktabda'], answerIndex: 1 } }
    },
    {
      id: 't7q5',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Nafaqa islohoti — eng oldin.',
      explanation: 'Nafaqa mahalla orqali (1994) → 1-sinfga bepul anjomlar (1997) → «Ijtimoiy himoya yili» (2007) → «Sogʻlom ona va sogʻlom bola yili» (2016).',
      widget: { type: 'order_line', props: { items: [{ label: 'nafaqa mahalla orqali' }, { label: '1-sinfga bepul oʻquv anjomlari' }, { label: '«Ijtimoiy himoya yili»' }, { label: '«Sogʻlom ona va sogʻlom bola yili»' }] } }
    },
    {
      id: 't7q6',
      prompt: '2018-yil 1-yanvar holatiga Oʻzbekiston aholisi qancha boʻlgan?',
      hint: '30 milliondan koʻp.',
      explanation: '32,65 million kishi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['20,7 million', '32,65 million', '45 million', '15 million'], answerIndex: 1 } }
    },
    {
      id: 't7q7',
      prompt: 'Mustaqillik arafasidagi muammolarni tanlang.',
      hint: 'Infratuzilma.',
      explanation: 'Ish joylari kam, qishloqda suv va gaz yetishmasdi, maktab va kasalxonalar yaroqsiz binolarda edi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ish joylari yetishmasligi', correct: true },
            { label: 'qishloqda ichimlik suvi kamligi', correct: true },
            { label: 'maktablar yaroqsiz binolarda', correct: true },
            { label: 'aholining kamayib ketishi' }
          ]
        }
      }
    },
    {
      id: 't7q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Qishloq vrachlik punktlari — 3000 ga yaqin.',
      explanation: 'Mamlakatda 3000 ga yaqin qishloq vrachlik punkti ishlaydi; 1990-yilda qishloqda gaz bilan taʼminlanish atigi 17 % edi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Mamlakatda 3000 ga yaqin qishloq vrachlik punkti bor.', value: true },
            { text: 'Mustaqillik arafasida qishloqning faqat 17 % tabiiy gaz bilan taʼminlangan.', value: true },
            { text: 'Oʻrtacha umr 1990–2015-yillarda qisqargan.', value: false },
            { text: 'Ijtimoiy himoya davlat siyosatida ikkinchi darajali vazifa edi.', value: false }
          ]
        }
      }
    }
  ]
};
