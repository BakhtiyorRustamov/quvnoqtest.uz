import type { BoardLesson } from './types';

/** Darslik (2-qism): 78–80-mavzu (87–90-betlar) — murakkab hodisalarning ehtimolligini hisoblash usullari. */
export const MATH_60: BoardLesson = {
  n: 60,
  label: '80',
  part: 'algebra',
  qism: 2,
  title: 'Murakkab hodisalarning ehtimolligini hisoblash',
  section: '78–80',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ikki ovchi nishonga bittadan oʻq uzdi. Birinchisining tekkizish ehtimolligi 0,7, ikkinchisiniki 0,8. Hech boʻlmaganda bitta oʻq tegish ehtimolligi qancha? Ikki yoʻl bor. Qoʻshish qoidasi: 0,7 plyus 0,8 minus 0,7 karra 0,8, yaʼni 0,94. Yoki qarama-qarshi hodisa: ikkalasi ham tekkizolmasligi 0,3 karra 0,2 teng 0,06, demak 1 minus 0,06 teng 0,94.",
      easy: "1 − 0,3 · 0,2 = 0,94. Qoʻshish qoidasi bilan ham 0,7 + 0,8 − 0,56 = 0,94.",
      draw: [
        { t: 'title', text: 'Ikki ovchi' },
        { t: 'icon', x: 12, y: 32, emoji: '🎯', size: 'l' },
        { t: 'list', x: 28, y: 20, items: ['P(A) = 0,7,  P(B) = 0,8', '1-yoʻl: 0,7 + 0,8 − 0,56 = 0,94', '2-yoʻl: 1 − 0,3 · 0,2 = 0,94'] }
      ],
      next: 'Birgalikda boʻlmaganlar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Korxonada bir kunda bitta dastgohni taʼmirlash ehtimolligi 0,2, ikkitasini — 0,13, ikkitadan koʻpini — 0,07. Hech boʻlmaganda bitta dastgohni taʼmirlash kerak boʻlish ehtimolligi qancha? Uch hodisa birgalikda emas, shuning uchun ehtimolliklarni shunchaki qoʻshamiz: 0,2 plyus 0,13 plyus 0,07 teng 0,4.",
      easy: "Birgalikda boʻlmagan hodisalar: 0,2 + 0,13 + 0,07 = 0,4.",
      draw: [
        { t: 'title', text: 'Dastgohlar' },
        { t: 'icon', x: 12, y: 32, emoji: '🔧', size: 'l' },
        { t: 'list', x: 28, y: 20, items: ['bitta: 0,2', 'ikkita: 0,13', 'ikkitadan koʻp: 0,07'] },
        { t: 'formula', x: 28, y: 48, text: 'P = 0,2 + 0,13 + 0,07 = 0,4' }
      ],
      next: 'Guruhlashlar bilan'
    },
    {
      kind: 'example',
      clear: true,
      say: "Idishda 10 ta qizil va 6 ta koʻk shar. Tavakkaliga 2 ta shar olinadi. Ikkalasi bir xil rangda boʻlish ehtimolligi? Barcha imkoniyatlar — 16 dan 2 tasini tanlash, C 16 2 teng 120. Ikkalasi qizil — C 10 2 teng 45, ikkalasi koʻk — C 6 2 teng 15. Javob: 45 plyus 15, boʻlinsin 120, yaʼni bir ikkinchi.",
      easy: "(C₁₀² + C₆²) / C₁₆² = (45 + 15) / 120 = 1/2.",
      draw: [
        { t: 'title', text: '10 qizil, 6 koʻk' },
        { t: 'list', x: 6, y: 20, items: ['barcha: C₁₆² = 120', 'ikkalasi qizil: C₁₀² = 45', 'ikkalasi koʻk: C₆² = 15'] },
        { t: 'formula', x: 6, y: 48, text: 'P = (45 + 15) / 120 = 1/2' }
      ],
      next: 'Ketma-ket tanlash'
    },
    {
      kind: 'example',
      clear: true,
      say: "Firmada 7 erkak va 3 ayol ishlaydi. Tavakkaliga 3 kishi ajratildi. Hammasi erkak boʻlish ehtimolligi? Birinchisi erkak — 7 boʻlinsin 10. Shu shartda ikkinchisi ham erkak — 6 boʻlinsin 9. Uchinchisi — 5 boʻlinsin 8. Koʻpaytirish formulasi boʻyicha: 7 boʻlinsin 10 karra 6 boʻlinsin 9 karra 5 boʻlinsin 8, yaʼni yigirma toʻrtdan yetti.",
      easy: "7/10 · 6/9 · 5/8 = 7/24 — har safar shartli ehtimollik.",
      draw: [
        { t: 'title', text: '7 erkak, 3 ayol' },
        { t: 'list', x: 6, y: 20, items: ['1-si erkak: 7/10', '2-si ham erkak: 6/9', '3-si ham erkak: 5/8'] },
        { t: 'formula', x: 6, y: 48, text: 'P(ABC) = 7/10 · 6/9 · 5/8 = 7/24' }
      ],
      next: 'Kamida bittasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bogʻliq boʻlmagan bir nechta hodisadan kamida bittasi roʻy berish ehtimolligini qarama-qarshi hodisa orqali topish qulay: hech biri roʻy bermasligi — 1 minus p larning koʻpaytmasi. Masalan, toʻrtta qurilma bir-biridan mustaqil ishlaydi, signal berish ehtimolliklari 0,3; 0,4; 0,6 va 0,7. Kamida bittasi signal berishi: 1 minus 0,7 karra 0,6 karra 0,4 karra 0,3, yaʼni 1 minus 0,0504 teng 0,9496.",
      easy: "P(kamida bittasi) = 1 − (1 − p₁)(1 − p₂)…(1 − pₙ).",
      draw: [
        { t: 'title', text: 'Kamida bittasi' },
        { t: 'formula', x: 6, y: 20, text: 'P = 1 − (1 − p₁)(1 − p₂)…(1 − pₙ)' },
        { t: 'list', x: 6, y: 36, items: ['p: 0,3; 0,4; 0,6; 0,7', '1 − 0,7 · 0,6 · 0,4 · 0,3 = 0,9496'] },
        { t: 'text', x: 6, y: 60, text: 'hammasi bir xil p: 1 − (1 − p)ⁿ', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Birgalikda boʻlmagan hodisalar ehtimolliklari qoʻshiladi; kesishsa, umumiy qism ayiriladi.',
    'Ketma-ket tanlashda shartli ehtimolliklar koʻpaytiriladi: P(ABC) = P(A) · P(B | A) · P(C | AB).',
    'Kamida bittasi: 1 − (1 − p₁)(1 − p₂)…(1 − pₙ); murakkab hollarda guruhlashlar sonidan foydalanamiz.'
  ],
  questions: [
    {
      id: 'p60q1',
      prompt: 'Merganning nishonga tegish ehtimolligi 0,9. U 3 marta otganda barcha oʻqlari tegish ehtimolligi?',
      hint: '0,9³.',
      explanation: '0,9 · 0,9 · 0,9 = 0,729.',
      widget: { type: 'number_answer', props: { answer: 0.729, tolerance: 0.001 } }
    },
    {
      id: 'p60q2',
      prompt: 'Ikki signalizator mustaqil ishlaydi: avariyada xabar berish ehtimolliklari 0,9 va 0,95. Ikkalasi ham xabar bermaslik ehtimolligi?',
      hint: '(1 − 0,9)(1 − 0,95).',
      explanation: '0,1 · 0,05 = 0,005.',
      widget: { type: 'number_answer', props: { answer: 0.005, tolerance: 0.0001 } }
    },
    {
      id: 'p60q3',
      prompt: 'Shu signalizatorlardan (0,9 va 0,95) faqat birinchisi xabar berish ehtimolligi?',
      hint: '0,9 · (1 − 0,95).',
      explanation: '0,9 · 0,05 = 0,045.',
      widget: { type: 'number_answer', props: { answer: 0.045, tolerance: 0.0005 } }
    },
    {
      id: 'p60q4',
      prompt: 'Tanga 5 marta tashlandi. Gerb aynan 2 marta tushish ehtimolligi?',
      hint: 'C₅² ta qulay, 2⁵ ta barcha.',
      explanation: '10/32 = 0,3125.',
      widget: { type: 'number_answer', props: { answer: 0.3125, tolerance: 0.0005 } }
    },
    {
      id: 'p60q5',
      prompt: 'Abonent nomerning oxirgi uchta (turli) raqamini unutib, tavakkaliga terdi. Toʻgʻri terish ehtimolligi 1/N. N = ?',
      hint: 'Turli raqamli tartiblangan uchliklar: 10 · 9 · 8.',
      explanation: 'N = 720, ehtimollik 1/720.',
      widget: { type: 'number_answer', props: { answer: 720 } }
    },
    {
      id: 'p60q6',
      prompt: 'Idishda 5 ta oq va 3 ta qora shar. Ketma-ket (qaytarmasdan) 2 ta shar olindi. Ikkalasi oq boʻlish ehtimolligi (0,001 gacha)?',
      hint: '5/8 · 4/7.',
      explanation: '20/56 = 5/14 ≈ 0,357.',
      widget: { type: 'number_answer', props: { answer: 0.3571, tolerance: 0.001 } }
    },
    {
      id: 'p60q7',
      prompt: '«Kamida bittasi» ehtimolligini topish bosqichlarini tartiblang.',
      hint: 'Qarama-qarshi hodisadan boshlaymiz.',
      explanation: 'Har birining roʻy bermaslik ehtimolligi → koʻpaytma → 1 dan ayirish.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['Har bir hodisa uchun 1 − pᵢ ni topish', 'Bu sonlarni koʻpaytirish (hech biri roʻy bermaydi)', 'Natijani 1 dan ayirish']
        }
      }
    },
    {
      id: 'p60q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ovchilar misolini eslang.',
      explanation: 'Ikkala ovchi misolida P = 0,94; birgalikda boʻlmagan hodisalar ehtimolliklari qoʻshiladi; qaytarmasdan olishda ehtimollik oʻzgaradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ikki ovchi (0,7 va 0,8) misolida kamida bitta oʻq tegish ehtimolligi 1,5 ga teng.', value: false },
            { text: 'Birgalikda boʻlmagan hodisalarning yigʻindisi ehtimolligi ularning ehtimolliklari yigʻindisiga teng.', value: true },
            { text: 'Sharni qaytarmasdan olganda ikkinchi sharning ehtimolligi birinchisiga bogʻliq boʻladi.', value: true },
            { text: 'Kamida bittasi roʻy berish ehtimolligi har doim eng katta pᵢ dan kichik.', value: false }
          ]
        }
      }
    }
  ]
};
