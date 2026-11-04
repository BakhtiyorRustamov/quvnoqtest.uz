import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 11–15-betlar — nutq odobi, allomalarning soʻz haqidagi fikrlari, «nutq madaniyati» terminining ikki maʼnosi. */
export const OZ_2: BoardLesson = {
  n: 2,
  label: '2',
  group: OZG1,
  title: 'Nutq madaniyati',
  section: 'Ona tili, 1-qism: «Nutq madaniyati»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Nutq madaniyati fikrni mustaqil, ravon, goʻzal va vaziyatga mos ifodalashdir; u nutq odobini ham oʻz ichiga oladi. Mahmud Koshgʻariy «Odobning boshi — til» degan maqolni qayd etgan, Yusuf Xos Hojib «Qutadgʻu bilig»da nutq odobi haqida hikmatlar aytgan, Navoiy esa bir gapni takrorlamay, loʻnda soʻzlashni fazilat deb bilgan. Termin ikki maʼnoda qoʻllanadi: tildan maqsad va vaziyatga mos foydalanish koʻnikmalari hamda shu qoidalarni oʻrganadigan tilshunoslik boʻlimi.",
      easy: "Nutq madaniyati — chiroyli, toʻgʻri va oʻrinli gapirish. U nutq odobini ham qamraydi.",
      draw: [
        { t: 'title', text: 'Nutq madaniyati' },
        { t: 'table', x: 4, y: 18, rows: [['kim', 'soʻz haqidagi fikri'], ['Mahmud Koshgʻariy', '«Odobning boshi — til»'], ['Yusuf Xos Hojib', 'nutq odobi — «til ardami»'], ['Alisher Navoiy', 'takrorsiz, loʻnda gapir']] },
        { t: 'text', x: 4, y: 50, text: 'Termin: 1) koʻnikmalar majmui; 2) tilshunoslik boʻlimi', size: 's', color: 'blue' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Nutq madaniyati — fikrni mustaqil, ravon, goʻzal va vaziyatga mos ifodalash; u nutq odobini ham qamraydi.',
    'Koshgʻariy, Yusuf Xos Hojib, Navoiy, keyinroq Behbudiy, Avloniy, Fitrat soʻz qadri va nutq odobi haqida fikr bildirgan.',
    '«Nutq madaniyati» termini koʻnikmalar majmuini ham, shu qoidalarni oʻrganuvchi tilshunoslik boʻlimini ham bildiradi.'
  ],
  questions: [
    {
      id: 'oz2q1',
      prompt: '«Odobning boshi — til» maqolini qaysi alloma qayd etgan?',
      hint: '«Devonu lugʻot at-turk» muallifi.',
      explanation: 'Mahmud Koshgʻariy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Mahmud Koshgʻariy', 'Alisher Navoiy', 'Abdulla Avloniy', 'Zahiriddin Bobur'], answerIndex: 0 } }
    },
    {
      id: 'oz2q2',
      prompt: 'Allomani asari bilan juftlang.',
      hint: '«Qutadgʻu bilig» — XI asr.',
      explanation: 'Yusuf Xos Hojib — «Qutadgʻu bilig»; Mahmud Koshgʻariy — «Devonu lugʻot at-turk»; Abdulla Avloniy — «Turkiy guliston yoxud axloq».',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Yusuf Xos Hojib', right: '«Qutadgʻu bilig»' },
            { left: 'Mahmud Koshgʻariy', right: '«Devonu lugʻot at-turk»' },
            { left: 'Abdulla Avloniy', right: '«Turkiy guliston yoxud axloq»' }
          ]
        }
      }
    },
    {
      id: 'oz2q3',
      prompt: 'Otaga hurmat bilan murojaat qilish uchun qaysi soʻzlar adabiy tilda qoʻllanadi?',
      hint: 'Ulugʻlash maʼnosidagi soʻzlar.',
      explanation: 'Otamiz, padarimiz, qiblagohimiz — hurmat ifodasi; «boboy» kabi soʻz otaga nisbatan odobdan tashqari.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'padarimiz', correct: true },
            { label: 'qiblagohimiz', correct: true },
            { label: 'otajon', correct: true },
            { label: 'boboy (otaga nisbatan)' }
          ]
        }
      }
    },
    {
      id: 'oz2q4',
      prompt: '«Nutq madaniyati» termini nechta maʼnoda qoʻllanadi?',
      hint: 'Koʻnikma va fan boʻlimi.',
      explanation: 'Ikki maʼnoda: koʻnikmalar majmui va tilshunoslik boʻlimi.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'ta' } }
    },
    {
      id: 'oz2q5',
      prompt: 'Navoiy nutqda nimani fazilat deb bilgan?',
      hint: 'Takror dilni ranjitadi.',
      explanation: 'Aniq va loʻnda gapirish, bir gapni qayta-qayta takrorlamaslik.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['aniq va loʻnda gapirishni', 'koʻp va uzun gapirishni', 'faqat sheʼr bilan gapirishni', 'baland ovozda gapirishni'], answerIndex: 0 } }
    },
    {
      id: 'oz2q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Madaniy nutq taʼsirli boʻladi.',
      explanation: 'Nutq madaniyati nutq odobini oʻz ichiga oladi va muloqot samarasi unga bogʻliq; tillarni aralashtirib gapirish madaniyatlilik belgisi emas.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Nutq madaniyati nutq odobini ham oʻz ichiga oladi.', value: true },
            { text: 'Muloqotning samarasi nutq madaniyatiga bogʻliq.', value: true },
            { text: 'Oʻzbekcha gapirib ruscha soʻz qoʻshish nutq madaniyati belgisi.', value: false },
            { text: 'Nutq odobi faqat yozma nutqqa tegishli.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz2q7',
      prompt: '«Jon kuydirmoq» iborasi nimani bildiradi?',
      hint: 'Kuchli gʻamxoʻrlik.',
      explanation: 'Ruhan bezovtalangan holda gʻamxoʻr boʻlmoq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kuchli gʻamxoʻrlik qilmoq', 'qattiq kuyib qolmoq', 'jahl qilmoq', 'befarq boʻlmoq'], answerIndex: 0 } }
    }
  ]
};
