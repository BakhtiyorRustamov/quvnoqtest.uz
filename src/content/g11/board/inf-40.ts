import type { BoardLesson } from './types';

/** Darslik: 15-bob, 15.01 — tizimdan foydalanish sikli; tahlil usullari va spetsifikatsiyalar. */
export const INF_40: BoardLesson = {
  n: 40,
  label: '40',
  part: 11,
  title: 'Tizim hayot sikli: tahlil',
  section: '15.01',
  steps: [
    {
      kind: 'hook',
      say: "Maktab qogʻoz jurnal oʻrniga elektron jurnal tizimini buyurtma qildi. Yangi tizim birdan paydo boʻlmaydi: u tizimdan foydalanish siklidan oʻtadi. Tahlil, loyihalash, ishlab chiqish va sinov, oʻrnatish, hujjatlashtirish, baholash va texnik xizmat koʻrsatish. Xizmat paytida yangi talablar chiqsa, sikl yana tahlildan boshlanadi.",
      easy: "Tizim sikli: tahlil ➜ loyihalash ➜ ishlab chiqish va sinov ➜ oʻrnatish ➜ hujjatlar ➜ baholash ➜ xizmat.",
      draw: [],
      animTitle: 'Tizimdan foydalanish sikli',
      anim: {
        type: 'cycle',
        center: 'Yangi talab ➜ yana tahlil',
        stages: [
          { icon: '🔍', label: 'Tahlil' },
          { icon: '📐', label: 'Loyihalash' },
          { icon: '🧪', label: 'Ishlab chiqish va sinov' },
          { icon: '📦', label: 'Oʻrnatish' },
          { icon: '📚', label: 'Hujjatlashtirish' },
          { icon: '⭐', label: 'Baholash' },
          { icon: '🔧', label: 'Texnik xizmat' }
        ]
      },
      next: 'Tahlil nima?'
    },
    {
      kind: 'explain',
      say: "Tahlilda joriy tizim qanday ishlashi va mijoz yangi tizimdan nima kutishi aniqlanadi. Buning toʻrtta usuli bor: kuzatish, suhbat, soʻrovnoma va hujjatlar tahlili. Kuzatishda tahlilchi xodimlar ishini oʻz koʻzi bilan koʻradi: maʼlumot ishonchli, lekin koʻp vaqt oladi va baʼzilar kuzatilsa oʻzini noqulay his qiladi. Suhbatda qoʻshimcha savollar berib, javobni aniqlashtirish mumkin, ammo har bir suhbat vaqt talab qiladi.",
      easy: "Kuzatish — oʻz koʻzi bilan koʻradi. Suhbat — savol berib, aniqlashtiradi.",
      draw: [],
      animTitle: 'Tahlil usullari',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '👀', title: 'Kuzatish', text: 'Ishni oʻz koʻzi bilan koʻradi; vaqt oladi' },
          { icon: '🗣️', title: 'Suhbat', text: 'Qoʻshimcha savol beriladi; kam odamga qulay' },
          { icon: '📋', title: 'Soʻrovnoma', text: 'Koʻp odamdan tez, anonim; aniqlashtirib boʻlmaydi' },
          { icon: '📄', title: 'Hujjatlar tahlili', text: 'Mavjud blanka, hisobotlarni oʻrganadi' }
        ]
      },
      next: 'Soʻrovnoma qachon kerak?'
    },
    {
      kind: 'explain',
      say: "Soʻrovnoma foydalanuvchi koʻp boʻlganda qulay: elektron jurnal uchun yuzlab oʻquvchi, oʻqituvchi va ota-onaning fikri kerak. Savollar javob variantli boʻlsa, natijani sanash oson. Anonim soʻrovnomada javoblar haqqoniyroq. Kamchiligi — qoʻshimcha savol berib boʻlmaydi. Onlayn soʻrovnoma natijalari darhol jadval va diagrammaga aylanadi.",
      easy: "Koʻp odam boʻlsa — soʻrovnoma. Variantli savollar natijani sanashni osonlashtiradi.",
      draw: [],
      animTitle: 'Onlayn soʻrovnoma natijasi',
      anim: {
        type: 'chart',
        kind: 'bar',
        title: 'Elektron jurnalda eng muhim maʼlumot (ovozlar)',
        labels: ['Baholar', 'Davomat', 'Uy vazifa', 'Izohlar'],
        values: [182, 141, 120, 57]
      },
      next: 'Usulni qanday tanlaymiz?'
    },
    {
      kind: 'explain',
      say: "Usulni vaziyatga qarab tanlaymiz. Uch nafar buxgalter bilan — suhbat. Ming nafar mijoz bilan — soʻrovnoma. Omborchi qanday ishlashini bilish uchun — kuzatish. Hozirgi kvitansiya va hisobotlarda qanday maʼlumot borligini bilish uchun — hujjatlar tahlili. Koʻpincha bir nechta usul birga ishlatiladi: hujjatlar tahlili faqat hozirgi maʼlumotni koʻrsatadi, shuning uchun uni suhbat bilan toʻldirish foydali.",
      easy: "Kam odam — suhbat. Koʻp odam — soʻrovnoma. Ishni koʻrish — kuzatish. Blankalar — hujjatlar tahlili.",
      draw: [],
      animTitle: 'Qaysi usul?',
      anim: {
        type: 'tree',
        nodes: [
          { id: 'q', label: 'Nimani bilmoqchimiz?' },
          { id: 'p', label: 'Odamlar fikri', parent: 'q' },
          { id: 'w', label: 'Ish jarayoni', parent: 'q', edge: 'koʻrish' },
          { id: 'd', label: 'Hujjatlar tahlili', parent: 'q', edge: 'blankalar' },
          { id: 'i', label: 'Suhbat', parent: 'p', edge: 'kam odam' },
          { id: 's', label: 'Soʻrovnoma', parent: 'p', edge: 'koʻp odam' },
          { id: 'o', label: 'Kuzatish', parent: 'w' }
        ],
        path: ['q', 'p', 's']
      },
      next: 'Tahlildan keyin nima?'
    },
    {
      kind: 'explain',
      say: "Tahlil natijasida spetsifikatsiyalar yoziladi. Talablar spetsifikatsiyasi — mijoz yangi tizimdan nimani xohlashi: masalan, ota-ona farzandining baholarini koʻra olsin. Tizim spetsifikatsiyasi — tizim ishlashi uchun qanday apparat va dasturiy taʼminot kerak: server, xotira, brauzer. Texnik topshiriq — loyihalovchi uchun: tizim qanday koʻrinadi, qanday ishlaydi va maʼlumotlar qanday tuzilgan.",
      easy: "Talablar — mijoz nima xohlaydi. Tizim spetsifikatsiyasi — qanday kompyuter va dastur kerak. Texnik topshiriq — tizim qanday tuziladi.",
      draw: [],
      animTitle: 'Tahlildan spetsifikatsiyagacha',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🔍', label: 'Tahlil natijasi' },
          { icon: '📝', label: 'Spetsifikatsiya' },
          { icon: '📐', label: 'Loyihalovchiga' }
        ],
        items: [
          { texts: ['ota-onalar baholarni koʻrmoqchi', 'Talablar: baho sahifasi', 'sahifa dizayni'] },
          { texts: ['500 ta foydalanuvchi', 'Tizim: server, 16 GB xotira', 'apparat tanlanadi'] },
          { texts: ['baho 1–5 orasida', 'Texnik topshiriq: «Baho» maydoni', 'validatsiya qoidasi'] }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Tizim sikli: tahlil ➜ loyihalash ➜ ishlab chiqish va sinov ➜ oʻrnatish ➜ hujjatlashtirish ➜ baholash ➜ texnik xizmat.',
    'Tahlil usullari: kuzatish, suhbat, soʻrovnoma, hujjatlar tahlili.',
    'Suhbat — kam odam, qoʻshimcha savol; soʻrovnoma — koʻp odam, anonim, lekin aniqlashtirib boʻlmaydi.',
    'Kuzatish ishonchli, ammo koʻp vaqt oladi va xodimlarni noqulay qilishi mumkin.',
    'Talablar spetsifikatsiyasi — mijoz xohishi; tizim spetsifikatsiyasi — apparat va dastur; texnik topshiriq — tizim tuzilishi.'
  ],
  questions: [
    {
      id: 'i40q1',
      prompt: 'Tizimdan foydalanish sikli bosqichlarini tartiblang.',
      hint: 'Tahlildan boshlanadi.',
      explanation: 'Tahlil ➜ loyihalash ➜ ishlab chiqish va sinov ➜ oʻrnatish ➜ baholash.',
      widget: { type: 'step_order', props: { steps: ['Tahlil', 'Loyihalash', 'Ishlab chiqish va sinov', 'Oʻrnatish', 'Baholash'] } }
    },
    {
      id: 'i40q2',
      prompt: 'Vaziyatga mos tahlil usulini juftlang.',
      hint: 'Odamlar soni va nimani bilmoqchimiz?',
      explanation: '3 ta buxgalter — suhbat; 2000 ta mijoz — soʻrovnoma; omborchining ishini koʻrish — kuzatish; eski kvitansiyalar — hujjatlar tahlili.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: '3 ta buxgalterning fikri' }, right: { label: 'suhbat' } },
            { left: { label: '2000 ta mijozning fikri' }, right: { label: 'soʻrovnoma' } },
            { left: { label: 'Omborchi qanday ishlashini koʻrish' }, right: { label: 'kuzatish' } },
            { left: { label: 'Eski kvitansiyalarni oʻrganish' }, right: { label: 'hujjatlar tahlili' } }
          ]
        }
      }
    },
    {
      id: 'i40q3',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Har usulning kuchli va zaif tomoni bor.',
      explanation: 'Soʻrovnomada qoʻshimcha savol berib boʻlmaydi; suhbatda — mumkin; kuzatish koʻp vaqt oladi; anonim soʻrovnoma javoblari haqqoniyroq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Soʻrovnomada tahlilchi qoʻshimcha aniqlashtiruvchi savol bera oladi.', value: false },
            { text: 'Suhbatda javobni qoʻshimcha savol bilan aniqlashtirish mumkin.', value: true },
            { text: 'Kuzatish usuli juda tez va hech kimni bezovta qilmaydi.', value: false },
            { text: 'Anonim soʻrovnomada javoblar haqqoniyroq boʻladi.', value: true }
          ]
        }
      }
    },
    {
      id: 'i40q4',
      prompt: 'Soʻrovnomaga 600 kishi javob berdi, 150 tasi «Davomat eng muhim» dedi. Bu necha foiz?',
      hint: '150 : 600 × 100',
      explanation: '150 / 600 × 100 = 25 %.',
      widget: { type: 'number_answer', props: { answer: 25, unit: '%' } }
    },
    {
      id: 'i40q5',
      prompt: 'Qaysi spetsifikatsiya?',
      hint: 'Mijoz xohishi yoki kompyuter talabi?',
      explanation: 'Ota-ona baholarni koʻrishi va SMS xabar — talablar; server va brauzer versiyasi — tizim spetsifikatsiyasi.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'r', label: 'Talablar' },
            { id: 's', label: 'Tizim spetsifikatsiyasi' }
          ],
          tiles: [
            { id: 't1', label: 'Ota-ona baholarni koʻra olsin', bin: 'r' },
            { id: 't2', label: 'Server: 16 GB tezkor xotira', bin: 's' },
            { id: 't3', label: 'Yangi baho qoʻyilsa SMS kelsin', bin: 'r' },
            { id: 't4', label: 'Chrome 120 yoki yangisi', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'i40q6',
      prompt: 'Qaysi biri tahlil usuli emas?',
      hint: 'Toʻrtta usulni eslang.',
      explanation: 'Kuzatish, suhbat va soʻrovnoma — tahlil usullari. Parallel oʻrnatish — joriy etish usuli.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Kuzatish' }, { text: 'Suhbat' }, { text: 'Soʻrovnoma' }, { text: 'Parallel oʻrnatish', odd: true }] } }
    },
    {
      id: 'i40q7',
      prompt: 'Yaxshi soʻrovnomaning belgilarini bosing.',
      hint: 'Tez, anonim, oson sanaladigan.',
      explanation: 'Javob variantlari, anonimlik, qisqalik va onlayn shakl — yaxshi. Xodimni qoʻrqitadigan savol — yomon.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Javob variantlari bor', match: true },
            { id: 'b', text: 'Anonim toʻldiriladi', match: true },
            { id: 'c', text: 'Toʻldirish uchun koʻp vaqt ketmaydi', match: true },
            { id: 'd', text: 'Onlayn — natija darhol diagrammada', match: true },
            { id: 'e', text: 'Xodimning ishiga tahdid qiluvchi savol', match: false }
          ]
        }
      }
    },
    {
      id: 'i40q8',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Mijoz xohishi va loyihalovchi uchun hujjat.',
      explanation: 'Mijoz xohishi — talablar spetsifikatsiyasi; tizim tuzilishi taʼrifi — texnik topshiriq.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Mijoz yangi tizimdan nimani xohlashi —' }, { blank: 'talablar' }, { text: 'spetsifikatsiyasi. Tizim koʻrinishi va maʼlumot tuzilmasi taʼrifi — texnik' }, { blank: 'topshiriq' }, { text: '.' }],
          bank: ['talablar', 'topshiriq', 'kuzatish']
        }
      }
    },
    {
      id: 'i40q9',
      prompt: 'Kuzatish usulining kamchiligini tanlang.',
      hint: 'Vaqt va odamlarning his-tuygʻusi.',
      explanation: 'Kuzatish koʻp vaqt oladi va xodimlar kuzatilganda oʻzini boshqacha tutishi mumkin.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Koʻp vaqt oladi', match: true },
            { id: 'b', text: 'Xodim kuzatilsa oʻzini noqulay his qiladi', match: true },
            { id: 'c', text: 'Ishni oʻz koʻzi bilan koʻradi', match: false },
            { id: 'd', text: 'Maʼlumot ishonchli', match: false }
          ]
        }
      }
    },
    {
      id: 'i40q10',
      prompt: 'Koʻp odamdan tez, anonim fikr yigʻadigan tahlil usuli nomini yozing.',
      hint: 'Savollar varagʻi.',
      explanation: 'Soʻrovnoma.',
      widget: { type: 'text_answer', props: { answer: ['soʻrovnoma', 'sorovnoma', 'anketa'], width: 11 } }
    }
  ]
};
