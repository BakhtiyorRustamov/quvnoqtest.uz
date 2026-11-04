import type { BoardLesson } from './types';
import { BOB4 } from './biologiya-35';

/** Darslik: Biologiya 11, 37-§ (190–194-betlar) — generativ organlar filogenezi: izogamiya, geterogamiya, oogamiya, nasllar gallanishi, urugʻ, chang naychasi, gul va meva. 4-laboratoriya (aromorfoz va idioadaptatsiyalar) gʻoyalari savollarda. */
export const BIO_37: BoardLesson = {
  n: 37,
  label: '37',
  group: BOB4,
  title: 'Generativ organlar filogenezi',
  section: '37-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Qirqquloq urugʻlanishi uchun suv tomchisi kerak — spermatozoid tuxum hujayragacha suzib boradi. Olma daraxti esa suvsiz ham urugʻlanadi: changni ari olib keladi, chang naychasi oʻsib boradi. Koʻpayish organlarining evolutsiyasi oʻsimliklarni suvga qaramlikdan qutqardi.",
      easy: "Qirqquloq — suvda urugʻlanadi; gulli oʻsimlik — suvsiz, chang naychasi bilan.",
      draw: [
        { t: 'title', text: 'Suvsiz urugʻlanish' },
        { t: 'icon', x: 16, y: 40, emoji: '🌸', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['qirqquloq — suv tomchisi kerak', 'gulli — chang naychasi', 'suvga qaramlik yoʻqoldi'] }
      ],
      next: 'Jinsiy koʻpayish turlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Generativ organlar — koʻpayish va yangi avlodni shakllantiruvchi organlar: sporangiylar, sporali boshoqlar, gʻuddalar (qubbalar) va gul. Jinsiy koʻpayishda uch xil gametalar qoʻshilishi uchraydi: izogamiya — bir xil gametalar, geterogamiya — kattaligi har xil harakatchan gametalar, oogamiya — yirik harakatsiz tuxum hujayra va mayda spermatozoid. Oʻsimliklarning koʻpchiligida oogamiya.",
      easy: "Izogamiya — bir xil; geterogamiya — har xil kattalik; oogamiya — tuxum + spermatozoid.",
      draw: [
        { t: 'title', text: 'Gametalar qoʻshilishi' },
        { t: 'table', x: 4, y: 20, rows: [['tur', 'gametalar'], ['izogamiya', 'bir xil'], ['geterogamiya', 'kattaligi har xil'], ['oogamiya', 'tuxum + spermatozoid']] }
      ],
      next: 'Nasllar gallanishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sporali yuksak oʻsimliklarda gametofit va sporofit nasllari gallanadi. Gametofit — gametalar hosil boʻladigan va urugʻlanish sodir boʻladigan boʻgʻin, sporofit — sporalar yetiladigan boʻgʻin. Yoʻsinlarda gametofit ustun; plaun, qirqboʻgʻim va qirqquloqlarda sporofit ustun. Spora bir hujayrali, oziq moddasi kam — koʻpi nobud boʻladi; urugʻlanish uchun suv zarur.",
      easy: "Yoʻsin — gametofit ustun; qirqquloq — sporofit ustun; urugʻlanishga suv kerak.",
      draw: [
        { t: 'title', text: 'Nasllar gallanishi' },
        { t: 'box', id: 'g', x: 4, y: 18, w: 30, h: 8, text: 'gametofit', color: 'green' },
        { t: 'box', id: 'z', x: 64, y: 18, w: 30, h: 8, text: 'zigota' },
        { t: 'box', id: 's', x: 64, y: 38, w: 30, h: 8, text: 'sporofit', color: 'orange' },
        { t: 'box', id: 'p', x: 4, y: 38, w: 30, h: 8, text: 'spora' },
        { t: 'arrow', from: 'g', to: 'z', label: 'urugʻlanish' },
        { t: 'arrow', from: 'z', to: 's' },
        { t: 'arrow', from: 's', to: 'p' },
        { t: 'arrow', from: 'p', to: 'g' },
        { t: 'text', x: 4, y: 54, text: 'yoʻsin: gametofit ustun', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 61, text: 'qirqquloq: sporofit ustun', size: 's', color: 'orange' }
      ],
      next: 'Urugʻ'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Dastlabki urugʻli oʻsimliklar — urugʻli qirqquloqlar. Urugʻ koʻp hujayrali: qobiq, murtak va endospermdan iborat; zaxira oziq murtakni noqulay sharoitda ham oʻstiradi. Chang naychasining paydo boʻlishi urugʻlanish uchun suvga ehtiyojni yoʻqotdi — bu muhim aromorfoz urugʻlilarni hukmron qildi. Ochiq urugʻlilarda urugʻkurtak qubbalarda ochiq yetiladi, tuguncha yoʻq, endosperm gaploid.",
      easy: "Urugʻ = qobiq + murtak + endosperm; chang naychasi — suvsiz urugʻlanish.",
      draw: [
        { t: 'title', text: 'Spora va urugʻ' },
        { t: 'table', x: 4, y: 18, rows: [['belgi', 'spora', 'urugʻ'], ['hujayra', 'bir hujayrali', 'koʻp hujayrali'], ['oziq zaxira', 'juda kam', 'endosperm'], ['urugʻlanish', 'suv kerak', 'chang naychasi']] }
      ],
      next: 'Gul va meva'
    },
    {
      kind: 'example',
      clear: true,
      say: "Yopiq urugʻlilarda yirik aromorfozlar — mukammal oʻtkazuvchi naylar, gul va meva. Gulning asosiy qismlari — urugʻchi va changchi; ularda changlanish va qoʻsh urugʻlanish boradi. Urugʻkurtak urugʻga, tuguncha mevaga aylanadi — urugʻ meva ichida himoyalangan. Changlanish shamol, hasharot va qushlar, urugʻ va meva tarqalishi shamol, suv, qush va sutemizuvchilar yordamida — shuning uchun yopiq urugʻlilar hamma joyda tarqalgan.",
      easy: "Gul + meva + qoʻsh urugʻlanish → yopiq urugʻlilar hukmron.",
      draw: [
        { t: 'title', text: 'Gul → meva' },
        { t: 'box', id: 'k', x: 4, y: 20, w: 40, h: 8, text: 'urugʻkurtak', color: 'green' },
        { t: 'box', id: 'u', x: 56, y: 20, w: 40, h: 8, text: 'urugʻ', color: 'green' },
        { t: 'box', id: 't', x: 4, y: 40, w: 40, h: 8, text: 'tuguncha', color: 'orange' },
        { t: 'box', id: 'm', x: 56, y: 40, w: 40, h: 8, text: 'meva', color: 'orange' },
        { t: 'arrow', from: 'k', to: 'u' },
        { t: 'arrow', from: 't', to: 'm' },
        { t: 'text', x: 4, y: 60, text: 'qoʻsh urugʻlanish — faqat yopiq urugʻlilarda', size: 's', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Generativ organlar — sporangiy, sporali boshoq, qubba, gul; jinsiy koʻpayish izogamiya, geterogamiya va oogamiya tarzida boradi.',
    'Sporalilarda nasllar gallanadi: yoʻsinlarda gametofit, qirqquloq, plaun, qirqboʻgʻimlarda sporofit ustun; urugʻlanish uchun suv zarur.',
    'Urugʻ (qobiq, murtak, endosperm) va chang naychasi suvga qaramlikni yoʻqotdi; yopiq urugʻlilarda gul, meva va qoʻsh urugʻlanish — yirik aromorfozlar.'
  ],
  questions: [
    {
      id: 'b37q1',
      prompt: 'Jinsiy koʻpayish turini taʼrifi bilan juftlang.',
      hint: 'Oo — tuxum.',
      explanation: 'Izogamiya — bir xil gametalar; geterogamiya — kattaligi har xil harakatchan gametalar; oogamiya — yirik tuxum va mayda spermatozoid.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'izogamiya', right: 'bir xil gametalar' },
            { left: 'geterogamiya', right: 'kattaligi har xil gametalar' },
            { left: 'oogamiya', right: 'tuxum va spermatozoid' }
          ]
        }
      }
    },
    {
      id: 'b37q2',
      prompt: 'Qaysi boʻgʻin ustunligiga koʻra ajrating.',
      hint: 'Yoʻsin — istisno.',
      explanation: 'Gametofit ustun: yoʻsinlar. Sporofit ustun: qirqquloqlar, plaunlar, qirqboʻgʻimlar.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'g', label: 'Gametofit ustun' },
            { id: 's', label: 'Sporofit ustun' }
          ],
          items: [
            { emoji: '', label: 'yoʻsinlar', bin: 'g' },
            { emoji: '', label: 'qirqquloqlar', bin: 's' },
            { emoji: '', label: 'plaunlar', bin: 's' },
            { emoji: '', label: 'qirqboʻgʻimlar', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'b37q3',
      prompt: 'Urugʻning tarkibiy qismlarini tanlang.',
      hint: 'Uch qism.',
      explanation: 'Qobiq, murtak, endosperm.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'qobiq', correct: true },
            { label: 'murtak', correct: true },
            { label: 'endosperm', correct: true },
            { label: 'sorus' },
            { label: 'rizoid' }
          ]
        }
      }
    },
    {
      id: 'b37q4',
      prompt: 'Qaysi aromorfoz urugʻli oʻsimliklarda urugʻlanish uchun suvga ehtiyojni yoʻqotdi?',
      hint: 'Changdan oʻsib chiqadi.',
      explanation: 'Chang naychasining paydo boʻlishi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ildiz tukchalari', 'chang naychasi', 'spora qobigʻi', 'rizoidlar'], answerIndex: 1 } }
    },
    {
      id: 'b37q5',
      prompt: 'Yopiq urugʻlilarda gul qismlari nimaga aylanadi? Juftlang.',
      hint: 'Tuguncha — tashqi qism.',
      explanation: 'Urugʻkurtak → urugʻ; tuguncha → meva.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'urugʻkurtak', right: 'urugʻ' },
            { left: 'tuguncha', right: 'meva' }
          ]
        }
      }
    },
    {
      id: 'b37q6',
      prompt: 'Ochiq urugʻlilarga xos boʻlmagan belgi qaysi?',
      hint: 'Ularda tuguncha yoʻq.',
      explanation: 'Qoʻsh urugʻlanish va meva — faqat yopiq urugʻlilarga xos.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'urugʻkurtak qubbada ochiq' }, { text: 'tuguncha yoʻq' }, { text: 'endosperm gaploid' }, { text: 'qoʻsh urugʻlanish', odd: true }] } }
    },
    {
      id: 'b37q7',
      prompt: 'Sporadan urugʻgacha boʻlgan evolutsion qadamlarni tartiblang.',
      hint: 'Avval spora, oxirida meva.',
      explanation: 'Sporalar → urugʻli qirqquloqlar → ochiq urugʻlilar (qubbalar) → yopiq urugʻlilar (gul va meva).',
      widget: { type: 'step_order', props: { steps: ['spora bilan koʻpayish', 'urugʻli qirqquloqlar', 'ochiq urugʻlilar — qubbalar', 'yopiq urugʻlilar — gul va meva'] } }
    },
    {
      id: 'b37q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Spora — bir hujayrali.',
      explanation: 'Spora bir hujayrali va oziq zaxirasi kam; urugʻ ona oʻsimlikdan toʻliq yetilgach ajraladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Spora bir hujayrali, oziq moddasi juda kam.', value: true },
            { text: 'Urugʻ toʻliq yetilmaguncha ona oʻsimlikdan ajramaydi.', value: true },
            { text: 'Qirqquloqlarda urugʻlanish suvsiz boradi.', value: false },
            { text: 'Yoʻsinlarda sporofit ustunlik qiladi.', value: false }
          ]
        }
      }
    }
  ]
};
