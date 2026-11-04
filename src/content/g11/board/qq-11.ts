import type { BoardLesson } from './types';
import { QQ_G3 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 8–11, 51–53-betler — Sóylewdiń logikalılıǵı. */
export const QQ_11: BoardLesson = {
  n: 11,
  label: '11',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G3,
  title: 'Sóylewdiń logikalılıǵı',
  section: '§ 8 — 11. Sóylewdiń logikalılıǵı',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Sóylewdiń logikalılıǵı — pikirdiń izbe-iz, durıs bayanlanıwı, mádeniyatlı sóylewdiń bas shártleriniń biri. Ol durıslıq hám anıqlıq penen tıǵız baylanıslı: grammatikalıq jaqtan nadurıs dúzilgen gáp logikanı buzadı. Mısalı, «Ferma jankúyerleri altı aylıq mámleketke sút satıw planların orınladı» degen gápte sóz tártibi nadurıs: «altı aylıq» dizbegi «satıw» sózinen keyin keliwi kerek edi. Ilimiy tekstte kirisiw, tiykarǵı bólim hám juwmaq qatań izbe-izlikte boladı. Ushinskiy: «Ana tili — aqıl-oy rawajlanıwınıń negizi».',
      easy: 'Logikalı sóylew — pikirdi izbe-iz aytıw. Sóz tártibi buzılsa, máni buzıladı. Ilimiy tekst: kirisiw → tiykarǵı bólim → juwmaq.',
      draw: [
        { t: 'title', text: 'Logikalı sóylew' },
        { t: 'box', id: 'a', x: 2, y: 15, w: 30, h: 12, text: 'kirisiw', color: 'blue' },
        { t: 'box', id: 'b', x: 35, y: 15, w: 30, h: 12, text: 'tiykarǵı bólim', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 15, w: 30, h: 12, text: 'juwmaq', color: 'purple' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 38, text: 'Qáte: «altı aylıq mámleketke sút satıw…»', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 45, text: 'Durıs: «mámleketke altı aylıq sút satıw…»', size: 's', color: 'green' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Sóylewdiń logikalılıǵı — pikirdiń izbe-iz durıs bayanlanıwı; ol durıslıq hám anıqlıq penen baylanıslı.',
    'Sóz tártibiniń buzılıwı gáptiń mazmunına zıyan keltiredi.',
    'Ilimiy tekstte kirisiw, tiykarǵı bólim hám juwmaq qatań izbe-izlikte boladı.'
  ],
  questions: [
    {
      id: 'kq11q1',
      prompt: 'Sóylewdiń logikalılıǵı degen ne?',
      hint: 'Izbe-izlik.',
      explanation: 'Pikirdiń izbe-iz, durıs bayanlanıwı.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['pikirdiń izbe-iz durıs bayanlanıwı', 'kórkem sózlerdi kóp qollanıw', 'tez sóylew', 'qısqa gápler'], answerIndex: 0 } }
    },
    {
      id: 'kq11q2',
      prompt: 'Ilimiy tekstiń bólimlerin tártip penen jaylastırıń.',
      hint: 'Kirisiwden baslanadı.',
      explanation: 'Kirisiw → tiykarǵı bólim → juwmaq.',
      widget: { type: 'step_order', props: { steps: ['kirisiw', 'tiykarǵı bólim', 'juwmaq'] } }
    },
    {
      id: 'kq11q3',
      prompt: 'Gáptegi sózlerdi logikalı tártipke salıń.',
      hint: '«Altı aylıq» — satıw planına tiyisli.',
      explanation: 'Jankúyerler mámleketke altı aylıq sút satıw planın orınladı.',
      widget: { type: 'sentence_order', props: { words: ['Jankúyerler', 'mámleketke', 'altı', 'aylıq', 'sút', 'satıw', 'planın', 'orınladı.'] } }
    },
    {
      id: 'kq11q4',
      prompt: 'Sóylewdiń logikalılıǵı qaysı belgiler menen tıǵız baylanıslı?',
      hint: 'Eki belgi.',
      explanation: 'Durıslıq hám anıqlıq penen.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'durıslıq', match: true },
            { id: 'b', text: 'anıqlıq', match: true },
            { id: 'c', text: 'tezlik', match: false },
            { id: 'd', text: 'dawıs kúshi', match: false }
          ]
        }
      }
    },
    {
      id: 'kq11q5',
      prompt: '«Ana tili — aqıl-oy rawajlanıwınıń negizi» degen pikir kimdiki?',
      hint: 'Belgili pedagog.',
      explanation: 'K. D. Ushinskiydiki.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['K. D. Ushinskiy', 'V. G. Belinskiy', 'Aristotel', 'Ciceron'], answerIndex: 0 } }
    },
    {
      id: 'kq11q6',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Kórkem shıǵarmanıń dúzilisi.',
      explanation: 'Kórkem shıǵarmadaǵı waqıyalardıń úziliwi logikaǵa zıyan emes; logikalılıq temanı biliwdi de talap etedi; grammatikalıq qáte logikanı buzadı.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Romanda waqıyanıń birden úziliwi hámme waqıt logikalıq qáte.', value: false },
            { text: 'Logikalı sóylew temanı tereń biliwdi talap etedi.', value: true },
            { text: 'Grammatikalıq jaqtan nadurıs gáp logikanı buzadı.', value: true },
            { text: 'Logikalılıq tek tillik qubılıs, bilimge baylanıslı emes.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq11q7',
      prompt: 'Naqıldı tolıqtırıń.',
      hint: 'Jan azıǵı.',
      explanation: '«Jaqsı sóz — jan azıǵı».',
      widget: { type: 'text_answer', props: { before: 'Jaqsı sóz — jan', after: '.', answer: 'azıǵı', width: 6 } }
    }
  ]
};
