/** Shared UI strings for the math widgets. */
export const MS: Record<string, Record<string, string>> = {
  uz: {
    check: 'Tekshirish',
    again: 'Yana bir urinib koʻring',
    right: 'Toʻgʻri!',
    show: 'Javobni koʻrsatish',
    answer: 'Toʻgʻri javob',
    unclear: 'Javobni tushunmadim. Masalan: 0,5 yoki 3/4',
    unclearExpr: 'Ifodani tushunmadim. Masalan: x + 3 yoki 2x² − x',
    noFraction: 'Soddalashtiring: javobni kasrsiz yozing',
    typeHere: 'Javob',
    tap: 'Grafikda kerakli joyni bosing',
    pick: 'Mos grafikni tanlang',
    pickMany: 'Mos grafiklarning hammasini tanlang, soʻng tekshiring'
  },
  ru: {
    check: 'Проверить',
    again: 'Попробуйте ещё раз',
    right: 'Верно!',
    show: 'Показать ответ',
    answer: 'Верный ответ',
    unclear: 'Не понял ответ. Например: 0,5 или 3/4',
    unclearExpr: 'Не понял выражение. Например: x + 3 или 2x² − x',
    noFraction: 'Упростите: запишите ответ без дроби',
    typeHere: 'Ответ',
    tap: 'Нажмите нужное место на графике',
    pick: 'Выберите подходящий график',
    pickMany: 'Выберите все подходящие графики и проверьте'
  },
  kaa: {
    check: 'Tekseriw',
    again: 'Jáne bir urınıp kóriń',
    right: 'Durıs!',
    show: 'Juwaptı kórsetiw',
    answer: 'Durıs juwap',
    unclear: 'Juwaptı túsinbedim. Mısalı: 0,5 yamasa 3/4',
    unclearExpr: 'Ańlatpanı túsinbedim. Mısalı: x + 3 yamasa 2x² − x',
    noFraction: 'Ápiwayılastırıń: juwaptı bólsheksiz jazıń',
    typeHere: 'Juwap',
    tap: 'Grafikte kerekli orındı basıń',
    pick: 'Sáykes grafikti tańlań',
    pickMany: 'Sáykes grafiklerdiń hámmesin tańlap, soń tekseriń'
  },
  en: {
    check: 'Check',
    again: 'Try once more',
    right: 'Correct!',
    show: 'Show the answer',
    answer: 'Correct answer',
    unclear: 'I could not read that. For example: 0.5 or 3/4',
    unclearExpr: 'I could not read that. For example: x + 3 or 2x² − x',
    noFraction: 'Simplify: write the answer without a fraction',
    typeHere: 'Answer',
    tap: 'Tap the right place on the graph',
    pick: 'Pick the matching graph',
    pickMany: 'Pick every matching graph, then check'
  }
};
export const ms = (lang: string) => MS[lang] ?? MS.uz;
