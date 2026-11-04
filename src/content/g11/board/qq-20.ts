import type { BoardLesson } from './types';
import { QQ_G4 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 22–23, 81–83-betler — Pát, intonaciya, pauza. */
export const QQ_20: BoardLesson = {
  n: 20,
  label: '20',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G4,
  title: 'Pát, intonaciya, pauza',
  section: '§ 22 — 23. Pát hám onıń xızmetleri, logikalıq pát, intonaciya, pauza',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Pát — sózdegi bir buwınnıń basqalarına qaraǵanda kúshli aytılıwı. Qaraqalpaq tilinde pát turaqlı, sózdiń aqırǵı buwınına túsedi. Orıs, arab, parsı tillerinen kirgen sózlerde pát aldınǵı yamasa ortańǵı buwınǵa da túsedi: student. Páttiń xızmetleri: kulminativ — sózdi shólkemlestiriw; delimitativ — sózlerdi bir-birinen ajıratıw; signifikativ — mánini ajıratıw: duwramá (feyil) — duwrama (awqat); ekspressivlik — emociya beriw. Logikalıq pát gáptegi bir aǵzaǵa ayrıqsha dıqqat awdaradı.',
      easy: 'Pát — kúshli aytılǵan buwın, qaraqalpaq tilinde sońǵı buwında. Logikalıq pát — gáptegi eń áhmiyetli sózdi ajıratadı.',
      draw: [
        { t: 'title', text: 'Páttiń xızmetleri' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['xızmeti', 'mánisi'],
            ['kulminativ', 'sózdi shólkemlestiriw'],
            ['delimitativ', 'sózlerdi ajıratıw'],
            ['signifikativ', 'mánini ajıratıw'],
            ['ekspressivlik', 'emociya beriw']
          ]
        }
      ],
      next: 'Intonaciya hám pauza'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Intonaciya — awızeki sóylewdiń ritmlik-melodikalıq tárepi. Onıń birlikleri: sóylew melodikası — dawıstıń kóteriliwi hám páseyiwi; ritm — pátli hám pátsiz buwınlardıń ırǵaǵı; temp — tez yamasa áste aytılıw; intensivlik — kúshli yamasa hálsiz aytılıw; tembr — dawıstıń reńi. Intonaciyasız gáp bolmaydı: xabar, soraw, buyrıq hám úndew gáplerdiń intonaciyası hár qıylı. Pauza — sózler arasındaǵı dawıs úzilisi: sintaksislik hám sintaksislik emes, yaǵnıy dem alıw pauzası.',
      easy: 'Intonaciya: melodika, ritm, temp, intensivlik, tembr. Pauza — dawıstıń úziliwi.',
      draw: [
        { t: 'title', text: 'Intonaciya birlikleri' },
        { t: 'list', x: 6, y: 16, items: ['melodika', 'ritm', 'temp', 'intensivlik', 'tembr'], color: 'blue' },
        { t: 'box', id: 'p', x: 52, y: 18, w: 44, h: 12, text: 'pauza — úzilis', color: 'orange' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Qaraqalpaq tilinde pát turaqlı — sózdiń aqırǵı buwınına túsedi; kirme sózlerde basqasha bolıwı múmkin.',
    'Páttiń xızmetleri: kulminativ, delimitativ, signifikativ, ekspressivlik; logikalıq pát gáp aǵzasın ajıratadı.',
    'Intonaciya birlikleri: melodika, ritm, temp, intensivlik, tembr; pauza — sintaksislik hám sintaksislik emes.'
  ],
  questions: [
    {
      id: 'kq20q1',
      prompt: 'Páttiń xızmetin mánisi menen sáykeslendiriń.',
      hint: 'Delimitativ — ajıratıw.',
      explanation: 'kulminativ — sózdi shólkemlestiriw; delimitativ — sózlerdi ajıratıw; signifikativ — mánini ajıratıw; ekspressivlik — emociya beriw.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'kulminativ' }, right: { label: 'sózdi shólkemlestiriw' } },
            { left: { label: 'delimitativ' }, right: { label: 'sózlerdi bir-birinen ajıratıw' } },
            { left: { label: 'signifikativ' }, right: { label: 'mánini ajıratıw' } },
            { left: { label: 'ekspressivlik' }, right: { label: 'emociya beriw' } }
          ]
        }
      }
    },
    {
      id: 'kq20q2',
      prompt: 'Qaraqalpaq tilinde pát qanday?',
      hint: 'Ornı ózgermeydi.',
      explanation: 'Turaqlı — barlıq waqıtta sózdiń aqırǵı buwınına túsedi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['turaqlı, aqırǵı buwında', 'erkin', 'turaqlı, birinshi buwında', 'pát joq'], answerIndex: 0 } }
    },
    {
      id: 'kq20q3',
      prompt: 'Intonaciyanıń birliklerin belgileń.',
      hint: 'Bes birlik.',
      explanation: 'Melodika, ritm, temp, intensivlik, tembr.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'melodika', match: true },
            { id: 'b', text: 'ritm', match: true },
            { id: 'c', text: 'temp', match: true },
            { id: 'd', text: 'tembr', match: true },
            { id: 'e', text: 'imla', match: false },
            { id: 'f', text: 'epitet', match: false }
          ]
        }
      }
    },
    {
      id: 'kq20q4',
      prompt: 'Sóylewdiń tez yamasa áste aytılıwı intonaciyanıń qaysı birligi?',
      hint: 'T hárip penen baslanadı.',
      explanation: 'Temp.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['temp', 'tembr', 'ritm', 'melodika'], answerIndex: 0 } }
    },
    {
      id: 'kq20q5',
      prompt: 'Gáptegi bir aǵzaǵa tıńlawshınıń dıqqatın ayrıqsha awdaratuǵın pát qalay ataladı?',
      hint: '«Men liceyde oqıyman».',
      explanation: 'Logikalıq pát.',
      widget: { type: 'text_answer', props: { before: '', after: 'pát — gáp aǵzasın ayrıqsha ajıratadı.', answer: ['logikalıq', 'Logikalıq'], width: 10 } }
    },
    {
      id: 'kq20q6',
      prompt: 'Pauza túrlerin sáykeslendiriń.',
      hint: 'Dem alıw — sintaksislik emes.',
      explanation: 'Sintaksislik pauza gáp aǵzaların anıqlaydı; sintaksislik emes pauza dem alıw ushın payda boladı.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'sintaksislik pauza' }, right: { label: 'gáp aǵzaların anıqlaydı' } },
            { left: { label: 'sintaksislik emes pauza' }, right: { label: 'dem alıw ushın' } }
          ]
        }
      }
    },
    {
      id: 'kq20q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Kirme sózlerde pát.',
      explanation: 'Kirme sózlerde pát aldınǵı yamasa ortańǵı buwınǵa túsiwi múmkin; intonaciyasız gáp bolmaydı; gáp túrleriniń intonaciyası hár qıylı.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kirme sózlerde pát aldınǵı yamasa ortańǵı buwınǵa da túsedi.', value: true },
            { text: 'Intonaciyasız gáp bolmaydı.', value: true },
            { text: 'Xabar hám soraw gáptiń intonaciyası birdey.', value: false },
            { text: 'Tembr — sóylewdiń tezligi.', value: false }
          ]
        }
      }
    }
  ]
};
