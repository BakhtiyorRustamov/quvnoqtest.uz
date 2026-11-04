import type { BoardLesson } from './types';
import { QQ_G3 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 14–15, 60–64-betler — Stilistikalıq figuralar. */
export const QQ_15: BoardLesson = {
  n: 15,
  label: '15',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G3,
  title: 'Stilistikalıq figuralar',
  section: '§ 14 — 15. Inversiya, aposiopeza, anafora, epifora, parallelizm, ritorikalıq qaratpa hám soraw, antiteza',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Stilistikalıq figuralar — ayrıqsha qurılǵan sintaksislik dizbekler yamasa gápler. Inversiya — gáp aǵzalarınıń orın tártibin ózgertiw. Aposiopeza, grekshe «jasırınıw» — gáptiń úzilip, tamamlanbay qalıwı. Anafora — gáp yamasa qatar basında birdey sózlerdiń qaytalanıwı: «Alpamıs»ta «Kimińdi qul demeyin, Kimińdi tul demeyin». Epifora — qatar sońında qaytalanıw: Sıpıra jırawda «Bay balası bayǵa usar, Biy balası biyge usar». Parallelizm — qońsılas gáplerdiń sintaksislik uqsaslıǵı.',
      easy: 'Anafora — basında qaytalanıw, epifora — sońında qaytalanıw, inversiya — sóz tártibin ózgertiw, aposiopeza — gápti úzip qoyıw.',
      draw: [
        { t: 'title', text: 'Stilistikalıq figuralar' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['figura', 'belgisi'],
            ['inversiya', 'sóz tártibi ózgeredi'],
            ['aposiopeza', 'gáp úzilip qaladı…'],
            ['anafora', 'basında qaytalanıw'],
            ['epifora', 'sońında qaytalanıw'],
            ['parallelizm', 'gáplerdiń uqsas dúzilisi']
          ]
        }
      ],
      next: 'Ritorikalıq figuralar, antiteza'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Ritorikalıq qaratpa — adamǵa yamasa zatqa qarata aytılıp, avtordıń qatnasın bildiredi. Ritorikalıq soraw — juwap alıw ushın emes, dıqqattı awdarıw ushın qoyılatuǵın soraw: «Alpamıs»ta «Qulınım ba ediń sen?!». Antiteza — qarama-qarsı túsiniklerdi salıstırıw: «Aydıń on besi jarıq, on besi qarańǵı», «Arqannıń uzını jaqsı, sózdiń qısqası jaqsı». Qaraqalpaq tilinde kelbetlik antitezalar eń kóp: «Ashshı menen dushshını tatqan biler». Feyilden: «Aqıllı jigit el qorǵaydı, Aqmaq jigit el qorlaydı».',
      easy: 'Ritorikalıq soraw — juwapsız soraw. Antiteza — qarama-qarsılıqtı salıstırıw: «Arqannıń uzını jaqsı, sózdiń qısqası jaqsı».',
      draw: [
        { t: 'title', text: 'Antiteza' },
        { t: 'text', x: 4, y: 16, text: 'Aydıń on besi jarıq, on besi qarańǵı.', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 24, text: 'Arqannıń uzını jaqsı, sózdiń qısqası jaqsı.', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 32, text: 'Aqıllı jigit el qorǵaydı,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 38, text: 'Aqmaq jigit el qorlaydı.', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 48, text: 'Ritorikalıq soraw: «Qulınım ba ediń sen?!»', size: 's', color: 'orange' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Stilistikalıq figuralar — ayrıqsha qurılǵan sintaksislik dizbekler hám gápler.',
    'Inversiya — orın tártibin ózgertiw; aposiopeza — úzilis; anafora — basında, epifora — sońında qaytalanıw; parallelizm — uqsas dúzilis.',
    'Ritorikalıq qaratpa hám soraw dıqqattı awdaradı; antiteza qarama-qarsı túsiniklerdi salıstıradı.'
  ],
  questions: [
    {
      id: 'kq15q1',
      prompt: 'Figuranı belgisi menen sáykeslendiriń.',
      hint: 'Epifora — sońında.',
      explanation: 'anafora — basında qaytalanıw; epifora — sońında qaytalanıw; inversiya — sóz tártibin ózgertiw; aposiopeza — gáptiń úzilip qalıwı.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'anafora' }, right: { label: 'basında qaytalanıw' } },
            { left: { label: 'epifora' }, right: { label: 'sońında qaytalanıw' } },
            { left: { label: 'inversiya' }, right: { label: 'sóz tártibin ózgertiw' } },
            { left: { label: 'aposiopeza' }, right: { label: 'gáptiń úzilip qalıwı' } }
          ]
        }
      }
    },
    {
      id: 'kq15q2',
      prompt: '«Bay balası bayǵa usar, Biy balası biyge usar, Xan balası xanǵa usar» — qaysı figura?',
      hint: '«usar» sózi qatar sońında qaytalanadı.',
      explanation: 'Epifora.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['epifora', 'anafora', 'antiteza', 'aposiopeza'], answerIndex: 0 } }
    },
    {
      id: 'kq15q3',
      prompt: '«Kimińdi qul demeyin, Kimińdi tul demeyin, Kimińdi xan demeyin» — qaysı figura?',
      hint: 'Qatar basında «Kimińdi» qaytalanadı.',
      explanation: 'Anafora (sońında «demeyin» de qaytalanadı, biraq bas belgisi — qatar basındaǵı qaytalanıw).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['anafora', 'litota', 'inversiya', 'perifraz'], answerIndex: 0 } }
    },
    {
      id: 'kq15q4',
      prompt: 'Antitezanı tolıqtırıń.',
      hint: 'Uzını — qısqası.',
      explanation: '«Arqannıń uzını jaqsı, sózdiń qısqası jaqsı».',
      widget: { type: 'text_answer', props: { before: 'Arqannıń uzını jaqsı, sózdiń', after: 'jaqsı.', answer: 'qısqası', width: 8 } }
    },
    {
      id: 'kq15q5',
      prompt: 'Juwap alıw ushın emes, dıqqattı awdarıw ushın qoyılatuǵın soraw qalay ataladı?',
      hint: 'Ritorikalıq …',
      explanation: 'Ritorikalıq soraw.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ritorikalıq soraw', 'ritorikalıq qaratpa', 'parallelizm', 'gradaciya'], answerIndex: 0 } }
    },
    {
      id: 'kq15q6',
      prompt: 'Antiteza túrlerin sóz shaqabı boyınsha ajıratıń.',
      hint: 'Ashshı, dushshı — kelbetlik.',
      explanation: 'Kelbetlik: ashshı — dushshı, alıs — jaqın; feyil: qorǵaydı — qorlaydı.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'k', label: 'kelbetlikten' }, { id: 'f', label: 'feyilden' }],
          tiles: [
            { id: 'a', label: 'ashshı — dushshı', bin: 'k' },
            { id: 'b', label: 'alıs — jaqın', bin: 'k' },
            { id: 'c', label: 'qorǵaydı — qorlaydı', bin: 'f' }
          ]
        }
      }
    },
    {
      id: 'kq15q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Aposiopeza grekshe «jasırınıw».',
      explanation: 'Aposiopeza — grekshe «jasırınıw»; qaraqalpaq tilinde kelbetlik antitezalar eń kóp; parallelizm poeziyada jiyi ushırasadı.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Aposiopeza» grekshe «jasırınıw» degendi bildiredi.', value: true },
            { text: 'Qaraqalpaq tilinde kelbetlik antitezalar eń kóp qollanıladı.', value: true },
            { text: 'Parallelizm tek ilimiy tekstlerde ushırasadı.', value: false },
            { text: 'Ritorikalıq sorawǵa hámme waqıt juwap kútiledi.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq15q8',
      prompt: 'Stilistikalıq figura bolmaytuǵınnı tabıń.',
      hint: 'Úshewi — figuralar.',
      explanation: 'Anafora, epifora, antiteza — figuralar; epitet — trop.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'anafora' }, { text: 'epifora' }, { text: 'antiteza' }, { text: 'epitet', odd: true }] } }
    }
  ]
};
