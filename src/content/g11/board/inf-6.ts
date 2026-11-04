import type { BoardLesson } from './types';

/** Darslik: 2.01 — apparat taʼminoti: ichki va tashqi qurilmalar, CPU, RAM, ROM, xotira qurilmalari. */
export const INF_6: BoardLesson = {
  n: 6,
  label: '6',
  part: 10,
  title: 'Kompyuter qurilmalari: CPU, RAM, ROM',
  section: '2.01',
  steps: [
    {
      kind: 'hook',
      say: "Kalkulyator ilovasida 2 qoʻshuv 3 ni bosdingiz. Bir zumda tugma bosilishi protsessorga yetib bordi, u hisobladi, ekranda 5 chiqdi va natija tarixga yozib qoʻyildi. Har qanday kompyuter shunday toʻrt ishni bajaradi: kiritish, qayta ishlash, chiqarish va saqlash. Bularning hammasini qurilmalar, yaʼni apparat taʼminoti bajaradi.",
      easy: "Kompyuter toʻrt ish qiladi: maʼlumotni oladi, hisoblaydi, natijani koʻrsatadi va saqlab qoʻyadi. Bu ishlarni bajaradigan temir qismlar — apparat taʼminoti.",
      draw: [],
      animTitle: 'Kiritish ➜ qayta ishlash ➜ chiqarish',
      anim: {
        type: 'flow',
        stations: [
          { icon: '⌨️', label: 'Kiritish' },
          { icon: '🧠', label: 'Qayta ishlash' },
          { icon: '🖥️', label: 'Chiqarish' },
          { icon: '💾', label: 'Saqlash' }
        ],
        items: [{ texts: ['2 + 3', 'CPU: 5', 'ekranda 5', 'tarixga yozildi'] }],
        result: 'Buni apparat taʼminoti bajaradi'
      },
      next: 'Qanday qurilmalar bor?'
    },
    {
      kind: 'explain',
      say: "Apparat taʼminoti — kompyuterning qoʻl bilan ushlasa boʻladigan fizik qismlari. Ular ikki guruhga boʻlinadi. Ichki qurilmalar korpus ichida turadi: protsessor, ona plata, tezkor xotira, ichki disk, videokarta. Tashqi, yaʼni periferik qurilmalar korpusdan tashqarida ulanadi: klaviatura, sichqoncha, monitor, printer, fleshka.",
      easy: "Ichki qurilmalar — quti ichida yashiringan qismlar. Tashqi qurilmalar — kabel yoki simsiz aloqa bilan ulanadiganlar: klaviatura, monitor, printer.",
      draw: [],
      animTitle: 'Ichki va tashqi qurilmalar',
      anim: {
        type: 'compare',
        left: { icon: '🧩', title: 'Ichki', items: ['Protsessor (CPU)', 'Ona plata', 'Tezkor xotira (RAM)', 'Ichki disk (HDD, SSD)', 'Videokarta'] },
        right: { icon: '🔌', title: 'Tashqi', items: ['Klaviatura, sichqoncha', 'Monitor', 'Printer', 'Fleshka', 'Tashqi disk'] }
      },
      next: 'Keyingisi'
    },
    {
      kind: 'explain',
      say: "Ichki qismlar bilan tanishamiz. Protsessor — kompyuterning «miyasi», u buyruqlarni bajaradi va hisoblaydi. Ona plata — hamma qismlarni bir-biriga ulaydigan katta plata. Videokarta — tasvirni ekranga chiqaradi, oʻyin va video uchun alohida protsessorga ega. Tovush kartasi — tovushni karnayga uzatadi. Tarmoq kartasi — kompyuterni internet va lokal tarmoqqa ulaydi.",
      easy: "Protsessor — hisoblaydi. Ona plata — hammasini ulaydi. Videokarta — rasm chiqaradi. Tovush kartasi — ovoz chiqaradi. Tarmoq kartasi — internetga ulaydi.",
      draw: [],
      animTitle: 'Korpus ichida',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🧠', title: 'Protsessor (CPU)', text: 'Buyruqlarni bajaradi va hisoblaydi.' },
          { icon: '🟩', title: 'Ona plata', text: 'Barcha qismlarni bir-biriga ulaydi.' },
          { icon: '🎮', title: 'Videokarta', text: 'Tasvirni ekranga chiqaradi.' },
          { icon: '🔊', title: 'Tovush kartasi', text: 'Tovushni karnay va quloqchinga uzatadi.' },
          { icon: '🌐', title: 'Tarmoq kartasi', text: 'Tarmoq va internetga ulaydi.' }
        ]
      },
      next: 'Xotira-chi?'
    },
    {
      kind: 'explain',
      say: "Kompyuterda ikki xil asosiy xotira bor. RAM — tezkor xotira: hozir ochiq turgan dasturlar va fayllar shu yerda turadi. Uni oʻqish ham, yozish ham mumkin, lekin tok oʻchsa, ichidagi hamma narsa yoʻqoladi. ROM — doimiy xotira: unga zavodda yozib qoʻyilgan va faqat oʻqiladi. Tok oʻchsa ham saqlanadi. Kompyuter yoqilganda birinchi ishlaydigan BIOS dasturi aynan ROM da turadi.",
      easy: "RAM — ish stoli: hozirgi ishlar shu yerda, tok oʻchsa tozalanadi. ROM — oʻchmas yozuv: kompyuterni yoqish uchun kerakli dastur shu yerda doim turadi.",
      draw: [],
      animTitle: 'RAM va ROM',
      anim: {
        type: 'compare',
        left: { icon: '⚡', title: 'RAM', items: ['Tezkor xotira', 'Oʻqish va yozish mumkin', 'Tok oʻchsa — tozalanadi', 'Ochiq dasturlar shu yerda'] },
        right: { icon: '🔒', title: 'ROM', items: ['Doimiy xotira', 'Faqat oʻqiladi', 'Tok oʻchsa ham saqlanadi', 'BIOS shu yerda'] }
      },
      next: 'Fayllar qayerda saqlanadi?'
    },
    {
      kind: 'explain',
      say: "Fayllarni uzoq saqlash uchun xotira qurilmalari kerak. HDD — magnit disk: sigʻimi katta va arzon, lekin ichida aylanuvchi qismlar bor, urilishdan buzilishi mumkin. SSD — flesh xotira asosidagi disk: juda tez, harakatlanuvchi qismi yoʻq, lekin har gigabayti qimmatroq. Fleshka va xotira kartasi — kichik va olib yurish oson. CD, DVD va Blu-ray — lazer bilan oʻqiladigan optik disklar. Magnit tasma esa juda katta hajmdagi zaxira nusxalar uchun ishlatiladi.",
      easy: "HDD — katta va arzon, lekin nozik. SSD — tez va mustahkam, lekin qimmatroq. Fleshka — choʻntakbop. Optik disk — lazer bilan oʻqiladi. Tasma — katta zaxiralar uchun.",
      draw: [],
      animTitle: 'Xotira qurilmalari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '💽', title: 'HDD', text: 'Magnit disk: katta sigʻim, arzon, nozik.' },
          { icon: '⚡', title: 'SSD', text: 'Juda tez, mustahkam, qimmatroq.' },
          { icon: '🔑', title: 'Fleshka, SD karta', text: 'Kichik, olib yurish oson.' },
          { icon: '📀', title: 'CD, DVD, Blu-ray', text: 'Optik disk: lazer bilan oʻqiladi.' },
          { icon: '🎞️', title: 'Magnit tasma', text: 'Juda katta zaxira nusxalar uchun.' }
        ]
      },
      next: 'Qaysi birini tanlash kerak?'
    },
    {
      kind: 'example',
      say: "Qurilma vazifaga qarab tanlanadi. Avval vazifaning eng muhim talabini aniqlaymiz. Masalan, Sardor loyihasini har kuni maktabga olib borib, uyga qaytarishi kerak. Muhim talab — portativlik. Demak, kichik va yengil fleshka yoki tashqi SSD mos keladi. Agar tezlik muhim boʻlsa — SSD, arzon va katta hajm kerak boʻlsa — HDD tanlanadi.",
      easy: "Avval «eng muhimi nima?» deb soʻraymiz. Olib yurish kerak boʻlsa — fleshka. Tezlik kerak boʻlsa — SSD. Arzon va katta hajm kerak boʻlsa — HDD.",
      draw: [],
      animTitle: 'Vazifaga qarab tanlash',
      anim: {
        type: 'tree',
        nodes: [
          { id: 'r', label: 'Eng muhimi nima?' },
          { id: 'a', parent: 'r', edge: 'tezlik', label: 'Tez ishlasin' },
          { id: 'b', parent: 'r', edge: 'narx', label: 'Arzon, katta hajm' },
          { id: 'c', parent: 'r', edge: 'olib yurish', label: 'Portativ' },
          { id: 'a1', parent: 'a', label: 'SSD' },
          { id: 'b1', parent: 'b', label: 'HDD' },
          { id: 'c1', parent: 'c', label: 'Fleshka' }
        ],
        path: ['r', 'c', 'c1']
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Apparat taʼminoti — kompyuterning fizik qismlari: ichki (CPU, ona plata, RAM, disk) va tashqi (klaviatura, monitor, printer).',
    'CPU buyruqlarni bajaradi; ona plata qismlarni ulaydi; videokarta tasvir chiqaradi.',
    'RAM — tezkor, oʻqiladi va yoziladi, tok oʻchsa tozalanadi; ROM — doimiy, faqat oʻqiladi, BIOS shu yerda.',
    'HDD — katta va arzon; SSD — tez va mustahkam; fleshka — portativ; optik disk; magnit tasma — zaxira.',
    'Qurilma vazifaning eng muhim talabiga qarab tanlanadi.'
  ],
  questions: [
    {
      id: 'i6q1',
      prompt: 'Ichki yoki tashqi qurilma?',
      hint: 'Korpus ichidami?',
      explanation: 'CPU, RAM, ona plata, videokarta — ichki. Printer va sichqoncha — tashqi.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'i', label: 'Ichki' },
            { id: 't', label: 'Tashqi' }
          ],
          tiles: [
            { id: 't1', label: 'Protsessor', bin: 'i' },
            { id: 't2', label: 'Printer', bin: 't' },
            { id: 't3', label: 'Tezkor xotira', bin: 'i' },
            { id: 't4', label: 'Sichqoncha', bin: 't' },
            { id: 't5', label: 'Ona plata', bin: 'i' },
            { id: 't6', label: 'Videokarta', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'i6q2',
      prompt: 'Qurilmani vazifasi bilan juftlang.',
      hint: 'Kim hisoblaydi, kim ulaydi?',
      explanation: 'CPU — hisoblaydi; ona plata — qismlarni ulaydi; videokarta — tasvir; tarmoq kartasi — internetga ulanish.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Protsessor' }, right: { label: 'buyruqlarni bajaradi' } },
            { left: { label: 'Ona plata' }, right: { label: 'qismlarni bir-biriga ulaydi' } },
            { left: { label: 'Videokarta' }, right: { label: 'tasvirni ekranga chiqaradi' } },
            { left: { label: 'Tarmoq kartasi' }, right: { label: 'tarmoqqa ulaydi' } }
          ]
        }
      }
    },
    {
      id: 'i6q3',
      prompt: 'RAM yoki ROM?',
      hint: 'Tok oʻchsa saqlanadimi?',
      explanation: 'RAM: tezkor, yoziladi, tok oʻchsa tozalanadi, ochiq dasturlar. ROM: doimiy, faqat oʻqiladi, BIOS.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'ram', label: 'RAM' },
            { id: 'rom', label: 'ROM' }
          ],
          tiles: [
            { id: 't1', label: 'Tok oʻchsa tozalanadi', bin: 'ram' },
            { id: 't2', label: 'Faqat oʻqiladi', bin: 'rom' },
            { id: 't3', label: 'Ochiq dasturlar shu yerda', bin: 'ram' },
            { id: 't4', label: 'BIOS shu yerda', bin: 'rom' },
            { id: 't5', label: 'Oʻqish va yozish mumkin', bin: 'ram' },
            { id: 't6', label: 'Tok oʻchsa ham saqlanadi', bin: 'rom' }
          ]
        }
      }
    },
    {
      id: 'i6q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Qaysi diskda aylanuvchi qism bor?',
      explanation: 'HDD da aylanuvchi qism bor; SSD odatda HDD dan tez; monitor — chiqarish qurilmasi; ROM ga foydalanuvchi oddiy yozolmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'SSD ichida aylanuvchi disk bor.', value: false },
            { text: 'SSD odatda HDD dan tezroq ishlaydi.', value: true },
            { text: 'Monitor — tashqi qurilma.', value: true },
            { text: 'Foydalanuvchi ROM ga xohlagan faylini yoza oladi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i6q5',
      prompt: 'Xotira qurilmasini xususiyati bilan juftlang.',
      hint: 'Magnit, flesh, lazer.',
      explanation: 'HDD — magnit, katta va arzon; SSD — tez, mustahkam; Blu-ray — lazer bilan oʻqiladi; magnit tasma — katta zaxira.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'HDD' }, right: { label: 'katta sigʻim, arzon, nozik' } },
            { left: { label: 'SSD' }, right: { label: 'tez, harakatlanuvchi qismsiz' } },
            { left: { label: 'Blu-ray' }, right: { label: 'lazer bilan oʻqiladi' } },
            { left: { label: 'Magnit tasma' }, right: { label: 'juda katta zaxira nusxalar' } }
          ]
        }
      }
    },
    {
      id: 'i6q6',
      prompt: 'Qaysi biri xotira qurilmasi emas?',
      hint: 'Bittasi faqat tasvir koʻrsatadi.',
      explanation: 'Monitor — chiqarish qurilmasi, maʼlumot saqlamaydi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'HDD' }, { text: 'SSD' }, { text: 'Fleshka' }, { text: 'Monitor', odd: true }] } }
    },
    {
      id: 'i6q7',
      prompt: 'Kompyuterning ish tartibini joylashtiring.',
      hint: 'Avval maʼlumot kiradi.',
      explanation: 'Kiritish ➜ qayta ishlash ➜ chiqarish ➜ saqlash.',
      widget: { type: 'step_order', props: { steps: ['Kiritish: tugma bosiladi', 'Qayta ishlash: CPU hisoblaydi', 'Chiqarish: ekranda natija', 'Saqlash: natija faylga yoziladi'] } }
    },
    {
      id: 'i6q8',
      prompt: 'SSD ning HDD dan afzalliklarini bosing.',
      hint: 'Narx afzallik emas.',
      explanation: 'SSD tezroq, harakatlanuvchi qismi yoʻq va kam quvvat sarflaydi. Lekin har gigabayti qimmatroq.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Tezroq ishlaydi', match: true },
            { id: 'b', text: 'Harakatlanuvchi qismi yoʻq', match: true },
            { id: 'c', text: 'Kam quvvat sarflaydi', match: true },
            { id: 'd', text: 'Har gigabayti arzonroq', match: false },
            { id: 'e', text: 'Magnit bilan yozadi', match: false }
          ]
        }
      }
    },
    {
      id: 'i6q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Tezkor va doimiy xotira.',
      explanation: 'Ochiq dasturlar RAM da turadi, BIOS esa ROM da saqlanadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Hozir ochiq turgan dasturlar' }, { blank: 'RAM' }, { text: 'da, kompyuterni yoqadigan BIOS esa' }, { blank: 'ROM' }, { text: 'da saqlanadi.' }],
          bank: ['RAM', 'ROM', 'SSD']
        }
      }
    },
    {
      id: 'i6q10',
      prompt: 'Protsessorning qisqa nomini yozing (3 harf).',
      hint: 'Central Processing Unit',
      explanation: 'CPU — Central Processing Unit, markaziy protsessor.',
      widget: { type: 'text_answer', props: { before: 'Markaziy protsessor —', answer: 'CPU', width: 5 } }
    }
  ]
};
