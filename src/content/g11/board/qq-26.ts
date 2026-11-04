import type { BoardLesson } from './types';
import { QQ_G6 } from './qq-groups';

/** Tákirarlaw (sorawlar): pútkil sabaqlıq boyınsha — universitetke kiriw testlerine tayarlıq. */
export const QQ_26: BoardLesson = {
  n: 26,
  label: '26',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G6,
  title: 'Tákirarlaw: aralas test',
  section: 'Tákirarlaw ushın shınıǵıwlar',
  revision: true,
  steps: [],
  summary: [],
  questions: [
    {
      id: 'kq26q1',
      prompt: 'Qaraqalpaq jazba ádebiy tili qaysı ásirde qáliplese basladı?',
      hint: 'Kúnxoja, Ájiniyaz, Berdaq dáwiri.',
      explanation: 'XIX ásirde.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['XIX ásir', 'XI ásir', 'XV ásir', 'XX ásirdiń aqırı'], answerIndex: 0 } }
    },
    {
      id: 'kq26q2',
      prompt: 'Sóylew mádeniyatınıń belgisin mánisi menen sáykeslendiriń.',
      hint: 'Tazalıq — jat sózlersiz.',
      explanation: 'durıslıq — normaǵa sáykeslik; anıqlıq — sóz benen zattıń sáykesligi; logikalılıq — izbe-izlik; tazalıq — jat birliklersiz.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'durıslıq' }, right: { label: 'ádebiy normaǵa sáykeslik' } },
            { left: { label: 'anıqlıq' }, right: { label: 'sóz benen zattıń sáykesligi' } },
            { left: { label: 'logikalılıq' }, right: { label: 'pikirdiń izbe-izligi' } },
            { left: { label: 'tazalıq' }, right: { label: 'jat birliklerden azatlıq' } }
          ]
        }
      }
    },
    {
      id: 'kq26q3',
      prompt: '«Ádeptiń bası — til» degen kim?',
      hint: '«Devonu luǵat-at túrk».',
      explanation: 'Maxmud Qashǵariy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Maxmud Qashǵariy', 'Yusup Has Hajib', 'Ájiniyaz', 'Farabiy'], answerIndex: 0 } }
    },
    {
      id: 'kq26q4',
      prompt: 'Mısaldıń kórkemlew quralın anıqlań.',
      hint: '-tay — teńew; qaytalanıw — figura.',
      explanation: 'tal shıbıqtay qıpsha beli — teńew; Lashın edim — metafora; Sahra búlbili — perifraz; Aydıń on besi jarıq, on besi qarańǵı — antiteza.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'tal shıbıqtay qıpsha beli' }, right: { label: 'teńew' } },
            { left: { label: 'Lashın edim — qanatımnan qayrıldım' }, right: { label: 'metafora' } },
            { left: { label: 'Sahra búlbili' }, right: { label: 'perifraz' } },
            { left: { label: 'Aydıń on besi jarıq, on besi qarańǵı' }, right: { label: 'antiteza' } }
          ]
        }
      }
    },
    {
      id: 'kq26q5',
      prompt: 'Qaraqalpaq tilinde sózlik pát qaysı buwınǵa túsedi?',
      hint: 'Turaqlı pát.',
      explanation: 'Aqırǵı buwınǵa.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['aqırǵı', 'birinshi', 'ortańǵı', 'erkin'], answerIndex: 0 } }
    },
    {
      id: 'kq26q6',
      prompt: 'Sózlerdi toparlarǵa ajıratıń.',
      hint: 'Troplar — leksikalıq, figuralar — sintaksislik.',
      explanation: 'Troplar: epitet, metafora, giperbola. Figuralar: anafora, epifora, inversiya.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 't', label: 'troplar' }, { id: 'f', label: 'stilistikalıq figuralar' }],
          tiles: [
            { id: 'a', label: 'epitet', bin: 't' },
            { id: 'b', label: 'metafora', bin: 't' },
            { id: 'c', label: 'giperbola', bin: 't' },
            { id: 'd', label: 'anafora', bin: 'f' },
            { id: 'e', label: 'epifora', bin: 'f' },
            { id: 'g', label: 'inversiya', bin: 'f' }
          ]
        }
      }
    },
    {
      id: 'kq26q7',
      prompt: '«Jargon» sóziniń mánisi qanday?',
      hint: 'Francuz sózi.',
      explanation: '«Buzılǵan til».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['buzılǵan til', 'taza til', 'ádebiy til', 'áyyemgi til'], answerIndex: 0 } }
    },
    {
      id: 'kq26q8',
      prompt: 'Funkcionallıq stillerge kirmeytuǵının tabıń.',
      hint: 'Bes stil bar.',
      explanation: 'Ilimiy, publicistikalıq, kórkem — stiller; «dialektlik» — stil emes.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'ilimiy' }, { text: 'publicistikalıq' }, { text: 'kórkem ádebiyat' }, { text: 'dialektlik', odd: true }] } }
    },
    {
      id: 'kq26q9',
      prompt: 'Ciceronnıń sheshenlik sózi qaysı bólim menen juwmaqlanadı?',
      hint: 'Sońǵı bólim.',
      explanation: 'Juwmaq jasaw.',
      widget: { type: 'text_answer', props: { before: 'Sońǵı bólim —', after: 'jasaw.', answer: 'juwmaq', width: 7 } }
    },
    {
      id: 'kq26q10',
      prompt: 'Is qaǵazın onıń belgisi menen sáykeslendiriń.',
      hint: 'Rezolyuciya — kelisim xat.',
      explanation: 'isenim xat — wákillik beriw; kelisim xat — rezolyuciya; kórsetpe — «Tastıyıqlayman»; bayanlama — «Qarar etedi».',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'isenim xat' }, right: { label: 'wákillik beriw' } },
            { left: { label: 'kelisim xat' }, right: { label: 'rezolyuciya' } },
            { left: { label: 'kórsetpe' }, right: { label: '«Tastıyıqlayman»' } },
            { left: { label: 'bayanlama' }, right: { label: '«Qarar etedi»' } }
          ]
        }
      }
    },
    {
      id: 'kq26q11',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Pútkil sabaqlıq boyınsha.',
      explanation: 'Gimnniń sózi I. Yusupovtiki; «stil» — grekshe «stulos»; sofistler pul alıp oqıtqan; dialektizm avtor sózinde emes, personaj tilinde maqsetke muwapıq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Qaraqalpaqstan gimniniń sózi I. Yusupovtiki.', value: true },
            { text: '«Stil» sózi grekshe «stulos» sózinen alınǵan.', value: true },
            { text: 'Sofistler biypul oqıtqan.', value: false },
            { text: 'Dialektizm avtor sózinde qollanılsa maqsetke muwapıq.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq26q12',
      prompt: '«Kesel» sóziniń ornına qollanılatuǵın jumsaq sinonim qaysı?',
      hint: 'Janǵa azar bermeytuǵın sóz.',
      explanation: '«Nawqas» (biytap, awırıw).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['nawqas', 'ólik', 'saw', 'kúshli'], answerIndex: 0 } }
    }
  ]
};
