import type { BoardLesson } from './types';
import { OZG4 } from './ozbek-34';

/** Darslik: Ona tili 11, 2-qism (2020), 15-mavzu (55–58-betlar) — tasviriy ifoda: narsa nomining boʻyoqdor muqobili, publitsistikaga xosligi, omonimligi. */
export const OZ_36: BoardLesson = {
  n: 36,
  label: '36',
  group: OZG4,
  title: 'Tasviriy ifoda',
  section: 'Ona tili, 2-qism: 15-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Tasviriy ifoda — narsa nomining boʻyoqdor muqobili boʻlgan birikma. U tushunchani bildirishda soʻzga teng, lekin boʻyoqdorligi bilan farqlanadi. Tasviriy ifodalar uslubiy jihatdan chegaralangan, koʻproq publitsistikaga — gazeta va telekoʻrsatuvlarga xos. Ular takrordan qochishga yordam beradi: «kutubxona» oʻrniga «maʼrifat nurxonasi», «Yaponiya» oʻrniga «kunchiqar diyor». Tasviriy ifodaga omonimlik ham xos: «bahor elchisi» — qaldirgʻoch ham, boychechak ham.",
      easy: "Tasviriy ifoda — narsaning chiroyli nomi: kutubxona — maʼrifat nurxonasi.",
      draw: [
        { t: 'title', text: 'Tasviriy ifodalar' },
        { t: 'table', x: 4, y: 18, rows: [['tasviriy ifoda', 'nima?'], ['maʼrifat nurxonasi', 'kutubxona'], ['kunchiqar diyor', 'Yaponiya'], ['tinchlik elchilari', 'kabutarlar'], ['oynayi jahon', 'televizor'], ['gʻazal mulkining sultoni', 'Alisher Navoiy']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Tasviriy ifoda — narsa nomining boʻyoqdor muqobili: tushunchada soʻzga teng, boʻyoqdorlikda farqli.',
    'Tasviriy ifodalar koʻproq publitsistikaga xos va takrordan qochishga yordam beradi.',
    'Tasviriy ifodaga omonimlik xos: «bahor elchisi» — qaldirgʻoch ham, boychechak ham.'
  ],
  questions: [
    {
      id: 'oz36q1',
      prompt: 'Tasviriy ifodani nomi bilan juftlang.',
      hint: 'Kunchiqar diyor — Yaponiya.',
      explanation: 'Kunchiqar diyor — Yaponiya; maʼrifat nurxonasi — kutubxona; salomatlik posbonlari — shifokorlar; oynayi jahon — televizor.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'kunchiqar diyor', right: 'Yaponiya' },
            { left: 'maʼrifat nurxonasi', right: 'kutubxona' },
            { left: 'salomatlik posbonlari', right: 'shifokorlar' },
            { left: 'oynayi jahon', right: 'televizor' }
          ]
        }
      }
    },
    {
      id: 'oz36q2',
      prompt: 'Tasviriy ifodalar koʻproq qaysi uslubga xos?',
      hint: 'Gazeta.',
      explanation: 'Publitsistik uslubga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['publitsistik', 'rasmiy', 'ilmiy', 'idoraviy'], answerIndex: 0 } }
    },
    {
      id: 'oz36q3',
      prompt: '«Gʻazal mulkining sultoni» kim?',
      hint: '«Xamsa» muallifi.',
      explanation: 'Alisher Navoiy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Alisher Navoiy', 'Zahiriddin Bobur', 'Mahmud Koshgʻariy', 'Abdulla Qodiriy'], answerIndex: 0 } }
    },
    {
      id: 'oz36q4',
      prompt: '«Bahor elchisi» tasviriy ifodasi nimalarni bildirishi mumkin?',
      hint: 'Omonimlik.',
      explanation: 'Qaldirgʻoch ham, boychechak ham — tasviriy ifoda omonim boʻla oladi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'qaldirgʻoch', correct: true },
            { label: 'boychechak', correct: true },
            { label: 'qor' },
            { label: 'kuz yaprogʻi' }
          ]
        }
      }
    },
    {
      id: 'oz36q5',
      prompt: '«Oʻzbek romanchiligi maktabining asoschisi» kim?',
      hint: '«Oʻtkan kunlar».',
      explanation: 'Abdulla Qodiriy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Abdulla Qodiriy', 'Alisher Navoiy', 'Choʻlpon', 'Gʻafur Gʻulom'], answerIndex: 0 } }
    },
    {
      id: 'oz36q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Takrordan qochish.',
      explanation: 'Tasviriy ifoda takrordan qochishga yordam beradi va boʻyoqdorligi bilan soʻzdan farq qiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Tasviriy ifoda nutqda takrordan qochishga yordam beradi.', value: true },
            { text: 'Tasviriy ifoda boʻyoqdorligi bilan soʻzdan farqlanadi.', value: true },
            { text: 'Tasviriy ifodalar asosan rasmiy hujjatlarda ishlatiladi.', value: false }
          ]
        }
      }
    }
  ]
};
