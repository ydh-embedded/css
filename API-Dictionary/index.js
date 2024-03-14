const $                   = document.querySelector.bind(document)
const $$                  = document.querySelectorAll.bind(document)

const inputForm           = $("#input-form")
const yearInput           = $("#year")
const countryCodeInput    = $("#country-code")
const wordsTable        = $("#words")
let   isRequestInProgress = false

inputForm.addEventListener("submit", event => {
  event.preventDefault()                                                        // Verhindere das Abschicken des Formulars.
  if (isRequestInProgress) {                                                   // Wenn ein Request aktiv ist, dann keinen erneuten Request schicken.
    console.debug("Erneuter Request unterbunden, da bereits ein Request läuft.")
    return
  }

  const selectedLanguage = countryCodeInput.value      // Ermittle ausgewähltes Sprache
  
  const selectedWord = Number(yearInput.value)        // Ermittle ausgewählte Wort
  
  isRequestInProgress = true                         // Ermittle die Übersetzung
  waitAsync(30)
    .then(() => getTranslation(selectedWord, selectedLanguage))
    .catch(error => console.error(error))
    .finally(() => { isRequestInProgress = false })
})


async function getTranslation(word, Language) {
  let url  = "api.dictionaryapi.dev/api/v2/entries/en/house"
      url += "/" + encodeURIComponent(word)
      url += "/" + encodeURIComponent(Language)


  const response = await fetch(url)                       // Schicke einen Request an den Web Service und warte auf seine Antwort.
  if (!response.ok) {
    throw new Error("Beim Abrufen ist ein Fehler aufgetreten. Details: " + response.statusText)
  }
                                                        // Transformiere empfangenes JSON-Dokument in ein herkömmliches JavaScript Objekt.
                                                       // data enthält ein Array von Feiertagsobjekten.
  const data = await response.json()
  
  
  return data.map(item => ({                            // Relevante Daten aus Rohdaten extrahieren und an Aufrufer zurückgeben.
    date: formatDate(new Date(item.date)),
    name: item.localName
  }))
}

function waitAsync(totalMilliseconds, result) {
  const { promise, resolve, reject } = Promise.withResolvers()
  setTimeout(() => resolve(result), totalMilliseconds)
  return promise
}

function renderWords(words) {
  const tbody = wordsTable.querySelector("tbody")          // Entferne derzeitige Zeilen aus Tabelle.
    tbody.innerHTML = ""                                  // Für jedeÜbersetzung wird eine Zeile in die Tabelle eingetragen.
    words.forEach(holiday => {
      /* #FIXME innerHTML anpassen */
     tbody.innerHTML += `<tr> <td>${holiday.date}</td> <td>${holiday.name}</td> </tr>`
    })

  wordsTable.hidden = false                               // Tabelle sichtbar machen.
}



