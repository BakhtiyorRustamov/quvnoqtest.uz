import type { BoardLesson } from './types';

/** Darslik (2-qism): 78–80-mavzu (83–87-betlar) — ehtimolliklarni qoʻshish, shartli ehtimollik, bogʻliq boʻlmagan hodisalar. */
export const MATH_59: BoardLesson = {
  n: 59,
  label: '78–79',
  part: 'algebra',
  qism: 2,
  title: 'Ehtimolliklarni qoʻshish va shartli ehtimollik',
  section: '78–80',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Sinfdagi 25 oʻquvchidan 14 nafari palovni, 16 nafari mantini yaxshi koʻradi. 6 nafari ikkalasini ham, 1 nafari esa boshqa taomni yoqtiradi. Eyler–Venn diagrammasida: faqat palov — 8, ikkalasi — 6, faqat manti — 10, hech biri — 1. Jami 25. Bugun shunday diagrammalar yordamida ehtimolliklarni qoʻshish va koʻpaytirishni oʻrganamiz.",
      easy: "Faqat palov 8, ikkalasi 6, faqat manti 10, hech biri 1 — jami 25.",
      draw: [
        { t: 'title', text: 'Palov va manti' },
        { t: 'ellipse', cx: 24, cy: 40, rx: 14, ry: 14, color: 'orange' },
        { t: 'ellipse', cx: 40, cy: 40, rx: 14, ry: 14, color: 'green' },
        { t: 'text', x: 16, y: 41, text: '8', anchor: 'middle' },
        { t: 'text', x: 32, y: 41, text: '6', anchor: 'middle', color: 'purple' },
        { t: 'text', x: 48, y: 41, text: '10', anchor: 'middle' },
        { t: 'text', x: 12, y: 24, text: 'palov', color: 'orange', size: 's' },
        { t: 'text', x: 44, y: 24, text: 'manti', color: 'green', size: 's' },
        { t: 'list', x: 62, y: 26, items: ['jami: 25', 'hech biri: 1', 'P(palov) = 14/25'] }
      ],
      next: 'Qoʻshish qoidasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ehtimolliklarni qoʻshish qoidasi: P(A yoki B) teng P(A) plyus P(B) minus P(A va B). Misol: P(A) 0,6, P(A yoki B) 0,7, P(A va B) 0,3. Qoidaga qoʻyamiz: 0,7 teng 0,6 plyus P(B) minus 0,3, demak P(B) teng 0,4. Diagrammada ham shunday: faqat A — 0,3, umumiy qism — 0,3, faqat B — 0,1.",
      easy: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B). 0,7 = 0,6 + P(B) − 0,3 → P(B) = 0,4.",
      draw: [
        { t: 'title', text: 'Qoʻshish qoidasi' },
        { t: 'formula', x: 6, y: 20, text: 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)' },
        { t: 'ellipse', cx: 20, cy: 46, rx: 11, ry: 11, color: 'blue' },
        { t: 'ellipse', cx: 33, cy: 46, rx: 11, ry: 11, color: 'red' },
        { t: 'text', x: 14, y: 47, text: '0,3', anchor: 'middle', size: 's' },
        { t: 'text', x: 26.5, y: 47, text: '0,3', anchor: 'middle', size: 's', color: 'purple' },
        { t: 'text', x: 39, y: 47, text: '0,1', anchor: 'middle', size: 's' },
        { t: 'list', x: 52, y: 38, items: ['0,7 = 0,6 + P(B) − 0,3', 'P(B) = 0,4'] }
      ],
      next: 'Birgalikda boʻlmasa'
    },
    {
      kind: 'example',
      clear: true,
      say: "Agar hodisalar birgalikda boʻlmasa, umumiy qism yoʻq, va P(A yoki B) teng P(A) plyus P(B). Gulzorda 20 ta qizil, 30 ta binafsha va 40 ta oq gul bor. Bitta gul uzildi. Qizil yoki binafsha boʻlish ehtimolligi: 20 boʻlinsin 90 plyus 30 boʻlinsin 90, yaʼni 50 boʻlinsin 90, toʻqqizdan besh.",
      easy: "Birgalikda boʻlmasa: P(A ∪ B) = P(A) + P(B) = 20/90 + 30/90 = 5/9.",
      draw: [
        { t: 'title', text: 'Gulzor' },
        { t: 'icon', x: 12, y: 32, emoji: '🌷', size: 'l' },
        { t: 'list', x: 28, y: 20, items: ['20 qizil, 30 binafsha, 40 oq', 'gul bir vaqtda ikki rangda boʻlmaydi'] },
        { t: 'formula', x: 28, y: 42, text: 'P = 20/90 + 30/90 = 5/9' }
      ],
      next: 'Shartli ehtimollik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi savol: tanlangan oʻquvchi mantini yoqtirishi aniq boʻlsa, uning palovni ham yoqtirish ehtimolligi qancha? Endi faqat 16 ta manti ishqibozlari ichidan tanlaymiz, ulardan 6 nafari palovni ham yoqtiradi: 6 boʻlinsin 16, sakkizdan uch. Bu shartli ehtimollik, P(A | B) — B roʻy bergani aniq boʻlganda A ning ehtimolligi. Formulasi: P(A | B) teng P(A va B) boʻlinsin P(B).",
      easy: "P(palov | manti) = 6/16 = 3/8. P(A | B) = P(A ∩ B) : P(B).",
      draw: [
        { t: 'title', text: 'Shartli ehtimollik' },
        { t: 'formula', x: 6, y: 20, text: 'P(A | B) = P(A ∩ B) / P(B)' },
        { t: 'list', x: 6, y: 36, items: ['manti yoqtiradiganlar: 16', 'ulardan palovni ham: 6', 'P(palov | manti) = 6/16 = 3/8'] },
        { t: 'text', x: 6, y: 62, text: 'koʻpaytirish: P(A ∩ B) = P(B) · P(A | B)', color: 'purple', size: 's' }
      ],
      next: 'Bogʻliq boʻlmagan hodisalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar B roʻy bergani A ning ehtimolligini oʻzgartirmasa, ya'ni P(A | B) teng P(A) boʻlsa, A va B bogʻliq emas deyiladi. Bunda P(A va B) teng P(A) karra P(B). Tanga va kub birga tashlansa: gerb va 3 chiqishi — bir ikkinchi karra bir oltinchi, oʻn ikkidan bir. Agar P(A) bir ikkinchi, P(B) bir uchinchi boʻlib, ular bogʻliq boʻlmasa, P(A yoki B) teng bir ikkinchi plyus bir uchinchi minus bir oltinchi, yaʼni uchdan ikki.",
      easy: "Bogʻliq boʻlmasa: P(A ∩ B) = P(A) · P(B). Tanga va kub: 1/2 · 1/6 = 1/12.",
      draw: [
        { t: 'title', text: 'Bogʻliq boʻlmagan hodisalar' },
        { t: 'formula', x: 6, y: 20, text: 'P(A ∩ B) = P(A) · P(B)' },
        { t: 'icon', x: 12, y: 44, emoji: '🎲', size: 'l' },
        { t: 'list', x: 26, y: 36, items: ['gerb va 3: 1/2 · 1/6 = 1/12', 'P(A) = 1/2, P(B) = 1/3:', 'P(A ∪ B) = 1/2 + 1/3 − 1/6 = 2/3'] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "40 oʻquvchidan 34 nafari banan, 22 nafari olmani yoqtiradi, 2 nafari hech birini yoqtirmaydi. Demak, kamida bittasini 38 nafar yoqtiradi, ikkalasini esa 34 plyus 22 minus 38, yaʼni 18 nafar. Ikkalasini yoqtirish ehtimolligi 18 boʻlinsin 40 teng 0,45. Olmani yoqtirishi aniq boʻlsa, bananni ham yoqtirish ehtimolligi 18 boʻlinsin 22, oʻn birdan toʻqqiz.",
      easy: "Ikkalasi: 18 nafar, P = 0,45. P(banan | olma) = 18/22 = 9/11.",
      draw: [
        { t: 'title', text: 'Banan va olma' },
        { t: 'ellipse', cx: 19, cy: 42, rx: 13, ry: 13, color: 'orange' },
        { t: 'ellipse', cx: 33, cy: 42, rx: 11, ry: 11, color: 'red' },
        { t: 'text', x: 12, y: 43, text: '16', anchor: 'middle' },
        { t: 'text', x: 27.5, y: 43, text: '18', anchor: 'middle', color: 'purple' },
        { t: 'text', x: 39, y: 43, text: '4', anchor: 'middle' },
        { t: 'list', x: 50, y: 26, items: ['ikkalasi: 18/40 = 0,45', 'P(B | O) = 18/22 = 9/11'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'P(A ∪ B) = P(A) + P(B) − P(A ∩ B); birgalikda boʻlmasa, P(A ∪ B) = P(A) + P(B).',
    'Shartli ehtimollik: P(A | B) = P(A ∩ B) / P(B); bundan P(A ∩ B) = P(B) · P(A | B).',
    'A va B bogʻliq boʻlmasa, P(A | B) = P(A) va P(A ∩ B) = P(A) · P(B).'
  ],
  questions: [
    {
      id: 'p59q1',
      prompt: 'P(A) = 0,4, P(A ∪ B) = 0,9, P(A ∩ B) = 0,1. P(B) ni toping.',
      hint: '0,9 = 0,4 + P(B) − 0,1.',
      explanation: 'P(B) = 0,9 − 0,4 + 0,1 = 0,6.',
      widget: { type: 'number_answer', props: { answer: 0.6, tolerance: 0.001 } }
    },
    {
      id: 'p59q2',
      prompt: 'P(A) = 0,6, P(B) = 0,5, P(A ∪ B) = 0,9. P(A ∩ B) ni toping.',
      hint: 'P(A ∩ B) = P(A) + P(B) − P(A ∪ B).',
      explanation: '0,6 + 0,5 − 0,9 = 0,2.',
      widget: { type: 'number_answer', props: { answer: 0.2, tolerance: 0.001 } }
    },
    {
      id: 'p59q3',
      prompt: 'A va B birgalikda boʻlmagan hodisalar, P(A) = 0,45, P(A ∪ B) = 0,8. P(B) = ?',
      hint: 'Birgalikda boʻlmasa, P(A ∪ B) = P(A) + P(B).',
      explanation: '0,8 − 0,45 = 0,35.',
      widget: { type: 'number_answer', props: { answer: 0.35, tolerance: 0.001 } }
    },
    {
      id: 'p59q4',
      prompt: '1 dan 15 gacha raqamlangan chiptalardan biri olinadi. A — raqam 11 dan katta, B — 8 dan kichik. P(A ∪ B) ni toping (0,01 gacha).',
      hint: 'A: 12–15 (4 ta), B: 1–7 (7 ta), umumiy qismi yoʻq.',
      explanation: '(4 + 7)/15 = 11/15 ≈ 0,73.',
      widget: { type: 'number_answer', props: { answer: 0.7333, tolerance: 0.005 } }
    },
    {
      id: 'p59q5',
      prompt: 'X va Y bogʻliq emas, P(X) = 0,5, P(Y) = 0,7. Ikkalasi ham roʻy berish ehtimolligi?',
      hint: 'P(X) · P(Y).',
      explanation: '0,5 · 0,7 = 0,35.',
      widget: { type: 'number_answer', props: { answer: 0.35, tolerance: 0.001 } }
    },
    {
      id: 'p59q6',
      prompt: 'Shu X va Y (P(X) = 0,5, P(Y) = 0,7) uchun «na X, na Y roʻy bermadi» hodisasining ehtimolligi?',
      hint: '(1 − 0,5) · (1 − 0,7).',
      explanation: '0,5 · 0,3 = 0,15.',
      widget: { type: 'number_answer', props: { answer: 0.15, tolerance: 0.001 } }
    },
    {
      id: 'p59q7',
      prompt: 'P(R) = 0,4, P(S) = 0,5, P(R ∪ S) = 0,7. R va S bogʻliqmi?',
      hint: 'P(R ∩ S) ni toping va P(R) · P(S) bilan solishtiring.',
      explanation: 'P(R ∩ S) = 0,4 + 0,5 − 0,7 = 0,2 = 0,4 · 0,5 — bogʻliq emas.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Bogʻliq emas', 'Bogʻliq', 'Birgalikda emas', 'Aniqlab boʻlmaydi'], answerIndex: 0 } }
    },
    {
      id: 'p59q8',
      prompt: 'Formulani maʼnosi bilan moslang.',
      hint: '«|» — «shartida».',
      explanation: 'Qoʻshish qoidasi, shartli ehtimollik, bogʻliq boʻlmagan hodisalar koʻpaytmasi, qarama-qarshi hodisa.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'P(A) + P(B) − P(A ∩ B)', right: 'P(A ∪ B)' },
            { left: 'P(A ∩ B) / P(B)', right: 'P(A | B)' },
            { left: 'P(A) · P(B)', right: 'bogʻliq boʻlmagan A va B birga' },
            { left: '1 − P(A)', right: 'P(Ā)' }
          ]
        }
      }
    },
    {
      id: 'p59q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Palov va manti misolini eslang.',
      explanation: 'P(palov | manti) = 3/8; birgalikda boʻlmasa P(A ∩ B) = 0; bogʻliq boʻlmasa P(A | B) = P(A).',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Palov–manti misolida P(palov | manti) = 6/16.', value: true },
            { text: 'Birgalikda boʻlmagan hodisalar uchun P(A ∩ B) = P(A) · P(B) har doim.', value: false },
            { text: 'A va B bogʻliq boʻlmasa, P(A | B) = P(A).', value: true },
            { text: 'P(A | B) va P(B | A) har doim teng.', value: false }
          ]
        }
      }
    }
  ]
};
