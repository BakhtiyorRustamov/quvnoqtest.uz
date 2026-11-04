import type { BoardLesson } from './types';
import { UZ8 } from './tarix-17';

/** Darslik: Oʻzbekiston tarixi 11, 20-mavzu (124–128-betlar) — Yaponiya, Hindiston va Koreya Respublikasi bilan munosabatlar, Janubi-Sharqiy Osiyo. */
export const TARIX_20: BoardLesson = {
  n: 20,
  label: '20',
  group: UZ8,
  title: 'Yaponiya, Hindiston va Koreya bilan aloqalar',
  section: 'Oʻzbekiston tarixi, 20-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Tokiodagi Soka universiteti hududida 2004-yilda Alisher Navoiyga haykal oʻrnatilgan. Bu Oʻzbekistonning Sharq yoʻnalishidagi doʻstlik belgisi. Yaponiya, Hindiston va Koreya Respublikasi bilan diplomatik munosabatlar 1992-yilda oʻrnatilgan. Bugun Oʻzbekistonda Koreya sarmoyasi bilan 400 dan ortiq, Hindiston sarmoyasi bilan 60 dan ortiq korxona ishlaydi.",
      easy: "Uch Osiyo hamkori; Koreya — 400+ korxona, Hindiston — 60+ korxona.",
      draw: [
        { t: 'title', text: 'Sarmoyali korxonalar' },
        { t: 'bars', x: 6, y: 18, w: 56, h: 34, items: [{ label: 'Koreya', value: 400 }, { label: 'Hindiston', value: 60 }] },
        { t: 'text', x: 66, y: 30, text: 'Tokioda Navoiy', size: 's', color: 'purple' },
        { t: 'text', x: 66, y: 38, text: 'haykali — 2004', size: 's', color: 'purple' }
      ],
      next: 'Muhim voqealar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yaponiya bilan 2002-yilda doʻstlik va strategik sheriklik haqida qoʻshma bayonot imzolandi, 2015-yilda Bosh vazir Sindzo Abe tashrifi chogʻida 8,5 milliard dollardan ortiq qoʻshma loyihalar kelishildi. Hindiston bilan munosabatlar strategik sheriklik darajasida; Islom Karimovning birinchi xorijiy rasmiy tashrifi 1991-yil avgustda aynan Hindistonga boʻlgan. Koreya bilan 2014-yilda strategik sheriklikni chuqurlashtirish deklaratsiyasi imzolandi, 2017-yil noyabrda Prezident davlat tashrifi bilan Seulda boʻldi.",
      easy: "Yaponiya — 2002, 2015 (8,5 mlrd $); Hindiston — ilk tashrif 1991; Koreya — 2014, 2017.",
      draw: [
        { t: 'title', text: 'Muhim voqealar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1991', 'ilk tashrif — Hindistonga'], ['2002', 'Yaponiya: strategik sheriklik'], ['2004', 'Tokioda Navoiy haykali'], ['2014', 'Koreya: deklaratsiya'], ['2015', 'Yaponiya: 8,5 mlrd $ loyihalar']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Yaponiya, Hindiston va Koreya Respublikasi bilan diplomatik aloqalar 1992-yilda oʻrnatildi; 2004-yilda Tokioda Navoiy haykali oʻrnatildi.',
    'Yaponiya bilan strategik sheriklik bayonoti (2002) va 8,5 mlrd $ lik loyihalar (2015); Hindiston — strategik hamkor, I. Karimovning ilk xorijiy tashrifi (1991) shu davlatga boʻlgan.',
    'Koreya bilan strategik sheriklik chuqurlashtirildi (2014, 2017); Oʻzbekistonda Koreya sarmoyasi bilan 400 dan ortiq korxona ishlaydi.'
  ],
  questions: [
    {
      id: 't20q1',
      prompt: 'Davlatni dalil bilan juftlang.',
      hint: 'Navoiy haykali — Tokio.',
      explanation: 'Yaponiya — Tokioda Navoiy haykali; Hindiston — I. Karimovning ilk xorijiy tashrifi; Koreya — 400 dan ortiq qoʻshma korxona.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Yaponiya', right: 'Tokioda Navoiy haykali' },
            { left: 'Hindiston', right: 'Karimovning ilk xorijiy tashrifi' },
            { left: 'Koreya Respublikasi', right: '400 dan ortiq qoʻshma korxona' }
          ]
        }
      }
    },
    {
      id: 't20q2',
      prompt: '2015-yilda Yaponiya bilan necha milliard dollardan ortiq qoʻshma loyihalar kelishilgan?',
      hint: 'Kasr son.',
      explanation: '8,5 mlrd $.',
      widget: { type: 'number_answer', props: { answer: 8.5, tolerance: 0.1, unit: 'mlrd $' } }
    },
    {
      id: 't20q3',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Hindistonga tashrif — 1991.',
      explanation: 'Hindistonga ilk tashrif (1991) → Yaponiya bilan strategik sheriklik (2002) → Tokioda Navoiy haykali (2004) → Koreya bilan deklaratsiya (2014).',
      widget: { type: 'order_line', props: { items: [{ label: 'Hindistonga ilk rasmiy tashrif' }, { label: 'Yaponiya bilan strategik sheriklik' }, { label: 'Tokioda Navoiy haykali' }, { label: 'Koreya bilan deklaratsiya' }] } }
    },
    {
      id: 't20q4',
      prompt: 'Oʻzbekistonda qaysi davlat sarmoyasi bilan eng koʻp korxona ishlaydi (mavzudagi uch davlat ichida)?',
      hint: '400 dan ortiq.',
      explanation: 'Koreya Respublikasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Hindiston', 'Koreya Respublikasi', 'Yaponiya', 'teng'], answerIndex: 1 } }
    },
    {
      id: 't20q5',
      prompt: 'Toshkentda 1992-yildan beri qaysi markaz ishlaydi?',
      hint: 'Koreys tili.',
      explanation: 'Koreya taʼlim markazi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Yapon madaniyat uyi', 'Koreya taʼlim markazi', 'Hind kino markazi', 'Xitoy savdo uyi'], answerIndex: 1 } }
    },
    {
      id: 't20q6',
      prompt: 'Janubi-Sharqiy Osiyoning rivojlangan davlatlarini tanlang.',
      hint: 'Darslikda toʻrttasi nomlangan.',
      explanation: 'Indoneziya, Malayziya, Singapur, Tailand.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Singapur', correct: true },
            { label: 'Malayziya', correct: true },
            { label: 'Indoneziya', correct: true },
            { label: 'Tailand', correct: true },
            { label: 'Norvegiya' }
          ]
        }
      }
    },
    {
      id: 't20q7',
      prompt: 'Oʻzbekiston Yaponiya, Hindiston va Koreya bilan diplomatik munosabatlarni qaysi yilda oʻrnatgan?',
      hint: 'Mustaqillikdan keyingi yil.',
      explanation: '1992-yilda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1992', '2002', '2012', '2017'], answerIndex: 0 } }
    },
    {
      id: 't20q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Koreya — 12 oliy darajadagi uchrashuv.',
      explanation: 'Koreya bilan 12 marta oliy darajadagi uchrashuv boʻlgan; Hindiston — strategik hamkor.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Koreya bilan 12 marta oliy darajadagi uchrashuv boʻlgan.', value: true },
            { text: 'Hindiston Oʻzbekistonning strategik hamkori.', value: true },
            { text: 'Navoiy haykali Seulda oʻrnatilgan.', value: false },
            { text: 'Yaponiya bilan aloqalar faqat 2017-yildan boshlangan.', value: false }
          ]
        }
      }
    }
  ]
};
