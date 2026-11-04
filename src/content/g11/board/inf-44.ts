import type { BoardLesson } from './types';

/** Darslik: 17-bob — animatsiya: kadr, fps, sahna, qatlam, keyfreym, harakat va shakl tvini, niqob, zichlik. */
export const INF_44: BoardLesson = {
  n: 44,
  label: '44',
  part: 11,
  title: 'Animatsiya',
  section: '17.01–17.02',
  steps: [
    {
      kind: 'hook',
      say: "Daftarning har sahifasiga koptokni biroz boshqa joyda chizing va sahifalarni tez varaqlang — koptok sakray boshlaydi! Animatsiya — harakat illyuziyasini yaratish uchun ketma-ket tez koʻrsatiladigan tasvirlar. Har bir tasvir — kadr. Tezlik soniyadagi kadrlar soni, yaʼni fps bilan oʻlchanadi. Mashhur xato: bir kadr bir soniya emas! 10 fps da 200 kadr yigirma soniya davom etadi.",
      easy: "Animatsiya — tez almashadigan kadrlar. fps — soniyadagi kadrlar. Vaqt = kadrlar ÷ fps.",
      draw: [],
      animTitle: 'Kadrlar va fps',
      anim: { type: 'picture', mode: 'flipbook', fps: 4 },
      next: 'fps oshsa nima boʻladi?'
    },
    {
      kind: 'explain',
      say: "fps qancha yuqori boʻlsa, kadrlar shuncha tez almashadi va harakat ravonroq koʻrinadi, lekin bir soniya uchun koʻproq kadr kerak. Animatsiya davomiyligi teng kadrlar soni boʻlingan fps ga. Masalan, 240 kadr 24 fps da — 10 soniya, 12 fps da — 20 soniya.",
      easy: "Vaqt = kadrlar ÷ fps. fps katta — harakat ravon.",
      draw: [],
      animTitle: 'Davomiylikni hisoblash',
      anim: {
        type: 'sheet',
        cols: ['Kadrlar', 'fps', 'Soniya'],
        rows: [
          [200, 10, ''],
          [240, 24, ''],
          [240, 12, '']
        ],
        steps: [
          { cell: 'C2', formula: '=A2/B2', refs: ['A2', 'B2'], result: 20 },
          { cell: 'C3', formula: '=A3/B3', refs: ['A3', 'B3'], result: 10 },
          { cell: 'C4', formula: '=A4/B4', refs: ['A4', 'B4'], result: 20 }
        ]
      },
      next: 'Animatsiya qayerda yaratiladi?'
    },
    {
      kind: 'explain',
      say: "Animatsiya sahnada yaratiladi; sahna oʻlchami piksellarda. Chap yuqori burchak — nuqta nol, nol; x oʻngga, y pastga qarab oshadi. Har bir mustaqil harakatlanuvchi obyekt oʻz qatlamida boʻladi: fon, daraxt, baliq. Vaqt shkalasi — kadrlar chapdan oʻngga. Qatlam qaysi kadrlarda koʻrinishi shkalada koʻrsatiladi. Keyfreym — tasvir oʻzgaradigan kadr; qolgan kadrlar oldingisini takrorlaydi.",
      easy: "Har obyekt — oʻz qatlamida. Vaqt shkalasi — kadrlar ketma-ketligi. Keyfreym — oʻzgarish boʻlgan kadr.",
      draw: [],
      animTitle: 'Qatlamlar va vaqt shkalasi',
      anim: {
        type: 'timeline',
        total: 14,
        unit: '',
        done: '▶ Animatsiya ijro etildi',
        tracks: [
          { label: 'Fon', icon: '', clips: [{ start: 0, dur: 14, label: 'Dengiz tubi', color: '#0ea5e9' }] },
          { label: 'Daraxt', icon: '', clips: [{ start: 0, dur: 7, label: '1–7 kadr', color: '#16a34a' }] },
          { label: 'Baliq', icon: '', clips: [{ start: 2, dur: 6, label: 'suzadi', color: '#f97316' }, { start: 8, dur: 6, label: 'qaytadi', color: '#ea580c' }] },
          { label: 'Matn', icon: '', clips: [{ start: 9, dur: 5, label: 'Sarlavha', color: '#8b5cf6', fadeIn: true }] }
        ]
      },
      next: 'Tvin nima?'
    },
    {
      kind: 'explain',
      say: "Har kadrni qoʻlda chizish uzoq va harakat «robotdek» chiqadi. Tvinda siz faqat boshlanish va tugash keyfreymlarini belgilaysiz: baliq A nuqtada, keyin B nuqtada. Oradagi kadrlarni kompyuter oʻzi hisoblaydi — harakat ravon boʻladi. Bu harakat tvini: obyekt koʻchadi yoki buriladi. Egri yoʻl boʻylab harakat uchun harakat yoʻlagi chiziladi. Tvin butun qatlamga taʼsir qiladi, shuning uchun har obyekt oʻz qatlamida boʻlishi kerak.",
      easy: "Tvin: siz boshi va oxirini chizasiz, oraliq kadrlarni dastur hisoblaydi.",
      draw: [],
      animTitle: 'Harakat tvini',
      anim: { type: 'picture', mode: 'tween' },
      next: 'Shakl oʻzgarsa-chi?'
    },
    {
      kind: 'explain',
      say: "Shakl tvini, yaʼni morfing, bitta shaklni boshqasiga aylantiradi: qizil kvadrat koʻk doiraga. Boshida bitta keyfreym, oxirida ikkinchisi; kompyuter shakl va rangning har bir oraliq bosqichini hosil qiladi. Shakl tvini harakatni ham oʻz ichiga olishi mumkin: ikkinchi shakl boshqa joyda boʻlsa, oʻsha tomonga koʻchib boradi.",
      easy: "Morfing — bir shakl boshqasiga aylanadi: kvadrat ➜ doira, bulut ➜ quyosh.",
      draw: [],
      animTitle: 'Shakl tvini (morfing)',
      anim: { type: 'picture', mode: 'morph' },
      next: 'Niqob va zichlik?'
    },
    {
      kind: 'explain',
      say: "Niqoblovchi qatlam ekranning faqat bir qismini koʻrsatadi, qolganini yopadi — xuddi teshikdan qaragandek. U pastdagi qatlamlar ustida joylashadi va oʻzi ham tvin bilan harakatlanishi mumkin. Zichlik, yaʼni opacity yoki alfa, shaffoflikni foizda belgilaydi: nol — koʻrinmas, yuz — toʻliq koʻrinadi. Zichlikni nol dan yuzga tvin qilsangiz, obyekt asta-sekin paydo boʻladi.",
      easy: "Niqob — faqat bir qismini koʻrsatadi. Zichlik 0 % — koʻrinmas, 100 % — toʻliq.",
      draw: [],
      animTitle: 'Niqoblovchi qatlam',
      anim: { type: 'picture', mode: 'mask' },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Animatsiya — tez almashadigan kadrlar; tezlik fps (soniyadagi kadrlar) bilan oʻlchanadi; vaqt = kadrlar ÷ fps.',
    'Sahna koordinatalari: (0, 0) chap yuqorida; x oʻngga, y pastga oshadi.',
    'Har mustaqil obyekt oʻz qatlamida; vaqt shkalasi kadrlarni chapdan oʻngga koʻrsatadi; keyfreym — oʻzgarish kadri.',
    'Harakat tvini obyektni koʻchiradi, shakl tvini (morfing) shaklni boshqasiga aylantiradi — oraliq kadrlarni kompyuter hisoblaydi.',
    'Niqoblovchi qatlam faqat bir qismini koʻrsatadi; zichlik (opacity) 0 % — koʻrinmas, 100 % — toʻliq.'
  ],
  questions: [
    {
      id: 'i44q1',
      prompt: '300 kadrli animatsiya 25 fps da necha soniya davom etadi?',
      hint: 'Kadrlar ÷ fps',
      explanation: '300 ÷ 25 = 12 soniya.',
      widget: { type: 'number_answer', props: { answer: 12, unit: 'soniya' } }
    },
    {
      id: 'i44q2',
      prompt: '8 soniyalik animatsiya 30 fps da boʻlishi kerak. Nechta kadr kerak?',
      hint: 'Soniya × fps',
      explanation: '8 × 30 = 240 kadr.',
      widget: { type: 'number_answer', props: { answer: 240, unit: 'kadr' } }
    },
    {
      id: 'i44q3',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Keyfreym, tvin, morfing, fps.',
      explanation: 'Keyfreym — oʻzgarish boʻlgan kadr; tvin — oraliq kadrlarni kompyuter hisoblaydi; morfing — shakl boshqasiga aylanadi; fps — soniyadagi kadrlar.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Keyfreym' }, right: { label: 'tasvir oʻzgaradigan kadr' } },
            { left: { label: 'Tvin' }, right: { label: 'oraliq kadrlarni kompyuter yaratadi' } },
            { left: { label: 'Morfing' }, right: { label: 'bir shakl boshqasiga aylanadi' } },
            { left: { label: 'fps' }, right: { label: 'soniyadagi kadrlar soni' } }
          ]
        }
      }
    },
    {
      id: 'i44q4',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Bir kadr bir soniya emas.',
      explanation: '10 kadr har doim 10 soniya emas — fps ga bogʻliq; tvin har kadrni chizishni talab qilmaydi; zichlik 0 — koʻrinmas; (0, 0) — chap yuqorida.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻnta kadr har doim oʻn soniya davom etadi.', value: false },
            { text: 'Tvinda oraliq kadrlarni kompyuter hisoblaydi.', value: true },
            { text: 'Zichligi 0 % boʻlgan obyekt toʻliq koʻrinadi.', value: false },
            { text: 'Sahnada (0, 0) nuqta chap yuqori burchakda.', value: true }
          ]
        }
      }
    },
    {
      id: 'i44q5',
      prompt: 'Harakat tvini yoki shakl tvini?',
      hint: 'Koʻchadimi yoki aylanadimi?',
      explanation: 'Joy almashtirish va burilish — harakat tvini; kvadrat ➜ doira va bulut ➜ quyosh — shakl tvini.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'm', label: 'Harakat tvini' },
            { id: 's', label: 'Shakl tvini' }
          ],
          tiles: [
            { id: 't1', label: 'Baliq chapdan oʻngga suzadi', bin: 'm' },
            { id: 't2', label: 'Kvadrat doiraga aylanadi', bin: 's' },
            { id: 't3', label: 'Gʻildirak aylanadi', bin: 'm' },
            { id: 't4', label: 'Bulut quyoshga aylanadi', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'i44q6',
      prompt: 'Tvin bilan animatsiya yaratish tartibini tuzing.',
      hint: 'Avval obyekt, oxirida ikkinchi keyfreym.',
      explanation: 'Obyektni chizish ➜ birinchi keyfreym ➜ tvin qoʻshish ➜ ikkinchi keyfreymda obyektni yangi joyga koʻchirish ➜ ijro etish.',
      widget: { type: 'step_order', props: { steps: ['Obyektni oʻz qatlamida chizish', 'Boshlanish keyfreymini qoʻyish', 'Harakat tvinini qoʻshish', 'Tugash keyfreymida obyektni koʻchirish', 'Animatsiyani ijro etish'] } }
    },
    {
      id: 'i44q7',
      prompt: 'Qaysi biri animatsiya atamasi emas?',
      hint: 'Uchtasi vaqt shkalasida uchraydi.',
      explanation: 'Kadr, keyfreym va tvin — animatsiya atamalari. Mail merge — xatlarni birlashtirish.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Kadr' }, { text: 'Keyfreym' }, { text: 'Tvin' }, { text: 'Mail merge', odd: true }] } }
    },
    {
      id: 'i44q8',
      prompt: 'Nima uchun har bir harakatlanuvchi obyekt alohida qatlamda boʻlishi kerak? Toʻgʻrilarini bosing.',
      hint: 'Tvin butun qatlamga taʼsir qiladi.',
      explanation: 'Tvin butun qatlamga taʼsir qiladi; alohida qatlamda obyektni mustaqil tahrirlash va berkitish oson. Fayl hajmini nolga tushirmaydi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Tvin butun qatlamga taʼsir qiladi', match: true },
            { id: 'b', text: 'Obyektni mustaqil tahrirlash mumkin', match: true },
            { id: 'c', text: 'Qatlamni berkitish mumkin', match: true },
            { id: 'd', text: 'Fayl hajmi nolga tushadi', match: false }
          ]
        }
      }
    },
    {
      id: 'i44q9',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Faqat bir qismini koʻrsatadi; shaffoflik.',
      explanation: 'Ekranning faqat bir qismini koʻrsatadigan qatlam — niqoblovchi; shaffoflik darajasi — zichlik (opacity).',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Faqat bir qismini koʻrsatadigan qatlam —' }, { blank: 'niqoblovchi' }, { text: 'qatlam. Shaffoflik darajasi —' }, { blank: 'zichlik' }, { text: '(opacity).' }],
          bank: ['niqoblovchi', 'zichlik', 'keyfreym']
        }
      }
    },
    {
      id: 'i44q10',
      prompt: 'Soniyadagi kadrlar soni qisqartmasini yozing.',
      hint: 'frames per second',
      explanation: 'fps.',
      widget: { type: 'text_answer', props: { answer: ['fps'], width: 5 } }
    }
  ]
};
