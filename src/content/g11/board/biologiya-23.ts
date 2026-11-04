import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 23-§ (126–131-betlar) — inson ekologiyasi (antropoekologiya), insonning ekologik omil sifatida oʻziga xosligi, salomatlikka taʼsir etuvchi omillar, ovqatlanish, adaptiv tiplar, shahar va qishloq ekosistemalari. */
export const BIO_23: BoardLesson = {
  n: 23,
  label: '23',
  group: BOB2,
  title: 'Inson ekologiyasi',
  section: '23-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Inson ham ekologik omillar taʼsirida yashaydi: issiq-sovuq, havo, suv, ovqat. Lekin u boshqa tirik mavjudotlardan farqli ravishda oʻzi ham tabiatni ongli ravishda oʻzgartiradi. Inson va muhit munosabatlarini 1920-yillarda paydo boʻlgan fan — inson ekologiyasi yoki antropoekologiya oʻrganadi.",
      easy: "Antropoekologiya — inson va muhit munosabatlari haqidagi fan.",
      draw: [
        { t: 'title', text: 'Inson ekologiyasi' },
        { t: 'icon', x: 16, y: 40, emoji: '🧑', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['antropoekologiya', '1920-yillarda paydo boʻlgan', 'inson ↔ muhit'] }
      ],
      next: 'Oʻziga xoslik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Insonning ekologik omil sifatida uch xususiyati bor. Birinchi — tabiatga maqsadli va ongli taʼsir qiladi. Ikkinchi — boshqa turlarning energiya manbayi cheklangan, inson esa juda kuchli manbalar yaratadi: issiqlik, elektr va atom stansiyalari. Uchinchi — faoliyati ijodiy: u oʻziga sunʼiy muhit yaratadi.",
      easy: "Inson — ongli, kuchli energiya manbalari, sunʼiy muhit yaratadi.",
      draw: [
        { t: 'title', text: 'Inson — alohida omil' },
        { t: 'list', x: 4, y: 20, items: ['1) ongli, maqsadli taʼsir', '2) kuchli energiya manbalari', '3) sunʼiy muhit yaratadi'] },
        { t: 'icon', x: 70, y: 40, emoji: '⚡', size: 'l' }
      ],
      next: 'Salomatlik omillari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Salomatlikka toʻrt guruh omil taʼsir qiladi. Fizik — harorat, namlik, bosim, radiatsiya, shovqin, elektromagnit maydon. Kimyoviy — suv va tuproq tarkibi, toksinlar, zaharli gazlar, neft mahsulotlari. Biologik — kasallik qoʻzgʻatuvchilar, parazitlar, zaharli oʻsimliklar. Ijtimoiy — uy-joy, oilaviy muhit, ovqat, mehnat va dam olish tartibi.",
      easy: "Fizik, kimyoviy, biologik, ijtimoiy omillar.",
      draw: [
        { t: 'title', text: 'Salomatlik omillari' },
        { t: 'table', x: 4, y: 20, rows: [['omil', 'misol'], ['fizik', 'shovqin, radiatsiya'], ['kimyoviy', 'zaharli gazlar'], ['biologik', 'parazitlar'], ['ijtimoiy', 'mehnat va dam olish']] }
      ],
      next: 'Ovqat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ovqat — eng muhim omillardan biri. Inson sutkasiga kamida 2500 kilokaloriya energiya oladi: uglevod, yogʻ va oqsillardan. Ovqatda vitaminlar va minerallar ham yetarli boʻlishi kerak. Markaziy Osiyo kabi okeandan uzoq hududlarda suv va ovqatda yod kam — qalqonsimon bez faoliyati buziladi, shuning uchun osh tuziga yod qoʻshiladi.",
      easy: "Sutkasiga ≥ 2500 kkal; yod yetishmasligi — yodlangan tuz.",
      draw: [
        { t: 'title', text: 'Ovqatlanish' },
        { t: 'formula', x: 4, y: 24, text: '≥ 2500 kkal / sutka' },
        { t: 'list', x: 4, y: 34, items: ['oqsil, yogʻ, uglevod', 'vitaminlar, minerallar', 'yod — yodlangan osh tuzi'] }
      ],
      next: 'Adaptiv tiplar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Turli iqlimda insonlarning adaptiv tiplari shakllangan; ular irqqa bogʻliq emas. Arktik tip — kuchli suyak-muskul, keng koʻkrak, qonda oqsil va yogʻ koʻp. Tropik tip — uzun qoʻl-oyoq, koʻp ter bezlari. Togʻ tipi — kislorod kam joyda: keng koʻkrak, eritrotsit va gemoglobin koʻp. Choʻl-sahro tipi — issiqlik ajratish yuqori, ter bezlari yaxshi rivojlangan; Markaziy Osiyo aholisining koʻpchiligi shu tipga kiradi.",
      easy: "Arktik, tropik, togʻ, choʻl-sahro adaptiv tiplari.",
      draw: [
        { t: 'title', text: 'Adaptiv tiplar' },
        { t: 'table', x: 4, y: 20, rows: [['tip', 'belgisi'], ['arktik', 'keng koʻkrak, kuchli muskul'], ['tropik', 'uzun qoʻl-oyoq, koʻp ter'], ['togʻ', 'gemoglobin koʻp'], ['choʻl-sahro', 'issiqlik ajratish yuqori']] }
      ],
      next: 'Shahar va qishloq'
    },
    {
      kind: 'example',
      clear: true,
      say: "Yer aholisining yarmiga yaqini shaharlarda yashaydi. Shaharda havo, suv va ovqat ifloslanishi, shovqin, aholi zichligi yuqumli kasalliklarni koʻpaytiradi; ifloslangan havodan ultrabinafsha nur kam oʻtib, D vitamini yetishmaydi. Qishloqda turlar xilma-xil, lekin hayvonlardan yuqadigan kasalliklar va pestitsidlar xavfi koʻproq.",
      easy: "Shahar — ifloslanish, shovqin, D vitamini kam; qishloq — pestitsid, zoonozlar.",
      draw: [
        { t: 'title', text: 'Shahar va qishloq' },
        { t: 'table', x: 4, y: 20, rows: [['muhit', 'xavflar'], ['shahar', 'ifloslanish, shovqin'], ['shahar', 'D vitamini yetishmasligi'], ['qishloq', 'pestitsidlar'], ['qishloq', 'hayvonlardan kasallik']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Inson ekologiyasi (antropoekologiya) inson va muhit munosabatlarini oʻrganadi; inson tabiatga ongli taʼsir qiladi, kuchli energiya manbalari va sunʼiy muhit yaratadi.',
    'Salomatlikka fizik, kimyoviy, biologik va ijtimoiy omillar taʼsir qiladi; inson sutkasiga ≥ 2500 kkal oladi, yod yetishmasligi yodlangan tuz bilan oldi olinadi.',
    'Adaptiv tiplar (arktik, tropik, togʻ, choʻl-sahro) iqlimga moslanish natijasi va irqqa bogʻliq emas.'
  ],
  questions: [
    {
      id: 'b23q1',
      prompt: 'Omilni guruhiga ajrating.',
      hint: 'Shovqin — fizik.',
      explanation: 'Fizik: shovqin, radiatsiya. Kimyoviy: zaharli gaz, neft mahsulotlari. Biologik: parazitlar, zaharli oʻsimliklar.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'f', label: 'Fizik' },
            { id: 'k', label: 'Kimyoviy' },
            { id: 'b', label: 'Biologik' }
          ],
          items: [
            { emoji: '', label: 'shovqin', bin: 'f' },
            { emoji: '', label: 'radiatsiya', bin: 'f' },
            { emoji: '', label: 'zaharli gazlar', bin: 'k' },
            { emoji: '', label: 'neft mahsulotlari', bin: 'k' },
            { emoji: '', label: 'parazitlar', bin: 'b' },
            { emoji: '', label: 'zaharli oʻsimliklar', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'b23q2',
      prompt: 'Adaptiv tipni belgisi bilan juftlang.',
      hint: 'Togʻda kislorod kam.',
      explanation: 'Arktik — keng koʻkrak, kuchli muskul; tropik — uzun qoʻl-oyoq; togʻ — gemoglobin koʻp; choʻl-sahro — issiqlik ajratish yuqori.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'arktik', right: 'keng koʻkrak, kuchli muskul' },
            { left: 'tropik', right: 'uzun qoʻl-oyoq' },
            { left: 'togʻ', right: 'gemoglobin koʻp' },
            { left: 'choʻl-sahro', right: 'issiqlik ajratish yuqori' }
          ]
        }
      }
    },
    {
      id: 'b23q3',
      prompt: 'Inson sutkasiga kamida necha kilokaloriya energiyaga muhtoj?',
      hint: 'Darslikdagi raqam.',
      explanation: '2500 kkal.',
      widget: { type: 'number_answer', props: { answer: 2500, unit: 'kkal' } }
    },
    {
      id: 'b23q4',
      prompt: 'Markaziy Osiyoda nega osh tuziga yod qoʻshiladi?',
      hint: 'Okeandan uzoq.',
      explanation: 'Suv va ovqatda yod kam — qalqonsimon bez faoliyati buzilishining oldini olish uchun.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tuz shoʻrroq boʻlishi uchun', 'yod yetishmasligining oldini olish uchun', 'D vitamini uchun', 'tuz uzoq saqlanishi uchun'], answerIndex: 1 } }
    },
    {
      id: 'b23q5',
      prompt: 'Markaziy Osiyo aholisining koʻpchiligi qaysi adaptiv tipga kiradi?',
      hint: 'Jazirama, quruq iqlim.',
      explanation: 'Choʻl-sahro adaptiv tipi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['arktik', 'tropik', 'togʻ', 'choʻl-sahro'], answerIndex: 3 } }
    },
    {
      id: 'b23q6',
      prompt: 'Insonning ekologik omil sifatida oʻziga xosliklarini belgilang.',
      hint: 'Uchta xususiyat.',
      explanation: 'Ongli taʼsir, kuchli energiya manbalari, sunʼiy muhit yaratish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tabiatga ongli va maqsadli taʼsir qiladi', correct: true },
            { label: 'kuchli energiya manbalarini yaratadi', correct: true },
            { label: 'oʻziga sunʼiy muhit yaratadi', correct: true },
            { label: 'faqat quyosh energiyasidan foydalanadi' }
          ]
        }
      }
    },
    {
      id: 'b23q7',
      prompt: 'Shaharda havo ifloslanganda qaysi vitamin yetishmasligi rivojlanadi?',
      hint: 'Ultrabinafsha nur kam yetadi.',
      explanation: 'D vitamini.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['A', 'C', 'D', 'B₁₂'], answerIndex: 2 } }
    },
    {
      id: 'b23q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Adaptiv tip — iqlimga moslanish.',
      explanation: 'Adaptiv tiplar irqqa bogʻliq emas; aholining yarmiga yaqini shaharlarda yashaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Adaptiv tiplar irqqa bogʻliq emas.', value: true },
            { text: 'Yer aholisining yarmiga yaqini shaharlarda yashaydi.', value: true },
            { text: 'Inson ekologiyasi XVIII asrda paydo boʻlgan.', value: false },
            { text: 'Togʻ adaptiv tipida gemoglobin miqdori kam.', value: false }
          ]
        }
      }
    }
  ]
};
