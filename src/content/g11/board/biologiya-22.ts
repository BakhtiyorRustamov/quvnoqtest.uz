import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 22-§ (122–126-betlar) — ekosistemalar barqarorligi, gomeostaz, suksessiya (birlamchi va ikkilamchi), klimaks. */
export const BIO_22: BoardLesson = {
  n: 22,
  label: '22',
  group: BOB2,
  title: 'Biogeotsenozlarning barqarorligi',
  section: '22-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Vulqon otilib, hamma joy yalangʻoch qoya boʻlib qoldi. Bir necha yuz yildan keyin shu yerda qalin oʻrmon oʻsadi! Lishayniklardan boshlab, yoʻsin, oʻt, buta va daraxtgacha — jamoalar birin-ketin almashadi. Bu jarayon suksessiya deyiladi.",
      easy: "Qoyadan oʻrmongacha — jamoalar almashinuvi, suksessiya.",
      draw: [
        { t: 'title', text: 'Qoyadan oʻrmongacha' },
        { t: 'icon', x: 16, y: 34, emoji: '🌋', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🌲', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['yalangʻoch qoya', '… yuzlab yil …', 'barqaror oʻrmon'] }
      ],
      next: 'Barqarorlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ekosistema barqarorligi — omillar oʻzgarganda ham tuzilishi va normal ishini saqlay olishi. U moddalar va energiya almashinuvi hamda quyosh energiyasi bilan taʼminlanadi. Turlar va trofik aloqalar qancha xilma-xil, populatsiyalar genetik jihatdan qancha boy boʻlsa, barqarorlik shuncha yuqori. Oʻz-oʻzini boshqarib, dinamik muvozanatni saqlash — gomeostaz.",
      easy: "Barqarorlik — xilma-xillikka bogʻliq; gomeostaz — muvozanatni saqlash.",
      draw: [
        { t: 'title', text: 'Barqarorlik nimaga bogʻliq?' },
        { t: 'list', x: 4, y: 20, items: ['turlar xilma-xilligi', 'trofik aloqalar koʻpligi', 'genetik xilma-xillik'] },
        { t: 'text', x: 4, y: 48, text: 'gomeostaz — dinamik muvozanat', color: 'purple' },
        { t: 'text', x: 4, y: 58, text: 'inson aralashuvi gomeostazni buzadi', size: 's', color: 'red' }
      ],
      next: 'Birlamchi suksessiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Birlamchi suksessiya tuproq va oʻsimlik boʻlmagan joyda boshlanadi: vulqon lavasi, qum tepaligi, qoya. Avval lishayniklar va suvoʻtlar keladi: ular chiqargan kislota toshni yemiradi, qoldiqlari tuproq hosil qiladi. Keyin yoʻsinlar, oʻtlar, butalar va nihoyat daraxtlar; ular bilan birga hayvonlar ham koʻpayadi. Bunda asosiy rolni oʻsimliklar oʻynaydi.",
      easy: "Lishaynik → yoʻsin → oʻt → buta → daraxt.",
      draw: [
        { t: 'title', text: 'Birlamchi suksessiya' },
        { t: 'box', id: 'a', x: 2, y: 28, w: 18, h: 8, text: 'lishaynik' },
        { t: 'box', id: 'b', x: 22, y: 28, w: 16, h: 8, text: 'yoʻsin' },
        { t: 'box', id: 'c', x: 40, y: 28, w: 16, h: 8, text: 'oʻtlar' },
        { t: 'box', id: 'd', x: 58, y: 28, w: 16, h: 8, text: 'buta' },
        { t: 'box', id: 'e', x: 76, y: 28, w: 22, h: 8, text: 'daraxt', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' },
        { t: 'arrow', from: 'd', to: 'e' },
        { t: 'text', x: 4, y: 50, text: '1–10 yil … 100 yil va undan koʻp', size: 's' }
      ],
      next: 'Klimaks'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Suksessiyaning yakuniy, jamoa va muhit muvozanatga kelgan bosqichi — klimaks. Unga yetish yuzlab yoki minglab yil oladi. Klimaks ekosistemalarda moddalar va energiya aylanishi toʻliq muvozanatlashgan, ular eng barqaror: tayga, tundra, dasht.",
      easy: "Klimaks — suksessiyaning barqaror yakuniy bosqichi.",
      draw: [
        { t: 'title', text: 'Klimaks' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 58, h: 38, xmin: 0, xmax: 10, ymin: 0, ymax: 1.2, xlabel: 'vaqt', ylabel: 'turlar' },
        { t: 'curve', axes: 'g', points: [[0, 0.05], [1, 0.12], [2, 0.3], [3, 0.55], [4, 0.75], [5, 0.88], [6, 0.95], [8, 1], [10, 1]], color: 'green' },
        { t: 'list', x: 70, y: 26, items: ['klimaks:', 'tayga', 'tundra', 'dasht'] }
      ],
      next: 'Ikkilamchi'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ikkilamchi suksessiya jamoa buzilgan, lekin tuprogʻi saqlangan joyda boradi: yongʻin, qurgʻoqchilik, oʻrmon kesilishidan keyin. Tuproqda ildizlar, urugʻlar, sporalar va hayvonlar qolgani uchun u birlamchidan ancha tez kechadi. Koʻpincha inson sabab boʻlgani uchun antropogen suksessiya ham deyiladi.",
      easy: "Ikkilamchi — tuproq bor joyda (yongʻindan keyin), tezroq.",
      draw: [
        { t: 'title', text: 'Birlamchi va ikkilamchi' },
        { t: 'table', x: 4, y: 20, rows: [['suksessiya', 'qayerda', 'tezligi'], ['birlamchi', 'lava, qoya, qum', 'juda sekin'], ['ikkilamchi', 'yongʻin, kesilgan oʻrmon', 'tezroq']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ekosistema barqarorligi — oʻzgargan sharoitda tuzilish va faoliyatni saqlash; u turlar, trofik aloqalar va genetik xilma-xillikka bogʻliq; gomeostaz — dinamik muvozanat.',
    'Suksessiya — ekosistemalarning izchil almashinuvi: birlamchi (tuproqsiz joyda, lishaynikdan daraxtgacha) va ikkilamchi (tuproq saqlangan joyda, tezroq).',
    'Klimaks — suksessiyaning eng barqaror yakuniy bosqichi (tayga, tundra, dasht).'
  ],
  questions: [
    {
      id: 'b22q1',
      prompt: 'Birlamchi suksessiya bosqichlarini tartiblang.',
      hint: 'Lishayniklar birinchi.',
      explanation: 'Lishayniklar → yoʻsinlar → oʻtlar → butalar → daraxtlar.',
      widget: { type: 'order_line', props: { items: [{ label: 'lishayniklar' }, { label: 'yoʻsinlar' }, { label: 'oʻtlar' }, { label: 'butalar' }, { label: 'daraxtlar' }] } }
    },
    {
      id: 'b22q2',
      prompt: 'Misolni suksessiya turiga ajrating.',
      hint: 'Tuproq bormi?',
      explanation: 'Birlamchi: vulqon lavasi oʻrnida oʻrmon, qumliklarning oʻsimlik bilan qoplanishi. Ikkilamchi: yongʻindan keyin oʻtloq tiklanishi, kesilgan oʻrmon oʻrnining tiklanishi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'b', label: 'Birlamchi' },
            { id: 'i', label: 'Ikkilamchi' }
          ],
          items: [
            { emoji: '', label: 'vulqon lavasi oʻrnida oʻrmon', bin: 'b' },
            { emoji: '', label: 'qumliklarning oʻsimlikka qoplanishi', bin: 'b' },
            { emoji: '', label: 'yongʻindan keyin oʻtloq tiklanishi', bin: 'i' },
            { emoji: '', label: 'kesilgan oʻrmonning tiklanishi', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'b22q3',
      prompt: 'Suksessiyaning barqaror yakuniy bosqichi qanday ataladi?',
      hint: 'Tayga, tundra…',
      explanation: 'Klimaks.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['gomeostaz', 'klimaks', 'biotop', 'ekotop'], answerIndex: 1 } }
    },
    {
      id: 'b22q4',
      prompt: 'Nima uchun ikkilamchi suksessiya tezroq kechadi?',
      hint: 'Tuproqda nima qolgan?',
      explanation: 'Tuproqda ildizlar, urugʻlar, sporalar va karaxt hayvonlar saqlanib qolgan.',
      widget: {
        type: 'mcq',
        props: { prompt: '', choices: ['tuproq va urugʻlar saqlangan', 'yogʻin koʻp', 'yirtqichlar yoʻq', 'quyosh kuchli'], answerIndex: 0 }
      }
    },
    {
      id: 'b22q5',
      prompt: 'Ekosistema barqarorligini oshiradigan omillarni belgilang.',
      hint: 'Xilma-xillik.',
      explanation: 'Turlar xilma-xilligi, murakkab trofik aloqalar, genetik xilma-xillik.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'turlar xilma-xilligi', correct: true },
            { label: 'murakkab trofik aloqalar', correct: true },
            { label: 'genetik xilma-xillik', correct: true },
            { label: 'bitta tur hukmronligi' },
            { label: 'oziq zanjirining qisqaligi' }
          ]
        }
      }
    },
    {
      id: 'b22q6',
      prompt: 'Birlamchi suksessiyada lishayniklarning roli nima?',
      hint: 'Ular kislota chiqaradi.',
      explanation: 'Toshni yemirib, qoldiqlari bilan dastlabki tuproqni hosil qiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['toshni yemirib tuproq hosil qiladi', 'daraxtlarni changlatadi', 'yirtqichlarni boqadi', 'suvni shoʻrlantiradi'], answerIndex: 0 } }
    },
    {
      id: 'b22q7',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Gomeostaz — muvozanat.',
      explanation: 'Gomeostaz — dinamik muvozanatni saqlash; suksessiya — ekosistemalar almashinuvi; klimaks — barqaror yakuniy bosqich.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'gomeostaz' }, b: { label: 'dinamik muvozanatni saqlash' } },
            { a: { label: 'suksessiya' }, b: { label: 'ekosistemalar almashinuvi' } },
            { a: { label: 'klimaks' }, b: { label: 'barqaror yakuniy bosqich' } }
          ]
        }
      }
    },
    {
      id: 'b22q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Klimaksga yetish uzoq.',
      explanation: 'Klimaksga yetish yuzlab-minglab yil oladi; turlar kam ekosistemalar beqaror.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Klimaks bosqichiga yetish yuzlab yoki minglab yil talab qiladi.', value: true },
            { text: 'Turlari kam ekosistemalar beqaror boʻladi.', value: true },
            { text: 'Ikkilamchi suksessiya faqat vulqon lavasida boradi.', value: false },
            { text: 'Birlamchi suksessiyada asosiy rolni yirtqichlar oʻynaydi.', value: false }
          ]
        }
      }
    }
  ]
};
