import type { BoardLesson } from './types';
import { QQ_G1 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 2, 15–18-betler — Sheshenlik óneriniń tariyxı. */
export const QQ_4: BoardLesson = {
  n: 4,
  label: '4',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G1,
  title: 'Sheshenlik óneriniń tariyxı',
  section: '§ 2. Sóylew mádeniyatınıń tariyxınan: Mısır, Hindistan, Greciya, Rim, Orta Aziya danıshpanları',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Sheshenlik óneriniń eń dáslepki kórinisleri Mısır, Assuriya, Vavilon hám Hindistanda payda bolǵan. Áyyemgi Hindistanda sóylew mádeniyatı «Maxabxarat», «Ramayana» dástanları menen baylanıslı. Keyin oratorlıq áyyemgi Greciya menen Rimde rawajlandı. Grek shesheni Demosfen ázzi dawısın dúzetiw ushın awzına tas salıp shınıqqan. Aristotel «Ritorika» shıǵarmasında sózdiń anıqlıǵına itibar bergen. Rim shesheni Ciceron sheshenlik sóziniń altı bólimin belgilegen: kirisiw, mazmundı bayanlaw, keyingi bólimler, dáliller, tiykarǵı mazmundı atap ótiw, juwmaq.',
      easy: 'Sheshenlik Mısır, Vavilon, Hindistanda baslanıp, Greciya menen Rimde rawajlandı. Demosfen, Aristotel, Ciceron — ullı sheshenler.',
      draw: [
        { t: 'title', text: 'Ullı sheshenler' },
        { t: 'box', id: 'a', x: 2, y: 15, w: 30, h: 12, text: 'Demosfen', color: 'blue' },
        { t: 'box', id: 'b', x: 35, y: 15, w: 30, h: 12, text: 'Aristotel', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 15, w: 30, h: 12, text: 'Ciceron', color: 'purple' },
        { t: 'text', x: 2, y: 34, text: 'awzına tas salıp', size: 's', color: 'blue' },
        { t: 'text', x: 2, y: 40, text: 'shınıqqan', size: 's', color: 'blue' },
        { t: 'text', x: 35, y: 34, text: '«Ritorika»', size: 's', color: 'green' },
        { t: 'text', x: 68, y: 34, text: 'sózdiń 6 bólimi', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 52, text: 'Dáslepki orınlar: Mısır, Assuriya, Vavilon, Hindistan', size: 's', color: 'orange' }
      ],
      next: 'Shıǵıs danıshpanları'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Orta Aziya danıshpanları da sóylew mádeniyatına úlken úles qosqan. Abu Nasr Farabiy sóylewdiń jetikligin aqıl menen baylanıstırıp, grammatika menen logikanıń baylanısın kórsetken. Ibn Sina sheshenge násiyattı qopal emes, doslıq sáwbet túrinde, múlayım hawazda hám jeke ózine aytıwdı, sáwbetlesiniń bilim dárejesin esapqa alıwdı usınǵan. Zamaxshariy «Názik ibaralar» shıǵarmasında dostıńnıń sózin dıqqat penen tıńlawǵa shaqırǵan.',
      easy: 'Farabiy — sóylew aqıl, grammatika hám logika menen baylanıslı. Ibn Sina — násiyattı jumsaq hám jeke aytıń.',
      draw: [
        { t: 'title', text: 'Shıǵıs danıshpanları' },
        { t: 'text', x: 4, y: 15, text: 'Farabiy: sóylew — aqıl, grammatika, logika', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 24, text: 'Ibn Sina: násiyat — múlayım, jeke ózine,', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 30, text: 'doslıq sáwbet túrinde', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 39, text: 'Zamaxshariy: «Názik ibaralar»', size: 's', color: 'purple' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Sheshenlik Mısır, Assuriya, Vavilon, Hindistanda payda bolıp, Greciya menen Rimde rawajlandı.',
    'Demosfen awzına tas salıp shınıqqan; Aristotel «Ritorika»nı jazǵan; Ciceron sózdiń altı bólimin belgilegen.',
    'Farabiy, Ibn Sina, Zamaxshariy sóylew ádebi haqqında bahalı pikirler qaldırǵan.'
  ],
  questions: [
    {
      id: 'kq4q1',
      prompt: 'Ázzi dawısın dúzetiw ushın awzına tas salıp shınıqqan grek shesheni kim?',
      hint: 'Sud oratorınan siyasiy oratorǵa kóterilgen.',
      explanation: 'Demosfen.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Demosfen', 'Aristotel', 'Ciceron', 'Gomer'], answerIndex: 0 } }
    },
    {
      id: 'kq4q2',
      prompt: '«Ritorika» shıǵarmasınıń avtorı kim?',
      hint: 'Grek filosofı.',
      explanation: 'Aristotel.',
      widget: { type: 'text_answer', props: { before: '«Ritorika» —', after: 'shıǵarması.', answer: ['Aristotel', 'Aristoteldiń'], width: 11 } }
    },
    {
      id: 'kq4q3',
      prompt: 'Ciceronnıń sheshenlik sóziniń bólimlerin tártip penen jaylastırıń.',
      hint: 'Kirisiwden baslanıp, juwmaq penen pitedi.',
      explanation: 'Kirisiw → mazmundı bayanlaw → dáliller → tiykarǵı mazmundı atap ótiw → juwmaq.',
      widget: { type: 'step_order', props: { steps: ['Kirisiw', 'Jumıstıń mazmunın bayanlaw', 'Dáliller', 'Tiykarǵı mazmundı atap ótiw', 'Juwmaq jasaw'] } }
    },
    {
      id: 'kq4q4',
      prompt: 'Sheshenlik óneriniń eń dáslepki kórinisleri qay jerlerde payda bolǵan?',
      hint: 'Tórt el atalǵan.',
      explanation: 'Mısır, Assuriya, Vavilon hám Hindistanda.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'Mısır', match: true },
            { id: 'b', text: 'Assuriya', match: true },
            { id: 'c', text: 'Vavilon', match: true },
            { id: 'd', text: 'Hindistan', match: true },
            { id: 'e', text: 'Angliya', match: false },
            { id: 'f', text: 'Yaponiya', match: false }
          ]
        }
      }
    },
    {
      id: 'kq4q5',
      prompt: 'Danıshpandı pikiri menen sáykeslendiriń.',
      hint: 'Farabiy — aqıl hám logika.',
      explanation: 'Farabiy — sóylewdi aqıl, grammatika, logika menen baylanıstırdı; Ibn Sina — násiyattı múlayım hám jeke aytıw; Aristotel — sózdiń anıqlıǵı.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Farabiy' }, right: { label: 'grammatika menen logikanıń baylanısı' } },
            { left: { label: 'Ibn Sina' }, right: { label: 'násiyattı múlayım, jeke aytıw' } },
            { left: { label: 'Aristotel' }, right: { label: 'sózdiń anıqlıǵı' } }
          ]
        }
      }
    },
    {
      id: 'kq4q6',
      prompt: 'Áyyemgi Hindistanda sóylew mádeniyatınıń rawajlanıwı qaysı dástanlar menen baylanıslı?',
      hint: 'Eki dástan.',
      explanation: '«Maxabxarat» hám «Ramayana».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Maxabxarat», «Ramayana»', '«Iliada», «Odisseya»', '«Alpamıs», «Qırq qız»', '«Qabusnama», «Qutadǵu bilig»'], answerIndex: 0 } }
    },
    {
      id: 'kq4q7',
      prompt: 'Durıs pa, nadurıs pa? (Ibn Sinanıń násiyatları)',
      hint: 'Násiyat qopal bolmawı kerek.',
      explanation: 'Ibn Sina násiyattı múlayım, jeke ózine, doslıq sáwbet túrinde aytıwdı hám sáwbetlesiniń bilimin esapqa alıwdı usınǵan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Násiyat qopal túrde berilmewi kerek.', value: true },
            { text: 'Násiyattı kópshilik aldında baqırıp aytıw kerek.', value: false },
            { text: 'Sáwbetlesiniń bilim dárejesin esapqa alıw kerek.', value: true },
            { text: 'Óz isenimińdi tek bir mısal menen dálillew jetkilikli.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq4q8',
      prompt: 'Qaysısı rim shesheni?',
      hint: 'Sheshenlik sóziniń altı bólimin belgilegen.',
      explanation: 'Ciceron — áyyemgi Rimniń belgili shesheni.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Demosfen' }, { text: 'Aristotel' }, { text: 'Gomer' }, { text: 'Ciceron', odd: true }] } }
    }
  ]
};
