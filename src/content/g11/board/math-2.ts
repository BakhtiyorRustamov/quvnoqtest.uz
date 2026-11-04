import type { BoardLesson } from './types';

const X2: [number, number][] = [[-1, 1], [-0.5, 0.25], [0, 0], [0.5, 0.25], [1, 1], [1.5, 2.25], [2, 4], [2.5, 6.25], [3, 9], [3.2, 10.24]];

/** Darslik: 1–2-mavzu (8–11-betlar) — oʻrtacha tezlik, funksiya orttirmasi, urinma. */
export const MATH_2: BoardLesson = {
  n: 2,
  label: "2",
  part: 'algebra',
  title: "Oʻrtacha tezlik, funksiya orttirmasi va urinma",
  section: '1–2',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Toshkentdan Samarqandgacha mashinada 300 kilometrni 4 soatda bosib oʻtdingiz. Oʻrtacha tezlik — soatiga 75 kilometr. Lekin yoʻlda spidometr goh 40 ni, goh 110 ni koʻrsatdi. Demak, «oʻrtacha tezlik» va «aynan shu ondagi tezlik» — har xil narsalar. Bugun ularni farqlashni oʻrganamiz.",
      easy: "Butun yoʻlni yurgan vaqtga boʻlsak, oʻrtacha tezlik chiqadi — 75. Ammo mashina doim 75 da yurmagan: goh sekin, goh tez. Har bir ondagi tezlik oʻzgarib turadi.",
      draw: [
        { t: 'title', text: "Oʻrtacha va oniy tezlik" },
        { t: 'icon', x: 12, y: 28, emoji: '🚗', size: 'l' },
        { t: 'text', x: 24, y: 23, text: "Toshkent → Samarqand: 300 km, 4 soat", size: 's' },
        { t: 'formula', x: 26, y: 36, text: "300 : 4 = 75 km/soat" },
        { t: 'box', id: 'sp', x: 24, y: 45, w: 48, h: 11, text: "Spidometr: 40 → 90 → 110 → 60", color: 'orange' },
        { t: 'text', x: 75, y: 52, text: "oʻrtacha ≠ oniy", size: 's', color: 'red' }
      ],
      next: "Qanday topiladi?"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi umumiy holat. x miqdor a dan b gacha oʻzgardi. Bu oʻzgarish argument orttirmasi deyiladi va «delta x» deb belgilanadi: b minus a. Shu vaqtda funksiyaning qiymati ham oʻzgaradi. Bu funksiya orttirmasi, «delta y»: oxirgi qiymat minus boshlangʻich qiymat. Delta y ni delta x ga boʻlsak, funksiyaning oʻrtacha oʻzgarish tezligi chiqadi.",
      easy: "Delta — «qanchaga oʻzgardi» degani. Delta x — x qanchaga oʻzgardi, delta y — funksiya qanchaga oʻzgardi. Ikkalasini boʻlsak, «x bir birlikka oʻzgarganda funksiya oʻrtacha qanchaga oʻzgaradi» degan javob chiqadi.",
      draw: [
        { t: 'title', text: 'Orttirmalar' },
        { t: 'text', x: 6, y: 20, text: "x miqdor a dan b gacha oʻzgardi:" },
        { t: 'formula', x: 8, y: 32, text: 'Δx = b − a' },
        { t: 'text', x: 40, y: 32, text: 'argument orttirmasi', size: 's', color: 'blue' },
        { t: 'formula', x: 8, y: 45, text: 'Δy = f(b) − f(a)' },
        { t: 'text', x: 50, y: 45, text: 'funksiya orttirmasi', size: 's', color: 'blue' },
        { t: 'box', id: 'avg', x: 6, y: 53, w: 72, h: 12, text: "Oʻrtacha oʻzgarish tezligi = Δy / Δx", color: 'green' }
      ],
      next: "Misol koʻrsating"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Kungaboqarning boʻyini har hafta oʻlchadik. Birinchi haftadan uchinchi haftagacha u 13 santimetrdan 25 santimetrgacha oʻsdi: 2 haftada 12 santimetr, yaʼni haftasiga oʻrtacha 6 santimetr. Toʻrtinchi haftadan oltinchi haftagacha esa 34 dan 61 gacha: haftasiga 13 yarim santimetr. Oraliq boshqa — oʻrtacha tezlik ham boshqa.",
      easy: "Kungaboqar boshida sekin, keyin tez oʻsadi. Shuning uchun qaysi haftalarni olsak, oʻrtacha oʻsish ham shunga qarab oʻzgaradi: avval haftasiga 6, keyin 13 yarim santimetr.",
      draw: [
        { t: 'title', text: "Kungaboqar boʻyi" },
        { t: 'axes', id: 'k', x: 7, y: 13, w: 52, h: 46, xmin: 0, xmax: 6, ymin: 0, ymax: 70, xlabel: 'hafta', ylabel: 'sm' },
        { t: 'curve', axes: 'k', points: [[0, 10], [1, 13], [2, 18], [3, 25], [4, 34], [5, 46], [6, 61]], color: 'green' },
        { t: 'dot', axes: 'k', id: 'A', x: 1, y: 13, color: 'blue' },
        { t: 'dot', axes: 'k', id: 'B', x: 3, y: 25, color: 'blue' },
        { t: 'dot', axes: 'k', id: 'C', x: 4, y: 34, color: 'orange' },
        { t: 'dot', axes: 'k', id: 'D', x: 6, y: 61, color: 'orange' },
        { t: 'line', from: 'A', to: 'B', color: 'blue' },
        { t: 'line', from: 'C', to: 'D', color: 'orange' },
        { t: 'text', x: 64, y: 24, text: '1–3 hafta:', size: 's', color: 'blue' },
        { t: 'text', x: 64, y: 30, text: '(25 − 13) : 2 = 6', size: 's' },
        { t: 'text', x: 64, y: 42, text: '4–6 hafta:', size: 's', color: 'orange' },
        { t: 'text', x: 64, y: 48, text: '(61 − 34) : 2 = 13,5', size: 's' }
      ],
      next: "Aha!"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Koʻpincha b ni a plyus h deb yozishadi, bunda h — argument orttirmasi. Unda oʻrtacha tezlik shunday yoziladi: f(a plyus h) minus f(a), boʻlingan h ga. Bu kasr ayirmali nisbat deyiladi, uning surati esa funksiya orttirmasi. Masalan, f(x) teng x kvadrat, a teng 1, h teng 2 boʻlsa: 9 minus 1, boʻlingan 2 ga — 4.",
      easy: "h — x qancha qadam tashlaganini bildiradi. a dan boshlab h qadam yurdik — a plyus h ga keldik. Funksiya qanchaga oʻzgarganini topib, uni h ga boʻlamiz. Hammasi shu.",
      draw: [
        { t: 'title', text: 'h orqali yozamiz' },
        { t: 'formula', x: 8, y: 21, text: 'b = a + h' },
        { t: 'text', x: 38, y: 21, text: 'h — argument orttirmasi', size: 's', color: 'blue' },
        { t: 'formula', x: 8, y: 35, text: '(f(a + h) − f(a)) / h' },
        { t: 'box', id: 'ad', x: 6, y: 42, w: 52, h: 9, text: 'Bu kasr — ayirmali nisbat', color: 'purple' },
        { t: 'text', x: 6, y: 59, text: 'Misol: f(x) = x², a = 1, h = 2', size: 's' },
        { t: 'text', x: 6, y: 65, text: '(f(3) − f(1)) / 2 = (9 − 1) / 2 = 4', size: 's', color: 'green' }
      ],
      next: "Tushunarli"
    },
    {
      kind: 'explain',
      clear: true,
      say: "Endi y teng x kvadrat grafigida F nuqtani qoʻzgʻalmas qilib olamiz va undan M nuqtaga toʻgʻri chiziq oʻtkazamiz. Bunday chiziq kesuvchi deyiladi, uning burchak koeffitsiyenti — oʻsha ayirmali nisbat. M nuqtani F ga yaqinlashtiramiz: koeffitsiyent 4, keyin 3, keyin 2 yarim, keyin 2,1. Sonlar 2 ga yaqinlashib boryapti!",
      easy: "Kesuvchi — grafikni ikki nuqtada kesib oʻtuvchi chiziq. M ni F tomon surgan sari chiziq tobora yotiqlashadi va uning qiyaligi 2 ga yaqinlashadi.",
      draw: [
        { t: 'title', text: 'Kesuvchidan urinmaga' },
        { t: 'axes', id: 'p', x: 6, y: 13, w: 50, h: 52, xmin: -1, xmax: 3.5, ymin: -1, ymax: 10, xlabel: 'x', ylabel: 'y' },
        { t: 'curve', axes: 'p', points: X2, color: 'red' },
        { t: 'dot', axes: 'p', id: 'F', x: 1, y: 1, color: 'ink' },
        { t: 'text', x: 21, y: 59, text: 'F', size: 's' },
        { t: 'dot', axes: 'p', id: 'M1', x: 3, y: 9, label: 'M', color: 'blue' },
        { t: 'line', from: 'F', to: 'M1', color: 'blue' },
        { t: 'dot', axes: 'p', id: 'M2', x: 2, y: 4, color: 'purple' },
        { t: 'line', from: 'F', to: 'M2', color: 'purple' },
        { t: 'dot', axes: 'p', id: 'M3', x: 1.5, y: 2.25, color: 'orange' },
        { t: 'line', from: 'F', to: 'M3', color: 'orange' },
        {
          t: 'table',
          x: 62,
          y: 16,
          rows: [
            ['M nuqta', 'burchak k.'],
            ['x = 3', '4'],
            ['x = 2', '3'],
            ['x = 1,5', '2,5'],
            ['x = 1,1', '2,1']
          ]
        },
        { t: 'text', x: 62, y: 53, text: 'M → F: 4; 3; 2,5; 2,1 …', size: 's', color: 'purple' }
      ],
      next: "2 ga yaqinlashyapti!"
    },
    {
      kind: 'explain',
      say: "M nuqta F ga cheksiz yaqinlashganda kesuvchi bitta aniq toʻgʻri chiziqqa intiladi. Bu chiziq F nuqtadagi urinma deyiladi. Uning burchak koeffitsiyenti 2 ga teng — bu funksiyaning aynan F nuqtadagi, yaʼni «oniy» oʻzgarish tezligi. Spidometr koʻrsatadigan tezlik ham xuddi shunday.",
      easy: "Urinma — grafikka bitta nuqtada «tegib oʻtadigan» chiziq. Kesuvchining ikkinchi uchi birinchisiga yopishib qolsa, u urinmaga aylanadi. Urinmaning qiyaligi — shu nuqtadagi tezlik.",
      draw: [
        { t: 'curve', axes: 'p', points: [[-0.5, -2], [3.5, 6]], color: 'green' },
        { t: 'box', id: 'u', x: 60, y: 57, w: 38, h: 11, text: 'Urinma: M → F da kesuvchi intiladigan chiziq', color: 'green' }
      ],
      next: "Ajoyib!"
    },
    {
      kind: 'example',
      clear: true,
      say: "Birga yechamiz. f(x) teng x kvadrat minus 2x, a teng 3, h teng 1. Avval f(4) ni topamiz: 16 minus 8, yaʼni 8. Keyin f(3): 9 minus 6, yaʼni 3. Funksiya orttirmasi: 8 minus 3, yaʼni 5. Uni h ga, yaʼni 1 ga boʻlamiz: oʻrtacha tezlik 5 ga teng.",
      easy: "Ikki marta funksiya qiymatini hisoblaymiz: x teng 4 da 8, x teng 3 da 3. Farqi 5. Qadam h teng 1 boʻlgani uchun javob ham 5.",
      draw: [
        { t: 'title', text: 'Misol' },
        { t: 'formula', x: 8, y: 21, text: 'f(x) = x² − 2x,   a = 3,   h = 1' },
        { t: 'list', x: 6, y: 33, items: ['f(a + h) = f(4) = 16 − 8 = 8', 'f(a) = f(3) = 9 − 6 = 3', 'Δy = 8 − 3 = 5', 'Δy / h = 5 / 1 = 5'] }
      ],
      next: "Oson ekan!"
    }
  ],
  summary: [
    "Argument orttirmasi: Δx = b − a (koʻpincha h deb belgilanadi).",
    "Funksiya orttirmasi: Δy = f(b) − f(a) = f(a + h) − f(a).",
    "Oʻrtacha oʻzgarish tezligi = Δy / Δx. Bu kasr ayirmali nisbat deyiladi va kesuvchining burchak koeffitsiyentiga teng.",
    "M nuqta F ga yaqinlashgan sari FM kesuvchi F nuqtadagi urinmaga intiladi; urinmaning qiyaligi — oniy oʻzgarish tezligi."
  ],
  questions: [
    {
      id: 'm2q1',
      prompt: "f(x) = x². x 1 dan 4 gacha oʻzgarganda funksiyaning oʻrtacha oʻzgarish tezligini toping.",
      hint: "(f(4) − f(1)) / (4 − 1)",
      explanation: "(16 − 1) / 3 = 15 / 3 = 5.",
      widget: { type: 'number_answer', props: { answer: 5 } }
    },
    {
      id: 'm2q2',
      prompt: "f(x) = 3x + 2. x 2 dan 7 gacha oʻzgarganda funksiya orttirmasi Δy nimaga teng?",
      hint: "f(7) va f(2) ni hisoblab, ayiring.",
      explanation: "f(7) = 23, f(2) = 8, Δy = 23 − 8 = 15.",
      widget: { type: 'number_answer', props: { answer: 15, prefix: 'Δy =' } }
    },
    {
      id: 'm2q3',
      prompt: "f(x) = x² uchun funksiya orttirmasini a va h orqali yozing: f(a + h) − f(a) = ?",
      hint: "(a + h)² = a² + 2ah + h². Endi a² ni ayiring.",
      explanation: "(a + h)² − a² = 2ah + h².",
      widget: { type: 'expression_answer', props: { answer: '2*a*h + h^2', vars: ['a', 'h'], prefix: 'Δy =', keys: ['a', 'h', '²', '(', ')', '+', '−', '·'] } }
    },
    {
      id: 'm2q4',
      prompt: "Oʻsimlikda 4 haftada barglar soni 15 tadan 39 taga yetdi. Haftasiga oʻrtacha nechta barg qoʻshilgan?",
      hint: "Barglar orttirmasini haftalar soniga boʻling.",
      explanation: "(39 − 15) : 4 = 24 : 4 = 6 ta barg haftasiga.",
      widget: { type: 'number_answer', props: { answer: 6, unit: 'ta' } }
    },
    {
      id: 'm2q5',
      prompt: "Har bir belgini uning maʼnosi bilan juftlang.",
      hint: "Δ — «orttirma» degani.",
      explanation: "Δx = b − a, Δy = f(b) − f(a), oʻrtacha tezlik = Δy / Δx, ayirmali nisbat = (f(a + h) − f(a)) / h.",
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Δx', right: 'b − a' },
            { left: 'Δy', right: 'f(b) − f(a)' },
            { left: 'Oʻrtacha tezlik', right: 'Δy / Δx' },
            { left: 'Ayirmali nisbat', right: '(f(a+h) − f(a)) / h' }
          ]
        }
      }
    },
    {
      id: 'm2q6',
      prompt: "Gapni toʻldiring.",
      hint: "Ikki nuqtadan oʻtuvchi chiziqning nomini eslang.",
      explanation: "M nuqta F ga yaqinlashgan sari FM kesuvchi urinmaga intiladi.",
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'M nuqta F ga yaqinlashgan sari FM ' }, { blank: 'kesuvchi' }, { text: ' toʻgʻri chiziq F nuqtadagi ' }, { blank: 'urinma' }, { text: 'ga intiladi.' }],
          bank: ['kesuvchi', 'urinma', 'radius', 'diametr']
        }
      }
    },
    {
      id: 'm2q7',
      prompt: "Grafikda F(1; 1) nuqtadan uchta kesuvchi chizilgan. Burchak koeffitsiyenti eng katta boʻlgan kesuvchining ikkinchi uchini bosing.",
      hint: "Qaysi chiziq eng tik koʻtariladi?",
      explanation: "F(1; 1) va (3; 9) orqali: (9 − 1) / (3 − 1) = 4 — bu eng katta qiyalik.",
      widget: {
        type: 'graph_tap',
        props: {
          target: [3, 9],
          radius: 0.9,
          graph: {
            xmin: -1.5,
            xmax: 3.5,
            ymin: -1,
            ymax: 10,
            xlabel: 'x',
            ylabel: 'y',
            curves: [
              { points: X2 },
              { points: [[1, 1], [3, 9]], color: '#2563eb' },
              { points: [[1, 1], [2, 4]], color: '#7c3aed' },
              { points: [[-1, 1], [1, 1]], color: '#ea580c' }
            ],
            dots: [[1, 1], [3, 9], [2, 4], [-1, 1]]
          }
        }
      }
    },
    {
      id: 'm2q8',
      prompt: "f(x) = x² grafigida F(2; 4) nuqta olingan, M nuqtaning abssissasi x = 2,1. FM kesuvchining burchak koeffitsiyentini toping.",
      hint: "f(2,1) = 4,41. Endi (4,41 − 4) / (2,1 − 2).",
      explanation: "(4,41 − 4) / 0,1 = 0,41 / 0,1 = 4,1. M yaqinlashgan sari bu son 4 ga intiladi.",
      widget: { type: 'number_answer', props: { answer: 4.1, tolerance: 0.001 } }
    },
    {
      id: 'm2q9',
      prompt: "Har bir gap toʻgʻrimi yoki notoʻgʻrimi?",
      hint: "Chiziqli va chiziqsiz funksiyalarni solishtiring.",
      explanation: "Chiziqli funksiyada oʻrtacha tezlik oʻzgarmaydi; chiziqsizda oraliqqa bogʻliq. Funksiya kamaysa, Δy manfiy boʻladi.",
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: "Chiziqli funksiyada oʻrtacha oʻzgarish tezligi har qanday oraliqda bir xil.", value: true },
            { text: "y = x² funksiyada oʻrtacha tezlik oraliqqa bogʻliq emas.", value: false },
            { text: "Funksiya orttirmasi Δy manfiy boʻlishi mumkin.", value: true },
            { text: "h = b − a — argument orttirmasi.", value: true }
          ]
        }
      }
    },
    {
      id: 'm2q10',
      prompt: "Ayirmali nisbatni hisoblash bosqichlarini toʻgʻri tartibda bosing.",
      hint: "Avval ikkita funksiya qiymatini toping.",
      explanation: "f(a + h) → f(a) → ularning ayirmasi (Δy) → h ga boʻlish.",
      widget: {
        type: 'step_order',
        props: {
          steps: [
            'f(a + h) ni hisoblang',
            'f(a) ni hisoblang',
            'Funksiya orttirmasini toping: f(a + h) − f(a)',
            'Natijani h ga boʻling'
          ]
        }
      }
    }
  ]
};
