import type { BoardLesson } from './types';

/** Darslik (2-qism): 61–64-mavzu (37–40-betlar) — bosh toʻplam, tanlanma, parametr va statistika. */
export const MATH_50: BoardLesson = {
  n: 50,
  label: '61–62',
  part: 'algebra',
  qism: 2,
  title: 'Statistik maʼlumotlar: bosh toʻplam va tanlanma',
  section: '61–64',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Zavod bir kunda 10 ming dona goʻsht konservasi ishlab chiqardi. Konservaning oʻrtacha massasini bilish kerak. Har birini ochib tortamizmi? Unda sotishga hech narsa qolmaydi! Buning oʻrniga tavakkaliga 200 tasini olib tekshiramiz va natijani hamma konservaga tatbiq qilamiz. Bu usul tanlanma kuzatish deyiladi.",
      easy: "Hammasini tekshirish qimmat — tavakkaliga bir qismini olib tekshiramiz.",
      draw: [
        { t: 'title', text: '10 000 ta konserva' },
        { t: 'icon', x: 12, y: 32, emoji: '🥫', size: 'l' },
        { t: 'list', x: 28, y: 22, items: ['hammasini tekshirish — qimmat va uzoq', 'tavakkaliga 200 tasini olamiz', 'oʻrtachasini hammasiga tatbiq qilamiz'] },
        { t: 'text', x: 28, y: 52, text: 'tanlanma kuzatish', color: 'green' }
      ],
      next: 'Ikki toʻplam'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻrganilishi kerak boʻlgan barcha obyektlar bosh toʻplam deyiladi — bizda 10 ming konserva. Undan ajratib olingan qism tanlanma toʻplam yoki tanlanma deyiladi — 200 ta konserva. Toʻplamdagi obyektlar soni uning hajmi: bosh toʻplam hajmi N teng 10 ming, tanlanma hajmi kichik n teng 200.",
      easy: "Hammasi — bosh toʻplam (N), olingan qismi — tanlanma (n).",
      draw: [
        { t: 'title', text: 'Bosh toʻplam va tanlanma' },
        { t: 'ellipse', cx: 28, cy: 42, rx: 23, ry: 18, color: 'blue' },
        { t: 'ellipse', cx: 34, cy: 46, rx: 9, ry: 7, color: 'red' },
        { t: 'text', x: 12, y: 32, text: 'bosh toʻplam', color: 'blue', size: 's' },
        { t: 'text', x: 34, y: 47, text: 'tanlanma', color: 'red', size: 's', anchor: 'middle' },
        { t: 'list', x: 58, y: 26, items: ['N = 10 000', 'n = 200'] },
        { t: 'text', x: 58, y: 48, text: 'hajm — obyektlar soni', size: 's', color: 'purple' }
      ],
      next: 'Maʼlumot turlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Har bir obyektni tavsiflovchi sifat yoki miqdor koʻrsatkichlari statistik maʼlumotlar deyiladi. Ular har doim ham son boʻlmaydi: avtomashina rangi, rusumi — bu sifat, yaʼni kvalitativ maʼlumot. Massa, yosh, yoqilgʻi sarfi — bu miqdor, yaʼni kvantitativ maʼlumot.",
      easy: "Sifat (rang, rusum) — kvalitativ. Son (massa, yosh) — kvantitativ.",
      draw: [
        { t: 'title', text: 'Sifat yoki miqdor?' },
        {
          t: 'table',
          x: 8,
          y: 18,
          rows: [
            ['kvalitativ (sifat)', 'kvantitativ (miqdor)'],
            ['mashina rangi', 'konserva massasi'],
            ['soch rangi', 'oʻquvchi yoshi'],
            ['partiyaga mansublik', 'yoqilgʻi sarfi']
          ]
        },
        { t: 'icon', x: 84, y: 30, emoji: '🚗', size: 'l' }
      ],
      next: 'Parametr va statistika'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bosh toʻplamning butun xarakteristikasi parametr deyiladi: masalan, barcha 10 ming konservaning oʻrtacha massasi μ. Uni aniq bilmaymiz. Tanlanmadan hisoblangan kattalik esa statistika deyiladi: 200 ta konservaning oʻrtacha massasi. Statistikaga qarab parametrni taxminan baholaymiz.",
      easy: "Parametr — bosh toʻplamniki (nomaʼlum), statistika — tanlanmaniki (hisoblanadi).",
      draw: [
        { t: 'title', text: 'Parametr va statistika' },
        { t: 'list', x: 6, y: 20, items: ['parametr: μ — barcha konservalar oʻrtachasi', 'statistika: 200 ta konserva oʻrtachasi'] },
        { t: 'formula', x: 6, y: 40, text: 'statistika ≈ parametr' },
        { t: 'text', x: 6, y: 58, text: 'statistika → parametrni baholaymiz', color: 'purple' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "8-masala. Sotsiolog hududdagi qizlarning qancha qismi sport bilan shugʻullanishini bilmoqchi. Tavakkaliga olingan 1320 nafar qizdan 145 nafari sportchi chiqdi, bu taxminan 11 foiz. Bosh toʻplam — hududdagi barcha qizlar. Parametr — ular orasida sportchilar ulushi. Statistika — tanlanmadagi ulush, 11 foiz. Parametrni aniq bilmaymiz, faqat taxminan 11 foiz deymiz.",
      easy: "145 : 1320 ≈ 11%. Bu statistika; butun hudud uchun ulush taxminan shuncha.",
      draw: [
        { t: 'title', text: 'Sport bilan shugʻullanuvchi qizlar' },
        { t: 'icon', x: 12, y: 30, emoji: '🏃‍♀️', size: 'l' },
        { t: 'list', x: 28, y: 20, items: ['bosh toʻplam: hududdagi barcha qizlar', 'tanlanma: n = 1320', 'statistika: 145 : 1320 ≈ 11%'] },
        { t: 'text', x: 28, y: 50, text: 'parametr ≈ 11% (aniq emas)', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Bosh toʻplam — oʻrganiladigan barcha obyektlar; tanlanma — undan olingan qism.',
    'Maʼlumotlar kvalitativ (sifat) yoki kvantitativ (miqdor) boʻladi.',
    'Parametr bosh toʻplamni, statistika tanlanmani tavsiflaydi; statistika parametrni baholaydi.'
  ],
  questions: [
    {
      id: 'p50q1',
      prompt: 'Maʼlumotlarni ajrating: sifat yoki miqdor?',
      hint: 'Son bilan oʻlchanadimi?',
      explanation: 'Rang, jins, partiya — sifat; yosh, massa, yoqilgʻi sarfi — miqdor.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'q', label: 'Kvalitativ' },
            { id: 'n', label: 'Kvantitativ' }
          ],
          items: [
            { emoji: '', label: 'oʻquvchilarning soch rangi', bin: 'q' },
            { emoji: '', label: 'kasallarning jinsi', bin: 'q' },
            { emoji: '', label: 'mashina rusumi', bin: 'q' },
            { emoji: '', label: 'oʻquvchilarning yoshi', bin: 'n' },
            { emoji: '', label: 'yoqilgʻi sarfi', bin: 'n' },
            { emoji: '', label: 'chaqaloq vazni', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'p50q2',
      prompt: '1320 nafar qizdan 145 nafari sport bilan shugʻullanadi. Bu necha foiz? (0,1 gacha)',
      hint: '145 : 1320 · 100.',
      explanation: '145 : 1320 ≈ 0,11 → taxminan 11%.',
      widget: { type: 'number_answer', props: { answer: 10.98, tolerance: 0.15, unit: '%' } }
    },
    {
      id: 'p50q3',
      prompt: 'Qaysi holda tanlanma kuzatish qulayroq?',
      hint: 'Obyektlar juda koʻp boʻlsa, hammasini tekshirib boʻlmaydi.',
      explanation: 'Oʻzbekistondagi barcha oʻquvchilarni tekshirish juda qiyin, shuning uchun tanlanma olinadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Doʻstlaringizning oʻrtacha bahosi', 'Oʻzbekistondagi oʻquvchilarning oʻrtacha bahosi', 'Mahallangizdagi mashinalar rangi', 'Sinfingizdagi oʻquvchilar soni'], answerIndex: 1 } }
    },
    {
      id: 'p50q4',
      prompt: 'Tushunchani taʼrifi bilan moslang.',
      hint: 'Bosh toʻplam — hammasi.',
      explanation: 'Bosh toʻplam — barcha obyektlar; tanlanma — olingan qism; parametr — bosh toʻplam xarakteristikasi; statistika — tanlanmadan hisoblangan kattalik.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Bosh toʻplam', right: 'barcha obyektlar' },
            { left: 'Tanlanma', right: 'ajratib olingan qism' },
            { left: 'Parametr', right: 'bosh toʻplam xarakteristikasi' },
            { left: 'Statistika', right: 'tanlanmadan hisoblangan kattalik' }
          ]
        }
      }
    },
    {
      id: 'p50q5',
      prompt: '10 000 ta konservadan 200 tasi tekshirildi. Tanlanma hajmi n nechaga teng?',
      hint: 'Tanlanmadagi obyektlar soni.',
      explanation: 'n = 200 (bosh toʻplam hajmi N = 10 000).',
      widget: { type: 'number_answer', props: { answer: 200 } }
    },
    {
      id: 'p50q6',
      prompt: 'Tadqiqotchi 235 nafar chaqaloqning oʻrtacha vaznini 3 kg 270 g deb topdi. Qaysi gaplar toʻgʻri? Hammasini belgilang.',
      hint: '235 nafar — tanlanma.',
      explanation: '3 270 g — statistika; barcha chaqaloqlarning oʻrtacha vazni — parametr, uni aniq bilmaymiz.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: '3 kg 270 g — statistika', correct: true },
            { label: 'tanlanma hajmi 235', correct: true },
            { label: 'parametrni aniq bilamiz' },
            { label: 'bosh toʻplam — 235 nafar chaqaloq' },
            { label: 'parametr — barcha chaqaloqlarning oʻrtacha vazni', correct: true }
          ]
        }
      }
    },
    {
      id: 'p50q7',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Statistik maʼlumot son boʻlishi shartmi?',
      explanation: 'Maʼlumot son boʻlmasligi ham mumkin; tanlanma bosh toʻplamning qismi; statistika parametrni baholaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Statistik maʼlumotlar har doim son boʻladi.', value: false },
            { text: 'Tanlanma — bosh toʻplamning bir qismi.', value: true },
            { text: 'Statistikaga qarab parametrni taxminan baholash mumkin.', value: true },
            { text: 'Tanlanma hajmi bosh toʻplam hajmidan katta boʻladi.', value: false }
          ]
        }
      }
    },
    {
      id: 'p50q8',
      prompt: 'Ortiqchasini toping.',
      hint: 'Uchtasi miqdor.',
      explanation: 'Mashina rangi — sifat (kvalitativ), qolganlari miqdor.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'boʻy, cm' }, { text: 'massa, kg' }, { text: 'mashina rangi', odd: true }, { text: 'yosh, yil' }] } }
    }
  ]
};
