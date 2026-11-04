import type { BoardLesson } from './types';
import { QQ_G2 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), 41–45-betler — Sóylew mádeniyatın iyelewdiń usıl hám jolları. Sóylew etiketi. */
export const QQ_9: BoardLesson = {
  n: 9,
  label: '9',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G2,
  title: 'Sóylew mádeniyatın iyelew, etiket',
  section: 'Sóylew mádeniyatın iyelewdiń usıl hám jolları. Sóylew etiketi',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Ádebiy tildi úyreniw hám iyelew tórt jol menen ámelge asadı. Birinshi — tildi tábiyǵıy halda, shańaraqta hám átirapta iyelew. Ekinshi — mektepte oqıtıw hám úyreniw arqalı. Úshinshi — óz ústinde islew: sabaqlıq, sózlik hám kórkem ádebiyattı ózbetinshe oqıw. Tórtinshi — sheber sóylewshilerge eliklew: diktorlar, artistler, jazıwshılar, alımlar. Hár jaǵdayda sóylew mádeniyatı sanalı umtılıw hám tınımsız miynet penen iyelenedi.',
      easy: 'Tórt jol: shańaraqta, mektepte, ózbetinshe oqıp hám sheber sóylewshilerge eliklep úyreniw.',
      draw: [
        { t: 'title', text: 'Tórt jol' },
        { t: 'list', x: 6, y: 16, items: ['1. tábiyǵıy halda (shańaraq)', '2. oqıtıw arqalı (mektep)', '3. óz ústinde islew (kitap, sózlik)', '4. sheber sóylewshilerge eliklew'], color: 'blue' }
      ],
      next: 'Sóylew etiketi'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Ritorika — oratorlıq óneriniń teoriyası haqqında pán. Áyyemgi Greciyada sofistler payda boldı: olar jáhán tariyxında birinshi márte pul alıp oqıtqan muǵallimler edi, etika, ritorika, grammatika, tariyx, siyasattı úyretti. «Eris» — grekshe «báseke», sonnan eristikler atı kelip shıqqan. Oratorlıq ónerin úyretkenler keyin ritorlar dep ataldı. Oratorlıqtıń kórinisleri: sociallıq-siyasiy bayanatlar, úgit-násiyat, akademiyalıq sóylew, suddaǵı sóylew.',
      easy: 'Ritorika — sheshenlik haqqında pán. Sofistler — pul alıp oqıtqan dáslepki muǵallimler. Eris — báseke.',
      draw: [
        { t: 'title', text: 'Ritorika' },
        { t: 'box', id: 'a', x: 2, y: 15, w: 30, h: 12, text: 'sofistler', color: 'blue' },
        { t: 'box', id: 'b', x: 35, y: 15, w: 30, h: 12, text: 'eristikler', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 15, w: 30, h: 12, text: 'ritorlar', color: 'purple' },
        { t: 'text', x: 2, y: 34, text: 'pul alıp oqıtqan', size: 's', color: 'blue' },
        { t: 'text', x: 35, y: 34, text: 'eris — báseke', size: 's', color: 'green' },
        { t: 'text', x: 68, y: 34, text: 'oratorlıq ustazı', size: 's', color: 'purple' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Ádebiy tildi iyelewdiń tórt jolı: tábiyǵıy halda, oqıtıw arqalı, óz ústinde islew, sheber sóylewshilerge eliklew.',
    'Ritorika — oratorlıq óneriniń teoriyalıq tiykarları haqqında pán.',
    'Sofistler — birinshi márte pul alıp oqıtqan muǵallimler; «eris» — báseke; ritorlar — oratorlıq ustazları.'
  ],
  questions: [
    {
      id: 'kq9q1',
      prompt: 'Ádebiy tildi iyelewdiń jolların tártip penen jaylastırıń.',
      hint: 'Shańaraqtan baslanadı.',
      explanation: 'Tábiyǵıy halda → oqıtıw arqalı → óz ústinde islew → eliklew.',
      widget: { type: 'step_order', props: { steps: ['tildi tábiyǵıy halda iyelew', 'oqıtıw hám úyreniw arqalı iyelew', 'óz ústinde islew arqalı úyreniw', 'sóylewge eliklew'] } }
    },
    {
      id: 'kq9q2',
      prompt: 'Balanıń ana tilin shańaraqta úyreniwi qaysı jolǵa kiredi?',
      hint: 'Birinshi jol.',
      explanation: 'Tildi tábiyǵıy halda iyelew.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tábiyǵıy halda iyelew', 'eliklew', 'óz ústinde islew', 'oqıtıw arqalı'], answerIndex: 0 } }
    },
    {
      id: 'kq9q3',
      prompt: 'Sóylewge eliklew ushın kimler úlgi bola aladı?',
      hint: 'Sheber sóylewshiler.',
      explanation: 'Radio-televidenie diktorları, belgili artistler, jazıwshılar, alımlar.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'diktorlar', match: true },
            { id: 'b', text: 'artistler', match: true },
            { id: 'c', text: 'jazıwshılar', match: true },
            { id: 'd', text: 'jargon qollanıwshılar', match: false },
            { id: 'e', text: 'kóp sóyleytuǵın adamlar', match: false }
          ]
        }
      }
    },
    {
      id: 'kq9q4',
      prompt: '«Ritorika» ne mánini ańlatadı?',
      hint: 'Ilimiy termin.',
      explanation: 'Oratorlıq óneri, onıń teoriyalıq tiykarları haqqında pán.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oratorlıq óneri haqqında pán', 'imla qaǵıydaları', 'grammatika bólimi', 'sózlik túri'], answerIndex: 0 } }
    },
    {
      id: 'kq9q5',
      prompt: 'Jáhán tariyxında birinshi márte pul alıp oqıtqan muǵallimler kimler?',
      hint: 'Áyyemgi Greciya.',
      explanation: 'Sofistler.',
      widget: { type: 'text_answer', props: { before: '', after: '— birinshi márte pul alıp oqıtqan muǵallimler.', answer: ['sofistler', 'Sofistler'], width: 10 } }
    },
    {
      id: 'kq9q6',
      prompt: 'Grekshe «eris» sózi neni bildiredi?',
      hint: 'Eristikler.',
      explanation: '«Eris» — báseke.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['báseke', 'bilim', 'sóz', 'dos'], answerIndex: 0 } }
    },
    {
      id: 'kq9q7',
      prompt: 'Oratorlıq óneriniń kórinisine kirmeytuǵının tabıń.',
      hint: 'Úshewi — kópshilik aldında sóylew.',
      explanation: 'Akademiyalıq sóylew, suddaǵı sóylew, úgit-násiyat — oratorlıq kórinisleri; «kúndelik jazıw» — olay emes.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'akademiyalıq sóylew' }, { text: 'suddaǵı sóylew' }, { text: 'úgit-násiyat' }, { text: 'kúndelik jazıw', odd: true }] } }
    },
    {
      id: 'kq9q8',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Sóylew mádeniyatı ózinen-ózi kelmeydi.',
      explanation: 'Sóylew mádeniyatı sanalı umtılıw hám miynet penen iyelenedi; sofistler etika, ritorika, grammatika, tariyx, siyasattı oqıtqan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sóylew mádeniyatı sanalı umtılıw hám tınımsız miynet penen iyelenedi.', value: true },
            { text: 'Sofistler tek matematikanı oqıtqan.', value: false },
            { text: 'Kórkem ádebiyattı ózbetinshe oqıw sóz baylıǵın arttıradı.', value: true },
            { text: 'Sheber sóylewshige eliklew — zıyanlı ádet.', value: false }
          ]
        }
      }
    }
  ]
};
