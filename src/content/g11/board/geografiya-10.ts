import type { BoardLesson } from './types';

export const GEO3 = { kicker: '3-bob', title: 'Jamiyat va tabiat' };

/** Darslik: Geografiya 10, 10-§ (40–45-betlar) — tabiiy, geografik, texnogen va atrof-muhit tushunchalari; jamiyat va tabiat munosabatlarining besh bosqichi. */
export const GEO_10: BoardLesson = {
  n: 10,
  label: '10',
  group: GEO3,
  title: 'Jamiyat va tabiat oʻrtasidagi munosabatlar',
  section: '10-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Inson hayoti uchun kerak boʻlgan hamma narsani tabiatdan oladi. Bu munosabatlarni tushunish uchun bir nechta tushuncha qoʻllaniladi. Tabiiy muhit — insonni oʻrab turgan tabiiy sharoit. Geografik muhit — tabiatning jamiyat bilan oʻzaro taʼsirdagi qismi; jamiyat rivojlangan sari u kengayib boradi. Texnogen muhit — inson yaratgan obyektlar: binolar, yoʻllar, zavodlar. Atrof-muhit esa tabiiy va texnogen muhitni birga qamrab oladigan yashash va mehnat sharoitidir.",
      easy: "Tabiiy muhit, geografik muhit, texnogen muhit (inson yaratgan) va atrof-muhit (hammasi birga).",
      draw: [
        { t: 'title', text: 'Muhit turlari' },
        { t: 'table', x: 4, y: 18, rows: [['tushuncha', 'maʼnosi'], ['tabiiy muhit', 'oʻrab turgan tabiiy sharoit'], ['geografik muhit', 'jamiyat bilan taʼsirdagi tabiat'], ['texnogen muhit', 'inson yaratgan obyektlar'], ['atrof-muhit', 'tabiiy + texnogen muhit']] }
      ],
      next: 'Besh bosqich'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Jamiyatning tabiatga taʼsiri besh bosqichda kuchayib borgan. Ibtidoiy jamoa davrida inson terimchilik va ovchilik bilan yashab, tabiatga moslashgan, uni oʻzgartirmagan. Qishloq xoʻjaligi inqilobi 6–8 ming yil oldin boshlangan: odamlar dehqonchilik va chorvachilikka oʻtib, oʻtroq yashay boshlagan. XVIII asrdan sanoat inqilobi davrida tabiat boyliklaridan ayovsiz foydalanilgan, inson eng kuchli «geologik kuch»ga aylangan. XX asrning ikkinchi yarmidan fan-texnika inqilobi davrida tabiatga taʼsir eng kuchli boʻldi, global ekologik muammolar paydo boʻldi, ayni paytda ekologik qonunlar qabul qilindi. Beshinchi — ekologik munosabatlar davrida toza atrof-muhit iqtisodiy oʻsish bilan teng qadrlanadi.",
      easy: "Ibtidoiy jamoa → qishloq xoʻjaligi inqilobi → sanoat inqilobi → fan-texnika inqilobi → ekologik munosabatlar.",
      draw: [
        { t: 'title', text: 'Tabiatga taʼsir bosqichlari' },
        { t: 'bars', x: 6, y: 18, w: 70, h: 34, items: [{ label: 'ibtidoiy', value: 1 }, { label: 'qishloq x.', value: 2 }, { label: 'sanoat', value: 3 }, { label: 'fan-texnika', value: 5 }] },
        { t: 'text', x: 80, y: 30, text: 'taʼsir', size: 's' },
        { t: 'text', x: 80, y: 38, text: 'kuchi', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Jamiyat va tabiat munosabatlarini tushunishda tabiiy muhit, geografik muhit, texnogen muhit va atrof-muhit tushunchalari qoʻllaniladi.',
    'Ibtidoiy davrda inson tabiatga moslashgan; qishloq xoʻjaligi inqilobidan (6–8 ming yil oldin) keyin taʼsir kuchaya boshlagan, sanoat inqilobi (XVIII asr) tabiatdan ayovsiz foydalanishga olib kelgan.',
    'Fan-texnika inqilobi davrida taʼsir eng kuchli boʻlib, global muammolar paydo boʻldi; ekologik munosabatlar davrida jamiyat va tabiatning uygʻun rivojlanishi maqsad qilinadi.'
  ],
  questions: [
    {
      id: 'g10q1',
      prompt: 'Jamiyat va tabiat munosabatlari bosqichlarini tartiblang.',
      hint: 'Ibtidoiy — birinchi.',
      explanation: 'Ibtidoiy jamoa → qishloq xoʻjaligi inqilobi → sanoat inqilobi → fan-texnika inqilobi → ekologik munosabatlar.',
      widget: { type: 'order_line', props: { items: [{ label: 'ibtidoiy jamoa' }, { label: 'qishloq xoʻjaligi inqilobi' }, { label: 'sanoat inqilobi' }, { label: 'fan-texnika inqilobi' }, { label: 'ekologik munosabatlar' }] } }
    },
    {
      id: 'g10q2',
      prompt: 'Qaysi bosqichda inson tabiatni oʻzgartirmay, unga moslashib yashagan?',
      hint: 'Terimchilik va ovchilik.',
      explanation: 'Ibtidoiy jamoa davrida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ibtidoiy jamoa davri', 'sanoat inqilobi', 'fan-texnika inqilobi', 'qishloq xoʻjaligi inqilobi'], answerIndex: 0 } }
    },
    {
      id: 'g10q3',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Texnogen — inson yaratgan.',
      explanation: 'Texnogen muhit — inson yaratgan obyektlar; geografik muhit — jamiyat bilan taʼsirdagi tabiat; atrof-muhit — tabiiy va texnogen muhit birga.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'texnogen muhit', right: 'inson yaratgan obyektlar' },
            { left: 'geografik muhit', right: 'jamiyat bilan taʼsirdagi tabiat' },
            { left: 'atrof-muhit', right: 'tabiiy va texnogen muhit birga' }
          ]
        }
      }
    },
    {
      id: 'g10q4',
      prompt: 'Qishloq xoʻjaligi inqilobi taxminan necha ming yil oldin boshlangan?',
      hint: '6–8 ming yil.',
      explanation: '6–8 ming yil oldin.',
      widget: { type: 'number_answer', props: { answer: 7, tolerance: 1, unit: 'ming yil' } }
    },
    {
      id: 'g10q5',
      prompt: 'Belgini bosqichga ajrating.',
      hint: 'Olov — ibtidoiy davr.',
      explanation: 'Ibtidoiy davr — olov kashfiyoti, ovchilik; qishloq xoʻjaligi inqilobi — dehqonchilik, ilk shaharlar; sanoat inqilobi — bugʻ mashinasi, resurslarning ayovsiz qazib olinishi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'i', label: 'ibtidoiy davr' }, { id: 'q', label: 'qishloq xoʻjaligi inqilobi' }, { id: 's', label: 'sanoat inqilobi' }],
          items: [
            { emoji: '🔥', label: 'olovning kashf etilishi', bin: 'i' },
            { emoji: '🏹', label: 'ovchilik va terimchilik', bin: 'i' },
            { emoji: '🌾', label: 'dehqonchilikka oʻtish', bin: 'q' },
            { emoji: '🏘️', label: 'ilk shaharlar', bin: 'q' },
            { emoji: '⚙️', label: 'bugʻ mashinasi', bin: 's' },
            { emoji: '⛏️', label: 'resurslarni ayovsiz qazish', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'g10q6',
      prompt: 'Fan-texnika inqilobi davrining belgilarini tanlang.',
      hint: 'XX asrning 2-yarmi.',
      explanation: 'Kosmosni oʻzlashtirish, global ekologik muammolar, ekologik qonunlar va tashkilotlar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'kosmosni oʻzlashtirish', correct: true },
            { label: 'global ekologik muammolar', correct: true },
            { label: 'ekologik qonunlar qabul qilinishi', correct: true },
            { label: 'olovning kashf etilishi' }
          ]
        }
      }
    },
    {
      id: 'g10q7',
      prompt: 'Ekologik munosabatlar davrining asosiy gʻoyasi nima?',
      hint: 'Ikki narsa teng.',
      explanation: 'Toza atrof-muhit iqtisodiy oʻsish bilan teng darajada qadrlanadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['toza muhit iqtisodiy oʻsish bilan teng qadrlanadi', 'tabiatdan cheksiz foydalanish', 'sanoatni butunlay toʻxtatish', 'faqat ovchilik bilan yashash'], answerIndex: 0 } }
    },
    {
      id: 'g10q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oʻzbekistonda ilk ariqlar — er. avv. II asr.',
      explanation: 'Oʻzbekiston hududida ilk ariqlar er. avv. II asrda qazilgan; sanoat inqilobi davrida inson «geologik kuch»ga aylangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻzbekiston hududida dastlabki ariqlar eramizdan avvalgi II asrda qazilgan.', value: true },
            { text: 'Sanoat inqilobi davrida inson eng kuchli «geologik kuch»ga aylangan.', value: true },
            { text: 'Fan-texnika inqilobi eng uzoq davom etgan bosqichdir.', value: false },
            { text: 'Texnogen muhit faqat tabiiy obyektlardan iborat.', value: false }
          ]
        }
      }
    }
  ]
};
