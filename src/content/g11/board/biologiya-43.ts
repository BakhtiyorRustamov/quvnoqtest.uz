import type { BoardLesson } from './types';
import { BOB4 } from './biologiya-35';

/** Darslik: Biologiya 11, 43-§ (223–226-betlar) — hazm qilish organlari evolutsiyasi: hazm vakuolasidan kavsh qaytaruvchilarning murakkab oshqozonigacha. */
export const BIO_43: BoardLesson = {
  n: 43,
  label: '43',
  group: BOB4,
  title: 'Hazm qilish organlari evolutsiyasi',
  section: '43-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oʻrgimchak oʻljasini tashqarida hazm qiladi: zahar bezi suyuqligi oʻljani falajlab, uning moddalarini parchalaydi, oʻrgimchak esa tayyor suyuqlikni soʻrib oladi. Sigir esa oʻt-oʻlanni ikki marta chaynaydi. Hazm qilish organlari oziq turiga qarab juda xilma-xil yoʻllar bilan rivojlangan.",
      easy: "Oʻrgimchak — tashqarida hazm; sigir — kavsh qaytaradi.",
      draw: [
        { t: 'title', text: 'Har xil hazm' },
        { t: 'icon', x: 16, y: 40, emoji: '🕷️', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['oʻrgimchak — tashqi hazm', 'sigir — kavsh qaytarish', 'qush — tishsiz, jigʻildon'] }
      ],
      next: 'Umurtqasizlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Amyoba oziqni soxta oyoq bilan qamrab, hazm vakuolasida fermentlar bilan parchalaydi; infuzoriyada ogʻiz teshigi, halqum va chiqaruv teshigi bor. Boʻshliqichlilarda tana boʻshligʻi ichak vazifasini bajaradi. Yassi chuvalchanglarda uchi berk shoxlangan oʻrta ichak — qoldiq ogʻizdan chiqadi; tasmasimonlarda oziq tana yuzasi orqali soʻriladi. Toʻgarak chuvalchanglardan boshlab orqa ichak va anal teshigi paydo boʻlgan. Halqalilarda jigʻildon va oshqozon, ichak burmalari.",
      easy: "Hazm vakuolasi → tana boʻshligʻi → berk ichak → anal teshikli ichak.",
      draw: [
        { t: 'title', text: 'Umurtqasizlar hazmi' },
        { t: 'table', x: 4, y: 18, rows: [['hayvon', 'hazm organi'], ['amyoba', 'hazm vakuolasi'], ['gidra', 'tana boʻshligʻi'], ['yassi chuvalchang', 'uchi berk ichak'], ['toʻgarak chuvalchang', 'anal teshigi bor'], ['halqali', 'jigʻildon, oshqozon']] }
      ],
      next: 'Bezlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Mollyuskalarda halqumda muskulli til va tishchalar paydo boʻlgan, jigar va soʻlak bezlari faollashgan. Boʻgʻimoyoqlilarda jagʻlar oziqni maydalaydi; oʻrgimchakda zahar bezi hazmda qatnashadi — oziq tanadan tashqarida hazm boʻladi. Lansetnikda qismlarga ajralmagan toʻgʻri nay ichak va jigar oʻsimtasi bor.",
      easy: "Mollyuska — muskulli til; boʻgʻimoyoqli — jagʻlar; oʻrgimchak — tashqi hazm.",
      draw: [
        { t: 'title', text: 'Yangi moslanishlar' },
        { t: 'list', x: 4, y: 20, items: ['mollyuska — muskulli til, tishchalar', 'boʻgʻimoyoqli — jagʻlar', 'oʻrgimchak — tashqi hazm', 'lansetnik — toʻgʻri nay ichak'] }
      ],
      next: 'Umurtqalilar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Baliqlarda hazm nayi boʻlimlarga ajralgan: ogʻiz, halqum, qizilongach, oshqozon, ingichka va yoʻgʻon ichak; bir xil tishlar faqat oziqni ushlaydi; oʻt qopi paydo boʻlgan. Amfibiyalarda soʻlak bezlari, ichak uzunroq va kloakaga ochiladi. Sudralib yuruvchilarda koʻrichak paydo boʻlgan, ilonlarda zahar bezlari hazmda qatnashadi. Qushlarda tish yoʻq, ichak qisqa, jigʻildon va kuchli muskulli oshqozon oziqni maydalaydi, toʻgʻri ichak yoʻq.",
      easy: "Baliq — oʻt qopi; amfibiya — kloaka; reptiliya — koʻrichak; qush — tishsiz, muskulli oshqozon.",
      draw: [
        { t: 'title', text: 'Umurtqalilar hazmi' },
        { t: 'table', x: 4, y: 18, rows: [['sinf', 'yangilik'], ['baliqlar', 'boʻlimlar, oʻt qopi'], ['amfibiyalar', 'soʻlak bezlari, kloaka'], ['reptiliyalar', 'koʻrichak'], ['qushlar', 'tish yoʻq, jigʻildon']] }
      ],
      next: 'Sutemizuvchilar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Sutemizuvchilarda burmali lablar — sut emish uchun; taʼm soʻrgʻichli til, uch juft soʻlak bezi, jagʻ chuqurchasiga oʻrnashgan ixtisoslashgan tishlar. Koʻrichak uzaygan, chuvalchangsimon oʻsimta bor. Kavsh qaytaruvchi juft tuyoqlilarda murakkab oshqozon: undagi bakteriya va infuzoriyalar kletchatkani bijgʻitadi, oziq ogʻizga qaytib qayta chaynaladi. Umumiy yoʻnalish: ichak boʻlimlarga boʻlinadi, uzayadi, burmalar bilan sathi ortadi, bezlar rivojlanadi, tishlar ixtisoslashadi.",
      easy: "Ixtisoslashgan tishlar, murakkab oshqozon; ichak uzayadi, bezlar rivojlanadi.",
      draw: [
        { t: 'title', text: 'Kavsh qaytaruvchilar' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 28, h: 8, text: 'oʻtni yutadi', color: 'green' },
        { t: 'box', id: 'b', x: 36, y: 20, w: 28, h: 8, text: 'bakteriyalar', color: 'purple' },
        { t: 'box', id: 'c', x: 68, y: 20, w: 28, h: 8, text: 'qayta chaynaydi', color: 'orange' },
        { t: 'box', id: 'd', x: 68, y: 42, w: 28, h: 8, text: 'hazm boʻladi', color: 'blue' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Bir hujayralilarda hazm vakuolasi, boʻshliqichlilarda tana boʻshligʻi, yassi chuvalchanglarda uchi berk ichak; toʻgarak chuvalchanglardan anal teshigi paydo boʻlgan.',
    'Baliqlarda hazm nayi boʻlimlarga ajralgan va oʻt qopi bor; amfibiyalarda kloaka, reptiliyalarda koʻrichak; qushlarda tish yoʻq, jigʻildon va muskulli oshqozon.',
    'Sutemizuvchilarda ixtisoslashgan tishlar, kavsh qaytaruvchilarda bakteriyali murakkab oshqozon; umumiy yoʻnalish — ichak uzayishi, sath ortishi, bezlar va tishlar rivoji.'
  ],
  questions: [
    {
      id: 'b43q1',
      prompt: 'Hayvonni hazm organi bilan juftlang.',
      hint: 'Amyoba — vakuola.',
      explanation: 'Amyoba — hazm vakuolasi; gidra — tana boʻshligʻi; planariya — uchi berk ichak; askarida — anal teshikli ichak.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'amyoba', right: 'hazm vakuolasi' },
            { left: 'gidra', right: 'tana boʻshligʻi' },
            { left: 'yassi chuvalchang', right: 'uchi berk ichak' },
            { left: 'toʻgarak chuvalchang', right: 'anal teshikli ichak' }
          ]
        }
      }
    },
    {
      id: 'b43q2',
      prompt: 'Anal teshigi qaysi hayvonlardan boshlab paydo boʻlgan?',
      hint: 'Yassi chuvalchanglarda yoʻq.',
      explanation: 'Toʻgarak chuvalchanglardan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['boʻshliqichlilardan', 'yassi chuvalchanglardan', 'toʻgarak chuvalchanglardan', 'mollyuskalardan'], answerIndex: 2 } }
    },
    {
      id: 'b43q3',
      prompt: 'Qushlarning uchishga bogʻliq hazm moslanishlarini tanlang.',
      hint: 'Tanani yengillashtiradi.',
      explanation: 'Tish yoʻq, ichak qisqa, toʻgʻri ichak yoʻq, muskulli oshqozon oziqni maydalaydi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tishlar yoʻq', correct: true },
            { label: 'ichaklar qisqa', correct: true },
            { label: 'toʻgʻri ichak yoʻq', correct: true },
            { label: 'kuchli muskulli oshqozon', correct: true },
            { label: 'murakkab koʻp boʻlimli oshqozon' }
          ]
        }
      }
    },
    {
      id: 'b43q4',
      prompt: 'Yangilikni sinfga ajrating.',
      hint: 'Koʻrichak — reptiliyalardan.',
      explanation: 'Baliqlar: oʻt qopi, boʻlimlarga ajralgan nay. Reptiliyalar: koʻrichak, zahar bezlari (ilon). Sutemizuvchilar: ixtisoslashgan tishlar, burmali lablar.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'b', label: 'Baliqlar' },
            { id: 'r', label: 'Reptiliyalar' },
            { id: 's', label: 'Sutemizuvchilar' }
          ],
          items: [
            { emoji: '', label: 'oʻt qopi paydo boʻlgan', bin: 'b' },
            { emoji: '', label: 'koʻrichak paydo boʻlgan', bin: 'r' },
            { emoji: '', label: 'ilonda zahar bezi hazmda', bin: 'r' },
            { emoji: '', label: 'ixtisoslashgan tishlar', bin: 's' },
            { emoji: '', label: 'burmali lablar', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'b43q5',
      prompt: 'Kavsh qaytaruvchilarda kletchatkani kim parchalaydi?',
      hint: 'Oshqozondagi mikroorganizmlar.',
      explanation: 'Oshqozondagi bakteriyalar va infuzoriyalar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['soʻlak', 'bakteriya va infuzoriyalar', 'oʻt suyuqligi', 'tishlar'], answerIndex: 1 } }
    },
    {
      id: 'b43q6',
      prompt: 'Sutemizuvchilarda nechta juft soʻlak bezi bor?',
      hint: 'Darslikdagi raqam.',
      explanation: '3 juft.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'juft' } }
    },
    {
      id: 'b43q7',
      prompt: 'Umurtqalilar hazm sistemasi evolutsiyasi qadamlarini tartiblang.',
      hint: 'Avval oddiy nay.',
      explanation: 'Ichak nayi → boʻlimlarga boʻlinish → uzayish va burmalar → tishlar ixtisoslashuvi.',
      widget: { type: 'step_order', props: { steps: ['ichak nayi shakllanadi', 'nay boʻlimlarga boʻlinadi', 'ichak uzayadi, burmalar paydo boʻladi', 'tishlar ixtisoslashadi'] } }
    },
    {
      id: 'b43q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oʻrgimchak — tashqi hazm.',
      explanation: 'Oʻrgimchakda oziq tanadan tashqarida hazm boʻladi; baliq tishlari faqat oziqni ushlaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻrgimchakda oziq dastlab tanadan tashqarida hazm boʻladi.', value: true },
            { text: 'Baliqlarning tishlari faqat oziqni ushlab turadi.', value: true },
            { text: 'Amfibiyalarning soʻlagi ovqatni kimyoviy parchalaydi.', value: false },
            { text: 'Tasmasimon chuvalchanglarda murakkab ichak bor.', value: false }
          ]
        }
      }
    }
  ]
};
