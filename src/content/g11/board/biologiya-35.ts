import type { BoardLesson } from './types';

export const BOB4 = { kicker: '4-bob', title: 'Organik olam filogenezi' };

/** Darslik: Biologiya 11, 35-§ (183–186-betlar) — filogenez va ontogenez, biologik progress, arogenez, allogenez, katagenez. */
export const BIO_35: BoardLesson = {
  n: 35,
  label: '35',
  group: BOB4,
  title: 'Organik olam filogenezi',
  section: '35-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Qoramol solityori — tasmasimon chuvalchang: uning na koʻzi, na ichagi bor, tuzilishi juda sodda. Lekin u juda serpusht va keng tarqalgan. Soddalashish ham evolutsiyada gʻalaba boʻlishi mumkinmi? Bugun organizmlarning tarixiy rivojlanish yoʻllarini koʻramiz.",
      easy: "Solityor sodda, lekin muvaffaqiyatli — soddalashish ham progress boʻla oladi.",
      draw: [
        { t: 'title', text: 'Sodda, lekin gʻolib' },
        { t: 'icon', x: 16, y: 40, emoji: '🪱', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['koʻz yoʻq, ichak yoʻq', 'juda serpusht', 'keng tarqalgan'] }
      ],
      next: 'Filogenez'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Filogenez (yunoncha «phulon» — avlod, «genesis» — rivojlanish) — organizmlarning tarixiy rivojlanishi. U ontogenez bilan bogʻliq oʻrganiladi: ontogenez — koʻp hujayrali organizmning zigotadan umrining oxirigacha boʻlgan individual rivojlanishi. Filogenez eralar boʻyicha — arxey, proterozoy, paleozoy, mezozoy, kaynozoy — oʻrganiladi; zamonaviy tasnif filogenezga asoslangan.",
      easy: "Filogenez — tarixiy rivojlanish; ontogenez — individual rivojlanish.",
      draw: [
        { t: 'title', text: 'Ikki xil rivojlanish' },
        { t: 'box', id: 'f', x: 4, y: 22, w: 44, h: 10, text: 'filogenez — tarixiy', color: 'purple' },
        { t: 'box', id: 'o', x: 52, y: 22, w: 44, h: 10, text: 'ontogenez — individual', color: 'green' },
        { t: 'text', x: 4, y: 44, text: 'avlodlar, eralar davomida', size: 's' },
        { t: 'text', x: 52, y: 44, text: 'zigotadan umr oxirigacha', size: 's' }
      ],
      next: 'Biologik progress'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Biologik progress belgilari: individlar soni ortadi, areal kengayadi, yangi populatsiyalar, kenja turlar va turlar paydo boʻladi. Teskarisi — biologik regress. Progressga uchta yoʻnalish olib boradi: arogenez, allogenez va katagenez.",
      easy: "Progress: son ortadi, areal kengayadi, yangi turlar; 3 yoʻl.",
      draw: [
        { t: 'title', text: 'Biologik progress' },
        { t: 'box', id: 'p', x: 30, y: 16, w: 40, h: 8, text: 'biologik progress', color: 'green' },
        { t: 'box', id: 'a', x: 4, y: 42, w: 28, h: 8, text: 'arogenez', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 42, w: 28, h: 8, text: 'allogenez', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 42, w: 28, h: 8, text: 'katagenez', color: 'purple' },
        { t: 'arrow', from: 'a', to: 'p' },
        { t: 'arrow', from: 'b', to: 'p' },
        { t: 'arrow', from: 'c', to: 'p' }
      ],
      next: 'Aromorfoz'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Arogenez — yirik tuzilish oʻzgarishlari, aromorfozlar orqali progress. Aromorfoz — umumiy tuzilish va hayot faoliyatining yuksalishi. Dastlabki uchta yirik aromorfoz: fotosintez, koʻp hujayralilik va jinsiy koʻpayish. Hayvonlarda: nerv sistemasi, jabra va oʻpka, yurak va qon aylanish, issiqqonlilik. Oʻsimliklarda: quruqlikka chiqish, urugʻ bilan koʻpayish, yopiq urugʻlilik. Aromorfozlar yangi boʻlim, tip va sinflarni keltirib chiqaradi.",
      easy: "Aromorfoz — umumiy yuksalish: fotosintez, koʻp hujayralilik, jinsiy koʻpayish.",
      draw: [
        { t: 'title', text: 'Aromorfozlar' },
        { t: 'table', x: 4, y: 18, rows: [['kimda', 'misollar'], ['dastlabki', 'fotosintez, koʻp hujayralilik'], ['hayvonlar', 'nerv sistemasi, yurak'], ['oʻsimliklar', 'urugʻ, gul va meva']] },
        { t: 'text', x: 4, y: 52, text: '→ yangi boʻlim, tip, sinflar', size: 's', color: 'blue' }
      ],
      next: 'Allogenez va katagenez'
    },
    {
      kind: 'example',
      clear: true,
      say: "Allogenez — muayyan muhitga xususiy moslanish, idioadaptatsiya orqali progress; uni ekologik differensiatsiya ham deyishadi. Katagenez — tuzilishning umumiy soddalashuvi, umumiy degeneratsiya orqali progress: parazit yoki oʻtroq hayotga oʻtganda keraksiz organlar yoʻqoladi, lekin serpushtlik va moslashuv tufayli son va areal ortadi — solityor bunga misol.",
      easy: "Allogenez — idioadaptatsiya; katagenez — umumiy degeneratsiya (parazitlar).",
      draw: [
        { t: 'title', text: 'Uch yoʻnalish' },
        { t: 'table', x: 4, y: 18, rows: [['yoʻnalish', 'oʻzgarish', 'misol'], ['arogenez', 'aromorfoz', 'yurak, oʻpka'], ['allogenez', 'idioadaptatsiya', 'xususiy moslanish'], ['katagenez', 'degeneratsiya', 'solityor']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Filogenez — organizmlarning tarixiy rivojlanishi, ontogenez — zigotadan umr oxirigacha boʻlgan individual rivojlanish.',
    'Biologik progress: son ortadi, areal kengayadi, yangi turlar paydo boʻladi; unga arogenez, allogenez va katagenez olib boradi.',
    'Aromorfoz — umumiy yuksalish (fotosintez, koʻp hujayralilik, jinsiy koʻpayish); idioadaptatsiya — xususiy moslanish; umumiy degeneratsiya — soddalashish.'
  ],
  questions: [
    {
      id: 'b35q1',
      prompt: 'Evolutsion yoʻnalishni oʻzgarish turi bilan juftlang.',
      hint: 'Kata — pastga.',
      explanation: 'Arogenez — aromorfoz; allogenez — idioadaptatsiya; katagenez — umumiy degeneratsiya.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'arogenez', right: 'aromorfoz' },
            { left: 'allogenez', right: 'idioadaptatsiya' },
            { left: 'katagenez', right: 'umumiy degeneratsiya' }
          ]
        }
      }
    },
    {
      id: 'b35q2',
      prompt: 'Misolni oʻzgarish turiga ajrating.',
      hint: 'Aromorfoz — butun guruh uchun yuksalish.',
      explanation: 'Aromorfoz: koʻp hujayralilik, issiqqonlilik, urugʻ paydo boʻlishi. Umumiy degeneratsiya: solityorda ichak yoʻqolishi, parazit oʻsimlikda barg yoʻqolishi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'a', label: 'Aromorfoz' },
            { id: 'd', label: 'Degeneratsiya' }
          ],
          items: [
            { emoji: '', label: 'koʻp hujayralilik', bin: 'a' },
            { emoji: '', label: 'issiqqonlilik', bin: 'a' },
            { emoji: '', label: 'urugʻ paydo boʻlishi', bin: 'a' },
            { emoji: '', label: 'solityorda ichak yoʻqligi', bin: 'd' },
            { emoji: '', label: 'parazit oʻsimlikda barg yoʻqligi', bin: 'd' }
          ]
        }
      }
    },
    {
      id: 'b35q3',
      prompt: 'Biologik progress belgilarini tanlang.',
      hint: 'Son va areal.',
      explanation: 'Individlar soni ortadi, areal kengayadi, yangi kenja turlar va turlar paydo boʻladi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'individlar soni ortadi', correct: true },
            { label: 'areal kengayadi', correct: true },
            { label: 'yangi turlar paydo boʻladi', correct: true },
            { label: 'areal torayadi' },
            { label: 'tur yoʻqolib ketadi' }
          ]
        }
      }
    },
    {
      id: 'b35q4',
      prompt: 'Organik olam rivojining dastlabki uchta yirik aromorfozi qaysilar?',
      hint: 'Biri — energiya olish usuli.',
      explanation: 'Fotosintez, koʻp hujayralilik, jinsiy koʻpayish.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['fotosintez, koʻp hujayralilik, jinsiy koʻpayish', 'gul, meva, urugʻ', 'oʻpka, yurak, miya', 'qanot, tuk, pat'], answerIndex: 0 } }
    },
    {
      id: 'b35q5',
      prompt: 'Ontogenez nima?',
      hint: '«ontos» — individual.',
      explanation: 'Koʻp hujayrali organizmning zigotadan umrining oxirigacha boʻlgan individual rivojlanishi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['turning tarixiy rivojlanishi', 'zigotadan umr oxirigacha rivojlanish', 'biosfera evolutsiyasi', 'tur yoʻqolishi'], answerIndex: 1 } }
    },
    {
      id: 'b35q6',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Ekologik differensiatsiya.',
      explanation: 'Allogenez xususiy moslanish — idioadaptatsiyaga olib keladi, uni ekologik differensiatsiya ham deyiladi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Allogenez xususiy moslanish — ' }, { blank: 'idioadaptatsiya' }, { text: 'ni vujudga keltiradi; uni ekologik ' }, { blank: 'differensiatsiya' }, { text: ' ham deyiladi.' }],
          bank: ['idioadaptatsiya', 'differensiatsiya', 'degeneratsiya', 'aromorfoz']
        }
      }
    },
    {
      id: 'b35q7',
      prompt: 'Qaysi biri hayvonlardagi aromorfoz emas?',
      hint: 'Uchtasi — butun guruhni yuksaltirgan.',
      explanation: 'Gʻorda yashashga moslanish — muayyan muhitga xususiy moslanish (idioadaptatsiya), aromorfoz emas.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'nerv sistemasi' }, { text: 'yurak paydo boʻlishi' }, { text: 'issiqqonlilik' }, { text: 'gʻorda yashashga moslanish', odd: true }] } }
    },
    {
      id: 'b35q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Katagenez ham progressga olib keladi.',
      explanation: 'Umumiy degeneratsiya ham biologik progressga olib kelishi mumkin; aromorfozlar keyingi bosqichlarda saqlanadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Umumiy degeneratsiya ham biologik progressga olib kelishi mumkin.', value: true },
            { text: 'Aromorfozlar evolutsiyaning keyingi bosqichlarida saqlanib qoladi.', value: true },
            { text: 'Idioadaptatsiya yangi tip va sinflarni keltirib chiqaradi.', value: false },
            { text: 'Zamonaviy tasnif ontogenezga asoslangan.', value: false }
          ]
        }
      }
    }
  ]
};
