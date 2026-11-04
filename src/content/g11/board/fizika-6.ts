import type { BoardLesson } from './types';
import { BOB1 } from './fizika-1';
import { fieldMarks, vec } from './phys';

/** Darslik: Fizika 11, 6-mavzu (17–19-betlar) — bir jinsli magnit maydonda zaryadli zarraning harakati, Lorens kuchi. */
export const FIZ_6: BoardLesson = {
  n: 6,
  label: '6',
  group: BOB1,
  title: 'Magnit maydonda zaryadli zarra. Lorens kuchi',
  section: '6-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Shimoliy mamlakatlarda tunda osmonda yashil-binafsha nurlar jilvalanadi — qutb yogʻdusi. Quyoshdan kelgan zaryadli zarralarni Yerning magnit maydoni burib, qutblar tomon yoʻnaltiradi, ular havoni nurlantiradi. Magnit maydon harakatdagi zaryadga qanday kuch bilan taʼsir qiladi? Bu kuch Lorens kuchi deyiladi.",
      easy: "Yerning magnit maydoni Quyosh zarralarini buradi — qutb yogʻdusi. Bu Lorens kuchi.",
      draw: [
        { t: 'title', text: 'Qutb yogʻdusi' },
        { t: 'icon', x: 16, y: 34, emoji: '🌌', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🌍', size: 'l' },
        { t: 'list', x: 32, y: 28, items: ['Quyoshdan zaryadli zarralar', 'Yer maydoni ularni buradi', 'qutblarda havo nurlanadi'] }
      ],
      next: 'Lorens kuchi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Amper kuchi aslida oʻtkazgichdagi har bir harakatlanayotgan zaryadga taʼsir qiluvchi kuchlarning yigʻindisi. Uni zarralar soniga boʻlsak, bitta zarraga taʼsir qiluvchi kuch chiqadi: F teng q karra v karra B karra sinus alfa. Bu yerda alfa — tezlik va induksiya vektorlari orasidagi burchak.",
      easy: "F = q · v · B · sin α — bitta zaryadga taʼsir qiluvchi kuch.",
      draw: [
        { t: 'title', text: 'Bitta zarraga kuch' },
        { t: 'formula', x: 6, y: 22, text: 'F = Fₐ / N = q · v · B · sin α' },
        { t: 'list', x: 6, y: 38, items: ['q — zarra zaryadi', 'v — tezligi', 'α — v va B orasidagi burchak'] }
      ],
      next: 'Yoʻnalishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yoʻnalishi chap qoʻl qoidasi bilan topiladi: induksiya chiziqlari kaftga kirsin, toʻrt barmoq musbat zaryad tezligi boʻylab yoʻnalsin — shunda bosh barmoq Lorens kuchini koʻrsatadi. Elektron uchun toʻrt barmoqni tezlikka qarama-qarshi qoʻyamiz. Zarra induksiya chiziqlari boʻylab uchsa, kuch nolga teng.",
      easy: "Chap qoʻl: B kaftga, 4 barmoq — musbat zaryad tezligi, bosh barmoq — kuch.",
      draw: [
        { t: 'title', text: 'Chap qoʻl qoidasi' },
        ...fieldMarks(26, 26, 3, 4, 8),
        { t: 'point', id: 'q', x: 14, y: 46, label: '+' },
        ...vec('v', 14, 46, 32, 46, 'red', 'v'),
        ...vec('F', 14, 46, 14, 30, 'green'),
        { t: 'text', x: 16, y: 33, text: 'F', color: 'green', size: 's' },
        { t: 'list', x: 52, y: 26, items: ['B — kaftga kiradi', '4 barmoq — v (q > 0)', 'bosh barmoq — F', 'v ∥ B → F = 0'] }
      ],
      next: 'Aylana boʻylab'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Zarra maydonga tik uchib kirsa, Lorens kuchi doim tezlikka tik boʻladi va markazga intilma kuch vazifasini bajaradi. Kuch ish bajarmaydi, shuning uchun tezlik kattaligi oʻzgarmaydi — zarra aylana chizadi. m v kvadrat boʻlinsin R teng q v B dan radius: R teng m v boʻlinsin q B.",
      easy: "Zarra aylana chizadi: R = m · v / (q · B).",
      draw: [
        { t: 'title', text: 'Aylana trayektoriya' },
        { t: 'ellipse', cx: 24, cy: 44, rx: 14, ry: 14, color: 'blue' },
        { t: 'point', id: 'o', x: 24, y: 44, label: 'O' },
        ...vec('v2', 24, 58, 37, 58, 'red'),
        { t: 'text', x: 39, y: 60, text: 'v', color: 'red', size: 's' },
        ...vec('F2', 24, 58, 24, 49, 'green'),
        { t: 'formula', x: 46, y: 26, text: 'm v² / R = q v B' },
        { t: 'formula', x: 46, y: 44, text: 'R = m v / (q B)' },
        { t: 'text', x: 46, y: 60, text: 'F ish bajarmaydi', color: 'green' }
      ],
      next: 'Aylanish davri'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Bir marta aylanish vaqti — davr: aylana uzunligi 2 pi R ni tezlikka boʻlamiz. R oʻrniga m v boʻlinsin q B ni qoʻysak, T teng 2 pi m boʻlinsin q B. Ajablanarlisi, davr tezlikka bogʻliq emas! Bu hodisadan mass-spektrometrda foydalaniladi: u zarralarni massasiga qarab ajratadi va izotoplarni aniqlaydi.",
      easy: "T = 2π · m / (q · B) — tezlikka bogʻliq emas. Mass-spektrometr.",
      draw: [
        { t: 'title', text: 'Aylanish davri' },
        { t: 'formula', x: 6, y: 22, text: 'T = 2π R / v = 2π m / (q B)' },
        { t: 'list', x: 6, y: 38, items: ['davr tezlikka bogʻliq emas', 'B oshsa — T kamayadi', 'mass-spektrometr: massa boʻyicha ajratish'] }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Elektron 12 millitesla maydonga tik uchib kirib, radiusi 4 santimetr aylana chizdi. Tezligi qancha? R teng m v boʻlinsin e B dan v teng e B R boʻlinsin m: 1,6 karra 10 ning minus 19 darajasi karra 0,012 karra 0,04, boʻlinsin 9,1 karra 10 ning minus 31 darajasi — taxminan 8,4 karra 10 ning 7 darajasi metr sekund.",
      easy: "v = e·B·R / m ≈ 8,4·10⁷ m/s.",
      draw: [
        { t: 'title', text: 'Elektron tezligi' },
        { t: 'list', x: 6, y: 20, items: ['B = 12 mT, R = 4 cm', 'e = 1,6 · 10⁻¹⁹ C', 'm = 9,1 · 10⁻³¹ kg'] },
        { t: 'formula', x: 6, y: 50, text: 'v = e B R / m ≈ 8,4 · 10⁷ m/s' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Lorens kuchi: F = q·v·B·sin α; yoʻnalishi chap qoʻl qoidasi bilan (elektron uchun teskari).',
    'Maydonga tik kirgan zarra aylana chizadi: R = m·v / (q·B); Lorens kuchi ish bajarmaydi.',
    'Aylanish davri T = 2π·m / (q·B) tezlikka bogʻliq emas; mass-spektrometr shunga asoslangan.'
  ],
  questions: [
    {
      id: 'f6q1',
      prompt: '4·10⁷ m/s tezlikdagi proton 5 T maydonga chiziqlarga 45° burchak ostida uchib kirdi. Lorens kuchi necha pN? (butun songacha)',
      hint: 'F = q v B sin α, q = 1,6·10⁻¹⁹ C.',
      explanation: '1,6·10⁻¹⁹ · 4·10⁷ · 5 · 0,707 ≈ 2,26·10⁻¹¹ N ≈ 22,6 pN.',
      widget: { type: 'number_answer', props: { answer: 22.6, tolerance: 0.4, unit: 'pN' } }
    },
    {
      id: 'f6q2',
      prompt: '0,3 T maydonga chiziqlarga tik 160 Mm/s tezlikda elektron uchib kirdi. Trayektoriya radiusi necha mm?',
      hint: 'R = m v / (e B).',
      explanation: '9,1·10⁻³¹ · 1,6·10⁸ / (1,6·10⁻¹⁹ · 0,3) ≈ 3·10⁻³ m = 3 mm.',
      widget: { type: 'number_answer', props: { answer: 3.03, tolerance: 0.06, unit: 'mm' } }
    },
    {
      id: 'f6q3',
      prompt: 'Maydonga tik kirgan elektronning aylanish davri 8 ns. Induksiya necha mT? (0,1 gacha)',
      hint: 'B = 2π m / (e T).',
      explanation: '2π · 9,1·10⁻³¹ / (1,6·10⁻¹⁹ · 8·10⁻⁹) ≈ 4,5·10⁻³ T.',
      widget: { type: 'number_answer', props: { answer: 4.47, tolerance: 0.06, unit: 'mT' } }
    },
    {
      id: 'f6q4',
      prompt: 'Proton 40 mT maydonga tik 2·10⁷ m/s tezlikda kirdi (mₚ = 1,67·10⁻²⁷ kg). Aylana radiusi necha cm? (0,1 gacha)',
      hint: 'R = m v / (q B).',
      explanation: '1,67·10⁻²⁷ · 2·10⁷ / (1,6·10⁻¹⁹ · 0,04) ≈ 0,052 m = 5,2 cm.',
      widget: { type: 'number_answer', props: { answer: 5.2, tolerance: 0.1, unit: 'cm' } }
    },
    {
      id: 'f6q5',
      prompt: 'Elektronning aylanish davri 20·10⁻¹² s. Induksiya necha T? (0,1 gacha)',
      hint: 'B = 2π m / (e T).',
      explanation: '2π · 9,1·10⁻³¹ / (1,6·10⁻¹⁹ · 2·10⁻¹¹) ≈ 1,8 T.',
      widget: { type: 'number_answer', props: { answer: 1.79, tolerance: 0.06, unit: 'T' } }
    },
    {
      id: 'f6q6',
      prompt: 'Zarra qanday yoʻnalishda uchib kirsa, unga Lorens kuchi taʼsir qilmaydi?',
      hint: 'sin 0° = 0.',
      explanation: 'Induksiya chiziqlari boʻylab harakatda α = 0°, kuch nol.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Chiziqlarga tik', 'Chiziqlarga 45° burchak ostida', 'Induksiya chiziqlari boʻylab', 'Har qanday yoʻnalishda taʼsir qiladi'], answerIndex: 2 } }
    },
    {
      id: 'f6q7',
      prompt: 'Lorens kuchi zarraning tezligini qanday oʻzgartiradi?',
      hint: 'Kuch doim tezlikka tik.',
      explanation: 'Kuch ish bajarmaydi: tezlik kattaligi oʻzgarmaydi, faqat yoʻnalishi oʻzgaradi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Tezligini oshiradi', 'Tezligini kamaytiradi', 'Faqat yoʻnalishini oʻzgartiradi', 'Zarrani toʻxtatadi'], answerIndex: 2 } }
    },
    {
      id: 'f6q8',
      prompt: 'Kattalikni formulasi bilan moslang.',
      hint: 'Davrda tezlik yoʻq.',
      explanation: 'F = qvB sin α; R = mv/(qB); T = 2πm/(qB).',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Lorens kuchi', right: 'q v B sin α' },
            { left: 'aylana radiusi', right: 'm v / (q B)' },
            { left: 'aylanish davri', right: '2π m / (q B)' }
          ]
        }
      }
    },
    {
      id: 'f6q9',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'R va T formulalarini solishtiring.',
      explanation: 'Elektron uchun 4 barmoq teskari qoʻyiladi; tezlik oshsa radius oshadi, davr oʻzgarmaydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Elektronga taʼsir qiluvchi kuchni topishda 4 barmoq tezlikka qarama-qarshi qoʻyiladi.', value: true },
            { text: 'Zarra tezligi oshsa, aylana radiusi ham oshadi.', value: true },
            { text: 'Zarra tezligi oshsa, aylanish davri kamayadi.', value: false },
            { text: 'Lorens kuchi markazga intilma kuch vazifasini bajaradi.', value: true }
          ]
        }
      }
    }
  ]
};
