import type { BoardLesson } from './types';

/** Darslik: 1–2-mavzu (3–7-betlar) — orttirmalar nisbati va uning maʼnosi. */
export const MATH_1: BoardLesson = {
  n: 1,
  label: "1",
  part: 'algebra',
  title: "Orttirmalar nisbati nimani bildiradi",
  section: '1–2',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Telefoningizni zaryadga qoʻydingiz. 10 daqiqada zaryad 15 foizdan 35 foizga chiqdi. Demak, har daqiqada oʻrtacha 2 foizdan qoʻshilgan. Bugun ana shunday «bir birlikka qancha toʻgʻri keladi?» degan savolni oʻrganamiz.",
      easy: "Oddiyroq aytsak: 10 daqiqada zaryad 20 foizga oshdi. 20 ni 10 ga boʻlsak, 2 chiqadi. Yaʼni har bir daqiqaga 2 foizdan toʻgʻri keladi.",
      draw: [
        { t: 'title', text: "Oʻzgarish tezligi" },
        { t: 'icon', x: 13, y: 26, emoji: '🔋', size: 'l' },
        { t: 'box', id: 'b1', x: 26, y: 19, w: 32, h: 13, text: "10 daqiqa: 15% → 35%", color: 'blue' },
        { t: 'box', id: 'b2', x: 66, y: 19, w: 28, h: 13, text: "har daqiqada +2%", color: 'green' },
        { t: 'arrow', from: 'b1', to: 'b2' },
        { t: 'formula', x: 30, y: 52, text: "(35 − 15) : 10 = 2" }
      ],
      next: "Xoʻsh, xoʻsh?"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Biror miqdor oʻzgarsa, qanchaga oʻzgarganini «orttirma» deymiz: oxirgi qiymatdan boshlangʻich qiymatni ayiramiz. Masalan, mashina 40-kilometrdan 160-kilometrgacha yurdi: yoʻl orttirmasi 120 kilometr. Shu vaqtda soat birdan uchga oʻtdi: vaqt orttirmasi 2 soat. Ikki orttirmani boʻlamiz: soatiga 60 kilometr. Bu — tezlik.",
      easy: "Orttirma — «qanchaga oʻzgardi?» degan savolning javobi. 160 dan 40 ni ayirsak, 120. 3 dan 1 ni ayirsak, 2. 120 ni 2 ga boʻlamiz: soatiga 60 kilometr.",
      draw: [
        { t: 'title', text: "Orttirma nima?" },
        { t: 'box', id: 'd', x: 6, y: 15, w: 60, h: 11, text: "Orttirma = oxirgi qiymat − boshlangʻich qiymat", color: 'orange' },
        { t: 'list', x: 6, y: 36, items: ["Yoʻl: 40 km → 160 km, orttirma 120 km", "Vaqt: 1 soat → 3 soat, orttirma 2 soat"] },
        { t: 'formula', x: 8, y: 60, text: "120 km : 2 soat = 60 km/soat" }
      ],
      next: "Tushunarli"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikki oʻquvchi matn teryapti. Aziza 5 daqiqada 300 soʻz terib, 9 ta xato qildi. Bobur 4 daqiqada 260 soʻz terib, 13 ta xato qildi. Tezlikni bilish uchun soʻzlarni daqiqalarga boʻlamiz: Azizada daqiqasiga 60, Boburda 65 soʻz. Sifatni bilish uchun xatolarni soʻzlarga boʻlamiz: Aziza har yuz soʻzda 3 ta, Bobur esa 5 ta xato qiladi. Demak, Bobur tezroq, Aziza esa aniqroq yozadi.",
      easy: "Kim tez yozadi? Bir daqiqada nechta soʻz yozganini solishtiramiz: 60 va 65 — Bobur tezroq. Kim aniq yozadi? Har yuz soʻzdagi xatoni solishtiramiz: 3 va 5 — Aziza aniqroq. Nisbat — solishtirishning eng qulay usuli.",
      draw: [
        { t: 'title', text: "Kim yaxshiroq?" },
        { t: 'text', x: 6, y: 19, text: "Aziza: 5 daqiqada 300 soʻz, 9 xato", size: 's' },
        { t: 'text', x: 6, y: 25, text: "Bobur: 4 daqiqada 260 soʻz, 13 xato", size: 's' },
        {
          t: 'table',
          x: 6,
          y: 31,
          rows: [
            ['', 'Tezlik', 'Sifat'],
            ['Aziza', '60 soʻz/daq', '0,03 xato/soʻz'],
            ['Bobur', '65 soʻz/daq', '0,05 xato/soʻz']
          ]
        },
        { t: 'icon', x: 84, y: 38, emoji: '⌨️', size: 'l' },
        { t: 'text', x: 6, y: 60, text: "Bobur — tezroq, Aziza — aniqroq", color: 'purple' }
      ],
      next: "Aha, tushundim"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi silindr shaklidagi idishni joʻmrakdan bir xil oqim bilan toʻldiramiz. Idishning eni hamma joyda bir xil, shuning uchun suv sathi har daqiqada bir xil, 2 santimetrdan koʻtariladi. Grafigi toʻgʻri chiziq boʻladi. Bunday bogʻlanish chiziqli deyiladi: unda orttirmalar nisbati oʻzgarmaydi.",
      easy: "Idish tik va hamma joyi bir xil kenglikda. Har daqiqada bir xil suv tushadi, demak sath ham har daqiqada bir xil koʻtariladi: 2, 4, 6 santimetr. Shuning uchun grafik — tekis, toʻgʻri chiziq.",
      draw: [
        { t: 'title', text: "Bir xil tezlikda" },
        { t: 'icon', x: 17, y: 27, emoji: '🥛', size: 'l' },
        { t: 'text', x: 6, y: 44, text: "Har daqiqada", size: 's' },
        { t: 'text', x: 6, y: 50, text: "+2 sm qoʻshiladi", size: 's', color: 'blue' },
        { t: 'axes', id: 'a', x: 40, y: 13, w: 54, h: 40, xmin: 0, xmax: 5, ymin: 0, ymax: 10, xlabel: 'vaqt', ylabel: 'sath' },
        { t: 'curve', axes: 'a', points: [[0, 0], [5, 10]], color: 'blue' },
        { t: 'dot', axes: 'a', x: 1, y: 2, color: 'blue' },
        { t: 'dot', axes: 'a', x: 2, y: 4, color: 'blue' },
        { t: 'dot', axes: 'a', x: 3, y: 6, color: 'blue' },
        { t: 'formula', x: 8, y: 65, text: "sath : vaqt = 2 sm/min — oʻzgarmas" }
      ],
      next: "Idish boshqacha boʻlsa-chi?"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi pasti tor, tepasi keng stakanni xuddi shunday toʻldiramiz. Pastda joy tor, suv tez koʻtariladi: birinchi daqiqada 3 santimetr. Tepada stakan keng, oʻsha suv kengroq yuzaga yoyiladi: oxirgi daqiqada atigi 7 millimetr. Grafik endi egri chiziq. Bunday holda nisbat qaysi oraliqni olishimizga bogʻliq boʻladi.",
      easy: "Tor joyni toʻldirish oson — sath tez koʻtariladi. Keng joyni toʻldirish uchun koʻp suv kerak — sath sekin koʻtariladi. Shuning uchun grafik avval tik, keyin yotiqroq boʻladi.",
      draw: [
        { t: 'title', text: "Tezlik oʻzgarsa" },
        { t: 'point', id: 'c1', x: 8, y: 17 },
        { t: 'point', id: 'c2', x: 32, y: 17 },
        { t: 'point', id: 'c3', x: 25, y: 45 },
        { t: 'point', id: 'c4', x: 15, y: 45 },
        { t: 'polygon', points: ['c1', 'c2', 'c3', 'c4'], color: 'blue', fill: true },
        { t: 'axes', id: 'a', x: 40, y: 13, w: 54, h: 40, xmin: 0, xmax: 5, ymin: 0, ymax: 8, xlabel: 'vaqt', ylabel: 'sath' },
        { t: 'curve', axes: 'a', points: [[0, 0], [0.5, 2.12], [1, 3], [2, 4.24], [3, 5.2], [4, 6], [5, 6.71]], color: 'orange' },
        { t: 'dot', axes: 'a', x: 1, y: 3, color: 'orange' },
        { t: 'dot', axes: 'a', x: 4, y: 6, color: 'orange' },
        { t: 'dot', axes: 'a', x: 5, y: 6.71, color: 'orange' },
        { t: 'text', x: 4, y: 56, text: "0–1 min: +3 sm", size: 's' },
        { t: 'text', x: 4, y: 62, text: "4–5 min: +0,7 sm", size: 's' },
        { t: 'text', x: 42, y: 66, text: "boshida tez, keyin sekin", size: 's', color: 'orange' }
      ],
      next: "Qiziq-ku!"
    },
    {
      kind: 'example',
      clear: true,
      say: "Endi birga yechamiz. Avtobus soat 8:30 da Navoiydan chiqib, 10:30 da Buxoroga yetib keldi va 110 kilometr yoʻl bosdi. Vaqt orttirmasi: 10:30 dan 8:30 ni ayiramiz — 2 soat. Yoʻl orttirmasi — 110 kilometr. Boʻlamiz: soatiga 55 kilometr. Bu avtobusning oʻrtacha tezligi.",
      easy: "Avtobus 2 soat yurdi va 110 kilometr bosdi. 110 ni 2 ga boʻlsak, 55. Har soatda oʻrtacha 55 kilometrdan yurgan.",
      draw: [
        { t: 'title', text: 'Misol' },
        { t: 'text', x: 6, y: 18, text: "Avtobus 8:30 da Navoiydan chiqib," },
        { t: 'text', x: 6, y: 25, text: "10:30 da Buxoroga yetdi. Yoʻl: 110 km." },
        { t: 'list', x: 6, y: 36, items: ["Vaqt orttirmasi: 10:30 − 8:30 = 2 soat", "Yoʻl orttirmasi: 110 km"] },
        { t: 'icon', x: 88, y: 50, emoji: '🚌', size: 'm' },
        { t: 'formula', x: 8, y: 62, text: "110 km : 2 soat = 55 km/soat" }
      ],
      next: "Oson ekan!"
    }
  ],
  summary: [
    "Orttirma = oxirgi qiymat − boshlangʻich qiymat.",
    "Ikki miqdor orttirmalarining nisbati «bir birlikka qancha toʻgʻri keladi» degani: km/soat, soʻz/daqiqa, litr/100 km.",
    "Bogʻlanish chiziqli boʻlsa, nisbat har qanday oraliqda bir xil; grafigi — toʻgʻri chiziq.",
    "Chiziqli boʻlmasa, nisbat qaysi oraliqni olishimizga bogʻliq; grafigi — egri chiziq."
  ],
  questions: [
    {
      id: 'm1q1',
      prompt: "Velosipedchi 3 soatda 54 km yoʻl bosdi. Uning oʻrtacha tezligi necha km/soat?",
      hint: "Yoʻl orttirmasini vaqt orttirmasiga boʻling.",
      explanation: "54 : 3 = 18 km/soat.",
      widget: { type: 'number_answer', props: { answer: 18, unit: 'km/soat' } }
    },
    {
      id: 'm1q2',
      prompt: "Yurak bir daqiqada 72 marta uradi. Bir soatda necha marta uradi?",
      hint: "1 soat = 60 daqiqa.",
      explanation: "72 · 60 = 4320 marta.",
      widget: { type: 'number_answer', props: { answer: 4320, unit: 'marta' } }
    },
    {
      id: 'm1q3',
      prompt: "Har bir kattalikni oʻz oʻlchov birligi bilan juftlang.",
      hint: "Birlik «nima nimaga boʻlinganini» koʻrsatadi.",
      explanation: "Tezlik — km/soat, yoqilgʻi sarfi — litr/100 km, matn terish tezligi — soʻz/daqiqa, puls — zarba/daqiqa.",
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Tezlik', right: 'km/soat' },
            { left: 'Yoqilgʻi sarfi', right: 'litr/100 km' },
            { left: 'Matn terish tezligi', right: 'soʻz/daqiqa' },
            { left: 'Puls', right: 'zarba/daqiqa' }
          ]
        }
      }
    },
    {
      id: 'm1q4',
      prompt: "Telefon zaryadi 20 daqiqada 30% dan 70% ga koʻtarildi. Har daqiqada oʻrtacha necha foiz qoʻshilgan?",
      hint: "Avval zaryad orttirmasini toping: 70 − 30.",
      explanation: "(70 − 30) : 20 = 40 : 20 = 2% daqiqasiga.",
      widget: { type: 'number_answer', props: { answer: 2, unit: '% / daqiqa' } }
    },
    {
      id: 'm1q5',
      prompt: "Dilnoza 400 soʻz terib, 6 ta xato qildi. Har 100 soʻzga oʻrtacha nechta xato toʻgʻri keladi?",
      hint: "400 soʻz — bu 4 ta «yuzlik».",
      explanation: "6 : 4 = 1,5 ta xato har 100 soʻzga (yaʼni 0,015 xato/soʻz).",
      widget: { type: 'number_answer', props: { answer: 1.5, unit: 'xato' } }
    },
    {
      id: 'm1q6',
      prompt: "Har bir gap toʻgʻrimi yoki notoʻgʻrimi?",
      hint: "Chiziqli bogʻlanishda grafik qanday boʻlishini eslang.",
      explanation: "Silindrda sath tekis oʻsadi (toʻgʻri chiziq). Chiziqli bogʻlanishda nisbat oʻzgarmaydi. Tepasi keng stakanda sath tobora sekinroq koʻtariladi.",
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: "Silindrsimon idish bir xil oqimda toʻlsa, suv sathi grafigi toʻgʻri chiziq boʻladi.", value: true },
            { text: "Chiziqli bogʻlanishda orttirmalar nisbati turli oraliqlarda turlicha boʻladi.", value: false },
            { text: "Orttirma = oxirgi qiymat − boshlangʻich qiymat.", value: true },
            { text: "Tepasi kengayib boruvchi stakanda suv sathi tobora tezroq koʻtariladi.", value: false }
          ]
        }
      }
    },
    {
      id: 'm1q7',
      prompt: "Silindr shaklidagi idish bir xil oqim bilan toʻldirilmoqda. Suv sathi vaqt oʻtishi bilan qaysi grafikdagidek oʻzgaradi?",
      hint: "Idishning eni hamma joyda bir xil.",
      explanation: "Har daqiqada sath bir xil koʻtariladi, shuning uchun grafik — toʻgʻri chiziq (b).",
      widget: {
        type: 'graph_choose',
        props: {
          answer: 'b',
          graphs: [
            { id: 'a', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 'vaqt', ylabel: 'sath', curves: [{ points: [[0, 0], [1, 0.3], [2, 1.3], [3, 2.9], [4, 5.1], [5, 8]] }] } },
            { id: 'b', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 'vaqt', ylabel: 'sath', curves: [{ points: [[0, 0], [5, 8]] }] } },
            { id: 'c', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 'vaqt', ylabel: 'sath', curves: [{ points: [[0, 0], [0.5, 2.5], [1, 3.6], [2, 5], [3, 6.1], [4, 7], [5, 7.7]] }] } },
            { id: 'd', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 'vaqt', ylabel: 'sath', curves: [{ points: [[0, 0], [2, 6]] }, { points: [[2, 6], [5, 6]] }] } }
          ]
        }
      }
    },
    {
      id: 'm1q8',
      prompt: "Pasti tor, tepasi keng stakan bir xil oqim bilan toʻldirilmoqda. Qaysi grafik mos keladi?",
      hint: "Tor joyda sath tez, keng joyda sekin koʻtariladi.",
      explanation: "Avval tez, keyin sekin oʻsish — avval tik, keyin yotiqlashadigan egri chiziq (c).",
      widget: {
        type: 'graph_choose',
        props: {
          answer: 'c',
          graphs: [
            { id: 'a', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 'vaqt', ylabel: 'sath', curves: [{ points: [[0, 0], [2, 6]] }, { points: [[2, 6], [5, 6]] }] } },
            { id: 'b', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 'vaqt', ylabel: 'sath', curves: [{ points: [[0, 0], [1, 0.3], [2, 1.3], [3, 2.9], [4, 5.1], [5, 8]] }] } },
            { id: 'c', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 'vaqt', ylabel: 'sath', curves: [{ points: [[0, 0], [0.5, 2.5], [1, 3.6], [2, 5], [3, 6.1], [4, 7], [5, 7.7]] }] } },
            { id: 'd', graph: { xmin: 0, xmax: 5, ymin: 0, ymax: 9, xlabel: 'vaqt', ylabel: 'sath', curves: [{ points: [[0, 0], [5, 8]] }] } }
          ]
        }
      }
    },
    {
      id: 'm1q9',
      prompt: "Avtomobil 40 000 km yurganda shina protektorining chuqurligi 8 mm dan 3 mm gacha kamaydi. Har 1000 km da oʻrtacha necha mm yeyilgan?",
      hint: "Chuqurlik orttirmasi: 8 − 3 = 5 mm. 40 000 km — bu nechta «mingtalik»?",
      explanation: "5 mm : 40 = 0,125 mm har 1000 km ga.",
      widget: { type: 'number_answer', props: { answer: 0.125, tolerance: 0.0005, unit: 'mm' } }
    },
    {
      id: 'm1q10',
      prompt: "Oʻrtacha tezlikni topish bosqichlarini toʻgʻri tartibda bosing.",
      hint: "Avval ikkala orttirmani toping.",
      explanation: "Yoʻl orttirmasi → vaqt orttirmasi → ularni boʻlish → birlikni yozish.",
      widget: {
        type: 'step_order',
        props: {
          steps: [
            "Yoʻl orttirmasini toping",
            "Vaqt orttirmasini toping",
            "Yoʻl orttirmasini vaqt orttirmasiga boʻling",
            "Birligini yozing (masalan, km/soat)"
          ]
        }
      }
    }
  ]
};
