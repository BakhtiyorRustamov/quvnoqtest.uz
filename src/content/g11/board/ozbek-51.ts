import type { BoardLesson } from './types';
import { OZG8 } from './ozbek-47';

/** Darslik: Adabiyot 11, I qism (2018), 123–131-betlar — «Saddi Iskandariy», XXXIX bob: Iskandarning Kashmir yurishi. */
export const OZ_51: BoardLesson = {
  n: 51,
  label: '51',
  group: OZG8,
  title: 'Iskandarning Kashmir yurishi',
  section: 'Adabiyot, 1-qism: «Saddi Iskandariy», XXXIX bob va uning nasriy bayoni',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "XXXIX bobda Kashmir shohi Mallu Iskandarga boʻysunmay, sehrli qoʻrgʻonga yashirinadi va jodu bilan yurtdan yel va oʻtni yoʻq qiladi. Uch kun xalq olovsiz, chiroqsiz qolib, qattiq qiynaladi. Hakim Aflotun qadimiy kitobdagi belgilar orqali tilsim sirini topadi, Iskandar lavhalarni qulatib, yel va oʻtni ozod qiladi — sehrgarlar halok boʻladi. Mallu taslim boʻlib jon beradi, Iskandar esa uning dono oʻgʻli Feruzni taxtga oʻtqazib, adolat bilan hukm surishni nasihat qiladi. Bobda ilm sehr-jodudan ustun ekani va adolatli hukmdor gʻoyasi ilgari suriladi.",
      easy: "Mallu sehr bilan yel va oʻtni yashiradi. Aflotun ilmi bilan sehr yengiladi, Iskandar Feruzni shoh qiladi.",
      draw: [
        { t: 'title', text: 'Bob voqealari' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 12, text: 'Mallu sehri', color: 'red' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 12, text: 'Aflotun ilmi', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 12, text: 'Feruz shoh', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 44, text: 'Gʻoya: ilm sehrdan ustun', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 50, text: 'Gʻoya: adolatli hukmdor', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 58, text: 'Ulusqa berib adli birla navid,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 64, text: 'Ulus borcha adligʻa bogʻlab umid.', size: 's', color: 'purple' }
      ],
      next: 'Qani, sinab koʻraylik'
    }
  ],
  summary: [
    'Kashmir shohi Mallu sehr bilan yurtdan yel va oʻtni yashiradi, xalq uch kun qiynaladi.',
    'Hakim Aflotun tilsim sirini topadi, Iskandar uni buzadi — ilm sehr-jodudan ustun chiqadi.',
    'Iskandar Mallu oʻrniga uning dono oʻgʻli Feruzni shoh qilib, adolatga chaqiradi.'
  ],
  questions: [
    {
      id: 'oz51q1',
      prompt: 'Mallu jodu bilan nimalarni yoʻq qildi?',
      hint: 'Chiroq ham yonmay qoldi.',
      explanation: 'Yel (shamol) va oʻtni (olovni).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yel va oʻtni', 'suv va nonni', 'oy va quyoshni', 'qor va yomgʻirni'], answerIndex: 0 } }
    },
    {
      id: 'oz51q2',
      prompt: 'Xalq necha kun olovsiz qiynaldi?',
      hint: 'Aflotun ham shuncha izladi.',
      explanation: 'Uch kun.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'kun' } }
    },
    {
      id: 'oz51q3',
      prompt: 'Tilsim sirini kim topdi?',
      hint: 'Hakim.',
      explanation: 'Aflotun.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Aflotun', 'Arastu', 'Feruz', 'Doro'], answerIndex: 0 } }
    },
    {
      id: 'oz51q4',
      prompt: 'Qahramonni bobdagi roli bilan juftlang.',
      hint: 'Mallu — sehrgar shoh.',
      explanation: 'Mallu — sehrga tayangan Kashmir shohi; Aflotun — tilsimni ochgan hakim; Feruz — taxtga oʻtqazilgan dono oʻgʻil.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Mallu', right: 'sehrga tayangan shoh' },
            { left: 'Aflotun', right: 'tilsimni ochgan hakim' },
            { left: 'Feruz', right: 'taxtga oʻtqazilgan oʻgʻil' }
          ]
        }
      }
    },
    {
      id: 'oz51q5',
      prompt: 'Voqealarni tartib bilan joylang.',
      hint: 'Boshida Mallu qochadi.',
      explanation: 'Mallu qoʻrgʻonga qochadi → yel va oʻt yoʻqoladi → Aflotun sirni topadi → Feruz shoh boʻladi.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'Mallu qoʻrgʻonga qochadi' }, { label: 'yel va oʻt yoʻqoladi' }, { label: 'Aflotun sirni topadi' }, { label: 'Feruz shoh boʻladi' }] }
      }
    },
    {
      id: 'oz51q6',
      prompt: 'Iskandar Feruzga qanday nasihat qiladi?',
      hint: 'Fuqaro shod boʻlsin.',
      explanation: 'Lutf-ehson qilish va adolat yoʻlini tutishni, yurtni obod qilishni.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['adolat va lutf-ehson yoʻlini tutishni', 'qoʻshinni koʻpaytirishni', 'sehrni oʻrganishni', 'boj yigʻishni'], answerIndex: 0 } }
    },
    {
      id: 'oz51q7',
      prompt: 'Bobning asosiy gʻoyalarini belgilang.',
      hint: 'Ikki gʻoya.',
      explanation: 'Ilm sehr-jodudan ustun; hukmdor adolatli boʻlishi kerak.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ilm sehr-jodudan ustun', correct: true },
            { label: 'hukmdor adolatli boʻlishi kerak', correct: true },
            { label: 'sehr har qanday kuchdan ustun' },
            { label: 'taxtni faqat kuch bilan saqlash mumkin' }
          ]
        }
      }
    },
    {
      id: 'oz51q8',
      prompt: '«Ulusqa berib adli birla navid» misrasidagi «navid» soʻzi nimani anglatadi?',
      hint: 'Sevinchli xabar.',
      explanation: 'Navid — xushxabar: Iskandar adolati bilan elni shodlantirdi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['xushxabar', 'qilich', 'soliq', 'qoʻrgʻon'], answerIndex: 0 } }
    }
  ]
};
