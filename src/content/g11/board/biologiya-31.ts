import type { BoardLesson } from './types';
import { BOB3 } from './biologiya-24';

/** Darslik: Biologiya 11, 31-§ (162–166-betlar) — biosfera evolutsiyasi bosqichlari (Vernadskiy), biogenez, geoxronologik jadval, hayotning quruqlikka chiqishi. */
export const BIO_31: BoardLesson = {
  n: 31,
  label: '31',
  group: BOB3,
  title: 'Biosfera evolutsiyasi. Biogenez',
  section: '31-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yerning ilk atmosferasida erkin kislorod deyarli yoʻq edi. Bugun havoning beshdan bir qismi kislorod — uni milliardlab yil davomida mitti sianobakteriyalar va oʻsimliklar ishlab chiqargan. Biosfera tirik organizmlar ishtirokida paydo boʻlgan va rivojlangan — bu Vernadskiyning asosiy gʻoyasi.",
      easy: "Kislorodni tirik organizmlar yaratgan — biosfera hayot bilan rivojlangan.",
      draw: [
        { t: 'title', text: 'Havodagi kislorod qayerdan?' },
        { t: 'icon', x: 16, y: 40, emoji: '🦠', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['ilk atmosfera — O₂ yoʻq', 'sianobakteriyalar — fotosintez', 'bugun havoda ≈ 21 % O₂'] }
      ],
      next: 'Uch bosqich'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Vernadskiy biosfera evolutsiyasini uch bosqichga ajratadi. Birinchi — hayot va birlamchi biosferaning paydo boʻlishi, kembriygacha; asosiy omillar geokimyoviy va iqlim omillari. Ikkinchi — koʻp hujayralilar xilma-xilligi ortib, biosfera murakkablashadi, kembriydan hozirgi odam paydo boʻlguncha; asosiy omil biologik evolutsiya. Bu ikkisi birgalikda biogenez. Uchinchi — taxminan 40–50 ming yil avval insoniyat jamiyati bilan boshlangan noogenez.",
      easy: "1, 2-bosqich — biogenez; 3-bosqich (40–50 ming yil) — noogenez.",
      draw: [
        { t: 'title', text: 'Biosfera evolutsiyasi' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: '1. ilk hayot', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: '2. koʻp hujayrali', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: '3. inson', color: 'orange' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 18, y: 44, text: 'biogenez', color: 'green' },
        { t: 'text', x: 72, y: 44, text: 'noogenez', color: 'orange' }
      ],
      next: 'Biogenez'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Dastlabki organizmlar bir hujayrali, geterotrof, anaerob prokariotlar boʻlib, energiyani glikoliz va bijgʻishdan olgan, abiogen hosil boʻlgan tayyor organik moddalar bilan oziqlangan. Organik modda kam boʻlgani uchun tabiiy tanlash natijasida avtotroflar — xemosintezlovchi va fotosintezlovchi bakteriyalar, koʻk-yashil suvoʻtlar paydo boʻldi. Ular CO₂ ni yutib, kislorod ajratdi; yuqori qatlamlarda ozon ekrani hosil boʻldi; kislorod aerob nafas va koʻp hujayralilar paydo boʻlishiga zamin yaratdi.",
      easy: "Anaerob geterotrof → avtotrof → kislorod → ozon → aerob, koʻp hujayralilar.",
      draw: [
        { t: 'title', text: 'Biogenez zanjiri' },
        { t: 'box', id: 'a', x: 4, y: 18, w: 40, h: 8, text: 'anaerob geterotroflar', color: 'purple' },
        { t: 'box', id: 'b', x: 52, y: 18, w: 44, h: 8, text: 'avtotroflar (fotosintez)', color: 'green' },
        { t: 'box', id: 'c', x: 52, y: 40, w: 44, h: 8, text: 'O₂ va ozon ekrani', color: 'blue' },
        { t: 'box', id: 'd', x: 4, y: 40, w: 40, h: 8, text: 'aerob, koʻp hujayralilar', color: 'orange' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' }
      ],
      next: 'Geoxronologik jadval'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yer tarixi eralarga boʻlinadi: arxey — prokariotlar va sianobakteriyalar, fotosintez va jinsiy koʻpayish paydo boʻlgan; proterozoy — umurtqasizlarning barcha tiplari, ilk xordalilar; paleozoy — oʻsimlik va hayvonlar quruqlikka chiqqan, amfibiya va sudralib yuruvchilar; mezozoy — dinozavrlar hukmronligi, ochiq va yopiq urugʻlilar; kaynozoy — sutemizuvchilar, qushlar va odam.",
      easy: "Arxey → proterozoy → paleozoy → mezozoy → kaynozoy.",
      draw: [
        { t: 'title', text: 'Eralar' },
        { t: 'table', x: 4, y: 18, rows: [['era', 'asosiy voqea'], ['arxey', 'prokariotlar, fotosintez'], ['proterozoy', 'umurtqasizlar, xordalilar'], ['paleozoy', 'quruqlikka chiqish'], ['mezozoy', 'dinozavrlar'], ['kaynozoy', 'sutemizuvchilar, odam']] }
      ],
      next: 'Quruqlikka chiqish'
    },
    {
      kind: 'example',
      clear: true,
      say: "Quruqlikka avval bakteriyalar va sianobakteriyalar chiqib, tuproq hosil boʻlishini boshlagan. 500–450 million yil avval oʻsimliklar chiqqan: ilk quruqlik oʻsimliklari — riniofitlar (riniya, kuksoniya) koʻp hujayrali yashil suvoʻtlardan kelib chiqqan. Dastlabki quruqlik hayvonlari — oʻrgimchak va chayonlar. Amfibiyalar 380, reptiliyalar 300, sutemizuvchi va qushlar 200–230 million yil avval paydo boʻlgan.",
      easy: "Oʻsimliklar 500–450 mln yil avval; amfibiya 380, reptiliya 300, sutemizuvchi 200–230.",
      draw: [
        { t: 'title', text: 'Paydo boʻlish, mln yil avval' },
        { t: 'bars', x: 6, y: 18, w: 70, h: 38, items: [{ label: 'oʻsimlik', value: 475 }, { label: 'amfibiya', value: 380 }, { label: 'reptiliya', value: 300 }, { label: 'sutemizuvchi', value: 215 }] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Vernadskiy boʻyicha biosfera evolutsiyasi uch bosqichli: 1–2-bosqichlar (hayot paydo boʻlishi, koʻp hujayralilar) — biogenez, 3-bosqich (40–50 ming yil) — noogenez.',
    'Ilk organizmlar anaerob geterotrof prokariotlar; avtotroflar CO₂ ni yutib O₂ chiqardi, ozon ekrani va aerob nafas paydo boʻldi.',
    'Eralar: arxey, proterozoy, paleozoy, mezozoy, kaynozoy; oʻsimliklar 500–450 mln yil avval quruqlikka chiqqan (riniofitlar).'
  ],
  questions: [
    {
      id: 'b31q1',
      prompt: 'Eralarni eng qadimgisidan boshlab tartiblang.',
      hint: 'Arxey — eng qadimgi.',
      explanation: 'Arxey → proterozoy → paleozoy → mezozoy → kaynozoy.',
      widget: { type: 'order_line', props: { items: [{ label: 'arxey' }, { label: 'proterozoy' }, { label: 'paleozoy' }, { label: 'mezozoy' }, { label: 'kaynozoy' }] } }
    },
    {
      id: 'b31q2',
      prompt: 'Biogenez jarayonlarini tartiblang.',
      hint: 'Kislorod avtotroflardan keyin.',
      explanation: 'Anaerob geterotroflar → avtotroflar → atmosferada O₂ va ozon → aerob koʻp hujayralilar.',
      widget: { type: 'step_order', props: { steps: ['anaerob geterotrof prokariotlar', 'fotosintezlovchi avtotroflar paydo boʻladi', 'atmosferada kislorod va ozon ekrani', 'aerob nafas oluvchi koʻp hujayralilar'] } }
    },
    {
      id: 'b31q3',
      prompt: 'Erani undagi voqea bilan juftlang.',
      hint: 'Dinozavrlar — oʻrta era.',
      explanation: 'Arxey — sianobakteriyalar; paleozoy — quruqlikka chiqish; mezozoy — dinozavrlar; kaynozoy — odam.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'arxey', right: 'sianobakteriyalar' },
            { left: 'paleozoy', right: 'quruqlikka chiqish' },
            { left: 'mezozoy', right: 'dinozavrlar hukmronligi' },
            { left: 'kaynozoy', right: 'odam paydo boʻlishi' }
          ]
        }
      }
    },
    {
      id: 'b31q4',
      prompt: 'Biosfera evolutsiyasining 1- va 2-bosqichlari birgalikda qanday ataladi?',
      hint: 'Faqat biologik qonuniyatlar.',
      explanation: 'Biogenez.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['noogenez', 'biogenez', 'ontogenez', 'antropogenez'], answerIndex: 1 } }
    },
    {
      id: 'b31q5',
      prompt: 'Suvda hamda quruqlikda yashovchilar taxminan necha million yil avval paydo boʻlgan?',
      hint: 'Reptiliyalardan 80 mln yil oldin.',
      explanation: '≈ 380 mln yil avval.',
      widget: { type: 'number_answer', props: { answer: 380, unit: 'mln yil' } }
    },
    {
      id: 'b31q6',
      prompt: 'Dastlabki quruqlik oʻsimliklari qaysilar?',
      hint: 'Riniya va kuksoniya.',
      explanation: 'Riniofitlar — koʻp hujayrali yashil suvoʻtlardan kelib chiqqan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qirqquloqlar', 'riniofitlar', 'ochiq urugʻlilar', 'yopiq urugʻlilar'], answerIndex: 1 } }
    },
    {
      id: 'b31q7',
      prompt: 'Dastlabki tirik organizmlarga xos belgilarni tanlang.',
      hint: 'Kislorod hali yoʻq edi.',
      explanation: 'Bir hujayrali, geterotrof, anaerob prokariotlar; energiyani bijgʻishdan olgan.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'bir hujayrali', correct: true },
            { label: 'geterotrof', correct: true },
            { label: 'anaerob', correct: true },
            { label: 'prokariot', correct: true },
            { label: 'kislorod bilan nafas oladi' },
            { label: 'koʻp hujayrali' }
          ]
        }
      }
    },
    {
      id: 'b31q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ozon kisloroddan hosil boʻladi.',
      explanation: 'Ozon ekrani kislorod toʻplangach hosil boʻlgan; dastlabki quruqlik hayvonlari — oʻrgimchak va chayonlar.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ozon ekrani atmosferada kislorod toʻplangandan keyin hosil boʻlgan.', value: true },
            { text: 'Dastlabki quruqlik hayvonlari — oʻrgimchaklar va chayonlar.', value: true },
            { text: 'Hayvonlar quruqlikka oʻsimliklardan ancha oldin chiqqan.', value: false },
            { text: 'Noogenez bosqichi kembriy davrida boshlangan.', value: false }
          ]
        }
      }
    }
  ]
};
