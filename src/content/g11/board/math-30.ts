import type { BoardLesson } from './types';

/** Darslik: Geometriya, 2-mavzu (126–129-betlar) — vektorlarning skalyar koʻpaytmasi. */
export const MATH_30: BoardLesson = {
  n: 30,
  label: "2.4",
  part: 'geometriya',
  title: "Skalyar koʻpaytmani oʻrganish",
  section: 'Geometriya, 2',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Chanani arqon bilan tortib ketyapsiz. Arqon yerga nisbatan qiya, shuning uchun kuchning hammasi oldinga harakatga ketmaydi — bir qismi chanani yuqoriga tortadi. Bajarilgan ish: kuch karra yoʻl karra ular orasidagi burchak kosinusi. Bu ikki vektorning skalyar koʻpaytmasi.",
      easy: "Qiya tortilgan arqonda kuchning faqat bir qismi ish bajaradi. Ish = F · s · cos φ.",
      draw: [
        { t: 'title', text: 'Chana va ish' },
        { t: 'icon', x: 14, y: 50, emoji: '🛷', size: 'l' },
        { t: 'point', id: 'a', x: 24, y: 50, hide: true },
        { t: 'point', id: 'b', x: 54, y: 30, label: 'F', hide: true },
        { t: 'point', id: 'c', x: 64, y: 50, label: 's', hide: true },
        { t: 'line', from: 'a', to: 'b', arrow: true, color: 'red' },
        { t: 'line', from: 'a', to: 'c', arrow: true, color: 'blue' },
        { t: 'text', x: 34, y: 46, text: 'φ', color: 'orange' },
        { t: 'box', id: 'r', x: 66, y: 22, w: 30, h: 12, text: 'A = F·s·cos φ', color: 'green' }
      ],
      next: 'Taʼrifi qanday?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikki vektorning skalyar koʻpaytmasi — ularning uzunliklari va orasidagi burchak kosinusining koʻpaytmasi. Natija vektor emas, son! Agar vektorlar perpendikulyar boʻlsa, kosinus 90 gradus nolga teng, demak skalyar koʻpaytma ham nol. Va aksincha: skalyar koʻpaytma nol boʻlsa, vektorlar perpendikulyar.",
      easy: "Skalyar koʻpaytma — son: uzunliklar karra kosinus. Perpendikulyar vektorlar uchun u nolga teng.",
      draw: [
        { t: 'title', text: 'Taʼrif' },
        { t: 'formula', x: 10, y: 22, text: 'a · b = |a|·|b|·cos φ' },
        { t: 'list', x: 6, y: 40, items: ['natija — son', 'a ⊥ b  ⇔  a · b = 0', 'a · a = |a|²'] }
      ],
      next: 'Koordinatalarda'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Koordinatalarda skalyar koʻpaytma juda oddiy: mos koordinatalar koʻpaytmalarining yigʻindisi, a1 b1 plyus a2 b2 plyus a3 b3. Undan vektorlar orasidagi burchak kosinusi chiqadi: skalyar koʻpaytmani uzunliklar koʻpaytmasiga boʻlamiz. Perpendikulyarlik sharti: a1 b1 plyus a2 b2 plyus a3 b3 teng nol.",
      easy: "Mos koordinatalarni koʻpaytirib qoʻshamiz. Burchak kosinusi — shu sonni uzunliklarga boʻlamiz.",
      draw: [
        { t: 'title', text: 'Koordinatalar orqali' },
        { t: 'formula', x: 6, y: 20, text: 'a · b = a₁b₁ + a₂b₂ + a₃b₃' },
        { t: 'formula', x: 6, y: 36, text: 'cos φ = (a · b) / (|a|·|b|)' },
        { t: 'text', x: 6, y: 56, text: 'a ⊥ b:  a₁b₁ + a₂b₂ + a₃b₃ = 0', color: 'red' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Darslikdagi 4-masala: a(1; 2; 0) va b(1; minus yarim; 0) orasidagi burchak. Skalyar koʻpaytma: 1 karra 1 plyus 2 karra minus yarim plyus 0, yaʼni 0. Demak, burchak 90 gradus. 3-masalada esa AB(1; minus 2; 3) va CD(minus 1; minus 4; 1): skalyar koʻpaytma 10, uzunliklar ildiz 14 va ildiz 18, kosinus 5 boʻlinsin ildiz 63.",
      easy: "Skalyar koʻpaytma 0 chiqdi — vektorlar perpendikulyar, burchak 90 gradus.",
      draw: [
        { t: 'title', text: 'Burchakni topamiz' },
        { t: 'text', x: 6, y: 20, text: 'a(1; 2; 0),  b(1; −½; 0)' },
        { t: 'formula', x: 6, y: 30, text: 'a · b = 1 − 1 + 0 = 0  →  φ = 90°' },
        { t: 'text', x: 6, y: 48, text: 'AB(1; −2; 3), CD(−1; −4; 1):', size: 's' },
        { t: 'text', x: 6, y: 56, text: 'AB · CD = −1 + 8 + 3 = 10,  cos φ = 5/√63', size: 's', color: 'blue' }
      ],
      next: 'Uzunlik va burchak berilsa'
    },
    {
      kind: 'example',
      clear: true,
      say: "5-masala: modul a teng 3, modul b teng 5, orasidagi burchak 120 gradus. a plyus b ning uzunligi? Kvadratga oshiramiz: a kvadrat plyus 2 a b plyus b kvadrat. a b teng 3 karra 5 karra minus yarim, yaʼni minus 7,5. Shunda 9 minus 15 plyus 25 teng 19. Javob: ildiz 19.",
      easy: "Yigʻindining kvadrati: 9 plyus 25 plyus 2 karra minus 7,5. Natija 19, javob ildiz 19.",
      draw: [
        { t: 'title', text: '|a + b| = ?' },
        { t: 'text', x: 6, y: 20, text: '|a| = 3,  |b| = 5,  φ = 120°' },
        { t: 'list', x: 6, y: 30, items: ['|a + b|² = a² + 2a·b + b²', 'a·b = 3·5·(−½) = −7,5', '= 9 − 15 + 25 = 19'] },
        { t: 'box', id: 'r', x: 6, y: 54, w: 40, h: 11, text: '|a + b| = √19', color: 'green' }
      ],
      next: 'Xossalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Skalyar koʻpaytmaning xossalari: oʻrin almashtirish, a b teng b a; taqsimot, a plyus b karra c teng a c plyus b c; sonni chiqarish mumkin. Shuning uchun qavslarni koʻphaddek ochish mumkin. 7-masala: a b teng 3, a kvadrat 3, b kvadrat 4 boʻlsa, 2a plyus 3b karra minus 2a plyus b teng minus 4 karra 3 minus 4 karra 3 plyus 3 karra 4, yaʼni minus 12.",
      easy: "Qavslarni koʻphad kabi ochamiz, a kvadrat oʻrniga uzunlik kvadratini qoʻyamiz.",
      draw: [
        { t: 'title', text: 'Xossalar' },
        { t: 'list', x: 6, y: 18, items: ['a · b = b · a', '(a + b) · c = a · c + b · c', '(λa) · b = λ(a · b)', 'a · a = |a|²'] },
        { t: 'text', x: 6, y: 52, text: '(2a + 3b)(−2a + b) = −4a² − 4a·b + 3b²', size: 's', color: 'blue' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'a · b = |a|·|b|·cos φ = a₁b₁ + a₂b₂ + a₃b₃ — natija son.',
    'cos φ = (a · b)/(|a|·|b|); a ⊥ b ⇔ a · b = 0.',
    'Ish A = F · s; qavslar koʻphaddek ochiladi, a · a = |a|².'
  ],
  questions: [
    {
      id: 'm30q1',
      prompt: 'a(1; 2; 3) va b(4; −1; 2) vektorlarning skalyar koʻpaytmasini toping.',
      hint: '1·4 + 2·(−1) + 3·2.',
      explanation: '4 − 2 + 6 = 8.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'm30q2',
      prompt: 'Jism siljish yoʻnalishiga 60° burchak ostida qoʻyilgan 50 N kuch taʼsirida 8 m siljidi. Bajarilgan ishni toping (J).',
      hint: 'A = F·s·cos 60°.',
      explanation: '50 · 8 · ½ = 200 J.',
      widget: { type: 'number_answer', props: { answer: 200, unit: 'J' } }
    },
    {
      id: 'm30q3',
      prompt: 'a(2; x; 1) va b(1; 3; −5) vektorlar perpendikulyar. x ni toping.',
      hint: '2 + 3x − 5 = 0.',
      explanation: '3x = 3 → x = 1.',
      widget: { type: 'number_answer', props: { answer: 1 } }
    },
    {
      id: 'm30q4',
      prompt: 'a(1; 0; 0) va b(1; 1; 0) vektorlar orasidagi burchakni gradusda toping.',
      hint: 'cos φ = 1/(1 · √2).',
      explanation: 'cos φ = √2/2 → φ = 45°.',
      widget: { type: 'number_answer', props: { answer: 45, unit: '°' } }
    },
    {
      id: 'm30q5',
      prompt: 'Vektorlar orasidagi burchak qanday? Skalyar koʻpaytma ishorasiga qarab guruhlang.',
      hint: 'Musbat — oʻtkir, nol — toʻgʻri, manfiy — oʻtmas.',
      explanation: 'a·b > 0 — oʻtkir burchak; = 0 — toʻgʻri burchak; < 0 — oʻtmas burchak.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'o', label: 'Oʻtkir' },
            { id: 't', label: 'Toʻgʻri' },
            { id: 'm', label: 'Oʻtmas' }
          ],
          items: [
            { emoji: '', label: '(1; 2; 0) va (2; 1; 0)', bin: 'o' },
            { emoji: '', label: '(3; 1; 1) va (1; 1; 1)', bin: 'o' },
            { emoji: '', label: '(1; 0; 0) va (0; 5; 0)', bin: 't' },
            { emoji: '', label: '(2; −1; 1) va (1; 2; 0)', bin: 't' },
            { emoji: '', label: '(1; 1; 0) va (−2; −1; 3)', bin: 'm' },
            { emoji: '', label: '(1; −2; 1) va (−1; 1; 0)', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'm30q6',
      prompt: '|a| = 3, |b| = 4 va ular orasidagi burchak 60°. a · b ni toping.',
      hint: '3 · 4 · cos 60°.',
      explanation: '12 · ½ = 6.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'm30q7',
      prompt: 'Gapni toʻldiring.',
      hint: 'Perpendikulyar vektorlarda cos 90° = 0.',
      explanation: 'a · b = |a|·|b|·cos φ; perpendikulyar vektorlar uchun a · b = 0.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'a · b = |a|·|b|·' }, { blank: 'cos φ' }, { text: '. Vektorlar perpendikulyar boʻlsa, a · b = ' }, { blank: '0' }, { text: '.' }],
          bank: ['cos φ', 'sin φ', '0', '1']
        }
      }
    },
    {
      id: 'm30q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Skalyar koʻpaytma — son.',
      explanation: 'Natija son; a·b = b·a; a·a = |a|²; qarama-qarshi yoʻnalgan vektorlarda a·b = −|a||b| < 0.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Skalyar koʻpaytma natijasi — vektor.', value: false },
            { text: 'a · b = b · a.', value: true },
            { text: 'a · a = |a|².', value: true },
            { text: 'Qarama-qarshi yoʻnalgan vektorlarning skalyar koʻpaytmasi musbat.', value: false }
          ]
        }
      }
    }
  ]
};
