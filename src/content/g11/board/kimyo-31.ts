import type { BoardLesson } from './types';
import { rect, seg, vec } from './phys';

export const BOB8 = { kicker: '8-bob', title: 'Elektroliz' };

/** Darslik: Umumiy kimyo 11, 31-mavzu (139–144-betlar) — elektroliz tushunchasi, katod va anod jarayonlari, suyuqlanma va suvli eritma elektrolizi, metallarning aktivlik qatori, elektroliz holatlari. */
export const KIM_31: BoardLesson = {
  n: 31,
  label: '31',
  group: BOB8,
  title: 'Elektroliz. Eritma va suyuqlanma elektrolizi',
  section: '31-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Mis(II) xlorid eritmasiga ikkita elektrod tushirib, oʻzgarmas tok manbayiga ulaymiz. Manfiy qutbga ulangan elektrod — katod, musbat qutbga ulangani — anod. Musbat Cu²⁺ ionlari katod tomon, manfiy Cl⁻ ionlari anod tomon harakatlanadi.",
      easy: "Katod (−) — kationlarni, anod (+) — anionlarni tortadi.",
      draw: [
        { t: 'title', text: 'Elektrolizyor' },
        ...seg('w1', 8, 30, 8, 64),
        ...seg('w2', 8, 64, 44, 64),
        ...seg('w3', 44, 64, 44, 30),
        ...seg('lv', 8, 36, 44, 36, 'blue', true),
        ...rect('ek', 13, 24, 3, 34, 'ink'),
        ...rect('ea', 36, 24, 3, 34, 'ink'),
        { t: 'text', x: 14.5, y: 21, text: 'katod (−)', size: 's', anchor: 'middle' },
        { t: 'text', x: 37.5, y: 21, text: 'anod (+)', size: 's', anchor: 'middle' },
        ...vec('a1', 30, 46, 20, 46, 'blue'),
        { t: 'text', x: 25, y: 43, text: 'Cu²⁺', size: 's', anchor: 'middle', color: 'blue' },
        ...vec('a2', 22, 56, 32, 56, 'green'),
        { t: 'text', x: 27, y: 53, text: 'Cl⁻', size: 's', anchor: 'middle', color: 'green' },
        { t: 'list', x: 50, y: 30, items: ['katod — qaytarilish', 'anod — oksidlanish'] }
      ],
      next: 'Elektrodlarda'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Katodda Cu²⁺ ionlari ikki elektron olib, mis atomlariga aylanadi — bu qaytarilish. Anodda xlorid ionlari elektron berib, xlor molekulasiga aylanadi — oksidlanish. Eritma yoki suyuqlanmada elektr toki taʼsirida boradigan oksidlanish-qaytarilish jarayoni — elektroliz.",
      easy: "Katod: Cu²⁺ + 2e⁻ → Cu; anod: 2Cl⁻ − 2e⁻ → Cl₂.",
      draw: [
        { t: 'title', text: 'Elektrodlarda' },
        { t: 'formula', x: 4, y: 24, text: 'K(−): Cu²⁺ + 2e⁻ → Cu' },
        { t: 'formula', x: 4, y: 36, text: 'A(+): 2Cl⁻ − 2e⁻ → Cl₂↑' },
        { t: 'formula', x: 4, y: 50, text: 'CuCl₂ → Cu + Cl₂↑' },
        { t: 'text', x: 4, y: 62, text: 'elektr energiyasi hisobiga kimyoviy reaksiya', size: 's', color: 'purple' }
      ],
      next: 'Suyuqlanma'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Elektroliz suyuqlanmada ham boradi. Osh tuzi 801 gradusda suyuqlanadi, ion panjarasi buziladi. Koʻmir elektrodlar tushirsak: katodda natriy, anodda xlor ajraladi. Suyuqlanmada suv yoʻq, shuning uchun faqat tuz ionlari zaryadsizlanadi.",
      easy: "NaCl suyuqlanmasi: katodda Na, anodda Cl₂.",
      draw: [
        { t: 'title', text: 'Suyuqlanma elektrolizi' },
        { t: 'icon', x: 12, y: 36, emoji: '🔥', size: 'l' },
        { t: 'formula', x: 26, y: 26, text: 'K(−): Na⁺ + e⁻ → Na' },
        { t: 'formula', x: 26, y: 38, text: 'A(+): 2Cl⁻ − 2e⁻ → Cl₂' },
        { t: 'formula', x: 4, y: 54, text: '2NaCl (suyuqlanma) → 2Na + Cl₂' }
      ],
      next: 'Katodda nima?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Suvli eritmada katodga metall kationlari bilan birga suvdan hosil boʻlgan H⁺ ham tortiladi. Nima ajralishini Beketovning aktivlik qatori aytadi. Litiydan alyuminiygacha aktiv metallar: katodda faqat vodorod. Alyuminiydan vodorodgacha oʻrtacha aktiv: metall va vodorod. Vodoroddan keyingi passiv metallar: faqat metall.",
      easy: "Aktiv (Li–Al) → H₂; oʻrtacha (Al–H) → Me + H₂; passiv (Cu, Ag…) → Me.",
      draw: [
        { t: 'title', text: 'Katodda nima ajraladi?' },
        { t: 'table', x: 4, y: 20, rows: [['metallar', 'misol', 'katodda'], ['aktiv', 'K, Na, Ca', 'H₂'], ['oʻrtacha', 'Zn, Fe, Ni', 'Me + H₂'], ['passiv', 'Cu, Ag, Au', 'Me']] }
      ],
      next: 'Anodda nima?'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Anodda nima ajralishi anionga bogʻliq. Kislorodli kislota qoldigʻi yoki ftorid ioni boʻlsa — suv oksidlanib, kislorod ajraladi. Kislorodsiz qoldiq boʻlsa — metallmas: xlorid ionidan xlor, bromiddan brom, yodiddan yod, sulfiddan oltingugurt. Natijada olti holat chiqadi.",
      easy: "Anod: SO₄²⁻, NO₃⁻, F⁻ → O₂; Cl⁻, Br⁻, I⁻, S²⁻ → metallmas.",
      draw: [
        { t: 'title', text: 'Olti holat' },
        { t: 'table', x: 4, y: 20, rows: [['metall', 'kislorodli qoldiq', 'kislorodsiz qoldiq'], ['aktiv', 'H₂ + O₂', 'H₂ + Cl₂ + ishqor'], ['oʻrtacha', 'Me, H₂ + O₂', 'Me, H₂ + Cl₂'], ['passiv', 'Me + O₂ + kislota', 'Me + Cl₂']] }
      ],
      next: 'Misollar'
    },
    {
      kind: 'example',
      clear: true,
      say: "K₂CO₃ eritmasida faqat suv parchalanadi — tuz konsentratsiyasi ortadi. KCl eritmasida katodda vodorod, anodda xlor, eritmada KOH hosil boʻladi. CuSO₄ eritmasida katodda mis, anodda kislorod, eritmada sulfat kislota qoladi. Elektroliz bilan alyuminiy, magniy, xlor olinadi, buyumlar nikellanadi.",
      easy: "K₂CO₃ — faqat suv; KCl → KOH; CuSO₄ → H₂SO₄.",
      draw: [
        { t: 'title', text: 'Eritmalar elektrolizi' },
        { t: 'formula', x: 4, y: 22, text: '2H₂O → 2H₂ + O₂  (K₂CO₃)' },
        { t: 'formula', x: 4, y: 34, text: '2KCl + 2H₂O → H₂ + Cl₂ + 2KOH' },
        { t: 'formula', x: 4, y: 46, text: '2CuSO₄ + 2H₂O → 2Cu + O₂ + 2H₂SO₄' },
        { t: 'text', x: 4, y: 60, text: 'Al, Mg, Cl₂ olish; nikellash', size: 's', color: 'purple' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Elektroliz — eritma yoki suyuqlanmada elektr toki taʼsiridagi oksidlanish-qaytarilish: katodda (−) qaytarilish, anodda (+) oksidlanish.',
    'Suvli eritmada katodda: aktiv metall — H₂, oʻrtacha aktiv — metall va H₂, passiv — metall.',
    'Anodda: kislorodli qoldiq va F⁻ — O₂; kislorodsiz qoldiq — metallmas (Cl₂, Br₂, I₂, S).'
  ],
  questions: [
    {
      id: 'k31q1',
      prompt: 'NaCl suyuqlanmasi elektrolizida katodda nima ajraladi?',
      hint: 'Suyuqlanmada suv yoʻq.',
      explanation: 'Natriy metali.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['H₂', 'Na', 'Cl₂', 'O₂'], answerIndex: 1 } }
    },
    {
      id: 'k31q2',
      prompt: 'NaCl eritmasi elektrolizida katodda nima ajraladi?',
      hint: 'Na — aktiv metall.',
      explanation: 'Vodorod; eritmada NaOH qoladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['H₂', 'Na', 'Cl₂', 'O₂'], answerIndex: 0 } }
    },
    {
      id: 'k31q3',
      prompt: 'Tuz eritmasini elektrolizda katodda ajraladigan moddaga qarab ajrating.',
      hint: 'Aktivlik qatori.',
      explanation: 'Faqat H₂: K₂SO₄, NaCl. Faqat metall: CuSO₄, AgNO₃. Metall va H₂: ZnSO₄, NiCl₂.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'h', label: 'Faqat H₂' },
            { id: 'mh', label: 'Metall + H₂' },
            { id: 'm', label: 'Faqat metall' }
          ],
          items: [
            { emoji: '', label: 'K₂SO₄', bin: 'h' },
            { emoji: '', label: 'NaCl', bin: 'h' },
            { emoji: '', label: 'ZnSO₄', bin: 'mh' },
            { emoji: '', label: 'NiCl₂', bin: 'mh' },
            { emoji: '', label: 'CuSO₄', bin: 'm' },
            { emoji: '', label: 'AgNO₃', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'k31q4',
      prompt: 'Eritmasi elektroliz qilinganda anodda kislorod ajraladigan tuzlarni belgilang.',
      hint: 'Kislorodli qoldiq va F⁻.',
      explanation: 'Na₂SO₄, Cu(NO₃)₂, NiF₂ — O₂; CuCl₂, KI — metallmas.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Na₂SO₄', correct: true },
            { label: 'Cu(NO₃)₂', correct: true },
            { label: 'NiF₂', correct: true },
            { label: 'CuCl₂' },
            { label: 'KI' }
          ]
        }
      }
    },
    {
      id: 'k31q5',
      prompt: 'KCl eritmasi elektrolizidan keyin eritmada qaysi modda qoladi?',
      hint: 'Katodda H₂, anodda Cl₂.',
      explanation: '2KCl + 2H₂O → H₂ + Cl₂ + 2KOH.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['HCl', 'KOH', 'K', 'KClO₃'], answerIndex: 1 } }
    },
    {
      id: 'k31q6',
      prompt: 'Elektrodni jarayon bilan juftlang.',
      hint: 'Katod — elektron beradi ionlarga.',
      explanation: 'Katod — manfiy, qaytarilish; anod — musbat, oksidlanish.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'katod' }, b: { label: 'qaytarilish' } },
            { a: { label: 'anod' }, b: { label: 'oksidlanish' } },
            { a: { label: 'Cu²⁺ + 2e⁻' }, b: { label: 'Cu' } },
            { a: { label: '2Cl⁻ − 2e⁻' }, b: { label: 'Cl₂' } }
          ]
        }
      }
    },
    {
      id: 'k31q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'K₂CO₃ — aktiv metall, kislorodli qoldiq.',
      explanation: 'K₂CO₃ eritmasida faqat suv parchalanadi; tuz konsentratsiyasi ortadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'K₂CO₃ eritmasi elektrolizida faqat ' }, { blank: 'suv' }, { text: ' parchalanadi, tuz konsentratsiyasi ' }, { blank: 'ortadi' }, { text: '.' }],
          bank: ['suv', 'ortadi', 'tuz', 'kamayadi']
        }
      }
    },
    {
      id: 'k31q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Nikellashda buyum — katod.',
      explanation: 'Nikellashda buyum katod, anod — nikel; CuSO₄ eritmasida kislota hosil boʻladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Buyumni nikellashda buyum katodga ulanadi.', value: true },
            { text: 'CuSO₄ eritmasi elektrolizida eritmada H₂SO₄ hosil boʻladi.', value: true },
            { text: 'Anodda qaytarilish jarayoni boradi.', value: false },
            { text: 'AgNO₃ eritmasi elektrolizida katodda vodorod ajraladi.', value: false }
          ]
        }
      }
    }
  ]
};
