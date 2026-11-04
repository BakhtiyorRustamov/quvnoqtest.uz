import type { BoardLesson } from './types';

/** Darslik: 3.01 — boshqaruv tizimlari: mikroprotsessor, aktuator, teskari aloqa; kundalik misollar. */
export const INF_11: BoardLesson = {
  n: 11,
  label: '11',
  part: 10,
  title: 'Boshqaruv va teskari aloqa',
  section: '3.01',
  steps: [
    {
      kind: 'hook',
      say: "Qishda issiqxonada pomidor oʻstiryapmiz, ichida 24 daraja boʻlishi kerak. Harorat sensori havoni oʻlchaydi, kompyuter uni 24 bilan solishtiradi. Sovuq boʻlsa — isitgichni yoqadi, issiq boʻlsa — oʻchiradi. Grafikka qarang: harorat koʻtarilib, keyin 24 atrofida «tebranib» turadi. Odam aralashmaydi — tizim oʻzini oʻzi boshqaradi.",
      easy: "Sovuq — isitgich yonadi. Issiq — isitgich oʻchadi. Shu takrorlanaveradi, harorat esa kerakli daraja atrofida qoladi.",
      draw: [],
      animTitle: 'Issiqxona: 24 °C ni ushlab turish',
      anim: { type: 'loop', sensor: 'Harorat', actuator: 'Isitgich', unit: '°C', setpoint: 24, start: 18, up: 1.2, down: 0.7 },
      next: 'Qanday ishlaydi?'
    },
    {
      kind: 'explain',
      say: "Boshqaruv tizimi aylana boʻylab ishlaydi. Sensor oʻlchaydi. ADC qiymatni raqamga aylantiradi. Mikroprotsessor uni oldindan belgilangan qiymat yoki diapazon bilan solishtiradi. Kerak boʻlsa, aktuatorga signal yuboradi. Aktuator — harakatni bajaruvchi qurilma: motor, isitgich, klapan, rele. Keyin hammasi qaytadan boshlanadi.",
      easy: "Oʻlchash, raqamga aylantirish, solishtirish, harakat qilish — va yana boshidan. Harakat qiluvchi qism aktuator deyiladi.",
      draw: [],
      animTitle: 'Boshqaruv sikli',
      anim: {
        type: 'cycle',
        center: 'Doimiy takrorlanadi',
        stages: [
          { icon: '🌡️', label: 'Sensor oʻlchaydi' },
          { icon: '🔁', label: 'ADC' },
          { icon: '🧠', label: 'Solishtirish' },
          { icon: '⚙️', label: 'Aktuator' }
        ]
      },
      next: 'Algoritm koʻrsating'
    },
    {
      kind: 'example',
      say: "Koʻcha chirogʻining algoritmini kuzatamiz. Dastur cheksiz sikl ichida ishlaydi: yorugʻlik sensoridan qiymatni oʻqiydi. Kunduzi yorugʻlik 80 — chiroq oʻchiq qoladi. Kechqurun yorugʻlik 25 ga tushdi — bu 30 dan kam, demak chiroq yonadi. Shart — «agar yorugʻlik 30 dan kam boʻlsa» — oldindan dasturlab qoʻyilgan.",
      easy: "Yorugʻ boʻlsa — chiroq oʻchiq. Qorongʻi boʻlsa, yaʼni qiymat 30 dan kam boʻlsa — chiroq yonadi. Dastur buni toʻxtovsiz tekshirib turadi.",
      draw: [],
      animTitle: 'Koʻcha chirogʻi algoritmi',
      anim: {
        type: 'code',
        lang: 'pseudo',
        lines: ['takrorla:', '    yorugʻlik ← sensordan_oʻqi()', '    agar yorugʻlik < 30 boʻlsa:', '        chiroq ← YONIQ', '    aks holda:', '        chiroq ← OʻCHIQ'],
        trace: [
          { line: 2, vars: { 'yorugʻlik': 80 } },
          { line: 3 },
          { line: 6, vars: { chiroq: 'OʻCHIQ' }, out: '☀️ kunduz — chiroq oʻchiq' },
          { line: 2, vars: { 'yorugʻlik': 25 } },
          { line: 3 },
          { line: 4, vars: { chiroq: 'YONIQ' }, out: '🌙 kech — chiroq yondi' }
        ]
      },
      next: 'Teskari aloqa nima?'
    },
    {
      kind: 'explain',
      say: "Teskari aloqa — tizim chiqishi yana uning kirishiga taʼsir qilishi. Isitgich havoni isitdi, sensor buni sezdi va endi isitgich oʻchadi. Yaʼni aktuator harakati natijasini sensor oʻlchab, keyingi qaror shu asosda qabul qilinadi. Aynan teskari aloqa tufayli harorat kerakli darajadan uzoqlashib ketmaydi.",
      easy: "Isitgich isitdi — sensor buni koʻrdi — isitgich oʻchdi. Natija yana tizimga qaytadi. Bu teskari aloqa.",
      draw: [],
      animTitle: 'Teskari aloqa',
      anim: {
        type: 'cycle',
        center: 'Natija yana sensorga qaytadi',
        stages: [
          { icon: '🥶', label: '18 °C — sovuq' },
          { icon: '🔥', label: 'Isitgich yoqildi' },
          { icon: '🌡️', label: 'Havo isidi: 24 °C' },
          { icon: '📴', label: 'Isitgich oʻchdi' }
        ]
      },
      next: 'Yana misollar'
    },
    {
      kind: 'example',
      say: "Boshqaruv tizimlari atrofimizda koʻp. Konditsioner xona haroratini ushlab turadi. Kir yuvish mashinasi suv sathi va haroratini sensorlar bilan nazorat qiladi. Avtomatik eshik harakatni sezib ochiladi. Avtoturargoh shlagbaumi bosim sensori orqali mashinani biladi. Robot changyutgich toʻsiqni sezib burilib ketadi. Issiqxonada tuproq namligi past boʻlsa, sugʻorish klapani ochiladi.",
      easy: "Konditsioner, kir mashina, avtomatik eshik, shlagbaum, robot changyutgich, sugʻorish — hammasida sensor, kompyuter va aktuator ishlaydi.",
      draw: [],
      animTitle: 'Kundalik boshqaruv tizimlari',
      anim: {
        type: 'flow',
        stations: [
          { icon: '📡', label: 'Sensor' },
          { icon: '🧠', label: 'Shart' },
          { icon: '⚙️', label: 'Aktuator' }
        ],
        items: [
          { texts: ['harakat bor', 'kimdir keldi', 'eshik ochiladi'] },
          { texts: ['tuproq namligi 20%', '< 40% — quruq', 'sugʻorish klapani ochiladi'] },
          { texts: ['toʻsiq 5 sm', 'juda yaqin', 'robot buriladi'] },
          { texts: ['xona 29 °C', '> 25 — issiq', 'konditsioner sovutadi'] }
        ]
      },
      next: 'Afzalliklari nimada?'
    },
    {
      kind: 'explain',
      say: "Kompyuter boshqaruvining afzalliklari: kecha-kunduz charchamay ishlaydi, odamdan tezroq va aniqroq javob beradi, odam uchun xavfli joylarda ishlaydi va maʼlumotlarni yozib boradi. Kamchiliklari: oʻrnatish qimmat, sensor yoki dastur buzilsa xato qaror qabul qilinadi, elektr energiyasiga bogʻliq, baʼzi ish oʻrinlari yoʻqoladi.",
      easy: "Yaxshi tomoni — tez, aniq, charchamaydi, xavfli joyda ishlaydi. Yomon tomoni — qimmat, buzilishi mumkin, tokka bogʻliq.",
      draw: [],
      animTitle: 'Afzallik va kamchilik',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Afzalliklari', items: ['24 soat ishlaydi', 'Tez va aniq javob', 'Xavfli joylarda ishlaydi', 'Maʼlumotni yozib boradi'] },
        right: { icon: '👎', title: 'Kamchiliklari', items: ['Oʻrnatish qimmat', 'Sensor buzilsa — xato qaror', 'Elektrga bogʻliq', 'Baʼzi ish oʻrinlari yoʻqoladi'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Boshqaruv tizimi: sensor ➜ ADC ➜ mikroprotsessor solishtiradi ➜ aktuator harakat qiladi ➜ takrorlanadi.',
    'Aktuator — harakatni bajaruvchi qurilma: motor, isitgich, klapan, rele.',
    'Mikroprotsessor qiymatni oldindan belgilangan qiymat yoki diapazon bilan solishtiradi.',
    'Teskari aloqa — chiqish natijasi yana kirishga taʼsir qiladi va qiymatni kerakli darajada ushlab turadi.',
    'Afzallik: tez, aniq, 24 soat, xavfsiz; kamchilik: qimmat, buzilish xavfi, elektrga bogʻliq.'
  ],
  questions: [
    {
      id: 'i11q1',
      prompt: 'Boshqaruv sikli bosqichlarini tartiblang.',
      hint: 'Oʻlchashdan harakatgacha.',
      explanation: 'Sensor oʻlchaydi ➜ ADC raqamga aylantiradi ➜ mikroprotsessor solishtiradi ➜ aktuatorga signal ➜ aktuator harakat qiladi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Sensor qiymatni oʻlchaydi', 'ADC uni raqamga aylantiradi', 'Mikroprotsessor belgilangan qiymat bilan solishtiradi', 'Aktuatorga signal yuboriladi', 'Aktuator harakat qiladi'] }
      }
    },
    {
      id: 'i11q2',
      prompt: 'Sensor yoki aktuator?',
      hint: 'Oʻlchaydimi yoki harakat qiladimi?',
      explanation: 'Harorat, yorugʻlik, namlik — sensorlar. Motor, isitgich, klapan — aktuatorlar.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 's', label: 'Sensor' },
            { id: 'a', label: 'Aktuator' }
          ],
          tiles: [
            { id: 't1', label: 'Harorat sensori', bin: 's' },
            { id: 't2', label: 'Motor', bin: 'a' },
            { id: 't3', label: 'Fotorezistor', bin: 's' },
            { id: 't4', label: 'Isitgich', bin: 'a' },
            { id: 't5', label: 'Namlik sensori', bin: 's' },
            { id: 't6', label: 'Suv klapani', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'i11q3',
      prompt: 'Algoritm: «agar yorugʻlik < 30 boʻlsa — chiroq YONIQ, aks holda OʻCHIQ». Qaysi qiymatlarda chiroq yonadi?',
      hint: '30 ning oʻzi «kam» emas.',
      explanation: '12, 25 va 29 — 30 dan kam, chiroq yonadi. 30 va 75 da chiroq oʻchiq.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: '12', match: true },
            { id: 'b', text: '25', match: true },
            { id: 'c', text: '29', match: true },
            { id: 'd', text: '30', match: false },
            { id: 'e', text: '75', match: false }
          ]
        }
      }
    },
    {
      id: 'i11q4',
      prompt: 'Issiqxona: kerakli harorat 24 °C. Hozir 21 °C, isitgich yoqilsa har daqiqada 1 °C ga isiydi. Necha daqiqadan keyin isitgich oʻchadi?',
      hint: '21 dan 24 gacha.',
      explanation: '24 − 21 = 3 daraja, har daqiqada 1 °C: 3 daqiqa.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'daqiqa' } }
    },
    {
      id: 'i11q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Teskari aloqa nimani bildiradi?',
      explanation: 'Teskari aloqada natija yana kirishga qaytadi; aktuator harakat qiladi, oʻlchamaydi; sensor buzilsa xato qaror boʻladi; boshqaruv tizimlari elektrga bogʻliq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Teskari aloqada aktuator natijasini sensor yana oʻlchaydi.', value: true },
            { text: 'Aktuator — oʻlchovchi qurilma.', value: false },
            { text: 'Sensor buzilsa, tizim xato qaror qabul qilishi mumkin.', value: true },
            { text: 'Kompyuter boshqaruvi elektr energiyasiga bogʻliq emas.', value: false }
          ]
        }
      }
    },
    {
      id: 'i11q6',
      prompt: 'Tizimni uning sensori bilan juftlang.',
      hint: 'U nimani sezadi?',
      explanation: 'Avtomatik eshik — harakat; sugʻorish — tuproq namligi; konditsioner — harorat; koʻcha chirogʻi — yorugʻlik.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Avtomatik eshik' }, right: { label: 'harakat sensori' } },
            { left: { label: 'Avtomatik sugʻorish' }, right: { label: 'namlik sensori' } },
            { left: { label: 'Konditsioner' }, right: { label: 'harorat sensori' } },
            { left: { label: 'Koʻcha chirogʻi' }, right: { label: 'yorugʻlik sensori' } }
          ]
        }
      }
    },
    {
      id: 'i11q7',
      prompt: 'Kompyuter boshqaruvining kamchiliklarini bosing.',
      hint: 'Narx, buzilish, energiya.',
      explanation: 'Qimmat oʻrnatish, buzilganda xato qaror va elektrga bogʻliqlik — kamchiliklar. 24 soat ishlash va tez javob — afzalliklar.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Oʻrnatish qimmat', match: true },
            { id: 'b', text: 'Sensor buzilsa — xato qaror', match: true },
            { id: 'c', text: 'Elektr oʻchsa — ishlamaydi', match: true },
            { id: 'd', text: '24 soat charchamay ishlaydi', match: false },
            { id: 'e', text: 'Odamdan tez javob beradi', match: false }
          ]
        }
      }
    },
    {
      id: 'i11q8',
      prompt: 'Qaysi biri boshqaruv tizimi emas?',
      hint: 'Bittasi faqat oʻlchab koʻrsatadi.',
      explanation: 'Ob-havo stansiyasi faqat kuzatadi (monitoring). Qolganlari oʻzi harakat qiladi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Konditsioner' }, { text: 'Robot changyutgich' }, { text: 'Avtomatik eshik' }, { text: 'Ob-havo stansiyasi', odd: true }] } }
    },
    {
      id: 'i11q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Kim solishtiradi, kim harakat qiladi?',
      explanation: 'Mikroprotsessor qiymatni belgilangan qiymat bilan solishtiradi, aktuator esa harakatni bajaradi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Qiymatni belgilangan qiymat bilan' }, { blank: 'mikroprotsessor' }, { text: 'solishtiradi, harakatni esa' }, { blank: 'aktuator' }, { text: 'bajaradi.' }],
          bank: ['mikroprotsessor', 'aktuator', 'sensor']
        }
      }
    },
    {
      id: 'i11q10',
      prompt: 'Chiqish natijasi yana kirishga taʼsir qilishi nima deyiladi?',
      hint: 'Ikki soʻz: teskari …',
      explanation: 'Bu teskari aloqa.',
      widget: { type: 'text_answer', props: { before: 'Teskari', answer: 'aloqa', width: 7 } }
    }
  ]
};
