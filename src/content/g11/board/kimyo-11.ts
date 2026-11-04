import type { BoardLesson } from './types';
import type { DrawOp } from '@/lib/lab/plan';
import { BOB3 } from './kimyo-9';
import { block } from './chem';

/** pH scale: 15 cells 0…14 coloured from acidic to basic. */
const phScale = (x0: number, y: number): DrawOp[] =>
  Array.from({ length: 15 }, (_, i) => block(`ph${i}`, x0 + i * 6, y, 6, String(i), i < 4 ? 'red' : i < 7 ? 'orange' : i === 7 ? 'green' : i < 11 ? 'blue' : 'purple', 7)).flat();

/** Darslik: Umumiy kimyo 11, 11-mavzu (58–61-betlar) — tuzlar gidrolizi turlari, eritma muhiti, gidrolizga taʼsir etuvchi omillar, pH, indikatorlar. */
export const KIM_11: BoardLesson = {
  n: 11,
  label: '11',
  group: BOB3,
  title: 'Tuzlarning gidrolizi va eritma muhiti',
  section: '11-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ichimlik sodasi eritmasi qoʻlda sovundek siljiydi, ammoniy xlorid eritmasi esa nordon. Ikkalasi ham tuz, lekin eritmalari turli muhitga ega. Sababi — tuz ionlari suv bilan taʼsirlashadi. Bu jarayon gidroliz deyiladi: yunoncha «gidro» — suv, «lizis» — ajralish.",
      easy: "Tuz eritmalari kislotali, ishqoriy yoki neytral boʻlishi mumkin — gidroliz sababli.",
      draw: [
        { t: 'title', text: 'Tuz eritmasining muhiti' },
        { t: 'icon', x: 16, y: 34, emoji: '🧼', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🧪', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['soda eritmasi — ishqoriy', 'NH₄Cl eritmasi — kislotali', 'NaCl eritmasi — neytral'] }
      ],
      next: 'Gidroliz nima?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gidroliz — tuz ionlarining suv bilan taʼsirlashib, kuchsiz elektrolit hosil qilishi. Kuchli kislota va kuchsiz asos tuzi kation boʻyicha gidrolizlanadi: ammoniy ioni suv bilan NH4OH va vodorod ion beradi — muhit kislotali. Kuchli asos va kuchsiz kislota tuzi anion boʻyicha: atsetat ion suv bilan sirka kislota va gidroksid ion beradi — muhit ishqoriy.",
      easy: "Kation boʻyicha (NH₄Cl) — kislotali; anion boʻyicha (CH₃COONa) — ishqoriy.",
      draw: [
        { t: 'title', text: 'Kation va anion boʻyicha gidroliz' },
        { t: 'formula', x: 4, y: 24, text: 'NH₄⁺ + H₂O ⇄ NH₄OH + H⁺' },
        { t: 'text', x: 70, y: 24, text: 'kislotali', size: 's', color: 'red' },
        { t: 'formula', x: 4, y: 40, text: 'CH₃COO⁻ + H₂O ⇄ CH₃COOH + OH⁻' },
        { t: 'text', x: 80, y: 48, text: 'ishqoriy', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 60, text: 'kuchsiz qism suv bilan taʼsirlashadi', size: 's', color: 'purple' }
      ],
      next: 'Toʻrt holat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kuchsiz asos va kuchsiz kislota tuzi ham kation, ham anion boʻyicha gidrolizlanadi, masalan ammoniy atsetat; muhit neytralga yaqin. Kuchli asos va kuchli kislota tuzi — NaCl, KNO3, Na2SO4 — gidrolizga uchramaydi, muhit neytral. Erimaydigan tuzlar, masalan CaCO3, ham gidrolizlanmaydi.",
      easy: "Ikkalasi kuchsiz — ikkala ion boʻyicha; ikkalasi kuchli — gidroliz yoʻq (neytral).",
      draw: [
        { t: 'title', text: 'Tuz turi va muhit' },
        { t: 'table', x: 4, y: 20, rows: [['tuz', 'gidroliz', 'muhit'], ['kuchli kislota + kuchsiz asos', 'kation', 'kislotali'], ['kuchsiz kislota + kuchli asos', 'anion', 'ishqoriy'], ['kuchsiz + kuchsiz', 'ikkalasi', '≈ neytral'], ['kuchli + kuchli', 'yoʻq', 'neytral']] }
      ],
      next: 'Omillar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gidroliz haroratga, konsentratsiyaga va muhitga bogʻliq. Harorat koʻtarilsa, gidroliz tezlashadi — shuning uchun oziq-ovqat muzlatkichda saqlanadi. Suv qoʻshib suyultirilsa ham tezlashadi, bugʻlatilsa sekinlashadi. Eritma muhitiga teskari muhit beruvchi modda qoʻshilsa tezlashadi, mos modda qoʻshilsa sekinlashadi: natriy atsetat gidrolizini ishqor sekinlatadi.",
      easy: "Tezlashtiradi: isitish, suyultirish, teskari muhit. Sekinlatadi: sovitish, bugʻlatish, mos muhit.",
      draw: [
        { t: 'title', text: 'Gidrolizga taʼsir etuvchi omillar' },
        { t: 'table', x: 4, y: 20, rows: [['omil', 'tezlashtiradi', 'sekinlatadi'], ['harorat', 'isitish', 'sovitish'], ['konsentratsiya', 'suv qoʻshish', 'bugʻlatish'], ['muhit', 'teskari muhit', 'mos muhit']] }
      ],
      next: 'pH koʻrsatkich'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eritma muhitini pH koʻrsatkichi ifodalaydi. pH 7 — neytral, 7 dan kichik — kislotali, 7 dan katta — ishqoriy. Organizmda qonning pH i 7,4, ovqat hazm boʻlayotgan oshqozonda 1,5–2. Indikatorlar muhitni rang bilan koʻrsatadi: natriy karbonat eritmasida lakmus koʻkaradi, fenolftalein toʻq qizil, metil zargʻaldogʻi sariq boʻladi.",
      easy: "pH < 7 kislotali, = 7 neytral, > 7 ishqoriy. Qon 7,4; oshqozon 1,5–2.",
      draw: [
        { t: 'title', text: 'pH shkalasi' },
        ...phScale(5, 22),
        { t: 'text', x: 14, y: 38, text: 'kislotali', size: 's', anchor: 'middle', color: 'red' },
        { t: 'text', x: 50, y: 38, text: 'neytral', size: 's', anchor: 'middle', color: 'green' },
        { t: 'text', x: 84, y: 38, text: 'ishqoriy', size: 's', anchor: 'middle', color: 'purple' },
        { t: 'table', x: 4, y: 44, rows: [['Na₂CO₃ eritmasida', 'rang'], ['lakmus', 'koʻk'], ['fenolftalein', 'toʻq qizil'], ['metil zargʻaldogʻi', 'sariq']] },
        { t: 'list', x: 60, y: 50, items: ['qon — 7,4', 'oshqozon — 1,5–2'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Natriy karbonat eritmasida muhit qanday? Na2CO3 — kuchli asos NaOH va kuchsiz kislota H2CO3 tuzi. Demak, anion boʻyicha gidrolizlanadi: karbonat ion suv bilan gidrokarbonat va gidroksid ion beradi. Gidroksid ionlar koʻpayadi — muhit ishqoriy, pH 7 dan katta, fenolftalein toʻq qizilga boʻyaladi.",
      easy: "Na₂CO₃: CO₃²⁻ + H₂O ⇄ HCO₃⁻ + OH⁻ → ishqoriy, pH > 7.",
      draw: [
        { t: 'title', text: 'Soda eritmasi muhiti' },
        { t: 'list', x: 4, y: 20, items: ['NaOH — kuchli asos', 'H₂CO₃ — kuchsiz kislota'] },
        { t: 'formula', x: 4, y: 44, text: 'CO₃²⁻ + H₂O ⇄ HCO₃⁻ + OH⁻' },
        { t: 'text', x: 4, y: 58, text: 'OH⁻ koʻp → ishqoriy, pH > 7', color: 'blue' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Gidroliz — tuz ionlarining suv bilan taʼsirlashib kuchsiz elektrolit hosil qilishi.',
    'Kation boʻyicha (NH₄Cl, ZnCl₂) — kislotali muhit; anion boʻyicha (CH₃COONa, Na₂CO₃) — ishqoriy; kuchli kislota + kuchli asos tuzi gidrolizlanmaydi.',
    'Isitish va suyultirish gidrolizni tezlashtiradi; pH < 7 kislotali, 7 neytral, > 7 ishqoriy.'
  ],
  questions: [
    {
      id: 'k11q1',
      prompt: 'Tuzlarni eritma muhitiga qarab ajrating.',
      hint: 'Qaysi qism kuchsiz?',
      explanation: 'Kislotali: NH₄Cl, ZnSO₄, Al(NO₃)₃. Neytral: NaCl, KNO₃. Ishqoriy: Na₂CO₃, CH₃COONa.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'a', label: 'Kislotali' },
            { id: 'n', label: 'Neytral' },
            { id: 'b', label: 'Ishqoriy' }
          ],
          items: [
            { emoji: '', label: 'NH₄Cl', bin: 'a' },
            { emoji: '', label: 'ZnSO₄', bin: 'a' },
            { emoji: '', label: 'Al(NO₃)₃', bin: 'a' },
            { emoji: '', label: 'NaCl', bin: 'n' },
            { emoji: '', label: 'KNO₃', bin: 'n' },
            { emoji: '', label: 'Na₂CO₃', bin: 'b' },
            { emoji: '', label: 'CH₃COONa', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'k11q2',
      prompt: 'Qaysi juftlikdagi tuzlar faqat kation boʻyicha gidrolizlanadi?',
      hint: 'Kuchli kislota + kuchsiz asos.',
      explanation: 'Ammoniy xlorid va rux nitrat — kuchli kislota va kuchsiz asos tuzlari.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kalsiy karbonat, magniy xlorid', 'natriy atsetat, alyuminiy xlorid', 'ammoniy xlorid, rux nitrat', 'bariy nitrat, kaliy sulfat'], answerIndex: 2 } }
    },
    {
      id: 'k11q3',
      prompt: 'Gidrolizga uchramaydigan tuzlarni tanlang.',
      hint: 'Kuchli kislota + kuchli asos.',
      explanation: 'NaNO₃, NaCl, Na₂SO₄ — gidrolizlanmaydi; K₂CO₃ va ZnCl₂ — gidrolizlanadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'NaNO₃', correct: true },
            { label: 'NaCl', correct: true },
            { label: 'Na₂SO₄', correct: true },
            { label: 'K₂CO₃' },
            { label: 'ZnCl₂' }
          ]
        }
      }
    },
    {
      id: 'k11q4',
      prompt: 'Suyuqliklarni pH ortib borish tartibida joylang.',
      hint: 'Oshqozon shirasi eng kislotali.',
      explanation: 'Oshqozon shirasi (1,5–2) < sirka (~3) < toza suv (7) < qon (7,4) < sovun eritmasi (~10).',
      widget: { type: 'order_line', props: { items: [{ label: 'oshqozon shirasi' }, { label: 'sirka' }, { label: 'toza suv' }, { label: 'qon' }, { label: 'sovun eritmasi' }] } }
    },
    {
      id: 'k11q5',
      prompt: 'Natriy karbonat eritmasida indikator rangini juftlang.',
      hint: 'Muhit ishqoriy.',
      explanation: 'Lakmus — koʻk, fenolftalein — toʻq qizil, metil zargʻaldogʻi — sariq.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'lakmus', right: 'koʻk' },
            { left: 'fenolftalein', right: 'toʻq qizil' },
            { left: 'metil zargʻaldogʻi', right: 'sariq' }
          ]
        }
      }
    },
    {
      id: 'k11q6',
      prompt: 'Natriy atsetat gidrolizini sekinlashtirish uchun eritmaga nima qoʻshish kerak?',
      hint: 'Eritma ishqoriy — mos muhit qoʻshing.',
      explanation: 'Bir-ikki tomchi ishqor (NaOH) — muhitga mos modda gidrolizni sekinlatadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['suv', 'sirka kislota', 'NaOH eritmasi', 'CuCl₂ eritmasi'], answerIndex: 2 } }
    },
    {
      id: 'k11q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Harorat va saqlash.',
      explanation: 'Harorat koʻtarilsa gidroliz tezlashadi, shuning uchun oziq-ovqat muzlatkichda saqlanadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Harorat koʻtarilsa gidroliz ' },
            { blank: 'tezlashadi' },
            { text: ', shuning uchun oziq-ovqatlar ' },
            { blank: 'muzlatkichda' },
            { text: ' saqlanadi.' }
          ],
          bank: ['tezlashadi', 'muzlatkichda', 'sekinlashadi', 'quyoshda']
        }
      }
    },
    {
      id: 'k11q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'NH₄Cl — kation boʻyicha.',
      explanation: 'NH₄Cl eritmasi kislotali; suyultirish gidrolizni tezlashtiradi; CaCO₃ choʻkma — gidrolizlanmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'NH₄Cl eritmasida muhit kislotali.', value: true },
            { text: 'Eritmaga suv qoʻshilsa gidroliz tezlashadi.', value: true },
            { text: 'KNO₃ eritmasida fenolftalein toʻq qizilga boʻyaladi.', value: false },
            { text: 'Qonning pH qiymati 1,5–2 ga teng.', value: false }
          ]
        }
      }
    }
  ]
};
