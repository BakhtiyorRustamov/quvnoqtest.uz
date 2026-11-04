import type { BoardLesson } from './types';
import { BOB4 } from './biologiya-35';

/** Darslik: Biologiya 11, 42-§ (217–222-betlar) — qon aylanish organlari evolutsiyasi: halqalilardan sutemizuvchilargacha, yurak kameralari va qon aylanish doiralari. */
export const BIO_42: BoardLesson = {
  n: 42,
  label: '42',
  group: BOB4,
  title: 'Qon aylanish organlari evolutsiyasi',
  section: '42-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Qushning yuragi daqiqasiga 500 marta uradi, tana harorati +42 °C. Baqaning yuragi esa daqiqasiga 40–50, baʼzan atigi 20–30 marta uradi. Bu farqning sababi — yurak tuzilishi va qonning aralashish-aralashmasligi.",
      easy: "Qush — 500 marta/min, baqa — 20–50; sabab — yurak tuzilishi.",
      draw: [
        { t: 'title', text: 'Yurak urishi, marta/min' },
        { t: 'bars', x: 6, y: 18, w: 60, h: 38, items: [{ label: 'baqa', value: 45 }, { label: 'qush', value: 500 }] },
        { t: 'text', x: 70, y: 34, text: 'qush: +42 °C', color: 'red' }
      ],
      next: 'Umurtqasizlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gʻovaktanlilar, boʻshliqichlilar va yassi chuvalchanglarda qon aylanish sistemasi yoʻq — moddalar diffuziya bilan tarqaladi. Qon aylanish sistemasi dastlab halqali chuvalchanglarda paydo boʻlgan: orqa va qorin qon tomirlari halqa tomirlar bilan tutashgan, halqum atrofidagi halqa tomirlar «yurak» vazifasini bajaradi; sistema yopiq. Yurak dastlab mollyuskalarda paydo boʻlgan, sistema ochiq. Boʻgʻimoyoqlilarda ham ochiq — gemolimfa; hasharotlarda qon kislorod tashimaydi.",
      easy: "Halqalilar — yopiq sistema; mollyuskalar — ilk yurak, ochiq sistema; hasharot — gemolimfa.",
      draw: [
        { t: 'title', text: 'Umurtqasizlar' },
        { t: 'table', x: 4, y: 18, rows: [['guruh', 'sistema', 'yurak'], ['yassi chuvalchang', 'yoʻq', 'yoʻq'], ['halqali', 'yopiq', 'halqa tomirlar'], ['mollyuska', 'ochiq', 'bor'], ['hasharot', 'ochiq', 'koʻp kamerali nay']] }
      ],
      next: 'Lansetnik va baliq'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Lansetnikda yurak yoʻq, qorin aortasi yurak vazifasini bajaradi; sistema yopiq, bitta doira. Baliqlarda bir boʻlmacha va bir qorinchali, ikki kamerali yurak paydo boʻlgan; yuragida faqat venoz qon oqadi; qon jabraga borib kislorodga toʻyinadi, keyin orqa aorta orqali tanaga tarqaladi — bitta qon aylanish doirasi.",
      easy: "Lansetnik — yuraksiz; baliq — 2 kamerali, venoz qon, bitta doira.",
      draw: [
        { t: 'title', text: 'Baliq qon aylanishi' },
        { t: 'box', id: 'y', x: 4, y: 42, w: 28, h: 9, text: 'yurak (venoz)', color: 'blue' },
        { t: 'box', id: 'j', x: 36, y: 16, w: 28, h: 9, text: 'jabra', color: 'purple' },
        { t: 'box', id: 't', x: 68, y: 42, w: 28, h: 9, text: 'tana', color: 'red' },
        { t: 'arrow', from: 'y', to: 'j' },
        { t: 'arrow', from: 'j', to: 't', label: 'O₂' },
        { t: 'arrow', from: 't', to: 'y' }
      ],
      next: 'Ikki doira'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Quruqlikka chiqish va oʻpka bilan nafas qon aylanishini oʻzgartirdi. Amfibiyalarda yurak uch kamerali: ikki boʻlmacha, bir qorincha; qon ikki doira boʻylab aylanadi, lekin qorinchada qon aralashadi. Sudralib yuruvchilarda qorinchada chala toʻsiq bor, timsohlarda toʻsiq toʻliq — toʻrt kamerali; baribir tanaga aralash qon boradi, shuning uchun ular sovuqqonli. Qush va sutemizuvchilarda yurak toʻrt kamerali, qon aralashmaydi — issiqqonli.",
      easy: "Amfibiya — 3 kamerali; reptiliya — chala toʻsiq; qush, sutemizuvchi — 4 kamerali, issiqqonli.",
      draw: [
        { t: 'title', text: 'Yurak kameralari soni' },
        { t: 'bars', x: 6, y: 18, w: 80, h: 38, items: [{ label: 'lansetnik', value: 0 }, { label: 'baliq', value: 2 }, { label: 'amfibiya', value: 3 }, { label: 'qush', value: 4 }, { label: 'sutemizuvchi', value: 4 }] }
      ],
      next: 'Uch bosqich'
    },
    {
      kind: 'example',
      clear: true,
      say: "Qushlarda aorta yoyi oʻngdan, sutemizuvchilarda chapdan aylanadi. Qon aylanish sistemasi evolutsiyasining uch bosqichi: birinchi — yurakning paydo boʻlishi va kameralar sonining ortishi; ikkinchi — katta va kichik qon aylanish doiralarining paydo boʻlishi; uchinchi — yurakning chap arterial va oʻng venoz qismlarga toʻliq ajralishi.",
      easy: "Kameralar ortishi → ikki doira → chap arterial, oʻng venoz.",
      draw: [
        { t: 'title', text: 'Evolutsiya bosqichlari' },
        { t: 'list', x: 4, y: 20, items: ['1. yurak va kameralar soni ortishi', '2. katta va kichik doira', '3. chap — arterial, oʻng — venoz'] },
        { t: 'text', x: 4, y: 52, text: 'aorta yoyi: qush — oʻngdan, sutemizuvchi — chapdan', size: 's', color: 'red' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Qon aylanish sistemasi halqalilarda (yopiq), yurak mollyuskalarda (ochiq sistema) paydo boʻlgan; boʻgʻimoyoqlilarda ochiq sistema, gemolimfa.',
    'Lansetnik — yuraksiz, baliq — 2 kamerali yurak, bitta doira; amfibiya — 3 kamerali, ikki doira, aralash qon; reptiliya — chala toʻsiq, sovuqqonli.',
    'Qush va sutemizuvchi — 4 kamerali yurak, qon aralashmaydi, issiqqonli; bosqichlar: kameralar ortishi → ikki doira → chap arterial va oʻng venoz qism.'
  ],
  questions: [
    {
      id: 'b42q1',
      prompt: 'Hayvonni yurak tuzilishi bilan juftlang.',
      hint: 'Baliq — ikki kamera.',
      explanation: 'Lansetnik — yurak yoʻq; baliq — 2 kamerali; baqa — 3 kamerali; kaptar — 4 kamerali.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'lansetnik', right: 'yurak yoʻq' },
            { left: 'baliq', right: '2 kamerali' },
            { left: 'baqa', right: '3 kamerali' },
            { left: 'kaptar', right: '4 kamerali' }
          ]
        }
      }
    },
    {
      id: 'b42q2',
      prompt: 'Qushlarning yuragi daqiqasiga necha marta uradi?',
      hint: 'Darslikdagi raqam.',
      explanation: '500 marta.',
      widget: { type: 'number_answer', props: { answer: 500, unit: 'marta' } }
    },
    {
      id: 'b42q3',
      prompt: 'Yurak dastlab qaysi hayvonlarda paydo boʻlgan?',
      hint: 'Halqalilarda faqat halqa tomirlar.',
      explanation: 'Mollyuskalarda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['halqali chuvalchanglarda', 'mollyuskalarda', 'baliqlarda', 'lansetnikda'], answerIndex: 1 } }
    },
    {
      id: 'b42q4',
      prompt: 'Qon aylanish sistemasini turiga ajrating.',
      hint: 'Ochiq — qon tana boʻshligʻiga quyiladi.',
      explanation: 'Yopiq: halqali chuvalchang, lansetnik, baliq. Ochiq: mollyuska, hasharot, qisqichbaqa.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'y', label: 'Yopiq' },
            { id: 'o', label: 'Ochiq' }
          ],
          items: [
            { emoji: '', label: 'halqali chuvalchang', bin: 'y' },
            { emoji: '', label: 'lansetnik', bin: 'y' },
            { emoji: '', label: 'baliq', bin: 'y' },
            { emoji: '', label: 'mollyuska', bin: 'o' },
            { emoji: '', label: 'hasharot', bin: 'o' },
            { emoji: '', label: 'qisqichbaqa', bin: 'o' }
          ]
        }
      }
    },
    {
      id: 'b42q5',
      prompt: 'Qon aylanish evolutsiyasi bosqichlarini tartiblang.',
      hint: 'Avval yurak.',
      explanation: 'Yurak va kameralar ortishi → ikki doira → yurakning arterial va venoz qismlarga ajralishi.',
      widget: { type: 'step_order', props: { steps: ['yurak paydo boʻlishi, kameralar ortishi', 'katta va kichik qon aylanish doirasi', 'chap arterial va oʻng venoz qismlarga ajralish'] } }
    },
    {
      id: 'b42q6',
      prompt: 'Nima uchun sudralib yuruvchilar sovuqqonli?',
      hint: 'Qorinchada chala toʻsiq.',
      explanation: 'Arteriyalarda aralash qon oqadi — moddalar almashinuvida kam energiya hosil boʻladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tanaga aralash qon boradi', 'ularda qon yoʻq', 'yuragi 4 kamerali', 'ular jabra bilan nafas oladi'], answerIndex: 0 } }
    },
    {
      id: 'b42q7',
      prompt: 'Issiqqonli hayvonlarni tanlang.',
      hint: '4 kamerali yurak.',
      explanation: 'Qushlar va sutemizuvchilar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'kaptar', correct: true },
            { label: 'ot', correct: true },
            { label: 'timsoh' },
            { label: 'baqa' },
            { label: 'akula' }
          ]
        }
      }
    },
    {
      id: 'b42q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Baliq yuragida venoz qon.',
      explanation: 'Baliq yuragida faqat venoz qon; timsohda qorincha toʻsigʻi toʻliq; hasharot qoni kislorod tashimaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Baliq yuragida faqat venoz qon oqadi.', value: true },
            { text: 'Timsohlarda yurak qorinchasi toʻsigʻi toʻliq.', value: true },
            { text: 'Hasharotlar qoni kislorod tashiydi.', value: false },
            { text: 'Qushlarda aorta yoyi chapdan aylanadi.', value: false }
          ]
        }
      }
    }
  ]
};
