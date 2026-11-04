import type { BoardLesson } from './types';

export const OZG2 = { kicker: 'Ona tili · I fasl', title: 'Talaffuz va imlo meʼyorlari' };

/** Darslik: Ona tili 11, 2-qism (B. Mengliyev va b., 2020), 1-mavzu (3–6-betlar) — talaffuz va imlo: oʻzlashma va oʻz soʻzlardagi tovush oʻzgarishlari. */
export const OZ_25: BoardLesson = {
  n: 25,
  label: '25',
  group: OZG2,
  title: 'Talaffuz va imlo',
  section: 'Ona tili, 2-qism: 1-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Nutqda ikki xil soʻz tovush oʻzgarishiga uchraydi: oʻzlashma soʻzlar va qoʻshimcha qoʻshilgan oʻz soʻzlarimiz. Koʻp oʻzlashmalar aytilishi va yozilishi bilan farq qiladi: «kitob» — «kitop», «vaqt» — «vaxt», «futbol» — «fudbol» deb aytiladi, lekin imloda bu oʻzgarish aks etmaydi. Oʻz soʻzlarimizda esa ayrim oʻzgarishlar yozuvda koʻrinadi — «yosh» — «yasha», «ong» — «angla», ayrimlari koʻrinmaydi — «boqqa» deb aytsak ham «bogʻga» deb yozamiz.",
      easy: "Baʼzi soʻzlar boshqacha aytiladi, lekin qoidaga koʻra yoziladi: aytamiz «kitop» — yozamiz «kitob».",
      draw: [
        { t: 'title', text: 'Aytilishi va yozilishi' },
        { t: 'table', x: 4, y: 18, rows: [['aytilishi', 'yozilishi'], ['kitop', 'kitob'], ['vaxt', 'vaqt'], ['fudbol', 'futbol'], ['boqqa', 'bogʻga'], ['boripti', 'boribdi']] },
        { t: 'text', x: 4, y: 60, text: 'yosh → yasha, ong → angla: oʻzgarish yozuvda ham bor', size: 's', color: 'green' }
      ],
      next: 'Savollarga oʻtamiz'
    }
  ],
  summary: [
    'Tovush oʻzgarishi oʻzlashma soʻzlarda va qoʻshimcha qoʻshilgan oʻz soʻzlarimizda yuz beradi.',
    'Oʻzlashmalardagi talaffuz oʻzgarishi (kitop, vaxt, fudbol) yozuvda aks etmaydi.',
    'Oʻz soʻzlarimizdagi baʼzi oʻzgarishlar yozuvda aks etadi (yasha, angla), baʼzilari aks etmaydi (bogʻga, boribdi).'
  ],
  questions: [
    {
      id: 'oz25q1',
      prompt: 'Qaysi yozuv toʻgʻri?',
      hint: 'Imloda talaffuz oʻzgarishi aks etmaydi.',
      explanation: '«Bogʻga» — «boqqa» deb aytilsa ham, shunday yoziladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bogʻga', 'boqqa', 'bokka', 'boqga'], answerIndex: 0 } }
    },
    {
      id: 'oz25q2',
      prompt: 'Soʻzni oʻzgarish yozuvda aks etadimi, yoʻqmi — shunga koʻra ajrating.',
      hint: '«Yasha» shunday yoziladi.',
      explanation: 'Aks etadi — yasha, angla; aks etmaydi — kitob (kitop), bogʻga (boqqa), boribdi (boripti).',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'h', label: 'yozuvda aks etadi' }, { id: 'y', label: 'yozuvda aks etmaydi' }],
          items: [
            { emoji: '🌱', label: 'yosh → yasha', bin: 'h' },
            { emoji: '💡', label: 'ong → angla', bin: 'h' },
            { emoji: '📘', label: 'kitob → «kitop»', bin: 'y' },
            { emoji: '🌳', label: 'bogʻga → «boqqa»', bin: 'y' },
            { emoji: '🛤️', label: 'boribdi → «boripti»', bin: 'y' }
          ]
        }
      }
    },
    {
      id: 'oz25q3',
      prompt: 'Soʻzni kelib chiqishi bilan juftlang.',
      hint: 'Choy — xitoycha.',
      explanation: 'Kitob — arabcha; dasturxon — fors-tojikcha; samolyot — rus tili orqali; choy — xitoycha.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'kitob', right: 'arabcha' },
            { left: 'dasturxon', right: 'fors-tojikcha' },
            { left: 'samolyot', right: 'rus tili orqali' },
            { left: 'choy', right: 'xitoycha' }
          ]
        }
      }
    },
    {
      id: 'oz25q4',
      prompt: 'Qaysi qatorda barcha soʻzlar toʻgʻri yozilgan?',
      hint: 'Muanbar, Ixlosiya, saylgoh.',
      explanation: '«Muanbar, kamoloti, shukronalik, saylgoh» — toʻgʻri; boshqa qatorlarda xato bor.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['muanbar, kamoloti, shukronalik, saylgoh', 'muambar, kamoloti, shukuronalik, oshyon', 'komoloti, sayilgoh, oshyon, munavvar', 'hayrixoh, ash-or, oshyon, munavvar'], answerIndex: 0 } }
    },
    {
      id: 'oz25q5',
      prompt: 'Qaysi soʻzlarning talaffuzi va imlosi bir xil?',
      hint: 'Oʻzgarishsiz aytiladigan soʻzlar.',
      explanation: 'Parta, sport, divan yozilganidek aytiladi; «kitob» esa «kitop» deb aytiladi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'parta', correct: true },
            { label: 'sport', correct: true },
            { label: 'divan', correct: true },
            { label: 'kitob' }
          ]
        }
      }
    },
    {
      id: 'oz25q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Oʻz soʻzlarining asos holati.',
      explanation: 'Oʻz qatlam soʻzlarining asos holatida tovush oʻzgarishi yuz bermaydi; oʻzgarish qoʻshimcha qoʻshilganda yuz beradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻz soʻzlarimizning asos holatida tovush oʻzgarishi yuz bermaydi.', value: true },
            { text: 'Oʻzlashmalardagi talaffuz oʻzgarishi doimo yozuvda aks ettiriladi.', value: false },
            { text: '«Goʻsht» soʻzi ogʻzaki nutqda «goʻsh» deb aytilishi mumkin.', value: true }
          ]
        }
      }
    }
  ]
};
