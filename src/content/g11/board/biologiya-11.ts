import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 11-§ (63–67-betlar) — edafik omillar, Dokuchayevning tuproq hosil qiluvchi omillari, topografik omillar: balandlik, qiyalik ekspozitsiyasi va tikligi. */
export const BIO_11: BoardLesson = {
  n: 11,
  label: '11',
  group: BOB2,
  title: 'Tuproq va topografik omillar',
  section: '11-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Togʻga koʻtarilsangiz, har necha yuz metrda oʻsimliklar almashadi: pastda bogʻlar, yuqorida archazor, undan yuqorida alp oʻtloqlari. Togʻ etagidan choʻqqisigacha yurish — ekvatordan qutbga sayohat qilish bilan barobar. Bunga tuproq va relyef — edafik va topografik omillar sabab.",
      easy: "Togʻda yuqoriga koʻtarilish — qutbga yurishga oʻxshaydi.",
      draw: [
        { t: 'title', text: 'Togʻdagi zonalar' },
        { t: 'icon', x: 16, y: 40, emoji: '🏔️', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['pastda — bogʻlar', 'oʻrtada — archazor', 'yuqorida — alp oʻtloqlari'] }
      ],
      next: 'Tuproq omillari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Edafik omillar — tuproq xossalari: kimyoviy tarkibi, strukturasi, suv, havo va harorat rejimi. Tuproqshunoslikka V. V. Dokuchayev asos solgan. U tuproq hosil qiluvchi beshta omilni koʻrsatgan: togʻ jinslari, iqlim, relyef, tirik organizmlar va vaqt. Hozir oltinchisi qoʻshilgan — insonning xoʻjalik faoliyati.",
      easy: "Dokuchayev: togʻ jinsi, iqlim, relyef, organizmlar, vaqt (+ inson).",
      draw: [
        { t: 'title', text: 'Tuproq hosil qiluvchi omillar' },
        { t: 'list', x: 4, y: 20, items: ['1) togʻ jinslari', '2) iqlim', '3) relyef', '4) tirik organizmlar', '5) vaqt'] },
        { t: 'text', x: 4, y: 60, text: '+ insonning xoʻjalik faoliyati', color: 'red' },
        { t: 'text', x: 56, y: 30, text: 'V. V. Dokuchayev', color: 'blue' }
      ],
      next: 'Inson va tuproq'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Inson yerga ishlov beradi, oʻgʻitlaydi, sugʻoradi — tuproq unumdorligini oshiradi. Lekin notoʻgʻri foydalanish eroziya — tuproq yuvilishi, shoʻrlanish va botqoqlanishga olib keladi. Oʻsimliklar xilma-xilligi tuproq strukturasi, kimyoviy tarkibi va pH ga bogʻliq, hayvonlar esa oʻsimliklar orqali bogʻliq.",
      easy: "Notoʻgʻri foydalanish — eroziya, shoʻrlanish, botqoqlanish.",
      draw: [
        { t: 'title', text: 'Inson va tuproq' },
        { t: 'icon', x: 12, y: 40, emoji: '🚜', size: 'l' },
        { t: 'list', x: 26, y: 22, items: ['+ oʻgʻit, sugʻorish', '− eroziya', '− shoʻrlanish', '− botqoqlanish'] }
      ],
      next: 'Balandlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Topografik omillar: balandlik, qiyalik tikligi va ekspozitsiyasi. Balandlik ortgan sari harorat va bosim pasayadi, yogʻin, shamol va radiatsiya ortadi. Masalan, togʻ etagida 32 gradus boʻlsa, 1800 metrda 26,5, 2300 metrda 19, 3000 metrda 6 gradus. Bu — vertikal zonallik. Togʻlar migratsiyaga toʻsiq va yangi turlar paydo boʻlishiga sabab.",
      easy: "Balandlik ↑ → harorat ↓, yogʻin ↑ — vertikal zonallik.",
      draw: [
        { t: 'title', text: 'Balandlik va harorat' },
        { t: 'bars', x: 6, y: 20, w: 56, h: 36, items: [{ label: '0 m', value: 32 }, { label: '1800 m', value: 26.5 }, { label: '2300 m', value: 19 }, { label: '3000 m', value: 6 }] },
        { t: 'list', x: 66, y: 24, items: ['harorat ↓', 'bosim ↓', 'yogʻin ↑'] }
      ],
      next: 'Qiyaliklar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ekspozitsiya — qiyalikning dunyo tomonlariga qarashi. Shimoliy yarimsharda janubiy qiyalikka koʻproq quyosh tushadi — u issiqroq va yorugʻroq, shimoliy qiyalik salqin. Janubiy yarimsharda aksincha. Qiyalik qancha tik boʻlsa, tuproq shuncha yuviladi, oʻsimlik kam, asosan kserofitlar oʻsadi.",
      easy: "Janubiy qiyalik — issiq; tik qiyalik — tuproq yuviladi, kserofitlar.",
      draw: [
        { t: 'title', text: 'Qiyalik ekspozitsiyasi' },
        { t: 'point', id: 'q1', x: 10, y: 60, hide: true },
        { t: 'point', id: 'q2', x: 40, y: 26, hide: true },
        { t: 'point', id: 'q3', x: 70, y: 60, hide: true },
        { t: 'polygon', points: ['q1', 'q2', 'q3'], color: 'green' },
        { t: 'text', x: 12, y: 40, text: 'janub ☀️ issiq', color: 'orange' },
        { t: 'text', x: 56, y: 40, text: 'shimol, salqin', color: 'blue' },
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Edafik omillar — tuproq xossalari; Dokuchayev boʻyicha tuproq hosil qiluvchi omillar: togʻ jinslari, iqlim, relyef, tirik organizmlar, vaqt (hozir — inson ham).',
    'Notoʻgʻri foydalanish tuproq eroziyasi, shoʻrlanishi va botqoqlanishiga olib keladi.',
    'Topografik omillar: balandlik (harorat ↓, yogʻin ↑ — vertikal zonallik), qiyalik ekspozitsiyasi (shimoliy yarimsharda janubiy qiyalik issiq) va tikligi.'
  ],
  questions: [
    {
      id: 'b11q1',
      prompt: 'Tuproqshunoslik faniga kim asos solgan?',
      hint: 'Rus olimi.',
      explanation: 'V. V. Dokuchayev.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['V. I. Vernadskiy', 'V. V. Dokuchayev', 'V. N. Sukachev', 'Yu. Libix'], answerIndex: 1 } }
    },
    {
      id: 'b11q2',
      prompt: 'Dokuchayev koʻrsatgan tuproq hosil qiluvchi omillarni belgilang.',
      hint: 'Beshta omil.',
      explanation: 'Togʻ jinslari, iqlim, relyef, tirik organizmlar, vaqt.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'togʻ jinslari', correct: true },
            { label: 'iqlim', correct: true },
            { label: 'relyef', correct: true },
            { label: 'tirik organizmlar', correct: true },
            { label: 'vaqt', correct: true },
            { label: 'Oyning tortishi' }
          ]
        }
      }
    },
    {
      id: 'b11q3',
      prompt: 'Balandlik ortganda kattalik qanday oʻzgaradi? Ajrating.',
      hint: 'Yuqorida sovuq, yogʻin koʻp.',
      explanation: 'Pasayadi: harorat, atmosfera bosimi. Ortadi: yogʻingarchilik, shamol tezligi, radiatsiya.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'd', label: 'Pasayadi' },
            { id: 'u', label: 'Ortadi' }
          ],
          items: [
            { emoji: '', label: 'harorat', bin: 'd' },
            { emoji: '', label: 'atmosfera bosimi', bin: 'd' },
            { emoji: '', label: 'yogʻingarchilik', bin: 'u' },
            { emoji: '', label: 'shamol tezligi', bin: 'u' },
            { emoji: '', label: 'radiatsiya', bin: 'u' }
          ]
        }
      }
    },
    {
      id: 'b11q4',
      prompt: 'Shimoliy yarimsharda qaysi qiyalik issiqroq?',
      hint: 'Quyosh janubda.',
      explanation: 'Janubiy qiyalik — unga koʻproq quyosh nuri tushadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['shimoliy', 'janubiy', 'farqi yoʻq', 'gʻarbiy'], answerIndex: 1 } }
    },
    {
      id: 'b11q5',
      prompt: 'Omilni guruhiga ajrating.',
      hint: 'Relyef — topografik.',
      explanation: 'Edafik: tuproq tarkibi, tuproq namligi, tuproq pH. Topografik: balandlik, qiyalik tikligi, ekspozitsiya.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'e', label: 'Edafik' },
            { id: 't', label: 'Topografik' }
          ],
          items: [
            { emoji: '', label: 'tuproq tarkibi', bin: 'e' },
            { emoji: '', label: 'tuproq namligi', bin: 'e' },
            { emoji: '', label: 'tuproq pH', bin: 'e' },
            { emoji: '', label: 'balandlik', bin: 't' },
            { emoji: '', label: 'qiyalik tikligi', bin: 't' },
            { emoji: '', label: 'ekspozitsiya', bin: 't' }
          ]
        }
      }
    },
    {
      id: 'b11q6',
      prompt: 'Tik qiyaliklarda asosan qaysi oʻsimliklar oʻsadi?',
      hint: 'Tuproq yuvilib, suv kam qoladi.',
      explanation: 'Kserofitlar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['gigrofitlar', 'kserofitlar', 'gidrofitlar', 'soyasevarlar'], answerIndex: 1 } }
    },
    {
      id: 'b11q7',
      prompt: 'Tuproqdan notoʻgʻri foydalanish oqibatlarini belgilang.',
      hint: 'Uchta salbiy jarayon.',
      explanation: 'Eroziya, shoʻrlanish, botqoqlanish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'eroziya', correct: true },
            { label: 'shoʻrlanish', correct: true },
            { label: 'botqoqlanish', correct: true },
            { label: 'gumus koʻpayishi' }
          ]
        }
      }
    },
    {
      id: 'b11q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Vertikal zonallik — kengliklar zonalariga mos.',
      explanation: 'Togʻdagi vertikal zonallik ekvatordan qutbgacha zonalarga mos keladi; togʻlar migratsiyaga toʻsiq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Togʻdagi vertikal zonallik ekvatordan qutbgacha boʻlgan zonalarga mos keladi.', value: true },
            { text: 'Togʻlar organizmlar migratsiyasiga toʻsiq boʻladi.', value: true },
            { text: 'Balandlik ortgan sari havo harorati ortadi.', value: false },
            { text: 'Janubiy yarimsharda ham janubiy qiyalik issiqroq.', value: false }
          ]
        }
      }
    }
  ]
};
