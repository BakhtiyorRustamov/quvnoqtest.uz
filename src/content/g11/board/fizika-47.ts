import type { BoardLesson } from './types';
import { BOB7 } from './fizika-39';

/** Darslik: Fizika 11, 45-mavzu (182–184-betlar) — Oʻzbekistonda yadro fizikasi sohasidagi tadqiqotlar va ularning xalq xoʻjaligida qoʻllanilishi. */
export const FIZ_47: BoardLesson = {
  n: 47,
  label: '45',
  group: BOB7,
  title: 'Oʻzbekistonda yadro fizikasi',
  section: '45-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Toshkent yaqinidagi Ulugʻbek shaharchasida Oʻzbekiston Fanlar akademiyasining Yadro fizikasi instituti joylashgan. Bu yerda ilmiy tadqiqotlardan tashqari kasalxonalar uchun radioaktiv dorilar, qishloq xoʻjaligi uchun yangi usullar yaratiladi. Yadro fizikasi faqat elektr stansiyasi emas — u dalada, shifoxonada ham ishlaydi.",
      easy: "Yadro fizikasi — fan, tibbiyot va qishloq xoʻjaligida.",
      draw: [
        { t: 'title', text: 'Yadro fizikasi bizning yurtda' },
        { t: 'icon', x: 16, y: 34, emoji: '🏛️', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🌱', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['Yadro fizikasi instituti', 'tibbiyot uchun izotoplar', 'qishloq xoʻjaligi'] }
      ],
      next: 'Tarix'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻzbekistonda yadro fizikasi ishlari oʻtgan asrning 20-yillarida boshlangan, muntazam tadqiqotlar 1949-yilda Fizika-texnika institutida yoʻlga qoʻyilgan. Akademiklar Kurchatov, Orifov va Azimov tashabbusi bilan 1956-yilda Fanlar akademiyasining Yadro fizikasi instituti tashkil etildi. 1970-yilda Cherenkov hisoblagichlari asosida zarralarning yadro bilan taʼsirini oʻrganuvchi ulkan qurilma yaratildi.",
      easy: "1949 — muntazam tadqiqotlar; 1956 — Yadro fizikasi instituti.",
      draw: [
        { t: 'title', text: 'Tarixdan' },
        { t: 'table', x: 6, y: 22, rows: [['yil', 'voqea'], ['1920-yillar', 'ilk ishlar'], ['1949', 'Fizika-texnika institutida tadqiqotlar'], ['1956', 'Yadro fizikasi instituti'], ['1970', 'Cherenkov hisoblagichli qurilma']] },
        { t: 'text', x: 6, y: 64, text: 'Kurchatov, Orifov, Azimov', size: 's', color: 'purple' }
      ],
      next: 'Tadqiqot yoʻnalishlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hozir yadro spektroskopiyasi va yadro tuzilishi, yadro reaksiyalari, elementar zarralar fizikasi, relyativistik yadro fizikasi boʻyicha tadqiqotlar olib borilmoqda. Radiatsion fizikada nurlanishning yarimoʻtkazgichlar, sopollar, oʻta oʻtkazgichlar xossalariga taʼsiri oʻrganiladi. Pufakli kamera filmlarini qayta ishlash markazida yangi ikki barionli rezonanslar haqida maʼlumotlar olingan.",
      easy: "Yadro tuzilishi, reaksiyalar, zarralar fizikasi, radiatsion materialshunoslik.",
      draw: [
        { t: 'title', text: 'Tadqiqot yoʻnalishlari' },
        { t: 'list', x: 6, y: 22, items: ['yadro spektroskopiyasi va tuzilishi', 'yadro reaksiyalari', 'elementar zarralar fizikasi', 'radiatsion fizika va materialshunoslik'] },
        { t: 'text', x: 6, y: 62, text: 'OʻzMU, SamDU, Fizika-texnika instituti', size: 's', color: 'purple' }
      ],
      next: 'Xalq xoʻjaligida'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Birinchi tadqiqotlarning oʻziyoq xoʻjalikka foyda keltirgan: Orifov gamma-nurlar yordamida pilla ichidagi ipak qurtini oʻldirish usulini ishlab chiqdi. Gʻoʻza navlarining nurlanishga sezgirligi oʻrganilib, seleksiyada qoʻllanmoqda. Tibbiyotda radioaktiv izotoplar bilan tashxis qoʻyiladi va saraton davolanadi. Institut 1995-yilda 60 dan ortiq nomdagi izotop mahsulotlari ishlab chiqargan.",
      easy: "Pilla (gamma-nurlar), gʻoʻza seleksiyasi, tibbiy izotoplar.",
      draw: [
        { t: 'title', text: 'Amaliy natijalar' },
        { t: 'icon', x: 12, y: 30, emoji: '🐛', size: 'm' },
        { t: 'icon', x: 12, y: 44, emoji: '🌿', size: 'm' },
        { t: 'icon', x: 12, y: 58, emoji: '🏥', size: 'm' },
        { t: 'list', x: 22, y: 26, items: ['pilla — gamma-nurlar (Orifov)', 'gʻoʻza seleksiyasi', 'tashxis va saraton davosi'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Tibbiyotda qalqonsimon bezni tekshirish uchun yod-131 izotopi ishlatiladi, uning yarim yemirilish davri taxminan 8 kun. 24 kundan keyin preparatning qancha qismi qoladi? 24 kun — 3 ta yarim davr. Qoladi: 1/2 ning kubi, yaʼni 1/8 qismi — 12,5 foiz. Shuning uchun tibbiy izotoplar tez-tez yangidan tayyorlanadi.",
      easy: "24 kun = 3T → 1/8 = 12,5 % qoladi.",
      draw: [
        { t: 'title', text: 'Tibbiy izotop qancha qoladi?' },
        { t: 'list', x: 6, y: 20, items: ['yod-131: T ≈ 8 kun', 't = 24 kun'] },
        { t: 'formula', x: 6, y: 44, text: 'N / N₀ = (1/2)^(t/T) = (1/2)³' },
        { t: 'formula', x: 6, y: 56, text: 'N / N₀ = 1/8 = 12,5 %' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Oʻzbekistonda muntazam yadro tadqiqotlari 1949-yilda boshlangan; Yadro fizikasi instituti 1956-yilda tashkil etilgan.',
    'Yoʻnalishlar: yadro tuzilishi va reaksiyalari, elementar zarralar, radiatsion fizika va materialshunoslik.',
    'Amaliy natijalar: pillachilik (gamma-nurlar), gʻoʻza seleksiyasi, tibbiy izotoplar, tashxis va saraton davosi.'
  ],
  questions: [
    {
      id: 'f47q1',
      prompt: 'Yod-131 ning yarim yemirilish davri 8 kun. 16 kundan keyin preparatning necha foizi qoladi?',
      hint: '16 kun = 2T.',
      explanation: '(1/2)² = 1/4 = 25 %.',
      widget: { type: 'number_answer', props: { answer: 25, unit: '%' } }
    },
    {
      id: 'f47q2',
      prompt: 'Oʻzbekiston Fanlar akademiyasining Yadro fizikasi instituti qachon tashkil etilgan?',
      hint: 'Kurchatov, Orifov, Azimov tashabbusi.',
      explanation: '1956-yilda.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1920', '1949', '1956', '1970'], answerIndex: 2 } }
    },
    {
      id: 'f47q3',
      prompt: 'Voqealarni xronologik tartibda joylang.',
      hint: '1920-yillardan 1970 gacha.',
      explanation: 'Ilk ishlar → Fizika-texnika institutida muntazam tadqiqotlar (1949) → Yadro fizikasi instituti (1956) → Cherenkov qurilmasi (1970).',
      widget: { type: 'order_line', props: { items: [{ label: 'ilk ishlar' }, { label: 'muntazam tadqiqotlar' }, { label: 'Yadro fizikasi instituti' }, { label: 'Cherenkov qurilmasi' }] } }
    },
    {
      id: 'f47q4',
      prompt: 'Qoʻllanishni sohasiga qarab ajrating.',
      hint: 'Pilla — qishloq xoʻjaligi.',
      explanation: 'Qishloq xoʻjaligi: pilla, gʻoʻza seleksiyasi. Tibbiyot: saraton davosi, tashxis.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'q', label: 'Qishloq xoʻjaligi' },
            { id: 't', label: 'Tibbiyot' }
          ],
          items: [
            { emoji: '🐛', label: 'pilla ichidagi qurtni oʻldirish', bin: 'q' },
            { emoji: '🌿', label: 'gʻoʻza seleksiyasi', bin: 'q' },
            { emoji: '💊', label: 'saraton davosi', bin: 't' },
            { emoji: '🩺', label: 'izotoplar bilan tashxis', bin: 't' }
          ]
        }
      }
    },
    {
      id: 'f47q5',
      prompt: 'Gamma-nurlar yordamida pilla ichidagi ipak qurtini oʻldirish usulini kim ishlab chiqqan?',
      hint: 'Akademik, institut tashabbuskorlaridan biri.',
      explanation: 'U. O. Orifov.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['U. Orifov', 'Fermi', 'Bekkerel', 'Gell-Man'], answerIndex: 0 } }
    },
    {
      id: 'f47q6',
      prompt: 'Oʻzbekistonda olib borilayotgan yadro tadqiqotlari yoʻnalishlarini tanlang.',
      hint: 'Toʻrttasi matnda bor.',
      explanation: 'Yadro tuzilishi, yadro reaksiyalari, elementar zarralar, radiatsion materialshunoslik. Neft qazish va tilshunoslik — boshqa sohalar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'yadro tuzilishi', correct: true },
            { label: 'yadro reaksiyalari', correct: true },
            { label: 'elementar zarralar fizikasi', correct: true },
            { label: 'radiatsion materialshunoslik', correct: true },
            { label: 'neft qazish' },
            { label: 'tilshunoslik' }
          ]
        }
      }
    },
    {
      id: 'f47q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: '1995-yil.',
      explanation: 'Yadro fizikasi instituti 1995-yilda 60 dan ortiq nomdagi izotop mahsulotlari ishlab chiqargan.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Yadro fizikasi instituti tibbiyot uchun radioaktiv ' },
            { blank: 'izotoplar' },
            { text: ' ishlab chiqaradi; 1995-yilda ' },
            { blank: '60' },
            { text: ' dan ortiq nomdagi mahsulot chiqarilgan.' }
          ],
          bank: ['izotoplar', '60', 'vitaminlar', '6']
        }
      }
    },
    {
      id: 'f47q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Muntazam tadqiqotlar 1949-yilda.',
      explanation: 'Muntazam tadqiqotlar 1949-yilda boshlangan; nurlanish gʻoʻza seleksiyasida ishlatiladi; tibbiy izotoplarning yarim yemirilish davri qisqa.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Gʻoʻza seleksiyasida radioaktiv nurlanishdan foydalaniladi.', value: true },
            { text: 'Muntazam yadro tadqiqotlari 1949-yilda boshlangan.', value: true },
            { text: 'Yadro fizikasi faqat elektr stansiyalarida qoʻllanadi.', value: false },
            { text: 'Oʻzbekistonda radioaktiv izotoplar ishlab chiqarilmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
