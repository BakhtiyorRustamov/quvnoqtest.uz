import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 60–64-betlar — nutq boyligini taʼminlovchi vositalar: soʻz zaxirasi, maʼnodoshlik, gap qoliplari; badiiy takror. */
export const OZ_14: BoardLesson = {
  n: 14,
  label: '14',
  group: OZG1,
  title: 'Nutq boyligini taʼminlovchi vositalar',
  section: 'Ona tili, 1-qism: «Nutqning boyligini taʼminlovchi vositalar»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Nutqni leksik, semantik, grammatik va intonatsion vositalar boyitadi. Avvalo soʻz zaxirasi boy boʻlishi kerak: mutaxassislar Navoiy asarlarida 26 mingdan, Pushkinda 21 mingdan ortiq soʻz borligini taʼkidlaydi. Takrordan qochishning eng qulay yoʻli — maʼnodoshlik; u soʻzlarda ham, qoʻshimcha va gaplarda ham bor. Gap qoliplari ham xilma-xil boʻlishi kerak. Biroq badiiy va publitsistik nutqda ataylab, taʼkid yoki ohang uchun qilingan takror nutqni kambagʻallashtirmaydi.",
      easy: "Nutqni boyitadi: soʻz zaxirasi, maʼnodosh soʻzlar, turli gap qoliplari. Sheʼrdagi ataylab takror — xato emas.",
      draw: [
        { t: 'title', text: 'Nutqni nima boyitadi?' },
        { t: 'list', x: 4, y: 18, items: ['keng soʻz zaxirasi', 'maʼnodosh soʻz va iboralar', 'grammatik maʼnodoshlik', 'turli gap qoliplari', 'ohang (intonatsiya)'] },
        { t: 'bars', x: 56, y: 20, w: 40, h: 34, items: [{ label: 'Navoiy', value: 26 }, { label: 'Pushkin', value: 21 }] },
        { t: 'text', x: 56, y: 62, text: 'soʻz boyligi, ming', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Nutq boyligini leksik, semantik, grammatik va intonatsion vositalar taʼminlaydi.',
    'Takrordan qochishning eng qulay yoʻli — maʼnodoshlik; gap qoliplari ham xilma-xil boʻlishi kerak.',
    'Badiiy nutqda taʼkid va ohang uchun qilingan ataylab takror nutq kambagʻalligi hisoblanmaydi.'
  ],
  questions: [
    {
      id: 'oz14q1',
      prompt: 'Mutaxassislar fikricha, Alisher Navoiyning soʻz boyligi qancha?',
      hint: 'Pushkindan koʻproq.',
      explanation: '26 mingdan ortiq soʻz.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['26 mingdan ortiq', '2 ming', '5 ming', '100 ming'], answerIndex: 0 } }
    },
    {
      id: 'oz14q2',
      prompt: 'Matnda soʻz takroridan qochishning eng qulay yoʻli qaysi?',
      hint: 'Bir xil maʼnoli boshqa soʻz.',
      explanation: 'Maʼnodosh birlik bilan almashtirish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['maʼnodosh soʻz bilan almashtirish', 'soʻzni qisqartirish', 'chet soʻz qoʻyish', 'soʻzni tashlab ketish'], answerIndex: 0 } }
    },
    {
      id: 'oz14q3',
      prompt: 'Takror turini ajrating.',
      hint: 'Sheʼrdagi takror — ataylab.',
      explanation: 'Sheʼrda bir soʻz bilan qatorlarni boshlash — taʼkid uchun ataylab takror; hikoyada «kapalak» soʻzini 7 marta qaytarish — kambagʻal takror.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'b', label: 'badiiy (ataylab)' }, { id: 'k', label: 'kambagʻal takror' }],
          items: [
            { emoji: '🎵', label: 'sheʼrda «Yurt bu kun…» bilan qatorlar boshlanishi', bin: 'b' },
            { emoji: '🌊', label: '«Shagʻirlaydi…» soʻzi bilan boshlangan sheʼriy qatorlar', bin: 'b' },
            { emoji: '🦋', label: 'qisqa hikoyada «kapalak» soʻzi 7 marta', bin: 'k' },
            { emoji: '🔁', label: '«bor kuchi bilan» birikmasi ketma-ket 3 marta', bin: 'k' }
          ]
        }
      }
    },
    {
      id: 'oz14q4',
      prompt: 'Nutq boyligini taʼminlovchi vositalarni tanlang.',
      hint: 'Leksik, grammatik, intonatsion.',
      explanation: 'Maʼnodoshlik, turli gap qoliplari, ohang; parazit soʻzlar esa nutqni buzadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'maʼnodosh soʻzlar', correct: true },
            { label: 'turli gap qoliplari', correct: true },
            { label: 'ohang', correct: true },
            { label: 'parazit soʻzlar' }
          ]
        }
      }
    },
    {
      id: 'oz14q5',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Esi chiqib ketmoq — qoʻrqmoq.',
      explanation: 'Esi chiqib ketmoq — juda qattiq qoʻrqmoq; yuzidan oʻta olmaslik — birovning xohishi bilan hisoblashmoq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'esi chiqib ketmoq', right: 'juda qattiq qoʻrqmoq' },
            { left: 'yuzidan oʻta olmaslik', right: 'birovning xohishi bilan hisoblashmoq' }
          ]
        }
      }
    },
    {
      id: 'oz14q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Maʼnodoshlik faqat soʻzda emas.',
      explanation: 'Maʼnodoshlik soʻzlarda ham, morfologik va sintaktik birliklarda ham bor; ilmiy matnda badiiy tasvir oʻrniga aniq taʼrif beriladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Maʼnodoshlik qoʻshimcha va gaplar doirasida ham uchraydi.', value: true },
            { text: 'Badiiy nutqda takror taʼkid va ohangdorlik uchun ishlatilishi mumkin.', value: true },
            { text: 'Ataylab qilingan har qanday takror nutq xatosi hisoblanadi.', value: false }
          ]
        }
      }
    }
  ]
};
