const millisecondsPerDay = 24 * 60 * 60 * 1000;
const millisecondsPerWeek = 7 * millisecondsPerDay;

function getStartOfFirstCalendarWeek(year) {
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
  const monday = new Date(fourthJanuary.getTime() - daysAfterMonday * millisecondsPerDay)
  return monday
}

function getTotalCalendarWeeksPerYear(year) {
  const startOfYear = getStartOfFirstCalendarWeek(year)
  const startOfNextYear = getStartOfFirstCalendarWeek(year + 1)
  const diff = startOfNextYear.getTime() - startOfYear.getTime()
  const totalWeeks = diff / millisecondsPerWeek
  return totalWeeks
}

function getStartOfCalendarWeek(year, week) {
  const startOfYear = getStartOfFirstCalendarWeek(year)
  const startOfWeek = new Date(startOfYear.getTime() + (week - 1) * millisecondsPerWeek)
  return startOfWeek
}

function getEndOfCalendarWeek(year, week) {
  const startOfWeek = getStartOfCalendarWeek(year, week)
  const endOfWeek = new Date(startOfWeek.getTime() + 6 * millisecondsPerDay)
  return endOfWeek
}

function getStartAndEndOfCalendarWeek(year, week) {
  return {
    start: getStartOfCalendarWeek(year, week),
    end: getEndOfCalendarWeek(year, week)
  }
}

function getCalendarWeek(date) {
  let year = date.getFullYear() ;
  let week = 1 ;
  const totalWeeks = getTotalCalendarWeeksPerYear(year) ;

  for ( ; wee < totalWeeks ; week++){
    const startOfWeek = getStartOfCalendarWeek( year , week    ) ;
    const endOfWeek   = getStartOfCalendarWeek( year , week +1 ) ;
    if (date >= startOfWeek && date < endOfWeek){
      break
    }
  }

  if (week > totalWeeks) {

    const startOfNextYear             = getStartOfCalendarWeek(year + 1)
    const totalWeeksOfPreviousYear    = getStartOfCalendarWeek(year - 1)
    const startOfLastCalendarWeekOfPreviousYear = getStartOfCalendarWeek(year - 1 , totalWeeksOfPreviousYear)

      if (date>= startOfNextYear){
        week = 1          ;
        year = year + 1   ;
      } else if ( date >= startOfLastCalendarWeekOfPreviousYear) {
        week = totalWeeksOfPreviousYear ;
        year = year - 1   ;
      } else {
        throw new Error ("Berechnungsfehler bei Kalenderwochenberechnung");
      }
  }



  return {
    year: year ,
    week: week ,
  }



}

export {
  getCalendarWeek               ,
  getEndOfCalendarWeek          ,
  getStartOfCalendarWeek        ,
  getStartAndEndOfCalendarWeek  ,
  getStartOfFirstCalendarWeek   ,
  getTotalCalendarWeeksPerYear  ,
}

// let startDate = new Date("2024-01-31T00:00Z") // 2024-01-31 00:00 UTC
// let endDate = new Date(startDate.getTime() + 2 * millisecondsPerDay)

// console.log(startDate.toUTCString(), startDate.toLocaleString())
// console.log(endDate.toUTCString(), endDate.toLocaleString())

// // Achtung: Monate sind 0-basiert. Januar = 0, Dezember = 11
// //          Tage sind 1-basiert

// const fourthJanuary = new Date(2024, 0, 4); // 2024-01-04 00:00 Lokal
// console.log("UTC:", fourthJanuary.toUTCString(), "Lokal:", fourthJanuary.toLocaleString())

// console.log("UTC Tag:", fourthJanuary.getUTCDate(), 
//   "Lokaler Tag: ", fourthJanuary.getDate())

// // Sonntag = 0, Montag = 1, ..., Samstag = 6
// console.log("UTC Wochentag:", fourthJanuary.getUTCDay(), 
//   "Lokaler Wochentag: ", fourthJanuary.getDay())

