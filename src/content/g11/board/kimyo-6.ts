import type { BoardLesson } from './types';
import { BOB2 } from './kimyo-5';
import { block } from './chem';

/** Darslik: Umumiy kimyo 11, 6-mavzu (34–39-betlar) — Avogadro qonuni, molyar hajm, nisbiy zichlik, hajmiy nisbatlar, hajm ulushi. */
export const KIM_6: BoardLesson = {
  n: 6,
  label: '6',
  group: BOB2,
  title: 'Avogadro qonuni. Gazlar aralashmasi',
  section: '6-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ikkita bir xil shar oling: birini geliy, ikkinchisini havo bilan toʻldiring. Geliyli shar osmonga uchadi, havolisi yerga tushadi. Lekin ikkala sharda molekulalar soni bir xil! Farq faqat molekulalar massasida. Buni 1811-yilda Avogadro tushuntirgan.",
      easy: "Teng hajmdagi gazlarda molekulalar soni teng, massasi turlicha.",
      draw: [
        { t: 'title', text: 'Ikki shar' },
        { t: 'icon', x: 16, y: 34, emoji: '🎈', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '⚖️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['geliy — uchadi', 'havo — tushadi', 'molekulalar soni bir xil'] }
      ],
      next: 'Avogadro qonuni'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Avogadro qonuni: bir xil bosim va haroratda teng hajmdagi turli gazlarda molekulalar soni teng. Xulosalar: normal sharoitda — 273 kelvin va 101,325 kilopaskal — har qanday gazning 1 moli 22,4 litr hajmni egallaydi; bu molyar hajm. 1 mol gazda 6,02 karra 10 ning 23 darajasi molekula bor. Demak, 0,5 mol gaz 11,2 litr, 2,24 litr xlor 0,1 mol va 7,1 gramm.",
      easy: "N.sh. da 1 mol gaz = 22,4 L. n = V / 22,4.",
      draw: [
        { t: 'title', text: 'Avogadro qonuni (1811)' },
        { t: 'formula', x: 4, y: 24, text: 'n = V / Vm,   Vm = 22,4 L/mol' },
        { t: 'list', x: 4, y: 36, items: ['n.sh.: 273 K, 101,325 kPa', '0,5 mol → 11,2 L', '2,24 L Cl₂ → 0,1 mol → 7,1 g'] }
      ],
      next: 'Nisbiy zichlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Teng hajmdagi gazlar massalari ularning molyar massalari kabi nisbatda. Bir gazning ikkinchisiga nisbatan zichligi D teng M1 boʻlinsin M2. Vodorodga nisbatan: M teng 2 karra D. Havo taxminan 4 hajm azot va 1 hajm kisloroddan iborat, oʻrtacha molyar massasi 4 karra 28 qoʻshuv 32, boʻlinsin 5 — 28,8, yaxlitlab 29. Shuning uchun M teng 29 karra D havo.",
      easy: "D = M₁ / M₂; M = 2·D(H₂) = 29·D(havo).",
      draw: [
        { t: 'title', text: 'Nisbiy zichlik' },
        { t: 'formula', x: 4, y: 24, text: 'D = M₁ / M₂' },
        { t: 'formula', x: 4, y: 36, text: 'M = 2 · D(H₂) = 29 · D(havo)' },
        { t: 'formula', x: 4, y: 50, text: 'M(havo) = (4·28 + 32) / 5 ≈ 29' }
      ],
      next: 'Hajmiy nisbatlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gazlar orasidagi reaksiyalarda tenglamadagi koeffitsiyentlar hajmlar nisbatini ham koʻrsatadi. Vodorod va xlordan vodorod xlorid: 1 hajm, 1 hajm, 2 hajm. Vodorod va kisloroddan suv bugʻi: 2 hajm, 1 hajm, 2 hajm. Gazlar hajmlari kichik butun sonlar kabi nisbatda boʻladi.",
      easy: "H₂ + Cl₂ → 2HCl (1:1:2); 2H₂ + O₂ → 2H₂O (2:1:2).",
      draw: [
        { t: 'title', text: 'Gazlarning hajmiy nisbati' },
        ...block('h', 4, 24, 14, 'H₂', 'blue'),
        { t: 'text', x: 20, y: 30, text: '+', anchor: 'middle' },
        ...block('cl', 22, 24, 14, 'Cl₂', 'green'),
        { t: 'text', x: 40, y: 30, text: '→', anchor: 'middle' },
        ...block('hcl1', 44, 24, 14, 'HCl', 'purple'),
        ...block('hcl2', 60, 24, 14, 'HCl', 'purple'),
        { t: 'text', x: 80, y: 30, text: '1 : 1 : 2', size: 's' },
        { t: 'formula', x: 4, y: 52, text: '2H₂ + O₂ → 2H₂O (bugʻ)   2 : 1 : 2' }
      ],
      next: 'Hajm ulushi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Aralashmadagi bir gaz hajmining umumiy hajmga nisbati — hajm ulushi, odatda foizda. Masalan, 2 litr vodorod, 3 litr kislorod, 6 litr ammiak va 8 litr is gazi aralashmasi: jami 19 litr. Kislorodning hajm ulushi: 3 boʻlinsin 19 — taxminan 15,8 foiz.",
      easy: "φ = V(gaz) / V(aralashma) · 100 %.",
      draw: [
        { t: 'title', text: 'Hajm ulushi' },
        { t: 'formula', x: 4, y: 24, text: 'φ = V(gaz) / V(aralashma) · 100 %' },
        { t: 'list', x: 4, y: 36, items: ['H₂ 2 L, O₂ 3 L, NH₃ 6 L, CO 8 L', 'jami: 19 L'] },
        { t: 'formula', x: 4, y: 58, text: 'φ(O₂) = 3 / 19 ≈ 15,8 %' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Gazning vodorodga nisbatan zichligi 35,5. Havoga nisbatan zichligini topamiz. Molyar massa: 2 karra 35,5 teng 71 g/mol — bu xlor. Havoga nisbatan: 71 boʻlinsin 29, taxminan 2,45.",
      easy: "M = 2·35,5 = 71; D(havo) = 71/29 ≈ 2,45.",
      draw: [
        { t: 'title', text: 'Havoga nisbatan zichlik' },
        { t: 'formula', x: 4, y: 24, text: 'M = 2 · 35,5 = 71 g/mol  (Cl₂)' },
        { t: 'formula', x: 4, y: 40, text: 'D(havo) = 71 / 29 ≈ 2,45' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Avogadro qonuni: bir xil sharoitda teng hajmdagi gazlarda molekulalar soni teng; n.sh. da 1 mol gaz 22,4 L.',
    'Nisbiy zichlik D = M₁/M₂; M = 2·D(H₂) = 29·D(havo).',
    'Gazlar reaksiyalarida hajmlar koeffitsiyentlar kabi nisbatda; hajm ulushi φ = V(gaz)/V(aralashma).'
  ],
  questions: [
    {
      id: 'k6q1',
      prompt: '2,8 L (n.sh.) is gazi CO necha gramm keladi?',
      hint: 'n = 2,8 / 22,4; M(CO) = 28.',
      explanation: 'n = 0,125 mol; m = 0,125 · 28 = 3,5 g.',
      widget: { type: 'number_answer', props: { answer: 3.5, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k6q2',
      prompt: '89,6 L (n.sh.) kislorodda nechta molekula bor? (·10²³ ta)',
      hint: 'n = 89,6 / 22,4.',
      explanation: 'n = 4 mol; 4 · 6,02·10²³ = 24,08·10²³ ta.',
      widget: { type: 'number_answer', props: { answer: 24.08, tolerance: 0.05, unit: '·10²³ ta' } }
    },
    {
      id: 'k6q3',
      prompt: 'Metanga nisbatan zichligi 2 boʻlgan gazning geliyga nisbatan zichligi qancha?',
      hint: 'M = 16 · 2; D(He) = M / 4.',
      explanation: 'M = 32; 32 / 4 = 8.',
      widget: { type: 'number_answer', props: { answer: 8 } }
    },
    {
      id: 'k6q4',
      prompt: 'Argonga nisbatan zichligi 0,5 boʻlgan gazning vodorodga nisbatan zichligi qancha?',
      hint: 'M = 40 · 0,5.',
      explanation: 'M = 20; D(H₂) = 20 / 2 = 10.',
      widget: { type: 'number_answer', props: { answer: 10 } }
    },
    {
      id: 'k6q5',
      prompt: '0,717 g gaz (n.sh.) 0,365 L hajmni egallaydi. Uning molyar massasi qancha?',
      hint: 'M = m · 22,4 / V.',
      explanation: '0,717 · 22,4 / 0,365 ≈ 44 g/mol.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['28 g/mol', '32 g/mol', '44 g/mol', '64 g/mol'], answerIndex: 2 } }
    },
    {
      id: 'k6q6',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Normal sharoit.',
      explanation: 'Normal sharoitda 1 mol istalgan gaz 22,4 L hajmni egallaydi va 6,02·10²³ molekula saqlaydi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Normal sharoitda 1 mol istalgan gaz ' },
            { blank: '22,4 L' },
            { text: ' hajmni egallaydi va ' },
            { blank: '6,02·10²³' },
            { text: ' ta molekula saqlaydi.' }
          ],
          bank: ['22,4 L', '6,02·10²³', '11,2 L', '3,01·10²³']
        }
      }
    },
    {
      id: 'k6q7',
      prompt: 'Gazlarni havodan yengil va ogʻirga ajrating (M(havo) ≈ 29).',
      hint: 'M < 29 — yengil.',
      explanation: 'Yengil: H₂ (2), He (4), NH₃ (17), CH₄ (16). Ogʻir: CO₂ (44), Cl₂ (71).',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'l', label: 'Havodan yengil' },
            { id: 'h', label: 'Havodan ogʻir' }
          ],
          items: [
            { emoji: '', label: 'H₂', bin: 'l' },
            { emoji: '', label: 'He', bin: 'l' },
            { emoji: '', label: 'NH₃', bin: 'l' },
            { emoji: '', label: 'CH₄', bin: 'l' },
            { emoji: '', label: 'CO₂', bin: 'h' },
            { emoji: '', label: 'Cl₂', bin: 'h' }
          ]
        }
      }
    },
    {
      id: 'k6q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Teng hajm — teng molekulalar soni.',
      explanation: 'Avogadro qonuni boʻyicha teng hajmlarda molekulalar soni teng; 2H₂ + O₂ → 2H₂O da hajmlar 2:1:2; nodir gazlar molekulasi bir atomli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bir xil sharoitda 1 L vodorod va 1 L kislorodda molekulalar soni teng.', value: true },
            { text: 'Nodir gazlarning molekulasi bir atomdan iborat.', value: true },
            { text: '2H₂ + O₂ → 2H₂O (bugʻ) reaksiyasida hajmlar nisbati 1 : 1 : 1.', value: false },
            { text: 'Teng hajmdagi gazlarning massalari har doim teng.', value: false }
          ]
        }
      }
    }
  ]
};
