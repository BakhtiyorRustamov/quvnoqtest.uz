import type { BoardLesson } from './types';
import { BOB4 } from './fizika-23';
import { rect, seg, vec, wave } from './phys';

/** Darslik: Fizika 11, 28-mavzu (103–106-betlar) — yorugʻlikning qutblanishi, Malyus qonuni. */
export const FIZ_30: BoardLesson = {
  n: 30,
  label: '28',
  group: BOB4,
  title: 'Yorugʻlikning qutblanishi',
  section: '28-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Baliqchilar va haydovchilar maxsus qutblovchi koʻzoynak taqishadi: suv yoki yoʻl sirtidagi koʻzni qamashtiruvchi yaltirash yoʻqoladi va hovuz tagidagi baliq ham koʻrinadi. Bunday koʻzoynak yorugʻlikning faqat bir yoʻnalishda tebranayotgan qismini oʻtkazadi. Bu qanday ishlaydi?",
      easy: "Qutblovchi koʻzoynak yaltirashni yoʻqotadi.",
      draw: [
        { t: 'title', text: 'Sehrli koʻzoynak' },
        { t: 'icon', x: 16, y: 34, emoji: '🕶️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🎣', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['suv yaltirashi yoʻqoladi', 'hovuz tagi koʻrinadi', 'bir yoʻnalishdagi tebranish oʻtadi'] }
      ],
      next: 'Turmalin tajribasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Turmalin kristalidan kesilgan plastinkani nurga tik qoʻyib aylantirsak, oʻtgan yorugʻlik oʻzgarmaydi. Endi uning orqasiga ikkinchi plastinka qoʻyamiz va faqat ikkinchisini aylantiramiz. Yorugʻlik goh kuchayib, goh nolgacha kamayadi: plastinkalar oʻqlari parallel boʻlsa — eng yorugʻ, tik boʻlsa — qorongʻi.",
      easy: "Ikkinchi plastinka aylansa, yorugʻlik nolgacha kamayadi.",
      draw: [
        { t: 'title', text: 'Ikki turmalin plastinka' },
        ...vec('l0', 4, 42, 22, 42, 'orange'),
        ...rect('t1', 24, 30, 4, 24, 'purple'),
        { t: 'text', x: 22, y: 26, text: 'T₁', size: 's' },
        ...vec('l1', 30, 42, 52, 42, 'orange'),
        ...rect('t2', 54, 30, 4, 24, 'purple'),
        { t: 'text', x: 52, y: 26, text: 'T₂', size: 's' },
        ...vec('l2', 60, 42, 70, 42, 'orange'),
        { t: 'list', x: 73, y: 34, items: ['∥ — yorugʻ', '⊥ — qorongʻi'] }
      ],
      next: 'Koʻndalang toʻlqin'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Buni arqon misolida tushunamiz: arqondagi koʻndalang toʻlqin ikki panjara tirqishi parallel boʻlsa oʻtadi, ikkinchi panjara koʻndalang qoʻyilsa — toʻxtaydi. Boʻylama toʻlqin esa har doim oʻtar edi. Demak, yorugʻlik — koʻndalang toʻlqin! Tabiiy yorugʻlikda E vektori har tomonga tartibsiz tebranadi; birinchi plastinkadan keyin u faqat bitta tekislikda tebranadi — bu qutblangan yorugʻlik.",
      easy: "Yorugʻlik koʻndalang toʻlqin; polyarizatordan keyin — qutblangan yorugʻlik.",
      draw: [
        { t: 'title', text: 'Tabiiy va qutblangan yorugʻlik' },
        ...vec('n1', 16, 42, 16, 30, 'red'),
        ...vec('n2', 16, 42, 16, 54, 'red'),
        ...vec('n3', 16, 42, 26, 36, 'red'),
        ...vec('n4', 16, 42, 6, 48, 'red'),
        ...vec('n5', 16, 42, 26, 48, 'red'),
        ...vec('n6', 16, 42, 6, 36, 'red'),
        { t: 'text', x: 4, y: 62, text: 'tabiiy', size: 's' },
        ...seg('pol', 44, 28, 44, 56, 'purple', true),
        { t: 'text', x: 36, y: 62, text: 'polyarizator', size: 's', color: 'purple' },
        ...vec('q1', 72, 42, 72, 30, 'red'),
        ...vec('q2', 72, 42, 72, 54, 'red'),
        { t: 'text', x: 64, y: 62, text: 'qutblangan', size: 's' }
      ],
      next: 'Malyus qonuni'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikkinchi plastinka — analizator. Undan oʻtgan yorugʻlik intensivligi Malyus qonuni bilan aniqlanadi: I teng I nol karra kosinus kvadrat alfa, bunda alfa — polyarizator va analizator oʻqlari orasidagi burchak. Alfa nol boʻlsa — toʻliq oʻtadi, 90 gradusda — umuman oʻtmaydi, 60 gradusda — chorak qismi oʻtadi.",
      easy: "Malyus qonuni: I = I₀ · cos² α.",
      draw: [
        { t: 'title', text: 'Malyus qonuni' },
        { t: 'formula', x: 4, y: 22, text: 'I = I₀ · cos² α' },
        { t: 'axes', id: 'g', x: 46, y: 18, w: 48, h: 40, xmin: 0, xmax: 180, ymin: 0, ymax: 1.1, xlabel: 'α, °', ylabel: 'I / I₀' },
        { t: 'curve', axes: 'g', points: wave((a) => Math.cos((a * Math.PI) / 180) ** 2, 0, 180), color: 'blue' },
        { t: 'list', x: 4, y: 36, items: ['α = 0° → I = I₀', 'α = 60° → I = I₀/4', 'α = 90° → I = 0'] }
      ],
      next: 'Qoʻllanilishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tabiiy yorugʻlikni qutblovchi asbob — polyarizator, qutblanishni tekshiruvchi — analizator. Ular turmalin, island shpati kristallaridan yoki selluloidga yopishtirilgan yupqa plyonkadan — polyaroiddan yasaladi. Qutblangan yorugʻlik sifatli fotosuratlar olishda, eritmadagi qand va oqsil konsentratsiyasini aniqlashda, quyosh koʻzoynaklarida va suyuq kristalli ekranlarda ishlatiladi.",
      easy: "Polyaroid: koʻzoynak, fotoapparat, ekran, qand konsentratsiyasi.",
      draw: [
        { t: 'title', text: 'Qoʻllanilishi' },
        { t: 'icon', x: 16, y: 34, emoji: '📷', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🧪', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['polyaroid koʻzoynaklar', 'sifatli fotosuratlar', 'qand konsentratsiyasini aniqlash', 'suyuq kristalli ekranlar'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Polyarizatordan intensivligi 80 vatt boʻlinsin metr kvadrat qutblangan yorugʻlik chiqmoqda. Analizator 60 gradusga burilgan. Oʻtgan intensivlik: 80 karra kosinus kvadrat 60, yaʼni 80 karra 0,25 — 20 vatt boʻlinsin metr kvadrat.",
      easy: "I = 80 · cos² 60° = 80 · 0,25 = 20 W/m².",
      draw: [
        { t: 'title', text: 'Analizatordan oʻtgan nur' },
        { t: 'list', x: 6, y: 20, items: ['I₀ = 80 W/m²', 'α = 60°, cos 60° = 0,5'] },
        { t: 'formula', x: 6, y: 46, text: 'I = 80 · 0,5² = 20 W/m²' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ikki turmalin plastinka tajribasi yorugʻlik koʻndalang toʻlqin ekanini koʻrsatadi.',
    'Polyarizatordan keyin E vektori bitta tekislikda tebranadi — qutblangan yorugʻlik.',
    'Malyus qonuni: I = I₀·cos² α; polyaroidlar koʻzoynak, foto, ekran va kimyoviy tahlilda ishlatiladi.'
  ],
  questions: [
    {
      id: 'f30q1',
      prompt: 'Qutblangan nur intensivligi 100 W/m², analizator 45° ga burilgan. Oʻtgan intensivlik necha W/m²?',
      hint: 'cos² 45° = 0,5.',
      explanation: '100 · 0,5 = 50 W/m².',
      widget: { type: 'number_answer', props: { answer: 50, unit: 'W/m²' } }
    },
    {
      id: 'f30q2',
      prompt: 'Analizatordan qutblangan nurning 75 % i oʻtishi uchun burchak necha gradus boʻlishi kerak?',
      hint: 'cos² α = 0,75.',
      explanation: 'cos α = √0,75 ≈ 0,866 → α = 30°.',
      widget: { type: 'number_answer', props: { answer: 30, tolerance: 0.5, unit: '°' } }
    },
    {
      id: 'f30q3',
      prompt: 'Polyarizator va analizator oʻqlari oʻzaro tik. Qancha yorugʻlik oʻtadi?',
      hint: 'cos 90° = 0.',
      explanation: 'I = 0 — yorugʻlik oʻtmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['hammasi', 'yarmi', 'choragi', 'umuman oʻtmaydi'], answerIndex: 3 } }
    },
    {
      id: 'f30q4',
      prompt: 'Qaysi hodisa yorugʻlik koʻndalang toʻlqin ekanini tasdiqlaydi?',
      hint: 'Boʻylama toʻlqin bunday qilmaydi.',
      explanation: 'Qutblanish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['difraksiya', 'dispersiya', 'interferensiya', 'qutblanish'], answerIndex: 3 } }
    },
    {
      id: 'f30q5',
      prompt: 'Asbobni vazifasi bilan moslang.',
      hint: 'Biri qutblaydi, biri tekshiradi.',
      explanation: 'Polyarizator — tabiiy nurni qutblaydi; analizator — qutblanishni tekshiradi; polyaroid — yupqa qutblovchi plyonka.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'polyarizator', right: 'tabiiy nurni qutblaydi' },
            { left: 'analizator', right: 'qutblanishni tekshiradi' },
            { left: 'polyaroid', right: 'yupqa qutblovchi plyonka' }
          ]
        }
      }
    },
    {
      id: 'f30q6',
      prompt: 'Analizator burchagini 0° dan 90° gacha oshirsak, oʻtgan yorugʻlik qanday oʻzgaradi?',
      hint: 'cos² α kamayadi.',
      explanation: 'Eng kattadan nolgacha kamayadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Oshadi', 'Nolgacha kamayadi', 'Oʻzgarmaydi', 'Avval kamayib, keyin oshadi'], answerIndex: 1 } }
    },
    {
      id: 'f30q7',
      prompt: 'Qutblangan yorugʻlik qayerlarda ishlatiladi? Belgilang.',
      hint: 'Koʻzoynak, foto, ekran, kimyo.',
      explanation: 'Koʻzoynak, fotosurat, qand konsentratsiyasi, suyuq kristalli ekran — ha; rentgen surati — yoʻq.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'quyosh koʻzoynagi', correct: true },
            { label: 'qand konsentratsiyasini aniqlash', correct: true },
            { label: 'suyuq kristalli ekran', correct: true },
            { label: 'rentgen surati' },
            { label: 'sifatli fotosurat', correct: true }
          ]
        }
      }
    },
    {
      id: 'f30q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tabiiy yorugʻlikda E tartibsiz.',
      explanation: 'Tabiiy yorugʻlikda E har tomonga tebranadi; bitta plastinkani aylantirsak, intensivlik oʻzgarmaydi; Yung va Frenel avval yorugʻlikni boʻylama deb oʻylashgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Tabiiy yorugʻlikda E vektori barcha yoʻnalishlarda tebranadi.', value: true },
            { text: 'Bitta plastinkani aylantirganda oʻtgan yorugʻlik intensivligi oʻzgaradi.', value: false },
            { text: 'Qutblangan yorugʻlikda E vektori bitta tekislikda tebranadi.', value: true },
            { text: 'Boʻylama toʻlqinlarni ham qutblash mumkin.', value: false }
          ]
        }
      }
    }
  ]
};
