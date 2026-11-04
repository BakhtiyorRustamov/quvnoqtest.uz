import type { BoardLesson } from './types';
import { QQ_G5 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), 83–86-betler — Sóylew mádeniyatı hám stilistika. Kórkem ádebiyat stili. */
export const QQ_21: BoardLesson = {
  n: 21,
  label: '21',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G5,
  title: 'Stilistika, kórkem ádebiyat stili',
  section: 'Sóylew mádeniyatı hám stilistika. Kórkem ádebiyat stili',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Sóylew mádeniyatı menen stilistika biri-birin tolıqtıratuǵın, óz ara baylanıslı tarawlar. «Stil» sózi grekshe «stulos» — jazıw ushın ushı ótkir tayaqsha degen sózden alınǵan. Stil — tildiń jámiyettegi belgili bir xızmeti menen baylanıslı, ózine tán sózleri, turaqlı sóz dizbekleri hám grammatikalıq konstrukciyaları bar kishi sistema. Til stilleri: sóylesiw stili, ilimiy stil, rásmiy is qaǵazları stili, publicistikalıq stil hám kórkem ádebiyat stili.',
      easy: '«Stil» — grekshe «stulos» (jazıw tayaqshası). Stil — tildiń ózine tán kishi sisteması. Bes stil bar.',
      draw: [
        { t: 'title', text: 'Til stilleri' },
        { t: 'text', x: 4, y: 15, text: '«stulos» — jazıw ushın ushı ótkir tayaqsha', size: 's', color: 'orange' },
        { t: 'list', x: 6, y: 24, items: ['1. sóylesiw stili', '2. ilimiy stil', '3. rásmiy is qaǵazları stili', '4. publicistikalıq stil', '5. kórkem ádebiyat stili'], color: 'blue' }
      ],
      next: 'Kórkem ádebiyat stili'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Kórkem ádebiyat stili turmıstı kórkem obrazlar arqalı sáwlelendiredi; onda xalıq tiliniń hárbir sózi puqta tańlanadı. Poeziyada buwın sanınıń hám qatar sońındaǵı sózlerdiń birgelkiligi talap etiledi. Prozada tariyxıy sózler, arxaizmler, dialektlik sózler de qollanıladı. Obraz jasaw ushın epitet, metafora, metonimiya, teńew, sinekdoxa, giperbola, qaytalaw, inversiya, antiteza, ellipsis keń qollanıladı.',
      easy: 'Kórkem stil — obrazlar arqalı súwretlew. Onda troplar hám figuralar kóp, arxaizm hám dialektizm de ushırasadı.',
      draw: [
        { t: 'title', text: 'Kórkem ádebiyat stili' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 12, text: 'poeziya', color: 'purple' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'proza', color: 'green' },
        { t: 'text', x: 4, y: 33, text: 'buwın sanı, uyqas', size: 's', color: 'purple' },
        { t: 'text', x: 52, y: 33, text: 'arxaizm, dialektizm', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 46, text: 'epitet, metafora, teńew, inversiya, antiteza…', size: 's', color: 'blue' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Sóylew mádeniyatı menen stilistika óz ara baylanıslı, biri-birin tolıqtıradı.',
    '«Stil» — grekshe «stulos»: jazıw ushın ushı ótkir tayaqsha; stil — tildiń ózine tán kishi sisteması.',
    'Kórkem ádebiyat stili turmıstı obrazlar arqalı beredi; onda troplar, figuralar, arxaizm hám dialektizmler qollanıladı.'
  ],
  questions: [
    {
      id: 'kq21q1',
      prompt: '«Stil» sóziniń dáslepki mánisi qanday?',
      hint: 'Grekshe «stulos».',
      explanation: 'Jazıw ushın qollanılatuǵın ushı ótkir tayaqsha.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['jazıw ushın ushı ótkir tayaqsha', 'kitap', 'sóz', 'qosıq'], answerIndex: 0 } }
    },
    {
      id: 'kq21q2',
      prompt: 'Til stillerin belgileń.',
      hint: 'Bes stil.',
      explanation: 'Sóylesiw, ilimiy, rásmiy is qaǵazları, publicistikalıq, kórkem ádebiyat stilleri.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'ilimiy', match: true },
            { id: 'b', text: 'publicistikalıq', match: true },
            { id: 'c', text: 'kórkem ádebiyat', match: true },
            { id: 'd', text: 'rásmiy is qaǵazları', match: true },
            { id: 'e', text: 'dialektlik', match: false },
            { id: 'f', text: 'jargonlıq', match: false }
          ]
        }
      }
    },
    {
      id: 'kq21q3',
      prompt: 'Kórkem ádebiyat stiliniń poeziya hám proza ózgesheliklerin ajıratıń.',
      hint: 'Buwın sanı — poeziya.',
      explanation: 'Poeziya: buwın sanı, qatar sońınıń birgelkiligi. Proza: arxaizmler, dialektlik sózler, tariyxıy sózler.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'p', label: 'poeziya' }, { id: 'r', label: 'proza' }],
          tiles: [
            { id: 'a', label: 'buwın sanınıń birgelkiligi', bin: 'p' },
            { id: 'b', label: 'qatar sońındaǵı sózlerdiń uqsaslıǵı', bin: 'p' },
            { id: 'c', label: 'arxaizmler, tariyxıy sózler', bin: 'r' },
            { id: 'd', label: 'dialektlik sózler', bin: 'r' }
          ]
        }
      }
    },
    {
      id: 'kq21q4',
      prompt: 'Kórkem ádebiyat stiliniń tiykarǵı ózgesheligi ne?',
      hint: 'Obraz.',
      explanation: 'Turmıstı kórkem obrazlar arqalı sáwlelendiriw.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kórkem obrazlar arqalı súwretlew', 'tek terminler qollanıw', 'qatań shablon', 'qısqa buyrıqlar'], answerIndex: 0 } }
    },
    {
      id: 'kq21q5',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Stillerdiń ortaq tárepi.',
      explanation: 'Barlıq stiller ushın ulıwma sózlik quram ortaq — olar bir milliy ádebiy tilge birlesedi; sóylew mádeniyatı menen stilistika baylanıslı; hárbir stil — kishi sistema.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Stiller bir milliy ádebiy tilge birlesedi.', value: true },
            { text: 'Sóylew mádeniyatı menen stilistika óz ara baylanıssız.', value: false },
            { text: 'Hárbir stil — ózine tán kishi sistema.', value: true },
            { text: 'Kórkem ádebiyat stilinde troplar qollanılmaydı.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq21q6',
      prompt: 'Áyyemgi grekler hám rimliler stilge qalay qaraǵan?',
      hint: 'Isendiriw.',
      explanation: 'Isendiriw óneri sıpatında.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['isendiriw óneri sıpatında', 'diniy isenim sıpatında', 'tek jazıw quralı sıpatında', 'qosıq janrı sıpatında'], answerIndex: 0 } }
    }
  ]
};
