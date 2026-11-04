import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 4-§ (18–23-betlar) — ekotop, klimatop, edafotop, biotop; biotsenoz va uning funksional guruhlari; biogeotsenoz xususiyatlari, suksessiya. */
export const BIO_4: BoardLesson = {
  n: 4,
  label: '4',
  group: BOB2,
  title: 'Ekosistemalarning tarkibiy qismlari',
  section: '4-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Vulqon otilib, dengizdan yangi orol paydo boʻldi. Unda hali hech qanday hayot yoʻq — faqat tosh, havo va quyosh. Bunday hali tirik organizmlar oʻzgartirmagan hudud ekotop deyiladi. Hayot kelib, uni oʻzgartirgach, ekotop biotopga aylanadi.",
      easy: "Ekotop — hayot oʻzgartirmagan joy; biotop — hayot oʻzgartirgan joy.",
      draw: [
        { t: 'title', text: 'Ekotopdan biotopga' },
        { t: 'icon', x: 16, y: 40, emoji: '🌋', size: 'l' },
        { t: 'formula', x: 32, y: 34, text: 'ekotop → biotop' },
        { t: 'text', x: 32, y: 46, text: 'tirik organizmlar muhitni oʻzgartiradi', size: 's' }
      ],
      next: 'Abiotik qism'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ekotop ikki qismdan iborat: klimatop — yorugʻlik, harorat, namlik, havo; va edafotop — tuproq, u tirik organizmlar faoliyati natijasida hosil boʻladi. Tirik organizmlar oʻzgartirgan ekotop yoki maʼlum oʻsimlik va hayvonlar yashaydigan hudud — biotop.",
      easy: "Ekotop = klimatop (iqlim) + edafotop (tuproq).",
      draw: [
        { t: 'title', text: 'Abiotik qism' },
        { t: 'box', id: 'e', x: 32, y: 18, w: 30, h: 8, text: 'ekotop', color: 'orange' },
        { t: 'box', id: 'k', x: 6, y: 36, w: 34, h: 8, text: 'klimatop' },
        { t: 'box', id: 'd', x: 56, y: 36, w: 34, h: 8, text: 'edafotop' },
        { t: 'arrow', from: 'e', to: 'k' },
        { t: 'arrow', from: 'e', to: 'd' },
        { t: 'text', x: 6, y: 54, text: 'yorugʻlik, harorat, namlik', size: 's' },
        { t: 'text', x: 56, y: 54, text: 'tuproq', size: 's' }
      ],
      next: 'Tirik qism'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Biotsenoz — biotopdagi tirik organizmlar yigʻindisi. Uning qismlari: fitosenoz — oʻsimliklar, zoosenoz — hayvonlar, mikosenoz — zamburugʻlar, mikrobiotsenoz — mikroorganizmlar. Yashil oʻsimliklar fotosintezda organik modda hosil qiladi, hayvonlar uni isteʼmol qiladi, zamburugʻ va mikroblar qoldiqlarni parchalaydi.",
      easy: "Fito- — oʻsimlik, zoo- — hayvon, miko- — zamburugʻ, mikrobio- — mikrob.",
      draw: [
        { t: 'title', text: 'Biotsenoz qismlari' },
        { t: 'table', x: 4, y: 20, rows: [['jamoa', 'kimlar'], ['fitosenoz', 'oʻsimliklar'], ['zoosenoz', 'hayvonlar'], ['mikosenoz', 'zamburugʻlar'], ['mikrobiotsenoz', 'mikroorganizmlar']] }
      ],
      next: 'Funksional guruhlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Barcha tirik organizmlar uch funksional guruhga boʻlinadi. Produtsentlar — avtotroflar: yashil oʻsimliklar, fotosintez va xemosintez qiluvchi bakteriyalar; ular anorganik moddalardan organik modda yaratadi. Konsumentlar — tayyor organik modda isteʼmol qiluvchi geterotroflar: hayvonlar, parazit oʻsimliklar. Redutsentlar — qoldiqlarni mineral moddalargacha parchalovchi bakteriya va zamburugʻlar.",
      easy: "Produtsent — yaratadi, konsument — isteʼmol qiladi, redutsent — parchalaydi.",
      draw: [
        { t: 'title', text: 'Uch funksional guruh' },
        { t: 'box', id: 'p', x: 4, y: 24, w: 28, h: 8, text: 'produtsent', color: 'green' },
        { t: 'box', id: 'c', x: 36, y: 24, w: 28, h: 8, text: 'konsument', color: 'orange' },
        { t: 'box', id: 'r', x: 68, y: 24, w: 28, h: 8, text: 'redutsent', color: 'purple' },
        { t: 'arrow', from: 'p', to: 'c' },
        { t: 'arrow', from: 'c', to: 'r' },
        { t: 'text', x: 4, y: 42, text: 'yaratadi', size: 's', color: 'green' },
        { t: 'text', x: 36, y: 42, text: 'isteʼmol qiladi', size: 's', color: 'orange' },
        { t: 'text', x: 68, y: 42, text: 'parchalaydi', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 56, text: 'mineral moddalar yana produtsentlarga qaytadi', size: 's' }
      ],
      next: 'Xususiyatlar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Biogeotsenoz xususiyatlari: oʻz-oʻzini tiklash, barqarorlik, oʻz-oʻzini boshqarish va rivojlanish. Masalan, urugʻ koʻp boʻlsa kemiruvchilar koʻpayadi, ular ortidan yirtqichlar koʻpayadi, yirtqichlar esa kemiruvchilarni yana kamaytiradi. Barqarorlik turlar xilma-xilligiga bogʻliq. Bir biotsenoz oʻrnini asta-sekin boshqasi egallashi — suksessiya.",
      easy: "Oʻz-oʻzini boshqarish: urugʻ → kemiruvchi → yirtqich; suksessiya — jamoalar almashinuvi.",
      draw: [
        { t: 'title', text: 'Oʻz-oʻzini boshqarish' },
        { t: 'box', id: 's', x: 4, y: 24, w: 24, h: 8, text: 'urugʻ ↑', color: 'green' },
        { t: 'box', id: 'k', x: 38, y: 24, w: 26, h: 8, text: 'kemiruvchi ↑', color: 'orange' },
        { t: 'box', id: 'y', x: 72, y: 24, w: 24, h: 8, text: 'yirtqich ↑', color: 'red' },
        { t: 'arrow', from: 's', to: 'k' },
        { t: 'arrow', from: 'k', to: 'y' },
        { t: 'text', x: 4, y: 44, text: 'yirtqich ↑ → kemiruvchi ↓ → muvozanat', color: 'purple' },
        { t: 'text', x: 4, y: 56, text: 'suksessiya — biotsenozlar almashinuvi', size: 's' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ekotop (klimatop + edafotop) — hayot oʻzgartirmagan hudud; organizmlar uni biotopga aylantiradi.',
    'Biotsenoz: fitosenoz, zoosenoz, mikosenoz, mikrobiotsenoz; funksional guruhlar — produtsentlar, konsumentlar, redutsentlar.',
    'Biogeotsenoz oʻz-oʻzini tiklaydi va boshqaradi, barqarorligi turlar xilma-xilligiga bogʻliq; jamoalar almashinuvi — suksessiya.'
  ],
  questions: [
    {
      id: 'b4q1',
      prompt: 'Organizmni funksional guruhiga ajrating.',
      hint: 'Zamburugʻ — parchalovchi.',
      explanation: 'Produtsent: qayin, laminariya, temir bakteriyasi. Konsument: bugʻu, choʻrtan. Redutsent: oq zamburugʻ, ammonifikator bakteriya.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'p', label: 'Produtsent' },
            { id: 'c', label: 'Konsument' },
            { id: 'r', label: 'Redutsent' }
          ],
          items: [
            { emoji: '', label: 'qayin', bin: 'p' },
            { emoji: '', label: 'laminariya', bin: 'p' },
            { emoji: '', label: 'temir bakteriyasi', bin: 'p' },
            { emoji: '', label: 'bugʻu', bin: 'c' },
            { emoji: '', label: 'choʻrtan baliq', bin: 'c' },
            { emoji: '', label: 'ammonifikator bakteriya', bin: 'r' }
          ]
        }
      }
    },
    {
      id: 'b4q2',
      prompt: 'Jamoani uning tarkibi bilan juftlang.',
      hint: 'Fito- — oʻsimlik.',
      explanation: 'Fitosenoz — oʻsimliklar; zoosenoz — hayvonlar; mikosenoz — zamburugʻlar; mikrobiotsenoz — mikroorganizmlar.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'fitosenoz', right: 'oʻsimliklar' },
            { left: 'zoosenoz', right: 'hayvonlar' },
            { left: 'mikosenoz', right: 'zamburugʻlar' },
            { left: 'mikrobiotsenoz', right: 'mikroorganizmlar' }
          ]
        }
      }
    },
    {
      id: 'b4q3',
      prompt: 'Edafotop nima?',
      hint: 'Edafos — tuproq.',
      explanation: 'Ekotopning tuproq qismi — tirik organizmlar faoliyati natijasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['iqlim sharoitlari', 'tuproq', 'oʻsimliklar jamoasi', 'suv havzasi'], answerIndex: 1 } }
    },
    {
      id: 'b4q4',
      prompt: 'Redutsentlar ekosistemada qanday vazifani bajaradi?',
      hint: 'Reduco — qaytaraman.',
      explanation: 'Organik qoldiqlarni mineral moddalargacha parchalab, muhitga qaytaradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['fotosintez qiladi', 'organik qoldiqlarni mineral moddagacha parchalaydi', 'oʻtxoʻrlarni isteʼmol qiladi', 'kislorod ishlab chiqaradi'], answerIndex: 1 } }
    },
    {
      id: 'b4q5',
      prompt: 'Oʻz-oʻzini boshqarish zanjirini tartiblang.',
      hint: 'Avval oziq koʻpayadi.',
      explanation: 'Urugʻ koʻpayadi → kemiruvchilar koʻpayadi → yirtqichlar koʻpayadi → kemiruvchilar kamayadi.',
      widget: { type: 'step_order', props: { steps: ['urugʻ hosili koʻpayadi', 'kemiruvchilar soni ortadi', 'yirtqichlar soni ortadi', 'kemiruvchilar soni kamayadi'] } }
    },
    {
      id: 'b4q6',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Suksessiya — almashinish.',
      explanation: 'Ekotop — hayot oʻzgartirmagan hudud; biotop — hayot oʻzgartirgan hudud; suksessiya — biotsenozlar almashinuvi; klimatop — iqlim omillari.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'ekotop' }, b: { label: 'hali oʻzgarmagan hudud' } },
            { a: { label: 'biotop' }, b: { label: 'hayot oʻzgartirgan hudud' } },
            { a: { label: 'suksessiya' }, b: { label: 'jamoalar almashinuvi' } },
            { a: { label: 'klimatop' }, b: { label: 'iqlim omillari' } }
          ]
        }
      }
    },
    {
      id: 'b4q7',
      prompt: 'Biogeotsenoz barqarorligi asosan nima bilan taʼminlanadi?',
      hint: 'Turlar qancha koʻp…',
      explanation: 'Turlar xilma-xilligi bilan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['maydonning kattaligi', 'turlar xilma-xilligi', 'yirtqichlarning yoʻqligi', 'yogʻingarchilik'], answerIndex: 1 } }
    },
    {
      id: 'b4q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Xemosintez ham produtsentga xos.',
      explanation: 'Xemosintezlovchi bakteriyalar — produtsent; parazit oʻsimliklar — konsument; davriy oʻzgarishda jamoa dastlabki holatiga qaytadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Xemosintezlovchi bakteriyalar produtsentlarga kiradi.', value: true },
            { text: 'Parazit oʻsimliklar konsumentlarga kiradi.', value: true },
            { text: 'Redutsentlar — avtotrof organizmlar.', value: false },
            { text: 'Yangi paydo boʻlgan vulqon oroli — biotop.', value: false }
          ]
        }
      }
    }
  ]
};
