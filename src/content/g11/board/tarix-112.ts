import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 12-mavzu (55–59-betlar) — Buyuk Britaniya: J. Meyjor, «yangi leyboristlar» va E. Bler, G. Braun, D. Kemeron, Shotlandiya va YI referendumlari. */
export const TARIX_112: BoardLesson = {
  n: 112,
  label: '12',
  group: JH2,
  title: '1991–2017-yillarda Buyuk Britaniya',
  section: 'Jahon tarixi, 12-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "1990-yilda bosh vazir boʻlgan konservator Jon Meyjor M. Tetcher yoʻlini davom ettirdi va 1992-yilgi saylovda gʻolib chiqdi, ammo 1990-yillar boshida iqtisodiy turgʻunlik va yuqori inflyatsiya partiyaning obroʻsini tushirdi. 1997-yil mayda yangi yetakchi va dasturga ega «yangi leyboristlar» gʻalaba qozondi, hukumatni yosh Entoni Bler boshqardi. Uning asosiy yoʻnalishi — konstitutsiyaviy islohot: 1999-yilda Shotlandiya va Uelsda milliy assambleyalar saylandi. Iqtisodiy oʻsish yuqori, ishsizlik va inflyatsiya past boʻldi. Tashqi siyosatda Britaniya AQSHning eng yaqin hamkori boʻldi, 2003-yilda Iroqqa qarshi koalitsiyada qatnashdi — bu jamiyatda keskin bahslarga sabab boʻldi.",
      easy: "Meyjor (1990) → Bler (1997): Shotlandiya va Uelsga muxtoriyat, AQSH bilan ittifoq, 2003 — Iroq.",
      draw: [
        { t: 'title', text: 'Bosh vazirlar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'bosh vazir', 'partiya'], ['1990', 'Jon Meyjor', 'konservator'], ['1997', 'Entoni Bler', 'leyborist'], ['2007', 'Gordon Braun', 'leyborist'], ['2010', 'Devid Kemeron', 'konservator'], ['2016', 'Tereza Mey', 'konservator']] }
      ],
      next: 'Referendumlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "2005-yilda Londonda terrorchilik hujumlari boʻldi. 2007-yilda Bler isteʼfoga chiqdi, bosh vazir Gordon Braun boʻldi; 2008-yilgi inqirozda u bank tizimini saqlab qolish choralarini koʻrdi. 2010-yilda konservatorlar gʻolib chiqdi va Devid Kemeron hukumati davlat xarajatlarini tejadi. 2014-yil sentabrda Shotlandiyada mustaqillik boʻyicha referendum boʻlib, 45 % aholi ajralish tarafdori boʻldi — Shotlandiya Britaniya tarkibida qoldi. 2016-yil iyundagi referendumda qatnashganlarning yarmidan koʻpi YIdan chiqishni yoqladi. Kemeron isteʼfoga chiqdi, bosh vazir Tereza Mey boʻldi.",
      easy: "2014 — Shotlandiya referendumi (45 % «ha»); 2016 — YIdan chiqish referendumi; Kemeron → Mey.",
      draw: [
        { t: 'title', text: 'Ikki referendum' },
        { t: 'bars', x: 6, y: 18, w: 50, h: 34, items: [{ label: 'Shotlandiya 2014', value: 45 }, { label: 'YI 2016', value: 52 }] },
        { t: 'text', x: 60, y: 26, text: '% — «ajralish»', size: 's' },
        { t: 'text', x: 60, y: 34, text: 'tarafdorlari', size: 's' },
        { t: 'text', x: 60, y: 46, text: '2016 → T. Mey', size: 's', color: 'blue' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    '1997-yilda «yangi leyboristlar» gʻolib chiqdi; E. Bler hukumati Shotlandiya va Uelsga muxtoriyat berdi, tashqi siyosatda AQSHning eng yaqin hamkori boʻldi (2003 — Iroq).',
    'G. Braun (2007) 2008-yilgi inqirozda banklarni qutqardi; 2010-yildan D. Kemeron boshchiligidagi konservatorlar xarajatlarni tejadi.',
    '2014-yilda Shotlandiya Britaniya tarkibida qolishni tanladi (45 % ajralish tarafdori); 2016-yilda koʻpchilik YIdan chiqishni yoqladi, bosh vazir T. Mey boʻldi.'
  ],
  questions: [
    {
      id: 'j12q1',
      prompt: 'Bosh vazirlarni tartib boʻyicha joylashtiring.',
      hint: 'Meyjor — 1990.',
      explanation: 'J. Meyjor → E. Bler → G. Braun → D. Kemeron → T. Mey.',
      widget: { type: 'order_line', props: { items: [{ label: 'Jon Meyjor' }, { label: 'Entoni Bler' }, { label: 'Gordon Braun' }, { label: 'Devid Kemeron' }, { label: 'Tereza Mey' }] } }
    },
    {
      id: 'j12q2',
      prompt: 'Bosh vazirni partiyasiga ajrating.',
      hint: 'Bler va Braun — leyboristlar.',
      explanation: 'Konservatorlar — Meyjor, Kemeron, Mey; leyboristlar — Bler, Braun.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'k', label: 'konservatorlar' }, { id: 'l', label: 'leyboristlar' }],
          items: [
            { emoji: '👔', label: 'Jon Meyjor', bin: 'k' },
            { emoji: '👔', label: 'Devid Kemeron', bin: 'k' },
            { emoji: '👔', label: 'Tereza Mey', bin: 'k' },
            { emoji: '🌹', label: 'Entoni Bler', bin: 'l' },
            { emoji: '🌹', label: 'Gordon Braun', bin: 'l' }
          ]
        }
      }
    },
    {
      id: 'j12q3',
      prompt: '2014-yilgi referendumda Shotlandiya aholisining necha foizi mustaqillik uchun ovoz bergan?',
      hint: 'Yarmidan kam.',
      explanation: '45 %.',
      widget: { type: 'number_answer', props: { answer: 45, unit: '%' } }
    },
    {
      id: 'j12q4',
      prompt: 'E. Bler hukumati konstitutsiyaviy islohotida nimalar koʻzda tutilgan?',
      hint: 'Hududlar va parlament.',
      explanation: 'Shotlandiya va Uelsga muxtoriyat, saylov qonunini isloh qilish, yuqori palatani qayta tashkil etish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Shotlandiya va Uelsga muxtoriyat', correct: true },
            { label: 'saylov qonunini isloh qilish', correct: true },
            { label: 'yuqori palatani qayta tashkil etish', correct: true },
            { label: 'monarxiyani bekor qilish' }
          ]
        }
      }
    },
    {
      id: 'j12q5',
      prompt: 'Sanani voqea bilan juftlang.',
      hint: '2003 — Iroq.',
      explanation: '1997 — leyboristlar gʻalabasi; 2003 — Iroqqa qarshi koalitsiya; 2016 — YI referendumi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: '1997', right: 'leyboristlar gʻalabasi' },
            { left: '2003', right: 'Iroqqa qarshi koalitsiya' },
            { left: '2016', right: 'YI boʻyicha referendum' }
          ]
        }
      }
    },
    {
      id: 'j12q6',
      prompt: '2008-yilgi jahon moliyaviy inqirozida banklarni qutqarish choralari bilan obroʻ qozongan bosh vazir kim?',
      hint: 'Blerdan keyingi bosh vazir.',
      explanation: 'Gordon Braun.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Jon Meyjor', 'Gordon Braun', 'Tereza Mey', 'Devid Kemeron'], answerIndex: 1 } }
    },
    {
      id: 'j12q7',
      prompt: '2016-yilgi referendumdan keyin D. Kemeron nima qildi?',
      hint: 'Uning oʻrnini T. Mey egalladi.',
      explanation: 'Isteʼfoga chiqdi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qayta saylandi', 'isteʼfoga chiqdi', 'yangi referendum eʼlon qildi', 'leyboristlarga oʻtdi'], answerIndex: 1 } }
    },
    {
      id: 'j12q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '1999 — milliy assambleyalar.',
      explanation: '1999-yilda Shotlandiya va Uels assambleyalariga saylovlar boʻlgan; Britaniyaning Iroq urushida qatnashishi jamiyatda bahs-munozaraga sabab boʻlgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '1999-yilda Shotlandiya va Uels milliy assambleyalariga saylovlar boʻlgan.', value: true },
            { text: 'Iroqqa qarshi koalitsiyada qatnashish Britaniyada keskin bahslarga sabab boʻlgan.', value: true },
            { text: '2014-yilgi referendumdan keyin Shotlandiya mustaqil boʻlgan.', value: false },
            { text: 'E. Bler konservatorlar partiyasi yetakchisi boʻlgan.', value: false }
          ]
        }
      }
    }
  ]
};
