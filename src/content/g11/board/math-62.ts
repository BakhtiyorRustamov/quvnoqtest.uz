import type { BoardLesson } from './types';

/** normal zichlik funksiyasi */
const f = (x: number, a: number, s: number) => Math.exp(-((x - a) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));
const curve = (a: number, s: number, from: number, to: number, step: number): [number, number][] => {
  const pts: [number, number][] = [];
  for (let x = from; x <= to + 1e-9; x += step) pts.push([+x.toFixed(2), +f(x, a, s).toFixed(4)]);
  return pts;
};
/** «qalpoqsimon» ustunli diagramma (sxematik): boʻy 145…180 cm, 5 cm li oraliqlar */
const HEIGHT_BARS: [number, number][][] = [145, 150, 155, 160, 165, 170, 175].flatMap((x0) => {
  const h = +(f(x0 + 2.5, 162.5, 6) * 100).toFixed(2);
  return [
    [[x0, 0], [x0, h]],
    [[x0, h], [x0 + 5, h]],
    [[x0 + 5, h], [x0 + 5, 0]]
  ] as [number, number][][];
});
const HEIGHT_CURVE: [number, number][] = curve(162.5, 6, 142, 183, 1).map(([x, y]) => [x, +(y * 100).toFixed(3)]);

/** Darslik (2-qism): 81–85-mavzu (94–96-betlar) — tasodifiy miqdor, normal taqsimot. */
export const MATH_62: BoardLesson = {
  n: 62,
  label: '84–85',
  part: 'algebra',
  qism: 2,
  title: 'Tasodifiy miqdor va normal taqsimot',
  section: '81–85',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Fransuz olimi Muavr tavakkaliga tanlangan 1375 nafar ayolning boʻyini oʻlchab, natijani ustunli diagrammada tasvirladi. Oʻrtacha boʻylilar eng koʻp, juda past va juda balandlar kam. Ustunlar uchini tutashtirsak, qoʻngʻiroqqa yoki qalpoqqa oʻxshash egri chiziq chiqadi. Bu tasodif emas — tabiatda juda koʻp uchraydigan qonuniyat.",
      easy: "Boʻylar diagrammasi qoʻngʻiroqsimon: oʻrtadagilar koʻp, chetlar kam.",
      draw: [
        { t: 'title', text: 'Ayollar boʻyi (sxema)' },
        { t: 'axes', id: 'g', x: 8, y: 16, w: 58, h: 44, xmin: 140, xmax: 185, ymin: 0, ymax: 7.5, xlabel: 'cm' },
        ...HEIGHT_BARS.map((points) => ({ t: 'curve' as const, axes: 'g', points, color: 'blue' as const })),
        { t: 'curve', axes: 'g', points: HEIGHT_CURVE, color: 'red' },
        { t: 'list', x: 70, y: 24, items: ['oʻrtada — koʻp', 'chetlarda — kam'] }
      ],
      next: 'Tasodifiy miqdor'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Tajriba natijasida u yoki bu qiymatni qabul qiladigan miqdor tasodifiy miqdor deyiladi. Masalan: kubda tushgan ochko, tavakkaliga tanlangan odamning boʻyi, bir soatda bekatga kelgan taksilar soni, televizorning buzilmasdan ishlash muddati, 100 ta mahsulot ichidagi sifatsizlar soni.",
      easy: "Tasodifiy miqdor — tajriba natijasida turli qiymatlar oladigan son.",
      draw: [
        { t: 'title', text: 'Tasodifiy miqdorlar' },
        { t: 'list', x: 6, y: 20, items: ['kubdagi ochko: 1, 2, …, 6', 'odamning boʻyi, cm', 'bir soatda kelgan taksilar soni', 'televizorning ishlash muddati', '100 mahsulotdan sifatsizlari soni'] },
        { t: 'icon', x: 86, y: 34, emoji: '🎲', size: 'l' }
      ],
      next: 'Normal taqsimot'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Muavr egri chizigʻi taxminan f(x) teng 1 boʻlinsin sigma ildiz 2 pi, karra e ning minus x minus a ning kvadrati boʻlinsin 2 sigma kvadrat darajasi funksiyasi grafigiga yaqin ekan. Bu yerda a — qiymatlarning oʻrtasi, sigma — standart chetlanish. Bunday taqsimlangan miqdorlar normal taqsimlangan deyiladi.",
      easy: "Normal taqsimot: a — markaz (oʻrtacha), σ — standart chetlanish.",
      draw: [
        { t: 'title', text: 'Normal taqsimot' },
        { t: 'formula', x: 6, y: 20, text: 'f(x) = 1/(σ√(2π)) · e^{−(x − a)²/(2σ²)}' },
        { t: 'list', x: 6, y: 40, items: ['a — markaz (oʻrta qiymat)', 'σ — standart chetlanish', 'grafik x = a ga nisbatan simmetrik'] }
      ],
      next: 'a va σ qanday taʼsir qiladi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ikkita grafikni solishtiramiz, ikkalasida a teng 0. Sigma teng 1 boʻlsa, egri chiziq baland va tor — qiymatlar oʻrtacha atrofida zich. Sigma teng 2 boʻlsa, past va keng — qiymatlar tarqoq. a oʻzgarsa, grafik chapga yoki oʻngga suriladi, shakli esa oʻzgarmaydi.",
      easy: "σ kichik — baland va tor; σ katta — past va keng. a — grafikni suradi.",
      draw: [
        { t: 'title', text: 'σ = 1 va σ = 2' },
        { t: 'axes', id: 'g', x: 8, y: 16, w: 58, h: 44, xmin: -6, xmax: 6, ymin: 0, ymax: 0.45 },
        { t: 'curve', axes: 'g', points: curve(0, 1, -4, 4, 0.25), color: 'blue' },
        { t: 'curve', axes: 'g', points: curve(0, 2, -6, 6, 0.5), color: 'red' },
        { t: 'text', x: 70, y: 26, text: 'σ = 1: tor', color: 'blue' },
        { t: 'text', x: 70, y: 36, text: 'σ = 2: keng', color: 'red' },
        { t: 'text', x: 70, y: 50, text: 'a = 0 — markaz', color: 'purple', size: 's' }
      ],
      next: 'Qayerda uchraydi?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Agar miqdorga koʻp sonli, bir-biriga bogʻliq boʻlmagan kichik tasodifiy omillar taʼsir qilsa, u normal taqsimlangan boʻladi. Misollar: oʻq otishda nishondan chetlanish, oʻlchash xatoliklari, tirik organizmlarning boʻyi va vazni. Yana bir ajoyib fakt: tajribalar soni n katta boʻlsa, binomial taqsimot normal taqsimotga yaqinlashadi — 16 ta tanga diagrammasini eslang!",
      easy: "Koʻp kichik omillar → normal taqsimot. Katta n da binomial taqsimot normalga yaqin.",
      draw: [
        { t: 'title', text: 'Normal taqsimot hayotda' },
        { t: 'list', x: 6, y: 20, items: ['nishondan chetlanish', 'oʻlchash xatoliklari', 'boʻy, vazn, barg uzunligi'] },
        {
          t: 'bars',
          x: 56,
          y: 18,
          w: 38,
          h: 30,
          items: [{ label: '5', value: 0.067 }, { label: '6', value: 0.122 }, { label: '7', value: 0.175 }, { label: '8', value: 0.196 }, { label: '9', value: 0.175 }, { label: '10', value: 0.122 }, { label: '11', value: 0.067 }],
          color: 'green'
        },
        { t: 'text', x: 56, y: 60, text: 'binomial (n = 16) ≈ normal', color: 'green', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Tasodifiy miqdor — tajriba natijasida turli qiymatlar qabul qiladigan miqdor.',
    'Normal taqsimot grafigi qoʻngʻiroqsimon: a — markaz, σ — standart chetlanish.',
    'Koʻp kichik mustaqil omillar natijasi normal taqsimlanadi; katta n da binomial taqsimot normalga yaqin.'
  ],
  questions: [
    {
      id: 'p62q1',
      prompt: 'Qaysilari tasodifiy miqdor? Hammasini belgilang.',
      hint: 'Tajribaga qarab har xil qiymat oladimi?',
      explanation: 'Kubdagi ochko, tanlangan odamning boʻyi, bir soatdagi taksilar soni — tasodifiy; haftadagi kunlar soni va kubning yoqlari soni — oʻzgarmas.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'kubda tushgan ochko', correct: true },
            { label: 'tavakkaliga tanlangan odamning boʻyi', correct: true },
            { label: 'bir soatda bekatga kelgan taksilar soni', correct: true },
            { label: 'haftadagi kunlar soni' },
            { label: 'kubning yoqlari soni' }
          ]
        }
      }
    },
    {
      id: 'p62q2',
      prompt: 'Normal taqsimotda a parametr nimani bildiradi?',
      hint: 'Grafik qaysi nuqtaga nisbatan simmetrik?',
      explanation: 'a — qiymatlarning oʻrtasi (markaz); grafik x = a ga nisbatan simmetrik.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Standart chetlanish', 'Qiymatlarning oʻrtasi (markaz)', 'Tajribalar soni', 'Eng katta qiymat'], answerIndex: 1 } }
    },
    {
      id: 'p62q3',
      prompt: 'Ikki normal egri chiziqning markazi bir xil. Birida σ = 1, ikkinchisida σ = 3. Qaysi biri balandroq va torroq?',
      hint: 'σ kichik — zich.',
      explanation: 'σ = 1 boʻlgani baland va tor.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['σ = 1', 'σ = 3', 'Ikkalasi bir xil', 'Aniqlab boʻlmaydi'], answerIndex: 0 } }
    },
    {
      id: 'p62q4',
      prompt: 'Normal taqsimlangan miqdorlarni ajrating (taxminan).',
      hint: 'Koʻp kichik omillar taʼsir qiladimi?',
      explanation: 'Boʻy, oʻlchash xatosi, nishondan chetlanish — normalga yaqin; kub ochkosi (hammasi teng ehtimolli) va tanga natijasi — normal emas.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'n', label: 'Normalga yaqin' },
            { id: 'x', label: 'Normal emas' }
          ],
          items: [
            { emoji: '', label: 'katta yoshli ayollar boʻyi', bin: 'n' },
            { emoji: '', label: 'oʻlchash xatoligi', bin: 'n' },
            { emoji: '', label: 'nishondan chetlanish', bin: 'n' },
            { emoji: '', label: 'bitta kubdagi ochko', bin: 'x' },
            { emoji: '', label: 'bitta tanga natijasi', bin: 'x' }
          ]
        }
      }
    },
    {
      id: 'p62q5',
      prompt: 'Parametrni maʼnosi bilan moslang.',
      hint: 'Grafikni suradi yoki kengaytiradi?',
      explanation: 'a — markaz (grafikni suradi); σ — tarqoqlik (kenglik).',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'a', right: 'markaz — grafikni suradi' },
            { left: 'σ', right: 'tarqoqlik — grafik kengligi' },
            { left: 'n katta', right: 'binomial ≈ normal' }
          ]
        }
      }
    },
    {
      id: 'p62q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Grafik shaklini eslang.',
      explanation: 'Normal grafik x = a ga nisbatan simmetrik; σ katta boʻlsa grafik keng; uni Muavr tadqiq qilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Normal taqsimot grafigi x = a toʻgʻri chiziqqa nisbatan simmetrik.', value: true },
            { text: 'σ oshgan sari grafik torayadi va balandlashadi.', value: false },
            { text: 'Tajribalar soni katta boʻlsa, binomial taqsimot normalga yaqinlashadi.', value: true },
            { text: 'Normal taqsimotda chetki qiymatlar eng koʻp uchraydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'p62q7',
      prompt: 'Ortiqchasini toping (qolganlari tasodifiy miqdor).',
      hint: 'Qaysi biri doim bir xil?',
      explanation: 'Bir yildagi oylar soni har doim 12 — tasodifiy emas.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'televizorning ishlash muddati' }, { text: 'sifatsiz mahsulotlar soni' }, { text: 'bir yildagi oylar soni', odd: true }, { text: 'oʻquvchining vazni' }] } }
    }
  ]
};
