import type { BoardLesson } from './types';
import { OZG3 } from './ozbek-30';

/** Darslik: Ona tili 11, 2-qism (2020), 11-mavzu (38–42-betlar) — olmoshlar uslubiyati: men/sen, biz, Siz, ular/oʻzi evfemizm sifatida. */
export const OZ_33: BoardLesson = {
  n: 33,
  label: '33',
  group: OZG3,
  title: 'Olmoshlar uslubiyati',
  section: 'Ona tili, 2-qism: 11-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Ayrim olmoshlar evfemizm vazifasini bajaradi. «Men», «sen» maʼnosini kesimdagi shaxs-son qoʻshimchasi bildirib turgani uchun, taʼkid boʻlmasa, ularni ishlatish shart emas: «Kitob oʻqidim». «Men» oʻrniga «biz» deyish kamtarlikni bildiradi, ammo oʻrinsiz boʻlsa manmanlikka aylanadi. «Siz» — hurmat belgisi; yozuvda gap ichida bosh harf bilan yozish mumkin. Kishining ismini aytmay, «ular», «oʻzlari» deyish ham hurmat: «Ular keldilarmi?» Badiiy matnda kishilik olmoshlarini ortiqcha qoʻllash saviyani tushiradi.",
      easy: "Olmosh ham odob bildiradi: «biz» — kamtarlik, «Siz» — hurmat, «ular keldilar» — ismni aytmay hurmat.",
      draw: [
        { t: 'title', text: 'Olmosh va odob' },
        { t: 'table', x: 4, y: 18, rows: [['olmosh', 'uslubiy vazifasi'], ['men → biz', 'kamtarlik (oʻrinsiz — manmanlik)'], ['sen → Siz', 'hurmat'], ['ism → ular, oʻzlari', 'ismni aytmay hurmat'], ['men, sen (ortiqcha)', 'nutqni ogʻirlashtiradi']] }
      ],
      next: 'Boshladik!'
    }
  ],
  summary: [
    'Kesimdagi shaxs-son qoʻshimchasi «men», «sen» maʼnosini bildirgani uchun taʼkidsiz holda bu olmoshlar shart emas.',
    '«Biz» kamtarlik, «Siz» hurmat bildiradi; ismni aytmay «ular», «oʻzlari» deyish ham hurmat ifodasi.',
    'Badiiy matnda kishilik olmoshlarini ortiqcha ishlatish uslubga zarar yetkazadi.'
  ],
  questions: [
    {
      id: 'oz33q1',
      prompt: 'Qaysi gapda «biz» olmoshi kamtarlik maʼnosida?',
      hint: 'Bogʻni bitta kishi qilgan.',
      explanation: '«Biz-da, xoʻjayin, qoʻldan kelgancha…» — bir kishi oʻzini «biz» deb kamtarlik qilyapti.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['— Bu bogʻni kim barpo qilibdi? — Biz-da, qoʻldan kelgancha…', 'Biz shunaqa odammiz, hech kimni tan olmaymiz!', 'Biz sinfdoshlar bilan sayohatga bordik.'], answerIndex: 0 } }
    },
    {
      id: 'oz33q2',
      prompt: 'Nega «Men kitob oʻqidim» oʻrniga koʻpincha «Kitob oʻqidim» deyiladi?',
      hint: '-dim qoʻshimchasi.',
      explanation: 'Kesimdagi -m shaxs-son qoʻshimchasi «men» maʼnosini bildirib turadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['shaxsni kesimdagi qoʻshimcha bildiradi', '«men» soʻzi taqiqlangan', 'qisqaroq yozish uchun', 'bu xato'], answerIndex: 0 } }
    },
    {
      id: 'oz33q3',
      prompt: 'Olmoshni uslubiy vazifasi bilan juftlang.',
      hint: 'Siz — hurmat.',
      explanation: '«Siz» — hurmat; «biz» (oʻzi haqida) — kamtarlik; «ular» (dadam oʻrniga) — ismni aytmay hurmat.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«Siz» (bitta kishiga)', right: 'hurmat' },
            { left: '«biz» (oʻzi haqida)', right: 'kamtarlik' },
            { left: '«Ular keldilarmi?» (dada haqida)', right: 'ismni aytmay hurmat' }
          ]
        }
      }
    },
    {
      id: 'oz33q4',
      prompt: '«Siz» olmoshi yozuvda hurmat uchun qanday yozilishi mumkin?',
      hint: 'Harf.',
      explanation: 'Gap ichida ham bosh harf bilan: «Hazrat, Sizga ixlosim baland».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bosh harf bilan', 'qoʻshtirnoqda', 'qavs ichida', 'faqat kichik harf bilan'], answerIndex: 0 } }
    },
    {
      id: 'oz33q5',
      prompt: 'Qaysi gapda olmosh evfemizm sifatida qoʻllangan?',
      hint: 'Hurmat ohangi.',
      explanation: '«Oʻzlari ijozat bersalar…» — «siz» oʻrniga yanada hurmatli shakl.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Oʻzlari ijozat bersalar, boshlar edik.', 'Odam oʻz-oʻziga dushman boʻlishi mumkinmi?', 'Oʻshalarning gapiga kirib, adashding.'], answerIndex: 0 } }
    },
    {
      id: 'oz33q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oʻrinsiz «biz».',
      explanation: '«Biz»ni oʻrinsiz qoʻllash manmanlik boʻlib eshitilishi mumkin; badiiy matnda olmosh ortiqcha boʻlsa, saviya tushadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Biz» oʻrinsiz qoʻllansa, manmanlik boʻlib eshitilishi mumkin.', value: true },
            { text: 'Badiiy matnda kishilik olmoshlarini ortiqcha qoʻllash saviyani tushiradi.', value: true },
            { text: 'Kattalarga «sen» deb murojaat qilish hurmat belgisi.', value: false }
          ]
        }
      }
    }
  ]
};
