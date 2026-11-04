import type { BoardLesson } from './types';
import { BOB4 } from './biologiya-35';

/** Darslik: Biologiya 11, 39-§ (202–208-betlar) — oʻz-oʻzini boshqarish: nerv sistemasi tiplari (diffuz, stvol, zanjir, naysimon), umurtqalilar bosh miyasi, gumoral va immun boshqarish. */
export const BIO_39: BoardLesson = {
  n: 39,
  label: '39',
  group: BOB4,
  title: 'Oʻz-oʻzini idora etish: nerv va gumoral sistema',
  section: '39-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Quyosh charaqlaganda barg hujayrasidagi xloroplastlar hujayra devori atrofiga yigʻilib, kuchli yorugʻlikdan himoyalanadi; bulutli kunda esa sitoplazmada bir tekis tarqaladi. Bu — oʻz-oʻzini boshqarish: tirik organizm koʻrsatkichlarini muayyan darajada avtomatik saqlash xususiyati.",
      easy: "Xloroplastlar yorugʻlikka qarab joyini oʻzgartiradi — oʻz-oʻzini boshqarish.",
      draw: [
        { t: 'title', text: 'Oʻz-oʻzini boshqarish' },
        { t: 'icon', x: 16, y: 40, emoji: '🍃', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['quyoshli — devor yonida', 'bulutli — bir tekis', 'koʻrsatkichlar avtomatik saqlanadi'] }
      ],
      next: 'Boshqarish usullari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bir hujayralilar tashqi omillarga taksis bilan javob beradi. Koʻp hujayralilar hayoti nerv, gumoral va immun sistemalar orqali boshqariladi. Nerv boshqarish reflekslar orqali boradi. Gumoral boshqarish — gormonlar orqali: hayvonlarda ichki sekretsiya bezlari gormonni qon va limfaga chiqaradi, oʻsimlik va zamburugʻlarda fitogormon va alkaloidlar ishlaydi. Nerv va gumoral boshqarish birgalikda yagona neyrogumoral mexanizmni tashkil etadi.",
      easy: "Nerv — reflekslar; gumoral — gormonlar; birga — neyrogumoral.",
      draw: [
        { t: 'title', text: 'Boshqarish usullari' },
        { t: 'table', x: 4, y: 20, rows: [['usul', 'vositasi'], ['nerv', 'reflekslar'], ['gumoral', 'gormonlar, fitogormonlar'], ['immun', 'antitelo, antitoksin']] }
      ],
      next: 'Nerv sistemasi tiplari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Nerv sistemasi filogenezi toʻrt bosqichli. Birinchi — toʻrsimon, diffuz tip, boʻshliqichlilarda: istalgan joyga taʼsir butun tana harakati bilan javob beradi. Ikkinchi — stvol tip, yassi va toʻgarak chuvalchanglarda: nerv tugunlari va narvonsimon stvollar. Uchinchi — zanjir tip, halqali chuvalchang va boʻgʻimoyoqlilarda: halqum usti va osti tugunlari, qorin nerv zanjiri. Toʻrtinchi — naysimon tip, barcha xordalilarda.",
      easy: "Diffuz → stvol → zanjir → naysimon.",
      draw: [
        { t: 'title', text: 'Nerv sistemasi tiplari' },
        { t: 'table', x: 4, y: 18, rows: [['tip', 'kimda'], ['diffuz (toʻrsimon)', 'boʻshliqichlilar'], ['stvol', 'yassi, toʻgarak chuvalchang'], ['zanjir', 'halqali, boʻgʻimoyoqli'], ['naysimon', 'xordalilar']] }
      ],
      next: 'Bosh miya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Umurtqalilarda markaziy nerv sistemasi bosh va orqa miyadan iborat; bosh miya besh boʻlimli: oldingi, oraliq, oʻrta, uzunchoq miya va miyacha. Baliqlarda oldingi miya yarimsharlarga boʻlinmagan; amfibiyalarda boʻlingan, lekin miyacha kichik; reptiliyalarda oldingi miya yiriklashgan, miyacha kuchli; qushlarda koʻrish markazlari va miyacha yaxshi rivojlangan; sutemizuvchilarda yarimsharlar poʻstlogʻida oliy nerv faoliyati markazlari joylashgan.",
      easy: "Baliq → amfibiya → reptiliya → qush → sutemizuvchi: oldingi miya va poʻstloq kattalashadi.",
      draw: [
        { t: 'title', text: 'Bosh miya evolutsiyasi' },
        { t: 'table', x: 4, y: 18, rows: [['sinf', 'xususiyati'], ['baliqlar', 'yarimsharlar yoʻq'], ['amfibiyalar', 'yarimsharlar, kichik miyacha'], ['qushlar', 'miyacha kuchli'], ['sutemizuvchilar', 'poʻstloq kuchli']] }
      ],
      next: 'Immunitet'
    },
    {
      kind: 'example',
      clear: true,
      say: "Himoya uch bosqichli: kasallik qoʻzgʻatuvchisining kirishiga yoʻl qoʻymaslik; leykotsitlar faoliyati; antitelo va antitoksinlar ishlab chiqarish. Antitelolar mikroblarni yopishtirib parchalaydi, antitoksinlar zaharni neytrallaydi. Bu immunitet. Oʻsimlik va zamburugʻlarda himoyani mustahkam hujayra qobigʻi, fitonsid va antibiotiklar taʼminlaydi.",
      easy: "Immunitet: toʻsiq → leykotsitlar → antitelo va antitoksin.",
      draw: [
        { t: 'title', text: 'Himoya bosqichlari' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 9, text: 'kirishni toʻsish', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 9, text: 'leykotsitlar', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 9, text: 'antitelolar', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 48, text: 'oʻsimliklarda: fitonsid, antibiotik', size: 's', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Oʻz-oʻzini boshqarish — koʻrsatkichlarni avtomatik saqlash; koʻp hujayralilarda nerv (reflekslar), gumoral (gormonlar) va immun boshqarish, nerv va gumoral birgalikda — neyrogumoral mexanizm.',
    'Nerv sistemasi tiplari: diffuz (boʻshliqichlilar) → stvol (yassi, toʻgarak chuvalchanglar) → zanjir (halqalilar, boʻgʻimoyoqlilar) → naysimon (xordalilar).',
    'Umurtqalilar bosh miyasi 5 boʻlimli; sutemizuvchilarda yarimsharlar poʻstlogʻi kuchli; immunitet — leykotsitlar, antitelo va antitoksinlar.'
  ],
  questions: [
    {
      id: 'b39q1',
      prompt: 'Nerv sistemasi tipini hayvonlar guruhi bilan juftlang.',
      hint: 'Gidra — toʻr.',
      explanation: 'Diffuz — boʻshliqichlilar; stvol — yassi chuvalchanglar; zanjir — halqali chuvalchanglar; naysimon — xordalilar.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'diffuz', right: 'boʻshliqichlilar' },
            { left: 'stvol', right: 'yassi chuvalchanglar' },
            { left: 'zanjir', right: 'halqali chuvalchanglar' },
            { left: 'naysimon', right: 'xordalilar' }
          ]
        }
      }
    },
    {
      id: 'b39q2',
      prompt: 'Nerv sistemasi tiplarini evolutsiya tartibida joylashtiring.',
      hint: 'Toʻrdan boshlang.',
      explanation: 'Diffuz → stvol → zanjir → naysimon.',
      widget: { type: 'order_line', props: { items: [{ label: 'diffuz' }, { label: 'stvol' }, { label: 'zanjir' }, { label: 'naysimon' }] } }
    },
    {
      id: 'b39q3',
      prompt: 'Umurtqalilar bosh miyasi necha boʻlimdan iborat?',
      hint: 'Oldingi, oraliq, oʻrta, uzunchoq, miyacha.',
      explanation: '5 boʻlim.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'boʻlim' } }
    },
    {
      id: 'b39q4',
      prompt: 'Belgini boshqarish turiga ajrating.',
      hint: 'Gumoral — kimyoviy moddalar.',
      explanation: 'Nerv: refleks, nerv impulsi. Gumoral: gormonlar, fitogormonlar, qon orqali tarqalish.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'n', label: 'Nerv' },
            { id: 'g', label: 'Gumoral' }
          ],
          items: [
            { emoji: '', label: 'refleks', bin: 'n' },
            { emoji: '', label: 'refleks yoyi', bin: 'n' },
            { emoji: '', label: 'gormonlar', bin: 'g' },
            { emoji: '', label: 'fitogormonlar', bin: 'g' },
            { emoji: '', label: 'qon va limfa orqali', bin: 'g' }
          ]
        }
      }
    },
    {
      id: 'b39q5',
      prompt: 'Qaysi sinfda bosh miyaning oldingi qismi yarimsharlarga boʻlinmagan?',
      hint: 'Suvda yashovchi umurtqalilar.',
      explanation: 'Baliqlarda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['baliqlar', 'qushlar', 'sutemizuvchilar', 'sudralib yuruvchilar'], answerIndex: 0 } }
    },
    {
      id: 'b39q6',
      prompt: 'Immun himoya bosqichlarini tartiblang.',
      hint: 'Avval toʻsiq.',
      explanation: 'Qoʻzgʻatuvchi kirishini toʻsish → leykotsitlar → antitelo va antitoksinlar.',
      widget: { type: 'step_order', props: { steps: ['qoʻzgʻatuvchi kirishini toʻsish', 'leykotsitlar faoliyati', 'antitelo va antitoksin ishlab chiqarish'] } }
    },
    {
      id: 'b39q7',
      prompt: 'Oʻsimlik va zamburugʻlarda himoyani nima taʼminlaydi?',
      hint: 'Ularda leykotsit yoʻq.',
      explanation: 'Mustahkam hujayra qobigʻi, fitonsidlar va antibiotiklar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['leykotsitlar', 'fitonsid va antibiotiklar', 'limfa tugunlari', 'antitoksinlar'], answerIndex: 1 } }
    },
    {
      id: 'b39q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Sodda hayvonlarda nerv yoʻq.',
      explanation: 'Sodda hayvonlarda nerv sistemasi yoʻq, boshqarish gumoral; gormon ajralishi nerv sistemasi nazoratida.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sodda hayvonlarda nerv sistemasi yoʻq, ular gumoral boshqariladi.', value: true },
            { text: 'Gormon ajralishi nerv sistemasi nazoratida boʻladi.', value: true },
            { text: 'Diffuz nerv sistemasi xordalilarga xos.', value: false },
            { text: 'Antitoksinlar mikroblarni bir-biriga yopishtiradi.', value: false }
          ]
        }
      }
    }
  ]
};
