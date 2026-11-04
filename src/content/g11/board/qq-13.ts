import type { BoardLesson } from './types';
import { QQ_G3 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 14–15, 56–59-betler — Sóylewdiń baylıǵı. Troplar: epitet, teńew, metafora, metonimiya, sinekdoxa. */
export const QQ_13: BoardLesson = {
  n: 13,
  label: '13',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G3,
  title: 'Troplar: epitet, teńew, metafora',
  section: '§ 14 — 15. Sóylewdiń baylıǵı. Leksikalıq kórkemlew quralları — troplar',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Sóylewdiń baylıǵı ushın tildiń kórkemlew quralları qollanıladı. Olar eki túrli: leksikalıq — troplar hám sintaksislik — stilistikalıq figuralar. Trop — sózdiń tuwra mánisinen awıspalı mánide qollanılıwı. Epitet — zattıń belgisin obrazlı kórsetetuǵın sóz: Ájiniyazda «qara kózli, shiyrin sózli dilbarım». Teńew — eki zattı salıstırıw, -day, -dey, -tay, -tey qosımtaları yamasa yańlı, misli, kibi sózleri menen jasaladı: «Tal shıbıqtay qıpsha beli» (Ájiniyaz). Metafora — teńelgen zat atalmay, tek ekinshi zat penen aytıladı: «Lashın edim — qanatımnan qayrıldım» (Omar).',
      easy: 'Epitet — obrazlı belgi (shiyrin sózli). Teńew — -day/-dey menen salıstırıw (tal shıbıqtay). Metafora — jasırın teńew (lashın edim).',
      draw: [
        { t: 'title', text: 'Troplar 1' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['trop', 'mısal'],
            ['epitet', 'qara kózli, shiyrin sózli'],
            ['teńew', 'tal shıbıqtay qıpsha beli'],
            ['metafora', 'Lashın edim — qanatımnan qayrıldım']
          ]
        },
        { t: 'text', x: 4, y: 42, text: 'teńew: -day, -dey, -tay, -tey; yańlı, misli, kibi', size: 's', color: 'orange' }
      ],
      next: 'Metonimiya hám sinekdoxa'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Metonimiya — eki zattıń ishki yamasa sırtqı baylanısına qaray sózdiń awıspalı mánide qollanılıwı: avtor ornına shıǵarması — «Betxovendi tıńladı», orın ornına adamlar — «Pútkil auditoriya shawqım kóterdi». Sinekdoxa — metonimiyanıń bir túri: kóplik ornına birlik, pútin ornına bólek aytıladı, mısalı «talay baslar» degende adamlar názerde tutıladı.',
      easy: 'Metonimiya — baylanısqa qaray atı almasadı (auditoriya = ondaǵı adamlar). Sinekdoxa — bólek arqalı pútindi aytıw (bas = adam).',
      draw: [
        { t: 'title', text: 'Metonimiya, sinekdoxa' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 12, text: 'metonimiya', color: 'blue' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'sinekdoxa', color: 'green' },
        { t: 'text', x: 4, y: 34, text: 'auditoriya = adamlar', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 40, text: 'Betxoven = onıń muzıkası', size: 's', color: 'blue' },
        { t: 'text', x: 52, y: 34, text: 'bas = adam', size: 's', color: 'green' },
        { t: 'text', x: 52, y: 40, text: 'bólek → pútin', size: 's', color: 'green' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Kórkemlew quralları: leksikalıq (troplar) hám sintaksislik (stilistikalıq figuralar).',
    'Epitet — obrazlı belgi; teńew — -day/-dey, yańlı, misli, kibi arqalı salıstırıw; metafora — teńelgen zat atalmaytuǵın jasırın teńew.',
    'Metonimiya — baylanısqa qaray atı awısıw; sinekdoxa — bólek arqalı pútindi, birlik arqalı kóplikti aytıw.'
  ],
  questions: [
    {
      id: 'kq13q1',
      prompt: 'Troptı mısalı menen sáykeslendiriń.',
      hint: '-tay qosımtası — teńew.',
      explanation: 'epitet — shiyrin sózli dilbarım; teńew — tal shıbıqtay qıpsha beli; metafora — Lashın edim — qanatımnan qayrıldım.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'epitet' }, right: { label: 'shiyrin sózli dilbarım' } },
            { left: { label: 'teńew' }, right: { label: 'tal shıbıqtay qıpsha beli' } },
            { left: { label: 'metafora' }, right: { label: 'Lashın edim — qanatımnan qayrıldım' } }
          ]
        }
      }
    },
    {
      id: 'kq13q2',
      prompt: 'Teńew jasaytuǵın qosımtalardı belgileń.',
      hint: 'Tal shıbıq-tay.',
      explanation: '-day, -dey, -tay, -tey.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: '-day', match: true },
            { id: 'b', text: '-dey', match: true },
            { id: 'c', text: '-tay', match: true },
            { id: 'd', text: '-tey', match: true },
            { id: 'e', text: '-lar', match: false },
            { id: 'f', text: '-dı', match: false }
          ]
        }
      }
    },
    {
      id: 'kq13q3',
      prompt: '«Pútkil auditoriya shawqım kóterdi» gápinde qaysı trop bar?',
      hint: 'Orın ornına ondaǵı adamlar.',
      explanation: 'Metonimiya: auditoriya — ondaǵı adamlar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['metonimiya', 'epitet', 'teńew', 'giperbola'], answerIndex: 0 } }
    },
    {
      id: 'kq13q4',
      prompt: 'Metaforanıń teńewden parqı nede?',
      hint: 'Teńewde eki zat ta atıladı.',
      explanation: 'Metaforada teńeletuǵın zat atalmaydı, tek ekinshi zat penen ańlatıladı; sonlıqtan obrazlılıǵı kúshlirek.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['teńeletuǵın zat atalmaydı', '-day qosımtası qosıladı', 'eki zat ta atıladı', 'tek sanlar qollanıladı'], answerIndex: 0 } }
    },
    {
      id: 'kq13q5',
      prompt: 'Sinekdoxa — qaysı troptıń bir túri?',
      hint: 'Baylanısqa qaray awısıw.',
      explanation: 'Metonimiyanıń bir túri.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['metonimiya', 'metafora', 'epitet', 'teńew'], answerIndex: 0 } }
    },
    {
      id: 'kq13q6',
      prompt: 'Mısallardı trop túrine ajıratıń.',
      hint: '-day, -dey — teńew.',
      explanation: 'Teńew: jawırınları qaqpaqtay, bilekleri toqpaqtay; epitet: qara kózli, ay júzli.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 't', label: 'teńew' }, { id: 'e', label: 'epitet' }],
          tiles: [
            { id: 'a', label: 'jawırınları qaqpaqtay', bin: 't' },
            { id: 'b', label: 'bilekleri toqpaqtay', bin: 't' },
            { id: 'c', label: 'qara kózli', bin: 'e' },
            { id: 'd', label: 'ay júzli jamal', bin: 'e' }
          ]
        }
      }
    },
    {
      id: 'kq13q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Trop — awıspalı máni.',
      explanation: 'Trop — sózdiń awıspalı mánide qollanılıwı; troplar leksikalıq, figuralar sintaksislik kórkemlew quralları; metaforada obrazlılıq kúshlirek.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Trop — sózdiń awıspalı mánide qollanılıwı.', value: true },
            { text: 'Troplar — sintaksislik kórkemlew quralları.', value: false },
            { text: 'Metaforada obrazlılıq teńewge qaraǵanda kúshlirek.', value: true },
            { text: 'Teńew «yańlı, misli, kibi» sózleri menen de jasaladı.', value: true }
          ]
        }
      }
    },
    {
      id: 'kq13q8',
      prompt: 'Trop bolmaytuǵın túsinikti tabıń.',
      hint: 'Úshewi — troplar.',
      explanation: 'Epitet, metafora, metonimiya — troplar; anafora — stilistikalıq figura.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'epitet' }, { text: 'metafora' }, { text: 'metonimiya' }, { text: 'anafora', odd: true }] } }
    }
  ]
};
