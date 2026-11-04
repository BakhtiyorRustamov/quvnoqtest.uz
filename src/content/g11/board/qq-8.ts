import type { BoardLesson } from './types';
import { QQ_G2 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 4–5, 34–38-betler — Funkcionallıq stiller hám sóylew stili. */
export const QQ_8: BoardLesson = {
  n: 8,
  label: '8',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G2,
  title: 'Funkcionallıq stiller, sóylew stili',
  section: '§ 4 — 5. Qaraqalpaq tiliniń funkcionallıq stilleri hám sóylew mádeniyatı. Sóylew stili',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Tildiń eń áhmiyetli jámiyetlik xızmetleri — sóylesiw, xabarlaw hám tásir etiw. Usı xızmetlerge sáykes funkcionallıq stiller qáliplesken: sóylew stili, ilimiy stil, rásmiy is qaǵazları stili, publicistikalıq stil hám kórkem ádebiyat stili. Ilimiy, publicistikalıq hám rásmiy stiller monolog túrinde qollanıladı — bular jazba stiller; sóylew stili dialog xarakterinde boladı. Stiller bir-birinen pútkilley ajıralǵan emes, olar óz ara tıǵız baylanıslı.',
      easy: 'Tildiń úsh xızmeti: sóylesiw, xabarlaw, tásir etiw. Stiller: sóylew, ilimiy, rásmiy, publicistikalıq, kórkem.',
      draw: [
        { t: 'title', text: 'Funkcionallıq stiller' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 30, h: 12, text: 'sóylew stili', color: 'orange' },
        { t: 'text', x: 4, y: 33, text: 'dialog', size: 's', color: 'orange' },
        { t: 'box', id: 'b', x: 40, y: 15, w: 56, h: 12, text: 'jazba stiller — monolog', color: 'blue' },
        { t: 'list', x: 42, y: 33, items: ['ilimiy', 'rásmiy is qaǵazları', 'publicistikalıq', 'kórkem ádebiyat'], color: 'blue' }
      ],
      next: 'Sóylew stiliniń ózgeshelikleri'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Sóylew stili adamlardıń sóylesiwinde qollanıladı hám onda qatań qáliplesken normalar bolmaydı. Onda dublet sózler qatar aytıladı: shamal — samal, jaman — yaman, topıraq — torpaq. Ayırım sesler túsip qaladı: ákepti — alıp kelipti, boptı — bolıptı. Evfemizmler, tańlaqlar, qısqartılǵan sózler — centr, zam — jiyi ushırasadı. Tolıq emes gápler hám qısqa soraw gápler kóp: «Atıńız? Mánzilińiz?». Pikirdiń áhmiyetli bólegi gáptiń basına shıǵarıladı — inversiya.',
      easy: 'Sóylesiwde sózler qısqarıp aytıladı (boptı, ákepti), gápler tolıq bolmaydı (Atıńız?), inversiya kóp.',
      draw: [
        { t: 'title', text: 'Sóylew stili' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['ózgeshelik', 'mısal'],
            ['dublet sózler', 'shamal — samal'],
            ['ses túsiwi', 'boptı (bolıptı)'],
            ['qısqartıw', 'centr, zam'],
            ['tolıq emes gáp', 'Atıńız? Mánzilińiz?']
          ]
        }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Tildiń jámiyetlik xızmetleri: sóylesiw, xabarlaw, tásir etiw.',
    'Funkcionallıq stiller: sóylew, ilimiy, rásmiy is qaǵazları, publicistikalıq, kórkem ádebiyat.',
    'Jazba stiller monolog túrinde, sóylew stili dialog túrinde qollanıladı.',
    'Sóylew stilinde dublet sózler, ses túsiwi, qısqartıwlar, tolıq emes gápler hám inversiya jiyi ushırasadı.'
  ],
  questions: [
    {
      id: 'kq8q1',
      prompt: 'Tildiń úsh tiykarǵı jámiyetlik xızmetin belgileń.',
      hint: 'Sóylesiw, xabarlaw, …',
      explanation: 'Sóylesiw, xabarlaw hám tásir etiw.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'sóylesiw', match: true },
            { id: 'b', text: 'xabarlaw', match: true },
            { id: 'c', text: 'tásir etiw', match: true },
            { id: 'd', text: 'esaplaw', match: false },
            { id: 'e', text: 'súwretlew', match: false }
          ]
        }
      }
    },
    {
      id: 'kq8q2',
      prompt: 'Stillerdi toparlarǵa ajıratıń.',
      hint: 'Dialog yamasa monolog?',
      explanation: 'Sóylew stili — dialog; ilimiy, rásmiy, publicistikalıq — monolog (jazba stiller).',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'd', label: 'dialog' }, { id: 'm', label: 'monolog (jazba)' }],
          tiles: [
            { id: 'a', label: 'sóylew stili', bin: 'd' },
            { id: 'b', label: 'ilimiy stil', bin: 'm' },
            { id: 'c', label: 'rásmiy is qaǵazları stili', bin: 'm' },
            { id: 'e', label: 'publicistikalıq stil', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'kq8q3',
      prompt: 'Sóylew stilinde túsip qalǵan sesti tolıq formasına keltiriń.',
      hint: 'Ákepti — alıp kelipti.',
      explanation: 'boptı — bolıptı; ákepti — alıp kelipti; kelip-ek — kelip edik.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'boptı' }, right: { label: 'bolıptı' } },
            { left: { label: 'ákepti' }, right: { label: 'alıp kelipti' } },
            { left: { label: 'kelip-ek' }, right: { label: 'kelip edik' } }
          ]
        }
      }
    },
    {
      id: 'kq8q4',
      prompt: '«Atıńız? Familiyańız? Mánzilińiz?» — bul sóylew stiliniń qaysı ózgesheligi?',
      hint: 'Gáp qısqartılǵan.',
      explanation: 'Soraw gáplerdiń qısqartılıp qollanılıwı (tolıq emes gápler).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qısqartılǵan soraw gápler', 'dublet sózler', 'evfemizmler', 'ilimiy terminler'], answerIndex: 0 } }
    },
    {
      id: 'kq8q5',
      prompt: 'Dublet sózlerdiń jubın tabıń: shamal — …',
      hint: 'Bir ses ózgergen.',
      explanation: 'shamal — samal.',
      widget: { type: 'text_answer', props: { before: 'shamal —', after: '', answer: 'samal', width: 6 } }
    },
    {
      id: 'kq8q6',
      prompt: 'Pikirdiń áhmiyetli bólegin gáptiń basına shıǵarıp aytıw qalay ataladı?',
      hint: 'Sózlerdiń orın tártibi ózgeredi.',
      explanation: 'Inversiya.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['inversiya', 'evfemizm', 'abbreviatura', 'dialektizm'], answerIndex: 0 } }
    },
    {
      id: 'kq8q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Stiller óz ara baylanıslı.',
      explanation: 'Stiller óz ara tıǵız baylanıslı; sóylew stilinde qatań normalar joq; diktordıń sóylewi ádebiy normaǵa súyenedi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Stiller bir-birinen pútkilley ajıralǵan.', value: false },
            { text: 'Sóylew stilinde burınnan qáliplesken qatań normalar bolmaydı.', value: true },
            { text: 'Radio diktorınıń sóylewi ádebiy til normaların saqlaydı.', value: true },
            { text: 'Sóylew stili monolog túrinde ǵana boladı.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq8q8',
      prompt: 'Sóylew tilindegi qısqartılǵan sózdi (abbreviaturanı) tabıń.',
      hint: 'Sózdiń dáslepki bólegi ǵana aytılǵan.',
      explanation: '«zam» — «orınbasar» mánisindegi qısqartıw.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'mektep' }, { text: 'kitap' }, { text: 'qalam' }, { text: 'zam', odd: true }] } }
    }
  ]
};
