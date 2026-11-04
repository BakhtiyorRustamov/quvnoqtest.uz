import type { BoardLesson } from './types';
import { BOB4 } from './fizika-23';
import { seg, vec } from './phys';

/** Darslik: Fizika 11, 22-mavzu (79–83-betlar) — elektromagnit toʻlqinlarning xossalari: qaytish, sinish, asosiy kattaliklar, intensivlik. */
export const FIZ_24: BoardLesson = {
  n: 24,
  label: '22',
  group: BOB4,
  title: 'Elektromagnit toʻlqinlarning xossalari',
  section: '22-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mikrotoʻlqinli pech ichida toʻlqinlar metall devorlardan qaytib, ovqatni har tomondan isitadi. Eshik oynasidagi metall toʻr ham ularni tashqariga chiqarmaydi. Aeroportdagi radar esa samolyotdan qaytgan toʻlqinni tutadi. Elektromagnit toʻlqinlar yorugʻlikka oʻxshab qaytadi va sinadi.",
      easy: "Metall toʻlqinni qaytaradi — pech va radar shunga asoslangan.",
      draw: [
        { t: 'title', text: 'Toʻlqin qaytadi' },
        { t: 'icon', x: 16, y: 34, emoji: '♨️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '✈️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['mikrotoʻlqinli pech devori', 'eshikdagi metall toʻr', 'radar — qaytgan signal'] }
      ],
      next: 'Qaytish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻlqin generatori rupori va qabul qilgich orasiga metall plastina qoʻysak, signal yoʻqoladi — toʻlqin metalldan oʻtmaydi. Plastinani qiya qoʻysak, qabul qilgich tushish burchagiga teng burchakda signalni yaxshi tutadi. Metalldagi erkin elektronlar toʻlqin taʼsirida tebranib, oʻzi ikkilamchi toʻlqin chiqaradi. Dielektrik esa toʻlqinni kam qaytaradi.",
      easy: "Metalldan qaytadi: tushish burchagi = qaytish burchagi.",
      draw: [
        { t: 'title', text: 'Metalldan qaytish' },
        ...seg('pl', 20, 58, 70, 58, 'ink'),
        { t: 'text', x: 38, y: 64, text: 'metall plastina', size: 's' },
        ...vec('in', 22, 26, 45, 57, 'red'),
        ...vec('out', 45, 57, 68, 26, 'red'),
        ...seg('n', 45, 24, 45, 57, 'ink', true),
        { t: 'text', x: 38, y: 40, text: 'α', size: 's' },
        { t: 'text', x: 49, y: 40, text: 'α', size: 's' },
        { t: 'text', x: 70, y: 34, text: 'α tush = α qayt', color: 'purple', size: 's' }
      ],
      next: 'Sinish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Metall oʻrniga parafinli prizma qoʻysak, toʻlqin undan oʻtib, yoʻnalishini oʻzgartiradi — sinadi. Sinish koʻrsatkichi n teng v1 boʻlinsin v2, u muhitlarning dielektrik singdiruvchanligi bilan bogʻliq: n teng ildiz ostida epsilon 2 boʻlinsin epsilon 1. Muhim: toʻlqin bir muhitdan boshqasiga oʻtganda chastota oʻzgarmaydi, toʻlqin uzunligi oʻzgaradi.",
      easy: "n = v₁/v₂ = √(ε₂/ε₁). Chastota oʻzgarmaydi, λ oʻzgaradi.",
      draw: [
        { t: 'title', text: 'Sinish' },
        { t: 'formula', x: 6, y: 22, text: 'n = v₁ / v₂ = √(ε₂ / ε₁)' },
        { t: 'formula', x: 6, y: 38, text: 'λ = v / ν' },
        { t: 'list', x: 6, y: 50, items: ['ν — oʻzgarmaydi', 'λ va v — oʻzgaradi'] }
      ],
      next: 'Koʻndalang toʻlqin'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻlqin uzunligi — bir xil fazada tebranayotgan eng yaqin ikki nuqta orasidagi masofa. Elektr maydon E va magnit maydon B tebranishlari toʻlqin tarqalish yoʻnalishiga tik — demak, elektromagnit toʻlqinlar koʻndalang toʻlqinlardir. Tezlik vektori E ga ham, B ga ham tik.",
      easy: "E ⊥ B ⊥ v — elektromagnit toʻlqin koʻndalang.",
      draw: [
        { t: 'title', text: 'Koʻndalang toʻlqin' },
        ...vec('v', 24, 50, 70, 50, 'green', 'v'),
        ...vec('E', 24, 50, 24, 24, 'red'),
        { t: 'text', x: 26, y: 26, text: 'E', color: 'red' },
        ...vec('B', 24, 50, 12, 60, 'blue'),
        { t: 'text', x: 6, y: 60, text: 'B', color: 'blue' },
        { t: 'list', x: 74, y: 26, items: ['E ⊥ v', 'B ⊥ v', 'E ⊥ B'] }
      ],
      next: 'Intensivlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻlqin energiyasini nurlanish oqim zichligi — intensivlik bildiradi: I teng W boʻlinsin S karra delta t, birligi vatt boʻlinsin metr kvadrat. U energiya zichligi bilan tezlik koʻpaytmasiga teng: I teng w c. Nuqtaviy manbadan uzoqlashgan sari intensivlik masofa kvadratiga teskari kamayadi. Bundan tashqari, intensivlik chastotaning toʻrtinchi darajasiga proporsional.",
      easy: "I = W/(S·Δt) = w·c; I ~ 1/R²; I ~ ω⁴.",
      draw: [
        { t: 'title', text: 'Toʻlqin intensivligi' },
        { t: 'formula', x: 6, y: 22, text: 'I = W / (S · Δt) = w · c' },
        { t: 'list', x: 6, y: 38, items: ['[I] = W/m²', 'nuqtaviy manba: I ~ 1 / R²', 'I ~ ω⁴'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Bir jinsli muhitda elektromagnit toʻlqin 2 karra 10 ning 8 darajasi metr sekund tezlikda tarqalmoqda, chastotasi 1 megagers. Toʻlqin uzunligi: lambda teng v boʻlinsin nu — 2 karra 10 ning 8 darajasi boʻlinsin 10 ning 6 darajasi, yaʼni 200 metr.",
      easy: "λ = v/ν = 2·10⁸ / 10⁶ = 200 m.",
      draw: [
        { t: 'title', text: 'Muhitdagi toʻlqin uzunligi' },
        { t: 'list', x: 6, y: 20, items: ['v = 2 · 10⁸ m/s', 'ν = 1 MHz = 10⁶ Hz'] },
        { t: 'formula', x: 6, y: 46, text: 'λ = v / ν = 200 m' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Elektromagnit toʻlqinlar metalldan qaytadi (tushish burchagi = qaytish burchagi), dielektrikda sinadi: n = v₁/v₂ = √(ε₂/ε₁).',
    'Toʻlqin koʻndalang: E ⊥ B ⊥ v; muhit oʻzgarganda chastota saqlanadi, λ = v/ν oʻzgaradi.',
    'Intensivlik I = W/(S·Δt) = w·c; nuqtaviy manbada I ~ 1/R², shuningdek I ~ ω⁴.'
  ],
  questions: [
    {
      id: 'f24q1',
      prompt: 'Muhitda toʻlqin tezligi 2·10⁸ m/s, chastotasi 5 MHz. Toʻlqin uzunligi necha m?',
      hint: 'λ = v / ν.',
      explanation: '2·10⁸ / 5·10⁶ = 40 m.',
      widget: { type: 'number_answer', props: { answer: 40, unit: 'm' } }
    },
    {
      id: 'f24q2',
      prompt: 'Chastotasi 5 Hz toʻlqin 3 m/s tezlikda tarqalmoqda. Bir chiziqda 20 cm masofadagi ikki nuqtaning fazalar farqi necha gradus?',
      hint: 'Δφ = 360° · Δx / λ.',
      explanation: 'λ = 3/5 = 0,6 m; Δφ = 360° · 0,2/0,6 = 120°.',
      widget: { type: 'number_answer', props: { answer: 120, unit: '°' } }
    },
    {
      id: 'f24q3',
      prompt: 'Nuqtaviy manbadan masofa 2 marta oshdi. Intensivlik necha marta kamayadi?',
      hint: 'I ~ 1/R².',
      explanation: '2² = 4 marta.',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'f24q4',
      prompt: 'Toʻlqin chastotasi 3 marta kamaydi. Nurlanish intensivligi necha marta kamayadi?',
      hint: 'I ~ ω⁴.',
      explanation: '3⁴ = 81 marta.',
      widget: { type: 'number_answer', props: { answer: 81 } }
    },
    {
      id: 'f24q5',
      prompt: 'Dielektrik singdiruvchanligi 4 boʻlgan muhitda elektromagnit toʻlqin tezligi necha m/s?',
      hint: 'v = c / √ε.',
      explanation: '3·10⁸ / 2 = 1,5·10⁸ m/s.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['3·10⁸', '1,5·10⁸', '0,75·10⁸', '12·10⁸'], answerIndex: 1 } }
    },
    {
      id: 'f24q6',
      prompt: 'Toʻlqin havodan suvga oʻtganda qaysi kattalik oʻzgarmaydi?',
      hint: 'Manba belgilaydi.',
      explanation: 'Chastota oʻzgarmaydi; tezlik va toʻlqin uzunligi oʻzgaradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tezlik', 'toʻlqin uzunligi', 'chastota', 'yoʻnalish'], answerIndex: 2 } }
    },
    {
      id: 'f24q7',
      prompt: 'Qaysilari elektromagnit toʻlqinni yaxshi qaytaradi?',
      hint: 'Erkin elektronlar koʻp boʻlsa.',
      explanation: 'Metallar (alyuminiy, mis, poʻlat) yaxshi qaytaradi; dielektriklar (shisha, parafin) kam.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'alyuminiy list', correct: true },
            { label: 'mis plastina', correct: true },
            { label: 'parafin' },
            { label: 'shisha' },
            { label: 'poʻlat toʻr', correct: true }
          ]
        }
      }
    },
    {
      id: 'f24q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'E ⊥ v.',
      explanation: 'Elektromagnit toʻlqin koʻndalang; intensivlik birligi W/m²; metall toʻlqinni oʻtkazmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Elektromagnit toʻlqinlar boʻylama toʻlqinlardir.', value: false },
            { text: 'Intensivlik W/m² da oʻlchanadi.', value: true },
            { text: 'Toʻlqin metall plastinadan oʻtmay qaytadi.', value: true },
            { text: 'Toʻlqin yangi muhitga oʻtganda chastotasi oʻzgaradi.', value: false }
          ]
        }
      }
    }
  ]
};
