import type { BoardLesson } from './types';
import { JH3 } from './tarix-127';

/** Darslik: Jahon tarixi 11, 28-mavzu (130–134-betlar) — barqaror rivojlanish, Rio-de-Janeyro konferensiyasi, irqchilikka qarshi kurash, etno-ijtimoiy muammolar va migratsiya. */
export const TARIX_128: BoardLesson = {
  n: 128,
  label: '28',
  group: JH3,
  title: 'Barqaror rivojlanish va etno-ijtimoiy muammolar',
  section: 'Jahon tarixi, 28-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Barqaror rivojlanish — tabiiy resurslardan foydalanish, sarmoya, fan-texnika va inson rivojlanishini bir-biriga moslashtirib, bugungi va kelajak avlodlar ehtiyojlarini qondirishga qaratilgan taraqqiyot. Buning uchun xalqaro hamkorlik va kam energiya sarflaydigan yuqori texnologiyalarga oʻtish muhim. 1992-yilda Rio-de-Janeyroda atrof-muhitni himoya qilish va barqaror taraqqiyot boʻyicha xalqaro konferensiya boʻlib, XXI asr uchun harakat dasturi qabul qilindi. Yetakchi davlatlar ozon qatlamini yemiruvchi moddalarni chiqarishni kamaytirish majburiyatini oldi, atom elektr stansiyalari xavfsizligi boʻyicha xalqaro standartlarga amal qilinmoqda.",
      easy: "Barqaror rivojlanish — bugungi va kelajak avlod ehtiyojlarini muvozanatlash; 1992 — Rio konferensiyasi.",
      draw: [
        { t: 'title', text: 'Barqaror rivojlanish' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'iqtisodiyot', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'jamiyat', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'tabiat', color: 'green' },
        { t: 'text', x: 4, y: 46, text: '1992 — Rio-de-Janeyro konferensiyasi', size: 's', color: 'blue' }
      ],
      next: 'Etno-ijtimoiy muammolar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Koʻplab davlatlarda irqiy kamsitishga qarshi qonunlar qabul qilindi, etnik ozchiliklar siyosatda koʻproq ishtirok eta boshladi: masalan, AQSHda afroamerikalik Barak Obama prezident, Londonda kelib chiqishi pokistonlik Sodiq Xon shahar meri boʻldi. Ammo irqchilik hali ham muammo boʻlib qolmoqda. Dunyoda aholisi bir milliondan ortiq 164 davlatning yarmidan koʻpi koʻpmillatli. Koʻpmillatlilik mojaroga olib kelishi shart emas — Oʻzbekistonda turli millatlarning tinch-totuv yashash anʼanasi shakllangan. SSSR tarqalgach, chegaralarning etnik omilni hisobga olmay chizilgani ayrim hududlarda keskinlik oʻchoqlarini paydo qildi; mehnat migratsiyasi ham yangi etno-ijtimoiy muammolarni keltirmoqda.",
      easy: "Irqchilikka qarshi qonunlar; koʻpmillatli davlatlar; Oʻzbekiston — totuvlik anʼanasi; migratsiya muammolari.",
      draw: [
        { t: 'title', text: 'Etno-ijtimoiy masalalar' },
        { t: 'table', x: 4, y: 18, rows: [['jarayon', 'misol'], ['irqchilikka qarshi kurash', 'qonunlar, teng huquq'], ['ozchiliklarning ishtiroki', 'B. Obama, S. Xon'], ['millatlararo totuvlik', 'Oʻzbekiston'], ['yangi muammo', 'mehnat migratsiyasi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Barqaror rivojlanish — bugungi va kelajak avlodlar ehtiyojlarini tabiat bilan muvozanatda qondirishga qaratilgan taraqqiyot; 1992-yilgi Rio konferensiyasi uning dasturini qabul qildi.',
    'Irqiy kamsitishga qarshi qonunlar qabul qilinib, etnik ozchiliklar siyosatda koʻproq ishtirok eta boshladi, ammo irqchilik hali ham muammo.',
    'Koʻpmillatlilik mojaroga olib kelishi shart emas (Oʻzbekiston tajribasi); SSSRdan qolgan chegaralar va migratsiya etno-ijtimoiy muammolarni keltirib chiqarmoqda.'
  ],
  questions: [
    {
      id: 'j28q1',
      prompt: 'Atrof-muhit va barqaror taraqqiyot boʻyicha xalqaro konferensiya 1992-yilda qaysi shaharda boʻlgan?',
      hint: 'Braziliya.',
      explanation: 'Rio-de-Janeyroda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Parij', 'Rio-de-Janeyro', 'Kioto', 'Nyu-York'], answerIndex: 1 } }
    },
    {
      id: 'j28q2',
      prompt: 'Rio konferensiyasi qaysi yilda boʻlib oʻtgan?',
      hint: 'SSSR tarqalgandan keyingi yil.',
      explanation: '1992-yilda.',
      widget: { type: 'number_answer', props: { answer: 1992, unit: 'yil' } }
    },
    {
      id: 'j28q3',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Irqchilik — irqlarning tengsizligi haqidagi nazariya.',
      explanation: 'Barqaror rivojlanish — kelajak avlodlarni ham hisobga olgan taraqqiyot; irqchilik — irqlarning tengsizligi haqidagi ilmga zid nazariya; migratsiya — aholining koʻchishi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'barqaror rivojlanish', right: 'kelajak avlodni ham hisobga olgan taraqqiyot' },
            { left: 'irqchilik', right: 'irqlar tengsizligi haqidagi nazariya' },
            { left: 'migratsiya', right: 'aholining koʻchishi' }
          ]
        }
      }
    },
    {
      id: 'j28q4',
      prompt: 'Barqaror rivojlanish uchun koʻrilayotgan choralarni tanlang.',
      hint: 'Tabiatni asrash.',
      explanation: 'Ozonni yemiruvchi moddalarni kamaytirish, AES xavfsizligi standartlari, kam energiya sarflaydigan texnologiyalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ozonni yemiruvchi moddalarni kamaytirish', correct: true },
            { label: 'AES xavfsizligi standartlari', correct: true },
            { label: 'kam energiya sarflaydigan texnologiyalar', correct: true },
            { label: 'oʻrmonlarni ommaviy kesish' }
          ]
        }
      }
    },
    {
      id: 'j28q5',
      prompt: 'Darslikda millatlararo totuvlik anʼanasi shakllangan koʻpmillatli davlat sifatida qaysi mamlakat misol keltiriladi?',
      hint: 'Bizning yurt.',
      explanation: 'Oʻzbekiston.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Oʻzbekiston', 'Ruanda', 'Liviya', 'Suriya'], answerIndex: 0 } }
    },
    {
      id: 'j28q6',
      prompt: 'SSSR tarqalgach ayrim hududlarda etnik keskinlik paydo boʻlishining sabablarini tanlang.',
      hint: 'Chegaralar va iqtisod.',
      explanation: 'Chegaralar etnik omilni hisobga olmay chizilgani, respublikalarning notekis rivojlanishi, mehnat migratsiyasi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'chegaralar etnik omilni hisobga olmagani', correct: true },
            { label: 'respublikalarning notekis rivojlanishi', correct: true },
            { label: 'mehnat migratsiyasi', correct: true },
            { label: 'barcha aholining bir millatdan iboratligi' }
          ]
        }
      }
    },
    {
      id: 'j28q7',
      prompt: 'Shaxsni lavozimi bilan juftlang.',
      hint: 'Obama — AQSH.',
      explanation: 'Barak Obama — AQSH prezidenti; Sodiq Xon — London meri; Devid Dinkins — Nyu-York meri.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Barak Obama', right: 'AQSH prezidenti' },
            { left: 'Sodiq Xon', right: 'London meri' },
            { left: 'Devid Dinkins', right: 'Nyu-York meri' }
          ]
        }
      }
    },
    {
      id: 'j28q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Koʻpmillatlilik ≠ mojaro.',
      explanation: 'Aholining koʻpmillatli boʻlishi mojaroni muqarrar qilmaydi; irqchilik hali ham dolzarb muammo.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Aholining koʻpmillatli boʻlishi etnik mojaroni muqarrar qilmaydi.', value: true },
            { text: 'Irqchilik XXI asrda ham dolzarb muammo boʻlib qolmoqda.', value: true },
            { text: 'Dunyodagi barcha davlatlar bir millatli.', value: false },
            { text: 'Rio konferensiyasi faqat sport masalalariga bagʻishlangan.', value: false }
          ]
        }
      }
    }
  ]
};
