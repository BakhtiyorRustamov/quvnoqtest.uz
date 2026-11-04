import type { BoardLesson } from './types';

/** Darslik (2-qism): 74–77-mavzu (78–82-betlar) — hodisalar ustida amallar, qarama-qarshi hodisalar, Eyler–Venn diagrammalari. */
export const MATH_58: BoardLesson = {
  n: 58,
  label: '74–77',
  part: 'algebra',
  qism: 2,
  title: 'Hodisalar ustida amallar va Eyler–Venn diagrammalari',
  section: '74–77',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Kub tashlaymiz. A — juft son chiqishi: 2, 4 yoki 6. B — 2, 3 yoki 4 dan biri chiqishi. Ikkalasi birga roʻy beradigan hollar: 2 va 4. Hech boʻlmaganda bittasi roʻy beradigan hollar: 2, 3, 4, 6. Hodisalarni xuddi toʻplamlar kabi qoʻshish va koʻpaytirish mumkin ekan!",
      easy: "Hodisalar — natijalar toʻplami. Ularni toʻplamlar kabi birlashtiramiz.",
      draw: [
        { t: 'title', text: 'Kub: A va B' },
        { t: 'icon', x: 12, y: 32, emoji: '🎲', size: 'l' },
        { t: 'list', x: 28, y: 20, items: ['A = {2, 4, 6}', 'B = {2, 3, 4}', 'ikkalasi: {2, 4}', 'hech boʻlmaganda biri: {2, 3, 4, 6}'] }
      ],
      next: 'Koʻpaytma va yigʻindi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "A va B ning ikkalasi bir vaqtda roʻy berishi — ularning koʻpaytmasi, AB yoki A kesishma B. Diagrammada ikki doiraning umumiy qismi. Hech boʻlmaganda bittasining roʻy berishi — yigʻindi, A plyus B yoki A birlashma B: ikkala doira birga. Bunday rasmlar Eyler–Venn diagrammalari deyiladi.",
      easy: "AB (A ∩ B) — ikkalasi birga. A + B (A ∪ B) — hech boʻlmaganda biri.",
      draw: [
        { t: 'title', text: 'Koʻpaytma va yigʻindi' },
        { t: 'ellipse', cx: 24, cy: 40, rx: 14, ry: 14, color: 'blue' },
        { t: 'ellipse', cx: 40, cy: 40, rx: 14, ry: 14, color: 'red' },
        { t: 'text', x: 15, y: 41, text: '6', anchor: 'middle' },
        { t: 'text', x: 32, y: 38, text: '2', anchor: 'middle', color: 'purple' },
        { t: 'text', x: 32, y: 46, text: '4', anchor: 'middle', color: 'purple' },
        { t: 'text', x: 48, y: 41, text: '3', anchor: 'middle' },
        { t: 'text', x: 14, y: 24, text: 'A', color: 'blue' },
        { t: 'text', x: 48, y: 24, text: 'B', color: 'red' },
        { t: 'list', x: 60, y: 26, items: ['AB = {2, 4}', 'A + B = {2, 3, 4, 6}'] }
      ],
      next: 'Ergashtirish va ayirma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar A roʻy berganda B ham albatta roʻy bersa, A hodisa B ni ergashtiradi: masalan, 2 chiqsa, juft son ham chiqqan boʻladi. Diagrammada A doirasi B ning ichida. A roʻy berib, B roʻy bermasa — bu ayirma, A minus B. Agar A va B bir vaqtda roʻy bera olmasa, ular birgalikda emas deyiladi: bitta kubda 2 va 3 birga chiqmaydi.",
      easy: "A ⊂ B — ergashtiradi. A − B — A bor, B yoʻq. AB = V — birgalikda emas.",
      draw: [
        { t: 'title', text: 'Ergashtirish, ayirma' },
        { t: 'ellipse', cx: 20, cy: 40, rx: 15, ry: 15, color: 'red' },
        { t: 'ellipse', cx: 17, cy: 43, rx: 6, ry: 6, color: 'blue' },
        { t: 'text', x: 17, y: 44, text: 'A', anchor: 'middle', color: 'blue' },
        { t: 'text', x: 28, y: 32, text: 'B', anchor: 'middle', color: 'red' },
        { t: 'text', x: 20, y: 63, text: 'A ⊂ B', anchor: 'middle', color: 'green' },
        { t: 'list', x: 42, y: 24, items: ['{2} ⊂ {juft}: 2 → juft', 'A − B: A bor, B yoʻq', 'AB = V: birgalikda emas', '2 va 3 — birgalikda emas'] }
      ],
      next: 'Qarama-qarshi hodisa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "A roʻy bermasligi — qarama-qarshi hodisa, Ā deb belgilanadi. A plyus Ā muqarrar, A karra Ā mumkin emas. Masalan, juft son chiqishiga qarama-qarshi — toq son chiqishi. Ehtimolliklar yigʻindisi 1 ga teng, shuning uchun P(Ā) teng 1 minus P(A).",
      easy: "Ā — A roʻy bermaydi. P(Ā) = 1 − P(A).",
      draw: [
        { t: 'title', text: 'Qarama-qarshi hodisa' },
        { t: 'point', id: 'u1', x: 6, y: 20, hide: true },
        { t: 'point', id: 'u2', x: 46, y: 20, hide: true },
        { t: 'point', id: 'u3', x: 46, y: 56, hide: true },
        { t: 'point', id: 'u4', x: 6, y: 56, hide: true },
        { t: 'polygon', points: ['u1', 'u2', 'u3', 'u4'], color: 'ink' },
        { t: 'text', x: 9, y: 26, text: 'U', size: 's' },
        { t: 'ellipse', cx: 22, cy: 37, rx: 10, ry: 10, color: 'blue' },
        { t: 'text', x: 22, y: 38, text: 'A', anchor: 'middle', color: 'blue' },
        { t: 'text', x: 40, y: 50, text: 'Ā', anchor: 'middle', color: 'red' },
        { t: 'list', x: 52, y: 22, items: ['A + Ā = U', 'AĀ = V', 'juft ↔ toq'] },
        { t: 'formula', x: 52, y: 50, text: 'P(Ā) = 1 − P(A)' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tanga uch marta tashlanadi. Raqam kamida bir marta tushish ehtimolligi qancha? Toʻgʻridan sanash uzoq. Qarama-qarshi hodisani olamiz: raqam umuman tushmasligi, yaʼni GGG — 8 ta imkoniyatdan bittasi, bir sakkizdan. Demak, javob 1 minus bir sakkizdan, yaʼni yetti sakkizdan.",
      easy: "P(kamida bir R) = 1 − P(GGG) = 1 − 1/8 = 7/8.",
      draw: [
        { t: 'title', text: '3 ta tanga' },
        { t: 'text', x: 6, y: 22, text: 'GGG, GGR, GRG, GRR, RGG, RGR, RRG, RRR', size: 's' },
        { t: 'list', x: 6, y: 34, items: ['A: kamida bitta R', 'Ā: GGG,  P(Ā) = 1/8'] },
        { t: 'formula', x: 6, y: 52, text: 'P(A) = 1 − 1/8 = 7/8' }
      ],
      next: 'Yigʻindi ehtimolligi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Birgalikda boʻlmagan hodisalar uchun P(A plyus B) teng P(A) plyus P(B). Kesishsa, umumiy qism ikki marta sanaladi, uni bir marta ayiramiz: P(A plyus B) teng P(A) plyus P(B) minus P(AB). Kub misolida: uchdan olti plyus uchdan olti minus ikkidan olti, yaʼni toʻrtdan olti — chindan ham {2, 3, 4, 6} — 4 ta natija.",
      easy: "P(A + B) = P(A) + P(B) − P(AB). Kubda: 3/6 + 3/6 − 2/6 = 4/6.",
      draw: [
        { t: 'title', text: 'P(A + B)' },
        { t: 'formula', x: 6, y: 20, text: 'P(A + B) = P(A) + P(B) − P(AB)' },
        { t: 'list', x: 6, y: 36, items: ['AB = V boʻlsa: P(A + B) = P(A) + P(B)', 'kub: 3/6 + 3/6 − 2/6 = 4/6 = 2/3'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'AB — ikkala hodisa birga; A + B — hech boʻlmaganda bittasi; A − B — A bor, B yoʻq.',
    'Qarama-qarshi hodisa Ā: A + Ā = U, AĀ = V, P(Ā) = 1 − P(A).',
    'P(A + B) = P(A) + P(B) − P(AB); birgalikda boʻlmasa, P(A + B) = P(A) + P(B).'
  ],
  questions: [
    {
      id: 'p58q1',
      prompt: '1000 ta suv nasosidan 5 tasi nosoz. Tavakkaliga olingan nasos soz boʻlish ehtimolligi?',
      hint: '1 − 5/1000.',
      explanation: '1 − 0,005 = 0,995.',
      widget: { type: 'number_answer', props: { answer: 0.995, tolerance: 0.0005 } }
    },
    {
      id: 'p58q2',
      prompt: 'Tanga 3 marta tashlandi. Raqam tomoni aynan bir marta tushish ehtimolligi?',
      hint: 'GGR, GRG, RGG.',
      explanation: '3/8 = 0,375.',
      widget: { type: 'number_answer', props: { answer: 0.375, tolerance: 0.001 } }
    },
    {
      id: 'p58q3',
      prompt: 'Vertolyot har reysda 6 kishini olib ketadi, 30 nafar sayyoh tasodifiy tartibda oʻtiradi. Alisherning birinchi reysda uchish ehtimolligi?',
      hint: '6 ta oʻrin, 30 kishi.',
      explanation: '6/30 = 0,2.',
      widget: { type: 'number_answer', props: { answer: 0.2, tolerance: 0.001 } }
    },
    {
      id: 'p58q4',
      prompt: '20 nafar musiqachidan 8 nafari Oʻzbekistondan, 7 nafari AQSHdan, qolgani Xitoydan. Birinchi boʻlib xitoylik chiqish ehtimolligi?',
      hint: 'Xitoyliklar: 20 − 8 − 7.',
      explanation: '5/20 = 0,25.',
      widget: { type: 'number_answer', props: { answer: 0.25, tolerance: 0.001 } }
    },
    {
      id: 'p58q5',
      prompt: 'Amalni maʼnosi bilan moslang.',
      hint: 'Koʻpaytma — «va», yigʻindi — «yoki».',
      explanation: 'AB — ikkalasi birga; A + B — kamida bittasi; A − B — A bor, B yoʻq; Ā — A yoʻq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'AB', right: 'ikkalasi birga roʻy beradi' },
            { left: 'A + B', right: 'kamida bittasi roʻy beradi' },
            { left: 'A − B', right: 'A roʻy beradi, B yoʻq' },
            { left: 'Ā', right: 'A roʻy bermaydi' }
          ]
        }
      }
    },
    {
      id: 'p58q6',
      prompt: 'Kub: A = {1, 3}, B = {1, 2, 6}. A + B qaysi natijalardan iborat? Hammasini belgilang.',
      hint: 'Hech boʻlmaganda bittasiga kirganlar.',
      explanation: 'A + B = {1, 2, 3, 6}.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: '1', correct: true },
            { label: '2', correct: true },
            { label: '3', correct: true },
            { label: '4' },
            { label: '5' },
            { label: '6', correct: true }
          ]
        }
      }
    },
    {
      id: 'p58q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Qarama-qarshi hodisalar ehtimolliklari yigʻindisi 1.',
      explanation: 'P(Ā) = 1 − P(A); birgalikda boʻlmagan hodisalar uchun P(A + B) = P(A) + P(B).',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'P(Ā) = ' }, { blank: '1 − P(A)' }, { text: '. Agar AB = V boʻlsa, P(A + B) = ' }, { blank: 'P(A) + P(B)' }, { text: '.' }],
          bank: ['1 − P(A)', 'P(A) + P(B)', 'P(A) · P(B)', '1 + P(A)']
        }
      }
    },
    {
      id: 'p58q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kub misollarini eslang.',
      explanation: '2 va 3 birgalikda emas; juft va toq — qarama-qarshi; «2 chiqadi» «juft chiqadi» ni ergashtiradi; A + Ā = U.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bitta kubda «2 chiqadi» va «3 chiqadi» hodisalari birgalikda emas.', value: true },
            { text: '«Juft chiqadi» va «5 chiqadi» — qarama-qarshi hodisalar.', value: false },
            { text: '«2 chiqadi» hodisasi «juft son chiqadi» hodisasini ergashtiradi.', value: true },
            { text: 'A + Ā — roʻy berishi mumkin boʻlmagan hodisa.', value: false }
          ]
        }
      }
    }
  ]
};
