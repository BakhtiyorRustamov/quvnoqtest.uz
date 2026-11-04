import type { BoardLesson } from './types';
import { seg, vec } from './phys';

export const BOB7 = { kicker: 'VII bob', title: 'Atom va yadro fizikasi' };

// sxematik sathlar (masshtabsiz)
const lvl = (E: number) => (E < -10 ? 62 : E < -3 ? 40 : 30);

/** Darslik: Fizika 11, 37-mavzu (151–155-betlar) — Tomson va Rezerford modellari, Balmer formulasi, Bor postulatlari, vodorod atomi. */
export const FIZ_39: BoardLesson = {
  n: 39,
  label: '37',
  group: BOB7,
  title: 'Atomning Bor modeli. Bor postulatlari',
  section: '37-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Neon reklamalar qizil, natriy chiroqlar sariq, simob chiroqlar havorang yonadi. Har bir gaz faqat oʻziga xos ranglarni — chiziqli spektrni chiqaradi, xuddi barmoq izi kabi. Nega atom istalgan rangni emas, faqat ma'lum ranglarni chiqaradi? Javobni 1913-yilda Nils Bor topdi.",
      easy: "Har bir gaz oʻz ranglarini chiqaradi — chiziqli spektr.",
      draw: [
        { t: 'title', text: 'Atomning barmoq izi' },
        { t: 'icon', x: 16, y: 34, emoji: '🌈', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚛️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['neon — qizil', 'natriy — sariq', 'har gaz — oʻz chiziqlari'] }
      ],
      next: 'Tomson va Rezerford'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1903-yilda Tomson atomni musbat zaryadli shar deb tasavvur qildi, elektronlar uning ichida tarvuz urugʻlari kabi joylashgan. 1911-yilda Rezerford alfa-zarralar tajribasiga asoslanib planetar modelni taklif qildi: markazda kichik musbat yadro, atrofida elektronlar aylanadi. Ammo klassik fizikaga koʻra aylanayotgan elektron nurlanib, energiyasini yoʻqotib, yadroga qulashi kerak edi, spektr esa tutash boʻlishi kerak edi.",
      easy: "Tomson — «tarvuz» (1903); Rezerford — planetar model (1911), lekin u turgʻunlikni tushuntira olmadi.",
      draw: [
        { t: 'title', text: 'Atom modellari' },
        { t: 'ellipse', cx: 22, cy: 42, rx: 12, ry: 12, color: 'red' },
        { t: 'text', x: 22, y: 44, text: '−   −   −', size: 's', anchor: 'middle', color: 'blue' },
        { t: 'text', x: 22, y: 58, text: 'Tomson, 1903', size: 's', anchor: 'middle' },
        { t: 'ellipse', cx: 62, cy: 42, rx: 14, ry: 8, color: 'blue' },
        { t: 'ellipse', cx: 62, cy: 42, rx: 1.5, ry: 1.5, color: 'red' },
        { t: 'text', x: 76, y: 38, text: 'e', size: 's', color: 'blue' },
        { t: 'text', x: 62, y: 58, text: 'Rezerford, 1911', size: 's', anchor: 'middle' },
        { t: 'text', x: 62, y: 65, text: 'elektron yadroga qulashi kerak?', size: 's', anchor: 'middle', color: 'red' }
      ],
      next: 'Balmer formulasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Vodorod spektridagi chiziqlar tasodifiy emas. 1885-yilda Balmer ularni formulaga keltirdi, keyin u umumlashtirildi: nu teng R karra, 1 boʻlinsin m kvadrat minus 1 boʻlinsin n kvadrat. Bu yerda R — Ridberg doimiysi, 3,29 karra 10 ning 15 darajasi gers, m va n — butun sonlar, n katta m dan. m teng 2 da koʻrinadigan Balmer seriyasi hosil boʻladi.",
      easy: "ν = R(1/m² − 1/n²), R = 3,29·10¹⁵ Hz.",
      draw: [
        { t: 'title', text: 'Balmer formulasi (1885)' },
        { t: 'formula', x: 6, y: 24, text: 'ν = R (1/m² − 1/n²)' },
        { t: 'list', x: 6, y: 38, items: ['R = 3,29 · 10¹⁵ Hz', 'n > m — butun sonlar', 'm = 2 — Balmer seriyasi (koʻrinadigan)', 'm = 1 — Layman (ultrabinafsha)'] }
      ],
      next: 'Bor postulatlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bor ikkita postulat ilgari surdi. Birinchi: atomda statsionar holatlar bor, ularda elektron nurlanmaydi; orbitalar shartga boʻysunadi — m v r teng n karra h chiziqcha. Ikkinchi: elektron bir statsionar holatdan boshqasiga oʻtgandagina bitta foton chiqaradi yoki yutadi: h nu teng E n minus E m.",
      easy: "1) statsionar orbitalarda nurlanish yoʻq: mvr = nħ. 2) hν = En − Em.",
      draw: [
        { t: 'title', text: 'Bor postulatlari (1913)' },
        { t: 'text', x: 6, y: 24, text: '1) statsionar holatlar — nurlanish yoʻq' },
        { t: 'formula', x: 10, y: 34, text: 'm v r = n ħ,   n = 1, 2, 3…' },
        { t: 'text', x: 6, y: 48, text: '2) oʻtishda bitta foton' },
        { t: 'formula', x: 10, y: 58, text: 'h ν = Eₙ − Eₘ' }
      ],
      next: 'Vodorod atomi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Vodorod atomida birinchi orbita radiusi 0,529 karra 10 ning minus 10 darajasi metr — Bor radiusi, radiuslar n kvadratga proporsional oshadi. Energiya E n teng minus 13,6 boʻlinsin n kvadrat elektronvolt. Asosiy holat minus 13,6 elektronvolt, shuning uchun ionlash energiyasi 13,6 elektronvolt. Yuqori sathdan birinchi sathga oʻtishlar — Layman, ikkinchiga — Balmer seriyasi.",
      easy: "Eₙ = −13,6/n² eV; rₙ = n²·0,529·10⁻¹⁰ m.",
      draw: [
        { t: 'title', text: 'Vodorod energiya sathlari' },
        ...seg('l1', 8, lvl(-13.6), 60, lvl(-13.6), 'ink'),
        ...seg('l2', 8, lvl(-3.4), 60, lvl(-3.4), 'ink'),
        ...seg('l3', 8, lvl(-1.51), 60, lvl(-1.51), 'ink'),
        ...seg('l0', 8, 20, 60, 20, 'ink', true),
        { t: 'text', x: 62, y: lvl(-13.6) + 1, text: 'n=1  −13,6 eV', size: 's' },
        { t: 'text', x: 62, y: lvl(-3.4) + 1, text: 'n=2  −3,4 eV', size: 's' },
        { t: 'text', x: 62, y: lvl(-1.51) + 1, text: 'n=3  −1,51 eV', size: 's' },
        { t: 'text', x: 62, y: 21, text: 'n=∞  0', size: 's' },
        ...vec('t1', 16, lvl(-3.4), 16, lvl(-13.6) - 1, 'purple'),
        ...vec('t2', 24, lvl(-1.51), 24, lvl(-13.6) - 1, 'purple'),
        ...vec('t3', 42, lvl(-1.51), 42, lvl(-3.4) - 0.5, 'red'),
        { t: 'text', x: 26, y: 52, text: 'Layman', size: 's', color: 'purple' },
        { t: 'text', x: 45, y: 36, text: 'Balmer', size: 's', color: 'red' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Elektron 3-sathdan 2-sathga va 2-sathdan 1-sathga oʻtganda chiqqan nurlar toʻlqin uzunliklari nisbatini topamiz. Toʻlqin uzunligi energiyaga teskari proporsional. 3 dan 2 ga: 1/4 minus 1/9 teng 5/36. 2 dan 1 ga: 1 minus 1/4 teng 3/4. Nisbat: 3/4 boʻlinsin 5/36 teng 27/5, yaʼni 5,4.",
      easy: "λ₃₂/λ₂₁ = (3/4)/(5/36) = 27/5 = 5,4.",
      draw: [
        { t: 'title', text: 'Toʻlqin uzunliklari nisbati' },
        { t: 'formula', x: 6, y: 22, text: '3→2: 1/4 − 1/9 = 5/36' },
        { t: 'formula', x: 6, y: 34, text: '2→1: 1 − 1/4 = 3/4' },
        { t: 'formula', x: 6, y: 50, text: 'λ₃₂ / λ₂₁ = (3/4) : (5/36) = 5,4' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Tomson modeli (1903) — «tarvuz»; Rezerford planetar modeli (1911) atom turgʻunligi va chiziqli spektrni tushuntira olmadi.',
    'Bor postulatlari: statsionar orbitalarda nurlanish yoʻq (mvr = nħ); oʻtishda bitta foton: hν = Eₙ − Eₘ.',
    'Vodorod: Eₙ = −13,6/n² eV, rₙ = n²·0,529·10⁻¹⁰ m; ν = R(1/m² − 1/n²), R = 3,29·10¹⁵ Hz.'
  ],
  questions: [
    {
      id: 'f39q1',
      prompt: 'Vodorod atomida n = 2 holatning energiyasi necha eV?',
      hint: 'Eₙ = −13,6/n².',
      explanation: '−13,6 / 4 = −3,4 eV.',
      widget: { type: 'number_answer', props: { answer: -3.4, tolerance: 0.01, unit: 'eV' } }
    },
    {
      id: 'f39q2',
      prompt: 'Elektron 3-sathdan 2-sathga oʻtdi. Chiqqan foton energiyasi necha eV? (0,01 gacha)',
      hint: 'E₃ − E₂.',
      explanation: '−1,51 − (−3,4) = 1,89 eV (qizil chiziq, 656 nm).',
      widget: { type: 'number_answer', props: { answer: 1.89, tolerance: 0.02, unit: 'eV' } }
    },
    {
      id: 'f39q3',
      prompt: 'Vodorodning 3-orbitasi radiusi necha ·10⁻¹⁰ m? (r₁ = 0,529·10⁻¹⁰ m, 0,01 gacha)',
      hint: 'rₙ = n² r₁.',
      explanation: '9 · 0,529 = 4,76·10⁻¹⁰ m.',
      widget: { type: 'number_answer', props: { answer: 4.76, tolerance: 0.02, unit: '·10⁻¹⁰ m' } }
    },
    {
      id: 'f39q4',
      prompt: 'Atom 656 nm toʻlqin uzunlikli yorugʻlik chiqardi. Energiyasi necha ·10⁻¹⁹ J kamaydi? (h = 6,6·10⁻³⁴)',
      hint: 'E = hc/λ.',
      explanation: '6,6·10⁻³⁴ · 3·10⁸ / 6,56·10⁻⁷ ≈ 3·10⁻¹⁹ J.',
      widget: { type: 'number_answer', props: { answer: 3, tolerance: 0.05, unit: '·10⁻¹⁹ J' } }
    },
    {
      id: 'f39q5',
      prompt: 'Vodorod atomini asosiy holatdan ionlash uchun qancha energiya kerak?',
      hint: 'E₁ = −13,6 eV dan 0 gacha.',
      explanation: '13,6 eV.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['3,4 eV', '10,2 eV', '13,6 eV', '1,51 eV'], answerIndex: 2 } }
    },
    {
      id: 'f39q6',
      prompt: 'Atom modellarini paydo boʻlish tartibida joylang.',
      hint: 'Qadimgi yunonlardan Borgacha.',
      explanation: 'Demokrit «atomos» → Tomson 1903 → Rezerford 1911 → Bor 1913.',
      widget: { type: 'order_line', props: { items: [{ label: 'Demokrit: «atomos»' }, { label: 'Tomson modeli' }, { label: 'Rezerford modeli' }, { label: 'Bor postulatlari' }] } }
    },
    {
      id: 'f39q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Ikkinchi postulat.',
      explanation: 'Elektron statsionar holatda nurlanmaydi; oʻtishda bitta foton chiqaradi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Statsionar orbitada elektron ' },
            { blank: 'nurlanmaydi' },
            { text: '. Yuqori sathdan pastki sathga oʻtganda bitta ' },
            { blank: 'foton' },
            { text: ' chiqaradi.' }
          ],
          bank: ['nurlanmaydi', 'foton', 'nurlanadi', 'proton']
        }
      }
    },
    {
      id: 'f39q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Energiya manfiy, n oshsa nolga yaqinlashadi.',
      explanation: 'Rezerford modeli turgʻunlikni tushuntira olmadi; n oshsa, radius n² marta oshadi; asosiy holat eng past energiyali.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Rezerford modeli atomning turgʻunligini tushuntira olmadi.', value: true },
            { text: 'Asosiy holat — eng kichik energiyali holat.', value: true },
            { text: 'Elektron istalgan radiusli orbitada aylana oladi.', value: false },
            { text: 'Statsionar orbitada aylanayotgan elektron uzluksiz nurlanadi.', value: false }
          ]
        }
      }
    }
  ]
};
