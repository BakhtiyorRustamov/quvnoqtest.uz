import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 13-§ (76–79-betlar) — antropogen omillar: kimyoviy, fizik, biologik, ijtimoiy; insonning bevosita va bilvosita taʼsiri. */
export const BIO_13: BoardLesson = {
  n: 13,
  label: '13',
  group: BOB2,
  title: 'Antropogen omillar',
  section: '13-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yer tarixida koʻp turlar inson ishtirokisiz ham yoʻqolgan, lekin bu asta-sekin boʻlgan va ularning oʻrnini yangi turlar egallagan. Bugun esa inson taʼsiri turlarning yoʻqolishini keskin tezlashtirdi. Inson faoliyati bilan bogʻliq omillar — antropogen omillar.",
      easy: "Antropogen omil — inson faoliyati taʼsiri.",
      draw: [
        { t: 'title', text: 'Inson omili' },
        { t: 'icon', x: 16, y: 40, emoji: '🏭', size: 'l' },
        { t: 'list', x: 32, y: 26, items: ['anthropos — inson', 'tabiatni oʻzgartiradi', 'turlar yoʻqolishi tezlashadi'] }
      ],
      next: 'Turlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Antropogen omillar toʻrt xil. Kimyoviy — mineral oʻgʻitlar, zaharli kimyoviy moddalar, sanoat va transport chiqindilari. Fizik — yadro energiyasi, transport shovqini. Biologik — odam uchun yashash muhiti yoki oziq boʻla oladigan bakteriyalar, parazitlar, oziq-ovqat. Ijtimoiy — odamlar jamoasi va ularning munosabatlari.",
      easy: "Kimyoviy, fizik, biologik, ijtimoiy omillar.",
      draw: [
        { t: 'title', text: 'Antropogen omillar turlari' },
        { t: 'table', x: 4, y: 20, rows: [['tur', 'misol'], ['kimyoviy', 'pestitsid, chiqindilar'], ['fizik', 'shovqin, radiatsiya'], ['biologik', 'parazitlar, bakteriyalar'], ['ijtimoiy', 'jamoa munosabatlari']] }
      ],
      next: 'Bevosita va bilvosita'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bevosita taʼsir toʻgʻridan-toʻgʻri obyektga qaratilgan: daraxt kesish, koʻmir qazish, hayvonlarni ovlash. Bilvosita taʼsir boshqa obyektlar orqali: oʻrmon kesilsa, undagi hayvonlar yoʻqoladi, tuproq yemiriladi. Zaharli kimyoviy modda zararkunanda bilan birga foydali hasharotlarni ham oʻldiradi, qoldigʻi oziq orqali odamga qaytadi.",
      easy: "Bevosita — toʻgʻridan-toʻgʻri (kesish); bilvosita — oqibat orqali (tuproq yemirilishi).",
      draw: [
        { t: 'title', text: 'Oʻrmon kesilsa' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 30, h: 8, text: 'daraxt kesish', color: 'red' },
        { t: 'box', id: 'b', x: 38, y: 22, w: 30, h: 8, text: 'hayvonlar ketadi', color: 'orange' },
        { t: 'box', id: 'c', x: 38, y: 40, w: 30, h: 8, text: 'tuproq yemiriladi', color: 'orange' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'a', to: 'c' },
        { t: 'text', x: 4, y: 40, text: 'bevosita', color: 'red' },
        { t: 'text', x: 72, y: 32, text: 'bilvosita', color: 'orange' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Inson madaniy oʻsimlik navlari va hayvon zotlari yaratadi, ular uchun qulay sunʼiy muhit tuzadi — bu yovvoyi turlar imkoniyatini kamaytiradi. Choʻllarni oʻzlashtirish, oʻrmon kesish, haddan tashqari mol boqish, suv va havoni ifloslantirish tabiatga salbiy taʼsir qiladi. Shuning uchun tabiatni muhofaza qilish va undan oqilona foydalanish zarur.",
      easy: "Oʻzlashtirish, kesish, ifloslantirish — salbiy; muhofaza va oqilona foydalanish kerak.",
      draw: [
        { t: 'title', text: 'Salbiy taʼsirlar' },
        { t: 'icon', x: 12, y: 40, emoji: '🌍', size: 'l' },
        { t: 'list', x: 26, y: 22, items: ['choʻllarni oʻzlashtirish', 'oʻrmonlarni kesish', 'haddan tashqari mol boqish', 'suv, havo ifloslanishi'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Antropogen omillar — inson va uning xoʻjalik faoliyatining tabiatga taʼsiri; ular turlar yoʻqolishini tezlashtiradi.',
    'Turlari: kimyoviy (oʻgʻit, pestitsid, chiqindi), fizik (shovqin, radiatsiya), biologik (parazit, bakteriya), ijtimoiy.',
    'Taʼsir bevosita (daraxt kesish, ov) va bilvosita (tuproq yemirilishi, foydali hasharotlar nobud boʻlishi) boʻladi.'
  ],
  questions: [
    {
      id: 'b13q1',
      prompt: 'Antropogen omilni turiga ajrating.',
      hint: 'Shovqin — fizik.',
      explanation: 'Kimyoviy: pestitsid, zavod chiqindisi. Fizik: transport shovqini, radiatsiya. Biologik: parazit hayvonlar.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'k', label: 'Kimyoviy' },
            { id: 'f', label: 'Fizik' },
            { id: 'b', label: 'Biologik' }
          ],
          items: [
            { emoji: '', label: 'pestitsidlar', bin: 'k' },
            { emoji: '', label: 'zavod chiqindisi', bin: 'k' },
            { emoji: '', label: 'transport shovqini', bin: 'f' },
            { emoji: '', label: 'radiatsiya', bin: 'f' },
            { emoji: '', label: 'parazit hayvonlar', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'b13q2',
      prompt: 'Taʼsirni turi boʻyicha ajrating.',
      hint: 'Bilvosita — oqibat orqali.',
      explanation: 'Bevosita: daraxt kesish, hayvon ovlash, koʻmir qazish. Bilvosita: tuproq yemirilishi, foydali hasharotlar nobud boʻlishi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'v', label: 'Bevosita' },
            { id: 'i', label: 'Bilvosita' }
          ],
          items: [
            { emoji: '', label: 'daraxt kesish', bin: 'v' },
            { emoji: '', label: 'hayvonlarni ovlash', bin: 'v' },
            { emoji: '', label: 'koʻmir qazish', bin: 'v' },
            { emoji: '', label: 'oʻrmon kesilgach tuproq yemirilishi', bin: 'i' },
            { emoji: '', label: 'pestitsiddan foydali hasharot oʻlishi', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'b13q3',
      prompt: 'Oʻrmon kesilishi oqibatlari zanjirini tartiblang.',
      hint: 'Avval daraxt yoʻqoladi.',
      explanation: 'Daraxtlar kesiladi → yashash joyi yoʻqoladi → hayvonlar ketadi, tuproq yemiriladi → ekotizim buziladi.',
      widget: { type: 'step_order', props: { steps: ['daraxtlar kesiladi', 'yashash joyi yoʻqoladi', 'hayvonlar ketadi, tuproq yemiriladi', 'ekotizim muvozanati buziladi'] } }
    },
    {
      id: 'b13q4',
      prompt: 'Nega organizmlarda antropogen omillarga moslanish kam hosil boʻladi?',
      hint: 'Moslanish uchun koʻp avlod kerak.',
      explanation: 'Antropogen omillar juda tez oʻzgaradi, evolutsion moslanish esa uzoq vaqt talab qiladi.',
      widget: {
        type: 'mcq',
        props: { prompt: '', choices: ['ular juda tez oʻzgaradi, moslanish esa sekin', 'ular zararsiz', 'ular faqat oʻsimliklarga taʼsir qiladi', 'ular doimiy'], answerIndex: 0 }
      }
    },
    {
      id: 'b13q5',
      prompt: 'Qaysi biri antropogen omil emas?',
      hint: 'Uchtasi — inson faoliyati.',
      explanation: 'Vulqon otilishi — tabiiy abiotik omil.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'mineral oʻgʻit' }, { text: 'vulqon otilishi', odd: true }, { text: 'transport shovqini' }, { text: 'oʻrmon kesish' }] } }
    },
    {
      id: 'b13q6',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Kesish — toʻgʻridan-toʻgʻri.',
      explanation: 'Daraxt kesish — bevosita, tuproq yemirilishi — bilvosita taʼsir.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Daraxt kesish — ' }, { blank: 'bevosita' }, { text: ', uning oqibatida tuproq yemirilishi — ' }, { blank: 'bilvosita' }, { text: ' taʼsir.' }],
          bank: ['bevosita', 'bilvosita', 'biotik', 'abiotik']
        }
      }
    },
    {
      id: 'b13q7',
      prompt: 'Zaharli kimyoviy moddalar qoʻllanilishining oqibatlarini belgilang.',
      hint: 'Zahar tanlamaydi.',
      explanation: 'Foydali hasharotlar va tuproq hayvonlari oʻladi, qoldiqlar oziq orqali odamga oʻtadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'foydali hasharotlar ham oʻladi', correct: true },
            { label: 'tuproq hayvonlari nobud boʻladi', correct: true },
            { label: 'qoldiqlar oziq orqali odamga oʻtadi', correct: true },
            { label: 'tuproq unumdorligi albatta ortadi' }
          ]
        }
      }
    },
    {
      id: 'b13q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tabiiy yoʻqolish sekin boradi.',
      explanation: 'Inson turlar yoʻqolishini tezlashtiradi; madaniy navlar uchun qulay muhit yovvoyi turlarni siqadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Inson taʼsiri turlarning yoʻqolishini tezlashtiradi.', value: true },
            { text: 'Madaniy oʻsimliklar uchun qulay muhit yovvoyi turlar imkoniyatini kamaytiradi.', value: true },
            { text: 'Inson ishtirokisiz hech bir tur yoʻqolmagan.', value: false },
            { text: 'Ijtimoiy omillar — antropogen omil emas.', value: false }
          ]
        }
      }
    }
  ]
};
