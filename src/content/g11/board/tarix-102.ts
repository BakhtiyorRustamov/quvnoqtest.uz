import type { BoardLesson } from './types';
import { JH1 } from './tarix-101';

/** Darslik: Jahon tarixi 11, 2-mavzu (9–14-betlar) — Sharqiy Yevropada demokratik inqiloblar: Polsha, Ruminiya, Germaniyaning birlashishi, Yugoslaviya va Chexoslovakiyaning boʻlinishi, YI va NATOga aʼzolik. */
export const TARIX_102: BoardLesson = {
  n: 102,
  label: '2',
  group: JH1,
  title: 'Sharqiy Yevropada demokratik inqiloblar',
  section: 'Jahon tarixi, 2-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1989-yil noyabrda Berlin devori quladi — yarim asr ikki nemis davlatini ajratib turgan chegara ochildi. 1990-yil sentabrda Moskvada ikki Germaniyani birlashtirish haqidagi shartnoma imzolandi. Shu yillarda butun Sharqiy Yevropada sotsialistik tuzum agʻdarildi: Polshada «Birdamlik» kasaba uyushmasi rahbari Lex Valensa 1990-yilda prezident boʻldi, Ruminiyada esa 1989-yil dekabrda Chaushesku rejimi qurolli qoʻzgʻolon bilan qulatildi.",
      easy: "1989 — Berlin devori quladi; 1990 — Germaniya birlashdi; Polsha va Ruminiyada tuzum oʻzgardi.",
      draw: [
        { t: 'title', text: 'Sotsializmning qulashi' },
        { t: 'table', x: 4, y: 18, rows: [['mamlakat', 'qanday kechdi'], ['Polsha', 'saylovlar, «Birdamlik»'], ['Ruminiya', 'qurolli qoʻzgʻolon'], ['GDR', 'Berlin devori quladi'], ['Chexoslovakiya', 'tinch boʻlinish']] }
      ],
      next: 'Boʻlinishlar va YI'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yugoslaviya 1991–1992-yillarda tarqaldi: Sloveniya, Xorvatiya, Bosniya va Gersegovina, Makedoniya mustaqil boʻldi; Bosniyada 1992–1994-yillarda ogʻir etnik urush boʻldi, Kosovo mojarosiga 1999-yilda NATO aralashdi, 2006-yilda Chernogoriya ham ajraldi. Chexoslovakiya esa tinch yoʻlni tanladi: 1993-yil 1-yanvardan Chexiya va Slovakiya alohida davlat boʻldi. Sharqiy Yevropa davlatlarining koʻpchiligi keyin Yevropa Ittifoqi va NATOga aʼzo boʻldi.",
      easy: "Yugoslaviya — urush bilan tarqaldi; Chexoslovakiya — tinch boʻlindi (1993); koʻpchilik YI va NATOga kirdi.",
      draw: [
        { t: 'title', text: 'Muhim sanalar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1989-yil noyabr', 'Berlin devori quladi'], ['1990', 'Germaniya birlashdi'], ['1991–1992', 'Yugoslaviya tarqaldi'], ['1993-yil 1-yanvar', 'Chexiya va Slovakiya'], ['2006', 'Chernogoriya ajraldi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Sharqiy Yevropada sotsializm turlicha qulatildi: Polshada saylovlar orqali (L. Valensa, 1990), Ruminiyada qurolli qoʻzgʻolon bilan (1989).',
    '1989-yil noyabrda Berlin devori quladi, 1990-yilda Germaniya birlashdi; Yugoslaviya 1991–1992-yillarda etnik mojarolar bilan tarqaldi.',
    'Chexoslovakiya tinch boʻlindi (1993); Sharqiy Yevropa davlatlarining koʻpchiligi Yevropa Ittifoqi va NATOga aʼzo boʻldi.'
  ],
  questions: [
    {
      id: 'j2q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Devor — birinchi.',
      explanation: 'Berlin devori quladi (1989) → Germaniya birlashdi (1990) → Chexiya va Slovakiya ajraldi (1993) → Chernogoriya ajraldi (2006).',
      widget: { type: 'order_line', props: { items: [{ label: 'Berlin devori quladi' }, { label: 'Germaniya birlashdi' }, { label: 'Chexiya va Slovakiya ajraldi' }, { label: 'Chernogoriya Serbiyadan ajraldi' }] } }
    },
    {
      id: 'j2q2',
      prompt: 'Mamlakatni tuzum oʻzgarishi bilan juftlang.',
      hint: 'Ruminiya — qurolli.',
      explanation: 'Polsha — «Birdamlik» va saylovlar; Ruminiya — qurolli qoʻzgʻolon; Chexoslovakiya — tinch boʻlinish.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Polsha', right: '«Birdamlik» va saylovlar' },
            { left: 'Ruminiya', right: 'qurolli qoʻzgʻolon' },
            { left: 'Chexoslovakiya', right: 'tinch boʻlinish' }
          ]
        }
      }
    },
    {
      id: 'j2q3',
      prompt: 'Berlin devori qaysi yilda qulagan?',
      hint: 'Noyabr oyi.',
      explanation: '1989-yilda.',
      widget: { type: 'number_answer', props: { answer: 1989, unit: 'yil' } }
    },
    {
      id: 'j2q4',
      prompt: 'Yugoslaviya tarkibidan chiqqan mustaqil davlatlarni tanlang.',
      hint: '1991–1992.',
      explanation: 'Sloveniya, Xorvatiya, Bosniya va Gersegovina, Makedoniya.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Sloveniya', correct: true },
            { label: 'Xorvatiya', correct: true },
            { label: 'Bosniya va Gersegovina', correct: true },
            { label: 'Makedoniya', correct: true },
            { label: 'Vengriya' }
          ]
        }
      }
    },
    {
      id: 'j2q5',
      prompt: 'Polshada «Birdamlik» kasaba uyushmasiga kim rahbarlik qilgan?',
      hint: '1990-yilda prezident boʻlgan.',
      explanation: 'Lex Valensa.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Ion Iliyesku', 'Lex Valensa', 'N. Chaushesku', 'M. Gorbachyov'], answerIndex: 1 } }
    },
    {
      id: 'j2q6',
      prompt: 'Sotsializm qulagach Sharqiy Yevropada paydo boʻlgan muammolarni tanlang.',
      hint: 'Bozorga tez oʻtish.',
      explanation: 'Inflyatsiya, ishsizlik, turmush darajasining pasayishi, korrupsiya.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'inflyatsiya', correct: true },
            { label: 'ishsizlik', correct: true },
            { label: 'korrupsiya', correct: true },
            { label: 'aholining keskin koʻpayishi' }
          ]
        }
      }
    },
    {
      id: 'j2q7',
      prompt: 'Chexoslovakiya qanday yoʻl bilan ikki davlatga boʻlindi?',
      hint: '1992-yilgi referendum.',
      explanation: 'Tinch yoʻl bilan, referendum asosida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['urush natijasida', 'tinch yoʻl bilan, referendum asosida', 'chet el bosqini bilan', 'davlat toʻntarishi bilan'], answerIndex: 1 } }
    },
    {
      id: 'j2q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '1999 — NATO va Kosovo.',
      explanation: '1999-yilda Kosovo mojarosiga NATO aralashgan; Sharqiy Yevropa davlatlarining koʻpchiligi YIga aʼzo boʻlgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1999-yilda Kosovo mojarosiga NATO aralashgan.', value: true },
            { text: 'Sharqiy Yevropa davlatlarining koʻpchiligi Yevropa Ittifoqiga aʼzo boʻlgan.', value: true },
            { text: 'Germaniya 2000-yilda birlashgan.', value: false },
            { text: 'Yugoslaviya tinch va mojarosiz boʻlingan.', value: false }
          ]
        }
      }
    }
  ]
};
