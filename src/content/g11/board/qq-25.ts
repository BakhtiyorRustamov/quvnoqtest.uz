import type { BoardLesson } from './types';
import { QQ_G6 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), 101–103-betler — Kúndelik, daǵaza, akt, xabarlama, telegramma. */
export const QQ_25: BoardLesson = {
  n: 25,
  label: '25',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G6,
  title: 'Kúndelik, daǵaza, akt, telegramma',
  section: '§ 23 — 24. Kúndelik, daǵaza, akt, xabarlama, telegramma',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Kúndelik — kún sayın bolǵan waqıyalardı sáne menen jazıp barıw. Daǵaza — bolatuǵın is-ilaje haqqında xabar: waqtı, ornı, kún tártibi, bayanatshı hám kimnen ekeni kórsetiledi. Akt — komissiya aǵzaları tárepinen bir faktti tastıyıqlaw ushın dúzilgen hújjet; oǵan qatnasıwshılar qol qoyadı. Xabarlama — orınlanǵan jumıs haqqında joqarı mákemege yamasa basshıǵa jazılatuǵın xabar. Telegramma — qısqa, tez jetkeriletuǵın xabar: mánzil, alıwshınıń atı, qısqa tekst hám jiberiwshiniń atı.',
      easy: 'Kúndelik — kúnlik jazıw. Daǵaza — bolatuǵın is haqqında xabar. Akt — fakttı tastıyıqlaw. Telegramma — qısqa, tez xabar.',
      draw: [
        { t: 'title', text: 'Qısqa is qaǵazları' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['hújjet', 'maqseti'],
            ['kúndelik', 'kúnlik waqıyalardı jazıw'],
            ['daǵaza', 'bolatuǵın is haqqında xabar'],
            ['akt', 'fakttı tastıyıqlaw'],
            ['xabarlama', 'orınlanǵan jumıs haqqında'],
            ['telegramma', 'qısqa, tez xabar']
          ]
        }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Kúndelik — kúnlik waqıyalardı sáne menen jazıw.',
    'Daǵazada waqıt, orın, kún tártibi, bayanatshı kórsetiledi; akt komissiya tárepinen fakttı tastıyıqlaw ushın dúziledi.',
    'Xabarlama — orınlanǵan jumıs haqqında xabar; telegramma — qısqa hám tez xabar.'
  ],
  questions: [
    {
      id: 'kq25q1',
      prompt: 'Hújjetti maqseti menen sáykeslendiriń.',
      hint: 'Akt — tastıyıqlaw.',
      explanation: 'kúndelik — kúnlik waqıyalar; daǵaza — bolatuǵın is; akt — fakttı tastıyıqlaw; telegramma — qısqa xabar.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'kúndelik' }, right: { label: 'kúnlik waqıyalardı jazıw' } },
            { left: { label: 'daǵaza' }, right: { label: 'bolatuǵın is haqqında xabar' } },
            { left: { label: 'akt' }, right: { label: 'fakttı tastıyıqlaw' } },
            { left: { label: 'telegramma' }, right: { label: 'qısqa, tez xabar' } }
          ]
        }
      }
    },
    {
      id: 'kq25q2',
      prompt: '«…13-sáwir kúni saat 16.00 de mektepte ata-analar jıynalısı boladı. Kún tártibinde: …» — bul qaysı hújjet?',
      hint: 'Aldın-ala xabar beriw.',
      explanation: 'Daǵaza.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['daǵaza', 'akt', 'kúndelik', 'isenim xat'], answerIndex: 0 } }
    },
    {
      id: 'kq25q3',
      prompt: '«Biz, tómendegi komissiya aǵzaları … usı aktti tayarladıq» — bul hújjetke kimler qol qoyadı?',
      hint: 'Komissiya.',
      explanation: 'Komissiya aǵzaları — qatnasıwshılar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['komissiya aǵzaları', 'tek oqıwshı', 'pochtashı', 'hesh kim'], answerIndex: 0 } }
    },
    {
      id: 'kq25q4',
      prompt: 'Daǵazada neler kórsetiledi?',
      hint: 'Qashan, qay jerde, ne haqqında.',
      explanation: 'Waqtı, ornı, kún tártibi, bayanatshı.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'waqtı', match: true },
            { id: 'b', text: 'ornı', match: true },
            { id: 'c', text: 'kún tártibi', match: true },
            { id: 'd', text: 'bayanatshı', match: true },
            { id: 'e', text: 'hawa rayı', match: false }
          ]
        }
      }
    },
    {
      id: 'kq25q5',
      prompt: 'Telegrammanıń tiykarǵı talabı qanday?',
      hint: 'Sóz kem bolıwı kerek.',
      explanation: 'Qısqa hám anıq bolıw.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qısqa hám anıq', 'uzın hám kórkem', 'qosıq túrinde', 'tek orıs tilinde'], answerIndex: 0 } }
    },
    {
      id: 'kq25q6',
      prompt: 'Telegramma tekstin tártipke salıń.',
      hint: '«Sizdi tuwılǵan kúnińiz benen…»',
      explanation: 'Sizdi tuwılǵan kúnińiz benen qutlıqlayman.',
      widget: { type: 'sentence_order', props: { words: ['Sizdi', 'tuwılǵan', 'kúnińiz', 'benen', 'qutlıqlayman.'] } }
    },
    {
      id: 'kq25q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Kúndelik hám xabarlama.',
      explanation: 'Kúndelikte sáne jazıladı; xabarlama orınlanǵan jumıs haqqında; aktte faktler sanı menen anıq kórsetiledi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kúndelikte hár jazıwdıń sánesi kórsetiledi.', value: true },
            { text: 'Xabarlama bolajaq jıynalısqa shaqıradı.', value: false },
            { text: 'Aktte faktler anıq, san menen kórsetiledi.', value: true },
            { text: 'Telegrammada mánzil kórsetilmeydi.', value: false }
          ]
        }
      }
    }
  ]
};
