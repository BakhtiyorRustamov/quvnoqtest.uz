import type { BoardLesson } from './types';
import { wave } from './phys';

export const BOB5 = { kicker: '5-bob', title: 'Reaksiya tezligi' };

/** Darslik: Umumiy kimyo 11, 22-mavzu (98–104-betlar) — reaksiyaning oʻrtacha tezligi, birliklari, modda tabiati va konsentratsiyaning taʼsiri, massalar taʼsiri qonuni. */
export const KIM_22: BoardLesson = {
  n: 22,
  label: '22',
  group: BOB5,
  title: 'Reaksiya tezligi haqida tushuncha',
  section: '22-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Porox bir lahzada yonib ketadi, dvigatelda benzin va havo aralashmasi sekundning mingdan bir qismida portlaydi. Temir esa yillar davomida asta-sekin zanglaydi. Reaksiyalar juda turli tezlikda boradi. Reaksiya tezligi qanday oʻlchanadi va unga nimalar taʼsir qiladi?",
      easy: "Porox — bir lahzada, zanglash — yillab.",
      draw: [
        { t: 'title', text: 'Tez va sekin reaksiyalar' },
        { t: 'icon', x: 16, y: 34, emoji: '🎇', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🔩', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['porox, BaSO₄ choʻkmasi — tez', 'temir zanglashi — sekin', 'tezlik — oʻlchanadi'] }
      ],
      next: 'Oʻrtacha tezlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Reaksiyaning oʻrtacha tezligi — moddalardan biri konsentratsiyasining vaqt birligidagi oʻzgarishi: v teng delta C boʻlinsin delta t. Konsentratsiya — mol boʻlinsin hajm, shuning uchun v teng delta n boʻlinsin V karra delta t. Birligi mol/L·min yoki mol/L·s. Grafikda boshlangʻich modda kamayadi, mahsulot ortadi; egri chiziqlar tikligi — tezlik.",
      easy: "v = ΔC/Δt = Δn/(V·Δt); birligi mol/(L·min).",
      draw: [
        { t: 'title', text: 'Oʻrtacha tezlik' },
        { t: 'formula', x: 4, y: 24, text: 'v = ΔC / Δt = Δn / (V · Δt)' },
        { t: 'axes', id: 'g', x: 8, y: 32, w: 52, h: 26, xmin: 0, xmax: 10, ymin: 0, ymax: 2.2, xlabel: 't', ylabel: 'C' },
        { t: 'curve', axes: 'g', points: wave((t) => 2 * Math.exp(-0.3 * t), 0, 10, 40), color: 'red' },
        { t: 'curve', axes: 'g', points: wave((t) => 2 * (1 - Math.exp(-0.3 * t)), 0, 10, 40), color: 'blue' },
        { t: 'text', x: 8, y: 65, text: 'qizil — sarflanadi, koʻk — hosil boʻladi', size: 's' }
      ],
      next: 'Nimalar kerak?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tezlikni topish uchun uchta narsani bilish kerak: necha mol modda sarflangani yoki hosil boʻlgani, reaksiya qancha vaqt davom etgani va idish hajmi. Birliklarga ehtiyot boʻling: sekundni minutga — 60 ga boʻlib, kub metrni litrga — 1000 ga koʻpaytirib oʻtkazamiz.",
      easy: "Δn, Δt, V kerak; s → min: ÷ 60; m³ → L: × 1000.",
      draw: [
        { t: 'title', text: 'Tezlikni topish uchun' },
        { t: 'list', x: 4, y: 22, items: ['Δn — sarflangan yoki hosil boʻlgan mol', 'Δt — vaqt', 'V — idish hajmi, L'] },
        { t: 'list', x: 4, y: 48, items: ['90 s = 1,5 min', '0,005 m³ = 5 L'] }
      ],
      next: 'Tabiat va konsentratsiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tezlik avvalo moddalar tabiatiga bogʻliq: kaliy suv bilan shiddatli reaksiyaga kirishib, ajralgan vodorod yonib ketadi, litiy esa sekin, mayda pufakchalar bilan. Konsentratsiya qancha yuqori boʻlsa, molekulalar shuncha koʻp toʻqnashadi va reaksiya tezroq boradi. Natriy tiosulfat probirkalarida eng konsentrlanganida loyqalanish birinchi boshlanadi.",
      easy: "Tezlik: modda tabiati (K > Li) va konsentratsiyaga bogʻliq.",
      draw: [
        { t: 'title', text: 'Tabiat va konsentratsiya' },
        { t: 'formula', x: 4, y: 24, text: '2K + 2H₂O → 2KOH + H₂↑   (shiddatli)' },
        { t: 'formula', x: 4, y: 36, text: '2Li + 2H₂O → 2LiOH + H₂↑   (sekin)' },
        { t: 'text', x: 4, y: 54, text: 'konsentratsiya ↑ → toʻqnashuvlar ↑ → tezlik ↑', color: 'purple' }
      ],
      next: 'Massalar taʼsiri qonuni'
    },
    {
      kind: 'explain',
      clear: true,
      say: "aA qoʻshuv bB reaksiyasi uchun tezlik: v teng k karra C A ning a darajasi karra C B ning b darajasi, bunda k — tezlik konstantasi. Tezlik konsentratsiyalarning koeffitsiyent darajalari koʻpaytmasiga proporsional. Qattiq moddalar konsentratsiyasi formulaga yozilmaydi: koʻmir yonganda v teng k karra kislorod konsentratsiyasi. Koʻmirni maydalab, sirtini oshirsak, reaksiya tezlashadi.",
      easy: "v = k·[A]ᵃ·[B]ᵇ; qattiq modda yozilmaydi: C + O₂ → v = k[O₂].",
      draw: [
        { t: 'title', text: 'Massalar taʼsiri qonuni' },
        { t: 'formula', x: 4, y: 24, text: 'aA + bB → cC + dD' },
        { t: 'formula', x: 4, y: 36, text: 'v = k · [A]ᵃ · [B]ᵇ' },
        { t: 'formula', x: 4, y: 50, text: 'C(q) + O₂ → CO₂:  v = k · [O₂]' },
        { t: 'text', x: 4, y: 62, text: 'qattiq modda — faqat sirt yuzasi muhim', size: 's', color: 'purple' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "3 litrli idishga 11,5 mol ammiak solindi, 90 sekunddan keyin 2,5 mol qoldi. Oʻrtacha tezlikni mol/L·min da topamiz. Sarflandi: 11,5 minus 2,5 — 9 mol. Vaqt: 90 sekund — 1,5 minut. Tezlik: 9 boʻlinsin 3 karra 1,5 — 2 mol/L·min.",
      easy: "Δn = 9 mol; t = 1,5 min; v = 9/(3·1,5) = 2 mol/(L·min).",
      draw: [
        { t: 'title', text: 'Ammiak parchalanishi' },
        { t: 'list', x: 4, y: 20, items: ['Δn = 11,5 − 2,5 = 9 mol', 'Δt = 90 s = 1,5 min, V = 3 L'] },
        { t: 'formula', x: 4, y: 48, text: 'v = 9 / (3 · 1,5) = 2 mol/(L·min)' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Oʻrtacha tezlik v = ΔC/Δt = Δn/(V·Δt), birligi mol/(L·min) yoki mol/(L·s).',
    'Tezlik moddalar tabiatiga va konsentratsiyaga bogʻliq; konsentratsiya ortsa toʻqnashuvlar koʻpayadi.',
    'Massalar taʼsiri qonuni: v = k·[A]ᵃ·[B]ᵇ; qattiq moddalar konsentratsiyasi yozilmaydi.'
  ],
  questions: [
    {
      id: 'k22q1',
      prompt: '4 L idishga 18 mol CO solindi, 75 s dan keyin 8 mol qoldi. Oʻrtacha tezlik necha mol/(L·min)?',
      hint: 'Δn = 10 mol, t = 1,25 min.',
      explanation: '10 / (4 · 1,25) = 2 mol/(L·min).',
      widget: { type: 'number_answer', props: { answer: 2, tolerance: 0.01, unit: 'mol/(L·min)' } }
    },
    {
      id: 'k22q2',
      prompt: '0,25 L idishdagi 22 mol HCl dan 30 s dan keyin 7 mol qoldi. Tezlik necha mol/(L·s)?',
      hint: 'Δn = 15 mol.',
      explanation: '15 / (0,25 · 30) = 2 mol/(L·s).',
      widget: { type: 'number_answer', props: { answer: 2, tolerance: 0.01, unit: 'mol/(L·s)' } }
    },
    {
      id: 'k22q3',
      prompt: '0,005 m³ reaktorda 0,1 min davomida modda 80 moldan 5 molgacha kamaydi. Tezlik necha mol/(L·s)?',
      hint: 'V = 5 L, t = 6 s.',
      explanation: '75 / (5 · 6) = 2,5 mol/(L·s).',
      widget: { type: 'number_answer', props: { answer: 2.5, tolerance: 0.01, unit: 'mol/(L·s)' } }
    },
    {
      id: 'k22q4',
      prompt: 'N₂ ning sarflanish tezligi 3 mol/(L·min). 8 L idishda azot 104 moldan 8 molgacha kamaydi. Reaksiya necha minut davom etgan?',
      hint: 't = Δn / (V·v).',
      explanation: '96 / (8 · 3) = 4 min.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'min' } }
    },
    {
      id: 'k22q5',
      prompt: 'C(qattiq) + O₂ → CO₂ reaksiyasi uchun tezlik ifodasi qaysi?',
      hint: 'Qattiq modda yozilmaydi.',
      explanation: 'v = k·[O₂].',
      widget: { type: 'mcq', props: { prompt: '', choices: ['v = k·[C]·[O₂]', 'v = k·[O₂]', 'v = k·[CO₂]', 'v = k·[C]'], answerIndex: 1 } }
    },
    {
      id: 'k22q6',
      prompt: 'Reaksiyalarni tezligiga qarab ajrating.',
      hint: 'Zanglash — juda sekin.',
      explanation: 'Tez: porox yonishi, BaSO₄ choʻkishi, kaliy va suv. Sekin: temir zanglashi, litiy va suv (nisbatan).',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'f', label: 'Tez' },
            { id: 's', label: 'Sekin' }
          ],
          items: [
            { emoji: '', label: 'porox yonishi', bin: 'f' },
            { emoji: '', label: 'BaCl₂ + H₂SO₄ choʻkmasi', bin: 'f' },
            { emoji: '', label: 'kaliy + suv', bin: 'f' },
            { emoji: '', label: 'temir zanglashi', bin: 's' },
            { emoji: '', label: 'litiy + suv', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'k22q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Vaqt birligini oʻtkazish.',
      explanation: '150 sekund = 2,5 minut; 0,002 m³ = 2 L.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: '150 sekund = ' },
            { blank: '2,5 min' },
            { text: ', 0,002 m³ = ' },
            { blank: '2 L' },
            { text: '.' }
          ],
          bank: ['2,5 min', '2 L', '9000 min', '0,2 L']
        }
      }
    },
    {
      id: 'k22q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Toʻqnashuvlar koʻpaysa — tezroq.',
      explanation: 'Konsentratsiya ortsa tezlik ortadi; maydalash sirtni oshiradi; kaliy litiydan tez reaksiyaga kirishadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Koʻmirni maydalasak, yonish reaksiyasi tezlashadi.', value: true },
            { text: 'Kaliy suv bilan litiydan tezroq reaksiyaga kirishadi.', value: true },
            { text: 'Massalar taʼsiri qonuniga qattiq moddalar konsentratsiyasi ham yoziladi.', value: false },
            { text: 'Konsentratsiya kamaysa, reaksiya tezlashadi.', value: false }
          ]
        }
      }
    }
  ]
};
