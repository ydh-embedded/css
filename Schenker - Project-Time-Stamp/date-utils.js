const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const MILLISECONDS_PER_WEEK = 7 * MILLISECONDS_PER_DAY;

function startOfFirstWeek(year) {
  // Definition: Die erste Kalenderwoche eines Jahres enthält immer den 4. Januar.
  // Eine Kalenderwoche beginnt immer mit einem Montag (das muss nicht der 1. Januar sein!)
  // und endet immer mit einem Sonntag.
  const fourthJanuary = new Date(year, 0, 4)
  const weekDay = fourthJanuary.getDay()
  let daysAfterMonday = weekDay - 1
  // Falls es der Sonntag ist, müssen wir 6 Tage zurückgehen.
  if (weekDay === 0) {
    daysAfterMonday = 6
  }
  const monday = new Date(fourthJanuary.getTime() - daysAfterMonday * MILLISECONDS_PER_DAY)
  return monday
}

function totalWeeks(year) {
  const startOfYear = startOfFirstWeek(year)
  const startOfNextYear = startOfFirstWeek(year + 1)
  const diff = startOfNextYear.getTime() - startOfYear.getTime()
  const totalWeeks = diff / MILLISECONDS_PER_WEEK
  return totalWeeks
}

function startOfWeek(year, week) {
  const startOfYear = startOfFirstWeek(year)
  const startOfWeek = new Date(startOfYear.getTime() + (week - 1) * MILLISECONDS_PER_WEEK)
  return startOfWeek
}

function endOfWeek(year, week) {
  const weekStart = startOfWeek(year, week)
  const weekEnd = new Date(weekStart.getTime() + 6 * MILLISECONDS_PER_DAY)
  return weekEnd
}

function weekSpan(year, week) {
  return {
    start: startOfWeek(year, week),
    end: endOfWeek(year, week)
  }
}

function weekFor(date) {
  let year = date.getFullYear()
  let week = 1
  const weekCount = totalWeeks(year)

  for (; week <= weekCount; week++) {
    const weekStart = startOfWeek(year, week)
    const weekEnd = startOfWeek(year, week + 1)
    if (date >= weekStart && date < weekEnd) {
      break
    }
  }

  // Prüfe ob Datum in der letzten KW des Vorjahres oder in der ersten
  // KW des Folgejahres liegt.
  if (week > weekCount) {
    const startOfNextYear = startOfFirstWeek(year + 1)
    const totalWeeksOfPreviousYear = weekCount(year - 1)
    const startOfLastCalendarWeekOfPreviousYear = startOfWeek(year - 1,
      totalWeeksOfPreviousYear)

    if (date >= startOfNextYear) {
      week = 1
      year = year + 1
    } else if (date >= startOfLastCalendarWeekOfPreviousYear) {
      week = totalWeeksOfPreviousYear
      year = year - 1
    } else {
      throw new Error("Berechnungsfehler bei Kalenderwochenberechnung")
    }
  }

  return {
    year,
    week,
  }
}

function previousWeek(year, week) {
  week--
  if (!isValidWeek(year, week)) {
    year--
    week = totalWeeks(year)
  }
  return { year, week }
}

function nextWeek(year, week) {
  week++
  if (!isValidWeek(year, week)) {
    year++
    week = 1
  }
  return { year, week }
}

function today() {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

function now() {
  return new Date()
}

function nextDay(date) {
  return new Date(date.getTime() + MILLISECONDS_PER_DAY)
}

function addDays(date, dayCount) {
  return new Date(date.getTime() + dayCount * MILLISECONDS_PER_DAY)
}

function isValidWeek(year, week) {
  const weekCount = totalWeeks(year)
  return week >= 1 && week <= weekCount
}

function range(fromDate, toDate) {
  const range = []
  let date = fromDate
  while (date <= toDate) {
    range.push(date)
    date = nextDay(date)
  }
  return range
}

function currentWeek() {
  return weekFor(today())
}

function format(date) {
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map(n => ("" + n).padStart(2, "0"))
    .join(".")
}

function nameFor(date) {
  const numberToDay = new Map([
    [0, "Sonntag"],
    [1, "Montag"],
    [2, "Dienstag"],
    [3, "Mittwoch"],
    [4, "Donnerstag"],
    [5, "Freitag"],
    [6, "Samstag"],
  ])

  return numberToDay.get(date.getDay())
}

export {
  addDays,
  weekFor,
  currentWeek,
  endOfWeek,
  previousWeek,
  nextDay,
  nextWeek,
  range,
  startOfWeek,
  weekSpan,
  startOfFirstWeek,
  today,
  totalWeeks,
  isValidWeek,
  format,
  nameFor,
  now,
}