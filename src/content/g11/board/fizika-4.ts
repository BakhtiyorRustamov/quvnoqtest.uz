import type { BoardLesson } from './types';
import { BOB1 } from './fizika-1';
import { battery, fieldMarks, seg, vec } from './phys';

/** Darslik: Fizika 11, 4-mavzu (13–14-betlar) — tokli oʻtkazgichni magnit maydonda koʻchirishda bajarilgan ish. */
export const FIZ_4: BoardLesson = {
  n: 4,
  label: '4',
  group: BOB1,
  title: 'Tokli oʻtkazgichni magnit maydonda koʻchirish ishi',
  section: '4-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mehmonxona eshigiga kartani tutsangiz, ichkarida chiqillagan ovoz eshitiladi — elektron qulf ochildi. Uning ichida tokli oʻtkazgich magnit maydonda siljib, tilchani tortadi. Siljish bor ekan, demak ish bajarilmoqda. Bu ish qanchaga teng va u qayerdan olinadi? Bugun shuni hisoblaymiz.",
      easy: "Elektron qulfda tokli oʻtkazgich magnit maydonda siljiydi — ish bajariladi.",
      draw: [
        { t: 'title', text: 'Elektron qulf qanday ochiladi?' },
        { t: 'icon', x: 16, y: 34, emoji: '🔒', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '💳', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['tok yoqiladi', 'oʻtkazgich maydonda siljiydi', 'siljish bor — ish bor'] }
      ],
      next: 'Relslar tajribasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikki parallel silliq metall rels ustiga yengil c oʻtkazgichni qoʻyamiz. Hammasi induksiyasi B boʻlgan bir jinsli maydonda, maydon bizdan doska tomon yoʻnalgan — buni xochchalar bilan belgilaymiz. Relslar manbaga ulansa, c dan tok oʻtadi va unga Amper kuchi F teng I B l taʼsir qiladi. Kuch oʻtkazgichni d masofaga suradi.",
      easy: "Relslardagi tokli oʻtkazgichni Amper kuchi d masofaga suradi.",
      draw: [
        { t: 'title', text: 'Relslar ustidagi oʻtkazgich' },
        ...battery('e', 11, 41),
        ...seg('w1', 11, 26, 11, 37),
        ...seg('w2', 13, 43, 13, 56),
        ...seg('rb', 11, 26, 84, 26),
        ...seg('ra', 13, 56, 84, 56),
        ...fieldMarks(22, 33, 2, 3, 8),
        ...fieldMarks(70, 33, 2, 3, 8),
        { t: 'text', x: 87, y: 22, text: 'B', color: 'blue' },
        ...seg('c', 40, 24, 40, 58, 'red'),
        { t: 'text', x: 42, y: 32, text: 'l', color: 'red' },
        ...vec('F', 40, 41, 53, 41, 'red', 'F'),
        ...seg('c2', 60, 24, 60, 58, 'red', true),
        ...seg('d', 40, 62, 60, 62, 'purple', true),
        { t: 'text', x: 49, y: 66.5, text: 'd', color: 'purple', size: 's' }
      ],
      next: 'Ish formulasi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ish kuch bilan yoʻlning koʻpaytmasi: A teng F karra d, yaʼni I B l d. Lekin l karra d — oʻtkazgich harakatda chizib oʻtgan yuza, delta S. B karra delta S esa oʻtkazgich kesib oʻtgan magnit oqimi, delta F. Natijada A teng I karra delta F. Muhimi: bu ishni magnit maydon emas, tok manbayining energiyasi bajaradi.",
      easy: "A = I·B·l·d = I·ΔФ. Ish manba energiyasi hisobiga bajariladi.",
      draw: [
        { t: 'title', text: 'Ish va magnit oqimi' },
        { t: 'formula', x: 6, y: 22, text: 'A = F · d = I · B · l · d' },
        { t: 'list', x: 6, y: 36, items: ['l · d = ΔS — chizilgan yuza', 'B · ΔS = ΔФ — kesilgan oqim'] },
        { t: 'formula', x: 6, y: 56, text: 'A = I · ΔФ' },
        { t: 'text', x: 44, y: 58, text: 'energiya — manbadan', color: 'green' }
      ],
      next: 'Burchak taʼsiri'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar oʻtkazgich induksiya chiziqlariga alfa burchak ostida joylashgan boʻlsa, Amper kuchi sinus alfa marta kichrayadi, demak ish ham: A teng I B l d sinus alfa. Tok yoʻnalishi B bilan bir xil boʻlsa, alfa nolga teng, kuch ham, ish ham nol boʻladi. Eng katta ish alfa 90 gradus boʻlganda.",
      easy: "A = I·B·l·d·sin α. α = 0° → A = 0; α = 90° → eng katta.",
      draw: [
        { t: 'title', text: 'Burchak hisobga olinsa' },
        { t: 'formula', x: 6, y: 22, text: 'A = I · B · l · d · sin α' },
        { t: 'list', x: 6, y: 38, items: ['α = 90° → A eng katta', 'α = 30° → A ikki marta kam', 'α = 0° → A = 0'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Uzunligi 30 santimetr oʻtkazgichdan 2 amper tok oʻtmoqda, u 1,5 teslali maydon chiziqlariga 30 gradus burchak ostida turibdi. Amper kuchi yoʻnalishida 4 santimetr surilsa: A teng 2 karra 1,5 karra 0,3 karra 0,04 karra bir ikkinchi, yaʼni 18 millijoul.",
      easy: "A = 2 · 1,5 · 0,3 · 0,04 · 0,5 = 0,018 J = 18 mJ.",
      draw: [
        { t: 'title', text: 'Ishni hisoblaymiz' },
        { t: 'list', x: 6, y: 20, items: ['l = 0,3 m, I = 2 A', 'B = 1,5 T, α = 30°', 'd = 4 cm = 0,04 m'] },
        { t: 'formula', x: 6, y: 50, text: 'A = 2 · 1,5 · 0,3 · 0,04 · ½ = 18 mJ' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Tokli oʻtkazgichni magnit maydonda koʻchirishda ish: A = I·B·l·d·sin α.',
    'l·d — chizilgan yuza, B·ΔS — kesilgan oqim, shuning uchun A = I·ΔФ.',
    'Bu ish magnit maydon emas, tok manbayi energiyasi hisobiga bajariladi.'
  ],
  questions: [
    {
      id: 'f4q1',
      prompt: '200 mT maydonda uzunligi 50 cm oʻtkazgichdan 4 A tok oʻtdi va u 3 cm ga surildi. Bajarilgan ish necha mJ?',
      hint: 'A = I · B · l · d.',
      explanation: '4 · 0,2 · 0,5 · 0,03 = 0,012 J = 12 mJ.',
      widget: { type: 'number_answer', props: { answer: 12, tolerance: 0.1, unit: 'mJ' } }
    },
    {
      id: 'f4q2',
      prompt: 'Uzunligi 25 cm oʻtkazgichdan 4 A tok oʻtmoqda, u 1,2 T maydon chiziqlariga 45° burchak ostida. Kuch yoʻnalishida 3 cm surilsa, ish necha mJ? (0,1 gacha)',
      hint: 'sin 45° ≈ 0,707.',
      explanation: '4 · 1,2 · 0,25 · 0,03 · 0,707 ≈ 0,0254 J = 25,4 mJ.',
      widget: { type: 'number_answer', props: { answer: 25.4, tolerance: 0.15, unit: 'mJ' } }
    },
    {
      id: 'f4q3',
      prompt: 'Uzunligi 40 cm oʻtkazgichdan 2,5 A tok oʻtmoqda. U chiziqlarga tik yoʻnalishda 8 cm surilganda 32 mJ ish bajarildi. Induksiya necha T?',
      hint: 'B = A / (I · l · d).',
      explanation: '0,032 / (2,5 · 0,4 · 0,08) = 0,4 T.',
      widget: { type: 'number_answer', props: { answer: 0.4, tolerance: 0.01, unit: 'T' } }
    },
    {
      id: 'f4q4',
      prompt: 'Oʻtkazgichdan 5 A tok oʻtmoqda, harakat davomida u kesib oʻtgan magnit oqimi 4 mWb. Ish necha mJ?',
      hint: 'A = I · ΔФ.',
      explanation: '5 · 0,004 = 0,02 J = 20 mJ.',
      widget: { type: 'number_answer', props: { answer: 20, unit: 'mJ' } }
    },
    {
      id: 'f4q5',
      prompt: 'Tokli oʻtkazgichni magnit maydonda koʻchirish ishi nimaning hisobiga bajariladi?',
      hint: 'Tokni kim taʼminlab turadi?',
      explanation: 'Ishni zanjirni tok bilan taʼminlayotgan manba energiyasi bajaradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Magnit maydon energiyasi', 'Tok manbayi energiyasi', 'Oʻtkazgichning ichki energiyasi', 'Yerning tortish kuchi'], answerIndex: 1 } }
    },
    {
      id: 'f4q6',
      prompt: 'Tok yoʻnalishi induksiya vektori bilan bir xil. Oʻtkazgichni surishda bajarilgan ish qanday?',
      hint: 'sin 0° = 0.',
      explanation: 'α = 0° da Amper kuchi nol, demak ish ham nol.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Eng katta', 'Nolga teng', 'Manfiy', 'I · B · l ga teng'], answerIndex: 1 } }
    },
    {
      id: 'f4q7',
      prompt: 'A = I · ΔФ formulasi qanday chiqarilishini tartiblang.',
      hint: 'Avval kuch, keyin ish.',
      explanation: 'F = IBl → A = F·d → A = IB(l·d) → l·d = ΔS, BΔS = ΔФ → A = IΔФ.',
      widget: {
        type: 'step_order',
        props: { steps: ['Amper kuchi: F = I · B · l', 'Ish: A = F · d', 'A = I · B · (l · d)', 'l · d = ΔS, B · ΔS = ΔФ', 'A = I · ΔФ'] }
      }
    },
    {
      id: 'f4q8',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Ish = tok × oqim oʻzgarishi.',
      explanation: 'Ish tok kuchi bilan magnit oqimi oʻzgarishining koʻpaytmasiga teng; l·d — chizilgan yuza.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [
            { text: 'Koʻchirish ishi tok kuchi bilan magnit ' },
            { blank: 'oqimi' },
            { text: ' oʻzgarishining koʻpaytmasiga teng. l · d koʻpaytma oʻtkazgich chizgan ' },
            { blank: 'yuza' },
            { text: 'ni beradi.' }
          ],
          bank: ['oqimi', 'yuza', 'induksiyasi', 'uzunlik']
        }
      }
    }
  ]
};
