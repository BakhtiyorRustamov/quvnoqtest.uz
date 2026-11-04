import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';
import { rect, wave } from './phys';

/** Darslik: Biologiya 11, 7-§ (39–47-betlar) — ekologik omillar tasnifi, optimum va chidamlilik chegaralari, Libixning minimum qonuni, evri- va stenobiontlar, ekologik nisha. */
export const BIO_7: BoardLesson = {
  n: 7,
  label: '7',
  group: BOB2,
  title: 'Muhit omillari va ularning tasnifi',
  section: '7-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Uy pashshasi +7 gradusdan past va +50 gradusdan yuqori haroratda yashay olmaydi, uning uchun eng qulayi +23…+25 gradus. Odam askaridasi esa faqat odam tanasi haroratida yashaydi. Har bir tur har bir omilga oʻz chegaralari bilan javob beradi.",
      easy: "Har turning har omilga oʻz chegarasi bor.",
      draw: [
        { t: 'title', text: 'Qancha issiq kerak?' },
        { t: 'icon', x: 16, y: 40, emoji: '🪰', size: 'l' },
        { t: 'list', x: 32, y: 26, items: ['minimum: +7 °C', 'optimum: +23…+25 °C', 'maksimum: +50 °C'] }
      ],
      next: 'Omillar tasnifi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ekologik omillar uch guruh. Abiotik — notirik tabiat: iqlim (yorugʻlik, harorat, namlik, shamol), edafik — tuproq, topografik — relyef, fizik — tortishish, magnit maydoni, nurlanish. Biotik — tirik tabiat: fitogen, zoogen, mikogen, mikrobiogen. Antropogen — inson faoliyati: ifloslantirish, ov, oʻrmon kesish.",
      easy: "Abiotik (notirik), biotik (tirik), antropogen (inson).",
      draw: [
        { t: 'title', text: 'Ekologik omillar' },
        { t: 'table', x: 4, y: 20, rows: [['guruh', 'misollar'], ['abiotik', 'harorat, tuproq, relyef'], ['biotik', 'yirtqich, parazit'], ['antropogen', 'oʻrmon kesish, ov']] }
      ],
      next: 'Optimum'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Omil yetishmasa ham, ortib ketsa ham organizm qiynaladi. Eng qulay chegara — biologik optimum. Undan chetga chiqish — pessimum, noqulay zona. Minimum va maksimum orasidagi oraliq — chidamlilik chegarasi yoki tolerantlik zonasi. Bu chegaradan tashqarida organizm halok boʻladi.",
      easy: "Optimum — eng qulay; pessimum — noqulay; chegaradan tashqari — halokat.",
      draw: [
        { t: 'title', text: 'Omil taʼsiri' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 60, h: 40, xmin: 0, xmax: 11.5, ymin: 0, ymax: 1.2, xlabel: 'omil', ylabel: 'hayot' },
        { t: 'curve', axes: 'g', points: wave((x) => Math.exp(-((x - 5) ** 2) / 3.2), 1, 9, 50), color: 'green' },
        { t: 'dot', axes: 'g', x: 5, y: 1, label: 'optimum', color: 'green' },
        { t: 'dot', axes: 'g', x: 1, y: 0.01, label: 'min', color: 'red' },
        { t: 'dot', axes: 'g', x: 9, y: 0.01, label: 'max', color: 'red' },
        { t: 'list', x: 72, y: 26, items: ['optimum', 'pessimum', 'tolerantlik'] }
      ],
      next: 'Libix bochkasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Nemis olimi Yustus Libix hosildorlik tuproqda eng kam boʻlgan mineral moddaga bogʻliqligini aniqladi. Taxtalari turli balandlikdagi bochkani tasavvur qiling: suv eng past taxtadan toshib chiqadi. Minimum qonuni: organizmning yashab qolishini optimumdan eng koʻp ogʻgan omil — cheklovchi omil belgilaydi.",
      easy: "Libix: eng past taxta — cheklovchi omil.",
      draw: [
        { t: 'title', text: 'Libix bochkasi' },
        ...rect('b1', 10, 26, 6, 36, 'orange'),
        ...rect('b2', 16, 30, 6, 32, 'orange'),
        ...rect('b3', 22, 44, 6, 18, 'red'),
        ...rect('b4', 28, 28, 6, 34, 'orange'),
        ...rect('b5', 34, 32, 6, 30, 'orange'),
        { t: 'text', x: 25, y: 41, text: 'min', size: 's', anchor: 'middle', color: 'red' },
        { t: 'list', x: 48, y: 28, items: ['suv eng past joydan', 'toshib chiqadi', 'cheklovchi omil'] }
      ],
      next: 'Evri va steno'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Chidamlilik chegarasi keng turlar — evribiontlar: kalamush, suvarak, pashsha kabi kosmopolitlar Yer yuzining katta qismida yashaydi. Tor chegarali turlar — stenobiontlar: koala faqat evkalipt bargi bilan oziqlanadi, ayrim kolibrilar faqat bitta oʻsimlik nektari bilan.",
      easy: "Evri — keng (kalamush), steno — tor (koala).",
      draw: [
        { t: 'title', text: 'Evribiont va stenobiont' },
        { t: 'icon', x: 14, y: 34, emoji: '🐀', size: 'l' },
        { t: 'icon', x: 14, y: 56, emoji: '🐨', size: 'l' },
        { t: 'text', x: 28, y: 36, text: 'evribiont — keng chegara', color: 'green' },
        { t: 'text', x: 28, y: 58, text: 'stenobiont — tor chegara', color: 'red' }
      ],
      next: 'Ekologik nisha'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ekologik nisha — turning yashashini belgilaydigan barcha omillar yigʻindisi: hayot tarzi, oziqlanishi, sharoitlari. Afrika savannasida jirafa daraxt barglarini, zebra oʻtlarning yuqori qismini, gnu oʻrta qismini, gʻizol pastki qismini yeydi — joy umumiy, nishalar har xil. Bir biotsenozda ikki tur bitta nishani egallamaydi.",
      easy: "Nisha — turning «kasbi»; ikki tur bir nishada yasha olmaydi.",
      draw: [
        { t: 'title', text: 'Savanna nishalari' },
        { t: 'table', x: 4, y: 20, rows: [['hayvon', 'nimani yeydi'], ['jirafa', 'daraxt barglari'], ['zebra', 'oʻtlar tepasi'], ['gnu', 'poya oʻrtasi'], ['gʻizol', 'oʻtlar pasti']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ekologik omillar: abiotik (iqlim, edafik, topografik, fizik), biotik (fitogen, zoogen, mikogen, mikrobiogen) va antropogen.',
    'Optimum — eng qulay zona, pessimum — noqulay; minimum va maksimum orasidagi chidamlilik (tolerantlik) chegarasidan tashqarida organizm halok boʻladi.',
    'Libixning minimum qonuni — cheklovchi omil; evribiontlar keng, stenobiontlar tor chegarali; ekologik nisha — turning yashashini belgilovchi omillar yigʻindisi.'
  ],
  questions: [
    {
      id: 'b7q1',
      prompt: 'Omilni guruhiga ajrating.',
      hint: 'Inson faoliyati — antropogen.',
      explanation: 'Abiotik: harorat, balandlik, yorugʻlik. Biotik: yirtqichlar, parazitlar. Antropogen: daraxt kesish, yerni sugʻorish.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'a', label: 'Abiotik' },
            { id: 'b', label: 'Biotik' },
            { id: 'n', label: 'Antropogen' }
          ],
          items: [
            { emoji: '', label: 'harorat', bin: 'a' },
            { emoji: '', label: 'balandlik', bin: 'a' },
            { emoji: '', label: 'yirtqichlar', bin: 'b' },
            { emoji: '', label: 'parazitlar', bin: 'b' },
            { emoji: '', label: 'daraxt kesish', bin: 'n' },
            { emoji: '', label: 'yerni sugʻorish', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'b7q2',
      prompt: 'Uy pashshasi uchun optimal harorat qancha?',
      hint: 'Chegaralar: +7 va +50.',
      explanation: '+23…+25 °C.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['+7 °C', '+23…+25 °C', '+40 °C', '+50 °C'], answerIndex: 1 } }
    },
    {
      id: 'b7q3',
      prompt: 'Libix bochkasida suv qayerdan toshib chiqadi?',
      hint: 'Minimum qonuni.',
      explanation: 'Eng past taxtadan — u cheklovchi omilni bildiradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['eng baland taxtadan', 'eng past taxtadan', 'tubidan', 'hamma joydan baravar'], answerIndex: 1 } }
    },
    {
      id: 'b7q4',
      prompt: 'Turni guruhiga ajrating.',
      hint: 'Kosmopolitlar — evribiont.',
      explanation: 'Evribiont: kalamush, suvarak, pashsha. Stenobiont: koala, kolibri.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'e', label: 'Evribiont' },
            { id: 's', label: 'Stenobiont' }
          ],
          items: [
            { emoji: '', label: 'kalamush', bin: 'e' },
            { emoji: '', label: 'suvarak', bin: 'e' },
            { emoji: '', label: 'pashsha', bin: 'e' },
            { emoji: '', label: 'koala', bin: 's' },
            { emoji: '', label: 'kolibri', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'b7q5',
      prompt: 'Abiotik omil turini misoli bilan juftlang.',
      hint: 'Edafik — tuproq.',
      explanation: 'Iqlim — namlik; edafik — tuproq tarkibi; topografik — qiyalik; fizik — magnit maydoni.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'iqlim', right: 'namlik' },
            { left: 'edafik', right: 'tuproq tarkibi' },
            { left: 'topografik', right: 'qiyalik' },
            { left: 'fizik', right: 'magnit maydoni' }
          ]
        }
      }
    },
    {
      id: 'b7q6',
      prompt: 'Savanna hayvonini oziqlanishi bilan juftlang.',
      hint: 'Jirafa boʻyi baland.',
      explanation: 'Jirafa — daraxt barglari; zebra — oʻt tepasi; gnu — poya oʻrtasi; gʻizol — oʻt pasti.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'jirafa' }, b: { label: 'daraxt barglari' } },
            { a: { label: 'zebra' }, b: { label: 'oʻt tepasi' } },
            { a: { label: 'gnu' }, b: { label: 'poya oʻrtasi' } },
            { a: { label: 'gʻizol' }, b: { label: 'oʻt pasti' } }
          ]
        }
      }
    },
    {
      id: 'b7q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Eng qulay — optimum.',
      explanation: 'Eng qulay zona — optimum, chetga chiqish — pessimum.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Omilning eng qulay chegarasi — ' }, { blank: 'optimum' }, { text: ', undan ogʻish — ' }, { blank: 'pessimum' }, { text: ' zona.' }],
          bank: ['optimum', 'pessimum', 'maksimum', 'nisha']
        }
      }
    },
    {
      id: 'b7q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kalamushlar raqobati.',
      explanation: 'Bir biotsenozda ikki tur bitta nishada yashamaydi (kulrang kalamush qorasini siqib chiqaradi); bitta omilga chidamlilik boshqalariga chidamlilikni bildirmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kulrang kalamush qora kalamushni siqib chiqaradi.', value: true },
            { text: 'Ekologik nisha va yashash joyi bir xil narsa emas.', value: true },
            { text: 'Bitta omilga chidamli tur barcha omillarga chidamli boʻladi.', value: false },
            { text: 'Faqat omilning yetishmasligi organizmga zarar qiladi.', value: false }
          ]
        }
      }
    }
  ]
};
