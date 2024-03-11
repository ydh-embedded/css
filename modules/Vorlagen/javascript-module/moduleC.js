class Helper {
  constructor() {

  }

  /**
   * Formatiere das angegebene Datum im deutschen Format.
   * @param {Date} date Das zu formatierende Datum.
   * @returns Das formatierte Datum als Zeichenkette.
   */
  static formatDate(date) {
    const [day, month, year] = [
      date.getDate(), 
      date.getMonth() + 1, 
      date.getFullYear()
    ]

    return [day, month, year]
      .map(n => "" + n)
      .map(s => s.padStart(2, "0"))
      .join(".")
  }

}

/**
 * Bildet einen vollständigen Namen aus Vor- und Nachnamen.
 * @param {string} first Der Vorname.
 * @param {string} last Der Nachname.
 * @returns Der vollständige Name im Format Nachname, Vorname.
 */
function formatName(first, last) {
  return `${last}, ${first}`
}

export default Helper

export {
  formatName, 
}