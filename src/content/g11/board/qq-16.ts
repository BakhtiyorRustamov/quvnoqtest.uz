import type { BoardLesson } from './types';
import { QQ_G3 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), 64–70-betler — Naqıl-maqallarda kórkem sóz, sheshenlik haqqında. */
export const QQ_16: BoardLesson = {
  n: 16,
  label: '16',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G3,
  title: 'Naqıl-maqallarda sheshenlik',
  section: 'Naqıl-maqallarda kórkem sóz — sheshenlik haqqında',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Qaraqalpaq xalqı sóz ónerin júdá qádirlegen, sheshenlerin ardaqlaǵan. Erte dáwirlerde sheshenler dawlı máselelerdi sheshken; Jiyrenshe sheshen haqqındaǵı áńgimeler buǵan mısal. Sultan «Suw saǵası saydan shıqsa, sóz saǵası qaydan shıǵadı?» dep soraǵanda, sheshen: «Suw saǵası — bulaq, sóz saǵası — qulaq. Suw bar jerde balıq bar, sóz bar jerde xalıq bar. Sózdiń saǵası — xalıq» dep juwap bergen. Naqıllar: «Aytılǵan sóz — atılǵan oq», «Az sóz — altın, kóp sóz — kómir», «Ana súti boy ósiredi, ana tili oy ósiredi».',
      easy: 'Xalıq sheshenlerdi ardaqlaǵan. «Sóz saǵası — qulaq», «Az sóz — altın, kóp sóz — kómir».',
      draw: [
        { t: 'title', text: 'Sóz haqqında naqıllar' },
        { t: 'text', x: 4, y: 15, text: 'Suw saǵası — bulaq, sóz saǵası — qulaq.', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 23, text: 'Aytılǵan sóz — atılǵan oq.', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 31, text: 'Az sóz — altın, kóp sóz — kómir.', size: 's', color: 'orange' },
        { t: 'text', x: 4, y: 39, text: 'Ana súti boy ósiredi,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 45, text: 'Ana tili oy ósiredi.', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 53, text: 'Oq jarası piter, sóz jarası pitpes.', size: 's', color: 'red' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Qaraqalpaq xalqı sóz ónerin qádirlegen; sheshenler dawlı máselelerdi sheshken (Jiyrenshe sheshen).',
    '«Suw saǵası — bulaq, sóz saǵası — qulaq. Sózdiń saǵası — xalıq».',
    'Naqıllar sózdiń qúdiretin kórsetedi: «Aytılǵan sóz — atılǵan oq», «Az sóz — altın, kóp sóz — kómir».'
  ],
  questions: [
    {
      id: 'kq16q1',
      prompt: 'Naqıldıń eki bólimin sáykeslendiriń.',
      hint: 'Ana súti — boy, ana tili — oy.',
      explanation: 'Ana súti — boy ósiredi; aytılǵan sóz — atılǵan oq; az sóz — altın; oq jarası piter — sóz jarası pitpes.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Ana súti boy ósiredi,' }, right: { label: 'ana tili oy ósiredi.' } },
            { left: { label: 'Aytılǵan sóz —' }, right: { label: 'atılǵan oq.' } },
            { left: { label: 'Az sóz — altın,' }, right: { label: 'kóp sóz — kómir.' } },
            { left: { label: 'Oq jarası piter,' }, right: { label: 'sóz jarası pitpes.' } }
          ]
        }
      }
    },
    {
      id: 'kq16q2',
      prompt: 'Sheshenniń juwabın tolıqtırıń: «Suw saǵası — bulaq, sóz saǵası — …»',
      hint: 'Esitiw aǵzası.',
      explanation: '«Sóz saǵası — qulaq».',
      widget: { type: 'text_answer', props: { before: 'Suw saǵası — bulaq, sóz saǵası —', after: '.', answer: 'qulaq', width: 6 } }
    },
    {
      id: 'kq16q3',
      prompt: 'Sheshen boyınsha «sózdiń saǵası» ne?',
      hint: '«Sóz bar jerde … bar».',
      explanation: '«Sózdiń saǵası — xalıq».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['xalıq', 'sultan', 'kitap', 'teńiz'], answerIndex: 0 } }
    },
    {
      id: 'kq16q4',
      prompt: 'Qaraqalpaq xalıq dóretpelerinde atı belgili sheshen kim?',
      hint: 'Ol haqqında kóp áńgimeler bar.',
      explanation: 'Jiyrenshe sheshen.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Jiyrenshe sheshen', 'Demosfen', 'Ciceron', 'Kvintilian'], answerIndex: 0 } }
    },
    {
      id: 'kq16q5',
      prompt: 'Naqıldı tolıqtırıń.',
      hint: 'Altın hám kómir.',
      explanation: '«Az sóz — altın, kóp sóz — kómir».',
      widget: {
        type: 'fill_blanks',
        props: { segments: [{ text: 'Az sóz —' }, { blank: 'altın' }, { text: ', kóp sóz —' }, { blank: 'kómir' }, { text: '.' }], bank: ['altın', 'kómir', 'gúmis', 'tas'] }
      }
    },
    {
      id: 'kq16q6',
      prompt: 'Sóylew ádebine sáykes keletuǵın násiyatlardı belgileń.',
      hint: 'Naqıllardıń mazmunı.',
      explanation: '«Jeti ólshep, bir kes», «Áwel oyla, keyin sóyle», «Sóylemesten burın oylanıp al» — oylap sóylewge shaqıradı.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Áwel oyla, keyin sóyle.', match: true },
            { id: 'b', text: 'Jeti ólshep, bir kes.', match: true },
            { id: 'c', text: 'Sóylemesten burın oylanıp al.', match: true },
            { id: 'd', text: 'Ne kelse sonı ayt.', match: false }
          ]
        }
      }
    },
    {
      id: 'kq16q7',
      prompt: 'Naqıldıń sózlerin tártipke salıń.',
      hint: '«Atalar sózi …»',
      explanation: 'Atalar sózi — aqıldıń kózi.',
      widget: { type: 'sentence_order', props: { words: ['Atalar', 'sózi', '—', 'aqıldıń', 'kózi.'] } }
    },
    {
      id: 'kq16q8',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Sheshenlerdiń jámiyettegi ornı.',
      explanation: 'Erte dáwirde sheshenler dawlı máselelerdi sheshken; sózin tawıp sóyleytuǵın adamlar húrmette bolǵan; «Sóz — gúmis, úndemew — altın».',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Erte dáwirlerde sheshenler dawlı máselelerdi sheshken.', value: true },
            { text: 'Qaraqalpaq xalqı sóz ónerin qádirlemegen.', value: false },
            { text: '«Sóz — gúmis, úndemew — altın» — xalıq naqılı.', value: true },
            { text: '«Batırdıń kúshi taw bolǵanı menen, sózdiń kúshi shalqıǵan teńiz».', value: true }
          ]
        }
      }
    }
  ]
};
