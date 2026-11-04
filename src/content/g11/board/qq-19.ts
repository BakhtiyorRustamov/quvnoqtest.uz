import type { BoardLesson } from './types';
import { QQ_G4 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 22–23, 79–81-betler — Sóylew texnikası, jámiyetshilik aldında sóylew. */
export const QQ_19: BoardLesson = {
  n: 19,
  label: '19',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G4,
  title: 'Sóylew texnikası',
  section: '§ 22 — 23. Sóylew mádeniyatı hám sóylew texnikası. Jámiyetshilik aldında sóylew',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Sóylew texnikası — dawıstıń sapası, durıs dem alıw, pát, talaffuz, diksiya. Jámiyetshilik aldında sóylew — juwapkershilikli jumıs. Albıramaw ushın aldın-ala tayarlanıw kerek. Talaplar: tıńlawshılar biletuǵın nárseni qaytalamaw; jańalıǵı bar, mazmunlı bolıw; anıq bilmegen fakttı aytpaw; tıńlawshılardı húrmetlew, maqtanbaw. Dawıs auditoriyaǵa say bolsın: tar auditoriyada baqırmaw, keńinde áste sóylemew. Qoldı orınsız sermew, qaltaǵa salıw, qaǵazdan kóz almay oqıw — kemshilik. «Kóp sóz — kómir, az sóz — altın».',
      easy: 'Tayarlanıp shıǵıń, tıńlawshını húrmetleń, dawıstı auditoriyaǵa say etiń, orınsız qıymıl jasamań, qaǵazǵa qarap oqımań.',
      draw: [
        { t: 'title', text: 'Kópshilik aldında sóylew' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 10, text: 'kerek', color: 'green' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 10, text: 'kerek emes', color: 'red' },
        { t: 'list', x: 6, y: 30, items: ['aldın tayarlanıw', 'jańalıq, mazmun', 'tıńlawshını húrmetlew'], color: 'green' },
        { t: 'list', x: 54, y: 30, items: ['maqtanıw', 'qoldı sermew', 'qaǵazdan oqıw'], color: 'red' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Sóylew texnikası — dawıs sapası, durıs dem alıw, pát, talaffuz, diksiya.',
    'Jámiyetshilik aldında albıramaw ushın aldın-ala tayarlanıw kerek; tıńlawshılardı húrmetlew, maqtanbaw shárt.',
    'Dawıs auditoriyaǵa say bolıwı, orınsız qıymıllar hám qaǵazdan kóz almay oqıw bolmawı kerek.'
  ],
  questions: [
    {
      id: 'kq19q1',
      prompt: 'Sóylew texnikasına neler kiredi?',
      hint: 'Dawıs hám dem.',
      explanation: 'Dawıstıń sapası, durıs dem alıw, pát, talaffuz, diksiya.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'dawıstıń sapası', match: true },
            { id: 'b', text: 'durıs dem alıw', match: true },
            { id: 'c', text: 'diksiya', match: true },
            { id: 'd', text: 'qol jazba', match: false },
            { id: 'e', text: 'imla', match: false }
          ]
        }
      }
    },
    {
      id: 'kq19q2',
      prompt: 'Sheshenniń háreketlerin ajıratıń.',
      hint: 'Tıńlawshınıń dıqqatın bólmew kerek.',
      explanation: 'Kerek: aldın tayarlanıw, tıńlawshıǵa qaraw. Kerek emes: qoldı sermew, qolın qaltasına salıw, qaǵazdan kóz almay oqıw.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'y', label: 'kerek' }, { id: 'n', label: 'kerek emes' }],
          tiles: [
            { id: 'a', label: 'aldın-ala tayarlanıw', bin: 'y' },
            { id: 'b', label: 'tıńlawshılardı húrmetlew', bin: 'y' },
            { id: 'c', label: 'qoldı ońlı-sońlı sermew', bin: 'n' },
            { id: 'd', label: 'qolın qaltasına salıw', bin: 'n' },
            { id: 'e', label: 'qaǵazdan kóz almay oqıw', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'kq19q3',
      prompt: 'Tar auditoriyada, az adamǵa qalay sóylew kerek?',
      hint: 'Dawıs auditoriyaǵa say.',
      explanation: 'Baqırmay, ortasha dawıs penen.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['baqırmay, ortasha dawıs penen', 'baqırıp', 'sıbırlap', 'qaǵazdan oqıp'], answerIndex: 0 } }
    },
    {
      id: 'kq19q4',
      prompt: 'Naqıldı tolıqtırıń.',
      hint: 'Kómir hám altın.',
      explanation: '«Kóp sóz — kómir, az sóz — altın».',
      widget: { type: 'text_answer', props: { before: 'Kóp sóz — kómir, az sóz —', after: '.', answer: 'altın', width: 6 } }
    },
    {
      id: 'kq19q5',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Shablon — ónerdiń dushpanı.',
      explanation: 'Shablon sózler sóz óneriniń dushpanı; temadan qısqa shetlew zeriktirmeydi; anıq bilmegen fakttı aytpaw kerek.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Aytıla-aytıla sıyqası shıqqan shablon sózlerden baslaw kerek.', value: false },
            { text: 'Temadan qısqa waqıtqa shetlew tıńlawshını shaqqanlastıradı.', value: true },
            { text: 'Anıq bilmegen fakttı aytpaw kerek.', value: true },
            { text: '«Men sizlerden aqıllıraqpan» degen qatnas tıńlawshını tartadı.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq19q6',
      prompt: 'Sheshen albıramaw ushın ne isleydi?',
      hint: 'Tayarlıq.',
      explanation: 'Aldın-ala tayarlanadı: ne hám qalay aytatuǵının oylap, jobalastıradı.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['aldın-ala tayarlanadı', 'tez sóyleydi', 'kóp hazil aytadı', 'tıńlawshıǵa qaramaydı'], answerIndex: 0 } }
    },
    {
      id: 'kq19q7',
      prompt: 'Naqıldıń sózlerin tártipke salıń.',
      hint: '«Júyeli sóz …»',
      explanation: 'Júyeli sóz iyesin tabadı.',
      widget: { type: 'sentence_order', props: { words: ['Júyeli', 'sóz', 'iyesin', 'tabadı.'] } }
    }
  ]
};
