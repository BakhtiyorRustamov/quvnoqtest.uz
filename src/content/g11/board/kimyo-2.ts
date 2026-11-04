import type { BoardLesson } from './types';
import { BOB1 } from './kimyo-1';
import { block } from './chem';

/** Darslik: Umumiy kimyo 11, 2-mavzu (11–16-betlar) — davriy qonun, davriy sistema tuzilishi, oksid va vodorodli birikmalar shakllari. */
export const KIM_2: BoardLesson = {
  n: 2,
  label: '2',
  group: BOB1,
  title: 'Davriy qonun. Mendeleyevning davriy sistemasi',
  section: '2-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1869-yilda maʼlum boʻlgan atigi 63 ta elementni Mendeleyev kartochkalarga yozib, xuddi pasyans kabi qatorlarga terib chiqdi. U hatto hali topilmagan elementlar uchun boʻsh joy qoldirdi va ularning xossalarini oldindan aytdi. Keyin bu elementlar topilganda, bashorat toʻgʻri chiqdi!",
      easy: "Mendeleyev 63 elementni tartibga solib, yangi elementlarni oldindan aytdi.",
      draw: [
        { t: 'title', text: 'Mendeleyev pasyansi' },
        { t: 'icon', x: 16, y: 34, emoji: '🃏', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🔮', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['1869-yil, 63 element', 'boʻsh kataklar qoldirildi', 'bashorat tasdiqlandi'] }
      ],
      next: 'Davriy qonun'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Mendeleyev qonuni: oddiy moddalar va birikmalar xossalari elementlarning atom massalariga davriy bogʻliq. Hozir bilamizki, asosiysi — yadro zaryadi. Shuning uchun zamonaviy taʼrif: elementlar va ularning birikmalari xossalari yadro zaryadiga davriy bogʻliq. Litiydan ftorga tomon metallik xossa susayadi, metallmaslik kuchayadi; natriydan boshlab xossalar takrorlanadi.",
      easy: "Xossalar yadro zaryadiga davriy bogʻliq; davrda metallik susayadi.",
      draw: [
        { t: 'title', text: 'Davriy qonun' },
        ...block('li', 4, 24, 12, 'Li', 'red'),
        ...block('be', 17, 24, 12, 'Be', 'red'),
        ...block('b', 30, 24, 12, 'B', 'ink'),
        ...block('c', 43, 24, 12, 'C', 'ink'),
        ...block('n', 56, 24, 12, 'N', 'blue'),
        ...block('o', 69, 24, 12, 'O', 'blue'),
        ...block('f', 82, 24, 12, 'F', 'blue'),
        { t: 'text', x: 4, y: 44, text: 'metallik xossa susayadi →', size: 's', color: 'red' },
        { t: 'text', x: 56, y: 44, text: 'metallmaslik kuchayadi →', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 58, text: 'xossalar yadro zaryadiga davriy bogʻliq', color: 'purple' }
      ],
      next: 'Sistema tuzilishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Davriy sistemada 7 ta davr bor: I, II, III — kichik, qolganlari katta davrlar. Ularda 2, 8, 8, 18, 18, 32 va 32 tadan element. Birinchisidan boshqa har bir davr ishqoriy metall bilan boshlanib, nodir gaz bilan tugaydi. Vertikal boʻyicha 8 ta guruh, har biri bosh va yonaki guruhchalarga boʻlinadi. Odatda eng yuqori oksidlanish darajasi guruh raqamiga teng. Lantanoidlar va aktinoidlar alohida qatorlarda.",
      easy: "7 davr (2, 8, 8, 18, 18, 32, 32), 8 guruh; bosh va yonaki guruhchalar.",
      draw: [
        { t: 'title', text: 'Davrlar va guruhlar' },
        { t: 'table', x: 4, y: 20, rows: [['davr', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'], ['elementlar', '2', '8', '8', '18', '18', '32', '32']] },
        { t: 'list', x: 4, y: 42, items: ['8 guruh: bosh (A) va yonaki (B)', 'yuqori oksidlanish darajasi = guruh raqami', 'lantanoidlar 58–71, aktinoidlar 90–103'] }
      ],
      next: 'Birikmalar shakli'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Guruhda yuqori oksidlar umumiy formulasi takrorlanadi: R2O, RO, R2O3, RO2, R2O5, RO3, R2O7, RO4. IV guruhdan boshlab bosh guruhcha elementlari uchuvchan vodorodli birikmalar hosil qiladi: RH4, RH3, H2R, HR. Oksiddagi va vodorodli birikmadagi valentliklar yigʻindisi 8 ga teng — masalan, azot: N2O5 va NH3.",
      easy: "Oksidlar: R₂O … RO₄. Vodorodli: RH₄, RH₃, H₂R, HR. Valentliklar yigʻindisi 8.",
      draw: [
        { t: 'title', text: 'Oksid va vodorodli birikmalar' },
        { t: 'table', x: 4, y: 20, rows: [['guruh', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'], ['oksid', 'R₂O', 'RO', 'R₂O₃', 'RO₂', 'R₂O₅', 'RO₃', 'R₂O₇'], ['vodorodli', '—', '—', '—', 'RH₄', 'RH₃', 'H₂R', 'HR']] },
        { t: 'formula', x: 4, y: 52, text: 'N₂O₅ (V) + NH₃ (III):  5 + 3 = 8' }
      ],
      next: 'Bashoratlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Mendeleyev boʻsh kataklardagi uch element xossalarini batafsil bashorat qildi: ekabor, ekaalyuminiy va ekasilitsiy. Galliy 1875-yilda, skandiy 1879-yilda, germaniy 1886-yilda topildi va xossalari bashoratga mos keldi. Davrda chapdan oʻngga atom radiusi kamayadi, guruhda yuqoridan pastga ortadi.",
      easy: "Ekaalyuminiy = Ga, ekabor = Sc, ekasilitsiy = Ge. Radius: davrda kamayadi, guruhda ortadi.",
      draw: [
        { t: 'title', text: 'Bashorat qilingan elementlar' },
        { t: 'table', x: 4, y: 20, rows: [['bashorat', 'element', 'yil'], ['ekaalyuminiy', 'galliy Ga', '1875'], ['ekabor', 'skandiy Sc', '1879'], ['ekasilitsiy', 'germaniy Ge', '1886']] },
        { t: 'list', x: 62, y: 24, items: ['radius:', 'davrda → kamayadi', 'guruhda ↓ ortadi'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tartib raqami 40 boʻlgan element qaysi davr va guruhda? Davrlardagi elementlar: 2, 8, 8 — uchinchi davr 18 bilan tugaydi; toʻrtinchi davr 18 element — 36 bilan tugaydi. 40 — beshinchi davrda, undagi toʻrtinchi element. Demak, IV guruhning yonaki guruhchasi — sirkoniy Zr.",
      easy: "40 − 36 = 4 → 5-davr, IV guruh (yonaki) — sirkoniy.",
      draw: [
        { t: 'title', text: '40-element qayerda?' },
        { t: 'formula', x: 4, y: 24, text: '2 + 8 + 8 + 18 = 36' },
        { t: 'formula', x: 4, y: 38, text: '40 − 36 = 4 → 5-davr, 4-oʻrin' },
        { t: 'text', x: 4, y: 54, text: 'IV B guruh — sirkoniy Zr', color: 'red' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Davriy qonun: elementlar va birikmalar xossalari yadro zaryadiga davriy bogʻliq (Mendeleyev, 1869).',
    '7 davr (2, 8, 8, 18, 18, 32, 32 element) va 8 guruh; eng yuqori oksidlanish darajasi odatda guruh raqamiga teng.',
    'Oksidlar R₂O … RO₄, vodorodli birikmalar RH₄ … HR; davrda radius kamayadi, guruhda ortadi.'
  ],
  questions: [
    {
      id: 'k2q1',
      prompt: 'Tartib raqami 20 boʻlgan element (Ca) da p-elektronlar sonining s-elektronlar soniga nisbati qancha?',
      hint: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s².',
      explanation: 'p: 6 + 6 = 12; s: 2·4 = 8; 12 : 8 = 1,5.',
      widget: { type: 'number_answer', props: { answer: 1.5, tolerance: 0.01 } }
    },
    {
      id: 'k2q2',
      prompt: 'Toʻrtinchi davrda nechta element bor?',
      hint: 'Katta davr.',
      explanation: '18 ta (K dan Kr gacha).',
      widget: { type: 'number_answer', props: { answer: 18 } }
    },
    {
      id: 'k2q3',
      prompt: 'Yuqori oksidi EO₃ boʻlgan elementning vodorodli birikmasi formulasi qanday?',
      hint: '6 + x = 8.',
      explanation: 'Oksidda VI valentli → vodorodli birikmada II valentli: H₂E.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['EH₄', 'EH₃', 'H₂E', 'HE'], answerIndex: 2 } }
    },
    {
      id: 'k2q4',
      prompt: 'Yuqori oksidi E₂O₅ boʻlgan elementning vodorodli birikmasi formulasi qanday?',
      hint: '5 + x = 8.',
      explanation: 'V valentli → vodorodli birikmada III: EH₃ (masalan NH₃, PH₃).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['EH₃', 'EH₄', 'EH', 'H₂E'], answerIndex: 0 } }
    },
    {
      id: 'k2q5',
      prompt: 'Elementlarni atom radiusi kamayib borish tartibida joylang.',
      hint: 'Davrda chapdan oʻngga radius kamayadi.',
      explanation: 'Mg > Al > Si > P.',
      widget: { type: 'order_line', props: { items: [{ label: 'Mg' }, { label: 'Al' }, { label: 'Si' }, { label: 'P' }] } }
    },
    {
      id: 'k2q6',
      prompt: 'Mendeleyev bashorat qilgan nomni elementi bilan juftlang.',
      hint: 'Ekasilitsiy — kremniy ostida.',
      explanation: 'Ekaalyuminiy — galliy, ekabor — skandiy, ekasilitsiy — germaniy.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'ekaalyuminiy', right: 'galliy' },
            { left: 'ekabor', right: 'skandiy' },
            { left: 'ekasilitsiy', right: 'germaniy' }
          ]
        }
      }
    },
    {
      id: 'k2q7',
      prompt: 'II A guruhda tartib raqami ortishi bilan: 1) tashqi qavat elektronlari, 2) qavatlar soni, 3) atom radiusi, 4) protonlar soni, 5) ionlanish potensiali qanday oʻzgaradi?',
      hint: 'Tashqi elektronlar har doim 2 ta.',
      explanation: '1 — oʻzgarmaydi; 2, 3, 4 — ortadi; 5 — kamayadi.',
      widget: {
        type: 'mcq',
        props: {
          prompt: '',
          choices: ['1 oʻzgarmaydi; 2, 3, 4 ortadi; 5 kamayadi', '1 oʻzgarmaydi; 2, 3, 4 kamayadi; 5 ortadi', '1 kamayadi; 2, 4 ortadi; 3, 5 oʻzgarmaydi', '1 oʻzgarmaydi; 2, 4 ortadi; 3, 5 kamayadi'],
          answerIndex: 0
        }
      }
    },
    {
      id: 'k2q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Zamonaviy taʼrif — yadro zaryadi.',
      explanation: 'Xossalar yadro zaryadiga bogʻliq; 1-davrdan boshqa davrlar ishqoriy metall bilan boshlanadi; birinchi nodir gaz birikmasi XeF₄ 1962-yilda olingan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Elementlar xossalari yadro zaryadiga davriy bogʻliq.', value: true },
            { text: 'Ikkinchi davr litiy bilan boshlanib, neon bilan tugaydi.', value: true },
            { text: 'Guruhda yuqoridan pastga atom radiusi kamayadi.', value: false },
            { text: 'Nodir gazlar hech qanday birikma hosil qilmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
