import type { BoardLesson } from './types';
import { OZG3 } from './ozbek-30';

/** Darslik: Ona tili 11, 2-qism (2020), 9-mavzu (30–34-betlar) — nutqdagi «taqiq»lar (tabu): qoʻrquv, uyat, hurmat asosidagi yumshoq ifodalar. */
export const OZ_31: BoardLesson = {
  n: 31,
  label: '31',
  group: OZG3,
  title: 'Nutqdagi «taqiq»lar',
  section: 'Ona tili, 2-qism: 9-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Ayrim tushunchalarni jamiyatning madaniy meʼyorlariga koʻra ochiq aytib boʻlmaydi — bu nutqiy «taqiq», fanda polineziya tilidan olingan «tabu» deb ataladi. Ular oʻrniga yumshoq, «qogʻozga oʻralgan» ifodalar ishlatiladi. Taqiqlar uch asosda paydo boʻladi: qoʻrquvdan — «chayon» oʻrniga «gajak», «ilon» oʻrniga «uzun opa»; uyatdan — «tugʻmoq» oʻrniga «farzandli boʻlmoq»; hurmatdan — «sen» oʻrniga «siz», «bor» oʻrniga «boring».",
      easy: "Baʼzi soʻzlar ochiq aytilmaydi — oʻrniga yumshoq soʻz ishlatiladi: chayon — gajak, sen — siz.",
      draw: [
        { t: 'title', text: 'Taqiq (tabu) asoslari' },
        { t: 'table', x: 4, y: 18, rows: [['asos', 'ochiq', 'yumshoq'], ['qoʻrquv', 'chayon', 'gajak'], ['qoʻrquv', 'ilon', 'uzun opa'], ['uyat', 'tugʻdi', 'farzandli boʻldi'], ['hurmat', 'sen, bor', 'siz, boring']] }
      ],
      next: 'Savollarga oʻtamiz'
    }
  ],
  summary: [
    'Nutqiy «taqiq» (tabu) — madaniy meʼyorlarga koʻra ochiq aytilmaydigan tushunchalar.',
    'Ular oʻrniga yumshoq, «qogʻozga oʻralgan» ifodalar qoʻllanadi.',
    'Taqiqlar qoʻrquv (gajak, uzun opa), uyat (farzandli boʻlmoq) va hurmat (siz, boring) asosida paydo boʻladi.'
  ],
  questions: [
    {
      id: 'oz31q1',
      prompt: '«Tabu» soʻzi qaysi tildan olingan?',
      hint: 'Tinch okean orollari.',
      explanation: 'Polineziya tilidan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['polineziya', 'arab', 'yunon', 'lotin'], answerIndex: 0 } }
    },
    {
      id: 'oz31q2',
      prompt: 'Ifodani taqiq asosiga koʻra ajrating.',
      hint: 'Siz — hurmat.',
      explanation: 'Qoʻrquv — gajak, uzun opa; uyat — farzandli boʻlmoq; hurmat — siz, boring.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'q', label: 'qoʻrquv' }, { id: 'u', label: 'uyat' }, { id: 'h', label: 'hurmat' }],
          items: [
            { emoji: '🦂', label: 'gajak (chayon oʻrniga)', bin: 'q' },
            { emoji: '🐍', label: 'uzun opa (ilon oʻrniga)', bin: 'q' },
            { emoji: '🍼', label: 'farzandli boʻldi', bin: 'u' },
            { emoji: '🎩', label: 'siz (sen oʻrniga)', bin: 'h' },
            { emoji: '🚪', label: 'boring (bor oʻrniga)', bin: 'h' }
          ]
        }
      }
    },
    {
      id: 'oz31q3',
      prompt: 'Taqiq soʻz oʻrniga qanday ifodalar qoʻllanadi?',
      hint: '«Qogʻozga oʻralgan».',
      explanation: 'Yumshoq, madaniy ifodalar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['yumshoq, madaniy ifodalar', 'dagʻal soʻzlar', 'chet soʻzlar', 'raqamlar'], answerIndex: 0 } }
    },
    {
      id: 'oz31q4',
      prompt: 'Ochiq soʻzni yumshoq muqobili bilan juftlang.',
      hint: 'Chayon — gajak.',
      explanation: 'Chayon — gajak; ilon — uzun opa; sen — siz.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'chayon', right: 'gajak' },
            { left: 'ilon', right: 'uzun opa' },
            { left: 'sen', right: 'siz' }
          ]
        }
      }
    },
    {
      id: 'oz31q5',
      prompt: 'Rivoyatda Navoiy shohga yomon xabarni qanday yetkazishni maslahat bergan?',
      hint: 'Gul soʻldi.',
      explanation: 'Ochiq aytmay, «sarvigul soyasida soʻldi gul» kabi obrazli, yumshoq ibora bilan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['obrazli, yumshoq ibora bilan', 'toʻgʻridan toʻgʻri, qisqa', 'xat orqali, raqamlar bilan', 'hech aytmaslikni'], answerIndex: 0 } }
    },
    {
      id: 'oz31q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Taqiqlar — nutq odobi.',
      explanation: 'Taqiqlar til odobining bir qismi; «siz» deb murojaat — hurmat asosidagi taqiq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Taqiq soʻzlar til odobining bir qismi.', value: true },
            { text: '«Sen» oʻrniga «siz» deyish — hurmat asosidagi taqiq.', value: true },
            { text: 'Madaniy nutqda har qanday tushuncha ochiq aytiladi.', value: false }
          ]
        }
      }
    }
  ]
};
