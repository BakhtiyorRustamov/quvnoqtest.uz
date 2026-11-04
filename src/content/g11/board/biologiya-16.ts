import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 16-§ (93–100-betlar) — ekosistemaning trofik strukturasi: konsumentlar tartiblari, detrit va detritofaglar, oʻtloq va detrit tipidagi oziq zanjirlari, trofik darajalar, oziq toʻri. */
export const BIO_16: BoardLesson = {
  n: 16,
  label: '16',
  group: BOB2,
  title: 'Ekotizimlarning trofik strukturasi',
  section: '16-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Oʻt — kapalak qurti — chittak — qirgʻiy. Kim kimni yeydi? Ekotizimdagi barcha organizmlar oziq orqali bogʻlangan: biri ikkinchisiga oziq boʻladi va u orqali modda hamda energiya uzatiladi. «Oziq zanjiri» atamasini 1934-yilda ingliz olimi Ch. Elton taklif etgan.",
      easy: "Oziq zanjiri — kim kimni yeyishi (Elton, 1934).",
      draw: [
        { t: 'title', text: 'Kim kimni yeydi?' },
        { t: 'box', id: 'a', x: 2, y: 30, w: 20, h: 8, text: 'oʻt', color: 'green' },
        { t: 'box', id: 'b', x: 27, y: 30, w: 20, h: 8, text: 'qurt', color: 'orange' },
        { t: 'box', id: 'c', x: 52, y: 30, w: 20, h: 8, text: 'chittak', color: 'orange' },
        { t: 'box', id: 'd', x: 77, y: 30, w: 20, h: 8, text: 'qirgʻiy', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' },
        { t: 'text', x: 4, y: 52, text: 'Ch. Elton, 1934 — «oziq zanjiri»', color: 'blue' }
      ],
      next: 'Konsumentlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Produtsentlarni yeydiganlar — birinchi tartib konsumentlar: chigirtka, tuyoqli hayvonlar, parazit oʻsimliklar. Ularni yeydigan yirtqichlar — ikkinchi tartib, ularni yeydiganlar — uchinchi tartib. Hammaxoʻrlar — toʻngʻiz, qoʻngʻir ayiq, kalamush — bir vaqtda bir necha tartibda boʻladi. Konsumentlar tartibi soni produtsentlar biomassasiga bogʻliq — cheklangan.",
      easy: "I tartib — oʻtxoʻr, II — yirtqich, III — yirik yirtqich; hammaxoʻr — bir nechasi.",
      draw: [
        { t: 'title', text: 'Konsumentlar tartibi' },
        { t: 'table', x: 4, y: 20, rows: [['tartib', 'kimni yeydi', 'misol'], ['I', 'oʻsimlik', 'chigirtka, kiyik'], ['II', 'oʻtxoʻr', 'qurbaqa, tulki'], ['III', 'yirtqich', 'lochin, boʻri']] },
        { t: 'text', x: 4, y: 52, text: 'hammaxoʻr: toʻngʻiz, ayiq, kalamush', size: 's', color: 'purple' }
      ],
      next: 'Ikki xil zanjir'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻtloq tipidagi zanjir yashil oʻsimlikdan boshlanadi va 4–6 boʻgʻindan iborat: oʻsimlik — oʻtxoʻr hasharot — yirtqich hasharot — hasharotxoʻr qush — yirtqich qush. Detrit tipidagi zanjir oʻlik organik modda — detritdan boshlanadi va 2–3 boʻgʻinli: toʻkilgan barg — chuvalchang va bakteriyalar — tuproq hasharotlari — yirtqichlar. Detritni yeydiganlar — detritofaglar: eshakqurt, koʻpoyoq, chuvalchang.",
      easy: "Oʻtloq zanjiri — oʻsimlikdan (4–6 boʻgʻin); detrit zanjiri — oʻlik qoldiqdan (2–3).",
      draw: [
        { t: 'title', text: 'Ikki xil oziq zanjiri' },
        { t: 'table', x: 4, y: 20, rows: [['zanjir', 'boshlanishi', 'boʻgʻin'], ['oʻtloq tipi', 'yashil oʻsimlik', '4–6'], ['detrit tipi', 'oʻlik qoldiq', '2–3']] },
        { t: 'formula', x: 4, y: 48, text: 'barg → chuvalchang → hasharot' },
        { t: 'text', x: 4, y: 60, text: 'detritofaglar: eshakqurt, koʻpoyoq', size: 's', color: 'purple' }
      ],
      next: 'Trofik darajalar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oziq zanjirining bitta boʻgʻinidagi organizmlar yigʻindisi — trofik daraja. Birinchi daraja — produtsentlar, ikkinchi — oʻtxoʻrlar, uchinchi — yirtqichlar va hokazo. Suvda: fitoplankton — zooplankton — pingvin — dengiz qoploni — kasatka. Bir tur turli darajada boʻlishi mumkin: qirgʻiy sichqonni yesa — uchinchi, ilonni yesa — toʻrtinchi darajada.",
      easy: "Trofik daraja — zanjirdagi oʻrin; qirgʻiy: sichqon — 3-, ilon — 4-daraja.",
      draw: [
        { t: 'title', text: 'Trofik darajalar' },
        { t: 'box', id: 'a', x: 2, y: 24, w: 18, h: 8, text: 'fito-', color: 'green' },
        { t: 'box', id: 'b', x: 22, y: 24, w: 18, h: 8, text: 'zoo-' },
        { t: 'box', id: 'c', x: 42, y: 24, w: 18, h: 8, text: 'pingvin' },
        { t: 'box', id: 'd', x: 62, y: 24, w: 18, h: 8, text: 'qoplon' },
        { t: 'box', id: 'e', x: 82, y: 24, w: 16, h: 8, text: 'kasatka', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' },
        { t: 'arrow', from: 'd', to: 'e' },
        { t: 'list', x: 4, y: 42, items: ['I daraja — produtsent', 'II daraja — I tartib konsument', 'V daraja — IV tartib konsument'] }
      ],
      next: 'Oziq toʻri'
    },
    {
      kind: 'example',
      clear: true,
      say: "Koʻp turlar turli oziq yeydi, shuning uchun zanjirlar chalkashib oziq toʻrini hosil qiladi. Qirgʻiy kaltakesak, quyon va ilonni yeydi — u bir nechta zanjirni bogʻlaydi. Agar bitta tur yoʻqolsa ham tizim buzilmaydi: organizmlar boshqa oziqqa oʻtadi. Shuning uchun turlar qancha xilma-xil boʻlsa, ekotizim shuncha barqaror.",
      easy: "Oziq toʻri — chalkash zanjirlar; koʻp tur — barqaror tizim.",
      draw: [
        { t: 'title', text: 'Oziq toʻri' },
        { t: 'box', id: 'o', x: 36, y: 56, w: 24, h: 7, text: 'oʻtlar', color: 'green' },
        { t: 'box', id: 'q', x: 6, y: 40, w: 22, h: 7, text: 'quyon' },
        { t: 'box', id: 's', x: 38, y: 40, w: 22, h: 7, text: 'sichqon' },
        { t: 'box', id: 'i', x: 70, y: 40, w: 22, h: 7, text: 'ilon' },
        { t: 'box', id: 't', x: 16, y: 22, w: 22, h: 7, text: 'tulki', color: 'red' },
        { t: 'box', id: 'b', x: 58, y: 22, w: 24, h: 7, text: 'boyqush', color: 'red' },
        { t: 'arrow', from: 'o', to: 'q' },
        { t: 'arrow', from: 'o', to: 's' },
        { t: 'arrow', from: 's', to: 'i' },
        { t: 'arrow', from: 'q', to: 't' },
        { t: 'arrow', from: 's', to: 't' },
        { t: 'arrow', from: 's', to: 'b' },
        { t: 'arrow', from: 'i', to: 'b' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Konsumentlar tartiblari: I — oʻtxoʻrlar, II — yirtqichlar, III — yirik yirtqichlar; hammaxoʻrlar bir necha tartibda boʻladi.',
    'Oziq zanjirlari: oʻtloq tipi (yashil oʻsimlikdan, 4–6 boʻgʻin) va detrit tipi (oʻlik qoldiqdan, 2–3 boʻgʻin); trofik daraja — zanjirdagi oʻrin.',
    'Zanjirlar chalkashib oziq toʻrini hosil qiladi; turlar xilma-xilligi ekotizim barqarorligini taʼminlaydi.'
  ],
  questions: [
    {
      id: 'b16q1',
      prompt: 'Oziq zanjiri boʻgʻinlarini toʻgʻri tartiblang.',
      hint: 'Avval produtsent.',
      explanation: 'Olma daraxti → ari → oʻrgimchak → chittak → qirgʻiy.',
      widget: { type: 'order_line', props: { items: [{ label: 'olma daraxti' }, { label: 'ari' }, { label: 'oʻrgimchak' }, { label: 'chittak' }, { label: 'qirgʻiy' }] } }
    },
    {
      id: 'b16q2',
      prompt: 'Organizmni zanjir turiga ajrating.',
      hint: 'Detrit — oʻlik qoldiq.',
      explanation: 'Oʻtloq zanjiri: quyon, terak, suvsar. Detrit zanjiri: mogʻor zamburugʻi, eshakqurt, oʻlimtikxoʻr qoʻngʻiz.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'o', label: 'Oʻtloq zanjiri' },
            { id: 'd', label: 'Detrit zanjiri' }
          ],
          items: [
            { emoji: '', label: 'terak', bin: 'o' },
            { emoji: '', label: 'quyon', bin: 'o' },
            { emoji: '', label: 'suvsar', bin: 'o' },
            { emoji: '', label: 'mogʻor zamburugʻi', bin: 'd' },
            { emoji: '', label: 'eshakqurt', bin: 'd' },
            { emoji: '', label: 'oʻlimtikxoʻr qoʻngʻiz', bin: 'd' }
          ]
        }
      }
    },
    {
      id: 'b16q3',
      prompt: '«Oziq zanjiri» atamasini kim taklif etgan?',
      hint: 'Ingliz ekologi, 1934.',
      explanation: 'Ch. Elton.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['R. Lindeman', 'Ch. Elton', 'A. Tensli', 'G. F. Gauze'], answerIndex: 1 } }
    },
    {
      id: 'b16q4',
      prompt: 'Qirgʻiy ilonni (ilon sichqonni, sichqon oʻtni yeydi) yeganda qaysi trofik darajada boʻladi?',
      hint: 'Oʻt — 1-daraja.',
      explanation: 'Oʻt (1) → sichqon (2) → ilon (3) → qirgʻiy (4).',
      widget: { type: 'number_answer', props: { answer: 4 } }
    },
    {
      id: 'b16q5',
      prompt: 'Hammaxoʻr hayvonlarni belgilang.',
      hint: 'Oʻsimlik ham, goʻsht ham.',
      explanation: 'Toʻngʻiz, qoʻngʻir ayiq, kalamush, suvarak — hammaxoʻr.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'toʻngʻiz', correct: true },
            { label: 'qoʻngʻir ayiq', correct: true },
            { label: 'kalamush', correct: true },
            { label: 'kiyik' },
            { label: 'lochin' }
          ]
        }
      }
    },
    {
      id: 'b16q6',
      prompt: 'Suv zanjirini toʻgʻri tartiblang.',
      hint: 'Fitoplankton — produtsent.',
      explanation: 'Fitoplankton → zooplankton → baliq chavogʻi → choʻrtan.',
      widget: { type: 'order_line', props: { items: [{ label: 'fitoplankton' }, { label: 'zooplankton' }, { label: 'baliq chavogʻi' }, { label: 'choʻrtan' }] } }
    },
    {
      id: 'b16q7',
      prompt: 'Nima uchun oziq toʻri ekotizimni barqaror qiladi?',
      hint: 'Bitta tur yoʻqolsa…',
      explanation: 'Bir tur yoʻqolsa ham organizmlar boshqa oziq manbalariga oʻtadi.',
      widget: {
        type: 'mcq',
        props: { prompt: '', choices: ['organizmlar boshqa oziqqa oʻta oladi', 'yirtqichlar yoʻqoladi', 'zanjirlar qisqaradi', 'produtsentlar koʻpaymaydi'], answerIndex: 0 }
      }
    },
    {
      id: 'b16q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Detritofaglar — konsumentlar.',
      explanation: 'Detritofaglar konsument hisoblanadi; detrit zanjiri qisqaroq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Detritofaglar konsumentlarga kiradi.', value: true },
            { text: 'Detrit zanjiri odatda oʻtloq zanjiridan qisqa.', value: true },
            { text: 'Bitta tur faqat bitta trofik darajada boʻla oladi.', value: false },
            { text: 'Konsumentlar tartibi soni cheksiz boʻlishi mumkin.', value: false }
          ]
        }
      }
    }
  ]
};
