import type { BoardLesson } from './types';
import { OZG9 } from './ozbek-59';

/** Darslik: Adabiyot 11, II qism (2018), 63–79-betlar — Erkin Vohidov, «Ruhlar isyoni» dostoni va u haqida. */
export const OZ_62: BoardLesson = {
  n: 62,
  label: '62',
  group: OZG9,
  title: 'Erkin Vohidov. «Ruhlar isyoni»',
  section: 'Adabiyot, 2-qism: Erkin Vohidov (1936–2017); «Ruhlar isyoni» dostoni, «Inson», «Yaxshidir achchiq haqiqat»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Erkin Vohidov (1936–2017) — lirik sheʼrlar, dostonlar va hajviy asarlari bilan sevilgan shoir. «Ruhlar isyoni» dostoni XX asr birinchi yarmida yashagan bengal shoiri Nazrul Islomning qahramonona va fojiali taqdiriga bagʻishlangan. Nazrul Islom Vatanini mustamlakachilikdan ozod koʻrishni orzu qiladi, «Isyon qoʻshigʻi» bilan xalqni uygʻonishga chaqiradi, ammo olomon uni tushunmaydi va shoir tutqunlikka tushadi. Zindonda u oʻzini vijdoni oldida gunohkor sanamaydi, yagona gunohi onasini qaygʻuga qoʻygani deb biladi. Doston fasllari — «Isyon qoʻshigʻi», «Gʻalayon», «Tutqunlikda», «Ozodlik»; soʻnggi faslda xalq orzusi roʻyobga chiqadi.",
      easy: "«Ruhlar isyoni» — bengal shoiri Nazrul Islom haqidagi doston. U ozodlik uchun kurashib, tutqunlikka tushadi.",
      draw: [
        { t: 'title', text: 'Doston fasllari' },
        { t: 'box', id: 'a', x: 2, y: 24, w: 22, h: 12, text: 'Isyon qoʻshigʻi', color: 'red' },
        { t: 'box', id: 'b', x: 27, y: 24, w: 22, h: 12, text: 'Gʻalayon', color: 'orange' },
        { t: 'box', id: 'c', x: 52, y: 24, w: 22, h: 12, text: 'Tutqunlikda', color: 'purple' },
        { t: 'box', id: 'd', x: 77, y: 24, w: 21, h: 12, text: 'Ozodlik', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' },
        { t: 'text', x: 4, y: 50, text: 'Qahramon: bengal shoiri Nazrul Islom', size: 's', color: 'ink' }
      ],
      next: 'Tayyorman!'
    }
  ],
  summary: [
    'Erkin Vohidov (1936–2017) — lirik, doston va hajviy asarlar muallifi.',
    '«Ruhlar isyoni» bengal shoiri Nazrul Islomning ozodlik yoʻlidagi kurashi va tutqunlikdagi hayotiga bagʻishlangan.',
    'Doston fasllari: «Isyon qoʻshigʻi», «Gʻalayon», «Tutqunlikda», «Ozodlik»; soʻnggida xalq orzusi roʻyobga chiqadi.'
  ],
  questions: [
    {
      id: 'oz62q1',
      prompt: '«Ruhlar isyoni» kimning taqdiriga bagʻishlangan?',
      hint: 'Bengal shoiri.',
      explanation: 'Nazrul Islomning.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Nazrul Islom', 'Rabindranat Tagor', 'Nozim Hikmat', 'Bayron'], answerIndex: 0 } }
    },
    {
      id: 'oz62q2',
      prompt: 'Doston fasllarini tartib bilan joylang.',
      hint: 'Isyondan ozodlikka.',
      explanation: '«Isyon qoʻshigʻi» → «Gʻalayon» → «Tutqunlikda» → «Ozodlik».',
      widget: {
        type: 'order_line',
        props: { items: [{ label: '«Isyon qoʻshigʻi»' }, { label: '«Gʻalayon»' }, { label: '«Tutqunlikda»' }, { label: '«Ozodlik»' }] }
      }
    },
    {
      id: 'oz62q3',
      prompt: '«Isyon qoʻshigʻi»da Nazrul Islom xalqni nimaga chaqiradi?',
      hint: 'Bosh koʻtar.',
      explanation: 'Qullikka qarshi bosh koʻtarishga, uygʻonishga, ozodlik uchun kurashga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['uygʻonish va ozodlik uchun kurashga', 'sabr qilib kutishga', 'yurtni tark etishga', 'savdo qilishga'], answerIndex: 0 } }
    },
    {
      id: 'oz62q4',
      prompt: 'Zindonda shoir oʻzini kim oldida gunohkor sanaydi?',
      hint: 'Farzandlik burchi.',
      explanation: 'Faqat onasi oldida — uni qaygʻuga qoʻygani uchun.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['onasi oldida', 'vijdoni oldida', 'xalqi oldida', 'hukmdor oldida'], answerIndex: 0 } }
    },
    {
      id: 'oz62q5',
      prompt: 'Olomon daʼvatkor shoirga qanday munosabatda boʻldi?',
      hint: 'Tushunmadi.',
      explanation: 'Uni anglab yetmadi, tinchlik buzuvchi deb qoraladi — bu mustamlakachilarga qoʻl keldi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tushunmay, uni qoraladi', 'darhol ergashdi', 'unga taxt berdi', 'befarq qoldi va unutdi'], answerIndex: 0 } }
    },
    {
      id: 'oz62q6',
      prompt: 'Erkin Vohidov ijodiga xos yoʻnalishlarni belgilang.',
      hint: 'Uch yoʻnalish.',
      explanation: 'Lirika, dostonlar va hajviyot.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'lirik sheʼrlar', correct: true },
            { label: 'dostonlar', correct: true },
            { label: 'hajviy sheʼrlar', correct: true },
            { label: 'ilmiy fantastik romanlar' }
          ]
        }
      }
    },
    {
      id: 'oz62q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Soʻnggi fasl.',
      explanation: 'Soʻnggi faslda xalq orzusi roʻyobga chiqadi, lekin qiynoqlar shoirni bu baxtli kunlar shukuhidan benasib etadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Soʻnggi faslda xalqning ozodlik orzusi roʻyobga chiqadi.', value: true },
            { text: 'Dostonda afsona va rivoyatlardan foydalanilgan.', value: true },
            { text: 'Doston oʻzbek xalq qahramoni Alpomish haqida.', value: false }
          ]
        }
      }
    }
  ]
};
