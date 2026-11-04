import type { BoardLesson } from './types';
import { QQ_G3 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 14–15, 59–60-betler — Giperbola, litota, ironiya, allegoriya, gradaciya, janlandırıw, perifraz. */
export const QQ_14: BoardLesson = {
  n: 14,
  label: '14',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G3,
  title: 'Troplar: giperbola, ironiya…',
  section: '§ 14 — 15. Giperbola, litota, ironiya, allegoriya, gradaciya, janlandırıw, perifraz',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Giperbola — zattıń kúshin, kólemin asırıp kórsetiw. Xalıq qosıǵında: «Tuttım búrgeniń anasın, Tutqa bayladım tanasın, Qosqa jektim jup danasın». Litota — kerisinshe, júdá kishireytip kórsetiw: «qumırsqa bel qız». Ironiya — sózdi tuwra mánisine keri mánide qollanıw: «Qus patshası bolarlıqtay qus ǵo, Ǵarǵa». Allegoriya — abstrakt túsinikti konkret obraz arqalı kórsetiw: túlki — hiylekerlik, qasqır — ashkózlik. Berdaqta: «Baylar — qasqır, túlki, xalıq — qoyan eken».',
      easy: 'Giperbola — asırıw, litota — kishireytiw, ironiya — keri máni, allegoriya — haywan obrazı arqalı minez kórsetiw.',
      draw: [
        { t: 'title', text: 'Troplar 2' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['trop', 'mánisi'],
            ['giperbola', 'asırıp kórsetiw'],
            ['litota', 'kishireytip kórsetiw'],
            ['ironiya', 'keri mánide qollanıw'],
            ['allegoriya', 'túlki — hiyle, qasqır — ashkóz']
          ]
        }
      ],
      next: 'Janlandırıw, perifraz'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Gradaciya — birgelkili aǵzalardıń mánisiniń kem-kem kúsheyip yamasa páseyip beriliwi. Janlandırıw — jansız zatlarǵa adamǵa tán qásiyet beriw: «Alpamıs» dástanında Qarajan atına qarap «Ne kórdiń, qara at, ne kórdiń?» dep sóyleydi. Perifraz — zattıń atın tikkeley atamay, belgisi arqalı aytıw: «Sahra búlbili», «Sahradaǵı Luvr».',
      easy: 'Gradaciya — kem-kem kúsheytiw. Janlandırıw — jansızǵa jan beriw. Perifraz — atın emes, belgisin aytıw (Sahra búlbili).',
      draw: [
        { t: 'title', text: 'Taǵı úsh trop' },
        { t: 'box', id: 'a', x: 2, y: 15, w: 30, h: 12, text: 'gradaciya', color: 'blue' },
        { t: 'box', id: 'b', x: 35, y: 15, w: 30, h: 12, text: 'janlandırıw', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 15, w: 30, h: 12, text: 'perifraz', color: 'purple' },
        { t: 'text', x: 2, y: 34, text: 'kem-kem kúsheytiw', size: 's', color: 'blue' },
        { t: 'text', x: 35, y: 34, text: '«Ne kórdiń, qara at?»', size: 's', color: 'green' },
        { t: 'text', x: 68, y: 34, text: '«Sahra búlbili»', size: 's', color: 'purple' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Giperbola — asırıp, litota — kishireytip kórsetiw; ironiya — sózdi keri mánide qollanıw.',
    'Allegoriya — abstrakt túsinikti konkret obraz arqalı beriw (túlki — hiylekerlik, qasqır — ashkózlik).',
    'Gradaciya — kem-kem kúsheytiw; janlandırıw — jansızǵa jan beriw; perifraz — zattı belgisi arqalı ataw.'
  ],
  questions: [
    {
      id: 'kq14q1',
      prompt: 'Troptı mánisi menen sáykeslendiriń.',
      hint: 'Giperbola — asırıw.',
      explanation: 'giperbola — asırıp kórsetiw; litota — kishireytip kórsetiw; ironiya — keri mánide qollanıw; perifraz — atın emes, belgisin aytıw.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'giperbola' }, right: { label: 'asırıp kórsetiw' } },
            { left: { label: 'litota' }, right: { label: 'kishireytip kórsetiw' } },
            { left: { label: 'ironiya' }, right: { label: 'keri mánide qollanıw' } },
            { left: { label: 'perifraz' }, right: { label: 'atın emes, belgisin aytıw' } }
          ]
        }
      }
    },
    {
      id: 'kq14q2',
      prompt: '«Tuttım búrgeniń anasın, Qosqa jektim jup danasın» — bul qaysı trop?',
      hint: 'Búrgeni qosqa jegiw — asırıw.',
      explanation: 'Giperbola.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['giperbola', 'litota', 'ironiya', 'epitet'], answerIndex: 0 } }
    },
    {
      id: 'kq14q3',
      prompt: '«Qumırsqa bel qız» — qaysı trop?',
      hint: 'Kishireytip kórsetiw.',
      explanation: 'Litota.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['litota', 'giperbola', 'perifraz', 'metonimiya'], answerIndex: 0 } }
    },
    {
      id: 'kq14q4',
      prompt: 'Allegoriyada haywan hám ol bildiretuǵın qásiyetti sáykeslendiriń.',
      hint: 'Túlki — hiyle.',
      explanation: 'túlki — hiylekerlik; eshek — ańqawlıq; qasqır — ashkózlik.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'túlki' }, right: { label: 'hiylekerlik' } },
            { left: { label: 'eshek' }, right: { label: 'ańqawlıq' } },
            { left: { label: 'qasqır' }, right: { label: 'ashkózlik' } }
          ]
        }
      }
    },
    {
      id: 'kq14q5',
      prompt: '«Sahra búlbili», «Sahradaǵı Luvr» — qaysı trop?',
      hint: 'Atı tikkeley atalmaǵan.',
      explanation: 'Perifraz.',
      widget: { type: 'text_answer', props: { before: '«Sahra búlbili» —', after: '', answer: ['perifraz', 'perifraza'], width: 9 } }
    },
    {
      id: 'kq14q6',
      prompt: '«Ne kórdiń, qara at, ne kórdiń?» («Alpamıs») — qaysı trop?',
      hint: 'Atqa adamday sóylew.',
      explanation: 'Janlandırıw.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['janlandırıw', 'gradaciya', 'litota', 'sinekdoxa'], answerIndex: 0 } }
    },
    {
      id: 'kq14q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Ironiya — keri máni.',
      explanation: 'Ironiya satira hám yumorda kóp; allegoriya tımsallarda kóp ushırasadı; Berdaqtıń «Zamanda» qosıǵında allegoriya bar; litota — giperbolaǵa qarama-qarsı.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Ironiya satiralıq hám yumorlıq shıǵarmalarda kóp ushırasadı.', value: true },
            { text: 'Allegoriya kóbinese tımsallarda qollanıladı.', value: true },
            { text: 'Litota giperbolaǵa uqsas, ol da asırıp kórsetedi.', value: false },
            { text: '«Baylar — qasqır, túlki, xalıq — qoyan eken» — Berdaqtan.', value: true }
          ]
        }
      }
    },
    {
      id: 'kq14q8',
      prompt: 'Birgelkili aǵzalardıń mánisi kem-kem kúsheyip berilse, bul qalay ataladı?',
      hint: 'G hárip penen baslanadı.',
      explanation: 'Gradaciya.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['gradaciya', 'inversiya', 'allegoriya', 'epifora'], answerIndex: 0 } }
    }
  ]
};
