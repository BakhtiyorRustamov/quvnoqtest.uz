import type { BoardLesson } from './types';
import { QQ_G3 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 12–13, 53–55-betler — Tildiń tazalıǵı. */
export const QQ_12: BoardLesson = {
  n: 12,
  label: '12',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G3,
  title: 'Tildiń tazalıǵı',
  section: '§ 12 — 13. Tildiń tazalıǵı: dialektizm, varvarizm, jargon, vulgarizm, parazit sózler',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Sóylewdiń tazalıǵı — onıń ádebiy til normalarına muwapıq keliwi, ádebiy tilge jat birliklerden taza bolıwı. Tazalıqtı buzatuǵınlar: dialektizmler — jergilikli sóylemlerge tán sózler; varvarizmler — basqa tillerden kirgen sózlerdi hádden tıs qollanıw; jargonlar — francuzsha «buzılǵan til», tar sociallıq topardıń sózleri; vulgarizmler — turpayı, mádeniyatsız sózler; parazit sózler — «demek, eger, aytayıq, xosh» dep orınsız qaytalaw. Kórkem shıǵarmada dialektizm avtor sózinde emes, personaj tilinde qollanılsa maqsetke muwapıq.',
      easy: 'Tildi buzatuǵınlar: dialektizm, varvarizm, jargon, vulgarizm hám «demek, xosh» sıyaqlı parazit sózler.',
      draw: [
        { t: 'title', text: 'Tildiń tazalıǵın buzatuǵınlar' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['túri', 'mánisi'],
            ['dialektizm', 'jergilikli sóylemlerdiń sózi'],
            ['varvarizm', 'basqa til sózin hádden tıs qollanıw'],
            ['jargon', '«buzılǵan til», tar topar sózi'],
            ['vulgarizm', 'turpayı, mádeniyatsız sóz'],
            ['parazit sóz', 'demek, eger, aytayıq, xosh']
          ]
        }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Sóylewdiń tazalıǵı — ádebiy til normalarına muwapıqlıq, jat birliklerden tazalıq.',
    'Tazalıqtı dialektizm, varvarizm, jargon, vulgarizm hám parazit sózler buzadı.',
    'Jargon — francuzsha «buzılǵan til»; dialektizm kórkem shıǵarmada personaj tilinde qollanılsa maqsetke muwapıq.'
  ],
  questions: [
    {
      id: 'kq12q1',
      prompt: 'Termindi anıqlaması menen sáykeslendiriń.',
      hint: 'Varvarizm — basqa til.',
      explanation: 'dialektizm — jergilikli sóz; varvarizm — basqa tildiń sózin hádden tıs qollanıw; vulgarizm — turpayı sóz; jargon — tar topardıń sózi.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'dialektizm' }, right: { label: 'jergilikli sóylemlerdiń sózi' } },
            { left: { label: 'varvarizm' }, right: { label: 'basqa til sózin hádden tıs qollanıw' } },
            { left: { label: 'vulgarizm' }, right: { label: 'turpayı, mádeniyatsız sóz' } },
            { left: { label: 'jargon' }, right: { label: 'tar sociallıq topardıń sózi' } }
          ]
        }
      }
    },
    {
      id: 'kq12q2',
      prompt: '«Jargon» sózi qaysı tilden alınǵan hám neni bildiredi?',
      hint: 'Evropa tili.',
      explanation: 'Francuz tilinen, «buzılǵan til» degendi bildiredi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['francuzsha «buzılǵan til»', 'grekshe «báseke»', 'latınsha «kópshilik»', 'arabsha «sóz»'], answerIndex: 0 } }
    },
    {
      id: 'kq12q3',
      prompt: 'Parazit sózlerdi belgileń.',
      hint: 'Orınsız qaytalanatuǵın sózler.',
      explanation: '«Demek, eger, aytayıq, xosh» sózlerin orınsız qaytalaw — parazit sózler.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'demek', match: true },
            { id: 'b', text: 'aytayıq', match: true },
            { id: 'c', text: 'xosh', match: true },
            { id: 'd', text: 'kitap', match: false },
            { id: 'e', text: 'bilim', match: false }
          ]
        }
      }
    },
    {
      id: 'kq12q4',
      prompt: 'Kórkem shıǵarmada dialektizm qay jerde qollanılsa maqsetke muwapıq?',
      hint: 'Avtor sózinde me, qaharman sózinde me?',
      explanation: 'Personaj (qaharman) tilinde.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['personaj tilinde', 'avtor sózinde', 'ilimiy maqalada', 'rásmiy hújjette'], answerIndex: 0 } }
    },
    {
      id: 'kq12q5',
      prompt: 'Tildiń tazalıǵın buzbaytuǵının tabıń.',
      hint: 'Úshewi — tazalıqtı buzadı.',
      explanation: 'Dialektizm, jargon, vulgarizm tazalıqtı buzadı; ádebiy norma onı saqlaydı.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'dialektizm' }, { text: 'jargon' }, { text: 'vulgarizm' }, { text: 'ádebiy norma', odd: true }] } }
    },
    {
      id: 'kq12q6',
      prompt: 'Basqa tillerden kirgen sózlerdiń hádden tıs qollanılıwı qalay ataladı?',
      hint: 'V hárip penen baslanadı.',
      explanation: 'Varvarizm.',
      widget: { type: 'text_answer', props: { before: '', after: '— basqa til sózleriniń hádden tıs qollanılıwı.', answer: ['varvarizm', 'Varvarizm'], width: 10 } }
    },
    {
      id: 'kq12q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Stillerge qarań.',
      explanation: 'Kórkem ádebiyattan basqa stillerde dialektizm zárúr emes; jargonnıń qollanıw órisi tar; parazit sózler itibarsızlıqtan payda boladı.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Rásmiy is qaǵazında dialektizm qollanıw zárúr.', value: false },
            { text: 'Jargon sózlerdiń qollanıw órisi tar.', value: true },
            { text: 'Parazit sózler sóylewshiniń itibarsızlıǵınan payda boladı.', value: true },
            { text: 'Vulgarizmler ádebiy til normalarına sáykes keledi.', value: false }
          ]
        }
      }
    }
  ]
};
