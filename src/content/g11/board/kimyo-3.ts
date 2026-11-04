import type { BoardLesson } from './types';
import { BOB1 } from './kimyo-1';

/** Darslik: Umumiy kimyo 11, 3-mavzu (16–23-betlar) — yadro tarkibi, izotoplar, izobarlar, izotonlar, oʻrtacha atom massa, yadro reaksiyalari. */
export const KIM_3: BoardLesson = {
  n: 3,
  label: '3',
  group: BOB1,
  title: 'Atom tarkibi. Yadro reaksiyalari',
  section: '3-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Shifokorlar qalqonsimon bezni tekshirish uchun bemorga oz miqdorda radioaktiv yod-131 beradi, saraton oʻsmalarini kobalt-60 nurlari bilan davolaydi. Yod-131 ham, oddiy yod ham — bitta element, faqat yadrosidagi neytronlar soni boshqa. Bugun atom yadrosi va yadro reaksiyalarini koʻramiz.",
      easy: "Tibbiyotda radioaktiv izotoplar ishlatiladi — ular yadrosi bilan farq qiladi.",
      draw: [
        { t: 'title', text: 'Izotoplar shifoxonada' },
        { t: 'icon', x: 16, y: 34, emoji: '🏥', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '☢️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['yod-131 — qalqonsimon bez', 'kobalt-60 — saraton davosi', 'fosfor-32 — oʻsmani aniqlash'] }
      ],
      next: 'Yadro tarkibi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Atom elektroneytral: yadro zaryadi va elektronlar soni tartib raqamiga teng. Ivanenko va Gapon nazariyasiga koʻra yadro protonlar va neytronlardan — nuklonlardan iborat. Proton massasi 1,0073, neytronniki 1,0087 atom massa birligi; proton zaryadi plyus bir, neytron zaryadsiz. Massa soni A teng Z qoʻshuv N. Elektron massasi juda kichik, atom massasining deyarli hammasi yadroda.",
      easy: "Yadro = Z proton + N neytron; A = Z + N.",
      draw: [
        { t: 'title', text: 'Yadro tarkibi' },
        { t: 'table', x: 4, y: 20, rows: [['zarra', 'massa, m.a.b.', 'zaryad'], ['proton p', '1,0073', '+1'], ['neytron n', '1,0087', '0'], ['elektron e', '≈ 1/1837', '−1']] },
        { t: 'formula', x: 62, y: 26, text: 'A = Z + N' },
        { t: 'text', x: 62, y: 40, text: '¹⁶O: 8p, 8n', size: 's', color: 'purple' }
      ],
      next: 'Izotoplar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yadro zaryadi bir xil, massa soni turlicha atomlar — izotoplar, masalan vodorodning protiy, deyteriy va tritiy izotoplari. Massa soni bir xil, zaryadi turlicha — izobarlar: kaliy-40 va argon-40. Neytronlar soni bir xil — izotonlar. Elektronlar soni bir xil zarrachalar — izoelektronlar, masalan Na plyus va Ne. Elementning atom massasi — izotoplar massalarining tarqalganlik bilan oʻrtachasi.",
      easy: "Izotop — Z bir xil; izobar — A bir xil; izoton — N bir xil.",
      draw: [
        { t: 'title', text: 'Izotop, izobar, izoton' },
        { t: 'table', x: 4, y: 20, rows: [['tur', 'bir xil', 'misol'], ['izotoplar', 'Z', '³⁵Cl, ³⁷Cl'], ['izobarlar', 'A', '⁴⁰K, ⁴⁰Ar'], ['izotonlar', 'N', '¹³⁶Xe, ¹³⁸Ba'], ['izoelektronlar', 'elektronlar', 'Na⁺, Ne']] },
        { t: 'formula', x: 4, y: 58, text: 'A(Cl) = 0,775·35 + 0,225·37 = 35,45' }
      ],
      next: 'Yadro jarayonlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Radioaktiv elementlar alfa, beta, gamma nurlar chiqaradi. Alfa-parchalanishda geliy yadrosi chiqadi: massa soni 4 ga, tartib raqami 2 ga kamayadi. Beta-parchalanishda neytron protonga aylanib, elektron chiqadi: tartib raqami 1 ga ortadi. Pozitron ajralganda yoki elektron qamralganda proton neytronga aylanadi: tartib raqami 1 ga kamayadi. Gamma-nurlanish massa va zaryadni oʻzgartirmaydi.",
      easy: "α: A − 4, Z − 2; β: Z + 1; pozitron yoki e-qamrash: Z − 1; γ: oʻzgarmaydi.",
      draw: [
        { t: 'title', text: 'Radioaktiv oʻzgarishlar' },
        { t: 'table', x: 4, y: 20, rows: [['jarayon', 'A', 'Z'], ['α-parchalanish', '−4', '−2'], ['β-parchalanish', '0', '+1'], ['pozitron ajralishi', '0', '−1'], ['elektron qamrash', '0', '−1'], ['γ-nurlanish', '0', '0']] }
      ],
      next: 'Yadro reaksiyalari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yadro reaksiyasi tenglamasida chap va oʻng tomonda massa sonlari yigʻindisi ham, zaryadlar yigʻindisi ham teng boʻladi. 1919-yilda Rezerford azotni alfa-zarralar bilan bombardimon qilib, birinchi sunʼiy yadro reaksiyasini oʻtkazdi: azot-14 qoʻshuv geliy-4, kislorod-17 va proton beradi. Uran-235 neytron yutib boʻlinadi — yadro energetikasi shunga asoslangan.",
      easy: "Reaksiyada A va Z yigʻindilari saqlanadi. ¹⁴N + ⁴He → ¹⁷O + ¹H.",
      draw: [
        { t: 'title', text: 'Yadro reaksiyalari' },
        { t: 'formula', x: 4, y: 24, text: '¹⁴N + ⁴He → ¹⁷O + ¹H   (1919)' },
        { t: 'formula', x: 4, y: 38, text: '²⁷Al + ⁴He → ³⁰Si + ¹H' },
        { t: 'formula', x: 4, y: 52, text: '²²⁶Ra → ²²²Rn + ⁴He' },
        { t: 'text', x: 4, y: 64, text: 'A va Z yigʻindilari ikki tomonda teng', size: 's', color: 'purple' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Izotop yadrosida 82 ta neytron bor, protonlar nuklonlarning 40,58 foizini tashkil qiladi. Massa sonini topamiz. Neytronlar ulushi 100 minus 40,58, yaʼni 59,42 foiz. Protonlar soni: 82 karra 40,58 boʻlinsin 59,42 — 56 ta. Massa soni 56 qoʻshuv 82, yaʼni 138. Bu — bariy-138.",
      easy: "p = 82 · 40,58 / 59,42 = 56; A = 56 + 82 = 138.",
      draw: [
        { t: 'title', text: 'Massa sonini topamiz' },
        { t: 'list', x: 4, y: 20, items: ['N = 82, p ulushi 40,58 %', 'n ulushi 59,42 %'] },
        { t: 'formula', x: 4, y: 44, text: 'Z = 82 · 40,58 / 59,42 = 56' },
        { t: 'formula', x: 4, y: 56, text: 'A = 56 + 82 = 138  (¹³⁸Ba)' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Yadro protonlar va neytronlardan iborat: A = Z + N; atom massasining deyarli hammasi yadroda.',
    'Izotoplar — Z bir xil, izobarlar — A bir xil, izotonlar — N bir xil; atom massasi — izotoplar oʻrtachasi.',
    'α: A − 4, Z − 2; β: Z + 1; pozitron/elektron qamrash: Z − 1; yadro reaksiyasida A va Z yigʻindilari saqlanadi.'
  ],
  questions: [
    {
      id: 'k3q1',
      prompt: 'Bor 20 % ¹⁰B va 80 % ¹¹B izotoplaridan iborat. Borning oʻrtacha atom massasi qancha?',
      hint: '0,2·10 + 0,8·11.',
      explanation: '2 + 8,8 = 10,8.',
      widget: { type: 'number_answer', props: { answer: 10.8, tolerance: 0.01 } }
    },
    {
      id: 'k3q2',
      prompt: 'Izotop yadrosida 74 ta neytron bor, protonlar nuklonlarning 41,73 % ini tashkil etadi. Massa sonini toping.',
      hint: 'Z = 74 · 41,73 / 58,27.',
      explanation: 'Z = 53 (yod); A = 53 + 74 = 127.',
      widget: { type: 'number_answer', props: { answer: 127 } }
    },
    {
      id: 'k3q3',
      prompt: 'Vodorodning 3 ta izotopi (H, D, T) va kislorodning ¹⁶O, ¹⁸O izotoplaridan necha xil suv molekulasi hosil boʻladi?',
      hint: 'Vodorod juftlari: HH, DD, TT, HD, HT, DT.',
      explanation: '6 juft · 2 kislorod = 12 xil.',
      widget: { type: 'number_answer', props: { answer: 12 } }
    },
    {
      id: 'k3q4',
      prompt: '⁵¹Cr atomida (24 p, 24 e) neytronlar barcha elementar zarrachalarning necha foizini tashkil etadi?',
      hint: 'N = 51 − 24; jami p + n + e.',
      explanation: 'N = 27; jami 24 + 27 + 24 = 75; 27/75 = 36 %.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['40 %', '36 %', '34,6 %', '52,9 %'], answerIndex: 1 } }
    },
    {
      id: 'k3q5',
      prompt: 'Juftlarni turiga qarab ajrating.',
      hint: 'Nima bir xil?',
      explanation: 'Izotoplar: ³⁵Cl/³⁷Cl, ¹H/²H. Izobarlar: ⁴⁰K/⁴⁰Ar, ⁵⁴Cr/⁵⁴Fe. Izotonlar: ¹³⁶Xe/¹³⁸Ba (82 n).',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'p', label: 'Izotoplar' },
            { id: 'b', label: 'Izobarlar' },
            { id: 'n', label: 'Izotonlar' }
          ],
          items: [
            { emoji: '', label: '³⁵Cl va ³⁷Cl', bin: 'p' },
            { emoji: '', label: '¹H va ²H', bin: 'p' },
            { emoji: '', label: '⁴⁰K va ⁴⁰Ar', bin: 'b' },
            { emoji: '', label: '⁵⁴Cr va ⁵⁴Fe', bin: 'b' },
            { emoji: '', label: '¹³⁶Xe va ¹³⁸Ba', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'k3q6',
      prompt: '²⁷Al + ⁴He → X + ¹H reaksiyasida X nima?',
      hint: 'A: 27 + 4 − 1; Z: 13 + 2 − 1.',
      explanation: 'A = 30, Z = 14 — kremniy-30.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['³⁰Si', '³⁰P', '³¹Si', '²⁹Si'], answerIndex: 0 } }
    },
    {
      id: 'k3q7',
      prompt: 'Jarayonni yadrodagi oʻzgarish bilan juftlang.',
      hint: 'α — geliy yadrosi.',
      explanation: 'α — A − 4, Z − 2; β — Z + 1; pozitron ajralishi — Z − 1; γ — oʻzgarmaydi.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'α-parchalanish' }, b: { label: 'A − 4, Z − 2' } },
            { a: { label: 'β-parchalanish' }, b: { label: 'Z + 1' } },
            { a: { label: 'pozitron ajralishi' }, b: { label: 'Z − 1' } },
            { a: { label: 'γ-nurlanish' }, b: { label: 'A va Z oʻzgarmaydi' } }
          ]
        }
      }
    },
    {
      id: 'k3q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kimyoviy element — yadro zaryadi bir xil atomlar.',
      explanation: 'Element yadro zaryadi bilan aniqlanadi; birinchi sunʼiy yadro reaksiyasi 1919-yilda; neytron zaryadsiz.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kimyoviy element — yadro zaryadi bir xil boʻlgan atomlar turi.', value: true },
            { text: 'Birinchi sunʼiy yadro reaksiyasini Rezerford 1919-yilda oʻtkazgan.', value: true },
            { text: 'Izotoplar protonlar soni bilan farq qiladi.', value: false },
            { text: 'β-parchalanishda tartib raqami 1 ga kamayadi.', value: false }
          ]
        }
      }
    }
  ]
};
