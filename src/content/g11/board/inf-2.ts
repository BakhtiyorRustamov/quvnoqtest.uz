import type { BoardLesson } from './types';

/** Darslik: 1.03–1.04 — axborot sifati; maʼlumotlarga kod berish, afzallik va kamchiliklari. */
export const INF_2: BoardLesson = {
  n: 2,
  label: '2',
  part: 10,
  title: 'Axborot sifati va maʼlumotlarni kodlash',
  section: '1.03–1.04',
  steps: [
    {
      kind: 'hook',
      say: "Doʻstingiz tugʻilgan kunga taklifnoma yubordi: «Shanba kuni soat oltida, Chilonzorda, bizning uyda!». Qaysi shanba? Ertalab oltidami yoki kechqurunmi? Chilonzorning qayeri? Axborot bor, lekin undan foydalanib boʻlmaydi. Keling, bu taklifnomani tekshiramiz.",
      easy: "Taklifnomada sana, aniq vaqt va toʻliq manzil yoʻq. Shuning uchun mehmon qayerga va qachon borishni bilmaydi. Bunday axborot sifatsiz hisoblanadi.",
      draw: [],
      animTitle: 'Taklifnomani tekshiramiz',
      anim: {
        type: 'form',
        title: '🎉 Tugʻilgan kun taklifnomasi',
        fields: [
          { label: 'Kun', value: 'Shanba', check: 'Toʻliqlik', ok: false, note: 'qaysi sana ekani yozilmagan' },
          { label: 'Vaqt', value: '6:00', check: 'Aniqlik', ok: false, note: 'ertalabmi yoki kechqurunmi — nomaʼlum' },
          { label: 'Manzil', value: 'Chilonzor', check: 'Tafsilot', ok: false, note: 'kvartal va uy raqami yoʻq' },
          { label: 'Telefon', value: '+998 90 123 45 67', check: 'Aniqlik', ok: true, note: 'toʻgʻri va toʻliq' }
        ]
      },
      next: 'Davom eting'
    },
    {
      kind: 'explain',
      say: "Axborot sifati beshta xususiyat bilan oʻlchanadi. Birinchisi — aniqlik: xato raqam yoki imlo xatosi boʻlmasligi kerak. Ikkinchisi — moslik: axborot aynan sizning maqsadingizga tegishli boʻlishi kerak. Uchinchisi — dolzarblik: eskirgan axborot foyda bermaydi. Toʻrtinchisi — tafsilot darajasi: juda kam ham, juda koʻp ham boʻlmasligi kerak. Beshinchisi — toʻliqlik: kerakli qismlarning hammasi boʻlishi kerak.",
      easy: "Sifatli axborot: xatosiz, maqsadga mos, yangi, keraklicha batafsil va toʻliq boʻladi. Bittasi buzilsa ham, axborotdan foydalanish qiyinlashadi.",
      draw: [],
      animTitle: 'Axborot sifati',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🎯', title: 'Aniqlik', text: 'Xato raqam, imlo xatosi, joyi almashgan belgi yoʻq.' },
          { icon: '🧩', title: 'Moslik', text: 'Maqsadga tegishli: poyezd kerak boʻlsa — poyezd jadvali.' },
          { icon: '🕒', title: 'Dolzarblik', text: 'Yangi boʻlishi kerak: 5 yil oldingi narx yaramaydi.' },
          { icon: '🔍', title: 'Tafsilot darajasi', text: 'Juda kam ham, ortiqcha koʻp ham emas.' },
          { icon: '🧾', title: 'Toʻliqlik', text: 'Kerakli qismlarning hammasi bor.' }
        ]
      },
      next: 'Misollar bilan'
    },
    {
      kind: 'example',
      say: "Har bir xususiyat buzilishiga misol koʻraylik. Narxda vergul joyi adashib, 10 ming oʻrniga 100 ming yozilsa — aniqlik yoʻq. Poyezd vaqtini soʻragan odamga avtobus jadvalini bersak — moslik yoʻq. Bir yil oldingi aholi soni bilan yangi maktab rejalashtirilsa — dolzarblik yoʻq. Yoʻl soʻraganga butun shahar tarixini aytib bersak — tafsilot ortiqcha. Pitsa buyurtma qilib, manzilni aytmasak — toʻliqlik yoʻq.",
      easy: "Xato narx — aniqlik buzilgan. Kerakmas jadval — moslik yoʻq. Eski son — dolzarb emas. Ortiqcha gap — tafsilot koʻp. Manzil yoʻq — toʻliq emas.",
      draw: [],
      animTitle: 'Qaysi xususiyat buzilgan?',
      anim: {
        type: 'cards',
        cols: 1,
        items: [
          { icon: '🎯', title: 'Aniqlik ❌', text: 'Narx: 10 000 oʻrniga 100 000 soʻm deb yozilgan.' },
          { icon: '🧩', title: 'Moslik ❌', text: 'Poyezd vaqtini soʻragan odamga avtobus jadvali berildi.' },
          { icon: '🕒', title: 'Dolzarblik ❌', text: 'Yangi maktab bir yil oldingi aholi soniga qarab rejalashtirildi.' },
          { icon: '🔍', title: 'Tafsilot ❌', text: 'Yoʻl soʻragan mehmonga shahar tarixi soʻzlab berildi.' },
          { icon: '🧾', title: 'Toʻliqlik ❌', text: 'Pitsa buyurtma qilindi, lekin manzil aytilmadi.' }
        ]
      },
      next: 'Keyingisi'
    },
    {
      kind: 'explain',
      say: "Endi kod berishga oʻtamiz. Kod berish — maʼlumotni qisqa belgi bilan ifodalash. Siz buni har kuni koʻrasiz: Oʻzbekistonning telefon kodi plyus 998, Toshkent aeroporti — TAS, avtomobillarning xalqaro belgisi — UZ, kiyim oʻlchami — S, M yoki L. Toshkentdan Istanbulga reys jadvalda shunchaki «TAS, IST, 18:40» deb yoziladi.",
      easy: "Kod — uzun nomning qisqa yozuvi. «Oʻzbekiston» oʻrniga UZ, «Toshkent aeroporti» oʻrniga TAS. Qisqa va hamma tushunadigan belgilar.",
      draw: [],
      animTitle: 'Uzun nom ➜ qisqa kod',
      anim: {
        type: 'flow',
        stations: [
          { icon: '📝', label: 'Toʻliq nom' },
          { icon: '⚙️', label: 'Kod berish' },
          { icon: '🏷️', label: 'Kod' }
        ],
        items: [
          { texts: ['Oʻzbekiston telefon aloqasi', 'mamlakat kodi', '+998'] },
          { texts: ['Toshkent xalqaro aeroporti', 'aeroport kodi', 'TAS'] },
          { texts: ['Oʻrtacha oʻlchamdagi koʻylak', 'oʻlcham kodi', 'M'] }
        ],
        result: 'Qisqa, tez yoziladi, kam joy egallaydi'
      },
      next: 'Davom eting'
    },
    {
      kind: 'explain',
      say: "Kod berishning afzalliklari: kam joy egallaydi, tez kiritiladi, tez qayta ishlanadi va tekshirish oson — masalan, mamlakat kodi faqat harflardan iborat boʻlishi kerak. Kamchiliklari ham bor: harflar yetmay qolishi mumkin; kodni tushunish qiyin — ET Misrmi yoki Efiopiyami? Nol bilan O harfi, bir bilan I harfi bir-biriga oʻxshaydi; kodni bilmagan odam uni qidirib oʻtirishi kerak; va kodlashda baʼzi axborot yoʻqolishi mumkin.",
      easy: "Kodning yaxshi tomoni — qisqa va tez. Yomon tomoni — maʼnosini bilish qiyin, oʻxshash belgilar adashtiradi, baʼzi maʼlumotlar tushib qoladi.",
      draw: [],
      animTitle: 'Afzallik va kamchilik',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Afzalliklari', items: ['Kam joy egallaydi', 'Tez kiritiladi', 'Tez qayta ishlanadi', 'Tekshirish oson', 'Begona tushunmasligi mumkin'] },
        right: { icon: '👎', title: 'Kamchiliklari', items: ['Kodlar yetmay qoladi', 'Talqin qilish qiyin', '0 va O, 1 va I adashadi', 'Kodni bilish kerak', 'Axborot yoʻqolishi mumkin'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Sifatli axborot: aniq, maqsadga mos, dolzarb, keraklicha batafsil va toʻliq.',
    'Kod berish — maʼlumotni qisqa belgi bilan ifodalash: +998, TAS, UZ, M.',
    'Kodning afzalliklari: kam joy, tez kiritish va qayta ishlash, oson tekshirish.',
    'Kamchiliklari: kodlar yetishmasligi, talqin qiyinligi, oʻxshash belgilar, axborot yoʻqolishi.'
  ],
  questions: [
    {
      id: 'i2q1',
      prompt: 'Har bir holatda qaysi sifat buzilgan? Juftlang.',
      hint: 'Xato, kerakmas, eski, yetishmaydi…',
      explanation: 'Xato raqam — aniqlik; kerakmas jadval — moslik; eski son — dolzarblik; manzil yoʻq — toʻliqlik.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: '01G707BA oʻrniga 01G070BA' }, right: { label: 'aniqlik' } },
            { left: { label: 'Poyezd oʻrniga avtobus jadvali' }, right: { label: 'moslik' } },
            { left: { label: '2015-yilgi aholi soni' }, right: { label: 'dolzarblik' } },
            { left: { label: 'Uy raqami aytilmadi' }, right: { label: 'toʻliqlik' } }
          ]
        }
      }
    },
    {
      id: 'i2q2',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Tafsilot qanday boʻlishi kerak?',
      explanation: 'Ortiqcha tafsilot ham sifatni pasaytiradi; eskirgan axborot dolzarb emas; kodlar joy tejaydi; 0 va O kodlarda adashtiradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Tafsilot qancha koʻp boʻlsa, axborot shuncha sifatli.', value: false },
            { text: 'Eskirgan axborot dolzarb boʻlmaydi.', value: true },
            { text: 'Kod berish maʼlumot uchun kerakli joyni kamaytiradi.', value: true },
            { text: '0 raqami va O harfi kodlarda hech qachon adashtirmaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i2q3',
      prompt: 'Afzallik yoki kamchilik? Guruhlarga ajrating.',
      hint: 'Kod berish nimani osonlashtiradi, nimani qiyinlashtiradi?',
      explanation: 'Tez kiritish, kam joy, oson tekshirish — afzallik. Talqin qiyinligi, oʻxshash belgilar, kodlar yetishmasligi — kamchilik.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'p', label: 'Afzallik' },
            { id: 'm', label: 'Kamchilik' }
          ],
          tiles: [
            { id: 't1', label: 'Tez kiritiladi', bin: 'p' },
            { id: 't2', label: 'Kam joy egallaydi', bin: 'p' },
            { id: 't3', label: 'Tekshirish oson', bin: 'p' },
            { id: 't4', label: 'Maʼnosini tushunish qiyin', bin: 'm' },
            { id: 't5', label: '1 va I adashadi', bin: 'm' },
            { id: 't6', label: 'Kodlar yetmay qoladi', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'i2q4',
      prompt: 'Kodni maʼnosi bilan juftlang.',
      hint: 'Telefon, aeroport, avtomobil, kiyim.',
      explanation: '+998 — Oʻzbekiston telefon kodi; TAS — Toshkent aeroporti; UZ — avtomobilning xalqaro belgisi; L — katta oʻlcham.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: '+998' }, right: { label: 'Oʻzbekiston telefon kodi' } },
            { left: { label: 'TAS' }, right: { label: 'Toshkent aeroporti' } },
            { left: { label: 'UZ' }, right: { label: 'avtomobil xalqaro belgisi' } },
            { left: { label: 'L' }, right: { label: 'katta kiyim oʻlchami' } }
          ]
        }
      }
    },
    {
      id: 'i2q5',
      prompt: 'Qaysi biri axborot sifati xususiyati emas?',
      hint: 'Beshta xususiyatni eslang.',
      explanation: 'Sifat xususiyatlari: aniqlik, moslik, dolzarblik, tafsilot darajasi, toʻliqlik. Rang-baranglik ulardan emas.',
      widget: {
        type: 'odd_one_out',
        props: { tiles: [{ text: 'Aniqlik' }, { text: 'Dolzarblik' }, { text: 'Toʻliqlik' }, { text: 'Rang-baranglik', odd: true }] }
      }
    },
    {
      id: 'i2q6',
      prompt: 'Taklifnomani sifatli qiladigan maʼlumotlarni bosing.',
      hint: 'Mehmon nimani bilishi kerak?',
      explanation: 'Aniq sana, vaqt (kechqurun 18:00) va toʻliq manzil kerak. Uyning qurilgan yili va qoʻshnining ismi — ortiqcha tafsilot.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: '14-dekabr, shanba', match: true },
            { id: 'b', text: 'Soat 18:00 da', match: true },
            { id: 'c', text: 'Chilonzor-9, 12-uy, 34-xonadon', match: true },
            { id: 'd', text: 'Uy 1978-yilda qurilgan', match: false },
            { id: 'e', text: 'Qoʻshnimizning ismi Anvar', match: false }
          ]
        }
      }
    },
    {
      id: 'i2q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Sifat xususiyatlari.',
      explanation: 'Yangi boʻlishi — dolzarblik; hamma qismi borligi — toʻliqlik; xatosizligi — aniqlik.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Axborot yangi boʻlsa —' }, { blank: 'dolzarb' }, { text: ', kerakli qismlarning hammasi boʻlsa —' }, { blank: 'toʻliq' }, { text: ', xatosiz boʻlsa —' }, { blank: 'aniq' }, { text: '.' }],
          bank: ['dolzarb', 'toʻliq', 'aniq', 'statik']
        }
      }
    },
    {
      id: 'i2q8',
      prompt: 'Reys jadvalidagi kod: «TAS IST 18:40». Qaysi shahardan uchadi? Kodni yozing.',
      hint: 'Birinchi kod — uchish joyi.',
      explanation: 'TAS — Toshkent (uchish joyi), IST — Istanbul (qoʻnish joyi).',
      widget: { type: 'text_answer', props: { before: 'Uchish joyi kodi:', answer: 'TAS', width: 5 } }
    },
    {
      id: 'i2q9',
      prompt: 'Qaysi kodda qanday muammo bor? Juftlang.',
      hint: 'Oʻxshash belgilar, talqin, yetishmovchilik.',
      explanation: '«0O1I» belgilari adashtiradi; ET — Misrmi yoki Efiopiyami, talqin qiyin; L, P, M kabi kodlarda «sensorli ekran» axboroti yoʻqoladi.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'A0O1I' }, right: { label: 'belgilar bir-biriga oʻxshaydi' } },
            { left: { label: 'ET — qaysi davlat?' }, right: { label: 'talqin qilish qiyin' } },
            { left: { label: 'M = mobil telefon' }, right: { label: 'qoʻshimcha axborot yoʻqoldi' } }
          ]
        }
      }
    },
    {
      id: 'i2q10',
      prompt: 'Qisqa belgi bilan ifodalash nima deyiladi?',
      hint: '+998, TAS, UZ…',
      explanation: 'Maʼlumotni qisqa belgi bilan ifodalash — kod berish (kodlash).',
      widget: { type: 'text_answer', props: { before: 'Maʼlumotni qisqa belgi bilan ifodalash —', after: 'berish.', answer: ['kod', 'kod berish'], width: 6 } }
    }
  ]
};
