/** Shared UI strings for the language widgets (grade 11 Russian / English). */
export const LS: Record<string, Record<string, string>> = {
  uz: {
    check: 'Tekshirish',
    again: 'Yana bir urinib koʻring',
    right: 'Toʻgʻri!',
    show: 'Javobni koʻrsatish',
    answer: 'Toʻgʻri javob',
    typeHere: 'Javob',
    tapWords: 'Kerakli soʻzlarning hammasini bosing',
    tapGaps: 'Soʻzlar orasini bosib, belgini qoʻying, soʻng tekshiring',
    missing: 'Hali hammasi topilmadi',
    extra: 'Ortiqcha belgi bor',
    wrongMark: 'Bir belgi notoʻgʻri',
    sortPickCard: 'Kartani bosing, soʻng uning guruhini bosing',
    sortPickBin: 'Endi mos guruhni bosing'
  },
  ru: {
    check: 'Проверить',
    again: 'Попробуйте ещё раз',
    right: 'Верно!',
    show: 'Показать ответ',
    answer: 'Верный ответ',
    typeHere: 'Ответ',
    tapWords: 'Нажмите все нужные слова',
    tapGaps: 'Нажимайте между словами, чтобы поставить знак, затем проверьте',
    missing: 'Найдено ещё не всё',
    extra: 'Есть лишний знак',
    wrongMark: 'Один знак не тот',
    sortPickCard: 'Нажмите карточку, затем её группу',
    sortPickBin: 'Теперь нажмите нужную группу'
  },
  kaa: {
    check: 'Tekseriw',
    again: 'Jáne bir urınıp kóriń',
    right: 'Durıs!',
    show: 'Juwaptı kórsetiw',
    answer: 'Durıs juwap',
    typeHere: 'Juwap',
    tapWords: 'Kerekli sózlerdiń hámmesin basıń',
    tapGaps: 'Sózler arasın basıp, belgini qoyıń, soń tekseriń',
    missing: 'Ele hámmesi tabılmadı',
    extra: 'Artıqsha belgi bar',
    wrongMark: 'Bir belgi nadurıs',
    sortPickCard: 'Kartanı basıń, soń onıń toparın basıń',
    sortPickBin: 'Endi sáykes topardı basıń'
  },
  en: {
    check: 'Check',
    again: 'Try once more',
    right: 'Correct!',
    show: 'Show the answer',
    answer: 'Correct answer',
    typeHere: 'Answer',
    tapWords: 'Tap all the right words',
    tapGaps: 'Tap between the words to place a mark, then check',
    missing: 'Not all found yet',
    extra: 'There is an extra mark',
    wrongMark: 'One mark is wrong',
    sortPickCard: 'Tap a card, then tap its group',
    sortPickBin: 'Now tap the right group'
  }
};
export const ls = (lang: string) => LS[lang] ?? LS.uz;

/** Compare typed answers: case, ё/е, spaces and final punctuation do not matter. */
export const normText = (s: string) =>
  s
    .toLowerCase()
    .replace(/ё/g, 'е')
    // Uzbek / English apostrophes: oʻ, o', o‘, maʼlumot, ma'lumot, can’t …
    .replace(/[ʻʼ'`‘’]/g, "'")
    .replace(/[́]/g, '')
    .replace(/[«»"“”.,!?;:]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
