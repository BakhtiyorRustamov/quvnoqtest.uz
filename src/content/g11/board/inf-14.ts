import type { BoardLesson } from './types';

/** Darslik: 5.01–5.03 — raqamli tengsizlik (tafovut): nima, sabablari, kamaytirish yoʻllari. */
export const INF_14: BoardLesson = {
  n: 14,
  label: '14',
  part: 10,
  title: 'Raqamli tafovut',
  section: '5.01–5.03',
  steps: [
    {
      kind: 'hook',
      say: "Ikki oʻquvchi bir xil 1 gigabaytli video darsni yuklamoqda. Shahardagi Dilnozada optik tolali internet — soniyasiga 100 megabit. Uzoq qishloqdagi Sardorda esa sekin mobil aloqa — soniyasiga 2 megabit. Jadvalda hisoblab koʻramiz: Dilnoza 80 soniyada yuklaydi, Sardor esa 4 ming soniya, yaʼni bir soatdan koʻproq kutadi.",
      easy: "Bir xil dars, lekin internet tezligi har xil. Shahardagi qiz bir yarim daqiqada yuklaydi, qishloqdagi bola bir soatdan koʻp kutadi. Mana shu farq — raqamli tafovut.",
      draw: [],
      animTitle: '1 GB darsni yuklash vaqti',
      anim: {
        type: 'sheet',
        cols: ['Kim', 'Mbit/s', 'Soniya'],
        rows: [
          ['Dilnoza (shahar)', 100, ''],
          ['Sardor (qishloq)', 2, '']
        ],
        steps: [
          { cell: 'C2', formula: '=8000/B2', refs: ['B2'], result: 80 },
          { cell: 'C3', formula: '=8000/B3', refs: ['B3'], result: 4000 }
        ]
      },
      next: 'Bu nima deyiladi?'
    },
    {
      kind: 'explain',
      say: "Raqamli tafovut yoki raqamli tengsizlik — zamonaviy texnologiyalardan foydalana oladigan va foydalana olmaydigan odamlar orasidagi farq. Bu faqat internet emas: kompyuter, smartfon, televizor va ulardan foydalanish koʻnikmasi ham kiradi. U ikki darajada boʻladi. Mamlakat ichida — shahar va qishloq, boy va kambagʻal, yosh va keksa oʻrtasida. Xalqaro darajada — rivojlangan va rivojlanayotgan mamlakatlar oʻrtasida.",
      easy: "Kimdadir tez internet, kompyuter va bilim bor, kimda yoʻq. Shu farq — raqamli tafovut. U mamlakat ichida ham, davlatlar orasida ham bor.",
      draw: [],
      animTitle: 'Ikki daraja',
      anim: {
        type: 'compare',
        left: { icon: '🏘️', title: 'Mamlakat ichida', items: ['Shahar va qishloq', 'Boy va kam taʼminlangan', 'Yosh va keksa', 'Koʻnikmasi bor va yoʻq'] },
        right: { icon: '🌍', title: 'Xalqaro', items: ['Rivojlangan va rivojlanayotgan davlatlar', 'Infratuzilma farqi', 'Internet narxi farqi', 'Taʼlim darajasi farqi'] }
      },
      next: 'Sabablari nimada?'
    },
    {
      kind: 'explain',
      say: "Asosiy sabablar. Joylashuv: qishloqda aholi tarqoq yashaydi, kabel tortish qimmat, provayderga foyda kam — shuning uchun internet sekinroq yoki umuman yoʻq. Daromad: qurilma va internet toʻlovi hammaga ham arzon emas. Yosh: keksalar yangi texnologiyalarni kamroq ishlatadi. Taʼlim va koʻnikma: qurilma boʻlsa ham, undan foydalanishni bilmaslik. Imkoniyati cheklanganlar uchun moslashtirilmagan dasturlar. Til: ayrim xizmatlar ona tilida yoʻq.",
      easy: "Sabablar: uzoq joy, pul yetishmasligi, yosh, bilim yoʻqligi, moslashtirilmagan qurilmalar va til.",
      draw: [],
      animTitle: 'Sabablar',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🏔️', title: 'Joylashuv', text: 'Qishloqda infratuzilma qimmat' },
          { icon: '💰', title: 'Daromad', text: 'Qurilma va toʻlov narxi' },
          { icon: '👵', title: 'Yosh', text: 'Keksalar kamroq foydalanadi' },
          { icon: '🎓', title: 'Koʻnikma', text: 'Foydalanishni bilmaslik' },
          { icon: '♿', title: 'Imkoniyat', text: 'Moslashtirilmagan qurilmalar' },
          { icon: '🗣️', title: 'Til', text: 'Xizmat ona tilida yoʻq' }
        ]
      },
      next: 'Oqibati nima?'
    },
    {
      kind: 'example',
      say: "Raqamli tafovut hayotga qanday taʼsir qiladi? Onlayn darslar, elektron davlat xizmatlari, masofaviy ish va onlayn xaridlar — internetsiz odam bularning hammasidan chetda qoladi. Bu tafovutni yanada kattalashtiradi: bilim olish qiyinlashadi, yaxshi ishga kirish imkoniyati kamayadi, narsalar qimmatroq tushadi. Shuning uchun bu nafaqat texnik, balki ijtimoiy va iqtisodiy muammo.",
      easy: "Internetsiz odam onlayn darsdan, ishdan, davlat xizmatlaridan chetda qoladi. Farq tobora kattalashadi.",
      draw: [],
      animTitle: 'Oqibat',
      anim: {
        type: 'flow',
        stations: [
          { icon: '📵', label: 'Internet yoʻq' },
          { icon: '🚫', label: 'Chetda qoladi' },
          { icon: '📉', label: 'Natija' }
        ],
        items: [
          { texts: ['Onlayn darslar', 'video yuklanmaydi', 'bilim olish qiyin'] },
          { texts: ['Davlat xizmatlari', 'navbatda turish', 'vaqt va pul ketadi'] },
          { texts: ['Masofaviy ish', 'ishga kirolmaydi', 'daromad kamroq'] }
        ],
        result: 'Tafovut yanada kattalashadi'
      },
      next: 'Qanday kamaytiramiz?'
    },
    {
      kind: 'explain',
      say: "Tafovutni kamaytirish yoʻllari. Infratuzilma: qishloqlarga optik tola va mobil minoralar, sunʼiy yoʻldosh interneti. Arzonlik: arzonroq tariflar va qurilmalar, kam taʼminlanganlarga yordam. Ommaviy kirish nuqtalari: kutubxona, maktab va mahallalarda bepul Wi-Fi va kompyuterlar. Taʼlim: kompyuter savodxonligi kurslari, ayniqsa keksalar uchun. Moslashtirish: imkoniyati cheklanganlar uchun maxsus dasturlar va ona tilidagi xizmatlar.",
      easy: "Internetni qishloqqa olib borish, arzonlashtirish, bepul kirish joylari, oʻrgatish kurslari va hammaga moslashtirilgan dasturlar.",
      draw: [],
      animTitle: 'Yechimlar',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '📡', title: 'Infratuzilma', text: 'Optik tola, mobil minoralar, sunʼiy yoʻldosh' },
          { icon: '🏷️', title: 'Arzonlik', text: 'Arzon tarif va qurilmalar' },
          { icon: '📚', title: 'Ommaviy kirish', text: 'Kutubxona va maktabda bepul Wi-Fi' },
          { icon: '👩‍🏫', title: 'Taʼlim', text: 'Savodxonlik kurslari, keksalar uchun ham' },
          { icon: '♿', title: 'Moslashtirish', text: 'Ekran oʻqigich, ona tilidagi xizmat' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Raqamli tafovut — texnologiyadan foydalana oladigan va olmaydiganlar orasidagi farq (internet, qurilma, koʻnikma).',
    'Ikki daraja: mamlakat ichida (shahar–qishloq, boy–kambagʻal, yosh–keksa) va xalqaro (rivojlangan–rivojlanayotgan).',
    'Sabablar: joylashuv va infratuzilma, daromad, yosh, koʻnikma, imkoniyat cheklanganligi, til.',
    'Yechimlar: infratuzilma, arzonlik, ommaviy kirish nuqtalari, taʼlim, moslashtirilgan xizmatlar.'
  ],
  questions: [
    {
      id: 'i14q1',
      prompt: 'Sabab yoki yechim?',
      hint: 'Muammoni keltirib chiqaradimi yoki kamaytiradimi?',
      explanation: 'Qimmat qurilma, uzoq qishloq, koʻnikma yoʻqligi — sabablar. Kutubxonada bepul Wi-Fi, savodxonlik kurslari, qishloqqa optik tola — yechimlar.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 's', label: 'Sabab' },
            { id: 'y', label: 'Yechim' }
          ],
          tiles: [
            { id: 't1', label: 'Qurilma narxi qimmat', bin: 's' },
            { id: 't2', label: 'Kutubxonada bepul Wi-Fi', bin: 'y' },
            { id: 't3', label: 'Uzoq qishloqda kabel yoʻq', bin: 's' },
            { id: 't4', label: 'Keksalar uchun kurslar', bin: 'y' },
            { id: 't5', label: 'Foydalanishni bilmaslik', bin: 's' },
            { id: 't6', label: 'Qishloqqa optik tola tortish', bin: 'y' }
          ]
        }
      }
    },
    {
      id: 'i14q2',
      prompt: '1 GB fayl = 8000 megabit. Internet tezligi 4 Mbit/s boʻlsa, yuklash necha soniya davom etadi?',
      hint: '8000 ni tezlikka boʻling.',
      explanation: '8000 : 4 = 2000 soniya (33 daqiqadan koʻproq).',
      widget: { type: 'number_answer', props: { answer: 2000, unit: 'soniya' } }
    },
    {
      id: 'i14q3',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Raqamli tafovut faqat internetmi?',
      explanation: 'Tafovut qurilma va koʻnikmani ham oʻz ichiga oladi; qishloqda infratuzilma qimmatroq; tafovut mamlakat ichida ham bor; bu ijtimoiy va iqtisodiy muammo ham.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Raqamli tafovut faqat internetga ulanishga tegishli.', value: false },
            { text: 'Qishloqda internet infratuzilmasi qurish qimmatroq.', value: true },
            { text: 'Raqamli tafovut faqat davlatlar orasida boʻladi.', value: false },
            { text: 'Raqamli tafovut ijtimoiy va iqtisodiy muammo hamdir.', value: true }
          ]
        }
      }
    },
    {
      id: 'i14q4',
      prompt: 'Muammoni mos yechim bilan juftlang.',
      hint: 'Har bir sababga oʻz chorasi.',
      explanation: 'Infratuzilma yoʻq — optik tola yoki sunʼiy yoʻldosh; qimmat — arzon tarif; bilmaydi — kurslar; koʻrish qiyin — ekran oʻqigich.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Qishloqda internet yoʻq' }, right: { label: 'mobil minora, sunʼiy yoʻldosh' } },
            { left: { label: 'Internet juda qimmat' }, right: { label: 'arzon tariflar' } },
            { left: { label: 'Buvim telefonni bilmaydi' }, right: { label: 'savodxonlik kurslari' } },
            { left: { label: 'Koʻzi ojiz foydalanuvchi' }, right: { label: 'ekran oʻqigich dastur' } }
          ]
        }
      }
    },
    {
      id: 'i14q5',
      prompt: 'Mamlakat ichidagi yoki xalqaro tafovut?',
      hint: 'Bir davlatdagi odamlarmi yoki davlatlar?',
      explanation: 'Shahar–qishloq, yosh–keksa, boy–kambagʻal — mamlakat ichida. Rivojlangan va rivojlanayotgan davlatlar — xalqaro.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'i', label: 'Mamlakat ichida' },
            { id: 'x', label: 'Xalqaro' }
          ],
          tiles: [
            { id: 't1', label: 'Shahar va qishloq', bin: 'i' },
            { id: 't2', label: 'Rivojlangan va rivojlanayotgan davlatlar', bin: 'x' },
            { id: 't3', label: 'Yoshlar va keksalar', bin: 'i' },
            { id: 't4', label: 'Turli qitʼalardagi internet narxi', bin: 'x' }
          ]
        }
      }
    },
    {
      id: 'i14q6',
      prompt: 'Nega provayderlar qishloqqa internet olib borishni istamaydi? Sabablarni bosing.',
      hint: 'Xarajat va mijozlar soni.',
      explanation: 'Aholi tarqoq, kabel tortish qimmat, mijozlar kam — xarajat sekin qoplanadi. Qishloqda odamlar internetni xohlamaydi degani notoʻgʻri.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Aholi tarqoq yashaydi', match: true },
            { id: 'b', text: 'Kabel tortish qimmat', match: true },
            { id: 'c', text: 'Mijozlar soni kam', match: true },
            { id: 'd', text: 'Qishloqda internet kerak emas', match: false },
            { id: 'e', text: 'Qishloqda elektr umuman yoʻq', match: false }
          ]
        }
      }
    },
    {
      id: 'i14q7',
      prompt: 'Qaysi biri raqamli tafovutni kamaytirmaydi?',
      hint: 'Uchtasi kirishni osonlashtiradi.',
      explanation: 'Internet narxini oshirish tafovutni kattalashtiradi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Maktabda bepul kompyuter xonasi' }, { text: 'Arzon smartfonlar' }, { text: 'Onlayn xizmatlar ona tilida' }, { text: 'Internet narxini oshirish', odd: true }] } }
    },
    {
      id: 'i14q8',
      prompt: 'Oqibat zanjirini tartiblang.',
      hint: 'Internet yoʻqligidan boshlanadi.',
      explanation: 'Internet yoʻq ➜ onlayn darsga kira olmaydi ➜ bilim va koʻnikma kam ➜ yaxshi ishga kirish qiyin ➜ tafovut kattalashadi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Uyda internet yoʻq', 'Onlayn darslarga kira olmaydi', 'Bilim va koʻnikma kamroq', 'Yaxshi ishga kirish qiyinlashadi', 'Tafovut yanada kattalashadi'] }
      }
    },
    {
      id: 'i14q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Shahar va qishloq.',
      explanation: 'Shaharda aholi zich va infratuzilma bor, qishloqda esa aholi tarqoq va infratuzilma qimmat.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Shaharda aholi' }, { blank: 'zich' }, { text: ', shuning uchun internet arzonroq. Qishloqda aholi' }, { blank: 'tarqoq' }, { text: ', infratuzilma qimmatga tushadi.' }],
          bank: ['zich', 'tarqoq', 'keksa']
        }
      }
    },
    {
      id: 'i14q10',
      prompt: 'Texnologiyadan foydalana oladigan va olmaydiganlar orasidagi farq nima deyiladi? (Ikki soʻz)',
      hint: 'Raqamli …',
      explanation: 'Raqamli tafovut (raqamli tengsizlik).',
      widget: { type: 'text_answer', props: { before: 'Raqamli', answer: ['tafovut', 'tengsizlik'], width: 10 } }
    }
  ]
};
