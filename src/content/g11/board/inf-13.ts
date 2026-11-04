import type { BoardLesson } from './types';

/** Darslik: 4.03 — kompyuter bilan ishlashda salomatlik va xavfsizlik. */
export const INF_13: BoardLesson = {
  n: 13,
  label: '13',
  part: 10,
  title: 'Kompyuter bilan ishlashda sogʻliq',
  section: '4.03',
  steps: [
    {
      kind: 'hook',
      say: "Jasur kechasi uch soat tanaffussiz oʻyin oʻynadi. Ertalab koʻzlari achishdi, beli va bilagi ogʻridi. Keling, uning ish joyini tekshiramiz: ekran qanchalik yaqin, stul qanday, simlar qayerda, tanaffus boʻldimi?",
      easy: "Uzoq va notoʻgʻri oʻtirib ishlash koʻz, bel va qoʻllarni charchatadi. Ish joyini toʻgʻri sozlash bilan buning oldini olish mumkin.",
      draw: [],
      animTitle: 'Ish joyini tekshiramiz',
      anim: {
        type: 'form',
        title: '🪑 Jasurning ish joyi',
        fields: [
          { label: 'Ekrangacha', value: '25 sm', check: 'Koʻz', ok: false, note: 'juda yaqin — taxminan qoʻl uzunligida boʻlsin' },
          { label: 'Tanaffus', value: '3 soatda 0 marta', check: 'Charchoq', ok: false, note: 'har soatda turib, yurib keling' },
          { label: 'Stul', value: 'suyanchiqsiz taburet', check: 'Bel', ok: false, note: 'sozlanadigan, suyanchiqli stul kerak' },
          { label: 'Simlar', value: 'polda sochilgan', check: 'Xavfsizlik', ok: false, note: 'qoqilib ketish mumkin — mahkamlang' },
          { label: 'Yorugʻlik', value: 'xona yorugʻ', check: 'Koʻz', ok: true, note: 'ekranda aks yoʻq — yaxshi' }
        ]
      },
      next: 'Nima boʻladi?'
    },
    {
      kind: 'explain',
      say: "Kompyuterdan notoʻgʻri foydalanish beshta asosiy sogʻliq muammosiga olib keladi. Takroriy harakatlardan — sichqonchani tinimsiz bosish, koʻp yozishdan qoʻl, yelka va boʻyinda ogʻriq paydo boʻladi. Bilak orqali oʻtuvchi asab siqilsa, barmoqlarda ogʻriq va uvishish boʻladi — buni karpal tunnel sindromi deyishadi. Notoʻgʻri oʻtirishdan bel ogʻriydi. Ekranga uzoq tikilishdan koʻz charchaydi va bosh ogʻriydi. Oyoqlarni qimirlatmay uzoq oʻtirish qon aylanishini yomonlashtiradi, uzoq aqliy ish esa charchoq va stress keltiradi.",
      easy: "Qoʻl ogʻrigʻi — koʻp bosishdan. Bel ogʻrigʻi — notoʻgʻri oʻtirishdan. Koʻz charchashi — ekranga uzoq qarashdan. Oyoqlar — qimirlamay oʻtirishdan. Charchoq — tanaffussiz ishlashdan.",
      draw: [],
      animTitle: 'Sogʻliq muammolari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🖱️', title: 'Qoʻl va yelka', text: 'Takroriy bosish va yozishdan ogʻriq' },
          { icon: '✋', title: 'Bilak asabi', text: 'Barmoqlarda ogʻriq va uvishish' },
          { icon: '🪑', title: 'Bel', text: 'Notoʻgʻri va uzoq oʻtirishdan' },
          { icon: '👀', title: 'Koʻz', text: 'Ekranga uzoq tikilishdan charchash' },
          { icon: '🦵', title: 'Oyoqlar', text: 'Qimirlamay oʻtirish qon aylanishini sekinlatadi' },
          { icon: '😩', title: 'Charchoq', text: 'Uzoq aqliy ish va stress' }
        ]
      },
      next: 'Qanday oldini olamiz?'
    },
    {
      kind: 'example',
      say: "Har bir muammoning oldini olish yoʻli bor. Kuzating: sabab, keyin choralar. Qoʻl uchun — tanaffuslar va qulay klaviatura. Bel uchun — balandligi sozlanadigan, suyanchiqli stul va toʻgʻri oʻtirish: oyoqlar yerda, tirsaklar toʻgʻri burchakda. Koʻz uchun — ekranni qoʻl uzunligida qoʻyish, aks berishni kamaytirish va vaqti-vaqti bilan uzoqqa qarash. Oyoqlar va charchoq uchun — har soatda turib yurish.",
      easy: "Tanaffus, toʻgʻri stul, ekran uzoqroqda, uzoqqa qarab koʻzni dam oldirish va har soatda turib yurish — asosiy qoidalar.",
      draw: [],
      animTitle: 'Muammo ➜ oldini olish',
      anim: {
        type: 'flow',
        stations: [
          { icon: '⚠️', label: 'Muammo' },
          { icon: '🛡️', label: 'Oldini olish' }
        ],
        items: [
          { texts: ['Qoʻl va bilak ogʻrigʻi', 'Tanaffus, qulay klaviatura'] },
          { texts: ['Bel ogʻrigʻi', 'Sozlanadigan suyanchiqli stul'] },
          { texts: ['Koʻz charchashi', 'Ekran uzoqroq, uzoqqa qarab dam'] },
          { texts: ['Oyoq va charchoq', 'Har soatda turib yurish'] }
        ]
      },
      next: 'Koʻzni qanday dam oldiramiz?'
    },
    {
      kind: 'example',
      say: "Koʻz uchun oddiy odat bor: har yigirma daqiqada yigirma soniya davomida taxminan olti metr uzoqdagi narsaga qarang. Bu koʻz mushaklarini boʻshashtiradi. Shuningdek, tez-tez koʻz qirpiting, ekran yorqinligini xona yorugʻligiga moslang va kechasi uxlashdan oldin ekranga kamroq qarang.",
      easy: "20 daqiqa ishladingiz — 20 soniya uzoqqa qarang. Shu odat koʻzni charchoqdan saqlaydi.",
      draw: [],
      animTitle: '20 — 20 — 6',
      anim: {
        type: 'cycle',
        center: 'Takrorlang',
        stages: [
          { icon: '💻', label: '20 daqiqa ishlash' },
          { icon: '🔭', label: '6 metr uzoqqa qarash' },
          { icon: '⏱️', label: '20 soniya' }
        ]
      },
      next: 'Xavfsizlik-chi?'
    },
    {
      kind: 'explain',
      say: "Sogʻliqdan tashqari xavfsizlik muammolari ham bor. Bitta rozetkaga koʻp qurilma ulansa yoki kompyuter qizib ketsa — yongʻin chiqishi mumkin: xona salqin boʻlsin, oʻt oʻchirgich turishi kerak. Polda sochilgan simlarga qoqilib ketish mumkin — ularni mahkamlang. Eskirgan simlarga tegish yoki qurilmaga suv toʻkilishi elektr toki urishiga olib keladi. Shuning uchun kompyuter oldida yemang va ichmang, simlarni muntazam tekshiring.",
      easy: "Yongʻin — rozetkani ortiqcha yuklamang. Qoqilish — simlarni yigʻing. Tok urishi — suv va eski simlardan ehtiyot boʻling.",
      draw: [],
      animTitle: 'Xavfsizlik',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🔥', title: 'Yongʻin', text: 'Ortiqcha yuklangan rozetka, qizib ketish — salqin xona, oʻt oʻchirgich' },
          { icon: '🧶', title: 'Qoqilib ketish', text: 'Polda sochilgan simlar — kabel kanaliga yigʻing' },
          { icon: '⚡', title: 'Tok urishi', text: 'Eskirgan simlar — muntazam tekshiring' },
          { icon: '🥤', title: 'Toʻkilgan ichimlik', text: 'Qisqa tutashuv — kompyuter oldida ichmang' }
        ]
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Sogʻliq muammolari: qoʻl va bilak ogʻrigʻi, bel ogʻrigʻi, koʻz charchashi, oyoqlarda qon aylanishi, charchoq va stress.',
    'Oldini olish: tanaffuslar, sozlanadigan suyanchiqli stul, toʻgʻri oʻtirish, ekranni uzoqroq qoʻyish, har soatda turib yurish.',
    'Koʻz uchun: har 20 daqiqada 20 soniya uzoqqa qarash.',
    'Xavfsizlik: yongʻin, simlarga qoqilish, tok urishi, toʻkilgan suyuqlik — rozetkani yuklamaslik, simlarni yigʻish va tekshirish, kompyuter oldida ichmaslik.'
  ],
  questions: [
    {
      id: 'i13q1',
      prompt: 'Muammoni sababi bilan juftlang.',
      hint: 'Nima qilganda paydo boʻladi?',
      explanation: 'Koʻz charchashi — ekranga uzoq tikilish; bel ogʻrigʻi — notoʻgʻri oʻtirish; bilak ogʻrigʻi — takroriy bosish; charchoq — tanaffussiz aqliy ish.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Koʻz charchashi' }, right: { label: 'ekranga uzoq tikilish' } },
            { left: { label: 'Bel ogʻrigʻi' }, right: { label: 'notoʻgʻri va uzoq oʻtirish' } },
            { left: { label: 'Bilak va barmoq ogʻrigʻi' }, right: { label: 'sichqonchani takror bosish' } },
            { left: { label: 'Charchoq va stress' }, right: { label: 'tanaffussiz aqliy ish' } }
          ]
        }
      }
    },
    {
      id: 'i13q2',
      prompt: 'Sogʻliq muammosi yoki xavfsizlik muammosi?',
      hint: 'Tanaga asta-sekin taʼsir qiladimi yoki bir zumda baxtsiz hodisa boʻladimi?',
      explanation: 'Koʻz, bel, bilak — sogʻliq muammolari. Yongʻin, qoqilish, tok urishi — xavfsizlik muammolari.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 's', label: 'Sogʻliq' },
            { id: 'x', label: 'Xavfsizlik' }
          ],
          tiles: [
            { id: 't1', label: 'Koʻz charchashi', bin: 's' },
            { id: 't2', label: 'Yongʻin', bin: 'x' },
            { id: 't3', label: 'Bel ogʻrigʻi', bin: 's' },
            { id: 't4', label: 'Simga qoqilib ketish', bin: 'x' },
            { id: 't5', label: 'Bilak ogʻrigʻi', bin: 's' },
            { id: 't6', label: 'Tok urishi', bin: 'x' }
          ]
        }
      }
    },
    {
      id: 'i13q3',
      prompt: 'Toʻgʻri ish joyi uchun qoidalarni bosing.',
      hint: 'Sogʻliqni saqlaydigan odatlar.',
      explanation: 'Oyoqlar yerda, ekran qoʻl uzunligida, har soatda tanaffus — toʻgʻri. Ekranga yaqin oʻtirish va klaviatura yonida choy ichish — notoʻgʻri.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Oyoqlar yerda tekis turadi', match: true },
            { id: 'b', text: 'Ekran qoʻl uzunligi masofasida', match: true },
            { id: 'c', text: 'Har soatda turib yurish', match: true },
            { id: 'd', text: 'Ekranga yaqinroq oʻtirish', match: false },
            { id: 'e', text: 'Klaviatura yonida choy ichish', match: false }
          ]
        }
      }
    },
    {
      id: 'i13q4',
      prompt: 'Xavfni oldini olish usuli bilan juftlang.',
      hint: 'Har bir xavfga bitta chora.',
      explanation: 'Yongʻin — rozetkani ortiqcha yuklamaslik; qoqilish — simlarni mahkamlash; tok urishi — eskirgan simlarni almashtirish; qisqa tutashuv — kompyuter oldida ichmaslik.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Yongʻin' }, right: { label: 'rozetkaga koʻp qurilma ulamaslik' } },
            { left: { label: 'Qoqilib ketish' }, right: { label: 'simlarni kabel kanaliga yigʻish' } },
            { left: { label: 'Tok urishi' }, right: { label: 'eskirgan simlarni almashtirish' } },
            { left: { label: 'Qisqa tutashuv' }, right: { label: 'kompyuter oldida ichmaslik' } }
          ]
        }
      }
    },
    {
      id: 'i13q5',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Tanaffus nimaga yordam beradi?',
      explanation: 'Tanaffus qoʻl va koʻzni dam oldiradi; suyanchiqli stul belni himoya qiladi; oʻt oʻchirgich kompyuter xonasida kerak; ekran yorqinligini maksimal qilish koʻzni koʻproq charchatadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Muntazam tanaffus qoʻl va koʻz charchashini kamaytiradi.', value: true },
            { text: 'Suyanchiqsiz taburet bel uchun eng yaxshisi.', value: false },
            { text: 'Kompyuter xonasida oʻt oʻchirgich boʻlishi kerak.', value: true },
            { text: 'Ekran yorqinligi har doim maksimal boʻlsa, koʻz kam charchaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i13q6',
      prompt: 'Koʻzni dam oldirish qoidasi: har necha daqiqada uzoqqa qarash kerak?',
      hint: '20 — 20 — 6',
      explanation: 'Har 20 daqiqada 20 soniya davomida 6 metr uzoqqa qarang.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'daqiqa' } }
    },
    {
      id: 'i13q7',
      prompt: 'Qaysi biri sogʻliq muammosining oldini olmaydi?',
      hint: 'Uchtasi foydali odat.',
      explanation: 'Tanaffussiz ishlash charchoqni oshiradi. Qolganlari foydali.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Sozlanadigan stul' }, { text: 'Muntazam tanaffus' }, { text: 'Uzoqqa qarab dam olish' }, { text: 'Tanaffussiz 4 soat ishlash', odd: true }] } }
    },
    {
      id: 'i13q8',
      prompt: 'Kompyuterga choy toʻkildi. Toʻgʻri harakatlarni tartiblang.',
      hint: 'Avval xavfsizlik.',
      explanation: 'Avval tokni uzasiz, keyin qurilmani quriting, simlarni tekshirtirasiz va shundan keyingina yoqasiz.',
      widget: {
        type: 'step_order',
        props: { steps: ['Qurilmani tokdan uzish', 'Suyuqlikni artib, qurishini kutish', 'Simlar va qurilmani tekshirtirish', 'Shundan keyin yoqish'] }
      }
    },
    {
      id: 'i13q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Stul va simlar.',
      explanation: 'Bel ogʻrigʻining oldini olish uchun sozlanadigan stul, qoqilib ketmaslik uchun simlarni mahkamlash kerak.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Bel ogʻrimasligi uchun' }, { blank: 'sozlanadigan' }, { text: 'stul kerak. Qoqilib ketmaslik uchun' }, { blank: 'simlarni' }, { text: 'mahkamlang.' }],
          bank: ['sozlanadigan', 'simlarni', 'ekranni', 'qattiq']
        }
      }
    },
    {
      id: 'i13q10',
      prompt: 'Bitta rozetkaga juda koʻp qurilma ulansa, qanday xavf tugʻiladi? Bir soʻz bilan yozing.',
      hint: 'Olov bilan bogʻliq.',
      explanation: 'Ortiqcha yuklangan rozetka qizib, yongʻinga sabab boʻlishi mumkin.',
      widget: { type: 'text_answer', props: { answer: ['yongʻin', 'yong‘in', "yong'in"], width: 8 } }
    }
  ]
};
