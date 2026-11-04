import type { BoardLesson } from './types';
import { BOB4 } from './biologiya-35';

/** Darslik: Biologiya 11, 44-§ (226–232-betlar) — ayirish organlari (vakuola, protonefridiy, metanefridiy, malpigi naylari, buyraklar) va jinsiy organlar evolutsiyasi. 5-laboratoriya (aromorfoz va idioadaptatsiyalar) gʻoyalari savollarda. */
export const BIO_44: BoardLesson = {
  n: 44,
  label: '44',
  group: BOB4,
  title: 'Ayirish va jinsiy organlar evolutsiyasi',
  section: '44-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Odam embrionida uchinchi hafta boshida boshlangʻich buyrak, uchinchi hafta oxirida birlamchi buyrak paydo boʻladi, ikki oylikdan boshlab esa haqiqiy buyrak shakllanadi. Embrion bir necha hafta ichida buyrakning million yillik evolutsiyasini qisqacha takrorlaydi.",
      easy: "Odam embrioni buyrak evolutsiyasini takrorlaydi: boshlangʻich → birlamchi → haqiqiy.",
      draw: [
        { t: 'title', text: 'Embriondagi buyraklar' },
        { t: 'box', id: 'a', x: 4, y: 24, w: 28, h: 9, text: '3-hafta boshi', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 24, w: 28, h: 9, text: '3-hafta oxiri', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 24, w: 28, h: 9, text: '2-oydan', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 44, text: 'boshlangʻich → birlamchi → haqiqiy', size: 's' }
      ],
      next: 'Umurtqasizlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bir hujayralilarda qisqaruvchi vakuolalar. Boʻshliqichlilarda maxsus ayirish organi yoʻq. Yassi chuvalchanglarda protonefridiylar — uchi berk shoxlangan naychalar. Toʻgarak chuvalchanglarda ikki uzun nay. Halqalilarda har boʻgʻimda bir juft metanefridiy — kiprikli voronka. Mollyuskalarda buyrak yurak oldi boʻlmasi bilan tutashadi — ayirish va qon aylanish bogʻlanadi. Qisqichbaqalarda yashil bezlar, hasharot va oʻrgimchaklarda malpigi naychalari — suvni tejaydi.",
      easy: "Vakuola → protonefridiy → metanefridiy → yashil bez, malpigi naychalari.",
      draw: [
        { t: 'title', text: 'Umurtqasizlar ayirishi' },
        { t: 'table', x: 4, y: 18, rows: [['hayvon', 'ayirish organi'], ['infuzoriya', 'qisqaruvchi vakuola'], ['yassi chuvalchang', 'protonefridiy'], ['halqali', 'metanefridiy'], ['qisqichbaqa', 'yashil bez'], ['hasharot', 'malpigi naychalari']] }
      ],
      next: 'Buyraklar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Umurtqalilarda asosiy ayirish organi — buyrak, u uch bosqichdan oʻtgan. Boshlangʻich buyrak — baliq va amfibiya lichinkalarida, qon aylanish bilan bogʻlanmagan. Birlamchi, tana buyragi — voyaga yetgan baliq va baqalarda; unda Shumlyanskiy-Bauman kapsulasi va Malpigiy tuguni paydo boʻlib, ayirish qon aylanish bilan bogʻlangan. Haqiqiy, ikkilamchi buyrak — sudralib yuruvchi, qush va sutemizuvchilarda; nefronlar soni ortgan.",
      easy: "Boshlangʻich (lichinka) → tana buyragi (baliq, baqa) → haqiqiy buyrak (amniotalar).",
      draw: [
        { t: 'title', text: 'Buyrak bosqichlari' },
        { t: 'table', x: 4, y: 20, rows: [['buyrak', 'kimda'], ['boshlangʻich', 'baliq va amfibiya lichinkasi'], ['birlamchi (tana)', 'voyaga yetgan baliq, baqa'], ['haqiqiy', 'reptiliya, qush, sutemizuvchi']] }
      ],
      next: 'Jinsiy organlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ayirish sistemasi jinsiy sistema bilan filogenetik bogʻlangan, ikkalasi mezodermadan rivojlanadi. Gidrada jinsiy hujayralar ektodermadan hosil boʻladi. Yassi chuvalchanglar germafrodit; toʻgarak chuvalchanglar ayrim jinsli, jinsiy dimorfizm yaqqol. Kam tukli halqalilar germafrodit, lekin bir-birini urugʻlantiradi. Boʻgʻimoyoqlilar ayrim jinsli. Baliq va amfibiyalarda urugʻlanish asosan tashqi, amfibiyalar metamorfoz bilan rivojlanadi.",
      easy: "Germafrodit (yassi chuvalchang) → ayrim jinsli; baliq, amfibiya — tashqi urugʻlanish.",
      draw: [
        { t: 'title', text: 'Jinsiy sistema' },
        { t: 'table', x: 4, y: 18, rows: [['hayvon', 'jinsi', 'urugʻlanish'], ['yassi chuvalchang', 'germafrodit', 'ichki'], ['toʻgarak chuvalchang', 'ayrim jinsli', 'ichki'], ['baliq', 'ayrim jinsli', 'asosan tashqi'], ['baqa', 'ayrim jinsli', 'tashqi']] }
      ],
      next: 'Amniotalar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Sudralib yuruvchilardan boshlab ichki urugʻlanish: tuxum oziqqa boy, ohak poʻchoq bilan oʻralgan, metamorfozsiz rivojlanadi — bu aromorfoz. Qushlarda urgʻochisida bitta tuxumdon, tuxumda sariqlik koʻp, naslga gʻamxoʻrlik instinktlari kuchli. Sutemizuvchilarda bachadon: embrion ona qornida rivojlanadi, urgʻochilari bolasini sut bilan boqadi. Tuban sutemizuvchilarda bachadon yoʻq, xaltalilarda sust.",
      easy: "Reptiliya — ichki urugʻlanish, poʻchoqli tuxum; sutemizuvchi — bachadon, sut.",
      draw: [
        { t: 'title', text: 'Quruqlikda koʻpayish' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 9, text: 'ichki urugʻlanish', color: 'orange' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 9, text: 'poʻchoqli tuxum', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 9, text: 'bachadon, sut', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'har biri — aromorfoz', size: 's', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Umurtqasizlarda ayirish: qisqaruvchi vakuola → protonefridiy (yassi chuvalchang) → metanefridiy (halqali) → yashil bez (qisqichbaqa), malpigi naychalari (hasharot).',
    'Umurtqalilarda buyrak uch bosqichli: boshlangʻich (lichinkalar) → birlamchi tana buyragi (baliq, baqa) → haqiqiy buyrak (reptiliya, qush, sutemizuvchi).',
    'Jinsiy sistema ayirish bilan bogʻliq, mezodermadan rivojlanadi; reptiliyalardan ichki urugʻlanish va poʻchoqli tuxum, sutemizuvchilarda bachadon — aromorfozlar.'
  ],
  questions: [
    {
      id: 'b44q1',
      prompt: 'Hayvonni ayirish organi bilan juftlang.',
      hint: 'Hasharot — malpigi.',
      explanation: 'Yassi chuvalchang — protonefridiy; halqali chuvalchang — metanefridiy; qisqichbaqa — yashil bez; hasharot — malpigi naychalari.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'yassi chuvalchang', right: 'protonefridiy' },
            { left: 'halqali chuvalchang', right: 'metanefridiy' },
            { left: 'qisqichbaqa', right: 'yashil bez' },
            { left: 'hasharot', right: 'malpigi naychalari' }
          ]
        }
      }
    },
    {
      id: 'b44q2',
      prompt: 'Buyrak bosqichlarini evolutsiya tartibida joylashtiring.',
      hint: 'Lichinkadan boshlang.',
      explanation: 'Boshlangʻich → birlamchi (tana) → haqiqiy buyrak.',
      widget: { type: 'order_line', props: { items: [{ label: 'boshlangʻich buyrak' }, { label: 'birlamchi (tana) buyrak' }, { label: 'haqiqiy buyrak' }] } }
    },
    {
      id: 'b44q3',
      prompt: 'Haqiqiy buyrak qaysi sinflarda uchraydi?',
      hint: 'Amniotalar.',
      explanation: 'Sudralib yuruvchilar, qushlar va sutemizuvchilarda.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'sudralib yuruvchilar', correct: true },
            { label: 'qushlar', correct: true },
            { label: 'sutemizuvchilar', correct: true },
            { label: 'baliqlar' },
            { label: 'amfibiyalar' }
          ]
        }
      }
    },
    {
      id: 'b44q4',
      prompt: 'Ayirish sistemasi qon aylanish bilan qaysi buyrakda ilk bor bogʻlangan?',
      hint: 'Kapsula va Malpigiy tuguni.',
      explanation: 'Birlamchi (tana) buyragida — Shumlyanskiy-Bauman kapsulasi va Malpigiy tuguni paydo boʻlgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['boshlangʻich buyrakda', 'birlamchi tana buyragida', 'metanefridiyda', 'protonefridiyda'], answerIndex: 1 } }
    },
    {
      id: 'b44q5',
      prompt: 'Hayvonni jinsi boʻyicha ajrating.',
      hint: 'Germafrodit — ikki jinsli.',
      explanation: 'Germafrodit: yassi chuvalchang, kam tukli halqali (yomgʻir chuvalchangi). Ayrim jinsli: askarida, qisqichbaqa, baqa.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'g', label: 'Germafrodit' },
            { id: 'a', label: 'Ayrim jinsli' }
          ],
          items: [
            { emoji: '', label: 'yassi chuvalchang', bin: 'g' },
            { emoji: '', label: 'yomgʻir chuvalchangi', bin: 'g' },
            { emoji: '', label: 'askarida', bin: 'a' },
            { emoji: '', label: 'qisqichbaqa', bin: 'a' },
            { emoji: '', label: 'baqa', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'b44q6',
      prompt: 'Odam embrionida haqiqiy buyrak nechanchi oydan boshlab shakllanadi?',
      hint: 'Haftalarda — boshlangʻich va birlamchi.',
      explanation: '2-oydan boshlab.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'oy' } }
    },
    {
      id: 'b44q7',
      prompt: 'Qaysi biri aromorfoz emas?',
      hint: 'Uchtasi — butun sinfni yuksaltirgan.',
      explanation: 'Elektr skatning elektr organi — xususiy moslanish (idioadaptatsiya).',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'ichki urugʻlanish' }, { text: 'poʻchoqli tuxum' }, { text: 'bachadon' }, { text: 'elektr skatning elektr organi', odd: true }] } }
    },
    {
      id: 'b44q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ikkalasi mezodermadan.',
      explanation: 'Ayirish va jinsiy sistemalar mezodermadan rivojlanadi; malpigi naychalari suvni tejaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ayirish va jinsiy sistemalar mezodermadan rivojlanadi.', value: true },
            { text: 'Malpigi naychalari suvni tejashga yordam beradi.', value: true },
            { text: 'Boʻshliqichlilarda maxsus ayirish organi bor.', value: false },
            { text: 'Amfibiyalarda ichki urugʻlanish va poʻchoqli tuxum bor.', value: false }
          ]
        }
      }
    }
  ]
};
