import type { BoardLesson } from './types';

/** Darslik: 1.01–1.02 — maʼlumot, axborot, bilim; statik va dinamik maʼlumot; bevosita va bilvosita manbalar. */
export const INF_1: BoardLesson = {
  n: 1,
  label: '1',
  part: 10,
  title: 'Maʼlumot, axborot va bilim',
  section: '1.01–1.02',
  steps: [
    {
      kind: 'hook',
      say: "Ekranda uchta yozuv bor: 45 000, AB 1234 va 38,5. Ular nimani bildiradi? Hozircha hech kim aytolmaydi. Bu shunchaki belgilar. Ularga kontekst, yaʼni izoh qoʻshsak, birdan maʼno paydo boʻladi. Kuzating.",
      easy: "Oddiy qilib aytsak: 38,5 degan son yolgʻiz turgan boʻlsa, uning nima ekanini bilmaymiz. «Bemorning harorati» deb yozib qoʻysak, tushunarli boʻladi. Izoh qoʻshilgani uchun maʼno paydo boʻldi.",
      draw: [],
      animTitle: 'Maʼlumot ➜ axborot',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🔢', label: 'Maʼlumot' },
          { icon: '🏷️', label: 'Kontekst' },
          { icon: '💡', label: 'Axborot' }
        ],
        items: [
          { texts: ['45 000', 'narx, soʻm', 'Bir kilo olma 45 000 soʻm'] },
          { texts: ['AB 1234', 'mahsulot kodi', 'Muzqaymoq kodi AB 1234'] },
          { texts: ['38,5', 'harorat, °C', 'Bemorning harorati 38,5 °C'] }
        ],
        result: 'Kontekst qoʻshildi — maʼno paydo boʻldi'
      },
      next: 'Davom eting'
    },
    {
      kind: 'explain',
      say: "Endi uchta atamani ajratib olamiz. Maʼlumot — qayta ishlanmagan sonlar, harflar, belgilar, tovush yoki rasm. Uning maʼnosi nomaʼlum. Axborot — kontekst va maʼno berilgan maʼlumot: oʻqigan odam nimani anglatishini tushunadi. Bilim esa axborotga inson tajribasi qoʻshilganda paydo boʻladi: biz undan xulosa chiqaramiz va qaror qabul qilamiz.",
      easy: "Maʼlumot — xom belgilar, masalan 38,5. Axborot — izohli maʼlumot: «harorat 38,5 daraja». Bilim — tajriba bilan chiqarilgan xulosa: «bu isitma, shifokorga borish kerak».",
      draw: [],
      animTitle: 'Uch atama',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🔢', title: 'Maʼlumot', text: 'Qayta ishlanmagan belgilar: sonlar, harflar, tovush, rasm. Maʼnosi nomaʼlum.' },
          { icon: '💡', title: 'Axborot', text: 'Kontekst va maʼno berilgan maʼlumot. Oʻqigan odam tushunadi.' },
          { icon: '🧠', title: 'Bilim', text: 'Axborot + tajriba. Xulosa chiqarish va qaror qabul qilishga yordam beradi.' }
        ]
      },
      next: 'Keyingisi'
    },
    {
      kind: 'example',
      say: "Bir misolni oxirigacha kuzatamiz. Termometrda 38,5 chiqdi — bu maʼlumot. «Mening haroratim 38,5 daraja» — bu axborot. «Normal harorat 36,6 atrofida, demak menda isitma bor, dam olib, shifokorga borishim kerak» — bu bilim. Bilim uchun tajriba va oldindan bilgan narsalarimiz kerak boʻldi.",
      easy: "38,5 — shunchaki son. «Haroratim 38,5» — tushunarli gap. «Bu isitma, shifokorga boraman» — tajribaga tayangan xulosa. Uchinchisi bilim.",
      draw: [],
      animTitle: 'Bitta misol, uch bosqich',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🌡️', label: 'Maʼlumot' },
          { icon: '💡', label: 'Axborot' },
          { icon: '🧠', label: 'Bilim' }
        ],
        items: [{ texts: ['38,5', 'Haroratim 38,5 °C', 'Isitma bor — shifokorga boraman'] }],
        result: 'Bilim = axborot + tajriba'
      },
      next: 'Keyingisi'
    },
    {
      kind: 'explain',
      say: "Maʼlumotlar oʻzgarishiga qarab ikki xil boʻladi. Statik maʼlumot odatda oʻzgarmaydi, uni faqat odam qoʻlda tahrirlashi mumkin: darslikdagi matn, hafta kunlari, yoʻl belgisidagi tezlik chegarasi. Dinamik maʼlumot esa manbasi oʻzgarganda, odam aralashmasdan, avtomatik yangilanadi: ob-havo ilovasi, futbol oʻyinining jonli hisobi, taksi yetib kelish vaqti.",
      easy: "Statik — «qotib turgan» maʼlumot, kimdir oʻzi oʻzgartirmaguncha shundayligicha qoladi. Dinamik — «oʻzi yangilanadigan» maʼlumot: gol urilsa, ilovadagi hisob darhol oʻzgaradi.",
      draw: [],
      animTitle: 'Statik va dinamik',
      anim: {
        type: 'compare',
        left: { icon: '📘', title: 'Statik', items: ['Odatda oʻzgarmaydi', 'Faqat qoʻlda tahrirlanadi', 'Tez eskirishi mumkin', 'Oflayn koʻrsa boʻladi', 'Misol: darslik, hafta kunlari'] },
        right: { icon: '🔄', title: 'Dinamik', items: ['Avtomatik yangilanadi', 'Odam aralashmaydi', 'Odatda eng yangi', 'Koʻpincha internet kerak', 'Misol: ob-havo, jonli hisob'] }
      },
      next: 'Misol kerak'
    },
    {
      kind: 'example',
      say: "Dinamik maʼlumot qanday yangilanishini koʻraylik. Stadionda gol urildi. Hakam tizimga natijani kiritdi, maʼlumotlar bazasi oʻzgardi, va bir necha soniyada barcha telefonlardagi ilovada hisob 1:0 dan 2:0 ga oʻzgardi. Hech kim har bir telefonni alohida tahrirlamadi — maʼlumot oʻzi yangilandi.",
      easy: "Gol urildi, bazadagi raqam oʻzgardi, ilovadagi raqam ham oʻzi oʻzgardi. Ana shu — dinamik maʼlumot.",
      draw: [],
      animTitle: 'Jonli hisob',
      anim: {
        type: 'flow',
        stations: [
          { icon: '⚽', label: 'Voqea' },
          { icon: '🗄️', label: 'Baza' },
          { icon: '📱', label: 'Ilova' }
        ],
        items: [{ texts: ['Gol!', 'hisob = 2:0', 'Paxtakor 2:0'] }, { texts: ['72-daqiqa', 'vaqt = 72', '⏱ 72′'] }],
        result: 'Manba oʻzgardi — ekran oʻzi yangilandi'
      },
      next: 'Davom eting'
    },
    {
      kind: 'explain',
      say: "Maʼlumot qayerdan olinganiga qarab ham farqlanadi. Bevosita, yaʼni birlamchi manba — maʼlumotni aynan shu maqsad uchun oʻzimiz yigʻamiz: soʻrovnoma, oʻlchash, kuzatish. Bilvosita, yaʼni ikkilamchi manba — boshqa maqsadda yigʻilgan maʼlumotdan foydalanamiz: statistik toʻplamlar, boshqalarning hisobotlari, eski maʼlumotlar bazasi. Bevosita manba ishonchliroq va yangiroq, lekin vaqt talab qiladi. Bilvosita manba tayyor va katta hajmli, lekin eskirgan yoki keraksiz boʻlishi mumkin.",
      easy: "Bevosita — oʻzing yigʻgan maʼlumot. Bilvosita — boshqalar boshqa maqsadda yigʻgan, sen esa undan foydalanyapsan. Oʻzing yiqqaning aniqroq, lekin koʻp vaqt oladi.",
      draw: [],
      animTitle: 'Bevosita va bilvosita manba',
      anim: {
        type: 'compare',
        left: { icon: '🎯', title: 'Bevosita', items: ['Shu maqsadda yigʻiladi', 'Asl manba maʼlum — ishonchli', 'Yangi, faqat keraklisi', 'Lekin: vaqt va mehnat koʻp'] },
        right: { icon: '📚', title: 'Bilvosita', items: ['Boshqa maqsadda yigʻilgan', 'Darhol tayyor, hajmi katta', 'Eskirgan boʻlishi mumkin', 'Keraksiz qismlari koʻp'] }
      },
      next: 'Misol bilan'
    },
    {
      kind: 'example',
      say: "Masalan, Malika Samarqandda kafe ochmoqchi va qaysi taomlar yoqishini bilmoqchi. Oʻzi mahallada soʻrovnoma oʻtkazsa yoki boshqa kafelar menyusini oʻzi borib yozib olsa — bu bevosita manba. Agar internetdagi viloyat statistikasi yoki bir yil oldin boshqa kompaniya oʻtkazgan soʻrov natijasidan foydalansa — bu bilvosita manba.",
      easy: "Malika oʻzi soʻrasa — bevosita. Tayyor statistikani olsa — bilvosita, chunki uni kimdir boshqa ish uchun yiqqan.",
      draw: [],
      animTitle: 'Malikaning kafesi',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '📝', title: 'Bevosita', text: 'Mahallada soʻrovnoma: «Qaysi taomni yoqtirasiz?»' },
          { icon: '🚶‍♀️', title: 'Bevosita', text: 'Boshqa kafelarga borib, narxlarni oʻzi yozib olish' },
          { icon: '📊', title: 'Bilvosita', text: 'Internetdagi viloyat aholisi statistikasi' },
          { icon: '🗂️', title: 'Bilvosita', text: 'Boshqa kompaniyaning bir yil oldingi soʻrovi' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Maʼlumot — qayta ishlanmagan belgilar; axborot — kontekst va maʼno berilgan maʼlumot.',
    'Bilim — axborotga tajriba qoʻshilib, xulosa chiqarilganda paydo boʻladi.',
    'Statik maʼlumot qoʻlda oʻzgaradi; dinamik maʼlumot manba oʻzgarganda avtomatik yangilanadi.',
    'Bevosita manba — shu maqsadda yigʻilgan; bilvosita — boshqa maqsadda yigʻilgan maʼlumot.'
  ],
  questions: [
    {
      id: 'i1q1',
      prompt: 'Qaysilari maʼlumot, qaysilari axborot? Guruhlarga ajrating.',
      hint: 'Maʼnosi tushunarlimi? Unda axborot.',
      explanation: 'Izohsiz belgilar — maʼlumot. «Poyezd 18:40 da joʻnaydi» kabi izohli gaplar — axborot.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'm', label: 'Maʼlumot' },
            { id: 'a', label: 'Axborot' }
          ],
          tiles: [
            { id: 't1', label: '18:40', bin: 'm' },
            { id: 't2', label: 'Poyezd 18:40 da joʻnaydi', bin: 'a' },
            { id: 't3', label: '01 A 777 BA', bin: 'm' },
            { id: 't4', label: 'Dars 3-xonada boʻladi', bin: 'a' },
            { id: 't5', label: '@uzinfo', bin: 'm' },
            { id: 't6', label: 'Daftar narxi 6 000 soʻm', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'i1q2',
      prompt: 'Statik yoki dinamik maʼlumot?',
      hint: 'Odam aralashmasdan oʻzi yangilanadimi?',
      explanation: 'Valyuta kursi, jonli hisob va taksi vaqti avtomatik yangilanadi — dinamik. Darslik, hafta kunlari va yoʻl belgisi — statik.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 's', label: 'Statik' },
            { id: 'd', label: 'Dinamik' }
          ],
          tiles: [
            { id: 't1', label: 'Bank ilovasidagi valyuta kursi', bin: 'd' },
            { id: 't2', label: 'Darslikdagi matn', bin: 's' },
            { id: 't3', label: 'Futbolning jonli hisobi', bin: 'd' },
            { id: 't4', label: 'Kalendardagi hafta kunlari', bin: 's' },
            { id: 't5', label: 'Taksi yetib kelish vaqti', bin: 'd' },
            { id: 't6', label: 'Yoʻl belgisidagi «60»', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'i1q3',
      prompt: 'Bevosita yoki bilvosita manba? (Maqsad: maktab oshxonasi menyusini yaxshilash.)',
      hint: 'Aynan shu maqsad uchun yigʻildimi?',
      explanation: 'Oʻquvchilardan soʻrash va qoldiqlarni oʻlchash — shu maqsadda. Statistika va boshqa maktab hisoboti boshqa maqsadda yigʻilgan — bilvosita.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'b', label: 'Bevosita' },
            { id: 'v', label: 'Bilvosita' }
          ],
          tiles: [
            { id: 't1', label: 'Oʻquvchilar orasida soʻrovnoma', bin: 'b' },
            { id: 't2', label: 'Har kuni ortib qolgan ovqatni tortish', bin: 'b' },
            { id: 't3', label: 'Internetdagi aholi statistikasi', bin: 'v' },
            { id: 't4', label: 'Boshqa maktabning oʻtgan yilgi hisoboti', bin: 'v' }
          ]
        }
      }
    },
    {
      id: 'i1q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Har bir atamaning taʼrifini eslang.',
      explanation: 'Maʼlumotning maʼnosi nomaʼlum; har qanday veb-sayt dinamik emas; bilvosita maʼlumot eskirgan boʻlishi mumkin; bilim tajribaga tayanadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Maʼlumotga kontekst berilsa, u axborotga aylanadi.', value: true },
            { text: 'Har qanday veb-saytdagi maʼlumot dinamik boʻladi.', value: false },
            { text: 'Bilvosita manbadagi maʼlumot eskirgan boʻlishi mumkin.', value: true },
            { text: 'Bilim uchun tajriba kerak emas.', value: false }
          ]
        }
      }
    },
    {
      id: 'i1q5',
      prompt: 'Atamalarni taʼriflari bilan juftlang.',
      hint: 'Bittasi xom, bittasi izohli, bittasi tajribali.',
      explanation: 'Maʼlumot — xom belgilar; axborot — maʼno berilgan maʼlumot; bilim — tajriba qoʻshilgan axborot; dinamik — avtomatik yangilanadigan maʼlumot.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Maʼlumot' }, right: { label: 'qayta ishlanmagan belgilar' } },
            { left: { label: 'Axborot' }, right: { label: 'kontekst va maʼno berilgan maʼlumot' } },
            { left: { label: 'Bilim' }, right: { label: 'tajriba qoʻshilgan axborot' } },
            { left: { label: 'Dinamik maʼlumot' }, right: { label: 'oʻzi yangilanadigan maʼlumot' } }
          ]
        }
      }
    },
    {
      id: 'i1q6',
      prompt: 'Bosqichlarni tartib bilan joylashtiring.',
      hint: 'Xom belgidan boshlanadi, qaror bilan tugaydi.',
      explanation: 'Avval maʼlumot, unga kontekst beriladi — axborot hosil boʻladi, tajriba qoʻshilib bilim va qaror chiqadi.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['Termometr: 38,5', 'Izoh qoʻshiladi: «harorat, °C»', 'Axborot: «Haroratim 38,5 °C»', 'Tajriba: normal harorat 36,6', 'Bilim: «Isitma bor, shifokorga boraman»']
        }
      }
    },
    {
      id: 'i1q7',
      prompt: 'Qaysi biri dinamik maʼlumot emas?',
      hint: 'Uni kim va qanday oʻzgartiradi?',
      explanation: 'Maktab nizomi faqat qoʻlda tahrirlanadi — statik. Qolganlari avtomatik yangilanadi.',
      widget: {
        type: 'odd_one_out',
        props: {
          tiles: [{ text: 'Ob-havo ilovasi' }, { text: 'Poyezdning yetib kelish vaqti' }, { text: 'Kassadagi mahsulot narxi' }, { text: 'Maktab nizomi', odd: true }]
        }
      }
    },
    {
      id: 'i1q8',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Uchta atama: maʼlumot, axborot, bilim.',
      explanation: '«5» — maʼlumot. «Algebradan bahom 5» — axborot. «Tayyorlansam, yaxshi baho olaman» — bilim.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: '«5» — bu' }, { blank: 'maʼlumot' }, { text: '. «Algebradan bahom 5» — bu' }, { blank: 'axborot' }, { text: '. «Yaxshi tayyorlansam, yuqori baho olaman» — bu' }, { blank: 'bilim' }, { text: '.' }],
          bank: ['maʼlumot', 'axborot', 'bilim', 'kod']
        }
      }
    },
    {
      id: 'i1q9',
      prompt: 'Bevosita manbaning afzalliklarini bosing.',
      hint: 'Oʻzing yiqqan maʼlumot qanday boʻladi?',
      explanation: 'Bevosita manba ishonchli, yangi va faqat keraklisini oʻz ichiga oladi. «Darhol tayyor» va «hajmi juda katta» — bilvosita manba afzalliklari.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Asl manba maʼlum — ishonchli', match: true },
            { id: 'b', text: 'Darhol tayyor, kutish shart emas', match: false },
            { id: 'c', text: 'Faqat kerakli maʼlumot yigʻiladi', match: true },
            { id: 'd', text: 'Yaqinda yigʻilgan — dolzarb', match: true },
            { id: 'e', text: 'Juda katta hajmdagi namunalar', match: false }
          ]
        }
      }
    },
    {
      id: 'i1q10',
      prompt: 'Soʻzni yozing.',
      hint: 'Ikkilamchi manba.',
      explanation: 'Boshqa maqsadda yigʻilgan maʼlumot manbasi — bilvosita (ikkilamchi) manba.',
      widget: { type: 'text_answer', props: { before: 'Boshqa maqsadda yigʻilgan maʼlumot —', after: 'manba.', answer: ['bilvosita', 'ikkilamchi'], width: 10 } }
    }
  ]
};
