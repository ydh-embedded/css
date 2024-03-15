import testData from "./test-data.js"

const meaningsTable = document.querySelector("#meanings-table")
const searchForm = document.querySelector("#search-form")
const wordInput = document.querySelector("#word-input")

let isRequestInProgress = false

searchForm.addEventListener("submit", event => {
  event.preventDefault()

  if (isRequestInProgress) {
    console.debug("Request verweigert.")
    return
  } 

  const word = wordInput.value.trim()
  isRequestInProgress = true
  fetchMeanings(word)
    .then(meanings => renderMeanings(meanings))
    .catch(error => window.alert(error.message))
    .finally(() => isRequestInProgress = false)
})

async function fetchMeanings(word) {
  const encodedWord = encodeURIComponent(word)
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodedWord}`

  const response = await tryFetch(url)
  if (response.status === 404) {
    throw new Error(`Das Wort ${word} wurde nicht gefunden`)
  } else if (response.ok) {
    const jsonData = await response.json()
    return transformData(jsonData)
  } else {
    throw new Error("Ein unerwarteter Fehler ist aufgetreten. Details: " + response.statusText)
  }
}

async function tryFetch(url) {
  try {
    return await fetch(url)
  }
  catch (error) {
    const message = "Die Verbindung zum Server ist fehlgeschlagen. Details: "
      + error.message
    throw new Error(message)
  }
}

function transformData(data) {
  return data
    .map(item => item.meanings)
    .flat() // Extrahiert Elemente von Arrays und packt sie in das übergeordnete Array.
    .map(item => ({
      type: item.partOfSpeech,
      definitions: item.definitions.map(d => d.definition)
    }))
}

function renderMeanings(data) {
  const tbody = document.querySelector("#meanings-table > tbody")
  tbody.innerHTML = ""

  data.forEach(item => {
    item.definitions.forEach(definition => {
      const row = document.createElement("tr")
      row.innerHTML += `<td>${item.type}</td>`
      row.innerHTML += `<td>${definition}</td>`
      tbody.append(row)
    })
  })
}

renderMeanings(transformData(testData))