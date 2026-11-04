import type { BoardLesson } from './types';

/** Darslik: 3.01 — sensorlar, ADC, kuzatish (monitoring) tizimlari. */
export const INF_10: BoardLesson = {
  n: 10,
  label: '10',
  part: 10,
  title: 'Sensorlar va monitoring',
  section: '3.01',
  steps: [
    {
      kind: 'hook',
      say: "Maktab tomida kichik ob-havo stansiyasi bor. Uning harorat sensori kun boʻyi har bir necha daqiqada havoni oʻlchab, kompyuterga yuboradi. Kompyuter qiymatlarni yozib boradi va grafik chizadi. Hech kim termometr oldida oʻtirmaydi — kuzatish avtomatik. Bu — monitoring, yaʼni kuzatish tizimi.",
      easy: "Sensor oʻlchaydi, kompyuter yozib boradi va grafik chizadi. Odam kerak emas — hammasi avtomatik.",
      draw: [],
      animTitle: 'Ob-havo stansiyasi',
      anim: { type: 'loop', sensor: 'Harorat', actuator: '', unit: '°C', setpoint: 0, start: 21, up: 1.2, down: 1, monitorOnly: true },
      next: 'Sensor nima?'
    },
    {
      kind: 'explain',
      say: "Sensor — atrof-muhitni oʻlchaydigan kiritish qurilmasi: harorat, yorugʻlik, harakat, bosim va boshqalar. Tabiatdagi qiymatlar uzluksiz oʻzgaradi — bu analog signal. Kompyuter esa faqat raqamli, yaʼni bir va nollarni tushunadi. Shuning uchun oraliqda ADC — analogdan raqamliga oʻgiruvchi turadi. Keyin raqamli qiymat mikroprotsessorga boradi va u qiymatni qayta ishlaydi.",
      easy: "Sensor oʻlchaydi, lekin uning signali «toʻlqinsimon» — analog. ADC uni sonlarga aylantiradi, shunda kompyuter tushunadi.",
      draw: [],
      animTitle: 'Analog ➜ raqamli',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🌡️', label: 'Sensor' },
          { icon: '〰️', label: 'Analog signal' },
          { icon: '🔁', label: 'ADC' },
          { icon: '🧠', label: 'Mikroprotsessor' }
        ],
        items: [{ texts: ['havo: 24,3 °C', 'uzluksiz kuchlanish', '00011000', 'qiymat: 24'] }],
        result: 'Endi kompyuter qiymatni qayta ishlay oladi'
      },
      next: 'Qanday sensorlar bor?'
    },
    {
      kind: 'explain',
      say: "Sensor turlari koʻp. Harorat sensori — issiqxona va konditsionerda. Yorugʻlik sensori, yaʼni fotorezistor — koʻcha chiroqlari va telefon ekranining yorqinligida. Harakat sensori — signalizatsiya va avtomatik eshiklarda. Bosim sensori — sensorli ekran va avtoturargoh shlagbaumida. Namlik sensori — issiqxona va muzeylarda. Tovush sensori, gaz va karbonat angidrid sensori, pH sensori — suv va tuproq tahlilida.",
      easy: "Har bir sensor bitta narsani oʻlchaydi: issiqlik, yorugʻlik, harakat, bosim, namlik, tovush, gaz yoki kislotalilik.",
      draw: [],
      animTitle: 'Sensor turlari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🌡️', title: 'Harorat', text: 'Issiqxona, konditsioner' },
          { icon: '💡', title: 'Yorugʻlik', text: 'Koʻcha chirogʻi, ekran yorqinligi' },
          { icon: '🚶', title: 'Harakat', text: 'Signalizatsiya, avtomatik eshik' },
          { icon: '👆', title: 'Bosim', text: 'Sensorli ekran, shlagbaum' },
          { icon: '💧', title: 'Namlik', text: 'Issiqxona, muzey' },
          { icon: '🧪', title: 'Gaz va pH', text: 'Havo sifati, suv tahlili' }
        ]
      },
      next: 'Harakatni qanday sezadi?'
    },
    {
      kind: 'explain',
      say: "Harakat sensorlari ikki xil. Passiv sensor oʻzi hech narsa chiqarmaydi, faqat atrofni «tinglaydi»: masalan, passiv infraqizil sensor inson tanasidan chiqadigan issiqlik nurini sezadi. Aktiv sensor esa oʻzi toʻlqin taratadi va aksini oʻlchaydi: mikrotoʻlqinli sensor xonaga toʻlqin yuboradi, kimdir yurganda qaytgan toʻlqin oʻzgaradi. Ishonchli signalizatsiyada ikkalasi birga ishlatiladi — bu yolgʻon signallarni kamaytiradi.",
      easy: "Passiv — faqat sezadi, masalan odamning issiqligini. Aktiv — oʻzi toʻlqin yuborib, qaytganini tekshiradi. Ikkalasi birga boʻlsa, xato kamroq.",
      draw: [],
      animTitle: 'Passiv va aktiv',
      anim: {
        type: 'compare',
        left: { icon: '👂', title: 'Passiv', items: ['Oʻzi energiya chiqarmaydi', 'Atrofdagi oʻzgarishni sezadi', 'Masalan: infraqizil (issiqlik)', 'Signalizatsiyada burchakda'] },
        right: { icon: '📡', title: 'Aktiv', items: ['Oʻzi toʻlqin taratadi', 'Qaytgan aksni oʻlchaydi', 'Masalan: mikrotoʻlqinli', 'Avtomatik eshiklarda'] }
      },
      next: 'Monitoring nima uchun kerak?'
    },
    {
      kind: 'explain',
      say: "Sensorli tizimlar ikki xil ishlaydi. Monitoring, yaʼni kuzatish tizimi faqat oʻlchaydi, yozib boradi va natijani grafik yoki raqam koʻrinishida koʻrsatadi — qarorni odam qabul qiladi. Boshqaruv tizimi esa natijaga qarab oʻzi harakat qiladi: isitgichni yoqadi, eshikni ochadi. Bugun monitoringni koʻramiz, boshqaruvni keyingi darsda.",
      easy: "Monitoring — «koʻraman va yozaman». Boshqaruv — «koʻraman va oʻzim nimadir qilaman».",
      draw: [],
      animTitle: 'Monitoring va boshqaruv',
      anim: {
        type: 'compare',
        left: { icon: '📈', title: 'Monitoring', items: ['Oʻlchaydi va yozib boradi', 'Grafik yoki raqam koʻrsatadi', 'Qarorni odam qabul qiladi', 'Masalan: ob-havo stansiyasi'] },
        right: { icon: '⚙️', title: 'Boshqaruv', items: ['Oʻlchaydi va solishtiradi', 'Aktuatorga signal yuboradi', 'Oʻzi harakat qiladi', 'Masalan: avtomatik isitgich'] }
      },
      next: 'Monitoring misollari'
    },
    {
      kind: 'example',
      say: "Monitoring hamma joyda. Kasalxonada bemorning yurak urishi, harorati va qondagi kislorod uzluksiz kuzatiladi, xavfli qiymatda shifokorga signal beriladi. Daryolarda suv sathi sensorlari toshqin xavfini oldindan aytadi. Shaharda havo sifati stansiyalari changni oʻlchaydi. Ilmiy tajribalarda maʼlumot yigʻgich kecha-kunduz oʻlchaydi. Afzalliklari: odam xatosi yoʻq, 24 soat ishlaydi, xavfli joylarda — vulqon yoki atom stansiyasida ham oʻlchaydi.",
      easy: "Sensorlar charchamaydi, adashmaydi va xavfli joyda ham ishlaydi. Shuning uchun kasalxona, daryo, shahar havosi va tajribalarda ishlatiladi.",
      draw: [],
      animTitle: 'Monitoring qayerda',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🏥', title: 'Kasalxona', text: 'Yurak urishi, harorat, kislorod' },
          { icon: '🌊', title: 'Daryo', text: 'Suv sathi — toshqin xavfi' },
          { icon: '🏙️', title: 'Shahar havosi', text: 'Chang va gazlar miqdori' },
          { icon: '🔬', title: 'Tajriba', text: 'Kecha-kunduz avtomatik oʻlchash' },
          { icon: '🌋', title: 'Xavfli joylar', text: 'Vulqon, atom stansiyasi' },
          { icon: '✅', title: 'Afzallik', text: 'Odam xatosisiz, 24 soat' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Sensor — atrof-muhitni oʻlchaydigan kiritish qurilmasi.',
    'Analog signal ADC orqali raqamli signalga aylanadi va mikroprotsessorga boradi.',
    'Turlar: harorat, yorugʻlik, harakat, bosim, namlik, tovush, gaz, pH.',
    'Passiv sensor faqat sezadi (infraqizil); aktiv sensor toʻlqin taratib, aksini oʻlchaydi (mikrotoʻlqin).',
    'Monitoring oʻlchab, yozib, koʻrsatadi; boshqaruv tizimi esa oʻzi harakat qiladi.'
  ],
  questions: [
    {
      id: 'i10q1',
      prompt: 'Vazifaga mos sensorni juftlang.',
      hint: 'Nimani oʻlchash kerak?',
      explanation: 'Koʻcha chirogʻi — yorugʻlik; issiqxona namligi — namlik; signalizatsiya — harakat; shlagbaum oldidagi mashina — bosim.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Kechqurun koʻcha chirogʻini yoqish' }, right: { label: 'yorugʻlik sensori' } },
            { left: { label: 'Issiqxonada havo namligi' }, right: { label: 'namlik sensori' } },
            { left: { label: 'Uyga begona kirsa signal' }, right: { label: 'harakat sensori' } },
            { left: { label: 'Shlagbaum oldida mashina turibdi' }, right: { label: 'bosim sensori' } }
          ]
        }
      }
    },
    {
      id: 'i10q2',
      prompt: 'Signal yoʻlini tartiblang.',
      hint: 'Analogdan raqamliga.',
      explanation: 'Sensor oʻlchaydi ➜ analog signal ➜ ADC ➜ raqamli qiymat ➜ mikroprotsessor qayta ishlaydi.',
      widget: { type: 'step_order', props: { steps: ['Sensor haroratni oʻlchaydi', 'Analog signal hosil boʻladi', 'ADC uni raqamli signalga aylantiradi', 'Mikroprotsessor qiymatni qayta ishlaydi'] } }
    },
    {
      id: 'i10q3',
      prompt: 'Passiv yoki aktiv sensor?',
      hint: 'Oʻzi toʻlqin chiqaradimi?',
      explanation: 'Passiv: infraqizil, oʻzi energiya chiqarmaydi. Aktiv: mikrotoʻlqin taratadi, aksini oʻlchaydi.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'p', label: 'Passiv' },
            { id: 'a', label: 'Aktiv' }
          ],
          tiles: [
            { id: 't1', label: 'Infraqizil (issiqlik) sensori', bin: 'p' },
            { id: 't2', label: 'Mikrotoʻlqinli sensor', bin: 'a' },
            { id: 't3', label: 'Oʻzi energiya chiqarmaydi', bin: 'p' },
            { id: 't4', label: 'Toʻlqin taratib, aksini oʻlchaydi', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'i10q4',
      prompt: 'Monitoring yoki boshqaruv?',
      hint: 'Tizim oʻzi biror narsani yoqadimi?',
      explanation: 'Ob-havo stansiyasi, bemor monitori, havo sifati — monitoring. Avtomatik eshik, isitgich termostati, koʻcha chirogʻi — boshqaruv.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'm', label: 'Monitoring' },
            { id: 'b', label: 'Boshqaruv' }
          ],
          tiles: [
            { id: 't1', label: 'Ob-havo stansiyasi grafigi', bin: 'm' },
            { id: 't2', label: 'Avtomatik ochiladigan eshik', bin: 'b' },
            { id: 't3', label: 'Bemorning yurak urishi monitori', bin: 'm' },
            { id: 't4', label: 'Issiqxona isitgichi', bin: 'b' },
            { id: 't5', label: 'Shahar havo sifati stansiyasi', bin: 'm' },
            { id: 't6', label: 'Avtomatik koʻcha chirogʻi', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'i10q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Kompyuter analog signalni tushunadimi?',
      explanation: 'Kompyuter raqamli signalni tushunadi, shuning uchun ADC kerak; sensor — kiritish qurilmasi; sensorlar xavfli joylarda ham ishlaydi; monitoring tizimi oʻzi isitgich yoqmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kompyuter analog signalni toʻgʻridan-toʻgʻri qayta ishlaydi.', value: false },
            { text: 'Sensor — kiritish qurilmasi.', value: true },
            { text: 'Sensorlar odam uchun xavfli joylarda ham oʻlchay oladi.', value: true },
            { text: 'Monitoring tizimi oʻzi isitgichni yoqadi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i10q6',
      prompt: 'Sensorli monitoringning afzalliklarini bosing.',
      hint: 'Odam bilan solishtiring.',
      explanation: 'Sensor 24 soat ishlaydi, odam xatosi yoʻq, xavfli joylarda ishlaydi. Har doim bepul emas va buzilmaydi deb boʻlmaydi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Kecha-kunduz uzluksiz oʻlchaydi', match: true },
            { id: 'b', text: 'Odam xatosi yoʻq', match: true },
            { id: 'c', text: 'Xavfli joylarda ishlaydi', match: true },
            { id: 'd', text: 'Hech qachon buzilmaydi', match: false },
            { id: 'e', text: 'Oʻrnatish hech narsaga tushmaydi', match: false }
          ]
        }
      }
    },
    {
      id: 'i10q7',
      prompt: 'Qaysi biri sensor emas?',
      hint: 'Bittasi harakat qiladi, oʻlchamaydi.',
      explanation: 'Motor (aktuator) — chiqarish qurilmasi, harakat qiladi. Qolganlari oʻlchaydi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Fotorezistor' }, { text: 'Namlik sensori' }, { text: 'Infraqizil sensor' }, { text: 'Motor', odd: true }] } }
    },
    {
      id: 'i10q8',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Analogdan raqamliga oʻgiruvchi.',
      explanation: 'Sensor analog signal beradi, ADC uni raqamli signalga aylantiradi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Sensor' }, { blank: 'analog' }, { text: 'signal beradi. Uni' }, { blank: 'ADC' }, { text: 'raqamli signalga aylantiradi.' }],
          bank: ['analog', 'ADC', 'raqamli', 'CPU']
        }
      }
    },
    {
      id: 'i10q9',
      prompt: 'Holatga mos sensorni juftlang.',
      hint: 'Kislota, gaz, tovush.',
      explanation: 'Akvarium suvi kislotaliligi — pH; sinf havosida karbonat angidrid — gaz (CO₂); kutubxonada shovqin — tovush sensori.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Akvarium suvining kislotaliligi' }, right: { label: 'pH sensori' } },
            { left: { label: 'Sinfda havo dimiqdimi?' }, right: { label: 'CO₂ (gaz) sensori' } },
            { left: { label: 'Kutubxonada shovqin' }, right: { label: 'tovush sensori' } }
          ]
        }
      }
    },
    {
      id: 'i10q10',
      prompt: 'Analogdan raqamliga oʻgiruvchi qurilmaning qisqa nomini yozing.',
      hint: 'Analogue-to-Digital Converter',
      explanation: 'ADC — Analogue-to-Digital Converter.',
      widget: { type: 'text_answer', props: { before: 'Analog ➜ raqamli:', answer: 'ADC', width: 5 } }
    }
  ]
};
