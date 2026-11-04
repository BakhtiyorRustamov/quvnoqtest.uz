import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 65–68-betlar — nutqning joʻyaliligi: mazmun, tinglovchi, vaziyatga moslik; «Qobusnoma»dagi oʻgit. */
export const OZ_15: BoardLesson = {
  n: 15,
  label: '15',
  group: OZG1,
  title: 'Nutqning joʻyaliligi',
  section: 'Ona tili, 1-qism: «Nutqning joʻyaliligi»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Joʻyalilik — nutqning oʻz oʻrnini topishi: u mazmunga, tinglovchining yoshi va maqomiga, nutqning yozma yoki ogʻzaki ekaniga va vaziyatga toʻla mos boʻlishi kerak. «Qobusnoma»da ham yaxshi soʻz ham oʻrinsiz aytilsa yomon eshitiladi, deyiladi. Masalan, taʼziya bildirganda «oʻldi» emas, «vafot etdi», «olamdan oʻtdi» deyiladi. Tarbiyachi bogʻcha bolasiga «minnatdorchilik bildirmaydi», balki uni «ragʻbatlantiradi».",
      easy: "Joʻyali nutq — kimga, qayerda, qachon gapirayotganingizga mos nutq.",
      draw: [
        { t: 'title', text: 'Oʻrnini topib gapir' },
        { t: 'table', x: 4, y: 18, rows: [['vaziyat', 'joʻyali ifoda'], ['taʼziya bildirish', 'vafot etdi, olamdan oʻtdi'], ['tarbiyachi va bola', 'ragʻbatlantirdi'], ['katta yoshli bilan', 'hurmat, iltimos ohangi']] },
        { t: 'text', x: 4, y: 50, text: 'Oʻrinli soʻzga tuya choʻkadi.', size: 's', color: 'purple' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Joʻyalilik — nutqning mazmun, tinglovchi (yoshi, maqomi), nutq shakli va vaziyatga toʻla mosligi.',
    'Bir maʼnoni bildiruvchi soʻzlardan vaziyatga eng mosi tanlanadi: taʼziyada «vafot etdi», «olamdan oʻtdi».',
    'Yaxshi soʻz ham oʻrinsiz aytilsa, yomon eshitiladi.'
  ],
  questions: [
    {
      id: 'oz15q1',
      prompt: 'Taʼziya bildirganda qaysi ifoda joʻyali?',
      hint: 'Yumshoq muqobil.',
      explanation: '«Olamdan oʻtdi», «vafot etdi» — vaziyatga mos; «oʻldi» — qoʻpol eshitiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['olamdan oʻtdi', 'oʻldi', 'tugadi', 'yoʻq boʻldi'], answerIndex: 0 } }
    },
    {
      id: 'oz15q2',
      prompt: 'Gapni joʻyali soʻz bilan toʻldiring: «Tarbiyachi bolalarni oʻz oldiga chaqirib …»',
      hint: 'Kattadan kichikka.',
      explanation: '«Ragʻbatlantirdi» — yosh va maqom farqiga mos; «minnatdorchilik bildirdi» kichikdan kattaga yoki tengdoshga aytiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ragʻbatlantirdi', 'minnatdorchilik bildirdi', 'tashakkurnoma topshirdi'], answerIndex: 0 } }
    },
    {
      id: 'oz15q3',
      prompt: 'Joʻyalilik uchun nimalar hisobga olinadi?',
      hint: 'Kim, qayerda, qanday.',
      explanation: 'Axborot mazmuni, tinglovchining yoshi va maqomi, yozma yoki ogʻzakiligi, nutq vaziyati.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tinglovchining yoshi', correct: true },
            { label: 'tinglovchining maqomi', correct: true },
            { label: 'nutq vaziyati', correct: true },
            { label: 'soʻzlovchining kiyimi' }
          ]
        }
      }
    },
    {
      id: 'oz15q4',
      prompt: '«Omon boʻlsak, albatta, koʻrishamiz!» iborasi kimning nutqiga mos?',
      hint: 'Bolaga xos emas.',
      explanation: 'Kattalar, keksalar nutqiga; kichkintoy aytsa, joʻyasiz eshitiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['keksalar nutqiga', 'bogʻcha bolasi nutqiga', 'hamma uchun bir xil', 'faqat rasmiy hujjatga'], answerIndex: 0 } }
    },
    {
      id: 'oz15q5',
      prompt: '«Qobusnoma»dagi qaysi fikr joʻyalilik haqida?',
      hint: 'Oʻrin.',
      explanation: 'Yaxshi soʻz ham oʻrinsiz ishlatilsa, yomon va nobop eshitiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yaxshi soʻz ham oʻrinsiz aytilsa, yomon eshitiladi', 'koʻp gapirgan donodir', 'soʻzni takrorlash foydali', 'sheʼr bilan gapirish shart'], answerIndex: 0 } }
    },
    {
      id: 'oz15q6',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Yuragini yormoq — ikki maʼno.',
      explanation: 'Yuragini yormoq (I) — qattiq qoʻrqitmoq; koʻnglini yormoq — dardini aytmoq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'yuragini yormoq (I)', right: 'qattiq choʻchitmoq' },
            { left: 'koʻnglini yormoq', right: 'ichidagi dardini aytmoq' }
          ]
        }
      }
    },
    {
      id: 'oz15q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Maqollar.',
      explanation: '«Joʻyali soʻz joʻyasin topar» — oʻrinli soʻz maqsadga yetadi; kattalarga buyruq ohangida gapirish joʻyasiz.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Joʻyali soʻz joʻyasin topar» maqoli oʻrinli gapirish haqida.', value: true },
            { text: 'Kattalarga buyruq ohangida gapirish joʻyali hisoblanadi.', value: false },
            { text: 'Bir xil maʼnoli soʻzlardan vaziyatga mosi tanlanadi.', value: true }
          ]
        }
      }
    }
  ]
};
