import type { BoardLesson } from './types';
import { BOB8 } from './kimyo-31';

/** Darslik: Umumiy kimyo 11, 32-mavzu (144–149-betlar) — Faradey qonunlari, Faradey soni, m = E·I·t/F, ekvivalent miqdor orqali masalalar. */
export const KIM_32: BoardLesson = {
  n: 32,
  label: '32',
  group: BOB8,
  title: 'Faradey qonunlari',
  section: '32-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Qancha tok oʻtkazsak, shuncha modda ajraladimi? Ingliz olimi Maykl Faradey buni oʻlchab, elektrolizning ikki qonunini kashf etdi. Ular yordamida qancha mis ajralishini yoki misni toʻliq ajratish uchun qancha vaqt kerakligini aniq hisoblash mumkin.",
      easy: "Faradey: tok qancha — modda shuncha.",
      draw: [
        { t: 'title', text: 'Faradey qonunlari' },
        { t: 'icon', x: 16, y: 40, emoji: '⚡', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['1-qonun: m ~ Q', '2-qonun: m ~ E', 'F = 96500 C'] }
      ],
      next: 'Ikki qonun'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Birinchi qonun: elektrodda ajralgan modda massasi oʻtgan elektr miqdoriga — tok kuchi karra vaqtga — toʻgʻri proporsional. Ikkinchi qonun: bir xil tok oʻtkazilsa, ajralgan moddalar massasi ularning ekvivalent massalariga proporsional. 96500 kulon — 1 faradey — har bir elektrodda 1 ekvivalent modda ajratadi.",
      easy: "1 F = 96500 C → har elektrodda 1 ekvivalent modda.",
      draw: [
        { t: 'title', text: 'Ikki qonun' },
        { t: 'list', x: 4, y: 20, items: ['1) m ~ Q = I · t', '2) bir xil Q da m ~ E', '1 F = 96500 C → 1 ekvivalent'] },
        { t: 'table', x: 4, y: 44, rows: [['1 F da', 'katod', 'anod'], ['AgNO₃', '108 g Ag', '8 g O₂'], ['CuSO₄', '32 g Cu', '8 g O₂'], ['FeCl₃', '18,67 g Fe', '35,5 g Cl₂']] }
      ],
      next: 'Formula'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikki qonundan bitta formula chiqadi: m teng E karra I karra t boʻlinsin 96500. Bu yerda I — amperda, t — sekundda. Massani ekvivalentga boʻlsak, ekvivalent miqdor chiqadi: n ekv teng I karra t boʻlinsin 96500. Masalalarda koʻpincha shu qisqa formuladan foydalanamiz.",
      easy: "m = E·I·t / 96500;  n(ekv) = I·t / 96500.",
      draw: [
        { t: 'title', text: 'Formula' },
        { t: 'formula', x: 4, y: 24, text: 'm = E · I · t / 96500' },
        { t: 'formula', x: 4, y: 38, text: 'n(ekv) = m / E = I · t / 96500' },
        { t: 'list', x: 4, y: 48, items: ['I — amper, t — sekund', 'E(Cu) = 32, E(Ag) = 108, E(H₂O) = 9'] }
      ],
      next: 'Vaqtni topish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "500 gramm 32 foizli CuSO₄ eritmasidan misni toʻliq ajratish uchun 5 amper tokni qancha vaqt oʻtkazish kerak? Tuz 160 gramm. CuSO₄ ning ekvivalenti 160 boʻlinsin 2 — 80. Vaqt: 160 karra 96500 boʻlinsin 80 karra 5 — 38600 sekund.",
      easy: "m(CuSO₄) = 160 g, E = 80: t = 160·96500/(80·5) = 38600 s.",
      draw: [
        { t: 'title', text: 'CuSO₄ ni toʻliq elektrolizlash' },
        { t: 'formula', x: 4, y: 22, text: 'm(CuSO₄) = 500 · 0,32 = 160 g' },
        { t: 'formula', x: 4, y: 34, text: 'E(CuSO₄) = 160 / 2 = 80' },
        { t: 'formula', x: 4, y: 48, text: 't = 160 · 96500 / (80 · 5) = 38600 s' }
      ],
      next: 'Faqat suv'
    },
    {
      kind: 'explain',
      clear: true,
      say: "500 gramm 23 foizli K₂CO₃ eritmasidan 4825 minut tok oʻtkazildi va tuz ulushi 50 foiz boʻldi. Tok kuchi? Faqat suv parchalanadi, tuz 115 gramm qoladi. Yangi eritma 230 gramm — demak 270 gramm suv parchalangan, bu 30 ekvivalent. I teng 30 karra 96500 boʻlinsin 289500 sekund — 10 amper.",
      easy: "Suv 270 g = 30 ekv; t = 289500 s; I = 10 A.",
      draw: [
        { t: 'title', text: 'Faqat suv parchalansa' },
        { t: 'formula', x: 4, y: 22, text: 'm(K₂CO₃) = 115 g → eritma 230 g' },
        { t: 'formula', x: 4, y: 34, text: 'm(H₂O) = 500 − 230 = 270 g = 30 ekv' },
        { t: 'formula', x: 4, y: 48, text: 'I = 30 · 96500 / 289500 = 10 A' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "31,25 gramm CuSO₄ karra nH₂O kristallogidrati eritildi, misni toʻliq ajratish uchun 5 amper tok 4825 sekund oʻtdi. n ni topamiz. Ekvivalentlar: 5 karra 4825 boʻlinsin 96500 — 0,25. CuSO₄: 0,25 karra 80 — 20 gramm, suv 11,25 gramm — 0,625 mol. CuSO₄ 0,125 mol: n teng 5. Bu mis kuporosi CuSO₄·5H₂O.",
      easy: "0,25 ekv → CuSO₄ 20 g (0,125 mol); suv 0,625 mol → n = 5.",
      draw: [
        { t: 'title', text: 'Kristallogidrat' },
        { t: 'formula', x: 4, y: 22, text: 'n(ekv) = 5 · 4825 / 96500 = 0,25' },
        { t: 'formula', x: 4, y: 34, text: 'm(CuSO₄) = 0,25 · 80 = 20 g' },
        { t: 'formula', x: 4, y: 46, text: 'm(H₂O) = 31,25 − 20 = 11,25 g' },
        { t: 'formula', x: 4, y: 58, text: 'n = 0,625 / 0,125 = 5' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Faradeyning 1-qonuni: m ~ I·t; 2-qonuni: bir xil tokda m ~ E. 1 F = 96500 C har elektrodda 1 ekvivalent modda ajratadi.',
    'm = E·I·t/96500, n(ekv) = I·t/96500 (I — A, t — s).',
    'Faqat suv parchalanganda tuz massasi oʻzgarmaydi; E(H₂O) = 9.'
  ],
  questions: [
    {
      id: 'k32q1',
      prompt: '607 g 10 % li AuCl₃ eritmasidan oltinni toʻliq ajratish uchun 4 A tokni necha sekund oʻtkazish kerak? (M(AuCl₃) = 303,5)',
      hint: 'AuCl₃ 0,2 mol = 0,6 ekv.',
      explanation: '0,6 · 96500 / 4 = 14475 s.',
      widget: { type: 'number_answer', props: { answer: 14475, unit: 's' } }
    },
    {
      id: 'k32q2',
      prompt: '500 g 17 % li AgNO₃ eritmasidan kumushni toʻliq ajratish uchun 2 A tokni necha sekund oʻtkazish kerak?',
      hint: 'AgNO₃ 0,5 mol = 0,5 ekv.',
      explanation: '0,5 · 96500 / 2 = 24125 s.',
      widget: { type: 'number_answer', props: { answer: 24125, unit: 's' } }
    },
    {
      id: 'k32q3',
      prompt: '600 g 30 % li Na₂CO₃ eritmasidan 96500 s davomida qancha tok oʻtkazilsa, tuz ulushi 35,3 % boʻladi?',
      hint: 'Yangi eritma ≈ 510 g, 90 g suv = 10 ekv.',
      explanation: 'I = 10 · 96500 / 96500 = 10 A.',
      widget: { type: 'number_answer', props: { answer: 10, unit: 'A' } }
    },
    {
      id: 'k32q4',
      prompt: '250 g 5,85 % li NaCl eritmasidan 5 A tok 4825 s oʻtkazildi. Hosil boʻlgan eritma foiz konsentratsiyasi? (0,01 gacha)',
      hint: '0,25 ekv: NaOH 10 g; H₂ 0,25 g va Cl₂ 8,875 g chiqib ketadi.',
      explanation: '10 / (250 − 9,125) · 100 ≈ 4,15 %.',
      widget: { type: 'number_answer', props: { answer: 4.15, tolerance: 0.02, unit: '%' } }
    },
    {
      id: 'k32q5',
      prompt: '22,3 g MnSO₄·nH₂O 500 g suvda eritildi; marganesni toʻliq ajratish uchun 2 A tok 9650 s oʻtdi. n = ?',
      hint: '0,2 ekv → MnSO₄ 0,1 mol = 15,1 g.',
      explanation: 'Suv 7,2 g = 0,4 mol → n = 4.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'k32q6',
      prompt: 'CuSO₄ eritmasi orqali 1 F tok oʻtkazilsa, katodda necha gramm mis ajraladi?',
      hint: 'E(Cu) = 64/2.',
      explanation: '1 ekvivalent = 32 g.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['64 g', '32 g', '16 g', '8 g'], answerIndex: 1 } }
    },
    {
      id: 'k32q7',
      prompt: 'Kattalikni birligi bilan juftlang.',
      hint: 'Faradey soni — kulon.',
      explanation: 'I — A; t — s; F — 96500 C; E — g/ekv.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'I', right: 'amper' },
            { left: 't', right: 'sekund' },
            { left: 'F', right: '96500 C' },
            { left: 'E', right: 'g/ekv' }
          ]
        }
      }
    },
    {
      id: 'k32q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '1 F — 1 ekvivalent.',
      explanation: '1 F da 108 g Ag yoki 8 g O₂ ajraladi; massa tok kuchi va vaqtga proporsional.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1 F tok AgNO₃ eritmasidan 108 g kumush ajratadi.', value: true },
            { text: 'Tok kuchi 2 marta ortsa, ajralgan modda massasi 2 marta ortadi.', value: true },
            { text: '1 F tokda anodda 32 g kislorod ajraladi.', value: false },
            { text: 'Formulada vaqt minutlarda olinadi.', value: false }
          ]
        }
      }
    }
  ]
};
