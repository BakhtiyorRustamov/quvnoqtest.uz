import type { BoardLesson } from './types';

export const OZG1 = { kicker: 'Ona tili · 1-qism', title: 'Nutq madaniyati' };

/** Darslik: Ona tili 11 (N. Mahmudov va b., 2018), 6–11-betlar — oʻzbek tili turkiy tillar oilasida; davlat tili; lugʻat boyligidagi oʻzgarishlar yoʻllari. */
export const OZ_1: BoardLesson = {
  n: 1,
  label: '1',
  group: OZG1,
  title: 'Oʻzbek tili va uning taraqqiyoti',
  section: 'Ona tili, 1-qism: «Oʻzbek tili va uning taraqqiyoti»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Oʻzbek tili turkiy tillar oilasiga mansub, ildizlari juda qadimga borib taqaladi va bugun u Oʻzbekistonning davlat tili. Tildagi oʻzgarishlar eng avvalo lugʻat boyligida koʻrinadi. Yangi soʻzlar yasalmoqda, eskirgan deb qaralgan soʻzlar tilga qaytmoqda, ayrim soʻzlar yangi maʼno olmoqda, umrini yashagan tushunchalar nomi esa nofaol zaxiraga oʻtmoqda. Zarur boʻlganda xorijiy soʻzlar boshqa til vositachiligisiz, toʻgʻridan toʻgʻri oʻzlashtirilmoqda.",
      easy: "Oʻzbek tili — turkiy til, davlat tili. U lugʻati orqali boyiydi: yangi soʻz, qaytgan soʻz, yangi maʼno, oʻzlashma.",
      draw: [
        { t: 'title', text: 'Lugʻat qanday boyiydi?' },
        { t: 'table', x: 4, y: 18, rows: [['jarayon', 'misollar'], ['yangi soʻz yasalishi', 'dasturchi, kafolatnoma, nodavlat'], ['eski soʻz qaytishi', 'maʼnaviyat, tijorat, muallif'], ['yangi maʼno olishi', 'vazir, viloyat, tuman, hokim'], ['nofaol zaxiraga oʻtish', 'kolxoz, sovxoz'], ['xorijiy oʻzlashma', 'bankomat, brifing, investor']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Oʻzbek tili turkiy tillar oilasiga mansub qadimiy va boy til, Oʻzbekistonning davlat tili.',
    'Til taraqqiyoti eng avvalo lugʻat boyligida namoyon boʻladi.',
    'Lugʻat yangi soʻz yasash, eski soʻzlarni qaytarish, soʻzlarga yangi maʼno berish va xorijiy soʻzlarni toʻgʻridan toʻgʻri oʻzlashtirish orqali boyiydi.'
  ],
  questions: [
    {
      id: 'oz1q1',
      prompt: 'Oʻzbek tili qaysi tillar oilasiga mansub?',
      hint: 'Qozoq, turkman, turk tillari bilan qarindosh.',
      explanation: 'Oʻzbek tili turkiy tillar oilasiga kiradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['turkiy', 'hind-yevropa', 'slavyan', 'roman'], answerIndex: 0 } }
    },
    {
      id: 'oz1q2',
      prompt: 'Soʻzlarni lugʻatdagi oʻzgarish turiga ajrating.',
      hint: 'Kolxoz bugun ishlatilmaydi.',
      explanation: 'Dasturchi, nodavlat — yangi yasalgan; maʼnaviyat, tijorat — qayta faollashgan; kolxoz, sovxoz — nofaol zaxirada.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'y', label: 'yangi yasalgan' }, { id: 'q', label: 'tilga qaytgan' }, { id: 'n', label: 'nofaol zaxirada' }],
          items: [
            { emoji: '💻', label: 'dasturchi', bin: 'y' },
            { emoji: '🏢', label: 'nodavlat', bin: 'y' },
            { emoji: '📚', label: 'maʼnaviyat', bin: 'q' },
            { emoji: '🛒', label: 'tijorat', bin: 'q' },
            { emoji: '🚜', label: 'kolxoz', bin: 'n' },
            { emoji: '🌾', label: 'sovxoz', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'oz1q3',
      prompt: 'Til taraqqiyoti eng avvalo qayerda koʻrinadi?',
      hint: 'Jamiyatdagi har bir yangilik yangi nom talab qiladi.',
      explanation: 'Lugʻat boyligida — jamiyatdagi oʻzgarishlar avvalo soʻzlarda aks etadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['lugʻat boyligida', 'tovushlar sonida', 'alifboda', 'tinish belgilarida'], answerIndex: 0 } }
    },
    {
      id: 'oz1q4',
      prompt: 'Soʻzni izohi bilan juftlang.',
      hint: 'Ibtido — boshlanish.',
      explanation: 'Ibtido — boshlanish davri; intiho — tugash davri; munaqqid — tanqidchi; tijorat — savdo-sotiq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'ibtido', right: 'boshlanish davri' },
            { left: 'intiho', right: 'tugash davri' },
            { left: 'munaqqid', right: 'tanqidchi' },
            { left: 'tijorat', right: 'savdo-sotiq' }
          ]
        }
      }
    },
    {
      id: 'oz1q5',
      prompt: 'Qaysi soʻzlar mustaqillik yillarida yangi maʼno olgan?',
      hint: 'Boshqaruv bilan bogʻliq soʻzlar.',
      explanation: 'Vazir, viloyat, tuman, hokim kabi soʻzlar yangi maʼno kasb etgan.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'vazir', correct: true },
            { label: 'viloyat', correct: true },
            { label: 'hokim', correct: true },
            { label: 'bankomat' }
          ]
        }
      }
    },
    {
      id: 'oz1q6',
      prompt: 'Qaysi soʻz xorijiy tildan toʻgʻridan toʻgʻri oʻzlashgan?',
      hint: 'Pul yechib olinadigan qurilma.',
      explanation: 'Bankomat — xorijiy oʻzlashma; qolganlari oʻzbekcha yasalgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bankomat', 'dasturchi', 'kafolatnoma', 'ahdnoma'], answerIndex: 0 } }
    },
    {
      id: 'oz1q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Biznes soʻzining bahosi oʻzgargan.',
      explanation: 'Biznes, fermer kabi soʻzlar ilgari salbiy boʻyoqqa ega edi, endi ijobiy; tilni faqat aloqa vositasi deb qarash toʻgʻri emas — u bilim saqlaydi, avlodlarga yetkazadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Biznes», «fermer» soʻzlari ilgari salbiy, hozir ijobiy maʼnoda qoʻllanadi.', value: true },
            { text: 'Til bilim va tajribani avloddan avlodga yetkazadi.', value: true },
            { text: 'Til faqat odamlar orasidagi aloqa vositasi, boshqa vazifasi yoʻq.', value: false },
            { text: 'Xorijiy soʻzlar faqat boshqa til vositachiligida oʻzlashtirilmoqda.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz1q8',
      prompt: '«Kafolatnoma» soʻzi qanday paydo boʻlgan?',
      hint: 'kafolat + -noma',
      explanation: 'Oʻzbek tilining ichki imkoniyati bilan — qoʻshimcha yordamida yasalgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻzbek tilida yasalgan', 'ingliz tilidan olingan', 'rus tilidan olingan', 'eski soʻz, yangi maʼno olmagan'], answerIndex: 0 } }
    }
  ]
};
