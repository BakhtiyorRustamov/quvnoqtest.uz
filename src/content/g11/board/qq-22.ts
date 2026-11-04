import type { BoardLesson } from './types';
import { QQ_G5 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), 86–91-betler — Publicistikalıq stil. Ilimiy stil. */
export const QQ_22: BoardLesson = {
  n: 22,
  label: '22',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G5,
  title: 'Publicistikalıq hám ilimiy stil',
  section: 'Publicistikalıq stil. Ilimiy stil',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: '«Publicistika» termini latınsha «publicus» — kópshilik degen sózden alınǵan. Publicistikalıq stil — kópshilikke túsinikli jazba stil: gazeta-jurnal maqalaları, ocherkler, radio-televidenie xabarları. Onda tábiyat súwretlewleri, obraz jasaw qurallarınıń kóp qatnası, is qaǵazlarına tán shtamplar kem ushırasadı. Ilimiy stil — monografiyalar, sabaqlıqlar, ilimiy miynetlerdiń stili. Onda terminologiyalıq leksika keń qollanıladı, sózler kóp mánili emes, tuwra, terminlik mánide boladı, pikirler anıq anıqlamalar túrinde beriledi.',
      easy: 'Publicistika — kópshilik ushın (gazeta, radio). Ilimiy stil — terminler, anıq anıqlamalar, sózler bir mánili.',
      draw: [
        { t: 'title', text: 'Eki stil' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['publicistikalıq', 'ilimiy'],
            ['publicus — kópshilik', 'terminler keń qollanıladı'],
            ['maqala, ocherk, xabar', 'sabaqlıq, monografiya'],
            ['kópshilikke túsinikli', 'sózler bir mánili']
          ]
        }
      ],
      next: 'Filologiya'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Sabaqlıqtaǵı ilimiy tekst mısalı filologiya haqqında. Filologiya grekshe «fileo» — jaqsı kóriw hám «logos» — sóz degen sózlerden kelip shıqqan, «sózge ıqlas» degen mánini beredi. Ol eki tarawdan turadı: lingvistika — til bilimi, latınsha «lingua» — til; hám ádebiyattanıw. Ádebiyattanıw úsh tarawdan turadı: ádebiyat sını, ádebiyat tariyxı hám ádebiyat teoriyası.',
      easy: 'Filologiya — «sózge ıqlas». Eki tarawı: lingvistika (til bilimi) hám ádebiyattanıw.',
      draw: [
        { t: 'title', text: 'Filologiya' },
        { t: 'box', id: 'f', x: 30, y: 13, w: 40, h: 10, text: 'filologiya', color: 'purple' },
        { t: 'box', id: 'l', x: 4, y: 30, w: 40, h: 10, text: 'lingvistika', color: 'blue' },
        { t: 'box', id: 'a', x: 56, y: 30, w: 40, h: 10, text: 'ádebiyattanıw', color: 'green' },
        { t: 'arrow', from: 'f', to: 'l' },
        { t: 'arrow', from: 'f', to: 'a' },
        { t: 'text', x: 56, y: 47, text: 'sın, tariyx, teoriya', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 47, text: 'lingua — til', size: 's', color: 'blue' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    '«Publicistika» — latınsha publicus (kópshilik); publicistikalıq stil — gazeta, jurnal, radio-televidenie stili.',
    'Ilimiy stilde terminler keń qollanıladı; sózler bir mánili, tuwra mánide boladı.',
    'Filologiya — «sózge ıqlas»; onıń tarawları — lingvistika hám ádebiyattanıw (sın, tariyx, teoriya).'
  ],
  questions: [
    {
      id: 'kq22q1',
      prompt: '«Publicistika» termini qaysı sózden alınǵan?',
      hint: 'Latınsha «kópshilik».',
      explanation: 'Latınsha «publicus» — kópshilik.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['publicus — kópshilik', 'stulos — tayaqsha', 'logos — sóz', 'lingua — til'], answerIndex: 0 } }
    },
    {
      id: 'kq22q2',
      prompt: 'Belgilerdi stil boyınsha ajıratıń.',
      hint: 'Terminler — ilimiy stil.',
      explanation: 'Publicistikalıq: gazeta maqalası, ocherk, radio xabarı. Ilimiy: sabaqlıq, monografiya, terminler.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'p', label: 'publicistikalıq' }, { id: 'i', label: 'ilimiy' }],
          tiles: [
            { id: 'a', label: 'gazeta maqalası', bin: 'p' },
            { id: 'b', label: 'ocherk', bin: 'p' },
            { id: 'c', label: 'radio xabarı', bin: 'p' },
            { id: 'd', label: 'monografiya', bin: 'i' },
            { id: 'e', label: 'terminologiyalıq leksika', bin: 'i' }
          ]
        }
      }
    },
    {
      id: 'kq22q3',
      prompt: 'Filologiya sózi qaysı eki grek sózinen kelip shıqqan?',
      hint: 'Jaqsı kóriw + sóz.',
      explanation: '«fileo» — jaqsı kóriw hám «logos» — sóz.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'fileo' }, right: { label: 'jaqsı kóriw' } },
            { left: { label: 'logos' }, right: { label: 'sóz' } },
            { left: { label: 'lingua' }, right: { label: 'til' } }
          ]
        }
      }
    },
    {
      id: 'kq22q4',
      prompt: 'Ádebiyattanıwdıń úsh tarawın belgileń.',
      hint: 'Sın, tariyx, …',
      explanation: 'Ádebiyat sını, ádebiyat tariyxı, ádebiyat teoriyası.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'ádebiyat sını', match: true },
            { id: 'b', text: 'ádebiyat tariyxı', match: true },
            { id: 'c', text: 'ádebiyat teoriyası', match: true },
            { id: 'd', text: 'fonetika', match: false },
            { id: 'e', text: 'orfografiya', match: false }
          ]
        }
      }
    },
    {
      id: 'kq22q5',
      prompt: 'Ilimiy stildegi sózlerdiń ózgesheligi qanday?',
      hint: 'Terminlik máni.',
      explanation: 'Kóp mánilikti bildirmeydi, tuwra (terminlik) mánide qollanıladı.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bir mánili, terminlik mánide', 'awıspalı mánide', 'dialektlik', 'emocionallıq'], answerIndex: 0 } }
    },
    {
      id: 'kq22q6',
      prompt: 'Til bilimi qalay ataladı?',
      hint: 'Latınsha lingua.',
      explanation: 'Lingvistika.',
      widget: { type: 'text_answer', props: { before: 'Til bilimi —', after: '', answer: ['lingvistika'], width: 11 } }
    },
    {
      id: 'kq22q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Publicistikada shtamplar.',
      explanation: 'Publicistikada is qaǵazlarına tán shtamplar kem; publicistikalıq stil xalıqtıń kúndelikli turmısı menen baylanıslı; ilimiy stilde pikirler anıq.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Publicistikalıq stilde is qaǵazlarına tán shtamplar kem ushırasadı.', value: true },
            { text: 'Publicistikalıq stil kópshilikke túsiniksiz bolıwı kerek.', value: false },
            { text: 'Sabaqlıqlar ilimiy stilde jazıladı.', value: true },
            { text: 'Ilimiy stilde sózler kóbinese awıspalı mánide qollanıladı.', value: false }
          ]
        }
      }
    }
  ]
};
