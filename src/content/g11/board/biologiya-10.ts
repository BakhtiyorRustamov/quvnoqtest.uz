import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 10-§ (58–63-betlar) — namlik ekologik omil sifatida, kserofitlar (sukkulentlar, sklerofitlar), gigrofitlar, mezofitlar, hayvonlarning suv rejimiga moslanishlari. */
export const BIO_10: BoardLesson = {
  n: 10,
  label: '10',
  group: BOB2,
  title: 'Namlik — ekologik omil',
  section: '10-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Tirik organizmlar tanasining uchdan ikki qismi suv. Suv — universal erituvchi, fotosintez va gidroliz ishtirokchisi, chuvalchanglar uchun gidrostatik skelet, issiqlik muvozanatini saqlovchi. Shuning uchun quruqlikda namlik yetishmasligi yoki ortiqchaligi — cheklovchi omil.",
      easy: "Tananing 2/3 qismi — suv; namlik — cheklovchi omil.",
      draw: [
        { t: 'title', text: 'Suv — hayot asosi' },
        { t: 'icon', x: 16, y: 40, emoji: '💧', size: 'l' },
        { t: 'list', x: 32, y: 22, items: ['tananing 2/3 qismi', 'universal erituvchi', 'fotosintez, gidroliz', 'gidrostatik skelet'] }
      ],
      next: 'Oʻsimlik guruhlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Namlikka koʻra quruqlik oʻsimliklari uch guruh. Kserofitlar — quruq joyda: choʻl, dasht, baland togʻ. Gigrofitlar — nam joyda: sholi, shakarqamish; ildizi kuchsiz, bargi yupqa, ogʻizchalari doim ochiq. Mezofitlar — moʻtadil namlikda: oʻtloq, adir oʻsimliklari va deyarli barcha madaniy oʻsimliklar; ular eng keng tarqalgan.",
      easy: "Kserofit — quruq, gigrofit — nam, mezofit — oʻrtacha.",
      draw: [
        { t: 'title', text: 'Namlikka koʻra' },
        { t: 'box', id: 'k', x: 4, y: 22, w: 28, h: 8, text: 'kserofit', color: 'orange' },
        { t: 'box', id: 'm', x: 36, y: 22, w: 28, h: 8, text: 'mezofit', color: 'green' },
        { t: 'box', id: 'g', x: 68, y: 22, w: 28, h: 8, text: 'gigrofit', color: 'blue' },
        { t: 'text', x: 4, y: 40, text: 'saksovul', size: 's' },
        { t: 'text', x: 36, y: 40, text: 'bugʻdoy, olma', size: 's' },
        { t: 'text', x: 68, y: 40, text: 'sholi, qamish', size: 's' },
        { t: 'formula', x: 4, y: 56, text: 'quruq ←———— namlik ————→ nam' }
      ],
      next: 'Kserofitlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kserofitlar ikki xil. Sukkulentlar suvni toʻqimalarida saqlaydi: aloy va agava — bargida, kaktus va sutlama — poyasida; ogʻizchalari kunduzi yopiq. Sklerofitlar suv saqlamaydi, lekin hujayra shirasining osmotik bosimi yuqori — «nasos oʻsimliklar»; ildizi chuqur ketadi: yantoq, saksovul; barglari mayda, qattiq yoki tangachali.",
      easy: "Sukkulent — suv saqlaydi (kaktus); sklerofit — chuqur ildiz, «nasos» (yantoq).",
      draw: [
        { t: 'title', text: 'Sukkulent va sklerofit' },
        { t: 'icon', x: 14, y: 34, emoji: '🌵', size: 'l' },
        { t: 'icon', x: 14, y: 56, emoji: '🌿', size: 'l' },
        { t: 'text', x: 28, y: 36, text: 'sukkulent — suvni zaxiralaydi', color: 'green' },
        { t: 'text', x: 28, y: 58, text: 'sklerofit — chuqur ildiz, nasos', color: 'orange' }
      ],
      next: 'Hayvonlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hayvonlarda ham uch xil moslanish. Fiziologik: choʻl hayvonlariga oziqdagi suv yetadi, tuya va choʻl kalamushi yogʻ oksidlanganda hosil boʻladigan metabolitik suvdan foydalanadi; siydik kislota chiqarish deyarli suv talab qilmaydi. Morfologik: pat, jun, muguz tangacha, xitin, chigʻanoq. Etologik: suv izlab migratsiya — saygʻoq, antilopa; tungi hayot, yozgi uyqu.",
      easy: "Metabolitik suv, siydik kislota; qoplamlar; migratsiya va yozgi uyqu.",
      draw: [
        { t: 'title', text: 'Hayvonlar va suv' },
        { t: 'table', x: 4, y: 20, rows: [['moslanish', 'misol'], ['fiziologik', 'metabolitik suv — tuya'], ['morfologik', 'xitin, tangacha'], ['etologik', 'saygʻoq migratsiyasi']] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Qumda oʻsgan qaragʻay ildizi chuqurga ketadi — suv pastda. Botqoqdagi qaragʻay ildizi esa yuzada — suv yetarli, havo kam. Choʻl oʻsimliklari fevral–martda gullab, tez tugatadi — yozgi qurgʻoqchilikdan oldin urugʻ berishga ulguradi. Yantoq ildizi yerga chuqur, juzgʻun ildizi esa keng tarqaladi.",
      easy: "Ildiz suv qayerda boʻlsa, oʻsha tomonga: qumda — chuqur, botqoqda — yuza.",
      draw: [
        { t: 'title', text: 'Suvga moslashgan ildiz' },
        { t: 'list', x: 4, y: 22, items: ['qumdagi qaragʻay — chuqur ildiz', 'botqoqdagi qaragʻay — yuza ildiz', 'yantoq — chuqur, juzgʻun — keng', 'choʻl gullari — erta bahorda'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Suv tananing 2/3 qismini tashkil qiladi; namlik yetishmasligi yoki ortiqchaligi quruqlikda cheklovchi omil.',
    'Oʻsimliklar: kserofitlar (sukkulentlar — suv saqlaydi, sklerofitlar — chuqur ildiz, yuqori osmotik bosim), gigrofitlar (nam joy), mezofitlar (moʻtadil).',
    'Hayvonlar: fiziologik (metabolitik suv, siydik kislota), morfologik (pat, jun, xitin) va etologik (migratsiya, yozgi uyqu) moslanishlar.'
  ],
  questions: [
    {
      id: 'b10q1',
      prompt: 'Oʻsimlikni namlikka koʻra guruhiga ajrating.',
      hint: 'Sholi — suvda oʻsadi.',
      explanation: 'Kserofit: kaktus, shuvoq, yantoq. Gigrofit: sholi, qamish. Mezofit: qoqioʻt, ayiqtovon.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'k', label: 'Kserofit' },
            { id: 'g', label: 'Gigrofit' },
            { id: 'm', label: 'Mezofit' }
          ],
          items: [
            { emoji: '', label: 'kaktus', bin: 'k' },
            { emoji: '', label: 'shuvoq', bin: 'k' },
            { emoji: '', label: 'sholi', bin: 'g' },
            { emoji: '', label: 'qamish', bin: 'g' },
            { emoji: '', label: 'qoqioʻt', bin: 'm' },
            { emoji: '', label: 'ayiqtovon', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'b10q2',
      prompt: 'Qaysi oʻsimliklar «nasos oʻsimliklar» deyiladi?',
      hint: 'Yuqori osmotik bosim.',
      explanation: 'Sklerofitlar (yantoq, saksovul).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['sukkulentlar', 'sklerofitlar', 'gigrofitlar', 'mezofitlar'], answerIndex: 1 } }
    },
    {
      id: 'b10q3',
      prompt: 'Sukkulentni suv saqlaydigan organiga ajrating.',
      hint: 'Kaktusning bargi tikanga aylangan.',
      explanation: 'Barg sukkulentlari: aloy, agava. Poya sukkulentlari: kaktus, sutlama.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'b', label: 'Barg' },
            { id: 'p', label: 'Poya' }
          ],
          items: [
            { emoji: '', label: 'aloy', bin: 'b' },
            { emoji: '', label: 'agava', bin: 'b' },
            { emoji: '', label: 'kaktus', bin: 'p' },
            { emoji: '', label: 'sutlama', bin: 'p' }
          ]
        }
      }
    },
    {
      id: 'b10q4',
      prompt: 'Tirik organizmlar tanasining qancha qismi suvdan iborat?',
      hint: 'Kasr.',
      explanation: '2/3 qismi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1/4', '1/3', '2/3', '9/10'], answerIndex: 2 } }
    },
    {
      id: 'b10q5',
      prompt: 'Gigrofitlarga xos belgilarni belgilang.',
      hint: 'Suv koʻp — tejash shart emas.',
      explanation: 'Ildiz kuchsiz, barg yupqa, ogʻizchalar doim ochiq, transpiratsiya kuchli.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'barglari yupqa', correct: true },
            { label: 'ogʻizchalar doim ochiq', correct: true },
            { label: 'transpiratsiya kuchli', correct: true },
            { label: 'barglari tikanga aylangan' },
            { label: 'chuqur ildiz tizimi' }
          ]
        }
      }
    },
    {
      id: 'b10q6',
      prompt: 'Hayvon moslanishini turi bilan juftlang.',
      hint: 'Migratsiya — xulq.',
      explanation: 'Metabolitik suv — fiziologik; xitin qoplam — morfologik; saygʻoq migratsiyasi — etologik.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'metabolitik suv' }, b: { label: 'fiziologik' } },
            { a: { label: 'xitin qoplam' }, b: { label: 'morfologik' } },
            { a: { label: 'saygʻoq migratsiyasi' }, b: { label: 'etologik' } }
          ]
        }
      }
    },
    {
      id: 'b10q7',
      prompt: 'Nam tanqis joylarda yashovchilar uchun xos ayirish mahsuloti qaysi?',
      hint: 'Suvda yomon eriydi.',
      explanation: 'Siydik kislota — uni chiqarish uchun deyarli suv kerak emas.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ammiak', 'mochevina', 'siydik kislota', 'karbonat angidrid'], answerIndex: 2 } }
    },
    {
      id: 'b10q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Mezofitlar eng keng tarqalgan.',
      explanation: 'Madaniy oʻsimliklarning aksariyati mezofit; sukkulentlarda ogʻizchalar kunduzi yopiq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Moʻtadil zonadagi madaniy oʻsimliklarning aksariyati mezofit.', value: true },
            { text: 'Sukkulentlarda ogʻizchalar kunduzi yopiq boʻladi.', value: true },
            { text: 'Sklerofitlar suvni toʻqimalarida koʻp saqlaydi.', value: false },
            { text: 'Botqoqdagi qaragʻay ildizi yerga juda chuqur ketadi.', value: false }
          ]
        }
      }
    }
  ]
};
