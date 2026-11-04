import type { BoardLesson } from './types';

/** Darslik: 2.02, 2.05 — foydalanuvchi interfeyslari, interfeys dizayni, aqliy modellar, kompilyator va interpretator. */
export const INF_9: BoardLesson = {
  n: 9,
  label: '9',
  part: 10,
  title: 'Interfeyslar, kompilyator va interpretator',
  section: '2.02, 2.05',
  steps: [
    {
      kind: 'hook',
      say: "Kompyuterga buyruqni turli yoʻllar bilan berish mumkin: buyruq yozib, sichqoncha bilan belgini bosib, ovoz bilan aytib yoki qoʻl harakati bilan. Foydalanuvchi bilan kompyuter orasidagi bunday aloqa usuli — foydalanuvchi interfeysi deyiladi. Toʻrt asosiy turini koʻramiz.",
      easy: "Interfeys — kompyuter bilan «gaplashish» usuli: yozib, bosib, gapirib yoki qoʻl silkitib.",
      draw: [],
      animTitle: 'Toʻrt xil interfeys',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '⌨️', title: 'Buyruq satri (CLI)', text: 'Buyruqlar matn bilan yoziladi' },
          { icon: '🖱️', title: 'Grafik (GUI)', text: 'Oynalar, belgilar, menyular, koʻrsatkich' },
          { icon: '🗣️', title: 'Muloqot (ovozli)', text: 'Buyruq ovoz bilan aytiladi' },
          { icon: '👋', title: 'Ishoraviy', text: 'Qoʻl, koʻz yoki tana harakati' }
        ]
      },
      next: 'CLI qanday ishlaydi?'
    },
    {
      kind: 'explain',
      say: "Buyruq satri interfeysida foydalanuvchi buyruqlarni aniq qoidaga koʻra yozadi. Masalan, papka yaratish, unga oʻtish va barcha rasmlarni zaxira diskka koʻchirish uch qator bilan bajariladi. Buyruqlarni yodlash kerak, bitta xato harf ham ishlamaydi, lekin tajribali foydalanuvchi uchun bu juda tez va kuchli usul. Kam xotira talab qiladi, shuning uchun serverlar va tarmoq qurilmalarida koʻp ishlatiladi.",
      easy: "CLI — buyruqni yozib berasiz. Yozishni bilsangiz, juda tez. Bilmasangiz, qiyin: har bir buyruqni yodlash kerak.",
      draw: [],
      animTitle: 'Buyruq satri',
      anim: {
        type: 'code',
        lang: 'pseudo',
        lines: ['> mkdir loyiha', '> cd loyiha', '> copy C:\\rasmlar\\*.jpg .', '> dir'],
        trace: [
          { line: 1, out: 'Papka yaratildi: loyiha' },
          { line: 2, vars: { joriy_papka: 'loyiha' } },
          { line: 3, out: '12 ta fayl koʻchirildi' },
          { line: 4, out: '12 ta .jpg fayl' }
        ]
      },
      next: 'GUI bilan farqi?'
    },
    {
      kind: 'explain',
      say: "Grafik interfeysda hammasi koʻz oldida: oynalar, belgilar, menyular va koʻrsatkich. Uni oʻrganish oson, buyruq yodlash shart emas. Lekin koʻp xotira va protsessor kuchini talab qiladi, baʼzi murakkab ishlar uchun esa CLI tezroq. Bugun eng koʻp ishlatiladigan interfeys — GUI: kompyuter, telefon, televizor, hatto avtomobil ekranlari.",
      easy: "GUI — rasm va tugmalar bilan ishlash. Oson, lekin kompyuterdan koʻproq kuch talab qiladi.",
      draw: [],
      animTitle: 'CLI va GUI',
      anim: {
        type: 'compare',
        left: { icon: '⌨️', title: 'CLI', items: ['Buyruqlarni yodlash kerak', 'Xato yozsa — ishlamaydi', 'Tajribali uchun juda tez', 'Kam xotira talab qiladi'] },
        right: { icon: '🖱️', title: 'GUI', items: ['Oʻrganish oson', 'Belgi va menyular koʻrinib turadi', 'Murakkab ishlar sekinroq', 'Koʻp xotira talab qiladi'] }
      },
      next: 'Ovoz va ishora-chi?'
    },
    {
      kind: 'explain',
      say: "Muloqot interfeysida buyruq ovoz bilan beriladi: «Onamga qoʻngʻiroq qil» yoki «Ertaga ob-havo qanday?». Qoʻl band boʻlganda, masalan, mashina haydayotganda juda qulay. Muammosi — shovqin, sheva va turli talaffuzlarda xato tushunishi mumkin. Ishoraviy interfeys esa harakatni taniydi: barmoqlarni ekranda yaqinlashtirib rasmni kichraytirish, qoʻl silkitib sahifani almashtirish, koʻz harakati bilan boshqarish. U imkoniyati cheklangan insonlar uchun juda foydali, lekin aniq kamera va sensorlar talab qiladi.",
      easy: "Ovozli — gapirib boshqarasiz, lekin shovqinda adashadi. Ishoraviy — qoʻl yoki koʻz harakati bilan boshqarasiz, lekin aniq sensor kerak.",
      draw: [],
      animTitle: 'Ovoz va ishora',
      anim: {
        type: 'compare',
        left: { icon: '🗣️', title: 'Muloqot', items: ['Qoʻl kerak emas', 'Yozishdan tezroq', 'Shovqin va shevada adashadi', 'Qaysi buyruqni tushunishini bilish kerak'] },
        right: { icon: '👋', title: 'Ishoraviy', items: ['Tabiiy harakatlar', 'Ekranga tegish shart emas', 'Imkoniyati cheklanganlarga qulay', 'Aniq sensor va kamera kerak'] }
      },
      next: 'Yaxshi interfeys qanday boʻladi?'
    },
    {
      kind: 'explain',
      say: "Interfeys loyihalashda beshta narsaga eʼtibor beriladi. Rang: och fonda toʻq matn, qizil-yashil kabi daltoniklar ajratolmaydigan juftlardan qochish, havolalar — koʻk. Maket: oʻxshash elementlar bir guruhda, «Tasdiqlash» tugmasi forma oxirida. Shrift: oʻqish uchun 11–12 punkt, sarlavha kattaroq, butun ilovada bir xil. Axborot hajmi: inson bir vaqtda taxminan yettita elementni eslaydi, shuning uchun guruhlarni yettitadan oshirmang. Boshqaruv elementlari: yorliq, matn maydoni, belgilash katagi, tanlash tugmasi va ochiladigan roʻyxat.",
      easy: "Yaxshi interfeys: oʻqiladigan ranglar, tartibli joylashuv, bir xil shrift, ortiqcha maʼlumotsiz — guruhda yettitagacha element.",
      draw: [],
      animTitle: 'Interfeys dizayni',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🎨', title: 'Rang', text: 'Och fonda toʻq matn, havola — koʻk' },
          { icon: '📐', title: 'Maket', text: 'Oʻxshashlar birga, tugmalar oxirida' },
          { icon: '🔠', title: 'Shrift', text: '11–12 punkt, hamma joyda bir xil' },
          { icon: '7️⃣', title: 'Axborot hajmi', text: 'Guruhda 7 tagacha element' },
          { icon: '☑️', title: 'Boshqaruv', text: 'Maydon, katak, roʻyxat, tugma' }
        ]
      },
      next: 'Aqliy model nima?'
    },
    {
      kind: 'example',
      say: "Aqliy model — odamning biror narsa qanday ishlashi haqidagi tasavvuri. Dizaynerlar shundan foydalanadi: kompyuterdagi fayllar tizimi ofisdagi qogʻoz hujjatlar tartibiga oʻxshatib yaratilgan. Javon — disk, papka — papka, hujjat — fayl, chiqindi savati — korzina. Shuning uchun odam yangi tizimni oson oʻzlashtiradi: u allaqachon «qanday ishlashini» biladi.",
      easy: "Hayotda qogʻozni javondagi papkadan qidiramiz. Kompyuterda ham diskdagi papkadan faylni qidiramiz. Tanish tartib — oʻrganish oson.",
      draw: [],
      animTitle: 'Ofis ➜ kompyuter',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🗄️', label: 'Ofisda' },
          { icon: '💻', label: 'Kompyuterda' }
        ],
        items: [{ texts: ['Hujjatlar javoni', 'Disk (C:, D:)'] }, { texts: ['Papka', 'Papka'] }, { texts: ['Qogʻoz hujjat', 'Fayl'] }, { texts: ['Chiqindi savati', 'Korzina'] }],
        result: 'Tanish tasavvur — yangi tizimni oson oʻrganish'
      },
      next: 'Davom eting'
    },
    {
      kind: 'explain',
      say: "Dasturchi kodni Python yoki JavaScript kabi tilda yozadi, protsessor esa faqat mashina kodini tushunadi. Tarjima ikki yoʻl bilan qilinadi. Kompilyator butun dasturni bir yoʻla oʻgirib, bajariladigan fayl yaratadi: keyin u tez ishlaydi, lekin faqat oʻsha operatsion tizimda. Interpretator esa satrma-satr oʻgirib, darhol bajaradi. Kuzating: birinchi uch satr bajarildi, toʻrtinchisida xato topildi va dastur toʻxtadi. Kompilyator bu xatoni dastur ishga tushmasdan oldin aytgan boʻlardi.",
      easy: "Kompilyator — kitobni oldin toʻliq tarjima qiladi, keyin oʻqiysiz. Interpretator — sinxron tarjimon: har bir gapni darhol tarjima qiladi. Xato boʻlsa, oʻsha joyda toʻxtaydi.",
      draw: [],
      animTitle: 'Interpretator satrma-satr ishlaydi',
      anim: {
        type: 'code',
        lang: 'js',
        lines: ['let a = 5;', 'console.log(a);', 'let b = a * 2;', 'console.log(b + c);'],
        trace: [
          { line: 1, vars: { a: 5 } },
          { line: 2, out: '5' },
          { line: 3, vars: { b: 10 } },
          { line: 4, out: '⛔ Xato: c aniqlanmagan (4-satr)' }
        ]
      },
      next: 'Farqlarini jamlang'
    },
    {
      kind: 'explain',
      say: "Jamlaymiz. Kompilyator butun kodni oldindan oʻgiradi, natija tez ishlaydi va manba kodni bermasdan tarqatish mumkin. Lekin har oʻzgarishdan keyin qayta kompilyatsiya kerak va fayl bitta operatsion tizimga moʻljallangan. Interpretator satrma-satr ishlaydi: dasturni sinash va xatoni topish qulay, turli tizimlarda ishlaydi, lekin har safar tarjima qilgani uchun sekinroq.",
      easy: "Kompilyator: oldin tarjima — keyin tez ishlash. Interpretator: tarjima va ishlash birga — sinash oson, lekin sekinroq.",
      draw: [],
      animTitle: 'Kompilyator va interpretator',
      anim: {
        type: 'compare',
        left: { icon: '🏭', title: 'Kompilyator', items: ['Butun kodni bir yoʻla oʻgiradi', 'Bajariladigan fayl yaratadi', 'Tez ishlaydi', 'Bitta OT ga moʻljallangan'] },
        right: { icon: '🎧', title: 'Interpretator', items: ['Satrma-satr oʻgiradi', 'Fayl yaratmaydi', 'Sekinroq ishlaydi', 'Sinash va xato topish qulay'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Interfeys turlari: buyruq satri (CLI), grafik (GUI), muloqot (ovozli), ishoraviy.',
    'CLI — tez, kam xotira, lekin buyruqlarni yodlash kerak; GUI — oson, lekin koʻp resurs talab qiladi.',
    'Dizayn: rang, maket, shrift, axborot hajmi (≈7 element), boshqaruv elementlari.',
    'Aqliy model — odamning tizim qanday ishlashi haqidagi tasavvuri (papka, fayl, korzina).',
    'Kompilyator butun kodni oldindan oʻgiradi; interpretator satrma-satr oʻgirib bajaradi.'
  ],
  questions: [
    {
      id: 'i9q1',
      prompt: 'Holatni interfeys turi bilan juftlang.',
      hint: 'Yozish, bosish, gapirish, harakat.',
      explanation: 'Buyruq yozish — CLI; belgini bosish — GUI; «Qoʻngʻiroq qil» deyish — muloqot; barmoq bilan kattalashtirish — ishoraviy.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: '«copy fayl.txt D:» yozildi' }, right: { label: 'CLI' } },
            { left: { label: 'Papka belgisi ikki marta bosildi' }, right: { label: 'GUI' } },
            { left: { label: '«Onamga qoʻngʻiroq qil» deyildi' }, right: { label: 'muloqot' } },
            { left: { label: 'Ikki barmoq bilan rasm kattalashtirildi' }, right: { label: 'ishoraviy' } }
          ]
        }
      }
    },
    {
      id: 'i9q2',
      prompt: 'CLI yoki GUI xususiyati?',
      hint: 'Qaysi biri koʻproq xotira talab qiladi?',
      explanation: 'CLI: buyruqlarni yodlash, kam xotira, tajribalilar uchun tez. GUI: oʻrganish oson, menyu va belgilar, koʻp xotira.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'c', label: 'CLI' },
            { id: 'g', label: 'GUI' }
          ],
          tiles: [
            { id: 't1', label: 'Buyruqlarni yodlash kerak', bin: 'c' },
            { id: 't2', label: 'Oʻrganish oson', bin: 'g' },
            { id: 't3', label: 'Kam xotira talab qiladi', bin: 'c' },
            { id: 't4', label: 'Menyu va belgilar bor', bin: 'g' },
            { id: 't5', label: 'Koʻp xotira talab qiladi', bin: 'g' },
            { id: 't6', label: 'Bitta xato harf ham ishlamaydi', bin: 'c' }
          ]
        }
      }
    },
    {
      id: 'i9q3',
      prompt: 'Kompilyator yoki interpretator?',
      hint: 'Bir yoʻlami yoki satrma-satrmi?',
      explanation: 'Kompilyator: butun kodni oʻgiradi, bajariladigan fayl, tez. Interpretator: satrma-satr, sinash qulay, sekinroq.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'k', label: 'Kompilyator' },
            { id: 'i', label: 'Interpretator' }
          ],
          tiles: [
            { id: 't1', label: 'Butun kodni bir yoʻla oʻgiradi', bin: 'k' },
            { id: 't2', label: 'Satrma-satr oʻgiradi', bin: 'i' },
            { id: 't3', label: 'Bajariladigan fayl yaratadi', bin: 'k' },
            { id: 't4', label: 'Dasturni sinashda qulay', bin: 'i' },
            { id: 't5', label: 'Natija tezroq ishlaydi', bin: 'k' },
            { id: 't6', label: 'Har safar tarjima qiladi — sekinroq', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'i9q4',
      prompt: 'Dastur: 1) a = 2  2) chiqar(a)  3) chiqar(b)  4) chiqar(a + 1). b aniqlanmagan. Interpretator xatogacha nechta satrni bajaradi?',
      hint: 'Satrma-satr: xato qaysi satrda?',
      explanation: '1- va 2-satrlar bajariladi, 3-satrda xato chiqib dastur toʻxtaydi. Javob: 2.',
      widget: { type: 'number_answer', props: { answer: 2, unit: 'satr' } }
    },
    {
      id: 'i9q5',
      prompt: 'Yaxshi interfeys qoidalarini bosing.',
      hint: 'Oʻqish oson boʻlsinmi yoki chiroylimi?',
      explanation: 'Och fonda toʻq matn, havola — koʻk, guruhda 7 tagacha element. Kulrang fondagi qora matn va qizil-yashil juftlik — yomon tanlov.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Oq fonda qora matn', match: true },
            { id: 'b', text: 'Havolalar koʻk rangda', match: true },
            { id: 'c', text: 'Guruhda 7 tagacha element', match: true },
            { id: 'd', text: 'Kulrang fonda qora matn', match: false },
            { id: 'e', text: 'Muhim farq faqat qizil va yashil bilan', match: false }
          ]
        }
      }
    },
    {
      id: 'i9q6',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Ovozli interfeys shovqinda qanday ishlaydi?',
      explanation: 'Shovqin ovozli interfeysga xalaqit beradi; GUI eng keng tarqalgan; kompilyatsiya qilingan fayl bitta OT uchun; ishoraviy interfeys imkoniyati cheklanganlarga yordam beradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ovozli interfeys shovqinli joyda ham har doim aniq ishlaydi.', value: false },
            { text: 'GUI — bugun eng koʻp ishlatiladigan interfeys.', value: true },
            { text: 'Windows uchun kompilyatsiya qilingan dastur Linuxda qayta kompilyatsiyasiz ishlamaydi.', value: true },
            { text: 'Ishoraviy interfeys uchun sensor va kamera kerak emas.', value: false }
          ]
        }
      }
    },
    {
      id: 'i9q7',
      prompt: 'Aqliy modelni juftlang: ofisdagi narsa ➜ kompyuterdagi narsa.',
      hint: 'Fayllar tizimi ofis tartibiga oʻxshatilgan.',
      explanation: 'Javon — disk, qogʻoz hujjat — fayl, chiqindi savati — korzina, papka — papka.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Hujjatlar javoni' }, right: { label: 'disk' } },
            { left: { label: 'Qogʻoz hujjat' }, right: { label: 'fayl' } },
            { left: { label: 'Chiqindi savati' }, right: { label: 'korzina' } }
          ]
        }
      }
    },
    {
      id: 'i9q8',
      prompt: 'Qaysi biri GUI elementi emas?',
      hint: 'Oynalar, belgilar, menyular, koʻrsatkich…',
      explanation: 'GUI elementlari: oyna, belgi (ikonka), menyu, koʻrsatkich. Kompilyator — tarjimon dastur.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Oyna' }, { text: 'Menyu' }, { text: 'Ikonka' }, { text: 'Kompilyator', odd: true }] } }
    },
    {
      id: 'i9q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Haydovchi qoʻli band.',
      explanation: 'Mashina haydayotganda ovozli (muloqot) interfeys, jarrohlik xonasida esa ekranga tegmaslik uchun ishoraviy interfeys qulay.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Mashina haydayotganda' }, { blank: 'ovozli' }, { text: 'interfeys qulay. Jarroh ekranga tegmasligi uchun' }, { blank: 'ishoraviy' }, { text: 'interfeys foydali.' }],
          bank: ['ovozli', 'ishoraviy', 'buyruq satri']
        }
      }
    },
    {
      id: 'i9q10',
      prompt: 'Inson bir vaqtda taxminan nechta elementni eslab qola oladi?',
      hint: 'Guruhdagi elementlar soni chegarasi.',
      explanation: 'Taxminan 7 ta — shuning uchun guruhlar yettitadan oshmasligi kerak.',
      widget: { type: 'number_answer', props: { answer: 7, unit: 'ta' } }
    }
  ]
};
