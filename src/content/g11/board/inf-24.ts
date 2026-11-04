import type { BoardLesson } from './types';

/** Darslik: 8.03–8.04 — kompyuter modellari, «agar … boʻlsa-chi?» tahlili, maqsadni izlash, simulyatsiya va simulyatorlar. */
export const INF_24: BoardLesson = {
  n: 24,
  label: '24',
  part: 10,
  title: 'Modellashtirish va simulyatsiya',
  section: '8.03–8.04',
  steps: [
    {
      kind: 'hook',
      say: "Sardor velosiped olmoqchi, u 1 million 800 ming soʻm turadi. Har oy 150 ming soʻm yigʻsa, qachon yetadi? Jadvalda kichik model tuzamiz: oylik jamgʻarma va oylar soni — kiruvchi qiymatlar, jami — formula. 12 oyda 1 million 800 ming yigʻiladi. Agar oyiga 200 ming yigʻsa-chi? Bitta katakni oʻzgartiramiz va javob darhol yangilanadi: 9 oy.",
      easy: "Model — hayotdagi holatning formulali nusxasi. Bitta sonni oʻzgartirib, «agar shunday boʻlsa-chi?» deb sinab koʻrish mumkin.",
      draw: [],
      animTitle: 'Jamgʻarma modeli',
      anim: {
        type: 'sheet',
        cols: ['Holat', 'Oyiga, soʻm', 'Narx', 'Oylar'],
        rows: [
          ['Hozirgi reja', 150000, 1800000, ''],
          ['Agar 200 ming?', 200000, 1800000, '']
        ],
        steps: [
          { cell: 'D2', formula: '=C2/B2', refs: ['B2', 'C2'], result: 12 },
          { cell: 'D3', formula: '=C3/B3', refs: ['B3', 'C3'], result: 9 }
        ]
      },
      next: 'Model nima?'
    },
    {
      kind: 'explain',
      say: "Kompyuter modeli — haqiqiy tizimning matematik tasviri: oʻzgaruvchilar va ular orasidagi qoidalar, yaʼni formulalar. Model yordamida «agar … boʻlsa-chi?» savollariga javob topiladi: kiruvchi qiymat oʻzgartiriladi va natija kuzatiladi. Modellar ob-havo prognozida, binolar va koʻpriklar loyihasida, biznes rejasida, aholi oʻsishini bashorat qilishda va svetoforlarni sozlashda ishlatiladi.",
      easy: "Model — oʻzgaruvchilar va formulalar. «Agar narx oshsa-chi?» deb sinab, natijani oldindan koʻramiz.",
      draw: [],
      animTitle: 'Model nimadan iborat',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🎚️', title: 'Oʻzgaruvchilar', text: 'Oʻzgartiriladigan kiruvchi qiymatlar' },
          { icon: '🟰', title: 'Qoidalar', text: 'Formulalar va bogʻliqliklar' },
          { icon: '❓', title: '«Agar … boʻlsa-chi?»', text: 'Qiymatni oʻzgartirib, natijani koʻrish' },
          { icon: '🌦️', title: 'Ob-havo', text: 'Prognoz modellari' },
          { icon: '🌉', title: 'Muhandislik', text: 'Koʻprik va bino yuklamasi' },
          { icon: '💼', title: 'Biznes', text: 'Foyda va xarajat rejasi' }
        ]
      },
      next: 'Teskari savol-chi?'
    },
    {
      kind: 'example',
      say: "Baʼzan teskari savol beriladi: «Natija aynan shuncha boʻlishi uchun kiruvchi qiymat qancha boʻlishi kerak?» Bu — maqsadni izlash. Masalan, Sardor velosipedni 6 oyda olmoqchi. Dastur oylik summani oʻzi tanlab, natija 1 million 800 ming boʻlguncha sinaydi: 250 ming — kam, 350 ming — koʻp, 300 ming — aynan. Javob: oyiga 300 ming soʻm.",
      easy: "Maqsadni izlash — «javob shu boʻlishi uchun nimani qancha qilish kerak?». Dastur sinab-sinab topadi: 6 oyda olish uchun oyiga 300 ming.",
      draw: [],
      animTitle: 'Maqsadni izlash: 6 oyda 1 800 000',
      anim: {
        type: 'code',
        lang: 'pseudo',
        lines: ['maqsad ← 1 800 000', 'oylik ← taxmin', 'jami ← oylik × 6', 'agar jami = maqsad boʻlsa: toʻxta'],
        trace: [
          { line: 1, vars: { maqsad: '1 800 000' } },
          { line: 3, vars: { oylik: '250 000', jami: '1 500 000' }, out: 'kam ⬆' },
          { line: 3, vars: { oylik: '350 000', jami: '2 100 000' }, out: 'koʻp ⬇' },
          { line: 4, vars: { oylik: '300 000', jami: '1 800 000' }, out: '✅ oyiga 300 000' }
        ]
      },
      next: 'Simulyatsiya nima?'
    },
    {
      kind: 'example',
      say: "Simulyatsiya — modelni vaqt boʻyicha ishga tushirib, haqiqiy jarayonni taqlid qilish. Masalan, shaharcha aholisi har yili 4 foizga oʻsadi deb hisoblasak, kompyuter keyingi yillarni birma-bir hisoblab, grafikni chizadi. Shu asosda qachon yangi maktab kerak boʻlishini oldindan bilamiz.",
      easy: "Simulyatsiya — modelni yil-yil yoki daqiqa-daqiqa yurgizish. Natijada kelajak qanday boʻlishini taxmin qilamiz.",
      draw: [],
      animTitle: 'Aholi oʻsishi simulyatsiyasi (ming kishi)',
      anim: { type: 'chart', kind: 'line', labels: ['2025', '2026', '2027', '2028', '2029', '2030'], values: [50, 52, 54.1, 56.2, 58.5, 60.8], unit: 'ming' },
      next: 'Simulyatorlar-chi?'
    },
    {
      kind: 'explain',
      say: "Simulyator — odamni oʻqitish uchun haqiqiy vaziyatni taqlid qiladigan tizim. Uchuvchi samolyot simulyatorida dvigatel ishdan chiqishi yoki momaqaldiroqni xavfsiz mashq qiladi. Avtomaktabda haydash simulyatori, atom stansiyasi operatorlari uchun boshqaruv simulyatori, shifokorlar uchun jarrohlik simulyatori bor. Ular xavfsiz, arzonroq va xavfli vaziyatni istalgancha takrorlash imkonini beradi.",
      easy: "Simulyator — xavfsiz mashq qilish uchun «oʻyin-trenajyor»: uchuvchi, haydovchi, jarroh oʻqiydi.",
      draw: [],
      animTitle: 'Simulyatorlar',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '✈️', title: 'Parvoz simulyatori', text: 'Dvigatel ishdan chiqishini xavfsiz mashq qilish' },
          { icon: '🚗', title: 'Haydash simulyatori', text: 'Avtomaktabda boshlangʻich mashq' },
          { icon: '⚛️', title: 'Atom stansiyasi', text: 'Operatorlarni favqulodda holatga tayyorlash' },
          { icon: '🩺', title: 'Jarrohlik', text: 'Operatsiyani bemorsiz mashq qilish' }
        ]
      },
      next: 'Kamchiliklari bormi?'
    },
    {
      kind: 'explain',
      say: "Model va simulyatsiyaning afzalliklari: haqiqiy tajribadan arzon va xavfsiz; vaqtni tezlashtirish yoki sekinlatish mumkin; koʻp «agar … boʻlsa-chi?» variantlarini tez sinash; qurilmasdan oldin xatoni topish. Kamchiliklari: model haqiqatning soddalashtirilgan nusxasi — muhim omil unutilsa, natija notoʻgʻri; yaratish va tekshirish qimmat va uzoq; simulyatorda odam baribir haqiqiy xavfni his qilmaydi.",
      easy: "Yaxshi tomoni — arzon, xavfsiz, tez sinash. Yomon tomoni — model soddalashtirilgan, omil unutilsa natija xato.",
      draw: [],
      animTitle: 'Afzallik va kamchilik',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Afzalliklari', items: ['Arzon va xavfsiz', 'Vaqtni tezlashtirish mumkin', 'Koʻp variantni tez sinash', 'Xatoni oldindan topish'] },
        right: { icon: '👎', title: 'Kamchiliklari', items: ['Haqiqatning soddalashtirilgani', 'Omil unutilsa — natija xato', 'Yaratish qimmat', 'Haqiqiy xavf hissi yoʻq'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Kompyuter modeli — haqiqiy tizimning oʻzgaruvchilar va formulalardan iborat matematik tasviri.',
    '«Agar … boʻlsa-chi?» tahlili: kiruvchi qiymatni oʻzgartirib natijani kuzatish.',
    'Maqsadni izlash: kerakli natija uchun kiruvchi qiymatni topish.',
    'Simulyatsiya — modelni vaqt boʻyicha yurgizish; simulyator — oʻqitish uchun vaziyatni taqlid qilish.',
    'Afzallik: arzon, xavfsiz, tez; kamchilik: soddalashtirilgan, omil unutilsa xato, yaratish qimmat.'
  ],
  questions: [
    {
      id: 'i24q1',
      prompt: 'Oyiga 250 000 soʻm yigʻilsa, 2 000 000 soʻmlik telefonga necha oyda yetadi?',
      hint: 'Narxni oylik summaga boʻling.',
      explanation: '2 000 000 : 250 000 = 8 oy.',
      widget: { type: 'number_answer', props: { answer: 8, unit: 'oy' } }
    },
    {
      id: 'i24q2',
      prompt: 'Maqsadni izlash: 5 oyda 1 500 000 soʻm yigʻish uchun oyiga qancha kerak?',
      hint: '1 500 000 : 5',
      explanation: '1 500 000 : 5 = 300 000 soʻm.',
      widget: { type: 'number_answer', props: { answer: 300000, unit: 'soʻm' } }
    },
    {
      id: 'i24q3',
      prompt: '«Agar … boʻlsa-chi?» tahlili yoki maqsadni izlash?',
      hint: 'Kirishni oʻzgartiryapmizmi yoki natijadan kirishni qidiryapmizmi?',
      explanation: 'Narx oshsa foyda qancha — «agar»; foyda 1 mln boʻlishi uchun narx qancha — maqsadni izlash.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'w', label: '«Agar … ?»' },
            { id: 'g', label: 'Maqsadni izlash' }
          ],
          tiles: [
            { id: 't1', label: 'Narx 10 % oshsa, foyda qancha?', bin: 'w' },
            { id: 't2', label: 'Foyda 1 mln boʻlishi uchun narx qancha?', bin: 'g' },
            { id: 't3', label: 'Yomgʻir koʻp yogʻsa, hosil qanday?', bin: 'w' },
            { id: 't4', label: '6 oyda yigʻish uchun oyiga qancha?', bin: 'g' }
          ]
        }
      }
    },
    {
      id: 'i24q4',
      prompt: 'Simulyatorni foydalanuvchisi bilan juftlang.',
      hint: 'Kim mashq qiladi?',
      explanation: 'Parvoz — uchuvchi; haydash — avtomaktab oʻquvchisi; jarrohlik — shifokor; boshqaruv pulti — atom stansiyasi operatori.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Parvoz simulyatori' }, right: { label: 'uchuvchi' } },
            { left: { label: 'Haydash simulyatori' }, right: { label: 'avtomaktab oʻquvchisi' } },
            { left: { label: 'Jarrohlik simulyatori' }, right: { label: 'shifokor' } },
            { left: { label: 'Boshqaruv pulti simulyatori' }, right: { label: 'atom stansiyasi operatori' } }
          ]
        }
      }
    },
    {
      id: 'i24q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Model haqiqatning aynan nusxasimi?',
      explanation: 'Model soddalashtirilgan; simulyatsiyada vaqtni tezlashtirish mumkin; muhim omil unutilsa natija xato; simulyator xavfli vaziyatni xavfsiz mashq qildiradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Model haqiqiy tizimning aynan toʻliq nusxasi.', value: false },
            { text: 'Simulyatsiyada yillarni bir necha soniyada hisoblash mumkin.', value: true },
            { text: 'Muhim omil hisobga olinmasa, model notoʻgʻri natija beradi.', value: true },
            { text: 'Simulyatorda xavfli vaziyatni mashq qilib boʻlmaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i24q6',
      prompt: 'Aholi 50 000, har yili 4 % oshadi. Bir yildan keyin necha kishi boʻladi?',
      hint: '50 000 × 1,04',
      explanation: '50 000 × 1,04 = 52 000 kishi.',
      widget: { type: 'number_answer', props: { answer: 52000, unit: 'kishi' } }
    },
    {
      id: 'i24q7',
      prompt: 'Modellashtirishning afzalliklarini bosing.',
      hint: 'Haqiqiy tajriba bilan solishtiring.',
      explanation: 'Arzon, xavfsiz va tez sinash — afzallik. Soddalashtirish va qimmat yaratish — kamchilik.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Haqiqiy tajribadan arzon', match: true },
            { id: 'b', text: 'Hech kimga xavf yoʻq', match: true },
            { id: 'c', text: 'Koʻp variantni tez sinash', match: true },
            { id: 'd', text: 'Haqiqatni toʻliq aks ettiradi', match: false },
            { id: 'e', text: 'Yaratish hech narsaga tushmaydi', match: false }
          ]
        }
      }
    },
    {
      id: 'i24q8',
      prompt: 'Model tuzish bosqichlarini tartiblang.',
      hint: 'Oʻzgaruvchilardan sinovgacha.',
      explanation: 'Oʻzgaruvchilar aniqlanadi ➜ formulalar yoziladi ➜ maʼlum maʼlumotlar bilan tekshiriladi ➜ «agar … ?» savollari sinaladi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Oʻzgaruvchilarni aniqlash', 'Ular orasidagi formulalarni yozish', 'Maʼlum natijalar bilan tekshirish', '«Agar … boʻlsa-chi?» savollarini sinash'] }
      }
    },
    {
      id: 'i24q9',
      prompt: 'Qaysi biri model yoki simulyatsiya emas?',
      hint: 'Uchtasi haqiqatni taqlid qiladi.',
      explanation: 'Ob-havo prognozi modeli, parvoz simulyatori va aholi oʻsishi simulyatsiyasi — modellashtirish. Matn muharriri — oddiy amaliy dastur.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Ob-havo prognozi modeli' }, { text: 'Parvoz simulyatori' }, { text: 'Aholi oʻsishi simulyatsiyasi' }, { text: 'Matn muharriri', odd: true }] } }
    },
    {
      id: 'i24q10',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Vaqt boʻyicha yurgizish va oʻqitish.',
      explanation: 'Modelni vaqt boʻyicha yurgizish — simulyatsiya; odamni oʻqitish uchun taqlid qiluvchi tizim — simulyator.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Modelni vaqt boʻyicha yurgizish —' }, { blank: 'simulyatsiya' }, { text: ', uchuvchini oʻqitadigan qurilma —' }, { blank: 'simulyator' }, { text: '.' }],
          bank: ['simulyatsiya', 'simulyator', 'filtr']
        }
      }
    }
  ]
};
