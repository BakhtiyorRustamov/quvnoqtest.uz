import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 20-§ (112–117-betlar) — Markaziy Osiyo va Oʻzbekistonning tabiiy ekosistemalari: choʻl (shoʻrxok, qumli, gipsli), toʻqaylar, adirlar, togʻ oʻrmonlari, yaylovlar. */
export const BIO_20: BoardLesson = {
  n: 20,
  label: '20',
  group: BOB2,
  title: 'Markaziy Osiyo va Oʻzbekiston ekosistemalari',
  section: '20-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oʻzbekistonda bir kunda choʻldan muzliklargacha borish mumkin! Qizilqum choʻllari, Amudaryo toʻqaylari, lolaqizgʻaldoqli adirlar, yongʻoqzor togʻ oʻrmonlari va archa oʻsgan yaylovlar — respublikamiz tabiati juda xilma-xil.",
      easy: "Choʻl, toʻqay, adir, togʻ oʻrmoni, yaylov — Oʻzbekiston ekosistemalari.",
      draw: [
        { t: 'title', text: 'Oʻzbekiston tabiati' },
        { t: 'icon', x: 16, y: 40, emoji: '🏜️', size: 'l' },
        { t: 'list', x: 32, y: 22, items: ['choʻl', 'toʻqay', 'adir', 'togʻ oʻrmoni', 'yaylov'] }
      ],
      next: 'Balandlik zonalari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Zonalar balandlikka qarab almashadi. Choʻl — dengiz sathidan 400–500 metrgacha, respublika hududining 60 foizidan koʻpi. Adirlar — 500 dan 1200 metrgacha. Togʻ oʻrmonlari — taxminan 1200–1600 dan 2700–2800 metrgacha. Undan yuqori — yaylovlar, 3000 metr atrofida va undan baland — togʻ muzliklari.",
      easy: "Choʻl < 500 m, adir 500–1200, togʻ oʻrmoni 1200–2800, yaylov > 2800 m.",
      draw: [
        { t: 'title', text: 'Balandlik zonalari' },
        { t: 'table', x: 4, y: 20, rows: [['zona', 'balandlik, m'], ['choʻl', '500 gacha'], ['adir', '500–1200'], ['togʻ oʻrmoni', '1200–2800'], ['yaylov', '2800 dan yuqori']] }
      ],
      next: 'Choʻl'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Choʻlda yozi issiq, harorat 45 gradusgacha, yillik yogʻin 200 millimetrdan oshmaydi — cheklovchi omil namlik. Tuprogʻiga koʻra choʻllar uch xil: shoʻrxok — shoʻra, sarsazan, baliqkoʻz; qumli — saksovul, juzgʻun, qumtariq, iloq; gipsli — boyalich, buyurgʻun, shuvoq. Hayvonlar metabolitik suvdan foydalanadi, koʻpi tunda faol: jayron, qoʻshoyoq, echkemar, choʻl toshbaqasi.",
      easy: "Choʻl: yogʻin < 200 mm; shoʻrxok, qumli, gipsli choʻllar.",
      draw: [
        { t: 'title', text: 'Choʻl ekotizimi' },
        { t: 'table', x: 4, y: 20, rows: [['choʻl', 'oʻsimliklar'], ['shoʻrxok', 'shoʻra, sarsazan'], ['qumli', 'saksovul, juzgʻun'], ['gipsli', 'boyalich, shuvoq']] },
        { t: 'text', x: 4, y: 52, text: 'yogʻin < 200 mm, yozda +45 °C gacha', size: 's', color: 'red' }
      ],
      next: 'Toʻqay va adir'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻqaylar — daryo boʻylaridagi chakalakzorlar, eng kattalari Sirdaryo va Amudaryo boʻyida: qamish, shirinmiya, turangʻil, yulgʻun, jiyda; hayvonlar — toʻngʻiz, toʻqay mushugi, qirgʻovul. Ular qirgʻoqni yemirilishdan saqlaydi, lekin daryo suvi kamayib, qisqarmoqda. Adirlar unumdorroq: boʻyimodaron, andiz, shirach, lolaqizgʻaldoq; oqquyruq, jayron, kaklik, bedana.",
      easy: "Toʻqay — daryo boʻyi (turangʻil, qamish); adir — lolaqizgʻaldoq, shirach.",
      draw: [
        { t: 'title', text: 'Toʻqay va adir' },
        { t: 'table', x: 4, y: 20, rows: [['zona', 'oʻsimlik', 'hayvon'], ['toʻqay', 'turangʻil, qamish', 'qirgʻovul, toʻngʻiz'], ['adir', 'shirach, andiz', 'kaklik, jayron']] },
        { t: 'text', x: 4, y: 48, text: 'toʻqaylar qirgʻoqni yemirilishdan saqlaydi', size: 's', color: 'green' }
      ],
      next: 'Togʻlar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Togʻ oʻrmonlarida yongʻoq, olma, togʻolcha, bodom, archa oʻsadi; qoʻngʻir ayiq, silovsin, togʻ echkisi yashaydi; lola, shirach kabi muhofazaga muhtoj turlar bor. Yaylovlarda havo sovuq, shamol kuchli: archa yer bagʻirlab, kirpioʻt yostiqsimon oʻsadi; arxar, ilvirs, togʻ takasi yashaydi. Archa kesish va jadal qishloq xoʻjaligi bu biomlarni buzmoqda.",
      easy: "Togʻ oʻrmoni — yongʻoq, archa; yaylov — yostiqsimon oʻsimliklar, ilvirs.",
      draw: [
        { t: 'title', text: 'Togʻ oʻrmoni va yaylov' },
        { t: 'table', x: 4, y: 20, rows: [['zona', 'oʻsimlik', 'hayvon'], ['togʻ oʻrmoni', 'yongʻoq, archa', 'ayiq, silovsin'], ['yaylov', 'kirpioʻt, archa', 'arxar, ilvirs']] },
        { t: 'text', x: 4, y: 48, text: 'xavf: archa kesish, jadal xoʻjalik', size: 's', color: 'red' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Oʻzbekiston zonalari balandlik boʻyicha: choʻl (< 500 m, hududning 60 % idan koʻpi), adir (500–1200 m), togʻ oʻrmoni (≈ 1200–2800 m), yaylov (2800 m dan yuqori).',
    'Choʻlda yogʻin 200 mm dan kam; shoʻrxok, qumli va gipsli choʻllar; hayvonlar metabolitik suvdan foydalanadi, koʻpi tungi.',
    'Toʻqaylar daryo boʻyida qirgʻoqni saqlaydi; togʻ oʻrmonlari va yaylovlar archa kesish va jadal xoʻjalikdan zarar koʻrmoqda.'
  ],
  questions: [
    {
      id: 'b20q1',
      prompt: 'Oʻsimlikni u oʻsadigan zonaga ajrating.',
      hint: 'Turangʻil — daryo boʻyida.',
      explanation: 'Qumli choʻl: saksovul, juzgʻun. Toʻqay: turangʻil, qamish. Adir: shirach, lolaqizgʻaldoq.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'c', label: 'Qumli choʻl' },
            { id: 't', label: 'Toʻqay' },
            { id: 'a', label: 'Adir' }
          ],
          items: [
            { emoji: '', label: 'saksovul', bin: 'c' },
            { emoji: '', label: 'juzgʻun', bin: 'c' },
            { emoji: '', label: 'turangʻil', bin: 't' },
            { emoji: '', label: 'qamish', bin: 't' },
            { emoji: '', label: 'shirach', bin: 'a' },
            { emoji: '', label: 'lolaqizgʻaldoq', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'b20q2',
      prompt: 'Zonalarni pastdan yuqoriga tartiblang.',
      hint: 'Choʻl — eng pastda.',
      explanation: 'Choʻl → adir → togʻ oʻrmoni → yaylov.',
      widget: { type: 'order_line', props: { items: [{ label: 'choʻl' }, { label: 'adir' }, { label: 'togʻ oʻrmoni' }, { label: 'yaylov' }] } }
    },
    {
      id: 'b20q3',
      prompt: 'Choʻl mintaqasi respublika hududining qancha qismini egallaydi?',
      hint: 'Yarmidan koʻp.',
      explanation: '60 % dan koʻpini.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['10 % ga yaqin', '30 % ga yaqin', '60 % dan koʻp', '90 % dan koʻp'], answerIndex: 2 } }
    },
    {
      id: 'b20q4',
      prompt: 'Choʻlda yillik yogʻin miqdori qancha millimetrdan oshmaydi?',
      hint: 'Juda kam.',
      explanation: '200 mm.',
      widget: { type: 'number_answer', props: { answer: 200, unit: 'mm' } }
    },
    {
      id: 'b20q5',
      prompt: 'Hayvonni zonasi bilan juftlang.',
      hint: 'Ilvirs — baland togʻda.',
      explanation: 'Echkemar — choʻl; qirgʻovul — toʻqay; kaklik — adir; ilvirs — yaylov.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'echkemar', right: 'choʻl' },
            { left: 'qirgʻovul', right: 'toʻqay' },
            { left: 'kaklik', right: 'adir' },
            { left: 'ilvirs', right: 'yaylov' }
          ]
        }
      }
    },
    {
      id: 'b20q6',
      prompt: 'Choʻlni tuprogʻi boʻyicha oʻsimligi bilan juftlang.',
      hint: 'Shoʻrxokda shiraga boy oʻsimliklar.',
      explanation: 'Shoʻrxok — sarsazan; qumli — saksovul; gipsli — boyalich.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'shoʻrxok choʻl' }, b: { label: 'sarsazan' } },
            { a: { label: 'qumli choʻl' }, b: { label: 'saksovul' } },
            { a: { label: 'gipsli choʻl' }, b: { label: 'boyalich' } }
          ]
        }
      }
    },
    {
      id: 'b20q7',
      prompt: 'Toʻqaylarning ahamiyatini belgilang.',
      hint: 'Daryo boʻyi oʻrmonlari.',
      explanation: 'Qirgʻoqni saqlaydi, havoni namlab kislorod bilan boyitadi, foydali hayvonlar yashash joyi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'qirgʻoqni yemirilishdan saqlaydi', correct: true },
            { label: 'choʻl havosini yumshatadi', correct: true },
            { label: 'hayvonlar uchun yashash joyi', correct: true },
            { label: 'daryo suvini shoʻrlantiradi' }
          ]
        }
      }
    },
    {
      id: 'b20q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Yaylovda shamol kuchli.',
      explanation: 'Yaylovda daraxtlar past boʻyli, archa yer bagʻirlab oʻsadi; toʻqaylar daryo suvi kamayib qisqarmoqda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Yaylovlarda archa yer bagʻirlab oʻsadi.', value: true },
            { text: 'Daryo suvi kamaygani uchun toʻqaylar qisqarmoqda.', value: true },
            { text: 'Adirlar dengiz sathidan 3000 m balandda joylashgan.', value: false },
            { text: 'Choʻl hayvonlari doimo koʻp suv ichishga muhtoj.', value: false }
          ]
        }
      }
    }
  ]
};
