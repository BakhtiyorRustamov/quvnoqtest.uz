import type { BoardLesson } from './types';

export const OZG10 = { kicker: 'Adabiyot · V', title: 'Mustaqillik davri adabiyoti' };

/** Darslik: Adabiyot 11, II qism (2018), 88–104-betlar — Mustaqillik davri oʻzbek sheʼriyati va undan namunalar. */
export const OZ_64: BoardLesson = {
  n: 64,
  label: '64',
  group: OZG10,
  title: 'Mustaqillik davri sheʼriyati',
  section: 'Adabiyot, 2-qism: Mustaqillik davri oʻzbek sheʼriyati; sheʼriyatdan namunalar',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "1991-yil 1-sentabrda Oʻzbekiston mustaqillikka erishgach, adabiyotda yangi davr — mustaqillik davri adabiyoti boshlandi. Shoirlar uchun erkin ijodiy muhit yuzaga keldi: ular oʻz maʼnaviy dunyosi va his-tuygʻularini bor holicha ifoda eta boshladi. Bu davr sheʼriyatida inson erkini qadrlash, Vatan saodati, milliy oʻzlikni anglash va milliy qadriyatlarni eʼzozlash yetakchi mavzular boʻldi. Vatan — ijodkorlar uchun eng yaqin va doimiy mavzu; u baʼzan shu soʻzni tilga olmasdan ham ifodalanadi. Darslikda Jamol Kamol, Oydin Hojiyeva, Usmon Azim, Xurshid Davron, Mahmud Toir, Sirojiddin Sayyid, Iqbol Mirzo sheʼrlaridan namunalar berilgan; turli sheʼriy shakllarda tajribalar ham qilindi.",
      easy: "Mustaqillik davri sheʼriyatida Vatan, inson erki va milliy qadriyatlar asosiy mavzu boʻldi.",
      draw: [
        { t: 'title', text: 'Sheʼrlar va mualliflar' },
        { t: 'table', x: 4, y: 18, rows: [['shoir', 'sheʼr'], ['Jamol Kamol', '«Asr bilan vidolashuv»'], ['Usmon Azim', '«Grafika»'], ['Mahmud Toir', '«Momo yer»'], ['Sirojiddin Sayyid', '«Vatan»'], ['Iqbol Mirzo', '«Oʻzbek»']] },
        { t: 'text', x: 4, y: 60, text: 'Mustaqillik: 1991-yil 1-sentabr', size: 's', color: 'purple' }
      ],
      next: 'Boshladik!'
    }
  ],
  summary: [
    'Mustaqillik davri adabiyoti 1991-yil 1-sentabrdan keyingi davr adabiyotidir.',
    'Sheʼriyatda erkin ijodiy muhit yuzaga keldi; inson erki, Vatan, milliy oʻzlik va qadriyatlar yetakchi mavzu boʻldi.',
    'Namunalar: Jamol Kamol, Oydin Hojiyeva, Usmon Azim, Xurshid Davron, Mahmud Toir, Sirojiddin Sayyid, Iqbol Mirzo.'
  ],
  questions: [
    {
      id: 'oz64q1',
      prompt: 'Oʻzbekiston qachon mustaqillikka erishgan?',
      hint: 'Kuz, oʻquv yili boshi.',
      explanation: '1991-yil 1-sentabrda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1991-yil 1-sentabr', '1990-yil 20-iyun', '1992-yil 8-dekabr', '1989-yil 21-oktabr'], answerIndex: 0 } }
    },
    {
      id: 'oz64q2',
      prompt: 'Mustaqillik davri sheʼriyatining yetakchi mavzularini belgilang.',
      hint: 'Toʻrt mavzu.',
      explanation: 'Inson erki, Vatan saodati, milliy oʻzlikni anglash, milliy qadriyatlarni eʼzozlash.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'inson erkini qadrlash', correct: true },
            { label: 'Vatan saodati', correct: true },
            { label: 'milliy oʻzlikni anglash', correct: true },
            { label: 'mafkuraviy shiorlar' }
          ]
        }
      }
    },
    {
      id: 'oz64q3',
      prompt: 'Shoirni sheʼri bilan juftlang.',
      hint: 'Sirojiddin Sayyid — «Vatan».',
      explanation: 'Sirojiddin Sayyid — «Vatan»; Iqbol Mirzo — «Oʻzbek»; Mahmud Toir — «Momo yer»; Usmon Azim — «Grafika».',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Sirojiddin Sayyid', right: '«Vatan»' },
            { left: 'Iqbol Mirzo', right: '«Oʻzbek»' },
            { left: 'Mahmud Toir', right: '«Momo yer»' },
            { left: 'Usmon Azim', right: '«Grafika»' }
          ]
        }
      }
    },
    {
      id: 'oz64q4',
      prompt: 'Bu davrda shoirlar uchun qanday muhit yuzaga keldi?',
      hint: 'Erkin.',
      explanation: 'Erkin ijodiy muhit: shoirlar his-tuygʻularini bor holicha ifodalay boshladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['erkin ijodiy muhit', 'qatʼiy senzura', 'faqat tarjima ishlari', 'ijoddan uzilish'], answerIndex: 0 } }
    },
    {
      id: 'oz64q5',
      prompt: 'Vatan mavzusi sheʼrda qanday ifodalanishi mumkin?',
      hint: 'Soʻzsiz ham.',
      explanation: 'Shoir «Vatan» soʻzini qoʻllamasdan ham el-yurtiga mehrini izhor qilishi mumkin; soʻzning betoʻxtov takrori esa taʼsirni susaytiradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['soʻzni tilga olmasdan ham', 'faqat «Vatan» soʻzini koʻp takrorlab', 'faqat nasrda', 'faqat qoʻshiqda'], answerIndex: 0 } }
    },
    {
      id: 'oz64q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Shakliy izlanishlar.',
      explanation: 'Bu davrda turli sheʼriy shakllarda tajribalar qilindi; sheʼr taʼsiri uchun isteʼdod va sogʻlom adabiy muhit muhim.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Mustaqillik davrida turli sheʼriy shakllarda tajribalar qilindi.', value: true },
            { text: 'Sheʼr taʼsiri uchun isteʼdod va sogʻlom adabiy muhit muhim.', value: true },
            { text: 'Bu davrda Vatan mavzusi butunlay chetda qoldi.', value: false }
          ]
        }
      }
    }
  ]
};
