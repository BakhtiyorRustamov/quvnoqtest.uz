import type { BoardLesson } from './types';

/** Darslik: 9.01 — maʼlumotlar bazasi: jadval, yozuv, maydon, maʼlumot turlari, birlamchi, murakkab va tashqi kalit; oddiy, bogʻlangan va iyerarxik bazalar. */
export const INF_25: BoardLesson = {
  n: 25,
  label: '25',
  part: 10,
  title: 'Maʼlumotlar bazasi va kalitlar',
  section: '9.01',
  steps: [
    {
      kind: 'hook',
      say: "Maktab kutubxonasida ming-minglab kitob bor. Qaysi kitob kimda, qachon qaytishi kerak — daftarda qidirish soatlab vaqt oladi. Maʼlumotlar bazasida esa bir soniyada topiladi. Maʼlumotlar bazasi — maʼlumotlarni tartibli saqlash usuli. Uning asosiy qismi — jadval. Har bir qator — yozuv, yaʼni bitta kitob. Har bir ustun — maydon: ID, nom, muallif, yil.",
      easy: "Baza — tartibli jadvallar. Qator — yozuv (bitta kitob), ustun — maydon (nomi, muallifi).",
      draw: [],
      animTitle: 'Kutubxona bazasi',
      anim: {
        type: 'db',
        tables: [
          { name: 'Kitoblar', key: 'KitobID', cols: ['KitobID', 'Nomi', 'Muallif', 'Yil'], rows: [['K001', 'Oʻtkan kunlar', 'A. Qodiriy', 1926], ['K002', 'Kecha va kunduz', 'Choʻlpon', 1936], ['K003', 'Sariq devni minib', 'X. Toʻxtaboyev', 1968]] }
        ],
        query: { table: 'Kitoblar', label: 'Muallif = "Choʻlpon"', keep: [1] }
      },
      next: 'Atamalarni tushuntiring'
    },
    {
      kind: 'explain',
      say: "Asosiy atamalar. Jadval — bitta turdagi narsalar haqidagi maʼlumotlar: kitoblar, oʻquvchilar. Yozuv — jadvaldagi bitta qator, bitta obyekt haqida hamma maʼlumot. Maydon — bitta ustun, bitta xususiyat. Har bir maydonning maʼlumot turi bor: matn, son, sana, valyuta, mantiqiy — ha yoki yoʻq, va avtomatik raqam. Toʻgʻri tur tanlansa, xato kiritish kamayadi va saralash toʻgʻri ishlaydi.",
      easy: "Jadval — guruh, yozuv — bitta narsa, maydon — bitta xususiyat. Har bir maydonga mos tur tanlanadi.",
      draw: [],
      animTitle: 'Maydon ➜ maʼlumot turi',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🏷️', label: 'Maydon' },
          { icon: '🔤', label: 'Maʼlumot turi' }
        ],
        items: [
          { texts: ['KitobID', 'avtomatik raqam / matn'] },
          { texts: ['Nomi', 'matn'] },
          { texts: ['Sahifalar soni', 'butun son'] },
          { texts: ['Narxi', 'valyuta'] },
          { texts: ['Berilgan sana', 'sana'] },
          { texts: ['Qaytarildimi', 'mantiqiy (ha / yoʻq)'] }
        ]
      },
      next: 'Kalit nima?'
    },
    {
      kind: 'explain',
      say: "Birlamchi kalit — har bir yozuvni yagona aniqlaydigan maydon: ikki yozuvda bir xil boʻlishi va boʻsh qolishi mumkin emas. Ism kalit boʻla olmaydi — ikki Aziz boʻlishi mumkin, shuning uchun oʻquvchi ID si ishlatiladi. Baʼzan bitta maydon yetmaydi va ikki maydon birga kalit boʻladi — bu murakkab kalit: masalan, «xona raqami + dars vaqti». Tashqi kalit esa boshqa jadvalning birlamchi kaliti boʻlib, jadvallarni bogʻlaydi.",
      easy: "Birlamchi kalit — takrorlanmaydigan ID. Murakkab kalit — ikki maydon birga. Tashqi kalit — boshqa jadvalning ID si, bogʻlash uchun.",
      draw: [],
      animTitle: 'Kalitlar',
      anim: {
        type: 'db',
        tables: [
          { name: 'Oʻquvchilar', key: 'OquvchiID', cols: ['OquvchiID', 'Ism', 'Sinf'], rows: [['U01', 'Aziz', '10-A'], ['U02', 'Aziz', '10-B'], ['U03', 'Malika', '10-A']] },
          { name: 'Berilgan', cols: ['KitobID', 'OquvchiID', 'Sana'], rows: [['K002', 'U02', '03.10'], ['K001', 'U03', '05.10']] }
        ],
        links: [{ from: ['Berilgan', 'OquvchiID'], to: ['Oʻquvchilar', 'OquvchiID'] }]
      },
      next: 'Baza turlari?'
    },
    {
      kind: 'explain',
      say: "Oddiy, yaʼni tekis faylli baza — bitta jadval. Agar har bir berilgan kitob qatoriga oʻquvchining ismi, sinfi va telefoni ham yozilsa, bir oʻquvchining maʼlumotlari oʻnlab marta takrorlanadi. Bu ortiqchalik: joy behuda ketadi va telefon oʻzgarsa, hamma joyda tuzatish kerak — biror joyda unutilsa, maʼlumot qarama-qarshi boʻlib qoladi. Bogʻlangan, yaʼni relyatsion baza maʼlumotni bir nechta jadvalga ajratib, kalitlar bilan bogʻlaydi — har bir fakt bir marta yoziladi.",
      easy: "Bitta jadval — maʼlumot takrorlanadi va xato koʻpayadi. Bogʻlangan baza — har fakt bir marta yoziladi, jadvallar kalit bilan ulanadi.",
      draw: [],
      animTitle: 'Tekis va bogʻlangan baza',
      anim: {
        type: 'compare',
        left: { icon: '📄', title: 'Tekis (bitta jadval)', items: ['Oddiy, oson yaratiladi', 'Maʼlumot takrorlanadi', 'Joy behuda ketadi', 'Yangilashda xato oson'] },
        right: { icon: '🔗', title: 'Bogʻlangan', items: ['Bir nechta jadval', 'Har fakt bir marta', 'Kalitlar bilan bogʻlanadi', 'Yangilash bitta joyda'] }
      },
      next: 'Iyerarxik nima?'
    },
    {
      kind: 'example',
      say: "Uchinchi tur — iyerarxik baza. Unda maʼlumot daraxt shaklida: har bir yozuvning bitta «otasi» bor. Maktab — sinflar — oʻquvchilar. Bunday baza yuqoridan pastga tez qidiradi, lekin bitta oʻquvchi ikki toʻgarakka qatnashsa, uni ikki joyga yozishga toʻgʻri keladi. Kompyuter papkalari ham shunday tuzilgan.",
      easy: "Iyerarxik baza — daraxt: maktab ➜ sinf ➜ oʻquvchi. Har bir pastki yozuvning bitta ustki yozuvi bor.",
      draw: [],
      animTitle: 'Iyerarxik baza',
      anim: {
        type: 'tree',
        nodes: [
          { id: 'm', label: 'Maktab' },
          { id: 'a', parent: 'm', label: '10-A' },
          { id: 'b', parent: 'm', label: '10-B' },
          { id: 'a1', parent: 'a', label: 'Aziz' },
          { id: 'a2', parent: 'a', label: 'Malika' },
          { id: 'b1', parent: 'b', label: 'Aziz' },
          { id: 'b2', parent: 'b', label: 'Dilnoza' }
        ],
        path: ['m', 'b', 'b2']
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Maʼlumotlar bazasi — maʼlumotni tartibli saqlash; jadval ➜ yozuv (qator) ➜ maydon (ustun).',
    'Maʼlumot turlari: matn, son, sana, valyuta, mantiqiy (ha/yoʻq), avtomatik raqam.',
    'Birlamchi kalit — yozuvni yagona aniqlaydi; murakkab kalit — bir nechta maydon birga; tashqi kalit — boshqa jadval kaliti.',
    'Tekis baza — bitta jadval, takrorlanish koʻp; bogʻlangan baza — jadvallar kalit bilan bogʻlangan.',
    'Iyerarxik baza — daraxt shaklida: har bir yozuvning bitta ustki yozuvi bor.'
  ],
  questions: [
    {
      id: 'i25q1',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Qator, ustun, guruh.',
      explanation: 'Jadval — oʻxshash maʼlumotlar guruhi; yozuv — bitta qator; maydon — bitta ustun; birlamchi kalit — yagona identifikator.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Jadval' }, right: { label: 'bir turdagi narsalar haqidagi maʼlumotlar' } },
            { left: { label: 'Yozuv' }, right: { label: 'bitta qator — bitta obyekt' } },
            { left: { label: 'Maydon' }, right: { label: 'bitta ustun — bitta xususiyat' } },
            { left: { label: 'Birlamchi kalit' }, right: { label: 'yozuvni yagona aniqlaydi' } }
          ]
        }
      }
    },
    {
      id: 'i25q2',
      prompt: 'Maydonga mos maʼlumot turini juftlang.',
      hint: 'Qanday qiymat saqlanadi?',
      explanation: 'Tugʻilgan sana — sana; telefon raqami — matn (boshidagi 0 va + saqlanadi); narx — valyuta; «toʻlandimi» — mantiqiy.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Tugʻilgan sana' }, right: { label: 'sana' } },
            { left: { label: 'Telefon raqami' }, right: { label: 'matn' } },
            { left: { label: 'Kitob narxi' }, right: { label: 'valyuta' } },
            { left: { label: 'Toʻlandimi?' }, right: { label: 'mantiqiy (ha/yoʻq)' } }
          ]
        }
      }
    },
    {
      id: 'i25q3',
      prompt: 'Qaysi maydon birlamchi kalit boʻla oladi?',
      hint: 'Takrorlanmasligi kerak.',
      explanation: 'Oʻquvchi ID raqami har kishida yagona. Ism, sinf va tugʻilgan sana takrorlanishi mumkin.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Ism' }, { text: 'Sinf' }, { text: 'Tugʻilgan sana' }, { text: 'Oʻquvchi ID raqami', odd: true }] } }
    },
    {
      id: 'i25q4',
      prompt: 'Jadvalda nechta yozuv va nechta maydon bor? Kitoblar jadvali: 3 ta kitob, har birida ID, Nomi, Muallif, Yil. Yozuvlar sonini yozing.',
      hint: 'Yozuv — qator.',
      explanation: '3 ta kitob — 3 ta yozuv (maydonlar esa 4 ta).',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'yozuv' } }
    },
    {
      id: 'i25q5',
      prompt: 'Tekis yoki bogʻlangan baza xususiyati?',
      hint: 'Bitta jadvalmi yoki bir nechta?',
      explanation: 'Tekis: bitta jadval, takrorlanish, yangilashda xato. Bogʻlangan: bir nechta jadval, kalitlar, har fakt bir marta.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'f', label: 'Tekis' },
            { id: 'r', label: 'Bogʻlangan' }
          ],
          tiles: [
            { id: 't1', label: 'Hammasi bitta jadvalda', bin: 'f' },
            { id: 't2', label: 'Jadvallar kalit bilan bogʻlangan', bin: 'r' },
            { id: 't3', label: 'Maʼlumot koʻp takrorlanadi', bin: 'f' },
            { id: 't4', label: 'Har bir fakt bir marta yoziladi', bin: 'r' }
          ]
        }
      }
    },
    {
      id: 'i25q6',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Birlamchi kalit boʻsh boʻlishi mumkinmi?',
      explanation: 'Birlamchi kalit boʻsh va takroriy boʻlmaydi; tashqi kalit boshqa jadvalning birlamchi kaliti; murakkab kalit bir nechta maydondan; iyerarxik bazada har yozuvning bitta ustki yozuvi bor.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Birlamchi kalit boʻsh qolishi mumkin.', value: false },
            { text: 'Tashqi kalit — boshqa jadvalning birlamchi kaliti.', value: true },
            { text: 'Murakkab kalit bir nechta maydondan tuziladi.', value: true },
            { text: 'Iyerarxik bazada bitta yozuvning bir nechta ustki yozuvi boʻladi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i25q7',
      prompt: 'Dars jadvalida «xona» ham, «vaqt» ham takrorlanadi, lekin birgalikda takrorlanmaydi. Bu qanday kalit? (Bir soʻz)',
      hint: 'Ikki maydon birga.',
      explanation: 'Murakkab kalit — xona + vaqt.',
      widget: { type: 'text_answer', props: { answer: ['murakkab', 'kompozit'], width: 10, after: 'kalit' } }
    },
    {
      id: 'i25q8',
      prompt: 'Tekis bazaning muammolarini bosing.',
      hint: 'Takrorlanish nimaga olib keladi?',
      explanation: 'Takrorlanish, joyning behuda ketishi va yangilashdagi qarama-qarshilik — muammolar. Oson yaratilishi — afzallik.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Maʼlumot takrorlanadi', match: true },
            { id: 'b', text: 'Joy behuda ketadi', match: true },
            { id: 'c', text: 'Bir joyda tuzatib, boshqasida unutish mumkin', match: true },
            { id: 'd', text: 'Yaratish oson', match: false }
          ]
        }
      }
    },
    {
      id: 'i25q9',
      prompt: 'Iyerarxiyani yuqoridan pastga tartiblang.',
      hint: 'Eng kattasidan boshlang.',
      explanation: 'Maktab ➜ sinf ➜ oʻquvchi ➜ baho.',
      widget: { type: 'step_order', props: { steps: ['Maktab', 'Sinf', 'Oʻquvchi', 'Oʻquvchining bahosi'] } }
    },
    {
      id: 'i25q10',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Qator va ustun.',
      explanation: 'Jadvaldagi qator — yozuv, ustun — maydon.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Jadvaldagi bitta qator —' }, { blank: 'yozuv' }, { text: ', bitta ustun —' }, { blank: 'maydon' }, { text: '.' }],
          bank: ['yozuv', 'maydon', 'kalit']
        }
      }
    }
  ]
};
