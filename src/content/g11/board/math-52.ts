import type { BoardLesson } from './types';

/** Darslik (2-qism): 65–67-mavzu (45–53-betlar) — oʻrta qiymat, moda, mediana, oʻzgarish kengligi. */
export const MATH_52: BoardLesson = {
  n: 52,
  label: '65–66',
  part: 'algebra',
  qism: 2,
  title: 'Oʻrta qiymat, moda va mediana',
  section: '65–67',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "12 nafar oʻquvchining boʻyi oʻlchandi: 168, 159, 181, 172 va hokazo. Oʻrtacha boʻy qancha? Hammasini qoʻshamiz — 2004 chiqadi, 12 ga boʻlamiz — 167 santimetr. Eng baland 181, eng past 154, ularning ayirmasi 27 santimetr — bu oʻzgarish kengligi.",
      easy: "Oʻrta qiymat = yigʻindi : soni = 2004 : 12 = 167. Oʻzgarish kengligi 181 − 154 = 27.",
      draw: [
        { t: 'title', text: 'Oʻrtacha boʻy' },
        { t: 'text', x: 6, y: 22, text: '168, 159, 181, 172, 161, 163, 164, 170, 169, 154, 168, 175', size: 's' },
        { t: 'formula', x: 6, y: 34, text: 'x̄ = 2004 : 12 = 167 cm' },
        { t: 'text', x: 6, y: 54, text: 'oʻzgarish kengligi: 181 − 154 = 27 cm', color: 'purple' }
      ],
      next: 'Moda'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻquvchining chorakdagi baholari: 5, 3, 4, 2, 5, 5, 4, 3, 3, 5. Oʻrtacha baho 39 boʻlinsin 10, yaʼni 3,9 — yaxlitlab 4. Eng koʻp uchragan baho esa 5: u toʻrt marta uchragan. Eng koʻp uchraydigan varianta moda deyiladi. Qatorda ikkita moda ham boʻlishi mumkin.",
      easy: "Moda — eng koʻp uchragan qiymat. Bu yerda 5.",
      draw: [
        { t: 'title', text: 'Moda' },
        { t: 'text', x: 6, y: 22, text: '5, 3, 4, 2, 5, 5, 4, 3, 3, 5' },
        { t: 'list', x: 6, y: 34, items: ['oʻrta qiymat: 39 : 10 = 3,9', 'moda: 5 (4 marta)'] },
        { t: 'bars', x: 60, y: 18, w: 34, h: 36, items: [{ label: '2', value: 1 }, { label: '3', value: 3 }, { label: '4', value: 2 }, { label: '5', value: 4 }], color: 'green' }
      ],
      next: 'Mediana'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Mediana — variatsion qatorning oʻrtasida turgan son. Avval qatorni tartiblaymiz. Hadlar soni toq boʻlsa, mediana n plyus 1 boʻlinsin 2 -had. Juft boʻlsa, oʻrtadagi ikki hadning oʻrta arifmetigi. Masalan, 3, 4, 5, 5, 5, 6, 6, 6, 7 — 9 ta had, 5-had 5 ga teng. 12, 13, 13, 14, 15, 15, 15, 16, 17, 18 — 10 ta had, 5- va 6-hadlar 15 va 15, mediana 15.",
      easy: "Tartiblaymiz va oʻrtadagisini olamiz. Juft boʻlsa — oʻrtadagi ikkitasining oʻrtachasi.",
      draw: [
        { t: 'title', text: 'Mediana' },
        { t: 'text', x: 6, y: 22, text: 'n toq: (n + 1)/2 -had', color: 'blue' },
        { t: 'text', x: 6, y: 30, text: '3, 4, 5, 5, [5], 6, 6, 6, 7 → Me = 5', size: 's' },
        { t: 'text', x: 6, y: 44, text: 'n juft: oʻrtadagi ikki had oʻrtachasi', color: 'blue' },
        { t: 'text', x: 6, y: 52, text: '12, 13, 13, 14, [15, 15], 15, 16, 17, 18 → Me = 15', size: 's' }
      ],
      next: 'Chastotalar jadvalidan'
    },
    {
      kind: 'example',
      clear: true,
      say: "Maʼlumotlar chastotalar jadvalida berilsa, har bir qiymatni chastotasiga koʻpaytirib qoʻshamiz va hajmga boʻlamiz: 278 boʻlinsin 40 teng 6,95. Medianani topish uchun yigʻma chastotani hisoblaymiz: 1, 2, 5, 12, 27... 20- va 21-hadlar 13 dan 27 gacha boʻlgan hadlar ichida, ular 7 ga teng. Demak, mediana 7.",
      easy: "x̄ = Σnᵢxᵢ : n = 278 : 40 = 6,95. Yigʻma chastotadan mediana 7.",
      draw: [
        { t: 'title', text: 'Chastotali jadval' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['xᵢ', '3', '4', '5', '6', '7', '8', '9'],
            ['nᵢ', '1', '1', '3', '7', '15', '8', '5'],
            ['yigʻma', '1', '2', '5', '12', '27', '35', '40']
          ]
        },
        { t: 'formula', x: 6, y: 44, text: 'x̄ = (n₁x₁ + … + nₖxₖ) : n = 278 : 40 = 6,95' },
        { t: 'text', x: 6, y: 62, text: '20- va 21-hadlar = 7 → Me = 7', color: 'green' }
      ],
      next: 'Oraliqlar boʻlsa'
    },
    {
      kind: 'example',
      clear: true,
      say: "Maʼlumotlar oraliqlar boʻyicha berilsa, har bir oraliqning oʻrtasini olamiz. Firma ishchilari: 21–25 yoshli 11 nafar, oʻrtasi 23; 26–30 yoshli 14 nafar, oʻrtasi 28 va hokazo. Koʻpaytmalar yigʻindisi 5161, ishchilar 137 nafar. Oʻrtacha yosh taxminan 37,7.",
      easy: "Oraliq oʻrtasini qiymat deb olamiz: 5161 : 137 ≈ 37,7 yosh.",
      draw: [
        { t: 'title', text: 'Oraliq oʻrtasi bilan' },
        {
          t: 'table',
          x: 6,
          y: 18,
          rows: [
            ['yosh', '21–25', '26–30', '31–35', '36–40', '41–45', '46–50', '51–55'],
            ['oʻrtasi', '23', '28', '33', '38', '43', '48', '53'],
            ['nᵢ', '11', '14', '32', '27', '29', '17', '7']
          ]
        },
        { t: 'formula', x: 6, y: 46, text: 'x̄ ≈ 5161 : 137 ≈ 37,7' }
      ],
      next: 'Qaysi biri yaxshiroq?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "A va B qatorlar faqat oxirgi soni bilan farq qiladi: 10 oʻrniga 15. Oʻrta qiymat 6,46 dan 6,85 ga oʻsdi, mediana esa ikkalasida 7. Oʻrta qiymat juda katta yoki kichik qiymatlarga sezgir, mediana esa yoʻq. Shuning uchun, masalan, maoshlar haqida gapirganda mediana koʻproq maʼno beradi.",
      easy: "Bitta katta son oʻrta qiymatni oʻzgartiradi, medianani esa oʻzgartirmaydi.",
      draw: [
        { t: 'title', text: 'Oʻrta qiymat yoki mediana?' },
        { t: 'text', x: 6, y: 22, text: 'A: 3, 4, 4, 5, 6, 6, 7, 7, 7, 8, 8, 9, 10', size: 's' },
        { t: 'text', x: 6, y: 30, text: 'B: 3, 4, 4, 5, 6, 6, 7, 7, 7, 8, 8, 9, 15', size: 's', color: 'red' },
        {
          t: 'table',
          x: 8,
          y: 38,
          rows: [
            ['', 'x̄', 'Me'],
            ['A', '≈ 6,46', '7'],
            ['B', '≈ 6,85', '7']
          ]
        }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Oʻrta qiymat = hadlar yigʻindisi : hadlar soni; chastotali jadvalda x̄ = Σnᵢxᵢ : n.',
    'Moda — eng koʻp uchraydigan qiymat; mediana — variatsion qatorning oʻrtasidagi qiymat.',
    'Oʻzgarish kengligi = eng katta − eng kichik; mediana chetki qiymatlarga sezgir emas.'
  ],
  questions: [
    {
      id: 'p52q1',
      prompt: 'Olim 15 kun yegan olmalari: 2, 3, 1, 1, 0, 0, 4, 3, 0, 1, 2, 3, 2, 1, 4. Oʻrta qiymatni toping.',
      hint: 'Yigʻindi : 15.',
      explanation: 'Yigʻindi 27, 27 : 15 = 1,8.',
      widget: { type: 'number_answer', props: { answer: 1.8, tolerance: 0.01 } }
    },
    {
      id: 'p52q2',
      prompt: 'Shu qatorning (2, 3, 1, 1, 0, 0, 4, 3, 0, 1, 2, 3, 2, 1, 4) modasi?',
      hint: 'Qaysi son eng koʻp uchragan?',
      explanation: '1 toʻrt marta uchragan — moda 1.',
      widget: { type: 'number_answer', props: { answer: 1 } }
    },
    {
      id: 'p52q3',
      prompt: 'Shu qatorning medianasi?',
      hint: 'Tartiblang: 0, 0, 0, 1, 1, 1, 1, 2, … — 8-had.',
      explanation: '0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4 — 8-had 2.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'p52q4',
      prompt: 'Basketbol jamoasi 4 ta oʻyinda 43, 55, 41 va 37 ochko oldi. Oʻrtacha ochko saqlanishi uchun 5-oʻyinda necha ochko olishi kerak?',
      hint: 'Avval oʻrtachani toping.',
      explanation: '(43 + 55 + 41 + 37) : 4 = 44. 5-oʻyinda ham 44 ochko kerak.',
      widget: { type: 'number_answer', props: { answer: 44 } }
    },
    {
      id: 'p52q5',
      prompt: '3 ta tanga 30 marta tashlandi. Gerblar soni: 0 — 4 marta, 1 — 12 marta, 2 — 11 marta, 3 — 3 marta. Oʻrta qiymatni toping (0,01 gacha).',
      hint: '(0·4 + 1·12 + 2·11 + 3·3) : 30.',
      explanation: '43 : 30 ≈ 1,43.',
      widget: { type: 'number_answer', props: { answer: 1.43, tolerance: 0.01 } }
    },
    {
      id: 'p52q6',
      prompt: 'Test natijalari: 0–9 ball — 2, 10–19 — 5, 20–29 — 7, 30–39 — 27, 40–49 — 9 oʻquvchi. Oraliq oʻrtalari (4,5; 14,5; …) yordamida oʻrtacha ballni taqriban toping.',
      hint: 'Σnᵢxᵢ : 50.',
      explanation: '9 + 72,5 + 171,5 + 931,5 + 400,5 = 1585; 1585 : 50 = 31,7.',
      widget: { type: 'number_answer', props: { answer: 31.7, tolerance: 0.05 } }
    },
    {
      id: 'p52q7',
      prompt: 'Kattalikni taʼrifi bilan moslang.',
      hint: 'Moda — eng koʻp.',
      explanation: 'Oʻrta qiymat — yigʻindi : soni; moda — eng koʻp uchragan; mediana — oʻrtadagi; oʻzgarish kengligi — max − min.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'Oʻrta qiymat' }, b: { label: 'yigʻindi : soni' } },
            { a: { label: 'Moda' }, b: { label: 'eng koʻp uchragan' } },
            { a: { label: 'Mediana' }, b: { label: 'oʻrtadagi had' } },
            { a: { label: 'Oʻzgarish kengligi' }, b: { label: 'max − min' } }
          ]
        }
      }
    },
    {
      id: 'p52q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'A va B qatorlarni eslang.',
      explanation: 'Oʻrta qiymat qatorga tegishli boʻlmasligi mumkin; qatorda ikkita moda boʻlishi mumkin; mediana chetki qiymatga sezgir emas.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻrta qiymat albatta qatordagi sonlardan biri boʻladi.', value: false },
            { text: 'Qatorning ikkita modasi boʻlishi mumkin.', value: true },
            { text: 'Bitta juda katta qiymat medianadan koʻra oʻrta qiymatni koʻproq oʻzgartiradi.', value: true },
            { text: 'Hadlar soni juft boʻlsa, mediana mavjud emas.', value: false }
          ]
        }
      }
    },
    {
      id: 'p52q9',
      prompt: '168, 159, 181, 172, 161, 163, 164, 170, 169, 154, 168, 175 qatorining oʻzgarish kengligi?',
      hint: 'Eng katta − eng kichik.',
      explanation: '181 − 154 = 27.',
      widget: { type: 'number_answer', props: { answer: 27 } }
    }
  ]
};
