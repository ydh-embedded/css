const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const inputForm = $("#input-form")
const yearInput = $("#year")
const countryCodeInput = $("#country-code")
const holidayTable = $("#holidays")
let isRequestInProgress = false

inputForm.addEventListener("submit", event => {
  // Verhindere das Abschicken des Formulars.
  event.preventDefault()

  // Wenn ein Request aktiv ist, dann keinen erneuten Request schicken.
  if (isRequestInProgress) {
    console.debug("Erneuter Request unterbunden, da bereits ein Request läuft.")
    return
  }
  // Ermittle ausgewähltes Land
  const selectedCountry = countryCodeInput.value
  // Ermittle ausgewähltes Jahr
  const selectedYear = Number(yearInput.value)
  // Ermittle Feiertage
  isRequestInProgress = true
  waitAsync(3000)
    .then(() => getHolidays(selectedYear, selectedCountry))
    .then(holidays => renderHolidays(holidays))
    .catch(error => console.error(error))
    .finally(() => { isRequestInProgress = false })
})

function formatDate(date) {
  // Erzeuge die drei Variablen year, month und day und initialisiere sie
  // mit den korrespondierenden Ausdrücken auf der rechten Seite.
  let [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  // Fülle alle drei Werte mit Nullen auf, wenn der Wert kleiner 10 ist.
  // Setze im Anschluss alle drei Werte zusammen, indem zwischen je zwei Werten
  // ein Punkt gesetzt wird.
  return [day, month, year].map(n => ("" + n).padStart(2, "0")).join(".")
}

async function getHolidays(year, countryCode) {
  let url = "https://date.nager.at/api/v2/publicholidays"
  url += "/" + encodeURIComponent(year)
  url += "/" + encodeURIComponent(countryCode)

  // Schicke einen Request an den Web Service und warte auf seine Antwort.
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Beim Abrufen ist ein Fehler aufgetreten. Details: " + response.statusText)
  }
  // Transformiere empfangenes JSON-Dokument in ein herkömmliches JavaScript Objekt.
  // data enthält ein Array von Feiertagsobjekten.
  const data = await response.json()
  
  // Relevante Daten aus Rohdaten extrahieren und an Aufrufer zurückgeben.
  return data.map(item => ({ 
    date: formatDate(new Date(item.date)),
    name: item.localName
  }))
}

function waitAsync(totalMilliseconds, result) {
  const { promise, resolve, reject } = Promise.withResolvers()
  setTimeout(() => resolve(result), totalMilliseconds)
  return promise
}

function renderHolidays(holidays) {
  const tbody = holidayTable.querySelector("tbody")
  // Entferne derzeitige Zeilen aus Tabelle.
  tbody.innerHTML = ""
  // Für jeden Feiertag wird eine Zeile in die Tabelle
  // eingetragen.
  holidays.forEach(holiday => {
    tbody.innerHTML += `<tr> <td>${holiday.date}</td> <td>${holiday.name}</td> </tr>`
  })
  // Tabelle sichtbar machen.
  holidayTable.hidden = false
}



