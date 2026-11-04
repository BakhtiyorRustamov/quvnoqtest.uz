import type { BoardLesson } from './types';
import { BOB4 } from './biologiya-35';

/** Darslik: Biologiya 11, 38-§ (195–201-betlar) — hayvonot dunyosidagi evolutsion oʻzgarishlar: bir hujayralilardan sutemizuvchilargacha. */
export const BIO_38: BoardLesson = {
  n: 38,
  label: '38',
  group: BOB4,
  title: 'Hayvonot dunyosidagi evolutsion oʻzgarishlar',
  section: '38-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Dengiz mollyuskasi lichinkasi koʻp tukli halqali chuvalchang lichinkasidan deyarli farq qilmaydi. Lansetnikning ayirish organlari esa chuvalchanglarnikiga oʻxshaydi. Bunday oʻxshashliklar barcha hayvonlar yagona umumiy ajdoddan kelib chiqqanini koʻrsatadi — shuning uchun hayvonot olamini shajara daraxti sifatida tasvirlash mumkin.",
      easy: "Oʻxshash belgilar — umumiy ajdod belgisi; hayvonlar shajara daraxti.",
      draw: [
        { t: 'title', text: 'Hayvonlar shajarasi' },
        { t: 'icon', x: 16, y: 40, emoji: '🌳', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['mollyuska ≈ halqali (lichinka)', 'lansetnik ≈ halqalilar', '→ umumiy ajdod'] }
      ],
      next: 'Bir hujayralilar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Birlamchi okeanda organik moddalardan protobiontlar hosil boʻlgan; tabiiy tanlanish bilan ulardan prokariotlar, yadro va organoidlar paydo boʻlgach esa bir hujayrali eukariotlar kelib chiqqan. Xivchinlilar — barcha bir hujayralilarning umumiy ajdodi. Koloniya boʻlib yashovchi xivchinlilardan ikki qavatli — ektoderma va entodermali koʻp hujayralilar paydo boʻlgan: invaginatsiya gipotezasi yoki Mechnikovning migratsiya gipotezasiga koʻra. Ulardan bulutlar va boʻshliqichlilar kelib chiqqan.",
      easy: "Protobiont → prokariot → eukariot xivchinli → koloniya → ikki qavatli.",
      draw: [
        { t: 'title', text: 'Koʻp hujayralilikka yoʻl' },
        { t: 'box', id: 'a', x: 4, y: 18, w: 28, h: 8, text: 'protobiontlar', color: 'purple' },
        { t: 'box', id: 'b', x: 36, y: 18, w: 28, h: 8, text: 'prokariotlar', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 18, w: 28, h: 8, text: 'xivchinlilar', color: 'green' },
        { t: 'box', id: 'd', x: 68, y: 40, w: 28, h: 8, text: 'koloniya', color: 'orange' },
        { t: 'box', id: 'e', x: 30, y: 40, w: 34, h: 8, text: 'ikki qavatlilar', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' },
        { t: 'arrow', from: 'd', to: 'e' }
      ],
      next: 'Chuvalchanglar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Yassi chuvalchanglar suv tubida oʻrmalashga oʻtgan qadimgi boʻshliqichlilardan kelib chiqqan: ularda ikki tomonlama simmetriya, toʻqima va organlar, hazm, ayirish, nerv, jinsiy sistemalar paydo boʻlgan. Toʻgarak chuvalchanglarda tana boʻshligʻi va anal teshigi paydo boʻlgan. Halqali chuvalchanglarda harakat organlari, qorin nerv zanjiri va qon aylanish sistemasi rivojlangan. Mollyuskalarda jabra yoki oʻpka va yurak, boʻgʻimoyoqlilarda xitin skelet va boʻgʻimli oyoqlar paydo boʻlgan.",
      easy: "Yassi → toʻgarak → halqali → mollyuska va boʻgʻimoyoqlilar.",
      draw: [
        { t: 'title', text: 'Umurtqasizlar yangiliklari' },
        { t: 'table', x: 4, y: 18, rows: [['guruh', 'yangi belgi'], ['yassi chuvalchang', 'ikki tomonlama simmetriya'], ['toʻgarak', 'anal teshigi'], ['halqali', 'qon aylanish'], ['boʻgʻimoyoqli', 'xitin, boʻgʻimli oyoq']] }
      ],
      next: 'Xordalilar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Barcha xordalilarda xorda, uning ustida naysimon nerv sistemasi bor. Bir guruh qumga koʻmilib, lansetniklarni berdi; boshqasi faol yirtqich boʻlib, togʻayli baliqlarni, ulardan suyakli baliqlarni berdi. Iqlim quruqlashganda panjaqanotli baliqlarning juft suzgichlari oyoqqa aylandi, oʻpka bilan nafas paydo boʻldi. Ilk quruqlik umurtqalilari — stegosefallar: oyoqlar, uch kamerali yurak, ikki qon aylanish doirasi, nogʻora parda.",
      easy: "Xorda → baliqlar → panjaqanotlilar → stegosefallar (amfibiyalar).",
      draw: [
        { t: 'title', text: 'Suvdan quruqlikka' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 28, h: 8, text: 'togʻayli baliq', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 20, w: 28, h: 8, text: 'suyakli baliq', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 20, w: 28, h: 8, text: 'panjaqanotli', color: 'orange' },
        { t: 'box', id: 'd', x: 68, y: 42, w: 28, h: 8, text: 'stegosefallar', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd', label: 'oyoq, oʻpka' }
      ],
      next: 'Amniotalar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Sudralib yuruvchilar — haqiqiy quruqlik hayvonlari: quruq teri, ichki urugʻlanish, sariqlikka boy tuxum, koʻkrak qafasi, yurak qorinchasida chala toʻsiq. Qushlar: toʻrt kamerali yurak, arterial va venoz qon aralashmaydi — tana harorati doimiy; qanot, toj suyagi, pat, havo xaltachalari. Sutemizuvchilar sudralib yuruvchilardan kelib chiqqan: miya poʻstlogʻi, jun, sut bezlari, alveolali oʻpka; bachadon va embrionning bachadonda rivojlanishi — yirik aromorfoz.",
      easy: "Reptiliya — tuxum, ichki urugʻlanish; qush va sutemizuvchi — 4 kamerali yurak, issiqqonlilik.",
      draw: [
        { t: 'title', text: 'Quruqlik umurtqalilari' },
        { t: 'table', x: 4, y: 18, rows: [['sinf', 'yurak', 'asosiy yangilik'], ['amfibiya', '3 kamerali', 'oyoqlar'], ['reptiliya', 'chala toʻsiq', 'tuxum, quruq teri'], ['qush', '4 kamerali', 'pat, uchish'], ['sutemizuvchi', '4 kamerali', 'bachadon, sut']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Protobiontlardan prokariotlar, eukariot xivchinlilar va koloniyalar orqali ikki qavatli koʻp hujayralilar (bulutlar, boʻshliqichlilar) kelib chiqqan.',
    'Yassi chuvalchanglarda ikki tomonlama simmetriya va organlar, toʻgaraklarda anal teshik, halqalilarda qon aylanish, boʻgʻimoyoqlilarda xitin skelet paydo boʻlgan.',
    'Xordalilar: baliqlar → panjaqanotlilar → stegosefallar → reptiliyalar → qushlar va sutemizuvchilar; 4 kamerali yurak — issiqqonlilik, bachadon — aromorfoz.'
  ],
  questions: [
    {
      id: 'b38q1',
      prompt: 'Guruhlarni paydo boʻlish tartibida joylashtiring.',
      hint: 'Baliqdan boshlang.',
      explanation: 'Togʻayli baliqlar → suyakli baliqlar → stegosefallar (amfibiyalar) → sudralib yuruvchilar → sutemizuvchilar.',
      widget: { type: 'order_line', props: { items: [{ label: 'togʻayli baliqlar' }, { label: 'suyakli baliqlar' }, { label: 'stegosefallar' }, { label: 'sudralib yuruvchilar' }, { label: 'sutemizuvchilar' }] } }
    },
    {
      id: 'b38q2',
      prompt: 'Hayvonlar guruhini undagi yangi belgi bilan juftlang.',
      hint: 'Halqalilarda qon tomirlari.',
      explanation: 'Yassi chuvalchang — ikki tomonlama simmetriya; toʻgarak — anal teshigi; halqali — qon aylanish sistemasi; boʻgʻimoyoqli — xitin skelet.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'yassi chuvalchanglar', right: 'ikki tomonlama simmetriya' },
            { left: 'toʻgarak chuvalchanglar', right: 'anal teshigi' },
            { left: 'halqali chuvalchanglar', right: 'qon aylanish sistemasi' },
            { left: 'boʻgʻimoyoqlilar', right: 'xitin skelet' }
          ]
        }
      }
    },
    {
      id: 'b38q3',
      prompt: 'Suvda hamda quruqlikda yashovchilarning yuragi necha kamerali?',
      hint: 'Ikki boʻlmacha + bitta qorincha.',
      explanation: '3 kamerali; qon ikki doira boʻylab aylanadi.',
      widget: { type: 'number_answer', props: { answer: 3, unit: 'kamera' } }
    },
    {
      id: 'b38q4',
      prompt: 'Sudralib yuruvchilarga xos belgilarni tanlang.',
      hint: 'Haqiqiy quruqlik hayvonlari.',
      explanation: 'Quruq teri, ichki urugʻlanish, sariqlikka boy tuxum, koʻkrak qafasi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'quruq teri', correct: true },
            { label: 'ichki urugʻlanish', correct: true },
            { label: 'sariqlikka boy tuxum', correct: true },
            { label: 'koʻkrak qafasi', correct: true },
            { label: 'sut bezlari' },
            { label: 'teri orqali nafas' }
          ]
        }
      }
    },
    {
      id: 'b38q5',
      prompt: 'Ilk quruqlik umurtqalilari qaysilar?',
      hint: 'Qadimgi amfibiyalar.',
      explanation: 'Stegosefallar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['lansetniklar', 'stegosefallar', 'dinozavrlar', 'akulalar'], answerIndex: 1 } }
    },
    {
      id: 'b38q6',
      prompt: 'Belgini sinfga ajrating.',
      hint: 'Qushlar uchishga moslashgan.',
      explanation: 'Qushlar: pat, toj suyagi, havo xaltachalari. Sutemizuvchilar: jun, sut bezlari, bachadon.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'q', label: 'Qushlar' },
            { id: 's', label: 'Sutemizuvchilar' }
          ],
          items: [
            { emoji: '', label: 'pat qoplami', bin: 'q' },
            { emoji: '', label: 'toj suyagi', bin: 'q' },
            { emoji: '', label: 'havo xaltachalari', bin: 'q' },
            { emoji: '', label: 'jun', bin: 's' },
            { emoji: '', label: 'sut bezlari', bin: 's' },
            { emoji: '', label: 'bachadon', bin: 's' }
          ]
        }
      }
    },
    {
      id: 'b38q7',
      prompt: 'Koʻp hujayralilar migratsiya yoʻli bilan paydo boʻlgan degan gipotezani kim ilgari surgan?',
      hint: 'Rus olimi.',
      explanation: 'I. I. Mechnikov.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['V. I. Vernadskiy', 'I. I. Mechnikov', 'Ch. Darvin', 'E. Zyuss'], answerIndex: 1 } }
    },
    {
      id: 'b38q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Sutemizuvchilar sudralib yuruvchilardan.',
      explanation: 'Sutemizuvchilar mezozoy sudralib yuruvchilaridan kelib chiqqan; bulut va boʻshliqichlilarda toʻqima va organlar rivojlanmagan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Sutemizuvchilar sudralib yuruvchilardan kelib chiqqan.', value: true },
            { text: 'Bulutlar va boʻshliqichlilarda toʻqima va organlar rivojlanmagan.', value: true },
            { text: 'Qushlarda arterial va venoz qon aralashadi.', value: false },
            { text: 'Lansetniklar faol yirtqich xordalilardan kelib chiqqan.', value: false }
          ]
        }
      }
    }
  ]
};
