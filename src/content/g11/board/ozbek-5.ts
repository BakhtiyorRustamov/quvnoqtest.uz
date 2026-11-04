import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 23–25-betlar — yozma nutqning toʻgʻriligi: imlo va tinish belgilari meʼyorlari. */
export const OZ_5: BoardLesson = {
  n: 5,
  label: '5',
  group: OZG1,
  title: 'Yozma nutqning toʻgʻriligi va meʼyor',
  section: 'Ona tili, 1-qism: «Yozma nutqning toʻgʻriligi va meʼyor»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Yozma nutq toʻgʻri boʻlishi uchun yana ikki meʼyorga amal qilinadi: imlo, yaʼni orfografik meʼyorlar va tinish belgilari, yaʼni punktuatsion meʼyorlar. Imlo qoidalarini mutaxassislar til qonuniyatlari va anʼanaga tayanib tuzadi, davlat tasdiqlaydi, ular imlo lugʻatlarida aks etadi; bu qoidalar savodxonlikning asosi. Tinish belgilari esa harf va soʻz bilan koʻrsatib boʻlmaydigan fikriy munosabat, kayfiyat va ohangni ifodalaydi.",
      easy: "Yozuvda yana ikki qoida bor: imlo (soʻzni toʻgʻri yozish) va tinish belgilari (ohang, fikrni koʻrsatish).",
      draw: [
        { t: 'title', text: 'Yozma nutq meʼyorlari' },
        { t: 'box', id: 'i', x: 4, y: 20, w: 44, h: 14, text: 'Imlo (orfografik) meʼyorlar', color: 'blue' },
        { t: 'box', id: 't', x: 52, y: 20, w: 44, h: 14, text: 'Tinish belgilari (punktuatsion)', color: 'orange' },
        { t: 'text', x: 4, y: 44, text: 'oʻtkazmoq — tadbir, majlis; oʻtqazmoq — koʻchat, daraxt', size: 's', color: 'green' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Yozma nutqning toʻgʻriligi uchun imlo va tinish belgilari meʼyorlariga ham amal qilinadi.',
    'Imlo qoidalari mutaxassislar tomonidan tuziladi, davlat tomonidan tasdiqlanadi va imlo lugʻatlarida aks etadi; ular savodxonlikning asosi.',
    'Tinish belgilari soʻz bilan koʻrsatib boʻlmaydigan fikriy munosabat, kayfiyat va ohangni ifodalaydi.'
  ],
  questions: [
    {
      id: 'oz5q1',
      prompt: 'Yozma nutqqa xos qaysi ikki meʼyor bor?',
      hint: 'Harflar va belgilar.',
      explanation: 'Imlo (orfografik) va tinish belgilari (punktuatsion) meʼyorlari.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['imlo va tinish belgilari', 'talaffuz va urgʻu', 'ohang va pauza', 'leksik va uslubiy'], answerIndex: 0 } }
    },
    {
      id: 'oz5q2',
      prompt: 'Gapni toʻgʻri feʼl bilan toʻldiring: «Bahorda bogʻlarda koʻchat … ishlari avj oldi.»',
      hint: 'Koʻchat yerga qadaladi.',
      explanation: 'Koʻchat «oʻtqaziladi»; tadbir esa «oʻtkaziladi».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻtqazish', 'oʻtkazish'], answerIndex: 0 } }
    },
    {
      id: 'oz5q3',
      prompt: 'Gapni toʻgʻri feʼl bilan toʻldiring: «Mahallada katta tadbir …»',
      hint: 'Tadbir tashkil etiladi.',
      explanation: 'Tadbir, majlis «oʻtkaziladi».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻtkazildi', 'oʻtqazildi'], answerIndex: 0 } }
    },
    {
      id: 'oz5q4',
      prompt: 'Imlo qoidalari qanday yuzaga keladi? Bosqichlarni tartiblang.',
      hint: 'Avval tuziladi, keyin tasdiqlanadi.',
      explanation: 'Mutaxassislar tuzadi → davlat organi tasdiqlaydi → imlo lugʻatlarida aks etadi.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'mutaxassislar qoida tuzadi' }, { label: 'davlat organi tasdiqlaydi' }, { label: 'imlo lugʻatlarida aks etadi' }] }
      }
    },
    {
      id: 'oz5q5',
      prompt: 'Tinish belgilari nimani ifodalashga yordam beradi?',
      hint: 'Harf bilan yozib boʻlmaydigan narsalar.',
      explanation: 'Fikriy munosabat, kayfiyat (psixologik holat) va ohangni.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ohang', correct: true },
            { label: 'kayfiyat, hayajon', correct: true },
            { label: 'fikriy munosabat', correct: true },
            { label: 'soʻzning tarjimasi' }
          ]
        }
      }
    },
    {
      id: 'oz5q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Imlo — savodxonlik asosi.',
      explanation: 'Imlo qoidalari savodxonlikning asosi; tinish belgilari gapning sintaktik qurilishi bilan bogʻliq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Imlo qoidalari savodxonlikning asosi hisoblanadi.', value: true },
            { text: 'Tinish belgilari gapning tuzilishi bilan bogʻliq.', value: true },
            { text: 'Imlo qoidalarini har kim oʻzicha belgilaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz5q7',
      prompt: '«Koʻz ilgʻamas» iborasi qaysi ikki maʼnoda keladi?',
      hint: 'Juda kichik yoki juda keng.',
      explanation: '1) bilinar-bilinmas, mayda; 2) cheksiz, oxiri koʻrinmaydigan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['mayda va cheksiz', 'tez va sekin', 'yorugʻ va qorongʻi', 'issiq va sovuq'], answerIndex: 0 } }
    }
  ]
};
