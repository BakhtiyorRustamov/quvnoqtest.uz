import type { BoardLesson } from './types';
import { QQ_G1 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), 3-bet — Qaraqalpaqstan Respublikasınıń Mámleketlik gimni. */
export const QQ_1: BoardLesson = {
  n: 1,
  label: '1',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G1,
  title: 'Mámleketlik gimn',
  section: 'Qaraqalpaqstan Respublikasınıń Mámleketlik gimni (sózi I. Yusupov, namasi N. Muhammeddinov)',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Qaraqalpaqstan Respublikasınıń Mámleketlik gimni. Sózi Ibrayım Yusupovtiki, namasi Najimaddin Muhammeddinovtiki. Jáyhun jaǵasında ósken bayterek, Túbi bir, shaqası mıń bolar demek, Sen sonday sayalı, quyashlı elseń, Tınıshlıq hám ıǵbal sendegi tilek. Naqıratı: Diyqan baba nápesi bar jerinde, Juwsan ańqıp, kiyik qashar shólinde, «Qaraqalpaqstan» degen atıńdı, Áwladlar ádiwler júrek tórinde.',
      easy: 'Gimn — mámlekettiń ramzı. Gimnde el Jáyhun jaǵasında ósken bayterekke teńelgen: túbi bir, shaqası mıń.',
      draw: [
        { t: 'title', text: 'Mámleketlik gimn' },
        { t: 'text', x: 4, y: 15, text: 'Jáyhun jaǵasında ósken bayterek,', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 21, text: 'Túbi bir, shaqası mıń bolar demek,', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 27, text: 'Sen sonday sayalı, quyashlı elseń,', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 33, text: 'Tınıshlıq hám ıǵbal sendegi tilek.', size: 's', color: 'blue' },
        { t: 'text', x: 4, y: 41, text: 'Naqıratı:', size: 's', color: 'orange' },
        { t: 'text', x: 4, y: 47, text: 'Diyqan baba nápesi bar jerinde,', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 53, text: 'Juwsan ańqıp, kiyik qashar shólinde,', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 59, text: '«Qaraqalpaqstan» degen atıńdı,', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 65, text: 'Áwladlar ádiwler júrek tórinde.', size: 's', color: 'green' }
      ],
      next: 'Ekinshi kuplet'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Aydın keleshekke shaqırar zaman, Mártlik, miynet, bilim jetkizer oǵan. Xalqıń bar azamat, dos hám mehriban, Erkin jaynap-jasnap, máńgi bol aman. Gimn naqırat penen tamamlanadı.',
      easy: 'Ekinshi kuplet keleshekke shaqıradı: oǵan mártlik, miynet hám bilim jetkizedi. Sońında naqırat qaytalanadı.',
      draw: [
        { t: 'title', text: 'Ekinshi kuplet' },
        { t: 'text', x: 4, y: 16, text: 'Aydın keleshekke shaqırar zaman,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 22, text: 'Mártlik, miynet, bilim jetkizer oǵan.', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 28, text: 'Xalqıń bar azamat, dos hám mehriban,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 34, text: 'Erkin jaynap-jasnap, máńgi bol aman.', size: 's', color: 'purple' },
        { t: 'box', id: 'a', x: 4, y: 44, w: 44, h: 12, text: 'sózi: I. Yusupov', color: 'blue' },
        { t: 'box', id: 'b', x: 52, y: 44, w: 44, h: 12, text: 'namasi: N. Muhammeddinov', color: 'green' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Qaraqalpaqstan Respublikasınıń Mámleketlik gimniniń sózi I. Yusupovtiki, namasi N. Muhammeddinovtiki.',
    'Gimn eki kuplet hám naqırattan ibarat; naqırat hár kupletten soń qaytalanadı.',
    'El Jáyhun jaǵasında ósken bayterekke teńelgen: «túbi bir, shaqası mıń».'
  ],
  questions: [
    {
      id: 'kq1q1',
      prompt: 'Gimnniń sóziniń avtorı kim?',
      hint: 'Belgili qaraqalpaq shayırı.',
      explanation: 'Gimnniń sózi Ibrayım Yusupovtiki.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['I. Yusupov', 'N. Muhammeddinov', 'Berdaq', 'Ájiniyaz'], answerIndex: 0 } }
    },
    {
      id: 'kq1q2',
      prompt: 'Gimnniń namasın kim jazǵan?',
      hint: 'Kompozitor.',
      explanation: 'Namasi N. Muhammeddinovtiki.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['N. Muhammeddinov', 'I. Yusupov', 'T. Qayıpbergenov', 'Ótesh'], answerIndex: 0 } }
    },
    {
      id: 'kq1q3',
      prompt: 'Qatardı tolıqtırıń.',
      hint: 'Dárya jaǵasında ósken úlken terek.',
      explanation: 'Jáyhun jaǵasında ósken bayterek.',
      widget: {
        type: 'fill_blanks',
        props: { segments: [{ blank: 'Jáyhun' }, { text: 'jaǵasında ósken' }, { blank: 'bayterek' }, { text: ',' }], bank: ['Jáyhun', 'bayterek', 'Arqa', 'shınar'] }
      }
    },
    {
      id: 'kq1q4',
      prompt: 'Qatardı dawam ettiriń: «Túbi bir, shaqası …»',
      hint: 'San.',
      explanation: 'Túbi bir, shaqası mıń bolar demek.',
      widget: { type: 'text_answer', props: { before: 'Túbi bir, shaqası', after: 'bolar demek,', answer: 'mıń', width: 5 } }
    },
    {
      id: 'kq1q5',
      prompt: 'Naqıratta shólde qaysı ósimlik ańqıydı hám qaysı haywan qashadı?',
      hint: 'Ashshı iyisli ósimlik.',
      explanation: '«Juwsan ańqıp, kiyik qashar shólinde».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['juwsan hám kiyik', 'jantaq hám túlki', 'seksewil hám qasqır', 'qamıs hám qaban'], answerIndex: 0 } }
    },
    {
      id: 'kq1q6',
      prompt: 'Keleshekke ne jetkizedi? Gimndegi úsh sózdi tabıń.',
      hint: 'Ekinshi kupletti eske túsiriń.',
      explanation: '«Mártlik, miynet, bilim jetkizer oǵan».',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'mártlik', match: true },
            { id: 'b', text: 'miynet', match: true },
            { id: 'c', text: 'bilim', match: true },
            { id: 'd', text: 'baylıq', match: false },
            { id: 'e', text: 'táǵdir', match: false }
          ]
        }
      }
    },
    {
      id: 'kq1q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Gimnniń dúzilisin eske túsiriń.',
      explanation: 'Gimnde eki kuplet bar, naqırat hár kupletten soń qaytalanadı; «Qaraqalpaqstan» atın áwladlar júrek tórinde ádiwleydi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Gimnde naqırat eki ret aytıladı.', value: true },
            { text: 'Gimn úsh kupletten ibarat.', value: false },
            { text: '«Qaraqalpaqstan» atın áwladlar júrek tórinde ádiwleydi.', value: true },
            { text: 'Gimnde el teńizge teńelgen.', value: false }
          ]
        }
      }
    },
    {
      id: 'kq1q8',
      prompt: 'Sózlerdi tártipke salıp, gimn qatarın dúziń.',
      hint: '«Erkin…» dep baslanadı.',
      explanation: 'Erkin jaynap-jasnap, máńgi bol aman.',
      widget: { type: 'sentence_order', props: { words: ['Erkin', 'jaynap-jasnap,', 'máńgi', 'bol', 'aman.'] } }
    }
  ]
};
