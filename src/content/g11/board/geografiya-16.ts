import type { BoardLesson } from './types';
import { GEO4 } from './geografiya-13';

/** Darslik: Geografiya 10, 16-§ (68–72-betlar) — atrof-muhit monitoringi (bioekologik, geoekologik, biosfera bosqichlari), Oʻzbekistonda monitoring, geografik-ekologik ekspertiza. */
export const GEO_16: BoardLesson = {
  n: 16,
  label: '16',
  group: GEO4,
  title: 'Atrof-muhit monitoringi va geografik-ekologik ekspertiza',
  section: '16-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Jamiyatning tabiatga taʼsiri kuchaygani sari tabiiy muhitni muntazam kuzatish zarurati paydo boʻldi. «Monitoring» tushunchasi 1972-yilda Stokgolmda boʻlgan BMTning atrof-muhitga bagʻishlangan konferensiyasi arafasida paydo boʻldi; lotincha «monitor» — «ogohlantiruvchi» degani. Monitoring — hudud tabiiy sharoitini kuzatish, nazorat qilish va boshqarish tizimi. Akademik I. P. Gerasimov uning uch bosqichini ajratgan: bioekologik — ifloslanishning inson salomatligiga taʼsiri kuzatiladi; geoekologik — geotizimlar va ularning oʻz-oʻzini tozalash qobiliyati kuzatiladi; biosfera monitoringi — butun dunyo miqyosida atmosfera changlanishi, okean ifloslanishi va ozon qatlami kuzatiladi.",
      easy: "Monitoring — tabiatni kuzatish va nazorat tizimi (1972, Stokgolm); bosqichlari: bioekologik, geoekologik, biosfera.",
      draw: [
        { t: 'title', text: 'Monitoring bosqichlari' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'bioekologik', color: 'green' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'geoekologik', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'biosfera', color: 'purple' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 46, text: 'salomatlik → geotizimlar → butun dunyo', size: 's' }
      ],
      next: 'Oʻzbekiston va ekspertiza'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻzbekistonda monitoringni bir nechta tashkilot olib boradi: havo va suv havzalarini — Gidrometeorologiya xizmati, yer osti suvlarini — «Oʻzbekgidrogeologiya», tuproq shoʻrlanishini — Qishloq va suv xoʻjaligi vazirligi, oʻrmonlarni — Oʻrmon xoʻjaligi qoʻmitasi, salomatlikka taʼsirini — Sogʻliqni saqlash vazirligi. Ularning ishini Ekologiya va atrof-muhitni muhofaza qilish davlat qoʻmitasi boshqaradi. Ekspertiza — yirik inshootlar loyihalarini mutaxassislar koʻrigidan oʻtkazish; «ekspert» lotincha «tajribali» degani. Geografik ekspertiza inshootning atrof-muhit talablariga mosligini, ekologik ekspertiza esa uning oʻsimlik va hayvonot dunyosiga taʼsirini baholaydi; birgalikda ular geografik-ekologik ekspertiza deyiladi. Oʻzbekistonda bunday ekspertiza 1990-yillardan oʻtkazilmoqda.",
      easy: "Oʻzbekistonda monitoringni bir nechta tashkilot olib boradi; ekspertiza — loyihalarni mutaxassislar tekshiruvi.",
      draw: [
        { t: 'title', text: 'Kim nimani kuzatadi' },
        { t: 'table', x: 4, y: 18, rows: [['obyekt', 'tashkilot'], ['havo va suv havzalari', 'Gidrometeorologiya xizmati'], ['yer osti suvlari', '«Oʻzbekgidrogeologiya»'], ['tuproq shoʻrlanishi', 'Qishloq va suv xoʻjaligi'], ['inson salomatligi', 'Sogʻliqni saqlash vazirligi']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Monitoring — hudud tabiiy sharoitini kuzatish, nazorat qilish va boshqarish tizimi; tushuncha 1972-yilgi Stokgolm konferensiyasi arafasida paydo boʻlgan.',
    'I. P. Gerasimov monitoringning bioekologik, geoekologik va biosfera bosqichlarini ajratgan; Oʻzbekistonda uni bir nechta tashkilot olib boradi va Ekologiya qoʻmitasi boshqaradi.',
    'Geografik-ekologik ekspertiza yirik inshootlar loyihalarining atrof-muhit, tirik tabiat va aholi salomatligiga taʼsirini baholaydi.'
  ],
  questions: [
    {
      id: 'g16q1',
      prompt: 'Monitoring bosqichlarini qamrovi kengayib borishi tartibida joylashtiring.',
      hint: 'Avval inson, oxirida butun dunyo.',
      explanation: 'Bioekologik → geoekologik → biosfera monitoringi.',
      widget: { type: 'order_line', props: { items: [{ label: 'bioekologik' }, { label: 'geoekologik' }, { label: 'biosfera' }] } }
    },
    {
      id: 'g16q2',
      prompt: '«Monitoring» tushunchasi qaysi yilgi BMT konferensiyasi arafasida paydo boʻlgan?',
      hint: 'Stokgolm.',
      explanation: '1972-yil.',
      widget: { type: 'number_answer', props: { answer: 1972, unit: 'yil' } }
    },
    {
      id: 'g16q3',
      prompt: 'Kuzatish obyektini tashkilot bilan juftlang.',
      hint: 'Salomatlik — Sogʻliqni saqlash.',
      explanation: 'Havo va suv havzalari — Gidrometeorologiya xizmati; yer osti suvlari — «Oʻzbekgidrogeologiya»; inson salomatligiga taʼsir — Sogʻliqni saqlash vazirligi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'havo va suv havzalari', right: 'Gidrometeorologiya xizmati' },
            { left: 'yer osti suvlari', right: '«Oʻzbekgidrogeologiya»' },
            { left: 'salomatlikka taʼsir', right: 'Sogʻliqni saqlash vazirligi' }
          ]
        }
      }
    },
    {
      id: 'g16q4',
      prompt: 'Oʻzbekistonda monitoring tashkilotlari faoliyatini qaysi organ boshqaradi?',
      hint: 'Ekologiya.',
      explanation: 'Ekologiya va atrof-muhitni muhofaza qilish davlat qoʻmitasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Ekologiya va atrof-muhitni muhofaza qilish davlat qoʻmitasi', 'Madaniyat vazirligi', 'Sport qoʻmitasi', 'Transport vazirligi'], answerIndex: 0 } }
    },
    {
      id: 'g16q5',
      prompt: 'Ekspertiza turini u baholaydigan narsaga ajrating.',
      hint: 'Ekologik — tirik tabiat.',
      explanation: 'Geografik ekspertiza — inshootning atrof-muhit talablariga mosligi, relyef va suvga taʼsiri; ekologik ekspertiza — oʻsimlik, hayvonot dunyosi va mikroorganizmlarga taʼsiri.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'g', label: 'geografik ekspertiza' }, { id: 'e', label: 'ekologik ekspertiza' }],
          items: [
            { emoji: '📐', label: 'atrof-muhit talablariga moslik', bin: 'g' },
            { emoji: '⛰️', label: 'relyef va yer osti suvlariga taʼsir', bin: 'g' },
            { emoji: '🌿', label: 'oʻsimliklarga taʼsir', bin: 'e' },
            { emoji: '🦊', label: 'hayvonot dunyosiga taʼsir', bin: 'e' }
          ]
        }
      }
    },
    {
      id: 'g16q6',
      prompt: 'Biosfera monitoringida nimalar kuzatiladi?',
      hint: 'Dunyo miqyosi.',
      explanation: 'Atmosfera changlanishi, Dunyo okeanining ifloslanishi, ozon qatlamining yupqalanishi, issiqxona samarasi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'atmosferaning changlanishi', correct: true },
            { label: 'Dunyo okeanining ifloslanishi', correct: true },
            { label: 'ozon qatlamining yupqalanishi', correct: true },
            { label: 'bitta maktab hovlisi' }
          ]
        }
      }
    },
    {
      id: 'g16q7',
      prompt: '«Ekspert» soʻzi lotin tilida qanday maʼno beradi?',
      hint: 'Mutaxassis.',
      explanation: '«Tajribali».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«tajribali»', '«ogohlantiruvchi»', '«quruvchi»', '«kuzatuvchi»'], answerIndex: 0 } }
    },
    {
      id: 'g16q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Asaka zavodi ekspertizadan oʻtgan.',
      explanation: 'Asakadagi avtomobil zavodi va Qorovulbozordagi neftni qayta ishlash zavodi ekspertizadan oʻtgan; Oʻzbekistonda ekspertiza 1990-yillardan oʻtkaziladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Asakadagi avtomobil zavodi loyihasi ekologik ekspertizadan oʻtkazilgan.', value: true },
            { text: 'Oʻzbekistonda yirik loyihalar 1990-yillardan geografik-ekologik ekspertizadan oʻtkazilmoqda.', value: true },
            { text: 'Monitoring faqat bir martalik kuzatishdir.', value: false },
            { text: 'Bioekologik monitoring faqat okean tubini oʻrganadi.', value: false }
          ]
        }
      }
    }
  ]
};
