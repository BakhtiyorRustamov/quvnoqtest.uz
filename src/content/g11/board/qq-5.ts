import type { BoardLesson } from './types';
import { QQ_G1 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 3, 23–29-betler — Mádeniyatlı sóylew hám onı qáliplestiretuǵın belgiler. */
export const QQ_5: BoardLesson = {
  n: 5,
  label: '5',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G1,
  title: 'Mádeniyatlı sóylew',
  section: '§ 3. Mádeniyatlı sóylew hám onı qáliplestiretuǵın tiykarǵı belgiler',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Mádeniyatlı sóylew — tek sıpayılıq emes, ol sózdi dál qollanıw sheberligi, pikirdiń anıqlıǵı, oydıń ıqshamlılıǵı hám til ótkirligi. Belinskiy «Sóz — oydıń sáwlesi» degen. Ana tilimizde ózimizdiń sózimiz bola tura, basqa tildiń sózin orınsız qollanıw — qáte: «obedke ketti», «zvonok boldı», «chernovikke jazdım» dewdiń ornına «túslikke ketti», «qońıraw boldı», «qaralamaǵa jazdım» dew kerek. «Yaǵnıy», «sonday», «búytip» sıyaqlı sózlerdi orınsız qaytalaw da pikirdi túsiniksiz etedi.',
      easy: 'Mádeniyatlı sóylew — sózdi dál, anıq, qısqa qollanıw. Óz sózimiz bolsa, basqa tildiń sózin aralastırmaw kerek.',
      draw: [
        { t: 'title', text: 'Orınsız sóz — durıs sóz' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['orınsız', 'durısı'],
            ['obedke ketti', 'túslikke ketti'],
            ['zvonok boldı', 'qońıraw boldı'],
            ['chernovikke jazdım', 'qaralamaǵa jazdım'],
            ['svet', 'shıraq'],
            ['kvartira', 'ójire, bólme']
          ]
        }
      ],
      next: 'Sózdi jumsaq aytıw'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Janǵa azar beretuǵın sózlerdiń ornına jumsaǵıraq sinonimin qollanǵan maqul: «kesel» sóziniń ornına «nawqas», «biytap», «awırıw»; «óldi» sóziniń ornına «qaytıs boldı», «dúnyadan ótti», «kóz jumdı». Frazeologizmler tilge ótkirlik beredi: «iyne menen qudıq qazǵanday», «tırnaq astınan kir izlew», «qoy awzınan shóp almaw». Xalqımız: «Jaqsı sóz — jarım ırıs», «Tayaq etten ótedi, sóz súyekten ótedi» dep sózdiń qúdiretin bahalaǵan.',
      easy: 'Awır sózdi jumsaq aytıń: «óldi» emes, «qaytıs boldı». Frazeologizm hám naqıllar sózdi ótkir etedi.',
      draw: [
        { t: 'title', text: 'Jumsaq aytıw' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 30, h: 12, text: 'kesel', color: 'red' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 12, text: 'nawqas, biytap', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'box', id: 'c', x: 4, y: 32, w: 30, h: 12, text: 'óldi', color: 'red' },
        { t: 'box', id: 'd', x: 52, y: 32, w: 44, h: 12, text: 'qaytıs boldı', color: 'green' },
        { t: 'arrow', from: 'c', to: 'd' },
        { t: 'text', x: 4, y: 54, text: '«Jaqsı sóz — jarım ırıs.»', size: 's', color: 'purple' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Mádeniyatlı sóylew — sózdi dál qollanıw, pikirdiń anıqlıǵı, oydıń ıqshamlılıǵı, til ótkirligi.',
    'Óz sózimiz bola tura basqa tildiń sózin orınsız qollanıw hám «yaǵnıy, sonday» sıyaqlı sózlerdi qaytalaw — qáte.',
    'Awır sózlerdiń ornına jumsaq sinonimler qollanıladı: kesel — nawqas, óldi — qaytıs boldı.',
    'Naqıl-maqal hám frazeologizmler sóylewge ótkirlik beredi.'
  ],
  questions: [
    {
      id: 'kq5q1',
      prompt: 'Orınsız qollanılǵan sózdi qaraqalpaqsha durıs sózi menen sáykeslendiriń.',
      hint: 'zvonok — qońıraw.',
      explanation: 'obed — túslik; zvonok — qońıraw; chernovik — qaralama; svet — shıraq.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'obedke ketti' }, right: { label: 'túslikke ketti' } },
            { left: { label: 'zvonok boldı' }, right: { label: 'qońıraw boldı' } },
            { left: { label: 'chernovikke jazdım' }, right: { label: 'qaralamaǵa jazdım' } },
            { left: { label: 'svet' }, right: { label: 'shıraq' } }
          ]
        }
      }
    },
    {
      id: 'kq5q2',
      prompt: '«Kesel» sóziniń janǵa azar bermeytuǵın sinonimlerin tabıń.',
      hint: 'Úsh sóz.',
      explanation: 'nawqas, biytap, awırıw.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'nawqas', match: true },
            { id: 'b', text: 'biytap', match: true },
            { id: 'c', text: 'awırıw', match: true },
            { id: 'd', text: 'saw', match: false },
            { id: 'e', text: 'kúshli', match: false }
          ]
        }
      }
    },
    {
      id: 'kq5q3',
      prompt: '«Óldi» sóziniń ornına qollanılmaytuǵın sózdi tabıń.',
      hint: 'Úshewi — jumsaq aytıw.',
      explanation: '«Qaytıs boldı, dúnyadan ótti, kóz jumdı» — jumsaq aytıw; «jıǵıldı» — basqa máni.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'qaytıs boldı' }, { text: 'dúnyadan ótti' }, { text: 'kóz jumdı' }, { text: 'jıǵıldı', odd: true }] } }
    },
    {
      id: 'kq5q4',
      prompt: '«Sóz — oydıń sáwlesi» degen pikirdi kim aytqan?',
      hint: 'Ullı sınshı.',
      explanation: 'V. G. Belinskiy.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['V. G. Belinskiy', 'Demosfen', 'Ibn Sina', 'Kayqawıs'], answerIndex: 0 } }
    },
    {
      id: 'kq5q5',
      prompt: 'Naqıldı tolıqtırıń.',
      hint: 'Tayaq — etten, sóz — …',
      explanation: '«Tayaq etten ótedi, sóz súyekten ótedi».',
      widget: { type: 'text_answer', props: { before: 'Tayaq etten ótedi, sóz', after: 'ótedi.', answer: 'súyekten', width: 9 } }
    },
    {
      id: 'kq5q6',
      prompt: 'Mádeniyatlı sóylewdiń belgilerin ajıratıń.',
      hint: 'Qaysıları pikirdi túsiniksiz etedi?',
      explanation: 'Sózdi dál qollanıw, oydıń ıqshamlılıǵı — mádeniyatlı sóylew; «yaǵnıy, sonday» dep qaytalaw, basqa tildiń sózin aralastırıw — kemshilik.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'g', label: 'mádeniyatlı sóylew' }, { id: 'b', label: 'kemshilik' }],
          tiles: [
            { id: 'a', label: 'sózdi dál qollanıw', bin: 'g' },
            { id: 'b', label: 'oydıń ıqshamlılıǵı', bin: 'g' },
            { id: 'c', label: 'pikirdiń anıqlıǵı', bin: 'g' },
            { id: 'd', label: '«yaǵnıy, sonday» dep qaytalaw', bin: 'b' },
            { id: 'e', label: 'basqa tildiń sózin aralastırıw', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'kq5q7',
      prompt: 'Frazeologizmdi mánisi menen sáykeslendiriń.',
      hint: 'Iyne menen qudıq qazıw — júdá qıyın, uzaq jumıs.',
      explanation: 'iyne menen qudıq qazǵanday — júdá qıyın jumıs; tırnaq astınan kir izlew — bilinbes kemshilik izlew; qoy awzınan shóp almaw — júdá juwas.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'iyne menen qudıq qazǵanday' }, right: { label: 'júdá qıyın, uzaq jumıs' } },
            { left: { label: 'tırnaq astınan kir izlew' }, right: { label: 'bilinbes kemshilik izlew' } },
            { left: { label: 'qoy awzınan shóp almaw' }, right: { label: 'júdá juwas, momın' } }
          ]
        }
      }
    },
    {
      id: 'kq5q8',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Mádeniyatlı sóylew degen ne?',
      explanation: 'Mádeniyatlı sóylew tek sıpayılıq emes; «doklad, kollektiv» sıyaqlı sózlerdi jazıwda qollanıw — ashınarlı jaǵday; Berdaq «shıraq» sózin qollanǵan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Mádeniyatlı sóylew — tek sıpayı sóylew.', value: false },
            { text: 'Berdaq qosıǵında «shıraq» sózi qollanılǵan.', value: true },
            { text: '«Krujok, doklad» sıyaqlı sózlerdi jazıwda qollanıw — durıs.', value: false },
            { text: 'Naqıl-maqallar sóylewdi ótkir hám tásirli etedi.', value: true }
          ]
        }
      }
    }
  ]
};
