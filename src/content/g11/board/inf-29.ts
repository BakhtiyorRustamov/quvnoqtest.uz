import type { BoardLesson } from './types';

/** Darslik: 9.02–9.03 — fayl turlari, fayllarga kirish usullari (ketma-ket, toʻgʻridan-toʻgʻri, indeksli), boshqaruv axborot tizimi (MIS). */
export const INF_29: BoardLesson = {
  n: 29,
  label: '29',
  part: 10,
  title: 'Fayllarga kirish va MIS',
  section: '9.02–9.03',
  steps: [
    {
      kind: 'hook',
      say: "Magnit tasmada mijozlar yozuvlari ketma-ket turibdi. M107 mijozni topish uchun tasma boshidan bitta-bitta oʻqib boriladi: M101, M102, M103… toki M107 ga yetguncha. Bu ketma-ket kirish. Hamma yozuvni baribir qayta ishlash kerak boʻlsa — masalan, oylik maoshda — juda qulay, lekin bitta yozuvni topish sekin.",
      easy: "Ketma-ket kirish — kitobni birinchi betdan varaqlab, kerakli betni topishga oʻxshaydi.",
      draw: [],
      animTitle: 'Ketma-ket kirish: M107',
      anim: { type: 'access', mode: 'sequential', keys: ['M101', 'M102', 'M103', 'M104', 'M105', 'M106', 'M107', 'M108'], target: 'M107' },
      next: 'Tezroq usul bormi?'
    },
    {
      kind: 'explain',
      say: "Toʻgʻridan-toʻgʻri kirishda, yaʼni ixtiyoriy kirishda yozuv qayerda turgani kalitdan hisoblab topiladi. Kalitga xeshlash algoritmi qoʻllanadi: u kalitni xotira manziliga aylantiradi. Kompyuter darhol oʻsha manzilga borib, yozuvni bitta oʻqishda oladi. Bu disk va SSD da ishlaydi — chipta band qilish, bankomat kabi tez javob kerak boʻlgan tizimlar uchun.",
      easy: "Kalitdan formula bilan manzil hisoblanadi va kompyuter toʻgʻri oʻsha joyga sakraydi — varaqlash yoʻq.",
      draw: [],
      animTitle: 'Toʻgʻridan-toʻgʻri kirish (xeshlash)',
      anim: { type: 'access', mode: 'direct', keys: ['M101', 'M102', 'M103', 'M104', 'M105', 'M106', 'M107', 'M108'], target: 'M107' },
      next: 'Indeksli nima?'
    },
    {
      kind: 'explain',
      say: "Indeksli ketma-ket kirish ikkalasini birlashtiradi. Yozuvlar kalit tartibida turadi, qoʻshimcha ravishda indeks bor — kitob mundarijasi kabi: «M105 dan boshlab — 2-blok». Kompyuter avval indeksdan kerakli blokni topadi, keyin faqat oʻsha blok ichida qidiradi. Butun faylni ketma-ket qayta ishlash ham, bitta yozuvni tez topish ham mumkin.",
      easy: "Indeks — mundarija. Avval mundarijadan bobni topasiz, keyin faqat oʻsha bobni varaqlaysiz.",
      draw: [],
      animTitle: 'Indeksli ketma-ket kirish',
      anim: { type: 'access', mode: 'indexed', keys: ['M101', 'M102', 'M103', 'M104', 'M105', 'M106', 'M107', 'M108'], target: 'M107' },
      next: 'Qachon qaysi biri?'
    },
    {
      kind: 'explain',
      say: "Qaysi usul qachon? Ketma-ket — hamma yozuv qayta ishlanadigan paketli ishlar: oylik maosh, kommunal kvitansiyalar, zaxira nusxa magnit tasmada. Toʻgʻridan-toʻgʻri — bitta yozuvga darhol kirish kerak boʻlganda: chipta band qilish, bank kartasi bilan toʻlov. Indeksli — ikkalasi ham kerak boʻlganda: kutubxona katalogi, ombor hisobi.",
      easy: "Hammasini birma-bir — ketma-ket. Bittasini tez — toʻgʻridan-toʻgʻri. Ikkalasi kerak — indeksli.",
      draw: [],
      animTitle: 'Qaysi usul qachon',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '📼', title: 'Ketma-ket', text: 'Oylik maosh, kvitansiyalar, tasmadagi zaxira' },
          { icon: '🎯', title: 'Toʻgʻridan-toʻgʻri', text: 'Chipta band qilish, karta bilan toʻlov' },
          { icon: '📑', title: 'Indeksli', text: 'Kutubxona katalogi, ombor hisobi' }
        ]
      },
      next: 'Fayl turlari-chi?'
    },
    {
      kind: 'explain',
      say: "Fayl formatlari ikki xil. Umumiy formatlarni deyarli har qanday dastur ochadi: CSV — vergul bilan ajratilgan qiymatlar, TXT — oddiy matn, RTF — formatlashli matn. Ular maʼlumot almashish uchun qulay. Xususiy, yaʼni dasturga xos formatlar faqat oʻsha dastur yoki unga mos dasturlarda toʻliq ochiladi: masalan, elektron jadval va maʼlumotlar bazasi dasturlarining oʻz formatlari. Ular formulalar, formatlash va bogʻlanishlarni ham saqlaydi.",
      easy: "Umumiy format (CSV, TXT, RTF) — hamma dastur ochadi. Xususiy format — faqat oʻz dasturi, lekin formulalar va bezaklarni ham saqlaydi.",
      draw: [],
      animTitle: 'Umumiy va xususiy formatlar',
      anim: {
        type: 'compare',
        left: { icon: '🌐', title: 'Umumiy', items: ['CSV, TXT, RTF', 'Deyarli har qanday dastur ochadi', 'Almashish uchun qulay', 'Formula va bezak yoʻqolishi mumkin'] },
        right: { icon: '🔒', title: 'Xususiy', items: ['Dasturning oʻz formati', 'Faqat mos dasturda toʻliq ochiladi', 'Formula, format, bogʻlanish saqlanadi', 'Almashishda muammo boʻlishi mumkin'] }
      },
      next: 'MIS nima?'
    },
    {
      kind: 'example',
      say: "Boshqaruv axborot tizimi — MIS — tashkilotning turli boʻlimlaridan maʼlumot yigʻib, rahbarlar uchun hisobot tayyorlaydi. Savdo, ombor va moliya boʻlimlaridan maʼlumot keladi, MIS ularni umumlashtiradi va jadval, diagramma koʻrinishida koʻrsatadi: «qaysi doʻkon koʻp sotdi», «qaysi mahsulot tugayapti». Rahbar shu asosda qaror qabul qiladi. MIS oʻzi qaror chiqarmaydi — u qaror qabul qilishga yordam beradi.",
      easy: "MIS — boʻlimlardan maʼlumot yigʻib, rahbarga tushunarli hisobot beradigan tizim. Qarorni odam qabul qiladi.",
      draw: [],
      animTitle: 'Boshqaruv axborot tizimi',
      anim: {
        type: 'flow',
        stations: [
          { icon: '🏬', label: 'Boʻlimlar' },
          { icon: '🗄️', label: 'MIS' },
          { icon: '📊', label: 'Hisobot' },
          { icon: '👔', label: 'Rahbar qarori' }
        ],
        items: [
          { texts: ['Savdo: kunlik sotuv', 'umumlashtiradi', 'Doʻkonlar reytingi', 'Yaxshi doʻkonni ragʻbatlantirish'] },
          { texts: ['Ombor: qoldiqlar', 'solishtiradi', 'Tugayotgan mahsulotlar', 'Buyurtma berish'] }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Ketma-ket kirish — yozuvlar boshidan bittalab oʻqiladi; paketli ishlar va tasma uchun.',
    'Toʻgʻridan-toʻgʻri kirish — kalitdan xeshlash orqali manzil hisoblanadi; chipta, bank uchun.',
    'Indeksli ketma-ket kirish — indeks orqali blok topiladi, keyin blok ichida qidiriladi.',
    'Umumiy formatlar (CSV, TXT, RTF) — hamma dasturda; xususiy formatlar — oʻz dasturida, koʻproq imkoniyat saqlaydi.',
    'MIS — boʻlimlar maʼlumotini yigʻib, rahbarlar uchun hisobot tayyorlaydi va qarorga yordam beradi.'
  ],
  questions: [
    {
      id: 'i29q1',
      prompt: 'Vazifaga mos kirish usulini juftlang.',
      hint: 'Hammasimi, bittasimi yoki ikkalasi?',
      explanation: 'Oylik maosh — ketma-ket; chipta band qilish — toʻgʻridan-toʻgʻri; kutubxona katalogi — indeksli.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: '500 xodimning oylik maoshi' }, right: { label: 'ketma-ket' } },
            { left: { label: 'Poyezd chiptasini band qilish' }, right: { label: 'toʻgʻridan-toʻgʻri' } },
            { left: { label: 'Kutubxona katalogi' }, right: { label: 'indeksli ketma-ket' } }
          ]
        }
      }
    },
    {
      id: 'i29q2',
      prompt: 'Ketma-ket faylda yozuvlar M101 dan boshlab tartib bilan turibdi. M105 ni topish uchun nechta yozuv oʻqiladi?',
      hint: 'M101, M102, …, M105.',
      explanation: 'M101 dan M105 gacha — 5 ta yozuv.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'yozuv' } }
    },
    {
      id: 'i29q3',
      prompt: 'Toʻgʻridan-toʻgʻri kirishda kalitdan manzilni hisoblovchi algoritm nima deyiladi? (Bir soʻz)',
      hint: 'Hash…',
      explanation: 'Xeshlash (hashing) algoritmi.',
      widget: { type: 'text_answer', props: { answer: ['xeshlash', 'heshlash', 'hashing', 'xesh'], width: 10 } }
    },
    {
      id: 'i29q4',
      prompt: 'Umumiy yoki xususiy format?',
      hint: 'Hamma dastur ochadimi?',
      explanation: 'CSV, TXT, RTF — umumiy. Elektron jadval va baza dasturlarining oʻz formatlari — xususiy.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'g', label: 'Umumiy' },
            { id: 'p', label: 'Xususiy' }
          ],
          tiles: [
            { id: 't1', label: 'CSV', bin: 'g' },
            { id: 't2', label: 'Elektron jadval dasturining oʻz fayli', bin: 'p' },
            { id: 't3', label: 'TXT', bin: 'g' },
            { id: 't4', label: 'Baza dasturining oʻz fayli', bin: 'p' },
            { id: 't5', label: 'RTF', bin: 'g' }
          ]
        }
      }
    },
    {
      id: 'i29q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Magnit tasmada qaysi kirish mumkin?',
      explanation: 'Tasma faqat ketma-ket oʻqiladi; MIS qaror qabul qilishga yordam beradi, oʻzi qaror chiqarmaydi; CSV da formulalar saqlanmaydi; indeks — mundarijaga oʻxshash.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Magnit tasmada toʻgʻridan-toʻgʻri kirish eng qulay.', value: false },
            { text: 'MIS rahbarlarga qaror qabul qilishda yordam beradi.', value: true },
            { text: 'CSV fayl elektron jadval formulalarini saqlaydi.', value: false },
            { text: 'Indeks kitob mundarijasiga oʻxshaydi.', value: true }
          ]
        }
      }
    },
    {
      id: 'i29q6',
      prompt: 'Indeksli kirish bosqichlarini tartiblang.',
      hint: 'Avval mundarija.',
      explanation: 'Kalit kiritiladi ➜ indeksdan blok topiladi ➜ blok ichida qidiriladi ➜ yozuv oʻqiladi.',
      widget: { type: 'step_order', props: { steps: ['Qidiriladigan kalit beriladi', 'Indeksdan kerakli blok topiladi', 'Faqat shu blok ichida qidiriladi', 'Yozuv oʻqiladi'] } }
    },
    {
      id: 'i29q7',
      prompt: 'MIS hisobotiga misollarni bosing.',
      hint: 'Rahbar qaror qabul qilishi uchun.',
      explanation: 'Oylik savdo diagrammasi, tugayotgan mahsulotlar va filiallar reytingi — MIS hisobotlari. Bitta mijozning chekini chop etish — oddiy tranzaksiya.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Oylik savdo diagrammasi', match: true },
            { id: 'b', text: 'Tugayotgan mahsulotlar roʻyxati', match: true },
            { id: 'c', text: 'Filiallar reytingi', match: true },
            { id: 'd', text: 'Bitta xaridorning cheki', match: false }
          ]
        }
      }
    },
    {
      id: 'i29q8',
      prompt: 'Qaysi biri fayl formati emas?',
      hint: 'Uchtasi fayl kengaytmasi.',
      explanation: 'CSV, TXT, RTF — formatlar. MIS — axborot tizimi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'CSV' }, { text: 'TXT' }, { text: 'RTF' }, { text: 'MIS', odd: true }] } }
    },
    {
      id: 'i29q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Tasma va disk.',
      explanation: 'Magnit tasmada faqat ketma-ket, diskda esa toʻgʻridan-toʻgʻri kirish ham mumkin.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Magnit tasmada faqat' }, { blank: 'ketma-ket' }, { text: 'kirish mumkin, diskda esa' }, { blank: 'toʻgʻridan-toʻgʻri' }, { text: 'kirish ham ishlaydi.' }],
          bank: ['ketma-ket', 'toʻgʻridan-toʻgʻri', 'indeks']
        }
      }
    },
    {
      id: 'i29q10',
      prompt: 'Boshqaruv axborot tizimining qisqa nomini yozing.',
      hint: 'Management Information System',
      explanation: 'MIS — Management Information System.',
      widget: { type: 'text_answer', props: { answer: 'MIS', width: 5 } }
    }
  ]
};
