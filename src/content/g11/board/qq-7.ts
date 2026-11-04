import type { BoardLesson } from './types';
import { QQ_G2 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 4–5, 32–34-betler — Qaraqalpaq ádebiy tiliniń normaları. */
export const QQ_7: BoardLesson = {
  n: 7,
  label: '7',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G2,
  title: 'Ádebiy tildiń normaları',
  section: '§ 4 — 5. Fonetikalıq, orfografiyalıq, orfoepiyalıq, akcentologiyalıq, punktuaciyalıq, grammatikalıq, leksikalıq, stillik normalar',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Qaraqalpaq ádebiy tiliniń normaları: fonetikalıq, orfografiyalıq, orfoepiyalıq, akcentologiyalıq, punktuaciyalıq, grammatikalıq, leksika-semantikalıq, stillik hám sóz jasalıw normaları. Fonetikalıq norma álipbedegi sesler sisteması menen baylanıslı. Orfografiyalıq norma — imla qádeleri: túbir hám qosımta, qospa hám jup sózler, buwınǵa bóliw, bas hárip. Orfoepiyalıq norma — sózlerdiń awızeki durıs aytılıwı. Akcentologiyalıq norma — pátti durıs qoyıw. Punktuaciyalıq norma — irkilis belgilerin durıs qoyıw.',
      easy: 'Imla — jazıw norması, orfoepiya — aytıw norması, akcentologiya — pát norması, punktuaciya — irkilis belgileri norması.',
      draw: [
        { t: 'title', text: 'Normalar' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['norma', 'neni retleydi'],
            ['orfografiyalıq', 'durıs jazıw (imla)'],
            ['orfoepiyalıq', 'durıs aytıw'],
            ['akcentologiyalıq', 'pátti durıs qoyıw'],
            ['punktuaciyalıq', 'irkilis belgileri'],
            ['grammatikalıq', 'gáp dúziw, qosımtalar']
          ]
        }
      ],
      next: 'Sóz hám stil normaları'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Grammatikalıq norma — gáp dúziw, sóz hám qosımtalar arasındaǵı qatnas, baslawısh penen bayanlawıshtıń kelisiwi, sózlerdiń orın tártibi. Leksikalıq normada sinonimler áhmiyetli orın tutadı: sóylew jaǵdayına sáykes emes sinonimdi qollanıw qátege alıp keledi. Semantikalıq norma kóp mánili sózdiń qaysı mánisin qollanıwdı belgileydi, bunda sózliklerdiń áhmiyeti úlken. Stillik normanıń baslı ólshemi — maqsetke muwapıqlıq.',
      easy: 'Leksikalıq norma — durıs sóz tańlaw (sinonimler). Stillik norma — maqsetke sáykes qollanıw.',
      draw: [
        { t: 'title', text: 'Sóz hám stil' },
        { t: 'box', id: 'a', x: 2, y: 15, w: 30, h: 12, text: 'leksikalıq', color: 'blue' },
        { t: 'box', id: 'b', x: 35, y: 15, w: 30, h: 12, text: 'semantikalıq', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 15, w: 30, h: 12, text: 'stillik', color: 'purple' },
        { t: 'text', x: 2, y: 34, text: 'sinonim tańlaw', size: 's', color: 'blue' },
        { t: 'text', x: 35, y: 34, text: 'sózdiń mánisi', size: 's', color: 'green' },
        { t: 'text', x: 68, y: 34, text: 'maqsetke muwapıq', size: 's', color: 'purple' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Ádebiy til normaları: fonetikalıq, orfografiyalıq, orfoepiyalıq, akcentologiyalıq, punktuaciyalıq, grammatikalıq, leksika-semantikalıq, stillik, sóz jasalıw.',
    'Orfografiya — durıs jazıw, orfoepiya — durıs aytıw, akcentologiya — pát, punktuaciya — irkilis belgileri.',
    'Leksikalıq normada sinonimler, semantikalıq normada sózlikler, stillik normada maqsetke muwapıqlıq áhmiyetli.'
  ],
  questions: [
    {
      id: 'kq7q1',
      prompt: 'Normanı onıń retleytuǵın tárepi menen sáykeslendiriń.',
      hint: 'Orfoepiya — aytıw.',
      explanation: 'orfografiyalıq — durıs jazıw; orfoepiyalıq — durıs aytıw; akcentologiyalıq — pát; punktuaciyalıq — irkilis belgileri.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'orfografiyalıq' }, right: { label: 'durıs jazıw' } },
            { left: { label: 'orfoepiyalıq' }, right: { label: 'durıs aytıw' } },
            { left: { label: 'akcentologiyalıq' }, right: { label: 'pátti durıs qoyıw' } },
            { left: { label: 'punktuaciyalıq' }, right: { label: 'irkilis belgileri' } }
          ]
        }
      }
    },
    {
      id: 'kq7q2',
      prompt: 'Baslawısh penen bayanlawıshtıń kelisiwi qaysı normaǵa tiyisli?',
      hint: 'Gáp dúziw qaǵıydaları.',
      explanation: 'Grammatikalıq normaǵa.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['grammatikalıq', 'orfoepiyalıq', 'fonetikalıq', 'punktuaciyalıq'], answerIndex: 0 } }
    },
    {
      id: 'kq7q3',
      prompt: 'Leksikalıq normada qaysı sózler áhmiyetli orın tutadı?',
      hint: 'Mánisi jaqın sózler.',
      explanation: 'Sinonimler.',
      widget: { type: 'text_answer', props: { before: 'Leksikalıq normada', after: 'áhmiyetli orın tutadı.', answer: 'sinonimler', width: 11 } }
    },
    {
      id: 'kq7q4',
      prompt: 'Orfografiyalıq norma neni óz ishine aladı?',
      hint: 'Imla qádeleri.',
      explanation: 'Túbir hám qosımta, qospa hám jup sózler imlası, buwınǵa bóliw, bas háriplerdi jazıw.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'qospa sózlerdiń imlası', match: true },
            { id: 'b', text: 'buwınǵa bóliw', match: true },
            { id: 'c', text: 'bas háriplerdi jazıw', match: true },
            { id: 'd', text: 'dawıstıń kúshi', match: false },
            { id: 'e', text: 'sóylewdiń tempi', match: false }
          ]
        }
      }
    },
    {
      id: 'kq7q5',
      prompt: 'Stillik normanıń baslı ólshemi ne?',
      hint: 'Maqsetke …',
      explanation: 'Maqsetke muwapıqlıq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['maqsetke muwapıqlıq', 'sózlerdiń kópligi', 'gáptiń uzınlıǵı', 'shet sózlerdi qollanıw'], answerIndex: 0 } }
    },
    {
      id: 'kq7q6',
      prompt: 'Kóp mánili sózdiń qaysı mánisin qollanıwdı qaysı norma belgileydi?',
      hint: 'Bunda sózlikler járdem beredi.',
      explanation: 'Semantikalıq (mánilik) norma.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['semantikalıq', 'punktuaciyalıq', 'akcentologiyalıq', 'fonetikalıq'], answerIndex: 0 } }
    },
    {
      id: 'kq7q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Normalardıń wazıypası.',
      explanation: 'Normalar ádebiy tildi buzılıwdan saqlaydı; orfoepiya awızeki sóylewge tiyisli; sóylew jaǵdayına sáykes emes sinonim — qáte.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Normalar ádebiy tildi hár qıylı buzılıwlardan saqlaydı.', value: true },
            { text: 'Orfoepiyalıq norma tek jazıwǵa tiyisli.', value: false },
            { text: 'Sóylew jaǵdayına sáykes emes sinonimdi qollanıw qátege alıp keledi.', value: true },
            { text: 'Punktuaciyalıq norma pátti retleydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq7q8',
      prompt: 'Qaysısı ádebiy til normalarınıń qatarına kirmeydi?',
      hint: 'Úshewi — ádebiy tildiń normaları.',
      explanation: 'Fonetikalıq, orfografiyalıq, stillik — ádebiy til normaları; «jargon norması» sociallıq toparlarǵa tiyisli.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'fonetikalıq' }, { text: 'orfografiyalıq' }, { text: 'stillik' }, { text: 'jargon', odd: true }] } }
    }
  ]
};
