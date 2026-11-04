import type { BoardLesson } from './types';
import { UZ6 } from './tarix-12';

/** Darslik: Oʻzbekiston tarixi 11, 13-mavzu (85–90-betlar) — sport qonuni, uch bosqichli sport oʻyinlari, kurash va Xalqaro kurash assotsiatsiyasi, Olimpiada yutuqlari, futbol. */
export const TARIX_13: BoardLesson = {
  n: 13,
  label: '13',
  group: UZ6,
  title: 'Jismoniy tarbiya va sportning rivojlanishi',
  section: 'Oʻzbekiston tarixi, 13-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "2016-yilgi Rio-de-Janeyro Olimpiadasi Oʻzbekiston tarixidagi eng sermahsul oʻyinlar boʻldi: bokschilarimiz 7 ta medal, shundan 3 ta oltin olib, boks boʻyicha birinchi oʻrinni egallashdi; ogʻir atlet Ruslan Nuriddinov ham oltin medal yutdi. Bunga sport maktablari tizimi zamin boʻldi: yoshlar uchun uch bosqichli oʻyinlar — maktabda «Umid nihollari», kollejlarda «Barkamol avlod», oliy oʻquv yurtlarida «Universiada» oʻtkazildi.",
      easy: "Rio-2016 — boksda 7 medal; uch bosqich: «Umid nihollari», «Barkamol avlod», «Universiada».",
      draw: [
        { t: 'title', text: 'Uch bosqichli oʻyinlar' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: '«Umid nihollari»', color: 'green' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: '«Barkamol avlod»', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: '«Universiada»', color: 'purple' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'maktab → kollej → oliy oʻquv yurti', size: 's' }
      ],
      next: 'Muhim sanalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1992-yilda «Jismoniy tarbiya va sport toʻgʻrisida»gi qonun qabul qilindi. Milliy kurash jahonga chiqdi: 1998-yilda Toshkentda 28 davlat ishtirokida Xalqaro kurash assotsiatsiyasi tuzildi, 2003-yilda kurash Osiyo oʻyinlari dasturiga kiritildi. 1993-yilda Oʻzbekiston Milliy Olimpiya qoʻmitasi Xalqaro Olimpiya qoʻmitasi tomonidan tan olindi. Futbolda hakam Ravshan Ermatov 2011-yilda dunyoning eng yaxshi hakami deb tan olindi; 2018-yilda 23 yoshgacha boʻlganlar terma jamoasi Osiyo chempioni boʻldi.",
      easy: "1998 — Xalqaro kurash assotsiatsiyasi; 2003 — kurash Osiyo oʻyinlarida; 1993 — Olimpiya qoʻmitasi tan olindi.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1993', 'Milliy Olimpiya qoʻmitasi tan olindi'], ['1998', 'Xalqaro kurash assotsiatsiyasi'], ['2003', 'kurash Osiyo oʻyinlarida'], ['2016', 'Rio: boksda 7 medal'], ['2018', 'U-23 Osiyo chempioni']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1992-yilda sport qonuni qabul qilindi; yoshlar uchun uch bosqichli oʻyinlar — «Umid nihollari», «Barkamol avlod», «Universiada» oʻtkaziladi.',
    'Milliy kurash xalqaro sportga aylandi: 1998-yilda Xalqaro kurash assotsiatsiyasi tuzildi, 2003-yilda kurash Osiyo oʻyinlari dasturiga kirdi.',
    '1993-yilda Milliy Olimpiya qoʻmitasi tan olindi; Rio-2016 — eng sermahsul Olimpiada (boksda 7 medal); futbolda R. Ermatov va U-23 terma jamoasi yutuqlari.'
  ],
  questions: [
    {
      id: 't13q1',
      prompt: 'Musobaqani ishtirokchilari bilan juftlang.',
      hint: 'Universiada — talabalar.',
      explanation: '«Umid nihollari» — maktab oʻquvchilari; «Barkamol avlod» — kollej oʻquvchilari; «Universiada» — talabalar.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«Umid nihollari»', right: 'maktab oʻquvchilari' },
            { left: '«Barkamol avlod»', right: 'kollej oʻquvchilari' },
            { left: '«Universiada»', right: 'talabalar' }
          ]
        }
      }
    },
    {
      id: 't13q2',
      prompt: 'Rio-2016 Olimpiadasida oʻzbek bokschilari nechta medal yutishgan?',
      hint: '3 oltin, 2 kumush, 2 bronza.',
      explanation: '7 ta medal.',
      widget: { type: 'number_answer', props: { answer: 7, unit: 'ta' } }
    },
    {
      id: 't13q3',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Sport qonuni — birinchi.',
      explanation: 'Sport qonuni (1992) → Olimpiya qoʻmitasi tan olindi (1993) → Xalqaro kurash assotsiatsiyasi (1998) → kurash Osiyo oʻyinlarida (2003).',
      widget: { type: 'order_line', props: { items: [{ label: 'sport toʻgʻrisidagi qonun' }, { label: 'Milliy Olimpiya qoʻmitasi tan olindi' }, { label: 'Xalqaro kurash assotsiatsiyasi' }, { label: 'kurash Osiyo oʻyinlarida' }] } }
    },
    {
      id: 't13q4',
      prompt: 'Xalqaro kurash assotsiatsiyasi qayerda tuzilgan?',
      hint: '1998-yil, 28 davlat.',
      explanation: 'Toshkentda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Anqarada', 'Toshkentda', 'Quvaytda', 'Moskvada'], answerIndex: 1 } }
    },
    {
      id: 't13q5',
      prompt: 'Sportchini sport turi bilan juftlang.',
      hint: 'Ermatov — hakam.',
      explanation: 'Ravshan Ermatov — futbol hakami; Ruslan Nuriddinov — ogʻir atletika; Hasanboy Doʻstmatov — boks.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'Ravshan Ermatov' }, b: { label: 'futbol hakami' } },
            { a: { label: 'Ruslan Nuriddinov' }, b: { label: 'ogʻir atletika' } },
            { a: { label: 'Hasanboy Doʻstmatov' }, b: { label: 'boks' } }
          ]
        }
      }
    },
    {
      id: 't13q6',
      prompt: 'Uch bosqichli sport oʻyinlarining maqsadlarini tanlang.',
      hint: 'Sogʻlom turmush va terma jamoa.',
      explanation: 'Sogʻlom turmush tarzini targʻib qilish va terma jamoaga nomzodlar tayyorlash.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'sogʻlom turmush tarzini targʻib qilish', correct: true },
            { label: 'terma jamoaga nomzodlar tayyorlash', correct: true },
            { label: 'sport maktablarini yopish' },
            { label: 'faqat chet ellik sportchilarni jalb qilish' }
          ]
        }
      }
    },
    {
      id: 't13q7',
      prompt: 'Kurash qaysi yilda Osiyo oʻyinlari dasturiga kiritilgan?',
      hint: 'Quvaytdagi assambleya.',
      explanation: '2003-yilda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1992', '1998', '2003', '2016'], answerIndex: 2 } }
    },
    {
      id: 't13q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ermatov — 2011.',
      explanation: 'R. Ermatov 2011-yilda dunyoning eng yaxshi hakami deb tan olingan; 2018-yilda U-23 terma jamoa Osiyo chempioni boʻlgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ravshan Ermatov 2011-yilda dunyoning eng yaxshi hakami deb tan olingan.', value: true },
            { text: '2018-yilda 23 yoshgacha boʻlganlar terma jamoasi Osiyo chempioni boʻlgan.', value: true },
            { text: 'Rio-2016 da boks boʻyicha medal yutilmagan.', value: false },
            { text: 'Milliy Olimpiya qoʻmitasi 2010-yilda tan olingan.', value: false }
          ]
        }
      }
    }
  ]
};
