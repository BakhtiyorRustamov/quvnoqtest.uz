import type { BoardLesson } from './types';
import { wave } from './phys';

export const BOB6 = { kicker: 'VI bob', title: 'Kvant fizikasi' };

// black-body spectrum shape (λ in μm), hc/k = 14388 μm·K
const planck = (T: number) => (l: number) => 1 / l ** 5 / (Math.exp(14388 / (l * T)) - 1);

/** Darslik: Fizika 11, 34-mavzu (135–136-betlar) — kvant fizikasining paydo boʻlishi: issiqlik nurlanishi, Vin qonuni, Plank gipotezasi. */
export const FIZ_36: BoardLesson = {
  n: 36,
  label: '34',
  group: BOB6,
  title: 'Kvant fizikasining paydo boʻlishi',
  section: '34-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Temirchi temirni qizdirganda u avval qip-qizil, keyin sariq, juda qiziganda oqish-havorang boʻlib nurlanadi. Yulduzlar ham rangiga qarab: qizil yulduzlar sovuqroq, havoranglari — juda issiq. Nega rang temperaturaga bogʻliq? XX asr boshida klassik fizika bunga javob bera olmadi va yangi fizika — kvant fizikasi tugʻildi.",
      easy: "Qizigan temir rangi temperaturaga bogʻliq — buni kvant fizikasi tushuntiradi.",
      draw: [
        { t: 'title', text: 'Qizigan temir rangi' },
        { t: 'icon', x: 16, y: 34, emoji: '🔥', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⭐', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['qizil → sariq → oqish', 'qizil yulduz — sovuqroq', 'havorang yulduz — issiq'] }
      ],
      next: 'Klassik fizika muammolari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "XX asr boshida fizikada inqiroz yuz berdi. Issiqlik nurlanishining toʻlqin uzunligi boʻyicha taqsimotini klassik nazariya faqat uzun toʻlqinlarda tushuntira oldi, qisqa toʻlqinlarda tajribaga zid keldi. Gazlarning chiziqli spektrlari, fotoeffekt, yorugʻlik bosimi kabi hodisalarni ham Maksvell nazariyasi tushuntira olmadi.",
      easy: "Issiqlik nurlanishi, chiziqli spektrlar, fotoeffekt — klassik fizika tushuntira olmadi.",
      draw: [
        { t: 'title', text: 'Klassik fizika inqirozi' },
        { t: 'list', x: 6, y: 22, items: ['issiqlik nurlanishi spektri', 'gazlarning chiziqli spektri', 'fotoeffekt', 'yorugʻlik bosimi'] },
        { t: 'text', x: 6, y: 60, text: 'klassik nazariya — ojiz', color: 'red' }
      ],
      next: 'Vin qonuni'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Qizigan jism turli toʻlqin uzunliklarida turlicha energiya nurlantiradi. Grafikdagi har bir egri chiziq bitta temperatura uchun. Temperatura oshsa, nurlanish kuchayadi va choʻqqi qisqa toʻlqinlar tomon siljiydi — Vin siljish qonuni: lambda max karra T teng b, b taxminan 2,9 karra 10 ning minus 3 darajasi metr kelvin. Quyoshning choʻqqisi taxminan 470 nanometrda.",
      easy: "Vin qonuni: λmax · T = b ≈ 2,9·10⁻³ m·K.",
      draw: [
        { t: 'title', text: 'Vin siljish qonuni' },
        { t: 'axes', id: 'g', x: 8, y: 18, w: 56, h: 44, xmin: 0, xmax: 2, ymin: 0, ymax: 0.3, xlabel: 'λ, μm', ylabel: 'nurlanish' },
        { t: 'curve', axes: 'g', points: wave(planck(6000), 0.15, 2, 80), color: 'blue' },
        { t: 'curve', axes: 'g', points: wave(planck(5000), 0.15, 2, 80), color: 'green' },
        { t: 'curve', axes: 'g', points: wave(planck(4000), 0.15, 2, 80), color: 'red' },
        { t: 'formula', x: 68, y: 26, text: 'λmax · T = b' },
        { t: 'list', x: 68, y: 38, items: ['6000 K — koʻk', '5000 K — yashil', '4000 K — qizil'] }
      ],
      next: 'Plank gipotezasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1900-yilda Maks Plank inqilobiy gʻoyani ilgari surdi: jism energiyani uzluksiz emas, alohida porsiyalar — kvantlar bilan nurlantiradi va yutadi. Kvant energiyasi chastotaga proporsional: E teng h nu, bunda h — Plank doimiysi, 6,63 karra 10 ning minus 34 darajasi joul sekund. Shu gʻoya bilan Plank nurlanish taqsimotini toʻliq tushuntirdi.",
      easy: "Plank: energiya kvantlar bilan; E = h·ν, h = 6,63·10⁻³⁴ J·s.",
      draw: [
        { t: 'title', text: 'Plank gipotezasi (1900)' },
        { t: 'formula', x: 6, y: 24, text: 'E = h · ν = h c / λ' },
        { t: 'list', x: 6, y: 40, items: ['h = 6,63 · 10⁻³⁴ J·s', 'energiya — porsiyalar (kvantlar)', 'kvant — eng kichik porsiya'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Toʻlqin uzunligi 500 nanometr boʻlgan yashil yorugʻlik kvantining energiyasini topamiz: E teng h c boʻlinsin lambda — 6,63 karra 10 ning minus 34 darajasi karra 3 karra 10 ning 8 darajasi boʻlinsin 5 karra 10 ning minus 7 darajasi, taxminan 4 karra 10 ning minus 19 darajasi joul, yaʼni taxminan 2,5 elektronvolt.",
      easy: "E = hc/λ ≈ 4·10⁻¹⁹ J ≈ 2,5 eV.",
      draw: [
        { t: 'title', text: 'Bitta kvant energiyasi' },
        { t: 'list', x: 6, y: 20, items: ['λ = 500 nm = 5 · 10⁻⁷ m', '1 eV = 1,6 · 10⁻¹⁹ J'] },
        { t: 'formula', x: 6, y: 46, text: 'E = h c / λ ≈ 4 · 10⁻¹⁹ J ≈ 2,5 eV' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'XX asr boshida issiqlik nurlanishi, chiziqli spektrlar va fotoeffektni klassik fizika tushuntira olmadi.',
    'Vin siljish qonuni: λmax · T = b ≈ 2,9·10⁻³ m·K — temperatura oshsa, nurlanish choʻqqisi qisqa toʻlqinlarga siljiydi.',
    'Plank: energiya kvantlar bilan nurlanadi va yutiladi, E = hν, h = 6,63·10⁻³⁴ J·s.'
  ],
  questions: [
    {
      id: 'f36q1',
      prompt: 'Toʻlqin uzunligi 3·10⁻⁷ m yorugʻlik kvantining energiyasi necha ·10⁻¹⁹ J? (0,1 gacha)',
      hint: 'E = hc/λ.',
      explanation: '6,63·10⁻³⁴ · 3·10⁸ / 3·10⁻⁷ ≈ 6,6·10⁻¹⁹ J.',
      widget: { type: 'number_answer', props: { answer: 6.63, tolerance: 0.1, unit: '·10⁻¹⁹ J' } }
    },
    {
      id: 'f36q2',
      prompt: 'λ = 10⁻⁷ m boʻlgan foton energiyasi necha eV? (h = 4·10⁻¹⁵ eV·s)',
      hint: 'E = hc/λ.',
      explanation: '4·10⁻¹⁵ · 3·10⁸ / 10⁻⁷ = 12 eV.',
      widget: { type: 'number_answer', props: { answer: 12, unit: 'eV' } }
    },
    {
      id: 'f36q3',
      prompt: 'Yulduz nurlanishi choʻqqisi 290 nm da. Uning sirt temperaturasi taxminan necha K? (b = 2,9·10⁻³ m·K)',
      hint: 'T = b / λmax.',
      explanation: '2,9·10⁻³ / 2,9·10⁻⁷ = 10 000 K.',
      widget: { type: 'number_answer', props: { answer: 10000, tolerance: 100, unit: 'K' } }
    },
    {
      id: 'f36q4',
      prompt: 'Inson tanasi (T ≈ 310 K) nurlanishining choʻqqisi necha μm da? (0,1 gacha)',
      hint: 'λmax = b / T.',
      explanation: '2,9·10⁻³ / 310 ≈ 9,4·10⁻⁶ m — infraqizil soha.',
      widget: { type: 'number_answer', props: { answer: 9.35, tolerance: 0.1, unit: 'μm' } }
    },
    {
      id: 'f36q5',
      prompt: 'Jism temperaturasi oshsa, nurlanish choʻqqisi qanday siljiydi?',
      hint: 'λmax = b/T.',
      explanation: 'Qisqa toʻlqinlar tomon (qizildan koʻk tomon).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Uzun toʻlqinlar tomon', 'Qisqa toʻlqinlar tomon', 'Siljimaydi', 'Yoʻqoladi'], answerIndex: 1 } }
    },
    {
      id: 'f36q6',
      prompt: 'Plank gipotezasining mohiyati nimada?',
      hint: 'Porsiyalar.',
      explanation: 'Energiya uzluksiz emas, alohida kvantlar bilan nurlanadi va yutiladi: E = hν.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Yorugʻlik zarra emas', 'Energiya kvantlar bilan nurlanadi va yutiladi', 'Yorugʻlik tezligi oʻzgarmas', 'Massa energiyaga aylanadi'], answerIndex: 1 } }
    },
    {
      id: 'f36q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'E = hν.',
      explanation: 'Kvant energiyasi chastotaga toʻgʻri proporsional; h — Plank doimiysi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Kvant energiyasi yorugʻlik ' },
            { blank: 'chastotasi' },
            { text: 'ga toʻgʻri proporsional, proporsionallik koeffitsiyenti — ' },
            { blank: 'Plank' },
            { text: ' doimiysi.' }
          ],
          bank: ['chastotasi', 'Plank', 'amplitudasi', 'Vin']
        }
      }
    },
    {
      id: 'f36q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Havorang yulduz issiqroq.',
      explanation: 'Havorang yulduz qizildan issiq; chastota 2 marta oshsa, kvant energiyasi 2 marta oshadi; Plank doimiysi juda kichik son.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Havorang yulduzlar qizil yulduzlardan issiqroq.', value: true },
            { text: 'Chastota 2 marta oshsa, kvant energiyasi 2 marta oshadi.', value: true },
            { text: 'Klassik fizika issiqlik nurlanishini barcha toʻlqinlarda toʻgʻri tushuntirgan.', value: false },
            { text: 'Toʻlqin uzunligi oshsa, kvant energiyasi oshadi.', value: false }
          ]
        }
      }
    }
  ]
};
