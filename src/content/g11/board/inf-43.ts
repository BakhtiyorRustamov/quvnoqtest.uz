import type { BoardLesson } from './types';

/** Darslik: 16-bob — vektorli va rastrli tasvirlar, qatlamlar, tahrirlash uskunalari, rezolyutsiya va fayl hajmi. */
export const INF_43: BoardLesson = {
  n: 43,
  label: '43',
  part: 11,
  title: 'Grafika: rastr va vektor',
  section: '16.01–16.04',
  steps: [
    {
      kind: 'hook',
      say: "Telefoningizdagi fotosuratni juda kattalashtirsangiz, u mayda kvadratchalarga boʻlinib, xiralashadi. Lekin logotip yoki shriftni qancha kattalashtirsangiz ham silliq qoladi. Sababi: fotosurat — rastrli tasvir, piksellardan iborat; har piksel bitta rangda. Logotip esa vektorli tasvir: unda piksellar emas, shakllar, koordinatalar va ranglar formulasi saqlanadi; kattalashtirilganda kompyuter uni qaytadan hisoblab chizadi.",
      easy: "Rastr — piksellar, kattalashsa xiralashadi. Vektor — formulalar, kattalashsa ham silliq.",
      draw: [],
      animTitle: 'Rastr va vektor',
      anim: { type: 'picture', mode: 'raster-vector' },
      next: 'Rezolyutsiya nima?'
    },
    {
      kind: 'explain',
      say: "Rastrli tasvir sifati rezolyutsiyaga bogʻliq — maʼlum oʻlchamdagi piksellar soni. DPI — bir dyuymdagi nuqtalar soni: qancha koʻp boʻlsa, tasvir shuncha tiniq. Lekin piksel koʻpaysa, fayl ham kattalashadi. Siqilmagan fayl hajmi: kenglik koʻpaytirilgan balandlik koʻpaytirilgan bitta piksel uchun bitlar soni, sakkizga boʻlinsa — bayt. 256 rangli tasvirda piksel 8 bit, millionlab rangli tasvirda 24 bit.",
      easy: "Hajm = kenglik × balandlik × bit ÷ 8 bayt. Rang koʻp boʻlsa, fayl katta.",
      draw: [],
      animTitle: 'Rastrli tasvir hajmi',
      anim: {
        type: 'sheet',
        cols: ['Kenglik', 'Balandlik', 'Bit/piksel', 'Hajm, KB'],
        rows: [
          [640, 480, 8, ''],
          [640, 480, 24, ''],
          [1920, 1080, 24, '']
        ],
        steps: [
          { cell: 'D2', formula: '=A2*B2*C2/8/1024', refs: ['A2', 'B2', 'C2'], result: 300 },
          { cell: 'D3', formula: '=A3*B3*C3/8/1024', refs: ['A3', 'B3', 'C3'], result: 900 },
          { cell: 'D4', formula: '=A4*B4*C4/8/1024', refs: ['A4', 'B4', 'C4'], result: 6075 }
        ]
      },
      next: 'Qatlam nima?'
    },
    {
      kind: 'explain',
      say: "Grafik dasturlarda tasvir qatlamlardan yigʻiladi: fon, daraxt, matn — har biri alohida qatlamda, bir-birining ustida. Shunda bitta elementni boshqalariga tegmasdan tahrirlash mumkin. Lekin baʼzi fayl formatlari qatlamlarni saqlamaydi: tasvir tekislanadi va qatlamlarni qayta ajratib boʻlmaydi.",
      easy: "Qatlamlar — ustma-ust shaffof varaqlar. Bittasini oʻzgartirsangiz, boshqalari buzilmaydi.",
      draw: [],
      animTitle: 'Qatlamlar',
      anim: { type: 'picture', mode: 'layers' },
      next: 'Vektor uskunalari?'
    },
    {
      kind: 'explain',
      say: "Vektor uskunalari. Group yoki Merge bir nechta shaklni bitta obyektga birlashtiradi — birga koʻchadi, Ungroup ajratadi. Rotate — burish. Transform — oʻlcham, burchak, tomonlar nisbati va qiyalik. Node tahrirlash shaklning burchak nuqtalarini surib, uni oʻzgartiradi. Fill rang bilan, Gradient ikki rang oʻtishi bilan, Pattern naqsh bilan boʻyaydi. Matnni egri chiziq boʻylab ham yozish mumkin.",
      easy: "Group — birlashtirish. Rotate — burish. Node — nuqtalarni surish. Fill, Gradient — boʻyash.",
      draw: [],
      animTitle: 'Vektor uskunalari',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '🔗', title: 'Group / Merge', text: 'Shakllar bitta obyekt boʻlib koʻchadi' },
          { icon: '🔄', title: 'Rotate, Transform', text: 'Burish, oʻlcham, nisbat, qiyalik' },
          { icon: '📍', title: 'Node tahrirlash', text: 'Burchak nuqtalarini surib shakl berish' },
          { icon: '🎨', title: 'Fill, Gradient, Pattern', text: 'Rang, ikki rang oʻtishi, naqsh' }
        ]
      },
      next: 'Rastr uskunalari?'
    },
    {
      kind: 'explain',
      say: "Rastr uskunalari piksellar bilan ishlaydi. Tanlash: Marquee — toʻrtburchak yoki oval, Lasso — qoʻlda, Magic wand — bir xil rangni. Crop — keraklisini qoldirib, qolganini qirqadi. Mask — keraksiz qismni shaffof qiladi, ikki tasvirni birlashtiradi. Clone va Healing brush — bir joydagi piksellarni boshqa joyga koʻchirib, dogʻni yopadi. Red eye — qizil koʻzni tuzatadi. Blur xiralashtiradi, Sharpen kontrastni oshirib aniqlashtiradi.",
      easy: "Tanlash, Crop — qirqish, Mask — yashirish, Clone — nusxalash, Red eye, Blur va Sharpen.",
      draw: [],
      animTitle: 'Rastr uskunalari',
      anim: {
        type: 'cards',
        cols: 2,
        items: [
          { icon: '⬚', title: 'Marquee, Lasso, Magic wand', text: 'Tasvir qismini tanlash' },
          { icon: '✂️', title: 'Crop', text: 'Keraklisini qoldirib qirqish' },
          { icon: '🎭', title: 'Mask', text: 'Keraksiz qismni shaffof qilish' },
          { icon: '🩹', title: 'Clone, Healing brush', text: 'Piksellarni koʻchirib dogʻni yopish' },
          { icon: '👁️', title: 'Red eye', text: 'Qizil koʻzni tuzatish' },
          { icon: '🔍', title: 'Blur, Sharpen', text: 'Xiralashtirish va aniqlashtirish' }
        ]
      },
      next: 'Tahrirlash xavflimi?'
    },
    {
      kind: 'explain',
      say: "Tasvirni tahrirlashning jamiyatga taʼsiri bor. Ijobiy tomoni: afisha, muqova va reklama chiroyli chiqadi, eski suratlar tiklanadi, sanʼat asarlari yaratiladi. Salbiy tomoni: retushlangan «mukammal» yuzlar odamlarda imkonsiz goʻzallik istagini uygʻotadi; soxta suratlar va memlar yolgʻon xabar tarqatadi, odamlarni masxara qiladi; birovning suratini ruxsatsiz ishlatish ham uchraydi. Shuning uchun koʻrgan suratingizga darhol ishonmang.",
      easy: "Tahrirlash reklama va sanʼatga foydali, lekin soxta suratlar aldashi va odamlarni xafa qilishi mumkin.",
      draw: [],
      animTitle: 'Tahrirlashning ikki tomoni',
      anim: {
        type: 'compare',
        left: { icon: '👍', title: 'Ijobiy', items: ['Chiroyli afisha va muqova', 'Eski suratni tiklash', 'Sanʼat va dizayn', 'Savdo oshadi'] },
        right: { icon: '⚠️', title: 'Salbiy', items: ['Imkonsiz goʻzallik namunasi', 'Soxta surat — yolgʻon xabar', 'Masxara qiluvchi memlar', 'Ruxsatsiz foydalanish'] }
      },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Rastrli tasvir piksellardan iborat; kattalashtirilsa piksellanib xiralashadi (fotosurat, skanerlangan hujjat).',
    'Vektorli tasvir shakl va koordinatalar formulasi bilan saqlanadi; kattalashtirilsa ham silliq (logotip, shrift).',
    'Siqilmagan rastr hajmi = kenglik × balandlik × bit/piksel ÷ 8 bayt; DPI — bir dyuymdagi nuqtalar.',
    'Vektor uskunalari: Group, Rotate, Transform, Node, Fill/Gradient. Rastr uskunalari: tanlash, Crop, Mask, Clone, Red eye, Blur/Sharpen.',
    'Tahrirlash reklama va sanʼatga foydali, lekin soxta suratlar va retush odamlarni chalgʻitishi mumkin.'
  ],
  questions: [
    {
      id: 'i43q1',
      prompt: 'Rastr yoki vektor?',
      hint: 'Piksellarmi yoki formulami?',
      explanation: 'Fotosurat va skanerlangan hujjat — rastr. Logotip, shrift va CAD chizmasi — vektor.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'r', label: 'Rastr' },
            { id: 'v', label: 'Vektor' }
          ],
          tiles: [
            { id: 't1', label: 'Telefondagi fotosurat', bin: 'r' },
            { id: 't2', label: 'Kompaniya logotipi', bin: 'v' },
            { id: 't3', label: 'Skanerlangan hujjat', bin: 'r' },
            { id: 't4', label: 'Shrift (harflar)', bin: 'v' },
            { id: 't5', label: 'CAD chizmasi', bin: 'v' }
          ]
        }
      }
    },
    {
      id: 'i43q2',
      prompt: '100 × 50 piksel, har piksel 8 bit. Siqilmagan hajm necha bayt?',
      hint: '100 × 50 × 8 ÷ 8',
      explanation: '100 × 50 = 5000 piksel; 8 bit = 1 bayt; 5000 bayt.',
      widget: { type: 'number_answer', props: { answer: 5000, unit: 'bayt' } }
    },
    {
      id: 'i43q3',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Vektor qayta hisoblanadi.',
      explanation: 'Vektor kattalashsa silliq; rastr piksellanadi; DPI koʻp — tiniqroq; baʼzi formatlar qatlamlarni tekislaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Vektorli tasvir kattalashtirilganda piksellanib xiralashadi.', value: false },
            { text: 'Rastrli tasvir har biri bitta rangdagi piksellardan iborat.', value: true },
            { text: 'DPI qancha katta boʻlsa, tasvir shuncha tiniq.', value: true },
            { text: 'Har qanday fayl formati qatlamlarni saqlaydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'i43q4',
      prompt: 'Uskunani vazifasi bilan juftlang.',
      hint: 'Inglizcha nomiga qarang.',
      explanation: 'Crop — qirqish; Clone — piksellarni nusxalash; Red eye — qizil koʻzni tuzatish; Group — shakllarni birlashtirish.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Crop' }, right: { label: 'keraklisini qoldirib qirqish' } },
            { left: { label: 'Clone' }, right: { label: 'piksellarni boshqa joyga nusxalash' } },
            { left: { label: 'Red eye' }, right: { label: 'qizil koʻzni tuzatish' } },
            { left: { label: 'Group' }, right: { label: 'shakllarni bitta obyekt qilish' } }
          ]
        }
      }
    },
    {
      id: 'i43q5',
      prompt: 'Qaysi biri tanlash (selection) uskunasi emas?',
      hint: 'Uchtasi tasvir qismini belgilaydi.',
      explanation: 'Marquee, Lasso va Magic wand — tanlash uskunalari. Blur — xiralashtirish filtri.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Marquee' }, { text: 'Lasso' }, { text: 'Magic wand' }, { text: 'Blur', odd: true }] } }
    },
    {
      id: 'i43q6',
      prompt: '200 × 100 piksel, 24 bit rang. Siqilmagan hajm necha bayt?',
      hint: '24 bit = 3 bayt.',
      explanation: '200 × 100 = 20 000 piksel × 3 bayt = 60 000 bayt.',
      widget: { type: 'number_answer', props: { answer: 60000, unit: 'bayt' } }
    },
    {
      id: 'i43q7',
      prompt: 'Tasvir tahrirlashning salbiy oqibatlarini bosing.',
      hint: 'Kimnidir aldash yoki xafa qilish.',
      explanation: 'Soxta xabar, imkonsiz goʻzallik namunasi, masxara memlar va ruxsatsiz foydalanish — salbiy. Eski suratni tiklash — ijobiy.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Soxta surat bilan yolgʻon xabar', match: true },
            { id: 'b', text: 'Imkonsiz «mukammal» yuz namunasi', match: true },
            { id: 'c', text: 'Odamni masxara qiluvchi mem', match: true },
            { id: 'd', text: 'Birovning suratini ruxsatsiz ishlatish', match: true },
            { id: 'e', text: 'Buvining eski suratini tiklash', match: false }
          ]
        }
      }
    },
    {
      id: 'i43q8',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Kichik kvadrat va bir dyuymdagi nuqtalar.',
      explanation: 'Rastrning eng kichik kvadrati — piksel; bir dyuymdagi nuqtalar soni — DPI.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Rastrli tasvir bitta rangli kichik kvadratlar —' }, { blank: 'piksellar' }, { text: 'dan iborat. Bir dyuymdagi nuqtalar soni —' }, { blank: 'DPI' }, { text: '.' }],
          bank: ['piksellar', 'DPI', 'node']
        }
      }
    },
    {
      id: 'i43q9',
      prompt: 'Logotip veb-sayt, tashrifnoma va katta bannerda ishlatiladi. Qaysi format va nega?',
      hint: 'Har xil oʻlchamda silliq qolishi kerak.',
      explanation: 'Vektor — har qanday oʻlchamga kattalashtirilganda ham silliq qoladi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Vektor — har oʻlchamda silliq', match: true },
            { id: 'b', text: 'Rastr — kattalashsa ham tiniq', match: false },
            { id: 'c', text: 'Rastr — formulalar saqlanadi', match: false }
          ]
        }
      }
    },
    {
      id: 'i43q10',
      prompt: 'Element yoki rasm qismlarini ustma-ust joylab, har birini alohida tahrirlash imkonini beradigan narsa nomini yozing.',
      hint: 'Shaffof varaqlar.',
      explanation: 'Qatlam (layer).',
      widget: { type: 'text_answer', props: { answer: ['qatlam', 'qatlamlar', 'layer', 'layers'], width: 9 } }
    }
  ]
};
