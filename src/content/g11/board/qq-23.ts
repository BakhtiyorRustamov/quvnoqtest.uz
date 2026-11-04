import type { BoardLesson } from './types';
import { QQ_G6 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 23–24, 91–94-betler — Is qaǵazları: bayanlama, jazba esap, jeke hújjetler. */
export const QQ_23: BoardLesson = {
  n: 23,
  label: '23',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G6,
  title: 'Is qaǵazları: bayanlama',
  section: '§ 23 — 24. Is qaǵazları. Bayanlama, jazba esap, jeke hújjetler',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Mákemelerde, kárxanalarda hám jeke adamlar ortasında qollanılatuǵın hújjetler is qaǵazları dep ataladı: buyrıq, usınıs, arza, ómirbayan, minezleme, maǵlıwmatnama, akt, tilxat, isenimxat, daǵaza, málimleme hám basqalar. Olardıń kólemi qısqa, mazmunı ıqsham hám anıq boladı, qáliplesken sózler qollanıladı. Bayanlama — jıynalıstıń jazbası. Onıń bólimleri: sáne hám jıynalıs atı, «Qatnastı», «Kún tártibinde», «Tıńlandı», «Jarıs sózge shıqtı», «Qarar etedi», májilis basqarıwshısı menen xatkerdiń qolı.',
      easy: 'Is qaǵazları — rásmiy hújjetler: arza, ómirbayan, akt, isenimxat… Bayanlama — jıynalıs jazbası: qatnastı, kún tártibi, tıńlandı, qarar.',
      draw: [
        { t: 'title', text: 'Bayanlamanıń dúzilisi' },
        { t: 'list', x: 6, y: 15, items: ['1. sáne, jıynalıstıń atı', '2. Qatnastı: …', '3. Kún tártibinde: …', '4. Tıńlandı: …', '5. Jarıs sózge shıqtı: …', '6. Qarar etedi: …', '7. basqarıwshı hám xatker qolı'], color: 'blue' }
      ],
      next: 'Jazba esap hám jeke hújjetler'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Jazba esap — belgili waqıtqa jobalastırılǵan jumıstıń, tapsırmanıń yamasa xızmet saparınıń juwmaǵı haqqında maǵlıwmat beretuǵın hújjet. Onıń bólimleri: teması, hújjettiń atı, teksti, beriwshiniń lawazımı hám atı, sáne, tastıyıqlawshı basshınıń qolı. Xızmetker haqqında tolıq maǵlıwmat beretuǵın hújjetler jeke hújjetler jıyması dep ataladı: jumısqa qabıl etiw haqqında arza, jeke maǵlıwmatlar qaǵazı, ómirbayan, maǵlıwmatı haqqında hújjetlerdiń nusqası, minezleme, buyrıqtan kóshirmeler.',
      easy: 'Jazba esap — orınlanǵan jumıs haqqında maǵlıwmat. Jeke hújjetler jıyması — arza, ómirbayan, minezleme h.t.b.',
      draw: [
        { t: 'title', text: 'Jeke hújjetler jıyması' },
        { t: 'list', x: 6, y: 15, items: ['jumısqa qabıl etiw haqqında arza', 'jeke maǵlıwmatlar qaǵazı', 'ómirbayan', 'bilimi haqqında hújjet nusqası', 'minezleme', 'buyrıqtan kóshirmeler'], color: 'green' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Is qaǵazları — mákemelerde hám jeke adamlar ortasında qollanılatuǵın rásmiy hújjetler; olar qısqa, ıqsham, anıq boladı.',
    'Bayanlama: qatnasqanlar, kún tártibi, tıńlandı, jarıs sóz, qarar, basqarıwshı menen xatkerdiń qolı.',
    'Jazba esap — orınlanǵan jumıstıń juwmaǵı haqqında hújjet; jeke hújjetler jıyması xızmetker haqqında tolıq maǵlıwmat beredi.'
  ],
  questions: [
    {
      id: 'kq23q1',
      prompt: 'Bayanlamanıń bólimlerin tártip penen jaylastırıń.',
      hint: 'Kim qatnastı → nesi talqılanadı → qarar.',
      explanation: 'Qatnastı → Kún tártibinde → Tıńlandı → Jarıs sózge shıqtı → Qarar etedi.',
      widget: { type: 'step_order', props: { steps: ['Qatnastı', 'Kún tártibinde', 'Tıńlandı', 'Jarıs sózge shıqtı', 'Qarar etedi'] } }
    },
    {
      id: 'kq23q2',
      prompt: 'Qaysıları is qaǵazlarına kiredi?',
      hint: 'Rásmiy hújjetler.',
      explanation: 'Arza, ómirbayan, minezleme, akt — is qaǵazları; qosıq hám ertek — kórkem shıǵarma.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'arza', match: true },
            { id: 'b', text: 'ómirbayan', match: true },
            { id: 'c', text: 'minezleme', match: true },
            { id: 'd', text: 'akt', match: true },
            { id: 'e', text: 'qosıq', match: false },
            { id: 'f', text: 'ertek', match: false }
          ]
        }
      }
    },
    {
      id: 'kq23q3',
      prompt: 'Orınlanǵan jumıs yamasa xızmet saparınıń juwmaǵı haqqında maǵlıwmat beretuǵın hújjet qalay ataladı?',
      hint: 'Esap beriw.',
      explanation: 'Jazba esap.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['jazba esap', 'daǵaza', 'telegramma', 'tilxat'], answerIndex: 0 } }
    },
    {
      id: 'kq23q4',
      prompt: 'Bayanlamaǵa kimler qol qoyadı?',
      hint: 'Eki adam.',
      explanation: 'Májilis basqarıwshısı hám xatker.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'májilis basqarıwshısı', match: true },
            { id: 'b', text: 'xatker', match: true },
            { id: 'c', text: 'hámme qatnasıwshı', match: false },
            { id: 'd', text: 'tek bayanatshı', match: false }
          ]
        }
      }
    },
    {
      id: 'kq23q5',
      prompt: 'Is qaǵazlarına qoyılatuǵın talaplar qanday?',
      hint: 'Kólemi hám mazmunı.',
      explanation: 'Kólemi qısqa, mazmunı ıqsham hám anıq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['qısqa, ıqsham, anıq', 'uzın, kórkem', 'emocionallıq, obrazlı', 'dialektlik sózler menen'], answerIndex: 0 } }
    },
    {
      id: 'kq23q6',
      prompt: 'Jeke hújjetler jıymasına kirmeytuǵının tabıń.',
      hint: 'Úshewi — xızmetker haqqında hújjet.',
      explanation: 'Ómirbayan, minezleme, arza — jeke hújjetler; telegramma — olay emes.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'ómirbayan' }, { text: 'minezleme' }, { text: 'arza' }, { text: 'telegramma', odd: true }] } }
    },
    {
      id: 'kq23q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: '«Aǵımdaǵılar».',
      explanation: '«Aǵımdaǵılar» (daǵaza, qutlıqlaw) qarar talap etpewi múmkin; bayanat qosa tigilmese, mazmunı tolıq jazıladı; jazba esapqa basshı qol qoyıp tastıyıqlaydı.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Aǵımdaǵılar» máselesi qarar qabıllawdı talap etpewi múmkin.', value: true },
            { text: 'Bayanat bayanlamaǵa tigilmese, onıń mazmunı tolıq jazıladı.', value: true },
            { text: 'Jazba esapqa basshınıń qolı kerek emes.', value: false },
            { text: 'Is qaǵazlarında kórkem teńewler kóp qollanıladı.', value: false }
          ]
        }
      }
    }
  ]
};
