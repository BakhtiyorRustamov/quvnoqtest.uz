import type { BoardLesson } from './types';
import { QQ_G1 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 2, 14–23-betler — Sóylew ádebi haqqında danıshpanlardıń pikirleri. */
export const QQ_3: BoardLesson = {
  n: 3,
  label: '3',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G1,
  title: 'Sóylew mádeniyatı hám sóylew ádebi',
  section: '§ 2. Sóylew mádeniyatı — jámiyet mádeniyatınıń aynası. Ullı danıshpanlarımızdıń sóylew ádebi haqqındaǵı pikirleri',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: '«Til mádeniyatı» ádebiy tildiń rawajlanıw basqıshın, normalarınıń qáliplesiw dárejesin ańlatadı, al «sóylew mádeniyatı» hárbir adamnıń til birliklerin ádebiy normaǵa sáykes qollanıwın bildiredi. «Sóylew ádebi» túsinigi «sóz ádebi» túsiniginen keńirek. XI ásirde Maxmud Qashǵariy «Devonu luǵat-at túrk» shıǵarmasında «Ádeptiń bası — til» dep jazǵan. Sóylew ádebi haqqında pikirler Kayqawıstıń «Qabusnama», Yusup Has Hajibtıń «Qutadǵu bilig», Axmed Yugnakiydiń «Hibatul-haqayıq» shıǵarmalarında hám Álisher Nawayıda bar.',
      easy: 'Til mádeniyatı — ádebiy tildiń dárejesi, sóylew mádeniyatı — hár adamnıń durıs sóylewi. Qashǵariy: «Ádeptiń bası — til».',
      draw: [
        { t: 'title', text: 'Sóylew ádebi haqqında' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['avtor', 'shıǵarma'],
            ['Maxmud Qashǵariy', '«Devonu luǵat-at túrk»'],
            ['Yusup Has Hajib', '«Qutadǵu bilig»'],
            ['Axmed Yugnakiy', '«Hibatul-haqayıq»'],
            ['Kayqawıs', '«Qabusnama»'],
            ['Álisher Nawayı', '«Muhakamatul luǵatayin»']
          ]
        }
      ],
      next: 'Danalardıń sózleri'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Yusup Has Hajib bılay deydi: «Sózińe ıqtiyat bol, basıń ketpesin, Tilińe ıqtiyat bol, tisiń sınbasın». Kayqawıs: «Kóp bil de, az sóyle, az bilseń kóp sóyleme, sebebi aqılsız kisi kóp sóyleydi». Nawayı: «Kóńil ǵáziynesiniń qulpı — til, ol ǵáziyneniń gilti — sóz». Ájiniyaz: «Aytqan sózdiń maǵanasın bilmese, Ol adamnan tilsiz ósken mal jaqsı». Berdaq «Jaqsıraq» qosıǵında: «Tereń aqıl kerek sózdi dizbege».',
      easy: 'Danalar oylap, az hám orınlı sóylewge shaqırǵan: «Kóp bil de, az sóyle».',
      draw: [
        { t: 'title', text: 'Danalardıń sózleri' },
        { t: 'text', x: 4, y: 15, text: '«Sózińe ıqtiyat bol, basıń ketpesin.»', size: 's', color: 'blue' },
        { t: 'text', x: 8, y: 21, text: '— Yusup Has Hajib', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 29, text: '«Kóp bil de, az sóyle.» — Kayqawıs', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 37, text: '«Kóńil ǵáziynesiniń qulpı — til,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 43, text: 'ol ǵáziyneniń gilti — sóz.» — Nawayı', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 51, text: '«Tereń aqıl kerek sózdi dizbege.» — Berdaq', size: 's', color: 'orange' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Til mádeniyatı — ádebiy tildiń rawajlanıw dárejesi; sóylew mádeniyatı — hár adamnıń tildi normaǵa sáykes qollanıwı.',
    'Maxmud Qashǵariy: «Ádeptiń bası — til».',
    'Sóylew ádebi «Qutadǵu bilig», «Hibatul-haqayıq», «Qabusnama», Nawayı, Ájiniyaz, Berdaq shıǵarmalarında jırlanǵan.'
  ],
  questions: [
    {
      id: 'kq3q1',
      prompt: '«Ádeptiń bası — til» degen pikir kimniń shıǵarmasında aytılǵan?',
      hint: 'XI ásir, «Devonu luǵat-at túrk».',
      explanation: 'Maxmud Qashǵariydiń «Devonu luǵat-at túrk» shıǵarmasında.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Maxmud Qashǵariy', 'Álisher Nawayı', 'Berdaq', 'Kayqawıs'], answerIndex: 0 } }
    },
    {
      id: 'kq3q2',
      prompt: 'Avtordı shıǵarması menen sáykeslendiriń.',
      hint: '«Qutadǵu bilig» — Yusup Has Hajib.',
      explanation: 'Yusup Has Hajib — «Qutadǵu bilig»; Axmed Yugnakiy — «Hibatul-haqayıq»; Kayqawıs — «Qabusnama»; Nawayı — «Muhakamatul luǵatayin».',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Yusup Has Hajib' }, right: { label: '«Qutadǵu bilig»' } },
            { left: { label: 'Axmed Yugnakiy' }, right: { label: '«Hibatul-haqayıq»' } },
            { left: { label: 'Kayqawıs' }, right: { label: '«Qabusnama»' } },
            { left: { label: 'Álisher Nawayı' }, right: { label: '«Muhakamatul luǵatayin»' } }
          ]
        }
      }
    },
    {
      id: 'kq3q3',
      prompt: '«Til mádeniyatı» hám «sóylew mádeniyatı» túsiniklerin ajıratıń.',
      hint: 'Biri — tildiń dárejesi, ekinshisi — adamnıń sóylewi.',
      explanation: 'Til mádeniyatı ádebiy tildiń rawajlanıw basqıshın, sóylew mádeniyatı hár adamnıń tildi normaǵa sáykes qollanıwın bildiredi.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 't', label: 'til mádeniyatı' }, { id: 's', label: 'sóylew mádeniyatı' }],
          tiles: [
            { id: 'a', label: 'ádebiy tildiń rawajlanıw basqıshı', bin: 't' },
            { id: 'b', label: 'normalardıń qáliplesiw dárejesi', bin: 't' },
            { id: 'c', label: 'hár adamnıń til birliklerin qollanıwı', bin: 's' },
            { id: 'd', label: 'sóylewdiń normaǵa sáykesligi', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'kq3q4',
      prompt: 'Kayqawıstıń násiyatın tolıqtırıń.',
      hint: 'Kóp bil de, …',
      explanation: '«Kóp bil de, az sóyle, az bilseń kóp sóyleme».',
      widget: { type: 'text_answer', props: { before: 'Kóp bil de,', after: 'sóyle.', answer: 'az', width: 4 } }
    },
    {
      id: 'kq3q5',
      prompt: 'Nawayı boyınsha «kóńil ǵáziynesiniń qulpı» ne, al «gilti» ne?',
      hint: 'Qulp — til.',
      explanation: '«Kóńil ǵáziynesiniń qulpı — til, ol ǵáziyneniń gilti — sóz».',
      widget: {
        type: 'fill_blanks',
        props: { segments: [{ text: 'Kóńil ǵáziynesiniń qulpı —' }, { blank: 'til' }, { text: ', ol ǵáziyneniń gilti —' }, { blank: 'sóz' }, { text: '.' }], bank: ['til', 'sóz', 'aqıl', 'júrek'] }
      }
    },
    {
      id: 'kq3q6',
      prompt: 'Ájiniyazdıń qatarın dawam ettiriń: «Aytqan sózdiń maǵanasın bilmese, …»',
      hint: 'Tilsiz ósken …',
      explanation: '«Ol adamnan tilsiz ósken mal jaqsı».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Ol adamnan tilsiz ósken mal jaqsı', 'Ol adamnıń sózi altın', 'Tilińe ıqtiyat bol', 'Sóz súyekten ótedi'], answerIndex: 0 } }
    },
    {
      id: 'kq3q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Túsiniklerdiń kólemin salıstırıń.',
      explanation: '«Sóylew ádebi» «sóz ádebinen» keńirek; Berdaqtıń qosıǵı «Jaqsıraq» dep ataladı; Nawayı túrkiy tildiń 99 feyilin mısal keltirgen.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Sóylew ádebi» túsinigi «sóz ádebinen» keńirek.', value: true },
            { text: '«Tereń aqıl kerek sózdi dizbege» — Berdaqtıń «Jaqsıraq» qosıǵınan.', value: true },
            { text: 'Nawayı parsı tilin túrkiy tilden bay dep dálillegen.', value: false },
            { text: '«Qutadǵu bilig» XIX ásirde jazılǵan.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq3q8',
      prompt: 'Sózlerdi tártipke salıń (Yusup Has Hajib).',
      hint: '«Tilińe ıqtiyat bol» dep baslanadı.',
      explanation: 'Tilińe ıqtiyat bol, tisiń sınbasın.',
      widget: { type: 'sentence_order', props: { words: ['Tilińe', 'ıqtiyat', 'bol,', 'tisiń', 'sınbasın.'] } }
    }
  ]
};
