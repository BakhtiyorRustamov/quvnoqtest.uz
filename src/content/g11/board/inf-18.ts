import type { BoardLesson } from './types';

/** Darslik: 7.01–7.02 — ekspert tizimlar: tarkibi, toʻgʻri va teskari zanjir, qoʻllanishi, afzallik va kamchiliklari. */
export const INF_18: BoardLesson = {
  n: 18,
  label: '18',
  part: 10,
  title: 'Ekspert tizimlar',
  section: '7.01–7.02',
  steps: [
    {
      kind: 'hook',
      say: "Ertalab mashina oʻt olmadi. Ustaxonadagi kompyuter savol bera boshlaydi: «Faralar yonyaptimi?» — «Ha». «Kalit burilganda starter aylanyaptimi?» — «Yoʻq». Xulosa: «Starter nosoz». Bu kompyuter tajribali usta kabi fikrlaydi. Bunday dastur ekspert tizim deyiladi.",
      easy: "Ekspert tizim savol beradi, javobingizga qarab keyingi savolni tanlaydi va oxirida tajribali mutaxassis kabi xulosa chiqaradi.",
      draw: [],
      animTitle: 'Mashina oʻt olmayapti',
      anim: {
        type: 'tree',
        nodes: [
          { id: 'r', label: 'Faralar yonadimi?' },
          { id: 'a', parent: 'r', edge: 'yoʻq', label: 'Akkumulyator' },
          { id: 'b', parent: 'r', edge: 'ha', label: 'Starter aylanadimi?' },
          { id: 'a1', parent: 'a', label: 'Zaryadlang' },
          { id: 'b1', parent: 'b', edge: 'yoʻq', label: 'Starter nosoz' },
          { id: 'b2', parent: 'b', edge: 'ha', label: 'Yoqilgʻini tekshiring' }
        ],
        path: ['r', 'b', 'b1']
      },
      next: 'Qanday ishlaydi?'
    },
    {
      kind: 'explain',
      say: "Ekspert tizim — muayyan sohadagi mutaxassis kabi qaror qabul qiluvchi dastur. Uning qismlari: foydalanuvchi interfeysi — savol beradi va javob oladi. Bilimlar bazasi — mutaxassislardan yigʻilgan faktlar. Qoidalar bazasi — «AGAR … UNDA …» koʻrinishidagi qoidalar. Xulosa chiqarish mexanizmi — javoblarni qoidalar bilan solishtirib, xulosa chiqaradi. Tushuntirish tizimi — xulosaga qanday kelinganini koʻrsatadi.",
      easy: "Interfeys — savol-javob. Bilimlar bazasi — faktlar. Qoidalar — «agar … unda …». Xulosa mexanizmi — fikrlovchi qism. Tushuntirish — «nega shunday?» degan savolga javob.",
      draw: [],
      animTitle: 'Ekspert tizim qismlari',
      anim: {
        type: 'flow',
        stations: [
          { icon: '💬', label: 'Interfeys' },
          { icon: '⚙️', label: 'Xulosa mexanizmi' },
          { icon: '📚', label: 'Bilim va qoidalar' },
          { icon: '💡', label: 'Tushuntirish' }
        ],
        items: [{ texts: ['Starter aylanmaydi', 'mos qoidani qidiradi', 'AGAR faralar yonsa VA starter aylanmasa UNDA starter nosoz', 'Sabab: faralar ishlaydi, demak tok bor'] }]
      },
      next: 'Qoidalar qanday ishlaydi?'
    },
    {
      kind: 'example',
      say: "Toʻgʻri zanjirda tizim maʼlum faktlardan boshlaydi va qoidalarni ketma-ket qoʻllab, xulosaga keladi. Hayvonni aniqlashni kuzatamiz. Faktlar: tuki bor, goʻsht yeydi, sariq rangda qora chiziqlari bor. Birinchi qoida: tuki bor boʻlsa — sutemizuvchi. Ikkinchi: sutemizuvchi va goʻsht yeydi — yirtqich. Uchinchi: yirtqich va qora chiziqli — yoʻlbars. Har qadamda yangi fakt qoʻshilib boradi.",
      easy: "Toʻgʻri zanjir: faktlardan boshlab, qoida ketidan qoida qoʻllab, oxirida javob chiqadi: tukli ➜ sutemizuvchi ➜ yirtqich ➜ yoʻlbars.",
      draw: [],
      animTitle: 'Toʻgʻri zanjir (faktlardan xulosaga)',
      anim: {
        type: 'code',
        lang: 'pseudo',
        lines: ['faktlar ← {tukli, goʻsht yeydi, qora chiziqli}', 'AGAR tukli UNDA sutemizuvchi', 'AGAR sutemizuvchi VA goʻsht yeydi UNDA yirtqich', 'AGAR yirtqich VA qora chiziqli UNDA yoʻlbars'],
        trace: [
          { line: 1, vars: { faktlar: 3 } },
          { line: 2, vars: { faktlar: 4 }, out: '+ sutemizuvchi' },
          { line: 3, vars: { faktlar: 5 }, out: '+ yirtqich' },
          { line: 4, vars: { faktlar: 6 }, out: '✅ Xulosa: yoʻlbars' }
        ]
      },
      next: 'Teskari zanjir-chi?'
    },
    {
      kind: 'example',
      say: "Teskari zanjirda tizim maqsaddan — taxmindan boshlaydi va uni isbotlovchi dalillarni qidiradi. «Bu yoʻlbarsmi?» Buning uchun yirtqich va chiziqli boʻlishi kerak. Yirtqichmi? Buning uchun sutemizuvchi va goʻsht yeyishi kerak. Tizim har bir shartni foydalanuvchidan soʻrab tekshiradi. Hammasi tasdiqlansa — maqsad isbotlandi.",
      easy: "Teskari zanjir: avval javobni taxmin qilamiz — «yoʻlbars». Keyin «buning uchun nimalar kerak?» deb orqaga qarab tekshiramiz.",
      draw: [],
      animTitle: 'Teskari zanjir (maqsaddan dalilga)',
      anim: {
        type: 'tree',
        nodes: [
          { id: 'r', label: 'Maqsad: yoʻlbarsmi?' },
          { id: 'a', parent: 'r', edge: 'kerak', label: 'Yirtqichmi?' },
          { id: 'b', parent: 'r', edge: 'kerak', label: 'Qora chiziqlimi? ✓' },
          { id: 'a1', parent: 'a', label: 'Sutemizuvchi ✓' },
          { id: 'a2', parent: 'a', label: 'Goʻsht yeydi ✓' }
        ],
        path: ['r', 'a', 'a1', 'a2', 'b']
      },
      next: 'Farqini jamlang'
    },
    {
      kind: 'explain',
      say: "Jamlaymiz. Toʻgʻri zanjir maʼlumotdan boshlanadi: faktlar yigʻiladi, qoidalar qoʻllanadi, natijada xulosa chiqadi — masalan, ob-havo maʼlumotidan prognoz, alomatlardan tashxis. Teskari zanjir maqsaddan boshlanadi: taxmin qilingan xulosa uchun dalil qidiriladi — masalan, «bu kasallik shumi?» yoki «shu nosozlikmi?» degan savolni tekshirish.",
      easy: "Toʻgʻri — «faktlar ➜ javob». Teskari — «taxmin ➜ dalillar».",
      draw: [],
      animTitle: 'Toʻgʻri va teskari zanjir',
      anim: {
        type: 'compare',
        left: { icon: '➡️', title: 'Toʻgʻri zanjir', items: ['Faktlardan boshlanadi', 'Maʼlumot boshqaradi', 'Qoidalar ketma-ket qoʻllanadi', 'Natijada xulosa chiqadi'] },
        right: { icon: '⬅️', title: 'Teskari zanjir', items: ['Maqsaddan boshlanadi', 'Maqsad boshqaradi', 'Shartlar uchun dalil qidiriladi', 'Taxmin isbotlanadi yoki rad etiladi'] }
      },
      next: 'Qayerda ishlatiladi?'
    },
    {
      kind: 'explain',
      say: "Ekspert tizimlar tibbiy tashxisda, avtomobil va uskunalar nosozligini topishda, oʻsimlik va hayvonlarni aniqlashda, foydali qazilmalar qidirishda, kredit berish va moliyaviy maslahatda ishlatiladi. Afzalliklari: har doim bir xil, izchil qaror; charchamaydi va unutmaydi; bir nechta mutaxassis bilimini birlashtiradi; tez ishlaydi. Kamchiliklari: yaratish qimmat va uzoq; faqat bitta tor sohada ishlaydi; sogʻlom fikr va insoniy hissiyot yoʻq; bilimlar bazasida xato boʻlsa, xulosa ham xato.",
      easy: "Ishlatiladi: tibbiyot, avtoustaxona, geologiya, bank. Yaxshi — izchil, tez, charchamaydi. Yomon — qimmat, tor sohada, baza xato boʻlsa — xulosa ham xato.",
      draw: [],
      animTitle: 'Afzallik va kamchilik',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Afzalliklari', items: ['Har doim izchil qaror', 'Charchamaydi, unutmaydi', 'Koʻp mutaxassis bilimi', 'Tez javob'] },
        right: { icon: '👎', title: 'Kamchiliklari', items: ['Yaratish qimmat va uzoq', 'Faqat tor sohada', 'Sogʻlom fikr va hissiyot yoʻq', 'Baza xato — xulosa xato'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Ekspert tizim — muayyan sohadagi mutaxassis kabi qaror qabul qiluvchi dastur.',
    'Qismlari: foydalanuvchi interfeysi, bilimlar bazasi, qoidalar bazasi (AGAR … UNDA …), xulosa chiqarish mexanizmi, tushuntirish tizimi.',
    'Toʻgʻri zanjir: faktlardan xulosaga (maʼlumot boshqaradi); teskari zanjir: maqsaddan dalilga (maqsad boshqaradi).',
    'Qoʻllanishi: tibbiy tashxis, nosozlik topish, oʻsimlik va hayvonni aniqlash, geologiya, moliya.',
    'Afzallik: izchil, tez, charchamaydi; kamchilik: qimmat, tor soha, sogʻlom fikr yoʻq.'
  ],
  questions: [
    {
      id: 'i18q1',
      prompt: 'Qismni vazifasi bilan juftlang.',
      hint: 'Kim savol beradi, kim fikrlaydi?',
      explanation: 'Interfeys — savol-javob; bilimlar bazasi — faktlar; xulosa mexanizmi — qoidalarni qoʻllaydi; tushuntirish tizimi — xulosa sababini koʻrsatadi.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Foydalanuvchi interfeysi' }, right: { label: 'savol beradi, javob oladi' } },
            { left: { label: 'Bilimlar bazasi' }, right: { label: 'mutaxassislardan yigʻilgan faktlar' } },
            { left: { label: 'Xulosa chiqarish mexanizmi' }, right: { label: 'qoidalarni qoʻllab xulosa chiqaradi' } },
            { left: { label: 'Tushuntirish tizimi' }, right: { label: 'xulosaga qanday kelinganini koʻrsatadi' } }
          ]
        }
      }
    },
    {
      id: 'i18q2',
      prompt: 'Toʻgʻri zanjir yoki teskari zanjir?',
      hint: 'Faktdan boshlanadimi yoki maqsaddan?',
      explanation: 'Faktlardan boshlanib xulosaga keladigani — toʻgʻri zanjir. Taxmindan boshlanib dalil qidiradigani — teskari zanjir.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'f', label: 'Toʻgʻri' },
            { id: 'b', label: 'Teskari' }
          ],
          tiles: [
            { id: 't1', label: 'Faktlardan boshlanadi', bin: 'f' },
            { id: 't2', label: 'Maqsaddan boshlanadi', bin: 'b' },
            { id: 't3', label: 'Maʼlumot boshqaradi', bin: 'f' },
            { id: 't4', label: 'Taxminni isbotlash uchun dalil qidiradi', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'i18q3',
      prompt: 'Qoidalar: 1) AGAR qanoti bor UNDA qush. 2) AGAR qush VA ucha olmaydi VA suzadi UNDA pingvin. Faktlar: qanoti bor, ucha olmaydi, suzadi. Toʻgʻri zanjir xulosasini yozing.',
      hint: 'Avval 1-qoida, keyin 2-qoida.',
      explanation: 'Qanoti bor ➜ qush; qush + ucha olmaydi + suzadi ➜ pingvin.',
      widget: { type: 'text_answer', props: { before: 'Xulosa:', answer: 'pingvin', width: 8 } }
    },
    {
      id: 'i18q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Ekspert tizim har qanday sohada ishlaydimi?',
      explanation: 'Ekspert tizim faqat tor sohada ishlaydi; bir xil maʼlumotga doim bir xil javob beradi; bilimlar bazasi xato boʻlsa, xulosa ham xato; qoidalar AGAR–UNDA koʻrinishida.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bitta ekspert tizim har qanday sohada maslahat bera oladi.', value: false },
            { text: 'Bir xil maʼlumotga ekspert tizim doim bir xil javob beradi.', value: true },
            { text: 'Bilimlar bazasidagi xato notoʻgʻri xulosaga olib keladi.', value: true },
            { text: 'Qoidalar «AGAR … UNDA …» koʻrinishida yoziladi.', value: true }
          ]
        }
      }
    },
    {
      id: 'i18q5',
      prompt: 'Ekspert tizimlar qayerda ishlatiladi? Bosing.',
      hint: 'Mutaxassis maslahati kerak boʻlgan joylar.',
      explanation: 'Tibbiy tashxis, avtomobil nosozligi, oʻsimlikni aniqlash va foydali qazilma qidirish — ekspert tizim sohalari. Matn terish va musiqa tinglash — oddiy dasturlar.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Tibbiy tashxis', match: true },
            { id: 'b', text: 'Avtomobil nosozligini topish', match: true },
            { id: 'c', text: 'Oʻsimlik turini aniqlash', match: true },
            { id: 'd', text: 'Foydali qazilma qidirish', match: true },
            { id: 'e', text: 'Musiqa tinglash', match: false }
          ]
        }
      }
    },
    {
      id: 'i18q6',
      prompt: 'Afzallik yoki kamchilik?',
      hint: 'Inson mutaxassis bilan solishtiring.',
      explanation: 'Izchil qaror, charchamaslik, tezlik — afzallik. Qimmatlik, tor soha, sogʻlom fikr yoʻqligi — kamchilik.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'a', label: 'Afzallik' },
            { id: 'k', label: 'Kamchilik' }
          ],
          tiles: [
            { id: 't1', label: 'Har doim izchil qaror', bin: 'a' },
            { id: 't2', label: 'Yaratish qimmat', bin: 'k' },
            { id: 't3', label: 'Charchamaydi', bin: 'a' },
            { id: 't4', label: 'Faqat tor sohada', bin: 'k' },
            { id: 't5', label: 'Tez javob beradi', bin: 'a' },
            { id: 't6', label: 'Sogʻlom fikr yoʻq', bin: 'k' }
          ]
        }
      }
    },
    {
      id: 'i18q7',
      prompt: 'Toʻgʻri zanjir qadamlarini tartiblang.',
      hint: 'Faktlardan xulosaga.',
      explanation: 'Foydalanuvchi faktlarni kiritadi ➜ mexanizm mos qoidani topadi ➜ yangi fakt qoʻshiladi ➜ takrorlanadi ➜ xulosa va tushuntirish chiqadi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Foydalanuvchi savollarga javob beradi', 'Mexanizm mos qoidani topadi', 'Qoida natijasi yangi fakt boʻladi', 'Xulosaga yetguncha takrorlanadi', 'Xulosa va tushuntirish koʻrsatiladi'] }
      }
    },
    {
      id: 'i18q8',
      prompt: 'Qaysi biri ekspert tizim qismi emas?',
      hint: 'Uchtasi ekspert tizim tarkibida.',
      explanation: 'Bilimlar bazasi, xulosa mexanizmi, tushuntirish tizimi — qismlar. Printer drayveri — boshqa dastur.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Bilimlar bazasi' }, { text: 'Xulosa chiqarish mexanizmi' }, { text: 'Tushuntirish tizimi' }, { text: 'Printer drayveri', odd: true }] } }
    },
    {
      id: 'i18q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Qoida ikki qismdan iborat.',
      explanation: 'Qoida «AGAR shart UNDA harakat» koʻrinishida: AGAR och boʻlsam, UNDA ovqatlanaman.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ blank: 'AGAR' }, { text: 'men och boʻlsam,' }, { blank: 'UNDA' }, { text: 'ovqatlanaman.' }],
          bank: ['AGAR', 'UNDA', 'VA']
        }
      }
    },
    {
      id: 'i18q10',
      prompt: 'Qoidalar: AGAR faralar yonmasa UNDA akkumulyator oʻtirgan. AGAR faralar yonsa VA starter aylanmasa UNDA starter nosoz. Faralar yonmayapti. Xulosa qaysi qism haqida? Bir soʻz bilan yozing.',
      hint: 'Birinchi qoida.',
      explanation: 'Faralar yonmasa — akkumulyator oʻtirgan.',
      widget: { type: 'text_answer', props: { before: 'Nosoz:', answer: ['akkumulyator', 'akkumulyatorda'], width: 12 } }
    }
  ]
};
