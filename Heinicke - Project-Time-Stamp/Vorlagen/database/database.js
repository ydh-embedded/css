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

  getRecords(date) {

  }

  addRecords(date, ...records) {

  }

  removeRecords(date) {

  }

}

export {
  Database,
  Record,
}