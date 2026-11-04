import type { BoardLesson } from './types';

/** Darslik: 8.02 — saralash, filtrlash (qidiruv), import va eksport (CSV), diagramma turini tanlash. */
export const INF_23: BoardLesson = {
  n: 23,
  label: '23',
  part: 10,
  title: 'Saralash, filtr va diagrammalar',
  section: '8.02',
  steps: [
    {
      kind: 'hook',
      say: "Sinf jamoasi maktab yugurish musobaqasida qatnashdi. Natijalar jadvalda tartibsiz yozilgan. Kim gʻolib? Vaqt ustuni boʻyicha oʻsish tartibida saralaymiz — eng tez yugurgan birinchi qatorga chiqadi. Qatorlar butunligicha koʻchadi, yaʼni ism vaqtidan ajralib qolmaydi.",
      easy: "Saralash — jadvalni tartibga solish. Vaqt boʻyicha kichigidan kattasiga saralasak, gʻolib eng yuqorida boʻladi.",
      draw: [],
      animTitle: 'Vaqt boʻyicha saralash ▲',
      anim: {
        type: 'sort',
        cols: ['Ism', 'Sinf', 'Vaqt, s'],
        rows: [
          ['Aziz', '10-A', 14.2],
          ['Malika', '10-B', 13.1],
          ['Sardor', '10-A', 15.6],
          ['Dilnoza', '10-B', 13.8],
          ['Javohir', '10-A', 12.9]
        ],
        by: 2
      },
      next: 'Yana qanday saralanadi?'
    },
    {
      kind: 'explain',
      say: "Saralash oʻsish tartibida — kichikdan kattaga, A dan Z ga — yoki kamayish tartibida boʻladi. Bir nechta ustun boʻyicha ham saralash mumkin: avval sinf boʻyicha, bir sinf ichida esa vaqt boʻyicha. Muhim qoida: butun jadvalni belgilab saralang, aks holda bitta ustun koʻchib, maʼlumotlar aralashib ketadi.",
      easy: "Oʻsish — kichikdan kattaga, kamayish — kattadan kichikka. Butun jadvalni belgilang, aks holda ism va vaqt adashib qoladi.",
      draw: [],
      animTitle: 'Ism boʻyicha, alifbo tartibida',
      anim: {
        type: 'sort',
        cols: ['Ism', 'Sinf', 'Vaqt, s'],
        rows: [
          ['Malika', '10-B', 13.1],
          ['Aziz', '10-A', 14.2],
          ['Sardor', '10-A', 15.6],
          ['Dilnoza', '10-B', 13.8]
        ],
        by: 0
      },
      next: 'Faqat bir qismini koʻrish-chi?'
    },
    {
      kind: 'example',
      say: "Filtr jadvaldan faqat shartga mos qatorlarni koʻrsatadi, qolganlarini vaqtincha yashiradi — oʻchirmaydi. Masalan, faqat 10-B sinf oʻquvchilari, yoki vaqti 14 soniyadan kam boʻlganlar. Shartlarni VA bilan bogʻlasak — ikkalasi ham bajarilishi kerak, YOKI bilan — bittasi kifoya. Yulduzcha belgisi istalgan harflarni bildiradi: «D*» — D bilan boshlanadigan ismlar.",
      easy: "Filtr — keraklilarini koʻrsatadi, qolganini yashiradi. VA — ikkala shart, YOKI — bitta shart yetarli.",
      draw: [],
      animTitle: 'Filtr: sinf = 10-B',
      anim: {
        type: 'db',
        tables: [
          { name: 'Natijalar', cols: ['Ism', 'Sinf', 'Vaqt'], rows: [['Aziz', '10-A', 14.2], ['Malika', '10-B', 13.1], ['Sardor', '10-A', 15.6], ['Dilnoza', '10-B', 13.8]] }
        ],
        query: { table: 'Natijalar', label: 'Sinf = "10-B"', keep: [1, 3] }
      },
      next: 'Diagramma-chi?'
    },
    {
      kind: 'explain',
      say: "Maʼlumotni boshqa dasturga oʻtkazish — eksport, boshqa dasturdan olib kirish — import deyiladi. Eng oddiy umumiy format — CSV: har bir qator alohida satr, qiymatlar vergul bilan ajratilgan. Uni elektron jadval ham, maʼlumotlar bazasi ham ocha oladi. Diagramma turini esa maqsadga qarab tanlaymiz: toifalarni solishtirish — ustunli diagramma; vaqt boʻyicha oʻzgarish — chiziqli grafik; butunning qismlari — doiraviy diagramma.",
      easy: "CSV — vergul bilan ajratilgan oddiy matn fayl. Solishtirish — ustunli, oʻzgarish — chiziqli, ulush — doiraviy diagramma.",
      draw: [],
      animTitle: 'Qaysi diagramma?',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '📊', title: 'Ustunli', text: 'Toifalarni solishtirish: sinflar natijasi' },
          { icon: '📈', title: 'Chiziqli', text: 'Vaqt boʻyicha oʻzgarish: harorat, narx' },
          { icon: '🥧', title: 'Doiraviy', text: 'Butunning qismlari: byudjet ulushi' }
        ]
      },
      next: 'Davom eting'
    },
    {
      kind: 'example',
      say: "Uch xil maʼlumot — uch xil diagramma. Birinchisi: toʻrt sinfning oʻrtacha bali — ustunli diagramma, qaysi sinf yaxshiroq ekani darhol koʻrinadi. Diagrammaga albatta sarlavha, oʻqlar nomi va kerak boʻlsa, izoh — legenda qoʻyiladi.",
      easy: "Sinflarni solishtirish — ustunli diagramma. Sarlavha va oʻq nomlarini unutmang.",
      draw: [],
      animTitle: 'Sinflarning oʻrtacha bali',
      anim: { type: 'chart', kind: 'bar', labels: ['10-A', '10-B', '10-V', '10-G'], values: [72, 81, 65, 77], unit: 'ball' },
      next: 'Boshqa turlari?'
    },
    {
      kind: 'example',
      say: "Ikkinchisi: Toshkentda bir hafta davomidagi kunduzgi harorat. Bu vaqt boʻyicha oʻzgarish, shuning uchun chiziqli grafik tanlaymiz — harorat qachon koʻtarilib, qachon tushgani yaqqol koʻrinadi.",
      easy: "Kunlar boʻyicha harorat — chiziqli grafik: koʻtarilish va tushish yaxshi koʻrinadi.",
      draw: [],
      animTitle: 'Bir haftalik harorat',
      anim: { type: 'chart', kind: 'line', labels: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'], values: [18, 21, 24, 23, 19, 16, 20], unit: '°C' },
      next: 'Ulushlar-chi?'
    },
    {
      kind: 'example',
      say: "Uchinchisi: oilaning oylik xarajatlari — oziq-ovqat, kommunal toʻlovlar, transport va boshqalar. Bu butunning qismlari, shuning uchun doiraviy diagramma: har bir boʻlak butunning necha foizi ekanini koʻrsatadi.",
      easy: "Xarajatlarning ulushi — doiraviy diagramma: har bir boʻlak foizda koʻrinadi.",
      draw: [],
      animTitle: 'Oilaviy xarajatlar ulushi',
      anim: { type: 'chart', kind: 'pie', labels: ['Oziq-ovqat', 'Kommunal', 'Transport', 'Boshqa'], values: [45, 20, 15, 20], unit: '%' },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Saralash: oʻsish yoki kamayish tartibida, bir yoki bir nechta ustun boʻyicha; butun jadvalni belgilash kerak.',
    'Filtr shartga mos qatorlarni koʻrsatadi, qolganini yashiradi; VA — ikkala shart, YOKI — bittasi; * — istalgan belgilar.',
    'Import — boshqa dasturdan olish, eksport — boshqa dasturga berish; CSV — vergul bilan ajratilgan matn.',
    'Ustunli — solishtirish; chiziqli — vaqt boʻyicha oʻzgarish; doiraviy — butunning qismlari.',
    'Diagrammada sarlavha, oʻq nomlari va legenda boʻlishi kerak.'
  ],
  questions: [
    {
      id: 'i23q1',
      prompt: 'Vaqtlarni oʻsish tartibida joylashtiring (s): 14,2; 13,1; 15,6; 12,9.',
      hint: 'Eng kichigidan boshlang.',
      explanation: '12,9 ➜ 13,1 ➜ 14,2 ➜ 15,6.',
      widget: { type: 'step_order', props: { steps: ['12,9', '13,1', '14,2', '15,6'] } }
    },
    {
      id: 'i23q2',
      prompt: 'Maʼlumotga mos diagrammani juftlang.',
      hint: 'Solishtirish, oʻzgarish yoki ulush?',
      explanation: 'Sinflar natijasi — ustunli; bir yillik narx oʻzgarishi — chiziqli; byudjet ulushlari — doiraviy.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Toʻrt sinfning oʻrtacha bali' }, right: { label: 'ustunli' } },
            { left: { label: 'Yil davomida non narxining oʻzgarishi' }, right: { label: 'chiziqli' } },
            { left: { label: 'Byudjetning qismlarga taqsimlanishi' }, right: { label: 'doiraviy' } }
          ]
        }
      }
    },
    {
      id: 'i23q3',
      prompt: 'Filtr: Sinf = "10-A" VA Vaqt < 15. Qaysi qatorlar qoladi?',
      hint: 'Ikkala shart ham bajarilsin.',
      explanation: 'Aziz (10-A, 14,2) va Javohir (10-A, 12,9). Sardor 10-A, lekin 15,6 > 15. Malika 10-B.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Aziz — 10-A — 14,2', match: true },
            { id: 'b', text: 'Javohir — 10-A — 12,9', match: true },
            { id: 'c', text: 'Sardor — 10-A — 15,6', match: false },
            { id: 'd', text: 'Malika — 10-B — 13,1', match: false }
          ]
        }
      }
    },
    {
      id: 'i23q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Filtr qatorlarni oʻchiradimi?',
      explanation: 'Filtr faqat yashiradi; YOKI da bitta shart yetarli; CSV da qiymatlar vergul bilan ajratiladi; faqat bitta ustunni saralash maʼlumotni aralashtirib yuboradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Filtr shartga mos kelmagan qatorlarni butunlay oʻchiradi.', value: false },
            { text: 'YOKI bilan bogʻlangan shartlardan bittasi bajarilsa yetarli.', value: true },
            { text: 'CSV faylda qiymatlar vergul bilan ajratiladi.', value: true },
            { text: 'Faqat bitta ustunni belgilab saralash xavfsiz.', value: false }
          ]
        }
      }
    },
    {
      id: 'i23q5',
      prompt: 'Ismlarni alifbo tartibida joylashtiring.',
      hint: 'A, D, M, S…',
      explanation: 'Aziz ➜ Dilnoza ➜ Malika ➜ Sardor.',
      widget: { type: 'step_order', props: { steps: ['Aziz', 'Dilnoza', 'Malika', 'Sardor'] } }
    },
    {
      id: 'i23q6',
      prompt: 'Doiraviy diagramma: oziq-ovqat 45 %, kommunal 20 %, transport 15 %. «Boshqa» necha foiz?',
      hint: 'Hammasi 100 %.',
      explanation: '100 − 45 − 20 − 15 = 20 %.',
      widget: { type: 'number_answer', props: { answer: 20, unit: '%' } }
    },
    {
      id: 'i23q7',
      prompt: '«D*» shartiga mos ismlarni bosing.',
      hint: '* — istalgan harflar; D bilan boshlansin.',
      explanation: 'Dilnoza va Doniyor D bilan boshlanadi. Aziz, Madina — yoʻq.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Dilnoza', match: true },
            { id: 'b', text: 'Doniyor', match: true },
            { id: 'c', text: 'Aziz', match: false },
            { id: 'd', text: 'Madina', match: false }
          ]
        }
      }
    },
    {
      id: 'i23q8',
      prompt: 'Qaysi biri diagramma elementi emas?',
      hint: 'Uchtasi diagrammani tushunarli qiladi.',
      explanation: 'Sarlavha, oʻq nomi, legenda — diagramma elementlari. Absolyut havola — formula qismi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Sarlavha' }, { text: 'Oʻq nomi' }, { text: 'Legenda' }, { text: 'Absolyut havola', odd: true }] } }
    },
    {
      id: 'i23q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Kirish va chiqish.',
      explanation: 'Boshqa dasturdan olish — import, boshqa dasturga berish — eksport.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Boshqa dasturdan maʼlumot olib kirish —' }, { blank: 'import' }, { text: ', boshqa dasturga chiqarish —' }, { blank: 'eksport' }, { text: '.' }],
          bank: ['import', 'eksport', 'filtr']
        }
      }
    },
    {
      id: 'i23q10',
      prompt: 'Qiymatlari vergul bilan ajratilgan oddiy matn fayl formati qisqacha qanday ataladi?',
      hint: 'Comma Separated Values',
      explanation: 'CSV — Comma Separated Values.',
      widget: { type: 'text_answer', props: { answer: 'CSV', width: 5 } }
    }
  ]
};
