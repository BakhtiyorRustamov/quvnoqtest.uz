import type { BoardLesson } from './types';
import { BOB4 } from './kimyo-12';
import { block } from './chem';

/** Darslik: Umumiy kimyo 11, 14-mavzu (70–73-betlar) — eruvchanlik koeffitsiyentiga doir masalalar: S ni topish, toʻyintirish, kristallanish. */
export const KIM_14: BoardLesson = {
  n: 14,
  label: '14',
  group: BOB4,
  title: 'Eruvchanlikka doir masalalar',
  section: '14-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Asal qishda shakarlanib qoladi, issiq suvda tayyorlangan shirin sharbat sovuganda idish tubida kristallar paydo boʻladi. Sababi — sovuganda eruvchanlik kamayadi va ortiqcha modda kristallanadi. Bugun eruvchanlikka doir masalalarni bitta sxema bilan yechishni oʻrganamiz.",
      easy: "Sovuganda eruvchanlik kamayadi — ortiqcha modda kristallanadi.",
      draw: [
        { t: 'title', text: 'Asal nega shakarlanadi?' },
        { t: 'icon', x: 16, y: 34, emoji: '🍯', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '❄️', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['issiqda koʻp eriydi', 'sovuqda kam eriydi', 'ortiqchasi — kristall'] }
      ],
      next: 'Asosiy sxema'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hamma masalalar bitta qatorga tayanadi: 100 gramm suv — S gramm modda — 100 qoʻshuv S gramm toʻyingan eritma. Masalada berilgan istalgan ikki kattalikni shu qator bilan proporsiyaga qoʻyamiz. Masalan, 200 gramm suvda 148 gramm CaCl2 toʻyingan eritma bersa, 100 grammda 74 gramm — S teng 74.",
      easy: "100 g suv — S g modda — (100 + S) g eritma; proporsiya tuzamiz.",
      draw: [
        { t: 'title', text: 'Asosiy proporsiya' },
        ...block('w', 4, 22, 26, '100 g suv', 'blue'),
        ...block('s', 34, 22, 26, 'S g modda', 'red'),
        ...block('e', 64, 22, 32, '(100 + S) g eritma', 'purple'),
        { t: 'formula', x: 4, y: 46, text: '200 g suv — 148 g CaCl₂' },
        { t: 'formula', x: 4, y: 58, text: 'S = 148 · 100 / 200 = 74' }
      ],
      next: 'Toʻyintirish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Eritmani toʻyintirish uchun qancha tuz qoʻshish kerak? KCl uchun 20 gradusda S teng 34. 350 gramm suvda 70 gramm KCl erigan. Toʻyingan eritma uchun 350 grammga 34 karra 3,5 — 119 gramm kerak. Qoʻshish kerak: 119 minus 70 — 49 gramm.",
      easy: "Kerak: S · m(suv)/100; qoʻshish = kerak − bor.",
      draw: [
        { t: 'title', text: 'Qancha qoʻshish kerak?' },
        { t: 'list', x: 4, y: 20, items: ['S(KCl, 20 °C) = 34', '350 g suvda 70 g KCl bor'] },
        { t: 'formula', x: 4, y: 44, text: 'kerak: 34 · 350 / 100 = 119 g' },
        { t: 'formula', x: 4, y: 56, text: 'qoʻshish: 119 − 70 = 49 g' }
      ],
      next: 'Kristallanish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Issiqda tayyorlangan toʻyingan eritma sovitilsa, eruvchanliklar farqicha tuz kristallanadi. Bariy nitrat uchun S 100 gradusda 34,4, 25 gradusda 10,5. 134,4 gramm toʻyingan eritma sovitilsa, 34,4 minus 10,5 — 23,9 gramm tuz choʻkadi. 336 gramm eritmadan esa 336 karra 23,9 boʻlinsin 134,4 — 59,75 gramm.",
      easy: "Choʻkma = S(issiq) − S(sovuq) har (100 + S) g eritmaga.",
      draw: [
        { t: 'title', text: 'Sovitganda kristallanish' },
        ...block('h', 4, 22, 30, '134,4 g, 100 °C', 'red'),
        { t: 'text', x: 38, y: 28, text: '→', anchor: 'middle' },
        ...block('c', 42, 22, 30, '110,5 g, 25 °C', 'blue'),
        { t: 'text', x: 76, y: 28, text: '+ 23,9 g ↓', size: 's', color: 'purple' },
        { t: 'formula', x: 4, y: 46, text: '134,4 g — 23,9 g' },
        { t: 'formula', x: 4, y: 58, text: '336 g — 336 · 23,9 / 134,4 = 59,75 g' }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Na2CO3 ning 80 gradusdagi eruvchanligi 45. 144 gramm sodani necha gramm suvda eritsak, toʻyingan eritma hosil boʻladi? 45 gramm tuz 100 gramm suvga toʻgʻri keladi. 144 gramm uchun: 144 karra 100 boʻlinsin 45 — 320 gramm suv.",
      easy: "m(suv) = 144 · 100 / 45 = 320 g.",
      draw: [
        { t: 'title', text: 'Qancha suv kerak?' },
        { t: 'formula', x: 4, y: 24, text: '45 g — 100 g suv' },
        { t: 'formula', x: 4, y: 38, text: '144 g — x' },
        { t: 'formula', x: 4, y: 52, text: 'x = 144 · 100 / 45 = 320 g' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Asosiy qator: 100 g suv — S g modda — (100 + S) g toʻyingan eritma; berilganlarni shu qatorga proporsiya qilamiz.',
    'Toʻyintirish uchun qoʻshiladigan modda = S · m(suv)/100 − mavjud modda.',
    'Sovitganda har (100 + S issiq) g eritmadan S(issiq) − S(sovuq) gramm modda kristallanadi.'
  ],
  questions: [
    {
      id: 'k14q1',
      prompt: '20 °C da 250 g suvda 220 g NaNO₃ eritilganda toʻyingan eritma hosil boʻldi. S(20 °C) ni toping.',
      hint: 'S = 220 · 100 / 250.',
      explanation: '88.',
      widget: { type: 'number_answer', props: { answer: 88 } }
    },
    {
      id: 'k14q2',
      prompt: 'S(NaNO₃, 25 °C) = 91,6. 500 g suvga necha gramm NaNO₃ qoʻshilsa, toʻyingan eritma hosil boʻladi?',
      hint: '91,6 · 5.',
      explanation: '458 g.',
      widget: { type: 'number_answer', props: { answer: 458, unit: 'g' } }
    },
    {
      id: 'k14q3',
      prompt: 'S(K₂SO₄, 40 °C) = 64. 192 g K₂SO₄ ni necha gramm suvda eritsak, toʻyingan eritma hosil boʻladi?',
      hint: '192 · 100 / 64.',
      explanation: '300 g suv.',
      widget: { type: 'number_answer', props: { answer: 300, unit: 'g' } }
    },
    {
      id: 'k14q4',
      prompt: 'S(NH₄Cl, 20 °C) = 37. 250 g suvda 50 g NH₄Cl erigan. Toʻyintirish uchun yana necha gramm qoʻshish kerak?',
      hint: 'Kerak: 37 · 2,5.',
      explanation: '92,5 − 50 = 42,5 g.',
      widget: { type: 'number_answer', props: { answer: 42.5, tolerance: 0.01, unit: 'g' } }
    },
    {
      id: 'k14q5',
      prompt: '100 °C dagi 785 g KCl toʻyingan eritmasi 25 °C gacha sovitildi. Necha gramm tuz kristallanadi? S(25 °C) = 35, S(100 °C) = 57.',
      hint: '157 g eritmadan 22 g.',
      explanation: '785 / 157 = 5; 5 · (57 − 35) = 110 g.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['22 g', '57 g', '110 g', '175 g'], answerIndex: 2 } }
    },
    {
      id: 'k14q6',
      prompt: 'Kristallanish masalasini yechish bosqichlarini tartiblang.',
      hint: 'Avval 100 g suvli eritma uchun.',
      explanation: 'Issiq toʻyingan eritma massasi (100 + S) → choʻkma S₁ − S₂ → proporsiya → javob.',
      widget: { type: 'step_order', props: { steps: ['Issiqdagi toʻyingan eritma massasi: 100 + S₁', 'Sovitganda choʻkma: S₁ − S₂', 'Berilgan eritma massasi bilan proporsiya tuzish', 'Choʻkma massasini hisoblash'] } }
    },
    {
      id: 'k14q7',
      prompt: 'Kattalikni proporsiyadagi oʻrni bilan juftlang (S = 34).',
      hint: '100 g suvga nisbatan.',
      explanation: 'Suv — 100 g; modda — 34 g; toʻyingan eritma — 134 g.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'erituvchi', right: '100 g' },
            { left: 'erigan modda', right: '34 g' },
            { left: 'toʻyingan eritma', right: '134 g' }
          ]
        }
      }
    },
    {
      id: 'k14q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'S — 100 g suvga.',
      explanation: 'S doim 100 g erituvchiga nisbatan; sovitganda qattiq modda kristallanadi; S haroratga bogʻliq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Eruvchanlik koeffitsiyenti 100 g erituvchiga nisbatan hisoblanadi.', value: true },
            { text: 'Issiq toʻyingan eritma sovitilsa, qattiq tuz kristallanadi.', value: true },
            { text: 'S = 40 boʻlsa, 100 g toʻyingan eritmada 40 g tuz bor.', value: false },
            { text: 'Eruvchanlik koeffitsiyenti haroratga bogʻliq emas.', value: false }
          ]
        }
      }
    }
  ]
};
