import type { BoardLesson } from './types';
import { QQ_G3 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 6–7, 46–48-betler — Sóylew anıqlıǵı. */
export const QQ_10: BoardLesson = {
  n: 10,
  label: '10',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G3,
  title: 'Sóylew anıqlıǵı',
  section: '§ 6 — 7. Sóylew anıqlıǵı',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Sóylew anıqlıǵı — pikirdiń dálligi hám tuwrılıǵı, sóylewdiń eń baslı belgileriniń biri. Anıqlıq degende sóz benen ol ańlatatuǵın zat hám qubılıstıń sáykes keliwi túsiniledi. Aristotel: «Eger sóylew anıq bolmasa, ol maqsetine jetpeydi». Belinskiy: «Pikir túsiniksiz bolsa, sóz de túsiniksiz boladı». Kayqawıs sózdiń mánisin bilmey sóylewshini qusqa teńegen. Sheshen sóylew predmetin jaqsı bilip, oǵan say sózler tańlasa, sóylew anıq boladı. Anıqlıq eki túrli: zattıń anıqlıǵı hám túsiniktiń anıqlıǵı.',
      easy: 'Anıq sóylew — sóz zatqa dál sáykes keledi. Temanı jaqsı bilip, durıs sóz tańlasań, sóziń anıq boladı.',
      draw: [
        { t: 'title', text: 'Sóylew anıqlıǵı' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 40, h: 12, text: 'sóz', color: 'blue' },
        { t: 'box', id: 'b', x: 56, y: 15, w: 40, h: 12, text: 'zat, qubılıs', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'text', x: 4, y: 36, text: 'Anıqlıqtıń eki túri:', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 43, text: '1) zattıń anıqlıǵı  2) túsiniktiń anıqlıǵı', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 53, text: '«Anıq bolmasa, maqsetine jetpeydi.» — Aristotel', size: 's', color: 'orange' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Sóylew anıqlıǵı — pikirdiń dálligi; sóz benen ol ańlatatuǵın zat-qubılıstıń sáykesligi.',
    'Aristotel: anıq bolmaǵan sóylew maqsetine jetpeydi; Belinskiy: pikir túsiniksiz bolsa, sóz de túsiniksiz.',
    'Anıqlıqtıń eki túri bar: zattıń anıqlıǵı hám túsiniktiń anıqlıǵı.'
  ],
  questions: [
    {
      id: 'kq10q1',
      prompt: 'Sóylew anıqlıǵı degende ne túsiniledi?',
      hint: 'Sóz benen zattıń qatnası.',
      explanation: 'Sóz benen ol ańlatıp atırǵan zat hám qubılıstıń sáykes keliwi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['sóz benen zat-qubılıstıń sáykesligi', 'tez sóylew', 'kóp sinonim qollanıw', 'baland dawıs penen sóylew'], answerIndex: 0 } }
    },
    {
      id: 'kq10q2',
      prompt: 'Avtordı pikiri menen sáykeslendiriń.',
      hint: 'Belinskiy — pikir hám sóz.',
      explanation: 'Aristotel — anıq bolmasa maqsetine jetpeydi; Belinskiy — pikir túsiniksiz bolsa, sóz de túsiniksiz; Ciceron — sóz túsiniktiń anıq ataması.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Aristotel' }, right: { label: 'anıq bolmasa, maqsetine jetpeydi' } },
            { left: { label: 'Belinskiy' }, right: { label: 'pikir túsiniksiz bolsa, sóz de túsiniksiz' } },
            { left: { label: 'Ciceron' }, right: { label: 'sóz — túsiniktiń anıq ataması' } }
          ]
        }
      }
    },
    {
      id: 'kq10q3',
      prompt: 'Anıqlıqtıń eki túrin belgileń.',
      hint: 'Zat hám túsinik.',
      explanation: 'Zattıń anıqlıǵı hám túsiniktiń anıqlıǵı.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'zattıń anıqlıǵı', match: true },
            { id: 'b', text: 'túsiniktiń anıqlıǵı', match: true },
            { id: 'c', text: 'dawıstıń anıqlıǵı', match: false },
            { id: 'd', text: 'hárip anıqlıǵı', match: false }
          ]
        }
      }
    },
    {
      id: 'kq10q4',
      prompt: 'Kayqawıs sózdiń mánisin bilmey sóylegen adamdı nege teńegen?',
      hint: 'Úyretilgen sózdi qaytalaytuǵın …',
      explanation: '«Sózdiń mánisin bilmeseń, qusqa usaysań».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qusqa', 'túlkige', 'arıslanǵa', 'balıqqa'], answerIndex: 0 } }
    },
    {
      id: 'kq10q5',
      prompt: 'Sóylew anıq bolıwı ushın sheshenge ne kerek?',
      hint: 'Úsh shárt.',
      explanation: 'Sóylew predmetin jaqsı biliw, oǵan say sózler tańlaw, sózlerdi mánisine sáykes qollanıw.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'y', label: 'járdem beredi' }, { id: 'n', label: 'kesent beredi' }],
          tiles: [
            { id: 'a', label: 'temanı jaqsı biliw', bin: 'y' },
            { id: 'b', label: 'say sóz tańlaw', bin: 'y' },
            { id: 'c', label: 'sóz mánisin biliw', bin: 'y' },
            { id: 'd', label: 'mánisin bilmegen sózdi qollanıw', bin: 'n' },
            { id: 'e', label: 'pikirdiń túsiniksizligi', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'kq10q6',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Anıqlıq hám oylaw.',
      explanation: 'Anıqlıq — til menen oylawdıń baylanısı; anıqlıq hám qısqalıq — prozaǵa qoyılatuǵın tiykarǵı talap; ilimiy tekst anıq bolıwı kerek.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Anıqlıq máselesi — til menen oylawdıń baylanısı máselesi.', value: true },
            { text: 'Anıqlıq hám qısqalıq — prozaǵa qoyılatuǵın tiykarǵı talaplar.', value: true },
            { text: 'Ilimiy shıǵarmada anıqlıq kerek emes.', value: false },
            { text: 'Temanı bilmey-aq anıq sóylewge boladı.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq10q7',
      prompt: 'Sózlerdi tártipke salıń (Belinskiydiń pikiri).',
      hint: '«Pikir túsiniksiz bolsa, …»',
      explanation: 'Pikir túsiniksiz bolsa, sóz de túsiniksiz boladı.',
      widget: { type: 'sentence_order', props: { words: ['Pikir', 'túsiniksiz', 'bolsa,', 'sóz', 'de', 'túsiniksiz', 'boladı.'] } }
    }
  ]
};
