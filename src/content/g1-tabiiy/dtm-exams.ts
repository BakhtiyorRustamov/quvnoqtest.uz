import type { L10n } from '@/lib/i18n-config';
import type { ExamConfig, ExamQuestion } from '@/content/g1-math/exam';

/**
 * "Milliy sertifikatga tayyorlanish" — THREE grade-1 natural-science practice
 * exams (Fizika, Kimyo, Biologiya) in the style of the DTM / Milliy sertifikat
 * subject tests. The real tests target older students; these banks use ONLY
 * material from the grade-1 Tabiiy fanlar lessons (topics 1–21):
 *
 *   FIZIKA    — weather & water in nature, seasons, time & week days,
 *               transport, the traffic light, home appliances & electricity.
 *   KIMYO     — materials (wood/metal/glass/paper/plastic/clay), what things
 *               are made from, water's states, solids & liquids,
 *               natural vs man-made things.
 *   BIOLOGIYA — the five senses, plants and their parts, domestic & wild
 *               animals, birds/insects/fish, animals in winter, the harvest.
 *
 * Like the Ona tili DTM bank, digits can't be randomized — instead every build
 * draws a random 30-question SUBSET of each generator bank, shuffles question
 * order and reshuffles each question's options, so a retake gives a different
 * test. Each question carries `reviewTopics` (Tabiiy topic numbers) so the
 * results screen recommends which grade-1 lessons to revise.
 */

export const TABIIY_EXAM_MINUTES = 45;
export const TABIIY_EXAM_COUNT = 30;

export const FIZIKA_EXAM_KEY = 'g1-tabiiy-fizika';
export const KIMYO_EXAM_KEY = 'g1-tabiiy-kimyo';
export const BIO_EXAM_KEY = 'g1-tabiiy-bio';

export const FIZIKA_TITLE: L10n = {
  uz: 'Milliy sertifikatga tayyorlanish: Fizika',
  ru: 'Подготовка к национальному сертификату: Физика',
  en: 'National certificate preparation: Physics'
};
export const KIMYO_TITLE: L10n = {
  uz: 'Milliy sertifikatga tayyorlanish: Kimyo',
  ru: 'Подготовка к национальному сертификату: Химия',
  en: 'National certificate preparation: Chemistry'
};
export const BIO_TITLE: L10n = {
  uz: 'Milliy sertifikatga tayyorlanish: Biologiya',
  ru: 'Подготовка к национальному сертификату: Биология',
  en: 'National certificate preparation: Biology'
};

const introFor = (subjUz: string, subjRu: string, subjEn: string): L10n => ({
  uz: `Milliy sertifikat imtihonlari odatda katta sinflar uchun boʻladi. Bu — haqiqiy imtihon EMAS, balki 1-sinf Tabiiy fanlar darslarida oʻrganilgan, ${subjUz}ga oid mavzular asosidagi tayyorgarlik testi. 30 ta savol, 45 daqiqa. Savollar har safar oʻzgaradi — qayta ishlaganda boshqa test chiqadi. Test soʻngida qaysi darslarni takrorlash kerakligi tavsiya qilinadi.`,
  ru: `Экзамены на национальный сертификат обычно для старших классов. Это НЕ настоящий экзамен, а тренировочный тест по темам ${subjRu}, изученным на уроках «Естественные науки» в 1 классе. 30 вопросов, 45 минут. Вопросы меняются каждый раз — при повторе будет другой тест. В конце будет рекомендовано, какие уроки повторить.`,
  en: `National certificate exams are usually for older students. This is NOT the real exam — it is a practice test built from the ${subjEn} topics covered in the grade-1 Natural science lessons. 30 questions, 45 minutes. The questions change every time — a retake gives a different test. At the end it recommends which lessons to review.`
});

export const FIZIKA_INTRO = introFor('fizika', 'физики', 'physics');
export const KIMYO_INTRO = introFor('kimyo', 'химии', 'chemistry');
export const BIO_INTRO = introFor('biologiya', 'биологии', 'biology');

/* ----------------------------- helpers ----------------------------- */
const L = (uz: string, ru: string, en: string): L10n => ({ uz, ru, en });

function shuffle<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

/** 4 shuffled options from a correct L10n choice + 3 wrong ones. */
function wordOptions(correct: L10n, wrong: L10n[]): { choices: L10n[]; answerIndex: number } {
  const opts = shuffle([{ v: correct, ok: true }, ...wrong.slice(0, 3).map((v) => ({ v, ok: false }))]);
  return { choices: opts.map((o) => o.v), answerIndex: opts.findIndex((o) => o.ok) };
}

type Gen = () => ExamQuestion;

/** Simple static question: prompt + correct + 3 wrong options (reshuffled per build). */
const Q = (id: string, prompt: L10n, correct: L10n, wrong: L10n[], reviewTopics: number[]): Gen =>
  () => ({ id, prompt, ...wordOptions(correct, wrong), reviewTopics });

/* ================================ FIZIKA ================================ */
const FIZIKA_GENERATORS: Gen[] = [
  // --- water & weather in nature (topics 12–14) ---
  Q('rain', L('Bulutdan yerga nima yogʻadi?', 'Что падает на землю из тучи?', 'What falls to the ground from a cloud?'),
    L('yomgʻir yoki qor', 'дождь или снег', 'rain or snow'),
    [L('un', 'мука', 'flour'), L('mayda toshlar', 'камешки', 'little stones'), L('paxta', 'вата', 'cotton')], [13]),
  Q('fog', L('Tuman nima?', 'Что такое туман?', 'What is fog?'),
    L('havodagi mayda suv tomchilari', 'мелкие капельки воды в воздухе', 'tiny drops of water in the air'),
    [L('mayda qum', 'мелкий песок', 'fine sand'), L('tutun', 'дым', 'smoke'), L('uchayotgan barglar', 'летящие листья', 'flying leaves')], [13]),
  Q('river-winter', L('Qishda daryo va koʻllar bilan nima boʻladi?', 'Что происходит зимой с реками и озёрами?', 'What happens to rivers and lakes in winter?'),
    L('muz bilan qoplanadi', 'покрываются льдом', 'they get covered with ice'),
    [L('qurib qoladi', 'высыхают', 'they dry up'), L('isib ketadi', 'нагреваются', 'they get warm'), L('kattalashadi', 'увеличиваются', 'they grow bigger')], [12]),
  Q('snow-spring', L('Bahorda qor nima boʻladi?', 'Что происходит со снегом весной?', 'What happens to snow in spring?'),
    L('erib, suvga aylanadi', 'тает и превращается в воду', 'it melts into water'),
    [L('qotib qoladi', 'застывает', 'it freezes harder'), L('koʻpayadi', 'его становится больше', 'there is more of it'), L('qumga aylanadi', 'превращается в песок', 'it turns into sand')], [12, 14]),
  Q('winter-days', L('Qishda kunlar qanday boʻladi?', 'Какими зимой становятся дни?', 'What are the days like in winter?'),
    L('qisqa', 'короткие', 'short'),
    [L('uzun', 'длинные', 'long'), L('issiq', 'жаркие', 'hot'), L('yorugʻ', 'светлые', 'bright')], [12]),
  // --- seasons (topics 8, 10) ---
  Q('coldest', L('Qaysi fasl eng sovuq?', 'Какое время года самое холодное?', 'Which season is the coldest?'),
    L('qish', 'зима', 'winter'),
    [L('yoz', 'лето', 'summer'), L('bahor', 'весна', 'spring'), L('kuz', 'осень', 'autumn')], [10]),
  Q('hottest', L('Qaysi fasl eng issiq?', 'Какое время года самое жаркое?', 'Which season is the hottest?'),
    L('yoz', 'лето', 'summer'),
    [L('qish', 'зима', 'winter'), L('bahor', 'весна', 'spring'), L('kuz', 'осень', 'autumn')], [10]),
  Q('blossom', L('Qaysi faslda daraxtlar gullaydi?', 'В какое время года цветут деревья?', 'In which season do trees blossom?'),
    L('bahorda', 'весной', 'in spring'),
    [L('qishda', 'зимой', 'in winter'), L('kuzda', 'осенью', 'in autumn'), L('hech qachon', 'никогда', 'never')], [10]),
  Q('leaves-fall', L('Kuzda daraxtlardan nima toʻkiladi?', 'Что осенью опадает с деревьев?', 'What falls from the trees in autumn?'),
    L('barglar', 'листья', 'leaves'),
    [L('ildizlar', 'корни', 'roots'), L('toshlar', 'камни', 'stones'), L('uyalar', 'гнёзда', 'nests')], [8]),
  Q('four-seasons', L('Bir yilda nechta fasl bor?', 'Сколько времён года в одном году?', 'How many seasons are there in a year?'),
    L('toʻrtta', 'четыре', 'four'),
    [L('ikkita', 'два', 'two'), L('beshta', 'пять', 'five'), L('oltita', 'шесть', 'six')], [10]),
  // --- time & week days (topic 9) ---
  Q('week-days', L('Bir haftada nechta kun bor?', 'Сколько дней в одной неделе?', 'How many days are there in a week?'),
    L('yettita', 'семь', 'seven'),
    [L('beshta', 'пять', 'five'), L('oltita', 'шесть', 'six'), L('oʻnta', 'десять', 'ten')], [9]),
  // dynamic: which day comes after X?
  () => {
    const DAYS: L10n[] = [
      L('dushanba', 'понедельник', 'Monday'), L('seshanba', 'вторник', 'Tuesday'),
      L('chorshanba', 'среда', 'Wednesday'), L('payshanba', 'четверг', 'Thursday'),
      L('juma', 'пятница', 'Friday'), L('shanba', 'суббота', 'Saturday'), L('yakshanba', 'воскресенье', 'Sunday')
    ];
    const i = Math.floor(Math.random() * 5); // Mon..Fri → next day exists
    const wrong = shuffle(DAYS.filter((_, j) => j !== i && j !== i + 1)).slice(0, 3);
    return {
      id: 'day-after',
      prompt: {
        uz: `${DAYS[i].uz.charAt(0).toUpperCase() + DAYS[i].uz.slice(1)}dan keyin qaysi kun keladi?`,
        ru: `Какой день идёт после — ${DAYS[i].ru}?`,
        en: `Which day comes after ${DAYS[i].en}?`
      },
      ...wordOptions(DAYS[i + 1], wrong),
      reviewTopics: [9]
    };
  },
  Q('weekend', L('Dam olish kunlari qaysilar?', 'Какие дни — выходные?', 'Which days are the rest days?'),
    L('shanba va yakshanba', 'суббота и воскресенье', 'Saturday and Sunday'),
    [L('dushanba va seshanba', 'понедельник и вторник', 'Monday and Tuesday'), L('chorshanba va juma', 'среда и пятница', 'Wednesday and Friday'), L('faqat juma', 'только пятница', 'only Friday')], [9]),
  Q('past', L('Boʻlib oʻtgan voqea qanday ataladi?', 'Как называется событие, которое уже произошло?', 'What do we call an event that has already happened?'),
    L('oʻtmish', 'прошлое', 'the past'),
    [L('kelajak', 'будущее', 'the future'), L('hozirgi', 'настоящее', 'the present'), L('ertaga', 'завтра', 'tomorrow')], [9]),
  Q('future', L('Ertaga boʻladigan voqea qanday ataladi?', 'Как называется событие, которое будет завтра?', 'What do we call an event that will happen tomorrow?'),
    L('kelajak', 'будущее', 'the future'),
    [L('oʻtmish', 'прошлое', 'the past'), L('kecha', 'вчера', 'yesterday'), L('hozir', 'сейчас', 'now')], [9]),
  // --- transport (topic 20) ---
  Q('air-transport', L('Qaysi transport havoda uchadi?', 'Какой транспорт летает по воздуху?', 'Which transport flies in the air?'),
    L('samolyot', 'самолёт', 'a plane'),
    [L('avtobus', 'автобус', 'a bus'), L('kema', 'корабль', 'a ship'), L('velosiped', 'велосипед', 'a bicycle')], [20]),
  Q('water-transport', L('Qaysi transport suvda suzadi?', 'Какой транспорт плавает по воде?', 'Which transport sails on water?'),
    L('kema', 'корабль', 'a ship'),
    [L('poyezd', 'поезд', 'a train'), L('samolyot', 'самолёт', 'a plane'), L('avtobus', 'автобус', 'a bus')], [20]),
  Q('rail-transport', L('Qaysi transport relsda yuradi?', 'Какой транспорт ездит по рельсам?', 'Which transport runs on rails?'),
    L('poyezd', 'поезд', 'a train'),
    [L('avtobus', 'автобус', 'a bus'), L('kema', 'корабль', 'a ship'), L('velosiped', 'велосипед', 'a bicycle')], [20]),
  Q('fastest', L('Eng tez harakatlanadigan transport qaysi?', 'Какой транспорт самый быстрый?', 'Which transport is the fastest?'),
    L('samolyot', 'самолёт', 'a plane'),
    [L('velosiped', 'велосипед', 'a bicycle'), L('avtobus', 'автобус', 'a bus'), L('aravacha', 'тележка', 'a cart')], [20]),
  Q('short-trip', L('Qisqa masofaga borish uchun qaysi transport qulay?', 'Какой транспорт удобен для короткой поездки?', 'Which transport is best for a short trip?'),
    L('velosiped', 'велосипед', 'a bicycle'),
    [L('samolyot', 'самолёт', 'a plane'), L('kema', 'корабль', 'a ship'), L('poyezd', 'поезд', 'a train')], [20]),
  Q('ground-transport', L('Qaysi biri yer usti transporti?', 'Что из этого — наземный транспорт?', 'Which of these is ground transport?'),
    L('avtobus', 'автобус', 'a bus'),
    [L('samolyot', 'самолёт', 'a plane'), L('kema', 'корабль', 'a ship'), L('qayiq', 'лодка', 'a boat')], [20]),
  // --- traffic light & road safety (topic 21) ---
  Q('red-light', L('Svetoforning qizil rangi nimani bildiradi?', 'Что означает красный сигнал светофора?', 'What does the red traffic light mean?'),
    L('toʻxta!', 'стой!', 'stop!'),
    [L('yur!', 'иди!', 'go!'), L('yugur!', 'беги!', 'run!'), L('sakra!', 'прыгай!', 'jump!')], [21]),
  Q('green-light', L('Svetoforning qaysi rangi «yur» degani?', 'Какой сигнал светофора означает «иди»?', 'Which traffic-light color means “go”?'),
    L('yashil', 'зелёный', 'green'),
    [L('qizil', 'красный', 'red'), L('sariq', 'жёлтый', 'yellow'), L('koʻk', 'синий', 'blue')], [21]),
  Q('yellow-light', L('Svetoforning sariq rangi nimani bildiradi?', 'Что означает жёлтый сигнал светофора?', 'What does the yellow traffic light mean?'),
    L('kutib tur, tayyorlan', 'жди и приготовься', 'wait and get ready'),
    [L('bilmayman', 'не знаю', "I don't know"), L('orqaga qayt', 'иди назад', 'go back'), L('yoʻl belgisi', 'дорожный знак', 'a road sign')], [21]),
  Q('crossing', L('Yoʻlni qayerdan kesib oʻtish kerak?', 'Где нужно переходить дорогу?', 'Where should you cross the road?'),
    L('piyodalar oʻtish joyidan', 'по пешеходному переходу', 'at the pedestrian crossing'),
    [L('bilmayman', 'не знаю', "I don't know"), L('notoʻgʻri joydan', 'в неположенном месте', 'at the wrong place'), L('avtobus bekatidan', 'с автобусной остановки', 'from the bus stop')], [21]),
  // --- home appliances & electricity (topics 18–19) ---
  Q('vacuum', L('Uyni tozalash uchun qaysi jihoz yordam beradi?', 'Какой прибор помогает убирать дом?', 'Which appliance helps clean the house?'),
    L('changyutgich', 'пылесос', 'a vacuum cleaner'),
    [L('televizor', 'телевизор', 'a TV'), L('muzlatgich', 'холодильник', 'a fridge'), L('dazmol', 'утюг', 'an iron')], [18]),
  Q('washer', L('Kiyimlarni qaysi jihoz yuvadi?', 'Какой прибор стирает одежду?', 'Which appliance washes clothes?'),
    L('kir yuvish mashinasi', 'стиральная машина', 'a washing machine'),
    [L('changyutgich', 'пылесос', 'a vacuum cleaner'), L('muzlatgich', 'холодильник', 'a fridge'), L('televizor', 'телевизор', 'a TV')], [18]),
  Q('fridge', L('Qaysi jihoz ovqatni sovuq saqlaydi?', 'Какой прибор хранит еду в холоде?', 'Which appliance keeps food cold?'),
    L('muzlatgich', 'холодильник', 'a fridge'),
    [L('dazmol', 'утюг', 'an iron'), L('changyutgich', 'пылесос', 'a vacuum cleaner'), L('chaynak', 'чайник', 'a kettle')], [18]),
  Q('iron', L('Qaysi jihoz kiyimlarni tekislaydi (dazmollaydi)?', 'Какой прибор разглаживает (гладит) одежду?', 'Which appliance smooths (irons) clothes?'),
    L('dazmol', 'утюг', 'an iron'),
    [L('muzlatgich', 'холодильник', 'a fridge'), L('televizor', 'телевизор', 'a TV'), L('changyutgich', 'пылесос', 'a vacuum cleaner')], [18]),
  Q('electricity', L('Koʻp uy jihozlari nima bilan ishlaydi?', 'От чего работает большинство домашних приборов?', 'What do most home appliances run on?'),
    L('elektr toki bilan', 'от электричества', 'on electricity'),
    [L('suv bilan', 'от воды', 'on water'), L('qum bilan', 'от песка', 'on sand'), L('shamol bilan', 'от ветра', 'on wind')], [18, 19]),
  Q('socket', L('Rozetkaga barmoq yoki mix tiqish — bu…', 'Совать палец или гвоздь в розетку — это…', 'Putting a finger or a nail into a socket is…'),
    L('juda xavfli', 'очень опасно', 'very dangerous'),
    [L('bilmayman', 'не знаю', "I don't know"), L('foydali', 'полезно', 'useful'), L('oddiy ish', 'обычное дело', 'an ordinary thing')], [19]),
  Q('kitchen', L('Ovqat qaysi xonada pishiriladi?', 'В какой комнате готовят еду?', 'In which room is food cooked?'),
    L('oshxonada', 'на кухне', 'in the kitchen'),
    [L('yotoqxonada', 'в спальне', 'in the bedroom'), L('vannaxonada', 'в ванной', 'in the bathroom'), L('mehmonxonada', 'в гостиной', 'in the living room')], [18]),
  Q('tv', L('Televizordan nima olamiz?', 'Что мы получаем от телевизора?', 'What do we get from the TV?'),
    L('maʼlumot va yangiliklar', 'информацию и новости', 'information and news'),
    [L('issiq ovqat', 'горячую еду', 'hot food'), L('toza kiyim', 'чистую одежду', 'clean clothes'), L('muzqaymoq', 'мороженое', 'ice cream')], [18])
];

/* ================================ KIMYO ================================ */
const MAT = {
  wood: L('yogʻochdan', 'из дерева', 'of wood'),
  metal: L('metalldan', 'из металла', 'of metal'),
  glass: L('shishadan', 'из стекла', 'of glass'),
  paper: L('qogʻozdan', 'из бумаги', 'of paper'),
  plastic: L('plastmassadan', 'из пластмассы', 'of plastic'),
  clay: L('loydan', 'из глины', 'of clay')
};

/** "What is X made of?" — one generator per item. */
const matQ = (id: string, itemUz: string, itemRu: string, itemEn: string, correct: L10n, wrong: L10n[], topics: number[]): Gen =>
  Q(`mat-${id}`,
    L(`${itemUz} odatda nimadan yasalgan?`, `Из чего обычно сделан(а) ${itemRu}?`, `What is ${itemEn} usually made of?`),
    correct, wrong, topics);

const KIMYO_GENERATORS: Gen[] = [
  // --- what are things made of? (topics 3, 15, 16) ---
  matQ('stol', 'Stol', 'стол', 'a table', MAT.wood, [MAT.glass, MAT.paper, MAT.plastic], [3]),
  matQ('qoshiq', 'Qoshiq', 'ложка', 'a spoon', MAT.metal, [MAT.paper, MAT.glass, MAT.clay], [3, 16]),
  matQ('stakan', 'Stakan', 'стакан', 'a drinking glass', MAT.glass, [MAT.wood, MAT.paper, MAT.metal], [3, 16]),
  matQ('daftar', 'Daftar', 'тетрадь', 'a notebook', MAT.paper, [MAT.metal, MAT.glass, MAT.clay], [3, 15]),
  matQ('butilka', 'Plastik butilka', 'пластиковая бутылка', 'a plastic bottle', MAT.plastic, [MAT.wood, MAT.metal, MAT.clay], [3]),
  matQ('qozon', 'Qozon', 'казан', 'a cooking pot', MAT.metal, [MAT.paper, MAT.glass, MAT.wood], [16]),
  matQ('oyna', 'Deraza oynasi', 'оконное стекло', 'a window pane', MAT.glass, [MAT.wood, MAT.metal, MAT.paper], [3]),
  matQ('qalam', 'Qalam', 'карандаш', 'a pencil', MAT.wood, [MAT.glass, MAT.metal, MAT.clay], [3]),
  matQ('kitob', 'Kitob', 'книга', 'a book', MAT.paper, [MAT.metal, MAT.glass, MAT.plastic], [3, 15]),
  matQ('mashinacha', 'Oʻyinchoq mashinacha', 'игрушечная машинка', 'a toy car', MAT.plastic, [MAT.clay, MAT.glass, MAT.paper], [3]),
  // --- where materials come from (topics 3, 15, 16, 17) ---
  Q('paper-from', L('Qogʻoz asosan nimadan tayyorlanadi?', 'Из чего в основном делают бумагу?', 'What is paper mainly made from?'),
    L('yogʻochdan', 'из древесины', 'from wood'),
    [L('toshdan', 'из камня', 'from stone'), L('shishadan', 'из стекла', 'from glass'), L('temirdan', 'из железа', 'from iron')], [15]),
  Q('first-dishes', L('Qadimda birinchi idishlar nimadan yasalgan?', 'Из чего в древности делали первую посуду?', 'What were the first dishes made of long ago?'),
    L('loydan', 'из глины', 'of clay'),
    [L('plastmassadan', 'из пластмассы', 'of plastic'), L('shishadan', 'из стекла', 'of glass'), L('qogʻozdan', 'из бумаги', 'of paper')], [16]),
  Q('wood-from', L('Yogʻoch qayerdan olinadi?', 'Откуда получают древесину?', 'Where does wood come from?'),
    L('daraxtdan', 'из дерева', 'from trees'),
    [L('toshdan', 'из камня', 'from stone'), L('suvdan', 'из воды', 'from water'), L('qumdan', 'из песка', 'from sand')], [3, 15]),
  Q('recycle', L('Ishlatilgan qogʻozni qayta ishlab nima olamiz?', 'Что получают, перерабатывая использованную бумагу?', 'What do we get by recycling used paper?'),
    L('yangi qogʻoz', 'новую бумагу', 'new paper'),
    [L('shisha', 'стекло', 'glass'), L('temir', 'железо', 'iron'), L('non', 'хлеб', 'bread')], [15]),
  Q('bread-from', L('Non nimadan yopiladi?', 'Из чего пекут хлеб?', 'What is bread baked from?'),
    L('undan', 'из муки', 'from flour'),
    [L('qumdan', 'из песка', 'from sand'), L('loydan', 'из глины', 'from clay'), L('qogʻozdan', 'из бумаги', 'from paper')], [17]),
  // --- water's states (topic 13) ---
  Q('freeze', L('Suv sovuganda nimaga aylanadi?', 'Во что превращается вода при замерзании?', 'What does water turn into when it freezes?'),
    L('muzga', 'в лёд', 'into ice'),
    [L('bugʻga', 'в пар', 'into steam'), L('toshga', 'в камень', 'into stone'), L('qumga', 'в песок', 'into sand')], [13]),
  Q('boil', L('Suv qattiq qizdirilsa nimaga aylanadi?', 'Во что превращается вода при сильном нагревании?', 'What does water turn into when heated strongly?'),
    L('bugʻga', 'в пар', 'into steam'),
    [L('muzga', 'в лёд', 'into ice'), L('sutga', 'в молоко', 'into milk'), L('toshga', 'в камень', 'into stone')], [13]),
  Q('melt', L('Muz erisa nimaga aylanadi?', 'Во что превращается лёд, когда тает?', 'What does ice turn into when it melts?'),
    L('suvga', 'в воду', 'into water'),
    [L('bugʻga', 'в пар', 'into steam'), L('qorga', 'в снег', 'into snow'), L('toshga', 'в камень', 'into stone')], [13]),
  Q('solid-state', L('Suvning QATTIQ holati qaysi?', 'Какое ТВЁРДОЕ состояние воды?', 'What is the SOLID state of water?'),
    L('muz', 'лёд', 'ice'),
    [L('bugʻ', 'пар', 'steam'), L('yomgʻir', 'дождь', 'rain'), L('tuman', 'туман', 'fog')], [13]),
  Q('states', L('Suv qaysi holatlarga aylana oladi?', 'В какие состояния может превращаться вода?', 'What can water turn into?'),
    L('muz va bugʻga', 'в лёд и пар', 'into ice and steam'),
    [L('tosh va qumga', 'в камень и песок', 'into stone and sand'), L('un va nonga', 'в муку и хлеб', 'into flour and bread'), L('shisha va temirga', 'в стекло и железо', 'into glass and iron')], [13]),
  // --- solid or liquid? (topics 3, 13) ---
  Q('pick-solid', L('Qaysi biri qattiq jism?', 'Что из этого — твёрдое?', 'Which of these is solid?'),
    L('tosh', 'камень', 'a stone'),
    [L('suv', 'вода', 'water'), L('sut', 'молоко', 'milk'), L('sharbat', 'сок', 'juice')], [3, 13]),
  Q('pick-liquid', L('Qaysi biri suyuqlik?', 'Что из этого — жидкость?', 'Which of these is a liquid?'),
    L('sut', 'молоко', 'milk'),
    [L('tosh', 'камень', 'a stone'), L('yogʻoch', 'дерево', 'wood'), L('temir', 'железо', 'iron')], [13]),
  Q('pick-liquid2', L('Qaysi biri suyuqlik?', 'Что из этого — жидкость?', 'Which of these is a liquid?'),
    L('suv', 'вода', 'water'),
    [L('muz', 'лёд', 'ice'), L('gʻisht', 'кирпич', 'a brick'), L('qalam', 'карандаш', 'a pencil')], [13]),
  // --- natural vs man-made (topic 2) ---
  Q('natural1', L('Qaysi biri tabiiy narsa?', 'Что из этого создала природа?', 'Which of these is a natural thing?'),
    L('tosh', 'камень', 'a stone'),
    [L('stol', 'стол', 'a table'), L('mashina', 'машина', 'a car'), L('telefon', 'телефон', 'a phone')], [2]),
  Q('natural2', L('Qaysi biri tabiiy narsa?', 'Что из этого создала природа?', 'Which of these is a natural thing?'),
    L('daraxt', 'дерево', 'a tree'),
    [L('velosiped', 'велосипед', 'a bicycle'), L('daftar', 'тетрадь', 'a notebook'), L('uy', 'дом', 'a house')], [2]),
  Q('manmade1', L('Qaysi birini inson yaratgan?', 'Что из этого создал человек?', 'Which of these did people make?'),
    L('mashina', 'машина', 'a car'),
    [L('daraxt', 'дерево', 'a tree'), L('tosh', 'камень', 'a stone'), L('bulut', 'облако', 'a cloud')], [2]),
  Q('manmade2', L('Qaysi birini inson yaratgan?', 'Что из этого создал человек?', 'Which of these did people make?'),
    L('stol', 'стол', 'a table'),
    [L('quyosh', 'солнце', 'the sun'), L('daryo', 'река', 'a river'), L('togʻ', 'гора', 'a mountain')], [2]),
  // --- misc, grounded in lessons 2, 15, 16, 19 ---
  Q('pharmacy', L('Kasal boʻlsak, dorini qayerdan olamiz?', 'Где мы берём лекарство, когда болеем?', 'Where do we get medicine when we are ill?'),
    L('dorixonadan', 'в аптеке', 'from the pharmacy'),
    [L('doʻkondan… oʻyinchoq boʻlimidan', 'в магазине игрушек', 'from the toy shop'), L('oshxonadan', 'на кухне', 'from the kitchen'), L('bogʻdan', 'в саду', 'from the garden')], [2]),
  Q('old-writing', L('Qadimda odamlar nimaga yozgan?', 'На чём писали люди в древности?', 'What did people write on long ago?'),
    L('toshga', 'на камне', 'on stone'),
    [L('telefonga', 'на телефоне', 'on phones'), L('plastmassaga', 'на пластмассе', 'on plastic'), L('shishaga', 'на стекле', 'on glass')], [15]),
  Q('teapot', L('Choy damlash uchun qaysi idish kerak?', 'Какая посуда нужна, чтобы заварить чай?', 'Which dish do you need to brew tea?'),
    L('choynak', 'чайник', 'a teapot'),
    [L('likopcha', 'тарелка', 'a plate'), L('qozon', 'казан', 'a cooking pot'), L('qoshiq', 'ложка', 'a spoon')], [16]),
  Q('fragile', L('Qaysi idish sinishi mumkin — ehtiyot boʻlish kerak?', 'Какая посуда может разбиться — нужно быть осторожным?', 'Which dish can break — you must be careful?'),
    L('shisha stakan', 'стеклянный стакан', 'a glass cup'),
    [L('metall qoshiq', 'металлическая ложка', 'a metal spoon'), L('yogʻoch qoshiq', 'деревянная ложка', 'a wooden spoon'), L('plastmassa piyola', 'пластмассовая пиала', 'a plastic bowl')], [16, 19])
];

/* ============================== BIOLOGIYA ============================== */
const BIO_GENERATORS: Gen[] = [
  // --- the five senses (topic 1) ---
  Q('hear', L('Biz nima bilan eshitamiz?', 'Чем мы слышим?', 'What do we hear with?'),
    L('quloq bilan', 'ушами', 'with our ears'),
    [L('koʻz bilan', 'глазами', 'with our eyes'), L('burun bilan', 'носом', 'with our nose'), L('qoʻl bilan', 'руками', 'with our hands')], [1]),
  Q('see', L('Rangin kamalakni nima bilan koʻramiz?', 'Чем мы видим радугу?', 'What do we see a rainbow with?'),
    L('koʻz bilan', 'глазами', 'with our eyes'),
    [L('quloq bilan', 'ушами', 'with our ears'), L('til bilan', 'языком', 'with our tongue'), L('oyoq bilan', 'ногами', 'with our feet')], [1]),
  Q('smell', L('Gulning hidini nima bilan bilamiz?', 'Чем мы чувствуем запах цветка?', 'What do we smell a flower with?'),
    L('burun bilan', 'носом', 'with our nose'),
    [L('koʻz bilan', 'глазами', 'with our eyes'), L('quloq bilan', 'ушами', 'with our ears'), L('tish bilan', 'зубами', 'with our teeth')], [1]),
  Q('taste', L('Muzqaymoqning taʼmini nima bilan bilamiz?', 'Чем мы чувствуем вкус мороженого?', 'What do we taste ice cream with?'),
    L('til bilan', 'языком', 'with our tongue'),
    [L('burun bilan', 'носом', 'with our nose'), L('soch bilan', 'волосами', 'with our hair'), L('quloq bilan', 'ушами', 'with our ears')], [1]),
  Q('touch', L('Suv issiq yoki sovuqligini nima bilan sezamiz?', 'Чем мы чувствуем, горячая вода или холодная?', 'What do we feel hot or cold water with?'),
    L('teri bilan', 'кожей', 'with our skin'),
    [L('koʻz bilan', 'глазами', 'with our eyes'), L('quloq bilan', 'ушами', 'with our ears'), L('til bilan', 'языком', 'with our tongue')], [1]),
  Q('five-senses', L('Insonda nechta sezgi aʼzosi bor?', 'Сколько органов чувств у человека?', 'How many sense organs does a person have?'),
    L('beshta', 'пять', 'five'),
    [L('ikkita', 'два', 'two'), L('uchta', 'три', 'three'), L('oʻnta', 'десять', 'ten')], [1]),
  // --- plants (topic 4) ---
  Q('stem', L('Oʻsimlikni tik ushlab, suvni yuqoriga olib chiqadigan qism qaysi?', 'Какая часть держит растение и поднимает воду вверх?', 'Which part holds the plant up and carries water upward?'),
    L('poya', 'стебель', 'the stem'),
    [L('gul', 'цветок', 'the flower'), L('barg', 'лист', 'the leaf'), L('meva', 'плод', 'the fruit')], [4]),
  Q('root', L('Oʻsimlikning qaysi qismi tuproqdan suv oladi?', 'Какая часть растения берёт воду из почвы?', 'Which part of a plant takes water from the soil?'),
    L('ildiz', 'корень', 'the root'),
    [L('gul', 'цветок', 'the flower'), L('barg', 'лист', 'the leaf'), L('poya', 'стебель', 'the stem')], [4]),
  Q('carrot', L('Sabzining qaysi qismini yeymiz?', 'Какую часть моркови мы едим?', 'Which part of a carrot do we eat?'),
    L('ildizini', 'корень', 'the root'),
    [L('bargini', 'листья', 'the leaves'), L('gulini', 'цветок', 'the flower'), L('poyasini', 'стебель', 'the stem')], [4]),
  Q('wild-plant', L('Qaysi biri yovvoyi oʻsimlik (uni odam ekmaydi)?', 'Какое растение дикое (его не сажает человек)?', 'Which plant is wild (people do not plant it)?'),
    L('qoqioʻt', 'одуванчик', 'a dandelion'),
    [L('pomidor', 'помидор', 'a tomato'), L('bugʻdoy', 'пшеница', 'wheat'), L('sabzi', 'морковь', 'a carrot')], [4]),
  Q('crop-plant', L('Qaysi biri madaniy oʻsimlik (uni odam ekadi)?', 'Какое растение культурное (его сажает человек)?', 'Which plant is a crop (people plant it)?'),
    L('pomidor', 'помидор', 'a tomato'),
    [L('qoqioʻt', 'одуванчик', 'a dandelion'), L('yantoq', 'верблюжья колючка', 'a thornbush'), L('qamish', 'камыш', 'a reed')], [4]),
  Q('plant-needs', L('Oʻsimlik oʻsishi uchun nima kerak?', 'Что нужно растению, чтобы расти?', 'What does a plant need to grow?'),
    L('suv va quyosh', 'вода и солнце', 'water and sunlight'),
    [L('shirinlik', 'сладости', 'sweets'), L('oʻyinchoqlar', 'игрушки', 'toys'), L('televizor', 'телевизор', 'a TV')], [4]),
  // --- animals (topic 5) ---
  Q('domestic', L('Qaysi biri uy hayvoni?', 'Какое из этих животных домашнее?', 'Which of these is a domestic animal?'),
    L('sigir', 'корова', 'a cow'),
    [L('boʻri', 'волк', 'a wolf'), L('tulki', 'лиса', 'a fox'), L('ayiq', 'медведь', 'a bear')], [5]),
  Q('wild-animal', L('Qaysi biri yovvoyi hayvon?', 'Какое из этих животных дикое?', 'Which of these is a wild animal?'),
    L('boʻri', 'волк', 'a wolf'),
    [L('mushuk', 'кошка', 'a cat'), L('it', 'собака', 'a dog'), L('qoʻy', 'овца', 'a sheep')], [5]),
  Q('bird', L('Qaysi biri qush?', 'Кто из них птица?', 'Which of these is a bird?'),
    L('chumchuq', 'воробей', 'a sparrow'),
    [L('baliq', 'рыба', 'a fish'), L('mushuk', 'кошка', 'a cat'), L('quyon', 'заяц', 'a rabbit')], [5]),
  Q('insect', L('Qaysi biri hasharot?', 'Кто из них насекомое?', 'Which of these is an insect?'),
    L('kapalak', 'бабочка', 'a butterfly'),
    [L('chumchuq', 'воробей', 'a sparrow'), L('baliq', 'рыба', 'a fish'), L('quyon', 'заяц', 'a rabbit')], [5]),
  Q('fish', L('Baliq qayerda yashaydi?', 'Где живёт рыба?', 'Where does a fish live?'),
    L('suvda', 'в воде', 'in water'),
    [L('daraxtda', 'на дереве', 'in a tree'), L('uyada', 'в гнезде', 'in a nest'), L('gʻorda', 'в пещере', 'in a cave')], [5]),
  Q('bird-home', L('Qush qayerda yashaydi?', 'Где живёт птица?', 'Where does a bird live?'),
    L('uyada', 'в гнезде', 'in a nest'),
    [L('suv ostida', 'под водой', 'under water'), L('muzlatgichda', 'в холодильнике', 'in a fridge'), L('yer ostida', 'под землёй', 'under the ground')], [5]),
  Q('cow-gives', L('Sigir bizga nima beradi?', 'Что даёт нам корова?', 'What does a cow give us?'),
    L('sut', 'молоко', 'milk'),
    [L('tuxum', 'яйца', 'eggs'), L('asal', 'мёд', 'honey'), L('paxta', 'хлопок', 'cotton')], [5]),
  Q('hen-gives', L('Tovuq bizga nima beradi?', 'Что даёт нам курица?', 'What does a hen give us?'),
    L('tuxum', 'яйца', 'eggs'),
    [L('sut', 'молоко', 'milk'), L('asal', 'мёд', 'honey'), L('jun', 'шерсть', 'wool')], [5]),
  // --- animals in winter (topic 11) ---
  Q('hibernate', L('Qaysi hayvon qishda uzoq uyquga ketadi?', 'Какое животное зимой впадает в долгую спячку?', 'Which animal goes into a long winter sleep?'),
    L('ayiq', 'медведь', 'a bear'),
    [L('sigir', 'корова', 'a cow'), L('chumchuq', 'воробей', 'a sparrow'), L('it', 'собака', 'a dog')], [11]),
  Q('migrate', L('Qaysi qush qishda issiq oʻlkalarga uchib ketadi?', 'Какая птица зимой улетает в тёплые края?', 'Which bird flies to warm lands for winter?'),
    L('qaldirgʻoch', 'ласточка', 'a swallow'),
    [L('chumchuq', 'воробей', 'a sparrow'), L('kaptar', 'голубь', 'a pigeon'), L('tovuq', 'курица', 'a hen')], [11]),
  Q('white-coat', L('Qaysi hayvon qishda oq tusga kiradi?', 'Какое животное зимой становится белым?', 'Which animal turns white in winter?'),
    L('quyon', 'заяц', 'a hare'),
    [L('sigir', 'корова', 'a cow'), L('mushuk', 'кошка', 'a cat'), L('ayiq', 'медведь', 'a bear')], [11]),
  // --- autumn & the harvest (topic 8) ---
  Q('fruit', L('Qaysi biri meva?', 'Что из этого фрукт?', 'Which of these is a fruit?'),
    L('olma', 'яблоко', 'an apple'),
    [L('sabzi', 'морковь', 'a carrot'), L('kartoshka', 'картошка', 'a potato'), L('piyoz', 'лук', 'an onion')], [8]),
  Q('vegetable', L('Qaysi biri sabzavot?', 'Что из этого овощ?', 'Which of these is a vegetable?'),
    L('sabzi', 'морковь', 'a carrot'),
    [L('olma', 'яблоко', 'an apple'), L('gilos', 'черешня', 'a cherry'), L('oʻrik', 'абрикос', 'an apricot')], [8]),
  Q('harvest-season', L('Hosil qaysi faslda yigʻib olinadi?', 'В какое время года собирают урожай?', 'In which season is the harvest gathered?'),
    L('kuzda', 'осенью', 'in autumn'),
    [L('qishda', 'зимой', 'in winter'), L('bahorda', 'весной', 'in spring'), L('hech qachon', 'никогда', 'never')], [8]),
  Q('autumn-sign', L('Kuzning belgisi qaysi?', 'Какой признак осени?', 'Which is a sign of autumn?'),
    L('barglar sargʻayib toʻkiladi', 'листья желтеют и опадают', 'leaves turn yellow and fall'),
    [L('daraxtlar gullaydi', 'деревья цветут', 'trees blossom'), L('qor koʻp yogʻadi', 'идёт много снега', 'it snows a lot'), L('kunlar juda issiq', 'дни очень жаркие', 'days are very hot')], [8]),
  // --- forest & zoo (topics 6–7) ---
  Q('forest', L('Qaysi hayvon oʻrmonda yashaydi?', 'Какое животное живёт в лесу?', 'Which animal lives in the forest?'),
    L('tulki', 'лиса', 'a fox'),
    [L('sigir', 'корова', 'a cow'), L('tovuq', 'курица', 'a hen'), L('mushuk', 'кошка', 'a cat')], [6]),
  Q('zoo', L('Hayvonot bogʻida nima qilamiz?', 'Что мы делаем в зоопарке?', 'What do we do at the zoo?'),
    L('hayvonlarni tomosha qilamiz', 'смотрим на животных', 'we watch the animals'),
    [L('bilmayman', 'не знаю', "I don't know"), L('hayvonlarni sotib olamiz', 'покупаем животных', 'we buy the animals'), L('shovqin qilamiz', 'шумим', 'we make loud noise')], [7]),
  // --- living & non-living nature (topic 2) ---
  Q('living', L('Qaysi biri jonli tabiat?', 'Что относится к живой природе?', 'Which of these is living nature?'),
    L('qush', 'птица', 'a bird'),
    [L('tosh', 'камень', 'a stone'), L('suv', 'вода', 'water'), L('stol', 'стол', 'a table')], [2]),
  Q('nonliving', L('Qaysi biri jonsiz tabiat?', 'Что относится к неживой природе?', 'Which of these is non-living nature?'),
    L('tosh', 'камень', 'a stone'),
    [L('gul', 'цветок', 'a flower'), L('qush', 'птица', 'a bird'), L('baliq', 'рыба', 'a fish')], [2])
];

/* ------------------------------ builders ------------------------------ */
function buildFrom(bank: Gen[]): ExamQuestion[] {
  return shuffle(bank)
    .slice(0, TABIIY_EXAM_COUNT)
    .map((gen, i) => {
      const q = gen();
      return { ...q, id: `q${i + 1}-${q.id}` };
    });
}

export const buildFizikaExam = (): ExamQuestion[] => buildFrom(FIZIKA_GENERATORS);
export const buildKimyoExam = (): ExamQuestion[] => buildFrom(KIMYO_GENERATORS);
export const buildBioExam = (): ExamQuestion[] => buildFrom(BIO_GENERATORS);

const configFor = (title: L10n, intro: L10n, build: () => ExamQuestion[], topicKey: string): ExamConfig => ({
  title,
  intro,
  minutes: TABIIY_EXAM_MINUTES,
  count: TABIIY_EXAM_COUNT,
  build,
  logoSrc: '/dtm-logo.png',
  topicKey
});

export const FIZIKA_EXAM_CONFIG = configFor(FIZIKA_TITLE, FIZIKA_INTRO, buildFizikaExam, FIZIKA_EXAM_KEY);
export const KIMYO_EXAM_CONFIG = configFor(KIMYO_TITLE, KIMYO_INTRO, buildKimyoExam, KIMYO_EXAM_KEY);
export const BIO_EXAM_CONFIG = configFor(BIO_TITLE, BIO_INTRO, buildBioExam, BIO_EXAM_KEY);
