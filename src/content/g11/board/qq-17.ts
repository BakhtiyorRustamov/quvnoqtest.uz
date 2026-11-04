import type { BoardLesson } from './types';
import { QQ_G4 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 16–17, 73–75-betler — Atamalardı paydalanıwdıń sóylew mádeniyatına tásiri. */
export const QQ_17: BoardLesson = {
  n: 17,
  label: '17',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G4,
  title: 'Atamalar hám sóylew mádeniyatı',
  section: '§ 16 — 17. Atamalardı paydalanıwdıń sóylew mádeniyatına tásiri',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Ǵárezsizlikten soń qaraqalpaq tili mámleketlik til biyligin aldı, basqa mámleketler menen baylanıslar arqalı tilimizge islep shıǵarıw, ilim-pán, texnika tarawlarına baylanıslı jańa atamalar kirdi. Bul sózlik qordı bayıtadı. Biraq bir túsinikti ańlatıw ushın birneshe atamanı qosıp qollanıwǵa bolmaydı. Atama tańlaǵanda onıń qaysı tilge tiyisliligi, jańa yamasa góneligi hám mánisi esapqa alınadı. Atamanı orınsız yamasa qáte qollanıw túsinbewshilik tuwdıradı, sonlıqtan atama qollanıwda úlken juwapkershilik kerek.',
      easy: 'Jańa atamalar tildi bayıtadı. Biraq bir túsinikke bir atama qollanıń hám atamanıń mánisin anıq biliń.',
      draw: [
        { t: 'title', text: 'Atama qollanıw' },
        { t: 'text', x: 4, y: 15, text: 'Esapqa alınadı:', size: 's', color: 'ink' },
        { t: 'list', x: 6, y: 22, items: ['qaysı tilge tiyisli', 'jańa yamasa góne', 'mánisi anıq pa'], color: 'blue' },
        { t: 'text', x: 4, y: 46, text: 'Bir túsinik — bir atama!', size: 's', color: 'red' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Ǵárezsizlikten soń tilge islep shıǵarıw, ilim-pán, texnikaǵa baylanıslı jańa atamalar kirdi — bul sózlik qordı bayıtadı.',
    'Bir túsinikti ańlatıw ushın birneshe atamanı qatar qollanıwǵa bolmaydı.',
    'Atamanıń tili, jańa-góneligi, mánisi esapqa alınadı; qáte qollanıw túsinbewshilik tuwdıradı.'
  ],
  questions: [
    {
      id: 'kq17q1',
      prompt: 'Jańa atamalardıń tilge kiriwi qalay bahalanadı?',
      hint: 'Sózlik qor.',
      explanation: 'Unamlı hádiyse: tildiń sózlik qorın bayıtadı.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['unamlı — sózlik qordı bayıtadı', 'unamsız — tildi buzadı', 'tásiri joq', 'tek dialektlerge tásir etedi'], answerIndex: 0 } }
    },
    {
      id: 'kq17q2',
      prompt: 'Atama tańlaǵanda neler esapqa alınadı?',
      hint: 'Úsh nárse atalǵan.',
      explanation: 'Qaysı tilge tiyisliligi, jańa yamasa góneligi, mánisi.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'qaysı tilge tiyisliligi', match: true },
            { id: 'b', text: 'jańa yamasa góneligi', match: true },
            { id: 'c', text: 'mánisi', match: true },
            { id: 'd', text: 'hárip sanı', match: false },
            { id: 'e', text: 'aytılıw tezligi', match: false }
          ]
        }
      }
    },
    {
      id: 'kq17q3',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Bir túsinik — bir atama.',
      explanation: 'Bir túsinikke birneshe atamanı qatar qollanıwǵa bolmaydı; atamanı qáte qollanıw qátelerge alıp keledi; atamalar ilim-pánde áhmiyetli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bir túsinikti ańlatıw ushın birneshe atamanı qosıp qollanıw kerek.', value: false },
            { text: 'Atamanı qáte túsindiriw bir qatar qátelerge sebep boladı.', value: true },
            { text: 'Ilim-pán hám tálimde atamalar áhmiyetli orın iyeleydi.', value: true },
            { text: 'Atamalar jetiskenlikleri kóbirek publicistikalıq stilde kózge taslanadı.', value: true }
          ]
        }
      }
    },
    {
      id: 'kq17q4',
      prompt: 'Atamalardı durıs qollanıw tıńlawshıǵa ne beredi?',
      hint: 'Maǵlıwmattı qabıllaw.',
      explanation: 'Maǵlıwmattı tez, anıq hám durıs qabıllawın ańsatlastıradı.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['maǵlıwmattı tez hám anıq qabıllawdı', 'zeriktiredi', 'túsinbewshilik tuwdıradı', 'sóylewdi uzaqqa sozadı'], answerIndex: 0 } }
    },
    {
      id: 'kq17q5',
      prompt: 'Tilge jańa atamalar kóbirek qaysı tarawlardan kirdi?',
      hint: 'Óndiris hám ilim.',
      explanation: 'Islep shıǵarıw, ilim-pán, texnika tarawlarınan.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'y', label: 'atalǵan tarawlar' }, { id: 'n', label: 'atalmaǵan' }],
          tiles: [
            { id: 'a', label: 'islep shıǵarıw', bin: 'y' },
            { id: 'b', label: 'ilim-pán', bin: 'y' },
            { id: 'c', label: 'texnika', bin: 'y' },
            { id: 'd', label: 'dialektler', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'kq17q6',
      prompt: 'Gápti tolıqtırıń.',
      hint: 'Atama qollanıwda úlken … talap etiledi.',
      explanation: 'Atamalardı qollanıwda úlken juwapkershilik talap etiledi.',
      widget: { type: 'text_answer', props: { before: 'Atamalardı qollanıwda úlken', after: 'talap etiledi.', answer: 'juwapkershilik', width: 14 } }
    }
  ]
};
