import type { BoardLesson } from './types';
import { GEO2 } from './geografiya-3';

/** Darslik: Geografiya 10, 7-§ (29–33-betlar) — kenglik zonalligi, tabiat zonalari, sektorlik, azonallik va azonal landshaftlar (botqoq, shoʻrxok, toʻqay, voha). */
export const GEO_7: BoardLesson = {
  n: 7,
  label: '7',
  group: GEO2,
  title: 'Kenglik zonalligi va sektorlik',
  section: '7-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Nega ekvator yonida nam oʻrmonlar, qutblar yaqinida esa muzliklar bor? Buning sababi — zonallik qonuniyati. Yer sharsimon boʻlgani uchun quyosh nurlarining tushish burchagi ekvatordan qutblarga tomon kamayadi, issiqlik notekis taqsimlanadi. Natijada harorat, yogʻin, tuproq, oʻsimlik va hayvonlar ham zonalar boʻylab almashadi. Bu kenglik zonalligi deb ataladi. Uni A. Gumboldt oʻrgana boshlagan, V. V. Dokuchayev esa qonuniyat sifatida asoslab bergan. Eng yirik zonal birliklar — iqlim mintaqalari, ularning ichida issiqlik va namlik nisbatiga qarab tabiat zonalari ajratiladi.",
      easy: "Kenglik zonalligi — quyosh nuri burchagi oʻzgargani sababli tabiatning ekvatordan qutblarga tomon almashinuvi.",
      draw: [
        { t: 'title', text: 'Zonallik va sektorlik' },
        { t: 'box', id: 'z', x: 4, y: 22, w: 42, h: 10, text: 'kenglik zonalligi', color: 'blue' },
        { t: 'box', id: 's', x: 54, y: 22, w: 42, h: 10, text: 'sektorlik', color: 'green' },
        { t: 'text', x: 4, y: 44, text: 'ekvator → qutblar', size: 's', color: 'blue' },
        { t: 'text', x: 54, y: 44, text: 'okean → materik ichi', size: 's', color: 'green' }
      ],
      next: 'Azonallik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sektorlik — okeandan materik ichkarisiga tomon uzoqlashgan sari iqlim va tabiatning oʻzgarishi: moʻtadil mintaqada dengiz, moʻtadil kontinental, keskin kontinental va musson iqlim oʻlkalari shakllangan. Azonallik esa Yerning ichki kuchlari va mahalliy omillar — relyef, togʻ jinslari, yer osti suvlari, inson faoliyati — tufayli paydo boʻladigan oʻzgarishlar. Masalan, yer osti suvlari yuza joylarda botqoqliklar hosil boʻladi; Oʻzbekistonda choʻl zonasida joylashgan boʻlsa ham, Ustyurt botiqlarida shoʻrxoklar, daryo qayirlarida toʻqaylar, suv chiqarilgan choʻllarda esa vohalar paydo boʻlgan. Zonal va azonal xususiyatlar har doim birga uchraydi.",
      easy: "Sektorlik — okeandan uzoqlashgan sari; azonallik — relyef, jinslar, suv, inson taʼsiri: botqoq, shoʻrxok, toʻqay, voha.",
      draw: [
        { t: 'title', text: 'Oʻzbekistondagi azonal landshaftlar' },
        { t: 'table', x: 4, y: 18, rows: [['landshaft', 'sababi'], ['shoʻrxok', 'botiq relyef, tuzli jinslar'], ['toʻqay', 'daryo qayiri, yaqin suv'], ['voha', 'choʻlga suv chiqarish']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Kenglik zonalligi — quyosh nurlari tushish burchagi oʻzgargani sababli tabiatning ekvatordan qutblarga tomon qonuniy almashinuvi; uni V. V. Dokuchayev asoslagan.',
    'Sektorlik — okeandan materik ichkarisiga tomon iqlim va tabiatning oʻzgarishi; moʻtadil mintaqada dengiz, kontinental, keskin kontinental va musson iqlimlari shakllangan.',
    'Azonallik — relyef, togʻ jinslari, yer osti suvlari va inson faoliyati taʼsirida paydo boʻladigan oʻzgarishlar: botqoqlik, shoʻrxok, toʻqay, voha.'
  ],
  questions: [
    {
      id: 'g7q1',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Voha — suv chiqarilgan choʻl.',
      explanation: 'Kenglik zonalligi — ekvatordan qutblarga almashinish; sektorlik — okeandan materik ichiga almashinish; toʻqay — daryo boʻyidagi changalzor; voha — suv chiqarib obod qilingan choʻl.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'kenglik zonalligi', right: 'ekvatordan qutblarga almashinish' },
            { left: 'sektorlik', right: 'okeandan materik ichiga almashinish' },
            { left: 'toʻqay', right: 'daryo boʻyidagi changalzor' },
            { left: 'voha', right: 'suv chiqarib obod qilingan choʻl' }
          ]
        }
      }
    },
    {
      id: 'g7q2',
      prompt: 'Geografik zonallik qonuniyatini kim kashf etib asoslagan?',
      hint: 'Tuproqshunos olim.',
      explanation: 'V. V. Dokuchayev.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['V. V. Dokuchayev', 'Ptolemey', 'Kolumb', 'Eratosfen'], answerIndex: 0 } }
    },
    {
      id: 'g7q3',
      prompt: 'Omilni turiga ajrating.',
      hint: 'Quyosh nuri burchagi — zonal.',
      explanation: 'Zonal — quyosh nurlari burchagi, issiqlik va namlik nisbati; azonal — relyef, togʻ jinslari, yer osti suvlari, inson faoliyati.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'z', label: 'zonal omil' }, { id: 'a', label: 'azonal omil' }],
          items: [
            { emoji: '☀️', label: 'quyosh nurlarining tushish burchagi', bin: 'z' },
            { emoji: '🌡️', label: 'issiqlik va namlik nisbati', bin: 'z' },
            { emoji: '⛰️', label: 'relyef tuzilishi', bin: 'a' },
            { emoji: '🪨', label: 'togʻ jinslari tarkibi', bin: 'a' },
            { emoji: '💧', label: 'yer osti suvlari sathi', bin: 'a' },
            { emoji: '🚜', label: 'insonning xoʻjalik faoliyati', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'g7q4',
      prompt: 'Ustyurtda shoʻrxoklar keng tarqalishining sabablarini tanlang.',
      hint: 'Relyef va jinslar.',
      explanation: 'Botiq relyef va tez eruvchan ohaktosh, gips, mergel kabi jinslar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'botiq relyef shakllari', correct: true },
            { label: 'tez eruvchan jinslar (gips, ohaktosh)', correct: true },
            { label: 'nam ekvatorial iqlim' },
            { label: 'doimiy muzliklar' }
          ]
        }
      }
    },
    {
      id: 'g7q5',
      prompt: 'Moʻtadil mintaqada okeandan materik ichkarisiga tomon iqlim oʻlkalarini tartiblang.',
      hint: 'Dengiz iqlimi — qirgʻoqda.',
      explanation: 'Dengiz → moʻtadil kontinental → keskin kontinental.',
      widget: { type: 'order_line', props: { items: [{ label: 'dengiz iqlimi' }, { label: 'moʻtadil kontinental' }, { label: 'keskin kontinental' }] } }
    },
    {
      id: 'g7q6',
      prompt: 'Oʻzbekiston qaysi tabiat zonasida joylashgan?',
      hint: 'Qizilqum.',
      explanation: 'Moʻtadil mintaqaning choʻl zonasida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['choʻl', 'tayga', 'tundra', 'nam ekvatorial oʻrmon'], answerIndex: 0 } }
    },
    {
      id: 'g7q7',
      prompt: 'Botqoqlikda torf qatlami kamida necha santimetr boʻladi?',
      hint: 'Undan yupqa boʻlsa — «botqoqlashgan yer».',
      explanation: '30 sm.',
      widget: { type: 'number_answer', props: { answer: 30, unit: 'sm' } }
    },
    {
      id: 'g7q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Zonal va azonal — doim birga.',
      explanation: 'Zonal va azonal xususiyatlar har doim birga uchraydi; Oʻzbekistonda aholi eng zich hududlar vohalarda.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Zonal va azonal xususiyatlar har doim birga uchraydi.', value: true },
            { text: 'Oʻzbekistonda aholi eng zich joylashgan hududlar vohalardir.', value: true },
            { text: 'Zonallik atmosferaning eng yuqori qatlamlarida eng aniq namoyon boʻladi.', value: false },
            { text: 'Azonallik faqat quyosh nurlari tufayli paydo boʻladi.', value: false }
          ]
        }
      }
    }
  ]
};
