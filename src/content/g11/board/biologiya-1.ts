import type { BoardLesson } from './types';

export const BOB1 = { kicker: '1-bob', title: 'Ekologiya va hayot' };

/** Darslik: Biologiya 11, 1-§ (4–9-betlar) — biologik tizimlar, ularning iyerarxik tuzilishi, ekologiya fan sifatida va uning vazifalari. */
export const BIO_1: BoardLesson = {
  n: 1,
  label: '1',
  group: BOB1,
  title: 'Biologik tizimlar. Ekologiya',
  section: '1-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Bitta gulli oʻsimlik — ildiz, poya, barg, gul va mevadan iborat yaxlit tizim. Choʻl ham tizim: unda bakteriya, zamburugʻ, oʻsimlik va hayvon populatsiyalari bir-biriga taʼsir qilib yashaydi. Biologiya shunday tirik tizimlarni oʻrganadi.",
      easy: "Oʻsimlik ham, choʻl ham — biologik tizim.",
      draw: [
        { t: 'title', text: 'Tirik tizimlar' },
        { t: 'icon', x: 16, y: 34, emoji: '🌻', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🏜️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['oʻsimlik — organlar tizimi', 'choʻl — populatsiyalar tizimi', 'hammasi oʻzaro bogʻliq'] }
      ],
      next: 'Biosistema nima?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Biologik sistema — oʻzaro bogʻliq, muayyan vazifani bajaradigan, rivojlanadigan, oʻz-oʻzini tiklaydigan va muhitga moslasha oladigan biologik obyektlar birligi. Biosistemalar tabiatning tarixiy rivojlanishi natijasi; ular oʻz-oʻzini boshqaradi, koʻpayadi va muvozanatni saqlaydi.",
      easy: "Biosistema: bogʻliq qismlar, vazifa, rivojlanish, moslanish.",
      draw: [
        { t: 'title', text: 'Biologik sistema' },
        { t: 'list', x: 4, y: 20, items: ['oʻzaro bogʻliq qismlar', 'muayyan vazifa', 'rivojlanish, oʻz-oʻzini tiklash', 'muhitga moslanish'] },
        { t: 'text', x: 4, y: 58, text: 'muvozanat buzilsa — tizim oʻzgaradi yoki halok boʻladi', size: 's', color: 'purple' }
      ],
      next: 'Hayot zinapoyasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hayot darajalari zinapoya kabi joylashgan — bu iyerarxik tuzilish. Molekulalardan hujayra, hujayralardan toʻqima, toʻqimalardan organ va organizm, organizmlardan populatsiya, populatsiyalardan biogeotsenoz, hammasidan esa biosfera tuziladi. Hayotning eng kichik birligi — hujayra.",
      easy: "Molekula → hujayra → … → biosfera; eng kichik tirik birlik — hujayra.",
      draw: [
        { t: 'title', text: 'Hayot darajalari' },
        { t: 'box', id: 'l1', x: 4, y: 58, w: 22, h: 7, text: 'molekula' },
        { t: 'box', id: 'l2', x: 14, y: 49, w: 22, h: 7, text: 'hujayra' },
        { t: 'box', id: 'l3', x: 24, y: 40, w: 22, h: 7, text: 'organizm' },
        { t: 'box', id: 'l4', x: 34, y: 31, w: 24, h: 7, text: 'populatsiya' },
        { t: 'box', id: 'l5', x: 46, y: 22, w: 26, h: 7, text: 'biogeotsenoz', color: 'green' },
        { t: 'box', id: 'l6', x: 62, y: 13, w: 22, h: 7, text: 'biosfera', color: 'blue' }
      ],
      next: 'Ekologiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "XX asr boshida biologiyaning yangi tarmogʻi — ekologiya shakllandi. Bu atamani 1866-yilda nemis olimi Ernst Gekkel kiritgan: yunoncha oikos — uy, logos — fan. Ekologiya — organizmlarning oʻzaro va atrof-muhit bilan munosabatlari haqidagi fan. Bugun u populatsiya, biotsenoz, ekotizim va biosferani ham oʻrganadi.",
      easy: "Ekologiya (Gekkel, 1866) — organizm va muhit munosabatlari haqidagi fan.",
      draw: [
        { t: 'title', text: 'Ekologiya' },
        { t: 'formula', x: 4, y: 24, text: 'oikos — uy + logos — fan' },
        { t: 'text', x: 4, y: 36, text: 'Ernst Gekkel, 1866-yil', color: 'blue' },
        { t: 'list', x: 4, y: 44, items: ['organizm ↔ organizm', 'organizm ↔ muhit', 'populatsiya, ekotizim, biosfera'] }
      ],
      next: 'Vazifalari'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ekologiya vazifalari: organizmlar va muhit omillari munosabatlari qonuniyatlarini oʻrganish, biologik resurslardan oqilona foydalanish, zararkunandalarga qarshi biologik usullar yaratish, sanoatda chiqindisiz texnologiyalarni joriy etish va har bir insonda ekologik madaniyatni shakllantirish.",
      easy: "Vazifalar: qonuniyatlar, oqilona foydalanish, biologik kurash, chiqindisiz texnologiya, ekologik madaniyat.",
      draw: [
        { t: 'title', text: 'Ekologiya vazifalari' },
        { t: 'icon', x: 12, y: 40, emoji: '🌍', size: 'l' },
        { t: 'list', x: 24, y: 22, items: ['muhit bilan munosabat qonuniyatlari', 'resurslardan oqilona foydalanish', 'zararkunandaga biologik kurash', 'chiqindisiz texnologiya', 'ekologik madaniyat'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Biologik sistema — oʻzaro bogʻliq, rivojlanadigan, oʻz-oʻzini tiklaydigan va muhitga moslashadigan biologik obyektlar birligi.',
    'Hayot darajalari iyerarxik: molekula → hujayra → toʻqima → organ → organizm → populatsiya → biogeotsenoz → biosfera.',
    'Ekologiya (Gekkel, 1866) — organizmlarning oʻzaro va atrof-muhit bilan munosabatlari haqidagi fan.'
  ],
  questions: [
    {
      id: 'b1q1',
      prompt: 'Hayot darajalarini kichigidan kattasiga tartiblang.',
      hint: 'Eng kichik tirik birlik — hujayra.',
      explanation: 'Hujayra → toʻqima → organizm → populatsiya → biogeotsenoz → biosfera.',
      widget: { type: 'order_line', props: { items: [{ label: 'hujayra' }, { label: 'toʻqima' }, { label: 'organizm' }, { label: 'populatsiya' }, { label: 'biogeotsenoz' }, { label: 'biosfera' }] } }
    },
    {
      id: 'b1q2',
      prompt: '«Ekologiya» atamasini fanga kim kiritgan?',
      hint: 'Nemis olimi, 1866-yil.',
      explanation: 'Ernst Gekkel, 1866-yilda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Ch. Darvin', 'E. Gekkel', 'V. I. Vernadskiy', 'A. Tensli'], answerIndex: 1 } }
    },
    {
      id: 'b1q3',
      prompt: 'Obyektni tuzilish darajasi bilan juftlang.',
      hint: 'Quyon — bitta organizm.',
      explanation: 'Quyon — organizm; delfinlar toʻdasi — populatsiya; choʻl — biogeotsenoz; Yer va undagi hayot — biosfera.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'quyon', right: 'organizm' },
            { left: 'delfinlar toʻdasi', right: 'populatsiya' },
            { left: 'choʻl', right: 'biogeotsenoz' },
            { left: 'Yer va undagi hayot', right: 'biosfera' }
          ]
        }
      }
    },
    {
      id: 'b1q4',
      prompt: 'Hayot darajasini uni oʻrganadigan fan bilan juftlang.',
      hint: 'Sitologiya — hujayra haqidagi fan.',
      explanation: 'Hujayra — sitologiya; toʻqima — gistologiya; molekula — molekular biologiya; biogeotsenoz — ekologiya.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'hujayra' }, b: { label: 'sitologiya' } },
            { a: { label: 'toʻqima' }, b: { label: 'gistologiya' } },
            { a: { label: 'molekula' }, b: { label: 'molekular biologiya' } },
            { a: { label: 'biogeotsenoz' }, b: { label: 'ekologiya' } }
          ]
        }
      }
    },
    {
      id: 'b1q5',
      prompt: 'Tirik organizmning eng kichik birligi qaysi?',
      hint: 'U alohida organizm ham boʻla oladi.',
      explanation: 'Hujayra — bir hujayrali organizm sifatida ham barcha hayotiy xossalarni namoyon etadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['molekula', 'hujayra', 'toʻqima', 'organoid'], answerIndex: 1 } }
    },
    {
      id: 'b1q6',
      prompt: 'Ekologiyaning vazifalarini belgilang.',
      hint: 'Ekologiya tabiat bilan munosabatni tartibga soladi.',
      explanation: 'Resurslardan oqilona foydalanish, biologik kurash usullari, chiqindisiz texnologiya, ekologik madaniyat — ekologiya vazifalari.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'biologik resurslardan oqilona foydalanish', correct: true },
            { label: 'zararkunandaga biologik kurash usullari', correct: true },
            { label: 'chiqindisiz texnologiyani joriy etish', correct: true },
            { label: 'yangi kimyoviy elementlarni kashf etish' },
            { label: 'yulduzlar harakatini oʻrganish' }
          ]
        }
      }
    },
    {
      id: 'b1q7',
      prompt: 'Qaysi biri organizm darajasiga kirmaydi?',
      hint: 'Uchtasi — bitta tirik mavjudot.',
      explanation: 'Qushlar galasi — populatsiya darajasi; qolganlari — alohida organizmlar.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'quyon' }, { text: 'amyoba' }, { text: 'qushlar galasi', odd: true }, { text: 'olma daraxti' }] } }
    },
    {
      id: 'b1q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Iyerarxiya — zinapoya.',
      explanation: 'Katta daraja kichiklarini oʻz ichiga oladi; ekologiya hozir biosferani ham oʻrganadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Yirik hayot darajasi kichik darajalarni oʻz ichiga oladi.', value: true },
            { text: 'Zamonaviy ekologiya biosferani ham oʻrganadi.', value: true },
            { text: 'Ekologiya atamasi XXI asrda kiritilgan.', value: false },
            { text: 'Biosistemalar muhitga moslasha olmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
