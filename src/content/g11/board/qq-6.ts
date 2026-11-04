import type { BoardLesson } from './types';
import { QQ_G2 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 4–5, 30–33-betler — Sóylewdiń durıslıǵı, ádebiy norma. */
export const QQ_6: BoardLesson = {
  n: 6,
  label: '6',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G2,
  title: 'Sóylewdiń durıslıǵı hám norma',
  section: '§ 4 — 5. Sóylewdiń durıslıǵı — ádebiy til hám ádebiy norma',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Sóylewdiń durıslıǵı — sóylew mádeniyatınıń baslı belgisi. Ol, tiykarınan, eki normaǵa — pát hám grammatikalıq normaǵa qatań ámel etiwdi talap etedi. Qaraqalpaq tilinde pát sózdiń aqırǵı buwınına túsedi, qosımta qosılsa pát qosımtaǵa ótedi: kitap — kitabımız — kitabımızdaǵılardan. Páttiń ornı ózgerse, sózdiń mánisi de ózgeredi: alma (feyil) — alma (atlıq), duwrama (feyil) — duwrama (atlıq), qatlama (feyil) — qatlama (atlıq).',
      easy: 'Durıs sóylew ushın pátti hám grammatikanı saqlaw kerek. Pát sózdiń aqırǵı buwınına túsedi; pát ózgerse, máni ózgeredi: alma — alma.',
      draw: [
        { t: 'title', text: 'Pát hám máni' },
        { t: 'text', x: 4, y: 15, text: 'kitap → kitabımız → kitabımızdaǵılardan', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 22, text: '(pát hámme waqıt sońǵı buwında)', size: 's', color: 'ink' },
        {
          t: 'table',
          x: 4,
          y: 30,
          rows: [
            ['feyil', 'atlıq'],
            ['alma (feyil)', 'alma (miywe)'],
            ['duwrama (feyil)', 'duwrama (awqat)'],
            ['qatlama (feyil)', 'qatlama (nan)']
          ]
        }
      ],
      next: 'Norma degen ne?'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Norma — sóylew mádeniyatınıń oraylıq túsinigi, til quralların durıs paydalanıw qádeleriniń jıynaǵı. Ádebiy norma — jámiyetke xızmet etiw ushın eń qolaylı hám durıs dep tańlap alınǵan til quralları. Norma tilde turaqlılıq payda etedi, biraq zaman menen ózgerip baradı. Qaraqalpaq tiliniń jeke normaları: ádebiy til norması, dialektal norma, sóylew tili norması hám sociallıq toparlardıń norması — jargonlar, kásiplik sózler. Normasız ádebiy til bolmaydı.',
      easy: 'Norma — tildi durıs qollanıw qaǵıydaları. Ol tildi buzılıwdan saqlaydı. Normasız ádebiy til bolmaydı.',
      draw: [
        { t: 'title', text: 'Jeke normalar' },
        { t: 'list', x: 6, y: 16, items: ['1. ádebiy til norması', '2. dialektal norma', '3. sóylew tili norması', '4. sociallıq: jargon, kásiplik sóz'], color: 'blue' },
        { t: 'text', x: 4, y: 50, text: 'Normasız ádebiy til bolmaydı.', size: 's', color: 'red' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Sóylewdiń durıslıǵı — sóylew mádeniyatınıń baslı belgisi; ol pát hám grammatikalıq normaǵa súyenedi.',
    'Qaraqalpaq tilinde pát sózdiń aqırǵı buwınına túsedi; pát ózgerse máni ózgeredi: alma (feyil) — alma (atlıq).',
    'Norma — til quralların durıs qollanıw qádeleriniń jıynaǵı; ádebiy norma — eń qolaylı dep tańlanǵan variant.',
    'Jeke normalar: ádebiy, dialektal, sóylew tili hám sociallıq toparlar norması.'
  ],
  questions: [
    {
      id: 'kq6q1',
      prompt: 'Sóylew mádeniyatınıń baslı belgisi qaysı?',
      hint: 'Ol bolmasa, sóylew anıq hám logikalı bolmaydı.',
      explanation: 'Sóylewdiń durıslıǵı.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['sóylewdiń durıslıǵı', 'sóylewdiń tezligi', 'dawıstıń kúshi', 'sózlerdiń uzınlıǵı'], answerIndex: 0 } }
    },
    {
      id: 'kq6q2',
      prompt: 'Qaraqalpaq tilinde sózlik pát qaysı buwınǵa túsedi?',
      hint: 'Kitabımızdaǵılardan.',
      explanation: 'Sózdiń aqırǵı buwınına; qosımta qosılsa, qosımtaǵa ótedi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['aqırǵı buwınǵa', 'birinshi buwınǵa', 'ortańǵı buwınǵa', 'erkin túsedi'], answerIndex: 0 } }
    },
    {
      id: 'kq6q3',
      prompt: 'Pátke qaray mánisi ózgeretuǵın sózdi mánisi menen sáykeslendiriń.',
      hint: 'Duwrama — awqattıń túri de.',
      explanation: 'alma (atlıq) — miywe; duwrama (atlıq) — awqattıń túri; qatlama (atlıq) — nannıń túri.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'alma (atlıq)' }, right: { label: 'miywe' } },
            { left: { label: 'duwrama (atlıq)' }, right: { label: 'awqattıń túri' } },
            { left: { label: 'qatlama (atlıq)' }, right: { label: 'nannıń túri' } }
          ]
        }
      }
    },
    {
      id: 'kq6q4',
      prompt: 'Sóylew durıs bolıwı ushın tiykarınan qaysı eki normaǵa qattı ámel etiw kerek?',
      hint: 'Biri — aytılıwǵa, ekinshisi — gáp dúziwge baylanıslı.',
      explanation: 'Pát (orfoepiyalıq) hám grammatikalıq normaǵa.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'pát norması', match: true },
            { id: 'b', text: 'grammatikalıq norma', match: true },
            { id: 'c', text: 'dialektal norma', match: false },
            { id: 'd', text: 'jargon norması', match: false }
          ]
        }
      }
    },
    {
      id: 'kq6q5',
      prompt: 'Anıqlamanı tolıqtırıń.',
      hint: 'Sóylew mádeniyatınıń oraylıq túsinigi.',
      explanation: 'Norma — til quralların durıs paydalanıw qádeleriniń jıynaǵı.',
      widget: { type: 'text_answer', props: { before: '', after: '— til quralların durıs paydalanıw qádeleriniń jıynaǵı.', answer: 'Norma', width: 7 } }
    },
    {
      id: 'kq6q6',
      prompt: 'Qaysısı qaraqalpaq tiliniń jeke normalarına kirmeydi?',
      hint: 'Tórt jeke norma atalǵan.',
      explanation: 'Jeke normalar: ádebiy, dialektal, sóylew tili, sociallıq toparlar norması. «Shet tili norması» olarǵa kirmeydi.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'ádebiy til norması' }, { text: 'dialektal norma' }, { text: 'sóylew tili norması' }, { text: 'shet tili norması', odd: true }] } }
    },
    {
      id: 'kq6q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Norma turaqlı, biraq máńgi ózgermes emes.',
      explanation: 'Norma tilde turaqlılıq payda etedi, biraq zaman menen ózgeredi; normasız ádebiy til bolmaydı; jargonlar sociallıq toparlardıń norması.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Norma heshqashan ózgermeydi.', value: false },
            { text: 'Normasız ádebiy til bolmaydı.', value: true },
            { text: 'Jargonlar hám kásiplik sózler sociallıq toparlardıń normasına kiredi.', value: true },
            { text: 'Pát ózgergende sózdiń mánisi heshqashan ózgermeydi.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq6q8',
      prompt: 'Sózlerdi qosımta qosılıw tártibinde jaylastırıń.',
      hint: 'Túbirden baslań.',
      explanation: 'kitap → kitabımız → kitabımızda → kitabımızdaǵılar.',
      widget: { type: 'step_order', props: { steps: ['kitap', 'kitabımız', 'kitabımızda', 'kitabımızdaǵılar'] } }
    }
  ]
};
