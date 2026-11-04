import type { BoardLesson } from './types';

/** Darslik: 14.01–14.03 — loyiha boshqaruvi bosqichlari, loyiha boshqaruvi dasturlari turlari va imkoniyatlari. */
export const INF_38: BoardLesson = {
  n: 38,
  label: '38',
  part: 11,
  title: 'Loyiha boshqaruvi bosqichlari',
  section: '14.01–14.03',
  steps: [
    {
      kind: 'hook',
      say: "Sinfingiz maktabda «Informatika haftaligi» oʻtkazmoqchi: robot koʻrgazmasi, olimpiada va taqdimotlar. Kim nima qiladi, qachon tugatadi, qancha pul kerak? Har qanday loyiha beshta bosqichdan oʻtadi: konsepsiya va boshlash, rejalashtirish, bajarish, monitoring va nazorat, yakunlash. Bajarish va nazorat paytida reja koʻpincha qayta koʻrib chiqiladi.",
      easy: "Loyiha: gʻoya ➜ reja ➜ bajarish ➜ nazorat ➜ yakun. Kerak boʻlsa, reja oʻzgartiriladi.",
      draw: [],
      animTitle: 'Loyiha bosqichlari',
      anim: {
        type: 'cycle',
        center: 'Reja kerak boʻlsa qayta koʻriladi',
        stages: [
          { icon: '💡', label: 'Konsepsiya va boshlash' },
          { icon: '🗓️', label: 'Rejalashtirish' },
          { icon: '🛠️', label: 'Bajarish' },
          { icon: '📊', label: 'Monitoring va nazorat' },
          { icon: '🏁', label: 'Yakunlash' }
        ]
      },
      next: 'Har birini tushuntiring'
    },
    {
      kind: 'explain',
      say: "Konsepsiya va boshlash bosqichida gʻoya va maqsadlar aniqlanadi, manfaatdorlar — loyihadan manfaati borlar — belgilanadi va texnik-iqtisodiy asoslash qilinadi: vaqt, pul va resurslar yetadimi, foyda keltiradimi? Shunga qarab «boshlaymiz» yoki «yoʻq» deb qaror qilinadi. Rejalashtirishda vazifalar, ularning ketma-ketligi, muddatlari, byudjet va kim nima qilishi belgilanadi — Gantt diagrammasi tuziladi.",
      easy: "Boshida: gʻoya, maqsad, «arziydimi?». Rejada: vazifalar, muddat, pul va masʼullar.",
      draw: [],
      animTitle: 'Bosqichlar ichida nima qilinadi',
      anim: {
        type: 'flow',
        stations: [
          { icon: '💡', label: 'Boshlash' },
          { icon: '🗓️', label: 'Reja' },
          { icon: '🛠️', label: 'Bajarish' }
        ],
        items: [
          { texts: ['maqsad: haftalik', 'vazifalar roʻyxati', 'robotlar yigʻiladi'] },
          { texts: ['manfaatdorlar: maktab, ota-onalar', 'muddat: 3 hafta', 'olimpiada oʻtkaziladi'] },
          { texts: ['asoslash: 2 mln soʻm yetadi', 'masʼullar: 5 guruh', 'taqdimotlar tayyorlanadi'] }
        ]
      },
      next: 'Keyingi bosqichlar?'
    },
    {
      kind: 'explain',
      say: "Bajarish bosqichida reja boʻyicha ish boshlanadi, loyiha rahbari rollarni taqsimlaydi. Monitoring va nazorat butun bajarish davomida davom etadi: vazifalar oʻz vaqtida bajarilyaptimi, xarajat byudjetdan oshmayaptimi, loyiha koʻlami kelishilgandan kengayib ketmayaptimi? Kechikish boʻlsa, reja qayta tuziladi. Yakunlashda natija mijozga topshiriladi, resurslar boʻshatiladi va «nima yaxshi boʻldi, nimani yaxshilash kerak» degan xulosa chiqariladi.",
      easy: "Bajarish — ish. Nazorat — muddat, pul va koʻlamni kuzatish. Yakun — topshirish va xulosa.",
      draw: [],
      animTitle: 'Monitoring: reja va haqiqat',
      anim: {
        type: 'sheet',
        cols: ['Vazifa', 'Reja, kun', 'Haqiqat, kun', 'Holat'],
        rows: [
          ['Robotlar', 7, 6, ''],
          ['Olimpiada', 3, 5, ''],
          ['Taqdimot', 4, 4, '']
        ],
        steps: [
          { cell: 'D2', formula: '=IF(C2<=B2,"✓","kechikdi")', refs: ['B2', 'C2'], result: '✓ vaqtida' },
          { cell: 'D3', formula: '=IF(C3<=B3,"✓","kechikdi")', refs: ['B3', 'C3'], result: '⚠ 2 kun kechikdi' },
          { cell: 'D4', formula: '=IF(C4<=B4,"✓","kechikdi")', refs: ['B4', 'C4'], result: '✓ vaqtida' }
        ]
      },
      next: 'Qanday dasturlar yordam beradi?'
    },
    {
      kind: 'explain',
      say: "Loyiha boshqaruvi dasturlari bir necha xil. Stol kompyuteri dasturi bitta kompyuterga oʻrnatiladi: tez va grafikasi boy, lekin har kompyuterga litsenziya kerak va birga ishlash qiyin. Vebga asoslangan dastur brauzer orqali ochiladi: hech narsa oʻrnatilmaydi, telefon va planshetdan ham kirish, hamma bir vaqtda bitta hujjat ustida ishlaydi; lekin internetga bogʻliq. Shaxsiy dastur — kichik loyihalar uchun oddiy, hamkorlik tizimlari esa katta jamoalar uchun.",
      easy: "Stol dasturi — tez, lekin bitta kompyuterda. Veb-dastur — hamma joydan, birgalikda, lekin internet kerak.",
      draw: [],
      animTitle: 'Stol va veb dasturlari',
      anim: {
        type: 'compare',
        left: { icon: '🖥️', title: 'Stol kompyuteri', items: ['Tez, boy grafika', 'Har kompyuterga litsenziya', 'Birga ishlash qiyin', 'Internetsiz ishlaydi'] },
        right: { icon: '🌐', title: 'Vebga asoslangan', items: ['Brauzerdan, oʻrnatilmaydi', 'Telefon va planshetdan', 'Koʻp kishi birga ishlaydi', 'Internetga bogʻliq'] }
      },
      next: 'Dastur nimalar qila oladi?'
    },
    {
      kind: 'explain',
      say: "Loyiha boshqaruvi dasturining imkoniyatlari. Rejalashtirish va jadval — vazifalar, muddatlar, Gantt diagrammasi. Resurslarni taqsimlash — kim qaysi vazifada, hech kim ortiqcha yuklanmasligi. Byudjet — rejalangan va haqiqiy xarajat. Hamkorlik va muloqot — umumiy hujjatlar, izohlar, xabarnomalar. Qaror qabul qilish — hisobotlar va «agar bu vazifa kechiksa, nima boʻladi?» tahlili.",
      easy: "Dastur: jadval, kim nima qiladi, pul hisobi, birga ishlash va qaror uchun hisobotlar.",
      draw: [],
      animTitle: 'Dastur imkoniyatlari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🗓️', title: 'Rejalashtirish', text: 'Vazifalar, muddatlar, Gantt' },
          { icon: '👥', title: 'Resurslar', text: 'Kim qaysi vazifada' },
          { icon: '💰', title: 'Byudjet', text: 'Reja va haqiqiy xarajat' },
          { icon: '💬', title: 'Hamkorlik', text: 'Umumiy hujjatlar, izohlar' },
          { icon: '🔔', title: 'Xabarnomalar', text: 'Muddat yaqinlashsa eslatma' },
          { icon: '📈', title: 'Qaror', text: 'Hisobotlar va tahlil' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Loyiha bosqichlari: konsepsiya va boshlash ➜ rejalashtirish ➜ bajarish ➜ monitoring va nazorat ➜ yakunlash.',
    'Boshlashda maqsad, manfaatdorlar va texnik-iqtisodiy asoslash; rejada vazifalar, muddat, byudjet, masʼullar.',
    'Nazoratda muddat, xarajat va koʻlam kuzatiladi; kechikishda reja qayta koʻriladi.',
    'Dasturlar: stol kompyuteri (tez, lekin hamkorlik qiyin) va vebga asoslangan (hamma joydan, birgalikda, internet kerak).',
    'Imkoniyatlar: rejalashtirish, resurslar, byudjet, hamkorlik, xabarnomalar, qaror uchun hisobotlar.'
  ],
  questions: [
    {
      id: 'i38q1',
      prompt: 'Loyiha bosqichlarini tartiblang.',
      hint: 'Gʻoyadan yakungacha.',
      explanation: 'Konsepsiya va boshlash ➜ rejalashtirish ➜ bajarish ➜ monitoring va nazorat ➜ yakunlash.',
      widget: { type: 'step_order', props: { steps: ['Konsepsiya va boshlash', 'Rejalashtirish', 'Bajarish', 'Monitoring va nazorat', 'Yakunlash'] } }
    },
    {
      id: 'i38q2',
      prompt: 'Ishni bosqichi bilan juftlang.',
      hint: 'Qachon qilinadi?',
      explanation: 'Texnik-iqtisodiy asoslash — boshlash; Gantt diagrammasi — rejalashtirish; xarajatni byudjet bilan solishtirish — nazorat; tayyor ishni mijozga topshirish — yakunlash.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Texnik-iqtisodiy asoslash' }, right: { label: 'konsepsiya va boshlash' } },
            { left: { label: 'Gantt diagrammasini tuzish' }, right: { label: 'rejalashtirish' } },
            { left: { label: 'Xarajatni byudjet bilan solishtirish' }, right: { label: 'monitoring va nazorat' } },
            { left: { label: 'Tayyor ishni mijozga topshirish' }, right: { label: 'yakunlash' } }
          ]
        }
      }
    },
    {
      id: 'i38q3',
      prompt: 'Stol kompyuteri yoki vebga asoslangan dastur?',
      hint: 'Oʻrnatiladimi yoki brauzerdami?',
      explanation: 'Har kompyuterga litsenziya va internetsiz ishlash — stol. Brauzerdan, telefondan kirish va birgalikda ishlash — veb.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'd', label: 'Stol' },
            { id: 'w', label: 'Veb' }
          ],
          tiles: [
            { id: 't1', label: 'Har kompyuterga litsenziya', bin: 'd' },
            { id: 't2', label: 'Brauzer orqali ochiladi', bin: 'w' },
            { id: 't3', label: 'Internetsiz ishlaydi', bin: 'd' },
            { id: 't4', label: 'Telefondan ham kirish', bin: 'w' },
            { id: 't5', label: 'Koʻp kishi bir vaqtda ishlaydi', bin: 'w' }
          ]
        }
      }
    },
    {
      id: 'i38q4',
      prompt: 'Vazifa rejada 5 kun, haqiqatda 8 kun davom etdi. Necha kun kechikdi?',
      hint: '8 − 5',
      explanation: '3 kun kechikdi — reja qayta koʻrib chiqiladi.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'kun' } }
    },
    {
      id: 'i38q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Monitoring qachon boʻladi?',
      explanation: 'Monitoring bajarish davomida boʻladi; texnik-iqtisodiy asoslash boshlanishda; reja oʻzgarishi mumkin; yakunda xulosa chiqariladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Monitoring faqat loyiha tugagandan keyin boshlanadi.', value: false },
            { text: 'Texnik-iqtisodiy asoslash loyihani boshlash-boshlamaslikni hal qiladi.', value: true },
            { text: 'Kechikish boʻlsa, reja qayta koʻrib chiqiladi.', value: true },
            { text: 'Yakunlashda hech qanday xulosa chiqarilmaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i38q6',
      prompt: 'Loyiha boshqaruvi dasturining imkoniyatlarini bosing.',
      hint: 'Reja, odamlar, pul, muloqot.',
      explanation: 'Gantt diagrammasi, resurs taqsimoti, byudjet nazorati va muddat eslatmasi — imkoniyatlar. Videoni montaj qilish — boshqa dastur ishi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Gantt diagrammasi', match: true },
            { id: 'b', text: 'Xodimlarni vazifalarga taqsimlash', match: true },
            { id: 'c', text: 'Byudjetni kuzatish', match: true },
            { id: 'd', text: 'Muddat haqida eslatma', match: true },
            { id: 'e', text: 'Videoga oʻtish effekti qoʻyish', match: false }
          ]
        }
      }
    },
    {
      id: 'i38q7',
      prompt: 'Byudjet 2 000 000 soʻm, sarflangan 1 450 000 soʻm. Qancha qoldi?',
      hint: 'Ayiring.',
      explanation: '2 000 000 − 1 450 000 = 550 000 soʻm.',
      widget: { type: 'number_answer', props: { answer: 550000, unit: 'soʻm' } }
    },
    {
      id: 'i38q8',
      prompt: 'Qaysi biri loyiha bosqichi emas?',
      hint: 'Beshta bosqichni eslang.',
      explanation: 'Defragmentatsiya — disk utiliti. Qolganlari loyiha bosqichlari.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Rejalashtirish' }, { text: 'Bajarish' }, { text: 'Yakunlash' }, { text: 'Defragmentatsiya', odd: true }] } }
    },
    {
      id: 'i38q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Loyihadan manfaati borlar.',
      explanation: 'Loyihadan manfaati bor shaxslar — manfaatdorlar; resurs, vaqt va foydani baholash — texnik-iqtisodiy asoslash.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Loyihadan manfaati borlar —' }, { blank: 'manfaatdorlar' }, { text: '. «Arziydimi?» degan tahlil — texnik-iqtisodiy' }, { blank: 'asoslash' }, { text: '.' }],
          bank: ['manfaatdorlar', 'asoslash', 'renderlash']
        }
      }
    },
    {
      id: 'i38q10',
      prompt: 'Loyiha vazifalari va muddatlarini koʻrsatuvchi gorizontal ustunli diagramma nomini yozing.',
      hint: 'Uni Genri … yaratgan.',
      explanation: 'Gantt diagrammasi.',
      widget: { type: 'text_answer', props: { answer: ['Gantt', 'Gant'], after: 'diagrammasi', width: 7 } }
    }
  ]
};
