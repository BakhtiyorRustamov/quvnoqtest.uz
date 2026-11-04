import type { BoardLesson } from './types';
import { BOB3 } from './biologiya-24';

/** Darslik: Biologiya 11, 32-§ (167–170-betlar) — noosfera tushunchasi (Lerua, Vernadskiy), noogenez bosqichlari, antropobiosfera, noogenika. */
export const BIO_32: BoardLesson = {
  n: 32,
  label: '32',
  group: BOB3,
  title: 'Biosfera evolutsiyasi. Noogenez',
  section: '32-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yerdagi barcha tirik mavjudotlardan faqat inson ong, tafakkur, ogʻzaki va yozma nutqqa ega. Inson tabiatda boʻlmagan madaniy oʻsimlik navlari va uy hayvonlari zotlarini yaratdi, daryolar oqimini burdi, shaharlar qurdi. Inson ongi bilan oʻzgartirilgan biosfera qobigʻi — noosfera.",
      easy: "Inson ongi bilan oʻzgartirilgan biosfera — noosfera.",
      draw: [
        { t: 'title', text: 'Ong qobigʻi' },
        { t: 'icon', x: 16, y: 40, emoji: '🧠', size: 'l' },
        { t: 'formula', x: 32, y: 30, text: 'noos — ong' },
        { t: 'formula', x: 32, y: 44, text: 'sphaira — shar' }
      ],
      next: 'Noosfera'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Noosfera atamasini fransuz matematigi Eduard Lerua taklif qilgan. Vernadskiy noosferani inson va tabiat munosabatlari ongli ravishda tartibga solinadigan, biosfera rivojlanishining oliy bosqichi deb taʼriflagan: unda insoniyatning ongli faoliyati asosiy harakatlantiruvchi kuchga aylanadi. Inson biosfera qonuniyatlarini tushunib, uning rivojlanishini ongli boshqarishi kerak.",
      easy: "Lerua — atama; Vernadskiy — biosferaning oliy bosqichi.",
      draw: [
        { t: 'title', text: 'Noosfera' },
        { t: 'table', x: 4, y: 20, rows: [['olim', 'hissasi'], ['Eduard Lerua', '«noosfera» atamasi'], ['V. I. Vernadskiy', 'biosferaning oliy bosqichi']] },
        { t: 'text', x: 4, y: 50, text: 'asosiy kuch — insoniyatning ongli faoliyati', size: 's', color: 'purple' }
      ],
      next: 'Noogenez'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Noogenez taxminan 50 ming yil avval antropogen omil paydo boʻlishi bilan boshlandi. Avval inson oddiy biologik tur edi, taʼsiri boshqa organizmlarnikidan farq qilmasdi. Keyin olov, ov va baliq ovlash, mehnat qurollari, dehqonchilik va chorvachilik, oʻtroq hayot atrof-muhitni oʻzgartiruvchi kuchga aylandi. XIX asrda koʻmir va neft, XX asrda ilmiy-texnik inqilob inson faoliyatini Yer qiyofasini oʻzgartiruvchi omilga aylantirdi.",
      easy: "50 ming yil: olov, dehqonchilik → XIX asr koʻmir, neft → XX asr texnika.",
      draw: [
        { t: 'title', text: 'Noogenez bosqichlari' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'olov, ov, terish', color: 'orange' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'dehqonchilik', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'koʻmir, neft', color: 'ink' },
        { t: 'box', id: 'd', x: 36, y: 44, w: 28, h: 10, text: 'XX asr texnika', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' }
      ],
      next: 'Antropobiosfera'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yer qobigʻida toʻplangan, avval aylanishga jalb etilmagan biogen moddalar — koʻmir, neft — inson tomonidan sunʼiy ravishda davriy aylanishga qoʻshildi. Natijada biosfera nafaqat tabiiy ekotizim, balki antropobiosferaga aylandi. Oqibatlari: oʻrmon, koʻl, botqoqlar buzilishi, koʻplab turlar yoʻqolishi, qazilmalar kamayishi, radioaktiv va zaharli ifloslanish — global ekologik inqiroz xavfi.",
      easy: "Inson qazilma moddalarni aylanishga qoʻshdi → antropobiosfera, ekologik inqiroz.",
      draw: [
        { t: 'title', text: 'Antropobiosfera' },
        { t: 'list', x: 4, y: 20, items: ['ekotizimlar buzilishi', 'turlar yoʻqolishi', 'qazilmalar kamayishi', 'radioaktiv, zaharli ifloslanish'] },
        { t: 'text', x: 4, y: 58, text: '→ global ekologik inqiroz xavfi', color: 'red' }
      ],
      next: 'Noogenika'
    },
    {
      kind: 'example',
      clear: true,
      say: "Kishilik jamiyati va tabiat oʻrtasidagi munosabatlarni oʻrganadigan fan — noogenika. Maqsadi — sayyoradagi hayotni saqlab qolish va kelajakni taʼminlash uchun bugunni rejalashtirish; vazifasi — inson va tabiat muvozanatini saqlash, texnika taraqqiyotining salbiy oqibatlari oldini olish. Noogenika yangi oʻsimlik navlari, hayvon zotlari va mikroorganizm shtammlarini yaratishga ham imkon beradi.",
      easy: "Noogenika — inson va tabiat muvozanatini saqlash fani.",
      draw: [
        { t: 'title', text: 'Noogenika' },
        { t: 'icon', x: 12, y: 40, emoji: '⚖️', size: 'l' },
        { t: 'list', x: 26, y: 22, items: ['maqsad — hayotni saqlash', 'vazifa — muvozanat', 'yangi navlar, zotlar'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Noosfera — inson ongi bilan oʻzgartirilgan biosfera qobigʻi; atamani E. Lerua kiritgan, Vernadskiy uni biosferaning oliy bosqichi deb taʼriflagan.',
    'Noogenez ≈ 50 ming yil avval boshlangan: olov va dehqonchilikdan XIX asr qazilma yoqilgʻi va XX asr ilmiy-texnik inqilobigacha.',
    'Biosfera antropobiosferaga aylandi; inson va tabiat munosabatini oʻrganuvchi fan — noogenika, vazifasi — muvozanatni saqlash.'
  ],
  questions: [
    {
      id: 'b32q1',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Noogenika — fan.',
      explanation: 'Noosfera — ong qobigʻi; noogenez — inson bilan bogʻliq bosqich; noogenika — inson va tabiat munosabati fani; antropobiosfera — inson oʻzgartirgan biosfera.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'noosfera', right: 'inson ongi shakllantirgan qobiq' },
            { left: 'noogenez', right: 'inson jamiyati bilan bogʻliq davr' },
            { left: 'noogenika', right: 'jamiyat va tabiat munosabati fani' },
            { left: 'antropobiosfera', right: 'inson aylanishni oʻzgartirgan biosfera' }
          ]
        }
      }
    },
    {
      id: 'b32q2',
      prompt: '«Noosfera» atamasini kim taklif qilgan?',
      hint: 'Fransuz matematigi.',
      explanation: 'Eduard Lerua.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Eduard Zyuss', 'Eduard Lerua', 'J. B. Lamark', 'Ch. Darvin'], answerIndex: 1 } }
    },
    {
      id: 'b32q3',
      prompt: 'Noogenez taxminan necha ming yil avval boshlangan?',
      hint: 'Darslikdagi raqam.',
      explanation: '≈ 50 ming yil avval.',
      widget: { type: 'number_answer', props: { answer: 50, tolerance: 10, unit: 'ming yil' } }
    },
    {
      id: 'b32q4',
      prompt: 'Inson taʼsiri bosqichlarini tartiblang.',
      hint: 'Olovdan boshlanadi.',
      explanation: 'Olov va ov → dehqonchilik, chorvachilik → XIX asr koʻmir, neft → XX asr ilmiy-texnik inqilob.',
      widget: { type: 'step_order', props: { steps: ['olov, ov va terimchilik', 'dehqonchilik va chorvachilik', 'koʻmir va neftdan foydalanish', 'ilmiy-texnik inqilob'] } }
    },
    {
      id: 'b32q5',
      prompt: 'Insonni boshqa tirik organizmlardan ajratadigan belgilarni tanlang.',
      hint: 'Aql bilan bogʻliq.',
      explanation: 'Ong, tafakkur, ogʻzaki va yozma nutq.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ong', correct: true },
            { label: 'tafakkur', correct: true },
            { label: 'yozma nutq', correct: true },
            { label: 'nafas olish' },
            { label: 'oziqlanish' }
          ]
        }
      }
    },
    {
      id: 'b32q6',
      prompt: 'Antropobiosferaga xos boʻlmagan holat qaysi?',
      hint: 'Uchtasi — salbiy oqibat.',
      explanation: 'Biologik xilma-xillik ortishi antropobiosferaga xos emas — aksincha, turlar yoʻqolmoqda.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'ekotizimlar buzilishi' }, { text: 'qazilmalar kamayishi' }, { text: 'turlar xilma-xilligi ortishi', odd: true }, { text: 'radioaktiv ifloslanish' }] } }
    },
    {
      id: 'b32q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Vernadskiy fikri.',
      explanation: 'Noosfera — biosfera rivojlanishining oliy bosqichi, unda insoniyatning ongli faoliyati asosiy kuchga aylanadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Noosfera — biosfera rivojlanishining ' }, { blank: 'oliy' }, { text: ' bosqichi, unda insoniyatning ' }, { blank: 'ongli' }, { text: ' faoliyati asosiy kuchga aylanadi.' }],
          bank: ['oliy', 'ongli', 'dastlabki', 'tasodifiy']
        }
      }
    },
    {
      id: 'b32q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Dastlab inson oddiy tur edi.',
      explanation: 'Dastlab inson taʼsiri boshqa organizmlarnikidan farq qilmagan; chuqur oʻzgarishlar XX asrda boshlangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Dastlab inson taʼsiri boshqa organizmlar taʼsiridan farq qilmagan.', value: true },
            { text: 'Biosferadagi chuqur oʻzgarishlar XX asrda boshlangan.', value: true },
            { text: 'Noogenika faqat tabiatni muhofaza qilish bilan shugʻullanadi.', value: false },
            { text: 'Koʻmir va neft doimo moddalar aylanishida qatnashgan.', value: false }
          ]
        }
      }
    }
  ]
};
