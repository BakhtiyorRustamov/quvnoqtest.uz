import type { BoardLesson } from './types';
import { OZG1 } from './ozbek-1';

/** Darslik: Ona tili 11 (2018), 19–22-betlar — nutqning toʻgʻriligi, adabiy meʼyor turlari, badiiy maqsadda meʼyordan chekinish. */
export const OZ_4: BoardLesson = {
  n: 4,
  label: '4',
  group: OZG1,
  title: 'Nutqning toʻgʻriligi',
  section: 'Ona tili, 1-qism: «Nutqning toʻgʻriligi»',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Toʻgʻrilik — nutq madaniyatining markaziy masalasi va boshqa sifatlarning poydevori. Nutq amaldagi adabiy til meʼyorlariga toʻla mos boʻlsa, toʻgʻri hisoblanadi. Oʻzbek adabiy tilida olti xil meʼyor farqlanadi: leksik, talaffuz, soʻz yasalishi, morfologik, sintaktik va uslubiy meʼyorlar. Oddiy nutqda meʼyor buzilsa — xato, ammo badiiy asarda yozuvchi estetik maqsad bilan meʼyordan ataylab chekinishi mumkin.",
      easy: "Toʻgʻri nutq — adabiy til qoidalariga mos nutq. Meʼyorlar 6 xil. Yozuvchi ataylab chekinsa, bu badiiylik uchun.",
      draw: [
        { t: 'title', text: 'Adabiy til meʼyorlari' },
        { t: 'table', x: 4, y: 18, rows: [['meʼyor', 'nimaga tegishli'], ['leksik', 'soʻz tanlash, qoʻllash'], ['talaffuz', 'soʻzni toʻgʻri aytish'], ['soʻz yasalishi', 'yangi soʻz hosil qilish'], ['morfologik', 'qoʻshimchalar, shakllar'], ['sintaktik', 'soʻz va gap bogʻlanishi'], ['uslubiy', 'vaziyatga mos ifoda']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Toʻgʻrilik — nutq madaniyatining markaziy masalasi va boshqa sifatlarning poydevori.',
    'Toʻgʻri nutq adabiy til meʼyorlariga mos boʻladi: leksik, talaffuz, soʻz yasalishi, morfologik, sintaktik, uslubiy.',
    'Badiiy asarda meʼyordan chekinish estetik maqsadga xizmat qilsa, xato hisoblanmaydi.'
  ],
  questions: [
    {
      id: 'oz4q1',
      prompt: 'Nutq qachon toʻgʻri hisoblanadi?',
      hint: 'Meʼyor.',
      explanation: 'Tarkibi va qurilishi amaldagi adabiy til meʼyorlariga toʻla mos boʻlganda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['adabiy til meʼyorlariga mos boʻlganda', 'tez aytilganda', 'koʻp soʻz ishlatilganda', 'sheva soʻzlari koʻp boʻlganda'], answerIndex: 0 } }
    },
    {
      id: 'oz4q2',
      prompt: 'Adabiy til meʼyorlarini tanlang.',
      hint: 'Olti xil meʼyor.',
      explanation: 'Leksik, talaffuz, soʻz yasalishi, morfologik, sintaktik, uslubiy. «Musiqiy» va «geografik» meʼyor yoʻq.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'leksik', correct: true },
            { label: 'morfologik', correct: true },
            { label: 'uslubiy', correct: true },
            { label: 'talaffuz', correct: true },
            { label: 'musiqiy' },
            { label: 'geografik' }
          ]
        }
      }
    },
    {
      id: 'oz4q3',
      prompt: 'Meʼyorni nimaga tegishli ekani bilan juftlang.',
      hint: 'Morfologik — qoʻshimchalar.',
      explanation: 'Leksik — soʻz qoʻllash; morfologik — qoʻshimcha va shakllar; sintaktik — soʻz va gaplarning bogʻlanishi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'leksik meʼyor', right: 'soʻz qoʻllash' },
            { left: 'morfologik meʼyor', right: 'qoʻshimcha va shakllar' },
            { left: 'sintaktik meʼyor', right: 'soʻz va gap bogʻlanishi' }
          ]
        }
      }
    },
    {
      id: 'oz4q4',
      prompt: 'Nega toʻgʻrilik boshqa sifatlarning poydevori deyiladi?',
      hint: 'Toʻgʻri boʻlmagan nutq…',
      explanation: 'Toʻgʻri boʻlmagan nutqning aniqligi, mantiqiyligi yoki boyligi haqida gapirib boʻlmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['notoʻgʻri nutqda boshqa sifatlar yuzaga kelmaydi', 'u eng oson sifat', 'faqat yozma nutqqa tegishli', 'u faqat maktabda kerak'], answerIndex: 0 } }
    },
    {
      id: 'oz4q5',
      prompt: '«Fuqaro» soʻzi haqidagi gaplarning qaysisi toʻgʻri?',
      hint: 'Arabcha «faqir» soʻzidan.',
      explanation: '«Fuqaro» arabcha «faqir» soʻzining koʻplik shakli; oʻzbek tilida «davlat aʼzosi» maʼnosini olgan va mustaqillikdan keyin atama boʻldi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['arabcha «faqir»ning koʻplik shakli, atama sifatida qabul qilingan', 'lotincha soʻz', 'yangi yasalgan oʻzbekcha soʻz', 'faqat sheʼriyatda ishlatiladi'], answerIndex: 0 } }
    },
    {
      id: 'oz4q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Badiiy asarda chekinish mumkin.',
      explanation: 'Yozuvchi estetik maqsadda meʼyordan chekinishi mumkin; oddiy nutqda esa meʼyor buzilishi xato.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Badiiy asarda meʼyordan ataylab chekinish badiiylikka xizmat qilishi mumkin.', value: true },
            { text: 'Oddiy nutqda meʼyorning buzilishi nutqni notoʻgʻri qiladi.', value: true },
            { text: 'Toʻgʻrilik — nutq madaniyatining eng oliy, soʻnggi bosqichi.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz4q7',
      prompt: '«Kayfi buzuq» iborasining maʼnosi qaysi?',
      hint: 'Kayfiyat.',
      explanation: 'Kayfiyati yomon, xafa.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kayfiyati yomon', 'kasal', 'charchagan', 'xursand'], answerIndex: 0 } }
    }
  ]
};
