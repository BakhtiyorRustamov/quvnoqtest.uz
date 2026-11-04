import type { BoardLesson } from './types';
import { BOB4 } from './biologiya-35';

/** Darslik: Biologiya 11, 41-§ (214–217-betlar) — nafas olish organlari evolutsiyasi: diffuziya, jabra, traxeya, oʻpka; umurtqalilarda oʻpka takomillashuvi. */
export const BIO_41: BoardLesson = {
  n: 41,
  label: '41',
  group: BOB4,
  title: 'Nafas olish organlari evolutsiyasi',
  section: '41-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Qush uchayotganda qoni nafas olganda ham, nafas chiqarganda ham kislorodga toʻyinadi — havo xaltachalaridagi havo nafas chiqarishda yana oʻpkadan oʻtadi. Shuning uchun qushlar togʻ choʻqqilari ustidan ham ucha oladi. Nafas organlari qanday qilib bunchalik takomillashgan?",
      easy: "Qushda qon ikki marta kislorodga toʻyinadi — havo xaltachalari.",
      draw: [
        { t: 'title', text: 'Qushning sirli nafasi' },
        { t: 'icon', x: 16, y: 40, emoji: '🦅', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['havo xaltachalari', 'nafas olishda — O₂', 'chiqarishda ham — O₂'] }
      ],
      next: 'Anaerobdan aerobga'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Dastlabki organizmlar anaerob boʻlib, glikoliz va bijgʻishdan kam energiya olgan. Kislorod koʻpaygach aerob nafas paydo boʻldi: moddalar oxirigacha parchalanib, koʻp energiya ajraladi — evolutsiya tezlashdi. Bir hujayrali va tuban koʻp hujayralilar butun tana yuzasi orqali diffuziya bilan nafas oladi. Kislorodni tashuvchi oqsil xordalilarda — eritrotsitdagi gemoglobin.",
      easy: "Anaerob → aerob; tuban hayvonlar — diffuziya; xordalilar — gemoglobin.",
      draw: [
        { t: 'title', text: 'Nafas turlari' },
        { t: 'table', x: 4, y: 20, rows: [['nafas', 'energiya'], ['anaerob (bijgʻish)', 'kam'], ['aerob (kislorodli)', 'koʻp']] },
        { t: 'text', x: 4, y: 48, text: 'tuban hayvonlar — tana yuzasi orqali diffuziya', size: 's', color: 'blue' }
      ],
      next: 'Umurtqasizlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Dastlabki nafas organi koʻp tukli halqali chuvalchanglarda — bosh qismidagi oʻsimtalar; kam tuklilar va zuluklar tana yuzasi orqali nafas oladi. Dengiz mollyuskalarida jabra, quruqlikdagi qorinoyoqlilarda oʻpka. Boʻgʻimoyoqlilarda: qisqichbaqasimonlarda jabra, hasharotlarda traxeya, oʻrgimchaklarda oʻpka va traxeya. Mayda qisqichbaqasimonlar yupqa xitin orqali nafas oladi.",
      easy: "Suvda — jabra, quruqlikda — traxeya va oʻpka.",
      draw: [
        { t: 'title', text: 'Umurtqasizlar nafasi' },
        { t: 'table', x: 4, y: 18, rows: [['hayvon', 'nafas organi'], ['zuluk', 'tana yuzasi'], ['dengiz mollyuskasi', 'jabra'], ['qisqichbaqa', 'jabra'], ['hasharot', 'traxeya'], ['oʻrgimchak', 'oʻpka, traxeya']] }
      ],
      next: 'Baliq va amfibiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Lansetnikda halqum devorida jabra yoriqlari. Baliqlarda yoriqlar kamaygan, lekin kapillarli jabra yaproqlari nafas sathini kengaytiradi. Panjaqanotli baliqlarda halqum bilan bogʻlangan suzgich pufagi oʻpkaga aylanishga zamin boʻlgan. Oʻpka birinchi marta amfibiyalarda paydo boʻlgan: xaltasimon, toʻsiqsiz, bronxsiz; koʻkrak qafasi yoʻq — havoni yutadi, gaz almashinuv koʻproq teri orqali; hiqildoq togʻaylari ilk bor shakllangan.",
      easy: "Jabra yoriqlari → jabra yaproqlari → suzgich pufagi → amfibiya oʻpkasi (+ teri).",
      draw: [
        { t: 'title', text: 'Suvdan havoga' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 28, h: 8, text: 'jabra yoriqlari', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 20, w: 28, h: 8, text: 'jabra yaproqlari', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 20, w: 28, h: 8, text: 'suzgich pufagi', color: 'orange' },
        { t: 'box', id: 'd', x: 68, y: 42, w: 28, h: 8, text: 'xaltasimon oʻpka', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' }
      ],
      next: 'Amniotalar oʻpkasi'
    },
    {
      kind: 'example',
      clear: true,
      say: "Sudralib yuruvchilarda hiqildoq, traxeya va bronxlar toʻliq shakllangan, oʻpka gʻovak, katakchali, lekin bronxlar shoxlanmaydi; nafas qovurgʻalararo va qorin muskullari bilan, teri qatnashmaydi. Qushlarda bronxlar bronxiolalargacha tarmoqlanadi, havo xaltachalari tanani yengillashtiradi va qonni ikki marta kislorodga toʻyintiradi. Sutemizuvchilarda bronxlar alveolalar bilan tugaydi — gaz almashinuv sathi eng katta; diafragma nafas harakatini taʼminlaydi.",
      easy: "Reptiliya — gʻovak oʻpka; qush — havo xaltachalari; sutemizuvchi — alveolalar, diafragma.",
      draw: [
        { t: 'title', text: 'Oʻpka takomillashuvi' },
        { t: 'table', x: 4, y: 18, rows: [['sinf', 'oʻpka', 'yangilik'], ['amfibiya', 'xaltasimon', 'hiqildoq'], ['reptiliya', 'gʻovak', 'traxeya, bronx'], ['qush', 'bronxiolalar', 'havo xaltachalari'], ['sutemizuvchi', 'alveolalar', 'diafragma']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Anaerob nafasdan aerob nafasga oʻtish koʻp energiya berdi; tuban hayvonlar tana yuzasi orqali diffuziya bilan, xordalilar gemoglobin yordamida kislorod tashiydi.',
    'Umurtqasizlar: suvda jabra (mollyuska, qisqichbaqa), quruqlikda traxeya (hasharot) va oʻpka (oʻrgimchak, quruqlik mollyuskasi).',
    'Umurtqalilar: jabra → suzgich pufagi → amfibiyaning xaltasimon oʻpkasi va terisi → reptiliyaning gʻovak oʻpkasi → qushning havo xaltachalari → sutemizuvchining alveolalari va diafragmasi.'
  ],
  questions: [
    {
      id: 'b41q1',
      prompt: 'Hayvonni nafas organi bilan juftlang.',
      hint: 'Hasharot — naychalar.',
      explanation: 'Hasharot — traxeya; qisqichbaqa — jabra; zuluk — tana yuzasi; sutemizuvchi — alveolali oʻpka.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'hasharot', right: 'traxeya' },
            { left: 'qisqichbaqa', right: 'jabra' },
            { left: 'zuluk', right: 'tana yuzasi' },
            { left: 'sutemizuvchi', right: 'alveolali oʻpka' }
          ]
        }
      }
    },
    {
      id: 'b41q2',
      prompt: 'Oʻpka birinchi marta qaysi sinfda paydo boʻlgan?',
      hint: 'Suvda hamda quruqlikda.',
      explanation: 'Suvda hamda quruqlikda yashovchilarda (amfibiyalarda).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['baliqlarda', 'amfibiyalarda', 'sudralib yuruvchilarda', 'qushlarda'], answerIndex: 1 } }
    },
    {
      id: 'b41q3',
      prompt: 'Sinflarni oʻpka gaz almashinuv sathi kichigidan kattasiga tartiblang.',
      hint: 'Alveolalar — eng katta sath.',
      explanation: 'Amfibiya (xaltasimon) → reptiliya (gʻovak) → qush (bronxiolalar) → sutemizuvchi (alveolalar).',
      widget: { type: 'order_line', props: { items: [{ label: 'amfibiya' }, { label: 'reptiliya' }, { label: 'qush' }, { label: 'sutemizuvchi' }] } }
    },
    {
      id: 'b41q4',
      prompt: 'Nafas olishda teri qatnashadigan sinf qaysi?',
      hint: 'Nam teri.',
      explanation: 'Amfibiyalar — oʻpkasi sodda, gaz almashinuv koʻproq teri orqali.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['sudralib yuruvchilar', 'qushlar', 'amfibiyalar', 'sutemizuvchilar'], answerIndex: 2 } }
    },
    {
      id: 'b41q5',
      prompt: 'Qush havo xaltachalarining vazifalarini tanlang.',
      hint: 'Uchishga moslanish.',
      explanation: 'Tanani yengillashtiradi va qonni nafas chiqarishda ham kislorodga toʻyintiradi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'tana vaznini yengillashtiradi', correct: true },
            { label: 'qonni ikki marta kislorodga toʻyintiradi', correct: true },
            { label: 'ovqatni hazm qiladi' },
            { label: 'tuxumni isitadi' }
          ]
        }
      }
    },
    {
      id: 'b41q6',
      prompt: 'Belgini sinfga ajrating.',
      hint: 'Diafragma — faqat sutemizuvchilarda.',
      explanation: 'Sudralib yuruvchilar: bronxlar shoxlanmaydi, qovurgʻalararo muskullar bilan nafas. Sutemizuvchilar: alveolalar, diafragma.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'r', label: 'Sudralib yuruvchilar' },
            { id: 's', label: 'Sutemizuvchilar' }
          ],
          items: [
            { emoji: '', label: 'bronxlar shoxlanmaydi', bin: 'r' },
            { emoji: '', label: 'gʻovak katakchali oʻpka', bin: 'r' },
            { emoji: '', label: 'alveolalar', bin: 's' },
            { emoji: '', label: 'diafragma', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'b41q7',
      prompt: 'Qaysi organ panjaqanotli baliqlarda oʻpkaga aylanishga zamin boʻlgan?',
      hint: 'Halqum bilan bogʻlangan.',
      explanation: 'Suzgich pufagi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['jabra qopqogʻi', 'suzgich pufagi', 'yon chiziq', 'ichak'], answerIndex: 1 } }
    },
    {
      id: 'b41q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Gemoglobin eritrotsitda.',
      explanation: 'Xordalilarda kislorodni eritrotsitdagi gemoglobin tashiydi; amfibiyalarda hiqildoq togʻaylari ilk bor shakllangan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Xordalilarda kislorodni eritrotsitdagi gemoglobin tashiydi.', value: true },
            { text: 'Hiqildoq togʻaylari ilk bor amfibiyalarda shakllangan.', value: true },
            { text: 'Amfibiyalarda koʻkrak qafasi va diafragma bor.', value: false },
            { text: 'Anaerob nafasda aerob nafasdan koʻp energiya hosil boʻladi.', value: false }
          ]
        }
      }
    }
  ]
};
