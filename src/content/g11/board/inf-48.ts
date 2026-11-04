import type { BoardLesson } from './types';

/** Darslik: 19.01 — JavaScript: funksiyalar, parametr va return, hodisalar (onclick), getElementById/innerHTML, forma, try…catch. */
export const INF_48: BoardLesson = {
  n: 48,
  label: '48',
  part: 11,
  title: 'JavaScript: funksiyalar va sahifa',
  section: '19.01–19.02',
  steps: [
    {
      kind: 'hook',
      say: "Funksiya — oʻz nomi bor kod boʻlagi; u bitta vazifani bajaradi va kerak boʻlganda chaqiriladi. Bir marta yozib, koʻp marta ishlatamiz. Funksiya qavs ichida parametrlar oladi va return bilan natija qaytaradi. Chaqirishda parametrlar oʻrniga aniq qiymatlar — argumentlar — beriladi.",
      easy: "function nom(a, b) { return … } — bir marta yozib, koʻp marta chaqiramiz.",
      draw: [],
      animTitle: 'Funksiya va return',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['function yuza(a, b) {', '  return a * b;', '}', 'var s1 = yuza(4, 5);', 'var s2 = yuza(3, 3);', 'console.log(s1 + s2);'],
        trace: [
          { line: 4, vars: { a: 4, b: 5 }, out: 'yuza(4, 5) chaqirildi' },
          { line: 2, out: 'return 20' },
          { line: 4, vars: { s1: 20 } },
          { line: 5, vars: { a: 3, b: 3 } },
          { line: 2, out: 'return 9' },
          { line: 5, vars: { s2: 9 } },
          { line: 6, out: '29' }
        ]
      },
      next: 'Sahifa bilan qanday bogʻlanadi?'
    },
    {
      kind: 'explain',
      say: "Sahifadagi elementga id beriladi. document.getElementById shu id boʻyicha elementni topadi, innerHTML esa uning ichidagi matnni oʻqiydi yoki almashtiradi. Hodisalar — foydalanuvchi harakatlari: onclick — bosish, onchange — qiymat oʻzgarishi, onmouseover — sichqoncha ustiga kelishi. Tugmaning onclick xususiyatiga funksiya nomi yoziladi va bosilganda funksiya ishlaydi.",
      easy: "getElementById(\"id\") — elementni topadi. innerHTML — ichidagi matn. onclick — bosilganda.",
      draw: [],
      animTitle: 'Tugma bosilganda',
      anim: {
        type: 'code',
        lang: 'html',
        lines: ['<p id="xabar">Salom</p>', '<button onclick="bos()">', '  Bosing</button>', '<script>', 'var n = 0;', 'function bos() {', '  n = n + 1;', '  document.getElementById(', '    "xabar").innerHTML =', '    n + " marta bosildi";', '}', '</script>'],
        trace: [
          { line: 1, page: 'Salom   [ Bosing ]' },
          { line: 5, vars: { n: 0 } },
          { line: 2, out: '🖱️ tugma bosildi' },
          { line: 7, vars: { n: 1 } },
          { line: 9, page: '1 marta bosildi   [ Bosing ]' },
          { line: 2, out: '🖱️ yana bosildi' },
          { line: 7, vars: { n: 2 } },
          { line: 9, page: '2 marta bosildi   [ Bosing ]' }
        ]
      },
      next: 'Formadan maʼlumot olish?'
    },
    {
      kind: 'explain',
      say: "Forma maydonidagi qiymat value xususiyati bilan olinadi. Masalan, ism va familiya kiritilgach, tugma bosilganda funksiya ularni oʻqiydi, ismning birinchi harfini substring bilan oladi, familiyani qoʻshib login yasaydi va natijani sahifaga chiqaradi. Maydon qiymati har doim matn boʻladi.",
      easy: "getElementById(\"ism\").value — maydondagi matn. Funksiya uni qayta ishlab, sahifaga chiqaradi.",
      draw: [],
      animTitle: 'Formadan login yasash',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['function login() {', '  var i = getVal("ism");', '  var f = getVal("fam");', '  var u = i.substring(0, 1)', '        + f + "7";', '  show(u.toLowerCase());', '}'],
        trace: [
          { line: 1, page: 'Ism: [Aziza]  Familiya: [Karimova]  [Login]' },
          { line: 2, vars: { i: '"Aziza"' } },
          { line: 3, vars: { f: '"Karimova"' } },
          { line: 5, vars: { u: '"AKarimova7"' } },
          { line: 6, page: 'Login: akarimova7' }
        ]
      },
      next: 'Xato boʻlsa-chi?'
    },
    {
      kind: 'explain',
      say: "Foydalanuvchi notoʻgʻri maʼlumot kiritsa, dastur buzilmasligi kerak. try blokida xavfli kod bajariladi; xato yuz bersa, dastur toʻxtamaydi — boshqaruv catch blokiga oʻtadi va tushunarli xabar chiqariladi. throw buyrugʻi bilan oʻzimiz xato «otishimiz» mumkin: masalan, yosh son boʻlmasa yoki manfiy boʻlsa.",
      easy: "try { … } catch (e) { … } — xato boʻlsa dastur yiqilmaydi, catch xabar chiqaradi.",
      draw: [],
      animTitle: 'try … catch',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['var y = Number("abc");', 'try {', '  if (isNaN(y))', '    throw "Son kiriting!";', '  show("Yosh: " + y);', '} catch (e) {', '  show("⛔ " + e);', '}'],
        trace: [
          { line: 1, vars: { y: 'NaN' } },
          { line: 3, out: 'isNaN(NaN) ? true' },
          { line: 4, out: 'throw ➜ catch ga oʻtildi' },
          { line: 7, vars: { e: '"Son kiriting!"' }, page: '⛔ Son kiriting!' }
        ]
      },
      next: 'JavaScript nima beradi?'
    },
    {
      kind: 'explain',
      say: "JavaScriptning afzalliklari: brauzerda ishlaydi, hech narsa oʻrnatish shart emas; sahifa server javobini kutmasdan darhol javob beradi; formani yuborishdan oldin tekshiradi; animatsiya, oʻyinlar, kalkulyatorlar va interaktiv menyular yaratadi. Kamchiligi: kod foydalanuvchiga ochiq va brauzerda JavaScript oʻchirilgan boʻlsa ishlamaydi.",
      easy: "JS: tez javob, forma tekshiruvi, interaktivlik. Lekin kod ochiq va oʻchirilsa ishlamaydi.",
      draw: [],
      animTitle: 'JavaScript nima uchun kerak',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '⚡', title: 'Tez javob', text: 'Serverni kutmasdan brauzerda ishlaydi' },
          { icon: '✅', title: 'Forma tekshiruvi', text: 'Yuborishdan oldin xatoni topadi' },
          { icon: '🎮', title: 'Interaktivlik', text: 'Tugma, menyu, oʻyin, kalkulyator' },
          { icon: '⚠️', title: 'Kamchilik', text: 'Kod ochiq; oʻchirilsa ishlamaydi' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Funksiya — nomli kod boʻlagi: function nom(parametrlar) { … return natija; }; chaqirishda argumentlar beriladi.',
    'document.getElementById("id") elementni topadi; innerHTML — ichidagi matn; value — forma maydoni qiymati.',
    'Hodisalar: onclick, onchange, onmouseover — foydalanuvchi harakatiga javob beradi.',
    'try { … } catch (e) { … } xatoda dasturni yiqitmaydi; throw — oʻzimiz xato chiqaramiz.',
    'JavaScript sahifani tez va interaktiv qiladi, formani tekshiradi; lekin kod ochiq va oʻchirilsa ishlamaydi.'
  ],
  questions: [
    {
      id: 'i48q1',
      prompt: 'function k(x) { return x * x + 1; } — k(4) nimani qaytaradi?',
      hint: '4 × 4 + 1',
      explanation: '16 + 1 = 17.',
      widget: { type: 'number_answer', props: { answer: 17 } }
    },
    {
      id: 'i48q2',
      prompt: 'function f(a, b) { return a - b; } — f(10, 3) + f(5, 5) nechaga teng?',
      hint: 'Har birini alohida hisoblang.',
      explanation: 'f(10, 3) = 7; f(5, 5) = 0; 7 + 0 = 7.',
      widget: { type: 'number_answer', props: { answer: 7 } }
    },
    {
      id: 'i48q3',
      prompt: 'Hodisani vaziyat bilan juftlang.',
      hint: 'click — bosish.',
      explanation: 'onclick — bosish; onchange — qiymat oʻzgarishi; onmouseover — sichqoncha ustiga kelishi; onload — sahifa yuklanishi.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'onclick' }, right: { label: 'tugma bosildi' } },
            { left: { label: 'onchange' }, right: { label: 'maydon qiymati oʻzgardi' } },
            { left: { label: 'onmouseover' }, right: { label: 'sichqoncha ustiga keldi' } },
            { left: { label: 'onload' }, right: { label: 'sahifa yuklandi' } }
          ]
        }
      }
    },
    {
      id: 'i48q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'return va catch.',
      explanation: 'return natija qaytaradi; xato boʻlsa catch ishlaydi; innerHTML matnni almashtiradi; funksiya koʻp marta chaqirilishi mumkin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'return funksiya natijasini qaytaradi.', value: true },
            { text: 'try ichida xato boʻlsa, boshqaruv catch blokiga oʻtadi.', value: true },
            { text: 'Funksiyani faqat bir marta chaqirish mumkin.', value: false },
            { text: 'innerHTML elementning ichidagi matnni oʻzgartira olmaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i48q5',
      prompt: 'Sahifadagi id="natija" elementini topadigan buyruq qismini yozing: document.________("natija")',
      hint: 'get … By … Id',
      explanation: 'document.getElementById("natija").',
      widget: { type: 'text_answer', props: { answer: ['getElementById'], width: 15 } }
    },
    {
      id: 'i48q6',
      prompt: 'Tugma bosilganda sahifaga natija chiqishi tartibini tuzing.',
      hint: 'Foydalanuvchi ➜ hodisa ➜ funksiya ➜ sahifa.',
      explanation: 'Tugma bosiladi ➜ onclick funksiyani chaqiradi ➜ funksiya value ni oʻqib hisoblaydi ➜ innerHTML natijani chiqaradi.',
      widget: { type: 'step_order', props: { steps: ['Foydalanuvchi tugmani bosadi', 'onclick funksiyani chaqiradi', 'Funksiya maydon qiymatini oʻqiydi', 'innerHTML natijani sahifaga yozadi'] } }
    },
    {
      id: 'i48q7',
      prompt: 'JavaScriptning afzalliklarini bosing.',
      hint: 'Brauzerda, tez, interaktiv.',
      explanation: 'Tez javob, forma tekshiruvi, interaktivlik va oʻrnatish shart emasligi — afzallik. Kodning hammaga ochiqligi — kamchilik.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Serverni kutmasdan tez javob', match: true },
            { id: 'b', text: 'Formani yuborishdan oldin tekshirish', match: true },
            { id: 'c', text: 'Interaktiv menyu va oʻyinlar', match: true },
            { id: 'd', text: 'Hech narsa oʻrnatish shart emas', match: true },
            { id: 'e', text: 'Kod hammaga ochiq', match: false }
          ]
        }
      }
    },
    {
      id: 'i48q8',
      prompt: 'Qaysi biri JavaScript hodisasi emas?',
      hint: 'Hodisalar «on» bilan boshlanadi.',
      explanation: 'onclick, onchange va onmouseover — hodisalar. substring — satr metodi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'onclick' }, { text: 'onchange' }, { text: 'onmouseover' }, { text: 'substring', odd: true }] } }
    },
    {
      id: 'i48q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Xavfli kod va xato ushlovchi.',
      explanation: 'Xavfli kod — try blokida; xato boʻlsa — catch bloki ishlaydi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Xato chiqishi mumkin boʻlgan kod' }, { blank: 'try' }, { text: 'blokiga yoziladi. Xato boʻlsa,' }, { blank: 'catch' }, { text: 'bloki bajariladi.' }],
          bank: ['try', 'catch', 'return']
        }
      }
    },
    {
      id: 'i48q10',
      prompt: 'function salom(ism) { return "Salom, " + ism; } — salom("Ali") nimani qaytaradi?',
      hint: 'Matnlar ulanadi.',
      explanation: '"Salom, " + "Ali" = "Salom, Ali".',
      widget: { type: 'text_answer', props: { answer: ['Salom, Ali', 'Salom,Ali', '"Salom, Ali"'], width: 12 } }
    }
  ]
};
