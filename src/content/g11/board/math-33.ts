import type { BoardLesson } from './types';
import { cuboid, pt } from './geo3d';

const O: [number, number] = [22, 58];

/** Darslik: Geometriya, 6-mavzu (153–157-betlar) — prizma va uning sirti. */
export const MATH_33: BoardLesson = {
  n: 33,
  label: "6",
  part: 'geometriya',
  title: "Prizma va uning sirtini hisoblash",
  section: 'Geometriya, 6',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Doʻstingizga sovgʻa tayyorlayapsiz: quti 30 ga 20 ga 10 santimetr. Uni oʻrash uchun qancha qogʻoz kerak? Qutining 6 ta yogʻi bor, juft-juft teng: 30 ga 20, 30 ga 10, 20 ga 10. Yuzalar yigʻindisi 2 karra 600 plyus 300 plyus 200, yaʼni 2200 kvadrat santimetr. Bu — prizmaning toʻla sirti.",
      easy: "Qogʻoz miqdori — qutining 6 ta yogʻi yuzalarining yigʻindisi: 2200 kvadrat santimetr.",
      draw: [
        { t: 'title', text: 'Sovgʻani oʻrash' },
        ...cuboid('q', [2, 6, 2.5], [14, 56], 6, {}, 'red'),
        { t: 'icon', x: 34, y: 30, emoji: '🎁', size: 'm' },
        { t: 'list', x: 60, y: 20, items: ['30 × 20 = 600', '30 × 10 = 300', '20 × 10 = 200'] },
        { t: 'box', id: 'r', x: 58, y: 48, w: 38, h: 12, text: '2·1100 = 2200 sm²', color: 'green' }
      ],
      next: 'Prizma nima?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikki yogʻi — asoslari — teng n burchaklardan, qolgan n ta yogʻi parallelogrammlardan iborat koʻpyoq prizma deyiladi. Yon qirralari asosga perpendikulyar boʻlsa — toʻgʻri prizma, aks holda — ogʻma prizma. Asosi muntazam koʻpburchak boʻlgan toʻgʻri prizma muntazam prizma deyiladi. Asoslar orasidagi masofa — prizmaning balandligi.",
      easy: "Prizma: ikki teng asos va parallelogramm shaklidagi yon yoqlar. Toʻgʻri prizmada yon yoqlar — toʻgʻri toʻrtburchaklar.",
      draw: [
        { t: 'title', text: 'Prizma' },
        pt('A', [3, 0.5, 0], 'A', O, 6),
        pt('B', [2, 4.5, 0], 'B', O, 6),
        pt('C', [0, 2, 0], 'C', O, 6),
        pt('A1', [3, 0.5, 5], 'A₁', O, 6),
        pt('B1', [2, 4.5, 5], 'B₁', O, 6),
        pt('C1', [0, 2, 5], 'C₁', O, 6),
        { t: 'line', from: 'A', to: 'B' },
        { t: 'line', from: 'A', to: 'C', dashed: true },
        { t: 'line', from: 'B', to: 'C', dashed: true },
        { t: 'line', from: 'C', to: 'C1', dashed: true },
        { t: 'line', from: 'A', to: 'A1' },
        { t: 'line', from: 'B', to: 'B1' },
        { t: 'polygon', points: ['A1', 'B1', 'C1'], color: 'blue' },
        { t: 'list', x: 56, y: 20, items: ['asoslar: ABC, A₁B₁C₁', 'yon qirra: AA₁', 'AA₁ ⊥ asos — toʻgʻri'] }
      ],
      next: 'Parallelepiped'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Asosi parallelogramm boʻlgan prizma parallelepiped deyiladi. Uning 6 ta yogʻi, 12 ta qirrasi bor, qarama-qarshi yoqlari parallel va teng, 4 ta diagonali bitta nuqtada kesishib, teng ikkiga boʻlinadi. Asoslari toʻgʻri toʻrtburchak boʻlgan toʻgʻri parallelepiped toʻgʻri burchakli parallelepiped deyiladi. Uning diagonali kvadrati oʻlchamlari kvadratlari yigʻindisiga teng.",
      easy: "Toʻgʻri burchakli parallelepiped diagonali: d kvadrat teng a kvadrat plyus b kvadrat plyus c kvadrat.",
      draw: [
        { t: 'title', text: 'Toʻgʻri burchakli parallelepiped' },
        ...cuboid('p', [3, 5, 3.5], [18, 58], 6, { '000': 'A', '111': 'C₁' }),
        { t: 'line', from: 'p000', to: 'p111', color: 'red', label: 'd' },
        { t: 'formula', x: 60, y: 24, text: 'd² = a² + b² + c²' },
        { t: 'text', x: 60, y: 44, text: 'kub: a = b = c', size: 's', color: 'purple' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Oʻlchamlari 3, 4 va 12 boʻlgan parallelepipedning diagonali: d kvadrat teng 9 plyus 16 plyus 144, yaʼni 169, d teng 13. Kubning qirrasi a boʻlsa, diagonali a ildiz 3. Masalan, qirrasi 2 boʻlgan kubning diagonali 2 ildiz 3, taxminan 3,46.",
      easy: "9 + 16 + 144 = 169, diagonal 13. Kubda diagonal a√3.",
      draw: [
        { t: 'title', text: 'Diagonalni topamiz' },
        { t: 'formula', x: 6, y: 22, text: 'd² = 3² + 4² + 12² = 169' },
        { t: 'box', id: 'r', x: 6, y: 36, w: 30, h: 11, text: 'd = 13', color: 'green' },
        { t: 'text', x: 6, y: 58, text: 'kub:  d = a√3', color: 'blue' }
      ],
      next: 'Yon sirt'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Prizmaning yon sirti — yon yoqlari yuzalarining yigʻindisi. Toʻla sirt — yon sirt plyus ikkita asos yuzasi. Toʻgʻri prizmada har bir yon yoq — toʻgʻri toʻrtburchak, eni — asos tomoni, boʻyi — balandlik h. Shuning uchun yon sirt asos perimetrining balandlikka koʻpaytmasiga teng: S yon teng P karra h.",
      easy: "Toʻgʻri prizma yon sirti: asos perimetri karra balandlik. Toʻla sirtga ikki asosni qoʻshamiz.",
      draw: [
        { t: 'title', text: 'Prizma sirti' },
        { t: 'formula', x: 8, y: 22, text: 'S yon = P asos · h' },
        { t: 'formula', x: 8, y: 38, text: 'S toʻla = S yon + 2·S asos' },
        { t: 'text', x: 8, y: 58, text: 'ogʻma prizma: S yon = P⊥ · l', size: 's', color: 'purple' }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Muntazam toʻrtburchakli prizma: asos tomoni 5 santimetr, balandligi 10 santimetr. Asos perimetri 20, yon sirt 20 karra 10 teng 200 kvadrat santimetr. Asos — kvadrat, yuzasi 25. Toʻla sirt 200 plyus 50 teng 250 kvadrat santimetr.",
      easy: "Yon sirt 20 · 10 = 200, ikkita asos 50, toʻla sirt 250.",
      draw: [
        { t: 'title', text: 'Muntazam prizma' },
        ...cuboid('m', [3, 3, 5], [16, 60], 6, {}, 'blue'),
        { t: 'list', x: 52, y: 20, items: ['a = 5, h = 10', 'P = 4·5 = 20', 'S yon = 20·10 = 200', 'S asos = 25'] },
        { t: 'box', id: 'r', x: 52, y: 52, w: 40, h: 11, text: 'S toʻla = 250 sm²', color: 'green' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Prizma — ikki teng asos va parallelogramm yon yoqlardan iborat koʻpyoq; toʻgʻri prizmada yon qirra asosga perpendikulyar.',
    'Toʻgʻri burchakli parallelepiped: d² = a² + b² + c².',
    'Toʻgʻri prizma: S yon = P·h, S toʻla = S yon + 2S asos.'
  ],
  questions: [
    {
      id: 'm33q1',
      prompt: 'Oʻlchamlari 1, 2 va 2 boʻlgan toʻgʻri burchakli parallelepipedning diagonalini toping.',
      hint: 'd² = 1 + 4 + 4.',
      explanation: 'd = √9 = 3.',
      widget: { type: 'number_answer', props: { answer: 3 } }
    },
    {
      id: 'm33q2',
      prompt: 'Muntazam uchburchakli prizmaning asos tomoni 4, balandligi 10. Yon sirtini toping.',
      hint: 'P = 3·4 = 12.',
      explanation: 'S yon = 12 · 10 = 120.',
      widget: { type: 'number_answer', props: { answer: 120 } }
    },
    {
      id: 'm33q3',
      prompt: 'Qirrasi 3 boʻlgan kubning toʻla sirtini toping.',
      hint: '6 ta kvadrat.',
      explanation: '6 · 9 = 54.',
      widget: { type: 'number_answer', props: { answer: 54 } }
    },
    {
      id: 'm33q4',
      prompt: 'Kubning toʻla sirti 150. Uning qirrasini toping.',
      hint: '6a² = 150.',
      explanation: 'a² = 25 → a = 5.',
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'm33q5',
      prompt: 'Qutini oʻrash uchun qancha qogʻoz kerak: oʻlchamlari 40, 20 va 10 sm (sm²)?',
      hint: '2(40·20 + 40·10 + 20·10).',
      explanation: '2(800 + 400 + 200) = 2800 sm².',
      widget: { type: 'number_answer', props: { answer: 2800, unit: 'sm²' } }
    },
    {
      id: 'm33q6',
      prompt: 'Qaysilari prizma? Hammasini belgilab, Tekshirish ni bosing.',
      hint: 'Ikki teng asos va parallelogramm yon yoqlar.',
      explanation: 'Kub, parallelepiped va oltiburchakli prizma — prizmalar. Piramida, tetraedr va silindr — prizma emas.',
      widget: {
        type: 'pick_many',
        props: { options: [{ label: 'Kub', correct: true }, { label: 'Parallelepiped', correct: true }, { label: 'Oltiburchakli prizma', correct: true }, { label: 'Piramida' }, { label: 'Tetraedr' }, { label: 'Silindr' }] }
      }
    },
    {
      id: 'm33q7',
      prompt: 'Prizmalarni ularning yoq va qirralari bilan moslang.',
      hint: 'n burchakli prizma: n + 2 yoq, 3n qirra.',
      explanation: 'n = 3: 5 yoq, 9 qirra; n = 4: 6 yoq, 12 qirra; n = 5: 7 yoq, 15 qirra; n = 6: 8 yoq, 18 qirra.',
      widget: {
        type: 'match_pairs',
        props: { pairs: [{ left: 'Uchburchakli prizma', right: '5 yoq, 9 qirra' }, { left: 'Toʻrtburchakli prizma', right: '6 yoq, 12 qirra' }, { left: 'Beshburchakli prizma', right: '7 yoq, 15 qirra' }, { left: 'Oltiburchakli prizma', right: '8 yoq, 18 qirra' }] }
      }
    },
    {
      id: 'm33q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Parallelepiped xossalarini eslang.',
      explanation: 'Parallelepiped diagonallari bir nuqtada kesishadi; toʻgʻri prizmaning yon yoqlari toʻgʻri toʻrtburchak; muntazam prizma asosi muntazam koʻpburchak; ogʻma prizmada yon qirra asosga perpendikulyar emas.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Parallelepipedning diagonallari bir nuqtada kesishadi va teng ikkiga boʻlinadi.', value: true },
            { text: 'Toʻgʻri prizmaning yon yoqlari toʻgʻri toʻrtburchaklar.', value: true },
            { text: 'Ogʻma prizmaning yon qirralari asosga perpendikulyar.', value: false },
            { text: 'Toʻgʻri prizmaning yon sirti S = P·h.', value: true }
          ]
        }
      }
    }
  ]
};
