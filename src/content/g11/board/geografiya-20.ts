import type { BoardLesson } from './types';

export const GEO6 = { kicker: '6-bob', title: 'Dunyoning geosiyosiy manzarasi va global muammolar' };

/** Darslik: Geografiya 10, 20-§ (82–85-betlar) — geosiyosat fani, uch ilmiy yondashuv, geosiyosiy davrlar (Vestfal, Vena, Versal, Potsdam, Belovej). */
export const GEO_20: BoardLesson = {
  n: 20,
  label: '20',
  group: GEO6,
  title: 'Dunyoning geosiyosiy tizimi va uning shakllanishi',
  section: '20-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Geosiyosat — davlatlarning geografik oʻrni va siyosat oʻrtasidagi bogʻliqlikni, hudud ustidan nazorat qilish yoʻllarini oʻrganuvchi fan. «Geosiyosat» atamasini shved olimi Rudolf Chellen kiritgan, fanning «otasi» esa nemis olimi Fridrix Ratsel hisoblanadi. Fan uch yondashuv asosida rivojlangan. Sivilizatsion yondashuv tarixni turli madaniy-diniy jamoalar — sivilizatsiyalar harakatlantiradi, deydi; S. Xantington 1993-yilda «Sivilizatsiyalar toʻqnashuvi» kitobini yozgan. Harbiy-strategik yondashuv dengizboʻyi davlatlarining geografik oʻrniga eʼtibor beradi. Geografik determinizm — eng qadimgisi: iqlim va tabiat odamlar hayoti va siyosatga taʼsir qiladi, deydi; uning ildizi Gerodot va Aristoteldan boshlanadi.",
      easy: "Geosiyosat — geografik oʻrin va siyosat bogʻliqligi; yondashuvlar: sivilizatsion, harbiy-strategik, geografik determinizm.",
      draw: [
        { t: 'title', text: 'Geosiyosatdagi yondashuvlar' },
        { t: 'table', x: 4, y: 18, rows: [['yondashuv', 'asosiy gʻoya'], ['sivilizatsion', 'tarixni sivilizatsiyalar quradi'], ['harbiy-strategik', 'dengizboʻyi oʻrni hal qiladi'], ['geografik determinizm', 'tabiat siyosatga taʼsir qiladi']] }
      ],
      next: 'Geosiyosiy davrlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Geosiyosat nuqtai nazaridan dunyo tarixi bir nechta davrdan iborat. Vestfal davri 1648-yildagi shartnomadan boshlangan: Yevropaning kuchli davlatlari hukmronlik uchun kurashgan. Vena davri 1814–1815-yillardagi Vena kongressidan boshlangan va Birinchi jahon urushi bilan tugagan. Versal davri 1919-yildagi Versal shartnomasidan boshlanib, Ikkinchi jahon urushigacha davom etgan. Potsdam davri 1945-yildan boshlangan: dunyo ikki qutbli boʻlib, ikki blok oʻrtasida «sovuq urush» kechgan. Belovej davri 1991-yil 8-dekabrda SSSR tugatilgani haqidagi kelishuvdan boshlangan; uning oʻrnida mustaqil davlatlar paydo boʻldi. Bu davr hali davom etmoqda.",
      easy: "Davrlar: Vestfal (1648) → Vena (1815) → Versal (1919) → Potsdam (1945) → Belovej (1991).",
      draw: [
        { t: 'title', text: 'Geosiyosiy davrlar' },
        { t: 'table', x: 4, y: 18, rows: [['davr', 'boshlanishi'], ['Vestfal', '1648'], ['Vena', '1814–1815'], ['Versal', '1919'], ['Potsdam', '1945'], ['Belovej', '1991-yil 8-dekabr']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Geosiyosat — davlatlarning geografik oʻrni va siyosat oʻrtasidagi bogʻliqlikni oʻrganadi; atamani R. Chellen kiritgan, fanning «otasi» — F. Ratsel.',
    'Geosiyosat sivilizatsion, harbiy-strategik va geografik determinizm yondashuvlari asosida rivojlangan.',
    'Dunyoning geosiyosiy tarixi Vestfal (1648), Vena (1815), Versal (1919), Potsdam (1945) va Belovej (1991) davrlariga boʻlinadi; Belovej davri hali davom etmoqda.'
  ],
  questions: [
    {
      id: 'g20q1',
      prompt: 'Geosiyosiy davrlarni tartiblang.',
      hint: 'Vestfal — 1648.',
      explanation: 'Vestfal → Vena → Versal → Potsdam → Belovej.',
      widget: { type: 'order_line', props: { items: [{ label: 'Vestfal' }, { label: 'Vena' }, { label: 'Versal' }, { label: 'Potsdam' }, { label: 'Belovej' }] } }
    },
    {
      id: 'g20q2',
      prompt: 'Davrni uning boshlanish yili bilan juftlang.',
      hint: 'Potsdam — urush tugashi.',
      explanation: 'Vestfal — 1648; Versal — 1919; Potsdam — 1945; Belovej — 1991.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Vestfal davri', right: '1648' },
            { left: 'Versal davri', right: '1919' },
            { left: 'Potsdam davri', right: '1945' },
            { left: 'Belovej davri', right: '1991' }
          ]
        }
      }
    },
    {
      id: 'g20q3',
      prompt: '«Geosiyosat» atamasini fanga kim kiritgan?',
      hint: 'Shved olimi.',
      explanation: 'Rudolf Chellen.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Rudolf Chellen', 'Fridrix Ratsel', 'S. Xantington', 'A. Gumboldt'], answerIndex: 0 } }
    },
    {
      id: 'g20q4',
      prompt: 'Olimni yondashuvga ajrating.',
      hint: 'Xantington — sivilizatsiyalar.',
      explanation: 'Sivilizatsion — S. Xantington, A. Toynbi; geografik determinizm — Gerodot, Sh. Monteskye.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 's', label: 'sivilizatsion' }, { id: 'g', label: 'geografik determinizm' }],
          items: [
            { emoji: '📘', label: 'S. Xantington', bin: 's' },
            { emoji: '📗', label: 'A. Toynbi', bin: 's' },
            { emoji: '📜', label: 'Gerodot', bin: 'g' },
            { emoji: '🖋️', label: 'Sh. Monteskye', bin: 'g' }
          ]
        }
      }
    },
    {
      id: 'g20q5',
      prompt: 'Geosiyosatdagi eng qadimgi yondashuv qaysi?',
      hint: 'Iqlim va tabiat.',
      explanation: 'Geografik determinizm.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['geografik determinizm', 'sivilizatsion', 'harbiy-strategik', 'iqtisodiy'], answerIndex: 0 } }
    },
    {
      id: 'g20q6',
      prompt: 'Potsdam davriga xos belgilarni tanlang.',
      hint: '1945-yildan keyin.',
      explanation: 'Ikki qutbli dunyo, ikki blok qarama-qarshiligi, «sovuq urush», yadroviy urush xavfi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'ikki qutbli dunyo', correct: true },
            { label: '«sovuq urush»', correct: true },
            { label: 'yadroviy urush xavfi', correct: true },
            { label: 'Napoleon urushlari' }
          ]
        }
      }
    },
    {
      id: 'g20q7',
      prompt: '«Sivilizatsiyalar toʻqnashuvi» kitobi qaysi yilda chop etilgan?',
      hint: 'XX asr oxiri.',
      explanation: '1993-yilda.',
      widget: { type: 'number_answer', props: { answer: 1993, unit: 'yil' } }
    },
    {
      id: 'g20q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Belovej — hali davom etmoqda.',
      explanation: 'Belovej davri hali tugamagan; geosiyosatdagi barcha qarashlar hudud ustidan nazorat gʻoyasiga qaratilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Belovej geosiyosiy davri hali davom etmoqda.', value: true },
            { text: 'Geosiyosatning asosiy gʻoyasi — hudud ustidan nazorat.', value: true },
            { text: 'Versal davri 1648-yilda boshlangan.', value: false },
            { text: 'Fridrix Ratsel shved olimi boʻlgan.', value: false }
          ]
        }
      }
    }
  ]
};
