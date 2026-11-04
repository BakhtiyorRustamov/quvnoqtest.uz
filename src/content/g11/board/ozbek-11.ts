import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 48–51-betlar — nutqning sofligi; sofligiga putur yetkazuvchi besh unsur. */
export const OZ_11: BoardLesson = {
  n: 11,
  label: '11',
  group: OZG1,
  title: 'Nutqning sofligi',
  section: 'Ona tili, 1-qism: «Nutqning sofligi»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Soflik — nutqning adabiy tilga va jamiyatdagi axloq qoidalariga yot unsurlardan xoli boʻlishi. Kishi nutqining sofligi uning madaniy saviyasini koʻrsatadi. Adabiy nutq sofligini besh xil unsur buzadi: sheva soʻzlari, oʻrinsiz chet soʻzlar — varvarizmlar, dagʻal va haqorat soʻzlar — vulgarizmlar, «ishlamaydigan» parazit soʻzlar hamda idoraviy qolip iboralar — kanselyarizmlar.",
      easy: "Sof nutq — sheva, keraksiz chet soʻz, dagʻal soʻz, «haligi, anaqa» kabi soʻzlarsiz nutq.",
      draw: [
        { t: 'title', text: 'Sof nutqqa yot unsurlar' },
        { t: 'table', x: 4, y: 18, rows: [['unsur', 'misol'], ['sheva soʻzi', 'buvak (chaqaloq oʻrniga)'], ['varvarizm', 'situatsiya, overtaym'], ['vulgarizm', 'dagʻal, haqorat soʻzlar'], ['parazit soʻz', 'haligi, anaqa, innaykeyin'], ['kanselyarizm', 'idoraviy qolip iboralar']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Soflik — nutqning adabiy til va axloq qoidalariga yot unsurlardan xoliligi.',
    'Sofligini buzuvchi unsurlar: sheva soʻzlari, varvarizmlar, vulgarizmlar, parazit soʻzlar, kanselyarizmlar.',
    'Parazit soʻzlar tinglovchi diqqatini chalgʻitadi; soʻz bilan ishlaydigan kishilar ulardan ayniqsa saqlanishi kerak.'
  ],
  questions: [
    {
      id: 'oz11q1',
      prompt: 'Soʻzlarni unsur turiga ajrating.',
      hint: '«Haligi» — parazit soʻz.',
      explanation: 'Varvarizm — situatsiya, overtaym, vunderkind; parazit soʻz — haligi, anaqa, innaykeyin.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'v', label: 'varvarizm' }, { id: 'p', label: 'parazit soʻz' }],
          items: [
            { emoji: '⚽', label: 'overtaym', bin: 'v' },
            { emoji: '📄', label: 'situatsiya', bin: 'v' },
            { emoji: '⭐', label: 'vunderkind', bin: 'v' },
            { emoji: '💬', label: 'haligi', bin: 'p' },
            { emoji: '🔄', label: 'anaqa', bin: 'p' },
            { emoji: '⏸️', label: 'innaykeyin', bin: 'p' }
          ]
        }
      }
    },
    {
      id: 'oz11q2',
      prompt: 'Atamani izohi bilan juftlang.',
      hint: 'Kanselyarizm — idora tili.',
      explanation: 'Varvarizm — oʻrinsiz chet soʻz; vulgarizm — dagʻal soʻz; kanselyarizm — idoraviy qolip ibora.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'varvarizm', right: 'oʻrinsiz chet soʻz' },
            { left: 'vulgarizm', right: 'dagʻal, haqorat soʻz' },
            { left: 'kanselyarizm', right: 'idoraviy qolip ibora' }
          ]
        }
      }
    },
    {
      id: 'oz11q3',
      prompt: 'Gapdagi varvarizmni oʻzbekcha muqobil bilan almashtiring: «Bu situatsiyada hamma ham bunday natijaga erisholmaydi.»',
      hint: 'Situatsiya — holat.',
      explanation: '«Vaziyat» yoki «holat» deyish kerak.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['vaziyatda', 'situatsiyonda', 'kontekstda', 'momentda'], answerIndex: 0 } }
    },
    {
      id: 'oz11q4',
      prompt: 'Nutq sofligiga putur yetkazuvchi unsurlar nechta?',
      hint: 'Sheva, chet soʻz, dagʻal soʻz, parazit, idoraviy.',
      explanation: '5 ta.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'ta' } }
    },
    {
      id: 'oz11q5',
      prompt: 'Parazit soʻzlar nima sababdan paydo boʻladi?',
      hint: 'Fikr quyilib kelmaganda.',
      explanation: 'Fikrni aniq tasavvur qilmaslik, fikr quyilib kelmaganda nutqdagi uzilishni «yopish» ehtiyojidan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['fikr quyilib kelmaganda uzilishni yopish uchun', 'nutqni boyitish uchun', 'qoidaga koʻra majburiy', 'chet tilni bilish uchun'], answerIndex: 0 } }
    },
    {
      id: 'oz11q6',
      prompt: 'Iborani maʼnosi bilan juftlang.',
      hint: 'Tinkasi qurimoq — holdan toymoq.',
      explanation: 'Soyasiga koʻrpacha solmoq — hurmatni meʼyoridan oshirmoq; tinkasi qurimoq — toliqmoq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'soyasiga koʻrpacha solmoq', right: 'hurmatni meʼyoridan oshirmoq' },
            { left: 'tinkasi qurimoq', right: 'qattiq toliqmoq' }
          ]
        }
      }
    },
    {
      id: 'oz11q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Parazit soʻzlar koʻproq ogʻzaki nutqda.',
      explanation: 'Parazit soʻzlar koʻproq ogʻzaki nutqda uchraydi va odatga aylanib qolishi mumkin; nutq sofligi madaniy saviyani koʻrsatadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Parazit soʻzlar koʻproq ogʻzaki nutqda uchraydi.', value: true },
            { text: 'Nutqning sofligi kishining madaniy saviyasini koʻrsatadi.', value: true },
            { text: 'Parazit soʻzlar tinglovchining diqqatini jamlashga yordam beradi.', value: false }
          ]
        }
      }
    }
  ]
};
