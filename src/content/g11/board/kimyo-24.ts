import type { BoardLesson } from './types';
import { BOB5 } from './kimyo-22';

/** Darslik: Umumiy kimyo 11, 24-mavzu (109–112-betlar) — reaksiya tezligiga oid masalalar: massa orqali, vaqt va hajmni topish, bosim oʻzgarishi. */
export const KIM_24: BoardLesson = {
  n: 24,
  label: '24',
  group: BOB5,
  title: 'Reaksiya tezligiga oid masalalar',
  section: '24-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Masalalarda modda koʻpincha grammlarda beriladi, soʻraladigan narsa esa tezlik, vaqt yoki idish hajmi boʻlishi mumkin. Barchasi bitta formuladan chiqadi: v teng delta n boʻlinsin V karra delta t. Faqat grammni molga oʻtkazishni unutmaslik kerak.",
      easy: "Bitta formula: v = Δn/(V·Δt); gramm → mol.",
      draw: [
        { t: 'title', text: 'Bitta formula — uch savol' },
        { t: 'icon', x: 16, y: 34, emoji: '⚖️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⏱️', size: 'l' },
        { t: 'formula', x: 32, y: 30, text: 'v = Δn / (V · Δt)' },
        { t: 'list', x: 32, y: 42, items: ['Δt = Δn / (V · v)', 'V = Δn / (v · Δt)'] }
      ],
      next: 'Grammdan tezlikka'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Masala: 0,75 litrli idishda 127,5 gramm ammiakdan 0,1 minutdan keyin 51 gramm qoldi. Sarflandi 76,5 gramm — boʻlinsin 17 — 4,5 mol. Tezlik: 4,5 boʻlinsin 0,75 karra 0,1 — 60 mol/L·min.",
      easy: "Δm = 76,5 g → 4,5 mol; v = 4,5/(0,75·0,1) = 60.",
      draw: [
        { t: 'title', text: 'Grammdan tezlikka' },
        { t: 'formula', x: 4, y: 24, text: 'Δm = 127,5 − 51 = 76,5 g' },
        { t: 'formula', x: 4, y: 36, text: 'Δn = 76,5 / 17 = 4,5 mol' },
        { t: 'formula', x: 4, y: 50, text: 'v = 4,5 / (0,75 · 0,1) = 60 mol/(L·min)' }
      ],
      next: 'Vaqtni topish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Vodorod sarflanish tezligi 2,5 mol/L·min, idish 6 litr. 100 gramm vodoroddan 10 gramm qolishi uchun qancha vaqt kerak? Sarflandi 90 gramm — 45 mol. Vaqt: 45 boʻlinsin 6 karra 2,5 — 3 minut, yaʼni 180 sekund.",
      easy: "Δn = 90/2 = 45 mol; t = 45/(6·2,5) = 3 min.",
      draw: [
        { t: 'title', text: 'Vaqtni topish' },
        { t: 'formula', x: 4, y: 24, text: 'Δn(H₂) = 90 / 2 = 45 mol' },
        { t: 'formula', x: 4, y: 38, text: 'Δt = 45 / (6 · 2,5) = 3 min = 180 s' }
      ],
      next: 'Hajmni topish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Metan sarflanish tezligi 2,2 mol/L·min. 102,8 gramm metandan yarim minutda 50 gramm qoldi. Idish hajmi qancha? Sarflandi 52,8 gramm — boʻlinsin 16 — 3,3 mol. Hajm: 3,3 boʻlinsin 2,2 karra 0,5 — 3 litr.",
      easy: "Δn = 52,8/16 = 3,3 mol; V = 3,3/(2,2·0,5) = 3 L.",
      draw: [
        { t: 'title', text: 'Hajmni topish' },
        { t: 'formula', x: 4, y: 24, text: 'Δn(CH₄) = 52,8 / 16 = 3,3 mol' },
        { t: 'formula', x: 4, y: 38, text: 'V = 3,3 / (2,2 · 0,5) = 3 L' }
      ],
      next: 'Bosim kamaysa'
    },
    {
      kind: 'example',
      clear: true,
      say: "Fe2O3 qoʻshuv 3CO reaksiyasi, k teng 8, CO konsentratsiyasi 1 mol/L. Bosim 4 marta kamaysa, tezlik qancha boʻladi? Temir oksidi qattiq — yozilmaydi: v teng k karra CO ning kubi. CO konsentratsiyasi 4 marta kamayib, 0,25 boʻladi: 8 karra 0,25 kub — 0,125.",
      easy: "v = k[CO]³ = 8 · 0,25³ = 0,125.",
      draw: [
        { t: 'title', text: 'Bosim 4 marta kamaysa' },
        { t: 'formula', x: 4, y: 24, text: 'Fe₂O₃(q) + 3CO → 2Fe + 3CO₂' },
        { t: 'formula', x: 4, y: 36, text: 'v = k · [CO]³' },
        { t: 'formula', x: 4, y: 50, text: 'v = 8 · 0,25³ = 0,125' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Grammda berilgan moddani avval molga oʻtkazamiz: Δn = Δm/M.',
    'Bitta formuladan uch kattalik: v = Δn/(V·Δt), Δt = Δn/(V·v), V = Δn/(v·Δt).',
    'Bosim oʻzgarganda faqat gazlar konsentratsiyasi oʻzgaradi; qattiq moddalar tezlik ifodasiga kirmaydi.'
  ],
  questions: [
    {
      id: 'k24q1',
      prompt: '2,5 L idishda 1000 g I₂ dan 111 g ga teng miqdor (3,5 mol) sarflandi; tezlik 0,8 mol/(L·min). Reaksiya necha minut davom etgan?',
      hint: 't = Δn/(V·v).',
      explanation: '3,5 / (2,5 · 0,8) = 1,75 min.',
      widget: { type: 'number_answer', props: { answer: 1.75, tolerance: 0.01, unit: 'min' } }
    },
    {
      id: 'k24q2',
      prompt: '6 L idishda O₂ 14 moldan 6,5 molgacha 15 s da kamaydi. Tezlik necha mol/(L·min)?',
      hint: 'Δn = 7,5 mol, t = 0,25 min.',
      explanation: '7,5 / (6 · 0,25) = 5 mol/(L·min).',
      widget: { type: 'number_answer', props: { answer: 5, tolerance: 0.01, unit: 'mol/(L·min)' } }
    },
    {
      id: 'k24q3',
      prompt: 'CH₄ + 2O₂ → CO₂ + 2H₂O, boshlangʻich tezlik 5. Bosim 3 marta oshirilsa, yangi tezlik qancha?',
      hint: '3¹ · 3² = 27.',
      explanation: '5 · 27 = 135.',
      widget: { type: 'number_answer', props: { answer: 135 } }
    },
    {
      id: 'k24q4',
      prompt: '4 L idishda 64 g O₂ dan 2 min da 32 g qoldi. Tezlik necha mol/(L·min)?',
      hint: 'Δn = 32/32 = 1 mol.',
      explanation: '1 / (4 · 2) = 0,125 mol/(L·min).',
      widget: { type: 'number_answer', props: { answer: 0.125, tolerance: 0.001, unit: 'mol/(L·min)' } }
    },
    {
      id: 'k24q5',
      prompt: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂ reaksiyasida bosim 2 marta oshirilsa, tezlik necha marta ortadi?',
      hint: 'Faqat CO hisobga olinadi.',
      explanation: '2³ = 8 marta.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['2', '8', '16', '32'], answerIndex: 1 } }
    },
    {
      id: 'k24q6',
      prompt: 'Topiladigan kattalikni formulasi bilan juftlang.',
      hint: 'Asosiy formuladan ifodalang.',
      explanation: 'v = Δn/(V·Δt); Δt = Δn/(V·v); V = Δn/(v·Δt); Δn = Δm/M.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'tezlik', right: 'Δn / (V · Δt)' },
            { left: 'vaqt', right: 'Δn / (V · v)' },
            { left: 'hajm', right: 'Δn / (v · Δt)' },
            { left: 'mol', right: 'Δm / M' }
          ]
        }
      }
    },
    {
      id: 'k24q7',
      prompt: 'Masalani yechish tartibini tiklang.',
      hint: 'Avval sarflangan massa.',
      explanation: 'Sarflangan massani topish → molga oʻtkazish → birliklarni moslash → formulaga qoʻyish.',
      widget: {
        type: 'step_order',
        props: { steps: ['sarflangan massani topish', 'massani molga oʻtkazish', 'vaqt va hajm birliklarini moslash', 'formulaga qoʻyib hisoblash'] }
      }
    },
    {
      id: 'k24q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Qattiq modda — yozilmaydi.',
      explanation: 'Bosim kamaysa tezlik kamayadi; Fe₂O₃ ifodaga kirmaydi; 180 s = 3 min.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bosim kamaysa, gazlar orasidagi reaksiya sekinlashadi.', value: true },
            { text: '180 sekund 3 minutga teng.', value: true },
            { text: 'Fe₂O₃ + 3CO reaksiyasi tezligi Fe₂O₃ konsentratsiyasiga bogʻliq.', value: false },
            { text: 'Tezlikni topishda grammni molga oʻtkazish shart emas.', value: false }
          ]
        }
      }
    }
  ]
};
