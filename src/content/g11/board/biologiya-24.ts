import type { BoardLesson } from './types';

export const BOB3 = { kicker: '3-bob', title: 'Hayotning biosfera darajasi' };

/** Darslik: Biologiya 11, 24-§ (133–136-betlar) — biosfera tushunchasi, Zyuss va Vernadskiy, biosfera darajasining xususiyatlari va vazifalari. */
export const BIO_24: BoardLesson = {
  n: 24,
  label: '24',
  group: BOB3,
  title: 'Biosfera haqida taʼlimot',
  section: '24-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Bizni oʻrab turgan havo tarkibidagi kislorod, ohaktosh togʻlari, neft va koʻmir — bularning barchasi tirik organizmlar faoliyati natijasi. Yerning hozirgi qiyofasini hayot yaratgan. Hayot tarqalgan Yer qobigʻi — biosfera.",
      easy: "Kislorod, ohaktosh, neft — hayot faoliyati natijasi.",
      draw: [
        { t: 'title', text: 'Hayot qobigʻi' },
        { t: 'icon', x: 16, y: 40, emoji: '🌍', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['havodagi kislorod', 'ohaktosh, koʻmir, neft', '— hayot faoliyati izlari'] }
      ],
      next: 'Olimlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "«Hayot qobigʻi» haqidagi dastlabki fikrlar J. B. Lamark nomi bilan bogʻliq. «Biosfera» atamasini 1875-yilda avstriyalik olim Eduard Zyuss kiritgan. Biosfera haqidagi taʼlimotni akademik V. I. Vernadskiy yaratgan: biosfera — barcha tirik organizmlar va ularning qoldiqlari hamda atmosfera, gidrosfera va litosferaning hayot bor yoki hayot izlari bor qismlari.",
      easy: "Lamark — gʻoya; Zyuss (1875) — atama; Vernadskiy — taʼlimot.",
      draw: [
        { t: 'title', text: 'Biosfera haqida taʼlimot' },
        { t: 'table', x: 4, y: 20, rows: [['olim', 'hissasi'], ['J. B. Lamark', '«hayot qobigʻi» gʻoyasi'], ['E. Zyuss, 1875', '«biosfera» atamasi'], ['V. I. Vernadskiy', 'biosfera taʼlimoti']] }
      ],
      next: 'Global ekosistema'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ekologik nuqtai nazardan biosfera — Yerdagi barcha ekosistemalarni birlashtirgan global ekosistema, unda moddalar va energiya almashinuvi toʻxtovsiz boradi. U hayotning eng murakkab, eng yuqori darajasi; tuzilish birligi — biogeotsenozlar. Vernadskiy taʼkidlaganidek, biosfera bir tomondan organizmlarning yashash muhiti, ikkinchi tomondan — ularning faoliyati mahsuli.",
      easy: "Biosfera — global ekosistema; birligi — biogeotsenoz.",
      draw: [
        { t: 'title', text: 'Global ekosistema' },
        { t: 'ellipse', cx: 40, cy: 44, rx: 30, ry: 18, color: 'blue' },
        { t: 'ellipse', cx: 28, cy: 46, rx: 8, ry: 5, color: 'green' },
        { t: 'ellipse', cx: 48, cy: 40, rx: 8, ry: 5, color: 'green' },
        { t: 'ellipse', cx: 50, cy: 52, rx: 7, ry: 4, color: 'green' },
        { t: 'text', x: 40, y: 30, text: 'biosfera', anchor: 'middle', color: 'blue' },
        { t: 'list', x: 74, y: 34, items: ['birligi:', 'biogeo-', 'tsenozlar'] }
      ],
      next: 'Vazifasi'
    },
    {
      kind: 'example',
      clear: true,
      say: "Biosferaning asosiy vazifasi — hayot shakllarining xilma-xilligini uzoq vaqt saqlash. Unda global jarayonlar boradi: quyosh energiyasining uzluksiz qabul qilinishi, oʻsimliklar kislorod hosil qilishi, ozon qatlamining saqlanishi, karbonat angidrid miqdorining doimiyligi. Biosfera barqarorligi moddalar aylanishining dinamik muvozanati va turlar xilma-xilligiga bogʻliq.",
      easy: "Vazifa — biologik xilma-xillikni saqlash; global jarayonlar: quyosh energiyasi, O₂, ozon.",
      draw: [
        { t: 'title', text: 'Biosfera jarayonlari' },
        { t: 'list', x: 4, y: 20, items: ['quyosh energiyasini qabul qilish', 'kislorod hosil boʻlishi', 'ozon qatlami', 'CO₂ miqdori doimiyligi'] },
        { t: 'text', x: 4, y: 58, text: 'vazifa: biologik xilma-xillikni saqlash', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    '«Biosfera» atamasini 1875-yilda E. Zyuss kiritgan, taʼlimotni V. I. Vernadskiy yaratgan; gʻoya Lamarkdan boshlangan.',
    'Biosfera — barcha ekosistemalarni birlashtirgan global ekosistema, hayotning eng yuqori darajasi; tuzilish birligi — biogeotsenozlar.',
    'Asosiy vazifasi — biologik xilma-xillikni saqlash; quyosh energiyasi, kislorod, ozon qatlami, CO₂ muvozanati — global jarayonlar.'
  ],
  questions: [
    {
      id: 'b24q1',
      prompt: 'Olimni hissasi bilan juftlang.',
      hint: 'Zyuss — atama.',
      explanation: 'Lamark — hayot qobigʻi gʻoyasi; Zyuss — «biosfera» atamasi (1875); Vernadskiy — biosfera taʼlimoti.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'J. B. Lamark', right: '«hayot qobigʻi» gʻoyasi' },
            { left: 'E. Zyuss', right: '«biosfera» atamasi' },
            { left: 'V. I. Vernadskiy', right: 'biosfera taʼlimoti' }
          ]
        }
      }
    },
    {
      id: 'b24q2',
      prompt: '«Biosfera» atamasi qaysi yilda fanga kiritilgan?',
      hint: 'XIX asr oxiri.',
      explanation: '1875-yilda.',
      widget: { type: 'number_answer', props: { answer: 1875 } }
    },
    {
      id: 'b24q3',
      prompt: 'Biosfera darajasining tuzilish birligi nima?',
      hint: 'Tabiiy ekosistemalar.',
      explanation: 'Biogeotsenozlar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['hujayra', 'populatsiya', 'biogeotsenoz', 'organizm'], answerIndex: 2 } }
    },
    {
      id: 'b24q4',
      prompt: 'Biosfera darajasida boradigan global jarayonlarni belgilang.',
      hint: 'Butun sayyora miqyosi.',
      explanation: 'Quyosh energiyasini qabul qilish, kislorod hosil boʻlishi, ozon qatlami, CO₂ doimiyligi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'quyosh energiyasining uzluksiz qabul qilinishi', correct: true },
            { label: 'oʻsimliklar kislorod hosil qilishi', correct: true },
            { label: 'ozon qatlamining saqlanishi', correct: true },
            { label: 'bitta hujayraning boʻlinishi' }
          ]
        }
      }
    },
    {
      id: 'b24q5',
      prompt: 'Biosferaning asosiy vazifasi nima?',
      hint: 'Xilma-xillik.',
      explanation: 'Hayot shakllari xilma-xilligini va ularning uzoq saqlanishini taʼminlash.',
      widget: {
        type: 'mcq',
        props: { prompt: '', choices: ['hayot xilma-xilligini saqlash', 'togʻlar hosil qilish', 'okeanni shoʻrlantirish', 'quyoshni isitish'], answerIndex: 0 }
      }
    },
    {
      id: 'b24q6',
      prompt: 'Biosfera qaysi qobiqlarning qismlarini oʻz ichiga oladi?',
      hint: 'Uchta qobiq.',
      explanation: 'Atmosfera, gidrosfera va litosfera.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'atmosfera', correct: true },
            { label: 'gidrosfera', correct: true },
            { label: 'litosfera', correct: true },
            { label: 'Yer yadrosi' }
          ]
        }
      }
    },
    {
      id: 'b24q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Eng yuqori daraja.',
      explanation: 'Biosfera — hayotning eng yuqori darajasi va global ekosistema.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Biosfera — hayotning eng ' }, { blank: 'yuqori' }, { text: ' darajasi va ' }, { blank: 'global' }, { text: ' ekosistema.' }],
          bank: ['yuqori', 'global', 'quyi', 'mahalliy']
        }
      }
    },
    {
      id: 'b24q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Vernadskiy: biosfera — muhit va mahsul.',
      explanation: 'Yer qiyofasi hayot faoliyati natijasi; biosfera barqarorligi xilma-xillikka bogʻliq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Yerning hozirgi atmosferasi tirik organizmlar faoliyati natijasi.', value: true },
            { text: 'Biosfera barqarorligi turlar xilma-xilligiga bogʻliq.', value: true },
            { text: '«Biosfera» atamasini V. I. Vernadskiy kiritgan.', value: false },
            { text: 'Biosfera — hayotning eng quyi darajasi.', value: false }
          ]
        }
      }
    }
  ]
};
