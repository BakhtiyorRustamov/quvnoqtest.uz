import type { BoardLesson } from './types';
import { BOB1 } from './kimyo-1';
import type { DrawOp } from '@/lib/lab/plan';

/** NaCl lattice: alternating ions on a grid. */
const nacl = (x0: number, y0: number, n: number, step: number): DrawOp[] => {
  const out: DrawOp[] = [];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const na = (i + j) % 2 === 0;
      out.push({ t: 'text', x: x0 + i * step, y: y0 + j * step, text: na ? 'Na⁺' : 'Cl⁻', anchor: 'middle', size: 's', color: na ? 'blue' : 'green' });
    }
  return out;
};

/** Darslik: Umumiy kimyo 11, 4-mavzu (23–30-betlar) — kimyoviy bogʻlanish tavsiflari, kovalent, ion, metall va vodorod bogʻlanish, kristall panjaralar. */
export const KIM_4: BoardLesson = {
  n: 4,
  label: '4',
  group: BOB1,
  title: 'Kimyoviy bogʻlanish turlari. Kristall panjaralar',
  section: '4-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Osh tuzi 801 gradusda eriydi, shakar esa atigi 186 gradusda, muz — nol gradusda. Nega? Hammasi zarrachalarni bogʻlab turgan kuchga — kimyoviy bogʻlanish turiga va kristall panjaraga bogʻliq.",
      easy: "Moddalar xossalari bogʻlanish turiga bogʻliq.",
      draw: [
        { t: 'title', text: 'Tuz, shakar, muz' },
        { t: 'icon', x: 16, y: 34, emoji: '🧂', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🧊', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['osh tuzi — 801 °C', 'shakar — 186 °C', 'muz — 0 °C'] }
      ],
      next: 'Bogʻlanish tavsiflari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kimyoviy bogʻni uzish uchun kerak boʻlgan eng kam energiya — bogʻlanish energiyasi, kJ/mol da. Bogʻ uzunligi — yadrolar orasidagi masofa. Bogʻlar orasidagi burchak — valent burchak: suvda 104,5 gradus, metanda 109,5 gradus. Bogʻlanish tartibi ortsa, bogʻ mustahkamlanadi va qisqaradi: N2 dagi uchbogʻ O2 va F2 dagidan kuchli.",
      easy: "Energiya, uzunlik, valent burchak (H₂O 104,5°, CH₄ 109,5°), bogʻ tartibi.",
      draw: [
        { t: 'title', text: 'Bogʻlanish tavsiflari' },
        { t: 'list', x: 4, y: 22, items: ['energiya E, kJ/mol', 'uzunlik r, nm', 'valent burchak: H₂O 104,5°, CH₄ 109,5°'] },
        { t: 'formula', x: 4, y: 50, text: 'N≡N > O=O > F−F' },
        { t: 'text', x: 4, y: 62, text: 'energiya kamayadi, uzunlik ortadi →', size: 's', color: 'purple' }
      ],
      next: 'Kovalent bogʻlanish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Umumiy elektron juft hisobiga hosil boʻladigan bogʻ — kovalent bogʻ. Elektrmanfiyliklari teng atomlar orasida qutbsiz kovalent bogʻ: H2, Cl2, O2. Biroz farq qilsa — qutbli kovalent: HCl, H2O, NH3. Yadrolarni tutashtiruvchi chiziq boʻylab — sigma bogʻ, unga perpendikulyar — pi bogʻ. Oddiy bogʻ — bitta sigma, qoʻshbogʻ — sigma va pi, uchbogʻ — sigma va ikki pi. Donor-akseptor mexanizmida bitta atom juftini beradi: NH3 va H plyus — ammoniy ioni.",
      easy: "Qutbsiz (H₂) va qutbli (HCl) kovalent; σ va π; donor-akseptor: NH₃ + H⁺ → NH₄⁺.",
      draw: [
        { t: 'title', text: 'Kovalent bogʻlanish' },
        { t: 'table', x: 4, y: 20, rows: [['tur', 'misol'], ['qutbsiz', 'H₂, Cl₂, O₂, N₂'], ['qutbli', 'HCl, H₂O, NH₃']] },
        { t: 'list', x: 54, y: 24, items: ['− : 1 σ', '= : 1 σ + 1 π', '≡ : 1 σ + 2 π'] },
        { t: 'formula', x: 4, y: 56, text: 'NH₃ + H⁺ → NH₄⁺  (donor-akseptor)' }
      ],
      next: 'Ion, metall, vodorod'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Elektrmanfiyliklari keskin farq qiladigan atomlar — odatda farq 1,7 dan katta — ion bogʻ hosil qiladi: metall elektron beradi, metallmas oladi, qarama-qarshi ionlar tortishadi. Masalan NaCl, KCl, CaO. Metallarda erkin elektronlar musbat ionlarni bogʻlaydi — metall bogʻ; u elektr va issiqlik oʻtkazuvchanlikni tushuntiradi. Bir molekulaning vodorodi bilan boshqa molekulaning F, O yoki N atomi orasida — vodorod bogʻ: u kuchsiz, lekin suvni (H2O)n assotsiatlarga birlashtiradi.",
      easy: "Ion — ΔEN > 1,7 (NaCl); metall — erkin elektronlar; vodorod bogʻ — H…O, F, N.",
      draw: [
        { t: 'title', text: 'Ion, metall va vodorod bogʻ' },
        { t: 'table', x: 4, y: 20, rows: [['bogʻ', 'qayerda', 'misol'], ['ion', 'ΔEN > 1,7', 'NaCl, CaO'], ['metall', 'erkin elektronlar', 'Fe, Cu'], ['vodorod', 'H … F, O, N', '(H₂O)n, HF']] },
        { t: 'formula', x: 4, y: 54, text: 'CsF: 4,0 − 0,7 = 3,3 → ion' }
      ],
      next: 'Kristall panjaralar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Qattiq moddalar kristall yoki amorf boʻladi. Kristallda zarrachalar tartibli joylashib, kristall panjara hosil qiladi. Tugunlarida ionlar boʻlsa — ion panjara, masalan osh tuzi: har bir natriy ionini oltita xlorid ion oʻrab turadi. Atomlar boʻlsa — atom panjara, masalan olmos, kvars. Molekulalar boʻlsa — molekulyar panjara, masalan muz, yod. Metall panjarada musbat ionlar orasida erkin elektronlar harakatlanadi.",
      easy: "Ion (NaCl), atom (olmos), molekulyar (muz, yod), metall panjaralar.",
      draw: [
        { t: 'title', text: 'Kristall panjaralar' },
        ...nacl(10, 24, 4, 8),
        { t: 'text', x: 22, y: 62, text: 'NaCl — ion panjara', size: 's', anchor: 'middle' },
        { t: 'table', x: 46, y: 20, rows: [['panjara', 'misol'], ['ion', 'NaCl, KCl'], ['atom', 'olmos, kvars'], ['molekulyar', 'muz, yod, CO₂'], ['metall', 'Na, Fe, Cu']] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Qaysi moddada qutbli kovalent bogʻ eng kuchli ifodalangan: HCl, H2O, NH3 yoki NO? Elektrmanfiyliklar farqini hisoblaymiz: HCl da 3 minus 2,1 — 0,9; suvda 3,5 minus 2,1 — 1,4; ammiakda 0,9; NO da 0,5. Eng katta farq suvda — 1,4, demak suvdagi bogʻ eng qutbli.",
      easy: "ΔEN: HCl 0,9; H₂O 1,4; NH₃ 0,9; NO 0,5 → eng qutbli — H₂O.",
      draw: [
        { t: 'title', text: 'Eng qutbli bogʻ' },
        { t: 'table', x: 4, y: 20, rows: [['modda', 'ΔEN'], ['HCl', '3,0 − 2,1 = 0,9'], ['H₂O', '3,5 − 2,1 = 1,4'], ['NH₃', '3,0 − 2,1 = 0,9'], ['NO', '3,5 − 3,0 = 0,5']] },
        { t: 'text', x: 60, y: 40, text: 'eng qutbli — H₂O', color: 'red' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Bogʻlanish tavsiflari: energiya, uzunlik, valent burchak va tartib; tartib ortsa bogʻ mustahkamlanadi va qisqaradi.',
    'Kovalent (qutbsiz va qutbli; σ va π; donor-akseptor), ion (ΔEN > 1,7), metall va vodorod bogʻlanishlar.',
    'Kristall panjaralar: ion (NaCl), atom (olmos), molekulyar (muz, yod) va metall.'
  ],
  questions: [
    {
      id: 'k4q1',
      prompt: 'Kalsiy oksidda elektrmanfiyliklar farqi qancha? (Ca — 1,0; O — 3,5)',
      hint: '3,5 − 1,0.',
      explanation: '2,5 > 1,7 — ion bogʻ.',
      widget: { type: 'number_answer', props: { answer: 2.5, tolerance: 0.01 } }
    },
    {
      id: 'k4q2',
      prompt: 'Perxlorat kislota HClO₄ molekulasida nechtadan σ- va π-bogʻ bor?',
      hint: 'H−O−Cl va uchta Cl=O.',
      explanation: 'σ: H−O, O−Cl va uchta Cl=O dagi σ = 5; π: 3.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['10 va 6', '5 va 3', '4 va 2', '8 va 4'], answerIndex: 1 } }
    },
    {
      id: 'k4q3',
      prompt: 'Molekulasida 2 ta π-bogʻ boʻlgan moddalarni tanlang.',
      hint: 'Uchbogʻ yoki ikkita qoʻshbogʻ.',
      explanation: 'N≡N, O=C=O va H−C≡C−H da 2 tadan π-bogʻ; O₂ da 1 ta, CH₄ da yoʻq.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'azot N₂', correct: true },
            { label: 'karbonat angidrid CO₂', correct: true },
            { label: 'atsetilen C₂H₂', correct: true },
            { label: 'kislorod O₂' },
            { label: 'metan CH₄' }
          ]
        }
      }
    },
    {
      id: 'k4q4',
      prompt: 'Moddalarni bogʻlanish turiga qarab ajrating.',
      hint: 'Bir xil atomlar — qutbsiz.',
      explanation: 'Ion: NaCl, CaO; qutbli kovalent: HCl, H₂O; qutbsiz kovalent: Cl₂, N₂.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'i', label: 'Ion' },
            { id: 'p', label: 'Qutbli kovalent' },
            { id: 'n', label: 'Qutbsiz kovalent' }
          ],
          items: [
            { emoji: '', label: 'NaCl', bin: 'i' },
            { emoji: '', label: 'CaO', bin: 'i' },
            { emoji: '', label: 'HCl', bin: 'p' },
            { emoji: '', label: 'H₂O', bin: 'p' },
            { emoji: '', label: 'Cl₂', bin: 'n' },
            { emoji: '', label: 'N₂', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'k4q5',
      prompt: 'Bogʻ qutbliligi ortib borish tartibida joylang.',
      hint: 'C, N, O, F elektrmanfiyligi ortadi.',
      explanation: 'CH₄ < NH₃ < H₂O < HF.',
      widget: { type: 'order_line', props: { items: [{ label: 'CH₄' }, { label: 'NH₃' }, { label: 'H₂O' }, { label: 'HF' }] } }
    },
    {
      id: 'k4q6',
      prompt: 'Kristall panjarani modda bilan juftlang.',
      hint: 'Olmos — atomlar.',
      explanation: 'Ion — osh tuzi; atom — olmos; molekulyar — muz; metall — mis.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'ion panjara', right: 'osh tuzi NaCl' },
            { left: 'atom panjara', right: 'olmos' },
            { left: 'molekulyar panjara', right: 'muz' },
            { left: 'metall panjara', right: 'mis' }
          ]
        }
      }
    },
    {
      id: 'k4q7',
      prompt: 'Ammoniy ioni NH₄⁺ dagi toʻrtinchi N−H bogʻ qanday mexanizmda hosil boʻladi?',
      hint: 'Azotning boʻlinmagan jufti va H⁺ ning boʻsh orbitali.',
      explanation: 'Donor-akseptor: azot juft elektronni beradi (donor), H⁺ qabul qiladi (akseptor).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ion', 'donor-akseptor', 'metall', 'vodorod'], answerIndex: 1 } }
    },
    {
      id: 'k4q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'π-bogʻ σ dan kuchsiz.',
      explanation: 'Har bir karrali bogʻda bitta σ bor; π-bogʻ σ dan kuchsiz; vodorod bogʻ kovalentdan kuchsiz.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qoʻshbogʻ bitta σ va bitta π-bogʻdan iborat.', value: true },
            { text: 'Suvda molekulalar vodorod bogʻlar bilan birlashadi.', value: true },
            { text: 'π-bogʻ σ-bogʻdan mustahkamroq.', value: false },
            { text: 'Osh tuzi molekulyar kristall panjaraga ega.', value: false }
          ]
        }
      }
    }
  ]
};
