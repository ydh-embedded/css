import * as ModuleCalendar from "./calendar-week"         /* #NOTE wir importieren alles aus calendar-week */


class Record {
  #description = ""
  #totalHours = 0

  constructor(description, totalHours) {
    this.description = description
    this.totalHours = totalHours
  }

  get description() {
    return this.#description
  }
  
  set description(value) {
    if (value.length < 2) {
      throw new Error("Description muss aus mindestens 2 Zeichen bestehen")
    }
    this.#description = value
  }

  get totalHours() {
    return this.#totalHours
  }

  set totalHours(value) {
    if (value < 0) {
      throw new Error("Stundenzahl muss positiv sein!")
    }
    this.#totalHours = value
  }

}

class Database {
  static #numberToDay = new Map()                                                         /* #NOTE statische Klassenname im privaten sichtbereich */
  static                                                                                  /* #NOTE der stat. Konstruktor wird einmalig aufgerufen, wenn die klasse erstmalig verwendet wird */
    {
        this.#numberToDay.set(0, "sunday")    ;
        this.#numberToDay.set(1, "monday")    ;
        this.#numberToDay.set(2, "tuesday")   ;
        this.#numberToDay.set(3, "wednesday") ;
        this.#numberToDay.set(4, "thursday")  ;
        this.#numberToDay.set(5, "friday")    ;
        this.#numberToDay.set(6, "saturday")  ;
    }
  static #generateKeyFromDate(Date){
    const { year , week } = ModuleCalendar.getCalendarWeek(date) ;
    const key = `${year} - ${("" + week).padStart( 2 , '0')}`
    return key

  }

  static #getData(date){
    const key = Database.#generateKeyFromDate(date)

    if (key in localStorage.getItem(key))
      const json
  }



  constructor(){                                                                          /* #NOTE Der Instanze - Konstruktor wird jedes Mal aufgerufen , wenn ein Object der Klasse erzeugt wird. */

  }
  getRecords(date) {
    const key = Database.#generateKeyFromDate(date)


    if ( key in localStorage){
      const JSONdata = localStorage.getItem(key)                                          /* #NOTE local Stroage gibt immer ein string zurück */
      const data     = JSON.parse(JSONdata)                                               /* #NOTE wir erzeugen ein Object data mit allen properties */
      const weekDay  = Database.#getDayOfWeekAsString(data)
      const records  = data[weekDay] ?? []
      return records  ;
    }
    return[]  ;
  }

  static getDayOfWeek(date){

  }

  addRecords(date, ...records) {                                                          /* #NOTE fügt records einem Tag hinuz */

  }

  removeRecords(date) {                                                                   /* #NOTE entfernt alle records eines Tages */
  const {year , week }= ModuleCalendar.getCalendarWeek(date)
  const key = Database.#generateKeyFromDate(date)

      if (!(key in localStorage)) {
        return
      }
  

  }

  static #getDayOfWeekAsString(date){
    return this.#numberToDay.get(date.getDay())           /* #NOTE Ermittle den Wochentag des Datums date als Zahl und wandle ihn unter der Map #numberToDay in eine Zeichenkette um */

  }

}

export {
  Database,
  Record,
}