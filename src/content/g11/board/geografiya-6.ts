import type { BoardLesson } from './types';
import { GEO2 } from './geografiya-3';

/** Darslik: Geografiya 10, 6-§ (24–29-betlar) — geografik qobiqning tuzilish darajalari, xususiyatlari, bir butunlik, modda va energiyaning aylanma harakati, ritmiklik. */
export const GEO_6: BoardLesson = {
  n: 6,
  label: '6',
  group: GEO2,
  title: 'Geografik qobiq va uning umumiy qonuniyatlari',
  section: '6-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Geografik qobiq — sayyoramizda boshqa hech qayerda uchramaydigan tabiiy tizim. Faqat unda suv uch holatda — qattiq, suyuq va gaz holida uchraydi, tuproq hosil boʻladi, oʻsimlik va hayvonlar yashaydi, eng muhimi — inson jamiyati shu yerda paydo boʻlib rivojlanmoqda. Qobiqda uchta tuzilish darajasi ajratiladi. Eng soddasi — geokomponentlar: togʻ jinslari, tuproq, suv, havo, oʻsimlik va hayvonlar. Keyingisi — geosferalar: litosfera, gidrosfera, atmosfera va biosfera; ular qobiqning vertikal tuzilishini belgilaydi. Uchinchisi — geotizimlar, ular gorizontal tuzilishni ifodalaydi.",
      easy: "Geografik qobiq — hayot bor yagona qobiq; tuzilish darajalari: geokomponent → geosfera → geotizim.",
      draw: [
        { t: 'title', text: 'Tuzilish darajalari' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'geokomponentlar', color: 'green' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'geosferalar', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'geotizimlar', color: 'orange' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'geosferalar — vertikal, geotizimlar — gorizontal tuzilish', size: 's' }
      ],
      next: 'Qonuniyatlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Geografik qobiqning asosiy qonuniyatlari: bir butunlik, zonallik, azonallik, modda va energiyaning aylanma harakati va ritmiklik. Bir butunlik — komponentlar bir-biriga chambarchas bogʻliq, birining oʻzgarishi butun qobiqqa taʼsir qiladi. Masalan, muz bosish davrlarida okean sathi 100–110 m pasaygan, materiklar orasida «quruqlik koʻpriklari» paydo boʻlgan. Aylanma harakat — suv, havo va moddalarning toʻxtovsiz aylanishi qobiqning yaxlitligini taʼminlaydi. Ritmiklik — hodisalarning vaqti-vaqti bilan takrorlanishi: sutkalik ritm kun va tun almashinuvi bilan, yillik ritm yil fasllari bilan, Quyosh faolligi esa 11 yillik sikl bilan bogʻliq.",
      easy: "Qonuniyatlar: bir butunlik, zonallik, azonallik, aylanma harakat, ritmiklik (sutkalik, yillik, 11 yillik).",
      draw: [
        { t: 'title', text: 'Ritmiklik' },
        { t: 'table', x: 4, y: 18, rows: [['ritm', 'sababi'], ['sutkalik', 'kun va tun almashinuvi'], ['yillik (fasliy)', 'Quyosh atrofida aylanish'], ['11 yillik', 'Quyosh faolligi'], ['180–220 mln yillik', 'galaktika atrofida aylanish']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Geografik qobiq — suv uch holatda uchraydigan, tuproq va hayot mavjud yagona qobiq; unda geokomponentli, geosferali va geotizimli tuzilish darajalari bor.',
    'Bir butunlik qonuniyatiga koʻra komponentlar oʻzaro bogʻliq: birining oʻzgarishi butun qobiqqa taʼsir qiladi; modda va energiyaning aylanma harakati bu yaxlitlikni taʼminlaydi.',
    'Ritmiklik — hodisalarning muntazam takrorlanishi: sutkalik, yillik, asr ichidagi (Quyosh faolligi) va koʻp million yillik ritmlar.'
  ],
  questions: [
    {
      id: 'g6q1',
      prompt: 'Geografik qobiqning tuzilish darajalarini oddiydan murakkabga tartiblang.',
      hint: 'Eng oddiysi — geokomponent.',
      explanation: 'Geokomponentli → geosferali → geotizimli.',
      widget: { type: 'order_line', props: { items: [{ label: 'geokomponentli' }, { label: 'geosferali' }, { label: 'geotizimli' }] } }
    },
    {
      id: 'g6q2',
      prompt: 'Geografik qobiqning qonuniyatlarini tanlang.',
      hint: 'Beshta asosiy.',
      explanation: 'Bir butunlik, zonallik, azonallik, aylanma harakat, ritmiklik.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'bir butunlik', correct: true },
            { label: 'zonallik', correct: true },
            { label: 'ritmiklik', correct: true },
            { label: 'modda va energiyaning aylanma harakati', correct: true },
            { label: 'tasodifiylik' }
          ]
        }
      }
    },
    {
      id: 'g6q3',
      prompt: 'Ritmni uning sababi bilan juftlang.',
      hint: 'Sutkalik — Yerning oʻz oʻqi atrofida aylanishi.',
      explanation: 'Sutkalik — kun-tun almashinuvi; yillik — Quyosh atrofida aylanish; 11 yillik — Quyosh faolligi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'sutkalik ritm', right: 'kun va tun almashinuvi' },
            { left: 'yillik ritm', right: 'Quyosh atrofida aylanish' },
            { left: '11 yillik sikl', right: 'Quyosh faolligi' }
          ]
        }
      }
    },
    {
      id: 'g6q4',
      prompt: 'Muz bosish davrlarida Dunyo okeani sathi taxminan necha metr pasaygan?',
      hint: 'Yuzdan koʻp.',
      explanation: '100–110 m.',
      widget: { type: 'number_answer', props: { answer: 105, tolerance: 5, unit: 'm' } }
    },
    {
      id: 'g6q5',
      prompt: 'Faqat geografik qobiqqa xos boʻlgan xususiyatlarni tanlang.',
      hint: 'Hayot va tuproq.',
      explanation: 'Suvning uch holatda uchrashi, tuproq qoplami, hayot va inson jamiyati.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'suv uch holatda uchraydi', correct: true },
            { label: 'tuproq qoplami hosil boʻladi', correct: true },
            { label: 'hayot mavjud', correct: true },
            { label: 'harorat 4000° C dan yuqori' }
          ]
        }
      }
    },
    {
      id: 'g6q6',
      prompt: 'Qaysi geosfera yaxlit qobiq hosil qilmaydi, boshqa qobiqlar tutashgan joyda yupqa qatlam boʻladi?',
      hint: 'Tirik moddalar.',
      explanation: 'Biosfera.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['biosfera', 'atmosfera', 'litosfera', 'gidrosfera'], answerIndex: 0 } }
    },
    {
      id: 'g6q7',
      prompt: 'Moʻtadil kengliklarda yilda nechta fasl aniq ifodalangan?',
      hint: 'Bahor, yoz...',
      explanation: '4 ta.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'ta' } }
    },
    {
      id: 'g6q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ekvatorda — bitta fasl.',
      explanation: 'Ekvatorial kengliklarda yil boʻyi issiq va nam bitta fasl hukmron; subekvatorial kengliklarda quruq va nam fasllar bor.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ekvatorial kengliklarda yil boʻyi bitta fasl hukmron.', value: true },
            { text: 'Subekvatorial kengliklarda quruq va nam fasllar almashadi.', value: true },
            { text: 'Komponentlardan birining oʻzgarishi qolganlariga taʼsir qilmaydi.', value: false },
            { text: 'Ritmiklik faqat tirik organizmlarda kuzatiladi.', value: false }
          ]
        }
      }
    }
  ]
};
