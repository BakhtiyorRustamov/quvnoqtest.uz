import type { BoardLesson } from './types';
import { GEO2 } from './geografiya-3';

/** Darslik: Geografiya 10, 5-§ (20–24-betlar) — Yer taraqqiyoti bosqichlari, geoxronologiya, geoxronologik shkala, tokembriy va fanerozoy. */
export const GEO_5: BoardLesson = {
  n: 5,
  label: '5',
  group: GEO2,
  title: 'Yer yuzi tabiatining rivojlanish tarixi',
  section: '5-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yer murakkab taraqqiyot yoʻlini bosib oʻtgan. Olimlar toʻrt bosqichni ajratadi. Astronomik bosqichda gaz va chang massasi quyuqlashib, Yer sharsimon shaklga ega boʻldi. Vulqon va tektonik harakatlar boshlanishi bilan geologik bosqich boshlandi: materiklar goh birlashib, goh parchalandi. Taxminan 3,8 milliard yil avval hayot paydo boʻlib, biologik bosqich boshlandi. Dastlabki odamlarning paydo boʻlishi esa antropogen bosqichni boshlab berdi.",
      easy: "Yer taraqqiyoti: astronomik → geologik → biologik (3,8 mlrd yil oldin) → antropogen bosqich.",
      draw: [
        { t: 'title', text: 'Yer taraqqiyoti bosqichlari' },
        { t: 'box', id: 'a', x: 2, y: 22, w: 22, h: 10, text: 'astronomik', color: 'purple' },
        { t: 'box', id: 'g', x: 26, y: 22, w: 22, h: 10, text: 'geologik', color: 'orange' },
        { t: 'box', id: 'b', x: 50, y: 22, w: 22, h: 10, text: 'biologik', color: 'green' },
        { t: 'box', id: 'o', x: 74, y: 22, w: 22, h: 10, text: 'antropogen', color: 'blue' },
        { t: 'arrow', from: 'a', to: 'g' },
        { t: 'arrow', from: 'g', to: 'b' },
        { t: 'arrow', from: 'b', to: 'o' },
        { t: 'text', x: 4, y: 46, text: 'Hayot paydo boʻldi: ≈ 3,8 mlrd yil oldin', size: 's', color: 'green' }
      ],
      next: 'Geoxronologiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Geoxronologiya — togʻ jinslarining hosil boʻlish ketma-ketligi va yoshi haqidagi taʼlimot. Nisbiy geoxronologiyada qatlamlarning joylashishiga qaraladi: ustidagi qatlam ostidagidan yoshroq. Paleontologik metod esa jinslardagi toshqotgan qoldiqlarga asoslanadi. Geoxronologik shkalaning eng yirik birligi — supereon; ular ikkita: tokembriy va fanerozoy. Tokembriy qariyb 4 milliard yil davom etgan. Fanerozoy 541 million yil oldin boshlangan va hozir ham davom etmoqda; u uchta eraga boʻlinadi: paleozoy, mezozoy va kaynozoy. Eralar davrlarga, davrlar zamonlarga boʻlinadi.",
      easy: "Geoxronologiya — jinslar yoshi haqida taʼlimot; supereonlar: tokembriy va fanerozoy; eralar: paleozoy → mezozoy → kaynozoy.",
      draw: [
        { t: 'title', text: 'Fanerozoy eralari' },
        { t: 'box', id: 'p', x: 4, y: 22, w: 28, h: 10, text: 'paleozoy', color: 'blue' },
        { t: 'box', id: 'm', x: 36, y: 22, w: 28, h: 10, text: 'mezozoy', color: 'orange' },
        { t: 'box', id: 'k', x: 68, y: 22, w: 28, h: 10, text: 'kaynozoy', color: 'green' },
        { t: 'arrow', from: 'p', to: 'm' },
        { t: 'arrow', from: 'm', to: 'k' },
        { t: 'text', x: 4, y: 46, text: 'Fanerozoy: 541 mln yil oldin boshlangan', size: 's' },
        { t: 'text', x: 4, y: 54, text: 'Mezozoy — dinozavrlar davri', size: 's', color: 'orange' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Yer taraqqiyotida astronomik, geologik, biologik va antropogen bosqichlar ajratiladi; hayot taxminan 3,8 mlrd yil oldin paydo boʻlgan.',
    'Geoxronologiya jinslar yoshini oʻrganadi: nisbiy usulda ustki qatlam ostkisidan yosh, paleontologik metod toshqotgan qoldiqlarga asoslanadi.',
    'Geoxronologik shkalada ikki supereon bor — tokembriy va fanerozoy; fanerozoy paleozoy, mezozoy va kaynozoy eralariga boʻlinadi.'
  ],
  questions: [
    {
      id: 'g5q1',
      prompt: 'Yer taraqqiyoti bosqichlarini tartiblang.',
      hint: 'Odam — oxirgisi.',
      explanation: 'Astronomik → geologik → biologik → antropogen.',
      widget: { type: 'order_line', props: { items: [{ label: 'astronomik' }, { label: 'geologik' }, { label: 'biologik' }, { label: 'antropogen' }] } }
    },
    {
      id: 'g5q2',
      prompt: 'Fanerozoy eralarini qadimgisidan boshlab tartiblang.',
      hint: 'Kaynozoy — hozirgi.',
      explanation: 'Paleozoy → mezozoy → kaynozoy.',
      widget: { type: 'order_line', props: { items: [{ label: 'paleozoy' }, { label: 'mezozoy' }, { label: 'kaynozoy' }] } }
    },
    {
      id: 'g5q3',
      prompt: 'Yerda hayot taxminan necha milliard yil oldin paydo boʻlgan?',
      hint: 'Toʻrtga yaqin.',
      explanation: '3,8 mlrd yil oldin.',
      widget: { type: 'number_answer', props: { answer: 3.8, tolerance: 0.1, unit: 'mlrd yil' } }
    },
    {
      id: 'g5q4',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Paleontologik — qoldiqlar.',
      explanation: 'Geoxronologiya — jinslar yoshi haqida taʼlimot; paleontologik metod — toshqotgan qoldiqlarga asoslanadi; supereon — shkalaning eng yirik birligi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'geoxronologiya', right: 'jinslar yoshi haqidagi taʼlimot' },
            { left: 'paleontologik metod', right: 'toshqotgan qoldiqlarga asoslanadi' },
            { left: 'supereon', right: 'shkalaning eng yirik birligi' }
          ]
        }
      }
    },
    {
      id: 'g5q5',
      prompt: 'Nisbiy geoxronologiyaga koʻra, buzilmagan qatlamlarda qaysi qatlam yoshroq?',
      hint: 'Keyin choʻkkan.',
      explanation: 'Ustida yotgan qatlam.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ustidagi qatlam', 'ostidagi qatlam', 'hammasi bir xil', 'eng qalin qatlam'], answerIndex: 0 } }
    },
    {
      id: 'g5q6',
      prompt: 'Geoxronologik shkaladagi ikkita supereonni tanlang.',
      hint: 'Ikkita.',
      explanation: 'Tokembriy va fanerozoy.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tokembriy', correct: true },
            { label: 'fanerozoy', correct: true },
            { label: 'mezozoy' },
            { label: 'yura' }
          ]
        }
      }
    },
    {
      id: 'g5q7',
      prompt: 'Fanerozoy necha million yil oldin boshlangan?',
      hint: 'Besh yuzdan koʻp.',
      explanation: '541 mln yil oldin.',
      widget: { type: 'number_answer', props: { answer: 541, unit: 'mln yil' } }
    },
    {
      id: 'g5q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tokembriy — eng uzun.',
      explanation: 'Tokembriy qariyb 4 mlrd yil davom etgan; fanerozoy hozir ham davom etmoqda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Tokembriy supereoni qariyb 4 milliard yil davom etgan.', value: true },
            { text: 'Fanerozoy supereoni hozir ham davom etmoqda.', value: true },
            { text: 'Kaynozoy — eng qadimgi era.', value: false },
            { text: 'Paleontologik metod tokembriy uchun eng mukammal ishlaydi.', value: false }
          ]
        }
      }
    }
  ]
};
