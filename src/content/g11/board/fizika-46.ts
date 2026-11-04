import type { BoardLesson } from './types';
import { BOB7 } from './fizika-39';
import { rect, seg, vec } from './phys';

const block = (id: string, x: number, y: number, w: number, label: string, color: 'ink' | 'red' | 'blue' | 'green' | 'orange' | 'purple') => [
  ...rect(id, x, y, w, 9, color),
  { t: 'text' as const, x: x + w / 2, y: y + 6, text: label, anchor: 'middle' as const, size: 's' as const }
];

const node = (x: number, y: number) => ({ t: 'text' as const, x, y: y + 1, text: 'U', anchor: 'middle' as const, size: 's' as const, color: 'red' as const });

/** Darslik: Fizika 11, 44-mavzu (177–182-betlar) — ogʻir yadrolarning boʻlinishi, zanjir reaksiyasi, yadro reaktori, kritik massa, xavfsizlik. */
export const FIZ_46: BoardLesson = {
  n: 46,
  label: '44',
  group: BOB7,
  title: 'Atom energetikasining fizik asoslari',
  section: '44-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Bir kilogramm uran butunlay boʻlinsa, 2500 tonna toshkoʻmir yonganda chiqadigan energiya ajraladi. Bu — bir necha poyezd vagonlari koʻmir! Shuning uchun atom elektr stansiyalari kichik maydonda ulkan energiya ishlab chiqaradi. Dunyodagi birinchi AES 1954-yilda Obninsk shahrida ishga tushgan.",
      easy: "1 kg uran ≈ 2500 t koʻmir. Birinchi AES — 1954.",
      draw: [
        { t: 'title', text: '1 kg uran = 2500 t koʻmir' },
        { t: 'icon', x: 16, y: 34, emoji: '🏭', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚡', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['1 kg uran ≈ 8 · 10¹³ J', '≈ 1800 t benzin', 'birinchi AES — 1954'] }
      ],
      next: 'Uranning boʻlinishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ogʻir yadrolarning solishtirma bogʻlanish energiyasi oʻrta yadrolarnikidan taxminan 1 megaelektronvolt kichik. Demak, ogʻir yadro ikkiga boʻlinsa, har bir nuklonga 1 megaelektronvoltdan, jami 200 megaelektronvolt atrofida energiya ajraladi. 1938–1939-yillarda Gan va Strassman neytron yutgan uran yadrosi ikki boʻlakka boʻlinishini aniqlashdi. Bunda 2–3 ta yangi neytron ham uchib chiqadi.",
      easy: "²³⁵U + n → ¹⁴²Ba + ⁹¹Kr + 3n + ~200 MeV.",
      draw: [
        { t: 'title', text: 'Uran yadrosining boʻlinishi' },
        { t: 'formula', x: 4, y: 26, text: '²³⁵U + n → ¹⁴²Ba + ⁹¹Kr + 3n' },
        { t: 'list', x: 6, y: 40, items: ['har boʻlinishda ≈ 200 MeV', 'shundan ≈ 165 MeV — boʻlaklar kinetik energiyasi', 'Gan va Strassman, 1938–1939'] }
      ],
      next: 'Zanjir reaksiyasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Har bir boʻlinishda chiqqan 2–3 ta neytron boshqa uran yadrolarini boʻlishi mumkin, ular yana neytron chiqaradi — zanjir reaksiyasi. Uni neytronlarning koʻpayish koeffitsiyenti k tavsiflaydi: k — keyingi va oldingi bosqichdagi neytronlar soni nisbati. k kichik 1 boʻlsa, reaksiya soʻnadi; k teng 1 — barqaror, kritik rejim; k katta 1 — koʻchkisimon oʻsadi, portlash.",
      easy: "k < 1 — soʻnadi; k = 1 — barqaror; k > 1 — portlash.",
      draw: [
        { t: 'title', text: 'Zanjir reaksiyasi' },
        ...vec('n0', 4, 42, 11, 42, 'blue'),
        node(14, 42),
        ...seg('a1', 16, 42, 29, 28, 'blue'),
        ...seg('a2', 16, 42, 29, 42, 'blue'),
        ...seg('a3', 16, 42, 29, 56, 'blue'),
        node(32, 28), node(32, 42), node(32, 56),
        ...seg('b1', 34, 28, 45, 22, 'blue'),
        ...seg('b2', 34, 28, 45, 32, 'blue'),
        ...seg('b3', 34, 42, 45, 38, 'blue'),
        ...seg('b4', 34, 42, 45, 46, 'blue'),
        ...seg('b5', 34, 56, 45, 52, 'blue'),
        ...seg('b6', 34, 56, 45, 62, 'blue'),
        { t: 'formula', x: 54, y: 24, text: 'k = Nᵢ / Nᵢ₋₁' },
        { t: 'list', x: 54, y: 36, items: ['k < 1 — soʻnadi', 'k = 1 — kritik', 'k > 1 — portlash'] }
      ],
      next: 'Yadro reaktori'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yadro reaktori — zanjir reaksiyasini boshqaradigan qurilma. Birinchisi 1942-yilda Fermi rahbarligida Chikagoda qurilgan. Uran-235 ni sekin, issiq neytronlar yaxshi boʻladi, shuning uchun sekinlatkich — grafit yoki suv ishlatiladi. Bor yoki kadmiy tayoqchalari neytronlarni yutib, k ni 1 ga teng ushlab turadi. Issiqlik tashuvchi issiqlikni bugʻ generatoriga, bugʻ esa turbina va generatorni aylantiradi.",
      easy: "Yonilgʻi + sekinlatkich, boshqaruvchi tayoqchalar, issiqlik tashuvchi → turbina → generator.",
      draw: [
        { t: 'title', text: 'AES sxemasi' },
        ...block('core', 4, 30, 36, 'yonilgʻi, sekinlatkich', 'red'),
        ...block('rod', 4, 18, 36, 'bor/kadmiy tayoqchalar', 'ink'),
        ...block('steam', 44, 30, 12, 'bugʻ', 'blue'),
        ...block('turb', 60, 30, 16, 'turbina', 'green'),
        ...block('gen', 80, 30, 16, 'generator', 'orange'),
        ...vec('h1', 40, 34.5, 43, 34.5, 'red'),
        ...vec('h2', 56, 34.5, 59, 34.5, 'blue'),
        ...vec('h3', 76, 34.5, 79, 34.5, 'green'),
        { t: 'text', x: 4, y: 50, text: 'issiqlik tashuvchi: suv yoki suyuq natriy', size: 's' },
        { t: 'text', x: 4, y: 58, text: 'himoya: 1 m suv, 3 m gacha beton', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 66, text: 'Fermi, 1942 — birinchi reaktor', size: 's', color: 'red' }
      ],
      next: 'Kritik massa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Zanjir reaksiyasi borishi uchun yonilgʻi massasi yetarli boʻlishi kerak — aks holda neytronlar tashqariga qochib ketadi. Oʻz-oʻzidan zanjir reaksiyasi boshlanadigan eng kichik massa — kritik massa. Tabiiy uranda atigi 0,7 foiz uran-235 bor, qolgani uran-238; zanjir reaksiyasi faqat uran-235 da boradi. Shuning uchun tabiiy uran portlamaydi va yonilgʻi boyitiladi.",
      easy: "Kritik massa — zanjir reaksiyasi uchun eng kichik massa. Tabiiy uranda 0,7 % ²³⁵U.",
      draw: [
        { t: 'title', text: 'Kritik massa va boyitish' },
        { t: 'list', x: 6, y: 22, items: ['kritik massa — eng kichik massa', 'tabiiy uran: 99,3 % ²³⁸U, 0,7 % ²³⁵U', 'zanjir reaksiyasi — ²³⁵U da', 'reaktor yonilgʻisi: 5 % gacha boyitilgan'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "1 kilogramm uran-235 da 2,5 karra 10 ning 24 darajasi yadro bor. Har bir boʻlinishda 200 megaelektronvolt ajralsa, jami 5 karra 10 ning 26 darajasi megaelektronvolt. Joulga oʻtkazamiz: 1 megaelektronvolt teng 1,6 karra 10 ning minus 13 darajasi joul. Natija — 8 karra 10 ning 13 darajasi joul.",
      easy: "E = 200 MeV · 2,5·10²⁴ = 5·10²⁶ MeV = 8·10¹³ J.",
      draw: [
        { t: 'title', text: '1 kg uran energiyasi' },
        { t: 'list', x: 6, y: 20, items: ['N = 2,5 · 10²⁴ yadro', '1 MeV = 1,6 · 10⁻¹³ J'] },
        { t: 'formula', x: 6, y: 44, text: 'E = 200 MeV · 2,5 · 10²⁴ = 5 · 10²⁶ MeV' },
        { t: 'formula', x: 6, y: 56, text: 'E = 8 · 10¹³ J' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ogʻir yadro boʻlinganda ≈ 200 MeV energiya va 2–3 ta neytron ajraladi; neytronlar zanjir reaksiyasini davom ettiradi.',
    'Koʻpayish koeffitsiyenti k: k < 1 — soʻnadi, k = 1 — barqaror (reaktor), k > 1 — portlash; kritik massa — eng kichik massa.',
    'Reaktor: yonilgʻi va sekinlatkich, boshqaruvchi tayoqchalar (bor, kadmiy), issiqlik tashuvchi, himoya; birinchi reaktor 1942, birinchi AES 1954.'
  ],
  questions: [
    {
      id: 'f46q1',
      prompt: '²³⁵U + n → ¹⁴²Ba + ⁹¹Kr + x·n reaksiyasida nechta neytron chiqadi?',
      hint: 'Nuklonlar soni saqlanadi: 235 + 1 = 142 + 91 + x.',
      explanation: '236 − 233 = 3 ta neytron.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'ta' } }
    },
    {
      id: 'f46q2',
      prompt: 'Bitta boʻlinishda 200 MeV ajraladi. Bu necha ·10⁻¹¹ J? (1 MeV = 1,6·10⁻¹³ J)',
      hint: '200 · 1,6·10⁻¹³.',
      explanation: '3,2·10⁻¹¹ J.',
      widget: { type: 'number_answer', props: { answer: 3.2, tolerance: 0.01, unit: '·10⁻¹¹ J' } }
    },
    {
      id: 'f46q3',
      prompt: '1 g uran-235 toʻla boʻlinsa, necha ·10¹⁰ J energiya ajraladi? (1 kg da 8·10¹³ J)',
      hint: '1 g = 1 kg / 1000.',
      explanation: '8·10¹³ / 1000 = 8·10¹⁰ J.',
      widget: { type: 'number_answer', props: { answer: 8, tolerance: 0.01, unit: '·10¹⁰ J' } }
    },
    {
      id: 'f46q4',
      prompt: 'Reaktor barqaror ishlashi uchun koʻpayish koeffitsiyenti qanday boʻlishi kerak?',
      hint: 'Neytronlar soni oʻzgarmasin.',
      explanation: 'k = 1 — kritik rejim.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['k < 1', 'k = 1', 'k > 1', 'k = 0'], answerIndex: 1 } }
    },
    {
      id: 'f46q5',
      prompt: 'Nima uchun tabiiy uran atom yoqilgʻisi boʻla olmaydi va portlash xavfini tugʻdirmaydi?',
      hint: 'Izotop tarkibi.',
      explanation: 'Unda zanjir reaksiyasi boradigan ²³⁵U atigi 0,7 %.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Unda ²³⁵U atigi 0,7 %', 'U radioaktiv emas', 'Unda neytron yoʻq', 'U juda yengil'], answerIndex: 0 } }
    },
    {
      id: 'f46q6',
      prompt: 'Reaktor qismini vazifasi bilan juftlang.',
      hint: 'Tayoqchalar neytronlarni yutadi.',
      explanation: 'Sekinlatkich — neytronlarni sekinlatadi; tayoqchalar — neytronlarni yutadi; issiqlik tashuvchi — issiqlikni olib ketadi; beton — nurlanishdan himoya.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'sekinlatkich (grafit)', right: 'neytronlarni sekinlatadi' },
            { left: 'bor, kadmiy tayoqchalar', right: 'neytronlarni yutadi' },
            { left: 'issiqlik tashuvchi', right: 'issiqlikni olib ketadi' },
            { left: 'beton qatlam', right: 'nurlanishdan himoya' }
          ]
        }
      }
    },
    {
      id: 'f46q7',
      prompt: 'AES da energiya aylanishini tartiblang.',
      hint: 'Yadrodan elektrgacha.',
      explanation: 'Boʻlinish → issiqlik → bugʻ → turbina → generator.',
      widget: { type: 'step_order', props: { steps: ['Uran yadrolari boʻlinadi', 'Issiqlik tashuvchi isiydi', 'Suv bugʻga aylanadi', 'Bugʻ turbinani aylantiradi', 'Generator elektr ishlab chiqaradi'] } }
    },
    {
      id: 'f46q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tayoqchalar chiqarilsa k oshadi.',
      explanation: 'Tayoqchalar chiqarilsa k > 1; birinchi reaktorni Fermi qurgan; ²³⁵U ni sekin neytronlar yaxshi boʻladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Birinchi yadro reaktori 1942-yilda Fermi rahbarligida qurilgan.', value: true },
            { text: 'Boshqaruvchi tayoqchalar chiqarib olinsa, k > 1 boʻladi.', value: true },
            { text: 'Zanjir reaksiyasi tabiiy uranning asosiy izotopi ²³⁸U da boradi.', value: false },
            { text: 'Sekinlatkich neytronlarni yaxshi yutishi kerak.', value: false }
          ]
        }
      }
    }
  ]
};
