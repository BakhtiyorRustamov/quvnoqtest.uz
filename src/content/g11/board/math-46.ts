import type { BoardLesson } from './types';

/** Darslik (2-qism): 57–58-mavzu (27–29-betlar) — variantlarni sanash, qoʻshish va koʻpaytirish qoidalari. */
export const MATH_46: BoardLesson = {
  n: 46,
  label: '57',
  part: 'algebra',
  qism: 2,
  title: 'Kombinatorika: variantlarni sanash, qoʻshish va koʻpaytirish qoidalari',
  section: '57–58',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Madinada olma, nok va mandarin bor. U ularni har xil tartibda yemoqchi. Nechta usul bor? Kombinatorikaning asosiy savoli — qancha? Keling, birorta variantni ham tushirib qoldirmay, birorta ham takrorlamay sanashni oʻrganamiz.",
      easy: "Uchta mevani necha xil tartibda yeyish mumkin? Variantlarni tartib bilan sanaymiz.",
      draw: [
        { t: 'title', text: 'Qancha usul bor?' },
        { t: 'icon', x: 10, y: 22, emoji: '🍎', size: 'm' },
        { t: 'icon', x: 22, y: 22, emoji: '🍐', size: 'm' },
        { t: 'icon', x: 34, y: 22, emoji: '🍊', size: 'm' },
        { t: 'list', x: 50, y: 18, items: ['MNO, MON', 'NMO, NOM', 'OMN, ONM'] },
        { t: 'box', id: 'r', x: 50, y: 46, w: 34, h: 12, text: 'Jami 6 usul', color: 'green' }
      ],
      next: 'Qanday sanaymiz?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Variantlarni birma-bir sanashda ikki qoidaga amal qilamiz. Birinchi: har bir kombinatsiyani harflar yoki raqamlar bilan aniq belgilaymiz. Ikkinchi: ularni alifbo yoki oʻsish tartibida yozib chiqamiz. Masalan, raqamlari yigʻindisi 4 dan kichik toʻrt xonali sonlar: 1000, 1001, 1002, 1010 va hokazo — jami 15 ta.",
      easy: "Belgilaymiz va tartib bilan yozamiz — hech narsa tushib qolmaydi.",
      draw: [
        { t: 'title', text: 'Tartib bilan sanash' },
        { t: 'list', x: 6, y: 20, items: ['1) aniq belgilash', '2) alifbo / oʻsish tartibida yozish'] },
        { t: 'text', x: 6, y: 42, text: '1000, 1001, 1002, 1010, 1011, 1020, 1100,', size: 's' },
        { t: 'text', x: 6, y: 50, text: '1101, 1110, 1200, 2000, 2001, 2010, 2100, 3000', size: 's' },
        { t: 'box', id: 'r', x: 6, y: 56, w: 30, h: 10, text: '15 ta son', color: 'green' }
      ],
      next: 'Jadval bilan'
    },
    {
      kind: 'example',
      clear: true,
      say: "3-masala: birinchi raqami 2 boʻlgan va 1, 2, 3, 4, 5 raqamlaridan tuzilgan uch xonali sonlar nechta? Ikkinchi va uchinchi raqamni jadvalda koʻrsatamiz: satr — ikkinchi raqam, ustun — uchinchi. Jadvalda 5 ga 5, yaʼni 25 ta katak — 25 ta son.",
      easy: "Ikkinchi raqam 5 xil, uchinchisi ham 5 xil: 5 · 5 = 25.",
      draw: [
        { t: 'title', text: '2 _ _ sonlar' },
        {
          t: 'table',
          x: 8,
          y: 18,
          rows: [
            ['', '1', '2', '3', '4', '5'],
            ['1', '211', '212', '213', '214', '215'],
            ['2', '221', '222', '…', '…', '225'],
            ['5', '251', '252', '…', '…', '255']
          ]
        },
        { t: 'box', id: 'r', x: 8, y: 50, w: 36, h: 11, text: '5 · 5 = 25', color: 'green' }
      ],
      next: 'Qoʻshish qoidasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Qoʻshish qoidasi: A ni m usulda, B ni boshqa n usulda tanlash mumkin boʻlsa, A yoki B ni m plyus n usulda tanlash mumkin. Savatda 5 ta olma va 3 ta nok bor. Bitta mevani 5 plyus 3, yaʼni 8 usulda olish mumkin. «Yoki» soʻzi — qoʻshish.",
      easy: "«Yoki» boʻlsa — qoʻshamiz: 5 olma yoki 3 nok → 8 usul.",
      draw: [
        { t: 'title', text: 'Qoʻshish qoidasi' },
        { t: 'box', id: 'q', x: 8, y: 20, w: 60, h: 12, text: 'A yoki B: m + n usul', color: 'blue' },
        { t: 'icon', x: 10, y: 44, emoji: '🍎', size: 'l' },
        { t: 'text', x: 28, y: 50, text: '5 olma + 3 nok = 8 usul', color: 'green' }
      ],
      next: 'Koʻpaytirish qoidasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Koʻpaytirish qoidasi: A ni m usulda tanlab, keyin B ni n usulda tanlash mumkin boʻlsa, A va B ni m karra n usulda tanlash mumkin. Toqqa 7 ta yoʻl bor. Chiqish va tushish — 7 karra 7 teng 49 usul. Agar tushish boshqa yoʻldan boʻlsa — 7 karra 6 teng 42. «Va» soʻzi — koʻpaytirish.",
      easy: "«Va» boʻlsa — koʻpaytiramiz: chiqish 7 usul, tushish 7 usul → 49.",
      draw: [
        { t: 'title', text: 'Koʻpaytirish qoidasi' },
        { t: 'box', id: 'k', x: 8, y: 20, w: 60, h: 12, text: 'A va B: m · n usul', color: 'blue' },
        { t: 'icon', x: 10, y: 44, emoji: '⛰️', size: 'l' },
        { t: 'list', x: 28, y: 42, items: ['7 · 7 = 49', 'boshqa yoʻldan tushsa: 7 · 6 = 42'] }
      ],
      next: 'Murakkabroq misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "7-masala: doʻkonda 5 ta piyola, 3 ta likopcha, 4 ta choy qoshigʻi. Piyola va likopcha juftligi — 5 karra 3 teng 15. Uchligi — 15 karra 4 teng 60. Turli nomdagi ikkita buyum juftligi: 15 plyus 20 plyus 12 teng 47 — bu yerda ikkala qoida birga ishlaydi. Barcha raqamlari juft besh xonali sonlar: 4 karra 5 karra 5 karra 5 karra 5, yaʼni 2500 ta.",
      easy: "Juftlik 15, uchlik 60, turli juftliklar 47. Juft raqamli besh xonali sonlar 2500.",
      draw: [
        { t: 'title', text: 'Piyola, likopcha, qoshiq' },
        { t: 'list', x: 6, y: 20, items: ['piyola va likopcha: 5 · 3 = 15', 'uchala: 5 · 3 · 4 = 60', 'ikki xil buyum: 15 + 20 + 12 = 47'] },
        { t: 'text', x: 6, y: 52, text: 'juft raqamli besh xonali: 4·5·5·5·5 = 2500', size: 's', color: 'blue' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Variantlarni sanashda ularni aniq belgilab, tartib bilan yozib chiqamiz.',
    'Qoʻshish qoidasi («yoki»): m + n usul.',
    'Koʻpaytirish qoidasi («va»): m · n usul.'
  ],
  questions: [
    {
      id: 'p46q1',
      prompt: 'Voris, Doniyor, Olim, Kamola va Anoradan bir oʻgʻil va bir qiz tanlash kerak. Necha usulda?',
      hint: '3 oʻgʻil va 2 qiz.',
      explanation: '3 · 2 = 6 usul.',
      widget: { type: 'number_answer', props: { answer: 6 } }
    },
    {
      id: 'p46q2',
      prompt: 'Birinchi taomga 3 xil shoʻrva, ikkinchisiga 3 xil, uchinchisiga 2 xil ichimlik bor. Tushlikni necha usulda buyurish mumkin?',
      hint: 'Koʻpaytirish qoidasi.',
      explanation: '3 · 3 · 2 = 18.',
      widget: { type: 'number_answer', props: { answer: 18 } }
    },
    {
      id: 'p46q3',
      prompt: 'Javonda 9 ta matematika, 4 ta chet tili va 6 ta ona tili kitobi bor. Bitta kitobni necha usulda tanlash mumkin?',
      hint: 'Qoʻshish qoidasi.',
      explanation: '9 + 4 + 6 = 19.',
      widget: { type: 'number_answer', props: { answer: 19 } }
    },
    {
      id: 'p46q4',
      prompt: 'A dan B ga 6 ta, B dan C ga 4 ta, A dan D ga 2 ta, D dan B ga 2 ta yoʻl bor. A dan C ga necha usulda borish mumkin?',
      hint: 'A → B toʻgʻridan 6 yoki D orqali 2 · 2.',
      explanation: 'A → B: 6 + 4 = 10 usul; keyin B → C: 10 · 4 = 40.',
      widget: { type: 'number_answer', props: { answer: 40 } }
    },
    {
      id: 'p46q5',
      prompt: '7 xil pidjak, 5 xil shim va 4 xil galstukdan iborat toʻplamni necha usulda sotib olish mumkin?',
      hint: 'Uchalasi birga — koʻpaytirish.',
      explanation: '7 · 5 · 4 = 140.',
      widget: { type: 'number_answer', props: { answer: 140 } }
    },
    {
      id: 'p46q6',
      prompt: 'Masalalarni qoida boʻyicha ajrating.',
      hint: '«Yoki» — qoʻshish, «va» — koʻpaytirish.',
      explanation: 'Bitta buyum tanlash — qoʻshish; ketma-ket bir nechta tanlash — koʻpaytirish.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'q', label: 'Qoʻshish' },
            { id: 'k', label: 'Koʻpaytirish' }
          ],
          items: [
            { emoji: '', label: 'olma yoki nok tanlash', bin: 'q' },
            { emoji: '', label: 'bitta kitob tanlash', bin: 'q' },
            { emoji: '', label: 'avtobus yoki metroda borish', bin: 'q' },
            { emoji: '', label: 'konvert va marka olish', bin: 'k' },
            { emoji: '', label: 'shim va koʻylak tanlash', bin: 'k' },
            { emoji: '', label: 'chiqish va tushish yoʻli', bin: 'k' }
          ]
        }
      }
    },
    {
      id: 'p46q7',
      prompt: 'Barcha raqamlari toq boʻlgan ikki xonali sonlar nechta?',
      hint: 'Har bir raqam: 1, 3, 5, 7, 9.',
      explanation: '5 · 5 = 25.',
      widget: { type: 'number_answer', props: { answer: 25 } }
    },
    {
      id: 'p46q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Toqqa chiqish masalasini eslang.',
      explanation: 'Chiqish va tushish (bir xil yoʻl ham boʻladi) — 49; boshqa yoʻl — 42; qoʻshish — «yoki»; 5 ta olma va 3 ta nokdan bitta meva — 8 usul.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Toqqa 7 ta yoʻl boʻlsa, chiqib-tushish 49 usulda boʻladi.', value: true },
            { text: '5 ta olma va 3 ta nokdan bitta mevani 15 usulda tanlash mumkin.', value: false },
            { text: '«Yoki» bilan bogʻlangan tanlovda qoʻshish qoidasi ishlatiladi.', value: true },
            { text: 'Variantlarni tartibsiz yozish ham ishonchli usul.', value: false }
          ]
        }
      }
    }
  ]
};
