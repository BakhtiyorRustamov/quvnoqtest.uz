import type { BoardLesson } from './types';

/** P(16, m), p = 0,5 — darslikdagi jadval (m = 4…12) */
const B16 = [
  { label: '4', value: 0.028 }, { label: '5', value: 0.067 }, { label: '6', value: 0.122 }, { label: '7', value: 0.175 }, { label: '8', value: 0.196 },
  { label: '9', value: 0.175 }, { label: '10', value: 0.122 }, { label: '11', value: 0.067 }, { label: '12', value: 0.028 }
];

/** Darslik (2-qism): 81–85-mavzu (91–94-betlar) — Bernulli sxemasi, binomial taqsimot. */
export const MATH_61: BoardLesson = {
  n: 61,
  label: '81–83',
  part: 'algebra',
  qism: 2,
  title: 'Bernulli sxemasi va binomial taqsimot',
  section: '81–85',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mergan nishonga 6 marta oʻq uzadi, har safar tekkizish ehtimolligi 0,8. Aynan 4 marta tekkizish ehtimolligi qancha? Yoki tanga 10 marta tashlansa, aynan 5 ta gerb chiqishi? Bunday masalalar bitta umumiy formula bilan yechiladi. Uni bugun keltirib chiqaramiz.",
      easy: "Bir xil tajriba n marta takrorlanadi — aynan m marta muvaffaqiyat ehtimolligini topamiz.",
      draw: [
        { t: 'title', text: 'Aynan necha marta?' },
        { t: 'icon', x: 12, y: 32, emoji: '🎯', size: 'l' },
        { t: 'list', x: 28, y: 22, items: ['6 ta oʻq, p = 0,8: aynan 4 ta tegishi?', '10 ta tanga: aynan 5 ta gerb?'] }
      ],
      next: 'Bernulli sxemasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "n ta oʻzaro bogʻliq boʻlmagan tajriba oʻtkazilsin. Har birida A hodisaning roʻy berish ehtimolligi p, roʻy bermasligi q teng 1 minus p. Bu Bernulli sxemasi. A roʻy bersa 1, bermasa 0 yozamiz. 3 ta tajribada 8 ta kod bor: 111, 110 va hokazo. Tajribalar bogʻliq boʻlmagani uchun ehtimolliklar koʻpaytiriladi: 110 kodining ehtimolligi p karra p karra q, yaʼni p kvadrat q.",
      easy: "1 — roʻy berdi (p), 0 — roʻy bermadi (q). 110 → p · p · q = p²q.",
      draw: [
        { t: 'title', text: 'Bernulli sxemasi (n = 3)' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['kod', '111', '110', '101', '100', '011', '010', '001', '000'],
            ['P', 'p³', 'p²q', 'p²q', 'pq²', 'p²q', 'pq²', 'pq²', 'q³']
          ]
        },
        { t: 'list', x: 6, y: 42, items: ['q = 1 − p', 'n ta tajribada 2ⁿ ta kod'] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Qutida 3 ta qizil va 5 ta koʻk qalam. Har safar bitta qalam olib, joyiga qaytaramiz, 4 marta. Qizil chiqish ehtimolligi p teng uch sakkizdan, q teng besh sakkizdan. Birinchi, uchinchi va toʻrtinchi marta qizil, ikkinchisida koʻk chiqish — 1011 kodi: p kub karra q, yaʼni 135 boʻlinsin 4096, taxminan 0,033.",
      easy: "1011 → p³q = (3/8)³ · 5/8 = 135/4096 ≈ 0,033.",
      draw: [
        { t: 'title', text: '3 qizil, 5 koʻk' },
        { t: 'list', x: 6, y: 20, items: ['p = 3/8 (qizil), q = 5/8', 'kod 1011: qizil, koʻk, qizil, qizil'] },
        { t: 'formula', x: 6, y: 42, text: 'p³q = (3/8)³ · 5/8 = 135/4096 ≈ 0,033' }
      ],
      next: 'Umumiy formula'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Aynan m marta roʻy berish uchun kodda m ta bir va n minus m ta nol boʻladi. Bunday kodlar soni C n m, har birining ehtimolligi p ning m darajasi karra q ning n minus m darajasi. Demak, P(n, m) teng C n m karra p ning m darajasi karra q ning n minus m darajasi. Bu Bernulli formulasi. n teng 3, p teng 0,2 boʻlsa: 0 marta — 0,512, 1 marta — 0,384, 2 marta — 0,096, 3 marta — 0,008. Yigʻindisi 1.",
      easy: "P(n, m) = Cₙᵐ · pᵐ · qⁿ⁻ᵐ. Jadval — binomial taqsimot.",
      draw: [
        { t: 'title', text: 'Bernulli formulasi' },
        { t: 'formula', x: 6, y: 20, text: 'P(n, m) = Cₙᵐ · pᵐ · qⁿ⁻ᵐ' },
        { t: 'text', x: 6, y: 36, text: 'n = 3, p = 0,2, q = 0,8:', color: 'blue' },
        {
          t: 'table',
          x: 6,
          y: 40,
          rows: [
            ['m', '0', '1', '2', '3'],
            ['P(3, m)', '0,512', '0,384', '0,096', '0,008']
          ]
        }
      ],
      next: 'Taqsimot rasmi'
    },
    {
      kind: 'example',
      clear: true,
      say: "n teng 16, p teng 0,5 boʻlganda binomial taqsimotni ustunli diagrammada chizamiz. Eng baland ustun — m teng 8, ehtimolligi 0,196. Ustunlar unga nisbatan simmetrik joylashgan. 16 ta tangadan aynan 8 ta gerb chiqishi eng ehtimolli, lekin baribir 0,2 dan kam!",
      easy: "n = 16, p = 0,5: eng ehtimolli m = 8 (0,196), diagramma simmetrik.",
      draw: [
        { t: 'title', text: 'P(16, m), p = 0,5' },
        { t: 'bars', x: 6, y: 18, w: 60, h: 38, items: B16, color: 'blue' },
        { t: 'list', x: 70, y: 24, items: ['eng katta: m = 8', 'P ≈ 0,196', 'simmetrik'] }
      ],
      next: 'Hayotiy misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Statistikaga koʻra, oʻgʻil bola tugʻilish ehtimolligi taxminan 0,515. Tavakkaliga olingan 10 chaqaloqdan aynan 6 tasi oʻgʻil boʻlish ehtimolligi: C 10 6 karra 0,515 ning 6-darajasi karra 0,485 ning 4-darajasi, taxminan 0,217.",
      easy: "P(10, 6) = C₁₀⁶ · 0,515⁶ · 0,485⁴ ≈ 0,217.",
      draw: [
        { t: 'title', text: '10 chaqaloq' },
        { t: 'icon', x: 12, y: 30, emoji: '👶', size: 'l' },
        { t: 'list', x: 28, y: 22, items: ['p = 0,515 (oʻgʻil), q = 0,485', 'C₁₀⁶ = 210'] },
        { t: 'formula', x: 6, y: 52, text: 'P(10, 6) ≈ 210 · 0,515⁶ · 0,485⁴ ≈ 0,217' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Bernulli sxemasi: n ta bogʻliq boʻlmagan tajriba, har birida P(A) = p, q = 1 − p.',
    'Aynan m marta roʻy berish: P(n, m) = Cₙᵐ pᵐ qⁿ⁻ᵐ (Bernulli formulasi).',
    'P(n, 0), P(n, 1), …, P(n, n) — binomial taqsimot; ularning yigʻindisi 1.'
  ],
  questions: [
    {
      id: 'p61q1',
      prompt: 'Tanga 3 marta tashlandi. Aynan 2 marta gerb tushish ehtimolligi?',
      hint: 'C₃² · (1/2)³.',
      explanation: '3 · 1/8 = 3/8 = 0,375.',
      widget: { type: 'number_answer', props: { answer: 0.375, tolerance: 0.001 } }
    },
    {
      id: 'p61q2',
      prompt: 'Mergan 6 marta otadi, har gal tekkizish ehtimolligi 0,8. Aynan 4 marta tekkizish ehtimolligi (0,001 gacha)?',
      hint: 'C₆⁴ · 0,8⁴ · 0,2².',
      explanation: '15 · 0,4096 · 0,04 ≈ 0,246.',
      widget: { type: 'number_answer', props: { answer: 0.2458, tolerance: 0.001 } }
    },
    {
      id: 'p61q3',
      prompt: '4 mergan mustaqil otadi, har birining tekkizish ehtimolligi 0,25. Birorta ham oʻq tegmaslik ehtimolligi (0,001 gacha)?',
      hint: '0,75⁴.',
      explanation: '0,75⁴ ≈ 0,316.',
      widget: { type: 'number_answer', props: { answer: 0.3164, tolerance: 0.001 } }
    },
    {
      id: 'p61q4',
      prompt: 'Shu 4 mergandan (p = 0,25) aynan 1 tasining oʻqi tegish ehtimolligi (0,001 gacha)?',
      hint: 'C₄¹ · 0,25 · 0,75³.',
      explanation: '4 · 0,25 · 0,421875 ≈ 0,422.',
      widget: { type: 'number_answer', props: { answer: 0.4219, tolerance: 0.001 } }
    },
    {
      id: 'p61q5',
      prompt: '5 ta tajribadan iborat Bernulli sxemasida nechta turli kod (0 va 1 lardan) bor?',
      hint: '2ⁿ.',
      explanation: '2⁵ = 32.',
      widget: { type: 'number_answer', props: { answer: 32 } }
    },
    {
      id: 'p61q6',
      prompt: 'n = 3 uchun kodni ehtimolligi bilan moslang.',
      hint: '1 — p, 0 — q.',
      explanation: '111 → p³; 000 → q³; 101 → p²q; 100 → pq².',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: '111' }, b: { label: 'p³' } },
            { a: { label: '000' }, b: { label: 'q³' } },
            { a: { label: '101' }, b: { label: 'p²q' } },
            { a: { label: '100' }, b: { label: 'pq²' } }
          ]
        }
      }
    },
    {
      id: 'p61q7',
      prompt: 'Bernulli formulasidagi boʻsh joylarni toʻldiring.',
      hint: 'Kodlar soni × bitta kod ehtimolligi.',
      explanation: 'P(n, m) = Cₙᵐ · pᵐ · qⁿ⁻ᵐ, q = 1 − p.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'P(n, m) = ' }, { blank: 'Cₙᵐ' }, { text: ' · pᵐ · ' }, { blank: 'qⁿ⁻ᵐ' }, { text: ', bunda q = ' }, { blank: '1 − p' }],
          bank: ['Cₙᵐ', 'qⁿ⁻ᵐ', '1 − p', 'Aₙᵐ', 'qᵐ', 'p − 1']
        }
      }
    },
    {
      id: 'p61q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'n = 16, p = 0,5 diagrammasini eslang.',
      explanation: 'Taqsimot yigʻindisi 1; p = 0,5 da diagramma simmetrik; tajribalar bogʻliq boʻlmasligi shart.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'P(n, 0) + P(n, 1) + … + P(n, n) = 1.', value: true },
            { text: 'n = 16, p = 0,5 da eng ehtimolli natija — 16 ta gerb.', value: false },
            { text: 'Bernulli sxemasida tajribalar bir-biriga bogʻliq boʻlmasligi kerak.', value: true },
            { text: 'Har bir tajribada p har xil boʻlishi mumkin.', value: false }
          ]
        }
      }
    }
  ]
};
