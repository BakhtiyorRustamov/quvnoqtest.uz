import type { BoardLesson } from './types';
import { OZG8 } from './ozbek-47';

/** Darslik: Adabiyot 11, I qism (2018), 158–161-betlar — Zahiriddin Muhammad Bobur: olimlar nigohida. */
export const OZ_53: BoardLesson = {
  n: 53,
  label: '53',
  group: OZG8,
  title: 'Zahiriddin Muhammad Bobur',
  section: 'Adabiyot, 1-qism: Zahiriddin Muhammad Bobur (1483–1530) — hayoti va merosi haqida fikrlar',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Zahiriddin Muhammad Bobur (1483–1530) — shoir, tarixchi, olim va davlat arbobi. Hind olimining yozishicha, Panipat jangidan keyin Bobur atigi uch yil-u sakkiz oy hukm surgan, ammo shu qisqa vaqtda tinchlik oʻrnatgan, mahalliy urf-odat va qonunlarni hisobga olgan. U yerli amirlarni ishga tortgan, Agra va Kobul oʻrtasidagi yoʻlni xavfsiz qilib, aloqani tiklagan, saroyda mazhab nizolariga yoʻl qoʻymagan. Ingliz olimi Denison Ross fikricha, Bobur turkiy sheʼriyatda Navoiydan keyingi oʻrinda turadi: u devon tuzgan, «Mubayyin»ni, aruz haqida risola yozgan, «Risolayi volidiya»ni tarjima qilgan. Uning eng mashhur asari — «Boburnoma» («Vaqoyeʼ»).",
      easy: "Bobur — shoir, olim va davlat arbobi. U «Boburnoma», devon va aruz haqida risola yozgan.",
      draw: [
        { t: 'title', text: 'Bobur merosi' },
        { t: 'table', x: 4, y: 18, rows: [['asar', 'yoʻnalishi'], ['«Boburnoma»', 'tarixiy-memuar nasr'], ['devon', 'gʻazal, ruboiy, tuyuq'], ['aruz risolasi', 'sheʼr nazariyasi']] },
        { t: 'text', x: 4, y: 46, text: 'Koʻpdin berikim, yor-u diyorim yoʻqdur,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 52, text: 'Bir lahza-yu bir nafas qarorim yoʻqdur.', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 58, text: 'Keldim bu sori oʻz ixtiyorim birla,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 64, text: 'Lekin borurimda ixtiyorim yoʻqdur.', size: 's', color: 'purple' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Bobur (1483–1530) — shoir, tarixchi, olim va davlat arbobi.',
    'Olimlar uning Hindistonda tinchlik oʻrnatgani, mahalliy urf-odatlarni hurmat qilgani va aloqalarni tiklaganini taʼkidlaydi.',
    'Merosi: «Boburnoma», devon, «Mubayyin», aruz risolasi va tarjimalar; turkiy sheʼriyatda Navoiydan keyingi oʻrinda.'
  ],
  questions: [
    {
      id: 'oz53q1',
      prompt: 'Bobur qaysi yillarda yashagan?',
      hint: 'Navoiy «Xamsa»ni yozgan yili tugʻilgan.',
      explanation: '1483–1530.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1483–1530', '1441–1501', '1640–1711', '1870–1910'], answerIndex: 0 } }
    },
    {
      id: 'oz53q2',
      prompt: 'Panipat jangidan keyin Bobur necha yil umr koʻrgan?',
      hint: 'Uch yil-u sakkiz oy.',
      explanation: 'Taxminan uch yil (uch yil-u sakkiz oy).',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'yil' } }
    },
    {
      id: 'oz53q3',
      prompt: 'Boburning Hindistondagi tadbirlarini belgilang.',
      hint: 'Tinchlik va aloqa.',
      explanation: 'Tinchlik oʻrnatgan, mahalliy qonunlarni hisobga olgan, yerli amirlarni ishga tortgan, Agra–Kobul yoʻlini tiklagan.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'mahalliy urf-odatlarni hisobga olgan', correct: true },
            { label: 'yerli amirlarni ishga tortgan', correct: true },
            { label: 'Agra–Kobul yoʻlini xavfsiz qilgan', correct: true },
            { label: 'saroyda mazhab nizolarini qoʻllagan' }
          ]
        }
      }
    },
    {
      id: 'oz53q4',
      prompt: 'Asarni yoʻnalishi bilan juftlang.',
      hint: '«Mubayyin» — huquq.',
      explanation: '«Boburnoma» — tarixiy-memuar asar; «Mubayyin» — nazmdagi huquqshunoslik asari; aruz risolasi — sheʼr nazariyasi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '«Boburnoma»', right: 'tarixiy-memuar asar' },
            { left: '«Mubayyin»', right: 'nazmdagi huquqshunoslik' },
            { left: 'aruz risolasi', right: 'sheʼr nazariyasi' }
          ]
        }
      }
    },
    {
      id: 'oz53q5',
      prompt: 'Denison Ross fikricha Bobur turkiy sheʼriyatda kimdan keyingi oʻrinda?',
      hint: 'Hirotlik buyuk shoir.',
      explanation: 'Alisher Navoiydan keyingi oʻrinda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Alisher Navoiy', 'Lutfiy', 'Mashrab', 'Rabgʻuziy'], answerIndex: 0 } }
    },
    {
      id: 'oz53q6',
      prompt: '«Boburnoma»ning boshqa nomi qaysi?',
      hint: 'Voqealar.',
      explanation: '«Vaqoyeʼ» yoki «Tarixi turkiy».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Vaqoyeʼ»', '«Xamsa»', '«Mezon ul-avzon»', '«Qutadgʻu bilig»'], answerIndex: 0 } }
    },
    {
      id: 'oz53q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Diniy masalalarga munosabat.',
      explanation: 'Bobur dindorlarni hurmat qilgan, ammo ularni siyosatga aralashtirmagan; musiqa va sanʼatni nozik idrok etgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bobur dindorlarni hurmat qilgan, lekin siyosiy ishlarga aralashtirmagan.', value: true },
            { text: 'Bobur musiqa va sanʼatni nozik idrok etgan.', value: true },
            { text: 'Bobur faqat forsiy tilda ijod qilgan.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz53q8',
      prompt: 'Ruboiyda «keldim» va «borurimda» soʻzlari qanday sanʼat hosil qiladi?',
      hint: 'Kelish — ketish.',
      explanation: 'Tazod: ixtiyor bilan kelgan, lekin qaytishda ixtiyori yoʻq — yurt sogʻinchi va taqdir oldidagi ojizlik.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tazod', 'tuyuq', 'takror', 'masnuʼ'], answerIndex: 0 } }
    }
  ]
};
