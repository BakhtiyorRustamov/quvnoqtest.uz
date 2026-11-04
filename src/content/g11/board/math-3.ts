import type { BoardLesson } from './types';

/** Darslik: 3–4-mavzu (12–13-betlar) — limit haqida tushuncha. */
export const MATH_3: BoardLesson = {
  n: 3,
  label: "3",
  part: 'algebra',
  title: "Limit bilan tanishuv",
  section: '3–4',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Eshik tomon yuryapsiz va har safar qolgan masofaning yarmini bosasiz: 4 metr, 2 metr, 1 metr, yarim metr... Masofa tobora kichrayadi va nolga yaqinlashadi. Matematikada «yaqinlashish» gʻoyasi juda muhim, u limit deb ataladi. Bugun limit bilan tanishamiz.",
      easy: "Har qadamda eshikka yaqinroq borasiz. Masofa nolga intiladi. «Intiladi» soʻzi — limitning asosiy gʻoyasi.",
      draw: [
        { t: 'title', text: 'Yaqinlashish' },
        { t: 'icon', x: 10, y: 32, emoji: '🚶', size: 'l' },
        { t: 'icon', x: 90, y: 32, emoji: '🚪', size: 'l' },
        { t: 'text', x: 50, y: 33, text: '4 m → 2 m → 1 m → 0,5 m → …', anchor: 'middle' },
        { t: 'box', id: 'h', x: 20, y: 44, w: 60, h: 12, text: 'Masofa tobora kichrayib, nolga intiladi', color: 'orange' }
      ],
      next: "Limit nima ekan?"
    },
    {
      kind: 'explain',
      clear: true,
      say: "f(x) teng x kvadrat minus 1 funksiyasini olamiz. x ni 3 ga chap tomondan, yaʼni 3 dan kichik qiymatlar bilan yaqinlashtiramiz: 2 yarim, 2,9, 2,99... Funksiya qiymatlari: 5,25, keyin 7,41, keyin 7,94... Ular 8 ga yaqinlashib boryapti.",
      easy: "x ni 3 ga juda yaqin, lekin undan kichik qilib olamiz. Har safar natija 8 ga yanada yaqinroq chiqadi.",
      draw: [
        { t: 'title', text: 'Chapdan yaqinlashamiz' },
        { t: 'formula', x: 8, y: 21, text: 'f(x) = x² − 1,   x → 3' },
        {
          t: 'table',
          x: 6,
          y: 26,
          rows: [
            ['x', '2,5', '2,9', '2,99', '2,999'],
            ['f(x)', '5,25', '7,41', '7,9401', '≈ 7,994']
          ]
        },
        { t: 'text', x: 6, y: 44, text: 'x < 3 (chapdan):  f(x) → 8', size: 's', color: 'blue' }
      ],
      next: "Oʻng tomondan-chi?"
    },
    {
      kind: 'explain',
      say: "Endi oʻng tomondan, yaʼni 3 dan katta qiymatlar bilan yaqinlashamiz: 3 yarim, 3,1, 3,01... Qiymatlar 11,25 dan 8,61 ga, keyin 8,06 ga tushadi — yana 8 ga yaqinlashyapti! Ikkala tomondan ham bir xil son chiqdi.",
      easy: "Endi 3 dan sal kattaroq sonlarni olamiz. Natijalar yana 8 ga yaqinlashadi. Chapdan ham, oʻngdan ham — 8.",
      draw: [
        {
          t: 'table',
          x: 6,
          y: 49,
          rows: [
            ['x', '3,5', '3,1', '3,01', '3,001'],
            ['f(x)', '11,25', '8,61', '8,0601', '≈ 8,006']
          ]
        },
        { t: 'text', x: 6, y: 66, text: 'x > 3 (oʻngdan):  f(x) → 8', size: 's', color: 'orange' }
      ],
      next: "Ikkalasi ham 8!"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Buni grafikda ham koʻramiz: nuqtalar chapdan ham, oʻngdan ham (3; 8) nuqtaga yaqinlashadi. Matematikada buni qisqa yozamiz: «lim», ostida «x intiladi 3», keyin x kvadrat minus 1, teng 8. Bu shunday oʻqiladi: x 3 ga intilganda, funksiyaning limiti 8 ga teng.",
      easy: "«lim» — limit soʻzining qisqartmasi. Ostidagi «x → 3» x qayerga yaqinlashayotganini bildiradi. Oxiridagi 8 — funksiya yaqinlashadigan son.",
      draw: [
        { t: 'title', text: 'Grafikda va yozuvda' },
        { t: 'axes', id: 'g', x: 6, y: 13, w: 50, h: 50, xmin: 0, xmax: 4, ymin: 0, ymax: 16, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'g', points: [[1, 0], [1.5, 1.25], [2, 3], [2.5, 5.25], [3, 8], [3.5, 11.25], [4, 15]], color: 'red' },
        { t: 'dot', axes: 'g', x: 2.5, y: 5.25, color: 'blue' },
        { t: 'dot', axes: 'g', x: 2.9, y: 7.41, color: 'blue' },
        { t: 'dot', axes: 'g', x: 3.5, y: 11.25, color: 'orange' },
        { t: 'dot', axes: 'g', x: 3.1, y: 8.61, color: 'orange' },
        { t: 'dot', axes: 'g', id: 'P', x: 3, y: 0, color: 'purple' },
        { t: 'dot', axes: 'g', id: 'Q', x: 3, y: 8, color: 'purple' },
        { t: 'text', x: 29, y: 37, text: '(3; 8)', size: 's', color: 'purple' },
        { t: 'line', from: 'P', to: 'Q', color: 'purple', dashed: true },
        { t: 'text', x: 62, y: 28, text: 'lim (x² − 1) = 8', color: 'purple' },
        { t: 'text', x: 63, y: 34, text: 'x → 3', size: 's', color: 'purple' },
        { t: 'text', x: 62, y: 48, text: '«x 3 ga intilganda', size: 's' },
        { t: 'text', x: 62, y: 54, text: 'limit 8 ga teng»', size: 's' }
      ],
      next: "Taʼrifini ayting"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi umumiy taʼrif. x a ga teng boʻlmagan holda, a ga yaqinlashib borsin. Agar shu payt f(x) ning qiymatlari biror A soniga yaqinlashsa, A soni f(x) funksiyaning x intiladi a dagi limiti deyiladi. Eʼtibor bering: x a ga faqat yaqinlashadi, unga teng boʻlmaydi. Bu juda muhim.",
      easy: "Taʼrifning maʼnosi oddiy: x ni a ga yaqinlashtiramiz va funksiya qaysi songa yaqinlashayotganini kuzatamiz. Oʻsha son — limit. x ning oʻzi a boʻlishi shart emas.",
      draw: [
        { t: 'title', text: 'Taʼrif' },
        { t: 'box', id: 'df', x: 6, y: 14, w: 88, h: 18, text: "x ≠ a boʻlib, x ning qiymatlari a ga yaqinlashganda f(x) ning qiymatlari A soniga yaqinlashsa, A soni f(x) ning x → a dagi limiti deyiladi", color: 'blue' },
        { t: 'text', x: 50, y: 43, text: 'lim f(x) = A', anchor: 'middle', size: 'l', color: 'purple' },
        { t: 'text', x: 37, y: 49, text: 'x → a', size: 's', color: 'purple' },
        { t: 'box', id: 'im', x: 6, y: 55, w: 88, h: 11, text: 'Muhim: x faqat a ga yaqinlashadi, a ga teng boʻlmaydi (x ≠ a)', color: 'orange' }
      ],
      next: "Nega bu muhim?"
    },
    {
      kind: 'example',
      clear: true,
      say: "Endi qiziq holat. f(x) teng: x kvadrat minus 4, boʻlingan x minus 2 ga. x teng 2 ni qoʻysak, nolni nolga boʻlish chiqadi — funksiya bu nuqtada aniqlanmagan. Lekin 2 ga yaqin qiymatlarni olsak: 3,9, 3,99, 4,01, 4,1 — qiymatlar 4 ga yaqinlashadi. Demak, funksiyaning oʻzi yoʻq joyda ham limit boʻlishi mumkin. Buni keyingi darsda batafsil koʻramiz.",
      easy: "2 ning oʻzida funksiyani hisoblab boʻlmaydi. Ammo 2 ning yonidagi sonlar uchun javob 4 ga juda yaqin. Limit aynan «yonida nima boʻlyapti?» degan savolga javob beradi.",
      draw: [
        { t: 'title', text: 'Nuqtaning oʻzi boʻlmasa' },
        { t: 'formula', x: 8, y: 21, text: 'f(x) = (x² − 4) / (x − 2)' },
        { t: 'text', x: 6, y: 31, text: 'x = 2 da: 0 / 0 — aniqlanmagan!', size: 's', color: 'red' },
        {
          t: 'table',
          x: 6,
          y: 36,
          rows: [
            ['x', '1,9', '1,99', '2,01', '2,1'],
            ['f(x)', '3,9', '3,99', '4,01', '4,1']
          ]
        },
        { t: 'box', id: 'ok', x: 58, y: 36, w: 38, h: 14, text: 'Funksiya x = 2 da yoʻq, lekin limiti bor!', color: 'green' },
        { t: 'text', x: 6, y: 60, text: 'lim f(x) = 4', color: 'purple' },
        { t: 'text', x: 7, y: 66, text: 'x → 2', size: 's', color: 'purple' }
      ],
      next: "Qiziq-ku!"
    }
  ],
  summary: [
    "«x → a» degani: x a ga yaqinlashadi, lekin a ga teng boʻlmaydi.",
    "x ni a ga chapdan (x < a) va oʻngdan (x > a) yaqinlashtirib, f(x) qaysi songa intilishini kuzatamiz.",
    "Ikkala tomondan ham A ga intilsa, lim (x→a) f(x) = A deb yozamiz.",
    "Funksiya x = a da aniqlanmagan boʻlsa ham, limit mavjud boʻlishi mumkin."
  ],
  questions: [
    {
      id: 'm3q1',
      prompt: "Jadvalga qarang. x: 1,9 → 1,99 → 1,999 boʻlganda f(x): 4,8 → 4,98 → 4,998. x: 2,1 → 2,01 boʻlganda f(x): 5,2 → 5,02. x → 2 da f(x) qaysi songa yaqinlashadi?",
      hint: "Ikkala tomondagi qiymatlar qaysi son atrofida toʻplanmoqda?",
      explanation: "Chapdan ham, oʻngdan ham qiymatlar 5 ga yaqinlashadi: lim (x→2) f(x) = 5.",
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'm3q2',
      prompt: "lim (x→4) (x + 6) = ?",
      hint: "x 4 ga yaqinlashganda x + 6 qaysi songa yaqinlashadi?",
      explanation: "x + 6 → 4 + 6 = 10.",
      widget: { type: 'number_answer', props: { answer: 10 } }
    },
    {
      id: 'm3q3',
      prompt: "lim (x→3) x² = ?",
      hint: "3 ga yaqin sonlarning kvadrati qaysi songa yaqin?",
      explanation: "x² → 3² = 9.",
      widget: { type: 'number_answer', props: { answer: 9 } }
    },
    {
      id: 'm3q4',
      prompt: "Limit taʼrifini toʻldiring.",
      hint: "x qayerga yaqinlashadi, f(x) qayerga yaqinlashadi?",
      explanation: "x ≠ a boʻlib, x ning qiymatlari a ga yaqinlashganda f(x) ning qiymatlari A ga yaqinlashsa, A soni f(x) ning limiti deyiladi.",
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'x ≠ a boʻlib, x ning qiymatlari ' }, { blank: 'a' }, { text: ' ga yaqinlashganda f(x) ning qiymatlari ' }, { blank: 'A' }, { text: ' soniga yaqinlashsa, A soni f(x) funksiyaning ' }, { blank: 'limiti' }, { text: ' deyiladi.' }],
          bank: ['a', 'A', 'limiti', 'orttirmasi', 'x']
        }
      }
    },
    {
      id: 'm3q5',
      prompt: "Har bir gap toʻgʻrimi yoki notoʻgʻrimi?",
      hint: "Taʼrifdagi «x ≠ a» shartini eslang.",
      explanation: "x a ga faqat yaqinlashadi. Ikki tomondan tekshiramiz. Funksiya nuqtada aniqlanmagan boʻlsa ham limit boʻlishi mumkin. lim (x→2) x² = 4.",
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: "x → a yozuvida x a ga teng boʻlishi shart.", value: false },
            { text: "Limitni topishda x ni a ga chapdan ham, oʻngdan ham yaqinlashtiramiz.", value: true },
            { text: "Funksiya x = a da aniqlanmagan boʻlsa, u yerda limit hech qachon boʻlmaydi.", value: false },
            { text: "lim (x→2) x² = 4", value: true }
          ]
        }
      }
    },
    {
      id: 'm3q6',
      prompt: "Grafikda f(x) funksiya tasvirlangan, x = 1 da teshik bor. x → 1 da funksiya intiladigan nuqtani bosing.",
      hint: "Teshik qayerda? Grafik ikki tomondan oʻsha joyga keladi.",
      explanation: "Ikki tomondan grafik (1; 3) nuqtaga yaqinlashadi: lim (x→1) f(x) = 3, garchi f(1) mavjud boʻlmasa ham.",
      widget: {
        type: 'graph_tap',
        props: {
          target: [1, 3],
          radius: 0.8,
          graph: { xmin: -1, xmax: 3, ymin: -1, ymax: 8, xlabel: 'x', ylabel: 'y', curves: [{ points: [[-1, -1], [3, 7]] }], holes: [[1, 3]] }
        }
      }
    },
    {
      id: 'm3q7',
      prompt: "Har bir limitni uning qiymati bilan juftlang.",
      hint: "x oʻrniga u intilayotgan sonni qoʻyib koʻring.",
      explanation: "1 + 2 = 3; 5 − 0 = 5; 3 · 2 = 6; (−1)² = 1.",
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'lim (x→1) (x + 2)', right: '3' },
            { left: 'lim (x→0) (5 − x)', right: '5' },
            { left: 'lim (x→2) 3x', right: '6' },
            { left: 'lim (x→−1) x²', right: '1' }
          ]
        }
      }
    },
    {
      id: 'm3q8',
      prompt: "Qaysi grafiklarda x → 2 da limit 3 ga teng? (Bir nechtasi boʻlishi mumkin.)",
      hint: "Teshik boʻlsa ham, ikki tomondan bitta songa yaqinlashsa — limit bor.",
      explanation: "a) va b) da ikki tomondan 3 ga yaqinlashadi (b dagi teshik xalaqit bermaydi). c) da chapdan 3 ga, oʻngdan 5 ga — limit yoʻq. d) da limit 5.",
      widget: {
        type: 'graph_choose',
        props: {
          answer: ['a', 'b'],
          graphs: [
            { id: 'a', graph: { xmin: 0, xmax: 4, ymin: 0, ymax: 6, curves: [{ points: [[0, 1], [1, 1.8], [2, 3], [3, 4.3], [4, 5.2]] }], dots: [[2, 3]], vlines: [2] } },
            { id: 'b', graph: { xmin: 0, xmax: 4, ymin: 0, ymax: 6, curves: [{ points: [[0, 1], [1, 1.8], [2, 3], [3, 4.3], [4, 5.2]] }], holes: [[2, 3]], vlines: [2] } },
            { id: 'c', graph: { xmin: 0, xmax: 4, ymin: 0, ymax: 6, curves: [{ points: [[0, 1], [1, 2], [2, 3]] }, { points: [[2, 5], [3, 5.4], [4, 5.7]] }], holes: [[2, 3]], dots: [[2, 5]], vlines: [2] } },
            { id: 'd', graph: { xmin: 0, xmax: 4, ymin: 0, ymax: 6, curves: [{ points: [[0, 3], [1, 4], [2, 5], [3, 5.5], [4, 5.8]] }], dots: [[2, 5]], vlines: [2] } }
          ]
        }
      }
    },
    {
      id: 'm3q9',
      prompt: "f(x) = (x² − 1) / (x − 1). x = 0,99 da f(x) = 1,99; x = 1,01 da f(x) = 2,01. lim (x→1) f(x) = ?",
      hint: "Ikki tomondagi qiymatlar qaysi son atrofida?",
      explanation: "Chapdan 1,99, oʻngdan 2,01 — ikkalasi 2 ga yaqin: limit 2. (f(1) esa aniqlanmagan.)",
      widget: { type: 'number_answer', props: { answer: 2 } }
    },
    {
      id: 'm3q10',
      prompt: "Jadval yordamida limitni topish tartibini toʻgʻri tartibda bosing.",
      hint: "Avval x qiymatlarini tanlaymiz, keyin hisoblaymiz.",
      explanation: "Chapdan va oʻngdan yaqin x lar → har biri uchun f(x) → qiymatlar intilayotgan sonni aniqlash.",
      widget: {
        type: 'step_order',
        props: {
          steps: [
            'a ga chapdan yaqin x qiymatlarini oling',
            'a ga oʻngdan yaqin x qiymatlarini oling',
            'Har biri uchun f(x) ni hisoblang',
            'f(x) qiymatlari qaysi songa intilayotganini aniqlang'
          ]
        }
      }
    }
  ]
};
