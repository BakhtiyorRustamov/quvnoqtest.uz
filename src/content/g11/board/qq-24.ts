import type { BoardLesson } from './types';
import { QQ_G6 } from './qq-groups';

/** Sabaqlıq: Qaraqalpaq tili 11 (2018), § 23–24, 94–101-betler — Isenim xat, kelisim xat, kórsetpe. */
export const QQ_24: BoardLesson = {
  n: 24,
  label: '24',
  lang: 'kaa',
  easyLang: 'kaa',
  group: QQ_G6,
  title: 'Isenim xat, kelisim xat, kórsetpe',
  section: '§ 23 — 24. Isenim xat. Kelisim xat (rezolyuciya). Kórsetpe',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: 'Isenim xat — mákeme yamasa adamnıń óz atınan ekinshi bir adamǵa isenim bildirip, wákillik beretuǵın jazba hújjet. Ol rásmiy hám jeke bolıp ekige bólinedi. Kólemine qaray: bir retlik, arnawlı hám ulıwma. Rásmiy isenim xattıń múddeti úsh jıldan aspawı kerek; múddeti kórsetilmese, bir jılǵa shekem kúshin saqlaydı. Napaqa alıw ushın jeke isenim xattıń múddeti úsh ayǵa shekem. Jeke isenim xatlar ápiwayı hám notarial bolıp bólinedi.',
      easy: 'Isenim xat — basqaǵa wákillik beriw. Rásmiy hám jeke; múddeti kóp degende 3 jıl, kórsetilmese 1 jıl.',
      draw: [
        { t: 'title', text: 'Isenim xat' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 10, text: 'rásmiy', color: 'blue' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 10, text: 'jeke', color: 'green' },
        { t: 'text', x: 4, y: 31, text: 'bir retlik, arnawlı, ulıwma', size: 's', color: 'blue' },
        { t: 'text', x: 52, y: 31, text: 'ápiwayı, notarial', size: 's', color: 'green' },
        { t: 'text', x: 4, y: 42, text: 'múddeti: kóp degende 3 jıl', size: 's', color: 'ink' },
        { t: 'text', x: 4, y: 48, text: 'kórsetilmese — 1 jıl; napaqaǵa — 3 ay', size: 's', color: 'ink' }
      ],
      next: 'Kelisim xat hám kórsetpe'
    },
    {
      kind: 'explain',
      clear: true,
      say: 'Kelisim xat, yaǵnıy rezolyuciya — basshınıń kelip túsken hújjet ústine ne islew kerekligin belgileytuǵın qısqa jazıwı. Onıń bólimleri: orınlawshınıń atı, qısqa kórsetpe, orınlaw múddeti, basshınıń qolı hám sáne. Ol birinshi bettiń joqarǵı bos ornına sıya menen jazıladı. Kórsetpe — nızam hám normativ hújjetlerdi túsindiriw ushın shıǵarılatuǵın huqıqıy hújjet. Onıń joqarısında «Tastıyıqlayman» dep jazıladı; tekstte «kerek», «lazım», «shárt», «múmkin emes», «jol qoyılmaydı» sıyaqlı sózler qollanıladı.',
      easy: 'Kelisim xat — basshınıń hújjetke qısqa buyrıq jazıwı. Kórsetpe — qaǵıydalardı túsindiretuǵın hújjet, «Tastıyıqlayman» menen baslanadı.',
      draw: [
        { t: 'title', text: 'Kelisim xat hám kórsetpe' },
        { t: 'box', id: 'a', x: 4, y: 15, w: 44, h: 10, text: 'kelisim xat', color: 'purple' },
        { t: 'box', id: 'b', x: 52, y: 15, w: 44, h: 10, text: 'kórsetpe', color: 'orange' },
        { t: 'text', x: 4, y: 31, text: '= rezolyuciya', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 37, text: 'orınlawshı, múddet, qol', size: 's', color: 'purple' },
        { t: 'text', x: 52, y: 31, text: '«Tastıyıqlayman»', size: 's', color: 'orange' },
        { t: 'text', x: 52, y: 37, text: 'kerek, lazım, shárt', size: 's', color: 'orange' }
      ],
      next: 'Sorawlarǵa ótemiz'
    }
  ],
  summary: [
    'Isenim xat — wákillik beretuǵın hújjet; rásmiy (bir retlik, arnawlı, ulıwma) hám jeke (ápiwayı, notarial) bolıp bólinedi.',
    'Rásmiy isenim xat 3 jıldan aspaydı; múddeti kórsetilmese — 1 jıl; napaqa alıwǵa — 3 ayǵa shekem.',
    'Kelisim xat (rezolyuciya) — basshınıń hújjet ústine qısqa kórsetpesi; kórsetpe — normativ hújjetlerdi túsindiretuǵın huqıqıy hújjet.'
  ],
  questions: [
    {
      id: 'kq24q1',
      prompt: 'Rásmiy isenim xattıń háreket etiw múddeti kóp degende qansha?',
      hint: 'Jıl menen.',
      explanation: 'Úsh jıldan artıq bolmawı kerek.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'jıl' } }
    },
    {
      id: 'kq24q2',
      prompt: 'Isenim xatta múddet kórsetilmese, ol qansha waqıt kúshin saqlaydı?',
      hint: 'Berilgen kúnnen baslap.',
      explanation: 'Bir jılǵa shekem.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bir jıl', 'bir ay', 'úsh jıl', 'máńgi'], answerIndex: 0 } }
    },
    {
      id: 'kq24q3',
      prompt: 'Isenim xat túrlerin toparlarǵa ajıratıń.',
      hint: 'Notarial — jeke.',
      explanation: 'Rásmiy: bir retlik, arnawlı, ulıwma. Jeke: ápiwayı, notarial.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [{ id: 'r', label: 'rásmiy (kólemi)' }, { id: 'j', label: 'jeke (tastıyıqlanıwı)' }],
          tiles: [
            { id: 'a', label: 'bir retlik', bin: 'r' },
            { id: 'b', label: 'arnawlı', bin: 'r' },
            { id: 'c', label: 'ulıwma', bin: 'r' },
            { id: 'd', label: 'ápiwayı', bin: 'j' },
            { id: 'e', label: 'notarial', bin: 'j' }
          ]
        }
      }
    },
    {
      id: 'kq24q4',
      prompt: 'Kelisim xattıń ekinshi atı qanday?',
      hint: 'Latınnan kelgen termin.',
      explanation: 'Rezolyuciya.',
      widget: { type: 'text_answer', props: { before: 'Kelisim xat —', after: '', answer: ['rezolyuciya'], width: 12 } }
    },
    {
      id: 'kq24q5',
      prompt: 'Kórsetpeniń joqarısında qanday sóz jazıladı?',
      hint: 'Basshı tastıyıqlaydı.',
      explanation: '«Tastıyıqlayman».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Tastıyıqlayman»', '«Qutlıqlayman»', '«Daǵaza»', '«Kún tártibinde»'], answerIndex: 0 } }
    },
    {
      id: 'kq24q6',
      prompt: 'Kelisim xattıń zárúrli bólimlerin belgileń.',
      hint: 'Kim, ne, qashan, kim qol qoydı.',
      explanation: 'Orınlawshınıń atı, qısqa kórsetpe, orınlaw múddeti, basshınıń qolı, sáne.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'orınlawshınıń atı', match: true },
            { id: 'b', text: 'qısqa kórsetpe', match: true },
            { id: 'c', text: 'basshınıń qolı', match: true },
            { id: 'd', text: 'sáne', match: true },
            { id: 'e', text: 'qosıq qatarı', match: false }
          ]
        }
      }
    },
    {
      id: 'kq24q7',
      prompt: 'Durıs pa, nadurıs pa?',
      hint: 'Napaqa alıw ushın isenim xat.',
      explanation: 'Napaqa alıwǵa isenim xat 3 ayǵa shekem; kelisim xat birinshi bettiń joqarǵı bos ornına jazıladı; kórsetpede «jol qoyılmaydı» sıyaqlı sózler qollanıladı.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Napaqa alıw ushın jeke isenim xattıń múddeti úsh ayǵa shekem.', value: true },
            { text: 'Kelisim xat hújjettiń sońǵı betine jazıladı.', value: false },
            { text: 'Kórsetpede «kerek», «lazım», «jol qoyılmaydı» sózleri qollanıladı.', value: true },
            { text: 'Jeke isenim xatlar tek notarial boladı.', value: false }
          ]
        }
      }
    }
  ]
};
