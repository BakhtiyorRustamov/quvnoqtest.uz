import type { BoardLesson } from './types';
import { QQ_G1 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 1, 4–13-betler — Qaraqalpaq tili hám onıń rawajlanıwı. */
export const QQ_2: BoardLesson = {
  n: 2,
  label: '2',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G1,
  title: 'Qaraqalpaq tili hám onıń rawajlanıwı',
  section: '§ 1. Qaraqalpaq tili hám onıń rawajlanıwı. Tildiń tálim-tárbiya hám basqa tarawlardaǵı ornı',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Qaraqalpaq tili túrkiy tiller toparına kiredi hám XV — XVI ásirlerde xalıq tili bolıp qáliplesken. Ádebiy tildiń awızeki túri bay folklorda payda boldı. Jazba ádebiy til XIX ásirde Kúnxoja, Ájiniyaz, Berdaq, Ótesh sıyaqlı klassik shayırlardıń qosıqları menen qáliplese basladı. Rásmiy is qaǵazları stiliniń úlgileri XVIII ásirdegi ahidnamalarda hám Orenburg materiallarında ushıraydı. Publicistikalıq stildiń qáliplesiwine 1924-jıldan shıqqan «Erkin Qaraqalpaq» gazetası, ilimiy stilge «Álipbe», «Egedeler sawatı» sabaqlıqları hám sózlikler tásir etti. Búgin qaraqalpaq tili Qaraqalpaqstan Respublikasında mámleketlik til.',
      easy: 'Qaraqalpaq tili — túrkiy til. Jazba ádebiy til XIX ásirde Kúnxoja, Ájiniyaz, Berdaq, Ótesh qosıqları menen qáliplesti. Házir ol — mámleketlik til.',
      draw: [
        { t: 'title', text: 'Tildiń rawajlanıwı' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['dáwir', 'waqıya'],
            ['XV–XVI ásir', 'xalıq tili bolıp qáliplesti'],
            ['XVIII ásir', 'ahidnamalar, Orenburg materialları'],
            ['XIX ásir', 'Kúnxoja, Ájiniyaz, Berdaq, Ótesh'],
            ['1924-jıl', '«Erkin Qaraqalpaq» gazetası'],
            ['XX ásir 30–40 j.', 'ilimiy hám publicistikalıq stil']
          ]
        }
      ],
      next: 'Til hám sóylew'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Til — sol tilde sóylewshiler ushın ortaq qatnas quralı, al sóylew — tildiń ámeldegi qollanılıwı. Tildi jaman yamasa jaqsı dewge bolmaydı, tek sóylew ǵana jaqsı yamasa jaman boladı. Ádebiy til — normaǵa túsken, ulıwma xalıqlıq tildiń eń joqarı túri. Dialektizmler, kásiplik sózler, turpayı sózler hám jargonlar ádebiy tilge kirmeydi. Sóylew mádeniyatı — durıs sóylew hám jazıw, pikirdi ápiwayı, anıq bildiriw, kórkemlew qurallarınan orınlı paydalanıw.',
      easy: 'Til — hámmege ortaq qural, sóylew — onı hár adamnıń qollanıwı. Jaqsı yamasa jaman tek sóylew boladı. Ádebiy til — normaǵa túsken til.',
      draw: [
        { t: 'title', text: 'Til hám sóylew' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 12, text: 'til — ortaq qural', color: 'blue' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'sóylew — qollanılıwı', color: 'green' },
        { t: 'text', x: 4, y: 36, text: 'Ádebiy til — normaǵa túsken eń joqarı túr.', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 44, text: 'Kirmeydi: dialektizm, jargon, turpayı sóz,', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 50, text: 'kásiplik sózler.', size: 's', color: 'red' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Qaraqalpaq tili — túrkiy tiller toparına kiretuǵın til; XV–XVI ásirlerde xalıq tili bolıp qáliplesken.',
    'Jazba ádebiy til XIX ásirde Kúnxoja, Ájiniyaz, Berdaq, Ótesh shıǵarmaları menen qáliplese basladı.',
    'Til — ortaq qatnas quralı, sóylew — onıń ámeldegi qollanılıwı; ádebiy til — normaǵa túsken til.',
    'Qaraqalpaq tili Qaraqalpaqstan Respublikasında mámleketlik til sıpatında qollanıladı.'
  ],
  questions: [
    {
      id: 'kq2q1',
      prompt: 'Qaraqalpaq tili qaysı tiller toparına kiredi?',
      hint: 'Ózbek, qazaq tilleri de usı toparda.',
      explanation: 'Túrkiy tiller toparına.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['túrkiy', 'slavyan', 'iran', 'mońǵol'], answerIndex: 0 } }
    },
    {
      id: 'kq2q2',
      prompt: 'Qaraqalpaq jazba ádebiy tiliniń qáliplesiwine qaysı shayırlardıń dóretiwshiligi tiykar boldı?',
      hint: 'XIX ásir klassikleri.',
      explanation: 'Kúnxoja, Ájiniyaz, Berdaq, Ótesh.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Kúnxoja', match: true },
            { id: 'b', text: 'Ájiniyaz', match: true },
            { id: 'c', text: 'Berdaq', match: true },
            { id: 'd', text: 'Ótesh', match: true },
            { id: 'e', text: 'Demosfen', match: false },
            { id: 'f', text: 'Belinskiy', match: false }
          ]
        }
      }
    },
    {
      id: 'kq2q3',
      prompt: 'Waqıyanı dáwiri menen sáykeslendiriń.',
      hint: 'Gazeta 1924-jıldan shıqtı.',
      explanation: 'XVIII ásir — ahidnamalar; XIX ásir — klassik shayırlar; 1924-jıl — «Erkin Qaraqalpaq» gazetası.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'XVIII ásir' }, right: { label: 'ahidnamalar, Orenburg materialları' } },
            { left: { label: 'XIX ásir' }, right: { label: 'jazba ádebiy tildiń qáliplesiwi' } },
            { left: { label: '1924-jıl' }, right: { label: '«Erkin Qaraqalpaq» gazetası' } }
          ]
        }
      }
    },
    {
      id: 'kq2q4',
      prompt: 'Publicistikalıq stildiń qáliplesiwine tiykar bolǵan gazeta 1924-jıldan baslap shıqtı. Onıń atı qanday?',
      hint: '«Erkin …».',
      explanation: '«Erkin Qaraqalpaq».',
      widget: { type: 'text_answer', props: { before: '«Erkin', after: '» gazetası', answer: 'Qaraqalpaq', width: 11 } }
    },
    {
      id: 'kq2q5',
      prompt: 'Qaysıları ádebiy tildiń quramına kirmeydi?',
      hint: 'Hámmege teńdey túsinikli emes sózler.',
      explanation: 'Dialektizmler, jargonlar, turpayı sózler hám kásiplik sózler ádebiy tilge kirmeydi.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'in', label: 'ádebiy tilge kiredi' }, { id: 'out', label: 'kirmeydi' }],
          tiles: [
            { id: 'a', label: 'normaǵa túsken sózler', bin: 'in' },
            { id: 'b', label: 'ulıwma xalıqqa túsinikli sózler', bin: 'in' },
            { id: 'c', label: 'dialektizmler', bin: 'out' },
            { id: 'd', label: 'jargonlar', bin: 'out' },
            { id: 'e', label: 'turpayı sózler', bin: 'out' }
          ]
        }
      }
    },
    {
      id: 'kq2q6',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Til hám sóylewdiń parqın eske túsiriń.',
      explanation: 'Tildi jaqsı yamasa jaman dewge bolmaydı, tek sóylew jaqsı yamasa jaman boladı; ádebiy til — ulıwma xalıqlıq tildiń eń joqarı túri.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Tildi jaqsı yamasa jaman dewge boladı.', value: false },
            { text: 'Sóylew jaqsı yamasa jaman bolıwı múmkin.', value: true },
            { text: 'Ádebiy til — normaǵa túsken, xalıq tiliniń eń joqarı túri.', value: true },
            { text: 'Qaraqalpaq tili XX ásirde ǵana payda boldı.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq2q7',
      prompt: 'Ilimiy stildiń qáliplesiwine tásir etken dáslepki sabaqlıqlardı belgileń.',
      hint: 'Eki sabaqlıq atalǵan.',
      explanation: '«Álipbe» hám «Egedeler sawatı».',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: '«Álipbe»', match: true },
            { id: 'b', text: '«Egedeler sawatı»', match: true },
            { id: 'c', text: '«Qutadǵu bilig»', match: false },
            { id: 'd', text: '«Qabusnama»', match: false }
          ]
        }
      }
    },
    {
      id: 'kq2q8',
      prompt: 'Sóylew mádeniyatına berilgen anıqlamaǵa sáykes kelmeytuǵının tabıń.',
      hint: 'Úshewi — sóylew mádeniyatınıń belgisi.',
      explanation: 'Sóylew mádeniyatı — durıs sóylew, pikirdi anıq bildiriw, sóylewdiń qısqalıǵı; jargonlardı kóp qollanıw oǵan qarsı.',
      widget: {
        type: 'odd_one_out',
        props: { tiles: [{ text: 'durıs sóylew hám jazıw' }, { text: 'pikirdi anıq bildiriw' }, { text: 'sóylewdiń qısqalıǵı' }, { text: 'jargonlardı kóp qollanıw', odd: true }] }
      }
    }
  ]
};
