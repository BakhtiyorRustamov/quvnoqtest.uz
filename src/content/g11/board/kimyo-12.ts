import type { BoardLesson } from './types';
import { rect } from './phys';

export const BOB4 = { kicker: '4-bob', title: 'Eritma' };

/** Darslik: Umumiy kimyo 11, 12-mavzu (62–65-betlar) — eritma, erituvchi va erigan modda, gomogen sistema, eritma — aralashma va birikma oraligʻida. */
export const KIM_12: BoardLesson = {
  n: 12,
  label: '12',
  group: BOB4,
  title: 'Eritma haqida tushuncha',
  section: '12-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Har kuni ichadigan choyimiz — eritma: erituvchi suv, erigan modda esa choyga rang va taʼm beradigan moddalar. Dengiz suvi, qon, hatto vodoprovod suvi ham eritma. Tabiatda faqat distillangan suv kimyoviy jihatdan toza. Eritma nima va u oddiy aralashmadan nimasi bilan farq qiladi?",
      easy: "Choy, dengiz suvi, qon — eritmalar.",
      draw: [
        { t: 'title', text: 'Eritmalar atrofimizda' },
        { t: 'icon', x: 16, y: 34, emoji: '🍵', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🌊', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['choy', 'dengiz suvi, ichimlik suvi', 'qon, limfa'] }
      ],
      next: 'Uch probirka'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Uchta probirkadagi suvga shakar, osh tuzi va kaliy permanganat solamiz. Shakar erib, suv shirin boʻladi; tuzdan — shoʻr; permanganatdan — pushti rangga kiradi. Erituvchi molekulalari taʼsirida modda molekulalar yoki ionlargacha maydalanib, butun hajmda bir tekis tarqaladi. Sirt chegarasi yoʻqoladi — gomogen sistema hosil boʻladi.",
      easy: "Modda molekula yoki ionlargacha maydalanib, bir tekis tarqaladi — gomogen sistema.",
      draw: [
        { t: 'title', text: 'Uch probirka' },
        ...rect('t1', 10, 26, 10, 30, 'blue'),
        ...rect('t2', 40, 26, 10, 30, 'blue'),
        ...rect('t3', 70, 26, 10, 30, 'purple'),
        { t: 'text', x: 15, y: 62, text: 'shakar — shirin', size: 's', anchor: 'middle' },
        { t: 'text', x: 45, y: 62, text: 'NaCl — shoʻr', size: 's', anchor: 'middle' },
        { t: 'text', x: 75, y: 62, text: 'KMnO₄ — pushti', size: 's', anchor: 'middle', color: 'purple' }
      ],
      next: 'Eritma taʼrifi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eritma — erituvchi va erigan modda zarrachalarining oʻzaro taʼsiridan hosil boʻlgan gomogen sistema: butun hajmda fizik va kimyoviy xossalari bir xil. Osh tuzi suvda ionlarga ajraladi, ionlarni suv molekulalari oʻrab, gidratlangan ionlar hosil boʻladi. Erigan modda koʻpaysa, eritma zichligi ortadi, muzlash harorati pasayadi.",
      easy: "Eritma — gomogen sistema. Erigan modda koʻpaysa: zichlik ↑, muzlash harorati ↓.",
      draw: [
        { t: 'title', text: 'Eritma' },
        { t: 'formula', x: 4, y: 24, text: 'eritma = erituvchi + erigan modda' },
        { t: 'list', x: 4, y: 36, items: ['gomogen: hamma joyda tarkibi bir xil', 'gidratlangan ionlar', 'zichlik ↑, muzlash harorati ↓'] }
      ],
      next: 'Aralashma va birikma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eritma aralashma va kimyoviy birikma oraligʻida turadi. Aralashmaga oʻxshab bir necha moddadan iborat, tarkibi oʻzgaruvchan va fizik usulda — masalan bugʻlatib — ajratiladi. Birikmaga oʻxshab butun hajmda bir xil tarqalgan, hosil boʻlganda issiqlik ajraladi yoki yutiladi, hajm oʻzgaradi. Shuning uchun erish fizik-kimyoviy jarayon.",
      easy: "Eritma — aralashma va birikma oraligʻida; erish — fizik-kimyoviy jarayon.",
      draw: [
        { t: 'title', text: 'Aralashma, eritma, birikma' },
        { t: 'table', x: 4, y: 20, rows: [['', 'aralashma', 'eritma', 'birikma'], ['tarkibi', 'bir necha modda', 'bir necha modda', 'bitta modda'], ['tarqalishi', 'har xil', 'bir xil', 'bir xil'], ['ajratish', 'fizik', 'fizik', 'kimyoviy'], ['issiqlik', 'yoʻq', 'ajraladi / yutiladi', 'ajraladi / yutiladi']] }
      ],
      next: 'Ahamiyati'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eritmalar hayotda juda muhim. Ovqat hazm boʻlganda oziq moddalar fermentlar taʼsirida parchalanib eriydi va molekula holida qonga soʻriladi. Qon va limfa — suvli eritmalar. Koʻpchilik kimyoviy reaksiyalar eritmada boradi, chunki u yerda zarrachalar molekula yoki ionlargacha maydalangan va bir-biri bilan oson taʼsirlashadi.",
      easy: "Hazm, qon, kimyoviy reaksiyalar — eritmada.",
      draw: [
        { t: 'title', text: 'Eritmalar ahamiyati' },
        { t: 'icon', x: 12, y: 30, emoji: '🍽️', size: 'm' },
        { t: 'icon', x: 12, y: 44, emoji: '🩸', size: 'm' },
        { t: 'icon', x: 12, y: 58, emoji: '⚗️', size: 'm' },
        { t: 'list', x: 22, y: 26, items: ['ovqat hazm boʻlishi', 'qon va limfa — eritmalar', 'reaksiyalar eritmada tez boradi'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "180 gramm suvga 20 gramm osh tuzi eritildi. Eritma massasi qancha va unda tuz qancha ulushni tashkil etadi? Massa saqlanadi: eritma 180 qoʻshuv 20 — 200 gramm. Tuz ulushi: 20 boʻlinsin 200 — 0,1, yaʼni 10 foiz. Keyingi mavzularda bunday ulushlarni batafsil hisoblaymiz.",
      easy: "m(eritma) = 180 + 20 = 200 g; tuz ulushi 20/200 = 10 %.",
      draw: [
        { t: 'title', text: 'Eritma massasi' },
        { t: 'formula', x: 4, y: 24, text: 'm(eritma) = m(suv) + m(tuz)' },
        { t: 'formula', x: 4, y: 38, text: '180 + 20 = 200 g' },
        { t: 'formula', x: 4, y: 52, text: 'ω(tuz) = 20 / 200 = 10 %' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Eritma — erituvchi va erigan modda zarrachalarining oʻzaro taʼsiridan hosil boʻlgan gomogen sistema.',
    'Eritma aralashma va kimyoviy birikma oraligʻida turadi; erish — fizik-kimyoviy jarayon (issiqlik, hajm oʻzgarishi).',
    'Erigan modda koʻpaysa, zichlik ortadi, muzlash harorati pasayadi; m(eritma) = m(erituvchi) + m(erigan modda).'
  ],
  questions: [
    {
      id: 'k12q1',
      prompt: '250 g suvga 50 g shakar eritildi. Eritma massasi necha gramm?',
      hint: 'Massalar qoʻshiladi.',
      explanation: '250 + 50 = 300 g.',
      widget: { type: 'number_answer', props: { answer: 300, unit: 'g' } }
    },
    {
      id: 'k12q2',
      prompt: 'Eritma deb qanday sistemaga aytiladi?',
      hint: 'Butun hajmda xossalar bir xil.',
      explanation: 'Erituvchi va erigan modda zarrachalarining oʻzaro taʼsiridan hosil boʻlgan gomogen sistema.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['xossalari har xil gomogen sistema', 'xossalari bir xil geterogen sistema', 'xossalari bir xil gomogen sistema', 'xossalari har xil geterogen sistema'], answerIndex: 2 } }
    },
    {
      id: 'k12q3',
      prompt: 'Xossani mos turga ajrating.',
      hint: 'Eritmaning ikki tomoni bor.',
      explanation: 'Faqat aralashma: tarkibi har xil tarqalgan, issiqlik ajralmaydi. Eritmada ham: bir necha moddadan iborat, fizik usulda ajraladi, bir xil tarqalgan. Faqat birikma: bitta moddadan iborat.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'a', label: 'Aralashmaga xos' },
            { id: 'e', label: 'Eritmaga xos' },
            { id: 'b', label: 'Birikmaga xos' }
          ],
          items: [
            { emoji: '', label: 'har joyda tarkibi har xil', bin: 'a' },
            { emoji: '', label: 'hosil boʻlishida issiqlik ajralmaydi', bin: 'a' },
            { emoji: '', label: 'bir xil tarqalgan, fizik usulda ajraladi', bin: 'e' },
            { emoji: '', label: 'tarkibi oʻzgaruvchan, issiqlik yutiladi', bin: 'e' },
            { emoji: '', label: 'bitta moddadan iborat', bin: 'b' },
            { emoji: '', label: 'faqat kimyoviy yoʻl bilan ajraladi', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'k12q4',
      prompt: 'Qaysi biri eritma emas?',
      hint: 'Kimyoviy jihatdan toza modda.',
      explanation: 'Distillangan suv — toza modda; qolganlari eritmalar.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'choy' }, { text: 'dengiz suvi' }, { text: 'distillangan suv', odd: true }, { text: 'qon plazmasi' }] } }
    },
    {
      id: 'k12q5',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Erigan modda koʻpaysa.',
      explanation: 'Erigan modda miqdori ortsa, eritma zichligi ortadi, muzlash harorati pasayadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Erigan modda koʻpaysa, eritma zichligi ' },
            { blank: 'ortadi' },
            { text: ', muzlash harorati esa ' },
            { blank: 'pasayadi' },
            { text: '.' }
          ],
          bank: ['ortadi', 'pasayadi', 'oʻzgarmaydi']
        }
      }
    },
    {
      id: 'k12q6',
      prompt: 'Osh tuzi suvda eriganda nima hosil boʻladi?',
      hint: 'Ionlarni suv molekulalari oʻrab oladi.',
      explanation: 'Gidratlangan Na⁺ va Cl⁻ ionlari.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['NaCl molekulalari', 'gidratlangan Na⁺ va Cl⁻ ionlari', 'natriy va xlor atomlari', 'NaOH va HCl'], answerIndex: 1 } }
    },
    {
      id: 'k12q7',
      prompt: 'Eritmani toʻgʻri taʼriflaydigan gaplarni tanlang.',
      hint: 'Uchtasi toʻgʻri.',
      explanation: 'Eritma gomogen, tarkibi oʻzgaruvchan, bugʻlatib ajratiladi. Tarkibi doimiy va bitta moddadan iborat boʻlishi — birikmaga xos.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'gomogen sistema', correct: true },
            { label: 'tarkibi oʻzgaruvchan', correct: true },
            { label: 'bugʻlatib ajratish mumkin', correct: true },
            { label: 'tarkibi doimiy' },
            { label: 'bitta moddadan iborat' }
          ]
        }
      }
    },
    {
      id: 'k12q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Erish — fizik-kimyoviy jarayon.',
      explanation: 'Erish fizik-kimyoviy jarayon; ichimlik suvi — eritma; choyda erituvchi — suv.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Erish — fizik-kimyoviy jarayon.', value: true },
            { text: 'Vodoprovod suvi aslida eritma.', value: true },
            { text: 'Eritma hosil boʻlganda issiqlik hech qachon ajralmaydi va yutilmaydi.', value: false },
            { text: 'Choyda quruq choy barglari erigan modda hisoblanadi.', value: false }
          ]
        }
      }
    }
  ]
};
