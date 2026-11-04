import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 12-§ (67–76-betlar) — biotik omillar, munosabat turlari (0 0, + +, + −, + 0, − 0, − −), simbioz (mutualizm, protokooperatsiya, kommensalizm), antibioz (raqobat, Gauze tajribasi, amensalizm, yirtqichlik, parazitizm). */
export const BIO_12: BoardLesson = {
  n: 12,
  label: '12',
  group: BOB2,
  title: 'Biotik omillar. Organizmlar oʻrtasidagi munosabatlar',
  section: '12-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Termitlar yogʻoch yeydi, lekin uni hazm qila olmaydi! Ularning ichagidagi bir hujayrali xivchinlilar sellulozani shakarga parchalaydi. Xivchinlilarsiz termit ochlikdan oʻladi, xivchinlilar esa termit ichagida uy va oziq topadi. Tirik organizmlar oʻrtasidagi bunday munosabatlar — biotik omillar.",
      easy: "Termit va xivchinli — bir-birisiz yashay olmaydi.",
      draw: [
        { t: 'title', text: 'Birga yashash' },
        { t: 'icon', x: 16, y: 40, emoji: '🐜', size: 'l' },
        { t: 'list', x: 30, y: 24, items: ['termit — yogʻoch yeydi', 'xivchinli — sellulozani hazm qiladi', 'ikkalasiga foyda'] }
      ],
      next: 'Belgilar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Munosabatlar tur ichidagi va turlararo boʻladi. Ularni belgilar bilan yozamiz: plyus — populatsiya foyda koʻradi, minus — zarar, nol — taʼsir yoʻq. Neytralizm — nol nol: bir oʻrmondagi qizilishton va bugʻu. Simbioz — ikkalasi yoki biri foyda oladi. Antibioz — kamida biri zarar koʻradi.",
      easy: "+ foyda, − zarar, 0 taʼsirsiz; neytralizm (0 0).",
      draw: [
        { t: 'title', text: 'Munosabat belgilari' },
        { t: 'table', x: 4, y: 20, rows: [['belgi', 'munosabat'], ['0 0', 'neytralizm'], ['+ +', 'mutualizm, protokooperatsiya'], ['+ 0', 'kommensalizm'], ['+ −', 'yirtqichlik, parazitizm'], ['− 0', 'amensalizm'], ['− −', 'raqobat']] }
      ],
      next: 'Simbioz'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Mutualizm — oʻzaro foydali va majburiy: lishayniklarda zamburugʻ suv beradi, suvoʻt fotosintez qiladi; dukkaklilar ildizidagi tugunak bakteriyalar havodagi azotni oʻzlashtiradi; mikoriza; termit va xivchinlilar. Protokooperatsiya — foydali, lekin majburiy emas: asalari changlatadi, tozalovchi baliqlar yirik baliqlarni parazitlardan tozalaydi.",
      easy: "Mutualizm — majburiy (lishaynik); protokooperatsiya — ixtiyoriy (asalari va gul).",
      draw: [
        { t: 'title', text: 'Oʻzaro foyda (+ +)' },
        { t: 'box', id: 'm', x: 4, y: 22, w: 42, h: 8, text: 'mutualizm', color: 'green' },
        { t: 'box', id: 'p', x: 52, y: 22, w: 44, h: 8, text: 'protokooperatsiya', color: 'blue' },
        { t: 'list', x: 4, y: 38, items: ['majburiy', 'lishaynik', 'tugunak bakteriya'] },
        { t: 'list', x: 52, y: 38, items: ['majburiy emas', 'asalari — gul', 'tozalovchi baliq'] }
      ],
      next: 'Kommensalizm'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kommensalizm — biri foyda oladi, ikkinchisiga farqi yoʻq. Uning uch shakli: hamsoyalik — boshqasidan uy sifatida foydalanish: daraxtdagi orxideya va lishayniklar, mollyuska ichiga tuxum qoʻyadigan gorchak baliq. Hamtovoqlik — bitta oziq manbayining turli qismlari. Hamxoʻraklik — oziq qoldiqlari: tasqara sher qoldigʻini yeydi, yopishqoq baliq akulaga yopishib yuradi.",
      easy: "Kommensalizm (+ 0): hamsoyalik, hamtovoqlik, hamxoʻraklik.",
      draw: [
        { t: 'title', text: 'Kommensalizm (+ 0)' },
        { t: 'table', x: 4, y: 20, rows: [['shakl', 'misol'], ['hamsoyalik', 'daraxtdagi orxideya'], ['hamtovoqlik', 'saprofit va oʻsimlik'], ['hamxoʻraklik', 'yopishqoq baliq — akula']] }
      ],
      next: 'Raqobat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Raqobat — oʻxshash ehtiyojli turlar orasida, ikkalasiga zarar. Tur ichidagi raqobat eng shiddatli — u tabiiy tanlanishga olib keladi. G. F. Gauze 1932-yilda ikki tur infuzoriyani bitta idishda koʻpaytirdi: biri ikkinchisini butunlay siqib chiqardi. Raqobatni cheklovchi prinsip: bir xil ehtiyojli ikki tur birga yashay olmaydi.",
      easy: "Raqobat (− −); Gauze: bir xil nishali turlardan biri siqib chiqariladi.",
      draw: [
        { t: 'title', text: 'Gauze tajribasi (1932)' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 54, h: 40, xmin: 0, xmax: 10, ymin: 0, ymax: 1.2, xlabel: 'kun', ylabel: 'soni' },
        { t: 'curve', axes: 'g', points: [[0, 0.05], [1, 0.15], [2, 0.35], [3, 0.6], [4, 0.8], [5, 0.92], [6, 1], [8, 1.05], [10, 1.05]], color: 'green' },
        { t: 'curve', axes: 'g', points: [[0, 0.05], [1, 0.12], [2, 0.25], [3, 0.35], [4, 0.35], [5, 0.28], [6, 0.18], [8, 0.06], [10, 0]], color: 'red' },
        { t: 'list', x: 67, y: 26, items: ['yashil — gʻolib', 'qizil — yoʻqoldi'] }
      ],
      next: 'Antibioz'
    },
    {
      kind: 'example',
      clear: true,
      say: "Amensalizm — biri zarar koʻradi, ikkinchisiga farqi yoʻq: daraxt soyasidagi yorugʻsevar oʻt, antibiotik chiqaruvchi mogʻor. Yirtqichlik — biri ikkinchisini yeydi; yirtqichlar kasal hayvonlarni qirib, populatsiyani sogʻlomlashtiradi — tabiat sanitarlari. Parazitizm — xoʻjayin hisobiga yashash: askarida, jigar qurti, zarpechak; parazit xoʻjayinni kuchsizlantiradi, lekin odatda oʻldirmaydi.",
      easy: "Amensalizm (− 0), yirtqichlik va parazitizm (+ −).",
      draw: [
        { t: 'title', text: 'Antibioz' },
        { t: 'table', x: 4, y: 20, rows: [['munosabat', 'belgi', 'misol'], ['amensalizm', '− 0', 'mogʻor — bakteriya'], ['yirtqichlik', '+ −', 'boʻri — quyon'], ['parazitizm', '+ −', 'askarida — odam'], ['raqobat', '− −', 'boʻri — tulki']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Biotik munosabatlar belgilar bilan: neytralizm (0 0), mutualizm va protokooperatsiya (+ +), kommensalizm (+ 0), yirtqichlik va parazitizm (+ −), amensalizm (− 0), raqobat (− −).',
    'Mutualizm majburiy (lishaynik, tugunak bakteriya, termit), protokooperatsiya ixtiyoriy (asalari va gul); kommensalizm — hamsoyalik, hamtovoqlik, hamxoʻraklik.',
    'Gauze tajribasi: bir xil ehtiyojli ikki tur birga yashay olmaydi; yirtqichlar va parazitlar populatsiya sonini boshqaradi.'
  ],
  questions: [
    {
      id: 'b12q1',
      prompt: 'Munosabatni misoli bilan juftlang.',
      hint: 'Tugunak bakteriya — oʻzaro foyda.',
      explanation: 'Mutualizm — tugunak bakteriya va dukkakli; parazitizm — jigar qurti va qoramol; kommensalizm — yopishqoq baliq va akula; raqobat — kulrang va qora kalamush; yirtqichlik — boʻgʻma ilon va tovushqon.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'tugunak bakteriya — dukkakli', right: 'mutualizm' },
            { left: 'jigar qurti — qoramol', right: 'parazitizm' },
            { left: 'yopishqoq baliq — akula', right: 'kommensalizm' },
            { left: 'kulrang — qora kalamush', right: 'raqobat' },
            { left: 'boʻgʻma ilon — tovushqon', right: 'yirtqichlik' }
          ]
        }
      }
    },
    {
      id: 'b12q2',
      prompt: 'Munosabatni belgisi boʻyicha ajrating.',
      hint: 'Asalari va gul — ikkalasiga foyda.',
      explanation: '+ +: lishaynik, asalari va gul. + 0: epifit oʻsimlik, tasqara va sher qoldigʻi. + −: askarida va odam, zarpechak.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'pp', label: '+ +' },
            { id: 'p0', label: '+ 0' },
            { id: 'pm', label: '+ −' }
          ],
          items: [
            { emoji: '', label: 'lishaynikdagi zamburugʻ va suvoʻt', bin: 'pp' },
            { emoji: '', label: 'asalari va gul', bin: 'pp' },
            { emoji: '', label: 'daraxtdagi epifit', bin: 'p0' },
            { emoji: '', label: 'tasqara — sher qoldigʻi', bin: 'p0' },
            { emoji: '', label: 'askarida — odam', bin: 'pm' },
            { emoji: '', label: 'zarpechak', bin: 'pm' }
          ]
        }
      }
    },
    {
      id: 'b12q3',
      prompt: 'Ikkala tur uchun ham zararli yagona munosabat qaysi?',
      hint: '− −.',
      explanation: 'Oʻzaro raqobat.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['parazitizm', 'amensalizm', 'raqobat', 'yirtqichlik'], answerIndex: 2 } }
    },
    {
      id: 'b12q4',
      prompt: 'Raqobatni cheklovchi prinsipni kim tajribada isbotlagan?',
      hint: 'Infuzoriyalar bilan, 1932-yil.',
      explanation: 'G. F. Gauze.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Ch. Darvin', 'G. F. Gauze', 'V. V. Dokuchayev', 'A. Tensli'], answerIndex: 1 } }
    },
    {
      id: 'b12q5',
      prompt: 'Kommensalizm shaklini misoli bilan juftlang.',
      hint: 'Hamxoʻraklik — qoldiq bilan.',
      explanation: 'Hamsoyalik — gorchak baliq mollyuskaga tuxum qoʻyadi; hamtovoqlik — saprofit bakteriya va oʻsimlik; hamxoʻraklik — tasqara sher qoldigʻini yeydi.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'hamsoyalik' }, b: { label: 'gorchak baliq tuxumi mollyuskada' } },
            { a: { label: 'hamtovoqlik' }, b: { label: 'saprofit bakteriya va oʻsimlik' } },
            { a: { label: 'hamxoʻraklik' }, b: { label: 'tasqara sher qoldigʻini yeydi' } }
          ]
        }
      }
    },
    {
      id: 'b12q6',
      prompt: 'Daraxt soyasida yorugʻsevar oʻtning qiynalishi qanday munosabat?',
      hint: 'Daraxtga farqi yoʻq.',
      explanation: 'Amensalizm (− 0).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kommensalizm', 'amensalizm', 'mutualizm', 'neytralizm'], answerIndex: 1 } }
    },
    {
      id: 'b12q7',
      prompt: 'Qaysi biri mutualizmga misol emas?',
      hint: 'Mutualizm — majburiy oʻzaro foyda.',
      explanation: 'Yopishqoq baliq va akula — kommensalizm; qolganlari mutualizm.',
      widget: {
        type: 'odd_one_out',
        props: { tiles: [{ text: 'lishaynik' }, { text: 'mikoriza' }, { text: 'termit va xivchinli' }, { text: 'yopishqoq baliq va akula', odd: true }] }
      }
    },
    {
      id: 'b12q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Yirtqichlar — sanitarlar.',
      explanation: 'Yirtqichlar kasal va zaif hayvonlarni qiradi; tur ichidagi raqobat eng shiddatli; parazit odatda xoʻjayinni oʻldirmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Yirtqichlar populatsiyaning genofondini tozalaydi.', value: true },
            { text: 'Tur ichidagi raqobat turlararo raqobatdan keskinroq.', value: true },
            { text: 'Parazit odatda xoʻjayinni tezda nobud qiladi.', value: false },
            { text: 'Neytralizm tabiatda juda keng tarqalgan.', value: false }
          ]
        }
      }
    }
  ]
};
