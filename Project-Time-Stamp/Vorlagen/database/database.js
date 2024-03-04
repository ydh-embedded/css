import * as CalendarWeek from "./calendar-week.js"

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
  // Eine statische private Klassenvariable.
  static #numberToDay = new Map()

  // Der statische Konstruktor wird einmalig aufgerufen, 
  // wenn die Klasse erstmalig verwendet wird.
  static
  {
    this.#numberToDay.set(0, "sunday")
    this.#numberToDay.set(1, "monday")
    this.#numberToDay.set(2, "tuesday")
    this.#numberToDay.set(3, "wednesday")
    this.#numberToDay.set(4, "thursday")
    this.#numberToDay.set(5, "friday")
    this.#numberToDay.set(6, "saturday")
  }

  // Der Instanz-Konstruktor wird jedes Mal aufgerufen, wenn
  // ein neues Objekt der Klasse erzeugt wird.
  constructor() {


  }

  // Hole alle Records für einen bestimmten Tag.
  getRecords(date) {
    const weekDay = Database.#getDayOfWeekAsString(date)
    const data = Database.#getData(date)
    
    if (data !== null && weekDay in data) {
      const records = data[weekDay].map(o => new Record(o.description, o.duration))
      return records
    }

    return [];
  }

  // Fügt Records zu einem Tag hinzu.
  addRecords(date, ...records) {
    const key = Database.#generateKeyFromDate(date)
    let data = Database.#getData(date)
    const weekDay = Database.#getDayOfWeekAsString(date)

    // Existieren Daten für diese Kalenderwoche? Falls nicht, 
    // lege ein leeres Datenobjekt an.
    if (data === null) {
      data = { }
    }

    // Existiert der Tag im Datenobjekt? Falls nicht,
    // lege den Tag im Datenobjekt an.
    if (!(weekDay in data)) {
      data[weekDay] = []
    }

    // Hänge die Records an das Datenobjekt an.
    records.forEach(r => {
      data[weekDay].push({
        description: r.description,
        duration: r.totalHours,
      })
    })

    // Serialisisieren und im LocalStorage speichern
    const json = JSON.stringify(data)
    localStorage.setItem(key, json)
  }

  // Entfernt alle Records eines Tages.
  removeRecords(date) {
    const key = Database.#generateKeyFromDate(date)
    const data = Database.#getData(date)
    const weekDay = Database.#getDayOfWeekAsString(date)

    if (data !== null && weekDay in data) {
      // Indem wir das Array für den Wochentag leeren,
      // entfernen wir sämtliche Records für diesen Tag.
      data[weekDay] = []
      // Nun serialisieren wir das Datenobjekt data in
      // ein JSON Dokument und speichern dieses im
      // LocalStorage ab.
      const json = JSON.stringify(data)
      localStorage.setItem(key, json)
    }
    
  }

  // Hole das Datenobjekt für die Kalenderwoche des angegebenen Datums.
  // Gib null zurück, falls es keine Daten für das Datum gibt.
  static #getData(date) {
    const key = Database.#generateKeyFromDate(date)
    if (key in localStorage) {
      const json = localStorage.getItem(key)
      const data = JSON.parse(json)
      return data
    }
    return null
  }
  
  static #generateKeyFromDate(date) {
    const { year, week } = CalendarWeek.getCalendarWeek(date)
    // Erzeuge einen Schlüssel der Form YYYY-KK, wobei KK die Kalenderwoche des Jahres ist.
    const key = `${year}-${("" + week).padStart(2, "0")}`
    return key
  }

  static #getDayOfWeekAsString(date) {
    // Ermittle den Wochentag des Datums date als Zahl und wandle ihn
    // unter Zuhilfenahme der Map #numberToDay in eine
    // Zeichenkette um.
    return this.#numberToDay.get(date.getDay())
  }

}

export {
  Database,
  Record,
}