import type { BoardLesson } from './types';
import { OZG5 } from './ozbek-37';

/** Darslik: Ona tili 11, 2-qism (2020), 21-mavzu (81–90-betlar) — ish qogʻozlari bilan ishlash: hujjat qolipi, soʻrovnoma, tavsiyanoma, shaxsiy va rasmiy xat (bayonnoma 24-darsda batafsil). */
export const OZ_41: BoardLesson = {
  n: 41,
  label: '41',
  group: OZG5,
  title: 'Ish qogʻozlari bilan ishlash',
  section: 'Ona tili, 2-qism: 21-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Har bir ish hujjatining oʻz qolipi bor va unga qatʼiy rioya qilinadi, chunki namunalar muayyan mantiqqa asoslanadi. Masalan, tavsiyanomada tavsiya beruvchi oʻzini tanishtiradi — «Men, falonchi, … yilda tugʻilganman, … ishlayman», keyin nomzodni qancha vaqtdan beri bilishini, uning fazilatlarini yozadi va sana hamda imzo qoʻyadi. Soʻrovnomada tashkilot boshqa tashkilotdan aniq maʼlumot soʻraydi. Shaxsiy xat samimiy, erkin uslubda, rasmiy xat esa qatʼiy shaklda yoziladi.",
      easy: "Har hujjatning tayyor qolipi bor. Tavsiyanoma: men kimman → nomzod kim → fazilatlari → sana, imzo.",
      draw: [
        { t: 'title', text: 'Tavsiyanoma qolipi' },
        { t: 'list', x: 4, y: 18, items: ['1. Men, … (tavsiya beruvchi haqida)', '2. Nomzodni qachondan beri bilishi', '3. Nomzodning bilimi va fazilatlari', '4. Qaysi vazifaga tavsiya etilishi', '5. Sana va imzo'] }
      ],
      next: 'Boshladik!'
    }
  ],
  summary: [
    'Har bir ish hujjatining oʻz qolipi bor; namunalar tartibidan chiqmaslik kerak.',
    'Tavsiyanomada tavsiya beruvchi oʻzini tanishtiradi, nomzodni tavsiflaydi, sana va imzo qoʻyadi; soʻrovnomada aniq maʼlumot soʻraladi.',
    'Shaxsiy xat samimiy va erkin, rasmiy xat qatʼiy shaklda yoziladi.'
  ],
  questions: [
    {
      id: 'oz41q1',
      prompt: 'Tavsiyanoma qismlarini tartib bilan joylang.',
      hint: 'Avval oʻzini tanishtiradi.',
      explanation: 'Tavsiya beruvchi haqida → nomzodni qachondan bilishi → fazilatlari → sana va imzo.',
      widget: {
        type: 'order_line',
        props: { items: [{ label: 'Men, … tugʻilganman, … ishlayman' }, { label: 'Nomzodni … yildan beri bilaman' }, { label: 'Nomzodning fazilatlari' }, { label: 'Sana va imzo' }] }
      }
    },
    {
      id: 'oz41q2',
      prompt: 'Nega ish hujjatlarida qolipga qatʼiy rioya qilinadi?',
      hint: 'Mantiq.',
      explanation: 'Namunalar muayyan mantiqqa asoslangan — qolipdan chiqish hujjatni chalkash qiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['namunalar muayyan mantiqqa asoslangan', 'chiroyli koʻrinishi uchun', 'qisqaroq boʻlishi uchun', 'odat boʻlgani uchun, hech sababsiz'], answerIndex: 0 } }
    },
    {
      id: 'oz41q3',
      prompt: 'Hujjatni vazifasi bilan juftlang.',
      hint: 'Soʻrovnoma — maʼlumot soʻrash.',
      explanation: 'Soʻrovnoma — maʼlumot soʻrash; tavsiyanoma — nomzodni tavsiya qilish; bayonnoma — majlisni qayd etish.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'soʻrovnoma', right: 'aniq maʼlumot soʻrash' },
            { left: 'tavsiyanoma', right: 'nomzodni tavsiya qilish' },
            { left: 'bayonnoma', right: 'majlis borishini qayd etish' }
          ]
        }
      }
    },
    {
      id: 'oz41q4',
      prompt: 'Xat belgisini turiga ajrating.',
      hint: 'Samimiy — shaxsiy.',
      explanation: 'Shaxsiy xat — samimiy murojaat, erkin uslub; rasmiy xat — qatʼiy shakl, lavozim va imzo.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 's', label: 'shaxsiy xat' }, { id: 'r', label: 'rasmiy xat' }],
          items: [
            { emoji: '💌', label: '«Sevimli farzandimiz…» deb boshlanadi', bin: 's' },
            { emoji: '🏡', label: 'oilaviy yangiliklar, erkin uslub', bin: 's' },
            { emoji: '🏛️', label: 'tashkilot rahbariga murojaat', bin: 'r' },
            { emoji: '🖋️', label: 'lavozim, sana va imzo qatʼiy tartibda', bin: 'r' }
          ]
        }
      }
    },
    {
      id: 'oz41q5',
      prompt: 'Bayonnomaning zaruriy qismlarini tanlang.',
      hint: '24-darsni eslang.',
      explanation: 'Muassasa nomi, sana, rais va kotib, kun tartibi, imzolar; «tilaklar» qismi yoʻq.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'muassasa nomi', correct: true },
            { label: 'yigʻilish sanasi', correct: true },
            { label: 'kun tartibi', correct: true },
            { label: 'imzolar', correct: true },
            { label: 'shaxsiy tilaklar' }
          ]
        }
      }
    },
    {
      id: 'oz41q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Koʻchirma — kerakli qism.',
      explanation: 'Bayonnomadan koʻchirmaga faqat kerakli masala olinadi va u imzo bilan tasdiqlanadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bayonnomadan koʻchirmaga faqat kerakli masala boʻyicha qism olinadi.', value: true },
            { text: 'Rasmiy xatni ham shaxsiy xat kabi erkin uslubda yozish mumkin.', value: false },
            { text: 'Tavsiyanomada sana va imzo boʻladi.', value: true }
          ]
        }
      }
    }
  ]
};
