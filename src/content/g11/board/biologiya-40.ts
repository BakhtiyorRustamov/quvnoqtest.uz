import type { BoardLesson } from './types';
import { BOB4 } from './biologiya-35';

/** Darslik: Biologiya 11, 40-§ (208–214-betlar) — tana qoplami (epidermis, derma, tangachalar, pat, jun, bezlar) va tayanch-harakat organlari (ichki, gidrostatik, tashqi skelet; muskullar) evolutsiyasi. */
export const BIO_40: BoardLesson = {
  n: 40,
  label: '40',
  group: BOB4,
  title: 'Tana qoplami va harakat organlari evolutsiyasi',
  section: '40-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Akulaning terisini teskari silasangiz, qumqogʻozdek gʻadir-budur: uning tangachalari tishga oʻxshash — dentin va emaldan tuzilgan. Ogʻzidagi shunday tangachalar kattalashib, haqiqiy tishlarga aylangan. Teri dastlab himoya organi boʻlgan, keyin nafas, sezish, termoregulatsiya, ayirish va hatto sut bilan oziqlantirish vazifalarini olgan.",
      easy: "Akula tangachasi — tishsimon; teri vazifalari koʻpaygan.",
      draw: [
        { t: 'title', text: 'Teri vazifalari' },
        { t: 'icon', x: 14, y: 40, emoji: '🦈', size: 'l' },
        { t: 'list', x: 30, y: 20, items: ['himoya', 'nafas olish (baqa)', 'sezish, termoregulatsiya', 'ayirish (ter)', 'sut bilan oziqlantirish'] }
      ],
      next: 'Teri qavatlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Xordalilar terisi ikki qavat: ektodermadan rivojlanadigan epidermis va mezodermadan rivojlanadigan derma. Lansetnikda ikkalasi kuchsiz, epidermis bir qavatli. Umurtqalilarda epidermis koʻp qavatli boʻladi: pastki hujayralar koʻpayadi, ustkilari nobud boʻlib tushadi; dermada mustahkam biriktiruvchi tolalar, terida turli hosilalar va bezlar paydo boʻladi.",
      easy: "Epidermis — ektodermadan, derma — mezodermadan.",
      draw: [
        { t: 'title', text: 'Teri qavatlari' },
        { t: 'box', id: 'e', x: 10, y: 22, w: 80, h: 9, text: 'epidermis — ektodermadan', color: 'orange' },
        { t: 'box', id: 'd', x: 10, y: 34, w: 80, h: 12, text: 'derma — mezodermadan', color: 'red' },
        { t: 'text', x: 10, y: 56, text: 'umurtqalilarda epidermis koʻp qavatli', size: 's' }
      ],
      next: 'Sinflar terisi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Baliqlarda bezlar bir hujayrali — shilimshiq ishqalanishni kamaytiradi; togʻayli baliqlarda plakoid, suyakli baliqlarda dermadan rivojlangan suyak tangachalar. Amfibiyalarda yupqa nam teri nafasda qatnashadi, koʻp hujayrali shilimshiq va zahar bezlari bor. Sudralib yuruvchilarda teri quruq, bezsiz, muguz tangachali, ular tullaydi. Qushlarda teri quruq, faqat dumgʻaza bezi, pat — epidermis hosilasi. Sutemizuvchilarda jun, yogʻ, ter, sut va hid bezlari; sut bezlari ter bezlaridan kelib chiqqan.",
      easy: "Baliq — tangacha; baqa — nam teri; reptiliya — muguz; qush — pat; sutemizuvchi — jun, bezlar.",
      draw: [
        { t: 'title', text: 'Teri hosilalari' },
        { t: 'table', x: 4, y: 18, rows: [['sinf', 'qoplami', 'bezlar'], ['baliqlar', 'tangachalar', 'bir hujayrali'], ['amfibiyalar', 'yupqa nam teri', 'shilimshiq, zahar'], ['reptiliyalar', 'muguz tangacha', 'yoʻq'], ['qushlar', 'pat', 'dumgʻaza bezi'], ['sutemizuvchilar', 'jun', 'yogʻ, ter, sut']] }
      ],
      next: 'Skelet turlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tayanch sistemalari uch xil. Ichki skelet: bir hujayrali dengiz hayvonlari — radiolyariyalarda kremniy oksidli ignalar, korall poliplarida ohakli skelet. Gidrostatik skelet: toʻgarak va halqali chuvalchanglarda tana suyuqligi muskullarga bosim beradi. Tashqi skelet: boʻgʻimoyoqlilarda xitin qoplami — tayanch, himoya va suv yoʻqotishdan saqlaydi. Xordalilarda xorda, umurtqalilarda umurtqa pogʻonasi paydo boʻlishi — yirik aromorfoz.",
      easy: "Ichki (radiolyariya, korall), gidrostatik (chuvalchang), tashqi (xitin); umurtqa — aromorfoz.",
      draw: [
        { t: 'title', text: 'Skelet turlari' },
        { t: 'table', x: 4, y: 20, rows: [['skelet', 'kimda', 'tarkibi'], ['ichki', 'radiolyariya, korall', 'kremniy, ohak'], ['gidrostatik', 'chuvalchanglar', 'tana suyuqligi'], ['tashqi', 'boʻgʻimoyoqlilar', 'xitin'], ['umurtqa', 'umurtqalilar', 'suyak']] }
      ],
      next: 'Harakat organlari'
    },
    {
      kind: 'example',
      clear: true,
      say: "Bir hujayralilar soxta oyoq, xivchin va kiprikchalar bilan harakatlanadi. Boʻshliqichlilarda maxsus harakat organi yoʻq — teri-muskul hujayralari qisqaradi. Chuvalchanglarda teri-muskul xaltasi, koʻp tuklilarda parapodiylar, mollyuskalarda muskulli oyoq, boʻgʻimoyoqlilarda xitinga birikkan muskul boylamlari. Umurtqalilarda muskullar skeletga birikkan — skelet muskullari; ular quruqlikda, suvda va havoda harakatlanadi.",
      easy: "Xivchin → teri-muskul → parapodiy → xitinga birikkan muskul → skelet muskullari.",
      draw: [
        { t: 'title', text: 'Harakat organlari' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 28, h: 8, text: 'xivchin, kiprik', color: 'purple' },
        { t: 'box', id: 'b', x: 36, y: 20, w: 28, h: 8, text: 'teri-muskul', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 20, w: 28, h: 8, text: 'parapodiylar', color: 'orange' },
        { t: 'box', id: 'd', x: 68, y: 42, w: 28, h: 8, text: 'skelet muskuli', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Teri — epidermis (ektodermadan) va derma (mezodermadan); vazifalari himoyadan nafas, sezish, termoregulatsiya, ayirish va sut bilan oziqlantirishgacha kengaygan.',
    'Baliqlarda tangachalar, amfibiyalarda nam bezli teri, reptiliyalarda muguz tangachalar, qushlarda pat, sutemizuvchilarda jun va yogʻ, ter, sut bezlari.',
    'Skelet: ichki (radiolyariya, korall), gidrostatik (chuvalchanglar), tashqi xitin (boʻgʻimoyoqlilar); xorda va umurtqa pogʻonasi — yirik aromorfoz.'
  ],
  questions: [
    {
      id: 'b40q1',
      prompt: 'Sinfni tana qoplami bilan juftlang.',
      hint: 'Pat — qushlarda.',
      explanation: 'Baliqlar — tangachalar; amfibiyalar — yupqa nam teri; sudralib yuruvchilar — muguz tangachalar; qushlar — pat; sutemizuvchilar — jun.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'suyakli baliqlar', right: 'suyak tangachalar' },
            { left: 'amfibiyalar', right: 'yupqa nam teri' },
            { left: 'sudralib yuruvchilar', right: 'muguz tangachalar' },
            { left: 'qushlar', right: 'pat' },
            { left: 'sutemizuvchilar', right: 'jun' }
          ]
        }
      }
    },
    {
      id: 'b40q2',
      prompt: 'Skelet turini misol bilan juftlang.',
      hint: 'Chuvalchang — suyuqlik bosimi.',
      explanation: 'Gidrostatik — yomgʻir chuvalchangi; tashqi — qisqichbaqa (xitin); ichki ohakli — korall poliplari.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'gidrostatik skelet' }, b: { label: 'yomgʻir chuvalchangi' } },
            { a: { label: 'tashqi skelet' }, b: { label: 'xitin qoplami' } },
            { a: { label: 'ohakli ichki skelet' }, b: { label: 'korall poliplari' } },
            { a: { label: 'kremniy ignalar' }, b: { label: 'radiolyariyalar' } }
          ]
        }
      }
    },
    {
      id: 'b40q3',
      prompt: 'Sutemizuvchilarning sut bezlari qaysi bezlardan kelib chiqqan?',
      hint: 'Ular ham suyuqlik ajratadi.',
      explanation: 'Ter bezlarining ixtisoslashuvidan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yogʻ bezlaridan', 'ter bezlaridan', 'hid bezlaridan', 'soʻlak bezlaridan'], answerIndex: 1 } }
    },
    {
      id: 'b40q4',
      prompt: 'Terisida bezlar boʻlmaydigan sinf qaysi?',
      hint: 'Muguz tangachali.',
      explanation: 'Sudralib yuruvchilar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['amfibiyalar', 'sudralib yuruvchilar', 'sutemizuvchilar', 'baliqlar'], answerIndex: 1 } }
    },
    {
      id: 'b40q5',
      prompt: 'Boʻgʻimoyoqlilar xitin qoplamining vazifalarini tanlang.',
      hint: 'Uchta vazifa.',
      explanation: 'Tayanch, ichki organlarni himoya qilish, suv yoʻqotishdan saqlash.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tayanch', correct: true },
            { label: 'ichki organlarni himoya', correct: true },
            { label: 'suv yoʻqotishdan saqlash', correct: true },
            { label: 'sut ajratish' },
            { label: 'teri orqali nafas' }
          ]
        }
      }
    },
    {
      id: 'b40q6',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Ekto — tashqi, mezo — oʻrta.',
      explanation: 'Epidermis ektodermadan, derma mezodermadan rivojlanadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Epidermis ' }, { blank: 'ektodermadan' }, { text: ', derma esa ' }, { blank: 'mezodermadan' }, { text: ' rivojlanadi.' }],
          bank: ['ektodermadan', 'mezodermadan', 'entodermadan']
        }
      }
    },
    {
      id: 'b40q7',
      prompt: 'Harakat organlarini evolutsiya tartibida joylashtiring.',
      hint: 'Bir hujayralilardan boshlang.',
      explanation: 'Xivchin → teri-muskul hujayralari → parapodiylar → skelet muskullari.',
      widget: { type: 'order_line', props: { items: [{ label: 'xivchinlar' }, { label: 'teri-muskul hujayralari' }, { label: 'parapodiylar' }, { label: 'skelet muskullari' }] } }
    },
    {
      id: 'b40q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Pat — epidermis hosilasi.',
      explanation: 'Pat va jun — epidermis hosilasi; umurtqa pogʻonasi paydo boʻlishi — aromorfoz.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qushlarning pati epidermis hosilasi.', value: true },
            { text: 'Umurtqa pogʻonasining paydo boʻlishi — yirik aromorfoz.', value: true },
            { text: 'Sudralib yuruvchilar terisi nafas olishda qatnashadi.', value: false },
            { text: 'Boʻshliqichlilarda maxsus harakat organlari bor.', value: false }
          ]
        }
      }
    }
  ]
};
