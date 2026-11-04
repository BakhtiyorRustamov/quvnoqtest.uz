import type { BoardLesson } from './types';
import { QQ_G4 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 18–21, 75–79-betler — Sóylewdiń tásirsheńligi. */
export const QQ_18: BoardLesson = {
  n: 18,
  label: '18',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G4,
  title: 'Sóylewdiń tásirsheńligi',
  section: '§ 18 — 21. Sóylewdiń tásirsheńligi. Dúnya alımlarınıń sheshenlik haqqında pikirleri',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Sóylewdiń tásirsheńligi — sóylew mádeniyatınıń tiykarǵı belgileriniń biri, maqseti tıńlawshınıń sanasına tásir etiw. Durıslıq, anıqlıq, logikalılıq hám tazalıq tásir etiwge xızmet etedi. Tásirli sóylew ushın sóylewshi temanı jaqsı biliwi, tıńlawshılardıń bilim dárejesin, jasın, kewil-keypin esapqa alıwı, anıq jobaǵa iye bolıwı, waqıttı saqlawı kerek. Bilimli adamlar aldında júdá ápiwayı, al ápiwayı tıńlawshılar aldında júdá ilimiy tilde sóylew maqsetke muwapıq emes. Mısallar menen dálillengen sóz isenimli shıǵadı.',
      easy: 'Tásirli sóylew — temanı biliw, tıńlawshını esapqa alıw, joba hám waqıttı saqlaw, mısal menen dálillew.',
      draw: [
        { t: 'title', text: 'Tásirli sóylew ushın' },
        { t: 'list', x: 6, y: 16, items: ['temanı jaqsı biliw', 'tıńlawshını esapqa alıw', 'anıq joba', 'waqıttı saqlaw', 'mısallar menen dálillew'], color: 'green' }
      ],
      next: 'Danalardıń pikirleri'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Danalar sheshenlik haqqında: Nawayı — «Tiliń menen kewlińdi bir tut». Al-Xorezmiy — «Sóz — gúl, is — miywe». Demokrit — «Sóz — istiń kóleńkesi». Aristotel — «Anıqlıq — tildiń tiykarǵı pazıyleti». Ciceron — «Sheshenniń eń úlken qásiyetleriniń biri — kerekli nárseni aytıw ǵana emes, kereksiz nárseni aytpaw». Galiley — «Túsiniksiz sóylew hárkimniń qolınan keledi, anıq sóylew ayırım adamlarǵa ǵana tán».',
      easy: 'Nawayı: «Tiliń menen kewlińdi bir tut». Al-Xorezmiy: «Sóz — gúl, is — miywe». Ciceron: kereksiz nárseni aytpaw kerek.',
      draw: [
        { t: 'title', text: 'Danalar sheshenlik haqqında' },
        { t: 'text', x: 4, y: 15, text: '«Tiliń menen kewlińdi bir tut.» — Nawayı', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 23, text: '«Sóz — gúl, is — miywe.» — Al-Xorezmiy', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 31, text: '«Sóz — istiń kóleńkesi.» — Demokrit', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 39, text: '«Anıqlıq — tildiń tiykarǵı pazıyleti.»', size: 's', color: 'orange' },
        { t: 'text', x: 8, y: 45, text: '— Aristotel', size: 's', color: 'orange' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Sóylewdiń tásirsheńligi — tıńlawshınıń sanasına tásir etiw; durıslıq, anıqlıq, logikalılıq, tazalıq oǵan xızmet etedi.',
    'Tásirli sóylew ushın temanı biliw, tıńlawshını esapqa alıw, joba, waqıt hám dáliller kerek.',
    'Nawayı: «Tiliń menen kewlińdi bir tut»; Al-Xorezmiy: «Sóz — gúl, is — miywe»; Demokrit: «Sóz — istiń kóleńkesi».'
  ],
  questions: [
    {
      id: 'kq18q1',
      prompt: 'Avtordı pikiri menen sáykeslendiriń.',
      hint: 'Al-Xorezmiy — gúl hám miywe.',
      explanation: 'Nawayı — «Tiliń menen kewlińdi bir tut»; Al-Xorezmiy — «Sóz — gúl, is — miywe»; Demokrit — «Sóz — istiń kóleńkesi»; Aristotel — «Anıqlıq — tildiń tiykarǵı pazıyleti».',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Nawayı' }, right: { label: 'Tiliń menen kewlińdi bir tut.' } },
            { left: { label: 'Al-Xorezmiy' }, right: { label: 'Sóz — gúl, is — miywe.' } },
            { left: { label: 'Demokrit' }, right: { label: 'Sóz — istiń kóleńkesi.' } },
            { left: { label: 'Aristotel' }, right: { label: 'Anıqlıq — tildiń tiykarǵı pazıyleti.' } }
          ]
        }
      }
    },
    {
      id: 'kq18q2',
      prompt: 'Sóylewdiń tásirsheńliginiń maqseti ne?',
      hint: 'Tıńlawshınıń sanası.',
      explanation: 'Tıńlawshı hám oqıwshınıń sanasına tásir etiw.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tıńlawshınıń sanasına tásir etiw', 'waqıttı sozıw', 'kóp termin qollanıw', 'tıńlawshını zeriktiriw'], answerIndex: 0 } }
    },
    {
      id: 'kq18q3',
      prompt: 'Tásirli sóylewge járdem beretuǵın hám kesent beretuǵın nárselerdi ajıratıń.',
      hint: 'Tıńlawshını esapqa alıw kerek.',
      explanation: 'Járdem: temanı biliw, anıq joba, mısallar. Kesent: tıńlawshıǵa sáykes emes til, waqıttı sozıw.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'y', label: 'járdem beredi' }, { id: 'n', label: 'kesent beredi' }],
          tiles: [
            { id: 'a', label: 'temanı jaqsı biliw', bin: 'y' },
            { id: 'b', label: 'anıq joba', bin: 'y' },
            { id: 'c', label: 'turmıstan mısallar', bin: 'y' },
            { id: 'd', label: 'belgilengen waqıttan asıp ketiw', bin: 'n' },
            { id: 'e', label: 'ápiwayı tıńlawshıǵa ilimiy til', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'kq18q4',
      prompt: 'Ciceron boyınsha sheshenniń eń úlken qásiyetleriniń biri ne?',
      hint: 'Kereksiz nárse …',
      explanation: 'Kerekli nárseni aytıw ǵana emes, kereksiz nárseni aytpaw.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kereksiz nárseni aytpaw', 'kóp sóylew', 'baqırıp sóylew', 'tek qaǵazdan oqıw'], answerIndex: 0 } }
    },
    {
      id: 'kq18q5',
      prompt: 'Al-Xorezmiydiń pikirin tolıqtırıń.',
      hint: 'Sóz — gúl, is — …',
      explanation: '«Sóz — gúl, is — miywe».',
      widget: { type: 'text_answer', props: { before: 'Sóz — gúl, is —', after: '.', answer: 'miywe', width: 6 } }
    },
    {
      id: 'kq18q6',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Waqıt hám tıńlawshı.',
      explanation: 'Sóz waqtınan sál aldınıraq tamamlansa tıńlawshılar zerikpeydi; temanı bilmeytuǵın adam tásirli sóyley almaydı; Galiley anıq sóylewdi ayırım adamlarǵa ǵana tán degen.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sóz waqtınan sál aldınıraq tamamlansa, tıńlawshılar zerikpeydi.', value: true },
            { text: 'Temanı bilmey-aq tásirli sóylewge boladı.', value: false },
            { text: 'Galiley: «Anıq sóylew ayırım adamlarǵa ǵana tán».', value: true },
            { text: 'Maqtanıp sóylew — kúshtiń belgisi (Ciceron).', value: false }
          ]
        }
      }
    },
    {
      id: 'kq18q7',
      prompt: 'Sózlerdi tártipke salıń (Nawayı).',
      hint: '«Tiliń menen …»',
      explanation: 'Tiliń menen kewlińdi bir tut.',
      widget: { type: 'sentence_order', props: { words: ['Tiliń', 'menen', 'kewlińdi', 'bir', 'tut.'] } }
    }
  ]
};
