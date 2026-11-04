import type { BoardLesson } from './types';
import { barMagnet, coil, meter, seg, vec } from './phys';

export const BOB2 = { kicker: 'II bob', title: 'Elektromagnit induksiya' };

/** Darslik: Fizika 11, 7-mavzu (26–28-betlar) — elektromagnit induksiya hodisasi, induksiya EYuK, Faradey qonuni, Lens qoidasi. */
export const FIZ_8: BoardLesson = {
  n: 8,
  label: '7',
  group: BOB2,
  title: 'Elektromagnit induksiya. Faradey qonuni',
  section: '7-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Velosiped gʻildiragiga tegib turgan kichkina dinamo-mashina batareyasiz chiroqni yoqadi. Gʻildirak qancha tez aylansa, chiroq shuncha yorqin. Bu yerda harakat elektr tokiga aylanmoqda! 1831-yilda Maykl Faradey magnit yordamida tok olish usulini kashf qildi — bu hodisa elektromagnit induksiya deyiladi.",
      easy: "Dinamo harakatni tokka aylantiradi — bu elektromagnit induksiya.",
      draw: [
        { t: 'title', text: 'Batareyasiz chiroq' },
        { t: 'icon', x: 16, y: 34, emoji: '🚲', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '💡', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['gʻildirak dinamoni aylantiradi', 'dinamo tok hosil qiladi', 'Faradey, 1831-yil'] }
      ],
      next: 'Faradey tajribasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gʻaltakni galvanometrga ulaymiz. Magnitni gʻaltak ichiga kiritayotganda strelka ogʻadi — tok paydo boʻldi. Magnit ichida tinch tursa, tok yoʻq. Magnitni sugʻurib olsak, strelka teskari tomonga ogʻadi. Gʻaltakni harakatlantirsak ham shunday. Demak, gʻaltakni kesib oʻtayotgan magnit oqimi oʻzgarsagina tok hosil boʻladi.",
      easy: "Magnit harakatlansa — tok bor, tinch tursa — tok yoʻq.",
      draw: [
        { t: 'title', text: 'Magnit va gʻaltak' },
        ...barMagnet('m', 4, 32, 20, 8),
        ...vec('v', 6, 46, 20, 46, 'purple', 'v'),
        ...coil(30, 36, 5, 3, 7),
        ...seg('w1', 30, 43, 30, 58),
        ...seg('w2', 30, 58, 32, 58),
        ...seg('w3', 42, 43, 42, 58),
        ...seg('w4', 42, 58, 40, 58),
        ...meter(36, 58),
        { t: 'list', x: 52, y: 28, items: ['magnit kirdi — tok bor', 'magnit tinch — tok yoʻq', 'chiqdi — tok teskari'] }
      ],
      next: 'Faradey qonuni'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oqim oʻzgarishi tufayli berk konturda tok hosil boʻlishi elektromagnit induksiya, bu tok esa induksion tok deyiladi. Tokni yurituvchi kuch — induksiya EYuK. Faradey qonuni: E teng minus delta F boʻlinsin delta t, yaʼni EYuK oqimning oʻzgarish tezligiga teng. Gʻaltakda N ta oʻram boʻlsa, EYuK N marta katta. Birligi — volt.",
      easy: "E = −ΔФ/Δt; N oʻramda E = −N·ΔФ/Δt. Birligi — volt.",
      draw: [
        { t: 'title', text: 'Induksiya EYuK' },
        { t: 'formula', x: 6, y: 22, text: 'E = − ΔФ / Δt' },
        { t: 'formula', x: 6, y: 38, text: 'E = − N · ΔФ / Δt' },
        { t: 'list', x: 6, y: 52, items: ['[E] = Wb/s = V', 'tok = E / R'] }
      ],
      next: 'Lens qoidasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Minus ishorasini Lens qoidasi tushuntiradi. Yengil alyuminiy halqaga magnit yaqinlashtirilsa, halqa undan qochadi; uzoqlashtirilsa, ergashadi. Kesik halqa esa qimirlamaydi — kontur berk emas, tok yoʻq. Qoida: induksion tok oʻz maydoni bilan uni hosil qilayotgan oqim oʻzgarishiga qarshilik qiladi.",
      easy: "Induksion tok oqim oʻzgarishiga qarshilik qiladi — Lens qoidasi.",
      draw: [
        { t: 'title', text: 'Lens qoidasi' },
        ...barMagnet('m2', 4, 34, 20, 8),
        ...vec('v2', 6, 48, 20, 48, 'purple', 'v'),
        { t: 'ellipse', cx: 34, cy: 38, rx: 3, ry: 9, color: 'red' },
        ...vec('Fq', 38, 38, 47, 38, 'red'),
        { t: 'text', x: 30, y: 56, text: 'halqa qochadi', color: 'red', size: 's' },
        { t: 'list', x: 54, y: 26, items: ['yaqinlashsa — qochadi', 'uzoqlashsa — ergashadi', 'kesik halqa — tok yoʻq'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Halqadan oʻtuvchi oqim 0,2 sekundda 5 milliveberga oʻzgardi, halqa qarshiligi 0,25 om. EYuK: 0,005 boʻlinsin 0,2, yaʼni 0,025 volt. Tok: 0,025 boʻlinsin 0,25, yaʼni 0,1 amper.",
      easy: "E = 0,005 / 0,2 = 0,025 V; I = 0,025 / 0,25 = 0,1 A.",
      draw: [
        { t: 'title', text: 'Induksion tok' },
        { t: 'list', x: 6, y: 20, items: ['ΔФ = 5 mWb, Δt = 0,2 s', 'R = 0,25 Ω', 'E = 0,005 / 0,2 = 0,025 V'] },
        { t: 'formula', x: 6, y: 52, text: 'I = E / R = 0,1 A' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Berk konturni kesib oʻtuvchi oqim oʻzgarganda unda induksion tok hosil boʻladi — elektromagnit induksiya.',
    'Faradey qonuni: E = −ΔФ/Δt, N oʻramda E = −N·ΔФ/Δt; birligi volt.',
    'Lens qoidasi: induksion tok oʻz maydoni bilan oqim oʻzgarishiga qarshilik qiladi.'
  ],
  questions: [
    {
      id: 'f8q1',
      prompt: 'Konturdagi oqim 0,4 s da 5 Wb dan 13 Wb gacha tekis oʻzgardi. Induksiya EYuK necha V?',
      hint: 'E = ΔФ / Δt.',
      explanation: '(13 − 5) / 0,4 = 20 V.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'V' } }
    },
    {
      id: 'f8q2',
      prompt: '250 oʻramli gʻaltakda oqim 0,4 s da 2 Wb ga oʻzgardi. EYuK necha V?',
      hint: 'E = N · ΔФ / Δt.',
      explanation: '250 · 2 / 0,4 = 1250 V.',
      widget: { type: 'number_answer', props: { answer: 1250, unit: 'V' } }
    },
    {
      id: 'f8q3',
      prompt: 'Oqimning oʻzgarish tezligi 0,15 Wb/s boʻlganda gʻaltakda 120 V EYuK hosil boʻldi. Oʻramlar soni nechta?',
      hint: 'N = E / (ΔФ/Δt).',
      explanation: '120 / 0,15 = 800.',
      widget: { type: 'number_answer', props: { answer: 800 } }
    },
    {
      id: 'f8q4',
      prompt: 'Qarshiligi 0,04 Ω konturdagi oqim 0,6 s da 0,012 Wb ga oʻzgardi. Tok necha A?',
      hint: 'I = ΔФ / (R · Δt).',
      explanation: '0,012 / 0,6 = 0,02 V; 0,02 / 0,04 = 0,5 A.',
      widget: { type: 'number_answer', props: { answer: 0.5, tolerance: 0.01, unit: 'A' } }
    },
    {
      id: 'f8q5',
      prompt: 'Elektromagnit induksiya hodisasini kim kashf qilgan?',
      hint: '1831-yil.',
      explanation: 'Maykl Faradey, 1831-yil.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Amper', 'Ersted', 'Faradey', 'Lens'], answerIndex: 2 } }
    },
    {
      id: 'f8q6',
      prompt: 'Nega kesik halqaga magnit yaqinlashtirilsa, halqa qimirlamaydi?',
      hint: 'Tok uchun nima kerak?',
      explanation: 'Kontur berk emas, shuning uchun induksion tok oqmaydi va maydon hosil boʻlmaydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Halqa juda ogʻir', 'Kontur berk emas — tok oqmaydi', 'Alyuminiy magnitlanmaydi', 'Magnit kuchsiz'], answerIndex: 1 } }
    },
    {
      id: 'f8q7',
      prompt: 'Qaysi holda gʻaltakda tok hosil boʻladi?',
      hint: 'Oqim oʻzgaryaptimi?',
      explanation: 'Magnit yoki gʻaltak harakatlansa oqim oʻzgaradi — tok bor. Hammasi tinch boʻlsa, tok yoʻq.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'y', label: 'Tok bor' },
            { id: 'n', label: 'Tok yoʻq' }
          ],
          items: [
            { emoji: '', label: 'magnitni gʻaltakka kiritish', bin: 'y' },
            { emoji: '', label: 'magnitni sugʻurib olish', bin: 'y' },
            { emoji: '', label: 'magnit ichida tinch turibdi', bin: 'n' },
            { emoji: '', label: 'gʻaltakni magnitga kiydirish', bin: 'y' },
            { emoji: '', label: 'magnit va gʻaltak birga tinch', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'f8q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Faradey va Lensni eslang.',
      explanation: 'Tok faqat oqim oʻzgarayotganda bor; oʻramlar koʻpaysa EYuK oshadi; induksion tok oʻzgarishga qarshilik qiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Induksion tok faqat oqim oʻzgarib turgan vaqtda mavjud.', value: true },
            { text: 'Oʻramlar soni 4 marta oshsa, EYuK 4 marta oshadi.', value: true },
            { text: 'Induksion tok oqim oʻzgarishini kuchaytiradi.', value: false },
            { text: 'Induksiya EYuK birligi — tesla.', value: false }
          ]
        }
      }
    }
  ]
};
