import type { BoardLesson } from './types';

/** Darslik: 19.01 — JavaScript: script yorligʻi, document.write, oʻzgaruvchilar, maʼlumot turlari, operatorlar, satrlar, alert/prompt. */
export const INF_46: BoardLesson = {
  n: 46,
  label: '46',
  part: 11,
  title: 'JavaScript: oʻzgaruvchilar',
  section: '19.01',
  steps: [
    {
      kind: 'hook',
      say: "HTML sahifaning tuzilishini, CSS koʻrinishini beradi. Sahifani «tirik» qiladigan — tugmani bosganda javob beradigan, hisoblaydigan, xabar chiqaradigan — til JavaScript. Uning kodi HTML fayl ichida script yorligʻiga yoziladi va brauzer uni bajaradi. document.write buyrugʻi sahifaga matn chiqaradi.",
      easy: "JavaScript sahifani interaktiv qiladi. Kod <script> ichiga yoziladi.",
      draw: [],
      animTitle: 'Birinchi skript',
      anim: {
        type: 'code',
        lang: 'html',
        lines: ['<body>', '<script>', '  var ism = "Aziza";', '  document.write(', '    "Salom, " + ism);', '</script>', '</body>'],
        trace: [
          { line: 2 },
          { line: 3, vars: { ism: '"Aziza"' } },
          { line: 5, page: 'Salom, Aziza' },
          { line: 6 }
        ]
      },
      next: 'Oʻzgaruvchi nima?'
    },
    {
      kind: 'explain',
      say: "Oʻzgaruvchi — xotiradagi nomlangan joy, unda qiymat saqlanadi va oʻzgartiriladi. Nomi — identifikator. var, let yoki const bilan eʼlon qilinadi. Asosiy maʼlumot turlari: son — number, matn — string, qoʻshtirnoqda yoziladi, mantiqiy qiymat — boolean: true yoki false. typeof operatori qiymat turini koʻrsatadi. Nom harf bilan boshlanadi, boʻsh joy boʻlmaydi va katta-kichik harf farq qiladi: yosh va Yosh — ikki xil oʻzgaruvchi.",
      easy: "Oʻzgaruvchi — nomli quti. Turlari: number (son), string (matn), boolean (true/false).",
      draw: [],
      animTitle: 'Oʻzgaruvchilar va turlar',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['var yosh = 16;', 'var ism = "Bobur";', 'var talaba = true;', 'yosh = yosh + 1;', 'console.log(typeof yosh);', 'console.log(typeof ism);'],
        trace: [
          { line: 1, vars: { yosh: 16 } },
          { line: 2, vars: { ism: '"Bobur"' } },
          { line: 3, vars: { talaba: 'true' } },
          { line: 4, vars: { yosh: 17 } },
          { line: 5, out: 'number' },
          { line: 6, out: 'string' }
        ]
      },
      next: 'Qanday hisoblaymiz?'
    },
    {
      kind: 'explain',
      say: "Arifmetik operatorlar: qoʻshish, ayirish, koʻpaytirish — yulduzcha, boʻlish — chiziq, va qoldiq — foiz belgisi. Qoldiq operatori boʻlishdan qolgan qoldiqni beradi: oʻn foiz uch — bir. U son juft yoki toqligini tekshirishda qulay: son foiz ikki nolga teng boʻlsa — juft. Diqqat: plus matnlar uchun ularni ulaydi — «5» plus 3 — «53».",
      easy: "+ − * / va % (qoldiq): 10 % 3 = 1. Matn + son = ulanadi: \"5\" + 3 = \"53\".",
      draw: [],
      animTitle: 'Arifmetik operatorlar',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['var a = 10;', 'var b = 3;', 'console.log(a + b);', 'console.log(a * b);', 'console.log(a / 2);', 'console.log(a % b);', 'console.log("5" + b);'],
        trace: [
          { line: 1, vars: { a: 10 } },
          { line: 2, vars: { b: 3 } },
          { line: 3, out: '13' },
          { line: 4, out: '30' },
          { line: 5, out: '5' },
          { line: 6, out: '1   ← qoldiq' },
          { line: 7, out: '53  ← matn ulandi' }
        ]
      },
      next: 'Solishtirish-chi?'
    },
    {
      kind: 'explain',
      say: "Solishtirish operatorlari true yoki false qaytaradi: katta, kichik, katta yoki teng, kichik yoki teng, teng emas. Ikki teng belgisi qiymatni solishtiradi: 5 va «5» teng deb hisoblanadi. Uchta teng belgisi qiymatni ham, turni ham tekshiradi: son 5 va matn «5» teng emas. Mantiqiy operatorlar: va — ikki ampersand, ikkalasi rost boʻlsa rost; yoki — ikki vertikal chiziq, bittasi rost boʻlsa yetarli; inkor — undov belgisi.",
      easy: "== qiymatni, === qiymat va turni solishtiradi. && — va, || — yoki, ! — emas.",
      draw: [],
      animTitle: 'Solishtirish va mantiq',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['var x = 5;', 'console.log(x > 3);', 'console.log(x == "5");', 'console.log(x === "5");', 'console.log(x > 3 && x < 4);', 'console.log(x > 3 || x < 4);'],
        trace: [
          { line: 1, vars: { x: 5 } },
          { line: 2, out: 'true' },
          { line: 3, out: 'true   ← qiymat teng' },
          { line: 4, out: 'false  ← turi har xil' },
          { line: 5, out: 'false' },
          { line: 6, out: 'true' }
        ]
      },
      next: 'Matn bilan ishlash?'
    },
    {
      kind: 'explain',
      say: "Satr — string — bilan ishlash. length — belgilar soni. toUpperCase — bosh harflarga, toLowerCase — kichik harflarga oʻgiradi. substring boshlanish va tugash indeksi orasidagi qismni qirqib oladi; indeks noldan boshlanadi va tugash indeksidagi belgi kirmaydi. Satrlar plus bilan ulanadi.",
      easy: "length — uzunlik, toUpperCase — BOSH harf, substring(0, 3) — dastlabki 3 belgi.",
      draw: [],
      animTitle: 'Satrlar',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['var s = "Toshkent";', 'console.log(s.length);', 'console.log(s.toUpperCase());', 'console.log(s.substring(0, 4));', 'console.log(s + " shahri");'],
        trace: [
          { line: 1, vars: { s: '"Toshkent"' } },
          { line: 2, out: '8' },
          { line: 3, out: 'TOSHKENT' },
          { line: 4, out: 'Tosh' },
          { line: 5, out: 'Toshkent shahri' }
        ]
      },
      next: 'Foydalanuvchi bilan muloqot?'
    },
    {
      kind: 'explain',
      say: "Foydalanuvchi bilan muloqot uchun uchta oyna bor. alert xabar chiqaradi. prompt savol beradi va kiritilgan javobni matn sifatida qaytaradi — son kerak boʻlsa, Number yoki parseInt bilan aylantiriladi. confirm «OK» yoki «Bekor qilish» tanlovini beradi va true yoki false qaytaradi.",
      easy: "alert — xabar. prompt — savol, javob matn. confirm — OK (true) yoki Bekor (false).",
      draw: [],
      animTitle: 'alert, prompt va confirm',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['var y = prompt("Yoshingiz?");', 'y = Number(y);', 'alert("Keyingi yil " + (y + 1));', 'var ok = confirm("Davom?");'],
        trace: [
          { line: 1, vars: { y: '"16"' }, out: '❓ prompt: 16 kiritildi' },
          { line: 2, vars: { y: 16 } },
          { line: 3, out: '💬 alert: Keyingi yil 17' },
          { line: 4, vars: { ok: 'true' }, out: '✅ confirm: OK bosildi' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'JavaScript sahifani interaktiv qiladi; kod <script> yorligʻi ichiga yoziladi; document.write sahifaga chiqaradi.',
    'Oʻzgaruvchi — nomli xotira joyi (var, let, const); turlar: number, string, boolean.',
    'Operatorlar: + − * / va % (qoldiq); matn + son — ulanadi ("5" + 3 = "53").',
    '== qiymatni, === qiymat va turni solishtiradi; && — va, || — yoki, ! — emas.',
    'Satrlar: length, toUpperCase, substring; muloqot: alert, prompt (matn qaytaradi), confirm (true/false).'
  ],
  questions: [
    {
      id: 'i46q1',
      prompt: 'console.log(17 % 5) nimani chiqaradi?',
      hint: '17 ni 5 ga boʻlganda qoldiq.',
      explanation: '17 = 3 × 5 + 2, qoldiq 2.',
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'i46q2',
      prompt: 'console.log("7" + 2) nimani chiqaradi?',
      hint: 'Matn + son.',
      explanation: 'Plus matnni ulaydi: "72".',
      widget: { type: 'text_answer', props: { answer: ['72', '"72"'], width: 5 } }
    },
    {
      id: 'i46q3',
      prompt: 'Qiymatni turi bilan joylang.',
      hint: 'Qoʻshtirnoq — matn.',
      explanation: '42 va 3.5 — number; "salom" va "42" — string; true — boolean.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'n', label: 'number' },
            { id: 's', label: 'string' },
            { id: 'b', label: 'boolean' }
          ],
          tiles: [
            { id: 't1', label: '42', bin: 'n' },
            { id: 't2', label: '"salom"', bin: 's' },
            { id: 't3', label: 'true', bin: 'b' },
            { id: 't4', label: '"42"', bin: 's' },
            { id: 't5', label: '3.5', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'i46q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: '=== turni ham tekshiradi.',
      explanation: '5 === "5" — false; 5 == "5" — true; prompt matn qaytaradi; yosh va Yosh — har xil.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '5 === "5" natijasi true.', value: false },
            { text: '5 == "5" natijasi true.', value: true },
            { text: 'prompt kiritilgan javobni matn (string) sifatida qaytaradi.', value: true },
            { text: 'JavaScriptda yosh va Yosh — bitta oʻzgaruvchi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i46q5',
      prompt: 'var s = "Informatika"; console.log(s.length) nimani chiqaradi?',
      hint: 'Harflarni sanang.',
      explanation: 'I-n-f-o-r-m-a-t-i-k-a — 11 ta belgi.',
      widget: { type: 'number_answer', props: { answer: 11 } }
    },
    {
      id: 'i46q6',
      prompt: 'Buyruqni vazifasi bilan juftlang.',
      hint: 'Oyna turlari va sahifaga chiqarish.',
      explanation: 'alert — xabar; prompt — savol va javob; confirm — OK/Bekor; document.write — sahifaga yozish.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'alert' }, right: { label: 'xabar oynasi' } },
            { left: { label: 'prompt' }, right: { label: 'savol berib javob olish' } },
            { left: { label: 'confirm' }, right: { label: 'OK yoki Bekor qilish' } },
            { left: { label: 'document.write' }, right: { label: 'sahifaga matn yozish' } }
          ]
        }
      }
    },
    {
      id: 'i46q7',
      prompt: 'var a = 4; a = a * 3; a = a - 2; Oxirida a nechaga teng?',
      hint: 'Qatorma-qator bajaring.',
      explanation: '4 × 3 = 12; 12 − 2 = 10.',
      widget: { type: 'number_answer', props: { answer: 10 } }
    },
    {
      id: 'i46q8',
      prompt: 'Qaysi oʻzgaruvchi nomi notoʻgʻri?',
      hint: 'Nom raqam bilan boshlanmaydi va boʻsh joy boʻlmaydi.',
      explanation: '2ism — raqam bilan boshlangan, notoʻgʻri. ism, yosh2 va umumiyBall — toʻgʻri.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'ism' }, { text: 'yosh2' }, { text: 'umumiyBall' }, { text: '2ism', odd: true }] } }
    },
    {
      id: 'i46q9',
      prompt: '"Samarqand".substring(0, 3) nimani qaytaradi?',
      hint: '0, 1, 2-indeksdagi belgilar.',
      explanation: 'S-a-m — "Sam".',
      widget: { type: 'text_answer', props: { answer: ['Sam', '"Sam"'], width: 6 } }
    },
    {
      id: 'i46q10',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Va, yoki.',
      explanation: 'Ikkala shart rost boʻlishi kerak — && (va); bittasi yetarli — || (yoki).',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Ikkala shart rost boʻlsa rost —' }, { blank: '&&' }, { text: '. Kamida bittasi rost boʻlsa yetarli —' }, { blank: '||' }, { text: '.' }],
          bank: ['&&', '||', '%']
        }
      }
    }
  ]
};
