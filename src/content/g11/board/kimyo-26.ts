import type { BoardLesson } from './types';
import { BOB6 } from './kimyo-25';

/** Darslik: Umumiy kimyo 11, 26-mavzu (117–121-betlar) — Le-Shatelye prinsipi: konsentratsiya, bosim, harorat taʼsiri; katalizator muvozanatni siljitmaydi. */
export const KIM_26: BoardLesson = {
  n: 26,
  label: '26',
  group: BOB6,
  title: 'Muvozanatning siljishi. Le-Shatelye prinsipi',
  section: '26-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Muvozanatdagi sistemani «turtsak» nima boʻladi? 1884-yilda fransuz olimi Le-Shatelye javob topdi: muvozanatdagi sistemaga tashqaridan taʼsir koʻrsatilsa, muvozanat shu taʼsirni kamaytiruvchi tomonga siljiydi. Sistema goʻyo «qarshilik koʻrsatadi».",
      easy: "Taʼsir qilinsa — muvozanat uni kamaytiruvchi tomonga siljiydi.",
      draw: [
        { t: 'title', text: 'Le-Shatelye prinsipi (1884)' },
        { t: 'icon', x: 16, y: 40, emoji: '⚖️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['taʼsir: C, P yoki t', 'javob: taʼsirni kamaytirish', 'muvozanat → yoki ←'] }
      ],
      next: 'Konsentratsiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "CO2 qoʻshuv H2 ⇄ CO qoʻshuv H2O muvozanatiga karbonat angidrid qoʻshsak, sistema uni sarflashga intiladi — muvozanat oʻngga siljiydi. CO qoʻshsak — chapga. Mahsulotni sistemadan chiqarib tursak, muvozanat oʻngga siljiydi. K bunda oʻzgarmaydi.",
      easy: "Modda qoʻshilsa — uni sarflovchi tomonga; chiqarilsa — uni hosil qiluvchi tomonga.",
      draw: [
        { t: 'title', text: 'Konsentratsiya taʼsiri' },
        { t: 'formula', x: 4, y: 24, text: 'CO₂ + H₂ ⇄ CO + H₂O' },
        { t: 'list', x: 4, y: 34, items: ['[CO₂] ↑ → oʻngga', '[CO] ↑ → chapga', 'H₂O chiqarilsa → oʻngga'] },
        { t: 'text', x: 4, y: 62, text: 'K oʻzgarmaydi', size: 's', color: 'purple' }
      ],
      next: 'Bosim'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bosim oshirilsa, muvozanat gaz molekulalari kamroq tomonga siljiydi. 2SO2 qoʻshuv O2 ⇄ 2SO3: chapda 3 mol, oʻngda 2 mol gaz — oʻngga. Ammiak sintezida ham 4 moldan 2 molga — oʻngga. H2 qoʻshuv Cl2 ⇄ 2HCl da ikki tomonda 2 mol — bosim taʼsir qilmaydi. Qattiq moddalar hisobga olinmaydi.",
      easy: "P ↑ → gaz mollari kam tomonga; teng boʻlsa — taʼsir yoʻq.",
      draw: [
        { t: 'title', text: 'Bosim taʼsiri' },
        { t: 'table', x: 4, y: 20, rows: [['reaksiya', 'gaz mol', 'P ↑'], ['2SO₂ + O₂ ⇄ 2SO₃', '3 → 2', 'oʻngga'], ['N₂ + 3H₂ ⇄ 2NH₃', '4 → 2', 'oʻngga'], ['H₂ + Cl₂ ⇄ 2HCl', '2 → 2', 'yoʻq']] },
        { t: 'text', x: 4, y: 62, text: 'qattiq moddalar sanalmaydi', size: 's', color: 'purple' }
      ],
      next: 'Qoʻngʻir gaz'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Azot dioksid qoʻngʻir rangli, uning dimeri N2O4 esa rangsiz. 2NO2 ⇄ N2O4: bosim oshirilsa, muvozanat N2O4 tomonga siljiydi va gaz rangsizlanadi. Bu reaksiya ekzotermik: minus 9,3 gradusda faqat N2O4, 144 gradusda esa faqat NO2 boʻladi — qizdirganda qoʻngʻir rang kuchayadi.",
      easy: "2NO₂ (qoʻngʻir) ⇄ N₂O₄ (rangsiz): P ↑ → rangsizlanadi, t ↑ → qoʻngʻirlashadi.",
      draw: [
        { t: 'title', text: '2NO₂ ⇄ N₂O₄' },
        { t: 'ellipse', cx: 22, cy: 40, rx: 10, ry: 10, color: 'orange' },
        { t: 'ellipse', cx: 52, cy: 40, rx: 10, ry: 10, color: 'ink' },
        { t: 'text', x: 22, y: 58, text: 'NO₂ — qoʻngʻir', size: 's', anchor: 'middle' },
        { t: 'text', x: 52, y: 58, text: 'N₂O₄ — rangsiz', size: 's', anchor: 'middle' },
        { t: 'text', x: 37, y: 41, text: '⇄', size: 'l', anchor: 'middle' },
        { t: 'list', x: 68, y: 30, items: ['P ↑ → N₂O₄', 't ↑ → NO₂'] }
      ],
      next: 'Harorat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Harorat oshirilsa, muvozanat issiqlik yutiluvchi — endotermik tomonga, pasaytirilsa — ekzotermik tomonga siljiydi. 2SO2 qoʻshuv O2 ⇄ 2SO3 qoʻshuv Q: koʻproq SO3 olish uchun haroratni pasaytirish kerak. Katalizator muvozanatni siljitmaydi — u faqat muvozanatga tezroq erishtiradi. Efir olishda sulfat kislota suvni yutib, muvozanatni oʻngga siljitadi.",
      easy: "t ↑ → endotermik tomonga; t ↓ → ekzotermik tomonga; katalizator siljitmaydi.",
      draw: [
        { t: 'title', text: 'Harorat va katalizator' },
        { t: 'formula', x: 4, y: 22, text: '2SO₂ + O₂ ⇄ 2SO₃ + Q' },
        { t: 'list', x: 4, y: 32, items: ['t ↑ → chapga (endotermik)', 't ↓ → oʻngga (ekzotermik)', 'katalizator — siljitmaydi'] },
        { t: 'text', x: 4, y: 62, text: 'katalizator muvozanatga tezroq olib keladi', size: 's', color: 'purple' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Fe3O4 qoʻshuv 4CO ⇄ 3Fe qoʻshuv 4CO2, delta H minus 43,7 kJ. Qaysi taʼsirda muvozanat chapga siljiydi? Bosim taʼsir qilmaydi: ikki tomonda 4 mol gaz. Reaksiya ekzotermik, demak harorat oshirilsa — chapga, endotermik tomonga.",
      easy: "Gaz mol 4 = 4 — bosim yoʻq; ΔH < 0 → t ↑ → chapga.",
      draw: [
        { t: 'title', text: 'Qaysi tomonga?' },
        { t: 'formula', x: 4, y: 24, text: 'Fe₃O₄ + 4CO ⇄ 3Fe + 4CO₂' },
        { t: 'formula', x: 4, y: 36, text: 'ΔH = −43,7 kJ' },
        { t: 'list', x: 4, y: 46, items: ['gaz: 4 = 4 → P taʼsir qilmaydi', 't ↑ → chapga'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Le-Shatelye: muvozanat tashqi taʼsirni kamaytiruvchi tomonga siljiydi.',
    'Modda qoʻshilsa — uni sarflovchi tomonga; bosim oshsa — gaz mollari kam tomonga; harorat oshsa — endotermik tomonga.',
    'Katalizator muvozanatni siljitmaydi, faqat unga tezroq erishtiradi.'
  ],
  questions: [
    {
      id: 'k26q1',
      prompt: '2NO + O₂ ⇄ 2NO₂ sistemada bosim oshirilsa, muvozanat qaysi tomonga siljiydi?',
      hint: '3 mol → 2 mol.',
      explanation: 'Gaz mollari kam tomonga — oʻngga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻngga', 'chapga', 'siljimaydi', 'avval oʻngga, keyin chapga'], answerIndex: 0 } }
    },
    {
      id: 'k26q2',
      prompt: '2CO + O₂ ⇄ 2CO₂, ΔH = −566 kJ. Harorat oshirilsa, muvozanat qaysi tomonga siljiydi?',
      hint: 'Ekzotermik reaksiya.',
      explanation: 'Harorat oshsa — endotermik tomonga, yaʼni chapga.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻngga', 'chapga', 'siljimaydi'], answerIndex: 1 } }
    },
    {
      id: 'k26q3',
      prompt: 'Bosim oshirilganda muvozanati siljimaydigan reaksiyalarni belgilang.',
      hint: 'Gaz mollari ikki tomonda teng.',
      explanation: 'H₂ + Cl₂ ⇄ 2HCl (2 = 2) va Fe₃O₄ + 4CO ⇄ 3Fe + 4CO₂ (4 = 4).',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'H₂ + Cl₂ ⇄ 2HCl', correct: true },
            { label: 'Fe₃O₄ + 4CO ⇄ 3Fe + 4CO₂', correct: true },
            { label: 'N₂ + 3H₂ ⇄ 2NH₃' },
            { label: '2SO₂ + O₂ ⇄ 2SO₃' },
            { label: '2NO₂ ⇄ N₂O₄' }
          ]
        }
      }
    },
    {
      id: 'k26q4',
      prompt: 'CO₂ + H₂ ⇄ CO + H₂O. Taʼsirni siljish yoʻnalishi bilan juftlang.',
      hint: 'Qoʻshilgan modda sarflanadi.',
      explanation: 'CO₂ qoʻshish — oʻngga; CO qoʻshish — chapga; H₂O chiqarish — oʻngga; katalizator — siljimaydi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'CO₂ qoʻshildi', right: 'oʻngga' },
            { left: 'CO qoʻshildi', right: 'chapga' },
            { left: 'katalizator', right: 'siljimaydi' }
          ]
        }
      }
    },
    {
      id: 'k26q5',
      prompt: '2NO₂ (qoʻngʻir) ⇄ N₂O₄ (rangsiz). Bosim oshirilsa, gaz rangi qanday oʻzgaradi?',
      hint: '2 mol → 1 mol.',
      explanation: 'Muvozanat N₂O₄ tomonga siljiydi — rang ochadi (rangsizlanadi).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qoʻngʻirlashadi', 'rangsizlanadi', 'oʻzgarmaydi'], answerIndex: 1 } }
    },
    {
      id: 'k26q6',
      prompt: '2SO₂ + O₂ ⇄ 2SO₃ + Q. Koʻproq SO₃ olish uchun qaysi sharoitlar kerak?',
      hint: 'Ekzotermik, 3 → 2 mol.',
      explanation: 'Bosimni oshirish, haroratni pasaytirish, SO₃ ni chiqarib turish, O₂ qoʻshish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'bosimni oshirish', correct: true },
            { label: 'haroratni pasaytirish', correct: true },
            { label: 'O₂ qoʻshish', correct: true },
            { label: 'haroratni oshirish' },
            { label: 'katalizator qoʻshish' }
          ]
        }
      }
    },
    {
      id: 'k26q7',
      prompt: 'Fe₃O₄ + 4CO ⇄ 3Fe + 4CO₂, ΔH = −43,7 kJ. Qaysi taʼsir muvozanatni chapga siljitadi?',
      hint: 'Bosim taʼsir qilmaydi.',
      explanation: 'Faqat harorat oshirilganda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bosimni oshirish', 'bosimni kamaytirish', 'haroratni oshirish', 'haroratni pasaytirish'], answerIndex: 2 } }
    },
    {
      id: 'k26q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Katalizator — faqat tezlik.',
      explanation: 'Katalizator muvozanatni siljitmaydi; harorat oshsa endotermik tomonga; konsentratsiya oʻzgarsa K oʻzgarmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Harorat oshirilsa, muvozanat endotermik reaksiya tomonga siljiydi.', value: true },
            { text: 'Konsentratsiya oʻzgarganda muvozanat konstantasi oʻzgarmaydi.', value: true },
            { text: 'Katalizator muvozanatni mahsulot tomonga siljitadi.', value: false },
            { text: 'Bosim oshirilsa, muvozanat gaz mollari koʻp tomonga siljiydi.', value: false }
          ]
        }
      }
    }
  ]
};
