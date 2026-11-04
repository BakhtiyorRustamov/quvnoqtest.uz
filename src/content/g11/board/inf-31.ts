import type { BoardLesson } from './types';

/** Darslik: 11.01–11.07 — yangi texnologiyalar: 3D printer, 4G va 5G, sunʼiy intellekt, boyitilgan reallik, biometrika, bulutli texnologiyalar. */
export const INF_31: BoardLesson = {
  n: 31,
  label: '31',
  part: 11,
  title: 'Yangi texnologiyalar (1)',
  section: '11.01–11.07',
  steps: [
    {
      kind: 'hook',
      say: "Shifokor bemorning tizza boʻgʻimini kompyuterda modellashtirdi va 3D printer uni qatlam-qatlam qilib chop etdi. 3D printer oddiy printerdek sahifa emas, uch oʻlchamli buyum yaratadi: plastik, metall yoki hatto beton qatlamlarini birin-ketin qoʻyib. Avval kompyuterda model chiziladi, dastur uni yupqa qatlamlarga boʻladi, printer esa pastdan yuqoriga quradi.",
      easy: "3D printer buyumni yupqa qatlamlardan, pastdan yuqoriga qurib chiqaradi: model ➜ qatlamlar ➜ chop etish.",
      draw: [],
      animTitle: '3D chop etish',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🖥️', label: '3D model' },
          { icon: '🔪', label: 'Qatlamlarga boʻlish' },
          { icon: '🖨️', label: 'Qatlamma-qatlam' },
          { icon: '🦴', label: 'Tayyor buyum' }
        ],
        items: [
          { texts: ['tizza implanti', '400 qatlam', 'titan kukuni', 'bemorga moslangan'] },
          { texts: ['uy devori', '120 qatlam', 'maxsus beton', '2 kunda qurildi'] }
        ],
        result: 'Har bir buyum aynan kerakli shaklda'
      },
      next: 'Qayerda ishlatiladi?'
    },
    {
      kind: 'explain',
      say: "3D printerlar tibbiyotda — protez, implant va tish qoplamalari; muhandislikda — prototiplar va ehtiyot qismlar; qurilishda — uylar; taʼlimda — modellar uchun ishlatiladi. Afzalligi: har bir buyumni alohida moslab yasash, kam chiqindi, tez prototip. Kamchiligi: ommaviy ishlab chiqarishga nisbatan sekin, katta va mustahkam buyumlar uchun qimmat, mualliflik huquqini buzib nusxa koʻpaytirish xavfi.",
      easy: "3D printer — protez, ehtiyot qism, model, hatto uy. Moslab yasash oson, lekin koʻp sonli buyum uchun sekin.",
      draw: [],
      animTitle: '3D printer qayerda',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🦿', title: 'Tibbiyot', text: 'Protez, implant, tish qoplamasi' },
          { icon: '⚙️', title: 'Muhandislik', text: 'Prototip va ehtiyot qismlar' },
          { icon: '🏠', title: 'Qurilish', text: 'Beton qatlamli uylar' },
          { icon: '🎓', title: 'Taʼlim', text: 'Molekula, yurak, binolar modellari' }
        ]
      },
      next: 'Sunʼiy intellekt-chi?'
    },
    {
      kind: 'explain',
      say: "Sunʼiy intellekt — odatda inson aqlini talab qiladigan ishlarni bajaradigan kompyuter tizimlari: nutqni tanish, rasmdagi narsalarni aniqlash, tarjima, maslahat berish. Koʻp tizimlar mashinali oʻqitishdan foydalanadi: dasturga minglab misollar koʻrsatiladi va u qonuniyatni oʻzi topadi. Masalan, mushuk rasmlari koʻrsatilsa, yangi rasmda mushukni taniydi. Ovozli yordamchilar, navigatordagi tirbandlik prognozi, spam filtri — hammasi sunʼiy intellekt.",
      easy: "Sunʼiy intellekt — misollardan oʻrganib, odamga oʻxshab tanish, tarjima qilish va maslahat berish.",
      draw: [],
      animTitle: 'Mashinali oʻqitish',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🖼️', label: 'Misollar' },
          { icon: '🧠', label: 'Oʻrganish' },
          { icon: '📷', label: 'Yangi rasm' },
          { icon: '🏷️', label: 'Javob' }
        ],
        items: [{ texts: ['10 000 ta mushuk rasmi', 'qulog, moʻylov, koʻz shakli', 'notanish rasm', '«mushuk» — 97 %'] }],
        result: 'Qoidani dasturchi emas, model oʻzi topdi'
      },
      next: 'AR nima?'
    },
    {
      kind: 'explain',
      say: "Boyitilgan reallik — AR — haqiqiy dunyo tasviri ustiga kompyuter maʼlumotini qoʻshadi. Telefon kamerasini koʻchaga qaratsangiz, ekranda kafelar nomi va masofasi chiqadi; darslikdagi rasmga qaratsangiz, yurak modeli aylanadi. Virtual reallikdan farqi: AR da siz atrofni koʻrib turasiz, faqat ustiga qoʻshimcha qatlam qoʻshiladi.",
      easy: "AR — kamera orqali koʻrinayotgan haqiqiy dunyo ustiga raqamli belgilar va modellar qoʻshish.",
      draw: [],
      animTitle: 'Boyitilgan reallik',
      anim: {
        type: 'flow',
        stations: [
          { icon: '📷', label: 'Kamera tasviri' },
          { icon: '🧠', label: 'Tanish' },
          { icon: '✨', label: 'Raqamli qatlam' }
        ],
        items: [
          { texts: ['koʻcha', 'kafe binosi', '☕ «Lola» kafesi · 120 m'] },
          { texts: ['darslikdagi rasm', 'yurak sxemasi', 'aylanuvchi 3D yurak'] }
        ],
        result: 'Haqiqiy dunyo + raqamli maʼlumot'
      },
      next: 'Biometrika nima?'
    },
    {
      kind: 'explain',
      say: "Biometrik maʼlumot — insonning jismoniy yoki xulq xususiyatlari oʻlchovi: barmoq izi, yuz, koʻz qorachigʻi, ovoz, hatto yurish uslubi. Telefonni barmoq yoki yuz bilan ochish, aeroportdagi pasport nazorati shundan foydalanadi. Afzalligi — parolni unutib yoki boshqaga berib boʻlmaydi. Kamchiligi — barmoq izi oʻgʻirlansa, uni parol kabi almashtirib boʻlmaydi, shuning uchun bu maʼlumotlar juda ehtiyotkor saqlanishi kerak.",
      easy: "Biometrika — barmoq izi, yuz, ovoz bilan tanish. Unutib boʻlmaydi, lekin oʻgʻirlansa, almashtirib ham boʻlmaydi.",
      draw: [],
      animTitle: 'Biometrika',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Afzalliklari', items: ['Unutib boʻlmaydi', 'Boshqaga berib boʻlmaydi', 'Tez va qulay', 'Soxtalashtirish qiyin'] },
        right: { icon: '👎', title: 'Kamchiliklari', items: ['Oʻgʻirlansa — almashtirib boʻlmaydi', 'Maxfiylik xavfi', 'Jarohat aniqlikni buzadi', 'Uskunalar qimmat'] }
      },
      next: 'Bulut va 5G-chi?'
    },
    {
      kind: 'explain',
      say: "Bulutli texnologiya — fayl va dasturlarni oʻz qurilmangizda emas, internetdagi serverlarda saqlash va ishlatish. Fayllar har qanday qurilmadan ochiladi, telefon yoʻqolsa ham saqlanib qoladi, bir hujjat ustida koʻp kishi birga ishlaydi. Lekin internet kerak va maʼlumot boshqa kompaniya serverida turadi. Mobil aloqaning 4G va 5G avlodlari esa bunga tezlik beradi: 5G da kechikish juda kam, shuning uchun bulutli oʻyinlar, onlayn tibbiyot va aqlli shaharlar mumkin boʻladi.",
      easy: "Bulut — fayllar internetdagi serverda: har joydan ochiladi, lekin internet kerak. 5G — juda tez va kechikishsiz aloqa.",
      draw: [],
      animTitle: 'Bulutli texnologiya',
      anim: {
        type: 'net',
        together: true,
        nodes: [
          { id: 'c', x: 50, y: 12, icon: '☁️', label: 'Bulut serverlari' },
          { id: 'p', x: 14, y: 44, icon: '📱', label: 'Telefon' },
          { id: 'l', x: 50, y: 50, icon: '💻', label: 'Noutbuk' },
          { id: 's', x: 86, y: 44, icon: '🏫', label: 'Maktab kompyuteri' }
        ],
        links: [
          ['c', 'p'],
          ['c', 'l'],
          ['c', 's']
        ],
        packets: [
          { path: ['c', 'p'], label: 'referat.docx', color: '#0ea5e9' },
          { path: ['c', 'l'], label: 'referat.docx', color: '#0ea5e9' },
          { path: ['c', 's'], label: 'referat.docx', color: '#0ea5e9' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    '3D printer buyumni qatlamma-qatlam quradi: tibbiyot, muhandislik, qurilish, taʼlim.',
    'Sunʼiy intellekt — inson aqlini talab qiladigan ishlarni bajaradi; mashinali oʻqitish misollardan oʻrganadi.',
    'Boyitilgan reallik (AR) haqiqiy dunyo ustiga raqamli qatlam qoʻshadi.',
    'Biometrika — barmoq izi, yuz, ovoz bilan tanish; unutilmaydi, lekin oʻgʻirlansa almashtirib boʻlmaydi.',
    'Bulutli texnologiya — fayl va dasturlar internetdagi serverlarda; 4G/5G tez va kam kechikishli aloqa beradi.'
  ],
  questions: [
    {
      id: 'i31q1',
      prompt: 'Texnologiyani taʼrifi bilan juftlang.',
      hint: 'Qatlam, oʻrganish, qoʻshimcha qatlam, barmoq izi.',
      explanation: '3D printer — qatlamma-qatlam buyum; SI — misollardan oʻrganadi; AR — haqiqiy dunyo ustiga raqamli qatlam; biometrika — tana xususiyatlari bilan tanish.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: '3D printer' }, right: { label: 'buyumni qatlamma-qatlam quradi' } },
            { left: { label: 'Sunʼiy intellekt' }, right: { label: 'misollardan oʻrganib taniydi' } },
            { left: { label: 'Boyitilgan reallik' }, right: { label: 'haqiqiy tasvir ustiga raqamli qatlam' } },
            { left: { label: 'Biometrika' }, right: { label: 'barmoq izi, yuz bilan tanish' } }
          ]
        }
      }
    },
    {
      id: 'i31q2',
      prompt: '3D chop etish bosqichlarini tartiblang.',
      hint: 'Kompyuterdan buyumgacha.',
      explanation: '3D model chiziladi ➜ dastur qatlamlarga boʻladi ➜ printer pastdan yuqoriga quradi ➜ tayyor buyum tozalanadi.',
      widget: { type: 'step_order', props: { steps: ['Kompyuterda 3D model chiziladi', 'Dastur modelni qatlamlarga boʻladi', 'Printer qatlamma-qatlam quradi', 'Tayyor buyum tozalanadi'] } }
    },
    {
      id: 'i31q3',
      prompt: 'Qaysilari sunʼiy intellekt misoli? Bosing.',
      hint: 'Misollardan oʻrganib, odamga oʻxshab taniydimi?',
      explanation: 'Ovozli yordamchi, spam filtri va yuzni tanish — SI. Kalkulyatorda qoʻshish va oddiy taymer — oddiy dastur.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Ovozli yordamchi', match: true },
            { id: 'b', text: 'Pochtadagi spam filtri', match: true },
            { id: 'c', text: 'Rasmdagi yuzni tanish', match: true },
            { id: 'd', text: 'Kalkulyatorda 2 + 2', match: false },
            { id: 'e', text: 'Oshxona taymeri', match: false }
          ]
        }
      }
    },
    {
      id: 'i31q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'AR va VR farqi.',
      explanation: 'AR da atrof koʻrinib turadi; bulut internetsiz ishlamaydi; biometrik maʼlumotni almashtirib boʻlmaydi; 3D printer ommaviy ishlab chiqarishdan sekinroq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Boyitilgan reallikda foydalanuvchi atrofini koʻrib turadi.', value: true },
            { text: 'Bulutdagi fayllarni internetsiz har doim ochish mumkin.', value: false },
            { text: 'Oʻgʻirlangan barmoq izini parol kabi almashtirish oson.', value: false },
            { text: '3D printer bitta buyumni moslab yasash uchun qulay.', value: true }
          ]
        }
      }
    },
    {
      id: 'i31q5',
      prompt: 'Biometrik maʼlumot yoki yoʻq?',
      hint: 'Tananing xususiyatimi?',
      explanation: 'Barmoq izi, yuz shakli, koʻz qorachigʻi, ovoz — biometrik. Parol va PIN-kod — bilim, biometrika emas.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'b', label: 'Biometrik' },
            { id: 'n', label: 'Biometrik emas' }
          ],
          tiles: [
            { id: 't1', label: 'Barmoq izi', bin: 'b' },
            { id: 't2', label: 'Parol', bin: 'n' },
            { id: 't3', label: 'Yuz shakli', bin: 'b' },
            { id: 't4', label: 'PIN-kod', bin: 'n' },
            { id: 't5', label: 'Ovoz', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'i31q6',
      prompt: 'Bulutli saqlashning afzalliklarini bosing.',
      hint: 'Har joydan, birga ishlash…',
      explanation: 'Har qurilmadan ochish, telefon yoʻqolsa ham saqlanishi va birgalikda ishlash — afzallik. Internetga bogʻliqlik — kamchilik.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Har qanday qurilmadan ochiladi', match: true },
            { id: 'b', text: 'Telefon yoʻqolsa ham fayl qoladi', match: true },
            { id: 'c', text: 'Koʻp kishi birga ishlaydi', match: true },
            { id: 'd', text: 'Internetsiz ishlaydi', match: false }
          ]
        }
      }
    },
    {
      id: 'i31q7',
      prompt: 'Qaysi biri boyitilgan reallik misoli emas?',
      hint: 'AR da haqiqiy dunyo koʻrinadi.',
      explanation: 'Koʻzni toʻliq yopuvchi VR koʻzoynagidagi oʻyin — virtual reallik. Qolganlari kamera tasviri ustiga qatlam qoʻshadi.',
      widget: {
        type: 'odd_one_out',
        props: { tiles: [{ text: 'Kamerada koʻcha ustida kafelar nomi' }, { text: 'Xonaga virtual divan qoʻyib koʻrish' }, { text: 'Darslik rasmida aylanuvchi 3D yurak' }, { text: 'Toʻliq yopiq VR koʻzoynakdagi oʻyin', odd: true }] }
      }
    },
    {
      id: 'i31q8',
      prompt: 'Model 400 qatlamdan iborat, printer bir qatlamni 30 soniyada chop etadi. Necha daqiqa ketadi?',
      hint: '400 × 30 soniya, keyin 60 ga boʻling.',
      explanation: '400 × 30 = 12 000 soniya = 200 daqiqa.',
      widget: { type: 'number_answer', props: { answer: 200, unit: 'daqiqa' } }
    },
    {
      id: 'i31q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Misollardan oʻrganish.',
      explanation: 'Mashinali oʻqitishda modelga koʻp misol koʻrsatiladi va u qonuniyatni oʻzi topadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Mashinali oʻqitishda modelga koʻp' }, { blank: 'misollar' }, { text: 'koʻrsatiladi va u' }, { blank: 'qonuniyatni' }, { text: 'oʻzi topadi.' }],
          bank: ['misollar', 'qonuniyatni', 'parollar']
        }
      }
    },
    {
      id: 'i31q10',
      prompt: 'Boyitilgan reallikning qisqa nomi (2 harf).',
      hint: 'Augmented Reality',
      explanation: 'AR — Augmented Reality.',
      widget: { type: 'text_answer', props: { answer: 'AR', width: 4 } }
    }
  ]
};
