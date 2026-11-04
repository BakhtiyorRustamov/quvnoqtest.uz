import type { BoardLesson } from './types';
import { GEO7 } from './geografiya-23';

/** Darslik: Geografiya 10, 24-§ (101–107-betlar) — Lotin Amerikasi: tarkibi, relyefi, resurslari, aholisi va tillari, xoʻjalik ixtisoslashuvi, Panama kanali, subregionlari. */
export const GEO_24: BoardLesson = {
  n: 24,
  label: '24',
  group: GEO7,
  title: 'Lotin Amerikasi',
  section: '24-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Lotin Amerikasi — Amerika qitʼasidagi AQSH, Kanada va Grenlandiyadan tashqari barcha mamlakatlar. Aholisining koʻpchiligi lotin tilidan kelib chiqqan ispan va portugal tillarida soʻzlashgani uchun shunday ataladi. Bu yerda 33 ta mustaqil davlat bor. Gʻarbida Kordilyera va And togʻlari choʻzilgan — bu seysmik faol mintaqa. Resurslar boy: Venesuela va Meksikada neft, Braziliyada temir rudasi, Chili va Peruda mis, Boliviyada litiy va qalay, Kubada nikel. 2017-yilda bu yerda qariyb 650 mln kishi yashagan. Koʻp davlatlarda davlat tili — ispan tili, Braziliyada — portugal tili. Boliviya poytaxti La-Pas dunyodagi eng baland joylashgan poytaxtlardan biri.",
      easy: "Lotin Amerikasi: 33 davlat, ≈ 650 mln aholi; ispan va portugal tillari; And togʻlari; boy resurslar.",
      draw: [
        { t: 'title', text: 'Resurslar' },
        { t: 'table', x: 4, y: 18, rows: [['resurs', 'davlatlar'], ['neft', 'Venesuela, Meksika'], ['temir rudasi', 'Braziliya'], ['mis', 'Chili, Peru'], ['litiy, qalay', 'Boliviya'], ['nikel', 'Kuba']] }
      ],
      next: 'Xoʻjalik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Lotin Amerikasi xalqaro mehnat taqsimotida yoqilgʻi, konchilik, metallurgiya va qishloq xoʻjaligi bilan ishtirok etadi. Braziliya, Meksika va Argentinada mashinasozlik, ayniqsa avtomobilsozlik rivojlangan. Qishloq xoʻjaligida shakarqamish (Braziliya, Kuba), kofe (Braziliya — dunyoda yetakchi), banan (Ekvador, Kosta-Rika), soya va paxta yetishtiriladi. Argentina Pampasi — don va goʻsht chorvachiligi rayoni. Panama kanali Karib dengizini Tinch okeani bilan tutashtiradi. Lotin Amerikasi yetti subregionga boʻlinadi: Meksika, Markaziy Amerika, Vest-Indiya, And mamlakatlari, «Gviana uchburchagi», Braziliya va La-Plata mamlakatlari.",
      easy: "Xoʻjalik: neft, konchilik, avtomobilsozlik, kofe, banan, shakarqamish; Panama kanali; 7 subregion.",
      draw: [
        { t: 'title', text: 'Qishloq xoʻjaligi' },
        { t: 'table', x: 4, y: 18, rows: [['mahsulot', 'yetakchi davlatlar'], ['kofe', 'Braziliya, Kolumbiya'], ['banan', 'Ekvador, Kosta-Rika'], ['shakarqamish', 'Braziliya, Kuba'], ['don va goʻsht', 'Argentina (Pampa)']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Lotin Amerikasi — Amerikadagi AQSH, Kanada va Grenlandiyadan tashqari 33 ta mustaqil davlat; aholisi qariyb 650 mln, asosiy tillari ispan va portugal tillari.',
    'Mintaqa resurslarga boy: neft (Venesuela, Meksika), temir (Braziliya), mis (Chili, Peru), litiy va qalay (Boliviya); Kordilyera-And togʻlari seysmik faol.',
    'Xoʻjalikda konchilik, metallurgiya, avtomobilsozlik, kofe, banan, shakarqamish va don yetishtirish muhim; Panama kanali — eng serqatnov dengiz yoʻllaridan biri.'
  ],
  questions: [
    {
      id: 'g24q1',
      prompt: 'Davlatni uning boy resursi bilan juftlang.',
      hint: 'Chili — mis.',
      explanation: 'Venesuela — neft; Chili — mis; Boliviya — litiy va qalay; Kuba — nikel.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Venesuela', right: 'neft' },
            { left: 'Chili', right: 'mis' },
            { left: 'Boliviya', right: 'litiy va qalay' },
            { left: 'Kuba', right: 'nikel' }
          ]
        }
      }
    },
    {
      id: 'g24q2',
      prompt: 'Lotin Amerikasida nechta mustaqil davlat bor?',
      hint: 'Oʻttizdan koʻp.',
      explanation: '33 ta.',
      widget: { type: 'number_answer', props: { answer: 33, unit: 'ta' } }
    },
    {
      id: 'g24q3',
      prompt: 'Braziliyada davlat tili qaysi?',
      hint: 'Lotin Amerikasidagi istisno.',
      explanation: 'Portugal tili.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['portugal', 'ispan', 'ingliz', 'fransuz'], answerIndex: 0 } }
    },
    {
      id: 'g24q4',
      prompt: 'Mahsulotni yetakchi davlatga ajrating.',
      hint: 'Kofe — Braziliya.',
      explanation: 'Braziliya — kofe, temir rudasi; Argentina — bugʻdoy, goʻsht; Ekvador — banan, kakao.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'b', label: 'Braziliya' }, { id: 'a', label: 'Argentina' }, { id: 'e', label: 'Ekvador' }],
          items: [
            { emoji: '☕', label: 'kofe eksporti', bin: 'b' },
            { emoji: '⛏️', label: 'temir rudasi', bin: 'b' },
            { emoji: '🌾', label: 'Pampa bugʻdoyi', bin: 'a' },
            { emoji: '🥩', label: 'goʻsht eksporti', bin: 'a' },
            { emoji: '🍌', label: 'banan eksporti', bin: 'e' },
            { emoji: '🍫', label: 'kakao', bin: 'e' }
          ]
        }
      }
    },
    {
      id: 'g24q5',
      prompt: 'Panama kanali qaysi suvlarni tutashtiradi?',
      hint: 'Ikki okean havzasi.',
      explanation: 'Karib dengizi (Atlantika havzasi) va Tinch okeanini.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Karib dengizi va Tinch okeani', 'Oʻrta dengiz va Qizil dengiz', 'Qora dengiz va Kaspiy', 'Hind va Shimoliy Muz okeani'], answerIndex: 0 } }
    },
    {
      id: 'g24q6',
      prompt: 'Lotin Amerikasining subregionlarini tanlang.',
      hint: 'Yettita.',
      explanation: 'Meksika, Markaziy Amerika, Vest-Indiya, And mamlakatlari, «Gviana uchburchagi», Braziliya, La-Plata mamlakatlari.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'And mamlakatlari', correct: true },
            { label: 'Vest-Indiya', correct: true },
            { label: 'La-Plata mamlakatlari', correct: true },
            { label: '«Gviana uchburchagi»', correct: true },
            { label: 'Skandinaviya' }
          ]
        }
      }
    },
    {
      id: 'g24q7',
      prompt: 'Okeanga chiqish imkoniyati boʻlmagan Janubiy Amerika davlatlarini tanlang.',
      hint: 'Ikkita.',
      explanation: 'Boliviya va Paragvay.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Boliviya', correct: true },
            { label: 'Paragvay', correct: true },
            { label: 'Chili' },
            { label: 'Braziliya' }
          ]
        }
      }
    },
    {
      id: 'g24q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Favela — «soxta» urbanizatsiya.',
      explanation: 'Rio-de-Janeyro va San-Paulu favelalari «soxta» urbanizatsiya misoli; Lotin Amerikasining tub aholisi — amerikalik hindular.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Braziliyadagi favelalar «soxta» urbanizatsiyaning misoli.', value: true },
            { text: 'Lotin Amerikasining tub aholisi — amerikalik hindular.', value: true },
            { text: 'Lotin Amerikasida koʻp davlatlarning davlat tili — ingliz tili.', value: false },
            { text: 'And togʻlari seysmik jihatdan tinch hudud.', value: false }
          ]
        }
      }
    }
  ]
};
