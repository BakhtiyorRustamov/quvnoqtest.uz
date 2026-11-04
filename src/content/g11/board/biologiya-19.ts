import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 19-§ (107–112-betlar) — tabiiy va sunʼiy ekosistemalar, biomlar (tundra, tayga, keng bargli oʻrmon, dasht, sahro, tropik oʻrmon), chuchuk suv va dengiz ekosistemalari. */
export const BIO_19: BoardLesson = {
  n: 19,
  label: '19',
  group: BOB2,
  title: 'Tabiiy ekosistemalar',
  section: '19-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Muzloq tundradan tropik oʻrmongacha — Yer yuzida ekosistemalar juda xilma-xil. Kelib chiqishiga koʻra ular ikki xil: tabiiy — insonsiz shakllanadi: dengiz, koʻl, oʻrmon; sunʼiy — inson yaratadi va boshqaradi: dala, bogʻ, shahar, kosmik kema.",
      easy: "Tabiiy — insonsiz; sunʼiy — inson yaratgan.",
      draw: [
        { t: 'title', text: 'Ekosistemalar xillari' },
        { t: 'box', id: 't', x: 4, y: 24, w: 40, h: 8, text: 'tabiiy', color: 'green' },
        { t: 'box', id: 's', x: 54, y: 24, w: 40, h: 8, text: 'sunʼiy', color: 'orange' },
        { t: 'list', x: 4, y: 40, items: ['dengiz, koʻl', 'oʻrmon, choʻl'] },
        { t: 'list', x: 54, y: 40, items: ['dala, bogʻ', 'shahar, kosmik kema'] }
      ],
      next: 'Biomlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tabiiy ekosistemalar uch tip: quruqlik, chuchuk suv va dengiz. Quruqlik ekosistemalari joylashuvini harorat va yogʻin belgilaydi, cheklovchi omil — namlik. Bir xil iqlim mintaqasidagi ekosistemalar yigʻindisi — biom. Biomlar faqat quruqlikda: tundra, tayga, keng bargli oʻrmon, dasht, sahro, tropik oʻrmon.",
      easy: "Biom — bir xil iqlimdagi quruqlik ekosistemalari; asosiy omillar: harorat va yogʻin.",
      draw: [
        { t: 'title', text: 'Quruqlik biomlari' },
        { t: 'list', x: 4, y: 20, items: ['tundra', 'tayga (ignabargli oʻrmon)', 'keng bargli oʻrmon', 'dasht', 'sahro', 'tropik oʻrmon'] },
        { t: 'text', x: 56, y: 30, text: 'harorat + yogʻin', color: 'blue' },
        { t: 'text', x: 56, y: 40, text: 'cheklovchi — namlik', size: 's', color: 'red' }
      ],
      next: 'Sovuq biomlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tundra — oʻrtacha yillik harorat noldan past, yozda yer bir metrdan chuqur erimaydi. Daraxt yoʻq: lishayniklar, yoʻsinlar, past butalar; hayvonlar — shimol bugʻusi, shimol tulkisi, qutb boyqushi. Tayga — qishi uzoq va qorli; pixta, kedr, qaragʻay; los, qunduz, olmaxon, ayiq, silovsin. Keng bargli oʻrmon — eman, zarang, lipa; hayvonlar qishki uyqu va migratsiyaga moslashgan.",
      easy: "Tundra — daraxtsiz; tayga — ignabargli; keng bargli — eman, zarang.",
      draw: [
        { t: 'title', text: 'Sovuq va moʻtadil biomlar' },
        { t: 'table', x: 4, y: 20, rows: [['biom', 'oʻsimlik', 'hayvon'], ['tundra', 'lishaynik, yoʻsin', 'shimol bugʻusi'], ['tayga', 'kedr, qaragʻay', 'los, silovsin'], ['keng bargli', 'eman, zarang', 'ayiq, qizilishton']] }
      ],
      next: 'Issiq biomlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Dasht — asosan oʻtlar; bizon, saygʻoq, antilopa, sher, gepard. Sahro — juda quruq, kunduzi issiq, tunda sovuq; kserofitlar va efemerlar; qulon, jayron, sudralib yuruvchilar, koʻpchilik hayvonlar tunda faol. Tropik oʻrmon — yogʻin yiliga 2000–2500 millimetr, turlar eng koʻp: yaruslar zich, epifitlar va lianalar koʻp; maymunlar, toʻtilar, kolibrilar.",
      easy: "Dasht — oʻtlar; sahro — kserofit va tungi hayvonlar; tropik oʻrmon — eng boy.",
      draw: [
        { t: 'title', text: 'Issiq biomlar' },
        { t: 'table', x: 4, y: 20, rows: [['biom', 'xususiyati', 'misol'], ['dasht', 'oʻtlar', 'saygʻoq, bizon'], ['sahro', 'quruq, tunda sovuq', 'jayron, qulon'], ['tropik oʻrmon', '2000–2500 mm yogʻin', 'maymun, toʻti']] },
        { t: 'text', x: 4, y: 56, text: 'tropik oʻrmonda: epifitlar va lianalar', size: 's', color: 'green' }
      ],
      next: 'Suv ekosistemalari'
    },
    {
      kind: 'example',
      clear: true,
      say: "Chuchuk suv ekosistemalari kam joy egallasa ham juda muhim — barcha organizmlar uchun chuchuk suv manbayi. Ular uch xil: oqmaydigan — koʻl, hovuz; oqadigan — daryo, soy, buloq; va botqoqlar. Dengiz ekosistemalari Yer yuzining 70 foizini egallaydi, eng chuqur joylarda ham hayot bor. Ikkalasida ham plankton, nekton va bentos yashaydi.",
      easy: "Chuchuk suv: koʻl, daryo, botqoq; dengiz — Yer yuzining 70 %.",
      draw: [
        { t: 'title', text: 'Suv ekosistemalari' },
        { t: 'icon', x: 12, y: 30, emoji: '🏞️', size: 'm' },
        { t: 'icon', x: 12, y: 50, emoji: '🌊', size: 'm' },
        { t: 'text', x: 22, y: 32, text: 'chuchuk: koʻl, daryo, botqoq' },
        { t: 'text', x: 22, y: 52, text: 'dengiz: Yer yuzining 70 %' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ekosistemalar tabiiy (insonsiz shakllanadi) va sunʼiy (inson yaratgan) boʻladi; tabiiylari — quruqlik, chuchuk suv va dengiz.',
    'Biom — bir xil iqlimdagi quruqlik ekosistemalari: tundra, tayga, keng bargli oʻrmon, dasht, sahro, tropik oʻrmon; asosiy omillar — harorat va yogʻin.',
    'Chuchuk suvlar — oqmaydigan, oqadigan va botqoqlar; dengizlar Yer yuzining 70 % ini egallaydi.'
  ],
  questions: [
    {
      id: 'b19q1',
      prompt: 'Hayvonni u yashaydigan biom bilan juftlang.',
      hint: 'Shimol bugʻusi — eng sovuq joyda.',
      explanation: 'Shimol bugʻusi — tundra; silovsin — tayga; saygʻoq — dasht; jayron — sahro; toʻti — tropik oʻrmon.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'shimol bugʻusi', right: 'tundra' },
            { left: 'silovsin', right: 'tayga' },
            { left: 'saygʻoq', right: 'dasht' },
            { left: 'jayron', right: 'sahro' },
            { left: 'toʻti', right: 'tropik oʻrmon' }
          ]
        }
      }
    },
    {
      id: 'b19q2',
      prompt: 'Ekosistemani tabiiy va sunʼiyga ajrating.',
      hint: 'Inson yaratganmi?',
      explanation: 'Tabiiy: okean, koʻl, daryo, tropik oʻrmon. Sunʼiy: tomorqa, bogʻ, bugʻdoyzor.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 't', label: 'Tabiiy' },
            { id: 's', label: 'Sunʼiy' }
          ],
          items: [
            { emoji: '', label: 'okean', bin: 't' },
            { emoji: '', label: 'koʻl', bin: 't' },
            { emoji: '', label: 'tropik oʻrmon', bin: 't' },
            { emoji: '', label: 'tomorqa', bin: 's' },
            { emoji: '', label: 'bogʻ', bin: 's' },
            { emoji: '', label: 'bugʻdoyzor', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'b19q3',
      prompt: 'Quruqlik ekosistemalarida asosiy cheklovchi omil qaysi?',
      hint: 'Transpiratsiyaga koʻp suv ketadi.',
      explanation: 'Namlik.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['harorat', 'namlik', 'shamol', 'yorugʻlik'], answerIndex: 1 } }
    },
    {
      id: 'b19q4',
      prompt: 'Dengiz ekosistemalari Yer yuzining necha foizini egallaydi?',
      hint: 'Uchdan ikkisidan koʻp.',
      explanation: '70 %.',
      widget: { type: 'number_answer', props: { answer: 70, unit: '%' } }
    },
    {
      id: 'b19q5',
      prompt: 'Qaysi biomda turlar eng koʻp?',
      hint: 'Issiq va nam.',
      explanation: 'Tropik oʻrmon.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tundra', 'tayga', 'sahro', 'tropik oʻrmon'], answerIndex: 3 } }
    },
    {
      id: 'b19q6',
      prompt: 'Biomlarni sovugʻidan issigʻiga tartiblang.',
      hint: 'Shimoldan ekvatorga.',
      explanation: 'Tundra → tayga → keng bargli oʻrmon → tropik oʻrmon.',
      widget: { type: 'order_line', props: { items: [{ label: 'tundra' }, { label: 'tayga' }, { label: 'keng bargli oʻrmon' }, { label: 'tropik oʻrmon' }] } }
    },
    {
      id: 'b19q7',
      prompt: 'Chuchuk suv havzasini guruhiga ajrating.',
      hint: 'Daryo oqadi.',
      explanation: 'Oqmaydigan: koʻl, hovuz. Oqadigan: daryo, soy, buloq.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'o', label: 'Oqmaydigan' },
            { id: 'q', label: 'Oqadigan' }
          ],
          items: [
            { emoji: '', label: 'koʻl', bin: 'o' },
            { emoji: '', label: 'hovuz', bin: 'o' },
            { emoji: '', label: 'daryo', bin: 'q' },
            { emoji: '', label: 'soy', bin: 'q' },
            { emoji: '', label: 'buloq', bin: 'q' }
          ]
        }
      }
    },
    {
      id: 'b19q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Biomlar — quruqlikda.',
      explanation: 'Biomlar faqat quruqlikda; tundrada daraxt oʻsmaydi; tropik oʻrmonda epifitlar koʻp.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Biomlar faqat quruqlikda ajratiladi.', value: true },
            { text: 'Tropik oʻrmonlarda epifit va lianalar koʻp.', value: true },
            { text: 'Tundrada ignabargli daraxtlar hukmron.', value: false },
            { text: 'Sahro hayvonlarining koʻpchiligi kunduzi faol.', value: false }
          ]
        }
      }
    }
  ]
};
