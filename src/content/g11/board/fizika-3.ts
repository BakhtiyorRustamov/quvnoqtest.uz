import type { BoardLesson } from './types';
import { BOB1 } from './fizika-1';
import { seg, vec } from './phys';

/** Darslik: Fizika 11, 3-mavzu (10–13-betlar) — toʻgʻri tok, halqa va gʻaltakning magnit maydoni. */
export const FIZ_3: BoardLesson = {
  n: 3,
  label: '3',
  group: BOB1,
  title: 'Toʻgʻri tok, halqa va gʻaltakning magnit maydoni',
  section: '3-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1820-yilda Ersted maʼruza paytida tokli sim yonidagi kompas strelkasi burilib ketganini koʻrdi. Tok oʻchirilsa, strelka joyiga qaytdi. Demak, tok ham magnit maydon hosil qiladi! Bugun toʻgʻri sim, halqa va gʻaltakning maydonini hisoblashni oʻrganamiz.",
      easy: "Tokli sim yonida kompas buriladi — tok magnit maydon hosil qiladi.",
      draw: [
        { t: 'title', text: 'Ersted tajribasi' },
        ...seg('w', 10, 40, 60, 40, 'red'),
        { t: 'text', x: 34, y: 37, text: 'I', color: 'red' },
        { t: 'icon', x: 34, y: 52, emoji: '🧭', size: 'l' },
        { t: 'list', x: 66, y: 28, items: ['tok bor — strelka buriladi', 'tok yoʻq — joyiga qaytadi'] }
      ],
      next: 'Toʻgʻri tok maydoni'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Toʻgʻri tokning kuch chiziqlari — markazi simda boʻlgan aylanalar, ular simga tik tekisliklarda yotadi. Yoʻnalishini oʻng parma qoidasi beradi: parma tok yoʻnalishida ilgarilasa, dastasining aylanishi kuch chiziqlari yoʻnalishini koʻrsatadi. Induksiya vektori aylanaga urinma boʻylab yoʻnalgan.",
      easy: "Toʻgʻri tok atrofida kuch chiziqlari — aylanalar. Yoʻnalishi — oʻng parma qoidasi.",
      draw: [
        { t: 'title', text: 'Oʻng parma qoidasi' },
        ...vec('I', 26, 62, 26, 16, 'red'),
        { t: 'text', x: 28, y: 20, text: 'I', color: 'red' },
        { t: 'ellipse', cx: 26, cy: 40, rx: 8, ry: 2.6, dashedBack: true, color: 'blue' },
        { t: 'ellipse', cx: 26, cy: 40, rx: 14, ry: 4.5, dashedBack: true, color: 'blue' },
        { t: 'ellipse', cx: 26, cy: 40, rx: 20, ry: 6.4, dashedBack: true, color: 'blue' },
        ...vec('a', 24, 46.4, 28, 46.4, 'blue'),
        { t: 'list', x: 54, y: 24, items: ['chiziqlar — aylanalar', 'markazi — simda', 'parma: tok → aylanish'] }
      ],
      next: 'Superpozitsiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bir nechta tokli oʻtkazgich boʻlsa, nuqtadagi natijaviy induksiya har bir tok hosil qilgan induksiyalarning vektor yigʻindisiga teng — bu superpozitsiya prinsipi. Masalan, 3 va 4 millitesla boʻlgan oʻzaro tik maydonlar qoʻshilsa, natija Pifagor boʻyicha 5 millitesla.",
      easy: "B = B₁ + B₂ + … (vektor yigʻindi). 3 mT ⊥ 4 mT → 5 mT.",
      draw: [
        { t: 'title', text: 'Superpozitsiya prinsipi' },
        { t: 'formula', x: 6, y: 22, text: 'B = B₁ + B₂ + … + Bₙ' },
        ...vec('b1', 14, 60, 44, 60, 'blue'),
        { t: 'text', x: 25, y: 66, text: '4 mT', color: 'blue', size: 's' },
        ...vec('b2', 14, 60, 14, 38, 'green'),
        { t: 'text', x: 4, y: 50, text: '3 mT', color: 'green', size: 's' },
        ...vec('b', 14, 60, 44, 38, 'red'),
        { t: 'text', x: 20, y: 44, text: '5 mT', color: 'red', size: 's' },
        { t: 'text', x: 56, y: 50, text: '√(3² + 4²) = 5 mT', color: 'red' }
      ],
      next: 'Formulalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bio, Savar va Laplas qonunidan toʻgʻri cheksiz tok uchun: B teng mu nol karra I boʻlinsin 2 pi d, bu yerda d — simgacha masofa, mu nol teng 4 pi karra 10 ning minus 7 darajasi — magnit doimiysi. Induksiya tokka toʻgʻri, masofaga teskari proporsional.",
      easy: "B = μ₀ I / (2π d), μ₀ = 4π · 10⁻⁷ N/A².",
      draw: [
        { t: 'title', text: 'Toʻgʻri tok induksiyasi' },
        { t: 'formula', x: 6, y: 22, text: 'B = μ₀ · I / (2π · d)' },
        { t: 'list', x: 6, y: 38, items: ['μ₀ = 4π · 10⁻⁷ N/A²', 'I ×2 → B ×2', 'd ×2 → B : 2'] }
      ],
      next: 'Halqa va gʻaltak'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Radiusi R boʻlgan halqa markazida: B teng mu nol I boʻlinsin 2R. Agar gʻaltakda n ta oʻram boʻlsa, oʻramlar maydonlari qoʻshiladi: B teng mu nol n I boʻlinsin 2R. Gʻaltak ichidagi maydon tokka va oʻramlar soniga toʻgʻri, radiusga teskari proporsional.",
      easy: "Halqa: B = μ₀ I / (2R). Gʻaltak: B = μ₀ n I / (2R).",
      draw: [
        { t: 'title', text: 'Halqa va gʻaltak' },
        { t: 'ellipse', cx: 22, cy: 42, rx: 14, ry: 14, color: 'red' },
        { t: 'point', id: 'c', x: 22, y: 42, label: 'B' },
        { t: 'formula', x: 46, y: 24, text: 'halqa: B = μ₀ I / (2R)' },
        { t: 'formula', x: 46, y: 42, text: 'gʻaltak: B = μ₀ n I / (2R)' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Toʻgʻri simdan 250 milliamper tok oʻtmoqda. Undan 4 santimetr uzoqlikda: B teng 4 pi karra 10 ning minus 7 darajasi karra 0,25 boʻlinsin 2 pi karra 0,04, yaʼni 1,25 mikrotesla. Radiusi 5 santimetr halqadan 3 amper oʻtsa, markazda 37,7 mikrotesla.",
      easy: "Sim: 1,25 μT. Halqa (R = 5 cm, I = 3 A): 37,7 μT.",
      draw: [
        { t: 'title', text: 'Hisoblaymiz' },
        { t: 'list', x: 6, y: 20, items: ['sim: B = 2·10⁻⁷ · 0,25 / 0,04', '= 1,25 · 10⁻⁶ T', 'halqa: B = 4π·10⁻⁷ · 3 / 0,1 ≈ 37,7 μT'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Toʻgʻri tokning kuch chiziqlari — aylanalar; yoʻnalishi oʻng parma qoidasi bilan topiladi.',
    'Toʻgʻri tok: B = μ₀I/(2πd); halqa markazi: B = μ₀I/(2R); gʻaltak: B = μ₀nI/(2R), μ₀ = 4π·10⁻⁷ N/A².',
    'Superpozitsiya: natijaviy induksiya — alohida induksiyalarning vektor yigʻindisi.'
  ],
  questions: [
    {
      id: 'f3q1',
      prompt: 'Toʻgʻri oʻtkazgichdan 5 A tok oʻtmoqda. Undan 2 cm uzoqlikdagi induksiya necha μT?',
      hint: 'B = 2·10⁻⁷ · I / d.',
      explanation: '2·10⁻⁷ · 5 / 0,02 = 5 · 10⁻⁵ T = 50 μT.',
      widget: { type: 'number_answer', props: { answer: 50, unit: 'μT' } }
    },
    {
      id: 'f3q2',
      prompt: 'Radiusi 5 cm sim halqadan 3 A tok oʻtmoqda. Markazdagi induksiya necha μT? (0,1 gacha)',
      hint: 'B = μ₀ I / (2R).',
      explanation: '4π·10⁻⁷ · 3 / 0,1 ≈ 37,7 μT.',
      widget: { type: 'number_answer', props: { answer: 37.7, tolerance: 0.1, unit: 'μT' } }
    },
    {
      id: 'f3q3',
      prompt: 'Radiusi 10 cm, 500 oʻramli gʻaltak markazida 25 mT induksiya hosil qilish uchun qancha tok kerak? (butun songacha)',
      hint: 'I = 2RB / (μ₀ n).',
      explanation: '0,2 · 0,025 / (4π·10⁻⁷ · 500) ≈ 8 A.',
      widget: { type: 'number_answer', props: { answer: 7.96, tolerance: 0.1, unit: 'A' } }
    },
    {
      id: 'f3q4',
      prompt: 'Induksiyalari 3 mT va 4 mT boʻlgan oʻzaro tik maydonlar qoʻshildi. Natijaviy induksiya necha mT?',
      hint: 'Pifagor.',
      explanation: '√(9 + 16) = 5 mT.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'mT' } }
    },
    {
      id: 'f3q5',
      prompt: 'Ikki parallel simdan bir yoʻnalishda teng tok oʻtmoqda. Ularning oʻrtasidagi nuqtada induksiya qanday?',
      hint: 'Oʻng parma: ikki maydon oʻrtada qarama-qarshi yoʻnalgan.',
      explanation: 'Maydonlar teng va qarama-qarshi — natija nol.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Ikki barobar katta', 'Nolga teng', 'Bitta simnikiga teng', 'Simlar tomon yoʻnalgan'], answerIndex: 1 } }
    },
    {
      id: 'f3q6',
      prompt: 'Simdan masofa 2 marta oshirildi, tok oʻzgarmadi. Induksiya qanday oʻzgaradi?',
      hint: 'B ~ 1/d.',
      explanation: '2 marta kamayadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['2 marta oshadi', '2 marta kamayadi', '4 marta kamayadi', 'oʻzgarmaydi'], answerIndex: 1 } }
    },
    {
      id: 'f3q7',
      prompt: 'Manbani induksiya formulasi bilan moslang.',
      hint: 'Toʻgʻri tokda 2π bor.',
      explanation: 'Toʻgʻri tok — μ₀I/(2πd); halqa — μ₀I/(2R); gʻaltak — μ₀nI/(2R).',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'toʻgʻri cheksiz tok', right: 'μ₀ I / (2π d)' },
            { left: 'halqa markazi', right: 'μ₀ I / (2R)' },
            { left: 'n oʻramli gʻaltak', right: 'μ₀ n I / (2R)' }
          ]
        }
      }
    },
    {
      id: 'f3q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ersted tajribasini eslang.',
      explanation: 'Tok magnit maydon hosil qiladi; toʻgʻri tok chiziqlari aylanalar; induksiya kuch chiziqlariga urinma.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Tokli oʻtkazgich atrofida magnit maydon hosil boʻladi.', value: true },
            { text: 'Toʻgʻri tokning kuch chiziqlari simga parallel toʻgʻri chiziqlar.', value: false },
            { text: 'Induksiya vektori kuch chizigʻiga urinma boʻylab yoʻnalgan.', value: true },
            { text: 'Gʻaltakdagi oʻramlar sonini oshirsak, ichidagi maydon kamayadi.', value: false }
          ]
        }
      }
    }
  ]
};
